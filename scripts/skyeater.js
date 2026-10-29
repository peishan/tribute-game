/* =====================================================================
   TRIBUTE — THE SKY EATER (Arc XXVII, chapter 707; the author's page 707)
   Four phases, as the page labels them. All numbers first-pass.
     1 Hunger            each round it drains the party's spiritual energy (MP). Jade's HOLD FORMATION (protect the capital first, conserve strength) halves the drain
                         for 3 rounds and steadies the party (ATK +10%).
     2 Falling Shadow    waves of shadow sweep the field: a tell one round ahead, then the wave. Levi's MARK OPENINGS lets the party move between the waves (the wave passes);
                         with Levi alive every wave is halved.
     3 Devour the Light  it goes after the three ward nodes, one a round. Sky STABILISES a node (or two), Devon REINFORCES BARRIERS (a ward on the party and the next node is safe),
                         Sally KEEPS THE SHADOWS DISTRACTED (it skips devouring for a round). With no node left the capital's wards are gone and the party bleeds light each turn.
     4 Silver Crown      its aerial defences take only 30% damage until broken. Rheon in his silver-crowned form BREAKS ITS DEFENCES (or Jade and Devon between them, at half strength).
   Companions and auto-battle use these by themselves.
   ===================================================================== */
const SKY_KEY = 'boss_sky_eater';
Object.assign(ENEMIES, {
  boss_sky_eater:{n:'The Sky Eater',icon:'🌑',area:'dragon',boss:true,hp:10400,atk:55,mag:58,def:32,spd:22,xp:3900,gold:2800,traits:['magic','corrupt'],
    moves:[{n:'Devouring Descent',pow:1.3,spell:true},{n:'Hunger Wave',pow:1.0,all:true,spell:true},{n:'Falling Shadow',pow:1.2,spell:true},{n:'Starved Bite',pow:1.4}],
    phases:[
      {at:.75,msg:'Phase two: Falling Shadow. Waves of shadow sweep across the capital',atk:1.05},
      {at:.5,msg:'Phase three: Devour the Light. It turns on the ward nodes',atk:1.05},
      {at:.25,msg:'Phase four: Silver Crown. Its aerial defences are all that stand between it and the party',atk:1.1}],
    desc:'One of the Fifteen. A vast serpentine hunger from the upper skies that feeds on vital energy, and now follows the restored energy of the old network.'},
});
LOOT.boss_sky_eater = {guaranteed:[{id:'seal_dust',qty:[2,3]},{id:'spirit_thread',qty:[1,2]}],rolls:[{id:'forgotten_glass',chance:.5}],firstClear:[{id:'celestial_shard',qty:[1,2]}]};
deed('hz_sky_eater', 'story', 'The sky gives back', '🌑', 'The Sky Eater fell above the capital of Altan, and what it had taken went back to the land.', () => !!G.flags.boss_boss_sky_eater || (G && G.ch >= 708));

const skyFoes = () => (typeof B!=='undefined' && B && B.foes) ? B.foes.filter(f => !f.dead && f.key===SKY_KEY) : [];
const skyPhase = () => { const f = skyFoes()[0]; return f ? (f.phaseIdx||0) : -1; };
const skyOn = () => !!(typeof B!=='undefined' && B && !B.over && skyFoes().length);
// phase four: Rheon, in his transformed state, joins the fight even if he was not in the party's five
function skyRheonJoins(){
  if(!B || B.rheonIn || skyRheon() || !G.party.includes('rheon')) return;
  B.rheonIn = true;
  const u = mkAlly('rheon', !!(B.spec && B.spec.rewards)); B.allies.push(u); B.queue.push(u);
  blog('👑 Rheon joins the battle in his transformed state: silver-crowned, his power filling the air.','good');
}
const skyRheon = () => !!(B && B.allies && B.allies.some(a => a.id==='rheon' && !a.dead));

(function(){
  const _sb = startBattle;
  startBattle = function(spec){
    _sb(spec);
    if(!skyOn()) return;
    B.sky = true; B.nodes = 3; B.form = 0; B.opening = 0; B.distract = 0; B.guardNode = 0; B.waveTell = false; B.crown = false; B.crownProg = 0; B.sround = 0;
    blog('🌑 The Sky Eater: Phase one, Hunger. It drains the party\'s energy every round (Jade can Hold Formation).','foe');
  };
  // phase 1: the party's formation is steadier; phase 4: the aerial defences blunt almost everything
  const _eff = eff;
  eff = function(u, stat){
    let v = _eff(u, stat);
    if(!(typeof B!=='undefined' && B && B.sky && u)) return v;
    if(u.ally && (B.form||0) > 0 && stat==='atk') v *= 1.1;
    return v;
  };
  const _hurt = hurt;
  hurt = function(t, d, ignoreShield){
    if(t && !t.ally && t.key===SKY_KEY && skyPhase()>=3 && !B.crown) d = Math.max(1, Math.round(d*.3));
    return _hurt(t, d, ignoreShield);
  };
  const _end = endTurn;
  endTurn = function(u){
    _end(u);
    if(!(typeof B!=='undefined' && B && B.sky)) return;
    if(skyPhase()>=3) skyRheonJoins();
    if(u && u.ally) return;
    if(!(u && u.key===SKY_KEY && !u.dead)) return;
    const ph = skyPhase(); B.sround++;
    if(B.form>0) B.form--;
    // hunger: every phase drains a little energy
    const drain = Math.round((ph===0 ? .08 : .04) * (B.form>0 ? .5 : 1) * 100) / 100;
    alive(B.allies).forEach(a => { const d = Math.round(a.mmp*drain); if(d>0) a.mp = Math.max(0, a.mp-d); });
    blog('  🌑 The Sky Eater feeds on the party\'s spiritual energy'+(B.form>0?' (the formation holds most of it back)':'')+'.','bad');
    if(ph===1){
      if(B.waveTell){
        B.waveTell = false;
        if(B.opening>0){ B.opening--; blog('🏹 Levi\'s marks show the openings: the wave of shadow passes between them.','good'); }
        else {
          const levi = B.allies.some(a => a.id==='levi' && !a.dead);
          alive(B.allies).forEach(a => { const d = Math.max(1, Math.round(u.atk*.45*(levi?.5:1))); hurt(a, d, true); });
          blog('  🌑 A wave of shadow sweeps the capital'+(levi?' (Levi read most of it)':'')+'.','bad');
        }
      } else { B.waveTell = true; blog('👁️ The light dims: a wave of shadow follows next round (Mark Openings, or take it).','foe'); }
    }
    if(ph===2){
      if(B.distract>0){ B.distract--; blog('💜 Sally keeps the shadows chasing her: it forgets the nodes this round.','good'); }
      else if(B.nodes>0){
        if(B.guardNode>0){ B.guardNode--; blog('🛡️ The reinforced barrier holds: the node is not devoured.','good'); }
        else { B.nodes--; blog('  🌑 It devours a ward node. '+B.nodes+' / 3 hold.','bad'); }
      }
      if(B.nodes<=0){ alive(B.allies).forEach(a => { const d = Math.max(1, Math.round(a.mhp*.04)); hurt(a, d, true); }); blog('  🌑 The wards are gone: the light drains from the party.','bad'); }
    }
    if(ph>=3 && !B.crown){ const h = Math.round(u.mhp*.015); u.hp = Math.min(u.mhp, u.hp+h); blog('  🌑 Its defences feed it (+'+h+').','foe'); }
  };
})();

// the party's actions
function skyForm(u){ B.form = 3; blog('🛡️ '+u.name+': "Keep formation. Protect the capital first." The drain is halved for 3 rounds and the party steadies (ATK +10%).','good'); }
function skyOpening(u){ B.opening = 1; blog('🏹 '+u.name+' marks the openings between the waves: the next wave will pass.','good'); }
function skyStabilise(u){ const n = (u.id==='sky') ? 2 : 1; B.nodes = Math.min(3, B.nodes+n); const f = skyFoes()[0]; if(f){ const d = Math.round(f.mhp*.015); f.hp = Math.max(1, f.hp-d); } blog('✨ '+u.name+' stabilises a ward node ('+B.nodes+' / 3 hold).','good'); }
function skyBarrier(u){ B.guardNode = 1; alive(B.allies).forEach(a => { a.st.ward = {v:.2, d:2}; }); blog('🛡️ '+u.name+' reinforces the barriers: the next node is safe and the party is warded for 2 turns.','good'); }
function skyDistract(u){ B.distract = 1; blog('💜 '+u.name+' keeps the shadows distracted for a round.','good'); }
function skyBreak(u){
  const f = skyFoes()[0]; if(!f) return;
  if(u.id==='rheon'){ B.crown = true; const d = Math.round(f.mhp*.2); f.hp = Math.max(1, f.hp-d); blog('👑 Rheon, silver-crowned, breaks its aerial defences. "Everyone — now!" (−'+d+')','good'); }
  else { B.crownProg = (B.crownProg||0)+1; if(B.crownProg>=3){ B.crown = true; blog('⚔️ '+u.name+' lands the blow that breaks its aerial defences.','good'); } else blog('⚔️ '+u.name+' works at its aerial defences ('+B.crownProg+' / 3: or Rheon).','good'); }
}
function skyButtons(u){
  if(!(typeof B!=='undefined' && B && B.sky && !B.over && u && u.ally)) return '';
  const ph = skyPhase(); let h = '';
  if(u.id==='jade' && ph<=1) h += `<button onclick="playerAct('sky','form')">🛡️ Hold Formation</button>`;
  if(ph===1 && u.id==='levi') h += `<button onclick="playerAct('sky','opening')">🏹 Mark Openings</button>`;
  if(ph===2){
    if(u.id==='sky') h += `<button onclick="playerAct('sky','stabilise')">✨ Stabilise a Node</button>`;
    if(u.id==='devon') h += `<button onclick="playerAct('sky','barrier')">🛡️ Reinforce Barriers</button>`;
    if(u.id==='sally') h += `<button onclick="playerAct('sky','distract')">💜 Keep the Shadows Distracted</button>`;
  }
  if(ph>=3 && !B.crown && (u.id==='rheon' || u.id==='jade' || u.id==='devon')) h += `<button onclick="playerAct('sky','break')">👑 Break Its Defences${u.id==='rheon'?'':' (half strength)'}</button>`;
  return h;
}
const skyDo = (u, sid) => {
  if(sid==='form' && u.id==='jade') skyForm(u);
  else if(sid==='opening' && u.id==='levi') skyOpening(u);
  else if(sid==='stabilise' && u.id==='sky') skyStabilise(u);
  else if(sid==='barrier' && u.id==='devon') skyBarrier(u);
  else if(sid==='distract' && u.id==='sally') skyDistract(u);
  else if(sid==='break' && ['rheon','jade','devon'].includes(u.id)) skyBreak(u);
  else return false;
  return true;
};
(function(){
  const _pa = playerAct;
  playerAct = function(kind, sid, tuid){
    if(kind==='sky' && B && !B.over && B.sky && B.cur && B.cur.ally){ const u = B.cur; if(skyDo(u, sid)){ endTurn(u); advance(); } return; }
    return _pa(kind, sid, tuid);
  };
  const choose = u => {
    const ph = skyPhase();
    if(ph>=3 && !B.crown && (u.id==='rheon' || (u.id==='jade' && !skyRheon()) || (u.id==='devon' && !skyRheon() && !alive(B.allies).some(a => a.id==='jade')))) return 'break';
    if(ph===2){ if(u.id==='sky' && B.nodes<3) return 'stabilise'; if(u.id==='devon' && !(B.guardNode>0) && B.nodes>0) return 'barrier'; if(u.id==='sally' && !(B.distract>0)) return 'distract'; }
    if(ph===1 && u.id==='levi' && B.waveTell && !(B.opening>0)) return 'opening';
    if(ph<=1 && u.id==='jade' && !(B.form>0)) return 'form';
    return null;
  };
  const _ca = companionAct;
  companionAct = function(u){
    if(skyOn() && B.sky){ const s = choose(u); if(s && skyDo(u, s)) return; }
    return _ca(u);
  };
  if(typeof autoStep==='function'){
    const _as = autoStep;
    autoStep = function(){
      if(B && !B.over && B.sky && B.cur && B.cur.ally){ const s = choose(B.cur); if(s) return playerAct('sky', s); }
      return _as();
    };
  }
})();
