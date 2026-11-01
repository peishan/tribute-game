/* =====================================================================
   TRIBUTE — PURSUIT QUESTS (the author's Levi list: Trail Sense "pursuit quests")
   The Pursuit Board (Tribute, Dragonvale and Altan, from ch647 levis_trail_followed) offers four pursuits. Each has three stages:
     1 THE TRAIL      read the tracks (Levi in the active party: 85%, otherwise 45%); costs the day
     2 THE INDICATORS read the ambush signs and choose where to cut them off (same odds; Levi's Trail Sense makes a miss cost nothing but the day)
     3 THE CATCH      a real fight against the quarry. With Levi in the active party the quarry is already revealed (analysed) and the first blow is the party's.
   Progress is kept (G.pursuit); each trail stage costs a day; the catch can be made at once. Rewards: XP, gold and a material. First-pass numbers and wording.
   ===================================================================== */
const PURSUITS = [
  {id:'pu1', n:'The Toll Takers', t:'A gang has been robbing carters on the road out of the capital, always where the road forks.', foes:['road_bandit','road_bandit','road_bandit'], minCh:647, loc:['capital'], rw:{xp:180000, gold:30000, items:[{id:'forest_herb',qty:2}]}},
  {id:'pu2', n:'The Wolf That Learned Roads', t:'A lone wolf has begun following travellers at dusk and leaving the same trail each time.', foes:['forest_wolf','forest_wolf'], minCh:647, loc:['dragon_vale'], rw:{xp:200000, gold:26000, items:[{id:'spirit_thread',qty:1}]}},
  {id:'pu3', n:'The Quiet Thief', t:'Something is lifting small things from Altan\'s market stalls and leaving no footprints at all.', foes:['shade_wraith','shade_wraith'], minCh:700, loc:['altan_capital'], rw:{xp:240000, gold:34000, items:[{id:'seal_dust',qty:1}]}},
  {id:'pu4', n:'The Last Ash Remnant', t:'A remnant of the ash has slipped out of the old tunnels and is walking the roads under the capital.', foes:['shade_wraith','stone_sentinel'], minCh:728, loc:['altan_capital','capital'], rw:{xp:300000, gold:42000, items:[{id:'restoration_shard',qty:1}]}},
];
const puData = () => { if(!G.pursuit) G.pursuit = {}; return G.pursuit; };
const puOpen = () => !!(G && G.flags && G.flags.levis_trail_followed);
const puLevi = () => !!(G && G.active && G.active.includes('levi') && !isDisabled('levi'));
const puState = id => puData()[id] || {stage:0, day:-1, done:false};
const puHere = p => p.loc.includes(G.loc) && G.ch >= p.minCh;

function puStep(id){
  const p = PURSUITS.find(x => x.id===id); if(!p || !puOpen() || !puHere(p)) return [];
  const st = puState(id); if(st.done || st.stage >= 2) return [];
  const win = Math.random() < (puLevi() ? .85 : .45);
  const nm = ['read the tracks','read the ambush indicators'][st.stage];
  const msgs = [];
  if(win){ puData()[id] = {stage:st.stage+1, day:G.day, done:false}; msgs.push((puLevi() ? '🏹 Levi ' : '🧭 You ')+nm+' and the picture closes in ('+(st.stage+1)+' / 2).'); if(st.stage+1>=2) msgs.push('The quarry can be cut off now.'); }
  else { puData()[id] = {stage:st.stage, day:G.day, done:false}; msgs.push('The trail goes cold for the day: '+(puLevi() ? 'Levi finds nothing he trusts.' : 'you cannot be sure.')); }
  advanceDay(1).forEach(m => msgs.push(m));
  return msgs;
}
function puCatch(id){
  const p = PURSUITS.find(x => x.id===id); if(!p || !puHere(p)) return;
  if(puState(id).stage < 2) return;
  const lv = Math.max(1, avgPartyLv());
  origin = 'here';
  startBattle({foes:p.foes.map((k, i) => ({key:k, lv:Math.max(1, lv-(i?1:0))})), rewards:true, onWin:() => { puData()[id] = {stage:3, day:G.day, done:true}; const msgs = grantReward(p.rw, p.n); msgs.forEach(m => blog(m, 'good')); G.flags['pursuit_'+id] = true; return checkSteps(); }});
  if(puLevi() && B){ B.foes.forEach(f => { f.known = true; }); blog('🏹 Levi\'s Trail Sense: the quarry is already revealed, and the first blow is yours.', 'good'); }
  tab = 'battle'; render();
}
function rPursuits(){
  if(!puOpen()) return '';
  const here = PURSUITS.filter(puHere);
  let h = `<div class="panel"><b>🏹 The Pursuit Board</b><div class="sm">Levi\'s Trail Sense turns a rumour into a trail. Two days of reading, then the catch. ${puLevi() ? 'Levi is in the active party: the odds are good.' : 'Levi is not in the active party: the odds are poor and the quarry is not revealed.'}</div></div>`;
  if(!here.length) return h + '<div class="sm">No pursuits are posted here.</div>';
  return h + here.map(p => { const st = puState(p.id);
    if(st.done) return `<div class="ev locked"><div><b>🏹 ${p.n}</b><div class="sm">Caught.</div></div><button disabled>Done</button></div>`;
    const btn = st.stage>=2 ? `<button class="pri" onclick="puCatch('${p.id}')">Make the catch</button>` : `<button onclick="act(puStep,'${p.id}')">${['Read the trail','Read the indicators'][st.stage]} (1 day)</button>`;
    return `<div class="ev"><div><b>🏹 ${p.n}</b> <span class="sm">· stage ${Math.min(st.stage,2)} / 2</span><div class="sm">${p.t}</div></div>${btn}</div>`; }).join('');
}
['capital','dragon_vale','altan_capital'].forEach(loc => {
  if(LOCATIONS[loc] && !LOCATIONS[loc].spots.some(s => s.id==='pursuit_board_'+loc))
    LOCATIONS[loc].spots.push({id:'pursuit_board_'+loc, kind:'pursuit', n:'The Pursuit Board', icon:'🏹', desc:'Pursuits for a tracker: read the trail, cut off the quarry, make the catch.', ch:647});
});
