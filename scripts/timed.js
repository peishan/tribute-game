/* =====================================================================
   TRIBUTE — TIME-SENSITIVE EVENTS
   Things that happen because in-game time passes, not because a comic chapter is read: letters, gossip, changes of status, and short scenes that stay open for a
   limited number of days and then pass. Each event is a row in TIMED and fires when BOTH its chapter and its time are reached:
     ch      the earliest story chapter completed
     after   'anchor' (the day the party returned to Tribute after Arc II, ch89) or the id of another event; gap = days after it
     kind    'letter' (a letter, delivered when the party is in a settlement) | 'notice' (a Chronicle and Journal line) | 'scene' (an optional scene open for `window` days)
   A scene that is not attended before its window ends is marked missed: it passes quietly and the friendship simply goes on slowly (nothing is ever lost).
   State: G.timed = {id: {day, state:'due'|'open'|'done'|'missed', until}}, G.returnDay (day ch89 was completed).  Wording and numbers are first-pass.
   byCh: the comic chapter that shows this event. From that chapter on the event fires whatever the day counter says (an earlier one in the chain fires first), so the comic and the game never contradict each other; the clock only fills in the time between chapters. Comic dates (Year 712...) are in-world dates in records, not the day counter.
   The first route is Sally's (Arc VII onward, no comic chapter of its own): Lucien Marroway, the marriage, the divorce, and a quiet drink with Levi.
   ===================================================================== */
const TIMED_ANCHOR_YEAR = 360;   // Arc VII starts roughly a year (game time) after the return to Tribute
const TIMED = [
  {id:'sally_match', ch:167, byCh:191, after:'anchor', gap:TIMED_ANCHOR_YEAR, kind:'letter', icon:'💌', from:'Sally', subj:'A respectable match',
   body:"Jade,\n\nMother and Father have found me a gentleman, which is their way of saying they are tired of watching me read the rumour rolls. His name is Lucien Marroway: old family, excellent manners, and he did not flinch when I told him I had once travelled with an exiled prince. He seems to understand that I have lived a less tidy life than most ladies.\n\nI have agreed to be courted. Do not laugh.\n\nSally",
   log:'Sally has agreed to be courted by Lucien Marroway, a match her adoptive parents arranged.'},
  {id:'sally_wed', ch:191, byCh:191, after:'sally_match', gap:40, kind:'notice', needs:() => !!(G.timed && G.timed.sally_match && G.timed.sally_match.state==='done'), icon:'💍', t:'Word from court: Lady Sally is now Lady Marroway. Her parents wept at the wedding, and the groom smiled for everyone.',
   log:'Sally married Lucien Marroway.'},
  {id:'sally_cracks', ch:172, byCh:192, after:'sally_wed', gap:60, kind:'letter', icon:'💌', from:'Sally', subj:'Nothing to report',
   body:"Jade,\n\nNothing to report. The house is large, the servants are efficient and Lucien is a very private man. Rather more private than I understood before. I am sure it is nothing.\n\nDo not send anyone to ask after me. I mean it.\n\nSally",
   log:'Sally\'s letters have become less cheerful. Jade read the last one twice.'},
  {id:'sally_evidence', ch:172, byCh:197, after:'sally_cracks', gap:20, kind:'letter', icon:'💌', from:'Sally', subj:'Not for the household to read', flag:'marroway_files',
   body:"Jade,\n\nI told you not to send anyone, and I meant it. I did not tell you that I would start keeping a ledger of my own.\n\nLucien is not private. Lucien is hiding things. There are women in the lodges who were never guests, and villages that pay him money they do not owe, and he has a way of smiling when they refuse. I have copied what I could. I have names.\n\nI cannot go to his friends, and the magistrate dines at his table. But the Crimson Phoenix and the Silent Dragon do not dine anywhere. If you are willing, the Masked contracts board in Dragonvale will carry what I send: women to bring out, villages to free. I will add each thing you bring me to the file.\n\nDo not do anything foolish. Do all of it carefully.\n\nSally",
   log:'Sally has sent Jade her evidence against Lucien Marroway and asked for masked help: women held against their will, and villages he has squeezed. New cases will be posted on the Dragonvale Masked board.'},
  {id:'sally_divorce', ch:174, after:'sally_wed', gap:180, kind:'letter', icon:'💌', from:'Sally', subj:'It is done',
   body:"Jade,\n\nIt is done. Six months of being told how lucky I was. I have my name back, and my own rooms, and a great deal of embarrassment that I intend to carry quietly.\n\nI keep thinking one thing. Roc never pretended to be harmless.\n\nDo not send a carriage.\n\nSally",
   log:'Sally has separated from Lucien Marroway, and the marriage is formally ended.'},
  {id:'sally_reckoning', ch:174, after:'sally_divorce', gap:10, kind:'letter', icon:'💌', from:'Sally', subj:'One more thing, and then never again', decision:'dec_marroway',
   body:"Jade,\n\nThe papers are signed and the files are in order. Whatever else I am, I am no longer his wife, which means I can finally ask the question I could not ask while I wore his name.\n\nWhat happens to him?\n\nThere is the law, with its slow wheels and its dinners. There is the other way, which you know better than I. I am not asking you to be me, only to be sure. Come when you have decided. I will not hold it against you either way.\n\nSally",
   log:'Sally has asked Jade to decide what becomes of Lucien Marroway.'},
  {id:'sally_after', ch:174, after:'sally_reckoning', gap:4, kind:'letter', icon:'💌', from:'Sally', subj:'Thank you', needs:() => !!(G.flags.marroway_law || G.flags.marroway_blood),
   body:() => G.flags.marroway_law ? "Jade,\n\nI watched him in court, and he never once looked at me, which suited us both. It was slow and it was dull, and it was lawful, and I think that is exactly what I wanted after so much that was none of those. Thank you for carrying it that far.\n\nSally" : "Jade,\n\nI read the notice twice and folded it small. I will not ask what happened, and I would ask you not to tell me. I only wanted you to know that I sleep now.\n\nSally",
   log:'Sally wrote to thank Jade for settling the Marroway matter.'},
  {id:'sally_never', ch:175, after:'sally_divorce', gap:8, kind:'letter', icon:'💌', from:'Sally', subj:'Before you ask',
   body:"Jade,\n\nBefore you ask: no.\n\nI married once because everyone told me I had finally found a sensible man. I have no intention of testing their judgment twice.\n\nIf Greyson's matchmakers come asking, I am abroad.\n\nSally",
   log:'Sally is adamant: she will not marry again.'},
  {id:'sally_drink', ch:176, after:'sally_never', gap:14, kind:'scene', icon:'🍷', window:20, locs:['dragon_vale','capital'], needs:() => isRecruited('levi'),
   t:'Sally has asked Levi to sit and drink with her. It is the kind of moment that does not wait.',
   scene:[['sally','Sit with me, Levi. One drink. I promise to be dreadful company.'],['levi','I have been told I am better at silences than conversation.'],['sally','Then we are well matched. I am better at gossip, and I have nothing left to gossip about.'],['levi','You complained about marriage for an hour.'],['sally','Forty minutes. And I was right.'],['levi','I know what it is to keep your heart fixed on someone you cannot reach yet. It does not make you any better at moving on.'],['sally','We are both dreadful at it.'],['levi','Terribly.']],
   after_t:'The candle burned lower than either of them noticed. Nothing happened, which was rather the point. They simply sat together longer than either had expected, and afterwards neither of them said a word about it.',
   missed_t:'Sally and Levi did not find the time. The moment passed, and they went on as companions.', log:'Sally and Levi sat and talked over a drink, longer than either expected.', track:60},
];
function timed(){ if(!G.timed) G.timed = {}; return G.timed; }
function timedAnchor(){
  if(G.returnDay !== undefined) return G.returnDay;
  const e = (G.chron||[]).find(x => x.c===89); if(e) return e.d;
  return G.ch >= 89 ? G.day - TIMED_ANCHOR_YEAR : undefined;   // an older save: the year is taken as already passed
}
function timedChapterDay(n){   // the day chapter n was completed (an older save: the day it is noticed)
  if(G.chDay && G.chDay[n] !== undefined) return G.chDay[n];
  return G.ch >= n ? G.day : undefined;
}
function timedDeliver(ev, st){   // a letter or notice reaches the party
  if(ev.kind==='letter'){
    G.letters.unshift({id:'F_'+ev.id, fam:true, from:ev.from, subj:ev.subj, body:typeof ev.body==='function' ? ev.body() : ev.body, day:G.day, read:false});
    toast('✉️ A letter from '+ev.from+': "'+ev.subj+'"');
  } else toast(ev.icon+' '+ev.t);
  if(ev.log) chronicle(ev.log, '💬');
  if(ev.flag) G.flags[ev.flag] = true;
  if(ev.decision && typeof openJadeDecision==='function') openJadeDecision(ev.decision);
  st.state = 'done';
}
function timedTick(){
  if(!G || !G.flags || typeof G.day !== 'number') return [];
  const msgs = [], T = timed();
  TIMED.forEach(ev => {
    let st = T[ev.id];
    if(!st){
      if(G.ch < ev.ch) return;
      const base = ev.after==='anchor' ? timedAnchor() : /^ch\d+$/.test(ev.after) ? timedChapterDay(+ev.after.slice(2)) : (T[ev.after] && T[ev.after].day), forced = !!ev.byCh && G.ch >= ev.byCh;   // a comic chapter that shows the event overrides the day counter
      if(!forced && (base === undefined || G.day < base + ev.gap)) return;
      if(forced && ev.after!=='anchor' && base === undefined) return;
      if(ev.needs && !ev.needs()) return;
      st = T[ev.id] = {day:G.day, state:'due'};
      if(ev.kind==='scene'){ st.state = 'open'; st.until = G.day + ev.window; toast(ev.icon+' '+ev.t+' (until day '+st.until+')'); chronicle(ev.t, ev.icon); msgs.push(ev.icon+' '+ev.t); }
    }
    if(st.state==='due' && (ev.kind==='notice' || isSettlement(G.loc))){ timedDeliver(ev, st); msgs.push(ev.icon+' '+(ev.subj||ev.t)); }
    if(st.state==='open' && G.day > st.until){ st.state = 'missed'; chronicle(ev.missed_t, ev.icon); msgs.push(ev.missed_t); }
  });
  if(msgs.length) save();
  return msgs;
}
const timedOpen = () => TIMED.filter(ev => ev.kind==='scene' && timed()[ev.id] && timed()[ev.id].state==='open');
function timedCanEnter(ev){ return !!G.flags && (!ev.locs || ev.locs.includes(G.loc)) && (!ev.needs || ev.needs()); }
function timedEnter(id){
  const ev = TIMED.find(e => e.id===id), st = timed()[id]; if(!ev || !st || st.state!=='open' || !timedCanEnter(ev)) return [];
  st.state = 'done'; st.doneDay = G.day; if(ev.setFlag) G.flags[ev.setFlag] = true;
  const lines = ev.scene.map(([w, t]) => '💬 '+(w==='sally'?'Sally':CHARACTERS[w].n.split(' ')[0])+': "'+t+'"');
  chronicle(ev.log, ev.icon); if(ev.track && typeof trackState==='function') trackState('levi_sally').pts += ev.track;
  return lines.concat(['🕯️ '+ev.after_t]).concat(advanceDay(1));
}
function rTimedEvents(){
  const T = timed(), open = timedOpen(), done = TIMED.filter(e => T[e.id] && (T[e.id].state==='done' || T[e.id].state==='missed'));
  if(!open.length && !done.length) return '';
  return `<h4>📅 Time-sensitive events</h4><div class="sm">Some things happen with the days, not with the chapters. A moment that is not taken before its days run out simply passes.</div>`
    + open.map(ev => `<div class="panel"><b>${ev.icon} ${ev.t}</b><div class="sm">Open until day ${T[ev.id].until} (today is day ${G.day}). ${ev.locs ? 'Available at '+ev.locs.map(l => LOCATIONS[l].n).join(' or ')+'.' : ''}</div><button class="pri" ${timedCanEnter(ev)?'':'disabled'} onclick="act(timedEnter,'${ev.id}')">${timedCanEnter(ev)?'Join them':'Not here'}</button></div>`).join('')
    + done.slice().reverse().map(ev => `<div class="li"><span class="sm">${ev.icon} ${T[ev.id].state==='missed'?'The moment passed: ':''}${ev.log || ev.t}</span></div>`).join('');
}
BOND_TRACKS.levi_sally = {label:'Levi & Sally', icon:'🍷', members:['levi','sally'], bonus:null, amounts:[0,0,0,0,0],
  names:['Fellow Travellers','Easy Silences','Honest Talk','A Shared Quiet','Unexpected Shelter'],
  open:() => !!(G.timed && G.timed.sally_drink && G.timed.sally_drink.state==='done'), why:'story-driven: how easy they have become with each other, nothing more', acts:[]};
deed('timed1', 'bonds', 'The days go by', '📅', 'A time-sensitive event reached you.', () => TIMED.some(e => G.timed && G.timed[e.id]));
deed('sally_drink', 'bonds', 'One drink', '🍷', 'You joined Sally and Levi for a quiet drink.', () => !!(G.timed && G.timed.sally_drink && G.timed.sally_drink.state==='done'));
