# Dragonvale year plan (dev notes — NOT shown in game)

Premise: Jade and Devon spend about a year in Dragonvale. Publicly they are Princess Jade and Prince Devon; secretly they protect ordinary people in disguise (working aliases: Crimson Phoenix / Silent Dragon, tone TBD). Devon chooses this because he grew up away from court and understands ordinary people.

## Greyson missions (3-4 over the year, not constant summons)
1. After Marriage — "The Dragonvale Investigation" (bracelet call; the running joke that he may be psychic). Built: m_empress (53), m_erased (62).
2. Demon / spirit disturbances — border creatures, villages losing contact, ruins waking. Devon: royal magic / lore. Jade: combat / leadership.
3. Black Pearl / Dima lore — temples, forgotten shrines, Black Pearl records. Reveal Dima, Xima, Gold Child gradually.
4. Before returning to Tribute — "one matter only you can resolve" (Roc's exile, demons, succession).

## Masked contracts (vigilante side quests) — board "Masked Contracts" in Dragonvale from ch62
- The Corrupt Magistrate (built: q_vig_magistrate). Devon: "Justice without proof becomes revenge."
- The Missing Children (built: q_vig_children). A noble trafficking people, not demons; personal for Jade.
- The Healing Pavilion Crisis (todo): unknown village illness, Jenika joins, Sky helps.
- The Old Warrior (todo): recognises Devon's sword style — "You fight like the late empress's guard." Hint of Devon's past.
Couple development is through teamwork, not romance scenes ("You always plan everything." / "Because you always rush into danger.").

## Year shape
- Months 1-3: marriage adjustment, Levi investigation, royal politics, Roc's problems
- Months 4-6: vigilante quests, demon disturbances, Jenika/Sky, Altan arrival
- Months 7-9: Roc's marriage and decline, dark magic investigation
- Months 10-12: Roc's exile, Devon succession talk, final Dragonvale mission, return to Tribute

Jade returns as Princess of Tribute and of Dragonvale, wife of a respected prince, and a hero among civilians.

## Roc (Chad) arc and Seraphina (author's structure)
- Ch 62-70: Roc gains dark-magic powers. Built: `chad_dark_arts` at ch63 (Dark Flame, Shadow Surge), `chad_dark_deep` at ch67 (Void Brand). Placement within 63-69 is provisional.
- Ch 70-72: dark-magic backlash permanently alters his stats (flags chad_backlash_1/2/3 at 70/71/72; multipliers in `BACKLASH`, core.js): HP and DEF down, MAG up, then SPD down, then ATK up. Numbers are drafts.
- Ch 73: Roc leaves the party permanently (CH_LEAVE). Seraphina Altan joins the same chapter as the primary physical DPS (replaces the Foreign Princess placeholder). Her kit (Altan Blademaster, sabre) is a DRAFT until the comic shows her; INTRO_CH 66 is a guess for her arrival.
- Ch 62: Roc's exhaustion is the after-effect of Dima removing his bond with Jade (ch59). It is not poison and not backlash; backlash only starts at ch70.

## Levi, Ripley, Sally after the Dragonvale year (author's decisions)
- Levi returns "reborn" before the party goes back to Tribute (ch75+, not planned; code uses ch76 as a placeholder, CH_RETURN in core.js). Not the same Levi: new class label (Reborn Shadow), stat shift, two draft skills (Reborn Volley, Veil of Rebirth), new portrait.
- Levi and Ripley are optional party members (Ripley follows Levi's travels): both stay recruited and can be toggled in or out of the active party.
- Sally can be partied only while the party is in Dragonvale (after the return to Tribute, placeholder ch80, `isAway` in core.js): travelling elsewhere drops her from the active party and she cannot be selected until you are back. She is always contactable for rumours from the Missions tab.
- Portrait specs: docs/PORTRAIT_PROMPTS.md.

## Updates (author)
- Greyson missions 2-4 are main-story quests: wait for the chapters (not built as side content).
- Masked contracts name the alias pair (the Crimson Phoenix and the Silent Dragon) in their text.
- Seraphina arrives in chapter 65 (profile unlocked, INTRO_CH 65); chapter 66 is her official arrival reveal. She still joins the party at 73.

## Chapters 63-73 (built from the pages) and the quest period
- 63 house arrest; 64 Altan proposal; 65 Seraphina arrives disguised; 66 reveal; 67 engagement; 68 Roc and Seraphina marry (political, unconsummated); 69 source of Roc's dark arts (the ravine cave markings); 70 fading blade; 71 Restricted Archive access log names Roc on four Moons; 72 Delilah's choice; 73 Roc exiled, Liora entrusted to Jade and Devon, "one year later".
- Quests start from 74. The Masked Contracts board opens when chapter 73 is complete. Dragonvale board: masked contracts (kill, demons, ruins, drakes) plus courier runs between Tribute and Dragonvale. Tribute boards keep their own contracts. Altan quests wait for the Altan unlock chapter.
- Quest log: side popup (📜 in the top bar) lists active missions, contracts and bounties.
- Levi's return and Sally's departure are at ch87 (return to Tribute).
- Late empress line: archive investigation + mural (ch53-55) built; the rest waits for the chapters (Greyson missions 2-4 are chapter-locked main quests).
- Levi poisoning line: "The Erased Name" (ch62) and "The Access Log" (ch71) built. The ravine cave has no location yet.

## Chapters 74-77: Field Investigation Arc (built from the pages + the author's gameplay plan)
- Comic titles (canon): 74 The King's Message, 75 Whispers at the Border, 76 The Ruins Awaken, 77 The Heart of the Ruins. (The gameplay plan called them The Silent Border / The Awakening Ruins.)
- Each chapter ends with a Main Story Quest box; each is a steps mission: m_kings_message, m_border, m_ruins_awaken, m_heart.
- Built: investigation spots with clues, purification (Devon: Spirit Purification, double damage to corrupted foes, bonus XP, corruption gauge in battle), Partner Action (Jade: Guardian's Promise), couple skill Twin Dragon Harmony (Devon, needs Jade, ch77), story passives Princess Guardian (Jade) and Royal Spirit Authority (Devon), dungeon Ancient Dragonvale Ruins (Forgotten Hall, Corrupted Spirit Chamber, Guardian boss, Seal Core boss), Dragonvale Seal Fragment, Spirit Caves and Cultivation Grounds (exploration areas, ch77).
- Not built yet: the symbol-rotation puzzle, the area Corruption Level meter (0-100%), true multi-phase bosses, Jade Mode / Devon Mode switching during the seal stabilisation, Warrior's Insight / Royal Spirit Sense exploration abilities.
- Next arc (author): chapters 78-80 Black Pearl Temple investigation (Dima / Xima / Gold Child).

## Chapters 78-85 (84 missing)
- 78 Echoes of the Forgotten Temple (mission box "Moonveil Temple"), 79 The Black Pearl Records (three records, name Dima), 80 The Shadow Behind the Pearl (Pearl Chamber, "The child of gold shall return when darkness rises"), 81 A Year of Peace, 82 The Crown Prince (Aster), 83 The Life We Build (Liora, Greyson: Tribute will need you again), 85 The Last Duty Before Departure (Greyson's mission 4).
- Chapter 84 (The Princess and the Child) and 86 (Farewell to Dragonvale) are built. Chapter 87 (return to Tribute) is next.
- "Who stirred Dragonvale's ancient seals" (seal_study) is still locked on The Heart of the Ruins, as the author decided. The comic's own Moonveil box has different objectives, so that quest did not take the sealed objective.
- Chapter 87 (The Shadow at Dragonvale's Gate): Levi rejoins, Seraphina permanent, Sally stays, Sky gets recovery gear (auto-equipped). No battle.

## Liora after the party leaves Dragonvale (author's plan)
- Built now: letters and messengers (scripts/family.js). From the return to Tribute (ch87 placeholder, flag liora_apart) a messenger letter arrives every ~16 days (Liora at "age 3-6"), every ~9 days after about 150 days away ("age 7-12"). Senders: Liora, Jenika, Devon, Aster. Some carry a small gift (herbs, tonics, gold). Messengers reach the party in settlements; letters queue until then. Letters mention the Dragonvale boards, and the party can return there for quests and bounties (Masked Contracts board still works).
- Not built yet (waits for the story): occasional royal visits and training visits from Jade and Devon; Liora joining the party; her childhood pouch (Jade's first training note, Devon's letters, Jenika's herb journal; a reminder, not a powerful artifact); the Black Pearl destiny moment, which is kept for when Liora herself touches it. No letter uses the pearl as a way to call the parents.

## Ghost Healer (author, planned from ch88)
- Ch88: no battles, story only: how Levi survived. Sets up a future quest for Levi to revisit the Ghost Healer (spirit healer who found him between life and death).
- The Ghost Healer may later enhance Sky's healing skills (future quest, chapter-locked). Sky stays with the party; he is sad to leave Jenika.

## Chapter 88 (The Ghost Healer) — built
- No battle. Ghost Healer joins as a slotless companion (always fights with the party, not one of the four active slots; characters.js `companion:true`). Travels with the party only for a while (departure chapter TBD). Portrait is a crop of the chapter 88 page: replace assets/party/ghost_healer.webp with proper art.
- Quest A Gift for the Ghost Healer: buy a gift at the Moon-Blossom Tea Stall (capital, 120g), give it to the Ghost Healer; unlocks Ancient Remedy and bond.
- Future (chapter-locked): Levi revisits the Ghost Healer; they may enhance Sky's healing; Sky's forgotten past.

## Chapters 89-94: back in Tribute (the week of rest)
- 89 Return to Tribute (one week of rest: party fully restored), 90 The Gold Reunion (Unique Gold, Elara Valor, Adrian Gold; Childhood Flower Charm), 91 The Mother's Question, 92 The Missing Sister (Yvette Sue Valen), 93 The Boy Who Looks Like Sue, 94 The Unanswered Bloodline (Sky's lost light green jade pendant).
- Built: Gold Residence location, family activities, mission The Missing Sister (second objective sealed: Yvette's trail), Sky bond +10 at 93 and 94.
- Open: Sky's origin and the pendant (future quest); the Ghost Healer may enhance Sky's healing.

## Optional arc: The Fallen Prince's Trial + Guardian Raid (built, scripts/raid.js)
- Location Abyssal Frontier (unlocks at TRIAL_CH in world.js, currently ch77 and undecided, via the Exile Road from the Dragonvale Border). Mission m_fallen_trial (optional, Greyson's rumour letter): investigate Exile Trail; Phase 1 vs The Shadow of Roc (party only); Phase 2 vs The Shadow Crown with Roc as a temporary ally (only Roc's own blows truly hurt it); Purification (needs Jade, Devon and Sky; Jenika's medicine narrated).
- Result: flags roc_purified and roc_reborn: Roc's class label becomes Fallen Dragon Prince, skill Dark Dragon Aura. Roc stays out of the party for now.
- Guardian Raid (after purification): L1 Shadow of Roc, L2 Shadow of Ambition (clones), L3 The Forgotten Prince. 3 attempts per level per day. L2 needs L1 cleared, L3 needs L2. Drops: Dark Essence, Dragon Crystal, Royal Sigil, rare Shadow Steel, Shadow Mail, Crown of the Forgotten Prince. Craft Dragon Prince's Blade (Roc's weapon) at the Healing Pavilion.
- Not built: Roc appearing in the final war (purified: with dragon power; not purified: weakened). Hook is the flag roc_purified.

## Party size (author decisions)
- From ch87 the travelling party is fixed at five: Jade, Devon, Seraphina, Levi, Sky (4 fight at a time). Ripley goes back to being Jade's attendant (leaves the party at ch87). Sally is Dragonvale-only. The Ghost Healer is a slotless companion who travels only for a while.
- Roc never returns to the main party. The Fallen Prince's Trial is a gameplay mechanism with no story chapters; he is only a temporary ally in phase 2.
