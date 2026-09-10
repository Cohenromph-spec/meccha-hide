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
      { name: 'Priya', fact: 'Skipped the kitchen entirely after her last meeting and went straight to the parking garage, hoping to beat the evening traffic before her carpool left without her.' },
      { name: 'Marcus', fact: 'Left the office right at 5:15pm to catch his usual train home, the same one he takes every single weekday without fail, rain or shine.' },
      { name: 'Sam', fact: 'Stayed at their desk until after 6, wearing a blue windbreaker, and grabbed a granola bar from the kitchen on the way out.' },
      { name: 'Dana', fact: 'Wore a plain gray sweater the entire day, no jacket at all, even though the office was running noticeably cold that afternoon.' },
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
      { name: 'Jordan', fact: 'Was at their desk with a notepad open all afternoon, and wandered by the break room around 2:15 for a coffee refill.' },
      { name: 'Elena', fact: 'Keeps an unusually spotless desk year-round and takes every single note on her laptop, never once on paper at all, by choice.' },
      { name: 'Theo', fact: "Left for a dentist appointment at 1:45pm and never came back to the office at all that day, texting the team he'd finish up remotely tomorrow." },
      { name: 'Kayla', fact: 'Was in a video call in the conference room from 2:00 to 2:30 that afternoon, camera on and visible the whole time.' },
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
      { name: 'Nina', fact: 'Stopped by Saturday to grab a book, made tea in the club kettle, and left her jacket on a chair.' },
      { name: 'Beth', fact: 'Was visiting family several hours out of town for the entire weekend, and only got back into town Monday morning.' },
      { name: 'Cole', fact: "Never uses the club's electric kettle at all — always brings his own bottled cold brew from home instead." },
      { name: 'Amir', fact: "Wore gym clothes the entire weekend for a fitness challenge he'd signed up for months ago, and never once brought along a jacket." },
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
      { name: 'Marcus', fact: 'Was in town all weekend, still had the classroom key checked out under his name, and had signed up for this exact weekend.' },
      { name: 'Tessa', fact: 'Was away competing at an out-of-state tournament the entire weekend, in a different city.' },
      { name: 'Yuki', fact: 'Returned the classroom key to the front office on Thursday afternoon, well before the weekend even started, since she had a family trip planned.' },
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
      { name: 'Priya', fact: "Was the last to leave, had borrowed the room's remote, and the room was booked under her name that day." },
      { name: 'Omar', fact: "Left the room right after his group's presentation wrapped up, well before the very last group had even started theirs." },
      { name: 'Lena', fact: 'Never uses the physical remote at all — always runs the projector directly from the laptop\'s on-screen menu.' },
      { name: 'Deshawn', fact: "Was just sitting quietly in on someone else's booked presentation slot as an audience member that day, taking notes." },
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
      { name: 'Sam', fact: 'Usually arrives around 8:30, still has a permit sticker from his old building, and has no assigned spot here.' },
      { name: 'Grace', fact: 'Has a standing 9:30 start time every single day and is never in before then.' },
      { name: 'Victor', fact: "Only ever parks using this specific building's own official permit sticker, never anything from anywhere else." },
      { name: 'Hana', fact: 'Has her own assigned spot in the parking garage, and uses it religiously every single day without fail, rain or shine.' },
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
      { name: 'Aisha', fact: 'Stayed at the table finishing her notes by hand well after everyone else had already packed up and left for the day.' },
      { name: 'Ben', fact: 'Packed up and left the table right when the group meeting officially ended that day, same as most of the others there.' },
      { name: 'Ivy', fact: 'Types every single one of her notes on a laptop, and has never once written anything by hand in this particular class.' },
      { name: 'Noah', fact: 'Finished his section early and left the table well before the meeting had even wrapped up.' },
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
      { name: 'Carlos', fact: 'His phone was nearly dead all afternoon, and he was the last one in the study room before it closed.' },
      { name: 'Ruth', fact: 'Her phone sat at a full, untouched charge the entire afternoon, never once needing to plug in anywhere.' },
      { name: 'Maya', fact: 'Left the study room a full hour before it closed for the night, according to the front-desk sign-out sheet.' },
      { name: 'Diego', fact: "Uses a completely different charging cable altogether — his phone isn't even a USB-C model to begin with." },
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
      { name: 'Kian', fact: 'Printed his report in person that morning, and was seen wrestling with a paper jam right before it stopped working.' },
      { name: 'Nadia', fact: 'Only ever prints from her phone by emailing documents in ahead of time — she never physically touches the printer at all.' },
      { name: 'Ollie', fact: 'Was out sick that whole morning, working from home under the weather the entire time.' },
      { name: 'Priya', fact: 'Printed all of her documents the day before this happened, not that morning at all.' },
      { name: 'Ren', fact: 'Used the other printer down the hall that morning, since this one was already occupied when she needed it.' },
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
      { name: 'Theo', fact: 'Was rushing to a 9am meeting and grabbed the last cup without a second thought.' },
      { name: 'Owen', fact: 'Brings his own coffee from home in a thermos every day and never touches the office pot at all.' },
      { name: 'Farah', fact: 'Was first in that morning and started a completely fresh pot before pouring any for herself.' },
      { name: 'Diego', fact: 'Only drinks tea, not coffee — never touches the office pot at all, morning or otherwise.' },
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
      { name: 'Priya', fact: 'Was still sketching a diagram on the board when the meeting ran long.' },
      { name: 'Bianca', fact: 'Only ever uses her own personal set of markers, and never touches the shared ones in the drawer.' },
      { name: 'Marcus', fact: 'Left the room well before the meeting notes were even written up on the board at all.' },
      { name: 'Elif', fact: 'Always caps markers immediately out of habit, a rule carried over from her last job that stuck.' },
      { name: 'Jamal', fact: "Wasn't in that meeting at all — he was in a completely different room during that entire hour." },
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
      { name: 'Simone', fact: 'Has her own heavy-duty stapler already at her desk and never touches the shared one in the drawer.' },
      { name: 'Andre', fact: 'Was out of the office the entire week on a business trip, nowhere near the supply drawer.' },
      { name: 'Keiko', fact: 'Only ever grabs paper clips from that particular drawer, never the stapler at all.' },
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
      { name: 'Wen', fact: 'Was carrying a coffee that whole afternoon, but stayed put at his own desk the entire time, nowhere near the shared documents.' },
      { name: 'Sofia', fact: 'Was near the documents around 2pm, but was drinking water, not coffee.' },
      { name: 'Elena', fact: 'Was carrying coffee near the documents around 2pm, but kept her cup firmly in hand the entire time and never once set it down anywhere.' },
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
      { name: 'Miguel', fact: 'Sits right by the outlet, was cold all afternoon, and skipped the 3pm meeting to keep working.' },
      { name: 'Yara', fact: 'Sits on the far side of the room entirely, well out of reach of that particular outlet at all times.' },
      { name: 'Sam', fact: 'Sits in a completely different section of the office entirely, several rows away from anywhere near that outlet.' },
      { name: 'Tobin', fact: "Keeps a space blanket at his desk year-round and insists he's genuinely never cold." },
      { name: 'Priti', fact: 'Runs warm and constantly complains the office is too hot, never once that it\'s cold.' },
      { name: 'Dana', fact: 'Was cold and sits right by the outlet, but was in the 3pm meeting down the hall the entire time it ran.' },
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

  // ============================================================
  // DEEPER TIER LADDER — same reasoning-depth redesign as the other
  // three games. The interaction mechanic doesn't change (still: read
  // every suspect's fact against every clue, pick who's never
  // eliminated) — the reasoning gets deeper through content, not a new
  // mechanic:
  //
  // 'connection' — 6 suspects, clues written so at least one requires
  // reading a suspect's fact closely rather than keyword-matching (e.g.
  // "badged into the building" vs. "badged into the server room itself"
  // — surface-similar, logically different).
  //
  // 'integration' — 6 suspects, clues built around a timeline: an
  // explicit time cutoff has to be checked against each suspect's own
  // stated time, not just a single fact/clue pairing.
  //
  // 'expert' — 7 suspects, 5-6 clues, combining compound eliminations
  // with genuinely plausible-looking suspects (someone who ran *a*
  // migration, someone who *was* in the approval meeting) that still
  // resolve to a single unique answer once every clue is checked.
  //
  // Same authoring rule as before, checked mechanically: the union of
  // every eliminated suspect must be everyone except the solution, with
  // no suspect eliminated twice.
  // ============================================================

  // ---- CONNECTION: 6 suspects, at least one clue per mystery rewards
  // reading a suspect's fact closely instead of keyword-matching ----
  {
    id: 'server-room-left-unlocked',
    tier: 'connection',
    scenario: 'The server room door was found propped open overnight, against policy. Six people had badge access that week.',
    suspects: [
      { name: 'Priya', fact: 'Was the last one badged into the server room Thursday night, and left her badge on her desk the next morning.' },
      { name: 'Owen', fact: 'Only ever accesses the server room in the mornings, never after 6pm.' },
      { name: 'Faye', fact: 'Was badged into the building Thursday night, but her badge logs show she never actually entered the server room itself.' },
      { name: 'Marcus', fact: 'Was on vacation all week, badge deactivated.' },
      { name: 'Lena', fact: 'Uses a physical office key for the server room, not a badge — the room has both entry methods.' },
      { name: 'Theo', fact: 'Badged into the server room Thursday night for a routine check, then badged back out twenty minutes later, well before anyone found it propped open the next day.' },
    ],
    clues: [
      { text: 'Whoever left it open badged in after 6pm that night.', eliminates: 'Owen' },
      { text: 'They were actually in the building and had active badge access that week.', eliminates: 'Marcus' },
      { text: 'They badged into the server room itself that night, not just the building.', eliminates: 'Faye' },
      { text: 'Whoever propped it open used a badge to get in, not a physical key.', eliminates: 'Lena' },
      { text: 'The room was still propped open well after their badge-out time, not shortly after a quick routine check.', eliminates: 'Theo' },
    ],
    solution: 'Priya',
  },
  {
    id: 'meeting-room-projector-bulb',
    tier: 'connection',
    scenario: "A conference room's projector bulb burned out after being left running with no signal overnight. Six employees had booked that room this week.",
    suspects: [
      { name: 'Dana', fact: 'Had the room booked for a 5pm presentation Thursday, and was the last one to leave that evening.' },
      { name: 'Kwame', fact: 'Presented at 10am Thursday, well before the incident happened, and always powers down the projector via the wall switch out of habit.' },
      { name: 'Ines', fact: 'Was out sick Thursday, working from home.' },
      { name: 'Oscar', fact: 'Booked the room Friday morning, after the bulb had already burned out.' },
      { name: 'Priya', fact: "Never used the projector — her Thursday meeting was a phone-only call." },
      { name: 'Tariq', fact: 'Booked the room Wednesday for a workshop, an unrelated week.' },
    ],
    clues: [
      { text: 'Whoever left it on was in the room on Thursday specifically.', eliminates: 'Tariq' },
      { text: "It was still working when they used the room — the bulb hadn't burned out yet for their booking.", eliminates: 'Oscar' },
      { text: 'They actually used the projector screen during their time in the room.', eliminates: 'Priya' },
      { text: "They didn't power the projector off before leaving.", eliminates: 'Kwame' },
      { text: 'They were physically in the building that day, not working from home.', eliminates: 'Ines' },
    ],
    solution: 'Dana',
  },
  {
    id: 'shared-drive-folder-deleted',
    tier: 'connection',
    scenario: 'An important shared folder was accidentally deleted from the team drive Tuesday afternoon. Six people had edit access.',
    suspects: [
      { name: 'Marisol', fact: 'Was reorganizing folders that exact afternoon, cleaning up an old project structure, and admits she was moving a lot of things around.' },
      { name: 'Deon', fact: "Only has view access to that drive, not edit access — he can't delete anything there at all." },
      { name: 'Wren', fact: 'Was in back-to-back meetings all Tuesday afternoon, verified by her calendar, with zero drive activity logged.' },
      { name: 'Alistair', fact: 'Was at a client site Tuesday afternoon, fully offsite the entire time — his badge shows no return to the office at all until Wednesday morning.' },
      { name: 'Priti', fact: 'Last touched that shared drive the previous Friday, nothing since.' },
      { name: 'Cole', fact: 'Was actively editing a completely different folder on a different drive all Tuesday afternoon.' },
    ],
    clues: [
      { text: 'Whoever deleted it had edit access to that drive.', eliminates: 'Deon' },
      { text: 'It happened Tuesday afternoon — they were active on the drive at that time.', eliminates: ['Wren', 'Priti'] },
      { text: 'They were working within this specific drive that afternoon, not a different one.', eliminates: 'Cole' },
      { text: 'They were on the office network that afternoon, not offsite.', eliminates: 'Alistair' },
    ],
    solution: 'Marisol',
  },

  // ---- INTEGRATION: 6 suspects, clues built around comparing every
  // suspect's own stated time against an explicit cutoff ----
  {
    id: 'office-plant-knocked-over',
    tier: 'integration',
    scenario: 'The large plant by the office entrance was knocked over and the pot cracked sometime Wednesday morning. Six employees were in and out of the entrance that morning.',
    suspects: [
      { name: 'Yusuf', fact: 'Arrived at 7:45am, first one in that morning, went straight to his desk and stayed there without moving until 10am.' },
      { name: 'Camille', fact: 'Arrived at 8:50am, walked past the entrance carrying a large stack of boxes for a delivery.' },
      { name: 'Diego', fact: 'Arrived at 8:15am, came in through the back entrance, never near the front.' },
      { name: 'Priya', fact: 'Arrived at 9:30am, walked in through the front entrance completely normally, empty-handed the entire way.' },
      { name: 'Beatrix', fact: 'Arrived at 8:05am, but went directly into a phone booth for a call until 9am, away from the entrance the whole time.' },
      { name: 'Marco', fact: 'Arrived at 9:10am, propped the front door open for a delivery.' },
    ],
    clues: [
      { text: 'Whoever did it arrived before 9:00am — it happened before the delivery rush started.', eliminates: ['Priya', 'Marco'] },
      { text: 'They were near the front entrance at some point that morning, not the back.', eliminates: 'Diego' },
      { text: 'They weren\'t tied up on a phone call away from the entrance the whole relevant window.', eliminates: 'Beatrix' },
      { text: "They didn't stay at their desk the entire morning.", eliminates: 'Yusuf' },
    ],
    solution: 'Camille',
  },
  {
    id: 'conference-line-left-open',
    tier: 'integration',
    scenario: 'A conference call was accidentally left connected for two extra hours after the meeting ended at 2pm, racking up charges. Six people had dialed into that call.',
    suspects: [
      { name: 'Hana', fact: 'Dialed in at 1:55pm from her desk phone, and her phone log shows the line was still connected at 4:00pm.' },
      { name: 'Oren', fact: 'Dialed in at 2:00pm sharp from his cell, and hung up the moment the meeting ended — his call log confirms a 2:00–2:01pm call.' },
      { name: 'Bianca', fact: "Joined at 1:50pm but her connection dropped at 2:10pm due to a dead cell battery, confirmed by her carrier." },
      { name: 'Felix', fact: 'Was traveling that day and never actually dialed into this particular call.' },
      { name: 'Priya', fact: 'Joined at 1:58pm from a conference room phone, and left the room at 2:05pm, but never actually hung up the receiver — just walked out.' },
      { name: 'Tomas', fact: 'Joined right at 2pm and hung up within two minutes, same as Oren, confirmed by his own phone log.' },
    ],
    clues: [
      { text: 'Whoever left it connected was actually on the call that day.', eliminates: 'Felix' },
      { text: 'Their line was still connected well after 2:05pm.', eliminates: ['Oren', 'Tomas'] },
      { text: "Their own device logged the disconnect — this one wasn't a dropped signal.", eliminates: 'Bianca' },
      { text: 'The extra connected time was traced to a desk phone line, not a conference room line.', eliminates: 'Priya' },
    ],
    solution: 'Hana',
  },
  {
    id: 'delivery-signed-for-twice',
    tier: 'integration',
    scenario: "A package delivery was signed for at the front desk at 11:15am — but the same package had already been signed for and picked up by someone at 10:40am, meaning the 11:15am \"delivery\" was actually a scam re-delivery attempt that got waved through. Six people were near the front desk between 10:30 and 11:30am.",
    suspects: [
      { name: 'Greta', fact: 'Was at the front desk from 10:30 to 10:50am covering for the regular receptionist, then went to lunch until 11:40am.' },
      { name: 'Idris', fact: 'Arrived at the front desk at 11:10am to cover it, and was the one who signed for the 11:15am delivery.' },
      { name: 'Sana', fact: 'Was on a call in her office the entire window, 10:30 to 11:30am, per her call log.' },
      { name: 'Rohan', fact: 'Covered the desk from 10:50 to 11:10am, handed it off to Idris right at 11:10am, then left the building.' },
      { name: 'Miki', fact: 'Signed for and picked up the first, legitimate delivery at 10:40am, then went straight back to her own desk.' },
      { name: 'Wendell', fact: 'Was out of the building the entire morning at an offsite meeting.' },
    ],
    clues: [
      { text: 'Whoever waved through the second, fake delivery was covering the front desk at 11:15am specifically.', eliminates: ['Greta', 'Rohan'] },
      { text: 'They were physically in the building that morning.', eliminates: 'Wendell' },
      { text: "They weren't the one tied up on a call the whole window, away from the desk.", eliminates: 'Sana' },
      { text: 'This is about who accepted the second delivery — not who received the first, legitimate one.', eliminates: 'Miki' },
    ],
    solution: 'Idris',
  },

  // ---- EXPERT: 7 suspects, 5-6 clues, several genuinely plausible-
  // looking suspects (someone who ran *a* migration, someone who *was*
  // in the approval meeting) that only resolve once every clue is
  // checked against every fact ----
  {
    id: 'server-migration-broke-prod',
    tier: 'expert',
    scenario: 'A production database migration was run without the required approval, breaking the checkout flow for two hours Tuesday afternoon. Seven engineers had deploy access that day.',
    suspects: [
      { name: 'Naledi', fact: 'Deployed a completely unrelated frontend fix at 1:30pm Tuesday, confirmed by the deploy log — no database changes.' },
      { name: 'Quinn', fact: 'Ran a migration script at 2:45pm Tuesday, but it was the separately approved billing migration, not the checkout one — the approval ticket for that one is on file.' },
      { name: 'Baz', fact: 'Was out sick Tuesday, no laptop access at all that day.' },
      { name: 'Ilana', fact: 'Ran the checkout database migration at 2:50pm Tuesday, and says she thought approval had come through in a Slack message the night before.' },
      { name: 'Devon', fact: 'Only has read access to the production database, not deploy access — a permissions error blocks any deploy attempt.' },
      { name: 'Priti', fact: 'Was in the approval meeting for the checkout migration Tuesday morning, and voted to delay it until Wednesday.' },
      { name: 'Colm', fact: "Deployed the checkout migration's rollback at 4:50pm Tuesday, restoring service — the fix, not the break." },
    ],
    clues: [
      { text: 'Whoever broke it ran the checkout migration specifically, not a different one.', eliminates: ['Naledi', 'Quinn'] },
      { text: 'They were actually working that day, not out sick.', eliminates: 'Baz' },
      { text: 'They had deploy access, not just read access.', eliminates: 'Devon' },
      { text: 'Their deploy happened at the start of the outage, not the moment it was fixed.', eliminates: 'Colm' },
      { text: 'They personally executed a deploy that day — this is not about who sat in on the approval meeting.', eliminates: 'Priti' },
    ],
    solution: 'Ilana',
  },
  {
    id: 'influencer-post-leaked-early',
    tier: 'expert',
    scenario: 'A sponsored social post was accidentally published six hours before its scheduled embargo time, breaking a partner agreement. Seven team members had access to the scheduling tool that week.',
    suspects: [
      { name: 'Sable', fact: "Edited the post's caption Monday morning, two days before the scheduled time — well before the embargo mattered." },
      { name: 'Junot', fact: 'Has scheduling-tool access but was on parental leave the entire week, account inactive.' },
      { name: 'Reyna', fact: "Opened the post in the scheduling tool at the exact minute it went live, and admits she clicked \"Publish Now\" instead of \"Save Draft\" by mistake." },
      { name: 'Tobias', fact: "Reviewed the post for legal compliance on Tuesday and left several comments, but the tool's review mode has no publish button in it at all." },
      { name: 'Camae', fact: 'Rescheduled a completely different, unrelated post that same morning — different post ID, different campaign.' },
      { name: 'Yui', fact: 'Was the one who originally set the embargo time correctly three weeks ago, and had not opened that post since.' },
      { name: 'Priom', fact: "Was testing the scheduling tool's brand-new interface in an isolated sandbox environment all morning — changes made there never touch real, live posts." },
    ],
    clues: [
      { text: 'Whoever published it early was active in the tool at the exact time it went live.', eliminates: ['Junot', 'Yui'] },
      { text: "They were working in the live tool, not a testing sandbox that doesn't touch real posts.", eliminates: 'Priom' },
      { text: 'They were editing or acting on this specific post, not a different one.', eliminates: 'Camae' },
      { text: "The early publish came from clicking something in the tool's interface, not from a caption edit made two days earlier that had no effect on scheduling.", eliminates: 'Sable' },
      { text: 'They only had review and comment access, not the ability to actually publish anything themselves.', eliminates: 'Tobias' },
    ],
    solution: 'Reyna',
  },
  {
    id: 'wrong-invoice-sent-to-client',
    tier: 'expert',
    scenario: "A client was accidentally emailed another client's confidential invoice — caught only when the client called to ask about charges that weren't theirs. Seven people had access to the invoicing system that week.",
    suspects: [
      { name: 'Farid', fact: 'Generated an invoice PDF for that other client (the one whose invoice leaked) on Monday, for his own recordkeeping — never sent anything by email.' },
      { name: 'Otilia', fact: 'Sent an email to the affected client Wednesday afternoon with an attachment — but it was a scheduling email with a calendar invite, not an invoice.' },
      { name: 'Beck', fact: 'Sent the mix-up email Wednesday afternoon, and admits he had two client folders open side-by-side and grabbed the wrong PDF attachment.' },
      { name: 'Ngozi', fact: 'Has invoicing system access but was on a plane, fully offline, all day Wednesday.' },
      { name: 'Priya', fact: "Sent the correct invoice to the affected client the following day, Thursday, to fix the mistake." },
      { name: 'Hollis', fact: 'Only has permission to view invoices in the system, not to attach or send them by email.' },
      { name: 'Delphine', fact: "Was the one who originally uploaded the other client's invoice into the system weeks ago — routine, unrelated to this week's mix-up." },
    ],
    clues: [
      { text: 'Whoever sent the mix-up email actually sent something, not just generated a file for their own use.', eliminates: 'Farid' },
      { text: 'It was an invoice attachment, not a calendar invite.', eliminates: 'Otilia' },
      { text: 'They were actually online and working Wednesday, not on a plane.', eliminates: 'Ngozi' },
      { text: "They sent the wrong invoice that day, not the corrected one, and not the day after.", eliminates: 'Priya' },
      { text: 'They had permission to attach and send invoices by email, not just view them.', eliminates: 'Hollis' },
      { text: 'This is about who sent the email this week, not who originally uploaded that invoice weeks ago.', eliminates: 'Delphine' },
    ],
    solution: 'Beck',
  },
];
