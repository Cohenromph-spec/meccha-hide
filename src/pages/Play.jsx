import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader.jsx';
import { useUser } from '../context/UserContext.jsx';
import './Play.css';

const COMING_SOON = [
  {
    id: 'human-behavior',
    title: 'Human Behavior',
    tagline: 'Analyze a social scenario — multiple explanations, not one diagnosis.',
  },
  {
    id: 'critical-thinking',
    title: 'Critical Thinking',
    tagline: 'Spot the bias, the assumption, the gap in the argument.',
  },
  {
    id: 'detective',
    title: 'Detective',
    tagline: 'Work a mystery from evidence and contradictions.',
  },
];

export default function Play() {
  const { profile } = useUser();
  const stats = profile.gameStats.patternLogic;

  return (
    <div>
      <PageHeader title="Play" subtitle="Games that make you think, not shallow engagement traps." />

      <div className="arcade-grid">
        <Link to="/play/pattern-logic" className="arcade-card arcade-card--live">
          <div className="arcade-card__badge">Play now</div>
          <h3>Pattern Logic</h3>
          <p>Number and shape sequences — spot the rule, pick what comes next. Never the same puzzle twice.</p>
          {stats && (
            <div className="arcade-card__stats">
              Best streak: <strong>{stats.bestStreak}</strong> · {stats.totalCorrect}/{stats.totalPlayed} correct
            </div>
          )}
        </Link>

        {COMING_SOON.map((game) => (
          <div key={game.id} className="arcade-card arcade-card--soon">
            <div className="arcade-card__badge arcade-card__badge--soon">Coming soon</div>
            <h3>{game.title}</h3>
            <p>{game.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
