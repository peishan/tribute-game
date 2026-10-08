/* =====================================================================
   TRIBUTE — JADE'S SALARY (King Greyson's stipend)
   Greyson allocated Jade a salary once she was named Princess of Tribute and his sworn sister (from ch99). It is paid on IN-GAME time, not real time:
   one payment every SALARY.days game days (a week), separate from the Rewards tab's daily login and AFK rewards. Unclaimed pay waits (up to SALARY.cap
   weeks; older weeks are forfeit) and can be claimed anywhere (the bracelet, or Adrian's office by pigeon), from the Missions tab.
   Weekly, not daily: travel takes several days a leg, so a daily wage would just be a number ticking; a weekly payday matches Adrian's weekly decisions.
   Change SALARY.days to 1 for daily. Amount grows with the party's level and with Greyson's standing. All numbers are first-pass.
   State: G.salary = { start, claimed, told }.
   ===================================================================== */
const SALARY = {fromCh:99, days:7, base:100, perLv:6, cap:4};
const salaryOpen = () => !!G && G.ch >= SALARY.fromCh;
function salaryState(){ if(!G.salary) G.salary = {start:G.day, claimed:0, told:0}; return G.salary; }
const salaryAmount = () => Math.round((SALARY.base + SALARY.perLv*avgPartyLv()) * (1 + .04*(typeof relTier==='function' ? relTier('greyson') : 0)));
function salaryWeeks(){   // unclaimed pay periods waiting
  if(!salaryOpen()) return 0;
  const s = salaryState(), elapsed = Math.floor((G.day - s.start)/SALARY.days);
  if(elapsed - s.claimed > SALARY.cap) s.claimed = elapsed - SALARY.cap;   // older weeks lapse
  return Math.max(0, elapsed - s.claimed);
}
const salaryNextIn = () => { const s = salaryState(); return SALARY.days - ((G.day - s.start) % SALARY.days); };
/* a short note from Greyson comes with each payment (first-pass wording; add lines freely). Arc lines join the pool once the story reaches that arc. */
const SALARY_NOTES = ['"Spend some of it on something that is not armour. That is an order."', '"The treasury grumbled. I told it you were worth every coin."', '"Eat properly. Sleep occasionally. Report when convenient."', '"Adrian says I overpay you. I say he underestimates how much trouble you save me."', '"A king\'s sister should not be seen in a patched cloak. Buy a new one."', '"Come home soon. The palace is too quiet without someone to argue with me."', '"Do not give it all to the villages again. Keep a little for yourself."'];
const SALARY_ARC_NOTES = [[104, ['"The west is far from my throne, so look after yourself twice as carefully."']], [122, ['"The court still talks about Valen. Let them. Be careful out there."']], [147, ['"Whatever you decide about the Evils, the crown will stand behind you."', '"Find them, understand them, then decide. I trust you with all three."']]];
const salaryNotePool = () => SALARY_NOTES.concat(...SALARY_ARC_NOTES.filter(([ch]) => G.ch >= ch).map(([,l]) => l));
function salaryNote(){ const pool = salaryNotePool(), n = pool[(salaryState().notes||0) % pool.length]; salaryState().notes = (salaryState().notes||0) + 1; salaryState().note = n; return n; }
function claimSalary(){
  const w = salaryWeeks(); if(!w) return ['No pay is waiting yet.'];
  const total = w*salaryAmount(); G.gold += total; salaryState().claimed += w; salaryState().told = 0;
  if(typeof chronicle==='function') chronicle('Collected '+w+' week'+(w>1?'s':'')+' of Greyson\'s stipend ('+total+'g).', '💰');
  return ['💰 King Greyson\'s stipend: +'+total+' gold for '+w+' week'+(w>1?'s':'')+'.', '✉️ A note from Greyson: '+salaryNote()];
}
function salaryTick(){   // called when days pass: tell the player once when new pay is waiting
  if(!salaryOpen()) return [];
  const w = salaryWeeks(), s = salaryState();
  if(w > s.told){ s.told = w; return ['💰 Greyson\'s stipend is waiting ('+w+' week'+(w>1?'s':'')+', '+w*salaryAmount()+'g). Collect it in Missions.']; }
  return [];
}
function rSalary(){
  if(!salaryOpen()) return '';
  const w = salaryWeeks();
  return `<div class="panel"><b>💰 King Greyson's stipend</b><div class="sm">Jade's salary as Princess of Tribute: ${salaryAmount()}g every ${SALARY.days===7?'week':SALARY.days+' days'} of game time, apart from the daily login rewards. ${w?'':'Next pay in '+salaryNextIn()+' day(s).'}</div>${w?`<button class="pri" onclick="act(claimSalary)">Collect ${w*salaryAmount()}g (${w} week${w>1?'s':''})</button>`:'<button disabled>Nothing to collect yet</button>'}<div class="sm" style="opacity:.6">Unclaimed pay keeps for ${SALARY.cap} weeks.</div>${salaryState().note?`<div class="sm" style="margin-top:4px"><i>Last note from Greyson: ${salaryState().note}</i></div>`:''}</div>`;
}
