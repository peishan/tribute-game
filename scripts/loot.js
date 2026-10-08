/* =====================================================================
   TRIBUTE — EXPANDED LOOT (area loot, themed trinkets, new crafts)
   Until now only bosses and a few enemies dropped anything useful. Now every won hunt or ambush (not story battles) also rolls the loot of the
   AREA it was fought in (AREA_LOOT, keyed by location id), so the places you explore feed different materials and rare trinkets. Bosses keep their
   own LOOT tables and also roll a themed trinket by name (LOOT_THEMES, from Crimson Tide's boss-name loot themes). New materials feed new crafts
   (Jenika's recipes) and a few pieces of gear.  chance is per fight; qty [min,max]; needCh gates a row until that story chapter. All numbers first-pass.
   ===================================================================== */
const NEW_ITEMS = {
  frontier_hide:{n:'Frontier Hide',icon:'🦌',type:'material',rarity:'common'}, moonroot:{n:'Moonroot',icon:'🌱',type:'material',rarity:'common'},
  spirit_thread:{n:'Spirit Thread',icon:'🧵',type:'material',rarity:'uncommon'}, thorn_resin:{n:'Thorn Resin',icon:'🥀',type:'material',rarity:'uncommon'},
  mist_water:{n:'Mist Spring Water',icon:'💧',type:'material',rarity:'uncommon'}, antler_chip:{n:'Hart Antler Chip',icon:'🦴',type:'material',rarity:'rare'},
  archive_ink:{n:'Archive Ink',icon:'🖋️',type:'material',rarity:'uncommon'}, healer_seed:{n:'Healer\'s Seedpod',icon:'🌰',type:'material',rarity:'uncommon'},
  seal_dust:{n:'Keeper\'s Seal Dust',icon:'🔆',type:'material',rarity:'uncommon'}, celestial_shard:{n:'Celestial Shard',icon:'🌠',type:'material',rarity:'rare'},
  battlefield_relic:{n:'Battlefield Relic',icon:'🗿',type:'material',rarity:'uncommon'}, forgotten_glass:{n:'Forgotten Glass',icon:'🔮',type:'material',rarity:'rare'},
};
const NEW_GEAR = {
  hunters_talisman:{n:'Hunter\'s Talisman',icon:'📿',slot:'accessory',rarity:'uncommon',bonus:{atk:3,spd:2}},
  spirit_thread_charm:{n:'Spirit Thread Charm',icon:'🧿',slot:'accessory',rarity:'rare',bonus:{mag:4,spd:3}},
  thorn_resin_amulet:{n:'Thorn Resin Amulet',icon:'🥀',slot:'accessory',rarity:'rare',bonus:{def:4,hp:20}},
  hart_antler_charm:{n:'Hart Antler Charm',icon:'🦌',slot:'accessory',rarity:'epic',bonus:{hp:30,def:4,spd:2}},
  archive_lens:{n:'Archive Lens',icon:'🔍',slot:'accessory',rarity:'rare',bonus:{mag:5,spd:2}},
  keepers_seal_ring:{n:'Keeper\'s Seal Ring',icon:'💍',slot:'accessory',rarity:'epic',bonus:{def:5,hp:25,mag:3}},
  frontier_cloak:{n:'Frontier Cloak',icon:'🧥',slot:'armor',rarity:'uncommon',bonus:{def:5,hp:10}},
  widows_veil:{n:'Widow\'s Veil',icon:'🕸️',slot:'armor',rarity:'epic',bonus:{def:8,mag:4,hp:25}},
  sealbreakers_edge:{n:'Sealbreaker\'s Edge',icon:'🗡️',slot:'weapon',rarity:'epic',bonus:{atk:12,spd:2}},
  battlefield_standard:{n:'Battlefield Standard',icon:'🚩',slot:'accessory',rarity:'rare',bonus:{atk:4,def:3,hp:10}},
};
Object.assign(ITEMS, NEW_ITEMS);
Object.keys(NEW_GEAR).forEach(k => { GEAR[k] = NEW_GEAR[k]; ITEMS[k] = {n:NEW_GEAR[k].n, icon:NEW_GEAR[k].icon, type:'gear', slot:NEW_GEAR[k].slot, rarity:NEW_GEAR[k].rarity}; });
RECIPES.push(
  {out:'hunters_talisman', need:{frontier_hide:3, arrow_bundle:2}, gold:60},
  {out:'frontier_cloak', need:{frontier_hide:5, moonroot:2}, gold:80},
  {out:'spirit_thread_charm', need:{spirit_thread:4, thorn_resin:1}, gold:140},
  {out:'thorn_resin_amulet', need:{thorn_resin:4, moonroot:3}, gold:140},
  {out:'archive_lens', need:{archive_ink:3, healer_seed:2}, gold:150},
  {out:'hart_antler_charm', need:{antler_chip:3, mist_water:2, spirit_thread:2}, gold:260},
  {out:'keepers_seal_ring', need:{seal_dust:6, celestial_shard:2}, gold:300},
  {out:'battlefield_standard', need:{battlefield_relic:4, seal_dust:2}, gold:200});
// rows: {id, chance (per fight), qty [min,max], needCh}
const AREA_LOOT = {
  tribute_wilderness:[{id:'frontier_hide',chance:.30},{id:'forest_herb',chance:.30,qty:[1,2]}],
  dragon_border:[{id:'drake_scale',chance:.20},{id:'relic_dust',chance:.15}],
  dragon_ruins:[{id:'relic_dust',chance:.30,qty:[1,2]},{id:'dragon_crystal',chance:.05}],
  valen_borderlands:[{id:'archive_ink',chance:.25},{id:'healer_seed',chance:.25},{id:'archive_lens',chance:.02,needCh:107}],
  forgotten_battlefield:[{id:'battlefield_relic',chance:.30,needCh:123},{id:'seal_dust',chance:.20,needCh:123},{id:'battlefield_standard',chance:.025,needCh:123}],
  forgotten_sanctuary:[{id:'seal_dust',chance:.25,needCh:126},{id:'healer_seed',chance:.20,needCh:126},{id:'spirit_thread',chance:.15,needCh:126}],
  celestial_ruins:[{id:'celestial_shard',chance:.15,needCh:131},{id:'seal_dust',chance:.25,needCh:131},{id:'forgotten_glass',chance:.08,needCh:131},{id:'keepers_seal_ring',chance:.015,needCh:131}],
  land_beyond_seal:[{id:'forgotten_glass',chance:.15,needCh:139},{id:'celestial_shard',chance:.12,needCh:139},{id:'seal_dust',chance:.20,needCh:139}],
  northern_frontier:[{id:'frontier_hide',chance:.35,qty:[1,2],needCh:148},{id:'moonroot',chance:.20,needCh:148},{id:'hunters_talisman',chance:.03,needCh:148}],
  black_forest:[{id:'moonroot',chance:.35,qty:[1,3],needCh:149},{id:'spirit_thread',chance:.25,needCh:149},{id:'thorn_resin',chance:.15,needCh:149}],
  forest_of_thorns:[{id:'thorn_resin',chance:.40,qty:[1,2],needCh:150},{id:'spirit_thread',chance:.20,needCh:150},{id:'thorn_resin_amulet',chance:.03,needCh:150}],
  crownless_marches:[{id:'battlefield_relic',chance:.30,needCh:157},{id:'seal_dust',chance:.20,needCh:157},{id:'forgotten_glass',chance:.10,needCh:157},{id:'spirit_thread',chance:.15,needCh:157}],
  mourning_valley:[{id:'mist_water',chance:.35,needCh:153},{id:'spirit_thread',chance:.25,needCh:153},{id:'antler_chip',chance:.06,needCh:153},{id:'hart_antler_charm',chance:.01,needCh:153}],
};
// boss-name themes (Crimson Tide's LOOT_THEMES): a boss whose name contains a keyword also rolls this item at 20% (first clear +25%)
const LOOT_THEMES = [
  [['widow','thorn'], 'widows_veil', .15], [['varyn','breaker'], 'sealbreakers_edge', .15], [['hart','stag'], 'hart_antler_charm', .12],
  [['guardian','spirit'], 'spirit_thread', .5], [['shadow','crown'], 'dark_essence', .5], [['warden'], 'warden_sigil', .08],
];
Object.assign(LOOT, {
  boss_guardian_spirit:{guaranteed:[{id:'relic_dust',qty:[2,3]},{id:'dragon_crystal',qty:[1,1]}],rolls:[{id:'drake_scale',chance:.5,qty:[1,2]},{id:'royal_sigil',chance:.2}],firstClear:[{id:'seal_fragment',qty:[1,1]}]},
  boss_spirit_core:{guaranteed:[{id:'relic_dust',qty:[2,4]},{id:'dragon_crystal',qty:[1,2]}],rolls:[{id:'royal_sigil',chance:.3},{id:'drake_scale',chance:.5,qty:[1,3]}],firstClear:[{id:'seal_fragment',qty:[1,1]}]},
});
function areaLoot(){   // extra drops for a won hunt/ambush at the current location
  const out = [], rows = AREA_LOOT[G.loc] || [];
  rows.forEach(d => { if((d.needCh===undefined || G.ch >= d.needCh) && Math.random() < d.chance) out.push({id:d.id, qty:d.qty ? rint(d.qty) : 1}); });
  return out;
}
function themedLoot(bossKey, first){
  const name = (ENEMIES[bossKey] && ENEMIES[bossKey].n || '').toLowerCase(), out = [];
  LOOT_THEMES.forEach(([kw, id, ch]) => { if(kw.some(k => name.includes(k)) && Math.random() < ch + (first ? .25 : 0) && ITEMS[id]) out.push({id, qty:1}); });
  return out;
}
const lootBand = c => c >= .25 ? 'common' : c >= .08 ? 'uncommon' : c >= .025 ? 'rare' : 'very rare';
function rLootGuide(){
  const rows = Object.keys(AREA_LOOT).filter(k => LOCATIONS[k] && (G.visited[k] || k===G.loc) && AREA_LOOT[k].length).map(k => `<div class="ev"><div><b>${LOCATIONS[k].icon} ${LOCATIONS[k].n}</b><div class="sm">${AREA_LOOT[k].filter(d => d.needCh===undefined || G.ch>=d.needCh).map(d => ITEMS[d.id].icon+' '+ITEMS[d.id].n+' ('+lootBand(d.chance)+')').join(' · ')}</div></div></div>`).join('');
  return `<h4>Where to find things</h4><div class="sm">Won hunts and ambushes roll the loot of the place they were fought in. Materials feed Jenika's recipes in Dragonvale.</div>${rows||'<div class="sm">Visit places and win fights to learn their loot.</div>'}`;
}
