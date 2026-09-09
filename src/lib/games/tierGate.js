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
 * Human Behavior's own 5-tier ladder (Connection / Integration / Expert
 * added on top of the standard Easy / Medium) — kept as a separate
 * function rather than widening `pickTier` above, so Pattern Logic,
 * Critical Thinking, and Detective are completely unaffected. Thresholds
 * are spaced further apart than the 3-tier gate because each new tier is
 * a genuinely different reasoning mechanic, not just harder wording —
 * earning your way to it should mean something.
 */
export function pickHumanBehaviorTier(streak) {
  const tiers = ['easy'];
  if (streak >= 3) tiers.push('medium');
  if (streak >= 7) tiers.push('connection');
  if (streak >= 12) tiers.push('integration');
  if (streak >= 18) tiers.push('expert');
  return tiers[Math.floor(Math.random() * tiers.length)];
}
