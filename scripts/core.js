/* =====================================================================
   TRIBUTE — CORE: state, save, progression (levels, bond, evolution)
   ===================================================================== */
const CFG = { SAVE_KEY:'tribute_rpg_v3', LEVEL_CAP:100, START_LEVEL:1 };

// WHO JOINS WHEN (chapter number at which the hero is recruited). PROVISIONAL — correct these.
// Permanent joins. Chad and Sky both accept the mission in ch4 (Chad was hired in ch3, Sky first meets Jade in ch4). Sally 28 and Levi 30 match the comic's chapter titles. Devon open.
const JOIN_CH = { jade:0, chad:4, sky:4, sally:29, levi:30 };   // sally: introduced ch28, recruited ch28/29 per the author (29 provisional); levi leaves temporarily later (chapter TBD); devon open   // ch4 "We are in": Chad (hired in ch3) and Sky accept the mission together
// Guest (temporary) party members. (None yet: the ch4 "Sally guest" came from the discarded story-file list. Per the comic Sally appears in ch28.)
const GUEST_CH = {};
// Chapter at which a hero's profile becomes visible even before they join ("Chad profile / Sky profile" unlock in ch1).
const INTRO_CH = { chad:1, sky:1, sally:28 };
// Bond changes shown by the comic's banners (bond points with Jade; level thresholds in BOND_LEVELS). Applied when the chapter completes.
const CH_BOND = { 24:{sky:20}, 25:{chad:20}, 27:{chad:-20}, 29:{sky:20}, 31:{chad:-40}, 32:{levi:20}, 33:{levi:20, chad:-20}, 34:{levi:20, chad:-10} };   // banners: ch31 Jade+Chad -2, ch32 Jade+Levi +1, ch33 Jade+Levi +1 / Jade+Chad -1 (Sky+Levi and Chad+Sally banners not modelled)
const profileKnown = id => isRecruited(id) || (INTRO_CH[id]!==undefined && G.ch >= INTRO_CH[id]);
// Story flags set when a chapter is completed (e.g. Levi's crossbow goes to Jade in ch30).
const CH_FLAGS = { 0:['greyson_gift'], 30:['crossbow'] };   // greyson_arms: dagger+flail unseal at a LATER major battle (chapter not decided yet; add it here)
// Items handed over when a chapter completes. Greyson gives Jade a dagger and flail in the Prologue; she may not use them until the major battle (chapter TBD, flag greyson_arms).
const CH_ITEMS = { 0:[{id:'greyson_dagger',qty:1},{id:'greyson_flail',qty:1}] };   // (the communication bracelet comes from the Greyson mission m_bracelet, see world.js)

let G = null;
const $ = id => document.getElementById(id);
const AR = a => a[Math.floor(Math.random()*a.length)];
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));

function newState(){
  const s = Object.assign({ v:3, ch:-1, flags:{}, units:{}, party:[], inv:{}, bestiary:{}, gold:50, read:{} }, worldDefaults());
  ROSTER.forEach(id => s.units[id] = { lv:CFG.START_LEVEL, xp:0, bp:0, evo:[], nodes:[] });
  s.party = ['jade']; s.active = ['jade']; s.guests = {};
  return s;
}
function save(){ try{ G.savedAt = Date.now(); localStorage.setItem(CFG.SAVE_KEY, JSON.stringify(G)); }catch(e){} }
function load(){
  try{
    const d = JSON.parse(localStorage.getItem(CFG.SAVE_KEY));
    if(!d) return false;
    G = Object.assign(newState(), d); G.guests = G.guests || {}; G.active = (G.active||['jade']).filter(id=>G.party.includes(id));
    ROSTER.forEach(id => { G.units[id] = G.units[id] || { lv:1, xp:0, bp:0, evo:[] }; G.units[id].nodes = G.units[id].nodes || []; });
    return true;
  }catch(e){ return false; }
}
const U = id => G.units[id];
const isRecruited = id => G.party.includes(id);

/* ---------- levels & stats ---------- */
const xpToNext = lv => Math.round(40 + lv*22 + lv*lv*1.2);

function gearBonus(id){ return {hp:0,mp:0,atk:0,mag:0,def:0,spd:0}; }   // hook for the Equipment system

function evoMult(id, stat){
  const tiers = CHARACTERS[id].evo.tiers;
  return U(id).evo.reduce((m,eid) => { const t = tiers.find(x=>x.id===eid); return m * ((t && t.mult && t.mult[stat]) || 1); }, 1);
}
function statsOf(id){
  const c = CHARACTERS[id], lv = U(id).lv, gb = gearBonus(id), ps = passivesOf(id), out = {};
  STATS.forEach(s => { out[s] = Math.round((c.base[s] + c.grow[s]*(lv-1)) * evoMult(id,s) * ((ps.mult[s])||1)) + (gb[s]||0); });
  return out;
}

/* ---------- skill tree: points, nodes, passives ---------- */
const nodeList = id => SKILLTREE[id].reduce((a,b) => a.concat(b.nodes.map((n,i) => Object.assign({}, n, {branch:b.id, idx:i, cost:NODE_COST[i], prev:i? b.nodes[i-1].id : null}))), []);
const nodeById = (id,nid) => nodeList(id).find(n => n.id===nid);
const spEarned = id => (U(id).lv-1) + 3*U(id).evo.length;
const spSpent  = id => U(id).nodes.reduce((a,nid) => a + (nodeById(id,nid)||{cost:0}).cost, 0);
const spFree   = id => spEarned(id) - spSpent(id);
function nodeState(id, n){
  if(U(id).nodes.includes(n.id)) return 'taken';
  if(!treeOpen(id)) return 'sealed';
  if(n.prev && !U(id).nodes.includes(n.prev)) return 'locked';
  return spFree(id) >= n.cost ? 'ready' : 'short';
}
function takeNode(id, nid){ const n = nodeById(id,nid); if(!n || nodeState(id,n)!=='ready') return false; U(id).nodes.push(nid); save(); return true; }
const respecCost = id => 50 + U(id).lv*10;
function respec(id){ if(!U(id).nodes.length || G.gold < respecCost(id)) return false; G.gold -= respecCost(id); U(id).nodes = []; save(); return true; }
function passivesOf(id){
  const out = {mult:{}, critB:0, evaB:0};
  const add = p => { if(!p) return; Object.keys(p.mult||{}).forEach(k => out.mult[k] = (out.mult[k]||1)*p.mult[k]); out.critB += p.critB||0; out.evaB += p.evaB||0; };
  if(!G || !U(id)) return out;
  if(SKILLTREE[id]) nodeList(id).forEach(n => { if(n.passive && U(id).nodes.includes(n.id)) add(n.passive); });
  const bl = bondLevel(id);
  (BONDTREE[id]||[]).forEach(b => { if(b.passive && bl >= b.lvl) add(b.passive); });
  return out;
}

/* ---------- skills ---------- */
function reqText(r){
  if(!r) return '';
  if(r.lvl) return 'Level '+r.lvl;
  if(r.bond) return 'Bond '+r.bond+' with Jade';   // (Jade: average companion bond)
  if(r.flag) return r.flag==='greyson_arms' ? 'Not usable until the major battle (chapter TBD)' : 'Story: '+r.flag;
  return '';
}
function reqMet(id, r){
  if(!r) return true;
  if(r.lvl && U(id).lv < r.lvl) return false;
  if(r.bond && bondLevel(id) < r.bond) return false;
  if(r.flag && !G.flags[r.flag]) return false;
  return true;
}
function skillsOf(id){
  const c = CHARACTERS[id], out = [];
  c.skills.forEach(s => out.push(Object.assign({}, s, { ok:reqMet(id,s.req), why:reqText(s.req) })));
  if(c.bond) out.push(Object.assign({}, c.bond, { bondSkill:true, ok:reqMet(id,c.bond.req), why:reqText(c.bond.req) }));
  c.evo.tiers.forEach(t => (t.skills||[]).forEach(s => out.push(Object.assign({}, s, { evoSkill:true, ok:U(id).evo.includes(t.id), why:'Evolve: '+t.n }))));
  if(SKILLTREE[id]) nodeList(id).forEach(n => { if(n.skill) out.push(Object.assign({}, n.skill, { treeSkill:true, ok:U(id).nodes.includes(n.id), why:'Skill tree: '+n.n })); });
  (BONDTREE[id]||[]).forEach(b => { if(b.skill) out.push(Object.assign({}, b.skill, { bondSkill:true, ok:bondLevel(id)>=b.lvl, why:(id==='jade'?'Party bond ':'Bond ')+b.lvl })); });
  return out;
}

/* ---------- bond (with Jade) ---------- */
function bondLevel(id){
  if(id==='jade'){ const o = G.party.filter(x => x!=='jade' && !CHARACTERS[x].placeholder); return o.length ? Math.floor(o.reduce((a,x) => a + bondLevel(x), 0)/o.length) : 0; }
  const bp = U(id).bp; let l = 0;
  BOND_LEVELS.forEach((need,i) => { if(bp >= need) l = i; });
  return l;
}
function addBond(id, pts){
  if(id==='jade' || !isRecruited(id)) return null;
  const before = bondLevel(id); U(id).bp += pts;
  return bondLevel(id) > before ? CHARACTERS[id].n+' reached Bond '+bondLevel(id)+'!' : null;
}

/* ---------- XP ---------- */
function gainXp(amount, ids){
  const msgs = [];
  (ids || G.party).forEach(id => {
    const u = U(id);
    if(u.lv >= CFG.LEVEL_CAP) return;
    u.xp += amount;
    while(u.lv < CFG.LEVEL_CAP && u.xp >= xpToNext(u.lv)){
      u.xp -= xpToNext(u.lv); u.lv++;
      msgs.push(CHARACTERS[id].n+' reached Lv'+u.lv+'!');
      skillsOf(id).filter(s => !s.evoSkill && s.req && s.req.lvl === u.lv).forEach(s => msgs.push('  ✦ New skill: '+s.n));
    }
  });
  return msgs;
}

/* ---------- evolution ---------- */
function evoState(id){
  const c = CHARACTERS[id], u = U(id);
  return c.evo.tiers.map(t => {
    let st = 'locked', why = 'Level '+t.req.lvl;
    if(u.evo.includes(t.id)) st = 'taken';
    else {
      const needOk = !t.requiresAny || t.requiresAny.some(x => u.evo.includes(x));
      const lvlOk = u.lv >= t.req.lvl;
      const rival = t.tier===1 && (t.group==='path'||t.group==='route') && c.evo.tiers.some(o => o.id!==t.id && o.tier===1 && o.group===t.group && u.evo.includes(o.id));
      if(rival){ st='closed'; why='Another path was chosen'; }
      else if(!needOk){ why = 'Requires: '+t.requiresAny.map(x=>c.evo.tiers.find(o=>o.id===x).n).join(' or '); }
      else if(!lvlOk){ why = 'Level '+t.req.lvl; }
      else { st = 'ready'; why = ''; }
    }
    return Object.assign({}, t, { st, why });
  });
}
function evolve(id, eid){
  const e = evoState(id).find(x => x.id===eid);
  if(!e || e.st!=='ready') return false;
  U(id).evo.push(eid); save(); return true;
}

/* ---------- recruiting / story ---------- */
const ACTIVE_SLOTS = 4;
function recruit(id){ if(!G.party.includes(id)){ G.party.push(id); if(G.active.length<ACTIVE_SLOTS) G.active.push(id); return true; } return false; }
function toggleActive(id){ if(id==='jade') return; const i=G.active.indexOf(id); if(i>=0) G.active.splice(i,1); else if(G.active.length<ACTIVE_SLOTS) G.active.push(id); save(); }
function recruitsAtChapter(ch){ return Object.keys(JOIN_CH).filter(id => JOIN_CH[id] === ch); }
