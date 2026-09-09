import { Link } from 'react-router-dom';
import './GameSummary.css';

/** Shared end-of-session screen — reused across games. */
export default function GameSummary({ stats, onPlayAgain }) {
  return (
    <div className="game-summary">
      <h2>Session Complete</h2>
      <div className="game-summary__stats">
        {stats.map(({ label, value }) => (
          <div key={label}>
            <span>{value}</span>
            <label>{label}</label>
          </div>
        ))}
      </div>
      <div className="game-summary__actions">
        <button onClick={onPlayAgain}>Play Again</button>
        <Link to="/play">Back to Arcade</Link>
      </div>
    </div>
  );
}
