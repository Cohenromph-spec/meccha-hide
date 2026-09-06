/**
 * Nexus progression math.
 *
 * One formula, shared by the overall level and every per-domain knowledge
 * level — keeps the curve predictable instead of inventing a new one per
 * feature as Phase 2+ adds domains.
 *
 * XP required to go from level n to n+1 grows with n, so early levels come
 * fast (rewarding first-open curiosity) and later ones take real
 * accumulated exploration.
 */

const BASE_XP = 100;
const GROWTH = 1.18;

/** Total cumulative XP required to *reach* a given level (level 1 = 0 XP). */
export function xpForLevel(level) {
  if (level <= 1) return 0;
  let total = 0;
  for (let i = 1; i < level; i += 1) {
    total += Math.round(BASE_XP * GROWTH ** (i - 1));
  }
  return total;
}

/** Derive level + progress-within-level from a total XP count. */
export function levelFromXp(totalXp) {
  let level = 1;
  while (xpForLevel(level + 1) <= totalXp) {
    level += 1;
  }
  const currentFloor = xpForLevel(level);
  const nextFloor = xpForLevel(level + 1);
  const xpIntoLevel = totalXp - currentFloor;
  const xpForNext = nextFloor - currentFloor;
  return {
    level,
    xpIntoLevel,
    xpForNext,
    progress: xpForNext === 0 ? 1 : xpIntoLevel / xpForNext,
  };
}

/** Explorer titles — overall-level only, not per-domain. */
const TITLES = [
  { min: 1, title: 'Newcomer' },
  { min: 5, title: 'Explorer' },
  { min: 10, title: 'Seeker' },
  { min: 16, title: 'Adept' },
  { min: 24, title: 'Voyager' },
  { min: 34, title: 'Luminary' },
  { min: 50, title: 'Archon' },
];

export function titleForLevel(level) {
  let current = TITLES[0].title;
  for (const tier of TITLES) {
    if (level >= tier.min) current = tier.title;
  }
  return current;
}

/** XP award sizes — named, not magic numbers scattered through the UI. */
export const XP_AWARDS = {
  discoverySaved: 15,
  taskCompleted: 20,
  reflectionWritten: 25,
  challengeStepCompleted: 30,
  challengeCompleted: 100,
  nodeExplored: 20,
  nodeMastered: 60,
};
