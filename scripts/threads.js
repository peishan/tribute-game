/* =====================================================================
   TRIBUTE — OPEN QUESTIONS (the story's threads, tracked as a checklist)
   An Archive tab from ch123 (with the other Archive tabs). Each entry is a question the story has actually raised; it appears only once its opening flag or chapter has been
   reached, so nothing is spoiled. Status is read from story flags only (never from grinding):
     ☐ Open            the story has asked it and not answered it
     ◐ Partly answered at least one thing has been learned
     ☑ Answered        the story has closed it
   `part` lists what has been learned so far (shown once its flag is set); `done` closes the question. `done: null` means the story has not answered it.
   Add a row to THREADS when a new question is raised; set `done` when a chapter answers it. State: none (pure read of G.flags and G.ch).
   ===================================================================== */
const threadsOpen = () => !!G && G.ch >= 123;   // with the rest of the Archive tabs
const THREADS = [
  {id:'oath', icon:'📜', q:'Who changed the Keeper\'s oath, and why?', cat:'The old world', opens:() => !!G.flags.oath_changed,
   part:[['oath_original','The original oath let the Keepers weigh, weaken or reopen a seal when the world was ready.']],
   done:['truth_before_curse','A Keeper changed it after being shown proof he could no longer trust: the unnamed adviser\'s warning that reunited regions would bring an ancient force back.']},
  {id:'adviser', icon:'🕴️', q:'Who is the unnamed adviser with the compass-star symbol?', cat:'The old world', opens:() => !!G.flags.adviser_known,
   part:[['wider_network_hinted','The alliance\'s surviving mechanisms reach beyond Tribute and Dragonvale.']], done:null},
  {id:'force', icon:'🌑', q:'What is the ancient force that retreated and waits?', cat:'The old world', opens:() => !!G.flags.truth_before_curse,
   part:[], done:null},
  {id:'sisters', icon:'🌙', q:'"The two sisters shall rise again": what became of Dima and Xima?', cat:'The old world', opens:() => G.ch >= 53,
   part:[['@103','Dima has regained her power.'],['remnant_broken','The False Ancestor, which wore Xima\'s face, was broken: it was not her.'],['dima_path_known','The split was ideological, not biological: Dima kept restraint and healing, Xima domination and control.']], done:null},
  {id:'worlds', icon:'🌐', q:'"Through love, the worlds may be united or destroyed": which worlds?', cat:'The old world', opens:() => G.ch >= 53,
   part:[['forgotten_world_seen','A forgotten world beyond the seals was seen.'],['barrier_people','People live behind the barrier.']], done:null},
  {id:'goldchild', icon:'✨', q:'What is the Gold Child meant to do?', cat:'The prophecy', opens:() => G.ch >= 53,
   part:[['valen_prophecy_link','The Valen crest is tied to the prophecy.'],['truth_before_curse','Dima: "The Gold bloodline was never meant to defeat darkness. It was meant to choose what comes after."'],['future_can_change','A prophecy shows what might be, not what must be.']], done:null},
  {id:'beside', icon:'🤝', q:'Who stands beside the Gold Child?', cat:'The prophecy', opens:() => !!G.flags.choice_prophecy,
   part:[['husband_wife_truth','Jade and Devon are husband and wife in truth.']], done:null},
  {id:'pages', icon:'🗂️', q:'Who removed the key pages from the late empress\'s and Dima\'s records?', cat:'The old world', opens:() => G.ch >= 54,
   part:[['register_rewritten','The Fifteen Register itself records rewritten history.']], done:null},
  {id:'entry4', icon:'📕', q:'What was Entry IV of the Register, and who removed it?', cat:'The Fifteen', opens:() => !!G.flags.fourth_entry_missing,
   part:[['nameless_witness_met','Someone who saw the Fifteen before they were named says it was removed, not destroyed.']], done:null},
  {id:'witness', icon:'🕴️', q:'Who is the Nameless Witness?', cat:'The Fifteen', opens:() => !!G.flags.nameless_witness_met, part:[], done:null},
  {id:'designated', icon:'🕯️', q:'Who designated the Fifteen, and why these fifteen?', cat:'The Fifteen', opens:() => !!G.flags.fifteen_designated,
   part:[['mandate_resolve','The mandate changed from Destroy to Resolve the Fifteen.']], done:null},
  {id:'impossible', icon:'🗂️', q:'How can one Register name appear in three kingdoms at once?', cat:'The Fifteen', opens:() => !!G.flags.impossible_entry,
   part:[['name_is_framework','The name is a pattern, not a single being.'],['register_beyond_fifteen','The Register records anomalies beyond the Fifteen.']], done:null},
  {id:'elise_fallout', icon:'🕯️', q:'What did Elise\'s death leave behind on the frontier?', cat:'Home', opens:() => !!G.flags.elise_valen_dies,
   part:[['inv_ftA1','The frontier mourns her genuinely: memorials appear at the gate.'],['inv_ftA2','Some of the soldiers and civilians who knew her question the official account.'],['inv_ftA3','A small conspiracy theory has grown, with a woman who looks like her seen on the road.'],['inv_ftA4','No public proof has emerged, and the king\'s office has quietly asked that no inquiry be opened.']],
   done:['frontier_trusted','The frontier trusts the party without knowing the truth: Elise stays officially dead, living privately with Tarin and their child, and her legacy lives in the people who remember her.']},
  {id:'jenika_news', icon:'🕊️', q:'What does Jenika need to tell Sky?', cat:'Home', opens:() => !!G.flags.jenika_message_received,
   part:[['jenika_notices_pregnancy','Jenika has quietly confirmed that she is pregnant.'],['delilah_knows_jenika_pregnant','Only Delilah knows; Jenika wants to get through the first trimester before she tells him.']], done:null},
  {id:'count', icon:'🔢', q:'How many of the Fifteen have been resolved?', cat:'The Fifteen', opens:() => !!G.flags.fifteen_named,
   part:[['@evil1','At least one of the Fifteen is resolved.']], done:['@evil15','All fifteen are resolved.'], live:() => evilsResolved()+' / 15'},
  {id:'network', icon:'🔮', q:'When will the restoration network be needed again?', cat:'The pearl', opens:() => !!G.flags.pearl_authority_restored,
   part:[['pearl_purpose','The Black Dragon Pearl is a restoration anchor.'],['sunken_kingdom_remembered','The Sunken Kingdom is restored to the records.']], done:null},
  {id:'sky', icon:'💙', q:'What is Sky, Bearer of the Returning Light, meant to carry forward?', cat:'The pearl', opens:() => !!G.flags.returning_light,
   part:[['sky_inheritance','Sky shares some of the Valor sensitivity through his mother\'s line.']], done:null},
];
function threadOk(k){ try{ return typeof k==='string' && k.startsWith('@') ? (k==='@103' ? G.ch >= 103 : k==='@evil1' ? evilsResolved() >= 1 : k==='@evil15' ? evilsResolved() >= 15 : false) : !!G.flags[k]; }catch(e){ return false; } }
function threadState(t){
  const learned = t.part.filter(p => threadOk(p[0])), closed = t.done && threadOk(t.done[0]);
  return {learned, closed, st: closed ? 2 : learned.length ? 1 : 0};
}
const threadsSeen = () => THREADS.filter(t => { try{ return t.opens(); }catch(e){ return false; } });
function rThreads(){
  const seen = threadsSeen(), done = seen.filter(t => threadState(t).closed).length;
  const cats = []; seen.forEach(t => { if(!cats.includes(t.cat)) cats.push(t.cat); });
  const mark = ['☐','◐','☑'], word = ['Open','Partly answered','Answered'];
  return `<div class="panel"><b>❓ OPEN QUESTIONS</b><div class="sm">What the story has asked so far, and what it has answered. <b>${done}</b> of <b>${seen.length}</b> answered. A question only appears once the story has raised it.</div></div>`
    + (cats.map(c => `<h4>${c}</h4>` + seen.filter(t => t.cat===c).map(t => { const s = threadState(t);
      return `<div class="li"><b>${mark[s.st]} ${t.icon} ${t.q}</b> <span class="sm">· ${word[s.st]}${t.live ? ' · '+t.live() : ''}</span>${s.learned.map(p => `<div class="sm">• ${p[1]}</div>`).join('')}${s.closed ? `<div class="sm"><b>Answer:</b> ${t.done[1]}</div>` : ''}</div>`; }).join('')).join('') || '<div class="sm">Nothing asked yet.</div>');
}
(function(){ const _rt = rArchiveTab; rArchiveTab = function(t){ return t==='threads' ? rThreads() : _rt(t); }; })();
deed('threads1', 'story', 'Questions worth asking', '❓', 'One of the story\'s open questions was answered.', () => threadsSeen().some(t => threadState(t).closed));
