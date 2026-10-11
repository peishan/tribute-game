/* =====================================================================
   TRIBUTE — ARC IX GUESTS (Adrian and Eve), THE WEDDING THEME, AND WHO IS AT THE PALACE
   From the Arc VIII investigations on, Adrian can travel with Jade's party, and Eve Gray (Princess Evelyne, in disguise) joins as an ally. They are GUEST allies:
   passive companions at the party's level who never take a party slot and never become permanent members. While Adrian travels, the Tribute Palace's Imperial
   Network shows him UNAVAILABLE (no requests, no decisions from him); Eve can later be selected at the Palace only after her return to Tribute.
   Arc IX, The Forgotten Alliance: ch211-235. Evelyne's revelation is in ch221-225 (CH_FLAGS sets evelyne_revealed and evelyne_returned at 225, the end of that window: set them earlier from the
   chapter itself when it is known); the royal wedding is ch234 (sets evelyne_wed; Eve stops being a guest, eve_left) and ch235 completes the arc (Adrian is home: adrian_home).
   Windows (Adrian: away ch206-215, at the Palace and a guest on the investigations ch216-220) are set by story flags so the chapters can move them without code:
     adrian_home      set when Adrian is back at the Palace (ends his travelling guest period)   [default window: ch206 until this flag]
     eve_left         set when Eve leaves the party
     evelyne_revealed Eve is revealed as Princess Evelyne (the game's name for her changes from Eve Gray)
     evelyne_returned Evelyne is back in Tribute: she appears as a Palace contact (until then the slot shows "???")
     adrian_official  (later) Adrian's married court official look;   evelyne_wed: the wedding (royals.js; also starts the wedding theme below)
   PROTECTIVE BONDS (battle.js): Jade may step in for a wounded Adrian; Eve may strike back at whoever attacks Adrian; Adrian travelling without Jade or Eve is better
   at slipping away (Tactical Retreat). ON INVESTIGATIONS: Eve's Disguised Identity cuts ambushes, Hidden Expertise and Adrian's Scholar's Observation add a little XP.
   THE WEDDING THEME: for 60 in-game days after the royal wedding (flag evelyne_wed) enemies drop firecrackers, party poppers, red packets and door gifts:
   eastern wedding favours (red packets 🧧, double-happiness sweets 🍬, lucky knots, tea sets).  First-pass numbers and wording.
   ===================================================================== */
const ADRIAN_TRAVEL_FROM = 206;   // he is with the party in Dragonvale from the fourth record (ch206); his earlier appearance at 189-190 is short
const adrianWith = () => !!G && !!G.flags && ((G.ch >= 189 && G.ch <= 190) || (G.ch >= ADRIAN_TRAVEL_FROM && G.ch <= 215 && !G.flags.adrian_home));   // travelling: away from the Palace
const adrianGuest = () => adrianWith() || (!!G && !!G.flags && G.ch >= 216 && G.ch <= 220);   // from ch216 the story is in Tribute: he is at the Palace (research section) and still joins the party as a guest on the designated investigation chapters (216-220)
const eveWith = () => !!G && !!G.flags && !!G.flags.eve_ally && !G.flags.eve_left;
const evelyneAtPalace = () => !!G && !!G.flags && (!!G.flags.evelyne_returned || !!G.flags.contact_evelyne);
/* ---- investigations ---- */
const guestHere = id => typeof presentGuests==='function' && presentGuests().includes(id);
function eveEdge(){ return guestHere('evelyne'); }                 // Disguised Identity: fewer ambushes
function investigationGuestBonus(){                                 // Scholar's Observation + Hidden Expertise: a little XP on a finished clue
  const who = []; if(guestHere('adrian')) who.push('Adrian'); if(guestHere('evelyne')) who.push('Eve');
  if(!who.length) return null;
  return {who, xp:Math.round((120+avgPartyLv()*6)*who.length)};
}
/* ---- the wedding theme ---- */
const WEDDING_THEME_DAYS = 14;   // the game-wide celebration lasts 14 in-game days
Object.assign(ITEMS, {
  firecracker:{n:'Firecracker',icon:'🧨',type:'consumable',rarity:'common',theme:'wedding'},
  party_popper:{n:'Party Popper',icon:'🎉',type:'consumable',rarity:'common',theme:'wedding'},
  red_packet:{n:'Red Packet',icon:'🧧',type:'consumable',rarity:'uncommon',theme:'wedding'},
  door_gift:{n:'Wedding Door Gift',icon:'🎁',type:'consumable',rarity:'uncommon',theme:'wedding'},
  double_happiness_sweets:{n:'Double Happiness Sweets',icon:'🍬',type:'consumable',rarity:'common',theme:'wedding'},
  lucky_knot:{n:'Lucky Knot Charm',icon:'🪢',type:'material',rarity:'uncommon',theme:'wedding'},
  wedding_tea_set:{n:'Wedding Tea Set',icon:'🫖',type:'material',rarity:'rare',theme:'wedding'},
});
Object.assign(USE, {
  firecracker:{foeFx:{k:'bind', d:1}},               // a sudden bang: every foe startles for a turn
  party_popper:{foeFx:{k:'slow', d:2}, mp:12},        // a pop and streamers: foes slow, the user is cheered (+MP)
  red_packet:{open:true},
  door_gift:{open:true},
  double_happiness_sweets:{hp:80, mp:20},
});
const WEDDING_DROPS = [['firecracker',34],['party_popper',28],['red_packet',20],['double_happiness_sweets',12],['door_gift',6]];
function weddingThemeActive(){ return !!G && !!G.flags && !!G.flags.evelyne_wed && G.weddingDay !== undefined && G.day - G.weddingDay <= WEDDING_THEME_DAYS; }
function weddingSync(){
  if(!G || !G.flags || !G.flags.evelyne_wed || G.weddingDay !== undefined) return;
  G.weddingDay = G.day; chronicle('The royal wedding: Adrian Gold and Princess Evelyne. The streets are red with lanterns and paper.', '🧧'); toast('🧧 The wedding season has begun: firecrackers, party poppers and red packets are about.'); save(); setTimeout(showWedding, 600);
}
function weddingDrops(foes){
  if(!weddingThemeActive()) return [];
  const out = [], tot = WEDDING_DROPS.reduce((a, x) => a + x[1], 0);
  (foes||[]).forEach(f => { const rolls = f.boss ? 3 : 1; for(let i = 0; i < rolls; i++){ if(Math.random() < (f.boss ? .9 : .22)){ let r = Math.random()*tot, pick = WEDDING_DROPS[0][0]; for(const [k, w] of WEDDING_DROPS){ if(r < w){ pick = k; break; } r -= w; } out.push({id:pick, qty:1}); } } });
  if((foes||[]).some(f => f.boss)) out.push({id:'wedding_tea_set', qty:1});
  return out;
}
function openGift(k){   // red packets and door gifts, opened from the Items tab
  if(k==='red_packet'){ const g = 40 + Math.floor(Math.random()*111); G.gold += g; const msgs = ['🧧 The red packet holds '+g+' gold and a note: "Good fortune and a hundred years of happiness."']; if(Math.random() < .12){ addItems([{id:'lucky_knot', qty:1}]); msgs.push('🪢 Tucked inside: a lucky knot charm.'); } return msgs; }
  if(k==='door_gift'){ addItems([{id:'double_happiness_sweets', qty:2}]); const msgs = ['🎁 A door gift box: 2 double-happiness sweets.']; if(Math.random() < .5){ addItems([{id:'red_packet', qty:1}]); msgs.push('🧧 And a red packet.'); } if(Math.random() < .25){ addItems([{id:'lucky_knot', qty:1}]); msgs.push('🪢 And a lucky knot charm.'); } return msgs; }
  return [];
}
deed('wedding_season', 'world', 'Red lanterns', '🧧', 'The royal wedding season began.', () => G.weddingDay !== undefined);
deed('guest_trio', 'bonds', 'Travelling companions', '📜', 'Adrian and Eve both travelled with the party.', () => !!(G.flags.eve_ally && G.ch >= ADRIAN_TRAVEL_FROM));
/* ---- banter between Adrian and Eve (their romance grows through travelling together, never through a choice) ---- */
BANTER.push(
 {who:['adrian','evelyne'], ch:207, ctx:['any','rest'], lines:[['evelyne','Still carrying those little inventions?'],['adrian','They have saved me more than once.'],['evelyne','And here I thought you were becoming a martial arts master.'],['adrian','I prefer surviving to winning.'],['evelyne','Then perhaps we make a good team.']]},
 {who:['adrian','evelyne'], ch:207, ctx:['travel','any'], lines:[['adrian','You did not tell me you could do that.'],['evelyne','You never asked what I could do. You asked if I was safe.'],['adrian','I am learning.']]},
 {who:['adrian','evelyne'], ch:207, ctx:['battle'], lines:[['evelyne','Stay behind me.'],['adrian','That is my line.'],['evelyne','It was. Now it is a joke.']]},
 {who:['adrian','jade'], ch:206, ctx:['any','rest'], lines:[['jade','Have you been practising?'],['adrian','Every morning.'],['jade','Show me.'],['adrian','Certainly not.']]}
);

/* ---- the wedding splash and the celebration banner (14 days) ---- */
function showWedding(){ const el = $('arcpop'); if(!el) return; el.innerHTML = `<div class="arcbox"><img src="assets/events/royal_wedding.webp" alt="The royal wedding of Adrian Gold and Princess Evelyne"><div class="sm" style="text-align:center;margin:6px 0">🧧 The royal wedding celebrations: 14 days of lanterns, firecrackers, red packets and door gifts.</div><button class="pri" onclick="closeArc()">Continue</button></div>`; el.classList.add('on'); }
function weddingBanner(){
  if(!weddingThemeActive()) return '';
  const left = Math.max(0, WEDDING_THEME_DAYS - (G.day - G.weddingDay));
  return `<div class="panel" style="border-color:#c0392b"><b>🧧 The Royal Wedding Celebrations</b><div class="sm">The whole kingdom celebrates: ${left} day${left===1?'':'s'} left. Enemies drop firecrackers, party poppers, red packets and wedding door gifts.</div><button onclick="showWedding()">View the wedding</button></div>`;
}

/* =====================================================================
   EVELYNE'S PALACE ROLE (from ch224, after she announces she will serve Tribute as a government official)
   Imperial Network tab "Evelyne": POLITICAL INTELLIGENCE, DIPLOMATIC INVESTIGATIONS and CONFIDENTIAL REPORTS. Adrian keeps the historical research and the Register; the two
   responsibilities stay separate. Her combat abilities and personality do not change because her identity is public.
   A diplomatic inquiry (once every 3 in-game days) asks one of four neighbouring courts for its view: a little XP, court reputation, and a finding. State: G.eveInq = {last, n}.
   First-pass wording.
   ===================================================================== */
const evelynePalaceOpen = () => !!G && !!G.flags && !!G.flags.evelyne_returned;
const EVE_REPORTS = [
  {ch:222, n:'The court after the reveal', t:'Officials from several departments watched the princess enter. Most were surprised, a few were not. The king\'s support was visible to everyone.'},
  {ch:224, n:'Her announcement', t:'Princess Evelyne asked to serve through diplomacy, administration and the alliance with neighbouring kingdoms. No official objected in the hall; several were heard afterwards.'},
  {ch:226, n:'The match', t:'Some courtiers doubt a scholar suits a princess, citing alliance, stability and protection. The king supports her. Expect the matter to be raised again.'},
  {ch:227, n:'Neighbouring courts', t:'The North Kingdom, the Western Isles, the Southern Ports and the Eastern Coast all appear on the investigation\'s map of related incidents. Their courts have been told nothing yet.', show:() => !!G.flags.name_is_framework},
  {ch:200, n:'The fall of a house', t:'Marroway House is in turmoil after its master\'s arrest. Several families are quietly reassessing their ties to it.', show:() => !!G.flags.marroway_fallen},
];
const EVE_INQUIRIES = [
  ['North Kingdom','Its court is polite and silent about records older than three generations.'],
  ['Western Isles','The harbour guilds remember an alliance road, but not who closed it.'],
  ['Southern Ports','A customs clerk keeps a ledger that does not match the official tariff tables.'],
  ['Eastern Coast','A minister admits a route was "reclassified" in his grandfather\'s time, and will say no more in public.'],
];
const eveInq = () => { if(!G.eveInq) G.eveInq = {last:-99, n:0}; return G.eveInq; };
const eveInqReady = () => G.day - eveInq().last >= 3;
function eveInquire(i){
  if(!evelynePalaceOpen() || !eveInqReady()) return [];
  const E = eveInq(), q = EVE_INQUIRIES[i % EVE_INQUIRIES.length]; E.last = G.day; E.n++;
  const msgs = ['🏛️ Evelyne sounds out the '+q[0]+': '+q[1]]; gainXp(60 + avgPartyLv()*6, G.party).forEach(m => msgs.push(m));
  if(typeof repAdd==='function') repAdd('court', 2).forEach(m => msgs.push(m));
  if(E.n === 4) chronicle('Evelyne has sounded out the four neighbouring courts on the Register\'s behalf.', '🏛️');
  save(); return msgs.concat(advanceDay(1));
}
function rEvelyne(){
  const reps = EVE_REPORTS.filter(r => G.ch >= r.ch && (!r.show || r.show()));
  const E = eveInq(), ready = eveInqReady();
  return `<div class="panel"><div class="row" style="align-items:center;gap:10px;flex-wrap:nowrap"><img src="${portrait('evelyne')}" alt="Princess Evelyne" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:2px solid var(--gold)"><div><b>PRINCESS EVELYNE GREYSON</b><div class="sm">Royal Court Official · political intelligence, diplomatic investigations, confidential reports</div></div></div>
   <div class="sm" style="margin-top:6px">Adrian keeps the historical research and the Register; Evelyne keeps the courts. Their responsibilities are separate.</div></div>
   <h4>Diplomatic investigations</h4><div class="sm">Ask a neighbouring court for its view (once every 3 days). ${E.n} made.</div>
   <div class="row" style="flex-wrap:wrap;margin:6px 0">${EVE_INQUIRIES.map((q, i) => `<button ${ready?'':'disabled'} onclick="act(eveInquire,${i})">${q[0]}</button>`).join('')}</div>
   <h4>Confidential reports</h4>${reps.map(r => `<div class="li"><b>🔒 ${r.n}</b><div class="sm">${r.t}</div></div>`).join('') || '<div class="sm">None yet.</div>'}`;
}
deed('eve_reveal', 'story', 'A princess in disguise', '👑', 'Eve Gray was revealed as Princess Evelyne Greyson.', () => !!G.flags.evelyne_revealed);
deed('eve_inq4', 'world', 'Four courts', '🏛️', 'Evelyne sounded out all four neighbouring courts.', () => (G.eveInq && G.eveInq.n >= 4));
