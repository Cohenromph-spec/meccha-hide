import { useState } from 'react';
import { humanBehaviorScenarios } from '../../data/games/humanBehaviorScenarios.js';
import { pickRandom } from '../../lib/games/scenarioPicker.js';
import { useGameSession } from '../../hooks/useGameSession.js';
import GameHeader from '../../components/games/GameHeader.jsx';
import GameSummary from '../../components/games/GameSummary.jsx';
import './HumanBehaviorGame.css';

export default function HumanBehaviorGame() {
  const { streak, bestStreak, totalCorrect, totalPlayed, submitAnswer } = useGameSession('humanBehavior');
  const [scenario, setScenario] = useState(() => pickRandom(humanBehaviorScenarios, null));
  const [selected, setSelected] = useState(new Set());
  const [revealed, setRevealed] = useState(false);
  const [ended, setEnded] = useState(false);

  const reasonableTotal = scenario.explanations.filter((e) => e.reasonable).length;

  function toggle(index) {
    if (revealed) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function check() {
    if (selected.size === 0 || revealed) return;
    let reasonableSelected = 0;
    let overreachSelected = 0;
    scenario.explanations.forEach((e, i) => {
      if (!selected.has(i)) return;
      if (e.reasonable) reasonableSelected += 1;
      else overreachSelected += 1;
    });
    const fullCredit = reasonableSelected === reasonableTotal && overreachSelected === 0;
    submitAnswer(fullCredit);
    setRevealed(true);
  }

  function nextRound() {
    setScenario(pickRandom(humanBehaviorScenarios, scenario.id));
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
            nextRound();
          }}
        />
      </div>
    );
  }

  return (
    <div className="hb-game">
      <GameHeader streak={streak} best={bestStreak} />

      <h2 className="hb-game__title">Which explanations are actually reasonable?</h2>
      <p className="hb-game__subtitle">
        Select every possibility that's genuinely plausible. Skip the ones that jump to a conclusion the
        situation doesn't actually support.
      </p>

      <div className="hb-game__scenario">{scenario.scenario}</div>

      <div className="hb-game__options">
        {scenario.explanations.map((exp, i) => {
          const isSelected = selected.has(i);
          const stateClass = revealed
            ? exp.reasonable
              ? isSelected
                ? 'hb-option--hit'
                : 'hb-option--missed'
              : isSelected
              ? 'hb-option--overreach-picked'
              : 'hb-option--overreach-avoided'
            : isSelected
            ? 'hb-option--selected'
            : '';

          return (
            <button
              key={i}
              className={`hb-option ${stateClass}`}
              onClick={() => toggle(i)}
              disabled={revealed}
            >
              <span className="hb-option__check">{isSelected ? '✓' : ''}</span>
              <span className="hb-option__body">
                <span className="hb-option__text">{exp.text}</span>
                {revealed && (
                  <span className="hb-option__note">
                    {exp.reasonable ? 'Reasonable — ' : 'A leap — '}
                    {exp.note}
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
          <button className="hb-game__next" onClick={nextRound}>
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
