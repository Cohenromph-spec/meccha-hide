import { challengesContent } from '../../data/challengesContent.js';
import { useUser } from '../../context/UserContext.jsx';
import './LiveChallenges.css';

// Phase 1 shows a rotating pair so the homepage doesn't repeat the exact
// same two challenges forever — full browsing of all challenges is Phase 4.
function activeChallenges() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86_400_000);
  const start = dayOfYear % challengesContent.length;
  return [challengesContent[start], challengesContent[(start + 1) % challengesContent.length]];
}

export default function LiveChallenges() {
  const { profile, logChallengeProgress } = useUser();

  return (
    <section className="live-challenges">
      <h3 className="live-challenges__heading">Live Challenges</h3>
      <div className="live-challenges__list">
        {activeChallenges().map((challenge) => {
          const progress = profile.challengeProgress[challenge.id] ?? { count: 0, completedAt: null };
          const done = Boolean(progress.completedAt);

          return (
            <div key={challenge.id} className={`live-challenge${done ? ' live-challenge--done' : ''}`}>
              <div className="live-challenge__head">
                <span className="live-challenge__icon">{challenge.icon}</span>
                <div>
                  <div className="live-challenge__title">{challenge.title}</div>
                  <div className="live-challenge__difficulty">{challenge.difficulty}</div>
                </div>
              </div>
              <p className="live-challenge__desc">{challenge.description}</p>
              {challenge.caution && <p className="live-challenge__caution">{challenge.caution}</p>}

              <div className="live-challenge__footer">
                <span className="live-challenge__count">
                  {Math.min(progress.count, challenge.targetCount)} / {challenge.targetCount}
                </span>
                {done ? (
                  <span className="live-challenge__badge">Completed</span>
                ) : (
                  <button
                    onClick={() => logChallengeProgress(challenge.id, challenge.targetCount)}
                  >
                    Log progress
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
