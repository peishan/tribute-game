/* =====================================================================
   TRIBUTE — THE IMPERIAL NETWORK (Adrian Gold, support NPC; not playable)
   Unlocks at chapter 90 (the Gold reunion). Adrian is Tribute's connection: reports, requests, an intelligence
   archive, letters and a kingdom status board. What the player learns: he exists, he is Jade's older brother, he is an
   Imperial Advisor. NOT revealed here: his personal story, past assignments, his true influence, or his link to
   Greyson's family (reserved: a contact slot is added later by the flag `contact_evelyne`, see CONTACTS).
   Hidden stat: Adrian's trust (G.net.trust) rises with finished requests and read letters; thresholds unlock
   childhood memories and Gold family lore. State: G.net = {trust, read:{}, letters:[], reqDay, reqs:[], seen:{}}
   ===================================================================== */
const NET_CH = 90;
const TRUST_LV = [0, 15, 40, 80, 130];
const netOpen = () => !!G && G.ch >= NET_CH;
function net(){ if(!G.net) G.net = {trust:0, letters:[], reqDay:0, reqs:[], read:{}, nextLetter:0}; return G.net; }
const trustLv = () => { let l = 0; TRUST_LV.forEach((t,i) => { if(net().trust >= t) l = i; }); return l; };
function addTrust(n){ net().trust += n; }

/* ---- Reports (world-building; chapter gated) ---- */
const REPORTS = [
  {ch:90, loc:'Northern Border', threat:'Unknown creatures appearing near abandoned ruins.', status:'Investigation recommended.'},
  {ch:90, loc:'Faepool Harbour', threat:'Trade is steady; two ships overdue from the western routes.', status:'Monitoring.'},
  {ch:92, loc:'Gold Residence Quarter', threat:'Old family papers of the Valor line have been requested by an unnamed buyer.', status:'Buyer unknown.'},
  {ch:94, loc:'Imperial Capital', threat:'Healer guilds report a rise in forgotten-memory cases among travellers.', status:'Watching.'},
  {ch:95, loc:'Dragonvale', threat:'Crown Prince Aster has settled the court. The borders are calm for now.', status:'Stable.'},
  {ch:98, loc:'Royal Archives', threat:'Sections of the healer registries and border logs were removed by hand.', status:'Search under way.'},
  {ch:98, loc:'Western Regions', threat:'Merchants speak of a travelling healer from long ago, and of villages that stopped asking her name.', status:'Rumour. Unconfirmed.'},
  {ch:99, loc:'Tribute Roads', threat:'Bandits are returning to the coast road now the armies are home.', status:'Contracts posted.'},
];
/* ---- Requests (optional; use the contract system, with trust rewards) ---- */
const ADRIAN_REQ = [
  {id:'ar_escort', kind:'Diplomatic', type:'deliver', to:'dragon_vale', from:'capital', icon:'🕊️', name:'Escort a Foreign Envoy', desc:'Adrian needs an envoy from the western ports to reach Dragonvale unharmed and unhurried.', rw:{xp:420, gold:260, rep:12}, trust:6, needCh:90},
  {id:'ar_dispute', kind:'Diplomatic', type:'kill', key:'road_bandit', need:5, icon:'⚖️', name:'Resolve a Village Dispute', desc:'Two villages blame each other for raids. Clear the bandits who are the real cause so the talks can begin.', rw:{xp:380, gold:210, rep:10}, trust:5, needCh:90},
  {id:'ar_corrupt', kind:'Intelligence', type:'collect', item:'forest_herb', need:4, icon:'🔎', name:'Investigate Corruption', desc:'A magistrate\'s supplier is paid in herbs the district should not have. Bring four herbs from the wilds as proof of the route.', rw:{xp:300, gold:180, rep:10, items:[{id:'rope_coil',qty:2}]}, trust:4, needCh:90},
  {id:'ar_suspicious', kind:'Intelligence', type:'kill', key:'imp', need:4, icon:'🕯️', name:'Suspicious Activity', desc:'Lesser demons have been seen near a closed shrine. Find out what is feeding them.', rw:{xp:520, gold:240, rep:12}, trust:6, needCh:90, needLoc:'dragon_vale'},
  {id:'ar_documents', kind:'Intelligence', type:'kill', key:'shade_beast', need:3, icon:'📜', name:'Locate Missing Documents', desc:'A courier carrying registry copies was attacked on the border road. Recover the road for the next courier.', rw:{xp:600, gold:300, rep:14, items:[{id:'relic_dust',qty:1}]}, trust:7, needCh:98, needLoc:'dragon_border'},
  {id:'ar_supplies', kind:'Diplomatic', type:'deliver', to:'faepool_harbour', from:'capital', icon:'📦', name:'Relief Supplies', desc:'Adrian is moving grain and medicine to the harbour. Deliver the manifest.', rw:{xp:320, gold:220, rep:8}, trust:4, needCh:90},
];
function refreshRequests(){
  const n = net(); if(n.reqDay === G.day && n.reqs.length) return n.reqs;
  const taken = new Set(G.quests.active.map(q => q.id));
  const pool = ADRIAN_REQ.filter(r => G.ch >= r.needCh && (!r.needLoc || locOpen(r.needLoc)) && !taken.has(r.id) && !(G.quests.doneIds||{})[r.id]);
  n.reqs = pool.sort(() => Math.random()-.5).slice(0,3).map(r => Object.assign({}, r, {c:0, need:r.need||1}));
  n.reqDay = G.day; return n.reqs;
}
function takeRequest(i){
  const r = refreshRequests()[i]; if(!r || G.quests.active.length >= MAX_QUESTS) return ['Your contract log is full.'];
  net().reqs.splice(i,1); G.quests.active.push(r); save(); return ['📨 Adrian\'s request accepted: '+r.name];
}
/* ---- Letters from Adrian (emotional beat; trust gated) ---- */
const ADRIAN_LETTERS = [
  {trust:0, subj:'You always find trouble', body:'I heard about what happened. You always find trouble.\n\n"You say that like it\'s my fault."\n\nIt usually is. Eat something. — Adrian'},
  {trust:5, subj:'The golden trees', body:'The trees in the residence garden dropped their gold last week. Mother had the gardener leave the fallen ones where they lay. She said you used to bury your treasures beneath them. I looked. There is a button, a bent spoon, and a very small sword. — Adrian'},
  {trust:12, subj:'Reports and tea', body:'I read your last report twice. You write as you fight: straight at the point, no preamble. A good advisor would teach you to write a paragraph first. I will not. It would not sound like you. — Adrian'},
  {trust:25, subj:'What I remember', body:'I told you I would remember enough for both of us. Last night I remembered that you used to correct my calligraphy and then say it was beautiful. You were seven. You were right about the stroke. — Adrian'},
  {trust:45, subj:'On advising', body:'Father says an advisor preserves balance. I think it is simpler than that: you stand where you are needed, and you are honest with the person who does not want to hear it. You have been doing it for years without the title. — Adrian'},
];
function nextAdrianLetter(){
  const n = net(), L = ADRIAN_LETTERS[n.nextLetter];
  if(!L || n.trust < L.trust) return null;
  n.nextLetter++; n.letters.unshift({subj:L.subj, body:L.body, day:G.day, read:false}); return L.subj;
}
/* ---- Intelligence archive ---- */
const INTEL = {
  kingdoms:[
    {ch:90, n:'Tribute', t:'Seat of King Greyson. The Imperial Advisors and the court govern from the capital; the Gold family has advised the crown for generations.'},
    {ch:90, n:'Dragonvale', t:'A kingdom of white towers on the waterfall cliffs, ruled by King Chadstone. Crown Prince Aster. The ancient seals along its borders have been steadied.'},
    {ch:90, n:'Altan', t:'A foreign kingdom to the west. Its princess, Seraphina Altan, travels with Jade. Little else is on file.'},
  ],
  history:[
    {ch:90, n:'Xima\'s Curse', t:'Reports of corrupted spirits, demon ash and sealed power surfacing across the isle. The curse follows the old seals.'},
    {ch:90, n:'Ancient Ruins', t:'Tribute\'s oldest records and Dragonvale\'s ancient seals share the same symbol. The ruins at the Dragonvale border were awakened and have been calmed.'},
    {ch:98, n:'The Missing Registries', t:'Sections of the border logs, healer registries and restricted family records were removed by hand. The Valen lineage file is empty and its seal was broken and resealed.'},
  ],
  enemies:[
    {ch:90, n:'Shade Beast', t:'A spirit beast corrupted by dark energy. Weakened by purification.'},
    {ch:90, n:'Imp', t:'A lesser demon from the cursed isle. Magic-user. Fragile but fast.'},
    {ch:90, n:'Stone Sentinel', t:'An ancient warden. Heavily armoured; breaks to sustained force.'},
  ],
  lore:[   // trust-gated family lore and memories
    {tr:1, n:'Childhood: the golden trees', t:'Jade and Adrian played beneath the golden trees of the Gold residence. She was always full of life.'},
    {tr:2, n:'Childhood: calligraphy lessons', t:'Adrian taught Jade calligraphy, history and discipline before he left for the Imperial Academy.'},
    {tr:3, n:'Gold family lore', t:'The house of Gold has advised Tribute for generations: not rulers, but guides who offer judgement, strategy and loyalty to the crown.'},
    {tr:4, n:'Jade\'s old personality', t:'Before the accident Jade was louder and bolder, and very stubborn about the small things she loved. Some of it came back with her. Some of it did not.'},
  ],
  files:[   // character files: [early, later]
    {id:'jade', n:'Jade Gold — Imperial Guardian', early:'A talented guard with unusual instincts.', late:'A key figure connecting Tribute, Dragonvale and Altan.', lateCh:99},
    {id:'devon', n:'Devon Chadstone — Prince of Dragonvale', early:'A prince of Dragonvale who refused the crown. Reserved. Reliable.', late:'Jade\'s husband and partner. Trusted by Greyson.', lateCh:99},
    {id:'sky', n:'Sky Yale — Healer', early:'A healer of unknown origin. Remembers little of his past.', late:'His healing is like Yvette Sue Valen\'s. File open.', lateCh:98},
    {id:'seraphina', n:'Seraphina Altan — Princess of Altan', early:'Left her marriage and travels with Jade. Disciplined.', late:'Altan\'s princess. Her intentions toward Tribute are unrecorded.', lateCh:99},
  ],
};
/* ---- Kingdom status (strategic decisions are a later expansion) ---- */
const KSTATUS = [{k:'Security', v:62}, {k:'Civilian Support', v:70}, {k:'Resources', v:55}];
/* ---- Contacts: the tree shows only what is unlocked ---- */
function contacts(){
  const c = [{n:'Adrian Gold', role:'Imperial Advisor'}, {n:'Tribute Intelligence', role:'Reports and archives'}];
  if(G.flags.contact_evelyne) c.push({n:'Princess Evelyne Greyson', role:'Royal Diplomatic Liaison'});   // reserved for her reveal chapter
  else c.push({n:'Unknown Contacts', role:'Locked', locked:true});
  return c;
}
let netTab = 'reports';
function rNetwork(){
  const tabs = [['reports','Reports'],['requests','Requests'],['intel','Intelligence'],['letters','Letters'],['status','Kingdom Status']];
  const unread = net().letters.filter(l => !l.read).length;
  const tree = contacts().map(c => `<span class="sm" style="${c.locked?'opacity:.5':''}">${c.n}${c.locked?'':' · '+c.role}</span>`).join(' ↓ ');
  let body = '';
  if(netTab==='reports') body = REPORTS.filter(r => G.ch>=r.ch).map(r => `<div class="ev"><div><b>Imperial Report</b><div class="sm">📍 ${r.loc}</div><div class="sm">Threat: ${r.threat}</div><div class="sm">Status: ${r.status}</div></div></div>`).join('') || '<div class="sm">No reports.</div>';
  if(netTab==='requests'){ const rs = refreshRequests();
    body = `<div class="sm">Adrian\'s optional requests (they use your contract log: ${G.quests.active.length}/${MAX_QUESTS}). New requests each day.</div>`+(rs.length?rs.map((r,i) => `<div class="ev"><div><b>${r.icon} ${r.name}</b> <span class="sm">· ${r.kind}</span><div class="sm">${r.desc}</div><div class="sm">${rwText(r.rw)} · Adrian\'s regard</div></div><button class="pri" onclick="act(takeRequest,${i})">Accept</button></div>`).join(''):'<div class="sm">Nothing today.</div>'); }
  if(netTab==='intel'){
    const sec = (title, list) => `<h4>${title}</h4>`+list.filter(e => e.ch===undefined || G.ch>=e.ch).map(e => `<div class="li"><b>${e.n}</b><div class="sm">${e.t}</div></div>`).join('');
    const lore = INTEL.lore.filter(e => trustLv() >= e.tr);
    const files = INTEL.files.map(f => `<div class="li"><b>${f.n}</b><div class="sm">${G.ch>=f.lateCh?f.late:f.early}</div></div>`).join('');
    body = sec('Kingdom records', INTEL.kingdoms)+sec('History and Xima\'s curse', INTEL.history)+sec('Enemy files', INTEL.enemies)+'<h4>Character files</h4>'+files+(lore.length?'<h4>Family lore</h4>'+lore.map(e => `<div class="li"><b>${e.n}</b><div class="sm">${e.t}</div></div>`).join(''):''); }
  if(netTab==='letters') body = net().letters.length ? net().letters.map((l,i) => `<div class="card" onclick="net().letters[${i}].read=true;netOpenLetter=${i};render()"><span class="big">${l.read?'📭':'💌'}</span><div class="fl"><b>${l.subj}</b><div class="sm">Adrian · Day ${l.day}</div></div></div>`).join('') : '<div class="sm">Adrian writes when you finish his requests.</div>';
  if(netTab==='letters' && netOpenLetter!==null && net().letters[netOpenLetter]){ const l = net().letters[netOpenLetter]; body = `<button onclick="netOpenLetter=null;render()">◀ Letters</button><div class="panel letter"><h3>${l.subj}</h3><div class="sm">From Adrian Gold · Day ${l.day}</div><div style="margin-top:8px;white-space:pre-line">${l.body}</div></div>`; }
  if(netTab==='status') body = KSTATUS.map(s => `<div class="ev"><div><b>${s.k}</b>${bar(s.v,100)}<div class="sm">${s.v}/100</div></div></div>`).join('')+'<div class="sm">Adrian will let Jade shape these (send soldiers, send supplies, investigate herself) later in the story.</div>';
  return `<h2>Imperial Network</h2><div class="panel"><b>TRIBUTE NETWORK</b><div>Adrian Gold</div><div class="sm">Imperial Advisor</div><div style="margin-top:6px">${tree}</div></div>
    <div class="row" style="margin:6px 0;flex-wrap:wrap">${tabs.map(([k,l]) => `<button class="${netTab===k?'pri':''}" onclick="netTab='${k}';netOpenLetter=null;render()">${l}${k==='letters'&&unread?' ●':''}</button>`).join('')}</div>${flashHtml()}${body}`;
}
let netOpenLetter = null;
