/* =====================================================================
   TRIBUTE — MASTER YALE'S CLINIC (Lingering Vale; docs/MASTER_YALE_PLAN.md, the author's design)
   Master Yale is a stationary allied healer and quest giver at Lingering Vale, never a travelling party member. The Clinic opens when Sky and Yale are reunited (ch740); more opens once the
   Weeping Stone is purified (ch759).
     TREATMENT          full HP and MP for the whole party, once a day (gold by party level); from ch759 the Vale's restored currents add a line of flavour only.
     VALE MEDICINES     craft Vale Panacea and the Master's Draught from herbs and restoration materials; buy Vale Tonic and Clear-Mind Tea (remedies unavailable elsewhere).
     SKY'S TRAINING     three ranks of Healer's Insight, permanent: +3 MAG, +12 HP, +6 MP each. Costs Restoration Shards and gold; rank 3 needs the Stone purified (ch759).
     DIAGNOSIS CASES    five cases (Sky leads; one case a day): examine first, or treat the symptom. Diagnosis wins more often. After the father reveal (ch753) Yale's lines change subtly: he is still his master first.
   All numbers and wording first-pass.
   ===================================================================== */
Object.assign(ITEMS, {
  vale_tonic:{n:'Vale Tonic',icon:'🍵',type:'consumable',rarity:'uncommon'},
  clear_mind_tea:{n:'Clear-Mind Tea',icon:'🫖',type:'consumable',rarity:'uncommon'},
  vale_panacea:{n:'Vale Panacea',icon:'🧪',type:'consumable',rarity:'rare'},
  masters_draught:{n:'Master\'s Draught',icon:'⚗️',type:'consumable',rarity:'epic'},
});
Object.assign(USE, {
  vale_tonic:{hp:400, mp:60, cleanse:true},
  clear_mind_tea:{mp:120, cleanse:true},
  vale_panacea:{hp:700, mp:100, cleanse:true},
  masters_draught:{hp:9999, mp:9999, cleanse:true},
});
const CLINIC_STOCK = [['vale_tonic',140],['clear_mind_tea',90]];
const CLINIC_CRAFT = [
  {out:'vale_panacea', need:{forest_herb:4, spirit_thread:1}, gold:120},
  {out:'masters_draught', need:{forest_herb:6, restoration_shard:2, river_essence:1}, gold:400},
];

const clinicData = () => { if(!G.clinic) G.clinic = {rank:0, treated:-1, caseDay:-1, cases:{}}; return G.clinic; };
const clinicOpen = () => !!(G && G.flags && G.flags.sky_reunites_with_yale);
const clinicAdvanced = () => !!(G && G.ch >= 759);
const yaleKnows = () => !!(G && G.flags && G.flags.blood_ritual_reveals_father_and_son);

const _statsOfClinic = statsOf;
statsOf = function(id){
  const o = _statsOfClinic(id);
  if(id==='sky' && G && G.clinic && G.clinic.rank){ const r = G.clinic.rank; o.mag += 3*r; o.hp += 12*r; o.mp += 6*r; }
  return o;
};

const clinicTreatCost = () => 40 + Math.round(avgPartyLv()*6);
function clinicTreat(){
  const c = clinicData();
  if(c.treated === G.day) return ['Master Yale has already seen to you today.'];
  const cost = clinicTreatCost(); if(G.gold < cost) return ['The treatment costs '+cost+' gold.'];
  G.gold -= cost; c.treated = G.day; restoreParty();
  const msgs = ['🩺 Master Yale examines each of you before he treats anyone, which takes longer than the treatment. HP and MP are full again.'];
  if(clinicAdvanced())msgs.push('🌿 The Vale\'s restored currents do the rest: nothing lingers.');
  if(yaleKnows()) msgs.push('Yale, not looking up: "Eat something. That is not advice from a master."');
  return msgs;
}
function clinicBuy(id){
  const e = CLINIC_STOCK.find(x => x[0]===id); if(!e) return [];
  if(G.gold < e[1]) return ['Not enough gold.'];
  G.gold -= e[1]; addItems([{id, qty:1}]); return ['Bought '+ITEMS[id].icon+' '+ITEMS[id].n+'.'];
}
function clinicCraft(out){
  const r = CLINIC_CRAFT.find(x => x.out===out); if(!r) return [];
  if(G.gold < r.gold || !Object.keys(r.need).every(k => (G.inv[k]||0) >= r.need[k])) return ['Not enough materials or gold.'];
  Object.keys(r.need).forEach(k => G.inv[k] -= r.need[k]); G.gold -= r.gold; addItems([{id:out, qty:1}]);
  return ['⚗️ Master Yale checks your measurements twice, then lets you prepare it: '+ITEMS[out].icon+' '+ITEMS[out].n+'.'];
}
const clinicRankCap = () => clinicAdvanced() ? 3 : 2;
const clinicRankCost = () => { const r = clinicData().rank; return {shards:2*(r+1), gold:200*(r+1)}; };
function clinicTrain(){
  const c = clinicData(); if(c.rank >= clinicRankCap()) return [c.rank>=3 ? 'Sky has learned all Yale can teach in this form.' : 'Yale: "More once the Stone is quiet. Not before."'];
  if(!G.party.includes('sky')) return ['Sky must be in the party.'];
  const k = clinicRankCost(); if(G.gold < k.gold || (G.inv.restoration_shard||0) < k.shards) return ['Needs '+k.shards+' Restoration Shards and '+k.gold+' gold.'];
  G.gold -= k.gold; G.inv.restoration_shard -= k.shards; c.rank++;
  return ['💙 Sky trains with Master Yale: Healer\'s Insight rank '+c.rank+' (+3 MAG, +12 HP, +6 MP).', 'Yale: "Again." (He means it kindly.)'];
}

const CLINIC_CASES = [
  {id:'cc1', n:'The Wilting Orchard', t:'A farmer\'s apple trees are wilting from the root, and his boy has the same cough. Every healer he has asked treated the boy.', opts:[
    ['Examine the orchard and the boy together', 'Sky finds the soil, not the lungs: treant sickness is spreading from the orchard. Both recover.', 'No sign of cause yet.'],
    ['Treat the cough and move on', 'The cough eases, and returns by evening.', 'The cough stays.']], minCh:740},
  {id:'cc2', n:'Borrowed Dreams', t:'A weaver wakes every night from a stranger\'s memories and cannot name whose. No healer can diagnose it.', opts:[
    ['Ask which memories first, then which hour', 'Sky traces the dreams to the Stone\'s fractured currents and steadies her.', 'The weaver cannot say.'],
    ['Give her a sleeping draught', 'She sleeps, and the dreams come back worse.', 'She will not drink it.']], minCh:741},
  {id:'cc3', n:'The Lost Treatise', t:'A damaged healer\'s text is missing its middle chapters, and the apprentices have been guessing at the dosages.', opts:[
    ['Reconstruct the dosages from the margins', 'Sky and Yale rebuild the chapter from the margin notes: it was never about strength.', 'The margins are too faded.'],
    ['Copy what the apprentices guessed', 'The copy preserves the guesses, and the errors.', 'The guesses disagree.']], minCh:748},
  {id:'cc4', n:'The Apprentice\'s Mistake', t:'A young apprentice mixed a poultice wrongly and a patient is worse. She is afraid to tell Master Yale.', opts:[
    ['Go with her and say it plainly', 'Yale says "Again" to the apprentice and sits with the patient himself. The patient mends.', 'She hides in the stores.'],
    ['Fix it quietly', 'The patient mends, and the apprentice learns nothing.', 'The poultice is gone.']], minCh:753},
  {id:'cc5', n:'The Network\'s Ache', t:'Restored channels under the Vale leak heat into a healing garden and the plants have begun to bloom out of season.', opts:[
    ['Read the garden against the network', 'Sky measures the current, Yale reads the garden: the network is restoring it. Leave it be.', 'The readings disagree.'],
    ['Shut the channel', 'The garden withers back, and the channel reopens by morning.', 'The channel will not close.']], minCh:759},
];
let clinicPending = null;
const clinicCaseDone = id => (clinicData().cases[id]||{}).st==='won';
function clinicCaseStart(id){
  const c = CLINIC_CASES.find(x => x.id===id); if(!c || G.ch < c.minCh || clinicCaseDone(id)) return [];
  if(clinicData().caseDay === G.day) return ['One case a day is enough: come back tomorrow.'];
  clinicPending = id; return [];
}
function clinicCasePick(i){
  const c = CLINIC_CASES.find(x => x.id===clinicPending); if(!c) return [];
  const d = clinicData(); clinicPending = null; d.caseDay = G.day;
  const sky = G.party.includes('sky'), good = i===0, p = good ? (sky ? .85 : .55) : (sky ? .4 : .25);
  const win = Math.random() < p, o = c.opts[i];
  const msgs = [o[0]+': '+(win ? o[1] : o[2])];
  if(win){
    d.cases[c.id] = {st:'won', day:G.day};
    grantReward({xp:140000 + Math.round(avgPartyLv()*1500), gold:20000 + Math.round(avgPartyLv()*300), items:[{id:'forest_herb', qty:2}]}, c.n).forEach(m => msgs.push(m));
    msgs.push(yaleKnows() ? 'Yale: "Diagnose before treating." A pause. "Good."' : 'Yale: "Diagnose before treating."');
  } else { d.cases[c.id] = {st:'tried', day:G.day}; gainXp(15000, G.party).forEach(m => msgs.push(m)); msgs.push('You may try again tomorrow.'); }
  return msgs;
}
function clinicCaseCancel(){ clinicPending = null; return []; }

function rClinic(){
  if(!clinicOpen()) return '';
  const c = clinicData(), adv = clinicAdvanced();
  const lead = yaleKnows() ? 'Master Yale, and Sky\'s father: neither has stopped calling the other what they always did.' : 'Master Yale, who raised Sky and trained him as a healer.';
  let h = `<div class="panel"><b>${portraitChip('assets/party/yale.webp','Master Yale')} Master Yale\'s Clinic</b><div class="sm">${lead} ${adv ? 'The Stone is quiet and the Vale\'s currents are restored: he will teach and treat more.' : 'More of his services open once the Weeping Stone is resolved.'}</div></div>`;
  const cost = clinicTreatCost(), done = c.treated === G.day;
  h += `<div class="ev ${done?'locked':''}"><div><b>🩺 Treatment</b><div class="sm">Full HP and MP for the party${adv?', and lingering wounds lifted':''}. ${cost} gold, once a day.</div></div><button ${done?'disabled':''} onclick="act(clinicTreat)">${done?'Treated':'Be treated'}</button></div>`;
  h += `<h4>Vale remedies</h4>` + CLINIC_STOCK.map(([id,p]) => `<div class="ev"><div><b>${ITEMS[id].icon} ${ITEMS[id].n}</b> <span class="sm">· ${useText(USE[id])} · ${p} gold · you have ${G.inv[id]||0}</span></div><button onclick="act(clinicBuy,'${id}')">Buy</button></div>`).join('');
  h += `<h4>Prepare medicines</h4>` + CLINIC_CRAFT.map(r => { const ok = G.gold >= r.gold && Object.keys(r.need).every(k => (G.inv[k]||0) >= r.need[k]); return `<div class="ev ${ok?'':'locked'}"><div><b>${ITEMS[r.out].icon} ${ITEMS[r.out].n}</b> <span class="sm">· ${Object.keys(r.need).map(k => (ITEMS[k]?ITEMS[k].n:k)+' ×'+r.need[k]).join(', ')} · ${r.gold} gold</span></div><button ${ok?'':'disabled'} onclick="act(clinicCraft,'${r.out}')">Prepare</button></div>`; }).join('');
  const k = clinicRankCost(), cap = clinicRankCap();
  h += `<h4>Sky\'s training</h4><div class="ev"><div><b>💙 Healer\'s Insight</b> <span class="sm">· rank ${c.rank} / ${cap}${c.rank<3&&!adv&&c.rank>=2?' (rank 3 once the Stone is purified)':''} · +3 MAG, +12 HP, +6 MP each${c.rank<cap?' · '+k.shards+' Restoration Shards, '+k.gold+' gold':''}</span></div><button ${c.rank>=cap?'disabled':''} onclick="act(clinicTrain)">Train</button></div>`;
  h += rClinicCases();
  return h;
}
function rClinicCases(){
  const d = clinicData();
  if(clinicPending){
    const c = CLINIC_CASES.find(x => x.id===clinicPending);
    return `<div class="panel" style="border-color:var(--gold)"><b>🩺 ${c.n}</b><div class="sm">${c.t}</div>${c.opts.map((o,i) => `<button class="pri" onclick="act(clinicCasePick,${i})">${o[0]}</button>`).join('')} <button onclick="act(clinicCaseCancel)">Not now</button></div>`;
  }
  return `<h4>Diagnosis cases</h4>` + CLINIC_CASES.filter(c => G.ch >= c.minCh).map(c => { const st = (d.cases[c.id]||{}).st, won = st==='won', cd = d.caseDay === G.day;
    return `<div class="ev ${won?'locked':''}"><div><b>🩺 ${c.n}</b><div class="sm">${won?'Settled.':c.t}</div></div><button ${won||cd?'disabled':''} onclick="act(clinicCaseStart,'${c.id}')">${won?'Settled':cd?'Tomorrow':st==='tried'?'Try again':'Take the case'}</button></div>`; }).join('');
}
if(LOCATIONS.lingering_vale && !LOCATIONS.lingering_vale.spots.some(s => s.id==='yale_clinic'))
  LOCATIONS.lingering_vale.spots.push({id:'yale_clinic', kind:'clinic', n:'Master Yale\'s Clinic', icon:'🏥', desc:'Treatment, Vale remedies, medicines, Sky\'s training and diagnosis cases.', ch:740});
