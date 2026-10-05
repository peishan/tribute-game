/* =====================================================================
   TRIBUTE — CHARACTER SYSTEM DATA
   Source: user's "Final Character Classes" doc. Everything marked DRAFT
   (skill names beyond the doc, numbers, unlock levels) is a proposal to tune.
   Skill schema:
     id, n (name), icon, mp, kind: phys|magic|heal|support
     tgt: foe | foes | chain | ally | allies | self | allyDown
     pow (multiplier), elem, fx: [...effects], once (1 use per battle)
     req: { lvl, bond, evo, flag }  -> unlock condition
     pair: true -> bond combo, needs Jade standing
   Effects (fx): burn slow bind charm silence | buff{stat,m,d} | shield{v,d}
     regen{v,d} | cleanse | analyze | revive | crit{d} | state{id,d}
   ===================================================================== */
const STATS = ['hp','mp','atk','mag','def','spd'];

const CHARACTERS = {
 jade:{
  n:'Jade Gold', icon:'🌙', cls:'Imperial Guardian', role:'Hybrid Whip & Bow / Destiny', combat:'Leader / Adaptable Hybrid',
  identity:'Protagonist with hidden bloodline powers. Destiny and prophecy.',
  style:['Whip','Bow','Defensive techniques','Destiny powers'], strength:'Adaptability',
  weapon:'Whip & Bow (later: dagger and flail from Greyson, Levi\'s crossbow)', signature:'Golden Blood Awakening',
  sigDesc:'Enhanced perception, prophecy-related abilities, and a connection to Dima\'s legacy. Once per battle she awakens: all stats rise and her skills cost less.',
  base:{hp:80,mp:30,atk:11,mag:9,def:10,spd:9}, grow:{hp:9,mp:3,atk:1.6,mag:1.2,def:1.3,spd:.8},
  skills:[
   {id:'lunar_slash',n:'Lunar Lash',icon:'🌙',mp:5,kind:'phys',tgt:'foe',pow:1.7,req:{lvl:1},desc:'A crescent sweep of her whip.'},
   {id:'piercing_arrow',n:'Piercing Arrow',icon:'🏹',mp:3,kind:'phys',tgt:'foe',pow:1.4,req:{lvl:2},desc:'A precise bow shot from a distance.'},
   {id:'guard_stance',n:'Guard Stance',icon:'🛡️',mp:4,kind:'support',tgt:'self',fx:[{k:'buff',stat:'def',m:1.6,d:3}],req:{lvl:3},desc:'Raise her guard: DEF up for 3 turns.'},
   {id:'clairvoyance',n:'Clairvoyance',icon:'👁️',mp:6,kind:'support',tgt:'self',fx:[{k:'crit',d:3},{k:'analyze'}],req:{lvl:6},desc:'Foresight: guaranteed crits for 3 turns and reveals an enemy.'},
   {id:'destiny_link',n:'Destiny Link',icon:'🔗',mp:10,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'atk',m:1.2,d:3},{k:'buff',stat:'mag',m:1.2,d:3}],req:{lvl:10},desc:'Binds the party\'s fates: ATK and MAG up.'},
   {id:'golden_blood',n:'Golden Blood Awakening',icon:'✨',mp:0,kind:'support',tgt:'self',once:true,fx:[{k:'state',id:'awakened',d:4}],req:{flag:'jade_awakened'},sig:true,desc:'SIGNATURE. Her blood awakens (chapter 42, partial awakening): all stats +25% and skills cost half for 4 turns. Once per battle.'},
   {id:'cleansing_touch',n:'Cleansing Touch',icon:'🤲',mp:7,kind:'magic',tgt:'foe',pow:1.0,vsCorrupt:2.5,fx:[{k:'cleanse'}],req:{flag:'cleansing_touch'},desc:'Her restoring power (chapter 38). Heavy against corrupted foes, who are freed instead of slain.'},
   {id:'hidden_dagger',n:'Hidden Dagger',icon:'🗡️',mp:4,kind:'phys',tgt:'foe',pow:1.9,req:{flag:'greyson_arms'},desc:'Greyson\'s dagger: a quick, close strike. Given in the Prologue; she may not use it until the major battle.'},
   {id:'flail_sweep',n:'Flail Sweep',icon:'⛓️',mp:7,kind:'phys',tgt:'foes',pow:1.2,req:{flag:'greyson_arms'},desc:'Greyson\'s flail sweeps every enemy. Given in the Prologue; she may not use it until the major battle.'},
   {id:'crossbow_shot',n:'Crossbow Shot',icon:'🏹',mp:0,kind:'phys',tgt:'foe',pow:1.2,req:{flag:'crossbow'},desc:'The crossbow Levi gave her (Chapter 30). A ranged shot at no cost.'},
  ],
  evo:{ tiers:[
   {id:'oracle',n:'Oracle Guardian',tier:1,group:'path',req:{lvl:35},mult:{mag:1.2,mp:1.25},desc:'More magic and support.',skills:[{id:'oracle_sight',n:'Oracle\'s Sight',icon:'🔮',mp:12,kind:'heal',tgt:'allies',pow:1.1,fx:[{k:'crit',d:2}],desc:'Prophetic light: heals the party and sharpens their aim.'}]},
   {id:'saint',n:'Eclipse Saint',tier:1,group:'path',req:{lvl:35},mult:{atk:1.25,spd:1.1},desc:'Pure combat: whip, bow and blade as one.',skills:[{id:'saint_edge',n:'Eclipse Edge',icon:'⚔️',mp:12,kind:'phys',tgt:'foe',pow:2.8,desc:'A flawless, devastating cut.'}]},
   {id:'destiny',n:'Destiny Awakening',tier:2,group:'final',requiresAny:['oracle','saint'],req:{lvl:80},mult:{hp:1.2,mp:1.2,atk:1.15,mag:1.15,def:1.15,spd:1.1},desc:'Final legendary path.',skills:[{id:'destiny_unbound',n:'Destiny Unbound',icon:'🌅',mp:25,kind:'magic',tgt:'foes',pow:2.6,desc:'The full strength of the golden blood.'}]},
  ]},
  bond:null },
 chad:{
  n:'Roc Chadwick', icon:'⚔️', cls:'Martial Fighter', role:'Physical DPS', combat:'Physical Attack',
  identity:'Instinctive fighter. Aggressive close-range burst.',
  style:['Sword','Martial techniques','Speed'], strength:'High burst damage',
  weapon:'Martial Sword', signature:'Dragon Instinct',
  sigDesc:'Increases attack power and enhances physical ability.',
  base:{hp:85,mp:18,atk:15,mag:4,def:8,spd:12}, grow:{hp:9,mp:1.8,atk:2.2,mag:.5,def:1,spd:1.1},
  skills:[
   {id:'whirlwind',n:'Whirlwind Strike',icon:'🌀',mp:6,kind:'phys',tgt:'foes',pow:1.1,req:{lvl:1},desc:'Spinning slash hitting all enemies.'},
   {id:'burst_step',n:'Burst Step',icon:'💨',mp:5,kind:'phys',tgt:'foe',pow:2.0,req:{lvl:4},desc:'A lunging, high-burst strike.'},
   {id:'royal_blood',n:'Royal Blood',icon:'👑',mp:6,kind:'support',tgt:'self',fx:[{k:'buff',stat:'atk',m:1.3,d:3}],req:{lvl:8},desc:'Royal pride: ATK up.'},
   {id:'dragon_instinct',n:'Dragon Instinct',icon:'🐉',mp:8,kind:'support',tgt:'self',fx:[{k:'buff',stat:'atk',m:1.4,d:3},{k:'buff',stat:'spd',m:1.2,d:3}],req:{lvl:12},sig:true,desc:'SIGNATURE. ATK +40%, SPD +20% for 3 turns.'},
   {id:'acupoint_lock',n:'Acupoint Lock',icon:'🖐️',mp:6,kind:'phys',tgt:'foe',pow:.9,fx:[{k:'bind',d:2}],req:{lvl:6},desc:'Locks the foe\'s acupoints (as he did to Jade in chapter 3): it loses its turns.'},
   {id:'qi_draw',n:'Qi Draw',icon:'🌬️',mp:7,kind:'support',tgt:'ally',fx:[{k:'cleanse'},{k:'regen',v:.06,d:3}],req:{lvl:10},desc:'Draws poison and drugs out with his internal energy (chapter 13) and steadies the ally.'},
   {id:'dark_flame',n:'Dark Flame',icon:'🔥',mp:12,kind:'magic',tgt:'foes',pow:1.8,fx:[{k:'burn',d:3}],req:{flag:'chad_dark_arts'},desc:'Black fire. Only after he begins to learn the dark arts (later chapter).'},
  ],
  evo:{ tiers:[
   {id:'dragon_warrior',n:'Dragon Warrior',tier:1,group:'route',req:{lvl:40},mult:{atk:1.2,def:1.15,hp:1.1},desc:'Honour-based fighter.',skills:[{id:'honour_strike',n:'Honour Strike',icon:'🏯',mp:12,kind:'phys',tgt:'foe',pow:2.7,fx:[{k:'buff',stat:'def',m:1.3,d:2,self:true}],desc:'A clean, honourable blow that steels his guard.'}]},
   {id:'fallen_knight',n:'Fallen Dragon Knight',tier:1,group:'route',req:{lvl:40},mult:{atk:1.3,spd:1.1,def:.95},desc:'Darker route: ruthless martial power.',skills:[{id:'ruthless_edge',n:'Ruthless Edge',icon:'🗡️',mp:12,kind:'phys',tgt:'foe',pow:3.1,desc:'A merciless, flawless cut.'}]},
  ]},
  bond:{id:'crossed_blades',n:'Crossed Blades',icon:'⚔️',mp:10,kind:'phys',tgt:'foe',pow:2.4,pair:true,req:{bond:3},desc:'BOND. Chad and Jade strike as one.'} },
 sky:{
  n:'Sky Yale', icon:'🌿', cls:'Mystic Martialist', role:'Support / Hybrid', combat:'Healing / Support',
  identity:'Internal energy, healing, spiritual arts. Party sustain.',
  style:['Internal energy','Defensive techniques','Healing'], strength:'Party sustain',
  weapon:'Spirit Staff', signature:'Spirit Flow',
  sigDesc:'Healing, purification and energy barriers.',
  base:{hp:70,mp:40,atk:7,mag:13,def:9,spd:9}, grow:{hp:7,mp:4,atk:.9,mag:1.9,def:1.2,spd:.8},
  skills:[
   {id:'healing_arts',n:'Healing Arts',icon:'💚',mp:6,kind:'heal',tgt:'ally',pow:2.2,req:{lvl:1},desc:'Restores an ally\'s HP.'},
   {id:'palm_strike',n:'Palm Strike',icon:'🖐️',mp:3,kind:'phys',tgt:'foe',pow:1.3,req:{lvl:2},desc:'Martial palm infused with inner energy.'},
   {id:'purification',n:'Purification',icon:'🕊️',mp:6,kind:'heal',tgt:'ally',pow:1.0,fx:[{k:'cleanse'}],req:{lvl:5},desc:'Cleanses ailments and heals a little.'},
   {id:'protective_barrier',n:'Protective Barrier',icon:'🔰',mp:8,kind:'support',tgt:'ally',fx:[{k:'shield',v:.3,d:4}],req:{lvl:8},desc:'An energy barrier absorbing damage.'},
   {id:'spirit_flow',n:'Spirit Flow',icon:'🌊',mp:12,kind:'heal',tgt:'allies',pow:.6,fx:[{k:'regen',v:.08,d:3}],req:{lvl:12},sig:true,desc:'SIGNATURE. Heals the party and gives regeneration for 3 turns.'},
  ],
  evo:{ tiers:[
   {id:'spirit_sage',n:'Spirit Sage',tier:1,group:'path',req:{lvl:40},mult:{mag:1.25,mp:1.3,hp:1.1},desc:'Advanced cultivation; powerful support magic.',skills:[
     {id:'sage_renewal',n:'Sage\'s Renewal',icon:'🌸',mp:20,kind:'heal',tgt:'allies',pow:1.6,fx:[{k:'cleanse'}],desc:'Heals and cleanses the whole party.'},
     {id:'spirit_recall',n:'Spirit Recall',icon:'💫',mp:25,kind:'heal',tgt:'allyDown',pow:1.2,fx:[{k:'revive'}],once:true,desc:'Calls a fallen ally back. Once per battle.'}]},
  ]},
  bond:{id:'spirit_link',n:'Spirit Link',icon:'💞',mp:12,kind:'heal',tgt:'allies',pow:1.0,fx:[{k:'buff',stat:'def',m:1.25,d:3}],pair:true,req:{bond:3},desc:'BOND. Sky channels spirit energy through Jade\'s Destiny Link.'} },
 sally:{
  n:'Sally', icon:'🌹', cls:'Shadow Dancer', role:'Rogue / Utility', combat:'Control / Utility',
  identity:'Information, charm and deception. A fallen princess who listens, gathers secrets and waits for her revenge. She does not fight in the comic: she controls the room.',
  style:['Information','Charm','Deception'], strength:'Control and intelligence',
  weapon:'Silk Fan', signature:'Mirage Veil',
  sigDesc:'Illusions, evasion and distraction through charm and misdirection.',
  base:{hp:62,mp:34,atk:10,mag:11,def:6,spd:15}, grow:{hp:6,mp:3,atk:1.3,mag:1.4,def:.7,spd:1.5},
  skills:[
   {id:'illusion_dance',n:'Silken Illusion',icon:'🪞',mp:6,kind:'magic',tgt:'foe',pow:1.2,fx:[{k:'slow',d:2}],req:{lvl:1},desc:'A dizzying illusion. Damages and slows.'},
   {id:'gather_intel',n:'Gather Intel',icon:'👂',mp:3,kind:'support',tgt:'foe',fx:[{k:'analyze'},{k:'buff',stat:'def',m:.85,d:3}],req:{lvl:2},desc:'She listens and learns: reveals the foe and lowers its DEF.'},
   {id:'shadow_step',n:'Hidden Pin',icon:'📍',mp:4,kind:'phys',tgt:'foe',pow:1.6,req:{lvl:3},desc:'A quick, precise strike with a hidden hairpin.'},
   {id:'charm_whisper',n:'Charm Whisper',icon:'💋',mp:7,kind:'support',tgt:'foe',fx:[{k:'charm',d:2}],req:{lvl:6},desc:'Charms an enemy so it loses its turn.'},
   {id:'smoke_veil',n:'Smoke Veil',icon:'🌫️',mp:9,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'eva',m:1.3,d:3}],req:{lvl:9},desc:'Party evasion up.'},
   {id:'noble_grace',n:'Noble Grace',icon:'👑',mp:12,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'def',m:1.2,d:3},{k:'buff',stat:'eva',m:1.25,d:3},{k:'regen',v:.05,d:3}],req:{flag:'sally_noble'},desc:'Her new noble title (chapter 51): composure and command. Party DEF and evasion up, with light regeneration.'},
   {id:'mirage_dance',n:'Mirage Veil',icon:'🪞',mp:14,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'eva',m:1.6,d:3},{k:'charm',d:1,all:true}],req:{lvl:13},sig:true,desc:'SIGNATURE. Charm and misdirection: party evasion greatly up and foes are bewildered.'},
  ],
  evo:{ tiers:[
   {id:'phantom',n:'Phantom Enchantress',tier:1,group:'path',req:{lvl:40},mult:{mag:1.3,spd:1.15},desc:'Stronger illusions; magical manipulation.',skills:[{id:'phantom_mirage',n:'Phantom Mirage',icon:'👻',mp:20,kind:'magic',tgt:'foes',pow:1.7,fx:[{k:'charm',d:1,all:true}],desc:'A phantom illusion damaging and bewildering all foes.'}]},
  ]},
  bond:{id:'mirage_strike',n:'Mirage Strike',icon:'🪞',mp:10,kind:'phys',tgt:'foe',pow:2.1,pair:true,fx:[{k:'slow',d:2}],req:{bond:3},desc:'BOND. Sally\'s misdirection and Jade\'s strike land together.'} },
 levi:{
  n:'Levi Stanson', icon:'🏹', cls:'Shadow Archer', role:'Ranged DPS / Scout', combat:'Ranged Physical DPS',
  identity:'A scarred shadow operative who moves unseen and strikes from afar. (He gives Jade his crossbow in chapter 30.)',
  style:['Bow','Stealth','Reconnaissance'], strength:'Precision and stealth',
  weapon:'Longbow', signature:'Hero of the Night',
  sigDesc:'Vanishes into the dark: evasion and guaranteed crits. His trick arrows pin, slow, bind, chain and silence.',
  base:{hp:66,mp:28,atk:14,mag:9,def:7,spd:11}, grow:{hp:6,mp:2.5,atk:2,mag:1.2,def:.8,spd:1.1},
  skills:[
   {id:'flame_bolt',n:'Poisoned Arrow',icon:'🧪',mp:4,kind:'phys',tgt:'foe',pow:1.5,fx:[{k:'burn',d:3}],req:{lvl:1},desc:'A poisoned tip: damage over time.'},
   {id:'frost_bolt',n:'Pinning Arrow',icon:'📌',mp:4,kind:'phys',tgt:'foe',pow:1.4,fx:[{k:'slow',d:3}],req:{lvl:3},desc:'Pins a limb: slows the target.'},
   {id:'lightning_bolt',n:'Ricochet Shot',icon:'↩️',mp:7,kind:'phys',tgt:'chain',pow:1.3,req:{lvl:6},desc:'Ricochets between up to 3 enemies.'},
   {id:'binding_bolt',n:'Net Arrow',icon:'🕸️',mp:6,kind:'phys',tgt:'foe',pow:1.0,fx:[{k:'bind',d:2}],req:{lvl:9},desc:'Restricts movement: the target loses its turns.'},
   {id:'spirit_bolt',n:'Silencing Arrow',icon:'🤫',mp:6,kind:'phys',tgt:'foe',pow:1.5,fx:[{k:'silence',d:2}],antiMagic:2.0,req:{lvl:12},desc:'Double damage to magical enemies, and silences them.'},
   {id:'hero_of_night',n:'Hero of the Night',icon:'🌑',mp:8,kind:'support',tgt:'self',fx:[{k:'buff',stat:'eva',m:1.6,d:3},{k:'crit',d:2}],req:{lvl:15},sig:true,desc:'SIGNATURE. He melts into the dark: evasion up and guaranteed crits.'},
  ],
  evo:{ tiers:[
   {id:'royal_marksman',n:'Royal Marksman',tier:1,group:'path',req:{lvl:40},mult:{atk:1.3,spd:1.1},desc:'Pure accuracy.',skills:[{id:'perfect_shot',n:'Perfect Shot',icon:'🎯',mp:12,kind:'phys',tgt:'foe',pow:3.0,crit:true,desc:'One flawless, guaranteed-critical shot.'}]},
   {id:'arcane_ranger',n:'Night Stalker',tier:1,group:'path',req:{lvl:40},mult:{spd:1.25,hp:1.1},desc:'Shadow operations and trick arrows.',skills:[{id:'arcane_volley',n:'Trick Volley',icon:'🌈',mp:16,kind:'phys',tgt:'foes',pow:1.5,fx:[{k:'burn',d:2},{k:'slow',d:2}],desc:'A volley of poisoned and pinning arrows.'}]},
   {id:'celestial_archer',n:'Phantom Archer',tier:1,group:'path',req:{lvl:70},mult:{atk:1.2,spd:1.2,hp:1.1},desc:'Legendary unseen marksman.',skills:[{id:'starfall',n:'Hundred Arrows',icon:'🌠',mp:24,kind:'phys',tgt:'foes',pow:2.4,desc:'A hundred arrows from nowhere.'}]},
  ]},
  bond:{id:'crossfire',n:'Crossfire',icon:'🎯',mp:10,kind:'phys',tgt:'chain',pow:1.5,pair:true,req:{bond:3},desc:'BOND. Levi\'s bow and Jade\'s shot fire together.'} },
 devon:{
  n:'Devon Chadstone', icon:'🐉', cls:'Dragon Scholar', role:'Defensive Mage / Swordsman Hybrid', combat:'Defensive Magic Melee',
  identity:'A cold, regal prince and scholar who commands a room, shelters those under his care and reads weakness before he strikes. Keeper of the Black Pearl.',
  style:['Sword and spell','Command','Wards and analysis'], strength:'Defence, command and versatility',
  weapon:'Scholar Blade', signature:'Black Pearl Resonance',
  sigDesc:'The Black Pearl answers him: it cleanses the party and empowers their strength and magic. His field ability, Ancient Dragon Knowledge, identifies artefacts and reads sealed wards. The full Dragon Manifestation is a later evolution.',
  base:{hp:80,mp:38,atk:11,mag:13,def:11,spd:8}, grow:{hp:8.5,mp:3.8,atk:1.4,mag:1.8,def:1.4,spd:.8},
  fieldAbility:'ancient_knowledge',
  skills:[
   {id:'scholar_blade',n:'Veiled Blade',icon:'🗡️',mp:4,kind:'phys',tgt:'foe',pow:1.5,fx:[{k:'slow',d:1}],req:{lvl:1},desc:'A cold, precise sword-and-spell strike that slows the foe.'},
   {id:'analyze',n:'Scholar\'s Read',icon:'🔍',mp:3,kind:'support',tgt:'foe',fx:[{k:'analyze'},{k:'buff',stat:'def',m:.8,d:3}],req:{lvl:2},desc:'Reads the enemy like a scroll: reveals it and lowers its DEF.'},
   {id:'royal_command',n:'Royal Command',icon:'👑',mp:7,kind:'support',tgt:'ally',fx:[{k:'buff',stat:'atk',m:1.25,d:3},{k:'buff',stat:'spd',m:1.2,d:3}],req:{lvl:4},desc:'An order no one questions: an ally\'s ATK and SPD rise for 3 turns.'},
   {id:'dragon_veil',n:'Dragon Veil',icon:'🛡️',mp:12,kind:'support',tgt:'allies',fx:[{k:'shield',v:.18,d:3},{k:'buff',stat:'eva',m:1.25,d:3}],req:{lvl:7},desc:'A veil of dragon scale light: a barrier and evasion for the whole party.'},
   {id:'protective_oath',n:'Protective Oath',icon:'🤝',mp:10,kind:'support',tgt:'self',fx:[{k:'buff',stat:'def',m:1.5,d:3},{k:'shield',v:.25,d:3},{k:'oath',d:3}],req:{lvl:10},desc:'He swears to stand between the party and harm for 3 turns: foes target only him, and he strikes back when hit. DEF up and a barrier.'},
   {id:'dragon_flame',n:'Dragon Flame',icon:'🔥',mp:8,kind:'magic',tgt:'foe',pow:2.1,elem:'fire',fx:[{k:'burn',d:2}],req:{lvl:13},desc:'Royal dragon fire, used sparingly.'},
   {id:'black_pearl_resonance',n:'Black Pearl Resonance',icon:'🔮',mp:16,kind:'support',tgt:'allies',pow:.6,fx:[{k:'cleanse'},{k:'buff',stat:'atk',m:1.2,d:3},{k:'buff',stat:'mag',m:1.25,d:3},{k:'regen',v:.05,d:3},{k:'mp',v:.2}],req:{lvl:14},sig:true,desc:'SIGNATURE. The Black Pearl answers: cleanses the party, raises ATK and MAG, restores 20% MP and mends them over 3 turns.'},
   {id:'dragon_empower',n:'Dragon Empowerment',icon:'💎',mp:9,kind:'support',tgt:'ally',fx:[{k:'buff',stat:'atk',m:1.25,d:3},{k:'buff',stat:'mag',m:1.25,d:3},{k:'buff',stat:'def',m:1.25,d:3}],req:{lvl:18},desc:'The Pearl strengthens an ally\'s ATK, MAG and DEF.'},
  ],
  evo:{ tiers:[
   {id:'dragon_sage',n:'Pearl Sage',tier:1,group:'line',req:{lvl:40},mult:{mag:1.2,def:1.2,mp:1.3},desc:'Ancient wards and Black Pearl mastery: defence and support.',skills:[{id:'pearl_ward',n:'Pearl Ward',icon:'🌐',mp:20,kind:'support',tgt:'allies',fx:[{k:'shield',v:.3,d:4},{k:'cleanse'}],desc:'A great ward: a heavy barrier and a cleanse for the whole party.'}]},
   {id:'dragon_sovereign',n:'Dragon Sovereign',tier:2,group:'line',requiresAny:['dragon_sage'],req:{lvl:80},mult:{hp:1.2,mp:1.2,atk:1.2,mag:1.2,def:1.2,spd:1.1},desc:'Complete dragon bloodline awakening.',skills:[{id:'dragon_manifest',n:'Dragon Manifestation',icon:'🐲',mp:16,kind:'support',tgt:'self',once:true,fx:[{k:'state',id:'manifest',d:4}],desc:'Temporary dragon form: stronger melee, dragon magic and resistance. Once per battle.'},{id:'sovereign_roar',n:'Sovereign\'s Roar',icon:'👑',mp:28,kind:'magic',tgt:'foes',pow:2.9,fx:[{k:'slow',d:2}],desc:'The dragon bloodline fully unleashed.'}]},
  ]},
  bond:{id:'dragon_destiny',n:'Dragon Destiny',icon:'🌅',mp:14,kind:'magic',tgt:'foes',pow:2.0,pair:true,req:{bond:3},desc:'BOND. Devon and Jade combine the Black Pearl and the golden blood.'} },
 ripley:{
  n:'Ripley', icon:'🎯', cls:'Court Archer', role:'Ranged DPS / Scout', combat:'Ranged Physical DPS',
  identity:'Jade\'s handmaiden in Dragonvale, assigned by Chad. Her loyalty lies with Prince Devon. A quiet, precise archer and scout.',
  style:['Bow','Scouting','Support'], strength:'Precision and awareness',
  weapon:'Court Bow', signature:'Watcher\'s Mark',
  sigDesc:'Marks a foe: it takes more damage and its weaknesses are revealed. (Ripley is not an arcane archer: no magical bolts.)',
  base:{hp:64,mp:26,atk:14,mag:5,def:7,spd:13}, grow:{hp:6,mp:2,atk:2.1,mag:.6,def:.8,spd:1.3},
  skills:[
   {id:'quick_shot',n:'Quick Shot',icon:'🏹',mp:0,kind:'phys',tgt:'foe',pow:1.2,req:{lvl:1},desc:'A fast, free shot.'},
   {id:'covering_arrow',n:'Covering Arrow',icon:'🎯',mp:4,kind:'phys',tgt:'foe',pow:1.4,fx:[{k:'slow',d:2}],req:{lvl:3},desc:'Pins the target and slows it.'},
   {id:'scouts_eye',n:'Scout\'s Eye',icon:'👁️',mp:5,kind:'support',tgt:'foe',fx:[{k:'analyze'},{k:'buff',stat:'def',m:.85,d:3}],req:{lvl:6},desc:'Reads the enemy: reveals it and lowers its DEF.'},
   {id:'volley',n:'Palace Volley',icon:'🌧️',mp:9,kind:'phys',tgt:'foes',pow:1.1,req:{lvl:9},desc:'A disciplined volley across the field.'},
   {id:'watchers_mark',n:'Watcher\'s Mark',icon:'🔖',mp:10,kind:'support',tgt:'foe',fx:[{k:'analyze'},{k:'buff',stat:'def',m:.7,d:3}],req:{lvl:12},sig:true,desc:'SIGNATURE. Marks a foe: DEF greatly down and revealed for 3 turns.'},
  ],
  evo:{ tiers:[
   {id:'royal_ranger',n:'Royal Ranger',tier:1,group:'path',req:{lvl:40},mult:{atk:1.25,spd:1.1},desc:'Court-trained precision.',skills:[{id:'royal_volley',n:'Royal Volley',icon:'👑',mp:16,kind:'phys',tgt:'foes',pow:1.8,desc:'A flawless volley.'}]},
   {id:'silent_hawk',n:'Silent Hawk',tier:1,group:'path',req:{lvl:40},mult:{spd:1.2,hp:1.1},desc:'Scouting and ambush.',skills:[{id:'hawk_strike',n:'Hawk Strike',icon:'🦅',mp:12,kind:'phys',tgt:'foe',pow:3.0,crit:true,desc:'A guaranteed critical shot from the shadows.'}]},
  ]},
  bond:null },
 princess:{
  n:'Foreign Princess', icon:'🎭', cls:'(class to be designed)', role:'TBD', combat:'TBD',
  identity:'Final name and class still to be decided.', style:[], strength:'-', weapon:'-', signature:'-', sigDesc:'',
  base:{hp:60,mp:25,atk:11,mag:8,def:8,spd:13}, grow:{hp:6,mp:2.5,atk:1.5,mag:1,def:.9,spd:1.2},
  skills:[{id:'princess_strike',n:'Masked Strike',icon:'🎭',mp:0,kind:'phys',tgt:'foe',pow:1.3,req:{lvl:1},desc:'Placeholder.'}], evo:{tiers:[]}, bond:null, placeholder:true }
};
const ROSTER = ['jade','chad','sky','sally','levi','ripley','devon','princess'];
const BOND_LEVELS = [0,20,60,120,200,300];   // cumulative bond points for bond lvl 0..5
