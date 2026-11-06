/* =====================================================================
   DEVELOPER OPTION: chapters as PDF (Dev tab, behind a password). Same idea as the Crimson Moon option.
   Builds a print-ready document of the chapter text (title, place, summary, events, who is on the page) for the chosen arcs, optionally with the comic pages, and opens
   the browser's print dialog: choose "Save as PDF". Nothing is uploaded. Keep the PDF and the phone's image storage can be cleared.
   PASSWORD: only a SHA-256 hash is stored (DEV_PW_HASH). It starts unset: set it with   python3 tools/set_dev_password.py "your password"   and push.
   This is a convenience lock, NOT security: the game is a static site, so anyone who reads the code can bypass or replace the hash. Do not put anything secret behind it.
   ===================================================================== */
const DEV_PW_HASH = '__unset__';
let devUnlocked = false;
try{ devUnlocked = sessionStorage.getItem('tr_dev_ok') === '1'; }catch(e){}
async function sha256(s){ const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join(''); }
async function devLogin(){
  const pw = ($('devpw')||{}).value || '';
  if(!(window.crypto && crypto.subtle)){ toast('This browser cannot check the password here (needs https).'); return; }
  if(DEV_PW_HASH.startsWith('__')){ toast('No developer password has been set yet.'); return; }
  if(await sha256(pw) === DEV_PW_HASH){ devUnlocked = true; try{ sessionStorage.setItem('tr_dev_ok','1'); }catch(e){} render(); }
  else toast('Wrong password');
}
function devLogout(){ devUnlocked = false; try{ sessionStorage.removeItem('tr_dev_ok'); }catch(e){} render(); }
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
// chapters grouped by arc: a chapter belongs to the last arc that begins before it
function exportArcs(){
  const arcs = ARCS.slice().sort((a, b) => a.after - b.after), out = {}, order = [];
  Object.keys(CHAPTER_DESIGN).map(Number).sort((a, b) => a - b).forEach(n => {
    if(CHAPTER_DESIGN[n].removed) return;
    let a = null; arcs.forEach(x => { if(x.after < n) a = x; });
    const k = n >= 935 ? 'Crimson Tide Crossover' : a ? 'Arc '+(ARC_ROMAN[a.n]||a.n)+' · '+a.title : 'Prologue';
    if(!out[k]){ out[k] = []; order.push(k); }
    out[k].push(n);
  });
  return {out, order};
}
function devExportPanel(){
  if(!devUnlocked) return `<div class="panel"><b>🔒 Developer export</b><div class="sm">Download the chapters as a PDF. Enter the developer password.${DEV_PW_HASH.startsWith('__') ? ' <i>(No password is set yet: run tools/set_dev_password.py.)</i>' : ''}</div>
    <div class="row" style="margin-top:6px"><input id="devpw" type="password" placeholder="Password" onkeydown="if(event.key==='Enter')devLogin()"><button onclick="devLogin()">Unlock</button></div></div>`;
  const {out, order} = exportArcs();
  return `<div class="panel"><b>📄 Chapters to PDF</b> <button onclick="devLogout()">Lock</button>
    <div class="sm">Pick arcs, then press the button: a print view opens and you choose "Save as PDF" in the print dialog. Without the comic pages it is small; with them it is large, so do a few arcs at a time.</div>
    <div class="row" style="margin:6px 0;flex-wrap:wrap"><button onclick="document.querySelectorAll('.expv').forEach(x=>x.checked=true)">All</button><button onclick="document.querySelectorAll('.expv').forEach(x=>x.checked=false)">None</button></div>
    <div class="row" style="margin:6px 0;flex-wrap:wrap">${order.map(k => `<label style="margin-right:8px"><input type="checkbox" class="expv" value="${esc(k)}"> ${esc(k)} (${out[k].length})</label>`).join('')}</div>
    <label class="sm"><input type="checkbox" id="expimg"> Include the comic pages (large file, slower)</label>
    <div style="margin-top:6px"><button class="pri" onclick="devExportPdf()">📄 Build PDF</button></div></div>`;
}
async function devExportPdf(){
  if(!devUnlocked) return;
  const picked = Array.from(document.querySelectorAll('.expv:checked')).map(x => x.value), {out} = exportArcs();
  const img = $('expimg').checked;
  if(!picked.length){ toast('Pick at least one arc'); return; }
  const w = window.open('', '_blank'); if(!w){ toast('Allow pop-ups for this site to build the PDF'); return; }
  w.document.write('<!doctype html><title>Building…</title><body style="font-family:sans-serif">Building the document…</body>');
  let html = '';
  for(const k of picked){
    html += `<h1 class="vol">${esc(k)}</h1>`;
    for(const n of out[k]){
      const c = CHAPTER_DESIGN[n];
      html += `<section class="ch"><h2>${n} · ${esc(c.title)}</h2><div class="meta">${c.type ? esc(c.type) : ''}${c.loc ? ' · '+esc(c.loc) : ''}</div><p>${esc(c.sum||'')}</p>`;
      if((c.events||[]).length) html += '<ul>'+c.events.map(e => `<li>${esc(e)}</li>`).join('')+'</ul>';
      if(c.charsNote || (c.chars||[]).length) html += `<div class="meta">On the page: ${esc(c.charsNote || c.chars.map(id => CHARACTERS[id] ? CHARACTERS[id].n : id).join(', '))}</div>`;
      if(img){ const pages = ART[n] || []; html += pages.map(p => `<img src="${new URL('assets/comics/'+p+'.webp', location.href).href}">`).join(''); }
      html += '</section>';
    }
  }
  const css = 'body{font-family:Georgia,serif;margin:24px;color:#111}h1.vol{page-break-before:always;border-bottom:2px solid #933;padding-bottom:6px}h1.vol:first-of-type{page-break-before:avoid}h2{margin:18px 0 2px}.meta{color:#555;font-size:12px}section.ch{page-break-inside:avoid-page;margin-bottom:14px}img{max-width:100%;display:block;margin:8px 0;page-break-inside:avoid}li{font-size:13px}p{font-size:14px;line-height:1.45}';
  w.document.open(); w.document.write(`<!doctype html><meta charset="utf-8"><title>Tribute: Curse of the Hidden Isle: chapters</title><style>${css}</style><body>${html}</body>`); w.document.close();
  const go = () => setTimeout(() => { try{ w.focus(); w.print(); }catch(e){} }, 600);
  if(img){ const t = setInterval(() => { const im = Array.from(w.document.images); if(im.every(i => i.complete)){ clearInterval(t); go(); } }, 500); } else go();
}
