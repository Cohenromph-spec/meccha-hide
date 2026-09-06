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
];
