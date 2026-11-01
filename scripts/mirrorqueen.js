/* =====================================================================
   TRIBUTE — THE MIRROR QUEEN (Arc XXXI, chapter 807; the author's page 807, the Fifteenth Evil)
   Four phases, as the page labels them. All numbers first-pass.
     1 Reflected Party     five reflections (copies of the five) soak the first blows and strike a random ally each round. FACE YOUR REFLECTION: any ally clears one
                           (Jade, Devon, Sky, Levi and Sally each clear their own, two at once).
     2 Restoration Loop    damage to the Queen is restored 7% a round until Sky IDENTIFIES THE CORE (Jade or Devon at half strength: three tries): the restoration stops for 3 rounds
                           and the core takes a blow.
     3 Perfect Reflection  each round an ally is lured by an idealised self and loses their next turn (they choose their real life instead of acting); while anyone is lured the Queen takes 30% damage.
     4 Break the Pattern   the Queen takes 30% damage until the pattern is broken: Jade SEVERS THE LINK to stored identities, Devon STABILISES THE STRUCTURE, Sky PREVENTS THE COLLAPSE (every
                           round the structure collapses on the party for 3% until Sky prevents it). Others help at half strength (three tries each). When all three are done the Queen shatters.
   Companions and auto-battle use these actions themselves.
   ===================================================================== */
const MQ_KEY = 'boss_mirror_queen';
Object.assign(ENEMIES, {
  boss_mirror_queen:{n:'The Mirror Queen',icon:'🪞',area:'dragon',boss:true,hp:12400,atk:58,mag:62,def:35,spd:21,xp:4600,gold:3200,traits:['magic','corrupt'],
    moves:[{n:'Reflected Strike',pow:1.3},{n:'Shard Storm',pow:1.0,all:true,spell:true},{n:'Perfect Reflection',pow:1.4,spell:true},{n:'Collected Patterns',pow:1.2,spell:true,fx:[{k:'slow',d:1}]}],
    phases:[
      {at:.75,msg:'Phase two: Restoration Loop. Damage to the Queen is restored again and again',atk:1.05},
      {at:.5,msg:'Phase three: Perfect Reflection. She offers idealised lives built from regret, youth and lost chances',atk:1.05},
      {at:.25,msg:'Phase four: Break the Pattern. The party must end her system',atk:1.1}],
    desc:'The fifteenth of the Fifteen. Not one body but an ancient mirror-array that has been trying to become a person, built from every pattern it has collected.'},
});
LOOT.boss_mirror_queen = {guaranteed:[{id:'seal_dust',qty:[2,3]},{id:'spirit_thread',qty:[1,2]},{id:'restoration_shard',qty:[1,2]}],rolls:[{id:'forgotten_glass',chance:.5}],firstClear:[{id:'celestial_shard',qty:[1,2]}]};
deed('hz_mirror_queen', 'story', 'Fifteen of fifteen', '🪞', 'The Mirror Queen shattered: the last of the Fifteen is gone.', () => !!G.flags.boss_boss_mirror_queen || (G && G.ch >= 807));

const mqFoes = () => (typeof B!=='undefined' && B && B.foes) ? B.foes.filter(f => !f.dead && f.key===MQ_KEY) : [];
const mqPhase = () => { const f = mqFoes()[0]; return f ? (f.phaseIdx||0) : -1; };
const mqOn = () => !!(typeof B!=='undefined' && B && !B.over && mqFoes().length);
const MQ_STEPS = {sever:'jade', stabilise:'devon', prevent:'sky'};

(function(){
  const _sb = startBattle;
  startBattle = function(spec){
    _sb(spec);
    if(!mqOn()) return;
    B.mq = true; B.refl = 5; B.cutFlow = 0; B.cutProg = 0; B.done = {}; B.prog = {};
    blog('🪞 The Mirror Queen: Phase one, Reflected Party. Five reflections stand between you and her (Face Your Reflection).','foe');
  };
  const _hurt = hurt;
  hurt = function(t, d, ignoreShield){
    if(t && !t.ally && t.key===MQ_KEY && B && B.mq){
      if(mqPhase()===0 && B.refl>0){ B.refl--; blog('  🪞 The blow lands on a reflection ('+B.refl+' left).','bad'); return 0; }
      if(mqPhase()===2 && alive(B.allies).some(a => a.lured)) d = Math.max(1, Math.round(d*.3));
      if(mqPhase()>=3 && Object.keys(B.done).length < 3) d = Math.max(1, Math.round(d*.3));
    }
    return _hurt(t, d, ignoreShield);
  };
  const _end = endTurn;
  endTurn = function(u){
    _end(u);
    if(!(typeof B!=='undefined' && B && B.mq)) return;
    if(u && u.ally) return;
    if(!(u && u.key===MQ_KEY && !u.dead)) return;
    const ph = mqPhase();
    if(ph===0 && B.refl>0){ const t = alive(B.allies).sort(() => Math.random()-.5)[0]; if(t){ const d = Math.max(1, Math.round(u.atk*.12*B.refl)); hurt(t, d, true); blog('  🪞 The reflections strike '+t.name+' (−'+d+').','bad'); } }
    if(ph===1){
      if(B.cutFlow>0){ B.cutFlow--; blog('💠 The restoration core is held: she cannot mend.','good'); }
      else { const h = Math.round(u.mhp*.07); u.hp = Math.min(u.mhp, u.hp+h); blog('  🔁 The restoration loop mends the Queen (+'+h+').','foe'); }
    }
    if(ph===2){
      const t = alive(B.allies).filter(a => !a.lured).sort(() => Math.random()-.5)[0];
      if(t){ t.lured = true; blog('  🌸 '+t.name+' is lured by a perfect reflection of what could have been and loses their next turn.','bad'); }
    }
    if(ph>=3 && !B.done.prevent){ alive(B.allies).forEach(a => hurt(a, Math.max(1, Math.round(a.mhp*.03)), true)); blog('  💥 The structure begins to collapse on the party.','bad'); }
  };
})();

function mqFace(u){
  const own = ['jade','devon','sky','levi','sally'].includes(u.id), n = own ? 2 : 1; B.refl = Math.max(0, B.refl-n);
  blog('🪞 '+u.name+' faces '+(own?'their own reflection and one more':'a reflection')+' ('+B.refl+' left).','good');
}
function mqCore(u){
  const f = mqFoes()[0]; if(!f) return;
  const full = u.id==='sky'; B.cutProg = full ? 3 : (B.cutProg||0)+1;
  if(B.cutProg>=3){ B.cutFlow = 3; B.cutProg = 0; const d = Math.round(f.mhp*.03); f.hp = Math.max(1, f.hp-d); blog('💠 '+u.name+' identifies the surviving core: "There it is... the restoration core!" (−'+d+')','good'); }
  else blog('💠 '+u.name+' searches for the core ('+B.cutProg+' / 3: or Sky).','good');
}
function mqStep(u, step){
  if(B.done[step]) return;
  const mine = MQ_STEPS[step]===u.id; B.prog[step] = mine ? 3 : (B.prog[step]||0)+1;
  const label = {sever:'severs the link to the stored identities', stabilise:'stabilises the ancient structure', prevent:'prevents the collapse from killing the trapped victims'}[step];
  if(B.prog[step]>=3){ B.done[step] = true; blog('✨ '+u.name+' '+label+'.','good'); }
  else blog('✨ '+u.name+' works at the pattern ('+B.prog[step]+' / 3: or '+(CHARACTERS[MQ_STEPS[step]]?CHARACTERS[MQ_STEPS[step]].n:'')+').','good');
  if(Object.keys(B.done).length===3){ const f = mqFoes()[0]; if(f){ const d = Math.round(f.mhp*.25); f.hp = Math.max(1, f.hp-d); blog('💎 The pattern breaks: the Queen\'s system comes apart (−'+d+').','good'); } }
}
function mqButtons(u){
  if(!(typeof B!=='undefined' && B && B.mq && !B.over && u && u.ally)) return '';
  const ph = mqPhase(); let h = '';
  if(ph===0 && B.refl>0) h += `<button onclick="playerAct('mq','face')">🪞 Face Your Reflection</button>`;
  if(ph===1 && !(B.cutFlow>0) && ['sky','jade','devon'].includes(u.id)) h += `<button onclick="playerAct('mq','core')">💠 Identify the Core${u.id==='sky'?'':' (half strength)'}</button>`;
  if(ph>=3){
    if(!B.done.sever) h += `<button onclick="playerAct('mq','sever')">🔗 Sever the Link${u.id==='jade'?'':' (half strength)'}</button>`;
    if(!B.done.stabilise) h += `<button onclick="playerAct('mq','stabilise')">🏛️ Stabilise the Structure${u.id==='devon'?'':' (half strength)'}</button>`;
    if(!B.done.prevent) h += `<button onclick="playerAct('mq','prevent')">💙 Prevent the Collapse${u.id==='sky'?'':' (half strength)'}</button>`;
  }
  return h;
}
const mqDo = (u, sid) => {
  if(sid==='face' && B.refl>0) mqFace(u);
  else if(sid==='core' && ['sky','jade','devon'].includes(u.id)) mqCore(u);
  else if(MQ_STEPS[sid]) mqStep(u, sid);
  else return false;
  return true;
};
(function(){
  const _pa = playerAct;
  playerAct = function(kind, sid, tuid){
    if(B && !B.over && B.mq && B.cur && B.cur.ally){
      const u = B.cur;
      if(kind==='mq'){ if(mqDo(u, sid)){ u.lured = false; endTurn(u); advance(); } return; }
      if(u.lured){ u.lured = false; blog('🌸 '+u.name+' looks at the perfect life and chooses the real one instead.','good'); endTurn(u); advance(); return; }
    }
    return _pa(kind, sid, tuid);
  };
  const choose = u => {
    const ph = mqPhase();
    if(ph===0 && B.refl>0) return 'face';
    if(ph===1 && !(B.cutFlow>0) && (u.id==='sky' || (u.id==='jade' && !alive(B.allies).some(a => a.id==='sky')))) return 'core';
    if(ph>=3){ const mine = Object.keys(MQ_STEPS).find(k => MQ_STEPS[k]===u.id && !B.done[k]); if(mine) return mine; return Object.keys(MQ_STEPS).find(k => !B.done[k]) || null; }
    return null;
  };
  const _ca = companionAct;
  companionAct = function(u){
    if(mqOn() && B.mq){
      if(u.lured){ u.lured = false; blog('🌸 '+u.name+' chooses the real life.','good'); return; }
      const s = choose(u); if(s && mqDo(u, s)) return;
    }
    return _ca(u);
  };
  if(typeof autoStep==='function'){
    const _as = autoStep;
    autoStep = function(){
      if(B && !B.over && B.mq && B.cur && B.cur.ally){ if(B.cur.lured) return playerAct('guard'); const s = choose(B.cur); if(s) return playerAct('mq', s); }
      return _as();
    };
  }
})();
