/* =====================================================================
   TRIBUTE — THE WHISPER LEDGER (Crimson Tide's rumour market, reframed as Sally's rumour network)
   Sally taught Jade to keep a ledger of what people say. At any tavern, "Buy a rumour" now draws from a table of regional whispers
   (gated by chapter and place). Each whisper is flavour, or a real lead:
     lead   +1 free clue on an open investigation nearby (no day lost)
     purse  battle gold +25% for 3 days
     road   road risk -12% for 4 days
     shop   shops +10% off for 3 days where you heard it
   The Ledger (Imperial Network tab) lists what you heard, whether a lead proved true, and the tips still running.
   State: G.whisper = { heard:{id:day}, fx:[ {kind, until, loc?} ] }.   Rumour wording is first-pass and invented; edit freely.
   ===================================================================== */
const WHISPER_COST = () => 5 + Math.floor(avgPartyLv()/6);
const WHISPERS = [
  // generic
  {id:'w_purse1', needCh:12, kind:'purse', t:'"The brigands on the roads are carrying more than they should. Hunt them this week and you will find it."'},
  {id:'w_road1', needCh:15, kind:'road', t:'"A patrol swept the main roads last night. The carriages should go through quietly for a few days."'},
  {id:'w_shop1', needCh:15, kind:'shop', t:'"The apothecary has a cart that must be emptied before it spoils. Ask for the good price."'},
  {id:'w_flav1', needCh:1, kind:'flavour', t:'"Carriages are cheap; the river is quick but wild."'},
  {id:'w_flav2', needCh:60, kind:'flavour', t:'"The Phoenix Guard are taking on new recruits. Their drill sergeant has opinions about it."'},
  // Valen
  {id:'w_valen1', needCh:105, regions:['valen'], kind:'lead', spot:'mira_talk', t:'"If you want the truth about the west, ask the healer and the border runner. Not the polished halls."'},
  {id:'w_valen2', needCh:108, regions:['valen'], kind:'lead', spot:'hidden_archive', t:'"There is a second archive behind the old registry. Master Teren keeps it, and he does not keep it for nothing."'},
  // northern frontier / black forest / valley
  {id:'w_north1', needCh:148, regions:['north'], kind:'lead', spot:'frontier_villages', t:'"The farmers on the northern road found their doors torn open in the morning, hearths still warm. Go and look."'},
  {id:'w_north2', needCh:149, regions:['north'], kind:'lead', spot:'forest_physical', t:'"The hunters who came back from the forest say the claw marks are deeper than any wolf\'s."'},
  {id:'w_north3', needCh:150, regions:['north'], kind:'lead', spot:'widow_corruption', t:'"They say the thorns grow back faster than the woodcutters can cut them. Something feeds them."'},
  {id:'w_north4', needCh:153, regions:['north'], kind:'lead', spot:'valley_trail', t:'"The stag never leaves the valley. Whatever it is guarding, it is not hungry."'},
  {id:'w_north5', needCh:155, regions:['north'], kind:'lead', spot:'treasure_seekers', t:'"Soldiers went up the valley road with pry bars and came down with a cart. Nobody asked what was in it."'},
  {id:'w_north6', needCh:152, regions:['north'], kind:'flavour', t:'"The forest has gone quiet since the thorns receded. The birds are coming back."'},
  // Arc V
  {id:'w_seals1', needCh:122, regions:['valen'], kind:'flavour', t:'"Travellers on the western road say the demons are running, not hunting."'},
];
const whisperState = () => { if(!G.whisper) G.whisper = {heard:{}, fx:[]}; return G.whisper; };
const whisperFx = kind => whisperState().fx.filter(f => f.until > G.day && f.kind===kind && (!f.loc || f.loc===G.loc));
function whisperBonus(kind){ return whisperFx(kind).length ? ({purse:.25, road:.12, shop:.10}[kind]||0) : 0; }
function hearWhisper(){
  const st = whisperState(), cost = WHISPER_COST();
  if(G.gold < cost) return '"Rumours cost '+cost+' gold, friend."';
  G.gold -= cost;
  const region = LOCATIONS[G.loc].region;
  const open = w => G.ch >= w.needCh && (!w.regions || w.regions.includes(region)) && (w.kind!=='lead' || (!spotLock(spotById(w.spot)) && !G.flags['inv_'+w.spot]));
  const fresh = WHISPERS.filter(w => !st.heard[w.id] && open(w));
  const pool = fresh.length ? fresh : [];
  if(!pool.length) return rumourFree();
  const w = AR(pool); st.heard[w.id] = G.day;
  let extra = '';
  if(w.kind==='lead'){ const sp = spotById(w.spot); G.clues[w.spot] = Math.min(sp.need, (G.clues[w.spot]||0)+1); extra = ' 🔎 A lead: +1 clue toward '+sp.n+'.';
    if(G.clues[w.spot] >= sp.need){ G.flags['inv_'+w.spot] = true; extra += ' (That settles it.)'; } }
  else if(w.kind==='purse'){ st.fx.push({kind:'purse', until:G.day+3}); extra = ' 💰 Battle gold +25% for 3 days.'; }
  else if(w.kind==='road'){ st.fx.push({kind:'road', until:G.day+4}); extra = ' 🛞 The roads are safer for 4 days.'; }
  else if(w.kind==='shop'){ st.fx.push({kind:'shop', until:G.day+3, loc:G.loc}); extra = ' 🛒 Shops here are 10% cheaper for 3 days.'; }
  if(typeof chronicle==='function' && w.kind==='lead') chronicle('A whisper at '+LOCATIONS[G.loc].n+' pointed the party toward '+spotById(w.spot).n+'.', '👂');
  return w.t + extra;
}
function rWhispers(){
  const st = whisperState(), heard = WHISPERS.filter(w => st.heard[w.id]);
  const live = st.fx.filter(f => f.until > G.day).map(f => `<div class="sm">• ${({purse:'💰 Battle gold +25%', road:'🛞 Road risk −12%', shop:'🛒 Shops −10%'}[f.kind])} · ${f.until-G.day} day(s) left${f.loc?' · '+LOCATIONS[f.loc].n:''}</div>`).join('');
  const rows = heard.sort((a,b) => st.heard[b.id]-st.heard[a.id]).map(w => { const proven = w.kind==='lead' && G.flags['inv_'+w.spot];
    return `<div class="ev"><div><div class="sm">Day ${st.heard[w.id]} · ${({lead:'Lead',purse:'Tip',road:'Road word',shop:'Market word',flavour:'Whisper'})[w.kind]}${w.kind==='lead'?(proven?' · ✔ proven true':' · open'):''}</div><div>${w.t}</div></div></div>`; }).join('');
  return `<div class="panel"><b>👂 The Whisper Ledger</b><div class="sm">Sally taught Jade to write down what people say. Buy a rumour at any tavern (${WHISPER_COST()}g): some are only talk, some are real leads. Whispers you have already heard are not repeated.</div>${live?'<div style="margin-top:4px"><b class="sm">Running tips</b>'+live+'</div>':''}</div>${rows||'<div class="sm">No whispers recorded yet.</div>'}`;
}
