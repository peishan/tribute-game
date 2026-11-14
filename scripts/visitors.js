/* =====================================================================
   TRIBUTE — SAN AND JOEL AS VISITORS (the crossover, chapters 942-989)
   The drawn Tribute chapters (935-990) keep San and Joel at Dragonvale Harbour, aboard the Crimson Tide and at Fair Tide. Their visits to Lunareth itself (Jade and Devon, Sally and Levi,
   Adrian and Eve, Dragonvale's court) are drawn in the Crimson Tide's own story, Arc XLII (chapters 16, 31, 38, 43 and 44). This file adds small unseen moments between the drawn chapters, as the
   author asked: now and then a notice says San and Joel have been visiting, and on that day (and the next) the place they visited shows them in its Here tab.
   Nothing here is canon plot: every line is flavour built from what Arc XLII already says (who they met, what they talked about). Random: a visit every 6 to 14 days, in no fixed order.
   State: G.visits = {next:day, seen:[ids], last:{id, day}}.
   ===================================================================== */
const VISIT_FROM_CH = 942, VISIT_UNTIL_CH = 990;
const VISITS = [
  {id:'gm_tea', at:'gold_residence', icon:'🍵', place:'Gold Manor', minCh:945,
   text:'San and Joel came to Gold Manor for tea. Adrian had questions about Fair Tide\'s records; Eve pretended not to be curious, and was.'},
  {id:'gm_yard', at:'gold_residence', icon:'🏡', place:'Gold Manor', minCh:950,
   text:'Joel spent an hour with the Gold household guards, comparing how a paladin and an Imperial Guard hold a line. Nobody won. Everyone enjoyed it.'},
  {id:'gm_adrian', at:'gold_residence', icon:'📚', place:'Gold Manor', minCh:955,
   text:'Adrian showed San the manor library. "Jade doesn\'t usually trust strangers this quickly," he said. "They\'re hardly strangers anymore," San answered.'},
  {id:'dv_court', at:'dragon_vale', icon:'🏯', place:'the Dragonvale palace', minCh:948,
   text:'San and Joel visited the Dragonvale palace. Roc and Delilah introduced their children; San was delighted, and Joel noticed she was already thinking of inviting them to Fair Tide.'},
  {id:'dv_gardens', at:'dragon_vale', icon:'🌿', place:'the Dragonvale palace', minCh:952,
   text:'Aster and Fen walked San and Joel through the palace gardens. Fen asked three questions about the Horizon Engine before they reached the first fountain.'},
  {id:'dv_archive', at:'dragon_vale', icon:'📜', place:'Dragonvale\'s archive', minCh:946,
   text:'Devon took San and Joel through the Dragonvale archive. San asked politely about the Black Pearl; Devon answered carefully and wrote down what he could not.'},
  {id:'lu_market', at:null, icon:'🧺', place:'Lunareth', minCh:944,
   text:'San and Joel went ashore in Lunareth. Sally appointed herself San\'s guide to the markets; Levi and Joel compared bows and shields behind them.'},
  {id:'lu_home', at:null, icon:'🌙', place:'Lunareth', minCh:956,
   text:'San and Joel spent the afternoon with Jade and Devon at their home. Jade spoke about the life she has built. San listened, and kept one thing to herself.'},
  {id:'lu_return', at:null, icon:'⚓', place:'Lunareth', minCh:962,
   text:'San and Joel sailed over for the day, unannounced, and left before dark. "Some people are just easy to talk to," Jade told Devon afterwards.'},
];
const visitData = () => { if(!G.visits) G.visits = {next:0, seen:[], last:null}; return G.visits; };
function visitsTick(){
  if(!G || !G.flags || typeof G.day !== 'number' || G.ch < VISIT_FROM_CH || G.ch >= VISIT_UNTIL_CH) return;
  const V = visitData();
  if(!V.next){ V.next = G.day + 3 + Math.floor(Math.random()*6); return; }
  if(G.day < V.next) return;
  let pool = VISITS.filter(v => G.ch >= v.minCh && !V.seen.includes(v.id));
  if(!pool.length){ V.seen = []; pool = VISITS.filter(v => G.ch >= v.minCh); }   // all seen: the visits start again in a new order
  if(!pool.length) return;
  const v = pool[Math.floor(Math.random()*pool.length)];
  V.seen.push(v.id); V.last = {id:v.id, day:G.day}; V.next = G.day + 6 + Math.floor(Math.random()*9);
  chronicle(v.text, v.icon); toast(v.icon+' San and Joel are visiting '+v.place); save();
}
const visitHere = () => { const V = G && G.visits; if(!V || !V.last || G.day - V.last.day > 1) return null; const v = VISITS.find(x => x.id === V.last.id); return v && v.at === G.loc ? v : null; };
(function(){
  const _tt = timedTick;
  timedTick = function(){ const r = _tt.apply(this, arguments); visitsTick(); return r; };
  const _rh = rHere;
  rHere = function(){
    const h = _rh.apply(this, arguments), v = (typeof spotOpen !== 'undefined' && spotOpen) ? null : visitHere();
    return v ? `<div class="panel"><b>👥 San and Joel are visiting today</b><div class="sm">${v.text}</div><div class="sm" style="opacity:.7">Between the drawn chapters: their Lunareth visits are drawn in the Crimson Tide's own story (Arc XLII).</div></div>` + h : h;
  };
})();
