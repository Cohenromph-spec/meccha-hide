import { useEffect, useMemo, useRef, useState } from 'react';
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from 'd3-force';
import { zoom as d3zoom, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';
import { knowledgeNodes } from '../../data/knowledgeNodes.js';
import { buildEdges, nodeState, edgeActivity } from '../../lib/graph.js';
import { categoryAccent } from '../../lib/categories.js';
import { useUser } from '../../context/UserContext.jsx';
import { XP_AWARDS } from '../../lib/progression.js';
import NodeDetailPanel from './NodeDetailPanel.jsx';
import './KnowledgeNetwork.css';

// Virtual coordinate space the simulation lays nodes out in. The SVG scales
// this to fit its actual rendered size via viewBox, so it's resolution
// independent — this is not "the graph is 900x600px", it's "the graph's
// internal geometry uses these units."
const WIDTH = 1040;
const HEIGHT = 720;
const FOCUS_SCALE = 1.2;

export default function KnowledgeNetwork({ focusDomain }) {
  const svgRef = useRef(null);
  const viewportRef = useRef(null);
  const zoomBehaviorRef = useRef(null);
  const focusedRef = useRef(null);
  const [positions, setPositions] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const { profile, markNodeExplored, gainXp, gainTokens } = useUser();

  const nodesById = useMemo(() => new Map(knowledgeNodes.map((n) => [n.id, n])), []);
  const edges = useMemo(() => buildEdges(knowledgeNodes), []);

  // Run the force simulation once. It settles (alpha decays) after a couple
  // of seconds and the tick timer stops itself — this isn't running at 60fps
  // forever, just during initial layout.
  useEffect(() => {
    const simNodes = knowledgeNodes.map((n) => ({ ...n }));
    const simEdges = edges.map((e) => ({ ...e }));

    const simulation = forceSimulation(simNodes)
      .force('link', forceLink(simEdges).id((d) => d.id).distance(130).strength(0.5))
      .force('charge', forceManyBody().strength(-420))
      .force('center', forceCenter(WIDTH / 2, HEIGHT / 2))
      .force('collide', forceCollide(58));

    simulation.on('tick', () => {
      const next = {};
      for (const n of simNodes) {
        next[n.id] = { x: n.x, y: n.y };
      }
      setPositions({ nodes: next, edges: simEdges.map((e) => ({ source: e.source.id, target: e.target.id })) });
    });

    return () => simulation.stop();
  }, [edges]);

  // Pan + zoom — d3-zoom handles wheel, drag, and touch pinch out of the box.
  useEffect(() => {
    if (!svgRef.current) return undefined;
    const svg = select(svgRef.current);
    const viewport = select(viewportRef.current);

    const zoomBehavior = d3zoom()
      .scaleExtent([0.5, 2.5])
      .on('zoom', (event) => {
        viewport.attr('transform', event.transform);
      });

    zoomBehaviorRef.current = zoomBehavior;
    svg.call(zoomBehavior);
    // Scale down slightly for breathing room, pivoting on the viewBox's own
    // center — pivoting on (0,0) instead would shift content up-left and
    // clip nodes off the edge, since the SVG clips anything outside its
    // viewBox regardless of preserveAspectRatio.
    const initialScale = 0.85;
    const cx = WIDTH / 2;
    const cy = HEIGHT / 2;
    svg.call(
      zoomBehavior.transform,
      zoomIdentity.translate(cx - cx * initialScale, cy - cy * initialScale).scale(initialScale)
    );

    return () => svg.on('.zoom', null);
  }, []);

  // Deep link from "Continue Exploring" (?domain=ai etc.): once the layout
  // has settled, open that domain's root node and pan/zoom to center it —
  // runs once per incoming focusDomain, not on every simulation tick.
  useEffect(() => {
    if (!focusDomain || !positions || !zoomBehaviorRef.current) return;
    if (focusedRef.current === focusDomain) return;
    const pos = positions.nodes[focusDomain];
    if (!pos) return;

    focusedRef.current = focusDomain;
    setSelectedId(focusDomain);

    const svg = select(svgRef.current);
    const tx = WIDTH / 2 - pos.x * FOCUS_SCALE;
    const ty = HEIGHT / 2 - pos.y * FOCUS_SCALE;
    svg
      .transition()
      .duration(650)
      .call(zoomBehaviorRef.current.transform, zoomIdentity.translate(tx, ty).scale(FOCUS_SCALE));
  }, [focusDomain, positions]);

  const selectedNode = knowledgeNodes.find((n) => n.id === selectedId) ?? null;

  function handleExplore(node) {
    if (profile.exploredNodeIds.includes(node.id)) return;
    markNodeExplored(node.id);
    gainXp(XP_AWARDS.nodeExplored, node.domain);
    gainTokens(8);
  }

  return (
    <div className="knowledge-network">
      <p className="knowledge-network__hint">Drag to pan · Pinch or scroll to zoom · Tap a node to explore</p>

      <svg
        ref={svgRef}
        className="knowledge-network__svg"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <g ref={viewportRef}>
          {positions &&
            positions.edges.map((edge, i) => {
              const a = positions.nodes[edge.source];
              const b = positions.nodes[edge.target];
              const sourceNode = nodesById.get(edge.source);
              const targetNode = nodesById.get(edge.target);
              if (!a || !b || !sourceNode || !targetNode) return null;

              const activity = edgeActivity(sourceNode, targetNode, profile.exploredNodeIds);
              const pulseColor = categoryAccent(sourceNode.domain);

              return (
                <g key={i}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    className={`knowledge-network__edge knowledge-network__edge--${activity}`}
                  />
                  {activity !== 'dormant' && (
                    <circle
                      r={activity === 'lit' ? 3.4 : 2.6}
                      className={`knowledge-network__pulse-dot knowledge-network__pulse-dot--${activity}`}
                      style={{ '--accent': pulseColor }}
                    >
                      <animateMotion
                        dur={activity === 'lit' ? '1.5s' : '2.6s'}
                        begin={`${(i % 7) * 0.3}s`}
                        repeatCount="indefinite"
                        path={`M${a.x},${a.y} L${b.x},${b.y}`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

          {positions &&
            knowledgeNodes.map((node) => {
              const pos = positions.nodes[node.id];
              if (!pos) return null;
              const state = nodeState(node, profile.exploredNodeIds);
              const accent = categoryAccent(node.domain);
              const radius = node.tier === 'root' ? 26 : node.tier === 'advanced' ? 20 : 22;

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className={`knowledge-node knowledge-node--${state}`}
                  style={{ '--accent': accent }}
                  onClick={() => state !== 'locked' && setSelectedId(node.id)}
                >
                  {state === 'available' && <circle className="knowledge-node__pulse" r={radius + 6} />}
                  <circle className="knowledge-node__circle" r={radius} />
                  {state === 'explored' && (
                    <path
                      className="knowledge-node__check"
                      d={`M${-radius * 0.35},0 l${radius * 0.3},${radius * 0.3} l${radius * 0.5},-${radius * 0.55}`}
                    />
                  )}
                  <text className="knowledge-node__label" y={radius + 16}>
                    {node.title}
                  </text>
                </g>
              );
            })}
        </g>
      </svg>

      {selectedNode && (
        <NodeDetailPanel
          node={selectedNode}
          state={nodeState(selectedNode, profile.exploredNodeIds)}
          allNodes={knowledgeNodes}
          onExplore={() => handleExplore(selectedNode)}
          onSelectNode={setSelectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
