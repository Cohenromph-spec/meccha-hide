# Nexus

A personal AI-powered learning, discovery, and self-development game — built to replace mindless
scrolling with curiosity, knowledge, and real-world growth. See the full product vision in the
project's master spec (kept in the owner's planning docs, not in this repo).

This repo previously hosted "Meccha Hide" (a geocaching hobby app). That project is retired —
Nexus is a fresh build in the same repo.

## Status: Phase 2 — Knowledge Network

What's built:

- Dark visual identity, navigation shell (Home / Explore / Play / Journey / Library / Profile)
- Homepage command center: user header (level/title/XP/tokens), Today's Philosophy with daily
  reflection journal, Today in Nexus, Continue Exploring, Live Challenges, Surprise Me
- **The Knowledge Network** (`src/components/network/`): a real force-directed graph (d3-force)
  of 20 hand-authored nodes across AI / Psychology / Philosophy / World, with cross-domain links
  (e.g. Cognitive Biases connects to Free Will, Media & Misinformation, and Decision Making).
  Pinch-to-zoom and drag-to-pan via d3-zoom (verified on real touch input, not just desktop
  mouse). Locked / available / explored node states, gated by prerequisites — exploring a node
  awards XP to its domain and can unlock its neighbors live.
- Progression system: overall level + per-domain knowledge levels, XP curve, Memory Tokens
- Character foundation (silhouette, no cosmetics yet)
- Firebase auth + Firestore persistence, with a **local-only fallback** (localStorage) so the app
  is fully usable before any Firebase project is wired up — including live UI updates in that
  mode (see `localListeners` in `src/lib/store.js`), not just after a manual reload.

Explicitly **not** built yet (see roadmap below): AI-generated network expansion, AI integration
generally, the Game Arcade, achievements, and character cosmetics.

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

1. ~~Foundation~~
2. ~~Knowledge Network — the interactive graph centerpiece~~ (this phase)
3. Daily experience depth (AI-generated daily content)
4. Live Challenges — custom challenge generation
5. AI Brain — Claude-powered personalized learning
6. Game Arcade — a few polished games, not many shallow ones
7. Progression — achievements, cosmetics, character growth
