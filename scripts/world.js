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
      {id:'streets', kind:'tavern', n:'City Streets & Tavern', icon:'🍶', ch:3, desc:'Meals and rumours.'}]},
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
  dragon_vale:{ n:'Dragon Vale', region:'dragon', kind:'region', icon:'🐉', unlock:{ch:99},   // Devon / Dragon Vale arc not written yet
    desc:'Major story region: dragon lore, ancient powers, legendary items. Devon, Delilah, Chad.',
    spots:[
      {id:'vale', kind:'hunt', n:'The Vale', icon:'🦎', desc:'Drakes and old guardians.', pool:['vale_drake','stone_sentinel','relic_spirit'], lo:14},
      {id:'sanctuary', kind:'investigate', n:'Dragon Sanctuary', icon:'⛩️', need:3, ambush:['stone_sentinel','relic_spirit'], lo:15, party:'devon',
       desc:'Ancient trials and the Dragon Pearl storyline. Sealed — only Ancient Dragon Knowledge can read the wards.',
       clues:['A sealed inscription describes the first Pearl bearer.','The wards answer to a royal dragon bloodline.','A trial chamber opens beneath the altar.'], rw:{xp:420, gold:150}},
      {id:'pearl', kind:'boss', n:'Pearl Chamber', icon:'🔮', desc:'Special dungeon. Reward: Dragon Pearl related ability.', boss:'boss_pearl_guardian', add:['relic_spirit'], lo:18, party:'devon', needFlag:'inv_sanctuary'}]},
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
  if(sp.needFlag && !G.flags[sp.needFlag]) return '🔒 Sealed — complete the Dragon Sanctuary first';
  return '';
}

// Some story chapters must be started on location (PROVISIONAL). {chapter: locationId}
// Chapters whose story must be started on location. Tune freely: {chapter: locationId}
const CH_LOC = { 12:'dark_inn', 16:'vigil_village', 17:'vigil_village', 18:'vigil_village', 19:'faepool_forest', 21:'faepool_forest', 22:'booyeong_camp', 23:'booyeong_camp', 24:'booyeong_camp', 25:'faepool_forest', 26:'vigil_village', 27:'booyeong_camp', 28:'vigil_village', 29:'vigil_village', 30:'vigil_village' };   // chapters that must start on location (ch12 begins at the inn). More are added as chapters are converted.
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
const FLAG_LABEL = { bracelet:'Communication Bracelet', crossbow:'Enchanted Crossbow', greyson_arms:'Greyson\'s dagger and flail unsealed', greyson_gift:'Greyson\'s gift received' };

/* ---------------- DAY CLOCK ---------------- */
function advanceDay(n){
  G.day += n; refreshBounties();
  return deliverLetters().concat(checkMissionOffers());
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
  return checkReach(G.loc);
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
  return '';
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
    msgs.push.apply(msgs, questKill(f.key));
    msgs.push.apply(msgs, bountyKill(f.key));
  });
  return msgs;
}
function onArrive(loc){
  G.visited[loc] = true;
  let msgs = checkReach(loc);
  msgs = msgs.concat(questArrive(loc));
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
  G.loc = p.to;
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
  {id:'q_herbs', type:'collect', item:'forest_herb', need:4, icon:'🌿', name:'Herbalist\'s Request', desc:'Bring 4 Faepool Herbs to any board.', rw:{xp:110, gold:80, rep:3}, needLoc:'faepool_forest'},
  {id:'q_glands', type:'collect', item:'toad_gland', need:4, icon:'🧫', name:'Apothecary Order', desc:'Bring 4 Toad Glands to any board.', rw:{xp:200, gold:130, rep:4}, needLoc:'frog_mahan'},
  {id:'q_fish', type:'collect', item:'river_fish', need:5, icon:'🐟', name:'Fresh Catch', desc:'The harbour market wants 5 River Fish.', rw:{xp:150, gold:100, rep:3}, needLoc:'river_crossing'},
  {id:'q_deliver', dynamic:'deliver'},
];
const PARCELS = ['sealed letters','medicine crates','silk bolts','lantern oil','preserved tea','forge tools'];
function genDelivery(from){
  const dests = LOC_ORDER.filter(k => isSettlement(k) && locOpen(k) && k!==from);
  if(!dests.length) return null;
  const to = AR(dests), hops = Math.max(1, Math.abs(hopsFromCapital(to) - hopsFromCapital(from)));
  const goods = AR(PARCELS), n = 1;
  return { id:'q_del_'+Math.random().toString(36).slice(2,7), type:'deliver', to, from, icon:'📮', name:'Deliver '+goods+' to '+LOCATIONS[to].n,
    desc:'A merchant needs '+goods+' carried to '+LOCATIONS[to].n+'. Deliver by carriage or ship.', need:n, c:0,
    rw:{xp:90+hops*40, gold:60+hops*45, rep:4} };
}
function boardFor(loc){
  const b = G.quests.board; if(!b[loc]) b[loc] = {day:0, list:[]};
  const bd = b[loc];
  if(bd.day === G.day && bd.list.length) return bd.list;
  const taken = new Set(G.quests.active.map(q => q.id));
  const pool = QUEST_POOL.filter(q => q.dynamic || (locOpen(q.needLoc) && !taken.has(q.id)));
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
      MISSIONS.forEach(m => { if(mState(m.id)==='active' && m.obj.type==='investigate' && m.obj.spot===spotId) msgs.push.apply(msgs, completeMission(m.id)); }); }
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
  startBattle({foes, rewards:true, firstClear:!G.flags['boss_'+sp.boss], onWin:()=>{ G.flags['boss_'+sp.boss] = true; return []; }});
}
function doPractice(){
  const lv = avgPartyLv(); if(lv > 15) return ['The grounds have little left to teach at your level.'];
  const msgs = ['Sword practice, meditation and drills. +'+(30+lv*3)+' XP'];
  gainXp(30+lv*3, G.party).forEach(m => msgs.push(m));
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
  {ch:99, n:'Faepool Territory', t:'A border region of forests and traditional villages. Something interferes with Jade\'s clairvoyance here.'},
  {ch:99, n:'The Hidden Message', t:'An unexpected message suggests the curse, Jade\'s visions and the people around her may be connected.'},
  {ch:99, n:'Ancient Records', t:'Records recovered from the Faepool ruins. The disturbances are not random: they belong to one pattern.'},
  {ch:99, n:'Xima (draft)', t:'The source of the curse, and the ancient witch whose magic shaped Tribute\'s history. The curse may have multiple layers.'},
  {ch:99, n:'Ancient Magic', t:'Old magic leaves traces in stone and blood. Jade\'s visions respond to it.'},
  {ch:99, n:'Tribute History', t:'How the island came to be bound by the curse. Many pages are still missing.'},
  {ch:99, n:'Dima\'s Legacy', t:'Jade\'s golden blood connects her to Dima. The records speak of a sanctuary, location unknown.'},
  {ch:99, n:'Dragon Vale', t:'A region of dragon lore, ancient powers and legendary items.', party:'devon'},
  {ch:99, n:'The Dragon Pearl', t:'Devon\'s inheritance. Dragon Empowerment, Ancient Dragon Knowledge and Dragon Manifestation.', party:'devon'},
];
