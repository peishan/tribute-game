/* =====================================================================
   TRIBUTE — MUSIC (assets/audio/*.mp3, eight tracks, 96 kbps, levelled to the same loudness)
   One track plays at a time and crossfades when the mood changes. The mood comes from where the player is and what they are doing (musicContext). Change which track plays where in MUSIC_MAP.
   Browsers only allow sound after a tap or key press, so the music starts on the first one. The 🎵 button (top bar) turns it on and off; volume is in the Save tab. Both are remembered per device.
     battle   ordinary fights               boss     boss fights and every Crimson Horizon crew fight (ambushes use battle)
     dragon   Dragonvale and its court      town     settlements elsewhere (town / hub / harbour)
     cozy     taverns, homes, pavilions     sea      the Crimson Horizon sequel (tab and places)
     fae      the Fae Pool                  calm     menus, the journal and reading
     explore  everywhere else (alternates)
   ===================================================================== */
const MUSIC_TRACKS = {
  forest:{src:'assets/audio/forest.mp3', n:'Shadow of the Ancient Forest'}, elven:{src:'assets/audio/elven.mp3', n:'Under the Elven Star'},
  mountain:{src:'assets/audio/mountain.mp3', n:'Along the Mountain Path'}, village:{src:'assets/audio/village.mp3', n:'Raining Village'},
  cozy:{src:'assets/audio/cozy.mp3', n:'At the Side of a Village'}, tree:{src:'assets/audio/tree.mp3', n:'The Tree of Life'},
  mithral:{src:'assets/audio/mithral.mp3', n:'Finding Mithral'}, ruby:{src:'assets/audio/ruby.mp3', n:'Fantasy RPG Exploration'},
};
const MUSIC_MAP = {battle:['forest'], boss:['elven'], dragon:['mountain'], town:['village'], cozy:['cozy'], sea:['mithral'], fae:['elven','tree'], calm:['tree'], explore:['ruby','mithral']};
const MUSIC_COZY_SPOTS = ['tavern','salon','base','goldhome','family','pavilion','clinic','fireflies'];
const MUSIC_CALM_TABS = ['journal','party','cast','bonds','missions','rewards','network','inventory','bestiary','equipment','save','training'];
let musicOn = true, musicVol = .4, musicCtx = null, musicKey = null, musicA = null, musicFade = null, musicUnlocked = false;
try{ musicOn = localStorage.getItem('tribute_music_on') !== '0'; const v = parseFloat(localStorage.getItem('tribute_music_vol')); if(v >= 0 && v <= 1) musicVol = v; }catch(e){}
function musicContext(){
  if(typeof HB !== 'undefined' && HB) return HB.boss && HB.boss.ambush ? 'battle' : 'boss';
  if(tab === 'battle' && typeof B !== 'undefined' && B) return B.foes && B.foes.some(f => f.boss) ? 'boss' : 'battle';
  if(tab === 'horizon') return 'sea';
  const L = G && LOCATIONS[G.loc], region = L && L.region;
  if(tab === 'here' && typeof spotOpen !== 'undefined' && spotOpen && L){ const sp = L.spots.find(s => s.id === spotOpen); if(sp && MUSIC_COZY_SPOTS.includes(sp.kind)) return 'cozy'; }
  if(MUSIC_CALM_TABS.includes(tab)) return 'calm';
  if(region === 'horizon') return 'sea';
  if(region === 'dragon') return 'dragon';
  if(region === 'faepool') return 'fae';
  if(L && isSettlement(G.loc)) return 'town';
  return 'explore';
}
function musicPick(ctx){
  const list = MUSIC_MAP[ctx] || MUSIC_MAP.explore, others = list.filter(k => k !== musicKey);
  const pool = others.length ? others : list; return pool[Math.floor(Math.random() * pool.length)];
}
function musicFadeTo(a, to, ms, done){
  clearInterval(a._f); const from = a.volume, steps = Math.max(1, Math.round(ms / 50)); let i = 0;
  a._f = setInterval(() => { i++; a.volume = Math.max(0, Math.min(1, from + (to - from) * i / steps)); if(i >= steps){ clearInterval(a._f); if(done) done(); } }, 50);
}
function musicPlay(key){
  const t = MUSIC_TRACKS[key]; if(!t || !musicOn) return;
  const old = musicA, a = new Audio(t.src); a.preload = 'auto'; a.loop = false; a.volume = 0; musicA = a; musicKey = key;
  a.addEventListener('ended', () => { if(musicA === a) musicPlay(musicPick(musicCtx)); });   // the next track in this mood (or the same one again when it is the only one)
  const p = a.play();
  if(p && p.catch) p.catch(() => { musicUnlocked = false; });   // blocked until a tap: musicKick retries
  musicFadeTo(a, musicVol, 1200);
  if(old){ musicFadeTo(old, 0, 900, () => { old.pause(); old.src = ''; }); }
}
function musicSync(){
  const btn = $('musicbtn'); if(btn) btn.textContent = musicOn ? '🎵' : '🔇';
  if(!G || !musicOn){ if(musicA && !musicA.paused){ const o = musicA; musicFadeTo(o, 0, 500, () => o.pause()); musicA = null; musicKey = null; musicCtx = null; } return; }
  const ctx = musicContext();
  if(ctx === musicCtx && musicA) return;
  musicCtx = ctx; musicPlay(musicPick(ctx));
}
function musicKick(){   // first tap or key press: sound is allowed from here on
  musicUnlocked = true;
  if(musicOn && musicA && musicA.paused){ musicA.play().catch(() => {}); musicFadeTo(musicA, musicVol, 800); }
  else if(musicOn && !musicA && G) musicSync();
}
function musicToggle(){ musicOn = !musicOn; try{ localStorage.setItem('tribute_music_on', musicOn ? '1' : '0'); }catch(e){} musicUnlocked = true; if(musicOn) musicCtx = null; musicSync(); if(tab === 'save') render(); }
function musicVolume(v){ musicVol = Math.max(0, Math.min(1, v/100)); try{ localStorage.setItem('tribute_music_vol', String(musicVol)); }catch(e){} if(musicA){ clearInterval(musicA._f); musicA.volume = musicVol; } }
function musicPanel(){
  const t = musicKey && MUSIC_TRACKS[musicKey];
  return `<div class="panel"><h3>🎵 Music</h3><div class="sm">Eight tracks that change with where you are and what you are doing: fights, boss fights, Dragonvale, towns, the sea of Crimson Horizon, and quiet menus.</div>
   <div class="row" style="margin-top:6px;align-items:center;gap:8px"><button onclick="musicToggle()">${musicOn ? '🎵 On' : '🔇 Off'}</button><label class="sm" style="flex:1">Volume <input type="range" min="0" max="100" value="${Math.round(musicVol*100)}" oninput="musicVolume(this.value)" style="width:60%;vertical-align:middle"></label></div>
   <div class="sm" style="margin-top:4px">${musicOn && t ? 'Now playing: <b>'+t.n+'</b> ('+(musicCtx||'')+')' : musicOn ? 'Starts after your first tap.' : 'Music is off.'}</div></div>`;
}
(function(){
  const _r = render; render = function(){ const r = _r.apply(this, arguments); try{ musicSync(); }catch(e){} return r; };
  const _s = rSave; rSave = function(){ return _s.apply(this, arguments) + musicPanel(); };
  ['pointerdown','keydown'].forEach(ev => document.addEventListener(ev, function once(){ musicKick(); }, {passive:true}));
})();
