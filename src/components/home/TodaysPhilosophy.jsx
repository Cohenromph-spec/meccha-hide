import { useState } from 'react';
import { philosophyContent } from '../../data/philosophyContent.js';
import { pickForToday } from '../../lib/daily.js';
import { useUser } from '../../context/UserContext.jsx';
import './TodaysPhilosophy.css';

const RATINGS = [
  { value: 'yes', label: 'Yes' },
  { value: 'somewhat', label: 'Somewhat' },
  { value: 'not-really', label: 'Not really' },
];

export default function TodaysPhilosophy() {
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState('');
  const { todaysReflection, reflectOnToday } = useUser();
  const philosophy = pickForToday(philosophyContent);

  const alreadyReflected = todaysReflection?.philosophyId === philosophy.id;

  function submit(rating) {
    reflectOnToday({ philosophyId: philosophy.id, rating, text: note.trim() });
  }

  return (
    <section className="philosophy-card">
      <div className="philosophy-card__eyebrow">Today's Philosophy</div>
      <h2 className="philosophy-card__title">{philosophy.title}</h2>
      <blockquote className="philosophy-card__quote">&ldquo;{philosophy.quote}&rdquo;</blockquote>
      <p className="philosophy-card__source">{philosophy.source}</p>

      <p className="philosophy-card__meaning">{philosophy.meaning}</p>

      {expanded && (
        <p className="philosophy-card__why">
          <strong>Why it matters — </strong>
          {philosophy.whyItMatters}
        </p>
      )}

      <button className="philosophy-card__toggle" onClick={() => setExpanded((v) => !v)}>
        {expanded ? 'Show less' : 'Why it matters →'}
      </button>

      <div className="philosophy-card__task">
        <span className="philosophy-card__task-label">Today's Task</span>
        <p>{philosophy.task}</p>
      </div>

      {alreadyReflected ? (
        <p className="philosophy-card__done">
          Reflected today — you said <strong>{RATINGS.find((r) => r.value === todaysReflection.rating)?.label}</strong>.
          {todaysReflection.text ? ` "${todaysReflection.text}"` : ''}
        </p>
      ) : (
        <div className="philosophy-card__reflect">
          <span className="philosophy-card__task-label">Did you live by it today?</span>
          <textarea
            placeholder={
              'Optional: what happened? (e.g. "I realized I was worrying about something that hadn\'t even happened yet.")'
            }
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
          />
          <div className="philosophy-card__ratings">
            {RATINGS.map((r) => (
              <button key={r.value} onClick={() => submit(r.value)}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
