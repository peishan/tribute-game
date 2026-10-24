/* Mirelle Veyne, Information Ally (ch544, flag veyne_network_unlocked). She does not fight. Her Veyne Network is a support skill on the Exploration bar:
   once per place, before a search, choose one of: reveal a hidden route (the search costs no day), identify a suspicious lead (one extra clue),
   or reduce the chance of a false clue (the search cannot be ambushed). It complements Sally's Rumour Network rather than replacing it. */
const veyneOn = () => !!(G && G.flags && G.flags.veyne_network_unlocked);
const VEYNE_MODES = {
  route:{icon:'🧭', n:'Hidden route', msg:'🧭 Mirelle\'s contacts point to a route nobody has used: the search costs no day.'},
  lead:{icon:'🔎', n:'Suspicious lead', msg:'🔎 Mirelle\'s contacts name one suspicious lead: one clue more than the search alone would give.'},
  false:{icon:'🛡️', n:'False clue guard', msg:'🛡️ Mirelle checks the trail against her cells: no false clue and no staged ambush will catch the party here.'},
};
function veyneLeft(){ const e = expl(); return !(e.veyneLoc && e.veyneLoc[G.loc]); }
function armVeyne(mode){
  const e = expl(); if(!veyneOn() || !VEYNE_MODES[mode]) return [];
  if(!veyneLeft() && e.armed.veyne !== mode) return ['The Veyne Network has already worked here.'];
  e.veyneLoc = e.veyneLoc || {}; e.veyneLoc[G.loc] = true; e.armed.veyne = mode;
  return [VEYNE_MODES[mode].msg+' (Veyne Network is ready for your next search here.)'];
}
function takeVeyne(){ const e = expl(); const v = e.armed.veyne || false; e.armed.veyne = false; return v; }
function veyneButtons(){
  if(!veyneOn()) return '';
  const a = expl().armed, left = veyneLeft();
  return Object.keys(VEYNE_MODES).map(k => `<button class="${a.veyne===k?'pri':''}" ${(!left&&a.veyne!==k)?'disabled':''} onclick="act(armVeyne,'${k}')">${a.veyne===k?'✔ ':''}${VEYNE_MODES[k].icon} Veyne: ${VEYNE_MODES[k].n}</button>`).join('');
}
