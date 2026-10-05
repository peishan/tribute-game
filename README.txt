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

--- v4.6: CHAPTER 3 (canon, from c3a-c3c) ---
Ch3 "Three Blows" (pages' title; the story file calls it "Swords and Palpitations"): Chad-POV duel + rematch (Chad wins both), Jade hires him, passes for Chad and Sky, 3-day briefing.
Jade fights with a sword at first, then a whip. Story duel: losing still completes the chapter (DUEL in journal.js). Chad/Sky both still join at ch3 (Sky has not met Jade yet on the pages).

--- v4.7: JADE'S WEAPONS ---
Per the author: Jade was written with a whip and bow (the comic art drifts to a sword); Greyson later gives her a dagger and flail (chapter TBD, flag greyson_arms, skills Hidden Dagger / Flail Sweep locked until then);
Levi's Enchanted Crossbow comes at ch30. characters.js: weapon text, Lunar Lash, Piercing Arrow; skill tree branch "Whip & Bow".
Evolution names (Sword Saint, Oracle Guardian, Destiny Awakening) are still from the class doc: rename "Sword Saint" if desired.

--- v5.0: THE COMIC IS CANON ---
The story-file chapter list (e.g. "Strangers on the Isle", "Swords and Palpitations", "The Ransom Trap", Sally guest ch4, Booyeong at ch5) is DISCARDED.
Titles 4-30 now come from the comic title cards (COMIC_TITLES in chapters.js): 4 A Secret Mission, 5 Unanswered Ties, 6 Moonlit Confessions, 7 Restless Desire, 8 Unwanted Truths,
9 Whispers and Jealousy, 10 The Prophecy, 11 Dreams and Doubts, 12 Shadows at the Inn, 13 Uninvited Encounter, 14 Unwanted Choices, 15 The Storm Within, 16 The First Village,
17 A Choice Beneath the Lanterns, 18 The Price of Trust, 19 Into the Woods, 20 The Witch's Bargain, 21 At the Bandit's Mercy, 22 Between Love and Loyalty, 23 The Heart's Choice,
24 The Choice He Could Not Make, 25 The Truth Behind the Mask, 26 Return to Faepool, 27 The Bane of Two Souls, 28 The Woman Behind the Smile, 29 Shadows Between Hearts, 30 The Creek of Promises.
Removed (list-derived): ch4/ch5 design entries, Sally guest, Cliff Area, ch5 Booyeong fight, Vigil-at-ch3, CH_LOC. Design entries exist only for Prologue-3 (read from the pages).
Provisional placement from title cards: Dark Inn unlocks after ch11 (ch12 Shadows at the Inn), boat travel + Vigil Village after ch15 (ch16 The First Village).

--- v5.1: GREYSON'S DAGGER + FLAIL ---
Given in the Prologue (items + flag greyson_gift on completing ch0). Jade may NOT use them (skills Hidden Dagger / Flail Sweep) until the major battle: that chapter is still unknown,
so flag greyson_arms is only set by the Dev tab for now. When the battle chapter is known, add it to CH_FLAGS in core.js ({n:['greyson_arms']}).

--- v5.2: CHAPTERS 4-12 (from the comic pages) ---
Design entries for ch4-12 read from c4a/c4b, c5-c12. Chad and Sky now join at ch4 ("We are in"), not ch3. Dark Inn = the inn near the Tribute-Faepool border (ch12), 2 days by carriage from the capital;
ch12 must be started there (CH_LOC). New Greyson mission m_faepool (ch10). Codex: The Fifteen Territories, Jade's Engagement, Xima the Witch Concubine, The Prophecy, Levi Stanson.
Resolved: ch11 Chad denial of the bath-chamber rescue is his LIE (he did rescue her in ch8). Open:  "three months ago" history; Sky's jade pendant and Yvette Sue; Levi's scar/tattoo (ch12).
No chapter in 4-12 has a fight on its pages, so no new battles were added.

--- v5.3: CHAPTERS 13-20 (from comic pages) ---
Design entries 13-20. Ch13: Chad solo fight vs inn hands. Boat travel opens at ch15 (blue boat from Greyson); Vigil Village ch15->, forest ch18->, Frog Mahan swamp ch20->; CH_LOC for 12,16-19.
Notes: Greyson's pigeon reports Stanson dead (ch14); Chad says he's from Lingering Vale (ch15); Sally first seen ch16; ransom note spells "Booyeon" (ch18); the witch is "Ximan" on the ch20 page (Xima elsewhere) — spelling to confirm.
Mature scenes (ch14, 17) summarised neutrally.

--- v5.4: CHAPTERS 21-30 (from comic pages) — all 31 entries now done ---
Name fixes: Xima is short for Ximanka ("Ximan" on the ch20 page); "Booyeon" in ch18 is an author typo, corrected to Booyeong from ch21.
Canon corrections: Sally (Sally Sin) is only INTRODUCED in ch28 (profile visible, bond forming with Chad) — she does NOT join; JOIN_CH no longer has her. Levi appears ch29, gives the crossbow and joins at ch30.
Chad says in ch25 his true name is Roc Chadwick and he is a prince of Dragonvale. Comic banners applied as bond changes (CH_BOND): ch24 Jade+Sky Sibling Bond, ch25 Jade+Chad +1, ch27 Chad -1, ch29 Sky +1.
Fights: ch21 Jade solo, ch27 Booyeong assault (boss), ch29/30 bandits. greyson_arms (dagger+flail) unseals at ch27 (PROVISIONAL "major battle"). New: Booyeong's Camp location; non-canon later locations parked at ch99.
- (corrected) Chad's "Roc Chadwick" (ch25) is a deception; real name Roc Chadstone. He is NOT married, but has concubines and a consort he is passionate about, DELILAH (not told to Jade). When the party goes to Dragonvale in later chapters he becomes engaged to a foreign princess (the "Foreign Princess" placeholder). Devon and Delilah are Dragonvale characters.

--- v5.5: CHAPTERS 31-33, 35-37 (34 not uploaded yet) ---
Art ch31-37 converted to WebP (assets/comics/ch31..37). 34 shows "(?)" with no art. Bond banners applied (CH_BOND): ch31 Jade+Chad -2, ch32 Jade+Levi +1, ch33 Jade+Levi +1 / Chad -1.
NOT modelled: Sky+Levi +1 (ch32) and Chad+Sally +1 (ch33) — the bond system is bond-with-Jade only. Ch35 = first Xima-minion fight (new enemy). Ch32 explains the "Stanson dead" pigeon: Levi stayed officially dead (Greyson's cover).
Spoiler note: ch33 has Jade state she knows of Chad's "women in Dragonvale" and his claim to the throne.

--- v5.6: CHAPTER 34 "A Week of Silence" (from the page) ---
Added with art ch34.webp; 31-37 now complete. Bonds applied: Jade+Levi +1; "Jade+Chad distance increases" = -10 (small). Sky+Levi / Chad+Sally banners not modelled.
DEV PLAN (author, NOT canon until pages exist) for ch38 "The Village Beneath the Mask": symbols are tracking marks (they are being studied); Greyson sends a coded book: "Do not pursue the enemy's nest";
Levi becomes strategist ("someone is guiding us"); Sally asks Chad if he's hiding from Jade; Sky finds villagers with a slow corruption (victims, not soldiers); Jade's touch partly cleanses one ("your power is meant to restore");
Xima: "So the Gold child has finally returned... Bring them to me." Ch39 = false victory / ambush. NOTE: ch36-37 pages already show the corruption/villager discoveries, so check the ch38 art for overlap.

--- v5.7: CHAPTER 38 (from the page) ---
Added with art ch38.webp. The earlier DEV PLAN matched the page closely. Bonds: Jade+Levi +1, Sky+Jade +1 (Sky bond to Jade applied via CH_BOND), Chad+Sally not modelled.

--- v5.8: CLEANSING TOUCH + CORRUPTED VILLAGERS ---
Jade skill Cleansing Touch unlocks at ch38 (flag cleansing_touch): 2.5x vs 'corrupt' foes + cleanse. New enemy Corrupted Villager (trait corrupt): at 0 HP they are "freed, alive" instead of slain (flavour; still counts as a defeat). Training preset added.

--- v5.9: CH39 + GEAR ---
Ch39 "Beneath the Quiet Village" added from its page (art ch39.webp; bonds Jade+Levi +1, Chad -5; Sky+Sally not modelled).
scripts/gear.js: Gear tab = Equip (weapon/armor/accessory per hero, stat bonuses via gearBonus) + Shop (buy in settlements, sell at half). Equipped gear leaves the pack; per-hero restrictions (for:[...]);
Greyson's dagger/flail stay sealed until flag greyson_arms. Prices/stats PROVISIONAL. Not built yet: consumable use, gear drops from random fights, armor sets.
- See docs/DRAGONVALE_PLAN.md for the Jenika / Serena / Handmaiden plan (spoilers).

--- v6.0: VILLAGE LIFE + BOSS GEAR DROPS ---
Vigil "Village Life" spot (unlocks after ch34): once-per-day activities (teach archery with Levi, help Sky, Haren's stories, news with Sally, chores) for bonds, XP, herbs, gold, rumours; "Rest until tomorrow" advances the day.
Gear drops: Booyeong now drops Ridge Cloak / Bandit Lord's Blade (first clear guaranteed blade); Bearded Mouse, Xima Minion have small gear drop chances (new gear in gear.js).

--- v6.1: PERSISTENT HP/MP + CONSUMABLES ---
scripts/items.js: heroes keep HP/MP between real battles (sandbox does not); a fallen hero is left at 20%. Recovery: inn rest (tavern spots, gold, full, 1 day), potions, +10% per travel/rest day.
Consumables: Herbal Tonic, Moon Healing Tonic, Purification Elixir, Spirit Restoration Potion, Dragon Blood Remedy (rare). Use from Items tab or the battle Items action (costs the turn); buy in the Gear > Shop; brew a tonic from 3 herbs.
Dragon Vale pavilion (Jenika) can now sit on top of this. Ch40 (major battle) sets flag greyson_arms to unseal Greyson's dagger+flail (CH_FLAGS 40; chapter 40 itself still has no entry/art).

--- v6.2: AUTO BATTLE ---
scripts/autobattle.js: Auto button in battle. Unlocks when the story reaches chapter AUTO_CH (12) OR average party level reaches AUTO_LV (10); disabled in boss fights. AI heals/tonics weak allies, uses area skills vs 3+ foes,
else the strongest affordable skill on the weakest foe. Stop any time. (AUTO_CH / AUTO_LV provisional, top of autobattle.js.)

--- v6.3: CH40-41 + AUTO BACKUP ---
Ch40 "The Night Before the Offering" and Ch41 "The Offering at Moonrise" added from pages (art ch40/41.webp). Ch41 is the MAJOR BATTLE (greyson_arms unseals at 41, not 40): new enemies Crimson Cultist, Veil Stalker, Offering Lantern, boss The Offering Warden (+ gear Cultist Robe, Warden's Lantern). Auto-battle is off there (boss).
Auto backup (savedata.js, Save tab): after every real battle -> rolling local backup (last 3) + Gist push if a token is saved; on leaving the page -> JSON download (max 1 per 10 min, only if progress changed; browsers may block). Toggles + Restore in the Save tab.

--- v6.4: CHAPTERS 42-51 (Dragonvale arc) ---
Entries 42-51 from pages (art ch42-51.webp). New: Dragonvale hub (unlock ch43; route from the capital, carriage 6d / ship 4d); Guest Wing, Royal Healing Pavilion (Jenika: free daily full restore + crafting tonics/remedies).
Sky DISABLED from ch42 (stays in party, cannot fight; Dev 'Clear disabled'); Levi LEAVES the party at ch50 and cannot rejoin via recruit(); bracelet + sealed box at ch44 (box removed at ch50); Sally gets Noble Grace at ch51.
Devon not recruitable yet; Ripley/Chad exits/wedding pending. Dragon Vale hunt/sanctuary/pearl spots stay parked (ch99).

--- v6.5: RIPLEY + CHARACTER AUDIT ---
Ripley (Court Archer, portrait assets/party/ripley.webp) joins ch52; Devon joins ch54; profiles visible from ch46/47. Ch52-54 have no entries yet (Journal shows "(?)").
Disabled heroes no longer take an active slot; heroes who left keep their name in the party list. See docs/CHARACTER_AUDIT.md for the class/skill review against the comic.

--- v6.6: AUDIT FIXES ---
Jade golden blood at ch42 + Eclipse Saint; Chad martial kit (dark arts gated, flag chad_dark_arts); Sally info/charm recast; Levi Shadow Archer (bow); Black Pearl naming. See docs/CHARACTER_AUDIT.md.

--- v6.7: CHAPTERS 52-56 ---
Entries 52-56 from pages (art ch52-56.webp). Ripley joins 52, Devon 54 (banners). New: Sally court gossip (flag sally_gossip, Dragonvale Guest Wing), Royal Archives investigation + mission The Late Empress's Archive (ch53), Codex entries. Ch57 (wedding) pending: chapters 57 shows (?).

--- v6.8: DEVON KIT + JENIKA PORTRAIT ---
Devon recast as defensive mage/swordsman (see docs/CHARACTER_AUDIT.md). Jenika portrait: assets/areas/jenika.webp (pavilion banner) and jenika_512.webp (avatar in the pavilion panel).

--- v6.9: CHAPTERS 57-60 ---
Wedding (57), Princess of Dragonvale + attires (58), bond with Roc severed + Cavern of Fireflies (59), Jade poisoned (60). Chad's bond resets to 0 and no longer grows (flag roc_severed). New area Cavern of Fireflies (boat from Dragonvale, free daily rest). Sky is re-enabled when chapter 61 completes (CH_ENABLE).

--- v7.0: CHAPTERS 61-62 ---
Jenika/Sky beat (61); poison trail (62). New: Old Royal Archives investigation + mission The Erased Name, Masked Contracts board in Dragonvale (vigilante bounties from ch62). See docs/DRAGONVALE_YEAR_PLAN.md for the one-year arc plan.

--- v7.1: REWARDS ---
New Rewards tab (scripts/rewards.js): 7-day daily login cycle and AFK rewards (up to 8h, scaled by party level). New splash screen asset. Original PNG uploads removed (the WebP conversions are used).

--- v7.2: CAST ---
New Cast tab (profile sheets: assets/cast/*.webp, unlock at ch47 and ch65). Seraphina's final portrait replaces the placeholder.

--- v7.3: VOYAGE ---
First sailing capital -> Dragonvale is a staged 6-day voyage (scripts/voyage.js): storm, sea monster, abandoned island, ancient ruins, mist, then the Dragonvale reveal. Later crossings use the normal 4-day passage.
Dragonvale now unlocks only after ch44 with the bracelet (flag), for the trip to save Sky.

--- v7.4: CHAPTERS 63-73 ---
Court of Suspicions to The Exiled Prince (art ch63-73.webp). Seraphina arrives 65, revealed 66; Roc/Seraphina marry 68; backlash 70-72; Roc exiled at 73 (Liora entrusted to Jade and Devon); one-year time skip, quests begin at 74. New: Restricted Archive investigation + mission The Access Log (ch71). Levi's return and Sally's departure moved to ch87 (CH_RETURN / CH_STAY).

--- v7.5: MAPS + PWA ---
World maps in the Travel tab (assets/maps/tribute.webp, dragonvale.webp; Dragonvale map unlocks with Dragonvale). PWA: manifest.webmanifest, sw.js (offline app shell), placeholder icons in assets/icons (replace with final art, same file names). Bump VERSION in sw.js when you want to force-refresh caches.

--- v7.6: ICONS + CHAPTER 75 ---
Final PWA icons (square, compass-only maskable, favicon). Chapter 75 'Whispers at the Border' sets the quest pattern: Main Story Quest with objectives (new 'steps' mission type), new area Dragonvale Border (border villages, ancient ruins; the source is locked until its chapter), Shade Beast enemy, masked contract.

--- v7.7: CHAPTERS 74, 76, 77 + FIELD INVESTIGATION ARC ---
Quest-period chapters 74-77 from the pages (art ch74/76/77.webp). Steps missions now support spot/visit/boss/mission/kill objectives (stepDone, checkSteps). New: Ancient Dragonvale Ruins dungeon (Forgotten Hall, Corrupted Spirit Chamber, Guardian boss, Seal Core boss), corruption gauge and purification (Devon: Spirit Purification, Twin Dragon Harmony), Jade: Guardian's Promise, story passives (Princess Guardian, Royal Spirit Authority), Spirit Caves and Cultivation Grounds, Dragonvale reputation.
