/**
 * Random Discoveries — powers "Today in Nexus" and "Surprise Me".
 * category drives the accent color used in the UI (see tokens.css).
 */

export const discoveryContent = [
  {
    id: 'llm-tokens',
    category: 'ai',
    title: 'AI doesn\'t read letters — it reads chunks',
    fact:
      'A language model never sees individual letters. It breaks text into "tokens" — chunks that are often whole words, sometimes word-pieces ("un" + "believable") — and predicts the next token, not the next letter.',
    whyItMatters:
      'This is why AI can be strangely bad at letter-level tasks (like counting letters in a word) while being excellent at meaning-level ones — it\'s not "seeing" the word the way you are.',
    relatedTopics: ['AI', 'How LLMs Work'],
  },
  {
    id: 'ai-dont-explain',
    category: 'ai',
    title: 'You can tell AI not to give you the answer',
    fact:
      'Most people ask AI to explain something and get an explanation. But you can instead say: "Don\'t explain this yet — ask me questions until I figure it out myself." Most models will do exactly that.',
    whyItMatters:
      'Being told an answer and discovering it yourself produce very different memory and understanding. The tool doesn\'t default to the better mode — you have to ask for it.',
    relatedTopics: ['AI', 'Prompt Engineering', 'Learning'],
  },
  {
    id: 'ai-hallucination',
    category: 'ai',
    title: 'AI can be confidently, fluently wrong',
    fact:
      'A language model generates the most statistically likely next words, not a database lookup of verified facts. When it doesn\'t actually know something, it often produces a plausible-sounding answer anyway — a "hallucination" — with the exact same confident tone as when it\'s right.',
    whyItMatters:
      'Fluency isn\'t evidence of accuracy. The more specific and checkable a claim is (a date, a citation, a statistic), the more worth verifying independently before you rely on it.',
    relatedTopics: ['AI', 'How LLMs Work', 'Critical Thinking'],
  },
  {
    id: 'ai-context-window',
    category: 'ai',
    title: 'AI has a working memory, and it fills up',
    fact:
      'A model can only "see" a limited amount of text at once — its context window. Once a conversation grows past that limit, the earliest parts effectively fall out of view, even though the conversation still looks continuous to you.',
    whyItMatters:
      'A very long chat can make a model act like it forgot something you said early on — because, in a real sense, it did. Restating key facts periodically keeps them "in view."',
    relatedTopics: ['AI', 'Tokens & Context'],
  },
  {
    id: 'ai-knowledge-cutoff',
    category: 'ai',
    title: 'AI models have a knowledge cutoff date',
    fact:
      'A model is trained on a snapshot of text up to a certain date, then that training stops. Anything that happened after — unless the tool specifically searches the web for you — simply isn\'t part of what the model "knows."',
    whyItMatters:
      'Asking about very recent events without web access is asking the model to guess. Good AI use includes knowing which questions the model can\'t actually answer from memory.',
    relatedTopics: ['AI', 'How LLMs Work'],
  },
  {
    id: 'ai-same-prompt-different-answer',
    category: 'ai',
    title: 'The same question can get a different answer twice',
    fact:
      'Most AI models don\'t always pick the single most likely next word — they sample from a range of likely options, controlled by a setting often called "temperature." Ask the exact same question twice and you can get two differently worded, sometimes differently reasoned, answers.',
    whyItMatters:
      'A single answer from an AI is one sample, not a verified consensus. For anything important, asking again — or asking it to double-check its own reasoning — is a real way to catch mistakes.',
    relatedTopics: ['AI', 'How LLMs Work'],
  },
  {
    id: 'ai-show-your-work',
    category: 'ai',
    title: 'Asking AI to "show its work" often makes it more accurate',
    fact:
      'Prompting a model to reason step by step before giving a final answer — sometimes called chain-of-thought — measurably improves performance on harder problems, compared to asking it to jump straight to the answer.',
    whyItMatters:
      'This mirrors good human problem-solving: rushing to an answer skips error-checking that happens naturally when you walk through the steps.',
    relatedTopics: ['AI', 'Prompt Engineering'],
  },
  {
    id: 'ai-no-memory-between-chats',
    category: 'ai',
    title: 'A new conversation is usually a blank slate',
    fact:
      'Unless an app is specifically built to save and re-load context, an AI model has no memory of a previous separate conversation with you — every new chat starts from zero, no matter how much you covered last time.',
    whyItMatters:
      'This is why re-explaining context at the start of a new conversation isn\'t redundant — from the model\'s side, that information genuinely doesn\'t exist yet.',
    relatedTopics: ['AI', 'How LLMs Work'],
  },
  {
    id: 'asch-conformity',
    category: 'psychology',
    title: 'People will deny what they clearly see',
    fact:
      'In Solomon Asch\'s 1951 experiments, subjects were shown lines of obviously different lengths and asked to match them. When actors in the room confidently gave the wrong answer, roughly a third of subjects gave the same wrong answer at least once — overriding their own eyes.',
    whyItMatters:
      'Group pressure doesn\'t need to be hostile to work. Quiet, confident consensus is often enough to make people distrust direct evidence in front of them.',
    relatedTopics: ['Psychology', 'Social Influence', 'Group Behavior'],
  },
  {
    id: 'fundamental-attribution-error',
    category: 'psychology',
    title: 'You explain your own mistakes differently than other people\'s',
    fact:
      'When you\'re late, it\'s "traffic was terrible." When someone else is late, it\'s "they\'re inconsiderate." This asymmetry — situation for yourself, character for others — is called the fundamental attribution error.',
    whyItMatters:
      'It quietly poisons a lot of judgment of other people. The same behavior gets explained as circumstance in the mirror and as character everywhere else.',
    relatedTopics: ['Psychology', 'Cognitive Biases', 'Human Behavior'],
  },
  {
    id: 'ship-of-theseus',
    category: 'philosophy',
    title: 'A ship with every plank replaced — is it the same ship?',
    fact:
      'If a ship has every one of its planks gradually swapped out over years, is the result the same ship? Ancient Greek writers (Plutarch, describing Theseus\'s ship) used this to probe what "identity" over time actually means.',
    whyItMatters:
      'It\'s not just a puzzle about ships — nearly every cell and belief you had a decade ago has been "replaced." What actually makes you the same person you were then?',
    relatedTopics: ['Philosophy', 'Identity', 'Metaphysics'],
  },
  {
    id: 'trolley-problem',
    category: 'philosophy',
    title: 'The lever you\'d pull says more than you think',
    fact:
      'Most people say they\'d pull a lever to divert a runaway trolley, killing one person to save five. Far fewer say they\'d push one large person onto the tracks to achieve the identical outcome — same math, opposite instinct.',
    whyItMatters:
      'It reveals that moral judgment isn\'t pure math — physical directness, not just outcomes, changes how wrong something feels. That gap is where a lot of real ethical disagreement actually lives.',
    relatedTopics: ['Philosophy', 'Ethics', 'Decision Making'],
  },
  {
    id: 'octopus-brains',
    category: 'science',
    title: 'An octopus thinks with its arms',
    fact:
      'About two-thirds of an octopus\'s neurons are located in its arms, not its central brain. Each arm can process sensory information and initiate movement semi-independently.',
    whyItMatters:
      'It\'s a working example of "distributed cognition" — intelligence that isn\'t centralized — which is also a useful model for how some modern AI and organizational systems are designed.',
    relatedTopics: ['Science', 'Biology', 'Intelligence'],
  },
  {
    id: 'dunbars-number',
    category: 'psychology',
    title: 'There\'s a hard ceiling on how many people you can really know',
    fact:
      'Anthropologist Robin Dunbar proposed that human cognition limits stable social relationships to roughly 150 people — a number that shows up consistently from hunter-gatherer bands to military companies to modern organizations.',
    whyItMatters:
      'It explains why huge online "friend" or "follower" counts don\'t feel like real relationships — the brain\'s actual social bandwidth hasn\'t changed just because the platform did.',
    relatedTopics: ['Psychology', 'Social Structure', 'History'],
  },
  {
    id: 'overview-effect',
    category: 'world',
    title: 'Astronauts come back different — reliably',
    fact:
      'Many astronauts report a profound, lasting shift in perspective after seeing Earth from space — a single fragile sphere with no visible borders. It\'s common enough to have a name: the "overview effect."',
    whyItMatters:
      'It\'s a case study in how a single change of vantage point, not new information, can restructure someone\'s priorities more than years of argument could.',
    relatedTopics: ['World', 'Perspective', 'Space'],
  },
  {
    id: 'streisand-effect',
    category: 'world',
    title: 'Trying to hide something can be what spreads it',
    fact:
      'In 2003, Barbra Streisand sued to remove a photo of her house from the internet. Before the lawsuit, the photo had been downloaded 6 times. After it became news, it was viewed hundreds of thousands of times.',
    whyItMatters:
      'Suppression attempts are themselves information — they signal "this is worth looking at" to anyone watching, often overpowering whatever the original content actually was.',
    relatedTopics: ['World', 'Psychology', 'Media'],
  },
  {
    id: 'goodharts-law',
    category: 'random',
    title: 'The moment a measure becomes a target, it stops measuring anything',
    fact:
      'Economist Charles Goodhart observed that once people are optimized against a metric, they game the metric rather than improve the thing it was supposed to represent — a call-center rated on "calls per hour" gets more calls, not better ones.',
    whyItMatters:
      'It applies everywhere metrics get attached to incentives — grades, follower counts, sales quotas, even personal habit trackers. The number can go up while the real thing gets worse.',
    relatedTopics: ['Systems Thinking', 'Economics', 'Decision Making'],
  },
  {
    id: 'placebo-strength',
    category: 'science',
    title: 'A fake pill can outperform a real one — if it costs more',
    fact:
      'In controlled studies, participants told a placebo pill was expensive reported significantly more pain relief than participants given the identical pill described as cheap — despite both being inert.',
    whyItMatters:
      'Expectation itself measurably changes physical experience, which is why "it\'s just a placebo effect" understates how real and manipulable that effect actually is.',
    relatedTopics: ['Science', 'Psychology', 'Medicine'],
  },
  {
    id: 'benjamin-franklin-effect',
    category: 'random',
    title: 'Doing someone a favor can make you like them more',
    fact:
      'Benjamin Franklin once won over a rival by asking to borrow a rare book from him — not the other way around. The theory: people unconsciously justify their own actions, so doing someone a favor makes you rationalize that you must like them, to stay consistent with what you just did.',
    whyItMatters:
      'It runs backwards from most people\'s intuition (that you do favors for people you already like), and it\'s a well-documented case of behavior shaping belief instead of the other way around.',
    relatedTopics: ['Psychology', 'Cognitive Biases'],
  },
  {
    id: 'parkinsons-law',
    category: 'random',
    title: 'Work expands to fill the time you give it',
    fact:
      'Historian Cyril Northcote Parkinson observed that a task will take as long as the time allotted for it — a report due in a month takes a month; the same report due in a week somehow still gets done, just faster.',
    whyItMatters:
      'It\'s a real lever, not just a saying: giving yourself a shorter, real deadline often produces the same quality of work in far less time.',
    relatedTopics: ['Systems Thinking', 'Productivity'],
  },
  {
    id: 'streetlight-effect',
    category: 'random',
    title: 'People search where it\'s easy to look, not where the answer is',
    fact:
      'Named for the joke about a man searching for lost keys under a streetlight — not because he lost them there, but because that\'s where the light is. It describes a real, common research bias: investigating what\'s measurable and convenient instead of what actually matters.',
    whyItMatters:
      'It shows up constantly in data-driven decisions: optimizing the metric that\'s easy to track, even when everyone privately knows it isn\'t the metric that matters most.',
    relatedTopics: ['Systems Thinking', 'Decision Making', 'Science'],
  },
];
