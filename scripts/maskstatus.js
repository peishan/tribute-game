/* =====================================================================
   TRIBUTE — THE WHISPERING MASK'S STATUSES (Arc XXI, chapters 539 and 542; the author's page 539)
   The Evil of secrets does not only hit: it names the truths people hide and turns them into statuses.
     Shame     (k:'shame')    attack and magic -20%.                              "Your past is not something to be proud of."
     Doubt     (k:'doubt')    30% of the time the action fails (a hesitation).     "You are not enough."
     Silence   (k:'hush')     no spells, healing or support skills.                "If you speak, you will hurt someone."
     Distrust  (k:'distrust') healing and help from others is halved.              "They will never truly accept you."
   (Silence uses its own key so older enemies that silence allies are unchanged.)
   ACKNOWLEDGE (a new battle action, shown only while a Mask status is on the unit): spend the turn to say the truth aloud instead of denying it.
   It clears every Mask status on that unit, steadies them (+10% attack for 3 turns) and every truth acknowledged breaks a little of the Mask's leverage:
   the Mask takes 3% of its life and loses 7% attack and magic (stacking). Companions and guests acknowledge by themselves. All numbers first-pass.
   ===================================================================== */
const MASK_KEYS = ['shame','doubt','distrust','hush'];
const MASK_NAMES = {shame:'Shame', doubt:'Doubt', distrust:'Distrust', hush:'Silence'};
const MASK_VOICE = {
  shame:'“Yes, this is part of my past. It does not define everything I am now.”',
  doubt:'“Yes, I have made mistakes. But I keep going.”',
  hush:'“Yes, there are things I have not said. I will say what matters.”',
  distrust:'“Yes, I am afraid of that. But my actions now are real, and I stand with you.”',
};
const MASK_BOSSES = ['boss_mask_voice','boss_whispering_mask'];
const maskFoes = () => (typeof B!=='undefined' && B && B.foes) ? B.foes.filter(f => !f.dead && MASK_BOSSES.includes(f.key)) : [];
const maskAfflicted = u => (u && u.st) ? MASK_KEYS.filter(k => u.st[k]) : [];
FOE_FX.push(...MASK_KEYS);

// the Mask's moves carry the statuses (they apply when the move lands)
[['boss_mask_voice', {'We Know Who You Are':{k:'shame',d:3}, 'Let Us Show It to Everyone':{k:'doubt',d:2}, 'What You Hide':{k:'distrust',d:3}, 'They Will Never Accept You':{k:'hush',d:2}}],
 ['boss_whispering_mask', {'Leverage':{k:'shame',d:3}, 'The Weight of What Is Hidden':{k:'doubt',d:2}, 'A Rumour Turned Against You':{k:'distrust',d:3}, 'Silence':{k:'hush',d:3}}]].forEach(([key, byMove]) => {
  const e = ENEMIES[key]; if(!e) return;
  e.moves.forEach(m => { const fx = byMove[m.n]; if(fx && !(m.fx||[]).some(x => x.k===fx.k)) m.fx = (m.fx||[]).concat([fx]); });
});

(function(){
  // stat effects
  const _eff = eff;
  eff = function(u, stat){
    let v = _eff(u, stat);
    if(u && u.st && u.st.shame && (stat==='atk' || stat==='mag')) v *= .8;
    return v;
  };
  // applying the statuses
  const _af = applyFx;
  applyFx = function(src, tgt, fx){
    if(MASK_KEYS.includes(fx.k)){
      if(!tgt || tgt.dead) return;
      if(tgt.ally && tgt.st.resolve){ blog('  '+tgt.name+' shrugs it off.','good'); return; }
      tgt.st[fx.k] = {d:(fx.d||3)+1};
      blog('  '+(tgt.ally?'🌑 ':'')+tgt.name+' is struck by '+MASK_NAMES[fx.k]+'.','bad');
      return;
    }
    return _af(src, tgt, fx);
  };
  // they wear off like the other statuses
  const _end = endTurn;
  endTurn = function(u){
    MASK_KEYS.forEach(k => { if(u.st[k] && --u.st[k].d <= 0) delete u.st[k]; });
    _end(u);
  };
  // Silence: no spells, healing or support
  const _sl = skillList;
  skillList = function(u){
    const l = _sl(u);
    if(!(u && u.ally && u.st && u.st.hush)) return l;
    return l.map(s => ['magic','heal','support'].includes(s.kind) ? Object.assign({}, s, {usable:false, note:'(silenced)'}) : s);
  };
  // Distrust: help from others is halved (healing); Doubt and Acknowledge are handled when the action is taken
  const _rs = resolve;
  resolve = function(u, s, t){
    const watch = (s && s.kind==='heal') ? B.allies.filter(a => a.st.distrust && a !== u).map(a => [a, a.hp]) : [];
    _rs(u, s, t);
    watch.forEach(([a, before]) => { const gained = a.hp - before; if(gained > 1 && !a.dead){ const back = Math.floor(gained/2); a.hp -= back; blog('  Distrust: '+a.name+' cannot accept all of the help (−'+back+').','bad'); } });
  };
  // Doubt: the action may fail
  const hesitates = u => !!(u && u.st && u.st.doubt && Math.random() < .3);
  const _pa = playerAct;
  playerAct = function(kind, sid, tuid){
    if(B.over) return;
    const u = B.cur; if(!u || !u.ally) return _pa(kind, sid, tuid);
    if(kind==='acknowledge'){ maskAcknowledge(u); endTurn(u); advance(); return; }
    if(kind!=='guard' && hesitates(u)){ blog(u.name+' hesitates: Doubt stills the action.','bad'); endTurn(u); advance(); return; }
    return _pa(kind, sid, tuid);
  };
  // guests and companions act by themselves: they acknowledge, or hesitate
  const _ca = companionAct;
  companionAct = function(u){
    if(maskAfflicted(u).length){ maskAcknowledge(u); return; }
    if(hesitates(u)){ blog(u.name+' hesitates: Doubt stills the action.','bad'); return; }
    return _ca(u);
  };
  // the opening of the fights: the Mask names each of the party's truths
  const _sb = startBattle;
  startBattle = function(spec){
    _sb(spec);
    if(typeof B==='undefined' || !B || !B.foes) return;
    const mask = maskFoes()[0]; if(!mask) return;
    const first = mask.key==='boss_mask_voice';
    blog('🎭 The Mask: “We know who you are. What you regret. What you hide. What you fear. Let us show it to everyone.”','foe');
    const order = ['jade','devon','sky','levi','sally','mirelle','rheon'], want = ['shame','doubt','hush','distrust'];
    const mine = alive(B.allies).slice().sort((a,b) => (order.indexOf(a.id)<0?9:order.indexOf(a.id)) - (order.indexOf(b.id)<0?9:order.indexOf(b.id)));
    mine.slice(0, first ? 4 : 2).forEach((a, i) => { a.st[want[i%4]] = {d:3}; blog('  🌑 '+a.name+' is struck by '+MASK_NAMES[want[i%4]]+'.','bad'); });
    blog('💬 Acknowledge a truth instead of denying it: it clears the status and breaks the Mask\'s leverage.','sys');
  };
})();

function maskAcknowledge(u){
  const ks = maskAfflicted(u); if(!ks.length) return;
  ks.forEach(k => { blog('🕯️ '+u.name+' acknowledges it (' + MASK_NAMES[k] + '): '+MASK_VOICE[k],'good'); delete u.st[k]; });
  u.bf.push({stat:'atk', m:1.1, d:4}); u.bf.push({stat:'mag', m:1.1, d:4});
  maskFoes().forEach(f => {
    ks.forEach(() => { f.bf.push({stat:'atk', m:.93, d:8}); f.bf.push({stat:'mag', m:.93, d:8}); f.hp = Math.max(1, f.hp - Math.round(f.mhp*.03)); });
    blog('  The Mask\'s leverage breaks: '+f.name+' weakens ('+ks.length+(ks.length>1?' truths':' truth')+' acknowledged).','good');
  });
}
function maskAckButton(u){
  return maskAfflicted(u).length ? `<button onclick="playerAct('acknowledge')">🕯️ Acknowledge</button>` : '';
}
// auto-battle: an afflicted unit acknowledges first
(function(){
  if(typeof autoStep!=='function') return;
  const _as = autoStep;
  autoStep = function(){
    if(B && !B.over && B.cur && B.cur.ally && maskAfflicted(B.cur).length) return playerAct('acknowledge');
    return _as();
  };
})();
