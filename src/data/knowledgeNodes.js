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

  // ---- AI (additions) ----
  {
    id: 'ai-alignment',
    domain: 'ai',
    title: 'AI Alignment',
    tier: 'advanced',
    description:
      'Alignment is the problem of getting an AI system to actually pursue the goals you meant, not just the goals you literally specified — a model optimizing hard for the wrong proxy can satisfy the letter of an instruction while completely missing the point.',
    requires: ['ai-agents'],
    connects: [],
    check: {
      question: 'What is the alignment problem primarily about, per this node?',
      options: [
        'Getting an AI to pursue what you meant, not just what you literally specified',
        'Making models run faster',
        'Increasing a model\'s training data size',
        'Giving a model more tools to use',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'ai-bias-and-fairness',
    domain: 'ai',
    title: 'AI Bias & Fairness',
    tier: 'advanced',
    description:
      "A model trained on real-world data inherits whatever patterns — including unfair ones — were already in that data. It doesn't invent bias out of nowhere; it reflects, and can amplify, biases already present in what it learned from.",
    requires: ['llm-basics'],
    connects: ['cognitive-biases'],
    check: {
      question: "Where does a model's bias actually come from, per this node?",
      options: [
        'It reflects and can amplify biases already present in its training data',
        'The model invents bias randomly during training',
        'Bias only comes from how a user phrases a prompt',
        'Bias is automatically fixed before deployment',
      ],
      correctIndex: 0,
    },
  },

  // ---- PSYCHOLOGY (additions) ----
  {
    id: 'emotional-intelligence',
    domain: 'psychology',
    title: 'Emotional Intelligence',
    tier: 'core',
    description:
      "Emotional intelligence is the ability to notice what you're feeling, name it accurately, and manage the reaction before it manages you — plus reading the same in other people. It's a learnable skill, not a fixed trait you either have or don't.",
    requires: ['psychology'],
    connects: ['active-listening', 'difficult-conversations'],
    check: {
      question: 'What does this node say emotional intelligence actually is?',
      options: [
        'A learnable skill: noticing, naming, and managing emotion in yourself and others',
        'A fixed trait some people are simply born with',
        'Only about staying calm and never showing emotion',
        'The ability to predict exactly what others will do next',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'motivation-theory',
    domain: 'psychology',
    title: 'Motivation',
    tier: 'advanced',
    description:
      "Extrinsic motivation (rewards, pressure, deadlines) and intrinsic motivation (genuine interest, a sense of purpose) don't just add together — external rewards can actually crowd out the internal motivation someone already had for a task they found meaningful, a well-documented effect called overjustification.",
    requires: ['social-influence'],
    connects: ['decision-making'],
    check: {
      question: 'What does the overjustification effect describe, per this node?',
      options: [
        'External rewards can crowd out the intrinsic motivation someone already had',
        'Extrinsic and intrinsic motivation always add together cleanly',
        'Rewards always increase motivation with no downside',
        'Motivation is entirely fixed and can\'t be influenced',
      ],
      correctIndex: 0,
    },
  },

  // ---- PHILOSOPHY (additions) ----
  {
    id: 'epistemology',
    domain: 'philosophy',
    title: 'Epistemology',
    tier: 'core',
    description:
      'Epistemology asks how we actually know what we claim to know — what separates a justified belief from a lucky guess that happened to be true. Most people never examine why they believe what they believe until something forces the question.',
    requires: ['philosophy'],
    connects: ['media-literacy'],
    check: {
      question: 'What question does epistemology ask, per this node?',
      options: [
        'How we actually know what we claim to know, and what justifies a belief',
        'What the ultimate meaning of life is',
        'How societies should be organized',
        'What happens after death',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'utilitarianism-vs-deontology',
    domain: 'philosophy',
    title: 'Utilitarianism vs. Deontology',
    tier: 'advanced',
    description:
      'Utilitarianism judges an action by its consequences — does it produce the most good for the most people. Deontology judges an action by whether it follows a moral rule, regardless of outcome — some things are wrong to do even if they\'d produce a better result. The two frameworks can reach opposite verdicts on the exact same choice.',
    requires: ['ethics'],
    connects: ['negotiation'],
    check: {
      question: 'Per this node, what does deontology judge an action by?',
      options: [
        'Whether it follows a moral rule, regardless of outcome',
        'Whether it produces the most good for the most people',
        'How much profit it generates',
        'How popular the action is',
      ],
      correctIndex: 0,
    },
  },

  // ---- WORLD (additions) ----
  {
    id: 'economics-basics',
    domain: 'world',
    title: 'Economics Basics',
    tier: 'core',
    description:
      "Economics, at its core, is the study of how people make choices under scarcity — there's never enough of anything (time, money, resources) to do everything, so every choice is also a choice not to do something else. That trade-off is called opportunity cost.",
    requires: ['world'],
    connects: ['game-theory'],
    check: {
      question: 'What is opportunity cost, per this node?',
      options: [
        'The thing you give up by choosing to do something else instead',
        'The total price paid for a purchase',
        'The interest earned on savings',
        "A government's total tax revenue",
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'game-theory',
    domain: 'world',
    title: 'Game Theory',
    tier: 'advanced',
    description:
      "Game theory studies situations where the best choice for you depends on what everyone else chooses too — not just your own preferences in isolation. The classic finding: individually rational choices can add up to a worse outcome for everyone than if people had cooperated, the core tension behind the Prisoner's Dilemma.",
    requires: ['economics-basics'],
    connects: ['decision-making', 'negotiation'],
    check: {
      question: "What's the classic finding of the Prisoner's Dilemma, per this node?",
      options: [
        'Individually rational choices can add up to a worse outcome for everyone',
        'Cooperation is always the mathematically wrong choice',
        "Only one player's decision actually matters",
        'Network effects have no impact on user value',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'network-effects',
    domain: 'world',
    title: 'Network Effects',
    tier: 'advanced',
    description:
      'A network effect is when a product or platform gets more valuable to each user as more people join it — a phone is useless with one user and essential with a billion. This is why early users of a platform often get the worst experience, and why some markets naturally tip toward one dominant winner.',
    requires: ['systems-thinking'],
    connects: ['automation'],
    check: {
      question: 'Per this node, why does a market with strong network effects tend to tip toward one dominant winner?',
      options: [
        'The platform gets more valuable to each user as more people join it',
        'Early users always get the best possible experience',
        'Government regulation forces a single winner',
        'Network effects have no impact on user value',
      ],
      correctIndex: 0,
    },
  },

  // ---- COMMUNICATION (new domain) ----
  {
    id: 'communication',
    domain: 'communication',
    title: 'Communication',
    tier: 'root',
    description:
      "Communication is the process of getting an idea out of your head and into someone else's, accurately — which fails constantly, not because people are careless, but because the sender and receiver never fully share the same context, words, or assumptions.",
    requires: [],
    connects: ['active-listening', 'nonverbal-communication'],
    check: {
      question: 'Per this node, why does communication fail so often?',
      options: [
        'The sender and receiver never fully share the same context, words, or assumptions',
        'People are usually careless when they communicate',
        "Communication only fails when people don't like each other",
        'Modern technology has made communication less accurate',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'active-listening',
    domain: 'communication',
    title: 'Active Listening',
    tier: 'core',
    description:
      "Active listening means actually processing what someone said well enough to accurately restate it back, not just waiting for your turn to talk. Most people listen to reply, not to understand — and it shows, because they can't actually repeat back what they just heard.",
    requires: ['communication'],
    connects: ['emotional-intelligence'],
    check: {
      question: "What does this node say most people actually do while 'listening'?",
      options: [
        'Listen to reply, not to understand',
        'Fully process and remember everything said',
        'Naturally restate what they heard without effort',
        "Focus entirely on the other person's tone",
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'nonverbal-communication',
    domain: 'communication',
    title: 'Nonverbal Communication',
    tier: 'core',
    description:
      "A huge share of what gets communicated in a conversation never gets said out loud — tone, posture, pacing, facial expression. When someone's words and their nonverbal signals contradict each other, people almost always trust the nonverbal signal over the words.",
    requires: ['communication'],
    connects: [],
    check: {
      question: 'When words and nonverbal signals contradict each other, which does this node say people tend to trust?',
      options: [
        'The nonverbal signal',
        'The literal words spoken',
        'Neither — they just get confused',
        'Whichever came first in the conversation',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'difficult-conversations',
    domain: 'communication',
    title: 'Difficult Conversations',
    tier: 'advanced',
    description:
      "Most difficult conversations go badly not because of what's disagreed on, but because both people are arguing about a different underlying layer at the same time — what happened, how it feels, and what it says about each person's identity — without ever naming which layer they're actually stuck on.",
    requires: ['active-listening'],
    connects: ['emotional-intelligence'],
    check: {
      question: 'Per this node, why do most difficult conversations actually go badly?',
      options: [
        'Both people are arguing about a different underlying layer at once, without naming it',
        'The two people usually just dislike each other',
        'One person is always objectively right',
        'Difficult conversations are inherently unsolvable',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'persuasion-vs-manipulation',
    domain: 'communication',
    title: 'Persuasion vs. Manipulation',
    tier: 'advanced',
    description:
      "Persuasion and manipulation can use identical techniques — the line between them is whether the other person would still agree with your reasoning if they could see exactly how you were influencing them. Persuasion survives transparency; manipulation depends on the other person not noticing.",
    requires: ['nonverbal-communication'],
    connects: ['manipulation'],
    check: {
      question: "What's the actual dividing line between persuasion and manipulation, per this node?",
      options: [
        "Whether the reasoning survives the other person seeing exactly how they're being influenced",
        'Persuasion always uses different techniques than manipulation',
        'Manipulation is simply a more polite version of persuasion',
        'There is no real difference between the two',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'negotiation',
    domain: 'communication',
    title: 'Negotiation',
    tier: 'advanced',
    description:
      "Effective negotiation isn't about who wants it more or who's more stubborn — it's about understanding each side's actual underlying interest, not just their stated position, since two people can hold opposite positions while sharing the same underlying interest the whole time.",
    requires: ['difficult-conversations'],
    connects: ['game-theory', 'utilitarianism-vs-deontology'],
    check: {
      question: 'Per this node, what should negotiation actually focus on?',
      options: [
        "Each side's actual underlying interest, not just their stated position",
        'Whoever is more stubborn winning by default',
        'Splitting every difference exactly down the middle',
        'Avoiding any compromise at all',
      ],
      correctIndex: 0,
    },
  },
];
