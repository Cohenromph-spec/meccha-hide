/**
 * Live Challenges — real-world tasks, tracked with simple counters.
 * See NEXUS master spec §8: realistic, safe, meaningful; never encourage
 * paranoia, manipulation, or disclosing private information about others.
 */

export const challengesContent = [
  {
    id: 'the-observer',
    title: 'The Observer',
    category: 'observation',
    difficulty: 'Easy',
    icon: '👀',
    description:
      'Notice three times today when someone\'s behavior changes depending on their environment (with friends vs. with family, at work vs. at home, online vs. in person).',
    caution: 'Do not assume why they changed. Just observe and note what changed.',
    targetCount: 3,
    reflectionPrompt: 'What did you notice? Did anything surprise you?',
  },
  {
    id: 'steelman',
    title: 'Steelman',
    category: 'thinking',
    difficulty: 'Medium',
    icon: '🧠',
    description:
      'Think of something you strongly disagree with. Before criticizing it, build the strongest possible argument for the other side — better than most people who hold that view could build it themselves.',
    targetCount: 1,
    reflectionPrompt: 'Did building the strongest counter-case change your understanding at all?',
  },
  {
    id: 'never-asked',
    title: 'The Question You\'ve Never Asked',
    category: 'social',
    difficulty: 'Easy',
    icon: '💬',
    description:
      'Ask someone you know well a question you\'ve genuinely never asked them before — not small talk, something real.',
    targetCount: 1,
    reflectionPrompt: 'What did you learn that you didn\'t already know?',
  },
  {
    id: 'ai-figure-it-out',
    title: 'Figure It Out, Don\'t Ask For It',
    category: 'ai',
    difficulty: 'Easy',
    icon: '🤖',
    description:
      'Bring a real problem to Claude, but tell it upfront: "Don\'t give me the answer — ask me questions and help me work it out myself." Push through at least three of its questions before letting it explain anything directly.',
    targetCount: 1,
    reflectionPrompt: 'Did you end up somewhere different than if it had just told you the answer?',
  },
];
