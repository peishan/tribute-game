/* =====================================================================
   TRIBUTE — FRONTIER WORK (from chapter 918, once Elise and Tarin live on the frontier; the author's note)
   The frontier versions of Elise and Tarin (chapter 918 on) open the Frontier Work Board at the Northern Frontier: small quarrels to settle and beasts and monsters to drive off, so the
   people there can live in peace. Everything is repeatable: a finished task is posted again after 5 days.
     QUARRELS  settled by one of three approaches (hear them out 70% / go by the law 55%, pays more / let the elders decide 85%, pays less). Jade in the active party adds 10%.
               A failed attempt costs a day and nothing else. A settled quarrel pays XP, gold and goodwill (Frontier Goodwill, counted, shown on the board).
     BOUNTIES  a real fight against the beasts or monsters bothering the residents. Pays XP, gold and a material.
   First-pass numbers and wording. State: G.fwork = {taskId:{day, n}}, G.fwGood.
   ===================================================================== */
const FW_TASKS = [
  {id:'fq1', t:'quarrel', n:'The Boundary Fence', icon:'🪵', d:'Two neighbours each say the other moved the fence in the night.', rw:{xp:210000, gold:28000, items:[{id:'forest_herb',qty:2}]}},
  {id:'fq2', t:'quarrel', n:'Whose Flock Is It', icon:'🐑', d:'Two shepherds claim the same stray lambs, and neither will give way.', rw:{xp:230000, gold:30000, items:[{id:'frontier_hide',qty:1}]}},
  {id:'fq3', t:'quarrel', n:'The Ferry Fare', icon:'🛶', d:'The ferryman raised his fare after the thaw, and the village will not pay it.', rw:{xp:250000, gold:32000, items:[{id:'spirit_thread',qty:1}]}},
  {id:'fq4', t:'quarrel', n:'The Harvest Debt', icon:'🌾', d:'A family cannot repay last winter\'s grain, and the lender wants the barn.', rw:{xp:270000, gold:34000, items:[{id:'moonroot',qty:1}]}},
  {id:'fb1', t:'bounty', n:'Wolves at the Sheepfold', icon:'🐺', d:'Wolves have been taking lambs from the high pasture every night.', foes:['forest_wolf','forest_wolf','forest_wolf'], rw:{xp:230000, gold:30000, items:[{id:'frontier_hide',qty:2}]}},
  {id:'fb2', t:'bounty', n:'The Boar in the Barley', icon:'🐗', d:'A thorn boar has torn up two fields and will not be driven off.', foes:['thorn_boar','thorn_boar'], rw:{xp:250000, gold:32000, items:[{id:'forest_herb',qty:3}]}},
  {id:'fb3', t:'bounty', n:'The Stag Gone Wrong', icon:'🦌', d:'A stag that was once the village\'s pride now charges anyone who passes.', foes:['corrupted_stag','corrupted_stag'], rw:{xp:270000, gold:34000, items:[{id:'moonroot',qty:1}]}},
  {id:'fb4', t:'bounty', n:'Raiders at the Ford', icon:'🗡️', d:'A few raiders are robbing carters where the road crosses the river.', foes:['road_bandit','road_bandit','bandit_archer'], rw:{xp:290000, gold:38000, items:[{id:'seal_dust',qty:1}]}},
  {id:'fb5', t:'bounty', n:'Shades on the High Road', icon:'🌑', d:'Shades from some old wound in the hills have begun to haunt the high road at dusk.', foes:['shade_beast','shade_beast','shade_wraith'], rw:{xp:320000, gold:42000, items:[{id:'restoration_shard',qty:1}]}},
];
const FW_WAYS = [
  {k:'hear', n:'Hear both sides out', p:.7, mult:1, say:'Both are heard in full, and most of the heat goes out of it.'},
  {k:'law', n:'Go by the law', p:.55, mult:1.4, say:'The law is plain, and the ruling stands. Both leave grudgingly, but they leave.'},
  {k:'elders', n:'Let the elders decide', p:.85, mult:.8, say:'The elders mark the line themselves, and nobody loses face.'},
];
const fwOpen = () => !!(G && G.ch >= 918);
const fwJade = () => !!(G && G.active && G.active.includes('jade') && !isDisabled('jade'));
const fwData = () => { if(!G.fwork) G.fwork = {}; return G.fwork; };
const fwReady = id => { const s = fwData()[id]; return !s || G.day - s.day >= 5; };
const fwGood = () => (G && G.fwGood) || 0;

function fwQuarrel(id, way){
  const t = FW_TASKS.find(x => x.id===id), w = FW_WAYS.find(x => x.k===way); if(!t || !w || !fwOpen() || !fwReady(id)) return [];
  const msgs = [], ok = Math.random() < Math.min(.95, w.p + (fwJade() ? .1 : 0));
  if(ok){
    const r = {xp:Math.round(t.rw.xp*w.mult), gold:Math.round(t.rw.gold*w.mult), items:t.rw.items};
    msgs.push('⚖️ '+t.n+': '+w.say);
    grantReward(r, t.n).forEach(m => msgs.push(m));
    fwData()[id] = {day:G.day, n:(fwData()[id] ? fwData()[id].n : 0)+1}; G.fwGood = fwGood()+1; G.flags.frontier_work_done = true;
  } else msgs.push('⚖️ '+t.n+': it does not settle today. Both sides keep their grievance, and the day is gone.');
  advanceDay(1).forEach(m => msgs.push(m));
  return msgs;
}
function fwHunt(id){
  const t = FW_TASKS.find(x => x.id===id); if(!t || !t.foes || !fwOpen() || !fwReady(id)) return;
  const lv = Math.max(1, avgPartyLv());
  origin = 'here';
  startBattle({foes:t.foes.map((k, i) => ({key:k, lv:Math.max(1, lv-(i?1:0))})), rewards:true, onWin:() => {
    const msgs = grantReward(t.rw, t.n); msgs.forEach(m => blog(m, 'good'));
    fwData()[id] = {day:G.day, n:(fwData()[id] ? fwData()[id].n : 0)+1}; G.fwGood = fwGood()+1; G.flags.frontier_work_done = true;
    return checkSteps(); }});
  tab = 'battle'; render();
}
function rFrontierWork(){
  if(!fwOpen()) return '<div class="sm">The board is empty. Elise and Tarin are not on the frontier yet.</div>';
  let h = `<div class="panel">${portraitChip(portrait('elise'),'Frontier Elise')} ${portraitChip(portrait('tarin'),'Frontier Tarin')} <b>📌 The Frontier Work Board</b><div class="sm">Posted by Elise (quarrels) and Tarin (bounties). Quarrels to settle and beasts and monsters to drive off, so people here can live in peace. A finished task is posted again after 5 days. Goodwill earned: ${fwGood()}. ${fwJade() ? 'Jade is in the active party: quarrels settle more easily.' : 'Jade is not in the active party: quarrels are harder to settle.'}</div></div>`;
  return h + FW_TASKS.map(t => {
    const s = fwData()[t.id], wait = s ? 5-(G.day-s.day) : 0, tag = s ? ` <span class="sm">· done ${s.n}×</span>` : '';
    if(!fwReady(t.id)) return `<div class="ev locked"><div><b>${t.icon} ${t.n}</b>${tag}<div class="sm">Settled for now. Posted again in ${wait} day(s).</div></div><button disabled>Done</button></div>`;
    const btns = t.t==='bounty' ? `<button class="pri" onclick="fwHunt('${t.id}')">Take the bounty</button>` : FW_WAYS.map(w => `<button onclick="act(fwQuarrel,'${t.id}','${w.k}')">${w.n}</button>`).join(' ');
    return `<div class="ev"><div><b>${t.icon} ${t.n}</b>${tag}<div class="sm">${t.t==='bounty' ? 'Bounty' : 'Quarrel'}: ${t.d}</div></div><div class="row">${btns}</div></div>`; }).join('');
}
['border_frontier','northern_frontier'].forEach(loc => {
  if(LOCATIONS[loc] && !LOCATIONS[loc].spots.some(s => s.id==='fwork_board_'+loc))
    LOCATIONS[loc].spots.push({id:'fwork_board_'+loc, kind:'fwork', n:'The Frontier Work Board', icon:'📌', desc:'Quarrels to settle and beasts to drive off for the people of the frontier.', ch:918});
});
deed('hz_frontier_work', 'story', 'Peace on the frontier', '📌', 'You settled quarrels and drove off what disturbed the frontier\'s peace.', () => !!G.flags.frontier_work_done);
