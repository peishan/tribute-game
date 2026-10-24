/* =====================================================================
   TRIBUTE — LADY DELILAH DEE, GUEST ADVISER (the author's Arc XIV design; the Arc XXII logistics investigation, ch558-562)
   She is a guest, not a fighter. While she travels with the party (STORY_ALONG rows in core.js) she brings five adviser abilities:
     Provisioning Order (horizons.js, built earlier): every fight starts with a 5% recovery for everyone.
     Read the Contract (Exploration bar, once a day, before a search): she reads the fine print. The search shows what is left (clues, reward, risk),
        gives a little bonus XP, and if it finishes the investigation the gold reward is 40% better.
     Reallocate Supplies (passive): inn rests cost 25% less and fares 10% less.
     Officer's Network (Exploration bar, once a day): her military contacts clear the way. The next search or journey cannot be ambushed.
     Deployment Plan (passive, battle): the party starts every fight with +15% speed for three turns (the initiative of a prepared defence).
   All numbers first-pass.
   ===================================================================== */
const delilahOn = () => !!(G && typeof presentGuests==='function' && presentGuests().includes('delilah'));
function armContract(){
  const e = expl(); if(!delilahOn()) return [];
  if(e.contractDay===G.day) return ['Delilah has already read the fine print today.'];
  e.contractDay = G.day; e.armed.contract = true;
  return ['📜 Delilah takes the papers and reads them twice. (Read the Contract is ready for your next search.)'];
}
function takeContract(){ const e = expl(); const v = !!e.armed.contract; e.armed.contract = false; return v; }
function armOfficers(){
  const e = expl(); if(!delilahOn()) return [];
  if(e.officersDay===G.day) return ['Delilah\'s officers have already been sent word today.'];
  e.officersDay = G.day; e.armed.officers = true;
  return ['🎖️ Delilah sends a note to an officer she trusts. (Officer\'s Network is ready for your next search or journey.)'];
}
function takeOfficers(){ const e = expl(); const v = !!e.armed.officers; e.armed.officers = false; return v; }
// the fine print shown by Read the Contract
function contractLines(sp, n){
  const left = Math.max(0, sp.need - n), rw = sp.rw || {};
  const amb = sp.ambush && sp.ambush.length ? 'an ambush is possible' : 'no ambush is expected';
  const out = ['📜 Read the Contract: '+(left ? left+' more clue'+(left>1?'s':'')+' to go' : 'the case is complete')+'; reward '+(rw.xp||0)+' XP and '+(rw.gold||0)+' gold'+(left?'':' (+40% gold for the terms she found)')+'; '+amb+'.'];
  return out;
}
const contractTerms = rw => Object.assign({}, rw, {gold:Math.round((rw.gold||0)*1.4)});
function delilahButtons(){
  if(!delilahOn()) return '';
  const e = expl(), a = e.armed;
  return `<button class="${a.contract?'pri':''}" ${(e.contractDay===G.day&&!a.contract)?'disabled':''} onclick="act(armContract)">${a.contract?'✔ ':''}📜 Read the Contract</button><button class="${a.officers?'pri':''}" ${(e.officersDay===G.day&&!a.officers)?'disabled':''} onclick="act(armOfficers)">${a.officers?'✔ ':''}🎖️ Officer's Network</button>`;
}
const delilahSupplies = kind => delilahOn() ? (kind==='rest' ? .75 : kind==='fare' ? .9 : 1) : 1;
(function(){
  // Reallocate Supplies: fares
  const _rp = relPerk;   // fares ride on the same perk total (and its 40% cap) as every other favour
  relPerk = function(key){ return _rp(key) + (key==='fareOff' && delilahOn() ? 1 - delilahSupplies('fare') : 0); };
  // Deployment Plan: initiative at the start of every fight
  const _sb = startBattle;
  startBattle = function(spec){
    _sb(spec);
    if(typeof B==='undefined' || !B || !B.allies || !B.allies.some(a => a.id==='delilah')) return;
    B.allies.forEach(a => { if(!a.dead) a.bf.push({stat:'spd', m:1.15, d:4}); });
    blog('🎖️ Delilah\'s Deployment Plan: the party takes its positions early (+speed for a few turns).','good');
  };
})();
