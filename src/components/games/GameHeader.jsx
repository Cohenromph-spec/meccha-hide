import { Link } from 'react-router-dom';
import './GameHeader.css';

/** Shared in-game header — back link + streak/best, reused across games. */
export default function GameHeader({ streak, best }) {
  return (
    <div className="game-header">
      <Link to="/play" className="game-header__back">
        ← Arcade
      </Link>
      <div className="game-header__meta">
        <span>
          Streak <strong>{streak}</strong>
        </span>
        <span>
          Best <strong>{best}</strong>
        </span>
      </div>
    </div>
  );
}
