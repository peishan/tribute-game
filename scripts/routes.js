/* =====================================================================
   TRIBUTE — HISTORICAL ROUTE RECONSTRUCTION (Arc IX's investigation mechanic)
   Players collect fragments of old maps and compare them against modern travel routes. It expands the investigation system without another open-world region.
   Six fragments (each earned by a finished investigation clue from ch216 on) light up the OLD alliance road between Tribute and Dragonvale on a small schematic, drawn
   beside the modern route. With all six the road is reconstructed: a Chronicle line, a one-time reward and the flag old_route_reconstructed.
   It lives in the Palace's research section (Imperial Network, tab "Old Routes"), and needs Adrian at the Palace (greyed while he is away).  State: G.flags only.
   ===================================================================== */
const ROUTE_FRAGMENTS = [
  {id:'checkpoint', n:'The old checkpoint', spot:'ruined_checkpoint', x:70, y:40, t:'A major post on the road, absent from current maps.'},
  {id:'markers', n:'Alliance markers', spot:'alliance_markers', x:120, y:30, t:'Carved compass roses of the older diplomatic system.'},
  {id:'permits', n:'Permits and ledgers', spot:'permits_ledgers', x:170, y:42, t:'A steady flow of travellers until the years before the alliance broke.'},
  {id:'border', n:'Border routes', spot:'dates_adjusted', x:220, y:30, t:'Border routes and missing envoys, reclassified or destroyed in the royal archive.'},
  {id:'envoy', n:'The secondary envoy\'s road', spot:'secondary_envoy', x:260, y:44, t:'The envoy of the early negotiations travelled this way.'},
  {id:'ruins', n:'Unrecorded ruins', spot:'unrecorded_ruins', x:290, y:32, t:'Unrecorded ruins and restricted research sites on the old route.'},
];
const routesOpen = () => !!G && G.ch >= 216;
const routeFound = f => !!G.flags['inv_'+f.spot];
const routeCount = () => ROUTE_FRAGMENTS.filter(routeFound).length;
function rRoutes(){
  const n = routeCount(), done = n >= ROUTE_FRAGMENTS.length;
  const pts = ROUTE_FRAGMENTS.filter(routeFound), line = pts.length ? 'M30,50 L'+pts.map(p => p.x+','+p.y).join(' L')+(done ? ' L330,50' : '') : '';
  const svg = `<svg viewBox="0 0 360 110" style="width:100%;max-width:380px;display:block;margin:6px auto" role="img" aria-label="Old route and modern route"><text x="6" y="14" font-size="9" fill="currentColor" opacity=".7">Tribute</text><text x="300" y="14" font-size="9" fill="currentColor" opacity=".7">Dragonvale</text>
    <path d="M30,90 L330,90" stroke="#8a8a8a" stroke-width="2" stroke-dasharray="5 4" fill="none"/><text x="130" y="106" font-size="8" fill="currentColor" opacity=".7">modern route</text>
    ${line ? `<path d="${line}" stroke="#5fbf8a" stroke-width="2.5" fill="none"/>` : ''}
    ${ROUTE_FRAGMENTS.map(f => `<circle cx="${f.x}" cy="${f.y}" r="6" fill="${routeFound(f) ? '#5fbf8a' : 'none'}" stroke="${routeFound(f) ? '#5fbf8a' : '#777'}" stroke-dasharray="${routeFound(f) ? '' : '2 2'}"/>`).join('')}
    <circle cx="30" cy="50" r="5" fill="#d9a441"/><circle cx="330" cy="50" r="5" fill="#d9a441"/></svg>`;
  return `<div class="panel"><b>HISTORICAL ROUTE RECONSTRUCTION</b><div class="sm">${n} / ${ROUTE_FRAGMENTS.length} map fragments${done ? ' · <b>The old road is reconstructed</b>' : ''}. The green line is the old alliance road; the dashed grey line is the modern route. Each finished clue on the old road adds a fragment.</div>${svg}`
   + ROUTE_FRAGMENTS.map(f => `<div class="li"><b>${routeFound(f) ? '🧭 '+f.n : '❔ ???'}</b>${routeFound(f) ? `<div class="sm">${f.t}</div>` : ''}</div>`).join('') + `</div>`;
}
function routesSync(){
  if(!G || !G.flags || !routesOpen() || G.flags.old_route_reconstructed || routeCount() < ROUTE_FRAGMENTS.length) return;
  G.flags.old_route_reconstructed = true; chronicle('The old alliance road between Tribute and Dragonvale was reconstructed from six map fragments.', '🧭'); toast('🧭 The old road is reconstructed');
  gainXp(150 + avgPartyLv()*10, G.party); G.gold += 400; save();
}
deed('route_first', 'world', 'A fragment of the old road', '🧭', 'A fragment of the old alliance road was found.', () => routesOpen() && routeCount() >= 1);
deed('route_all', 'world', 'The road, restored on paper', '🗺️', 'The old alliance road was reconstructed.', () => !!G.flags.old_route_reconstructed);
