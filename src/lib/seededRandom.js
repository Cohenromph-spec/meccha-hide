/**
 * A small deterministic PRNG (mulberry32) — same seed always produces the
 * same sequence. Used for the Daily Puzzle so everyone gets the same
 * puzzle on the same calendar day, unlike every other game's fresh
 * Math.random() each round.
 */
export function mulberry32(seed) {
  let t = seed;
  return function rng() {
    t |= 0;
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
