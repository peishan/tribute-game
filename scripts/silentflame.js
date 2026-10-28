/* =====================================================================
   TRIBUTE — THE SILENT FLAME (Arc XXV, chapters 641-653; the author's pages 641, 642, 643 and 653)
   SILENT COMMAND. In a silence zone (the Old Beacon Road and the Silent Furnace, and the Flame fight itself) the party cannot speak orders:
     Visual signals        the SIGNAL action (needs ch642, Levi's hand signals): Hold (everyone guards a little), Spread Out (the party spreads: less damage from area heat),
                           Take Position (agreed commands: spoken support skills, those that target allies, work again for 4 turns)
     Positioning           Spread Out and Hold are the formation
     Predetermined commands Take Position
     Companion instincts   companions and guests are unaffected: they read the field by themselves
   Without Take Position (or Sally's rhythm) a support skill that targets allies is silenced.
   THE FLAME FIGHT has four phases (the page): 1 Stolen Voices (Silent Command), 2 Heat Without Warning (invisible heat currents each round; Levi's MARK SAFE PATH turns the next one aside, and
   Levi alive halves them), 3 The Rhythm Beneath (Sally\'s FEEL THE RHYTHM: ATK and MAG +20% for 3 rounds and spoken commands work; without it the Flame is harder to hurt), 4 The Beacon Core (the
   Flame takes only 30% damage and feeds on the party until BREAK THE CORE: Jade, or at half strength Devon, breaks the original mechanism). All numbers first-pass.
   ===================================================================== */
const SILENT_PLACES = ['old_beacon_road','silent_furnace'];
const FLAME_KEY = 'boss_silent_flame';
Object.assign(ENEMIES, {
  silent_wolf:{n:'Silent Wolf',icon:'🐺',area:'forest',hp:96,atk:17,mag:0,def:7,spd:15,xp:44,gold:18,
    moves:[{n:'Soundless Bite',pow:1},{n:'Pounce From the Snow',pow:1.4}],drops:[{id:'forest_herb',chance:.25}],desc:'A wolf adapted to the silence: it makes no sound at all, and neither does its prey.'},
  boss_silent_flame:{n:'The Silent Flame',icon:'🔵',area:'dragon',boss:true,hp:9800,atk:54,mag:57,def:32,spd:21,xp:3700,gold:2700,traits:['magic','corrupt'],
    moves:[{n:'Stolen Voice',pow:1.2,spell:true},{n:'Hollow Chorus',pow:1.0,all:true,spell:true},{n:'Silence Falls',pow:1.4,spell:true},{n:'Unheard Blow',pow:1.2}],
    phases:[
      {at:.75,msg:'Phase two: Heat Without Warning. The air shimmers; heat now falls where no one can hear it coming',atk:1.05},
      {at:.5,msg:'Phase three: The Rhythm Beneath. Its hold on the air tightens until something steadier than sound answers',atk:1.05},
      {at:.25,msg:'Phase four: The Beacon Core. The original mechanism lies bare beneath the flame',atk:1.1}],
    desc:'One of the Fifteen, the Ninth Shadow. A beacon that once received voices willingly and learned to take them.'},
});
LOOT.silent_wolf = {guaranteed:[],rolls:[{id:'forest_herb',chance:.25}]};
LOOT.boss_silent_flame = {guaranteed:[{id:'seal_dust',qty:[2,3]},{id:'spirit_thread',qty:[1,2]}],rolls:[{id:'forgotten_glass',chance:.5}],firstClear:[{id:'celestial_shard',qty:[1,2]}]};
deed('hz_silent_flame', 'story', 'No more voices taken', '🔵', 'The Silent Flame was broken at its core: it will never take another voice.', () => !!G.flags.boss_boss_silent_flame);

const flameFoes = () => (typeof B!=='undefined' && B && B.foes) ? B.foes.filter(f => !f.dead && f.key===FLAME_KEY) : [];
const flamePhase = () => { const f = flameFoes()[0]; return f ? (f.phaseIdx||0) : -1; };
const signalsKnown = () => !!(G && G.flags && G.flags.hand_signals_learned);
const spokenSkill = s => s && s.kind==='support' && !s.vibration && (s.tgt==='allies' || s.tgt==='ally');
const cmdOpen = () => !!(B && ((B.cmd||0) > 0 || (B.rhythm||0) > 0));

(function(){
  const _sb = startBattle;
  startBattle = function(spec){
    _sb(spec);
    if(typeof B==='undefined' || !B) return;
    const boss = flameFoes().length > 0;
    B.silent = boss || (SILENT_PLACES.includes(G.loc) && G.ch >= 641);
    if(!B.silent) return;
    B.cmd = 0; B.rhythm = 0; B.safe = 0; B.spread = 0; B.coreBroken = false;
    blog('🔇 A silence zone: no one can call an order. '+(signalsKnown() ? 'Use hand signals (Signal) and Take Position to be understood.' : 'Spoken commands cannot be heard, and spoken magic is weaker.'),'sys');
    if(boss) blog('🔵 The Silent Flame: Phase one, Stolen Voices. Silent Command is the only way to move as one.','foe');
  };
  // spoken support skills that target allies are silenced until the party is understood
  const _sl = skillList;
  skillList = function(u){
    const l = _sl(u);
    if(!(B && B.silent && u && u.ally) || cmdOpen()) return l;
    return l.map(s => spokenSkill(s) ? Object.assign({}, s, {usable:false, note:'(no one can hear the order: Take Position)'}) : s);
  };
  // phase 3: the Flame is harder to hurt until Sally finds the rhythm; her rhythm lifts the allies
  const _eff = eff;
  eff = function(u, stat){
    let v = _eff(u, stat);
    if(!(typeof B!=='undefined' && B && B.silent && u)) return v;
    if(u.ally && (B.rhythm||0) > 0 && (stat==='atk' || stat==='mag')) v *= 1.2;
    if(u.ally && stat==='mag' && u.id!=='sky' && !(B.rhythm > 0) && !(u.st && u.st.rhythm)) v *= .85;   // spoken invocations are weaker without a voice (Sky\'s healing is touch)
    if(!u.ally && u.key===FLAME_KEY && stat==='def' && flamePhase()===2 && !(B.rhythm > 0)) v *= 1.25;
    return v;
  };
  // phase 4: the core shields the Flame until it is broken, and it feeds while the core stands
  const _hurt = hurt;
  hurt = function(t, d, ignoreShield){
    if(t && !t.ally && t.key===FLAME_KEY && flamePhase()>=3 && !B.coreBroken) d = Math.max(1, Math.round(d*.3));
    return _hurt(t, d, ignoreShield);
  };
  const _end = endTurn;
  endTurn = function(u){
    _end(u);
    if(typeof B==='undefined' || !B || !B.silent) return;
    if(u && u.ally){ if(B.cmd > 0) B.cmd--; return; }
    if(!(u && u.key===FLAME_KEY && !u.dead)) { if(u && !u.ally){ if(B.spread>0) B.spread--; if(B.rhythm>0) B.rhythm--; } return; }
    const ph = flamePhase();
    if(B.rhythm>0) B.rhythm--;
    if(B.spread>0) B.spread--;
    if(ph===1){   // heat without warning: a visual tell one round ahead, then the heat falls
      const tell = (B.heatTell||[]).map(id => B.allies.find(a => a.uid===id)).filter(a => a && !a.dead);
      if(tell.length){
        if(B.safe>0){ B.safe--; blog('🧭 Levi\'s marked path turns the heat aside.','good'); }
        else {
          const levi = B.allies.some(a => a.id==='levi' && !a.dead);
          const mult = (levi ? .5 : 1) * (B.spread>0 ? .6 : 1);
          tell.forEach(a => { const d = Math.max(1, Math.round(u.atk*.6*mult)); hurt(a, d, true); blog('  🔥 Invisible heat scorches '+a.name+' (−'+d+')'+(levi?' (Levi read most of it)':'')+'.','bad'); });
        }
      }
      const next = alive(B.allies).slice().sort(() => Math.random()-.5).slice(0, 2); B.heatTell = next.map(a => a.uid);
      if(next.length) blog('👁️ The air shimmers over '+next.map(a => a.name).join(' and ')+': heat will fall there next round (Hold, Spread Out or Mark Safe Path).','foe');
    }
    if(ph>=3 && !B.coreBroken){ const h = Math.round(u.mhp*.02); u.hp = Math.min(u.mhp, u.hp+h); blog('  🔵 The Flame feeds on the core (+'+h+').','foe'); }
  };
})();

// the party's actions
function signalDo(u, kind){
  if(!B || !B.silent) return;
  if(kind==='hold'){ alive(B.allies).forEach(a => { a.st.ward = {v:.25, d:2}; }); blog('✋ '+u.name+' signals: Hold. The party braces (−25% damage for 2 turns).','good'); }
  else if(kind==='spread'){ B.spread = 2; alive(B.allies).forEach(a => { a.st.ward = {v:.12, d:2}; }); blog('↔️ '+u.name+' signals: Spread Out. The party fans out (area heat −40% for 2 rounds).','good'); }
  else { const long = typeof unspokenOn==='function' && unspokenOn() && (u.id==='levi' || u.id==='sally'); B.cmd = long ? 6 : 4; blog('📍 '+u.name+' signals: Take Position. The agreed commands work again for '+B.cmd+' turns'+(long?' (Unspoken Understanding)':'')+'.','good'); }
}
function flameLevi(u){ B.safe = 1; blog('🧭 '+u.name+' reads the air and marks the safe path: the next heat current is turned aside.','good'); }
function flameRhythm(u){ B.rhythm = 3; blog('💜 '+u.name+' keeps the rhythm with her hand on the strings: the party strikes in time (ATK and MAG +20% for 3 rounds, orders heard).','good'); }
function flameCore(u){
  const full = u.id==='jade', f = flameFoes()[0]; if(!f) return;
  if(full){ B.coreBroken = true; const d = Math.round(f.mhp*.2); f.hp = Math.max(1, f.hp - d); blog('💎 Jade reaches the original mechanism and breaks it: the Flame can no longer feed (−'+d+').','good'); }
  else { B.coreProgress = (B.coreProgress||0) + 1; if(B.coreProgress>=2){ B.coreBroken = true; blog('💎 '+u.name+' finishes the work on the core: it breaks.','good'); } else blog('💎 '+u.name+' works at the original mechanism (one more try, or Jade).','good'); }
}
function silentButtons(u){
  if(!(typeof B!=='undefined' && B && B.silent && u && u.ally)) return '';
  let h = '';
  if(signalsKnown()) h += `<button onclick="playerAct('signal','hold')">✋ Signal: Hold</button><button onclick="playerAct('signal','spread')">↔️ Signal: Spread Out</button><button onclick="playerAct('signal','take')">📍 Signal: Take Position${cmdOpen()?' (open)':''}</button>`;
  const ph = flamePhase();
  if(ph===1 && u.id==='levi') h += `<button onclick="playerAct('flame','levi')">🧭 Mark Safe Path</button>`;
  if(ph===2 && u.id==='sally') h += `<button onclick="playerAct('flame','rhythm')">💜 Feel the Rhythm</button>`;
  if(ph>=3 && !B.coreBroken && (u.id==='jade' || u.id==='devon')) h += `<button onclick="playerAct('flame','core')">💎 Break the Core${u.id==='jade'?'':' (half strength)'}</button>`;
  return h;
}
(function(){
  const _pa = playerAct;
  playerAct = function(kind, sid, tuid){
    if(B && !B.over && B.silent && B.cur && B.cur.ally){
      const u = B.cur;
      if(kind==='signal' && signalsKnown()){ signalDo(u, sid); endTurn(u); advance(); return; }
      if(kind==='flame'){
        if(sid==='levi' && u.id==='levi') flameLevi(u); else if(sid==='rhythm' && u.id==='sally') flameRhythm(u); else if(sid==='core' && (u.id==='jade'||u.id==='devon')) flameCore(u); else return;
        endTurn(u); advance(); return;
      }
    }
    return _pa(kind, sid, tuid);
  };
  if(typeof autoStep==='function'){
    const _as = autoStep;
    autoStep = function(){
      if(B && !B.over && B.silent && B.cur && B.cur.ally){
        const u = B.cur, ph = flamePhase();
        if(ph>=3 && !B.coreBroken && (u.id==='jade' || (u.id==='devon' && !alive(B.allies).some(a => a.id==='jade')))) return playerAct('flame','core');
        if(ph===2 && u.id==='sally' && !(B.rhythm>0)) return playerAct('flame','rhythm');
        if(ph===1 && u.id==='levi' && !(B.safe>0)) return playerAct('flame','levi');
        if(signalsKnown() && !cmdOpen() && skillsOf(u.id).some(s => s.ok && spokenSkill(s)) && Math.random()<.4) return playerAct('signal','take');
      }
      return _as();
    };
  }
})();
