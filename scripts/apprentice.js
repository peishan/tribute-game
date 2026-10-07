/* =====================================================================
   TRIBUTE — SKY'S APPRENTICESHIP WITH THE GHOST HEALER
   Three lessons, taken from Sky's party sheet while the Ghost Healer travels with the party. Each takes a day (the party rests
   in camp), uses some herbs, and upgrades Sky's healing. Lesson 3 needs the Ghost Healer's trust (the gift quest) and touches
   "something very old" in Sky's power; it does not explain his past (that waits for the story).
   Lesson 1: Reading the Body   — Sky's heals +15%
   Lesson 2: Cleansing Light    — +15% more and new skill Cleansing Light (heals the party and cleanses)
   Lesson 3: The Old Light      — +20% more and new skill Forgotten Light (heals the party, regeneration, revives)
   State: flags sky_train_1/2/3
   ===================================================================== */
const SKY_LESSONS = [
  {n:1, name:'Reading the Body', cost:{forest_herb:3}, lv:30, text:'The Ghost Healer teaches Sky to read where a wound truly lies before the light is spent. "Heal the cause, not the sign."', gain:'Sky\'s healing +15%'},
  {n:2, name:'Cleansing Light', cost:{forest_herb:4, demon_ash:1}, lv:34, text:'Rare herbs and a patient hand: Sky learns to draw corruption out as the light goes in.', gain:'Healing +15% more; new skill Cleansing Light'},
  {n:3, name:'The Old Light', cost:{forest_herb:5, relic_dust:1}, lv:40, trust:true, text:'"There are traces of something very old within you." The Ghost Healer does not say what. They teach Sky to let it rise, only a little.', gain:'Healing +20% more; new skill Forgotten Light'},
];
const skyStage = () => [1,2,3].filter(n => G.flags['sky_train_'+n]).length;
const skyHealMult = () => 1 + [0, .15, .30, .50][skyStage()];
function lessonState(L){
  if(G.flags['sky_train_'+L.n]) return 'done';
  if(L.n>1 && !G.flags['sky_train_'+(L.n-1)]) return 'locked';
  if(!G.party.includes('ghost_healer')) return 'away';
  if(avgPartyLv() < L.lv) return 'lv';
  if(L.trust && !G.flags.ghost_trust) return 'trust';
  if(!Object.keys(L.cost).every(k => (G.inv[k]||0) >= L.cost[k])) return 'items';
  return 'ready';
}
function trainSky(n){
  const L = SKY_LESSONS[n-1]; if(!L || lessonState(L)!=='ready') return ['Not ready for this lesson.'];
  Object.keys(L.cost).forEach(k => G.inv[k] -= L.cost[k]);
  G.flags['sky_train_'+n] = true;
  const msgs = ['🕯️ Lesson '+n+': '+L.name+'. '+L.text, '✨ '+L.gain];
  const m = addBond('sky', 4); if(m) msgs.push(m);
  return msgs.concat(advanceDay(1));
}
function rApprentice(){
  if(!isRecruited('ghost_healer') && !skyStage()) return '';
  const why = {locked:'🔒 Finish the previous lesson', away:'🔒 The Ghost Healer is not with you', lv:'', trust:'🔒 The Ghost Healer must trust you first (the gift quest)', items:'', ready:''};
  const rows = SKY_LESSONS.map(L => { const st = lessonState(L), cost = Object.keys(L.cost).map(k => ITEMS[k].icon+' '+ITEMS[k].n+' ×'+L.cost[k]+' ('+(G.inv[k]||0)+')').join(', ');
    return `<div class="ev ${st==='done'?'taken':st==='ready'?'ready':'locked'}"><div><b>${L.n}. ${L.name}</b> <span class="sm">${L.gain}</span><div class="sm">${st==='done'?'✔ learned':cost+' · party level '+L.lv+(why[st]?' · '+why[st]:st==='lv'?' · 🔒 needs level '+L.lv:'')}</div></div><button ${st==='ready'?'':'disabled'} onclick="act(trainSky,${L.n})">${st==='done'?'Done':'Train'}</button></div>`; }).join('');
  return `<h4>🕯️ Apprenticeship with the Ghost Healer</h4><div class="sm">Sky learns from the Ghost Healer. Each lesson takes a day. Healing power now ×${skyHealMult().toFixed(2)}.</div>${rows}`;
}
