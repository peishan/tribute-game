/* =====================================================================
   TRIBUTE — THE ROYAL COURT OF ALTAN (after Arc XXVII and XXVIII; the author's gameplay unlocks)
   ROYAL COURT HUB    Altan Capital gains "The Royal Court" (from the coronation, ch730): an audience with the senior minister, the Royal Uncle, the Royal Aunt, Aaliyah, King Rheon and Sera.
                      Each audience is once a day, gives a line that changes with the story and a little XP, and raises COURT STANDING (G.court.rep).
   COURT GAMES        Mirelle's Salon (from the wedding, ch733): social side quests in four kinds: cards, negotiation, bluffing and dispute resolution. A case is played once a day:
                      choose an approach; each approach is led by a member of the party (success is likelier with the lead present). Won cases are kept (G.court.cases);
                      four wins set court_games_skilled, which the Altan reform quests can build on later.
   AALIYAH ALTAN      A recurring Altan questgiver (three errands in the same court-case form). Relationship status: deliberately single (flag aaliyah_single). Nothing is reserved in play.
   SKY EATER HUNTS    After the Sky Eater falls (ch708), optional aerial-corruption hunts open in the high places: the Altan high roads, the pass, the Frostveil peaks, the mountain crossing
                      and the Northern Frontier. They drop Sky-Eater Scales and Skyfed Ash.
   SILVER CROWN FORM  After the Sky Eater (ch708), in any fight Rheon is not already in, any ally may call RHEON, SILVER CROWN: he joins for 3 turns of his own with +30% ATK, MAG and DEF,
                      then steps back (once per two in-game days). He is never saved with battle damage. Resting hair is golden; in battle it is silver-white.
   All numbers and wording first-pass.
   ===================================================================== */
// ---------- items and enemies for the Sky Eater hunts ----------
Object.assign(ITEMS, {
  sky_scale:{n:'Sky-Eater Scale',icon:'🪽',type:'material',rarity:'rare'},
  skyfed_ash:{n:'Skyfed Ash',icon:'🌫️',type:'material',rarity:'uncommon'},
});
Object.assign(ENEMIES, {
  drained_hawk:{n:'Drained Hawk',icon:'🦅',area:'dragon',hp:104,atk:19,mag:0,def:7,spd:20,xp:48,gold:20,traits:['corrupt'],
    moves:[{n:'Hollow Dive',pow:1.2},{n:'Starved Rake',pow:1}],drops:[{id:'skyfed_ash',chance:.3}],desc:'A hawk emptied of everything but hunger, still circling where the sky fed.'},
  skyfed_wisp:{n:'Skyfed Wisp',icon:'🌫️',area:'dragon',hp:88,atk:6,mag:24,def:5,spd:17,xp:50,gold:22,traits:['magic','corrupt'],
    moves:[{n:'Draining Touch',pow:1.1,spell:true},{n:'Hollow Chorus',pow:.9,all:true,spell:true}],drops:[{id:'skyfed_ash',chance:.35}],desc:'A scrap of stolen vitality that has forgotten whose it was.'},
  hollow_raptor:{n:'Hollow Raptor',icon:'🪽',area:'dragon',hp:150,atk:25,mag:6,def:10,spd:19,xp:72,gold:34,traits:['corrupt'],
    moves:[{n:'Descending Talons',pow:1.4},{n:'Emptying Screech',pow:1,all:true,spell:true}],drops:[{id:'sky_scale',chance:.2},{id:'skyfed_ash',chance:.25}],desc:'A great bird hollowed by the Sky Eater, striking out of the high air.'},
});
['drained_hawk','skyfed_wisp','hollow_raptor'].forEach(k => { LOOT[k] = {guaranteed:[],rolls:ENEMIES[k].drops.map(d => ({id:d.id,chance:d.chance}))}; });
const SKY_HUNT_PLACES = ['altan_high_roads','altan_pass','frostveil_peaks','mountain_crossing','border_frontier'];
SKY_HUNT_PLACES.forEach(loc => {
  if(LOCATIONS[loc] && LOCATIONS[loc].spots && !LOCATIONS[loc].spots.some(s => s.id==='sky_hunt_'+loc))
    LOCATIONS[loc].spots.push({id:'sky_hunt_'+loc, kind:'hunt', n:'The Sky Above (Sky Eater Hunt)', icon:'🪽', desc:'What the Sky Eater left behind: hollowed birds and stolen vitality, still hunting the high air.', pool:['drained_hawk','skyfed_wisp','hollow_raptor'], lo:100, ch:708});
});

// ---------- court state ----------
const courtData = () => { if(!G.court) G.court = {rep:0, seen:{}, cases:{}, playDay:-1, wins:0}; return G.court; };
const COURT_RANKS = [[0,'Newcomer'],[6,'Known at court'],[14,'Trusted'],[26,'Counsel'],[40,'Confidant of the throne']];
const courtRank = () => { let r = COURT_RANKS[0][1]; COURT_RANKS.forEach(([v, n]) => { if(courtData().rep >= v) r = n; }); return r; };
const courtOpen = () => !!G && G.ch >= 730;
const salonOpen = () => !!G && G.ch >= 733;
const cflag = f => !!(G && G.flags && G.flags[f]);

const COURT_FIGURES = {
  minister:{n:'The Senior Minister', icon:'🎩', who:'Altan\'s senior minister. Careful, cautious, no longer quite so sure.', lines:[
    'Your Majesty has asked for records, witnesses and affected citizens. We are, I confess, running out of excuses to say it cannot be done.',
    () => cflag('altan_first_reform_announced') ? 'The traditionalists object loudly. Privately, several have asked how to word their own petitions under the new law.' : 'The review is under way. It will take time, as I said. I did not say it would be wasted.',
    'The borders and fortifications first, I said. His Majesty said "and also". I am learning what "and also" costs.',
    'I served three kings of this house. I did not think I would serve one who asks the clerks questions.']},
  uncle:{n:'The Royal Uncle', icon:'🧔', who:'Rheon\'s father\'s brother. Experienced in governance and military affairs.', lines:[
    'I kept the court steady so that he would have something to inherit. He has made it something worth keeping.',
    'Military reconstruction is slow work. Walls first, then trust. The soldiers shout his name; that is worth a regiment.',
    () => cflag('twelve_of_fifteen_and_the_structure') ? 'Twelve fallen. Whatever stands behind the Fifteen, I would rather meet it with a kingdom that is not ashamed of itself.' : 'Something lies under the First Throne. We built over it for centuries. I do not enjoy being a man who built over it.',
    'My wife says I hover. I say I observe. We have both been right for thirty years.']},
  aunt:{n:'The Royal Aunt', icon:'🌸', who:'Sera and Rheon\'s mother\'s sister. She keeps the household, the court and its manners.', lines:[
    'Mirelle plays cards the way other people sign treaties. I shall never forgive her for it, and I shall invite her to every table.',
    () => cflag('mirelle_is_with_child') ? 'A child in the house again. Do not tell the kitchen I am humming. They will want something.' : 'The household is the quiet half of a kingdom. Nobody notices it until it is gone.',
    'Aaliyah asked me what the point was. I told her I would like to know. We are both still waiting.',
    'Rheon was a difficult boy and is a reasonable man. I take full credit and no responsibility.']},
  aaliyah:{n:'Aaliyah Altan', icon:'🌹', who:'Sera and Rheon\'s double first cousin. Clever, spoiled and entertained. Relationship status: deliberately single.', lines:[
    'Attached? Don\'t insult me. I am deliberately, magnificently unattached, and everyone else is simply less fun.',
    'If anyone suitable ever turns up, I will tell you immediately. I will also pretend I did not.',
    () => cflag('aaliyah_defends_mirelle') ? 'I defended your friend Mirelle and the ministers have not forgiven me. Marvellous. I have errands for those who want to help me annoy them.' : 'I find things out. It is the only honest talent a princess is allowed.',
    'Do not let the court tell you who to be. I say this as a woman who has been told by experts.']},
  rheon:{n:'King Rheon', icon:'👑', who:'King of Altan. Golden hair at rest; silver-white in battle.', lines:[
    () => cflag('rheon_and_mirelle_wed') ? 'Married. Crowned. Expecting a child. I am told this is a great deal for one year. I am told it by people who are also sleeping badly.' : 'The crown can wait. The kingdom cannot. I said it once and the court has not let me forget.',
    'The review of the laws is slow. I would rather it be slow and right. The Serpent was patient too, and look what patience cost us.',
    () => cflag('boss_boss_ashen_serpent') || cflag('ashen_serpent_defeated') ? 'Twelve of fifteen. When you call me, I will come. That was never a question.' : 'Call me, in a fight that matters. I will not wait for a crown.',
    'You may take my sword arm when you need it. Not my throne. The throne I am keeping.']},
  sera:{n:'Sera', icon:'🦅', who:'Altan\'s princess, and Rheon\'s sister. Home, and not quite at home.', lines:[
    'Altan does not look like the kingdom I left. I find I do not mind. I mind that I did not help it change sooner.',
    'Hugh wrote again. It was a very proper letter. I read it only the usual number of times.',
    'My brother is a king. It is strange to say it. It is stranger to find it so unsurprising.',
    () => cflag('sera_marriage_law_found') ? 'The old law remembers what it was willing to do. I would like the new one to remember what it refused.' : 'I carry nothing I did not choose. That is my whole quarrel with the old law.']},
};
function courtAudience(id){
  const c = courtData(), f = COURT_FIGURES[id]; if(!f || !courtOpen()) return [];
  if(c.seen[id] === G.day) return [f.n+' has already received you today.'];
  c.seen[id] = G.day; c.rep++;
  const pool = f.lines.map(l => typeof l==='function' ? l() : l), line = pool[(G.day + c.rep) % pool.length];
  const msgs = [f.icon+' '+f.n+': "'+line+'"', 'Court standing +1 ('+courtRank()+').'];
  gainXp(30000 + Math.round(avgPartyLv()*400), G.party).forEach(m => msgs.push(m));
  if(id==='aaliyah') G.flags.aaliyah_single = true;
  return msgs;
}

// ---------- court cases (Mirelle's games and Aaliyah's errands) ----------
const CASE_KINDS = {cards:'🃏 Cards', negotiation:'🤝 Negotiation', bluff:'🎭 Bluffing', dispute:'⚖️ Dispute resolution', errand:'🌹 Aaliyah\'s errand'};
const COURT_CASES = [
  {id:'cards1', giver:'mirelle', kind:'cards', n:'The Aunt\'s Rematch', t:'The Royal Aunt wants one more round, and has brought two ministers who have never lost to a woman at cards.', opts:[
    ['Read the table, not the cards', 'jade', 'Jade reads who is bluffing and who is bored. The aunt laughs; the ministers pay.', 'The table closes ranks and the aunt wins by one trick.'],
    ['Count what has been played', 'levi', 'Levi counts without seeming to. The ministers pay.', 'A misdeal, a distraction, a lost count.']]},
  {id:'cards2', giver:'mirelle', kind:'cards', n:'The Minister\'s Wager', t:'A minister bets a seat on the reform council against a cask of wine: if he loses, he hears the case for the first law with an open mind.', opts:[
    ['Play slowly and let him talk', 'sally', 'Sally keeps him talking until he plays his best hand too early. He keeps his word.', 'He is better than he looks, and sulks about it.'],
    ['Win by a wide margin', 'devon', 'Devon plays it by the book. The minister concedes with a straight face.', 'The margin is narrow and the minister demands another look at the rules.']]},
  {id:'neg1', giver:'mirelle', kind:'negotiation', n:'The Grain Tariff', t:'Two houses want the same grain road. Mirelle asks the party to settle the tariff before the harvest.', opts:[
    ['Offer a shared toll for the harvest', 'devon', 'Devon drafts the toll; both houses sign.', 'Neither house will be seen to give first.'],
    ['Let the farmers speak', 'sky', 'Sky listens to the carters and the toll writes itself.', 'The carters shout over each other.']]},
  {id:'neg2', giver:'mirelle', kind:'negotiation', n:'A Union Across Rank', t:'A guild master\'s daughter and a minor lord\'s son wish to wed, and the old caste rules say no. The clerks need a form of words.', opts:[
    ['Find the precedent that allows it', 'jade', 'Jade finds an older case the clerks had forgotten. The words are agreed.', 'The old case turns out to cut the other way.'],
    ['Appeal to the families\' interests', 'sally', 'Sally finds what each family wants and trades it. The words are agreed.', 'One family wants the match to fail for its own reasons.']]},
  {id:'bluff1', giver:'mirelle', kind:'bluff', n:'The Forged Seal', t:'A seal on a tax order is a forgery, and the man who used it is sure no one can prove it.', opts:[
    ['Act as though the proof is already in hand', 'sally', 'Sally says nothing and holds a blank page like a verdict. He confesses.', 'He calls the bluff and walks out.'],
    ['Let him think the forger already named him', 'jade', 'Jade lets the silence do it. He names the forger.', 'He laughs; he has seen this trick before.']]},
  {id:'dispute1', giver:'mirelle', kind:'dispute', n:'The Weaver\'s Widow', t:'A weaver\'s widow has been refused her husband\'s workshop because widows may only "withdraw from public life". Mirelle wants the case heard as the first test of the new law.', opts:[
    ['Argue it from the review\'s own findings', 'jade', 'Jade cites the preliminary review. The workshop is hers.', 'The clerk insists the review is only a draft.'],
    ['Bring the guild in before the hearing', 'sally', 'Sally has the guild in the room before the clerk arrives. The workshop is hers.', 'The guild arrives late and divided.']]},
  {id:'dispute2', giver:'mirelle', kind:'dispute', n:'The Boundary Wall', t:'A wall between two villages has been moved in the night, and each village swears the other did it.', opts:[
    ['Walk the boundary with both headmen', 'levi', 'Levi reads the ground; the wall was moved by the flood. Both villages repair it.', 'The ground has been trampled flat.'],
    ['Ask the oldest woman in each village', 'sky', 'Sky sits and listens; the two stories agree where it matters.', 'Neither will speak to the other\'s healer.']]},
  {id:'bluff2', giver:'mirelle', kind:'bluff', n:'The Empty Hand', t:'A rival envoy bluffs a war he cannot afford. Mirelle wants him to leave the table believing he won.', opts:[
    ['Let him win the first round', 'sally', 'Sally concedes with grace; he leaves content and signs the quiet treaty.', 'He smells the concession and doubles his price.'],
    ['Call his bluff politely', 'devon', 'Devon calls it so mildly he does not notice he has folded.', 'He notices.']]},
  {id:'err1', giver:'aaliyah', kind:'errand', n:'The Misplaced Invitation', t:'An invitation addressed to Aaliyah has "gone missing" before a dull banquet. She would like it found, or at least blamed on someone interesting.', opts:[
    ['Trace the courier', 'levi', 'Levi finds it in a minister\'s sleeve. Aaliyah is delighted.', 'The trail ends at a laundress who has never seen it.'],
    ['Charm the steward', 'sally', 'Sally charms the steward into a confession. Aaliyah is delighted.', 'The steward is incorruptible and a little offended.']]},
  {id:'err2', giver:'aaliyah', kind:'errand', n:'What the Ministers Whisper', t:'Aaliyah wants to know which ministers are quietly drafting petitions against the first reform, and which are quietly drafting petitions to join it.', opts:[
    ['Listen where ministers think they are alone', 'sally', 'Sally comes back with names and a very good story. Aaliyah pays.', 'Sally is told only about the weather.'],
    ['Read the clerks\' copy-books', 'jade', 'Jade reads three copy-books and a lie. Aaliyah pays.', 'The copy-books are blank; the clerks were warned.']]},
  {id:'err3', giver:'aaliyah', kind:'errand', n:'No Suitors, Thank You', t:'A delegation has arrived with a portrait of a prince. Aaliyah would like the delegation to leave pleased and the prince to forget the idea. She is deliberately single.', opts:[
    ['Be very charming about it', 'sally', 'The delegation leaves pleased and the prince forgets. Aaliyah owes you.', 'The delegation is persuaded she is playing hard to get.'],
    ['Be very honest about it', 'devon', 'Devon explains, politely, that she is not available and does not wish to be. Nobody is offended.', 'The delegation takes honesty for a negotiating position.']]},
];
const caseById = id => COURT_CASES.find(c => c.id===id);
const caseState = id => (courtData().cases[id] || {}).st;
const caseOpenFor = c => c.giver==='aaliyah' ? courtOpen() : salonOpen();
let courtPending = null;
function courtStart(id){
  const c = caseById(id); if(!c || !caseOpenFor(c) || caseState(id)==='won') return [];
  if(courtData().playDay === G.day) return ['A case a day is enough: come back tomorrow.'];
  courtPending = id; return [];
}
function courtPick(i){
  const c = caseById(courtPending); if(!c) return [];
  const d = courtData(); courtPending = null; d.playDay = G.day;
  const o = i < c.opts.length ? c.opts[i] : null, lead = o ? o[1] : null;
  const leadHere = !!(lead && G.party.includes(lead));
  const chance = o ? (leadHere ? .74 : .42) : .6;
  const win = Math.random() < chance;
  const msgs = [(o ? o[0] : 'Be straightforward')+': '+(win ? (o ? o[2] : 'You lay it out plainly, and plain turns out to be persuasive.') : (o ? o[3] : 'Plain speaking is not enough this time.'))];
  if(o && !leadHere) msgs.push('('+(CHARACTERS[lead] ? CHARACTERS[lead].n : lead)+' was not with the party; it went less smoothly.)');
  if(win){
    d.cases[c.id] = {st:'won', day:G.day}; d.wins++; d.rep += 2;
    grantReward({xp:150000 + Math.round(avgPartyLv()*1500), gold:30000 + Math.round(avgPartyLv()*300), rep:20}, c.n).forEach(m => msgs.push(m));
    if(d.wins >= 4 && !G.flags.court_games_skilled){ G.flags.court_games_skilled = true; msgs.push('✦ Four cases won: the court now knows what the new Altan can do with a table and a pen.'); chronicle('Four court cases won: the Altan court has learned to settle matters at a table.', '🃏'); }
  } else { d.cases[c.id] = {st:'tried', day:G.day}; gainXp(20000, G.party).forEach(m => msgs.push(m)); msgs.push('You may try again tomorrow.'); }
  return msgs;
}
function courtCancel(){ courtPending = null; return []; }

// ---------- panels ----------
function rCourt(){
  if(!courtOpen()) return '';
  const d = courtData();
  let out = `<div class="panel"><b>👑 The Royal Court of Altan</b><div class="sm">Court standing: <b>${courtRank()}</b> (${d.rep}). An audience is once a day for each; it raises your standing and teaches you something.</div></div>`;
  out += Object.keys(COURT_FIGURES).map(id => { const f = COURT_FIGURES[id], done = d.seen[id] === G.day;
    return `<div class="ev ${done?'locked':''}"><div><b>${f.icon} ${f.n}</b><div class="sm">${f.who}</div></div><button ${done?'disabled':''} onclick="act(courtAudience,'${id}')">${done?'Seen today':'Seek an audience'}</button></div>`; }).join('');
  out += rCases('aaliyah', 'Aaliyah\'s errands');
  return out;
}
function rSalon(){
  if(!salonOpen()) return '';
  const d = courtData();
  return `<div class="panel"><b>🃏 Mirelle\'s Salon</b><div class="sm">The Queen\'s table: cards, negotiation, bluffing and the settling of disputes. One case a day. ${d.wins} won${G.flags.court_games_skilled?' · the court knows what you can do':''}.</div></div>` + rCases('mirelle', 'Cases at the table');
}
function rCases(giver, title){
  const d = courtData(), list = COURT_CASES.filter(c => c.giver===giver);
  if(courtPending && caseById(courtPending) && caseById(courtPending).giver===giver){
    const c = caseById(courtPending);
    return `<div class="panel" style="border-color:var(--gold)"><b>${CASE_KINDS[c.kind]} · ${c.n}</b><div class="sm">${c.t}</div>${c.opts.map((o, i) => { const lead = G.party.includes(o[1]); return `<button class="pri" onclick="act(courtPick,${i})">${o[0]} <span class="sm">· led by ${CHARACTERS[o[1]] ? CHARACTERS[o[1]].n : o[1]} ${lead?'':'(not in the party)'}</span></button>`; }).join('')}<button onclick="act(courtPick,${c.opts.length})">Be straightforward</button> <button onclick="act(courtCancel)">Not now</button></div>`;
  }
  return `<h4>${title}</h4>` + list.map(c => { const st = caseState(c.id), done = st==='won', cd = d.playDay === G.day;
    return `<div class="ev ${done?'locked':''}"><div><b>${CASE_KINDS[c.kind]} · ${c.n}</b><div class="sm">${done?'Settled.':c.t}</div></div><button ${done||cd?'disabled':''} onclick="act(courtStart,'${c.id}')">${done?'Won':cd?'Tomorrow':st==='tried'?'Try again':'Take the case'}</button></div>`; }).join('');
}
(function(){
  const spots = [
    {id:'royal_court', kind:'court', n:'The Royal Court', icon:'👑', desc:'The senior minister, the Royal Uncle and Aunt, Aaliyah, King Rheon and Sera.', ch:730},
    {id:'mirelle_salon', kind:'salon', n:'Mirelle\'s Salon', icon:'🃏', desc:'The Queen\'s table: cards, negotiation, bluffing and disputes.', ch:733},
  ];
  spots.forEach(s => { if(LOCATIONS.altan_capital && !LOCATIONS.altan_capital.spots.some(x => x.id===s.id)) LOCATIONS.altan_capital.spots.push(s); });
})();

// ---------- Rheon, Silver Crown ----------
const CROWN_COOLDOWN = 2;
const crownOn = () => !!G && G.ch >= 708 && G.party.includes('rheon');
const crownReady = () => G.crownDay === undefined || G.day - G.crownDay >= CROWN_COOLDOWN;
function crownCall(u){
  const r = mkAlly('rheon', false); r.name = 'Rheon (Silver Crown)'; r.temp = true; r.crownTurns = 3; r.hp = r.mhp; r.mp = r.mmp;
  B.allies.push(r); B.queue.push(r); B.crownUsed = true; G.crownDay = G.day;
  blog('👑 '+u.name+' calls for the King. Rheon steps in, silver-white and crowned, for three turns.','good');
}
function crownButtons(u){
  if(!(typeof B!=='undefined' && B && !B.over && u && u.ally && !u.temp && crownOn())) return '';
  if(B.allies.some(a => a.id==='rheon') || B.crownUsed) return '';
  if(!crownReady()) return `<button disabled>👑 Rheon, Silver Crown (rests ${CROWN_COOLDOWN-(G.day-G.crownDay)} more day${CROWN_COOLDOWN-(G.day-G.crownDay)===1?'':'s'})</button>`;
  return `<button onclick="playerAct('crown')">👑 Call Rheon, Silver Crown</button>`;
}
(function(){
  const _pa = playerAct;
  playerAct = function(kind, sid, tuid){
    if(kind==='crown' && B && !B.over && B.cur && B.cur.ally && crownOn() && !B.crownUsed && crownReady()){ const u = B.cur; crownCall(u); endTurn(u); advance(); return; }
    return _pa(kind, sid, tuid);
  };
  const _eff = eff;
  eff = function(u, stat){
    const v = _eff(u, stat);
    return (u && u.temp && (stat==='atk' || stat==='mag' || stat==='def')) ? v*1.3 : v;
  };
  const _end = endTurn;
  endTurn = function(u){
    _end(u);
    if(u && u.temp && !u.dead && typeof B!=='undefined' && B && !B.over){
      u.crownTurns--;
      if(u.crownTurns <= 0){ u.dead = true; B.allies = B.allies.filter(a => a !== u); blog('👑 Rheon steps back from the line, golden-haired again. "Altan holds."','good'); }
    }
  };
  const _pb = persistBattle;
  persistBattle = function(){
    if(!B || !B.allies.some(a => a.temp)) return _pb();
    const all = B.allies; B.allies = all.filter(a => !a.temp); try { return _pb(); } finally { B.allies = all; }
  };
})();
