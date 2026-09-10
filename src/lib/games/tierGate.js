/**
 * Shared streak-gated difficulty tier picker — same thresholds across
 * every game that has tiers (Detective, Critical Thinking, Human
 * Behavior), so "how much streak until harder content unlocks" means the
 * same thing everywhere instead of three copy-pasted numbers that could
 * silently drift out of sync.
 */
export function pickTier(streak) {
  const tiers = ['easy'];
  if (streak >= 3) tiers.push('medium');
  if (streak >= 8) tiers.push('hard');
  return tiers[Math.floor(Math.random() * tiers.length)];
}

/**
 * A 6-tier ladder shape shared by any game that's grown its own deeper
 * reasoning tiers on top of the original easy/medium/hard system, rather
 * than replacing it — `hard` (the original near-miss/compound-clue tier)
 * stays reachable, it just isn't the ceiling anymore. Human Behavior and
 * Critical Thinking both use this with identical thresholds; kept as a
 * shared builder (not copy-pasted six times) specifically so a fix like
 * this one — an earlier version of Human Behavior's own ladder shipped
 * without a `hard` branch at all, silently orphaning its two hard-tier
 * scenarios — can't happen again for a different game the same way.
 */
function makeDeepTierPicker() {
  return function pick(streak) {
    const tiers = ['easy'];
    if (streak >= 3) tiers.push('medium');
    if (streak >= 6) tiers.push('hard');
    if (streak >= 9) tiers.push('connection');
    if (streak >= 14) tiers.push('integration');
    if (streak >= 20) tiers.push('expert');
    return tiers[Math.floor(Math.random() * tiers.length)];
  };
}

/** Human Behavior's 6-tier ladder — see makeDeepTierPicker above. */
export const pickHumanBehaviorTier = makeDeepTierPicker();

/** Critical Thinking's 6-tier ladder — same shape, own function. */
export const pickCriticalThinkingTier = makeDeepTierPicker();

/** Detective's 6-tier ladder — same shape, own function. */
export const pickDetectiveTier = makeDeepTierPicker();
