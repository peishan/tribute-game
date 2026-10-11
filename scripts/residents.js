/* =====================================================================
   TRIBUTE — RESIDENTS OF THE HOUSE (a light settlement system, in the spirit of Whiteout Survival's survivors)
   Each home (Gold Manor, Devon's Palace) takes in residents who ARRIVE and may LEAVE. Every resident has a trade (it matches one of the five wings), a MOOD
   (0-100, shown as words), and a home. The household has a CAPACITY (rooms) that grows with the wings you build.
   ARRIVALS: every few days a traveller asks to stay, while there is a free room; contented homes and higher renown draw them faster.
   MOOD moves a little each in-game day toward a target: the more wings built (and the Contentment of the household), the higher; a meal shared at the house
     (20 gold, once a day: +12 to everyone) and listening to a resident (free, once a day: +8 to one) lift it; a long absence (14+ days since the party last stayed)
     lets it sag; a crowded house (more residents than rooms) pulls it down.
   LEAVING: a resident whose mood stays under 30 for three days quietly leaves; one who has been here 45+ days may move on, if not Thriving. Nothing is ever lost:
     wings keep their levels, residents who left may return later, and nobody leaves angry (they always say why).
   WORK: a content resident (mood 60+) working in a wing adds +1 (up to +2 per wing) to that wing's level for the DAILY claims only (herbs, training), not to
     the permanent perks. Thriving households (average 85+) sometimes leave a gift.
   State: G.res = { homeId: [ {n, job, mood, since, low} ] }, G.resDay (last processed day), G.resLast (last day the party was at a home), G.resFed, G.resListen.
   Wording and numbers are first-pass.
   ===================================================================== */
const RES_MOODS = [[0,'Miserable'],[20,'Unhappy'],[40,'Uneasy'],[60,'Content'],[80,'Happy'],[92,'Thriving']];
const resMoodWord = m => { let w = RES_MOODS[0][1]; RES_MOODS.forEach(([v, n]) => { if(m >= v) w = n; }); return w; };
const resMoodIcon = m => m >= 80 ? '😄' : m >= 60 ? '🙂' : m >= 40 ? '😐' : m >= 20 ? '😟' : '😢';
const RES_JOBS = [  // [description, wing]
  ['a scholar', 'study'], ['a copyist', 'study'], ['a herbalist', 'apothecary'], ['a healer\'s apprentice', 'apothecary'], ['a smith', 'workshop'], ['a carpenter', 'workshop'],
  ['a stable hand', 'stables'], ['a carter', 'stables'], ['a retired guard', 'yard'], ['a drill sergeant', 'yard']];
const RES_WHY = ['{n} has taken the road again: the house felt unlooked-after for too long.','{n} left a note: "Thank you for the roof. I need somewhere that feels lived in."','{n} has moved on; the rooms were crowded and the days long.'];
const RES_ARRIVE = ['asks for a room after a long road','arrives with a bundle and a letter of reference','is sent by a village that had no work for them','turns up at the gate, hopeful'];
const resData = () => { if(!G.res) G.res = {}; return G.res; };
const resList = id => { const d = resData(); if(!d[id]) d[id] = []; return d[id]; };
const resCapacity = id => 2 + Math.floor(WING_IDS.reduce((s, w) => s + estLv(id, w), 0)/2);   // 2 rooms, +1 for every 2 wing levels (up to 17)
const resAvg = id => { const l = resList(id); return l.length ? Math.round(l.reduce((a, r) => a + r.mood, 0)/l.length) : 0; };
const resWingBonus = (id, w) => Math.min(2, resList(id).filter(r => r.job[1]===w && r.mood >= 60).length);
function resTarget(id){
  let t = 40 + Math.min(24, Math.round(WING_IDS.reduce((s, w) => s + estLv(id, w), 0)*1.2));
  if(G.resFed && G.resFed[id] !== undefined && G.day - G.resFed[id] <= 3) t += 10;
  if(typeof ways==='function' && ways().folk > 2) t += 3;                          // a household that values common folk
  const away = G.day - (G.resLast || G.day); if(away > 14) t -= 12;
  if(resList(id).length > resCapacity(id)) t -= 10;
  return Math.max(0, Math.min(100, t));
}
function resNewcomer(id, d){
  const used = resList(id).map(r => r.n), pool = HOUSE_NAMES.filter(n => !used.includes(n)); if(!pool.length) return null;
  const n = pool[Math.floor(Math.random()*pool.length)], job = RES_JOBS[Math.floor(Math.random()*RES_JOBS.length)];
  return {n, job, mood:55, since:G.day, low:0};
}
function residentsSync(){
  if(!G || typeof G.day !== 'number' || !G.flags) return;
  const here = typeof baseHere==='function' ? baseHere() : null; if(here) G.resLast = G.day;
  if(G.resDay === undefined){ G.resDay = G.day; return; }
  let steps = Math.min(30, G.day - G.resDay); if(steps <= 0) return;
  G.resDay = G.day;
  for(let s = 0; s < steps; s++){
    const d = G.day - steps + s + 1;   // the day being processed
    Object.keys(ESTATES).forEach(id => {
      if(!estateOpen(id)) return;
      const L = resList(id), t = resTarget(id);
      L.forEach(r => { r.mood += r.mood < t ? Math.min(3, t - r.mood) : -Math.min(2, r.mood - t); r.mood = Math.max(0, Math.min(100, r.mood)); r.low = r.mood < 30 ? r.low+1 : 0; });
      // leaving
      for(let i = L.length-1; i >= 0; i--){ const r = L[i];
        const gone = r.low >= 3 || (d - r.since >= 45 && r.mood < 92 && Math.random() < .05);
        if(gone){ const why = r.low >= 3 ? RES_WHY[Math.floor(Math.random()*RES_WHY.length)].replace('{n}', r.n) : r.n+', '+r.job[0]+', has moved on after a long stay, with thanks.'; L.splice(i, 1); chronicle(why.replace(/^\{n\}/, r.n), '🏡'); toast('🏡 '+r.n+' has left '+ESTATES[id].n); }
      }
      // arriving
      const next = (G.resNext||(G.resNext = {}))[id];
      if(next === undefined){ G.resNext[id] = d + 2; }
      else if(d >= next && L.length < resCapacity(id)){
        const nc = resNewcomer(id, d); if(nc){ L.push(nc); chronicle(nc.n+', '+nc.job[0]+', '+RES_ARRIVE[Math.floor(Math.random()*RES_ARRIVE.length)]+' at '+ESTATES[id].n+' and is given a room.', '🏡'); toast('🏡 '+nc.n+', '+nc.job[0]+', has arrived at '+ESTATES[id].n); }
        const avg = resAvg(id), speed = avg >= 80 ? 3 : avg >= 60 ? 4 : 6, rk = typeof rankIdx==='function' ? Math.min(2, Math.floor(rankIdx()/3)) : 0;
        G.resNext[id] = d + Math.max(2, speed + 1 + Math.floor(Math.random()*4) - rk);
      } else if(d >= next) G.resNext[id] = d + 3;
      // a thriving household sometimes leaves a gift
      if(L.length >= 3 && resAvg(id) >= 85 && Math.random() < .04){ addItems([{id:'forest_herb', qty:2}]); G.gold += 30; toast('🏡 The residents of '+ESTATES[id].n+' leave a gift: herbs and a little gold.'); }
    });
  }
  save();
}
function resFeed(id){
  if(baseHere()!==id) return ['You must be at the house.'];
  if(G.resFedToday === G.day+':'+id) return ['The residents have already shared a meal today.'];
  if(G.gold < 20) return ['A shared meal costs 20 gold.'];
  if(!resList(id).length) return ['No one is living here yet.'];
  G.gold -= 20; if(!G.resFed) G.resFed = {}; G.resFed[id] = G.day; G.resFedToday = G.day+':'+id;
  resList(id).forEach(r => { r.mood = Math.min(100, r.mood + 12); r.low = 0; });
  save(); return ['🍲 The household shares a meal. Everyone is a little brighter (+12 mood).'];
}
function resListen(id, i){
  if(baseHere()!==id) return ['You must be at the house.'];
  const r = resList(id)[i]; if(!r) return [];
  const key = 'resl_'+id+'_'+r.n; if(G.bondDay[key] === G.day) return [r.n+' has already spoken with you today.'];
  G.bondDay[key] = G.day; r.mood = Math.min(100, r.mood + 8); r.low = 0;
  const lines = ['The roof leaks over the east room, but it is a good roof.','Back home I would have been drilling at dawn. Here, the tea is better.','I did not think anyone would ask how I was.','If there is work for me, I would be glad of it.'];
  save(); return ['💬 '+r.n+': "'+lines[Math.floor(Math.random()*lines.length)]+'" (+8 mood)'];
}
function rResidents(){
  const id = baseHere(); if(!id || !estateOpen(id)) return '';
  const L = resList(id), cap = resCapacity(id), avg = resAvg(id), fedToday = G.resFedToday === G.day+':'+id;
  return `<h4>🏘️ Residents</h4><div class="sm">${L.length} of ${cap} rooms taken${L.length ? ' · Household: <b>'+resMoodIcon(avg)+' '+resMoodWord(avg)+'</b> ('+avg+')' : ''}. Travellers arrive while there is a free room; more wings mean more rooms. A shared meal and a kind word keep the household content. A neglected house loses residents, but nothing you built is ever lost.</div>`
   + `<div class="row" style="margin:6px 0"><button ${fedToday||G.gold<20||!L.length?'disabled':''} onclick="act(resFeed,'${id}')">🍲 Share a meal (20g)</button></div>`
   + (L.length ? L.map((r, i) => `<div class="ev"><div><b>${r.n}</b> <span class="sm">· ${r.job[0]} · works the ${WINGS[r.job[1]].n.toLowerCase()}</span><div class="sm">${resMoodIcon(r.mood)} ${resMoodWord(r.mood)} (${r.mood}) · here ${G.day - r.since} days</div></div><button ${G.bondDay['resl_'+id+'_'+r.n]===G.day?'disabled':''} onclick="act(resListen,'${id}',${i})">Listen</button></div>`).join('') : '<div class="sm">No one is living here yet. A traveller will ask for a room soon.</div>');
}
deed('res_first', 'home', 'A full table', '🏘️', 'The first resident joined a household.', () => Object.keys(ESTATES).some(id => resList(id).length));
deed('res_happy', 'home', 'A happy house', '😄', 'A household of three or more reached a Happy mood.', () => Object.keys(ESTATES).some(id => resList(id).length >= 3 && resAvg(id) >= 80));
deed('res_full', 'home', 'No empty rooms', '🏘️', 'Every room of a household is taken.', () => Object.keys(ESTATES).some(id => resList(id).length >= resCapacity(id) && resCapacity(id) >= 5));
