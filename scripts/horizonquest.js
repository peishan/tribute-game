/* =====================================================================
   TRIBUTE — CRIMSON HORIZON ON TRIBUTE'S INVESTIGATION FRAMEWORK (docs/CRIMSON_HORIZON_PLAN.md)
   The sequel is played the way Tribute is played: travel to a place, search a clue spot (one search = one day, with Jade's, Devon's and Sally's daily bonuses), finish the spot, advance the mission.
   Built so far: Arc I (the prologue and chapters 1-10) as investigation spots in three new places (the Crimson Tide, the Reef Harbour, Fair Tide), the leviathan fight as a boss spot that uses the
   13-member crew battle (scripts/horizon.js), one mission for the arc, and the first case file of the BLACK PEARL CASE (an Open Questions entry with Confirmed / Theory / Unresolved findings).
   Reading a chapter's comic (Horizon tab) opens its spot; finishing the spot opens the next chapter. The Crimson Tide is reached by the gangway at Dragonvale Harbour (the Ally Network).
   ===================================================================== */
REGIONS.horizon = {n:'Beyond the Horizon', icon:'🌅'};
const HZQ_PLACES = {
  hz_ship:{n:'The Crimson Tide', icon:'⚓', desc:'The great ship with the crimson dragon on her sails: one vessel, one crew, two worlds.'},
  hz_reef:{n:'The Reef Harbour', icon:'🏝️', desc:'A fishing harbour behind a reef, where violet lights pulse under the water before every surge.'},
  fair_tide:{n:'Fair Tide', icon:'🏘️', desc:'The settlement built by people who were once strangers to their own world: the research hall, the harbour and the infirmary.'},
};
Object.assign(HZQ_PLACES, {
  hz_shelf:{n:'The Storm Shelf', icon:'🌊', desc:'Open water north of the reef, where two storm fronts move against the wind along the same line.', from:12},
  hz_tower:{n:'The Watchtower Below', icon:'🗼', desc:'An abandoned tower on the far side of the shelf, and beneath it an air-filled station behind a door carved with the tower\'s symbol.', from:13},
  hz_east_gate:{n:'The East Gate', icon:'🚪', desc:'The fallback channel the crew marked on the chart, now used by ordinary ships.', from:16},
  hz_anchorage:{n:'The Sheltered Anchorage', icon:'⚓', desc:'A quiet anchorage where the crew can lay the record beside the old chart.', from:17},
  hz_mist:{n:'The Mist Straits', icon:'🌫️', desc:'The edge of the mist. The first route lantern is lit and the second is missing.', from:32},
  hz_quay:{n:'The Pilot\'s Quay', icon:'🔔', desc:'A sheltered quay where a local pilot rings a bell from shore to guide ships in.', from:34},
  hz_yard:{n:'The West Gate Yard', icon:'🔧', desc:'The maintenance yard that signs out beacon parts, and the dispatch book that records them.', from:35},
  hz_shoal:{n:'The Exposed Shoal', icon:'🏖️', desc:'Mud and bootprints at low water, with a skiff and a stolen lantern.', from:39},
});
Object.keys(HZQ_PLACES).forEach(k => { const p = HZQ_PLACES[k]; LOCATIONS[k] = {n:p.n, region:'horizon', kind:'story', icon:p.icon, unlock:p.from ? {ch:990, flag:'hz_read_'+p.from} : {ch:990}, desc:p.desc, spots:[]}; LOC_ORDER.push(k); });
ROUTES.push(
  {a:'dragon_harbour', b:'hz_ship', mode:'carriage', n:'The Crimson Tide\'s Gangway', days:0, fare:0, risk:0, pool:[]},
  {a:'hz_ship', b:'hz_reef', mode:'carriage', n:'Into the Reef Channel', days:1, fare:0, risk:0, pool:[]},
  {a:'hz_ship', b:'fair_tide', mode:'carriage', n:'The Horizon Engine to Fair Tide', days:1, fare:0, risk:0, pool:[]},
  {a:'hz_reef', b:'fair_tide', mode:'carriage', n:'The Tide Road', days:1, fare:0, risk:0, pool:[]},
  // the ship takes the crew anywhere it has charted; ashore at the mist is on foot
  {a:'hz_ship', b:'hz_shelf', mode:'carriage', n:'Across the Storm Shelf', days:1, fare:0, risk:0, pool:[]},
  {a:'hz_ship', b:'hz_tower', mode:'carriage', n:'To the Watchtower', days:1, fare:0, risk:0, pool:[]},
  {a:'hz_ship', b:'hz_east_gate', mode:'carriage', n:'East by Lantern', days:1, fare:0, risk:0, pool:[]},
  {a:'hz_ship', b:'hz_anchorage', mode:'carriage', n:'To the Anchorage', days:1, fare:0, risk:0, pool:[]},
  {a:'hz_ship', b:'hz_mist', mode:'carriage', n:'Into the Mist Straits', days:1, fare:0, risk:0, pool:[]},
  {a:'hz_mist', b:'hz_quay', mode:'carriage', n:'Along the Shore', days:0, fare:0, risk:0, pool:[]},
  {a:'hz_quay', b:'hz_yard', mode:'carriage', n:'To the Maintenance Yard', days:0, fare:0, risk:0, pool:[]},
  {a:'hz_quay', b:'hz_shoal', mode:'carriage', n:'Out onto the Shoal', days:0, fare:0, risk:0, pool:[]});

/* chapters 0-10: the place, the icon and (for 0-4, written from the drawn pages) the clues. Chapters 5-10 take their clues from the Crimson Tide outline's summaries. */
const HZQ_ARC1 = {
  0:{at:'hz_ship', icon:'🌅', clues:['A new horizon rises for the Crimson Tide. San and Jade stand at the rail at sunset.','"We\'ve closed one chapter... but the world is far from finished with us." "This is not an ending. It\'s a chance to explore what still lies beyond our maps, together."','The Black Pearl remains within their guardianship, its true origins and deeper purpose still a mystery waiting to be unravelled.','"Then let\'s go. A wider world awaits, and this time, we sail it as one."']},
  1:{at:'hz_ship', icon:'🌩️', clues:['A violent storm of a different kind welcomes the Crimson Tide\'s new voyage. Their first battle comes sooner than expected: fierce, chaotic and relentless.','San: "We\'ve handled worse. Just adjust your pace, keep your focus, and let your team cover the heavier work." Jade: "It\'s different this time, with more of us expecting... but it also feels right."','Veyren pregnancy, key notes: a much longer gestation, measured in years, not months. Expectant members can stay active with role adjustments (long range, strategy, support); the crew will pace missions and share the heavier duties.','As the battle eases, news surfaces one by one: Sera is expecting, Fen is expecting, Evelyne is expecting, Mirelle likely too, Jenika for now does not appear to be. San: "Well... at least this solves Sera\'s problem for now."']},
  2:{at:'hz_ship', icon:'🐉', clues:['What first seemed a violent storm reveals itself as something far worse: a colossal sea-born predator, awakened by a power unknown.','San steadies the formation and keeps it distracted from a distance. Jade, tactical ranged with the Crimson Repeater, marks the weak points. Sally, precision support with the Veilstring Bow, disrupts its strikes and keeps it from regenerating.','The crew combines magic, strategy and ranged precision, wearing the beast down with a coordinated assault.','At last the beast falls, leaving strange residue behind: proof the threats ahead will be unlike any they have faced. Jade: "We\'ll need more than brute force from here on."']},
  3:{at:'hz_ship', icon:'🔦', clues:['Dawn breaks over calm water. The crew replaces damaged rigging and checks the hull after the storm\'s brutal battle.','A violet streak glows just above the waterline, where the leviathan went down. It fades, then lights again. Joel logs the timing: once there are three clear readings it will be sent to Fair Tide.','Sally spots a fishing boat ahead with a torn sail, rowing hard toward the ship.','The fisherman: "That light. We saw it at the harbor mouth. Can you help us get home?"']},
  4:{at:'hz_reef', icon:'🏮', clues:['Jade promises to get the fishers home. The fisherman guides from the bow: keep the lights to port, there is a shelf just under the foam.','The channel lights go dark before every surge: that is how the harbor knows to clear the channel. About a watch has passed between surges so far.','Two boats are still out. Sky tends a fisher whose brother\'s boat is one of them.','Devon works over a chart with the harbor pilot. Jade: "When they come in sight, light that lantern. We\'ll be ready."']},
};
const HZQ_AT = {5:'hz_ship', 6:'hz_reef', 7:'fair_tide', 8:'hz_reef', 9:'hz_reef', 10:'hz_reef',
  11:'hz_reef', 12:'hz_shelf', 13:'hz_tower', 14:'fair_tide', 15:'hz_shelf', 16:'hz_east_gate', 17:'hz_anchorage', 18:'hz_shelf',
  19:'hz_shelf', 20:'hz_ship', 21:'hz_tower', 22:'fair_tide', 23:'fair_tide', 24:'hz_ship', 25:'hz_ship', 26:'hz_ship', 27:'hz_east_gate', 28:'hz_tower', 29:'hz_tower', 30:'hz_ship', 31:'fair_tide', 32:'hz_mist',
  33:'hz_mist', 34:'hz_quay', 35:'hz_yard', 36:'hz_yard', 37:'hz_ship', 38:'fair_tide', 39:'hz_shoal', 40:'hz_shoal', 41:'hz_mist'};
const HZQ_ICON = {5:'🥣', 6:'🌊', 7:'🪟', 8:'🪢', 9:'⚓', 10:'🧭', 11:'🌅', 12:'🌪️', 13:'🗼', 14:'📡', 15:'🔔', 16:'🏮', 17:'🗺️', 18:'🪝', 19:'🪨', 20:'🤿', 21:'🚪', 22:'🍵', 23:'📜', 24:'🔔', 25:'📓', 26:'🌀', 27:'🚢', 28:'🔧', 29:'🤫', 30:'🍽️', 31:'🔎', 32:'🌫️',
  33:'💡', 34:'🔔', 35:'🔧', 36:'📋', 37:'🍲', 38:'🎼', 39:'🏖️', 40:'💰', 41:'🚢'};
function hzqClues(n){
  if(HZQ_ARC1[n]) return HZQ_ARC1[n].clues;
  const sents = (HZ_CHAPTERS[n].s || '').split(/(?<=[.!?])\s+/).filter(Boolean), out = [];
  for(let i = 0; i < sents.length; i += 1) out.push(sents[i]);
  while(out.length > 4){ const a = out.pop(); out[out.length-1] += ' '+a; }
  return out.length ? out : [HZ_CHAPTERS[n].t];
}
for(let n = 0; n <= 41; n++){
  const cl = hzqClues(n), at = HZQ_ARC1[n] ? HZQ_ARC1[n].at : HZQ_AT[n], ic = HZQ_ARC1[n] ? HZQ_ARC1[n].icon : HZQ_ICON[n];
  LOCATIONS[at].spots.push({id:'hzq'+n, kind:'investigate', n:(n === 0 ? 'Prologue: ' : n+'. ')+HZ_CHAPTERS[n].t, icon:ic, ch:990, need:cl.length, ambush:[], lo:100, roles:['jade','san'], desc:'Chapter '+(n === 0 ? '0 (the prologue)' : n)+' of Crimson Horizon, Arc '+HZ_CHAPTERS[n].arc+'.',
    clues:cl, rw:{xp:400000+n*30000, gold:90000+n*6000}, needFlag:'hz_read_'+n, lockMsg:'🔒 Read this chapter in the Horizon tab first'});
}
// the first fight of the sequel: the leviathan (chapter 2), a boss spot that uses the 13-member crew battle
LOCATIONS.hz_ship.spots.push({id:'hzq_leviathan', kind:'hzboss', n:'The Stormborn Leviathan', icon:'🐉', ch:990, desc:'The colossal sea-born predator of chapter 2. The whole crew fights.', hzKey:'leviathan', needFlag:'inv_hzq2', lockMsg:'🔒 Finish the chapter 2 investigation first'});
// more crew fights: the storm fronts (chapter 16) and the skiff crew (chapter 40)
LOCATIONS.hz_east_gate.spots.push({id:'hzq_storm_fronts', kind:'hzboss', n:'The Closing Storm Fronts', icon:'🌪️', ch:990, desc:'The fronts close across the northern passage: the East Gate is the only way through. The whole crew fights.', hzKey:'storm_fronts', needFlag:'inv_hzq16', lockMsg:'🔒 Finish the chapter 16 investigation first'});
LOCATIONS.hz_shoal.spots.push({id:'hzq_skiff_crew', kind:'hzboss', n:'The Skiff Crew', icon:'🛶', ch:990, desc:'The crew that strips grounded ships and sells the cargo. The whole crew fights.', hzKey:'skiff_crew', needFlag:'inv_hzq40', lockMsg:'🔒 Finish the chapter 40 investigation first'});
const HZQ_ARCS = [
  {id:'m_hz_arc2', after:'m_hz_arc1', title:'Crimson Horizon, Arc II: Storm Shelf', from:11, to:18, fights:{16:['Fight the closing storm fronts','hz_won_storm_fronts']}, rw:{xp:9000000, gold:1800000, rep:4400}, subj:'Storm Shelf', body:'Something beneath the Shelf has been waiting to be found. Take the Crimson Tide north. — Jade'},
  {id:'m_hz_arc3', after:'m_hz_arc2', title:'Crimson Horizon, Arc III: Beneath the Storm Shelf', from:19, to:32, fights:{}, rw:{xp:14000000, gold:2800000, rep:5600}, subj:'Beneath the Storm Shelf', body:'The signal was never random. Someone kept it active. Follow the line down. — Jade'},
  {id:'m_hz_arc4', after:'m_hz_arc3', title:'Crimson Horizon, Arc IV: The Mist Straits', from:33, to:41, fights:{40:['Face the skiff crew','hz_won_skiff_crew']}, rw:{xp:12000000, gold:2400000, rep:5000}, subj:'The Mist Straits', body:'A light is moving against the current, and two ships have gone aground. Find who is selling the lights. — Jade'},
];
HZQ_ARCS.forEach(a => { const steps = []; for(let n = a.from; n <= a.to; n++){ steps.push({label:HZ_CHAPTERS[n].t, spot:'hzq'+n}); if(a.fights[n]) steps.push({label:a.fights[n][0], flag:a.fights[n][1]}); }
  MISSIONS.push({id:a.id, needCh:990, after:a.after, title:a.title, obj:{type:'steps', steps}, rw:a.rw, subj:a.subj, body:a.body}); });
MISSIONS.push({id:'m_hz_arc1', needCh:990, title:'Crimson Horizon, Arc I: A New Voyage', obj:{type:'steps', steps:[
  {label:'Prologue: a new horizon', spot:'hzq0'}, {label:'The first storm', spot:'hzq1'}, {label:'The Storm\'s True Form', spot:'hzq2'}, {label:'Fight the Stormborn Leviathan', flag:'hz_won_leviathan'},
  {label:'What the storm left behind', spot:'hzq3'}, {label:'The channel through the reef', spot:'hzq4'}, {label:'Between watches', spot:'hzq5'}, {label:'Under the channel', spot:'hzq6'},
  {label:'The narrow window', spot:'hzq7'}, {label:'Hold the passage', spot:'hzq8'}, {label:'One crew at the helm', spot:'hzq9'}, {label:'The next bearing', spot:'hzq10'}]},
  rw:{xp:6000000, gold:1200000, rep:3600}, subj:'A new voyage', body:'One crew. Two worlds. A wider horizon. Sail from Dragonvale Harbour: the Crimson Tide is waiting at the gangway. — Jade'});

/* ---- The Black Pearl case (an Open Questions entry): five case files; the first is open. Findings are Confirmed (verified), Theory (a reading the evidence supports) or Unresolved (still unanswered). ---- */
LOCATIONS.fair_tide.spots.push({id:'bp_records', kind:'investigate', n:'Black Pearl Case, File 1: Ancient Records', icon:'📜', ch:990, need:4, ambush:[], lo:100, roles:['devon','jade'],
  desc:'Where the Pearl was found, and what the oldest records say of it. The case stays open: it has no ending.',
  clues:['The research hall keeps the joint team\'s findings: the Black Pearl is ancient, older than Dragonvale\'s current dynasty and the known eras of Lunareth.','Every record agrees on its nature: restoration and preservation, the renewal and continued stability of life, land and systems.','A parchment called The Core Keeper names the Pearl, but a piece is missing exactly where an owner would be named.','No archive in Tribute, Dragonvale or Fair Tide names who first held it: only traces. The next file will have to look elsewhere.'], rw:{xp:900000, gold:200000}});
THREADS.push({id:'blackpearl', icon:'🔮', q:'Who first held the Black Pearl, and what is it for?', cat:'The Black Pearl case', opens:() => !!G.flags.tribute_complete || G.ch >= 946,
  part:[['inv_bp_records','File 1, Ancient Records: older than Dragonvale\'s dynasty; restoration and preservation; The Core Keeper is missing the piece that would name an owner.']], done:null,
  concl:[
    ['confirmed','Devon\'s dragon abilities are hereditary, from his bloodline: not from the Pearl.','black_pearl_first_findings_confirmed'],
    ['confirmed','It is ancient, restorative and preserving, and can work with systems beyond Lunareth.','black_pearl_ancient_restorative_and_cross_system'],
    ['confirmed','The restoration network is now self-sustaining: the Pearl does not need to stay in Lunareth.','black_pearl_research_results_presented'],
    ['theory','The Pearl may be a key to forgotten history and lost knowledge: perhaps to the cycle of advancement, instability, loss and renewal found in both worlds.','five_patterns_across_two_worlds'],
    ['unresolved','Who was its original owner? No record, mark or signature names them.','black_pearl_research_conclusions_and_next_steps'],
    ['unresolved','Is it one of a kind, or are there other Pearls? What risks does a fuller activation carry? Can its functions be expanded?','black_pearl_research_conclusions_and_next_steps'],
    ['unresolved','Custody: entrusted to San and Joel as custodians, not owners. Its ultimate fate is not decided.','black_pearl_entrusted_to_san_and_joel']]});
/* ---- the boss spot's screen, the win flag and the reading gate ---- */
(function(){
  const _hw = hzWin;
  hzWin = function(){
    const was = HB && HB.over, after = HB && HB.after, amb = HB && HB.boss && HB.boss.ambush;
    _hw();
    if(HB && HB.over === 'win' && !was){
      if(!amb) G.flags['hz_won_'+HB.key] = true;
      if(HB.key === 'leviathan') hzGrantGear();
      if(after){ const r = _hzInvest(after); if(Array.isArray(r)) flash(r); }   // the search the ambush interrupted now goes ahead
    }
    if(typeof checkSteps === 'function') checkSteps();
  };
})();
/* Jade's Crimson Repeater and Sally's Veilstring Bow: given once, after the leviathan (chapter 2) falls; also for saves that won it before the gear existed */
function hzGrantGear(){
  if(G.flags.hz_gear_given || !G.flags.hz_won_leviathan) return;
  G.flags.hz_gear_given = true; G.inv.crimson_repeater = (G.inv.crimson_repeater||0) + 1; G.inv.veilstring_bow = (G.inv.veilstring_bow||0) + 1;
  if(HB) hzLog('🎁 The Crimson Repeater (Jade) and the Veilstring Bow (Sally) are recovered from the wreckage. Equip them in the Equipment tab.');
  else toast('🎁 Crimson Repeater and Veilstring Bow added to the pack');
  save();
}
const _hzLB = hzLeaveBattle, _hzFl = hzFlee;
hzLeaveBattle = function(){ const back = HB && HB.after; _hzLB(); if(back){ tab = 'here'; render(); } };   // an ambush returns to the spot, where the search result is waiting
hzFlee = function(){ const back = HB && HB.after; _hzFl(); if(back){ tab = 'here'; render(); } };
const _hzRH = rHorizon;
rHorizon = function(){ hzGrantGear(); return _hzRH(); };
/* ambushes: searching some clue spots can start a short crew fight first; winning it lets the search go ahead, fleeing or losing skips it (no day passes) */
const _hzInvest = doInvestigate;
doInvestigate = function(id){
  const sp = spotById(id);
  if(sp && sp.hzAmbush && !HB && (G.clues[id]||0) < sp.need && Math.random() < .25){
    origin = 'here'; hzBattle(sp.hzAmbush); HB.after = id; tab = 'horizon'; return 'hz';
  }
  return _hzInvest(id);
};
[4,6,7,9,13,14,16,19,20,21,25,27,28,29,32,33,35,36,38,39].forEach(n => { const sp = spotById('hzq'+n); if(sp) sp.hzAmbush = n <= 32 ? 'violet_swarm' : 'lantern_raiders'; });
function hzqFightUi(key){ origin = 'here'; hzBattle(key); tab = 'horizon'; render(); }
