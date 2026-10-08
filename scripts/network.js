/* =====================================================================
   TRIBUTE — THE IMPERIAL NETWORK (Adrian Gold, support NPC; not playable)
   Unlocks at chapter 90 (the Gold reunion). Adrian is Tribute's connection: reports, requests, an intelligence
   archive, letters and a kingdom status board. What the player learns: he exists, he is Jade\'s older brother, he is an
   Imperial Advisor. NOT revealed here: his personal story, past assignments, his true influence, or his link to
   Greyson\'s family (reserved: a contact slot is added later by the flag `contact_evelyne`, see CONTACTS).
   Hidden stat: Adrian\'s trust (G.net.trust) rises with finished requests and read letters; thresholds unlock
   childhood memories and Gold family lore. State: G.net = {trust, read:{}, letters:[], reqDay, reqs:[], seen:{}}
   ===================================================================== */
const NET_CH = 90;
const TRUST_LV = [0, 15, 40, 80, 130];
const netOpen = () => !!G && G.ch >= NET_CH;
function net(){ if(!G.net) G.net = {trust:0, letters:[], reqDay:0, reqs:[], read:{}, nextLetter:0}; return G.net; }
const trustLv = () => { let l = 0; TRUST_LV.forEach((t,i) => { if(net().trust >= t) l = i; }); return l; };
function addTrust(n){ net().trust += n>0 ? n + relPerk('trustBonus') : n; }

/* ---- Reports (world-building; chapter gated) ---- */
const REPORTS = [
  {ch:90, loc:'Northern Border', threat:'Unknown creatures appearing near abandoned ruins.', status:'Investigation recommended.'},
  {ch:90, loc:'Faepool Harbour', threat:'Trade is steady; two ships overdue from the western routes.', status:'Monitoring.'},
  {ch:92, loc:'Gold Residence Quarter', threat:'Old family papers of the Valor line have been requested by an unnamed buyer.', status:'Buyer unknown.'},
  {ch:94, loc:'Imperial Capital', threat:'Healer guilds report a rise in forgotten-memory cases among travellers.', status:'Watching.'},
  {ch:95, loc:'Dragonvale', threat:'Crown Prince Aster has settled the court. The borders are calm for now.', status:'Stable.'},
  {ch:98, loc:'Royal Archives', threat:'Sections of the healer registries and border logs were removed by hand.', status:'Search under way.'},
  {ch:98, loc:'Western Regions', threat:'Merchants speak of a travelling healer from long ago, and of villages that stopped asking her name.', status:'Rumour. Unconfirmed.'},
  {ch:101, loc:'Beyond the Island', threat:'An allied territory has reported missing envoys, old records and disappearances near forgotten ruins.', status:'Greyson has sent Jade.'},
  {ch:118, loc:'Valen Borderlands', threat:'Mira Valen now represents Valen. The archives are open, the healer routes are running, and Lio carries messages between regions.', status:'Allied.'},
  {ch:121, loc:'Royal Court', threat:'The Valen records and Corvin Hale\'s testimony are before the throne. Greyson fears forces inside the kingdom itself.', status:'Sealed court proceedings.'},
  {ch:122, loc:'Western Frontier', threat:'Demons are retreating from the west in panic, away from forgotten shrines, ancient battlefields and old seal sites.', status:'Not an invasion. Cause unknown.'},
  {ch:122, loc:'Northern Border', threat:'Sightings match locations whose seals have recently weakened. The remaining fifteen evils may be stirring.', status:'Watching.'},
  {ch:123, loc:'The Forgotten Battlefield', threat:'A field of statues, older than Xima\'s war. Scouts will not go near it. A man who calls himself the last Seal Keeper stands watch.', status:'Jade\'s party is on site.'},
  {ch:124, loc:'The Forgotten Battlefield', threat:'A cracked ancient seal beneath the field. Cael Ardyn warns that it is a prison, and that it remembers its prisoner.', status:'Critical.'},
  {ch:131, loc:'The Celestial Ruins', threat:'A forgotten region beyond the known lands: floating mountains, a silent city and the broken-seal symbol on every gate.', status:'Jade\'s party is on site.'},
  {ch:132, loc:'The Celestial Ruins', threat:'An intact city with no people. A guardian says its people were erased, not attacked.', status:'Seal decay suspected.'},
  {ch:135, loc:'Seal Sites', threat:'A man named Varyn Noctis claims to be opening, not breaking, the old seals. Incidents across five kingdoms share his handwriting.', status:'Contact made.'},
  {ch:139, loc:'The Land Beyond the Seal', threat:'Behind the opened seal lies a cut-off civilization of homes, schools and temples, not a realm of monsters.', status:'Jade\'s party is on site.'},
  {ch:146, loc:'The Fifteen Evils', threat:'The truth of the curse is known, but the curse remains and the fifteen evils still walk the world. An ancient threat that retreated waits behind the barrier.', status:'Arc V closed. The journey continues.'},
  {ch:147, loc:'Royal Council', threat:'Fifteen major entities have been identified across the continent. Jade is entrusted with the investigation.', status:'The Fifteen Register is open.'},
  {ch:148, loc:'Northern Forest', threat:'Villages near the northern forest attacked overnight; people vanishing; a forest gone silent. Sally believes it is the first Evil.', status:'Jade\'s party is travelling north.'},
  {ch:149, loc:'The Black Forest', threat:'A Spirit Ranger, Rin Kaede, is already tracking the First Evil. It leaves both a corrupted and a spiritual trail.', status:'Hunt under way.'},
  {ch:152, loc:'The Forest of Thorns', threat:'The Thorned Widow has fallen and the corruption is fading. The shrine names it a guardian spirit. Register: 1/15 Resolved.', status:'Resolved.'},
  {ch:153, loc:'Mourning Valley', threat:'A spectral stag attacks anyone who enters the valley. The villagers want it killed. Spirit readings say it is not simple corruption.', status:'Investigating.'},
  {ch:155, loc:'Mourning Valley', threat:'Looters and corrupt officials\' soldiers have repeatedly desecrated a burial ground beneath the valley. The hart guards it.', status:'Under protection.'},
  {ch:156, loc:'Mourning Valley', threat:'The Mourning Hart has withdrawn into its sanctuary. The valley and its forests are now protected land under the crown. Register: 2/15 Resolved.', status:'Resolved.'},
  {ch:157, loc:'The Crownless Marches', threat:'New reports of a humanoid figure walking abandoned settlements and speaking names no living person knows.', status:'Investigating.'},
  {ch:161, loc:'The Crownless Marches', threat:'The Hollow King has been contained. Register: 3/15 Resolved.', status:'Resolved.'},
  {ch:164, loc:'Royal Archive', threat:'Entry IV of the Fifteen Register was deliberately removed from every official copy.', status:'Investigating.'},
  {ch:165, loc:'The Abandoned Archive-Shrine', threat:'A hooded figure who claims to have seen the Fifteen before they were named waited at the archive-shrine tied to the missing Fourth Entry.', status:'Unresolved.'},
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
const KSTATUS_BASE = {sec:62, civ:70, res:55};
const KLABEL = {sec:'Security', civ:'Civilian Support', res:'Resources'};
const kstat = () => { const n = net(); if(!n.k) n.k = Object.assign({}, KSTATUS_BASE); return n.k; };
/* Strategic decisions: Adrian lays a situation before Jade; she picks a response. One per in-game week (7 days). Trains her toward an advisor's role. */
const DECISIONS = [
  {id:'d_village', ch:90, title:'A village needs support', text:'A river village lost its grain store to a fire. Adrian: "Soldiers, supplies, or you. Choose, and I will make it so."',
   opts:[{t:'Send soldiers', fx:{sec:+8, res:-6}, say:'Soldiers camp by the river. The roads feel safer, and the treasury a little lighter.'},
         {t:'Send supplies', fx:{civ:+8, res:-8}, say:'Grain and blankets arrive. The village will remember who sent them.'},
         {t:'Investigate personally', fx:{civ:+3}, say:'You set out yourself. A quest is posted for the Imperial Capital board.', trust:3}]},
  {id:'d_envoy', ch:90, title:'An envoy asks for terms', text:'A western trade envoy asks for lower tolls. Adrian: "They will pay in goods or goodwill. Which do you prefer?"',
   opts:[{t:'Keep the tolls', fx:{res:+8, civ:-4}, say:'The treasury grows. The envoy leaves unsmiling.'}, {t:'Lower the tolls', fx:{civ:+6, res:-4}, say:'Trade quickens. The merchants speak well of Tribute.'}, {t:'Ask for something in return', fx:{res:+3, civ:+3}, say:'A modest bargain. Adrian nods: "Balance."', trust:2}]},
  {id:'d_border', ch:98, title:'Border patrols', text:'Guard captains ask for more patrols on the coast road. Adrian: "More patrols mean fewer farmers on the road."',
   opts:[{t:'Double the patrols', fx:{sec:+10, civ:-4, res:-4}, say:'The roads grow quiet. So do the inns.'}, {t:'Keep the patrols as they are', fx:{}, say:'Nothing changes. Adrian writes it down anyway.'}, {t:'Recruit local watchmen', fx:{sec:+5, civ:+5, res:-5}, say:'Villagers volunteer. The captains grumble.', trust:2}]},
  {id:'d_valen', ch:104, title:'The west asks for help', text:'Mira Valen\'s people ask Tribute for medicine and a road crew. Adrian: "The west has waited a long time."',
   opts:[{t:'Send medicine', fx:{civ:+8, res:-6}, say:'Medicine crates head west. Mira will not forget it.'}, {t:'Send road crews', fx:{sec:+6, res:-8}, say:'The western road is mended, stone by stone.'}, {t:'Send both and ask for no thanks', fx:{civ:+6, sec:+4, res:-12}, say:'Both go west. Adrian says nothing, which is high praise.', trust:3}]},
];
const decisionDay = () => { const n = net(); return n.decDay === undefined ? -99 : n.decDay; };
function openDecision(){
  const n = net(); if(G.day - decisionDay() < 7) return null;
  n.decDone = n.decDone || {};
  return DECISIONS.find(d => G.ch >= d.ch && !n.decDone[d.id]) || null;
}
function decide(id, i){
  const d = DECISIONS.find(x => x.id===id), o = d && d.opts[i]; if(!d || !o || net().decDone && net().decDone[id]) return [];
  net().decDone = net().decDone || {}; net().decDone[id] = true; net().decDay = G.day;
  const k = kstat(); Object.keys(o.fx).forEach(s => k[s] = Math.max(0, Math.min(100, k[s] + o.fx[s])));
  if(o.trust) addTrust(o.trust);
  return ['🏛️ '+d.title+': '+o.t+'. '+o.say].concat(Object.keys(o.fx).map(s => KLABEL[s]+' '+(o.fx[s]>0?'+':'')+o.fx[s]));
}
/* ---- Contacts: the tree shows only what is unlocked ---- */
function contacts(){
  const c = [{n:'Adrian Gold', role:'Imperial Advisor'}, {n:'Tribute Intelligence', role:'Reports and archives'}];
  if(G.flags.contact_evelyne) c.push({n:'Princess Evelyne Greyson', role:'Royal Diplomatic Liaison'});   // reserved for her reveal chapter
  else c.push({n:'Unknown Contacts', role:'Locked', locked:true});
  return c;
}
let netTab = 'reports';
function rNetwork(){
  const tabs = [['reports','Reports'],['requests','Requests'],['intel','Intelligence'],['letters','Letters'],['status','Kingdom Status']].concat(typeof evilsOpen==='function' && evilsOpen() ? [['register','Fifteen Evils']] : [], typeof archiveTabs==='function' ? archiveTabs() : []);
  const unread = net().letters.filter(l => !l.read).length;
  const tree = contacts().map(c => `<span class="sm" style="${c.locked?'opacity:.5':''}">${c.n}${c.locked?'':' · '+c.role}</span>`).join(' ↓ ');
  let body = '';
  if(netTab==='register') body = rRegister();
  if(typeof rArchiveTab==='function' && rArchiveTab(netTab)) body = rArchiveTab(netTab);
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
  if(netTab==='status'){ const k = kstat(), d = openDecision();
    body = Object.keys(KLABEL).map(s => `<div class="ev"><div><b>${KLABEL[s]}</b>${bar(k[s],100)}<div class="sm">${k[s]}/100</div></div></div>`).join('')
      + (d ? `<div class="panel"><b>${d.title}</b><div class="sm" style="margin:4px 0">${d.text}</div>${d.opts.map((o,i) => `<button onclick="act(decide,'${d.id}',${i})">${o.t}</button>`).join(' ')}</div>` : `<div class="sm">Adrian has no new decision for you. One arrives each week of in-game time.</div>`); }
  return `<h2>Imperial Network</h2><div class="panel"><div class="row" style="align-items:center;gap:10px;flex-wrap:nowrap"><img src="assets/npc/adrian.webp" alt="Adrian Gold" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:2px solid var(--gold)"><div><b>TRIBUTE NETWORK</b><div>Adrian Gold</div><div class="sm">Imperial Advisor</div></div></div><div style="margin-top:6px">${tree}</div></div>
    <div class="row" style="margin:6px 0;flex-wrap:wrap">${tabs.map(([k,l]) => `<button class="${netTab===k?'pri':''}" onclick="netTab='${k}';netOpenLetter=null;render()">${l}${k==='letters'&&unread?' ●':''}</button>`).join('')}</div>${flashHtml()}${body}`;
}
let netOpenLetter = null;
