/**
 * Achievement chains — Phase 7, v2. Cohen's feedback on the first version:
 * a flat "reach a 5-streak in Pattern Logic" achievement should instead
 * hand you a new goal the moment you hit it, and keep going. Every metric
 * below that has a natural multi-step progression (streaks, counts,
 * levels) is now a chain of tiers instead of one flat threshold; anything
 * that genuinely can't extend further (e.g. Challenge Champion — there
 * are only 4 Live Challenges to complete, so there's no meaningful next
 * step past "all of them") stays a short chain rather than being forced
 * into fake extra tiers.
 *
 * Each chain: a single `metric(profile)` that only ever goes up, and an
 * ordered list of `tiers` (each with its own title/description/reward).
 * A tier's `threshold` can be a number or a `(ctx) => number` for a cap
 * that should track content-bank size automatically (e.g. "own every
 * discovery") instead of a number that goes stale as content grows.
 *
 * Game streak tiers (3 / 8 / 15) deliberately mirror the difficulty-tier
 * gates already in every Game Arcade game (medium unlocks at streak 3,
 * hard at streak 8) — hitting a tier here lines up with something that
 * just happened in the game itself, not an arbitrary number.
 *
 * `unlockedAchievementIds` stores `${chainId}:${tierIndex}` per unlocked
 * tier (see lib/achievements.js). The old flat-achievement ids from
 * before this change (e.g. `pattern-seeker`) are no longer referenced by
 * anything — if a real profile already has one, it's just inert leftover
 * data, not a crash risk, and the same underlying progress (a streak
 * already reached) immediately unlocks the new equivalent tier the next
 * time this runs.
 */
import { discoveryContent } from './discoveryContent.js';
import { levelFromXp } from '../lib/progression.js';

const DOMAINS = ['ai', 'psychology', 'philosophy', 'world'];

export const achievementChains = [
  {
    id: 'network',
    icon: '🧭',
    label: 'Knowledge Network',
    metric: (p) => p.exploredNodeIds.length,
    tiers: [
      { threshold: 1, title: 'First Steps', description: 'Explore your first node in the Knowledge Network.', reward: 10 },
      { threshold: 10, title: 'Deep Thinker', description: 'Explore 10 nodes in the Knowledge Network.', reward: 25 },
      { threshold: 20, title: 'Network Master', description: 'Explore every node in the Knowledge Network.', reward: 60 },
    ],
  },
  {
    id: 'discoveries',
    icon: '📚',
    label: 'Library',
    metric: (p) => p.savedDiscoveryIds.length,
    tiers: [
      { threshold: 5, title: 'The Observer', description: 'Save 5 discoveries to your Library.', reward: 20 },
      { threshold: 15, title: 'Collector', description: 'Save 15 discoveries to your Library.', reward: 40 },
      {
        threshold: () => discoveryContent.length,
        title: 'Archivist',
        description: 'Save every discovery to your Library.',
        reward: 70,
      },
    ],
  },
  {
    id: 'reflections',
    icon: '✍️',
    label: "Today's Philosophy",
    metric: (p) => p.reflections.length,
    tiers: [
      { threshold: 1, title: 'First Reflection', description: "Write your first Today's Philosophy reflection.", reward: 10 },
      { threshold: 7, title: 'Consistent Mind', description: 'Write 7 daily reflections.', reward: 30 },
      { threshold: 30, title: 'Committed', description: 'Write 30 daily reflections.', reward: 75 },
      { threshold: 100, title: 'Devoted', description: 'Write 100 daily reflections.', reward: 150 },
    ],
  },
  {
    id: 'challenges',
    icon: '🏆',
    label: 'Live Challenges',
    metric: (p) => Object.values(p.challengeProgress).filter((c) => c.completedAt).length,
    tiers: [
      { threshold: 1, title: 'Challenge Accepted', description: 'Complete your first Live Challenge.', reward: 15 },
      {
        threshold: (ctx) => ctx.challengeCount,
        title: 'Challenge Champion',
        description: 'Complete every Live Challenge.',
        reward: 50,
      },
    ],
  },
  {
    id: 'streak-patternLogic',
    icon: '🔢',
    label: 'Pattern Logic',
    metric: (p) => p.gameStats.patternLogic?.bestStreak ?? 0,
    tiers: [
      { threshold: 3, title: 'Pattern Seeker', description: 'Reach a 3-streak in Pattern Logic — Medium tier unlocked.', reward: 15 },
      { threshold: 8, title: 'Pattern Adept', description: 'Reach an 8-streak in Pattern Logic — Hard tier unlocked.', reward: 30 },
      { threshold: 15, title: 'Pattern Master', description: 'Reach a 15-streak in Pattern Logic.', reward: 55 },
    ],
  },
  {
    id: 'streak-criticalThinking',
    icon: '⚖️',
    label: 'Critical Thinking',
    // Critical Thinking runs the same 6-tier ladder shape as Human
    // Behavior (see pickCriticalThinkingTier in lib/games/tierGate.js).
    metric: (p) => p.gameStats.criticalThinking?.bestStreak ?? 0,
    tiers: [
      { threshold: 3, title: 'Sharp Mind', description: 'Reach a 3-streak in Critical Thinking — Medium tier unlocked.', reward: 15 },
      { threshold: 6, title: 'Keen Reasoner', description: 'Reach a 6-streak in Critical Thinking — Hard tier unlocked.', reward: 20 },
      { threshold: 9, title: 'Assumption Hunter', description: 'Reach a 9-streak in Critical Thinking — Connection tier unlocked.', reward: 30 },
      { threshold: 14, title: 'Evidence Weigher', description: 'Reach a 14-streak in Critical Thinking — Integration tier unlocked.', reward: 50 },
      { threshold: 20, title: 'Master Analyst', description: 'Reach a 20-streak in Critical Thinking — Expert tier unlocked.', reward: 80 },
    ],
  },
  {
    id: 'streak-humanBehavior',
    icon: '🗣️',
    label: 'Human Behavior',
    // Human Behavior runs its own 6-tier ladder (see pickHumanBehaviorTier
    // in lib/games/tierGate.js) instead of the standard 3-tier gate every
    // other game uses — these thresholds mirror it directly.
    metric: (p) => p.gameStats.humanBehavior?.bestStreak ?? 0,
    tiers: [
      { threshold: 3, title: 'People Reader', description: 'Reach a 3-streak in Human Behavior — Medium tier unlocked.', reward: 15 },
      { threshold: 6, title: 'Sharp Read', description: 'Reach a 6-streak in Human Behavior — Hard tier unlocked.', reward: 20 },
      { threshold: 9, title: 'Deep Listener', description: 'Reach a 9-streak in Human Behavior — Connection tier unlocked.', reward: 30 },
      { threshold: 14, title: 'Social Savant', description: 'Reach a 14-streak in Human Behavior — Integration tier unlocked.', reward: 50 },
      { threshold: 20, title: 'Master of Motive', description: 'Reach a 20-streak in Human Behavior — Expert tier unlocked.', reward: 80 },
    ],
  },
  {
    id: 'streak-detective',
    icon: '🔍',
    label: 'Detective',
    // Detective runs the same 6-tier ladder shape as the other three
    // games (see pickDetectiveTier in lib/games/tierGate.js).
    metric: (p) => p.gameStats.detective?.bestStreak ?? 0,
    tiers: [
      { threshold: 3, title: 'Case Closed', description: 'Reach a 3-streak in Detective — Medium tier unlocked.', reward: 15 },
      { threshold: 6, title: 'Sharp Eye', description: 'Reach a 6-streak in Detective — Hard tier unlocked.', reward: 20 },
      { threshold: 9, title: 'Close Reader', description: 'Reach a 9-streak in Detective — Connection tier unlocked.', reward: 30 },
      { threshold: 14, title: 'Timeline Tracker', description: 'Reach a 14-streak in Detective — Integration tier unlocked.', reward: 50 },
      { threshold: 20, title: 'Master Detective', description: 'Reach a 20-streak in Detective — Expert tier unlocked.', reward: 80 },
    ],
  },
  {
    id: 'arcade-rounds',
    icon: '🎮',
    label: 'Game Arcade',
    metric: (p) => Object.values(p.gameStats).reduce((sum, g) => sum + (g?.totalPlayed ?? 0), 0),
    tiers: [
      { threshold: 20, title: 'Arcade Regular', description: 'Play 20 rounds total across the Game Arcade.', reward: 15 },
      { threshold: 50, title: 'Arcade Veteran', description: 'Play 50 rounds total across the Game Arcade.', reward: 35 },
      { threshold: 100, title: 'Arcade Master', description: 'Play 100 rounds total across the Game Arcade.', reward: 65 },
    ],
  },
  {
    id: 'daily-puzzle',
    icon: '📅',
    label: 'Daily Puzzle',
    metric: (p) => p.dailyPuzzle?.streak ?? 0,
    tiers: [
      { threshold: 7, title: 'Daily Habit', description: 'Reach a 7-day Daily Puzzle streak.', reward: 30 },
      { threshold: 30, title: 'Unbroken', description: 'Reach a 30-day Daily Puzzle streak.', reward: 80 },
      { threshold: 100, title: 'Centurion', description: 'Reach a 100-day Daily Puzzle streak.', reward: 180 },
    ],
  },
  {
    id: 'domain-ai',
    icon: '🤖',
    label: 'AI Domain',
    metric: (p) => levelFromXp(p.domainXp.ai ?? 0).level,
    tiers: [
      { threshold: 3, title: 'AI Explorer', description: 'Reach domain level 3 in AI.', reward: 25 },
      { threshold: 6, title: 'AI Adept', description: 'Reach domain level 6 in AI.', reward: 45 },
      { threshold: 10, title: 'AI Sage', description: 'Reach domain level 10 in AI.', reward: 80 },
    ],
  },
  {
    id: 'renaissance',
    icon: '🌐',
    label: 'All Domains',
    metric: (p) => Math.min(...DOMAINS.map((d) => levelFromXp(p.domainXp[d] ?? 0).level)),
    tiers: [
      { threshold: 2, title: 'Renaissance Mind', description: 'Reach domain level 2 in AI, Psychology, Philosophy, and World.', reward: 50 },
      { threshold: 4, title: 'Renaissance Master', description: 'Reach domain level 4 in every domain.', reward: 90 },
    ],
  },
  {
    id: 'overall-level',
    icon: '⭐',
    label: 'Overall Level',
    metric: (p) => levelFromXp(p.xp).level,
    tiers: [
      { threshold: 5, title: 'Rising', description: 'Reach overall level 5.', reward: 20 },
      { threshold: 10, title: 'Ascendant', description: 'Reach overall level 10.', reward: 60 },
      { threshold: 20, title: 'Transcendent', description: 'Reach overall level 20.', reward: 120 },
    ],
  },
];
