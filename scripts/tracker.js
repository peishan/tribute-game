/* =====================================================================
   TRIBUTE — SIDE QUEST TRACKER (Crimson Tide style popup)
   A slide-in panel on the right that lists active missions, contracts and bounties with progress,
   so you can check them from any tab. Toggle with the 📜 button in the top bar.
   ===================================================================== */
let trackerOpen = false;
function toggleTracker(){ trackerOpen = !trackerOpen; renderTracker(); }
function trackerCount(){
  if(!G || !G.quests) return 0;
  return MISSIONS.filter(m => mState(m.id)==='active').length + G.quests.active.length + (G.bounties ? G.bounties.list.filter(b => !b.done && b.c>0).length : 0);
}
function renderTracker(){
  const el = $('tracker'); if(!el || !G || !G.quests) return;
  const btn = $('trkbtn'); if(btn) btn.innerHTML = '📜' + (trackerCount() ? '<b class="trkn">'+trackerCount()+'</b>' : '');
  el.classList.toggle('open', trackerOpen);
  if(!trackerOpen){ el.innerHTML = ''; return; }
  const ms = MISSIONS.filter(m => mState(m.id)==='active').map(m =>
    `<div class="trk"><b>📜 ${m.title}</b><div class="sm">${missionProgress(m) || (m.obj.type==='reach' ? 'Travel to '+LOCATIONS[m.obj.loc].n : m.obj.type==='boss' ? 'Defeat the target' : 'In progress')}</div></div>`).join('');
  const qs = G.quests.active.map(q => {
    const prog = q.type==='collect' ? Math.min(G.inv[q.item]||0, q.need)+'/'+q.need+' in pack' : q.type==='deliver' ? '📮 Deliver to '+LOCATIONS[q.to].n : q.c+'/'+q.need;
    return `<div class="trk"><b>${q.icon} ${q.name}</b><div class="sm">${prog}</div></div>`; }).join('');
  const open = (G.bounties ? G.bounties.list : []).filter(b => !b.done), live = open.filter(b => b.c>0), idle = open.length - live.length;
  const bs = live.map(b => `<div class="trk"><b>${b.icon} ${b.name}</b><div class="sm">${b.c}/${b.need}</div></div>`).join('');
  el.innerHTML = `<div class="trkh"><b>Quest Log</b><button onclick="toggleTracker()">✕</button></div>
    ${typeof evilsOpen==='function' && evilsOpen() ? `<div class="trk"><b>🕯️ The Fifteen Evils</b><div class="sm">${evilsResolved()}/15 resolved</div></div>` : ''}<h5>Missions</h5>${ms||'<div class="sm">None</div>'}<h5>Contracts ${G.quests.active.length}/${MAX_QUESTS}</h5>${qs||'<div class="sm">None. Take some from a Quest Board.</div>'}
    <h5>Bounties</h5>${bs}${idle?`<div class="sm">${idle} more posted. Just hunt the targets.</div>`:(bs?'':'<div class="sm">None</div>')}<div class="sm" style="margin-top:6px">Boards refresh daily; bounties every 2 days.</div>`;
}
