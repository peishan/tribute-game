/* =====================================================================
   TRIBUTE — ARC SPLASH SCREENS
   A full-screen splash when a new arc begins (Crimson Tide style). Seen arcs are saved in G.arcSeen and can be viewed again
   from the Cast tab. Arc boundaries are PROVISIONAL (author to confirm): the splash for arc N appears after the chapter listed.
     Arc I   The Hidden Isle        : the start of a new journey
     Arc II  The Dragonvale Court   : after ch42 (Sky falls, the party goes to Dragonvale)
     Arc III The Truth Beneath Tribute : after ch86 (farewell to Dragonvale, return to Tribute)
     Arc IV  The Forgotten Valen Legacy : after ch103 (leave Tribute for the west)
     Arc VI  (title and cover pending) : begins with ch147 (The Fifteen Names); add the entry after ch146 once assets/arcs/arc6.webp exists
     Arc V   The Broken Seals : after ch121 (ch122 The First Omen begins it); the arc concludes at ch146 (The Truth Before the Curse)
   ===================================================================== */
const ARCS = [
  {n:1, title:'The Hidden Isle', img:'assets/arcs/arc1.webp', after:-1},
  {n:2, title:'The Dragonvale Court', img:'assets/arcs/arc2.webp', after:42},
  {n:3, title:'The Truth Beneath Tribute', img:'assets/arcs/arc3.webp', after:86},
  {n:4, title:'The Forgotten Valen Legacy', img:'assets/arcs/arc4.webp', after:103, cast:'assets/arcs/arc4_cast.webp', castCh:121},
  {n:5, title:'The Broken Seals', img:'assets/arcs/arc5.webp', after:121, cast:'assets/arcs/arc5_cast.webp', castCh:146},   // Arc V runs from ch122 to ch146 (per the pages)
  {n:6, title:'The Fifteen Evils', img:'assets/arcs/arc6.webp', after:146},
  {n:7, title:'The Sunken Crown', img:'assets/arcs/arc7.webp', after:166, cast:'assets/arcs/arc7_cast.webp', castCh:185},   // begins with ch167 (The Message from Dragonvale)   // begins with ch147; the tagline on the cover: "A name is not the same as the truth"
  {n:8, title:'The Impossible Entry', img:'assets/arcs/arc8.webp', after:185},   // begins with ch186
  {n:9, title:'The Forgotten Alliance', img:'assets/arcs/arc9.webp', after:210},   // ch211-235
  {n:11, title:'The Vanishing of Lady Veyne', img:'assets/arcs/arc11.webp', after:262},
  {n:12, title:'New Horizons', img:'assets/arcs/arc12.webp', after:286},   // ch287-311
  {n:13, title:'Blood of the Western Stars', img:'assets/arcs/arc13.webp', after:311},   // ch312-336 (the regenerated cover carries this title)   // ch263-286 (no Arc X cover yet; the Arc XI cover reads "Arc X" in its subtitle: a generation slip)
  {n:14, title:'The House of Dee', img:'assets/arcs/arc14.webp', after:336},   // ch337-361
  {n:15, title:'The Crown He Must Choose', img:'assets/arcs/arc15.webp', after:361},   // ch362-386: Aster's Crown Princess selection and the Xuanji genealogy
  {n:16, title:'The Lost Princess', img:'assets/arcs/arc16.webp', after:386},   // ch387-411 (412 is the aftermath)
  {n:17, title:'The Princess Behind the Name', img:'assets/arcs/arc17.webp', after:411},   // ch412-436: Sally, Levi and the lost princess
  {n:18, title:'The Man Who Returned', img:'assets/arcs/arc18.webp', after:436},   // ch437 onward: Levi declared alive, the Stanson house, the search for Zhaohua
];
/* End-of-arc splash (author): after ch436 the Levi and Sally relationship route starts and Sally rejoins for good. The caption is drawn over the art. */
const ARC_END_SPLASH = [ {key:'17end', after:436, img:'assets/arcs/arc17_end.webp', title:'Levi and Sally: a relationship route has begun', text:'Levi and Sally: a relationship route has begun.', sub:'Their story now moves between the two of them. Welcome Sally back as a permanent member of the party.'} ];
const ARC_ROMAN = ['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII'];
// Arc IX, "The Forgotten Alliance" (the author's canon title): begins with ch211 and ends with ch235 (the royal wedding is ch234); add {n:9, title:'The Forgotten Alliance', img:'assets/arcs/arc9.webp', after:210} once the splash art exists.
function arcFor(afterCh){ return ARCS.find(a => a.after === afterCh); }
function showArc(n, manual, cast){
  const a = ARCS.find(x => x.n===n), el = $('arcpop'); if(!a || !el) return;
  if(cast && !(a.cast && G.ch >= a.castCh)) return;
  if(!G.arcSeen) G.arcSeen = {};
  if(!cast){ G.arcSeen[n] = true; if(!manual) save(); }
  el.innerHTML = `<div class="arcbox"><img src="${cast?a.cast:a.img}" alt="Arc ${ARC_ROMAN[n]}: ${a.title}${cast?' cast':''}"><button class="pri" onclick="closeArc()">${manual?'Close':'Continue'}</button></div>`;
  el.classList.add('on');
}
function closeArc(){ const el = $('arcpop'); if(el){ el.classList.remove('on'); el.innerHTML = ''; } if(ARC_QUEUE){ const q = ARC_QUEUE; ARC_QUEUE = null; setTimeout(() => showArc(q), 250); } }
function showArcEnd(key, manual){
  const a = ARC_END_SPLASH.find(x => x.key===key), el = $('arcpop'); if(!a || !el) return;
  if(!G.arcSeen) G.arcSeen = {};
  G.arcSeen[key] = true; if(!manual) save();
  el.innerHTML = `<div class="arcbox"><div style="position:relative;display:inline-block"><img src="${a.img}" alt="${a.title}"><div style="position:absolute;left:0;right:0;bottom:0;padding:34px 14px 14px;text-align:center;background:linear-gradient(transparent,rgba(10,6,18,.86));color:#fff;text-shadow:0 1px 4px #000"><b style="font-size:1.15em;color:var(--gold)">💞 ${a.text}</b><div>${a.sub}</div></div></div><button class="pri" onclick="closeArc()">${manual?'Close':'Continue'}</button></div>`;
  el.classList.add('on');
}
let ARC_QUEUE = null;   // an arc cover waiting for the end-of-arc splash to be closed
function arcAfterChapter(n){
  const e = ARC_END_SPLASH.find(x => x.after===n), a = arcFor(n), cover = a && !(G.arcSeen && G.arcSeen[a.n]);
  if(e && !(G.arcSeen && G.arcSeen[e.key])){ if(cover) ARC_QUEUE = a.n; setTimeout(() => showArcEnd(e.key), 400); }   // the end of an arc first, then the next arc's cover
  else if(cover) setTimeout(() => showArc(a.n), 400);
}
function arcOnNewGame(){ setTimeout(() => showArc(1), 300); }
function rArcGallery(){
  const seen = G.arcSeen || {};
  return `<h4>Arc covers</h4><div class="row" style="flex-wrap:wrap">${ARCS.map(a => seen[a.n] ? `<button onclick="showArc(${a.n},true)">Arc ${ARC_ROMAN[a.n]} · ${a.title}</button>` : `<button disabled>Arc ${ARC_ROMAN[a.n]} · ???</button>`).join('')}${ARC_END_SPLASH.map(a => seen[a.key] ? `<button onclick="showArcEnd('${a.key}',true)">${a.text}</button>` : '').join('')}${ARCS.filter(a => a.cast).map(a => seen[a.n] && G.ch >= a.castCh ? `<button onclick="showArc(${a.n},true,true)">Arc ${ARC_ROMAN[a.n]} cast</button>` : `<button disabled>Arc ${ARC_ROMAN[a.n]} cast · ???</button>`).join('')}</div>${typeof G!=='undefined' && G.weddingDay!==undefined ? `<div class="row" style="margin-top:6px"><button onclick="showWedding()">🧧 The Royal Wedding</button></div>` : ''}`;
}
