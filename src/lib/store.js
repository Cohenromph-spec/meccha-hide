import { doc, getDoc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, firebaseReady } from './firebase';

/**
 * Persistence layer for a Nexus user profile.
 *
 * Phase 1 is single-user, but this is the seam a future multi-user Nexus
 * grows from: everything is keyed by `uid`, and swapping the local-storage
 * branch for "always Firestore" is the entire migration once real auth
 * exists for every visitor.
 *
 * Until a Firebase project is wired up (see .env.example), Nexus runs in
 * local-only mode under a fixed uid so the app is fully usable on first
 * clone — nobody should have to stand up a backend before seeing anything
 * work.
 */

export const LOCAL_UID = 'local-explorer';
const LOCAL_KEY = 'nexus.profile.v1';

export const DEFAULT_PROFILE = {
  xp: 0,
  memoryTokens: 0,
  domainXp: {
    ai: 0,
    psychology: 0,
    philosophy: 0,
    world: 0,
  },
  exploredNodeIds: [],
  savedDiscoveryIds: [],
  reflections: [],
  challengeProgress: {},
  gameStats: {},
  createdAt: null,
};

function readLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return { ...DEFAULT_PROFILE };
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

// localStorage has no same-tab change event (the native `storage` event only
// fires in *other* tabs), so local mode needs its own tiny pub-sub or the
// UI never hears about writes it made itself — this set is that pub-sub.
const localListeners = new Set();

function writeLocal(profile) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(profile));
  } catch {
    // Private browsing / storage disabled — profile just won't persist. Not fatal.
  }
  localListeners.forEach((fn) => fn(profile));
}

/** Subscribe to profile changes. Returns an unsubscribe function. */
export function subscribeProfile(uid, callback) {
  if (firebaseReady && uid !== LOCAL_UID) {
    const ref = doc(db, 'users', uid);
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        callback({ ...DEFAULT_PROFILE, ...snap.data() });
      } else {
        const fresh = { ...DEFAULT_PROFILE, createdAt: serverTimestamp() };
        setDoc(ref, fresh);
        callback(fresh);
      }
    });
  }

  localListeners.add(callback);
  callback(readLocal());
  return () => localListeners.delete(callback);
}

export async function getProfile(uid) {
  if (firebaseReady && uid !== LOCAL_UID) {
    const ref = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    return snap.exists() ? { ...DEFAULT_PROFILE, ...snap.data() } : { ...DEFAULT_PROFILE };
  }
  return readLocal();
}

/** Shallow-merge an update into the stored profile. */
export async function updateProfile(uid, partial) {
  if (firebaseReady && uid !== LOCAL_UID) {
    const ref = doc(db, 'users', uid);
    await setDoc(ref, partial, { merge: true });
    return;
  }
  const current = readLocal();
  writeLocal({ ...current, ...partial });
}

/** Award overall XP, and optionally the same amount to one domain track. */
export async function awardXp(uid, amount, domain) {
  const current = await getProfile(uid);
  const next = { xp: current.xp + amount };
  if (domain) {
    next.domainXp = { ...current.domainXp, [domain]: (current.domainXp[domain] ?? 0) + amount };
  }
  await updateProfile(uid, next);
}

export async function addMemoryTokens(uid, amount) {
  const current = await getProfile(uid);
  await updateProfile(uid, { memoryTokens: current.memoryTokens + amount });
}

/** Append a daily reflection (today's philosophy, rating, optional note). */
export async function addReflection(uid, entry) {
  const current = await getProfile(uid);
  await updateProfile(uid, { reflections: [...current.reflections, entry] });
}

/** Bump a Live Challenge's counter by one. Returns the new count. */
export async function incrementChallenge(uid, challengeId) {
  const current = await getProfile(uid);
  const existing = current.challengeProgress[challengeId] ?? { count: 0, completedAt: null };
  const next = { ...existing, count: existing.count + 1 };
  await updateProfile(uid, {
    challengeProgress: { ...current.challengeProgress, [challengeId]: next },
  });
  return next.count;
}

export async function completeChallenge(uid, challengeId) {
  const current = await getProfile(uid);
  const existing = current.challengeProgress[challengeId] ?? { count: 0, completedAt: null };
  await updateProfile(uid, {
    challengeProgress: {
      ...current.challengeProgress,
      [challengeId]: { ...existing, completedAt: new Date().toISOString() },
    },
  });
}

/** Record one round of a game (correct/incorrect + the streak reached). */
export async function recordGameRound(uid, gameId, { correct, streak }) {
  const current = await getProfile(uid);
  const existing = current.gameStats[gameId] ?? { totalPlayed: 0, totalCorrect: 0, bestStreak: 0 };
  const next = {
    totalPlayed: existing.totalPlayed + 1,
    totalCorrect: existing.totalCorrect + (correct ? 1 : 0),
    bestStreak: Math.max(existing.bestStreak, streak),
  };
  await updateProfile(uid, { gameStats: { ...current.gameStats, [gameId]: next } });
}
