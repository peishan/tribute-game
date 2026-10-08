/* =====================================================================
   TRIBUTE — THE MATERIAL CODEX (from Crimson Tide's resource ethics codex)
   Every drop from the new loot gets a record that fills in as the story teaches the party what it is: tags (Living, Protected, Sacred, Spirit-touched,
   Limited, Common), where it is found (from AREA_LOOT, for places already open), and what it is used for (from RECIPES). A record appears once the party
   has held the material. Tags are revealed by story flags; before that the record says what is not yet known.
   Cooperation has a visible benefit: leaving a Spirit Path guardian in peace gives one gifted Spirit Thread (G.gifts). Fighting is never penalised.
   Tags are my first-pass classification: edit freely. State: G.matSeen = {id: day}, G.gifts = {id: n}.
   ===================================================================== */
const MAT_TAGS = {living:'🌿 Living', protected:'🛡️ Protected', sacred:'🕊️ Sacred', spirit:'✨ Spirit-touched', limited:'⏳ Limited', common:'🪨 Common'};
const flagOf = f => () => !!G.flags[f], always = () => true;
const MATERIALS = [
  {id:'frontier_hide', tags:[['common', always]]}, {id:'moonroot', tags:[['living', always]]}, {id:'healer_seed', tags:[['living', always]]},
  {id:'archive_ink', tags:[['common', always]]}, {id:'battlefield_relic', tags:[['common', always]]},
  {id:'spirit_thread', tags:[['spirit', () => !!G.flags.rin_met || !!G.flags.inv_forest_spirit]]},
  {id:'thorn_resin', tags:[['living', flagOf('inv_widow_origin')]]},
  {id:'mist_water', tags:[['living', flagOf('inv_stag_traces')]]},
  {id:'antler_chip', tags:[['protected', flagOf('inv_hart_shrine')], ['sacred', flagOf('inv_hart_shrine')]]},
  {id:'seal_dust', tags:[['protected', flagOf('cael_met')]]},
  {id:'celestial_shard', tags:[['limited', flagOf('celestial_found')]]},
  {id:'forgotten_glass', tags:[['limited', () => G.ch >= 139]]},
];
const matTags = m => m.tags.filter(t => { try{ return t[1](); }catch(e){ return false; } }).map(t => t[0]);
const matFound = id => Object.keys(AREA_LOOT).filter(k => LOCATIONS[k] && locOpen(k) && AREA_LOOT[k].some(d => d.id===id && (d.needCh===undefined || G.ch >= d.needCh))).map(k => LOCATIONS[k].n);
const matUsed = id => RECIPES.filter(r => r.need[id]).map(r => ITEMS[r.out].n);
const matGifts = id => (G.gifts && G.gifts[id]) || 0;
function matGift(id){ if(!G.gifts) G.gifts = {}; G.gifts[id] = (G.gifts[id]||0) + 1; addItems([{id, qty:1}]); }
function codexSync(){
  if(!G.matSeen) G.matSeen = {};
  MATERIALS.forEach(m => { if(!G.matSeen[m.id] && ((G.inv[m.id]||0) > 0 || ((G.stash||{})[m.id]||0) > 0 || matGifts(m.id))) G.matSeen[m.id] = G.day; });
}
const codexSeen = () => MATERIALS.filter(m => G.matSeen && G.matSeen[m.id]);
function rCodex(){
  codexSync(); const list = codexSeen();
  return `<div class="sm">What the party has learned about the materials it has gathered. Tags fill in as the story explains them. <b>${list.length}</b> / ${MATERIALS.length} held so far.</div>` + (list.map(m => { const it = ITEMS[m.id], tg = matTags(m), fd = matFound(m.id), us = matUsed(m.id), gf = matGifts(m.id);
    return `<div class="li"><b>${it.icon} ${it.n}</b> <span class="sm">· ${it.rarity||''}</span><div class="sm">${tg.length ? tg.map(t => MAT_TAGS[t]).join(' · ') : 'Not yet understood: the party does not know what this is.'}</div>${fd.length?`<div class="sm">Found in: ${fd.join(', ')}</div>`:''}${us.length?`<div class="sm">Used for: ${us.join(', ')}</div>`:''}${gf?`<div class="sm">🌿 ${gf} freely given by a guardian in thanks.</div>`:''}</div>`; }).join('') || '<div class="sm">Nothing gathered yet.</div>');
}
deed('codex6', 'craft', 'Know what you carry', '🌿', 'Six materials understood well enough to be tagged.', () => codexSeen().filter(m => matTags(m).length).length >= 6);
deed('gift1', 'craft', 'Freely given', '🌿', 'A guardian gave you something in thanks.', () => Object.keys(G.gifts||{}).length >= 1);
