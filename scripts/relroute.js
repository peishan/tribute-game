/* =====================================================================
   TRIBUTE — RELATIONSHIP ROUTES (main cast only: Jade, Devon, Levi, Sky, Sally)
   A story ladder for one pair at a time. The STAGE comes only from story flags (so it also works for saves that are already past those
   chapters); it never moves from grinding. "Spend time" is once a day per pair: a small scene and a Shared Moment, flavoured by the stage, with
   no points and no bonus (the routes are story-only). Add a row to REL_ROUTES to track another pair: members, an open() test, and stages
   [{n: stage name, flag: the story flag that reaches it}] in order (the first stage needs no flag).
   State: G.relroute = { key: {last: day, shown: stage already announced, started: true} }.  Moments are stored in G.moments with t:'rel_'+key.
   Hidden: a route does not appear until its open() is true. Adrian, Hugh and the other royals are deliberately not tracked here.
   ===================================================================== */
const REL_ROUTES = {
  levi_sally:{ label:'Levi & Sally', icon:'💞', members:['levi','sally'],
    open:() => !!G.flags.sally_rejoins, begun:'Levi and Sally: a relationship route has begun.',
    note:'No titles and no promises: how far this goes is the story\'s to say.',
    stages:[
      {n:'Old friends and colleagues'},
      {n:'Careful with each other', flag:'sally_confronts_levi'},
      {n:'One night, no labels', flag:'gate_tavern_night'},
      {n:'No titles, no promises', flag:'morning_without_promises'},
      {n:'Something real', flag:'levi_not_regret'},
      {n:'More than friendship, no name yet', flag:'sally_rejoins'},
    ],
    lines:[
      ['Two old friends share a table and an easy silence.','Levi talks shop; Sally pretends not to be listening for the pauses.'],
      ['They talk carefully, the way people do around a question neither has asked.','Sally watches him choose his words and says nothing.'],
      ['A drink, a quiet corner, nothing owed.','Neither of them mentions the night out beyond the gates, which is how they both mention it.'],
      ['No titles, no promises: they keep it exactly as light as they agreed.','Sally says "you said that last time"; Levi says "that was different".'],
      ['What they shared was real, and they both say so without saying it.','Levi stays a little longer than he meant to.'],
      ['Time, patiently given. Neither asks the other to hurry.','More than friendship, less than a name: they let it be what it is.'],
    ] },
  jade_devon:{ label:'Jade & Devon', icon:'🐉', members:['jade','devon'],
    open:() => isRecruited('devon') && G.ch >= 54, begun:'',
    note:'Husband and wife, and still partners in the field.',
    stages:[
      {n:'Partners in the field'},
      {n:'Husband and wife', flag:'husband_wife_truth'},
    ],
    lines:[
      ['They plan the next step over maps and cold tea.','A sparring match that neither of them lets the other win.'],
      ['Married, and still arguing about the route.','Devon passes Jade the tea before she asks; she pretends not to notice.'],
    ] },
};
function relRouteStage(k){ const R = REL_ROUTES[k]; let s = 0; R.stages.forEach((st,i) => { if(!st.flag || G.flags[st.flag]) s = i; }); return s; }
const relRouteOpen = k => { const R = REL_ROUTES[k]; try{ return !!R.open() && R.members.every(id => isRecruited(id) || id==='jade'); }catch(e){ return false; } };
function relRouteState(k){ if(!G.relroute) G.relroute = {}; if(!G.relroute[k]) G.relroute[k] = {last:-1, shown:-1, started:false}; return G.relroute[k]; }
/* called from completeChapter after the chapter's flags are set: announces a route beginning and any new stage */
function relRouteChapter(){
  const msgs = [];
  Object.keys(REL_ROUTES).forEach(k => { if(!relRouteOpen(k)) return; const R = REL_ROUTES[k], st = relRouteState(k), now = relRouteStage(k);
    if(!st.started){ st.started = true; if(R.begun) msgs.push('💞 '+R.begun); if(R.begun && typeof chronicle==='function') chronicle(R.begun, '💞'); st.shown = now; return; }
    if(now > st.shown){ st.shown = now; msgs.push('💞 '+R.label+': '+R.stages[now].n+'.'); if(typeof chronicle==='function') chronicle(R.label+': '+R.stages[now].n+'.', '💞'); } });
  return msgs;
}
function relRouteLock(k){
  const R = REL_ROUTES[k], st = relRouteState(k);
  if(st.last === G.day) return 'Already today';
  if(!R.members.every(id => id==='jade' || (G.party.includes(id) && !isDisabled(id)))) return 'Not both of them are with you';
  return '';
}
function relRouteSpend(k){
  const R = REL_ROUTES[k]; if(!R || !relRouteOpen(k) || relRouteLock(k)) return [];
  const st = relRouteState(k), s = relRouteStage(k), pool = R.lines[s] || R.lines[R.lines.length-1], line = pool[Math.floor(Math.random()*pool.length)];
  st.last = G.day; if(!G.moments) G.moments = []; G.moments.push({t:'rel_'+k, a:String(s), d:G.day}); if(G.moments.length > MOMENTS_MAX) G.moments.splice(0, G.moments.length - MOMENTS_MAX);
  return ['💞 '+line].concat(advanceDay(1));
}
function rRelRoutes(){
  const keys = Object.keys(REL_ROUTES).filter(relRouteOpen); if(!keys.length) return '';
  return `<h4>💞 Relationships</h4><div class="sm">The main cast's own stories. Each stage comes from the story, never from grinding. Spending time (once a day) is only a moment together.</div>`+keys.map(k => { const R = REL_ROUTES[k], s = relRouteStage(k), lock = relRouteLock(k), n = (G.moments||[]).filter(m => m.t==='rel_'+k).length;
    const next = R.stages[s+1];
    return `<div class="panel"><b>${R.icon} ${R.label}</b> <span class="sm">· ${R.stages[s].n}</span>
      <div class="sm">${R.stages.map((st,i) => i<=s ? '●' : '○').join(' ')} &nbsp; ${next ? 'Next: '+(G.flags[next.flag] ? next.n : '???') : 'The story has taken this as far as it has gone, for now.'}</div>
      <div class="sm" style="margin:4px 0">${R.note}</div>
      <div class="row" style="margin-top:6px"><button ${lock?'disabled':''} title="${lock}" onclick="act(relRouteSpend,'${k}')">🕯️ Spend time together</button></div>${n?`<div class="sm" style="margin-top:4px">Shared moments: ${n}</div>`:''}</div>`; }).join('');
}
