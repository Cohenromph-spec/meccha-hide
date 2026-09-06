import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { generatePuzzle } from '../../lib/games/patternLogic.js';
import { useGameSession } from '../../hooks/useGameSession.js';
import ShapeIcon from '../../components/games/ShapeIcon.jsx';
import './PatternLogicGame.css';

const AUTO_ADVANCE_MS = 2200;

function Tile({ value, kind, placeholder }) {
  if (placeholder) {
    return <div className="pattern-tile pattern-tile--placeholder">?</div>;
  }
  return <div className="pattern-tile">{kind === 'shape' ? <ShapeIcon type={value} /> : value}</div>;
}

export default function PatternLogicGame() {
  const { streak, bestStreak, totalCorrect, totalPlayed, submitAnswer } = useGameSession('patternLogic');
  const [puzzle, setPuzzle] = useState(() => generatePuzzle(0));
  const [picked, setPicked] = useState(null);
  const [ended, setEnded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  function nextPuzzle(currentStreak) {
    clearTimeout(timeoutRef.current);
    setPicked(null);
    setPuzzle(generatePuzzle(currentStreak));
  }

  function handlePick(option) {
    if (picked !== null) return;
    setPicked(option);
    const correct = option === puzzle.answer;
    const nextStreak = submitAnswer(correct);
    timeoutRef.current = setTimeout(() => nextPuzzle(nextStreak), AUTO_ADVANCE_MS);
  }

  if (ended) {
    return (
      <div className="pattern-game">
        <div className="pattern-game__summary">
          <h2>Session Complete</h2>
          <div className="pattern-game__stats">
            <div>
              <span>{totalCorrect}</span>
              <label>Correct</label>
            </div>
            <div>
              <span>{totalPlayed}</span>
              <label>Played</label>
            </div>
            <div>
              <span>{bestStreak}</span>
              <label>Best Streak</label>
            </div>
          </div>
          <div className="pattern-game__summary-actions">
            <button
              onClick={() => {
                setEnded(false);
                nextPuzzle(0);
              }}
            >
              Play Again
            </button>
            <Link to="/play">Back to Arcade</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pattern-game">
      <div className="pattern-game__header">
        <Link to="/play" className="pattern-game__back">
          ← Arcade
        </Link>
        <div className="pattern-game__meta">
          <span>
            Streak <strong>{streak}</strong>
          </span>
          <span>
            Best <strong>{bestStreak}</strong>
          </span>
        </div>
      </div>

      <h2 className="pattern-game__title">What comes next?</h2>

      <div className="pattern-game__sequence">
        {puzzle.sequence.map((item, i) => (
          <Tile key={i} value={item} kind={puzzle.kind} />
        ))}
        <Tile placeholder />
      </div>

      <div className="pattern-game__options">
        {puzzle.options.map((option, i) => {
          const isPicked = picked === option;
          const isCorrect = option === puzzle.answer;
          const showState = picked !== null && (isPicked || isCorrect);
          return (
            <button
              key={i}
              className={`pattern-game__option${
                showState ? (isCorrect ? ' pattern-game__option--correct' : ' pattern-game__option--wrong') : ''
              }`}
              onClick={() => handlePick(option)}
              disabled={picked !== null}
            >
              {puzzle.kind === 'shape' ? <ShapeIcon type={option} /> : option}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="pattern-game__feedback">
          <p>{picked === puzzle.answer ? 'Correct.' : 'Not quite.'} {puzzle.explanation}</p>
          <button className="pattern-game__next" onClick={() => nextPuzzle(streak)}>
            Next →
          </button>
        </div>
      )}

      {picked === null && totalPlayed > 0 && (
        <button className="pattern-game__end" onClick={() => setEnded(true)}>
          End Session
        </button>
      )}
    </div>
  );
}
