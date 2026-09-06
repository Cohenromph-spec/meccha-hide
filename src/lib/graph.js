/** Graph helpers shared by the Knowledge Network view. */

/** Build a deduplicated undirected edge list from each node's `connects`. */
export function buildEdges(nodes) {
  const seen = new Set();
  const edges = [];
  for (const node of nodes) {
    for (const targetId of node.connects) {
      const key = [node.id, targetId].sort().join('::');
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ source: node.id, target: targetId });
    }
  }
  return edges;
}

/**
 * Node state, derived from what the user has explored — never stored
 * separately, so it can't drift out of sync with exploredNodeIds.
 */
export function nodeState(node, exploredIds) {
  if (exploredIds.includes(node.id)) return 'explored';
  const locked = node.requires.some((id) => !exploredIds.includes(id));
  return locked ? 'locked' : 'available';
}
