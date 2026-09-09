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
