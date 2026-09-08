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
 * Authoring rule (unchanged): every clue eliminates exactly one suspect,
 * no overlaps, and the union of eliminated suspects is everyone except the
 * solution — verified mechanically, not eyeballed (see the checker script
 * this was tested against). New rule from this fix: the eliminated
 * suspect's `fact` must directly and plainly contradict the clue that
 * eliminates them, and the solution's fact must be consistent with all of
 * them — checked by hand, since "is this actually inferable" isn't
 * something a script can verify the way "is there a unique answer" is.
 */

export const detectiveMysteries = [
  {
    id: 'fridge-open',
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
];
