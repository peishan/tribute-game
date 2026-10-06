/* =====================================================================
   TRIBUTE — OPTIONAL ARC "THE FALLEN PRINCE'S TRIAL" + GUARDIAN RAID
   Optional (never required by the main story). Story version (once):
     1. Investigate the Exile Border: the dark energy leaking there is Roc's.
     2. Phase 1: the party fights the Shadow of Roc. Roc cannot help ("this is the part of me I refused to face").
     3. Phase 2: Roc joins temporarily; only his own blows hurt the Shadow Crown ("use Roc to defeat himself").
     4. Purification (Jenika's medicine, Sky's recovery, Jade's spiritual bond, Devon's Dragon Pearl knowledge).
        Roc survives, reborn: the corruption turns into a Dark Dragon Aura.
   Afterwards: repeatable Guardian Raid (3 levels, 3 attempts per level per day) for crafting materials and exclusive gear.
   Final-war note (not built): if purified, Roc arrives in the final war with his dragon power; if not, weakened.
   State flags: roc_trial_p1, roc_trial_p2, roc_purified, roc_reborn, raid_1 / raid_2 / raid_3 (cleared), G.raid {day, att}
   ===================================================================== */
const RAID_ATTEMPTS = 3;
const RAID_LEVELS = [
  {n:1, key:'boss_shadow_roc', name:'Shadow of Roc', add:[], off:2, need:null,
   desc:'A dark knight in a broken version of Roc\'s royal armour: the regret he left behind.'},
  {n:2, key:'boss_shadow_ambition', name:'Shadow of Ambition', add:['shadow_clone','shadow_clone'], off:4, need:'raid_1',
   desc:'Stronger dark magic, shadow clones and curses.'},
  {n:3, key:'boss_forgotten_prince', name:'The Forgotten Prince', add:['shadow_clone','shadow_clone'], off:6, need:'raid_2',
   desc:'A possible future where Roc never accepted himself.'},
];
function trialStage(){
  if(!G.flags.inv_exile_trail) return 'investigate';
  if(!G.flags.roc_trial_p1) return 'phase1';
  if(!G.flags.roc_trial_p2) return 'phase2';
  if(!G.flags.roc_purified) return 'purify';
  return 'done';
}
function trialLv(off){ return Math.max(18, avgPartyLv() + off); }
function trialPhase1(){
  if(trialStage()!=='phase1') return [];
  startBattle({foes:[{key:'boss_shadow_roc', lv:trialLv(1)}], allies:G.active.filter(id => id!=='chad'), rewards:true, firstClear:!G.flags.roc_trial_p1,
    onWin:() => { G.flags.roc_trial_p1 = true; return ['🌑 The Shadow wavers. Roc, watching from the dark: "This is the part of me I refused to face."'].concat(checkSteps()); }});
  return 'battle';
}
function trialPhase2(){
  if(trialStage()!=='phase2') return [];
  const team = G.active.filter(id => id!=='chad').slice(0,3).concat(['chad']);   // Roc joins temporarily
  startBattle({foes:[{key:'boss_shadow_roc_p2', lv:trialLv(1)}], allies:team, rewards:true, firstClear:!G.flags.roc_trial_p2,
    onWin:() => { G.flags.roc_trial_p2 = true; return ['⚔️ Roc\'s own blade ends the Shadow Crown. The prince accepts responsibility. The Shadow disappears, but the corruption in him remains.'].concat(checkSteps()); }});
  return 'battle';
}
function purifyReady(){
  const need = ['jade','devon','sky'];
  return need.every(id => isRecruited(id) && !isDisabled(id));
}
function trialPurify(){
  if(trialStage()!=='purify') return [];
  if(!purifyReady()) return ['The purification needs Jade, Devon and Sky together.'];
  G.flags.roc_purified = true; G.flags.roc_reborn = true;
  addItems([{id:'dragon_crystal', qty:2}]);
  const msgs = ['✨ Jenika\'s medicine, Sky\'s qi, Jade\'s spiritual bond and Devon\'s knowledge of the Dragon Pearl work as one. The darkness in Roc turns, and does not break him.',
    '🐉 Roc Chadwick survives. His dark magic is changed: instead of corruption, a Dark Dragon Aura. Reborn state: Fallen Dragon Prince.',
    'Received 💎 Dragon Crystal ×2. Guardian Raid unlocked.'];
  return msgs.concat(checkSteps());
}
/* ---- Guardian Raid ---- */
function raidAttempts(n){ if(!G.raid || G.raid.day!==G.day) G.raid = {day:G.day, att:{}}; return RAID_ATTEMPTS - (G.raid.att[n]||0); }
function raidOpen(L){ return !!G.flags.roc_purified && (!L.need || !!G.flags[L.need]); }
function raidStart(n){
  const L = RAID_LEVELS.find(x => x.n===n); if(!L || !raidOpen(L) || raidAttempts(n)<=0) return [];
  G.raid.att[n] = (G.raid.att[n]||0) + 1;
  const lv = trialLv(L.off), foes = [{key:L.key, lv}].concat(L.add.map(k => ({key:k, lv:Math.max(1,lv-2)})));
  startBattle({foes, rewards:true, firstClear:!G.flags['raid_'+n], onWin:() => { const first = !G.flags['raid_'+n]; G.flags['raid_'+n] = true; return [first?'🏆 Guardian Raid level '+n+' cleared for the first time.':'Guardian Raid level '+n+' cleared.']; }});
  return 'battle';
}
