import { achievementChains } from '../data/achievementChains.js';
import { challengesContent } from '../data/challengesContent.js';

// Context passed to every chain's dynamic thresholds — content-bank facts
// (like "how many challenges exist") that shouldn't be hardcoded into a
// tier definition, so a chain's "own all of them" tier stays correct as
// content banks grow.
const CHECK_CONTEXT = { challengeCount: challengesContent.length };

function resolveThreshold(threshold) {
  return typeof threshold === 'function' ? threshold(CHECK_CONTEXT) : threshold;
}

/**
 * Per-chain progress: current metric value, every tier with its resolved
 * threshold and unlocked state, and which tier (if any) is the active
 * "next goal." A chain with every tier cleared has `activeTier: null`.
 */
export function getChainProgress(chain, profile) {
  const value = chain.metric(profile);
  const tiers = chain.tiers.map((tier, index) => {
    const threshold = resolveThreshold(tier.threshold);
    const id = `${chain.id}:${index}`;
    return { ...tier, threshold, id, unlocked: value >= threshold };
  });
  const activeTier = tiers.find((t) => !t.unlocked) ?? null;
  return { ...chain, value, tiers, activeTier };
}

export function getAllChainProgress(profile) {
  return achievementChains.map((chain) => getChainProgress(chain, profile));
}

/**
 * Which tiers (across every chain) are newly true this profile, that
 * weren't already marked unlocked. Pure and side-effect-free — the caller
 * decides what to do with the result (award tokens, persist the ids).
 */
export function getNewlyUnlocked(profile) {
  const already = new Set(profile.unlockedAchievementIds ?? []);
  const newly = [];
  for (const chain of achievementChains) {
    const value = chain.metric(profile);
    chain.tiers.forEach((tier, index) => {
      const id = `${chain.id}:${index}`;
      if (already.has(id)) return;
      if (value >= resolveThreshold(tier.threshold)) {
        newly.push({ id, reward: tier.reward });
      }
    });
  }
  return newly;
}
