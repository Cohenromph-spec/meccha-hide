import { useState } from 'react';
import { Link } from 'react-router-dom';
import { criticalThinkingScenarios } from '../../data/games/criticalThinkingScenarios.js';
import { knowledgeNodes } from '../../data/knowledgeNodes.js';
import { pickRandom, shuffleOptions } from '../../lib/games/scenarioPicker.js';
import { useGameSession } from '../../hooks/useGameSession.js';
import GameHeader from '../../components/games/GameHeader.jsx';
import GameSummary from '../../components/games/GameSummary.jsx';
import './CriticalThinkingGame.css';

function newRound(excludeId) {
  const scenario = pickRandom(criticalThinkingScenarios, excludeId);
  return { scenario, options: shuffleOptions([scenario.flaw, ...scenario.distractors]) };
}

export default function CriticalThinkingGame() {
  const { streak, bestStreak, totalCorrect, totalPlayed, submitAnswer } = useGameSession('criticalThinking');
  const [round, setRound] = useState(() => newRound(null));
  const [picked, setPicked] = useState(null);
  const [ended, setEnded] = useState(false);

  const { scenario, options } = round;
  const relatedNode = scenario.relatedNode ? knowledgeNodes.find((n) => n.id === scenario.relatedNode) : null;

  function handlePick(option) {
    if (picked !== null) return;
    setPicked(option);
    submitAnswer(option === scenario.flaw);
  }

  function nextRound() {
    setPicked(null);
    setRound(newRound(scenario.id));
  }

  if (ended) {
    return (
      <div className="ct-game">
        <GameSummary
          stats={[
            { label: 'Correct', value: totalCorrect },
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
    <div className="ct-game">
      <GameHeader streak={streak} best={bestStreak} />

      <h2 className="ct-game__title">What's the flaw in this reasoning?</h2>

      <div className="ct-game__scenario">{scenario.scenario}</div>

      <div className="ct-game__options">
        {options.map((option) => {
          const isPicked = picked === option;
          const isCorrect = option === scenario.flaw;
          const showState = picked !== null && (isPicked || isCorrect);
          return (
            <button
              key={option}
              className={`ct-game__option${
                showState ? (isCorrect ? ' ct-game__option--correct' : ' ct-game__option--wrong') : ''
              }`}
              onClick={() => handlePick(option)}
              disabled={picked !== null}
            >
              {option}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="ct-game__feedback">
          <p>
            <strong>{picked === scenario.flaw ? 'Correct — ' : 'Not quite — '}</strong>
            {scenario.explanation}
          </p>
          {relatedNode && (
            <Link to={`/explore?domain=${relatedNode.id}`} className="ct-game__related">
              Connects to {relatedNode.title} in your Knowledge Network →
            </Link>
          )}
          <button className="ct-game__next" onClick={nextRound}>
            Next →
          </button>
        </div>
      )}

      {picked === null && totalPlayed > 0 && (
        <button className="ct-game__end" onClick={() => setEnded(true)}>
          End Session
        </button>
      )}
    </div>
  );
}
