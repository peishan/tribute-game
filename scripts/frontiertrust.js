/* =====================================================================
   TRIBUTE — THE DEAD QUEEN OF THE FRONTIER: NORTHERN FRONTIER TRUST (post-Arc XXIV gameplay)
   Elise\'s reported death (ch628) leaves a scar on the place she mattered to. The frontier mourns her; people who knew her well notice what does not add up; a small minority mutter that the
   death was political. Nobody finds out the truth. Aster and Fen quietly keep any inquiry from reaching her. To the frontier the sequence looks bad (serves the frontier, becomes queen, dies, the
   court closes the matter), and the party\'s name does not override that distrust: it has to be earned, and Jade can never expose Elise and Tarin.
   SEVEN OPTIONAL QUESTS from ch629, at the Northern Frontier (Dragonvale\'s):
     The Dead Queen of the Frontier (rumours: memorials, the old soldiers\' stories, a woman who looks like Elise travelling under another name, officials who call it grief; the rumours are
       accidentally close to the truth), Frontier Supplies, The Patrol Road (a hunt), The Loyalist (the question "Did Queen Elise really die?": Jade cannot give the truth), A Fair Hearing
       (a local dispute settled without royal authority), The Walls Beside the Locals (defence), and Trust Earned (the council opens its books).
   TRUSTED (flag frontier_trusted): safe travel on the frontier roads, scouts (fewer ambushes), +15% convoy pay there, a Frontier Cache every 7 days (materials), the deep patrol hunt, and the
   frontier\'s support pledged for the endgame (flag frontier_endgame_support, for XXXIV Purification). LEGACY: a memorial, stories that contradict one another, an inn renamed The Queen\'s Rest,
   and word that reaches Elise far away. All numbers first-pass. State: G.fTrust = {cacheDay, answered}.
   ===================================================================== */
const ftOpen = () => !!(G && G.flags && G.flags.elise_valen_dies);
const FT_MISSIONS = ['m_ft_rumours','m_ft_supplies','m_ft_patrol','m_ft_loyalist','m_ft_dispute','m_ft_defense'];
const ftDone = () => FT_MISSIONS.filter(id => mState(id)==='done').length;
const frontTrusted = () => !!(G && mState('m_ft_trust')==='done');
function ftSync(){ if(frontTrusted()){ G.flags.frontier_trusted = true; G.flags.frontier_endgame_support = true; } }
const ftState = () => { if(!G.fTrust) G.fTrust = {cacheDay:-99, answered:null}; return G.fTrust; };
const frontEdge = () => frontTrusted() && G.loc==='border_frontier';

(function(){
  const FT = 629, rw = (n, x) => ({xp:1300000+n*45000, gold:300000+n*9000, rep:2400+n*10});
  let gi = 1900;
  const spot = (id, n, icon, desc, clues, prev, extra) => Object.assign({id, kind:'investigate', n, icon, ch:FT, need:2, ambush:[], lo:96, roles:['jade'], desc, clues,
    rw:{xp:193100+300*(gi), gold:40920+60*(gi++)}}, prev ? {needFlag:'inv_'+prev, lockMsg:'🔒 Finish the previous clue first'} : {needFlag:'elise_valen_dies', lockMsg:'🔒 Nothing has happened here yet'}, extra||{});
  LOCATIONS.border_frontier.spots.push(
    // The Dead Queen of the Frontier
    spot('ftA1','Memorials in the Snow','🕯️','Small shrines have appeared.',['Small memorials have appeared along the frontier road: a ribbon on a fence post, a lantern at the gate, a name chalked on a wall. Most are simple. Nobody asked anyone to make them.','The soldier at the gate says it plainly: "She was ours first. The court only borrowed her."'],null),
    spot('ftA2','What the Old Soldiers Say','🪖','Stories over a fire.',['The old soldiers tell stories about her: how she walked the line before dawn and learned every post by name, and how she never once asked them to look away from what they saw.','Some of them still use what she taught them, and a few of them stop mid-sentence. "She was too young to die that way," one says. "Too quick, too."'],'ftA1'),
    spot('ftA3','A Woman Who Looked Like Her','🧣','A rumour on the road.',['A wagoner swears he saw a woman who looked like the Queen travelling under another name, dark-haired and quiet, with a man who watched the road. He knows how it sounds.','The innkeeper tells it differently: "My cousin saw her too. Or someone. Everyone sees her now." Jade says nothing, and it costs her.'],'ftA2'),
    spot('ftA4','The Officials Call It Grief','📜','An answer that does not satisfy.',['The garrison officials dismiss it as grief or conspiracy: a hard winter, a loved queen, a story the people need. Some of the old hands do not look convinced.','A note from Dragonvale reaches the commander: the king\'s office asks that no inquiry be opened, for the Queen\'s memory and the frontier\'s peace. It is polite, and it closes the door gently. Some of the rumours are uncomfortably close to the truth.'],'ftA3'),
    // Frontier Supplies
    spot('ftB1','Short of Salt and Arrows','🧂','Practical shortages.',['A settlement down the road is short of salt, arrows and lamp oil. The convoys that used to reach it now go elsewhere, and nobody explained why.','They do not ask the party for anything. Jade works out the list on her own.'],'ftA1'),
    spot('ftB2','Carrying It In','🎒','Bringing it in.',['The party hauls the stores through the pass. The settlement\'s headwoman counts every sack twice and says nothing about the court.','"You did this without being told to," she says. "That is not what court people do."'],'ftB1'),
    // The Loyalist
    spot('ftD1','The Loyalist','👴','An old man at the lodge.',['An old man at the Frontier Lodge was one of Elise\'s first soldiers. He does not believe the official account, and he says so in a voice that carries.','"They closed the matter too fast," he says. "A queen who dies in winter and a king who writes a polite letter. I do not say she was killed. I say nobody asked."'],'ftA1'),
    spot('ftE1','Two Clans, One Well','💧','A dispute that is nobody\'s fault.',['Two frontier clans claim the same spring after the snowmelt moved the old boundary. Each says the other started it, and each has a point.','Jade does not invoke royal authority. She walks the line with both, and sits down.'],'ftD1'),
    spot('ftE2','A Fair Hearing','⚖️','Both sides are heard.',['Jade hears both clans out and lets the elders mark the new line themselves. Nobody wins, and nobody loses face.','An elder says: "A queen once settled things like this." Jade says nothing, again.'],'ftE1'),
    spot('ftF1','The Wall Needs Hands','🛡️','Raiders on the road.',['Raiders have tested the frontier wall twice this month. The garrison is thin; the villagers have taken up pikes.','Jade does not take command. She asks where they want her.'],'ftB1'),
    // Trust Earned
    spot('ftG1','The Council Opens Its Books','📖','The frontier shares what it knows.',['The frontier council has watched the party for weeks. It opens its books: patrol rotas, supply routes, the places the walls are weak.','The headman says: "We do not know what happened to our queen. We know you did not hurt us. That will have to be enough." Jade accepts it, and keeps what she knows.'],'ftA4'),
  );
  // the loyalist\'s question: a choice, not a clue
  LOCATIONS.border_frontier.spots.push({id:'ftD2', kind:'frontchoice', n:'"Did Queen Elise Really Die?"', icon:'❔', ch:FT, desc:'The old soldier asks Jade directly.', needFlag:'inv_ftD1', lockMsg:'🔒 Speak with the loyalist first'});
  // the hunts and the cache
  LOCATIONS.border_frontier.spots.push(
    {id:'ft_deep_hunt', kind:'hunt', n:'The Deep Patrol', icon:'🗡️', desc:'Patrol routes the council has opened: raiders, wolves and worse, far up the frontier.', pool:['northern_mercenary','frontier_diverter','forest_wolf'], lo:96, ch:FT, needFlag:'frontier_trusted', lockMsg:'🔒 The council has not opened its patrol routes to you'},
    {id:'ft_cache', kind:'frontcache', n:'The Frontier Cache', icon:'📦', desc:'The council\'s stores: materials and supplies, shared with those it trusts.', ch:FT, needFlag:'frontier_trusted', lockMsg:'🔒 The council has not opened its stores to you'},
    {id:'ft_memorial', kind:'frontlegacy', n:'The Memorial', icon:'🕯️', desc:'A small memorial at the gate. People leave things here.', ch:FT, needFlag:'inv_ftA1', lockMsg:'🔒 There is nothing here yet'});
  MISSIONS.push(
    {id:'m_ft_rumours', needCh:FT, title:'The Dead Queen of the Frontier', obj:{type:'steps', steps:[{label:'Memorials in the Snow', spot:'ftA1'},{label:'What the Old Soldiers Say', spot:'ftA2'},{label:'A Woman Who Looked Like Her', spot:'ftA3'},{label:'The Officials Call It Grief', spot:'ftA4'}]}, rw:rw(1), subj:'The frontier is grieving', body:'The people of the frontier are talking about their queen. Listen to them. Say nothing. — Jade'},
    {id:'m_ft_supplies', needCh:FT, title:'Frontier Supplies', obj:{type:'steps', steps:[{label:'Short of Salt and Arrows', spot:'ftB1'},{label:'Carrying It In', spot:'ftB2'}]}, rw:rw(2), subj:'A settlement in need', body:'Nobody asked the party for help, and that is why it counts. — Jade'},
    {id:'m_ft_patrol', needCh:FT, title:'The Patrol Road', obj:{type:'steps', steps:[{label:'Clear the patrol road', kill:'road_bandit', need:5}]}, rw:rw(3), subj:'The road is not safe', body:'Protect people without asking for anything first. — Jade'},
    {id:'m_ft_loyalist', needCh:FT, title:'The Loyalist', obj:{type:'steps', steps:[{label:'Meet the old soldier', spot:'ftD1'},{label:'Answer his question', spot:'ftD2'}]}, rw:rw(4), subj:'An old soldier who does not believe it', body:'He asked a question that has only one honest answer, and Jade cannot give it. — Jade'},
    {id:'m_ft_dispute', needCh:FT, title:'A Fair Hearing', obj:{type:'steps', steps:[{label:'Two Clans, One Well', spot:'ftE1'},{label:'A Fair Hearing', spot:'ftE2'}]}, rw:rw(5), subj:'A quarrel over water', body:'Settle it fairly, without a royal word. — Jade'},
    {id:'m_ft_defense', needCh:FT, title:'The Walls Beside the Locals', obj:{type:'steps', steps:[{label:'The Wall Needs Hands', spot:'ftF1'},{label:'Stand with the locals', kill:'northern_mercenary', need:6}]}, rw:rw(6), subj:'The wall is thin', body:'Fight beside them, not in front of them. — Jade'},
    {id:'m_ft_trust', needCh:FT, title:'Trust Earned', obj:{type:'steps', steps:FT_MISSIONS.map(id => ({label:{m_ft_rumours:'Listen to the frontier', m_ft_supplies:'Bring what is needed', m_ft_patrol:'Keep the road safe', m_ft_loyalist:'Meet the loyalist', m_ft_dispute:'Settle the dispute', m_ft_defense:'Stand on the wall'}[id], mission:id})).concat([{label:'The Council Opens Its Books', spot:'ftG1'}])}, rw:rw(8), subj:'The council is ready to speak', body:'The frontier does not forget its queen. It may yet trust the people who did not take advantage of it. — Jade'}
  );
  LORE.push(
    {ch:629, n:'The Frontier Mourns', t:'The frontier mourned Queen Elise: memorials appeared along the road, old soldiers told stories of how she walked the line before dawn, and some of those who knew her best noticed that the official account did not add up. No one found the truth, and the king\'s office asked that no inquiry be opened.'},
    {ch:629, n:'Trust Earned', t:'The Northern Frontier\'s council opened its books to Jade\'s party after weeks of quiet work. The party never told it what happened to Queen Elise.'});
  ROUTES.filter(r => r.a==='border_frontier' || r.b==='border_frontier').forEach(r => { const base = r.risk; Object.defineProperty(r, 'risk', {get(){ return frontTrusted() ? 0 : base; }, set(v){}, configurable:true, enumerable:true}); });
  // the inn is renamed once the frontier trusts the party
  const inn = LOCATIONS.border_frontier.spots.find(s => s.id==='frontier_inn');
  if(inn){ const base = inn.n; Object.defineProperty(inn, 'n', {get(){ return frontTrusted() ? 'The Queen\'s Rest' : base; }, set(v){}, configurable:true, enumerable:true}); }
})();

// the loyalist\'s question
function ftAnswer(k){
  if(!ftOpen() || !G.flags.inv_ftD1 || G.flags.inv_ftD2) return [];
  const msgs = [];
  if(k==='silence') msgs.push('❔ Jade: "I am sorry for your loss. I cannot say more than that." The old man looks at her a long moment, and nods once. It is not an answer. It is respect.');
  else if(k==='kind') msgs.push('❔ Jade: "She was loved here. Keep that: it is the part that is true." He turns away, and wipes his face with the back of his hand.');
  else { msgs.push('❔ Jade tells him. His face does not change. "Then I will carry it," he says. "May it be a light weight." The secret is no longer only yours.'); G.flags.elise_secret_slipped = true; if(typeof hfnAddSusp==='function') hfnAddSusp(60).forEach(m => msgs.push(m)); }
  ftState().answered = k; G.flags.inv_ftD2 = true; G.flags.ft_loyalist_answered = true;
  msgs.push.apply(msgs, grantReward({xp:193100+300*1912, gold:40920+60*1912}, '🕯️ Answered the loyalist'));
  msgs.push.apply(msgs, checkSteps()); msgs.push.apply(msgs, advanceDay(0)); ftSync(); save(); return msgs;
}
function frontCache(){
  if(!frontTrusted()) return [];
  const s = ftState(); if(G.day - s.cacheDay < 7) return ['The council has already shared this week\'s stores.'];
  s.cacheDay = G.day;
  const items = [{id:'seal_dust', qty:1+Math.floor(Math.random()*2)}, {id:'spirit_thread', qty:1}, {id:'herbal_tonic', qty:2}];
  addItems(items); const gold = 20000 + avgPartyLv()*800; G.gold += gold;
  save(); return ['📦 The council shares its stores: '+items.map(i => ITEMS[i.id].icon+' '+ITEMS[i.id].n+' ×'+i.qty).join(', ')+' and '+gold.toLocaleString()+'g.'].concat(advanceDay(0));
}
const FT_STORIES = [
  'The old soldiers say she walked the line before dawn and knew every post by name. Nobody agrees on the last time they saw her.',
  'A baker says the Queen was taken by the winter fever. A farrier says she was never ill. They have both been right about everything else.',
  'A child, told to hush, whispers that the Queen is only travelling. Her mother says that is a lovely thing to believe.',
  'A sergeant still salutes at the memorial at dawn. "Habit," he says, and does not look embarrassed.',
  'Someone has left a ribbon the colour of a spring flower. It was there yesterday, and the day before.',
  'The innkeeper swears a woman with short dark hair paid for a round, years ago, and told him a story about a sparrow. He has told it every night since.',
];
function rFrontLegacy(){
  const n = FT_STORIES.length, a = FT_STORIES[(G.day*3) % n], b = FT_STORIES[(G.day*3+2) % n];
  let h = `<div class="panel"><div class="sm">A small memorial at the gate: ribbons, lanterns, chalked names. People leave things here.</div><div class="sm">${a}</div><div class="sm">${b}</div>`;
  if(G.flags.inv_ftA2) h += `<div class="sm">Some of the soldiers still stand the way she taught them to stand on the wall.</div>`;
  if(G.flags.inv_ftA4) h += `<div class="sm">Nobody at the memorial speaks about the polite letter from Dragonvale.</div>`;
  if(frontTrusted()) h += `<div class="sm">The inn by the gate is called The Queen\'s Rest now. Somewhere far from here, someone hears that the frontier remembers.</div>`;
  return h + '</div>';
}
function rFrontChoice(){
  if(G.flags.inv_ftD2) return `<div class="panel"><div class="sm">You answered the old soldier ${ftState().answered==='confide' ? 'with the truth. The secret is no longer only yours.' : 'without giving the truth away.'}</div></div>`;
  return `<div class="panel"><div class="sm">The old soldier waits. "Did Queen Elise really die?" Jade cannot give him the truth, and she cannot lie to him easily either.</div>
    <button class="pri" onclick="act(ftAnswer,'silence')">Say only that you are sorry</button>
    <button class="pri" onclick="act(ftAnswer,'kind')">Tell him she was loved here</button>
    <button onclick="act(ftAnswer,'confide')">Tell him the truth (the secret is no longer only yours)</button></div>`;
}
function rFrontCache(){
  const s = ftState(), left = Math.max(0, 7 - (G.day - s.cacheDay));
  return `<div class="panel"><div class="sm">The council\'s stores: materials and supplies, shared once a week with those it trusts.</div><button class="pri" ${left?'disabled':''} onclick="act(frontCache)">Ask for this week\'s share${left?' (ready in '+left+' days)':''}</button></div>`;
}
function frontTrustPanel(){
  if(!ftOpen() || !mState('m_ft_rumours') || false) return '';
  const n = ftDone(), tr = frontTrusted();
  return `<h4>🏔️ The Northern Frontier: ${tr ? 'Trusted' : n>=4 ? 'Warming' : 'Wary'}</h4><div class="sm">${tr ? 'The frontier council shares what it knows. Safe roads, scouts, +15% convoy pay there, a weekly cache, the deep patrol and a pledge of support for the endgame. Elise\'s legacy stays with the people.' : 'The frontier grieves and distrusts the central kingdoms: a queen who served it, who died, and a matter the court closed too fast. Trust is earned by honest work, never by royal authority. ('+n+'/6 quests done.)'}</div>`;
}
(function(){ const _rc = rCase; rCase = function(){ ftSync(); return _rc() + frontTrustPanel(); }; })();
(function(){   // convoy pay on the frontier, and word reaching Elise
  if(typeof convoyPay==='function'){ const _cp = convoyPay; convoyPay = function(share){ const p = _cp(share); if(frontEdge()){ p.rw.xp = Math.round(p.rw.xp*1.15); p.rw.gold = Math.round(p.rw.gold*1.15); p.notes.push('Frontier trust +15%'); } return p; }; }
  if(typeof rFrontDesk==='function'){ const _fd = rFrontDesk; rFrontDesk = function(){ let h = _fd(); if(G.flags.inv_ftA1) h = h.replace('<h4>Reform prelude</h4>', '<div class="sm">🕯️ Word has reached Elise, far away: the frontier still remembers her, and she has been told nothing she must answer.</div><h4>Reform prelude</h4>'); return h; }; }
})();
