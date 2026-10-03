/* =====================================================================
   TRIBUTE — CHAPTER JOURNAL (Crimson-Tide-style sequential chapters +
   Aethon-style quest modal: read comic pages -> optional battle -> story XP)
   Chapters 0-30 have art (ch31 pending).
   Chapters 31+ will get titles once the next design batch arrives.
   ===================================================================== */
// Titles 0-30 come from the chapter design doc (chapters.js). 31+ are placeholders until the next batch.
const TITLES = [];
Object.keys(CANON_TITLES).forEach(i => TITLES[i] = CANON_TITLES[i]);
Object.keys(CHAPTER_DESIGN).forEach(i => TITLES[i] = CHAPTER_DESIGN[i].title);
const ART = {0:['pr1','pr2','pr3'],1:['c1_intro','c1a','c1b'],2:['c2a','c2b'],3:['c3a','c3b','c3c'],4:['c4a','c4b']};
for(let i=5;i<=17;i++) ART[i]=['c'+i];
for(let i=18;i<=30;i++) ART[i]=['ch'+i];   // converted from the uploaded PNGs

// Chapter battles (PLACEHOLDER encounters — replace with the real fights).
const BATTLES = {
  // Only fights confirmed by canon chapter text so far (placeholder foes/stats). Others to be added as chapters are converted.
  2:[{key:'training_dummy'},{key:'training_dummy'}],     // Mercenary Trial: combat tutorial (Jade + Chad + Sky as guests)
  3:[{key:'chad_trial'}],                                  // Swords and Palpitations: Jade vs Chad duel
  5:[{key:'booyeong_guard'},{key:'boss_booyeong'},{key:'booyeong_guard'}],   // The Ransom Trap: rescue Sky
};
const SOLO = { 2:['jade','chad','sky'], 3:['jade'], 5:['jade','chad'] };   // who fights (Sky is captive in ch5)
const CHAPTERS = [];
for(let i=0;i<=31;i++){
  CHAPTERS.push({ n:i, title: TITLES[i] || ('Chapter '+i+' (?)'), art: ART[i]||[],
    sxp: 80 + i*40,                         // story XP (tune)
    lv: Math.max(1, Math.round(i*0.9)+1),    // enemy level for this chapter's battle
    battle: BATTLES[i] || null });
}
const chapterAvailable = n => n <= G.ch + 1 && (!CH_LOC[n] || G.loc === CH_LOC[n] || n <= G.ch);
const chapterDone = n => n <= G.ch;

function avgPartyLv(){ return Math.round(G.party.reduce((a,id)=>a+U(id).lv,0)/G.party.length); }

function completeChapter(n){
  const msgs = [];
  if(G.ch >= n) return msgs;
  G.ch = n;
  const c = CHAPTERS[n];
  recruitsAtChapter(n).forEach(id => {
    if(G.guests[id]){ delete G.guests[id]; msgs.push('★ '+CHARACTERS[id].n+' joins the party permanently!'); }
    else if(recruit(id)){ U(id).lv = Math.max(U(id).lv, avgPartyLv()-1); msgs.push('★ '+CHARACTERS[id].n+' joins the party!'); }
  });
  Object.keys(GUEST_CH).filter(id => GUEST_CH[id]===n).forEach(id => {
    if(recruit(id)){ G.guests[id] = true; U(id).lv = Math.max(U(id).lv, avgPartyLv()-1); msgs.push('☆ '+CHARACTERS[id].n+' joins as a guest (temporary).'); }
  });
  (CH_FLAGS[n]||[]).forEach(f => { G.flags[f] = true; msgs.push('✦ Story event: '+(FLAG_LABEL[f]||f)+' unlocked'); });
  msgs.push('Story XP +'+c.sxp);
  gainXp(c.sxp, G.party).forEach(m => msgs.push(m));
  checkMissionOffers();   // King Greyson's next letters
  save();
  return msgs;
}
function battleSpecFor(n){
  const c = CHAPTERS[n];
  return { foes:c.battle.map(f => ({key:f.key, lv:c.lv})), allies:SOLO[n], rewards:true, firstClear:!chapterDone(n), chapter:n,
           onWin: () => { c.battle.forEach(f => { if(ENEMIES[f.key].boss) G.flags['boss_'+f.key] = true; }); return completeChapter(n); } };
}
// DEV: jump the save to "story at chapter n" (recruits, flags, levels)
function devSetChapter(n){
  G.ch = -1; G.read = {};
  for(let i=0;i<=n;i++){
    const before = G.ch; G.ch = i;
    recruitsAtChapter(i).forEach(id => { recruit(id); delete G.guests[id]; });
    Object.keys(GUEST_CH).filter(id => GUEST_CH[id]===i).forEach(id => { if(recruit(id)) G.guests[id] = true; });
    (CH_FLAGS[i]||[]).forEach(f => G.flags[f]=true);
  }
  G.ch = n; checkMissionOffers();
  const target = Math.max(1, Math.round(n*1.0));
  G.party.forEach(id => { U(id).lv = Math.max(U(id).lv, target); U(id).xp = 0; });
  save();
}
