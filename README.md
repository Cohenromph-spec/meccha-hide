# Nexus

A personal AI-powered learning, discovery, and self-development game — built to replace mindless
scrolling with curiosity, knowledge, and real-world growth. See the full product vision in the
project's master spec (kept in the owner's planning docs, not in this repo).

This repo previously hosted "Meccha Hide" (a geocaching hobby app). That project is retired —
Nexus is a fresh build in the same repo.

## Status: Phase 6 — Game Arcade (complete, all four games)

What's built:

- Dark visual identity, navigation shell (Home / Explore / Play / Journey / Library / Profile)
- Ambient background: slow-drifting colored glows behind the whole app (`src/components/layout/AmbientBackground.jsx`)
- Homepage command center: user header (level/title/XP/tokens), Today's Philosophy with daily
  reflection journal, Today in Nexus, Continue Exploring, Live Challenges, Surprise Me
- **The Knowledge Network** (`src/components/network/`): a force-directed graph (d3-force) of 20
  hand-authored nodes across AI / Psychology / Philosophy / World, with cross-domain links.
  Pinch-to-zoom and drag-to-pan via d3-zoom. Locked / available / explored node states gated by
  prerequisites. Edges carry a traveling "signal" pulse (SVG animateMotion) once either endpoint
  is reachable — dormant/active/lit states, not one uniform animation. "Continue Exploring" tiles
  deep-link into the graph (`?domain=`) and auto-pan/open that domain's root node.
- **Game Arcade** (`src/pages/games/`, `src/hooks/useGameSession.js`): four games, all with real
  streak-gated difficulty (medium unlocks at streak ≥3, hard at streak ≥8 — shared thresholds via
  `src/lib/games/tierGate.js`, badge shown via `src/components/games/TierBadge.jsx`). Difficulty
  scaling was added as a second pass once flat content banks got boring past a few rounds — every
  tier is genuinely harder content, never the same pool re-gated behind a streak requirement.
  - **Pattern Logic** — procedurally-generated sequence/deduction (numeric + shape patterns,
    difficulty scales via generator pools per tier). Every generator's answer is verified against
    its actual mathematical rule (not just "present among the options") in throwaway test scripts
    before each ship — that distinction mattered: an early version had a generator whose "next
    operation" formula was a disguised constant, silently wrong 100% of the time.
  - **Critical Thinking** — hand-authored scenarios (`src/data/games/criticalThinkingScenarios.js`),
    spot the cognitive bias/logical fallacy in a real-world vignette. Ties back into the Knowledge
    Network: a "Connects to ⟨node⟩" link deep-links and auto-focuses the relevant node. Easy tier
    distractors are clearly different from the correct flaw; medium adds one genuinely-confusable
    "near-miss" distractor (e.g. Confirmation Bias vs. Availability Heuristic); hard uses two at
    once (5 options), each refuted by name in the explanation — never left as an unresolved
    judgment call.
  - **Human Behavior** — deliberately *not* a single-right-answer quiz (the spec is explicit:
    never diagnose a person from one behavior, never normalize paranoid mind-reading as insight).
    Multi-select instead: given a social scenario, pick every explanation that's genuinely
    plausible and skip the ones that jump to an unwarranted conclusion. Full credit for a round
    means covering every reasonable option and none of the leaps. Easy is 5 options (3
    reasonable/2 overreach); medium is 6 (3/3, more to weigh); hard is also 6 but the overreach
    options are quieter — confident specifics instead of dramatic claims, a genuinely harder read.
    Every new tier went through the same length/wording adversarial check the original content
    got burned by twice (see below) before shipping — the first draft of the new tiers
    reintroduced the hedge-word tell almost exactly, caught before it shipped, not after.
  - **Detective** — logic-elimination mysteries (`src/data/games/detectiveMysteries.js`), not
    scored prose. Built this way on purpose after Human Behavior's content shipped with three
    separate accidental shortcuts (position, wording tone, then text length) before a real fix —
    each clue eliminates specific suspects via explicit data, and the solution is whichever
    suspect no clue eliminates: a mechanically checkable invariant (verified against every
    mystery before shipping), the same class of guarantee as Pattern Logic's math, with no prose
    "tell" surface to exploit at all. Medium adds more suspects/clues (same reasoning, more to
    track); hard introduces compound clues (`eliminates` as an array) that rule out multiple
    suspects from one two-part condition — a genuinely new reasoning demand, not just more of
    the same.
  - `useGameSession` + `GameHeader`/`GameSummary` (`src/components/games/`) are the reusable
    scoring/streak/XP/UI plumbing all four games share.
- Progression system: overall level + per-domain knowledge levels, XP curve, Memory Tokens
- Character foundation (silhouette, no cosmetics yet)
- Firebase auth + Firestore persistence, with a **local-only fallback** (localStorage) so the app
  is fully usable before any Firebase project is wired up — including live UI updates in that
  mode (see `localListeners` in `src/lib/store.js`), not just after a manual reload.

Explicitly **not** built yet (see roadmap below): AI integration of any kind (daily content is
still hand-authored), custom challenge generation, achievements, and character cosmetics.

## Stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite |
| Hosting | GitHub Pages (via GitHub Actions) |
| Data | Firestore (single-user for now; schema is multi-user-ready) |
| Auth | Firebase email/password |
| AI | Claude (Anthropic API) via Firebase Cloud Functions — see `functions/` |

## Getting started

```bash
npm install
npm run dev
```

The app runs immediately with no setup — in **local-only mode**, progress saves to
`localStorage` on this device only.

To persist progress across devices:

1. Create a Firebase project → enable Firestore + Email/Password auth.
2. Copy `.env.example` to `.env.local` and fill in your project's web config.
3. Deploy `firestore.rules` (`firebase deploy --only firestore:rules`) — it locks every user's
   data to that user's own `uid`.

## Deploying

Push to `main` and the `deploy.yml` workflow builds and publishes to GitHub Pages automatically.
If you're using Firestore, add the six `VITE_FIREBASE_*` values as repo secrets so the deployed
build has them too (Settings → Secrets and variables → Actions).

Cloud Functions deploy separately, on their own schedule, via `firebase deploy` — see
`functions/README.md`. They don't go through the GitHub Pages workflow above.

## Architecture notes

- **`src/lib/store.js`** is the only place that talks to persistence (Firestore or
  localStorage) — everything else calls it through `UserContext`. Swapping "local-only" for
  "always synced" later is a change in one file, not a rewrite.
- **`src/data/*.js`** are hand-authored content banks (philosophy, discoveries, challenges).
  Phase 5 replaces/augments these with AI-generated content behind the same shape, so the UI
  components don't need to change.
- **Domains** (`ai`, `psychology`, `philosophy`, `world`) are the seed categories for the
  Knowledge Network — `src/lib/categories.js` is the single source of truth for their labels and
  accent colors.

## Roadmap

Phases 3-5 all need the same missing piece: an Anthropic API key held server-side, since GitHub
Pages is static hosting and can't hold a secret. That piece now exists — see `functions/` (Firebase
Cloud Functions, holds the key via Secret Manager, never ships to the client) and
`functions/README.md` for the one-time setup (Firebase Blaze plan + an Anthropic API key, both
require the account owner's billing, so they're manual steps, not something committed to the repo).

1. ~~Foundation~~
2. ~~Knowledge Network — the interactive graph centerpiece~~
3. Daily experience depth (AI-generated daily content) — **in progress.** The AI proxy
   (`functions/generateDailyDiscovery.ts`) is built and wired into the homepage's "Today in
   Nexus" AI tile (`src/lib/ai.js`, `src/components/home/TodayInNexus.jsx`) — auth-gated,
   cached in Firestore by date (one Anthropic call per day, not per page load), structured
   output validated against a Zod schema so a malformed response can't reach the UI. Falls back
   to the hand-authored discovery bank silently if the function isn't deployed yet or the call
   fails. Not yet done: the rest of the daily surface (Today's Philosophy, Live Challenges) is
   still hand-authored.
4. Live Challenges — custom challenge generation — **deferred**, same proxy, not built yet
5. AI Brain — Claude-powered personalized learning — **deferred**, same proxy, not built yet
6. ~~Game Arcade — a few polished games, not many shallow ones~~ (all four shipped: Pattern
   Logic, Critical Thinking, Human Behavior, Detective — all four now with real difficulty tiers)
7. Progression — achievements, cosmetics, character growth — not started
