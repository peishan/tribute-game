/* =====================================================================
   TRIBUTE — THE OLD SYSTEM'S LAST SPASM (Arc XXXV, chapter 898, "The Last Trial"; the author's page 898)
   The page names it only as the colossal combat manifestation of the collapsing old system (fragments of the Fifteen anchors, residual restoration energy, discarded guidance-system defences,
   echoes of previous Evils, traces of Dima and Xima's old conflict). It is not a new Evil and not a Sixteenth. Three phases; each party member has the role the page gives them. First-pass numbers.
     1 Fragments       its defences take half damage and it rebuilds 3% a round, until SALLY DISABLES THE DEFENCES (3 rounds; others 3 tries for 2 rounds).
     2 Control Arrays  a blast each round; damage taken is 40% until JADE DISABLES THE CONTROL ARRAYS (others: three tries).
     3 Death Spasm     damage taken is 30% until JADE BREAKS THE CORE (others: three tries) and it rebuilds 3% a round until then.
     Always: LEVI marks its weak points (+25% damage for 3 rounds), DEVON draws the massive attacks (the rest of the party takes 30% of them for 2 rounds), SKY cleanses status effects and steadies the party (heals 20%).
   Any party member can do any action at reduced strength. Companions and auto-battle use these themselves.
   ===================================================================== */
const LS_KEY = 'boss_last_spasm';
Object.assign(ENEMIES, {
  boss_last_spasm:{n:'The Old System\'s Last Spasm',icon:'🌅',area:'dragon',boss:true,hp:12400,atk:58,mag:62,def:35,spd:22,xp:4700,gold:3300,traits:['magic','corrupt'],
    moves:[{n:'Collapsing Anchor',pow:1.3,spell:true},{n:'Residual Surge',pow:1.0,all:true,spell:true},{n:'Echo of an Evil',pow:1.4,spell:true},{n:'Old Dispute',pow:1.2,spell:true,fx:[{k:'slow',d:1}]}],
    phases:[
      {at:.66,msg:'Phase two: the control arrays. A blast sweeps the party every round',atk:1.05},
      {at:.33,msg:'Phase three: the death spasm. The core is all that is left holding it together',atk:1.1}],
    desc:'Not a new Evil and not a Sixteenth: the collapsing remnants of the old system made manifest, in one colossal death spasm.'},
});
LOOT.boss_last_spasm = {guaranteed:[{id:'seal_dust',qty:[2,3]},{id:'spirit_thread',qty:[1,2]},{id:'restoration_shard',qty:[1,2]}],rolls:[{id:'forgotten_glass',chance:.5}],firstClear:[{id:'celestial_shard',qty:[1,2]}]};
deed('hz_last_spasm', 'story', 'The old system falls silent', '🌅', 'The last spasm of the old system broke apart, and it fell silent.', () => !!G.flags.boss_boss_last_spasm || (G && G.ch >= 899));

const lsFoes = () => (typeof B!=='undefined' && B && B.foes) ? B.foes.filter(f => !f.dead && f.key===LS_KEY) : [];
const lsPhase = () => { const f = lsFoes()[0]; return f ? (f.phaseIdx||0) : -1; };
const lsOn = () => !!(typeof B!=='undefined' && B && !B.over && lsFoes().length);
const LS_OWN = {mark:'levi', dis:'sally', draw:'devon', cleanse:'sky', arrays:'jade', core:'jade'};

(function(){
  const _sb = startBattle;
  startBattle = function(spec){
    _sb(spec);
    if(!lsOn()) return;
    B.ls = true; B.mark = 0; B.dis = 0; B.drawn = 0; B.arrays = false; B.core = false; B.prog = {};
    blog('🌅 The Old System\'s Last Spasm: Phase one, the fragments. Its defences take half damage until Sally disables them.','foe');
  };
  const _hurt = hurt;
  hurt = function(t, d, ignoreShield){
    if(typeof B!=='undefined' && B && B.ls && t){
      if(!t.ally && t.key===LS_KEY){
        const ph = lsPhase();
        if(ph===0 && !(B.dis>0)) d = Math.max(1, Math.round(d*.5));
        else if(ph===1 && !B.arrays) d = Math.max(1, Math.round(d*.4));
        else if(ph>=2 && !B.core) d = Math.max(1, Math.round(d*.3));
        if(B.mark>0) d = Math.round(d*1.25);
      } else if(t.ally && t.id!=='devon' && B.drawn>0) d = Math.max(1, Math.round(d*.3));
    }
    return _hurt(t, d, ignoreShield);
  };
  const _end = endTurn;
  endTurn = function(u){
    _end(u);
    if(!(typeof B!=='undefined' && B && B.ls)) return;
    if(u && u.ally) return;
    if(!(u && u.key===LS_KEY && !u.dead)) return;
    const ph = lsPhase();
    if(B.dis>0) B.dis--; if(B.mark>0) B.mark--; if(B.drawn>0) B.drawn--;
    if(ph>=1){ alive(B.allies).forEach(a => { hurt(a, Math.max(1, Math.round(u.atk*.4)), true); }); blog('  🌅 The control arrays blast the party'+(B.drawn>0?' (Devon draws the worst of it)':'')+'.','bad'); }
    const rebuilding = (ph===0 && !(B.dis>0)) || (ph>=2 && !B.core);
    if(rebuilding){ const h = Math.round(u.mhp*.03); u.hp = Math.min(u.mhp, u.hp+h); blog('  🌅 The old system rebuilds itself (+'+h+').','foe'); }
  };
})();

function lsProgress(u, key, need){
  if(LS_OWN[key]===u.id) return true;
  B.prog[key] = (B.prog[key]||0)+1;
  if(B.prog[key]>=need){ B.prog[key] = 0; return true; }
  blog('🔧 '+u.name+' works at it ('+B.prog[key]+' / '+need+': or '+((CHARACTERS[LS_OWN[key]]||{}).n||'')+').','good');
  return false;
}
function lsDo(u, sid){
  const own = LS_OWN[sid]===u.id;
  if(sid==='mark'){ B.mark = own ? 3 : 2; blog('🏹 '+u.name+' marks its weak points: +25% damage for '+B.mark+' rounds.','good'); }
  else if(sid==='draw'){ B.drawn = own ? 2 : 1; blog('🛡️ '+u.name+' draws the massive attacks: the rest of the party takes a fraction for '+B.drawn+' round(s).','good'); }
  else if(sid==='cleanse'){ const f = own ? .2 : .1; alive(B.allies).forEach(a => { a.st = {}; a.hp = Math.min(a.mhp, a.hp+Math.round(a.mhp*f)); }); blog('✨ '+u.name+' cleanses the party and steadies everyone ('+Math.round(f*100)+'%).','good'); }
  else if(sid==='dis'){ if(own || lsProgress(u,'dis',3)){ B.dis = own ? 3 : 2; blog('🕸️ '+u.name+' disables its defences for '+B.dis+' rounds: no rebuilding, and the blows land.','good'); } }
  else if(sid==='arrays'){ if(own || lsProgress(u,'arrays',3)){ B.arrays = true; blog('🔌 '+u.name+' disables the control arrays: the blasts stop and the blows land.','good'); } }
  else if(sid==='core'){ if(own || lsProgress(u,'core',3)){ B.core = true; const f = lsFoes()[0]; if(f){ const d = Math.round(f.mhp*.2); f.hp = Math.max(1, f.hp-d); blog('💥 '+u.name+' breaks the core mechanisms: the old system is exposed (−'+d+').','good'); } } }
  else return false;
  return true;
}
function lsButtons(u){
  if(!(typeof B!=='undefined' && B && B.ls && !B.over && u && u.ally)) return '';
  const ph = lsPhase(), h = (sid, label, icon) => `<button onclick="playerAct('ls','${sid}')">${icon} ${label}${LS_OWN[sid]===u.id?'':' (half strength)'}</button>`;
  let s = '';
  if(ph===0 && !(B.dis>0)) s += h('dis','Disable Defences','🕸️');
  if(ph===1 && !B.arrays) s += h('arrays','Disable Control Arrays','🔌');
  if(ph>=2 && !B.core) s += h('core','Break the Core','💥');
  if(!(B.mark>0)) s += h('mark','Mark Weak Points','🏹');
  if(ph>=1 && !(B.drawn>0)) s += h('draw','Draw the Attacks','🛡️');
  s += h('cleanse','Cleanse and Steady','✨');
  return s;
}
(function(){
  const _pa = playerAct;
  playerAct = function(kind, sid, tuid){
    if(kind==='ls' && B && !B.over && B.ls && B.cur && B.cur.ally){ const u = B.cur; if(lsDo(u, sid)){ endTurn(u); advance(); } return; }
    return _pa(kind, sid, tuid);
  };
  const task = u => {
    const ph = lsPhase(), ids = alive(B.allies).map(a => a.id);
    const need = ph===0 ? (!(B.dis>0) && 'dis') : ph===1 ? (!B.arrays && 'arrays') : (!B.core && 'core');
    if(need && (LS_OWN[need]===u.id || !ids.includes(LS_OWN[need]))) return need;
    if(u.id==='levi' && !(B.mark>0)) return 'mark';
    if(u.id==='devon' && ph>=1 && !(B.drawn>0)) return 'draw';
    if(u.id==='sky' && alive(B.allies).some(a => a.hp < a.mhp*.6)) return 'cleanse';
    return null;
  };
  const _ca = companionAct;
  companionAct = function(u){ if(lsOn() && B.ls){ const s = task(u); if(s && lsDo(u, s)) return; } return _ca(u); };
  if(typeof autoStep==='function'){
    const _as = autoStep;
    autoStep = function(){ if(B && !B.over && B.ls && B.cur && B.cur.ally){ const s = task(B.cur); if(s) return playerAct('ls', s); } return _as(); };
  }
})();
