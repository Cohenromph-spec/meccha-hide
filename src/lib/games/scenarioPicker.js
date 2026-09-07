/**
 * Small shared helpers for any hand-authored-scenario game (Critical
 * Thinking, Human Behavior, and whatever comes next).
 */

export function shuffleOptions(options) {
  const a = [...options];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * A shuffle-bag scenario deck: draws every item once, in random order,
 * before any item repeats — unlike a naive "random pick, exclude only the
 * previous one," which lets the same scenario resurface within a handful
 * of rounds once the bank is small (reported: a repeat within 5 rounds
 * from a bank of only 10). Reshuffles once exhausted, and swaps the new
 * shuffle's first draw if it would otherwise repeat the item that just
 * ended the previous cycle back-to-back.
 */
export function createScenarioDeck(items) {
  let queue = [];
  let lastId = null;

  function refill() {
    queue = shuffleOptions(items);
    if (queue.length > 1 && queue[0].id === lastId) {
      [queue[0], queue[1]] = [queue[1], queue[0]];
    }
  }

  return function draw() {
    if (queue.length === 0) refill();
    const item = queue.shift();
    lastId = item.id;
    return item;
  };
}
