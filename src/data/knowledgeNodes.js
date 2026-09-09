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
  },
];
