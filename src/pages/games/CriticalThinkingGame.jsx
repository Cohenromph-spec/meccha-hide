import { useState } from 'react';
import { Link } from 'react-router-dom';
import { criticalThinkingScenarios } from '../../data/games/criticalThinkingScenarios.js';
import { knowledgeNodes } from '../../data/knowledgeNodes.js';
import { createScenarioDeck, shuffleOptions } from '../../lib/games/scenarioPicker.js';
import { pickCriticalThinkingTier } from '../../lib/games/tierGate.js';
import { useGameSession } from '../../hooks/useGameSession.js';
import GameHeader from '../../components/games/GameHeader.jsx';
import GameSummary from '../../components/games/GameSummary.jsx';
import TierBadge from '../../components/games/TierBadge.jsx';
import './CriticalThinkingGame.css';

const DECKS_BY_TIER = {
  easy: createScenarioDeck(criticalThinkingScenarios.filter((s) => s.tier === 'easy')),
  medium: createScenarioDeck(criticalThinkingScenarios.filter((s) => s.tier === 'medium')),
  hard: createScenarioDeck(criticalThinkingScenarios.filter((s) => s.tier === 'hard')),
  connection: createScenarioDeck(criticalThinkingScenarios.filter((s) => s.tier === 'connection')),
  integration: createScenarioDeck(criticalThinkingScenarios.filter((s) => s.tier === 'integration')),
  expert: createScenarioDeck(criticalThinkingScenarios.filter((s) => s.tier === 'expert')),
};

// Easy/medium/hard are all "name the flaw" — a real recognition/
// application skill, but still terminology-first. The three deeper tiers
// each swap in a different reasoning-first question shape (see the big
// comment block at the top of criticalThinkingScenarios.js) instead of
// just harder fallacy-naming, so the game doesn't stay a vocabulary
// flashcard forever.
const TITLE = {
  easy: "What's the flaw in this reasoning?",
  medium: "What's the flaw in this reasoning?",
  hard: "What's the flaw in this reasoning?",
  assumption: "What does this argument secretly need to be true?",
  evidence: 'Which fact would actually change the conclusion?',
  compare: 'Which argument is actually better reasoned?',
};

function getRoundOptions(scenario) {
  if (scenario.questionType) return shuffleOptions(scenario.options);
  return shuffleOptions([scenario.flaw, ...scenario.distractors]);
}

export default function CriticalThinkingGame() {
  const { streak, bestStreak, totalCorrect, totalPlayed, submitAnswer } = useGameSession('criticalThinking');

  function newRound(currentStreak) {
    const tier = pickCriticalThinkingTier(currentStreak);
    const scenario = DECKS_BY_TIER[tier]();
    return { scenario, options: getRoundOptions(scenario) };
  }

  const [round, setRound] = useState(() => newRound(0));
  const [picked, setPicked] = useState(null);
  const [ended, setEnded] = useState(false);

  const { scenario, options } = round;
  const questionType = scenario.questionType; // undefined for the legacy "name the flaw" tiers
  const relatedNode = scenario.relatedNode ? knowledgeNodes.find((n) => n.id === scenario.relatedNode) : null;

  // Legacy shape: options are plain flaw-name strings, correctness is a
  // string match. New shape: options are {text, correct, note} objects —
  // `picked` is always the exact same reference as one entry in `options`
  // (handlePick is only ever called with one of them), so reference/
  // strict equality is enough either way without a separate key helper.
  function isCorrectOption(option) {
    return questionType ? option.correct === true : option === scenario.flaw;
  }
  function optionLabel(option) {
    return questionType ? option.text : option;
  }

  function handlePick(option) {
    if (picked !== null) return;
    setPicked(option);
    submitAnswer(isCorrectOption(option));
  }

  function nextRound(currentStreak) {
    setPicked(null);
    setRound(newRound(currentStreak));
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
            nextRound(0);
          }}
        />
      </div>
    );
  }

  return (
    <div className="ct-game">
      <GameHeader streak={streak} best={bestStreak} />

      <div className="ct-game__title-row">
        <h2 className="ct-game__title">{TITLE[questionType ?? scenario.tier]}</h2>
        <TierBadge tier={scenario.tier} />
      </div>

      {questionType === 'compare' ? (
        <div className="ct-game__compare">
          <p className="ct-game__claim">{scenario.claim}</p>
          <div className="ct-game__argument">
            <span className="ct-game__argument-label">Argument A</span>
            <p>{scenario.argumentA}</p>
          </div>
          <div className="ct-game__argument">
            <span className="ct-game__argument-label">Argument B</span>
            <p>{scenario.argumentB}</p>
          </div>
        </div>
      ) : (
        <div className="ct-game__scenario">{scenario.argument ?? scenario.scenario}</div>
      )}

      {scenario.prompt && <p className="ct-game__prompt">{scenario.prompt}</p>}

      <div className="ct-game__options">
        {options.map((option) => {
          const isPicked = picked === option;
          const isCorrect = isCorrectOption(option);
          const showState = picked !== null && (isPicked || isCorrect);
          return (
            <button
              key={questionType ? option.text : option}
              className={`ct-game__option${
                showState ? (isCorrect ? ' ct-game__option--correct' : ' ct-game__option--wrong') : ''
              }`}
              onClick={() => handlePick(option)}
              disabled={picked !== null}
            >
              {optionLabel(option)}
              {picked !== null && questionType && (isPicked || isCorrect) && (
                <span className="ct-game__option-note">{option.note}</span>
              )}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="ct-game__feedback">
          {!questionType && (
            <p>
              <strong>{isCorrectOption(picked) ? 'Correct — ' : 'Not quite — '}</strong>
              {scenario.explanation}
            </p>
          )}
          {relatedNode && (
            <Link to={`/explore?domain=${relatedNode.id}`} className="ct-game__related">
              Connects to {relatedNode.title} in your Knowledge Network →
            </Link>
          )}
          <button className="ct-game__next" onClick={() => nextRound(streak)}>
            Next →
          </button>
          <button className="ct-game__end" onClick={() => setEnded(true)}>
            End Session
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
