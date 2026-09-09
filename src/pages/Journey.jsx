import { useState } from 'react';
import PageHeader from '../components/common/PageHeader.jsx';
import { useUser } from '../context/UserContext.jsx';
import { levelFromXp } from '../lib/progression.js';
import { CATEGORIES } from '../lib/categories.js';
import { challengesContent } from '../data/challengesContent.js';
import { achievementChains } from '../data/achievementChains.js';
import { getAllChainProgress } from '../lib/achievements.js';
import './Journey.css';

const DOMAINS = ['ai', 'psychology', 'philosophy', 'world'];

function ChallengeCard({ challenge }) {
  const { profile, logChallengeProgress, noteOnChallenge } = useUser();
  const progress = profile.challengeProgress[challenge.id] ?? { count: 0, completedAt: null, notes: '' };
  const done = Boolean(progress.completedAt);
  const saved = progress.notes ?? '';
  const [draft, setDraft] = useState(saved);
  const dirty = draft !== saved;

  return (
    <div className="journey-challenge">
      <div className="journey-challenge__row">
        <span className="journey-challenge__icon">{challenge.icon}</span>
        <div className="journey-challenge__body">
          <div className="journey-challenge__title">{challenge.title}</div>
          <div className="journey-challenge__count">
            {Math.min(progress.count, challenge.targetCount)} / {challenge.targetCount}
          </div>
        </div>
        {done ? (
          <span className="journey-challenge__done">✓</span>
        ) : (
          <button onClick={() => logChallengeProgress(challenge.id, challenge.targetCount)}>Log</button>
        )}
      </div>
      <div className="journey-challenge__notes">
        <label className="journey-challenge__notes-label" htmlFor={`challenge-note-${challenge.id}`}>
          {challenge.reflectionPrompt}
        </label>
        <textarea
          id={`challenge-note-${challenge.id}`}
          rows={2}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What did you notice? What did you learn?"
        />
        {dirty && (
          <button className="journey-challenge__notes-save" onClick={() => noteOnChallenge(challenge.id, draft.trim())}>
            Save note
          </button>
        )}
      </div>
    </div>
  );
}

export default function Journey() {
  const { profile, title, levelInfo } = useUser();
  const chainProgress = getAllChainProgress(profile);
  const totalTiers = achievementChains.reduce((sum, c) => sum + c.tiers.length, 0);
  const unlockedTiers = profile.unlockedAchievementIds.length;

  return (
    <div className="journey">
      <PageHeader title="Journey" subtitle="Your whole Nexus arc, in one place — levels, challenges, and what's ahead." />

      <section className="journey__section">
        <h3>Overall Level</h3>
        <div className="journey__overall">
          <div className="journey__overall-level">{levelInfo.level}</div>
          <div>
            <div className="journey__overall-title">{title}</div>
            <div className="journey__overall-xp">
              {levelInfo.xpIntoLevel} / {levelInfo.xpForNext} XP to Level {levelInfo.level + 1}
            </div>
          </div>
        </div>
      </section>

      <section className="journey__section">
        <h3>Knowledge Levels</h3>
        <div className="journey__domains">
          {DOMAINS.map((domain) => {
            const xp = profile.domainXp[domain] ?? 0;
            const info = levelFromXp(xp);
            const accent = `var(${CATEGORIES[domain].var})`;
            return (
              <div key={domain} className="journey-domain" style={{ '--accent': accent }}>
                <div className="journey-domain__head">
                  <span>{CATEGORIES[domain].label}</span>
                  <span>Level {info.level}</span>
                </div>
                <div className="journey-domain__track">
                  <div className="journey-domain__fill" style={{ width: `${info.progress * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="journey__section">
        <h3>All Live Challenges</h3>
        <div className="journey__challenges">
          {challengesContent.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </section>

      <section className="journey__section">
        <div className="journey__achievements-head">
          <h3>Achievements</h3>
          <span className="journey__achievements-count">
            {unlockedTiers} / {totalTiers}
          </span>
        </div>
        <div className="journey__achievements">
          {chainProgress.map((chain) => {
            const mastered = !chain.activeTier;
            const displayTier = chain.activeTier ?? chain.tiers[chain.tiers.length - 1];
            const prevThreshold = mastered ? 0 : chain.tiers[chain.tiers.indexOf(displayTier) - 1]?.threshold ?? 0;
            const span = Math.max(displayTier.threshold - prevThreshold, 1);
            const progress = mastered ? 1 : Math.min(Math.max((chain.value - prevThreshold) / span, 0), 1);

            return (
              <div key={chain.id} className={`journey-achievement${mastered ? ' journey-achievement--mastered' : ''}`}>
                <span className="journey-achievement__icon">{chain.icon}</span>
                <div className="journey-achievement__body">
                  <div className="journey-achievement__title-row">
                    <span className="journey-achievement__title">{displayTier.title}</span>
                    <span className="journey-achievement__pips">
                      {chain.tiers.map((t) => (
                        <span key={t.id} className={`journey-achievement__pip${t.unlocked ? ' journey-achievement__pip--filled' : ''}`} />
                      ))}
                    </span>
                  </div>
                  <div className="journey-achievement__desc">{displayTier.description}</div>
                  <div className="journey-achievement__track">
                    <div className="journey-achievement__fill" style={{ width: `${progress * 100}%` }} />
                  </div>
                  {!mastered && (
                    <div className="journey-achievement__progress-label">
                      {chain.value} / {displayTier.threshold}
                    </div>
                  )}
                </div>
                <span className="journey-achievement__reward">{mastered ? '✓' : `+${displayTier.reward}`}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
