import { useEffect, useRef, useState } from 'react';
import { generatePuzzle, parseCombo } from '../../lib/games/patternLogic.js';
import { useGameSession } from '../../hooks/useGameSession.js';
import ShapeIcon from '../../components/games/ShapeIcon.jsx';
import GameHeader from '../../components/games/GameHeader.jsx';
import GameSummary from '../../components/games/GameSummary.jsx';
import './PatternLogicGame.css';

const AUTO_ADVANCE_MS = 2200;

// 'shape-dual' tiles (Connection tier) carry two independent, simultaneously
// changing properties (shape + rotation) instead of one — sequence items
// are already {shape, rotation} objects, but option values are comboKey
// strings ("circle|90"), so they're parsed back into the same shape here.
function TileContent({ value, kind }) {
  if (kind === 'shape') return <ShapeIcon type={value} />;
  if (kind === 'shape-dual') {
    const combo = typeof value === 'string' ? parseCombo(value) : value;
    return (
      <span style={{ display: 'inline-flex', transform: `rotate(${combo.rotation}deg)` }}>
        <ShapeIcon type={combo.shape} />
      </span>
    );
  }
  return value;
}

function Tile({ value, kind, placeholder }) {
  if (placeholder) {
    return <div className="pattern-tile pattern-tile--placeholder">?</div>;
  }
  return (
    <div className="pattern-tile">
      <TileContent value={value} kind={kind} />
    </div>
  );
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
        <GameSummary
          stats={[
            { label: 'Correct', value: totalCorrect },
            { label: 'Played', value: totalPlayed },
            { label: 'Best Streak', value: bestStreak },
          ]}
          onPlayAgain={() => {
            setEnded(false);
            nextPuzzle(0);
          }}
        />
      </div>
    );
  }

  return (
    <div className="pattern-game">
      <GameHeader streak={streak} best={bestStreak} />

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
              <TileContent value={option} kind={puzzle.kind} />
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
          <button className="pattern-game__end" onClick={() => setEnded(true)}>
            End Session
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
