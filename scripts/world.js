/* =====================================================================
   TRIBUTE — WORLD: locations, travel routes, royal letters (pigeon ->
   bracelet), missions, quests, bounties.
   Adapted from:  Aethon Codex (land road travel + road encounters)
                  Daybreak: Crimson Tide (voyages, quest contracts, bounty board)
   Everything marked PROVISIONAL (unlock chapters, mission text, rewards,
   distances, fares) is a first draft to correct against the story.
   Game-day clock: G.day. Travel, rest and activities advance it.
   ===================================================================== */

/* ---------------- REGIONS & LOCATIONS ---------------- */
// Chapter that opens the optional Fallen Prince's Trial (Abyssal Frontier + its letter). 
const TRIAL_CH = 87;   // author: opens after the farewell to Dragonvale and the meeting with reborn Levi (ch87); the fights themselves are also level-gated (raid.js)
const REGIONS = {
  tribute:{n:'Tribute Island', icon:'🏯'}, north:{n:'Northern Frontier', icon:'🌲'}, valen:{n:'Valen Borderlands (West)', icon:'🌄'}, faepool:{n:'Faepool Territory', icon:'🌲'},
  border:{n:'Border & Sea Areas', icon:'🌊'}, dragon:{n:'Dragon Vale', icon:'🐉'}, unknown:{n:'Unknown Lands', icon:'❔'}
};
// unlock: {ch:n} story chapter n completed | {flag:'x'} | null = always.   PROVISIONAL chapter numbers.
// kind: hub | town | harbour | field | story | boss | sea | region | unknown     (settlements receive pigeons)
// spot kinds: palace training archive garden tavern board hunt gather investigate boss
const LOCATIONS = {
  capital:{ n:'Imperial Capital', region:'tribute', kind:'hub', icon:'🏯', unlock:null, img:'assets/areas/imperial_capital.webp',
    desc:'Seat of King Greyson. Main hub: missions, training, shops and story.',
    spots:[
      {id:'reports_review', kind:'investigate', n:'Review the Reports with Greyson and Adrian', icon:'🗂️', ch:147, need:3, ambush:[], lo:38,
       desc:'New reports from across Tribute.',
       clues:['Strange disturbances, missing settlements and dangerous entities are reported from across Tribute.','Since the Broken Seals, incidents have increased.','Fifteen major entities have been identified across the continent.'], rw:{xp:16000, gold:3200}},
      {id:'register_examine', kind:'investigate', n:'The Fifteen Register', icon:'📜', ch:147, need:3, ambush:[], lo:38, needFlag:'inv_reports_review', lockMsg:'🔒 Finish the previous clue first',
       desc:'Adrian\'s copied records of the Fifteen Evils of Tribute.',
       clues:['The register lists thirteen names, from the Thorned Widow to the Endless Winter. Two names are still blank.','The records were copied and passed down for centuries by people who feared what they did not understand.','Devon: "They may not tell the whole truth. Each may have a history, a purpose, or a truth we do not yet understand."'], rw:{xp:16500, gold:3300}},
      {id:'first_evil_rumours', kind:'investigate', n:'Rumours of the First Evil', icon:'🗣️', ch:147, need:3, ambush:[], lo:38, needFlag:'inv_register_examine', lockMsg:'🔒 Finish the previous clue first',
       desc:'Gather rumours about the first of the Evils.',
       clues:['Travellers are vanishing and merchants are not returning.','Lights have been seen in the forests at night.','Seraphina: trade routes and foreign merchants may trace the patterns.'], rw:{xp:17000, gold:3400}},
      {id:'sally_letters', kind:'investigate', n:'Sally\'s Letters from Dragonvale', icon:'💌', ch:148, need:3, ambush:[], lo:38,
       desc:'Several letters, filled with detailed reports and witness accounts.',
       clues:['Entire villages near the northern forest have been attacked.','People are disappearing without a trace; strange creatures are seen in the forest at night.','The locals believe it is the first of the Fifteen Evils.'], rw:{xp:17500, gold:3500}},
      {id:'witness_accounts', kind:'investigate', n:'Review the Reports and Witness Accounts', icon:'📝', ch:148, need:3, ambush:[], lo:38, needFlag:'inv_sally_letters', lockMsg:'🔒 Finish the previous clue first',
       desc:'First-hand accounts from Sally\'s letters and other sources.',
       clues:['Sally: a dark presence is growing stronger in the northern forest. The forest, once lively, has fallen strangely silent. Even the beasts have fled.','The reports match other rumours: travellers vanishing, merchants not returning, lights in the forest at night. This is no bandit activity.','The local people fear the First Evil\'s name, though they do not know its true form.'], rw:{xp:18000, gold:3600}},
      {id:'palace', kind:'palace', n:'Imperial Palace', icon:'👑', img:'assets/areas/imperial_palace.webp', desc:'King Greyson, his advisors and the court. Main missions are issued here.'},
      {id:'training', kind:'training', n:'Imperial Guard Training Grounds', icon:'⚔️', img:'assets/areas/training_grounds.webp', desc:'Safe zone. No monsters. Sword practice, meditation and ability training.'},
      {id:'archive', kind:'archive', n:'Imperial Archive', icon:'📚', desc:'The Codex: history, prophecy, Xima research and Dima\'s records.'},
      {id:'three_cases', kind:'investigate', n:'Review the Three Recent Cases', icon:'🗂️', ch:162, need:3, ambush:[], lo:49,
       desc:'Three encounters, each called Evil.',
       clues:['Evil I, the Corrupted Guardian: consumed by corruption, and destroyed.', 'Evil II, the Misidentified Protector: protecting what humans had violated.', 'Evil III, the Historical Victim: a victim of history who still became dangerous, and had to be contained.'], rw:{xp:38500, gold:8100}},
      {id:'register_three', kind:'investigate', n:'Examine the Fifteen Register', icon:'📚', ch:162, need:3, ambush:[], lo:49, needFlag:'inv_three_cases', lockMsg:'🔒 Finish the previous clue first',
       desc:'The Register, with its first three entries.',
       clues:['Orin Vale: "For decades, I catalogued them as the Fifteen Evils. That was the understanding passed down through generations."', '"Your findings are forcing the Register itself to change."', 'Adrian: "A name does not guarantee a single reality."'], rw:{xp:39000, gold:8200}},
      {id:'register_update', kind:'investigate', n:'Witness the Register Update', icon:'✒️', ch:162, need:3, ambush:[], lo:49, needFlag:'inv_register_three', lockMsg:'🔒 Finish the previous clue first',
       desc:'The first revision.',
       clues:['The Mourning Hart: original classification, hostile cursed beast.', 'Revised classification: ancient territorial guardian, corruption uncertain.', 'Orin Vale: "If the records are wrong... then every future entry may change."'], rw:{xp:39500, gold:8300}},
      {id:'evil_title', kind:'investigate', n:'Why the Title "Evil" Guaranteed Nothing', icon:'⚖️', ch:162, need:3, ambush:[], lo:49, needFlag:'inv_register_update', lockMsg:'🔒 Finish the previous clue first',
       desc:'One name, three truths.',
       clues:['"The same name concealed three completely different realities. A corrupted monster. A rightful protector. And a wounded soul shaped by the past."', '"We cannot rely only on old names or inherited fear."', 'Jade: "From now on, we will not assume. We will investigate, listen, and judge with our own eyes."'], rw:{xp:40000, gold:8400}},
      {id:'cases_compare', kind:'investigate', n:'Compare the First Three Cases', icon:'⚖️', ch:163, need:3, ambush:[], lo:50,
       desc:'The Register\'s revised entries.',
       clues:['Sky: "Three labels. Three entirely different truths. A corrupted guardian, a protector, and a historical victim."', 'Evil I, originally an ancient guardian spirit and rampaging corruption entity, is now a corrupted guardian: destroyed.', 'Evil III, originally a hostile undead ruler and village destroyer, is now a historical victim who became dangerous: contained.'], rw:{xp:40500, gold:8500}},
      {id:'who_copied', kind:'investigate', n:'Learn Who Copied the Official List', icon:'🖋️', ch:163, need:3, ambush:[], lo:50, needFlag:'inv_cases_compare', lockMsg:'🔒 Finish the previous clue first',
       desc:'Copyists known, author unknown.',
       clues:['Orin Vale: "The official list has been copied for centuries."', '"We know the copyists, the scholars, priests and archivists who reproduced it across generations."', '"But we do not know the original author."'], rw:{xp:41000, gold:8600}},
      {id:'terminology_changed', kind:'investigate', n:'Why the Terminology Changed', icon:'🔤', ch:163, need:3, ambush:[], lo:50, needFlag:'inv_who_copied', lockMsg:'🔒 Finish the previous clue first',
       desc:'The word "Evil" is later than the oldest records.',
       clues:['Eira: "This terminology is not from the oldest Keeper records."', '"It appears only after the Keeper oath was altered."', '"The language, classifications, and even the word Evil reflect a later period."'], rw:{xp:41500, gold:8700}},
      {id:'oath_mystery', kind:'investigate', n:'The Mystery Behind the Altered Keeper Oath', icon:'📜', ch:163, need:3, ambush:[], lo:50, needFlag:'inv_terminology_changed', lockMsg:'🔒 Finish the previous clue first',
       desc:'A map of rewritten history.',
       clues:['Adrian: "It may not be a record of truth, but a record of how truth was later interpreted and rewritten."', 'Jade: "So even the name Evil may be part of a rewritten history."', 'Levi: "Each one may hide a different truth, shaped by the time, the politics, or the people who wrote it."'], rw:{xp:42000, gold:8800}},
      {id:'numbering_gap', kind:'investigate', n:'Examine the Register and Find the Gap', icon:'🔢', ch:164, need:3, ambush:[], lo:51,
       desc:'A gap in the numbering.',
       clues:['Adrian: "The numbering is wrong. It jumps directly from III to V."', '"There is no Entry IV in the official list."', 'Orin Vale: "It exists in archives across many kingdoms. But no one knows who first created it."'], rw:{xp:42500, gold:8900}},
      {id:'keeper_vs_copies', kind:'investigate', n:'Compare Keeper-Era Documents with Later Copies', icon:'📜', ch:164, need:3, ambush:[], lo:51, needFlag:'inv_numbering_gap', lockMsg:'🔒 Finish the previous clue first',
       desc:'Original against copy.',
       clues:['In the older Keeper-era records, the numbering and terminology are different.', 'Entry IV existed in earlier documents.', 'In later copies it is missing, and the terminology changes match the period after the Keeper oath was altered.'], rw:{xp:43000, gold:9000}},
      {id:'removed_page', kind:'investigate', n:'The Page That Was Removed', icon:'✂️', ch:164, need:3, ambush:[], lo:51, needFlag:'inv_keeper_vs_copies', lockMsg:'🔒 Finish the previous clue first',
       desc:'Not destroyed. Removed.',
       clues:['"The page was cleanly removed. This is not the result of fire, water, or decay."', '"The binding shows it was carefully extracted."', '"The cuts are clean and precise. This was done deliberately, not by accident."'], rw:{xp:43500, gold:9100}},
      {id:'who_removed', kind:'investigate', n:'Who Removed It', icon:'🕵️', ch:164, need:3, ambush:[], lo:51, needFlag:'inv_removed_page', lockMsg:'🔒 Finish the previous clue first',
       desc:'Someone wanted it hidden.',
       clues:['Eira: "Someone did not want future generations hunting Evil IV."', '"They removed it from the official record, from every copy that followed. But they left the other entries intact. Why?"', '"Someone had the power to alter history itself."'], rw:{xp:44000, gold:9200}},
      {id:'missing_files', kind:'investigate', n:'The Missing Shelves', icon:'🗄️', ch:98, need:3, ambush:[], lo:1,
       desc:'Old border logs, healer registries and restricted family records. Sections have been taken by hand.',
       clues:['Entire sections of the shelves are gone: deliberately taken, not lost over time.','Pages were removed by hand from the border logs, healer registries and restricted family records.','The Family Records (Valen Lineage) file is empty, and its seal was broken and resealed.'], rw:{xp:1500, gold:400}},
      {id:'yvette_records', kind:'investigate', n:'Healer Registry: Yvette Sue Valen', icon:'📜', ch:98, need:3, ambush:[], lo:1, needFlag:'inv_missing_files', lockMsg:'🔒 Search the missing shelves first',
       desc:'The healer registry and Yvette\'s travel permit.',
       clues:['Healer Registry: Yvette Sue Valen, Healer, Imperial Service from Year 812.','Year 814: departure to the West Border. The Year 815 line is missing.','Travel Permit: purpose medical service, destination the Western Regions, no companions, approved by the Imperial Court. The next entry is missing.'], rw:{xp:1800, gold:500}},
      {id:'sky_files', kind:'investigate', n:'The Files Tied to Sky\'s Past', icon:'🧩', ch:999, need:3, ambush:[], lo:1, needFlag:'inv_yvette_records', lockMsg:'🔒 The trail goes west: sealed until the story reaches it', desc:'The missing files that tie Sky\'s past to Yvette Sue.', clues:['...','...','...'], rw:{xp:3000, gold:1000}},
      {id:'garden', kind:'garden', n:'Imperial Garden', icon:'🌸', img:'assets/areas/imperial_garden.webp', desc:'Quiet meditation, bond scenes and character events.'},
      {id:'hall', kind:'board', n:'Notice Board', icon:'📜', ch:3, desc:'Contracts and bounties for the party.'},
      {id:'gift_stall', kind:'gift', n:'Moon-Blossom Tea Stall', icon:'🍵', ch:88, desc:'A tea and herb stall that sells a gift set for a healer who asks for nothing.'},
      {id:'streets', kind:'tavern', n:'City Streets & Tavern', icon:'🍶', ch:3, desc:'Meals and rumours.'}]},
  gold_residence:{ n:'Gold Residence', region:'tribute', kind:'story', icon:'🏡', unlock:{ch:89},
    desc:'The Gold family home in Tribute: golden trees, a training court and a long table. Jade\'s family: Unique Gold, Elara Valor and Adrian Gold.',
    spots:[
      {id:'gold_manor', kind:'base', n:'Gold Manor (Your Home)', icon:'🏡', ch:90, desc:'The Gold family manor in Tribute. Rest for free, eat at home, keep a stash.'},
      {id:'gold_home', kind:'goldhome', n:'Family Home', icon:'🏡', ch:90, desc:'Dinner with the family, the training court and old stories. Once a day each.'},
      {id:'gold_albums', kind:'investigate', n:'Family Albums and Portraits', icon:'🖼️', ch:92, need:3, ambush:[], lo:1,
       desc:'Old portraits and letters about Elara\'s sister, Yvette Sue Valen.',
       clues:['A framed portrait: Elara and her half-sister Yvette Sue Valen, a healer. They shared a mother but not a gift.','Elara\'s visions could not find Yvette: no trace, as if she vanished from this world.','Sky\'s healing is like Yvette\'s technique, and his face and manner remind the family of her.'], rw:{xp:1200, gold:300}},
      {id:'yvette_trace', kind:'investigate', n:'Yvette\'s Trail', icon:'🧭', ch:999, need:3, ambush:[], lo:1, desc:'What happened to Yvette Sue Valen, and where Sky\'s pendant went. Sealed until the story reaches it.', clues:['...','...','...'], rw:{xp:2500, gold:800}}]},
  tribute_wilderness:{ n:'Tribute Wilderness', region:'tribute', kind:'field', icon:'🌲', unlock:{ch:3},
    desc:'Roads outside the capital, forest paths and travel camps. First field exploration.',
    spots:[
      {id:'roads', kind:'hunt', n:'Roads outside the Capital', icon:'🗡️', desc:'Bandits and wild animals.', pool:['road_bandit','bandit_archer','forest_wolf'], lo:2},
      {id:'forest_paths', kind:'gather', n:'Forest Paths', icon:'🌿', desc:'Gather herbs along the paths.', loot:[{id:'forest_herb',qty:[1,2]}], ambush:['forest_wolf','road_bandit'], lo:2},
      {id:'camp', kind:'tavern', n:'Travel Camp', icon:'⛺', desc:'Camping: share a meal around the fire.'}]},
  faepool_harbour:{ n:'Faepool Harbour', region:'border', kind:'harbour', icon:'⚓', unlock:{ch:4},
    desc:'Entry to Faepool and travel hub: boats (from chapter 13), trading posts and side quests.',
    spots:[
      {id:'tavern', kind:'tavern', n:'Harbour Tavern', icon:'🍶', desc:'Sailors\' talk and hot food.'},
      {id:'board', kind:'board', n:'Harbour Board', icon:'📜', ch:5, desc:'Contracts and bounties.'},
      {id:'docks', kind:'hunt', n:'The Docks', icon:'🧤', desc:'Pickpockets, thugs and smugglers work the quays.', pool:['dock_pickpocket','dock_thug','smuggler'], lo:1}]},
  vigil_village:{ n:'Vigil Village', region:'faepool', kind:'town', icon:'🏘', unlock:{ch:15},   // ch16 "The First Village" (comic title card; sea voyage in ch15-16)
    desc:'The first village: centre, inn, market, riverside and the surrounding forest. Investigation point and festival.',
    spots:[
      {id:'tavern', kind:'tavern', n:'Local Inn', icon:'🍶', desc:'Warm beds and louder rumours.'},
      {id:'board', kind:'board', n:'Regional Quest Board', icon:'📜', ch:16, desc:'Villagers need help.'},
      {id:'shrine', kind:'meditate', n:'Vigil Shrine', icon:'⛩️', ch:999, desc:'Meditation and ancient teachings to strengthen Jade\'s clairvoyance.'},
      {id:'village_life', kind:'village', n:'Village Life', icon:'🏡', ch:34, desc:'A quiet week among the villagers: help, teach, listen. Bonds and small rewards (once per day each).'},
      {id:'riverside', kind:'gather', n:'Riverside', icon:'🎣', desc:'Fish along the river.', loot:[{id:'river_fish',qty:[1,3]}], ambush:['forest_wolf'], lo:3},
      {id:'outskirts', kind:'hunt', n:'Surrounding Forest', icon:'🐺', desc:'Wolves and bandits near the village.', pool:['road_bandit','bandit_archer','forest_wolf'], lo:3}]},
  faepool_forest:{ n:'Faepool Forest', region:'faepool', kind:'field', icon:'🌲', unlock:{ch:18},
    desc:'Exploration area: gathering, hidden paths. Xima corruption lingers.',
    spots:[
      {id:'woods', kind:'hunt', n:'Deep Woods', icon:'🐺', desc:'Forest creatures and corrupted spirits.', pool:['forest_wolf','thorn_boar','xima_sprite'], elite:'corrupted_stag', lo:2},
      {id:'herbs', kind:'gather', n:'Gather Herbs', icon:'🌿', desc:'Search the hidden paths for herbs.', loot:[{id:'forest_herb',qty:[1,3]}], bonus:{id:'xima_shard',chance:.12}, ambush:['forest_wolf','xima_sprite'], lo:2}]},
  frog_mahan:{ n:'Frog Mahan Swamp', region:'faepool', kind:'boss', icon:'🐸', unlock:{ch:20},
    desc:'Boss area: poison marsh, hidden paths, corrupted forest. Status effects and hazards.',
    spots:[
      {id:'wetlands', kind:'hunt', n:'Poison Marsh', icon:'🪱', desc:'Toads and leeches in the reeds.', pool:['bog_toad','mire_leech'], lo:8},
      {id:'moss', kind:'gather', n:'Hidden Paths (gather)', icon:'🧫', desc:'Risky foraging.', loot:[{id:'toad_gland',qty:[1,3]}], ambush:['bog_toad','mire_leech'], lo:8},
      {id:'mahan', kind:'boss', n:'Frog Mahan', icon:'🐸', desc:'One of Xima\'s weaker servants.', boss:'boss_frog_mahan', add:['bog_toad','bog_toad'], lo:10}]},
  faepool_ruins:{ n:'Faepool Ruins', region:'faepool', kind:'story', icon:'🌫', unlock:{ch:999},
    desc:'Ancient forest path, forgotten ruins and hidden caves. Puzzle areas, hidden treasure, lore and visions.',
    spots:[
      {id:'ruins_clues', kind:'investigate', n:'Forgotten Ruins', icon:'🗿', need:3, ambush:['xima_sprite','shade_wraith'], lo:8, ch:10,
       desc:'Old magic still clings here. Study the ruins; Jade\'s visions may surface.', clues:['Vision: a woman in black, sealing a gate with her own blood.','Prophecy fragment: "the golden blood will answer when the shadow wakes".','An inscription naming the witch whose curse shaped Tribute.'],
       rw:{xp:260, gold:100, items:[{id:'xima_shard',qty:1}]}},
      {id:'ruin_path', kind:'hunt', n:'Ancient Forest Path', icon:'🌲', desc:'Corrupted creatures guard the old path.', pool:['forest_wolf','thorn_boar','xima_sprite'], elite:'corrupted_stag', lo:6},
      {id:'caves', kind:'gather', n:'Hidden Caves', icon:'🕳️', desc:'Search the caves for relics.', loot:[{id:'relic_dust',qty:[1,2]}], bonus:{id:'xima_shard',chance:.2}, ambush:['xima_sprite','shade_wraith'], lo:8}]},
  dark_inn:{ n:'Dark Inn', region:'faepool', kind:'story', icon:'🌫', unlock:{ch:11},   // ch12 "Shadows at the Inn" (comic title card)
    desc:'An inn near the border of Tribute and Faepool, two days by carriage from the capital. Chapter 12 "Shadows at the Inn" begins here.',
    spots:[
      {id:'inn_clues', kind:'investigate', n:'Investigate the Inn', icon:'🕯️', need:3, ambush:['masked_assassin','shade_wraith'], lo:8,
       desc:'Something is wrong with this place. Search for clues.', clues:['A guest ledger with pages torn out.','A cold room that smells of ash and shade.','Hidden marks scratched beneath the floorboards.'],
       rw:{xp:200, gold:80}},
      {id:'tavern', kind:'tavern', n:'The Dark Inn Bar', icon:'🍶', desc:'The barman never looks up.'}]},
  river_crossing:{ n:'River Crossing', region:'border', kind:'sea', icon:'🌊', unlock:{ch:999},
    desc:'Reached by sea: boat exploration, fishing and sea encounters.',
    spots:[
      {id:'open_water', kind:'hunt', n:'Open Water', icon:'🏴‍☠️', desc:'Raiders and storm wisps.', pool:['sea_raider','storm_wisp'], elite:'river_serpent', lo:10},
      {id:'fishing', kind:'gather', n:'Fishing', icon:'🎣', desc:'Cast a line.', loot:[{id:'river_fish',qty:[1,3]}], bonus:{id:'sea_pearl',chance:.15}, ambush:['storm_wisp'], lo:10}]},
  booyeong_camp:{ n:'Booyeong\'s Camp', region:'faepool', kind:'story', icon:'⛺', unlock:{ch:20},
    desc:'A bandit camp in the forest. Booyeong\'s territory suppresses powers. Prison, cliffs and ravine.',
    spots:[{id:'camp_hunt', kind:'hunt', n:'The Camp', icon:'🗡️', desc:'Booyeong\'s men.', pool:['booyeong_guard','bandit_archer','road_bandit'], lo:8}]},
  trial_grounds:{ n:'Ancient Trial Grounds', region:'faepool', kind:'story', icon:'⚔️', unlock:{ch:999},
    desc:'An old arena that tests a party\'s teamwork. Combination attacks matter here.',
    spots:[{id:'trial', kind:'hunt', n:'The Trials', icon:'🗿', desc:'Guardians of the old trial.', pool:['stone_sentinel','relic_spirit'], lo:12}]},
  hidden_village:{ n:'Hidden Village', region:'faepool', kind:'town', icon:'🏘', unlock:{ch:999},
    desc:'A settlement that chose to hide from Xima\'s conflict. Side quests, trading and local relationships.',
    spots:[
      {id:'tavern', kind:'tavern', n:'Hidden Village Inn', icon:'🍶', desc:'Quiet people with long memories.'},
      {id:'board', kind:'board', n:'Village Board', icon:'📜', desc:'Contracts from the residents.'},
      {id:'edge', kind:'hunt', n:'Village Edge', icon:'🐺', desc:'Beasts at the settlement\'s border.', pool:['forest_wolf','thorn_boar','xima_sprite'], lo:12}]},
  corrupted_forest:{ n:'Corrupted Forest', region:'faepool', kind:'field', icon:'🌫', unlock:{ch:999},
    desc:'Xima\'s influence has taken hold here. Elite monsters, rare rewards and challenge encounters.',
    spots:[
      {id:'blight', kind:'hunt', n:'The Blight', icon:'🦌', desc:'Corrupted creatures and elite hunters.', pool:['xima_sprite','thorn_boar','shade_wraith'], elite:'corrupted_stag', lo:14},
      {id:'shards', kind:'gather', n:'Gather Xima Shards', icon:'🔻', desc:'Dangerous but valuable.', loot:[{id:'xima_shard',qty:[1,1]}], bonus:{id:'relic_dust',chance:.3}, ambush:['xima_sprite','shade_wraith'], lo:14}]},
  faepool_borderlands:{ n:'Faepool Borderlands', region:'faepool', kind:'field', icon:'🌲', unlock:{ch:999},
    desc:'The edge of Faepool, where the party\'s road starts to change.',
    spots:[{id:'border_hunt', kind:'hunt', n:'The Borderlands', icon:'🗡️', desc:'Bandits and wild beasts.', pool:['road_bandit','bandit_archer','forest_wolf','masked_assassin'], lo:14}]},
  faepool_settlement:{ n:'Faepool Settlement', region:'faepool', kind:'town', icon:'🏘', unlock:{ch:999},
    desc:'A settlement where a mysterious stranger waits.',
    spots:[
      {id:'tavern', kind:'tavern', n:'Settlement Tavern', icon:'🍶', desc:'Meals and rumours.'},
      {id:'board', kind:'board', n:'Settlement Board', icon:'📜', desc:'Contracts and bounties.'}]},
  reunion_area:{ n:'Reunion Area', region:'faepool', kind:'story', icon:'🏹', unlock:{ch:999},
    desc:'Where an old ally returns.',
    spots:[{id:'reunion_camp', kind:'tavern', n:'Reunion Camp', icon:'⛺', desc:'Share a meal around the fire.'}]},
  dragon_vale:{ n:'Dragonvale', region:'dragon', kind:'hub', icon:'🐉', unlock:{ch:44, flag:'bracelet'},   // opens only once the king's bracelet is received (ch44), for the trip to save Sky; the first chapter there is 45
    desc:'The white palace on the waterfall cliffs. Jade is received only as a guest and kept within the inner palace. Court politics and the Royal Healing Pavilion.',
    spots:[
      {id:'devon_palace', kind:'base', n:'Devon\'s Palace (Your Home)', icon:'🏯', ch:57, desc:'Jade and Devon\'s home in Dragonvale. Rest for free, eat at home, keep a stash.'},
      {id:'guest_wing', kind:'tavern', n:'Guest Wing', icon:'🏮', ch:44, desc:'Jade\'s quarters. Rest, a shared meal, and palace gossip.'},
      {id:'archive_dv', kind:'investigate', n:'Royal Archives (Hall of Records)', icon:'📚', ch:53, need:3, ambush:['stone_sentinel','relic_spirit'], lo:14,
       desc:'The sealed records of the late empress, hidden beneath the Hall of Records.', clues:['A hidden chamber with an ancient mural: Dima, Sister of Light, and Xima, Sister of Darkness, reaching for the Black Pearl.','"The Gold Child\'s Trial of Love is bound to the Black Pearl. When the pearl returns to its true owner, the two sisters shall rise again."','Documents deliberately sealed after the late empress\'s death, with important pages removed.'], rw:{xp:700, gold:250}},
      {id:'old_archives', kind:'investigate', n:'Old Royal Archives', icon:'🗝️', ch:62, need:3, ambush:['stone_sentinel','relic_spirit'], lo:15,
       desc:'Dusty authorization ledgers from the years before the poison. Someone has been erasing names.', clues:['An old Healing Pavilion access authorization with the name scratched out, but the royal seal is genuine.','A ledger gap: three weeks of entries are missing from the same period.','A scrap of a later page shows the hand of a trained physician, not a servant.'], rw:{xp:900, gold:320}},
      {id:'restricted_archive', kind:'investigate', n:'Restricted Archive', icon:'🗝️', ch:71, need:3, ambush:['stone_sentinel','relic_spirit'], lo:16,
       desc:'The sealed access ledgers of the Restricted Archive: who entered which vault, and when.', clues:['The access log: four entries (3rd, 5th, 8th and 11th Moon) for restricted storage, the alchemy archives, forbidden materials and the sealed vault.','The same rare materials listed in Levi\'s poisoning match the logged withdrawals.','A note that the entries were kept from the royal council.'], rw:{xp:1000, gold:350}},
      {id:'night_board', kind:'board', n:'Masked Contracts', icon:'🎭', ch:73, desc:'Quiet requests from ordinary people the court ignores. Jade and Devon answer them in disguise, as the Crimson Phoenix and the Silent Dragon.'},
      {id:'palace_life', kind:'family', n:'Life in the Palace', icon:'🏡', ch:83, desc:'Train the guards, visit villages, study the magical archives, and spend an evening with Liora. Once a day each.'},
      {id:'pavilion', kind:'pavilion', n:'Royal Healing Pavilion', icon:'🌙', ch:46, img:'assets/areas/jenika.webp', desc:'Jenika Moon, the royal healer: full recovery, tonics and rare remedies. Sky recovers here.'},
      {id:'vale', kind:'hunt', n:'The Vale', icon:'🦎', ch:999, desc:'Drakes and old guardians (closed while Jade is confined to the palace).', pool:['vale_drake','stone_sentinel','relic_spirit'], lo:14},
      {id:'sanctuary', kind:'investigate', n:'Dragon Sanctuary', icon:'⛩️', need:3, ambush:['stone_sentinel','relic_spirit'], lo:15, party:'devon', ch:999,
       desc:'Ancient trials and the Black Pearl storyline. Sealed.',
       clues:['A sealed inscription describes the first Pearl bearer.','The wards answer to a royal dragon bloodline.','A trial chamber opens beneath the altar.'], rw:{xp:420, gold:150}},
      {id:'pearl', kind:'boss', n:'Pearl Chamber', icon:'🔮', desc:'Special dungeon. Reward: Black Pearl related ability.', boss:'boss_pearl_guardian', add:['relic_spirit'], lo:18, party:'devon', ch:999, needFlag:'inv_sanctuary'}]},
  cavern_fireflies:{ n:'Cavern of Fireflies', region:'dragon', kind:'story', icon:'✨', unlock:{ch:59},
    desc:'A hidden healing cavern of spirit fireflies and waterfalls, known to very few. Devon\'s secret place.',
    spots:[{id:'firefly_pool', kind:'fireflies', n:'The Luminous Pool', icon:'✨', desc:'A sheltered ledge beside the luminous water. Rest and restore the party once a day.'}]},
  dragon_border:{ n:'Dragonvale Border', region:'dragon', kind:'field', icon:'🏔️', unlock:{ch:75},
    desc:'Border villages and the ancient ruins along the old mountain road. Villages are losing contact and shadows walk at night.',
    spots:[
      {id:'border_villages', kind:'investigate', n:'Border Villages', icon:'🏘️', need:3, ambush:['shade_beast','imp'], lo:17,
       desc:'Frightened villages along the mountain road. Ask questions and read the traces.',
       clues:['Three more villages have lost contact. The people are afraid to travel the old mountain road.','Not ordinary beast tracks: strong dark spiritual residue at the village perimeters.','A child: "There were lights in the ruins... and shadows like giant beasts. They took my brother."'], rw:{xp:900, gold:300}},
      {id:'border_ruins', kind:'investigate', n:'Ancient Border Ruins', icon:'🏛️', need:3, ambush:['shade_beast','stone_sentinel'], lo:18, needFlag:'inv_border_villages', lockMsg:'🔒 Investigate the missing villages first',
       desc:'Reactivated ruins once part of Dragonvale. Something is waking beneath them.',
       clues:['The seals on the ruins are weakening.','Strange lights rise from the ruins at night and spirit beasts walk out of them.','The dark spiritual energy comes from deeper beneath Dragonvale: someone is trying to break what was once sealed here.'], rw:{xp:1100, gold:380}},
      {id:'ruins_depths', kind:'investigate', n:'Beneath the Ruins', icon:'🕳️', need:3, ambush:['shade_beast','relic_spirit'], lo:19, ch:999, needFlag:'inv_border_ruins', lockMsg:'🔒 The way beneath is sealed until the story reaches it',
       desc:'The source of the spirit disturbance. Sealed until the story reaches it.', clues:['...','...','...'], rw:{xp:1500, gold:500}},
      {id:'eastern_village', kind:'investigate', n:'Eastern Border Village', icon:'🏘️', ch:85, need:3, ambush:['shade_beast','imp'], lo:21,
       desc:'A remote village plagued by corrupted spirits and restless creatures. The disturbances have grown more frequent near the eastern border.',
       clues:['The village has been living in fear: the barrier near the mountain shrine has weakened.','Reports from the eastern border: the disturbances are more frequent each week.','Greyson: the border disturbances, the awakened creatures and the weakened barriers are connected.'], rw:{xp:1500, gold:500}},
      {id:'mountain_shrine', kind:'investigate', n:'Mountain Shrine Barrier', icon:'⛩️', ch:85, need:3, ambush:['shade_beast'], lo:21, needFlag:'inv_eastern_village', lockMsg:'🔒 Visit the eastern village first',
       desc:'The ancient barrier near the mountain shrine, disturbed by lingering consequences of past forbidden events.',
       clues:['The barrier is flickering: the seal needs royal magic to steady it.','The seal is healing under their combined strength: Dragonvale\'s spirit still endures.','As the final seal is restored: "The path continues beyond this kingdom."'], rw:{xp:1800, gold:600}},
      {id:'spirit_caves', kind:'gather', n:'Spirit Caves', icon:'🕳️', ch:77, desc:'Caves where purified spirit energy gathers. Herbs and relic dust.', loot:[{id:'forest_herb',qty:[1,3]},{id:'relic_dust',qty:[1,2]}], ambush:['shade_beast'], lo:18},
      {id:'cultivation_grounds', kind:'meditate', n:'Cultivation Grounds', icon:'🧘', ch:77, desc:'A calm terrace for meditation and spirit training.'},
      {id:'purify_border', kind:'purifypoint', n:'Purification Point', icon:'✨', ch:76, desc:'A weakened seal along the border road. Devon can steady it.'},
      {id:'border_hunt', kind:'hunt', n:'Mountain Road', icon:'🐺', desc:'Shadow beasts prowl the old road at night.', pool:['shade_beast','imp'], lo:17}]},
  dragon_ruins:{ n:'Ancient Dragonvale Ruins', region:'dragon', kind:'story', icon:'🏛️', unlock:{ch:76},
    desc:'A three-floor dungeon of ancient halls, a spirit chamber and the heart of Dragonvale\'s oldest seal. Corrupted spirits walk the dark.',
    spots:[
      {id:'purify_ruins', kind:'purifypoint', n:'Purification Point', icon:'✨', ch:76, desc:'An old ward that still answers to royal magic. Devon can burn the corruption back.'},
      {id:'forgotten_hall', kind:'investigate', n:'Forgotten Hall (Floor 1)', icon:'🕯️', need:3, ambush:['shade_beast','relic_spirit'], lo:18,
       desc:'Spirit lamps, broken formations and old inscriptions. Jade reads the battle formations; Devon senses the magic.',
       clues:['Spirit lamps line the hall; lighting them in order restores a broken formation (Devon\'s Royal Spirit Sense).','Hidden paths and trap plates are visible to a trained eye (Jade\'s Warrior\'s Insight).','The inscriptions describe a seal core that stirred when something forced it to respond.'], rw:{xp:1200, gold:420}},
      {id:'spirit_chamber', kind:'hunt', n:'Corrupted Spirit Chamber (Floor 2)', icon:'☠️', desc:'Stronger corrupted spirits. Jade weakens them; Devon\'s purification finishes them.', pool:['shade_beast','relic_spirit','shade_wraith'], lo:18},
      {id:'guardian', kind:'boss', n:'Ancient Guardian Spirit', icon:'🗿', desc:'Not evil: it tests the one who comes. Jade breaks its core, Devon purifies.', boss:'boss_guardian_spirit', add:['relic_spirit'], lo:19, needFlag:'inv_forgotten_hall', lockMsg:'🔒 Investigate the Forgotten Hall first'},
      {id:'central_chamber', kind:'boss', n:'Central Chamber: the Seal Core', icon:'🐉', ch:77, desc:'The ancient seal core of Dragonvale, corrupted by whoever forced it to respond.', boss:'boss_spirit_core', seal:true, add:['shade_beast','shade_beast'], lo:20, needFlag:'boss_boss_guardian_spirit', lockMsg:'🔒 The way is sealed until the Guardian is answered'},
      {id:'seal_study', kind:'investigate', n:'Who Stirred the Seals', icon:'📜', ch:999, need:3, ambush:['shade_beast'], lo:20, desc:'Evidence of the hidden hand. Sealed until the story reaches it.', clues:['...','...','...'], rw:{xp:2000, gold:600}}]},
  moonveil_temple:{ n:'Moonveil Temple', region:'dragon', kind:'story', icon:'🌙', unlock:{ch:78},
    desc:'A hidden mountain sanctuary in eastern Dragonvale, untouched by time. Crests of the old royal line, a stone tablet, and a sealed Pearl Chamber.',
    spots:[
      {id:'moonveil_sanctuary', kind:'investigate', n:'Hidden Sanctuary', icon:'🕯️', need:3, ambush:['relic_spirit','stone_sentinel'], lo:19,
       desc:'The temple halls and the relic that shows Jade a memory.',
       clues:['An ancient relic: Jade glimpses a radiant woman, a black pearl, and the faint silhouette of a child.','Crests on the walls match the symbols of the old Dragonvale royalty: their ancestors knew this place.','A sealed inner chamber, and an ancient stone tablet inside.'], rw:{xp:1300, gold:450}},
      {id:'moonveil_symbol', kind:'investigate', n:'The Ancient Symbol', icon:'🌙', need:3, ambush:['relic_spirit'], lo:19, needFlag:'inv_moonveil_sanctuary', lockMsg:'🔒 Find the sealed chamber first',
       desc:'Match the symbol from the ruins to the tablet and the temple records.',
       clues:['The symbol predates the current royal line.','It also appears in Tribute\'s oldest records, even older than expected.','The tablet: "When the Gold Child awakens, the pearl shall return."'], rw:{xp:1300, gold:450}},
      {id:'pearl_records', kind:'investigate', n:'Black Pearl Records', icon:'📖', need:3, ambush:['relic_spirit','stone_sentinel'], lo:20, needFlag:'inv_moonveil_symbol', lockMsg:'🔒 Uncover the meaning of the symbol first',
       desc:'Study the tablet with Jenika in the Pavilion and the Royal Archives.',
       clues:['Record 1: The Pearl chooses. The Black Pearl is not simply an object. It responds.','Record 2: The Gold Child carries the balance between light and darkness.','Record 3: The guardian walks beside the chosen, but the guardian is not named. Then the tablet reveals one name: Dima.'], rw:{xp:1400, gold:500}},
      {id:'pearl_chamber', kind:'investigate', n:'Pearl Chamber', icon:'🔮', ch:80, need:3, ambush:['shade_wraith','relic_spirit'], lo:20,
       desc:'A sealed chamber deep in the temple. A fragment of the Black Pearl rests at its centre and the air holds memories.',
       clues:['Dima was not simply a spirit: a guardian, a protector, a bridge between light and darkness, tied to the pearl and to a child of light.','Pages are missing: someone deliberately removed the most important parts.','Touching the pearl: Dima, a woman of light, a weeping mother, a battlefield, a promise. "The child of gold shall return when darkness rises."'], rw:{xp:1600, gold:550}}]},
  abyssal_frontier:{ n:'Abyssal Frontier', region:'dragon', kind:'story', icon:'🌑', unlock:{ch:TRIAL_CH},
    desc:'The exile border, a corrupted region where monsters gather and villagers vanish. Roc\'s dark magic is leaking here.',
    spots:[
      {id:'exile_trail', kind:'investigate', n:'The Exile Trail', icon:'🥀', need:3, ambush:['shade_beast','shade_wraith'], lo:18,
       desc:'Gathering monsters, missing villagers and strange dark energy. Follow it to the source.',
       clues:['Monsters are gathering near the exile road and villagers have vanished from the hamlets nearby.','The dark energy is not spreading like a war: it is leaking, like something broken that cannot stop bleeding.','The source is Roc. Not because he became evil, but because his dark magic is leaking uncontrollably.'], rw:{xp:1800, gold:600}},
      {id:'shadow_gate', kind:'trial', n:'The Fallen Prince\'s Trial', icon:'🌑', needFlag:'inv_exile_trail', lockMsg:'🔒 Follow the exile trail to its source first', desc:'Face the Shadow of Roc, then end it with Roc\'s own blade, then purify him.'},
      {id:'guardian_raid', kind:'raid', n:'Guardian Raid', icon:'🏆', needFlag:'roc_purified', lockMsg:'🔒 Only after Roc is purified', desc:'The corrupted energy left behind keeps manifesting. Repeatable guardian battles for materials and exclusive gear.'}]},
  valen_borderlands:{ n:'Valen Borderlands', region:'valen', kind:'hub', icon:'🌄', unlock:{ch:103}, img:'assets/maps/valen.webp',
    desc:'The Forgotten Western Territory: once a frontier of healers, envoys and old alliances. Broken roads, emptied outposts and records someone removed.',
    spots:[
      {id:'purify_valen', kind:'purifypoint', n:'Valen Ward Stone', icon:'✨', ch:107, desc:'A healer\'s ward stone, still faintly warm. Devon can wake it.'},
      {id:'westwatch_gate', kind:'tavern', n:'Westwatch Gate', icon:'🏰', desc:'The frontier gate on the main route east to Tribute. Rest here.'},
      {id:'sealed_order', kind:'order', n:'Present the Sealed Order', icon:'✉️', ch:104, desc:'Deliver Greyson\'s sealed order to the outpost\'s keepers.'},
      {id:'valen_crossing', kind:'board', n:'Valen Crossing Board', icon:'📜', ch:104, desc:'Contracts and bounties from the riverside outpost.'},
      {id:'moonfall_hamlet', kind:'investigate', n:'Moonfall Hamlet', icon:'🏘️', ch:104, need:3, ambush:['shade_beast','shade_wraith'], lo:22,
       desc:'A quiet refuge where travellers from Tribute were last seen. Ask what happened to the envoys.',
       clues:['Envoys from Tribute stayed here, then took the western road toward the old ruins and did not come back.','A hamlet healer remembers a woman in Imperial service long ago, with a caduceus crest on her satchel.','A courier\'s abandoned bag: letters bearing a Tribute seal, left unopened on the marsh road.'], rw:{xp:2600, gold:800}},
      {id:'ruins_of_valen', kind:'investigate', n:'Ruins of Valen', icon:'🏛️', ch:104, need:3, ambush:['stone_sentinel','relic_spirit','shade_wraith'], lo:23, needFlag:'inv_moonfall_hamlet', lockMsg:'🔒 Learn where the envoys went first',
       desc:'The buried kingdom. The old Valen records are said to lie here.',
       clues:['Shelves in the old archive have had sections removed by hand: not lost, taken.','The Valen crest of Yvette Sue is carved above the healers\' wing.','Something was erased here beyond names: a whole alliance, struck from the records.'], rw:{xp:3400, gold:1100}},
      {id:'records_hall', kind:'investigate', n:'The Old Valen Records Hall', icon:'🏛️', ch:105, need:3, ambush:['shade_wraith','stone_sentinel'], lo:23,
       desc:'Captain Rowan Mirel\'s outpost and the old Valen records hall, still standing and still kept by someone.',
       clues:['Many sections of the hall are empty. The damage is too deliberate to be time alone: the records were not destroyed, they were taken.','Someone is still maintaining the place. Someone wants the truth to stay hidden.','The seal in the dust matches the Valen healer crest seen at the border: Yvette Sue Valen.'], rw:{xp:3000, gold:900}},
      {id:'mira_talk', kind:'investigate', n:'Mira Valen and Lio', icon:'🗣️', ch:106, need:3, ambush:[], lo:23,
       desc:'Listen to the people who stayed: the local healer and the border runner.',
       clues:['Mira: "The roads broke. The envoys stopped returning. The healers thinned. But the people remained."','Lio: "We buried the missing, fed the living, and learned not to expect the capital to look back." Tribute remembers the west only when it needs something.','Mira\'s family kept what records they could. Lio: "If you want truth, don\'t ask the polished halls. Ask the people who stayed."'], rw:{xp:3200, gold:900}},
      {id:'hidden_archive', kind:'investigate', n:'The Hidden Archive', icon:'🕯️', ch:108, need:3, ambush:['shade_wraith','relic_spirit'], lo:24,
       desc:'Behind the abandoned registry hall: a second archive that is not listed anywhere. Master Teren keeps it.',
       clues:['Entire sections are gone, and some were rewritten: travel permits, healer registries, border reports, lineage records.','Others were corrected until they became lies. Someone wanted the west to lose its own memory.','Master Teren: "If you seek the truth, begin with the records no one was meant to open."'], rw:{xp:3600, gold:1000}},
      {id:'yvette_file', kind:'investigate', n:'The File on Yvette Sue Valen', icon:'📕', ch:117, need:3, ambush:[], lo:25, needFlag:'inv_hidden_archive', lockMsg:'🔒 Search the hidden archive first', desc:'The records no one was meant to open: Yvette\'s own writings.', clues:['Yvette\'s own writings: she did not disappear, she left willingly.','She discovered a third party using both Tribute and Valen against each other, and erased herself from the records to protect her family and the knowledge she carried.','Among the remaining items: her personal hair ornament, left for her family.'], rw:{xp:6000, gold:2000, items:[{id:'yvette_ornament',qty:1}]}},
      {id:'magistrate_office', kind:'investigate', n:'The Provincial Administration', icon:'🏛️', ch:109, need:3, ambush:[], lo:25,
       desc:'Magistrate Corvin Hale\'s office. He denies access to the restricted archives.',
       clues:['Hale: the west is hard to govern; old records are lost or removed for stability. By royal decree access needs imperial approval.','His answers are too practised: he knows exactly what they are looking for.','Mira: Hale has been here for years, is tied to several noble families, and many missing records were sealed under his watch.'], rw:{xp:3600, gold:1000}},
      {id:'magistrate_shadow', kind:'investigate', n:'The Magistrate\'s Shadow', icon:'🕯️', ch:110, need:3, ambush:[], lo:25, needFlag:'inv_magistrate_office', lockMsg:'🔒 Confront the magistrate first',
       desc:'Hale\'s second meeting: fear, not power.',
       clues:['The previous magistrate disappeared. Since then three more officials have been reassigned and never seen again.','The western archives are sealed under imperial directive, and the cover-up extends to other kingdoms: if he speaks openly, more people will die.','Hale gives you one forbidden page: a western lineage registry that was never supposed to exist.'], rw:{xp:3800, gold:1100, items:[{id:'forbidden_page',qty:1}]}},
      {id:'valen_portrait', kind:'investigate', n:'The Valen Family Archive', icon:'🖼️', ch:111, need:3, ambush:[], lo:25,
       desc:'Mira\'s secret copies, and a portrait.',
       clues:['The Valens served as royal medical advisors, historians and guardians of knowledge that should not be in the wrong hands.','A portrait: Yvette Sue Valen with a crowned member of Tribute\'s royal family.','After Yvette the Valen name was gradually removed from the official archives; the family kept fragments in secret.'], rw:{xp:4000, gold:1100}},
      {id:'alliance_pact', kind:'investigate', n:'The Pact Records', icon:'📜', ch:112, need:3, ambush:['shade_wraith'], lo:25,
       desc:'The mutual protection pact and the later accusations.',
       clues:['Twenty years ago Tribute and Valen signed a mutual protection pact: "For the Safety of the People, For the Preservation of Knowledge, For Generations to Come."','The later accusations of betrayal are written in a different hand and were added afterwards.','Officials who supported the alliance disappeared, and the survivors changed their accounts.'], rw:{xp:4200, gold:1200, items:[{id:'pact_record',qty:1}]}},
      {id:'village_testimony', kind:'investigate', n:'The Valen Village', icon:'🏘️', ch:113, need:3, ambush:[], lo:25,
       desc:'Listen to the people who lived through it.',
       clues:['An elder: "Do you know how many times that seal came before, and never returned?"','A woman: when the alliance ended, Tribute soldiers burned their stores of medicine.','A man\'s brother was taken for questioning and never came back: he was only a healer.'], rw:{xp:4400, gold:900}},
      {id:'third_faction', kind:'investigate', n:'The Third Faction', icon:'☀️', ch:114, need:3, ambush:['shade_wraith','imp'], lo:26,
       desc:'A surviving copy and a sealed document with the sun-and-eye symbol.',
       clues:['A record: a third faction operated in both realms, trading information, powers and people.','The faction used illusions, disease and spiritual manipulation to divide Tribute and Valen.','The symbol links to Xima\'s remaining influence, and appears whenever knowledge is erased.'], rw:{xp:4600, gold:1300}},
      {id:'healers_secret', kind:'investigate', n:'The Valen Secret', icon:'🌙', ch:115, need:3, ambush:[], lo:26,
       desc:'A quiet corner of the hidden archive, and a copied page.',
       clues:['The Valens protected a scholar, healer and seer who carried knowledge about Dima, the Gold Child and ancient restoration.','Her notes: the power was never meant for one kingdom. It belongs to the world.','The Gold Child is not a ruler: a child who can bridge kingdoms, restore what was lost and heal the rift between worlds.'], rw:{xp:4800, gold:1300}},

      {id:'yvette_letter', kind:'investigate', n:'Yvette\'s Sealed Letter', icon:'💌', ch:119, need:3, ambush:[], lo:26,
       desc:'A sealed letter found among the restored archives: not lost, only hidden until the right time.',
       clues:['Yvette explains why she trusted certain people, and warns of the dangers within the alliance.','She disappeared because she discovered the truth about the alliance: she erased herself to keep others safe and the prophecy from the wrong hands.','"The one beside the Gold Child will not be chosen by fate, but by choice."'], rw:{xp:6000, gold:1500}},
      {id:'spirit_hollow', kind:'investigate', n:'Healer Village (Spirit Healer\'s Hollow)', icon:'🌿', ch:107, need:3, ambush:['shade_beast'], lo:24, needFlag:'inv_records_hall', lockMsg:'🔒 Learn what the records hall holds first', desc:'A secluded healer village by a sacred spring, where a few still practise Yvette Sue Valen\'s methods. Sister Anwen keeps it.', clues:['Sister Anwen: the Valen methods treat the body, calm the spirit and restore the inner balance. They work with spiritual energy, not against it.','The founder, Yvette Sue Valen, believed healing should never be used as a weapon. She helped many people across the western lands, regardless of kingdom or status. Her name was respected, until it was no longer allowed to be remembered.','The Valen crest joins the healing flower and the dragon spine: life and balance. It looks like a key to something larger. There are people who watch this village.'], rw:{xp:3800, gold:1200}},
      {id:'mirror_lake', kind:'gather', n:'Mirror Lake (Reflections of the Past)', icon:'🪞', ch:104, desc:'A still lake that gives back memories. Herbs and spirit water gather at the shore.', loot:[{id:'forest_herb',qty:[2,4]},{id:'sea_pearl',qty:[0,1]}], ambush:['shade_wraith'], lo:23},
      {id:'watchtower', kind:'hunt', n:'Forgotten Watchtower (Silent Vigil)', icon:'🗼', ch:104, desc:'An old tower on the northern plains. Its watch fires went out long ago.', pool:['stone_sentinel','shade_beast','road_bandit'], elite:'stone_sentinel', lo:23},
      {id:'howling_pass', kind:'hunt', n:'Howling Pass (Windscar Mountains)', icon:'🏔️', ch:104, desc:'A wind-cut mountain pass. Beasts shelter in the rock.', pool:['shade_beast','vale_drake','forest_wolf'], elite:'vale_drake', lo:24},
      {id:'sunken_shrine', kind:'gather', n:'Sunken Shrine (Tides of Memory)', icon:'⛩️', ch:104, desc:'A drowned shrine on the Shattered Sea. Relic dust washes ashore at low tide.', loot:[{id:'relic_dust',qty:[1,2]},{id:'sea_pearl',qty:[1,1]}], ambush:['shade_wraith','relic_spirit'], lo:24},
      {id:'frontier_camp', kind:'tavern', n:'Western Frontier Camp', icon:'⛺', ch:104, desc:'An outpost in the wilds. Rest, a shared meal and the party\'s talk.'},
      {id:'seal_door', kind:'puzzle', n:'The Symbol Door', icon:'🔣', ch:107, desc:'An old door in the Ruins of Valen with four rotating symbols: dragon, moon, pearl, spirit. The healer crest hints at the order.'},
      {id:'veilwood', kind:'hunt', n:'Veilwood (Forest of Whispers)', icon:'🌲', ch:104, desc:'Whispering trees and restless spirits.', pool:['shade_beast','forest_wolf','relic_spirit'], lo:22},
      {id:'whispering_plains', kind:'hunt', n:'Whispering Plains (Fields of Lost Voices)', icon:'🌾', ch:104, desc:'Open fields where lost voices carry.', pool:['shade_beast','road_bandit','imp'], lo:22},
      {id:'mourning_marsh', kind:'hunt', n:'Mourning Marsh (Where Spirits Linger)', icon:'🕯️', ch:104, desc:'Spirits linger in the mist.', pool:['shade_wraith','relic_spirit','bog_toad'], lo:23},
      {id:'ashen_ravine', kind:'hunt', n:'Ashen Ravine (Scars of the War)', icon:'🔥', ch:104, desc:'A burned gorge from an old war.', pool:['imp','shade_beast','stone_sentinel'], lo:24}]},
  forgotten_battlefield:{ n:'The Forgotten Battlefield', region:'valen', kind:'hub', icon:'🏛️', unlock:{ch:122},
    desc:'The first zone of the Celestial Ruins region: an ancient battlefield far older than Xima\'s war: no bodies, no broken weapons, only silent statues of warriors, mages and creatures standing together against a greater enemy. The demons will not come near it.',
    spots:[
      {id:'battlefield_camp', kind:'tavern', n:'Camp Among the Statues', icon:'⛺', ch:123, desc:'A sheltered corner between the statues. Rest, a shared meal and the party\'s talk.'},
      {id:'battlefield_survey', kind:'investigate', n:'The Silent Battlefield', icon:'🗿', ch:123, need:3, ambush:['stone_sentinel','relic_spirit'], lo:27,
       desc:'No bodies, no broken weapons, no sign of battle. Only silence, and statues.',
       clues:['No bodies, no weapons, no sign of battle: only silence.','All around stand statues: ancient warriors, mages and creatures standing together against some greater enemy.','The statues face outward, as if they stood guard over something behind them.'], rw:{xp:5000, gold:1400}},
      {id:'unknown_symbol', kind:'investigate', n:'The Unfamiliar Symbol', icon:'✴️', ch:123, need:3, ambush:[], lo:27, needFlag:'inv_battlefield_survey', lockMsg:'🔒 Survey the battlefield first',
       desc:'A star-and-ring symbol carved into the stone.',
       clues:['The symbol is not Xima\'s. It is older.','Dima, in a dream: "Xima\'s curse was only the wound. Something older is awakening."','It is tied to an older force than the Fifteen Evils.'], rw:{xp:5200, gold:1400}},
      {id:'healing_residue', kind:'investigate', n:'Traces of Healing', icon:'✨', ch:123, need:3, ambush:[], lo:27, needFlag:'inv_battlefield_survey', lockMsg:'🔒 Survey the battlefield first',
       desc:'Sky feels an energy in the stones like his own.',
       clues:['Sky: "This energy... it feels like mine. No... older. But related."','The residue is gentle: healing, not destruction.','It runs along a path through the ruins.'], rw:{xp:5200, gold:1400}},
      {id:'cael_ardyn', kind:'investigate', n:'Cael Ardyn, the Last Seal Keeper', icon:'👤', ch:123, need:3, ambush:[], lo:27, needFlag:'inv_unknown_symbol', lockMsg:'🔒 Identify the symbol first',
       desc:'A golden-haired stranger who knows this place.',
       clues:['"You should not have come here. These ruins are not relics. They are warnings."','"I am Cael Ardyn, the last Seal Keeper. The Fifteen Evils are only symptoms."','Seeing Jade\'s pendant: "Then the Gold lineage has returned, and the sleeping enemy will not remain asleep for long."'], rw:{xp:5600, gold:1500}},
      {id:'older_force', kind:'investigate', n:'The Older Force', icon:'🌑', ch:123, need:3, ambush:['relic_spirit'], lo:27, needFlag:'inv_cael_ardyn', lockMsg:'🔒 Speak to the Seal Keeper first',
       desc:'What is awakening beneath the old war?',
       clues:['It is not just Xima\'s war: something far older than the Fifteen Evils is connected to this place.','The demons fled the west because of it.','The battlefield still stands. The warriors still watch.'], rw:{xp:5600, gold:1500}},
      {id:'broken_seal', kind:'investigate', n:'The First Broken Seal', icon:'🔆', ch:124, need:3, ambush:['stone_sentinel','relic_spirit'], lo:28,
       desc:'In the heart of the field, an ancient seal: cracked, but not destroyed.',
       clues:['The seal is cracked but not destroyed. "Do not mistake a crack for safety."','"A broken seal is not a door opening. It is a prison remembering it has a prisoner."','The energy is ancient: the same source as the omen.'], rw:{xp:6400, gold:1700}},
      {id:'seal_system', kind:'investigate', n:'The Seal System', icon:'📐', ch:124, need:3, ambush:[], lo:28, needFlag:'inv_broken_seal', lockMsg:'🔒 Examine the broken seal first',
       desc:'Cael explains how the seals work.',
       clues:['The seal system predates the wars of this age: before the kingdoms, there were forces the world could not contain.','The Fifteen Evils are symptoms, not the source.','This seal was not made to keep evil away, but to keep something inside that even the ancient world feared.'], rw:{xp:6600, gold:1700}},
      {id:'cael_order', kind:'investigate', n:'The Order of the Seal Keepers', icon:'📜', ch:124, need:3, ambush:[], lo:28, needFlag:'inv_seal_system', lockMsg:'🔒 Learn how the seals work first',
       desc:'Why did Cael\'s order disappear?',
       clues:['"My order was built to watch, to maintain these seals."','When kingdoms began to use the seals for their own power, the Seal Keepers were the first to fall.','"Humans always forget. And always repeat the same mistakes."'], rw:{xp:6600, gold:1700}},
      {id:'beneath_field', kind:'investigate', n:'Beneath the Battlefield', icon:'🕳️', ch:124, need:3, ambush:['stone_sentinel','shade_wraith'], lo:28, needFlag:'inv_cael_order', lockMsg:'🔒 Learn what became of the Keepers first',
       desc:'Something still remains below.',
       clues:['Someone is trying to release it, or someone is trying to escape it.','The cracks glow from below.','Somewhere beneath the battlefield, something still remains.'], rw:{xp:7000, gold:1800}},
      {id:'sanctuary_ruins', kind:'investigate', n:'The Ancient Sanctuary', icon:'🏛️', ch:125, need:3, ambush:['relic_spirit'], lo:29,
       desc:'Beyond the battlefield, the remains of a sanctuary history nearly erased. Cael leads the way.',
       clues:['Cael: "The fifteen evils are what escapes when the seals weaken."','Those who made the barriers understood balance. Dima knew of them. Xima only worsened an older wound.','A sanctuary history nearly erased, bathed in a gold light.'], rw:{xp:7200, gold:1900}},
      {id:'forgotten_light', kind:'investigate', n:'The Forgotten Light', icon:'💡', ch:125, need:3, ambush:[], lo:29, needFlag:'inv_sanctuary_ruins', lockMsg:'🔒 Reach the sanctuary first',
       desc:'Trace where the healing light comes from.',
       clues:['Sky: "This light... it feels like the energy left in the battlefield."','"It is part of the same path. Old healing. Old guardianship."','The light follows the old path toward a shrine.'], rw:{xp:7400, gold:1900}},
      {id:'forgotten_shrine', kind:'investigate', n:'The Forgotten Shrine', icon:'⛩️', ch:125, need:3, ambush:['stone_sentinel','relic_spirit'], lo:29, needFlag:'inv_forgotten_light', lockMsg:'🔒 Trace the light first',
       desc:'A shrine the kingdoms buried because they feared it.',
       clues:['Cael recognises the Gold lineage pendant: "I recognize what it means."','"Kingdoms forget. They bury what they fear."','Devon: "Then help us uncover it before more seals break."'], rw:{xp:7600, gold:2000}},
      {id:'battlefield_hunt', kind:'hunt', n:'Among the Statues', icon:'🗿', ch:123, desc:'Stone sentinels and restless relic spirits still walk the old field.', pool:['stone_sentinel','relic_spirit','shade_wraith'], elite:'stone_sentinel', lo:27}]},
  forgotten_sanctuary:{ n:'The Forgotten Sanctuary', region:'valen', kind:'hub', icon:'🕊️', unlock:{ch:125},
    desc:'A sanctuary few still remember, beyond the broken seal. The light here feels old and untouched.',
    spots:[
      {id:'sanctuary_rest', kind:'tavern', n:'The Quiet Cloister', icon:'🕯️', ch:126, desc:'Rest in the fading light. A shared meal and the party\'s talk.'},
      {id:'seris_meet', kind:'investigate', n:'Seris Valen, Saint of Forgotten Light', icon:'👑', ch:126, need:3, ambush:[], lo:30,
       desc:'The keeper of the sanctuary.',
       clues:['"Few come here seeking truth. Fewer still arrive carrying both sorrow and resolve."','She keeps forgotten knowledge here, among the fading light.','A wounded man lies near: caught in the corrupted mists on the western road, his wounds will not close.'], rw:{xp:8000, gold:2000}},
      {id:'old_light', kind:'investigate', n:'The Forgotten Light', icon:'🌟', ch:126, need:3, ambush:[], lo:30, needFlag:'inv_seris_meet', lockMsg:'🔒 Meet Seris first',
       desc:'What the light is.',
       clues:['The light here feels old. Untouched.','The old healing arts were tied to knowledge older than the recent kingdoms.','A light that healed not only bodies, but the very wounds of this world.'], rw:{xp:8200, gold:2000}},
      {id:'sky_healing', kind:'investigate', n:'Sky\'s Unusual Healing', icon:'💠', ch:126, need:3, ambush:[], lo:30, needFlag:'inv_old_light', lockMsg:'🔒 Learn about the light first',
       desc:'Sky\'s light closes wounds nothing else could.',
       clues:['Sky: "Let me help." His light reaches where the mist\'s wounds would not close.','Seris: "I know of it."','Sky: "There are things I still do not fully understand about this power either."'], rw:{xp:8400, gold:2100}},
      {id:'seris_knows', kind:'investigate', n:'Why Seris Knows the Power', icon:'🔍', ch:126, need:3, ambush:[], lo:30, needFlag:'inv_sky_healing', lockMsg:'🔒 Watch Sky heal first',
       desc:'How does she recognise it?',
       clues:['"It belongs to a healing path the world believed extinct."','Devon: Sky\'s power is tied to something older than Valen\'s erased records.','"Perhaps the past is beginning to return through those who survived it."'], rw:{xp:8600, gold:2100}},
      {id:'inner_sanctuary', kind:'investigate', n:'The Inner Sanctuary', icon:'🚪', ch:127, need:3, ambush:[], lo:31,
       desc:'Seris leads the way beyond the sanctuary gate.',
       clues:['The oldest chambers of Forgotten Light have remained untouched by time.','Memory is preserved here not in stone alone, but in healing paths, records and the light that still endures.','Jade: "This place feels older than the kingdoms themselves."'], rw:{xp:9000, gold:2200}},
      {id:'light_purpose', kind:'investigate', n:'The Purpose of Forgotten Light', icon:'🌅', ch:127, need:3, ambush:[], lo:31, needFlag:'inv_inner_sanctuary', lockMsg:'🔒 Enter the inner sanctuary first',
       desc:'What Forgotten Light was for.',
       clues:['"Forgotten Light existed before borders, before courts, and before many of the names history now remembers."','"It was knowledge. Healing, preservation, and balance."','Devon: "Then what survived here was more than faith."'], rw:{xp:9200, gold:2200}},
      {id:'healer_records', kind:'investigate', n:'The Surviving Healer Records', icon:'📚', ch:127, need:3, ambush:['relic_spirit'], lo:31, needFlag:'inv_light_purpose', lockMsg:'🔒 Learn its purpose first',
       desc:'Records of a forgotten art.',
       clues:['The records speak of an art meant not only to heal flesh, but to mend the wounds left between lands, peoples and ages.','Seris: "That technique should have disappeared centuries ago."','She recognises its lineage, not its bearer.'], rw:{xp:9400, gold:2300}},
      {id:'sky_resonance', kind:'investigate', n:'Sky\'s Ancient Resonance', icon:'🔔', ch:127, need:3, ambush:[], lo:31, needFlag:'inv_healer_records', lockMsg:'🔒 Read the records first',
       desc:'Sky\'s power answers the old light.',
       clues:['Sky: "This energy... it answers the same way my power does."','Devon: "Then Sky\'s power is tied to this sanctuary."','Sky: "Why does it feel like I have been here before?"'], rw:{xp:9600, gold:2300}},
      {id:'sanctuary_secret', kind:'investigate', n:'What the Sanctuary Protected', icon:'🗝️', ch:127, need:3, ambush:['relic_spirit','stone_sentinel'], lo:31, needFlag:'inv_sky_resonance', lockMsg:'🔒 Follow Sky\'s resonance first',
       desc:'The Forgotten Light was protecting something.',
       clues:['Seris: "Not something. Someone... and a path the world abandoned."','"Because some truths do not vanish. They wait."','The sanctuary has given them direction.'], rw:{xp:9800, gold:2400}},
      {id:'preserved_paths', kind:'investigate', n:'What Forgotten Light Preserved', icon:'🛤️', ch:128, need:3, ambush:[], lo:31,
       desc:'The oldest halls keep more than relics.',
       clues:['Memory still lives in paths no kingdom had fully erased.','"This sanctuary preserved not only the healing arts, but also routes, records, and memories for times of crisis."','"When knowledge is hunted, it must learn to travel."'], rw:{xp:10000, gold:2400}},
      {id:'sky_guiding', kind:'investigate', n:'Sky\'s Guiding Light', icon:'💫', ch:128, need:3, ambush:[], lo:31, needFlag:'inv_preserved_paths', lockMsg:'🔒 Learn what was preserved first',
       desc:'The light is guiding them somewhere.',
       clues:['Sky: "This light... it\'s guiding us somewhere."','"This energy feels the same as my power... as if it has been waiting for me."','Sky: "It feels like a part of my own history."'], rw:{xp:10200, gold:2500}},
      {id:'guiding_map', kind:'investigate', n:'The Sanctuary\'s Guiding Map', icon:'🗺️', ch:128, need:3, ambush:['relic_spirit'], lo:31, needFlag:'inv_sky_guiding', lockMsg:'🔒 Follow Sky\'s light first',
       desc:'A star-map of lights over the floor.',
       clues:['A star-map of lights opens over the floor.','Seris: "Someone once prepared this path for those who would come after."','"The sanctuary cannot walk the road for you, but it can show where the next truth lies."'], rw:{xp:10400, gold:2500}},
      {id:'next_seal_route', kind:'investigate', n:'The Route to the Next Seal', icon:'🧭', ch:128, need:3, ambush:[], lo:31, needFlag:'inv_guiding_map', lockMsg:'🔒 Recover the map first',
       desc:'Where the forgotten paths lead.',
       clues:['"Beyond this sanctuary, the forgotten paths lead toward the next fracture in the old world."','Devon: "Then the next seal was never meant to be found by chance."','The map shows a forgotten region beyond the old seals, where another truth still waits.'], rw:{xp:10600, gold:2600}},
      {id:'eira_meet', kind:'investigate', n:'Eira Solenne', icon:'📖', ch:129, need:3, ambush:[], lo:32,
       desc:'A scholar of the hidden sanctuary.',
       clues:['"I am Eira. I only inherited a small part of what remains."','"Most of the knowledge was already lost long before I was born."','"Knowledge also needs someone to protect it."'], rw:{xp:10000, gold:2600}},
      {id:'light_records', kind:'investigate', n:'The Forgotten Light\'s Records', icon:'📚', ch:129, need:3, ambush:['relic_spirit'], lo:32, needFlag:'inv_eira_meet', lockMsg:'🔒 Finish the previous clue first',
       desc:'Writings, memories and maps left behind.',
       clues:['The sanctuary preserves writings, memories and maps left by the Forgotten Light.','Not to hide them, but to wait for the day someone would understand them again.','Fragments of history, healing techniques and routes to places that no longer exist.'], rw:{xp:10250, gold:2650}},
      {id:'seal_purpose', kind:'investigate', n:'The Purpose of the Seals', icon:'🔆', ch:129, need:3, ambush:[], lo:32, needFlag:'inv_light_records', lockMsg:'🔒 Finish the previous clue first',
       desc:'Why the Forgotten Light made them.',
       clues:['Sky: "These tests match the energy I felt at the seals. It\'s the same resonance."','The seals were made not only to contain, but to keep the balance between life, death, memory and the world.','"Someone changed it, deliberately."'], rw:{xp:10500, gold:2700}},
      {id:'ruins_paths', kind:'investigate', n:'The Ruins and the Ancient Paths', icon:'🛤️', ch:129, need:3, ambush:['stone_sentinel'], lo:32, needFlag:'inv_seal_purpose', lockMsg:'🔒 Finish the previous clue first',
       desc:'The connection between ruins and paths.',
       clues:['"The seals, the ruins, and these paths are pieces of the same truth."','The world was once united, and these paths linked it all.','The old connections are waking up again.'], rw:{xp:10750, gold:2750}},
      {id:'path_entry', kind:'investigate', n:'Into the Forgotten Path', icon:'🌫️', ch:130, need:3, ambush:['relic_spirit'], lo:32,
       desc:'The first section of the path.',
       clues:['It once connected the old worlds, but was sealed from sight.','It is on no modern map: only reachable through memory, symbols and places holding Forgotten Light.','"The path chooses us as much as we choose to follow it."'], rw:{xp:10900, gold:2750}},
      {id:'path_resonance', kind:'investigate', n:'Resonance and Memory', icon:'🔔', ch:130, need:3, ambush:[], lo:32, needFlag:'inv_path_entry', lockMsg:'🔒 Finish the previous clue first',
       desc:'How the path reveals itself.',
       clues:['"This path does not rely on distance, but on resonance."','It reveals itself only to those who still carry a part of the old world\'s truth.','Sky: "It\'s like a memory that doesn\'t belong to me, but somehow I remember."'], rw:{xp:11150, gold:2800}},
      {id:'path_fragment', kind:'investigate', n:'The Next Fragment', icon:'💎', ch:130, need:3, ambush:['stone_sentinel'], lo:32, needFlag:'inv_path_resonance', lockMsg:'🔒 Finish the previous clue first',
       desc:'Keys of the old world\'s seal.',
       clues:['The path was fragmented on purpose, so its power would not be misused again.','"Each fragment acts like a key."','Only fragments that are correct and in harmony reveal the next part of the path.'], rw:{xp:11400, gold:2850}},
      {id:'path_trials', kind:'investigate', n:'The Trials of the Fragments', icon:'⚖️', ch:130, need:3, ambush:['relic_spirit','stone_sentinel'], lo:32, needFlag:'inv_path_fragment', lockMsg:'🔒 Finish the previous clue first',
       desc:'The trials guard what remains.',
       clues:['"The path is testing us, not our strength, but whether we understand what the old world was trying to protect."','There are still many fragments left.','The path ahead will not be an easy one.'], rw:{xp:11650, gold:2900}},
      {id:'healing_trail', kind:'investigate', n:'The Trail of Ancient Healing', icon:'🧭', ch:126, need:3, ambush:['relic_spirit'], lo:30, needFlag:'inv_seris_knows', lockMsg:'🔒 Ask how Seris knows first',
       desc:'Where the old healing leads.',
       clues:['The same path runs from the battlefield to the sanctuary.','Sky\'s mystery is part of something far older than memory.','Someone else still keeps this knowledge.'], rw:{xp:8800, gold:2200}}]},
  celestial_ruins:{ n:'The Celestial Ruins', region:'valen', kind:'hub', icon:'🌌', unlock:{ch:130},
    desc:'A forgotten world preserved in time beyond the known lands: floating mountains, rivers between heaven and earth, and a silent city marked everywhere with the broken-seal symbol.',
    spots:[
      {id:'celestial_camp', kind:'tavern', n:'Camp on the Suspended Bridge', icon:'⛺', ch:131, desc:'Rest between the floating spires. A shared meal and the party\'s talk.'},
      {id:'region_beyond', kind:'investigate', n:'The Region Beyond the Known Lands', icon:'🏔️', ch:131, need:3, ambush:['relic_spirit'], lo:33,
       desc:'Mountains float above valleys.',
       clues:['A region untouched for centuries, preserved in time.','Mountains float above valleys; rivers flow between the heavens and earth.','"A place that time had not abandoned, but preserved."'], rw:{xp:11800, gold:2900}},
      {id:'old_murals', kind:'investigate', n:'The Murals of the Old World', icon:'🖼️', ch:131, need:3, ambush:[], lo:33, needFlag:'inv_region_beyond', lockMsg:'🔒 Finish the previous clue first',
       desc:'A time of living together.',
       clues:['Humans, beasts, mages and spiritual beings lived together, sharing knowledge and protecting the land.','Eira: "These places were not built for war. They were created to preserve a balance."','"History never truly disappears. Only people do."'], rw:{xp:12050, gold:2950}},
      {id:'healing_symbols', kind:'investigate', n:'The Healing Symbols', icon:'🌿', ch:131, need:3, ambush:[], lo:33, needFlag:'inv_old_murals', lockMsg:'🔒 Finish the previous clue first',
       desc:'Sky\'s ability answers them.',
       clues:['Sky: "I can feel healing energy within them."','They are connected to his ability, though he does not know why.','"This place is still alive, in a way, waiting for us to understand."'], rw:{xp:12300, gold:3000}},
      {id:'road_guided', kind:'investigate', n:'Along the Forgotten Road', icon:'🧭', ch:131, need:3, ambush:['stone_sentinel'], lo:33, needFlag:'inv_healing_symbols', lockMsg:'🔒 Finish the previous clue first',
       desc:'Eira guides the way.',
       clues:['Eira reads the road\'s marks.','"These ruins are the record of a world that once believed in a better future."','Levi: "And it\'s our job to listen."'], rw:{xp:12550, gold:3050}},
      {id:'why_abandoned', kind:'investigate', n:'Why the City Was Abandoned', icon:'❓', ch:131, need:3, ambush:['relic_spirit','shade_wraith'], lo:33, needFlag:'inv_road_guided', lockMsg:'🔒 Finish the previous clue first',
       desc:'The broken seal on every gate.',
       clues:['The broken-seal symbol is carved on every gate, tower and bridge.','A world that had fallen silent.','A truth that still waited beyond.'], rw:{xp:12800, gold:3100}},
      {id:'silent_city', kind:'investigate', n:'The Abandoned City', icon:'🏙️', ch:132, need:3, ambush:['relic_spirit'], lo:33,
       desc:'Homes, markets, libraries and flowers.',
       clues:['Beautiful, intact and undamaged, as if no time had passed.','Meals remain untouched on dining tables; books are still open in libraries.','Conversations left unfinished: but nobody is here.'], rw:{xp:12700, gold:3050}},
      {id:'missing_citizens', kind:'investigate', n:'The Missing Citizens', icon:'🕯️', ch:132, need:3, ambush:[], lo:33, needFlag:'inv_silent_city', lockMsg:'🔒 Finish the previous clue first',
       desc:'What happened to the people.',
       clues:['Everything is in place: the people just disappeared in an instant.','Jade: "Just like what happened to Yvette Valen... she was erased."','"Not to destroy, but to erase."'], rw:{xp:12950, gold:3100}},
      {id:'seal_decay', kind:'investigate', n:'How Seal Decay Distorts Memory', icon:'🌀', ch:132, need:3, ambush:['stone_sentinel'], lo:33, needFlag:'inv_missing_citizens', lockMsg:'🔒 Finish the previous clue first',
       desc:'The land remains, but is forgotten.',
       clues:['Eira: "When a seal weakens, it can cause memory loss in an area."','People, places and even events can disappear from history.','"The land remains, but it is removed from the world\'s memory."'], rw:{xp:13200, gold:3150}},
      {id:'guardian_warning', kind:'investigate', n:'The Guardian\'s Warning', icon:'👴', ch:132, need:3, ambush:[], lo:33, needFlag:'inv_seal_decay', lockMsg:'🔒 Finish the previous clue first',
       desc:'A frail guardian with a clear mind.',
       clues:['A single surviving guardian in a quiet temple.','"We were not attacked. We were erased."','"The one breaking the seals is not trying to destroy the world."'], rw:{xp:13450, gold:3200}},
      {id:'being_brought_back', kind:'investigate', n:'What Is Being Brought Back', icon:'🌅', ch:132, need:3, ambush:['shade_wraith'], lo:33, needFlag:'inv_guardian_warning', lockMsg:'🔒 Finish the previous clue first',
       desc:'The seal breaker\'s purpose.',
       clues:['"They are trying to bring something back."','This was not the end of a lost world.','It was the beginning of something far greater.'], rw:{xp:13700, gold:3250}},
      {id:'seal_chamber', kind:'investigate', n:'The Seal Chamber Beneath the Ruins', icon:'🕳️', ch:133, need:3, ambush:['stone_sentinel'], lo:34,
       desc:'A hidden chamber deep in the silent city.',
       clues:['The party descends beneath the ruins.','The chamber lies hidden deep within the silent city.','At its heart, a seal still stands, weakened yet alive.'], rw:{xp:13600, gold:3200}},
      {id:'deliberate_damage', kind:'investigate', n:'The Deliberate Damage', icon:'🔧', ch:133, need:3, ambush:[], lo:34, needFlag:'inv_seal_chamber', lockMsg:'🔒 Finish the previous clue first',
       desc:'The core was weakened on purpose.',
       clues:['Devon: "The core has been deliberately weakened. This was no accident."','Eira: "Not the work of a demon. Someone with deep knowledge of seals, with precision and purpose."','Levi: "Whoever did this knows exactly how much damage to cause... and how much to keep."'], rw:{xp:13850, gold:3250}},
      {id:'why_not_destroyed', kind:'investigate', n:'Why the Seal Was Not Destroyed', icon:'⚖️', ch:133, need:3, ambush:['relic_spirit'], lo:34, needFlag:'inv_deliberate_damage', lockMsg:'🔒 Finish the previous clue first',
       desc:'They wanted it to remain.',
       clues:['They wanted this seal to remain, not to be destroyed.','"This was done with intention."','Sky: the energy is older than his healing, of a different nature entirely.'], rw:{xp:14100, gold:3300}},
      {id:'chamber_murals', kind:'investigate', n:'Behind the Seal: The Murals', icon:'🖼️', ch:133, need:3, ambush:[], lo:34, needFlag:'inv_why_not_destroyed', lockMsg:'🔒 Finish the previous clue first',
       desc:'Records of a forgotten time of harmony.',
       clues:['Humans, beasts, mages and spiritual beings stand together.','Not the records of war, but of harmony.','A reminder of what this seal was meant to protect.'], rw:{xp:14350, gold:3350}},
      {id:'seal_message', kind:'investigate', n:'The Message on the Seal', icon:'✍️', ch:133, need:3, ambush:[], lo:34, needFlag:'inv_chamber_murals', lockMsg:'🔒 Finish the previous clue first',
       desc:'Carved in light itself.',
       clues:['"The world forgot the truth once. I will make it remember."','"This is more than a seal. It\'s a message."','A declaration that someone will return.'], rw:{xp:14600, gold:3400}},
      {id:'past_incidents', kind:'investigate', n:'Previous Seal Incidents', icon:'📜', ch:134, need:3, ambush:[], lo:34,
       desc:'Records from across the ruins.',
       clues:['Dima, Year 1023; Eastern Ruins, Year 986.','Stormreach, Year 954; Valmere, Year 1001; Celes Kingdom, Year 978.','Different lands, different eras: the same symbol.'], rw:{xp:14500, gold:3350}},
      {id:'compare_marks', kind:'investigate', n:'Symbols, Methods and Handwriting', icon:'🔍', ch:134, need:3, ambush:['stone_sentinel'], lo:34, needFlag:'inv_past_incidents', lockMsg:'🔒 Finish the previous clue first',
       desc:'Compare the incidents.',
       clues:['The symbol is identical; even the smaller markings match.','The order of the seals and the structure are the same.','Same handwriting, same measurements, same structure.'], rw:{xp:14750, gold:3400}},
      {id:'decades_active', kind:'investigate', n:'Active for Decades', icon:'⏳', ch:134, need:3, ambush:[], lo:34, needFlag:'inv_compare_marks', lockMsg:'🔒 Finish the previous clue first',
       desc:'One hand across generations.',
       clues:['A single person active across decades, even kingdoms.','Sky: "It belongs to someone who understands both life and death."','Eira: "Whoever did this left a consistent record over generations."'], rw:{xp:15000, gold:3450}},
      {id:'dima_meaning', kind:'investigate', n:'The Meaning Behind Dima\'s Restoration', icon:'🌱', ch:134, need:3, ambush:['relic_spirit'], lo:34, needFlag:'inv_decades_active', lockMsg:'🔒 Finish the previous clue first',
       desc:'Healing, or preparation?',
       clues:['Jade: "Was it truly meant to heal the world?"','"Or was it also part of something larger, preparation for what is coming?"','The seals, the ruins, the records and Dima\'s restoration are connected parts of a single, vast plan.'], rw:{xp:15250, gold:3500}},
      {id:'name_ruins', kind:'investigate', n:'The Name Behind the Ruins', icon:'🏷️', ch:134, need:3, ambush:['shade_wraith','stone_sentinel'], lo:34, needFlag:'inv_dima_meaning', lockMsg:'🔒 Finish the previous clue first',
       desc:'The name that was hidden.',
       clues:['At the center of it all was a name, hidden until now.','"They aren\'t just protecting the past. They are preparing the next stage."','From the shadows, someone is watching.'], rw:{xp:15500, gold:3550}},
      {id:'varyn_confront', kind:'investigate', n:'Confront Varyn Noctis', icon:'🦅', ch:135, need:3, ambush:[], lo:35,
       desc:'The Seal Breaker waits.',
       clues:['Another broken seal, and the one responsible standing before it.','"Weakening? No. I am opening what was imprisoned."','He waits, calmly, as if expecting them all along.'], rw:{xp:15400, gold:3500}},
      {id:'varyn_why', kind:'investigate', n:'Why Varyn Breaks the Seals', icon:'🗝️', ch:135, need:3, ambush:[], lo:35, needFlag:'inv_varyn_confront', lockMsg:'🔒 Finish the previous clue first',
       desc:'His reason.',
       clues:['"The royal families always believed they were protecting the world."','"But they were only protecting the lies they inherited."','"What are you trying to release?" "The truth."'], rw:{xp:15650, gold:3550}},
      {id:'what_imprisoned', kind:'investigate', n:'What Is Imprisoned Within', icon:'🔒', ch:135, need:3, ambush:['relic_spirit'], lo:35, needFlag:'inv_varyn_why', lockMsg:'🔒 Finish the previous clue first',
       desc:'What the world feared.',
       clues:['For centuries, the world feared what was sealed away.','But nobody asked why it was sealed.','Nobody knows what is truly inside.'], rw:{xp:15900, gold:3600}},
      {id:'varyn_seal', kind:'investigate', n:'Varyn at the Broken Seal', icon:'🦅', ch:136, need:3, ambush:[], lo:35,
       desc:'A faint pulse in the seal.',
       clues:['This place still holds a faint pulse, as if waiting for someone to return.','"It was rewritten."','Eira: the seal should not exist in known records.'], rw:{xp:16300, gold:3650}},
      {id:'varyn_belief', kind:'investigate', n:'Why Varyn Believes the Seals Were Made', icon:'🧠', ch:136, need:3, ambush:[], lo:35, needFlag:'inv_varyn_seal', lockMsg:'🔒 Finish the previous clue first',
       desc:'His belief.',
       clues:['"Your kind fear what you do not understand."','"So you call it evil, write it as a monster, and seal it away."','"Fear is a poor guardian of the truth."'], rw:{xp:16550, gold:3700}},
      {id:'memory_fragment', kind:'investigate', n:'The Memory Fragment', icon:'💭', ch:136, need:3, ambush:[], lo:35, needFlag:'inv_varyn_belief', lockMsg:'🔒 Finish the previous clue first',
       desc:'A buried scene.',
       clues:['"Before the seals, the world was different."','Humans, mages, beasts and others stood together in the same lands.','"A truth that someone did not want you to remember."'], rw:{xp:16800, gold:3750}},
      {id:'official_history', kind:'investigate', n:'The Truth Behind Official History', icon:'📖', ch:136, need:3, ambush:['stone_sentinel'], lo:35, needFlag:'inv_memory_fragment', lockMsg:'🔒 Finish the previous clue first',
       desc:'Question what was written.',
       clues:['The records never mentioned this seal, or the place behind it.','Varyn: "Mine inherited questions no crown wanted answered."','Devon says nothing.'], rw:{xp:17050, gold:3800}},
      {id:'varyn_response', kind:'investigate', n:'Respond to Varyn\'s Revelation', icon:'⚖️', ch:136, need:3, ambush:[], lo:35, needFlag:'inv_official_history', lockMsg:'🔒 Finish the previous clue first',
       desc:'Decide what to do.',
       clues:['Sky: the energy is neither dark nor hostile.','Eira: it matches the original Seal Keepers\' notations.','The party must decide what to do with what they have seen.'], rw:{xp:17300, gold:3850}},
      {id:'seal_kinds', kind:'investigate', n:'The Kinds of Seals', icon:'📚', ch:137, need:3, ambush:[], lo:36,
       desc:'Containment, preservation and separation.',
       clues:['Ancient texts distinguish between containment, preservation and separation.','Not every seal was made to imprison evil.','Some preserved dangerous forces; others separated lands, peoples, memories or magic after the great catastrophe.'], rw:{xp:17200, gold:3800}},
      {id:'varyn_instructions', kind:'investigate', n:'Who Left Varyn Instructions', icon:'✉️', ch:137, need:3, ambush:[], lo:36, needFlag:'inv_seal_kinds', lockMsg:'🔒 Finish the previous clue first',
       desc:'Not a whim, a design.',
       clues:['Devon: "You didn\'t start breaking the seals blindly. Someone left instructions for you."','Varyn: "Exactly."','The instructions were left by someone before him.'], rw:{xp:17450, gold:3850}},
      {id:'ancient_notation', kind:'investigate', n:'The Ancient Notation', icon:'🔣', ch:137, need:3, ambush:['stone_sentinel'], lo:36, needFlag:'inv_varyn_instructions', lockMsg:'🔒 Finish the previous clue first',
       desc:'Compare it with existing records.',
       clues:['Sky: the energy is layered, like many things sealed together.','Eira: some seals preserved dangerous forces, keeping them contained.','Levi: "Innocent lives could still be at risk."'], rw:{xp:17700, gold:3900}},
      {id:'symbol_dima', kind:'investigate', n:'The Symbol Traced to Dima', icon:'✴️', ch:137, need:3, ambush:[], lo:36, needFlag:'inv_ancient_notation', lockMsg:'🔒 Finish the previous clue first',
       desc:'Back to the Dima-era records.',
       clues:['"And it all leads back to the Dima-era records."','The symbol matches the seals of every incident.','The world believed the seals only kept monsters out.'], rw:{xp:17950, gold:3950}},
      {id:'barrier_purpose', kind:'investigate', n:'The Original Purpose of the Barriers', icon:'🔆', ch:137, need:3, ambush:['relic_spirit'], lo:36, needFlag:'inv_symbol_dima', lockMsg:'🔒 Finish the previous clue first',
       desc:'Why the truth was hidden.',
       clues:['"A simpler story is easier to control."','The truth was buried; the seals became a warning in children\'s tales.','The seals were made for many purposes, and that truth was deliberately forgotten.'], rw:{xp:18200, gold:4000}},
      {id:'seal_stabilize', kind:'investigate', n:'Stabilize the Weakening Seal', icon:'🛡️', ch:138, need:3, ambush:[], lo:36,
       desc:'Sky holds the life-energy.',
       clues:['Sky: "I can stabilize the life-energy, but only for a moment!"','The seal is destabilising faster than expected.','Hold it steady.'], rw:{xp:18100, gold:3950}},
      {id:'controlled_passage', kind:'investigate', n:'Open a Controlled Passage', icon:'🚪', ch:138, need:3, ambush:[], lo:36, needFlag:'inv_seal_stabilize', lockMsg:'🔒 Finish the previous clue first',
       desc:'Eira opens a narrow way.',
       clues:['Eira: "The mechanism is responding. We can open only a narrow passage!"','Hold it steady.','Levi: "That\'s not a prison..."'], rw:{xp:18350, gold:4000}},
      {id:'beyond_barrier', kind:'investigate', n:'What Lies Beyond the Barrier', icon:'🌍', ch:138, need:3, ambush:[], lo:36, needFlag:'inv_controlled_passage', lockMsg:'🔒 Finish the previous clue first',
       desc:'A forgotten world.',
       clues:['A world untouched by modern maps.','A civilization that had simply vanished from history.','Not a prison. Not a cage. A forgotten world.'], rw:{xp:18600, gold:4050}},
      {id:'first_choice', kind:'investigate', n:'Decide What Truth to Pursue', icon:'🧭', ch:138, need:3, ambush:[], lo:36, needFlag:'inv_beyond_barrier', lockMsg:'🔒 Finish the previous clue first',
       desc:'The next step.',
       clues:['Varyn: "Now tell me again that nothing was stolen from the world."','The choice is no longer a story. It is real.','Jade must decide what truth to pursue next.'], rw:{xp:18850, gold:4100}},
      {id:'celestial_hunt', kind:'hunt', n:'The Floating Terraces', icon:'🏔️', ch:131, desc:'Stone sentinels and relic spirits still keep the old terraces.', pool:['stone_sentinel','relic_spirit','shade_wraith'], elite:'stone_sentinel', lo:33},
      {id:'varyn_seal_gate', kind:'boss', n:'The Weakening Seal', icon:'🦅', ch:138, desc:'Varyn Noctis stands before the seal. Stop him from forcing it open.', boss:'boss_varyn', lo:36}]},
  land_beyond_seal:{ n:'The Land Beyond the Seal', region:'valen', kind:'hub', icon:'🌅', unlock:{ch:138},
    desc:'A civilization cut away from the world and forgotten: homes, schools and temples preserved behind the broken seal, with the ruins and records of the Seal Keepers.',
    spots:[
      {id:'beyond_camp', kind:'tavern', n:'The Quiet Terrace', icon:'⛺', ch:139, desc:'Rest among the preserved homes. A shared meal and the party\'s talk.'},
      {id:'barrier_people', kind:'investigate', n:'The Cut-Off Civilization', icon:'🏘️', ch:139, need:3, ambush:['relic_spirit'], lo:37,
       desc:'Homes, schools and temples behind the seal.',
       clues:['They were not imprisoned for a crime: they had homes, schools, temples and people.','Cael: the original texts mention a review period; the review never happened.','"They farmed. They studied. They built. They lived. And then they were simply forgotten."'], rw:{xp:15000, gold:3500}},
      {id:'ardyn_name', kind:'investigate', n:'The Name Ardyn', icon:'🏷️', ch:139, need:3, ambush:[], lo:37, needFlag:'inv_barrier_people', lockMsg:'🔒 Finish the previous clue first',
       desc:'A name that should not be here.',
       clues:['Among the restored fragments, Eira uncovers a name connected to Cael\'s past.','The same name appears in the ancient records and in the Seal Keeper archives Cael studied.','Cael: "It matches a record from my family\'s own archives."'], rw:{xp:15200, gold:3500}},
      {id:'two_oaths', kind:'investigate', n:'The Two Oaths', icon:'📜', ch:140, need:3, ambush:['stone_sentinel'], lo:37,
       desc:'One written in hope, one in fear.',
       clues:['Original Oath: "Guard the seals till balance returns... reopen what can be reopened."','Altered Oath: "Guard the seals forever. Let none be reopened. Let none be questioned."','Eira: the same notation and ink style: it was deliberately changed.'], rw:{xp:16400, gold:3650}},
      {id:'first_council', kind:'investigate', n:'The First Keeper Council', icon:'🏛️', ch:141, need:3, ambush:[], lo:38,
       desc:'Mages, healers, royal representatives and guardians.',
       clues:['The original oath was a joint accord of several royal houses, the spiritual orders and the first Keeper council.','Dima and Xima stood alongside the council before the world was divided.','"One of the first Seal Keepers... Ardyn."'], rw:{xp:17600, gold:3800}},
      {id:'sisters_memory', kind:'investigate', n:'Dima and Xima, Before the War', icon:'🌓', ch:142, need:3, ambush:['relic_spirit'], lo:38,
       desc:'A restored memory that ends abruptly.',
       clues:['Dima: restoration and balance. Xima: dangerous forces, corruption and containment.','They disagreed: heal and reunite damaged regions, or isolate them before corruption spreads?','The memory ends just before the event that divided them.'], rw:{xp:18800, gold:3950}},
      {id:'returning_light', kind:'investigate', n:'Bearer of the Returning Light', icon:'💠', ch:143, need:3, ambush:[], lo:39,
       desc:'A Dima-era chamber answers Sky.',
       clues:['The restoration device responds to Sky\'s bloodline and healing signature, not his identity.','A memory: a woman places a jade pendant around young Sky.','The title Bearer of the Returning Light appears on a plaque.'], rw:{xp:20000, gold:4100}},
      {id:'ardyn_inheritance', kind:'investigate', n:'The Ardyn Inheritance', icon:'🗝️', ch:144, need:3, ambush:['stone_sentinel'], lo:39,
       desc:'Cael\'s family rewrote the oath.',
       clues:['An Ardyn ancestor helped rewrite the Keeper oath after the Dima/Xima conflict.','Varyn: "You cannot change what your ancestors did... But you can choose not to repeat it."','A sealed confession waits in the restricted archives.'], rw:{xp:21200, gold:4250}},
      {id:'sealed_confession', kind:'investigate', n:'The Sealed Confession', icon:'📕', ch:145, need:3, ambush:[], lo:40,
       desc:'Study the confession of the Ardyn ancestor.',
       clues:['The council did not willingly choose to seal the world forever.','They were convinced that reopening the separated regions would let an ancient force return.','The ancestor wrote it knowing it might never be seen.'], rw:{xp:22400, gold:4400}},
      {id:'unnamed_adviser', kind:'investigate', n:'The Unnamed Adviser', icon:'👤', ch:145, need:3, ambush:['relic_spirit'], lo:40, needFlag:'inv_sealed_confession', lockMsg:'🔒 Finish the previous clue first',
       desc:'Trace the adviser\'s identity.',
       clues:['An unnamed adviser appeared in every negotiation with Dima, Xima, the royal families and the Keepers.','They presented proof that reuniting the regions would bring an ancient force back.','Their identity has been erased from the official records.'], rw:{xp:22600, gold:4400}},
      {id:'compass_symbol', kind:'investigate', n:'The Sealed Symbol', icon:'🧭', ch:145, need:3, ambush:['stone_sentinel'], lo:40, needFlag:'inv_unnamed_adviser', lockMsg:'🔒 Finish the previous clue first',
       desc:'The compass star and the ancient force.',
       clues:['The adviser\'s instructions always carried the same symbol: a compass star.','The same symbol marks the altered oath and the seal-breaker records.','It connects to the ancient force the adviser said would return.'], rw:{xp:22800, gold:4400}},
      {id:'oath_intent', kind:'investigate', n:'The True Intent Behind the Altered Oath', icon:'⚖️', ch:145, need:3, ambush:['relic_spirit'], lo:40, needFlag:'inv_compass_symbol', lockMsg:'🔒 Finish the previous clue first',
       desc:'Why the oath was changed.',
       clues:['The ancestor believed permanent separation was the only way to prevent catastrophe.','He could not trust that the adviser\'s proof was false.','He chose to seal the world, even against the will of many.'], rw:{xp:23000, gold:4400}},
      {id:'truth_before_curse', kind:'investigate', n:'The Truth Before the Curse', icon:'🌗', ch:146, need:3, ambush:[], lo:40,
       desc:'Dima and Xima speak.',
       clues:['Dima wanted balance; Xima wanted control. Their conflict created the curse.','The conflict was real but also used by a third party in the shadows.','"The Gold bloodline was never meant to defeat darkness. It was meant to choose what comes after."'], rw:{xp:24200, gold:4550}},
      {id:'beyond_hunt', kind:'hunt', n:'The Silent Streets', icon:'🗿', ch:139, desc:'Stone sentinels and relic spirits still walk the cut-off land.', pool:['stone_sentinel','relic_spirit','shade_wraith'], elite:'stone_sentinel', lo:37}]},
  northern_frontier:{ n:'The Northern Frontier', region:'north', kind:'hub', icon:'🏚️', unlock:{ch:148},
    desc:'Frontier villages, abandoned watchtowers, merchant roads and the forest entrances beyond the northern border of Tribute. The villages here were attacked overnight.',
    spots:[
      {id:'frontier_inn', kind:'tavern', n:'Frontier Inn', icon:'🏠', ch:148, desc:'Rest, a shared meal and the party\'s talk. Merchants and farmers share rumours here.'},
      {id:'frontier_villages', kind:'investigate', n:'The Attacked Villages', icon:'🏚️', ch:148, need:3, ambush:['shade_beast'], lo:38,
       desc:'Villages near the northern forest, attacked overnight.',
       clues:['Doors torn open overnight, hearths still warm, nobody home.','Villagers speak of the First Evil in whispers, but have never seen it.','The beasts have fled the forest: even the dogs will not go near it.'], rw:{xp:18500, gold:3700}},
      {id:'frontier_watchtowers', kind:'hunt', n:'Abandoned Watchtowers', icon:'🗼', ch:148, desc:'Empty watchtowers along the merchant road. Beasts shelter in them.', pool:['shade_beast','road_bandit','forest_wolf'], elite:'shade_beast', lo:38}]},
  black_forest:{ n:'The Black Forest', region:'north', kind:'hub', icon:'🌲', unlock:{ch:148},
    desc:'An ancient forest where normal creatures will not go. Spiritual and corrupted energy are entwined here. Corruption leaves one trail, spirits another.',
    spots:[
      {id:'forest_camp', kind:'tavern', n:'Field Camp', icon:'⛺', ch:149, desc:'A hidden camp at the forest edge. Rest, a shared meal and the party\'s talk.'},
      {id:'rin_meet', kind:'investigate', n:'Rin Kaede', icon:'🏹', ch:149, need:3, ambush:[], lo:39,
       desc:'A Spirit Ranger who was already on the trail.',
       clues:['"They\'re the royal party... So you\'ve come all the way too."','"Only because you were trespassing on my trail."','"I\'ve been tracking it myself. I don\'t need palace hunters slowing me down."'], rw:{xp:19000, gold:3800}},
      {id:'rin_lore', kind:'investigate', n:'What Rin Knows About the Forest', icon:'🌲', ch:149, need:3, ambush:[], lo:39, needFlag:'inv_rin_meet', lockMsg:'🔒 Finish the previous clue first',
       desc:'Learn what the Spirit Ranger knows about the northern forest.',
       clues:['"Spirit Ranger. Monster tracker."','"Corruption leaves one trail. Spirits leave another."','The forest is ancient, and heavy with a presence that did not belong to this world.'], rw:{xp:19500, gold:3900}},
      {id:'forest_physical', kind:'investigate', n:'Levi Reads the Signs', icon:'👣', ch:149, need:3, ambush:['shade_beast'], lo:39, needFlag:'inv_rin_lore', lockMsg:'🔒 Finish the previous clue first',
       desc:'Footprints, blood, damaged plants, broken arrows and old camps.',
       clues:['Levi reads the physical trail: deep claw gouges and plants withered where something heavy passed.','Branches are twisted outwards, as if something grew through them faster than it should.','The trail runs on past where a camp was abandoned in a hurry.'], rw:{xp:20000, gold:4000}},
      {id:'forest_spirit', kind:'investigate', n:'Rin Reads the Residue', icon:'🔮', ch:149, need:3, ambush:['relic_spirit'], lo:39, needFlag:'inv_forest_physical', lockMsg:'🔒 Finish the previous clue first',
       desc:'Spiritual trails, residue and disturbances.',
       clues:['Rin reads the spiritual trail: a spirit passed through at the same moment as the beast.','The residue is old, and gentle in places: not purely corrupt.','Sky: "It carries a spiritual nature as well."'], rw:{xp:20500, gold:4100}},
      {id:'unusual_trail', kind:'investigate', n:'The Unusual Trail', icon:'🧭', ch:149, need:3, ambush:['shade_wraith'], lo:39, needFlag:'inv_forest_spirit', lockMsg:'🔒 Finish the previous clue first',
       desc:'Both interpretations together show the true route.',
       clues:['Claw marks like a beast\'s, with spiritual residue, as if a spirit passed through at the same time.','Devon: "That is why your Evil has not behaved like an ordinary monster. It does not fit simple categories."','Only reading the physical and spiritual signs together shows where the trail goes.'], rw:{xp:21000, gold:4200}},
      {id:'first_evil_search', kind:'investigate', n:'Search for the First Evil', icon:'🕷️', ch:149, need:3, ambush:['shade_beast','relic_spirit'], lo:39, needFlag:'inv_unusual_trail', lockMsg:'🔒 Finish the previous clue first',
       desc:'Follow the trail deeper into the forest.',
       clues:['The trail continues deeper into the forest.','Spirits and corruption are entwined here.','"The first hunt is only the beginning."'], rw:{xp:21500, gold:4300}},
      {id:'forest_hunt', kind:'hunt', n:'The Silent Trees', icon:'🌑', ch:149, desc:'Corrupted animals and wandering spirits.', pool:['shade_beast','relic_spirit','shade_wraith'], elite:'shade_beast', lo:39}]},
  forest_of_thorns:{ n:'The Forest of Thorns', region:'north', kind:'hub', icon:'🌹', unlock:{ch:149},
    desc:'The inner forest and the territory of the Thorned Widow: vines growing unnaturally fast, thorns alive with corruption, and ruined shrines swallowed by vegetation.',
    spots:[
      {id:'thorns_camp', kind:'tavern', n:'Camp in the Clearing', icon:'⛺', ch:150, desc:'A cleared hollow where the thorns do not reach. Rest, a shared meal and the party\'s talk.'},
      {id:'thorns_enter', kind:'investigate', n:'Enter the Forest of Thorns', icon:'🌹', ch:150, need:3, ambush:['shade_beast'], lo:40,
       desc:'A region hunters fear by name alone.',
       clues:['Corruption has spread through root, beast and air alike.','The forest itself has become a hunting ground.','Devon: "Stay close. This forest wants to divide us."'], rw:{xp:22000, gold:4400}},
      {id:'thorn_spirit', kind:'investigate', n:'Follow Rin\'s Spirit Trail', icon:'🔮', ch:150, need:3, ambush:['relic_spirit'], lo:40, needFlag:'inv_thorns_enter', lockMsg:'🔒 Finish the previous clue first',
       desc:'Rin follows spirit trails.',
       clues:['"These traces are spiritual. Something passed here feeding on both fear and corruption."','Rin follows the spirit trail through the thorns.','The corruption is spreading through the roots: if it reaches the water, the whole region could change.'], rw:{xp:22500, gold:4500}},
      {id:'thorn_tracks', kind:'investigate', n:'Examine Levi\'s Monster Tracks', icon:'👣', ch:150, need:3, ambush:['shade_beast'], lo:40, needFlag:'inv_thorn_spirit', lockMsg:'🔒 Finish the previous clue first',
       desc:'Levi follows the living forest.',
       clues:['"Something heavy moved with it. Broken branches, claw depth, and blood on the bark."','Levi follows the physical path while Rin follows the spirit trail.','Sky watches for corruption surges.'], rw:{xp:23000, gold:4600}},
      {id:'widow_route', kind:'investigate', n:'Trace the Route of the First Evil', icon:'🧭', ch:150, need:3, ambush:['shade_wraith'], lo:40, needFlag:'inv_thorn_tracks', lockMsg:'🔒 Finish the previous clue first',
       desc:'Read both trails together.',
       clues:['The trail is written in claw, spirit and blood.','The path to the First Evil is no longer rumour.','The hunt will demand more than strength alone.'], rw:{xp:23500, gold:4700}},
      {id:'widow_corruption', kind:'investigate', n:'The Truth Behind the Corruption', icon:'🥀', ch:151, need:3, ambush:['shade_beast'], lo:41,
       desc:'Uncover what the corruption consumed.',
       clues:['The Thorned Widow is a twisted remnant of a once-benign forest spirit.','There are still traces of who it once was: a guardian, a widow of the forest.','Now it is only hunger, thorns and endless pain.'], rw:{xp:24000, gold:4800}},
      {id:'shrine_core', kind:'investigate', n:'Reach the Hidden Shrine\'s Core', icon:'⛩️', ch:151, need:3, ambush:['relic_spirit'], lo:41, needFlag:'inv_widow_corruption', lockMsg:'🔒 Finish the previous clue first',
       desc:'Something darker stirs at the core.',
       clues:['The forgotten shrine lies at the source of the corruption.','Even wounded, the Widow regenerates: the corruption runs too deep.','At its core, something darker still stirs.'], rw:{xp:24500, gold:4900}},
      {id:'shrine_records', kind:'investigate', n:'The Shrine\'s Weathered Records', icon:'📜', ch:152, need:3, ambush:[], lo:41,
       desc:'The shrine names it a guardian spirit.',
       clues:['"This shrine names it a guardian spirit."','The records speak of a spirit that protected this forest, healed the land and guided lost souls.','Sky: "There\'s healing energy inside it... It wasn\'t born like this."'], rw:{xp:25000, gold:5000}},
      {id:'widow_origin', kind:'investigate', n:'What the First Evil Once Was', icon:'🕊️', ch:152, need:3, ambush:[], lo:41, needFlag:'inv_shrine_records', lockMsg:'🔒 Finish the previous clue first',
       desc:'A guardian before corruption twisted it.',
       clues:['It nurtured life, healed wounds and kept balance between the mortal world and the wild.','The corruption took root, twisting its purpose and consuming its mind.','It had to be stopped, but it was not originally evil.'], rw:{xp:25500, gold:5100}},
      {id:'thorns_hunt', kind:'hunt', n:'The Living Thorns', icon:'🥀', ch:150, desc:'Corrupted beasts and thorn-wrapped spirits.', pool:['shade_beast','relic_spirit','shade_wraith'], elite:'shade_beast', lo:40}]},
  mourning_valley:{ n:'Mourning Valley', region:'north', kind:'hub', icon:'🏮', unlock:{ch:152},
    desc:'A misty mountain valley and its frightened village, where a spectral stag strikes down all who enter. Waterfalls conceal a sealed sanctuary below.',
    spots:[
      {id:'valley_inn', kind:'tavern', n:'The Mountain Village', icon:'🏮', ch:153, desc:'A frightened village at the valley\'s edge. Rest, a shared meal and the party\'s talk.'},
      {id:'village_report', kind:'investigate', n:'Hear the Villagers\' Report', icon:'🏮', ch:153, need:3, ambush:[], lo:42,
       desc:'A mountain village living in fear.',
       clues:['"That stag... it is a monster! Anyone who enters the valley does not return!"','The villagers want it killed. At first it seems like a straightforward hunt.','Jade: "We\'ll take this seriously."'], rw:{xp:26000, gold:5200}},
      {id:'valley_trail', kind:'investigate', n:'Investigate the Valley Trail', icon:'🥾', ch:153, need:3, ambush:['shade_beast'], lo:42, needFlag:'inv_village_report', lockMsg:'🔒 Finish the previous clue first',
       desc:'Tracks too large for a deer.',
       clues:['Rin: "These tracks are massive... The earth is torn deep."','Levi: "The damage is consistent along this trail. It has a clear territory."','The stag moves with immense force, not just speed.'], rw:{xp:26500, gold:5300}},
      {id:'stag_traces', kind:'investigate', n:'Follow the Stag\'s Traces', icon:'🦌', ch:153, need:3, ambush:['relic_spirit'], lo:42, needFlag:'inv_valley_trail', lockMsg:'🔒 Finish the previous clue first',
       desc:'Into the misty valley.',
       clues:['Sky: "This is not simple corruption. Its spiritual energy feels ancient... sorrowful."','It seems bound here by something unresolved.','Deep in the misty valley, the spectral stag appears, watching from the mist.'], rw:{xp:27000, gold:5400}},
      {id:'village_fear', kind:'investigate', n:'Why the Village Fears It', icon:'😨', ch:153, need:3, ambush:[], lo:42, needFlag:'inv_stag_traces', lockMsg:'🔒 Finish the previous clue first',
       desc:'Learn why the village fears the deer.',
       clues:['Any who approached it never returned.','"The villagers want it killed, and on the surface this is a hunt. But something about this feels different."','Levi: "This is more than a monster. There\'s a story here."'], rw:{xp:27500, gold:5500}},
      {id:'hart_encounter', kind:'investigate', n:'Encounter the Spectral Stag', icon:'🦌', ch:154, need:3, ambush:['relic_spirit'], lo:43,
       desc:'At the heart of the valley.',
       clues:['The valley is not silent: it pulses with a restless spirit.','"No ordinary beast moves like that."','The Mourning Hart waits at its heart: a guardian the village now calls a monster.'], rw:{xp:28000, gold:5600}},
      {id:'hart_shrine', kind:'investigate', n:'The Shrine It Guards', icon:'⛩️', ch:154, need:3, ambush:['relic_spirit'], lo:43, needFlag:'inv_hart_encounter', lockMsg:'🔒 Finish the previous clue first',
       desc:'Tracks circle the shrine.',
       clues:['Levi: "Tracks circle the shrine. It was guarding this place."','Rin: "The shrine behind it..."','Sky: "It\'s defending something. This isn\'t a mindless beast."'], rw:{xp:28500, gold:5700}},
      {id:'hart_protective', kind:'investigate', n:'Why Its Power Feels Protective', icon:'🛡️', ch:154, need:3, ambush:[], lo:43, needFlag:'inv_hart_shrine', lockMsg:'🔒 Finish the previous clue first',
       desc:'Its energy is not corruption.',
       clues:['Sky: "Its energy... this isn\'t corruption. It feels like protection."','"Because we crossed a boundary."','What the villagers feared as a killing spirit may once have been a guardian mourning something it could no longer protect.'], rw:{xp:29000, gold:5800}},
      {id:'hidden_sanctuary', kind:'investigate', n:'The Hidden Sanctuary', icon:'🌊', ch:155, need:3, ambush:['relic_spirit'], lo:44,
       desc:'Waterfalls conceal the entrance.',
       clues:['Beneath the valley lies an ancient burial ground, sealed away from the living world.','Waterfalls conceal the entrance; below rest the graves of countless souls.','Both a burial ground and a sealed spiritual sanctuary: "This is what it was protecting."'], rw:{xp:29500, gold:5900}},
      {id:'disturbed_graves', kind:'investigate', n:'The Disturbed Graves', icon:'🪦', ch:155, need:3, ambush:['shade_wraith'], lo:44, needFlag:'inv_hidden_sanctuary', lockMsg:'🔒 Finish the previous clue first',
       desc:'Tool marks, pry bars and ropes.',
       clues:['Levi: "Tracks. More than one group. They kept coming back."','They dug up the graves and stole the offerings.','Devon: "These seals were disturbed repeatedly. Human hands did this."'], rw:{xp:30000, gold:6000}},
      {id:'treasure_seekers', kind:'investigate', n:'Treasure Seekers and Officials', icon:'💰', ch:155, need:3, ambush:['road_bandit'], lo:44, needFlag:'inv_disturbed_graves', lockMsg:'🔒 Finish the previous clue first',
       desc:'Looters and soldiers.',
       clues:['Rin: "Not hunters. Looters... and soldiers."','Levi: "Treasure seekers come for the relics. And corrupt officials often send soldiers to take them."','"This was deliberate."'], rw:{xp:30500, gold:6100}},
      {id:'hart_motive', kind:'investigate', n:'Understand the Hart\'s Motive', icon:'💔', ch:155, need:3, ambush:[], lo:44, needFlag:'inv_treasure_seekers', lockMsg:'🔒 Finish the previous clue first',
       desc:'The sanctuary is wounded.',
       clues:['Sky: "The energy here is grieving. The sanctuary has been wounded."','"It is not malicious. It is wounded by human greed."','The hart\'s anger was not toward us alone, but toward all who would disturb the rest of the dead.'], rw:{xp:31000, gold:6200}},
      {id:'valley_hunt', kind:'hunt', n:'The Misty Slopes', icon:'🌫️', ch:153, desc:'Mist-wreathed slopes where lesser spirits wander.', pool:['relic_spirit','shade_wraith','forest_wolf'], elite:'relic_spirit', lo:42}]},
  crownless_marches:{ n:'The Crownless Marches', region:'north', kind:'hub', icon:'👑', unlock:{ch:156},
    desc:'An abandoned territory of ancient settlements where no life remains, and where a crowned figure walks the ruins like a king through his court. (The name is the Register\'s; it is not written on the pages.)',
    spots:[
      {id:'marches_camp', kind:'tavern', n:'Camp at the Ruins\' Edge', icon:'⛺', ch:157, desc:'A cold camp just outside the empty settlements. Rest, a shared meal and the party\'s talk.'},
      {id:'ruins_settle', kind:'investigate', n:'Investigate the Abandoned Settlements', icon:'🏚️', ch:157, need:3, ambush:['shade_wraith'], lo:45,
       desc:'Empty streets and a trail of fresh footprints.',
       clues:['Ancient settlements still stand, but no life remains within them.', 'Jade: "This place feels abandoned... but not empty."', 'Devon: "Someone has walked these streets recently."'], rw:{xp:31500, gold:6300}},
      {id:'figure_reports', kind:'investigate', n:'Follow the Reports of the Humanoid Figure', icon:'👣', ch:157, need:3, ambush:['shade_beast'], lo:45, needFlag:'inv_ruins_settle', lockMsg:'🔒 Finish the previous clue first',
       desc:'A figure that walks from ruin to ruin.',
       clues:['Levi: "The tracks are human. Or close enough to be."', 'Rin: "It moves from settlement to settlement, always near the oldest remains."', 'It does not merely wander. It speaks, and remembers names no living person recognises.'], rw:{xp:32000, gold:6400}},
      {id:'memory_energy', kind:'investigate', n:'Examine the Strange Memory-Like Energy', icon:'🔮', ch:157, need:3, ambush:['relic_spirit'], lo:45, needFlag:'inv_figure_reports', lockMsg:'🔒 Finish the previous clue first',
       desc:'Not a beast: a memory.',
       clues:['Sky: "This energy isn\'t beast-like. It\'s memory... and sorrow."', 'Worn stone tablets of names stand among the ruins.', 'Sky: "This isn\'t ordinary corruption. It\'s as if the ruins themselves are speaking through him."'], rw:{xp:32500, gold:6500}},
      {id:'forgotten_names', kind:'investigate', n:'Learn Why It Remembers Forgotten Names', icon:'📜', ch:157, need:3, ambush:[], lo:45, needFlag:'inv_memory_energy', lockMsg:'🔒 Finish the previous clue first',
       desc:'Names no living person recognises.',
       clues:['The figure murmurs: "Auren... Sel Veyr... House Merinth..."', '"Nothing to you. Everything to the dead."', 'Devon: "It speaks as if it remembers this city alive."'], rw:{xp:33000, gold:6600}},
      {id:'gold_name', kind:'investigate', n:'Learn Why He Knows the Gold Name', icon:'👑', ch:158, need:3, ambush:['shade_wraith'], lo:46,
       desc:'He knows the Gold name.',
       clues:['"Gold." The Hollow King turns his hollow eyes toward Jade, as if recognising something in her blood.', '"They are still sending Golds after us."', '"I remember your name. The blood of the first sunrise... The last heir of Solmir. You bear the same light as she did."'], rw:{xp:33500, gold:6700}},
      {id:'names_past', kind:'investigate', n:'Hear the Names from the Past', icon:'📜', ch:158, need:3, ambush:[], lo:46, needFlag:'inv_gold_name', lockMsg:'🔒 Finish the previous clue first',
       desc:'Earlier Golds, remembered by name.',
       clues:['"I remember Velran. I remember Elaris. I remember the ones who stood before you."', '"Different faces... same blood. The Golds never stop chasing."', 'Jade: "He knows... my lineage?"'], rw:{xp:34000, gold:6800}},
      {id:'evils_gold_link', kind:'investigate', n:'The Fifteen Evils and the Gold Lineage', icon:'🔗', ch:158, need:3, ambush:['relic_spirit'], lo:46, needFlag:'inv_names_past', lockMsg:'🔒 Finish the previous clue first',
       desc:'A hunt older than the Register.',
       clues:['Levi: "The Fifteen Evils... They have been hunting the Golds all this time."', 'Sky: "So the Golds... have always been their target?"', 'The Fifteen Evils were bound to Jade\'s family line, and the hunt had never ended.'], rw:{xp:34500, gold:6900}},
      {id:'hk_account', kind:'investigate', n:'Hear the Hollow King\'s Account', icon:'🗣️', ch:159, need:3, ambush:[], lo:47,
       desc:'He speaks of names, of history and of the Fifteen.',
       clues:['He did not attack. He did not retreat. He spoke instead.', '"There were never fifteen Evils."', '"There were fifteen entities designated as dangerous during the ancient crisis."'], rw:{xp:35000, gold:7000}},
      {id:'fifteen_truly', kind:'investigate', n:'What the Fifteen Truly Were', icon:'📖', ch:159, need:3, ambush:['shade_beast'], lo:47, needFlag:'inv_hk_account', lockMsg:'🔒 Finish the previous clue first',
       desc:'Designated, not all born monsters.',
       clues:['They were given the name of Evils not because they were all the same, but because they could not be understood, controlled, or easily explained.', '"Some were corrupted. Some resisted the rulers. Some guarded forbidden places."', '"And some were simply impossible to control."'], rw:{xp:35500, gold:7100}},
      {id:'corruption_designation', kind:'investigate', n:'Corruption or Designation', icon:'⚖️', ch:159, need:3, ambush:[], lo:47, needFlag:'inv_fifteen_truly', lockMsg:'🔒 Finish the previous clue first',
       desc:'Telling the two apart.',
       clues:['Jade: "A different name does not erase what you have done."', 'Devon: "This sounds like justification. History can have more nuance, but we will not lower our guard."', 'Levi: "No matter the reason, you are still dangerous. We cannot simply believe you."'], rw:{xp:36000, gold:7200}},
      {id:'lineage_link', kind:'investigate', n:'The Link to Jade\'s Lineage', icon:'🌅', ch:159, need:3, ambush:['relic_spirit'], lo:47, needFlag:'inv_corruption_designation', lockMsg:'🔒 Finish the previous clue first',
       desc:'Still unproven.',
       clues:['The Hollow King has named the Gold line as the one the Fifteen were set against.', 'Sky: "The past... is more complicated than we imagined."', 'His words cast doubt on the old records, but his intentions are still uncertain and his truth is not yet proven.'], rw:{xp:36500, gold:7300}},
      {id:'hk_past', kind:'investigate', n:'Learn the Hollow King\'s Past', icon:'👑', ch:160, need:3, ambush:['shade_wraith'], lo:48,
       desc:'A ruler without a crown.',
       clues:['"I was king before these borders existed."', '"My people lived in a land of rivers and mountains... a kingdom with a name, a history, and a future."', 'Broken pillars and faded banners speak of a lost kingdom, a land cut away from the world.'], rw:{xp:37000, gold:7400}},
      {id:'sealed_kingdom', kind:'investigate', n:'Uncover the Truth of the Sealed Kingdom', icon:'🌑', ch:160, need:3, ambush:['relic_spirit'], lo:48, needFlag:'inv_hk_past', lockMsg:'🔒 Finish the previous clue first',
       desc:'A kingdom erased by the seals.',
       clues:['"The seals did not only imprison monsters. They erased kingdoms."', '"Then the seals cut our world away. Our land was removed from the maps. Our people were buried, and their names died with them."', '"We were not monsters. We were a people. And yet the world chose to forget us."'], rw:{xp:37500, gold:7500}},
      {id:'present_crimes', kind:'investigate', n:'Confront His Present Crimes', icon:'🪦', ch:160, need:3, ambush:['shade_beast'], lo:48, needFlag:'inv_sealed_kingdom', lockMsg:'🔒 Finish the previous clue first',
       desc:'Victimhood does not erase responsibility.',
       clues:['Levi: "But you\'ve killed people in the present. These ruins are not empty. The dead are real."', 'Jade: "Suffering does not absolve cruelty."', '"A king cannot apologize for surviving. The world forgot us first."'], rw:{xp:38000, gold:7600}},
      {id:'ruins_hunt', kind:'hunt', n:'The Silent Streets', icon:'👻', ch:157, desc:'Memories given shape and the things that walk the empty streets.', pool:['shade_wraith','relic_spirit','shade_beast'], elite:'relic_spirit', lo:45}]},
  archive_shrine:{ n:'The Abandoned Archive-Shrine', region:'north', kind:'hub', icon:'🏛️', unlock:{ch:164},
    desc:'An ancient settlement that was once a proper archive, once connected to the missing Fourth Entry of the Fifteen. Someone is already waiting there. (The place is not named on the pages.)',
    spots:[
      {id:'shrine_fourth', kind:'investigate', n:'Investigate the Ruined Archive-Shrine', icon:'🏛️', ch:165, need:3, ambush:['shade_wraith'], lo:52,
       desc:'An ancient settlement tied to the missing Fourth Entry.',
       clues:['The fourth entry was cut out cleanly. Not destroyed. Removed.', '"The other entries are still here... so someone deliberately took this one."', '"This place was once a proper archive. Not a random ruin."'], rw:{xp:38500, gold:7700}},
      {id:'shrine_records', kind:'investigate', n:'Analyze the Remaining Records', icon:'📜', ch:165, need:3, ambush:['relic_spirit'], lo:52, needFlag:'inv_shrine_fourth', lockMsg:'🔒 Finish the previous clue first',
       desc:'Clues about Evil IV.',
       clues:['"This is not the work of ordinary raiders. They understood the value of information."', '"They did not destroy the truth. They tried to erase it from being found."', 'The removal was intentional.'], rw:{xp:39000, gold:7800}},
      {id:'witness_meet', kind:'investigate', n:'The Nameless Witness', icon:'🕴️', ch:165, need:3, ambush:[], lo:52, needFlag:'inv_shrine_records', lockMsg:'🔒 Finish the previous clue first',
       desc:'Someone was already there.',
       clues:['"So the Gold Child has finally started asking what an Evil is."', '"Someone your ancestors were told to forget. You still call them Evils. Names are useful. But they are not the whole story."', '"Our paths will cross again, Gold Child. When you are ready to see beyond the names."'], rw:{xp:39500, gold:7900}},
      {id:'witness_why', kind:'investigate', n:'Why the Fourth Entry Was Removed', icon:'🗝️', ch:165, need:3, ambush:[], lo:52, needFlag:'inv_witness_meet', lockMsg:'🔒 Finish the previous clue first',
       desc:'What the witness will and will not say.',
       clues:['"I have seen the Fifteen before the world gave them that name."', '"I have seen what they were... what they became... and why some of their records had to disappear."', '"There are truths that are kinder when they remain unfound."'], rw:{xp:40000, gold:8000}}]},
  dima_sanctuary:{ n:'Dima\'s Sanctuary', region:'unknown', kind:'unknown', icon:'🌙', unlock:{ch:999}, desc:'Jade\'s destiny: bloodline revelations, true purpose.', spots:[]},
  xima_realm:{ n:'Xima Realm', region:'unknown', kind:'unknown', icon:'🌑', unlock:{ch:999}, desc:'Late game: ancient evil, the curse\'s source, final mysteries.', spots:[]},
};
const LOC_ORDER = Object.keys(LOCATIONS);
const isSettlement = id => ['hub','town','harbour'].includes(LOCATIONS[id].kind);
const unlockMet = u => !u || ((u.ch===undefined || G.ch >= u.ch) && (!u.flag || G.flags[u.flag]));
const locOpen = id => unlockMet(LOCATIONS[id].unlock);
const unlockText = u => !u ? '' : (u.ch>=999 ? 'Unknown — story not yet written' : (u.ch!==undefined ? 'Reach chapter '+u.ch : '')+(u.flag?' · '+u.flag:''));
function spotLock(sp){
  if(sp.ch!==undefined && G.ch < sp.ch) return '🔒 Reach chapter '+sp.ch;
  if(sp.party && !isRecruited(sp.party)) return '🔒 Needs '+CHARACTERS[sp.party].n.split(' ')[0]+'\'s Ancient Dragon Knowledge';
  if(sp.needFlag && !G.flags[sp.needFlag]) return sp.lockMsg || '🔒 Sealed — complete the Dragon Sanctuary first';
  return '';
}

// Some story chapters must be started on location (PROVISIONAL). {chapter: locationId}
// Chapters whose story must be started on location. Tune freely: {chapter: locationId}
const CH_LOC = { 156:'mourning_valley', 157:'crownless_marches', 158:'crownless_marches', 159:'crownless_marches', 160:'crownless_marches', 161:'crownless_marches', 162:'capital', 163:'capital', 164:'capital', 165:'archive_shrine', 166:'capital', 150:'forest_of_thorns', 151:'forest_of_thorns', 152:'forest_of_thorns', 153:'mourning_valley', 154:'mourning_valley', 155:'mourning_valley', 147:'capital', 148:'capital', 149:'black_forest', 139:'land_beyond_seal', 140:'land_beyond_seal', 141:'land_beyond_seal', 142:'land_beyond_seal', 143:'land_beyond_seal', 144:'land_beyond_seal', 145:'land_beyond_seal', 146:'land_beyond_seal', 129:'forgotten_sanctuary', 130:'forgotten_sanctuary', 131:'celestial_ruins', 132:'celestial_ruins', 133:'celestial_ruins', 134:'celestial_ruins', 135:'celestial_ruins', 136:'celestial_ruins', 137:'celestial_ruins', 138:'celestial_ruins', 127:'forgotten_sanctuary', 128:'forgotten_sanctuary', 126:'forgotten_sanctuary', 119:'valen_borderlands', 120:'valen_borderlands', 121:'capital', 122:'capital', 123:'forgotten_battlefield', 124:'forgotten_battlefield', 125:'forgotten_battlefield', 118:'valen_borderlands', 109:'valen_borderlands', 110:'valen_borderlands', 111:'valen_borderlands', 112:'valen_borderlands', 113:'valen_borderlands', 114:'valen_borderlands', 115:'valen_borderlands', 116:'valen_borderlands', 117:'valen_borderlands', 105:'valen_borderlands', 106:'valen_borderlands', 107:'valen_borderlands', 108:'valen_borderlands', 102:'capital', 103:'capital', 104:'valen_borderlands', 99:'capital', 100:'capital', 101:'capital', 95:'capital', 96:'capital', 97:'gold_residence', 98:'capital', 89:'capital', 90:'gold_residence', 91:'gold_residence', 92:'gold_residence', 93:'gold_residence', 94:'gold_residence', 87:'dragon_vale', 84:'dragon_vale', 86:'dragon_vale', 78:'dragon_vale', 79:'dragon_vale', 80:'moonveil_temple', 81:'dragon_vale', 82:'dragon_vale', 83:'dragon_vale', 85:'dragon_border', 74:'dragon_vale', 76:'dragon_border', 77:'dragon_ruins', 75:'dragon_vale', 63:'dragon_vale', 64:'dragon_vale', 65:'dragon_vale', 66:'dragon_vale', 67:'dragon_vale', 68:'dragon_vale', 69:'dragon_vale', 70:'dragon_vale', 71:'dragon_vale', 72:'dragon_vale', 73:'dragon_vale', 61:'dragon_vale', 62:'dragon_vale', 57:'dragon_vale', 58:'dragon_vale', 59:'dragon_vale', 60:'cavern_fireflies', 52:'dragon_vale', 53:'dragon_vale', 54:'dragon_vale', 55:'dragon_vale', 56:'dragon_vale', 44:'capital', 45:'dragon_vale', 46:'dragon_vale', 47:'dragon_vale', 48:'dragon_vale', 49:'dragon_vale', 50:'dragon_vale', 51:'dragon_vale', 12:'dark_inn', 16:'vigil_village', 17:'vigil_village', 18:'vigil_village', 19:'faepool_forest', 21:'faepool_forest', 22:'booyeong_camp', 23:'booyeong_camp', 24:'booyeong_camp', 25:'faepool_forest', 26:'vigil_village', 27:'booyeong_camp', 28:'vigil_village', 29:'vigil_village', 30:'vigil_village' };   // chapters that must start on location (ch12 begins at the inn). More are added as chapters are converted.
// Boat travel unlocks with chapter 15 (the sea voyage before ch16). Set BRACELET_FROM_START=true if the Imperial Bracelet should exist from the Prologue.
const SHIP_CH = 15, BRACELET_FROM_START = false;
const modeOpen = m => m!=='ship' || G.ch >= SHIP_CH;

/* ---------------- ROUTES ---------------- */
// mode 'carriage' (land, road encounters — Aethon style) | 'ship' (sea/river voyage — Crimson Tide style)
const MODES = { carriage:{n:'Horse Carriage', icon:'🐎'}, ship:{n:'Ship', icon:'⛵'} };
const LAND_POOL = ['road_bandit','bandit_archer','forest_wolf'], SEA_POOL = ['sea_raider','storm_wisp'];
const ROUTES = [
  {a:'capital', b:'dark_inn', mode:'carriage', n:'Faepool Road', days:2, fare:14, risk:.4, pool:['road_bandit','bandit_archer','forest_wolf']},
  {a:'capital', b:'tribute_wilderness', mode:'carriage', n:'Imperial Road', days:1, fare:6, risk:.3, pool:['road_bandit','bandit_archer','forest_wolf']},
  {a:'tribute_wilderness', b:'faepool_harbour', mode:'carriage', n:'Border Road', days:1, fare:8, risk:.35, pool:['road_bandit','bandit_archer','dock_pickpocket']},
  {a:'capital', b:'faepool_harbour', mode:'ship', n:'Imperial Coast Passage', days:1, fare:20, risk:.2, pool:['sea_raider','smuggler']},
  {a:'faepool_harbour', b:'vigil_village', mode:'carriage', n:'Harbour Road', days:1, fare:10, risk:.4, pool:LAND_POOL},
  {a:'vigil_village', b:'faepool_forest', mode:'carriage', n:'Forest Track', days:1, fare:12, risk:.5, pool:['forest_wolf','thorn_boar','xima_sprite']},
  {a:'faepool_forest', b:'booyeong_camp', mode:'carriage', n:'Camp Trail', days:1, fare:10, risk:.5, pool:['booyeong_guard','road_bandit','forest_wolf']},
  {a:'faepool_forest', b:'frog_mahan', mode:'carriage', n:'Reed Causeway', days:1, fare:10, risk:.5, pool:['bog_toad','mire_leech','forest_wolf']},
  {a:'faepool_forest', b:'faepool_ruins', mode:'carriage', n:'Old Forest Path', days:1, fare:10, risk:.5, pool:['forest_wolf','xima_sprite','thorn_boar']},
  {a:'faepool_forest', b:'dark_inn', mode:'carriage', n:'Old Inn Road', days:1, fare:10, risk:.5, pool:['masked_assassin','forest_wolf','shade_wraith']},
  {a:'faepool_ruins', b:'trial_grounds', mode:'carriage', n:'Trial Road', days:1, fare:12, risk:.5, pool:['stone_sentinel','relic_spirit','forest_wolf']},
  {a:'trial_grounds', b:'hidden_village', mode:'carriage', n:'Hidden Trail', days:1, fare:12, risk:.5, pool:['forest_wolf','thorn_boar','xima_sprite']},
  {a:'hidden_village', b:'corrupted_forest', mode:'carriage', n:'Blighted Track', days:1, fare:14, risk:.55, pool:['xima_sprite','shade_wraith','thorn_boar']},
  {a:'corrupted_forest', b:'faepool_borderlands', mode:'carriage', n:'Borderland Road', days:1, fare:14, risk:.55, pool:['road_bandit','bandit_archer','masked_assassin']},
  {a:'faepool_borderlands', b:'faepool_settlement', mode:'carriage', n:'Settlement Road', days:1, fare:14, risk:.5, pool:['road_bandit','forest_wolf','bandit_archer']},
  {a:'faepool_settlement', b:'reunion_area', mode:'carriage', n:'Wilderness Route', days:1, fare:14, risk:.55, pool:['road_bandit','masked_assassin','forest_wolf']},
  {a:'faepool_harbour', b:'river_crossing', mode:'ship', n:'River Mouth Voyage', days:2, fare:30, risk:.5, pool:SEA_POOL},
  {a:'river_crossing', b:'dragon_vale', mode:'ship', n:'Upriver Voyage', days:2, fare:35, risk:.5, pool:SEA_POOL.concat(['river_serpent'])},
  {a:'dragon_vale', b:'dragon_border', mode:'carriage', n:'Old Mountain Road', days:1, fare:20, risk:.5, pool:['shade_beast','imp']},
  {a:'dragon_vale', b:'moonveil_temple', mode:'carriage', n:'Eastern Mountain Path', days:1, fare:25, risk:.35, pool:['relic_spirit','stone_sentinel']},
  {a:'dragon_border', b:'abyssal_frontier', mode:'carriage', n:'The Exile Road', days:1, fare:30, risk:.55, pool:['shade_beast','shade_wraith','imp']},
  {a:'dragon_border', b:'dragon_ruins', mode:'carriage', n:'Climb to the Ruins', days:1, fare:0, risk:.4, pool:['shade_beast','imp']},
  {a:'dragon_vale', b:'cavern_fireflies', mode:'ship', n:'Moonlit Boat', days:1, fare:0, risk:0, pool:['storm_wisp']},
  {a:'capital', b:'dragon_vale', mode:'carriage', n:'Dragonvale Road', days:6, fare:60, risk:.45, pool:['road_bandit','vale_drake','forest_wolf']},
  {a:'capital', b:'valen_borderlands', mode:'carriage', n:'The Western Road', days:4, fare:80, risk:.5, restoredRisk:.2, pool:['shade_beast','road_bandit','imp']},
  {a:'forgotten_battlefield', b:'forgotten_sanctuary', mode:'carriage', n:'The Western Road', days:1, fare:20, risk:.3, pool:['stone_sentinel','shade_wraith']},
  {a:'forgotten_sanctuary', b:'celestial_ruins', mode:'carriage', n:'The Forgotten Road', days:3, fare:60, risk:.4, pool:['stone_sentinel','shade_wraith','relic_spirit']},
  {a:'celestial_ruins', b:'land_beyond_seal', mode:'carriage', n:'The Opened Passage', days:1, fare:0, risk:.3, pool:['stone_sentinel','relic_spirit']},
  {a:'capital', b:'northern_frontier', mode:'carriage', n:'The Northern Road', days:2, fare:40, risk:.4, pool:['road_bandit','shade_beast','forest_wolf']},
  {a:'northern_frontier', b:'black_forest', mode:'carriage', n:'The Forest Track', days:1, fare:10, risk:.35, pool:['shade_beast','forest_wolf','relic_spirit']},
  {a:'black_forest', b:'forest_of_thorns', mode:'carriage', n:'Into the Thorns', days:1, fare:0, risk:.4, pool:['shade_beast','relic_spirit']},
  {a:'forest_of_thorns', b:'mourning_valley', mode:'carriage', n:'The Mountain Path', days:1, fare:0, risk:.3, pool:['forest_wolf','relic_spirit']},
  {a:'mourning_valley', b:'crownless_marches', mode:'carriage', n:'Beyond the Protected Valley', days:2, fare:0, risk:.4, pool:['shade_wraith','relic_spirit','shade_beast']},
  {a:'capital', b:'archive_shrine', mode:'carriage', n:'The Archive Road', days:3, fare:0, risk:.35, pool:['shade_wraith','relic_spirit']},
  {a:'capital', b:'forgotten_battlefield', mode:'carriage', n:'The Western Frontier Road', days:5, fare:100, risk:.45, pool:['shade_beast','stone_sentinel','imp']},
  {a:'valen_borderlands', b:'forgotten_battlefield', mode:'carriage', n:'The Old Battle Road', days:2, fare:40, risk:.35, pool:['stone_sentinel','shade_beast']},
  {a:'capital', b:'dragon_vale', mode:'ship', n:'Eastern Sea Passage', days:4, fare:90, risk:.4, voyage:true, pool:['sea_raider','storm_wisp']},
  {a:'faepool_forest', b:'dragon_vale', mode:'carriage', n:'Vale Road', days:3, fare:50, risk:.6, pool:['vale_drake','forest_wolf','xima_sprite']},
];
const routesFrom = id => ROUTES.filter(r => r.a===id || r.b===id).map(r => ({r, to: r.a===id ? r.b : r.a}));
function hopsFromCapital(id){
  const seen = {capital:0}, q = ['capital'];
  while(q.length){ const c = q.shift(); if(c===id) return seen[c];
    routesFrom(c).forEach(({to}) => { if(seen[to]===undefined){ seen[to]=seen[c]+1; q.push(to); } }); }
  return 1;
}
const EVENTS = {
  carriage:[{t:'🐴 The driver knows a shortcut and shaves hours off the road.', xp:15},
            {t:'🌧️ A summer shower slows the wheels, and the party trades stories.', bond:2},
            {t:'👛 A dropped coin purse lies in the road.', gold:20}, {t:'🌾 A quiet stretch of road. Nothing happens.'}],
  ship:[{t:'🌊 Calm water. The crew sings and the party listens.', bond:2},
        {t:'🐬 Dolphins race the bow, taken as a good omen.', xp:20},
        {t:'⚓ A passing merchant sloop trades you goods.', gold:25}, {t:'🌫️ Fog delays the passage. Nothing lost.'}],
};

/* ---------------- STATE ---------------- */
function worldDefaults(){
  return { day:1, loc:'capital', visited:{capital:true}, letters:[], pending:[], missions:{}, mprog:{},
           quests:{active:[], board:{}, done:0}, bounties:{day:0, list:[]}, clues:{}, rep:0, bondDay:{}, mealDay:{} };
}
const hasBracelet = () => !!G.flags.bracelet;
let FLASH = [];
const flash = list => { FLASH = FLASH.concat(list); };

function grantReward(rw, label){
  const msgs = [];
  if(rw.xp) gainXp(Math.round(rw.xp*(1+relPerk('xpBonus'))), G.party).forEach(m => msgs.push(m));
  if(rw.gold) G.gold += Math.round(rw.gold*(1+relPerk('goldBonus')));
  if(rw.rep) G.rep += Math.round(rw.rep*(1+relPerk('repBonus')));
  if(rw.items){ addItems(rw.items); rw.items.forEach(d => msgs.push('Received '+(ITEMS[d.id]?ITEMS[d.id].icon+' '+ITEMS[d.id].n:d.id)+' ×'+d.qty)); }
  if(rw.flag){ G.flags[rw.flag] = true; msgs.unshift('✦ '+(FLAG_LABEL[rw.flag]||rw.flag)+' unlocked'); }
  msgs.unshift(label+' · '+[rw.xp&&'+'+rw.xp+' XP', rw.gold&&'+'+rw.gold+'g', rw.rep&&'+'+rw.rep+' renown'].filter(Boolean).join(' · '));
  return msgs;
}
const FLAG_LABEL = { mandate_resolve:'The mandate changes from Destroy to Resolve the Fifteen Evils', hart_resolved:'The Mourning Hart is resolved (2/15): a guardian, not an enemy', valley_protected:'Mourning Valley is under the Crown\'s protection by royal decree', hollow_king_met:'The Hollow King, the Third Evil, speaks', gold_lineage_hunted:'The Fifteen Evils have long been tied to the Gold lineage (Solmir, Velran, Elaris)', fifteen_designated:'There were never fifteen Evils: fifteen entities were designated dangerous in the ancient crisis', crownless_king_known:'The Hollow King was a king whose kingdom the seals erased', hollow_king_contained:'The Hollow King is contained (3/15)', three_truths:'Three Evils, three truths: a corrupted guardian, a misidentified protector, a historical victim', register_rewritten:'The Fifteen Register may record rewritten history: its terminology dates after the Keeper oath was altered', fourth_entry_missing:'Entry IV of the Register was deliberately removed from every copy', nameless_witness_met:'The Nameless Witness: someone who saw the Fifteen before they were named', bracelet:'Communication Bracelet', crossbow:'Levi\'s Crossbow', jade_awakened:'Golden Blood Awakening', valen_restored:'The Valen Borderlands are restored: an ally of Tribute', sky_pendant_mother:'Sky carries his mother\'s pendant (a second pendant; his own was lost)', choice_prophecy:'The one beside the Gold Child is chosen by choice', omen_seen:'The first omen: the demons are fleeing', cael_met:'Cael Ardyn, the last Seal Keeper', first_seal_found:'The first broken seal is found', forgotten_light_found:'The forgotten light and sanctuary', seris_met:'Seris Valen, Saint of Forgotten Light', sanctuary_purpose:'The purpose of Forgotten Light', guiding_map_found:'The sanctuary\'s guiding map', eira_met:'Eira Solenne joins as the party\'s guide', celestial_found:'The Celestial Ruins', seal_message_seen:'The seal\'s message: I will make it remember', one_hand_known:'One hand behind many seals', varyn_met:'Varyn Noctis, the Seal Breaker', seal_kinds_known:'Seals: containment, preservation, separation', forgotten_world_seen:'A forgotten world behind the seal', barrier_people:'The people behind the barrier', oath_changed:'The Keeper\'s oath was changed', oath_original:'The original oath before the war', sisters_together:'Dima and Xima began as allies', returning_light:'Sky: Bearer of the Returning Light', ardyn_inheritance:'The Ardyn family changed the oath', adviser_known:'The unnamed adviser behind the war', truth_before_curse:'The truth before the curse', arc5_complete:'Arc V complete: the Discovery Phase', fifteen_named:'The Fifteen Evils of Tribute are named', first_evil_hunt:'The hunt for the first Evil begins', rin_met:'Rin Kaede, Spirit Ranger', widow_resolved:'The Thorned Widow is resolved (1/15)', hart_found:'The Mourning Hart is a guardian', burial_ground_known:'The burial ground beneath Mourning Valley', royal_link_known:'The royal connection to Tribute (noted)', symbol_traced:'The symbol traced across regions', faction_identified:'The third faction identified',  hale_met:'Magistrate Hale: an unwilling guardian of the truth', third_faction_known:'The third faction (sun-and-eye symbol)', valen_secret:'The Valen secret: Dima and the Gold Child', yvette_truth:'The truth behind Yvette Sue Valen', archive_defended:'The western archive was defended', warriors_insight:'Jade: Warrior\'s Insight', royal_sense:'Devon: Royal Spirit Sense', door_open:'The Symbol Door opened', people_behind_found:'The people behind the missing records', valen_prophecy_link:'The Valen crest and the prophecy', sky_train_1:'Sky: Reading the Body', sky_train_2:'Sky: Cleansing Light', sky_train_3:'Sky: The Old Light', jade_dragon_harmony:'Couple skill: Jade Dragon Harmony', husband_wife_truth:'Jade and Devon are husband and wife in truth', order_delivered:'Greyson\'s sealed order delivered',  princess_of_tribute:'Jade is Princess of Tribute, Greyson\'s sworn sister', visions_shared:'Jade shared her hidden visions', luck_known:'Luck: a lasting blessing from the accident', roc_trial_p1:'Shadow of Roc defeated', roc_trial_p2:'The Shadow Crown ended by Roc\'s own blade', roc_purified:'Roc is purified', roc_reborn:'Roc is reborn: Dark Dragon Aura', gold_family_met:'Jade\'s family: the Gold residence', sky_resembles_yvette:'Sky looks like Yvette Sue Valen', sky_pendant_lost:'Sky\'s jade pendant is lost', ghost_healer_met:'The Ghost Healer travels with the party', ghost_trust:'The Ghost Healer trusts you: Ancient Remedy', ghost_gift_bought:'A gift for the Ghost Healer bought', ghost_gifted:'Gift given to the Ghost Healer', dragonvale_honoured:'Honoured by Dragonvale', aster_crown_prince:'Aster is Crown Prince of Dragonvale', dv_purify:'Devon: Spirit Purification', partner_actions:'Partner action: Guardian\'s Promise', princess_guardian:'Jade: Princess Guardian', royal_spirit_authority:'Devon: Royal Spirit Authority', twin_dragon:'Couple skill: Twin Dragon Harmony', dv_exploration:'Dragonvale exploration areas', roc_exiled:'Roc is exiled from Dragonvale', liora_apart:'Liora stays in Dragonvale; letters follow', seraphina_free:'Seraphina is free: the Divorce Scroll from King Chadstone', liora_ward:'Liora is in Jade and Devon\'s care', levi_reborn:'Levi returns, reborn', sally_stays:'Sally stays in Dragonvale as a rumour source', chad_dark_deep:'Roc\'s dark arts deepen', chad_backlash_1:'Dark-magic backlash (Roc): stats permanently altered', chad_backlash_2:'Dark-magic backlash worsens (Roc)', chad_backlash_3:'Dark-magic backlash, final (Roc)', roc_severed:'Bond with Roc Chadwick severed', jade_poisoned:'Jade is poisoned (slow-acting)', royal_attire:'Daily Royal Attire and Phoenix Guard attire', sally_gossip:'Sally\'s court gossip', chad_dark_arts:'Chad\'s dark arts', greyson_arms:'Greyson\'s dagger and flail unsealed', greyson_gift:'Greyson\'s gift received', cleansing_touch:'Cleansing Touch (Jade)', sally_noble:'Sally\'s noble title and Noble Grace' };

/* ---------------- DAY CLOCK ---------------- */
function advanceDay(n){
  G.day += n; if(typeof corrTick==='function') corrTick(n); if(n>0 && typeof healParty==='function') healParty(Math.min(.5,.1*n)); refreshBounties();
  return deliverLetters().concat(checkMissionOffers(), typeof famTick==='function' ? famTick() : [], typeof salaryTick==='function' ? salaryTick() : []);
}

/* ---------------- LETTERS & MISSIONS (King Greyson) ---------------- */
// obj types: reach {loc} | kill {keys|area, need} | boss {key} | investigate {spot} | read
// PROVISIONAL: texts, rewards and chapter gating. Chapters listed = story chapters completed first.
const MISSIONS = [
  // ---- from the comic pages ----
  {id:'m_summons', needCh:0, title:'The Protector of Tribute', obj:{type:'read'}, rw:{xp:60, gold:40},
   subj:'The fifteen evils', body:'Jade — the title I gave you in court is one the world can see. The duty is one only you can fulfil: find the fifteen evils Xima unleashed and end their torment. I will send word of what I learn. — Greyson'},
  {id:'m_faepool', needCh:10, title:'Set out for Faepool', obj:{type:'reach', loc:'dark_inn'}, rw:{xp:200, gold:100},
   subj:'Your passes are ready', body:'You have your duties and your official passes. Take the carriage toward Faepool; there is an inn near the border where you can rest. Eliminate as many of Xima\'s underlings in the fifteen territories as you can. — Greyson'},
  {id:'m_booyeong', needCh:26, title:'End Booyeong', obj:{type:'boss', key:'boss_booyeong'}, rw:{xp:700, gold:300, rep:10},
   subj:'The bandit lord', body:'Booyeong has taken too much from Faepool. If you have recovered, end him. — Greyson'},
  {id:'m_empress', needCh:53, title:'The Late Empress\'s Archive', obj:{type:'investigate', spot:'archive_dv'}, rw:{xp:800, gold:300},
   subj:'A quiet search', body:'Dragonvale may hold answers about the Black Pearl, the Gold Child, Dima and Xima. Quietly investigate the sealed records of the late empress and the old royal archives. Not everyone should know about this search. — Greyson'},
  {id:'m_erased', needCh:62, title:'The Erased Name', obj:{type:'investigate', spot:'old_archives'}, rw:{xp:900, gold:320},
   subj:'An old authorization', body:'Someone with royal access took the missing material, and the name on the old authorization has been erased. Search the old royal archives for what remains. Be discreet. — Greyson'},
  {id:'m_access', needCh:71, title:'The Access Log', obj:{type:'investigate', spot:'restricted_archive'}, rw:{xp:1000, gold:350},
   subj:'The ledgers', body:'The restricted materials did not vanish by chance. Search the Restricted Archive ledgers and learn whose seal opened the vaults. Do not accuse anyone before you have proof. — Greyson'},
  {id:'m_kings_message', needCh:74, title:'The King\'s Message', obj:{type:'steps', steps:[
     {label:'Continue the Dragonvale investigation', spot:'old_archives'},
     {label:'Watch for unrest in the palace and at the borders', visit:'dragon_border'},
     {label:'Follow Greyson\'s trust and uncover the next threat', mission:'m_border'}]}, rw:{xp:1500, gold:500, rep:20},
   subj:'A trust, not a command', body:'Congratulations, Princess Jade. I assume married life has not stopped you from investigating trouble. This is not a command: consider it a trust. If unrest stirs in Dragonvale, I believe you will find its source. Watch the borders, the ruins and the court. — Greyson'},
  {id:'m_border', needCh:75, title:'Whispers at the Border', obj:{type:'steps', steps:[
     {label:'Investigate the missing villages', spot:'border_villages'},
     {label:'Search the ancient border ruins', spot:'border_ruins'},
     {label:'Uncover the source of the spirit disturbance', visit:'dragon_ruins'}]}, rw:{xp:3000, gold:1000, rep:30},
   subj:'Unrest at the border', body:'Caravans have gone missing and villages along the Dragonvale border have lost contact. Travelers speak of strange lights and beastlike shadows near the old ruins. Look into it, in person, and quietly. — Greyson'},
  {id:'m_ruins_awaken', needCh:76, title:'The Ruins Awaken', obj:{type:'steps', steps:[
     {label:'Investigate the ancient ruins', spot:'forgotten_hall'},
     {label:'Protect the border villagers', kill:'shade_beast', need:5},
     {label:'Uncover the source of the spirit disturbance', boss:'boss_guardian_spirit'}]}, rw:{xp:3500, gold:1200, rep:30, items:[{id:'seal_fragment',qty:1}]},
   subj:'Go deeper', body:'The ruins are awake, and what you have sealed is only the surface. Go deeper, and keep the villagers safe while you do. — Greyson'},
  {id:'m_heart', needCh:77, title:'The Heart of the Ruins', obj:{type:'steps', steps:[
     {label:'Calm the awakened ruins', boss:'boss_spirit_core'},
     {label:'Protect the border settlements', kill:'shade_beast', need:8},
     {label:'Investigate who stirred Dragonvale\'s ancient seals', spot:'seal_study'}]}, rw:{xp:5000, gold:1800, rep:50},
   subj:'The seal core', body:'Someone has forced Dragonvale\'s oldest ward to respond. Stabilise what you can, protect the settlements, and find the hand behind it. — Greyson'},
  {id:'m_moonveil', needCh:78, title:'Moonveil Temple', obj:{type:'steps', steps:[
     {label:'Investigate the hidden sanctuary of the Moonveil Temple', spot:'moonveil_sanctuary'},
     {label:'Uncover the meaning of the ancient symbol', spot:'moonveil_symbol'},
     {label:'Search for clues about the Black Pearl', spot:'pearl_records'}]}, rw:{xp:4000, gold:1400, rep:30},
   subj:'The Moonveil Temple', body:'An ancient mountain sanctuary called the Moonveil Temple is mentioned in our records. I believe it may hold important clues. I trust your judgment. Could you investigate it for me? — Greyson'},
  {id:'m_last_duty', needCh:85, title:'The Last Duty Before Departure', obj:{type:'steps', steps:[
     {label:'Investigate the border disturbances', spot:'eastern_village'},
     {label:'Defeat the corrupted spirits', kill:'shade_beast', need:6},
     {label:'Restore Dragonvale\'s ancient barrier', spot:'mountain_shrine'}]}, rw:{xp:6000, gold:2000, rep:60},
   subj:'One matter only you can resolve', body:'Before you return to Tribute, there is one matter only you can resolve. The border disturbances, the awakened creatures and the weakened ancient barriers in Dragonvale are connected. I need you to finish this last duty. — Greyson'},
  {id:'m_ghost_gift', needCh:88, title:'A Gift for the Ghost Healer', obj:{type:'steps', steps:[
     {label:'Buy a gift in a Tribute town (the Moon-Blossom Tea Stall in the capital)', flag:'ghost_gift_bought'},
     {label:'Give it to the Ghost Healer', flag:'ghost_gifted'}]}, rw:{xp:2500, gold:600, rep:20},
   subj:'The Ghost Healer', body:'The healer who saved Levi asks for nothing, and that is exactly why they deserve something. Find a gift worth giving in one of Tribute\'s towns and put it in their hands. They have not been honoured in their life; let this be the first time. — Greyson'},
  {id:'m_missing_sister', needCh:92, title:'The Missing Sister', obj:{type:'steps', steps:[
     {label:'Look through the Gold family albums and portraits', spot:'gold_albums'},
     {label:'Find the records on Yvette Sue Valen', spot:'yvette_records'}]}, rw:{xp:5000, gold:1500, rep:40},
   subj:'A family\'s question', body:'Jade, your family told me about Yvette Sue Valen. A healer who vanished without a trace from a family of seers is not a small thing, and the boy who looks like her is not a coincidence. Look into it quietly. — Greyson'},
  {id:'m_fallen_trial', needCh:TRIAL_CH, title:'The Fallen Prince\'s Trial (optional)', obj:{type:'steps', steps:[
     {label:'Investigate the dark energy at the Exile Border', spot:'exile_trail'},
     {label:'Face the Shadow of Roc', flag:'roc_trial_p1'},
     {label:'Let Roc end the Shadow Crown himself', flag:'roc_trial_p2'},
     {label:'Purify Roc', flag:'roc_purified'}]}, rw:{xp:6000, gold:2000, rep:40, items:[{id:'dragon_crystal',qty:3}]},
   subj:'A rumour from the exile border', body:'Reports from the Dragonvale border: monsters gathering, villagers gone, a dark energy that does not behave like a war. I do not think it is only a monster. If you choose to look, you will find someone you used to know. This is not a command, Jade. It is a choice. — Greyson'},
  {id:'m_guardian_returns', needCh:95, title:'The Imperial Guardian Returns', obj:{type:'steps', steps:[
     {label:'Return to Greyson\'s court', visit:'capital'},
     {label:'Reunite with Adrian Gold', visit:'gold_residence'},
     {label:'Prepare for Tribute\'s next mission', chapter:99}]}, rw:{xp:3000, gold:800, rep:30},
   subj:'Welcome home, Guardian', body:'Dragonvale needed you. Now Tribute needs you again. Come to court when you have eaten and slept, and bring your husband. — Greyson'},
  {id:'m_brother', needCh:96, title:'The Brother Who Remembers', obj:{type:'steps', steps:[
     {label:'Learn Adrian Gold\'s role in court', flag:'act_court'},
     {label:'Revisit Jade\'s childhood memories', flag:'act_albums'},
     {label:'Understand how "Luck" became part of Jade\'s life', flag:'act_luck'}]}, rw:{xp:3200, gold:800, rep:20},
   subj:'Your brother', body:'Adrian has served this court well. Spend an afternoon with him. Memory returns more kindly when it is asked politely. — Greyson'},
  {id:'m_advisors_daughter', needCh:97, title:'The Advisor\'s Daughter', obj:{type:'steps', steps:[
     {label:'Learn the duty of the house of Gold', flag:'act_duty'},
     {label:'Understand the Valor psychic lineage', flag:'act_valor'},
     {label:'Define Jade\'s place in Tribute', chapter:99}]}, rw:{xp:3400, gold:900, rep:30},
   subj:'A place to stand', body:'Your father has been an advisor longer than you have been alive, and your mother sees farther than I do. Listen to them. Then decide what you want to be here. — Greyson'},
  {id:'m_missing_docs', needCh:98, title:'The Missing Documents', obj:{type:'steps', steps:[
     {label:'Search the royal archives for missing files', spot:'missing_files'},
     {label:'Find the records on Yvette Sue Valen', spot:'yvette_records'},
     {label:'Trace the missing files tied to Sky\'s past', spot:'sky_files'}]}, rw:{xp:5000, gold:1500, rep:40},
   subj:'Missing files', body:'Several old files have vanished from the royal archives. The names inside them may matter more than we realised. Look, quietly. — Greyson'},
  {id:'m_king_sister', needCh:99, title:'The King and His Sister', obj:{type:'steps', steps:[
     {label:'Attend Greyson\'s court', visit:'capital'},
     {label:'Receive Jade\'s formal acknowledgment', chapter:99},
     {label:'Prepare for Tribute\'s next mission', chapter:101}]}, rw:{xp:4000, gold:1200, rep:50},
   subj:'Come to court', body:'Come to court tomorrow, Jade. Bring Devon, and your family if they will come. There is something I should have said a long time ago. — Greyson'},
  {id:'m_kings_request', needCh:101, title:'The King\'s Request', obj:{type:'steps', steps:[
     {label:'Travel beyond Tribute', visit:'valen_borderlands'},
     {label:'Investigate the missing envoys', spot:'moonfall_hamlet'},
     {label:'Uncover the hidden records', spot:'ruins_of_valen'},
     {label:'Represent Tribute abroad', flag:'order_delivered'}]}, rw:{xp:12000, gold:4000, rep:100},
   subj:'Beyond the island', body:'An allied territory beyond our shores has sent word: envoys missing, old records resurfaced, people vanishing near forgotten ruins. This matter touches Tribute, but it does not belong to Tribute alone. Go as yourself, Jade. — Greyson'},
  {id:'m_road_beyond', needCh:102, title:'The Road Beyond Tribute', obj:{type:'steps', steps:[
     {label:'Leave Tribute', visit:'valen_borderlands'},
     {label:'Protect the sealed order', flag:'order_delivered'},
     {label:'Investigate the missing envoys', spot:'moonfall_hamlet'}]}, rw:{xp:5000, gold:1500, rep:40},
   subj:'The sealed order', body:'The order is sealed for a reason. Carry it yourself, and open it for no one but its keepers. — Greyson'},
  {id:'m_western', needCh:104, title:'The Forgotten Western Territory', obj:{type:'steps', steps:[
     {label:'Travel to the Valen Borderlands', visit:'valen_borderlands'},
     {label:'Deliver the sealed order', flag:'order_delivered'},
     {label:'Investigate the missing envoys', spot:'moonfall_hamlet'},
     {label:'Search for traces of the erased records', spot:'ruins_of_valen'}]}, rw:{xp:9000, gold:3000, rep:80},
   subj:'The west', body:'The Valen Borderlands were once a frontier of healers, envoys and old alliances. Now they are called the Forgotten Western Territory. Find out why. — Greyson'},
  {id:'m_borderland_forgotten', needCh:105, title:'The Borderland That Was Forgotten', obj:{type:'steps', steps:[
     {label:'Meet Captain Rowan Mirel at the outpost', visit:'valen_borderlands'},
     {label:'Search the old Valen records hall', spot:'records_hall'}]}, rw:{xp:4000, gold:1200, rep:30},
   subj:'The west remembers', body:'Captain Rowan Mirel keeps the old outpost. He will want proof you are who you say. Show him the order. — Greyson'},
  {id:'m_people_behind', needCh:106, title:'The People Left Behind', obj:{type:'steps', steps:[
     {label:'Meet Mira Valen', chapter:106},
     {label:'Gain Lio\'s trust', spot:'mira_talk'},
     {label:'Learn why the west resents Tribute', spot:'mira_talk'},
     {label:'Search for the people behind the missing records', flag:'people_behind_found'}]}, rw:{xp:5000, gold:1500, rep:40},
   subj:'Listen first', body:'Do not begin with questions. Begin by listening to the people who stayed. — Greyson'},
  {id:'m_healers_legacy', needCh:107, title:'The Healer\'s Legacy', obj:{type:'steps', steps:[
     {label:'Learn about the Valen healer tradition', spot:'spirit_hollow'},
     {label:'Find more traces of Yvette Sue Valen', spot:'records_hall'},
     {label:'Investigate why the records were erased', spot:'hidden_archive'},
     {label:'Uncover the connection to the prophecy', flag:'valen_prophecy_link'}]}, rw:{xp:7000, gold:2000, rep:50},
   subj:'A legacy buried', body:'The Valen healers helped the west for generations, and their name was erased. Find out who gains by it. — Greyson'},
  {id:'m_empty_records', needCh:108, title:'The Empty Records', obj:{type:'steps', steps:[
     {label:'Meet Master Teren', chapter:108},
     {label:'Search the hidden archive', spot:'hidden_archive'},
     {label:'Trace the altered records', spot:'hidden_archive'},
     {label:'Investigate the file on Yvette Sue Valen', spot:'yvette_file'}]}, rw:{xp:8000, gold:2500, rep:60},
   subj:'The second archive', body:'Records that were rewritten leave marks. Teren knows where. — Greyson'},
  {id:'m_man_knows', needCh:109, title:'The Man Who Knows Too Much', obj:{type:'steps', steps:[
     {label:'Confront Magistrate Corvin Hale', spot:'magistrate_office'},
     {label:'Learn about his connections', spot:'magistrate_office'},
     {label:'Find another way to access the sealed records', chapter:110},
     {label:'Investigate who ordered the erasures', chapter:114},
     {label:'Prepare for the next move', chapter:110}]}, rw:{xp:6000, gold:1800, rep:50},
   subj:'The magistrate', body:'Magistrate Hale will not open the archives, and a man that careful is protecting something. Find out what. — Greyson'},
  {id:'m_magistrate_shadow', needCh:110, title:'The Magistrate\'s Shadow', obj:{type:'steps', steps:[
     {label:'Confront Magistrate Corvin Hale', spot:'magistrate_shadow'},
     {label:'Learn why he is blocking the western records', spot:'magistrate_shadow'},
     {label:'Discover the fate of the previous magistrate', chapter:114},
     {label:'Obtain the forbidden page', flag:'inv_magistrate_shadow'},
     {label:'Investigate the wider cover-up', chapter:114}]}, rw:{xp:6500, gold:2000, rep:50},
   subj:'One page', body:'A page that was never supposed to exist is still a page. Keep it safe. — Greyson'},
  {id:'m_valen_name', needCh:111, title:'The Valen Family Name', obj:{type:'steps', steps:[
     {label:'Learn about the Valen family\'s history', spot:'valen_portrait'},
     {label:'Examine Yvette Sue Valen\'s portrait and records', spot:'valen_portrait'},
     {label:'Identify the royal connection to Tribute', flag:'royal_link_known'},
     {label:'Search for other hidden Valen archives', chapter:115},
     {label:'Decide who to trust with this knowledge', chapter:117}]}, rw:{xp:7000, gold:2200, rep:50},
   subj:'A portrait', body:'A portrait of Yvette Sue Valen with someone of my family is a question I cannot answer from here. Look closely. — Greyson'},
  {id:'m_forgotten_alliance', needCh:112, title:'The Forgotten Alliance', obj:{type:'steps', steps:[
     {label:'Uncover the truth behind the broken alliance', spot:'alliance_pact'},
     {label:'Investigate the missing officials', chapter:114},
     {label:'Trace who altered the records', chapter:114},
     {label:'Find evidence of who benefited from the division', spot:'third_faction'}]}, rw:{xp:7500, gold:2400, rep:60},
   subj:'The pact', body:'If Tribute signed a pact I never learned of, then someone in this house hid it. Find the pact, and find who unmade it. — Greyson'},
  {id:'m_price_silence', needCh:113, title:'The Price of Silence', obj:{type:'steps', steps:[
     {label:'Listen to the people of Valen', spot:'village_testimony'},
     {label:'Learn about the human cost of the alliance\'s collapse', spot:'village_testimony'},
     {label:'Gain the villagers\' testimonies', spot:'village_testimony'},
     {label:'Understand the truth behind the lasting resentment', chapter:114},
     {label:'Build a new path forward', chapter:117}]}, rw:{xp:7800, gold:2200, rep:70},
   subj:'Listen', body:'Do not defend what was done. Hear it. — Greyson'},
  {id:'m_hidden_enemy', needCh:114, title:'The Hidden Enemy', obj:{type:'steps', steps:[
     {label:'Investigate the third faction', spot:'third_faction'},
     {label:'Learn more about Xima\'s remaining influence', chapter:114},
     {label:'Trace the use of the symbol across regions', flag:'symbol_traced'},
     {label:'Identify who benefits from the division', flag:'faction_identified'},
     {label:'Prepare for what comes next', chapter:116}]}, rw:{xp:8200, gold:2600, rep:70},
   subj:'The symbol', body:'If the symbol is Xima\'s, then the curse is not done. Say nothing outside this circle. — Greyson'},
  {id:'m_healers_secret', needCh:115, title:'The Healer\'s Secret', obj:{type:'steps', steps:[
     {label:'Learn about Dima and the Gold Child prophecy', spot:'healers_secret'},
     {label:'Understand the Valen family\'s role as protectors of knowledge', spot:'healers_secret'},
     {label:'Discover the ancient restoration methods', chapter:115},
     {label:'Trace why the records were targeted', chapter:117},
     {label:'Prepare for the next step in the search for the truth', chapter:117}]}, rw:{xp:8600, gold:2600, rep:70},
   subj:'The prophecy', body:'A prophecy older than my crown, and a family that hid its keeper. Handle it gently. — Greyson'},
  {id:'m_truth_yvette', needCh:117, title:'The Truth Behind Yvette Sue Valen', obj:{type:'steps', steps:[
     {label:'Read Yvette\'s personal records', spot:'yvette_file'},
     {label:'Learn why she erased her name from history', spot:'yvette_file'},
     {label:'Understand the true purpose of the alliance\'s manipulation', chapter:117},
     {label:'Discover the link to Dima, the Gold Child prophecy and the ancient restoration methods', spot:'healers_secret'},
     {label:'Recover Yvette\'s remaining items', spot:'yvette_file'},
     {label:'Honor her memory and prepare for what comes next', chapter:118}]}, rw:{xp:10000, gold:3000, rep:80},
   subj:'Yvette', body:'She left willingly, and she paid for it with her name. Bring back what she left. — Greyson'},
  {id:'m_return_west', needCh:118, title:'Return of the Western Territory', obj:{type:'steps', steps:[
     {label:'Reopen the Valen archives', chapter:118},
     {label:'Restore healer routes across the regions', chapter:118},
     {label:'Rebuild the diplomatic relationship with Valen', chapter:118},
     {label:'Expose the corrupt officials', chapter:118},
     {label:'Support Corvin\'s public role', chapter:118},
     {label:'Confirm Mira as Valen\'s representative', chapter:118},
     {label:'Appoint Lio as a messenger between regions', chapter:118},
     {label:'Complete the Valen Arc and prepare for the next journey', chapter:118}]}, rw:{xp:15000, gold:5000, rep:120},
   subj:'The west restored', body:'The west is no longer mine to command, only to befriend. You have done what a decree could not. Come home when you are ready. — Greyson'},
  {id:'m_letter_left', needCh:119, title:'The Letter Left Behind', obj:{type:'steps', steps:[
     {label:'Read Yvette\'s final message', spot:'yvette_letter'},
     {label:'Learn why she trusted certain people', chapter:119},
     {label:'Understand why she disappeared', chapter:119},
     {label:'Discover why the prophecy had to be hidden', chapter:119},
     {label:'Reflect on what "choice" truly means', chapter:119},
     {label:'Prepare for what comes next', chapter:120}]}, rw:{xp:12000, gold:3500, rep:90},
   subj:'Her last message', body:'A sealed letter, kept for the right time. Read it together. — Greyson'},
  {id:'m_beyond_west', needCh:120, title:'Beyond the Forgotten West', obj:{type:'steps', steps:[
     {label:'Return to Tribute', chapter:121},
     {label:'Deliver Valen\'s final report', chapter:121},
     {label:'Learn about the new message', chapter:120},
     {label:'Investigate the next forgotten place', visit:'forgotten_battlefield'},
     {label:'Discover the meaning of the mysterious symbol', spot:'unknown_symbol'},
     {label:'Prepare for the next journey', chapter:122}]}, rw:{xp:14000, gold:4000, rep:100},
   subj:'A new message', body:'A message from beyond the western borders, bearing a symbol like Valen\'s. Come to court first. — Greyson'},
  {id:'m_return_tribute', needCh:121, title:'Return to Tribute', obj:{type:'steps', steps:[
     {label:'Return to Tribute', chapter:121},
     {label:'Present Corvin\'s testimony', chapter:121},
     {label:'Deliver the Valen records', chapter:121},
     {label:'Report the altered history', chapter:121},
     {label:'Continue investigating Yvette\'s mystery', chapter:122}]}, rw:{xp:13000, gold:3500, rep:110},
   subj:'The truth at court', body:'You have given Tribute a great responsibility. We will face it together. — Greyson'},
  {id:'m_sleeping_enemy', needCh:123, title:'The Sleeping Enemy', obj:{type:'steps', steps:[
     {label:'Investigate the ancient battlefield', spot:'battlefield_survey'},
     {label:'Identify the unfamiliar symbol', spot:'unknown_symbol'},
     {label:'Trace the healing residue', spot:'healing_residue'},
     {label:'Learn about the Seal Keeper', spot:'cael_ardyn'},
     {label:'Uncover what older force is awakening', spot:'older_force'}]}, rw:{xp:16000, gold:4500, rep:120},
   subj:'The omen\'s source', body:'The demons will not go near that field. Find out why. — Greyson'},
  {id:'m_first_seal', needCh:124, title:'The First Broken Seal', obj:{type:'steps', steps:[
     {label:'Understand the ancient seal system', spot:'seal_system'},
     {label:'Learn why Cael\'s order disappeared', spot:'cael_order'},
     {label:'Investigate the damaged barrier', spot:'broken_seal'},
     {label:'Discover what lies beneath the battlefield', spot:'beneath_field'}]}, rw:{xp:18000, gold:5000, rep:130},
   subj:'A cracked seal', body:'If one seal has cracked, the others may follow. Keep me informed. — Greyson'},
  {id:'m_forgotten_light', needCh:125, title:'The Forgotten Light', obj:{type:'steps', steps:[
     {label:'Follow Cael to the ancient sanctuary', spot:'sanctuary_ruins'},
     {label:'Learn the truth of the seal system', chapter:125},
     {label:'Trace the source of the healing light', spot:'forgotten_light'},
     {label:'Investigate the forgotten shrine', spot:'forgotten_shrine'},
     {label:'Prepare for the next revelation', chapter:125}]}, rw:{xp:20000, gold:6000, rep:140},
   subj:'The forgotten light', body:'Old healing, old guardianship. Learn what the west buried. — Greyson'},
  {id:'m_saint_light', needCh:126, title:'The Saint of Forgotten Light', obj:{type:'steps', steps:[
     {label:'Meet Seris Valen', spot:'seris_meet'},
     {label:'Learn about the Forgotten Light', spot:'old_light'},
     {label:'Witness Sky\'s unusual healing technique', spot:'sky_healing'},
     {label:'Discover why Seris recognizes the power', spot:'seris_knows'},
     {label:'Follow the trail of ancient healing knowledge', spot:'healing_trail'}]}, rw:{xp:22000, gold:6500, rep:150},
   subj:'A saint in the west', body:'Sky\'s light has an older name. Listen to what she tells you. — Greyson'},
  {id:'m_light_remains', needCh:127, title:'The Light That Remains', obj:{type:'steps', steps:[
     {label:'Follow Seris into the inner sanctuary', spot:'inner_sanctuary'},
     {label:'Learn the true purpose of Forgotten Light', spot:'light_purpose'},
     {label:'Examine the surviving healer records', spot:'healer_records'},
     {label:'Investigate Sky\'s ancient healing resonance', spot:'sky_resonance'},
     {label:'Discover what the old sanctuary was protecting', spot:'sanctuary_secret'}]}, rw:{xp:24000, gold:7000, rep:160},
   subj:'The old light', body:'Sky\'s light answers the old records. Learn what they were guarding. — Greyson'},
  {id:'m_path_remembered', needCh:128, title:'The Path Remembered', obj:{type:'steps', steps:[
     {label:'Learn what Forgotten Light preserved', spot:'preserved_paths'},
     {label:'Follow Sky\'s ancient resonance', spot:'sky_guiding'},
     {label:'Recover the sanctuary\'s guiding map', spot:'guiding_map'},
     {label:'Discover the route to the next broken seal', spot:'next_seal_route'},
     {label:'Prepare to leave for the forgotten road', chapter:128}]}, rw:{xp:26000, gold:7500, rep:170},
   subj:'The forgotten road', body:'A map, left for those who would come after. Go carefully. — Greyson'},
  {id:'m_eira', needCh:129, title:'Eira Solenne', obj:{type:'steps', steps:[
     {label:'Learn about Eira Solenne and her knowledge', spot:'eira_meet'},
     {label:'Study the Forgotten Light\'s records', spot:'light_records'},
     {label:'Understand the true purpose of the seals', spot:'seal_purpose'},
     {label:'Discover the connection between the ruins and the ancient paths', spot:'ruins_paths'},
     {label:'Prepare to follow the first forgotten path', chapter:129}]}, rw:{xp:28000, gold:8000, rep:180},
   subj:'A scholar of the old world', body:'A scholar called Eira keeps the old records. Listen to her. — Greyson'},
  {id:'m_forgotten_path', needCh:130, title:'The Forgotten Path', obj:{type:'steps', steps:[
     {label:'Follow Eira Solenne into the first section of the Forgotten Path', spot:'path_entry'},
     {label:'Learn how the path reveals itself through resonance and memory', spot:'path_resonance'},
     {label:'Find the next fragment of the old world\'s seal', spot:'path_fragment'},
     {label:'Face the trials that protect the remaining fragments', spot:'path_trials'},
     {label:'Prepare for the greater truths ahead', chapter:130}]}, rw:{xp:30000, gold:8500, rep:190},
   subj:'The path that chooses', body:'Follow it carefully. It is not a road on any map. — Greyson'},
  {id:'m_forgotten_road', needCh:131, title:'The Forgotten Road', obj:{type:'steps', steps:[
     {label:'Explore the ancient region beyond the known lands', spot:'region_beyond'},
     {label:'Study the murals and records of the forgotten world', spot:'old_murals'},
     {label:'Trace the healing symbols and their connection to Sky\'s ability', spot:'healing_symbols'},
     {label:'Follow Eira\'s guidance along the forgotten road', spot:'road_guided'},
     {label:'Investigate why the city was abandoned', spot:'why_abandoned'}]}, rw:{xp:32000, gold:9000, rep:200},
   subj:'Beyond the maps', body:'If the road is real, so is the city at its end. Report what you find. — Greyson'},
  {id:'m_city_forgot', needCh:132, title:'The City That Forgot', obj:{type:'steps', steps:[
     {label:'Explore the abandoned city and search for clues', spot:'silent_city'},
     {label:'Investigate what happened to the missing citizens', spot:'missing_citizens'},
     {label:'Understand how seal decay distorts memory and history', spot:'seal_decay'},
     {label:'Hear the guardian\'s warning about the true purpose behind the broken seals', spot:'guardian_warning'},
     {label:'Uncover what is being brought back', spot:'being_brought_back'}]}, rw:{xp:34000, gold:9500, rep:210},
   subj:'A city of no one', body:'Erased, not destroyed. Find out who is doing this. — Greyson'},
  {id:'m_seal_chamber', needCh:133, title:'The Broken Seal Chamber', obj:{type:'steps', steps:[
     {label:'Investigate the ancient seal chamber beneath the ruins', spot:'seal_chamber'},
     {label:'Examine the deliberate damage to the seal', spot:'deliberate_damage'},
     {label:'Learn why this seal was not destroyed', spot:'why_not_destroyed'},
     {label:'Uncover what lies behind the seal', spot:'chamber_murals'},
     {label:'Witness the message that appeared on the seal', spot:'seal_message'}]}, rw:{xp:36000, gold:10000, rep:220},
   subj:'The seal that was spared', body:'Someone left this seal alive on purpose. Learn why. — Greyson'},
  {id:'m_name_ruins', needCh:134, title:'The Name Behind the Ruins', obj:{type:'steps', steps:[
     {label:'Investigate previous seal incidents across the forgotten ruins', spot:'past_incidents'},
     {label:'Compare the recurring symbols, methods, and handwriting', spot:'compare_marks'},
     {label:'Learn who has been active for decades across different lands', spot:'decades_active'},
     {label:'Uncover the true meaning behind Dima\'s restoration', spot:'dima_meaning'},
     {label:'Find the name behind the ruins and the one who left these records', spot:'name_ruins'}]}, rw:{xp:38000, gold:10500, rep:230},
   subj:'One hand, many seals', body:'Five kingdoms, one handwriting. Find the name. — Greyson'},
  {id:'m_seal_breaker', needCh:135, title:'The Seal Breaker', obj:{type:'steps', steps:[
     {label:'Confront Varyn Noctis, the Seal Breaker', spot:'varyn_confront'},
     {label:'Learn why he breaks the seals', spot:'varyn_why'},
     {label:'Investigate what is imprisoned within', spot:'what_imprisoned'},
     {label:'Prepare for the next truth that will be revealed', chapter:135}]}, rw:{xp:40000, gold:11000, rep:240},
   subj:'The one who breaks them', body:'He does not hide. Speak with him, but do not trust him yet. — Greyson'},
  {id:'m_truth_refuses', needCh:136, title:'The Truth He Refuses to Bury', obj:{type:'steps', steps:[
     {label:'Confront Varyn Noctis at the broken seal', spot:'varyn_seal'},
     {label:'Learn why he believes the seals were created', spot:'varyn_belief'},
     {label:'Witness the memory fragment of the old world', spot:'memory_fragment'},
     {label:'Question the truth behind the official history', spot:'official_history'},
     {label:'Decide how to respond to Varyn\'s revelation', spot:'varyn_response'}]}, rw:{xp:42000, gold:11500, rep:250},
   subj:'A buried fragment', body:'He claims our history was rewritten. See for yourselves. — Greyson'},
  {id:'m_seals_made_for', needCh:137, title:'What the Seals Were Made For', obj:{type:'steps', steps:[
     {label:'Learn the different kinds of seals and their purposes', spot:'seal_kinds'},
     {label:'Question Varyn about who left the instructions', spot:'varyn_instructions'},
     {label:'Study the ancient notation and compare it with existing records', spot:'ancient_notation'},
     {label:'Trace the symbol back to Dima-era records', spot:'symbol_dima'},
     {label:'Uncover the original purpose of the barriers and why the truth was hidden', spot:'barrier_purpose'}]}, rw:{xp:44000, gold:12000, rep:260},
   subj:'Not all prisons', body:'Containment, preservation, separation. Tell me which this one is. — Greyson'},
  {id:'m_first_choice', needCh:138, title:'The First Choice', obj:{type:'steps', steps:[
     {label:'Stop Varyn from forcing the seal open', boss:'boss_varyn'},
     {label:'Stabilize the weakening seal', spot:'seal_stabilize'},
     {label:'Open a controlled passage', spot:'controlled_passage'},
     {label:'Witness what lies beyond the barrier', spot:'beyond_barrier'},
     {label:'Decide what truth to pursue next', spot:'first_choice'}]}, rw:{xp:48000, gold:13000, rep:280},
   subj:'The choice is real', body:'Whatever lies behind that seal, decide with open eyes. — Greyson'},
  {id:'m_first_betrayer', needCh:145, title:'The Confession of the First Betrayer', obj:{type:'steps', steps:[
     {label:'Study the sealed confession from the Ardyn ancestor', spot:'sealed_confession'},
     {label:'Trace the identity of the unnamed adviser', spot:'unnamed_adviser'},
     {label:'Examine the sealed symbol and its connection to the ancient force', spot:'compass_symbol'},
     {label:'Uncover the true intent behind the altered Keeper oath', spot:'oath_intent'}]}, rw:{xp:60000, gold:16000, rep:300},
   subj:'Who stood between the sisters', body:'A third figure, scratched from the record. Find out who. — Greyson'},
  {id:'m_fifteen_names', needCh:147, title:'The Fifteen Names', obj:{type:'steps', steps:[
     {label:'Return to Tribute Palace', chapter:147},
     {label:'Review the reports with Greyson and Adrian', spot:'reports_review'},
     {label:'Examine the Fifteen Register and its true meaning', spot:'register_examine'},
     {label:'Gather rumours about the first Evil', spot:'first_evil_rumours'},
     {label:'Prepare to investigate the frontier reports', chapter:148}]}, rw:{xp:70000, gold:18000, rep:320},
   subj:'The Fifteen Names', body:'Thirteen names and two blanks. You lead this. Choose your companions. — Greyson'},
  {id:'m_first_evil_rumours', needCh:148, title:'Rumours of the First Evil', obj:{type:'steps', steps:[
     {label:'Read Sally\'s letters from Dragonvale', spot:'sally_letters'},
     {label:'Review the reports and witness accounts', spot:'witness_accounts'},
     {label:'Travel to the northern forest region', visit:'black_forest'},
     {label:'Investigate the source of the disturbances', spot:'frontier_villages'},
     {label:'Learn the truth about the first of the Fifteen Evils', spot:'first_evil_search'}]}, rw:{xp:75000, gold:19000, rep:330},
   subj:'North', body:'Sally\'s letters point north. Go, and learn what it is before you decide. — Greyson'},
  {id:'m_spirit_ranger', needCh:149, title:'The Spirit Ranger', obj:{type:'steps', steps:[
     {label:'Meet Rin Kaede', spot:'rin_meet'},
     {label:'Learn what she knows about the northern forest', spot:'rin_lore'},
     {label:'Investigate the unusual trail', spot:'unusual_trail'},
     {label:'Search for the first of the Fifteen Evils', spot:'first_evil_search'}]}, rw:{xp:80000, gold:20000, rep:340},
   subj:'A tracker in the forest', body:'A ranger already hunts it. Do not make an enemy of her. — Greyson'},
  {id:'m_forest_thorns', needCh:150, title:'Forest of Thorns', obj:{type:'steps', steps:[
     {label:'Enter the Forest of Thorns', spot:'thorns_enter'},
     {label:'Follow Rin\'s spirit trail', spot:'thorn_spirit'},
     {label:'Examine Levi\'s monster tracks', spot:'thorn_tracks'},
     {label:'Survive the corrupted ambush', chapter:150},
     {label:'Trace the route of the First Evil', spot:'widow_route'}]}, rw:{xp:85000, gold:21000, rep:350},
   subj:'Into the thorns', body:'Rin reads the spirits, Levi the beasts. Keep the party together. — Greyson'},
  {id:'m_thorned_widow', needCh:151, title:'The Thorned Widow', obj:{type:'steps', steps:[
     {label:'Defeat the Thorned Widow', boss:'boss_thorned_widow'},
     {label:'Uncover the truth behind its corruption', spot:'widow_corruption'},
     {label:'Survive the forest\'s onslaught', chapter:151},
     {label:'Reach the hidden shrine\'s core', spot:'shrine_core'}]}, rw:{xp:90000, gold:22000, rep:360},
   subj:'The first Evil', body:'It was a guardian once, I think. Be sure of what you strike. — Greyson'},
  {id:'m_fifteen_first', needCh:152, title:'The Fifteen Evils: The First Resolved', obj:{type:'steps', steps:[
     {label:'Register the first Evil as resolved (1/15)', chapter:152}]}, rw:{xp:95000, gold:23000, rep:370},
   subj:'One of fifteen', body:'One resolved, fourteen to go. Write down what it truly was. — Greyson'},
  {id:'m_village_deer', needCh:153, title:'The Village That Fears the Deer', obj:{type:'steps', steps:[
     {label:'Hear the villagers\' report', spot:'village_report'},
     {label:'Investigate the valley trail', spot:'valley_trail'},
     {label:'Follow the stag\'s traces', spot:'stag_traces'},
     {label:'Learn why the village fears it', spot:'village_fear'}]}, rw:{xp:100000, gold:24000, rep:380},
   subj:'A frightened village', body:'They want it killed. Learn why it attacks first. — Greyson'},
  {id:'m_mourning_hart', needCh:154, title:'The Mourning Hart', obj:{type:'steps', steps:[
     {label:'Encounter the spectral stag', spot:'hart_encounter'},
     {label:'Survive the first clash', chapter:154},
     {label:'Investigate the shrine it guards', spot:'hart_shrine'},
     {label:'Learn why its power feels protective', spot:'hart_protective'},
     {label:'Stop the fight before the truth is lost', chapter:154}]}, rw:{xp:105000, gold:25000, rep:390},
   subj:'The stag', body:'Do not strike it down until you know what it guards. — Greyson'},
  {id:'m_beneath_valley', needCh:155, title:'Beneath the Valley', obj:{type:'steps', steps:[
     {label:'Discover the hidden sanctuary', spot:'hidden_sanctuary'},
     {label:'Investigate the disturbed graves', spot:'disturbed_graves'},
     {label:'Trace the treasure seekers and officials', spot:'treasure_seekers'},
     {label:'Understand the hart\'s motive', spot:'hart_motive'},
     {label:'Protect the burial ground from further harm', chapter:155}]}, rw:{xp:110000, gold:26000, rep:400},
   subj:'The burial ground', body:'Find who has been digging, and who sent them. — Greyson'},
  {id:'m_different_victory', needCh:156, title:'A Different Victory', obj:{type:'steps', steps:[
     {label:'Resolve the Mourning Hart (do not slay it)', chapter:156},
     {label:'Negotiate protection for the sanctuary', chapter:156},
     {label:'Receive royal recognition of the protected land', chapter:156},
     {label:'The valley is now under Tribute\'s protection', chapter:156}]}, rw:{xp:115000, gold:27000, rep:410},
   subj:'Resolved, not slain', body:'The decree is signed. Some victories are quieter than others. — Greyson'},
  {id:'m_walking_ruin', needCh:157, title:'The Walking Ruin', obj:{type:'steps', steps:[
     {label:'Investigate the abandoned settlements', spot:'ruins_settle'},
     {label:'Follow the reports of the humanoid figure', spot:'figure_reports'},
     {label:'Examine the strange memory-like energy', spot:'memory_energy'},
     {label:'Confront the being called the Hollow King', chapter:157},
     {label:'Learn why it remembers forgotten names', spot:'forgotten_names'}]}, rw:{xp:120000, gold:28000, rep:420},
   subj:'Reports from the ruins', body:'Villages speak of a figure that knows the names of the dead. Go carefully. — Greyson'},
  {id:'m_third_evil_speaks', needCh:158, title:'The Third Evil Speaks', obj:{type:'steps', steps:[
     {label:'Meet the Hollow King in the ruins', chapter:158},
     {label:'Learn why he knows the Gold name', spot:'gold_name'},
     {label:'Hear the names from the past', spot:'names_past'},
     {label:'Discover the connection between the Fifteen Evils and the Gold lineage', spot:'evils_gold_link'},
     {label:'Prepare for what comes next', chapter:158}]}, rw:{xp:125000, gold:29000, rep:430},
   subj:'The Gold name', body:'If he knows our family, I want to know how. Listen to all of it. — Greyson'},
  {id:'m_fifteen_monsters', needCh:159, title:'Fifteen Monsters', obj:{type:'steps', steps:[
     {label:'Hear the Hollow King\'s account', spot:'hk_account'},
     {label:'Learn what the Fifteen truly were', spot:'fifteen_truly'},
     {label:'Distinguish corruption from designation', spot:'corruption_designation'},
     {label:'Decide whether the Hollow King can be trusted', chapter:159},
     {label:'Uncover the link to Jade\'s lineage', spot:'lineage_link'}]}, rw:{xp:130000, gold:30000, rep:440},
   subj:'Fifteen names', body:'Trust nothing yet. But write down every word. — Greyson'},
  {id:'m_crownless_king', needCh:160, title:'The Crownless King', obj:{type:'steps', steps:[
     {label:'Learn the Hollow King\'s past', spot:'hk_past'},
     {label:'Uncover the truth of the sealed kingdom', spot:'sealed_kingdom'},
     {label:'Confront his present crimes', spot:'present_crimes'},
     {label:'Decide how justice must be carried out', chapter:160},
     {label:'Prepare for the coming conflict', chapter:160}]}, rw:{xp:135000, gold:31000, rep:450},
   subj:'A king without a crown', body:'Pity him if you must. Do not let pity decide for you. — Greyson'},
  {id:'m_judgment', needCh:161, title:'Judgment', obj:{type:'steps', steps:[
     {label:'Confront the Hollow King', chapter:161},
     {label:'Survive the boss battle', boss:'boss_hollow_king'},
     {label:'Protect the party formation', chapter:161},
     {label:'Contain the Third Evil', chapter:161},
     {label:'Decide its final judgment', chapter:161}]}, rw:{xp:150000, gold:34000, rep:500},
   subj:'Judgment', body:'Do what is just, and what you can live with. — Greyson'},
  {id:'m_three_truths', needCh:162, title:'Three Evils, Three Truths', obj:{type:'steps', steps:[
     {label:'Review the three recent cases', spot:'three_cases'},
     {label:'Examine the Fifteen Register', spot:'register_three'},
     {label:'Witness the Register update', spot:'register_update'},
     {label:'Understand why the title "Evil" never guaranteed a single truth', spot:'evil_title'},
     {label:'Prepare for the next investigation', chapter:162}]}, rw:{xp:155000, gold:35000, rep:510},
   subj:'The Register changes', body:'Orin tells me the Register will be rewritten. About time. — Greyson'},
  {id:'m_fifteen_register', needCh:163, title:'The Fifteen Register', obj:{type:'steps', steps:[
     {label:'Compare the first three resolved cases', spot:'cases_compare'},
     {label:'Examine the Fifteen Register', chapter:163},
     {label:'Learn who copied the official list', spot:'who_copied'},
     {label:'Discover why the terminology changed', spot:'terminology_changed'},
     {label:'Uncover the mystery behind the altered Keeper oath', spot:'oath_mystery'}]}, rw:{xp:160000, gold:36000, rep:520},
   subj:'Who wrote the list', body:'Find out who wrote it, and why it changed. — Greyson'},
  {id:'m_missing_fourth', needCh:164, title:'The Missing Fourth Entry', obj:{type:'steps', steps:[
     {label:'Examine the Fifteen Register and identify the gap in the numbering', spot:'numbering_gap'},
     {label:'Compare the Keeper-era documents with later copies', spot:'keeper_vs_copies'},
     {label:'Discover the missing Fourth Entry', spot:'removed_page'},
     {label:'Learn who removed it from the official record', spot:'who_removed'},
     {label:'Uncover why Evil IV was hidden from future generations', chapter:164}]}, rw:{xp:165000, gold:37000, rep:530},
   subj:'A page cut out', body:'Someone cut a page out of history. I would like to meet them. — Greyson'},
  {id:'m_nameless_witness', needCh:165, title:'The Nameless Witness', obj:{type:'steps', steps:[
     {label:'Investigate the ruined archive-shrine and the missing Fourth Entry', spot:'shrine_fourth'},
     {label:'Analyze the remaining records for clues about Evil IV', spot:'shrine_records'},
     {label:'Learn more about the Nameless Witness and their connection to the Fifteen', spot:'witness_meet'},
     {label:'Determine why the Fourth Entry was removed', spot:'witness_why'},
     {label:'Prepare for the party\'s next encounter with the Nameless Witness', chapter:165}]}, rw:{xp:170000, gold:38000, rep:540},
   subj:'Someone was waiting', body:'Someone has been waiting for you. Do not go alone. — Greyson'},
  {id:'m_fifteen_shadows', needCh:166, title:'Fifteen Shadows', obj:{type:'steps', steps:[
     {label:'Report the northern truths to King Greyson', chapter:166},
     {label:'Change the mandate from destruction to resolution', chapter:166},
     {label:'Have the Register and the mission register revised', chapter:166}]}, rw:{xp:180000, gold:40000, rep:600},
   subj:'A new mandate', body:'Resolve them. I like the word. Begin when you are ready. — Greyson'},
  // ---- DRAFT, NOT CANON (parked at ch99 until the real chapter text is converted) ----
  {id:'m_wild', needCh:999, title:'Beyond the Walls', obj:{type:'reach', loc:'tribute_wilderness'}, rw:{xp:120, gold:60},
   subj:'Your first mission outside the city', body:'The time has come to leave the capital. Take your companions out along the Imperial Road and see what the wilderness hides. Use the horse carriage; the roads are not always quiet. — Greyson'},
  {id:'m_harbour', needCh:999, title:'Into Faepool', obj:{type:'reach', loc:'faepool_harbour'}, rw:{xp:150, gold:70},
   subj:'Faepool awaits', body:'Continue to Faepool Harbour, the gateway to the border region. Report anything strange. — Greyson'},
  {id:'m_forest', needCh:999, after:'m_harbour', title:'Thin the Faepool Wilds', obj:{type:'kill', area:'forest', need:6, label:'forest creatures'}, rw:{xp:200, gold:90, items:[{id:'herbal_tonic',qty:2}]},
   subj:'Trouble in the forest', body:'Travellers speak of corrupted beasts in Faepool Forest. Clear six of them from the paths. Be careful of anything that glows. — Greyson'},
  {id:'m_vigil', needCh:15, title:'The First Village', obj:{type:'reach', loc:'vigil_village'}, rw:{xp:220, gold:100},
   subj:'Vigil Village', body:'Faepool is a land of traditional forest villages. Go to Vigil Village and find the cause of the unrest; my pigeon will find you with updates. — Greyson'},
  {id:'m_frog', needCh:20, title:'The Swamp Warlord', obj:{type:'boss', key:'boss_frog_mahan'}, rw:{xp:500, gold:260, rep:10},
   subj:'Frog Mahan', body:'Frog Mahan lies beyond the forest, three weeks on foot. One of Xima\'s underlings. End it. — Greyson'},
  {id:'m_ruins', needCh:999, title:'The Forgotten Ruins', obj:{type:'investigate', spot:'ruins_clues'}, rw:{xp:320, gold:140},
   subj:'Ancient records', body:'There are ruins beneath Faepool older than the Crown\'s records. Study them. Whatever Jade sees there, write it down. — Greyson'},
  {id:'m_inn', needCh:999, title:'Shadows at the Dark Inn', obj:{type:'investigate', spot:'inn_clues'}, rw:{xp:380, gold:160},
   subj:'An inn that should be empty', body:'An inn on the old forest road has swallowed three of my scouts. Go there and find out why. Search every room. — Greyson'},
  {id:'m_river', needCh:999, title:'Across the Sea', obj:{type:'reach', loc:'river_crossing'}, rw:{xp:420, gold:190},
   subj:'The sea route', body:'Take ship from Faepool Harbour. We need to know whether the water is passable and who controls it. — Greyson'},
  {id:'m_trial', needCh:999, title:'The Ancient Trial', obj:{type:'reach', loc:'trial_grounds'}, rw:{xp:500, gold:200},
   subj:'An old arena', body:'My scholars place an arena of the ancients beyond the ruins. Take the party there; strength alone will not be enough. — Greyson'},
  {id:'m_hidden', needCh:999, title:'The Hidden Village', obj:{type:'reach', loc:'hidden_village'}, rw:{xp:520, gold:210},
   subj:'People who chose to hide', body:'Some of my subjects fled Xima\'s conflict and were never found. If you find them, listen before you ask. — Greyson'},
  {id:'m_corrupt', needCh:999, title:'The Blight', obj:{type:'kill', key:'corrupted_stag', need:2, label:'Corrupted Stags'}, rw:{xp:650, gold:260, rep:10},
   subj:'The forest is dying', body:'Reports say stags once sacred to the forest are now carriers of the curse. Put down two of them. — Greyson'},
  {id:'m_reunion', needCh:999, title:'A Reunion', obj:{type:'reach', loc:'reunion_area'}, rw:{xp:800, gold:300},
   subj:'Someone has been seen', body:'A scout swears he saw a man with a crossbow on the wilderness route. Go to the Reunion Area. — Greyson'},
  {id:'m_bracelet', needCh:999, title:'A Gift from the Crown', obj:{type:'read'}, rw:{xp:150, gold:0, flag:'bracelet'},
   subj:'Pigeons are too slow', body:'Wear this bracelet. It will carry my voice to you anywhere on the island, and yours to me. No more waiting on birds. — Greyson'},
  {id:'m_dragon', needCh:999, title:'Dragon Vale', obj:{type:'reach', loc:'dragon_vale'}, rw:{xp:700, gold:300},
   subj:'The Vale awakens', body:'The old accounts say the Vale answers only to a certain bloodline. Bring Devon. — Greyson'},
  {id:'m_pearl', needCh:999, after:'m_dragon', title:'The Dragon Sanctuary', obj:{type:'investigate', spot:'sanctuary'}, rw:{xp:900, gold:400, items:[{id:'relic_dust',qty:3}]},
   subj:'What the Sanctuary remembers', body:'Read the wards. Learn what became of the first Pearl bearer. Devon is the only one of you who can. — Greyson'},
];
const missionById = id => MISSIONS.find(m => m.id===id);
const mState = id => (G.missions[id]||{}).st;

function checkMissionOffers(){
  const msgs = [];
  MISSIONS.forEach(m => {
    if(G.missions[m.id]) return;
    if(G.ch < m.needCh || (m.after && mState(m.after)!=='done')) return;
    G.missions[m.id] = {st:'sent'};
    const delay = hasBracelet() ? 0 : Math.max(1, hopsFromCapital(G.loc));
    G.pending.push({mid:m.id, due:G.day + delay});
  });
  return msgs.concat(deliverLetters());
}
function deliverLetters(){
  const msgs = [], ok = hasBracelet() || isSettlement(G.loc);
  if(!ok) return msgs;
  G.pending = G.pending.filter(p => {
    if(p.due > G.day) return true;
    const m = missionById(p.mid);
    G.letters.unshift({id:'L_'+m.id, mid:m.id, subj:m.subj, body:m.body, day:G.day, read:false});
    G.missions[m.id] = {st:'offered'};
    msgs.push((hasBracelet()?'📿 King Greyson calls through the bracelet: ':'🕊️ A pigeon arrives: ')+'"'+m.subj+'"');
    return false;
  });
  msgs.forEach(m => toast(m));
  return msgs;
}
// Audience at the palace: all pending letters are handed over in person
function palaceAudience(){ G.pending.forEach(p => p.due = G.day); const m = deliverLetters(); if(!m.length) m.push('King Greyson has no new orders for you.'); return m; }
function acceptMission(id){
  const m = missionById(id), L = G.letters.find(l => l.mid===id); if(L) L.read = true;
  G.missions[id] = {st:'active'}; G.mprog[id] = 0;
  if(m.obj.type==='read') return completeMission(id);
  return checkReach(G.loc).concat(checkSteps());
}
function completeMission(id){
  const m = missionById(id); G.missions[id] = {st:'done'};
  const msgs = grantReward(m.rw, '📜 Mission complete: '+m.title);
  if(typeof regardAdd==='function'){ const rm = regardAdd(G.loc, 15); if(rm) msgs.push(rm); chronicle('Mission complete: '+m.title+'.', '📜'); }
  save(); return msgs.concat(checkMissionOffers());
}
function missionProgress(m){
  const st = mState(m.id), o = m.obj;
  if(st!=='active') return '';
  if(o.type==='kill') return (G.mprog[m.id]||0)+'/'+o.need+' '+o.label;
  if(o.type==='investigate') return (G.clues[o.spot]||0)+'/'+spotById(o.spot).need+' clues';
  if(o.type==='steps') return o.steps.filter(s => stepDone(m, s)).length+'/'+o.steps.length+' objectives';
  return '';
}
// Multi-objective story quests ("Main Story Quest" boxes in the comic). Step kinds: spot (investigation done) | visit (location) | boss | mission | kill {need}
function stepDone(m, s){
  if(s.spot) return !!G.flags['inv_'+s.spot];
  if(s.flag) return !!G.flags[s.flag];
  if(s.chapter) return G.ch >= s.chapter;   // story-only objective, checked off when that chapter completes
  if(s.visit) return !!G.visited[s.visit];
  if(s.boss) return !!G.flags['boss_'+s.boss];
  if(s.mission) return mState(s.mission)==='done';
  if(s.kill) return (G.mprog[m.id+':'+s.kill]||0) >= s.need;
  return false;
}
function checkSteps(){
  const msgs = []; let again = true;
  while(again){ again = false;   // a finished mission can finish another that depends on it
    MISSIONS.forEach(m => { if(mState(m.id)==='active' && m.obj.type==='steps' && m.obj.steps.every(s => stepDone(m, s))){ msgs.push.apply(msgs, completeMission(m.id)); again = true; } });
  }
  return msgs;
}
function stepKill(key){
  MISSIONS.forEach(m => { if(mState(m.id)==='active' && m.obj.type==='steps') m.obj.steps.forEach(s => { if(s.kill===key) G.mprog[m.id+':'+key] = Math.min(s.need, (G.mprog[m.id+':'+key]||0)+1); }); });
}
function checkReach(loc){
  let msgs = [];
  MISSIONS.forEach(m => { if(mState(m.id)==='active' && m.obj.type==='reach' && m.obj.loc===loc) msgs = msgs.concat(completeMission(m.id)); });
  return msgs;
}

/* ---------------- SPOTS ---------------- */
function spotById(id){ for(const l of Object.values(LOCATIONS)){ const s = l.spots.find(x => x.id===id); if(s) return s; } return null; }
function locOfSpot(id){ return LOC_ORDER.find(k => LOCATIONS[k].spots.some(s => s.id===id)); }
function foeGroup(keys, lv, n){ return Array.from({length:n}, () => ({key:AR(keys), lv})); }
const lvFor = (sp, off) => Math.max(sp.lo||1, avgPartyLv() + (off||0));

/* ---------------- KILL / ARRIVAL HOOKS ---------------- */
function onFoesDefeated(foes){
  const msgs = [];
  foes.forEach(f => {
    const e = ENEMIES[f.key];
    // missions
    MISSIONS.forEach(m => {
      if(mState(m.id)!=='active') return; const o = m.obj;
      if(o.type==='kill' && (o.area ? e.area===o.area : f.key===o.key)){ G.mprog[m.id] = (G.mprog[m.id]||0)+1; if(G.mprog[m.id]>=o.need) msgs.push.apply(msgs, completeMission(m.id)); }
      else if(o.type==='boss' && o.key===f.key) msgs.push.apply(msgs, completeMission(m.id));
    });
    stepKill(f.key);
    msgs.push.apply(msgs, questKill(f.key));
    msgs.push.apply(msgs, bountyKill(f.key));
  });
  msgs.push.apply(msgs, checkSteps());
  return msgs;
}
function onArrive(loc){
  G.visited[loc] = true;
  if(typeof famDeliver==='function') famDeliver();
  let msgs = checkReach(loc);
  msgs = msgs.concat(questArrive(loc));
  msgs = msgs.concat(checkSteps());
  return msgs;
}

/* ---------------- TRAVEL ---------------- */
let PEND = null;   // travel in progress while its encounter battle is running
function travelOptions(){
  return routesFrom(G.loc).map(({r,to}) => ({r, to, open: locOpen(to), modeOk: modeOpen(r.mode), cost: fareOf(r), can: locOpen(to) && modeOpen(r.mode) && G.gold >= fareOf(r)}));
}
function startTravel(r, to){
  if(!locOpen(to) || !modeOpen(r.mode) || G.gold < fareOf(r)) return;
  G.gold -= fareOf(r);
  if(voyageRoute(r)) return startVoyage(ROUTES.indexOf(r), to);
  const ev = Math.random() < (r.mode==='ship' ? .5 : .35) ? AR(EVENTS[r.mode]) : null;
  PEND = {r, to, ev, from:G.loc};
  if(Math.random() < Math.max(0, ((G.flags.valen_restored && r.restoredRisk!==undefined) ? r.restoredRisk : r.risk) - (typeof whisperBonus==='function' ? whisperBonus('road') : 0))){
    const lv = Math.max(1, avgPartyLv() + (r.mode==='ship'?1:0));
    const group = foeGroup(r.pool, lv, 2 + (Math.random()<.35?1:0));
    flash(['⚠️ '+(r.mode==='ship'?'Raiders and weather':'Trouble on the road')+' on the '+r.n+'!']);
    startBattle({foes:group, rewards:true, onWin:()=>finishTravel()});
    return 'battle';
  }
  flash(finishTravel()); return 'arrived';
}
function finishTravel(){
  const p = PEND; if(!p) return [];
  PEND = null;
  const msgs = ['Arrived at '+LOCATIONS[p.to].n+' by '+MODES[p.r.mode].n.toLowerCase()+' ('+p.r.days+' day'+(p.r.days>1?'s':'')+').'];
  G.loc = p.to; syncAway();
  if(p.ev){ msgs.push(p.ev.t);
    if(p.ev.xp) gainXp(p.ev.xp, G.party).forEach(m => msgs.push(m));
    if(p.ev.gold){ G.gold += p.ev.gold; msgs.push('+'+p.ev.gold+' gold'); }
    if(p.ev.bond){ G.active.forEach(id => addBond(id, p.ev.bond)); msgs.push('Bond +'+p.ev.bond+' (active party)'); } }
  if(typeof banterLines==='function') banterLines('travel', .5).forEach(m => msgs.push(m));
  gainXp(8 * p.r.days, G.party);
  const first = !G.visited[p.to];
  msgs.push.apply(msgs, onArrive(p.to));
  msgs.push.apply(msgs, advanceDay(p.r.days));
  if(first){ msgs.push('📍 New location discovered: '+LOCATIONS[p.to].n); if(typeof chronicle==='function') chronicle('Reached '+LOCATIONS[p.to].n+' for the first time.', '📍'); }
  save(); return msgs;
}
function onBattleLost(){
  if(G.voyage){ flash(['💀 The ship limps back to '+LOCATIONS[G.voyage.from].n+'. The fare is lost.']); voyageAbort(); return; }
  if(PEND){ flash(['💀 The party was driven back to '+LOCATIONS[PEND.from].n+'. The fare is lost.']); PEND = null; }
}

/* ---------------- QUESTS (Crimson Tide contracts) ---------------- */
// kill: key|area  collect: item  deliver: generated (parcel to another settlement). needLoc: location that must be open.
const QUEST_POOL = [
  {id:'q_dockhands', type:'kill', key:'dock_pickpocket', need:6, icon:'🧤', name:'Light Fingers', desc:'Cutpurses are emptying pockets along the quays.', rw:{xp:140, gold:70, rep:3}, needLoc:'faepool_harbour'},
  {id:'q_smugglers', type:'kill', key:'smuggler', need:4, icon:'📦', name:'Smuggler\'s End', desc:'A smuggling ring slips past every watch.', rw:{xp:180, gold:90, rep:5}, needLoc:'faepool_harbour'},
  {id:'q_roads', type:'kill', key:'road_bandit', need:5, icon:'🗡️', name:'Clear the Road', desc:'Bandits have been robbing carriages on the Coast Road.', rw:{xp:170, gold:85, rep:4}, needLoc:'faepool_harbour'},
  {id:'q_archers', type:'kill', key:'bandit_archer', need:4, icon:'🏹', name:'Ridge Watch', desc:'Archers pin carriages on the ridge. Remove them.', rw:{xp:170, gold:85, rep:4}, needLoc:'faepool_harbour'},
  {id:'q_assassins', type:'kill', key:'masked_assassin', need:2, icon:'🥷', name:'Faceless Hire', desc:'Someone is paying for silence. Find the knives.', rw:{xp:300, gold:180, rep:10}, needLoc:'dark_inn'},
  {id:'q_wolves', type:'kill', key:'forest_wolf', need:5, icon:'🐺', name:'Wolves at the Edge', desc:'The wolves have grown bold near the village.', rw:{xp:200, gold:90, rep:5}, needLoc:'faepool_forest'},
  {id:'q_xima', type:'kill', key:'xima_sprite', need:4, icon:'🧚', name:'Corruption in the Wood', desc:'Sprites touched by the curse blight the paths.', rw:{xp:260, gold:130, rep:8}, needLoc:'faepool_forest'},
  {id:'q_toads', type:'kill', key:'bog_toad', need:5, icon:'🐸', name:'Mahan\'s Kin', desc:'Bog toads clog the causeway.', rw:{xp:260, gold:130, rep:6}, needLoc:'frog_mahan'},
  {id:'q_raiders', type:'kill', key:'sea_raider', need:3, icon:'🏴‍☠️', name:'River Raiders', desc:'Ferries are being boarded at the mouth of the river.', rw:{xp:280, gold:170, rep:8}, needLoc:'river_crossing'},
  {id:'q_serpent', type:'kill', key:'river_serpent', need:1, icon:'🐍', name:'The Long Shadow', desc:'Boatmen refuse to cross the deep channel.', rw:{xp:450, gold:260, rep:14}, needLoc:'river_crossing'},
  {id:'q_drakes', type:'kill', key:'vale_drake', need:3, icon:'🦎', name:'Scale and Flame', desc:'Drakes have been nesting near the old road.', rw:{xp:420, gold:210, rep:10}, needLoc:'dragon_vale'},
  {id:'q_vig_magistrate', type:'kill', key:'road_bandit', need:4, icon:'🎭', name:'The Magistrate\'s Guards', desc:'A village reports higher taxes and guards who beat anyone who complains. Strike the thugs, not the law: proof comes first. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:380, gold:190, rep:10}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_vig_children', type:'kill', key:'smuggler', need:3, icon:'🎭', name:'The Missing Children', desc:'Children vanish near the forest road. It is not demons. Someone is paying for them. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:480, gold:240, rep:14}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_vig_fever', type:'collect', item:'forest_herb', need:5, icon:'🎭', name:'The Fever in the Hills', desc:'A village has an illness no healer knows. Bring herbs for Jenika\'s remedy. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:420, gold:200, rep:12}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_vig_warrior', type:'kill', key:'relic_spirit', need:2, icon:'🎭', name:'The Old Warrior\'s Request', desc:'A retired soldier asks you to quiet the spirits haunting his old post. He studies your sword style a little too long. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:460, gold:230, rep:12}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_vig_beasts', type:'kill', key:'shade_beast', need:4, icon:'🎭', name:'Shadows on the Mountain Road', desc:'Corrupted spirit beasts hunt the old road at night and caravans no longer pass. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:520, gold:260, rep:14}, needLoc:'dragon_border', needCh:75, masked:true},
  {id:'q_vig_demons', type:'kill', key:'imp', need:5, icon:'🎭', name:'Demons at the Border', desc:'Imps and lesser demons slip across the Dragonvale border at night. Thin them out before the villages notice. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:400, gold:200, rep:12}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_vig_ruins', type:'kill', key:'stone_sentinel', need:2, icon:'🎭', name:'The Waking Ruins', desc:'Old wardens have woken in the ruins above a village. Put them to rest. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:520, gold:260, rep:14}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_vig_drakes', type:'kill', key:'vale_drake', need:3, icon:'🎭', name:'Border Drakes', desc:'Drakes are raiding herds on the mountain road. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:430, gold:220, rep:12}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_herbs', type:'collect', item:'forest_herb', need:4, icon:'🌿', name:'Herbalist\'s Request', desc:'Bring 4 Faepool Herbs to any board.', rw:{xp:110, gold:80, rep:3}, needLoc:'faepool_forest'},
  {id:'q_glands', type:'collect', item:'toad_gland', need:4, icon:'🧫', name:'Apothecary Order', desc:'Bring 4 Toad Glands to any board.', rw:{xp:200, gold:130, rep:4}, needLoc:'frog_mahan'},
  {id:'q_fish', type:'collect', item:'river_fish', need:5, icon:'🐟', name:'Fresh Catch', desc:'The harbour market wants 5 River Fish.', rw:{xp:150, gold:100, rep:3}, needLoc:'river_crossing'},
  {id:'q_deliver', dynamic:'deliver'},
];
const PARCELS = ['sealed letters','medicine crates','silk bolts','lantern oil','preserved tea','forge tools'];
function genDelivery(from){
  const dests = LOC_ORDER.filter(k => isSettlement(k) && locOpen(k) && k!==from);
  if(!dests.length) return null;
  const other = from==='capital' ? 'dragon_vale' : from==='dragon_vale' ? 'capital' : null;
  const royal = !!other && dests.includes(other) && Math.random() < .6;   // Tribute <-> Dragonvale courier runs
  const to = royal ? other : AR(dests), hops = Math.max(1, Math.abs(hopsFromCapital(to) - hopsFromCapital(from)));
  const goods = AR(PARCELS), n = 1;
  return { id:'q_del_'+Math.random().toString(36).slice(2,7), type:'deliver', to, from, icon:'📮', name:'Deliver '+goods+' to '+LOCATIONS[to].n,
    desc:(royal?'A royal courier run between Tribute and Dragonvale: ':'A merchant needs ')+goods+(royal?' to ':' carried to ')+LOCATIONS[to].n+'. Deliver by carriage or ship.', need:n, c:0,
    rw:{xp:90+hops*40+(royal?80:0), gold:60+hops*45+(royal?90:0), rep:4+(royal?4:0)} };
}
function boardFor(loc){
  const b = G.quests.board; if(!b[loc]) b[loc] = {day:0, list:[]};
  const bd = b[loc];
  if(bd.day === G.day && bd.list.length) return bd.list;
  const taken = new Set(G.quests.active.map(q => q.id));
  const pool = QUEST_POOL.filter(q => q.dynamic || (locOpen(q.needLoc) && !taken.has(q.id) && (!q.needCh || G.ch >= q.needCh) && (loc==='dragon_vale' ? q.masked : !q.masked)));
  const picks = pool.map(q => q).sort(() => Math.random()-.5).slice(0, 4);
  bd.list = picks.map(q => q.dynamic ? genDelivery(loc) : Object.assign({}, q, {c:0})).filter(Boolean);
  bd.day = G.day; return bd.list;
}
const MAX_QUESTS = 5;
function acceptQuest(loc, i){
  const q = boardFor(loc)[i]; if(!q || G.quests.active.length >= MAX_QUESTS) return false;
  G.quests.board[loc].list.splice(i,1); G.quests.active.push(q); save(); return true;
}
function abandonQuest(i){ G.quests.active.splice(i,1); save(); }
function finishQuest(q, msgs){
  G.quests.active = G.quests.active.filter(x => x!==q); G.quests.done++;
  if(q.trust && typeof addTrust==='function'){ addTrust(q.trust); const l = nextAdrianLetter(); if(l) msgs.push('💌 A letter from Adrian: "'+l+'"'); }
  grantReward(q.rw, '').forEach(m => msgs.push(m.replace(/^ · /,'')));
  msgs.unshift('🎯 Quest complete: '+q.name);
  if(typeof regardAdd==='function'){ const rm = regardAdd(G.loc, 8); if(rm) msgs.push(rm); }
}
function questKill(key){
  const msgs = [];
  G.quests.active.slice().forEach(q => {
    if(q.type!=='kill' || q.key!==key) return;
    q.c = Math.min(q.need, q.c+1);
    if(q.c >= q.need) finishQuest(q, msgs);
  });
  return msgs;
}
function questArrive(loc){
  const msgs = [];
  G.quests.active.slice().forEach(q => { if(q.type==='deliver' && q.to===loc){ q.c = q.need; finishQuest(q, msgs); } });
  return msgs;
}
function turnInQuest(i){
  const q = G.quests.active[i]; if(!q || q.type!=='collect' || (G.inv[q.item]||0) < q.need) return [];
  G.inv[q.item] -= q.need; const msgs = []; finishQuest(q, msgs); save(); return msgs;
}

/* ---------------- BOUNTIES (Crimson Tide board, in-game days) ---------------- */
function knownKeys(){
  const keys = new Set();
  LOC_ORDER.filter(locOpen).forEach(k => LOCATIONS[k].spots.forEach(s => { (s.pool||[]).forEach(x=>keys.add(x)); if(s.elite) keys.add(s.elite); }));
  ROUTES.filter(r => locOpen(r.a) && locOpen(r.b)).forEach(r => r.pool.forEach(x=>keys.add(x)));
  return Array.from(keys).filter(k => ENEMIES[k]);
}
function refreshBounties(force){
  const b = G.bounties;
  if(!force && b.list.length && G.day - b.day < 2) return;
  const list = knownKeys().sort(() => Math.random()-.5).slice(0,5).map(k => {
    const e = ENEMIES[k], need = e.elite ? 1 : 2 + Math.floor(Math.random()*3);
    return {id:'b_'+k, key:k, need, c:0, done:false, icon:e.icon, name:(e.elite?'Wanted: ':'Cull: ')+e.n,
            rw:{xp:Math.round(e.xp*need*(e.elite?2.5:1.6)), gold:Math.round(e.gold*need*(e.elite?2.5:1.6))}};
  });
  G.bounties = {day:G.day, list};
}
function bountyKill(key){
  const msgs = [];
  refreshBounties();
  G.bounties.list.forEach(b => {
    if(b.done || b.key!==key) return;
    b.c = Math.min(b.need, b.c+1);
    if(b.c >= b.need){ b.done = true; msgs.push('💰 Bounty complete: '+b.name+' · +'+b.rw.xp+' XP · +'+b.rw.gold+'g');
      gainXp(b.rw.xp, G.party); G.gold += b.rw.gold; }
  });
  return msgs;
}

/* ---------------- ACTIVITIES (spots) ---------------- */
function doHunt(spotId, elite){
  const sp = spotById(spotId), lv = lvFor(sp, elite?2:0);
  const foes = elite ? [{key:sp.elite, lv}, ...foeGroup(sp.pool, lv, 1)] : foeGroup(sp.pool, lv, 2 + (Math.random()<.4?1:0));
  const ins = typeof takeInsight==='function' && takeInsight(), sen = typeof takeSense==='function' && takeSense();
  startBattle({foes, rewards:true, opening:() => {
    if(ins){ B.foes.forEach(f => { f.st.slow = {d:3}; }); blog('⚔️ Jade read their formation: the foes start slowed.','good'); }
    if(sen){ B.foes.forEach(f => { f.known = true; }); blog('🔮 Devon senses their magic: the foes are revealed.','good'); }
  }});
}
function doGather(spotId){
  const sp = spotById(spotId), msgs = [];
  const gotLoot = () => {
    sp.loot.forEach(d => { const q = rint(d.qty); addItems([{id:d.id, qty:q}]); msgs.push('Found '+ITEMS[d.id].icon+' '+ITEMS[d.id].n+' ×'+q); });
    if(sp.bonus && Math.random()<sp.bonus.chance){ addItems([{id:sp.bonus.id, qty:1}]); msgs.push('✨ Lucky find: '+ITEMS[sp.bonus.id].icon+' '+ITEMS[sp.bonus.id].n); }
    msgs.push.apply(msgs, advanceDay(1)); save();
  };
  const insG = typeof takeInsight==='function' && takeInsight();
  if(Math.random() < (insG ? .08 : .3)){
    startBattle({foes:foeGroup(sp.ambush, lvFor(sp), 2), rewards:true, onWin:()=>{ gotLoot(); return msgs; }});
    return 'battle';
  }
  gotLoot(); flash(msgs); return 'done';
}
function doInvestigate(spotId){
  const sp = spotById(spotId); if((G.clues[spotId]||0) >= sp.need) return;
  const ins = typeof takeInsight==='function' && takeInsight(), sen = typeof takeSense==='function' && takeSense();
  const found = () => {
    const n = G.clues[spotId] = (G.clues[spotId]||0)+1, msgs = ['🔎 Clue '+n+'/'+sp.need+': '+sp.clues[n-1]];
    if(ins) msgs.push('⚔️ Jade\'s Insight finds a hidden path: no time lost.');
    if(sen){ gainXp(300+avgPartyLv()*10, G.party).forEach(m => msgs.push(m)); msgs.push('🔮 Devon reads the magic residue (bonus XP).'); if(typeof corrAdd==='function' && isCorrupted(G.loc)){ corrAdd(G.loc, -5); msgs.push('Corruption −5%.'); } }
    if(n >= sp.need){ G.flags['inv_'+spotId] = true; if(typeof leadAdd==='function') leadAdd(spotId); msgs.push.apply(msgs, grantReward(sp.rw, '🕯️ Investigation complete: '+sp.n));
      if(typeof regardAdd==='function'){ const rm = regardAdd(G.loc, 10); if(rm) msgs.push(rm); chronicle('Investigation complete: '+sp.n+'.', '🕯️'); }
      MISSIONS.forEach(m => { if(mState(m.id)==='active' && m.obj.type==='investigate' && m.obj.spot===spotId) msgs.push.apply(msgs, completeMission(m.id)); });
      msgs.push.apply(msgs, checkSteps()); }
    msgs.push.apply(msgs, advanceDay(ins ? 0 : 1)); save(); return msgs;
  };
  const magicOnly = sen && sp.ambush && sp.ambush.length && sp.ambush.every(k => (ENEMIES[k].traits||[]).includes('magic'));
  if(sp.ambush && sp.ambush.length && !magicOnly && Math.random() < (ins ? .1 : .4)){
    startBattle({foes:foeGroup(sp.ambush, lvFor(sp), 2), rewards:true, onWin:found});
    return 'battle';
  }
  flash(found()); return 'done';
}
function doBoss(spotId){
  const sp = spotById(spotId), lv = lvFor(sp);
  const foes = [{key:sp.boss, lv}].concat((sp.add||[]).map(k => ({key:k, lv:Math.max(1,lv-1)})));
  startBattle({foes, rewards:true, seal:!!sp.seal, firstClear:!G.flags['boss_'+sp.boss], onWin:()=>{ G.flags['boss_'+sp.boss] = true; return checkSteps(); }});
}
function doPractice(){
  const lv = avgPartyLv(); if(lv > 15) return ['The grounds have little left to teach at your level.'];
  const msgs = ['Sword practice, meditation and drills. +'+(30+lv*3)+' XP'];
  gainXp(30+lv*3, G.party).forEach(m => msgs.push(m));
  return msgs.concat(advanceDay(1));
}
const VILLAGE_ACTS = {
  archery:{n:'Teach the youths archery with Levi', icon:'🏹', need:'levi', bond:{levi:5}, xp:40, line:'Levi shows the village children how to draw a bow. Jade watches him smile for the first time in a while.'},
  healer:{n:'Help Sky treat the villagers', icon:'💙', need:'sky', bond:{sky:5}, xp:30, items:[{id:'forest_herb',qty:[1,2]}], line:'You grind herbs and carry water while Sky treats the sick. The villagers start to call him their healer.'},
  haren:{n:'Listen to Haren\'s stories', icon:'🍵', hint:true, gold:15, line:'Haren pours tea and talks about the old days, and about the northern forest nobody walks into any more.'},
  sally:{n:'Gather news with Sally', icon:'🌹', need:'sally', gold:25, line:'Sally trades small talk with merchants and returns with the village\'s secrets, and a few coins.'},
  chores:{n:'Help with village chores', icon:'🧺', gold:20, xp:20, line:'You carry baskets, mend a fence and learn which houses keep their shutters closed.'},
};
function doVillage(key){
  const a = VILLAGE_ACTS[key], id = 'vl_'+key;
  if(a.need && !isRecruited(a.need)) return [a.n+': '+CHARACTERS[a.need].n.split(' ')[0]+' is not in the party.'];
  if(G.bondDay[id] === G.day) return ['Already done today.'];
  G.bondDay[id] = G.day; const msgs = [a.line];
  Object.keys(a.bond||{}).forEach(h => { const m = addBond(h, a.bond[h]); msgs.push('Bond +'+a.bond[h]+' ('+CHARACTERS[h].n.split(' ')[0]+')'); if(m) msgs.push(m); });
  if(a.xp) gainXp(a.xp, G.party).forEach(m => msgs.push(m));
  if(a.gold){ G.gold += a.gold; msgs.push('+'+a.gold+' gold'); }
  (a.items||[]).forEach(d => { const q = rint(d.qty); addItems([{id:d.id, qty:q}]); msgs.push('Received '+ITEMS[d.id].icon+' '+ITEMS[d.id].n+' ×'+q); });
  if(a.hint) msgs.push(rumourFree());
  return msgs.concat(advanceDay(0));
}
function courtGossip(){
  if(G.bondDay.gossip === G.day) return ['Sally has told you what she knows today.'];
  G.bondDay.gossip = G.day;
  const hints = ['"Prince Roc has been ordered to reflect on his actions. His influence is badly limited."','"Someone used a royal-level seal after hours. I couldn\'t see who."','"Delilah has been very quiet since the decree."','"The late empress\'s records were sealed right after she died. Few know what is inside."','"The seamstresses say the king chose the date himself."'];
  return ['🌹 Sally leans close: '+AR(hints)].concat(advanceDay(0));
}
function rumourFree(){
  const hints = ['"They say people who walk into the northern forest never come out."','"Strangers have been asking about a girl with red thread in her hair."','"Watch who leaves the village after midnight."','"The old shrine was never meant to be used for that."'];
  return AR(hints);
}
const FAMILY_ACTS = {
  guards:{n:'Train the palace guards', icon:'⚔️', msg:'Jade drills the guards: "Protection is a responsibility to our people."'},
  villages:{n:'Visit the villages', icon:'🏘️', msg:'Jade listens to the villagers and offers her support.'},
  archives:{n:'Study the magical archives', icon:'📚', msg:'Devon reviews magical research: "Knowledge today prevents crises tomorrow."'},
  liora:{n:'An evening with Liora', icon:'🧸', msg:'An evening with Liora: herbs, embroidery and a quiet moment together.'},
};
function doFamily(k){
  const a = FAMILY_ACTS[k]; if(!a) return [];
  if(G.bondDay['fam_'+k] === G.day) return ['Already done today.'];
  G.bondDay['fam_'+k] = G.day; const lv = avgPartyLv(), msgs = ['🏡 '+a.msg];
  if(k==='guards'){ gainXp(40+lv*4, G.party).forEach(m => msgs.push(m)); G.rep += 2; msgs.push('+2 renown'); }
  if(k==='villages'){ const g = 25+lv*3; G.gold += g; G.rep += 3; msgs.push('+'+g+'g, +3 renown'); if(Math.random()<.5) msgs.push('🗣️ '+AR(['A villager mentions strange lights near the eastern ridge.','Someone saw a stranger asking about the old shrines.','Children say the mountain spirits have been quiet lately.'])); }
  if(k==='archives'){ gainXp(30+lv*3, ['devon','jade']).forEach(m => msgs.push(m)); }
  if(k==='liora'){ const m = addBond('devon', 6); msgs.push('Bond with Devon +6'); if(m) msgs.push(m); }
  return msgs.concat(advanceDay(1));
}
const GHOST_GIFT_PRICE = 120;
function buyGhostGift(){
  if(G.flags.ghost_gift_bought) return ['You already have the gift.'];
  if(G.gold < GHOST_GIFT_PRICE) return ['Not enough gold.'];
  G.gold -= GHOST_GIFT_PRICE; G.flags.ghost_gift_bought = true; addItems([{id:'ghost_gift',qty:1}]);
  return ['🍵 You buy a Moon-Blossom tea set and a bundle of dried herbs, wrapped in plain cloth. (-'+GHOST_GIFT_PRICE+'g)'].concat(checkSteps());
}
function giveGhostGift(){
  if(!G.flags.ghost_gift_bought || !(G.inv.ghost_gift>0)) return ['You have nothing to give yet.'];
  if(!G.party.includes('ghost_healer')) return ['The Ghost Healer is not with you.'];
  G.inv.ghost_gift--; G.flags.ghost_gifted = true; G.flags.ghost_trust = true; addBond('ghost_healer', 20);
  return ['🕯️ You place the gift in the Ghost Healer\'s hands. They are silent for a long moment: "No one has done this before." They teach you Ancient Remedy.'].concat(checkSteps());
}
const HOME_ACTS = {
  dinner:{n:'Family dinner', icon:'🍲', msg:'A long family dinner. Elara asks questions, Unique Gold tells old stories and Adrian passes the dishes.'},
  court:{n:'Training court with Adrian', icon:'⚔️', msg:'Adrian spars with Jade and Devon in the residence training court.'},
  albums:{n:'Old stories and portraits', icon:'🖼️', msg:'Elara brings out old portraits and tells the stories behind them.'},
  luck:{n:'Adrian tells of the accident', icon:'🍀', ch:96, msg:'Adrian tells her about the accident, and the blessing that remained: Luck.'},
  duty:{n:'Unique Gold on the duty of Gold', icon:'📜', ch:97, msg:'Unique Gold explains how the house of Gold guides the crown: judgement, strategy and loyalty.'},
  valor:{n:'Elara on the Valor lineage', icon:'👁️', ch:97, msg:'Elara explains the Valor bloodline: they listen to what others cannot hear.'},
};
function doHome(k){
  const a = HOME_ACTS[k]; if(!a) return [];
  if(G.bondDay['home_'+k] === G.day) return ['Already done today.'];
  if(a.ch && G.ch < a.ch) return ['Not yet.'];
  G.bondDay['home_'+k] = G.day; G.flags['act_'+k] = true; const lv = avgPartyLv(), msgs = ['🏡 '+a.msg];
  msgs.push.apply(msgs, checkSteps());
  if(k==='dinner'){ ['devon','sky','levi','seraphina'].filter(isRecruited).forEach(id => { const m = addBond(id, 3); if(m) msgs.push(m); }); msgs.push('Bond +3 (the party at the table)'); }
  if(k==='court'){ gainXp(40+lv*4, G.party).forEach(m => msgs.push(m)); }
  if(k==='luck') G.flags.luck_known = true;
  if(k==='albums'){ msgs.push('🗣️ '+AR(['Elara: "Yvette hummed when she healed. I can still hear it."','Unique Gold: "Some wounds never truly heal, but they teach you to listen."','Adrian: "You would hide that charm under your pillow, then claim you had lost it."'])); }
  return msgs.concat(advanceDay(1));
}
/* Symbol Door puzzle: four rings, each cycles through dragon / moon / pearl / spirit. The solution is a fixed order of the Valen crest:
   healing flower (spirit) joins the dragon spine (dragon) in life and balance (moon, pearl). */
const SYMS = ['🐉','🌙','🔮','🍃'], DOOR_SOL = [3,0,1,2];
function doorState(){ if(!G.door) G.door = [0,0,0,0]; return G.door; }
function turnRing(i){ const d = doorState(); d[i] = (d[i]+1) % 4; return []; }
function tryDoor(){
  if(!G.flags.door_open && typeof takeSense==='function' && takeSense()){ const d = doorState(), wrong = d.map((v,i) => v!==DOOR_SOL[i] ? i : -1).filter(i => i>=0); if(wrong.length){ const i = wrong[0]; d[i] = DOOR_SOL[i]; return ['🔮 Devon\'s Sense rings one symbol true: '+SYMS[DOOR_SOL[i]]+' settles into place.']; } }
  if(G.flags.door_open) return ['The door is already open.'];
  const d = doorState(), right = d.filter((v,i) => v===DOOR_SOL[i]).length;
  if(right < 4){ return ['🔣 The door hums, then stills. '+right+' of 4 symbols sit true.'+(right>=2?' (Hint: the crest joins the healing flower to the dragon spine: life and balance.)':'')]; }
  G.flags.door_open = true;
  addItems([{id:'relic_dust', qty:3}, {id:'seal_fragment', qty:1}]); gainXp(1500, G.party);
  return ['🔣 The symbols align: spirit, dragon, moon, pearl. The door opens onto an old healers\' store. Received 🔰 Dragonvale Seal Fragment and ✨ Relic Dust ×3. +1500 XP.'];
}
function deliverOrder(){
  if(G.flags.order_delivered) return ['The sealed order has already been delivered.'];
  G.flags.order_delivered = true;
  return ['✉️ You present Greyson\'s sealed order. The keepers read it in silence and bow: "Tribute has not forgotten us."'].concat(checkSteps());
}
function doMeditate(){
  if(G.bondDay.med === G.day) return ['Jade has already meditated today.'];
  G.bondDay.med = G.day; const lv = U('jade').lv, msgs = ['⛩️ Jade meditates at the shrine. Her sight grows clearer. +'+(40+lv*4)+' XP (Jade)'];
  gainXp(40+lv*4, ['jade']).forEach(m => msgs.push(m));
  return msgs.concat(advanceDay(1));
}
function doGarden(id){
  if(G.bondDay[id] === G.day) return ['Already spent time together today.'];
  G.bondDay[id] = G.day; const m = addBond(id, 5);
  const msgs = ['🌸 You walk the garden with '+CHARACTERS[id].n.split(' ')[0]+'. Bond +5.']; if(m) msgs.push(m);
  return msgs.concat(advanceDay(1));
}
const MEAL_COST = () => typeof discounted==='function' ? discounted(G.loc, 15) : 15;
function doMeal(){
  if(G.mealDay[G.loc] === G.day) return ['You have already eaten here today.'];
  if(G.gold < MEAL_COST()) return ['A shared meal costs '+MEAL_COST()+' gold.'];
  G.gold -= MEAL_COST(); G.mealDay[G.loc] = G.day; const msgs = ['🍶 A shared meal. Bond +2 for the active party.'];
  G.active.forEach(id => { const m = addBond(id, 2); if(m) msgs.push(m); });
  if(typeof banterLines==='function') banterLines('rest').forEach(m => msgs.push(m));
  return msgs.concat(advanceDay(0));
}
function rumour(){
  if(typeof hearWhisper==='function') return hearWhisper();   // the Whisper Ledger (whispers.js)
  if(G.gold < 5) return '"Rumours cost 5 gold, friend."';
  G.gold -= 5;
  const hints = [];
  const nm = MISSIONS.find(m => mState(m.id)==='active'); if(nm) hints.push('"The Crown\'s errand — '+nm.title+'. Don\'t dawdle."');
  const nxt = LOC_ORDER.find(k => !locOpen(k) && LOCATIONS[k].unlock.ch<99);
  if(nxt) hints.push('"They say there is something past the next bend in the story... '+LOCATIONS[nxt].icon+' '+LOCATIONS[nxt].n+'."');
  if(G.bounties.list.length){ const b = AR(G.bounties.list); hints.push('"There\'s coin on '+b.name.replace(/^.*?: /,'')+'. Look near their haunts."'); }
  hints.push('"A pigeon is quick, but only the bracelet is quicker."','"Carriages are cheap; the river is quick but wild."');
  return AR(hints);
}

/* ---------------- ARCHIVE LORE (draft from the design notes) ---------------- */
const LORE = [
  {ch:0, n:'Tribute Island', t:'A hidden island far across the eastern seas: cliffs, waterfalls and ancient mysteries. It is absent from ordinary charts and can only be found by those who call for it with a sincere prayer. Once a peaceful land of scholars and healers.'},
  {ch:0, n:'Xima\'s Curse', t:'Half a century ago the witch Xima cast a terrible curse upon Tribute. From her hatred came fifteen demonic evils that haunt the mountains, forests, seas and forgotten towns. The curse still lingers: a wound that will not heal.'},
  {ch:0, n:'King Greyson', t:'The young king. In the two years since he ascended the throne he has gathered allies, restored the island\'s strength and quietly prepared to strike back at Xima and her curse. He grew up beside Jade and treats her as a little sister.'},
  {ch:0, n:'Jade Gold', t:'Youngest daughter of the Imperial Advisor family. Born beneath a lunar eclipse; carries the blood of the sword-bearing Gold family and the legacy of her mother Valor, a powerful psychic. She can see beyond the veil, sense spirits and withstand what would destroy others, and the evils fear her. Named Imperial Guard by King Greyson.'},
  {ch:0, n:'Greyson\'s Gift', t:'King Greyson gives Jade a dagger and a flail. She is not meant to use them until the major battle.'},
  {ch:0, n:'The Sage\'s Prophecy', t:'"The first test is love. Until you learn how to love, you cannot ascend." A woman and two men will come to save the island; their fates are bound with Jade\'s, and together they will end the evils and begin Tribute anew.'},
  {ch:1, n:'Roc Chadwick', t:'Born Roc Chadstone, a prince of a faraway state whose mother was of low status. Despised by his half-siblings and stifled by palace rules, he left, took the name Chadwick and sailed on the Explorer. Now lives as a commoner on Tribute.'},
  {ch:1, n:'Sky Yale', t:'Found by Chad severely injured at sea and with no memories. All he had was a letter from his master and a jade pendant engraved with his mother\'s name. He and Chad sailed to Tribute to search for the truth about his origins.'},
  {ch:2, n:'Imperial Training Grounds', t:'Behind the palace office. The Imperial Guards and younger recruits train here every day. The guards greet Jade formally as "Lady Jade".'},
  {ch:2, n:'Jade\'s Fighting Style', t:'Jade is skilled in archery and prefers weapons that give her distance, such as whips and spears. Direct close combat is not her strength: she relies on speed, precision and control of the battlefield.'},
  {ch:3, n:'Chad and Jade', t:'Chad says they met twice before: once at a crowded market, arguing over the last chicken, and once over a job she wanted and he took, when she told him she hated him to the core of her heart. Jade shows no sign of remembering, and Chad takes that as a chance to start over.'},
  {ch:3, n:'Restricted-Area Pass', t:'A special pass prepared by Jade that lets Chad and Sky Yale enter the restricted area of the city. The Imperial Guards have no tolerance for lateness: arrive one second late and the pass is revoked.'},
  {ch:5, n:'The Fifteen Territories', t:'Jade briefs Chad and Sky with a map: each of the fifteen territories has its own demonic presence, with its own behaviours and the measures needed against it.'},
  {ch:7, n:'Jade\'s Engagement', t:'Jade is engaged to Levi Stanson, an arrangement made between their families and set by the elders. She is the future Imperial Advisor and currently the only female Imperial Guard. In Chapter 9 King Greyson offers to revoke the arrangement; in Chapter 10 she refuses.'},
  {ch:10, n:'Xima, the Witch Concubine', t:'Fifty years ago the witch concubine Xima cursed the island. Greyson\'s great-grandfather sent for ascetics and hermits, but they found no solution.'},
  {ch:10, n:'The Prophecy', t:'Told nineteen years ago, on the fifteenth lunar day of the ghost month (Jade\'s birthday): two men from a different world and a woman of extraordinary abilities will save Tribute from disaster. The three are to eliminate as many of Xima\'s evil underlings as they can in fifteen territories.'},
  {ch:12, n:'Levi Stanson', t:'Jade\'s fiancé. A strikingly handsome man with a long scar across his face and a tattoo of the character 郎 on his back, first seen entering Jade\'s room at the inn.'},
  {ch:14, n:'Levi Stanson\'s Death', t:'Greyson\'s pigeon reports that Stanson is dead and the engagement is revoked with immediate effect.'},
  {ch:15, n:'Lingering Vale', t:'Chad says he is from Lingering Vale, not Tribute.'},
  {ch:16, n:'Faepool and Vigil', t:'Faepool is a group of forest-filled, very traditional villages. Jade\'s clairvoyance reveals nothing here, as if a force is blocking her sight. At the Vigil festival young single women choose husbands by tossing coloured blossoms; blue is the highest caste, brown and green more common.'},
  {ch:16, n:'Frog Mahan', t:'The first target in Faepool. Reaching it means crossing the forest on foot, at least three weeks. Greyson sends updates and orders by his pet pigeon.'},
  {ch:18, n:'Bandit Booyeong', t:'Leader of the bandits who took Sky and demanded 1000 silver pieces (the first note misspells his name as Booyeon, an author\'s typo corrected from chapter 21). His territory suppresses powers.'},
  {ch:20, n:'Xima (Ximanka)', t:'Xima is short for Ximanka. The witch concubine who cursed Tribute appears to Jade in dreams and visions, on a throne in a cavern, tempting her with power and love if she joins her.'},
  {ch:21, n:'Power Suppression', t:'Booyeong\'s territory suppresses abilities. It weakens them but is not absolute: Sky can still form a small healing pact, so there must be dead spots (chapter 26).'},
  {ch:23, n:'Aunt Sue', t:'Appears to Jade in a vision and asks her to take care of her son. (Sky named his mother as Yvette Sue in chapter 5.)'},
  {ch:24, n:'Sibling Bond', t:'Bond unlocked: Jade and Sky. Sky says that no matter what, Jade is their sister.'},
  {ch:25, n:'Dragonvale', t:'Chad\'s homeland. He tells Jade he is a prince of Dragonvale and gives his name as Roc Chadwick, which is a deception: his real name is Roc Chadstone.'},
  {ch:25, n:'The Bonding Art', t:'A secret technique inscribed by an unknown ancient power in a hideout near the cave. It speaks of a bond that transcended blood, uniting two selves across fate and time. It worked only once Jade and Chad opened their hearts.'},
  {ch:28, n:'Sally Sin', t:'A fallen princess who lives in a brothel at the edge of the city, listening and gathering information while she waits for revenge on the man who used her and brought down her family.'},
  {ch:30, n:'Trinity', t:'The next destination of the party after Vigil.'},
  {ch:31, n:'Jade and Chad', t:'Jade ends their closeness (Bond -2). She will remain his employer only, and believes a prince may have many wives.'},
  {ch:32, n:'Levi\'s Lost Years', t:'Levi explains that on a covert mission beyond the northern mountains his comrade Ryn took a fatal blow meant for him. The enemy believed both died. Greyson revoked the engagement to protect his status; to the court Levi Stanson had to remain dead, so he lived under another name, working in the shadows.'},
  {ch:33, n:'Greyson\'s Coded Message', t:'Greyson orders the party to rest for a week, lie low and learn the villagers\' ways while his spies track Xima\'s minions.'},
  {ch:34, n:'The Northern Forest', t:'Haren, a villager, says the northern forest has been abandoned for years. People who enter it disappear, and those who go to investigate never return.'},
  {ch:35, n:'Xima\'s Markings', t:'A red sigil marks places touched by Xima\'s minions, including a corrupted shrine near Vigil. In chapter 38 Levi identifies them as tracking marks: the enemy is studying the party, not hunting it.'},
  {ch:38, n:'Greyson\'s Warning', t:'A coded message hidden in a book from Greyson: \"Do not pursue the enemy\'s nest. They want you here.\"'},
  {ch:39, n:'The Hidden Chamber', t:'Beneath the village lies a place of worship for Xima. Records show the village has supplied information and sacrifices to her followers for years. Xima says the ritual begins the following night and asks whether Jade will be the final offering.'},
  {ch:38, n:'Jade\'s Restoring Power', t:'When Jade touches an infected villager, the corruption inside them fades slightly. Sky says her power is not meant to destroy but to restore.'},
  {ch:36, n:'The Taken Villagers', t:'Villagers taken by Xima are alive but changed: empty eyes, voices no longer their own. Jade\'s touch makes the corruption surge. Xima uses people as vessels.'},
  {ch:37, n:'The Shaman and the Ritual', t:'An old shaman, who knows King Greyson, says Xima is gathering people for a larger ritual and believes the blood of the girl born under the lunar eclipse can complete it and open the way to something far worse.'},
  {ch:40, n:'Greyson\'s Second Warning', t:'Decoded: \"Do not chase Xima. The altar is a trap. She wants the Gold child to come to her. Prepare, do not pursue.\"'},
  {ch:40, n:'Jade\'s Blood', t:'Sky finds the villagers\' corruption reacts strongly to Jade\'s presence: it is tied to Xima\'s ritual and resonates with her blood.'},
  {ch:41, n:'The Offering Rite', t:'The villagers carry lanterns to a ruin in the northern forest and give a chosen young woman to Xima\'s altar, believing it keeps them safe. They act out of fear, not loyalty.'},
  {ch:42, n:'Jade\'s Partial Awakening', t:'In grief and fury Jade\'s hidden power partially awakens: a wave of crimson-gold light tears through the shadows. Xima watches with satisfaction.'},
  {ch:42, n:'The Pearl of Dragonvale', t:'The only known cure for the dark curse in Sky\'s body. It holds the pure essence of ancient dragons. Sky has forty-nine days left.'},
  {ch:44, n:'Greyson\'s Bracelet', t:'A bracelet that lets Greyson and Jade communicate privately, replacing pigeon post.'},
  {ch:44, n:'Dima', t:'A radiant spirit who speaks to Jade in dreams, in a realm of light beyond time. She warns of trials and says the sealed box holds a truth that will change everything.'},
  {ch:44, n:'Delilah', t:'The Dragonvale Royal Consort. She tests Jade with palace schemes and is carrying Prince Roc\'s child.'},
  {ch:46, n:'Jenika Moon', t:'Royal healer and imperial physician of Dragonvale, and cousin to Princes Roc and Devon. She tends Sky at the Royal Healing Pavilion.'},
  {ch:46, n:'Ripley', t:'A handmaiden assigned to attend Lady Jade in Dragonvale.'},
  {ch:47, n:'Prince Devon', t:'Chad\'s twin: colder and more regal. The guards fear him. He shelters Jade from the palace guards and names a condition for his help.'},
  {ch:48, n:'The Black Pearl', t:'The pearl held by Prince Devon. Dima tells Jade her destiny lies with its owner, and only through him can her cousin Sky live.'},
  {ch:48, n:'The Trial of Love', t:'Dima: \"You have no destiny with him. Your destiny lies with the owner of the Black Pearl... This is the Trial of Love.\" Xima offers power if Jade pledges herself to her instead of Dima, \"my sister\".'},
  {ch:50, n:'King Chadstone', t:'Ruler of Dragonvale and father of Princes Roc and Devon. He makes Jade Princess of Tribute and decrees she may choose one of his unmarried princes.'},
  {ch:50, n:'Princess of Tribute', t:'The title bestowed on Jade by King Chadstone, from a scroll sent by Greyson, in honour of her noble identity and contributions.'},
  {ch:51, n:'Sally\'s Title', t:'Sally receives a noble title as compensation for her past companionship with Roc. She remains with the wider party.'},
  {ch:52, n:'Ripley\'s Past', t:'The daughter of an officer who committed treason. Her family fell from grace and she was destined for a harsh fate, but Prince Devon secretly arranged for her to be spared and placed in palace service. Her loyalty is to Devon.'},
  {ch:52, n:'Sally\'s Court Gossip', t:'Sally, now a noblewoman, has many sources and shares what she hears about the royal court.'},
  {ch:53, n:'The Mural of the Two Sisters', t:'In a hidden chamber under the Hall of Records: Dima, Sister of Light, and Xima, Sister of Darkness, reaching toward the Black Pearl. \"The Gold Child\'s Trial of Love is bound to the Black Pearl. When the pearl returns to its true owner, the two sisters shall rise again. Through love, the worlds may be united or destroyed.\"'},
  {ch:54, n:'The Late Empress', t:'Her records were sealed after her death and many pages deliberately removed. She studied the Gold Child prophecy and the Black Pearl. The Black Pearl is tied to the Gold Child and the Trial of Love as well as Dragonvale.'},
  {ch:55, n:'Levi\'s Letter', t:'Levi left Dragonvale because he had been poisoned: a slow-acting poison designed to weaken, not kill. It happened inside the palace. He asked Jade not to follow him but to find the truth.'},
  {ch:56, n:'The Missing Vials', t:'Several vials of a restricted rare material went missing from the Royal Healing Pavilion weeks ago. Someone used a royal-level seal to enter after hours.'},
  {ch:57, n:'The Royal Wedding', t:'Jade of Tribute and Prince Devon Chadstone were wed in the grand hall of Dragonvale, blessed by King Chadstone. Roc Chadwick watched in silence. \"We did not begin with love. But we began with truth.\"'},
  {ch:58, n:'Princess of Dragonvale', t:'Jade now holds the title of Princess of Dragonvale. Her Imperial Guard uniform is retired: Daily Royal Attire for court, the Phoenix Guard attire for missions and battle. Some nobles doubt her; Devon defends her openly.'},
  {ch:59, n:'The Bond Severed', t:'Dima, Ancient Spirit, told Jade to let go: \"Your destiny lies with the owner of the Pearl... the saviour of Tribute.\" Jade severed her bond with Roc Chadwick and pledged her heart to Devon Chadstone. Devon admits he first meant to claim her as a political prize, then chose her for herself.'},
  {ch:60, n:'Poison in Jade\'s Blood', t:'In the Cavern of Fireflies Devon found a slow-acting poison in Jade\'s body, building for some time and hidden on purpose. Its source is unknown. Devon helps her body resist it while they search for the truth.'},
  {ch:61, n:'Jenika\'s Curse', t:'Jenika Moon, cousin of the royal princes and healer of Dragonvale, believes love will only bring pain to those she cares about. She refused Sky for his own sake. As a child she overheard whispers of a secret concerning Devon and Roc that \"must never be known\". Dragonvale princes are raised away from their birth mothers.'},
  {ch:62, n:'The Erased Name', t:'The missing Healing Pavilion material makes a slow poison with few traces. Only someone with royal-level access could take it. Sally saw a man escorted in after dark. An old authorization record in the archives has its name scratched out, but the royal seal is real.'},
  {ch:63, n:'House Arrest', t:'King Chadstone placed Prince Roc under house arrest after he provoked Devon in open court. The same page shows Roc weakened by dark-magic backlash and the effects of the severed bond.'},
  {ch:64, n:'The Altan Proposal', t:'The Kingdom of Altan proposed a marriage alliance with Dragonvale and named Prince Roc as the candidate. The king hoped marriage would steady him. A second letter announced that the princess would first see Dragonvale for herself.'},
  {ch:65, n:'The Trader Princess', t:'Princess Altan came to Dragonvale disguised as a travelling trader to judge Prince Roc. He and Delilah mocked her stall; Jade and Devon defended her. First impressions often reveal a person\'s true character.'},
  {ch:66, n:'Princess Seraphina Altan', t:'Revealed before the court: the trader was the princess of Altan. A true alliance, she said, should be built on understanding, not on empty titles.'},
  {ch:68, n:'The Loveless Marriage', t:'Seraphina Altan and Roc Chadstone married before the court. In private they agreed the marriage would stay political and nothing more.'},
  {ch:69, n:'The Ravine Cave', t:'Roc\'s dark arts trace back to the ravine cave where Jade\'s cage once fell: ancient markings and a forbidden power. He accepted it. It is now consuming him.'},
  {ch:71, n:'The Access Log', t:'The Restricted Archive Access Log shows Prince Roc Chadstone entering restricted storage on the 3rd, 5th, 8th and 11th Moon. The materials match those used to poison Levi, and the information was kept from the royal council.'},
  {ch:73, n:'The Exile of Roc', t:'King Chadstone stripped Roc of his princely status and exiled him. Delilah went with him. Their daughter Liora was entrusted to Jade and Devon.'},
  {ch:75, n:'Whispers at the Border', t:'Caravans vanish and villages go dark along the Dragonvale mountain road. The ancient border ruins have been reactivated: their seals are weakening and dark spiritual energy rises from deeper beneath Dragonvale. Someone is trying to break what was once sealed there.'},
  {ch:74, n:'The King\'s Trust', t:'Greyson told Jade the poison, the forbidden materials and the unrest in the palace may be threads of the same knot, and asked her to watch the borders, the ruins and the court.'},
  {ch:76, n:'The Awakened Ruins', t:'Ancient Dragonvale runes at the border ruins glow again. They should have stayed sealed: something has deliberately awakened the site, and the surface is only the beginning.'},
  {ch:77, n:'The Seal Core of Dragonvale', t:'Beneath the ruins lies the ancient seal core of Dragonvale, forced awake by a hidden hand. Jade and Devon stabilised it. Someone is testing Dragonvale\'s ancient foundations.'},
  {ch:78, n:'The Gold Child Tablet', t:'In a sealed chamber of the Moonveil Temple: "When the Gold Child awakens, the pearl shall return." The temple\'s crests match the symbols of the old Dragonvale royalty, and the same symbol appears in Tribute\'s oldest records.'},
  {ch:79, n:'The Three Black Pearl Records', t:'Record 1: The Pearl chooses. Record 2: The Gold Child carries the balance. Record 3: The guardian walks beside the chosen, but the guardian is not named. The tablet then reveals one name: Dima.'},
  {ch:80, n:'Dima, Guardian of the Balance', t:'Dima was once a guardian and protector tied to the Black Pearl and to a child of light: a guide, and a bridge between light and darkness. Pages about her were deliberately removed. In the Pearl Chamber: "The child of gold shall return when darkness rises."'},
  {ch:82, n:'Crown Prince Aster', t:'Devon recommended his younger brother Prince Aster Chadstone for the crown. Aster is calm, learned and skilled in martial arts, and stayed away from politics. King Chadstone named him Crown Prince of Dragonvale.'},
  {ch:83, n:'Liora', t:'Liora is growing quickly. Jenika says Dragonvale\'s energy flows differently, and her potential is remarkable. She learns herbs from Jenika and embroidery from the palace seamstresses.'},
  {ch:85, n:'The Eastern Barrier', t:'The border disturbances, the awakened creatures and the weakened barriers of Dragonvale are connected. After the last seal was restored, a message appeared: "The path continues beyond this kingdom."'},
  {ch:84, n:'Liora at Three', t:'Liora grew quickly in Dragonvale\'s energy. At three she is bright and curious: Jenika teaches her herbs and tonics, the seamstresses embroidery, Jade discipline and Devon patience. She smiles like Delilah and has Roc\'s stubbornness. "I want to help many people."'},
  {ch:86, n:'Farewell to Dragonvale', t:'King Chadstone honoured Jade and Devon: "You came here as an outsider. You leave as someone Dragonvale will never forget." Liora stays with Jenika. They left not as strangers, but as names the kingdom would remember.'},
  {ch:87, n:'Ripley, Attendant Again', t:'With Levi back, Ripley returns to her duties as Jade\'s attendant. The travelling party is Jade, Devon, Seraphina, Levi and Sky.'},
  {ch:87, n:'Levi Returns', t:'A spirit healer found Levi between life and death. He survived and recovered, and met the party on the road out of Dragonvale. Seraphina Altan, free of her marriage, asked to travel with them for good.'},
  {ch:88, n:'The Ghost Healer', t:'A veiled healer the villagers call the Ghost Healer: they appear suddenly, heal the impossible and are gone before dawn. They saved Levi, whose body was tainted by corrupted magic. They will not stay in any city and will not give their name. They saw something very old and forgotten in Sky\'s healing.'},
  {ch:89, n:'A Week of Rest', t:'King Greyson granted the party one week of rest in Tribute: "Even heroes need a home."'},
  {ch:90, n:'The Gold Family', t:'Unique Gold, Imperial Advisor, is Jade\'s father. Elara Valor, of a psychic lineage, is her mother. Adrian Gold, a government official, is her older brother. Jade does not remember them, but Adrian returned the flower charm she once said protected her.'},
  {ch:92, n:'Yvette Sue Valen', t:'Elara\'s half-sister: a healer with no visions, who left one day and never returned. Even Elara\'s visions could not find her.'},
  {ch:93, n:'The Boy Who Looks Like Sue', t:'Sky\'s healing light is soft and warm, and Elara saw her sister Yvette Sue in him. Sky does not know who taught him healing.'},
  {ch:94, n:'Sky\'s Jade Pendant', t:'A light green jade pendant Sky once showed Jade is gone. He does not remember when or how he lost it. Devon: whether or not he is blood, Sky is family now.'},
  {ch:TRIAL_CH, n:'The Exile Border', t:'Along the Dragonvale border lies the Abyssal Frontier, where monsters gather and villagers vanish. If you choose to look, the source is someone you used to know.', party:'devon'},
  {ch:95, n:'Jade, Guardian of Tribute', t:'Greyson told his court that Jade Gold was not chosen because of blood alone: she proved herself by protecting Tribute when others hesitated. She can belong to more than one home.'},
  {ch:96, n:'Luck', t:'When Jade nearly drowned as a child, many memories were lost and a lasting blessing remained, which the family called Luck. She now carries both herself and Luck\'s power, permanently. Adrian remembers enough for both of them.'},
  {ch:97, n:'The Gold and Valor Legacies', t:'The house of Gold guides the crown: judgement, strategy and loyalty. The Valor bloodline listens to what others cannot hear. Jade was born between two legacies: wisdom from one side, sight from the other. In Tribute she may serve as guardian, envoy and witness to the truth.'},
  {ch:98, n:'Yvette\'s Missing Years', t:'The royal registry shows Yvette Sue Valen, a healer, in Imperial Service in Year 812 and departing for the West Border in 814. The next entry is missing, and the Valen lineage file is empty with its seal broken and resealed.'},
  {ch:99, n:'Princess of Tribute', t:'Greyson acknowledged Jade Gold before his court as his sworn sister, Princess of Tribute and guardian of the crown: "Family does not kneel alone."'},
  {ch:100, n:'The Sources of Jade\'s Visions', t:'Not every vision comes from the same source. The visions of Roc came from the cave\'s dark magic, a bond that connected her to him, which Dima severed. Her other visions come from her own psychic lineage. Xima\'s visions were warnings of a larger evil that still exists.'},
  {ch:101, n:'Beyond the Island', t:'An allied territory beyond Tribute\'s shores has sent word: envoys missing, old records resurfaced, and people disappearing near forgotten ruins. The hidden records may concern an old alliance someone wanted erased.'},
  {ch:102, n:'The Sealed Order', t:'Greyson\'s sealed order must be carried and delivered by Jade herself. The mission begins beyond Tribute\'s borders.'},
  {ch:103, n:'Dima\'s Restoration and the Tribute Prophecy', t:'Jade told Devon that Dima has regained her power and that the Tribute prophecy speaks of a great change that will affect them all. Devon: "Fate does not frighten me."'},
  {ch:103, n:'Jade Dragon Harmony', t:'Their bond awakened a harmony of dragon and phoenix, born from love, healing and an unwavering choice: synchronized spiritual power, stronger combat coordination, and a shared protective resonance that shields both minds and hearts.'},
  {ch:104, n:'The Valen Borderlands', t:'Once a frontier of healers, envoys and old alliances, the Valen Borderlands are now called the Forgotten Western Territory. Roads broke, outposts emptied, and its history began to vanish. Yvette Sue Valen\'s crest is carved here.'},
  {ch:105, n:'Captain Rowan Mirel', t:'Border Warden of the Valen Borderlands. He reads Greyson\'s sealed order: "Tribute finally remembers the west." He believes someone is still maintaining the empty records hall.'},
  {ch:105, n:'Mira Valen and Master Teren', t:'Mira is of a distant branch of the Valen family: "the name still remains, even if the world has forgotten us." Master Teren is the retired archive keeper who says sections were taken by hand: names, routes, alliances.'},
  {ch:106, n:'The Abandoned West', t:'The roads broke, the envoys stopped returning, the healers thinned, but the people remained. The west was not empty. It had been abandoned. Lio, a border runner, says Tribute remembers the west only when it needs something.'},
  {ch:107, n:'The Valen Healing Tradition', t:'Founded by Yvette Sue Valen: healing should never be used as a weapon. It treats the body, calms the spirit and restores the inner balance, working with spiritual energy rather than against it. Its crest joins the healing flower and the dragon spine: life and balance.'},
  {ch:108, n:'Rewritten Records', t:'Behind the abandoned registry hall is an unlisted second archive. Travel permits, healer registries, border reports and lineage records were removed, or corrected until they became lies.'},
  {ch:109, n:'Magistrate Corvin Hale', t:'The Provincial Magistrate of the Valen Borderlands: connected to several noble families, he blocks access to the restricted archives by royal decree. Mira says many of the missing records were sealed under his watch.'},
  {ch:110, n:'The Forbidden Page', t:'Hale inherited his post after the previous magistrate disappeared, and three more officials have vanished since. The cover-up extends to other kingdoms. He gave Jade one page, a western lineage registry, that was never supposed to exist.'},
  {ch:111, n:'The Valens', t:'More than a line of healers: royal medical advisors, historians and guardians of knowledge that linked kingdoms. A portrait shows Yvette Sue Valen with a crowned member of Tribute\'s royal family.'},
  {ch:112, n:'The Tribute-Valen Pact', t:'Twenty years ago Tribute and the Valen family signed a mutual protection pact: Tribute secured the western borders, the Valens provided healers, medical knowledge and records. Later records claiming betrayal are in a different hand.'},
  {ch:113, n:'The Price of Silence', t:'When the alliance ended, Tribute soldiers were ordered to burn the villagers\' stores of medicine, and healers were taken for questioning and never returned. The west remembers.'},
  {ch:114, n:'The Third Faction', t:'A faction that moved through the borderlands trading information, powers and people, dividing Tribute and Valen with illusions, disease and spiritual manipulation. Its sun-and-eye symbol is tied to Xima\'s remaining influence. Some followers may be closer to Tribute than expected.'},
  {ch:115, n:'The Valen Secret', t:'The Valens protected a scholar, healer and seer who carried knowledge of Dima, the Gold Child prophecy and ancient restoration. The Gold Child is not a ruler: a child who can bridge kingdoms and heal the rift between worlds. The prophecy belongs to the whole world.'},
  {ch:116, n:'The Attack on the Western Archive', t:'A coordinated raid tried to burn the archive. Jade and Devon fought as one (Jade Dragon Harmony). The attackers left the sun-and-eye symbol carved into the wall.'},
  {ch:117, n:'Yvette Sue Valen\'s Sacrifice', t:'Yvette left willingly. She discovered a third party using Tribute and Valen against each other, and erased her own name so the knowledge and her people could survive. She left letters, hidden records and her hair ornament for her family.'},
  {ch:117, n:'Sky\'s Pendant', t:'Sky holds the pendant his mother gave him, which carries part of Yvette\'s knowledge. It is a second pendant: his own jade pendant (chapter 94) is the one that was lost. "She still protected me, even in her absence."'},
  {ch:118, n:'The Western Territory Restored', t:'Mira is Valen\'s new representative and leads the reopening of the archives and the healer routes. Lio is a messenger between regions. Corvin Hale supports the restoration publicly. The corrupt officials were exposed, and the alliance between Tribute and Valen was rebuilt on truth, respect and shared purpose.'},
  {ch:119, n:'The One Beside the Gold Child', t:'Yvette\'s final letter: "The one beside the Gold Child will not be chosen by fate, but by choice." She disappeared to protect others and keep the prophecy from the wrong hands. Sky calls her "Mother".'},
  {ch:120, n:'The Princess Who Listened', t:'The people of the west no longer see Jade as a distant royal. The archives are open, the healer routes run again, and a new message has come from beyond the western borders, with a symbol like the Valen ones.'},
  {ch:121, n:'The Altered History', t:'The original Valen records prove key people and alliances were deliberately erased. Greyson: a coordinated effort reaching beyond Valen, with forces at work even within Tribute.'},
  {ch:122, n:'The First Omen', t:'Demons are fleeing the west, wounded and terrified, away from forgotten shrines, ancient battlefields and the old seal sites of the fifteen evils, whose seals are weakening. Something older than the demons has begun to wake.'},
  {ch:123, n:'Cael Ardyn, the Last Seal Keeper', t:'A golden-haired guardian, strikingly like Dima (Dima first appears to Jade in a dream), of a vanished order, met on an ancient battlefield older than Xima\'s war. He says the Fifteen Evils are only symptoms, and names the teal-green pendant Jade wears as the Gold lineage\'s.'},
  {ch:123, n:'The Forgotten Battlefield', t:'No bodies, no weapons: only statues of warriors, mages and creatures standing together against a greater enemy. The carved symbol is not Xima\'s. These ruins are warnings.'},
  {ch:124, n:'The Seal System', t:'The seals predate the wars of this age. The Seal Keepers maintained them until kingdoms used them for power and the Keepers fell first. A broken seal is a prison remembering it has a prisoner: this one was made to keep in something even the ancient world feared.'},
  {ch:125, n:'The Forgotten Light', t:'Old healing, old guardianship: the light in the sanctuary follows the same path as the battlefield. Dima knew of the barriers; Xima only worsened an older wound. Kingdoms bury what they fear.'},
  {ch:126, n:'Seris Valen, Saint of Forgotten Light', t:'Keeper of a forgotten sanctuary. She recognises Sky\'s healing as a path the world believed extinct: a light that healed not only bodies but the wounds of the world. Perhaps the past is returning through those who survived it.'},
  {ch:127, n:'Forgotten Light', t:'A knowledge older than borders and courts: healing, preservation and balance. Its records describe an art that mends the wounds between lands, peoples and ages. Sky\'s power answers it the same way; Seris recognises the lineage, not the bearer.'},
  {ch:128, n:'The Sanctuary\'s Guiding Map', t:'Forgotten Light preserved routes, records and memories for times of crisis. A star-map in the floor points to a forgotten region beyond the old seals, where the next broken seal and another truth wait. Someone prepared the path for those who would come after.'},
  {ch:129, n:'Eira Solenne', t:'A scholar of the hidden sanctuary who inherited a small part of a forgotten age\'s knowledge. She says the Forgotten Light made the seals to keep the balance between life, death, memory and the world, and that someone changed it deliberately.'},
  {ch:130, n:'The Forgotten Path', t:'A trail that once connected the old worlds, sealed from sight and fragmented on purpose. It reveals itself by resonance and memory, not distance, and each fragment acts like a key that opens the next part only when used in harmony.'},
  {ch:131, n:'The Celestial Ruins', t:'A forgotten world preserved in time: mountains floating above valleys, rivers between heaven and earth, murals of humans, beasts, mages and spiritual beings living together. The broken-seal symbol is carved on every gate, tower and bridge.'},
  {ch:132, n:'The City That Forgot', t:'An intact, empty city. A weakening seal can erase people, places and events from memory: the land remains, but is removed from the world\'s memory, as with Yvette. The one breaking the seals is trying to bring something back.'},
  {ch:133, n:'The Seal Left Alive', t:'A seal beneath the silent city was deliberately weakened, not destroyed. Its message: "The world forgot the truth once. I will make it remember."'},
  {ch:134, n:'One Hand, Many Seals', t:'Incident records: Dima 1023, Eastern Ruins 986, Stormreach 954, Valmere 1001, Celes Kingdom 978. The same symbol, method and handwriting across generations: one long-term plan. Dima\'s restoration may be part of it.'},
  {ch:135, n:'Varyn Noctis, the Seal Breaker', t:'He says he is not weakening the seals but opening what was imprisoned, and that the royal families only protected the lies they inherited. He wants to release the truth.'},
  {ch:136, n:'The World Before the Seals', t:'Varyn\'s memory fragment: humans, mages, beasts and others stood together in the same lands. The seal energy is ancient, not demonic, and matches the original Seal Keepers\' notations although the seal is in no known record.'},
  {ch:137, n:'What the Seals Were Made For', t:'Ancient texts distinguish containment, preservation and separation. Not every seal was a prison. A simpler story was easier to control, so the truth was buried. Varyn follows instructions left by someone before him, which lead back to the Dima-era records.'},
  {ch:138, n:'The Forgotten World Behind the Seal', t:'Jade and Devon fought Varyn in Jade Dragon Harmony; Sky stabilised the life-energy and Eira opened a narrow passage. Beyond the seal lay a civilization that had simply vanished from history: not a prison, not a cage.'},
  {ch:139, n:'The People Behind the Barrier', t:'Behind the seal lay a civilization, not monsters: homes, schools and temples, cut off and forgotten. The original Seal Keeper texts mention a review period that never happened. Varyn\'s ancestors came from here.'},
  {ch:140, n:'The Keeper\'s Oath', t:'Original oath: guard the seals until balance returns, then reopen what can be reopened. Altered oath: guard the seals forever; let none be reopened or questioned. It was changed in the final years of the Dima/Xima conflict.'},
  {ch:141, n:'The First Keeper Council', t:'The original oath was a joint accord of royal houses, spiritual orders and the first Keeper council (mages, healers, royal representatives and guardians). Dima and Xima stood beside it. Ardyn was one of the first Keepers.'},
  {ch:142, n:'Before the War', t:'Dima specialised in restoration and balance; Xima in dangerous forces, corruption and containment. They worked together until they disagreed whether damaged regions should be healed and reunited or permanently isolated. (Author note: inside the broken seals Jade\'s hair may look red; her natural hair is black.)'},
  {ch:143, n:'Bearer of the Returning Light', t:'A Dima-era chamber recognised Sky\'s bloodline and healing signature. The title Bearer of the Returning Light was given to those who carried restoration beyond borders, outside the Keeper authority.'},
  {ch:144, n:'The Ardyn Inheritance', t:'An Ardyn ancestor helped rewrite the Keeper oath from mediation to permanent separation. Cael accepts his family\'s part. A sealed confession was found in the restricted archives.'},
  {ch:145, n:'The Unnamed Adviser', t:'An adviser, marked with a compass star, appeared in every negotiation with false proof that reuniting the regions would bring an ancient force back. Their identity was erased; a mural shows the figure scratched out between Dima and Xima.'},
  {ch:146, n:'The Truth Before the Curse', t:'Dima wanted balance and Xima control; their conflict was real, but a third party manipulated it. The curse is a barrier and a prison; the ancient threat retreated and waits. The Gold bloodline was meant to choose what comes after.'},
  {ch:147, n:'The Fifteen Evils of Tribute', t:'Fifteen major entities identified across the continent, in records copied for centuries by people who feared them: the Thorned Widow, Mourning Hart, Hollow King, Black Tide, Silent Flame, Weeping Stone, Sky Eater, Bone River, Sunless Child, Drowned Crown, Ashen Serpent, Mirror Queen and Endless Winter, plus two still unknown. Jade leads the investigation: find them, understand them, then decide.'},
  {ch:148, n:'Sally\'s Northern Letters', t:'From Dragonvale, Sally reports villages near the northern forest attacked overnight, people vanishing, creatures seen at night and a forest gone silent. The locals fear the First Evil\'s name.'},
  {ch:149, n:'Rin Kaede, Spirit Ranger', t:'A Spirit Ranger and monster tracker already hunting the First Evil in the Black Forest. She reads spiritual trails: corruption leaves one trail, spirits another, and this Evil leaves both.'},
  {ch:150, n:'The Forest of Thorns', t:'Territory of the First Evil, where corruption spreads through root, beast and air. Rin follows spirit trails, Levi the physical path, Sky watches corruption surges, and Devon keeps the party together.'},
  {ch:151, n:'The Thorned Widow', t:'The first of the Fifteen Evils: a twisted remnant of a once-benign forest spirit, draped in thorns, grief and corruption, who fights with the forest itself and keeps regenerating.'},
  {ch:152, n:'What Remained', t:'The first Evil was a guardian spirit of the forest, a protector that nurtured life and kept balance, twisted by corruption into a weapon of pain. It had to be stopped but was not originally evil. Register: 1/15 Resolved.'},
  {ch:153, n:'The Spectral Stag', t:'A monstrous stag attacks anyone entering a misty valley. The villagers want it killed, but Rin and Levi find a territory, and Sky feels ancient sorrow rather than simple corruption.'},
  {ch:154, n:'The Mourning Hart', t:'The second Evil: a guardian the village now calls a monster. Its energy is protection, not corruption; it attacks those who cross a boundary around the shrine it guards.'},
  {ch:155, n:'The Burial Ground Beneath the Valley', t:'A burial ground and sealed spiritual sanctuary beneath waterfalls, meant to rest the dead and guide restless spirits beyond. Looters and corrupt officials\' soldiers desecrated it repeatedly. The hart\'s anger was toward all who disturb the rest of the dead.'},
  {ch:156, n:'The Valley Under the Crown', t:'By royal decree the northern valley and its surrounding forests are protected land under Tribute. No hunting, logging or settlements are permitted, and the spirits who dwell there are to be respected and left undisturbed. The Mourning Hart remains as its guardian.'},
  {ch:157, n:'Auren, Sel Veyr, House Merinth', t:'Names murmured by a crowned figure among abandoned settlements, names no living person recognises. He speaks as if he remembers the city alive.'},
  {ch:158, n:'Solmir and the Golds', t:'The Hollow King calls Jade the last heir of Solmir, of the blood of the first sunrise, and remembers earlier Golds who stood before her: Velran and Elaris. The Fifteen Evils have been bound to the Gold line, and the hunt has never ended.'},
  {ch:159, n:'The Fifteen: Designated, Not Born', t:'According to the Hollow King there were never fifteen Evils: there were fifteen entities designated dangerous during the ancient crisis. Some were corrupted, some resisted the rulers, some guarded forbidden places, and some were impossible to control. His account is not yet proven.'},
  {ch:160, n:'The Sealed Kingdom', t:'The Hollow King was king of a land of rivers and mountains that the seals cut away from the world. It was removed from the maps, its people were buried and their names died with them. His pain is real; so are the lives he has taken since.'},
  {ch:161, n:'The Third Evil, Contained', t:'The Hollow King was sealed in golden chains rather than destroyed. His power is restrained and his story kept as a warning for the future. Register: 3 / 15 Resolved.'},
  {ch:162, n:'Three Evils, Three Truths', t:'Evil I was a corrupted guardian, destroyed. Evil II was a misidentified protector. Evil III was a historical victim who became dangerous, and was contained. The same name concealed three different realities.'},
  {ch:163, n:'The Register, Rewritten', t:'The official list of the Fifteen has been copied for centuries by known copyists, but its original author is unknown. Its terminology appears only after the Keeper oath was altered: the Register may record how truth was later rewritten.'},
  {ch:164, n:'The Missing Fourth Entry', t:'The official Register jumps from III to V. Keeper-era documents contain Entry IV; later copies do not. The page was cleanly and deliberately removed from every copy that followed, while the other entries were left intact.'},
  {ch:165, n:'The Nameless Witness', t:'A hooded figure at an abandoned archive-shrine who saw the Fifteen before the world gave them that name. They call Jade the Gold Child, say they are someone her ancestors were told to forget, and promise their paths will cross again.'},
  {ch:166, n:'The New Mandate', t:'King Greyson changes the campaign\'s mandate: Tribute seeks truth before judgment. The Fifteen Evils are no longer to be hunted blindly or reduced to simple monsters again; they are to be resolved. Adrian revises the mission register to read "Resolve the Fifteen Evils." Register: 3 resolved, 12 remaining.'},
  {ch:999, n:'Faepool Territory', t:'A border region of forests and traditional villages. Something interferes with Jade\'s clairvoyance here.'},
  {ch:999, n:'The Hidden Message', t:'An unexpected message suggests the curse, Jade\'s visions and the people around her may be connected.'},
  {ch:999, n:'Ancient Records', t:'Records recovered from the Faepool ruins. The disturbances are not random: they belong to one pattern.'},
  {ch:999, n:'Xima (draft)', t:'The source of the curse, and the ancient witch whose magic shaped Tribute\'s history. The curse may have multiple layers.'},
  {ch:999, n:'Ancient Magic', t:'Old magic leaves traces in stone and blood. Jade\'s visions respond to it.'},
  {ch:999, n:'Tribute History', t:'How the island came to be bound by the curse. Many pages are still missing.'},
  {ch:999, n:'Dima\'s Legacy', t:'Jade\'s golden blood connects her to Dima. The records speak of a sanctuary, location unknown.'},
  {ch:999, n:'The Black Pearl', t:'Devon\'s inheritance. Dragon Empowerment, Ancient Dragon Knowledge and Dragon Manifestation.', party:'devon'},
];
