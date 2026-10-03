TRIBUTE: Curse of the Hidden Isle — RPG skeleton v3 (multi-script, Crimson Tide layout)
Open index.html. Save key: tribute_rpg_v3 (localStorage).

scripts/characters.js  party classes, stats, skills, signatures, bond skills, evolutions  (EDIT HERE)
scripts/core.js        save, XP curve, stats, skill unlocks, bond, evolution, JOIN_CH (who joins at which chapter), CH_FLAGS
scripts/enemies.js     area monsters, bosses, ITEMS, LOOT tables for major battles
scripts/battle.js      turn-based engine (replaceable)
scripts/journal.js     chapters 0-31, story XP, chapter battles, art lists
scripts/ui.js          screens. Tabs: Journal, Party, Training, Items, Bestiary + stubs (Gear, Tavern, Travel, Explore) + Dev

PROVISIONAL (please correct): JOIN_CH, chapter battles (BATTLES), story XP (80+40*ch), all skill numbers/unlock levels.


--- v3.1: WORLD, TRAVEL & MISSIONS ---
scripts/world.js     locations + spots, ROUTES (carriage = Aethon road travel, ship = Crimson Tide voyage), King Greyson letters/missions,
                     quest board + bounties (Crimson Tide), activities, archive lore.  Game clock: G.day.  (EDIT HERE)
scripts/world-ui.js  tabs: Missions (letters/missions/quests/bounties), Travel, Here (current location & its spots)

Comms: pigeon post (letters reach you only in towns, ~1 day per hop from the capital) -> Communication Bracelet (instant) after mission m_bracelet.
No guild/hub yet. Dark Inn (ch12) and Vigil Village (ch16) chapters must be started on location (CH_LOC).

Assets: uploaded PNGs were converted to WebP -> assets/splash.webp, assets/areas/{imperial_capital,imperial_palace,training_grounds,imperial_garden}.webp,
and assets/comics/ch18..ch30.webp. The original PNGs are still in the repo and can be deleted.

PROVISIONAL (please correct): location unlock chapters (LOCATIONS[].unlock), CH_LOC, all mission text/rewards (MISSIONS), fares/risk/days (ROUTES),
quest/bounty numbers, new enemies & bosses (Frog Mahan, Pearl Guardian), archive lore.

--- v3.2: SKILL TREES & BOND UNLOCKS ---
scripts/skilltree.js  SKILLTREE (3 branches x 4 nodes per hero; passives + skills) and BONDTREE (bond 1/4 passives, bond 2 skill, bond 5 pair ultimate).
Skill points: 1 per level above 1, +3 per evolution tier; node cost 1/2/3/4; reset costs gold. Jade's 'bond' = average bond of her companions.
Shown on the Party sheet. All names/numbers PROVISIONAL.

--- v3.3: CHAPTER DESIGN ENTRIES (Prologue -> Ch15) ---
scripts/chapters.js   CHAPTER_DESIGN: per-chapter title / summary / location / playable / key events / unlocks / rewards. Shown in the Journal chapter view.
Applied from the doc: Chad+Sky join ch1; Chad tree ch2, Sky tree ch3 (TREE_CH); Tribute Wilderness ch3->; Faepool Harbour/Forest ch4->; Vigil Village ch5->;
  Frog Mahan Swamp ch9->; Faepool Ruins ch10->; Dark Inn ch13->; boat travel ch13 (SHIP_CH); River Crossing (sea route) ch15->.
  Recruitment Hall / city streets ch1; regional quest boards ch5-6. CH_LOC = chapters that must be started on location (tunable).
Journal titles 16+ are "(?)" placeholders until the next batch. NOTE: comic page files were numbered from the OLD chapter list (e.g. c5 = "Unanswered Ties"),
  so art may no longer match the new chapter order — check ART in journal.js.
Comms: pigeon post by default; set BRACELET_FROM_START=true in world.js to give the bracelet in the Prologue.

--- v3.4: CHAPTERS 16-30 ---
CHAPTER_DESIGN now covers 0-30. Recruits: Chad+Sky ch3 (provisional), Sally ch28, Levi ch30 (+ Enchanted Crossbow flag), Devon open (no join chapter).
New places (unlock after the previous chapter): Ancient Trial Grounds ch22, Hidden Village ch23, Corrupted Forest ch24, Faepool Borderlands ch25,
Faepool Settlement ch26, Reunion Area ch29; Vigil Shrine (meditation) ch17. Dragon Vale / Sanctuary / Pearl Chamber are parked at ch99 until Devon's arc is written.
Chapter fights: 2/3 Jade-vs-Chad spars, 4, 9, 10 (Frog Mahan), 23 (trial), 25 (elite stag), 31 (old placeholder).
OPEN QUESTION: ch5-15 (Faepool, Vigil, swamp, ruins, inn) and ch16-21 (arrive in Faepool, Vigil again) overlap in the design doc, and the comic pages follow the older numbering.

--- v3.5: UI THEME ---
styles.css now holds all styling (was inline in index.html): same design language as Aethon Codex / Crimson Tide
(Cinzel + Crimson Text, gold/parchment, gradient panels with gold hairline, stat pills, uppercase nav tabs, framed cover landing,
gold shimmer button, drifting petals) in Tribute's crimson + cherry-blossom colours. Palette tokens are at the top of styles.css.

--- v4.0: CANON RESET (story data v6) ---
The earlier GPT-estimated chapter summaries (Ch0-30) were removed. scripts/chapters.js now holds ONLY canon-converted entries (Prologue-5)
plus CANON_TITLES for Ch6-14 (summaries still to convert). Ch15+ have no canon text yet.
Canon applied: Chad+Sky permanent at ch3; Sally = GUEST at ch4 (GUEST_CH in core.js; leave chapter unknown); ch2 tutorial (Jade+Chad+Sky vs dummies),
  ch3 Jade-vs-Chad duel, ch5 Booyeong rescue fight; ch4 First Village = Vigil Village, ch5 Cliff Area (new).
PARKED / NON-CANON (kept as drafts, gated at ch99 so they don't fire): drafted missions after ch4, most archive lore, Vigil Shrine.
STILL TIED TO OLD NUMBERS (re-gate when canon text arrives): unlock chapters of Faepool Harbour/Forest, Frog Mahan, Ruins, Dark Inn, River Crossing,
  Trial Grounds, Hidden Village, Corrupted Forest, Borderlands, Settlement, Reunion Area (world.js LOCATIONS[].unlock); boat travel (SHIP_CH=13);
  Sally permanent ch28 / Levi ch30 (JOIN_CH) are UNVERIFIED against canon.

--- v4.1: PROLOGUE (canon) ---
Prologue is an opening cinematic (type/introduced/quote/reward fields in chapters.js). Extra facts taken from the actual pr1-pr3 artwork are marked "Artwork also shows".
Archive/Codex now opens with canon entries: Tribute Island, Xima's Curse, King Greyson, Jade Gold, The Sage's Prophecy. Greyson's first letter = the fifteen evils.
Parked (non-canon) lore stays at ch99.

--- v4.2: CHAPTER 1 (canon, from c1a/c1b pages) ---
Ch1 "The Recruitment Scroll": Character Introduction. Playable Chad + Sky (flashback/tutorial), Jade guest at the end. Chad/Sky profiles become visible in Party from ch1 (INTRO_CH in core.js); they still join the party at ch3.
Title note: an earlier list called this "Strangers on the Isle"; the latest entry uses "The Recruitment Scroll" (CANON_TITLES/TITLES come from chapters.js).

DEV NOTE (spoiler, not shown in-game): Roc (Chad, born Chadstone) and Devon Chadstone are TWIN brothers raised by different wives of the king, each believing they were half-brothers.

--- v4.3: SAVE DATA (as in Crimson Tide) ---
scripts/savedata.js + "💾 Save" tab: Save Game (local, also autosaves), Export / Import JSON, New Game, GitHub Gist backup (token with gist scope only, Gist ID, push / pull).
Landing screen has "Import Save File". Gist token is stored in localStorage (tribute_gist_creds) on this device only. Midnight auto-backup from Crimson Tide not ported.

--- v4.4: STORY POPUPS ---
scripts/storypopup.js: full-screen story reader (Crimson Tide "Story Mode" style) over the comic pages. Opens automatically the first time a chapter is opened (G.read[n]);
"Read story" button in the chapter view re-opens it. End screen -> Begin battle / Complete chapter; a "Chapter complete" popup lists rewards and the chapter's unlocks.
Controls: Back/Next buttons, arrow keys / space, swipe, Esc to close.

--- v4.5: CHAPTER 2 (canon, from c2a/c2b) ---
Ch2 "The Mercenary Trial" is Jade's POV: interview/paperwork, the Three Blows challenge, walk to the Training Grounds. NO fight and NO Sky on the pages; the spar is only set up
(the earlier "tutorial battle / party system" for ch2 was removed). Pages state Jade fights with archery / whips / spears (distance, speed, precision) — characters.js still
gives her a sword (design doc). DECISION NEEDED: keep sword or move Jade to whip/spear/bow.
