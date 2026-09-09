import { useCallback, useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import { XP_AWARDS } from '../lib/progression.js';

/**
 * Shared scoring/streak/XP plumbing for any Nexus game. A new game (Human
 * Behavior, Critical Thinking, ...) should only need its own round-content
 * generator and UI — this is the reusable half the spec asks for, so that
 * plumbing isn't rebuilt from scratch each time.
 */
export function useGameSession(gameId) {
  const { gainXp, gainTokens, recordGameResult } = useUser();
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalPlayed, setTotalPlayed] = useState(0);

  const submitAnswer = useCallback(
    (correct) => {
      const nextStreak = correct ? streak + 1 : 0;
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
      setTotalPlayed((n) => n + 1);

      if (correct) {
        setTotalCorrect((n) => n + 1);
        gainXp(XP_AWARDS.gameRoundCorrect);
        if (nextStreak > 0 && nextStreak % 5 === 0) {
          gainXp(XP_AWARDS.gameStreakBonus);
          gainTokens(10);
        }
      }
      recordGameResult(gameId, { correct, streak: nextStreak });
      return nextStreak;
    },
    [streak, gainXp, gainTokens, recordGameResult, gameId]
  );

  return { streak, bestStreak, totalCorrect, totalPlayed, submitAnswer };
}
