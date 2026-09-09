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

  // --- Tripled from here down (Cohen: "the discovery thing... I've just been
  // getting repeats" — the rotation logic itself was fixed separately in
  // lib/daily.js, but the underlying content pool was also just small.
  // These are new entries, not reworded duplicates of anything above.) ---

  // ---- AI (16 new) ----
  {
    id: 'ai-temperature',
    category: 'ai',
    title: 'AI has a dial for "how random" its answers are',
    fact:
      'Most models expose a "temperature" setting. Low temperature makes the model pick the most likely next word almost every time — consistent, a little flat. High temperature lets it pick less-likely words more often — more varied and creative, but also more likely to go off the rails.',
    whyItMatters:
      'There\'s no universally "correct" setting — a customer-support bot usually wants low temperature (predictable), a brainstorming tool usually wants it higher (varied).',
    relatedTopics: ['AI', 'How LLMs Work'],
  },
  {
    id: 'ai-fabricated-citations',
    category: 'ai',
    title: 'A fake source can look more convincing than a real one',
    fact:
      'When an AI model doesn\'t know a real citation, it doesn\'t say "I don\'t have one" by default — it can generate a completely fake but perfectly formatted source: a plausible author, journal, year, even a fake URL.',
    whyItMatters:
      'A citation that looks professionally formatted feels more trustworthy, which is exactly backwards here — always check that a cited source actually exists before relying on it.',
    relatedTopics: ['AI', 'Critical Thinking', 'Media Literacy'],
  },
  {
    id: 'ai-length-not-accuracy',
    category: 'ai',
    title: 'A longer AI answer isn\'t a more correct one',
    fact:
      'Length and accuracy are separate axes entirely. A model can pad a wrong answer with confident, detailed-sounding explanation just as easily as it can give a short, correct one.',
    whyItMatters:
      'Don\'t let thoroughness substitute for verification — a three-paragraph wrong answer is still wrong, just harder to spot as wrong.',
    relatedTopics: ['AI', 'Critical Thinking'],
  },
  {
    id: 'ai-few-shot-examples',
    category: 'ai',
    title: 'Showing beats telling, even with AI',
    fact:
      'Giving a model one or two examples of exactly the output format you want ("few-shot" prompting) often works better than a long paragraph describing what you want in the abstract.',
    whyItMatters:
      'If you keep getting the wrong format back, try showing an example instead of explaining harder — it\'s often the faster fix.',
    relatedTopics: ['AI', 'Prompt Engineering'],
  },
  {
    id: 'ai-think-step-by-step',
    category: 'ai',
    title: 'Asking AI to "show its work" can change the actual answer',
    fact:
      'Prompting a model to reason step by step before giving a final answer often improves accuracy on harder problems — not just because you get to see the reasoning, but because generating it changes what the model actually computes on the way there.',
    whyItMatters:
      'For anything with several logical steps (math, multi-part decisions), asking for reasoning first is a real accuracy lever, not just a nice-to-have explanation.',
    relatedTopics: ['AI', 'Prompt Engineering', 'Critical Thinking'],
  },
  {
    id: 'ai-embeddings',
    category: 'ai',
    title: 'AI can turn meaning into a list of numbers',
    fact:
      'Text can be converted into an "embedding" — a long list of numbers representing its meaning. Two sentences that mean similar things end up as nearby numbers, even if they don\'t share a single word in common.',
    whyItMatters:
      'This is how AI-powered search actually works under the hood: matching meaning, not just matching keywords.',
    relatedTopics: ['AI', 'How LLMs Work'],
  },
  {
    id: 'ai-no-live-data-by-default',
    category: 'ai',
    title: 'AI doesn\'t automatically know what today\'s date is',
    fact:
      'Unless it\'s connected to a tool that checks the real time, a model has no built-in sense of "now" — it can only guess based on patterns in its training data, which is often wrong for anything time-sensitive.',
    whyItMatters:
      'For anything date-dependent (is this still true, is this event upcoming or past), tell the model today\'s date explicitly rather than assuming it knows.',
    relatedTopics: ['AI', 'Knowledge Cutoff'],
  },
  {
    id: 'ai-fine-tuning',
    category: 'ai',
    title: 'A general AI model can be narrowed into a specialist',
    fact:
      'A model trained broadly can be further trained ("fine-tuned") on a smaller, focused set of examples to get noticeably better at one specific task, tone, or format — at some cost to its general flexibility.',
    whyItMatters:
      'This is why a company\'s customer-support bot can sound so different from a general chat assistant — same underlying technology, narrowed on purpose.',
    relatedTopics: ['AI', 'How LLMs Work'],
  },
  {
    id: 'ai-context-window-not-memory',
    category: 'ai',
    title: 'A bigger context window still isn\'t memory',
    fact:
      'A model with a huge context window can hold a lot within one conversation, but that\'s not the same as remembering you between separate conversations — unless a surrounding app explicitly saves and re-feeds it your history, each new chat starts blank.',
    whyItMatters:
      'If an AI tool seems to "remember" you across sessions, that\'s a feature the app built on top, not something the underlying model does by itself.',
    relatedTopics: ['AI', 'Tokens & Context'],
  },
  {
    id: 'ai-multimodal',
    category: 'ai',
    title: 'Some AI reads images the same way it reads words',
    fact:
      'Multimodal models convert images, and sometimes audio, into a token-like representation similar to text — letting one model reason across a photo and a sentence about it in the same pass, instead of using two separate, disconnected systems.',
    whyItMatters:
      'This is why you can hand a model a photo of a math problem or a screenshot of an error and get a relevant answer back — it isn\'t magic, it\'s the same underlying prediction process on a different kind of input.',
    relatedTopics: ['AI', 'How LLMs Work'],
  },
  {
    id: 'ai-tokens-cost-money',
    category: 'ai',
    title: 'A wordy AI prompt literally costs more money',
    fact:
      'Most AI providers charge per token, for both what you send and what the model sends back. A rambling prompt or an unnecessarily long answer isn\'t just less clear — it\'s a bigger bill.',
    whyItMatters:
      'Being concise with AI isn\'t just good writing practice — for anyone actually paying per request, it\'s a direct cost lever.',
    relatedTopics: ['AI', 'Prompt Engineering'],
  },
  {
    id: 'ai-safety-patches-change-behavior',
    category: 'ai',
    title: 'AI "tricks" have a shelf life',
    fact:
      'A specific phrasing that used to bypass a model\'s safety behavior often stops working after the provider updates the model — and, less often, an old trick can resurface after a later update changes something else.',
    whyItMatters:
      'Anything you\'ve heard about "how to trick AI into X" is describing a moving target, not a fixed fact about how these systems work.',
    relatedTopics: ['AI', 'How LLMs Work'],
  },
  {
    id: 'ai-non-deterministic',
    category: 'ai',
    title: 'The same AI prompt can give two different answers',
    fact:
      'Even at low randomness settings, asking a model the exact same question twice can produce slightly different answers — partly due to how the underlying computation gets batched and executed, not just an intentional "creativity" setting.',
    whyItMatters:
      'If an AI answer seems inconsistent with what it told you yesterday, that\'s not necessarily a contradiction to untangle — it can just be how the system works.',
    relatedTopics: ['AI', 'How LLMs Work'],
  },
  {
    id: 'ai-benchmarks-arent-your-use-case',
    category: 'ai',
    title: 'A higher AI benchmark score doesn\'t guarantee it\'ll feel better to you',
    fact:
      'Benchmarks measure performance on specific, narrow test tasks. A model that scores higher on a benchmark doesn\'t automatically feel noticeably better for your actual, different use case.',
    whyItMatters:
      'Try a model on the exact thing you actually need it for before trusting a leaderboard number to make the decision for you.',
    relatedTopics: ['AI', 'Critical Thinking'],
  },
  {
    id: 'ai-role-prompting',
    category: 'ai',
    title: 'Telling AI "you are an expert in X" actually shifts its answers',
    fact:
      'Assigning a model a role or persona ("You are a senior editor," "You are a skeptical reviewer") measurably changes the style and sometimes the substance of what it produces — it\'s steering which patterns in its training the prompt leans on.',
    whyItMatters:
      'This is a real, cheap lever for getting a different kind of answer to the same underlying question — worth trying before assuming the model "can\'t" do something.',
    relatedTopics: ['AI', 'Prompt Engineering'],
  },
  {
    id: 'ai-context-poisoning',
    category: 'ai',
    title: 'One wrong turn early in a chat can derail the rest of it',
    fact:
      'Because a model reads the whole conversation as context for its next answer, an early mistaken assumption — the model\'s or yours — can keep quietly distorting everything that follows, since it\'s technically still "in view."',
    whyItMatters:
      'If a long AI conversation feels like it\'s gone off track, it\'s often faster to correct the specific early error or start a fresh chat than to keep patching forward.',
    relatedTopics: ['AI', 'Tokens & Context'],
  },

  // ---- PSYCHOLOGY (6 new) ----
  {
    id: 'mere-exposure-effect',
    category: 'psychology',
    title: 'You like things more just from seeing them more',
    fact:
      'People tend to develop a preference for things simply because they\'re familiar with them — repeated exposure alone, with no positive interaction attached, measurably increases liking.',
    whyItMatters:
      'It explains a lot of "growing on you": a song, a face, a brand you disliked at first can start to feel likable purely from repetition, not because anything about it changed.',
    relatedTopics: ['Cognitive Biases', 'Psychology'],
  },
  {
    id: 'self-serving-bias',
    category: 'psychology',
    title: 'You explain your wins and losses very differently',
    fact:
      'People tend to credit their successes to their own skill and effort, while attributing their failures to bad luck or outside circumstances — a lopsided pattern that\'s consistent and well-documented, not just a personal quirk.',
    whyItMatters:
      'Noticing this pattern in yourself is a genuinely useful check before assigning blame or credit — including to other people, who are running the exact same bias about themselves.',
    relatedTopics: ['Cognitive Biases', 'Decision Making'],
  },
  {
    id: 'spotlight-effect',
    category: 'psychology',
    title: 'Nobody is watching you as closely as you think',
    fact:
      'People consistently overestimate how much others notice and remember about their appearance, mistakes, or awkward moments — everyone else is far more focused on themselves than on judging you.',
    whyItMatters:
      'That mortifying thing you said three years ago is very likely not living rent-free in anyone else\'s head the way it is in yours.',
    relatedTopics: ['Psychology', 'Social Influence'],
  },
  {
    id: 'peak-end-rule',
    category: 'psychology',
    title: 'You remember an experience by its peak and its ending, not its average',
    fact:
      'People judge how an experience felt overall mostly by its most intense moment and how it ended — not by averaging every moment of it. A mostly-pleasant trip with one terrible final hour is often remembered as "the trip that went badly."',
    whyItMatters:
      'This is a real, practical lever: ending something well (a project, an event, a conversation) shapes how it\'s remembered far more than its middle stretch does.',
    relatedTopics: ['Psychology', 'Decision Making'],
  },
  {
    id: 'ikea-effect',
    category: 'psychology',
    title: 'You value things more when you built them yourself',
    fact:
      'People consistently rate things they assembled themselves — furniture, in the classic studies — as more valuable than an identical pre-assembled version, even when the finished product is objectively the same or worse.',
    whyItMatters:
      'Effort creates attachment independent of quality — worth remembering both when judging your own work fairly and when someone else undervalues effort they didn\'t personally put in.',
    relatedTopics: ['Psychology', 'Decision Making'],
  },
  {
    id: 'bystander-effect',
    category: 'psychology',
    title: 'More witnesses can mean less help, not more',
    fact:
      'The more people who witness someone needing help, the less likely any single person is to step in — responsibility feels diffused across the group, so everyone assumes someone else will act.',
    whyItMatters:
      'If you ever actually need help in public, this is why singling out one specific person ("you, in the blue jacket, call 911") works better than a general call for help to the crowd.',
    relatedTopics: ['Group Behavior', 'Psychology'],
  },

  // ---- PHILOSOPHY (4 new) ----
  {
    id: 'veil-of-ignorance',
    category: 'philosophy',
    title: 'Design the rules before you know your own seat',
    fact:
      'Philosopher John Rawls proposed imagining you\'re designing a society\'s rules from behind a "veil of ignorance" — without knowing whether you\'ll end up rich or poor, healthy or not, in the majority or a minority within it.',
    whyItMatters:
      'It\'s a genuinely useful test for whether a rule is actually fair, versus just convenient for whoever\'s currently in charge of writing it.',
    relatedTopics: ['Ethics', 'Philosophy'],
  },
  {
    id: 'is-ought-problem',
    category: 'philosophy',
    title: 'Facts alone can\'t tell you what you should do',
    fact:
      'Philosopher David Hume pointed out that you can\'t logically derive a statement about what "ought" to be from statements about what merely "is" — a purely descriptive fact, on its own, never settles a moral question.',
    whyItMatters:
      'It\'s a useful check on arguments that slide from "this is how things naturally are" straight to "so this is how things should be" — that jump always needs an extra, separate justification.',
    relatedTopics: ['Ethics', 'Philosophy'],
  },
  {
    id: 'paradox-of-tolerance',
    category: 'philosophy',
    title: 'Unlimited tolerance can destroy itself',
    fact:
      'Philosopher Karl Popper argued that a society that extends unlimited tolerance even to those actively working to destroy tolerance itself will eventually be destroyed by them — meaning a tolerant society may need some limit to stay tolerant at all.',
    whyItMatters:
      'It\'s a genuinely contested idea worth sitting with rather than resolving too quickly — where exactly that limit belongs is itself a hard, live argument.',
    relatedTopics: ['Ethics', 'Philosophy'],
  },
  {
    id: 'sorites-paradox',
    category: 'philosophy',
    title: 'When does a heap stop being a heap?',
    fact:
      'Remove one grain of sand from a heap and it\'s still a heap. Repeat that one grain at a time, and eventually there\'s no heap left — so at what exact grain did it stop? The "paradox of the heap" shows how vague categories resist a sharp boundary.',
    whyItMatters:
      'The same structure shows up anywhere a category feels obvious in the middle but fuzzy at the edges — useful for noticing when an argument is quietly assuming a hard line that doesn\'t actually exist.',
    relatedTopics: ['Philosophy', 'Critical Thinking'],
  },

  // ---- SCIENCE (4 new) ----
  {
    id: 'bananas-are-berries',
    category: 'science',
    title: 'A banana is a berry. A strawberry isn\'t.',
    fact:
      'Botanically, a berry is defined by how the fruit develops from the plant\'s ovary — by that definition, bananas, grapes, and even avocados qualify, while strawberries (whose seeds sit on the outside) technically don\'t.',
    whyItMatters:
      'A nice small reminder that everyday categories and technical/scientific categories can quietly mean completely different things, even when they use the exact same word.',
    relatedTopics: ['Science'],
  },
  {
    id: 'tardigrades-survive-space',
    category: 'science',
    title: 'One animal can survive being launched directly into space',
    fact:
      'Tardigrades ("water bears") have survived direct exposure to the vacuum of space, intense radiation, and near-absolute-zero temperatures in real experiments — by nearly halting their own metabolism until conditions improve.',
    whyItMatters:
      'It\'s a genuine reminder of how much wider the range of "survivable conditions for life" is than human experience alone would suggest.',
    relatedTopics: ['Science'],
  },
  {
    id: 'antibiotics-dont-work-on-viruses',
    category: 'science',
    title: 'Antibiotics do nothing for a cold',
    fact:
      'Antibiotics work specifically against bacteria — they have no effect on viruses at all, which means they can\'t treat colds, flu, or most sore throats, even though they\'re still very commonly requested and prescribed for exactly those.',
    whyItMatters:
      'Unnecessary antibiotic use for viral illnesses is a real driver of antibiotic resistance — knowing the actual mechanism matters, not just "taking medicine to feel better faster."',
    relatedTopics: ['Science', 'Critical Thinking'],
  },
  {
    id: 'brain-has-no-pain-receptors',
    category: 'science',
    title: 'Your brain itself can\'t feel pain',
    fact:
      'Brain tissue has no pain receptors at all — which is why some brain surgeries are performed on a fully awake patient. Pain during a headache actually comes from the tissue and blood vessels around the brain, not the brain matter itself.',
    whyItMatters:
      'It\'s a striking example of how a body part responsible for processing every other kind of pain can be, itself, completely unable to feel any.',
    relatedTopics: ['Science'],
  },

  // ---- WORLD (4 new) ----
  {
    id: 'cobra-effect',
    category: 'world',
    title: 'A bounty on cobras once made the cobra problem worse',
    fact:
      'Colonial-era Delhi reportedly offered a bounty for dead cobras to reduce their population. People began breeding cobras specifically to kill them for the reward — and when the bounty program was cancelled, breeders released their now-worthless snakes, leaving more cobras than before it started.',
    whyItMatters:
      'A textbook case of an incentive backfiring by rewarding the letter of a goal instead of the actual goal — worth checking any incentive system for the same trap.',
    relatedTopics: ['Systems Thinking', 'World'],
  },
  {
    id: 'moores-law-is-a-target-not-a-law',
    category: 'world',
    title: 'The most famous "law" in computing isn\'t a law of physics',
    fact:
      'Moore\'s Law — the observation that computing power roughly doubles every couple of years — started as an industry prediction, not a physical law, and functioned partly as a shared target the whole chip industry organized around. It held remarkably well for decades but is now slowing as transistors approach real physical limits.',
    whyItMatters:
      'It\'s a good example of a "law" that shaped reality partly by being believed and planned around, not just by describing something fixed and external.',
    relatedTopics: ['World', 'Systems Thinking'],
  },
  {
    id: 'tragedy-of-the-commons',
    category: 'world',
    title: 'Shared resources get used up faster than anyone intends',
    fact:
      'When a resource is open to everyone with no individual limits — a shared pasture, a fishery, a public system — each user gets the full benefit of using more of it while only bearing a small fraction of the cost of depleting it, so the resource tends to get overused even when everyone would prefer it didn\'t.',
    whyItMatters:
      'It explains why some problems (overfishing, traffic congestion, spam) don\'t get solved by individual good intentions alone and need some kind of shared rule or limit.',
    relatedTopics: ['Systems Thinking', 'World', 'Decision Making'],
  },
  {
    id: 'broken-windows-theory',
    category: 'world',
    title: 'One unfixed broken window can invite more disorder',
    fact:
      '"Broken windows theory" argues that visible small signs of neglect — a broken window left unrepaired, graffiti left up — signal that no one is watching or enforcing standards, which can invite further disorder. It\'s influential in urban policy, and also genuinely contested among researchers.',
    whyItMatters:
      'A useful example of an idea that\'s widely cited and intuitive-sounding while still being actively debated — worth holding with some skepticism rather than treating as settled.',
    relatedTopics: ['World', 'Systems Thinking', 'Critical Thinking'],
  },

  // ---- RANDOM (8 new) ----
  {
    id: 'baader-meinhof-phenomenon',
    category: 'random',
    title: 'Why a new word suddenly seems to show up everywhere',
    fact:
      'Notice a word, car model, or idea for the first time, and you\'ll suddenly seem to see it constantly afterward — not because it became more common, but because your brain started actively flagging it once it became familiar.',
    whyItMatters:
      'It\'s a good example of how attention, not reality, can shift right under you — worth remembering before assuming a sudden pattern of coincidences means something.',
    relatedTopics: ['Cognitive Biases', 'Psychology'],
  },
  {
    id: 'wald-survivorship-planes',
    category: 'random',
    title: 'The bullet holes that mattered were the ones nobody saw',
    fact:
      'In World War II, engineers wanted to add armor to the parts of returning bomber planes with the most bullet holes. Statistician Abraham Wald pointed out the opposite: reinforce the parts with no holes — because planes hit there never made it back to be counted at all.',
    whyItMatters:
      'A concrete historical case of survivorship bias with real stakes — the data you can see is never the whole picture, and sometimes the most important information is exactly what\'s missing.',
    relatedTopics: ['Cognitive Biases', 'Critical Thinking'],
  },
  {
    id: 'zeigarnik-effect',
    category: 'random',
    title: 'Unfinished tasks nag at you more than finished ones',
    fact:
      'People tend to remember interrupted or incomplete tasks better, and think about them more, than tasks they\'ve already finished — an open loop keeps taking up mental space in a way a closed one doesn\'t.',
    whyItMatters:
      'It\'s a big part of why cliffhangers work, and also a practical argument for writing an unfinished task down somewhere — it can quiet the nagging without needing to finish it right away.',
    relatedTopics: ['Psychology', 'Productivity'],
  },
  {
    id: 'hawthorne-effect',
    category: 'random',
    title: 'Being watched changes how you act, all by itself',
    fact:
      'In a famous set of factory studies, worker productivity went up when researchers changed the lighting — and also went up again when they changed it back. The mere fact of being observed and studied was enough to change behavior, regardless of what was actually being tested.',
    whyItMatters:
      'Worth remembering any time you\'re measuring yourself (a habit tracker, a fitness log) — the act of watching yourself can itself change the outcome, separate from whatever you\'re trying to measure.',
    relatedTopics: ['Psychology', 'Science'],
  },
  {
    id: 'dunning-kruger-effect',
    category: 'random',
    title: 'The skill to do something and the skill to judge it are the same skill',
    fact:
      'People who are less skilled at a task tend to rate their own ability in it more highly than more-skilled people do — partly because accurately judging your own performance requires much of the same skill you\'re missing in the first place.',
    whyItMatters:
      'A real argument for seeking outside feedback specifically in areas where you feel most confident but have the least actual training — that confidence isn\'t independent evidence of skill.',
    relatedTopics: ['Cognitive Biases', 'Psychology'],
  },
  {
    id: 'barnum-effect',
    category: 'random',
    title: 'Why a horoscope can feel like it\'s describing exactly you',
    fact:
      'People readily accept vague, generic personality statements ("you sometimes doubt decisions you\'ve made, but you\'re also confident when you commit") as uniquely accurate descriptions of themselves — the same handful of statements feel personal to almost anyone.',
    whyItMatters:
      'It\'s the actual mechanism behind horoscopes, cold readings, and generic personality quizzes feeling eerily accurate — the vagueness is the feature, not a coincidence.',
    relatedTopics: ['Psychology', 'Critical Thinking'],
  },
  {
    id: 'pareto-principle',
    category: 'random',
    title: 'A small slice usually drives most of the result',
    fact:
      'Named for economist Vilfredo Pareto\'s observation that roughly 80% of Italy\'s land was owned by roughly 20% of the population, the same rough pattern — a small share of causes driving most of the effect — shows up strikingly often: a minority of bugs causing most crashes, a minority of customers driving most revenue.',
    whyItMatters:
      'It\'s not an exact law and doesn\'t always hold, but it\'s a genuinely useful first question to ask of any messy problem: which small slice is actually driving most of this?',
    relatedTopics: ['Systems Thinking', 'Decision Making'],
  },
  {
    id: 'illusory-truth-effect',
    category: 'random',
    title: 'Hearing a false claim again makes it feel more true',
    fact:
      'Simply repeating a claim — even while explicitly debunking it — makes it feel more familiar, and familiarity gets misread as truth. Repetition alone measurably increases how true a statement feels, independent of whether it actually is.',
    whyItMatters:
      'It\'s a real argument for how misinformation spreads even among people who "know better," and for being careful how you word a correction — repeating the false claim to debunk it can still reinforce it.',
    relatedTopics: ['Media Literacy', 'Cognitive Biases', 'Critical Thinking'],
  },
];
