/* =====================================================================
   TRIBUTE — CORE: state, save, progression (levels, bond, evolution)
   ===================================================================== */
const CFG = { SAVE_KEY:'tribute_rpg_v3', LEVEL_CAP:Infinity, START_LEVEL:1 };   // no level ceiling (author's decision)

// WHO JOINS WHEN (chapter number at which the hero is recruited). PROVISIONAL — correct these.
// Permanent joins. Chad and Sky both accept the mission in ch4 (Chad was hired in ch3, Sky first meets Jade in ch4). Sally 28 and Levi 30 match the comic's chapter titles. Devon open.
const RIN_JOIN_CH = 172;   // Rin is an area guest in the north from ch149, and joins the party for good at ch172 (when she sails with the expedition)
const JOIN_CH = { jade:0, chad:4, sky:4, sally:29, levi:30, ripley:52, devon:54, seraphina:87, ghost_healer:88, rin:RIN_JOIN_CH };   // sally: introduced ch28, recruited ch28/29 per the author (29 provisional); levi leaves temporarily later (chapter TBD); devon open   // ch4 "We are in": Chad (hired in ch3) and Sky accept the mission together
// Guest (temporary) party members. (None yet: the ch4 "Sally guest" came from the discarded story-file list. Per the comic Sally appears in ch28.)
const GUEST_CH = { seraphina:73 };   // guest (temporary Roc replacement) inside Dragonvale from ch73; joins permanently at ch87 when she asks to
// Chapter at which a hero's profile becomes visible even before they join ("Chad profile / Sky profile" unlock in ch1).
const INTRO_CH = { rin:149, ghost_healer:88, seraphina:65, chad:1, sky:1, sally:28, ripley:46, devon:47 };
// Bond changes shown by the comic's banners (bond points with Jade; level thresholds in BOND_LEVELS). Applied when the chapter completes.
const CH_BOND = { 98:{sky:5}, 93:{sky:10}, 94:{sky:10}, 59:{chad:-9999}, 24:{sky:20}, 25:{chad:20}, 27:{chad:-20}, 29:{sky:20}, 31:{chad:-40}, 32:{levi:20}, 33:{levi:20, chad:-20}, 34:{levi:20, chad:-10}, 38:{levi:20, sky:20}, 39:{levi:20, chad:-5}, 40:{levi:20, sky:20} };   // banners: ch31 Jade+Chad -2, ch32 Jade+Levi +1, ch33 Jade+Levi +1 / Jade+Chad -1 (Sky+Levi and Chad+Sally banners not modelled)
const profileKnown = id => isRecruited(id) || !!(G.left && G.left[id]) || (INTRO_CH[id]!==undefined && G.ch >= INTRO_CH[id]);
// Story flags set when a chapter is completed (e.g. Levi's crossbow goes to Jade in ch30).
const CH_FLAGS = { 167:['black_tide_reported'], 168:['adrian_eve_gray'], 169:['pearl_resonates'], 170:['sunken_records_suppressed'], 171:['aelyndra_named'], 172:['black_tide_met'], 173:['sunken_kingdom_found'], 174:['deliberate_submersion'], 175:['maris_met'], 176:['pearl_purpose'], 177:['drowned_crown_met'], 178:['roc_inheritance_known'], 156:['hart_resolved','valley_protected'], 158:['hollow_king_met','gold_lineage_hunted'], 159:['fifteen_designated'], 160:['crownless_king_known'], 161:['hollow_king_contained','sera_shift_known'], 162:['three_truths'], 163:['register_rewritten'], 164:['fourth_entry_missing'], 165:['nameless_witness_met'], 166:['mandate_resolve'], 110:['hale_met'], 111:['royal_link_known'], 114:['third_faction_known','people_behind_found','symbol_traced','faction_identified'], 115:['valen_secret','valen_prophecy_link'], 116:['archive_defended'], 117:['yvette_truth','sky_pendant_mother'], 119:['choice_prophecy'], 122:['omen_seen'], 123:['cael_met'], 124:['first_seal_found'], 125:['forgotten_light_found'], 126:['seris_met'], 127:['sanctuary_purpose'], 128:['guiding_map_found'], 129:['eira_met'], 131:['celestial_found'], 133:['seal_message_seen'], 134:['one_hand_known'], 135:['varyn_met'], 137:['seal_kinds_known'], 138:['forgotten_world_seen'], 139:['barrier_people'], 140:['oath_changed'], 141:['oath_original'], 142:['sisters_together'], 143:['returning_light'], 144:['ardyn_inheritance'], 145:['adviser_known'], 146:['truth_before_curse','arc5_complete'], 147:['fifteen_named'], 148:['first_evil_hunt'], 149:['rin_met'], 152:['widow_resolved'], 154:['hart_found'], 155:['burial_ground_known'], 118:['valen_restored'], 76:['warriors_insight','royal_sense'], 103:['jade_dragon_harmony','husband_wife_truth'], 99:['princess_of_tribute'], 100:['visions_shared'], 90:['gold_family_met'], 93:['sky_resembles_yvette'], 94:['sky_pendant_lost'], 88:['ghost_healer_met'], 86:['dragonvale_honoured'], 82:['aster_crown_prince'], 75:['dv_purify','partner_actions'], 77:['princess_guardian','royal_spirit_authority','dv_exploration'], 87:['levi_reborn','sally_stays','liora_apart','seraphina_free'], 73:['roc_exiled','liora_ward'], 63:['chad_dark_arts'], 67:['chad_dark_deep'], 70:['chad_backlash_1'], 71:['chad_backlash_2'], 72:['chad_backlash_3'], 59:['roc_severed'], 60:['jade_poisoned'], 58:['royal_attire'], 52:['sally_gossip'], 42:['jade_awakened'], 44:['bracelet'], 51:['sally_noble'], 0:['greyson_gift'], 38:['cleansing_touch'], 41:['greyson_arms'], 30:['crossbow'] };   // greyson_arms: dagger+flail unseal at the major battle, chapter 41 (per the author)
// Items handed over when a chapter completes. Greyson gives Jade a dagger and flail in the Prologue; she may not use them until the major battle (chapter TBD, flag greyson_arms).
const CH_ITEMS = { 111:[{id:'yvette_portrait',qty:1}], 90:[{id:'childhood_charm',qty:1}], 87:[{id:'divorce_scroll',qty:1},{id:'skyward_staff',qty:1},{id:'healers_robes',qty:1}], 58:[{id:'royal_attire',qty:1},{id:'phoenix_guard',qty:1}], 44:[{id:'sealed_box',qty:1}], 0:[{id:'greyson_dagger',qty:1},{id:'greyson_flail',qty:1}] };   // (the communication bracelet comes from the Greyson mission m_bracelet, see world.js)

let G = null;
const $ = id => document.getElementById(id);
const AR = a => a[Math.floor(Math.random()*a.length)];
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));

function newState(){
  const s = Object.assign({ v:3, ch:-1, flags:{}, units:{}, party:[], inv:{}, bestiary:{}, gold:50, read:{} }, worldDefaults());
  ROSTER.forEach(id => s.units[id] = { lv:CFG.START_LEVEL, xp:0, bp:0, evo:[], nodes:[] });
  s.party = ['jade']; s.active = ['jade']; s.guests = {}; s.gear = {}; s.disabled = {}; s.left = {};
  return s;
}
function save(){ try{ G.savedAt = Date.now(); localStorage.setItem(CFG.SAVE_KEY, JSON.stringify(G)); }catch(e){} }
function load(){
  try{
    const d = JSON.parse(localStorage.getItem(CFG.SAVE_KEY));
    if(!d) return false;
    G = Object.assign(newState(), d); G.guests = G.guests || {}; G.gear = G.gear || {}; G.disabled = G.disabled || {}; G.left = G.left || {}; G.active = (G.active||['jade']).filter(id=>G.party.includes(id));
    ROSTER.forEach(id => { G.units[id] = G.units[id] || { lv:1, xp:0, bp:0, evo:[] }; G.units[id].nodes = G.units[id].nodes || []; });
    return true;
  }catch(e){ return false; }
}
const U = id => G.units[id];
// Story states. DISABLED: stays in the party but cannot fight. LEAVE: leaves the party (data kept).
const CH_DISABLE = { 42:['sky'] };   // Sky is critically cursed in ch42; no recovery chapter decided yet (Dev tab can clear it)
// PROVISIONAL chapter numbers (75+ not yet planned): Levi returns "reborn" before the party goes home; Sally stays in Dragonvale when the party returns to Tribute.
const CH_EQUIP = { 87:{sky:['skyward_staff','healers_robes']} };   // gear equipped automatically when the chapter completes
const CH_RETURN = { 87:['levi'] };   // ch87 (author): Levi's rejoin / return to Tribute
const FIXED_PARTY_CH = 102;   // from the departure beyond Tribute the party is fixed: Jade, Devon, Seraphina, Levi, Sky all fight (no slots); the Ghost Healer is a hidden passive companion
const FIXED_FIVE = ['jade','devon','seraphina','levi','sky'];
const fixedParty = () => !!G && G.ch >= FIXED_PARTY_CH;
const CH_STAY = { 87:['sally'] };   // leaves the party but stays reachable as a Dragonvale rumour source
const CH_ENABLE = { 61:['sky'] };   // Sky is healed after chapter 61 and returns to active duty
const CH_LEAVE = { 50:['levi'], 73:['chad'], 87:['ripley'] };   // ch87: Levi is back, so Ripley returns to being Jade's attendant (the travelling party is fixed at five: Jade, Devon, Seraphina, Levi, Sky)    // Levi leaves the party in ch50 (mutual end of the engagement)
// Sally (after the return to Tribute, CH_STAY) can only be partied while the party is in Dragonvale.
const isAway = id => (id==='sally' && !!G.flags.sally_stays && G.loc!=='dragon_vale') || (id==='seraphina' && !!G.guests.seraphina && LOCATIONS[G.loc].region!=='dragon');   // Seraphina is a guest only inside Dragonvale until ch87
const isDisabled = id => !!(G.disabled && G.disabled[id]) || isAway(id);
function syncAway(){ G.active = G.active.filter(id => !isAway(id)); }   // call whenever the location changes
function applyStoryStates(n){
  (CH_DISABLE[n]||[]).forEach(id => { if(G.party.includes(id)) G.disabled[id] = true; });
  (CH_ENABLE[n]||[]).forEach(id => { delete G.disabled[id]; });
  (CH_RETURN[n]||[]).forEach(id => { delete G.left[id]; if(!G.party.includes(id)) G.party.push(id); });
  if(n===FIXED_PARTY_CH){ FIXED_FIVE.forEach(id => { if(!(G.left && G.left[id]) && !G.party.includes(id)) G.party.push(id); }); G.active = FIXED_FIVE.filter(id => G.party.includes(id)); }
  syncAway();
  (CH_LEAVE[n]||[]).forEach(id => { G.party = G.party.filter(x => x!==id); G.active = G.active.filter(x => x!==id); G.left[id] = true; });
}
const isRecruited = id => G.party.includes(id);

/* ---------- levels & stats ---------- */
/* Per-class XP tables: xp to next level = a + b*lv + c*lv^2. Martial damage dealers climb a little faster, support and casters a little slower.
   Level 1 -> 2 / level 30 / level 60 / level 100 (xp for that step):
     standard   63 / 1,780 / 5,680 / 14,240      swift fighters 59 / 1,640 / 5,230 / 13,100      support 69 / 1,940 / 6,160 / 15,500
     scholars   72 / 2,060 / 6,440 / 16,000 */
const XP_TABLES = {
  standard:{a:40, b:22, c:1.2},
  fighter:{a:36, b:20, c:1.1},     // Roc, Seraphina: martial burst
  ranger:{a:38, b:21, c:1.15},     // Levi, Ripley, Sally: agile
  support:{a:44, b:24, c:1.3},     // Sky, the Ghost Healer
  scholar:{a:46, b:25, c:1.35},    // Devon: defensive mage
};
const XP_CLASS = {jade:'standard', chad:'fighter', seraphina:'fighter', levi:'ranger', ripley:'ranger', sally:'ranger', sky:'support', ghost_healer:'support', devon:'scholar', rin:'ranger', cael:'support', eira:'support'};
const xpToNext = (lv, id) => { const t = XP_TABLES[XP_CLASS[id] || 'standard']; return Math.round(t.a + lv*t.b + lv*lv*t.c); };

function gearBonus(id){ return typeof gearBonusSum==='function' ? gearBonusSum(id) : {hp:0,mp:0,atk:0,mag:0,def:0,spd:0}; }   // see gear.js

function evoMult(id, stat){
  const tiers = CHARACTERS[id].evo.tiers;
  return U(id).evo.reduce((m,eid) => { const t = tiers.find(x=>x.id===eid); return m * ((t && t.mult && t.mult[stat]) || 1); }, 1);
}
// Permanent stat changes from Roc's dark-magic backlash (chapters 70-72; the author's plan). Multipliers on base stats.
const BACKLASH = { chad_backlash_1:{hp:.92, def:.92, mag:1.35}, chad_backlash_2:{spd:.9, hp:.94, mag:1.2}, chad_backlash_3:{hp:.9, def:.9, atk:1.1, mag:1.15} };
const REBORN_LEVI = {atk:1.15, mag:1.2, spd:1.1, hp:.95};   // draft: "reborn" Levi is not the same man as before
const clsOf = id => (id==='levi' && G && G.flags.levi_reborn) ? 'Noble Ranger' : (id==='chad' && G && G.flags.roc_reborn) ? 'Fallen Dragon Prince' : CHARACTERS[id].cls;
// Portrait variants: assets/party/<id>_noble.webp (Sally from ch51) and <id>_reborn.webp (Levi); a missing file falls back to the base portrait.
const portrait = id => (id==='adrian' ? 'assets/npc/adrian.webp' : 'assets/party/'+id+((id==='sally' && G && G.flags.sally_noble) ? '_noble' : (id==='levi' && G && G.flags.levi_reborn) ? '_reborn' : '')+'.webp');
function backlashMult(id, s){
  if(id==='levi' && G && G.flags.levi_reborn) return REBORN_LEVI[s]||1;
  if(id!=='chad' || !G) return 1;
  return Object.keys(BACKLASH).reduce((m,f) => m * ((G.flags[f] && BACKLASH[f][s]) || 1), 1);
}
function statsOf(id){
  const c = CHARACTERS[id], lv = U(id).lv, gb = gearBonus(id), ps = passivesOf(id), out = {};
  STATS.forEach(s => { out[s] = Math.round((c.base[s] + c.grow[s]*(lv-1)) * evoMult(id,s) * ((ps.mult[s])||1) * backlashMult(id,s)) + (gb[s]||0); });
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
// Passives granted by story flags (ch77 rewards): Jade 'Princess Guardian', Devon 'Royal Spirit Authority'
const STORY_PASSIVES = [
  {id:'jade', flag:'princess_guardian', mult:{hp:1.06, def:1.06}},
  {id:'devon', flag:'royal_spirit_authority', mult:{mag:1.08, mp:1.05}},
  {id:'jade', flag:'jade_dragon_harmony', mult:{def:1.05, mag:1.04}},
  {id:'devon', flag:'jade_dragon_harmony', mult:{def:1.05, atk:1.04}},
];
function passivesOf(id){
  const out = {mult:{}, critB:0, evaB:0};
  const add = p => { if(!p) return; Object.keys(p.mult||{}).forEach(k => out.mult[k] = (out.mult[k]||1)*p.mult[k]); out.critB += p.critB||0; out.evaB += p.evaB||0; };
  if(!G || !U(id)) return out;
  if(SKILLTREE[id]) nodeList(id).forEach(n => { if(n.passive && U(id).nodes.includes(n.id)) add(n.passive); });
  STORY_PASSIVES.forEach(sp => { if(sp.id===id && G.flags[sp.flag]) add(sp); });
  const bl = bondLevel(id);
  (BONDTREE[id]||[]).forEach(b => { if(b.passive && bl >= b.lvl) add(b.passive); });
  return out;
}

/* ---------- skills ---------- */
function reqText(r){
  if(!r) return '';
  if(r.lvl) return 'Level '+r.lvl;
  if(r.bond) return 'Bond '+r.bond+' with Jade';   // (Jade: average companion bond)
  if(r.flag) return r.flag==='jade_awakened' ? 'Story: Jade\'s partial awakening (chapter 42)' : (r.flag==='sky_train_2'||r.flag==='sky_train_3') ? 'Training: Sky\'s apprenticeship with the Ghost Healer' : r.flag==='roc_reborn' ? 'Story: purify Roc (the Fallen Prince\'s Trial)' : r.flag==='dv_purify' ? 'Story: the border unrest (chapter 75)' : r.flag==='partner_actions' ? 'Story: the border unrest (chapter 75)' : r.flag==='jade_dragon_harmony' ? 'Story: Jade and Devon become husband and wife in truth (chapter 103)' : r.flag==='levi_reborn' ? 'Story: Levi returns reborn (chapter 87)' : r.flag==='chad_dark_arts' ? 'Story: Roc begins to learn the dark arts (chapter 63)' : r.flag==='chad_dark_deep' ? 'Story: Roc\'s dark arts deepen (chapter 67)' : r.flag==='sally_noble' ? 'Story: Sally\'s noble title (chapter 51)' : r.flag==='cleansing_touch' ? 'Story: Jade\'s restoring power (chapter 38)' : r.flag==='greyson_arms' ? 'Not usable until the major battle (chapter TBD)' : 'Story: '+r.flag;
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
  if(id==='jade'){ const o = G.party.filter(x => x!=='jade' && !CHARACTERS[x].placeholder && !isCompanion(x)); return o.length ? Math.floor(o.reduce((a,x) => a + bondLevel(x), 0)/o.length) : 0; }
  const bp = U(id).bp; let l = 0;
  BOND_LEVELS.forEach((need,i) => { if(bp >= need) l = i; });
  return l;
}
function addBond(id, pts){
  if(id==='jade' || !isRecruited(id)) return null;
  if(id==='chad' && G.flags.roc_severed) return null;   // ch59: Jade severed her bond with Roc Chadwick
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
    while(u.lv < CFG.LEVEL_CAP && u.xp >= xpToNext(u.lv, id)){
      u.xp -= xpToNext(u.lv, id); u.lv++;
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
      const lvlOk = u.lv >= t.req.lvl, flagOk = !t.req.flag || !!G.flags[t.req.flag];
      const rival = t.tier===1 && (t.group==='path'||t.group==='route') && c.evo.tiers.some(o => o.id!==t.id && o.tier===1 && o.group===t.group && u.evo.includes(o.id));
      if(rival){ st='closed'; why='Another path was chosen'; }
      else if(!needOk){ why = 'Requires: '+t.requiresAny.map(x=>c.evo.tiers.find(o=>o.id===x).n).join(' or '); }
      else if(!flagOk){ why = 'A path not yet revealed in her story'; }
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
const slotCap = () => fixedParty() ? 5 : ACTIVE_SLOTS;   // the travelling party has five seats; Jade and Devon are the unbenchable pair, the other three may be benched
const unbenchable = id => id==='jade' || (fixedParty() && id==='devon');
const activeCount = () => G.active.filter(id => !isDisabled(id)).length;   // a disabled hero does not take a fighting slot
/* Temporary members ("visiting guests"): fight beside the party (controllable, extra to the five) while a rule holds.
   Add a row here when a journey introduces someone: { id, flag (story flag that makes them available), regions (where they travel with you) }.
   Roc (once purified, flag roc_reborn) joins on Dragonvale ground and at the exile border; he never returns to the main party. */
const AREA_BROKEN_SEALS = ['forgotten_battlefield','forgotten_sanctuary','celestial_ruins','land_beyond_seal'];
const AREA_NORTH = ['northern_frontier','black_forest','forest_of_thorns','mourning_valley','crownless_marches'];
const GUEST_RULES = {
  chad:{flag:'roc_reborn', regions:['dragon'], note:'Roc, reborn, fights beside the party on Dragonvale ground.'},
  // Area guests: fight beside the party (passive companions) only while the party is inside their area (locs), from chapter fromCh. Leave the area and they leave.
  cael:{fromCh:123, locs:AREA_BROKEN_SEALS, note:'Cael Ardyn, the last Seal Keeper, fights beside the party while it is in the Broken Seals area.'},
  eira:{fromCh:129, locs:AREA_BROKEN_SEALS, extraLocs:{capital:162, archive_shrine:165}, note:'Eira Solenne, the scholar of the sanctuary, is an ally and guest (not a party member): she fights beside the party in the Broken Seals area, and is with it in the capital from chapter 162 and at the archive-shrine.'},
  rin:{fromCh:149, untilCh:RIN_JOIN_CH, locs:AREA_NORTH, note:'Rin Kaede, the Spirit Ranger, fights beside the party while it is in the northern forest country.'},
};
const presentGuests = () => !G ? [] : Object.keys(GUEST_RULES).filter(id => { const r = GUEST_RULES[id];
  const ok = (r.flag===undefined || [].concat(r.flag).every(f => G.flags[f])) && (!r.regions || r.regions.includes(LOCATIONS[G.loc].region)) && (!r.locs || r.locs.includes(G.loc) || (r.extraLocs && r.extraLocs[G.loc] !== undefined && G.ch >= r.extraLocs[G.loc])) && (r.fromCh===undefined || G.ch>=r.fromCh) && (r.untilCh===undefined || G.ch<r.untilCh);
  return ok && !isDisabled(id); });
const isGuestNow = id => presentGuests().includes(id);
const isCompanion = id => !!(CHARACTERS[id] && CHARACTERS[id].companion) || (id==='rin' && !!G && G.ch < RIN_JOIN_CH);   // companions travel and fight with the party without using one of the active slots
function recruit(id){ if(G.left && G.left[id]) return false; if(!G.party.includes(id)){ G.party.push(id); if(!isCompanion(id) && activeCount()<slotCap()) G.active.push(id); return true; } return false; }
function toggleActive(id){ if(unbenchable(id) || isCompanion(id) || (isAway(id) && !G.active.includes(id))) return; const i=G.active.indexOf(id); if(i>=0) G.active.splice(i,1); else if(activeCount()<slotCap()) G.active.push(id); save(); }
function recruitsAtChapter(ch){ return Object.keys(JOIN_CH).filter(id => JOIN_CH[id] === ch); }
