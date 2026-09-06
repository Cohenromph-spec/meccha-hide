import { categoryAccent, categoryLabel } from '../../lib/categories.js';
import './NodeDetailPanel.css';

const STATE_LABEL = {
  locked: 'Locked',
  available: 'Available',
  explored: 'Explored',
};

export default function NodeDetailPanel({ node, state, allNodes, onExplore, onSelectNode, onClose }) {
  const accent = categoryAccent(node.domain);
  const requiredTitles = node.requires
    .map((id) => allNodes.find((n) => n.id === id)?.title)
    .filter(Boolean);
  const connectedTitles = node.connects
    .map((id) => allNodes.find((n) => n.id === id))
    .filter(Boolean);

  return (
    <>
      <div className="node-panel__backdrop" onClick={onClose} />
      <aside className="node-panel" style={{ '--accent': accent }}>
        <button className="node-panel__close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="node-panel__category">{categoryLabel(node.domain)}</div>
        <h3 className="node-panel__title">{node.title}</h3>
        <span className={`node-panel__state node-panel__state--${state}`}>{STATE_LABEL[state]}</span>

        {state === 'locked' ? (
          <p className="node-panel__locked-note">
            Explore {requiredTitles.join(' and ')} first to unlock this.
          </p>
        ) : (
          <p className="node-panel__description">{node.description}</p>
        )}

        {connectedTitles.length > 0 && (
          <div className="node-panel__connections">
            <span className="node-panel__connections-label">Connects to</span>
            <div className="node-panel__connections-list">
              {connectedTitles.map((n) => (
                <button key={n.id} onClick={() => onSelectNode(n.id)} style={{ '--accent': categoryAccent(n.domain) }}>
                  {n.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {state === 'available' && (
          <button className="node-panel__explore" onClick={onExplore}>
            Mark as Explored (+20 XP)
          </button>
        )}
        {state === 'explored' && <div className="node-panel__done">✓ Added to your Knowledge Network</div>}
      </aside>
    </>
  );
}
