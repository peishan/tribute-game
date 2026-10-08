/* =====================================================================
   TRIBUTE — AREA CORRUPTION (0-100%) for corrupted regions
   The meter starts at a per-area level, creeps up while the party spends days there, and falls when corrupted foes are defeated
   or a Purification Point is used (Devon). Effects: foes get stronger, healing is weaker, and the screen darkens at high levels.
   Corruption effects apply to fights in the area (battle.js reads corrAt / corrFoeMult / corrHealMult).
   State: G.corr = { locId: percent }
   ===================================================================== */
const CORR_START = {dragon_ruins:55, abyssal_frontier:70, dragon_border:30, valen_borderlands:25, moonveil_temple:15, black_forest:35, northern_frontier:15};
const CORR_RISE_PER_DAY = {dragon_ruins:3, abyssal_frontier:4, dragon_border:2, valen_borderlands:1, moonveil_temple:1, black_forest:2, northern_frontier:1};
const isCorrupted = loc => CORR_START[loc] !== undefined;
function corrAt(loc){
  if(!isCorrupted(loc)) return 0;
  if(!G.corr) G.corr = {};
  if(G.corr[loc] === undefined) G.corr[loc] = (loc==='valen_borderlands' && G.flags.valen_restored) ? 5 : CORR_START[loc];
  return G.corr[loc];
}
function corrAdd(loc, n){ if(!isCorrupted(loc)) return 0; const v = Math.max(0, Math.min(100, corrAt(loc) + n)); G.corr[loc] = v; return v; }
const corrFoeMult = loc => 1 + corrAt(loc)/100*.3;    // up to +30% foe HP and damage
const corrHealMult = loc => 1 - corrAt(loc)/100*.4;   // up to -40% healing
function corrTick(days){ if(isCorrupted(G.loc) && days>0) corrAdd(G.loc, (CORR_RISE_PER_DAY[G.loc]||1)*days); }
function corrLabel(c){ return c<20 ? 'Calm' : c<45 ? 'Uneasy' : c<70 ? 'Corrupted' : c<90 ? 'Dark' : 'Overrun'; }
function corrMeter(loc){
  if(!isCorrupted(loc)) return '';
  const c = corrAt(loc);
  return `<div class="panel" style="border-color:var(--purple)"><b style="color:var(--purple)">☠️ Corruption ${c}% · ${corrLabel(c)}</b>${bar(c,100,'e')}<div class="sm">Foes here are +${Math.round(c*.3)}% stronger and healing is −${Math.round(c*.4)}%. It creeps up each day you stay; defeating corrupted foes and Devon's Purification Points lower it.</div></div>`;
}
function corrSky(){   // screen effect for the current area
  const el = $('app'); if(!el || !el.classList) return;
  const c = G ? corrAt(G.loc) : 0;
  el.classList.toggle('corr1', c >= 40 && c < 70); el.classList.toggle('corr2', c >= 70);
}
/* Purification Point (Devon): once a day per area. */
function usePurifyPoint(){
  const loc = G.loc;
  if(!isRecruited('devon') || isDisabled('devon')) return ['Devon is not here to purify.'];
  if(G.bondDay['purify_'+loc] === G.day) return ['The point has already been used today.'];
  G.bondDay['purify_'+loc] = G.day;
  const sense = typeof takeSense==='function' && takeSense(), before = corrAt(loc), after = corrAdd(loc, sense ? -35 : -25);
  return ['✨ Devon sets his hand on the old ward and the Valen light runs through it. Corruption '+before+'% → '+after+'%.'];
}
