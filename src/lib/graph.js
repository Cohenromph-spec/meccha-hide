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

/**
 * An edge "carries a signal" once either endpoint is reachable — this is
 * what makes the graph read as a living neural network instead of a static
 * diagram: the frontier around what you've unlocked visibly pulses, fully
 * unexplored territory stays dormant, and a connection between two things
 * you've actually explored lights up as a completed circuit.
 */
export function edgeActivity(sourceNode, targetNode, exploredIds) {
  const a = nodeState(sourceNode, exploredIds);
  const b = nodeState(targetNode, exploredIds);
  if (a === 'explored' && b === 'explored') return 'lit';
  if (a === 'locked' && b === 'locked') return 'dormant';
  return 'active';
}
