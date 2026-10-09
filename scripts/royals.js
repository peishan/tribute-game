/* =====================================================================
   TRIBUTE — THE ROYAL GUESTS (special-mission companions): Adrian Gold, Princess Evelyne, King Greyson
   Author decision: Adrian, Evelyne and Greyson can NEVER be permanently recruited. They are special-mission guests: for a story mission they fight beside Jade and
   Devon (the first one is the mission where Greyson, Adrian, Eve, Jade and Devon travel together, after Adrian's wedding), then return to their duties.
   They are BUILT IN BUT LOCKED: nothing appears (no list, no hint) until the story sets the flag evelyne_wed in the chapter of Adrian and Evelyne's wedding. A mission
   starts the guests with specialMissionStart() and ends them with specialMissionEnd(); while it runs they are present guests at the party's level.
   Identity and titles (author): Adrian Gold, Royal Scholar -> Imperial Prince Consort (驸马都尉, "Prince Consort Adrian") through marriage, not birth. Evelyne is the
   Princess who travelled as Eve Gray (Adrian knows her as Eve Gray first). King Greyson's full name is Hugh Greyson; his travelling alias is Hugh Gray.
   Powers: Adrian's come from chapter 168 (balance, breath, evasive steps, smoke and gas bombs, grenades, negotiation). Evelyne's and Greyson's are PLACEHOLDERS to be
   replaced when their chapters show how they fight. All numbers first-pass.
   ===================================================================== */
const ROYAL_GUESTS = ['adrian','evelyne','greyson'];
const specialMissionOpen = () => !!G && !!G.flags && !!G.flags.evelyne_wed;
CHARACTERS.adrian = {
  n:'Adrian Gold', icon:'📜', cls:'Royal Scholar', role:'Scholar / Tactical support (special-mission guest)', combat:'Evasion, bombs and tactics', guestOnly:true, companion:true, special:true,
  aka:{prince_consort:'Imperial Prince Consort (驸马都尉)', address:'Prince Consort Adrian'},
  identity:'Jade\'s older brother and Tribute\'s Imperial Advisor: a scholar who never took to the sword. He learned balance, controlled breathing, evasive steps and how to redirect force, and carries smoke bombs, gas bombs and small grenades or pellets; he relies on intelligence, negotiation and tactical tools.',
  style:['Evasive steps','Smoke and gas bombs','Negotiation'], strength:'Survival and control',
  weapon:'Bombs and pellets', signature:'Smoke Screen', sigDesc:'A cloud of smoke: the whole party is harder to hit.',
  base:{hp:68,mp:46,atk:7,mag:13,def:8,spd:13}, grow:{hp:6.2,mp:3.6,atk:.8,mag:1.8,def:.9,spd:1.2},
  skills:[
   {id:'evasive_step',n:'Evasive Step',icon:'🥋',mp:4,kind:'support',tgt:'self',fx:[{k:'buff',stat:'eva',m:1.4,d:3}],req:{lvl:1},desc:'Balance, breath and a step aside: his evasion rises.'},
   {id:'smoke_bomb',n:'Smoke Bomb',icon:'💨',mp:9,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'eva',m:1.3,d:3}],req:{lvl:1},sig:true,desc:'SIGNATURE. A cloud of smoke: the whole party is harder to hit.'},
   {id:'gas_bomb',n:'Gas Bomb',icon:'☁️',mp:10,kind:'magic',tgt:'foes',pow:1.0,fx:[{k:'slow',d:2}],req:{lvl:3},desc:'A choking cloud: hits every enemy and slows them.'},
   {id:'redirect_force',n:'Redirect Force',icon:'🌀',mp:8,kind:'support',tgt:'self',fx:[{k:'shield',v:.2,d:3},{k:'buff',stat:'def',m:1.3,d:3}],req:{lvl:5},desc:'He does not meet force with force: a barrier and higher defence.'},
  ], evo:{tiers:[]}, bond:null };
CHARACTERS.evelyne = {
  n:'Princess Evelyne', icon:'👑', cls:'Princess', role:'Royal diplomat (special-mission guest)', combat:'Diplomacy and grace (placeholder)', guestOnly:true, companion:true, special:true,
  aka:{alias:'Eve Gray'},
  identity:'The princess who travelled as Eve Gray, disguised as a young man; Adrian\'s correspondent by pigeon and, later, his wife. Her powers are a placeholder until her chapters show how she fights.',
  style:['Diplomacy','Composure'], strength:'Royal diplomacy',
  weapon:'None yet', signature:'Royal Poise', sigDesc:'A calm word: the party steadies and recovers a little each turn.',
  base:{hp:62,mp:50,atk:6,mag:12,def:7,spd:12}, grow:{hp:5.6,mp:3.8,atk:.7,mag:1.7,def:.8,spd:1.1},
  skills:[
   {id:'calming_word',n:'Calming Word',icon:'🕊️',mp:7,kind:'heal',tgt:'ally',pow:1.3,fx:[{k:'cleanse'}],req:{lvl:1},desc:'A calm word: heals and cleanses an ally. (Placeholder.)'},
   {id:'royal_poise',n:'Royal Poise',icon:'👑',mp:11,kind:'support',tgt:'allies',fx:[{k:'regen',v:.06,d:3},{k:'shield',v:.12,d:3}],req:{lvl:4},sig:true,desc:'SIGNATURE. The party steadies: a light barrier and a little healing each turn. (Placeholder.)'},
  ], evo:{tiers:[]}, bond:null };
CHARACTERS.greyson = {
  n:'King Greyson', icon:'🏯', cls:'King of Tribute', role:'Royal authority / Leadership (special-mission guest)', combat:'Command and royal authority (placeholder)', guestOnly:true, companion:true, special:true,
  aka:{full:'Hugh Greyson', alias:'Hugh Gray'},
  identity:'The young King of Tribute, whose full name is Hugh Greyson. He travels as Hugh Gray when he wants to move unrecognised. His duties keep him from ever being a permanent companion. His powers are a placeholder until his chapters show how he fights.',
  style:['Command','Royal authority'], strength:'Leadership',
  weapon:'None yet', signature:'Royal Decree', sigDesc:'A command no one questions: the party\'s attack and speed rise.',
  base:{hp:80,mp:34,atk:11,mag:8,def:10,spd:11}, grow:{hp:7.5,mp:2.6,atk:1.4,mag:1,def:1.1,spd:1},
  skills:[
   {id:'crowns_guard',n:'Crown\'s Guard',icon:'🛡️',mp:8,kind:'support',tgt:'ally',fx:[{k:'shield',v:.25,d:3}],req:{lvl:1},desc:'The Crown stands behind an ally: a strong barrier. (Placeholder.)'},
   {id:'royal_decree',n:'Royal Decree',icon:'📜',mp:12,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'atk',m:1.2,d:3},{k:'buff',stat:'spd',m:1.1,d:3}],req:{lvl:4},sig:true,desc:'SIGNATURE. A command no one questions: attack and speed rise for the party. (Placeholder.)'},
  ], evo:{tiers:[]}, bond:null };
ROYAL_GUESTS.forEach(id => { ROSTER.push(id); XP_CLASS[id] = 'support'; GUEST_RULES[id] = {flag:['evelyne_wed','special_mission_on'], sync:true, note:CHARACTERS[id].n+' joins the party for this special mission only.'}; });
function specialMissionStart(){ if(!specialMissionOpen()) return []; G.flags.special_mission_on = true; save(); return ['👑 A special mission: Adrian, Evelyne and King Greyson travel with Jade and Devon.']; }
function specialMissionEnd(){ if(!G.flags.special_mission_on) return []; G.flags.special_mission_on = false; save(); return ['👑 The royal guests return to their duties.']; }
// the special mission's party: Jade, Devon and the three guests (use as startBattle({allies: specialMissionAllies(), ...}))
const specialMissionAllies = () => specialMissionOpen() && G.flags.special_mission_on ? ['jade','devon'].concat(ROYAL_GUESTS) : null;
