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
// Chapter that opens the optional Fallen Prince's Trial (Abyssal Frontier + its letter). Author is deciding: change this one number.
const TRIAL_CH = 77;
const REGIONS = {
  tribute:{n:'Tribute Island', icon:'🏯'}, faepool:{n:'Faepool Territory', icon:'🌲'},
  border:{n:'Border & Sea Areas', icon:'🌊'}, dragon:{n:'Dragon Vale', icon:'🐉'}, unknown:{n:'Unknown Lands', icon:'❔'}
};
// unlock: {ch:n} story chapter n completed | {flag:'x'} | null = always.   PROVISIONAL chapter numbers.
// kind: hub | town | harbour | field | story | boss | sea | region | unknown     (settlements receive pigeons)
// spot kinds: palace training archive garden tavern board hunt gather investigate boss
const LOCATIONS = {
  capital:{ n:'Imperial Capital', region:'tribute', kind:'hub', icon:'🏯', unlock:null, img:'assets/areas/imperial_capital.webp',
    desc:'Seat of King Greyson. Main hub: missions, training, shops and story.',
    spots:[
      {id:'palace', kind:'palace', n:'Imperial Palace', icon:'👑', img:'assets/areas/imperial_palace.webp', desc:'King Greyson, his advisors and the court. Main missions are issued here.'},
      {id:'training', kind:'training', n:'Imperial Guard Training Grounds', icon:'⚔️', img:'assets/areas/training_grounds.webp', desc:'Safe zone. No monsters. Sword practice, meditation and ability training.'},
      {id:'archive', kind:'archive', n:'Imperial Archive', icon:'📚', desc:'The Codex: history, prophecy, Xima research and Dima\'s records.'},
      {id:'garden', kind:'garden', n:'Imperial Garden', icon:'🌸', img:'assets/areas/imperial_garden.webp', desc:'Quiet meditation, bond scenes and character events.'},
      {id:'hall', kind:'board', n:'Notice Board', icon:'📜', ch:3, desc:'Contracts and bounties for the party.'},
      {id:'gift_stall', kind:'gift', n:'Moon-Blossom Tea Stall', icon:'🍵', ch:88, desc:'A tea and herb stall that sells a gift set for a healer who asks for nothing.'},
      {id:'streets', kind:'tavern', n:'City Streets & Tavern', icon:'🍶', ch:3, desc:'Meals and rumours.'}]},
  gold_residence:{ n:'Gold Residence', region:'tribute', kind:'story', icon:'🏡', unlock:{ch:89},
    desc:'The Gold family home in Tribute: golden trees, a training court and a long table. Jade\'s family: Unique Gold, Elara Valor and Adrian Gold.',
    spots:[
      {id:'gold_home', kind:'goldhome', n:'Family Home', icon:'🏡', ch:90, desc:'Dinner with the family, the training court and old stories. Once a day each.'},
      {id:'gold_albums', kind:'investigate', n:'Family Albums and Portraits', icon:'🖼️', ch:92, need:3, ambush:[], lo:1,
       desc:'Old portraits and letters about Elara\'s sister, Yvette Sue Valen.',
       clues:['A framed portrait: Elara and her half-sister Yvette Sue Valen, a healer. They shared a mother but not a gift.','Elara\'s visions could not find Yvette: no trace, as if she vanished from this world.','Sky\'s healing is like Yvette\'s technique, and his face and manner remind the family of her.'], rw:{xp:1200, gold:300}},
      {id:'yvette_trace', kind:'investigate', n:'Yvette\'s Trail', icon:'🧭', ch:99, need:3, ambush:[], lo:1, desc:'What happened to Yvette Sue Valen, and where Sky\'s pendant went. Sealed until the story reaches it.', clues:['...','...','...'], rw:{xp:2500, gold:800}}]},
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
      {id:'shrine', kind:'meditate', n:'Vigil Shrine', icon:'⛩️', ch:99, desc:'Meditation and ancient teachings to strengthen Jade\'s clairvoyance.'},
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
  faepool_ruins:{ n:'Faepool Ruins', region:'faepool', kind:'story', icon:'🌫', unlock:{ch:99},
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
  river_crossing:{ n:'River Crossing', region:'border', kind:'sea', icon:'🌊', unlock:{ch:99},
    desc:'Reached by sea: boat exploration, fishing and sea encounters.',
    spots:[
      {id:'open_water', kind:'hunt', n:'Open Water', icon:'🏴‍☠️', desc:'Raiders and storm wisps.', pool:['sea_raider','storm_wisp'], elite:'river_serpent', lo:10},
      {id:'fishing', kind:'gather', n:'Fishing', icon:'🎣', desc:'Cast a line.', loot:[{id:'river_fish',qty:[1,3]}], bonus:{id:'sea_pearl',chance:.15}, ambush:['storm_wisp'], lo:10}]},
  booyeong_camp:{ n:'Booyeong\'s Camp', region:'faepool', kind:'story', icon:'⛺', unlock:{ch:20},
    desc:'A bandit camp in the forest. Booyeong\'s territory suppresses powers. Prison, cliffs and ravine.',
    spots:[{id:'camp_hunt', kind:'hunt', n:'The Camp', icon:'🗡️', desc:'Booyeong\'s men.', pool:['booyeong_guard','bandit_archer','road_bandit'], lo:8}]},
  trial_grounds:{ n:'Ancient Trial Grounds', region:'faepool', kind:'story', icon:'⚔️', unlock:{ch:99},
    desc:'An old arena that tests a party\'s teamwork. Combination attacks matter here.',
    spots:[{id:'trial', kind:'hunt', n:'The Trials', icon:'🗿', desc:'Guardians of the old trial.', pool:['stone_sentinel','relic_spirit'], lo:12}]},
  hidden_village:{ n:'Hidden Village', region:'faepool', kind:'town', icon:'🏘', unlock:{ch:99},
    desc:'A settlement that chose to hide from Xima\'s conflict. Side quests, trading and local relationships.',
    spots:[
      {id:'tavern', kind:'tavern', n:'Hidden Village Inn', icon:'🍶', desc:'Quiet people with long memories.'},
      {id:'board', kind:'board', n:'Village Board', icon:'📜', desc:'Contracts from the residents.'},
      {id:'edge', kind:'hunt', n:'Village Edge', icon:'🐺', desc:'Beasts at the settlement\'s border.', pool:['forest_wolf','thorn_boar','xima_sprite'], lo:12}]},
  corrupted_forest:{ n:'Corrupted Forest', region:'faepool', kind:'field', icon:'🌫', unlock:{ch:99},
    desc:'Xima\'s influence has taken hold here. Elite monsters, rare rewards and challenge encounters.',
    spots:[
      {id:'blight', kind:'hunt', n:'The Blight', icon:'🦌', desc:'Corrupted creatures and elite hunters.', pool:['xima_sprite','thorn_boar','shade_wraith'], elite:'corrupted_stag', lo:14},
      {id:'shards', kind:'gather', n:'Gather Xima Shards', icon:'🔻', desc:'Dangerous but valuable.', loot:[{id:'xima_shard',qty:[1,1]}], bonus:{id:'relic_dust',chance:.3}, ambush:['xima_sprite','shade_wraith'], lo:14}]},
  faepool_borderlands:{ n:'Faepool Borderlands', region:'faepool', kind:'field', icon:'🌲', unlock:{ch:99},
    desc:'The edge of Faepool, where the party\'s road starts to change.',
    spots:[{id:'border_hunt', kind:'hunt', n:'The Borderlands', icon:'🗡️', desc:'Bandits and wild beasts.', pool:['road_bandit','bandit_archer','forest_wolf','masked_assassin'], lo:14}]},
  faepool_settlement:{ n:'Faepool Settlement', region:'faepool', kind:'town', icon:'🏘', unlock:{ch:99},
    desc:'A settlement where a mysterious stranger waits.',
    spots:[
      {id:'tavern', kind:'tavern', n:'Settlement Tavern', icon:'🍶', desc:'Meals and rumours.'},
      {id:'board', kind:'board', n:'Settlement Board', icon:'📜', desc:'Contracts and bounties.'}]},
  reunion_area:{ n:'Reunion Area', region:'faepool', kind:'story', icon:'🏹', unlock:{ch:99},
    desc:'Where an old ally returns.',
    spots:[{id:'reunion_camp', kind:'tavern', n:'Reunion Camp', icon:'⛺', desc:'Share a meal around the fire.'}]},
  dragon_vale:{ n:'Dragonvale', region:'dragon', kind:'hub', icon:'🐉', unlock:{ch:44, flag:'bracelet'},   // opens only once the king's bracelet is received (ch44), for the trip to save Sky; the first chapter there is 45
    desc:'The white palace on the waterfall cliffs. Jade is received only as a guest and kept within the inner palace. Court politics and the Royal Healing Pavilion.',
    spots:[
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
      {id:'vale', kind:'hunt', n:'The Vale', icon:'🦎', ch:99, desc:'Drakes and old guardians (closed while Jade is confined to the palace).', pool:['vale_drake','stone_sentinel','relic_spirit'], lo:14},
      {id:'sanctuary', kind:'investigate', n:'Dragon Sanctuary', icon:'⛩️', need:3, ambush:['stone_sentinel','relic_spirit'], lo:15, party:'devon', ch:99,
       desc:'Ancient trials and the Black Pearl storyline. Sealed.',
       clues:['A sealed inscription describes the first Pearl bearer.','The wards answer to a royal dragon bloodline.','A trial chamber opens beneath the altar.'], rw:{xp:420, gold:150}},
      {id:'pearl', kind:'boss', n:'Pearl Chamber', icon:'🔮', desc:'Special dungeon. Reward: Black Pearl related ability.', boss:'boss_pearl_guardian', add:['relic_spirit'], lo:18, party:'devon', ch:99, needFlag:'inv_sanctuary'}]},
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
      {id:'ruins_depths', kind:'investigate', n:'Beneath the Ruins', icon:'🕳️', need:3, ambush:['shade_beast','relic_spirit'], lo:19, ch:99, needFlag:'inv_border_ruins', lockMsg:'🔒 The way beneath is sealed until the story reaches it',
       desc:'The source of the spirit disturbance. Sealed until the story reaches it.', clues:['...','...','...'], rw:{xp:1500, gold:500}},
      {id:'eastern_village', kind:'investigate', n:'Eastern Border Village', icon:'🏘️', ch:85, need:3, ambush:['shade_beast','imp'], lo:21,
       desc:'A remote village plagued by corrupted spirits and restless creatures. The disturbances have grown more frequent near the eastern border.',
       clues:['The village has been living in fear: the barrier near the mountain shrine has weakened.','Reports from the eastern border: the disturbances are more frequent each week.','Greyson: the border disturbances, the awakened creatures and the weakened barriers are connected.'], rw:{xp:1500, gold:500}},
      {id:'mountain_shrine', kind:'investigate', n:'Mountain Shrine Barrier', icon:'⛩️', ch:85, need:3, ambush:['shade_beast'], lo:21, needFlag:'inv_eastern_village', lockMsg:'🔒 Visit the eastern village first',
       desc:'The ancient barrier near the mountain shrine, disturbed by lingering consequences of past forbidden events.',
       clues:['The barrier is flickering: the seal needs royal magic to steady it.','The seal is healing under their combined strength: Dragonvale\'s spirit still endures.','As the final seal is restored: "The path continues beyond this kingdom."'], rw:{xp:1800, gold:600}},
      {id:'spirit_caves', kind:'gather', n:'Spirit Caves', icon:'🕳️', ch:77, desc:'Caves where purified spirit energy gathers. Herbs and relic dust.', loot:[{id:'forest_herb',qty:[1,3]},{id:'relic_dust',qty:[1,2]}], ambush:['shade_beast'], lo:18},
      {id:'cultivation_grounds', kind:'meditate', n:'Cultivation Grounds', icon:'🧘', ch:77, desc:'A calm terrace for meditation and spirit training.'},
      {id:'border_hunt', kind:'hunt', n:'Mountain Road', icon:'🐺', desc:'Shadow beasts prowl the old road at night.', pool:['shade_beast','imp'], lo:17}]},
  dragon_ruins:{ n:'Ancient Dragonvale Ruins', region:'dragon', kind:'story', icon:'🏛️', unlock:{ch:76},
    desc:'A three-floor dungeon of ancient halls, a spirit chamber and the heart of Dragonvale\'s oldest seal. Corrupted spirits walk the dark.',
    spots:[
      {id:'forgotten_hall', kind:'investigate', n:'Forgotten Hall (Floor 1)', icon:'🕯️', need:3, ambush:['shade_beast','relic_spirit'], lo:18,
       desc:'Spirit lamps, broken formations and old inscriptions. Jade reads the battle formations; Devon senses the magic.',
       clues:['Spirit lamps line the hall; lighting them in order restores a broken formation (Devon\'s Royal Spirit Sense).','Hidden paths and trap plates are visible to a trained eye (Jade\'s Warrior\'s Insight).','The inscriptions describe a seal core that stirred when something forced it to respond.'], rw:{xp:1200, gold:420}},
      {id:'spirit_chamber', kind:'hunt', n:'Corrupted Spirit Chamber (Floor 2)', icon:'☠️', desc:'Stronger corrupted spirits. Jade weakens them; Devon\'s purification finishes them.', pool:['shade_beast','relic_spirit','shade_wraith'], lo:18},
      {id:'guardian', kind:'boss', n:'Ancient Guardian Spirit', icon:'🗿', desc:'Not evil: it tests the one who comes. Jade breaks its core, Devon purifies.', boss:'boss_guardian_spirit', add:['relic_spirit'], lo:19, needFlag:'inv_forgotten_hall', lockMsg:'🔒 Investigate the Forgotten Hall first'},
      {id:'central_chamber', kind:'boss', n:'Central Chamber: the Seal Core', icon:'🐉', ch:77, desc:'The ancient seal core of Dragonvale, corrupted by whoever forced it to respond.', boss:'boss_spirit_core', add:['shade_beast','shade_beast'], lo:20, needFlag:'boss_boss_guardian_spirit', lockMsg:'🔒 The way is sealed until the Guardian is answered'},
      {id:'seal_study', kind:'investigate', n:'Who Stirred the Seals', icon:'📜', ch:99, need:3, ambush:['shade_beast'], lo:20, desc:'Evidence of the hidden hand. Sealed until the story reaches it.', clues:['...','...','...'], rw:{xp:2000, gold:600}}]},
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
  dima_sanctuary:{ n:'Dima\'s Sanctuary', region:'unknown', kind:'unknown', icon:'🌙', unlock:{ch:99}, desc:'Jade\'s destiny: bloodline revelations, true purpose.', spots:[]},
  xima_realm:{ n:'Xima Realm', region:'unknown', kind:'unknown', icon:'🌑', unlock:{ch:99}, desc:'Late game: ancient evil, the curse\'s source, final mysteries.', spots:[]},
};
const LOC_ORDER = Object.keys(LOCATIONS);
const isSettlement = id => ['hub','town','harbour'].includes(LOCATIONS[id].kind);
const unlockMet = u => !u || ((u.ch===undefined || G.ch >= u.ch) && (!u.flag || G.flags[u.flag]));
const locOpen = id => unlockMet(LOCATIONS[id].unlock);
const unlockText = u => !u ? '' : (u.ch>=99 ? 'Unknown — story not yet written' : (u.ch!==undefined ? 'Reach chapter '+u.ch : '')+(u.flag?' · '+u.flag:''));
function spotLock(sp){
  if(sp.ch!==undefined && G.ch < sp.ch) return '🔒 Reach chapter '+sp.ch;
  if(sp.party && !isRecruited(sp.party)) return '🔒 Needs '+CHARACTERS[sp.party].n.split(' ')[0]+'\'s Ancient Dragon Knowledge';
  if(sp.needFlag && !G.flags[sp.needFlag]) return sp.lockMsg || '🔒 Sealed — complete the Dragon Sanctuary first';
  return '';
}

// Some story chapters must be started on location (PROVISIONAL). {chapter: locationId}
// Chapters whose story must be started on location. Tune freely: {chapter: locationId}
const CH_LOC = { 89:'capital', 90:'gold_residence', 91:'gold_residence', 92:'gold_residence', 93:'gold_residence', 94:'gold_residence', 87:'dragon_vale', 84:'dragon_vale', 86:'dragon_vale', 78:'dragon_vale', 79:'dragon_vale', 80:'moonveil_temple', 81:'dragon_vale', 82:'dragon_vale', 83:'dragon_vale', 85:'dragon_border', 74:'dragon_vale', 76:'dragon_border', 77:'dragon_ruins', 75:'dragon_vale', 63:'dragon_vale', 64:'dragon_vale', 65:'dragon_vale', 66:'dragon_vale', 67:'dragon_vale', 68:'dragon_vale', 69:'dragon_vale', 70:'dragon_vale', 71:'dragon_vale', 72:'dragon_vale', 73:'dragon_vale', 61:'dragon_vale', 62:'dragon_vale', 57:'dragon_vale', 58:'dragon_vale', 59:'dragon_vale', 60:'cavern_fireflies', 52:'dragon_vale', 53:'dragon_vale', 54:'dragon_vale', 55:'dragon_vale', 56:'dragon_vale', 44:'capital', 45:'dragon_vale', 46:'dragon_vale', 47:'dragon_vale', 48:'dragon_vale', 49:'dragon_vale', 50:'dragon_vale', 51:'dragon_vale', 12:'dark_inn', 16:'vigil_village', 17:'vigil_village', 18:'vigil_village', 19:'faepool_forest', 21:'faepool_forest', 22:'booyeong_camp', 23:'booyeong_camp', 24:'booyeong_camp', 25:'faepool_forest', 26:'vigil_village', 27:'booyeong_camp', 28:'vigil_village', 29:'vigil_village', 30:'vigil_village' };   // chapters that must start on location (ch12 begins at the inn). More are added as chapters are converted.
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
  if(rw.xp) gainXp(rw.xp, G.party).forEach(m => msgs.push(m));
  if(rw.gold) G.gold += rw.gold;
  if(rw.rep) G.rep += rw.rep;
  if(rw.items){ addItems(rw.items); rw.items.forEach(d => msgs.push('Received '+(ITEMS[d.id]?ITEMS[d.id].icon+' '+ITEMS[d.id].n:d.id)+' ×'+d.qty)); }
  if(rw.flag){ G.flags[rw.flag] = true; msgs.unshift('✦ '+(FLAG_LABEL[rw.flag]||rw.flag)+' unlocked'); }
  msgs.unshift(label+' · '+[rw.xp&&'+'+rw.xp+' XP', rw.gold&&'+'+rw.gold+'g', rw.rep&&'+'+rw.rep+' renown'].filter(Boolean).join(' · '));
  return msgs;
}
const FLAG_LABEL = { bracelet:'Communication Bracelet', crossbow:'Levi\'s Crossbow', jade_awakened:'Golden Blood Awakening', roc_trial_p1:'Shadow of Roc defeated', roc_trial_p2:'The Shadow Crown ended by Roc\'s own blade', roc_purified:'Roc is purified', roc_reborn:'Roc is reborn: Dark Dragon Aura', gold_family_met:'Jade\'s family: the Gold residence', sky_resembles_yvette:'Sky looks like Yvette Sue Valen', sky_pendant_lost:'Sky\'s jade pendant is lost', ghost_healer_met:'The Ghost Healer travels with the party', ghost_trust:'The Ghost Healer trusts you: Ancient Remedy', ghost_gift_bought:'A gift for the Ghost Healer bought', ghost_gifted:'Gift given to the Ghost Healer', dragonvale_honoured:'Honoured by Dragonvale', aster_crown_prince:'Aster is Crown Prince of Dragonvale', dv_purify:'Devon: Spirit Purification', partner_actions:'Partner action: Guardian\'s Promise', princess_guardian:'Jade: Princess Guardian', royal_spirit_authority:'Devon: Royal Spirit Authority', twin_dragon:'Couple skill: Twin Dragon Harmony', dv_exploration:'Dragonvale exploration areas', roc_exiled:'Roc is exiled from Dragonvale', liora_apart:'Liora stays in Dragonvale; letters follow', seraphina_free:'Seraphina is free: the Divorce Scroll from King Chadstone', liora_ward:'Liora is in Jade and Devon\'s care', levi_reborn:'Levi returns, reborn', sally_stays:'Sally stays in Dragonvale as a rumour source', chad_dark_deep:'Roc\'s dark arts deepen', chad_backlash_1:'Dark-magic backlash (Roc): stats permanently altered', chad_backlash_2:'Dark-magic backlash worsens (Roc)', chad_backlash_3:'Dark-magic backlash, final (Roc)', roc_severed:'Bond with Roc Chadwick severed', jade_poisoned:'Jade is poisoned (slow-acting)', royal_attire:'Daily Royal Attire and Phoenix Guard attire', sally_gossip:'Sally\'s court gossip', chad_dark_arts:'Chad\'s dark arts', greyson_arms:'Greyson\'s dagger and flail unsealed', greyson_gift:'Greyson\'s gift received', cleansing_touch:'Cleansing Touch (Jade)', sally_noble:'Sally\'s noble title and Noble Grace' };

/* ---------------- DAY CLOCK ---------------- */
function advanceDay(n){
  G.day += n; if(n>0 && typeof healParty==='function') healParty(Math.min(.5,.1*n)); refreshBounties();
  return deliverLetters().concat(checkMissionOffers(), typeof famTick==='function' ? famTick() : []);
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
     {label:'Find what became of Yvette Sue Valen and Sky\'s jade pendant', spot:'yvette_trace'}]}, rw:{xp:5000, gold:1500, rep:40},
   subj:'A family\'s question', body:'Jade, your family told me about Yvette Sue Valen. A healer who vanished without a trace from a family of seers is not a small thing, and the boy who looks like her is not a coincidence. Look into it quietly. — Greyson'},
  {id:'m_fallen_trial', needCh:TRIAL_CH, title:'The Fallen Prince\'s Trial (optional)', obj:{type:'steps', steps:[
     {label:'Investigate the dark energy at the Exile Border', spot:'exile_trail'},
     {label:'Face the Shadow of Roc', flag:'roc_trial_p1'},
     {label:'Let Roc end the Shadow Crown himself', flag:'roc_trial_p2'},
     {label:'Purify Roc', flag:'roc_purified'}]}, rw:{xp:6000, gold:2000, rep:40, items:[{id:'dragon_crystal',qty:3}]},
   subj:'A rumour from the exile border', body:'Reports from the Dragonvale border: monsters gathering, villagers gone, a dark energy that does not behave like a war. I do not think it is only a monster. If you choose to look, you will find someone you used to know. This is not a command, Jade. It is a choice. — Greyson'},
  // ---- DRAFT, NOT CANON (parked at ch99 until the real chapter text is converted) ----
  {id:'m_wild', needCh:99, title:'Beyond the Walls', obj:{type:'reach', loc:'tribute_wilderness'}, rw:{xp:120, gold:60},
   subj:'Your first mission outside the city', body:'The time has come to leave the capital. Take your companions out along the Imperial Road and see what the wilderness hides. Use the horse carriage; the roads are not always quiet. — Greyson'},
  {id:'m_harbour', needCh:99, title:'Into Faepool', obj:{type:'reach', loc:'faepool_harbour'}, rw:{xp:150, gold:70},
   subj:'Faepool awaits', body:'Continue to Faepool Harbour, the gateway to the border region. Report anything strange. — Greyson'},
  {id:'m_forest', needCh:99, after:'m_harbour', title:'Thin the Faepool Wilds', obj:{type:'kill', area:'forest', need:6, label:'forest creatures'}, rw:{xp:200, gold:90, items:[{id:'herbal_tonic',qty:2}]},
   subj:'Trouble in the forest', body:'Travellers speak of corrupted beasts in Faepool Forest. Clear six of them from the paths. Be careful of anything that glows. — Greyson'},
  {id:'m_vigil', needCh:15, title:'The First Village', obj:{type:'reach', loc:'vigil_village'}, rw:{xp:220, gold:100},
   subj:'Vigil Village', body:'Faepool is a land of traditional forest villages. Go to Vigil Village and find the cause of the unrest; my pigeon will find you with updates. — Greyson'},
  {id:'m_frog', needCh:20, title:'The Swamp Warlord', obj:{type:'boss', key:'boss_frog_mahan'}, rw:{xp:500, gold:260, rep:10},
   subj:'Frog Mahan', body:'Frog Mahan lies beyond the forest, three weeks on foot. One of Xima\'s underlings. End it. — Greyson'},
  {id:'m_ruins', needCh:99, title:'The Forgotten Ruins', obj:{type:'investigate', spot:'ruins_clues'}, rw:{xp:320, gold:140},
   subj:'Ancient records', body:'There are ruins beneath Faepool older than the Crown\'s records. Study them. Whatever Jade sees there, write it down. — Greyson'},
  {id:'m_inn', needCh:99, title:'Shadows at the Dark Inn', obj:{type:'investigate', spot:'inn_clues'}, rw:{xp:380, gold:160},
   subj:'An inn that should be empty', body:'An inn on the old forest road has swallowed three of my scouts. Go there and find out why. Search every room. — Greyson'},
  {id:'m_river', needCh:99, title:'Across the Sea', obj:{type:'reach', loc:'river_crossing'}, rw:{xp:420, gold:190},
   subj:'The sea route', body:'Take ship from Faepool Harbour. We need to know whether the water is passable and who controls it. — Greyson'},
  {id:'m_trial', needCh:99, title:'The Ancient Trial', obj:{type:'reach', loc:'trial_grounds'}, rw:{xp:500, gold:200},
   subj:'An old arena', body:'My scholars place an arena of the ancients beyond the ruins. Take the party there; strength alone will not be enough. — Greyson'},
  {id:'m_hidden', needCh:99, title:'The Hidden Village', obj:{type:'reach', loc:'hidden_village'}, rw:{xp:520, gold:210},
   subj:'People who chose to hide', body:'Some of my subjects fled Xima\'s conflict and were never found. If you find them, listen before you ask. — Greyson'},
  {id:'m_corrupt', needCh:99, title:'The Blight', obj:{type:'kill', key:'corrupted_stag', need:2, label:'Corrupted Stags'}, rw:{xp:650, gold:260, rep:10},
   subj:'The forest is dying', body:'Reports say stags once sacred to the forest are now carriers of the curse. Put down two of them. — Greyson'},
  {id:'m_reunion', needCh:99, title:'A Reunion', obj:{type:'reach', loc:'reunion_area'}, rw:{xp:800, gold:300},
   subj:'Someone has been seen', body:'A scout swears he saw a man with a crossbow on the wilderness route. Go to the Reunion Area. — Greyson'},
  {id:'m_bracelet', needCh:99, title:'A Gift from the Crown', obj:{type:'read'}, rw:{xp:150, gold:0, flag:'bracelet'},
   subj:'Pigeons are too slow', body:'Wear this bracelet. It will carry my voice to you anywhere on the island, and yours to me. No more waiting on birds. — Greyson'},
  {id:'m_dragon', needCh:99, title:'Dragon Vale', obj:{type:'reach', loc:'dragon_vale'}, rw:{xp:700, gold:300},
   subj:'The Vale awakens', body:'The old accounts say the Vale answers only to a certain bloodline. Bring Devon. — Greyson'},
  {id:'m_pearl', needCh:99, after:'m_dragon', title:'The Dragon Sanctuary', obj:{type:'investigate', spot:'sanctuary'}, rw:{xp:900, gold:400, items:[{id:'relic_dust',qty:3}]},
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
  return routesFrom(G.loc).map(({r,to}) => ({r, to, open: locOpen(to), modeOk: modeOpen(r.mode), cost: r.fare, can: locOpen(to) && modeOpen(r.mode) && G.gold >= r.fare}));
}
function startTravel(r, to){
  if(!locOpen(to) || !modeOpen(r.mode) || G.gold < r.fare) return;
  G.gold -= r.fare;
  if(voyageRoute(r)) return startVoyage(ROUTES.indexOf(r), to);
  const ev = Math.random() < (r.mode==='ship' ? .5 : .35) ? AR(EVENTS[r.mode]) : null;
  PEND = {r, to, ev, from:G.loc};
  if(Math.random() < r.risk){
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
  gainXp(8 * p.r.days, G.party);
  const first = !G.visited[p.to];
  msgs.push.apply(msgs, onArrive(p.to));
  msgs.push.apply(msgs, advanceDay(p.r.days));
  if(first) msgs.push('📍 New location discovered: '+LOCATIONS[p.to].n);
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
  grantReward(q.rw, '').forEach(m => msgs.push(m.replace(/^ · /,'')));
  msgs.unshift('🎯 Quest complete: '+q.name);
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
  startBattle({foes, rewards:true});
}
function doGather(spotId){
  const sp = spotById(spotId), msgs = [];
  const gotLoot = () => {
    sp.loot.forEach(d => { const q = rint(d.qty); addItems([{id:d.id, qty:q}]); msgs.push('Found '+ITEMS[d.id].icon+' '+ITEMS[d.id].n+' ×'+q); });
    if(sp.bonus && Math.random()<sp.bonus.chance){ addItems([{id:sp.bonus.id, qty:1}]); msgs.push('✨ Lucky find: '+ITEMS[sp.bonus.id].icon+' '+ITEMS[sp.bonus.id].n); }
    msgs.push.apply(msgs, advanceDay(1)); save();
  };
  if(Math.random() < .3){
    startBattle({foes:foeGroup(sp.ambush, lvFor(sp), 2), rewards:true, onWin:()=>{ gotLoot(); return msgs; }});
    return 'battle';
  }
  gotLoot(); flash(msgs); return 'done';
}
function doInvestigate(spotId){
  const sp = spotById(spotId); if((G.clues[spotId]||0) >= sp.need) return;
  const found = () => {
    const n = G.clues[spotId] = (G.clues[spotId]||0)+1, msgs = ['🔎 Clue '+n+'/'+sp.need+': '+sp.clues[n-1]];
    if(n >= sp.need){ G.flags['inv_'+spotId] = true; msgs.push.apply(msgs, grantReward(sp.rw, '🕯️ Investigation complete: '+sp.n));
      MISSIONS.forEach(m => { if(mState(m.id)==='active' && m.obj.type==='investigate' && m.obj.spot===spotId) msgs.push.apply(msgs, completeMission(m.id)); });
      msgs.push.apply(msgs, checkSteps()); }
    msgs.push.apply(msgs, advanceDay(1)); save(); return msgs;
  };
  if(Math.random() < .4){
    startBattle({foes:foeGroup(sp.ambush, lvFor(sp), 2), rewards:true, onWin:found});
    return 'battle';
  }
  flash(found()); return 'done';
}
function doBoss(spotId){
  const sp = spotById(spotId), lv = lvFor(sp);
  const foes = [{key:sp.boss, lv}].concat((sp.add||[]).map(k => ({key:k, lv:Math.max(1,lv-1)})));
  startBattle({foes, rewards:true, firstClear:!G.flags['boss_'+sp.boss], onWin:()=>{ G.flags['boss_'+sp.boss] = true; return checkSteps(); }});
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
};
function doHome(k){
  const a = HOME_ACTS[k]; if(!a) return [];
  if(G.bondDay['home_'+k] === G.day) return ['Already done today.'];
  G.bondDay['home_'+k] = G.day; const lv = avgPartyLv(), msgs = ['🏡 '+a.msg];
  if(k==='dinner'){ ['devon','sky','levi','seraphina'].filter(isRecruited).forEach(id => { const m = addBond(id, 3); if(m) msgs.push(m); }); msgs.push('Bond +3 (the party at the table)'); }
  if(k==='court'){ gainXp(40+lv*4, G.party).forEach(m => msgs.push(m)); }
  if(k==='albums'){ msgs.push('🗣️ '+AR(['Elara: "Yvette hummed when she healed. I can still hear it."','Unique Gold: "Some wounds never truly heal, but they teach you to listen."','Adrian: "You would hide that charm under your pillow, then claim you had lost it."'])); }
  return msgs.concat(advanceDay(1));
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
function doMeal(){
  if(G.mealDay[G.loc] === G.day) return ['You have already eaten here today.'];
  if(G.gold < 15) return ['A shared meal costs 15 gold.'];
  G.gold -= 15; G.mealDay[G.loc] = G.day; const msgs = ['🍶 A shared meal. Bond +2 for the active party.'];
  G.active.forEach(id => { const m = addBond(id, 2); if(m) msgs.push(m); });
  return msgs.concat(advanceDay(0));
}
function rumour(){
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
  {ch:99, n:'Faepool Territory', t:'A border region of forests and traditional villages. Something interferes with Jade\'s clairvoyance here.'},
  {ch:99, n:'The Hidden Message', t:'An unexpected message suggests the curse, Jade\'s visions and the people around her may be connected.'},
  {ch:99, n:'Ancient Records', t:'Records recovered from the Faepool ruins. The disturbances are not random: they belong to one pattern.'},
  {ch:99, n:'Xima (draft)', t:'The source of the curse, and the ancient witch whose magic shaped Tribute\'s history. The curse may have multiple layers.'},
  {ch:99, n:'Ancient Magic', t:'Old magic leaves traces in stone and blood. Jade\'s visions respond to it.'},
  {ch:99, n:'Tribute History', t:'How the island came to be bound by the curse. Many pages are still missing.'},
  {ch:99, n:'Dima\'s Legacy', t:'Jade\'s golden blood connects her to Dima. The records speak of a sanctuary, location unknown.'},
  {ch:99, n:'The Black Pearl', t:'Devon\'s inheritance. Dragon Empowerment, Ancient Dragon Knowledge and Dragon Manifestation.', party:'devon'},
];
