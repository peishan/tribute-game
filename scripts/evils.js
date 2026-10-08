/* =====================================================================
   TRIBUTE — THE FIFTEEN EVILS (Arc VI)
   Register of the Fifteen Evils of Tribute (Imperial Network, from ch147). The counter is "Resolved: X/15", never "Killed":
   each Evil can be destroyed, purified, contained or otherwise resolved. How it is resolved is decided by Jade in the story once
   the evidence is in (resolveEvil(id, how) is called by that chapter). Investigation spots fill the Classification meter.
   State: G.evils = { id: { state } }.   Values marked (design) are the author's example values, not canon until the hunt's chapters.
   ===================================================================== */
const EVIL_STATUS = {unknown:'Unknown', active:'Active', investigating:'Investigating', corrupted:'Corrupted', guardian:'Guardian', contained:'Contained', purified:'Purified', destroyed:'Destroyed', reconciled:'Reconciled', resolved:'Resolved'};
const EVIL_RESOLVED = ['contained','purified','destroyed','reconciled','resolved'];   // all count as Resolved: resolving is not killing
const EVIL_ARC_END = 166;   // The Fifteen Shadows: the arc's closing screen
const EVILS = [
  {id:'thorned_widow', n:'The Thorned Widow', loc:'forest_of_thorns', activeCh:148, resolveCh:152, how:'destroyed',
   original:'A thorned abomination of Xima\'s curse (traditional record; wording first-pass)', revised:{spot:'widow_origin', t:'Corrupted guardian spirit: dangerously corrupted, originally benign'}, home:'The Black Forest', intel:[
     {label:'Threat to Civilians', value:'Critical', spot:'witness_accounts'},
     {label:'Corruption', value:'High', spot:'forest_physical'},
     {label:'Spiritual Origin', value:'Confirmed', spot:'forest_spirit'},
     {label:'Sentience', value:'Low', spot:'first_evil_search'},
     {label:'Origin', value:'A guardian spirit of the forest', spot:'widow_origin'}]},
  {id:'mourning_hart', n:'The Mourning Hart', loc:'mourning_valley', activeCh:153, resolveCh:156, how:'reconciled', home:'Mourning Valley',
   original:'Hostile cursed beast', revised:{spot:'hart_motive', t:'Ancient territorial guardian: corruption uncertain'}, intel:[
     {label:'Corruption', value:'Low', spot:'hart_protective'},
     {label:'Guardian Behaviour', value:'Confirmed', spot:'hart_shrine'},
     {label:'Threat', value:'Territorial', spot:'treasure_seekers'},
     {label:'Sentience', value:'High', spot:'hart_motive'}]},
  {id:'hollow_king', n:'The Hollow King', loc:'crownless_marches', resolveCh:161, how:'contained', home:'The Crownless Marches (not yet reached)', intel:[]},
  {id:'black_tide', n:'The Black Tide', intel:[]}, {id:'silent_flame', n:'The Silent Flame', intel:[]}, {id:'weeping_stone', n:'The Weeping Stone', intel:[]},
  {id:'sky_eater', n:'The Sky Eater', intel:[]}, {id:'bone_river', n:'The Bone River', intel:[]}, {id:'sunless_child', n:'The Sunless Child', intel:[]},
  {id:'drowned_crown', n:'The Drowned Crown', intel:[]}, {id:'ashen_serpent', n:'The Ashen Serpent', intel:[]}, {id:'mirror_queen', n:'The Mirror Queen', intel:[]},
  {id:'endless_winter', n:'The Endless Winter', intel:[]},
  {id:'evil_14', n:'???', hidden:true, intel:[]}, {id:'evil_15', n:'???', hidden:true, intel:[]},
];
const evilsOpen = () => !!G && G.ch >= 147;
function evilIntel(e){ return e.intel.filter(i => G.flags['inv_'+i.spot]); }
function evilState(e){
  const s = G.evils && G.evils[e.id] && G.evils[e.id].state; if(s) return s;
  if(e.resolveCh && G.ch >= e.resolveCh) return e.how;   // set by the chapter that resolves it
  if(evilIntel(e).length) return 'investigating';
  return (e.activeCh && G.ch >= e.activeCh) ? 'active' : 'unknown';
}
const evilRevised = e => !!(e.revised && G.flags['inv_'+e.revised.spot]);
const evilKeeper = () => G.ch >= 162 ? 'Master Orin Vale, with Adrian Gold' : 'Adrian Gold';
const evilsResolved = () => EVILS.filter(e => EVIL_RESOLVED.includes(evilState(e))).length;
/* called when chapter n completes: records each Evil the chapter resolves in the Chronicle and in the regard of nearby places */
function evilsChapterDone(n){
  const msgs = [];
  EVILS.filter(e => e.resolveCh===n).forEach(e => { chronicle(e.n+': '+EVIL_STATUS[e.how]+'. Resolved '+evilsResolved()+' / 15.', '🕯️'); if(e.loc && LOCATIONS[e.loc]){ const m = regardAdd(e.loc, 40); if(m) msgs.push(m); const nb = LOC_ORDER.filter(k => k!==e.loc && LOCATIONS[k].region===LOCATIONS[e.loc].region && isSettlement(k)); nb.forEach(k => regardAdd(k, 20)); } });
  return msgs;
}
function resolveEvil(id, how){
  const e = EVILS.find(x => x.id===id); if(!e || !EVIL_STATUS[how]) return [];
  if(!G.evils) G.evils = {};
  G.evils[id] = {state:how}; chronicle(e.n+': '+EVIL_STATUS[how]+'.', '🕯️'); save();
  return [EVIL_RESOLVED.includes(how) ? '✔ '+e.n+': '+EVIL_STATUS[how]+'. Resolved '+evilsResolved()+'/15.' : e.n+': '+EVIL_STATUS[how]+'.'];
}
/* ---- Ask the party (from Crimson Tide's disagreement-and-repair idea): before Jade decides an Evil's fate she can hear each companion's view.
   No point is ever lost for disagreeing: each view heard adds understanding and a little bond; with enough understanding the Evil is flagged
   learned_<id>, which the chapter that resolves it can check. State: G.counsel = { evilId: {asked:{who:true}} }. Wording is first-pass. */
const EVIL_COUNSEL = {
  mourning_hart:{fromCh:154, need:3, question:'The villagers want it killed. Jade stopped the fight. What does the party think?',
    views:{sky:'Its energy felt like protection, not corruption. I would not call it a monster.',
           levi:'The tracks circle the shrine. It was guarding something, not hunting.',
           devon:'The villagers are afraid and they are owed an answer, but not a kill we cannot take back.',
           seraphina:'Treasure seekers and officials sending soldiers is a failure of governance, and it should be answered as one.',
           rin:'A guardian spirit forgives trespass once, if ever. We should learn what it is asking for.'}},
};
const counselState = id => { if(!G.counsel) G.counsel = {}; if(!G.counsel[id]) G.counsel[id] = {asked:{}}; return G.counsel[id]; };
const counselWho = id => Object.keys(EVIL_COUNSEL[id].views).filter(w => w==='rin' ? !!G.flags.rin_met : isRecruited(w));
const evilLearned = id => !!G.flags['learned_'+id];
function askParty(id, who){
  const C = EVIL_COUNSEL[id], st = counselState(id); if(!C || !C.views[who] || st.asked[who]) return [];
  st.asked[who] = true; const msgs = [(who==='rin'?'Rin':CHARACTERS[who].n.split(' ')[0])+': "'+C.views[who]+'"'];
  if(CHARACTERS[who] && isRecruited(who)){ const m = addBond(who, 5); if(m) msgs.push(m); }
  if(Object.keys(st.asked).length >= C.need && !G.flags['learned_'+id]){ G.flags['learned_'+id] = true; msgs.push('🕯️ Jade has heard enough to decide with open eyes.'); }
  return msgs;
}
function rCounsel(e){
  const C = EVIL_COUNSEL[e.id]; if(!C || G.ch < C.fromCh || EVIL_RESOLVED.includes(evilState(e))) return '';
  const st = counselState(e.id), n = Object.keys(st.asked).length;
  return `<div class="sm" style="margin-top:4px"><b>Ask the party</b> (${n}/${C.need} to be ready): ${C.question}</div><div class="row" style="flex-wrap:wrap;margin:4px 0">${counselWho(e.id).map(w => `<button ${st.asked[w]?'disabled':''} onclick="act(askParty,'${e.id}','${w}')">${st.asked[w]?'✓ ':''}${w==='rin'?'Rin':CHARACTERS[w].n.split(' ')[0]}</button>`).join(' ')}</div>${Object.keys(st.asked).map(w => `<div class="sm">${w==='rin'?'Rin':CHARACTERS[w].n.split(' ')[0]}: “${C.views[w]}”</div>`).join('')}${evilLearned(e.id)?'<div class="sm">✔ Ready to decide.</div>':''}`;
}
function rRegister(){
  const rows = EVILS.map((e,i) => { const st = evilState(e), intel = evilIntel(e);
    const cls = e.original && st!=='unknown' ? (evilRevised(e) ? `<div class="sm" style="opacity:.6;text-decoration:line-through">Original classification: ${e.original}</div><div class="sm"><b>Revised classification:</b> ${e.revised.t}</div>` : `<div class="sm">Classification: ${e.original}</div>`) : '';
    return `<div class="ev"><div><b>${i+1}. ${e.hidden?'???':e.n}</b> <span class="sm">· ${EVIL_STATUS[st]}${e.home&&st!=='unknown'?' · '+e.home:''}</span>${cls}${rCounsel(e)}${intel.length?`<div class="sm">Classification: ${intel.map(x => x.label+': '+x.value).join(' · ')}${intel.length<e.intel.length?' · '+(e.intel.length-intel.length)+' more to learn':''}</div>`:''}</div></div>`; }).join('');
  const done = evilsResolved(), revised = EVILS.filter(evilRevised).length;
  return `<div class="panel"><b>THE FIFTEEN EVILS</b><div><b>Resolved: ${done} / 15</b> · Remaining: ${15-done} · Unknown classifications: ${G.ch>=EVIL_ARC_END?'?':15-revised}</div><div class="sm">Kept by ${evilKeeper()}. Not "killed": each Evil is destroyed, purified, contained, reconciled or otherwise resolved once Jade has learned what it is. Find them. Understand them. Then decide what must be done.</div>${G.ch>=EVIL_ARC_END?'<div class="sm" style="margin-top:4px"><i>Not every monster was born a monster. Not every victim remained innocent. And not every name history gave them was true.</i></div>':''}</div>${rows}`;
}
