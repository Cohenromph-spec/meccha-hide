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

  // --- Tripled from here down. Same standard as the original four: real,
  // safe, meaningful — never interpreting or investigating other people
  // behind their back, never a "test" run on someone without their knowledge. ---
  {
    id: 'the-pause',
    title: 'The Pause',
    category: 'observation',
    difficulty: 'Easy',
    icon: '⏸️',
    description:
      'Three times today, catch yourself reaching for your phone out of pure reflex — not because you need something specific — and pause for ten seconds before deciding whether to actually pick it up.',
    targetCount: 3,
    reflectionPrompt: 'What did you notice in that ten-second pause? Did you still want to check it?',
  },
  {
    id: 'sunk-cost-check',
    title: 'Sunk Cost Check',
    category: 'thinking',
    difficulty: 'Medium',
    icon: '⚖️',
    description:
      'Think of something you\'re still doing mostly because of the time, money, or effort you\'ve already put into it — a class, a subscription, a project. Ask yourself honestly: if you were choosing completely fresh today, would you still start it?',
    targetCount: 1,
    reflectionPrompt: 'What did you decide, and was the past investment actually part of a fair reason to continue?',
  },
  {
    id: 'say-it-directly',
    title: 'Say It Directly',
    category: 'social',
    difficulty: 'Medium',
    icon: '🗣️',
    description:
      'Next time something small genuinely bothers you about what someone did, say so directly and kindly instead of hinting at it or letting it sit unspoken.',
    caution: 'Directly means honest and kind, not blunt for its own sake — the goal is clarity, not an excuse to be harsh.',
    targetCount: 1,
    reflectionPrompt: 'How did it go? Was it harder to say than you expected, or easier?',
  },
  {
    id: 'fact-check-the-machine',
    title: 'Fact-Check the Machine',
    category: 'ai',
    difficulty: 'Easy',
    icon: '🔍',
    description:
      'Ask an AI a factual question you personally already know the answer to well. Read its response carefully and check it against what you actually know — not just "right or wrong," but anything subtly off.',
    targetCount: 1,
    reflectionPrompt: 'Was the answer fully correct? If anything was off, would you have caught it without already knowing?',
  },
  {
    id: 'systems-eye',
    title: 'Systems Eye',
    category: 'thinking',
    difficulty: 'Medium',
    icon: '⚙️',
    description:
      'Pick one small daily annoyance — a slow line, a clunky process, a recurring hassle. Instead of just being annoyed by it, describe how the system behind it could actually be redesigned to fix the root cause.',
    targetCount: 1,
    reflectionPrompt: 'What was the actual root cause, once you looked past the annoyance itself?',
  },
  {
    id: 'name-the-bias',
    title: 'Name the Bias',
    category: 'thinking',
    difficulty: 'Easy',
    icon: '🎯',
    description:
      'Catch yourself in the act of one cognitive bias today — something from the Knowledge Network or Critical Thinking. Write down exactly which one it was and what triggered it, in the moment or right after.',
    targetCount: 1,
    reflectionPrompt: 'What was the bias, and what did catching it in real time actually feel like?',
  },
  {
    id: 'the-real-compliment',
    title: 'The Real Compliment',
    category: 'social',
    difficulty: 'Easy',
    icon: '✨',
    description:
      'Give someone a specific, genuine compliment about something they actually did or a quality they clearly have — specific enough that it\'s obvious you actually paid attention, not a generic "nice job."',
    caution: 'It has to be something you genuinely mean — not flattery, and not about their appearance.',
    targetCount: 1,
    reflectionPrompt: 'How did they react? Did being specific change how it landed?',
  },
  {
    id: 'the-week-of-noticing',
    title: 'The Week of Noticing',
    category: 'observation',
    difficulty: 'Hard',
    icon: '📓',
    description:
      'Over the course of a week, catch and log five separate moments where you notice a cognitive bias shaping your own thinking in real time — not five different biases necessarily, just five real, distinct moments.',
    targetCount: 5,
    reflectionPrompt: 'Looking back at all five, is there a bias that showed up more than once for you?',
  },
];
