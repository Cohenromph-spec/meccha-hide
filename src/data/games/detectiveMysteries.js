/**
 * Detective — logic-elimination mysteries, not scored prose.
 *
 * Learned from Human Behavior (three rounds of bugs: position, wording
 * tone, text length) that hand-authored "correct vs. incorrect" prose is
 * an easy place to smuggle in an accidental tell. Detective sidesteps
 * that entirely: each clue eliminates specific suspects via explicit
 * data (`eliminates`), not by how the clue happens to be worded, and the
 * solution is whichever suspect no clue eliminates — a mechanically
 * checkable invariant (see the verifier script this was tested against),
 * the same class of guarantee Pattern Logic's math has.
 *
 * Authoring rule: every clue eliminates exactly one suspect, no overlaps,
 * and the union of all eliminated suspects must be every suspect except
 * the solution. Suspect names are the only prose the player chooses
 * between, so there's no length/tone surface to exploit.
 */

export const detectiveMysteries = [
  {
    id: 'fridge-open',
    scenario: 'The office break room fridge was left open all night and everything inside spoiled. Four people were still in the building when it happened.',
    suspects: ['Priya', 'Marcus', 'Sam', 'Dana'],
    clues: [
      { text: 'Whoever left it open was still in the building after 6pm.', eliminates: 'Marcus' },
      { text: 'Security footage shows they were wearing a blue jacket that day.', eliminates: 'Dana' },
      { text: 'They grabbed something from the fridge right before heading out.', eliminates: 'Priya' },
    ],
    solution: 'Sam',
  },
  {
    id: 'last-cookie',
    scenario: 'The last cookie from the shared jar in the break room disappeared sometime this afternoon. Four coworkers had access to the room.',
    suspects: ['Jordan', 'Elena', 'Theo', 'Kayla'],
    clues: [
      { text: 'The cookie went missing after 2pm, when the jar was last seen full.', eliminates: 'Theo' },
      { text: 'Whoever took it was seen near the break room at 2:15.', eliminates: 'Kayla' },
      { text: "There's a chocolate smudge on the notepad at their desk.", eliminates: 'Elena' },
    ],
    solution: 'Jordan',
  },
  {
    id: 'club-room-mess',
    scenario: 'Someone left dirty dishes piled in the club room sink over the weekend. Four members had a key.',
    suspects: ['Amir', 'Beth', 'Cole', 'Nina'],
    clues: [
      { text: 'The mess appeared Saturday, and whoever made it was in the building that day.', eliminates: 'Beth' },
      { text: "They used the club's electric kettle, which needed a refill after.", eliminates: 'Cole' },
      { text: 'A jacket left on the chair nearby matches what they wore that weekend.', eliminates: 'Amir' },
    ],
    solution: 'Nina',
  },
  {
    id: 'unfed-fish',
    scenario: 'The classroom fish was left unfed over a long weekend. Four students had signed up to take turns caring for it.',
    suspects: ['Ravi', 'Tessa', 'Marcus', 'Yuki'],
    clues: [
      { text: 'The feeding was scheduled for Sunday, and this student was traveling out of town that day.', eliminates: 'Tessa' },
      { text: "Whoever forgot still had the classroom key checked out under their name.", eliminates: 'Yuki' },
      { text: "They'd signed up for a different weekend on the calendar by mistake.", eliminates: 'Ravi' },
    ],
    solution: 'Marcus',
  },
  {
    id: 'projector-left-on',
    scenario: 'A classroom projector was left running all weekend, and the bulb burned out. Four students had used the room Friday afternoon.',
    suspects: ['Lena', 'Omar', 'Priya', 'Deshawn'],
    clues: [
      { text: 'Whoever left it on was the last one to use the room Friday.', eliminates: 'Omar' },
      { text: "They'd borrowed the room's remote and it was found in their bag Monday.", eliminates: 'Lena' },
      { text: 'The room was booked under their name for a presentation that day.', eliminates: 'Deshawn' },
    ],
    solution: 'Priya',
  },
  {
    id: 'parking-spot',
    scenario: 'Someone parked in the reserved visitor spot all morning, and a real visitor had nowhere to park. Four employees drive the same model of gray car.',
    suspects: ['Hana', 'Victor', 'Grace', 'Sam'],
    clues: [
      { text: 'The car was there before 9am, and this employee has a standing 9:30 start time.', eliminates: 'Grace' },
      { text: 'The car had a parking permit sticker from a different building.', eliminates: 'Victor' },
      { text: "This employee's own assigned spot was empty all morning, so they weren't the one who used it.", eliminates: 'Hana' },
    ],
    solution: 'Sam',
  },
  {
    id: 'group-workspace-mess',
    scenario: 'The shared group project table was left covered in markers and scrap paper after hours. Four teammates had used it that day.',
    suspects: ['Noah', 'Aisha', 'Ben', 'Ivy'],
    clues: [
      { text: 'Whoever left the mess was still working at the table after everyone else packed up.', eliminates: 'Ben' },
      { text: 'The handwriting on the scrap notes matches theirs.', eliminates: 'Ivy' },
      { text: 'They mentioned finishing their part early and leaving before the mess was made.', eliminates: 'Noah' },
    ],
    solution: 'Aisha',
  },
  {
    id: 'missing-charger',
    scenario: 'The shared phone charger from the study room went missing. Four regulars use that room most days.',
    suspects: ['Diego', 'Maya', 'Carlos', 'Ruth'],
    clues: [
      { text: "Whoever took it needed a charger that day — their own phone was seen at full battery all afternoon.", eliminates: 'Ruth' },
      { text: 'They were the last one seen in the study room before it closed.', eliminates: 'Maya' },
      { text: 'A charger cable matching the missing one was seen in their bag the next day.', eliminates: 'Diego' },
    ],
    solution: 'Carlos',
  },
];
