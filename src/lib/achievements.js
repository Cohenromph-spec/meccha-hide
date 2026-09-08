import { achievements } from '../data/achievements.js';
import { challengesContent } from '../data/challengesContent.js';

// Context passed to every achievement's check() beyond the profile itself —
// content-bank facts (like "how many challenges exist") that shouldn't be
// hardcoded into a check function, so an achievement stays correct as
// content banks grow.
const CHECK_CONTEXT = { challengeIds: challengesContent.map((c) => c.id) };

/**
 * Which achievements are newly true this profile, that weren't already
 * marked unlocked. Pure and side-effect-free — the caller decides what to
 * do with the result (award tokens, persist the ids).
 */
export function getNewlyUnlocked(profile) {
  const already = new Set(profile.unlockedAchievementIds ?? []);
  return achievements.filter((a) => !already.has(a.id) && a.check(profile, CHECK_CONTEXT));
}
