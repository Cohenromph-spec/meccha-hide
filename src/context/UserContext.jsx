import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { watchAuth } from '../lib/auth';
import {
  LOCAL_UID,
  DEFAULT_PROFILE,
  subscribeProfile,
  awardXp,
  addMemoryTokens,
  updateProfile,
  addReflection,
  incrementChallenge,
  completeChallenge,
  recordGameRound,
  completeDailyPuzzle,
  unlockAchievements,
  purchaseTheme,
  equipTheme,
  exploreNode,
  saveDiscoveryNote,
  saveChallengeNote,
} from '../lib/store';
import { levelFromXp, titleForLevel, XP_AWARDS } from '../lib/progression';
import { firebaseReady } from '../lib/firebase';
import { todayStr } from '../lib/date';
import { getNewlyUnlocked } from '../lib/achievements';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [authUser, setAuthUser] = useState(undefined); // undefined = not resolved yet
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  useEffect(() => watchAuth(setAuthUser), []);

  const uid = authUser ? authUser.uid : LOCAL_UID;

  useEffect(() => {
    const unsubscribe = subscribeProfile(uid, setProfile);
    return unsubscribe;
  }, [uid]);

  // Re-checked on every profile change, not on a specific action — an
  // achievement can become true from any stat (XP, a saved discovery, a
  // game streak, ...), so one central check is simpler and can't miss a
  // trigger point the way "call checkAchievements() after every action
  // that might matter" inevitably would. unlockAchievements re-dedupes
  // against the freshest profile itself, so this can't double-award even
  // though it fires again after its own write updates `profile`.
  useEffect(() => {
    const newlyUnlocked = getNewlyUnlocked(profile);
    if (newlyUnlocked.length > 0) {
      unlockAchievements(uid, newlyUnlocked);
    }
  }, [uid, profile]);

  const gainXp = useCallback(
    (amount, domain) => awardXp(uid, amount, domain),
    [uid]
  );

  const gainTokens = useCallback((amount) => addMemoryTokens(uid, amount), [uid]);

  // `note` is the written reflection, when that's the path the user took to
  // unlock the node — omitted when they unlocked it by answering the
  // comprehension question instead (see NodeDetailPanel).
  const markNodeExplored = useCallback(
    (nodeId, note) => {
      if (profile.exploredNodeIds.includes(nodeId)) return;
      exploreNode(uid, nodeId, note);
    },
    [uid, profile.exploredNodeIds]
  );

  const noteOnDiscovery = useCallback((discoveryId, text) => saveDiscoveryNote(uid, discoveryId, text), [uid]);

  const noteOnChallenge = useCallback((challengeId, text) => saveChallengeNote(uid, challengeId, text), [uid]);

  const saveDiscovery = useCallback(
    (discoveryId) => {
      if (profile.savedDiscoveryIds.includes(discoveryId)) return;
      updateProfile(uid, { savedDiscoveryIds: [...profile.savedDiscoveryIds, discoveryId] });
      gainXp(XP_AWARDS.discoverySaved);
      gainTokens(5);
    },
    [uid, profile.savedDiscoveryIds, gainXp, gainTokens]
  );

  const todaysReflection = useMemo(
    () => profile.reflections.find((r) => r.date === todayStr()) ?? null,
    [profile.reflections]
  );

  const reflectOnToday = useCallback(
    (entry) => {
      if (todaysReflection) return; // one reflection per day
      addReflection(uid, { ...entry, date: todayStr(), createdAt: Date.now() });
      gainXp(XP_AWARDS.reflectionWritten);
    },
    [uid, todaysReflection, gainXp]
  );

  const logChallengeProgress = useCallback(
    async (challengeId, targetCount) => {
      const newCount = await incrementChallenge(uid, challengeId);
      if (newCount >= targetCount) {
        await completeChallenge(uid, challengeId);
        gainXp(XP_AWARDS.challengeCompleted);
        gainTokens(20);
      } else {
        gainXp(XP_AWARDS.challengeStepCompleted);
      }
    },
    [uid, gainXp, gainTokens]
  );

  const recordGameResult = useCallback(
    (gameId, result) => recordGameRound(uid, gameId, result),
    [uid]
  );

  const dailyPuzzleDoneToday = profile.dailyPuzzle.date === todayStr();

  const finishDailyPuzzle = useCallback(
    (correct) => {
      if (dailyPuzzleDoneToday) return; // one attempt per day
      completeDailyPuzzle(uid, correct);
      gainXp(correct ? XP_AWARDS.dailyPuzzleCorrect : XP_AWARDS.dailyPuzzleAttempted);
      if (correct) gainTokens(10);
    },
    [uid, dailyPuzzleDoneToday, gainXp, gainTokens]
  );

  const buyTheme = useCallback((themeId, cost) => purchaseTheme(uid, themeId, cost), [uid]);
  const wearTheme = useCallback((themeId) => equipTheme(uid, themeId), [uid]);

  const levelInfo = useMemo(() => levelFromXp(profile.xp), [profile.xp]);
  const title = useMemo(() => titleForLevel(levelInfo.level), [levelInfo.level]);

  const value = useMemo(
    () => ({
      authUser: authUser ?? null,
      authResolved: authUser !== undefined,
      isLocalOnly: !firebaseReady,
      uid,
      profile,
      levelInfo,
      title,
      gainXp,
      gainTokens,
      markNodeExplored,
      saveDiscovery,
      todaysReflection,
      reflectOnToday,
      logChallengeProgress,
      recordGameResult,
      dailyPuzzleDoneToday,
      finishDailyPuzzle,
      buyTheme,
      wearTheme,
      noteOnDiscovery,
      noteOnChallenge,
    }),
    [
      authUser,
      uid,
      profile,
      levelInfo,
      title,
      gainXp,
      gainTokens,
      markNodeExplored,
      saveDiscovery,
      todaysReflection,
      reflectOnToday,
      logChallengeProgress,
      recordGameResult,
      dailyPuzzleDoneToday,
      finishDailyPuzzle,
      buyTheme,
      wearTheme,
      noteOnDiscovery,
      noteOnChallenge,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>');
  return ctx;
}
