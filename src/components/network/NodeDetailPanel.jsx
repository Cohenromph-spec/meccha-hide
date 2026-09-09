import { useState } from 'react';
import { categoryAccent, categoryLabel } from '../../lib/categories.js';
import { shuffleOptions } from '../../lib/games/scenarioPicker.js';
import './NodeDetailPanel.css';

const STATE_LABEL = {
  locked: 'Locked',
  available: 'Available',
  explored: 'Explored',
};

const MIN_REFLECTION_LENGTH = 15;

/**
 * Unlocking a node used to be one click ("Mark as Explored"). Cohen wanted
 * real engagement instead — either write a short reflection on what the
 * node actually meant to you, or answer a comprehension question about it
 * (see the `check` field in data/knowledgeNodes.js, answerable purely from
 * the node's own description). Both paths end the same way: onExplore()
 * fires and the node unlocks; only the reflection path also has text to
 * save (onExplore(text) vs onExplore() for a correct quiz answer).
 */
function UnlockFlow({ node, onExplore }) {
  const [mode, setMode] = useState('choose'); // 'choose' | 'reflect' | 'quiz'
  const [reflection, setReflection] = useState('');
  const [quizOptions] = useState(() =>
    shuffleOptions(node.check.options.map((text, i) => ({ text, isCorrect: i === node.check.correctIndex })))
  );
  const [quizPicked, setQuizPicked] = useState(null);
  const [quizWrong, setQuizWrong] = useState(false);

  function pickQuizOption(option) {
    setQuizPicked(option.text);
    if (option.isCorrect) {
      onExplore();
    } else {
      setQuizWrong(true);
    }
  }

  if (mode === 'choose') {
    return (
      <div className="node-panel__unlock">
        <p className="node-panel__unlock-prompt">Unlock this node by engaging with it — pick one:</p>
        <button className="node-panel__unlock-choice" onClick={() => setMode('reflect')}>
          ✍️ Write a reflection
        </button>
        <button className="node-panel__unlock-choice" onClick={() => setMode('quiz')}>
          ❓ Answer a question
        </button>
      </div>
    );
  }

  if (mode === 'reflect') {
    const tooShort = reflection.trim().length < MIN_REFLECTION_LENGTH;
    return (
      <div className="node-panel__unlock">
        <p className="node-panel__unlock-prompt">What did this actually mean to you, or where have you seen it show up?</p>
        <textarea
          className="node-panel__unlock-textarea"
          rows={4}
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write a few sentences..."
          autoFocus
        />
        <div className="node-panel__unlock-actions">
          <button className="node-panel__unlock-back" onClick={() => setMode('choose')}>
            ← Back
          </button>
          <button
            className="node-panel__explore"
            disabled={tooShort}
            onClick={() => onExplore(reflection.trim())}
          >
            Unlock (+20 XP)
          </button>
        </div>
      </div>
    );
  }

  // mode === 'quiz'
  return (
    <div className="node-panel__unlock">
      <p className="node-panel__unlock-prompt">{node.check.question}</p>
      <div className="node-panel__quiz-options">
        {quizOptions.map((opt) => {
          const isPicked = quizPicked === opt.text;
          const showWrong = isPicked && !opt.isCorrect;
          return (
            <button
              key={opt.text}
              className={`node-panel__quiz-option${showWrong ? ' node-panel__quiz-option--wrong' : ''}`}
              onClick={() => pickQuizOption(opt)}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
      {quizWrong && (
        <p className="node-panel__quiz-feedback">Not quite — try another option, or write a reflection instead.</p>
      )}
      <button className="node-panel__unlock-back" onClick={() => setMode('choose')}>
        ← Back
      </button>
    </div>
  );
}

export default function NodeDetailPanel({ node, state, allNodes, onExplore, onSelectNode, onClose }) {
  const accent = categoryAccent(node.domain);
  const requiredTitles = node.requires
    .map((id) => allNodes.find((n) => n.id === id)?.title)
    .filter(Boolean);
  const connectedTitles = node.connects
    .map((id) => allNodes.find((n) => n.id === id))
    .filter(Boolean);

  return (
    <>
      <div className="node-panel__backdrop" onClick={onClose} />
      <aside className="node-panel" style={{ '--accent': accent }}>
        <button className="node-panel__close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="node-panel__category">{categoryLabel(node.domain)}</div>
        <h3 className="node-panel__title">{node.title}</h3>
        <span className={`node-panel__state node-panel__state--${state}`}>{STATE_LABEL[state]}</span>

        {state === 'locked' ? (
          <p className="node-panel__locked-note">
            Explore {requiredTitles.join(' and ')} first to unlock this.
          </p>
        ) : (
          <p className="node-panel__description">{node.description}</p>
        )}

        {connectedTitles.length > 0 && (
          <div className="node-panel__connections">
            <span className="node-panel__connections-label">Connects to</span>
            <div className="node-panel__connections-list">
              {connectedTitles.map((n) => (
                <button key={n.id} onClick={() => onSelectNode(n.id)} style={{ '--accent': categoryAccent(n.domain) }}>
                  {n.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {state === 'available' && <UnlockFlow node={node} onExplore={onExplore} />}
        {state === 'explored' && <div className="node-panel__done">✓ Added to your Knowledge Network</div>}
      </aside>
    </>
  );
}
