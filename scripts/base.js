/* =====================================================================
   TRIBUTE — HOME BASES
   Jade's two homes: Devon's Palace (Dragonvale, from the wedding, ch57) and the Gold Manor (Tribute, from the Gold reunion, ch90).
   A base gives: a free full-recovery rest (1 day), a home-cooked meal (free, bond), the party's talk, and a stash for items.
   Smaller areas use paid taverns/inns instead. State: G.stash = {itemId: qty}
   ===================================================================== */
const BASE_SPOTS = {devon_palace:{loc:'dragon_vale', name:'Devon\'s Palace'}, gold_manor:{loc:'gold_residence', name:'Gold Manor'}};
const baseHere = () => Object.keys(BASE_SPOTS).find(k => BASE_SPOTS[k].loc===G.loc && G.ch >= (spotById(k).ch||0));
function stash(){ if(!G.stash) G.stash = {}; return G.stash; }
function baseRest(){
  restoreParty();
  const b = BASE_SPOTS[baseHere()], msgs = ['🏡 You sleep soundly in '+(b?b.name:'your own bed')+'. HP and MP fully restored. (free)'];
  if(typeof banterLines==='function') banterLines('rest', .7).forEach(m => msgs.push(m));
  if(typeof momentLines==='function') momentLines(.45).forEach(m => msgs.push(m));
  return msgs.concat(advanceDay(1));
}
function baseMeal(){
  if(G.bondDay['base_meal_'+G.loc] === G.day) return ['A home-cooked meal today already.'];
  G.bondDay['base_meal_'+G.loc] = G.day;
  const msgs = ['🍲 A home-cooked meal. Bond +3 for the whole party.'];
  G.party.forEach(id => { if(id==='jade' || isCompanion(id)) return; const m = addBond(id, 3); if(m) msgs.push(m); });
  if(typeof banterLines==='function') banterLines('rest', .5).forEach(m => msgs.push(m));
  return msgs;
}
const stashable = k => ITEMS[k] && ITEMS[k].type!=='quest' && (G.inv[k]||0) > 0;
function stashPut(k, all){ if(!stashable(k)) return []; const n = all ? G.inv[k] : 1; G.inv[k] -= n; stash()[k] = (stash()[k]||0) + n; return []; }
function stashTake(k, all){ const s = stash(); if(!(s[k]>0)) return []; const n = all ? s[k] : 1; s[k] -= n; if(s[k]<=0) delete s[k]; G.inv[k] = (G.inv[k]||0) + n; return []; }
/* HOME MEMORIES (from Crimson Tide's settlement memories): small permanent details that appear in a home as the story and bonds move. Each is tied to
   real game state, revealed once (stored in G.homeMem with the day) and written to the Chronicle. Wording is first-pass: edit freely. */
const HOME_MEMORIES = [
  {id:'gm_room', home:'gold_manor', t:'One room in the Gold Manor is plainly Jade\'s now, though nobody remembers deciding it.', if:() => G.ch >= 90},
  {id:'gm_herbs', home:'gold_manor', t:'A shelf of labelled herb jars has appeared by the window, in two different handwritings.', if:() => !!G.flags.ghost_gifted},
  {id:'gm_stool', home:'gold_manor', t:'An extra stool has been added to the kitchen table. It is never put away.', if:() => typeof trackTier==='function' && trackTier('circle') >= 2},
  {id:'gm_tea', home:'gold_manor', t:'A tea set that nobody owned before Sera arrived now has a shelf of its own.', if:() => typeof trackTier==='function' && trackTier('sera_circle') >= 2},
  {id:'gm_ledger', home:'gold_manor', t:'Adrian\'s ledgers have taken over the end of the long table, and his chair has acquired a cushion.', if:() => typeof relTier==='function' && G.ch>=90 && relTier('adrian') >= 3},
  {id:'gm_thorn', home:'gold_manor', t:'A pressed thorn-flower sits in a dish by the door, brought back from the forest.', if:() => typeof evilsResolved==='function' && evilsResolved() >= 1},
  {id:'gm_keepsakes', home:'gold_manor', t:'The wall by the stairs is filling with small keepsakes: tickets, ribbons, a pressed leaf.', if:() => (G.moments||[]).length >= 15},
  {id:'dp_desks', home:'devon_palace', t:'Devon\'s study has two desks now, and only one of them is tidy.', if:() => G.ch >= 57},
  {id:'dp_yard', home:'devon_palace', t:'The practice yard behind the palace has a worn patch where two pairs of feet keep rehearsing the same turn.', if:() => typeof trackTier==='function' && trackTier('jade_devon') >= 2},
  {id:'dp_liora', home:'devon_palace', t:'Liora\'s embroidery hangs in the east corridor, a little crooked and much admired.', if:() => !!G.flags.liora_apart},
  {id:'dp_box', home:'devon_palace', t:'A lacquered box from King Chadstone sits on the mantel, unopened, because it is the thought that counts.', if:() => typeof relTier==='function' && G.ch>=50 && relTier('chadstone') >= 3},
  {id:'dp_keepsakes', home:'devon_palace', t:'A corner of the palace sitting room has become where everyone ends up after dinner.', if:() => (G.moments||[]).length >= 10},
];
function syncHomeMemories(){
  if(!G.homeMem) G.homeMem = {};
  HOME_MEMORIES.forEach(m => { if(!G.homeMem[m.id] && m.if()){ G.homeMem[m.id] = G.day; if(typeof chronicle==='function') chronicle(m.t, '🏡'); } });
}
const homeMemoriesFor = home => { syncHomeMemories(); return HOME_MEMORIES.filter(m => m.home===home && G.homeMem[m.id]); };
function rBase(){
  const s = stash(), mine = Object.keys(G.inv).filter(stashable), kept = Object.keys(s);
  const row = (k, n, fn) => `<div class="ev"><div><b>${ITEMS[k].icon} ${ITEMS[k].n}</b> <span class="sm">×${n}</span></div><div><button onclick="act(${fn},'${k}',false)">1</button><button onclick="act(${fn},'${k}',true)">All</button></div></div>`;
  const mem = homeMemoriesFor(baseHere());
  return `<div class="panel"><div class="sm">Your home. Resting here is free. Day ${G.day}.</div>${mem.length?`<div class="sm" style="margin:6px 0"><b>Memories of this home</b> (${mem.length}/${HOME_MEMORIES.filter(m => m.home===baseHere()).length})${mem.map(m => '<div>🏡 '+m.t+'</div>').join('')}</div>`:''}
    <button class="pri" onclick="act(baseRest)">🛏️ Rest (free, full recovery, 1 day)</button><button onclick="act(baseMeal)">🍲 Home-cooked meal (free, bond)</button><button onclick="act(chatParty)">🗣️ Listen to the party</button></div>
    <h4>📦 Stash</h4><div class="sm">Keep items safe here. Quest items cannot be stashed.</div>
    <div class="sm" style="margin-top:6px"><b>In the stash</b></div>${kept.map(k => row(k, s[k], 'stashTake')).join('') || '<div class="sm">Empty.</div>'}
    <div class="sm" style="margin-top:6px"><b>In your pack</b></div>${mine.map(k => row(k, G.inv[k], 'stashPut')).join('') || '<div class="sm">Nothing to store.</div>'}`;
}
