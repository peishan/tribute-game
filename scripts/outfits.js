/* =====================================================================
   TRIBUTE — BATTLE OUTFITS (new gear unlocked in the chapters where the comic shows a new look)
   Each outfit is a gear item for one hero, given when its chapter is completed and worn automatically (like Sky's robes at ch87); the old piece goes back to the
   pack and the player can swap at any time. A save that has already passed the chapter receives the item quietly (G.outfitsGiven), without changing what is worn.
   Taken from a survey of the comic pages (a first reading of the art: each row says what the page shows). Guests (Rin, Cael, Eira) cannot be equipped, so they have none.
   Row: {id, who, ch, n, icon, slot, rarity, bonus, look}. Bonuses are first-pass and grow with the chapter.
   ===================================================================== */
const OUTFITS = [
  // Jade (ch58's Daily Royal Attire and Phoenix Guard Attire already exist in gear.js)
  {id:'jade_moonveil_robe', who:'jade', ch:78, n:'Moonveil Blossom Robe', icon:'🌸', slot:'armor', rarity:'rare', bonus:{hp:25,def:5,mag:5}, look:'A white robe printed with red blossoms and a kimono-style sleeve, with a thick gold bracelet (Moonveil Temple).'},
  {id:'jade_travel_armour', who:'jade', ch:102, n:'Phoenix Travelling Armour', icon:'🛡️', slot:'armor', rarity:'epic', bonus:{hp:45,def:10,atk:4}, look:'A red robe layered with black and gold armoured pieces: bodice, sleeve guards, belt and a long red cape.'},
  {id:'jade_harmony_attire', who:'jade', ch:116, n:'Jade Dragon Harmony Attire', icon:'🐉', slot:'armor', rarity:'epic', bonus:{hp:60,def:12,atk:6,mag:4}, look:'A white and gold armoured top with red accents, gold filigree, a red sash and ribbons (the Borderland Trial).'},
  // Devon
  {id:'devon_travel_coat', who:'devon', ch:102, n:'Dark Travelling Coat', icon:'🧥', slot:'armor', rarity:'epic', bonus:{hp:45,def:10,mag:5}, look:'A dark navy armoured long coat with gold trim, shoulder plates, belt and dark cloak, and no fur.'},
  {id:'devon_battle_coat', who:'devon', ch:116, n:'Gauntleted Battle Coat', icon:'⚔️', slot:'armor', rarity:'epic', bonus:{hp:60,def:12,mag:8}, look:'A dark navy coat with gold cross ornaments and armoured bracers.'},
  {id:'devon_gauntlets', who:'devon', ch:116, n:'Armoured Gauntlets', icon:'🧤', slot:'accessory', rarity:'epic', bonus:{atk:4,def:4,mag:3}, look:'Armoured gauntlets for casting blue magic circles and lightning.'},
  {id:'devon_frost_mantle', who:'devon', ch:129, n:'Frostfur Mantle', icon:'❄️', slot:'armor', rarity:'epic', bonus:{hp:70,def:14,mag:9,spd:1}, look:'A navy coat with a thick white fur collar and mantle.'},
  {id:'devon_sapphire_brooch', who:'devon', ch:129, n:'Sapphire Brooch', icon:'💎', slot:'accessory', rarity:'epic', bonus:{mag:6,mp:20}, look:'The sapphire brooch that fastens the fur mantle.'},
  // Sky (the white-and-blue Dragonvale robes at ch87 already exist)
  {id:'sky_filigree_vestments', who:'sky', ch:117, n:'Filigree Healer\'s Vestments', icon:'🥼', slot:'armor', rarity:'epic', bonus:{hp:50,def:9,mag:10}, look:'A cream-white robe with gold filigree and cross-straps.'},
  {id:'sky_emerald_pendant', who:'sky', ch:117, n:'Emerald Pendant', icon:'💚', slot:'accessory', rarity:'epic', bonus:{mag:7,hp:25}, look:'An emerald green pendant on a gold chain.'},
  // Levi
  {id:'levi_ranger_garb', who:'levi', ch:87, n:'Reborn Ranger\'s Garb', icon:'🏹', slot:'armor', rarity:'rare', bonus:{hp:20,def:5,spd:3}, look:'A dark green and brown robe with gold embroidery and a quiver (his return, reborn).'},
  {id:'levi_road_cloak', who:'levi', ch:131, n:'Keeper\'s Road Cloak', icon:'🧥', slot:'armor', rarity:'epic', bonus:{hp:40,def:9,spd:4}, look:'A dark green cloak and tunic with gold trim, with the quiver on his back.'},
  {id:'levi_hooded_cloak', who:'levi', ch:152, n:'Hooded Ranger\'s Cloak', icon:'🌲', slot:'armor', rarity:'epic', bonus:{hp:55,def:12,spd:5}, look:'A brown hooded cloak with a dark scarf and a light metal clasp, short auburn hair.'},
  // Seraphina (silent party member until her return to Altan)
  {id:'sera_altan_robe', who:'seraphina', ch:87, n:'Altan Travelling Robes', icon:'🦅', slot:'armor', rarity:'rare', bonus:{hp:30,def:6,spd:2}, look:'A white and gold robe, as she joins the party.'},
  {id:'sera_twilight_raiment', who:'seraphina', ch:161, n:'Twilight Raiment', icon:'🌗', slot:'armor', rarity:'epic', bonus:{hp:70,def:12,atk:7,spd:5}, look:'A light white-and-lavender armoured dress with gold filigree and purple accents.'},
  {id:'sera_amethyst_ornament', who:'seraphina', ch:161, n:'Amethyst Hair Ornament', icon:'💜', slot:'accessory', rarity:'epic', bonus:{atk:5,spd:3,mag:2}, look:'A purple jewelled hair ornament.'},
  {id:'sera_violet_rapier', who:'seraphina', ch:161, n:'Violet Rapier', icon:'🗡️', slot:'weapon', rarity:'epic', bonus:{atk:14,spd:4}, look:'A slender blade that cuts in purple light.'},
];
OUTFITS.forEach(o => {
  GEAR[o.id] = {n:o.n, icon:o.icon, slot:o.slot, rarity:o.rarity, bonus:o.bonus, for:[o.who]};
  ITEMS[o.id] = {n:o.n, icon:o.icon, type:'gear', slot:o.slot, rarity:o.rarity};
  CH_ITEMS[o.ch] = (CH_ITEMS[o.ch] || []).concat([{id:o.id, qty:1}]);
  if(!CH_EQUIP[o.ch]) CH_EQUIP[o.ch] = {};
  CH_EQUIP[o.ch][o.who] = (CH_EQUIP[o.ch][o.who] || []).concat([o.id]);
});
function outfitsCatchUp(){   // a save from before these outfits existed gets those of chapters it has passed, quietly, into the pack
  if(!G.outfitsGiven) G.outfitsGiven = {};
  let any = false;
  OUTFITS.forEach(o => {
    if(G.outfitsGiven[o.id]) return;
    G.outfitsGiven[o.id] = true;   // chapters completed from now on hand the item out themselves
    if(G.ch >= o.ch){
      const held = (G.inv[o.id]||0) + Object.keys(G.gear||{}).reduce((a, h) => a + Object.keys(G.gear[h]||{}).filter(sl => G.gear[h][sl]===o.id).length, 0);
      if(isRecruited(o.who) && !held){ G.inv[o.id] = 1; any = true; }
    }
  });
  if(any) toast('🛡️ New outfits are in your pack for chapters you have already played');
}
