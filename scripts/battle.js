/* =====================================================================
   TRIBUTE — BATTLE (turn-based skeleton; swap-able later)
   Used by the Training Room (sandbox, no rewards) and chapter boss
   fights (real rewards: XP, gold, bond, loot table).
   ===================================================================== */
let B = null;

function mkAlly(id, persist){
  const s = statsOf(id), c = CHARACTERS[id], hp = persist ? curHp(id) : s.hp, mp = persist ? curMp(id) : s.mp;
  return { uid:id, id, ally:true, name:c.n, icon:c.icon, img:portrait(id), traits:[],
    hp:Math.max(hp,1), mhp:s.hp, mp:mp, mmp:s.mp, atk:s.atk, mag:s.mag, def:s.def, spd:s.spd,
    st:{}, bf:[], state:null, used:{}, dead:false, guard:false, critB:passivesOf(id).critB, evaB:passivesOf(id).evaB };
}
function mkFoeUnit(key, lv, i){
  const e = mkEnemy(key, lv);
  return Object.assign(e, { uid:'f'+i, ally:false, st:{}, bf:[], state:null, used:{}, dead:false, guard:false, known:false });
}
const alive = list => list.filter(u => !u.dead);

/* ---------- effective stats ---------- */
function eff(u, stat){
  let v = u[stat];
  u.bf.forEach(b => { if(b.stat===stat) v *= b.m; });
  if(u.state){
    if(u.state.id==='awakened' && stat!=='hp') v *= 1.25;
    if(u.state.id==='manifest' && (stat==='atk'||stat==='mag'||stat==='def')) v *= 1.3;
  }
  if(stat==='spd' && u.st.slow) v *= .6;
  return v;
}
function evaOf(u){
  let m = 1; u.bf.forEach(b => { if(b.stat==='eva') m *= b.m; });
  if(u.state && u.state.id==='manifest') m *= 1.3;
  return clamp((0.04 + eff(u,'spd')*0.003 + (u.evaB||0)) * m, 0, .6);
}
const mpCost = (u,s) => Math.round(s.mp * ((u.state && u.state.id==='awakened') ? .5 : 1));

/* ---------- log ---------- */
function blog(t, cls){ B.log.push({t, cls:cls||''}); if(B.log.length>60) B.log.shift(); }

/* ---------- start ---------- */
/* Foes scale with how many fight for you: baseline is four. Each extra fighter adds ENEMY_PER_EXTRA to HP, and a smaller share to damage;
   the passive Ghost Healer counts as half. Bosses get a little more. Rewards rise a bit too, so fights stay worth it. Skipped in sandbox fights (no rewards). */
const ENEMY_PER_EXTRA = {hp:.32, atk:.10, boss:.12, xp:.15};
function partyWeight(){ return B.allies.reduce((a,u) => a + (isCompanion(u.id) ? .5 : 1), 0); }
function scaleForParty(){
  if(!B.spec.rewards) return;
  const extra = Math.max(0, partyWeight() - 4); if(!extra) return;
  B.foes.forEach(f => {
    const hpm = 1 + extra*(ENEMY_PER_EXTRA.hp + (f.boss ? ENEMY_PER_EXTRA.boss : 0)), am = 1 + extra*ENEMY_PER_EXTRA.atk;
    f.hp = f.mhp = Math.round(f.mhp*hpm); f.atk = Math.round(f.atk*am); f.mag = Math.round(f.mag*am);
    f.xp = Math.round(f.xp*(1 + extra*ENEMY_PER_EXTRA.xp)); f.gold = Math.round(f.gold*(1 + extra*ENEMY_PER_EXTRA.xp));
  });
  B.scaled = extra;
}
function startBattle(spec){
  const allyIds = (spec.allies || G.active.concat(G.party.filter(isCompanion), presentGuests().filter(id => !G.active.includes(id)))).filter(id => !isDisabled(id));
  B = { allies:allyIds.map(id => mkAlly(id, !!spec.rewards)), foes:spec.foes.map((f,i)=>mkFoeUnit(f.key,f.lv,i)), queue:[], cur:null, log:[], over:null,
        round:0, ui:{mode:'menu'}, spec, rewards:null };
  scaleForParty();
  if(spec.rewards && typeof corrAt==='function' && corrAt(G.loc) > 0){ B.corr = corrAt(G.loc); const m = corrFoeMult(G.loc); B.foes.forEach(f => { f.hp = f.mhp = Math.round(f.mhp*m); f.atk = Math.round(f.atk*m); f.mag = Math.round(f.mag*m); }); blog('☠️ The air is thick with corruption ('+B.corr+'%): foes are stronger and healing is weaker.','sys'); }
  blog('Battle begins!','sys');
  if(spec.seal) sealInit();
  if(spec.opening) spec.opening();
  if(spec.rewards && !B.foes.some(f => f.boss) && typeof banterLines==='function' && Math.random() < .3){ const q = pickBanter('battle'); if(q) q.forEach(l => blog(l.replace('💬 ',''),'sys')); else if(Math.random()<.5) blog(AR(BATTLE_QUIPS),'sys'); }
  advance();
}

/* ---------- turn flow ---------- */
function buildQueue(){
  const all = alive(B.allies).concat(alive(B.foes));
  B.queue = all.sort((a,b) => (eff(b,'spd') + Math.random()) - (eff(a,'spd') + Math.random()));
}
function checkEnd(){
  if(!alive(B.foes).length){ B.over='win'; finishWin(); return true; }
  if(!alive(B.allies).length){ B.over='lose'; blog('The party has fallen...','bad'); persistBattle(); save(); return true; }
  return false;
}
function advance(){
  let guard = 400;
  while(guard-- > 0){
    if(checkEnd()) return;
    if(!B.queue.length){ B.round++; buildQueue(); blog('— Round '+B.round+' —','sys'); if(B.seal) sealRound(); }
    const u = B.queue.shift(); if(u.dead) continue;
    B.cur = u;
    // start of turn
    if(u.st.burn){ const d = Math.max(1, Math.round(u.mhp*.06)); hurt(u,d,true); blog(u.name+' burns for '+d+'.','bad'); if(u.dead){ continue; } }
    if(u.st.regen){ const h = Math.round(u.mhp*u.st.regen.v); u.hp = Math.min(u.mhp, u.hp+h); blog(u.name+' regenerates '+h+'.','good'); }
    if(u.st.bind || u.st.charm){ blog(u.name+(u.st.bind?' is bound and cannot move.':' is charmed and loses the turn.')); endTurn(u); continue; }
    if(u.ally && isCompanion(u.id)){ companionAct(u); endTurn(u); continue; }   // companions act by themselves
    if(u.ally){ B.ui = {mode:'menu'}; return; }   // wait for the player
    foeAct(u); endTurn(u);
  }
}
function endTurn(u){
  ['burn','slow','bind','charm','silence','crit'].forEach(k => { if(u.st[k] && --u.st[k].d <= 0) delete u.st[k]; });
  ['shield','regen','oath'].forEach(k => { if(u.st[k] && --u.st[k].d <= 0) delete u.st[k]; });
  u.bf = u.bf.filter(b => --b.d > 0);
  if(u.state && --u.state.d <= 0){ blog(u.name+'\'s '+(u.state.id==='awakened'?'Awakening':'Manifestation')+' fades.'); u.state = null; }
  u.guard = false;
}

/* ---------- damage ---------- */
/* ---------- Seal fight: Jade Mode and Devon Mode ----------
   While the Awakened Spirit Core corrupts the ancient seal, the party holds it together. A seal bar (0-100) decays each round.
   Jade Mode (guard the formation): Jade hits +25%, the seal decays slowly; Devon's magic is held back (-15%).
   Devon Mode (channel the seal): Devon's magic/healing +30%, the seal repairs each round; Jade hits at -20%.
   At 0 the seal collapses: every ally is hurt each round until it is restored. Enemy area attacks batter the seal. */
function sealInit(){ B.seal = {hp:100, mode:'jade', collapsed:false}; blog('🔰 The ancient seal is failing: hold it together. Choose Jade Mode (guard) or Devon Mode (channel) at any turn.','sys'); }
function setSealMode(m){ if(!B || !B.seal || B.over) return; B.seal.mode = m; blog('🔰 '+(m==='jade'?'Jade Mode: Jade guards the formation.':'Devon Mode: Devon channels the seal.'),'sys'); render(); }
function sealRound(){
  const S = B.seal; if(!S) return;
  const boss = B.foes.find(f => f.boss), late = boss && (boss.phaseIdx||0) >= 1;
  if(S.mode==='devon'){ const g = isRecruited('devon') ? 16 : 6; S.hp = Math.min(100, S.hp + g - (late?6:0)); }
  else S.hp = Math.max(0, S.hp - (late ? 8 : 4));
  if(S.hp<=0 && !S.collapsed){ S.collapsed = true; blog('💥 The seal collapses! Corruption floods the chamber.','bad'); }
  else if(S.hp>=30 && S.collapsed){ S.collapsed = false; blog('The seal holds again.','good'); }
  if(S.collapsed) alive(B.allies).forEach(a => { const d = Math.max(1, Math.round(a.mhp*.1)); hurt(a, d, true); blog('  '+a.name+' is scorched by the collapse: '+d+'.','bad'); });
  else blog('🔰 Seal '+S.hp+'%','sys');
}
function sealHit(n){ if(B && B.seal){ B.seal.hp = Math.max(0, B.seal.hp - n); } }
function checkPhase(t){
  if(!t.phases || t.dead || t.ally) return;
  const next = t.phases[t.phaseIdx||0]; if(!next || t.hp/t.mhp > next.at) return;
  t.phaseIdx = (t.phaseIdx||0) + 1;
  blog('— '+next.msg+' —','sys');
  if(next.moves) t.moves = next.moves;
  if(next.atk) { t.atk = Math.round(t.atk*next.atk); t.mag = Math.round(t.mag*next.atk); }
  if(next.shield) t.st.shield = {v:Math.round(t.mhp*next.shield), d:6};
  if(next.heal) t.hp = Math.min(t.mhp, t.hp + Math.round(t.mhp*next.heal));
  if(next.summon){ const key = next.summon; const u = mkFoeUnit(key, Math.max(1, Math.round(avgPartyLv()-2)), B.foes.length); B.foes.push(u); B.queue.push(u); blog('  '+u.name+' appears.','foe'); }
}
function hurt(t, d, ignoreShield){
  if(!ignoreShield && t.st.shield){ const a = Math.min(t.st.shield.v, d); t.st.shield.v -= a; d -= a; if(a>0) blog('  (barrier absorbs '+a+')'); if(t.st.shield.v<=0) delete t.st.shield; }
  if(t.guard) d = Math.round(d*.5);
  t.hp = Math.max(0, t.hp - d);
  if(t.hp>0) checkPhase(t);
  if(t.hp<=0){ t.dead = true; if(t.traits && t.traits.includes('corrupt')) blog(t.name+' is freed from the corruption and collapses, alive.','good'); else blog(t.name+' falls!','bad'); }
  return d;
}
function strike(src, tgt, s, opts){
  opts = opts || {};
  const magic = s.kind==='magic', stat = magic?'mag':'atk';
  let atkv = eff(src, stat);
  if(s.pair){ const j = B.allies.find(a => a.id==='jade' && !a.dead); if(j) atkv += .6*eff(j, stat); }
  let raw = atkv * (s.pow||1) * (0.9 + Math.random()*.2) * (opts.decay||1);
  raw -= eff(tgt,'def') * (magic ? .35 : .6);
  let d = Math.max(1, Math.round(raw));
  if(B.seal && src.ally){ const md = B.seal.mode; if(src.id==='jade') d = Math.round(d*(md==='jade'?1.25:.8)); if(src.id==='devon') d = Math.round(d*(md==='devon'?1.3:.85)); }
  if(s.antiMagic && tgt.traits.includes('magic')) d = Math.round(d*s.antiMagic);
  if(s.vsCorrupt && tgt.traits.includes('corrupt')) d = Math.round(d*s.vsCorrupt);
  if(tgt.onlyBy && src.id!==tgt.onlyBy) d = Math.max(1, Math.round(d*(tgt.offMult||.2)));   // e.g. the Shadow Crown only truly yields to Roc's own blade
  let crit = false;
  if(s.crit || src.st.crit || Math.random() < .08 + (src.critB||0)){ crit = true; d = Math.round(d*1.6); }
  if(!s.pair && !opts.noEvade && Math.random() < evaOf(tgt)){ blog(tgt.name+' evades '+src.name+'\'s '+s.n+'!'); return 0; }
  s.landed = true;
  const dealt = hurt(tgt, d);
  if(s.purify && tgt.dead && tgt.traits.includes('corrupt')){ tgt.xp = Math.round(tgt.xp*1.3); blog('  ✨ '+tgt.name+' is purified (+30% XP).','good'); }
  blog(src.name+' uses '+s.n+' on '+tgt.name+': '+dealt+(crit?' CRIT!':''), src.ally?'':'foe');
  return dealt;
}

/* ---------- effects ---------- */
function applyFx(src, tgt, fx){
  switch(fx.k){
    case 'burn': case 'slow': case 'bind': case 'charm': case 'silence':
      if(tgt.boss && (fx.k==='bind'||fx.k==='charm') && Math.random()<.5){ blog('  '+tgt.name+' resists!'); return; }
      tgt.st[fx.k] = {d:fx.d||2}; blog('  '+tgt.name+' is '+({burn:'burning',slow:'slowed',bind:'bound',charm:'charmed',silence:'silenced'})[fx.k]+'.'); break;
    case 'buff': tgt.bf.push({stat:fx.stat,m:fx.m,d:(fx.d||3)+1}); blog('  '+tgt.name+' '+fx.stat.toUpperCase()+(fx.m>=1?' up':' down')+'.'); break;
    case 'shield': tgt.st.shield = {v:Math.round(tgt.mhp*fx.v), d:(fx.d||3)+1}; blog('  '+tgt.name+' gains a barrier.'); break;
    case 'mp': { const m = Math.min(tgt.mmp - tgt.mp, Math.round(tgt.mmp*(fx.v||.15))); tgt.mp += m; if(m>0) blog('  '+tgt.name+' regains '+m+' MP.','good'); break; }
    case 'oath': tgt.st.oath = {d:(fx.d||3)+1}; blog('  '+tgt.name+' swears to stand between the party and harm: foes will target '+tgt.name+' and are struck back.','good'); break;
    case 'regen': tgt.st.regen = {v:fx.v, d:(fx.d||3)+1}; break;
    case 'crit': tgt.st.crit = {d:(fx.d||2)+1}; blog('  '+tgt.name+' sees the openings (crits).'); break;
    case 'cleanse': ['burn','slow','bind','charm','silence'].forEach(k => delete tgt.st[k]); blog('  '+tgt.name+' is cleansed.'); break;
    case 'analyze': { const f = tgt.ally ? alive(B.foes)[0] : tgt; if(f){ f.known = true; blog('  Analysed '+f.name+': HP '+f.hp+'/'+f.mhp+', DEF '+f.def+(f.traits.includes('magic')?', magical':'')+'.'); } break; }
    case 'revive': if(tgt.dead){ tgt.dead = false; tgt.hp = Math.round(tgt.mhp*.4); blog('  '+tgt.name+' is revived!','good'); } break;
    case 'state': tgt.state = {id:fx.id, d:(fx.d||3)+1}; blog('  '+tgt.name+(fx.id==='awakened'?' awakens with golden blood!':' manifests the dragon!'),'good'); break;
  }
}
const FOE_FX = ['burn','slow','bind','charm','silence'];

/* ---------- player actions ---------- */
function skillList(u){
  const list = [];
  skillsOf(u.id).forEach(s => { if(s.ok){
    const noJade = s.pair && !B.allies.some(a => a.id==='jade' && !a.dead && a.id!==u.id);
    const cost = mpCost(u,s);
    list.push(Object.assign({}, s, { cost, usable: u.mp>=cost && !(s.once && u.used[s.id]) && !noJade,
      note: noJade ? 'needs Jade' : (s.once && u.used[s.id]) ? 'used' : u.mp<cost ? 'low MP' : '' }));
  }});
  return list;
}
function targetsFor(s){
  if(s.tgt==='foe'||s.tgt==='chain') return alive(B.foes);
  if(s.tgt==='ally') return alive(B.allies);
  if(s.tgt==='allyDown') return B.allies.filter(a=>a.dead);
  return [];
}
function playerAct(kind, sid, tuid){
  if(B.over) return;
  const u = B.cur; if(!u || !u.ally) return;
  if(kind==='guard'){ u.guard = true; u.mp = Math.min(u.mmp, u.mp+4); blog(u.name+' guards (+4 MP).'); endTurn(u); u.guard = true; advance(); return; }
  if(kind==='item'){ if(!battleUseItem(u, sid, [].concat(B.allies).find(x => x.uid===tuid))) return; endTurn(u); advance(); return; }
  let s;
  if(kind==='attack') s = { id:'attack', n:'Attack', kind:'phys', tgt:'foe', pow:1, mp:0 };
  else { s = skillList(u).find(x => x.id===sid); if(!s || !s.usable) return; }
  const t = [].concat(B.foes, B.allies).find(x => x.uid===tuid);
  if(['foe','chain','ally','allyDown'].includes(s.tgt) && !t) return;
  u.mp -= (s.cost!==undefined ? s.cost : s.mp);
  if(s.once) u.used[s.id] = true;
  resolve(u, s, t);
  endTurn(u);
  advance();
}
/* A companion (the Ghost Healer) acts passively: revive > heal the weakest > cleanse/shield now and then > a light attack. Uncontrollable. */
function companionAct(u){
  const skills = skillList(u).filter(s => s.usable), allies = alive(B.allies), foes = alive(B.foes);
  const spend = s => { u.mp -= (s.cost!==undefined ? s.cost : s.mp); if(s.once) u.used[s.id] = true; };
  const down = B.allies.find(a => a.dead && a.id!==u.id), rev = skills.find(s => s.tgt==='allyDown');
  if(down && rev){ spend(rev); return resolve(u, rev, down); }
  const weak = allies.slice().sort((a,b) => a.hp/a.mhp - b.hp/b.mhp)[0];
  const sick = allies.some(a => a.st.burn || a.st.slow || a.st.bind || a.st.silence || a.st.charm);
  const avgLow = allies.reduce((x,a) => x + a.hp/a.mhp, 0)/allies.length < .75;
  const one = skills.filter(s => s.kind==='heal' && s.tgt==='ally' && !(s.fx||[]).some(f => f.k==='revive')).sort((a,b) => (b.pow||0)-(a.pow||0))[0];
  const group = skills.find(s => s.kind==='heal' && s.tgt==='allies');
  if(weak && weak.hp/weak.mhp < .55 && one){ spend(one); return resolve(u, one, weak); }
  if((sick || avgLow) && group){ spend(group); return resolve(u, group, null); }
  const veil = skills.find(s => s.id==='veil_of_dawn');
  if(veil && B.round%3===1){ spend(veil); return resolve(u, veil, null); }
  if(weak && weak.hp/weak.mhp < .85 && one){ spend(one); return resolve(u, one, weak); }
  if(foes.length){ const t = foes.slice().sort((a,b) => a.hp-b.hp)[0]; return resolve(u, {id:'attack', n:'Quiet Strike', kind:'phys', tgt:'foe', pow:1, mp:0}, t); }
}
function resolve(u, s, t){
  const hit = s.kind==='phys' || s.kind==='magic';
  let foesHit = [], alliesHit = [];
  if(s.tgt==='foe') foesHit = [t];
  else if(s.tgt==='foes') foesHit = alive(B.foes);
  else if(s.tgt==='chain'){ const others = alive(B.foes).filter(x => x!==t).sort(() => Math.random()-.5).slice(0,2); foesHit = [t].concat(others); }
  else if(s.tgt==='ally' || s.tgt==='allyDown') alliesHit = [t];
  else if(s.tgt==='allies') alliesHit = alive(B.allies);
  else if(s.tgt==='self') alliesHit = [u];
  if(hit){
    foesHit.forEach((f,i) => { strike(u, f, s, {decay:Math.pow(.8,i)}); });
  } else if(s.kind==='heal'){
    alliesHit.forEach(a => { if(a.dead && !(s.fx||[]).some(f=>f.k==='revive')) return;
      const h = Math.round((eff(u,'mag')*(s.pow||1)*1.2 + a.mhp*.05) * (0.95+Math.random()*.1) * (B.corr ? corrHealMult(G.loc) : 1) * (u.id==='sky' && typeof skyHealMult==='function' ? skyHealMult() : 1));
      if(!a.dead){ a.hp = Math.min(a.mhp, a.hp+h); blog(u.name+' uses '+s.n+' on '+a.name+': +'+h+' HP.','good'); }
      else blog(u.name+' uses '+s.n+'.','good'); });
  } else blog(u.name+' uses '+s.n+'.');
  // status effects
  (s.fx||[]).forEach(fx => {
    if(FOE_FX.includes(fx.k)){
      (fx.all ? alive(B.foes) : foesHit.filter(f=>!f.dead)).forEach(f => applyFx(u, f, fx));
    } else if(fx.k==='analyze'){ applyFx(u, foesHit[0]||u, fx); }
    else (fx.self ? [u] : foesHit.length ? foesHit.filter(f=>!f.dead) : alliesHit).forEach(x => applyFx(u, x, fx));
  });
}

/* ---------- foe AI ---------- */
function foeAct(f){
  const targets = alive(B.allies); if(!targets.length) return;
  let mv = AR(f.moves);
  if(f.st.silence && mv.spell) mv = f.moves.find(m => !m.spell) || f.moves[0];
  const s = { n:mv.n, kind: mv.spell ? 'magic' : 'phys', pow:mv.pow, fx:mv.fx };
  if(mv.all){   // area attack: hits every ally at reduced power, ignores the oath
    blog(f.name+' unleashes '+mv.n+'!','foe'); sealHit(6);
    targets.slice().forEach(a => { if(a.dead) return; const sa = Object.assign({}, s, {pow:(mv.pow||1)*.7}); const d = strike(f, a, sa); if(d>0) (mv.fx||[]).forEach(fx => { if(!a.dead && FOE_FX.includes(fx.k)) applyFx(f, a, fx); }); });
    return;
  }
  const oathBearer = targets.find(a => a.st.oath);
  const bossIgnores = f.boss && oathBearer && Math.random() < .35;   // bosses sometimes see past the oath
  if(bossIgnores) blog('  '+f.name+' ignores the oath and strikes elsewhere.','foe');
  const t = (oathBearer && !bossIgnores) ? oathBearer : AR(targets);   // Protective Oath draws attacks
  const dealt = strike(f, t, s);
  if(dealt>0){
    if(mv.steal && f.stolen!==true){ const g = Math.min(G.gold, 8); if(B.spec.rewards){ G.gold -= g; } f.stolen = true; blog('  '+f.name+' lifts '+g+' gold!','bad'); }
    (mv.fx||[]).forEach(fx => { if(!t.dead && FOE_FX.includes(fx.k)) applyFx(f, t, fx); });
  }
  if(s.landed){
    if(t.st.oath && !t.dead && !f.dead){      // the oath-bearer strikes back
      const c = Math.max(1, Math.round(eff(t,'atk')*.6 - eff(f,'def')*.35));
      f.hp = Math.max(0, f.hp - c); blog('  '+t.name+' strikes back at '+f.name+': '+c+'.','good'); if(f.hp<=0){ f.dead = true; blog(f.name+' falls!','bad'); }
    }
  }
}

/* ---------- rewards ---------- */
function finishWin(){
  const foes = B.foes, spec = B.spec;
  let xp = 0, gold = 0; const drops = [];
  if(spec.rewards && typeof corrAdd==='function'){ const n = foes.filter(f => f.traits.includes('corrupt')).length; if(n) corrAdd(G.loc, -2*n); }
  foes.forEach(f => { xp += f.xp; gold += f.gold;
    f.drops.forEach(d => { if(Math.random()<d.chance) drops.push({id:d.id,qty:1}); });
    G.bestiary[f.key] = (G.bestiary[f.key]||0)+1; });
  const bossKey = (foes.find(f=>f.boss)||{}).key;
  const first = spec.firstClear;
  if(bossKey) rollLoot(LOOT[bossKey], first).forEach(d => drops.push(d));
  B.rewards = { xp, gold, drops, msgs:[], real:!!spec.rewards };
  blog('Victory!','good');
  if(!spec.rewards) return;
  persistBattle();
  const act = G.active, bench = G.party.filter(id => !act.includes(id));
  B.rewards.msgs = gainXp(xp, act).concat(gainXp(Math.round(xp*.5), bench));
  act.forEach(id => { const m = addBond(id, bossKey ? 8 : 3); if(m) B.rewards.msgs.push(m); });
  G.gold += gold; addItems(drops);
  if(typeof onFoesDefeated==='function') B.rewards.msgs = B.rewards.msgs.concat(onFoesDefeated(foes));   // quests / bounties / missions
  if(spec.onWin) B.rewards.msgs = B.rewards.msgs.concat(spec.onWin() || []);
  save();
}
