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
} from '../lib/store';
import { levelFromXp, titleForLevel, XP_AWARDS } from '../lib/progression';
import { firebaseReady } from '../lib/firebase';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

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

  const gainXp = useCallback(
    (amount, domain) => awardXp(uid, amount, domain),
    [uid]
  );

  const gainTokens = useCallback((amount) => addMemoryTokens(uid, amount), [uid]);

  const markNodeExplored = useCallback(
    (nodeId) => {
      if (profile.exploredNodeIds.includes(nodeId)) return;
      updateProfile(uid, { exploredNodeIds: [...profile.exploredNodeIds, nodeId] });
    },
    [uid, profile.exploredNodeIds]
  );

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
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>');
  return ctx;
}
