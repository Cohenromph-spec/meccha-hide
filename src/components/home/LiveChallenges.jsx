import { challengesContent } from '../../data/challengesContent.js';
import { pickMultipleForToday } from '../../lib/daily.js';
import { useUser } from '../../context/UserContext.jsx';
import './LiveChallenges.css';

// Phase 1 shows a rotating pair so the homepage doesn't repeat the exact
// same two challenges forever — full browsing of all challenges is Phase 4.
// This used to be its own local dayOfYear-modulo implementation — the exact
// bug already found and fixed in lib/daily.js's pickForToday, just never
// applied here (Cohen: "the live challenges never changed" — this is why).
// Reusing the shared, verified helper instead of maintaining a second copy.

export default function LiveChallenges() {
  const { profile, logChallengeProgress } = useUser();
  const activeChallenges = pickMultipleForToday(challengesContent, 2);

  return (
    <section className="live-challenges">
      <h3 className="live-challenges__heading">Live Challenges</h3>
      <div className="live-challenges__list">
        {activeChallenges.map((challenge) => {
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
