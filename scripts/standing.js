/* =====================================================================
   TRIBUTE — STANDING AND JUDGMENTS
   Not one universal approval score: each person or faction is judged on what matters to THEM, and one decision of Jade's can move several of them
   differently (a villager's confidence, a ranger's trust, a king's faith in her judgment). Standing here is separate from the warmth of a bond
   (Bonds tab: Greyson as a brother, Adrian as family): it is about trust, respect, confidence and reputation.
   - SUBJECTS: who is judging (people and factions), what they judge her on (axis kind), where they start, when they appear.
   - STAND_BEATS: for a chapter, the shifts that follow from how that chapter ends. A shift may be conditional (it reads what you actually did: whether you
     listened and investigated first, whether you asked the party), delayed (it lands once the evidence is in, a few chapters later) or temporary (it fades).
   - The result is shown as a Judgment: "Mourning Hart: Rin trust +2, Sky trust +1, frontier confidence -1 (for now), Greyson +1 (pending evidence)".
   - No one's affection swings wildly: Devon's and Greyson's lines move a point or two, as confidence or concern, never as a break.
   Values run -10..+20 and map to six words per axis kind. State: G.stand = {subject: n}, G.standLater = [pending], G.standLog = [judgments], G.standDone = {ch:true}.
   All numbers and wordings are first-pass. Beats for chapters not yet built (156+) are placed from the author's Arc VI roadmap and fire when those chapters complete.
   ===================================================================== */
const STAND_WORDS = {
  trust:['Distrustful','Wary','Neutral','Trusting','Loyal','Devoted'],
  respect:['Dismissive','Doubtful','Neutral','Respectful','Admiring','Deferential'],
  confidence:['Shaken','Uncertain','Steady','Confident','Assured','Unshakable'],
  reputation:['Opposed','Suspicious','Unknown','Favourable','Honoured','Revered'],
};
const STAND_MIN = -10, STAND_MAX = 20;
const standIdx = v => v <= -6 ? 0 : v <= -2 ? 1 : v <= 2 ? 2 : v <= 7 ? 3 : v <= 13 ? 4 : 5;
const SUBJECTS = {
  // people
  rin:{n:'Rin Kaede', icon:'🏹', kind:'trust', axis:'Trust in the royal party', start:-3, from:149, group:'people'},
  sky:{n:'Sky', icon:'💙', kind:'trust', axis:'Trust in how Jade treats the ambiguous', start:8, from:0, group:'people'},
  levi:{n:'Levi', icon:'🏹', kind:'respect', axis:'Respect for her judgment in the field', start:8, from:30, group:'people'},
  devon:{n:'Devon', icon:'🐉', kind:'confidence', axis:'Confidence in her risks (never his affection)', start:12, from:54, group:'people'},
  seraphina:{n:'Seraphina', icon:'🌸', kind:'respect', axis:'Voice: how far her counsel is taken', start:3, from:87, group:'people'},
  varyn:{n:'Varyn Noctis', icon:'🦅', kind:'respect', axis:'Respect: a Gold heir who questions the lies?', start:-4, from:135, group:'people'},
  adrian:{n:'Adrian Gold', icon:'📚', kind:'respect', axis:'Professional respect as a future Imperial Advisor', start:4, from:90, group:'people'},
  greyson:{n:'King Greyson', icon:'👑', kind:'confidence', axis:'Royal confidence in her judgment', start:8, from:0, group:'people'},
  // factions
  frontier:{n:'Frontier villages', icon:'🏘️', kind:'confidence', axis:'Confidence in the party', start:0, from:148, group:'factions'},
  spiritual:{n:'Spiritual communities', icon:'🕯️', kind:'reputation', axis:'Reputation among spirit-keepers', start:0, from:149, group:'factions'},
  officers:{n:'The Crown\'s officers', icon:'🛡️', kind:'confidence', axis:'Faith in her firmness', start:3, from:147, group:'factions'},
};
const standOf = id => (G.stand && G.stand[id] !== undefined) ? G.stand[id] : SUBJECTS[id].start;
const standWord = id => STAND_WORDS[SUBJECTS[id].kind][standIdx(standOf(id))];
const standOpen = id => G.ch >= SUBJECTS[id].from && (id!=='rin' || G.flags.rin_met) && (id!=='varyn' || G.flags.varyn_met);
function standAdd(id, v){ if(!SUBJECTS[id] || !v) return; if(!G.stand) G.stand = {}; G.stand[id] = clamp(standOf(id) + v, STAND_MIN, STAND_MAX); }
const sgn = v => (v > 0 ? '+' : '') + v;

/* Effect: {s, v, if?, later?:chapter (lands when that chapter completes), temp?:chapters (reverts after), why?} */
const STAND_BEATS = {
  135:{title:'The Seal Breaker', fx:[{s:'varyn', v:0}]},
  136:{title:'The Truth He Refuses to Bury', fx:[{s:'varyn', v:1, why:'Jade listened instead of defending the official history'}]},
  138:{title:'The First Choice', fx:[{s:'devon', v:-1, temp:2, why:'he thinks standing before the seal with Varyn was too dangerous (he stays beside her)'}]},
  140:{title:'The Keeper\'s Oath', fx:[{s:'varyn', v:1, why:'the official oath was proven altered'}]},
  144:{title:'Cael Ardyn\'s Inheritance', fx:[{s:'varyn', v:1, why:'Jade: inherited guilt does not remove responsibility, but it does not make heirs guilty'}]},
  145:{title:'The Confession of the First Betrayer', fx:[{s:'varyn', v:1, why:'they both blamed the wrong people'}]},
  147:{title:'The Fifteen Names', fx:[{s:'greyson', v:1, why:'he entrusts her with the investigation and the choice of companions'}, {s:'adrian', v:1}, {s:'officers', v:0}, {s:'seraphina', v:1, why:'she is given a seat at the council table'}]},
  150:{title:'Forest of Thorns', fx:[
    {s:'rin', v:2, if:() => !!G.flags.inv_rin_lore, why:'Jade listened to her field knowledge instead of overruling it'},
    {s:'rin', v:-1, if:() => !G.flags.inv_rin_lore, why:'the royal party pressed ahead without hearing her out'}]},
  152:{title:'What Remained', fx:[
    {s:'frontier', v:2, if:() => !!(G.flags.inv_widow_corruption && G.flags.inv_shrine_core), why:'Jade confirmed what the Widow was before destroying it: the villagers saw a competent party'},
    {s:'frontier', v:1, if:() => !(G.flags.inv_widow_corruption && G.flags.inv_shrine_core)},
    {s:'rin', v:-1, temp:3, why:'she senses part of the spirit was once something sacred, and grows more careful'}]},
  154:{title:'The Mourning Hart', fx:[
    {s:'sky', v:1, why:'Jade stopped the fight rather than strike down a being others call a monster'},
    {s:'rin', v:1}]},
  156:{title:'A Different Victory', fx:[   // planned: Jade negotiates protection of the valley instead of killing the Hart
    {s:'rin', v:2}, {s:'sky', v:1}, {s:'spiritual', v:2}, {s:'frontier', v:-1, temp:2, why:'frightened villagers wanted it killed'},
    {s:'greyson', v:1, later:162, why:'once the evidence is confirmed'},
    {s:'seraphina', v:1, if:() => !!(G.counsel && G.counsel.mourning_hart && G.counsel.mourning_hart.asked.seraphina), why:'Jade followed her diplomatic advice over the direct royal answer'}]},
  157:{title:'The Walking Ruin', fx:[{s:'frontier', v:2, why:'the valley is protected and the road is safe again'}]},
  161:{title:'Judgment', fx:[   // planned: the Hollow King is contained, not executed
    {s:'varyn', v:2, why:'Jade contained him instead of executing him'},
    {s:'sky', v:1, why:'she questioned the label an Evil was given'},
    {s:'officers', v:-1, temp:4, why:'some officers doubt her firmness'},
    {s:'levi', v:-1, temp:1, why:'he said: it has already killed people, and waiting has a cost'},
    {s:'devon', v:-1, temp:1, why:'he weighed the present victims more heavily and said so'}]},
  162:{title:'Three Evils, Three Truths', fx:[{s:'levi', v:2, why:'her caution proved justified'}, {s:'devon', v:1}]},
  163:{title:'The Fifteen Register', fx:[{s:'adrian', v:-1, temp:1, why:'he values institutional accuracy and resists the records being overturned'}]},
  164:{title:'The Missing Fourth Entry', fx:[{s:'adrian', v:2, why:'she proved the old records were flawed: he now treats her as a future Imperial Advisor, not just a field operative'}]},
  166:{title:'Fifteen Shadows', fx:[   // planned: the mandate changes from Destroy to Resolve and Greyson accepts it publicly
    {s:'varyn', v:3, why:'she changed the mandate from destroy to resolve'}, {s:'greyson', v:3, why:'he accepted the revision publicly: she now helps define policy, not only carry orders'},
    {s:'adrian', v:1}, {s:'officers', v:2}]},
};
function standBeat(n, quiet){
  const B = STAND_BEATS[n]; if(!B) return [];
  if(!G.standLog) G.standLog = []; if(!G.standLater) G.standLater = []; if(!G.standDone) G.standDone = {};
  if(G.standDone[n]) return []; G.standDone[n] = true;
  const shifts = [];
  B.fx.forEach(e => {
    if(!e.v || (e.if && !e.if())) return;
    if(e.later){ G.standLater.push({s:e.s, v:e.v, at:e.later, title:B.title}); shifts.push({s:e.s, v:e.v, state:'pending', why:e.why}); return; }
    standAdd(e.s, e.v);
    if(e.temp) G.standLater.push({s:e.s, v:-e.v, at:n+e.temp, title:B.title, revert:true});
    shifts.push({s:e.s, v:e.v, state:e.temp ? 'temp' : 'now', why:e.why});
  });
  if(shifts.length){ G.standLog.push({ch:n, day:G.day, title:B.title, shifts}); if(G.standLog.length > 60) G.standLog.shift();
    if(!quiet && typeof chronicle==='function') chronicle('Judgment, '+B.title+': '+standSummary(shifts)+'.', '⚖️'); }
  return quiet || !shifts.length ? [] : ['⚖️ '+B.title+': '+standSummary(shifts)];
}
function standSummary(shifts){ return shifts.filter(x => SUBJECTS[x.s]).map(x => SUBJECTS[x.s].n.split(' ')[0]+' '+SUBJECTS[x.s].kind+' '+sgn(x.v)+(x.state==='temp'?' (for now)':x.state==='pending'?' (pending the evidence)':'')).join(' · '); }
function standLater(n){   // pending shifts and fading effects that fall due when chapter n completes
  if(!G.standLater) return []; const due = G.standLater.filter(p => p.at <= n), msgs = [];
  G.standLater = G.standLater.filter(p => p.at > n);
  due.forEach(p => { standAdd(p.s, p.v); if(!p.revert) msgs.push('⚖️ '+p.title+' proved out: '+SUBJECTS[p.s].n.split(' ')[0]+' '+SUBJECTS[p.s].kind+' '+sgn(p.v)+'.'); });
  return msgs;
}
function standApplyChapter(n){ const m = standBeat(n, false).concat(standLater(n)); return m; }
function standCatchUp(){ if(!G || G.ch < 0) return; if(!G.standDone) G.standDone = {}; Object.keys(STAND_BEATS).map(Number).sort((a,b) => a-b).forEach(n => { if(n <= G.ch && !G.standDone[n]){ standBeat(n, true); standLater(n); } }); }
function standHeard(who){ const m = {sky:'sky', levi:'levi', devon:'devon', seraphina:'seraphina', rin:'rin'}[who]; if(m && standOpen(m)) standAdd(m, 1); }   // asking someone's view makes them feel heard
function rStanding(){
  const row = id => { const v = standOf(id), S = SUBJECTS[id], pct = Math.round(100*(v - STAND_MIN)/(STAND_MAX - STAND_MIN));
    return `<div class="ev"><div><b>${S.icon} ${S.n}</b> <span class="sm">· ${standWord(id)}</span><div class="sm">${S.axis}</div><div class="bar"><i style="width:${pct}%"></i></div></div></div>`; };
  const grp = g => Object.keys(SUBJECTS).filter(id => SUBJECTS[id].group===g && standOpen(id)).map(row).join('');
  const log = (G.standLog||[]).slice(-5).reverse().map(j => `<div class="ev"><div><b>⚖️ ${j.title}</b> <span class="sm">· Ch.${j.ch}</span>${j.shifts.filter(x => SUBJECTS[x.s]).map(x => `<div class="sm">${SUBJECTS[x.s].icon} ${SUBJECTS[x.s].n}: ${SUBJECTS[x.s].kind} ${sgn(x.v)}${x.state==='temp'?' (for now)':x.state==='pending'?' (pending the evidence)':''}${x.why?' · '+x.why:''}</div>`).join('')}</div></div>`).join('');
  const pend = (G.standLater||[]).filter(p => !p.revert).map(p => `<div class="sm">⏳ ${SUBJECTS[p.s].n}: ${sgn(p.v)} once the evidence is confirmed (${p.title})</div>`).join('');
  return `<div class="sm">What people think of the party, judged on what matters to each of them. A single decision moves several of them differently. This is separate from affection: it is trust, respect, confidence and reputation.</div><h4>People</h4>${grp('people')||'<div class="sm">Nobody yet.</div>'}<h4>Factions</h4>${grp('factions')||'<div class="sm">None yet.</div>'}${pend}<h4>Recent judgments</h4>${log||'<div class="sm">No judgments yet: they follow the chapters where Jade decides something.</div>'}`;
}
