/** Deterministic "today's pick" from a content bank — same item all day, rotates daily. */
export function pickForToday(items, salt = 0) {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / 86_400_000
  );
  const index = (dayOfYear + salt) % items.length;
  return items[index];
}

/** A genuinely random pick, optionally avoiding a repeat of the last id shown. */
export function pickRandom(items, excludeId) {
  const pool = excludeId ? items.filter((item) => item.id !== excludeId) : items;
  const source = pool.length ? pool : items;
  return source[Math.floor(Math.random() * source.length)];
}
