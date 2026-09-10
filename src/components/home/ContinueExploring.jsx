import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';
import { levelFromXp } from '../../lib/progression.js';
import { CATEGORIES } from '../../lib/categories.js';
import './ContinueExploring.css';

const DOMAINS = ['ai', 'psychology', 'philosophy', 'world', 'communication'];

export default function ContinueExploring() {
  const { profile } = useUser();

  return (
    <section className="continue-exploring">
      <h3 className="continue-exploring__heading">Continue Exploring</h3>
      <div className="continue-exploring__grid">
        {DOMAINS.map((domain) => {
          const xp = profile.domainXp[domain] ?? 0;
          const { level, progress } = levelFromXp(xp);
          const accent = `var(${CATEGORIES[domain].var})`;

          return (
            <Link
              key={domain}
              to={`/explore?domain=${domain}`}
              className="domain-tile"
              style={{ '--accent': accent }}
            >
              <div className="domain-tile__ring" style={{ '--progress': progress }}>
                <span>{level}</span>
              </div>
              <div>
                <div className="domain-tile__name">{CATEGORIES[domain].label}</div>
                <div className="domain-tile__label">Level {level}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
