/**
 * Achievements — Phase 7. Every condition here reads a stat the app
 * already tracks in the profile (see DEFAULT_PROFILE in lib/store.js) —
 * nothing invented just to have something to unlock. `check(profile)`
 * must be a pure function of the profile so it can be re-evaluated safely
 * on every profile change (see lib/achievements.js).
 *
 * Three names below — "Deep Thinker", "The Observer", "AI Explorer" —
 * were already promised by the old "Coming Soon" placeholder text in
 * Journey.jsx, so they're preserved here rather than renamed.
 */
import { levelFromXp } from '../lib/progression.js';

export const achievements = [
  // --- Knowledge Network ---
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Explore your first node in the Knowledge Network.',
    icon: '🧭',
    reward: 10,
    check: (p) => p.exploredNodeIds.length >= 1,
  },
  {
    id: 'deep-thinker',
    title: 'Deep Thinker',
    description: 'Explore 10 nodes in the Knowledge Network.',
    icon: '🧠',
    reward: 25,
    check: (p) => p.exploredNodeIds.length >= 10,
  },
  {
    id: 'network-master',
    title: 'Network Master',
    description: 'Explore every node in the Knowledge Network.',
    icon: '🕸️',
    reward: 60,
    check: (p) => p.exploredNodeIds.length >= 20,
  },

  // --- Discoveries / Library ---
  {
    id: 'the-observer',
    title: 'The Observer',
    description: 'Save 5 discoveries to your Library.',
    icon: '👀',
    reward: 20,
    check: (p) => p.savedDiscoveryIds.length >= 5,
  },
  {
    id: 'collector',
    title: 'Collector',
    description: 'Save 15 discoveries to your Library.',
    icon: '📚',
    reward: 40,
    check: (p) => p.savedDiscoveryIds.length >= 15,
  },

  // --- Reflection ---
  {
    id: 'first-reflection',
    title: 'First Reflection',
    description: "Write your first Today's Philosophy reflection.",
    icon: '✍️',
    reward: 10,
    check: (p) => p.reflections.length >= 1,
  },
  {
    id: 'consistent-mind',
    title: 'Consistent Mind',
    description: 'Write 7 daily reflections.',
    icon: '📝',
    reward: 30,
    check: (p) => p.reflections.length >= 7,
  },
  {
    id: 'committed',
    title: 'Committed',
    description: 'Write 30 daily reflections.',
    icon: '🕯️',
    reward: 75,
    check: (p) => p.reflections.length >= 30,
  },

  // --- Live Challenges ---
  {
    id: 'challenge-accepted',
    title: 'Challenge Accepted',
    description: 'Complete your first Live Challenge.',
    icon: '✅',
    reward: 15,
    check: (p) => Object.values(p.challengeProgress).some((c) => c.completedAt),
  },
  {
    id: 'challenge-champion',
    title: 'Challenge Champion',
    description: 'Complete every Live Challenge.',
    icon: '🏆',
    reward: 50,
    // Every challenge in the content bank, not a hardcoded count — stays
    // correct automatically if challengesContent.js grows.
    check: (p, ctx) => ctx.challengeIds.every((id) => p.challengeProgress[id]?.completedAt),
  },

  // --- Game Arcade ---
  {
    id: 'pattern-seeker',
    title: 'Pattern Seeker',
    description: 'Reach a 5-streak in Pattern Logic.',
    icon: '🔢',
    reward: 20,
    check: (p) => (p.gameStats.patternLogic?.bestStreak ?? 0) >= 5,
  },
  {
    id: 'sharp-mind',
    title: 'Sharp Mind',
    description: 'Reach a 5-streak in Critical Thinking.',
    icon: '⚖️',
    reward: 20,
    check: (p) => (p.gameStats.criticalThinking?.bestStreak ?? 0) >= 5,
  },
  {
    id: 'people-reader',
    title: 'People Reader',
    description: 'Reach a 5-streak in Human Behavior.',
    icon: '🗣️',
    reward: 20,
    check: (p) => (p.gameStats.humanBehavior?.bestStreak ?? 0) >= 5,
  },
  {
    id: 'case-closed',
    title: 'Case Closed',
    description: 'Reach a 5-streak in Detective.',
    icon: '🔍',
    reward: 20,
    check: (p) => (p.gameStats.detective?.bestStreak ?? 0) >= 5,
  },
  {
    id: 'streak-legend',
    title: 'Streak Legend',
    description: 'Reach an 8-streak in any Game Arcade game — hard-tier territory.',
    icon: '🔥',
    reward: 40,
    check: (p) => Object.values(p.gameStats).some((g) => (g?.bestStreak ?? 0) >= 8),
  },
  {
    id: 'arcade-regular',
    title: 'Arcade Regular',
    description: 'Play 50 rounds total across the Game Arcade.',
    icon: '🎮',
    reward: 30,
    check: (p) => Object.values(p.gameStats).reduce((sum, g) => sum + (g?.totalPlayed ?? 0), 0) >= 50,
  },

  // --- Daily Puzzle ---
  {
    id: 'daily-habit',
    title: 'Daily Habit',
    description: 'Reach a 7-day Daily Puzzle streak.',
    icon: '📅',
    reward: 30,
    check: (p) => (p.dailyPuzzle?.streak ?? 0) >= 7,
  },
  {
    id: 'unbroken',
    title: 'Unbroken',
    description: 'Reach a 30-day Daily Puzzle streak.',
    icon: '⛓️',
    reward: 80,
    check: (p) => (p.dailyPuzzle?.streak ?? 0) >= 30,
  },

  // --- Domain mastery ---
  {
    id: 'ai-explorer',
    title: 'AI Explorer',
    description: 'Reach domain level 3 in AI.',
    icon: '🤖',
    reward: 25,
    check: (p) => levelFromXp(p.domainXp.ai ?? 0).level >= 3,
  },
  {
    id: 'renaissance-mind',
    title: 'Renaissance Mind',
    description: 'Reach domain level 2 in AI, Psychology, Philosophy, and World.',
    icon: '🌐',
    reward: 50,
    check: (p) => ['ai', 'psychology', 'philosophy', 'world'].every((d) => levelFromXp(p.domainXp[d] ?? 0).level >= 2),
  },

  // --- Overall level ---
  {
    id: 'rising',
    title: 'Rising',
    description: 'Reach overall level 5.',
    icon: '⭐',
    reward: 20,
    check: (p) => levelFromXp(p.xp).level >= 5,
  },
  {
    id: 'ascendant',
    title: 'Ascendant',
    description: 'Reach overall level 10.',
    icon: '✨',
    reward: 60,
    check: (p) => levelFromXp(p.xp).level >= 10,
  },
];
