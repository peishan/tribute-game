/* =====================================================================
   TRIBUTE — THE HIDDEN FRONTIER NETWORK (Arc XXIV's planned mechanics, built after Arc XXV)
   From ch635 (flag fen_announced_queen: Fen is announced queen, and Elise and Tarin have left the court) Elise and Tarin are no longer court-facing allies: they are hidden-world contacts,
   useful because they sit outside official structures. Their work arrives as a board of four jobs that changes every 3 days (each job has its own 3-day cooldown), at the Northern Frontier,
   Dragonvale and the Bone River:
     Frontier errand     a fight with the people who watch the quiet roads                     (pays like a convoy job)
     Escort              a fight, or a choice of routes, to get a family or a healer through   
     Intelligence        no fight: Tarin\'s reports; a lead or nothing
     Refugee help        a choice of what to do with people who have no papers
     Identity protection Elise is publicly dead and privately alive: a rumour or a stranger comes too close. Quash it, misdirect it or let it stand.
     Disguise mission    the reusable stealth quest: choose a route, papers and an appearance, then the checkpoint is rolled
     From the Pavilion   a hard medical case sent by Jenika (also at the Pavilion once her curse is broken)
   COURT SUSPICION METER (a simple counter for this arc: 0 to 100): carelessness and failed disguise or identity jobs raise it, time lowers it (5 a day). Quiet below 25, Whispers below 50, Watched
   below 75, Alert from 75. At 100 word spreads: the network goes dormant for 6 days and the meter falls to 40; each scare is counted. HIDDEN IDENTITY: the secret is kept until the second scare, after
   which some of the court wonder about the dead queen (flag elise_secret_exposed: jobs pay 20% less and the meter falls more slowly); before that flag elise_secret_kept stands.
   REFORM PRELUDE: a list of the House Xuanji and Altan reforms as a future side-quest category (nothing playable yet).
   Pay is a share of the latest investigation\'s reward, as for the convoy desk. State: G.hfn = {done, cool:{id:day}, susp, suspDay, scares, dormant, lastMsg}. All numbers first-pass.
   ===================================================================== */
const frontOpen = () => !!(G && G.flags && G.flags.fen_announced_queen);
const hfn = () => { if(!G.hfn) G.hfn = {done:0, cool:{}, susp:0, suspDay:G.day, scares:0, dormant:-1, medical:0}; return G.hfn; };
const hfnExposed = () => !!(G && G.hfn && G.hfn.scares >= 2);
function hfnSusp(){
  const h = hfn(), d = G.day - h.suspDay;
  if(d > 0){ h.susp = Math.max(0, h.susp - d*(hfnExposed() ? 3 : 5)); h.suspDay = G.day; }
  return h.susp;
}
const SUSP_TIERS = [[25,'Quiet'],[50,'Whispers in the court'],[75,'Watched'],[101,'Alert']];
const suspTierName = n => (SUSP_TIERS.find(t => n < t[0]) || SUSP_TIERS[3])[1];
function hfnAddSusp(n){
  const h = hfn(); hfnSusp(); h.susp = Math.min(100, Math.max(0, h.susp + n)); const msgs = [];
  if(h.susp >= 100){
    h.scares++; h.dormant = G.day + 6; h.susp = 40; msgs.push('🚨 Word spreads in the court: a servant has noticed a pattern. The network goes quiet for 6 days.');
    if(h.scares >= 2 && !G.flags.elise_secret_exposed){ G.flags.elise_secret_exposed = true; delete G.flags.elise_secret_kept; msgs.push('🕯️ Some of the court now wonder aloud about the dead queen.'); if(typeof chronicle==='function') chronicle('Whispers in the court about the dead queen.', '🕯️'); }
  }
  return msgs;
}
const hfnDormant = () => (G.hfn && G.hfn.dormant >= G.day) ? G.hfn.dormant - G.day + 1 : 0;
function hfnSyncFlags(){ if(frontOpen() && !G.flags.elise_secret_exposed) G.flags.elise_secret_kept = true; }

const HFN_CHOICE_SETS = {
  route:{label:'Choose the route', opts:[['back','The back trails (slow, quiet)',.8,0,2],['road','The main road (fast, watched)',.55,0,1],['ford','The old ford (risky, unwatched)',.65,0,1]]},
  papers:{label:'Choose the papers', opts:[['forged','Forged papers (convincing)',.7,0,0],['borrowed','A borrowed name (it will hold, for a day)',.6,0,0],['none','No papers, a good story',.4,0,0]]},
  look:{label:'Choose the appearance', opts:[['plain','Plain traveller (nobody looks twice)',.75,0,0],['merchant','A merchant\'s party (looks are expected)',.6,0,0],['pilgrim','A pilgrim (nobody asks)',.65,0,0]]},
  refuge:{label:'Where do they go?', opts:[['shelter','A hidden shelter on the frontier',.8,0,0],['kin','To kin in another village',.6,0,0],['road','Onward along the road',.45,0,0]]},
  rumour:{label:'What do you do about the rumour?', opts:[['quash','Quash it quietly',.8,0,0],['mislead','Misdirect it toward someone else',.6,0,0],['stand','Let it stand',.35,0,0]]},
  care:{label:'How do you treat it?', opts:[['rest','Rest and a slow cleanse',.8,0,0],['light','Spirit Flow to the root',.7,0,0],['bold','A bold intervention',.5,0,0]]},
};
const HFN_JOBS = {
  fr1:{type:'frontier', icon:'🛡️', n:'A Quiet Frontier Errand', days:2, share:.40, fight:['road_bandit','frontier_diverter'], desc:'A message must cross watched ground. Someone is watching it.'},
  fr2:{type:'frontier', icon:'🛡️', n:'The Gap in the Patrol', days:2, share:.42, fight:['frontier_diverter','northern_mercenary'], desc:'A patrol gap has opened and someone is using it. Close it without making a noise.'},
  es1:{type:'escort', icon:'🧭', n:'Walk a Family North', days:2, share:.40, fight:['road_bandit','forest_wolf'], desc:'A family with a child must cross bandit country before the snows.'},
  es2:{type:'escort', icon:'🧭', n:'A Healer Past the Checkpoint', days:2, share:.42, choice:'route', susp:12, helpers:['levi','sally'], desc:'A healer on a list she should not be on has to be walked past a checkpoint.'},
  in1:{type:'intel', icon:'🔎', n:'A Word from Tarin', days:2, share:.35, desc:'Tarin has noticed who is asking about the frontier. No fight, if you read it right.'},
  in2:{type:'intel', icon:'🔎', n:'Whose Ledgers Are These?', days:2, share:.38, desc:'A courier\'s ledgers have the wrong names in the right order. Compare them with what the garrison holds.'},
  rf1:{type:'refugee', icon:'🕊️', n:'Refugees at the Ford', days:1, share:.38, choice:'refuge', susp:6, helpers:['sky','jade'], desc:'A line of people has reached the ford with no papers and no plan.'},
  rf2:{type:'refugee', icon:'🕊️', n:'A Village With No Papers', days:2, share:.40, choice:'refuge', susp:6, helpers:['sky','devon'], desc:'A village that the registers forgot is afraid of the first official who finds it.'},
  id1:{type:'identity', icon:'🕯️', n:'A Rumour About the Dead Queen', days:1, share:.36, choice:'rumour', susp:18, helpers:['jade','sally'], desc:'Someone says they saw the dead queen on a road. It must not reach the court.'},
  id2:{type:'identity', icon:'🕯️', n:'The Stranger Who Looks Too Closely', days:1, share:.36, choice:'rumour', susp:18, helpers:['sally','devon'], desc:'A stranger has been asking the lakeside villagers about a woman with short dark hair.'},
  dg1:{type:'disguise', icon:'🎭', n:'Disguise: The Checkpoint', days:2, share:.45, choice:['route','papers','look'], susp:15, helpers:['sally','levi'], desc:'Carry someone through a checkpoint as someone else. Choose the route, the papers and the face.'},
  dg2:{type:'disguise', icon:'🎭', n:'Disguise: Market Day', days:2, share:.45, choice:['papers','look'], susp:15, helpers:['sally','jade'], desc:'A market-day crowd is the best cover and the worst: everyone sees everyone.'},
  md1:{type:'medical', icon:'🌙', n:'From the Pavilion: A Hard Case', days:1, share:.40, choice:'care', susp:0, helpers:['sky'], needFlag:'jenika_curse_broken', desc:'Jenika\'s team has a patient they cannot place. She asks for Sky, and says there is nothing to worry about.'},
};
const HFN_COOL = 3;
function hfnBoard(){
  const ids = Object.keys(HFN_JOBS).filter(k => !HFN_JOBS[k].needFlag || G.flags[HFN_JOBS[k].needFlag]);
  const w = Math.floor(G.day/HFN_COOL), out = []; let i = 0;
  while(out.length < Math.min(4, ids.length) && i < 60){ const k = ids[(w*5 + i*3 + (i>>1)) % ids.length]; if(!out.includes(k)) out.push(k); i++; }
  return out;
}
const hfnCool = k => { const c = hfn().cool[k]; return (c!==undefined && G.day - c < HFN_COOL) ? HFN_COOL - (G.day - c) : 0; };
function hfnRef(){ return typeof convoyRef==='function' ? convoyRef() : {xp:20000, gold:4000}; }
function hfnPay(share, scale){
  const r = hfnRef(), m = (hfnExposed() ? .8 : 1) * (scale===undefined ? 1 : scale);
  return {xp:Math.round((r.xp||0)*share*m), gold:Math.round((r.gold||0)*share*m)};
}
function hfnDone(label, J, scale, extra){
  const h = hfn(); h.done++; h.cool[J.id] = G.day;
  const msgs = grantReward(hfnPay(J.share, scale), label);
  if(typeof regardAdd==='function'){ const rm = regardAdd(G.loc, 3); if(rm) msgs.push(rm); }
  if(typeof chronicle==='function') chronicle(label+'.', '🕯️');
  (extra||[]).forEach(m => msgs.push(m));
  msgs.push.apply(msgs, advanceDay(J.days)); save(); return msgs;
}
function hfnFight(id){
  const J = HFN_JOBS[id]; if(!J || !frontOpen() || hfnDormant() || hfnCool(id) || !J.fight) return;
  J.id = id; hfn().cool[id] = G.day;
  startBattle({foes:foeGroup(J.fight, Math.max(1, avgPartyLv()), 2 + (Math.random()<.4?1:0)), rewards:true, onWin:() => hfnDone('🕯️ '+J.n+': done', J, 1)});
  return 'battle';
}
function hfnIntel(id){
  const J = HFN_JOBS[id]; if(!J || !frontOpen() || hfnDormant() || hfnCool(id)) return [];
  J.id = id; const lead = Math.random() < (G.active.includes('levi') ? .8 : .65);
  const msgs = [lead ? '🔎 Tarin\'s report holds a real lead: a name, a route and a place to look.' : '🔎 The reports are thin this time: nothing that cannot wait.'];
  return hfnDone('🕯️ '+J.n+': '+(lead?'a lead':'a quiet day'), J, lead ? 1 : .4, msgs);
}
// choice jobs: the choices are resolved together (disguise missions have two or three)
let hfnPending = null;
function hfnStart(id){ const J = HFN_JOBS[id]; if(!J || !frontOpen() || hfnDormant() || hfnCool(id) || !J.choice) return; hfnPending = {id, picks:[], sets:[].concat(J.choice)}; }
function hfnPick(setKey, optKey){ if(!hfnPending) return; const need = hfnPending.sets[hfnPending.picks.length]; if(need!==setKey) return; hfnPending.picks.push(optKey); }
function hfnCancel(){ hfnPending = null; }
function hfnResolve(){
  const p = hfnPending; if(!p || p.picks.length < p.sets.length) return [];
  const J = HFN_JOBS[p.id]; J.id = p.id; hfnPending = null;
  let odds = 1; p.sets.forEach((s, i) => { const o = HFN_CHOICE_SETS[s].opts.find(x => x[0]===p.picks[i]); odds *= o[2]; });
  odds = Math.min(.97, Math.pow(odds, 1/p.sets.length) + (J.helpers||[]).filter(x => G.active.includes(x)).length*.07 + (p.sets.length>1 ? .05 : 0));
  const ok = Math.random() < odds, msgs = [];
  hfnSusp();
  if(J.type==='medical'){
    const m = grantReward(hfnPay(J.share, ok ? 1 : .5), '🌙 '+J.n+(ok ? ': the patient recovers' : ': a long night, a slow recovery'));
    hfn().medical++; hfn().done++; hfn().cool[p.id] = G.day; msgs.push.apply(msgs, m); msgs.push.apply(msgs, advanceDay(J.days)); save(); return msgs;
  }
  if(ok){ msgs.push('✔ It works ('+Math.round(odds*100)+'%).'); if(J.susp) msgs.push.apply(msgs, hfnAddSusp(J.type==='identity' ? -8 : 0)); }
  else { msgs.push('✘ It goes wrong ('+Math.round(odds*100)+'%).'); msgs.push.apply(msgs, hfnAddSusp(J.susp||0)); }
  hfnDone('🕯️ '+J.n+(ok?': done':': half done'), J, ok ? 1 : .35, msgs).forEach(m => msgs.push(m));
  return msgs;
}
// the Pavilion: expanded support once Jenika\'s curse is broken
function pavilionRemedy(){
  if(!G.flags.jenika_curse_broken) return [];
  const h = hfn(); if(h.remedyDay!==undefined && G.day - h.remedyDay < 4) return ['Jenika has already given you her full attention this week.'];
  h.remedyDay = G.day; restoreParty();
  G.party.forEach(id => { const u = U(id); if(u && u.st) { ['burn','slow','bind','charm','silence'].forEach(k => delete u.st[k]); } });
  return ['🌙 Jenika sets her other work aside: HP and MP fully restored, and a careful look for anything lingering.'].concat(advanceDay(0));
}
function pavilionExtra(){
  if(!G.flags.jenika_curse_broken) return '';
  const h = hfn(), left = h.remedyDay!==undefined ? Math.max(0, 4 - (G.day - h.remedyDay)) : 0;
  return `<h4>Pavilion support</h4><div class="panel"><div class="sm">Jenika runs the Pavilion and still has time for you. The Royal Remedy gives a full restoration and a check for anything lingering (once every 4 days). She is not a shop: she is a physician with a waiting room.</div><button ${left?'disabled':''} onclick="act(pavilionRemedy)">Ask for her full attention${left?' (ready in '+left+' days)':''}</button></div>`;
}

const HFN_REFORMS = [
  ['House Xuanji: the household reform', 'Aster ends the royal polygamous marriage structure after his marriage to Fen (planned for a later arc).'],
  ['Altan: the marriage reform', 'Rheon challenges the chastity-based rules and the caste-bound marriage restrictions of Altan (planned for Arc XXVIII).'],
];
function rFrontDesk(){
  hfnSusp(); hfnSyncFlags();
  const h = hfn(), s = h.susp, dor = hfnDormant();
  const portraits = ['assets/party/elise.webp','assets/party/tarin.webp'].map(p => `<img src="${p}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;vertical-align:middle;border:2px solid var(--gold)">`).join(' ');
  let out = `<div class="panel"><b>${portraits} The Hidden Frontier Network</b><div class="sm">Elise and Tarin, outside every official structure. ${h.done} job${h.done===1?'':'s'} done. <b>Court suspicion:</b> ${suspTierName(s)} (${s}/100) ${'▮'.repeat(Math.round(s/10))}${'▯'.repeat(10-Math.round(s/10))}. ${G.flags.elise_secret_exposed ? '<b>Some of the court wonder about the dead queen</b> (jobs pay 20% less).' : 'The secret of the dead queen is kept.'}</div>${dor ? `<div class="sm">🤫 The network is quiet for ${dor} more day${dor>1?'s':''}.</div>` : ''}</div>`;
  if(hfnPending){
    const p = hfnPending, J = HFN_JOBS[p.id], k = p.sets[p.picks.length];
    if(k){ const S = HFN_CHOICE_SETS[k]; out += `<div class="panel" style="border-color:var(--gold)"><b>${J.icon} ${J.n}</b><div class="sm">${S.label}${p.sets.length>1?' ('+(p.picks.length+1)+' of '+p.sets.length+')':''}</div>${S.opts.map(o => `<div class="ev"><div>${o[1]}</div><button class="pri" onclick="hfnPick('${k}','${o[0]}');render()">Choose</button></div>`).join('')}<div class="row" style="margin-top:6px"><button onclick="hfnCancel();render()">Not now</button></div></div>`; }
    else out += `<div class="panel" style="border-color:var(--gold)"><b>${J.icon} ${J.n}</b><div class="sm">All set. Go.</div><button class="pri" onclick="act(hfnResolve)">Carry it out</button> <button onclick="hfnCancel();render()">Not now</button></div>`;
  }
  out += hfnBoard().map(id => { const J = HFN_JOBS[id], c = hfnCool(id), pay = hfnPay(J.share), lock = dor || c;
    const btn = J.fight ? `<button class="pri" ${lock?'disabled':''} onclick="origin='here';hfnFight('${id}');tab='battle';render()">Take it</button>` : J.choice ? `<button class="pri" ${lock?'disabled':''} onclick="hfnStart('${id}');render()">Plan it</button>` : `<button class="pri" ${lock?'disabled':''} onclick="act(hfnIntel,'${id}')">Take it</button>`;
    return `<div class="ev ${lock?'locked':''}"><div><b>${J.icon} ${J.n}</b> <span class="sm">· ${J.type} · ${J.days} day${J.days>1?'s':''} · about ${pay.xp.toLocaleString()} XP and ${pay.gold.toLocaleString()}g</span><div class="sm">${c ? 'Ready again in '+c+' day'+(c>1?'s':'')+'.' : J.desc}</div></div>${btn}</div>`; }).join('');
  out += `<h4>Reform prelude</h4>` + HFN_REFORMS.map(r => `<div class="ev locked"><div><b>📜 ${r[0]}</b><div class="sm">${r[1]} Not yet playable.</div></div></div>`).join('');
  return out;
}
// the desk spots and the Elise panel
['border_frontier','dragon_vale','bone_river'].forEach(loc => {
  if(LOCATIONS[loc] && LOCATIONS[loc].spots && !LOCATIONS[loc].spots.some(s => s.id==='hfn_desk_'+loc))
    LOCATIONS[loc].spots.push({id:'hfn_desk_'+loc, kind:'frontnet', n:'A Quiet Word (Hidden Frontier Network)', icon:'🕯️', desc:'Work from Elise and Tarin: errands, escorts, intelligence, refugees, identities and disguises.', needFlag:'fen_announced_queen', lockMsg:'🔒 Nobody here has anything to say yet'});
});
(function(){
  const _ep = elisePanel;
  elisePanel = function(){
    let h = _ep(); if(!h || !frontOpen()) return h;
    return h + `<div class="sm"><b>Hidden Frontier Network:</b> Elise and Tarin are no longer court-facing: they post quiet work at the Northern Frontier, Dragonvale and the Bone River (look for "A Quiet Word"). Court suspicion: ${suspTierName(hfnSusp())}.</div>`;
  };
})();
deed('hfn5', 'hunt', 'A quiet word', '🕯️', 'Five Hidden Frontier Network jobs were finished.', () => !!(G.hfn && G.hfn.done >= 5));
