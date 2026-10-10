/* =====================================================================
   TRIBUTE — JADE'S WAYS, JADE_DECISIONS AND THE MARROWAY FILES
   JADE'S WAYS: four leanings that her choices shape. Each is a scale from -10 to +10 with a name at both ends; neither end is "good" or "bad", and nothing is ever
   taken away for leaning one way. A leaning of 3 or more earns an epithet (6 or more, a stronger one) that other people use about her, and companions who share a leaning
   approve of a choice that matches it (a little extra bond; they never disapprove with a penalty). Ways only colour the story and how people speak of Jade.
     mercy    Severe (-) .. Merciful (+)         how she treats someone who has wronged others
     law      Conscience (-) .. Lawful (+)       whether she hands matters to the law or answers to her own judgment
     caution  Daring (-) .. Prudent (+)          proof and patience against acting at once
     folk     Court (-) .. Common folk (+)       whether she weighs the realm's order or ordinary people's lives first
   JADE_DECISIONS: short moral choices attached to quests (and one to the Marroway questline). A finished quest with a `decision` opens it under Missions -> Ways.
   THE MARROWAY FILES: from Sally's letter (a few months after her marriage) until the matter is settled, the capital's contract board posts repeatable cases from her
   evidence: rescue a woman Lucien Marroway took by force, or free a village he has squeezed. Each case adds to the evidence; after the divorce, Sally asks Jade
   to decide what becomes of him (hand him to the authorities, or end his life). More evidence makes the authorities' case firmer.
   State: G.ways, G.dec = {pending:[{id,ctx}], log:[{id,o,d}]}, G.mar = {cases,rescued,villages,evidence}.  Wording and numbers are first-pass.
   ===================================================================== */
const WAYS = {
  mercy:{n:'Mercy', lo:'Severe', hi:'Merciful', icon:'🕊️', ep:{hi:['the Merciful','a gentle hand'], lo:['the Unyielding','a hard judge']}},
  law:{n:'Order', lo:'Conscience', hi:'Lawful', icon:'⚖️', ep:{hi:['by the Book','the court\'s honest officer'], lo:['the Masked Judge','answerable to herself']}},
  caution:{n:'Judgment', lo:'Daring', hi:'Prudent', icon:'🧭', ep:{hi:['the Careful','proof before steel'], lo:['the Bold','first through the door']}},
  folk:{n:'Allegiance', lo:'Court', hi:'Common folk', icon:'🏘️', ep:{hi:['the People\'s Guard','a friend to the villages'], lo:['the Court\'s Hand','the realm\'s steady blade']}},
};
const WAY_KEYS = Object.keys(WAYS), WAY_MAX = 10;
const ways = () => { if(!G.ways) G.ways = {}; WAY_KEYS.forEach(k => { if(typeof G.ways[k] !== 'number') G.ways[k] = 0; }); return G.ways; };
const wayTier = k => { const v = Math.abs(ways()[k]); return v >= 6 ? 2 : v >= 3 ? 1 : 0; };
function wayAdd(delta){
  const w = ways(), out = [];
  Object.keys(delta||{}).forEach(k => { if(!WAYS[k]) return; const before = w[k]; w[k] = Math.max(-WAY_MAX, Math.min(WAY_MAX, w[k] + delta[k]));
    if(w[k] !== before && Math.floor(Math.abs(w[k])/3) > Math.floor(Math.abs(before)/3) && Math.sign(w[k]) === Math.sign(before || w[k])){ const ep = wayEpithet(k); if(ep) out.push(WAYS[k].icon+' People are beginning to call Jade “'+ep+'”.'); } });
  return out;
}
function wayEpithet(k){ const v = ways()[k], t = wayTier(k); if(!t) return ''; const e = WAYS[k].ep[v > 0 ? 'hi' : 'lo']; return e[t-1]; }
const wayLeanings = () => WAY_KEYS.filter(k => wayTier(k) > 0).sort((a, b) => Math.abs(ways()[b]) - Math.abs(ways()[a]));
const wayEpithets = () => wayLeanings().map(wayEpithet);
/* who approves of what: [axis, sign]. Approval is +1 bond; disagreement is a -1 that can never lower a bond level. */
const WAY_LIKES = {sky:[['mercy',1],['folk',1]], devon:[['law',1],['caution',1]], levi:[['caution',1],['folk',1]], seraphina:[['law',1],['mercy',-1]], rin:[['folk',1],['mercy',1]], eira:[['caution',1],['law',1]], sally:[['law',-1],['folk',1]], ripley:[['folk',1]]};
function wayApproval(delta){
  const out = [], nm = id => id==='sally' ? 'Sally' : CHARACTERS[id].n.split(' ')[0];
  const likes = id => WAY_LIKES[id].some(([k, s]) => (delta[k]||0) * s > 0), dislikes = id => WAY_LIKES[id].some(([k, s]) => (delta[k]||0) * s < 0) && !likes(id);
  const yes = G.active.find(id => WAY_LIKES[id] && likes(id)), no = G.active.find(id => WAY_LIKES[id] && dislikes(id));
  if(yes){ const m = addBond(yes, 1); out.push('💬 '+nm(yes)+' approves.'+(m ? ' '+m : '')); }
  if(no){ if(typeof isRecruited==='function' && isRecruited(no) && no!=='sally'){ const b = U(no); const floor = BOND_LEVELS[bondLevel(no)] || 0; if(b.bp - 1 >= floor) b.bp -= 1; }   // a bond never drops a level
    out.push('💬 '+nm(no)+' disagrees, and says so. (a little strain, never a lost bond level)'); }
  return out;
}

/* ---------------- decisions ---------------- */
const JADE_DECISIONS = {
 dec_smuggler:{icon:'📦', title:'The boy among the smugglers', text:'One of the smugglers is hardly sixteen. He carried crates because his family was hungry, and he has not stopped shaking since the fight.', opts:[
   {t:'Hand him to the harbour watch', r:'The watch takes him, a magistrate hears the case, and the boy gets a year of labour instead of the rope. The harbourmaster nods at you.', w:{law:1, caution:1}, rw:{rep:3}},
   {t:'Let him go with a warning and a few coins', r:'He runs, then comes back to thank you from a safe distance. Someone will find him honest work, you tell yourself.', w:{mercy:2, law:-1}},
   {t:'Bring him to the cook at the dock inn', r:'The innkeeper grumbles and gives him a bed above the kitchen. “If he steals, it comes out of your pocket.”', w:{folk:1, mercy:1}}]},
 dec_surrender:{icon:'🗡️', title:'The bandits lay down their blades', text:'The last of the road bandits drops his sword. “We were farmers before the tax collectors came,” he says. “Do what you must.”', opts:[
   {t:'Bind them and deliver them to the watch', r:'The watch posts a notice of the verdict. The road stays quiet, and the carriage drivers tip their hats to you.', w:{law:2}, rw:{rep:4}},
   {t:'Take back the loot and make them swear to leave', r:'They swear on their mothers\' graves. Whether they keep the oath is another matter, but it is a chance more than most are given.', w:{mercy:2, law:-1}, rw:{gold:40}},
   {t:'Make an example of them at the next crossroads', r:'Nobody robs that road for a season. Nobody speaks warmly of you there, either.', w:{mercy:-2, folk:-1}, rw:{rep:5}}]},
 dec_raider:{icon:'🏴‍☠️', title:'The raider captain\'s offer', text:'The captain of the river raiders, bleeding on the deck, offers a purse. “Look the other way and the ferries stay mine to rob only on the far bank.”', opts:[
   {t:'Refuse and turn him over to the harbour watch', r:'He is taken in chains, shouting about the river\'s true masters. The watch will hear him out.', w:{law:2}, rw:{rep:4}},
   {t:'Take the purse and give it to the ferrymen\'s families', r:'The ferrymen\'s widows cry over the coins. It is not clean money, but it is not wasted.', w:{folk:2, law:-1}, rw:{rep:3}},
   {t:'Tip the purse into the river and tell him why', r:'The purse sinks. The captain stares at the water, and for the first time seems unsure of himself.', w:{caution:-1, mercy:-1}}]},
 dec_wolf_den:{icon:'🐺', title:'The wolves\' den', text:'Behind the dead wolves is a den, and in the den are cubs that have only just opened their eyes.', opts:[
   {t:'Leave the cubs and let the pack recover', r:'The village will be uneasy, but the wolves will go quiet for a year or two. The forest keeps its balance.', w:{mercy:2, folk:-1}},
   {t:'Clear the den so the village is safe', r:'The shepherds sleep easier. The forest is a little emptier.', w:{folk:2, mercy:-1}, rw:{rep:3}},
   {t:'Take the cubs to a ranger who raises them far from the farms', r:'It costs a day\'s travel and a few coins. The ranger is delighted, the shepherds are not told.', w:{caution:1, mercy:1}}]},
 dec_assassin:{icon:'🥷', title:'The assassin who talks', text:'The last masked hireling is willing to name his client, if you promise him something in return.', opts:[
   {t:'Deliver him and the name to the watch', r:'The watch writes everything down, and the client\'s name becomes a case instead of a rumour.', w:{law:2, caution:1}, rw:{rep:4}},
   {t:'Let him disappear in exchange for the name', r:'He vanishes before you can regret it. You now hold a name and nothing to prove it.', w:{law:-2, mercy:1}},
   {t:'Press him until he gives you everything', r:'He gives you everything, and a good deal that is not true. Sky does not meet your eyes for a while.', w:{mercy:-2, caution:-1}}]},
 dec_magistrate:{icon:'🏛️', title:'The Magistrate\'s ledger', text:'The guards are beaten, and the village headman gives you what he has risked his life to keep: a ledger of the Magistrate\'s extra taxes, in the Magistrate\'s own hand.', opts:[
   {t:'Send it to the king\'s court and wait for judgment', r:'Weeks later an inspector arrives. The Magistrate is relieved of his post, and the extra taxes are returned.', w:{law:2, caution:2}, rw:{rep:5}},
   {t:'Read it aloud in the village square at night, masked', r:'By morning everyone knows. The Magistrate leaves before noon, and the crowd decides what he leaves behind.', w:{law:-2, folk:2, caution:-1}},
   {t:'Make him repay the village in silence and keep the ledger', r:'He repays every coin, afraid of the masks. The ledger stays in your pack, a leash for later.', w:{mercy:1, folk:1, caution:1}, rw:{gold:60}}]},
 dec_children:{icon:'🧒', title:'The buyer\'s name', text:'The children are home. In the smugglers\' cart is a sealed list: the names of the nobles who paid, and a mark for each purchase.', opts:[
   {t:'Give the list to Adrian for the royal inquiry', r:'Adrian reads it twice and says nothing for a long time. Then: “Leave this with me. It will not be quick, but it will not be buried.”', w:{law:2, caution:2}, rw:{rep:6}},
   {t:'Visit the nearest name on the list, masked, that same night', r:'He does not sleep again, and neither do the others when the rumour reaches them. The inquiry will find fewer papers in the morning.', w:{law:-2, mercy:-2, caution:-1}},
   {t:'Burn the list and take the children home first', r:'The children are home before dawn, wrapped in your cloak. The list is ash, and some night you may regret it.', w:{mercy:2, folk:2, law:-1}}]},
 dec_remedy:{icon:'🌿', title:'The fever remedy', text:'Jenika\'s remedy works, and the village is on its feet. A court physician hears of it and offers to buy the recipe for the palace.', opts:[
   {t:'Give the recipe to every village for free', r:'Within a month three other hill villages are saved from the same fever. The court physician is annoyed.', w:{folk:2, mercy:1}, rw:{rep:4}},
   {t:'Sell it to the court and fund the pavilion', r:'The palace pharmacies stock the remedy. The coin buys beds and herbs at the Healing Pavilion for a year.', w:{folk:-1, caution:1}, rw:{gold:80}},
   {t:'Give it to Jenika to distribute properly', r:'Jenika writes it into the pavilion\'s records and sends it out with trained hands. It takes longer. It is done right.', w:{law:1, caution:1}}]},
 dec_old_warrior:{icon:'🪖', title:'The old post\'s ghosts', text:'The haunting is quiet now, but the spirits are not gone. They are old soldiers who never received their relief. The retired warrior looks at your sword a second too long.', opts:[
   {t:'Lay them to rest by force of will', r:'The post goes silent. The warrior salutes, and does not ask what the silence cost.', w:{mercy:-1, caution:-1}},
   {t:'Sit with them and take down their names', r:'You write forty-one names. The warrior weeps, and the post is quiet for the right reason.', w:{mercy:2}, rw:{rep:3}},
   {t:'Ask the warrior how he knows your sword', r:'“You fight like the late empress\'s guard,” he says. You file the thought away for later.', w:{caution:2}}]},
 dec_imp_nest:{icon:'👺', title:'The border imps', text:'The imps are gone, but their burrow runs under a village granary, and the villagers do not know.', opts:[
   {t:'Tell the border watch and have the burrow sealed', r:'The watch seals it with stone and writes up a report. The villagers are told only that the ground was unsafe.', w:{law:1, caution:1}},
   {t:'Tell the village headman what lived below him', r:'The headman is frightened, and then furious on everyone\'s behalf. The village seals it themselves.', w:{folk:2, caution:-1}},
   {t:'Say nothing and seal it yourselves before dawn', r:'It takes the whole night, and the village wakes to an ordinary morning.', w:{law:-1, caution:1, folk:1}}]},
 dec_drake_eggs:{icon:'🦎', title:'The drake clutch', text:'Behind the dead mother drake is a clutch of eggs on warm stone. The herders ask you to smash them.', opts:[
   {t:'Smash them: the herds come first', r:'The herders are silent, then grateful. You do not look back at the stone.', w:{folk:2, mercy:-2}, rw:{rep:3}},
   {t:'Carry the eggs to the high ridges, away from the herds', r:'It takes three days. The herders grumble. The ridge will have drakes again.', w:{mercy:2, caution:1}},
   {t:'Leave them to the Dragonvale rangers to decide', r:'The rangers thank you, and the herders curse the delay. The eggs hatch on the ranger\'s terms.', w:{law:2}}]},
 dec_captive:{icon:'🎭', title:'{name} is free', text:'{name} walked out of the locked wing on her own feet, shaking but upright. She will not say his name. She asks where she may go that is not here.', rep:true, opts:[
   {t:'To her family\'s house, escorted', r:'{name}\'s mother opens the door. Neither of them says anything for a long time. Sally\'s note is already waiting in {name}\'s pocket: a place to ask for help, and no one will ask her to testify.', w:{mercy:2, folk:1}, rw:{rep:4}, mar:'rescued'},
   {t:'To the Royal Healing Pavilion, under Jenika\'s care', r:'Jenika asks no questions and sets a bed by the window. {name} sleeps through the first night and the following morning.', w:{mercy:1, law:1}, rw:{rep:4}, mar:'rescued'},
   {t:'To Sally\'s agents, who will take her abroad under a new name', r:'Three days later {name} is on a ship with a new name and a small purse. Sally will not tell you where it docks.', w:{law:-2, caution:1}, rw:{rep:3}, mar:'rescued'}]},
 dec_shakedown:{icon:'🎭', title:'The money taken from {name}', text:'The men who collected Lucien Marroway\'s “fees” in {name} are scattered. In their cart is the village\'s money in a locked box, and a ledger of who paid and who was punished.', rep:true, opts:[
   {t:'Return every coin to the families it came from', r:'The headman counts it twice, then a third time, and weeps. The ledger goes to Sally with the rest.', w:{folk:2, mercy:1}, rw:{rep:5}, mar:'village'},
   {t:'Return the money and leave the Phoenix and the Dragon\'s mark on the door', r:'By morning the whole district knows someone is watching Marroway\'s men. They are less brave by evening.', w:{law:-2, caution:-1, folk:1}, rw:{rep:5}, mar:'village'},
   {t:'Take the ledger and the box to the court clerk, under seal', r:'It is slow, and it is lawful. The clerk gives you a receipt, and the families get their money back after the next assize.', w:{law:2, caution:2}, rw:{rep:5}, mar:'village'}]},
 dec_marroway:{icon:'🕯️', title:'What becomes of Lucien Marroway', text:'Sally has put everything on the table: the divorce is signed, the evidence is arranged, and Lucien Marroway is alone in his lodge with his lawyers and no illusions. “I will not ask you to be me,” she says. “I only ask you to be sure.”', opts:[
   {t:'Take the evidence to the authorities', r:'law', w:{law:3, mercy:1, caution:2}, flag:'marroway_law', mar:'law'},
   {t:'End it quietly: the Silent Dragon finishes what the law cannot reach', r:'blood', w:{law:-3, mercy:-3, caution:-1}, flag:'marroway_blood', mar:'blood'}]},
};
const jdData = () => { if(!G.dec) G.dec = {pending:[], log:[]}; return G.dec; };
const jdPending = () => jdData().pending;
function openJadeDecision(id, ctx){
  const d = JADE_DECISIONS[id]; if(!d) return false; const D = jdData();
  if(!d.rep && (D.pending.some(p => p.id===id) || D.log.some(l => l.id===id))) return false;
  if(D.pending.length >= 6) return false;
  D.pending.push({id, ctx:ctx||{}}); save(); return true;
}
const fillD = (t, ctx) => String(t).replace(/\{name\}/g, (ctx && ctx.name) || 'her');
function marResult(kind){
  const strong = marEv() >= 6, mid = marEv() >= 3;
  if(kind==='law') return strong
    ? 'Sally\'s files, the villagers\' testimony and the women\'s signed statements make a case nobody can wave away. Lucien Marroway is stripped of his name and estates, tried in open court and sentenced to hard labour for the rest of his life. His lodges are sold and the money goes to the people he hurt. He does not look at Sally once.'
    : mid ? 'Sally\'s files and a few testimonies are enough for an arrest, a public trial and a long sentence, though his family\'s lawyers fight every line. Some of his lodges are sold; some are quietly kept by cousins. It is justice, though not the whole of it.'
    : 'The authorities take what you bring and arrest him, but the evidence is thin and his family is old. He is stripped of his office, fined heavily and confined to his estate. It is something, and it is not nearly enough. Sally says only: “It is a beginning.”';
  return 'Lucien Marroway is found at his lodge one morning, and the house is silent. The servants say nothing. The coroner writes “a fall”, and the family does not argue. The Phoenix and the Dragon were never there. Sally reads the notice, folds it, and does not say a word about it.';
}
function resolveJadeDecision(i, o){
  const D = jdData(), p = D.pending[i]; if(!p) return [];
  const d = JADE_DECISIONS[p.id], op = d && d.opts[o]; if(!op) return [];
  D.pending.splice(i, 1);
  D.log.push({id:p.id, o, d:G.day, n:fillD(d.title, p.ctx)}); if(D.log.length > 60) D.log.shift();
  const msgs = [];
  let r = op.r==='law' || op.r==='blood' ? marResult(op.r) : fillD(op.r, p.ctx);
  msgs.push('📜 '+r);
  if(op.mar) marDone(op.mar, msgs);
  if(op.flag){ G.flags[op.flag] = true; if(p.id==='dec_marroway'){ G.flags.marroway_closed = true; chronicle(op.mar==='law' ? 'Lucien Marroway was handed to the authorities.' : 'Lucien Marroway\'s story ended quietly.', '🕯️'); } }
  if(op.rw){ const rw = Object.assign({}, op.rw); grantReward(rw, '').forEach(m => msgs.push(m.replace(/^ · /,''))); }
  wayAdd(op.w).forEach(m => msgs.push(m));
  if(typeof reputeFromWays==='function') reputeFromWays(op.w).forEach(m => msgs.push(m));
  if(op.flag==='marroway_law' && typeof repAdd==='function'){ repAdd('law', 10); repAdd('court', 3); repAdd('folk', 6); }
  if(op.flag==='marroway_blood' && typeof repAdd==='function'){ repAdd('shadow', 10); repAdd('mask', 6); repAdd('susp', 10); }
  wayApproval(op.w).forEach(m => msgs.push(m));
  chronicle(fillD(d.title, p.ctx)+': '+fillD(op.t, p.ctx)+'.', d.icon);
  save(); return msgs;
}
/* ---------------- the Marroway files ---------------- */
/* evidence = what the cases add plus what the comic chapters showed: the levies (1), the survivor's testimony (2), the ledger (3) */
const marEv = () => mar().evidence + (G.flags.marroway_levies ? 1 : 0) + (G.flags.marroway_testimony ? 2 : 0) + (G.flags.marroway_ledger ? 3 : 0);
const mar = () => { if(!G.mar) G.mar = {cases:0, rescued:0, villages:0, evidence:0}; return G.mar; };
function marDone(kind, msgs){
  const M = mar();
  if(kind==='rescued'){ M.rescued++; M.evidence += 2; msgs.push('🗂️ Sally adds her testimony to the files. Evidence: '+marEv()+'.'); }
  else if(kind==='village'){ M.villages++; M.evidence += 1; msgs.push('🗂️ The ledger goes to Sally. Evidence: '+marEv()+'.'); }
}
const marOpen = () => !!(G.flags && G.flags.marroway_files && !G.flags.marroway_closed);
const MAR_NAMES = ['Elin','Maren','Tessa','Odile','Brisa','Wyn','Aveline','Corra','Isolde','Neve'];
const MAR_VILLAGES = ['Redwater','Hollow Mill','Stonecress','Lantern Ford','Ashby Fen','Marrow Hill','Quill Bridge','Thistledown'];
function genMarroway(){
  const M = mar(), rescue = Math.random() < .5, id = 'q_mar_'+Math.random().toString(36).slice(2,7), tag = ' (Masked contract · the Crimson Phoenix and the Silent Dragon)';
  if(rescue){ const name = MAR_NAMES[Math.floor(Math.random()*MAR_NAMES.length)];
    return {id, type:'kill', key:'marroway_guard', need:3, c:0, icon:'🎭', name:'The Marroway Files: Free '+name, masked:true, decision:'dec_captive', ctxName:name, mar:'case',
      desc:'Sally\'s evidence places '+name+' in a locked wing of one of Lucien Marroway\'s lodges. She refused him, so he took her. Strike the guards, not the household, and bring her out.'+tag, rw:{xp:520+marEv()*10, gold:140, rep:10}}; }
  const name = MAR_VILLAGES[Math.floor(Math.random()*MAR_VILLAGES.length)];
  return {id, type:'kill', key:'marroway_enforcer', need:3, c:0, icon:'🎭', name:'The Marroway Files: '+name, masked:true, decision:'dec_shakedown', ctxName:name, mar:'case',
    desc:name+' pays Lucien Marroway\'s “fees” or loses its roofs and its mill. Sally has the ledger\'s trail. Break the collectors and bring the money back.'+tag, rw:{xp:480+marEv()*10, gold:120, rep:9}};
}
/* called by finishQuest in world.js */
function questDecision(q, msgs){
  if(q.mar==='case') mar().cases++;
  if(q.decision && openJadeDecision(q.decision, {name:q.ctxName})) msgs.push('⚖️ A decision waits: Missions, then Ways.');
}
/* ---------------- screens ---------------- */
function rWayBar(k){
  const W = WAYS[k], v = ways()[k], ep = wayEpithet(k);
  return `<div class="li"><b>${W.icon} ${W.n}</b> <span class="sm">· ${v===0?'Balanced':v>0?W.hi+' '+v:W.lo+' '+(-v)}${ep?' · “'+ep+'”':''}</span>
    <div style="position:relative;height:8px;margin:8px 4px 4px;background:rgba(128,128,128,.35);border-radius:4px"><div style="position:absolute;left:50%;top:-2px;width:2px;height:12px;background:rgba(128,128,128,.7)"></div><div style="position:absolute;left:${(v+WAY_MAX)/(2*WAY_MAX)*100}%;top:-3px;width:10px;height:14px;margin-left:-5px;background:var(--gold,#d9a441);border-radius:3px"></div></div>
    <div class="sm" style="display:flex;justify-content:space-between"><span>${W.lo}</span><span>${W.hi}</span></div></div>`;
}
function rJadeDecisions(){
  const P = jdPending(); if(!P.length) return '';
  return P.map((p, i) => { const d = JADE_DECISIONS[p.id]; if(!d) return '';
    return `<div class="panel"><b>⚖️ ${d.icon} ${fillD(d.title, p.ctx)}</b><div class="sm">${fillD(d.text, p.ctx)}</div><div style="display:flex;flex-direction:column;gap:6px;margin-top:6px">${d.opts.map((o, j) => `<button onclick="act(resolveJadeDecision,${i},${j})">${fillD(o.t, p.ctx)}</button>`).join('')}</div></div>`; }).join('');
}
function rWays(){
  const M = mar(), L = jdData().log.slice(-8).reverse(), eps = wayEpithets();
  return `<div class="panel"><b>JADE'S WAYS</b><div class="sm">Four leanings that her choices shape. Neither end is right or wrong, and a companion who shares a leaning approves when a choice matches it, and one who holds the opposite view disagrees (a -1 that can never lower a bond level).${eps.length?' People now call her '+eps.slice(0,2).map(e => '“'+e+'”').join(' and ')+'.':' She has not yet leaned strongly either way.'}</div>${WAY_KEYS.map(rWayBar).join('')}</div>`
   + (typeof rReputation==='function' ? rReputation() : '') + (typeof rRocFamily==='function' ? rRocFamily() : '') + (G.flags.marroway_files ? `<div class="panel"><b>🎭 THE MARROWAY FILES</b><div class="sm">${marOpen() ? 'Open cases are posted on the capital\'s contract board, and you can hunt Marroway\'s retainers at the lodges.' : 'Closed.'} Cases completed ${M.cases} · women freed ${M.rescued} · villages freed ${M.villages} · evidence ${marEv()}.</div></div>` : '')
   + (L.length ? `<h4>Recent decisions</h4>${L.map(l => { const d = JADE_DECISIONS[l.id]; return `<div class="li"><span class="sm">${d?d.icon:'📜'} Day ${l.d} · ${l.n}: ${d && d.opts[l.o] ? fillD(d.opts[l.o].t, {}).replace(/ \{name\}/g,'') : ''}</span></div>`; }).join('')}` : '<div class="sm">No decisions yet. Some contracts end with a choice.</div>');
}
deed('ways_lean', 'world', 'Known for something', '🕊️', 'One of Jade\'s ways became strong enough for people to name her by it.', () => wayLeanings().length >= 1);
deed('ways_decide5', 'world', 'Five choices', '⚖️', 'Five decisions made.', () => jdData().log.length >= 5);
deed('mar_case', 'hunt', 'The first file', '🎭', 'A case from the Marroway files was closed.', () => mar().cases >= 1);
deed('mar_five', 'hunt', 'Sally\'s evidence', '🗂️', 'Five Marroway cases were closed.', () => mar().cases >= 5);
deed('mar_law', 'hunt', 'In open court', '⚖️', 'Lucien Marroway was handed to the authorities.', () => !!G.flags.marroway_law);
deed('mar_blood', 'hunt', 'A quiet end', '🕯️', 'Lucien Marroway\'s story ended without a trial.', () => !!G.flags.marroway_blood);
