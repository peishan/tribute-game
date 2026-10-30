/* =====================================================================
   TRIBUTE — THE ASHEN SERPENT (Arc XXVIII, chapter 728; the author's page 728, the Twelfth Evil)
   Three phases, as the page labels them. All numbers first-pass.
     1 Coiled Ash       it obscures vision, makes FALSE SERPENT BODIES (decoys that soak the first blows) and leaves choking ASH ZONES (damage each round while any remain).
                        Levi's PICK THE TRUE BODY clears the false bodies; Sky's CLEANSING LIGHT clears the ash zones.
     2 Crownfire        it awakens the ancient royal seals and turns the chamber against the party: each round a seal fires at an ally. Rheon's COMMAND THE SEALS (they answer
                        Altan's royal line) silences them for 2 rounds; without Rheon, Devon's COUNTER-SEAL does it for 1.
     3 The Buried Coil  the ancient core is exposed and restoration and corruption fight inside it. Each round a SURGE: a restoration surge heals the party a little, a corruption surge
                        burns it. Sky's READ THE CORE shows the next surge; Jade's BREAK THE CORE (the corruption has gone too far to contain it) ends it, three tries at half strength for anyone else.
   Rheon (and Sera when she is in the party) joins the descent even if not one of the five. Companions and auto-battle use these actions themselves.
   ===================================================================== */
// Release vs Destroy returns: the dead the ash kept standing in the old chambers are REMAINS too, so they can be stabilised and released (restoration materials, sometimes lore) or simply destroyed
Object.assign(ENEMIES, {
  ash_remnant:{n:'Ash Remnant',icon:'🪦',area:'dragon',hp:118,atk:20,mag:0,def:9,spd:10,xp:54,gold:24,traits:['corrupt','remains'],
    moves:[{n:'Smothering Grasp',pow:1.1},{n:'Ember Collapse',pow:1.3}],drops:[{id:'skyfed_ash',chance:.1},{id:'spirit_thread',chance:.12}],desc:'One of the dead the ash kept standing: a restoration that never finished, still walking the old tunnels.'},
});
LOOT.ash_remnant = {guaranteed:[],rolls:[{id:'spirit_thread',chance:.12}]};
if(LOCATIONS.altan_buried_chamber){ const h = LOCATIONS.altan_buried_chamber.spots.find(x => x.id==='ash_chambers_hunt'); if(h && !h.pool.includes('ash_remnant')) h.pool.push('ash_remnant','ash_remnant'); }
if(typeof REMAINS!=='undefined' && !REMAINS.includes('ash_remnant')) REMAINS.push('ash_remnant');
const ASH_KEY = 'boss_ashen_serpent';
Object.assign(ENEMIES, {
  boss_ashen_serpent:{n:'The Ashen Serpent',icon:'🐍',area:'dragon',boss:true,hp:11600,atk:57,mag:59,def:34,spd:20,xp:4200,gold:3000,traits:['magic','corrupt'],
    moves:[{n:'Coiled Strike',pow:1.3},{n:'Choking Ash',pow:1.0,all:true,spell:true},{n:'Crownfire',pow:1.4,spell:true},{n:'Buried Coil',pow:1.2,spell:true,fx:[{k:'slow',d:1}]}],
    phases:[
      {at:.66,msg:'Phase two: Crownfire. The ancient royal seals wake and the chamber turns on the party',atk:1.05},
      {at:.33,msg:'Phase three: The Buried Coil. Its ancient core lies bare, restoration and corruption fighting inside it',atk:1.1}],
    desc:'One of the Fifteen. Older and more damaged than the creature seen aboveground: a structure and a prison, broken and remade many times.'},
});
LOOT.boss_ashen_serpent = {guaranteed:[{id:'seal_dust',qty:[2,3]},{id:'spirit_thread',qty:[1,2]}],rolls:[{id:'forgotten_glass',chance:.5}],firstClear:[{id:'celestial_shard',qty:[1,2]}]};
deed('hz_ashen_serpent', 'story', 'Twelve of fifteen', '🐍', 'The Ashen Serpent fell in the buried chamber beneath Altan, and the chamber answered.', () => !!G.flags.boss_boss_ashen_serpent || (G && G.ch >= 728));

const ashFoes = () => (typeof B!=='undefined' && B && B.foes) ? B.foes.filter(f => !f.dead && f.key===ASH_KEY) : [];
const ashPhase = () => { const f = ashFoes()[0]; return f ? (f.phaseIdx||0) : -1; };
const ashOn = () => !!(typeof B!=='undefined' && B && !B.over && ashFoes().length);
const ashHas = id => !!(B && B.allies && B.allies.some(a => a.id===id && !a.dead));

(function(){
  const _sb = startBattle;
  startBattle = function(spec){
    _sb(spec);
    if(!ashOn()) return;
    B.ash = true; B.decoys = 2; B.zones = 2; B.silence = 0; B.surge = 'restoration'; B.read = false; B.coreProg = 0; B.coreBroken = false;
    ['rheon','seraphina'].forEach(id => {
      if(G.party.includes(id) && !B.allies.some(a => a.id===id)){ const u = mkAlly(id, !!(spec && spec.rewards)); B.allies.push(u); B.queue.push(u); }
    });
    blog('🐍 The Ashen Serpent: Phase one, Coiled Ash. False bodies and choking ash fill the chamber.','foe');
  };
  // false bodies soak the first blows in phase one; the core shields the Serpent until it is broken
  const _hurt = hurt;
  hurt = function(t, d, ignoreShield){
    if(t && !t.ally && t.key===ASH_KEY && B && B.ash){
      if(ashPhase()===0 && B.decoys>0){ B.decoys--; blog('  🌫️ The blow lands on a false serpent body ('+B.decoys+' left).','bad'); return 0; }
      if(ashPhase()>=2 && !B.coreBroken) d = Math.max(1, Math.round(d*.35));
    }
    return _hurt(t, d, ignoreShield);
  };
  const _end = endTurn;
  endTurn = function(u){
    _end(u);
    if(!(typeof B!=='undefined' && B && B.ash)) return;
    if(u && u.ally) return;
    if(!(u && u.key===ASH_KEY && !u.dead)) return;
    const ph = ashPhase();
    if(ph===0){
      if(B.zones>0){ alive(B.allies).forEach(a => { const d = Math.max(1, Math.round(a.mhp*.03*B.zones)); hurt(a, d, true); }); blog('  🌫️ Choking ash burns the party ('+B.zones+' zone'+(B.zones>1?'s':'')+').','bad'); }
      if(B.decoys<2 && Math.random()<.5){ B.decoys++; blog('  🌫️ The Serpent coils a new false body out of the ash.','foe'); }
    }
    if(ph===1){
      if(B.silence>0){ B.silence--; blog('👑 The seals stay quiet.','good'); }
      else { const t = alive(B.allies).slice().sort(() => Math.random()-.5)[0]; if(t){ const d = Math.max(1, Math.round(u.mag*.7)); hurt(t, d, true); blog('  👑 An ancient royal seal fires at '+t.name+' (−'+d+').','bad'); } }
    }
    if(ph>=2 && !B.coreBroken){
      if(B.surge==='restoration'){ alive(B.allies).forEach(a => { a.hp = Math.min(a.mhp, a.hp+Math.round(a.mhp*.04)); }); blog('  ✨ A restoration surge washes through the chamber: the party is warmed.','good'); }
      else { alive(B.allies).forEach(a => hurt(a, Math.max(1, Math.round(a.mhp*.05)), true)); blog('  🔥 A corruption surge burns through the party.','bad'); }
      B.surge = Math.random()<.5 ? 'restoration' : 'corruption'; B.read = false;
    }
  };
})();

// the party's actions
function ashTrue(u){ B.decoys = 0; blog('🏹 '+u.name+' finds the true body: the false serpents come apart.','good'); }
function ashCleanse(u){ B.zones = 0; blog('✨ '+u.name+' clears the choking ash.','good'); }
function ashCommand(u){ B.silence = 2; blog('👑 '+u.name+' speaks as Altan\'s king: the royal seals go quiet for 2 rounds.','good'); }
function ashCounter(u){ B.silence = 1; blog('🛡️ '+u.name+' sets a counter-seal: the royal seals go quiet for a round.','good'); }
function ashRead(u){ B.read = true; blog('🔬 '+u.name+' reads the core: the next surge will be a '+B.surge+' surge.','good'); }
function ashBreak(u){
  const f = ashFoes()[0]; if(!f) return;
  if(u.id==='jade'){ B.coreBroken = true; const d = Math.round(f.mhp*.2); f.hp = Math.max(1, f.hp-d); blog('💎 Jade breaks the core: the corruption has gone too far to contain (−'+d+').','good'); }
  else { B.coreProg++; if(B.coreProg>=3){ B.coreBroken = true; blog('💎 '+u.name+' breaks the core.','good'); } else blog('💎 '+u.name+' works at the core ('+B.coreProg+' / 3: or Jade).','good'); }
}
function ashButtons(u){
  if(!(typeof B!=='undefined' && B && B.ash && !B.over && u && u.ally)) return '';
  const ph = ashPhase(); let h = '';
  if(ph===0){
    if(u.id==='levi' && B.decoys>0) h += `<button onclick="playerAct('ash','true')">🏹 Pick the True Body</button>`;
    if(u.id==='sky' && B.zones>0) h += `<button onclick="playerAct('ash','cleanse')">✨ Cleansing Light</button>`;
  }
  if(ph===1){
    if(u.id==='rheon') h += `<button onclick="playerAct('ash','command')">👑 Command the Seals</button>`;
    if(u.id==='devon') h += `<button onclick="playerAct('ash','counter')">🛡️ Counter-Seal</button>`;
  }
  if(ph>=2 && !B.coreBroken){
    if(u.id==='sky' && !B.read) h += `<button onclick="playerAct('ash','read')">🔬 Read the Core</button>`;
    if(['jade','devon','rheon'].includes(u.id)) h += `<button onclick="playerAct('ash','break')">💎 Break the Core${u.id==='jade'?'':' (half strength)'}</button>`;
  }
  return h;
}
const ashDo = (u, sid) => {
  if(sid==='true' && u.id==='levi') ashTrue(u);
  else if(sid==='cleanse' && u.id==='sky') ashCleanse(u);
  else if(sid==='command' && u.id==='rheon') ashCommand(u);
  else if(sid==='counter' && u.id==='devon') ashCounter(u);
  else if(sid==='read' && u.id==='sky') ashRead(u);
  else if(sid==='break' && ['jade','devon','rheon'].includes(u.id)) ashBreak(u);
  else return false;
  return true;
};
(function(){
  const _pa = playerAct;
  playerAct = function(kind, sid, tuid){
    if(kind==='ash' && B && !B.over && B.ash && B.cur && B.cur.ally){ const u = B.cur; if(ashDo(u, sid)){ endTurn(u); advance(); } return; }
    return _pa(kind, sid, tuid);
  };
  const choose = u => {
    const ph = ashPhase();
    if(ph===0){ if(u.id==='levi' && B.decoys>0) return 'true'; if(u.id==='sky' && B.zones>0) return 'cleanse'; }
    if(ph===1){ if(u.id==='rheon' && !(B.silence>0)) return 'command'; if(u.id==='devon' && !ashHas('rheon') && !(B.silence>0)) return 'counter'; }
    if(ph>=2 && !B.coreBroken){
      if(u.id==='jade') return 'break';
      if(u.id==='sky' && !B.read && Math.random()<.4) return 'read';
      if(u.id==='rheon' && !ashHas('jade')) return 'break';
    }
    return null;
  };
  const _ca = companionAct;
  companionAct = function(u){
    if(ashOn() && B.ash){ const s = choose(u); if(s && ashDo(u, s)) return; }
    return _ca(u);
  };
  if(typeof autoStep==='function'){
    const _as = autoStep;
    autoStep = function(){
      if(B && !B.over && B.ash && B.cur && B.cur.ally){ const s = choose(B.cur); if(s) return playerAct('ash', s); }
      return _as();
    };
  }
})();
