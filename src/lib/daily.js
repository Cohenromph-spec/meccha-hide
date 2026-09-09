import { mulberry32 } from './seededRandom.js';

/**
 * Days since the Unix epoch — used instead of "day of year" so the
 * rotation doesn't reset (and repeat a recent pick) every January 1st,
 * which `dayOfYear` did in the previous version.
 */
function daysSinceEpoch() {
  return Math.floor(Date.now() / 86_400_000);
}

/** Deterministic Fisher-Yates shuffle — same seed always produces the same
 * order, so every visitor sees the same shuffled sequence for a given
 * cycle (not a *different* random shuffle per page load). */
function seededShuffle(items, seed) {
  const rng = mulberry32(seed);
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Deterministic "today's pick" from a content bank — same item all day,
 * changes daily.
 *
 * Previously this was `dayOfYear % items.length`, which has two real
 * bugs: it cycles through the exact same *unshuffled sequential* order
 * every N days (item 0, 1, 2, ... 0, 1, 2, ...) — with a small bank like
 * the 8-item AI discovery category, that's blatantly repetitive within
 * under two weeks (Cohen's report) — and `dayOfYear` itself resets to
 * ~0 every January 1st, which would show a recently-seen pick again
 * right at the year boundary.
 *
 * Fixed by treating every full pass through the bank as one "cycle":
 * within a cycle, every item is shown exactly once, in an order shuffled
 * deterministically per-cycle (so it's still identical for everyone who
 * opens the app that day, just not the same fixed sequence cycle after
 * cycle), and switched to a monotonic day counter instead of day-of-year
 * so there's no yearly reset.
 */
export function pickForToday(items, salt = 0) {
  const dayIndex = daysSinceEpoch() + salt;
  const cycleLength = items.length;
  const cycle = Math.floor(dayIndex / cycleLength);
  const positionInCycle = dayIndex % cycleLength;
  const shuffled = seededShuffle(items, cycle);
  return shuffled[positionInCycle];
}

/** A genuinely random pick, optionally avoiding a repeat of the last id shown. */
export function pickRandom(items, excludeId) {
  const pool = excludeId ? items.filter((item) => item.id !== excludeId) : items;
  const source = pool.length ? pool : items;
  return source[Math.floor(Math.random() * source.length)];
}
