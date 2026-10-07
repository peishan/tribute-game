/* =====================================================================
   TRIBUTE — DAILY LOGIN + AFK REWARDS (modelled on the Crimson Tide idea)
   Daily login: 7-day cycle, one claim per real calendar day, missing a day restarts the cycle.
   AFK rewards: gold, XP and herbs accrue in real time while you are away, up to AFK_MAX_H hours,
   scaled by average party level. All numbers are drafts to tune.
   State: G.login = {last:'YYYY-MM-DD', streak:n}, G.afk = {at: ms timestamp of last claim}
   ===================================================================== */
const AFK_MAX_H = 8;
const LOGIN_CYCLE = [
  {gold:100}, {items:[{id:'herbal_tonic',qty:2}]}, {gold:150}, {items:[{id:'spirit_potion',qty:2}]},
  {gold:200, items:[{id:'moon_tonic',qty:1}]}, {gold:150, items:[{id:'purify_elixir',qty:2}]}, {gold:500, items:[{id:'dragon_remedy',qty:1}]},
];
const dateKey = (t) => { const d = new Date(t === undefined ? Date.now() : t); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
function ensureRewards(now){
  now = now === undefined ? Date.now() : now;
  if(!G.login) G.login = {last:'', streak:0};
  if(!G.afk || !G.afk.at || G.afk.at > now) G.afk = {at: now};   // first run (or a clock set back): start counting from now
}
function loginState(now){
  ensureRewards(now);
  const today = dateKey(now), yest = dateKey((now === undefined ? Date.now() : now) - 864e5);
  const claimed = G.login.last === today;
  const streak = claimed ? G.login.streak : (G.login.last === yest ? G.login.streak : 0);
  return {claimed, streak, next:(streak % LOGIN_CYCLE.length)};   // next = index of the day you can claim (or the day claimed + 1 when claimed)
}
function claimLogin(now){
  const st = loginState(now); if(st.claimed) return ['Today\'s login gift is already claimed.'];
  const idx = st.streak % LOGIN_CYCLE.length;
  G.login.streak = st.streak + 1; G.login.last = dateKey(now);
  return grantReward(Object.assign({}, LOGIN_CYCLE[idx]), '🎁 Daily login, day '+(idx+1));
}
const avgLv = () => Math.max(1, Math.round(G.party.reduce((a,id)=>a+U(id).lv,0) / G.party.length));
function afkRate(){ const lv = avgLv(); return { gold: 12 + lv*3, xp: 20 + lv*5 }; }   // per hour
function afkHours(now){ ensureRewards(now); return Math.min(AFK_MAX_H, Math.max(0, ((now === undefined ? Date.now() : now) - G.afk.at) / 36e5)); }
function afkPreview(now){ const h = afkHours(now), r = afkRate(); return { h, gold:Math.floor(r.gold*h), xp:Math.floor(r.xp*h), herbs:Math.floor(h/2) }; }
function claimAfk(now){
  const p = afkPreview(now);
  if(p.h < 0.1) return ['Nothing has accrued yet. Come back in a little while.'];
  G.afk.at = now === undefined ? Date.now() : now;
  const rw = {gold:p.gold, xp:p.xp}; if(p.herbs) rw.items = [{id:'forest_herb', qty:p.herbs}];
  return grantReward(rw, '⏳ AFK rewards ('+p.h.toFixed(1)+'h)');
}
const rewardsReady = () => !!G && (!loginState().claimed || afkPreview().h >= 1);
const rwText2 = r => [r.gold&&r.gold+'g', (r.items||[]).map(d=>(ITEMS[d.id]?ITEMS[d.id].icon+' '+ITEMS[d.id].n:d.id)+' ×'+d.qty).join(', ')].filter(Boolean).join(' + ');
function rRewards(){
  const st = loginState(), p = afkPreview();
  const doneCount = st.claimed ? ((st.streak-1) % LOGIN_CYCLE.length)+1 : st.streak % LOGIN_CYCLE.length;
  const days = LOGIN_CYCLE.map((r,i) => {
    const done = i < doneCount;
    const cur = !st.claimed && i === st.streak % LOGIN_CYCLE.length;
    return `<div class="ev ${done?'locked':''}" style="${cur?'border-color:var(--gold)':''}"><div><b>Day ${i+1}</b> <span class="sm">${rwText2(r)}</span></div><span class="sm">${done?'✔ claimed':cur?'← today':''}</span></div>`; }).join('');
  return `<h2>Rewards</h2>${flashHtml()}
   <h4>⏳ AFK rewards</h4><div class="panel"><div class="sm">Your party keeps working while you are away: up to ${AFK_MAX_H} hours of gold, XP and herbs, scaled by party level.</div>
   ${bar(p.h, AFK_MAX_H)}<div class="sm">${p.h.toFixed(1)} / ${AFK_MAX_H} h · 💰 ${p.gold} · ✨ ${p.xp} XP${p.herbs?' · 🌿 '+p.herbs+' herbs':''}</div>
   <button class="pri" ${p.h>=0.1?'':'disabled'} onclick="act(claimAfk)">Claim AFK rewards</button></div>
   <h4>🎁 Daily login</h4><div class="panel"><div class="sm">Streak ${st.streak} day${st.streak===1?'':'s'}. Log in every day for the full 7-day cycle; missing a day restarts it.</div>
   <button class="pri" ${st.claimed?'disabled':''} onclick="act(claimLogin)">${st.claimed?'Claimed today ✔':'Claim today\'s gift'}</button></div>${days}`;
}
