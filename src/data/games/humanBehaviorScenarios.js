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
 *
 * Wording rule (learned the hard way, twice — see git history): reasonable
 * and overreach options must not be distinguishable by tone or word choice
 * alone. Draft 1 hedged every reasonable option ("might/could/may") and
 * gave every overreach option absolute language ("must/obviously"). Draft
 * 2 fixed that but left "probably" as an accidental 100%-reasonable tell.
 * Both are the same underlying mistake: a shortcut that lets you win by
 * pattern-matching phrasing instead of reasoning about the scenario. This
 * draft deliberately rotates each option through a flat/"probably"/
 * "might-could" phrasing roughly evenly across BOTH categories — verified
 * word-by-word (see the checker script), not just eyeballed.
 *
 * Difficulty tiers (streak-gated, same idea as Detective/Critical
 * Thinking): `easy` is the original 10 (5 explanations: 3 reasonable + 2
 * overreach). `medium` uses 6 explanations (3 reasonable + 3 overreach) —
 * more to track and weigh, same reasoning type. `hard` also uses 6, but
 * the overreach options are deliberately *quieter* — no dramatic claims
 * ("they hate you"), just calmer statements that still assert something
 * specific the evidence doesn't actually support. That's a genuinely
 * harder read, not a re-skin — and precisely the kind of change that
 * risks reintroducing the length/wording tells this file already got
 * burned by twice, so every new scenario (medium and hard) went through
 * the same adversarial length/keyword check before shipping, not just a
 * read-through.
 */

export const humanBehaviorScenarios = [
  {
    id: 'coworker-snap',
    scenario:
      "A coworker who's normally easygoing snapped at you today over a small mistake. It's not like them.",
    explanations: [
      { text: 'Something stressful in their personal life is spilling over into work.', reasonable: true, note: "You have no visibility into what's happening in their life outside work." },
      { text: "A deadline has them stretched thin, and it has nothing to do with you.", reasonable: true, note: 'Work pressure often leaks out as short temper, even toward people it has nothing to do with.' },
      { text: 'They might already regret snapping and just haven\'t said anything yet.', reasonable: true, note: 'People often feel bad about an outburst before they get around to addressing it.' },
      { text: 'They might secretly dislike you.', reasonable: false, note: 'One uncharacteristic moment is thin evidence for a conclusion this personal.' },
      { text: 'Your work has probably been slipping for a while and this was the final straw.', reasonable: false, note: "A small mistake and someone else's reaction to it says little about your overall performance." },
    ],
    tier: 'easy',
  },
  {
    id: 'friend-no-reply',
    scenario: "A friend hasn't replied to your text in two days, which is unusual for them.",
    explanations: [
      { text: 'Life got busy and the message got buried — it happens to everyone.', reasonable: true, note: 'Two days of silence is common when life gets busy — it rarely means what it feels like it means.' },
      { text: 'A broken phone or a missed notification would easily explain it.', reasonable: true, note: 'Boring technical explanations are often the real ones.' },
      { text: 'The message probably deserves a longer answer than they\'ve had time to write.', reasonable: true, note: 'Some people sit on messages that deserve a thoughtful answer.' },
      { text: "They're avoiding you because they don't want to deal with something between you two.", reasonable: false, note: 'Silence has many causes besides avoidance, and nothing here points specifically to that one.' },
      { text: 'You probably upset them somehow.', reasonable: false, note: "This assumes you're the cause without any actual evidence pointing that way." },
    ],
    tier: 'easy',
  },
  {
    id: 'group-project-quiet',
    scenario: "In a group project, one teammate hasn't contributed much yet.",
    explanations: [
      { text: "The task assignments are probably not clear enough for them to start yet.", reasonable: true, note: 'Ambiguous roles genuinely stall people who\'d otherwise contribute.' },
      { text: "Something outside the group is taking up their attention right now.", reasonable: true, note: "You're only seeing one slice of their week." },
      { text: "They probably don't feel confident about their part yet, which is causing the hesitation.", reasonable: true, note: 'Hesitation is often about uncertainty, not unwillingness.' },
      { text: "They don't care about the grade or how it affects everyone else's work.", reasonable: false, note: 'This labels their motivation based on incomplete information about their situation.' },
      { text: "They're probably freeloading on purpose, counting on everyone else to carry it.", reasonable: false, note: 'Intent is the hardest thing to know from the outside — this assumes the worst version of events.' },
    ],
    tier: 'easy',
  },
  {
    id: 'joke-no-laugh',
    scenario: "Someone didn't laugh at your joke in a group setting.",
    explanations: [
      { text: "There's a decent chance they didn't hear it clearly.", reasonable: true, note: "Group settings are noisy — plenty gets missed." },
      { text: "Humor lands differently for different people — it's not universal.", reasonable: true, note: 'A joke landing with most of the group and not one person is just normal variance.' },
      { text: "Their attention was probably somewhere else in that moment.", reasonable: true, note: "Attention isn't always where you'd expect it to be." },
      { text: "They think you're just not funny.", reasonable: false, note: 'One non-reaction generalized into a permanent judgment about your humor is a big leap.' },
      { text: "They're probably judging you negatively as a person because of it.", reasonable: false, note: 'This stretches "didn\'t laugh at one joke" into a verdict on your whole character.' },
    ],
    tier: 'easy',
  },
  {
    id: 'family-distant',
    scenario: 'A family member has seemed distant and quiet at recent gatherings.',
    explanations: [
      { text: "They're working through something they haven't talked about yet.", reasonable: true, note: 'People often withdraw before they\'re ready to explain why.' },
      { text: "This is likely just a quieter phase for them, unrelated to anyone in particular.", reasonable: true, note: "Energy and sociability naturally fluctuate for reasons that aren't about anyone else." },
      { text: "Work or health is probably weighing on them outside of family time.", reasonable: true, note: 'The most emotionally loaded explanation is rarely the only plausible one.' },
      { text: "They might be mad at the whole family and just haven't said why yet.", reasonable: false, note: 'Quietness and anger look similar from the outside but are very different things.' },
      { text: "They probably want to pull away from the family for good at this point.", reasonable: false, note: "This is a dramatic conclusion from a pattern (being quiet) that has many milder explanations." },
    ],
    tier: 'easy',
  },
  {
    id: 'professor-blunt',
    scenario: 'Your professor gave short, blunt feedback on your assignment.',
    explanations: [
      { text: "They're grading a big stack of similar work and keep comments brief for everyone.", reasonable: true, note: 'Volume alone explains a lot of terse feedback.' },
      { text: "Brevity might just be their communication style, not a judgment of you specifically.", reasonable: true, note: "Some people are blunt with everyone — it's not personal." },
      { text: "A grading deadline on their end probably shaped how much time they gave each paper.", reasonable: true, note: 'Context you can\'t see (a grading deadline) often explains tone.' },
      { text: "They think your work is worthless and barely worth commenting on.", reasonable: false, note: 'Brief feedback and a harsh verdict on value are two very different things.' },
      { text: "They probably don't respect you as a student at all anymore.", reasonable: false, note: "This reads a lot of personal meaning into what's likely just an efficient grading habit." },
    ],
    tier: 'easy',
  },
  {
    id: 'friend-cancels-twice',
    scenario: 'A friend cancels plans with you for the second time this month.',
    explanations: [
      { text: "Their schedule or circumstances genuinely changed both times, unrelated to each other.", reasonable: true, note: "Two events isn't yet a reliable pattern — coincidences happen." },
      { text: "They might be dealing with something they haven't shared yet.", reasonable: true, note: 'People often withdraw from plans while working through something private.' },
      { text: "Two cancellations is probably worth noticing, but it isn't enough to draw a firm conclusion.", reasonable: true, note: "It's worth paying attention to, but not yet a verdict." },
      { text: "They're losing interest in the friendship and slowly pulling away from it.", reasonable: false, note: 'Two data points is a thin basis for a conclusion this strong.' },
      { text: "They're probably avoiding you without wanting to say so directly.", reasonable: false, note: 'This assumes intent that the evidence alone doesn\'t establish.' },
    ],
    tier: 'easy',
  },
  {
    id: 'seen-no-reply',
    scenario: 'Someone left your message on "seen" without responding.',
    explanations: [
      { text: "They meant to reply and it slipped their mind.", reasonable: true, note: 'This happens constantly and has nothing to do with how they feel about you.' },
      { text: "They're likely waiting until they have time to respond properly.", reasonable: true, note: 'Some people avoid replying briefly to something that deserves more thought.' },
      { text: 'Notifications get missed or buried constantly — it probably didn\'t even register.', reasonable: true, note: "\"Seen\" doesn't always mean \"read and consciously ignored.\"" },
      { text: "They're ignoring you on purpose because they don't want to respond right now.", reasonable: false, note: 'This assumes a deliberate choice when there are several mundane explanations first.' },
      { text: "This probably means they don't value the friendship as much as you do.", reasonable: false, note: 'One unanswered message is weak evidence for a conclusion about the whole relationship.' },
    ],
    tier: 'easy',
  },
  {
    id: 'sibling-short-tempered',
    scenario: 'A sibling has been short-tempered with you this week.',
    explanations: [
      { text: "Something stressful in their own life is probably behind it.", reasonable: true, note: "Family members absorb each other's stress even when it isn't about the family." },
      { text: "A rough week of bad sleep can make anyone more reactive.", reasonable: true, note: 'Mood is often about physical state, not relationships.' },
      { text: "More often than not, this has nothing to do with you at all.", reasonable: true, note: "It's easy to assume you're the cause of someone's mood — often you aren't." },
      { text: "They secretly resent you.", reasonable: false, note: 'This is a strong, specific claim built on a week of short temper alone.' },
      { text: "You probably did something to deserve it, even if you can't think of what.", reasonable: false, note: "This puts the blame on you without any actual evidence that you're the cause." },
    ],
    tier: 'easy',
  },
  {
    id: 'manager-1on1',
    scenario: 'Your manager scheduled an unplanned one-on-one meeting with you.',
    explanations: [
      { text: "Plenty of managers check in regularly whether or not anything is going on.", reasonable: true, note: 'Many managers meet regularly regardless of whether anything is "wrong."' },
      { text: "They might want your input on something that has nothing to do with your performance.", reasonable: true, note: 'Meetings get scheduled for all kinds of reasons that have nothing to do with you personally.' },
      { text: "It's probably a scheduling or logistics matter, not something about you.", reasonable: true, note: 'The mundane explanation is often the real one.' },
      { text: "You're about to be fired, and this meeting is how they'll break the news.", reasonable: false, note: 'This is the most extreme possible interpretation of an ordinary, common workplace event.' },
      { text: "You're probably in some kind of trouble, even if you can't guess what for.", reasonable: false, note: 'An unplanned meeting alone is not evidence of trouble — that\'s an assumption filling in a gap.' },
    ],
    tier: 'easy',
  },

  // --- Medium: 6 explanations (3 reasonable + 3 overreach) instead of 5 ---
  {
    id: 'roommate-messy-week',
    scenario: "Your roommate, who's usually tidy, left dishes piling up in the sink for several days this week.",
    explanations: [
      { text: "They've probably had an unusually busy week at work or school.", reasonable: true, note: 'A busy stretch is one of the most common, mundane reasons a normal habit slips temporarily.' },
      { text: 'A big batch all at once is just how they clean sometimes, not a daily habit.', reasonable: true, note: "Some people genuinely clean in batches rather than daily — one messy week doesn't break that pattern." },
      { text: 'Something outside the apartment is taking up more of their energy than usual right now.', reasonable: true, note: 'You only see the dishes, not everything else going on in their week.' },
      { text: "They've decided they don't care about keeping shared spaces clean anymore.", reasonable: false, note: "One week of dishes doesn't establish a permanent change in how much they care — that's reading a lot into a short window." },
      { text: "They're testing to see how long it takes before you say something.", reasonable: false, note: 'This assumes a deliberate, manipulative motive with nothing in the situation actually pointing to intent.' },
      { text: "They probably think it's your job to handle the dishes, not theirs.", reasonable: false, note: "Nothing here indicates an assumption about whose job it is — that's inventing a belief they haven't expressed." },
    ],
    tier: 'medium',
  },
  {
    id: 'partner-short-replies',
    scenario: "Your partner's texts have been shorter than usual for a couple of days — replies like \"ok\" and \"yeah\" instead of their normal longer messages.",
    explanations: [
      { text: 'They\'re probably just busier than usual and typing less because of it.', reasonable: true, note: 'Shorter texts are one of the most common signs of a busy stretch, nothing more.' },
      { text: 'Tiredness alone can easily explain shorter texts, saved for when you\'re together in person.', reasonable: true, note: 'Some people text less when tired and prefer talking face-to-face instead.' },
      { text: 'Something unrelated to the relationship is on their mind right now.', reasonable: true, note: "You're seeing one channel (texting) out of everything happening in their day." },
      { text: 'They\'re losing interest in the relationship.', reasonable: false, note: 'A couple of days of shorter texts is thin evidence for a conclusion this significant.' },
      { text: "They're probably texting someone else more than they're texting you.", reasonable: false, note: "There's nothing in shorter replies that points specifically toward this — it's an invented explanation, not one the evidence supports." },
      { text: "They're upset with you about something and not saying it directly.", reasonable: false, note: "This assumes a hidden grievance without any actual sign of one — silence isn't the same as unspoken anger." },
    ],
    tier: 'medium',
  },
  {
    id: 'classmate-avoids-eye-contact',
    scenario: 'A classmate who usually says hi to you in the hallway looked down and didn\'t make eye contact today.',
    explanations: [
      { text: 'They\'re dealing with something that has nothing to do with you.', reasonable: true, note: "People carry things you can't see — a single off moment rarely traces back to you specifically." },
      { text: 'Being in a rush and simply not registering you is common enough.', reasonable: true, note: 'Hallways are chaotic — plenty of people get missed in the moment.' },
      { text: 'A low-energy day is probably behind it, unrelated to you specifically.', reasonable: true, note: "An off day affects how someone treats everyone, not just you." },
      { text: 'They found out something specific about you that made them genuinely upset.', reasonable: false, note: 'This invents a specific cause with zero actual evidence behind it — just one quiet hallway moment.' },
      { text: "They're deliberately snubbing you because of something you did.", reasonable: false, note: 'This assumes intent and a specific grievance from a single ambiguous moment — a big leap from very little.' },
      { text: 'Someone probably told them something specific and negative about you recently.', reasonable: false, note: 'There is nothing in this scenario suggesting a third party was involved at all — this is pure speculation stacked on speculation.' },
    ],
    tier: 'medium',
  },
  {
    id: 'boss-cc-email',
    scenario: "Your boss CC'd their manager on an email to you for the first time.",
    explanations: [
      { text: 'This is standard practice for this type of request at a lot of workplaces.', reasonable: true, note: 'Some workplaces CC leadership on certain categories of email as a routine habit, not a signal.' },
      { text: "Your boss's manager probably just asked to be kept in the loop on this topic generally.", reasonable: true, note: "A CC often reflects someone else's request, not a judgment about you." },
      { text: 'This is about visibility for the project, not about you personally.', reasonable: true, note: 'CCs are often about keeping a project visible, unrelated to any one person\'s performance.' },
      { text: "Your boss is building a paper trail because they're planning to write you up.", reasonable: false, note: 'This is a dramatic, specific interpretation of a routine workplace action with nothing pointing that way.' },
      { text: 'Your work has probably been under more scrutiny than you realized.', reasonable: false, note: "A single CC doesn't establish ongoing scrutiny — that's a large inference from one small data point." },
      { text: "They're trying to make sure their manager sees that they're managing you closely.", reasonable: false, note: 'This assumes a specific motive about how your boss wants to be perceived, which nothing here actually supports.' },
    ],
    tier: 'medium',
  },

  // --- Hard: same 6-option shape, but overreach options are quieter —
  // no dramatic claims, just confident specifics the evidence doesn't
  // actually support. Adversarially checked (length + keyword) alongside
  // the rest of the bank before shipping. ---
  {
    id: 'friend-shorter-hangouts',
    scenario: 'A friend has been leaving your hangouts about 30 minutes earlier than they used to, for the past few weeks.',
    explanations: [
      { text: 'Their schedule probably shifted in a way that makes evenings shorter now.', reasonable: true, note: 'A changed schedule (a new class, shift, or commitment) is a mundane, common explanation for a consistent time change.' },
      { text: 'A new sleep routine unrelated to your hangouts is a common explanation.', reasonable: true, note: 'Personal routines change for all kinds of private reasons unrelated to who they\'re with.' },
      { text: "They're just more tired lately for reasons unrelated to your friendship.", reasonable: true, note: "General fatigue is common and doesn't require any explanation connected to you." },
      { text: "They're quietly pulling back from the friendship, even if they haven't said so.", reasonable: false, note: 'A repeated pattern feels like more evidence than a single instance, but a consistent time change still has plenty of mundane causes — this jumps to a conclusion about the friendship\'s trajectory that the pattern alone doesn\'t establish.' },
      { text: 'Something specific about these hangouts has started to genuinely bother them.', reasonable: false, note: 'This assumes the cause is something about the time spent together specifically, when the more likely explanations are external and have nothing to do with what happens during the hangout.' },
      { text: "They're probably prioritizing someone else's time over yours these days.", reasonable: false, note: "Nothing here points to a specific competing relationship — that's a detailed story invented to fill a gap the evidence doesn't actually fill." },
    ],
    tier: 'hard',
  },
  {
    id: 'parent-quieter-calls',
    scenario: "A parent's weekly calls with you have gotten noticeably shorter over the last month, though they still call every week.",
    explanations: [
      { text: 'They\'ve probably taken on more at work or at home that leaves less time for a long call.', reasonable: true, note: 'Reduced free time is a common, unremarkable cause for shorter routine calls.' },
      { text: "Less has been happening in their week that feels worth a long update.", reasonable: true, note: "Call length often just tracks how eventful someone's week was, not how they feel about the relationship." },
      { text: 'Saving bigger conversations for an upcoming visit or holiday is a common, low-key habit.', reasonable: true, note: 'Some people intentionally hold detailed updates for in-person time rather than the phone.' },
      { text: "They're becoming less interested in staying close.", reasonable: false, note: "The calls are still happening every week without fail — that consistency actually works against this conclusion, not for it; shorter isn't the same as less committed." },
      { text: "Something is wrong that they're choosing not to tell you about.", reasonable: false, note: 'This assumes a hidden, deliberately withheld problem, when a shorter call is equally consistent with an ordinary quiet week.' },
      { text: "They're probably more emotionally distant with you than they used to be.", reasonable: false, note: 'Call length is a weak proxy for emotional closeness — this reads a specific, larger meaning into a detail that has simpler, more likely explanations.' },
    ],
    tier: 'hard',
  },

  // ============================================================
  // DEEPER TIER LADDER (Cohen's "master prompt" reasoning-depth
  // redesign, piloted on this game first). 'easy'/'medium' above are
  // unchanged — they already fit "Recognition"/"Application." These
  // three new tiers are genuinely different reasoning demands, not
  // more of the same:
  //
  // 'connection' — three-way categorization (supported / possible /
  // overreach) instead of binary reasonable/overreach. "Possible" is
  // the new hard part: an explanation that's generically plausible in
  // the abstract but that THIS scenario gives no specific reason to
  // pick — distinguishing "could be true of anyone" from "this
  // scenario's own details point here" is the actual skill.
  //
  // 'integration' — single-select. Given 4 separate observed details,
  // only one explanation coherently accounts for all four; the
  // distractors each explain a subset (or none) while sounding
  // reasonable in isolation. Verified by hand for each option: does it
  // actually use every detail, or does it quietly ignore the ones that
  // don't fit?
  //
  // 'expert' — single-select, and NOT always "not enough information"
  // (that would just be a new predictable safe answer, exactly the
  // failure mode being fixed). Deliberately mixed: two scenarios where
  // the honest answer really is insufficient evidence, two where a
  // specific answer is genuinely the best-supported one — with a
  // "not enough information" option present as a real, plausible-
  // sounding wrong answer in those, not just absent when the answer
  // is elsewhere.
  //
  // All three new tiers were checked with the same adversarial
  // length/wording pass this file's easy/medium content already went
  // through once (see the top-of-file comment) — the "not enough
  // information" options especially, since a long, elaborately-hedged
  // version of that answer was an obvious re-run of the exact
  // longest-option exploit already found and fixed in this game once.
  // ============================================================

  // --- Connection: supported / possible / overreach (select only 'supported') ---
  {
    id: 'roommate-boxes-late-nights',
    tier: 'connection',
    scenario: 'Your roommate has been coming home very late this week, and yesterday you noticed a stack of moving boxes in their room.',
    explanations: [
      { text: 'They might be planning to move out soon.', category: 'supported', note: 'The moving boxes are direct, observable evidence pointing specifically at this.' },
      { text: "Whatever's keeping them out late could be tied to preparing for a move — packing, apartment hunting, logistics.", category: 'supported', note: 'This connects the two observed details (late nights + boxes) into one consistent explanation, rather than treating them as unrelated.' },
      { text: "They've probably just been working a lot of overtime this week.", category: 'possible', note: 'A generically plausible reason for late nights — but nothing here actually points to overtime specifically, and it doesn\'t explain the boxes at all.' },
      { text: 'They might be seeing someone new and spending time at their place.', category: 'possible', note: "A believable guess about late nights in the abstract, but nothing in this scenario suggests a relationship — and it doesn't touch the boxes either." },
      { text: "They're moving out because they don't want to live with you anymore.", category: 'overreach', note: 'This assumes a specific, personal motive for the move that nothing here actually supports — people move for dozens of reasons unrelated to a roommate.' },
      { text: "They've probably been avoiding you on purpose this whole week.", category: 'overreach', note: 'This reframes two fairly ordinary observations as deliberate avoidance, a big leap with nothing here pointing to intent.' },
    ],
  },
  {
    id: 'friend-short-replies-after-news',
    tier: 'connection',
    scenario: 'You told a close friend some big news about your own life last week. Since then, their replies to your texts have been shorter than usual, though they still reply the same day every time.',
    explanations: [
      { text: 'They might need some time to process the news before they feel ready to talk more.', category: 'supported', note: 'The timing lines up directly with when you shared the news — this ties a specific detail (timing) to the change in behavior.' },
      { text: "The news may have stirred up something personal for them, separate from anything about you.", category: 'supported', note: 'This also uses the specific timing detail — something clearly changed right when the news was shared, which narrows down what\'s actually being explained.' },
      { text: "They've probably just been busier than usual lately, between work, other commitments, and everything else going on.", category: 'possible', note: "A common, generic explanation for shorter texts — but nothing here points to them being busier, and it doesn't explain why it started exactly when the news did." },
      { text: 'Their texting style might just naturally vary from week to week depending on their mood or schedule.', category: 'possible', note: 'Plausible in general, but it ignores the specific timing coincidence with the news, which is the one thing distinguishing this from an ordinary slow week.' },
      { text: "They're upset with you specifically for sharing that particular piece of news in the first place.", category: 'overreach', note: "This assumes a specific negative reaction, but replying every single day is actually inconsistent with someone upset enough to pull away." },
      { text: "They don't actually care all that much about what's going on in your life these days.", category: 'overreach', note: 'This reads a permanent, sweeping judgment about the friendship out of one week of shorter, but still daily, replies.' },
    ],
  },
  {
    id: 'coworker-avoids-eye-contact',
    tier: 'connection',
    scenario: "In a team meeting yesterday, you disagreed with a coworker's proposal in front of the group. Today, they've avoided eye contact with you and answered your question in the hallway more briefly than usual.",
    explanations: [
      { text: "They might feel embarrassed or exposed after their proposal was pushed back on in front of the whole group.", category: 'supported', note: 'This directly follows from the specific event — the public disagreement — that happened right before the behavior changed.' },
      { text: 'They could just be feeling a bit awkward about the disagreement itself, without anything deeper going on.', category: 'supported', note: 'A narrower, more grounded version of "something about the meeting is affecting them," tied to the same specific trigger.' },
      { text: 'They might just be having an off day unrelated to work entirely, for reasons that have nothing to do with the meeting at all.', category: 'possible', note: 'A generic explanation that could apply to anyone — but it ignores that the specific timing lines up with yesterday\'s meeting.' },
      { text: "They could be dealing with something at home that's distracting them from everything else going on this week, including this conversation.", category: 'possible', note: "Plausible on its own, but nothing in this scenario points toward anything happening outside work — it's imported from outside the given details." },
      { text: "They're quietly planning to go over your head about the disagreement to someone above you.", category: 'overreach', note: "This invents a specific, escalating intention with zero evidence — avoided eye contact and a brief hallway answer don't indicate a plan." },
      { text: 'They resent you now and the entire working relationship between you two is permanently damaged.', category: 'overreach', note: 'This treats one day of awkwardness as a permanent verdict on the relationship, which the evidence doesn\'t come close to establishing.' },
    ],
  },
  {
    id: 'sibling-cancels-mentions-bill',
    tier: 'connection',
    scenario: "Your sibling was supposed to visit this weekend but cancelled at the last minute. In the same message, they mentioned they'd just found out about an unexpected car repair bill.",
    explanations: [
      { text: "The car repair might have eaten into the money or time they'd set aside for this trip specifically.", category: 'supported', note: "They connected the two facts themselves, in the same message — this isn't a stretch, it's closely following what they actually said." },
      { text: 'Dealing with the sudden bill is probably stressful enough on its own to make traveling feel like too much right now.', category: 'supported', note: 'This stays tied to the specific, stated stressor — the bill — rather than inventing a separate cause.' },
      { text: "They might just not have been feeling up to a long trip this particular weekend, for reasons unrelated to money.", category: 'possible', note: 'A generic reason people cancel plans — but it ignores the specific detail they actually gave you about the bill.' },
      { text: 'Something else entirely in their week could have gotten busier or more complicated at the last minute.', category: 'possible', note: "Plausible in the abstract, but there's no actual evidence for a separate 'something else' when they already gave a specific reason." },
      { text: "They're avoiding visiting you specifically and used the bill as a convenient cover story.", category: 'overreach', note: 'This ignores the concrete explanation they volunteered and replaces it with a much more personal, unsupported one.' },
      { text: "Money problems mean something much bigger is going on in their life that they're not telling you about.", category: 'overreach', note: 'This treats one unexpected bill as evidence of a larger hidden problem, a significant leap past what was actually shared.' },
    ],
  },

  // --- Integration: single-select, one option accounts for every detail ---
  {
    id: 'friend-four-changes',
    tier: 'integration',
    scenario: "Over the past month, a friend has: stopped suggesting hangouts like they used to, taken longer than usual to reply to texts, mentioned twice that work has been \"a lot\" lately, and still enthusiastically said yes whenever YOU suggested plans.",
    options: [
      { text: "They're pulling back from the friendship, quietly losing interest in staying close the way they used to.", correct: false, note: "If they were pulling back, agreeing enthusiastically whenever you suggest plans wouldn't make sense — that detail actively works against this explanation." },
      { text: "It's a busy work stretch, not a change in how they feel.", correct: true, note: "This is the only explanation that accounts for all four details together: less initiating (less bandwidth to plan), slower replies (same reason), explicitly mentioning heavy work twice, and still saying yes enthusiastically when you make the effort — their interest hasn't changed, their capacity has." },
      { text: "They've found a new friend group.", correct: false, note: "Nothing in the four details points to other people at all — this explanation isn't actually built from the evidence given, it's imported from outside it." },
      { text: 'They\'re upset with you about something specific you did or said.', correct: false, note: "This doesn't explain the enthusiastic yes when you suggest plans — someone upset with you specifically wouldn't typically respond that way." },
    ],
  },
  {
    id: 'roommate-money-tight',
    tier: 'integration',
    scenario: "Your roommate has: started buying only the cheapest groceries, mentioned their car needs a repair they're \"putting off,\" asked to split a bill differently than usual in their favor, and seemed unusually tense during a casual conversation about weekend plans.",
    options: [
      { text: "They're going through a stretch of financial tightness.", correct: true, note: "This connects all four details into a single cause: cheap groceries, a delayed repair, wanting a bill split more favorably, and tension specifically around a conversation involving spending money — financial strain explains every one of them." },
      { text: "They're just upset with you.", correct: false, note: "This doesn't explain the delayed car repair or the cheap groceries, which have nothing to do with you — it only tries to account for one of the four details." },
      { text: 'They\'re becoming more frugal in general, as a deliberate long-term lifestyle choice they\'ve been considering for a while.', correct: false, note: 'This doesn\'t fit the tension during the weekend-plans conversation or the "putting off" language about the repair, both of which sound like stress about a temporary situation, not a settled new habit.' },
      { text: "They're planning a big purchase down the road and saving up for it deliberately and happily.", correct: false, note: "A deliberate, excited saving plan wouldn't usually come with visible tension and a delayed necessary repair — those two details fit a squeeze, not a plan." },
    ],
  },
  {
    id: 'partner-distracted-sister',
    tier: 'integration',
    scenario: 'Over two weeks, your partner has: been on their phone more during dinner, given shorter answers to "how was your day," still initiated a weekend trip together, and mentioned their sister has been going through "a hard time" twice.',
    options: [
      { text: "They're falling out of interest in the relationship after this long together.", correct: false, note: "This doesn't fit initiating a weekend trip together — someone losing interest typically wouldn't be the one proposing more shared time." },
      { text: "Their mind is elsewhere — likely their sister's situation, not the relationship.", correct: true, note: "This fits all four details: distraction (phone, short answers) explained by something occupying their mind, the repeated specific mention of their sister's hard time as the likely source, and the weekend trip still being initiated showing the relationship itself isn't what changed." },
      { text: "They're hiding something from you that they don't want you to find out about.", correct: false, note: "This explanation doesn't use the sister detail at all, and doesn't explain why they'd still initiate more time together if they had something to hide." },
      { text: 'The relationship has just settled into a naturally less exciting, more routine phase after this much time together.', correct: false, note: "This doesn't account for the specific, repeated mention of the sister's hard time, a concrete detail pointing at a specific cause rather than a general fade." },
    ],
  },
  {
    id: 'teammate-quality-drop',
    tier: 'integration',
    scenario: 'A usually-reliable teammate on a group project has: turned in their last two parts late, apologized both times without much explanation, stopped responding in the group chat as quickly, and asked the group chat once whether anyone knew a good therapist recommendation "for a friend."',
    options: [
      { text: "They've stopped caring about the project.", correct: false, note: "This doesn't fit the genuine apologies or the fact they still turned the work in, just late — someone who'd stopped caring typically wouldn't bother apologizing at all." },
      { text: "Something outside the project is taking priority right now.", correct: true, note: 'This fits every detail: lateness with short apologies instead of over-explaining, slower general responsiveness, and the therapist question — phrased distantly, "for a friend" — hinting at something personal, all pointing the same direction.' },
      { text: "They're intentionally letting the group down to avoid doing their share of the work.", correct: false, note: "This doesn't explain the apologies (someone doing this deliberately usually wouldn't bother) or the therapist question, which has nothing to do with project effort." },
      { text: "They've lost confidence in their part of the project specifically and are struggling with it.", correct: false, note: "This only tries to explain the lateness, and doesn't connect to the therapist question or the reduced general responsiveness — it explains one detail, not the pattern." },
    ],
  },

  // --- Expert: single-select, deliberately mixed — "not enough information"
  // is correct in exactly half of these, never a safe default. ---
  {
    id: 'new-coworker-quiet-two-weeks',
    tier: 'expert',
    scenario: 'A new coworker has been quiet in team meetings for their first two weeks, speaking only when directly asked a question.',
    options: [
      { text: "They're not yet comfortable with the team, and that discomfort is showing as quietness.", correct: false, note: "Genuinely plausible, but with only two weeks and nothing else known about them, this isn't more supported than the alternatives — it's a guess, not a conclusion." },
      { text: "They're just a naturally quiet, reserved person.", correct: false, note: "Equally plausible to the options around it — nothing here favors this explanation over the others." },
      { text: "They're still learning enough context about the team's work to contribute confidently in meetings.", correct: false, note: 'Also reasonable, and also not distinguishable from the alternatives with what\'s given here.' },
      { text: "There isn't enough information yet to tell which of these actually fits.", correct: true, note: 'The honest answer: all three explanations above are genuinely plausible and none is favored by anything specific in this scenario. Picking one now would mean picking a guess and calling it a conclusion.' },
    ],
  },
  {
    id: 'friend-declines-then-follows-up',
    tier: 'expert',
    scenario: "You invited a friend to something and they said no, seeming distracted. Twenty minutes later, they texted back: \"Sorry, that came out short — today's just been a lot, can we do it another time? I do want to.\"",
    options: [
      { text: "There genuinely isn't enough information here to know how they actually feel about the invite, one way or another.", correct: false, note: 'This undersells what\'s actually here — they explicitly followed up, unprompted, to clarify and reaffirm interest. That\'s real, specific evidence, not an absence of it.' },
      { text: "They're just being polite and don't actually want to hang out, deep down.", correct: false, note: "This requires ignoring the unprompted follow-up message entirely — someone being merely polite doesn't typically circle back on their own to explain and reaffirm." },
      { text: 'The rough day shaped the first reply, and the follow-up is how they actually feel.', correct: true, note: 'They told you directly — "today\'s just been a lot" — and voluntarily followed up to clarify and reaffirm wanting to hang out. This is about as directly supported as an explanation gets: it\'s closest to just believing what they explicitly said.' },
      { text: "They're testing whether you'll reach out and make the effort again first.", correct: false, note: 'This invents a strategic motive with nothing pointing to it — the actual message given is a straightforward, unprompted clarification, not a game.' },
    ],
  },
  {
    id: 'text-read-no-reply-three-hours',
    tier: 'expert',
    scenario: "You sent someone a text three hours ago. It shows as read, and they haven't replied yet.",
    options: [
      { text: "They're deliberately choosing to ignore your message right now.", correct: false, note: "Plausible, but a single unanswered text after three hours is consistent with dozens of mundane explanations, and nothing here specifically points to deliberate avoidance." },
      { text: "They're simply busy right now and will reply once they get a chance.", correct: false, note: "Also plausible — but equally, nothing here specifically confirms this over the alternatives either." },
      { text: 'They saw it, meant to reply, and it genuinely slipped their mind afterward.', correct: false, note: 'Common and believable, but again just one of several equally-unconfirmed possibilities.' },
      { text: "There isn't enough here yet to know which explanation actually fits.", correct: true, note: 'A single data point this thin — three hours, one "read" receipt — doesn\'t distinguish between the explanations above. Treating any one of them as the answer would be more confident than the evidence allows.' },
    ],
  },
  {
    id: 'friend-cancels-but-always-follows-through',
    tier: 'expert',
    scenario: "A friend has cancelled on you three times this month. Each time, they've reached out within a day to apologize specifically, suggested a new date without you having to ask, and followed through on the rescheduled plan every time.",
    options: [
      { text: "There isn't enough information here to know if this is a real pattern or just one rough month.", correct: false, note: "There actually is a consistent pattern here across all three instances — the same follow-up behavior every time — which is more than 'not enough information,' it's a repeated, specific, confirmed pattern." },
      { text: "They're avoiding you but feel too guilty about it to just say so directly.", correct: false, note: "This doesn't fit the follow-through — someone avoiding you wouldn't reliably show up for every rescheduled plan." },
      { text: "Circumstances are genuinely making this a hard month, and the friendship is intact.", correct: true, note: 'The consistent pattern — the same real cancellation, the same unprompted specific apology, the same initiative to reschedule, the same follow-through every single time — points clearly to circumstances, not the relationship. If interest were the issue, the reliable follow-through wouldn\'t be there.' },
      { text: "They're being flaky in general and don't actually prioritize spending time with you.", correct: false, note: 'This doesn\'t account for the consistent, specific apology and 100% follow-through rate — someone being genuinely flaky wouldn\'t have a perfect record of actually showing up once rescheduled.' },
    ],
  },
];
