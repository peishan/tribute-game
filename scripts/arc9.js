/* =====================================================================
   TRIBUTE — ARC IX GUESTS (Adrian and Eve), THE WEDDING THEME, AND WHO IS AT THE PALACE
   From the Arc VIII investigations on, Adrian can travel with Jade's party, and Eve Gray (Princess Evelyne, in disguise) joins as an ally. They are GUEST allies:
   passive companions at the party's level who never take a party slot and never become permanent members. While Adrian travels, the Tribute Palace's Imperial
   Network shows him UNAVAILABLE (no requests, no decisions from him); Eve can later be selected at the Palace only after her return to Tribute.
   Arc IX, The Forgotten Alliance: ch211-235. Evelyne's revelation is in ch221-225 (CH_FLAGS sets evelyne_revealed and evelyne_returned at 225, the end of that window: set them earlier from the
   chapter itself when it is known); the royal wedding is ch234 (sets evelyne_wed; Eve stops being a guest, eve_left) and ch235 completes the arc (Adrian is home: adrian_home).
   Windows are set by story flags so the chapters can move them without code:
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
const adrianWith = () => !!G && !!G.flags && ((G.ch >= 189 && G.ch <= 190) || (G.ch >= ADRIAN_TRAVEL_FROM && !G.flags.adrian_home));
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
const WEDDING_THEME_DAYS = 60;
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
  G.weddingDay = G.day; chronicle('The royal wedding: Adrian Gold and Princess Evelyne. The streets are red with lanterns and paper.', '🧧'); toast('🧧 The wedding season has begun: firecrackers, party poppers and red packets are about.'); save();
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
