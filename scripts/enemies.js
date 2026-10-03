/* =====================================================================
   TRIBUTE — AREA MONSTERS, BOSSES, ITEMS, LOOT TABLES
   Crimson Tide equivalents: rats / crabs / thieves  ->  Tribute: dock
   pickpockets / bandits / masked assassins (+ demons).
   area: dock | road | city | wild | demon   (route/area design pending)
   moves: {n, pow, steal?, fx?[], spell?}  traits: ['magic'] = hit by Spirit Bolt
   ===================================================================== */
const ENEMIES = {
  dock_pickpocket:{n:'Dock Pickpocket',icon:'🧤',area:'dock',hp:55,atk:9,mag:0,def:4,spd:14,xp:28,gold:14,
    moves:[{n:'Cutpurse Slash',pow:1},{n:'Pocket Lift',pow:.7,steal:true}],drops:[{id:'coin_pouch',chance:.5}],desc:'Quick fingers, quicker feet. Lifts coin in the crowd.'},
  dock_thug:{n:'Dockside Thug',icon:'🪝',area:'dock',hp:90,atk:12,mag:0,def:7,spd:7,xp:36,gold:18,
    moves:[{n:'Hook Swing',pow:1.1},{n:'Shoulder Charge',pow:1.3}],drops:[{id:'rope_coil',chance:.4}],desc:'Hired muscle from the harbour warehouses.'},
  smuggler:{n:'Harbour Smuggler',icon:'📦',area:'dock',hp:75,atk:10,mag:0,def:6,spd:10,xp:32,gold:22,
    moves:[{n:'Dagger Jab',pow:1},{n:'Smoke Pellet',pow:.5,fx:[{k:'slow',d:2}]}],drops:[{id:'contraband',chance:.35}],desc:'Moves goods the crown would rather not see.'},
  road_bandit:{n:'Road Bandit',icon:'🗡️',area:'road',hp:85,atk:13,mag:0,def:6,spd:9,xp:34,gold:20,
    moves:[{n:'Rusty Blade',pow:1},{n:'Ambush Strike',pow:1.5}],drops:[{id:'bandit_sash',chance:.4}],desc:'Waits where the road narrows.'},
  bandit_archer:{n:'Bandit Archer',icon:'🏹',area:'road',hp:65,atk:14,mag:0,def:4,spd:11,xp:34,gold:20,
    moves:[{n:'Quick Shot',pow:1},{n:'Pinning Arrow',pow:.8,fx:[{k:'slow',d:2}]}],drops:[{id:'arrow_bundle',chance:.45}],desc:'Picks off travellers from the ridge.'},
  masked_assassin:{n:'Masked Assassin',icon:'🥷',area:'city',hp:110,atk:17,mag:0,def:8,spd:17,xp:70,gold:45,elite:true,
    moves:[{n:'Venom Blade',pow:1.2,fx:[{k:'burn',d:3}]},{n:'Throat Cut',pow:1.9},{n:'Vanish Strike',pow:1.4}],drops:[{id:'assassin_mask',chance:.35},{id:'venom_vial',chance:.4}],desc:'Hired to make people disappear.'},
  imp:{n:'Imp',icon:'👺',area:'demon',hp:60,atk:10,mag:11,def:5,spd:13,xp:32,gold:15,traits:['magic'],
    moves:[{n:'Claw',pow:1},{n:'Hex Spark',pow:1.2,spell:true}],drops:[{id:'demon_ash',chance:.5}],desc:'A lesser demon from the cursed isle.'},
  shade_wraith:{n:'Shade Wraith',icon:'👻',area:'demon',hp:95,atk:8,mag:15,def:6,spd:12,xp:48,gold:26,traits:['magic'],
    moves:[{n:'Chilling Touch',pow:1,spell:true},{n:'Wail',pow:.9,spell:true,fx:[{k:'slow',d:2}]}],drops:[{id:'demon_ash',chance:.6},{id:'shade_essence',chance:.25}],desc:'A restless spirit bound to the curse.'},
  // ---- placeholder BOSSES (rename per story) ----
  boss_bandit_chief:{n:'Bandit Chief',icon:'👑',area:'road',boss:true,hp:420,atk:17,mag:0,def:10,spd:10,xp:160,gold:120,
    moves:[{n:'Cleaver Smash',pow:1.4},{n:'War Cry',pow:.6,fx:[{k:'slow',d:2}]},{n:'Brutal Cut',pow:1.9}],desc:'Placeholder boss.'},
  boss_masked_leader:{n:'Masked Leader',icon:'🎭',area:'city',boss:true,hp:520,atk:20,mag:6,def:11,spd:16,xp:220,gold:160,
    moves:[{n:'Venom Blade',pow:1.2,fx:[{k:'burn',d:3}]},{n:'Shadow Flurry',pow:1.8},{n:'Veil Step',pow:1.4}],desc:'Placeholder boss.'},
  boss_demon_warden:{n:'Demon Warden',icon:'😈',area:'demon',boss:true,hp:680,atk:18,mag:22,def:12,spd:11,xp:300,gold:210,traits:['magic'],
    moves:[{n:'Hellfire',pow:1.6,spell:true,fx:[{k:'burn',d:3}]},{n:'Dread Gaze',pow:1,spell:true,fx:[{k:'slow',d:2}]},{n:'Crushing Fist',pow:1.8}],desc:'Placeholder boss.'},
};
// enemy level scaling: stats grow with level; xp/gold grow slower
function mkEnemy(key, lv){
  const e = ENEMIES[key], m = 1 + (lv-1)*0.12, x = 1 + (lv-1)*0.08;
  return { key, name:e.n, icon:e.icon, boss:!!e.boss, elite:!!e.elite, traits:e.traits||[], moves:e.moves, drops:e.drops||[],
    hp:Math.round(e.hp*m), mhp:Math.round(e.hp*m), mp:0, mmp:0,
    atk:Math.round(e.atk*m), mag:Math.round(e.mag*m), def:Math.round(e.def*m), spd:Math.round(e.spd*(1+(lv-1)*.02)),
    xp:Math.round(e.xp*x), gold:Math.round(e.gold*x) };
}

/* ---- items (materials/consumables now; gear slots reserved for the Equipment system) ---- */
const ITEMS = {
  coin_pouch:{n:'Coin Pouch',icon:'👛',type:'material',rarity:'common'},   rope_coil:{n:'Rope Coil',icon:'🪢',type:'material',rarity:'common'},
  contraband:{n:'Contraband Crate',icon:'📦',type:'material',rarity:'uncommon'}, bandit_sash:{n:'Bandit Sash',icon:'🎗️',type:'material',rarity:'common'},
  arrow_bundle:{n:'Arrow Bundle',icon:'🏹',type:'material',rarity:'common'},  assassin_mask:{n:'Assassin\'s Mask',icon:'🎭',type:'material',rarity:'rare'},
  venom_vial:{n:'Venom Vial',icon:'🧪',type:'material',rarity:'uncommon'},     demon_ash:{n:'Demon Ash',icon:'🌫️',type:'material',rarity:'common'},
  shade_essence:{n:'Shade Essence',icon:'💠',type:'material',rarity:'rare'},   herbal_tonic:{n:'Herbal Tonic',icon:'🍵',type:'consumable',rarity:'common'},
  chiefs_cleaver:{n:'Chief\'s Cleaver',icon:'🪓',type:'gear',slot:'weapon',rarity:'rare'}, venomed_cloak:{n:'Venomed Cloak',icon:'🧥',type:'gear',slot:'armor',rarity:'rare'},
  warden_sigil:{n:'Warden\'s Sigil',icon:'🔯',type:'gear',slot:'accessory',rarity:'epic'},
};
/* ---- LOOT TABLES for major battles ----
   guaranteed: always drop.  rolls: independent chance rolls.  firstClear: only on the first win.
   qty: [min,max]. Bosses use these; normal enemies use their own `drops`. */
const LOOT = {
  boss_bandit_chief:{guaranteed:[{id:'bandit_sash',qty:[2,3]}],rolls:[{id:'chiefs_cleaver',chance:.2},{id:'herbal_tonic',chance:.6,qty:[1,2]}],firstClear:[{id:'coin_pouch',qty:[2,2]}]},
  boss_masked_leader:{guaranteed:[{id:'assassin_mask',qty:[1,1]}],rolls:[{id:'venomed_cloak',chance:.2},{id:'venom_vial',chance:.6,qty:[1,3]}],firstClear:[{id:'herbal_tonic',qty:[3,3]}]},
  boss_demon_warden:{guaranteed:[{id:'demon_ash',qty:[3,5]}],rolls:[{id:'warden_sigil',chance:.15},{id:'shade_essence',chance:.5,qty:[1,2]}],firstClear:[{id:'shade_essence',qty:[1,1]}]},
};
const rint = ([a,b]) => a + Math.floor(Math.random()*(b-a+1));
function rollLoot(table, first){
  const out = []; if(!table) return out;
  (table.guaranteed||[]).forEach(d => out.push({id:d.id, qty:rint(d.qty||[1,1])}));
  (table.rolls||[]).forEach(d => { if(Math.random() < d.chance) out.push({id:d.id, qty:rint(d.qty||[1,1])}); });
  if(first) (table.firstClear||[]).forEach(d => out.push({id:d.id, qty:rint(d.qty||[1,1])}));
  return out;
}
function addItems(list){ list.forEach(d => G.inv[d.id] = (G.inv[d.id]||0) + d.qty); }
