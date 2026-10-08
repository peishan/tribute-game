/* =====================================================================
   TRIBUTE — GEAR: equipment slots (weapon / armor / accessory), stat bonuses, shop.
   Gear items live in ITEMS (enemies.js, type 'gear'); their stats are in GEAR below.
   gearBonus(id) in core.js reads this. Equipping takes the item out of the pack.
   Optional `for:[heroIds]` limits who may use it; `flag` seals it until a story flag is set.
   Shops open in settlements (hub / town / harbour). ALL numbers and prices are PROVISIONAL.
   ===================================================================== */
const SLOTS = [['weapon','⚔️ Weapon'],['armor','🛡️ Armor'],['accessory','📿 Accessory'],['charm','🧿 Charm (a second accessory)']];
const slotKind = slot => slot==='charm' ? 'accessory' : slot;   // the charm slot takes accessory-type items
const GEAR = {
  // ---- drops (already in ITEMS) ----
  chiefs_cleaver:{bonus:{atk:6}, for:['chad']},
  greyson_dagger:{bonus:{atk:8,spd:2}, for:['jade'], flag:'greyson_arms'},
  greyson_flail:{bonus:{atk:6,def:3}, for:['jade'], flag:'greyson_arms'},
  venomed_cloak:{bonus:{def:4,spd:3}},
  warden_sigil:{bonus:{mag:5,def:3}},
  mahan_crown:{bonus:{hp:20,atk:3}},
  cultist_robe:{bonus:{def:5,mag:3}},
  wardens_lantern:{bonus:{mag:5,hp:20,spd:2}},
  ridge_cloak:{bonus:{def:6,spd:2}},
  bandit_lords_blade:{bonus:{atk:8}, for:['chad','jade']},
  minion_sigil:{bonus:{mag:3,hp:10}},
  mouse_charm:{bonus:{spd:3,atk:2}},
  // ---- Jade's attires (ch58): Daily Royal Attire and the Phoenix Guard mission / battle attire ----
  royal_attire:{n:'Daily Royal Attire',icon:'👘',slot:'armor',rarity:'rare',bonus:{hp:20,mag:4,def:3},for:['jade']},
  phoenix_guard:{n:'Phoenix Guard Attire',icon:'🔥',slot:'armor',rarity:'epic',bonus:{hp:30,def:8,atk:3},for:['jade']},
  // ---- Sky's recovery gear (ch87; he has had it since his recovery in Dragonvale) ----
  skyward_staff:{n:'Skyward Spirit Staff',icon:'🪄',slot:'weapon',rarity:'rare',bonus:{mag:9,mp:15},for:['sky']},
  healers_robes:{n:'Dragonvale Healer\'s Robes',icon:'🥼',slot:'armor',rarity:'rare',bonus:{def:6,hp:25,mag:3},for:['sky']},
  childhood_charm:{n:'Childhood Flower Charm',icon:'🌸',slot:'accessory',rarity:'rare',bonus:{hp:20,def:3,mag:2},for:['jade']},
  // ---- Guardian Raid rewards (Roc's arc) ----
  shadow_mail:{n:'Shadow Mail',icon:'🛡️',slot:'armor',rarity:'epic',bonus:{def:9,hp:30,spd:2}},
  forgotten_crown:{n:'Crown of the Forgotten Prince',icon:'🥀',slot:'accessory',rarity:'epic',bonus:{atk:4,mag:4,hp:20,spd:2}},
  dragon_prince_blade:{n:'Dragon Prince\'s Blade',icon:'🗡️',slot:'weapon',rarity:'epic',bonus:{atk:15,spd:3,hp:15},for:['chad']},
  yvette_ornament:{n:'Yvette\'s Hair Ornament',icon:'🌸',slot:'accessory',rarity:'epic',bonus:{mag:6,hp:30,mp:20}},
  // ---- shop ----
  ash_bow:{n:'Ash Bow',icon:'🏹',slot:'weapon',rarity:'common',price:90,bonus:{atk:3,spd:1},for:['jade']},
  braided_whip:{n:'Braided Whip',icon:'🪢',slot:'weapon',rarity:'common',price:90,bonus:{atk:3,spd:1},for:['jade']},
  iron_sword:{n:'Iron Sword',icon:'🗡️',slot:'weapon',rarity:'common',price:100,bonus:{atk:4},for:['chad']},
  oak_staff:{n:'Oak Spirit Staff',icon:'🪄',slot:'weapon',rarity:'common',price:90,bonus:{mag:4},for:['sky']},
  silk_fans:{n:'Silk Fans',icon:'🪭',slot:'weapon',rarity:'common',price:90,bonus:{atk:2,spd:3},for:['sally']},
  light_crossbow:{n:'Light Crossbow',icon:'🎯',slot:'weapon',rarity:'common',price:100,bonus:{atk:4},for:['levi']},
  scholar_steel:{n:'Scholar\'s Steel',icon:'📖',slot:'weapon',rarity:'common',price:100,bonus:{atk:2,mag:2},for:['devon']},
  padded_vest:{n:'Padded Vest',icon:'🦺',slot:'armor',rarity:'common',price:60,bonus:{def:3,hp:10}},
  traveler_guard:{n:'Traveler Guard',icon:'🧥',slot:'armor',rarity:'uncommon',price:140,bonus:{def:5,hp:15}},
  traveler_charm:{n:'Traveler Charm',icon:'🧿',slot:'accessory',rarity:'common',price:70,bonus:{hp:15}},
  jade_charm:{n:'Jade Charm',icon:'🪬',slot:'accessory',rarity:'uncommon',price:110,bonus:{mp:10,mag:2}},
  swift_anklet:{n:'Swift Anklet',icon:'📿',slot:'accessory',rarity:'uncommon',price:110,bonus:{spd:4}},
};
Object.keys(GEAR).forEach(k => { const g = GEAR[k]; if(g.n && !ITEMS[k]) ITEMS[k] = {n:g.n, icon:g.icon, type:'gear', slot:g.slot, rarity:g.rarity}; });
const SHOP = Object.keys(GEAR).filter(k => GEAR[k].price);
const gearPrice = k => GEAR[k].price || ({common:40,uncommon:80,rare:160,epic:300}[ITEMS[k].rarity] || 50);
const bonusText = b => Object.keys(b).map(s => '+'+b[s]+' '+STAT_NAME[s]).join(', ');

function gearOf(id){ G.gear = G.gear || {}; return G.gear[id] = G.gear[id] || {weapon:null, armor:null, accessory:null, charm:null}; }
function gearBonusSum(id){
  const out = {hp:0,mp:0,atk:0,mag:0,def:0,spd:0}, g = gearOf(id);
  Object.keys(g).forEach(slot => { const k = g[slot]; if(k && GEAR[k]) Object.keys(GEAR[k].bonus).forEach(s => out[s] += GEAR[k].bonus[s]); });
  return out;
}
function canEquip(id, k){
  const g = GEAR[k], it = ITEMS[k];
  if(!g || !it) return 'Not equipment';
  if(g.for && !g.for.includes(id)) return 'Not usable by '+CHARACTERS[id].n.split(' ')[0];
  if(g.flag && !G.flags[g.flag]) return 'Sealed until the major battle';
  return '';
}
function equipItem(id, k, target){
  if(canEquip(id,k) || !(G.inv[k] > 0)) return false;
  const slot = target && slotKind(target)===ITEMS[k].slot ? target : ITEMS[k].slot, cur = gearOf(id)[slot];
  if(cur) G.inv[cur] = (G.inv[cur]||0) + 1;
  G.inv[k]--; gearOf(id)[slot] = k; save(); return true;
}
function unequipSlot(id, slot){
  const cur = gearOf(id)[slot]; if(!cur) return;
  G.inv[cur] = (G.inv[cur]||0) + 1; gearOf(id)[slot] = null; save();
}
function buyGear(k){
  const p = gearPrice(k); if(G.gold < p || !isSettlement(G.loc)) return false;
  G.gold -= p; G.inv[k] = (G.inv[k]||0) + 1; save(); return true;
}
function sellGear(k){
  if(!(G.inv[k] > 0)) return false;
  G.inv[k]--; G.gold += Math.floor(gearPrice(k)/2); save(); return true;
}

/* ---------------- UI ---------------- */
let gearSel = 'jade', gearSub = 'equip';
function rGear(){
  const heroes = G.party.filter(id => !CHARACTERS[id].placeholder && !CHARACTERS[id].companion);
  if(!heroes.includes(gearSel)) gearSel = heroes[0];
  const tabs = [['equip','Equip'],['shop','Shop']].map(([k,l]) => `<button class="${gearSub===k?'pri':''}" onclick="gearSub='${k}';render()">${l}</button>`).join('');
  return `<h2>🛡️ Gear</h2>${flashHtml()}<div class="row">${tabs}</div>${gearSub==='shop' ? rShop() : rEquip(heroes)}`;
}
function rEquip(heroes){
  const pick = `<div class="rcs" style="margin:6px 0">${heroes.map(id => `<div class="rc ${gearSel===id?'sel':''}" onclick="gearSel='${id}';render()"><img src="${portrait(id)}"><b>${CHARACTERS[id].n.split(' ')[0]}</b></div>`).join('')}</div>`;
  const id = gearSel, st = statsOf(id), gb = gearBonusSum(id), g = gearOf(id);
  const stats = STATS.map(s => `<div class="st"><span>${STAT_NAME[s]}</span>${bar(st[s],STAT_SCALE[s],s)}<b>${st[s]}${gb[s]?` <span class="sm" style="color:var(--green)">(+${gb[s]})</span>`:''}</b></div>`).join('');
  const slots = SLOTS.map(([slot,label]) => {
    const cur = g[slot], opts = Object.keys(G.inv).filter(k => G.inv[k] > 0 && ITEMS[k] && ITEMS[k].type==='gear' && ITEMS[k].slot===slotKind(slot) && GEAR[k]);
    const list = opts.map(k => { const why = canEquip(id,k); return `<div class="ev ${why?'locked':''}"><div><b>${ITEMS[k].icon} ${ITEMS[k].n}</b> <span class="sm">×${G.inv[k]} · ${bonusText(GEAR[k].bonus)}</span>${why?`<div class="sm">🔒 ${why}</div>`:''}</div>${why?'':`<button onclick="act(()=>{equipItem('${id}','${k}','${slot}');return []})">Equip</button>`}</div>`; }).join('');
    return `<h4>${label}</h4>${cur?`<div class="ev taken"><div><b>${ITEMS[cur].icon} ${ITEMS[cur].n}</b><div class="sm">${bonusText(GEAR[cur].bonus)}</div></div><button onclick="unequipSlot('${id}','${slot}');render()">Unequip</button></div>`:'<div class="sm">Empty</div>'}${list}`;
  }).join('');
  return pick+`<div class="panel"><h3>${CHARACTERS[id].icon} ${CHARACTERS[id].n}</h3><div class="stg">${stats}</div>${slots}</div>`;
}
function rShop(){
  if(!isSettlement(G.loc)) return `<div class="panel sm">There is no shop here. Gear can be bought in a town, hub or harbour (you are in ${LOCATIONS[G.loc].n}).</div>`;
  const rows = SHOP.map(k => { const g = GEAR[k], p = gearPrice(k);
    return `<div class="ev"><div><b>${ITEMS[k].icon} ${ITEMS[k].n}</b> <span class="sm">${ITEMS[k].slot} · ${bonusText(g.bonus)}${g.for?' · '+g.for.map(i=>CHARACTERS[i].n.split(' ')[0]).join('/'):''}</span></div><button class="pri" ${G.gold>=p?'':'disabled'} onclick="act(()=>{buyGear('${k}');return []})">${p}g</button></div>`; }).join('');
  const sell = Object.keys(G.inv).filter(k => G.inv[k] > 0 && GEAR[k]).map(k => `<div class="ev"><div><b>${ITEMS[k].icon} ${ITEMS[k].n}</b> <span class="sm">×${G.inv[k]}</span></div><button onclick="act(()=>{sellGear('${k}');return []})">Sell ${Math.floor(gearPrice(k)/2)}g</button></div>`).join('');
  const cons = Object.keys(CONSUMABLE_SHOP).map(k => `<div class="ev"><div><b>${ITEMS[k].icon} ${ITEMS[k].n}</b> <span class="sm">${useText(USE[k])} · owned ${G.inv[k]||0}</span></div><button class="pri" ${G.gold>=shopPrice(k)?'':'disabled'} onclick="act(()=>{buyConsumable('${k}');return []})">${shopPrice(k)}g</button></div>`).join('');
  return `<div class="sm">💰 ${G.gold} · ${LOCATIONS[G.loc].n} shop</div><h4>Consumables</h4>${cons}<h4>Gear</h4>${rows}<h4>Sell</h4>${sell||'<div class="sm">No spare gear.</div>'}`;
}
