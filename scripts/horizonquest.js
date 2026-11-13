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
Object.keys(HZQ_PLACES).forEach(k => { const p = HZQ_PLACES[k]; LOCATIONS[k] = {n:p.n, region:'horizon', kind:'story', icon:p.icon, unlock:{ch:990}, desc:p.desc, spots:[]}; LOC_ORDER.push(k); });
ROUTES.push(
  {a:'dragon_harbour', b:'hz_ship', mode:'carriage', n:'The Crimson Tide\'s Gangway', days:0, fare:0, risk:0, pool:[]},
  {a:'hz_ship', b:'hz_reef', mode:'carriage', n:'Into the Reef Channel', days:1, fare:0, risk:0, pool:[]},
  {a:'hz_ship', b:'fair_tide', mode:'carriage', n:'The Horizon Engine to Fair Tide', days:1, fare:0, risk:0, pool:[]},
  {a:'hz_reef', b:'fair_tide', mode:'carriage', n:'The Tide Road', days:1, fare:0, risk:0, pool:[]});

/* chapters 0-10: the place, the icon and (for 0-4, written from the drawn pages) the clues. Chapters 5-10 take their clues from the Crimson Tide outline's summaries. */
const HZQ_ARC1 = {
  0:{at:'hz_ship', icon:'🌅', clues:['A new horizon rises for the Crimson Tide. San and Jade stand at the rail at sunset.','"We\'ve closed one chapter... but the world is far from finished with us." "This is not an ending. It\'s a chance to explore what still lies beyond our maps, together."','The Black Pearl remains within their guardianship, its true origins and deeper purpose still a mystery waiting to be unravelled.','"Then let\'s go. A wider world awaits, and this time, we sail it as one."']},
  1:{at:'hz_ship', icon:'🌩️', clues:['A violent storm of a different kind welcomes the Crimson Tide\'s new voyage. Their first battle comes sooner than expected: fierce, chaotic and relentless.','San: "We\'ve handled worse. Just adjust your pace, keep your focus, and let your team cover the heavier work." Jade: "It\'s different this time, with more of us expecting... but it also feels right."','Veyren pregnancy, key notes: a much longer gestation, measured in years, not months. Expectant members can stay active with role adjustments (long range, strategy, support); the crew will pace missions and share the heavier duties.','As the battle eases, news surfaces one by one: Sera is expecting, Fen is expecting, Evelyne is expecting, Mirelle likely too, Jenika for now does not appear to be. San: "Well... at least this solves Sera\'s problem for now."']},
  2:{at:'hz_ship', icon:'🐉', clues:['What first seemed a violent storm reveals itself as something far worse: a colossal sea-born predator, awakened by a power unknown.','San steadies the formation and keeps it distracted from a distance. Jade, tactical ranged with the Crimson Repeater, marks the weak points. Sally, precision support with the Veilstring Bow, disrupts its strikes and keeps it from regenerating.','The crew combines magic, strategy and ranged precision, wearing the beast down with a coordinated assault.','At last the beast falls, leaving strange residue behind: proof the threats ahead will be unlike any they have faced. Jade: "We\'ll need more than brute force from here on."']},
  3:{at:'hz_ship', icon:'🔦', clues:['Dawn breaks over calm water. The crew replaces damaged rigging and checks the hull after the storm\'s brutal battle.','A violet streak glows just above the waterline, where the leviathan went down. It fades, then lights again. Joel logs the timing: once there are three clear readings it will be sent to Fair Tide.','Sally spots a fishing boat ahead with a torn sail, rowing hard toward the ship.','The fisherman: "That light. We saw it at the harbor mouth. Can you help us get home?"']},
  4:{at:'hz_reef', icon:'🏮', clues:['Jade promises to get the fishers home. The fisherman guides from the bow: keep the lights to port, there is a shelf just under the foam.','The channel lights go dark before every surge: that is how the harbor knows to clear the channel. About a watch has passed between surges so far.','Two boats are still out. Sky tends a fisher whose brother\'s boat is one of them.','Devon works over a chart with the harbor pilot. Jade: "When they come in sight, light that lantern. We\'ll be ready."']},
};
const HZQ_AT = {5:'hz_ship', 6:'hz_reef', 7:'fair_tide', 8:'hz_reef', 9:'hz_reef', 10:'hz_reef'}, HZQ_ICON = {5:'🥣', 6:'🌊', 7:'🪟', 8:'🪢', 9:'⚓', 10:'🧭'};
function hzqClues(n){
  if(HZQ_ARC1[n]) return HZQ_ARC1[n].clues;
  const sents = (HZ_CHAPTERS[n].s || '').split(/(?<=[.!?])\s+/).filter(Boolean), out = [];
  for(let i = 0; i < sents.length; i += 1) out.push(sents[i]);
  while(out.length > 4){ const a = out.pop(); out[out.length-1] += ' '+a; }
  return out.length ? out : [HZ_CHAPTERS[n].t];
}
for(let n = 0; n <= 10; n++){
  const cl = hzqClues(n), at = HZQ_ARC1[n] ? HZQ_ARC1[n].at : HZQ_AT[n], ic = HZQ_ARC1[n] ? HZQ_ARC1[n].icon : HZQ_ICON[n];
  LOCATIONS[at].spots.push({id:'hzq'+n, kind:'investigate', n:(n === 0 ? 'Prologue: ' : n+'. ')+HZ_CHAPTERS[n].t, icon:ic, ch:990, need:cl.length, ambush:[], lo:100, roles:['jade','san'], desc:'Chapter '+(n === 0 ? '0 (the prologue)' : n)+' of Crimson Horizon.',
    clues:cl, rw:{xp:400000+n*30000, gold:90000+n*6000}, needFlag:'hz_read_'+n, lockMsg:'🔒 Read this chapter in the Horizon tab first'});
}
// the first fight of the sequel: the leviathan (chapter 2), a boss spot that uses the 13-member crew battle
LOCATIONS.hz_ship.spots.push({id:'hzq_leviathan', kind:'hzboss', n:'The Stormborn Leviathan', icon:'🐉', ch:990, desc:'The colossal sea-born predator of chapter 2. The whole crew fights.', hzKey:'leviathan', needFlag:'inv_hzq2', lockMsg:'🔒 Finish the chapter 2 investigation first'});
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
  hzWin = function(){ _hw(); if(HB && HB.over === 'win') G.flags['hz_won_'+HB.key] = true; if(typeof checkSteps === 'function') checkSteps(); };
})();
function hzqFightUi(key){ origin = 'here'; hzBattle(key); tab = 'horizon'; render(); }
