# Nexus Cloud Functions

The one thing GitHub Pages (static hosting) can't do is hold a secret. An
Anthropic API key embedded in the client bundle is public the moment it
ships. This is the small server-side piece that holds the real key and
only ever returns generated content, never the key itself.

Right now there's one function: `generateDailyDiscovery` — the first real
AI feature in Nexus. It's auth-gated, caches its result in Firestore by
date, and only calls the Anthropic API once per day (see the comment at
the top of `src/generateDailyDiscovery.ts` for the full reasoning).

## One-time setup (steps only you can do — API keys and billing need your account)

### 1. Create a Firebase project, if you haven't already

The app already runs fine in local-only mode with no Firebase project at
all. If you want AI content (and cross-device progress sync, which needs
this anyway), you need a real project:

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project**.
2. Enable **Firestore Database** and **Authentication → Email/Password**.
3. Project Settings → General → **Add app → Web** → copy the config values.
4. In the repo root, copy `.env.example` to `.env.local` and paste those
   six `VITE_FIREBASE_*` values in.
5. Deploy the security rules once: `npx firebase deploy --only firestore:rules`
   (run `npx firebase login` first if you haven't).

### 2. Upgrade to the Blaze (pay-as-you-go) plan

Cloud Functions requires it — Firebase Console → your project → **Upgrade**
(bottom-left). You still get a large free tier on top (2M function
invocations/month); for a single-user app calling this once a day, you will
not see a Firebase bill from this. A card is required to enable the plan
even though you'll stay inside the free tier.

### 3. Create an Anthropic API key

1. Go to [console.anthropic.com](https://console.anthropic.com) → sign up
   or sign in.
2. Add a payment method (Settings → Billing) — the API is pay-per-token,
   no subscription. For one card generated per day at low effort, this is
   fractions of a cent per day — practically free for personal use, but
   billing has to be on file before the API will respond.
3. Settings → API Keys → **Create Key**. Copy it immediately — Anthropic
   only shows it once.

### 4. Store the key as a Firebase secret (never commit it anywhere)

From the repo root:

```bash
npx firebase login
npx firebase use --add          # pick your Firebase project, gives it an alias
npx firebase functions:secrets:set ANTHROPIC_API_KEY
# paste the key when prompted — it's stored in Google Secret Manager,
# not in this repo, not in any .env file that gets committed.
```

### 5. Deploy

```bash
cd functions
npm install
npm run build
npm run deploy
```

That's it — from here on, `generateDailyDiscovery` is live. The homepage's
"Today in Nexus" AI tile (`src/components/home/TodayInNexus.jsx`) already
calls it automatically for any signed-in user; no further wiring needed.
If it's not configured yet, or the call fails for any reason, the tile
silently falls back to the hand-authored discovery bank — nothing breaks
either way (see `src/lib/ai.js`).

## Local development

```bash
cd functions
npm install
npm run build
npx firebase emulators:start --only functions,firestore
```

The emulator needs the same `ANTHROPIC_API_KEY` secret available locally —
either `npx firebase functions:secrets:access ANTHROPIC_API_KEY` after step
4 above, or create `functions/.env.local` with `ANTHROPIC_API_KEY=sk-ant-...`
(already gitignored, never commit it).

## Cost reality check

- One `generateDailyDiscovery` call/day, ~1KB of output, at `effort: "low"`
  on Claude Opus 5: a few thousand tokens, well under a cent per day.
- Firestore reads for the cached doc on repeat visits: free tier covers
  this many times over for one user.
- The real cost lever here is Anthropic billing needing a card on file at
  all, not the actual usage — this is designed to be cheap enough to
  forget about, not something to budget around.

## What's not built yet

This function proves the pipeline end-to-end (secret handling, auth gate,
Firestore caching, structured output) but only touches one small piece of
Phase 3 (daily discovery content). Live Challenges (custom challenge
generation) and the AI Brain (personalized learning) are still fully
deferred — same proxy, new functions, when there's time for them.
