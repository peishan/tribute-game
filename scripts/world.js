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
      {id:'sally_reports', kind:'investigate', n:'Examine Sally\'s Maritime Reports', icon:'📨', ch:167, need:3, ambush:[], lo:53,
       desc:'Reports from the sea.',
       clues:['Sally\'s network in Dragonvale sent several reports from coastal villages and fishing towns.', 'Fishermen report that ships vanish without a trace along an abandoned maritime route.', 'After sunset the sea turns black: unnatural waters, unlike anything they have seen.'], rw:{xp:38000, gold:7200}},
      {id:'register_blacktide', kind:'investigate', n:'Consult the Register about the Black Tide', icon:'📕', ch:167, need:3, ambush:[], lo:53, needFlag:'inv_sally_reports', lockMsg:'🔒 Finish the previous clue first',
       desc:'The Register matches.',
       clues:['Adrian: "One name matches the Register. The Black Tide."', 'Unnatural black water, missing ships and a submerged palace: the descriptions align.', 'The Register: a name lost to history; waters that swallow ships; a palace beneath the waves; an erased maritime boundary. Status: Unresolved. Caution: Extreme danger.'], rw:{xp:38500, gold:7300}},
      {id:'blacktide_threat', kind:'investigate', n:'Identify the Black Tide as a Potential Threat', icon:'⚠️', ch:167, need:3, ambush:[], lo:53, needFlag:'inv_register_blacktide', lockMsg:'🔒 Finish the previous clue first',
       desc:'A threat that remains.',
       clues:['Sky: "The sea itself feels wrong. There is a strong sense of stagnant malice... as if the waters themselves remember something."', 'Seraphina: "Such structures are not built by ordinary kingdoms. This must be something far older than Dragonvale\'s current rule."', 'Jade: "People are disappearing. That is reason enough. We investigate."'], rw:{xp:39000, gold:7400}},
      {id:'maritime_records', kind:'investigate', n:'Investigate Dragonvale\'s Missing Maritime Records', icon:'🗺️', ch:167, need:3, ambush:[], lo:53, needFlag:'inv_blacktide_threat', lockMsg:'🔒 Finish the previous clue first',
       desc:'A boundary that never existed.',
       clues:['Devon: "These coordinates belong to an ancient Dragonvale maritime boundary... one that officially never existed."', 'It was erased from all modern records. Even the imperial charts do not acknowledge this route.', 'Levi: "Then this route was erased for a reason. Someone wanted it forgotten."'], rw:{xp:39500, gold:7500}},
      {id:'garden_walk', kind:'investigate', n:'Spend Time with Adrian in the Palace Gardens', icon:'🌸', ch:168, need:3, ambush:[], lo:53,
       desc:'A rare quiet walk.',
       clues:['Devon takes his leave so the siblings can talk alone.', 'Adrian: "Shall we take a walk beneath the blossoms? It has been a while since we had time to talk properly."', 'Jade: "It feels just like when we were children. We would sneak into these gardens to escape our studies."'], rw:{xp:40000, gold:7600}},
      {id:'adrian_childhood', kind:'investigate', n:'Learn about Adrian\'s Childhood and Defensive Abilities', icon:'🥋', ch:168, need:3, ambush:[], lo:53, needFlag:'inv_garden_walk', lockMsg:'🔒 Finish the previous clue first',
       desc:'How Adrian survives.',
       clues:['Adrian: "I was never built for the battlefield the way you were. So I learned balance, breath, and how to survive without meeting force with force."', '"I focus on balance, controlled breathing, evasive steps, and redirecting force."', '"I carry smoke bombs, gas bombs, and small grenades or pellets when necessary. I rely on intelligence, negotiation, and tactical tools rather than direct combat."'], rw:{xp:40500, gold:7700}},
      {id:'eve_gray', kind:'investigate', n:'Discover His Relationship with Eve Gray', icon:'💌', ch:168, need:3, ambush:[], lo:53, needFlag:'inv_adrian_childhood', lockMsg:'🔒 Finish the previous clue first',
       desc:'A name Jade has never heard.',
       clues:['Adrian: "I met Eve on an assignment. She had been travelling disguised as a young man."', 'At an inn some men realised the truth and began to bully her. He stepped in with words, not weapons, and convinced the innkeeper to protect her instead.', 'They travelled together for a time and he grew to care for her deeply. One day Eve disappeared without explanation.'], rw:{xp:41000, gold:7800}},
      {id:'eve_letters', kind:'investigate', n:'Learn How Their Correspondence Began', icon:'🕊️', ch:168, need:3, ambush:[], lo:53, needFlag:'inv_eve_gray', lockMsg:'🔒 Finish the previous clue first',
       desc:'Letters by pigeon.',
       clues:['Some time later a specially trained pigeon brought him a letter from her.', 'Their correspondence has continued ever since: with each letter she shares a little of her life, and sometimes sends small tokens.', 'Jade: "Her disappearance is still a mystery. There may be more to this than we know."'], rw:{xp:41500, gold:7900}},
      {id:'pearl_examine', kind:'investigate', n:'Examine Devon\'s Black Dragon Pearl', icon:'🔮', ch:169, need:3, ambush:[], lo:54,
       desc:'The pearl reacts.',
       clues:['As the party studies Dragonvale\'s old maritime charts, Devon notices a strange reaction from the Black Dragon Pearl.', 'Jade: "It\'s responding to the maps?"', 'Devon: "Only to certain locations. The closer it gets, the stronger the resonance."'], rw:{xp:42000, gold:8000}},
      {id:'pearl_charts', kind:'investigate', n:'Investigate Its Reaction to Ancient Sea Charts', icon:'🧭', ch:169, need:3, ambush:[], lo:54, needFlag:'inv_pearl_examine', lockMsg:'🔒 Finish the previous clue first',
       desc:'Older than the royal line.',
       clues:['The pearl\'s light tightens into rings over certain points on the old chart.', 'Adrian: "If this is the same energy, then the pearl may be much older than Dragonvale\'s royal line."', '"It may not belong to Dragonvale at all... but to a civilization that came before it."'], rw:{xp:42500, gold:8100}},
      {id:'pearl_sky', kind:'investigate', n:'Compare Its Energy with Sky\'s Restoration', icon:'💠', ch:169, need:3, ambush:[], lo:54, needFlag:'inv_pearl_charts', lockMsg:'🔒 Finish the previous clue first',
       desc:'The force that saved Sky.',
       clues:['They remember the day Yvette\'s jade pendant and Devon\'s pearl worked together to restore Sky\'s damaged life force.', 'Sky: "This energy... I know it. It feels like the same restorative force that saved my life."', 'The pearl and the pendant answer to the same kind of power.'], rw:{xp:43000, gold:8200}},
      {id:'pearl_resonance', kind:'investigate', n:'Identify the Strongest Resonance Location', icon:'📍', ch:169, need:3, ambush:[], lo:54, needFlag:'inv_pearl_sky', lockMsg:'🔒 Finish the previous clue first',
       desc:'Where the pearl rings loudest.',
       clues:['Devon: "The strongest resonance is here... the region linked to the Black Tide."', 'Jade: "Then the missing ships and the pearl are connected."', 'Devon: "Then this route is more than a shipping lane."'], rw:{xp:43500, gold:8300}},
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
      {id:'streets', kind:'tavern', n:'City Streets & Tavern', icon:'🍶', ch:3, desc:'Meals and rumours.'},
      {id:'three_accounts', kind:'investigate', n:'Compare the Records of Three Kingdoms', icon:'🗂️', ch:185, need:3, ambush:[], lo:67,
       desc:'One name, three kingdoms.',
       clues:['While comparing records recovered from the Sunken Kingdom against archives from Tribute and Dragonvale, Adrian finds a name appearing in three separate historical accounts.', 'The dates are identical: Year 712, 3rd Month, 14th Day. The locations are not.', 'According to the records, the same entity was active in three different kingdoms at precisely the same time.'], rw:{xp:80000, gold:15600}},
      {id:'no_copy_error', kind:'investigate', n:'Check for a Copying Error', icon:'🔍', ch:185, need:3, ambush:[], lo:67, needFlag:'inv_three_accounts', lockMsg:'🔒 Finish the previous clue first',
       desc:'No error found.',
       clues:['Adrian checks the translations. Then the original documents. Then the dates again.', 'There is no obvious copying error.'], rw:{xp:80500, gold:15700}},
      {id:'adrian_message', kind:'investigate', n:'Read Adrian\'s Message', icon:'💬', ch:185, need:3, ambush:[], lo:67, needFlag:'inv_no_copy_error', lockMsg:'🔒 Finish the previous clue first',
       desc:'21:14, by moonlight.',
       clues:['Adrian: "Jade, there is a problem with the Register."', '"One of the remaining names has appeared in records from three different kingdoms."', '"At the same time."'], rw:{xp:81000, gold:15800}}
    ]},
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
      {id:'meet_sally_roc', kind:'investigate', n:'Meet Sally and Roc', icon:'🤝', ch:170, need:3, ambush:[], lo:55,
       desc:'Old faces in the court.',
       clues:['Jade returns not as the same visitor who once passed through the court, but as someone who has learned how power buries truth.', 'Sally: "The disappearances are real. Fishermen speak of black water after sunset... and towers beneath the waves."', 'Roc is with Delilah. If he was purified he returns with renewed vitality; otherwise a lingering illness still shadows him.'], rw:{xp:44000, gold:8400}},
      {id:'missing_ships', kind:'investigate', n:'Investigate the Missing Ships', icon:'⛵', ch:170, need:3, ambush:[], lo:55, needFlag:'inv_meet_sally_roc', lockMsg:'🔒 Finish the previous clue first',
       desc:'The old route is feared.',
       clues:['Sally: "Our network has collected reports from coastal villages and fishing towns. Ships vanish along an old route that is no longer used. The sightings have become more frequent lately."', 'Sailors avoid those waters now. "There are currents that make no sense, and places where the sea itself feels wrong."', 'Adrian: "The Register gives one matching name. The Black Tide. These coordinates mark a maritime boundary that Dragonvale officially denies ever existed."'], rw:{xp:44500, gold:8500}},
      {id:'maritime_authorities', kind:'investigate', n:'Consult Dragonvale\'s Maritime Authorities', icon:'📜', ch:170, need:3, ambush:[], lo:55, needFlag:'inv_missing_ships', lockMsg:'🔒 Finish the previous clue first',
       desc:'Dragonvale looks away.',
       clues:['An old minister: "Some worry, Your Highness, that your habit of questioning accepted history may disturb the stability of Dragonvale. There are matters best left in the past."', '"These are merely sailors\' superstitions. There is no proof of any such kingdom."', '"These records are not relevant to the present. We suggest you focus on matters that concern the living."'], rw:{xp:45000, gold:8600}},
      {id:'suppressed_records', kind:'investigate', n:'Discover the Suppression of Sunken Kingdom Records', icon:'🗄️', ch:170, need:3, ambush:[], lo:55, needFlag:'inv_maritime_authorities', lockMsg:'🔒 Finish the previous clue first',
       desc:'Restricted, and missing.',
       clues:['Records about the Sunken Kingdom have been deliberately suppressed for generations. Some are restricted. Others have mysteriously disappeared.', 'Entire sections of maritime records are missing, as if they were removed.', 'Jade: "Then the silence is deliberate. The missing ships and the erased records are connected."'], rw:{xp:45500, gold:8700}},
      {id:'harbor_route', kind:'investigate', n:'Investigate the Forbidden Maritime Route', icon:'⚓', ch:171, need:3, ambush:[], lo:56,
       desc:'A route to a kingdom on no map.',
       clues:['At night the party returns to the harbour, where whispers of a forbidden sea route have begun to surface once more.', 'A sailor: "My grandfather sailed it long ago. It connected Dragonvale to a wealthy kingdom across the Black Water. But the route was abandoned after the sea changed."', '"Few still remember. The name has been lost from official records. But some of us have fragments: old charts, stories... enough to know it was real."'], rw:{xp:46000, gold:8800}},
      {id:'sailors_officials', kind:'investigate', n:'Question Sailors and Harbor Officials', icon:'🧑‍✈️', ch:171, need:3, ambush:[], lo:56, needFlag:'inv_harbor_route', lockMsg:'🔒 Finish the previous clue first',
       desc:'Merchants buying old charts.',
       clues:['Ships vanished along that route with no wreckage. "Aye. Many. They were said to fall into waters that turned black as ink. No trace left behind."', 'Sally: "Several merchants have secretly purchased ancient navigation documents in recent years."', '"They weren\'t ordinary trade maps, but copies of much older charts. Someone is trying to reconstruct this route."'], rw:{xp:46500, gold:8900}},
      {id:'tide_evidence', kind:'investigate', n:'Track Evidence of the Black Tide', icon:'🌊', ch:171, need:3, ambush:[], lo:56, needFlag:'inv_sailors_officials', lockMsg:'🔒 Finish the previous clue first',
       desc:'Residue on the docks.',
       clues:['Levi: "These claw-like marks aren\'t from ordinary rocks or reefs. The wood has been eroded by something in the water... like the Black Tide."', '"There are traces of the same residue here on the docks. It\'s older, and this place has been affected for a long time."', 'Sky: "I can sense a deep spiritual disturbance beneath the waves. Something still lingers there... as if the sea itself remembers what was lost."'], rw:{xp:47000, gold:9000}},
      {id:'ancient_chart', kind:'investigate', n:'Recover an Ancient Sea Chart', icon:'🗺️', ch:171, need:3, ambush:[], lo:56, needFlag:'inv_tide_evidence', lockMsg:'🔒 Finish the previous clue first',
       desc:'A name: Aelyndra.',
       clues:['Among the documents recovered, one surviving chart reveals the original name of the drowned territory: Aelyndra.', 'Much of its history has been erased, but the route is clear: it once connected Dragonvale to a kingdom that no longer exists.', 'Adrian: "Dragonvale\'s historians hid this route, erased it from maps and sealed any mention of that kingdom."'], rw:{xp:47500, gold:9100}},
      {id:'ie_look', kind:'investigate', n:'Investigate the Impossible Register Entry', icon:'🗂️', ch:186, need:3, ambush:[], lo:64,
       desc:'One name, three accounts.',
       clues:['Adrian: one of the remaining names appears in historical accounts from Tribute, Dragonvale and the Sunken Kingdom.', 'The dates are identical. The locations are not.', 'According to the records, the same entity was active in three different kingdoms at precisely the same time.'], rw:{xp:69000, gold:13500}},
      {id:'ie_verify', kind:'investigate', n:'Verify the Evidence from Three Kingdoms', icon:'🔎', ch:186, need:3, ambush:[], lo:64, needFlag:'inv_ie_look', lockMsg:'🔒 Finish the previous clue first',
       desc:'Translations, originals, dates.',
       clues:['Adrian checks the translations. Then the original documents. Then the dates again.', 'There is no obvious copying error.', 'Three accounts, three archives, one name.'], rw:{xp:69500, gold:13600}},
      {id:'ie_nature', kind:'investigate', n:'Identify the Nature of the Entity', icon:'❔', ch:186, need:3, ambush:[], lo:64, needFlag:'inv_ie_verify', lockMsg:'🔒 Finish the previous clue first',
       desc:'Person, event or something else.',
       clues:['Jade: "Three kingdoms... And the same name?"', 'If the same name appears in three kingdoms, what else is hidden in the records?', 'The nature of the entity is unknown.'], rw:{xp:70000, gold:13700}},
      {id:'ie_report', kind:'investigate', n:'Report Findings to Jade', icon:'💬', ch:186, need:3, ambush:[], lo:64, needFlag:'inv_ie_nature', lockMsg:'🔒 Finish the previous clue first',
       desc:'The message at 21:14.',
       clues:['Adrian: "Jade, there is a problem with the Register."', '"One of the remaining names has appeared in records from three different kingdoms. At the same time."', 'The message reaches Jade as she reviews the latest findings from the Sunken Kingdom.'], rw:{xp:70500, gold:13800}},
      {id:'ie_prepare', kind:'investigate', n:'Prepare for Further Investigation', icon:'🧭', ch:186, need:3, ambush:[], lo:64, needFlag:'inv_ie_report', lockMsg:'🔒 Finish the previous clue first',
       desc:'Only the beginning.',
       clues:['The Register\'s impossible entry has been discovered.', 'But this is only the beginning.', 'Jade: the party will need to understand what this name is.'], rw:{xp:71000, gold:13900}},
      {id:'adrian_report', kind:'investigate', n:'Review Adrian\'s Detailed Report', icon:'📜', ch:187, need:3, ambush:[], lo:65,
       desc:'The full report arrives.',
       clues:['After receiving Adrian\'s message, Jade requests a detailed explanation.', 'Later that evening Adrian sends his full report, including translations and original documents.', 'Jade: "Three kingdoms. The same date. Different locations. This is bigger than we expected."'], rw:{xp:71500, gold:14000}},
      {id:'three_records', kind:'investigate', n:'Examine the Three Historical Records', icon:'🗂️', ch:187, need:3, ambush:[], lo:65, needFlag:'inv_adrian_report', lockMsg:'🔒 Finish the previous clue first',
       desc:'Tribute, Dragonvale, the Sunken Kingdom.',
       clues:['The same name appears in all three accounts, on the exact same date, in three different locations.', 'Each record describes the same entity or event, but with different details and from different perspectives.', 'The descriptions do not align, and the locations should be impossible.'], rw:{xp:72000, gold:14100}},
      {id:'translations_originals', kind:'investigate', n:'Compare the Translations and Original Documents', icon:'🔬', ch:187, need:3, ambush:[], lo:65, needFlag:'inv_three_records', lockMsg:'🔒 Finish the previous clue first',
       desc:'No sign of copying.',
       clues:['Adrian verifies the translations himself in multiple languages and checks the original documents whenever possible.', 'Adrian: "There is no evidence of copying. The writing styles, calendar systems, and historical contexts are all consistent with each kingdom\'s records."', 'The dates match. The translations are accurate. The original documents confirm it.'], rw:{xp:72500, gold:14200}},
      {id:'discuss_explanations', kind:'investigate', n:'Discuss Possible Explanations', icon:'💭', ch:187, need:3, ambush:[], lo:65, needFlag:'inv_translations_originals', lockMsg:'🔒 Finish the previous clue first',
       desc:'Not a coincidence.',
       clues:['Adrian searches other historical sources, including private archives and diplomatic records.', 'Adrian: "There is no obvious explanation. But this cannot be a coincidence."', 'If the Register can contain entries that appear in multiple kingdoms at the same time, the remaining names may be more complex than previously assumed.'], rw:{xp:73000, gold:14300}},
      {id:'plan_next', kind:'investigate', n:'Plan the Next Investigation', icon:'🧭', ch:187, need:3, ambush:[], lo:65, needFlag:'inv_discuss_explanations', lockMsg:'🔒 Finish the previous clue first',
       desc:'Linked events, shared identities, altered records.',
       clues:['Jade calls a meeting with the party: "We need to understand what this name really is, and why it appears in three different kingdoms at the same time."', 'The impossible entry suggests that the Fifteen Register may contain linked events, shared identities, or historical figures whose records were deliberately altered.', 'The party prepares to investigate further.'], rw:{xp:73500, gold:14400}},
      {id:'review_records', kind:'investigate', n:'Review the Three Historical Records', icon:'🗂️', ch:188, need:3, ambush:[], lo:65,
       desc:'Three descriptions.',
       clues:['The same name appears in records from Tribute, Dragonvale and the Sunken Kingdom. The descriptions vary, but all three accounts refer to the same entity.', 'Tribute: a visitor who arrived without escorts. Dragonvale: a natural phenomenon witnessed near the northern border. The Sunken Kingdom: a figure associated with a ritual at the coastal ruins.', 'Jade: "It cannot be the same person in all three places... at the same time."'], rw:{xp:74000, gold:14500}},
      {id:'record_contexts', kind:'investigate', n:'Examine the Descriptions and Contexts for Each Account', icon:'🔍', ch:188, need:3, ambush:[], lo:65, needFlag:'inv_review_records', lockMsg:'🔒 Finish the previous clue first',
       desc:'Too different to be copies.',
       clues:['Jade: "The contexts are too different to be a simple case of copied records. We need to understand what each kingdom believed they witnessed."', 'The party examines the original documents, focusing on the descriptions and the surrounding events.', 'There is no evidence that the accounts were copied from one another.'], rw:{xp:74500, gold:14600}},
      {id:'compare_terms', kind:'investigate', n:'Compare the Dates, Locations and Terminology', icon:'📐', ch:188, need:3, ambush:[], lo:65, needFlag:'inv_record_contexts', lockMsg:'🔒 Finish the previous clue first',
       desc:'Hundreds of miles apart.',
       clues:['Each record uses different terminology.', 'The locations are hundreds of miles apart. And yet the date is identical.', 'The more they investigate, the more it seems that the name\'s presence in three kingdoms was intentional, or part of a larger hidden pattern.'], rw:{xp:75000, gold:14700}},
      {id:'possible_explanations', kind:'investigate', n:'Discuss Possible Explanations', icon:'💭', ch:188, need:3, ambush:[], lo:65, needFlag:'inv_compare_terms', lockMsg:'🔒 Finish the previous clue first',
       desc:'Event, title, phenomenon, role.',
       clues:['Devon: "It could be a linked event. A single occurrence that was recorded differently depending on the kingdom\'s perspective."', 'Levi: "Or it could be a title, a position, or even a phenomenon that appears in different forms. We shouldn\'t assume it\'s a person yet."', 'Sky: "If it\'s a natural phenomenon, we should look at environmental records from that year. Weather, tides, seismic activity, anything unusual." Seraphina: "If it\'s a title or role, we should examine political records."'], rw:{xp:75500, gold:14800}},
      {id:'key_questions', kind:'investigate', n:'Identify Key Questions for Further Investigation', icon:'❓', ch:188, need:3, ambush:[], lo:65, needFlag:'inv_possible_explanations', lockMsg:'🔒 Finish the previous clue first',
       desc:'What does the name represent?',
       clues:['"And if it\'s something else entirely... then the Register may be recording more than just individual creatures."', 'The question is no longer whether the records are accurate. The question is what this name truly represents, and why it appeared in three different kingdoms at the same time.', 'Jade: "This is not an ordinary entry. Are these three accounts connected by a common event, a shared figure, or something much larger?"'], rw:{xp:76000, gold:14900}},
      {id:'next_inquiry', kind:'investigate', n:'Prepare for the Next Step in the Inquiry', icon:'🧭', ch:188, need:3, ambush:[], lo:65, needFlag:'inv_key_questions', lockMsg:'🔒 Finish the previous clue first',
       desc:'Deeper.',
       clues:['"Whatever the truth is, it\'s beyond what we expected. We will need to look deeper, into history, politics, and perhaps even the nature of the Register itself."', 'The party prepares the next step of the inquiry.'], rw:{xp:76500, gold:15000}},
      {id:'analysis_review', kind:'investigate', n:'Review the Analysis of the Three Records', icon:'🗂️', ch:189, need:3, ambush:[], lo:66,
       desc:'Same name, same date.',
       clues:['Jade: "The same name. The same date. Three kingdoms." "It cannot be coincidence."', 'The descriptions match in name and date, but the contexts are different in each kingdom.', 'Adrian: "The translations are accurate. The calendar systems have been cross-checked. And the writing styles match each kingdom\'s own records."'], rw:{xp:77000, gold:15100}},
      {id:'shared_name', kind:'investigate', n:'Investigate Possible Explanations for the Shared Name', icon:'💭', ch:189, need:3, ambush:[], lo:66, needFlag:'inv_analysis_review', lockMsg:'🔒 Finish the previous clue first',
       desc:'One person, many, or a role.',
       clues:['Sky: "If it\'s the same person, they must have travelled to all three kingdoms within the same time period. That would require extraordinary means."', '"Or the same name could refer to different people, possibly related by blood, position or title. There could be a shared identity, a ceremonial title, or a deliberate use of the same name."', 'Seraphina: "Perhaps the same person appeared in different forms or roles, or was recorded from different perspectives."'], rw:{xp:77500, gold:15200}},
      {id:'neutral_archives', kind:'investigate', n:'Research Neutral Archives and Trade Cities', icon:'📚', ch:189, need:3, ambush:[], lo:66, needFlag:'inv_shared_name', lockMsg:'🔒 Finish the previous clue first',
       desc:'Records harder to change.',
       clues:['Levi: "We should also check private archives, trade logs and traveller accounts. Official records can be altered, but personal records are harder to change."', 'The party lists areas to investigate: neutral maritime archives, independent scholarly organizations, nearby kingdoms and trade cities, religious or cultural records, private collections and family archives.', 'One promising lead is a neutral trade city known for keeping records from multiple kingdoms, including those later erased elsewhere.'], rw:{xp:78000, gold:15300}},
      {id:'kingdom_links', kind:'investigate', n:'Look for Connections Between the Kingdoms', icon:'🔗', ch:189, need:3, ambush:[], lo:66, needFlag:'inv_neutral_archives', lockMsg:'🔒 Finish the previous clue first',
       desc:'A person, a group, an organization.',
       clues:['"If this is connected to political movements, it may explain why the records appear in all three kingdoms."', '"It could be a person, a group, or an organization operating across borders."', 'The city may hold information that was not influenced by the political changes of Tribute, Dragonvale or the Sunken Kingdom.'], rw:{xp:78500, gold:15400}},
      {id:'prepare_travel', kind:'investigate', n:'Prepare to Travel to the Next Location', icon:'⛵', ch:189, need:3, ambush:[], lo:66, needFlag:'inv_kingdom_links', lockMsg:'🔒 Finish the previous clue first',
       desc:'Let\'s go there next.',
       clues:['Jade: "We need to understand what this name really means, and why it appears in three different kingdoms at the same time. Let\'s go there next."', 'The investigation moves beyond the three kingdoms.'], rw:{xp:79000, gold:15500}},
      {id:'identity_event_role', kind:'investigate', n:'Continue Investigating the Identity, Event or Role Linked to the Name', icon:'❔', ch:189, need:3, ambush:[], lo:66, needFlag:'inv_prepare_travel', lockMsg:'🔒 Finish the previous clue first',
       desc:'A key to a deeper truth.',
       clues:['The name in the Fifteen Register may be more than a single entry.', 'It could be a key to a deeper truth about the past, and the forces that still shape the present.'], rw:{xp:79500, gold:15600}},
      {id:'confirm_connection', kind:'investigate', n:'Confirm the Connection Between the Three Records', icon:'🔗', ch:190, need:3, ambush:[], lo:66,
       desc:'One port, three names.',
       clues:['The trade city seems to appear in all three records, but the roles and descriptions are different.', 'Tribute: Haiyue Port (Sea-Moon Port), a trade hub and neutral city. Dragonvale: Moonreach (Moon Bridge), a strategic trading post. The Sunken Kingdom: Yueluo (Moon Anchorage), a sacred port.', 'Adrian: "The name may refer to the same city, but it was seen very differently by each kingdom."'], rw:{xp:80000, gold:15700}},
      {id:'haiyue_history', kind:'investigate', n:'Investigate Haiyue Port and Its History', icon:'⚓', ch:190, need:3, ambush:[], lo:66, needFlag:'inv_confirm_connection', lockMsg:'🔒 Finish the previous clue first',
       desc:'A place of ceremony as well as trade.',
       clues:['The name appears with different spellings and titles in each kingdom\'s records, suggesting a place of strategic importance.', 'Seraphina: "The ritual references suggest the city was also a place of ceremony, not just trade. If it linked all three kingdoms, it might have been used for more than commercial purposes."', 'Yueluo is referenced in ritual texts as the meeting place of three tides.'], rw:{xp:80500, gold:15800}},
      {id:'multiple_sources', kind:'investigate', n:'Gather Information from Multiple Sources', icon:'🗂️', ch:190, need:3, ambush:[], lo:66, needFlag:'inv_haiyue_history', lockMsg:'🔒 Finish the previous clue first',
       desc:'Altered destinations.',
       clues:['Sky: "Some of the ships listed in the Tribute records match shipping patterns from Dragonvale. But the destinations were altered or omitted in later copies."', 'Levi: "That could mean something happened at this trade city that was deliberately hidden."', 'Neutral merchant guilds, independent trade families, maritime archives and ship logs, nearby kingdoms and allied cities, scholarly organizations.'], rw:{xp:81000, gold:15900}},
      {id:'private_archives', kind:'investigate', n:'Look for Private Archives and Travel Journals', icon:'📖', ch:190, need:3, ambush:[], lo:66, needFlag:'inv_multiple_sources', lockMsg:'🔒 Finish the previous clue first',
       desc:'Outside the official channels.',
       clues:['Jade: "We also need to look for records outside the official channels. Private merchant logs, family archives, and travel journals might contain details that were left out of the main records."', 'Private collections and personal journals are on the party\'s list.'], rw:{xp:81500, gold:16000}},
      {id:'port_control', kind:'investigate', n:'Determine Who Controlled the Port and What Was Traded', icon:'🏛️', ch:190, need:3, ambush:[], lo:66, needFlag:'inv_private_archives', lockMsg:'🔒 Finish the previous clue first',
       desc:'Who managed a neutral city?',
       clues:['A bearded companion: "A neutral trade city still needs someone to manage it. If there was a shared council, merchant guild, or independent rulers, their records might still exist."', 'Dragonvale\'s records mention restricted cargo and closed ledgers.', 'Levi: "We need to find out what was being traded, and who was involved."'], rw:{xp:82000, gold:16100}},
      {id:'register_next', kind:'investigate', n:'Continue the Investigation into the Fifteen Register', icon:'📕', ch:190, need:3, ambush:[], lo:66, needFlag:'inv_port_control', lockMsg:'🔒 Finish the previous clue first',
       desc:'Sail for Haiyue Port.',
       clues:['Before they leave, Adrian makes detailed notes and copies of the relevant entries from the three records, so the party can compare them on the journey.', 'As the sun sets, the party leaves the current city behind and sets sail towards Haiyue Port, the first major lead beyond the three kingdoms.', 'Jade: "This may be the key to understanding how the same name appears in Tribute, Dragonvale, and the Sunken Kingdom, and what really happened there."'], rw:{xp:82500, gold:16200}},
      {id:'sally_court', kind:'investigate', n:'Attend the Royal Court\'s Gathering', icon:'👗', ch:191, need:3, ambush:[], lo:66,
       desc:'A lady of the realm.',
       clues:['Dressed in an elegant gown and with her head held high, Sally attends the royal court\'s social gathering once again.', '"This time, she was no longer a guest of the night: she was a lady of the realm."', 'The noble families welcome her warmly; her grace, maturity and quiet strength silence the old whispers.'], rw:{xp:83000, gold:16400}},
      {id:'meet_lucien', kind:'investigate', n:'Meet Lucien Marroway', icon:'🤵', ch:191, need:3, ambush:[], lo:66, needFlag:'inv_sally_court', lockMsg:'🔒 Finish the previous clue first',
       desc:'Integrity, diplomacy, quiet kindness.',
       clues:['Sally is formally introduced to Lucien Marroway, a respected nobleman known for his integrity, diplomatic skills and quiet kindness.', 'Their meeting was the result of months of quiet conversations and growing trust.', 'Lucien: "I do not wish to be the man who saves you, Lady Sally. I simply hope to walk beside you... as an equal."'], rw:{xp:83500, gold:16500}},
      {id:'sally_wedding', kind:'investigate', n:'Witness the Wedding', icon:'💍', ch:191, need:3, ambush:[], lo:66, needFlag:'inv_meet_lucien', lockMsg:'🔒 Finish the previous clue first',
       desc:'From today forward.',
       clues:['Lucien: "From today forward, you are my wife, Sally Marroway." Sally: "And you are my husband, Lucien."', 'Their wedding was a union of respect, trust and love, a new chapter for both of them.'], rw:{xp:84000, gold:16600}},
      {id:'sally_new_life', kind:'investigate', n:'Sally\'s New Life', icon:'🌅', ch:191, need:3, ambush:[], lo:66, needFlag:'inv_sally_wedding', lockMsg:'🔒 Finish the previous clue first',
       desc:'A lady of influence, grace and purpose.',
       clues:['Her marriage to Lucien Marroway marked not only her personal redemption, but also a sign to the court that the past did not define her.', 'She was no longer a shadow of scandal, but a lady of influence, grace and purpose.', 'For Lucien, it was the greatest honour of his life to stand beside her.'], rw:{xp:84500, gold:16700}},
      {id:'tavern_rest', kind:'investigate', n:'Take an Evening of Rest', icon:'🍶', ch:192, need:3, ambush:[], lo:66,
       desc:'A rare evening.',
       clues:['With the investigation ongoing, the party takes a rare evening of rest at a familiar tavern in Dragonvale.', 'Jade: "It\'s been a while since we had a proper meal like this."', 'The tavern is livelier than usual, filled with nobles, merchants and travellers.'], rw:{xp:85000, gold:16800}},
      {id:'sally_arrives', kind:'investigate', n:'Lady Sally Sun Arrives', icon:'👑', ch:192, need:3, ambush:[], lo:66, needFlag:'inv_tavern_rest', lockMsg:'🔒 Finish the previous clue first',
       desc:'Formerly Sally Sin.',
       clues:['Lady Sally Sun, formerly Sally Sin, returns to public life after her recent marriage, her presence drawing attention across the tavern.', 'She is accompanied only by her handmaiden, not her husband.', 'Her hair is now worn down and her robes more elegant and free: a reflection of her new position and the freedom she now has.'], rw:{xp:85500, gold:16900}},
      {id:'levi_present', kind:'investigate', n:'Levi Is Also There', icon:'🏹', ch:192, need:3, ambush:[], lo:66, needFlag:'inv_sally_arrives', lockMsg:'🔒 Finish the previous clue first',
       desc:'A gaze that lingers.',
       clues:['Levi Stanson is also present, having arrived separately. His gaze lingers on Sally, though his expression reveals little.', 'Sally: "It\'s been a long time. So much has changed. But tonight, let\'s simply enjoy the evening, yes?"'], rw:{xp:86000, gold:17000}},
      {id:'levi_sally_talk', kind:'investigate', n:'Leave Levi and Sally to Talk', icon:'💬', ch:192, need:3, ambush:[], lo:66, needFlag:'inv_levi_present', lockMsg:'🔒 Finish the previous clue first',
       desc:'Shall we talk?',
       clues:['Jade, Devon and Sky take their leave to rest and continue their discussions later.', 'With the others gone, the conversation between Levi and Sally takes a different turn. Levi: "It really has been a long time, hasn\'t it? Shall we talk?"', 'Even moments of rest can reveal unexpected information.'], rw:{xp:86500, gold:17100}},
      {id:'handmaiden_speaks', kind:'investigate', n:'The Handmaiden Asks to Speak Freely', icon:'🤲', ch:193, need:3, ambush:[], lo:66,
       desc:'Lady Sally... may I speak freely?',
       clues:['Her handmaiden, who had been with her since before the marriage, finally speaks when they are away from the rest of the party.', '"I cannot help but worry about Levi Stanson. He was here tonight, and the way he looked at you... it felt different from before."'], rw:{xp:87000, gold:17200}},
      {id:'levi_feelings', kind:'investigate', n:'Levi\'s Feelings', icon:'💭', ch:193, need:3, ambush:[], lo:66, needFlag:'inv_handmaiden_speaks', lockMsg:'🔒 Finish the previous clue first',
       desc:'Composed, almost distant.',
       clues:['Levi Stanson has returned to Tribute with his own purpose. His expression was composed, almost distant, yet his gaze lingered on Sally longer than necessary.', 'Handmaiden: "I am afraid he might still hold feelings for you. Or that others might misunderstand, given your past connection."'], rw:{xp:87500, gold:17300}},
      {id:'sally_answers', kind:'investigate', n:'Sally Answers', icon:'🌸', ch:193, need:3, ambush:[], lo:66, needFlag:'inv_levi_feelings', lockMsg:'🔒 Finish the previous clue first',
       desc:'My life is my own to choose.',
       clues:['Sally: "Levi and I are from different paths now. I am Lady Sun, and my life is my own to choose. I will remain polite and gracious, but I will not allow the past to define my future."', '"I am not the timid girl I once was. I have my own position, my own voice, and people who respect me for who I am now."'], rw:{xp:88000, gold:17400}},
      {id:'together', kind:'investigate', n:'We Will Face It Together', icon:'🤝', ch:193, need:3, ambush:[], lo:66, needFlag:'inv_sally_answers', lockMsg:'🔒 Finish the previous clue first',
       desc:'Duty and trust.',
       clues:['Handmaiden: "I will always be honest with you, Lady Sally. It is my duty to protect you."', 'Sally: "You have always stood by me. That is enough. No matter what comes next, we will face it together."', 'Freedom comes with its own challenges; trust with those closest to her will matter as much as facing the truths of the past.'], rw:{xp:88500, gold:17500}},
      {id:'village_order', kind:'investigate', n:'Visit the Village under Marroway House', icon:'🏘️', ch:194, need:3, ambush:[], lo:67,
       desc:'Quiet fear.',
       clues:['Jade\'s party visits a nearby village under the authority of Marroway House. It appears orderly at first, but the atmosphere feels wrong.', 'Soldiers bearing the Marroway insignia watch the people closely.'], rw:{xp:89000, gold:17600}},
      {id:'levy_collectors', kind:'investigate', n:'Who Collects the Levies?', icon:'💰', ch:194, need:3, ambush:[], lo:67, needFlag:'inv_village_order', lockMsg:'🔒 Finish the previous clue first',
       desc:'Road maintenance and security.',
       clues:['Villager: "Please... we have already paid the levy. There is nothing left." Jade: "Who collects these levies? Is it Marroway House?"', '"It is for \'road maintenance\' and \'security\', they say. But the roads are broken, and the soldiers only take more."', 'Devon: "This is more than a simple tax. It is extraction, and it is systematic."'], rw:{xp:89500, gold:17700}},
      {id:'taken_children', kind:'investigate', n:'Grain, Timber and People', icon:'🧒', ch:194, need:3, ambush:[], lo:67, needFlag:'inv_levy_collectors', lockMsg:'🔒 Finish the previous clue first',
       desc:'Two years.',
       clues:['"They still take our grain... and our children for labour. If we refuse, there are punishments."', 'A mother: "They said my son would work for the house for one season... It has been two years. We have not heard from him since."', 'Movement of goods at the docks: grain, timber and people.'], rw:{xp:90000, gold:17800}},
      {id:'same_pattern', kind:'investigate', n:'The Same Pattern', icon:'🔁', ch:194, need:3, ambush:[], lo:67, needFlag:'inv_taken_children', lockMsg:'🔒 Finish the previous clue first',
       desc:'Levies, forced labour, disappearances.',
       clues:['Jade: "This is the same pattern we saw in the previous town. Different villages, but the same methods: levies, forced labour, disappearances."', 'The records seen in the town match: Marroway controls the supply routes, the grain stores and the labour.', '"Marroway\'s influence runs deeper than we thought."'], rw:{xp:90500, gold:17900}},
      {id:'quiet_evidence', kind:'investigate', n:'Gather Evidence Quietly', icon:'🕯️', ch:194, need:3, ambush:[], lo:67, needFlag:'inv_same_pattern', lockMsg:'🔒 Finish the previous clue first',
       desc:'Without putting them in danger.',
       clues:['"Sally trusted Marroway. But if this is what his house does to these people... there may be more that she does not know."', 'Jade: "For now, we will gather more evidence quietly. These people are already suffering. We must be careful not to put them in greater danger."'], rw:{xp:91000, gold:18000}},
      {id:'levy_tables', kind:'investigate', n:'Compare the Levy Tables', icon:'📜', ch:195, need:3, ambush:[], lo:67,
       desc:'Higher than recorded.',
       clues:['Carly reviews the accounts from the village and compares them with older trade records and shipping routes.', '"The taxes are far higher than what is recorded in the official levy tables... and these goods are not reaching the capital at all."'], rw:{xp:91500, gold:18100}},
      {id:'villagers_fear', kind:'investigate', n:'The Villagers Speak Cautiously', icon:'😟', ch:195, need:3, ambush:[], lo:67, needFlag:'inv_levy_tables', lockMsg:'🔒 Finish the previous clue first',
       desc:'If we complain, he will take our land.',
       clues:['The people speak cautiously, fearing punishment if they are found to have talked.', '"Last season, three families disappeared after refusing to pay the new levy..."', 'What the villagers describe matches the docks: extra levies, diverted goods and harsh enforcement by Marroway\'s men.'], rw:{xp:92000, gold:18200}},
      {id:'carly_journal', kind:'investigate', n:'Carly\'s Journal', icon:'📓', ch:195, need:3, ambush:[], lo:67, needFlag:'inv_villagers_fear', lockMsg:'🔒 Finish the previous clue first',
       desc:'A pattern.',
       clues:['Carly records names, dates, locations and witness accounts in a separate journal.', '"It is not just isolated incidents. This is a pattern. If I can gather enough evidence, this could support a formal investigation."'], rw:{xp:92500, gold:18300}},
      {id:'private_stores', kind:'investigate', n:'Goods Rerouted to Private Stores', icon:'🏚️', ch:195, need:3, ambush:[], lo:67, needFlag:'inv_carly_journal', lockMsg:'🔒 Finish the previous clue first',
       desc:'Grain that never left.',
       clues:['Some shipments listed as "grain for the capital" never left the region.', '"These warehouse marks... they match the ones at the eastern docks. So the goods are being rerouted through Marroway\'s private stores."', 'Carly also notes the names of key enforcers, storage sites and intermediaries.'], rw:{xp:93000, gold:18400}},
      {id:'discreet', kind:'investigate', n:'Continue Discreetly', icon:'🤫', ch:195, need:3, ambush:[], lo:67, needFlag:'inv_private_stores', lockMsg:'🔒 Finish the previous clue first',
       desc:'More before they present it.',
       clues:['Carly informs Jade of her progress, and they agree to continue gathering information discreetly while remaining in the region a little longer.', 'Jade: "We need more before we present this. If we move too soon, the evidence may disappear. But we cannot ignore what the people are suffering either."'], rw:{xp:93500, gold:18500}},
      {id:'witness_meets', kind:'investigate', n:'Meet the Survivor', icon:'🧕', ch:196, need:3, ambush:[], lo:67,
       desc:'On condition of anonymity.',
       clues:['A survivor agrees to speak on the condition that her identity remains protected.', 'That night Carly and her handmaiden meet a woman who had once worked at a supply warehouse under Marroway\'s control.', 'She is clearly frightened, looking over her shoulder several times before speaking.'], rw:{xp:94000, gold:18600}},
      {id:'witness_account', kind:'investigate', n:'The Survivor\'s Account', icon:'🗣️', ch:196, need:3, ambush:[], lo:67, needFlag:'inv_witness_meets', lockMsg:'🔒 Finish the previous clue first',
       desc:'Beaten or dismissed.',
       clues:['"We were told the grain shipments were for the capital, but many of the goods were diverted elsewhere. When we asked questions, we were beaten or dismissed."', '"Some of the women who refused to comply were sent away... and we never saw them again."'], rw:{xp:94500, gold:18700}},
      {id:'witness_orders', kind:'investigate', n:'Who Gave the Orders', icon:'📣', ch:196, need:3, ambush:[], lo:67, needFlag:'inv_witness_account', lockMsg:'🔒 Finish the previous clue first',
       desc:'Marroway House.',
       clues:['"It always came from Marroway House, through their stewards and military officers. They said it was a noble order, and that disobedience would be treated as treason."', 'New levies: families forced to give more labour, including children; those who could not pay were marked and taken for "other services".'], rw:{xp:95000, gold:18800}},
      {id:'protect_witness', kind:'investigate', n:'Protect the Witness', icon:'🛡️', ch:196, need:3, ambush:[], lo:67, needFlag:'inv_witness_orders', lockMsg:'🔒 Finish the previous clue first',
       desc:'Her name will not be written.',
       clues:['Carly: "Your identity will remain protected. I will record this carefully, but your name will not be included."', 'Carly notes every detail: dates, locations, names of stewards, shipment routes and the condition of the people.'], rw:{xp:95500, gold:18900}},
      {id:'more_voices', kind:'investigate', n:'There Are Others', icon:'👥', ch:196, need:3, ambush:[], lo:67, needFlag:'inv_protect_witness', lockMsg:'🔒 Finish the previous clue first',
       desc:'Informants among the common people.',
       clues:['"There are others who may be willing to talk, but they are afraid. We must be careful. Marroway\'s men have informants even among the common people."', 'One testimony alone is not enough, but it confirms a darker truth: a network of exploitation, intimidation and silence.'], rw:{xp:96000, gold:19000}},
      {id:'ledger_found', kind:'investigate', n:'Find the Hidden Ledger', icon:'📒', ch:197, need:3, ambush:[], lo:68,
       desc:'A side storeroom.',
       clues:['Carly gains access to a set of household and trade records connected to Marroway\'s operations.', 'The records are kept separately from the main trade ledgers, hidden in a side storeroom beneath the household offices.', 'Carly: "Yes. The seal, the format... and look at these names."'], rw:{xp:96500, gold:19100}},
      {id:'ledger_payments', kind:'investigate', n:'Read the Payments', icon:'💴', ch:197, need:3, ambush:[], lo:68, needFlag:'inv_ledger_found', lockMsg:'🔒 Finish the previous clue first',
       desc:'Escort fees, protection, relocation.',
       clues:['The ledgers show regular payments labelled "escort fees," "protection," and "labour relocation", but the amounts do not match the recorded shipments.', '"These are not normal transport costs." The names match the villages visited; the same month the levies increased, there are payments listed.'], rw:{xp:97000, gold:19200}},
      {id:'ledger_people', kind:'investigate', n:'Payments for People', icon:'🧾', ch:197, need:3, ambush:[], lo:68, needFlag:'inv_ledger_payments', lockMsg:'🔒 Finish the previous clue first',
       desc:'Relocation, transfer, special handling.',
       clues:['Several entries are marked with coded notes, likely referring to people rather than goods: "relocation", "transfer", "special handling".', '"It looks like people were being moved, and not voluntarily."'], rw:{xp:97500, gold:19300}},
      {id:'ledger_altered', kind:'investigate', n:'Crossed-Out Entries', icon:'✂️', ch:197, need:3, ambush:[], lo:68, needFlag:'inv_ledger_people', lockMsg:'🔒 Finish the previous clue first',
       desc:'Someone tried to hide this.',
       clues:['The household accounts also include payments to officials, large sums to unknown recipients, and records that have been deliberately altered.', '"Some of these entries have been crossed out, but the original writing is still visible. Someone tried to hide this."'], rw:{xp:98000, gold:19400}},
      {id:'copy_ledger', kind:'investigate', n:'Copy the Key Pages', icon:'✍️', ch:197, need:3, ambush:[], lo:68, needFlag:'inv_ledger_altered', lockMsg:'🔒 Finish the previous clue first',
       desc:'Separate places.',
       clues:['Carly and her handmaiden carefully copy the key information: payment lists, names, dates, warehouse locations and notes that link the accounts to specific villages.', '"We should make copies and keep them in separate places. If they realise these are missing, they might destroy the rest."', '"These should be enough to support an investigation if we can get them to the right people."'], rw:{xp:98500, gold:19500}},
      {id:'marroway_lodges', kind:'hunt', n:'The Marroway Lodges', icon:'🎭', ch:198, needFlag:'marroway_files', needWhile:() => !G.flags.marroway_closed, lockMsg:'🔒 Sally has not yet asked for your help, or the matter is settled', desc:'Lucien Marroway\'s retainers and collectors, the men the files point to. Masked work.', pool:['marroway_guard','marroway_enforcer'], lo:55},
      {id:'request_meeting', kind:'investigate', n:'Meet Carly in a Quiet Corner', icon:'🏮', ch:198, need:3, ambush:[], lo:68,
       desc:'Sally could not come.',
       clues:['To avoid drawing suspicion, Sally does not attend the meeting. She sends Carly, her trusted handmaiden, to speak with Jade, Devon and Sky in private.', 'Carly: "Thank you for agreeing to meet me. Lady Sally could not come. It is safer this way."'], rw:{xp:99000, gold:19600}},
      {id:'carly_report', kind:'investigate', n:'Carly\'s Report', icon:'📋', ch:198, need:3, ambush:[], lo:68, needFlag:'inv_request_meeting', lockMsg:'🔒 Finish the previous clue first',
       desc:'Intimidation and disappearances.',
       clues:['"Lucien\'s men are intimidating the villagers, especially the women. Some have already disappeared. They fear speaking because Marroway House can punish anyone who talks."', '"At least three women have disappeared within the last two years. There are also those forced into labour at the docks and the storehouses. Some are not paid, and some are never seen again."'], rw:{xp:99500, gold:19700}},
      {id:'pattern_organised', kind:'investigate', n:'An Organised Network', icon:'🕸️', ch:198, need:3, ambush:[], lo:68, needFlag:'inv_carly_report', lockMsg:'🔒 Finish the previous clue first',
       desc:'Using Marroway House\'s status to cover its tracks.',
       clues:['Devon: "This is not just a few isolated cases. It looks like a pattern. An organised network using Marroway House\'s status to cover its tracks."', 'Sky asks for names, locations and shipments in writing.'], rw:{xp:100000, gold:19800}},
      {id:'carly_copies', kind:'investigate', n:'The Copies', icon:'📑', ch:198, need:3, ambush:[], lo:68, needFlag:'inv_pattern_organised', lockMsg:'🔒 Finish the previous clue first',
       desc:'Kept in separate places.',
       clues:['Carly: "I have made copies of some ledgers, payment records and household accounts. I kept them separate and used different locations in case they are discovered."', '"There are more, but I need time to make additional copies. I cannot risk returning with obvious signs that I have been collecting these."'], rw:{xp:100500, gold:19900}},
      {id:'not_revenge', kind:'investigate', n:'Protection, Not Revenge', icon:'🛡️', ch:198, need:3, ambush:[], lo:68, needFlag:'inv_carly_copies', lockMsg:'🔒 Finish the previous clue first',
       desc:'If they suspect me, Sally is at risk.',
       clues:['Carly: "Please... I am not asking for revenge. I just want the villagers and the women to be safe. If Marroway\'s men suspect me, it would put Lady Sally at risk too."', 'Jade: "You have already done more than most would dare, Carly. We will help."'], rw:{xp:101000, gold:20000}},
      {id:'plan_properly', kind:'investigate', n:'Plan This Properly', icon:'🧭', ch:198, need:3, ambush:[], lo:68, needFlag:'inv_not_revenge', lockMsg:'🔒 Finish the previous clue first',
       desc:'Send word discreetly.',
       clues:['Jade: "But we must be careful and plan this properly. For now, continue gathering information quietly. Do not let them suspect you."', '"If you learn of any immediate danger, send word to us discreetly. We will arrange protection for those who need to leave."'], rw:{xp:101500, gold:20100}},
      {id:'night_entry', kind:'investigate', n:'Slip In behind the Warehouses', icon:'🌙', ch:199, need:3, ambush:[], lo:68,
       desc:'A lesser-used gateway.',
       clues:['After nightfall, Jade, Rin and Levi slip into Marroway House through a lesser-used gateway behind the warehouses.', 'Levi: "Keep low. The main halls are this way." Rin: "The guards are changing shifts. We have a short window."', 'They move through servants\' corridors and storage areas, avoiding patrols.'], rw:{xp:102000, gold:20200}},
      {id:'diverted_crates', kind:'investigate', n:'Crates Marked Grain', icon:'📦', ch:199, need:3, ambush:[], lo:68, needFlag:'inv_night_entry', lockMsg:'🔒 Finish the previous clue first',
       desc:'Medicine and high-value goods.',
       clues:['At the warehouses they find signs of goods being diverted: crates marked as "grain" contain other supplies, including medicine and high-value items.', 'Levi notes the delivery marks and takes careful copies.'], rw:{xp:102500, gold:20300}},
      {id:'delivery_marks', kind:'investigate', n:'Match the Delivery Marks', icon:'🔖', ch:199, need:3, ambush:[], lo:68, needFlag:'inv_diverted_crates', lockMsg:'🔒 Finish the previous clue first',
       desc:'They match Carly\'s notes.',
       clues:['Jade: "These marks match the ones in Carly\'s notes. The goods are being sent to other locations."'], rw:{xp:103000, gold:20400}},
      {id:'agent_token', kind:'investigate', n:'The Agents\' Token', icon:'🪙', ch:199, need:3, ambush:[], lo:68, needFlag:'inv_delivery_marks', lockMsg:'🔒 Finish the previous clue first',
       desc:'Not in the household records.',
       clues:['Rin: "Look at this. A token used by Marroway\'s agents. It wasn\'t in the official household records."'], rw:{xp:103500, gold:20500}},
      {id:'hidden_room', kind:'investigate', n:'The Hidden Storage Room', icon:'🚪', ch:199, need:3, ambush:[], lo:68, needFlag:'inv_agent_token', lockMsg:'🔒 Finish the previous clue first',
       desc:'Marked for relocation.',
       clues:['In a hidden storage room they find lists of payments to local enforcers, travel routes, and names of villagers and women marked for relocation.', 'Levi: "This will be enough to prove there is a wider network. But we need to be careful when we use it."'], rw:{xp:104000, gold:20600}},
      {id:'night_copies', kind:'investigate', n:'Copy and Withdraw', icon:'🏃', ch:199, need:3, ambush:[], lo:68, needFlag:'inv_hidden_room', lockMsg:'🔒 Finish the previous clue first',
       desc:'Before the next patrol.',
       clues:['They collect copies of key documents, traces of delivery seals, and one of the tokens used to identify the shipments.', 'Rin: "These records show intimidation, bribes and forced labour. It is far worse than we expected."', 'Jade: "Let\'s take what we have and return to Carly... We must move now, before the next patrol."'], rw:{xp:104500, gold:20700}},
      {id:'lucien_traces', kind:'investigate', n:'Lucien Finds Traces', icon:'🔍', ch:200, need:3, ambush:[], lo:68,
       desc:'A missing ledger, a moved document.',
       clues:['At first it is small things: a missing ledger, a moved document, a question from a steward, and unfamiliar attention around the warehouses.', 'Lucien finds traces that his household records have been viewed or copied. "So... there are eyes within my house now?"'], rw:{xp:105000, gold:20800}},
      {id:'lucien_suspects', kind:'investigate', n:'He Suspects the Household', icon:'❓', ch:200, need:3, ambush:[], lo:68, needFlag:'inv_lucien_traces', lockMsg:'🔒 Finish the previous clue first',
       desc:'A trusted servant close to Sally.',
       clues:['He begins to suspect that the information is coming from within his own household, most likely through a trusted servant close to Sally.', '"Is my own domestic staff no longer loyal? ...Or is it Sally?"'], rw:{xp:105500, gold:20900}},
      {id:'public_mask', kind:'investigate', n:'The Public Mask', icon:'🎭', ch:200, need:3, ambush:[], lo:68, needFlag:'inv_lucien_suspects', lockMsg:'🔒 Finish the previous clue first',
       desc:'Gracious noble, devoted husband.',
       clues:['In public, Lucien maintains his mask: the gracious noble, a devoted husband, and a respectable member of the court.', 'But behind the mask his patience begins to wear thin.'], rw:{xp:106000, gold:21000}},
      {id:'house_tightened', kind:'investigate', n:'Surveillance Tightens', icon:'👁️', ch:200, need:3, ambush:[], lo:68, needFlag:'inv_public_mask', lockMsg:'🔒 Finish the previous clue first',
       desc:'Double the watches.',
       clues:['He quietly increases surveillance within the household, questioning servants and changing access to key areas.', '"From now on, no one enters the warehouses or ledgers without my approval. Double the watches."'], rw:{xp:106500, gold:21100}},
      {id:'servants_warned', kind:'investigate', n:'Servants Warned', icon:'⚠️', ch:200, need:3, ambush:[], lo:68, needFlag:'inv_house_tightened', lockMsg:'🔒 Finish the previous clue first',
       desc:'A careless tongue can ruin lives.',
       clues:['Several servants are warned, transferred, or threatened when Lucien suspects they may have spoken or seen too much.', '"Remember where your loyalty lies. A careless tongue can ruin lives."'], rw:{xp:107000, gold:21200}},
      {id:'mask_cracks', kind:'investigate', n:'The Mask Cracks', icon:'💢', ch:200, need:3, ambush:[], lo:68, needFlag:'inv_servants_warned', lockMsg:'🔒 Finish the previous clue first',
       desc:'You underestimate how far my reach goes.',
       clues:['Lucien cannot yet prove who is behind the investigation, but the pattern is clear. "They are careful. They know where to look. This is not random."', '"Whoever you are... you have made a serious mistake. If you think you can hide from me... you underestimate how far my reach goes."'], rw:{xp:107500, gold:21300}},
      {id:'safe_meeting', kind:'investigate', n:'A Safe Meeting Place', icon:'🏮', ch:201, need:3, ambush:[], lo:69,
       desc:'Outside Lucien\'s direct control.',
       clues:['The party sets up a safe meeting place outside Lucien\'s direct control, where villagers and workers can share what they have witnessed.', 'Jade: "You are safe here. You can speak. We will protect you."'], rw:{xp:108000, gold:21400}},
      {id:'villagers_speak', kind:'investigate', n:'The Villagers Speak', icon:'🗣️', ch:201, need:3, ambush:[], lo:69, needFlag:'inv_safe_meeting', lockMsg:'🔒 Finish the previous clue first',
       desc:'The wagons leave at night.',
       clues:['"We have seen the wagons leave at night. Women from the docks, from the farms... and they never return. Those who ask questions are dismissed, punished, or made to disappear as well."'], rw:{xp:108500, gold:21500}},
      {id:'women_testify', kind:'investigate', n:'The Women Testify', icon:'👩', ch:201, need:3, ambush:[], lo:69, needFlag:'inv_villagers_speak', lockMsg:'🔒 Finish the previous clue first',
       desc:'Grain debts would be seized.',
       clues:['A young woman: "I was sent to Marroway House to work in the storehouses. When I resisted, they said my family\'s grain debts would be seized. There were others. We... we are not the only ones."'], rw:{xp:109000, gold:21600}},
      {id:'protect_names', kind:'investigate', n:'Protect Their Names', icon:'🔒', ch:201, need:3, ambush:[], lo:69, needFlag:'inv_women_testify', lockMsg:'🔒 Finish the previous clue first',
       desc:'Names kept confidential.',
       clues:['"You have been very brave to speak. Your names will be kept confidential. We will make sure you and your families are protected."', 'Jade: "Lucien\'s power depends on fear and silence. But you are not alone."'], rw:{xp:109500, gold:21700}},
      {id:'safe_houses', kind:'investigate', n:'Safe Houses and Escorts', icon:'🏠', ch:201, need:3, ambush:[], lo:69, needFlag:'inv_protect_names', lockMsg:'🔒 Finish the previous clue first',
       desc:'No one left unprotected.',
       clues:['"From today, no one who speaks to us will be left unprotected. We will arrange safe houses and escorts for those at risk."'], rw:{xp:110000, gold:21800}},
      {id:'united_stand', kind:'investigate', n:'The Stand', icon:'🤝', ch:201, need:3, ambush:[], lo:69, needFlag:'inv_safe_houses', lockMsg:'🔒 Finish the previous clue first',
       desc:'The fear begins to break.',
       clues:['A villager: "We will stand together. This ends now. Our village will no longer be a place where people disappear in silence."', '"My sister... She never came back. I want the truth. Count on us. There are more who will testify once they see we are not alone."', 'As more villagers come forward, the fear that once kept them apart begins to break.'], rw:{xp:110500, gold:21900}},
      {id:'devon_witness', kind:'investigate', n:'Devon Reviews the Evidence', icon:'📜', ch:202, need:3, ambush:[], lo:69,
       desc:'Not just one man\'s cruelty.',
       clues:['Devon has witnessed the evidence gathered by Sally and Carly, and the testimonies from the villagers.', 'Devon: "This is not just one man\'s cruelty. It has continued because people looked away."'], rw:{xp:111000, gold:22000}},
      {id:'names_shields', kind:'investigate', n:'Names Used as Shields', icon:'🛡️', ch:202, need:3, ambush:[], lo:69, needFlag:'inv_devon_witness', lockMsg:'🔒 Finish the previous clue first',
       desc:'Protected by pedigree, wealth or position.',
       clues:['The records show how noble authority, household connections, and official channels have been used to intimidate villagers, silence women, and hide disappearances.', 'Devon: "If we allow our names and titles to be used as shields for wrongdoing, then we are part of the problem. Authority is not a privilege to protect the guilty. It is a duty to protect the people."'], rw:{xp:111500, gold:22100}},
      {id:'devon_admits', kind:'investigate', n:'Devon Admits His Own Part', icon:'🗣️', ch:202, need:3, ambush:[], lo:69, needFlag:'inv_names_shields', lockMsg:'🔒 Finish the previous clue first',
       desc:'The same system.',
       clues:['Devon: "I have benefited from the same system that lets men like Lucien do as they please."', 'Jade: "It is not enough to punish one person. We must change how this is allowed to happen."'], rw:{xp:112000, gold:22200}},
      {id:'devon_commits', kind:'investigate', n:'Devon Commits', icon:'⚖️', ch:202, need:3, ambush:[], lo:69, needFlag:'inv_devon_admits', lockMsg:'🔒 Finish the previous clue first',
       desc:'My name, my influence, the royal channels.',
       clues:['"I will use what I can: my name, my influence, and the royal channels, to make sure this does not end here. These people deserve more than silence. They deserve justice and a safer future."', 'He commits to push for reforms within the noble and royal circles where such abuses are ignored or covered up.'], rw:{xp:112500, gold:22300}},
      {id:'friends_support', kind:'investigate', n:'Sky and Levi Support Him', icon:'🤝', ch:202, need:3, ambush:[], lo:69, needFlag:'inv_devon_commits', lockMsg:'🔒 Finish the previous clue first',
       desc:'Your voice matters, Devon.',
       clues:['Sky and Levi remind him that real authority is shown through action, not just titles.', '"Your voice matters, Devon. What you do now can protect more people than you realise."'], rw:{xp:113000, gold:22400}},
      {id:'accountability', kind:'investigate', n:'A Name Is Accountability', icon:'👑', ch:202, need:3, ambush:[], lo:69, needFlag:'inv_friends_support', lockMsg:'🔒 Finish the previous clue first',
       desc:'I will not look away again.',
       clues:['Devon: "A name is not just honour and privilege. It is accountability. If we do not live up to that responsibility, then we have no right to be called noble or royal."', '"Using our names to protect the people: that is the kind of nobility I choose to stand for."', 'Jade: "This ends with Lucien, but it must not be the last."'], rw:{xp:113500, gold:22500}},
      {id:'sally_truth', kind:'investigate', n:'Sally Faces the Truth', icon:'💜', ch:203, need:3, ambush:[], lo:69,
       desc:'She stayed because she believed.',
       clues:['After learning the truth and hearing the villagers\' testimonies, Sally can no longer ignore what has been hidden behind Marroway House\'s polished facade.', 'Sally: "I stayed because I believed things could be different. But silence has only allowed more harm to continue."'], rw:{xp:114000, gold:22600}},
      {id:'lucien_dismisses', kind:'investigate', n:'Lucien Dismisses Her', icon:'🏯', ch:203, need:3, ambush:[], lo:69, needFlag:'inv_sally_truth', lockMsg:'🔒 Finish the previous clue first',
       desc:'Reputation, status and control.',
       clues:['Lucien tries to dismiss her decision, clinging to reputation, status and control: "You are my wife. Where would you go? Do you think you can simply walk away from Marroway House?"'], rw:{xp:114500, gold:22700}},
      {id:'sally_refuses', kind:'investigate', n:'I Choose to Leave', icon:'🕊️', ch:203, need:3, ambush:[], lo:69, needFlag:'inv_lucien_dismisses', lockMsg:'🔒 Finish the previous clue first',
       desc:'Final.',
       clues:['Sally: "I will not remain in a marriage built on lies and harm. I choose to leave."', '"You have your name, your influence and your alliances. I will not be used to protect your reputation any longer."'], rw:{xp:115000, gold:22800}},
      {id:'sally_packs', kind:'investigate', n:'Taking Only What Is Hers', icon:'🧳', ch:203, need:3, ambush:[], lo:69, needFlag:'inv_sally_refuses', lockMsg:'🔒 Finish the previous clue first',
       desc:'The freedom to choose her own path.',
       clues:['Sally prepares to leave, taking only what is hers and what she needs for a new beginning. "What I need most is the freedom to choose my own path."', '"I was once a wife of Marroway, but that is not who I am anymore. From today, I choose myself."'], rw:{xp:115500, gold:22900}},
      {id:'sally_departs', kind:'investigate', n:'Sally Departs', icon:'🚪', ch:203, need:3, ambush:[], lo:69, needFlag:'inv_sally_packs', lockMsg:'🔒 Finish the previous clue first',
       desc:'A new beginning.',
       clues:['With the support of Jade\'s party and trusted allies, Sally leaves Marroway House and sets out for a new life away from Lucien\'s control.', '"This is not an end, but a new beginning. I will live without fear, without lies, and without being someone\'s protection for wrongdoing."'], rw:{xp:116000, gold:23000}},
      {id:'present_evidence', kind:'investigate', n:'Present the Evidence', icon:'⚖️', ch:204, need:3, ambush:[], lo:70,
       desc:'Ledgers, delivery records, testimonies.',
       clues:['Jade presents the collected evidence: household ledgers, delivery records, testimonies, and the network of cover-ups linking Lucien to the abuse of his authority.'], rw:{xp:116500, gold:23100}},
      {id:'lucien_denies', kind:'investigate', n:'Lucien Denies', icon:'🎭', ch:204, need:3, ambush:[], lo:70, needFlag:'inv_present_evidence', lockMsg:'🔒 Finish the previous clue first',
       desc:'I am Marroway.',
       clues:['At first Lucien tries to maintain his composure, dismissing the claims as lies and manipulation: "Do you truly think these accusations can bring me down? I am Marroway. My word has always been enough."', 'Jade: "These are the records. These are the testimonies. These are the people you harmed. There is no denying it now."'], rw:{xp:117000, gold:23200}},
      {id:'lucien_custody', kind:'investigate', n:'Lucien Is Taken into Custody', icon:'⛓️', ch:204, need:3, ambush:[], lo:70, needFlag:'inv_lucien_denies', lockMsg:'🔒 Finish the previous clue first',
       desc:'To face formal charges.',
       clues:['Levi stands with Jade, ensuring Lucien is taken into custody and that his crimes are formally recorded: "Your title does not place you above the law. What you did will be answered for."', 'With his power stripped away, Lucien is taken into custody to face formal charges.'], rw:{xp:117500, gold:23300}},
      {id:'voices_found', kind:'investigate', n:'The Villagers Find Their Voices', icon:'🗣️', ch:204, need:3, ambush:[], lo:70, needFlag:'inv_lucien_custody', lockMsg:'🔒 Finish the previous clue first',
       desc:'Now we can finally speak the truth.',
       clues:['The villagers, servants and others affected by Lucien finally find the courage to speak: "Thank you... Now we can finally speak the truth."', 'Sally confirms her decision to leave: "I will not return. I choose to leave."'], rw:{xp:118000, gold:23400}},
      {id:'protection_compensation', kind:'investigate', n:'Protection and Compensation', icon:'🏠', ch:204, need:3, ambush:[], lo:70, needFlag:'inv_voices_found', lockMsg:'🔒 Finish the previous clue first',
       desc:'This never happens again.',
       clues:['Rin, Sky and Levi remain by Jade\'s side, helping to secure protection, compensation and new opportunities for those affected by Lucien\'s abuse.', '"This is not the end. We will make sure these people are safe, and that this never happens again."'], rw:{xp:118500, gold:23500}},
      {id:'house_turmoil', kind:'investigate', n:'Marroway House in Turmoil', icon:'🏚️', ch:204, need:3, ambush:[], lo:70, needFlag:'inv_protection_compensation', lockMsg:'🔒 Finish the previous clue first',
       desc:'The end of fear.',
       clues:['With Lucien\'s fall, Marroway House descends into turmoil, but for many it marks the end of fear and the start of a safer, fairer future.', 'Justice has been served, and the people\'s voices are no longer in silence.'], rw:{xp:119000, gold:23600}},
      {id:'separation_signed', kind:'investigate', n:'The Separation Is Signed', icon:'🖊️', ch:205, need:3, ambush:[], lo:70,
       desc:'Months of proceedings.',
       clues:['After months of proceedings, the separation is finally completed. Sally signs the final documents with a steady hand.', 'What began as a marriage of duty and political convenience now ends in separation. She reclaims her name, her freedom and her future.'], rw:{xp:119500, gold:23700}},
      {id:'never_remarry', kind:'investigate', n:'I Will Not Remarry', icon:'🌸', ch:205, need:3, ambush:[], lo:70, needFlag:'inv_separation_signed', lockMsg:'🔒 Finish the previous clue first',
       desc:'My own path.',
       clues:['Lucien accepts the outcome without protest, his carefully maintained public image left in ruins after his crimes are exposed.', 'Sally: "I will not remarry. I choose my own path from now on."'], rw:{xp:120000, gold:23800}},
      {id:'friends_stand', kind:'investigate', n:'Her Friends Stand by Her', icon:'🤝', ch:205, need:3, ambush:[], lo:70, needFlag:'inv_never_remarry', lockMsg:'🔒 Finish the previous clue first',
       desc:'You are free to be who you want to be now.',
       clues:['Devon: "You have shown courage, Sally. Your decision is respected."', 'Jade, Levi and Sky support her: "You are more than what you went through. This is a new beginning, Sally."'], rw:{xp:120500, gold:23900}},
      {id:'sally_peace', kind:'investigate', n:'A Sense of Peace', icon:'🕊️', ch:205, need:3, ambush:[], lo:70, needFlag:'inv_friends_stand', lockMsg:'🔒 Finish the previous clue first',
       desc:'No longer bound by a title.',
       clues:['For the first time in a long while, Sally feels a sense of peace. She is no longer bound by a title or a man\'s name.', '"I will build a life of my own, with the people I trust and the work that matters."'], rw:{xp:121000, gold:24000}},
      {id:'sally_returns', kind:'investigate', n:'Sally Returns to Dragonvale', icon:'🏯', ch:205, need:3, ambush:[], lo:70, needFlag:'inv_sally_peace', lockMsg:'🔒 Finish the previous clue first',
       desc:'As herself.',
       clues:['With the separation complete, Sally returns to Dragonvale as a free woman, no longer Lucien\'s wife but her own person.', 'Never again will she give up her name, her voice, or her future for the sake of a title or expectation.'], rw:{xp:121500, gold:24100}},
      {id:'fourth_found', kind:'investigate', n:'Adrian Finds a Fourth Entry', icon:'📕', ch:206, need:3, ambush:[], lo:70,
       desc:'Several years earlier.',
       clues:['While reviewing the archives in Dragonvale, Adrian spots an unusual entry in a regional Register from several years earlier.', 'It references the impossible Register entry: the fourth instance, in a different location and under a different name. Adrian: "...This cannot be another coincidence."'], rw:{xp:122000, gold:24200}},
      {id:'fourth_details', kind:'investigate', n:'Same Anomaly: Name, Seal, Hidden Isle', icon:'🔏', ch:206, need:3, ambush:[], lo:70, needFlag:'inv_fourth_found', lockMsg:'🔒 Finish the previous clue first',
       desc:'Same seal, same phrasing.',
       clues:['The details match the anomaly in the first three records: a name that should not exist, a seal that is not recognised, and a reference to the hidden isle.', 'Adrian: "Same seal... same phrasing... and a connection to the hidden isle." "It\'s not limited to one place... The anomaly is wider than we thought."'], rw:{xp:122500, gold:24300}},
      {id:'compare_four', kind:'investigate', n:'Compare All Four Records', icon:'🗂️', ch:206, need:3, ambush:[], lo:70, needFlag:'inv_fourth_details', lockMsg:'🔒 Finish the previous clue first',
       desc:'The same impossible entry.',
       clues:['The party compares all four records, confirming the same impossible entry, seal and hidden isle reference.', 'Levi: "This means someone has been using this entry across multiple locations. It\'s a pattern." Rin: "Four records... That\'s too many to be a mistake. Whoever did this has a purpose."'], rw:{xp:123000, gold:24400}},
      {id:'used_deliberately', kind:'investigate', n:'Used Deliberately, across the Realm', icon:'🌐', ch:206, need:3, ambush:[], lo:70, needFlag:'inv_compare_four', lockMsg:'🔒 Finish the previous clue first',
       desc:'Not an isolated case.',
       clues:['Devon: "If there are four, there could be more, perhaps hidden in other archives as well."', 'Jade: "This is not an isolated case. The Register entry is being used deliberately, and across the realm."'], rw:{xp:123500, gold:24500}},
      {id:'expand_search', kind:'investigate', n:'Expand the Search', icon:'🔎', ch:206, need:3, ambush:[], lo:70, needFlag:'inv_used_deliberately', lockMsg:'🔒 Finish the previous clue first',
       desc:'Before someone else does.',
       clues:['Adrian decides to expand the search, looking for other archives that might contain similar references: "I will contact my networks in the other regions. We need to find the next record before someone else does."', 'The discovery confirms that the anomaly is part of a larger, coordinated plan, and that the hidden isle is at the centre of it all.'], rw:{xp:124000, gold:24600}},
      {id:'meet_eve', kind:'investigate', n:'Meet Eve', icon:'🎩', ch:207, need:3, ambush:[], lo:70,
       desc:'A humble scholar passing through.',
       clues:['The party finally meets Eve, who is travelling in a male disguise to keep a low profile.', 'Eve: "You must be the Imperial Guard and her companions. I am a humble scholar passing through Dragonvale." Adrian: "...Eve? I did not expect to see you here."'], rw:{xp:124500, gold:24700}},
      {id:'eve_knowledge', kind:'investigate', n:'Eve\'s Knowledge', icon:'🧠', ch:207, need:3, ambush:[], lo:70, needFlag:'inv_meet_eve', lockMsg:'🔒 Finish the previous clue first',
       desc:'Far more than Adrian understood.',
       clues:['Eve demonstrates her deep knowledge of the archives, hidden networks and long-standing connections across different regions: "This register is only one thread. There are other records, in places most people have forgotten to look."', 'Jade: "You have done all of this, alone? You are far more capable than we were told."'], rw:{xp:125000, gold:24800}},
      {id:'eve_names', kind:'investigate', n:'The Same Names in Different Forms', icon:'📚', ch:207, need:3, ambush:[], lo:70, needFlag:'inv_eve_knowledge', lockMsg:'🔒 Finish the previous clue first',
       desc:'Decades.',
       clues:['Eve: "These records link back decades. The same names appear in different forms, across different places. It is not a coincidence."', '"The pattern is larger than any single incident. Someone has been using different names, different locations, and different facades, but the purpose remains the same."'], rw:{xp:125500, gold:24900}},
      {id:'eve_risks', kind:'investigate', n:'Why Eve Travels in Disguise', icon:'🎭', ch:207, need:3, ambush:[], lo:70, needFlag:'inv_eve_names', lockMsg:'🔒 Finish the previous clue first',
       desc:'Safer as a man.',
       clues:['Eve: "There are people who would silence me if they knew what I had found. For now, it is safer this way. As a man, I can move more freely and ask questions others would pass me."'], rw:{xp:126000, gold:25000}},
      {id:'work_with_eve', kind:'investigate', n:'Work with Eve', icon:'🤝', ch:207, need:3, ambush:[], lo:70, needFlag:'inv_eve_risks', lockMsg:'🔒 Finish the previous clue first',
       desc:'I choose my own path.',
       clues:['Jade: "Then we move forward together. Your knowledge fills the gaps we have been struggling to reach."', 'Eve: "I may travel under another name, but I choose my own path. There is still much to uncover. I intend to see it through, with you if you will have me."', 'Eve Gray is no longer just a name in a conversation, but an active ally in the journey ahead.'], rw:{xp:126500, gold:25100}},
      {id:'regroup', kind:'investigate', n:'Regroup with Adrian', icon:'📚', ch:208, need:3, ambush:[], lo:71,
       desc:'Compare with the royal archives.',
       clues:['In Dragonvale, the party regroups with Adrian to compare their findings with the royal archives.', 'Jade: "These contradictions keep appearing in different kingdoms. They are not isolated incidents."'], rw:{xp:127000, gold:25200}},
      {id:'side_by_side', kind:'investigate', n:'Compare Records Side by Side', icon:'🗂️', ch:208, need:3, ambush:[], lo:71, needFlag:'inv_regroup', lockMsg:'🔒 Finish the previous clue first',
       desc:'Events, names, locations, dates.',
       clues:['Jade examines the records side by side, events, names, locations and dates, and recognises the same pattern.', '"The dates are different, the names are different, but the purpose is the same."'], rw:{xp:127500, gold:25300}},
      {id:'alliance_link', kind:'investigate', n:'Link to the Ancient Alliance', icon:'🤝', ch:208, need:3, ambush:[], lo:71, needFlag:'inv_side_by_side', lockMsg:'🔒 Finish the previous clue first',
       desc:'Chapter 183.',
       clues:['The historical contradictions point towards the ancient alliance first revealed in Chapter 183, suggesting a long-running network that spans multiple kingdoms.', '"The same symbol. The same oath. Different kingdoms... but the same alliance."'], rw:{xp:128000, gold:25400}},
      {id:'dragonvale_erasures', kind:'investigate', n:'Erasures in Dragonvale\'s Archives', icon:'✂️', ch:208, need:3, ambush:[], lo:71, needFlag:'inv_alliance_link', lockMsg:'🔒 Finish the previous clue first',
       desc:'Conflicting versions.',
       clues:['Adrian: "Even in Dragonvale\'s archives, there are deliberate erasures and conflicting versions of the same events."', 'Devon: "They used different faces, different titles, and different places... but the pattern is consistent."'], rw:{xp:128500, gold:25500}},
      {id:'system_not_crime', kind:'investigate', n:'A System, Not One Crime', icon:'⚙️', ch:208, need:3, ambush:[], lo:71, needFlag:'inv_dragonvale_erasures', lockMsg:'🔒 Finish the previous clue first',
       desc:'Built to last.',
       clues:['Sky: "It is a system. Not a single person\'s crime. They built it to last, across kingdoms and generations."', 'Levi: "Different kingdoms. Different people. But the same methods, the same goals... and the same victims."'], rw:{xp:129000, gold:25600}},
      {id:'map_network', kind:'investigate', n:'Map the Network', icon:'🗺️', ch:208, need:3, ambush:[], lo:71, needFlag:'inv_system_not_crime', lockMsg:'🔒 Finish the previous clue first',
       desc:'No longer just reacting.',
       clues:['The evidence from multiple kingdoms points to a coordinated network, with shared symbols, allied houses and hidden records.', '"We need to find all the missing pieces... This is bigger than we thought. But we are no longer just reacting. We are mapping the whole network."'], rw:{xp:129500, gold:25700}},
      {id:'name_appears', kind:'investigate', n:'The Name Appears Again', icon:'🔁', ch:209, need:3, ambush:[], lo:71,
       desc:'Different descriptions.',
       clues:['The party compares the Register entry with records from different kingdoms and archives. The same name appears again, but the descriptions are different in each place.', 'The dates, the locations and even the titles do not match a single person or creature; yet the core name, or something close to it, keeps appearing.'], rw:{xp:130000, gold:25800}},
      {id:'creature_title_place', kind:'investigate', n:'Creature, Title, Place or Role', icon:'🎭', ch:209, need:3, ambush:[], lo:71, needFlag:'inv_name_appears', lockMsg:'🔒 Finish the previous clue first',
       desc:'It changes form.',
       clues:['Some records treat the name as a creature or entity. Others describe it as a title, a place, or even a role passed between people across generations.', 'Jade: "It changes form, meaning and context... But it is always connected to the same core."'], rw:{xp:130500, gold:25900}},
      {id:'overlay_maps', kind:'investigate', n:'Overlay the Maps', icon:'🗺️', ch:209, need:3, ambush:[], lo:71, needFlag:'inv_creature_title_place', lockMsg:'🔒 Finish the previous clue first',
       desc:'A wide network.',
       clues:['Jade overlays maps from Tribute, Dragonvale and other kingdoms (the North Kingdom, the Western Isles, the Southern Ports, the Eastern Coast). The sightings and incidents form a wide network.'], rw:{xp:131000, gold:26000}},
      {id:'not_one_being', kind:'investigate', n:'Not One Being', icon:'🕸️', ch:209, need:3, ambush:[], lo:71, needFlag:'inv_overlay_maps', lockMsg:'🔒 Finish the previous clue first',
       desc:'Only the faces change.',
       clues:['Levi: "If it were a single creature, its nature and appearance would be consistent. But the records describe different forms, different roles, and different effects."', 'Sky: "The methods are the same, only the faces change. It behaves like a network, not a single being."'], rw:{xp:131500, gold:26100}},
      {id:'name_framework', kind:'investigate', n:'A Name That Moves', icon:'🧬', ch:209, need:3, ambush:[], lo:71, needFlag:'inv_not_one_being', lockMsg:'🔒 Finish the previous clue first',
       desc:'Passed on.',
       clues:['Adrian: "In some records, it is a person. In others, a place. In others, a title. It may be a name that is used, inherited, or passed on... rather than one fixed identity."', '"It could be a title, a role, or a function. Something that survives by changing how it appears."'], rw:{xp:132000, gold:26200}},
      {id:'follow_pattern', kind:'investigate', n:'Follow the Pattern', icon:'🧭', ch:209, need:3, ambush:[], lo:71, needFlag:'inv_name_framework', lockMsg:'🔒 Finish the previous clue first',
       desc:'The next step.',
       clues:['Devon: "It leaves traces behind, then moves elsewhere, taking a different form."', 'Jade: "The name is not a single creature or person. It is a pattern, and understanding that pattern is the next step."', 'To uncover the truth they will need to follow the pattern further, beyond Dragonvale, and across the kingdoms it touches.'], rw:{xp:132500, gold:26300}},
      {id:'all_evidence', kind:'investigate', n:'All the Evidence Points the Same Way', icon:'📕', ch:210, need:3, ambush:[], lo:71,
       desc:'Not limited to the Fifteen.',
       clues:['Jade: "All the evidence points to the same conclusion. The Register is not limited to the Fifteen."'], rw:{xp:133000, gold:26400}},
      {id:'fifteen_framework', kind:'investigate', n:'The Traditional Fifteen Framework', icon:'🗂️', ch:210, need:3, ambush:[], lo:71, needFlag:'inv_all_evidence', lockMsg:'🔒 Finish the previous clue first',
       desc:'Fifteen categories.',
       clues:['The Traditional Fifteen Framework: Celestial, Abyssal, Infernal, Bestial, Fae, Elemental, Undead, Spiritual, Construct, Aetherial, Vile, Blessed, Human, Draconic and Unknown.', '"We initially assumed the Fifteen covered all known beings."'], rw:{xp:133500, gold:26500}},
      {id:'beyond_entries', kind:'investigate', n:'Entries That Fit None of the Fifteen', icon:'❔', ch:210, need:3, ambush:[], lo:71, needFlag:'inv_fifteen_framework', lockMsg:'🔒 Finish the previous clue first',
       desc:'Different patterns, symbols and behaviours.',
       clues:['The Register contains entries that do not fit any of the Fifteen categories. "These anomalies show different patterns, symbols and behaviours."', 'Sky: "Different places. Different times. Different victims. But the same kind of anomaly, outside the Fifteen."'], rw:{xp:134000, gold:26600}},
      {id:'overlay_anomalies', kind:'investigate', n:'Overlay the Anomalies', icon:'🗺️', ch:210, need:3, ambush:[], lo:71, needFlag:'inv_beyond_entries', lockMsg:'🔒 Finish the previous clue first',
       desc:'A repeating sequence.',
       clues:['When the records from Tribute, Dragonvale and other kingdoms are overlaid, a clear pattern of anomalies appears across regions, connected through similar symbols, shared effects and a repeating sequence in the Register.', '"They are not random incidents, but part of a larger, ongoing record."'], rw:{xp:134500, gold:26700}},
      {id:'next_phase', kind:'investigate', n:'The Next Phase of the Investigation', icon:'🧭', ch:210, need:3, ambush:[], lo:71, needFlag:'inv_overlay_anomalies', lockMsg:'🔒 Finish the previous clue first',
       desc:'Source, purpose, links, effects.',
       clues:['Uncover the source of these beyond-Fifteen entries. Identify the purpose behind the Register. Find the links between past and present anomalies. Determine how this affects Tribute and other kingdoms.', 'Devon: "If the Register can record beyond the Fifteen, there may be many more anomalies we have not encountered."'], rw:{xp:135000, gold:26800}},
      {id:'arc_closes', kind:'investigate', n:'Arc VIII Closes', icon:'🌅', ch:210, need:3, ambush:[], lo:71, needFlag:'inv_next_phase', lockMsg:'🔒 Finish the previous clue first',
       desc:'A new path.',
       clues:['Sky: "This is only the beginning. The Register has shown us a larger world, one that reaches beyond the systems we were taught."', 'Arc VIII closes not with an answer, but with a new path. The investigation continues...'], rw:{xp:135500, gold:26900}},
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
  black_tide_waters:{ n:'The Forbidden Waters', region:'dragon', kind:'hub', icon:'🌊', unlock:{ch:171},
    desc:'The forbidden sea route out of Dragonvale: a sea as calm as dark glass that turns black after sunset, where ships vanish without a trace. (The title card of ch171 calls it the Forbidden Sea Route.)',
    spots:[
      {id:'sea_calm', kind:'investigate', n:'The Forbidden Waters', icon:'🌫️', ch:172, need:3, ambush:[], lo:57,
       desc:'A calm like dark glass.',
       clues:['The expedition ship leaves the last known routes of Dragonvale and enters forbidden waters. The sea is strangely calm, its surface like dark glass, and an unnatural stillness fills the air.', 'After sunset the sea begins to change. Black water spreads across the surface like a living corruption.', 'From its depths, something begins to rise.'], rw:{xp:48000, gold:9200}},
      {id:'tide_retreat', kind:'investigate', n:'Track the Black Tide\'s Retreat', icon:'🌑', ch:172, need:3, ambush:[], lo:57, needFlag:'inv_sea_calm', lockMsg:'🔒 Finish the previous clue first',
       desc:'It went down, not away.',
       clues:['The corrupted creatures were forced back, and the Black Tide slowly retreated into the depths. It had not been defeated, only driven away for now.', 'As the darkness faded, it disappeared beneath the waves, leaving behind an uneasy silence. Something in the deep was calling to it.', 'Far beneath the surface, something ancient stirs. The Black Tide was only the first manifestation: its source lies deeper still.'], rw:{xp:48500, gold:9300}},
      {id:'black_water_hunt', kind:'hunt', n:'The Black Water', icon:'🌊', ch:172, desc:'Corrupted creatures that swim in the black water.', pool:['tide_horror','drowned_shade','storm_wisp'], elite:'tide_horror', lo:57}]},
  sunken_kingdom:{ n:'The Sunken Kingdom', region:'dragon', kind:'hub', icon:'🏙️', unlock:{ch:172},
    desc:'A whole kingdom beneath the sea, kept whole by enormous magical barriers: roads, markets, schools, temples and a drowned royal palace. A chart names the territory Aelyndra.',
    spots:[
      {id:'uw_passage', kind:'investigate', n:'Discover the Underwater Passage', icon:'🕳️', ch:173, need:3, ambush:[], lo:58,
       desc:'Led by the pearl.',
       clues:['After the Black Tide retreats, Devon\'s Black Dragon Pearl guides the expedition toward a submerged passage beneath the sea.', 'The pearl\'s resonance leads them through an ancient underwater route, where massive magical structures maintain breathable spaces beneath the ocean.', 'Jade: "The pearl is leading us somewhere."'], rw:{xp:49000, gold:9400}},
      {id:'restoration_chambers', kind:'investigate', n:'Activate Ancient Restoration Chambers', icon:'⚙️', ch:173, need:3, ambush:['relic_spirit'], lo:58, needFlag:'inv_uw_passage', lockMsg:'🔒 Finish the previous clue first',
       desc:'Anchors that still hold.',
       clues:['They discover ancient restoration chambers that connect different parts of the drowned territory.', 'Sky: "These chambers are restoration anchors. They\'re still trying to preserve this place."', 'Jade: "Then we restore what we can and move forward."'], rw:{xp:49500, gold:9500}},
      {id:'submerged_ruins', kind:'investigate', n:'Explore the Submerged Ruins', icon:'🏚️', ch:173, need:3, ambush:['drowned_shade'], lo:58, needFlag:'inv_restoration_chambers', lockMsg:'🔒 Finish the previous clue first',
       desc:'Air beneath the ocean.',
       clues:['Many of the structures are deteriorating, but the magical barriers still hold, creating air-filled spaces while the ocean presses against them.', '"The barriers are old... but still holding."', 'The restoration chambers form a vast network of passages linking the different districts of the submerged kingdom.'], rw:{xp:50000, gold:9600}},
      {id:'sealed_districts', kind:'investigate', n:'Restore Access to Sealed Districts', icon:'🔓', ch:173, need:3, ambush:[], lo:58, needFlag:'inv_submerged_ruins', lockMsg:'🔒 Finish the previous clue first',
       desc:'Corridors between districts.',
       clues:['"These corridors connect multiple districts."', 'Restoring a chamber reopens the passages it anchors, one district at a time.', 'Beyond the first chamber, a greater sight awaits.'], rw:{xp:50500, gold:9700}},
      {id:'outer_city', kind:'investigate', n:'Reach the Sunken Kingdom\'s Outer City', icon:'🏙️', ch:173, need:3, ambush:[], lo:58, needFlag:'inv_sealed_districts', lockMsg:'🔒 Finish the previous clue first',
       desc:'A kingdom, waiting.',
       clues:['An entire kingdom lies beneath the sea: roads, towers, marketplaces, temples and royal buildings preserved within enormous magical barriers.', 'Jade: "An entire kingdom..." Devon: "And it has been waiting beneath the sea all this time."', 'The Sunken Kingdom survived in silence, almost untouched by time, yet eerily empty except for the distant movement of the sea.'], rw:{xp:51000, gold:9800}},
      {id:'explore_city', kind:'investigate', n:'Explore the Preserved City', icon:'🏘️', ch:174, need:3, ambush:[], lo:59,
       desc:'A city that had truly lived.',
       clues:['A vast and magnificent city, still preserved beneath the waves inside ancient magical barriers: homes, schools, workshops, markets and temples, a thriving civilization frozen in time.', 'This was no cursed wasteland, but a kingdom that had truly lived.', 'Preserved homes, furnished just as their inhabitants had left them; schools where children once studied, their desks and scrolls still in place.'], rw:{xp:51500, gold:9900}},
      {id:'inscriptions', kind:'investigate', n:'Examine Ancient Inscriptions', icon:'🏺', ch:174, need:3, ambush:['shade_wraith'], lo:59, needFlag:'inv_explore_city', lockMsg:'🔒 Finish the previous clue first',
       desc:'The Dima and Xima crisis.',
       clues:['"These inscriptions mention the Dima crisis... the Xima invasion. The records say the royal council made a decision to deliberately submerge portions of the kingdom."', 'Sky: "These barriers have kept everything intact. It\'s as if they expected the city to remain hidden beneath the sea for a very long time."', 'Ancient murals depict the royal council invoking powerful magic to lower the city beneath the sea, sealing it away during the Dima/Xima crisis.'], rw:{xp:52000, gold:10000}},
      {id:'final_days', kind:'investigate', n:'Investigate the Kingdom\'s Final Days', icon:'📜', ch:174, need:3, ambush:[], lo:59, needFlag:'inv_inscriptions', lockMsg:'🔒 Finish the previous clue first',
       desc:'A planned act.',
       clues:['"This wasn\'t abandonment. It was a deliberate preservation measure. They chose the sea to protect something of immense importance."', 'The inscriptions clearly show it was a planned act: not a collapse, not a natural disaster, but a choice.', 'They submerged parts of their kingdom to protect something vital.'], rw:{xp:52500, gold:10100}},
      {id:'deliberate_sub', kind:'investigate', n:'Discover Evidence of Deliberate Submersion', icon:'🌊', ch:174, need:3, ambush:[], lo:59, needFlag:'inv_final_days', lockMsg:'🔒 Finish the previous clue first',
       desc:'A choice, not a disaster.',
       clues:['"So much history portrayed this kingdom as a tragic ruin, a victim of the sea... but now it seems the truth is far more complex."', '"Maybe this wasn\'t the end of a kingdom... but an emergency measure to preserve something for the future."', '"What could have been so important that they were willing to submerge their own homes, their cities, and their way of life?"'], rw:{xp:53000, gold:10200}},
      {id:'missing_records', kind:'investigate', n:'Identify the Missing Historical Records', icon:'🗂️', ch:174, need:3, ambush:[], lo:59, needFlag:'inv_deliberate_sub', lockMsg:'🔒 Finish the previous clue first',
       desc:'The records end.',
       clues:['"But what exactly were they trying to protect?" The records end here. They do not say what it was, or why it had to be hidden beneath the sea.', '"And why are the records incomplete?"', '"There are still so many unanswered questions. Whatever they protected... it remains a mystery to this day."'], rw:{xp:53500, gold:10300}},
      {id:'maris_meet', kind:'investigate', n:'Meet Maris Aurel', icon:'🧜', ch:175, need:3, ambush:[], lo:60,
       desc:'Someone who never stopped searching.',
       clues:['The party reaches an ancient archive where surviving records have been guarded in secret for generations.', 'Maris Aurel, Tide Archivist: "Outsiders should not be walking these archives. Dragonvale\'s court erased enough already. I will not let royal hands take what remains."', 'Maris: "That pearl... where did you get it?"'], rw:{xp:54000, gold:10400}},
      {id:'deep_archives', kind:'investigate', n:'Investigate the Deep Archives', icon:'📚', ch:175, need:3, ambush:[], lo:60, needFlag:'inv_maris_meet', lockMsg:'🔒 Finish the previous clue first',
       desc:'Memory kept in secret.',
       clues:['Maris has preserved fragments of the Sunken Kingdom\'s history in secret, determined that her ancestors would not vanish from memory.', 'Maris: "My goal is to restore the historical identity of my ancestors."', 'Jade: "You know this place. Help us understand what the sea was protecting."'], rw:{xp:54500, gold:10500}},
      {id:'restoration_network', kind:'investigate', n:'Learn About the Ancient Restoration Network', icon:'🕸️', ch:175, need:3, ambush:[], lo:60, needFlag:'inv_deep_archives', lockMsg:'🔒 Finish the previous clue first',
       desc:'The old system answers.',
       clues:['Maris: "This is no ornament. It is one of the restoration keys."', '"It was developed before Dragonvale\'s current royal dynasty. The Black Dragon Pearl can activate parts of the Sunken Kingdom\'s preservation network."', 'Sky: "Its energy matches the preservation network." Maris: "Then the old system can still answer."'], rw:{xp:55000, gold:10600}},
      {id:'pearl_origin', kind:'investigate', n:'Discover the Dragon Pearl\'s Original Purpose', icon:'🔮', ch:175, need:3, ambush:[], lo:60, needFlag:'inv_restoration_network', lockMsg:'🔒 Finish the previous clue first',
       desc:'A key, not an ornament.',
       clues:['The Black Dragon Pearl serves as a key, resonating with ancient anchors throughout the kingdom...', '...activating the preservation network that maintained the underwater city and its records.', 'Maris: "Very well. I will guide you, but the truth you seek was buried on purpose."'], rw:{xp:55500, gold:10700}},
      {id:'restricted_chambers', kind:'investigate', n:'Gain Access to Restricted Historical Chambers', icon:'🚪', ch:175, need:3, ambush:[], lo:60, needFlag:'inv_pearl_origin', lockMsg:'🔒 Finish the previous clue first',
       desc:'The deeper records.',
       clues:['With the Tide Archivist as their guide, the party gains access to the deeper records of the drowned realm.', 'Maris leads them past the sealed doors of the archive.', 'The deeper records are guarded: she will show them, but she will not let royal hands take what remains.'], rw:{xp:56000, gold:10800}},
      {id:'restoration_chamber', kind:'investigate', n:'Examine the Restoration Chamber', icon:'⚗️', ch:176, need:3, ambush:[], lo:61,
       desc:'Systems to mend damaged souls.',
       clues:['Maris leads the party to a chamber housing ancient restoration mechanisms: forgotten systems designed to preserve life and mend damaged souls.', 'Maris: "This chamber contains ancient restoration mechanisms. The Black Dragon Pearl is not a weapon or a mere royal jewel. It is a restoration anchor."', 'Devon: "A restoration anchor... I never knew this was its true purpose."'], rw:{xp:56500, gold:10900}},
      {id:'pearl_function', kind:'investigate', n:'Discover the Dragon Pearl\'s Original Function', icon:'⚪', ch:176, need:3, ambush:[], lo:61, needFlag:'inv_restoration_chamber', lockMsg:'🔒 Finish the previous clue first',
       desc:'Buying time for the soul.',
       clues:['The pearl serves as a restoration anchor, preserving damaged life force long enough for spiritual recovery to occur.', 'Its effectiveness depends on the condition of the individual and the presence of compatible restoration magic.', 'Jade: "So it preserves life... but it cannot bring back someone who is truly dead." Maris: "It cannot resurrect someone whose life force has completely disappeared."'], rw:{xp:57000, gold:11000}},
      {id:'pendant_link', kind:'investigate', n:'Investigate Its Connection to Yvette\'s Jade Pendant', icon:'🟢', ch:176, need:3, ambush:[], lo:61, needFlag:'inv_pearl_function', lockMsg:'🔒 Finish the previous clue first',
       desc:'Two traditions, one cure.',
       clues:['Sky\'s survival was not an arbitrary miracle. Yvette\'s jade pendant began restoring his damaged spiritual system, while the Black Dragon Pearl stabilized and completed the process.', 'Two ancient restoration traditions worked together.', 'Sky: "The jade pendant and the pearl were compatible... Their restoration magic resonated, allowing my life force to stabilize and heal."'], rw:{xp:57500, gold:11100}},
      {id:'sky_restored', kind:'investigate', n:'Understand Sky\'s Restored Life Force', icon:'💙', ch:176, need:3, ambush:[], lo:61, needFlag:'inv_pendant_link', lockMsg:'🔒 Finish the previous clue first',
       desc:'Not a miracle.',
       clues:['Sky: "It wasn\'t a miracle. It was the result of forgotten restoration mechanisms working together."', 'Devon: "My family inherited an artifact of immense significance... yet its true purpose was forgotten. We carried it for generations without fully understanding what it was."', 'Levi: "The lost wisdom of the Sunken Kingdom still has so much to teach us."'], rw:{xp:58000, gold:11200}},
      {id:'approach_palace', kind:'investigate', n:'Approach the Submerged Royal Palace', icon:'🏰', ch:177, need:3, ambush:['relic_spirit'], lo:62,
       desc:'A forgotten throne.',
       clues:['The party approaches the drowned royal palace, where the silence of the sea gives way to the authority of a forgotten throne.', 'Jade: "The palace... something has awakened."', 'Devon: "That crown... it isn\'t just a symbol. It\'s the presence itself."'], rw:{xp:58500, gold:11300}},
      {id:'drowned_crown_meet', kind:'investigate', n:'Encounter the Drowned Crown', icon:'👑', ch:177, need:3, ambush:[], lo:62, needFlag:'inv_approach_palace', lockMsg:'🔒 Finish the previous clue first',
       desc:'A royal will beneath the waves.',
       clues:['Sky: "I can feel an overwhelming royal presence... so many voices, layered together through time."', 'Maris: "Dragonvale called it a cursed monarch, but that was never the whole truth!"', 'Jade: "The Drowned Crown... this is one of the Fifteen?"'], rw:{xp:59000, gold:11400}},
      {id:'crown_warnings', kind:'investigate', n:'Investigate the Crown\'s Warnings', icon:'⚠️', ch:177, need:3, ambush:[], lo:62, needFlag:'inv_drowned_crown_meet', lockMsg:'🔒 Finish the previous clue first',
       desc:'Voices of the kings and queens.',
       clues:['A voice: "Leave this place. The sea remembers what the land chose to forget."', '"This realm is not yours. Turn back, living ones. Disturb not what still rests beneath our care."', 'Levi: "Listen... There are voices... the kings and queens of this kingdom. They\'re still here."'], rw:{xp:59500, gold:11500}},
      {id:'crown_hostile', kind:'investigate', n:'Determine Whether the Entity Is Genuinely Hostile', icon:'⚖️', ch:177, need:3, ambush:[], lo:62, needFlag:'inv_crown_warnings', lockMsg:'🔒 Finish the previous clue first',
       desc:'A warning, not a hunt.',
       clues:['"It\'s warning us... not hunting us. It\'s defending something."', '"This isn\'t just an attack. It\'s a protection. There must be something here worth keeping safe."', 'When the warning was ignored, the palace answered with the blades of its dead guardians.'], rw:{xp:60000, gold:11600}},
      {id:'roc_records', kind:'investigate', n:'Investigate Roc\'s Ancestral Records', icon:'📜', ch:178, need:3, ambush:[], lo:63,
       desc:'A house tied to the drowned realm.',
       clues:['Deep within the preserved archives, the party uncovers documents that link Roc\'s bloodline to the kingdom\'s fate: records kept hidden for generations.', 'Maris: "These records tie your house to the drowned realm. After the kingdom\'s submersion, your ancestors were granted maritime authority over these waters."', 'A decree formally transferred maritime jurisdiction to his bloodline, along with the duty to protect what remained of the Sunken Kingdom.'], rw:{xp:60500, gold:11700}},
      {id:'maritime_authority', kind:'investigate', n:'Discover Dragonvale\'s Inherited Maritime Authority', icon:'⚓', ch:178, need:3, ambush:[], lo:63, needFlag:'inv_roc_records', lockMsg:'🔒 Finish the previous clue first',
       desc:'A privilege with a duty.',
       clues:['Roc: "...So my family profited from a kingdom that vanished?"', 'Maris: "Your family gained wealth, trade rights, and influence through this maritime authority. It was a real benefit. And with those benefits came a duty, one that was not upheld by later generations."', 'Some of his ancestors worked to protect the surviving descendants and preserve what remained.'], rw:{xp:61000, gold:11800}},
      {id:'suppression_history', kind:'investigate', n:'Examine the Suppression of Sunken Kingdom History', icon:'🗃️', ch:178, need:3, ambush:[], lo:63, needFlag:'inv_maritime_authority', lockMsg:'🔒 Finish the previous clue first',
       desc:'Erased to avoid conflict.',
       clues:['Others chose to suppress the kingdom\'s existence, to avoid political disputes over territory, authority and inheritance.', 'Generations later, the true purpose was forgotten: the privileges remained, but the responsibilities were neglected.', 'Evidence suggests the existence of the Sunken Kingdom was deliberately erased from many records to prevent conflict with other kingdoms.'], rw:{xp:61500, gold:11900}},
      {id:'political_consequences', kind:'investigate', n:'Confront the Political Consequences', icon:'🏛️', ch:178, need:3, ambush:[], lo:63, needFlag:'inv_suppression_history', lockMsg:'🔒 Finish the previous clue first',
       desc:'Absorbed into other realms.',
       clues:['The fate of the Sunken Kingdom became entwined with Dragonvale\'s inheritance, a connection that shaped centuries of maritime power, political alliances and buried truths.', 'The kingdom\'s people, lands and legacy were not simply lost: they were absorbed into the histories, privileges and silences of other realms.', '"There is still so much we do not know. We must trace the full history and learn what responsibilities remain."'], rw:{xp:62000, gold:12000}},
      {id:'crown_origin', kind:'investigate', n:'Investigate the Crown\'s Origin', icon:'👑', ch:179, need:3, ambush:[], lo:64,
       desc:'Not a king\'s ghost.',
       clues:['It was not the spirit of a single monarch, but a collective magical construct created by the royal council.', 'Jade: "So it isn\'t a king\'s ghost... but the royal council\'s final command."', 'Maris: "The Crown\'s rigid interpretation of its command has prevented even the descendants of the Sunken Kingdom from reclaiming their heritage."'], rw:{xp:62500, gold:12100}},
      {id:'council_command', kind:'investigate', n:'Discover the Royal Council\'s Final Command', icon:'📜', ch:179, need:3, ambush:[], lo:64, needFlag:'inv_crown_origin', lockMsg:'🔒 Finish the previous clue first',
       desc:'A command, not a curse.',
       clues:['The Crown holds the final memories, authority and judgments of the Sunken Kingdom\'s rulers, and speaks with many voices, not one.', 'Devon: "It was never meant to conquer or destroy. It exists to enforce an ancient command."', 'Later historians classified it among the Fifteen Evils because they did not understand its true purpose.'], rw:{xp:63000, gold:12200}},
      {id:'crown_memories', kind:'investigate', n:'Examine the Crown\'s Preserved Memories', icon:'🔮', ch:179, need:3, ambush:[], lo:64, needFlag:'inv_council_command', lockMsg:'🔒 Finish the previous clue first',
       desc:'Their fears and decisions.',
       clues:['Devon, holding the pearl: "These are their final memories."', 'Sky: "So many voices... Their fears, their decisions, the weight of what they had to do."', 'Roc: "It follows an ancient command without considering what has changed in the present."'], rw:{xp:63500, gold:12300}},
      {id:'deepest_chamber', kind:'investigate', n:'Identify the Purpose of the Deepest Chamber', icon:'🚪', ch:179, need:3, ambush:[], lo:64, needFlag:'inv_crown_memories', lockMsg:'🔒 Finish the previous clue first',
       desc:'What it protects.',
       clues:['The Crown was created during the ancient crisis to prevent outsiders from accessing the deepest preservation chamber without understanding why the kingdom had submerged itself.', 'Levi: "Its purpose may have been justified..." Jade: "...but its methods have become harmful."', 'The Crown guards more than a place: it protects the reason for the kingdom\'s disappearance, a truth the world was not ready to understand.'], rw:{xp:64000, gold:12400}},
      {id:'trial_prep', kind:'investigate', n:'Prepare for the Trial of the Drowned Court', icon:'⚖️', ch:179, need:3, ambush:[], lo:64, needFlag:'inv_deepest_chamber', lockMsg:'🔒 Finish the previous clue first',
       desc:'The court awaits.',
       clues:['To reach the deepest chamber, the party must understand the council\'s final command and why the kingdom chose to submerge itself.', 'Jade: "To move forward, we need to learn the truth. Then we must face what remains: the Trial of the Drowned Court."'], rw:{xp:64500, gold:12500}},
      {id:'enter_court', kind:'investigate', n:'Enter the Drowned Court', icon:'🏛️', ch:180, need:3, ambush:['spectral_guardian'], lo:65,
       desc:'The council\'s final judgment.',
       clues:['Jade, Devon and Roc enter the deepest chamber of the Sunken Kingdom, where the royal council\'s final judgment still resonates.', 'Ancient guardians and echoes of the royal council await them. Their trials are not battles, but questions.', 'Jade: "These are the questions the royal council faced... and the choices they believed they had to make."'], rw:{xp:65000, gold:12600}},
      {id:'trials_duty', kind:'investigate', n:'Complete the Trials of Duty and Rulership', icon:'⚖️', ch:180, need:3, ambush:[], lo:65, needFlag:'inv_enter_court', lockMsg:'🔒 Finish the previous clue first',
       desc:'Three questions.',
       clues:['Trial One, Duty: "What will you protect when everything is at risk?" Devon: "A ruler must sometimes make difficult choices. But duty should never become cruelty."', 'Trial Two, Sacrifice: "Is one kingdom\'s destruction justified if it ensures another\'s survival?" Sky: "The past believed there was no other way..."', 'Trial Three, Rulership: "When two kingdoms cannot both survive, which one will you choose?" Roc: "Inherited power comes with consequences. But must we repeat the same sacrifices as our ancestors?"'], rw:{xp:65500, gold:12700}},
      {id:'sacrifice_mechanism', kind:'investigate', n:'Investigate the Ancient Sacrifice Mechanism', icon:'⚙️', ch:180, need:3, ambush:[], lo:65, needFlag:'inv_trials_duty', lockMsg:'🔒 Finish the previous clue first',
       desc:'Limits that no longer apply.',
       clues:['Jade investigates the ancient magical mechanisms behind the Crown\'s choice.', 'She discovers that the council\'s preservation system was designed around limitations that no longer necessarily apply.', 'Roc: "The council chose to submerge the kingdom to protect something more important than territory. It wasn\'t an end... but a safeguard for the future."'], rw:{xp:66000, gold:12800}},
      {id:'alternative_solution', kind:'investigate', n:'Discover an Alternative Solution', icon:'💡', ch:180, need:3, ambush:[], lo:65, needFlag:'inv_sacrifice_mechanism', lockMsg:'🔒 Finish the previous clue first',
       desc:'Both kingdoms.',
       clues:['Sky: "Devon\'s pearl and Sky\'s restoration show that different magical traditions can work together. Perhaps the council never considered a solution like this."', 'Jade: "The original command can still be fulfilled. But it does not require more sacrifices. We can preserve both kingdoms."'], rw:{xp:66500, gold:12900}},
      {id:'crown_recognition', kind:'investigate', n:'Gain the Drowned Crown\'s Recognition', icon:'👑', ch:180, need:3, ambush:[], lo:65, needFlag:'inv_alternative_solution', lockMsg:'🔒 Finish the previous clue first',
       desc:'A different path.',
       clues:['"...For the first time in centuries, the Crown recognizes a different path. Its command can be fulfilled without repeating the tragedies of the past."', 'The Drowned Crown acknowledged Jade\'s solution. The trials had not been tests to find a winner, but to determine whether the present generation could understand the truth the royal council had tried to protect.', 'Major Story Decision: Reject the false choice between sacrificing two kingdoms. For the first time in centuries, the possibility of change was permitted.'], rw:{xp:67000, gold:13000}},
      {id:'defend_ships', kind:'investigate', n:'Defend the Expedition Ships', icon:'⚓', ch:181, need:3, ambush:['tide_horror'], lo:65,
       desc:'The surge above.',
       clues:['Roc: "Hold the line above! Keep the vessels away from the black surge!"', 'The entity, a vast convergence of corrupted water and fractured memory, attacks both the expedition ships above and the submerged ruins below.'], rw:{xp:67500, gold:13100}},
      {id:'protect_chambers', kind:'investigate', n:'Protect the Underwater Restoration Chambers', icon:'🛡️', ch:181, need:3, ambush:['drowned_shade'], lo:65, needFlag:'inv_defend_ships', lockMsg:'🔒 Finish the previous clue first',
       desc:'Hold the chambers.',
       clues:['Levi: "Rin, left passage! Don\'t let them through!" Rin: "On it! I\'ll keep the creatures off the supports!"', 'Seraphina: "I\'ll protect the chamber. Go: stop the central mass!"', 'Jade: "Defensive positions! Protect the chambers and the ships above!"'], rw:{xp:68000, gold:13200}},
      {id:'tide_layered', kind:'investigate', n:'Learn What Lies Beneath the Corruption', icon:'🌊', ch:181, need:3, ambush:['tide_horror'], lo:65, needFlag:'inv_protect_chambers', lockMsg:'🔒 Finish the previous clue first',
       desc:'Not born evil.',
       clues:['Sky: "This corruption is layered over something older... The Tide wasn\'t born evil. It\'s a natural spiritual force that has been twisted by centuries of accumulated magical damage."', 'It had once been a guardian current, part of the kingdom\'s natural balance. The corruption was a result of the kingdom\'s wounds, never its true nature.', 'Roc: "Destruction may not be the only answer. If we can reach the truth, there may be a way to restore it."'], rw:{xp:68500, gold:13300}},
      {id:'stabilize_network', kind:'investigate', n:'Stabilize the Preservation Network', icon:'🔮', ch:181, need:3, ambush:[], lo:65, needFlag:'inv_tide_layered', lockMsg:'🔒 Finish the previous clue first',
       desc:'The barriers hold.',
       clues:['Devon: "The Pearl is resonating with the barriers... I can stabilize them for now!"', 'Devon: "Jade, together!" Jade: "Then we end the corruption... not the truth beneath it."'], rw:{xp:69000, gold:13400}},
      {id:'tide_origin', kind:'investigate', n:'Identify the Black Tide\'s Original Nature', icon:'🐋', ch:182, need:3, ambush:[], lo:66,
       desc:'A guardian, twisted.',
       clues:['Its true nature slowly emerged: a natural spiritual guardian that had been twisted by centuries of accumulated magical damage.', 'The corruption that had endured for centuries began to fracture as the restoration ritual was prepared, linking the Dragon Pearl, the ancient anchors and the kingdom\'s preservation network.'], rw:{xp:69500, gold:13500}},
      {id:'protect_sky', kind:'investigate', n:'Protect Sky During the Restoration', icon:'💙', ch:182, need:3, ambush:[], lo:66, needFlag:'inv_tide_origin', lockMsg:'🔒 Finish the previous clue first',
       desc:'Hold the ritual.',
       clues:['Sky channeled restorative energy through the ancient network, guiding the Black Tide back to its original spiritual nature.', 'Jade led the defense, protecting the ritual from the remaining corrupted creatures as the restoration took hold.'], rw:{xp:70000, gold:13600}},
      {id:'activate_pearl', kind:'investigate', n:'Activate the Dragon Pearl', icon:'🔮', ch:182, need:3, ambush:[], lo:66, needFlag:'inv_protect_sky', lockMsg:'🔒 Finish the previous clue first',
       desc:'The pearl wakes.',
       clues:['Devon activated the Dragon Pearl, awakening its connection to the preservation network.', 'The Black Tide returned once more, sweeping through the submerged city. But this time they did not come to fight: they came to restore what had been lost.'], rw:{xp:70500, gold:13700}},
      {id:'purify_waters', kind:'investigate', n:'Purify the Corrupted Waters', icon:'🌊', ch:182, need:3, ambush:[], lo:66, needFlag:'inv_activate_pearl', lockMsg:'🔒 Finish the previous clue first',
       desc:'The sea is calm.',
       clues:['The corrupted marine creatures gradually returned to their original forms or dispersed, and the unnatural darkness began disappearing from the sea.', 'For the first time in generations, the waters surrounding the Sunken Kingdom became calm. Sky: "It was always meant to be protected... not destroyed."'], rw:{xp:71000, gold:13800}},
      {id:'update_register_182', kind:'investigate', n:'Update the Fifteen Register', icon:'📕', ch:182, need:3, ambush:[], lo:66, needFlag:'inv_purify_waters', lockMsg:'🔒 Finish the previous clue first',
       desc:'Five resolved.',
       clues:['Jade updates the Fifteen Register: Black Tide, Restored. Drowned Crown, Reclassified as Preservation Construct.', 'Fifteen Register Progress: 5/15 Cases Resolved.', 'Its restoration proves that not every entity recorded as an Evil was born a monster.'], rw:{xp:71500, gold:13900}},
      {id:'enter_archive', kind:'investigate', n:'Enter the Deepest Archive', icon:'📚', ch:183, need:3, ambush:[], lo:66,
       desc:'Sealed for centuries.',
       clues:['With the Black Tide restored, the Drowned Crown permits Jade\'s party to enter the deepest archive.', 'Within its depths lie records that have remained sealed for centuries.', 'Maris: "These are real... Our family\'s archives mentioned fragments of this, but I never imagined the full records still existed."'], rw:{xp:72000, gold:14000}},
      {id:'ancient_alliance', kind:'investigate', n:'Discover the Ancient Interregional Alliance', icon:'🤝', ch:183, need:3, ambush:[], lo:66, needFlag:'inv_enter_archive', lockMsg:'🔒 Finish the previous clue first',
       desc:'A true network.',
       clues:['The records show that Dragonvale, Tribute, the Sunken Kingdom, and several other civilizations once formed a maritime alliance.', 'Devon: "They shared knowledge, resources, and spiritual defense systems... This was far more extensive than any single kingdom. It was a true network."', 'Sky: "This network was not created for war. It was designed to protect people, knowledge, and spiritual resources from catastrophic corruption."'], rw:{xp:72500, gold:14100}},
      {id:'erased_routes', kind:'investigate', n:'Investigate the Erased Maritime Connections', icon:'🗺️', ch:183, need:3, ambush:[], lo:66, needFlag:'inv_ancient_alliance', lockMsg:'🔒 Finish the previous clue first',
       desc:'Someone wanted them forgotten.',
       clues:['Following the ancient crisis, the participating kingdoms deliberately severed many of their connections: sea routes were erased, records were altered, certain magical traditions disappeared from public knowledge.', 'Rin: "These routes didn\'t just fade naturally. They were deliberately removed from navigation records. Someone wanted these connections forgotten."', 'The archive does not reveal every reason behind these decisions.'], rw:{xp:73000, gold:14200}},
      {id:'recover_records', kind:'investigate', n:'Recover Historical Records', icon:'📜', ch:183, need:3, ambush:[], lo:66, needFlag:'inv_erased_routes', lockMsg:'🔒 Finish the previous clue first',
       desc:'The Register in context.',
       clues:['Their cooperation became particularly important during the Dima/Xima crisis, when corruption threatened to spread across multiple regions.', 'Jade: "This changes everything. The Fifteen Register cannot be interpreted in isolation. There were forces at work across multiple kingdoms."'], rw:{xp:73500, gold:14300}},
      {id:'unresolved_mysteries', kind:'investigate', n:'Identify Mysteries Tied to the Dima/Xima Crisis', icon:'❓', ch:183, need:3, ambush:[], lo:66, needFlag:'inv_recover_records', lockMsg:'🔒 Finish the previous clue first',
       desc:'New questions.',
       clues:['Why were the connections severed? Who decided which records to alter? And how many other kingdoms were involved?', 'The archive provides answers, but also raises new mysteries that will require further investigation.'], rw:{xp:74000, gold:14400}},
      {id:'restoration_return', kind:'investigate', n:'Return to the Restoration Chamber', icon:'🏛️', ch:184, need:3, ambush:[], lo:66,
       desc:'Summoned.',
       clues:['The Drowned Crown summons Devon to the ancient restoration chamber.', 'Through the preserved memories of the royal council, Devon sees how his ancestors were entrusted with the pearl to carry it until the restoration network was needed again.'], rw:{xp:74500, gold:14500}},
      {id:'pearl_responsibility', kind:'investigate', n:'Discover Devon\'s Inherited Responsibility', icon:'🔮', ch:184, need:3, ambush:[], lo:66, needFlag:'inv_restoration_return', lockMsg:'🔒 Finish the previous clue first',
       desc:'Not a possession.',
       clues:['Devon: "So this... was never meant to stay with my family forever."', 'Over generations the responsibility was forgotten. The pearl became a symbol of royal inheritance rather than a tool of preservation.', 'Jade: "You\'ve changed so much since our earlier adventures."'], rw:{xp:75000, gold:14600}},
      {id:'pearl_family', kind:'investigate', n:'Learn Why His Family Possessed the Pearl', icon:'👑', ch:184, need:3, ambush:[], lo:66, needFlag:'inv_pearl_responsibility', lockMsg:'🔒 Finish the previous clue first',
       desc:'A trust.',
       clues:['The pearl was not a possession, but a trust inherited from those who sacrificed their kingdom to preserve something greater.', 'Devon: "I understand now. This is not just my inheritance... it is a responsibility."'], rw:{xp:75500, gold:14700}},
      {id:'crown_trust', kind:'investigate', n:'Receive the Crown\'s Recognition', icon:'🌟', ch:184, need:3, ambush:[], lo:66, needFlag:'inv_pearl_family', lockMsg:'🔒 Finish the previous clue first',
       desc:'Worthy.',
       clues:['Now that the ancient network has begun awakening, the Crown must decide whether Devon is worthy of continuing that responsibility.', 'The Crown: "Rather than reclaiming the pearl, we return its authority to you."'], rw:{xp:76000, gold:14800}},
      {id:'pearl_authority', kind:'investigate', n:'Restore the Dragon Pearl\'s Ancient Authority', icon:'✨', ch:184, need:3, ambush:[], lo:66, needFlag:'inv_crown_trust', lockMsg:'🔒 Finish the previous clue first',
       desc:'Authority returned.',
       clues:['The Crown: "The artifact\'s original purpose has resumed." Devon: "I accept this responsibility."', 'The Crown\'s authority settles into the pearl, and the restoration chamber begins glowing once more.'], rw:{xp:76500, gold:14900}},
      {id:'investigation_complete', kind:'investigate', n:'Complete the Sunken Kingdom Investigation', icon:'✅', ch:185, need:3, ambush:[], lo:67,
       desc:'The investigation is done.',
       clues:['With the Black Tide restored and the Drowned Crown\'s true purpose revealed, the Sunken Kingdom\'s history can finally be acknowledged.', 'For centuries, the Sunken Kingdom was remembered only as a warning. Now, its people may finally be remembered for who they were.'], rw:{xp:77000, gold:15000}},
      {id:'history_recognised', kind:'investigate', n:'Restore the Kingdom\'s Historical Recognition', icon:'🏛️', ch:185, need:3, ambush:[], lo:67, needFlag:'inv_investigation_complete', lockMsg:'🔒 Finish the previous clue first',
       desc:'Recorded, not erased.',
       clues:['Dragonvale\'s royal authorities begin restoring the kingdom to their official historical records.', '"What was erased will be restored. The Sunken Kingdom will be recorded not as a cautionary tale, but as a true part of our shared history."', 'Maris: "These are real... Our family\'s records... They survived. At last, we can piece together what truly happened."'], rw:{xp:77500, gold:15100}},
      {id:'maritime_contact', kind:'investigate', n:'Establish Safe Maritime Contact', icon:'⛵', ch:185, need:3, ambush:[], lo:67, needFlag:'inv_history_recognised', lockMsg:'🔒 Finish the previous clue first',
       desc:'A route reopened.',
       clues:['Roc: "We\'ll open the maritime route gradually. Trade, communication and cultural exchange must be done carefully and under protection."', 'The ancient maritime route is reopened under careful supervision: monitored vessels, registered crews and established routes will ensure the kingdom remains connected safely this time.', 'Sally begins distributing the corrected history through her information network: "Truth spreads further when more people know it."'], rw:{xp:78000, gold:15200}},
      {id:'report_greyson', kind:'investigate', n:'Submit the Findings to Greyson', icon:'✉️', ch:185, need:3, ambush:[], lo:67, needFlag:'inv_maritime_contact', lockMsg:'🔒 Finish the previous clue first',
       desc:'The final report.',
       clues:['Jade: "The investigation is complete. I\'ll send the report through the royal channel and include all findings, including the changes about the Fifteen Register."', 'The report records the findings, the restored truth, updated records and recommendations for the next investigation.'], rw:{xp:78500, gold:15300}},
      {id:'update_register_185', kind:'investigate', n:'Update the Fifteen Register', icon:'📕', ch:185, need:3, ambush:[], lo:67, needFlag:'inv_report_greyson', lockMsg:'🔒 Finish the previous clue first',
       desc:'Not every name is a monster.',
       clues:['The Fifteen Register now contains five resolved cases.', 'The names recorded as Evils do not necessarily describe monsters. Some refer to victims. Some to guardians. Others to magical systems whose original purposes were forgotten.', 'The Register itself may have been shaped by political decisions, historical misunderstandings and deliberate alterations.'], rw:{xp:79000, gold:15400}},
      {id:'next_investigation', kind:'investigate', n:'Prepare for the Next Investigation', icon:'🧭', ch:185, need:3, ambush:[], lo:67, needFlag:'inv_update_register_185', lockMsg:'🔒 Finish the previous clue first',
       desc:'The sea remembers.',
       clues:['Before departing Dragonvale, Jade looks toward the restored waters.', '"Not every monster was born a monster. Not every darkness must be destroyed. Some truths were lost with time, but now they can be found again."'], rw:{xp:79500, gold:15500}}]},
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
  if(sp.needWhile && !sp.needWhile()) return sp.lockMsg || '🔒 Closed';
  return '';
}

// Some story chapters must be started on location (PROVISIONAL). {chapter: locationId}
// Chapters whose story must be started on location. Tune freely: {chapter: locationId}
const CH_LOC = { 198:'dragon_vale', 199:'dragon_vale', 200:'dragon_vale', 201:'dragon_vale', 202:'dragon_vale', 203:'dragon_vale', 204:'dragon_vale', 205:'dragon_vale', 206:'dragon_vale', 207:'dragon_vale', 208:'dragon_vale', 209:'dragon_vale', 210:'dragon_vale', 191:'dragon_vale', 192:'dragon_vale', 193:'dragon_vale', 194:'dragon_vale', 195:'dragon_vale', 196:'dragon_vale', 197:'dragon_vale', 186:'dragon_vale', 187:'dragon_vale', 188:'dragon_vale', 189:'dragon_vale', 190:'dragon_vale', 179:'sunken_kingdom', 180:'sunken_kingdom', 181:'sunken_kingdom', 182:'sunken_kingdom', 183:'sunken_kingdom', 184:'sunken_kingdom', 185:'dragon_vale', 167:'capital', 168:'capital', 169:'capital', 170:'dragon_vale', 171:'dragon_vale', 172:'black_tide_waters', 173:'sunken_kingdom', 174:'sunken_kingdom', 175:'sunken_kingdom', 176:'sunken_kingdom', 177:'sunken_kingdom', 178:'sunken_kingdom', 156:'mourning_valley', 157:'crownless_marches', 158:'crownless_marches', 159:'crownless_marches', 160:'crownless_marches', 161:'crownless_marches', 162:'capital', 163:'capital', 164:'capital', 165:'archive_shrine', 166:'capital', 150:'forest_of_thorns', 151:'forest_of_thorns', 152:'forest_of_thorns', 153:'mourning_valley', 154:'mourning_valley', 155:'mourning_valley', 147:'capital', 148:'capital', 149:'black_forest', 139:'land_beyond_seal', 140:'land_beyond_seal', 141:'land_beyond_seal', 142:'land_beyond_seal', 143:'land_beyond_seal', 144:'land_beyond_seal', 145:'land_beyond_seal', 146:'land_beyond_seal', 129:'forgotten_sanctuary', 130:'forgotten_sanctuary', 131:'celestial_ruins', 132:'celestial_ruins', 133:'celestial_ruins', 134:'celestial_ruins', 135:'celestial_ruins', 136:'celestial_ruins', 137:'celestial_ruins', 138:'celestial_ruins', 127:'forgotten_sanctuary', 128:'forgotten_sanctuary', 126:'forgotten_sanctuary', 119:'valen_borderlands', 120:'valen_borderlands', 121:'capital', 122:'capital', 123:'forgotten_battlefield', 124:'forgotten_battlefield', 125:'forgotten_battlefield', 118:'valen_borderlands', 109:'valen_borderlands', 110:'valen_borderlands', 111:'valen_borderlands', 112:'valen_borderlands', 113:'valen_borderlands', 114:'valen_borderlands', 115:'valen_borderlands', 116:'valen_borderlands', 117:'valen_borderlands', 105:'valen_borderlands', 106:'valen_borderlands', 107:'valen_borderlands', 108:'valen_borderlands', 102:'capital', 103:'capital', 104:'valen_borderlands', 99:'capital', 100:'capital', 101:'capital', 95:'capital', 96:'capital', 97:'gold_residence', 98:'capital', 89:'capital', 90:'gold_residence', 91:'gold_residence', 92:'gold_residence', 93:'gold_residence', 94:'gold_residence', 87:'dragon_vale', 84:'dragon_vale', 86:'dragon_vale', 78:'dragon_vale', 79:'dragon_vale', 80:'moonveil_temple', 81:'dragon_vale', 82:'dragon_vale', 83:'dragon_vale', 85:'dragon_border', 74:'dragon_vale', 76:'dragon_border', 77:'dragon_ruins', 75:'dragon_vale', 63:'dragon_vale', 64:'dragon_vale', 65:'dragon_vale', 66:'dragon_vale', 67:'dragon_vale', 68:'dragon_vale', 69:'dragon_vale', 70:'dragon_vale', 71:'dragon_vale', 72:'dragon_vale', 73:'dragon_vale', 61:'dragon_vale', 62:'dragon_vale', 57:'dragon_vale', 58:'dragon_vale', 59:'dragon_vale', 60:'cavern_fireflies', 52:'dragon_vale', 53:'dragon_vale', 54:'dragon_vale', 55:'dragon_vale', 56:'dragon_vale', 44:'capital', 45:'dragon_vale', 46:'dragon_vale', 47:'dragon_vale', 48:'dragon_vale', 49:'dragon_vale', 50:'dragon_vale', 51:'dragon_vale', 12:'dark_inn', 16:'vigil_village', 17:'vigil_village', 18:'vigil_village', 19:'faepool_forest', 21:'faepool_forest', 22:'booyeong_camp', 23:'booyeong_camp', 24:'booyeong_camp', 25:'faepool_forest', 26:'vigil_village', 27:'booyeong_camp', 28:'vigil_village', 29:'vigil_village', 30:'vigil_village' };   // chapters that must start on location (ch12 begins at the inn). More are added as chapters are converted.
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
  {a:'dragon_vale', b:'black_tide_waters', mode:'ship', n:'The Forbidden Sea Route', days:3, fare:0, risk:.45, pool:['tide_horror','drowned_shade','storm_wisp']},
  {a:'black_tide_waters', b:'sunken_kingdom', mode:'ship', n:'The Submerged Passage', days:1, fare:0, risk:.3, pool:['drowned_shade','relic_spirit']},
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
const FLAG_LABEL = { marroway_request:'Carly asked Jade\'s party for protection for the villagers and women', marroway_night:'Marroway House was searched at night: a wider network, a token, a hidden storage room', lucien_alerted:'Lucien Marroway knows someone is investigating him', marroway_villagers:'The villagers of Marroway\'s lands stood together', devon_accountability:'Devon chose accountability for his name', sally_left_lucien:'Sally left Lucien Marroway', marroway_fallen:'Lucien Marroway was taken into custody', sally_separated:'Sally\'s separation from Lucien is complete', sally_never_remarry:'Sally will not remarry', fourth_record:'A fourth record of the impossible entry was found', eve_ally:'Eve Gray is an active ally of the investigation', pattern_across_kingdoms:'The contradictions link to the ancient alliance', name_is_framework:'The name is a pattern, not a single being', register_beyond_fifteen:'The Register records anomalies beyond the Fifteen', arc8_complete:'Arc VIII, The Impossible Entry, is complete', sally_married:'Sally married Lucien Marroway', sally_tavern_seen:'Lady Sally Sun and Levi talked at the tavern', sally_handmaiden_concern:'Sally\'s handmaiden voiced her worry about Levi', marroway_levies:'Marroway House levies grain and labour from its villages: the party has seen it', marroway_diverted_goods:'Goods listed for the capital are diverted to Marroway\'s private stores', marroway_testimony:'An anonymous survivor testified against Marroway House', marroway_ledger:'The Marroway ledger was found and copied', impossible_report_sent:'Adrian reported the Register\'s impossible entry to Jade', impossible_verified:'The three records are genuine: no copying, same date', name_without_body:'Three accounts disagree about what the name is: a visitor, a phenomenon, a ritual figure', neutral_archives_lead:'A neutral trade city keeps records from several kingdoms, including erased ones', haiyue_port_lead:'The three records name one port: Haiyue (Tribute), Moonreach (Dragonvale), Yueluo (the Sunken Kingdom)', arc8_unlocked:'The next investigation is unlocked: one Register name in three kingdoms', crown_is_council:'The Drowned Crown is the royal council\'s final command, not a king\'s ghost', false_choice_rejected:'Jade rejected the false choice between sacrificing two kingdoms', crown_trials_passed:'The Drowned Crown recognised a different path', tide_truth_known:'The Black Tide was not born evil: a guardian current, twisted', black_tide_restored:'The Black Tide has been restored', drowned_crown_reclassified:'The Drowned Crown is a Preservation Construct, not an Evil', ancient_alliance_known:'An ancient alliance joined Dragonvale, Tribute, the Sunken Kingdom and vanished civilizations', pearl_authority_restored:'The Crown returned the pearl\'s authority to Devon', sunken_kingdom_remembered:'The Sunken Kingdom is restored to the records', register_doubted:'The Register may have been shaped by politics and alteration', impossible_entry:'One Register name appears in three kingdoms at once', inv_adrian_message:'Adrian found the Register\'s impossible entry', evelyne_wed:'Adrian and Princess Evelyne are wed: the royal special missions open', black_tide_reported:'Ships vanish along an erased maritime route: the Register\'s Black Tide matches', adrian_eve_gray:'Adrian\'s letters from Eve Gray (disguised as a young man when they met; she disappeared)', pearl_resonates:'The Black Dragon Pearl resonates with the old sea charts: it may be older than Dragonvale\'s royal line', sunken_records_suppressed:'Dragonvale has suppressed its records of the Sunken Kingdom for generations', aelyndra_named:'The drowned territory has a name: Aelyndra', black_tide_met:'The Black Tide: first manifestation, driven back but not defeated', sunken_kingdom_found:'The Sunken Kingdom lies preserved beneath the sea', deliberate_submersion:'The Sunken Kingdom was deliberately submerged by its royal council during the Dima and Xima crisis', maris_met:'Maris Aurel, Tide Archivist of the Deep Archives', pearl_purpose:'The Black Dragon Pearl is a restoration anchor (and Sky\'s recovery was two ancient restoration traditions working together)', drowned_crown_met:'The Drowned Crown warns the party away', roc_inheritance_known:'Roc\'s house inherited maritime authority over the Sunken Kingdom, and its forgotten duty', sera_shift_known:'Seraphina fights with snow-white hair in a white-and-purple battle outfit (the reason is explained later in her own arc)', mandate_resolve:'The mandate changes from Destroy to Resolve the Fifteen Evils', hart_resolved:'The Mourning Hart is resolved (2/15): a guardian, not an enemy', valley_protected:'Mourning Valley is under the Crown\'s protection by royal decree', hollow_king_met:'The Hollow King, the Third Evil, speaks', gold_lineage_hunted:'The Fifteen Evils have long been tied to the Gold lineage (Solmir, Velran, Elaris)', fifteen_designated:'There were never fifteen Evils: fifteen entities were designated dangerous in the ancient crisis', crownless_king_known:'The Hollow King was a king whose kingdom the seals erased', hollow_king_contained:'The Hollow King is contained (3/15)', three_truths:'Three Evils, three truths: a corrupted guardian, a misidentified protector, a historical victim', register_rewritten:'The Fifteen Register may record rewritten history: its terminology dates after the Keeper oath was altered', fourth_entry_missing:'Entry IV of the Register was deliberately removed from every copy', nameless_witness_met:'The Nameless Witness: someone who saw the Fifteen before they were named', bracelet:'Communication Bracelet', crossbow:'Levi\'s Crossbow', jade_awakened:'Golden Blood Awakening', valen_restored:'The Valen Borderlands are restored: an ally of Tribute', sky_pendant_mother:'Sky carries his mother\'s pendant (a second pendant; his own was lost)', choice_prophecy:'The one beside the Gold Child is chosen by choice', omen_seen:'The first omen: the demons are fleeing', cael_met:'Cael Ardyn, the last Seal Keeper', first_seal_found:'The first broken seal is found', forgotten_light_found:'The forgotten light and sanctuary', seris_met:'Seris Valen, Saint of Forgotten Light', sanctuary_purpose:'The purpose of Forgotten Light', guiding_map_found:'The sanctuary\'s guiding map', eira_met:'Eira Solenne joins as the party\'s guide', celestial_found:'The Celestial Ruins', seal_message_seen:'The seal\'s message: I will make it remember', one_hand_known:'One hand behind many seals', varyn_met:'Varyn Noctis, the Seal Breaker', seal_kinds_known:'Seals: containment, preservation, separation', forgotten_world_seen:'A forgotten world behind the seal', barrier_people:'The people behind the barrier', oath_changed:'The Keeper\'s oath was changed', oath_original:'The original oath before the war', sisters_together:'Dima and Xima began as allies', returning_light:'Sky: Bearer of the Returning Light', ardyn_inheritance:'The Ardyn family changed the oath', adviser_known:'The unnamed adviser behind the war', truth_before_curse:'The truth before the curse', arc5_complete:'Arc V complete: the Discovery Phase', fifteen_named:'The Fifteen Evils of Tribute are named', first_evil_hunt:'The hunt for the first Evil begins', rin_met:'Rin Kaede, Spirit Ranger', widow_resolved:'The Thorned Widow is resolved (1/15)', hart_found:'The Mourning Hart is a guardian', burial_ground_known:'The burial ground beneath Mourning Valley', royal_link_known:'The royal connection to Tribute (noted)', symbol_traced:'The symbol traced across regions', faction_identified:'The third faction identified',  hale_met:'Magistrate Hale: an unwilling guardian of the truth', third_faction_known:'The third faction (sun-and-eye symbol)', valen_secret:'The Valen secret: Dima and the Gold Child', yvette_truth:'The truth behind Yvette Sue Valen', archive_defended:'The western archive was defended', warriors_insight:'Jade: Warrior\'s Insight', royal_sense:'Devon: Royal Spirit Sense', door_open:'The Symbol Door opened', people_behind_found:'The people behind the missing records', valen_prophecy_link:'The Valen crest and the prophecy', sky_train_1:'Sky: Reading the Body', sky_train_2:'Sky: Cleansing Light', sky_train_3:'Sky: The Old Light', jade_dragon_harmony:'Couple skill: Jade Dragon Harmony', husband_wife_truth:'Jade and Devon are husband and wife in truth', order_delivered:'Greyson\'s sealed order delivered',  princess_of_tribute:'Jade is Princess of Tribute, Greyson\'s sworn sister', visions_shared:'Jade shared her hidden visions', luck_known:'Luck: a lasting blessing from the accident', roc_trial_p1:'Shadow of Roc defeated', roc_trial_p2:'The Shadow Crown ended by Roc\'s own blade', roc_purified:'Roc is purified', roc_reborn:'Roc is reborn: Dark Dragon Aura', gold_family_met:'Jade\'s family: the Gold residence', sky_resembles_yvette:'Sky looks like Yvette Sue Valen', sky_pendant_lost:'Sky\'s jade pendant is lost', ghost_healer_met:'The Ghost Healer travels with the party', ghost_trust:'The Ghost Healer trusts you: Ancient Remedy', ghost_gift_bought:'A gift for the Ghost Healer bought', ghost_gifted:'Gift given to the Ghost Healer', dragonvale_honoured:'Honoured by Dragonvale', aster_crown_prince:'Aster is Crown Prince of Dragonvale', dv_purify:'Devon: Spirit Purification', partner_actions:'Partner action: Guardian\'s Promise', princess_guardian:'Jade: Princess Guardian', royal_spirit_authority:'Devon: Royal Spirit Authority', twin_dragon:'Couple skill: Twin Dragon Harmony', dv_exploration:'Dragonvale exploration areas', roc_exiled:'Roc is exiled from Dragonvale', liora_apart:'Liora stays in Dragonvale; letters follow', seraphina_free:'Seraphina is free: the Divorce Scroll from King Chadstone', liora_ward:'Liora is in Jade and Devon\'s care', levi_reborn:'Levi returns, reborn', sally_stays:'Sally stays in Dragonvale as a rumour source', chad_dark_deep:'Roc\'s dark arts deepen', chad_backlash_1:'Dark-magic backlash (Roc): stats permanently altered', chad_backlash_2:'Dark-magic backlash worsens (Roc)', chad_backlash_3:'Dark-magic backlash, final (Roc)', roc_severed:'Bond with Roc Chadwick severed', jade_poisoned:'Jade is poisoned (slow-acting)', royal_attire:'Daily Royal Attire and Phoenix Guard attire', sally_gossip:'Sally\'s court gossip', chad_dark_arts:'Chad\'s dark arts', greyson_arms:'Greyson\'s dagger and flail unsealed', greyson_gift:'Greyson\'s gift received', cleansing_touch:'Cleansing Touch (Jade)', sally_noble:'Sally\'s noble title and Noble Grace' };

/* ---------------- DAY CLOCK ---------------- */
function advanceDay(n){
  G.day += n; if(typeof corrTick==='function') corrTick(n); if(n>0 && typeof healParty==='function') healParty(Math.min(.5,.1*n)); refreshBounties();
  return deliverLetters().concat(checkMissionOffers(), typeof famTick==='function' ? famTick() : [], typeof timedTick==='function' ? timedTick() : [], typeof salaryTick==='function' ? salaryTick() : []);
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
  {id:'m_msg_dragonvale', needCh:167, title:'The Message from Dragonvale', obj:{type:'steps', steps:[
     {label:'Examine Sally\'s maritime reports', spot:'sally_reports'},
     {label:'Consult the Register about the Fifteen Register', spot:'register_blacktide'},
     {label:'Identify the Black Tide as a potential threat', spot:'blacktide_threat'},
     {label:'Investigate Dragonvale\'s missing maritime records', spot:'maritime_records'},
     {label:'Prepare for an expedition', chapter:167}]}, rw:{xp:185000, gold:41000, rep:610},
   subj:'A message from Dragonvale', body:'Sally writes of ships that vanish and a sea that turns black. Go and see. — Greyson'},
  {id:'m_letters_blossoms', needCh:168, title:'Letters Beneath the Blossoms', obj:{type:'steps', steps:[
     {label:'Spend time with Adrian in the palace gardens', spot:'garden_walk'},
     {label:'Learn about Adrian\'s childhood and defensive abilities', spot:'adrian_childhood'},
     {label:'Discover his relationship with Eve Gray', spot:'eve_gray'},
     {label:'Learn how their correspondence began', spot:'eve_letters'},
     {label:'Witness the arrival of Eve\'s messenger pigeon', chapter:168}]}, rw:{xp:190000, gold:42000, rep:620},
   subj:'The gardens', body:'Adrian writes less than he should. Be kind to him. — Greyson'},
  {id:'m_pearl_remembers', needCh:169, title:'The Pearl That Remembers', obj:{type:'steps', steps:[
     {label:'Examine Devon\'s Black Dragon Pearl', spot:'pearl_examine'},
     {label:'Investigate its reaction to ancient sea charts', spot:'pearl_charts'},
     {label:'Compare its energy with Sky\'s restoration experience', spot:'pearl_sky'},
     {label:'Identify the strongest resonance location', spot:'pearl_resonance'},
     {label:'Establish the expedition\'s destination', chapter:169}]}, rw:{xp:195000, gold:43000, rep:630},
   subj:'A pearl that remembers', body:'If the pearl points to Dragonvale, then Dragonvale is where you go. — Greyson'},
  {id:'m_return_dragonvale', needCh:170, title:'Return to Dragonvale', obj:{type:'steps', steps:[
     {label:'Return to Dragonvale', chapter:170},
     {label:'Meet Sally and Roc', spot:'meet_sally_roc'},
     {label:'Investigate the missing ships', spot:'missing_ships'},
     {label:'Consult Dragonvale\'s maritime authorities', spot:'maritime_authorities'},
     {label:'Discover the suppression of Sunken Kingdom records', spot:'suppressed_records'}]}, rw:{xp:200000, gold:44000, rep:640},
   subj:'Back to Dragonvale', body:'Dragonvale will not thank you for asking. Ask anyway. — Greyson'},
  {id:'m_forbidden_route', needCh:171, title:'The Forbidden Sea Route', obj:{type:'steps', steps:[
     {label:'Investigate the forbidden maritime route', spot:'harbor_route'},
     {label:'Question sailors and harbor officials', spot:'sailors_officials'},
     {label:'Track evidence of the Black Tide', spot:'tide_evidence'},
     {label:'Recover an ancient sea chart', spot:'ancient_chart'},
     {label:'Prepare a ship for the expedition', chapter:171}]}, rw:{xp:205000, gold:45000, rep:650},
   subj:'The forbidden route', body:'A kingdom that is on no map. I should like to know why. — Greyson'},
  {id:'m_black_tide', needCh:172, title:'The Black Tide', obj:{type:'steps', steps:[
     {label:'Survive the Black Tide\'s first attack', chapter:172},
     {label:'Defend the expedition ship', spot:'sea_calm'},
     {label:'Defeat corrupted marine creatures', chapter:172},
     {label:'Activate the Dragon Pearl\'s protective ability', chapter:172},
     {label:'Track the Black Tide\'s retreat', spot:'tide_retreat'}]}, rw:{xp:225000, gold:49000, rep:670},
   subj:'The black water', body:'You survived it. It did not die. Do not forget that. — Greyson'},
  {id:'m_beneath_waves', needCh:173, title:'Beneath the Waves', obj:{type:'steps', steps:[
     {label:'Discover the underwater passage', spot:'uw_passage'},
     {label:'Activate ancient restoration chambers', spot:'restoration_chambers'},
     {label:'Explore the submerged ruins', spot:'submerged_ruins'},
     {label:'Restore access to sealed districts', spot:'sealed_districts'},
     {label:'Reach the Sunken Kingdom\'s outer city', spot:'outer_city'}]}, rw:{xp:230000, gold:50000, rep:680},
   subj:'An entire kingdom', body:'A whole kingdom, still standing. Write it all down. — Greyson'},
  {id:'m_kingdom_chose_sea', needCh:174, title:'The Kingdom That Chose the Sea', obj:{type:'steps', steps:[
     {label:'Explore the preserved city', spot:'explore_city'},
     {label:'Examine ancient inscriptions', spot:'inscriptions'},
     {label:'Investigate the kingdom\'s final days', spot:'final_days'},
     {label:'Discover evidence of deliberate submersion', spot:'deliberate_sub'},
     {label:'Identify the missing historical records', spot:'missing_records'}]}, rw:{xp:235000, gold:51000, rep:690},
   subj:'Chose the sea', body:'If they chose it, they had a reason. Find the reason. — Greyson'},
  {id:'m_maris_archives', needCh:175, title:'Maris of the Deep Archives', obj:{type:'steps', steps:[
     {label:'Meet Maris Aurel', spot:'maris_meet'},
     {label:'Investigate the Deep Archives', spot:'deep_archives'},
     {label:'Learn about the ancient restoration network', spot:'restoration_network'},
     {label:'Discover the Dragon Pearl\'s original purpose', spot:'pearl_origin'},
     {label:'Gain access to restricted historical chambers', spot:'restricted_chambers'}]}, rw:{xp:240000, gold:52000, rep:700},
   subj:'The Archivist', body:'Be courteous to the Archivist. She has kept more faith than we have. — Greyson'},
  {id:'m_dragon_pearl', needCh:176, title:'The Dragon Pearl', obj:{type:'steps', steps:[
     {label:'Examine the restoration chamber', spot:'restoration_chamber'},
     {label:'Discover the Dragon Pearl\'s original function', spot:'pearl_function'},
     {label:'Investigate its connection to Yvette\'s jade pendant', spot:'pendant_link'},
     {label:'Understand Sky\'s restored life force', spot:'sky_restored'},
     {label:'Unlock the pearl\'s ancient restoration resonance', chapter:176}]}, rw:{xp:245000, gold:53000, rep:710},
   subj:'What the pearl is', body:'Sky lives because two old arts agreed. I am glad of it. — Greyson'},
  {id:'m_drowned_crown', needCh:177, title:'The Drowned Crown', obj:{type:'steps', steps:[
     {label:'Approach the submerged royal palace', spot:'approach_palace'},
     {label:'Encounter the Drowned Crown', spot:'drowned_crown_meet'},
     {label:'Defeat the spectral royal guardians', boss:'boss_royal_guardian'},
     {label:'Investigate the Crown\'s warnings', spot:'crown_warnings'},
     {label:'Determine whether the entity is genuinely hostile', spot:'crown_hostile'}]}, rw:{xp:265000, gold:57000, rep:740},
   subj:'The crown below', body:'A warning is not a threat, unless you ignore it. You did. — Greyson'},
  {id:'m_rocs_inheritance', needCh:178, title:'Roc\'s Inheritance', obj:{type:'steps', steps:[
     {label:'Investigate Roc\'s ancestral records', spot:'roc_records'},
     {label:'Discover Dragonvale\'s inherited maritime authority', spot:'maritime_authority'},
     {label:'Examine the suppression of Sunken Kingdom history', spot:'suppression_history'},
     {label:'Confront the political consequences', spot:'political_consequences'},
     {label:'Help Roc determine his responsibility', chapter:178}]}, rw:{xp:270000, gold:58000, rep:750},
   subj:'A debt of record', body:'Roc must decide what the name owes. Let him. — Greyson'},
  {id:'m_crown_without_king', needCh:179, title:'A Crown Without a King', obj:{type:'steps', steps:[
     {label:'Investigate the Crown\'s origin', spot:'crown_origin'},
     {label:'Discover the royal council\'s final command', spot:'council_command'},
     {label:'Examine the Crown\'s preserved memories', spot:'crown_memories'},
     {label:'Identify the purpose of the deepest chamber', spot:'deepest_chamber'},
     {label:'Prepare for the Trial of the Drowned Court', spot:'trial_prep'}]}, rw:{xp:275000, gold:59000, rep:760},
   subj:'What the crown is', body:'It is not a king. It is a decision, left standing. Learn what it decided. — Greyson'},
  {id:'m_trial_drowned_court', needCh:180, title:'Trial of the Drowned Court', obj:{type:'steps', steps:[
     {label:'Enter the Drowned Court', spot:'enter_court'},
     {label:'Complete the trials of duty and rulership', spot:'trials_duty'},
     {label:'Investigate the ancient sacrifice mechanism', spot:'sacrifice_mechanism'},
     {label:'Discover an alternative solution', spot:'alternative_solution'},
     {label:'Gain the Drowned Crown\'s recognition', spot:'crown_recognition'}]}, rw:{xp:280000, gold:60000, rep:770},
   subj:'The questions', body:'A court that asks is a court that can be answered. Answer well. — Greyson'},
  {id:'m_black_tide_returns', needCh:181, title:'The Black Tide Returns', obj:{type:'steps', steps:[
     {label:'Defend the expedition ships', spot:'defend_ships'},
     {label:'Protect the underwater restoration chambers', spot:'protect_chambers'},
     {label:'Learn what lies beneath the corruption', spot:'tide_layered'},
     {label:'Stabilize the preservation network', spot:'stabilize_network'},
     {label:'Confront the Black Tide\'s central manifestation', boss:'boss_black_tide'}]}, rw:{xp:285000, gold:61000, rep:780},
   subj:'The Tide is back', body:'Hold the ships, hold the chambers, and look closely at what you are fighting. — Greyson'},
  {id:'m_black_tide_restored', needCh:182, title:'The Black Tide Restored', obj:{type:'steps', steps:[
     {label:'Identify the Black Tide\'s original nature', spot:'tide_origin'},
     {label:'Protect Sky during the restoration', spot:'protect_sky'},
     {label:'Activate the Dragon Pearl', spot:'activate_pearl'},
     {label:'Purify the corrupted waters', spot:'purify_waters'},
     {label:'Update the Fifteen Register', spot:'update_register_182'}]}, rw:{xp:290000, gold:62000, rep:790},
   subj:'A guardian again', body:'Five of the Fifteen are answered. Write them down as they were, not as they were feared. — Greyson'},
  {id:'m_what_crown_guarded', needCh:183, title:'What the Drowned Crown Guarded', obj:{type:'steps', steps:[
     {label:'Enter the deepest archive', spot:'enter_archive'},
     {label:'Discover the ancient interregional alliance', spot:'ancient_alliance'},
     {label:'Investigate the erased maritime connections', spot:'erased_routes'},
     {label:'Recover historical records', spot:'recover_records'},
     {label:'Identify unresolved mysteries connected to the Dima/Xima crisis', spot:'unresolved_mysteries'}]}, rw:{xp:295000, gold:63000, rep:800},
   subj:'A larger history', body:'Copy what you can. Tribute is not the only kingdom that was asked to forget. — Greyson'},
  {id:'m_crown_returns_pearl', needCh:184, title:'The Crown Returns the Pearl', obj:{type:'steps', steps:[
     {label:'Return to the restoration chamber', spot:'restoration_return'},
     {label:'Discover Devon\'s inherited responsibility', spot:'pearl_responsibility'},
     {label:'Learn why his family possessed the pearl', spot:'pearl_family'},
     {label:'Receive the Crown\'s recognition', spot:'crown_trust'},
     {label:'Restore the Dragon Pearl\'s ancient authority', spot:'pearl_authority'}]}, rw:{xp:300000, gold:64000, rep:810},
   subj:'A trust, not a prize', body:'Devon has been given more than he has been given. See that he is not alone with it. — Greyson'},
  {id:'m_sea_remembers', needCh:185, title:'The Sea Remembers', obj:{type:'steps', steps:[
     {label:'Complete the Sunken Kingdom investigation', spot:'investigation_complete'},
     {label:'Restore the kingdom\'s historical recognition', spot:'history_recognised'},
     {label:'Establish safe maritime contact', spot:'maritime_contact'},
     {label:'Submit the findings to Greyson', spot:'report_greyson'},
     {label:'Update the Fifteen Register', spot:'update_register_185'},
     {label:'Prepare for the next investigation', spot:'next_investigation'}]}, rw:{xp:310000, gold:66000, rep:830},
   subj:'The sea remembers', body:'Your report is read. I have no better word for it than well done. — Greyson'},
  {id:'m_impossible_entry', needCh:185, title:'The Register\'s Impossible Entry', obj:{type:'steps', steps:[
     {label:'Compare the records of three kingdoms', spot:'three_accounts'},
     {label:'Check for a copying error', spot:'no_copy_error'},
     {label:'Read Adrian\'s message', spot:'adrian_message'}]}, rw:{xp:315000, gold:67000, rep:840},
   subj:'One name, three kingdoms', body:'Adrian found it before I did. He is rarely wrong about records. — Greyson'},
  {id:'m_three_kingdoms', needCh:186, title:'Three Kingdoms, One Name', obj:{type:'steps', steps:[
     {label:'Investigate the impossible Register entry', spot:'ie_look'},
     {label:'Verify the evidence from three kingdoms', spot:'ie_verify'},
     {label:'Identify the nature of the entity', spot:'ie_nature'},
     {label:'Report findings to Jade', spot:'ie_report'},
     {label:'Prepare for further investigation', spot:'ie_prepare'}]}, rw:{xp:320000, gold:68000, rep:850},
   subj:'One name, three kingdoms', body:'Adrian found it before I did. He is rarely wrong about records. — Greyson'},
  {id:'m_scholars_warning', needCh:187, title:'The Scholar\'s Warning', obj:{type:'steps', steps:[
     {label:'Review Adrian\'s detailed report', spot:'adrian_report'},
     {label:'Examine the three historical records', spot:'three_records'},
     {label:'Compare the translations and original documents', spot:'translations_originals'},
     {label:'Discuss possible explanations', spot:'discuss_explanations'},
     {label:'Plan the next investigation', spot:'plan_next'}]}, rw:{xp:325000, gold:69000, rep:860},
   subj:'The scholar\'s warning', body:'If Adrian says it cannot be a coincidence, believe him. — Greyson'},
  {id:'m_name_without_body', needCh:188, title:'A Name Without a Body', obj:{type:'steps', steps:[
     {label:'Review the three historical records', spot:'review_records'},
     {label:'Examine the descriptions and contexts for each account', spot:'record_contexts'},
     {label:'Compare the dates, locations and terminology', spot:'compare_terms'},
     {label:'Discuss possible explanations', spot:'possible_explanations'},
     {label:'Identify key questions for further investigation', spot:'key_questions'},
     {label:'Prepare for the next step in the inquiry', spot:'next_inquiry'}]}, rw:{xp:330000, gold:70000, rep:870},
   subj:'What the name represents', body:'A name with no body is still a name someone wrote down. Ask who. — Greyson'},
  {id:'m_beyond_three', needCh:189, title:'Beyond the Three Kingdoms', obj:{type:'steps', steps:[
     {label:'Review the analysis of the three records', spot:'analysis_review'},
     {label:'Investigate possible explanations for the shared name', spot:'shared_name'},
     {label:'Research neutral archives and trade cities', spot:'neutral_archives'},
     {label:'Look for connections between the kingdoms', spot:'kingdom_links'},
     {label:'Prepare to travel to the next location', spot:'prepare_travel'},
     {label:'Continue investigating the identity, event or role linked to the name', spot:'identity_event_role'}]}, rw:{xp:335000, gold:71000, rep:880},
   subj:'Past the borders', body:'Records that are harder to change are harder to find. Go and find them. — Greyson'},
  {id:'m_traces_water', needCh:190, title:'Traces Across the Water', obj:{type:'steps', steps:[
     {label:'Confirm the connection between the three records', spot:'confirm_connection'},
     {label:'Investigate Haiyue Port and its history', spot:'haiyue_history'},
     {label:'Gather information from multiple sources', spot:'multiple_sources'},
     {label:'Look for private archives and travel/journal records', spot:'private_archives'},
     {label:'Determine who controlled the port and what was being traded', spot:'port_control'},
     {label:'Continue the investigation into the Fifteen Register', spot:'register_next'}]}, rw:{xp:340000, gold:72000, rep:890},
   subj:'Across the water', body:'Take Adrian\'s copies. A neutral port keeps neutral secrets. — Greyson'},
  {id:'m_ladys_return', needCh:191, title:'A Lady\'s Return', obj:{type:'steps', steps:[
     {label:'Attend the royal court\'s gathering', spot:'sally_court'},
     {label:'Meet Lucien Marroway', spot:'meet_lucien'},
     {label:'Witness the wedding', spot:'sally_wedding'},
     {label:'Sally\'s new life', spot:'sally_new_life'}]}, rw:{xp:345000, gold:73000, rep:900},
   subj:'A lady of the realm', body:'Sally has chosen. I hope the choice was as sound as it looks. — Greyson'},
  {id:'m_tavern_evening', needCh:192, title:'An Evening at the Tavern', obj:{type:'steps', steps:[
     {label:'Take an evening of rest', spot:'tavern_rest'},
     {label:'Lady Sally Sun arrives', spot:'sally_arrives'},
     {label:'Levi is also there', spot:'levi_present'},
     {label:'Leave Levi and Sally to talk', spot:'levi_sally_talk'}]}, rw:{xp:350000, gold:74000, rep:910},
   subj:'A rare evening', body:'Rest is part of the work. Do not apologise for it. — Greyson'},
  {id:'m_handmaiden_concern', needCh:193, title:'The Handmaiden\'s Concern', obj:{type:'steps', steps:[
     {label:'The handmaiden asks to speak freely', spot:'handmaiden_speaks'},
     {label:'Levi\'s feelings', spot:'levi_feelings'},
     {label:'Sally answers', spot:'sally_answers'},
     {label:'We will face it together', spot:'together'}]}, rw:{xp:355000, gold:75000, rep:920},
   subj:'A loyal servant', body:'A servant who speaks plainly is worth ten who flatter. — Greyson'},
  {id:'m_price_obedience', needCh:194, title:'The Price of Obedience', obj:{type:'steps', steps:[
     {label:'Visit the village under Marroway House', spot:'village_order'},
     {label:'Who collects the levies?', spot:'levy_collectors'},
     {label:'Grain, timber and people', spot:'taken_children'},
     {label:'The same pattern', spot:'same_pattern'},
     {label:'Gather evidence quietly', spot:'quiet_evidence'}]}, rw:{xp:360000, gold:76000, rep:930},
   subj:'The price of obedience', body:'A village that pays and says nothing is not a quiet village. — Greyson'},
  {id:'m_beneath_noble_name', needCh:195, title:'Beneath a Noble Name', obj:{type:'steps', steps:[
     {label:'Compare the levy tables', spot:'levy_tables'},
     {label:'The villagers speak cautiously', spot:'villagers_fear'},
     {label:'Carly\'s journal', spot:'carly_journal'},
     {label:'Goods rerouted to private stores', spot:'private_stores'},
     {label:'Continue discreetly', spot:'discreet'}]}, rw:{xp:365000, gold:77000, rep:940},
   subj:'Beneath the name', body:'Names are not evidence. Ledgers are. — Greyson'},
  {id:'m_womans_testimony', needCh:196, title:'A Woman\'s Testimony', obj:{type:'steps', steps:[
     {label:'Meet the survivor', spot:'witness_meets'},
     {label:'The survivor\'s account', spot:'witness_account'},
     {label:'Who gave the orders', spot:'witness_orders'},
     {label:'Protect the witness', spot:'protect_witness'},
     {label:'There are others', spot:'more_voices'}]}, rw:{xp:370000, gold:78000, rep:950},
   subj:'First-hand', body:'Protect the witness before the case. — Greyson'},
  {id:'m_marroway_ledger', needCh:197, title:'The Marroway Ledger', obj:{type:'steps', steps:[
     {label:'Find the hidden ledger', spot:'ledger_found'},
     {label:'Read the payments', spot:'ledger_payments'},
     {label:'Payments for people', spot:'ledger_people'},
     {label:'Crossed-out entries', spot:'ledger_altered'},
     {label:'Copy the key pages', spot:'copy_ledger'}]}, rw:{xp:375000, gold:79000, rep:960},
   subj:'The ledger', body:'Keep the copies apart. Bring them to me when you can. — Greyson'},
  {id:'m_request_justice', needCh:198, title:'A Request for Justice', obj:{type:'steps', steps:[
     {label:'Meet Carly in a quiet corner', spot:'request_meeting'},
     {label:'Carly\'s report', spot:'carly_report'},
     {label:'An organised network', spot:'pattern_organised'},
     {label:'The copies', spot:'carly_copies'},
     {label:'Protection, not revenge', spot:'not_revenge'},
     {label:'Plan this properly', spot:'plan_properly'}]}, rw:{xp:380000, gold:80000, rep:970},
   subj:'A plea', body:'Carly asked for protection, not revenge. Give her both. — Greyson'},
  {id:'m_night_investigation', needCh:199, title:'The Night Investigation', obj:{type:'steps', steps:[
     {label:'Slip in behind the warehouses', spot:'night_entry'},
     {label:'Crates marked grain', spot:'diverted_crates'},
     {label:'Match the delivery marks', spot:'delivery_marks'},
     {label:'The agents\' token', spot:'agent_token'},
     {label:'The hidden storage room', spot:'hidden_room'},
     {label:'Copy and withdraw', spot:'night_copies'}]}, rw:{xp:385000, gold:81000, rep:980},
   subj:'Night work', body:'Bring back copies, not trophies. — Greyson'},
  {id:'m_aristocrats_mask', needCh:200, title:'The Aristocrat\'s Mask', obj:{type:'steps', steps:[
     {label:'Lucien finds traces', spot:'lucien_traces'},
     {label:'He suspects the household', spot:'lucien_suspects'},
     {label:'The public mask', spot:'public_mask'},
     {label:'Surveillance tightens', spot:'house_tightened'},
     {label:'Servants warned', spot:'servants_warned'},
     {label:'The mask cracks', spot:'mask_cracks'}]}, rw:{xp:390000, gold:82000, rep:990},
   subj:'A cornered man', body:'A man who has been unmasked is more dangerous. Watch Sally and Carly. — Greyson'},
  {id:'m_villagers_stand', needCh:201, title:'The Villagers\' Stand', obj:{type:'steps', steps:[
     {label:'A safe meeting place', spot:'safe_meeting'},
     {label:'The villagers speak', spot:'villagers_speak'},
     {label:'The women testify', spot:'women_testify'},
     {label:'Protect their names', spot:'protect_names'},
     {label:'Safe houses and escorts', spot:'safe_houses'},
     {label:'The stand', spot:'united_stand'}]}, rw:{xp:395000, gold:83000, rep:1000},
   subj:'A community', body:'Safe houses first. Testimony after. — Greyson'},
  {id:'m_weight_name', needCh:202, title:'The Weight of a Name', obj:{type:'steps', steps:[
     {label:'Devon reviews the evidence', spot:'devon_witness'},
     {label:'Names used as shields', spot:'names_shields'},
     {label:'Devon admits his own part', spot:'devon_admits'},
     {label:'Devon commits', spot:'devon_commits'},
     {label:'Sky and Levi support him', spot:'friends_support'},
     {label:'A name is accountability', spot:'accountability'}]}, rw:{xp:400000, gold:84000, rep:1010},
   subj:'Devon\'s resolve', body:'Devon wrote to me. I was glad to read it. — Greyson'},
  {id:'m_sallys_decision', needCh:203, title:'Sally\'s Decision', obj:{type:'steps', steps:[
     {label:'Sally faces the truth', spot:'sally_truth'},
     {label:'Lucien dismisses her', spot:'lucien_dismisses'},
     {label:'I choose to leave', spot:'sally_refuses'},
     {label:'Taking only what is hers', spot:'sally_packs'},
     {label:'Sally departs', spot:'sally_departs'}]}, rw:{xp:405000, gold:85000, rep:1020},
   subj:'Her choice', body:'It was her decision. Guard it. — Greyson'},
  {id:'m_fall_marroway', needCh:204, title:'The Fall of Marroway', obj:{type:'steps', steps:[
     {label:'Present the evidence', spot:'present_evidence'},
     {label:'Lucien denies', spot:'lucien_denies'},
     {label:'Lucien is taken into custody', spot:'lucien_custody'},
     {label:'The villagers find their voices', spot:'voices_found'},
     {label:'Protection and compensation', spot:'protection_compensation'},
     {label:'Marroway House in turmoil', spot:'house_turmoil'}]}, rw:{xp:410000, gold:86000, rep:1030},
   subj:'The fall', body:'The law has him. See that the law keeps him. — Greyson'},
  {id:'m_never_again', needCh:205, title:'Never Again', obj:{type:'steps', steps:[
     {label:'The separation is signed', spot:'separation_signed'},
     {label:'I will not remarry', spot:'never_remarry'},
     {label:'Her friends stand by her', spot:'friends_stand'},
     {label:'A sense of peace', spot:'sally_peace'},
     {label:'Sally returns to Dragonvale', spot:'sally_returns'}]}, rw:{xp:415000, gold:87000, rep:1040},
   subj:'Free', body:'Welcome her home. — Greyson'},
  {id:'m_fourth_record', needCh:206, title:'The Fourth Record', obj:{type:'steps', steps:[
     {label:'Adrian finds a fourth entry', spot:'fourth_found'},
     {label:'Same anomaly: name, seal, hidden isle', spot:'fourth_details'},
     {label:'Compare all four records', spot:'compare_four'},
     {label:'Used deliberately, across the realm', spot:'used_deliberately'},
     {label:'Expand the search', spot:'expand_search'}]}, rw:{xp:420000, gold:88000, rep:1050},
   subj:'Four', body:'Four is a design, not an accident. — Greyson'},
  {id:'m_eve_other_face', needCh:207, title:'Eve Gray\'s Other Face', obj:{type:'steps', steps:[
     {label:'Meet Eve', spot:'meet_eve'},
     {label:'Eve\'s knowledge', spot:'eve_knowledge'},
     {label:'The same names in different forms', spot:'eve_names'},
     {label:'Why Eve travels in disguise', spot:'eve_risks'},
     {label:'Work with Eve', spot:'work_with_eve'}]}, rw:{xp:425000, gold:89000, rep:1060},
   subj:'A scholar in disguise', body:'Listen to her. Ask nothing about her name. — Greyson'},
  {id:'m_pattern_kingdoms', needCh:208, title:'A Pattern Across Kingdoms', obj:{type:'steps', steps:[
     {label:'Regroup with Adrian', spot:'regroup'},
     {label:'Compare records side by side', spot:'side_by_side'},
     {label:'Link to the ancient alliance', spot:'alliance_link'},
     {label:'Erasures in Dragonvale\'s archives', spot:'dragonvale_erasures'},
     {label:'A system, not one crime', spot:'system_not_crime'},
     {label:'Map the network', spot:'map_network'}]}, rw:{xp:430000, gold:90000, rep:1070},
   subj:'A system', body:'Map it before you touch it. — Greyson'},
  {id:'m_name_travels', needCh:209, title:'The Name That Travels', obj:{type:'steps', steps:[
     {label:'The name appears again', spot:'name_appears'},
     {label:'Creature, title, place or role', spot:'creature_title_place'},
     {label:'Overlay the maps', spot:'overlay_maps'},
     {label:'Not one being', spot:'not_one_being'},
     {label:'A name that moves', spot:'name_framework'},
     {label:'Follow the pattern', spot:'follow_pattern'}]}, rw:{xp:435000, gold:91000, rep:1080},
   subj:'A framework', body:'A name that moves is a name with keepers. — Greyson'},
  {id:'m_beyond_fifteen', needCh:210, title:'Beyond the Fifteen', obj:{type:'steps', steps:[
     {label:'All the evidence points the same way', spot:'all_evidence'},
     {label:'The Traditional Fifteen Framework', spot:'fifteen_framework'},
     {label:'Entries that fit none of the Fifteen', spot:'beyond_entries'},
     {label:'Overlay the anomalies', spot:'overlay_anomalies'},
     {label:'The next phase of the investigation', spot:'next_phase'},
     {label:'Arc VIII closes', spot:'arc_closes'}]}, rw:{xp:440000, gold:92000, rep:1090},
   subj:'Beyond', body:'Then the old list was too short. Begin the new one. — Greyson'},
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
  {id:'q_smugglers', decision:'dec_smuggler', type:'kill', key:'smuggler', need:4, icon:'📦', name:'Smuggler\'s End', desc:'A smuggling ring slips past every watch.', rw:{xp:180, gold:90, rep:5}, needLoc:'faepool_harbour'},
  {id:'q_roads', decision:'dec_surrender', type:'kill', key:'road_bandit', need:5, icon:'🗡️', name:'Clear the Road', desc:'Bandits have been robbing carriages on the Coast Road.', rw:{xp:170, gold:85, rep:4}, needLoc:'faepool_harbour'},
  {id:'q_archers', type:'kill', key:'bandit_archer', need:4, icon:'🏹', name:'Ridge Watch', desc:'Archers pin carriages on the ridge. Remove them.', rw:{xp:170, gold:85, rep:4}, needLoc:'faepool_harbour'},
  {id:'q_assassins', decision:'dec_assassin', type:'kill', key:'masked_assassin', need:2, icon:'🥷', name:'Faceless Hire', desc:'Someone is paying for silence. Find the knives.', rw:{xp:300, gold:180, rep:10}, needLoc:'dark_inn'},
  {id:'q_wolves', decision:'dec_wolf_den', type:'kill', key:'forest_wolf', need:5, icon:'🐺', name:'Wolves at the Edge', desc:'The wolves have grown bold near the village.', rw:{xp:200, gold:90, rep:5}, needLoc:'faepool_forest'},
  {id:'q_xima', type:'kill', key:'xima_sprite', need:4, icon:'🧚', name:'Corruption in the Wood', desc:'Sprites touched by the curse blight the paths.', rw:{xp:260, gold:130, rep:8}, needLoc:'faepool_forest'},
  {id:'q_toads', type:'kill', key:'bog_toad', need:5, icon:'🐸', name:'Mahan\'s Kin', desc:'Bog toads clog the causeway.', rw:{xp:260, gold:130, rep:6}, needLoc:'frog_mahan'},
  {id:'q_raiders', decision:'dec_raider', type:'kill', key:'sea_raider', need:3, icon:'🏴‍☠️', name:'River Raiders', desc:'Ferries are being boarded at the mouth of the river.', rw:{xp:280, gold:170, rep:8}, needLoc:'river_crossing'},
  {id:'q_serpent', type:'kill', key:'river_serpent', need:1, icon:'🐍', name:'The Long Shadow', desc:'Boatmen refuse to cross the deep channel.', rw:{xp:450, gold:260, rep:14}, needLoc:'river_crossing'},
  {id:'q_drakes', type:'kill', key:'vale_drake', need:3, icon:'🦎', name:'Scale and Flame', desc:'Drakes have been nesting near the old road.', rw:{xp:420, gold:210, rep:10}, needLoc:'dragon_vale'},
  {id:'q_vig_magistrate', decision:'dec_magistrate', type:'kill', key:'road_bandit', need:4, icon:'🎭', name:'The Magistrate\'s Guards', desc:'A village reports higher taxes and guards who beat anyone who complains. Strike the thugs, not the law: proof comes first. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:380, gold:190, rep:10}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_vig_children', decision:'dec_children', type:'kill', key:'smuggler', need:3, icon:'🎭', name:'The Missing Children', desc:'Children vanish near the forest road. It is not demons. Someone is paying for them. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:480, gold:240, rep:14}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_vig_fever', decision:'dec_remedy', type:'collect', item:'forest_herb', need:5, icon:'🎭', name:'The Fever in the Hills', desc:'A village has an illness no healer knows. Bring herbs for Jenika\'s remedy. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:420, gold:200, rep:12}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_vig_warrior', decision:'dec_old_warrior', type:'kill', key:'relic_spirit', need:2, icon:'🎭', name:'The Old Warrior\'s Request', desc:'A retired soldier asks you to quiet the spirits haunting his old post. He studies your sword style a little too long. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:460, gold:230, rep:12}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_vig_beasts', type:'kill', key:'shade_beast', need:4, icon:'🎭', name:'Shadows on the Mountain Road', desc:'Corrupted spirit beasts hunt the old road at night and caravans no longer pass. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:520, gold:260, rep:14}, needLoc:'dragon_border', needCh:75, masked:true},
  {id:'q_vig_demons', decision:'dec_imp_nest', type:'kill', key:'imp', need:5, icon:'🎭', name:'Demons at the Border', desc:'Imps and lesser demons slip across the Dragonvale border at night. Thin them out before the villages notice. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:400, gold:200, rep:12}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_vig_ruins', type:'kill', key:'stone_sentinel', need:2, icon:'🎭', name:'The Waking Ruins', desc:'Old wardens have woken in the ruins above a village. Put them to rest. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:520, gold:260, rep:14}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_vig_drakes', decision:'dec_drake_eggs', type:'kill', key:'vale_drake', need:3, icon:'🎭', name:'Border Drakes', desc:'Drakes are raiding herds on the mountain road. (Masked contract · the Crimson Phoenix and the Silent Dragon)', rw:{xp:430, gold:220, rep:12}, needLoc:'dragon_vale', needCh:73, masked:true},
  {id:'q_herbs', type:'collect', item:'forest_herb', need:4, icon:'🌿', name:'Herbalist\'s Request', desc:'Bring 4 Faepool Herbs to any board.', rw:{xp:110, gold:80, rep:3}, needLoc:'faepool_forest'},
  {id:'q_glands', type:'collect', item:'toad_gland', need:4, icon:'🧫', name:'Apothecary Order', desc:'Bring 4 Toad Glands to any board.', rw:{xp:200, gold:130, rep:4}, needLoc:'frog_mahan'},
  {id:'q_fish', type:'collect', item:'river_fish', need:5, icon:'🐟', name:'Fresh Catch', desc:'The harbour market wants 5 River Fish.', rw:{xp:150, gold:100, rep:3}, needLoc:'river_crossing'},
  {id:'q_deliver', dynamic:'deliver'},
  // the Marroway files are generated on the Dragonvale Masked board by genMarroway() (ways.js) once Sally has asked for help
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
  const pool = QUEST_POOL.filter(q => q.dynamic || (locOpen(q.needLoc) && !taken.has(q.id) && (!q.needCh || G.ch >= q.needCh) && (loc==='dragon_vale' ? (q.masked || q.envoy) : (!q.masked && !q.envoy))));
  const marCase = loc==='dragon_vale' && typeof marOpen==='function' && marOpen() ? [genMarroway()] : [];
  const picks = pool.map(q => q).sort(() => Math.random()-.5).slice(0, 4 - marCase.length);
  bd.list = marCase.concat(picks.map(q => q.dynamic ? genDelivery(loc) : Object.assign({}, q, {c:0})).filter(Boolean));
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
  if(typeof questDecision==='function') questDecision(q, msgs);
  if(typeof questRepute==='function') questRepute(q, msgs);
  if(typeof rocIntel==='function') rocIntel(q, msgs);
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
  {ch:167, n:'The Black Tide, Reported', t:'Ships vanish along an abandoned maritime route in Dragonvale. After sunset the sea turns black, and some swear they have seen the towers of an ancient palace beneath the waves. The Fifteen Register lists the Black Tide: waters that swallow ships, a palace beneath the waves, an erased maritime boundary. Status: Unresolved. Caution: extreme danger.'},
  {ch:168, n:'Adrian and Eve Gray', t:'Adrian learned balance, breath and evasion instead of the sword, and carries smoke bombs, gas bombs and small grenades. He met Eve Gray on an assignment while she travelled disguised as a young man; she disappeared without explanation, and a trained pigeon has carried her letters ever since.'},
  {ch:169, n:'The Pearl That Remembers', t:'Devon\'s Black Dragon Pearl resonates with certain places on Dragonvale\'s old sea charts, most strongly over the region linked to the Black Tide. It may be older than Dragonvale\'s royal line, and it carries the same restorative energy that saved Sky.'},
  {ch:170, n:'The Silenced Records', t:'Dragonvale has suppressed its records of the Sunken Kingdom for generations: some are restricted, others have vanished. The maritime boundary of the old route is one the court officially denies ever existed.'},
  {ch:171, n:'Aelyndra', t:'A surviving chart names the drowned territory Aelyndra. The route once connected Dragonvale to a kingdom that no longer exists, and Dragonvale\'s historians hid it from the maps.'},
  {ch:172, n:'The Black Tide, First Manifestation', t:'On the forbidden waters the sea turns black after sunset and corrupted creatures rise to attack. Devon\'s Black Dragon Pearl raised a dome of light and drove the Black Tide back. It was not defeated; its source lies deeper still.'},
  {ch:173, n:'The Restoration Chambers', t:'Ancient restoration chambers still keep air-filled spaces beneath the ocean and connect the districts of the Sunken Kingdom. The pearl\'s resonance guides the party through them.'},
  {ch:174, n:'The Kingdom That Chose the Sea', t:'The Sunken Kingdom was not destroyed. Its royal council invoked powerful magic during the Dima and Xima crisis to lower the city beneath the sea and seal it away, to protect something vital. The records do not say what.'},
  {ch:175, n:'Maris Aurel, Tide Archivist', t:'Keeper of the Deep Archives, who has preserved fragments of the Sunken Kingdom\'s history in secret so that her ancestors would not vanish from memory. She guides the party but warns that the truth was buried on purpose.'},
  {ch:176, n:'The Restoration Anchor', t:'The Black Dragon Pearl is a restoration anchor that preserves damaged life force long enough for the spirit to recover. It cannot resurrect the dead. Yvette\'s jade pendant and the pearl together restored Sky: two ancient restoration traditions.'},
  {ch:177, n:'The Drowned Crown', t:'A royal will preserved beneath the waves: the kings and queens of the Sunken Kingdom, speaking as one. Dragonvale\'s histories called it a cursed monarch and a destroyer. It warns intruders away, and its dead guardians strike when the warning is ignored.'},
  {ch:178, n:'Roc\'s Inheritance', t:'After the kingdom was submerged, Roc\'s ancestors were granted maritime authority over its waters, together with the duty to protect what remained. Some honoured it; others suppressed the kingdom to avoid disputes over territory and inheritance. The privileges remained and the duty was forgotten.'},
  {ch:179, n:'A Crown Without a King', t:'The Drowned Crown is no king\'s ghost: it is a collective magical construct made by the royal council, holding their final memories, authority and judgments. It was made during the ancient crisis to keep outsiders from the deepest preservation chamber until they understood why the kingdom had submerged itself. Later historians classed it among the Fifteen Evils because they never understood that.'},
  {ch:180, n:'The Trial of the Drowned Court', t:'The Crown tests visitors with the questions the council once faced: duty, sacrifice and rulership. Jade rejected the false choice between sacrificing two kingdoms, and the Crown recognised a different path: its command can be fulfilled without repeating the tragedies of the past.'},
  {ch:181, n:'The Black Tide: Corrupted Manifestation', t:'The Black Tide returned, swollen by corruption gathering around the failing preservation magic, and attacked the ships above and the ruins below. Sky read it as a natural spiritual force that centuries of magical damage twisted. It had once been a guardian current, part of the kingdom\'s natural balance.'},
  {ch:182, n:'The Black Tide, Restored', t:'With Devon\'s pearl, Sky\'s restorative energy through the ancient network and Jade defending the ritual, the Black Tide was restored to its spiritual nature as a guardian of the sea. The Register records it as Restored, and the Drowned Crown as a Preservation Construct, not an Evil: five of the Fifteen resolved.'},
  {ch:183, n:'The Ancient Alliance', t:'In the deepest archive: a maritime alliance of Dragonvale, Tribute, the Sunken Kingdom and several civilizations that have since vanished, which shared knowledge, resources and spiritual defences, and mattered most in the Dima/Xima crisis. After the crisis the routes were erased and records altered; the archive does not say why or by whom.'},
  {ch:184, n:'The Pearl Is a Trust', t:'The Black Dragon Pearl was entrusted to Devon\'s ancestors by the Sunken Kingdom to be carried until the restoration network was needed again. The Drowned Crown returned its authority to Devon, who accepted the responsibility.'},
  {ch:185, n:'The Sea Remembers', t:'Dragonvale restored the Sunken Kingdom to its official records, a monitored maritime route was reopened, and the corrected history was sent out through Sally\'s network. The Register may have been shaped by politics, misunderstanding and deliberate alteration: its names may describe victims, guardians and forgotten systems. And one remaining name has been recorded in three kingdoms at the same moment, Year 712, 3rd Month, 14th Day.'},
  {ch:186, n:'The Impossible Entry', t:'One of the remaining Register names appears in historical accounts from Tribute, Dragonvale and the Sunken Kingdom, with identical dates and different locations. No copying error was found.'},
  {ch:187, n:'The Records Are Genuine', t:'Adrian verified the translations, calendars and writing styles of all three accounts and checked the originals: the records are consistent with each kingdom\'s own, and there is no evidence of copying.'},
  {ch:188, n:'Three Accounts of One Name', t:'Tribute records it as a visitor who arrived without escorts, Dragonvale as a natural phenomenon witnessed near the northern border, and the Sunken Kingdom as a figure at a ritual at the coastal ruins. The party\'s hypotheses: a linked event, a title or role, a phenomenon, or a Register that records more than creatures.'},
  {ch:189, n:'A Neutral City', t:'Neutral maritime archives, scholarly organisations and private collections may hold records that were not shaped by Tribute, Dragonvale or the Sunken Kingdom. A neutral trade city is known to keep records from several kingdoms, including some erased elsewhere.'},
  {ch:190, n:'Haiyue Port', t:'Tribute\'s records call it Haiyue Port (Sea-Moon Port), a neutral trade hub; Dragonvale\'s, Moonreach (Moon Bridge), a trading post with restricted cargo and closed ledgers; the Sunken Kingdom\'s, Yueluo (Moon Anchorage), a sacred port and the meeting place of three tides. Destinations in later copies of the ship records were altered or omitted.'},
  {ch:191, n:'Lucien Marroway', t:'A respected nobleman known for his integrity, diplomatic skills and quiet kindness. He married Sally after months of quiet conversations and growing trust, and treated her as a partner, not as a fallen woman.'},
  {ch:192, n:'Lady Sally Sun', t:'Sally Sin, now Lady Sally Sun (the noble name she took), returned to public life after her marriage, often accompanied only by her handmaiden.'},
  {ch:193, n:'The Handmaiden', t:'Sally\'s handmaiden, with her since before the marriage, worries about Levi Stanson. Sally answers that she and Levi are from different paths now.'},
  {ch:194, n:'The Price of Obedience', t:'Villages under Marroway House pay levies for \'road maintenance\' and \'security\'; grain and children are taken for labour, and those who refuse are punished. Some who left for \'one season\' were never heard of again.'},
  {ch:195, n:'Beneath a Noble Name', t:'Taxes far higher than the official levy tables; goods listed for the capital never leave the region and are rerouted through Marroway\'s private stores. Three families disappeared after refusing the new levy.'},
  {ch:196, n:'A Woman\'s Testimony', t:'A survivor who once worked at a Marroway-controlled warehouse spoke on condition that her name is never written: orders came through Marroway\'s stewards and officers, disobedience was called treason, and women who refused were sent away.'},
  {ch:197, n:'The Marroway Ledger', t:'A hidden ledger of payments labelled \'escort fees\', \'protection\' and \'labour relocation\', matching the villages visited, with coded entries that seem to refer to people and crossed-out lines still legible. Key pages were copied and kept apart.'},
  {ch:198, n:'Carly', t:'Sally\'s trusted handmaiden, who has been with her since before the marriage. She quietly gathered the evidence against Marroway House and asked Jade\'s party for protection, not revenge.'},
  {ch:199, n:'Marroway House at Night', t:'Crates marked "grain" held medicine and high-value goods; an agents\' token that is not in the household records; a hidden storage room listing payments to enforcers, routes, and the names of villagers and women marked for relocation.'},
  {ch:200, n:'The Aristocrat\'s Mask', t:'Lucien Marroway realised someone was investigating him, suspected a servant close to Sally (or Sally herself), tightened the household and threatened his servants.'},
  {ch:201, n:'The Villagers\' Stand', t:'A safe meeting place outside Lucien\'s control, where villagers and women testified under protected names. Safe houses and escorts were arranged for anyone at risk.'},
  {ch:202, n:'A Name Is Accountability', t:'Devon resolved to use his name, influence and the royal channels to support the case and push for reform in noble and royal circles where such abuses are ignored.'},
  {ch:203, n:'Sally Leaves', t:'Sally left Lucien Marroway: "I choose myself." She took only what was hers.'},
  {ch:204, n:'The Fall of Marroway', t:'Jade presented the ledgers, delivery records, testimonies and cover-ups. Lucien Marroway was taken into custody to face formal charges. Protection and compensation were arranged for those he harmed.'},
  {ch:205, n:'Never Again', t:'After roughly half a year of marriage, Sally completed her separation from Lucien and declared that she will not remarry. She returned to Dragonvale as herself.'},
  {ch:206, n:'The Fourth Record', t:'A regional Register from several years earlier holds a fourth instance of the impossible entry, in another place under another name, with the same unrecognised seal, the same phrasing and a reference to the hidden isle.'},
  {ch:207, n:'Eve Gray', t:'A scholar travelling in male disguise. She knows the archives, the hidden networks and decades of linked records; the same names in different forms across places. Some people would silence her. She chose to work with Jade\'s party.'},
  {ch:208, n:'The Pattern Across Kingdoms', t:'The contradictions in the records link to the ancient alliance of chapter 183: the same symbol and oath in different kingdoms, deliberate erasures even in Dragonvale\'s own archives, a system built to last.'},
  {ch:209, n:'The Name That Travels', t:'The name is a creature in some records, a title, a place or a role passed between people in others: a framework, not a single being. A map links the North Kingdom, the Western Isles, Dragonvale, the Southern Ports and the Eastern Coast.'},
  {ch:210, n:'Beyond the Fifteen', t:'The Register records anomalies that fit none of the Traditional Fifteen categories (Celestial, Abyssal, Infernal, Bestial, Fae, Elemental, Undead, Spiritual, Construct, Aetherial, Vile, Blessed, Human, Draconic, Unknown): the next investigation.'},
  {ch:999, n:'Faepool Territory', t:'A border region of forests and traditional villages. Something interferes with Jade\'s clairvoyance here.'},
  {ch:999, n:'The Hidden Message', t:'An unexpected message suggests the curse, Jade\'s visions and the people around her may be connected.'},
  {ch:999, n:'Ancient Records', t:'Records recovered from the Faepool ruins. The disturbances are not random: they belong to one pattern.'},
  {ch:999, n:'Xima (draft)', t:'The source of the curse, and the ancient witch whose magic shaped Tribute\'s history. The curse may have multiple layers.'},
  {ch:999, n:'Ancient Magic', t:'Old magic leaves traces in stone and blood. Jade\'s visions respond to it.'},
  {ch:999, n:'Tribute History', t:'How the island came to be bound by the curse. Many pages are still missing.'},
  {ch:999, n:'Dima\'s Legacy', t:'Jade\'s golden blood connects her to Dima. The records speak of a sanctuary, location unknown.'},
  {ch:999, n:'The Black Pearl', t:'Devon\'s inheritance. Dragon Empowerment, Ancient Dragon Knowledge and Dragon Manifestation.', party:'devon'},
];
