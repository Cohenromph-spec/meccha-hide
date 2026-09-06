# Nexus

A personal AI-powered learning, discovery, and self-development game — built to replace mindless
scrolling with curiosity, knowledge, and real-world growth. See the full product vision in the
project's master spec (kept in the owner's planning docs, not in this repo).

This repo previously hosted "Meccha Hide" (a geocaching hobby app). That project is retired —
Nexus is a fresh build in the same repo.

## Status: Phase 6 — Game Arcade (started)

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
- **Game Arcade** (`src/pages/games/`, `src/hooks/useGameSession.js`): Pattern Logic, a
  procedurally-generated sequence/deduction game (numeric + shape patterns, difficulty scales
  with streak) — never runs out of content the way a fixed question bank would. `useGameSession`
  is the reusable scoring/streak/XP plumbing future games (Human Behavior, Critical Thinking,
  shown as honest "Coming soon" tiles) plug into without rebuilding it.
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
| AI | Not yet integrated — Phase 5 |

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

Phases 3-5 (AI-generated daily content, custom challenge generation, and the AI Brain) are
deferred until an Anthropic API key + a small backend proxy are worth setting up — GitHub Pages
is static hosting and can't hold a secret key, so this needs real infra + a small recurring API
cost, not just code. Jumped ahead to Phase 6 in the meantime since it needed neither.

1. ~~Foundation~~
2. ~~Knowledge Network — the interactive graph centerpiece~~
3. Daily experience depth (AI-generated daily content) — **deferred, needs an AI provider decision**
4. Live Challenges — custom challenge generation — **deferred, same reason**
5. AI Brain — Claude-powered personalized learning — **deferred, same reason**
6. ~~Game Arcade — a few polished games, not many shallow ones~~ (this phase — Pattern Logic
   shipped; Human Behavior and Critical Thinking still to come)
7. Progression — achievements, cosmetics, character growth
