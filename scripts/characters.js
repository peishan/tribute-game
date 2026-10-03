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
   {id:'golden_blood',n:'Golden Blood Awakening',icon:'✨',mp:0,kind:'support',tgt:'self',once:true,fx:[{k:'state',id:'awakened',d:4}],req:{lvl:15},sig:true,desc:'SIGNATURE. All stats +25% and skills cost half for 4 turns. Once per battle.'},
   {id:'hidden_dagger',n:'Hidden Dagger',icon:'🗡️',mp:4,kind:'phys',tgt:'foe',pow:1.9,req:{flag:'greyson_arms'},desc:'Greyson\'s dagger: a quick, close strike. Given in the Prologue; she may not use it until the major battle.'},
   {id:'flail_sweep',n:'Flail Sweep',icon:'⛓️',mp:7,kind:'phys',tgt:'foes',pow:1.2,req:{flag:'greyson_arms'},desc:'Greyson\'s flail sweeps every enemy. Given in the Prologue; she may not use it until the major battle.'},
   {id:'crossbow_shot',n:'Crossbow Shot',icon:'🏹',mp:0,kind:'phys',tgt:'foe',pow:1.2,req:{flag:'crossbow'},desc:'Levi\'s Enchanted Crossbow (Chapter 30). A ranged shot at no cost.'},
  ],
  evo:{ tiers:[
   {id:'oracle',n:'Oracle Guardian',tier:1,group:'path',req:{lvl:35},mult:{mag:1.2,mp:1.25},desc:'More magic and support.',skills:[{id:'oracle_sight',n:'Oracle\'s Sight',icon:'🔮',mp:12,kind:'heal',tgt:'allies',pow:1.1,fx:[{k:'crit',d:2}],desc:'Prophetic light: heals the party and sharpens their aim.'}]},
   {id:'saint',n:'Sword Saint',tier:1,group:'path',req:{lvl:35},mult:{atk:1.25,spd:1.1},desc:'Pure combat.',skills:[{id:'saint_edge',n:'Saint\'s Edge',icon:'⚔️',mp:12,kind:'phys',tgt:'foe',pow:2.8,desc:'A flawless, devastating cut.'}]},
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
  ],
  evo:{ tiers:[
   {id:'dragon_warrior',n:'Dragon Warrior',tier:1,group:'route',req:{lvl:40},mult:{atk:1.2,def:1.15,hp:1.1},desc:'Honour-based fighter.',skills:[{id:'honour_strike',n:'Honour Strike',icon:'🏯',mp:12,kind:'phys',tgt:'foe',pow:2.7,fx:[{k:'buff',stat:'def',m:1.3,d:2,self:true}],desc:'A clean, honourable blow that steels his guard.'}]},
   {id:'fallen_knight',n:'Fallen Dragon Knight',tier:1,group:'route',req:{lvl:40},mult:{atk:1.3,spd:1.1,def:.95},desc:'Darker route.',skills:[{id:'dark_flame',n:'Dark Flame',icon:'🔥',mp:12,kind:'magic',tgt:'foes',pow:1.8,fx:[{k:'burn',d:3}],desc:'Black fire that scorches all enemies.'}]},
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
  identity:'Deception, charm and mobility. Battlefield control.',
  style:['Agility','Deception','Charm techniques'], strength:'Control enemies',
  weapon:'Veiled Fans', signature:'Mirage Dance',
  sigDesc:'Illusions, evasion and distraction.',
  base:{hp:62,mp:34,atk:10,mag:11,def:6,spd:15}, grow:{hp:6,mp:3,atk:1.3,mag:1.4,def:.7,spd:1.5},
  skills:[
   {id:'illusion_dance',n:'Illusion Dance',icon:'💃',mp:6,kind:'magic',tgt:'foe',pow:1.2,fx:[{k:'slow',d:2}],req:{lvl:1},desc:'A dizzying dance. Damages and slows.'},
   {id:'shadow_step',n:'Shadow Step',icon:'🌑',mp:4,kind:'phys',tgt:'foe',pow:1.6,req:{lvl:3},desc:'Fast, precise strike from the shadows.'},
   {id:'charm_whisper',n:'Charm Whisper',icon:'💋',mp:7,kind:'support',tgt:'foe',fx:[{k:'charm',d:2}],req:{lvl:6},desc:'Charms an enemy so it loses its turn.'},
   {id:'smoke_veil',n:'Smoke Veil',icon:'🌫️',mp:9,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'eva',m:1.3,d:3}],req:{lvl:9},desc:'Party evasion up.'},
   {id:'mirage_dance',n:'Mirage Dance',icon:'🪞',mp:14,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'eva',m:1.6,d:3},{k:'charm',d:1,all:true}],req:{lvl:13},sig:true,desc:'SIGNATURE. Illusions: party evasion greatly up and foes are bewildered.'},
  ],
  evo:{ tiers:[
   {id:'phantom',n:'Phantom Enchantress',tier:1,group:'path',req:{lvl:40},mult:{mag:1.3,spd:1.15},desc:'Stronger illusions; magical manipulation.',skills:[{id:'phantom_mirage',n:'Phantom Mirage',icon:'👻',mp:20,kind:'magic',tgt:'foes',pow:1.7,fx:[{k:'charm',d:1,all:true}],desc:'A phantom illusion damaging and bewildering all foes.'}]},
  ]},
  bond:{id:'mirage_strike',n:'Mirage Strike',icon:'🪞',mp:10,kind:'phys',tgt:'foe',pow:2.1,pair:true,fx:[{k:'slow',d:2}],req:{bond:3},desc:'BOND. Sally\'s illusion and Jade\'s blade strike together.'} },
 levi:{
  n:'Levi Stanson', icon:'🏹', cls:'Arcane Archer', role:'Ranged DPS', combat:'Ranged Magic DPS',
  identity:'Precision. Crossbow and magical bolts.',
  style:['Crossbow','Magical bolts'], strength:'Precision',
  weapon:'Enchanted Crossbow', signature:'Magical Bolts',
  sigDesc:'Five bolt types: Flame, Frost, Lightning, Binding and Spirit.',
  base:{hp:66,mp:28,atk:14,mag:9,def:7,spd:11}, grow:{hp:6,mp:2.5,atk:2,mag:1.2,def:.8,spd:1.1},
  skills:[
   {id:'flame_bolt',n:'Flame Bolt',icon:'🔥',mp:4,kind:'phys',tgt:'foe',pow:1.5,elem:'fire',fx:[{k:'burn',d:3}],req:{lvl:1},desc:'Burn damage over time.'},
   {id:'frost_bolt',n:'Frost Bolt',icon:'❄️',mp:4,kind:'phys',tgt:'foe',pow:1.4,elem:'ice',fx:[{k:'slow',d:3}],req:{lvl:3},desc:'Slows the target.'},
   {id:'lightning_bolt',n:'Lightning Bolt',icon:'⚡',mp:7,kind:'phys',tgt:'chain',pow:1.3,elem:'lightning',req:{lvl:6},desc:'Chains between up to 3 enemies.'},
   {id:'binding_bolt',n:'Binding Bolt',icon:'🌿',mp:6,kind:'phys',tgt:'foe',pow:1.0,fx:[{k:'bind',d:2}],req:{lvl:9},desc:'Restricts movement: the target loses its turns.'},
   {id:'spirit_bolt',n:'Spirit Bolt',icon:'✨',mp:6,kind:'phys',tgt:'foe',pow:1.5,fx:[{k:'silence',d:2}],antiMagic:2.0,req:{lvl:12},desc:'Anti-magic: double damage to magical enemies and silences them.'},
  ],
  evo:{ tiers:[
   {id:'royal_marksman',n:'Royal Marksman',tier:1,group:'path',req:{lvl:40},mult:{atk:1.3,spd:1.1},desc:'Pure accuracy.',skills:[{id:'perfect_shot',n:'Perfect Shot',icon:'🎯',mp:12,kind:'phys',tgt:'foe',pow:3.0,crit:true,desc:'One flawless, guaranteed-critical shot.'}]},
   {id:'arcane_ranger',n:'Arcane Ranger',tier:1,group:'path',req:{lvl:40},mult:{mag:1.3,mp:1.3},desc:'Magical ammunition specialist.',skills:[{id:'arcane_volley',n:'Arcane Volley',icon:'🌈',mp:16,kind:'magic',tgt:'foes',pow:1.5,fx:[{k:'burn',d:2},{k:'slow',d:2}],desc:'A volley of mixed elemental bolts.'}]},
   {id:'celestial_archer',n:'Celestial Archer',tier:1,group:'path',req:{lvl:70},mult:{atk:1.2,mag:1.2,spd:1.15},desc:'Legendary ranged class.',skills:[{id:'starfall',n:'Starfall',icon:'🌠',mp:24,kind:'magic',tgt:'foes',pow:2.4,desc:'Bolts of starlight rain on all enemies.'}]},
  ]},
  bond:{id:'crossfire',n:'Crossfire',icon:'🎯',mp:10,kind:'phys',tgt:'chain',pow:1.5,pair:true,req:{bond:3},desc:'BOND. Levi and Jade fire together.'} },
 devon:{
  n:'Devon Chadstone', icon:'🐉', cls:'Dragon Scholar', role:'Magic + Melee Hybrid', combat:'Magic Melee / Legendary Power',
  identity:'Intellectual warrior. Knowledge, royal magic, Dragon Pearl.',
  style:['Sword and spell','Analysis','Ancient knowledge'], strength:'Versatility; weakness-reading',
  weapon:'Scholar Blade', signature:'Dragon Pearl',
  sigDesc:'Dragon Empowerment, Ancient Dragon Knowledge (field ability: identify artefacts, unlock sealed areas) and Dragon Manifestation.',
  base:{hp:78,mp:38,atk:11,mag:13,def:10,spd:8}, grow:{hp:8,mp:3.8,atk:1.5,mag:1.9,def:1.2,spd:.8},
  fieldAbility:'ancient_knowledge',
  skills:[
   {id:'scholar_blade',n:'Scholar Blade',icon:'📖',mp:4,kind:'phys',tgt:'foe',pow:1.5,req:{lvl:1},desc:'A blade strike that channels a little spell power.'},
   {id:'analyze',n:'Ancient Knowledge',icon:'🔍',mp:3,kind:'support',tgt:'foe',fx:[{k:'analyze'},{k:'buff',stat:'def',m:.8,d:3}],req:{lvl:2},desc:'Analyses an enemy, exposing its weakness (DEF down).'},
   {id:'dragon_flame',n:'Dragon Flame',icon:'🔥',mp:8,kind:'magic',tgt:'foe',pow:2.1,elem:'fire',fx:[{k:'burn',d:2}],req:{lvl:5},desc:'Royal dragon fire.'},
   {id:'dragon_empower',n:'Dragon Empowerment',icon:'💎',mp:9,kind:'support',tgt:'ally',fx:[{k:'buff',stat:'atk',m:1.25,d:3},{k:'buff',stat:'mag',m:1.25,d:3},{k:'buff',stat:'def',m:1.25,d:3}],req:{lvl:8},desc:'Dragon Pearl: boosts an ally\'s ATK, MAG and DEF.'},
   {id:'dragon_manifest',n:'Dragon Manifestation',icon:'🐲',mp:16,kind:'support',tgt:'self',once:true,fx:[{k:'state',id:'manifest',d:4}],req:{lvl:14},sig:true,desc:'SIGNATURE. Temporary dragon form: stronger melee, dragon magic and resistance. Once per battle.'},
  ],
  evo:{ tiers:[
   {id:'dragon_sage',n:'Dragon Sage',tier:1,group:'line',req:{lvl:40},mult:{mag:1.25,mp:1.3},desc:'Ancient magic; Dragon Pearl mastery.',skills:[{id:'ancient_dragon_spell',n:'Ancient Dragon Spell',icon:'📜',mp:18,kind:'magic',tgt:'foes',pow:2.0,desc:'Forgotten dragon magic.'}]},
   {id:'dragon_sovereign',n:'Dragon Sovereign',tier:2,group:'line',requiresAny:['dragon_sage'],req:{lvl:80},mult:{hp:1.2,mp:1.2,atk:1.2,mag:1.2,def:1.2,spd:1.1},desc:'Complete dragon bloodline awakening.',skills:[{id:'sovereign_roar',n:'Sovereign\'s Roar',icon:'👑',mp:28,kind:'magic',tgt:'foes',pow:2.9,fx:[{k:'slow',d:2}],desc:'The dragon bloodline fully unleashed.'}]},
  ]},
  bond:{id:'dragon_destiny',n:'Dragon Destiny',icon:'🌅',mp:14,kind:'magic',tgt:'foes',pow:2.0,pair:true,req:{bond:3},desc:'BOND. Devon and Jade combine the Dragon Pearl and the golden blood.'} },
 princess:{
  n:'Foreign Princess', icon:'🎭', cls:'(class to be designed)', role:'TBD', combat:'TBD',
  identity:'Final name and class still to be decided.', style:[], strength:'-', weapon:'-', signature:'-', sigDesc:'',
  base:{hp:60,mp:25,atk:11,mag:8,def:8,spd:13}, grow:{hp:6,mp:2.5,atk:1.5,mag:1,def:.9,spd:1.2},
  skills:[{id:'princess_strike',n:'Masked Strike',icon:'🎭',mp:0,kind:'phys',tgt:'foe',pow:1.3,req:{lvl:1},desc:'Placeholder.'}], evo:{tiers:[]}, bond:null, placeholder:true }
};
const ROSTER = ['jade','chad','sky','sally','levi','devon','princess'];
const BOND_LEVELS = [0,20,60,120,200,300];   // cumulative bond points for bond lvl 0..5
