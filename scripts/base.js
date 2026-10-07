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
function rBase(){
  const s = stash(), mine = Object.keys(G.inv).filter(stashable), kept = Object.keys(s);
  const row = (k, n, fn) => `<div class="ev"><div><b>${ITEMS[k].icon} ${ITEMS[k].n}</b> <span class="sm">×${n}</span></div><div><button onclick="act(${fn},'${k}',false)">1</button><button onclick="act(${fn},'${k}',true)">All</button></div></div>`;
  return `<div class="panel"><div class="sm">Your home. Resting here is free. Day ${G.day}.</div>
    <button class="pri" onclick="act(baseRest)">🛏️ Rest (free, full recovery, 1 day)</button><button onclick="act(baseMeal)">🍲 Home-cooked meal (free, bond)</button><button onclick="act(chatParty)">🗣️ Listen to the party</button></div>
    <h4>📦 Stash</h4><div class="sm">Keep items safe here. Quest items cannot be stashed.</div>
    <div class="sm" style="margin-top:6px"><b>In the stash</b></div>${kept.map(k => row(k, s[k], 'stashTake')).join('') || '<div class="sm">Empty.</div>'}
    <div class="sm" style="margin-top:6px"><b>In your pack</b></div>${mine.map(k => row(k, G.inv[k], 'stashPut')).join('') || '<div class="sm">Nothing to store.</div>'}`;
}
