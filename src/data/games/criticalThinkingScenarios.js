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

  // ============================================================
  // DEEPER TIER LADDER — same reasoning-depth redesign piloted on Human
  // Behavior, applied here. Easy/Medium/Hard above are unchanged (they're
  // all "name the flaw," which is a legitimate recognition/application
  // skill — but naming a fallacy is still terminology, not reasoning
  // through an argument's actual structure). These three new tiers use
  // deliberately different question shapes so the game doesn't stay a
  // vocabulary flashcard forever:
  //
  // 'connection' — Find the Assumption: identify the unstated claim an
  // argument secretly needs in order to work, before ever naming what
  // kind of flaw that gap is.
  //
  // 'integration' — Evidence That Changes the Conclusion: given an
  // argument, pick the one additional fact that actually bears on
  // whether the conclusion is justified — not just the one that "sounds"
  // relevant.
  //
  // 'expert' — Compare Two Arguments: given two short arguments toward
  // the same claim, judge which is better reasoned. Deliberately mixed
  // across all four possible answers (A better / B better / equally
  // strong / both flawed) so no single answer is a safe default guess.
  //
  // Every distractor was checked by hand against the actual argument
  // text — an option that "sounds" wrong without being refutable from
  // the scenario itself would repeat the unsolvable-puzzle mistake this
  // game has already been burned by once.
  // ============================================================

  // --- Connection: Find the Assumption ---
  {
    id: 'assumption-promotion',
    tier: 'connection',
    questionType: 'assumption',
    argument: 'The team should promote Jae to lead engineer — they\'ve been at the company longer than anyone else on the team.',
    prompt: "What does this argument need to be true in order to actually work, even though it's never stated?",
    options: [
      { text: 'Tenure is a good indicator of who should lead.', correct: true, note: "This is the load-bearing link — without it, tenure alone doesn't connect to leadership ability at all. The argument is quietly resting its whole weight on this." },
      { text: 'Jae is well-liked by the rest of the team.', correct: false, note: "This might be true, but the argument never needs it — it's about tenure, not likability, so this isn't what the argument depends on." },
      { text: 'No one else currently on the team wants the lead position.', correct: false, note: "Also possibly true, but irrelevant to whether the stated reasoning (tenure) actually justifies the promotion." },
      { text: 'Jae actually has less hands-on experience than some newer hires.', correct: false, note: "This would undermine the argument, not support it — the opposite of what it needs to be true." },
    ],
  },
  {
    id: 'assumption-festival',
    tier: 'connection',
    questionType: 'assumption',
    argument: "We should cancel the outdoor festival — the weather forecast says a 30% chance of rain.",
    prompt: "What does this argument need to be true in order to actually work, even though it's never stated?",
    options: [
      { text: 'A 30% rain chance clears the cancel-worthy threshold.', correct: true, note: "The argument jumps straight from a number to a decision without ever establishing where the cancel-worthy threshold actually is — that judgment call is the real weight it's resting on." },
      { text: 'The festival has been rained out once before.', correct: false, note: "Past events aren't mentioned or needed here — this argument is about this forecast, not history." },
      { text: 'Indoor venues nearby tend to be more expensive to book on short notice.', correct: false, note: "Cost of alternatives has nothing to do with whether this specific reasoning about rain chance holds up." },
      { text: 'Most attendees would rather stay dry than attend.', correct: false, note: "Plausible, but the argument never actually invokes attendee preference — it's built entirely on the forecast number." },
    ],
  },
  {
    id: 'assumption-new-employee',
    tier: 'connection',
    questionType: 'assumption',
    argument: "Since the new employee arrived, the team's output has gone up — she must be really effective.",
    prompt: "What does this argument need to be true in order to actually work, even though it's never stated?",
    options: [
      { text: "Nothing else changed that could explain the increase.", correct: true, note: "Without ruling out other causes — a new tool, a lighter workload, a deadline push — the timing alone can't actually point to her specifically. The argument quietly assumes she's the only thing that changed." },
      { text: 'She has more experience than the rest of the team.', correct: false, note: "Never stated or needed — the argument is built purely on the timing of the output increase, not her resume." },
      { text: 'The team genuinely enjoys working alongside her.', correct: false, note: "Irrelevant to whether the output increase is actually attributable to her." },
      { text: 'Output was actually already climbing before she arrived.', correct: false, note: "This would directly undercut the argument, not support it — it's the reverse of what the argument needs." },
    ],
  },
  {
    id: 'assumption-restaurant-review',
    tier: 'connection',
    questionType: 'assumption',
    argument: "You should trust this restaurant review — the reviewer has posted over 500 reviews.",
    prompt: "What does this argument need to be true in order to actually work, even though it's never stated?",
    options: [
      { text: "Having posted many reviews means this reviewer's judgment is reliable.", correct: true, note: "Quantity of reviews is the only thing offered as a reason to trust this one — the argument needs volume to actually track reliability, which is never shown." },
      { text: 'The restaurant has good service.', correct: false, note: "This is about the restaurant, not about why the reviewer should be trusted — not what the argument depends on." },
      { text: "This reviewer has personally eaten at this restaurant multiple times.", correct: false, note: "Never stated or required — the argument leans entirely on review count, not repeat visits." },
      { text: 'Reviewers who post frequently are sometimes compensated by restaurants.', correct: false, note: "This would actually work against trusting the reviewer, not support the argument for trusting them." },
    ],
  },

  // --- Integration: Evidence That Changes the Conclusion ---
  {
    id: 'evidence-supplement-sales',
    tier: 'integration',
    questionType: 'evidence',
    argument: "This vitamin supplement must work — sales have tripled in the last year.",
    prompt: 'Which of these, if true, would actually change whether that conclusion is justified?',
    options: [
      { text: 'A large, controlled study found no benefit over a placebo.', correct: true, note: "This directly addresses the actual question — whether it works — in a way sales numbers never could. This is real evidence about effectiveness, not popularity." },
      { text: 'The supplement now comes in a new flavor.', correct: false, note: "Has nothing to do with whether the supplement is effective." },
      { text: "The company spent significantly more on advertising this year.", correct: false, note: "This explains why sales might have tripled, but it doesn't change the conclusion — the sales figure was never good evidence of effectiveness in the first place, so learning why sales rose doesn't add or remove anything about whether it actually works." },
      { text: "It's now sold in twice as many stores.", correct: false, note: "Also just explains the sales number, not the supplement's actual effectiveness — same gap as the ad-spending option." },
    ],
  },
  {
    id: 'evidence-standup-format',
    tier: 'integration',
    questionType: 'evidence',
    argument: "Our team's new stand-up format is working — the last two sprints, we shipped on time.",
    prompt: 'Which of these, if true, would actually change whether that conclusion is justified?',
    options: [
      { text: 'Those two sprints also had unusually light scope.', correct: true, note: "This is a genuine alternative explanation for on-time delivery that has nothing to do with the stand-up format — it directly challenges whether the format is actually what changed the outcome." },
      { text: 'Most people say they enjoy the new format.', correct: false, note: "Enjoying a process and it actually working (shipping on time) are different questions — satisfaction doesn't establish effectiveness." },
      { text: 'The stand-ups themselves run five minutes shorter now.', correct: false, note: "A detail about the format, but doesn't bear on whether it caused on-time delivery." },
      { text: 'One teammate initially pushed back on the new format.', correct: false, note: "Irrelevant to whether the format is actually responsible for shipping on time." },
    ],
  },
  {
    id: 'evidence-bootcamp-employment',
    tier: 'integration',
    questionType: 'evidence',
    argument: "This coding bootcamp must be effective — 90% of graduates report being employed within six months.",
    prompt: 'Which of these, if true, would actually change whether that conclusion is justified?',
    options: [
      { text: 'The 90% figure only counts survey respondents, and just 40% responded.', correct: true, note: "This exposes a real flaw in the statistic itself — if the people who didn't find jobs were less likely to respond, the true employment rate could be far lower. This directly undercuts the number the whole argument rests on." },
      { text: 'The bootcamp costs roughly $12,000 for the full program.', correct: false, note: "Cost has no bearing on whether the bootcamp is actually effective at getting people employed." },
      { text: "It's been running continuously for about 8 years now, since it first opened.", correct: false, note: "Longevity doesn't speak to effectiveness — plenty of ineffective programs run for years." },
      { text: "The bootcamp's founder used to personally work as a software engineer.", correct: false, note: "The founder's background doesn't bear on whether the program's actual outcomes are as strong as claimed." },
    ],
  },
  {
    id: 'evidence-office-layout-slack',
    tier: 'integration',
    questionType: 'evidence',
    argument: "The new office layout must be boosting collaboration — the number of cross-team Slack messages has gone up 40%.",
    prompt: 'Which of these, if true, would actually change whether that conclusion is justified?',
    options: [
      { text: 'A new company-wide Slack channel also launched around the same time.', correct: true, note: "This is a real alternative cause for the message increase that has nothing to do with the physical layout — it directly challenges whether the layout is actually what's driving the number." },
      { text: 'Most employees say they genuinely like the look of the new layout.', correct: false, note: "Liking the layout is a different question from whether it's actually increasing collaboration — preference doesn't establish the effect claimed." },
      { text: 'The new layout cost noticeably more to build than the old one did.', correct: false, note: "Cost has nothing to do with whether the layout is actually boosting collaboration." },
      { text: 'A handful of employees have complained about noise in the new layout.', correct: false, note: "Doesn't bear on the specific metric-based claim about Slack messages going up." },
    ],
  },

  // --- Expert: Compare Two Arguments — deliberately mixed across all
  // four possible verdicts (A / B / equally strong / both flawed), so
  // no single answer is ever a safe default. ---
  {
    id: 'compare-four-day-week',
    tier: 'expert',
    questionType: 'compare',
    claim: 'Should the company switch to a 4-day work week?',
    argumentA: 'A controlled comparison across 3 similar companies that switched to 4-day weeks found productivity per employee stayed flat while overall costs dropped — output didn\'t fall even though hours did.',
    argumentB: "Everyone I've talked to at other companies says a 4-day week would make them happier, so we should switch.",
    prompt: 'Which argument is actually better supported?',
    options: [
      { text: 'Argument A is better supported.', correct: true, note: "A uses a real comparison group with a measurable outcome directly relevant to the business question (does output hold up?). B is anecdotal, and happiness — while real — doesn't establish the actual thing being decided." },
      { text: 'Argument B is better supported.', correct: false, note: "B never actually addresses whether output would hold up, which is the real question — it only speaks to how people feel about the idea." },
      { text: "They're about equally well supported.", correct: false, note: "They're not close — A has an actual controlled comparison with a relevant metric; B is informal secondhand opinion with no comparison at all." },
      { text: 'Both have significant flaws.', correct: false, note: "A is a genuinely reasonable comparison — 3 companies isn't huge, but it's a real measured comparison, not a flaw on the scale of B's anecdote." },
    ],
  },
  {
    id: 'compare-reading-before-bed',
    tier: 'expert',
    questionType: 'compare',
    claim: 'Does reading before bed actually improve sleep quality?',
    argumentA: "I've read before bed my whole life and I sleep fine, so it must help.",
    argumentB: 'A study tracked 200 participants\' sleep with wearable sensors over 4 weeks, comparing nights they read on paper before bed to nights they didn\'t, and found measurably more time in deep sleep on reading nights.',
    prompt: 'Which argument is actually better supported?',
    options: [
      { text: 'Argument A is better supported.', correct: false, note: "A is a single person's experience with no comparison case at all — there's no way to know if they'd sleep just as well without reading." },
      { text: 'Argument B is better supported.', correct: true, note: "B has a real sample size, an actual within-subject comparison (same people, reading nights vs. non-reading nights), and an objective measurement instead of a feeling." },
      { text: "They're about equally well supported.", correct: false, note: "Not close — B has measurement and comparison that A completely lacks; A is a single anecdote." },
      { text: 'Both have significant flaws.', correct: false, note: "B isn't flawless, but a 200-person tracked comparison is a real, solid piece of evidence, not a flawed one on the same level as a single anecdote." },
    ],
  },
  {
    id: 'compare-lunch-period',
    tier: 'expert',
    questionType: 'compare',
    claim: 'Should the school extend the lunch period by 10 minutes?',
    argumentA: 'A survey of 300 students found the large majority reported feeling rushed and not finishing their food, and the school nurse saw fewer stomachache complaints during a one-week pilot when lunch was extended.',
    argumentB: 'Teachers tracked the following-period tardiness rate during the two weeks lunch was accidentally shortened by a scheduling error last year, and it was measurably higher than any other two-week stretch that semester.',
    prompt: 'Which argument is actually better supported?',
    options: [
      { text: 'Argument A is better supported.', correct: false, note: "A is solid, but not clearly stronger than B — both rely on a real, if imperfect, natural comparison rather than opinion alone." },
      { text: 'Argument B is better supported.', correct: false, note: "B is solid too, but not clearly stronger than A — neither has an obvious edge in rigor over the other." },
      { text: "They're about equally well supported.", correct: true, note: "Both point the same direction (lunch length affects student wellbeing/behavior) using a real comparison — a survey plus a measured pilot outcome for A, a genuine natural experiment for B — and neither is obviously more rigorous than the other." },
      { text: 'Both have significant flaws.', correct: false, note: "Both have real, if imperfect, evidence behind them — a small pilot and a natural experiment are meaningfully more than opinion, even though neither is a full controlled study." },
    ],
  },
  {
    id: 'compare-onboarding-video',
    tier: 'expert',
    questionType: 'compare',
    claim: "Does the company's new onboarding video improve new-hire performance?",
    argumentA: 'New hires who watched the video say they felt very prepared afterward.',
    argumentB: 'New-hire performance reviews have been slightly higher this quarter than last, and the video launched this quarter.',
    prompt: 'Which argument is actually better supported?',
    options: [
      { text: 'Argument A is better supported.', correct: false, note: "A confuses feeling prepared with actually performing better — those aren't the same thing, and the argument never bridges that gap." },
      { text: 'Argument B is better supported.', correct: false, note: "B is a bare correlation over a very short window, with no attempt to rule out other causes — like different managers, different hires, or seasonal factors this quarter." },
      { text: "They're about equally well supported.", correct: false, note: "Both are weak, but not for the same reason — this isn't a case of two comparably solid arguments, it's a case of two different unaddressed gaps." },
      { text: 'Both have significant flaws.', correct: true, note: "Neither argument actually measures the video's effect on performance: A measures a feeling, not an outcome, and B has a real correlation but no way to rule out everything else that could explain one quarter's small bump." },
    ],
  },
];
