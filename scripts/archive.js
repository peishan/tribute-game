/* =====================================================================
   TRIBUTE — THE RECORD OF THE HIDDEN ISLE: records, dossiers, leads and research
   From Crimson Tide's Archive, intelligence and research systems, reframed. Four tabs added to the Imperial Network (Adrian's desk):
   RECORDS   Things the party has learned, staged Observed -> Verified -> Archived by the story flags that already exist. A record with no
             progress does not appear. Wording is taken from FLAG_LABEL (canon), so nothing here invents lore.
   DOSSIERS  People and groups of interest (Varyn, the unnamed adviser, the third faction, Magistrate Hale). Entries appear as flags are earned; fields
             that the story has not answered yet read "Unconfirmed". Nothing about recruitment or fate is stated.
   LEADS     Each investigation finished from ch123 on leaves a Lead. Give it to a companion to analyse (1 game day): a companion whose speciality
             matches (seals, spirit, records, field) reads it more reliably. Outcomes: Confirmed / Likely / Unverified / Contradictory. Nobody is ever
             blocked. One cross-check by a second companion can improve a read and can expose a planted trail ("misdirection").
   RESEARCH  Optional timed projects (3 game days) for companions, each needing a Record at a minimum stage. A finished project gives a small bond,
             XP and a Chronicle line. It never gates the story.
   Not wired to combat. State: G.leads, G.research, G.recSeen.  First-pass wording and numbers: edit freely.
   ===================================================================== */
const ARCH_LEADS_CH = 123, ARCH_MAX_LEADS = 6;
const stageFlag = f => ({ok: () => !!G.flags[f], t: FLAG_LABEL[f] || f});
const stageFn = (ok, t) => ({ok, t});
const REC_STATUS = ['Observed', 'Verified', 'Archived'];
const RECORDS = [
  {id:'seals', icon:'🔆', n:'The Seals', cat:'The old world', st:['first_seal_found','seal_kinds_known','forgotten_world_seen'].map(stageFlag)},
  {id:'oath', icon:'📜', n:'The Keeper\'s Oath', cat:'The old world', st:['cael_met','oath_changed','oath_original'].map(stageFlag)},
  {id:'light', icon:'✨', n:'Forgotten Light', cat:'The old world', st:['forgotten_light_found','sanctuary_purpose','guiding_map_found'].map(stageFlag)},
  {id:'barrier', icon:'🚪', n:'The Barrier and the Door', cat:'The old world', st:['barrier_people','door_open','people_behind_found'].map(stageFlag)},
  {id:'sisters', icon:'🌙', n:'Dima and Xima', cat:'The old world', st:['sisters_together','valen_secret','truth_before_curse'].map(stageFlag)},
  {id:'faction', icon:'👁️', n:'The Third Faction', cat:'Powers', st:['symbol_traced','faction_identified','third_faction_known'].map(stageFlag)},
  {id:'valen', icon:'🛡️', n:'The Valen Legacy', cat:'Powers', st:['valen_restored','valen_prophecy_link','yvette_truth'].map(stageFlag)},
  {id:'hart', icon:'🦌', n:'The Burial Ground', cat:'The Fifteen', st:['hart_found','burial_ground_known','royal_link_known'].map(stageFlag)},
  {id:'fifteen', icon:'🕯️', n:'The Fifteen Evils', cat:'The Fifteen', st:[stageFlag('fifteen_named'), stageFn(() => evilsResolved() >= 1, 'The first Evil is resolved'), stageFn(() => evilsResolved() >= 8, 'More than half of the Fifteen are resolved')]},
];
function recStage(r){ let s = -1; r.st.forEach((x, i) => { try{ if(x.ok()) s = i; }catch(e){} }); return s; }
const recSeen = () => RECORDS.filter(r => recStage(r) >= 0);
const recAt = (id, min) => { const r = RECORDS.find(x => x.id===id); return !!r && recStage(r) >= min; };
const recArchived = () => RECORDS.filter(r => recStage(r) >= 2).length;
function rRecords(){
  const seen = recSeen(), cats = [];
  seen.forEach(r => { if(!cats.includes(r.cat)) cats.push(r.cat); });
  return `<div class="sm"><b>${seen.length}</b> record${seen.length===1?'':'s'} opened · <b>${recArchived()}</b> archived. A record only appears once you have learned something of it.</div>` + (cats.map(c => `<h4>${c}</h4>` + seen.filter(r => r.cat===c).map(r => { const s = recStage(r);
    return `<div class="li"><b>${r.icon} ${r.n}</b> <span class="sm">· ${REC_STATUS[s]}</span>${r.st.slice(0, s+1).map((x, i) => `<div class="sm">${REC_STATUS[i]}: ${x.t}</div>`).join('')}</div>`; }).join('')).join('') || '<div class="sm">Nothing recorded yet.</div>');
}
/* ---------------- DOSSIERS ---------------- */
const DOSSIERS = [
  {id:'varyn', icon:'🗝️', n:'Varyn Noctis', sub:'The Seal Breaker', open:'varyn_met', fields:[['Motive','Unconfirmed'],['Allegiance','Unconfirmed']],
   entries:[['one_hand_known','PATTERN NOTED'],['varyn_met','MET IN PERSON']]},
  {id:'adviser', icon:'🕴️', n:'The Unnamed Adviser', sub:'Behind the war', open:'adviser_known', fields:[['Identity','Unconfirmed'],['Whereabouts','Unconfirmed']],
   entries:[['oath_changed','RECORD ALTERED'],['ardyn_inheritance','LINK NOTED'],['adviser_known','NAMED AS ABSENT']]},
  {id:'third', icon:'👁️', n:'The Third Faction', sub:'The sun-and-eye symbol', open:'symbol_traced', fields:[['Members','Unconfirmed'],['Aims','Unconfirmed']],
   entries:[['symbol_traced','TRACED'],['faction_identified','IDENTIFIED'],['third_faction_known','SYMBOL KNOWN'],['people_behind_found','PEOPLE BEHIND THE RECORDS']]},
  {id:'hale', icon:'📋', n:'Magistrate Hale', sub:'Provincial administration', open:'hale_met', fields:[['Loyalty','Unconfirmed']],
   entries:[['hale_met','MET IN PERSON']]},
];
function rDossiers(){
  const list = DOSSIERS.filter(d => G.flags[d.open]);
  return `<div class="sm">Files fill in as the story moves; there is nothing to do here but read. Where the story has not answered something, the file says so.</div>` + (list.map(d =>
    `<div class="panel"><b>${d.icon} ${d.n}</b> <span class="sm">· ${d.sub}</span>${d.fields.map(f => `<div class="sm">${f[0]}: ${f[1]}</div>`).join('')}${d.entries.filter(e => G.flags[e[0]]).map(e => `<div class="li"><span class="sm"><b>${e[1]}</b> · ${FLAG_LABEL[e[0]]||e[0]}</span></div>`).join('')}</div>`).join('') || '<div class="sm">No files opened yet.</div>');
}
/* ---------------- LEADS AND ANALYSTS ---------------- */
const ANALYSTS = [
  {id:'adrian', n:'Adrian', spec:['records'], ok:() => G.ch >= 90}, {id:'seraphina', n:'Seraphina', spec:['seals'], ok:() => isRecruited('seraphina')},
  {id:'sky', n:'Sky', spec:['spirit'], ok:() => isRecruited('sky')}, {id:'devon', n:'Devon', spec:['records'], ok:() => isRecruited('devon')},
  {id:'levi', n:'Levi', spec:['field'], ok:() => isRecruited('levi')}, {id:'rin', n:'Rin', spec:['field','spirit'], ok:() => !!G.flags.rin_met},
];
const analystsNow = () => ANALYSTS.filter(a => { try{ return a.ok(); }catch(e){ return false; } });
const LEAD_CATS = {seals:['🔆','seals and oaths'], spirit:['✨','spirit and healing'], records:['📂','records and testimony'], field:['🥾','tracks and terrain']};
function leadCat(id, name){
  const s = id+' '+name;
  if(/seal|keeper|oath|ardyn|barrier|cael|notation|varyn|compass|chamber/i.test(s)) return 'seals';
  if(/record|archive|file|register|magistrate|official|history|report|letter|album|portrait|pact|testimony|confession|adviser/i.test(s)) return 'records';
  if(/spirit|sky|heal|light|thorn|hart|stag|shrine|rin|sanctuary|resonance|path|widow|residue|grave/i.test(s)) return 'spirit';
  return 'field';
}
const CLASS = {confirmed:['✅','Confirmed',1], likely:['🟡','Likely',.6], unverified:['⚪','Unverified',.3], contradictory:['⚠️','Contradictory',0], misdirection:['🪤','Planted trail exposed',.6]};
const W_MATCH = [['confirmed',.55],['likely',.30],['unverified',.10],['contradictory',.05]], W_MISS = [['confirmed',.20],['likely',.35],['unverified',.30],['contradictory',.15]];
function pickClass(match){ let r = Math.random(), c = 0; const w = match ? W_MATCH : W_MISS; for(const [k, p] of w){ c += p; if(r < c) return k; } return 'unverified'; }
const leadsOpen = () => !!G && G.ch >= ARCH_LEADS_CH;
function leads(){ if(!G.leads) G.leads = []; return G.leads; }
function leadAdd(spotId){
  if(!leadsOpen()) return;
  const sp = spotById(spotId); if(!sp || leads().some(l => l.spot===spotId)) return;
  leads().push({spot:spotId, n:sp.n, cat:leadCat(spotId, sp.n), day:G.day});
  while(leads().filter(l => !l.res).length > ARCH_MAX_LEADS){ const i = leads().findIndex(l => !l.res && !l.who); if(i<0) break; leads().splice(i, 1); }
}
const analystOf = id => ANALYSTS.find(a => a.id===id);
function leadAssign(spot, who){
  const l = leads().find(x => x.spot===spot), a = analystOf(who); if(!l || !a || !a.ok()) return [];
  if(l.res && !l.cx){ if(l.who===who || l.res==='confirmed') return []; l.cx = who; l.cxDue = G.day+1; save(); return ['🔎 '+a.n+' will cross-check the lead.']; }
  if(l.who) return [];
  l.who = who; l.due = G.day+1; save(); return ['🔎 '+a.n+' takes the lead: '+l.n+'.'];
}
function leadPay(l, cls){
  const f = CLASS[cls][2], lv = avgPartyLv(), msgs = [];
  if(f > 0){ const xp = Math.round((40+lv*8)*f), g = Math.round((30+lv*4)*f); G.gold += g; gainXp(xp, G.party).forEach(m => msgs.push(m)); msgs.push('+'+xp+' XP, +'+g+'g'); }
  return msgs;
}
function leadResolve(l){
  const a = analystOf(l.cx && !l.cxDone ? l.cx : l.who);
  if(l.cx && !l.cxDone && l.res){   // cross-check by a second companion
    l.cxDone = true; const was = l.res, r = pickClass(a.spec.includes(l.cat));
    if(was==='contradictory' && r!=='contradictory') l.res = 'misdirection';
    else if(r==='confirmed' && was!=='confirmed') l.res = 'confirmed';
    else if(was==='unverified' && r==='likely') l.res = 'likely';
    if(l.res!==was){ toast(CLASS[l.res][0]+' '+a.n+' cross-checked: '+CLASS[l.res][1]); chronicle('Cross-check by '+a.n+': '+l.n+' ('+CLASS[l.res][1]+').', '🔎'); if(CLASS[l.res][2] > CLASS[was][2]) leadPay(l, l.res); }
    else toast('🔎 '+a.n+' cross-checked: the read stands.');
    return;
  }
  l.res = pickClass(a.spec.includes(l.cat)); leadPay(l, l.res);
  toast(CLASS[l.res][0]+' '+a.n+': '+l.n+' is '+CLASS[l.res][1]); chronicle('Lead analysed by '+a.n+': '+l.n+' ('+CLASS[l.res][1]+').', '🔎');
}
function rLeads(){
  if(!leadsOpen()) return '<div class="sm">Leads begin once the seals are in play.</div>';
  const list = leads().slice().reverse(), as = analystsNow();
  const opts = (l, cx) => as.filter(a => a.id!==l.who).map(a => `<button onclick="act(leadAssign,'${l.spot}','${a.id}')">${a.n}${a.spec.includes(l.cat)?' ★':''}</button>`).join('');
  return `<div class="sm">Each investigation you finish can leave a lead. A companion with a matching speciality (★) reads it more reliably; anyone can try. Analysis takes a day of game time. A read that is not Confirmed can be cross-checked once by someone else.</div>` + (list.map(l => {
    const c = LEAD_CATS[l.cat], wait = l.who && !l.res, done = l.res ? CLASS[l.res] : null;
    return `<div class="ev"><div><b>${c[0]} ${l.n}</b><div class="sm">Needs: ${c[1]}${l.who?' · '+analystOf(l.who).n+(wait?' is analysing':''):''}${l.cx?' · cross-check: '+analystOf(l.cx).n:''}</div>${done?`<div class="sm">${done[0]} ${done[1]}</div>`:''}</div><div class="row" style="flex-wrap:wrap">${!l.who?opts(l):(l.res && !l.cx && l.res!=='confirmed' && l.res!=='misdirection'?'<span class="sm">Cross-check:</span>'+opts(l):'')}</div></div>`; }).join('') || '<div class="sm">No leads right now.</div>');
}
/* ---------------- RESEARCH ---------------- */
const RESEARCH = [
  {id:'seal_kinds', who:'seraphina', rec:'seals', min:0, t:'Comparing the three kinds of seal', d:'Sera sets containment, preservation and separation side by side and notes which have broken and which still hold.', fin:'Sera has a clear table of the three kinds of seal and where each one stands.'},
  {id:'light_reading', who:'sky', rec:'light', min:0, t:'Reading the forgotten light', d:'Sky sits with what the sanctuary preserved, to learn what the light is for.', fin:'Sky can now describe what the forgotten light feels like when it is used well.'},
  {id:'two_oaths', who:'devon', rec:'oath', min:1, t:'The two oaths, line by line', d:'Devon reads the original oath against the altered one with a royal clerk\'s eye.', fin:'Devon has marked, line by line, where the oath was changed.'},
  {id:'symbol_file', who:'adrian', rec:'faction', min:0, t:'Cross-filing the symbol', d:'Adrian sets every sighting of the sun-and-eye symbol against the Network\'s own reports.', fin:'Adrian has a single file of every place the symbol has appeared.'},
  {id:'hunt_map', who:'levi', rec:'fifteen', min:0, t:'Charting the hunt\'s trails', d:'Levi marks the tracks and routes of the Evils found so far.', fin:'Levi\'s chart of the Evils\' ranges now hangs in the camp.'},
];
const RES_DAYS = 3;
function resState(){ if(!G.research) G.research = {}; return G.research; }
const resAvail = p => analystOf(p.who).ok() && recAt(p.rec, p.min);
function resStart(id){
  const p = RESEARCH.find(x => x.id===id), st = resState(); if(!p || st[id] || !resAvail(p)) return [];
  if(Object.keys(st).some(k => st[k].who===p.who && !st[k].done)) return ['They are already on another project.'];
  st[id] = {who:p.who, due:G.day+RES_DAYS}; save(); return ['📚 '+analystOf(p.who).n+' begins: '+p.t+'.'];
}
function rResearch(){
  const st = resState();
  return `<div class="sm">Optional study for companions, each tied to a record. A project takes ${RES_DAYS} game days and gives a small bond, some XP and a line in the Chronicle. Nothing here is required.</div>` + RESEARCH.filter(resAvail).map(p => { const s = st[p.id];
    return `<div class="ev"><div><b>📚 ${p.t}</b> <span class="sm">· ${analystOf(p.who).n}</span><div class="sm">${s&&s.done?'✔ '+p.fin:p.d}</div>${s&&!s.done?`<div class="sm">Done on day ${s.due} (today is day ${G.day}).</div>`:''}</div><div>${s?'':`<button onclick="act(resStart,'${p.id}')">Begin</button>`}</div></div>`; }).join('') || '<div class="sm">No projects yet: they open as records and companions come together.</div>';
}
/* ---------------- SYNC (called from checkDeeds, i.e. after every render) ---------------- */
function archiveSync(){
  if(!G || !G.flags) return;
  if(!G.recSeen){ G.recSeen = {}; RECORDS.forEach(r => { G.recSeen[r.id] = recStage(r); }); }
  else RECORDS.forEach(r => { const s = recStage(r), was = G.recSeen[r.id] === undefined ? -1 : G.recSeen[r.id];
    if(s > was){ G.recSeen[r.id] = s; chronicle('Record '+(s===0?'opened':REC_STATUS[s].toLowerCase())+': '+r.n+'.', '🗂️'); toast('🗂️ '+r.n+': '+REC_STATUS[s]); } });
  let ch = false;
  leads().forEach(l => { if(l.who && !l.res && G.day >= l.due){ leadResolve(l); ch = true; } else if(l.cx && !l.cxDone && G.day >= l.cxDue){ leadResolve(l); ch = true; } });
  const st = resState();
  Object.keys(st).forEach(id => { const s = st[id]; if(!s.done && G.day >= s.due){ s.done = true; ch = true; const p = RESEARCH.find(x => x.id===id);
    if(p){ chronicle('Research finished: '+p.t+' ('+analystOf(p.who).n+').', '📚'); toast('📚 '+p.t+': finished'); gainXp(60+avgPartyLv()*6, G.party); if(CHARACTERS[p.who] && isRecruited(p.who)) addBond(p.who, 3); } } });
  if(ch) save();
}
const archiveTabs = () => G && G.ch >= 123 ? [['records','Records'],['dossiers','Dossiers'],['leads','Leads'],['research','Research']] : [];
function rArchiveTab(t){ return t==='records' ? rRecords() : t==='dossiers' ? rDossiers() : t==='leads' ? rLeads() : t==='research' ? rResearch() : ''; }
deed('rec1', 'story', 'The first record opened', '🗂️', 'The first entry was opened in the Record of the Hidden Isle.', () => recSeen().length >= 1);
deed('rec_arch', 'story', 'Nothing left unwritten', '🗂️', 'A record reached Archived.', () => recArchived() >= 1);
deed('rec_all', 'story', 'The whole record', '🗂️', 'Every record is Archived.', () => recArchived() >= RECORDS.length);
deed('lead_ok', 'world', 'A good read', '🔎', 'A lead was confirmed by a companion.', () => leads().some(l => l.res==='confirmed'));
deed('lead_trap', 'world', 'Not so easily fooled', '🪤', 'A planted trail was exposed by a cross-check.', () => leads().some(l => l.res==='misdirection'));
deed('res1', 'craft', 'Studied', '📚', 'A research project was finished.', () => Object.keys(resState()).some(k => resState()[k].done));
deed('res5', 'craft', 'A well-read company', '📚', 'Every research project was finished.', () => RESEARCH.every(p => resState()[p.id] && resState()[p.id].done));
