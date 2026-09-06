/**
 * Today's Philosophy — the content bank for the daily philosophy card.
 *
 * Rules for adding to this list (see NEXUS master spec §7):
 * - No generic motivational lines ("never give up"). Every entry needs a
 *   real source and a concrete, doable task.
 * - `task` must be something the user can act on today, not "reflect on this."
 */

export const philosophyContent = [
  {
    id: 'dichotomy-of-control',
    title: 'The Dichotomy of Control',
    quote:
      'Some things are up to us, and some things are not up to us. Make the best use of what is in your power, and take the rest as it happens.',
    source: 'Epictetus, Enchiridion (Stoicism, c. 125 CE)',
    meaning:
      'Nearly all suffering comes from treating things outside your control — other people\'s opinions, outcomes, the past — as if they were inside it. Peace comes from redrawing that line accurately.',
    whyItMatters:
      'Most anxiety is really a category error: worrying about something as if effort could change it, when it can\'t. Sorting a problem into "mine to act on" vs. "not mine" is often the whole fix.',
    task: 'The next time something frustrating happens today, pause and ask: what part of this can I actually control? Act only on that part.',
  },
  {
    id: 'steelmanning',
    title: 'Steelmanning',
    quote: 'The strongest form of an argument is not the one you can beat — it\'s the one you can\'t.',
    source: 'Popularized in rationalist/debate circles as the opposite of "strawmanning"',
    meaning:
      'Before you argue against a position, build the best possible version of it — better than most people who hold it could build themselves. If you can\'t do that, you don\'t understand it yet.',
    whyItMatters:
      'It\'s the fastest way to actually update your own views instead of just defending them, and it makes you far harder to manipulate with weak arguments dressed up as strong ones.',
    task: 'Pick something you disagree with today. Before criticizing it, write the strongest possible case for it — one sentence is enough to start.',
  },
  {
    id: 'via-negativa',
    title: 'Via Negativa',
    quote: 'Knowledge grows by subtraction much more than addition.',
    source: 'Nassim Nicholas Taleb, Antifragile (2012), drawing on negative theology',
    meaning:
      'You often get further removing what\'s broken, harmful, or wasteful than adding something new. What should you stop doing is frequently a better question than what should you start.',
    whyItMatters:
      'Addition feels productive; subtraction feels like nothing happened. But most systems — habits, diets, codebases, relationships — improve faster by removal.',
    task: 'Identify one thing today that\'s actively working against you, and just stop doing it — don\'t replace it with anything yet.',
  },
  {
    id: 'amor-fati',
    title: 'Amor Fati',
    quote: 'My formula for greatness in a human being is amor fati: that one wants nothing to be other than it is.',
    source: 'Friedrich Nietzsche, Ecce Homo (1888)',
    meaning:
      'Not passive resignation — an active love of what actually happened, including the setbacks, because it\'s the only material you have to build from.',
    whyItMatters:
      'Fighting reality ("this shouldn\'t have happened") burns energy you could spend responding to reality as it is. The setback is now a fact; only your next move is still a choice.',
    task: 'Name one thing that went wrong recently that you\'re still resisting. Today, treat it as fixed terrain and plan your next move on top of it.',
  },
  {
    id: 'confirmation-bias',
    title: 'Confirmation Bias',
    quote: 'What the mind wants to believe, the eyes are quick to see evidence for.',
    source: 'Named by Peter Wason (1960); observed since at least Francis Bacon\'s Novum Organum (1620)',
    meaning:
      'People notice, remember, and weight evidence that confirms what they already think, and skip past evidence that doesn\'t — without feeling biased at all while doing it.',
    whyItMatters:
      'It\'s the single most common reason smart people stay wrong. Every side of every argument feels well-supported from the inside, because everyone is doing this.',
    task: 'Pick one belief you hold confidently. Today, actively look for one piece of evidence against it — not to change your mind, just to see it.',
  },
  {
    id: 'sunk-cost',
    title: 'The Sunk Cost Trap',
    quote: 'The money is already gone. The only question is what to do next.',
    source: 'Formalized in decision theory; named "sunk cost fallacy" mid-20th century',
    meaning:
      'Time, money, or effort already spent should have zero weight in a decision about what to do next — but people keep pouring in more to "justify" the past spend, which is backwards.',
    whyItMatters:
      'This is why people finish bad movies, stay in bad projects, and keep bad relationships going years past the point they knew better — the cost is already spent either way.',
    task: 'Look at one thing you\'re continuing mainly "because you\'ve already put so much into it." Ask honestly: would you start this today, from zero?',
  },
  {
    id: 'wu-wei',
    title: 'Wu Wei',
    quote: 'The Tao does nothing, yet nothing is left undone.',
    source: 'Laozi, Tao Te Ching (Taoism, c. 4th century BCE)',
    meaning:
      'Effortless action — not laziness, but acting in a way so well-matched to the situation that it doesn\'t look like a struggle. Force and strain often mean you\'re fighting the wrong problem.',
    whyItMatters:
      'A lot of modern effort is spent forcing outcomes that would come more easily with a better-aligned approach. Struggle is a signal worth listening to, not just pushing through.',
    task: 'Find one task today where you\'re forcing something. Try the version that takes less effort before assuming more effort is the answer.',
  },
  {
    id: 'veil-of-ignorance',
    title: 'The Veil of Ignorance',
    quote: 'Design the rules as if you didn\'t know which position in society you\'d end up in.',
    source: 'John Rawls, A Theory of Justice (1971)',
    meaning:
      'A thought experiment for judging fairness: imagine you don\'t know if you\'ll be the winner or loser of a given rule before deciding if the rule is just.',
    whyItMatters:
      'It exposes self-serving reasoning — most people argue for rules that happen to favor their own position, without noticing that\'s what they\'re doing.',
    task: 'Take a rule or policy you have a strong opinion on. Ask if you\'d still support it if you didn\'t know which side of it you\'d land on.',
  },
  {
    id: 'map-is-not-territory',
    title: 'The Map Is Not the Territory',
    quote: 'A map is not the territory it represents, but, if correct, it has a similar structure to the territory.',
    source: 'Alfred Korzybski, Science and Sanity (1933)',
    meaning:
      'Every model, label, and belief you hold is a simplified stand-in for reality — useful, but never the whole thing. Confusing the label for the thing is where a lot of bad thinking starts.',
    whyItMatters:
      'People argue about definitions as if they were arguing about reality. Categories like "lazy," "toxic," or "smart" are maps — reality is always more specific than the label.',
    task: 'Notice one label you\'re using today (about a person, a situation, yourself). Describe the actual specific behavior underneath it instead.',
  },
  {
    id: 'negative-visualization',
    title: 'Negative Visualization',
    quote: 'He robs present ills of their power who has perceived their coming beforehand.',
    source: 'Seneca, Letters from a Stoic (Stoicism, 1st century CE)',
    meaning:
      'Briefly imagining losing what you have — your health, a relationship, an opportunity — isn\'t pessimism. It resets your baseline so you actually notice what you already have.',
    whyItMatters:
      'Hedonic adaptation makes good things invisible fast. This is a deliberate override, not doom-thinking — the point is gratitude, not fear.',
    task: 'Pick one thing you have that you\'ve stopped noticing. Spend one minute imagining today without it, then go appreciate it directly.',
  },
];
