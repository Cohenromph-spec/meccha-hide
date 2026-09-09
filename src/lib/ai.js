/**
 * Client-side entry point to Nexus's one AI feature (generateDailyDiscovery,
 * see functions/src/generateDailyDiscovery.ts). Mirrors the local-only
 * fallback pattern used everywhere else in the app (see firebase.js,
 * store.js): AI content requires a real Firebase project AND a signed-in
 * user (the Cloud Function is auth-gated), so this returns `null` instead
 * of throwing whenever either is missing — callers treat "no AI content
 * today" as a normal, expected state, not an error.
 */
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app, firebaseReady } from './firebase.js';

let functionsInstance = null;
function getFunctionsInstance() {
  if (!functionsInstance) {
    functionsInstance = getFunctions(app);
  }
  return functionsInstance;
}

/**
 * Fetches (or triggers generation of) today's AI-written discovery card.
 * Returns null when Firebase isn't configured, the user isn't signed in,
 * or the call fails for any reason — never throws. Callers should treat a
 * null result the same as "no AI content available right now" and fall
 * back to the hand-authored discoveryContent bank.
 */
export async function getAIDiscoveryOfTheDay(authUser) {
  if (!firebaseReady || !authUser) return null;

  try {
    const generate = httpsCallable(getFunctionsInstance(), 'generateDailyDiscovery');
    const result = await generate();
    return result.data;
  } catch (err) {
    console.warn('[nexus] AI discovery generation failed, falling back to hand-authored content:', err);
    return null;
  }
}
