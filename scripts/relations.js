/* =====================================================================
   TRIBUTE — BONDS AND RELATIONSHIPS
   One screen for everyone Jade is close to. Two kinds:
   - Companions: the party's bonds (existing bond points and bond skills, shown here read-only).
   - Allies and family (new): a standing from 0 to 200 with its own ladder of six tiers, daily gestures (letter, gift, visit, counsel),
     and standing favours that unlock by tier and give small, real benefits (cheaper travel, more gold/XP/renown, more trust with Adrian).
   Standings can also move with the story: add rows to CH_REL below (applied when the chapter completes) or call relAdd(id, n).
   State: G.rel = { allyId: standing }.  Ladders and starting values are the author's: Greyson 100 (sibling-like), King Chadstone 50
   (admiration and respect, father-in-law), Adrian Gold 60 (Jade's brother). Add rows to RELATIONS to extend (parents, Dragonvale court...).
   ===================================================================== */
const REL_AT = [0,20,40,70,110,160], REL_MAX = 200;   // standing needed for tier 0..5
const REL_LADDER = {
  kin:     ['Allies','Friends','Trusted','Close as kin','Sworn siblings','Heart and blade'],
  respect: ['Acquainted','Courteous','Respected','Admired','Honoured kin','Beloved daughter'],
  family:  ['Reunited','Easy together','Trusted','Close','Inseparable','Heart of the house'],
};
const RELATIONS = [
  {id:'greyson', n:'King Greyson', icon:'👑', ladder:'kin', kind:'Sworn brother, sibling-like', start:100, from:0, at:'capital',
   desc:'The young king who sent Jade out into the world and calls her his sister.',
   perks:[{tier:1,key:'fareOff',v:.10,n:'Royal Writ',d:'Travel fares −10%'},{tier:3,key:'goldBonus',v:.10,n:'Crown Backing',d:'+10% gold from missions and investigations'},{tier:4,key:'fareOff',v:.10,n:'Open Roads',d:'Travel fares a further −10%'},{tier:5,key:'xpBonus',v:.10,n:'Sworn Siblings',d:'+10% XP from missions and investigations'}]},
  {id:'chadstone', n:'King Chadstone', icon:'🐉', ladder:'respect', kind:'Admiration and respect · father-in-law', start:50, from:50, at:'dragon_vale',
   desc:'The ruler of Dragonvale, father of Devon and of Roc. Jade earned his respect; he is now her husband\'s father.',
   perks:[{tier:1,key:'xpBonus',v:.05,n:'Dragonvale Regard',d:'+5% XP from missions and investigations'},{tier:3,key:'goldBonus',v:.05,n:'Royal Gifts',d:'+5% gold from missions and investigations'},{tier:4,key:'xpBonus',v:.05,n:'Honoured Kin',d:'A further +5% XP'},{tier:5,key:'repBonus',v:.15,n:'The Father\'s Blessing',d:'+15% renown'}]},
  {id:'adrian', n:'Adrian Gold', icon:'📚', img:'assets/npc/adrian.webp', ladder:'family', kind:'Jade\'s older brother', start:60, from:90, at:'capital',
   desc:'Jade\'s older brother, a royal scholar and Greyson\'s trusted official. He runs the Imperial Network.',
   perks:[{tier:1,key:'trustBonus',v:1,n:'A Quiet Word',d:'Each gain of trust with Adrian is +1'},{tier:2,key:'repBonus',v:.10,n:'Informed Counsel',d:'+10% renown'},{tier:4,key:'goldBonus',v:.05,n:'Family Ledger',d:'+5% gold from missions and investigations'},{tier:5,key:'fareOff',v:.10,n:'Trade Letters',d:'Travel fares −10%'}]},
];
const CH_REL = {};   // {chapter:{allyId:delta}} applied when the chapter completes: filled in as the author sets story shifts

const relOf = id => RELATIONS.find(r => r.id===id);
const relOpen = r => !!G && G.ch >= r.from;
function relScore(id){ const r = relOf(id); if(!G.rel) G.rel = {}; if(G.rel[id]===undefined) G.rel[id] = r.start; return G.rel[id]; }
function relTier(id){ const s = relScore(id); let t = 0; REL_AT.forEach((need,i) => { if(s >= need) t = i; }); return t; }
const relTierName = id => REL_LADDER[relOf(id).ladder][relTier(id)];
function relAdd(id, pts){
  const r = relOf(id); if(!r) return null;
  const before = relTier(id); G.rel[id] = clamp(relScore(id) + pts, 0, REL_MAX);
  const t = relTier(id), perk = r.perks.find(p => p.tier===t && t>before);
  return t > before ? '💞 '+r.n+': '+REL_LADDER[r.ladder][t]+'.'+(perk?' Favour unlocked: '+perk.n+'.':'') : (t < before ? '💔 '+r.n+': the bond has cooled to '+REL_LADDER[r.ladder][t]+'.' : null);
}
function relPerk(key){   // total of every unlocked favour with this key (only for allies met so far)
  return RELATIONS.reduce((sum, r) => sum + (relOpen(r) ? r.perks.filter(p => p.key===key && relTier(r.id) >= p.tier).reduce((a,p) => a + p.v, 0) : 0), 0);
}
const fareOf = r => Math.max(0, Math.ceil(r.fare * (1 - Math.min(.4, relPerk('fareOff')))));
function relApplyChapter(n){ const msgs = []; Object.keys(CH_REL[n]||{}).forEach(id => { if(relOf(id)){ const m = relAdd(id, CH_REL[n][id]); if(m) msgs.push(m); } }); return msgs; }

const REL_GESTURES = {
  letter:  {n:'Write a letter', icon:'✉️', pts:2, line:'You write a few honest lines and send them off.'},
  gift:    {n:'Send a gift', icon:'🎁', pts:4, cost:60, line:'A small, well-chosen gift goes out under your seal.'},
  visit:   {n:'Visit in person', icon:'🚪', pts:6, line:'You take time to sit and talk properly.', here:true, day:1},
  counsel: {n:'Ask for counsel', icon:'🗝️', pts:1, line:'You lay out what is troubling you and listen.', tier:2, cd:3, xp:true},
};
function relGestureLock(r, k){
  const g = REL_GESTURES[k];
  if(g.tier && relTier(r.id) < g.tier) return '🔒 '+REL_LADDER[r.ladder][g.tier]+' or closer';
  if(g.here && G.loc !== r.at) return '📍 Only at '+LOCATIONS[r.at].n;
  if(g.cost && G.gold < g.cost) return g.cost+' gold needed';
  const last = G.bondDay['rel_'+r.id+'_'+k];
  if(last !== undefined && G.day - last < (g.cd||1)) return g.cd ? 'Again in '+(g.cd - (G.day-last))+' day(s)' : 'Done today';
  return '';
}
function doGesture(id, k){
  const r = relOf(id), g = REL_GESTURES[k]; if(!r || !g || relGestureLock(r,k)) return [];
  G.bondDay['rel_'+id+'_'+k] = G.day; if(g.cost) G.gold -= g.cost;
  const msgs = [g.icon+' '+r.n.split(' ')[0]+': '+g.line+' Standing +'+g.pts+'.'], m = relAdd(id, g.pts); if(m) msgs.push(m);
  if(g.xp) gainXp(40 + avgPartyLv()*12, G.party).forEach(x => msgs.push(x));
  return g.day ? msgs.concat(advanceDay(g.day)) : msgs;
}

function rBonds(){
  const comp = G.party.filter(id => id!=='jade' && !CHARACTERS[id].placeholder && !CHARACTERS[id].companion).map(id => {
    const bl = bondLevel(id), bp = U(id).bp, nxt = BOND_LEVELS[bl+1], prev = BOND_LEVELS[bl];
    return `<div class="card" style="cursor:default"><img src="${portrait(id)}" alt="" style="width:44px;height:44px;border-radius:50%;object-fit:cover"><div class="fl"><b>${CHARACTERS[id].n}</b> <span class="sm">· Bond ${bl}</span>${nxt!==undefined?bar(bp-prev, nxt-prev)+`<div class="sm">${bp} / ${nxt} to Bond ${bl+1}</div>`:'<div class="sm">Bond complete</div>'}</div></div>`; }).join('');
  const allies = RELATIONS.filter(relOpen).map(r => {
    const s = relScore(r.id), t = relTier(r.id), next = REL_AT[t+1];
    const perks = r.perks.map(p => `<div class="sm" style="${relTier(r.id)>=p.tier?'':'opacity:.55'}">${relTier(r.id)>=p.tier?'✔':'🔒 '+REL_LADDER[r.ladder][p.tier]+' ·'} <b>${p.n}</b>: ${p.d}</div>`).join('');
    const gest = Object.keys(REL_GESTURES).map(k => { const lock = relGestureLock(r,k), g = REL_GESTURES[k];
      return `<button ${lock?'disabled':''} onclick="act(doGesture,'${r.id}','${k}')" title="${lock}">${g.icon} ${g.n}${g.cost?' ('+g.cost+'g)':''}</button>`; }).join(' ');
    const locks = Object.keys(REL_GESTURES).map(k => relGestureLock(r,k) && relGestureLock(r,k).startsWith('🔒')||relGestureLock(r,k).startsWith('📍') ? REL_GESTURES[k].n+': '+relGestureLock(r,k) : '').filter(Boolean);
    return `<div class="panel"><div class="row" style="align-items:center;gap:10px;flex-wrap:nowrap">${r.img?`<img src="${r.img}" alt="" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid var(--gold)">`:`<span class="big">${r.icon}</span>`}<div><b>${r.n}</b><div class="sm">${r.kind}</div><div><b>${REL_LADDER[r.ladder][t]}</b> <span class="sm">· standing ${s}/${REL_MAX}</span></div></div></div>
      ${bar(s - REL_AT[t], (next===undefined?REL_MAX:next) - REL_AT[t])}<div class="sm">${next===undefined?'The deepest bond.':(next-s)+' more to '+REL_LADDER[r.ladder][t+1]}</div>
      <div class="sm" style="margin:4px 0">${r.desc}</div>${perks}<div class="row" style="margin-top:6px;flex-wrap:wrap">${gest}</div>${locks.length?`<div class="sm" style="opacity:.6;margin-top:2px">${locks.join(' · ')}</div>`:''}</div>`; }).join('');
  return `<h2>Bonds</h2><div class="sm">Who Jade is close to. Companions deepen by spending time together; allies and family respond to letters, gifts, visits and counsel, once per day each, and their favours unlock as the bond grows.</div>${flashHtml()}<h4>Allies and family</h4>${allies}<h4>Companions</h4>${comp||'<div class="sm">No companions yet.</div>'}`;
}
