/* =====================================================================
   TRIBUTE — THE ENDLESS WINTER (Arc XXIII, chapter 604; the author's page 604)
   The fight is not only about the entity's life: the party must keep the five beacon links alive while weakening the corrupted core.
     Links     B.links, five at the start. Each round the Winter freezes one (the cold takes it).
     Cold      the fewer links hold, the harder it hits: attack and magic +10% for each link lost.
     Frozen    at no links the mountain freezes again: every ally loses 6% of their life at the end of each turn until a link is relit.
     TEND THE BEACONS (a new battle action; the unit spends the turn): relights one link (two if Jade or Sky) and the corrupted core loses 2% of its life.
   Companions and guests, and auto-battle, tend the beacons by themselves when two links or fewer hold. All numbers first-pass.
   ===================================================================== */
const WINTER_KEY = 'boss_endless_winter';
Object.assign(ENEMIES, {
  boss_endless_winter:{n:'The Endless Winter',icon:'❄️',area:'dragon',boss:true,hp:9200,atk:52,mag:54,def:31,spd:20,xp:3400,gold:2500,traits:['magic','corrupt'],moves:[{n:'Whiteout',pow:1.0,all:true,spell:true,fx:[{k:'slow',d:1}]},{n:'Heat Drain',pow:1.4,spell:true},{n:'Frozen Weight',pow:1.2,fx:[{k:'slow',d:2}]},{n:'Endless Cold',pow:1.5,spell:true}],phases:[{at:.5,msg:'It reaches for the five fires, and the links shiver',atk:1.1},{at:.2,msg:'It is only a body that cannot let go',atk:1.05}],desc:'One of the Fifteen. A part of the natural seasonal cycle that lost its way: it takes energy because it no longer knows how to release it.'},
});
LOOT.boss_endless_winter = {guaranteed:[{id:'seal_dust',qty:[2,3]},{id:'spirit_thread',qty:[1,2]}],rolls:[{id:'forgotten_glass',chance:.5}],firstClear:[{id:'celestial_shard',qty:[1,2]}]};
deed('hz_winter', 'story', 'Let it go', '❄️', 'The Endless Winter was restored: its five links held and its cold was released.', () => !!G.flags.boss_boss_endless_winter || (G && G.ch >= 608));

const winterFoes = () => (typeof B!=='undefined' && B && B.foes) ? B.foes.filter(f => !f.dead && f.key===WINTER_KEY) : [];
const winterOn = () => winterFoes().length > 0 && typeof B.links === 'number';
const linkBar = n => '🔥'.repeat(Math.max(0,n)) + '▫️'.repeat(Math.max(0,5-n));

(function(){
  const _eff = eff;
  eff = function(u, stat){
    let v = _eff(u, stat);
    if(u && !u.ally && u.key===WINTER_KEY && typeof B!=='undefined' && B && typeof B.links==='number' && (stat==='atk' || stat==='mag')) v *= 1 + .1*(5 - B.links);
    return v;
  };
  const _sb = startBattle;
  startBattle = function(spec){
    _sb(spec);
    if(typeof B==='undefined' || !B || !winterFoes().length) return;
    B.links = 5;
    blog('❄️ The Endless Winter: the cold closes over the five fires. '+linkBar(5),'foe');
    blog('💬 Tend the Beacons to relight a link (Jade and Sky relight two) and wear the core down. If every link fails, the mountain freezes again.','sys');
  };
  const _end = endTurn;
  endTurn = function(u){
    _end(u);
    if(typeof B==='undefined' || !B || typeof B.links!=='number') return;
    if(u && !u.ally && u.key===WINTER_KEY && B.links > 0){
      B.links--; blog('❄️ A beacon link gutters out. '+linkBar(B.links)+' ('+B.links+'/5)', B.links<=1?'bad':'foe');
      if(B.links===0) blog('🥶 The mountain freezes again: the cold bites every ally each turn until a link is relit.','bad');
    }
    if(u && u.ally && B.links===0 && !u.dead){
      const loss = Math.max(1, Math.round(u.mhp*.06)); u.hp = Math.max(1, u.hp - loss);
      blog('  🥶 '+u.name+' is bitten by the cold (−'+loss+').','bad');
    }
  };
})();

function winterTend(u){
  if(!winterOn()) return;
  const gain = (u.id==='jade' || u.id==='sky') ? 2 : 1, before = B.links;
  B.links = Math.min(5, B.links + gain);
  blog('🔥 '+u.name+' tends the beacons: '+linkBar(B.links)+' ('+B.links+'/5)'+(B.links>before?'':' (all five already hold)'),'good');
  winterFoes().forEach(f => { const d = Math.max(1, Math.round(f.mhp*.02)); f.hp = Math.max(1, f.hp - d); blog('  The corrupted core is weakened (−'+d+').','good'); });
}
function winterButton(u){
  return (winterOn() && u && u.ally) ? `<button onclick="playerAct('tend')">🔥 Tend the Beacons${B.links<5?'':' (all lit)'}</button>` : '';
}
(function(){
  const _pa = playerAct;
  playerAct = function(kind, sid, tuid){
    if(kind==='tend' && !B.over){ const u = B.cur; if(u && u.ally){ winterTend(u); endTurn(u); advance(); return; } }
    return _pa(kind, sid, tuid);
  };
  const _ca = companionAct;
  companionAct = function(u){
    if(winterOn() && B.links <= 2){ winterTend(u); return; }
    return _ca(u);
  };
  if(typeof autoStep==='function'){
    const _as = autoStep;
    autoStep = function(){
      if(B && !B.over && B.cur && B.cur.ally && winterOn() && B.links <= 2) return playerAct('tend');
      return _as();
    };
  }
})();
