/**
 * Critical Thinking — hand-authored scenarios (unlike Pattern Logic, a
 * fallacy/bias can't be procedurally generated the same way a number
 * sequence can, so this is a content bank like discoveryContent.js).
 *
 * Each `flaw` is the correct label; `distractors` are other real
 * fallacies/biases from FLAW_POOL. `relatedNode` optionally points at a
 * Knowledge Network node id for a "connects to" link.
 *
 * Difficulty tiers (streak-gated, same idea as Detective's): `easy` (the
 * original 14) picks distractors clearly different from the correct
 * flaw — no judgment call required, just recognition. `medium` adds one
 * genuinely-confusable "near-miss" distractor per scenario — a fallacy
 * that shares surface features with the real answer, so picking correctly
 * takes understanding the actual distinction, not just spotting the
 * obviously-wrong options. `hard` uses two near-miss distractors at once
 * (5 options total), forcing discrimination between three plausible-
 * sounding labels instead of one. This is the same escalation shape as
 * Detective (more to track, then a genuinely harder reasoning demand) —
 * never the same content re-gated behind a streak, which would be fake
 * difficulty. Every near-miss is refuted by name in that scenario's
 * `explanation`, not just asserted wrong — verified by reading each
 * reasoning chain manually before shipping (a near-miss that "sounds"
 * wrong but isn't actually refutable in the text would just reintroduce
 * the unsolvable-Detective mistake in a new game).
 */

export const FLAW_POOL = [
  'Confirmation Bias',
  'Sunk Cost Fallacy',
  'Ad Hominem',
  'False Dichotomy',
  'Correlation vs. Causation',
  'Hasty Generalization',
  'Appeal to Authority',
  'Straw Man',
  'Anchoring Bias',
  'Bandwagon Effect',
  'Slippery Slope',
  'Survivorship Bias',
  'Circular Reasoning',
  'Availability Heuristic',
];

export const criticalThinkingScenarios = [
  {
    id: 'confirmation-1',
    scenario:
      'Jake believes his new lucky socks help him play better basketball. Every game he plays well, he credits the socks. Every game he plays badly, he says he just had an off night.',
    flaw: 'Confirmation Bias',
    distractors: ['Sunk Cost Fallacy', 'Bandwagon Effect', 'Straw Man'],
    explanation:
      'Jake only counts the evidence that supports his belief (good games) and explains away the evidence against it (bad games) instead of weighing both fairly.',
    relatedNode: 'cognitive-biases',
    tier: 'easy',
  },
  {
    id: 'sunk-cost-1',
    scenario:
      "Maria has spent four years and a lot of money on a degree she no longer wants to use. She keeps going because \"I can't quit now, not after everything I've already put in.\"",
    flaw: 'Sunk Cost Fallacy',
    distractors: ['Slippery Slope', 'Appeal to Authority', 'Anchoring Bias'],
    explanation:
      'The time and money already spent are gone either way — they should have zero weight on what to do next, but Maria is letting the past cost drive a decision it can no longer affect.',
    relatedNode: 'cognitive-biases',
    tier: 'easy',
  },
  {
    id: 'ad-hominem-1',
    scenario:
      '"You think we should raise the team\'s practice budget? You barely even show up to practice yourself, so your opinion doesn\'t count."',
    flaw: 'Ad Hominem',
    distractors: ['False Dichotomy', 'Correlation vs. Causation', 'Circular Reasoning'],
    explanation:
      "This attacks the person making the argument (their attendance) instead of addressing whether the argument about the budget itself is actually right or wrong.",
    relatedNode: 'manipulation',
    tier: 'easy',
  },
  {
    id: 'false-dichotomy-1',
    scenario:
      '"Either we cancel the whole event, or we just pretend nothing went wrong last time. There\'s no other option."',
    flaw: 'False Dichotomy',
    distractors: ['Hasty Generalization', 'Survivorship Bias', 'Bandwagon Effect'],
    explanation:
      "This presents only two extreme options when there's likely a middle ground — fixing what went wrong and running the event with changes, for instance.",
    relatedNode: 'philosophy',
    tier: 'easy',
  },
  {
    id: 'correlation-1',
    scenario:
      'A town notices that ice cream sales and drowning incidents both rise in the summer. A local news segment claims ice cream consumption is making people drown.',
    flaw: 'Correlation vs. Causation',
    distractors: ['Circular Reasoning', 'Appeal to Authority', 'Anchoring Bias'],
    explanation:
      'Both go up in summer because of a third factor — hot weather leads to more swimming and more ice cream. Neither one is causing the other.',
    relatedNode: 'decision-making',
    tier: 'easy',
  },
  {
    id: 'hasty-generalization-1',
    scenario:
      'After one bad Uber ride, Priya tells everyone "ride-share drivers in this city are all terrible."',
    flaw: 'Hasty Generalization',
    distractors: ['Survivorship Bias', 'Slippery Slope', 'Ad Hominem'],
    explanation:
      'One single experience is too small a sample to justify a sweeping conclusion about an entire group of drivers.',
    relatedNode: 'cognitive-biases',
    tier: 'easy',
  },
  {
    id: 'appeal-to-authority-1',
    scenario:
      '"This supplement must work — a famous actor said on a podcast that he takes it every day."',
    flaw: 'Appeal to Authority',
    distractors: ['Bandwagon Effect', 'False Dichotomy', 'Hasty Generalization'],
    explanation:
      "Being famous or successful in an unrelated field (acting) doesn't make someone a reliable authority on whether a supplement actually works.",
    relatedNode: 'manipulation',
    tier: 'easy',
  },
  {
    id: 'straw-man-1',
    scenario:
      'Person A: "I think we should have a little less homework on weekends." Person B: "So you think students shouldn\'t have to learn anything outside of class at all? That\'s a terrible idea."',
    flaw: 'Straw Man',
    distractors: ['Ad Hominem', 'Slippery Slope', 'Correlation vs. Causation'],
    explanation:
      "Person B replaced the actual, modest position (a bit less homework) with an exaggerated version (no outside learning at all) that's much easier to argue against.",
    relatedNode: 'manipulation',
    tier: 'easy',
  },
  {
    id: 'anchoring-1',
    scenario:
      'A store lists a jacket as "was $300, now $120!" Shoppers feel like they\'re getting a great deal, even though $120 was close to the jacket\'s normal price all along.',
    flaw: 'Anchoring Bias',
    distractors: ['Bandwagon Effect', 'Sunk Cost Fallacy', 'False Dichotomy'],
    explanation:
      'The first number shown ($300) becomes a mental reference point, making the second number feel like a bargain regardless of what the item is actually worth.',
    relatedNode: 'decision-making',
    tier: 'easy',
  },
  {
    id: 'bandwagon-1',
    scenario:
      '"Everyone at school already has this app, so it must be good — you should get it too."',
    flaw: 'Bandwagon Effect',
    distractors: ['Appeal to Authority', 'Circular Reasoning', 'Hasty Generalization'],
    explanation:
      "Popularity alone doesn't establish quality — lots of people can be wrong or influenced by the same social pressure at the same time.",
    relatedNode: 'social-influence',
    tier: 'easy',
  },
  {
    id: 'slippery-slope-1',
    scenario:
      '"If we let students redo one quiz, next they\'ll want to redo every test, then they\'ll expect an A for just showing up."',
    flaw: 'Slippery Slope',
    distractors: ['False Dichotomy', 'Straw Man', 'Survivorship Bias'],
    explanation:
      "This assumes one small, reasonable step will inevitably cascade into an extreme outcome, without showing why each step would actually follow from the last.",
    relatedNode: 'decision-making',
    tier: 'easy',
  },
  {
    id: 'survivorship-1',
    scenario:
      '"Plenty of successful entrepreneurs dropped out of college, so dropping out must be a good strategy for building a company."',
    flaw: 'Survivorship Bias',
    distractors: ['Anchoring Bias', 'Ad Hominem', 'Appeal to Authority'],
    explanation:
      "This only looks at the visible winners who dropped out and succeeded, ignoring the much larger, invisible group who dropped out and didn't.",
    relatedNode: 'cognitive-biases',
    tier: 'easy',
  },
  {
    id: 'circular-1',
    scenario:
      '"I know I can trust him because he always tells the truth." "How do you know he always tells the truth?" "Because he told me so, and he\'d never lie."',
    flaw: 'Circular Reasoning',
    distractors: ['Correlation vs. Causation', 'Bandwagon Effect', 'Hasty Generalization'],
    explanation:
      "The conclusion (he's trustworthy) is used as its own supporting evidence — the argument just repeats itself instead of offering independent proof.",
    relatedNode: 'ethics',
    tier: 'easy',
  },
  {
    id: 'availability-1',
    scenario:
      'After seeing three plane crash stories in the news this month, Devon becomes convinced flying is more dangerous than driving, even though flying statistically has a far lower fatality rate per mile.',
    flaw: 'Availability Heuristic',
    distractors: ['False Dichotomy', 'Sunk Cost Fallacy', 'Circular Reasoning'],
    explanation:
      'Vivid, recent examples that come easily to mind feel more common than they actually are — the real statistics tell a very different story than the memorable headlines.',
    relatedNode: 'media-literacy',
    tier: 'easy',
  },

  // --- Medium: one genuinely-confusable near-miss distractor per scenario ---
  {
    id: 'confirmation-2',
    scenario:
      "Chloe checks her horoscope every morning. On days it predicts good luck and something nice happens, she says, \"See, it's real.\" On days it predicts good luck and nothing notable happens, she shrugs it off — \"that one just didn't apply to me today.\"",
    flaw: 'Confirmation Bias',
    distractors: ['Availability Heuristic', 'Bandwagon Effect', 'Slippery Slope'],
    explanation:
      "Chloe counts every hit as proof and waves away every miss instead of weighing both — that's Confirmation Bias, not Availability Heuristic. Availability is about vivid or recent events feeling more common than they really are; nothing here is about how memorable or recent an event feels, it's about which outcomes she lets count as evidence at all.",
    relatedNode: 'cognitive-biases',
    tier: 'medium',
  },
  {
    id: 'hasty-generalization-2',
    scenario:
      'Priya tried two recipes from a new cookbook and both turned out badly. She tells her book club the whole cookbook is unreliable and not worth buying.',
    flaw: 'Hasty Generalization',
    distractors: ['Survivorship Bias', 'Anchoring Bias', 'Circular Reasoning'],
    explanation:
      "Two recipes is simply too small a sample to judge an entire cookbook — that's Hasty Generalization. It's not Survivorship Bias, which specifically involves an invisible, filtered-out population (like only seeing companies that survived, not the ones that failed) — there's no hidden group being ignored here, just a small sample treated as if it represents the whole.",
    relatedNode: 'cognitive-biases',
    tier: 'medium',
  },
  {
    id: 'straw-man-2',
    scenario:
      'Person A: "Maybe we should double check the numbers before we present them Monday." Person B: "So you think I can\'t do basic math? Wow, thanks for the vote of confidence."',
    flaw: 'Straw Man',
    distractors: ['Ad Hominem', 'False Dichotomy', 'Appeal to Authority'],
    explanation:
      "Person A asked for a numbers check — a reasonable, common request. Person B responded to an exaggerated version of that (\"you think I can't do basic math\") that was never actually said — that's Straw Man. It's not Ad Hominem, which attacks the person making the argument rather than misrepresenting what they said; here the argument itself is being distorted, not the person being attacked for who they are.",
    relatedNode: 'manipulation',
    tier: 'medium',
  },
  {
    id: 'anchoring-2',
    scenario:
      'A used car is listed at "originally $28,000, now just $19,500!" A buyer feels like they\'re getting a steal, even though similar cars nearby are selling for $16,000.',
    flaw: 'Anchoring Bias',
    distractors: ['Sunk Cost Fallacy', 'Bandwagon Effect', 'Correlation vs. Causation'],
    explanation:
      "The $28,000 figure sets a mental reference point that makes $19,500 feel like a bargain, even though it's actually above the going market rate — that's Anchoring Bias. It's not Sunk Cost Fallacy, which is about continuing something because of money or time already spent; the buyer hasn't spent anything yet, they're being anchored by a number shown to them, not by their own past investment.",
    relatedNode: 'decision-making',
    tier: 'medium',
  },

  // --- Hard: two near-miss distractors at once (5 options total) ---
  {
    id: 'appeal-to-authority-2',
    scenario:
      "\"My personal trainer says this supplement is the best on the market — and she trains professional athletes, so she'd know.\"",
    flaw: 'Appeal to Authority',
    distractors: ['Bandwagon Effect', 'Circular Reasoning', 'Hasty Generalization', 'Anchoring Bias'],
    explanation:
      "Training athletes makes her an authority on training, not on supplements — a different domain, being used as if it proves expertise it doesn't establish. That's Appeal to Authority. It's not Bandwagon Effect, which is about a claim's popularity with a crowd, not one named individual's credentials. And it's not Circular Reasoning either — that requires the conclusion to be used as its own proof in a loop; here the claim rests on an outside (if weak, out-of-domain) source, not on itself.",
    relatedNode: 'manipulation',
    tier: 'hard',
  },
  {
    id: 'correlation-2',
    scenario:
      'A study finds that startup founders who meditate daily are more likely to reach $1M in revenue. A business coach starts telling every founder that meditating daily will make their startup succeed.',
    flaw: 'Correlation vs. Causation',
    distractors: ['Survivorship Bias', 'Hasty Generalization', 'Anchoring Bias', 'Ad Hominem'],
    explanation:
      "Founders with enough stability to meditate daily may already have other success-linked advantages — funding, support, free time — that the meditation itself didn't cause. Reading a correlation as a cause is exactly the flaw here. It's not Survivorship Bias, which needs an invisible, unexamined population of failures being ignored — this scenario has a real comparison, not a hidden group. And it's not Hasty Generalization either — the issue isn't sample size (even a huge, valid sample would still get the causal direction wrong); it's mistaking correlation for causation regardless of how much data supports it.",
    relatedNode: 'decision-making',
    tier: 'hard',
  },
];
