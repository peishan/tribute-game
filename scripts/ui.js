/* =====================================================================
   TRIBUTE — UI (tabs, party sheets, journal, training, battle, stubs)
   ===================================================================== */
const TABS = [['journal','📖 Journal'],['missions','✉️ Missions'],['travel','🛞 Travel'],['here','🧭 Here'],['party','👥 Party'],['training','🎯 Training'],
              ['inventory','🎒 Items'],['bestiary','📕 Bestiary'],['equipment','🛡️ Gear'],['save','💾 Save'],['dev','🛠️ Dev']];
let tab = 'journal', sel = 'jade', openCh = null, chMsgs = [], origin = 'journal', trSel = 0, trLv = 5;
const STAT_SCALE = {hp:420,mp:200,atk:130,mag:130,def:100,spd:90};
const STAT_NAME = {hp:'HP',mp:'MP',atk:'ATK',mag:'MAG',def:'DEF',spd:'SPD'};
const bar = (v,m,cls) => `<div class="bar ${cls||''}"><i style="width:${clamp(100*v/m,0,100)}%"></i></div>`;

function toast(t){ const e=$('toast'); e.textContent=t; e.classList.add('on'); clearTimeout(toast.t); toast.t=setTimeout(()=>e.classList.remove('on'),2200); }
function showTab(t){ tab=t; render(); window.scrollTo(0,0); const m=$('main'); if(m) m.scrollTop=0; }
function render(){
  $('hgold').textContent = '💰 '+G.gold;
  $('hch').textContent = G.ch<0 ? 'Prologue' : (G.ch===0?'Prologue ✓':'Ch.'+G.ch+' ✓');
  $('hday').textContent = '☀️ Day '+G.day;
  $('hloc').textContent = '📍 '+LOCATIONS[G.loc].n;
  const showBattle = !!B;
  $('nav').innerHTML = (showBattle?`<button class="${tab==='battle'?'on':''}" onclick="showTab('battle')">⚔️ Battle</button>`:'') +
     TABS.map(([k,l]) => `<button class="${tab===k?'on':''}" onclick="showTab('${k}')">${l}${k==='missions'&&unreadCount()?' <b style="color:var(--r)">●</b>':''}</button>`).join('');
  const R = { journal:rJournal, party:rParty, training:rTraining, battle:rBattle, inventory:rInventory, bestiary:rBestiary,
              equipment:()=>stub('Equipment','Aethon-style slots: weapon · armor · accessory (hook ready: gearBonus() in core.js)',
                ['Signature weapons per hero: Scholar Blade (Devon), Enchanted Crossbow (Levi → Jade at Ch.30), Veiled Fans (Sally)…','Gear drops from the major-battle loot tables (see enemies.js › LOOT)','Class restrictions per Aethon\'s CODEX_EQUIPMENT_RULES']),
              missions:rMissions, travel:rTravel, here:rHere, save:rSave,
              dev:rDev }[tab] || rJournal;
  $('main').innerHTML = R();
}
function stub(title, sub, items){
  return `<h2>${title}</h2><div class="sm">${sub}</div><div class="panel">${items.map(i=>`<div class="li">• ${i}</div>`).join('')}</div><div class="sm" style="margin-top:8px;opacity:.6">Skeleton placeholder — not built yet.</div>`;
}

/* ---------------- PARTY ---------------- */
function rParty(){
  const slots = [0,1,2,3].map(i => { const id=G.active[i]; return id?`<div class="slot on" onclick="sel='${id}';render()"><img src="assets/party/${id}.webp"><b>${CHARACTERS[id].n.split(' ')[0]}</b></div>`:`<div class="slot"><b>empty</b></div>`; }).join('');
  const roster = ROSTER.map(id => {
    const c=CHARACTERS[id], rec=isRecruited(id), join=JOIN_CH[id];
    return `<div class="rc ${sel===id?'sel':''} ${rec||profileKnown(id)?'':'lock'}" onclick="sel='${id}';render()"><img src="assets/party/${id}.webp"><div><b>${profileKnown(id)||id==='princess'?c.n:'???'}</b><div class="sm">${rec?c.cls+' · Lv'+U(id).lv+(G.guests[id]?' · guest':''):(profileKnown(id)?c.cls+' · ':'')+(join!==undefined?'Joins Ch.'+join:'Unrecruited')}</div></div></div>`; }).join('');
  return `<h2>Party</h2><div class="sm">Active (${G.active.length}/${ACTIVE_SLOTS}) — fights use these four</div><div class="slots">${slots}</div><div class="rcs">${roster}</div>${rSheet(sel)}`;
}
function rSheet(id){
  const c=CHARACTERS[id], rec=isRecruited(id);
  if(!rec && profileKnown(id)) return `<div class="panel"><div class="sh"><img src="assets/party/${id}.webp"><div><h3>${c.icon} ${c.n}</h3><div>${c.cls}</div><div class="sm">${c.role}</div></div></div><div class="sm" style="margin:6px 0">${c.identity}</div><div class="sm">Not in the party yet${JOIN_CH[id]!==undefined?' — joins at chapter '+JOIN_CH[id]:''}.</div></div>`;
  if(!rec) return `<div class="panel"><h3>${id==='princess'?c.n:'???'}</h3><div class="sm">${id==='princess'?c.identity:(JOIN_CH[id]!==undefined?'Not yet recruited. Joins at chapter '+JOIN_CH[id]+'.':'Not yet recruited. Recruitment chapter still to be decided.')}</div></div>`;
  const u=U(id), st=statsOf(id), bl=bondLevel(id), nextB=BOND_LEVELS[bl+1];
  const stats = STATS.map(s=>`<div class="st"><span>${STAT_NAME[s]}</span>${bar(st[s],STAT_SCALE[s],s)}<b>${st[s]}</b></div>`).join('');
  const skills = skillsOf(id).filter(s=>!(s.treeSkill&&!s.ok)).map(s=>`<div class="sk ${s.ok?'':'lk'}"><span class="si">${s.icon}</span><div><b>${s.n}</b> ${s.sig?'<em class="tag">signature</em>':''}${s.bondSkill?'<em class="tag b">bond</em>':''}${s.evoSkill?'<em class="tag e">evolution</em>':''}${s.treeSkill?'<em class="tag t">tree</em>':''}<div class="sm">${s.ok?s.desc:'🔒 '+s.why}</div></div><span class="mp">${s.mp?s.mp+' MP':''}</span></div>`).join('');
  const evo = evoState(id).map(e=>`<div class="ev ${e.st}"><div><b>${e.n}</b> <span class="sm">${e.tier===2?'final':'tier '+e.tier}</span><div class="sm">${e.desc}</div></div>${e.st==='ready'?`<button onclick="doEvolve('${id}','${e.id}')">Evolve</button>`:`<span class="sm">${e.st==='taken'?'✔ taken':e.st==='closed'?'closed':'🔒 '+e.why}</span>`}</div>`).join('') || '<div class="sm">No evolution designed yet.</div>';
  const act = G.active.includes(id);
  return `<div class="panel sheet"><div class="sh"><img src="assets/party/${id}.webp"><div><h3>${c.icon} ${c.n}${G.guests[id]?' <em class="tag">guest</em>':''}</h3><div>${c.cls}</div><div class="sm">${c.role} · ${c.combat}</div><div class="sm">Lv ${u.lv}/${CFG.LEVEL_CAP}</div>${bar(u.xp,xpToNext(u.lv),'xp')}<div class="sm">XP ${u.xp}/${xpToNext(u.lv)}</div></div></div>
   <div class="sm" style="margin:6px 0">${c.identity}</div>
   ${id!=='jade'?`<div class="sm">💞 Bond with Jade: ${bl}/5 ${nextB?`(${u.bp}/${nextB})`:'(max)'}</div>${bar(u.bp,nextB||u.bp||1,'bond')}`:''}
   ${id!=='jade'?`<button onclick="toggleActive('${id}');render()">${act?'Remove from active party':'Add to active party'}</button>`:'<div class="sm">Jade always leads the active party.</div>'}
   <h4>Stats</h4><div class="stg">${stats}</div>
   <h4>Weapon & Style</h4><div class="sm">${c.weapon} · ${c.style.join(', ')} · Strength: ${c.strength}</div>
   <h4>Special Ability — ${c.signature}</h4><div class="sm">${c.sigDesc}${c.fieldAbility?' <br><b>Field ability:</b> Ancient Dragon Knowledge (identify artefacts, unlock sealed areas — used by Explore later).':''}</div>
   <h4>Skills</h4>${skills}${rTree(id)}${rBondRewards(id)}<h4>Evolution</h4>${evo}</div>`;
}
function rTree(id){
  const free = spFree(id);
  const branches = SKILLTREE[id].map(b => `<div class="br"><b>${b.icon} ${b.n}</b> <span class="sm">${b.desc}</span>`+nodeList(id).filter(n=>n.branch===b.id).map(n=>{
    const st = nodeState(id,n);
    return `<div class="nd ${st}"><span class="si">${n.icon}</span><div class="fl"><b>${n.n}</b> <em class="tag ${n.skill?'t':''}">${n.skill?'skill':'passive'}</em><div class="sm">${n.desc}${n.skill?' · '+n.skill.mp+' MP':''}</div></div>${st==='taken'?'<span class="sm">✔</span>':st==='ready'?`<button onclick="doNode('${id}','${n.id}')">${n.cost} SP</button>`:`<span class="sm">${st==='locked'||st==='sealed'?'🔒':n.cost+' SP'}</span>`}</div>`; }).join('')+`</div>`).join('');
  if(!treeOpen(id)) return `<h4>Skill Tree</h4><div class="sm">🔒 Unlocks at chapter ${TREE_CH[id]}. Skill points keep accruing (${free} SP free).</div>`;
  return `<h4>Skill Tree <span class="sm">· ${free} SP free (${spSpent(id)} spent)</span></h4><div class="sm">1 SP per level, +3 per evolution. Each node needs the one above it.</div>${branches}<button ${U(id).nodes.length&&G.gold>=respecCost(id)?'':'disabled'} onclick="doRespec('${id}')">Reset tree (${respecCost(id)}g)</button>`;
}
function rBondRewards(id){
  const bl = bondLevel(id), tiers = (BONDTREE[id]||[]).map(b => ({lvl:b.lvl, n:b.n, icon:b.icon, desc:b.skill?b.skill.desc:(b.desc+' ('+passiveText(b.passive)+')'), kind:b.skill?(b.skill.pair?'ultimate':'skill'):'passive'}));
  const c = CHARACTERS[id]; if(c.bond) tiers.push({lvl:3, n:c.bond.n, icon:c.bond.icon, desc:c.bond.desc, kind:'pair skill'});
  tiers.sort((a,b)=>a.lvl-b.lvl);
  return `<h4>${id==='jade'?'Party Bond':'Bond'} Unlocks <span class="sm">· level ${bl}/5${id==='jade'?' (average companion bond)':''}</span></h4>`+tiers.map(t=>`<div class="nd ${bl>=t.lvl?'taken':'locked'}"><span class="si">${t.icon}</span><div class="fl"><b>${t.n}</b> <em class="tag b">${t.kind}</em><div class="sm">${bl>=t.lvl?t.desc:'🔒 Bond '+t.lvl}</div></div><span class="sm">B${t.lvl}</span></div>`).join('');
}
function doNode(id,nid){ if(takeNode(id,nid)){ toast('Learned '+nodeById(id,nid).n); render(); } }
function doRespec(id){ if(respec(id)){ toast('Skill tree reset'); render(); } }
function doEvolve(id,eid){ if(evolve(id,eid)){ toast(CHARACTERS[id].n+' evolved!'); render(); } }

/* ---------------- JOURNAL ---------------- */
function rJournal(){
  if(openCh!==null) return rChapter(openCh);
  const rows = CHAPTERS.map(c => {
    const done=chapterDone(c.n), avail=chapterAvailable(c.n);
    const joins = recruitsAtChapter(c.n).map(id=>CHARACTERS[id].n.split(' ')[0]);
    return `<div class="card ${avail?'':'lock'} ${c.n===G.ch+1?'cur':''}" onclick="${avail?`openChapter(${c.n})`:''}"><div class="fl"><b>${c.n===0?'':c.n+'. '}${avail?c.title:'???'}</b><div class="sm">${done?'✔ Complete':avail?'Available':(c.n<=G.ch+1&&CH_LOC[c.n]?'📍 Travel to '+LOCATIONS[CH_LOC[c.n]].n:'Locked')}${CH_LOC[c.n]&&avail&&!done?' · 📍 '+LOCATIONS[CH_LOC[c.n]].n:''}${c.battle?' · ⚔️ battle':''}${joins.length?' · ★ '+joins.join(', ')+' joins':''}${c.art.length?'':' · art pending'}</div></div><span class="sm">XP ${c.sxp}</span></div>`; }).join('');
  return `<h2>Chapter Journal</h2><div class="sm">Chapters unlock in order. Each gives story XP; battle chapters also roll loot.</div>${rows}`;
}
function openChapter(n){ openCh=n; chMsgs=[]; render(); if(CHAPTERS[n].art.length && !G.read[n] && !chapterDone(n)) openStory(n); }
function closeChapter(){ openCh=null; render(); }
function rChapter(n){
  const c=CHAPTERS[n], done=chapterDone(n);
  const pages = c.art.length ? `<div class="panel"><button class="pri" onclick="openStory(${n})">📖 ${G.read[n]?'Read again':'Read story'} (${c.art.length} page${c.art.length>1?'s':''})</button><details><summary class="sm">Show pages inline</summary>${c.art.map(a=>`<img class="pg" loading="lazy" src="assets/comics/${a}.webp" alt="">`).join('')}</details></div>` : `<div class="panel sm">Artwork for this chapter hasn't been added yet (drop pages into assets/comics and list them in journal.js › ART).</div>`;
  let foot='';
  if(c.battle){
    const foes=c.battle.map(f=>{const e=ENEMIES[f.key];return `${e.icon} ${e.n}`;}).join(' · ');
    foot = `<div class="panel"><b>⚔️ Battle</b> <span class="sm">(Lv ${c.lv})</span><div class="sm">${foes}</div><button class="pri" onclick="chapterFight(${c.n})">${done?'Replay battle':'Begin battle'}</button></div>`;
  } else if(!done){
    foot = `<button class="pri" onclick="finishChapter(${c.n})">${n===0?'Finish the opening — Jade joins the journey':'Complete chapter'} (+${c.sxp} XP)</button>`;
  }
  return `<button onclick="closeChapter()">◀ Journal</button><h2>${n===0?'':'Chapter '+n+' · '}${c.title}</h2>${rDesign(n)}${pages}${chMsgs.length?`<div class="panel good">${chMsgs.map(m=>`<div>${m}</div>`).join('')}</div>`:''}${foot}`;
}
function rDesign(n){
  const d = CHAPTER_DESIGN[n];
  if(!d) return `<div class="panel sm">Skeleton summary for this chapter isn't written yet. It will be converted from the canon story text.</div>`;
  const li = a => a.map(x=>`<div class="li">• ${x}</div>`).join('');
  const chars = d.charsNote || d.chars.map(i=>CHARACTERS[i].icon+' '+CHARACTERS[i].n.split(' ')[0]).join(' · ');
  return `<div class="panel">${d.type?`<div class="sm">🎬 ${d.type}</div>`:''}<div class="sm">${d.loc}${CH_LOC[n]?' · starts at 📍 '+LOCATIONS[CH_LOC[n]].n:''}</div><div style="margin:6px 0">${d.sum}</div>
   ${d.quote?`<div class="sm" style="font-style:italic;color:var(--gold);margin:6px 0">${d.quote}</div>`:''}${d.art?`<div class="sm" style="margin:6px 0">${d.art}</div>`:''}
   <details><summary class="sm">Key events · purpose · unlocks</summary>${d.events.length?'<h4>Key Events</h4>'+li(d.events):''}<h4>Gameplay Purpose</h4>${li(d.purpose)}<h4>Unlocks</h4>${li(d.unlocks.map(x=>'✅ '+x))}
   ${d.introduced?`<h4>Characters Introduced</h4>${li(d.introduced)}`:''}${d.reward?`<h4>Reward</h4>${li([d.reward])}`:''}<div class="sm" style="margin-top:6px">Playable: ${chars}</div></details></div>`;
}
function finishChapter(n){ storyResult(n, completeChapter(n)); }
function chapterFight(n){ origin='journal'; startBattle(battleSpecFor(n)); tab='battle'; render(); }

/* ---------------- TRAINING ---------------- */
const PRESETS = [
  ['Dock Pickpockets ×3',[{key:'dock_pickpocket'},{key:'dock_pickpocket'},{key:'dock_pickpocket'}]],
  ['Road Bandits',[{key:'road_bandit'},{key:'bandit_archer'},{key:'road_bandit'}]],
  ['Smugglers & Thugs',[{key:'smuggler'},{key:'dock_thug'},{key:'smuggler'}]],
  ['Masked Assassins ×2',[{key:'masked_assassin'},{key:'masked_assassin'}]],
  ['Demons (magical)',[{key:'imp'},{key:'shade_wraith'},{key:'imp'}]],
  ['BOSS: Bandit Chief',[{key:'boss_bandit_chief'}]],
  ['BOSS: Masked Leader',[{key:'boss_masked_leader'},{key:'masked_assassin'}]],
  ['BOSS: Demon Warden',[{key:'boss_demon_warden'},{key:'imp'}]],
];
function rTraining(){
  const opts = PRESETS.map((p,i)=>`<option value="${i}" ${i===trSel?'selected':''}>${p[0]}</option>`).join('');
  return `<h2>Training Room</h2><div class="sm">Sandbox to test classes, skills, bonds and evolutions. No rewards or losses.</div>
   <div class="panel"><label class="sm">Enemy group</label><select onchange="trSel=+this.value">${opts}</select>
   <label class="sm">Enemy level: <b id="trv">${trLv}</b></label><input type="range" min="1" max="60" value="${trLv}" oninput="trLv=+this.value;$('trv').textContent=this.value">
   <div class="sm">Party: ${G.active.map(id=>CHARACTERS[id].icon+' '+CHARACTERS[id].n.split(' ')[0]+' Lv'+U(id).lv).join(' · ')}</div>
   <button class="pri" onclick="trainFight()">Start training battle</button></div>`;
}
function trainFight(){ origin='training'; startBattle({foes:PRESETS[trSel][1].map(f=>({key:f.key,lv:trLv})), rewards:false}); tab='battle'; render(); }

/* ---------------- BATTLE ---------------- */
const CHIP = {burn:'🔥',slow:'🐌',bind:'⛓️',charm:'💫',silence:'🤐',shield:'🛡️',regen:'💚',crit:'👁️'};
function chips(u){
  let h = Object.keys(u.st).map(k=>`<i title="${k}">${CHIP[k]||k}</i>`).join('');
  u.bf.forEach(b=>{ h += `<i class="${b.m>=1?'up':'dn'}">${b.stat.toUpperCase()}${b.m>=1?'↑':'↓'}</i>`; });
  if(u.state) h += `<i>${u.state.id==='awakened'?'✨':'🐲'}</i>`;
  if(u.guard) h += '<i>🛡</i>';
  return h;
}
function rBattle(){
  if(!B) return '<div class="sm">No battle in progress.</div>';
  const tgtMode = B.ui.mode==='target', cand = tgtMode ? B.ui.cands.map(u=>u.uid) : [];
  const foes = B.foes.map(f=>`<div class="unit foe ${f.dead?'dead':''} ${cand.includes(f.uid)?'tg':''}" ${cand.includes(f.uid)?`onclick="pickTarget('${f.uid}')"`:''}><div class="ic">${f.icon}</div><b>${f.name}</b>${bar(f.hp,f.mhp,'e')}<div class="sm">${f.hp}/${f.mhp}${f.known?' · DEF '+f.def:''}</div><div class="ch">${chips(f)}</div></div>`).join('');
  const allies = B.allies.map(a=>`<div class="unit ally ${a.dead?'dead':''} ${B.cur===a&&!B.over?'cur':''} ${cand.includes(a.uid)?'tg':''}" ${cand.includes(a.uid)?`onclick="pickTarget('${a.uid}')"`:''}><img src="${a.img}"><div><b>${a.name.split(' ')[0]}</b>${bar(a.hp,a.mhp)}${bar(a.mp,a.mmp,'mpb')}<div class="sm">${a.hp}/${a.mhp} · ${a.mp}MP</div><div class="ch">${chips(a)}</div></div></div>`).join('');
  const log = B.log.slice(-9).map(l=>`<div class="lg ${l.cls}">${l.t}</div>`).join('');
  let act='';
  if(B.over==='win'){
    const r=B.rewards;
    act = `<div class="panel good"><b>Victory!</b><div>XP +${r.xp} · Gold +${r.gold}${r.real?'':' (sandbox: not awarded)'}</div>${r.drops.length?`<div>Loot: ${r.drops.map(d=>(ITEMS[d.id]?ITEMS[d.id].icon+' '+ITEMS[d.id].n:d.id)+' ×'+d.qty).join(', ')}</div>`:''}${r.msgs.map(m=>`<div class="sm">${m}</div>`).join('')}</div><button class="pri" onclick="battleDone()">Continue</button>`;
  } else if(B.over==='lose'){
    act = `<div class="panel bad"><b>Defeat…</b></div><button class="pri" onclick="battleDone()">Retreat</button>`;
  } else if(B.cur && B.cur.ally){
    const u=B.cur, m=B.ui.mode;
    if(m==='menu') act = `<div class="sm">${u.name}'s turn</div><div class="row"><button class="pri" onclick="doAttack()">Attack</button><button onclick="B.ui={mode:'skills'};render()">Skills</button><button onclick="playerAct('guard')">Guard</button></div>`;
    else if(m==='skills') act = skillList(u).map(s=>`<button class="skb" ${s.usable?'':'disabled'} onclick="pickSkill('${s.id}')">${s.icon} ${s.n} <small>${s.cost?s.cost+'MP':''} ${s.note}</small></button>`).join('') + `<button onclick="B.ui={mode:'menu'};render()">◀ Back</button>`;
    else act = `<div class="sm">Choose a target</div><button onclick="B.ui={mode:'menu'};render()">◀ Cancel</button>`;
  }
  return `<div class="foes">${foes}</div><div class="log">${log}</div><div class="allies">${allies}</div><div class="acts">${act}</div>`;
}
function doAttack(){ B.ui={mode:'target',kind:'attack',sid:null,cands:alive(B.foes)}; render(); }
function pickSkill(sid){
  const s = skillList(B.cur).find(x=>x.id===sid); if(!s||!s.usable) return;
  if(['foe','chain','ally','allyDown'].includes(s.tgt)){ B.ui={mode:'target',kind:'skill',sid,cands:targetsFor(s)}; render(); }
  else { playerAct('skill', sid, null); render(); }
}
function pickTarget(uid){ const u=B.ui; playerAct(u.kind, u.sid, uid); render(); }
function doGuardAct(){ playerAct('guard'); render(); }
function battleDone(){
  if(B && B.over==='lose' && B.spec.onLose && !chapterDone(B.spec.chapter)){      // story duel: the chapter continues even if Jade loses
    const n = B.spec.chapter, msgs = ['Chad wins the duel, as the story goes.'].concat(B.spec.onLose()||[]); B = null; tab = origin; render(); storyResult(n, msgs); return; }
  if(B && B.over==='lose' && typeof onBattleLost==='function') onBattleLost(); B=null; tab=origin; render(); }
// make menu actions re-render
const _pa = playerAct; playerAct = function(k,s,t){ _pa(k,s,t); render(); };

/* ---------------- ITEMS / BESTIARY ---------------- */
function rInventory(){
  const ids = Object.keys(G.inv).filter(k=>G.inv[k]>0);
  const rows = ids.length ? ids.map(k=>{const i=ITEMS[k]||{n:k,icon:'❔',type:'?',rarity:''};return `<div class="card"><span class="big">${i.icon}</span><div class="fl"><b>${i.n}</b><div class="sm">${i.type}${i.slot?' · '+i.slot:''} · ${i.rarity}</div></div><b>×${G.inv[k]}</b></div>`;}).join('') : '<div class="sm">Empty. Win chapter battles to roll loot.</div>';
  return `<h2>Items</h2><div class="sm">Gold: ${G.gold}</div>${rows}`;
}
function rBestiary(){
  const keys=Object.keys(ENEMIES), found=keys.filter(k=>G.bestiary[k]).length;
  return `<h2>Bestiary</h2><div class="sm">${found} / ${keys.length} discovered</div>`+keys.map(k=>{const e=ENEMIES[k],n=G.bestiary[k];
    return n?`<div class="card"><span class="big">${e.icon}</span><div class="fl"><b>${e.n}</b><div class="sm">${e.area}${e.boss?' · boss':e.elite?' · elite':''} · HP ${e.hp} · defeated ${n}</div><div class="sm">${e.desc}</div></div></div>`
            :`<div class="card lock"><span class="big">❔</span><div class="fl"><b>???</b><div class="sm">Undiscovered</div></div></div>`;}).join('');
}

/* ---------------- DEV ---------------- */
function rDev(){
  return `<h2>Dev tools</h2><div class="panel"><div class="sm">Jump the save to a story point (recruits, flags, levels):</div>
   <input id="devch" type="number" min="0" max="31" value="${Math.max(0,G.ch)}"><button onclick="devSetChapter(+$('devch').value);toast('Story set');render()">Set chapter</button></div>
   <div class="panel"><div class="row">
   <button onclick="gainXp(500);save();render()">+500 XP (all)</button><button onclick="gainXp(5000);save();render()">+5000 XP</button>
   <button onclick="G.party.forEach(i=>addBond(i,60));save();render()">+60 bond (all)</button><button onclick="G.gold+=500;save();render()">+500 gold</button>
   <button onclick="G.flags.crossbow=!G.flags.crossbow;save();render()">Toggle crossbow flag (${G.flags.crossbow?'on':'off'})</button>
   <button onclick="G.flags.greyson_arms=!G.flags.greyson_arms;save();render()">Unseal Greyson's dagger+flail (${G.flags.greyson_arms?'on':'off'})</button>
   <button onclick="G.flags.bracelet=!G.flags.bracelet;save();render()">Toggle bracelet (${G.flags.bracelet?'on':'off'})</button>
   <button onclick="advanceDay(1);save();render()">+1 day</button><select id="devloc">${LOC_ORDER.filter(locOpen).map(k=>`<option value="${k}" ${k===G.loc?'selected':''}>${LOCATIONS[k].n}</option>`).join('')}</select><button onclick="G.loc=$('devloc').value;save();render()">Warp</button>
   <button onclick="ROSTER.forEach(i=>recruit(i));save();render()">Recruit everyone</button></div></div>
   <div class="panel"><button onclick="if(confirm('Erase save?')){localStorage.removeItem(CFG.SAVE_KEY);location.reload()}">Erase save</button></div>`;
}

/* ---------------- BOOT ---------------- */
function enter(newGame){
  if(newGame && localStorage.getItem(CFG.SAVE_KEY) && !confirm('Start a new journey? Your saved journey will be overwritten.')) return;
  if(newGame || !load()){ G = newState(); save(); }
  if(newGame && BRACELET_FROM_START) G.flags.bracelet = true;
  refreshBounties(); checkMissionOffers(); save();
  $('landing').style.display='none'; $('app').style.display='flex'; render();
}
window.addEventListener('load', () => {
  if(localStorage.getItem(CFG.SAVE_KEY)){          // returning player: Continue is the main button, New Journey is the quiet option
    $('contbtn').style.display = ''; $('contnote').style.display = '';
    $('newbtn').className = 'btn-continue';
  }
  const L = $('landing');                       // drifting cherry-blossom petals
  for(let i=0;i<22;i++){ const p = document.createElement('span'); p.className='petal';
    p.style.left = Math.random()*100+'%'; p.style.animationDuration = (7+Math.random()*7)+'s'; p.style.animationDelay = (-Math.random()*12)+'s';
    p.style.transform = 'scale('+(.6+Math.random()*.9)+')'; L.appendChild(p); }
});
