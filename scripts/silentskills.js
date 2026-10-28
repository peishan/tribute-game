/* =====================================================================
   TRIBUTE — ARC XXV SKILLS (the author's gameplay additions for Arc XXV)
   Sally: RESONANT RHYTHM (skill, from ch643 sally_feels_the_vibration). A rhythm felt through her instrument instead of heard: the party is steadied for 3 turns (ATK and MAG +10%), shrugs off silence,
     hush and charm for as long as it lasts (and clears them now), and in a silence zone spoken commands work while it lasts. It is not a spoken order, so silence zones do not silence it.
   Levi: TRAIL SENSE (passive on the Exploration side, from ch647 levis_trail_followed, while Levi is in the active party). Ambush indicators: fewer ambushes on searches and gathering
     (20%, better than Tarin\'s 22%); hidden routes: 30% of searches cost no day; environmental clues: a little bonus XP on every clue; pursuits: hunts start with the foes revealed and the first one pinned.
   Sally and Levi: UNSPOKEN UNDERSTANDING (duo passive, once they are married at ch659, both in the active party): +5% speed (initiative), half the chance of silence, hush, charm, doubt or distrust,
     and their signals in a silence zone last longer. Not a bond system. All numbers first-pass.
   ===================================================================== */
const unspokenOn = () => !!(G && G.flags && G.flags.levi_and_sally_wed && ['levi','sally'].every(x => G.party.includes(x) && G.active.includes(x) && !isDisabled(x)));
const leviTrail = () => !!(G && G.flags && G.flags.levis_trail_followed && G.party.includes('levi') && G.active.includes('levi') && !isDisabled('levi'));

(function(){
  const c = CHARACTERS.sally;
  if(!c.skills.some(s => s.id==='resonant_rhythm')) c.skills.push({id:'resonant_rhythm', n:'Resonant Rhythm', icon:'🎶', mp:10, kind:'support', tgt:'allies', vibration:true, fx:[{k:'rhythm', d:3}], req:{flag:'sally_feels_the_vibration'},
    desc:'A rhythm felt through the instrument, not heard (ch643): the party ATK and MAG +10% for 3 turns, silence, hush and charm cleared and resisted, and spoken commands work in a silence zone while it lasts.'});
})();

const RHYTHM_CLEARS = ['silence','hush','charm','doubt'];
const RHYTHM_RESISTS = ['silence','hush','charm','doubt','distrust'];
(function(){
  const _af = applyFx;
  applyFx = function(src, tgt, fx){
    if(fx && fx.k==='rhythm'){
      if(!tgt || tgt.dead) return;
      tgt.st.rhythm = {d:(fx.d||3)+1};
      RHYTHM_CLEARS.forEach(k => { if(tgt.st[k]) delete tgt.st[k]; });
      if(typeof B!=='undefined' && B && B.silent) B.rhythm = Math.max(B.rhythm||0, fx.d||3);
      blog('  🎶 '+tgt.name+' is steadied by the rhythm.','good');
      return;
    }
    if(tgt && tgt.ally && fx && RHYTHM_RESISTS.includes(fx.k)){
      if(tgt.st.rhythm){ blog('  🎶 '+tgt.name+' feels the rhythm and shrugs it off.','good'); return; }
      if(unspokenOn() && (tgt.id==='levi' || tgt.id==='sally') && Math.random() < .5){ blog('  💞 '+tgt.name+' needs no words: Unspoken Understanding turns it aside.','good'); return; }
    }
    return _af(src, tgt, fx);
  };
  const _eff = eff;
  eff = function(u, stat){
    let v = _eff(u, stat);
    if(u && u.ally){
      if(u.st && u.st.rhythm && (stat==='atk' || stat==='mag')) v *= 1.1;
      if(stat==='spd' && (u.id==='levi' || u.id==='sally') && unspokenOn()) v *= 1.05;
    }
    return v;
  };
  const _end = endTurn;
  endTurn = function(u){
    if(u && u.st && u.st.rhythm && --u.st.rhythm.d <= 0) delete u.st.rhythm;
    _end(u);
  };
})();

// Levi's Trail Sense on searches, hunts and gathering
const trailLines = [
  'Levi reads the snow, the broken twigs and the scuffed stone: someone passed here, and not long ago.',
  'Levi spots where the ground has been disturbed and where it has been carefully put back.',
  'Levi notes the direction of the wind, the animals that have gone quiet and the one print that does not fit.',
  'Levi points out a worn track that leaves the road where nobody would think to look.',
];
let trailN = 0;
function trailSense(sp){
  if(!leviTrail()) return null;
  const hidden = Math.random() < .3, line = '🏹 Trail Sense: '+trailLines[trailN++ % trailLines.length]+(hidden ? ' A hidden route saves a day.' : '');
  return {xp: 60 + avgPartyLv()*4, hidden, line};
}
const leviEdge = () => leviTrail();

function silentSkillsPanel(){
  let h = '';
  if(leviTrail()) h += `<h4>${portraitChip('assets/party/levi.webp','Levi Stanson')} Levi: Trail Sense</h4><div class="sm">He reads the ground. <b>Ambush indicators:</b> fewer ambushes on searches and gathering (20%). <b>Hidden routes:</b> 3 searches in 10 cost no day. <b>Environmental clues:</b> a little bonus XP on every clue. <b>Pursuits:</b> hunts start with the foes revealed and the first one pinned.</div>`;
  if(unspokenOn()) h += `<div class="sm">💞 <b>Unspoken Understanding</b> (Levi and Sally, married): +5% speed, half the chance of silence, hush or charm, and longer signals in a silence zone, while both are in the active party.</div>`;
  return h;
}
(function(){ const _rc = rCase; rCase = function(){ return _rc() + silentSkillsPanel(); }; })();
