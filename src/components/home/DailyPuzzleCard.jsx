import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTodaysPuzzle } from '../../lib/games/dailyPuzzle.js';
import { useUser } from '../../context/UserContext.jsx';
import ShapeIcon from '../games/ShapeIcon.jsx';
import './DailyPuzzleCard.css';

function Tile({ value, kind, placeholder }) {
  if (placeholder) return <div className="daily-puzzle__tile daily-puzzle__tile--placeholder">?</div>;
  return <div className="daily-puzzle__tile">{kind === 'shape' ? <ShapeIcon type={value} size={20} /> : value}</div>;
}

export default function DailyPuzzleCard() {
  const { profile, dailyPuzzleDoneToday, finishDailyPuzzle } = useUser();
  const puzzle = useMemo(() => getTodaysPuzzle(), []);
  const [picked, setPicked] = useState(null);

  const alreadyDone = dailyPuzzleDoneToday;
  const wasCorrect = alreadyDone ? profile.dailyPuzzle.correct : null;

  function handlePick(option) {
    if (picked !== null || alreadyDone) return;
    setPicked(option);
    finishDailyPuzzle(option === puzzle.answer);
  }

  return (
    <div className="daily-puzzle">
      <div className="daily-puzzle__header">
        <span className="daily-puzzle__label">Daily Puzzle</span>
        {profile.dailyPuzzle.streak > 0 && (
          <span className="daily-puzzle__streak">🔥 {profile.dailyPuzzle.streak}-day streak</span>
        )}
      </div>

      {alreadyDone ? (
        <div className="daily-puzzle__done">
          <p>
            {wasCorrect ? "Solved today's puzzle." : "You gave today's puzzle a shot."} Come back tomorrow for a
            new one.
          </p>
          <Link to="/play/pattern-logic">Keep practicing in the Arcade →</Link>
        </div>
      ) : (
        <>
          <p className="daily-puzzle__prompt">What comes next? One shot — same puzzle for everyone today.</p>
          <div className="daily-puzzle__sequence">
            {puzzle.sequence.map((item, i) => (
              <Tile key={i} value={item} kind={puzzle.kind} />
            ))}
            <Tile placeholder />
          </div>
          <div className="daily-puzzle__options">
            {puzzle.options.map((option, i) => {
              const isPicked = picked === option;
              const isCorrect = option === puzzle.answer;
              const showState = picked !== null && (isPicked || isCorrect);
              return (
                <button
                  key={i}
                  className={`daily-puzzle__option${
                    showState ? (isCorrect ? ' daily-puzzle__option--correct' : ' daily-puzzle__option--wrong') : ''
                  }`}
                  onClick={() => handlePick(option)}
                  disabled={picked !== null}
                >
                  {puzzle.kind === 'shape' ? <ShapeIcon type={option} size={18} /> : option}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <p className="daily-puzzle__feedback">
              {picked === puzzle.answer ? 'Correct! ' : 'Not quite. '}
              {puzzle.explanation} Come back tomorrow for a new one.
            </p>
          )}
        </>
      )}
    </div>
  );
}
