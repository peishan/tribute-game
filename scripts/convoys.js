/* =====================================================================
   TRIBUTE — LADY DELILAH DEE'S CONVOY DESK (Arc XIV's unbuilt convoy missions, built for Arc XXII)
   After ch361 (flag delilah_wife) Lady Delilah's office posts supply work at the places she runs logistics from: the Noble Court, Dee Manor, the Western
   Frontier and the Northern Frontier. Three standing jobs (each on a 3-day cooldown) and one urgent one:
     Escort Provisions          2 days; a fight with raiders; pays XP and gold, and the place thinks better of you.
     Recover a Missing Shipment 1 day; a fight with the diverters; pays XP, gold and tonics.
     Audit the Garrison         2 days; no fight: the audit may find a lie (60%, 85% with Delilah in the party; a clean audit pays little).
     Emergency Reallocation     urgent, open for 3 days (an outpost is about to be hit): choose where the last supplies go (arrows, medicine or grain) and
                                defend it. If the window passes, the outpost holds without you and nothing is lost.
   Pay is a share of the latest investigation's reward (40%, 45%, 35%, 80%), +25% with Delilah in the party and +20% with the Frontier Agreement (flag
   frontier_agreement). State: G.convoy = {cool:{job:day}, done:n, emerg:{kind, until}|null, emergDay}. All numbers first-pass.
   ===================================================================== */
const convoyOpen = () => !!(G && G.flags && G.flags.delilah_wife);
const CONVOY_COOL = 3;
const CONVOY_JOBS = {
  escort:{icon:'🚚', n:'Escort Provisions', days:2, share:.40, desc:'A grain and arrow train crosses bandit country. Raiders will test the escort.', pool:['frontier_diverter','road_bandit','northern_mercenary']},
  recover:{icon:'🔎', n:'Recover a Missing Shipment', days:1, share:.45, desc:'A shipment never reached its garrison. The diverters still have it.', pool:['frontier_diverter','northern_mercenary']},
  audit:{icon:'📋', n:'Audit the Garrison', days:2, share:.35, desc:'Compare the garrison\'s books with what it actually holds. No fight, if the books are honest.'},
};
const EMERG_ALLOC = {
  arrows:{icon:'🏹', n:'Arrows to the walls', d:'The party strikes harder (+15% attack and magic for 5 turns).'},
  medicine:{icon:'🧪', n:'Medicine to the wounded', d:'Everyone starts 25% healthier and regenerates a little.'},
  grain:{icon:'🌾', n:'Grain to the garrison', d:'A steadier line (+15% defence for 5 turns and a small barrier).'},
};
function convoyState(){ if(!G.convoy) G.convoy = {cool:{}, done:0, emerg:null, emergDay:-99}; return G.convoy; }
function convoyRef(){   // the latest investigation's reward is the yardstick, so pay grows with the story
  let best = null;
  Object.keys(LOCATIONS).forEach(k => (LOCATIONS[k].spots||[]).forEach(s => { if(s.rw && s.kind==='investigate' && s.ch!==undefined && s.ch <= G.ch && (!best || s.ch > best.ch)) best = s; }));
  return best ? best.rw : {xp:20000, gold:4000};
}
function convoyPay(share){
  const r = convoyRef(); let m = 1; const notes = [];
  if(delilahOn()){ m += .25; notes.push('Delilah\'s plan +25%'); }
  if(G.flags.frontier_agreement){ m += .2; notes.push('Frontier Agreement +20%'); }
  return {rw:{xp:Math.round((r.xp||0)*share*m), gold:Math.round((r.gold||0)*share*m)}, notes};
}
const convoyCool = k => { const c = convoyState().cool[k]; return (c!==undefined && G.day - c < CONVOY_COOL) ? CONVOY_COOL - (G.day - c) : 0; };
function convoyEmergency(){   // post (or expire) the urgent job: decided by the day, so reloading cannot re-roll it
  const st = convoyState();
  if(st.emerg && G.day > st.emerg.until){ st.emerg = null; }
  if(!st.emerg && G.day - st.emergDay >= 10 && ((G.day*31 + G.ch) % 100) < 40){ st.emerg = {kind:'outpost', until:G.day+3}; st.emergDay = G.day; }
  return st.emerg;
}
function convoyFoes(pool, extra){ return foeGroup(pool, Math.max(1, avgPartyLv() + (extra||0)), 2 + (Math.random()<.4?1:0) + (extra?1:0)); }
function convoyDone(label, share, days, bonusItems, regard, job){
  const st = convoyState(), p = convoyPay(share); st.done++;
  const msgs = grantReward(Object.assign({}, p.rw, bonusItems ? {items:bonusItems} : {}), label+(p.notes.length ? ' ('+p.notes.join(', ')+')' : ''));
  if(typeof regardAdd==='function' && regard){ const m = regardAdd(G.loc, regard); if(m) msgs.push(m); }
  if(typeof chronicle==='function') chronicle(label+'.', '📦');
  msgs.push.apply(msgs, advanceDay(days)); if(job) st.cool[job] = G.day; save(); return msgs;   // the cooldown runs from the end of the job
}
// Escort and Recover are fights
function convoyFight(kind){
  const J = CONVOY_JOBS[kind]; if(!J || !J.pool || !convoyOpen() || convoyCool(kind)) return;
  convoyState().cool[kind] = G.day;
  startBattle({foes:convoyFoes(J.pool), rewards:true, onWin:() => convoyDone('📦 '+J.n+': done', J.share, J.days, kind==='recover' ? [{id:'herbal_tonic', qty:2}] : null, 4, kind)});
  return 'battle';
}
function convoyAudit(){
  const J = CONVOY_JOBS.audit; if(!convoyOpen() || convoyCool('audit')) return [];
  convoyState().cool.audit = G.day;
  const good = Math.random() < (delilahOn() ? .85 : .6);
  if(!good){ const msgs = ['📋 The books balance too neatly and nothing turns up. A quiet day, a little experience.']; gainXp(Math.round(convoyRef().xp*.08), G.party).forEach(m => msgs.push(m)); msgs.push.apply(msgs, advanceDay(J.days)); convoyState().cool.audit = G.day; save(); return msgs; }
  return ['📋 The audit finds a lie: a depot listed as full is half empty, and the sergeant who signed for it has some explaining to do.'].concat(convoyDone('📋 Audit the Garrison: a lie found', J.share, J.days, null, 6, 'audit'));
}
function convoyEmergencyFight(alloc){
  const st = convoyState(), e = convoyEmergency(); if(!e || !convoyOpen() || !EMERG_ALLOC[alloc]) return;
  st.emerg = null;
  startBattle({foes:convoyFoes(['frontier_diverter','northern_mercenary','road_bandit'], 1), rewards:true,
    opening:() => {
      B.allies.forEach(a => {
        if(a.dead) return;
        if(alloc==='arrows'){ a.bf.push({stat:'atk', m:1.15, d:6}); a.bf.push({stat:'mag', m:1.15, d:6}); }
        if(alloc==='medicine'){ a.hp = Math.min(a.mhp, a.hp + Math.round(a.mhp*.25)); a.st.regen = {v:.04, d:5}; }
        if(alloc==='grain'){ a.bf.push({stat:'def', m:1.15, d:6}); a.st.shield = {v:Math.round(a.mhp*.1), d:5}; }
      });
      blog('📦 Emergency Reallocation: '+EMERG_ALLOC[alloc].n+'. '+EMERG_ALLOC[alloc].d,'sys');
    },
    onWin:() => convoyDone('📦 Emergency Reallocation: the outpost holds', .80, 1, [{id:'moon_tonic', qty:1}], 8)});
  return 'battle';
}
function rConvoyDesk(){
  const st = convoyState(), em = convoyEmergency();
  let h = `<div class="panel"><b>📦 Lady Delilah Dee's Convoy Desk</b><div class="sm">Military Legal and Logistics Adviser. Supply work for the frontier: ${st.done} job${st.done===1?'':'s'} done so far.${delilahOn() ? ' <b>Delilah is with you:</b> +25% pay and a keener eye on the books.' : ''}${G.flags.frontier_agreement ? ' The Frontier Agreement adds +20%.' : ''}</div></div>`;
  if(em) h += `<div class="panel" style="border-color:var(--gold)"><b>⚠️ Emergency Reallocation</b><div class="sm">An outpost is about to be hit and its stores are short. Open until day ${em.until} (now day ${G.day}). Choose where the last supplies go, then defend it.</div><div class="row" style="flex-wrap:wrap;margin-top:6px">${Object.keys(EMERG_ALLOC).map(k => `<button class="pri" onclick="origin='here';convoyEmergencyFight('${k}');tab='battle';render()" title="${EMERG_ALLOC[k].d}">${EMERG_ALLOC[k].icon} ${EMERG_ALLOC[k].n}</button>`).join('')}</div><div class="sm">${Object.keys(EMERG_ALLOC).map(k => EMERG_ALLOC[k].icon+' '+EMERG_ALLOC[k].d).join(' · ')}</div></div>`;
  h += Object.keys(CONVOY_JOBS).map(k => { const J = CONVOY_JOBS[k], c = convoyCool(k), p = convoyPay(J.share);
    const btn = k==='audit' ? `<button ${c?'disabled':''} onclick="act(convoyAudit)">${J.icon} Audit</button>` : `<button class="pri" ${c?'disabled':''} onclick="origin='here';convoyFight('${k}');tab='battle';render()">${J.icon} Take it</button>`;
    return `<div class="ev ${c?'locked':''}"><div><b>${J.icon} ${J.n}</b> <span class="sm">· ${J.days} day${J.days>1?'s':''} · about ${p.rw.xp.toLocaleString()} XP and ${p.rw.gold.toLocaleString()}g</span><div class="sm">${c ? 'Ready again in '+c+' day'+(c>1?'s':'')+'.' : J.desc}</div></div>${btn}</div>`; }).join('');
  return h;
}
// the desks
[['dragon_court','convoy_desk_court'],['dee_household','convoy_desk_manor'],['frontier_depot','convoy_desk_west'],['border_frontier','convoy_desk_north']].forEach(([loc, id]) => {
  if(LOCATIONS[loc] && LOCATIONS[loc].spots && !LOCATIONS[loc].spots.some(s => s.id===id))
    LOCATIONS[loc].spots.push({id, kind:'convoy', n:'Lady Delilah\'s Convoy Desk', icon:'📦', desc:'Supply work for the frontier: escorts, shipments, audits and urgent reallocations.', needFlag:'delilah_wife', lockMsg:'🔒 Delilah has no office yet'});
});
deed('convoy1', 'hunt', 'The first train', '🚚', 'A convoy desk job was finished.', () => !!(G.convoy && G.convoy.done >= 1));
deed('convoy10', 'hunt', 'Supplies where they were needed', '📦', 'Ten convoy desk jobs were finished.', () => !!(G.convoy && G.convoy.done >= 10));
