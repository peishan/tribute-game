/* =====================================================================
   TRIBUTE — WORLD UI: Missions (letters / missions / quests / bounties),
   Travel (carriage + ship + world map), Here (current location & spots)
   ===================================================================== */
let mTab = 'letters', openLetter = null, spotOpen = null, gardenSel = 'chad';

function flashHtml(){
  if(!FLASH.length) return '';
  const h = `<div class="panel good">${FLASH.map(m=>`<div>${m}</div>`).join('')}</div>`; FLASH = []; return h;
}
const act = (fn, ...args) => { flash(fn(...args) || []); save(); render(); };
const bandImg = src => src ? `<img class="band" loading="lazy" src="${src}" alt="">` : '';
const rwText = rw => [rw.xp&&rw.xp+' XP', rw.gold&&rw.gold+'g', rw.rep&&rw.rep+' renown', rw.items&&rw.items.map(d=>ITEMS[d.id].icon+'×'+d.qty).join(' '), rw.flag&&'🎁 '+(FLAG_LABEL[rw.flag]||rw.flag)].filter(Boolean).join(' · ');
function unreadCount(){ return G.letters.filter(l=>!l.read).length; }

/* ---------------- MISSIONS TAB ---------------- */
function rMissions(){
  const unread = unreadCount();
  const subs = [['letters','✉️ Letters'+(unread?' ('+unread+')':'')],['missions','📜 Missions'],['quests','🎯 Quests'],['bounties','💰 Bounties']];
  const comm = hasBracelet()
    ? '<div class="sm">📿 <b>Communication bracelet</b> — King Greyson reaches you instantly, anywhere.</div>'
    : `<div class="sm">🕊️ <b>Pigeon post</b> — letters from King Greyson reach you only in towns, and take about ${Math.max(1,hopsFromCapital(G.loc))} day(s) from here. (Upgrades to a communication bracelet later.)${G.pending.length?` <b>${G.pending.length} in flight.</b>`:''}</div>`;
  const sallyBtn = (G.flags.sally_stays && G.flags.sally_gossip) ? `<div class="panel"><b>🌹 Sally (Dragonvale)</b><div class="sm">She stayed behind and keeps her ear to the court. Ask once a day.</div><button onclick="act(courtGossip)">Ask Sally for rumours</button></div>` : '';
  let body = '';
  if(mTab==='letters') body = rLetters(); else if(mTab==='missions') body = rMissionList();
  else if(mTab==='quests') body = rQuestsActive(); else body = rBountyList();
  return `<h2>Missions & Contracts</h2>${comm}${sallyBtn}<div class="row" style="margin:6px 0">${subs.map(([k,l])=>`<button class="${mTab===k?'pri':''}" onclick="mTab='${k}';openLetter=null;render()">${l}</button>`).join('')}</div>${flashHtml()}${body}`;
}
function rLetters(){
  if(openLetter){
    const L = G.letters.find(l=>l.id===openLetter), m = missionById(L.mid), st = mState(m.id);
    L.read = true;
    return `<button onclick="openLetter=null;render()">◀ Letters</button><div class="panel letter"><div class="sm">${hasBracelet()?'📿 Bracelet message':'🕊️ Pigeon letter'} · Day ${L.day}</div><h3>${L.subj}</h3><div style="margin:8px 0;font-style:italic">From King Greyson</div><div>${L.body}</div>
      <h4>Mission: ${m.title}</h4><div class="sm">${objText(m)} · Reward: ${rwText(m.rw)}</div>
      ${st==='offered'?`<button class="pri" onclick="act(acceptMission,'${m.id}')">Accept mission</button>`:`<div class="sm">${st==='active'?'In progress':'✔ Done'}</div>`}</div>`;
  }
  if(!G.letters.length) return '<div class="sm">No letters yet. King Greyson writes once the prologue is complete.</div>';
  return G.letters.map(l=>{ const st = mState(l.mid);
    return `<div class="card" onclick="openLetter='${l.id}';render()"><span class="big">${l.read?'📭':'📬'}</span><div class="fl"><b>${l.subj}</b><div class="sm">King Greyson · Day ${l.day} · ${st==='offered'?'new mission':st==='active'?'active':'done'}</div></div></div>`; }).join('');
}
function objText(m){
  const o = m.obj;
  if(o.type==='reach') return '📍 Travel to '+LOCATIONS[o.loc].n;
  if(o.type==='kill') return '⚔️ Defeat '+o.need+' '+o.label;
  if(o.type==='boss') return '👑 Defeat '+ENEMIES[o.key].n;
  if(o.type==='investigate') return '🔎 Investigate: '+spotById(o.spot).n;
  return '✉️ Read the letter';
}
function rMissionList(){
  const rows = MISSIONS.filter(m => ['active','done'].includes(mState(m.id)) || mState(m.id)==='offered').sort((a,b)=>(mState(a.id)==='done')-(mState(b.id)==='done'));
  if(!rows.length) return '<div class="sm">No missions yet.</div>';
  return rows.map(m=>{ const st = mState(m.id);
    return `<div class="ev ${st==='done'?'taken':st==='active'?'ready':'locked'}"><div><b>${m.title}</b><div class="sm">${objText(m)}${missionProgress(m)?' · '+missionProgress(m):''}</div><div class="sm">${rwText(m.rw)}</div></div><span class="sm">${st==='done'?'✔ done':st==='active'?'active':'letter waiting'}</span></div>`; }).join('');
}
function rQuestsActive(){
  const a = G.quests.active.map((q,i)=>{
    const have = q.type==='collect' ? (G.inv[q.item]||0) : 0;
    return `<div class="ev ready"><div><b>${q.icon} ${q.name}</b><div class="sm">${q.desc}</div><div class="sm">${q.type==='collect'?Math.min(have,q.need)+'/'+q.need+' in pack':q.type==='deliver'?'📮 To '+LOCATIONS[q.to].n:q.c+'/'+q.need} · ${rwText(q.rw)}</div></div>
      <div>${q.type==='collect'?`<button ${have>=q.need?'':'disabled'} onclick="act(turnInQuest,${i})">Turn in</button>`:''}<button onclick="abandonQuest(${i});render()">✕</button></div></div>`; }).join('');
  return `<div class="sm">Active contracts ${G.quests.active.length}/${MAX_QUESTS} · Renown ${G.rep} · Completed ${G.quests.done}. New contracts are taken from a Quest Board in a town.</div>${a||'<div class="panel sm">None. Visit a Quest Board.</div>'}`;
}
function rBountyList(){
  refreshBounties();
  return `<div class="sm">Auto-tracked: just hunt the targets. Bounties refresh every 2 days (Day ${G.day}), from monsters in places you have unlocked.</div>`+G.bounties.list.map(b=>`<div class="ev ${b.done?'taken':''}"><div><b>${b.icon} ${b.name}</b><div class="sm">${b.done?'COMPLETE ✓':b.c+'/'+b.need} · ${b.rw.xp} XP + ${b.rw.gold}g</div></div></div>`).join('');
}

/* ---------------- TRAVEL TAB ---------------- */
function rTravel(){
  if(G.voyage) return rVoyage();
  const L = LOCATIONS[G.loc], opts = travelOptions();
  const riskText = r => r<.3?'low':r<.5?'medium':'high';
  const rows = opts.map(o=>{ const to = LOCATIONS[o.to], r = o.r;
    return `<div class="card ${o.open&&o.modeOk?'':'lock'}"><span class="big">${MODES[r.mode].icon}</span><div class="fl"><b>${o.open?to.icon+' '+to.n:'❔ ???'}</b><div class="sm">${MODES[r.mode].n} · ${r.n} · ${voyageRoute(r)?VOYAGE_DAYS+' days (first crossing: a long voyage)':r.days+' day'+(r.days>1?'s':'')} · risk ${riskText(r.risk)}</div>${o.open?(o.modeOk?'':`<div class="sm">🔒 Boat travel unlocks at chapter ${SHIP_CH}</div>`):`<div class="sm">🔒 ${unlockText(to.unlock)}</div>`}</div><button class="pri" ${o.can?'':'disabled'} onclick="doTravelUi(${ROUTES.indexOf(r)},'${o.to}')">${r.fare}g</button></div>`; }).join('');
  const regions = Object.keys(REGIONS).map(rk=>{
    const locs = LOC_ORDER.filter(k=>LOCATIONS[k].region===rk);
    return `<h4>${REGIONS[rk].icon} ${REGIONS[rk].n}</h4>`+locs.map(k=>{ const l=LOCATIONS[k], open=locOpen(k);
      return `<div class="sm" style="padding:2px 0;${open?'':'opacity:.5'}">${k===G.loc?'📍 ':''}${open?l.icon+' '+l.n+(G.visited[k]?'':' (new)'):'❔ ??? — '+unlockText(l.unlock)}</div>`; }).join(''); }).join('');
  return `<h2>Travel</h2><div class="sm">You are at <b>${L.icon} ${L.n}</b> · Day ${G.day} · 💰 ${G.gold}</div>${flashHtml()}
    <div class="sm" style="margin:4px 0">🐎 Horse carriage: land routes, road encounters. ⛵ Ship: sea and river voyages. Fares are paid up front; a lost fight turns you back.</div>
    ${rows||'<div class="panel sm">No routes from here.</div>'}<div class="panel">${regions}</div>`;
}
function doTravelUi(i, to){
  origin = 'travel';
  const res = startTravel(ROUTES[i], to);
  if(res==='battle') tab = 'battle';
  render();
}

/* ---------------- HERE TAB (current location) ---------------- */
function rHere(){
  const L = LOCATIONS[G.loc];
  if(spotOpen){ const sp = L.spots.find(s=>s.id===spotOpen); if(sp) return rSpot(L, sp); spotOpen = null; }
  const cards = L.spots.map(sp=>{ const lock = spotLock(sp);
    return `<div class="card ${lock?'lock':''}" onclick="${lock?'':`spotOpen='${sp.id}';render()`}"><span class="big">${sp.icon}</span><div class="fl"><b>${sp.n}</b><div class="sm">${lock||sp.desc}</div></div></div>`; }).join('');
  return `${bandImg(L.img)}<h2>${L.icon} ${L.n}</h2><div class="sm">${REGIONS[L.region].icon} ${REGIONS[L.region].n} · Day ${G.day}</div><div class="sm" style="margin:4px 0">${L.desc}</div>${flashHtml()}${cards||'<div class="panel sm">Nothing to do here yet.</div>'}`;
}
function spotBack(){ spotOpen = null; render(); }
function rSpot(L, sp){
  const back = `<button onclick="spotBack()">◀ ${L.n}</button>`;
  const head = `${bandImg(sp.img)}<h2>${sp.icon} ${sp.n}</h2><div class="sm">${sp.desc}</div>${flashHtml()}`;
  let body = '';
  switch(sp.kind){
    case 'palace': {
      const unread = unreadCount();
      body = `<div class="panel"><b>King Greyson</b><div class="sm">${hasBracelet()?'He wears the matching bracelet and nods as you enter.':'Pigeon letters are quick, but nothing beats an audience.'}</div>
        <button class="pri" onclick="act(palaceAudience)">Request an audience</button><button onclick="mTab='letters';showTab('missions')">Open letters${unread?' ('+unread+' new)':''}</button></div>`; break; }
    case 'training': {
      const lv = avgPartyLv();
      body = `<div class="panel"><div class="sm">Safe zone: no monsters. Low EXP — useful until about Lv15. (Party avg Lv${lv})</div>
        <button class="pri" onclick="act(doPractice)">Sword practice (1 day)</button><button onclick="showTab('training')">Sparring ring (sandbox battles)</button></div>`; break; }
    case 'archive': {
      const rows = LORE.filter(e => G.ch >= e.ch && (!e.party || isRecruited(e.party))).map(e=>`<div class="li"><b>${e.n}</b><div class="sm">${e.t}</div></div>`).join('');
      body = `<div class="panel">${rows}</div><div class="sm">Draft entries — more unlock with the story. The Bestiary is a separate tab.</div>`; break; }
    case 'pavilion': {
      const rec = RECIPES.map(r => { const have = Object.keys(r.need).every(k => (G.inv[k]||0) >= r.need[k]), cost = Object.keys(r.need).map(k => ITEMS[k].icon+' '+ITEMS[k].n+' ×'+r.need[k]).join(', ');
        return `<div class="ev ${have?'':'locked'}"><div><b>${ITEMS[r.out].icon} ${ITEMS[r.out].n}</b> <span class="sm">${useText(USE[r.out])}</span><div class="sm">${cost} · ${r.gold}g</div></div><button ${have&&G.gold>=r.gold?'':'disabled'} onclick="act(craftAt,'${r.out}')">Craft</button></div>`; }).join('');
      body = `<div class="panel"><div class="row" style="align-items:center;gap:10px;flex-wrap:nowrap"><img src="assets/areas/jenika_512.webp" alt="Jenika Moon" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid var(--gold)"><div><b>🌙 Jenika Moon</b><div class="sm">"Rest here, and let me look at you all."</div></div></div>
        <button class="pri" onclick="act(pavilionRest)">Restore the party (once per day, free)</button></div><h4>Tonics & remedies</h4>${rec}`; break; }
    case 'village':
      body = `<div class="panel"><div class="sm">Each activity can be done once per day. Day ${G.day}.</div>${Object.keys(VILLAGE_ACTS).map(k => { const a = VILLAGE_ACTS[k], done = G.bondDay['vl_'+k]===G.day, miss = a.need && !isRecruited(a.need);
        return `<div class="ev ${done||miss?'locked':''}"><div><b>${a.icon} ${a.n}</b><div class="sm">${[a.bond&&'bond',a.xp&&a.xp+' XP',a.gold&&a.gold+'g',a.items&&'herbs',a.hint&&'rumour'].filter(Boolean).join(' · ')}${miss?' · 🔒 '+CHARACTERS[a.need].n.split(' ')[0]+' not in party':''}</div></div><button ${done||miss?'disabled':''} onclick="act(doVillage,'${k}')">${done?'Done':'Do'}</button></div>`; }).join('')}<button onclick="act(()=>advanceDay(1))">🌙 Rest until tomorrow</button></div>`; break;
    case 'fireflies':
      body = `<div class="panel"><div class="sm">Spirit fireflies drift over the luminous water. Devon keeps watch while the party rests.</div><button class="pri" onclick="act(fireflyRest)">Rest by the water — restore the party (once per day, free)</button></div>`; break;
    case 'meditate':
      body = `<div class="panel"><div class="sm">Meditation and ancient teachings. Once per day.</div><button class="pri" onclick="act(doMeditate)">Meditate (1 day)</button></div>`; break;
    case 'garden': {
      const opts = G.party.filter(i=>i!=='jade').map(i=>`<option value="${i}" ${i===gardenSel?'selected':''}>${CHARACTERS[i].n}</option>`).join('');
      body = G.party.length>1 ? `<div class="panel"><div class="sm">Spend an evening together (once per member per day). Bond +5.</div><select onchange="gardenSel=this.value">${opts}</select><button class="pri" onclick="act(doGarden,gardenSel)">Walk together (1 day)</button></div>` : '<div class="panel sm">Jade walks alone for now. Companions will join her here as they are recruited.</div>'; break; }
    case 'tavern':
      body = `<div class="panel">${G.flags.sally_gossip&&G.loc==='dragon_vale'?'<button onclick="act(courtGossip)">🌹 Ask Sally for court gossip (once a day)</button>':''}<button class="pri" onclick="act(restAtInn)">🛏️ Rest (${REST_COST()}g, full recovery, 1 day)</button><button onclick="act(doMeal)">Share a meal (15g)</button><button onclick="toast(rumour());render()">Buy a rumour (5g)</button></div>`; break;
    case 'board': body = rBoard(); break;
    case 'hunt':
      body = `<div class="panel"><div class="sm">Enemies: ${sp.pool.map(k=>ENEMIES[k].icon+' '+ENEMIES[k].n).join(', ')}${sp.elite?' · elite: '+ENEMIES[sp.elite].icon+' '+ENEMIES[sp.elite].n:''}. Scaled to party level (min Lv${sp.lo||1}).</div>
        <button class="pri" onclick="origin='here';doHunt('${sp.id}');tab='battle';render()">Hunt</button>${sp.elite?`<button onclick="origin='here';doHunt('${sp.id}',true);tab='battle';render()">Seek the ${ENEMIES[sp.elite].n}</button>`:''}</div>`; break;
    case 'gather':
      body = `<div class="panel"><div class="sm">Yields: ${sp.loot.map(d=>ITEMS[d.id].icon+' '+ITEMS[d.id].n).join(', ')}. Takes a day; some risk of an ambush.</div><button class="pri" onclick="origin='here';gatherUi('${sp.id}')">Gather (1 day)</button></div>`; break;
    case 'investigate': {
      const n = G.clues[sp.id]||0, done = n>=sp.need;
      const found = sp.clues.slice(0,n).map(c=>`<div class="li">🔎 ${c}</div>`).join('');
      body = `<div class="panel"><div class="sm">Clues ${n}/${sp.need}${done?' — investigation complete':''}</div>${found}${done?'':`<button class="pri" onclick="origin='here';investUi('${sp.id}')">Search for clues (1 day)</button>`}</div>`; break; }
    case 'boss': {
      const e = ENEMIES[sp.boss], beaten = G.flags['boss_'+sp.boss];
      body = `<div class="panel"><b>${e.icon} ${e.n}</b> <span class="sm">${beaten?'· defeated (replayable)':''}</span><div class="sm">${e.desc}</div><button class="pri" onclick="origin='here';doBoss('${sp.id}');tab='battle';render()">${beaten?'Challenge again':'Challenge'}</button></div>`; break; }
  }
  return back+head+body;
}
function gatherUi(id){ const r = doGather(id); if(r==='battle') tab='battle'; render(); }
function investUi(id){ const r = doInvestigate(id); if(r==='battle') tab='battle'; render(); }
function rBoard(){
  const loc = G.loc, list = boardFor(loc);
  const posted = list.map((q,i)=>`<div class="ev"><div><b>${q.icon} ${q.name}</b><div class="sm">${q.desc}</div><div class="sm">${q.type==='kill'?'Defeat '+q.need+' '+ENEMIES[q.key].n:q.type==='collect'?'Bring '+q.need+' '+ITEMS[q.item].n:'Parcel'} · ${rwText(q.rw)}</div></div><button class="pri" ${G.quests.active.length>=MAX_QUESTS?'disabled':''} onclick="acceptQuest('${loc}',${i});render()">Accept</button></div>`).join('');
  refreshBounties();
  const bn = G.bounties.list.map(b=>`<div class="ev ${b.done?'taken':''}"><div><b>${b.icon} ${b.name}</b><div class="sm">${b.done?'COMPLETE ✓':b.c+'/'+b.need} · ${b.rw.xp} XP + ${b.rw.gold}g</div></div></div>`).join('');
  const turn = G.quests.active.map((q,i)=>q.type==='collect'&&(G.inv[q.item]||0)>=q.need?`<div class="ev ready"><div><b>${q.icon} ${q.name}</b><div class="sm">Ready to turn in</div></div><button class="pri" onclick="act(turnInQuest,${i})">Turn in</button></div>`:'').join('');
  return `<h4>Contracts (${G.quests.active.length}/${MAX_QUESTS} taken)</h4>${turn}${posted||'<div class="sm">Nothing posted today.</div>'}<h4>Bounties</h4>${bn}`;
}
