/* =====================================================================
   TRIBUTE — WORLD MAPS (Travel tab)
   Every map has three ways to use it, switched by the toggle above the map:
     🖼️ Image  the generated map picture (zoom and read)
     📍 Nodes  clickable markers on the map (or on a plain schematic when the picture is missing)
     📋 List   every place as a list of tappable rows
   If a map picture is missing or fails to load, the map falls back to the schematic nodes/list by itself, so a map that is not generated yet
   still works. Selecting a place shows its details with a travel button (or "Open here" if you are there).
   Add a map: one WORLD_MAPS row (img, locs it owns, nodes with x/y in % of the picture). A node is {k:label, x, y, loc, spot?, ref?}.
   ===================================================================== */
let mapView = null, mapSel = null;
const MAPMODE_KEY = 'tribute_mapmode';
let mapMode = (() => { try{ return localStorage.getItem(MAPMODE_KEY) || 'image'; }catch(e){ return 'image'; } })();
const mapBad = {};   // map id -> picture failed to load
const ARC5_MAP_CH = 122, ARC6_MAP_CH = 147;
const MAP_MODES = [['image','🖼️ Image'],['nodes','📍 Nodes'],['list','📋 List']];
const WORLD_MAPS = [
  {id:'tribute', n:'Tribute', img:'assets/maps/tribute.webp', open:() => true,
   locs:['capital','gold_residence','tribute_wilderness','faepool_harbour','vigil_village','faepool_forest','frog_mahan','faepool_ruins','dark_inn','river_crossing','booyeong_camp','trial_grounds','hidden_village','corrupted_forest','faepool_borderlands','faepool_settlement','reunion_area'],
   nodes:[{k:'Imperial Palace',x:30,y:28,loc:'capital',spot:'palace'},{k:'Imperial Guard Training Grounds',x:8,y:33,loc:'capital',spot:'training'},{k:'Frontier Fields',x:22,y:42.5,loc:'tribute_wilderness'},
          {k:'Shadows at the Inn',x:67,y:38.5,loc:'dark_inn'},{k:'Eastern Harbour',x:69.5,y:45.6,loc:'faepool_harbour'},{k:'River Crossing',x:72.7,y:55,loc:'river_crossing'},
          {k:'Faepool Border',x:86.5,y:40,loc:'faepool_borderlands'},{k:'Vigil',x:81,y:60,loc:'vigil_village'},{k:'Faepool Forest',x:85.5,y:72,loc:'faepool_forest'},{k:'Frog Mahan Territory',x:79,y:87.4,loc:'frog_mahan'}]},
  {id:'dragonvale', n:'Dragonvale', img:'assets/maps/dragonvale.webp', open:() => locOpen('dragon_vale'),
   locs:['dragon_vale','cavern_fireflies','dragon_border','dragon_ruins','moonveil_temple','abyssal_frontier'],
   nodes:[{k:'Dragonvale Capital',x:52.6,y:26,loc:'dragon_vale'},{k:'Throne Hall (Life in the Palace)',x:50.5,y:36.7,loc:'dragon_vale',spot:'palace_life'},{k:'Prince Devon\'s Palace',x:41,y:54.6,loc:'dragon_vale',spot:'devon_palace'},
          {k:'Guest Quarters',x:67,y:46,loc:'dragon_vale',spot:'guest_wing'},{k:'Royal Healing Pavilion',x:73.5,y:35.5,loc:'dragon_vale',spot:'pavilion'},{k:'Dragon Pearl Sanctuary',x:67,y:12.5,loc:'dragon_vale',spot:'sanctuary'},
          {k:'Lingering Vale',x:34,y:78,loc:'dragon_vale',spot:'vale'},{k:'Cave of Fireflies',x:80.5,y:22.5,loc:'cavern_fireflies'},{k:'Border Watch Fort',x:87,y:60.6,loc:'dragon_border'}]},
  {id:'valen', n:'Valen Borderlands', img:'assets/maps/valen.webp', open:() => locOpen('valen_borderlands'),   // shows Dragonvale places: unlocks with Dragonvale
   locs:['valen_borderlands'],
   nodes:[{k:'Westwatch Gate',x:86,y:44.5,loc:'valen_borderlands',spot:'westwatch_gate'},{k:'Valen Crossing',x:63,y:50.2,loc:'valen_borderlands',spot:'valen_crossing'},{k:'Moonfall Hamlet',x:35.5,y:52,loc:'valen_borderlands',spot:'moonfall_hamlet'},
          {k:'Ruins of Valen',x:72,y:67.6,loc:'valen_borderlands',spot:'ruins_of_valen'},{k:'Spirit Healer\'s Hollow',x:80,y:58,loc:'valen_borderlands',spot:'spirit_hollow'},{k:'Mirror Lake',x:45,y:41,loc:'valen_borderlands',spot:'mirror_lake'},
          {k:'Forgotten Watchtower',x:57,y:21,loc:'valen_borderlands',spot:'watchtower'},{k:'Howling Pass',x:24.5,y:15,loc:'valen_borderlands',spot:'howling_pass'},{k:'Sunken Shrine',x:9.5,y:63,loc:'valen_borderlands',spot:'sunken_shrine'},
          {k:'Western Frontier Camp',x:46,y:82.4,loc:'valen_borderlands',spot:'frontier_camp'},{k:'Veilwood',x:30.5,y:28.7,loc:'valen_borderlands',spot:'veilwood'},{k:'Whispering Plains',x:69.5,y:30,loc:'valen_borderlands',spot:'whispering_plains'},
          {k:'Mourning Marsh',x:32,y:72.7,loc:'valen_borderlands',spot:'mourning_marsh'},{k:'Ashen Ravine',x:14.5,y:45.5,loc:'valen_borderlands',spot:'ashen_ravine'}]},
  {id:'seals', n:'The Broken Seals', img:'assets/maps/broken_seals.webp', open:() => G.ch >= ARC5_MAP_CH,
   locs:['forgotten_battlefield','forgotten_sanctuary','celestial_ruins','land_beyond_seal'],
   nodes:[{k:'Celestial Ruins',x:57.7,y:10,loc:'celestial_ruins'},{k:'Forgotten Battlefield',x:50,y:17,loc:'forgotten_battlefield'},{k:'Sanctuary of Forgotten Light',x:69,y:38.7,loc:'forgotten_sanctuary'},
          {k:'The Land Beyond the Seal',x:91,y:90,loc:'land_beyond_seal'},{k:'Tribute',x:74,y:68,loc:'capital',ref:true},{k:'Dragonvale',x:83,y:25,loc:'dragon_vale',ref:true},{k:'Valen Territory',x:21.4,y:43,loc:'valen_borderlands',ref:true},
          {k:'Black Forest',x:33,y:27.6,loc:'black_forest',ref:true}]},
  {id:'hunt', n:'The Fifteen Evils', img:'assets/maps/fifteen_evils.webp', open:() => G.ch >= ARC6_MAP_CH, schem:true,   // Arc VI map: picture not generated yet; schematic positions are placeholders
   locs:['northern_frontier','black_forest','forest_of_thorns','mourning_valley','crownless_marches','archive_shrine'],
   nodes:[{k:'Tribute',x:50,y:88,loc:'capital',ref:true},{k:'The Northern Frontier',x:50,y:66,loc:'northern_frontier'},{k:'The Black Forest',x:30,y:46,loc:'black_forest'},{k:'The Forest of Thorns',x:36,y:24,loc:'forest_of_thorns'},{k:'Mourning Valley',x:68,y:28,loc:'mourning_valley'},{k:'The Crownless Marches',x:84,y:12,loc:'crownless_marches'},{k:'The Abandoned Archive-Shrine',x:16,y:70,loc:'archive_shrine'}]},
];
WORLD_MAPS.push({id:'sunken', n:'The Sunken Crown', img:'assets/maps/sunken_crown.webp', open:() => G.ch >= 167, schem:true,   // Arc VII map: picture not generated yet; schematic positions are placeholders
   locs:['black_tide_waters','sunken_kingdom'],
   nodes:[{k:'Dragonvale',x:50,y:14,loc:'dragon_vale',ref:true},{k:'The Forbidden Waters',x:50,y:46,loc:'black_tide_waters'},{k:'The Sunken Kingdom',x:50,y:82,loc:'sunken_kingdom'}]});
const mapFor = locId => (WORLD_MAPS.find(m => m.locs.includes(locId)) || WORLD_MAPS[0]).id;
function mapEntries(m){
  const out = m.nodes.map(n => ({key:n.loc+'|'+(n.spot||''), label:n.k, loc:n.loc, spot:n.spot, ref:n.ref, node:n}));
  m.locs.forEach(id => { if(!out.some(e => e.loc===id && !e.spot)) out.push({key:id+'|', label:LOCATIONS[id].n, loc:id}); });
  return out;
}
function mapEntryInfo(e){
  const L = LOCATIONS[e.loc], sp = e.spot && L.spots.find(s => s.id===e.spot), open = locOpen(e.loc);
  const lock = !open ? '🔒 '+unlockText(L.unlock) : (sp ? spotLock(sp) : '');
  return {L, sp, open, lock, here: G.loc===e.loc, icon: sp ? sp.icon : L.icon, visited: !!G.visited[e.loc]};
}
function setMapMode(m){ mapMode = m; try{ localStorage.setItem(MAPMODE_KEY, m); }catch(err){} render(); }
function mapImgBad(id){ if(!mapBad[id]){ mapBad[id] = true; render(); } }
function mapOpenSpot(spot){ spotOpen = spot; showTab('here'); }
function mapPanel(e){
  if(!e) return '<div class="sm" style="margin:6px 0">Tap a place to see it and how to get there.</div>';
  const i = mapEntryInfo(e); let act = '';
  if(!i.open) act = `<div class="sm">${i.lock}</div>`;
  else if(i.here) act = (i.sp ? (i.lock ? `<div class="sm">${i.lock}</div>` : `<button class="pri" onclick="mapOpenSpot('${e.spot}')">Open here</button>`) : `<div class="sm">📍 You are here.</div><button onclick="showTab('here')">🧭 Go to Here</button>`);
  else { const ops = travelOptions().filter(o => o.to===e.loc);
    act = ops.length ? ops.map(o => `<button class="pri" ${o.can?'':'disabled'} onclick="doTravelUi(${ROUTES.indexOf(o.r)},'${o.to}')">${MODES[o.r.mode].icon} ${o.r.n} · ${o.r.days} day${o.r.days>1?'s':''} · ${o.cost}g</button>`).join(' ')+(ops.some(o => !o.modeOk)?'':'')
      : `<div class="sm">No direct road from ${LOCATIONS[G.loc].n}: travel to a connecting place first.</div>`;
    if(i.sp && i.lock) act += `<div class="sm">${i.lock}</div>`; }
  return `<div class="panel"><b>${i.icon} ${e.label}</b> <span class="sm">· ${i.L.n}${i.here?' · 📍 here':i.visited?' · visited':''}</span><div class="sm" style="margin:4px 0">${(i.sp&&i.sp.desc)||i.L.desc||''}</div>${act}</div>`;
}
function rMaps(){
  const cur = mapView || mapFor(G.loc);
  const tabs = WORLD_MAPS.map(m => `<button class="${cur===m.id?'pri':''}" ${m.open()?'':'disabled'} onclick="mapView='${m.id}';mapSel=null;render()">🗺️ ${m.open()?m.n:'???'}</button>`).join('');
  const m = WORLD_MAPS.find(x => x.id===cur && x.open()) || WORLD_MAPS[0];
  const toggle = MAP_MODES.map(([k,l]) => `<button class="${mapMode===k?'pri':''}" onclick="setMapMode('${k}')">${l}</button>`).join('');
  const bad = !!mapBad[m.id], mode = (mapMode==='image' && bad) ? 'nodes' : mapMode;
  const ents = mapEntries(m), sel = ents.find(e => e.key===mapSel) || null;
  let body = '';
  const picture = bad ? '' : `<img class="pg" src="${m.img}" alt="${m.n} map" loading="lazy" onerror="mapImgBad('${m.id}')">`;
  if(mode==='image') body = picture;
  else if(mode==='nodes'){
    const dots = m.nodes.map(n => { const e = ents.find(x => x.loc===n.loc && x.spot===n.spot), i = mapEntryInfo(e);
      return `<button class="mnode ${i.here?'here':''} ${e.key===mapSel?'sel':''} ${i.lock?'lock':''} ${n.ref?'ref':''}" style="left:${n.x}%;top:${n.y}%" onclick="mapSel='${e.key}';render()" aria-label="${n.k}">${i.open?i.icon:'🔒'}</button>${e.key===mapSel?`<span class="mlabel" style="left:${n.x}%;top:${n.y}%">${n.k}</span>`:''}`; }).join('');
    const lines = bad || m.schem ? `<svg class="mlines" viewBox="0 0 100 100" preserveAspectRatio="none">${ROUTES.map(r => { const a = m.nodes.find(n => n.loc===r.a), b = m.nodes.find(n => n.loc===r.b); return a&&b ? `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>` : ''; }).join('')}</svg>` : '';
    body = `<div class="mapbox ${bad||m.schem?'schem':''}">${bad||m.schem?'':picture}${lines}${dots}</div>${bad||m.schem?'<div class="sm">The picture for this map is not available yet: showing a schematic of the places and roads.</div>':''}`;
  } else {
    body = `<div class="maplist">${ents.map(e => { const i = mapEntryInfo(e);
      return `<div class="card ${i.lock?'lock':''} ${e.key===mapSel?'cur':''}" onclick="mapSel='${e.key}';render()"><span class="big">${i.open?i.icon:'🔒'}</span><div class="fl"><b>${e.label}</b><div class="sm">${e.spot?i.L.n+' · ':''}${i.here?'📍 You are here':i.visited?'Visited':i.open?'Reachable':'Locked'}</div></div></div>`; }).join('')}</div>`;
  }
  return `<h4>World maps</h4><div class="row" style="margin:4px 0">${tabs}</div><div class="row" style="margin:4px 0">${toggle}</div>${body}${mapPanel(sel)}`;
}
