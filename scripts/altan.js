/* =====================================================================
   ARC X: THE ALTAN ROUTE (chapters 239 onward; Altan opens fully after ch262)
   1. Altan Route: a new world-map destination. From ch239 only the route and border region are open (Border Garrison, Old Military Road, Mountain Pass).
      After ch262 Altan is permanently revisitable: the Altan Capital opens with the Falcon Palace, Royal Archive, Training Grounds, Altan Market, Royal Gardens and Princess Quarters.
   2. The Missing Prince (ch241): a ten-objective investigation along the border region.
   3. Party investigation roles: on a spot that lists roles, each role character in the party notices something others miss (a little XP). Never required: nobody is locked out.
   First-pass: the route lengths, clue wording and the quest brief are placeholders until the Arc X chapters arrive; the Altan map picture (assets/maps/altan.webp) is not generated yet.
   Nothing here can be reached before chapter 239 is completed.
   ===================================================================== */
const ALTAN_ROUTE_CH = 239, ALTAN_QUEST_CH = 241, ALTAN_OPEN_CH = 262;
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
  {a:'capital', b:'altan_border', mode:'carriage', n:'The Altan Route', days:6, fare:90, risk:.45, pool:['road_bandit','shade_beast','forest_wolf']},
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
   subj:'The missing prince', body:'An Altan prince has not returned from his expedition. Find him, and find out why. — Greyson'});
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
CHARACTERS.altan_prince = {
  n:'The Altan Prince', icon:'🦅', cls:'Altan Prince', role:'Vanguard (temporary guest)', combat:'Strong front-line attack, reckless', guestOnly:true, companion:true, special:true,
  identity:'Seraphina\'s brother, a prince of Altan: strong, and exactly the sort of man she expects to find stranded on a mountain. A temporary guest, never a recruit. His name is not yet known.',
  style:['Vanguard','Cover','Rallying'], strength:'Front-line attack',
  weapon:'Altan Sabre', signature:'Royal Vanguard', sigDesc:'A strong front-line attack.',
  base:{hp:100,mp:24,atk:15,mag:5,def:10,spd:11}, grow:{hp:9,mp:1.8,atk:2.1,mag:.4,def:1.1,spd:1},
  skills:[
   {id:'royal_vanguard',n:'Royal Vanguard',icon:'⚔️',mp:6,kind:'phys',tgt:'foe',pow:2.1,req:{lvl:1},sig:true,desc:'SIGNATURE. A strong front-line attack.'},
   {id:'stand_behind_me',n:'Stand Behind Me',icon:'🛡️',mp:7,kind:'support',tgt:'self',fx:[{k:'cover',d:2}],req:{lvl:1},desc:'Takes the next blow meant for an ally.'},
   {id:'princes_rally',n:'Prince\'s Rally',icon:'🚩',mp:9,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'atk',m:1.1,d:3},{k:'buff',stat:'spd',m:1.05,d:3}],req:{lvl:1},desc:'A small rise in the party\'s morale: attack and speed up a little.'},
   {id:'reckless_advance',n:'Reckless Advance',icon:'💢',mp:8,kind:'phys',tgt:'foe',pow:2.7,fx:[{k:'buff',stat:'def',m:.75,d:2,self:true}],req:{lvl:1},desc:'A strong attack that leaves his guard open: his defence drops for two turns.'},
  ], evo:{tiers:[]}, bond:null };
ROSTER.push('altan_prince'); XP_CLASS.altan_prince = 'fighter';
GUEST_RULES.altan_prince = {flag:['altan_prince_rescued'], regions:['altan'], fromCh:251, untilCh:262, sync:true, note:'The Altan prince fights beside the party in the Altan Kingdom after chapter 251, until the Altan story ends. He is a guest, never a recruit.'};
/* ---- 7. Sera's awakening quest: Legacy of the Golden Falcon (ch245-257). The awakening itself is story: ch257 sets sera_awakened (Falcon Banner: Awakened, white-hair battle state). ---- */
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
   {label:'Trigger Sera\'s full awakening', flag:'sera_awakened'}]}, rw:{xp:620000, gold:130000, rep:1450},
   subj:'The Golden Falcon', body:'Sera has asked to look into her house\'s old regiment. Go with her. — Greyson'});
deed('sera_awakened', 'bonds', 'The Golden Falcon', '🦅', 'Sera\'s full awakening: Falcon Banner, Awakened.', () => !!G.flags.sera_awakened);
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
  {ch:245, n:'The Falcon Lineage', t:'The Altan royal house is known by the falcon. Seraphina carries its banner as her signature, and the border garrison keeps copies of its records.'},
  {ch:246, n:'The Lost Regiment', t:'An Altan regiment was lost in the mountain pass long ago. Its banner and its seal are part of the royal house\'s history.'},
  {ch:247, n:'The Old Training Ground', t:'The regiment drilled beside the old military road. The training ground is overgrown now.'},
  {ch:261, n:'Jade\'s Matchmaking Record', t:'Attempts: 3. Successful: 0. Devon: "Perhaps return to demon hunting."'},
);
