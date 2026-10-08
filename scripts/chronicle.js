/* =====================================================================
   TRIBUTE — THE CHRONICLE OF THE HIDDEN ISLE
   A permanent, in-world journal of what the party has done: chapters, missions, Evils resolved, bonds deepened, homes made,
   places that came to know them. Dated by in-game day (never by real-world dates). Anything can add to it with chronicle(text, icon).
   State: G.chron = [ {t, i, d, c} ]  (text, icon, in-game day, chapter). Capped at 400.
   ===================================================================== */
const CHRON_MAX = 400;
function chronicle(text, icon){
  if(!G || !text) return;
  if(!G.chron) G.chron = [];
  const last = G.chron[G.chron.length-1]; if(last && last.t===text && last.d===G.day) return;
  G.chron.push({t:text, i:icon||'📖', d:G.day, c:G.ch});
  if(G.chron.length > CHRON_MAX) G.chron.splice(0, G.chron.length - CHRON_MAX);
}
let chronFilter = 'all';
const CHRON_KINDS = [['all','All'],['story','Story'],['bonds','Bonds'],['world','World']];
const chronKind = e => /💞|💕|🏡|🌸/.test(e.i) ? 'bonds' : /📖|📜|🕯️|✔/.test(e.i) ? 'story' : 'world';
function rChronicle(){
  const all = (G.chron||[]).slice().reverse(), list = chronFilter==='all' ? all : all.filter(e => chronKind(e)===chronFilter);
  const filt = CHRON_KINDS.map(([k,l]) => `<button class="${chronFilter===k?'pri':''}" onclick="chronFilter='${k}';render()">${l}</button>`).join('');
  return `<h2>Chronicle</h2><div class="sm">A record of what the party has done, kept by day. New entries appear as the story and your bonds move.</div><div class="row" style="margin:6px 0">${filt}</div>${list.length?list.slice(0,60).map(e => `<div class="ev"><div><span class="sm">Day ${e.d}${e.c>=0?' · Ch.'+e.c:''}</span><div>${e.i} ${e.t}</div></div></div>`).join('')+(list.length>60?`<div class="sm">${list.length-60} earlier entries not shown.</div>`:''):'<div class="sm">Nothing recorded yet.</div>'}`;
}
