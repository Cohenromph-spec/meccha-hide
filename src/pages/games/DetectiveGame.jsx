import { useRef, useState } from 'react';
import { detectiveMysteries } from '../../data/games/detectiveMysteries.js';
import { createScenarioDeck, shuffleOptions } from '../../lib/games/scenarioPicker.js';
import { useGameSession } from '../../hooks/useGameSession.js';
import GameHeader from '../../components/games/GameHeader.jsx';
import GameSummary from '../../components/games/GameSummary.jsx';
import './DetectiveGame.css';

function newRound(draw) {
  const mystery = draw();
  return { mystery, suspects: shuffleOptions(mystery.suspects) };
}

/** Which clue (if any) eliminates this suspect. */
function eliminatingClue(mystery, suspect) {
  return mystery.clues.find((c) => c.eliminates === suspect) ?? null;
}

export default function DetectiveGame() {
  const { streak, bestStreak, totalCorrect, totalPlayed, submitAnswer } = useGameSession('detective');
  const deckRef = useRef(createScenarioDeck(detectiveMysteries));
  const [round, setRound] = useState(() => newRound(deckRef.current));
  const [picked, setPicked] = useState(null);
  const [ended, setEnded] = useState(false);

  const { mystery, suspects } = round;

  function handlePick(suspect) {
    if (picked !== null) return;
    setPicked(suspect);
    submitAnswer(suspect === mystery.solution);
  }

  function nextRound() {
    setPicked(null);
    setRound(newRound(deckRef.current));
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
            nextRound();
          }}
        />
      </div>
    );
  }

  return (
    <div className="detective-game">
      <GameHeader streak={streak} best={bestStreak} />

      <h2 className="detective-game__title">Who did it?</h2>

      <div className="detective-game__scenario">{mystery.scenario}</div>

      <div className="detective-game__clues">
        <span className="detective-game__clues-label">Clues</span>
        <ol>
          {mystery.clues.map((c, i) => (
            <li key={i}>{c.text}</li>
          ))}
        </ol>
      </div>

      <div className="detective-game__suspects">
        {suspects.map((suspect) => {
          const isPicked = picked === suspect;
          const isSolution = suspect === mystery.solution;
          const clue = eliminatingClue(mystery, suspect);
          const showState = picked !== null && (isPicked || isSolution);

          return (
            <button
              key={suspect}
              className={`detective-suspect${
                showState ? (isSolution ? ' detective-suspect--solution' : ' detective-suspect--eliminated') : ''
              }`}
              onClick={() => handlePick(suspect)}
              disabled={picked !== null}
            >
              <span className="detective-suspect__name">{suspect}</span>
              {picked !== null && (
                <span className="detective-suspect__status">
                  {isSolution ? 'Not eliminated by any clue' : `Eliminated — ${clue?.text}`}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="detective-game__feedback">
          <p>{picked === mystery.solution ? `Solved it — ${mystery.solution} did it.` : `Not quite — it was ${mystery.solution}.`}</p>
          <button className="detective-game__next" onClick={nextRound}>
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
