/* =====================================================================
   TRIBUTE — THE VOYAGE TO DRAGONVALE (first sailing from the capital)
   A staged journey instead of a single roll. Time: each stage that takes a day advances the game clock
   by 1 day (the party also recovers a little each day), so the maiden voyage is 6 days.
   Later crossings use the normal 4-day Eastern Sea Passage.
   State: G.voyage = {ri: route index, to, from, stage}; flag voyage_done after the first arrival.
   ===================================================================== */
const VOYAGE = [
  {t:'Leaving Tribute', icon:'⛵', day:0, btn:'Set sail',
   text:'The party leaves Tribute. The harbour shrinks behind the wake, the bells fade, and nothing lies ahead but open sea.'},
  {t:'The Storm', icon:'⛈️', day:1, btn:'Weather the storm', fight:{foes:['storm_wisp','storm_wisp','storm_wisp'], off:1},
   text:'On the first night the sky turns black. Wind tears at the sails and the sailors shout to lash everything down. Lightning that moves like living things circles the ship.',
   after:'The storm breaks at dawn. The deck is scarred, but the ship holds.', rw:{xp:120}},
  {t:'Something Beneath the Waves', icon:'🐍', day:1, btn:'Face it', fight:{foes:['river_serpent','storm_wisp'], off:2},
   text:'On the second day the water goes still. Something enormous circles beneath the hull, and the crew falls silent. Then the sea rises.',
   after:'The creature slips back into the deep. The sailors will tell this story for years.', rw:{xp:200, gold:110}},
  {t:'The Abandoned Island', icon:'🏝️', day:1, btn:'Search the island',
   text:'A low island appears through the haze: empty huts, cold fires, nets still hanging to dry. No one has lived here for a long time, and no one knows why they left.',
   loot:{xp:90, gold:60, items:[{id:'forest_herb',qty:2},{id:'sea_pearl',qty:1}], bond:2}, after:'You find what the islanders left behind, and leave quietly.'},
  {t:'Ruins in the Shallows', icon:'🗿', day:1, btn:'Land at the ruins', fight:{foes:['stone_sentinel','relic_spirit'], off:2},
   text:'Pale stone rises from the shallows: towers and stairs worn smooth by centuries, carved with dragons coiled around a pearl. Old wardens still keep watch.',
   after:'The wardens fall silent. The carvings show a dragon and a girl with golden blood, and the pearl between them.', rw:{xp:240, gold:80, items:[{id:'relic_dust',qty:1}]}},
  {t:'Into the Mist', icon:'🌫️', day:1, btn:'Hold your course',
   text:'On the fifth day a pale mist closes in. The compass spins, the sails hang slack, and the sea turns still as glass. The sailors say no ship has found the kingdom by luck: it lets itself be found.',
   loot:{xp:100, bond:2}, after:'The mist thins ahead, and the helmsman whispers a name.'},
  {t:'Dragonvale', icon:'🏯', day:1, btn:'Sail into the harbour', reveal:true,
   text:'Beyond the mist, a kingdom of white towers appeared above the waves.'},
];
const VOYAGE_DAYS = VOYAGE.reduce((a,s) => a + s.day, 0);
const voyageRoute = r => !!r.voyage && r.a==='capital' && G.loc==='capital' && !G.flags.voyage_done;

function startVoyage(ri, to){
  G.voyage = {ri, to, from:G.loc, stage:0};
  save(); return 'voyage';
}
function voyageAdvance(msgs){
  const s = VOYAGE[G.voyage.stage];
  if(s.day) advanceDay(s.day).forEach(m => msgs.push(m));
  G.voyage.stage++; save();
}
function voyageStep(){
  const V = G.voyage; if(!V) return [];
  const s = VOYAGE[V.stage], msgs = [];
  if(s.fight){
    const lv = Math.max(1, avgPartyLv() + s.fight.off);
    startBattle({foes:s.fight.foes.map(k => ({key:k, lv})), rewards:true,
      onWin:() => { const m = [s.after]; grantReward(s.rw||{}, s.icon+' '+s.t).forEach(x => m.push(x)); voyageAdvance(m); return m; }});
    origin = 'travel'; tab = 'battle'; return 'battle';
  }
  if(s.reveal){
    const r = ROUTES[V.ri];
    PEND = {r:Object.assign({}, r, {days:1}), to:V.to, ev:null, from:V.from};
    G.voyage = null; G.flags.voyage_done = true;
    msgs.push('🏯 '+s.text);
    return msgs.concat(finishTravel());
  }
  if(s.loot){
    grantReward(s.loot, s.icon+' '+s.t).forEach(m => msgs.push(m));
    if(s.loot.bond){ G.active.forEach(id => addBond(id, s.loot.bond)); msgs.push('Bond +'+s.loot.bond+' (active party)'); }
    msgs.push(s.after);
  }
  voyageAdvance(msgs); return msgs;
}
function voyageAbort(){ G.voyage = null; save(); }   // only used if the party is driven back
function rVoyage(){
  const V = G.voyage, s = VOYAGE[V.stage], doneDays = VOYAGE.slice(0, V.stage).reduce((a,x)=>a+x.day, 0);
  const dots = VOYAGE.map((x,i) => `<span style="opacity:${i<V.stage?1:i===V.stage?.9:.3};margin:0 3px">${i<V.stage?'●':i===V.stage?'◉':'○'}</span>`).join('');
  return `<h2>⛵ Voyage to Dragonvale</h2><div class="sm">Day ${doneDays+(s.day?1:0)} of ${VOYAGE_DAYS} · ${dots}</div>${flashHtml()}
    <div class="panel"><h3>${s.icon} ${s.t}</h3><div style="${s.reveal?'font-style:italic;font-size:1.15em;margin:10px 0':'margin:8px 0'}">${s.text}</div>
    ${s.fight?'<div class="sm">⚔️ A fight lies ahead.</div>':''}<button class="pri" onclick="act(voyageStep)">${s.btn}</button></div>`;
}
