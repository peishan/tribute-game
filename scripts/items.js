/* =====================================================================
   TRIBUTE — PERSISTENT HP/MP + CONSUMABLES
   Heroes keep their HP/MP between real battles (U(id).hp / U(id).mp; undefined = full).
   Sandbox (Training Room) battles do not change them. A hero who falls is left at 20% HP.
   Recovery: inn rest (gold, full), potions/tonics, +10% per travel/rest day, and the shop.
   Consumables can be used from the Items tab or in battle (Items action, costs the turn).
   Numbers and prices are PROVISIONAL.
   ===================================================================== */
const USE = {
  herbal_tonic:{hp:70},
  moon_tonic:{hp:220},
  purify_elixir:{hp:30, cleanse:true},
  spirit_potion:{mp:60},
  dragon_remedy:{hp:9999, mp:9999, cleanse:true},
};
Object.assign(ITEMS, {
  moon_tonic:{n:'Moon Healing Tonic',icon:'🌙',type:'consumable',rarity:'uncommon'},
  purify_elixir:{n:'Purification Elixir',icon:'🧪',type:'consumable',rarity:'uncommon'},
  spirit_potion:{n:'Spirit Restoration Potion',icon:'🔷',type:'consumable',rarity:'uncommon'},
  dragon_remedy:{n:'Dragon Blood Remedy',icon:'🐉',type:'consumable',rarity:'epic'},
});
const CONSUMABLE_SHOP = {herbal_tonic:30, moon_tonic:90, purify_elixir:70, spirit_potion:60};
const useText = u => [u.hp&&(u.hp>=9999?'full HP':'+'+u.hp+' HP'), u.mp&&(u.mp>=9999?'full MP':'+'+u.mp+' MP'), u.cleanse&&'cleanses'].filter(Boolean).join(', ');

const curHp = id => { const m = statsOf(id).hp, v = U(id).hp; return v===undefined ? m : clamp(v,0,m); };
const curMp = id => { const m = statsOf(id).mp, v = U(id).mp; return v===undefined ? m : clamp(v,0,m); };
function healUnit(id, hp, mp){ const s = statsOf(id); U(id).hp = Math.min(s.hp, curHp(id)+(hp||0)); U(id).mp = Math.min(s.mp, curMp(id)+(mp||0)); }
function healParty(frac){ G.party.forEach(id => { const s = statsOf(id); healUnit(id, Math.round(s.hp*frac), Math.round(s.mp*frac)); }); }
function restoreParty(){ G.party.forEach(id => { U(id).hp = undefined; U(id).mp = undefined; }); }
function persistBattle(){
  if(!B || !B.spec.rewards) return;
  B.allies.forEach(a => { const u = U(a.id); if(!u) return; u.hp = a.dead ? Math.max(1, Math.round(a.mhp*.2)) : a.hp; u.mp = a.mp; });
}
const REST_COST = () => 10 + avgPartyLv()*2;
function restAtInn(){
  const c = REST_COST(); if(G.gold < c) return ['A bed costs '+c+' gold.'];
  G.gold -= c; restoreParty();
  return ['🛏️ The party sleeps soundly. HP and MP fully restored. (-'+c+'g)'].concat(typeof banterLines==='function' ? banterLines('rest', .6) : [], advanceDay(1));
}
function useConsumable(id, k){
  const u = USE[k]; if(!u || !(G.inv[k] > 0)) return false;
  G.inv[k]--; healUnit(id, u.hp, u.mp); save(); return true;
}
function brewTonic(){
  if((G.inv.forest_herb||0) < 3) return ['Brewing a tonic needs 3 Faepool Herbs.'];
  G.inv.forest_herb -= 3; addItems([{id:'herbal_tonic', qty:1}]); save();
  return ['🍵 You brew a Herbal Tonic from 3 herbs.'];
}
function buyConsumable(k){
  const p = CONSUMABLE_SHOP[k]; if(!p || G.gold < p || !isSettlement(G.loc)) return false;
  G.gold -= p; G.inv[k] = (G.inv[k]||0)+1; save(); return true;
}

/* ---- Royal Healing Pavilion (Jenika Moon, Dragonvale) ---- */
const RECIPES = [
  {out:'dragon_prince_blade', need:{dark_essence:5, dragon_crystal:3, royal_sigil:2, shadow_steel:1}, gold:400},
  {out:'moon_tonic', need:{forest_herb:4}, gold:20},
  {out:'purify_elixir', need:{forest_herb:2, demon_ash:1}, gold:25},
  {out:'spirit_potion', need:{forest_herb:2, xima_shard:1}, gold:30},
  {out:'dragon_remedy', need:{drake_scale:2, relic_dust:2}, gold:150},
];
function pavilionRest(){
  if(G.bondDay.pavilion === G.day) return ['Jenika has already tended you today.'];
  G.bondDay.pavilion = G.day; restoreParty();
  return ['🌙 Jenika tends the party. HP and MP fully restored.'].concat(advanceDay(0));
}
function fireflyRest(){
  if(G.bondDay.fireflies === G.day) return ['You have already rested in the cavern today.'];
  G.bondDay.fireflies = G.day; restoreParty();
  return ['✨ The spirit fireflies glow softly. HP and MP fully restored.'].concat(advanceDay(0));
}
function craftAt(out){
  const r = RECIPES.find(x => x.out===out); if(!r) return [];
  if(G.gold < r.gold || !Object.keys(r.need).every(k => (G.inv[k]||0) >= r.need[k])) return ['Not enough materials or gold.'];
  Object.keys(r.need).forEach(k => G.inv[k] -= r.need[k]); G.gold -= r.gold; addItems([{id:out, qty:1}]); save();
  return ['⚗️ Jenika crafts '+ITEMS[out].icon+' '+ITEMS[out].n+'.'];
}

/* ---- in-battle item use ---- */
function battleItems(){ return Object.keys(USE).filter(k => (G.inv[k]||0) > 0 || (B && !B.spec.rewards)).map(k => ({id:k, n:ITEMS[k].n, icon:ITEMS[k].icon, qty:G.inv[k]||0, text:useText(USE[k])})); }
function battleUseItem(u, k, t){
  const e = USE[k]; if(!e || !t) return false;
  if(B.spec.rewards){ if(!(G.inv[k] > 0)) return false; G.inv[k]--; }
  if(e.hp){ const h = Math.min(e.hp, t.mhp - t.hp); t.hp += h; blog(u.name+' uses '+ITEMS[k].n+' on '+t.name+': +'+h+' HP.','good'); }
  if(e.mp){ const m = Math.min(e.mp, t.mmp - t.mp); t.mp += m; blog('  '+t.name+' regains '+m+' MP.','good'); }
  if(e.cleanse) applyFx(u, t, {k:'cleanse'});
  return true;
}
