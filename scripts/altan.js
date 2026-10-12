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
const altanSpot = (id, n, icon, desc, clues, roles, prev, ch, xp, gold, ambush, lo) =>
  ({id, kind:'investigate', n, icon, ch:ch||ALTAN_QUEST_CH, need:3, ambush:ambush||[], lo:lo||78, roles, desc, clues, rw:{xp, gold}, ...(prev ? {needFlag:'inv_'+prev, lockMsg:'🔒 Finish the previous clue first'} : {})});
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
      altanSpot('locate_prince','Locate the Prince','🔦','Beyond the pass.',['The escort points toward where the prince was last seen.','Levi and Rin follow the signs of pursuit.','Sky senses where the trail fades.'],['levi','rin','sky'],'surviving_escort',ALTAN_QUEST_CH,145500,30300,['shade_wraith','relic_spirit']),
      altanSpot('escort_back','Escort Him Safely Back','🧭','The way down.',['The prince must be brought back through the pass safely.','Devon plans the withdrawal. Levi covers the rear. Sera keeps to the Altan protocol of escort.'],['devon','levi','seraphina'],'locate_prince',ALTAN_QUEST_CH,146000,30400,['shade_beast','shade_wraith']),
      altanSpot('supernatural_cause','Investigate the Supernatural Cause','🌑','Why he vanished.',['Something other than soldiers took part in the disappearance.','Sky reads the residue left in the pass.','Jade sets the findings beside the soldiers\' accounts.'],['sky','jade'],'escort_back',ALTAN_QUEST_CH,146500,30500,['shade_wraith','relic_spirit']),
      {id:'pass_hunt', kind:'hunt', n:'The Mountain Pass', icon:'🗡️', desc:'Beasts and shades in the high pass.', pool:['shade_beast','shade_wraith','relic_spirit'], lo:78},
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
  {a:'capital', b:'altan_border', mode:'carriage', n:'The Altan Route', days:6, fare:90, risk:.45, pool:['road_bandit','shade_beast','forest_wolf']},
  {a:'altan_border', b:'altan_road', mode:'carriage', n:'The Old Military Road', days:1, fare:0, risk:.4, pool:['road_bandit','shade_beast','shade_wraith']},
  {a:'altan_road', b:'altan_pass', mode:'carriage', n:'Up to the Pass', days:1, fare:0, risk:.45, pool:['shade_beast','shade_wraith','relic_spirit']},
  {a:'altan_pass', b:'altan_capital', mode:'carriage', n:'The Falcon Road', days:2, fare:40, risk:.35, pool:['road_bandit','shade_beast','relic_spirit']},
);
AREA_LOOT.altan_road = [{id:'frontier_hide',chance:.30,needCh:ALTAN_ROUTE_CH},{id:'spirit_thread',chance:.15,needCh:ALTAN_ROUTE_CH}];
AREA_LOOT.altan_pass = [{id:'seal_dust',chance:.20,needCh:ALTAN_ROUTE_CH},{id:'spirit_thread',chance:.20,needCh:ALTAN_ROUTE_CH}];
WORLD_MAPS.push({id:'altan', n:'The Altan Route', img:'assets/maps/altan.webp', open:() => G.ch >= ALTAN_ROUTE_CH, schem:true,   // picture not generated yet; schematic positions are placeholders
  locs:['altan_border','altan_road','altan_pass','altan_capital'],
  nodes:[{k:'Tribute',x:15,y:80,loc:'capital',ref:true},{k:'Border Garrison',x:35,y:62,loc:'altan_border'},{k:'Old Military Road',x:50,y:44,loc:'altan_road'},{k:'Mountain Pass',x:66,y:26,loc:'altan_pass'},{k:'Altan Capital',x:84,y:12,loc:'altan_capital'}]});
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
