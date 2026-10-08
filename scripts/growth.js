/* =====================================================================
   TRIBUTE — MOMENTS OF STRENGTH (growth abilities, from Crimson Tide)
   One story-flavoured passive per companion. Each fires at most once per battle, only when the moment is true, and only in real fights (not training or
   sandbox). The first time it fires it is added to a "discovered" list (G.growth = {id: day}), the Chronicle and the Bonds tab. Bonuses are small and short; no
   buttons. Lines are first-pass. To add one: a row {id, who, n, d (what it is), lv (unit level needed), ok(B) (the moment), go(B, u)}.
   ===================================================================== */
const mkBuff = (u, stat, m, d) => u.bf.push({stat, m, d});
const lastTwo = () => { const a = B.allies.filter(x => !x.dead && !isCompanion(x.id) && !GUEST_RULES[x.id]); return a.length === 2 && a.some(x => x.id==='jade') && a.some(x => x.id==='devon'); };
const GROWTH = [
  {id:'twin_resolve', who:['jade','devon'], n:'Twin Resolve', lv:10, d:'When only Jade and Devon are left standing and they have grown close, both steady: +15% attack, magic and defence for a few turns.',
   ok:() => lastTwo() && typeof trackTier==='function' && trackOpen('jade_devon') && trackTier('jade_devon') >= 1,
   go:(u) => { B.allies.filter(x => x.id==='jade' || x.id==='devon').forEach(x => { ['atk','mag','def'].forEach(s => mkBuff(x, s, 1.15, 5)); }); return '✦ Twin Resolve! Only Jade and Devon are left, and they move as one: attack, magic and defence up.'; }},
  {id:'light_in_dark', who:['sky'], n:'Light in the Dark', lv:20, d:'When an ally has fallen, Sky draws on the old light: the living allies recover 12% of their health.',
   ok:() => B.allies.some(x => x.dead && !GUEST_RULES[x.id]),
   go:(u) => { B.allies.filter(x => !x.dead).forEach(x => { x.hp = Math.min(x.mhp, x.hp + Math.round(x.mhp*.12)); }); return '✦ Light in the Dark! Sky draws on the old light, and the living allies recover.'; }},
  {id:'opening_volley', who:['levi'], n:'Opening Volley', lv:15, d:'On the first round of a fight, when no one has fallen, Levi\'s first shot sees an opening and crits.',
   ok:() => B.round <= 1 && B.allies.every(x => !x.dead),
   go:(u) => { u.st.crit = {d:2}; return '✦ Opening Volley! Levi picks his moment: his next shot will crit.'; }},
  {id:'held_in_reserve', who:['seraphina'], n:'Held in Reserve', lv:15, d:'When an ally drops below a third of their health, Seraphina steps in and wards them with a barrier.',
   ok:() => B.allies.some(x => !x.dead && x.id!=='seraphina' && x.hp/x.mhp < .34 && !x.st.shield),
   go:(u) => { const t = B.allies.filter(x => !x.dead && x.id!=='seraphina' && x.hp/x.mhp < .34).sort((a,b) => a.hp/a.mhp - b.hp/b.mhp)[0]; t.st.shield = {v:Math.round(t.mhp*.25), d:3}; return '✦ Held in Reserve! Seraphina says nothing, and a barrier closes around '+t.name+'.'; }},
];
function growthSeen(){ if(!G.growth) G.growth = {}; return G.growth; }
function growthCheck(u){   // called at the start of an ally's turn
  if(!B || !B.spec || !B.spec.rewards || !u.ally) return;
  if(!B.growthUsed) B.growthUsed = {};
  GROWTH.forEach(g => {
    if(B.growthUsed[g.id] || !g.who.includes(u.id) || U(u.id).lv < g.lv) return;
    if(!g.who.every(id => B.allies.some(x => x.id===id && !x.dead))) return;
    let t = false; try{ t = g.ok(); }catch(e){} if(!t) return;
    B.growthUsed[g.id] = true; blog(g.go(u), 'good');
    if(!growthSeen()[g.id]){ growthSeen()[g.id] = G.day; chronicle('A moment of strength: '+g.n+'.', '✦'); if(typeof toast==='function') toast('✦ '+g.n); }
  });
}
function rGrowth(){
  const seen = growthSeen();
  return `<h4>✦ Moments of strength</h4><div class="sm">Each companion has a moment that can arise once in a fight. They are not chosen: they happen when the moment is true. ${Object.keys(seen).length} / ${GROWTH.length} seen.</div>` + GROWTH.filter(g => g.who.every(id => isRecruited(id))).map(g =>
    seen[g.id] ? `<div class="li"><b>✦ ${g.n}</b> <span class="sm">· ${g.who.map(id => CHARACTERS[id].n.split(' ')[0]).join(' & ')}</span><div class="sm">${g.d}</div></div>` : `<div class="li" style="opacity:.55"><b>✦ ???</b> <span class="sm">· ${g.who.map(id => CHARACTERS[id].n.split(' ')[0]).join(' & ')} · from level ${g.lv}</span></div>`).join('');
}
deed('growth1', 'bonds', 'A moment of strength', '✦', 'A companion\'s moment of strength arose in battle.', () => Object.keys(growthSeen()).length >= 1);
deed('growth_all', 'bonds', 'Every moment seen', '✦', 'Every moment of strength has been seen.', () => GROWTH.every(g => growthSeen()[g.id]));
