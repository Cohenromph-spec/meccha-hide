/**
 * generateDailyDiscovery — the first real AI feature in Nexus (master spec
 * Phase 3: daily experience depth). Everything before this was hand-authored
 * content banks; this is the first thing Claude actually writes.
 *
 * Design choices, and why:
 *
 * - **Cached by date, not generated per request.** A callable that hit the
 *   Anthropic API on every page load would mean every reload = another
 *   charge, for content that's supposed to be the same all day (same
 *   pattern as the existing seeded Daily Puzzle). Instead: check Firestore
 *   for today's doc first; only the very first request of the day actually
 *   calls Claude. Every other request that day — a re-open, a refresh, a
 *   different device — reads the cached doc for free. Worst case is one
 *   Claude call per day, ever, for a single-user app.
 * - **Auth-gated.** `onCall` verifies the Firebase Auth ID token
 *   automatically; `request.auth` is null if the caller isn't signed in.
 *   Combined with Firestore rules already locking `users/{uid}/**` to that
 *   uid, there's no path for anyone but the signed-in owner to trigger a
 *   generation or read the result.
 * - **The API key never leaves the server.** `defineSecret` pulls
 *   `ANTHROPIC_API_KEY` from Secret Manager at invocation time — it's
 *   never in source control, never in a client bundle, never in a plain
 *   env var on disk.
 * - **Structured output, not prompt-and-hope.** `messages.parse()` with a
 *   Zod schema means the response is validated against the exact shape
 *   `DiscoveryTile` expects — no manual JSON.parse, no regex-scraping a
 *   markdown code fence, no silent shape drift if Claude phrases things
 *   differently on a given day.
 */
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { z } from 'zod';

if (getApps().length === 0) {
  initializeApp();
}

const anthropicApiKey = defineSecret('ANTHROPIC_API_KEY');

// Reused across warm invocations — constructing a new SDK client per
// request would work, but this avoids the (small) overhead when the
// function instance is already warm.
let cachedClient: Anthropic | null = null;
function getClient(): Anthropic {
  if (!cachedClient) {
    cachedClient = new Anthropic({ apiKey: anthropicApiKey.value() });
  }
  return cachedClient;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

// Same shape DiscoveryTile.jsx already renders for the hand-authored bank
// (src/data/discoveryContent.js) — the UI doesn't need to know or care
// whether a given card was hand-written or AI-generated.
const DiscoverySchema = z.object({
  title: z
    .string()
    .describe('A short, curiosity-sparking headline. Under 60 characters. No clickbait, no "you won\'t believe".'),
  category: z
    .enum(['ai', 'psychology', 'philosophy', 'world', 'science'])
    .describe('The single best-fitting domain for this fact.'),
  fact: z
    .string()
    .describe('2-4 sentences stating the actual fact or discovery clearly. No fluff, no "did you know" preamble.'),
  whyItMatters: z
    .string()
    .describe('1-2 sentences on why this is actually useful or interesting to know, not just trivia.'),
  relatedTopics: z
    .array(z.string())
    .min(2)
    .max(4)
    .describe('2-4 short topic tags (e.g. "AI", "Cognitive Biases") this connects to.'),
});

const SYSTEM_PROMPT = `You write one short, genuinely interesting daily discovery card for Nexus, a
personal learning app. The audience is a curious, intelligent 18-year-old —
write like you're telling a smart friend something worth knowing, never like
a textbook or a listicle.

Hard rules:
- The fact must be real and accurate. Never invent a statistic, study, or
  citation. If you're not confident something is true, pick a different fact.
- No clickbait framing ("You won't believe...", "This will change how you
  think about..."). State the interesting thing directly.
- Prefer facts that are surprising, counter-intuitive, or that most people
  get subtly wrong — not the most obvious trivia about a topic.
- Rotate across domains over time: AI, psychology, philosophy, world/history,
  science. Don't default to AI every time.
- whyItMatters should explain actual relevance or usefulness, not just
  restate that the fact is interesting.`;

export const generateDailyDiscovery = onCall(
  { secrets: [anthropicApiKey], region: 'us-central1', cors: true },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Sign in required.');
    }
    const uid = request.auth.uid;
    const date = todayStr();

    const db = getFirestore();
    const ref = db.collection('users').doc(uid).collection('aiDaily').doc(date);

    const cached = await ref.get();
    if (cached.exists) {
      return cached.data();
    }

    let parsed: z.infer<typeof DiscoverySchema>;
    try {
      const response = await getClient().messages.parse({
        model: 'claude-opus-5',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        // Simple content generation, not multi-step reasoning — "low" is
        // the documented sweet spot for tasks like this, not "high"/"xhigh"
        // which are worth their cost on coding/agentic work. Easy to raise
        // later if the output quality doesn't hold up.
        output_config: {
          effort: 'low',
          format: zodOutputFormat(DiscoverySchema),
        },
        messages: [{ role: 'user', content: `Generate today's discovery card. Today's date: ${date}.` }],
      });

      if (!response.parsed_output) {
        throw new HttpsError('internal', 'Claude response did not match the expected schema.');
      }
      parsed = response.parsed_output;
    } catch (err) {
      if (err instanceof HttpsError) throw err;
      if (err instanceof Anthropic.AuthenticationError) {
        throw new HttpsError('internal', 'Anthropic API key is invalid or missing.');
      }
      if (err instanceof Anthropic.RateLimitError) {
        throw new HttpsError('resource-exhausted', 'Rate limited by Anthropic — try again shortly.');
      }
      if (err instanceof Anthropic.APIError) {
        throw new HttpsError('internal', `Anthropic API error: ${err.message}`);
      }
      throw new HttpsError('internal', 'Failed to generate today\'s discovery.');
    }

    const doc = {
      id: `ai-${date}`,
      title: parsed.title,
      category: parsed.category,
      fact: parsed.fact,
      whyItMatters: parsed.whyItMatters,
      relatedTopics: parsed.relatedTopics,
      date,
      generatedAt: new Date().toISOString(),
    };

    await ref.set(doc);
    return doc;
  }
);
