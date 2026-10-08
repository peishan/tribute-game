/* =====================================================================
   TRIBUTE — PASSAGES AND SPIRIT PATHS (from Crimson Tide's Route Access, Current Mapping and wilderness choices), plus allegiance cards
   PASSAGES  Each region behind a seal or barrier has a passage status: Open / Conditional / Shared / Restricted / Sealed / Unclassified.
             Only the story changes it (rules below read flags; chapters can also call setPassage(id, status)). Everything starts Unclassified, and a
             region is listed only once the party knows of it. A tab on the Imperial Network from ch123.
   SPIRIT PATHS  With Rin (only in the northern areas) or Sky in the party, the party can chart a spirit-path node, one at a time. Each costs a day.
             Pure discovery: a Chronicle line and a little XP, no currency. Sky has a second, rarer set only he can read. Two nodes are guardians:
             leave them be (a small blessing) or provoke them (a real fight with better drops). Nothing is lost either way.
   State: G.passage = {id: status}, G.spirit = {charted:{nodeId:day}, guard:nodeId|null}.  Node and region wording is first-pass: edit freely.
   ===================================================================== */
const PASSAGE_LEVELS = {
  open:{icon:'🟢', n:'Open', d:'A way the party can use safely.'}, conditional:{icon:'🟡', n:'Conditional', d:'Needs preparation, care or permission.'},
  shared:{icon:'🔵', n:'Shared', d:'Others have been trusted with the way.'}, restricted:{icon:'🔴', n:'Restricted', d:'Judged unsafe or wrong to open.'},
  sealed:{icon:'⚫', n:'Sealed', d:'It cannot be opened.'}, unclassified:{icon:'⚪', n:'Unclassified', d:'No decision has been made.'},
};
/* rules: [test (flag name or function), status, note]; the last one that is true wins. Wording and chapters follow the storyline session's review: the land beyond the seal
   (the forgotten world and the cut-off civilization are the same place) was only opened temporarily at ch138 and nothing permanent is decided; Mourning Valley's sacred grounds
   are protected by decree at ch156 (general access to the valley is not decided); Forest of Thorns stays Unclassified. Altan, the Black Forest and the Northern Frontier are not
   barrier regions and are not listed; the Crownless Marches and Cloudrend Peaks stay hidden until their chapters exist. */
const PASSAGE_REGIONS = [
  {id:'beyond_seal', n:'The Land Beyond the Seal', vis:() => locOpen('land_beyond_seal'), rules:[
    [() => G.ch === 138, 'conditional', 'Beyond the ancient seal lies a forgotten land. A narrow passage has been opened, but the way remains uncertain.'],
    [() => G.ch >= 139, 'unclassified', 'The barrier concealed more than danger. Its purpose must be understood before the way can be judged.']]},
  {id:'thorns', n:'The Forest of Thorns', vis:() => locOpen('forest_of_thorns'), rules:[
    [() => true, 'unclassified', 'The forest has fallen beneath a spreading corruption. Dangerous creatures wander among its thorns.'],
    [() => G.ch >= 152, 'unclassified', 'The Thorned Widow has fallen. What remains of the forest\'s corruption is not yet known.']]},
  {id:'mourning', n:'Mourning Valley', vis:() => locOpen('mourning_valley'), rules:[
    [() => true, 'unclassified', 'A spectral guardian watches the valley. Those who disturb its ancient grounds risk its wrath.'],
    [() => G.ch >= 156, 'restricted', 'By royal decree, the valley\'s sacred grounds are protected. None may disturb the resting spirits. General access to the valley has not been decided.']]},
  {id:'dima', n:'Dima\'s Sanctuary', vis:() => locOpen('dima_sanctuary'), rules:[]},
  {id:'xima', n:'Xima Realm', vis:() => locOpen('xima_realm'), rules:[]},
];
function passageOf(r){
  const set = G.passage && G.passage[r.id]; if(set) return {s:set, note:''};
  let s = 'unclassified', note = ''; r.rules.forEach(x => { let t = false; try{ t = typeof x[0]==='function' ? x[0]() : !!G.flags[x[0]]; }catch(e){} if(t){ s = x[1]; note = x[2]; } }); return {s, note};
}
function passageSync(){   // a change of status is written to the Chronicle once; the first sync is quiet
  if(!G.passSeen){ G.passSeen = {}; PASSAGE_REGIONS.forEach(r => { try{ if(r.vis()) G.passSeen[r.id] = passageOf(r).s; }catch(e){} }); return; }
  PASSAGE_REGIONS.forEach(r => { let v = false; try{ v = r.vis(); }catch(e){} if(!v) return; const s = passageOf(r).s, was = G.passSeen[r.id];
    if(was !== s){ G.passSeen[r.id] = s; if(was !== undefined || s !== 'unclassified'){ chronicle('Passage to '+r.n+': '+PASSAGE_LEVELS[s].n+'.', '🚪'); } } });
}
function setPassage(id, status){   // called by a chapter that decides a passage
  const r = PASSAGE_REGIONS.find(x => x.id===id); if(!r || !PASSAGE_LEVELS[status]) return [];
  if(!G.passage) G.passage = {}; G.passage[id] = status; chronicle('Passage to '+r.n+': '+PASSAGE_LEVELS[status].n+'.', '🚪'); save();
  return ['🚪 '+r.n+': '+PASSAGE_LEVELS[status].n+'.'];
}
function rPassages(){
  const list = PASSAGE_REGIONS.filter(r => { try{ return r.vis(); }catch(e){ return false; } });
  return `<div class="sm">Where the seals and barriers have taken the party, and what the way there is like now. Only the story and your decisions in it change this.</div>` + (list.map(r => { const p = passageOf(r), L = PASSAGE_LEVELS[p.s];
    return `<div class="ev"><div><b>${L.icon} ${r.n}</b> <span class="sm">· ${L.n}</span><div class="sm">${p.note || L.d}</div></div></div>`; }).join('') || '<div class="sm">No regions recorded yet.</div>');
}
/* ---------------- SPIRIT PATHS ---------------- */
const SPIRIT_NODES = [
  {id:'sp_mouth', pool:'rin', icon:'🌲', n:'Where the Path Begins', t:'Rin shows where the spirit path leaves the ordinary trail: a bend that looks like any other.'},
  {id:'sp_crossing', pool:'rin', icon:'🪨', n:'A Quiet Crossing', t:'The animals avoid it. Rin says that is the signpost.'},
  {id:'sp_marker', pool:'rin', icon:'⛩️', n:'The Shrine Marker', t:'A small marker, older than the villages nearby, kept clear of moss by someone.'},
  {id:'sp_watch', pool:'rin', icon:'👁️', n:'The Watching Place', guardian:true, t:'Rin goes still. Something old is watching here, and it has not decided about you.'},
  {id:'sp_stone', pool:'rin', icon:'🪨', n:'A Worn Stone', t:'Pressed smooth by many hands over many years.'},
  {id:'sp_turn', pool:'rin', icon:'🔁', n:'Where the Path Turns Back', t:'The path doubles back on itself here. Rin says it is not lost; it is listening.'},
  {id:'sk_memory', pool:'sky', icon:'💭', n:'An Old Memory', t:'Not Sky\'s own. Something that happened here once, still caught in the light like a scent in a closed room.'},
  {id:'sk_route', pool:'sky', icon:'🗺️', n:'A Forgotten Route', t:'Nobody uses it now, but the light still remembers the shape of it.'},
  {id:'sk_light', pool:'sky', icon:'✨', n:'An Unusual Light', t:'It moves against everything around it, as if still doing a job it was given long ago.'},
  {id:'sk_place', pool:'sky', icon:'🕯️', n:'A Place of Significance', t:'Sky will not go any closer. Not fear, exactly. Something nearer to respect.'},
  {id:'sk_hand', pool:'sky', icon:'🏺', n:'Sign of an Older Hand', t:'Worked by someone, long before the villages. Devon will want to see this.'},
];
function spirit(){ if(!G.spirit) G.spirit = {charted:{}, guard:null}; return G.spirit; }
const spiritOpen = () => !!G && !!G.flags && !!G.flags.rin_met && G.ch >= 149;
const spiritPool = pool => pool==='rin' ? (typeof presentGuests==='function' && presentGuests().includes('rin')) : isRecruited('sky');
const spiritNext = pool => SPIRIT_NODES.find(n => n.pool===pool && !spirit().charted[n.id]);
function spiritChart(pool){
  const st = spirit(); if(st.guard || !spiritPool(pool)) return [];
  const n = spiritNext(pool); if(!n) return ['Nothing more to chart here for now.'];
  st.charted[n.id] = G.day; chronicle('Spirit path charted: '+n.n+'.', '🌿');
  const msgs = [n.icon+' '+n.n+': '+n.t];
  if(n.guardian){ st.guard = n.id; msgs.push('The presence waits. Leave it be, or provoke it?'); }
  else gainXp(30+avgPartyLv()*3, G.party).forEach(m => msgs.push(m));
  return msgs.concat(advanceDay(1));
}
function guardianLeave(){
  const st = spirit(); if(!st.guard) return []; const n = SPIRIT_NODES.find(x => x.id===st.guard); st.guard = null;
  chronicle('A guardian on the spirit path was left in peace: '+n.n+'.', '🌿');
  const msgs = ['🌿 You step back and wait. The presence settles, and the air eases. Rin: "That was kind."']; if(typeof matGift==='function'){ matGift('spirit_thread'); msgs.push('🧵 It leaves a Spirit Thread at your feet, freely given.'); } gainXp(60+avgPartyLv()*6, G.party).forEach(m => msgs.push(m));
  if(typeof regardAdd==='function'){ const m = regardAdd(G.loc, 5); if(m) msgs.push(m); } return msgs;
}
function guardianProvoke(){
  const st = spirit(); if(!st.guard) return []; const n = SPIRIT_NODES.find(x => x.id===st.guard); st.guard = null;
  chronicle('A guardian on the spirit path was provoked: '+n.n+'.', '🌿'); save();
  origin = 'here'; startBattle({foes:[{key:'corrupted_stag', lv:avgPartyLv()+2}, {key:'xima_sprite', lv:avgPartyLv()}], rewards:true}); tab = 'battle'; render(); return 'battle';
}
function rSpirit(){
  if(!spiritOpen()) return '<div class="sm">Spirit paths open once Rin has joined the road.</div>';
  const st = spirit(), g = st.guard && SPIRIT_NODES.find(x => x.id===st.guard);
  const nodes = pool => SPIRIT_NODES.filter(n => n.pool===pool), done = pool => nodes(pool).filter(n => st.charted[n.id]);
  const sec = (pool, title, who) => { const d = done(pool), here = spiritPool(pool), nx = spiritNext(pool);
    return `<h4>${title} <span class="sm">${d.length}/${nodes(pool).length}</span></h4>${d.map(n => `<div class="li"><b>${n.icon} ${n.n}</b><div class="sm">${n.t}</div></div>`).join('')}${nx?`<button ${here&&!st.guard?'':'disabled'} onclick="act(spiritChart,'${pool}')">🧭 Chart the next node</button>${here?'':`<div class="sm">${who}</div>`}`:'<div class="sm">Everything here has been charted.</div>'}`; };
  return `<div class="sm">Spirit paths are charted one node at a time and cost a day. They are discoveries, not treasure.</div>` + (g ? `<div class="panel"><b>${g.icon} ${g.n}</b><div class="sm">${g.t}</div><button onclick="act(guardianLeave)">🌿 Leave it be</button><button onclick="guardianProvoke()">⚔️ Provoke it</button></div>` : '')
    + sec('rin', 'Rin\'s paths', 'Rin only walks these in the northern areas.') + (isRecruited('sky') ? sec('sky', 'Sky\'s paths', '') : '');
}
deed('pass1', 'world', 'A way recorded', '🚪', 'A region behind a seal or barrier was recorded.', () => PASSAGE_REGIONS.some(r => { try{ return r.vis(); }catch(e){ return false; } }));
deed('spirit3', 'world', 'Walker of the paths', '🌿', 'Three spirit-path nodes charted.', () => Object.keys(spirit().charted).length >= 3);
deed('spirit_all', 'world', 'Every path remembered', '🌿', 'Every spirit-path node charted.', () => SPIRIT_NODES.every(n => spirit().charted[n.id]));
deed('guard_peace', 'world', 'Left in peace', '🌿', 'A guardian was left in peace.', () => (G.chron||[]).some(e => /left in peace/.test(e.t)));
