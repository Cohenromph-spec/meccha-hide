/**
 * Small shared helpers for any hand-authored-scenario game (Critical
 * Thinking now; Human Behavior next) — picking a round without repeating
 * the last one, and shuffling multiple-choice option order.
 */

export function pickRandom(items, excludeId) {
  const pool = excludeId ? items.filter((item) => item.id !== excludeId) : items;
  const source = pool.length ? pool : items;
  return source[Math.floor(Math.random() * source.length)];
}

export function shuffleOptions(options) {
  const a = [...options];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
