/* =====================================================================
   TRIBUTE — STORY POPUPS (like Crimson Tide's Story Mode)
   Full-screen reader: one comic page at a time, counter, prev/next (buttons, arrow keys, swipe),
   end screen with the chapter action, and a "Chapter Complete" popup (rewards + unlocks).
   Opens automatically the first time a chapter is opened; always available via "Read story".
   ===================================================================== */
let S = null;   // {n, i, mode:'read'|'result', msgs}
const storyEl = () => document.getElementById('story');

function openStory(n){
  const c = CHAPTERS[n]; if(!c.art.length){ toast('Artwork for this chapter has not been added yet'); return; }
  S = {n, i:0, mode:'read'}; drawStory();
}
function closeStory(){ S = null; const e = storyEl(); e.classList.remove('on'); e.innerHTML = ''; render(); }
function storyGo(d){
  if(!S || S.mode!=='read') return;
  const last = CHAPTERS[S.n].art.length;
  S.i = clamp(S.i + d, 0, last);
  if(S.i === last){ G.read[S.n] = true; save(); }
  drawStory();
}
function storyResult(n, msgs){
  const d = CHAPTER_DESIGN[n];
  S = {n, mode:'result', msgs, unlocks: d ? d.unlocks : []}; drawStory();
}
function storyBeginBattle(){ const n = S.n; closeStory(); chapterFight(n); }
function storyComplete(){ const n = S.n, msgs = completeChapter(n); storyResult(n, msgs); }

function drawStory(){
  const e = storyEl(); e.classList.add('on');
  const c = CHAPTERS[S.n], d = CHAPTER_DESIGN[S.n], total = c.art.length;
  const head = `<div class="story-top"><div><div class="story-kicker">${S.n===0?'Prologue':'Chapter '+S.n}${S.mode==='result'?' · Complete':''}</div><div class="story-title">${c.title}</div></div>
    <div class="story-top-r">${S.mode==='read'?`<span class="story-count">${Math.min(S.i+1,total)} / ${total}</span>`:''}<button class="story-x" onclick="closeStory()" aria-label="Close">✕</button></div></div>`;
  let body = '', bar = '';
  if(S.mode==='read' && S.i < total){
    body = `<div class="story-page"><img src="assets/comics/${c.art[S.i]}.webp" alt="${c.title}, page ${S.i+1}" onclick="zoomOpen(this.src)" style="cursor:zoom-in"></div><div class="sm" style="text-align:center;opacity:.7;margin-top:6px">Tap the page to zoom</div>`;
    bar = `<button ${S.i?'':'disabled'} onclick="storyGo(-1)">◀ Back</button><button onclick="zoomOpen('assets/comics/${c.art[S.i]}.webp')" style="min-width:0">🔍 Zoom</button><button class="pri" onclick="storyGo(1)">${S.i===total-1?'Finish':'Next ▶'}</button>`;
    const pre = new Image(); if(c.art[S.i+1]) pre.src = 'assets/comics/'+c.art[S.i+1]+'.webp';
  } else if(S.mode==='read'){
    const done = chapterDone(S.n);
    body = `<div class="story-end"><h2>${S.n===0?'End of the opening':'End of chapter '+S.n}</h2>${d?`<p>${d.sum.split('. ').slice(0,2).join('. ')}.</p>`:''}
      ${c.battle?`<div class="panel"><b>⚔️ Battle ahead</b><div class="sm">${c.battle.map(f=>ENEMIES[f.key].icon+' '+ENEMIES[f.key].n).join(' · ')}</div></div>`:''}</div>`;
    bar = `<button onclick="S.i=0;drawStory()">↺ Read again</button>`+
      (c.battle ? `<button class="pri" onclick="storyBeginBattle()">${done?'Replay battle':'Begin battle'}</button>`
                : done ? `<button onclick="closeStory()">Close</button>${nextChapterBtn(S.n)}`
                       : `<button class="pri" onclick="storyComplete()">${S.n===0?'Jade joins the journey':'Complete chapter'} (+${c.sxp} XP)</button>`);
  } else {   // result
    body = `<div class="story-end"><h2>${S.n===0?'The journey begins':'Chapter complete'}</h2>
      <div class="panel good">${S.msgs.map(m=>`<div>${m}</div>`).join('')}</div>
      ${S.unlocks.length?`<div class="panel"><h4 style="margin-top:0">Unlocked</h4>${S.unlocks.map(u=>`<div class="li">✅ ${u}</div>`).join('')}</div>`:''}</div>`;
    bar = `<button ${hasNextChapter(S.n)?'':'class="pri" '}onclick="closeStory()">${hasNextChapter(S.n)?'Close':'Continue'}</button>${nextChapterBtn(S.n)}`;
  }
  e.innerHTML = `<div class="story-shell">${head}<div class="story-body">${body}</div><div class="story-bar">${bar}</div></div>`;
  const b = e.querySelector('.story-body'); if(b) b.scrollTop = 0;
}

/* keyboard + swipe */
document.addEventListener('keydown', ev => {
  if(ZV){ if(ev.key==='Escape') zoomClose(); return; }
  if(!S) return;
  if(ev.key==='Escape') closeStory();
  else if(ev.key==='ArrowRight' || ev.key===' ') { ev.preventDefault(); storyGo(1); }
  else if(ev.key==='ArrowLeft') storyGo(-1);
});
let _tx = null, _ty = null;
document.addEventListener('touchstart', ev => { if(S && S.mode==='read'){ _tx = ev.touches[0].clientX; _ty = ev.touches[0].clientY; } }, {passive:true});
document.addEventListener('touchend', ev => {
  if(!S || _tx===null || ZV) return;
  const dx = ev.changedTouches[0].clientX - _tx, dy = ev.changedTouches[0].clientY - _ty; _tx = _ty = null;
  if(Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy)*1.6) storyGo(dx < 0 ? 1 : -1);
}, {passive:true});

/* ---------- ZOOM VIEWER: any comic page, full screen, scroll in both directions; − / + change the size (kept between pages) ---------- */
let ZV = null, ZV_Z = 2;
const ZV_STEPS = [1, 1.5, 2, 2.5, 3, 4];
try{ const z = +localStorage.getItem('tribute_zoom'); if(ZV_STEPS.includes(z)) ZV_Z = z; }catch(e){}
function zoomOpen(src){
  ZV = src;
  let el = document.getElementById('zoomv');
  if(!el){ el = document.createElement('div'); el.id = 'zoomv'; document.body.appendChild(el); }
  zoomDraw(); el.scrollTop = 0; el.scrollLeft = 0;
}
function zoomDraw(){
  const el = document.getElementById('zoomv'); if(!el || !ZV) return;
  el.className = 'on';
  el.innerHTML = `<div class="zoombar"><button onclick="zoomStep(-1)" ${ZV_Z<=ZV_STEPS[0]?'disabled':''}>−</button><span>${Math.round(ZV_Z*100)}%</span><button onclick="zoomStep(1)" ${ZV_Z>=ZV_STEPS[ZV_STEPS.length-1]?'disabled':''}>+</button><button class="pri" onclick="zoomClose()">✕ Close</button></div><img src="${ZV}" alt="Comic page, zoomed" style="width:${ZV_Z*100}%">`;
}
function zoomStep(d){
  const el = document.getElementById('zoomv'), i = clamp(ZV_STEPS.indexOf(ZV_Z) + d, 0, ZV_STEPS.length-1), old = ZV_Z;
  const fx = el.scrollWidth ? (el.scrollLeft + el.clientWidth/2) / el.scrollWidth : .5, fy = el.scrollHeight ? (el.scrollTop + el.clientHeight/2) / el.scrollHeight : 0;
  ZV_Z = ZV_STEPS[i]; try{ localStorage.setItem('tribute_zoom', ZV_Z); }catch(e){}
  if(ZV_Z === old) return;
  zoomDraw();
  const im = el.querySelector('img'), fix = () => { el.scrollLeft = fx*el.scrollWidth - el.clientWidth/2; el.scrollTop = fy*el.scrollHeight - el.clientHeight/2; };
  if(im.complete) fix(); else im.onload = fix;
}
function zoomClose(){ ZV = null; const el = document.getElementById('zoomv'); if(el){ el.className = ''; el.innerHTML = ''; } }
