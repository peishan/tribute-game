/* =====================================================================
   TRIBUTE — CHAPTER JOURNAL (Crimson-Tide-style sequential chapters +
   Aethon-style quest modal: read comic pages -> optional battle -> story XP)
   Chapters 0-30 have art (ch31 pending).
   Titles marked (?) are placeholders to correct.
   ===================================================================== */
const TITLES = ['Prologue — Tribute','Chapter 1 (?)','The Mercenary Trial','Three Blows','A Secret Mission','Unanswered Ties','Moonlit Confessions','Restless Desire','Unwanted Truths','Whispers and Jealousy','The Prophecy','Dreams and Doubts','Shadows at the Inn','Uninvited Encounter','Unwanted Choices','The Storm Within','The First Village','A Choice Beneath the Lanterns'];
const ART = {0:['pr1','pr2','pr3'],1:['c1a','c1b'],2:['c2a','c2b'],3:['c3a','c3b','c3c'],4:['c4a','c4b']};
for(let i=5;i<=17;i++) ART[i]=['c'+i];
for(let i=18;i<=30;i++) ART[i]=['ch'+i];   // converted from the uploaded PNGs

// Chapter battles (PLACEHOLDER encounters — replace with the real fights).
const BATTLES = {
  4:[{key:'road_bandit'},{key:'road_bandit'},{key:'boss_bandit_chief'}],
  6:[{key:'dock_pickpocket'},{key:'smuggler'}],
  8:[{key:'masked_assassin'},{key:'masked_assassin'}],
  10:[{key:'bandit_archer'},{key:'road_bandit'},{key:'bandit_archer'}],
  12:[{key:'boss_masked_leader'}],
  16:[{key:'dock_thug'},{key:'dock_thug'},{key:'smuggler'}],
  20:[{key:'imp'},{key:'shade_wraith'},{key:'imp'}],
  24:[{key:'masked_assassin'},{key:'boss_masked_leader'}],
  28:[{key:'shade_wraith'},{key:'shade_wraith'},{key:'imp'}],
  31:[{key:'imp'},{key:'boss_demon_warden'},{key:'imp'}],
};
const CHAPTERS = [];
for(let i=0;i<=31;i++){
  CHAPTERS.push({ n:i, title: TITLES[i] || ('Chapter '+i), art: ART[i]||[],
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
    if(recruit(id)){ U(id).lv = Math.max(U(id).lv, avgPartyLv()-1); msgs.push('★ '+CHARACTERS[id].n+' joins the party!'); }
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
  return { foes:c.battle.map(f => ({key:f.key, lv:c.lv})), rewards:true, firstClear:!chapterDone(n), chapter:n,
           onWin: () => completeChapter(n) };
}
// DEV: jump the save to "story at chapter n" (recruits, flags, levels)
function devSetChapter(n){
  G.ch = -1; G.read = {};
  for(let i=0;i<=n;i++){
    const before = G.ch; G.ch = i;
    recruitsAtChapter(i).forEach(id => { recruit(id); });
    (CH_FLAGS[i]||[]).forEach(f => G.flags[f]=true);
  }
  G.ch = n; checkMissionOffers();
  const target = Math.max(1, Math.round(n*1.0));
  G.party.forEach(id => { U(id).lv = Math.max(U(id).lv, target); U(id).xp = 0; });
  save();
}
