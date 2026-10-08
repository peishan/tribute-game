/* =====================================================================
   TRIBUTE — THE FIFTEEN EVILS (Arc VI)
   Register of the Fifteen Evils of Tribute (Imperial Network, from ch147). The counter is "Resolved: X/15", never "Killed":
   each Evil can be destroyed, purified, contained or otherwise resolved. How it is resolved is decided by Jade in the story once
   the evidence is in (resolveEvil(id, how) is called by that chapter). Investigation spots fill the Classification meter.
   State: G.evils = { id: { state } }.   Values marked (design) are the author's example values, not canon until the hunt's chapters.
   ===================================================================== */
const EVIL_STATUS = {unknown:'Unknown', active:'Active', investigating:'Investigating', corrupted:'Corrupted', guardian:'Guardian', contained:'Contained', purified:'Purified', destroyed:'Destroyed', resolved:'Resolved'};
const EVIL_RESOLVED = ['contained','purified','destroyed','resolved'];
const EVILS = [
  {id:'thorned_widow', n:'The Thorned Widow', activeCh:148, resolveCh:152, how:'resolved', home:'The Black Forest', intel:[
     {label:'Threat to Civilians', value:'Critical', spot:'witness_accounts'},
     {label:'Corruption', value:'High', spot:'forest_physical'},
     {label:'Spiritual Origin', value:'Confirmed', spot:'forest_spirit'},
     {label:'Sentience', value:'Low', spot:'first_evil_search'},
     {label:'Origin', value:'A guardian spirit of the forest', spot:'widow_origin'}]},
  {id:'mourning_hart', n:'The Mourning Hart', activeCh:153, home:'Mourning Valley', intel:[
     {label:'Corruption', value:'Low', spot:'hart_protective'},
     {label:'Guardian Behaviour', value:'Confirmed', spot:'hart_shrine'},
     {label:'Threat', value:'Territorial', spot:'treasure_seekers'},
     {label:'Sentience', value:'High', spot:'hart_motive'}]},
  {id:'hollow_king', n:'The Hollow King', home:'The Crownless Marches (not yet reached)', intel:[]},
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
const evilsResolved = () => EVILS.filter(e => EVIL_RESOLVED.includes(evilState(e))).length;
function resolveEvil(id, how){
  const e = EVILS.find(x => x.id===id); if(!e || !EVIL_STATUS[how]) return [];
  if(!G.evils) G.evils = {};
  G.evils[id] = {state:how}; save();
  return [EVIL_RESOLVED.includes(how) ? '✔ '+e.n+': '+EVIL_STATUS[how]+'. Resolved '+evilsResolved()+'/15.' : e.n+': '+EVIL_STATUS[how]+'.'];
}
function rRegister(){
  const rows = EVILS.map((e,i) => { const st = evilState(e), intel = evilIntel(e);
    return `<div class="ev"><div><b>${i+1}. ${e.hidden?'???':e.n}</b> <span class="sm">· ${EVIL_STATUS[st]}${e.home&&st!=='unknown'?' · '+e.home:''}</span>${intel.length?`<div class="sm">Classification: ${intel.map(x => x.label+': '+x.value).join(' · ')}${intel.length<e.intel.length?' · '+(e.intel.length-intel.length)+' more to learn':''}</div>`:''}</div></div>`; }).join('');
  return `<div class="panel"><b>Resolved: ${evilsResolved()}/15</b><div class="sm">Not "killed": each Evil is destroyed, purified, contained or otherwise resolved once Jade has learned what it is.</div></div>${rows}`;
}
