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
      {id:'tavern', kind:'tavern', n:'Capital Tavern', icon:'🍶', desc:'Meals, rumours.'},
      {id:'board', kind:'board', n:'Quest & Bounty Board', icon:'📜', desc:'Contracts posted by merchants and the guard.'}]},
  faepool_harbour:{ n:'Faepool Harbour', region:'border', kind:'harbour', icon:'⚓', unlock:{ch:3},
    desc:'Travel hub: boats, trade and side quests.',
    spots:[
      {id:'tavern', kind:'tavern', n:'Harbour Tavern', icon:'🍶', desc:'Sailors\' talk and hot food.'},
      {id:'board', kind:'board', n:'Harbour Board', icon:'📜', desc:'Contracts and bounties.'},
      {id:'docks', kind:'hunt', n:'The Docks', icon:'🧤', desc:'Pickpockets, thugs and smugglers work the quays.', pool:['dock_pickpocket','dock_thug','smuggler'], lo:1}]},
  vigil_village:{ n:'Vigil Village', region:'faepool', kind:'town', icon:'🏘', unlock:{ch:15},
    desc:'The first village. Investigation point, festival and side quests.',
    spots:[
      {id:'tavern', kind:'tavern', n:'Village Inn', icon:'🍶', desc:'Warm beds and louder rumours.'},
      {id:'board', kind:'board', n:'Village Board', icon:'📜', desc:'Villagers need help.'},
      {id:'outskirts', kind:'hunt', n:'Village Outskirts', icon:'🗡️', desc:'Bandits on the roads in.', pool:['road_bandit','bandit_archer','forest_wolf'], lo:3}]},
  faepool_forest:{ n:'Faepool Forest', region:'faepool', kind:'field', icon:'🌲', unlock:{ch:3},
    desc:'Exploration area: gathering, hidden paths, ancient ruins. Xima corruption lingers.',
    spots:[
      {id:'woods', kind:'hunt', n:'Deep Woods', icon:'🐺', desc:'Forest creatures and corrupted spirits.', pool:['forest_wolf','thorn_boar','xima_sprite'], elite:'corrupted_stag', lo:2},
      {id:'herbs', kind:'gather', n:'Gather Herbs', icon:'🌿', desc:'Search the hidden paths for herbs.', loot:[{id:'forest_herb',qty:[1,3]}], bonus:{id:'xima_shard',chance:.12}, ambush:['forest_wolf','xima_sprite'], lo:2}]},
  dark_inn:{ n:'Dark Inn', region:'faepool', kind:'story', icon:'🌫', unlock:{ch:11},
    desc:'Story location. A mystery and Xima\'s influence. Chad / Jade turning point.',
    spots:[
      {id:'inn_clues', kind:'investigate', n:'Investigate the Inn', icon:'🕯️', need:3, ambush:['masked_assassin','shade_wraith'], lo:6,
       desc:'Something is wrong with this place. Search for clues.', clues:['A guest ledger with pages torn out.','A cold room that smells of ash and shade.','Hidden marks scratched beneath the floorboards.'],
       rw:{xp:200, gold:80}},
      {id:'tavern', kind:'tavern', n:'The Dark Inn Bar', icon:'🍶', desc:'The barman never looks up.'}]},
  frog_mahan:{ n:'Frog Mahan Swamp', region:'faepool', kind:'boss', icon:'🐸', unlock:{ch:17},
    desc:'Boss area. Swamp, wetlands and poison. Status effects.',
    spots:[
      {id:'wetlands', kind:'hunt', n:'Wetlands', icon:'🪱', desc:'Toads and leeches in the reeds.', pool:['bog_toad','mire_leech'], lo:8},
      {id:'moss', kind:'gather', n:'Gather Swamp Glands', icon:'🧫', desc:'Risky foraging.', loot:[{id:'toad_gland',qty:[1,3]}], ambush:['bog_toad','mire_leech'], lo:8},
      {id:'mahan', kind:'boss', n:'Frog Mahan', icon:'🐸', desc:'The warlord of the swamp.', boss:'boss_frog_mahan', add:['bog_toad','bog_toad'], lo:10}]},
  river_crossing:{ n:'River Crossing', region:'border', kind:'sea', icon:'🌊', unlock:{ch:19},
    desc:'Boat exploration, fishing and sea encounters.',
    spots:[
      {id:'open_water', kind:'hunt', n:'Open Water', icon:'🏴‍☠️', desc:'Raiders and storm wisps.', pool:['sea_raider','storm_wisp'], elite:'river_serpent', lo:10},
      {id:'fishing', kind:'gather', n:'Fishing', icon:'🎣', desc:'Cast a line.', loot:[{id:'river_fish',qty:[1,3]}], bonus:{id:'sea_pearl',chance:.15}, ambush:['storm_wisp'], lo:10}]},
  dragon_vale:{ n:'Dragon Vale', region:'dragon', kind:'region', icon:'🐉', unlock:{ch:25},
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
  if(sp.party && !isRecruited(sp.party)) return '🔒 Needs '+CHARACTERS[sp.party].n.split(' ')[0]+'\'s Ancient Dragon Knowledge';
  if(sp.needFlag && !G.flags[sp.needFlag]) return '🔒 Sealed — complete the Dragon Sanctuary first';
  return '';
}

// Some story chapters must be started on location (PROVISIONAL). {chapter: locationId}
const CH_LOC = { 12:'dark_inn', 16:'vigil_village' };

/* ---------------- ROUTES ---------------- */
// mode 'carriage' (land, road encounters — Aethon style) | 'ship' (sea/river voyage — Crimson Tide style)
const MODES = { carriage:{n:'Horse Carriage', icon:'🐎'}, ship:{n:'Ship', icon:'⛵'} };
const LAND_POOL = ['road_bandit','bandit_archer','forest_wolf'], SEA_POOL = ['sea_raider','storm_wisp'];
const ROUTES = [
  {a:'capital', b:'faepool_harbour', mode:'carriage', n:'Coast Road', days:1, fare:8, risk:.3, pool:['road_bandit','bandit_archer','dock_pickpocket']},
  {a:'capital', b:'faepool_harbour', mode:'ship', n:'Imperial Coast Passage', days:1, fare:20, risk:.2, pool:['sea_raider','smuggler']},
  {a:'faepool_harbour', b:'vigil_village', mode:'carriage', n:'Harbour Road', days:1, fare:10, risk:.4, pool:LAND_POOL},
  {a:'vigil_village', b:'faepool_forest', mode:'carriage', n:'Forest Track', days:1, fare:12, risk:.5, pool:['forest_wolf','thorn_boar','xima_sprite']},
  {a:'faepool_forest', b:'dark_inn', mode:'carriage', n:'Old Inn Road', days:1, fare:10, risk:.5, pool:['masked_assassin','forest_wolf','shade_wraith']},
  {a:'faepool_forest', b:'frog_mahan', mode:'carriage', n:'Reed Causeway', days:1, fare:10, risk:.5, pool:['bog_toad','mire_leech','forest_wolf']},
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
const FLAG_LABEL = { bracelet:'Communication Bracelet', crossbow:'Enchanted Crossbow' };

/* ---------------- DAY CLOCK ---------------- */
function advanceDay(n){
  G.day += n; refreshBounties();
  return deliverLetters().concat(checkMissionOffers());
}

/* ---------------- LETTERS & MISSIONS (King Greyson) ---------------- */
// obj types: reach {loc} | kill {keys|area, need} | boss {key} | investigate {spot} | read
// PROVISIONAL: texts, rewards and chapter gating. Chapters listed = story chapters completed first.
const MISSIONS = [
  {id:'m_harbour', needCh:3, title:'To Faepool Harbour', obj:{type:'reach', loc:'faepool_harbour'}, rw:{xp:120, gold:60},
   subj:'A first errand', body:'Jade — the road beyond the capital must be watched. Travel to Faepool Harbour and report what you see. Take the horse carriage; the coast road is short but not always quiet. — Greyson'},
  {id:'m_forest', needCh:4, after:'m_harbour', title:'Thin the Faepool Wilds', obj:{type:'kill', area:'forest', need:6, label:'forest creatures'}, rw:{xp:200, gold:90, items:[{id:'herbal_tonic',qty:2}]},
   subj:'Trouble in the forest', body:'Travellers speak of corrupted beasts in Faepool Forest. Clear six of them from the paths. Be careful of anything that glows. — Greyson'},
  {id:'m_inn', needCh:11, title:'Shadows at the Dark Inn', obj:{type:'investigate', spot:'inn_clues'}, rw:{xp:320, gold:140},
   subj:'An inn that should be empty', body:'An inn on the old forest road has swallowed three of my scouts. Go there and find out why. Search every room. — Greyson'},
  {id:'m_vigil', needCh:15, title:'The First Village', obj:{type:'reach', loc:'vigil_village'}, rw:{xp:300, gold:120},
   subj:'Vigil Village', body:'Vigil Village has sent word of a festival and of strangers asking after you. Go in person. Keep your eyes open. — Greyson'},
  {id:'m_frog', needCh:17, title:'The Swamp Warlord', obj:{type:'boss', key:'boss_frog_mahan'}, rw:{xp:500, gold:260, rep:10},
   subj:'Frog Mahan', body:'The swamp road is closed by a creature the villagers call Frog Mahan. End it. — Greyson'},
  {id:'m_river', needCh:19, title:'Across the River', obj:{type:'reach', loc:'river_crossing'}, rw:{xp:400, gold:180},
   subj:'The river route', body:'Take a ship from Faepool Harbour to the River Crossing. We need to know whether the water is passable and who controls it. — Greyson'},
  {id:'m_bracelet', needCh:21, title:'A Gift from the Crown', obj:{type:'read'}, rw:{xp:150, gold:0, flag:'bracelet'},
   subj:'Pigeons are too slow', body:'Wear this bracelet. It will carry my voice to you anywhere on the island, and yours to me. No more waiting on birds. — Greyson'},
  {id:'m_dragon', needCh:25, title:'Dragon Vale', obj:{type:'reach', loc:'dragon_vale'}, rw:{xp:700, gold:300},
   subj:'The Vale awakens', body:'The old accounts say the Vale answers only to a certain bloodline. Bring Devon. — Greyson'},
  {id:'m_pearl', needCh:28, after:'m_dragon', title:'The Dragon Sanctuary', obj:{type:'investigate', spot:'sanctuary'}, rw:{xp:900, gold:400, items:[{id:'relic_dust',qty:3}]},
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
      if(o.type==='kill' && e.area===o.area){ G.mprog[m.id] = (G.mprog[m.id]||0)+1; if(G.mprog[m.id]>=o.need) msgs.push.apply(msgs, completeMission(m.id)); }
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
  return routesFrom(G.loc).map(({r,to}) => ({r, to, open: locOpen(to), cost: r.fare, can: locOpen(to) && G.gold >= r.fare}));
}
function startTravel(r, to){
  if(!locOpen(to) || G.gold < r.fare) return;
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
  {ch:-1, n:'Tribute Island', t:'The seat of King Greyson. A hidden isle under a curse (Curse of the Hidden Isle).'},
  {ch:0, n:'Imperial Guard', t:'Jade Gold serves as an Imperial Guardian. Her sword training began in the Training Grounds.'},
  {ch:10, n:'The Prophecy', t:'Records of a prophecy tied to Jade\'s bloodline. Pages are missing.'},
  {ch:15, n:'Xima', t:'The curse\'s source. Corruption seeps into forests and spirits. Research notes are incomplete.'},
  {ch:20, n:'Dima\'s Legacy', t:'Jade\'s golden blood connects her to Dima. The records speak of a sanctuary, location unknown.'},
  {ch:25, n:'Dragon Vale', t:'A region of dragon lore, ancient powers and legendary items.', party:'devon'},
  {ch:28, n:'The Dragon Pearl', t:'Devon\'s inheritance. Dragon Empowerment, Ancient Dragon Knowledge and Dragon Manifestation.', party:'devon'},
];
