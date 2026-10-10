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
  n:'Adrian Gold', icon:'📜', cls:'Royal Scholar', role:'Scholar / Tactical support (special-mission guest)', combat:'Defence, tools and tactics (a scholar, not a fighter)', guestOnly:true, companion:true, special:true,
  aka:{prince_consort:'Imperial Prince Consort (驸马都尉)', address:'Prince Consort Adrian'},
  identity:'Jade\'s older brother and Tribute\'s Imperial Advisor: a scholar who never took to the sword. His martial arts resemble Tai Chi (太极拳): balance, redirection, controlled breathing and defensive movement; he carries smoke and gas pouches and small grenades and survives by intelligence and technique, not strength. His defence is clearly better than his offence. He travels with the party as a temporary guest in the Arc VIII and IX investigations (a green-and-gold scholar\'s robe), and never as a permanent member.',
  style:['Evasive steps','Smoke and gas bombs','Negotiation'], strength:'Survival and control',
  weapon:'Bombs and pellets', signature:'Smoke Screen', sigDesc:'A cloud of smoke: the whole party is harder to hit.',
  base:{hp:72,mp:46,atk:6,mag:11,def:11,spd:13}, grow:{hp:6.6,mp:3.6,atk:.6,mag:1.4,def:1.3,spd:1.2},
  skills:[
   {id:'flowing_defence',n:'Flowing Defence',icon:'🌊',mp:6,kind:'support',tgt:'self',fx:[{k:'shield',v:.28,d:3},{k:'buff',stat:'def',m:1.3,d:3}],req:{lvl:1},desc:'Balance, breath and flowing movement: a barrier and higher defence. His best skill.'},
   {id:'redirecting_force',n:'Redirecting Force',icon:'🌀',mp:6,kind:'phys',tgt:'foe',pow:.7,fx:[{k:'slow',d:1}],req:{lvl:1},desc:'He uses the attacker\'s own momentum: minimal damage, and the foe stumbles.'},
   {id:'scholars_observation',n:'Scholar\'s Observation',icon:'🔍',mp:5,kind:'support',tgt:'foe',fx:[{k:'analyze'}],req:{lvl:1},desc:'He reads the foe: its weaknesses are revealed (and on investigations he notices hidden clues).'},
   {id:'smoke_pouch',n:'Smoke Pouch',icon:'💨',mp:9,kind:'support',tgt:'foes',fx:[{k:'bind',d:1},{k:'buff',stat:'eva',m:1.35,d:2,self:true}],req:{lvl:2},sig:true,desc:'SIGNATURE. A cloud of smoke interrupts every enemy for a turn and lets him reposition.'},
   {id:'gas_pouch',n:'Gas Pouch',icon:'☁️',mp:10,kind:'support',tgt:'foes',fx:[{k:'slow',d:2},{k:'silence',d:1}],req:{lvl:3},desc:'A disorienting gas: foes are slowed and fumble their aim.'},
   {id:'emergency_grenade',n:'Emergency Grenade',icon:'💣',mp:11,kind:'magic',tgt:'foes',pow:.9,fx:[{k:'buff',stat:'eva',m:1.4,d:2,self:true}],req:{lvl:4},desc:'Modest damage to every enemy and a chance to get away.'},
   {id:'tactical_retreat',n:'Tactical Retreat',icon:'🏃',mp:8,kind:'support',tgt:'self',fx:[{k:'disengage'}],req:{lvl:5},desc:'The party tries to break off the fight (not in story battles or against bosses). Better odds if Adrian travels without Jade or Eve.'},
  ], evo:{tiers:[]}, bond:null };
CHARACTERS.evelyne = {
  n:'Princess Evelyne', icon:'👑', cls:'Disguised Scholar', role:'Investigation / Infiltration (guest ally)', combat:'Precise counters and stealth', guestOnly:true, companion:true, special:true,
  aka:{alias:'Eve Gray'},
  identity:'Travels as Eve Gray, disguised as a young man, a humble scholar with deep knowledge of the archives and hidden networks; Adrian\'s correspondent by pigeon and, later, his wife. Her true identity (Princess Evelyne, called Evelyn by the young King Greyson) is revealed in the story: until then the game calls her Eve Gray. Capable of defending herself, but never stronger than Jade.',
  style:['Disguise','Stealth','Precise counters'], strength:'Investigation and infiltration',
  weapon:'Hidden blade', signature:'Quick Counter', sigDesc:'A precise strike that answers an enemy\'s attack.',
  base:{hp:70,mp:44,atk:10,mag:9,def:8,spd:14}, grow:{hp:6.2,mp:3.2,atk:1.3,mag:1,def:.9,spd:1.3},
  skills:[
   {id:'disguised_identity',n:'Disguised Identity',icon:'🎩',mp:6,kind:'support',tgt:'self',fx:[{k:'buff',stat:'eva',m:1.25,d:3}],req:{lvl:1},desc:'She blends in: harder to target. On investigations she draws less suspicion (fewer ambushes).'},
   {id:'hidden_expertise',n:'Hidden Expertise',icon:'📚',mp:5,kind:'support',tgt:'foe',fx:[{k:'analyze'}],req:{lvl:1},desc:'She notices what ordinary investigators miss: the foe is analysed. On investigations she adds a little XP.'},
   {id:'courtly_insight',n:'Courtly Insight',icon:'👁️',mp:7,kind:'support',tgt:'foe',fx:[{k:'analyze'},{k:'slow',d:1}],req:{lvl:2},desc:'She reads the room: the foe is analysed and thrown off its rhythm.'},
   {id:'quick_counter',n:'Quick Counter',icon:'⚔️',mp:7,kind:'phys',tgt:'foe',pow:1.6,fx:[{k:'buff',stat:'def',m:1.2,d:2,self:true}],req:{lvl:1},sig:true,desc:'SIGNATURE. A precise strike that answers an attack, and a firmer guard.'},
   {id:'silent_approach',n:'Silent Approach',icon:'🤫',mp:8,kind:'support',tgt:'self',fx:[{k:'buff',stat:'eva',m:1.4,d:3},{k:'crit',d:2}],req:{lvl:3},desc:'She moves unseen: harder to hit, and her next strikes find the openings.'},
   {id:'royal_education',n:'Royal Education',icon:'🎓',mp:10,kind:'support',tgt:'allies',fx:[{k:'mp',v:.12}],req:{lvl:4},desc:'Calm, well-schooled tactics: the party recovers some MP.'},
  ], evo:{tiers:[]}, bond:null };
// until the story reveals her, the game calls her Eve Gray
Object.defineProperty(CHARACTERS.evelyne, 'n', {get(){ return (typeof G!=='undefined' && G && G.flags && G.flags.evelyne_revealed) ? 'Princess Evelyne' : 'Eve Gray'; }, configurable:true, enumerable:true});
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
// Adrian and Eve are also temporary guests of the Arc VIII and IX investigations (see arc9.js): they travel with the party while the story says so
GUEST_RULES.adrian.alt = () => typeof adrianWith==='function' && adrianWith();
GUEST_RULES.adrian.note = 'Adrian Gold travels with the party for the investigation (a scholar: his defence is better than his offence). He is a guest, never a permanent member.';
GUEST_RULES.evelyne.alt = () => typeof eveWith==='function' && eveWith();
GUEST_RULES.evelyne.note = 'Eve Gray travels with the party as an ally of the investigation (a guest, not a party member).';
function specialMissionStart(){ if(!specialMissionOpen()) return []; G.flags.special_mission_on = true; save(); return ['👑 A special mission: Adrian, Evelyne and King Greyson travel with Jade and Devon.']; }
function specialMissionEnd(){ if(!G.flags.special_mission_on) return []; G.flags.special_mission_on = false; save(); return ['👑 The royal guests return to their duties.']; }
// the special mission's party: Jade, Devon and the three guests (use as startBattle({allies: specialMissionAllies(), ...}))
const specialMissionAllies = () => specialMissionOpen() && G.flags.special_mission_on ? ['jade','devon'].concat(ROYAL_GUESTS) : null;
