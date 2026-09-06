/**
 * Pattern Logic — procedural puzzle generation.
 *
 * Every puzzle is generated, not hand-written, so this game doesn't run out
 * of content after a dozen plays the way a fixed question bank would.
 * Difficulty is derived from the player's current streak: a few easy
 * generators at low streaks, the harder/trickier ones mixed in as the
 * streak grows.
 */

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Build 3 wrong-but-plausible numeric distractors around the real answer. */
function numericDistractors(answer, spread) {
  const set = new Set([answer]);
  const candidates = [
    answer + spread,
    answer - spread,
    answer + Math.round(spread / 2) || answer + 1,
    answer - Math.round(spread / 2) || answer - 1,
    answer + spread * 2,
  ];
  for (const c of candidates) {
    if (set.size >= 4) break;
    if (!set.has(c)) set.add(c);
  }
  // Fallback in the rare case candidates collided down to <4 unique values.
  let extra = spread * 3 + 1;
  while (set.size < 4) {
    if (!set.has(answer + extra)) set.add(answer + extra);
    extra += 1;
  }
  return [...set];
}

function toOptions(answer, distractorPool) {
  const options = shuffle(numericDistractors(answer, distractorPool).slice(0, 4));
  // Guarantee the real answer made it in even if dedup trimmed it.
  if (!options.includes(answer)) options[randInt(0, 3)] = answer;
  return options;
}

// ---- Numeric generators ----

function arithmetic() {
  const step = randInt(2, 9);
  const start = randInt(1, 20);
  const seq = [0, 1, 2, 3].map((i) => start + i * step);
  const answer = start + 4 * step;
  return {
    kind: 'number',
    sequence: seq,
    answer,
    options: toOptions(answer, step),
    explanation: `Each term adds ${step}.`,
  };
}

function geometric() {
  const ratio = randInt(2, 3);
  const start = randInt(1, 5);
  const seq = [0, 1, 2, 3].map((i) => start * ratio ** i);
  const answer = start * ratio ** 4;
  return {
    kind: 'number',
    sequence: seq,
    answer,
    options: toOptions(answer, Math.max(2, Math.round(answer * 0.3))),
    explanation: `Each term multiplies by ${ratio}.`,
  };
}

function alternating() {
  const add = randInt(3, 10);
  const sub = randInt(1, add - 1);
  const start = randInt(5, 25);
  const seq = [start];
  for (let i = 0; i < 3; i += 1) {
    seq.push(seq[seq.length - 1] + (i % 2 === 0 ? add : -sub));
  }
  // The loop always runs i = 0, 1, 2 (+add, -sub, +add) — so the next step
  // (i = 3) is always -sub. This used to be computed from seq.length, which
  // is always 4 here regardless of add/sub, making that a disguised
  // constant that was wrong 100% of the time. Fixed: just state it plainly.
  const answer = seq[seq.length - 1] - sub;
  return {
    kind: 'number',
    sequence: seq,
    answer,
    options: toOptions(answer, add),
    explanation: `The pattern alternates +${add}, -${sub}.`,
  };
}

function fibonacciLike() {
  const a0 = randInt(1, 5);
  const a1 = randInt(1, 5);
  const seq = [a0, a1];
  for (let i = 0; i < 2; i += 1) seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
  const answer = seq[seq.length - 1] + seq[seq.length - 2];
  return {
    kind: 'number',
    sequence: seq,
    answer,
    options: toOptions(answer, Math.max(2, Math.round(answer * 0.25))),
    explanation: 'Each term is the sum of the two before it.',
  };
}

function squares() {
  const start = randInt(1, 4);
  const seq = [0, 1, 2, 3].map((i) => (start + i) ** 2);
  const answer = (start + 4) ** 2;
  return {
    kind: 'number',
    sequence: seq,
    answer,
    options: toOptions(answer, (start + 4) * 2 + 1),
    explanation: 'Each term is the next perfect square.',
  };
}

// ---- Shape generators ----

const SHAPES = ['circle', 'square', 'triangle', 'diamond'];

function shapeCycle() {
  const cycleLen = randInt(2, 3);
  const cycle = shuffle(SHAPES).slice(0, cycleLen);
  const seq = [0, 1, 2, 3].map((i) => cycle[i % cycleLen]);
  const answer = cycle[4 % cycleLen];
  const distractors = shuffle(SHAPES.filter((s) => s !== answer)).slice(0, 3);
  return {
    kind: 'shape',
    sequence: seq,
    answer,
    options: shuffle([answer, ...distractors]),
    explanation: `The shapes repeat in a cycle of ${cycleLen}.`,
  };
}

function shapePairs() {
  // AABB as a genuine period-4 repeating cycle (a,a,b,b,a,a,b,b,...) rather
  // than "then some new shape starts" — that first draft was ambiguous
  // between the two unused shapes, no more derivable than shapeGrowingCount
  // was. This one wraps back to the start of its own 4-slot cycle, same
  // grounding as shapeCycle, just with an AABB rhythm instead of ABAB/ABC.
  const [a, b] = shuffle(SHAPES).slice(0, 2);
  const cycle = [a, a, b, b];
  const seq = [0, 1, 2, 3].map((i) => cycle[i % cycle.length]);
  const answer = cycle[4 % cycle.length];
  const distractors = shuffle(SHAPES.filter((s) => s !== answer)).slice(0, 3);
  return {
    kind: 'shape',
    sequence: seq,
    answer,
    options: shuffle([answer, ...distractors]),
    explanation: 'Each shape appears twice, then the pattern repeats from the start.',
  };
}

// Exported individually (in addition to generatePuzzle) so each generator's
// math can be verified directly against its stated rule, not just checked
// for internal consistency (answer present among options) — that weaker
// check previously let a wrong-answer bug in `alternating` ship undetected.
export { arithmetic, geometric, alternating, fibonacciLike, squares, shapeCycle, shapePairs };

const EASY = [arithmetic, shapeCycle];
const MEDIUM = [geometric, alternating, shapePairs];
const HARD = [fibonacciLike, squares];

/** Difficulty rises with streak — easy generators dominate early, harder ones mix in later. */
export function generatePuzzle(streak = 0) {
  let pool = EASY;
  if (streak >= 8) pool = [...EASY, ...MEDIUM, ...HARD];
  else if (streak >= 3) pool = [...EASY, ...MEDIUM];

  const generator = pool[randInt(0, pool.length - 1)];
  return generator();
}
