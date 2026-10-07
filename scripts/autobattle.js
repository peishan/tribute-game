/* =====================================================================
   TRIBUTE — AUTO BATTLE
   Unlocks once the story reaches AUTO_CH OR the average party level reaches AUTO_LV.
   Off in boss fights. Toggle in the battle screen; stops when the battle ends or you press Stop.
   AI: heal/tonic a weak ally -> area skill vs 3+ foes -> strongest affordable skill on the weakest foe -> attack.
   (AUTO_CH / AUTO_LV are PROVISIONAL.)
   ===================================================================== */
const AUTO_CH = 12, AUTO_LV = 10;
const autoUnlocked = () => G.ch >= AUTO_CH || avgPartyLv() >= AUTO_LV;
const autoReason = () => 'Auto-battle unlocks at chapter '+AUTO_CH+' or party level '+AUTO_LV;
const autoBlocked = () => B && B.foes.some(f => f.boss);

function autoStep(){
  if(!B || B.over || !B.cur || !B.cur.ally) return;
  const u = B.cur, foes = alive(B.foes), allies = alive(B.allies);
  if(!foes.length) return;
  const skills = skillList(u).filter(s => s.usable);
  const weak = allies.slice().sort((a,b) => a.hp/a.mhp - b.hp/b.mhp)[0];
  // 1. heal / tonic
  if(weak && weak.hp/weak.mhp < .4){
    const heal = skills.filter(s => s.kind==='heal' && ['ally','allies'].includes(s.tgt) && !(s.fx||[]).some(f => f.k==='revive')).sort((a,b) => (b.pow||0)-(a.pow||0))[0];
    if(heal) return playerAct('skill', heal.id, heal.tgt==='ally' ? weak.uid : null);
    if(weak.hp/weak.mhp < .3){ const it = battleItems().find(i => i.id==='herbal_tonic' || i.id==='moon_tonic'); if(it && (it.qty>0 || !B.spec.rewards)) return playerAct('item', it.id, weak.uid); }
  }
  const dmg = skills.filter(s => (s.kind==='phys' || s.kind==='magic') && ['foe','foes','chain'].includes(s.tgt) && !s.pair && !s.once);
  const target = foes.slice().sort((a,b) => a.hp - b.hp)[0];
  // 2. area skill vs groups
  if(foes.length >= 3){ const aoe = dmg.filter(s => s.tgt==='foes').sort((a,b) => (b.pow||0)-(a.pow||0))[0]; if(aoe && u.mp - aoe.cost >= 0) return playerAct('skill', aoe.id, null); }
  // 3. best single-target skill, keeping a little MP for heals
  const reserve = u.mp > u.mmp*.35;
  const best = dmg.filter(s => s.tgt!=='foes' && reserve).sort((a,b) => (b.pow||0)-(a.pow||0))[0];
  if(best) return playerAct('skill', best.id, target.uid);
  return playerAct('attack', null, target.uid);
}
let autoTimer = null;
function autoTick(){
  clearTimeout(autoTimer);
  if(!B || !B.auto || B.over || !B.cur || !B.cur.ally) return;
  autoTimer = setTimeout(() => { if(B && B.auto && !B.over && B.cur && B.cur.ally) autoStep(); }, 500);
}
function toggleAuto(){
  if(!B) return;
  if(!autoUnlocked()) return toast(autoReason());
  if(autoBlocked()) return toast('Auto-battle is off in boss fights');
  B.auto = !B.auto; render();
}
function autoButton(){
  if(!B || B.over) return '';
  if(!autoUnlocked()) return `<button disabled title="${autoReason()}">🔒 Auto</button>`;
  if(autoBlocked()) return `<button disabled title="Off in boss fights">⏸ Auto (boss)</button>`;
  return `<button class="${B.auto?'pri':''}" onclick="toggleAuto()">${B.auto?'⏹ Stop auto':'▶ Auto'}</button>`;
}
