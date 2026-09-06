import { useState } from 'react';
import { categoryAccent, categoryLabel } from '../../lib/categories.js';
import { useUser } from '../../context/UserContext.jsx';
import './DiscoveryTile.css';

export default function DiscoveryTile({ discovery }) {
  const [open, setOpen] = useState(false);
  const { profile, saveDiscovery } = useUser();
  const saved = profile.savedDiscoveryIds.includes(discovery.id);
  const accent = categoryAccent(discovery.category);

  return (
    <div className="discovery-tile" style={{ '--accent': accent }} onClick={() => setOpen((v) => !v)}>
      <div className="discovery-tile__category">{categoryLabel(discovery.category)}</div>
      <div className="discovery-tile__title">{discovery.title}</div>
      {!open && <div className="discovery-tile__teaser">Tap to explore →</div>}

      {open && (
        <div className="discovery-tile__body">
          <p className="discovery-tile__fact">{discovery.fact}</p>
          <p className="discovery-tile__why">
            <strong style={{ color: 'var(--text-secondary)' }}>Why it matters: </strong>
            {discovery.whyItMatters}
          </p>
          {discovery.relatedTopics?.length > 0 && (
            <div className="discovery-tile__related">
              {discovery.relatedTopics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          )}
          <button
            className="discovery-tile__save"
            disabled={saved}
            onClick={(e) => {
              e.stopPropagation();
              saveDiscovery(discovery.id);
            }}
          >
            {saved ? 'Saved to Library' : 'Save to Library'}
          </button>
        </div>
      )}
    </div>
  );
}
