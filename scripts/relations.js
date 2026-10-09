/* =====================================================================
   TRIBUTE — BONDS AND RELATIONSHIPS
   One screen for everyone Jade is close to. Two kinds:
   - Companions: the party's bonds (existing bond points and bond skills, shown here read-only).
   - Allies and family (new): a standing from 0 to 200 with its own ladder of six tiers, daily gestures (letter, gift, visit, counsel),
     and standing favours that unlock by tier and give small, real benefits (cheaper travel, more gold/XP/renown, more trust with Adrian).
   Standings can also move with the story: add rows to CH_REL below (applied when the chapter completes) or call relAdd(id, n).
   State: G.rel = { allyId: standing }.  Ladders and starting values are the author's: Greyson 100 (sibling-like), King Chadstone 50
   (admiration and respect, father-in-law), Adrian Gold 60 (Jade's brother). Add rows to RELATIONS to extend (parents, Dragonvale court...).
   ===================================================================== */
const REL_AT = [0,20,40,70,110,160], REL_MAX = 200;   // standing needed for tier 0..5
const REL_LADDER = {
  kin:     ['Allies','Friends','Trusted','Close as kin','Sworn siblings','Heart and blade'],
  respect: ['Acquainted','Courteous','Respected','Admired','Honoured kin','Beloved daughter'],
  family:  ['Reunited','Easy together','Trusted','Close','Inseparable','Heart of the house'],
};
const RELATIONS = [
  {id:'greyson', n:'King Greyson', icon:'👑', ladder:'kin', kind:'Sworn brother, sibling-like', start:100, from:0, at:'capital',
   desc:'The young king who sent Jade out into the world and calls her his sister.',
   perks:[{tier:1,key:'fareOff',v:.10,n:'Royal Writ',d:'Travel fares −10%'},{tier:3,key:'goldBonus',v:.10,n:'Crown Backing',d:'+10% gold from missions and investigations'},{tier:4,key:'fareOff',v:.10,n:'Open Roads',d:'Travel fares a further −10%'},{tier:5,key:'xpBonus',v:.10,n:'Sworn Siblings',d:'+10% XP from missions and investigations'}]},
  {id:'chadstone', n:'King Chadstone', icon:'🐉', ladder:'respect', kind:'Admiration and respect · father-in-law', start:50, from:50, at:'dragon_vale',
   desc:'The ruler of Dragonvale, father of Devon and of Roc. Jade earned his respect; he is now her husband\'s father.',
   perks:[{tier:1,key:'xpBonus',v:.05,n:'Dragonvale Regard',d:'+5% XP from missions and investigations'},{tier:3,key:'goldBonus',v:.05,n:'Royal Gifts',d:'+5% gold from missions and investigations'},{tier:4,key:'xpBonus',v:.05,n:'Honoured Kin',d:'A further +5% XP'},{tier:5,key:'repBonus',v:.15,n:'The Father\'s Blessing',d:'+15% renown'}]},
  {id:'adrian', n:'Adrian Gold', icon:'📚', img:'assets/npc/adrian.webp', ladder:'family', kind:'Jade\'s older brother', start:60, from:90, at:'capital',
   desc:'Jade\'s older brother, a royal scholar and Greyson\'s trusted official. He runs the Imperial Network.',
   perks:[{tier:1,key:'trustBonus',v:1,n:'A Quiet Word',d:'Each gain of trust with Adrian is +1'},{tier:2,key:'repBonus',v:.10,n:'Informed Counsel',d:'+10% renown'},{tier:4,key:'goldBonus',v:.05,n:'Family Ledger',d:'+5% gold from missions and investigations'},{tier:5,key:'fareOff',v:.10,n:'Trade Letters',d:'Travel fares −10%'}]},
];
// Story beats that deepen a bond, read from the comic chapters (first-pass numbers; never negative: a falling-out is modelled as STRAIN, below).
// CH_REL: standing with allies and family.  CH_TRACK: points on companion tracks (story-driven, like Crimson Tide's belonging ladders).
const CH_REL = {
  50:{chadstone:5},    // Jade presents Greyson's sealed box with respect
  52:{chadstone:5},    // Jade declares her choice before the king
  57:{chadstone:10},   // the king blesses the union: Jade becomes his daughter-in-law
  81:{chadstone:5},    // the king praises how Jade carries her duties
  82:{chadstone:5},    // Devon refuses the crown for his brother; the king sees the wisdom in his house
  86:{chadstone:15},   // "You leave as someone Dragonvale will never forget"
  96:{adrian:8},       // the brother who remembers
  98:{adrian:5},       // working through the missing ledgers together
  99:{greyson:20},     // sworn sister, Princess of Tribute, in front of the court
  101:{greyson:5},     // entrusted with a duty only she can fulfil
  121:{greyson:5},     // returns with Corvin's testimony and the Valen records
  147:{greyson:5, adrian:5},   // entrusted with the investigation of the Fifteen Evils
};
const CH_TRACK = {
  57:{jade_devon:30}, 82:{jade_devon:15}, 103:{jade_devon:30}, 138:{jade_devon:10}, 151:{jade_devon:10},
  87:{sera_circle:20}, 89:{sera_circle:10}, 104:{sera_circle:15}, 147:{sera_circle:15}, 149:{sera_circle:10},
  88:{sky_ghost:20}, 102:{circle:30},
};
/* STRAIN (Crimson Tide's disagreement-and-repair): a story disagreement with an ally. It never subtracts standing: bonds measure how well people understand each
   one another, not how often they agree. While it lasts the ally's favours are paused (progress is kept). The player listens, gives time and asks companions;
   with enough understanding a repair follows, and the ally keeps a permanent learned_<issue> flag that later dialogue can check.
   State: G.strain = { ally: {state:'strained'|'understanding'|'repaired', issue, pts, step, asked:{}} }.
   Add an issue: STRAIN_ISSUES[id] = {ally, title, text, need, views:{who:'line'}, steps:[{n, line}], standing}.  Start it with startStrain(ally, id), or from
   a chapter via CH_STRAIN = {chapter:{ally:issueId}}. No issue is active yet: the author supplies the story moments. */
const STRAIN_ISSUES = {};
const CH_STRAIN = {};
const strainOf = id => (G.strain && G.strain[id]) || null;
const strainActive = id => { const s = strainOf(id); return !!s && (s.state==='strained' || s.state==='understanding'); };
function startStrain(ally, issue){
  const I = STRAIN_ISSUES[issue], r = relOf(ally); if(!I || !r || strainActive(ally)) return [];
  if(!G.strain) G.strain = {}; G.strain[ally] = {state:'strained', issue, pts:0, step:0, asked:{}, last:-1};
  if(typeof chronicle==='function') chronicle(r.n+': a disagreement, '+I.title+'.', '💔');
  return ['💔 '+r.n+' and Jade disagree: '+I.title+'. Their favours are paused until it is understood. No standing is lost.'];
}
function strainRespond(ally, how, who){
  const s = strainOf(ally), I = s && STRAIN_ISSUES[s.issue]; if(!I || s.state!=='strained') return [];
  const need = I.need || 3, msgs = [];
  if(how==='listen'){ if(s.last===G.day) return ['You have already listened today.']; s.last = G.day; s.pts++; msgs.push('You listen properly this time. Understanding '+s.pts+'/'+need+'.'); }
  else if(how==='ask'){ if(s.asked[who] || !I.views || !I.views[who]) return []; s.asked[who] = true; s.pts++; msgs.push((who==='rin'?'Rin':CHARACTERS[who].n.split(' ')[0])+': "'+I.views[who]+'" Understanding '+s.pts+'/'+need+'.'); }
  else if(how==='push'){ return ['You press your point. It changes nothing, and costs nothing: the bond is safe.']; }
  if(s.pts >= need){ s.state = 'understanding'; msgs.push('🕯️ You understand each other. Now to repair it.'); }
  return msgs;
}
function strainRepair(ally){
  const s = strainOf(ally), I = s && STRAIN_ISSUES[s.issue]; if(!I || s.state!=='understanding') return [];
  const st = I.steps[s.step], msgs = [st.n+': '+st.line]; s.step++;
  if(s.step >= I.steps.length){ s.state = 'repaired'; G.flags['learned_'+s.issue] = true; msgs.push('✔ Repaired. '+relOf(ally).n+' and Jade understand each other better than before.'); const m = relAdd(ally, I.standing||10); if(m) msgs.push(m); chronicle(relOf(ally).n+': the disagreement is repaired.', '💞'); }
  return msgs;
}
function rStrain(r){
  const s = strainOf(r.id); if(!s || s.state==='repaired') return s && s.state==='repaired' ? '<div class="sm">✔ A past disagreement was repaired and understood.</div>' : '';
  const I = STRAIN_ISSUES[s.issue], need = I.need||3;
  if(s.state==='strained') return `<div class="panel" style="border-color:rgba(232,120,90,.5)"><b>💔 Strained: ${I.title}</b><div class="sm">${I.text}</div><div class="sm">Understanding ${s.pts}/${need}. Favours paused; nothing is lost.</div><div class="row" style="flex-wrap:wrap;margin:4px 0"><button onclick="act(strainRespond,'${r.id}','listen')">Listen</button><button onclick="act(strainRespond,'${r.id}','push')">Press the point</button>${Object.keys(I.views||{}).filter(w => w==='rin' ? isGuestNow('rin') : isRecruited(w)).map(w => `<button ${s.asked[w]?'disabled':''} onclick="act(strainRespond,'${r.id}','ask','${w}')">Ask ${w==='rin'?'Rin':CHARACTERS[w].n.split(' ')[0]}</button>`).join(' ')}</div></div>`;
  return `<div class="panel" style="border-color:rgba(232,197,71,.5)"><b>💔 Understanding: ${I.title}</b><div class="sm">Repair, step ${s.step+1} of ${I.steps.length}.</div><button class="pri" onclick="act(strainRepair,'${r.id}')">${I.steps[s.step].n}</button></div>`;
}   // {chapter:{allyId:delta}} applied when the chapter completes: filled in as the author sets story shifts

const relOf = id => RELATIONS.find(r => r.id===id);
const relOpen = r => !!G && G.ch >= r.from;
function relScore(id){ const r = relOf(id); if(!G.rel) G.rel = {}; if(G.rel[id]===undefined) G.rel[id] = r.start; return G.rel[id]; }
function relTier(id){ const s = relScore(id); let t = 0; REL_AT.forEach((need,i) => { if(s >= need) t = i; }); return t; }
const relTierName = id => REL_LADDER[relOf(id).ladder][relTier(id)];
function relAdd(id, pts){
  const r = relOf(id); if(!r) return null;
  const before = relTier(id); G.rel[id] = clamp(relScore(id) + pts, 0, REL_MAX);
  const t = relTier(id), perk = r.perks.find(p => p.tier===t && t>before);
  if(t > before && typeof chronicle==='function') chronicle(r.n+': '+REL_LADDER[r.ladder][t]+'.', '💞');
  return t > before ? '💞 '+r.n+': '+REL_LADDER[r.ladder][t]+'.'+(perk?' Favour unlocked: '+perk.n+'.':'') : (t < before ? '💔 '+r.n+': the bond has cooled to '+REL_LADDER[r.ladder][t]+'.' : null);
}
function relPerk(key){   // total of every unlocked favour with this key (allies met so far) plus the companion tracks whose synergy is active
  return RELATIONS.reduce((sum, r) => sum + (relOpen(r) && !strainActive(r.id) ? r.perks.filter(p => p.key===key && relTier(r.id) >= p.tier).reduce((a,p) => a + p.v, 0) : 0), 0) + (typeof trackPerk==='function' ? trackPerk(key) : 0) + (typeof estatePerk==='function' ? estatePerk(key) + rankPerk(key) : 0);
}
const fareOf = r => Math.max(0, Math.ceil(r.fare * (1 - Math.min(.4, relPerk('fareOff')))));
function relStoryApply(n, quiet){
  const msgs = [];
  Object.keys(CH_REL[n]||{}).forEach(id => { if(relOf(id)){ const m = relAdd(id, Math.max(0, CH_REL[n][id])); if(m && !quiet) msgs.push(m); } });
  Object.keys(CH_TRACK[n]||{}).forEach(k => { if(BOND_TRACKS[k]){ const st = trackState(k), before = trackTier(k); st.pts += CH_TRACK[n][k]; if(trackTier(k) > before && !quiet) msgs.push('💞 '+BOND_TRACKS[k].label+': '+BOND_TRACKS[k].names[trackTier(k)]+'.'); } });
  if(!G.relDone) G.relDone = {}; G.relDone[n] = true;
  return msgs;
}
function relCatchUp(){   // a save from before these beats existed gets the ones it has already passed, once and quietly
  if(!G || G.ch < 0) return;
  if(!G.relDone) G.relDone = {};
  Object.keys(Object.assign({}, CH_REL, CH_TRACK)).map(Number).sort((a,b) => a-b).forEach(n => { if(n <= G.ch && !G.relDone[n]) relStoryApply(n, true); });
}
function relApplyChapter(n){ const msgs = relStoryApply(n, false); Object.keys(CH_STRAIN[n]||{}).forEach(id => startStrain(id, CH_STRAIN[n][id]).forEach(m => msgs.push(m))); return msgs; }

const REL_GESTURES = {
  letter:  {n:'Write a letter', icon:'✉️', pts:2, line:'You write a few honest lines and send them off.'},
  gift:    {n:'Send a gift', icon:'🎁', pts:4, cost:60, line:'A small, well-chosen gift goes out under your seal.'},
  visit:   {n:'Visit in person', icon:'🚪', pts:6, line:'You take time to sit and talk properly.', here:true, day:1},
  counsel: {n:'Ask for counsel', icon:'🗝️', pts:1, line:'You lay out what is troubling you and listen.', tier:2, cd:3, xp:true},
};
function relGestureLock(r, k){
  const g = REL_GESTURES[k];
  if(g.tier && relTier(r.id) < g.tier) return '🔒 '+REL_LADDER[r.ladder][g.tier]+' or closer';
  if(g.here && G.loc !== r.at) return '📍 Only at '+LOCATIONS[r.at].n;
  if(g.cost && G.gold < g.cost) return g.cost+' gold needed';
  const last = G.bondDay['rel_'+r.id+'_'+k];
  if(last !== undefined && G.day - last < (g.cd||1)) return g.cd ? 'Again in '+(g.cd - (G.day-last))+' day(s)' : 'Done today';
  return '';
}
function doGesture(id, k){
  const r = relOf(id), g = REL_GESTURES[k]; if(!r || !g || relGestureLock(r,k)) return [];
  G.bondDay['rel_'+id+'_'+k] = G.day; if(g.cost) G.gold -= g.cost;
  const msgs = [g.icon+' '+r.n.split(' ')[0]+': '+g.line+' Standing +'+g.pts+'.'], m = relAdd(id, g.pts); if(m) msgs.push(m);
  if(g.xp) gainXp(40 + avgPartyLv()*12, G.party).forEach(x => msgs.push(x));
  return g.day ? msgs.concat(advanceDay(g.day)) : msgs;
}

function rBonds(){ return rBondsMain() + (typeof rGrowth==='function' ? rGrowth() : ''); }
function rBondsMain(){
  const comp = G.party.filter(id => id!=='jade' && !CHARACTERS[id].placeholder && !isCompanion(id)).map(id => {
    const bl = bondLevel(id), bp = U(id).bp, nxt = BOND_LEVELS[bl+1], prev = BOND_LEVELS[bl];
    return `<div class="card" style="cursor:default"><img src="${portrait(id)}" alt="" style="width:44px;height:44px;border-radius:50%;object-fit:cover"><div class="fl"><b>${CHARACTERS[id].n}</b> <span class="sm">· Bond ${bl}</span>${nxt!==undefined?bar(bp-prev, nxt-prev)+`<div class="sm">${bp} / ${nxt} to Bond ${bl+1}</div>`:'<div class="sm">Bond complete</div>'}</div></div>`; }).join('');
  const allies = RELATIONS.filter(relOpen).map(r => {
    const s = relScore(r.id), t = relTier(r.id), next = REL_AT[t+1];
    const perks = r.perks.map(p => `<div class="sm" style="${relTier(r.id)>=p.tier?'':'opacity:.55'}">${relTier(r.id)>=p.tier?'✔':'🔒 '+REL_LADDER[r.ladder][p.tier]+' ·'} <b>${p.n}</b>: ${p.d}</div>`).join('');
    const gest = Object.keys(REL_GESTURES).map(k => { const lock = relGestureLock(r,k), g = REL_GESTURES[k];
      return `<button ${lock?'disabled':''} onclick="act(doGesture,'${r.id}','${k}')" title="${lock}">${g.icon} ${g.n}${g.cost?' ('+g.cost+'g)':''}</button>`; }).join(' ');
    const locks = Object.keys(REL_GESTURES).map(k => relGestureLock(r,k) && relGestureLock(r,k).startsWith('🔒')||relGestureLock(r,k).startsWith('📍') ? REL_GESTURES[k].n+': '+relGestureLock(r,k) : '').filter(Boolean);
    return `<div class="panel"><div class="row" style="align-items:center;gap:10px;flex-wrap:nowrap">${r.img?`<img src="${r.img}" alt="" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid var(--gold)">`:`<span class="big">${r.icon}</span>`}<div><b>${r.n}</b><div class="sm">${r.kind}</div><div><b>${REL_LADDER[r.ladder][t]}</b> <span class="sm">· standing ${s}/${REL_MAX}</span></div></div></div>
      ${bar(s - REL_AT[t], (next===undefined?REL_MAX:next) - REL_AT[t])}<div class="sm">${next===undefined?'The deepest bond.':(next-s)+' more to '+REL_LADDER[r.ladder][t+1]}</div>
      <div class="sm" style="margin:4px 0">${r.desc}</div>${rStrain(r)}${perks}<div class="row" style="margin-top:6px;flex-wrap:wrap">${gest}</div>${locks.length?`<div class="sm" style="opacity:.6;margin-top:2px">${locks.join(' · ')}</div>`:''}</div>`; }).join('');
  return `<h2>Bonds</h2><div class="sm">Who Jade is close to. Companions deepen by spending time together; allies and family respond to letters, gifts, visits and counsel, once per day each, and their favours unlock as the bond grows.</div>${flashHtml()}<h4>Allies and family</h4>${allies}<h4>Standing and judgments</h4>${typeof rStanding==='function'?rStanding():''}<h4>Local regard</h4>${rRegard()}<h4>Hang out</h4><div class="sm">Time together, once per day for each bond. Progress always counts; the bonus only works while they are fielded.</div>${rTracks()}<h4>Companions</h4>${comp||'<div class="sm">No companions yet.</div>'}`;
}

/* =====================================================================
   COMPANION TRACKS (from Crimson Tide's bond tracks): bonds between companions and groups, not only with Jade.
   - Each track has five named tiers (thresholds 0/50/150/300/600) and gains 15 points per Hang Out, once per day per track.
   - Progress always accrues; the BONUS only applies while the bonded members are actually fielded (benching someone costs the bonus,
     never the progress). Bonuses are small. Companion tracks marked bonus:null are story-driven and carry no bonus on purpose.
   - Hang Out: a menu of flavoured activities (some need to be at a home or somewhere) that all feed the same points and daily cap,
     and are recorded in the Shared Moments log, a memory collection and not a second score.
   State: G.tracks = { key: {pts, last} }, G.moments = [ {t, a, d} ].   Activity wording is first-pass: the author can rewrite freely.
   ===================================================================== */
const TRACK_PTS = 15, MOMENTS_MAX = 200;
const TRACK_AT = [0,50,150,300,600];
const BOND_TRACKS = {
  jade_devon:{label:'Jade & Devon', icon:'🐉', members:['jade','devon'], bonus:'crit', amounts:[0,.02,.03,.04,.05],
    names:['Partners in the Field','Moving as One','Two Paths, One Rhythm','Unshakeable','Standing Beside'],
    open:() => isRecruited('devon'), why:'Jade and Devon fighting together',
    acts:[{id:'spar',icon:'⚔️',n:'Spar together',line:'Practice blades against practice spells until neither of you can stop smiling.'},{id:'walk',icon:'🌇',n:'Walk at dusk',line:'You walk the long way back and talk about nothing in particular.'},{id:'plan',icon:'🗺️',n:'Plan the next step',line:'Maps, candles and an honest argument about which road to take.'},{id:'stayin',icon:'🏠',n:'A quiet evening at home',line:'No plans, no reports. Just the two of you.',base:true}]},
  sky_ghost:{label:'Sky & the Ghost Healer', icon:'💙', members:['sky','ghost_healer'], bonus:'xp', amounts:[0,.02,.03,.04,.05],
    names:['Master and Pupil','Steady Hands','Shared Rhythm','The Old Light, Handed Down','Healers Together'],
    open:() => !!G.flags.ghost_healer_met, why:'Sky fielded with the Ghost Healer',
    acts:[{id:'herbs',icon:'🌿',n:'Gather herbs together',line:'The Ghost Healer names each leaf and waits for Sky to name it back.'},{id:'lesson',icon:'📖',n:'A lesson in the old healing',line:'A patient lesson, repeated until it settles.'},{id:'tea',icon:'🍵',n:'Tea after the work',line:'You leave the two of them to talk shop over tea.'}]},
  levi_rin:{label:'Levi & Rin', icon:'🏹', members:['levi','rin'], bonus:'crit', amounts:[0,.02,.03,.04,.05],
    names:['Rival Trackers','Comparing Notes','Two Ways of Reading','Hunting Partners','One Trail, Two Eyes'],
    open:() => !!G.flags.rin_met, why:'Levi fielded and Rin beside you (she only travels the northern forest country)',
    acts:[{id:'tracks',icon:'👣',n:'Compare tracking notes',line:'Levi reads the ground, Rin reads what the ground cannot say.'},{id:'range',icon:'🎯',n:'Target practice',line:'A friendly contest between a long bow and a short recurved one.'},{id:'fire',icon:'🔥',n:'Sit by the fire',line:'Two hunters, slowly deciding to trust each other.'}]},
  circle:{label:'The Travelling Circle', icon:'👥', headcount:4, bonus:'both', amounts:[0,.02,.04,.06,.08],
    names:['Companions on the Road','Easy Company','Trusted Hands','Found Family','This Is Home'],
    open:() => fixedParty(), why:'four or more of the travelling five fielded',
    acts:[{id:'meal',icon:'🍲',n:'Share a meal',line:'Everyone pulls a stool to the same table.'},{id:'cards',icon:'🃏',n:'An evening game',line:'Loud, petty and exactly what the group needed.'},{id:'stories',icon:'🔥',n:'Stories round the fire',line:'Each of you tells one that you have never told before.'},{id:'rest',icon:'🛏️',n:'A day of rest together',line:'Nobody is in a hurry. It shows.'},{id:'homemeal',icon:'🏠',n:'A meal at home',line:'Home cooking, a full table, no schedule.',base:true}]},
  sera_circle:{label:'Seraphina & the Circle', icon:'🌸', members:['seraphina'], bonus:null, amounts:[0,0,0,0,0],
    names:['Strangers Still','Getting to Know Them','Trusted Hands','Found Family','This Is Home'],
    open:() => isRecruited('seraphina') && G.ch >= 87, why:'story-driven: no bonus, it measures how much she belongs',
    acts:[{id:'tea',icon:'🫖',n:'Tea with Sera',line:'She asks the questions this time, and listens to every answer.'},{id:'market',icon:'🏮',n:'Explore a market with Sera',line:'She knows the foreign goods and the right way to haggle for them.'},{id:'stories',icon:'📜',n:'Trade stories of home',line:'Where each of you grew up, and what you miss about it.'},{id:'letters',icon:'✉️',n:'Help Sera with a letter',line:'You sit with her while she finds the right words.'}]},
};
function trackState(k){ if(!G.tracks) G.tracks = {}; if(!G.tracks[k]) G.tracks[k] = {pts:0, last:-1}; return G.tracks[k]; }
function trackTier(k){ const p = trackState(k).pts; let t = 0; TRACK_AT.forEach((need,i) => { if(p >= need) t = i; }); return t; }
const trackOpen = k => BOND_TRACKS[k].open();
function trackSynergy(k){   // are the bonded members fielded right now?
  const T = BOND_TRACKS[k], act = id => G.active.includes(id) && !isDisabled(id);
  if(T.headcount) return FIXED_FIVE.filter(act).length >= T.headcount;
  if(T.bonus===null) return false;
  if(k==='levi_rin') return act('levi') && (isGuestNow('rin') || act('rin'));
  if(k==='sky_ghost') return act('sky') && isRecruited('ghost_healer');
  return T.members.every(act);
}
function trackPerk(key){   // xp/gold bonuses from the active tracks
  return Object.keys(BOND_TRACKS).reduce((s,k) => { const T = BOND_TRACKS[k];
    if(!trackOpen(k) || !trackSynergy(k) || !T.bonus) return s;
    return s + ((T.bonus==='both' ? (key==='xpBonus'||key==='goldBonus') : T.bonus==='xp' ? key==='xpBonus' : false) ? T.amounts[trackTier(k)] : 0); }, 0);
}
function trackCritB(id){   // extra crit chance for a fielded member of a crit track
  return Object.keys(BOND_TRACKS).reduce((s,k) => { const T = BOND_TRACKS[k];
    return s + (T.bonus==='crit' && T.members.includes(id) && trackOpen(k) && trackSynergy(k) ? T.amounts[trackTier(k)] : 0); }, 0);
}
function trackActLock(k, a){
  const st = trackState(k);
  if(st.last === G.day) return 'Already today';
  if(a.base && typeof baseHere==='function' && !baseHere()) return '📍 Only at a home (Devon\'s Palace or Gold Manor)';
  if(k==='levi_rin' && !(isGuestNow('rin') || G.active.includes('rin'))) return 'Rin is not with you';
  const T = BOND_TRACKS[k]; if(T.members && k!=='levi_rin' && k!=='sky_ghost' && !T.members.every(id => isRecruited(id))) return 'Not all of them are with you';
  return '';
}
function doHangOut(k, actId){
  const T = BOND_TRACKS[k], a = T && T.acts.find(x => x.id===actId); if(!a || !trackOpen(k) || trackActLock(k,a)) return [];
  const st = trackState(k), before = trackTier(k); st.pts += TRACK_PTS; st.last = G.day;
  if(!G.moments) G.moments = []; G.moments.push({t:k, a:actId, d:G.day}); if(G.moments.length > MOMENTS_MAX) G.moments.splice(0, G.moments.length - MOMENTS_MAX);
  const msgs = [a.icon+' '+a.line+' (+'+TRACK_PTS+')'], now = trackTier(k);
  if(now > before){ chronicle(T.label+': '+T.names[now]+'.', '💞'); }
  if(now > before) msgs.push('💞 '+T.label+': '+T.names[now]+'.'+(T.bonus&&T.amounts[now]?' Bonus now +'+Math.round(T.amounts[now]*100)+'%.':''));
  return msgs.concat(advanceDay(1));
}
const momentsFor = k => (G.moments||[]).filter(m => m.t===k);
function rTracks(){
  const rows = Object.keys(BOND_TRACKS).filter(trackOpen).map(k => { const T = BOND_TRACKS[k], t = trackTier(k), pts = trackState(k).pts, nxt = TRACK_AT[t+1], syn = trackSynergy(k), mm = momentsFor(k);
    const btns = T.acts.map(a => { const lock = trackActLock(k,a); return `<button ${lock?'disabled':''} title="${lock}" onclick="act(doHangOut,'${k}','${a.id}')">${a.icon} ${a.n}</button>`; }).join(' ');
    const counts = T.acts.map(a => { const n = mm.filter(m => m.a===a.id).length; return n ? a.icon+' ×'+n : ''; }).filter(Boolean).join(' · ');
    return `<div class="panel"><b>${T.icon} ${T.label}</b> <span class="sm">· ${T.names[t]}</span>
      ${nxt!==undefined?bar(pts-TRACK_AT[t], nxt-TRACK_AT[t])+`<div class="sm">${pts} / ${nxt} to ${T.names[t+1]}</div>`:'<div class="sm">Deepest bond reached.</div>'}
      <div class="sm">${T.bonus ? (T.amounts[t] ? '+'+Math.round(T.amounts[t]*100)+'% '+(T.bonus==='crit'?'crit chance':T.bonus==='xp'?'XP':'XP and gold')+' · '+(syn?'✅ active now':'⚪ not active: needs '+T.why) : 'No bonus yet · needs '+T.why) : '🌸 '+T.why}</div>
      <div class="row" style="margin-top:6px;flex-wrap:wrap">${btns}</div>${mm.length?`<div class="sm" style="margin-top:4px">Shared moments (${mm.length}): ${counts}</div>`:''}</div>`; }).join('');
  return rows || '<div class="sm">No companion bonds to tend yet.</div>';
}
