/* =====================================================================
   TRIBUTE — THE WEEPING STONE (Arc XXIX, chapter 758; the author's page 758, the Thirteenth Evil)
   Three phases, as the page labels them. All numbers first-pass.
     1 Borrowed Memories   each round the Evil traps an ally in a false scene from their past: the trapped ally loses their next turn. SKY (or Master Yale's steadiness: any ally) can CALL THEM BACK
                           to the present: it spends the turn, frees everyone and keeps new memories off for 2 rounds.
     2 Root of Grief       the corrupted healing node restores 6% of the Evil's life every round. Sky's INTERRUPT THE CYCLE (Jade or Devon at half strength: three tries) cuts the flow
                           for 3 rounds and strikes the node for 3% of its life.
     3 What Cannot Be Restored   a perfect illusion: the Evil takes only 30% damage until someone REFUSES THE ILLUSION: Sky (full) or any other ally (three tries, one each round).
   Companions and auto-battle use these actions themselves.
   ===================================================================== */
const WEEP_KEY = 'boss_weeping_stone';
Object.assign(ENEMIES, {
  boss_weeping_stone:{n:'The Weeping Stone',icon:'💧',area:'dragon',boss:true,hp:10800,atk:55,mag:60,def:33,spd:19,xp:4100,gold:2950,traits:['magic','corrupt'],
    moves:[{n:'Borrowed Memory',pow:1.2,spell:true},{n:'Wound Again',pow:1.0,all:true,spell:true},{n:'Root of Grief',pow:1.4,spell:true},{n:'Tears Without End',pow:1.1,spell:true,fx:[{k:'slow',d:1}]}],
    phases:[
      {at:.66,msg:'Phase two: Root of Grief. The corrupted healing node mends the Evil only to reopen the wound',atk:1.05},
      {at:.33,msg:'Phase three: What Cannot Be Restored. It builds a perfect illusion where no one is lost',atk:1.1}],
    desc:'One of the Fifteen. A restoration and healing node corrupted so that it forces living things to relive their wounds, and feeds on unresolved pain.'},
});
LOOT.boss_weeping_stone = {guaranteed:[{id:'seal_dust',qty:[2,3]},{id:'spirit_thread',qty:[1,2]},{id:'restoration_shard',qty:[1,2]}],rolls:[{id:'forgotten_glass',chance:.5}],firstClear:[{id:'celestial_shard',qty:[1,2]}]};
deed('hz_weeping_stone', 'story', 'What healing can do', '💧', 'The Weeping Stone was purified: the cycle was broken and the node returned to its true function.', () => !!G.flags.boss_boss_weeping_stone || (G && G.ch >= 759));

const weepFoes = () => (typeof B!=='undefined' && B && B.foes) ? B.foes.filter(f => !f.dead && f.key===WEEP_KEY) : [];
const weepPhase = () => { const f = weepFoes()[0]; return f ? (f.phaseIdx||0) : -1; };
const weepOn = () => !!(typeof B!=='undefined' && B && !B.over && weepFoes().length);

(function(){
  const _sb = startBattle;
  startBattle = function(spec){
    _sb(spec);
    if(!weepOn()) return;
    B.weep = true; B.anchor = 0; B.cutFlow = 0; B.cutProg = 0; B.illusion = true; B.refuseProg = 0;
    blog('💧 The Weeping Stone: Phase one, Borrowed Memories. The party is pulled into false scenes from their pasts (Sky can Call Them Back).','foe');
  };
  const _hurt = hurt;
  hurt = function(t, d, ignoreShield){
    if(t && !t.ally && t.key===WEEP_KEY && B && B.weep && weepPhase()>=2 && B.illusion) d = Math.max(1, Math.round(d*.3));
    return _hurt(t, d, ignoreShield);
  };
  const _end = endTurn;
  endTurn = function(u){
    _end(u);
    if(!(typeof B!=='undefined' && B && B.weep)) return;
    if(u && u.ally) return;
    if(!(u && u.key===WEEP_KEY && !u.dead)) return;
    const ph = weepPhase();
    if(B.anchor>0) B.anchor--;
    if(ph===0 && !(B.anchor>0)){
      const t = alive(B.allies).filter(a => !a.trapped).sort(() => Math.random()-.5)[0];
      if(t){ t.trapped = true; blog('  🌀 '+t.name+' is pulled into a false memory and loses their next turn.','bad'); }
    }
    if(ph===1){
      if(B.cutFlow>0){ B.cutFlow--; blog('✂️ The flow is cut: the corrupted node cannot mend the Evil.','good'); }
      else { const h = Math.round(u.mhp*.06); u.hp = Math.min(u.mhp, u.hp+h); blog('  🔁 The corrupted healing mends the Evil (+'+h+'), only to reopen.','foe'); }
    }
    if(ph>=2 && B.illusion && ph===2) blog('  🕯️ The illusion holds: nothing is lost here, and nothing can be touched.','foe');
  };
})();

function weepCallBack(u){ alive(B.allies).forEach(a => { a.trapped = false; }); B.anchor = 2; blog('💙 '+u.name+' calls them back to the present: everyone is freed, and no new memory takes hold for 2 rounds.','good'); }
function weepInterrupt(u){
  const f = weepFoes()[0]; if(!f) return;
  const full = u.id==='sky'; B.cutProg = full ? 3 : (B.cutProg||0)+1;
  if(B.cutProg>=3){ B.cutFlow = 3; B.cutProg = 0; const d = Math.round(f.mhp*.03); f.hp = Math.max(1, f.hp-d); blog('✂️ '+u.name+' cuts the flow between the false restoration and the core: it does not mend, it repeats (−'+d+').','good'); }
  else blog('✂️ '+u.name+' works at the cycle ('+B.cutProg+' / 3: or Sky).','good');
}
function weepRefuse(u){
  const f = weepFoes()[0]; if(!f) return;
  if(u.id==='sky'){ B.illusion = false; const d = Math.round(f.mhp*.15); f.hp = Math.max(1, f.hp-d); blog('💙 Sky refuses the illusion: "Restoration cannot resurrect the truly dead." The lie breaks (−'+d+').','good'); }
  else { B.refuseProg++; if(B.refuseProg>=3){ B.illusion = false; blog('💙 '+u.name+' names the lie and it breaks.','good'); } else blog('💙 '+u.name+' refuses the illusion ('+B.refuseProg+' / 3: or Sky).','good'); }
}
function weepButtons(u){
  if(!(typeof B!=='undefined' && B && B.weep && !B.over && u && u.ally)) return '';
  const ph = weepPhase(); let h = '';
  if(ph===0 && u.id==='sky' && alive(B.allies).some(a => a.trapped)) h += `<button onclick="playerAct('weep','back')">💙 Call Them Back</button>`;
  if(ph===1 && ['sky','jade','devon'].includes(u.id) && !(B.cutFlow>0)) h += `<button onclick="playerAct('weep','cut')">✂️ Interrupt the Cycle${u.id==='sky'?'':' (half strength)'}</button>`;
  if(ph>=2 && B.illusion) h += `<button onclick="playerAct('weep','refuse')">💙 Refuse the Illusion${u.id==='sky'?'':' (half strength)'}</button>`;
  return h;
}
const weepDo = (u, sid) => {
  if(sid==='back' && u.id==='sky') weepCallBack(u);
  else if(sid==='cut' && ['sky','jade','devon'].includes(u.id)) weepInterrupt(u);
  else if(sid==='refuse') weepRefuse(u);
  else return false;
  return true;
};
(function(){
  const _pa = playerAct;
  playerAct = function(kind, sid, tuid){
    if(B && !B.over && B.weep && B.cur && B.cur.ally){
      const u = B.cur;
      if(kind==='weep'){ if(weepDo(u, sid)){ u.trapped = false; endTurn(u); advance(); } return; }
      if(u.trapped){ u.trapped = false; blog('🌀 '+u.name+' is lost in a false memory and cannot act.','bad'); endTurn(u); advance(); return; }
    }
    return _pa(kind, sid, tuid);
  };
  const choose = u => {
    const ph = weepPhase();
    if(ph===0 && u.id==='sky' && alive(B.allies).filter(a => a.trapped).length >= 1 && !(B.anchor>0)) return 'back';
    if(ph===1 && !(B.cutFlow>0) && (u.id==='sky' || (u.id==='jade' && !alive(B.allies).some(a => a.id==='sky')))) return 'cut';
    if(ph>=2 && B.illusion && (u.id==='sky' || (u.id==='jade' && !alive(B.allies).some(a => a.id==='sky')))) return 'refuse';
    return null;
  };
  const _ca = companionAct;
  companionAct = function(u){
    if(weepOn() && B.weep){
      if(u.trapped){ u.trapped = false; blog('🌀 '+u.name+' is lost in a false memory and cannot act.','bad'); return; }
      const s = choose(u); if(s && weepDo(u, s)) return;
    }
    return _ca(u);
  };
  if(typeof autoStep==='function'){
    const _as = autoStep;
    autoStep = function(){
      if(B && !B.over && B.weep && B.cur && B.cur.ally){ if(B.cur.trapped) return playerAct('guard'); const s = choose(B.cur); if(s) return playerAct('weep', s); }
      return _as();
    };
  }
})();
