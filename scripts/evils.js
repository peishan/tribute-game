/* =====================================================================
   TRIBUTE — THE FIFTEEN EVILS (Arc VI)
   Register of the Fifteen Evils of Tribute (Imperial Network, from ch147). The counter is "Resolved: X/15", never "Killed":
   each Evil can be destroyed, purified, contained or otherwise resolved. How it is resolved is decided by Jade in the story once
   the evidence is in (resolveEvil(id, how) is called by that chapter). Investigation spots fill the Classification meter.
   State: G.evils = { id: { state } }.   Values marked (design) are the author's example values, not canon until the hunt's chapters.
   ===================================================================== */
const EVIL_STATUS = {unknown:'Unknown', active:'Active', investigating:'Investigating', corrupted:'Corrupted', guardian:'Guardian', contained:'Contained', purified:'Purified', destroyed:'Destroyed', reconciled:'Reconciled', restored:'Restored', reclassified:'Reclassified: not an Evil', resolved:'Resolved'};
const EVIL_RESOLVED = ['contained','purified','destroyed','reconciled','restored','reclassified','resolved'];   // all count as Resolved: resolving is not killing
const EVIL_ARC_END = 166;   // The Fifteen Shadows: the arc's closing screen
const EVILS = [
  {id:'thorned_widow', n:'The Thorned Widow', epithet:'The Corrupted Guardian', loc:'forest_of_thorns', activeCh:148, resolveCh:152, how:'destroyed',
   original:'Ancient guardian spirit / rampaging corruption entity', revised:{spot:'widow_origin', t:'Corrupted guardian spirit: dangerously corrupted, originally benign'}, home:'The Black Forest', intel:[
     {label:'Threat to Civilians', value:'Critical', spot:'witness_accounts'},
     {label:'Corruption', value:'High', spot:'forest_physical'},
     {label:'Spiritual Origin', value:'Confirmed', spot:'forest_spirit'},
     {label:'Sentience', value:'Low', spot:'first_evil_search'},
     {label:'Origin', value:'A guardian spirit of the forest', spot:'widow_origin'}]},
  {id:'mourning_hart', n:'The Mourning Hart', epithet:'The Misidentified Protector', loc:'mourning_valley', activeCh:153, resolveCh:156, how:'reconciled', home:'Mourning Valley',
   original:'Hostile cursed beast', revised:{spot:'hart_motive', t:'Ancient territorial guardian: corruption uncertain'}, intel:[
     {label:'Corruption', value:'Low', spot:'hart_protective'},
     {label:'Guardian Behaviour', value:'Confirmed', spot:'hart_shrine'},
     {label:'Threat', value:'Territorial', spot:'treasure_seekers'},
     {label:'Sentience', value:'High', spot:'hart_motive'}]},
  {id:'hollow_king', n:'The Hollow King', epithet:'The Historical Victim', loc:'crownless_marches', activeCh:157, resolveCh:161, how:'contained', home:'The Crownless Marches',
   original:'Hostile undead ruler / village destroyer', revised:{spot:'sealed_kingdom', t:'A historical victim who became dangerous: contained'}, intel:[
     {label:'Corruption', value:'Memory and sorrow, not beast-like corruption', spot:'memory_energy'},
     {label:'Sentience', value:'High: he speaks and remembers', spot:'hk_account'},
     {label:'Origin', value:'A king of a kingdom the seals erased', spot:'sealed_kingdom'},
     {label:'Threat to Civilians', value:'Real: he has killed in the present', spot:'present_crimes'}]},
  {id:'black_tide', n:'The Black Tide', loc:'black_tide_waters', activeCh:167, resolveCh:182, how:'restored', home:'The Forbidden Sea Route', original:'Waters that swallow ships (the Register: extreme danger)', revised:{spot:'tide_origin', t:'A corrupted natural and spiritual phenomenon: a guardian current twisted by centuries of magical damage. Restored.'}, intel:[
     {label:'Threat', value:'Extreme danger (Register)', spot:'register_blacktide'},
     {label:'Origin', value:'Tied to an erased maritime boundary', spot:'maritime_records'},
     {label:'Behaviour', value:'Turns the sea black after sunset', spot:'sea_calm'},
     {label:'Residue', value:'Claw marks and residue older than the first sightings', spot:'tide_evidence'},
     {label:'Nature', value:'A natural spiritual force, corrupted: not born evil', spot:'tide_layered'}]},
  {id:'silent_flame', n:'The Silent Flame', epithet:'The Ninth Shadow', loc:'silent_furnace', activeCh:637, resolveCh:654, how:'destroyed', home:'The Old Beacon Road', original:'A village where no sound can be made', revised:{spot:'hz645c', t:'A beacon of willing voices that learned to take: it consumes living voices and cannot be made harmless'}, intel:[
     {label:'Signs', value:'No voice, no music and no cry can be made; fires spread unheard and a fall goes unnoticed', spot:'hz638d'},
     {label:'Origin', value:'An old beacon that carried warnings far and wide on voices given willingly', spot:'hz644b'},
     {label:'The turn', value:'In wartime rulers forced it to take voices, then whole communities, and it learned to take rather than receive', spot:'hz645c'},
     {label:'The cost', value:'Even its original function needs living offerings: there is no harmless state to restore it to', spot:'hz650d'}]},   // the fight is at ch653 and ch654 (The First Sound) resolves it: 9 / 15
  {id:'weeping_stone', n:'The Weeping Stone', epithet:'The Evil of Borrowed Memory', loc:'weeping_roots', activeCh:741, resolveCh:759, how:'purified', home:'Lingering Vale', original:'An ancient formation that began to weep water like tears',   // woken at ch748 (the thirteenth Evil); fought at ch758 and purified at ch759: 13 / 15
   intel:[
     {label:'Signs', value:'Clear water drips from the stone without end; people nearby suffer headaches, dreams that are not theirs and spiritual exhaustion', spot:'hz741a'},
     {label:'Nature', value:'Its spiritual signature is unstable and fractured, with foreign influence mixed into the vale\'s healing currents', spot:'hz741c'},
     {label:'History', value:'It has reacted before: an old outbreak resembling a diseased or cursed treant, when the vale\'s great tree wept without end', spot:'hz744a'},
     {label:'Roots', value:'A network of roots woven into ancient stonework beneath the whole region, converging on a structure older than the Vale', spot:'hz748c'},
     {label:'Source', value:'Beneath the Stone, a restoration and healing node corrupted so that it forces the living to relive old wounds and feeds on unresolved pain', spot:'hz756b'},
     {label:'Purpose', value:'The node was built for restoration, never to cause pain: the Evil twisted its purpose', spot:'hz759b'}]},
  {id:'sky_eater', n:'The Sky Eater', epithet:'The Hunger Above', loc:'altan_high_roads', activeCh:692, resolveCh:708, how:'destroyed', home:'The upper skies', original:'A vast serpentine entity that hunts in the upper skies and feeds on vital energy',   // arrives at the capital at ch706, fought at ch707 and falls at ch708: 11 / 15
   intel:[
     {label:'Signs', value:'Livestock gone without a drop of blood, granaries opened from within, people weakened and children fallen ill for no reason', spot:'hz692a'},
     {label:'Nature', value:'Feeds on life force, spiritual energy, memory, strength and vitality rather than flesh alone', spot:'hz693c'},
     {label:'Cause', value:'Drawn down by the restoration network\'s awakening, following restored energy like a starving animal follows food', spot:'hz694c'}]}, {id:'bone_river', n:'The Bone River', epithet:'Where the Dead River Runs', loc:'bone_river', activeCh:662, resolveCh:683, how:'restored', home:'The Changed River',   // the brief: restored at ch683 by ending its failed resurrection loop (10 / 15)
   original:'A river that abruptly changed course', revised:{spot:'hz677d', t:'A neutral conduit of the restoration network that never stopped trying: not a monster but a failed restoration loop that keeps rebuilding what cannot be restored'}, intel:[
     {label:'Signs', value:'The river carved a new path through old settlements, burial grounds and ruins, and bones began appearing downstream', spot:'hz662d'},
     {label:'The remains', value:'Human, animal and ancient creatures, far more than any record accounts for, from different periods mixed together', spot:'hz664b'},
     {label:'The dead', value:'They rise and keep trying to go upstream, animated by restorative energy used the wrong way: preservation, not resurrection', spot:'hz668d'},
     {label:'Origin', value:'A neutral conduit of the restoration network, a vein carrying restorative energy between distant sites', spot:'hz672c'},
     {label:'The cause', value:'Centuries of death, sealed energy, corrupted flow and failed reconstruction: it keeps trying to restore what cannot be restored', spot:'hz677d'}]}, {id:'sunless_child', n:'The Sunless Child', epithet:'Born Beneath a Dead Sun', loc:'sunless_dark_zone', activeCh:761, home:'The Sunless Zone', original:'Places where the sun is visible but its light does not arrive',   // identified at ch775 as the Fourteenth Evil: an ancient entity, never a human child; manifests at ch780; not yet resolved: 13 / 15
   intel:[
     {label:'Signs', value:'The sun is visible but its light does not arrive: lamps will not burn, plants no longer turn to the sun, shadows disappear', spot:'hz766b'},
     {label:'Route', value:'The affected areas lie along ancient routes connected to the old seals and energy channels: it uses the existing system', spot:'hz769c'},
     {label:'Identity', value:'Not a human child but an ancient entity born beneath a dead sun: the name survived while the meaning was lost', spot:'hz775a'},
     {label:'Method', value:'It feeds through the ancient network and is amplified by the dormant structures it wakes; fused with a solar restoration conduit it turns it into a draining system', spot:'hz780c'},
     {label:'Tactic', value:'It shows Jade possible futures to make her fear choosing wrong', spot:'hz781c'}]},
  {id:'drowned_crown', n:'The Drowned Crown', loc:'sunken_kingdom', activeCh:177, resolveCh:182, how:'reclassified', home:'The Sunken Kingdom',
   original:'Cursed monarch and destroyer (Dragonvale\'s histories)', revised:{spot:'crown_recognition', t:'An ancient royal preservation construct: the council\'s final command, not an Evil'}, intel:[
     {label:'Sentience', value:'Many voices layered through time', spot:'drowned_crown_meet'},
     {label:'Behaviour', value:'Warns intruders away', spot:'crown_warnings'},
     {label:'Guardians', value:'Spectral royal guard', spot:'approach_palace'},
     {label:'Origin', value:'A collective construct of the royal council', spot:'crown_origin'},
     {label:'Purpose', value:'To keep the deepest chamber from those who do not understand', spot:'council_command'}]}, {id:'ashen_serpent', n:'The Ashen Serpent', epithet:'The Serpent in the Ashes', loc:'altan_buried_chamber', activeCh:716, resolveCh:728, how:'destroyed', home:'Beneath Altan', original:'A serpentine mark burned into the old coronation road',   // fought and destroyed at ch728: 12 / 15
   intel:[
     {label:'Signs', value:'Warm ash that shifts against the wind, and a serpentine mark burned into the underside of stones unmoved for generations', spot:'hz716b'},
     {label:'Signature', value:'The same corruption as at the other Fifteen-Evil sites', spot:'hz717c'},
     {label:'Origin', value:'Part of an ancient containment system beneath the First Throne, built by an earlier dynasty, its role changed by centuries of corruption', spot:'hz724b'},
     {label:'Route', value:'It moved through old drainage, service and ritual tunnels in a ring beneath the central district', spot:'hz723b'},
     {label:'Nature', value:'Not just a beast: a structure and a prison, broken and remade many times, held by something greater than itself', spot:'hz727c'}]}, {id:'mirror_queen', n:'The Mirror Queen', intel:[]},
  {id:'endless_winter', n:'The Endless Winter', epithet:'The Winter That Would Not End', loc:'frostveil_village', activeCh:582, resolveCh:608, how:'restored', home:'The Frostveil Range',   // Arc XXIII (design): restored to its place in the seasonal cycle at ch608; chapters not built yet
   original:'Unseasonal snow near the Frostveil Range', revised:{spot:'hz601a', t:'A part of the natural seasonal cycle that lost its way: not a monster, but a body unable to release what it absorbed'}, intel:[
     {label:'Signs', value:'Fires that give no heat; snow falling indoors; metal that freezes at a touch', spot:'hz588a'},
     {label:'Nature', value:'It drains heat from the land around the mountain and its territory is still expanding', spot:'hz589a'},
     {label:'Origin', value:'The winter began when the last seasonal ritual site fell into disuse', spot:'hz590a'},
     {label:'The old rite', value:'No sacrifice was ever required: the old word for life also means living warmth, vital breath or circulating energy', spot:'hz591a'},
     {label:'The cause', value:'It once absorbed excess cold and released it gradually; something broke the cycle and it kept taking more', spot:'hz601a'}]},
  {id:'unchosen_road', n:'The Unchosen Road', epithet:'The Evil of Regret', veiled:true, loc:'border_frontier', activeCh:504, resolveCh:510, how:'destroyed', home:'The Northern Frontier',
   original:'One of the Fifteen: visions and illusions at the northern border', intel:[
     {label:'Domain', value:'Regret, roads not taken, the desire to choose again', spot:'hz504a'},
     {label:'Method', value:'It magnifies what already exists: it cannot create love or regret', spot:'hz504b'},
     {label:'Visions', value:'Real people and possibilities, twisted until they feel touchable', spot:'hz504c'},
     {label:'Weakness', value:'It breaks when the false lives it offers are refused and a real life is chosen', spot:'hz509d'}]},
  {id:'whispering_mask', n:'The Whispering Mask', epithet:'The Evil of Secrets and Shame', veiled:true, activeCh:530, resolveCh:542, how:'purified', home:'Mirelle Veyne\'s network', original:'Unknown: a remaining Evil feeding on secrets', intel:[
     {label:'Domain', value:'Secrets, concealment, shame and the fear of being exposed', spot:'hz530a'},
     {label:'Feeds on', value:'The memories and feelings attached to secrets: shame, fear, regret, desire', spot:'hz529b'},
     {label:'Method', value:'It weaponizes truth: it needs people to be afraid, not for the secret to be true', spot:'hz530c'},
     {label:'Weakness', value:'It gains nothing from a truth with no shame left to feed on', spot:'hz532d'}]},   // Arc XXI (design: secrets, shame, concealment, fear of exposure, weaponized truth); purified and dissolved at ch542 No More Leverage; its ch531 attack on Jade uses only her known memories; chapters not built yet
];
/* ---- Classification (Arc VII): what the investigation has found an entry to be. These are findings, not counters: the case counter above only counts Resolved.
   Restoration is not always possible (the Thorned Widow's corruption could not be undone): the outcome depends on the evidence gathered.
   cls rules: [spot, class]; the last one whose spot is done wins. */
const EVIL_CLASSES = {
  uninvestigated:{icon:'⚪', n:'Uninvestigated', d:'The original Register entry.'},
  hostile:{icon:'🔴', n:'Confirmed Hostile', d:'A dangerous entity that needs intervention.'},
  corrupted:{icon:'🟣', n:'Corrupted', d:'Its original nature is hidden under corruption.'},
  restorable:{icon:'🟢', n:'Restorable', d:'Its original essence can be recovered.'},
  construct:{icon:'🔷', n:'Preservation Construct', d:'An ancient magical system mistaken for an Evil.'},
};
const EVIL_CLS_RULES = {
  sunless_child:[['hz761b','hostile'],['hz775a','corrupted'],['hz780c','construct']],
  weeping_stone:[['hz741a','hostile'],['hz741c','corrupted'],['hz748c','construct'],['hz756b','corrupted'],['hz759b','restorable']],
  ashen_serpent:[['hz716c','hostile'],['hz719b','corrupted'],['hz727c','construct']],
  sky_eater:[['hz692a','hostile'],['hz693c','corrupted']],
  thorned_widow:[['witness_accounts','hostile'],['forest_spirit','corrupted']],
  mourning_hart:[['hart_protective','corrupted'],['hart_motive','restorable']],
  hollow_king:[['present_crimes','hostile']],
  black_tide:[['tide_evidence','hostile'],['tide_layered','corrupted'],['stabilize_network','restorable']],
  drowned_crown:[['crown_warnings','hostile'],['crown_origin','construct']],
  unchosen_road:[['hz504a','hostile']],
  endless_winter:[['hz589a','hostile'],['hz591a','corrupted'],['hz601a','restorable']],
  whispering_mask:[['hz530a','hostile']],
  bone_river:[['hz662d','hostile'],['hz668d','corrupted'],['hz677d','restorable']],
  silent_flame:[['hz638d','hostile'],['hz645c','corrupted'],['hz650d','construct']],
};
function evilClass(e){
  const st = evilState(e); if(st==='unknown') return null;
  let k = 'uninvestigated'; (EVIL_CLS_RULES[e.id]||[]).forEach(r => { if(G.flags['inv_'+r[0]]) k = r[1]; });
  if(st==='reclassified') k = 'construct';
  return k;
}
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
  EVILS.filter(e => e.resolveCh===n).forEach(() => { if(typeof evilReputeDone==='function') evilReputeDone(n); });
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
  st.asked[who] = true; if(typeof standHeard==='function') standHeard(who); const msgs = [(who==='rin'?'Rin':CHARACTERS[who].n.split(' ')[0])+': "'+C.views[who]+'"'];
  if(CHARACTERS[who] && isRecruited(who)){ const m = addBond(who, 5); if(m) msgs.push(m); }
  if(Object.keys(st.asked).length >= C.need && !G.flags['learned_'+id]){ G.flags['learned_'+id] = true; msgs.push('🕯️ Jade has heard enough to decide with open eyes.'); }
  return msgs;
}
function rCounsel(e){
  const C = EVIL_COUNSEL[e.id]; if(!C || G.ch < C.fromCh || EVIL_RESOLVED.includes(evilState(e))) return '';
  const st = counselState(e.id), n = Object.keys(st.asked).length;
  return `<div class="sm" style="margin-top:4px"><b>Ask the party</b> (${n}/${C.need} to be ready): ${C.question}</div><div class="row" style="flex-wrap:wrap;margin:4px 0">${counselWho(e.id).map(w => `<button ${st.asked[w]?'disabled':''} onclick="act(askParty,'${e.id}','${w}')">${st.asked[w]?'✓ ':''}${w==='rin'?'Rin':CHARACTERS[w].n.split(' ')[0]}</button>`).join(' ')}</div>${Object.keys(st.asked).map(w => `<div class="sm">${w==='rin'?'Rin':CHARACTERS[w].n.split(' ')[0]}: “${C.views[w]}”</div>`).join('')}${evilLearned(e.id)?'<div class="sm">✔ Ready to decide.</div>':''}`;
}
function evilClassLine(e, st){
  const k = evilClass(e); if(!k || G.ch < 172) return '';
  const c = EVIL_CLASSES[k], done = EVIL_RESOLVED.includes(st);
  return `<div class="sm"><b>Finding:</b> ${c.icon} ${c.n}${done?` · Outcome: ${EVIL_STATUS[st]} · Case: ✔ Resolved`:''}</div>`;
}
function rRegisterMain(){
  const rows = EVILS.map((e,i) => { const st = evilState(e), intel = evilIntel(e);
    const cls = e.original && st!=='unknown' ? (evilRevised(e) ? `<div class="sm" style="opacity:.6;text-decoration:line-through">Original classification: ${e.original}</div><div class="sm"><b>Revised classification:</b> ${e.revised.t}</div>` : `<div class="sm">Classification: ${e.original}</div>`) : '';
    return `<div class="ev"><div><b>${i+1}. ${e.veiled&&st==='unknown'?'???':e.n}</b>${e.epithet&&G.ch>=162&&st!=='unknown'?` <span class="sm" style="color:var(--gold)">· ${e.epithet}</span>`:''} <span class="sm">· ${EVIL_STATUS[st]}${e.home&&st!=='unknown'?' · '+e.home:''}</span>${cls}${evilClassLine(e, st)}${typeof evilMarksLine==='function' ? evilMarksLine(e) : ''}${rCounsel(e)}${intel.length?`<div class="sm">Classification: ${intel.map(x => x.label+': '+x.value).join(' · ')}${intel.length<e.intel.length?' · '+(e.intel.length-intel.length)+' more to learn':''}</div>`:''}</div></div>`; }).join('');
  const done = evilsResolved(), revised = EVILS.filter(evilRevised).length;
  return `<div class="panel"><b>THE FIFTEEN EVILS</b><div><b>Resolved: ${done} / 15</b> · Remaining: ${15-done} · Unknown classifications: ${G.ch>=EVIL_ARC_END?'?':15-revised}</div>${G.ch>=172?`<div class="sm">Findings: ${Object.keys(EVIL_CLASSES).map(k => EVIL_CLASSES[k].icon+' '+EVIL_CLASSES[k].n).join(' · ')}. A finding is what the investigation has learned; only Resolved cases are counted, and a restoration is only possible where the evidence allows it.</div>`:''}${typeof regMarksLegend==='function' ? regMarksLegend() : ''}<div class="sm">Kept by ${evilKeeper()}. Not "killed": each Evil is destroyed, purified, contained, reconciled or otherwise resolved once Jade has learned what it is. Find them. Understand them. Then decide what must be done.</div>${G.ch>=EVIL_ARC_END?'<div class="sm" style="margin-top:4px"><i>Not every monster was born a monster. Not every victim remained innocent. And not every name history gave them was true.</i></div>':''}</div>${rows}`;
}
function rRegister(){ return rRegisterMain() + (typeof rRegisterBeyond==='function' ? rRegisterBeyond() : ''); }
