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
- Location Abyssal Frontier (opens with the Dragonvale border, TRIAL_CH = 75; the fights are gated by average party level, not by chapter: phases 30 and 32, raid levels 35 / 45 / 55; bosses scale to avg level + offset, never below the gate. Constants in raid.js; via the Exile Road from the Dragonvale Border). Mission m_fallen_trial (optional, Greyson's rumour letter): investigate Exile Trail; Phase 1 vs The Shadow of Roc (party only); Phase 2 vs The Shadow Crown with Roc as a temporary ally (only Roc's own blows truly hurt it); Purification (needs Jade, Devon and Sky; Jenika's medicine narrated).
- Result: flags roc_purified and roc_reborn: Roc's class label becomes Fallen Dragon Prince, skill Dark Dragon Aura. Roc stays out of the party for now.
- Guardian Raid (after purification): L1 Shadow of Roc, L2 Shadow of Ambition (clones), L3 The Forgotten Prince. 3 attempts per level per day. L2 needs L1 cleared, L3 needs L2. Drops: Dark Essence, Dragon Crystal, Royal Sigil, rare Shadow Steel, Shadow Mail, Crown of the Forgotten Prince. Craft Dragon Prince's Blade (Roc's weapon) at the Healing Pavilion.
- Not built: Roc appearing in the final war (purified: with dragon power; not purified: weakened). Hook is the flag roc_purified.

## Party size (author decisions)
- From ch87 the travelling party is fixed at five: Jade, Devon, Seraphina, Levi, Sky (4 fight at a time). Ripley goes back to being Jade's attendant (leaves the party at ch87). Sally is Dragonvale-only. The Ghost Healer is a slotless companion who travels only for a while.
- Roc never returns to the main party. The Fallen Prince's Trial is a gameplay mechanism with no story chapters; he is only a temporary ally in phase 2.

## Chapters 95-98 (back at court; 99 is the last Tribute chapter, 100 leaves Tribute)
- 95 The Imperial Guardian Returns, 96 The Brother Who Remembers (Luck: from Jade's near-drowning), 97 The Advisor's Daughter, 98 The Missing Documents (Yvette went to the Western Regions in Year 814).
- Quest boxes built as steps missions (m_guardian_returns, m_brother, m_advisors_daughter, m_missing_docs). Story-only objectives use the new step kind {chapter:n}: checked off when chapter n completes. The third Missing Documents objective (Sky's files) is sealed until the story reaches it.

## Adrian Gold and the Imperial Network (built, scripts/network.js)
- Unlocks at ch90. Support NPC, not playable. Tab "Network": Reports, Requests (use the contract log; reward gold/rep/materials + Adrian's hidden trust), Intelligence (kingdom records, history, enemy files, character files with early/late text, trust-gated Gold family lore), Letters (sibling banter, unlocked by trust), Kingdom Status (static meters; strategic decisions later).
- Reserved: contact slot for Princess Evelyne Greyson / Royal Diplomatic Liaison, shown only when flag contact_evelyne is set (not set anywhere yet). The tree shows Adrian Gold > Tribute Intelligence > Unknown Contacts (locked). The game text does not mention his relationship with Greyson's sister, his past assignments or his influence.
- Support network (not party): Greyson, Adrian, Jenika, King Chadstone. Ripley is an attendant (left the party at ch87), contrary to the author's playable list in the Adrian note; confirm if she should be playable again.

## Chapters 99-101 (end of the Tribute week)
- 99 The King and His Sister (Jade named Princess of Tribute), 100 The Visions She Hid (three sources of her visions; Xima's evil still exists), 101 The King's Request (mission beyond Tribute: missing envoys, hidden records, old alliance).
- Note: the author said chapter 99 is the last story chapter in Tribute and 100 leaves Tribute; the pages show 100 and 101 are still in Tribute and the party sets out after 101. Built from the pages.
- m_kings_request has four sealed objectives (flags beyond_tribute, envoys_found, hidden_records_found, tribute_represented): set by the next chapters (the territory beyond Tribute: Altan?). TRIBUTE party mode (fixed five) is still undecided.

## Chapters 102-104 and the fixed party
- 102 The Road Beyond Tribute (the departure; original plan was 100, it stretched), 103 The Choice He Made (Jade and Devon husband and wife in truth; couple skill Jade Dragon Harmony), 104 The Forgotten Western Territory (arrive in the Valen Borderlands; the map is in assets/maps/valen.webp).
- Mismatch resolved with the comic: the couple skill is Jade Dragon Harmony (ch103), replacing Twin Dragon Harmony (planned ch77).
- Valen Borderlands: location opens after ch103; spots: Westwatch Gate, Present the Sealed Order, Valen Crossing board, Moonfall Hamlet (envoys), Ruins of Valen (erased records), Spirit Healer's Hollow (sealed), hunts (Veilwood, Whispering Plains, Mourning Marsh, Ashen Ravine). Not built from the map: Mirror Lake, Forgotten Watchtower, Howling Pass, Sunken Shrine, Western Frontier Camp.
- Fixed party from ch102: Jade, Devon, Seraphina, Levi, Sky all fight (no slots). The Ghost Healer is a hidden companion: not shown on the party screen; acts by himself in battle (heals, cleanses, shields, revives).

## Temporary members (guests) — system, author's idea
- GUEST_RULES in core.js: a row per visiting member { flag, regions, note }. While the story flag is set and the party is in one of the regions, the guest fights beside the five (controllable, extra unit). They never occupy the fixed party.
- Roc (once purified, flag roc_reborn) is the first row: guest on Dragonvale ground only. Not in the main party.
- To add a new traveller met along the way: add them to CHARACTERS (and ROSTER), set a story flag in CH_FLAGS when they join, add a GUEST_RULES row with the regions they travel in. For a passive helper like the Ghost Healer use `companion:true` on the character.

## Sky's apprenticeship with the Ghost Healer (built, scripts/apprentice.js)
- Three lessons from Sky's party sheet while the Ghost Healer is with the party: Reading the Body (healing +15%), Cleansing Light (more healing + skill Cleansing Light), The Old Light (needs the Ghost Healer's trust from the gift quest; skill Forgotten Light). Each lesson takes a day and uses herbs and materials; level gates 30 / 34 / 40 (draft).
- Does not explain Sky's past: the "something very old" stays a mystery for the story.

## Idle banter and comic relief (built, scripts/banter.js)
- BANTER rows: who must be present, min chapter, contexts (any / travel / rest / battle). Shown on arrival after travel (50%), with shared meals, inn nights, at the start of some real battles, and on demand: "Listen to the party" at taverns and camps (once a day).
- Add more by appending rows; keep each exchange short; gate by chapter to avoid spoilers.

- Ghost Healer: no departure chapter (author). He stays with the party for now so Sky's apprenticeship can run over a long stretch. Add him to CH_LEAVE in core.js only when a chapter calls for it.

## Chapters 105-108 (Valen Borderlands arc)
- 105 The Borderland That Was Forgotten (Rowan Mirel, Mira Valen, Master Teren), 106 The People Left Behind (Lio, the west's resentment), 107 The Healer's Legacy (Sister Anwen; the Valen crest), 108 The Empty Records (hidden second archive).
- Missions built from each quest box. Sealed objectives: m_people_behind 'search for the people behind the missing records' (flag people_behind_found), m_healers_legacy 'connection to the prophecy' (flag valen_prophecy_link), m_empty_records 'file on Yvette Sue Valen' (sealed spot yvette_file). The author sets those later.
- Ch104's quest still uses the spots moonfall_hamlet and ruins_of_valen; the chapters 105-108 added their own spots (records hall, Mira and Lio, healer village, hidden archive).

## Combat additions
- Enemy area attacks: a move with `all:true` hits every ally at 70% power and ignores Protective Oath (Shade Beast's Dark Howl, Vale Drake's Tail Sweep, several boss moves).
- Bosses ignore Protective Oath 35% of the time.
- Boss phases: `phases:[{at:hpFraction, msg, moves?, atk?, shield?, summon?}]` on an enemy. Built for the Ancient Guardian Spirit (3 phases), the Awakened Spirit Core (3), Shadow of Roc (3), Shadow of Ambition, The Forgotten Prince.
- Adrian's strategic decisions (built): Kingdom Status meters now move. One decision per 7 in-game days (DECISIONS in network.js): send soldiers / supplies / investigate etc.; four written so far.

- Enemy scaling for the fixed party (battle.js ENEMY_PER_EXTRA): baseline is four fighters; each extra adds +32% foe HP, +10% damage (bosses +12% more HP), +15% XP/gold. The Ghost Healer counts as half. Five fighters plus him is +48% HP. Not applied in sandbox fights. Tune the four numbers.
- Valen map spots built (exploration only, no new story): Mirror Lake, Forgotten Watchtower, Howling Pass, Sunken Shrine, Western Frontier Camp. Still not on the map: Cloudrend Peaks, Veilwood is a hunt, Moonfall Hamlet and Ruins of Valen are story spots.
- Symbol Door puzzle (Ruins of Valen, opens at ch107): four rings of dragon / moon / pearl / spirit; the order is a hint from the Valen crest (spirit, dragon, moon, pearl). Reward: Seal Fragment, relic dust, XP. Answer is DOOR_SOL in world.js.

## Area corruption meter (built, scripts/corruption.js)
- Corrupted areas: Ancient Dragonvale Ruins (starts 55%), Abyssal Frontier (70), Dragonvale Border (30), Valen Borderlands (25), Moonveil Temple (15). Rises per day spent there; −2% per corrupted foe defeated; Devon's Purification Points (−25%, once a day per area).
- Effects: foes up to +30% HP and damage; healing up to −40%; the screen darkens at 40% and 70%.

## Seal fight: Jade Mode / Devon Mode (built, battle.js)
- The Seal Core boss fight shows a seal bar (100% at start). Jade Mode: Jade +25%, Devon -15%, the seal decays 4-8 per round. Devon Mode: Devon +30%, Jade -20%, the seal repairs 16 per round (less in late phases). The party can switch at any turn. Enemy area attacks batter the seal; at 0% it collapses and hurts the party each round until it is back above 30%.

## Exploration abilities (built, scripts/explore.js)
- From ch76. Once a day each; arm it on a search/hunt/gather/puzzle/purification screen, it applies to your next action.
- Warrior's Insight (Jade): investigate ambush chance 40% -> 10% and the hidden path saves a day; hunt: foes start slowed; gather: ambush 30% -> 8%.
- Royal Spirit Sense (Devon): investigate: bonus XP, no ambush when the ambushers are all magical, corruption -5%; hunt: foes revealed; Symbol Door: one ring set true; purification point: -35% instead of -25%.

## Story battle levels and the trial gate (author)
- Story battle enemies scale to the fighters' average level, never below the chapter's base level (journal.js storyBattleLv). Each battle chapter shows its recommended level and a warning if you are under it.
- The Fallen Prince's Trial opens at ch87 (TRIAL_CH) and also needs average party level 30 / 32 (phases) and 35 / 45 / 55 (raid).

## Arc splash screens and Skirmish (built)
- Arc covers (assets/arcs/arc1-4.webp, scripts/arcs.js): Arc I shows at the start of a new journey; Arc II after ch42; Arc III after ch86; Arc IV after ch103 (boundaries are provisional; change ARCS[].after). Saved in G.arcSeen; re-view from the Cast tab. Existing saves only see arcs they have not yet passed.
- Skirmish tab (from ch12, scripts/skirmish.js): random battles with monsters from every unlocked area (or the current one), level = party average + difficulty offset (Normal/Hard/Brutal), win streak bonus.
- XP: one shared table for every hero, xpToNext(lv) = 40 + 22*lv + 1.2*lv^2; each hero tracks their own level and XP. Active fighters get the full award, the bench half. Cap 100.

- XP is now per class (author): XP_TABLES in core.js, XP_CLASS maps each hero. Swift fighters (Roc, Seraphina) need less XP per level, rangers (Levi, Ripley, Sally) slightly less, support (Sky, Ghost Healer) and the scholar (Devon) more; Jade is the standard curve. There is no level cap (CFG.LEVEL_CAP = Infinity).

## Chapters 109-117 (Valen arc, part 2)
- 109 The Man Who Knows Too Much (Magistrate Corvin Hale), 110 The Magistrate's Shadow (the forbidden page), 111 The Valen Family Name (portrait), 112 The Forgotten Alliance (the pact), 113 The Price of Silence, 114 The Hidden Enemy (sun-and-eye symbol, Xima), 115 The Healer's Secret (Dima, Gold Child), 116 The Borderland Trial (battle: Jade and Devon only), 117 The Truth Behind Yvette Sue Valen.
- Resolved sealed objectives: people_behind_found (ch114), valen_prophecy_link (ch115), the file on Yvette (spot yvette_file unlocked at ch117). Still sealed: Sky's files (m_missing_docs), Yvette's trail in Tribute (m_missing_sister).
- Not shown in the comic: who the crowned royal figure in Yvette's portrait is, and Sky's tie to her. Ch117 shows a purple-haired man where Devon would be (probably an art slip).

## Home bases (built, scripts/base.js)
- Devon's Palace (Dragonvale, from ch57) and the Gold Manor (Tribute, Gold Residence, from ch90): free full-recovery rest (1 day), free home-cooked meal (bond +3), the party's talk, and a stash for non-quest items. Smaller areas keep paid taverns and inns.

## Chapters 117 (revised) and 118
- 117 revised: Sky is in the scene (blue hair) and says the pendant his mother gave him carried part of Yvette's knowledge and was lost to save his life: "She still protected me, even in her absence." Implied, not stated: Yvette is Sky's mother. Flag sky_pendant_mother.
- 118 Return of the Western Territory: the Valen arc ends in restoration. Mira is Valen's representative, Lio a messenger (letters + gifts every ~20 days), Corvin Hale supports the restoration, the corrupt officials are exposed. Effects: the Western Road is safer (risk 50% -> 20%), Valen corruption drops to 5%, new Network report.

## Chapters 119-125 (end of the Valen arc, start of Arc V)
- 119 The Letter Left Behind (Yvette's final letter; Sky calls her "Mother"; "chosen by choice"), 120 Beyond the Forgotten West, 121 Return to Tribute (court), 122 The First Omen (demons fleeing; Arc V begins), 123 The Sleeping Enemy (Cael Ardyn), 124 The First Broken Seal, 125 The Forgotten Light.
- New location: The Forgotten Battlefield (unlocks after ch122; routes from the capital and the Valen Borderlands). Spots for each quest box line, 6 new missions, lore, reports, flags.
- Two pendants (author): Sky's own jade pendant (ch1, ch94) was lost; the pendant in ch117 is his mother's. Jade's teal-green pendant (123-125) "belonged to my family" and Cael calls it the Gold lineage's; kept separate until the author says otherwise.
- Arc V cover/title pending: add the ARCS entry (after 121) once assets/arcs/arc5.webp exists.
- Open: the gold-haired voice in the ch123 vision is unnamed; ch122's opening caption repeats ch121's; the Valen map image does not show the battlefield yet.

## Arc V: The Broken Seals (ch122-145) and chapter 126
- Arc V cover is in (assets/arcs/arc5.webp, shown after ch121). The arc concludes at ch145.
- The golden-haired figure in ch123's vision is Dima, in a dream. Cael Ardyn looks like Dima; no relation is stated yet.
- Ch126 The Saint of Forgotten Light: Seris Valen, the Forgotten Sanctuary (new location, unlocks after ch125), five spots matching the quest box, mission m_saint_light. Seris's relation to the Valen family and to Sky is not stated on the page.

## Chapters 127-128, Arc V cover and cast
- Arc IV cast sheet (Jade, Devon, Sky, Levi, Mira, Lio, Master Teren, Corvin Hale) is gated at ch121, the end of the arc.
- Arc V cover replaced with the revised art. The Arc V cast sheet (Jade, Devon, Sky, Levi, Cael Ardyn, Seris Valen, Eira, Varyn) is in the Cast tab's arc gallery, gated by `castCh` in `ARCS` (set to 145, the end of the arc, because Eira and Varyn are not introduced yet; lower it to taste).
- 127 The Light That Remains and 128 The Path Remembered: both at the Forgotten Sanctuary, five spots each, missions m_light_remains and m_path_remembered. The map names no destination beyond "a forgotten region beyond the old seals".

## Arc V design notes (author, DEV ONLY: keep out of in-game text)
Arc V, The Broken Seals, runs ch122-145. Tone: exploration + ancient mysteries + battles (Valen was investigation + politics).

**New locations (build as the chapters reach them; none exist yet except the Forgotten Battlefield and Forgotten Sanctuary):**
1. The Celestial Ruins: ancient city of the Dima/Xima era; floating ruins, abandoned temples, forgotten magic.
2. The Black Forest: normal creatures avoid it; corrupted monsters, ancient spirits, hidden settlements.
3. The Sunken Kingdom: underwater ruin; may connect to Dragonvale through its sea links.
4. The Forgotten Temple: main dungeon; the truth about Xima, Dima, the Gold lineage and the Dragon Pearl.

**Character beats (story only; no mechanics implied):**
- Jade: from "why am I special?" to "how do I use my position?": a true leader.
- Devon: from Jade's husband to a prince who stands beside her, not behind. Possible conflict: Dragonvale asks him to return; Dragonvale prince or Jade's partner?
- Sky: his mystery deepens; the ruins react to him because he has forgotten something, not because he is a chosen hero. Possible reveal: Yvette Sue did not just disappear, she protected Sky from something.
- Levi: Reborn Levi shines; new class Spirit Ranger; ancient creatures recognise his survival; the Ghost Healer knew something about these seals.
- Roc Chadwick: NOT brought back now. Redemption stays separate. Later, a single story beat shows him investigating dark-magic remnants. Not a party member and (since the arc is far from Dragonvale) not a guest either.
- Seraphina: the diplomatic bridge; foreign kingdoms matter here.
- Sally: information network; rumours about ancient sites.
- Adrian: his hidden role begins (no full reveal); he finds old Imperial Advisor records showing the advisors knew about the seals.

**Big mystery:** Xima did not create the curse; she used something that already existed.

**Ch145, The Truth Before the Curse:** Dima reveals that long ago the world faced the same threat; she and Xima disagreed on how to stop it (Dima: balance; Xima: control) and their conflict created the curse. Jade: "Then why was I chosen?" Dima: "Because the Gold bloodline was never meant to defeat darkness. It was meant to choose what comes after."

**Arc V ending:** the story enters its final phase. The question changes from "Can Jade defeat the curse?" to "Can Jade create a world that no longer needs heroes?"

**Build notes:** Spirit Ranger, Sunken Kingdom routes to Dragonvale and the Devon-return choice need a mechanic or flag only once the matching chapter pages arrive. Adrian's advisor records can slot into the Imperial Network Intelligence tab; Sally's site rumours into her existing gossip feed.

## Chapters 129-138 (Arc V, the forgotten path to the first choice)
- 129 Eira Solenne, 130 The Forgotten Path (both at the Forgotten Sanctuary), 131 The Forgotten Road, 132 The City That Forgot, 133 The Broken Seal Chamber, 134 The Name Behind the Ruins, 135 The Seal Breaker, 136 The Truth He Refuses to Bury, 137 What the Seals Were Made For, 138 The First Choice (story battle vs Varyn Noctis: Jade, Devon, Sky, Levi; losing still completes it since neither side seeks to kill).
- New location: The Celestial Ruins (unlocks after ch130; the page never names it, the name comes from the author's Arc V notes). 38 spots across the ten chapters, 10 missions, lore, reports, flags.
- Open mismatches: (Resolved by the author: Levi has been in the party since Dragonvale; the comic only draws the characters relevant to each arc, and Seraphina is simply not drawn); ch135 and ch136 repeat the Varyn confrontation; ch138 was sent twice (the wider version is used); hair colours of Eira, Seris and Cael are close, so who speaks some lines is inferred.

## Chapters 139-146: Arc V closes
- 139 The People Behind the Barrier, 140 The Keeper's Oath, 141 The Oath Before the War, 142 Before Dima and Xima Became Enemies, 143 The Child Between Two Legacies, 144 Cael Ardyn's Inheritance, 145 The Confession of the First Betrayer, 146 The Truth Before the Curse (Arc V Ending: the Discovery Phase). All at the new location The Land Beyond the Seal (unlocks after ch138, one day from the Celestial Ruins).
- Only ch145 has a quest box (mission m_first_betrayer, 4 objectives). 139-144 and 146 have one or two optional investigation spots each; none is a mission.
- Arc V now ends at ch146 (the author's note said 145; the final chapter The Truth Before the Curse is 146). The Arc V cast sheet unlocks at ch146.
- Confirmed by the author: ch144 has no quest box; 141 was regenerated after 142 (design fix), so the order is only a delivery quirk; ch143's pendant memory is Sky's own pendant (one of two identical pendants: Sky's was destroyed and lost, the one he holds now was his mother's); ch146 is correct as built. Still open: Varyn walks with the party in 139-146 but is not a party member or guest; the author note that Jade's hair looks red inside the broken seals is recorded in lore only.
- Not built from the Arc V notes (no pages yet): Spirit Ranger, Devon-return choice, Sunken Kingdom, Black Forest, Roc story beat, Adrian's advisor records, Sally's rumours.

## Arc V world map and geography notes (author)
- The Broken Seals world map (assets/maps/broken_seals.webp) is in the Travel tab's world maps, opening at ch122 (`ARC5_MAP_CH` in world-ui.js). It is the default map while you are at an Arc V location. Arc II cover replaced (hand redrawn).
- Established geography: Tribute Island (hidden homeland, political centre), Dragonvale (distant allied sea kingdom), Valen (Arc IV; preservers of ancient healing knowledge, NOT the source). Arc V reveals the source: ancient seal civilization, Dima/Xima era, then Valen preserved the healing records.
- Map locations: Frostveil Range (north, ancient barrier ruins, first signs of the awakening), Celestial Ruins (floating cities and sky temples), Veilspire Graveyard (collapsed seal zone), Black Forest (forgotten, not corrupted: "dangerous because humans no longer understand it"; ancient spirits, beast clans, abandoned temples), Valen Territory, Forgotten Road (spirit routes, floating bridges), Sanctuary of Forgotten Light (home of Seris Valen, older than Valen), Ember Sands (buried kingdoms, desert seals), Sunken Kingdom (sea civilization linked to Dragonvale through ancient ocean routes, not inside Dragonvale), Forgotten Temple (final seal site; truth of Dima, Xima and the Gold lineage; Dragon Pearl; should be the last dungeon).
- Design rules: the old civilizations were joined by Spirit Routes, not roads; Arc V locations must reveal forgotten civilizations, choices of earlier generations and consequences of hiding history (not "find ruins, kill demons"). Varyn's ancestors come from a forgotten civilization erased from history, not Tribute, Valen or Dragonvale.
- Built so far: Forgotten Battlefield, Forgotten Sanctuary (= the Sanctuary of Forgotten Light), Celestial Ruins, Land Beyond the Seal. Not built (no chapters yet): Frostveil Range, Veilspire Graveyard, Black Forest, Ember Sands, Sunken Kingdom, Forgotten Temple.
- Open: the map's labels are inconsistent ("Frospiell Graveyard", "Forcotary of Forgotten Light", "Sunkenn Kingdom" in the small captions); the notes place Cael and the first seal at the Celestial Ruins, while the chapters put them at the Forgotten Battlefield (123-125) and reach the Celestial Ruins at ch131; Land Beyond the Seal is not on the map.
