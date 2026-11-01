/* =====================================================================
   TRIBUTE — THE SUNLESS CHILD (Arc XXX, chapter 783; the author's page 783, the Fourteenth Evil)
   Three phases, as the page labels them. All numbers first-pass.
     1 Lightless Field   the battlefield rejects light: each blow at the Evil has a 30% chance to miss and is wasted. KINDLE A LIGHT (any ally; Sky's lasts longer) steadies aim for 3 rounds (4 for Sky).
     2 False Futures     each round an ally is trapped in a possible-outcome illusion and loses their next turn. JADE IDENTIFIES THE CONTRADICTION: it spends her turn, frees everyone and keeps new
                         illusions off for 2 rounds (any other ally: three tries, half strength).
     3 Eclipsed Core     the Evil is joined to the conduit and regenerates 6% a round, taking only 30% damage, until three things are done: SKY identifies the corrupted restoration loop, DEVON stabilises the
                         ancient structure and JADE severs the link (others help at half strength: three tries each). When all three are done the core is exposed.
   Companions and auto-battle use these actions themselves.
   ===================================================================== */
const SC_KEY = 'boss_sunless_child';
Object.assign(ENEMIES, {
  boss_sunless_child:{n:'The Sunless Child',icon:'🌑',area:'dragon',boss:true,hp:11200,atk:56,mag:60,def:34,spd:20,xp:4300,gold:3050,traits:['magic','corrupt'],
    moves:[{n:'Devouring Dark',pow:1.3,spell:true},{n:'Light Rejected',pow:1.0,all:true,spell:true},{n:'False Future',pow:1.4,spell:true},{n:'Eclipse Grasp',pow:1.2,spell:true,fx:[{k:'slow',d:1}]}],
    phases:[
      {at:.66,msg:'Phase two: False Futures. Possible outcomes close round the party',atk:1.05},
      {at:.33,msg:'Phase three: Eclipsed Core. It joins the ancient conduit directly',atk:1.1}],
    desc:'The Fourteenth of the Fifteen. An ancient entity born beneath a dead sun: partly physical, partly an absence where light should be.'},
});
LOOT.boss_sunless_child = {guaranteed:[{id:'seal_dust',qty:[2,3]},{id:'spirit_thread',qty:[1,2]},{id:'restoration_shard',qty:[1,2]}],rolls:[{id:'forgotten_glass',chance:.5}],firstClear:[{id:'celestial_shard',qty:[1,2]}]};
deed('hz_sunless_child', 'story', 'The light returns', '🌑', 'The Sunless Child was cut from the conduit: the light came back.', () => !!G.flags.boss_boss_sunless_child || (G && G.ch >= 783));

const scFoes = () => (typeof B!=='undefined' && B && B.foes) ? B.foes.filter(f => !f.dead && f.key===SC_KEY) : [];
const scPhase = () => { const f = scFoes()[0]; return f ? (f.phaseIdx||0) : -1; };
const scOn = () => !!(typeof B!=='undefined' && B && !B.over && scFoes().length);
const SC_STEPS = {identify:'sky', stabilise:'devon', sever:'jade'};

(function(){
  const _sb = startBattle;
  startBattle = function(spec){
    _sb(spec);
    if(!scOn()) return;
    B.sc = true; B.lit = 0; B.guard = 0; B.freeProg = 0; B.done = {}; B.prog = {};
    blog('🌑 The Sunless Child: Phase one, Lightless Field. The battlefield rejects light (Kindle a Light steadies aim).','foe');
  };
  const _hurt = hurt;
  hurt = function(t, d, ignoreShield){
    if(t && !t.ally && t.key===SC_KEY && B && B.sc){
      if(scPhase()===0 && !(B.lit>0) && Math.random()<.3){ blog('  🌑 The blow is lost in the dark.','bad'); return 0; }
      if(scPhase()>=2 && Object.keys(B.done).length < 3) d = Math.max(1, Math.round(d*.3));
    }
    return _hurt(t, d, ignoreShield);
  };
  const _end = endTurn;
  endTurn = function(u){
    _end(u);
    if(!(typeof B!=='undefined' && B && B.sc)) return;
    if(u && u.ally) return;
    if(!(u && u.key===SC_KEY && !u.dead)) return;
    const ph = scPhase();
    if(B.lit>0) B.lit--; if(B.guard>0) B.guard--;
    if(ph===1 && !(B.guard>0)){
      const t = alive(B.allies).filter(a => !a.trapped).sort(() => Math.random()-.5)[0];
      if(t){ t.trapped = true; blog('  🔮 '+t.name+' is trapped in a possible future and loses their next turn.','bad'); }
    }
    if(ph>=2 && Object.keys(B.done).length < 3){ const h = Math.round(u.mhp*.06); u.hp = Math.min(u.mhp, u.hp+h); blog('  🌑 It regenerates from stolen energy (+'+h+').','foe'); }
  };
})();

function scKindle(u){ B.lit = u.id==='sky' ? 4 : 3; blog('🕯️ '+u.name+' kindles a light: aim steadies for '+B.lit+' rounds.','good'); }
function scContradiction(u){
  if(u.id==='jade'){ alive(B.allies).forEach(a => { a.trapped = false; }); B.guard = 2; blog('🔎 Jade finds the contradiction: "Is this real? Or a possible future?" Everyone is freed, and no new illusion takes hold for 2 rounds.','good'); }
  else { B.freeProg = (B.freeProg||0)+1; if(B.freeProg>=3){ B.freeProg = 0; alive(B.allies).forEach(a => { a.trapped = false; }); B.guard = 2; blog('🔎 '+u.name+' finds the contradiction and frees the party.','good'); } else blog('🔎 '+u.name+' looks for the contradiction ('+B.freeProg+' / 3: or Jade).','good'); }
}
function scStep(u, step){
  if(B.done[step]) return;
  const mine = SC_STEPS[step]===u.id; B.prog[step] = mine ? 3 : (B.prog[step]||0)+1;
  const label = {identify:'identifies the corrupted restoration loop', stabilise:'stabilises the ancient structure', sever:'severs the Evil from the conduit'}[step];
  if(B.prog[step]>=3){ B.done[step] = true; blog('✨ '+u.name+' '+label+'.','good'); }
  else blog('✨ '+u.name+' works at it ('+B.prog[step]+' / 3: or '+(CHARACTERS[SC_STEPS[step]]?CHARACTERS[SC_STEPS[step]].n:'')+').','good');
  if(Object.keys(B.done).length===3){ const f = scFoes()[0]; if(f){ const d = Math.round(f.mhp*.25); f.hp = Math.max(1, f.hp-d); blog('💥 Its power ends here: the core is exposed (−'+d+').','good'); } }
}
function scButtons(u){
  if(!(typeof B!=='undefined' && B && B.sc && !B.over && u && u.ally)) return '';
  const ph = scPhase(); let h = '';
  if(ph===0 && !(B.lit>0)) h += `<button onclick="playerAct('sc','kindle')">🕯️ Kindle a Light</button>`;
  if(ph===1) h += `<button onclick="playerAct('sc','find')">🔎 Find the Contradiction${u.id==='jade'?'':' (half strength)'}</button>`;
  if(ph>=2){
    if(!B.done.identify) h += `<button onclick="playerAct('sc','identify')">🔬 Identify the Loop${u.id==='sky'?'':' (half strength)'}</button>`;
    if(!B.done.stabilise) h += `<button onclick="playerAct('sc','stabilise')">🏛️ Stabilise the Structure${u.id==='devon'?'':' (half strength)'}</button>`;
    if(!B.done.sever) h += `<button onclick="playerAct('sc','sever')">✂️ Sever the Link${u.id==='jade'?'':' (half strength)'}</button>`;
  }
  return h;
}
const scDo = (u, sid) => {
  if(sid==='kindle') scKindle(u);
  else if(sid==='find') scContradiction(u);
  else if(SC_STEPS[sid]) scStep(u, sid);
  else return false;
  return true;
};
(function(){
  const _pa = playerAct;
  playerAct = function(kind, sid, tuid){
    if(B && !B.over && B.sc && B.cur && B.cur.ally){
      const u = B.cur;
      if(kind==='sc'){ if(scDo(u, sid)){ u.trapped = false; endTurn(u); advance(); } return; }
      if(u.trapped){ u.trapped = false; blog('🔮 '+u.name+' is lost in a possible future and cannot act.','bad'); endTurn(u); advance(); return; }
    }
    return _pa(kind, sid, tuid);
  };
  const choose = u => {
    const ph = scPhase();
    if(ph===0 && !(B.lit>0) && (u.id==='sky' || !alive(B.allies).some(a => a.id==='sky'))) return 'kindle';
    if(ph===1 && alive(B.allies).some(a => a.trapped) && !(B.guard>0) && u.id==='jade') return 'find';
    if(ph>=2){ const mine = Object.keys(SC_STEPS).find(k => SC_STEPS[k]===u.id && !B.done[k]); if(mine) return mine; return Object.keys(SC_STEPS).find(k => !B.done[k]) || null; }
    return null;
  };
  const _ca = companionAct;
  companionAct = function(u){
    if(scOn() && B.sc){
      if(u.trapped){ u.trapped = false; blog('🔮 '+u.name+' is lost in a possible future.','bad'); return; }
      const s = choose(u); if(s && scDo(u, s)) return;
    }
    return _ca(u);
  };
  if(typeof autoStep==='function'){
    const _as = autoStep;
    autoStep = function(){
      if(B && !B.over && B.sc && B.cur && B.cur.ally){ if(B.cur.trapped) return playerAct('guard'); const s = choose(B.cur); if(s) return playerAct('sc', s); }
      return _as();
    };
  }
})();
