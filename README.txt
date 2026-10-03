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
