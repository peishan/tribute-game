/* =====================================================================
   TRIBUTE — DEVON, THE LIVING CUSTODIAN (Arc XXXII, ch825-829; docs/ARC_XXXII_BRIEF.md)
   From the first restoration (ch825) the network heals across Lunareth slowly: each of the fifteen former Evil sites recovers by a few points a day. From ch827 Devon is a living custodian and
   can ATTUNE at the Pearl Chamber (once a day): he senses the network's weakest point, learns how it is recovering, and the party earns a little XP. After ch829 the Pearl is back with Devon
   and the network keeps a resonance imprint, so the Pearl can leave and return (a story beat, not a mechanic). Nothing here answers who owns the Pearl. All numbers first-pass.
   ===================================================================== */
const NET_SITES = [
  ['thorned_widow','The Forest of Thorns'],['mourning_hart','Mourning Valley'],['hollow_king','The Crownless Marches'],['black_tide','The Forbidden Sea Route'],['drowned_crown','The Sunken Kingdom'],
  ['unchosen_road','The Northern Frontier'],['whispering_mask','The Veyne network'],['endless_winter','The Frostveil Range'],['silent_flame','The Old Beacon Road'],['bone_river','The Bone River'],
  ['sky_eater','The Altan high roads'],['ashen_serpent','Beneath Altan'],['weeping_stone','Lingering Vale'],['sunless_child','The Sunless Zone'],['mirror_queen','The Mirror Roads'],
];
const restNetOpen = () => !!(G && G.ch >= 825);
const netStart = () => { if(G.netDay === undefined) G.netDay = G.day; return G.netDay; };
const netPct = i => Math.min(100, Math.max(0, Math.round((G.day - netStart()) * (3 + (i % 4))) + 5));
// The Purification Map (Arc XXXIV, ch852): five nodes purified in the order the map gives, safest first. Status follows the story: Dragonvale is purified at 861; by 875 the purified nodes respond across Lunareth and the road southeast is open.
const PURIFY_NODES = [
  {n:'Dragonvale', done:861}, {n:'Tribute', done:875}, {n:'The older seal regions', done:875}, {n:'The Altan-linked routes', done:875}, {n:'Dima and Xima territory (the southeastern route)', done:875, last:true},
];
function rPurify(){
  if(!(G && G.ch >= 852)) return '';
  let nextSet = false;
  const rows = PURIFY_NODES.map((x, i) => {
    const ok = G.ch >= x.done;
    let st = ok ? (x.last ? 'the route is open and stable' : 'purified') : (!nextSet ? (i===0 && G.ch>=858 ? 'unstable: being purified' : 'next in order') : 'waiting');
    if(!ok) nextSet = true;
    return `<div class="sm">${ok ? '🟢' : st.startsWith('waiting') ? '⚪' : '🟡'} ${i+1}. ${x.n} · ${st}</div>`; }).join('');
  return `<div class="panel"><b>🗺️ The Purification Map</b><div class="sm">The network cannot be switched on everywhere at once: it is purified node by node, the safest first, or it could collapse again. Repair looks different from conquest.</div></div>${rows}`;
}
const custodianOn = () => !!(G && G.ch >= 827);
function netAttune(){
  if(!custodianOn()) return [];
  if(G.attuneDay === G.day) return ['Devon has attuned today: the network has nothing new to say.'];
  G.attuneDay = G.day;
  const low = NET_SITES.map((s, i) => [netPct(i), s[1]]).sort((a, b) => a[0] - b[0])[0];
  const msgs = ['🔮 Devon lays a hand on the interface and feels the network: the weakest point is '+low[1]+' ('+low[0]+'% restored). '+(G.ch>=829?'The Pearl is with him again, and the imprint answers.':'The Pearl still rests in the interface.')];
  gainXp(40000 + Math.round(avgPartyLv()*800), G.party).forEach(m => msgs.push(m));
  return msgs;
}
function rNet(){
  if(!restNetOpen()) return '';
  netStart();
  const rows = NET_SITES.map((s, i) => `<div class="sm">${netPct(i)>=100?'🟢':netPct(i)>=50?'🟡':'🟠'} ${s[1]} · ${netPct(i)}% restored</div>`).join('');
  const att = custodianOn() ? `<button ${G.attuneDay===G.day?'disabled':''} onclick="act(netAttune)">🔮 Attune (Devon, once a day)</button>` : '<div class="sm">Devon becomes a living custodian once the first restoration has settled (chapter 827).</div>';
  return `<div class="panel"><b>🔮 The Restoration Network</b><div class="sm">Fifteen former Evil sites, healing slowly since the first restoration. Physical possession of the Pearl and the network's function are no longer inseparable.</div>${att}</div>${rPurify()}${rows}`;
}
if(LOCATIONS.pearl_chamber && !LOCATIONS.pearl_chamber.spots.some(s => s.id==='pearl_net'))
  LOCATIONS.pearl_chamber.spots.push({id:'pearl_net', kind:'pearlnet', n:'The Central Interface', icon:'🌳', desc:'The map of the restoration network and the interface where the Pearl was placed.', ch:825});
