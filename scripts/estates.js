/* =====================================================================
   TRIBUTE — THE ESTATES (wings for Jade's two homes) AND RENOWN RANKS (the Phoenix Guard ladder)
   From Crimson Tide's building upgrades and renown ladder, reframed for Tribute.
   ESTATES: Gold Manor (from ch90) and Devon's Palace (from ch57) each have five wings, levels 0–5. A level costs gold plus materials from the new loot
   (so exploring feeds the house), and is bought while you are at that home. Effects are small and use systems that already exist:
     Study → +XP from missions/investigations · Stables → cheaper fares · Workshop → cheaper crafting
     Apothecary → herbs, once a day at that home · Training Yard → a little XP for the party, once a day at that home
   Each wing has a tender (a named person from the story) and five names for its levels. TENDERS AND NAMES ARE FIRST-PASS: edit freely.
   RENOWN: G.rep (already earned from contracts) gives a rank. Ranks are invented Phoenix Guard titles; each adds +1% XP and, from rank 2, +1% gold.
   State: G.estate = {estateId:{wing:level}}, G.rankDone = highest rank announced.  Nothing is ever lost or lowered.
   ===================================================================== */
const ESTATES = {
  gold_manor:   {n:'Gold Manor', fromCh:90, tend:{study:'Adrian', apothecary:'Unique Gold', workshop:'Ripley', stables:'Elara Valor', yard:'Chadstone'}},
  devon_palace: {n:'Devon\'s Palace', fromCh:57, tend:{study:'Devon', apothecary:'Jenika', workshop:'Aster', stables:'Liora\'s grooms', yard:'Captain of the Palace Guard'}},
};
const WINGS = {
  study:      {n:'Study', icon:'📚', names:['Reading Nook','Study','Records Room','Scriptorium','Hall of Letters'], d:'+1% XP from missions and investigations per level', mats:['archive_ink','seal_dust']},
  apothecary: {n:'Apothecary', icon:'🌿', names:['Herb Shelf','Still Room','Apothecary','Physic Garden','Healing House'], d:'Once a day at this home: gather herbs (more with each level)', mats:['healer_seed','moonroot']},
  workshop:   {n:'Workshop', icon:'⚒️', names:['Workbench','Forge Corner','Workshop','Artisans\' Hall','Master Forge'], d:'Crafting costs 6% less gold per level', mats:['thorn_resin','battlefield_relic']},
  stables:    {n:'Stables', icon:'🐴', names:['Hitching Post','Stable','Coach House','Road Stables','Royal Mews'], d:'Travel fares 2% lower per level', mats:['frontier_hide','spirit_thread']},
  yard:       {n:'Training Yard', icon:'🥋', names:['Sparring Patch','Practice Yard','Drill Court','Warriors\' Court','Phoenix Yard'], d:'Once a day at this home: the party trains (a little XP, more with each level)', mats:['battlefield_relic','drake_scale']},
};
const WING_IDS = Object.keys(WINGS), WING_MAX = 5;
const estateOpen = id => G.ch >= ESTATES[id].fromCh;
const estLv = (id, w) => ((G.estate||{})[id]||{})[w] || 0;
const wingTotal = w => Object.keys(ESTATES).reduce((s, id) => s + estLv(id, w), 0);
function wingCost(w, L){   // cost of reaching level L
  const m = WINGS[w].mats, need = {}; need[m[0]] = L+1; if(L >= 3) need[m[1]] = L-2; if(L === 5) need.celestial_shard = 1;
  return {gold:100*L*L, need};
}
const costText = c => c.gold+'g' + Object.keys(c.need).map(k => ' · '+ITEMS[k].icon+' '+ITEMS[k].n+' ×'+c.need[k]).join('');
function estatePerk(key){
  if(!G || !G.estate) return 0;
  if(key==='xpBonus') return .01*wingTotal('study');
  if(key==='fareOff') return .02*wingTotal('stables');
  if(key==='craftOff') return Math.min(.4, .06*wingTotal('workshop'));
  return 0;
}
const craftCost = r => Math.ceil(r.gold * (1 - Math.min(.4, estatePerk('craftOff'))));
function estateUpgrade(id, w){
  if(!estateOpen(id) || baseHere()!==id) return ['You must be at '+ESTATES[id].n+' to build there.'];
  const L = estLv(id, w) + 1; if(L > WING_MAX) return ['That wing is complete.'];
  const c = wingCost(w, L);
  if(G.gold < c.gold || !Object.keys(c.need).every(k => (G.inv[k]||0) >= c.need[k])) return ['Not enough gold or materials.'];
  G.gold -= c.gold; Object.keys(c.need).forEach(k => G.inv[k] -= c.need[k]);
  if(!G.estate) G.estate = {}; if(!G.estate[id]) G.estate[id] = {}; G.estate[id][w] = L;
  const t = ESTATES[id].tend[w], line = WINGS[w].names[L-1]+' at '+ESTATES[id].n+' (tended by '+t+')';
  chronicle((L===1 ? 'Built: ' : 'Improved: ')+line+'.', '🏡'); save();
  return ['🏡 '+(L===1?'Built':'Improved')+': '+WINGS[w].icon+' '+line+'.'];
}
function estateClaim(id, w){
  if(baseHere()!==id || !estLv(id, w)) return [];
  const key = 'est_'+id+'_'+w; if(G.bondDay[key] === G.day) return ['Already done here today.'];
  G.bondDay[key] = G.day; const L = estLv(id, w), t = ESTATES[id].tend[w];
  if(w === 'apothecary'){
    const items = [{id:'forest_herb', qty:1+L}]; if(L >= 4) items.push({id:'moonroot', qty:1}); addItems(items); save();
    return ['🌿 '+t+' has gathered '+items.map(d => ITEMS[d.id].icon+' '+ITEMS[d.id].n+' ×'+d.qty).join(', ')+'.'];
  }
  const msgs = ['🥋 '+t+' runs the party through drills.']; gainXp(15 + 10*L, G.party).forEach(m => msgs.push(m)); save(); return msgs;
}
function rEstates(){
  const id = baseHere(); if(!id || !estateOpen(id)) return '';
  const rows = WING_IDS.map(w => {
    const L = estLv(id, w), W = WINGS[w], next = L < WING_MAX ? wingCost(w, L+1) : null, ok = next && G.gold >= next.gold && Object.keys(next.need).every(k => (G.inv[k]||0) >= next.need[k]);
    const claim = (w==='apothecary' || w==='yard') && L ? `<button ${G.bondDay['est_'+id+'_'+w]===G.day?'disabled':''} onclick="act(estateClaim,'${id}','${w}')">${w==='yard'?'Train':'Gather'}</button>` : '';
    return `<div class="ev"><div><b>${W.icon} ${L?W.names[L-1]:W.n}</b> <span class="sm">Lv ${L}/${WING_MAX} · tended by ${ESTATES[id].tend[w]}</span><div class="sm">${W.d}</div>${next?`<div class="sm">Next, ${W.names[L]}: ${costText(next)}</div>`:''}</div><div>${claim}${next?`<button ${ok?'':'disabled'} onclick="act(estateUpgrade,'${id}','${w}')">${L?'Improve':'Build'}</button>`:''}</div></div>`; }).join('');
  return `<h4>🏗️ The house and its wings</h4><div class="sm">Wings are paid for with gold and the materials found while exploring. Their effects are small, and apply wherever you are.</div>${rows}`;
}
/* ---------------- RENOWN RANKS ---------------- */
const RANKS = [
  {at:0,    n:'Sworn Aspirant'}, {at:60,   n:'Phoenix Guard'}, {at:250,  n:'Sergeant of the Flame'}, {at:700,  n:'Ember Captain'},
  {at:1800, n:'Warden of the Roads'}, {at:3500, n:'Hand of the Phoenix'}, {at:6000, n:'Flame Marshal'}, {at:8500, n:'Protector of Tribute'},
];
const rankIdx = () => { let r = 0; RANKS.forEach((k, i) => { if(G.rep >= k.at) r = i; }); return r; };
const rankPerk = key => !G ? 0 : key==='xpBonus' ? .01*rankIdx() : key==='goldBonus' ? .01*Math.max(0, rankIdx()-1) : 0;
function rankLine(){
  const i = rankIdx(), nx = RANKS[i+1];
  return '🔥 '+RANKS[i].n+(nx ? ' · '+(nx.at-G.rep)+' renown to '+nx.n : ' · the highest rank')+(i ? ' · +'+i+'% XP'+(i>1?', +'+(i-1)+'% gold':'') : '');
}
function renownSync(){   // announce ranks reached, once each; a save that is already far along gets one quiet line
  if(!G || typeof G.rep !== 'number') return;
  const i = rankIdx(), done = G.rankDone || 0; if(i <= done) return;
  G.rankDone = i;
  if(i - done > 1) chronicle('Renown has grown to the rank of '+RANKS[i].n+'.', '🔥'); else chronicle('Rank gained in the Phoenix Guard: '+RANKS[i].n+'.', '🔥');
  toast('🔥 Rank: '+RANKS[i].n); save();
}
RANKS.forEach((k, i) => { if(i) deed('rank'+i, 'world', 'Rank: '+k.n, '🔥', 'Your renown earned the rank of '+k.n+'.', () => rankIdx() >= i); });
deed('est1', 'home', 'Something built', '🏗️', 'A wing was built at one of your homes.', () => Object.keys(ESTATES).some(id => WING_IDS.some(w => estLv(id, w) >= 1)));
deed('est5', 'home', 'A fine house', '🏗️', 'A wing reached its highest level.', () => Object.keys(ESTATES).some(id => WING_IDS.some(w => estLv(id, w) >= WING_MAX)));
deed('estall', 'home', 'A house complete', '🏗️', 'Every wing of one home reached its highest level.', () => Object.keys(ESTATES).some(id => WING_IDS.every(w => estLv(id, w) >= WING_MAX)));
