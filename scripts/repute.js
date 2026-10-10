/* =====================================================================
   TRIBUTE — REPUTATION: how Jade is known, and by whom
   Not a single number. Renown (the Phoenix Guard ladder, G.rep) is how famous the party is overall, local regard is how a place treats them, and standing is how
   individual people judge Jade's decisions. REPUTATION fills the gap between them: how each KIND of person sees her, and how far the legend of the masks has grown.
     folk    The Common Folk            villages, ports, farmers, ferrymen
     court   The Court and Nobility     Dragonvale's and Tribute's households and officials
     law     The Watch and Magistrates  those who keep the law
     shadow  The Underworld             smugglers, bandits, informants (they respect a hard hand and a quiet one)
     mask    The Crimson Phoenix and the Silent Dragon   the legend of the masked contracts
   Each runs 0..100 and only ever grows: different people respect different things, so every choice earns some reputation somewhere and nothing is taken away.
   SUSPICION is separate: how close the whispers are to guessing who is behind the masks. It rises with masked work and with Jade's quieter choices. It never
   costs anything, but the rumours get closer: it is the cost of a secret, not a penalty.
   Gains come from finished contracts (masked ones feed the masks), Jade's decisions (each Way she leans toward is read differently by each group), Evils
   resolved and the Marroway outcome. State: G.repu = {folk,court,law,shadow,mask,susp}.   Tier names and numbers are first-pass.
   ===================================================================== */
const REPUTE = {
  folk:{n:'The Common Folk', icon:'🏘️', tiers:['Unknown','A kind stranger','Known in the villages','The people\'s friend','A folk hero']},
  court:{n:'The Court and Nobility', icon:'👑', tiers:['Unknown','A curious guest','Respected at court','A voice that is heard','A pillar of the realm']},
  law:{n:'The Watch and Magistrates', icon:'⚖️', tiers:['Unknown','A cooperative stranger','A reliable witness','The watch\'s ally','Trusted by the bench']},
  shadow:{n:'The Underworld', icon:'🕶️', tiers:['Unknown','A name whispered','Feared','Respected by rogues','Left well alone']},
  mask:{n:'The Crimson Phoenix and the Silent Dragon', icon:'🎭', tiers:['Unheard of','A rumour','A tavern tale','A legend on the roads','The masks everyone knows']},
};
const REPUTE_KEYS = Object.keys(REPUTE), REPUTE_AT = [0, 12, 30, 55, 80];
const SUSPICION = [[0,'Nobody suspects a thing'],[20,'Idle talk in the taverns'],[45,'The servants whisper'],[70,'Court gossip has a name for the masks'],[90,'An open secret, politely ignored']];
const repData = () => { if(!G.repu) G.repu = {}; REPUTE_KEYS.concat(['susp']).forEach(k => { if(typeof G.repu[k] !== 'number') G.repu[k] = 0; }); return G.repu; };
const repTier = k => { const v = repData()[k]; let t = 0; REPUTE_AT.forEach((m, i) => { if(v >= m) t = i; }); return t; };
const suspTier = () => { const v = repData().susp; let t = 0; SUSPICION.forEach(([m], i) => { if(v >= m) t = i; }); return t; };
function repAdd(k, n, why){
  const R = repData(), msgs = []; n = Math.round(n); if(!n || (!REPUTE[k] && k!=='susp')) return msgs;
  const t0 = k==='susp' ? suspTier() : repTier(k); R[k] = Math.max(0, Math.min(100, R[k] + n));
  const t1 = k==='susp' ? suspTier() : repTier(k);
  if(t1 > t0){ const line = k==='susp' ? '🤫 '+SUSPICION[t1][1]+'.' : REPUTE[k].icon+' '+REPUTE[k].n+': '+REPUTE[k].tiers[t1]+'.'; msgs.push(line); chronicle(line.replace(/^\S+ /,''), k==='susp' ? '🤫' : REPUTE[k].icon); }
  return msgs;
}
/* each Way Jade leans toward is read differently by each group */
function reputeFromWays(delta){
  const m = [], d = delta || {};
  Object.keys(d).forEach(k => { const v = d[k], a = Math.abs(v);
    if(k==='folk') m.push.apply(m, repAdd(v > 0 ? 'folk' : 'court', 2*a));
    else if(k==='law'){ if(v > 0){ m.push.apply(m, repAdd('law', 2*a)); m.push.apply(m, repAdd('court', a)); } else { m.push.apply(m, repAdd('mask', a)); m.push.apply(m, repAdd('shadow', a)); m.push.apply(m, repAdd('susp', a)); } }
    else if(k==='mercy') m.push.apply(m, repAdd(v > 0 ? 'folk' : 'shadow', 2*a));
    else if(k==='caution') m.push.apply(m, repAdd(v > 0 ? 'court' : 'mask', a)); });
  return m;
}
function questRepute(q, msgs){
  if(q.masked){ const big = q.mar==='case'; [].push.apply(msgs, repAdd('mask', big ? 5 : 4)); [].push.apply(msgs, repAdd('folk', big ? 3 : 2)); [].push.apply(msgs, repAdd('susp', big ? 3 : 2)); }
  else { [].push.apply(msgs, repAdd('folk', 1)); if(q.type==='kill') [].push.apply(msgs, repAdd('law', 1)); }
}
/* what the comic chapters themselves settle (fixed outcomes, not Jade's choices) */
const CH_REPUTE = {201:{folk:6}, 202:{court:4}, 204:{law:8, folk:4, court:2}, 207:{court:2}};
function reputeChapterDone(n){ const m = CH_REPUTE[n]; if(m) Object.keys(m).forEach(k => repAdd(k, m[k])); }
function evilReputeDone(n){
  repAdd('folk', 3); repAdd('court', 2);
}
const repHead = () => { const R = repData(), top = REPUTE_KEYS.slice().sort((a, b) => R[b] - R[a])[0]; return R[top] > 0 ? REPUTE[top].tiers[repTier(top)]+' ('+REPUTE[top].n.toLowerCase()+')' : 'Not yet known beyond the party'; };
function rReputation(){
  const R = repData();
  const bar = (v, col) => `<div style="height:7px;margin:4px 0;background:rgba(128,128,128,.35);border-radius:4px"><div style="height:7px;width:${v}%;background:${col};border-radius:4px"></div></div>`;
  return `<div class="panel"><b>REPUTATION</b><div class="sm">How each kind of person sees Jade. It only grows: different people respect different things, so every choice earns some reputation somewhere. Renown (the Phoenix Guard ladder) and local regard are separate. ${typeof rankLine==='function' ? rankLine()+'.' : ''}</div>
   ${REPUTE_KEYS.map(k => `<div class="li"><b>${REPUTE[k].icon} ${REPUTE[k].n}</b> <span class="sm">· ${REPUTE[k].tiers[repTier(k)]} (${R[k]})</span>${bar(R[k], 'var(--gold,#d9a441)')}</div>`).join('')}
   <div class="li"><b>🤫 Whispers about the masks</b> <span class="sm">· ${SUSPICION[suspTier()][1]} (${R.susp})</span>${bar(R.susp, '#9a6bd6')}<div class="sm">Suspicion costs nothing: it only says how close the rumours are to the truth.</div></div></div>`;
}
deed('rep_known', 'world', 'A name in the villages', '🏘️', 'The common folk know Jade by name.', () => repTier('folk') >= 2);
deed('rep_court', 'world', 'A voice that is heard', '👑', 'The court listens when Jade speaks.', () => repTier('court') >= 3);
deed('rep_legend', 'world', 'A legend on the roads', '🎭', 'The masks became a legend.', () => repTier('mask') >= 3);
deed('rep_open', 'world', 'Everyone pretends not to know', '🤫', 'The whispers about the masks reached the highest tier.', () => suspTier() >= 4);
