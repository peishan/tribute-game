/* =====================================================================
   ARC X: THE ALTAN ROUTE (chapters 239 onward; Altan opens fully after ch262)
   1. Altan Route: a new world-map destination. From ch239 only the route and border region are open (Border Garrison, Old Military Road, Mountain Pass).
      After ch262 Altan is permanently revisitable: the Altan Capital opens with the Falcon Palace, Royal Archive, Training Grounds, Altan Market, Royal Gardens and Princess Quarters.
   2. The Missing Prince (ch241): a ten-objective investigation along the border region.
   3. Party investigation roles: on a spot that lists roles, each role character in the party notices something others miss (a little XP). Never required: nobody is locked out.
   First-pass: the route lengths, clue wording and the quest brief are placeholders until the Arc X chapters arrive; the Altan map picture (assets/maps/altan.webp) is not generated yet.
   Nothing here can be reached before chapter 239 is completed.
   ===================================================================== */
const ALTAN_ROUTE_CH = 239, ALTAN_QUEST_CH = 241, ALTAN_OPEN_CH = 262, RHEON_JOIN_CH = 263;   // Rheon is recruited when chapter 263 (the start of Arc XI) is completed
REGIONS.altan = {n:'Altan Kingdom', icon:'🦅'};
const INVEST_ROLES = {
  jade:['Jade', 'reconstructs the sequence of events and spots the contradictions'],
  seraphina:['Sera', 'knows Altan geography, military customs and royal protocol'],
  levi:['Levi', 'reads footprints, patrol routes and signs of pursuit'],
  sky:['Sky', 'senses injuries, corruption and unusual spiritual residue'],
  devon:['Devon', 'weighs the military decisions and what they mean for royal security'],
  rin:['Rin', 'scouts the route ahead'],
};
const roleHere = id => !!G && !!G.party && G.party.includes(id) && (G.active.includes(id) || (typeof isCompanion==='function' && isCompanion(id))) && !(typeof isAway==='function' && isAway(id));
function investRoleBonus(spotId){
  const sp = spotById(spotId); if(!sp || !sp.roles) return null;
  const who = sp.roles.filter(roleHere); if(!who.length) return null;
  return {who, xp:Math.round((100 + avgPartyLv()*5) * who.length), lines:who.map(id => INVEST_ROLES[id][0]+' '+INVEST_ROLES[id][1]+'.')};
}
function rolesLine(sp){
  if(!sp.roles) return '';
  return '<div class="sm" style="margin:6px 0">Roles: '+sp.roles.map(id => (roleHere(id) ? '✅ ' : '▫️ ')+INVEST_ROLES[id][0]+' ('+INVEST_ROLES[id][1]+')').join(' · ')+'</div>';
}
const altanSpot = (id, n, icon, desc, clues, roles, prev, ch, xp, gold, ambush, lo, needFlag) =>
  ({id, kind:'investigate', n, icon, ch:ch||ALTAN_QUEST_CH, need:3, ambush:ambush||[], lo:lo||78, roles, desc, clues, rw:{xp, gold}, ...(needFlag ? {needFlag, lockMsg:'🔒 The prince must be reached first'} : prev ? {needFlag:'inv_'+prev, lockMsg:'🔒 Finish the previous clue first'} : {})});
Object.assign(LOCATIONS, {
  altan_border:{ n:'Border Garrison', region:'altan', kind:'town', icon:'🛡️', unlock:{ch:ALTAN_ROUTE_CH},
    desc:'The Altan Kingdom\'s border garrison at the end of the Altan Route. The garrison is where the expedition was last accounted for.',
    spots:[
      altanSpot('question_officials','Question the Palace Officials','🗣️','One account at a time.',['The palace officials give their accounts one at a time.','Jade sets the accounts side by side and marks where they disagree.','Sera names the protocol each official should have followed.'],['jade','seraphina'],null,ALTAN_QUEST_CH,142000,29600),
      altanSpot('expedition_order','Review the Expedition Order','📜','The prince\'s orders.',['The expedition order is copied into the garrison\'s ledger.','Sera reads the seals and the chain of command.','Devon weighs who approved the route and who could have changed it.'],['seraphina','devon'],'question_officials',ALTAN_QUEST_CH,142500,29700),
      altanSpot('surviving_soldiers','Speak with the Surviving Soldiers','🪖','Those who came back.',['A few soldiers returned to the garrison. They speak carefully.','Jade listens for what they all agree on, and what only one of them says.','Sky notes their injuries: some are not from any weapon.'],['jade','devon','sky'],'expedition_order',ALTAN_QUEST_CH,143000,29800),
      {id:'garrison_mess', kind:'tavern', n:'Garrison Mess', icon:'⛺', desc:'Rest, share a meal and listen to the party.'},
    ]},
  altan_road:{ n:'Old Military Road', region:'altan', kind:'field', icon:'🛤️', unlock:{ch:ALTAN_ROUTE_CH},
    desc:'The old military road the expedition followed from the garrison toward the mountains.',
    spots:[
      altanSpot('last_campsite','Examine the Last Known Campsite','🏕️','Where the trail was last clear.',['The campsite was struck in a hurry. Some gear was left behind.','Levi reads the footprints leaving it. Sky finds traces that are not ordinary smoke.','Rin scouts ahead for where the trail resumes.'],['levi','sky','rin'],'surviving_soldiers',ALTAN_QUEST_CH,143500,29900,['road_bandit','shade_beast']),
      altanSpot('expedition_route','Follow the Expedition Route','🧭','Mile by mile.',['The route follows the old patrol markers.','Sera knows which markers are Altan and which are older.','Levi finds where the column left the road.'],['levi','rin','seraphina'],'last_campsite',ALTAN_QUEST_CH,144000,30000,['shade_beast','shade_wraith']),
      altanSpot('search_road','Search the Old Military Road','🔎','Look again.',['The road is long and the surface is worn by old patrols.','Devon marks where a column would have held a position.','Rin finds a track leading toward the pass.'],['levi','rin','devon'],'expedition_route',ALTAN_QUEST_CH,144500,30100,['shade_wraith','relic_spirit']),
      {id:'road_hunt', kind:'hunt', n:'The Old Military Road', icon:'🗡️', desc:'Wild beasts and shades along the old patrol road.', pool:['road_bandit','shade_beast','shade_wraith'], lo:78},
    ]},
  altan_pass:{ n:'Mountain Pass', region:'altan', kind:'field', icon:'⛰️', unlock:{ch:ALTAN_ROUTE_CH},
    desc:'The mountain pass at the head of the old military road.',
    spots:[
      altanSpot('surviving_escort','Recover the Surviving Escort','🛡️','Still holding out.',['Part of the escort is still in the pass.','Sky tends the injured. Jade asks what they saw.'],['sky','jade'],'search_road',ALTAN_QUEST_CH,145000,30200,['shade_beast','relic_spirit']),
      {id:'pass_hunt', kind:'hunt', n:'The Mountain Pass', icon:'🗡️', desc:'Beasts and shades in the high pass.', pool:['shade_beast','shade_wraith','relic_spirit'], lo:78},
    ]},
  altan_hidden:{ n:'Hidden Mountain Passage', region:'altan', kind:'field', icon:'🕳️', unlock:{flag:'altan_clues_complete'},
    desc:'A passage above the pass that no official map shows. Opened by the seven clues of the missing prince.',
    spots:[
      altanSpot('locate_prince','Locate the Prince','🔦','Beyond the pass.',['The escort points toward where the prince was last seen.','Levi and Rin follow the signs of pursuit.','Sky senses where the trail fades.'],['levi','rin','sky'],'surviving_escort',ALTAN_QUEST_CH,145500,30300,['shade_wraith','relic_spirit']),
      altanSpot('escort_back','Escort Him Safely Back','🧭','The way down.',['The prince must be brought back through the pass safely.','Devon plans the withdrawal. Levi covers the rear. Sera keeps to the Altan protocol of escort.'],['devon','levi','seraphina'],null,ALTAN_QUEST_CH,146000,30400,['shade_beast','shade_wraith'],78,'altan_prince_rescued'),
      altanSpot('supernatural_cause','Investigate the Supernatural Cause','🌑','Why he vanished.',['Something other than soldiers took part in the disappearance.','Sky reads the residue left in the pass.','Jade sets the findings beside the soldiers\' accounts.'],['sky','jade'],'escort_back',ALTAN_QUEST_CH,146500,30500,['shade_wraith','relic_spirit']),
      {id:'prince_rescue', kind:'rescue', n:'Reach the Prince Before the Barrier Collapses', icon:'🛡️', ch:ALTAN_QUEST_CH, needFlag:'inv_locate_prince', lockMsg:'🔒 Locate the prince first', desc:'A failing barrier, seal anchors, and the prince behind it.'},
      {id:'hidden_hunt', kind:'hunt', n:'The Hidden Passage', icon:'🗡️', desc:'Shades and relic spirits in the hidden passage.', pool:['shade_wraith','relic_spirit','stone_sentinel'], lo:78},
    ]},
  altan_capital:{ n:'Altan Capital', region:'altan', kind:'hub', icon:'🦅', unlock:{ch:ALTAN_OPEN_CH},
    desc:'The capital of the Altan Kingdom. Permanently revisitable after the Altan story.',
    spots:[
      {id:'falcon_palace', kind:'place', n:'Falcon Palace', icon:'🏰', desc:'The Altan royal palace.', note:'New events appear here as the Altan story reaches them.'},
      {id:'altan_archive', kind:'archive', n:'Royal Archive', icon:'📚', desc:'The Altan records. The same Codex as the other archives.'},
      {id:'altan_training', kind:'training', n:'Altan Training Grounds', icon:'⚔️', desc:'Safe zone. No monsters. Sword practice and the sparring ring.'},
      {id:'altan_market', kind:'tavern', n:'Altan Market', icon:'🏮', desc:'Meals, rest and rumours in the market.'},
      {id:'altan_gardens', kind:'garden', n:'Royal Gardens', icon:'🌿', desc:'Quiet walks and bond scenes.'},
      {id:'princess_quarters', kind:'place', n:'Princess Quarters', icon:'🪭', desc:'The princess\'s rooms in the Falcon Palace.', note:'New events appear here as the Altan story reaches them.'},
    ]},
});
Object.keys(LOCATIONS).filter(k => LOCATIONS[k].region==='altan' && !LOC_ORDER.includes(k)).forEach(k => LOC_ORDER.push(k));
ROUTES.push(
  {a:'altan_pass', b:'altan_hidden', mode:'carriage', n:'The Hidden Passage', days:1, fare:0, risk:.5, pool:['shade_wraith','relic_spirit','stone_sentinel']},
  {a:'capital', b:'altan_border', mode:'ship', n:'The Altan Route', days:5, fare:100, risk:.4, pool:['sea_raider','storm_wisp']},
  {a:'altan_border', b:'altan_road', mode:'carriage', n:'The Old Military Road', days:1, fare:0, risk:.4, pool:['road_bandit','shade_beast','shade_wraith']},
  {a:'altan_road', b:'altan_pass', mode:'carriage', n:'Up to the Pass', days:1, fare:0, risk:.45, pool:['shade_beast','shade_wraith','relic_spirit']},
  {a:'altan_pass', b:'altan_capital', mode:'carriage', n:'The Falcon Road', days:2, fare:40, risk:.35, pool:['road_bandit','shade_beast','relic_spirit']},
);
AREA_LOOT.altan_road = [{id:'frontier_hide',chance:.30,needCh:ALTAN_ROUTE_CH},{id:'spirit_thread',chance:.15,needCh:ALTAN_ROUTE_CH}];
AREA_LOOT.altan_pass = [{id:'seal_dust',chance:.20,needCh:ALTAN_ROUTE_CH},{id:'spirit_thread',chance:.20,needCh:ALTAN_ROUTE_CH}];
WORLD_MAPS.push({id:'altan', n:'The Altan Route', img:'assets/maps/altan.webp', open:() => G.ch >= ALTAN_ROUTE_CH, schem:true,   // picture not generated yet; schematic positions are placeholders
  locs:['altan_border','altan_road','altan_pass','altan_hidden','altan_capital'],
  nodes:[{k:'Tribute',x:15,y:80,loc:'capital',ref:true},{k:'Border Garrison',x:35,y:62,loc:'altan_border'},{k:'Old Military Road',x:50,y:44,loc:'altan_road'},{k:'Mountain Pass',x:66,y:26,loc:'altan_pass'},{k:'Hidden Mountain Passage',x:78,y:38,loc:'altan_hidden'},{k:'Altan Capital',x:84,y:12,loc:'altan_capital'}]});
MISSIONS.push({id:'m_missing_prince', needCh:ALTAN_QUEST_CH, title:'Find the Missing Altan Prince', obj:{type:'steps', steps:[
   {label:'Question palace officials', spot:'question_officials'},
   {label:'Review the prince\'s expedition order', spot:'expedition_order'},
   {label:'Speak with surviving soldiers', spot:'surviving_soldiers'},
   {label:'Examine the last known campsite', spot:'last_campsite'},
   {label:'Follow the expedition route', spot:'expedition_route'},
   {label:'Search the old military road', spot:'search_road'},
   {label:'Recover the surviving escort', spot:'surviving_escort'},
   {label:'Locate the prince', spot:'locate_prince'},
   {label:'Escort him safely back', spot:'escort_back'},
   {label:'Investigate the supernatural cause of the disappearance', spot:'supernatural_cause'}]}, rw:{xp:600000, gold:125000, rep:1400},
   subj:'The missing prince', body:'Prince Rheon of Altan has not returned from his expedition. Find him, and find out why. — Greyson'});
deed('altan_prince', 'story', 'The missing prince', '🦅', 'The missing Altan prince was found.', () => mState('m_missing_prince')==='done');

/* =====================================================================
   ARC X, PART 2: clue chain, rescue encounter, the Altan prince (guest), Sera's awakening quest, regional requests, hidden Sera/Greyson flags.
   First-pass: all clue/quest text below describes the mechanics only; replace it with the chapters' wording.
   ===================================================================== */
/* ---- 4. Evidence / clue chain for the missing prince (clue board in the Alliance tab). Completing it opens the Hidden Mountain Passage. ---- */
const ALTAN_CLUES = [
  {n:'Expedition Order', spot:'expedition_order', t:'The prince was investigating contradictory patrol reports.'},
  {n:'Broken Falcon Standard', spot:'last_campsite', t:'Found beyond the official search perimeter.'},
  {n:'Bloodied Bandage', spot:'surviving_soldiers', t:'Confirms one soldier was injured but continued moving.'},
  {n:'Three Sets of Returning Tracks', spot:'expedition_route', t:'Some guards escaped while others continued deeper.'},
  {n:'Burned Ground Without Fire', spot:'search_road', t:'The first sign that the threat is supernatural.'},
  {n:'Prince\'s Sword Mark', spot:'surviving_escort', t:'Shows where he deliberately redirected the creature, or whatever it was.'},
  {n:'Ancient Military Seal', spot:'question_officials', t:'Links the modern disappearance to the abandoned road.'},
];
const altanClueFound = c => !!G.flags['inv_'+c.spot];
function altanSync(){
  if(!G || !G.flags || G.flags.altan_clues_complete || G.ch < ALTAN_QUEST_CH || !ALTAN_CLUES.every(altanClueFound)) return [];
  G.flags.altan_clues_complete = true; chronicle('The seven clues of the missing prince are gathered: a Hidden Mountain Passage opens.', '🗝️'); save();
  return ['🗝️ The clue chain is complete: the Hidden Mountain Passage is open.'];
}
function rAltanClues(){
  if(!G || G.ch < ALTAN_QUEST_CH) return '';
  const n = ALTAN_CLUES.filter(altanClueFound).length;
  return `<h4>🦅 The Missing Prince: clue board <span class="sm">(${n}/${ALTAN_CLUES.length})</span></h4>` + ALTAN_CLUES.map(c => `<div class="li">${altanClueFound(c) ? '✅ <b>'+c.n+'</b><div class="sm">'+c.t+'</div>' : '❔ ???'}</div>`).join('') + (G.flags.altan_clues_complete ? '<div class="sm">The chain is complete: the Hidden Mountain Passage is open.</div>' : '');
}
/* ---- 5. Rescue encounter: reach the prince before the barrier collapses (battle.js: spec.rescue) ---- */
Object.assign(ENEMIES, {
  seal_anchor:{n:'Seal Anchor',icon:'🔱',area:'altan',hp:140,atk:6,mag:10,def:14,spd:6,xp:70,gold:40,traits:['magic'],moves:[{n:'Barrier Pulse',pow:.8,spell:true}],drops:[{id:'seal_dust',chance:.5}],desc:'An old anchor holding the barrier. Destroy it and the barrier lasts longer.'},
  barrier_wraith:{n:'Barrier Wraith',icon:'👻',area:'altan',hp:120,atk:14,mag:16,def:8,spd:13,xp:62,gold:34,traits:['corrupt','magic'],moves:[{n:'Wail',pow:1.1,spell:true,fx:[{k:'silence',d:1}]},{n:'Cold Touch',pow:1.2}],drops:[{id:'spirit_thread',chance:.3}],desc:'A wraith bound to the barrier.'},
  boss_pass_threat:{n:'The Threat Beyond the Pass',icon:'🌑',area:'altan',boss:true,hp:2600,atk:30,mag:30,def:16,spd:14,xp:1100,gold:800,traits:['corrupt','magic'],
    moves:[{n:'Rending Shadow',pow:1.4},{n:'Hollow Cry',pow:1.2,spell:true,all:true},{n:'Crushing Dark',pow:1.5,spell:true}],
    phases:[{at:.5,msg:'The threat rears up: it will not be turned aside',atk:1.15}],desc:'Whatever waits beyond the pass.'},
});
LOOT.boss_pass_threat = {guaranteed:[{id:'seal_dust',qty:[2,3]},{id:'spirit_thread',qty:[1,2]}],rolls:[{id:'royal_sigil',chance:.4}],firstClear:[{id:'celestial_shard',qty:[1,1]}]};
function doRescue(){
  const sp = spotById('prince_rescue');
  if(G.flags.altan_prince_rescued){ flash(['🛡️ The prince has already been reached.']); return render(); }
  if(!G.active.includes('seraphina')){ flash(['🦅 Sera must be in the active party: no one else can read the Altan seals.']); return render(); }
  const lv = lvFor({lo:78});
  startBattle({foes:[{key:'seal_anchor',lv},{key:'seal_anchor',lv},{key:'barrier_wraith',lv},{key:'barrier_wraith',lv}], rewards:true, rescue:{rounds:6},
    onWin:() => { G.flags.altan_prince_rescued = true; chronicle('The barrier fell and the missing Altan prince was reached.', '🛡️'); return ['👑 The barrier falls and the prince is reached, alive.'].concat(checkSteps()); }});
  origin = 'here'; tab = 'battle'; render();
}
/* ---- 6. The Altan prince, Sera's brother: a temporary guest from ch251 (never recruitable) ---- */
CHARACTERS.rheon = {
  n:'Rheon Altan', icon:'🦅', cls:'Falcon Crown Prince', role:'Front-line Vanguard (recruited after Arc X)', combat:'Strong front-line attack, reckless',
  identity:'Prince Rheon of Altan, Seraphina\'s older brother (a year or two older, called the crown prince): brilliant, impulsive, fond of adventure, horses and falcons, and exactly the sort of man she expects to find stranded on a mountain. A guest from chapter 251; he joins the party for good after Arc X (chapter 263).',
  style:['Vanguard','Cover','Rallying'], strength:'Front-line attack',
  weapon:'Altan Sabre', signature:'Royal Vanguard', sigDesc:'A strong front-line attack.',
  base:{hp:100,mp:24,atk:15,mag:5,def:10,spd:11}, grow:{hp:9,mp:1.8,atk:2.1,mag:.4,def:1.1,spd:1},
  skills:[
   {id:'royal_vanguard',n:'Royal Vanguard',icon:'⚔️',mp:6,kind:'phys',tgt:'foe',pow:2.1,req:{lvl:1},sig:true,desc:'SIGNATURE. A strong front-line attack.'},
   {id:'stand_behind_me',n:'Stand Behind Me',icon:'🛡️',mp:7,kind:'support',tgt:'self',fx:[{k:'cover',d:2}],req:{lvl:1},desc:'Takes the next blow meant for an ally.'},
   {id:'princes_rally',n:'Prince\'s Rally',icon:'🚩',mp:9,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'atk',m:1.1,d:3},{k:'buff',stat:'spd',m:1.05,d:3}],req:{lvl:1},desc:'A small rise in the party\'s morale: attack and speed up a little.'},
   {id:'reckless_advance',n:'Reckless Advance',icon:'💢',mp:8,kind:'phys',tgt:'foe',pow:2.7,fx:[{k:'buff',stat:'def',m:.75,d:2,self:true}],req:{lvl:1},desc:'A strong attack that leaves his guard open: his defence drops for two turns.'},
  ], evo:{tiers:[]}, bond:null };
ROSTER.push('rheon'); XP_CLASS.rheon = 'fighter'; JOIN_CH.rheon = RHEON_JOIN_CH;
GUEST_RULES.rheon = {flag:['altan_prince_rescued'], regions:['altan'], fromCh:251, untilCh:RHEON_JOIN_CH, sync:true, note:'Rheon fights beside the party in the Altan Kingdom after chapter 251. He joins the party for good after Arc X (chapter 263).'};
/* ---- 7. Sera's awakening quest: Legacy of the Golden Falcon (ch245-257). The awakening itself is story: ch257 sets sera_falcon_mastery (Falcon Banner: Awakened, white-hair battle state). ---- */
const SERA_Q_CH = 245;
const seraSpot = (id, n, icon, desc, clues, roles, prev, xp, gold) => altanSpot(id, n, icon, desc, clues, roles, prev, SERA_Q_CH, xp, gold, ['shade_beast','relic_spirit'], 80);
Object.assign(LOCATIONS.altan_border, {spots:LOCATIONS.altan_border.spots.concat([
  seraSpot('royal_records','Inspect the Altan Royal Records','📜','Copies kept at the border garrison.',['The garrison keeps copies of the Altan royal records.','Sera reads the lineage of the royal house and the notes on its banner.'],['seraphina','jade'],null,150000,31000)])});
Object.assign(LOCATIONS.altan_road, {spots:LOCATIONS.altan_road.spots.concat([
  seraSpot('falcon_seal','Locate the Falcon Military Seal','🔏','A seal of the old regiments.',['The Falcon military seal marks the old regiments\' posts along the road.','Sera knows its pattern; Levi finds where it was carved.'],['seraphina','levi'],'royal_records',150500,31100),
  seraSpot('old_training_ground','Visit the Old Training Ground','⚔️','Where the regiment drilled.',['The old training ground lies overgrown beside the road.','Sera walks the drill lines she was taught as a child.'],['seraphina','devon'],'falcon_seal',151000,31200)])});
Object.assign(LOCATIONS.altan_pass, {spots:LOCATIONS.altan_pass.spots.concat([
  seraSpot('regiment_banner','Recover the Lost Regiment\'s Banner','🚩','Lost in the pass.',['The lost regiment\'s banner is in the pass, torn but whole.','Sky senses the old residue clinging to the cloth.'],['seraphina','sky','rin'],'old_training_ground',151500,31300),
  {id:'pass_threat', kind:'boss', n:'The Threat Beyond the Pass', icon:'🌑', desc:'Whatever waits beyond the pass.', boss:'boss_pass_threat', add:['barrier_wraith'], lo:80, ch:SERA_Q_CH, needFlag:'inv_regiment_banner', lockMsg:'🔒 Recover the banner first'}])});
MISSIONS.push({id:'m_golden_falcon', needCh:SERA_Q_CH, title:'Legacy of the Golden Falcon', obj:{type:'steps', steps:[
   {label:'Inspect the Altan royal records', spot:'royal_records'},
   {label:'Locate the Falcon military seal', spot:'falcon_seal'},
   {label:'Visit the old training ground', spot:'old_training_ground'},
   {label:'Recover the lost regiment\'s banner', spot:'regiment_banner'},
   {label:'Defeat the threat beyond the pass', boss:'boss_pass_threat'},
   {label:'Trigger Sera\'s full awakening', flag:'sera_falcon_mastery'}]}, rw:{xp:620000, gold:130000, rep:1450},
   subj:'The Golden Falcon', body:'Sera has asked to look into her house\'s old regiment. Go with her. — Greyson'});
deed('sera_falcon_mastery', 'bonds', 'The Golden Falcon', '🦅', 'Sera\'s full awakening: Falcon Banner, Awakened.', () => !!G.flags.sera_falcon_mastery);
/* ---- 9. Altan regional requests (after Arc X, ch262): optional ---- */
const altanReq = (id, title, obj, rw, subj, body) => MISSIONS.push({id, needCh:ALTAN_OPEN_CH, title, obj, rw, subj, body});
Object.assign(LOCATIONS.altan_road, {spots:LOCATIONS.altan_road.spots.concat([
  {id:'lost_patrol', kind:'investigate', n:'Lost Patrol', icon:'🪖', ch:ALTAN_OPEN_CH, need:3, ambush:['shade_beast'], lo:80, desc:'Soldiers overdue from a mountain route.', clues:['A patrol is overdue from a mountain route.','Their last marker is on the old road.','The signs lead into the pass.'], rw:{xp:155000, gold:32000}},
  {id:'regimental_graves', kind:'investigate', n:'Old Regimental Graves', icon:'🪦', ch:ALTAN_OPEN_CH, need:3, ambush:['relic_spirit'], lo:80, desc:'Names and records of soldiers lost generations ago.', clues:['The old regimental graves are overgrown.','Many stones have lost their names.','The records can be recovered from the markers.'], rw:{xp:155500, gold:32100}}])});
Object.assign(LOCATIONS.altan_capital, {spots:LOCATIONS.altan_capital.spots.concat([
  {id:'palace_letters', kind:'investigate', n:'Palace Correspondence', icon:'✉️', ch:ALTAN_OPEN_CH, need:3, ambush:[], lo:80, desc:'Diplomatic messages between Altan and Tribute.', clues:['Messages between the Altan court and Tribute wait to be delivered or reviewed.','Some are routine. Some are not.','Adrian and Evelyne will want copies.'], rw:{xp:156000, gold:32200}}])});
altanReq('r_lost_patrol','Lost Patrol',{type:'investigate', spot:'lost_patrol'},{xp:155000, gold:32000},'Lost Patrol','Soldiers are overdue from a mountain route. Track them down. — Altan garrison');
altanReq('r_falcon_training','Falcon Training',{type:'steps', steps:[{label:'Defeat shades on the old road (Sera-specific trial)', kill:'shade_beast', need:5}]},{xp:155200, gold:32050},'Falcon Training','Sera has set herself a series of combat trials in the old Altan manner. Come along. — Sera');
altanReq('r_caravan','Caravan Through the Pass',{type:'steps', steps:[{label:'Clear bandits from the reopened road', kill:'road_bandit', need:6}]},{xp:155400, gold:32080},'Caravan Through the Pass','Merchants wish to use the newly reopened road. Keep it clear. — Altan garrison');
altanReq('r_graves','Old Regimental Graves',{type:'investigate', spot:'regimental_graves'},{xp:155500, gold:32100},'Old Regimental Graves','Record the names of soldiers lost generations ago. — Altan archive');
altanReq('r_palace_letters','Palace Correspondence',{type:'investigate', spot:'palace_letters'},{xp:156000, gold:32200},'Palace Correspondence','Review the messages between Altan and Tribute. — Altan court');
/* ---- 11. Lore: the falcon lineage (ch245-247), Jade's matchmaking record (ch261) ---- */
LORE.push(
  {ch:247, n:'The Lost Regiment', t:'An Altan regiment was lost in the mountain pass long ago. Its banner and its seal are part of the royal house\'s history.'},
  {ch:261, n:'Jade\'s Matchmaking Record', t:'Attempts: 3. Successful: 0. Devon: "Perhaps return to demon hunting."'},
);

/* ---- Story spots of chapters 240-246, played from the Border Garrison (the Altan Capital opens at ch262; the palace scenes are narrated) ---- */
Object.assign(LOCATIONS.altan_border, {spots:LOCATIONS.altan_border.spots.concat([
      {id:'border_in_view', kind:'investigate', n:'Altan\'s Border', icon:'🏰', ch:240, need:2, ambush:[], lo:78,
       desc:'Banners from her childhood.',
       clues:['After days of travel, the party reaches the border of Altan. The banners are familiar, and Sera recognises the crest from her childhood.'], rw:{xp:161800, gold:33260}},
      {id:'guards_welcome', kind:'investigate', n:'Welcome Home', icon:'🛡️', ch:240, need:2, ambush:[], lo:78, needFlag:'inv_border_in_view', lockMsg:'🔒 Finish the previous clue first',
       desc:'They hurry forward.',
       clues:['Guards at the gate immediately notice Sera and hurry forward. "Your Highness! Welcome home! We are relieved to see you safe."', 'Sera: "It\'s been a while. Thank you. Everyone looks well." "Please allow us to escort you into the city."'], rw:{xp:162100, gold:33320}},
      {id:'where_is_brother', kind:'investigate', n:'Where Is My Brother?', icon:'❓', ch:240, need:2, ambush:[], lo:78, needFlag:'inv_guards_welcome', lockMsg:'🔒 Finish the previous clue first',
       desc:'Not at the palace.',
       clues:['Sera: "Where is my brother? Is he at the palace?" "Your Highness... he is not at the palace right now. He departed some time ago on official business."', '"We were instructed not to disclose his exact location."'], rw:{xp:162400, gold:33380}},
      {id:'cross_the_border', kind:'investigate', n:'Across the Border', icon:'🚪', ch:240, need:2, ambush:[], lo:78, needFlag:'inv_where_is_brother', lockMsg:'🔒 Finish the previous clue first',
       desc:'Under Altan\'s protection.',
       clues:['Jade: "Let\'s head to the city first. We can ask for more information there." Sera: "I\'d like to see my mother and speak to the court. Perhaps they know more."', 'With an escort of Altan guards, the party crosses the border and makes their way toward the capital. Sera has returned home, but questions already hang in the air.'], rw:{xp:162700, gold:33440}},
      {id:'brought_to_palace', kind:'investigate', n:'Altan Palace', icon:'👑', ch:241, need:2, ambush:[], lo:78,
       desc:'Complications.',
       clues:['The party is brought into Altan Palace, where they are welcomed by members of the royal household. Sera is escorted to meet with senior officials and trusted guards.', '"Princess Seraphina. It has been too long. We are relieved to see you safe. Please forgive us for not sending word sooner. There have been... complications."'], rw:{xp:163000, gold:33500}},
      {id:'prince_rheon_missing', kind:'investigate', n:'Prince Rheon Has Not Returned', icon:'🕳️', ch:241, need:2, ambush:[], lo:78, needFlag:'inv_brought_to_palace', lockMsg:'🔒 Finish the previous clue first',
       desc:'Several days ago.',
       clues:['Sera: "Where is my brother? I want to see him right away." "Your Highness... the Crown Prince has been missing for several days."', 'Sera: "Several days...? Why wasn\'t I told?" "The royal household has kept this quiet to avoid causing panic, and to prevent our enemies from taking advantage of the situation."'], rw:{xp:163300, gold:33560}},
      {id:'last_message', kind:'investigate', n:'His Last Message', icon:'📨', ch:241, need:2, ambush:[], lo:78, needFlag:'inv_prince_rheon_missing', lockMsg:'🔒 Finish the previous clue first',
       desc:'Then silence.',
       clues:['Several days ago the Crown Prince left the palace, with a small escort, to investigate unusual movements near an old military road in the northern territory. There were reports of strange sightings and signs of recent activity around an abandoned outpost.', 'His last message mentioned a hidden trail leading deeper into the mountain region. After that, all communication went silent.'], rw:{xp:163600, gold:33620}},
      {id:'search_and_politics', kind:'investigate', n:'Search Teams and Politics', icon:'⚖️', ch:241, need:2, ambush:[], lo:78, needFlag:'inv_last_message', lockMsg:'🔒 Finish the previous clue first',
       desc:'Dangerous terrain.',
       clues:['The royal guards have already sent search teams, but the terrain is dangerous, and the recent weather has made travel difficult.', 'There are also political concerns: if news of the prince\'s disappearance spreads, it could trigger unrest among the nobles and neighbouring kingdoms.'], rw:{xp:163900, gold:33680}},
      {id:'we_will_help', kind:'investigate', n:'We Will Help', icon:'🤝', ch:241, need:2, ambush:[], lo:78, needFlag:'inv_search_and_politics', lockMsg:'🔒 Finish the previous clue first',
       desc:'You\'re not alone.',
       clues:['Sera: "My brother would never be careless... There must be a reason. I want to join the search." "It is too dangerous for you to go yourself."', 'Jade: "We\'ll help you find him. We can look into the route, gather more information, and speak to the teams already searching the area. You\'re not alone in this."'], rw:{xp:164200, gold:33740}},
      {id:'war_room', kind:'investigate', n:'The Full Report', icon:'🗺️', ch:242, need:2, ambush:[], lo:78,
       desc:'Maps, accounts, evidence.',
       clues:['Sera asks the senior officials of the royal household for a full report on the Crown Prince Rheon\'s expedition.'], rw:{xp:164500, gold:33800}},
      {id:'sera_questions', kind:'investigate', n:'Practical Questions', icon:'❔', ch:242, need:2, ambush:[], lo:78, needFlag:'inv_war_room', lockMsg:'🔒 Finish the previous clue first',
       desc:'When, who, which route.',
       clues:['Sera: "When was he last seen? Who travelled with him? Which route did he take? What supplies did he carry? What report sent him there?" He left seven days ago and was last seen at the northern checkpoint near the old military road.'], rw:{xp:164800, gold:33860}},
      {id:'supplies_and_map', kind:'investigate', n:'The Map and the Supplies', icon:'🧭', ch:242, need:2, ambush:[], lo:78, needFlag:'inv_sera_questions', lockMsg:'🔒 Finish the previous clue first',
       desc:'Northern Military Road.',
       clues:['On the map: the Northern Route and the Old Military Road. He travelled with ten royal guards and two scouts, carrying provisions for two weeks, camping equipment and messenger tokens.'], rw:{xp:165100, gold:33920}},
      {id:'sera_matured', kind:'investigate', n:'How Much Sera Has Matured', icon:'🌿', ch:242, need:2, ambush:[], lo:78, needFlag:'inv_supplies_and_map', lockMsg:'🔒 Finish the previous clue first',
       desc:'Someone who has faced real dangers.',
       clues:['Sera: "Thank goodness I came back. If I had stayed away any longer... There might have been even less information left."', 'Jade sees clearly how much Sera has grown: no longer the sheltered princess of the past, but a stronger, wiser Sera, who has returned just in time to help.'], rw:{xp:165400, gold:33980}},
      {id:'old_servants', kind:'investigate', n:'The Old Household', icon:'🧓', ch:243, need:2, ambush:[], lo:78,
       desc:'Still the younger princess.',
       clues:['In the throne hall an old white-bearded official bows: "Your Highness... welcome home! It is an honor to see you again, Princess Seraphina."', 'An old servant: "You are still as graceful as ever, Your Highness. We remember you as the younger princess... the kind child who used to visit the kitchens and speak with us."'], rw:{xp:165700, gold:34040}},
      {id:'kept_quiet', kind:'investigate', n:'Proud of Her Composure', icon:'🤐', ch:243, need:2, ambush:[], lo:78, needFlag:'inv_old_servants', lockMsg:'🔒 Finish the previous clue first',
       desc:'The search continues.',
       clues:['The old official: "You were so young then, Your Highness. To see you now, leading with such composure... we are proud." Sera: "But for now, we must focus on finding Crown Prince Rheon. There is still much to do."'], rw:{xp:166000, gold:34100}},
      {id:'sera_asks', kind:'investigate', n:'The Records She Asks For', icon:'🔍', ch:243, need:2, ambush:[], lo:78, needFlag:'inv_kept_quiet', lockMsg:'🔒 Finish the previous clue first',
       desc:'Nothing overlooked.',
       clues:['Sera: "Please bring me the full route ledgers from the northern road and all branch routes used in the last month. I also need messenger dispatch records, supply lists, and the names of all the military units that passed through this region."', '"Send for any witness accounts: merchants, villagers, or patrols, even if the information seems minor. Nothing should be overlooked." Official: "Understood, Your Highness. We will gather all relevant records and report back as soon as possible."'], rw:{xp:166300, gold:34160}},
      {id:'heir_of_altan', kind:'investigate', n:'Home Remembers That Too', icon:'🦅', ch:243, need:2, ambush:[], lo:78, needFlag:'inv_sera_asks', lockMsg:'🔒 Finish the previous clue first',
       desc:'Ready to lead.',
       clues:['Jade: "This is not just the Sera who travelled with us. This is Princess Seraphina of Altan: composed, decisive, and utterly devoted to her people." Sky: "She\'s still the kind and gentle person we know... but now she also carries the weight of a kingdom."', 'Levi: "Home may remember her as the younger princess, but she has returned grown: no longer sheltered, but ready to lead." She is still the same Sera, but stronger, wiser and more resolute than before. And home remembers that too.'], rw:{xp:166600, gold:34220}},
      {id:'message_from_tribute', kind:'investigate', n:'A Formal Message', icon:'✉️', ch:244, need:2, ambush:[], lo:78,
       desc:'King Hugh Greyson\'s seal.',
       clues:['While the search for Crown Prince Rheon continues, a formal message arrives from Tribute. A palace attendant brings it directly to Princess Seraphina\'s chambers: a blue envelope with a dragon seal, King Hugh Greyson\'s.', '"To Princess Seraphina of Altan: Tribute is relieved to know you have returned home safely. I also extend my concern regarding Crown Prince Rheon\'s disappearance. If assistance is needed, you need only send word. Hugh Greyson."'], rw:{xp:166900, gold:34280}},
      {id:'read_thrice', kind:'investigate', n:'Reading It for a While', icon:'📖', ch:244, need:2, ambush:[], lo:78, needFlag:'inv_message_from_tribute', lockMsg:'🔒 Finish the previous clue first',
       desc:'A thoughtful letter.',
       clues:['Jade: "You\'ve been reading that message for a while." Sera: "It is a thoughtful letter." Jade: "A very thoughtful one, apparently." Sera: "King Greyson has always been considerate."'], rw:{xp:167200, gold:34340}},
      {id:'jade_notices_letter', kind:'investigate', n:'Jade Notices', icon:'👀', ch:244, need:2, ambush:[], lo:78, needFlag:'inv_read_thrice', lockMsg:'🔒 Finish the previous clue first',
       desc:'You smiled before the end.',
       clues:['Jade: "Mm. I noticed you smiled before you reached the end." Sera: "Did I?"', 'Sera folds the letter with unusual care, though her thoughts linger on the sender more than the formal words.'], rw:{xp:167500, gold:34400}},
      {id:'more_than_admiration', kind:'investigate', n:'A Quieter Feeling', icon:'💌', ch:244, need:2, ambush:[], lo:78, needFlag:'inv_jade_notices', lockMsg:'🔒 Finish the previous clue first',
       desc:'Hard to hide.',
       clues:['Jade: "I\'m glad Tribute stands with Altan." Sera: "So am I." Jade: "...I see."', 'The message brings political reassurance, and reveals a quieter feeling Sera can no longer hide quite so easily.'], rw:{xp:167800, gold:34460}},
      {id:'old_records', kind:'investigate', n:'The Old Records', icon:'📜', ch:245, need:2, ambush:[], lo:78,
       desc:'Maps, patrol logs, reports.',
       clues:['Sera and the party review old records related to the route her brother took. Ancient maps, patrol logs and reports are brought out from the royal archives.'], rw:{xp:168100, gold:34520}},
      {id:'elder_looks', kind:'investigate', n:'Your Hair, Your Highness', icon:'🔎', ch:245, need:2, ambush:[], lo:78, needFlag:'inv_old_records', lockMsg:'🔒 Finish the previous clue first',
       desc:'A distinctive golden hue.',
       clues:['Elder: "Princess Seraphina... Your hair... may I take a closer look for a moment?" Sera: "Of course." Elder: "Yes. This is remarkable. Your hair has a distinctive golden hue."'], rw:{xp:168400, gold:34580}},
      {id:'mark_of_awakening', kind:'investigate', n:'The Mark of an Awakened Inheritance', icon:'🌟', ch:245, need:2, ambush:[], lo:78, needFlag:'inv_elder_looks', lockMsg:'🔒 Finish the previous clue first',
       desc:'Rare.',
       clues:['"This is the mark of an awakened royal martial inheritance. Only those of the Altan bloodline directly connected to the royal line usually manifest this when their inner power awakens."', 'In the older records, the royal line is described as bearing "golden hair and the light of the martial spirit" when their abilities truly awaken. It is rare: not every royal ever reaches this stage.'], rw:{xp:168700, gold:34640}},
      {id:'brother_awakened', kind:'investigate', n:'Her Brother Awakened Earlier', icon:'🦅', ch:245, need:2, ambush:[], lo:78, needFlag:'inv_mark_of_awakening', lockMsg:'🔒 Finish the previous clue first',
       desc:'A line that remains strong.',
       clues:['Elder: "Your brother most likely awakened earlier than you, but your own awakening suggests that the line remains strong. This may be relevant to the strange activity near the old military road: a connection to ancient Altan sites and past seal activity."', 'Jade: "Sera... this explains so many things. You\'ve always been strong, but I didn\'t realize you carried so much more."'], rw:{xp:169000, gold:34700}},
      {id:'falcon_records', kind:'investigate', n:'Records of the Falcon Lineage', icon:'📚', ch:246, need:2, ambush:[], lo:78,
       desc:'A rare martial inheritance.',
       clues:['The royal archives contain detailed records of the Falcon Lineage, a rare martial inheritance within Altan\'s royal bloodline.', 'Elder: "It appears only in royal bloodlines, and it rarely awakens in full. Your Highness, your transformation follows the same pattern recorded in these texts."'], rw:{xp:169300, gold:34760}},
      {id:'three_states', kind:'investigate', n:'The Three States', icon:'🎨', ch:246, need:2, ambush:[], lo:78, needFlag:'inv_falcon_records', lockMsg:'🔒 Finish the previous clue first',
       desc:'Dark brown, gold, white.',
       clues:['Dormant State (dark brown hair): before awakening, like other Altan royals. Awakened State (golden hair): the new resting state; the royal martial spirit is active within the body.', 'Full Manifestation (white hair): when channeling the Falcon inheritance in battle: complete manifestation and maximum power.'], rw:{xp:169600, gold:34820}},
      {id:'inheritance_gift', kind:'investigate', n:'A Gift and a Responsibility', icon:'🎁', ch:246, need:2, ambush:[], lo:78, needFlag:'inv_three_states', lockMsg:'🔒 Finish the previous clue first',
       desc:'Trained and controlled over time.',
       clues:['The records also note that the Falcon inheritance often grants enhanced perception, instinct and agility, especially in times of danger. It can be physically and mentally demanding, and must be trained and controlled over time.', 'Elder: "The inheritance is a gift, Your Highness, but also a responsibility. It connects you to your ancestors, and to the royal martial line that has protected Altan for generations."'], rw:{xp:169900, gold:34880}},
      {id:'rightful_heir', kind:'investigate', n:'The Rightful Heir', icon:'👑', ch:246, need:2, ambush:[], lo:78, needFlag:'inv_inheritance_gift', lockMsg:'🔒 Finish the previous clue first',
       desc:'For Altan.',
       clues:['Sera: "So this is who I am now... not just the princess they remember from before. I need to learn how to control this properly... for my brother, for my family, and for Altan."', 'Her growth from a sheltered princess into the rightful heir of the Falcon Lineage: someone who must now stand and act for her kingdom.'], rw:{xp:170200, gold:34940}}
])});
MISSIONS.push(
  {id:'m_border_home', needCh:240, title:'The Border of Home', obj:{type:'steps', steps:[
     {label:'Altan\'s Border', spot:'border_in_view'},
     {label:'Welcome Home', spot:'guards_welcome'},
     {label:'Where Is My Brother?', spot:'where_is_brother'},
     {label:'Across the Border', spot:'cross_the_border'}]}, rw:{xp:568000, gold:118000, rep:1358},
   subj:'The border', body:'Sera is home. Stay close to her. — Greyson'},
  {id:'m_prince_missing', needCh:241, title:'The Prince Who Is Missing', obj:{type:'steps', steps:[
     {label:'Altan Palace', spot:'brought_to_palace'},
     {label:'Prince Rheon Has Not Returned', spot:'prince_rheon_missing'},
     {label:'His Last Message', spot:'last_message'},
     {label:'Search Teams and Politics', spot:'search_and_politics'},
     {label:'We Will Help', spot:'we_will_help'}]}, rw:{xp:570000, gold:118500, rep:1360},
   subj:'The missing prince', body:'Help her find him. — Greyson'},
  {id:'m_thank_goodness', needCh:242, title:'Thank Goodness I Came Back', obj:{type:'steps', steps:[
     {label:'The Full Report', spot:'war_room'},
     {label:'Practical Questions', spot:'sera_questions'},
     {label:'The Map and the Supplies', spot:'supplies_and_map'},
     {label:'How Much Sera Has Matured', spot:'sera_matured'}]}, rw:{xp:572000, gold:119000, rep:1362},
   subj:'The war room', body:'Let Sera lead. — Greyson'},
  {id:'m_what_home_remembers', needCh:243, title:'What Home Remembers', obj:{type:'steps', steps:[
     {label:'The Old Household', spot:'old_servants'},
     {label:'Proud of Her Composure', spot:'kept_quiet'},
     {label:'The Records She Asks For', spot:'sera_asks'},
     {label:'Home Remembers That Too', spot:'heir_of_altan'}]}, rw:{xp:574000, gold:119500, rep:1364},
   subj:'Old servants', body:'They remember the child. Help them see the woman. — Greyson'},
  {id:'m_message_tribute', needCh:244, title:'A Message from Tribute', obj:{type:'steps', steps:[
     {label:'A Formal Message', spot:'message_from_tribute'},
     {label:'Reading It for a While', spot:'read_thrice'},
     {label:'Jade Notices', spot:'jade_notices_letter'},
     {label:'A Quieter Feeling', spot:'more_than_admiration'}]}, rw:{xp:576000, gold:120000, rep:1366},
   subj:'A message', body:'I have sent word to Altan. — Greyson'},
  {id:'m_gold_hair', needCh:245, title:'Gold in Her Hair', obj:{type:'steps', steps:[
     {label:'The Old Records', spot:'old_records'},
     {label:'Your Hair, Your Highness', spot:'elder_looks'},
     {label:'The Mark of an Awakened Inheritance', spot:'mark_of_awakening'},
     {label:'Her Brother Awakened Earlier', spot:'brother_awakened'}]}, rw:{xp:578000, gold:120500, rep:1368},
   subj:'Her hair', body:'Ask the elders what they know. — Greyson'},
  {id:'m_falcon_lineage', needCh:246, title:'The Falcon Lineage', obj:{type:'steps', steps:[
     {label:'Records of the Falcon Lineage', spot:'falcon_records'},
     {label:'The Three States', spot:'three_states'},
     {label:'A Gift and a Responsibility', spot:'inheritance_gift'},
     {label:'The Rightful Heir', spot:'rightful_heir'}]}, rw:{xp:580000, gold:121000, rep:1370},
   subj:'The lineage', body:'Learn what you can of the Falcon Lineage. — Greyson'}
);

/* ---- Story spots of chapters 247-259 (the Altan story; the party travels the old road, the pass, and Tribute) ---- */
LOCATIONS.altan_border.spots.push(
  {id:'falcon_tradition', kind:'investigate', n:'A Battlefield Tradition', icon:'🦅', ch:247, need:2, ambush:[], lo:80,
   desc:'More than royalty.',
   clues:['The Falcon Lineage has always been tied to more than royalty: a martial tradition. Those who bore its mark were expected to lead, break enemy formations, and protect Altan\'s military routes.', 'The Falcon standard was carried by those who opened the way: formation breakers, route guardians and protectors of the realm.'], rw:{xp:158000, gold:33000}},
  {id:'falcon_terrains', kind:'investigate', n:'The Falcon Terrains', icon:'🏔️', ch:247, need:2, ambush:[], lo:80, needFlag:'inv_falcon_tradition', lockMsg:'🔒 Finish the previous clue first',
   desc:'Marked on the old maps.',
   clues:['Historical records mark certain regions as "Falcon Terrains": remote mountain roads, ancient watch routes and old outposts used in past generations, known for unstable terrain and strange energy.', 'The prince\'s expedition followed an old military road that passes through one such territory. It is possible that they crossed into it unknowingly.'], rw:{xp:158300, gold:33060}},
  {id:'names_that_remain', kind:'investigate', n:'Heroes and Warnings', icon:'📜', ch:247, need:2, ambush:[], lo:80, needFlag:'inv_falcon_terrains', lockMsg:'🔒 Finish the previous clue first',
   desc:'Many did not return.',
   clues:['Those of the Falcon Lineage were often sent to the most dangerous regions, where their vision and instincts could detect threats others might miss. Many did not return.', 'Their names remain in Altan\'s war records as both heroes and warnings.'], rw:{xp:158600, gold:33120}},
  {id:'larger_than_expected', kind:'investigate', n:'Larger Than We Expected', icon:'❗', ch:247, need:2, ambush:[], lo:80, needFlag:'inv_names_that_remain', lockMsg:'🔒 Finish the previous clue first',
   desc:'Not a simple investigation.',
   clues:['Elder: "That is why your brother\'s route concerns us. There are old reports of unusual phenomena, disappearances, and signs of lingering power related to the Falcon Terrains."', 'Sera: "And if that\'s true, this is not a simple investigation. It\'s something much larger than we expected."'], rw:{xp:158900, gold:33180}},
  {id:'deliberate_mission', kind:'investigate', n:'A Deliberate Investigation', icon:'🧭', ch:248, need:2, ambush:[], lo:80,
   desc:'Not reckless.',
   clues:['Jade: "These reports came from an old military road used in past generations. They were serious enough for the prince to see with his own eyes. He didn\'t send soldiers. This was not a reckless journey."', 'Conflicting reports had come from the road. Rather than send soldiers into unfamiliar danger, the prince chose to go himself to confirm the truth.'], rw:{xp:159200, gold:33240}},
  {id:'route_reconstructed', kind:'investigate', n:'The Route Reconstructed', icon:'🗺️', ch:248, need:2, ambush:[], lo:80, needFlag:'inv_deliberate_mission', lockMsg:'🔒 Finish the previous clue first',
   desc:'Altan Keep to the Disputed Region.',
   clues:['The reconstruction runs from Altan Keep, to the last confirmed camp, along the Old Military Road (Falcon Route), toward a Disputed Region with reports of unusual activity.', 'His notes show the places he planned to check: an old outpost, a collapsed bridge and a disused watchtower.'], rw:{xp:159500, gold:33300}},
  {id:'conflicting_accounts', kind:'investigate', n:'Conflicting Accounts', icon:'🗣️', ch:248, need:2, ambush:[], lo:80, needFlag:'inv_route_reconstructed', lockMsg:'🔒 Finish the previous clue first',
   desc:'Too different to match.',
   clues:['Sky: "The accounts from travellers are too different. Some describe strange lights. Some heard unusual sounds. And a few reported seeing people who didn\'t match any known faction."', 'Devon: "Who would benefit from spreading conflicting reports? It feels intentional, like someone wanted to draw him there, or hide what\'s really happening."'], rw:{xp:159800, gold:33360}},
  {id:'plan_the_search', kind:'investigate', n:'Check the Last Camp', icon:'🏕️', ch:248, need:2, ambush:[], lo:80, needFlag:'inv_conflicting_accounts', lockMsg:'🔒 Finish the previous clue first',
   desc:'Hidden paths in older maps.',
   clues:['Levi: "We need to check the last camp, the side routes, and any nearby ruins. If they were following the old Falcon Route, there may be hidden paths that are only recorded in older maps."', 'The prince\'s final recorded movements lead deeper into the mountain road, toward a region with a long history and a connection to the Falcon Lineage.'], rw:{xp:160100, gold:33420}}
);
LOCATIONS.altan_road.spots.push(
  {id:'capital_departure', kind:'investigate', n:'Leaving the Capital', icon:'🐎', ch:249, need:2, ambush:[], lo:80,
   desc:'The prince\'s route.',
   clues:['The party departs from the capital, following the route the prince took.'], rw:{xp:160400, gold:33480}},
  {id:'reading_tracks', kind:'investigate', n:'Reading the Tracks', icon:'👣', ch:249, need:2, ambush:[], lo:80, needFlag:'inv_capital_departure', lockMsg:'🔒 Finish the previous clue first',
   desc:'Riders and pack animals.',
   clues:['Levi: "The tracks are recent... This is the prince\'s party. Multiple riders, with pack animals." He identifies the number of riders, the direction of travel and when they passed.', 'Sky: "There are signs of injury here. Someone was bleeding. The trail also shows traces of unnatural corruption..."'], rw:{xp:160700, gold:33540}},
  {id:'abandoned_camp', kind:'investigate', n:'The Abandoned Camp', icon:'⛺', ch:249, need:2, ambush:[], lo:80, needFlag:'inv_reading_tracks', lockMsg:'🔒 Finish the previous clue first',
   desc:'A sudden departure.',
   clues:['Tents hastily dismantled, equipment left behind, signs of a sudden departure. Sera: "They were here about two days ago, moving faster than usual."', 'Devon: "This equipment wasn\'t abandoned carelessly. It looks deliberately broken... as if they didn\'t want it to be used."'], rw:{xp:161000, gold:33600}},
  {id:'prince_crest', kind:'investigate', n:'The Prince\'s Crest', icon:'🩸', ch:249, need:2, ambush:[], lo:80, needFlag:'inv_abandoned_camp', lockMsg:'🔒 Finish the previous clue first',
   desc:'Old blood, new corruption.',
   clues:['Among the remains they find personal items, a damaged satchel, and a blood-stained cloth bearing the prince\'s crest.', 'Sky: "The blood is old, but there are traces of corruption mixed in. Someone here was wounded by something unnatural." The trail continues into the mountains.'], rw:{xp:161300, gold:33660}},
  {id:'ruined_campsite', kind:'investigate', n:'The Ruined Campsite', icon:'⛺', ch:250, need:2, ambush:[], lo:80,
   desc:'Torn banners.',
   clues:['Following the trail, the party finds a ruined campsite: torn banners, broken equipment, and signs of a violent attack.', 'But they are not alone. Several members of the prince\'s escort are still alive.'], rw:{xp:161600, gold:33720}},
  {id:'escort_account', kind:'investigate', n:'The Escort\'s Account', icon:'🪖', ch:250, need:2, ambush:[], lo:80, needFlag:'inv_ruined_campsite', lockMsg:'🔒 Finish the previous clue first',
   desc:'We wouldn\'t be here without him.',
   clues:['"We wouldn\'t be here if it wasn\'t for the prince. When the attack happened, he ordered us to fall back. He stayed behind to draw the creature away."', '"He knew we couldn\'t all escape if we stayed. Someone had to hold it off... and he chose to be that person."'], rw:{xp:161900, gold:33780}},
  {id:'planned_retreat', kind:'investigate', n:'A Planned Retreat', icon:'🛡️', ch:250, need:2, ambush:[], lo:80, needFlag:'inv_escort_account', lockMsg:'🔒 Finish the previous clue first',
   desc:'Not a chaotic flight.',
   clues:['Devon: "He covered their retreat route. The equipment was destroyed to slow pursuit. This was planned, not a chaotic flight."', 'Sky: "There are signs of a non-human presence. The damage isn\'t from bandits or ordinary monsters. This was something else."'], rw:{xp:162200, gold:33840}},
  {id:'deeper_mountains', kind:'investigate', n:'Deeper into the Mountains', icon:'🏔️', ch:250, need:2, ambush:[], lo:80, needFlag:'inv_planned_retreat', lockMsg:'🔒 Finish the previous clue first',
   desc:'Where the land feels wrong.',
   clues:['A soldier: "He told us to run... He said the kingdom still needed us." Sera: "The prince always puts others first. This is just like him."', 'The trail leads deeper into the mountains, toward a region where the land itself feels wrong, and something ancient and dangerous grows stronger.'], rw:{xp:162500, gold:33900}}
);
LOCATIONS.altan_pass.spots.push(
  {id:'barrier_region', kind:'investigate', n:'The Sealed Region', icon:'🧿', ch:251, need:2, ambush:[], lo:80,
   desc:'An ancient barrier.',
   clues:['Following the trail, the party reaches a secluded mountain region sealed by an ancient barrier. Behind it, they find someone alive.', 'Sera immediately recognizes her brother\'s presence. Against everyone\'s warning, she pushes forward.'], rw:{xp:162800, gold:33960}},
  {id:'sibling_reunion', kind:'investigate', n:'Rheon, You\'re Alive', icon:'🤗', ch:251, need:2, ambush:[], lo:80, needFlag:'inv_barrier_region', lockMsg:'🔒 Finish the previous clue first',
   desc:'Affectionate and argumentative.',
   clues:['Sera: "Rheon...! You\'re alive... You\'re really alive..." Rheon: "Sera... You found me."', 'Sera: "Are you insane?! Do you have any idea how worried we were?" Rheon: "I knew you would come eventually. Still as fiery as ever."'], rw:{xp:163100, gold:34020}},
  {id:'his_responsibility', kind:'investigate', n:'His Responsibility', icon:'👑', ch:251, need:2, ambush:[], lo:80, needFlag:'inv_sibling_reunion', lockMsg:'🔒 Finish the previous clue first',
   desc:'As their prince.',
   clues:['Rheon: "I drew the threat here so it wouldn\'t reach the others. They needed to escape. I couldn\'t let my soldiers die for my sake. It wasn\'t foolish. It was my responsibility as their prince."', 'Sera: "You always take everything on yourself... But you should have trusted us. We would have come sooner if we knew."'], rw:{xp:163400, gold:34080}},
  {id:'break_the_seal', kind:'investigate', n:'Break the Seal', icon:'🔓', ch:251, need:2, ambush:[], lo:80, needFlag:'inv_his_responsibility', lockMsg:'🔒 Finish the previous clue first',
   desc:'Far from over.',
   clues:['Rheon is alive, but injured and trapped behind the ancient barrier. The party prepares to help him and find a way to break the seal.', 'Rheon\'s presence confirms that the prince deliberately led the threat here. The barrier, his injuries and the lingering danger mean their journey is far from over.'], rw:{xp:163700, gold:34140}},
  {id:'camp_after_rescue', kind:'investigate', n:'A Camp to Recover', icon:'⛺', ch:252, need:2, ambush:[], lo:80,
   desc:'Injured and exhausted.',
   clues:['After breaking the ancient barrier, the party rescues Rheon and makes camp to allow him to rest and recover from his injuries.', 'Rheon is injured and exhausted, but otherwise stable.'], rw:{xp:164000, gold:34200}},
  {id:'older_sibling', kind:'investigate', n:'You\'re Supposed to Be Older', icon:'😤', ch:252, need:2, ambush:[], lo:80, needFlag:'inv_camp_after_rescue', lockMsg:'🔒 Finish the previous clue first',
   desc:'Four days without a message.',
   clues:['Sera: "You\'re supposed to be older! Who vanishes for days without a single message?!" Rheon: "I had no time to send word."', 'Sera: "You could have died! You left us with nothing but rumours and a trail of broken camps!"'], rw:{xp:164300, gold:34260}},
  {id:'crown_prince_principle', kind:'investigate', n:'A Principle', icon:'👑', ch:252, need:2, ambush:[], lo:80, needFlag:'inv_older_sibling', lockMsg:'🔒 Finish the previous clue first',
   desc:'Willing to face it himself.',
   clues:['Rheon: "The Crown Prince cannot order others into a place he is unwilling to enter himself. I wouldn\'t ask others to face a danger I wasn\'t willing to face myself."', 'Sera: "Your principle doesn\'t require you to vanish for four days. You could have sent someone... a signal... something."'], rw:{xp:164600, gold:34320}},
  {id:'what_siblings_are_for', kind:'investigate', n:'What Siblings Are For', icon:'🤝', ch:252, need:2, ambush:[], lo:80, needFlag:'inv_crown_prince_principle', lockMsg:'🔒 Finish the previous clue first',
   desc:'A reason worth scolding.',
   clues:['Rheon: "I knew you would scold me no matter what. So I might as well give you a reason worth scolding me for." Devon: "Try leaving a message next time. Even heroes can use a little common sense."', 'Rheon is technically the older sibling, but Sera is often the more mature one. The evidence confirms the prince deliberately drew the threat away from his soldiers.'], rw:{xp:164900, gold:34380}},
  {id:'bigger_than_expected', kind:'investigate', n:'Bigger Than We Expected', icon:'❗', ch:253, need:2, ambush:[], lo:80,
   desc:'Older, and deep.',
   clues:['With the prince safe, the party examines the area more closely. Rheon: "My expedition did not cause this. We only exposed what was already here."', 'Sky: "These traces aren\'t recent. They are old, and deep. Something has been moving again."'], rw:{xp:165200, gold:34440}},
  {id:'sealed_corruption', kind:'investigate', n:'Sealed, and Now Breaking', icon:'🧿', ch:253, need:2, ambush:[], lo:80, needFlag:'inv_bigger_than_expected', lockMsg:'🔒 Finish the previous clue first',
   desc:'Not ordinary monsters.',
   clues:['Levi: "The corruption here is not like ordinary monsters. It feels sealed... and now it\'s breaking."', 'Sera: "Look at these symbols. They match the records of an old seal mentioned in Altan\'s archives. It shouldn\'t have reawakened."'], rw:{xp:165500, gold:34500}},
  {id:'seal_weakening', kind:'investigate', n:'The Seal Is Weakening', icon:'🔏', ch:253, need:2, ambush:[], lo:80, needFlag:'inv_sealed_corruption', lockMsg:'🔒 Finish the previous clue first',
   desc:'Sealed generations ago.',
   clues:['The old road leads to a site that was sealed away generations ago. The prince\'s expedition uncovered signs that the seal is weakening.', 'Rheon: "I came because I needed to know the truth. If something this dangerous is stirring, we cannot afford to remain ignorant."'], rw:{xp:165800, gold:34560}},
  {id:'a_warning', kind:'investigate', n:'A Warning', icon:'⚠️', ch:253, need:2, ambush:[], lo:80, needFlag:'inv_seal_weakening', lockMsg:'🔒 Finish the previous clue first',
   desc:'The beginning.',
   clues:['They sense a presence: ancient, powerful, and not fully awakened, but clearly no longer dormant.', 'Devon: "The prince\'s actions gave us something far more important than a simple report. It gave us a warning." Sera: "This is only the beginning."'], rw:{xp:166100, gold:34620}},
  {id:'closed_pass_ruins', kind:'investigate', n:'The Ruined Pass', icon:'🏰', ch:254, need:2, ambush:[], lo:80,
   desc:'Gates sealed.',
   clues:['Following the trail, the party reaches the old mountain pass, once a key military route. Now it lies in ruins, its gates sealed and its watchtowers destroyed.', 'The symbols here match those in Altan\'s old military records: the Falcon lineage.'], rw:{xp:166400, gold:34680}},
  {id:'regiment_records', kind:'investigate', n:'The Regiment\'s Records', icon:'📖', ch:254, need:2, ambush:[], lo:80, needFlag:'inv_closed_pass_ruins', lockMsg:'🔒 Finish the previous clue first',
   desc:'Under the Falcon banner.',
   clues:['Sera: "These are records from an old Altan regiment. They operated along this pass, under the Falcon banner." Levi: "They were stationed here to monitor activity beyond the pass."', 'The regiment was assigned a long-term duty to seal and contain something beyond the pass. But the records end abruptly.'], rw:{xp:166700, gold:34740}},
  {id:'unfinished_duty', kind:'investigate', n:'An Unfinished Duty', icon:'⏳', ch:254, need:2, ambush:[], lo:80, needFlag:'inv_regiment_records', lockMsg:'🔒 Finish the previous clue first',
   desc:'Contained, not ended.',
   clues:['Rheon: "The language here suggests the duty was unfinished. They managed to contain something, but it was not fully dealt with before the regiment disappeared."', 'Sera: "The seal was never complete. The threat was only contained, not ended."'], rw:{xp:167000, gold:34800}},
  {id:'final_inscription', kind:'investigate', n:'The Final Inscription', icon:'🪦', ch:254, need:2, ambush:[], lo:80, needFlag:'inv_unfinished_duty', lockMsg:'🔒 Finish the previous clue first',
   desc:'Even if they fell.',
   clues:['Among the ruins they find a final inscription: a promise left by the regiment that their duty would be completed, even if they fell.', 'Jade: "If the duty remains unfinished, then the threat is still here, and now it is moving again."'], rw:{xp:167300, gold:34860}},
  {id:'officers_gather', kind:'investigate', n:'Officers Gather', icon:'🪖', ch:255, need:2, ambush:[], lo:80,
   desc:'The temporary camp.',
   clues:['At the temporary camp, Altan officers gather to discuss the next steps. Sera speaks with confidence, gaining their attention immediately.'], rw:{xp:167600, gold:34920}},
  {id:'seras_plan', kind:'investigate', n:'Sera\'s Plan', icon:'🗺️', ch:255, need:2, ambush:[], lo:80, needFlag:'inv_officers_gather', lockMsg:'🔒 Finish the previous clue first',
   desc:'The eastern ridge.',
   clues:['Sera: "We need to secure the eastern ridge first. Place scouts here and here. The old watchtowers can still be used if we clear the approach."', '"We cannot split our forces too thin. Maintain a main defensive line here, with a smaller team to investigate the sealed structures. I will lead the scouting unit myself."'], rw:{xp:167900, gold:34980}},
  {id:'you_have_changed', kind:'investigate', n:'You\'ve Changed, Little Sister', icon:'👑', ch:255, need:2, ambush:[], lo:80, needFlag:'inv_seras_plan', lockMsg:'🔒 Finish the previous clue first',
   desc:'A seasoned general.',
   clues:['Rheon: "You\'ve changed, little sister. You used to avoid command meetings. Now look at you, giving orders like a seasoned general."', 'Sera: "Someone has to, when half of you think rank alone is enough to solve everything. I just stopped waiting for others to do what needs to be done."'], rw:{xp:168200, gold:35040}},
  {id:'bridges_the_gap', kind:'investigate', n:'She Bridges the Gap', icon:'🌉', ch:255, need:2, ambush:[], lo:80, needFlag:'inv_you_have_changed', lockMsg:'🔒 Finish the previous clue first',
   desc:'Palace and field.',
   clues:['Jade: "Sera understands both the chain of command and what actually happens in the field." Devon: "Many palace-born nobles have never set foot on a real battlefield, yet they argue as if they know more. Sera bridges that gap."', 'Officer: "Understood, Your Highness. We will prepare the units as you\'ve instructed." Sera: "We move at first light."'], rw:{xp:168500, gold:35100}},
  {id:'beyond_the_pass', kind:'investigate', n:'Beyond the Closed Pass', icon:'🏛️', ch:256, need:2, ambush:[], lo:80,
   desc:'An ancient battlefield.',
   clues:['Beyond the closed pass, the party descends into the ruins and discovers the true nature of what lies here: an ancient battlefield, where something was sealed long ago.', 'The ruins contain records of a great battle from Altan\'s early history, an army that never returned, and a power that had to be sealed beneath the pass.'], rw:{xp:168800, gold:35160}},
  {id:'a_containment', kind:'investigate', n:'A Containment', icon:'🔏', ch:256, need:2, ambush:[], lo:80, needFlag:'inv_beyond_the_pass', lockMsg:'🔒 Finish the previous clue first',
   desc:'Sealed using the battlefield itself.',
   clues:['Sera: "This matches the Falcon lineage records. It wasn\'t just a battle. It was a containment. They sealed something here, using the battlefield itself."', 'Jade: "The land itself remembers. That\'s why the route became unusable. It isn\'t a natural disaster. Something is still here."'], rw:{xp:169100, gold:35220}},
  {id:'feeds_on_conflict', kind:'investigate', n:'It Feeds on Conflict', icon:'🌑', ch:256, need:2, ambush:[], lo:80, needFlag:'inv_a_containment', lockMsg:'🔒 Finish the previous clue first',
   desc:'The more attention, the stronger.',
   clues:['Sky: "This is an ancient phenomenon: a residual battlefield manifestation, or a sealed entity. It feeds on unresolved conflict. The more attention it receives, the stronger it becomes."', 'Levi: "The seals are failing. If this spreads beyond the pass, it could destabilize the entire region."'], rw:{xp:169400, gold:35280}},
  {id:'what_the_prince_met', kind:'investigate', n:'What the Prince Met', icon:'🦅', ch:256, need:2, ambush:[], lo:80, needFlag:'inv_feeds_on_conflict', lockMsg:'🔒 Finish the previous clue first',
   desc:'Born from war and grief.',
   clues:['What lies beyond the pass is the lingering will of a long-dead battlefield: a presence born from war, grief, and unfinished duty.', 'Sera: "So this is what my brother encountered... It wasn\'t just an attack. It was trying to draw him in, to use him."'], rw:{xp:169700, gold:35340}},
  {id:'presence_reveals', kind:'investigate', n:'The Presence Reveals Itself', icon:'🌑', ch:257, need:2, ambush:[], lo:80,
   desc:'The sky turns white.',
   clues:['When the ancient presence fully reveals itself, the buried battlefield stirs, and the sky turns white with Falcon light.', 'Sera: "I am Altan\'s Falcon! This battlefield is not forgotten, and neither are its dead!"'], rw:{xp:170000, gold:35400}},
  {id:'falcon_awakens', kind:'investigate', n:'The Falcon Awakens', icon:'🦅', ch:257, need:2, ambush:[], lo:80, needFlag:'inv_presence_reveals', lockMsg:'🔒 Finish the previous clue first',
   desc:'Hair turning white.',
   clues:['Sera\'s Falcon battle-channeling awakens fully, her hair turning white as the power of Altan flows through her.', 'Rheon: "Sera... You\'ve grown so much. But don\'t push yourself too far. You\'re not just a weapon, you\'re my sister." Sera: "I know! And that is why I will finish this!"'], rw:{xp:170300, gold:35460}},
  {id:'breaking_the_core', kind:'investigate', n:'Breaking the Core', icon:'⚔️', ch:257, need:2, ambush:[], lo:80, needFlag:'inv_falcon_awakens', lockMsg:'🔒 Finish the previous clue first',
   desc:'Sera turns the tide.',
   clues:['Together, Sera and Rheon hold the line, but it is Sera who breaks the enemy\'s core and turns the tide.', 'White as warfire, the Falcon rises, and the buried threat, long sealed, is finally driven back.'], rw:{xp:170600, gold:35520}},
  {id:'true_form', kind:'investigate', n:'The Falcon Lineage in Its True Form', icon:'🌟', ch:257, need:2, ambush:[], lo:80, needFlag:'inv_breaking_the_core', lockMsg:'🔒 Finish the previous clue first',
   desc:'Not a normal enemy.',
   clues:['Sky: "That\'s... the Falcon lineage in its true form." Levi: "No wonder the regiment sealed this place. This isn\'t a normal enemy."', 'Sera: "I\'m still Sera. Just... a Sera who will not let Altan\'s past swallow its future. We end this here."'], rw:{xp:170900, gold:35580}},
  {id:'after_the_battle', kind:'investigate', n:'After the Battle', icon:'🌙', ch:258, need:2, ambush:[], lo:80,
   desc:'A quieter camp.',
   clues:['After the battle, the camp is quieter. The immediate threat has been driven back, and Altan\'s soldiers begin their recovery.', 'Sera: "You look much better. I\'m glad you\'re really here." Rheon: "It seems my reckless little sister can still worry after all."'], rw:{xp:171200, gold:35640}},
  {id:'cannot_keep_disappearing', kind:'investigate', n:'You Cannot Keep Disappearing', icon:'😠', ch:258, need:2, ambush:[], lo:80, needFlag:'inv_after_the_battle', lockMsg:'🔒 Finish the previous clue first',
   desc:'Altan needs you.',
   clues:['Sera: "I understand why you did it. But you cannot keep disappearing, Brother. Altan needs you, and so do the people who travel with me."', 'Rheon: "You\'re right. You are no longer the younger princess who stays behind. You have seen the world, and you have become someone yourself."'], rw:{xp:171500, gold:35700}},
  {id:'two_homes', kind:'investigate', n:'Two Homes', icon:'🏠', ch:258, need:2, ambush:[], lo:80, needFlag:'inv_cannot_keep_disappearing', lockMsg:'🔒 Finish the previous clue first',
   desc:'I don\'t want to choose.',
   clues:['Sera: "I am still Altan\'s princess. But I also have a place with Jade and the others. I don\'t want to choose between the two." Rheon: "You don\'t have to. Altan will always be your home."', 'Rheon: "You also belong where you are needed. That includes Jade\'s party."'], rw:{xp:171800, gold:35760}},
  {id:'a_chair_for_me', kind:'investigate', n:'A Chair for Me', icon:'🪑', ch:258, need:2, ambush:[], lo:80, needFlag:'inv_two_homes', lockMsg:'🔒 Finish the previous clue first',
   desc:'Come home sometimes.',
   clues:['Rheon: "I\'ll try. On one condition. You promise to come home sometimes." Sera: "I promise. Altan will always have a chair for me. And Jade\'s party will keep a chair too."', 'Sera now has a place at two tables, and both are part of who she is: a princess of Altan, a trusted companion on the road.'], rw:{xp:172100, gold:35820}}
);
LOCATIONS.capital.spots.push(
  {id:'thank_him_in_person', kind:'investigate', n:'Thank Him in Person', icon:'🎀', ch:259, need:2, ambush:[], lo:80,
   desc:'Jade\'s idea.',
   clues:['With the prince safely home, Jade decides Sera should personally thank Greyson for his concern.', 'Jade: "You should go and thank Greyson in person. He was genuinely worried about you." Sera: "Do I have to? I\'ll just send a message instead..."'], rw:{xp:172400, gold:35880}},
  {id:'formal_audience', kind:'investigate', n:'A Formal Audience', icon:'👑', ch:259, need:2, ambush:[], lo:80, needFlag:'inv_thank_him_in_person', lockMsg:'🔒 Finish the previous clue first',
   desc:'Great relief.',
   clues:['Reluctantly, Sera makes a formal visit to meet Greyson at the palace. Greyson: "Princess Sera. Your safe return is a great relief to me. Tribute is grateful for your efforts."', 'Greyson: "Your presence and support are important to Altan. I trust you will continue to work closely with my council when necessary."'], rw:{xp:172700, gold:35940}},
  {id:'formal_message', kind:'investigate', n:'The Formal Message', icon:'📨', ch:259, need:2, ambush:[], lo:80, needFlag:'inv_formal_audience', lockMsg:'🔒 Finish the previous clue first',
   desc:'Copied to the council.',
   clues:['Later, Sera receives Greyson\'s response: an extremely formal diplomatic message, copied to the Imperial Council, Foreign Affairs Office, Royal Archives, Military Command, Trade Bureau, Northern Provinces Administration, and the Altan Embassy to Tribute.', 'Sera: "He copied... the entire council? This is more formal than a trade agreement."'], rw:{xp:173000, gold:36000}},
  {id:'matchmaking_failure_one', kind:'investigate', n:'Matchmaking Failure #1', icon:'😂', ch:259, need:2, ambush:[], lo:80, needFlag:'inv_formal_message', lockMsg:'🔒 Finish the previous clue first',
   desc:'Not what I was hoping for.',
   clues:['Jade: "Ah... Matchmaking failure #1." Sera: "That is not what I was hoping for..."'], rw:{xp:173300, gold:36060}}
);
MISSIONS.push(
  {id:'m_s247', needCh:247, title:'The Banner Before the Crown', obj:{type:'steps', steps:[
     {label:'A Battlefield Tradition', spot:'falcon_tradition'},
     {label:'The Falcon Terrains', spot:'falcon_terrains'},
     {label:'Heroes and Warnings', spot:'names_that_remain'},
     {label:'Larger Than We Expected', spot:'larger_than_expected'}]}, rw:{xp:584000, gold:122000, rep:1374},
   subj:'The Banner Before the Crown', body:'Altan needs this resolved. Stay close to Sera. — Greyson'},
  {id:'m_s248', needCh:248, title:'The Last Known Route', obj:{type:'steps', steps:[
     {label:'A Deliberate Investigation', spot:'deliberate_mission'},
     {label:'The Route Reconstructed', spot:'route_reconstructed'},
     {label:'Conflicting Accounts', spot:'conflicting_accounts'},
     {label:'Check the Last Camp', spot:'plan_the_search'}]}, rw:{xp:586000, gold:122500, rep:1376},
   subj:'The Last Known Route', body:'Altan needs this resolved. Stay close to Sera. — Greyson'},
  {id:'m_s249', needCh:249, title:'Tracks Beyond the Pass', obj:{type:'steps', steps:[
     {label:'Leaving the Capital', spot:'capital_departure'},
     {label:'Reading the Tracks', spot:'reading_tracks'},
     {label:'The Abandoned Camp', spot:'abandoned_camp'},
     {label:'The Prince\'s Crest', spot:'prince_crest'}]}, rw:{xp:588000, gold:123000, rep:1378},
   subj:'Tracks Beyond the Pass', body:'Altan needs this resolved. Stay close to Sera. — Greyson'},
  {id:'m_s250', needCh:250, title:'Beneath the Fallen Banner', obj:{type:'steps', steps:[
     {label:'The Ruined Campsite', spot:'ruined_campsite'},
     {label:'The Escort\'s Account', spot:'escort_account'},
     {label:'A Planned Retreat', spot:'planned_retreat'},
     {label:'Deeper into the Mountains', spot:'deeper_mountains'}]}, rw:{xp:590000, gold:123500, rep:1380},
   subj:'Beneath the Fallen Banner', body:'Altan needs this resolved. Stay close to Sera. — Greyson'},
  {id:'m_s251', needCh:251, title:'The Prince in the Mountain', obj:{type:'steps', steps:[
     {label:'The Sealed Region', spot:'barrier_region'},
     {label:'Rheon, You\'re Alive', spot:'sibling_reunion'},
     {label:'His Responsibility', spot:'his_responsibility'},
     {label:'Break the Seal', spot:'break_the_seal'}]}, rw:{xp:592000, gold:124000, rep:1382},
   subj:'The Prince in the Mountain', body:'Altan needs this resolved. Stay close to Sera. — Greyson'},
  {id:'m_s252', needCh:252, title:'You Are Supposed to Be Older', obj:{type:'steps', steps:[
     {label:'A Camp to Recover', spot:'camp_after_rescue'},
     {label:'You\'re Supposed to Be Older', spot:'older_sibling'},
     {label:'A Principle', spot:'crown_prince_principle'},
     {label:'What Siblings Are For', spot:'what_siblings_are_for'}]}, rw:{xp:594000, gold:124500, rep:1384},
   subj:'You Are Supposed to Be Older', body:'Altan needs this resolved. Stay close to Sera. — Greyson'},
  {id:'m_s253', needCh:253, title:'What Followed Him Home', obj:{type:'steps', steps:[
     {label:'Bigger Than We Expected', spot:'bigger_than_expected'},
     {label:'Sealed, and Now Breaking', spot:'sealed_corruption'},
     {label:'The Seal Is Weakening', spot:'seal_weakening'},
     {label:'A Warning', spot:'a_warning'}]}, rw:{xp:596000, gold:125000, rep:1386},
   subj:'What Followed Him Home', body:'Altan needs this resolved. Stay close to Sera. — Greyson'},
  {id:'m_s254', needCh:254, title:'The Closed Pass', obj:{type:'steps', steps:[
     {label:'The Ruined Pass', spot:'closed_pass_ruins'},
     {label:'The Regiment\'s Records', spot:'regiment_records'},
     {label:'An Unfinished Duty', spot:'unfinished_duty'},
     {label:'The Final Inscription', spot:'final_inscription'}]}, rw:{xp:598000, gold:125500, rep:1388},
   subj:'The Closed Pass', body:'Altan needs this resolved. Stay close to Sera. — Greyson'},
  {id:'m_s255', needCh:255, title:'A Princess Among Soldiers', obj:{type:'steps', steps:[
     {label:'Officers Gather', spot:'officers_gather'},
     {label:'Sera\'s Plan', spot:'seras_plan'},
     {label:'You\'ve Changed, Little Sister', spot:'you_have_changed'},
     {label:'She Bridges the Gap', spot:'bridges_the_gap'}]}, rw:{xp:600000, gold:126000, rep:1390},
   subj:'A Princess Among Soldiers', body:'Altan needs this resolved. Stay close to Sera. — Greyson'},
  {id:'m_s256', needCh:256, title:'The Thing Beyond the Pass', obj:{type:'steps', steps:[
     {label:'Beyond the Closed Pass', spot:'beyond_the_pass'},
     {label:'A Containment', spot:'a_containment'},
     {label:'It Feeds on Conflict', spot:'feeds_on_conflict'},
     {label:'What the Prince Met', spot:'what_the_prince_met'}]}, rw:{xp:602000, gold:126500, rep:1392},
   subj:'The Thing Beyond the Pass', body:'Altan needs this resolved. Stay close to Sera. — Greyson'},
  {id:'m_s257', needCh:257, title:'White as Warfire', obj:{type:'steps', steps:[
     {label:'The Presence Reveals Itself', spot:'presence_reveals'},
     {label:'The Falcon Awakens', spot:'falcon_awakens'},
     {label:'Breaking the Core', spot:'breaking_the_core'},
     {label:'The Falcon Lineage in Its True Form', spot:'true_form'}]}, rw:{xp:604000, gold:127000, rep:1394},
   subj:'White as Warfire', body:'Altan needs this resolved. Stay close to Sera. — Greyson'},
  {id:'m_s258', needCh:258, title:'A Place at Two Tables', obj:{type:'steps', steps:[
     {label:'After the Battle', spot:'after_the_battle'},
     {label:'You Cannot Keep Disappearing', spot:'cannot_keep_disappearing'},
     {label:'Two Homes', spot:'two_homes'},
     {label:'A Chair for Me', spot:'a_chair_for_me'}]}, rw:{xp:606000, gold:127500, rep:1396},
   subj:'A Place at Two Tables', body:'Altan needs this resolved. Stay close to Sera. — Greyson'},
  {id:'m_s259', needCh:259, title:'Jade\'s Excellent Idea', obj:{type:'steps', steps:[
     {label:'Thank Him in Person', spot:'thank_him_in_person'},
     {label:'A Formal Audience', spot:'formal_audience'},
     {label:'The Formal Message', spot:'formal_message'},
     {label:'Matchmaking Failure #1', spot:'matchmaking_failure_one'}]}, rw:{xp:608000, gold:128000, rep:1398},
   subj:'Jade\'s Excellent Idea', body:'Altan needs this resolved. Stay close to Sera. — Greyson'}
);
LORE.push(
  {ch:247, n:'Falcon Terrains', t:'Remote mountain roads, ancient watch routes and old outposts marked in Altan\'s records as Falcon Terrains: unstable terrain, strange energy, reports of unusual activity.'},
  {ch:251, n:'Prince Rheon\'s Return', t:'Prince Rheon of Altan drew a supernatural threat away from his soldiers so they could escape, and was found alive behind an ancient barrier.'},
  {ch:254, n:'The Closed Pass', t:'An old mountain pass, once a key military route, sealed by an Altan regiment of the Falcon lineage. Its duty was never finished.'},
  {ch:256, n:'The Thing Beyond the Pass', t:'The lingering will of a long-dead battlefield, born from war, grief and unfinished duty. It feeds on unresolved conflict.'},
  {ch:257, n:'White as Warfire', t:'At the decisive battle Sera channelled the Falcon lineage fully: her hair turned white and the buried threat was driven back.'},
  {ch:259, n:'Matchmaking Failure #1', t:'Jade sent Sera to thank Greyson in person. His reply was copied to the entire council.'},
);

/* ---- Story spots of chapters 260-262 (the Tribute palace; Arc X closes and the Altan Capital opens at 262) ---- */
LOCATIONS.capital.spots.push(
  {id:'private_report_planned', kind:'investigate', n:'A Private Report', icon:'🗒️', ch:260, need:2, ambush:[], lo:80,
   desc:'Just the two of them.',
   clues:['Jade arranges what she thinks will be a private strategic discussion between Sera and Greyson.', 'However, when they arrive, Greyson has brought ministers, guards, a clerk, and Adrian. Sera quickly realises this is not a private meeting at all.'], rw:{xp:168000, gold:34800}},
  {id:'never_truly_private', kind:'investigate', n:'Never Truly Private', icon:'🏛️', ch:260, need:2, ambush:[], lo:80, needFlag:'inv_private_report_planned', lockMsg:'🔒 Finish the previous clue first',
   desc:'A full council discussion.',
   clues:['Sera: "Your Majesty... I thought this was a private report?" Greyson: "Matters concerning Altan and Tribute are never truly private, Princess Sera."', 'Jade: "I may have overestimated our ability to keep things small."'], rw:{xp:168300, gold:34860}},
  {id:'seras_assessment', kind:'investigate', n:'Sera\'s Assessment', icon:'📜', ch:260, need:2, ambush:[], lo:80, needFlag:'inv_never_truly_private', lockMsg:'🔒 Finish the previous clue first',
   desc:'The sealed region.',
   clues:['Greyson: "Please, Princess Sera. Share your assessment. I would also like to hear your perspective on Altan\'s next steps."', 'Sera: "The sealed region we encountered... I believe it is directly linked to Altan\'s history, and we will need continued cooperation between Altan and Tribute."'], rw:{xp:168600, gold:34920}},
  {id:'matchmaking_failure_two', kind:'investigate', n:'Matchmaking Failure #2', icon:'😂', ch:260, need:2, ambush:[], lo:80, needFlag:'inv_seras_assessment', lockMsg:'🔒 Finish the previous clue first',
   desc:'Rheon keeps an eye on it.',
   clues:['Rheon quickly realises something is going on: "Why is Greyson so interested in Sera\'s report...? This is more than a report, isn\'t it? I need to keep an eye on this."', 'Jade: "Matchmaking failure #2."'], rw:{xp:168900, gold:34980}},
  {id:'quiet_dinner_planned', kind:'investigate', n:'A Small Quiet Dinner', icon:'🍽️', ch:261, need:2, ambush:[], lo:80,
   desc:'Just the four of us.',
   clues:['Jade: "It\'s just a small, quiet dinner. Just the four of us. Nothing formal." Rheon: "A simple meal between friends. I\'ll make the arrangements."', 'Jade and Sera\'s brother make the disastrous mistake of joining forces.'], rw:{xp:169200, gold:35040}},
  {id:'state_banquet', kind:'investigate', n:'A State Banquet', icon:'🏮', ch:261, need:2, ambush:[], lo:80, needFlag:'inv_quiet_dinner_planned', lockMsg:'🔒 Finish the previous clue first',
   desc:'Greyson expands it.',
   clues:['Greyson interprets it as an official Altan-Tribute diplomatic dinner and expands it into a formal banquet, with ministers, officials and key representatives from both Altan and Tribute.', 'Sera: "...This is not a quiet meal..." Jade: "Oh... this became bigger than expected."'], rw:{xp:169500, gold:35100}},
  {id:'a_very_effective_thank_you', kind:'investigate', n:'A Very Effective Thank-You', icon:'🍷', ch:261, need:2, ambush:[], lo:80, needFlag:'inv_state_banquet', lockMsg:'🔒 Finish the previous clue first',
   desc:'At least the food is excellent.',
   clues:['Greyson: "I am honoured that Altan has joined us tonight. This gathering strengthens the bond between our kingdoms." Sera: "I just wanted a quiet meal... Why is half the palace here...?!"', 'Jade: "You did want to thank him in person. Consider this a very effective thank-you, Princess."'], rw:{xp:169800, gold:35160}},
  {id:'matchmaking_failure_three', kind:'investigate', n:'Matchmaking Failure #3', icon:'😂', ch:261, need:2, ambush:[], lo:80, needFlag:'inv_a_very_effective_thank_you', lockMsg:'🔒 Finish the previous clue first',
   desc:'Mission accomplished (from my side).',
   clues:['Greyson: "To Altan and Tribute: may our paths continue to cross, in friendship and prosperity." Sera: "This is matchmaking failure #3..."', 'Jade: "From a quiet dinner to a royal banquet... Mission accomplished (from my side)."'], rw:{xp:170100, gold:35220}},
  {id:'quiet_conversation', kind:'investigate', n:'A Quiet Conversation', icon:'💬', ch:262, need:2, ambush:[], lo:80,
   desc:'Without Jade\'s help.',
   clues:['After everyone stops interfering, Sera and Greyson finally share a short, genuine conversation naturally.', 'Sera: "Thank you... for coming all this way. I know it must have been a long journey." Greyson: "It was my duty. Your safety matters to Tribute. And... I wanted to see for myself how you are doing."'], rw:{xp:170400, gold:35280}},
  {id:'thanks_to_friends', kind:'investigate', n:'Thanks to My Friends', icon:'🤝', ch:262, need:2, ambush:[], lo:80, needFlag:'inv_quiet_conversation', lockMsg:'🔒 Finish the previous clue first',
   desc:'An admirable spirit.',
   clues:['Sera: "I\'m doing well. ...Thanks to my friends." Greyson: "You have an admirable spirit. I see that... now."', 'Sera: "Just as we\'re about to leave?" Greyson: "Yes. The longer we stay, the more complications we create. Let\'s go before we do something foolish."'], rw:{xp:170700, gold:35340}},
  {id:'a_princess_in_her_own_right', kind:'investigate', n:'A Princess in Her Own Right', icon:'👑', ch:262, need:2, ambush:[], lo:80, needFlag:'inv_thanks_to_friends', lockMsg:'🔒 Finish the previous clue first',
   desc:'A small shift in perspective.',
   clues:['For the first time, Greyson looks at Sera not just as Jade\'s travelling companion, but as Sera: a princess, in her own right.', 'It\'s only a small shift in perspective. But it\'s the beginning of something new.'], rw:{xp:171000, gold:35400}},
  {id:'altan_destination', kind:'investigate', n:'A New Destination', icon:'🦅', ch:262, need:2, ambush:[], lo:80, needFlag:'inv_a_princess_in_her_own_right', lockMsg:'🔒 Finish the previous clue first',
   desc:'Revisitable.',
   clues:['The party prepares to leave, with no more misunderstandings, no more well-meaning interference, and no more matchmaking disasters (for now).', 'With the Altan Kingdom now open as a revisitable world-map destination, the journey continues. The proud kingdom of Altan: a land of snowy mountains, golden halls and unwavering loyalty.'], rw:{xp:171300, gold:35460}}
);
MISSIONS.push(
  {id:'m_s260', needCh:260, title:'A Private Report', obj:{type:'steps', steps:[
     {label:'A Private Report', spot:'private_report_planned'},
     {label:'Never Truly Private', spot:'never_truly_private'},
     {label:'Sera\'s Assessment', spot:'seras_assessment'},
     {label:'Matchmaking Failure #2', spot:'matchmaking_failure_two'}]}, rw:{xp:600000, gold:127000, rep:1400},
   subj:'A Private Report', body:'A matter of the heart is not a matter of state. — Greyson'},
  {id:'m_s261', needCh:261, title:'A Dinner for Two', obj:{type:'steps', steps:[
     {label:'A Small Quiet Dinner', spot:'quiet_dinner_planned'},
     {label:'A State Banquet', spot:'state_banquet'},
     {label:'A Very Effective Thank-You', spot:'a_very_effective_thank_you'},
     {label:'Matchmaking Failure #3', spot:'matchmaking_failure_three'}]}, rw:{xp:602000, gold:127500, rep:1402},
   subj:'A Dinner for Two', body:'A matter of the heart is not a matter of state. — Greyson'},
  {id:'m_s262', needCh:262, title:'Without Jade\'s Help', obj:{type:'steps', steps:[
     {label:'A Quiet Conversation', spot:'quiet_conversation'},
     {label:'Thanks to My Friends', spot:'thanks_to_friends'},
     {label:'A Princess in Her Own Right', spot:'a_princess_in_her_own_right'},
     {label:'A New Destination', spot:'altan_destination'}]}, rw:{xp:604000, gold:128000, rep:1404},
   subj:'Without Jade\'s Help', body:'Altan is open to you whenever you wish. — Greyson'}
);
LORE.push(
  {ch:260, n:'A Private Report', t:'Jade arranged what she thought would be a private discussion between Sera and Greyson. Greyson brought the council. Matchmaking failure #2.'},
  {ch:261, n:'A Dinner for Two', t:'A quiet dinner became a royal banquet. Matchmaking failure #3.'},
  {ch:262, n:'Without Jade\'s Help', t:'Sera and Greyson shared a short, genuine conversation. The Altan Kingdom is now a permanent destination.'},
);

/* A newcomer (Rheon) starts at the party's average bond, so joining does not drag down Jade's party-bond level (it is the average of the party). */
function startBondFor(id){
  if(id!=='rheon') return;
  const o = G.party.filter(x => x!=='jade' && x!==id && !CHARACTERS[x].placeholder && !isCompanion(x));
  if(o.length) U(id).bp = Math.round(o.reduce((a, x) => a + U(x).bp, 0) / o.length);
}

/* Arc XI roster (author): Rin is optional (two archers are not needed beside Levi) and Sera stays in Altan. When Rheon joins at ch263 the seat he needs is freed first:
   Sera's away status is applied, and Rin steps back to the bench if the five seats are full. She can be put back in the party screen at any time. */
function preRecruit(id){
  if(id !== 'rheon') return;
  if(typeof syncAway==='function') syncAway();
  if(G.active.includes('rin') && activeCount() >= slotCap()){ G.active = G.active.filter(x => x !== 'rin'); G.benchedRin = true; }
}
