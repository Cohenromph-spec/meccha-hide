import PageHeader from '../components/common/PageHeader.jsx';
import { useUser } from '../context/UserContext.jsx';
import { levelFromXp } from '../lib/progression.js';
import { CATEGORIES } from '../lib/categories.js';
import { challengesContent } from '../data/challengesContent.js';
import { achievements } from '../data/achievements.js';
import './Journey.css';

const DOMAINS = ['ai', 'psychology', 'philosophy', 'world'];

export default function Journey() {
  const { profile, title, levelInfo, logChallengeProgress } = useUser();
  const unlockedCount = profile.unlockedAchievementIds.length;

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
          {challengesContent.map((challenge) => {
            const progress = profile.challengeProgress[challenge.id] ?? { count: 0, completedAt: null };
            const done = Boolean(progress.completedAt);
            return (
              <div key={challenge.id} className="journey-challenge">
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
            );
          })}
        </div>
      </section>

      <section className="journey__section">
        <div className="journey__achievements-head">
          <h3>Achievements</h3>
          <span className="journey__achievements-count">
            {unlockedCount} / {achievements.length}
          </span>
        </div>
        <div className="journey__achievements">
          {achievements.map((a) => {
            const unlocked = profile.unlockedAchievementIds.includes(a.id);
            return (
              <div key={a.id} className={`journey-achievement${unlocked ? ' journey-achievement--unlocked' : ''}`}>
                <span className="journey-achievement__icon">{unlocked ? a.icon : '🔒'}</span>
                <div className="journey-achievement__body">
                  <div className="journey-achievement__title">{a.title}</div>
                  <div className="journey-achievement__desc">{a.description}</div>
                </div>
                <span className="journey-achievement__reward">+{a.reward}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
