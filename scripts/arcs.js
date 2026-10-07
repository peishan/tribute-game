/* =====================================================================
   TRIBUTE — ARC SPLASH SCREENS
   A full-screen splash when a new arc begins (Crimson Tide style). Seen arcs are saved in G.arcSeen and can be viewed again
   from the Cast tab. Arc boundaries are PROVISIONAL (author to confirm): the splash for arc N appears after the chapter listed.
     Arc I   The Hidden Isle        : the start of a new journey
     Arc II  The Dragonvale Court   : after ch42 (Sky falls, the party goes to Dragonvale)
     Arc III The Truth Beneath Tribute : after ch86 (farewell to Dragonvale, return to Tribute)
     Arc IV  The Forgotten Valen Legacy : after ch103 (leave Tribute for the west)
     Arc V   The Broken Seals : after ch121 (ch122 The First Omen begins it); the arc concludes at ch145
   ===================================================================== */
const ARCS = [
  {n:1, title:'The Hidden Isle', img:'assets/arcs/arc1.webp', after:-1},
  {n:2, title:'The Dragonvale Court', img:'assets/arcs/arc2.webp', after:42},
  {n:3, title:'The Truth Beneath Tribute', img:'assets/arcs/arc3.webp', after:86},
  {n:4, title:'The Forgotten Valen Legacy', img:'assets/arcs/arc4.webp', after:103, cast:'assets/arcs/arc4_cast.webp', castCh:121},
  {n:5, title:'The Broken Seals', img:'assets/arcs/arc5.webp', after:121, cast:'assets/arcs/arc5_cast.webp', castCh:145},   // Arc V runs from ch122 to ch145 (per the author)
];
const ARC_ROMAN = ['','I','II','III','IV','V'];
function arcFor(afterCh){ return ARCS.find(a => a.after === afterCh); }
function showArc(n, manual, cast){
  const a = ARCS.find(x => x.n===n), el = $('arcpop'); if(!a || !el) return;
  if(cast && !(a.cast && G.ch >= a.castCh)) return;
  if(!G.arcSeen) G.arcSeen = {};
  if(!cast){ G.arcSeen[n] = true; if(!manual) save(); }
  el.innerHTML = `<div class="arcbox"><img src="${cast?a.cast:a.img}" alt="Arc ${ARC_ROMAN[n]}: ${a.title}${cast?' cast':''}"><button class="pri" onclick="closeArc()">${manual?'Close':'Continue'}</button></div>`;
  el.classList.add('on');
}
function closeArc(){ const el = $('arcpop'); if(el){ el.classList.remove('on'); el.innerHTML = ''; } }
function arcAfterChapter(n){ const a = arcFor(n); if(a && G.arcSeen && !G.arcSeen[a.n]) setTimeout(() => showArc(a.n), 400); else if(a && !G.arcSeen) setTimeout(() => showArc(a.n), 400); }
function arcOnNewGame(){ setTimeout(() => showArc(1), 300); }
function rArcGallery(){
  const seen = G.arcSeen || {};
  return `<h4>Arc covers</h4><div class="row" style="flex-wrap:wrap">${ARCS.map(a => seen[a.n] ? `<button onclick="showArc(${a.n},true)">Arc ${ARC_ROMAN[a.n]} · ${a.title}</button>` : `<button disabled>Arc ${ARC_ROMAN[a.n]} · ???</button>`).join('')}${ARCS.filter(a => a.cast).map(a => seen[a.n] && G.ch >= a.castCh ? `<button onclick="showArc(${a.n},true,true)">Arc ${ARC_ROMAN[a.n]} cast</button>` : `<button disabled>Arc ${ARC_ROMAN[a.n]} cast · ???</button>`).join('')}</div>`;
}
