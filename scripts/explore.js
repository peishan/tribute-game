/* =====================================================================
   TRIBUTE — EXPLORATION ABILITIES: Warrior's Insight (Jade) and Royal Spirit Sense (Devon)
   Each can be used once per in-game day and applies to your NEXT search, hunt or gathering run (arm it first), or to a puzzle.
   Warrior's Insight (Jade, from ch76): spots traps and hidden paths and reads battle formations.
     investigate: far fewer ambushes and the hidden path saves a day | hunt: foes start slowed (you read their formation)
     gather: far fewer ambushes
   Royal Spirit Sense (Devon, from ch76): detects magic, restores seals, speaks with spirits.
     investigate: reads the magic residue (+bonus XP, no ambush by magical foes) and steadies the area (−5% corruption)
     hunt: reveals the foes (analysed) | puzzle: reveals one true ring | purification point: +10 extra
   State: G.explore = {insightDay, senseDay, armed:{insight,sense}}
   ===================================================================== */
function expl(){ if(!G.explore) G.explore = {insightDay:-1, senseDay:-1, armed:{insight:false, sense:false}}; return G.explore; }
const canInsight = () => !!G.flags.warriors_insight && isRecruited('jade') && !isDisabled('jade');
const canSense = () => !!G.flags.royal_sense && isRecruited('devon') && !isDisabled('devon');
function armInsight(){ const e = expl(); if(!canInsight()) return []; if(e.insightDay===G.day) return ['Warrior\'s Insight is spent for today.']; e.insightDay = G.day; e.armed.insight = true;
  return ['⚔️ Jade narrows her eyes: she reads the ground, the traps and the lines of the old formation. (Warrior\'s Insight is ready for your next search.)']; }
function armSense(){ const e = expl(); if(!canSense()) return []; if(e.senseDay===G.day) return ['Royal Spirit Sense is spent for today.']; e.senseDay = G.day; e.armed.sense = true;
  return ['🔮 Devon closes his eyes and listens to the old magic. (Royal Spirit Sense is ready for your next search.)']; }
function takeInsight(){ const e = expl(); const v = e.armed.insight; e.armed.insight = false; return v; }
function takeSense(){ const e = expl(); const v = e.armed.sense; e.armed.sense = false; return v; }
function peekArmed(){ const e = expl(); return e.armed; }
function exploreBar(){
  if(!canInsight() && !canSense()) return '';
  const e = expl(), a = e.armed;
  const btn = (name, can, day, armed, fn, tip) => can ? `<button class="${armed?'pri':''}" ${(day===G.day&&!armed)?'disabled':''} onclick="act(${fn})">${armed?'✔ ':''}${name}</button>` : '';
  return `<div class="panel"><div class="sm">Exploration abilities (once a day each, used on your next search or hunt)</div><div class="row" style="margin-top:6px">${btn('⚔️ Warrior\'s Insight', canInsight(), e.insightDay, a.insight, 'armInsight')}${btn('🔮 Royal Spirit Sense', canSense(), e.senseDay, a.sense, 'armSense')}</div><div class="sm">${canInsight()?'Insight: fewer ambushes, a hidden path saves a day, foes read at the start of a hunt. ':''}${canSense()?'Sense: bonus XP, corruption eased, foes revealed, a puzzle ring revealed.':''}</div></div>`;
}
