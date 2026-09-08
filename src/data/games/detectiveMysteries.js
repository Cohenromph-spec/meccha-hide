/**
 * Detective — logic-elimination mysteries, not scored prose.
 *
 * Fixed a fundamental bug in the first draft: clues described the culprit
 * ("whoever did it was still in the building after 6pm") but suspects were
 * shown as bare names with no facts about them — meaning there was no way
 * to actually connect a clue to a specific person. The puzzle was
 * internally consistent (a real, unique answer existed) but not solvable
 * by a human, since the information needed to reason it out was never
 * shown. Every suspect now carries a `fact` displayed alongside their
 * name, phrased so it plainly agrees or conflicts with each clue — the
 * player can cross-reference clue against fact and eliminate suspects
 * themselves, before ever picking an answer.
 *
 * Difficulty tiers (streak-gated, same idea as Pattern Logic's generator
 * pools): `easy` is the original 4-suspect/3-clue, one-clue-eliminates-
 * one-suspect format. `medium` is the same reasoning, just 5 suspects/4
 * clues — more to track, not a new reasoning type. `hard` introduces
 * compound clues (`eliminates` as an array): one clue with two conditions
 * that rules out everyone failing *either* part, so a single clue can
 * eliminate several suspects at once and the player has to check two
 * facts against it instead of one.
 *
 * Authoring rule (unchanged): the union of every eliminated suspect
 * (flattening array-eliminates clues) must be everyone except the
 * solution, with no suspect eliminated twice — verified mechanically, not
 * eyeballed (see the checker script this was tested against). The
 * eliminated suspect's `fact` must directly and plainly contradict the
 * clue that eliminates them, and the solution's fact must be consistent
 * with all of them — checked by hand, since "is this actually inferable"
 * isn't something a script can verify the way "is there a unique answer"
 * is.
 */

export const detectiveMysteries = [
  // ---- EASY: 4 suspects, 3 clues, one clue eliminates one suspect ----
  {
    id: 'fridge-open',
    tier: 'easy',
    scenario: 'The office break room fridge was left open all night and everything inside spoiled. Four people were still in the building when it happened.',
    suspects: [
      { name: 'Priya', fact: 'Skipped the kitchen entirely and went straight to the parking garage after her last meeting.' },
      { name: 'Marcus', fact: 'Left the office at 5:15pm to catch his train.' },
      { name: 'Sam', fact: 'Stayed at their desk finishing a report until after 6, wearing a blue windbreaker, and grabbed a granola bar from the kitchen on the way out.' },
      { name: 'Dana', fact: 'Wore a gray sweater all day — no jacket.' },
    ],
    clues: [
      { text: 'Whoever left it open was still in the building after 6pm.', eliminates: 'Marcus' },
      { text: 'They were wearing something blue that day.', eliminates: 'Dana' },
      { text: 'They stopped by the kitchen right before heading out.', eliminates: 'Priya' },
    ],
    solution: 'Sam',
  },
  {
    id: 'last-cookie',
    tier: 'easy',
    scenario: 'The last cookie from the shared jar in the break room disappeared sometime this afternoon. Four coworkers had access to the room.',
    suspects: [
      { name: 'Jordan', fact: 'Was at their desk with a notepad open, and wandered by the break room around 2:15 for a coffee refill.' },
      { name: 'Elena', fact: 'Keeps a spotless desk and takes all her notes on a laptop.' },
      { name: 'Theo', fact: 'Left for a dentist appointment at 1:45pm and never came back.' },
      { name: 'Kayla', fact: 'Was in a video call in the conference room from 2:00 to 2:30.' },
    ],
    clues: [
      { text: 'The cookie went missing after 2pm, when the jar was last seen full.', eliminates: 'Theo' },
      { text: 'Whoever took it was seen near the break room around 2:15.', eliminates: 'Kayla' },
      { text: "There's a chocolate smudge on the handwritten notepad at their desk.", eliminates: 'Elena' },
    ],
    solution: 'Jordan',
  },
  {
    id: 'club-room-mess',
    tier: 'easy',
    scenario: 'Someone left dirty dishes piled in the club room sink over the weekend. Four members had a key.',
    suspects: [
      { name: 'Nina', fact: 'Stopped by Saturday to grab a book, made tea in the club kettle, and left her denim jacket on a chair.' },
      { name: 'Beth', fact: 'Was visiting family out of town the entire weekend.' },
      { name: 'Cole', fact: "Never uses the club's kettle — always brings his own cold brew." },
      { name: 'Amir', fact: 'Wore gym clothes the whole weekend and never brought a jacket.' },
    ],
    clues: [
      { text: 'Whoever made the mess was in the building Saturday.', eliminates: 'Beth' },
      { text: "They used the club's electric kettle, which needed a refill after.", eliminates: 'Cole' },
      { text: 'A jacket left on a nearby chair matches what they wore that weekend.', eliminates: 'Amir' },
    ],
    solution: 'Nina',
  },
  {
    id: 'unfed-fish',
    tier: 'easy',
    scenario: 'The classroom fish was left unfed over a long weekend. Four students had signed up to take turns caring for it.',
    suspects: [
      { name: 'Marcus', fact: 'Was in town all weekend, still had the classroom key checked out under his name, and had signed up for this exact weekend — but lost track of the days.' },
      { name: 'Tessa', fact: 'Was away at a tournament the entire weekend, in a different city.' },
      { name: 'Yuki', fact: 'Returned the classroom key on Thursday, before the weekend even started.' },
      { name: 'Ravi', fact: 'Had accidentally signed up for the following weekend on the calendar, not this one.' },
    ],
    clues: [
      { text: 'Whoever forgot was in town for the entire weekend.', eliminates: 'Tessa' },
      { text: 'They still had the classroom key checked out under their name the whole time.', eliminates: 'Yuki' },
      { text: "They'd signed up for this exact weekend, not a different one.", eliminates: 'Ravi' },
    ],
    solution: 'Marcus',
  },
  {
    id: 'projector-left-on',
    tier: 'easy',
    scenario: 'A classroom projector was left running all weekend, and the bulb burned out. Four students had used the room Friday afternoon.',
    suspects: [
      { name: 'Priya', fact: "Was the last to leave, had borrowed the room's remote (it turned up in her bag Monday), and the room was booked under her name that day." },
      { name: 'Omar', fact: "Left the room right after his group's turn, well before the last group finished." },
      { name: 'Lena', fact: 'Never uses the remote — always runs the projector from the laptop menu.' },
      { name: 'Deshawn', fact: "Was just sitting in on someone else's booked presentation slot." },
    ],
    clues: [
      { text: 'Whoever left it on was the last one to use the room Friday.', eliminates: 'Omar' },
      { text: "They'd borrowed the room's remote, and it was found in their bag Monday.", eliminates: 'Lena' },
      { text: 'The room was booked under their name for a presentation that day.', eliminates: 'Deshawn' },
    ],
    solution: 'Priya',
  },
  {
    id: 'parking-spot',
    tier: 'easy',
    scenario: 'Someone parked in the reserved visitor spot all morning, and a real visitor had nowhere to park. Four employees drive the same model of gray car.',
    suspects: [
      { name: 'Sam', fact: 'Usually arrives around 8:30, still has a permit sticker from the building he transferred from, and has never had his own assigned spot here.' },
      { name: 'Grace', fact: 'Has a standing 9:30 start time and is never in before then.' },
      { name: 'Victor', fact: 'Only ever parks with this building\'s own permit sticker.' },
      { name: 'Hana', fact: 'Has her own assigned spot in the garage, which she uses every day.' },
    ],
    clues: [
      { text: 'The car was there before 9am, and this employee has a standing 9:30 start time.', eliminates: 'Grace' },
      { text: 'The car had a parking permit sticker from a different building.', eliminates: 'Victor' },
      { text: "Whoever parked there doesn't have their own assigned spot in the garage.", eliminates: 'Hana' },
    ],
    solution: 'Sam',
  },
  {
    id: 'group-workspace-mess',
    tier: 'easy',
    scenario: 'The shared group project table was left covered in markers and scrap paper after hours. Four teammates had used it that day.',
    suspects: [
      { name: 'Aisha', fact: 'Stayed at the table finishing her notes by hand well after everyone else had packed up and left.' },
      { name: 'Ben', fact: 'Packed up and left the table right when the group meeting officially ended, same as most others.' },
      { name: 'Ivy', fact: 'Types all her notes on a laptop and never writes by hand.' },
      { name: 'Noah', fact: 'Finished his section early and left the table well before the meeting wrapped up.' },
    ],
    clues: [
      { text: 'Whoever left the mess was still working at the table after everyone else packed up.', eliminates: 'Ben' },
      { text: 'The handwriting on the scrap notes matches theirs.', eliminates: 'Ivy' },
      { text: 'They finished up and left well before the mess was made.', eliminates: 'Noah' },
    ],
    solution: 'Aisha',
  },
  {
    id: 'missing-charger',
    tier: 'easy',
    scenario: 'The shared phone charger from the study room went missing. Four regulars use that room most days.',
    suspects: [
      { name: 'Carlos', fact: 'His phone was nearly dead all afternoon, he was the last one in the study room before closing, and a USB-C cable turned up in his bag the next day.' },
      { name: 'Ruth', fact: 'Her phone sat at a full charge the entire afternoon.' },
      { name: 'Maya', fact: 'Left the study room a full hour before it closed.' },
      { name: 'Diego', fact: "Uses a different charging cable entirely — his phone isn't even USB-C." },
    ],
    clues: [
      { text: "Whoever took it had a phone that badly needed charging that afternoon.", eliminates: 'Ruth' },
      { text: 'They were the last one seen in the study room before it closed.', eliminates: 'Maya' },
      { text: 'A charger cable matching the missing one was seen in their bag the next day.', eliminates: 'Diego' },
    ],
    solution: 'Carlos',
  },

  // ---- MEDIUM: 5 suspects, 4 clues, same one-clue-one-suspect logic — just more to track ----
  {
    id: 'broken-printer',
    tier: 'medium',
    scenario: 'The office printer jammed and a gear snapped after someone forced it shut wrong. Five people used it that morning.',
    suspects: [
      { name: 'Kian', fact: 'Printed his report in person that morning, and was seen wrestling with a paper jam around 10am, right before the printer stopped working.' },
      { name: 'Nadia', fact: 'Only ever prints from her phone via email — never touches the printer physically.' },
      { name: 'Ollie', fact: 'Was out sick that whole morning, working from home.' },
      { name: 'Priya', fact: 'Printed her documents the day before, not that morning.' },
      { name: 'Ren', fact: 'Used the other printer down the hall that morning — this one was occupied.' },
    ],
    clues: [
      { text: 'Whoever broke it was physically in the building that morning.', eliminates: 'Ollie' },
      { text: 'They printed something themselves, not through email.', eliminates: 'Nadia' },
      { text: 'It happened that morning, not the day before.', eliminates: 'Priya' },
      { text: 'They used this printer, not the one down the hall.', eliminates: 'Ren' },
    ],
    solution: 'Kian',
  },
  {
    id: 'empty-coffee-pot',
    tier: 'medium',
    scenario: 'The coffee pot was left empty with no new pot started, leaving everyone after without any. Five coworkers had coffee that morning.',
    suspects: [
      { name: 'Theo', fact: 'Was rushing to a 9am meeting and grabbed the truly last cup without a second thought.' },
      { name: 'Owen', fact: 'Brings his own coffee from home in a thermos and never touches the office pot.' },
      { name: 'Farah', fact: 'Was first in and started a fresh pot before having any herself.' },
      { name: 'Diego', fact: 'Only drinks tea, not coffee.' },
      { name: 'Lucia', fact: 'Poured the second-to-last cup, then started a new pot right after, out of habit.' },
    ],
    clues: [
      { text: "Whoever left it empty drank office coffee, not something they brought.", eliminates: 'Owen' },
      { text: "They didn't start the pot fresh that morning — someone else already had.", eliminates: 'Farah' },
      { text: 'They actually drink coffee, not tea.', eliminates: 'Diego' },
      { text: 'They took the truly last cup, not the second-to-last.', eliminates: 'Lucia' },
    ],
    solution: 'Theo',
  },
  {
    id: 'dried-out-marker',
    tier: 'medium',
    scenario: 'The good whiteboard marker was left uncapped after a meeting and dried out. Five people were in the room that day.',
    suspects: [
      { name: 'Priya', fact: 'Was still sketching a diagram on the board when the meeting ran long and everyone rushed out.' },
      { name: 'Bianca', fact: 'Only ever uses her own personal markers, never the shared ones.' },
      { name: 'Marcus', fact: 'Left before the meeting notes were even written on the board.' },
      { name: 'Elif', fact: 'Always caps markers immediately out of habit, a rule from her last job.' },
      { name: 'Jamal', fact: "Wasn't in that meeting at all — he was in a different room that hour." },
    ],
    clues: [
      { text: 'Whoever left it uncapped used the shared markers, not their own.', eliminates: 'Bianca' },
      { text: 'They were still using the board when everyone left in a hurry.', eliminates: 'Marcus' },
      { text: "They don't have a habit of capping markers automatically.", eliminates: 'Elif' },
      { text: 'They were actually in that meeting.', eliminates: 'Jamal' },
    ],
    solution: 'Priya',
  },
  {
    id: 'missing-stapler',
    tier: 'medium',
    scenario: 'The heavy-duty stapler went missing from the shared supply drawer. Five people had used the drawer that week.',
    suspects: [
      { name: 'Layla', fact: "Borrowed it Thursday for a big binding project, and it's still sitting on her desk." },
      { name: 'Simone', fact: 'Has her own stapler at her desk and never uses the shared one.' },
      { name: 'Andre', fact: 'Was out of the office all week on a business trip.' },
      { name: 'Keiko', fact: 'Only ever grabs paper clips from that drawer, never the stapler.' },
      { name: 'Owen', fact: 'Returned the stapler to the drawer himself on Tuesday after borrowing it Monday.' },
    ],
    clues: [
      { text: "Whoever has it doesn't already have their own stapler.", eliminates: 'Simone' },
      { text: 'They were actually in the office this week.', eliminates: 'Andre' },
      { text: 'They took the stapler specifically, not something else from the drawer.', eliminates: 'Keiko' },
      { text: 'They still have it — it was never returned.', eliminates: 'Owen' },
    ],
    solution: 'Layla',
  },

  // ---- HARD: 6 suspects, 5 clues, compound clues (eliminates: array) that
  // rule out everyone failing either half of a two-part condition ----
  {
    id: 'coffee-spill',
    tier: 'hard',
    scenario: 'Coffee was spilled across a stack of shared documents in the main office, ruining them. Six people were around that area on a busy Friday afternoon.',
    suspects: [
      { name: 'Marco', fact: 'Was carrying coffee, stopped right at the table to chat, and set his cup down on top of the stack for a few minutes.' },
      { name: 'Hassan', fact: 'Was at the far end of the building on a client call the entire afternoon.' },
      { name: 'Priya', fact: "Doesn't drink coffee — allergic to caffeine." },
      { name: 'Wen', fact: 'Was carrying a coffee, but stayed at his own desk the whole time, nowhere near the documents.' },
      { name: 'Sofia', fact: 'Was near the documents around 2pm, but was drinking water, not coffee.' },
      { name: 'Elena', fact: 'Was carrying coffee and walked near the documents around 2pm, but kept her cup in hand the entire time and never set it down.' },
    ],
    clues: [
      {
        text: 'Whoever spilled it was carrying coffee that afternoon, and was near the documents around 2pm.',
        eliminates: ['Hassan', 'Priya', 'Wen', 'Sofia'],
      },
      { text: 'They set their cup down on the table, right next to the documents.', eliminates: 'Elena' },
    ],
    solution: 'Marco',
  },
  {
    id: 'unplugged-heater',
    tier: 'hard',
    scenario: 'The shared space heater in the corner got unplugged, and now that whole side of the office is freezing. Six people work near that corner.',
    suspects: [
      { name: 'Miguel', fact: 'Sits right by the outlet, was cold all afternoon, and skipped the 3pm meeting to keep working — right when the heater went out.' },
      { name: 'Yara', fact: 'Sits on the far side of the room, well out of reach of that outlet.' },
      { name: 'Sam', fact: 'Sits in a different section, several rows away from that outlet.' },
      { name: 'Tobin', fact: 'Keeps a space blanket at his desk and insists he\'s never cold.' },
      { name: 'Priti', fact: 'Runs warm and always complains the office is too hot, never cold.' },
      { name: 'Dana', fact: 'Was cold and sits right by the outlet, but was in the 3pm meeting down the hall the whole time.' },
    ],
    clues: [
      {
        text: 'Whoever unplugged it was cold that day, and sits within reach of that outlet.',
        eliminates: ['Yara', 'Sam', 'Tobin', 'Priti'],
      },
      { text: 'It happened around 3pm, right when the afternoon meeting started.', eliminates: 'Dana' },
    ],
    solution: 'Miguel',
  },
];
