/**
 * Critical Thinking — hand-authored scenarios (unlike Pattern Logic, a
 * fallacy/bias can't be procedurally generated the same way a number
 * sequence can, so this is a content bank like discoveryContent.js).
 *
 * Each `flaw` is the correct label; `distractors` are three other real
 * fallacies/biases from FLAW_POOL, picked to be clearly different from the
 * correct one (not almost-also-correct) so the puzzle has one defensible
 * answer, not a judgment call. `relatedNode` optionally points at a
 * Knowledge Network node id for a "connects to" link.
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
  },
];
