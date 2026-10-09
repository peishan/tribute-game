/* =====================================================================
   TRIBUTE — ARC VII SYSTEMS (from the author's Arc VII outline)
   A. Historical Evidence: six sets of finds that rebuild the Sunken Kingdom's history. The journal sorts the finds by itself (they are the investigation spots
      already in the game); finishing a set pays a little XP once. Nothing here is a puzzle.
   B. Preservation Network: five nodes (inactive / unstable / restored) tied to story progress. All five restored = a permanent world state.
   (C, the Register's classifications, lives in evils.js.)
   State: G.flags.evset_<id>, G.flags.network_restored. First-pass wording: edit freely.
   ===================================================================== */
const EVIDENCE = [
  {id:'inscriptions', icon:'🏺', n:'Ancient inscriptions', why:'They reveal the preservation network.', spots:['inscriptions','restoration_network','restoration_chambers','sealed_districts']},
  {id:'council', icon:'👑', n:'Royal council records', why:'They explain the Drowned Crown.', spots:['final_days','deliberate_sub','crown_origin','council_command','crown_memories']},
  {id:'charts', icon:'🗺️', n:'Maritime charts', why:'They identify the erased sea routes.', spots:['maritime_records','sea_calm','missing_records','erased_routes','recover_records']},
  {id:'pearl', icon:'🔮', n:'Dragon Pearl records', why:'They explain Devon\'s inheritance.', spots:['pearl_origin','pearl_function','pearl_responsibility','pearl_family','pearl_authority']},
  {id:'restoration', icon:'💙', n:'Restoration records', why:'They reveal the Black Tide\'s original nature.', spots:['pendant_link','sky_restored','tide_layered','tide_origin','purify_waters']},
  {id:'diplomatic', icon:'🤝', n:'Diplomatic documents', why:'They establish the ancient alliance.', spots:['deep_archives','enter_archive','ancient_alliance','history_recognised','unresolved_mysteries']},
];
const evidenceOpen = () => !!G && G.ch >= 172;
const evFound = s => !!G.flags['inv_'+s];
const evCount = e => e.spots.filter(evFound).length;
const evDone = e => evCount(e) >= e.spots.length;
const evSetsDone = () => EVIDENCE.filter(evDone).length;
function rEvidence(){
  return `<div class="panel"><b>HISTORICAL EVIDENCE</b><div class="sm">${evSetsDone()} / ${EVIDENCE.length} sets complete. Jade's journal files each find by itself; finishing a set earns investigation XP once. The deductions themselves come from the investigations.</div>`
   + EVIDENCE.map(e => `<div class="li"><b>${e.icon} ${e.n}</b> <span class="sm">· ${evCount(e)} / ${e.spots.length}${evDone(e)?' · ✔ complete':''}</span><div class="sm">${e.why}</div>`
     + e.spots.map(id => { const s = spotById(id); return `<div class="sm">${evFound(id)?'✔ ':'◻ '}${evFound(id) && s ? s.n : '???'}</div>`; }).join('') + `</div>`).join('') + `</div>`;
}
const NETWORK = [
  {id:'barrier', icon:'🛡️', n:'Maritime Barrier', t:'Protects the expedition ships.', found:'black_tide_met', fix:'inv_defend_ships', x:50, y:30},
  {id:'archive', icon:'📚', n:'Archive Seal', t:'Unlocks the historical records.', found:'maris_met', fix:'inv_enter_archive', x:250, y:30},
  {id:'chamber', icon:'⚗️', n:'Restoration Chamber', t:'Makes Sky\'s purification ritual possible.', found:'sunken_kingdom_found', fix:'inv_purify_waters', x:50, y:150},
  {id:'anchor', icon:'🔮', n:'Dragon Pearl Anchor', t:'Joins Devon\'s artifact to the network.', found:'pearl_resonates', fix:'pearl_authority_restored', x:250, y:150},
  {id:'core', icon:'🌊', n:'Central Preservation Core', t:'Restores the Black Tide.', found:'drowned_crown_met', fix:'black_tide_restored', x:150, y:90},
];
const netNodeState = n => G.flags[n.fix] ? 'restored' : G.flags[n.found] ? 'unstable' : 'inactive';
const networkRestored = () => NETWORK.every(n => netNodeState(n)==='restored');
const NODE_COL = {inactive:'#777', unstable:'#d9a441', restored:'#5fbf8a'};
function rNetworkMap(){
  const core = NETWORK.find(n => n.id==='core');
  const lines = NETWORK.filter(n => n!==core).map(n => `<line x1="${n.x}" y1="${n.y}" x2="${core.x}" y2="${core.y}" stroke="${NODE_COL[netNodeState(n)]}" stroke-width="2" ${netNodeState(n)==='restored'?'':'stroke-dasharray="4 4"'}/>`).join('');
  const dots = NETWORK.map(n => { const s = netNodeState(n); return `<circle cx="${n.x}" cy="${n.y}" r="${n===core?17:13}" fill="${NODE_COL[s]}" fill-opacity="${s==='restored'?.95:.55}" stroke="${NODE_COL[s]}"/><text x="${n.x}" y="${n.y+5}" font-size="14" text-anchor="middle">${n.icon}</text>`; }).join('');
  return `<svg viewBox="0 0 300 180" style="width:100%;max-width:340px;display:block;margin:6px auto" role="img" aria-label="Preservation network">${lines}${dots}</svg>`;
}
function rPreservation(){
  const done = networkRestored();
  return `<div class="panel"><b>SUNKEN KINGDOM PRESERVATION NETWORK</b><div class="sm">${NETWORK.filter(n => netNodeState(n)==='restored').length} / ${NETWORK.length} nodes restored${done?' · <b>Restored</b>: a permanent change to the world':''}. Grey: inactive. Amber: unstable. Green: restored.</div>${rNetworkMap()}`
   + NETWORK.map(n => { const s = netNodeState(n); return `<div class="li"><b>${n.icon} ${s==='inactive'?'???':n.n}</b> <span class="sm">· ${s==='restored'?'🟢 Restored':s==='unstable'?'🟡 Unstable':'⚪ Inactive'}</span>${s==='inactive'?'':`<div class="sm">${n.t}</div>`}</div>`; }).join('') + `</div>`;
}
function sunkenSync(){
  if(!G || !G.flags || !evidenceOpen()) return;
  let ch = false;
  EVIDENCE.forEach(e => { if(evDone(e) && !G.flags['evset_'+e.id]){ G.flags['evset_'+e.id] = true; ch = true; chronicle('Evidence set complete: '+e.n+'.', e.icon); toast(e.icon+' '+e.n+': complete'); gainXp(80+avgPartyLv()*8, G.party); } });
  if(networkRestored() && !G.flags.network_restored){ G.flags.network_restored = true; ch = true; chronicle('Sunken Kingdom Preservation Network: Restored.', '🌊'); toast('🌊 The preservation network is restored'); }
  if(ch) save();
}
deed('evset1', 'world', 'The first set', '🏺', 'One set of historical evidence was completed.', () => evSetsDone() >= 1);
deed('evset6', 'world', 'The whole history', '📜', 'Every set of historical evidence was completed.', () => evSetsDone() >= EVIDENCE.length);
deed('network', 'world', 'The network, restored', '🌊', 'The Sunken Kingdom Preservation Network was restored.', () => !!G.flags.network_restored);
