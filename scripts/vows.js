/* =====================================================================
   TRIBUTE — SHRINE VOWS (from Crimson Tide's Temple vows)
   A short board at the places where the spirits are close: Moonveil Temple (ch78), the Field Camp in the Black Forest (ch149) and Mourning Valley
   (ch153). "Fewer than a tavern's contracts, but the shrine remembers who keeps them." A vow is a promise to do something the party might do anyway;
   progress counts from the moment the vow is taken. Up to three vows at once. Six vows in two tiers; the second tier opens when two have been kept.
   Reward: XP, gold and renown (no new currency). State: G.vows = {id: {base, done}}.  Names and numbers are first-pass.
   ===================================================================== */
const sumVals = o => Object.keys(o||{}).reduce((a, k) => a + (o[k]||0), 0);
const corruptDefeated = () => Object.keys(ENEMIES).filter(k => (ENEMIES[k].traits||[]).includes('corrupt')).reduce((a, k) => a + ((G.bestiary||{})[k]||0), 0);
const researchDone = () => Object.keys(G.research||{}).filter(k => G.research[k].done).length;
const VOWS = [
  {id:'v_clear', tier:1, icon:'🕯️', n:'Free the Corrupted', d:'Free six creatures of corruption.', need:6, now:corruptDefeated, avail:() => G.ch >= 78},
  {id:'v_moments', tier:1, icon:'☕', n:'Sit with the Company', d:'Share three quiet moments with your companions.', need:3, now:() => (G.moments||[]).length, avail:() => G.ch >= 87},
  {id:'v_paths', tier:1, icon:'🌿', n:'Walk the Hidden Ways', d:'Chart three spirit-path nodes.', need:3, now:() => Object.keys(spirit().charted).length, avail:() => typeof spiritOpen==='function' && spiritOpen()},
  {id:'v_peace', tier:2, icon:'🕊️', n:'Leave It in Peace', d:'Leave one guardian in peace.', need:1, now:() => sumVals(G.gifts), avail:() => typeof spiritOpen==='function' && spiritOpen()},
  {id:'v_echo', tier:2, icon:'🔁', n:'Answer the Echo', d:'Defeat the echo of a boss.', need:1, now:() => sumVals(G.echo), avail:() => G.ch >= 60},
  {id:'v_study', tier:2, icon:'📚', n:'Keep the Record', d:'Finish one research project.', need:1, now:researchDone, avail:() => G.ch >= 123},
];
const VOW_MAX = 3;
function vowState(){ if(!G.vows) G.vows = {}; return G.vows; }
const vowKept = () => VOWS.filter(v => vowState()[v.id] && vowState()[v.id].done).length;
const vowProgress = v => { const s = vowState()[v.id]; return s ? Math.min(v.need, Math.max(0, v.now() - s.base)) : 0; };
const vowTierOpen = v => v.tier === 1 || vowKept() >= 2;
function vowTake(id){
  const v = VOWS.find(x => x.id===id), st = vowState(); if(!v || st[id] || !v.avail() || !vowTierOpen(v)) return [];
  if(Object.keys(st).filter(k => !st[k].done).length >= VOW_MAX) return ['You already carry '+VOW_MAX+' vows.'];
  st[id] = {base:v.now(), done:false}; save(); return ['⛩️ Vow taken: '+v.n+'.'];
}
function vowKeep(id){
  const v = VOWS.find(x => x.id===id), s = vowState()[id]; if(!v || !s || s.done || vowProgress(v) < v.need) return [];
  s.done = true; const lv = avgPartyLv(); chronicle('Vow kept at the shrine: '+v.n+'.', '⛩️');
  return grantReward({xp:120+lv*12, gold:60+lv*5, rep:30}, '⛩️ Vow kept: '+v.n);
}
function rVows(){
  const st = vowState(), act = VOWS.filter(v => st[v.id] && !st[v.id].done), board = VOWS.filter(v => !st[v.id] && v.avail() && vowTierOpen(v));
  return `<div class="panel"><div class="sm">Fewer than a tavern's contracts, but the shrine remembers who keeps them. A vow counts from the moment you take it. Carried ${act.length}/${VOW_MAX} · kept ${vowKept()}/${VOWS.length}.</div></div>`
    + (act.length ? '<h4>Vows you carry</h4>' + act.map(v => { const p = vowProgress(v);
      return `<div class="ev ${p>=v.need?'ready':''}"><div><b>${v.icon} ${v.n}</b><div class="sm">${v.d}</div><div class="sm">${p}/${v.need}</div></div><button ${p>=v.need?'':'disabled'} onclick="act(vowKeep,'${v.id}')">Keep the vow</button></div>`; }).join('') : '')
    + '<h4>Vows offered</h4>' + (board.map(v => `<div class="ev"><div><b>${v.icon} ${v.n}</b><div class="sm">${v.d}</div></div><button onclick="act(vowTake,'${v.id}')">Take the vow</button></div>`).join('') || '<div class="sm">No vows offered right now.</div>')
    + (VOWS.filter(v => st[v.id] && st[v.id].done).length ? '<h4>Kept</h4>' + VOWS.filter(v => st[v.id] && st[v.id].done).map(v => `<div class="li">✔ ${v.icon} ${v.n}</div>`).join('') : '');
}
[['moonveil_temple', 78], ['black_forest', 149], ['mourning_valley', 153]].forEach(([loc, ch]) => { if(LOCATIONS[loc]) LOCATIONS[loc].spots.push({id:'vow_board_'+loc, kind:'vows', n:'Shrine Vows', icon:'⛩️', ch, desc:'A small board of vows left by those who passed. Take one, keep it, and the shrine remembers.'}); });
deed('vow1', 'world', 'A promise kept', '⛩️', 'Kept a vow at a shrine.', () => vowKept() >= 1);
deed('vow_all', 'world', 'The shrine remembers', '⛩️', 'Kept every vow.', () => vowKept() >= VOWS.length);
