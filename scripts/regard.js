/* =====================================================================
   TRIBUTE — LOCAL REGARD (from Crimson Tide's per-port standing, renamed and reframed for Tribute)
   How each place regards Jade's party, apart from global renown. Earned where the work is done: investigations finished there,
   contracts and missions completed there, hunts won there, and Evils resolved in that region. Spent (passively) as small, real favours:
   cheaper inn beds, shared meals and potions there.
   State: G.regard = { locId: points }.  Tier names are invented for Tribute (no real-world places or dates anywhere).
   ===================================================================== */
const REGARD_TIERS = [
  {min:0,   n:'Passing Stranger',   disc:0},
  {min:30,  n:'Familiar Traveller', disc:.03},
  {min:80,  n:'Welcome Guest',      disc:.06},
  {min:160, n:'Friend of the Hearth', disc:.10},
  {min:300, n:'Honoured Name',      disc:.15},
];
const regardOf = loc => (G && G.regard && G.regard[loc]) || 0;
function regardTier(loc){ const p = regardOf(loc); let t = 0; REGARD_TIERS.forEach((r,i) => { if(p >= r.min) t = i; }); return t; }
const regardDisc = loc => REGARD_TIERS[regardTier(loc || G.loc)].disc;
function regardAdd(loc, pts){
  if(!loc || !pts || !LOCATIONS[loc]) return null;
  if(!G.regard) G.regard = {};
  const before = regardTier(loc); G.regard[loc] = regardOf(loc) + pts;
  const now = regardTier(loc);
  if(now > before){ const m = '🏮 '+LOCATIONS[loc].n+' regards you as a '+REGARD_TIERS[now].n+(REGARD_TIERS[now].disc?': '+Math.round(REGARD_TIERS[now].disc*100)+'% off beds, meals and potions there.':'.');
    if(typeof chronicle==='function') chronicle(m.replace(/^🏮 /,''), '🏮'); return m; }
  return null;
}
const discounted = (loc, price) => Math.max(1, Math.round(price * (1 - regardDisc(loc))));
function regardLine(loc){
  const t = regardTier(loc), p = regardOf(loc), nx = REGARD_TIERS[t+1];
  return `<div class="sm">🏮 Local regard: <b>${REGARD_TIERS[t].n}</b>${REGARD_TIERS[t].disc?' · '+Math.round(REGARD_TIERS[t].disc*100)+'% off beds, meals, potions':''}${nx?' · '+p+' / '+nx.min+' to '+nx.n:' · the deepest regard'}</div>`;
}
function rRegard(){
  const known = LOC_ORDER.filter(k => G.visited[k] && isSettlement(k) || regardOf(k) > 0);
  const rows = known.map(k => { const t = regardTier(k), p = regardOf(k), nx = REGARD_TIERS[t+1];
    return `<div class="ev"><div><b>${LOCATIONS[k].icon} ${LOCATIONS[k].n}</b> <span class="sm">· ${REGARD_TIERS[t].n}</span>${nx?bar(p-REGARD_TIERS[t].min, nx.min-REGARD_TIERS[t].min):''}<div class="sm">${p} regard${nx?' · '+(nx.min-p)+' to '+nx.n:''}${REGARD_TIERS[t].disc?' · '+Math.round(REGARD_TIERS[t].disc*100)+'% off':''}</div></div></div>`; }).join('');
  return `<div class="sm">How the places you have worked in regard the party. It grows with investigations, contracts, missions and hunts finished there, and with Evils resolved nearby.</div>${rows||'<div class="sm">Nowhere yet knows you.</div>'}`;
}
