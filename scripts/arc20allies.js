/* Arc XX non-combat allies (the author's revised brief): Elise, Fen and Tarin do not fight. They help in the field once the story has brought them in.
   Elise (Dragonvale Border Ally, once the border is being rebuilt, ch511): Border Accord (frontier rewards +15% gold), Frontier Network (one extra clue a day),
   Logistics Command (travel fares -15%). Fen (from ch498): Research Lead (one extra clue a day) and Cross-Reference (a second finished investigation in a day pays a small XP bonus).
   Tarin (from ch508, Border Trail): safer routes and fewer ambushes in the frontier; see tarinEdge / tarinSkips in arc20guests.js.
   Legal Precedent: Fen halves what Aster's Royal Authority costs in Local Trust. */
const eliseAlly = () => !!(G.flags && G.flags.border_rebuilding_begins);
const fenAlly = () => !!(G.flags && G.flags.fen_finds_altered_records);
const tarinContact = () => !!(G.flags && G.flags.tarin_ash_found);
const inFrontier = () => { const l = LOCATIONS[G.loc]; return G.loc === 'border_frontier' || !!(l && l.region === 'tribute' && typeof outdoorHere === 'function' && outdoorHere()); };

// Daily extra clue (Elise's Frontier Network, then Fen's Research Lead): returns log lines, or null.
function allyClue(){
  G.allyDay = G.allyDay || {};
  if(eliseAlly() && G.allyDay.elise !== G.day){ G.allyDay.elise = G.day; return ['🦌 Elise\'s Frontier Network sends word of one more lead (Frontier Network).']; }
  if(fenAlly() && G.allyDay.fen !== G.day){ G.allyDay.fen = G.day; return ['📖 Fen\'s notes point to the right ledger (Research Lead).']; }
  return null;
}
// Fen's Cross-Reference: finishing a second investigation on the same day pays a small XP bonus.
function crossReference(){
  if(!fenAlly()) return null;
  G.allyDay = G.allyDay || {};
  const first = G.allyDay.done !== G.day; G.allyDay.done = G.day; G.allyDay.cnt = first ? 1 : (G.allyDay.cnt||0) + 1;
  return G.allyDay.cnt >= 2 ? 150 + avgPartyLv()*8 : null;
}

// Perks ride on relPerk so the totals (and the 40% fare cap) work like every other favour.
(function(){
  const base = relPerk;
  relPerk = function(key){
    let v = base(key);
    if(key === 'fareOff' && eliseAlly()) v += .15;
    if(key === 'goldBonus' && eliseAlly() && G.loc === 'border_frontier') v += .15;
    return v;
  };
})();
// Fen's Legal Precedent lowers the Local Trust cost of Royal Authority.
if(typeof AUTH_TRUST_COST !== 'undefined'){
  const costOf = () => fenAlly() ? Math.ceil(AUTH_TRUST_COST / 2) : AUTH_TRUST_COST;
  const baseRA = authorityResult;
  authorityResult = function(){
    if(earnedAuthority() || !fenAlly()) return baseRA();
    const m = regardAdd(G.loc, -costOf());
    return ['⚜️ Royal Authority opens the records at once, and Fen\'s Legal Precedent shows the officials it was within the law, so less trust is lost.'+(m?' '+m:'')];
  };
}
// Tarin's Border Trail replaces his old guest hooks: he guides the party without fighting.
tarinEdge = () => tarinContact() && inFrontier();
tarinSkips = () => tarinContact() && inFrontier() && Math.random() < .3;
