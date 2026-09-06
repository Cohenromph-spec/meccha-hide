import { useState } from 'react';
import { discoveryContent } from '../../data/discoveryContent.js';
import { philosophyContent } from '../../data/philosophyContent.js';
import { challengesContent } from '../../data/challengesContent.js';
import { pickRandom } from '../../lib/daily.js';
import { categoryAccent, categoryLabel } from '../../lib/categories.js';
import { IconSpark } from '../layout/icons.jsx';
import { useUser } from '../../context/UserContext.jsx';
import './SurpriseMe.css';

const POOL = [
  ...discoveryContent.map((d) => ({ kind: 'discovery', ...d })),
  ...philosophyContent.map((p) => ({ kind: 'philosophy', category: 'philosophy', id: p.id, title: p.title, fact: p.quote, whyItMatters: p.meaning })),
  ...challengesContent.map((c) => ({ kind: 'challenge', category: 'world', id: c.id, title: c.title, fact: c.description, whyItMatters: c.reflectionPrompt })),
];

const KIND_LABEL = {
  discovery: 'Discovery',
  philosophy: 'Philosophy Question',
  challenge: 'Real-World Challenge',
};

export default function SurpriseMe() {
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const { saveDiscovery, profile } = useUser();

  function surprise() {
    setSpinning(true);
    window.setTimeout(() => {
      setResult(pickRandom(POOL, result?.id));
      setSpinning(false);
    }, 260);
  }

  const accent = result ? categoryAccent(result.category) : 'var(--brand)';
  const saved = result?.kind === 'discovery' && profile.savedDiscoveryIds.includes(result.id);

  return (
    <section className="surprise-me" style={{ '--accent': accent }}>
      {!result ? (
        <>
          <IconSpark width={28} height={28} className={`surprise-me__spark${spinning ? ' spin' : ''}`} />
          <h3>I'm bored. Give me something interesting.</h3>
          <p>A discovery, a question, or a challenge — picked at random.</p>
          <button className="surprise-me__button" onClick={surprise} disabled={spinning}>
            Surprise Me
          </button>
        </>
      ) : (
        <div className="surprise-me__result">
          <div className="surprise-me__result-kind">{KIND_LABEL[result.kind]}</div>
          <h4>{result.title}</h4>
          <p className="surprise-me__result-fact">{result.fact}</p>
          {result.whyItMatters && <p className="surprise-me__result-why">{result.whyItMatters}</p>}
          <div className="surprise-me__result-actions">
            {result.kind === 'discovery' && (
              <button disabled={saved} onClick={() => saveDiscovery(result.id)}>
                {saved ? 'Saved' : 'Save'}
              </button>
            )}
            <button className="surprise-me__again" onClick={surprise}>
              Again →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
