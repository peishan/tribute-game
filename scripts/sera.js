/* =====================================================================
   TRIBUTE — SERA: GEAR AND ALTAN ENVOY PANEL
   Gear for Seraphina Altan (the Altan Blademaster): a small shop line, and story pieces handed out in the chapters where her look or her house's relics appear
   (first-pass numbers, like the other outfits). Her Case-tab panel is the Altan side of her: the garrison dispatch she can ask for from the party, once every
   5 in-game days, once the capital has opened (ch262). State: G.altanDispatch = {last, n}.
   ===================================================================== */
(function(){
  const own = [
    {id:'sera_regiment_seal', ch:247, n:'Lost Regiment Seal', icon:'🔏', slot:'accessory', rarity:'rare', bonus:{def:4,hp:20,atk:3}, look:'The old Falcon regiments\' seal, kept by the royal house.'},
    {id:'sera_falcon_sabre', ch:257, n:'Golden Falcon Sabre', icon:'🦅', slot:'weapon', rarity:'epic', bonus:{atk:16,spd:5,hp:10}, look:'The sabre of her awakening.'},
    {id:'sera_blue_ribbon', ch:398, n:'Blue Ribbon and White Flowers', icon:'🎀', slot:'accessory', rarity:'uncommon', bonus:{spd:3,mag:2,hp:10}, look:'A blue ribbon and white flowers in her long golden hair.'},
    {id:'sera_lilac_gown', ch:402, n:'Lilac Festival Gown', icon:'👗', slot:'armor', rarity:'rare', bonus:{hp:35,def:6,spd:3}, look:'A lilac gown, worn with her hair silver-white.'},
    {id:'sera_blue_flower_pins', ch:402, n:'Blue Flower Pins', icon:'💠', slot:'accessory', rarity:'rare', bonus:{mag:4,spd:3,hp:15}, look:'Blue flowers worn in her silver-white hair.'},
  ];
  own.forEach(o => {
    GEAR[o.id] = {n:o.n, icon:o.icon, slot:o.slot, rarity:o.rarity, bonus:o.bonus, for:['seraphina']};
    ITEMS[o.id] = {n:o.n, icon:o.icon, type:'gear', slot:o.slot, rarity:o.rarity};
    CH_ITEMS[o.ch] = (CH_ITEMS[o.ch] || []).concat([{id:o.id, qty:1}]);   // into the pack; she keeps what she wears
    OUTFITS.push({id:o.id, who:'seraphina', ch:o.ch, n:o.n, icon:o.icon, slot:o.slot, rarity:o.rarity, bonus:o.bonus, look:o.look});
  });
  Object.assign(GEAR, {
    altan_sabre:{n:'Altan Sabre',icon:'🗡️',slot:'weapon',rarity:'common',price:100,bonus:{atk:4,spd:1},for:['seraphina']},
    steppe_coat:{n:'Steppe Riding Coat',icon:'🧥',slot:'armor',rarity:'uncommon',price:150,bonus:{def:5,hp:15,spd:1},for:['seraphina']},
    falcon_feather:{n:'Falcon Feather Charm',icon:'🪶',slot:'accessory',rarity:'uncommon',price:110,bonus:{spd:3,atk:1},for:['seraphina']},
  });
  ['altan_sabre','steppe_coat','falcon_feather'].forEach(k => { const g = GEAR[k]; ITEMS[k] = {n:g.n, icon:g.icon, type:'gear', slot:g.slot, rarity:g.rarity}; if(!SHOP.includes(k)) SHOP.push(k); });
})();

const seraOpen = () => !!G && G.ch >= 262 && isRecruited('seraphina');
const seraD = () => { if(!G.altanDispatch) G.altanDispatch = {last:-99, n:0}; return G.altanDispatch; };
const seraReady = () => G.day - seraD().last >= 5;
const SERA_DISPATCH = [
  'The Altan garrison sends word that the border road is quiet, and a small parcel of field rations.',
  'A courier in Altan colours brings the royal household\'s regards and a sealed list of what the garrison has seen on the roads.',
  'Sera reads the dispatch twice. "My people are managing. That is the best news I could ask for."',
  'The regiment\'s old marching songs reach the camp with the courier; the soldiers hum them for a day.',
];
function seraDispatch(){
  if(!seraOpen() || !seraReady()) return [];
  const D = seraD(); D.last = G.day; const line = SERA_DISPATCH[D.n % SERA_DISPATCH.length]; D.n++;
  const msgs = ['🦅 '+line]; gainXp(80 + avgPartyLv()*6, G.party).forEach(m => msgs.push(m));
  G.inv.herbal_tonic = (G.inv.herbal_tonic||0) + 1; msgs.push('🎒 Herbal Tonic ×1 from the garrison stores.');
  repAdd('court', 1).forEach(m => msgs.push(m));
  save(); return msgs.concat(advanceDay(1));
}
function seraPanel(){
  if(!seraOpen()) return '';
  return `<h4>${portraitChip('assets/party/seraphina.webp','Seraphina Altan')} Sera: Altan Envoy</h4><div class="sm">The princess of Altan travels with the party, and Altan answers when she asks. Once every 5 days the garrison can send a dispatch: a little renown at court, experience and a ration from the stores (${seraD().n} received). Her gear is in the Gear tab: the Altan Sabre, riding coat and feather charm in any shop, and the relics and looks she has worn in the story.</div><button ${seraReady()?'':'disabled'} onclick="act(seraDispatch)">Ask for the garrison dispatch</button>`;
}
(function(){ const _rc = rCase; rCase = function(){ return _rc() + seraPanel(); }; })();
