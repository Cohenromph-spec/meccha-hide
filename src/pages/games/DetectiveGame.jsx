import { useRef, useState } from 'react';
import { detectiveMysteries } from '../../data/games/detectiveMysteries.js';
import { createScenarioDeck, shuffleOptions } from '../../lib/games/scenarioPicker.js';
import { useGameSession } from '../../hooks/useGameSession.js';
import GameHeader from '../../components/games/GameHeader.jsx';
import GameSummary from '../../components/games/GameSummary.jsx';
import './DetectiveGame.css';

const EASY = detectiveMysteries.filter((m) => m.tier === 'easy');
const MEDIUM = detectiveMysteries.filter((m) => m.tier === 'medium');
const HARD = detectiveMysteries.filter((m) => m.tier === 'hard');

const TIER_LABEL = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

/** Which clue (if any) eliminates this suspect — `eliminates` may be one name or several. */
function eliminatingClue(mystery, name) {
  return mystery.clues.find((c) => (Array.isArray(c.eliminates) ? c.eliminates.includes(name) : c.eliminates === name)) ?? null;
}

export default function DetectiveGame() {
  const { streak, bestStreak, totalCorrect, totalPlayed, submitAnswer } = useGameSession('detective');
  // One shuffle-bag per tier — a growing/shrinking eligible pool (as streak
  // rises) doesn't work with a single deck across all mysteries, since
  // medium/hard shouldn't surface at all until the streak earns them.
  const decksRef = useRef({
    easy: createScenarioDeck(EASY),
    medium: createScenarioDeck(MEDIUM),
    hard: createScenarioDeck(HARD),
  });

  function newRound(currentStreak) {
    const tiers = ['easy'];
    if (currentStreak >= 3) tiers.push('medium');
    if (currentStreak >= 8) tiers.push('hard');
    const tier = tiers[Math.floor(Math.random() * tiers.length)];
    const mystery = decksRef.current[tier]();
    return { mystery, suspects: shuffleOptions(mystery.suspects) };
  }

  const [round, setRound] = useState(() => newRound(0));
  const [picked, setPicked] = useState(null);
  const [ended, setEnded] = useState(false);

  const { mystery, suspects } = round;

  function handlePick(name) {
    if (picked !== null) return;
    setPicked(name);
    submitAnswer(name === mystery.solution);
  }

  function nextRound(currentStreak) {
    setPicked(null);
    setRound(newRound(currentStreak));
  }

  if (ended) {
    return (
      <div className="detective-game">
        <GameSummary
          stats={[
            { label: 'Solved', value: totalCorrect },
            { label: 'Played', value: totalPlayed },
            { label: 'Best Streak', value: bestStreak },
          ]}
          onPlayAgain={() => {
            setEnded(false);
            nextRound(0);
          }}
        />
      </div>
    );
  }

  return (
    <div className="detective-game">
      <GameHeader streak={streak} best={bestStreak} />

      <div className="detective-game__title-row">
        <h2 className="detective-game__title">Who did it?</h2>
        <span className={`detective-game__tier detective-game__tier--${mystery.tier}`}>{TIER_LABEL[mystery.tier]}</span>
      </div>

      <div className="detective-game__scenario">{mystery.scenario}</div>

      <div className="detective-game__clues">
        <span className="detective-game__clues-label">Clues</span>
        <ol>
          {mystery.clues.map((c, i) => (
            <li key={i}>{c.text}</li>
          ))}
        </ol>
      </div>

      <span className="detective-game__suspects-label">Suspects — check each fact against the clues above</span>
      <div className="detective-game__suspects">
        {suspects.map(({ name, fact }) => {
          const isPicked = picked === name;
          const isSolution = name === mystery.solution;
          const clue = eliminatingClue(mystery, name);
          const showState = picked !== null && (isPicked || isSolution);

          return (
            <button
              key={name}
              className={`detective-suspect${
                showState ? (isSolution ? ' detective-suspect--solution' : ' detective-suspect--eliminated') : ''
              }`}
              onClick={() => handlePick(name)}
              disabled={picked !== null}
            >
              <span className="detective-suspect__name">{name}</span>
              <span className="detective-suspect__fact">{fact}</span>
              {picked !== null && (
                <span className="detective-suspect__status">
                  {isSolution ? 'Not eliminated by any clue' : `Eliminated by clue: "${clue?.text}"`}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="detective-game__feedback">
          <p>{picked === mystery.solution ? `Solved it — ${mystery.solution} did it.` : `Not quite — it was ${mystery.solution}.`}</p>
          <button className="detective-game__next" onClick={() => nextRound(streak)}>
            Next Case →
          </button>
          <button className="detective-game__end" onClick={() => setEnded(true)}>
            End Session
          </button>
        </div>
      )}

      {picked === null && totalPlayed > 0 && (
        <button className="detective-game__end" onClick={() => setEnded(true)}>
          End Session
        </button>
      )}
    </div>
  );
}
