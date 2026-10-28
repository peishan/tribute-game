/* =====================================================================
   TRIBUTE — ARC XXVI: THE RESTORATION NETWORK WAKES (the author's unlocks, chapters 667-685)
   RELEASE THE DEAD (ch675, flag release_the_dead_learned). Against remains (River Dead and the Bone River\'s adds) the player can: FIGHT them as always (destroying scatters the energy: a 20% chance of a
     Restoration Shard), STABILIZE one (spends the turn: Sky never fails, a diagnosed foe never fails, others 65%; a stabilised foe stands still for 4 of its turns) and RELEASE a stabilised one (it is freed, no longer
     pulled by the network, and gives Restoration Shard, River Essence or Preservation Material, sometimes lore). Released remains cannot be rebuilt by the Bone River.
   RESTORATION CURRENTS (ch684, flag river_flows_forward). Ancient places hold an active current: Bathe (heal and restore, once a day per place), Reveal a hidden ruin, Activate an old mechanism and Open an optional
     route (each once per place; the route is one day shorter).
   PEARL SENSE (Devon, from ch669). Not Dragon Manifestation and not his Black Pearl skills: an Exploration ability, once a day, used on the next search at an ancient place: it uncovers one of a sealed door,
     a hidden inscription (an extra clue), a network node or optional lore.
   RESTORATION DIAGNOSIS (Sky, from ch674). A skill and an Exploration ability: it names the energy in front of him (healing, preservation, corruption or failed restoration); in battle it marks a foe
     (def -15%, and stabilising it never fails); on a search it adds XP and, for corruption or failed restoration, an extra clue.
   ANCIENT ROUTE TRACKING (Levi, from ch670): Trail Sense upgraded in ancient places: 50% of searches cost no day and more clue XP.
   THE BONE RIVER (ch682, four phases): 1 Drowned Remains (the dead flood the field), 2 Broken Current (each round the current sweeps two allies for 8% unless they Guard), 3 Reconstruction (destroyed remains
     are rebuilt at half life unless released) and 4 Sever the Failed Loop (the core takes 25% damage and the River heals until: SKY identifies the loop, DEVON stabilises the Pearl resonance, JADE severs the loop).
   All numbers first-pass.
   ===================================================================== */
Object.assign(ITEMS, {
  restoration_shard:{n:'Restoration Shard',icon:'💠',type:'material',rarity:'rare'},
  river_essence:{n:'River Essence',icon:'💧',type:'material',rarity:'rare'},
  preservation_material:{n:'Preservation Material',icon:'🏺',type:'material',rarity:'rare'},
});
const REMAINS = ['river_dead'];
ENEMIES.river_dead.traits = (ENEMIES.river_dead.traits||[]).concat('remains');
Object.assign(ENEMIES, {
  boss_bone_river:{n:'The Bone River',icon:'🐍',area:'swamp',boss:true,hp:11000,atk:56,mag:58,def:33,spd:19,xp:4000,gold:2900,traits:['magic','corrupt'],
    moves:[{n:'Drowned Grasp',pow:1.3},{n:'Reconstruction Tide',pow:1.0,all:true,spell:true},{n:'Unfinished Repair',pow:1.5,spell:true},{n:'Cycle of Return',pow:1.2,spell:true,fx:[{k:'slow',d:1}]}],
    phases:[
      {at:.75,msg:'Phase two: Broken Current. The water channels shift under the party\'s feet',atk:1.05},
      {at:.5,msg:'Phase three: Reconstruction. The River refuses to let them stay dead',atk:1.05},
      {at:.25,msg:'Phase four: Sever the Failed Loop. The restoration cycle shows itself, and it will never stop on its own',atk:1.1}],
    desc:'One of the Fifteen. It is not malicious: it simply cannot stop trying to repair the dead, and has become a loop that only ends if it is cut.'},
});
LOOT.boss_bone_river = {guaranteed:[{id:'restoration_shard',qty:[2,3]},{id:'river_essence',qty:[1,2]},{id:'preservation_material',qty:[1,2]}],rolls:[{id:'seal_dust',chance:.6},{id:'spirit_thread',chance:.5}],firstClear:[{id:'celestial_shard',qty:[1,2]}]};
deed('hz_bone_river', 'story', 'Let the dead stay dead', '🐍', 'The Bone River was resolved: its failed loop was severed and its dead were released.', () => !!G.flags.boss_boss_bone_river || (G && G.ch >= 683));
deed('release10', 'hunt', 'Let them move on', '🕊️', 'Ten of the dead were released instead of destroyed.', () => !!(G.releasedN && G.releasedN >= 10));

const BONE_KEY = 'boss_bone_river';
const boneFoes = () => (typeof B!=='undefined' && B && B.foes) ? B.foes.filter(f => !f.dead && f.key===BONE_KEY) : [];
const bonePhase = () => { const f = boneFoes()[0]; return f ? (f.phaseIdx||0) : -1; };
const releaseKnown = () => !!(G && G.flags && G.flags.release_the_dead_learned);
const isRemains = f => !!(f && !f.ally && (f.traits||[]).includes('remains'));
const remainsAlive = () => (typeof B!=='undefined' && B && B.foes) ? B.foes.filter(f => !f.dead && isRemains(f)) : [];
const ANCIENT_PLACES = ['bone_river','sunken_kingdom','dragon_ruins','moonveil_temple','forgotten_sanctuary','celestial_ruins','forgotten_battlefield','land_beyond_seal','archive_shrine','faepool_ruins','western_archive','sealed_sanctuary','old_quarter','dragon_vale'].filter(k => LOCATIONS[k]);
const ancientHere = () => ['bone_river','sunken_kingdom','dragon_ruins','moonveil_temple','forgotten_sanctuary','celestial_ruins','forgotten_battlefield','land_beyond_seal','archive_shrine','faepool_ruins','western_archive','sealed_sanctuary','old_quarter'].includes(G.loc);

/* ---------- Sky: what kind of energy ---------- */
function energyOf(f){
  if(!f) return 'ordinary';
  if(isRemains(f) || f.key===BONE_KEY) return 'failed restoration';
  if((f.traits||[]).includes('corrupt')) return 'corruption';
  if(/sentinel|guardian|relic|spirit_core/.test(f.key||'')) return 'preservation';
  if(/healer|spirit|sprite|wisp/.test(f.key||'')) return 'healing';
  return 'ordinary';
}
function energyAt(loc){
  if(loc==='bone_river') return 'failed restoration';
  if(typeof corrAt==='function' && corrAt(loc) > 0) return 'corruption';
  if(['sunken_kingdom','dragon_ruins','moonveil_temple','forgotten_sanctuary','celestial_ruins','archive_shrine','western_archive','sealed_sanctuary','land_beyond_seal'].includes(loc)) return 'preservation';
  if(['cavern_fireflies','spirit_hollow','dragon_vale'].includes(loc)) return 'healing';
  return 'ordinary';
}
const diagKnown = () => !!(G && G.flags && G.flags.sky_develops_release);
(function(){
  const c = CHARACTERS.sky;
  if(!c.skills.some(s => s.id==='restoration_diagnosis')) c.skills.push({id:'restoration_diagnosis', n:'Restoration Diagnosis', icon:'🩺', mp:5, kind:'support', tgt:'foe', fx:[{k:'diagnose'}], req:{flag:'sky_develops_release'},
    desc:'Sky reads the energy in front of him (ch674): healing, preservation, corruption or failed restoration. The foe\'s DEF falls 15% and, against remains, stabilising never fails.'});
})();

/* ---------- applyFx: diagnose; and the battle hooks ---------- */
(function(){
  const _af = applyFx;
  applyFx = function(src, tgt, fx){
    if(fx && fx.k==='diagnose'){
      if(!tgt || tgt.dead) return;
      tgt.st.diagnosed = {d:99}; tgt.bf.push({stat:'def', m:.85, d:3});
      blog('  🩺 '+tgt.name+': '+energyOf(tgt)+'.'+(isRemains(tgt)?' It can be stabilised without fail.':''),'good');
      return;
    }
    return _af(src, tgt, fx);
  };
  // stabilised foes stand still
  const _fa = foeAct;
  foeAct = function(f){
    if(f && f.st && f.st.stable){ blog(f.name+' stands still, held by the stabilised energy.','good'); return; }
    return _fa(f);
  };
  const _end = endTurn;
  endTurn = function(u){
    _end(u);
    if(typeof B==='undefined' || !B || !u) return;
    if(!u.ally && u.st && u.st.stable && --u.st.stable.d <= 0){ delete u.st.stable; blog('  '+u.name+' stirs again.','bad'); }
    if(!u.ally && u.key===BONE_KEY && !u.dead) boneTurn(u);
  };
  const _hurt = hurt;
  hurt = function(t, d, ignoreShield){
    if(t && !t.ally && t.key===BONE_KEY && bonePhase()>=3 && !B.loopBroken) d = Math.max(1, Math.round(d*.25));
    const was = t && !t.dead, r = _hurt(t, d, ignoreShield);
    if(was && t && t.dead && isRemains(t) && !t.released && Math.random() < .2){ G.inv.restoration_shard = (G.inv.restoration_shard||0) + 1; blog('  💠 The scattered energy leaves a Restoration Shard.','good'); }
    return r;
  };
})();

function remainsStabilize(u){
  const t = remainsAlive().find(f => !(f.st && f.st.stable)); if(!t) return;
  const sure = u.id==='sky' || (t.st && t.st.diagnosed);
  if(sure || Math.random() < .65){ t.st.stable = {d:4}; blog('🔵 '+u.name+' stabilises '+t.name+': it stops, its restless state quiet.','good'); }
  else blog('🔵 '+u.name+' tries to stabilise '+t.name+' but the energy slips away.','bad');
}
const RELEASE_LORE = [
  'A name surfaces as the energy lets go: someone who only wanted to go home.',
  'The released energy carries a fragment of the old rite: heal what is broken, keep what cannot be mended safe.',
  'For a moment the water shows a river that runs clear to the sea, and then it is only water.',
];
function remainsRelease(u){
  const t = remainsAlive().find(f => f.st && f.st.stable); if(!t) return;
  t.released = true; t.hp = 0; t.dead = true; B.releasedN = (B.releasedN||0) + 1; G.releasedN = (G.releasedN||0) + 1;
  const pool = ['restoration_shard','river_essence','preservation_material'], got = [pool[Math.floor(Math.random()*3)]];
  if(Math.random() < .3) got.push(pool[Math.floor(Math.random()*3)]);
  got.forEach(k => { G.inv[k] = (G.inv[k]||0) + 1; });
  blog('🕊️ '+u.name+' releases '+t.name+': the trapped energy lets go and the remains fall still. '+got.map(k => ITEMS[k].icon+' '+ITEMS[k].n).join(', ')+'.','good');
  if(Math.random() < .25 && typeof chronicle==='function'){ const l = RELEASE_LORE[G.releasedN % RELEASE_LORE.length]; blog('  📜 '+l,'sys'); }
  if(typeof stepKill==='function') stepKill(t.key);
}

/* ---------- the Bone River fight ---------- */
function boneTurn(boss){
  const ph = bonePhase();
  if(ph < 0) return;
  const deadOnes = B.foes.filter(f => f.dead && isRemains(f) && !f.released);
  if(ph===0 || ph===1){   // the dead flood the field
    if(remainsAlive().length < (ph===0 ? 3 : 2)){ const u = mkFoeUnit('river_dead', Math.max(1, Math.round(avgPartyLv()-2)), B.foes.length); B.foes.push(u); B.queue.push(u); blog('💀 More of the drowned dead rise from the water.','foe'); }
  }
  if(ph===1){   // broken current
    const hit = alive(B.allies).slice().sort(() => Math.random()-.5).slice(0, 2);
    hit.forEach(a => { if(a.guard || (a.st && a.st.ward)){ blog('  🌊 '+a.name+' holds the higher ground and the current passes.','good'); return; } const d = Math.max(1, Math.round(a.mhp*.08)); hurt(a, d, true); blog('  🌊 The current sweeps '+a.name+' off their footing (−'+d+'). Guard to hold the higher ground.','bad'); });
  }
  if(ph===2){   // reconstruction
    deadOnes.slice(0, 2).forEach(f => { f.dead = false; f.hp = Math.round(f.mhp*.5); B.queue.push(f); blog('♻️ The River rebuilds '+f.name+'. It refuses to let them stay dead. (Released remains cannot be rebuilt.)','foe'); });
  }
  if(ph>=3 && !B.loopBroken){ const h = Math.round(boss.mhp*.02); boss.hp = Math.min(boss.mhp, boss.hp+h); blog('  🔁 The failed loop restores the River (+'+h+'). It will not stop on its own.','foe'); }
}
function loopSky(u){ B.loopId = true; blog('🩺 Sky reads the cycle: "The restoration cycle is corrupted. It keeps trying to complete what cannot be restored. If we do not sever the loop, it will never stop."','good'); }
function loopDevon(u){ B.loopStab = true; blog('🔮 Devon steadies the Pearl resonance: the core is held open. "Keep the core exposed long enough for her to break the cycle."','good'); }
function loopJade(u){ B.loopBroken = true; const f = boneFoes()[0]; if(f){ const d = Math.round(f.mhp*.2); f.hp = Math.max(1, f.hp - d); } blog('✂️ Jade severs the failed loop: the River\'s restorative cycle breaks, and the endless reconstruction stops.','good'); }

(function(){
  const _sb = startBattle;
  startBattle = function(spec){
    _sb(spec);
    if(typeof B==='undefined' || !B) return;
    B.releasedN = 0;
    if(boneFoes().length){ B.loopId = false; B.loopStab = false; B.loopBroken = false; blog('🐍 The Bone River: Phase one, Drowned Remains. It is not malicious. It simply cannot stop trying to repair the dead. Stabilise and release the dead to keep them from being rebuilt.','foe'); }
    else if(remainsAlive().length && releaseKnown()) blog('💬 Remains: fight them, Stabilise one, then Release it for more restoration materials. (Sky never fails to stabilise.)','sys');
  };
})();

function restoreButtons(u){
  if(!(typeof B!=='undefined' && B && u && u.ally && !B.over)) return '';
  let h = '';
  if(releaseKnown() && remainsAlive().length){
    const stab = remainsAlive().some(f => f.st && f.st.stable);
    h += `<button onclick="playerAct('stabilize')">🔵 Stabilise</button>${stab ? `<button class="pri" onclick="playerAct('release')">🕊️ Release</button>` : ''}`;
  }
  const ph = bonePhase();
  if(ph>=3 && !B.loopBroken){
    if(u.id==='sky' && !B.loopId) h += `<button class="pri" onclick="playerAct('loop','sky')">🩺 Identify the Loop</button>`;
    if(u.id==='devon' && B.loopId && !B.loopStab) h += `<button class="pri" onclick="playerAct('loop','devon')">🔮 Stabilise the Pearl Resonance</button>`;
    if(u.id==='jade' && B.loopStab) h += `<button class="pri" onclick="playerAct('loop','jade')">✂️ Sever the Loop</button>`;
  }
  return h;
}
(function(){
  const _pa = playerAct;
  playerAct = function(kind, sid, tuid){
    if(B && !B.over && B.cur && B.cur.ally){
      const u = B.cur;
      if(kind==='stabilize' && releaseKnown() && remainsAlive().length){ remainsStabilize(u); endTurn(u); advance(); return; }
      if(kind==='release' && releaseKnown()){ remainsRelease(u); endTurn(u); advance(); return; }
      if(kind==='loop'){ if(sid==='sky' && u.id==='sky') loopSky(u); else if(sid==='devon' && u.id==='devon' && B.loopId) loopDevon(u); else if(sid==='jade' && u.id==='jade' && B.loopStab) loopJade(u); else return; endTurn(u); advance(); return; }
    }
    return _pa(kind, sid, tuid);
  };
  const _ca = companionAct;
  companionAct = function(u){
    if(releaseKnown() && remainsAlive().length){ if(remainsAlive().some(f => f.st && f.st.stable)){ remainsRelease(u); return; } if(Math.random() < .5){ remainsStabilize(u); return; } }
    return _ca(u);
  };
  if(typeof autoStep==='function'){
    const _as = autoStep;
    autoStep = function(){
      if(B && !B.over && B.cur && B.cur.ally){
        const u = B.cur, ph = bonePhase();
        if(ph>=3 && !B.loopBroken){
          if(u.id==='sky' && !B.loopId) return playerAct('loop','sky');
          if(u.id==='devon' && B.loopId && !B.loopStab) return playerAct('loop','devon');
          if(u.id==='jade' && B.loopStab) return playerAct('loop','jade');
        }
        if(releaseKnown() && remainsAlive().length){
          if(remainsAlive().some(f => f.st && f.st.stable)) return playerAct('release');
          if(u.id==='sky' || Math.random() < .4) return playerAct('stabilize');
        }
        if(ph===1 && !u.guard && u.hp > u.mhp*.5 && Math.random() < .25) return playerAct('guard');
      }
      return _as();
    };
  }
})();

/* ---------- Restoration Currents ---------- */
const currentsOpen = () => !!(G && G.flags && G.flags.river_flows_forward);
const curState = loc => { if(!G.currents) G.currents = {}; return G.currents[loc] = G.currents[loc] || {heal:-99, reveal:false, mech:false, route:false}; };
function currentAct(what){
  if(!currentsOpen() || !ancientHere()) return [];
  const c = curState(G.loc), msgs = [];
  if(what==='heal'){ if(G.day === c.heal) return ['The current has already restored you today.']; c.heal = G.day; restoreParty(); msgs.push('💙 The current runs through the party: HP and MP fully restored.'); }
  else if(what==='reveal'){ if(c.reveal) return []; c.reveal = true; msgs.push.apply(msgs, grantReward({xp:200000+avgPartyLv()*9000, gold:30000}, '🔦 A hidden ruin shows in the current')); G.inv.spirit_thread = (G.inv.spirit_thread||0) + 1; if(typeof chronicle==='function') chronicle('A hidden ruin was revealed by the restoration current at '+LOCATIONS[G.loc].n+'.', '🌊'); }
  else if(what==='mech'){ if(c.mech) return []; c.mech = true; msgs.push.apply(msgs, grantReward({xp:220000+avgPartyLv()*9000, gold:36000}, '⚙️ An old mechanism wakes')); G.inv.seal_dust = (G.inv.seal_dust||0) + 2; }
  else if(what==='route'){ if(c.route) return []; c.route = true; G.flags['current_route_'+G.loc] = true; ROUTES.filter(r => r.a===G.loc || r.b===G.loc).forEach(r => { if(!Object.getOwnPropertyDescriptor(r,'days').get){ const base = r.days; Object.defineProperty(r, 'days', {get(){ return (G.flags['current_route_'+r.a] || G.flags['current_route_'+r.b]) ? Math.max(1, base-1) : base; }, set(v){}, configurable:true, enumerable:true}); } }); msgs.push('🧭 The current opens an old route: travel from here is one day shorter.'); }
  save(); return msgs.concat(advanceDay(what==='heal' ? 0 : 1));
}
function rCurrent(){
  const c = curState(G.loc), here = LOCATIONS[G.loc].n, ready = G.day !== c.heal;
  const btn = (k, label, done) => `<button ${done?'disabled':'class="pri"'} onclick="act(currentAct,'${k}')">${done ? '✔ ' : ''}${label}</button>`;
  return `<div class="panel"><div class="sm">An active restoration current runs beneath ${here}, a vein of the awakened network. It heals, shows what is hidden, wakes old mechanisms and can open an old route.</div>
    ${btn('heal','Bathe in the current (restores the party, once a day)', !ready)} ${btn('reveal','Reveal a hidden ruin', c.reveal)} ${btn('mech','Activate an old mechanism', c.mech)} ${btn('route','Open an old route', c.route)}</div>`;
}
ANCIENT_PLACES.filter(k => k!=='dragon_vale' && k!=='old_quarter').forEach(loc => {
  if(!LOCATIONS[loc].spots.some(s => s.id==='current_'+loc)) LOCATIONS[loc].spots.push({id:'current_'+loc, kind:'current', n:'Restoration Current', icon:'🌊', desc:'An active vein of the restoration network.', needFlag:'river_flows_forward', lockMsg:'🔒 Nothing here has woken yet'});
});

/* ---------- Devon: Pearl Sense; Sky: Diagnosis; Levi: Ancient Route Tracking ---------- */
const pearlSenseOn = () => !!(G && G.flags && G.flags.pearl_reacts_strongly && G.party.includes('devon') && G.active.includes('devon') && !isDisabled('devon'));
const skyDiagOn = () => !!(G && diagKnown() && G.party.includes('sky') && G.active.includes('sky') && !isDisabled('sky'));
const psState = () => { if(!G.psense) G.psense = {day:-99, armed:false, n:0, dday:-99, darmed:false}; return G.psense; };
function armPearl(){ const s = psState(); if(!pearlSenseOn()) return []; if(s.day===G.day && !s.armed) return ['Pearl Sense is spent for today.']; s.day = G.day; s.armed = true; save(); return ['🖤 Devon holds the Pearl out: it will answer on your next search at an ancient place.']; }
function takePearl(){ const s = psState(), v = s.armed; s.armed = false; return v; }
function armDiag(){ const s = psState(); if(!skyDiagOn()) return []; if(s.dday===G.day && !s.darmed) return ['Restoration Diagnosis is spent for today.']; s.dday = G.day; s.darmed = true; save(); return ['🩺 Sky closes his eyes and listens to the energy: he will name it on your next search.']; }
function takeDiag(){ const s = psState(), v = s.darmed; s.darmed = false; return v; }
const PEARL_FINDS = [
  {k:'door', msg:'🚪 The Pearl warms and a sealed door shows in the stone: behind it, a small store of old supplies.', fx:() => { G.inv.preservation_material = (G.inv.preservation_material||0) + 1; G.gold += 12000 + avgPartyLv()*500; }},
  {k:'inscription', msg:'📜 The Pearl lights a hidden inscription, and with it one more clue than the search alone would give.', clue:true},
  {k:'node', msg:'🔷 The Pearl finds a network node: a small point of the restoration network, brought briefly awake.', fx:() => { G.inv.restoration_shard = (G.inv.restoration_shard||0) + 1; G.nodes = (G.nodes||0) + 1; }},
  {k:'lore', msg:'📖 The Pearl hums a fragment of the old network: "Heal what is broken. Keep what cannot be mended safe. Carry it until it is called home."', xp:true},
];
function pearlSenseResult(){
  const s = psState(), f = PEARL_FINDS[s.n++ % PEARL_FINDS.length]; if(f.fx) f.fx();
  const xp = 120000 + avgPartyLv()*6000; return {msg:f.msg, clue:!!f.clue, xp};
}
function exploreExtra(){
  const s = psState(); let h = '';
  const b = (name, can, day, armed, fn) => can ? `<button class="${armed?'pri':''}" ${(day===G.day&&!armed)?'disabled':''} onclick="act(${fn})">${armed?'✔ ':''}${name}</button>` : '';
  h += b('🖤 Pearl Sense', pearlSenseOn(), s.day, s.armed, 'armPearl') + b('🩺 Restoration Diagnosis', skyDiagOn(), s.dday, s.darmed, 'armDiag');
  if(!h) return '';
  return `<div class="panel"><div class="sm">Arc XXVI abilities (once a day each, used on your next search${ancientHere()?'':'; Pearl Sense answers at ancient places'})</div><div class="row" style="margin-top:6px">${h}</div></div>`;
}
(function(){ const _eb = exploreBar; exploreBar = function(){ return _eb() + exploreExtra(); }; })();
function diagResult(){
  const e = energyAt(G.loc), xp = 90000 + avgPartyLv()*5000, extra = (e==='corruption' || e==='failed restoration');
  return {msg:'🩺 Sky names the energy here: '+e+'.'+(extra ? ' It points to where the trouble began: one clue more.' : ''), clue:extra, xp};
}
(function(){
  const _ts = trailSense;
  trailSense = function(sp){
    const r = _ts(sp);
    if(!r || !(G.flags && G.flags.old_channel_found) || !ancientHere()) return r;
    const hidden = Math.random() < .5;
    return {xp:Math.round(r.xp*1.5), hidden, line:'🏹 Ancient Route Tracking: Levi finds an old road, a sealed channel, a line of worked stone beneath the new ground.'+(hidden ? ' It saves a day.' : '')};
  };
})();
function currentsPanel(){
  let h = '';
  if(pearlSenseOn()) h += `<div class="sm">🖤 <b>Pearl Sense</b> (Devon): when the Pearl reacts near ancient restoration works, a search can uncover a sealed door, a hidden inscription, a network node or lore. It is not Dragon Manifestation.</div>`;
  if(skyDiagOn()) h += `<div class="sm">🩺 <b>Restoration Diagnosis</b> (Sky): healing, preservation, corruption or failed restoration, named on a search or in battle.</div>`;
  if(G.flags && G.flags.old_channel_found && leviTrail()) h += `<div class="sm">🏹 <b>Ancient Route Tracking</b> (Levi): in ancient places Trail Sense finds abandoned roads, sealed channels and old infrastructure.</div>`;
  if(currentsOpen()) h += `<div class="sm">🌊 <b>Restoration Currents</b> are awake in ancient places: look for "Restoration Current" there. ${G.nodes ? G.nodes+' network node'+(G.nodes>1?'s':'')+' brought awake.' : ''}</div>`;
  return h ? '<h4>The restoration network</h4>'+h : '';
}
(function(){ const _rc = rCase; rCase = function(){ return _rc() + currentsPanel(); }; })();

// the standing boss entry (replayable) at the Bone River
if(!LOCATIONS.bone_river.spots.some(s => s.id==='bone_fight_682')) LOCATIONS.bone_river.spots.push({id:'bone_fight_682', kind:'boss', n:'The Bone River', icon:'🐍', desc:'The corrupted restoration core. It can be faced again here.', boss:'boss_bone_river', add:[], lo:96, ch:682, needFlag:'inv_hz682d', lockMsg:'🔒 Learn the four phases first'});
