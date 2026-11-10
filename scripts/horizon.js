/* =====================================================================
   TRIBUTE — CRIMSON HORIZON: THE ADVENTURES OF SAN AND JADE (the sequel; docs/CRIMSON_HORIZON_PLAN.md)
   Opens when Tribute is complete (chapter 990). Shared chapters 0-41 (the same pages as the Crimson Tide repo, assets/horizon/cNNN.webp), read in order; the first real fight is chapter 2.
   THE CREW: 13 members, all of whom take part in battle. The Canon Five (Jade, Devon, Sky, Levi, Sally) keep their own Tribute levels and stats. The Crimson Tide side (San, Joel, Aisyah, Mezstorm, Sairen)
   start at levels set from the Canon Five's average (San and Joel level with them; the others a little behind), each with their own level from then on. Vaeren and Joelle start at LEVEL 1 and are
   UNKILLABLE AND UNTARGETABLE until they reach full strength (level HZ_FULL); their power grows with their level. Soel is a blessing cat: he never fights, he heals, restores MP and blesses the crew,
   and he cannot be killed. Jade and Sally fight from range (the Crimson Repeater and the Veilstring Bow); pregnancy places no restriction on them.
   BATTLE (same structure as the Crimson Tide battle screen): ONE enemy, the whole crew as a grid of cards, turn order through the crew, one action per turn (Attack, Skill, Defend), Auto toggle.
   Enemies scale from the crew itself and are meant to be much harder than Tribute's. All numbers are first-pass defaults.
   State: G.horizon = {read:{n:true}, lv:{id:level}, xp:{id:xp}, won:{key:true}}. The battle (HB) is not saved.
   ===================================================================== */
const HZ_FULL = 100;        // the twins count as full strength at this level (a default: tune it)
const HZ_TWIN_XP = 40000;   // XP each twin earns per won fight (a default: about 13 fights to full strength)
const HZ_CREW = ['jade','devon','sky','levi','sally','san','joel','aisyah','mezstorm','sairen','vaeren','joelle','soel'];
const HZ_CANON = ['jade','devon','sky','levi','sally'];
const HZ_TWINS = ['vaeren','joelle'];
const HZ_PEOPLE = {
  jade:{n:'Jade Gold', role:'Imperial Guard · Expedition Leader', icon:'🌙'}, devon:{n:'Devon Chadstone', role:'Prince of Dragonvale · Strategist', icon:'🐉'},
  sky:{n:'Sky Yale', role:'Physician · Healer', icon:'⚕️'}, levi:{n:'Levi Stanson', role:'Ranger · Explorer', icon:'🏹'}, sally:{n:'Sally Sun', role:'Information Specialist · Agent', icon:'🌸'},
  san:{n:'San', role:'Captain · Sorcerer', icon:'🔮'}, joel:{n:'Joel', role:'First Mate · Paladin', icon:'🛡️'}, aisyah:{n:'Aisyah', role:'Quartermaster · Shadow Walker', icon:'🌒'},
  mezstorm:{n:'Mezstorm', role:'Storm Mage', icon:'🌀'}, sairen:{n:'Sairen', role:'Former Nameless Agent · Specialist', icon:'👁️'},
  vaeren:{n:'Vaeren', role:'Tide Warden · Tank (protected child)', icon:'🌊'}, joelle:{n:'Joelle', role:'Astral Weaver · Caster (protected child)', icon:'🌟'}, soel:{n:'Soel', role:'Guardian · Blessing Cat', icon:'🐈'},
};
const HZ_PORTRAITS = ['san','joel','jade','devon','sky','levi','sally'];
const hzPic = (id, px) => HZ_PORTRAITS.includes(id) ? `<img src="assets/horizon/portraits/${id}.webp" alt="${HZ_PEOPLE[id].n}" style="width:${px}px;height:${px}px;border-radius:50%;object-fit:cover;border:2px solid var(--gold)">` : `<span style="font-size:${Math.round(px*.7)}px">${HZ_PEOPLE[id].icon}</span>`;
// stat templates for the Crimson Tide side (like Tribute's base and growth per level)
const HZ_TPL = {
  san:{hp:[78,8.4],mp:[60,4],atk:[7,.8],mag:[13,2.6],def:[9,1.1],spd:[10,.9]}, joel:{hp:[96,11.2],mp:[24,1.4],atk:[14,2],mag:[5,.8],def:[13,2],spd:[9,.8]},
  aisyah:{hp:[84,8.6],mp:[30,1.8],atk:[15,2.2],mag:[5,.6],def:[9,1.1],spd:[13,1.4]}, mezstorm:{hp:[76,8],mp:[58,3.8],atk:[6,.7],mag:[14,2.6],def:[8,1],spd:[11,1.1]},
  sairen:{hp:[82,8.4],mp:[28,1.6],atk:[15,2.1],mag:[6,.7],def:[9,1.1],spd:[14,1.4]}, vaeren:{hp:[96,11.2],mp:[40,2.4],atk:[11,1.5],mag:[6,.8],def:[13,2],spd:[9,.8]},
  joelle:{hp:[74,8],mp:[64,3.8],atk:[5,.6],mag:[12,2.4],def:[8,1],spd:[11,1.1]}, soel:{hp:[300,20],mp:[200,10],atk:[0,0],mag:[10,1],def:[10,1],spd:[12,.5]},
};
// the crew's actions. kind: phys / mag (damage, scaled by atk or mag), heal, mp, party (heal all), buff (party buff), exposed, interrupt, guard, revive
const HZ_KIT = {
  jade:{atk:'Crimson Repeater', sk:[{n:'Lunar Lash',i:'🌙',mp:30,kind:'phys',pow:2.2},{n:'Mark Weak Points',i:'🎯',mp:25,kind:'exposed'},{n:'Hold the Line',i:'🛡️',mp:35,kind:'buff',stat:'def',m:1.3,d:3}]},
  devon:{atk:'Dragon Strike',sk:[{n:'Draconic Wrath',i:'🐉',mp:35,kind:'phys',pow:2.3},{n:'Draconic Ward',i:'🛡️',mp:40,kind:'buff',stat:'def',m:1.35,d:3},{n:'Strategist\'s Chart',i:'🗺️',mp:30,kind:'buff',stat:'atk',m:1.2,d:3}]},
  sky:{atk:'Healer\'s Staff',sk:[{n:'Healing Hands',i:'💚',mp:30,kind:'heal',pow:.3},{n:'Cleansing Rain',i:'🌧️',mp:55,kind:'party',pow:.12},{n:'Resurrect',i:'✨',mp:70,kind:'revive'}]},
  levi:{atk:'Hunter\'s Bow',sk:[{n:'Pinning Volley',i:'🏹',mp:28,kind:'phys',pow:2.1},{n:'Weak Point Shot',i:'🎯',mp:26,kind:'exposed'},{n:'Rapid Shot',i:'⚡',mp:40,kind:'phys',pow:2.8}]},
  sally:{atk:'Veilstring Bow',sk:[{n:'Disrupting Shot',i:'🕸️',mp:30,kind:'interrupt',pow:1.4},{n:'Rumour Network',i:'📡',mp:32,kind:'exposed'},{n:'Veil of Words',i:'🌸',mp:38,kind:'buff',stat:'atk',m:1.2,d:3}]},
  // the Crimson Tide side uses the spell and skill names from the Crimson Tide repo's class kits (first-pass numbers)
  san:{atk:'Magic Missile',sk:[{n:'Chromatic Orb',i:'⚡',mp:35,kind:'interrupt',pow:1.8},{n:'Arcane Ward',i:'🛡️',mp:45,kind:'buff',stat:'def',m:1.35,d:3},{n:'Aethon\'s Judgment',i:'⚡',mp:70,kind:'mag',pow:3.2},{n:'Eye of the Storm',i:'⏳',mp:55,kind:'buff',stat:'atk',m:1.25,d:3}]},
  joel:{atk:'Paladin Strike',sk:[{n:'Shield Wall',i:'⚔️',mp:20,kind:'taunt'},{n:'Aegis',i:'🛡️',mp:20,kind:'guard'},{n:'Holy Charge',i:'🔆',mp:25,kind:'phys',pow:2.2}]},
  aisyah:{atk:'Shadow Cut',sk:[{n:'Coup de Grace',i:'💀',mp:28,kind:'phys',pow:2.6},{n:'Shadow Mark',i:'🌒',mp:24,kind:'exposed'},{n:'Quartermaster\'s Supply',i:'📦',mp:20,kind:'mp'}]},
  mezstorm:{atk:'Tempest Fury',sk:[{n:'Thunderclap',i:'🔊',mp:34,kind:'interrupt',pow:1.5},{n:'Chain Lightning',i:'⚡',mp:55,kind:'mag',pow:2.8},{n:'Gale Guard',i:'🌬️',mp:38,kind:'buff',stat:'def',m:1.3,d:3},{n:'Storm Share',i:'🌩️',mp:0,kind:'mp'}]},
  sairen:{atk:'Silent Cut',sk:[{n:'Weakness Exposed',i:'🗡️',mp:24,kind:'exposed'},{n:'Nameless Execution',i:'🥷',mp:32,kind:'phys',pow:2.6},{n:'Vanishing Step',i:'💨',mp:26,kind:'guard'}]},
  vaeren:{atk:'Warden Mace',sk:[{n:'Tidal Bulwark',i:'🌊',mp:30,kind:'buff',stat:'def',m:1.4,d:3},{n:'Guardian\'s Current',i:'🛡️',mp:0,kind:'guard'},{n:'Undertow Challenge',i:'🌀',mp:0,kind:'taunt',pow:1.5}]},
  joelle:{atk:'Moon Spark',sk:[{n:'Astral Threads',i:'🧵',mp:16,kind:'exposed',pow:1.2},{n:'Constellation Bloom',i:'🌌',mp:38,kind:'mag',pow:2.8},{n:'Celestial Veil',i:'🔮',mp:0,kind:'guard'}]},
  soel:{atk:null,sk:[{n:'Blessing of Renewal',i:'💚',mp:0,kind:'party',pow:.12},{n:'Blessing of Tides',i:'🌊',mp:0,kind:'mpall'},{n:'Guardian Blessing',i:'🛡️',mp:0,kind:'buff',stat:'def',m:1.35,d:3},{n:'Fortune Blessing',i:'🍀',mp:0,kind:'buff',stat:'atk',m:1.3,d:3}]},
};
const HZ_BOSSES = {
  leviathan:{n:'The Stormborn Leviathan', icon:'🐉', mult:1, moves:[{n:'Tidal Crash',pow:1.5,t:'one'},{n:'Lightning Maw',pow:2,t:'one'},{n:'Violet Pulse',pow:.7,t:'all'}], note:'A colossal sea-born predator, awakened by a power unknown.'},
};

/* ---------- state and levels ---------- */
const hzOpen = () => !!(G && G.ch >= 990);
const hz = () => { if(!G.horizon) G.horizon = {read:{}, lv:{}, xp:{}, won:{}, obj:{}}; ['read','lv','xp','won','obj'].forEach(k => { if(!G.horizon[k]) G.horizon[k] = {}; }); return G.horizon; };   // G.hz belongs to an older system (horizons.js)
const hzAvgCanon = () => Math.max(1, Math.round(HZ_CANON.reduce((a, id) => a + (G.units[id] ? G.units[id].lv : 1), 0) / HZ_CANON.length));
function hzLevel(id){
  if(id==='soel') return 0;
  if(HZ_CANON.includes(id)) return G.units[id].lv;
  const h = hz(); if(h.lv[id]) return h.lv[id];
  const a = hzAvgCanon(), start = {san:1, joel:1, aisyah:.97, mezstorm:.97, sairen:.95, vaeren:0, joelle:0}[id];
  return h.lv[id] = start ? Math.max(1, Math.round(a * start)) : 1;   // the twins start at level 1
}
const hzProtected = id => HZ_TWINS.includes(id) && hzLevel(id) < HZ_FULL;
function hzStats(id){
  const A = hzAvgCanon();
  if(HZ_CANON.includes(id)) return statsOf(id);
  const t = HZ_TPL[id], lv = HZ_TWINS.includes(id) ? A : (id==='soel' ? A : hzLevel(id)), out = {};
  Object.keys(t).forEach(k => { out[k] = Math.round(t[k][0] + t[k][1]*(lv-1)); });
  if(HZ_TWINS.includes(id)){ const m = Math.max(.25, Math.min(1, hzLevel(id)/HZ_FULL)); Object.keys(out).forEach(k => { out[k] = Math.max(1, Math.round(out[k]*m)); }); }   // power grows with their own level
  return out;
}
function hzGrantXp(amount, ids){
  const h = hz(), msgs = [];
  const canon = ids.filter(i => HZ_CANON.includes(i));
  if(canon.length) gainXp(amount, canon).forEach(m => msgs.push(m));
  ids.filter(i => !HZ_CANON.includes(i) && i!=='soel').forEach(id => {
    const twin = HZ_TWINS.includes(id), before = hzLevel(id);
    h.xp[id] = (h.xp[id]||0) + (twin ? Math.round(HZ_TWIN_XP * 1.25) : amount)   /* Guardian's Bond: +25% for the twins */;
    while(h.xp[id] >= xpToNext(h.lv[id], id)){ h.xp[id] -= xpToNext(h.lv[id], id); h.lv[id]++; }
    if(h.lv[id] > before) msgs.push(HZ_PEOPLE[id].n+' reached Lv'+h.lv[id]+(twin && before < HZ_FULL && h.lv[id] >= HZ_FULL ? ': full strength! The protection lifts.' : '!'));
  });
  return msgs;
}

/* ---------- the battle ---------- */
let HB = null;
const hzRnd = (a, b) => a + Math.random()*(b-a);
const hzLog = t => { HB.log.push(t); if(HB.log.length > 60) HB.log.shift(); };
function hzUnit(id){
  const s = hzStats(id);
  return {id, name:HZ_PEOPLE[id].n, hp:s.hp, mhp:s.hp, mp:s.mp, mmp:s.mp, atk:s.atk, mag:s.mag, def:s.def, spd:s.spd, bf:{}, guard:false, dead:false, acted:false, lv:hzLevel(id)};
}
const hzEff = (u, st) => Math.round(u[st] * ((u.bf[st] && u.bf[st].d > 0) ? u.bf[st].m : 1));
const hzAlive = () => HB.crew.filter(u => !u.dead);
const hzTargetable = () => HB.crew.filter(u => !u.dead && !hzProtected(u.id));
function hzStart(key){
  const A = hzAvgCanon(), B = HZ_BOSSES[key], crew = HZ_CREW.map(hzUnit);
  const fighters = crew.filter(u => u.id !== 'soel');
  const potential = fighters.reduce((a, u) => a + Math.max(u.atk, u.mag) * 0.6 * 1.5, 0);   // what the crew can do in one round
  const mhp = Math.round(potential * 38 * B.mult);                                             // about 26 rounds of full effort: the sequel's bosses are much harder
  const avgHp = crew.reduce((a, u) => a + u.mhp, 0) / crew.length, avgDef = crew.reduce((a, u) => a + u.def, 0) / crew.length;
  HB = {key, boss:{n:B.n, icon:B.icon, hp:mhp, mhp, atk:Math.round(avgHp*.28*B.mult), def:avgDef, ph:0, expo:0, charging:false, slow:0, mult:1, moves:B.moves}, crew, round:1, turn:0, log:[], over:null, auto:false, menu:null, lv:A};
  hzLog('⚔️ '+B.n+' rises from the sea. '+B.note);
  hzLog('Soel purrs: the crew is blessed and ready. (The twins are protected and cannot be hit.)');
  hzLog('💞 Guardian\'s Bond: Soel watches over Vaeren and Joelle (they recover 10% HP and MP every round and learn faster).');
}
function hzDealt(u, pow, stat){
  const crit = Math.random() < .1 ? 1.5 : 1, expo = HB.boss.expo > 0 ? 1.3 : 1;
  if(u.id==='joelle' && HB.reso && pow > 1){ pow *= 1.5; HB.reso = false; }   // Twin Resonance
  const d = Math.max(1, Math.round(hzEff(u, stat) * 0.6 * pow * hzRnd(.9, 1.1) * crit * expo));
  HB.boss.hp = Math.max(0, HB.boss.hp - d);
  return d + (crit > 1 ? ' (critical!)' : '');
}
function hzHeal(t, amt){ if(t.dead) return; t.hp = Math.min(t.mhp, t.hp + Math.max(1, Math.round(amt))); }
function hzAct(u, act){   // act: null = attack, or a skill object, or 'defend'
  const B = HB.boss, K = HZ_KIT[u.id], nm = u.name;
  if(act === 'defend'){ u.guard = true; hzLog('🛡️ '+nm+' guards.'); return true; }
  if(!act){
    if(u.id === 'soel') return false;
    const st = ['san','mezstorm','joelle'].includes(u.id) ? 'mag' : 'atk';
    hzLog('⚔️ '+nm+' uses '+K.atk+': '+hzDealt(u, 1, st)+' damage.'); return true;
  }
  if(u.mp < act.mp) return false;
  u.mp -= act.mp;
  const mag = ['san','mezstorm','joelle'].includes(u.id);
  const alive = hzAlive(), low = alive.slice().sort((a, b) => a.hp/a.mhp - b.hp/b.mhp)[0];
  if(act.kind === 'phys' || act.kind === 'mag') hzLog(act.i+' '+nm+' uses '+act.n+': '+hzDealt(u, act.pow, act.kind==='mag' ? 'mag' : (mag ? 'mag' : 'atk'))+' damage.');
  else if(act.kind === 'taunt' && hzProtected(u.id)){ if(act.pow) hzLog(act.i+' '+nm+' uses '+act.n+': '+hzDealt(u, act.pow, 'atk')+' damage.'); hzLog('🐈 Soel steps in front of '+nm+': the children do not draw attacks while they are protected.'); }
  else if(act.kind === 'taunt'){ HB.taunt = {id:u.id, d:2}; u.guard = true; if(act.pow) hzLog(act.i+' '+nm+' uses '+act.n+': '+hzDealt(u, act.pow, 'atk')+' damage.'); hzLog(act.i+' '+nm+' draws the leviathan\'s attention (it targets '+nm+' for 2 rounds).'); }
  else if(act.kind === 'exposed'){ if(act.pow) hzLog(act.i+' '+nm+' uses '+act.n+': '+hzDealt(u, act.pow, mag ? 'mag' : 'atk')+' damage.'); B.expo = 3; hzLog(act.i+' '+nm+' uses '+act.n+': the leviathan\'s weak points are exposed (+30% damage for 3 rounds).'); }
  else if(act.kind === 'interrupt'){
    hzLog(act.i+' '+nm+' uses '+act.n+': '+hzDealt(u, act.pow, mag ? 'mag' : 'atk')+' damage.');
    if(B.charging){ B.charging = false; hzLog('✨ The violet surge is broken before it can build!'); }
    B.slow = 1;
  }
  else if(act.kind === 'heal'){ hzHeal(low, low.mhp * (act.pow + .1)); hzLog(act.i+' '+nm+' uses '+act.n+': '+low.name+' recovers.'); }
  else if(act.kind === 'party'){ alive.forEach(t => hzHeal(t, t.mhp * act.pow)); hzLog(act.i+' '+nm+': '+(u.id==='soel' ? 'a warm light washes over the crew (HP restored).' : 'the whole crew recovers.')); }
  else if(act.kind === 'mp' || act.kind === 'mpall'){ alive.forEach(t => { t.mp = Math.min(t.mmp, t.mp + Math.round(t.mmp * (act.kind==='mp' ? .12 : .25))); }); hzLog(act.i+' '+nm+': the crew\'s energy is restored.'); }
  else if(act.kind === 'buff'){ alive.forEach(t => { t.bf[act.stat] = {m:act.m, d:act.d}; }); hzLog(act.i+' '+nm+' uses '+act.n+': the crew\'s '+(act.stat==='def'?'defence':'power')+' rises for '+act.d+' rounds.'); }
  else if(act.kind === 'guard'){ u.guard = true; HB.shield = u.id; if(u.id==='vaeren' && HB.crew.some(t => t.id==='joelle' && !t.dead)){ HB.reso = true; hzLog('💞 Twin Resonance: Vaeren shields his sister, and Joelle\'s next spell is stronger.'); } hzLog(act.i+' '+nm+' uses '+act.n+': the next hit on the crew is softened.'); }
  else if(act.kind === 'revive'){ const f = HB.crew.find(t => t.dead); if(!f){ u.mp += act.mp; return false; } f.dead = false; f.hp = Math.round(f.mhp*.3); hzLog(act.i+' '+nm+' uses '+act.n+': '+f.name+' rises again.'); }
  return true;
}
function hzBossTurn(){
  const B = HB.boss, n = hzTargetable();
  if(!n.length) return;
  if(B.slow > 0){ B.slow--; hzLog('🌀 The leviathan is slowed and loses its footing: it does not attack this round.'); return; }
  const hit = (t, pow) => {
    let d = pow * B.atk * 1.4 * (B.def / (B.def + t.def)) * hzRnd(.9, 1.1) * B.mult;
    if(t.guard) d *= .5;
    if(t.bf.def && t.bf.def.d > 0) d /= t.bf.def.m;
    if(HB.shield){ d *= .7; }
    d = Math.max(1, Math.round(d));
    t.hp = Math.max(HZ_PEOPLE[t.id] && ['soel'].includes(t.id) ? 1 : 0, t.hp - d);
    if(t.hp <= 0){ t.dead = true; hzLog('💀 '+t.name+' falls!'); }
    return d;
  };
  if(B.charging){
    B.charging = false;
    hzLog('🌩️ The violet surge breaks over the ship!');
    n.forEach(t => hit(t, 1.7)); hzLog('  Everyone is struck.');
    return;
  }
  if(B.ph >= 1 && HB.round % 3 === 0){ B.charging = true; hzLog('⚠️ The leviathan gathers a violet surge: interrupt it (Counter-Tide, Disrupting Shot, Static Binding) or brace!'); return; }
  const mv = B.moves[Math.floor(Math.random()*B.moves.length)];
  if(mv.t === 'all'){ n.forEach(t => hit(t, mv.pow)); hzLog('🌊 '+B.n+' uses '+mv.n+' on the whole crew.'); }
  else { const tt = HB.taunt && HB.taunt.d > 0 ? n.find(x => x.id === HB.taunt.id) : null; const t = tt || n[Math.floor(Math.random()*n.length)]; hzLog('💥 '+B.n+' uses '+mv.n+' on '+t.name+': '+hit(t, mv.pow)+' damage.'); }
}
function hzEndRound(){
  const B = HB.boss;
  HB.crew.forEach(u => { u.acted = false; u.guard = false; Object.keys(u.bf).forEach(k => { if(u.bf[k].d > 0) u.bf[k].d--; }); });
  HB.shield = null; if(B.expo > 0) B.expo--; if(HB.taunt){ HB.taunt.d--; }
  HB.crew.filter(t => HZ_TWINS.includes(t.id) && !t.dead).forEach(t => { t.hp = Math.min(t.mhp, t.hp + Math.round(t.mhp*.1)); t.mp = Math.min(t.mmp, t.mp + Math.round(t.mmp*.1)); });   // Guardian's Bond: Soel tends the children every round
  const pct = B.hp / B.mhp;
  if(B.ph === 0 && pct <= .66){ B.ph = 1; B.mult = 1.1; hzLog('⚡ Phase two: the leviathan thrashes. Violet surges will build every third round.'); }
  else if(B.ph === 1 && pct <= .33){ B.ph = 2; B.mult = 1.25; hzLog('🌑 Phase three: the leviathan is wounded and furious.'); }
  HB.round++; HB.turn = 0;
}
function hzAdvance(){   // after a crew member acts: next able member, or the enemy
  if(HB.boss.hp <= 0) return hzWin();
  const able = HB.crew.filter(u => !u.dead && !u.acted);
  if(!able.length){
    for(let k = 0; k < 2 + (HB.boss.ph >= 2 ? 1 : 0); k++) hzBossTurn();   // the sequel's bosses act more than once a round
    if(!hzTargetable().length) return hzLose();   // the twins are protected and Soel cannot fall, so the fight is lost when nobody else is standing
    hzEndRound();
  }
}
function hzCur(){ return HB.crew.find(u => !u.dead && !u.acted); }
function hzDo(kind, idx){
  if(!HB || HB.over) return;
  const u = hzCur(); if(!u) return;
  let ok = false;
  if(kind === 'atk') ok = hzAct(u, null);
  else if(kind === 'def') ok = hzAct(u, 'defend');
  else if(kind === 'sk') ok = hzAct(u, HZ_KIT[u.id].sk[idx]);
  if(!ok){ toast('Cannot do that'); return; }
  u.acted = true; HB.menu = null; hzAdvance(); render();
}
function hzAuto(u){   // the crew's own choices
  const K = HZ_KIT[u.id], sk = K.sk, B = HB.boss, low = hzAlive().slice().sort((a, b) => a.hp/a.mhp - b.hp/b.mhp)[0];
  const can = s => s && u.mp >= s.mp, by = k => sk.find(s => s.kind === k);
  if(u.id === 'soel'){
    if(hzAlive().some(t => t.hp/t.mhp < .6)) return hzAct(u, by('party'));
    if(hzAlive().some(t => t.mp/t.mmp < .3)) return hzAct(u, by('mpall'));
    const bl = sk.filter(s => s.kind === 'buff'), turn = HB.round % 2; return hzAct(u, bl[turn]);
  }
  if(B.charging){ const i = sk.find(s => s.kind === 'interrupt' && can(s)); if(i) return hzAct(u, i); }
  if(by('revive') && can(by('revive')) && HB.crew.some(t => t.dead)) return hzAct(u, by('revive'));
  if(low && low.hp/low.mhp < .5 && by('heal') && can(by('heal'))) return hzAct(u, by('heal'));
  if(low && hzAlive().filter(t => t.hp/t.mhp < .7).length >= 3 && by('party') && can(by('party'))) return hzAct(u, by('party'));
  if(by('taunt') && can(by('taunt')) && !(HB.taunt && HB.taunt.d > 0) && HB.round % 2 === 1) return hzAct(u, by('taunt'));
  if(B.expo <= 0 && by('exposed') && can(by('exposed'))) return hzAct(u, by('exposed'));
  const bf = by('buff'); if(bf && can(bf) && !(HB.crew[0].bf[bf.stat] && HB.crew[0].bf[bf.stat].d > 0) && HB.round % 3 === 1) return hzAct(u, bf);
  const dmg = sk.filter(s => (s.kind === 'phys' || s.kind === 'mag') && can(s)).sort((a, b) => b.pow - a.pow)[0];
  if(dmg && u.mp >= dmg.mp + 20) return hzAct(u, dmg);
  return hzAct(u, null) || hzAct(u, 'defend');
}
function hzAutoStep(){
  if(!HB || HB.over) return;
  const u = hzCur(); if(!u) return;
  hzAuto(u); u.acted = true; hzAdvance();
}
function hzWin(){
  if(HB.over) return; HB.over = 'win';
  const ids = HB.crew.filter(u => !u.dead || true).map(u => u.id).filter(i => i !== 'soel');
  const xp = Math.round(xpToNext(HB.lv, 'jade') * .6);
  hz().won[HB.key] = true;
  const gold = 200000; G.gold += gold;
  hzLog('🏆 The '+HB.boss.n+' falls! +'+xp.toLocaleString()+' XP · +'+gold.toLocaleString()+'g');
  hzGrantXp(xp, ids).forEach(m => hzLog('✦ '+m));
  save();
}
function hzLose(){ if(HB.over) return; HB.over = 'lose'; hzLog('The crew is beaten back. Regroup and try again.'); }
function hzLeaveBattle(){ const won = HB && HB.over==='win'; HB = null; render(); if(won) toast('Victory'); }
function hzBattle(key){ hzStart(key); render(); }
function hzMenu(m){ HB.menu = HB.menu === m ? null : m; render(); }
function hzToggleAuto(){ HB.auto = !HB.auto; render(); }
let hzTimer = null;
function hzSchedule(){ clearTimeout(hzTimer); if(HB && HB.auto && !HB.over && tab==='horizon'){ hzTimer = setTimeout(() => { if(HB && HB.auto && !HB.over){ hzAutoStep(); render(); } }, 650); } }


/* ---------- chapter objectives (Tribute plays the shared chapters as party quests; docs/CRIMSON_HORIZON_PLAN.md) ----------
   Each is a short quest: three decisions, each with one right answer (a wrong one gives a hint and costs nothing). Finishing it pays the crew XP and gold once and unlocks the next chapter. */
const HZ_OBJ = {
  8:{t:'Coordinate the rescue at the reef', intro:'The second surge is building and two fishing boats are stranded on the wrong side of the reef. Get them through the passage.',
    steps:[
      {q:'The current must be held steady long enough for the boats to cross. Who steadies it?', opts:[['San, with her sorcery','ok','San steadies the current, drawing the surge into a slow, readable pattern.'],['Devon, with a chart','no','A chart cannot hold water still. The current needs magic.'],['Levi, from the rigging','no','He can mark the tide, not hold it.']]},
      {q:'The crossing needs someone to call the timing between surges. Who coordinates?', opts:[['Sky, from the deck','no','Sky is needed for the injured. The crossing needs a commander.'],['Jade, as Expedition Leader','ok','Jade calls the crossing, boat by boat, in the gaps between surges.'],['Soel, from the bow','no','Soel can bless the crew, not give orders to a fleet.']]},
      {q:'The stranded boats cannot reach the ship by themselves. Who gets a towline across?', opts:[['Sally, with the Veilstring Bow','ok','Sally lands a line on the first boat from across the water; the first makes it through.'],['Joel, rowing out','no','Joel is needed at the helm for what comes next.'],['Aisyah, from the hold','no','Aisyah has the supplies ready, but the line must fly across the reef.']]}],
    done:'The first boat makes it through. The second loses steerage as the gate starts to close: Joel will have to bring the ship in.'},
  26:{t:'Find the threatened gate', intro:'The next pulse is on its way. Renn has sent his readings from Fair Tide. Work out where it will land.',
    steps:[
      {q:'Renn\'s transmitted readings give the pulse\'s timing. What do you compare them against?', opts:[['Devon\'s chart of the outer current','ok','The pulse rides the outer current: the chart gives a path to match the timing against.'],['The harbour tide tables','no','Those cover the harbour, not the open sea the pulse travels.'],['Last night\'s weather log','no','Weather does not move a pulse.']]},
      {q:'The readings and the chart line up along one path. Who traces it?', opts:[['Devon and Renn together','ok','Devon and Renn trace the pulse\'s path along the outer current, mile by mile.'],['Levi alone, by eye','no','A path this long cannot be read from the rigging.'],['Mezstorm, with a storm-call','no','He could stir the current, but not read it.']]},
      {q:'Where does the path end?', opts:[['The East Gate','ok','The pulse will reach the East Gate, where ships are already using the same fallback route the crew took.'],['The West Gate','no','The path bends the other way.'],['Fair Tide harbour','no','It passes the harbour, but does not stop there.']]}],
    done:'The East Gate is threatened. The crew must clear it before the pulse arrives.'},
  39:{t:'Scout the exposed shoal', intro:'Low water has exposed a shoal near the grounded ships. Fresh bootprints cross it, and a lantern is missing.',
    steps:[
      {q:'Who reads the fresh bootprints across the mud?', opts:[['Levi, the ranger','ok','Levi follows the prints across the shoal: three people, one carrying weight.'],['Joy, from the ship','no','Joy is not out here: use the people who are.'],['Sky, from the shore','no','Sky is tending the grounded crews.']]},
      {q:'Someone has to check the skiff the prints lead to. Who goes in close, quietly?', opts:[['Sairen, the former Nameless agent','ok','Sairen slips along the shoal to the skiff without a sound.'],['Devon, in full armour','no','Armour on wet mud is not quiet.'],['Aisyah, with the supply cart','no','A cart would be heard across the flats.']]},
      {q:'What do you inspect on the skiff?', opts:[['The mounted lantern and what is fitted beneath it','ok','The missing lantern is mounted on the skiff, with a West Gate coupling fitted beneath it.'],['The skiff\'s sail','no','The sail is ordinary canvas.'],['The cargo crates','no','Those are for later: the lantern is the lead.']]}],
    done:'The missing lantern is found: a West Gate coupling is fitted beneath it. Someone is moving the light on purpose.'},
};
let HZ_OBJ_OPEN = null, HZ_OBJ_MSG = '';
function hzObjOpen(n){ HZ_OBJ_OPEN = n; HZ_OBJ_MSG = ''; const h = hz(); if(!h.obj[n]) h.obj[n] = {step:0, done:false}; render(); }
function hzObjPick(n, i){
  const o = HZ_OBJ[n], st = hz().obj[n], pick = o.steps[st.step].opts[i];
  if(pick[1] !== 'ok'){ HZ_OBJ_MSG = '❌ '+pick[2]; render(); return; }
  HZ_OBJ_MSG = '✅ '+pick[2]; st.step++;
  if(st.step >= o.steps.length){
    st.done = true; const xp = Math.round(xpToNext(hzAvgCanon(), 'jade') * .3);
    G.gold += 80000; const m = hzGrantXp(xp, HZ_CREW.filter(c => c !== 'soel'));
    HZ_OBJ_MSG += ' '+o.done+' (+'+xp.toLocaleString()+' XP · +80,000g)'+(m.length ? ' · '+m.slice(-2).join(' · ') : '');
  }
  save(); render();
}
function rObjective(n){
  const o = HZ_OBJ[n], st = hz().obj[n], c = hzChapter(n);
  const body = st.done ? `<div class="sm">${HZ_OBJ_MSG || o.done}</div>` : `<div class="sm">${o.steps[st.step].q}</div>` + o.steps[st.step].opts.map((p, i) => `<div style="margin:4px 0"><button onclick="hzObjPick(${n},${i})">${p[0]}</button></div>`).join('');
  return `<div class="panel"><b>🎯 Chapter ${n}: ${c.t}: ${o.t}</b> <span class="sm">${st.done ? '✅ done' : 'step '+(st.step+1)+' / '+o.steps.length}</span><div class="sm">${o.intro}</div>${HZ_OBJ_MSG && !st.done ? `<div class="sm" style="margin:6px 0">${HZ_OBJ_MSG}</div>` : ''}${body}<div style="margin-top:6px"><button onclick="HZ_OBJ_OPEN=null;HZ_OBJ_MSG='';render()">Back</button></div></div>`;
}

/* ---------- screens ---------- */
const hzChapter = n => HZ_CHAPTERS.find(c => c.n === n);
const hzUnlocked = n => n === 0 || (!!hz().read[n-1] && (!HZ_BATTLE_AT[n-1] || !!hz().won[HZ_BATTLE_AT[n-1]]) && (!HZ_OBJ[n-1] || !!(hz().obj[n-1] && hz().obj[n-1].done)));
const HZ_BATTLE_AT = {2:'leviathan'};   // the chapter whose objective is a real fight
function hzRead(n){
  const c = hzChapter(n); if(!c) return;
  const a = HZ_ARCS.find(x => x.from === n);
  const el = $('arcpop'); if(!el) return;
  const src = `assets/horizon/c${String(n).padStart(3,'0')}.webp`, page = `<img src="${src}" alt="Chapter ${n}: ${c.t}" onclick="zoomOpen(this.src)" style="cursor:zoom-in"><button onclick="zoomOpen('${src}')">🔍 Zoom the page</button>`;
  el.innerHTML = `<div class="arcbox">${a ? `<img src="assets/horizon/arc0${a.n}.webp" alt="${a.t}" style="max-height:calc(50vh - 40px)"><div class="sm" style="color:var(--gold-light)">Crimson Horizon · Arc ${a.n}: ${a.t}</div>` : ''}${page}<button class="pri" onclick="hzReadDone(${n})">Continue</button></div>`;
  el.classList.add('on'); el.scrollTop = 0;
}
function hzReadDone(n){ hz().read[n] = true; const el = $('arcpop'); if(el){ el.classList.remove('on'); el.innerHTML = ''; } save(); render(); }
function hzCrewCard(id){
  const lv = hzLevel(id), s = hzStats(id), p = hzProtected(id);
  const note = id==='soel' ? 'Blessing cat: heals, restores MP and blesses the crew. Does not fight. Cannot be killed. 💞 Guardian\'s Bond with Vaeren and Joelle.' : HZ_TWINS.includes(id) ? (p ? '🔒 Protected: cannot be hit until Lv '+HZ_FULL+'. Power '+Math.round(Math.max(.25, Math.min(1, lv/HZ_FULL))*100)+'%.' : '✅ Full strength.') : (id==='jade'||id==='sally') ? 'Fights from range. Pregnancy places no restriction.' : '';
  const bond = HZ_TWINS.includes(id) ? '<div class="sm">💞 Guardian\'s Bond (Soel): +10% HP and MP each round, +25% XP. 💞 Twin Resonance: when Vaeren shields, Joelle\'s next spell is 50% stronger.</div>' : '';
  return `<div class="card" style="align-items:flex-start">${hzPic(id, 52)}<div class="fl"><b>${HZ_PEOPLE[id].n}</b> <span class="sm">${id==='soel' ? '' : 'Lv '+lv.toLocaleString()}</span><div class="sm">${HZ_PEOPLE[id].role}</div><div class="sm">HP ${s.hp.toLocaleString()} · ${id==='soel' ? 'MP '+s.mp.toLocaleString() : 'ATK '+s.atk.toLocaleString()+' · MAG '+s.mag.toLocaleString()+' · DEF '+s.def.toLocaleString()}</div>${note ? `<div class="sm">${note}</div>` : ''}${bond}</div></div>`;
}
function rBattleHz(){
  const B = HB.boss, cur = hzCur(), pct = Math.max(0, B.hp / B.mhp * 100);
  const cards = HB.crew.map(u => { const p = hzProtected(u.id), hp = Math.max(0, u.hp/u.mhp*100), mp = u.mmp ? u.mp/u.mmp*100 : 0;
    return `<div class="hzcard${cur===u?' act':''}${u.dead?' dead':''}">${hzPic(u.id, 40)}<div class="hzn">${u.name}</div><div class="sm">${u.id==='soel'?'Blessing':'Lv '+u.lv.toLocaleString()}${p?' 🔒':''}</div><div class="hzbar"><i style="width:${hp}%;background:${hp>50?'#4caf50':hp>25?'#f39c12':'#c0392b'}"></i></div><div class="hzbar"><i style="width:${mp}%;background:#4a7fd4"></i></div><div class="sm">${u.hp.toLocaleString()}</div>${u.guard?'🛡️':''}${(u.bf.def&&u.bf.def.d>0)?'⬆️':''}</div>`; }).join('');
  let act = '';
  if(HB.over){ act = `<div class="panel"><b>${HB.over==='win'?'🏆 Victory':'💀 Defeat'}</b></div><button class="pri" onclick="hzLeaveBattle()">${HB.over==='win'?'Continue':'Leave'}</button>`; }
  else if(cur){
    const K = HZ_KIT[cur.id];
    if(HB.menu === 'sk'){ act = `<div class="sm">${cur.name}'s skills (MP ${cur.mp.toLocaleString()}):</div><div class="row">${K.sk.map((s, i) => `<button ${cur.mp<s.mp?'disabled':''} onclick="hzDo('sk',${i})">${s.i} ${s.n}${s.mp?' · '+s.mp:''}</button>`).join('')}</div>`; }
    else act = `<div class="sm">${cur.name}'s turn</div><div class="row">${K.atk ? `<button class="pri" onclick="hzDo('atk')">⚔️ ${K.atk}</button>` : ''}<button onclick="hzMenu('sk')">${cur.id==='soel'?'🐈 Bless':'✨ Skill'}</button>${cur.id==='soel'?'':`<button onclick="hzDo('def')">🛡️ Defend</button>`}<button onclick="hzToggleAuto()">🤖 Auto: ${HB.auto?'ON':'OFF'}</button></div>`;
  }
  return `<h2>⚔️ ${B.n}</h2><div class="panel"><div class="sm">${B.icon} Round ${HB.round} · ${B.hp.toLocaleString()} / ${B.mhp.toLocaleString()} HP${B.expo>0?' · 🎯 exposed':''}${B.charging?' · ⚠️ surge building!':''}${B.ph?' · phase '+(B.ph+1):''}</div><div class="hzbar big"><i style="width:${pct}%;background:#c0392b"></i></div></div><div class="hzgrid">${cards}</div><div class="panel">${act}</div><div class="panel hzlog">${HB.log.slice(-14).map(l => `<div class="sm">${l}</div>`).join('')}</div>`;
}
function rHorizon(){
  if(!hzOpen()) return '<h2>🌅 Crimson Horizon</h2><div class="sm">Opens when Tribute is complete.</div>';
  if(HB){ setTimeout(hzSchedule, 0); return rBattleHz(); }
  if(HZ_OBJ_OPEN !== null) return '<h2>🌅 Crimson Horizon</h2>'+rObjective(HZ_OBJ_OPEN);
  const h = hz(); hzAvgCanon();
  const next = HZ_CHAPTERS.find(c => !h.read[c.n]);
  const arcs = HZ_ARCS.map(a => `<h4>Arc ${a.n}: ${a.t}</h4>` + HZ_CHAPTERS.filter(c => c.arc === a.n).map(c => {
    const ok = hzUnlocked(c.n), done = !!h.read[c.n], fight = HZ_BATTLE_AT[c.n], needFight = fight && done && !h.won[fight];
    return `<div class="card ${ok?'':'lock'}"><span class="big">${done?'✅':ok?'📖':'🔒'}</span><div class="fl"><b>${c.n===0?'Prologue':c.n+'.'} ${c.t}</b><div class="sm">${c.s}</div></div>${ok?`<button class="${done?'':'pri'}" onclick="hzRead(${c.n})">${done?'Read again':'Read'}</button>`:''}${fight && done ? `<button class="pri" onclick="hzBattle('${fight}')">${h.won[fight]?'Fight again':'⚔️ Fight'}</button>` : ''}${HZ_OBJ[c.n] && done ? `<button class="pri" onclick="hzObjOpen(${c.n})">${h.obj[c.n]&&h.obj[c.n].done?'🎯 Done':'🎯 Objective'}</button>` : ''}</div>`; }).join('')).join('');
  return `<h2>🌅 Crimson Horizon</h2><div class="sm">The Adventures of San and Jade · one crew, two worlds.</div><img src="assets/horizon/roster.webp" alt="The unified crew" style="width:100%;border-radius:10px;margin:8px 0"><div class="panel"><b>The crew (13)</b><div class="sm">All of them fight. Every member has their own level. The twins are protected until Lv ${HZ_FULL}; Soel blesses and cannot be killed.</div></div>${HZ_CREW.map(hzCrewCard).join('')}<h3>Chapters</h3>${next ? `<div class="sm">Next: ${next.n===0?'Prologue':'Chapter '+next.n}</div>` : '<div class="sm">All available chapters read.</div>'}${arcs}`;
}
