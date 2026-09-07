/**
 * Human Behavior — deliberately NOT a single-correct-answer quiz.
 *
 * Per the master spec: the goal is exploring multiple explanations, never
 * diagnosing a person from one behavior, and never normalizing paranoid
 * mind-reading as insight. So each scenario is a multi-select: every
 * `reasonable: true` explanation is a legitimate possibility given the
 * (limited) information available; every `reasonable: false` one is a
 * confident-sounding leap that isn't actually supported by the evidence —
 * flagged as an unwarranted assumption, not mocked or called "wrong" in a
 * mean-spirited way. The skill being tested is "can you resist jumping to
 * a conclusion," not "can you correctly diagnose this person."
 */

export const humanBehaviorScenarios = [
  {
    id: 'coworker-snap',
    scenario:
      "A coworker who's normally easygoing snapped at you today over a small mistake. It's not like them.",
    explanations: [
      { text: 'They might be dealing with a stressful personal issue unrelated to you.', reasonable: true, note: "You have no visibility into what's happening in their life outside work." },
      { text: 'They could be under a tight deadline and stretched thin right now.', reasonable: true, note: 'Work pressure often leaks out as short temper, even toward people it has nothing to do with.' },
      { text: "They may already regret snapping and just haven't said anything yet.", reasonable: true, note: 'People often feel bad about an outburst before they get around to addressing it.' },
      { text: 'They must secretly dislike you.', reasonable: false, note: 'One uncharacteristic moment is thin evidence for a conclusion this strong and personal.' },
      { text: "This means you're bad at your job.", reasonable: false, note: "A small mistake and someone else's reaction to it says little about your overall competence." },
    ],
  },
  {
    id: 'friend-no-reply',
    scenario: "A friend hasn't replied to your text in two days, which is unusual for them.",
    explanations: [
      { text: 'They might just be busy or dealing with something offline.', reasonable: true, note: 'Two days of silence is common when life gets busy — it rarely means what it feels like it means.' },
      { text: 'Their phone could be broken, or they missed the notification.', reasonable: true, note: 'Boring technical explanations are often the real ones.' },
      { text: "They may be composing a longer reply and haven't finished it.", reasonable: true, note: 'Some people sit on messages that deserve a thoughtful answer.' },
      { text: "They're obviously avoiding you on purpose.", reasonable: false, note: '"Obviously" is doing a lot of work here — silence has many causes besides avoidance.' },
      { text: 'You must have done something to upset them.', reasonable: false, note: "This assumes you're the cause without any actual evidence pointing that way." },
    ],
  },
  {
    id: 'group-project-quiet',
    scenario: "In a group project, one teammate hasn't contributed much yet.",
    explanations: [
      { text: 'They might be waiting for a clearer task assignment.', reasonable: true, note: 'Ambiguous roles genuinely stall people who\'d otherwise contribute.' },
      { text: "They could be dealing with something outside the group that's taking their attention.", reasonable: true, note: "You're only seeing one slice of their week." },
      { text: 'They may not feel confident about their part yet and are hesitating.', reasonable: true, note: 'Hesitation is often about uncertainty, not unwillingness.' },
      { text: "They're lazy and don't care about the grade.", reasonable: false, note: 'This labels their character based on incomplete information about their situation.' },
      { text: "They're intentionally freeloading off the rest of the group.", reasonable: false, note: 'Intent is the hardest thing to know from the outside — this assumes the worst version of events.' },
    ],
  },
  {
    id: 'joke-no-laugh',
    scenario: "Someone didn't laugh at your joke in a group setting.",
    explanations: [
      { text: "They might not have heard it clearly.", reasonable: true, note: "Group settings are noisy — plenty gets missed." },
      { text: "Humor lands differently for different people — it's not universal.", reasonable: true, note: 'A joke landing with most of the group and not one person is just normal variance.' },
      { text: 'They could have been distracted by something else in the moment.', reasonable: true, note: "Attention isn't always where you'd expect it to be." },
      { text: "They think you're not funny at all.", reasonable: false, note: 'One non-reaction generalized into a permanent judgment about your humor is a big leap.' },
      { text: "They're judging you negatively as a person.", reasonable: false, note: 'This stretches "didn\'t laugh at one joke" into a verdict on your whole character.' },
    ],
  },
  {
    id: 'family-distant',
    scenario: 'A family member has seemed distant and quiet at recent gatherings.',
    explanations: [
      { text: "They could be going through something they haven't talked about yet.", reasonable: true, note: 'People often withdraw before they\'re ready to explain why.' },
      { text: 'They might just be more introverted lately, unrelated to anyone in particular.', reasonable: true, note: "Energy and sociability naturally fluctuate for reasons that aren't about anyone else." },
      { text: 'Something outside the family, like work or health, could be weighing on them.', reasonable: true, note: 'The most emotionally loaded explanation is rarely the only plausible one.' },
      { text: 'They must be mad at the family.', reasonable: false, note: 'Quietness and anger look similar from the outside but are very different things.' },
      { text: "They don't want to be part of the family anymore.", reasonable: false, note: "This is a dramatic conclusion from a pattern (being quiet) that has many milder explanations." },
    ],
  },
  {
    id: 'professor-blunt',
    scenario: 'Your professor gave short, blunt feedback on your assignment.',
    explanations: [
      { text: 'They likely grade a lot of assignments and keep comments brief for everyone.', reasonable: true, note: 'Volume alone explains a lot of terse feedback.' },
      { text: "Brevity might just be their communication style, not a judgment of you specifically.", reasonable: true, note: "Some people are blunt with everyone — it's not personal." },
      { text: 'They may be under time pressure grading a stack of similar work.', reasonable: true, note: 'Context you can\'t see (a grading deadline) often explains tone.' },
      { text: 'They think your work is worthless.', reasonable: false, note: 'Brief feedback and a harsh verdict on value are two very different things.' },
      { text: "They don't respect you as a student.", reasonable: false, note: "This reads a lot of personal meaning into what's likely just an efficient grading habit." },
    ],
  },
  {
    id: 'friend-cancels-twice',
    scenario: 'A friend cancels plans with you for the second time this month.',
    explanations: [
      { text: 'Their schedule or circumstances might genuinely have changed both times.', reasonable: true, note: "Two events isn't yet a reliable pattern — coincidences happen." },
      { text: "They could be dealing with something they haven't shared yet.", reasonable: true, note: 'People often withdraw from plans while working through something private.' },
      { text: "Two cancellations isn't necessarily a pattern about you specifically.", reasonable: true, note: "It's worth noticing, but not yet enough to draw a firm conclusion from." },
      { text: "They're clearly losing interest in the friendship.", reasonable: false, note: '"Clearly" overstates what two data points can actually tell you.' },
      { text: 'They must be avoiding you.', reasonable: false, note: 'This assumes intent that the evidence alone doesn\'t establish.' },
    ],
  },
  {
    id: 'seen-no-reply',
    scenario: 'Someone left your message on "seen" without responding.',
    explanations: [
      { text: 'They might have meant to reply and simply forgot.', reasonable: true, note: 'This happens constantly and has nothing to do with how they feel about you.' },
      { text: 'They could be waiting until they have time to respond properly.', reasonable: true, note: 'Some people avoid replying briefly to something that deserves more thought.' },
      { text: 'Notifications get missed or buried constantly — it may not have even registered.', reasonable: true, note: "\"Seen\" doesn't always mean \"read and consciously ignored.\"" },
      { text: "They're ignoring you on purpose.", reasonable: false, note: 'This assumes a deliberate choice when there are several mundane explanations first.' },
      { text: "This means they don't value the friendship.", reasonable: false, note: 'One unanswered message is weak evidence for a conclusion about the whole relationship.' },
    ],
  },
  {
    id: 'sibling-short-tempered',
    scenario: 'A sibling has been short-tempered with you this week.',
    explanations: [
      { text: 'They might be stressed about something happening in their own life.', reasonable: true, note: "Family members absorb each other's stress even when it isn't about the family." },
      { text: 'Lack of sleep or a bad week can make anyone more reactive.', reasonable: true, note: 'Mood is often about physical state, not relationships.' },
      { text: 'It may have nothing to do with you at all.', reasonable: true, note: "It's easy to assume you're the cause of someone's mood — often you aren't." },
      { text: 'They secretly resent you.', reasonable: false, note: 'This is a strong, specific claim built on a week of short temper alone.' },
      { text: 'You must have done something wrong to deserve it.', reasonable: false, note: "This puts the blame on you without any actual evidence that you're the cause." },
    ],
  },
  {
    id: 'manager-1on1',
    scenario: 'Your manager scheduled an unplanned one-on-one meeting with you.',
    explanations: [
      { text: 'Check-ins can be routine and not tied to any specific issue.', reasonable: true, note: 'Many managers meet regularly regardless of whether anything is "wrong."' },
      { text: 'They might want your input on something unrelated to your performance.', reasonable: true, note: 'Meetings get scheduled for all kinds of reasons that have nothing to do with you personally.' },
      { text: 'It could be about a scheduling or logistics matter, not you personally.', reasonable: true, note: 'The mundane explanation is often the real one.' },
      { text: "You're probably about to be fired.", reasonable: false, note: 'This is the most extreme possible interpretation of an ordinary, common workplace event.' },
      { text: 'You must be in trouble.', reasonable: false, note: 'An unplanned meeting alone is not evidence of trouble — that\'s an assumption filling in a gap.' },
    ],
  },
];
