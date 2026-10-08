/* =====================================================================
   TRIBUTE — CHAPTER LEVEL GATES (from Crimson Tide's chapter gate {type:'level', value, label})
   Some chapters stay locked until the party's AVERAGE level reaches a target. Party members have different levels, so the gate reads the
   mean level of the real party members (the passive companions and guests are not counted). Only milestone chapters are gated, the way
   Crimson Tide gates only its milestone chapter: battle chapters, each arc's opener, every tenth chapter from 60, and the opener of each
   Fifteen Evils hunt. A gated chapter shows its title with the reason it is locked. Chapters you have already completed are never locked.
   Target = chapter x GATE.early (before ch50) or x GATE.late. Tuned so that playing the story and doing some side content keeps up
   (story alone ends near 0.6 of the chapter number); change GATE.early/late to make it gentler or stricter. All numbers first-pass.
   ===================================================================== */
const GATE = {early:.6, late:.65, from:50};
const GATE_OPENERS = [43, 87, 104, 122, 147, 150, 153, 157];   // arc and hunt openers
function gateLv(){
  const ids = G.party.filter(id => !CHARACTERS[id].placeholder && !isCompanion(id));
  return ids.length ? Math.round(ids.reduce((a,id) => a + U(id).lv, 0)/ids.length) : 1;
}
const isGateChapter = n => n >= 10 && ((CHAPTERS[n] && CHAPTERS[n].battle) || GATE_OPENERS.includes(n) || (n >= 60 && n % 10 === 0));
function chapterGate(n){
  if(!isGateChapter(n)) return null;
  const lv = Math.max(1, Math.round(n * (n < GATE.from ? GATE.early : GATE.late)));
  return {lv, label:'Reach an average party level of '+lv+' to continue. Hunts, investigations, Skirmish and training all give XP.'};
}
function chapterLevelLock(n){   // '' when open
  if(!G || n <= G.ch) return '';
  const g = chapterGate(n); if(!g) return '';
  const now = gateLv();
  return now >= g.lv ? '' : '🔒 Average party level '+g.lv+' needed (now '+now+')';
}
