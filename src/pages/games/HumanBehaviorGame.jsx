import { useState } from 'react';
import { humanBehaviorScenarios } from '../../data/games/humanBehaviorScenarios.js';
import { createScenarioDeck, shuffleOptions } from '../../lib/games/scenarioPicker.js';
import { pickHumanBehaviorTier } from '../../lib/games/tierGate.js';
import { useGameSession } from '../../hooks/useGameSession.js';
import GameHeader from '../../components/games/GameHeader.jsx';
import GameSummary from '../../components/games/GameSummary.jsx';
import TierBadge from '../../components/games/TierBadge.jsx';
import './HumanBehaviorGame.css';

const DECKS_BY_TIER = {
  easy: createScenarioDeck(humanBehaviorScenarios.filter((s) => s.tier === 'easy')),
  medium: createScenarioDeck(humanBehaviorScenarios.filter((s) => s.tier === 'medium')),
  connection: createScenarioDeck(humanBehaviorScenarios.filter((s) => s.tier === 'connection')),
  integration: createScenarioDeck(humanBehaviorScenarios.filter((s) => s.tier === 'integration')),
  expert: createScenarioDeck(humanBehaviorScenarios.filter((s) => s.tier === 'expert')),
};

// 'easy'/'medium'/'connection' are all "select every option that fits" —
// they only differ in what "fits" means (see MULTI_MODE below). 'integration'
// and 'expert' are "pick the single best-supported option" and share the
// options array on the scenario itself instead of `explanations`.
const MULTI_TIERS = new Set(['easy', 'medium', 'connection']);

// What counts as a correct pick for each multi-select tier, and how each
// option is labeled once revealed. Easy/medium keep the original binary
// reasonable/overreach framing; connection adds the three-way possible/
// supported/overreach distinction from Cohen's reasoning-depth spec.
const MULTI_MODE = {
  easy: {
    isTarget: (e) => e.reasonable,
    label: (e) => (e.reasonable ? 'Reasonable — ' : 'A leap — '),
  },
  medium: {
    isTarget: (e) => e.reasonable,
    label: (e) => (e.reasonable ? 'Reasonable — ' : 'A leap — '),
  },
  connection: {
    isTarget: (e) => e.category === 'supported',
    label: (e) =>
      e.category === 'supported'
        ? 'Supported by this scenario — '
        : e.category === 'possible'
        ? "Possible, but not backed by this scenario — "
        : 'A leap — ',
  },
};

const TITLE = {
  easy: 'Which explanations are actually reasonable?',
  medium: 'Which explanations are actually reasonable?',
  connection: 'Which explanations does THIS scenario actually support?',
  integration: 'Which explanation fits every detail?',
  expert: 'What does the evidence actually support?',
};

const SUBTITLE = {
  easy: "Select every possibility that's genuinely plausible. Skip the ones that jump to a conclusion the situation doesn't actually support.",
  medium:
    "Select every possibility that's genuinely plausible. Skip the ones that jump to a conclusion the situation doesn't actually support.",
  connection:
    "Some options are generically believable but not actually backed by THIS scenario's details — select only the ones this specific situation supports.",
  integration:
    'Several options sound reasonable on their own. Pick the one that actually accounts for every detail given — not just some of them.',
  expert:
    "Sometimes the evidence points somewhere specific. Sometimes it genuinely doesn't yet — that's a real answer here too, not a fallback.",
};

function getRoundItems(scenario) {
  const source = MULTI_TIERS.has(scenario.tier) ? scenario.explanations : scenario.options;
  return shuffleOptions(source);
}

export default function HumanBehaviorGame() {
  const { streak, bestStreak, totalCorrect, totalPlayed, submitAnswer } = useGameSession('humanBehavior');

  function newRound(currentStreak) {
    const tier = pickHumanBehaviorTier(currentStreak);
    const scenario = DECKS_BY_TIER[tier]();
    return { scenario, items: getRoundItems(scenario) };
  }

  const [round, setRound] = useState(() => newRound(0));
  const [selected, setSelected] = useState(new Set());
  const [revealed, setRevealed] = useState(false);
  const [ended, setEnded] = useState(false);

  const { scenario, items } = round;
  const tier = scenario.tier;
  const isMulti = MULTI_TIERS.has(tier);
  const mode = MULTI_MODE[tier];
  const targetCount = isMulti ? items.filter((e) => mode.isTarget(e)).length : 1;

  function toggle(index) {
    if (revealed) return;
    setSelected((prev) => {
      if (!isMulti) return new Set([index]);
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function check() {
    if (selected.size === 0 || revealed) return;
    let fullCredit;
    if (isMulti) {
      let hits = 0;
      let misses = 0;
      items.forEach((e, i) => {
        if (!selected.has(i)) return;
        if (mode.isTarget(e)) hits += 1;
        else misses += 1;
      });
      fullCredit = hits === targetCount && misses === 0;
    } else {
      const [onlyIndex] = selected;
      fullCredit = items[onlyIndex]?.correct === true;
    }
    submitAnswer(fullCredit);
    setRevealed(true);
  }

  function nextRound(currentStreak) {
    setRound(newRound(currentStreak));
    setSelected(new Set());
    setRevealed(false);
  }

  if (ended) {
    return (
      <div className="hb-game">
        <GameSummary
          stats={[
            { label: 'Full Credit', value: totalCorrect },
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
    <div className="hb-game">
      <GameHeader streak={streak} best={bestStreak} />

      <div className="hb-game__title-row">
        <h2 className="hb-game__title">{TITLE[tier]}</h2>
        <TierBadge tier={tier} />
      </div>
      <p className="hb-game__subtitle">{SUBTITLE[tier]}</p>

      <div className="hb-game__scenario">{scenario.scenario}</div>

      <div className="hb-game__options">
        {items.map((item, i) => {
          const isSelected = selected.has(i);
          const isTarget = isMulti ? mode.isTarget(item) : item.correct === true;

          let stateClass = '';
          if (revealed) {
            if (isTarget) {
              stateClass = isSelected ? 'hb-option--hit' : 'hb-option--missed';
            } else {
              stateClass = isSelected ? 'hb-option--overreach-picked' : 'hb-option--overreach-avoided';
            }
          } else if (isSelected) {
            stateClass = 'hb-option--selected';
          }

          const shape = isMulti ? 'hb-option__check--box' : 'hb-option__check--radio';

          return (
            <button
              key={i}
              className={`hb-option ${stateClass}`}
              onClick={() => toggle(i)}
              disabled={revealed}
            >
              <span className={`hb-option__check ${shape}`}>{isSelected ? (isMulti ? '✓' : '●') : ''}</span>
              <span className="hb-option__body">
                <span className="hb-option__text">{item.text}</span>
                {revealed && (
                  <span className="hb-option__note">
                    {isMulti ? mode.label(item) : isTarget ? 'Best supported — ' : 'Not the best fit — '}
                    {item.note}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {!revealed ? (
        <button className="hb-game__check" onClick={check} disabled={selected.size === 0}>
          Check My Thinking
        </button>
      ) : (
        <div className="hb-game__feedback">
          <button className="hb-game__next" onClick={() => nextRound(streak)}>
            Next →
          </button>
          <button className="hb-game__end" onClick={() => setEnded(true)}>
            End Session
          </button>
        </div>
      )}

      {!revealed && totalPlayed > 0 && (
        <button className="hb-game__end hb-game__end--inline" onClick={() => setEnded(true)}>
          End Session
        </button>
      )}
    </div>
  );
}
