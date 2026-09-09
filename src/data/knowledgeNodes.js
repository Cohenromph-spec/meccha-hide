/**
 * The Knowledge Network — seed dataset for Phase 2.
 *
 * `requires`: prerequisite node ids. Empty = always available (a domain
 * root). A node is "locked" until every id in `requires` is in the user's
 * exploredNodeIds.
 *
 * `connects`: every id this node has a graph edge to (requires-edges plus
 * thematic cross-domain links, e.g. Cognitive Biases <-> Free Will). Edges
 * are undirected — list a link on one side only, the graph builder dedupes.
 *
 * `check`: the comprehension question NodeDetailPanel offers as one of two
 * ways to unlock a node (the other being a free-written reflection) — per
 * Cohen's request that exploring a node take real engagement, not one
 * click. Every question is answerable purely from that node's own
 * `description` text above — no outside knowledge required and nothing
 * invented, the same "don't ship a puzzle that can't actually be reasoned
 * out from what's shown" discipline as Detective's suspect facts.
 * `correctIndex` points into `options` before shuffling at render time.
 *
 * Phase 5 (AI Brain) is where this stops being hand-authored and starts
 * growing from what the user actually explores — this file is the seed,
 * not the ceiling.
 */

export const knowledgeNodes = [
  // ---- AI ----
  {
    id: 'ai',
    domain: 'ai',
    title: 'AI',
    tier: 'root',
    description:
      'Artificial intelligence — systems that perform tasks which normally require human judgment: recognizing patterns, generating language, making predictions. Everything else in this branch builds on what that actually means in practice, not the sci-fi version.',
    requires: [],
    connects: ['llm-basics'],
    check: {
      question: 'Per this description, what does AI actually do?',
      options: [
        'Performs tasks that normally require human judgment',
        'Perfectly replicates human consciousness',
        'Only works with numbers, never language',
        'Requires no data or training of any kind',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'llm-basics',
    domain: 'ai',
    title: 'How LLMs Work',
    tier: 'core',
    description:
      'A large language model predicts the next chunk of text, over and over, based on patterns learned from massive amounts of text. There\'s no lookup table of facts inside it — everything it "knows" is encoded as statistical relationships between tokens.',
    requires: ['ai'],
    connects: ['tokens-context', 'prompt-engineering'],
    check: {
      question: 'How does a large language model actually generate text, per this node?',
      options: [
        'By predicting the next chunk of text based on learned patterns',
        'By looking up facts in an internal database',
        'By understanding meaning the exact way humans do',
        'By following a fixed set of if-then rules',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'tokens-context',
    domain: 'ai',
    title: 'Tokens & Context',
    tier: 'core',
    description:
      'Models read "tokens" (word-pieces, not letters) and can only hold a limited number in view at once — the context window. Once something scrolls out of that window, the model has no memory of it unless it was summarized back in.',
    requires: ['llm-basics'],
    connects: [],
    check: {
      question: 'What happens once something scrolls out of the context window?',
      options: [
        'The model has no memory of it unless it was summarized back in',
        'It gets permanently stored in the model\'s weights',
        'It\'s deleted from the model\'s training data',
        'Nothing changes — the model remembers everything indefinitely',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'prompt-engineering',
    domain: 'ai',
    title: 'Prompt Engineering',
    tier: 'core',
    description:
      'How you ask determines what you get. Specific, structured prompts — clear role, format, constraints — reliably outperform vague ones. It\'s less "magic words" and more "clear instructions," the same skill as writing a good brief for a person.',
    requires: ['llm-basics'],
    connects: ['ai-agents'],
    check: {
      question: 'What actually makes a prompt effective, per this description?',
      options: [
        'Being specific and structured, like a clear brief',
        'Using special "magic" trigger words',
        'Being as long and detailed as physically possible',
        'Avoiding any constraints or format requirements',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'ai-agents',
    domain: 'ai',
    title: 'AI Agents',
    tier: 'advanced',
    description:
      'An agent is a model given tools and a loop: it can take an action, see the result, and decide the next action — instead of just answering once. That loop is what turns a chatbot into something that can actually get multi-step work done.',
    requires: ['prompt-engineering'],
    connects: ['automation', 'systems-thinking', 'decision-making'],
    check: {
      question: 'What specifically turns a chatbot into an agent, per this node?',
      options: [
        'A loop of taking an action, seeing the result, and deciding what\'s next',
        'Simply having a larger underlying model',
        'Being trained on more data than a chatbot',
        'Having a nicer-looking chat interface',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'automation',
    domain: 'ai',
    title: 'Automation & APIs',
    tier: 'advanced',
    description:
      'Connecting an agent to real APIs — calendars, databases, other software — is what turns "AI that can chat" into "AI that can do." The hard part is rarely the AI; it\'s reliably wiring it into systems that weren\'t built to be talked to.',
    requires: ['ai-agents'],
    connects: [],
    check: {
      question: 'According to this node, what\'s actually the hard part of AI automation?',
      options: [
        'Reliably wiring the AI into systems that weren\'t built to be talked to',
        'Making the underlying AI model smart enough',
        'Choosing the right chat interface design',
        'Writing the very first prompt',
      ],
      correctIndex: 0,
    },
  },

  // ---- PSYCHOLOGY ----
  {
    id: 'psychology',
    domain: 'psychology',
    title: 'Psychology',
    tier: 'root',
    description:
      'The study of why people think, feel, and act the way they do. Most of it isn\'t intuitive — a huge amount of human behavior runs on processes people aren\'t aware of and would deny if asked.',
    requires: [],
    connects: ['social-influence', 'cognitive-biases'],
    check: {
      question: 'Per this description, how aware are people of what actually drives their behavior?',
      options: [
        'Much of it runs on processes they aren\'t aware of, and would deny',
        'People are fully conscious of every motivation they have',
        'Behavior is essentially random and has no drivers',
        'Only young children lack this kind of self-awareness',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'social-influence',
    domain: 'psychology',
    title: 'Social Influence',
    tier: 'core',
    description:
      'People change their beliefs and behavior in response to others far more, and far more easily, than they realize — often without any pressure or argument at all, just quiet consensus.',
    requires: ['psychology'],
    connects: ['group-behavior', 'manipulation'],
    check: {
      question: 'How much pressure does it typically take for social influence to work, per this node?',
      options: [
        'Often none at all — just quiet consensus',
        'It always requires a direct, explicit argument',
        'It only works reliably on children',
        'It requires some form of financial incentive',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'cognitive-biases',
    domain: 'psychology',
    title: 'Cognitive Biases',
    tier: 'core',
    description:
      'Systematic, predictable errors in thinking — not random mistakes, the same ones in the same situations, in basically everyone. Knowing the list doesn\'t make you immune to them; it just gives you a chance to catch a few in the moment.',
    requires: ['psychology'],
    connects: ['free-will', 'decision-making', 'media-literacy'],
    check: {
      question: 'Does knowing about cognitive biases make you immune to them, per this description?',
      options: [
        'No — it just gives you a chance to catch a few in the moment',
        'Yes, complete immunity once you know the list',
        'Only if you are unusually intelligent',
        'Only in professional or academic settings',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'group-behavior',
    domain: 'psychology',
    title: 'Group Behavior',
    tier: 'advanced',
    description:
      'People act differently in groups than alone — sometimes better (shared effort, accountability), often worse (diffusion of responsibility, deindividuation). The group changes the person, not just the group\'s output.',
    requires: ['social-influence'],
    connects: [],
    check: {
      question: 'What does this node say actually changes when people are in a group?',
      options: [
        'The group changes the person, not just the group\'s output',
        'Nothing changes — individuals stay exactly the same',
        'Only the group\'s overall efficiency changes',
        'This effect is only ever visible in children',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'manipulation',
    domain: 'psychology',
    title: 'Manipulation & Persuasion',
    tier: 'advanced',
    description:
      'The line between persuasion and manipulation is usually transparency: is the influence visible, and does it serve your interests or just theirs? Most real-world influence is a mix — the goal here is recognizing it, not assuming everyone\'s doing it to you.',
    requires: ['social-influence', 'cognitive-biases'],
    connects: ['media-literacy'],
    check: {
      question: 'Per this node, what\'s the key line between persuasion and manipulation?',
      options: [
        'Whether the influence is visible, and whose interests it serves',
        'How large the group being influenced is',
        'Whether money changes hands',
        'The age of the person doing the persuading',
      ],
      correctIndex: 0,
    },
  },

  // ---- PHILOSOPHY ----
  {
    id: 'philosophy',
    domain: 'philosophy',
    title: 'Philosophy',
    tier: 'root',
    description:
      'The discipline of asking questions that don\'t have settled answers — what\'s real, what\'s right, what a good life is — and reasoning about them carefully instead of shrugging. Every field of "hard" knowledge started as a philosophy question.',
    requires: [],
    connects: ['stoicism', 'ethics', 'free-will'],
    check: {
      question: 'What does this description say every field of "hard" knowledge started as?',
      options: [
        'A philosophy question',
        'A religious teaching',
        'A government policy',
        'A scientific experiment',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'stoicism',
    domain: 'philosophy',
    title: 'Stoicism',
    tier: 'core',
    description:
      'An ancient framework built on one core move: separate what\'s in your control from what isn\'t, and stop spending emotional energy on the second category. Simple to state, genuinely hard to practice.',
    requires: ['philosophy'],
    connects: [],
    check: {
      question: 'What\'s the core move of Stoicism, per this node?',
      options: [
        'Separating what\'s in your control from what isn\'t',
        'Suppressing every emotion permanently',
        'Avoiding all personal responsibility',
        'Following a strict set of religious rules',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'ethics',
    domain: 'philosophy',
    title: 'Ethics',
    tier: 'core',
    description:
      'The study of what makes an action right or wrong — and the uncomfortable discovery that "obviously wrong" and "obviously right" stop being obvious the moment you compare competing ethical frameworks side by side.',
    requires: ['philosophy'],
    connects: ['decision-making'],
    check: {
      question: 'What happens to "obviously right and wrong," per this node?',
      options: [
        'It stops being obvious once you compare competing ethical frameworks',
        'It becomes clearer and more obvious over time',
        'It disappears entirely and stops mattering',
        'It only ever applies to children',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'free-will',
    domain: 'philosophy',
    title: 'Free Will',
    tier: 'advanced',
    description:
      'If your choices are the product of your brain chemistry, upbringing, and circumstances — all things you didn\'t choose — in what sense are they actually "free"? This connects directly to how much you should credit or blame anyone for anything.',
    requires: ['philosophy'],
    connects: ['cognitive-biases'],
    check: {
      question: 'What does this node connect the free will question directly to?',
      options: [
        'How much you should credit or blame anyone for anything',
        'How fast a computer can process information',
        'Stock market predictions',
        'Long-range weather forecasting',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'existentialism',
    domain: 'philosophy',
    title: 'Existentialism',
    tier: 'advanced',
    description:
      'The idea that existence has no built-in meaning — you have to build one yourself, through what you actually choose and do. Less bleak than it sounds: it puts the responsibility for meaning in your hands, not the universe\'s.',
    requires: ['philosophy'],
    connects: [],
    check: {
      question: 'Per this description, where does the responsibility for meaning ultimately sit?',
      options: [
        'In your own hands, not the universe\'s',
        'In fate alone, decided in advance',
        'In other people\'s opinions of you',
        'Exclusively in religious institutions',
      ],
      correctIndex: 0,
    },
  },

  // ---- WORLD ----
  {
    id: 'world',
    domain: 'world',
    title: 'The World',
    tier: 'root',
    description:
      'How the world actually works, at a systems level — economics, media, culture, history — beyond any one person\'s direct experience of it.',
    requires: [],
    connects: ['systems-thinking', 'media-literacy'],
    check: {
      question: 'What level does this node say to look at "how the world works"?',
      options: [
        'A systems level, beyond any one person\'s direct experience',
        'Only your own personal daily experience',
        'Only ancient history',
        'Only celebrity and entertainment news',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'systems-thinking',
    domain: 'world',
    title: 'Systems Thinking',
    tier: 'core',
    description:
      'Seeing outcomes as the product of a system\'s structure and incentives, not just the people in it. The same person behaves differently in a broken system versus a well-designed one — fixing the system usually beats blaming the person.',
    requires: ['world'],
    connects: ['ai-agents', 'decision-making'],
    check: {
      question: 'Per this node, what usually beats blaming the person for a bad outcome?',
      options: [
        'Fixing the system',
        'Ignoring the problem entirely',
        'Replacing everyone involved',
        'Waiting for it to resolve on its own',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'media-literacy',
    domain: 'world',
    title: 'Media & Misinformation',
    tier: 'core',
    description:
      'What gets shown to you is selected — by algorithms optimizing for attention, not accuracy. Understanding that selection process matters more than fact-checking any single claim.',
    requires: ['world'],
    connects: ['cognitive-biases', 'manipulation'],
    check: {
      question: 'What are the algorithms selecting what you see actually optimizing for, per this node?',
      options: [
        'Attention, not accuracy',
        'Truth above every other consideration',
        'Your long-term wellbeing',
        'Pure random chance',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'decision-making',
    domain: 'world',
    title: 'Decision Making',
    tier: 'advanced',
    description:
      'A genuine crossroads topic: how people actually decide (psychology), how they should decide (ethics and philosophy), and how AI systems are built to decide (agents). Good decision-making borrows from all three, not just gut instinct.',
    requires: ['cognitive-biases'],
    connects: ['ethics', 'ai-agents', 'systems-thinking'],
    check: {
      question: 'Per this node, good decision-making borrows from which three things?',
      options: [
        'Psychology, ethics/philosophy, and how AI systems decide',
        'Luck, timing, and money',
        'Pure gut instinct alone',
        'Religious teaching alone',
      ],
      correctIndex: 0,
    },
  },
];
