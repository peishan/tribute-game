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
function expl(){ if(!G.explore) G.explore = {insightDay:-1, senseDay:-1, armed:{insight:false, sense:false}}; if(G.explore.rumourDay===undefined){ G.explore.rumourDay = -1; G.explore.armed.rumour = false; } return G.explore; }
const canInsight = () => !!G.flags.warriors_insight && isRecruited('jade') && !isDisabled('jade');
const canSense = () => !!G.flags.royal_sense && isRecruited('devon') && !isDisabled('devon');
function armInsight(){ const e = expl(); if(!canInsight()) return []; if(e.insightDay===G.day) return ['Warrior\'s Insight is spent for today.']; e.insightDay = G.day; e.armed.insight = true;
  return ['⚔️ Jade narrows her eyes: she reads the ground, the traps and the lines of the old formation. (Warrior\'s Insight is ready for your next search.)']; }
function armSense(){ const e = expl(); if(!canSense()) return []; if(e.senseDay===G.day) return ['Royal Spirit Sense is spent for today.']; e.senseDay = G.day; e.armed.sense = true;
  return ['🔮 Devon closes his eyes and listens to the old magic. (Royal Spirit Sense is ready for your next search.)']; }
/* Sally's field abilities (from ch436, when she rejoins): Rumour Network (once a day, arm it for your next search: one extra clue from taverns, musicians and servants)
   and Musician's Ear (passive while she is in the travelling party: she hears the false note in testimony, a little bonus XP on every clue). */
const sallyHere = () => !!G.flags.sally_rejoins && isRecruited('sally') && !isDisabled('sally') && !(typeof isAway==='function' && isAway('sally'));
const canRumour = () => sallyHere();
function armRumour(){ const e = expl(); if(!canRumour()) return []; if(e.rumourDay===G.day) return ['The Rumour Network is spent for today.']; e.rumourDay = G.day; e.armed.rumour = true;
  return ['🌹 Sally sends word through the taverns, the musicians and the servants\' halls. (Rumour Network is ready for your next search.)']; }
function takeRumour(){ const e = expl(); const v = e.armed.rumour; e.armed.rumour = false; return v; }
const musiciansEar = () => sallyHere() ? 200 + avgPartyLv()*8 : 0;
function takeInsight(){ const e = expl(); const v = e.armed.insight; e.armed.insight = false; return v; }
function takeSense(){ const e = expl(); const v = e.armed.sense; e.armed.sense = false; return v; }
function peekArmed(){ const e = expl(); return e.armed; }
function exploreBar(){
  if(!canInsight() && !canSense() && !canRumour() && !(typeof canAuthority==='function' && canAuthority())) return '';
  const e = expl(), a = e.armed;
  const btn = (name, can, day, armed, fn, tip) => can ? `<button class="${armed?'pri':''}" ${(day===G.day&&!armed)?'disabled':''} onclick="act(${fn})">${armed?'✔ ':''}${name}</button>` : '';
  return `<div class="panel"><div class="sm">Exploration abilities (once a day each, used on your next search or hunt)</div><div class="row" style="margin-top:6px">${btn('⚔️ Warrior\'s Insight', canInsight(), e.insightDay, a.insight, 'armInsight')}${btn('🔮 Royal Spirit Sense', canSense(), e.senseDay, a.sense, 'armSense')}${btn('🌹 Rumour Network', canRumour(), e.rumourDay, a.rumour, 'armRumour')}${typeof canAuthority==='function' && canAuthority() ? `<button class="${a.authority?'pri':''}" ${(!authorityLeft()&&!a.authority)?'disabled':''} onclick="act(armAuthority)">${a.authority?'✔ ':''}⚜️ ${earnedAuthority()?'Earned Authority':'Royal Authority'}</button>` : ''}</div><div class="sm">${canInsight()?'Insight: fewer ambushes, a hidden path saves a day, foes read at the start of a hunt. ':''}${canSense()?'Sense: bonus XP, corruption eased, foes revealed, a puzzle ring revealed. ':''}${canRumour()?'Rumour Network: one extra clue on your next search. Musician\'s Ear (passive): bonus XP on every clue. ':''}${typeof canAuthority==='function' && canAuthority()?'Royal Authority (once per place): Aster opens records, stores and officials in his own name for one extra clue, but commanded cooperation costs Local Trust there; Earned Authority has no cost.':''}</div></div>`;
}
