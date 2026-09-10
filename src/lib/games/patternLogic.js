/**
 * Pattern Logic — procedural puzzle generation.
 *
 * Every puzzle is generated, not hand-written, so this game doesn't run out
 * of content after a dozen plays the way a fixed question bank would.
 * Difficulty is derived from the player's current streak: a few easy
 * generators at low streaks, the harder/trickier ones mixed in as the
 * streak grows.
 *
 * Every randomness call takes an `rng` function (defaulting to
 * Math.random) instead of calling Math.random() directly, so the same
 * generator can be driven by a seeded RNG for the Daily Puzzle — same
 * puzzle for everyone on the same calendar day — without needing a
 * separate code path.
 */

function randInt(min, max, rng = Math.random) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function shuffle(arr, rng = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
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

function toOptions(answer, distractorPool, rng = Math.random) {
  const options = shuffle(numericDistractors(answer, distractorPool).slice(0, 4), rng);
  // Guarantee the real answer made it in even if dedup trimmed it.
  if (!options.includes(answer)) options[randInt(0, 3, rng)] = answer;
  return options;
}

// ---- Numeric generators ----

function arithmetic(rng = Math.random) {
  const step = randInt(2, 9, rng);
  const start = randInt(1, 20, rng);
  const seq = [0, 1, 2, 3].map((i) => start + i * step);
  const answer = start + 4 * step;
  return {
    kind: 'number',
    sequence: seq,
    answer,
    options: toOptions(answer, step, rng),
    explanation: `Each term adds ${step}.`,
  };
}

function geometric(rng = Math.random) {
  const ratio = randInt(2, 3, rng);
  const start = randInt(1, 5, rng);
  const seq = [0, 1, 2, 3].map((i) => start * ratio ** i);
  const answer = start * ratio ** 4;
  return {
    kind: 'number',
    sequence: seq,
    answer,
    options: toOptions(answer, Math.max(2, Math.round(answer * 0.3)), rng),
    explanation: `Each term multiplies by ${ratio}.`,
  };
}

function alternating(rng = Math.random) {
  const add = randInt(3, 10, rng);
  const sub = randInt(1, add - 1, rng);
  const start = randInt(5, 25, rng);
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
    options: toOptions(answer, add, rng),
    explanation: `The pattern alternates +${add}, -${sub}.`,
  };
}

function fibonacciLike(rng = Math.random) {
  const a0 = randInt(1, 5, rng);
  const a1 = randInt(1, 5, rng);
  const seq = [a0, a1];
  for (let i = 0; i < 2; i += 1) seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
  const answer = seq[seq.length - 1] + seq[seq.length - 2];
  return {
    kind: 'number',
    sequence: seq,
    answer,
    options: toOptions(answer, Math.max(2, Math.round(answer * 0.25)), rng),
    explanation: 'Each term is the sum of the two before it.',
  };
}

function squares(rng = Math.random) {
  const start = randInt(1, 4, rng);
  const seq = [0, 1, 2, 3].map((i) => (start + i) ** 2);
  const answer = (start + 4) ** 2;
  return {
    kind: 'number',
    sequence: seq,
    answer,
    options: toOptions(answer, (start + 4) * 2 + 1, rng),
    explanation: 'Each term is the next perfect square.',
  };
}

// ---- Shape generators ----

const SHAPES = ['circle', 'square', 'triangle', 'diamond'];

function shapeCycle(rng = Math.random) {
  const cycleLen = randInt(2, 3, rng);
  const cycle = shuffle(SHAPES, rng).slice(0, cycleLen);
  const seq = [0, 1, 2, 3].map((i) => cycle[i % cycleLen]);
  const answer = cycle[4 % cycleLen];
  const distractors = shuffle(SHAPES.filter((s) => s !== answer), rng).slice(0, 3);
  return {
    kind: 'shape',
    sequence: seq,
    answer,
    options: shuffle([answer, ...distractors], rng),
    explanation: `The shapes repeat in a cycle of ${cycleLen}.`,
  };
}

function shapePairs(rng = Math.random) {
  // AABB as a genuine period-4 repeating cycle (a,a,b,b,a,a,b,b,...) rather
  // than "then some new shape starts" — that first draft was ambiguous
  // between the two unused shapes, no more derivable than shapeGrowingCount
  // was. This one wraps back to the start of its own 4-slot cycle, same
  // grounding as shapeCycle, just with an AABB rhythm instead of ABAB/ABC.
  const [a, b] = shuffle(SHAPES, rng).slice(0, 2);
  const cycle = [a, a, b, b];
  const seq = [0, 1, 2, 3].map((i) => cycle[i % cycle.length]);
  const answer = cycle[4 % cycle.length];
  const distractors = shuffle(SHAPES.filter((s) => s !== answer), rng).slice(0, 3);
  return {
    kind: 'shape',
    sequence: seq,
    answer,
    options: shuffle([answer, ...distractors], rng),
    explanation: 'Each shape appears twice, then the pattern repeats from the start.',
  };
}

// ============================================================
// DEEPER TIER LADDER — same reasoning-depth redesign as Human Behavior
// and Critical Thinking, applied to Pattern Logic's own vocabulary
// (dimensions/rules interacting, not "harder arithmetic"). Every
// generator below is checked, before ever offering it as an answer, for
// the exact failure mode that already burned this file once — a
// "disguised constant" that happens to give the right answer only by
// coincidence of how the loop was written. Each new generator states its
// rule in closed form and is spot-checked against hand worked examples,
// not just checked for internal consistency.
//
// 'connection' — two independent dimensions changing on their own
// periods at once (shape identity + rotation), so reading only one
// dimension isn't enough; you have to track both counters together.
//
// 'integration' — the RATE of change itself changes at a steady rate
// (second-order arithmetic — each step is bigger than the last by a
// fixed amount), a genuinely different structure from "add the same
// number every time."
//
// 'expert' — two fully independent arithmetic sequences interleaved
// into one visible sequence (even positions belong to one, odd
// positions to the other) — the "hidden structure" case from Cohen's
// spec, where the real pattern only appears once you separate the
// sequence into its two hidden halves.
// ============================================================

const ROTATIONS = [0, 90, 180, 270];

function comboKey(shape, rotation) {
  return `${shape}|${rotation}`;
}
function parseCombo(key) {
  const [shape, rotation] = key.split('|');
  return { shape, rotation: Number(rotation) };
}

/**
 * Connection: shape identity cycles on a period-2 pattern while rotation
 * independently cycles on a period-3 pattern — the combined period is 6
 * (LCM), so a 4-tile window (the easy/medium/hard default) genuinely
 * isn't enough to see both cycles resolve; this generator shows 5 tiles
 * instead specifically so the second, independent cycle is inferable
 * rather than a guess.
 */
function shapeRotationDual(rng = Math.random) {
  const shapes = shuffle(SHAPES, rng).slice(0, 2);
  const rotStart = randInt(0, 2, rng);
  const rotCycle = shuffle(ROTATIONS, rng).slice(0, 3);
  const seqLen = 5;
  const comboAt = (i) => ({ shape: shapes[i % 2], rotation: rotCycle[(i + rotStart) % 3] });
  const seq = Array.from({ length: seqLen }, (_, i) => comboAt(i));
  const answerCombo = comboAt(seqLen);
  const answer = comboKey(answerCombo.shape, answerCombo.rotation);

  // Distractors: right shape/wrong rotation, wrong shape/right rotation,
  // and a fully-independent wrong combo — each isolates whether the
  // player is actually tracking both cycles or just one.
  const wrongRotation = rotCycle.find((r) => r !== answerCombo.rotation);
  const wrongShape = shapes.find((s) => s !== answerCombo.shape);
  const otherShape = SHAPES.find((s) => !shapes.includes(s));
  const otherRotation = ROTATIONS.find((r) => !rotCycle.includes(r)) ?? rotCycle[(rotStart + 1) % 3];
  const options = shuffle(
    [
      answer,
      comboKey(answerCombo.shape, wrongRotation),
      comboKey(wrongShape, answerCombo.rotation),
      comboKey(otherShape ?? wrongShape, otherRotation),
    ],
    rng
  );

  return {
    kind: 'shape-dual',
    sequence: seq,
    answer,
    options,
    explanation: `The shape alternates every step, and the rotation cycles through ${rotCycle.join('°, ')}° on its own — two independent cycles running at once.`,
  };
}

/**
 * Integration: second-order arithmetic — the step size itself grows by a
 * fixed amount each term, instead of staying constant (plain arithmetic)
 * or multiplying (geometric). The rate of change is itself changing at a
 * steady rate: a genuinely different structure, not just bigger numbers.
 */
function accelerating(rng = Math.random) {
  const start = randInt(1, 10, rng);
  const initialStep = randInt(2, 6, rng);
  const stepGrowth = randInt(2, 4, rng);
  const seq = [start];
  let step = initialStep;
  for (let i = 0; i < 3; i += 1) {
    seq.push(seq[seq.length - 1] + step);
    step += stepGrowth;
  }
  const answer = seq[seq.length - 1] + step;
  return {
    kind: 'number',
    sequence: seq,
    answer,
    options: toOptions(answer, initialStep + stepGrowth * 2, rng),
    explanation: `Each step is ${stepGrowth} bigger than the step before it — the gaps grow by ${stepGrowth} every time, not just the numbers.`,
  };
}

/**
 * Expert: two independent arithmetic sequences interleaved — even
 * positions (0, 2, 4, ...) belong to sequence A, odd positions (1, 3, 5,
 * ...) belong to sequence B. Shows 6 visible tiles (enough for 3 terms of
 * each hidden sequence) and asks for position 6, which belongs to A.
 * Explicitly regenerates if A and B would collapse into what looks like
 * one ordinary sequence — the exact "looks solvable one way, is actually
 * solvable a different way" trap this file has been burned by before.
 */
function interleaved(rng = Math.random) {
  let a0, dA, b0, dB, seq;
  let attempts = 0;
  do {
    a0 = randInt(1, 12, rng);
    dA = randInt(2, 7, rng);
    b0 = randInt(1, 12, rng);
    dB = randInt(2, 7, rng);
    seq = [0, 1, 2, 3, 4, 5].map((i) => (i % 2 === 0 ? a0 + (i / 2) * dA : b0 + ((i - 1) / 2) * dB));
    attempts += 1;
    // Reject if the visible sequence's own consecutive differences are
    // constant — that would mean the "hidden" structure is indistinguishable
    // from one plain arithmetic sequence, defeating the point of this tier.
    const diffs = seq.slice(1).map((v, i) => v - seq[i]);
    var looksLikeOneSequence = diffs.every((d) => d === diffs[0]);
  } while (looksLikeOneSequence && attempts < 20);

  const answer = a0 + 3 * dA; // position 6 is even -> continues sequence A (3rd step from a0)
  const wrongContinueB = b0 + 3 * dB; // mistaking B's continuation for the answer
  const overallStep = seq[5] - seq[4];
  const wrongFlatContinue = seq[5] + overallStep; // treating the whole thing as one simple sequence
  const distractorPool = new Set([answer, wrongContinueB, wrongFlatContinue]);
  let extra = answer + dA + 1;
  while (distractorPool.size < 4) {
    if (!distractorPool.has(extra)) distractorPool.add(extra);
    extra += 1;
  }
  const options = shuffle([...distractorPool].slice(0, 4), rng);
  if (!options.includes(answer)) options[randInt(0, 3, rng)] = answer;

  return {
    kind: 'number',
    sequence: seq,
    answer,
    options,
    explanation: `This is two sequences woven together: the 1st, 3rd, 5th, 7th terms (positions 0, 2, 4, 6) go up by ${dA} each time starting at ${a0}, and the 2nd, 4th, 6th terms go up by ${dB} each time starting at ${b0}, completely independently. Position 6 continues the first sequence: ${a0} → ${a0 + dA} → ${a0 + 2 * dA} → ${answer}.`,
  };
}

// Exported individually (in addition to generatePuzzle) so each generator's
// math can be verified directly against its stated rule, not just checked
// for internal consistency (answer present among options) — that weaker
// check previously let a wrong-answer bug in `alternating` ship undetected.
export {
  arithmetic,
  geometric,
  alternating,
  fibonacciLike,
  squares,
  shapeCycle,
  shapePairs,
  shapeRotationDual,
  accelerating,
  interleaved,
  comboKey,
  parseCombo,
};

const EASY = [arithmetic, shapeCycle];
const MEDIUM = [geometric, alternating, shapePairs];
const HARD = [fibonacciLike, squares];
const CONNECTION = [shapeRotationDual];
const INTEGRATION = [accelerating];
const EXPERT = [interleaved];

/**
 * Difficulty rises with streak — easy generators dominate early, harder
 * ones mix in later. Thresholds match the 6-tier ladder used by Human
 * Behavior and Critical Thinking (see lib/games/tierGate.js) for
 * consistency across the Arcade, even though Pattern Logic's pools are
 * generator functions rather than a fixed scenario bank.
 */
export function generatePuzzle(streak = 0, rng = Math.random) {
  let pool = EASY;
  if (streak >= 20) pool = [...EASY, ...MEDIUM, ...HARD, ...CONNECTION, ...INTEGRATION, ...EXPERT];
  else if (streak >= 14) pool = [...EASY, ...MEDIUM, ...HARD, ...CONNECTION, ...INTEGRATION];
  else if (streak >= 9) pool = [...EASY, ...MEDIUM, ...HARD, ...CONNECTION];
  else if (streak >= 6) pool = [...EASY, ...MEDIUM, ...HARD];
  else if (streak >= 3) pool = [...EASY, ...MEDIUM];

  const generator = pool[randInt(0, pool.length - 1, rng)];
  return generator(rng);
}
