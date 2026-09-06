import { discoveryContent } from '../data/discoveryContent.js';
import { philosophyContent } from '../data/philosophyContent.js';
import DiscoveryTile from '../components/discovery/DiscoveryTile.jsx';
import { useUser } from '../context/UserContext.jsx';
import PageHeader from '../components/common/PageHeader.jsx';
import './Library.css';

const RATING_LABEL = { yes: 'Yes', somewhat: 'Somewhat', 'not-really': 'Not really' };

export default function Library() {
  const { profile } = useUser();
  const saved = discoveryContent.filter((d) => profile.savedDiscoveryIds.includes(d.id));
  const reflections = [...profile.reflections].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="library">
      <PageHeader
        title="Library"
        subtitle="Everything you've saved and every day you've reflected on — your record of what you've actually explored."
      />

      <section className="library__section">
        <h3>Saved Discoveries ({saved.length})</h3>
        {saved.length === 0 ? (
          <p className="library__empty">
            Nothing saved yet. Save a discovery from the homepage or Surprise Me to start your collection.
          </p>
        ) : (
          <div className="library__grid">
            {saved.map((d) => (
              <DiscoveryTile key={d.id} discovery={d} />
            ))}
          </div>
        )}
      </section>

      <section className="library__section">
        <h3>Personal Philosophy Journal ({reflections.length})</h3>
        {reflections.length === 0 ? (
          <p className="library__empty">
            Your reflections on Today's Philosophy will collect here — one entry per day you check in.
          </p>
        ) : (
          <div className="library__journal">
            {reflections.map((r) => {
              const philosophy = philosophyContent.find((p) => p.id === r.philosophyId);
              return (
                <div key={r.date} className="journal-entry">
                  <div className="journal-entry__head">
                    <span className="journal-entry__date">{r.date}</span>
                    <span className={`journal-entry__rating journal-entry__rating--${r.rating}`}>
                      {RATING_LABEL[r.rating]}
                    </span>
                  </div>
                  <div className="journal-entry__philosophy">{philosophy?.title ?? 'Today\'s Philosophy'}</div>
                  {r.text && <p className="journal-entry__text">{r.text}</p>}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
