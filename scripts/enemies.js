/* =====================================================================
   TRIBUTE — AREA MONSTERS, BOSSES, ITEMS, LOOT TABLES
   Crimson Tide equivalents: rats / crabs / thieves  ->  Tribute: dock
   pickpockets / bandits / masked assassins (+ demons).
   area: dock | road | city | wild | demon   (route/area design pending)
   moves: {n, pow, steal?, fx?[], spell?}  traits: ['magic'] = hit by Spirit Bolt
   ===================================================================== */
const ENEMIES = {
  dock_pickpocket:{n:'Dock Pickpocket',icon:'🧤',area:'dock',hp:55,atk:9,mag:0,def:4,spd:14,xp:28,gold:14,
    moves:[{n:'Cutpurse Slash',pow:1},{n:'Pocket Lift',pow:.7,steal:true}],drops:[{id:'coin_pouch',chance:.5}],desc:'Quick fingers, quicker feet. Lifts coin in the crowd.'},
  dock_thug:{n:'Dockside Thug',icon:'🪝',area:'dock',hp:90,atk:12,mag:0,def:7,spd:7,xp:36,gold:18,
    moves:[{n:'Hook Swing',pow:1.1},{n:'Shoulder Charge',pow:1.3}],drops:[{id:'rope_coil',chance:.4}],desc:'Hired muscle from the harbour warehouses.'},
  smuggler:{n:'Harbour Smuggler',icon:'📦',area:'dock',hp:75,atk:10,mag:0,def:6,spd:10,xp:32,gold:22,
    moves:[{n:'Dagger Jab',pow:1},{n:'Smoke Pellet',pow:.5,fx:[{k:'slow',d:2}]}],drops:[{id:'contraband',chance:.35}],desc:'Moves goods the crown would rather not see.'},
  road_bandit:{n:'Road Bandit',icon:'🗡️',area:'road',hp:85,atk:13,mag:0,def:6,spd:9,xp:34,gold:20,
    moves:[{n:'Rusty Blade',pow:1},{n:'Ambush Strike',pow:1.5}],drops:[{id:'bandit_sash',chance:.4}],desc:'Waits where the road narrows.'},
  bandit_archer:{n:'Bandit Archer',icon:'🏹',area:'road',hp:65,atk:14,mag:0,def:4,spd:11,xp:34,gold:20,
    moves:[{n:'Quick Shot',pow:1},{n:'Pinning Arrow',pow:.8,fx:[{k:'slow',d:2}]}],drops:[{id:'arrow_bundle',chance:.45}],desc:'Picks off travellers from the ridge.'},
  masked_assassin:{n:'Masked Assassin',icon:'🥷',area:'city',hp:110,atk:17,mag:0,def:8,spd:17,xp:70,gold:45,elite:true,
    moves:[{n:'Venom Blade',pow:1.2,fx:[{k:'burn',d:3}]},{n:'Throat Cut',pow:1.9},{n:'Vanish Strike',pow:1.4}],drops:[{id:'assassin_mask',chance:.35},{id:'venom_vial',chance:.4}],desc:'Hired to make people disappear.'},
  shade_beast:{n:'Shade Beast',icon:'🐺',area:'dragon',hp:120,atk:14,mag:10,def:8,spd:12,xp:50,gold:26,traits:['corrupt'],
    moves:[{n:'Shadow Rend',pow:1.3},{n:'Dark Howl',pow:.9,spell:true,all:true,fx:[{k:'slow',d:2}]}],drops:[{id:'demon_ash',chance:.45}],desc:'A spirit beast corrupted by something beneath the ruins.'},
  imp:{n:'Imp',icon:'👺',area:'demon',hp:60,atk:10,mag:11,def:5,spd:13,xp:32,gold:15,traits:['magic'],
    moves:[{n:'Claw',pow:1},{n:'Hex Spark',pow:1.2,spell:true}],drops:[{id:'demon_ash',chance:.5}],desc:'A lesser demon from the cursed isle.'},
  shade_wraith:{n:'Shade Wraith',icon:'👻',area:'demon',hp:95,atk:8,mag:15,def:6,spd:12,xp:48,gold:26,traits:['magic'],
    moves:[{n:'Chilling Touch',pow:1,spell:true},{n:'Wail',pow:.9,spell:true,fx:[{k:'slow',d:2}]}],drops:[{id:'demon_ash',chance:.6},{id:'shade_essence',chance:.25}],desc:'A restless spirit bound to the curse.'},
  chad_trial:{n:'Roc Chadwick (trial)',icon:'⚔️',area:'trial',hp:170,atk:15,mag:0,def:7,spd:12,xp:60,gold:0,
    moves:[{n:'Instinct Strike',pow:1.1},{n:'Burst Step',pow:1.6},{n:'Guard Break',pow:1,fx:[{k:'slow',d:1}]}],drops:[],desc:'A sparring match. Instinct against discipline.'},
  training_dummy:{n:'Training Dummy',icon:'🪵',area:'trial',hp:60,atk:4,mag:0,def:3,spd:4,xp:20,gold:0,
    moves:[{n:'Swing',pow:.6}],drops:[],desc:'Imperial Guard sparring dummy for the combat tutorial.'},
  booyeong_guard:{n:'Booyeong\'s Guard',icon:'🗡️',area:'cliff',hp:80,atk:13,mag:0,def:6,spd:9,xp:36,gold:20,
    moves:[{n:'Cutlass',pow:1},{n:'Shield Bash',pow:.8,fx:[{k:'slow',d:1}]}],drops:[{id:'coin_pouch',chance:.4}],desc:'One of Booyeong\'s bandits.'},
  inn_thug:{n:'Inn Hand',icon:'🪝',area:'inn',hp:70,atk:11,mag:0,def:5,spd:8,xp:30,gold:12,
    moves:[{n:'Club',pow:1},{n:'Grab',pow:.7,fx:[{k:'slow',d:1}]}],drops:[],desc:'An employee of the dark inn, armed with a club.'},
  bearded_mouse:{n:'Bearded Mouse',icon:'🧔',area:'cliff',elite:true,hp:140,atk:15,mag:0,def:8,spd:9,xp:60,gold:40,
    moves:[{n:'Cudgel',pow:1.2},{n:'Dirty Trick',pow:.8,fx:[{k:'slow',d:2}]}],drops:[{id:'coin_pouch',chance:.5},{id:'mouse_charm',chance:.3}],desc:'Booyeong\'s bearded lieutenant, who flees at the sight of Jade.'},
  xima_minion:{n:'Xima Minion',icon:'👹',area:'demon',hp:90,atk:13,mag:8,def:6,spd:11,xp:44,gold:20,traits:['magic'],
    moves:[{n:'Shadow Claw',pow:1.1},{n:'Corrupting Touch',pow:.9,spell:true,fx:[{k:'slow',d:2}]}],drops:[{id:'demon_ash',chance:.5},{id:'minion_sigil',chance:.08}],desc:'Shadowy demonic scouts marked with Xima\'s sigil.'},
  corrupted_villager:{n:'Corrupted Villager',icon:'🧟',area:'village',hp:80,atk:10,mag:6,def:4,spd:8,xp:30,gold:0,traits:['corrupt'],
    moves:[{n:'Clawing Grasp',pow:1},{n:'Hollow Whisper',pow:.7,spell:true,fx:[{k:'slow',d:1}]}],drops:[],desc:'A villager taken by Xima: alive but changed. Not an enemy to kill. Jade\'s Cleansing Touch frees them.'},
  crimson_cultist:{n:'Crimson Cultist',icon:'🕯️',area:'cult',hp:100,atk:12,mag:14,def:6,spd:11,xp:52,gold:26,traits:['magic'],
    moves:[{n:'Blood Chant',pow:1.1,spell:true},{n:'Lantern Hex',pow:.8,spell:true,fx:[{k:'slow',d:2}]},{n:'Ritual Knife',pow:1}],drops:[{id:'cultist_robe',chance:.12},{id:'xima_shard',chance:.1}],desc:'A black-robed follower of Xima who keeps the offering rites.'},
  veil_stalker:{n:'Veil Stalker',icon:'🐺',area:'cult',hp:95,atk:17,mag:6,def:5,spd:17,xp:50,gold:14,
    moves:[{n:'Shadow Pounce',pow:1.4},{n:'Rend',pow:1,fx:[{k:'burn',d:3}]}],drops:[{id:'demon_ash',chance:.5}],desc:'A shadow creature stitched from the dark between lantern light, fast and hungry.'},
  offering_lantern:{n:'Offering Lantern',icon:'🏮',area:'cult',hp:70,atk:6,mag:16,def:4,spd:13,xp:46,gold:18,traits:['magic'],
    moves:[{n:'Fear Glow',pow:1,spell:true,fx:[{k:'silence',d:2}]},{n:'Burning Wick',pow:1.2,spell:true,fx:[{k:'burn',d:3}]}],drops:[{id:'demon_ash',chance:.4}],desc:'A paper lantern burning with the fear of every villager who lit one. It floats where fear is thickest.'},
  // ---- placeholder BOSSES (rename per story) ----
  boss_offering_warden:{n:'The Offering Warden',icon:'⛓️',area:'cult',boss:true,hp:900,atk:21,mag:23,def:13,spd:12,xp:480,gold:320,traits:['magic'],
    moves:[{n:'Crimson Chains',pow:1.1,spell:true,fx:[{k:'bind',d:1}]},{n:'Blood Tithe',pow:1.5,spell:true,fx:[{k:'burn',d:3}]},{n:'Moonrise Toll',pow:1.2,spell:true,fx:[{k:'slow',d:2}]},{n:'Altar Slam',pow:1.9}],desc:'The altar\'s bound guardian: a shape of chains and crimson light that wakes at moonrise to collect the offering. Placeholder stats.'},
  boss_booyeong:{n:'Booyeong',icon:'🦂',area:'cliff',boss:true,hp:420,atk:17,mag:4,def:9,spd:11,xp:170,gold:130,
    moves:[{n:'Ransom Blade',pow:1.3},{n:'Cliff Trap',pow:.8,fx:[{k:'slow',d:2}]},{n:'Cruel Strike',pow:1.8}],desc:'Bandit lord who kidnapped Sky and suppresses power in his territory. Placeholder stats.'},
  boss_bandit_chief:{n:'Bandit Chief',icon:'👑',area:'road',boss:true,hp:420,atk:17,mag:0,def:10,spd:10,xp:160,gold:120,
    moves:[{n:'Cleaver Smash',pow:1.4},{n:'War Cry',pow:.6,fx:[{k:'slow',d:2}]},{n:'Brutal Cut',pow:1.9}],desc:'Placeholder boss.'},
  boss_masked_leader:{n:'Masked Leader',icon:'🎭',area:'city',boss:true,hp:520,atk:20,mag:6,def:11,spd:16,xp:220,gold:160,
    moves:[{n:'Venom Blade',pow:1.2,fx:[{k:'burn',d:3}]},{n:'Shadow Flurry',pow:1.8},{n:'Veil Step',pow:1.4}],desc:'Placeholder boss.'},
  boss_guardian_spirit:{n:'Ancient Guardian Spirit',icon:'🗿',area:'dragon',boss:true,hp:560,atk:19,mag:16,def:14,spd:9,xp:260,gold:180,traits:['magic'],
    phases:[{at:.66,msg:'The Guardian\'s stone cracks and spiritual waves roll outward: Devon must hold the line',moves:[{n:'Spirit Wave',pow:1.2,spell:true,all:true,fx:[{k:'slow',d:1}]},{n:'Stone Verdict',pow:1.5}]},{at:.33,msg:'The Guardian\'s core is exposed. It tests them one last time',atk:1.25,moves:[{n:'Stone Verdict',pow:1.7},{n:'Ward Pulse',pow:1.0,spell:true,all:true}]}],
    moves:[{n:'Stone Verdict',pow:1.5},{n:'Spirit Wave',pow:1.1,spell:true,fx:[{k:'slow',d:2}]},{n:'Ward Pulse',pow:.8,spell:true}],drops:[{id:'seal_fragment',chance:1}],desc:'An ancient protector that tests those who come. It is not evil.'},
  boss_spirit_core:{n:'Awakened Spirit Core',icon:'🐉',area:'dragon',boss:true,hp:760,atk:21,mag:20,def:13,spd:10,xp:340,gold:240,traits:['corrupt','magic'],
    phases:[{at:.7,msg:'The seal begins to collapse: corruption floods the chamber',moves:[{n:'Seal Collapse',pow:1.3,spell:true,all:true,fx:[{k:'burn',d:2}]},{n:'Corrupted Surge',pow:1.4,spell:true}],summon:'shade_beast'},{at:.35,msg:'The core burns brighter: it must be broken and purified together',atk:1.3,moves:[{n:'Ancient Fury',pow:1.8},{n:'Seal Collapse',pow:1.2,spell:true,all:true}]}],
    moves:[{n:'Corrupted Surge',pow:1.4,spell:true},{n:'Seal Collapse',pow:1.1,spell:true,fx:[{k:'burn',d:2}]},{n:'Ancient Fury',pow:1.7}],drops:[{id:'seal_fragment',chance:1}],desc:'A corrupted ancient protector. It was never meant to be a villain.'},
  boss_shadow_roc:{n:'The Shadow of Roc',icon:'🌑',area:'dragon',boss:true,hp:800,atk:20,mag:18,def:11,spd:12,xp:420,gold:300,traits:['corrupt','magic'],
    phases:[{at:.6,msg:'The Shadow lifts a broken crown and darkness spreads across the field',moves:[{n:'Royal Ruin',pow:1.6},{n:'Shadow Crown',pow:1.2,spell:true,all:true,fx:[{k:'burn',d:2}]},{n:'Curse of Ambition',pow:1.0,spell:true,fx:[{k:'silence',d:2}]}]},{at:.3,msg:'The Shadow howls: ambition without a master',atk:1.3}],
    moves:[{n:'Royal Ruin',pow:1.6},{n:'Jealous Blade',pow:1.3,fx:[{k:'slow',d:2}]},{n:'Curse of Ambition',pow:1.0,spell:true,fx:[{k:'silence',d:2}]},{n:'Shadow Crown',pow:1.2,spell:true,fx:[{k:'burn',d:2}]}],desc:'A dark knight in a broken version of Roc\'s royal armour, made of his regrets.'},
  boss_shadow_roc_p2:{n:'The Shadow Crown',icon:'👑',area:'dragon',boss:true,hp:520,atk:22,mag:20,def:12,spd:12,xp:360,gold:260,traits:['corrupt','magic'],onlyBy:'chad',offMult:.15,
    moves:[{n:'Royal Ruin',pow:1.6},{n:'Jealous Blade',pow:1.4,fx:[{k:'bind',d:1}]},{n:'Curse of Ambition',pow:1.1,spell:true,fx:[{k:'silence',d:2}]}],desc:'The Shadow\'s crowned second form. Only Roc\'s own blade truly hurts it.'},
  boss_shadow_ambition:{n:'The Shadow of Ambition',icon:'🕷️',area:'dragon',boss:true,hp:1400,atk:25,mag:25,def:13,spd:13,xp:700,gold:500,traits:['corrupt','magic'],
    phases:[{at:.6,msg:'Clones of ambition rise from the dark',summon:'shadow_clone',moves:[{n:'Ruinous Crown',pow:1.7},{n:'Envious Blade',pow:1.4,fx:[{k:'slow',d:2}]},{n:'Hollow Ambition',pow:1.1,spell:true,all:true}]},{at:.3,msg:'Ambition tears itself apart',atk:1.3}],
    moves:[{n:'Ruinous Crown',pow:1.7},{n:'Hollow Ambition',pow:1.2,spell:true,fx:[{k:'silence',d:2}]},{n:'Curse of Ambition',pow:1.2,spell:true,fx:[{k:'burn',d:3}]},{n:'Envious Blade',pow:1.4,fx:[{k:'slow',d:2}]}],desc:'Stronger dark magic, shadow clones and curses: ambition without a master.'},
  boss_forgotten_prince:{n:'The Forgotten Prince',icon:'🥀',area:'dragon',boss:true,hp:2300,atk:30,mag:30,def:15,spd:14,xp:1200,gold:900,traits:['corrupt','magic'],
    phases:[{at:.7,msg:'The Forgotten Prince raises a hollow crown',moves:[{n:'Fallen Crown',pow:1.9},{n:'Endless Regret',pow:1.2,spell:true,all:true,fx:[{k:'bind',d:1}]},{n:'Curse of Ambition',pow:1.3,spell:true,fx:[{k:'burn',d:3}]}]},{at:.4,msg:'A possible future closes in around the party',summon:'shadow_clone',atk:1.2},{at:.2,msg:'The Forgotten Prince will not be forgotten',atk:1.3,shield:.1}],
    moves:[{n:'Fallen Crown',pow:1.9},{n:'Forgotten Verse',pow:1.3,spell:true,fx:[{k:'silence',d:2}]},{n:'Endless Regret',pow:1.3,spell:true,fx:[{k:'bind',d:1}]},{n:'Royal Ruin',pow:1.7},{n:'Curse of Ambition',pow:1.3,spell:true,fx:[{k:'burn',d:3}]}],desc:'A possible future where Roc never accepted himself.'},
  shadow_clone:{n:'Shadow Clone',icon:'👤',area:'dragon',hp:150,atk:15,mag:12,def:7,spd:12,xp:60,gold:30,traits:['corrupt'],
    moves:[{n:'Echo Strike',pow:1.1},{n:'Dark Echo',pow:.9,spell:true}],drops:[{id:'dark_essence',chance:.5}],desc:'An echo of the prince\'s regrets.'},
  boss_demon_warden:{n:'Demon Warden',icon:'😈',area:'demon',boss:true,hp:680,atk:18,mag:22,def:12,spd:11,xp:300,gold:210,traits:['magic'],
    moves:[{n:'Hellfire',pow:1.6,spell:true,fx:[{k:'burn',d:3}]},{n:'Dread Gaze',pow:1,spell:true,fx:[{k:'slow',d:2}]},{n:'Crushing Fist',pow:1.8}],desc:'Placeholder boss.'},
  // ---- Faepool forest / swamp, river & sea, Dragon Vale (PROVISIONAL — rename / retune per story) ----
  forest_wolf:{n:'Forest Wolf',icon:'🐺',area:'forest',hp:70,atk:13,mag:0,def:5,spd:14,xp:30,gold:12,
    moves:[{n:'Bite',pow:1},{n:'Pounce',pow:1.4}],drops:[{id:'forest_herb',chance:.3}],desc:'Lean and quick. Hunts the Faepool roads at dusk.'},
  thorn_boar:{n:'Thorn Boar',icon:'🐗',area:'forest',hp:95,atk:12,mag:0,def:8,spd:7,xp:34,gold:14,
    moves:[{n:'Gore',pow:1.1},{n:'Charge',pow:1.5}],drops:[{id:'forest_herb',chance:.35}],desc:'Bramble-armoured and short-tempered.'},
  xima_sprite:{n:'Xima Sprite',icon:'🧚',area:'forest',hp:55,atk:6,mag:13,def:4,spd:13,xp:38,gold:16,traits:['magic'],
    moves:[{n:'Curse Spark',pow:1.1,spell:true},{n:'Withering Dust',pow:.8,spell:true,fx:[{k:'slow',d:2}]}],drops:[{id:'xima_shard',chance:.25}],desc:'A forest spirit twisted by Xima corruption.'},
  corrupted_stag:{n:'Corrupted Stag',icon:'🦌',area:'forest',elite:true,hp:150,atk:16,mag:8,def:9,spd:12,xp:80,gold:40,traits:['magic'],
    moves:[{n:'Antler Rush',pow:1.5},{n:'Blighted Breath',pow:1,spell:true,fx:[{k:'burn',d:3}]}],drops:[{id:'xima_shard',chance:.6}],desc:'Once a forest guardian. The curse runs black in its veins.'},
  bog_toad:{n:'Bog Toad',icon:'🐸',area:'swamp',hp:75,atk:11,mag:0,def:5,spd:8,xp:30,gold:12,
    moves:[{n:'Tongue Lash',pow:1,fx:[{k:'slow',d:2}]},{n:'Belly Flop',pow:1.3}],drops:[{id:'toad_gland',chance:.4}],desc:'Frog Mahan\'s smaller kin.'},
  mire_leech:{n:'Mire Leech',icon:'🪱',area:'swamp',hp:50,atk:9,mag:0,def:3,spd:12,xp:26,gold:10,
    moves:[{n:'Drain',pow:.9,fx:[{k:'burn',d:3}]}],drops:[{id:'toad_gland',chance:.25}],desc:'Poisonous bite. Clings on.'},
  sea_raider:{n:'River Raider',icon:'🏴‍☠️',area:'sea',hp:85,atk:13,mag:0,def:6,spd:10,xp:36,gold:26,
    moves:[{n:'Boarding Axe',pow:1.1},{n:'Grapple',pow:.7,fx:[{k:'slow',d:2}]}],drops:[{id:'coin_pouch',chance:.5}],desc:'Preys on slow river barges and ferries.'},
  storm_wisp:{n:'Storm Wisp',icon:'🌩️',area:'sea',hp:60,atk:5,mag:14,def:4,spd:13,xp:36,gold:14,traits:['magic'],
    moves:[{n:'Static Lash',pow:1.1,spell:true},{n:'Gale',pow:.8,spell:true,fx:[{k:'slow',d:2}]}],drops:[{id:'sea_pearl',chance:.3}],desc:'A knot of weather with a grudge.'},
  river_serpent:{n:'River Serpent',icon:'🐍',area:'sea',elite:true,hp:160,atk:17,mag:0,def:9,spd:11,xp:85,gold:48,
    moves:[{n:'Coil',pow:1.2,fx:[{k:'bind',d:1}]},{n:'Venom Fang',pow:1.5,fx:[{k:'burn',d:3}]}],drops:[{id:'sea_pearl',chance:.5}],desc:'Long as a barge. Rarely surfaces.'},
  vale_drake:{n:'Vale Drake',icon:'🦎',area:'dragon',hp:115,atk:16,mag:6,def:9,spd:10,xp:48,gold:26,
    moves:[{n:'Tail Sweep',pow:1.2,all:true},{n:'Flame Breath',pow:1.3,spell:true,fx:[{k:'burn',d:2}]}],drops:[{id:'drake_scale',chance:.4}],desc:'A lesser kin of the dragons Dragon Vale remembers.'},
  stone_sentinel:{n:'Stone Sentinel',icon:'🗿',area:'dragon',hp:150,atk:15,mag:0,def:15,spd:5,xp:52,gold:28,
    moves:[{n:'Crushing Blow',pow:1.4},{n:'Stone Guard',pow:.5}],drops:[{id:'relic_dust',chance:.45}],desc:'Ancient wardens still keeping watch.'},
  relic_spirit:{n:'Relic Spirit',icon:'🔮',area:'dragon',hp:85,atk:6,mag:17,def:6,spd:12,xp:54,gold:30,traits:['magic'],
    moves:[{n:'Echo Bolt',pow:1.2,spell:true},{n:'Forgotten Verse',pow:.9,spell:true,fx:[{k:'silence',d:2}]}],drops:[{id:'relic_dust',chance:.5}],desc:'The memory of a mage, bound to a dead spell.'},
  // ---- new placeholder BOSSES ----
  boss_frog_mahan:{n:'Frog Mahan',icon:'🐸',area:'swamp',boss:true,hp:640,atk:19,mag:8,def:11,spd:9,xp:260,gold:180,
    moves:[{n:'Tongue Lash',pow:1.3,fx:[{k:'slow',d:2}]},{n:'Poison Spit',pow:1.1,fx:[{k:'burn',d:3}]},{n:'Belly Crush',pow:1.9}],desc:'The swamp\'s warlord. Placeholder stats.'},
  boss_pearl_guardian:{n:'Pearl Guardian',icon:'🐲',area:'dragon',boss:true,hp:860,atk:21,mag:25,def:14,spd:12,xp:420,gold:300,traits:['magic'],
    moves:[{n:'Dragonfire',pow:1.7,spell:true,fx:[{k:'burn',d:3}]},{n:'Ancient Roar',pow:1,spell:true,fx:[{k:'slow',d:2}]},{n:'Pearl Light',pow:2,spell:true}],desc:'Guards the Dragon Pearl chamber. Placeholder stats.'},
};
// enemy level scaling: stats grow with level; xp/gold grow slower
function mkEnemy(key, lv){
  const e = ENEMIES[key], m = 1 + (lv-1)*0.12, x = 1 + (lv-1)*0.08;
  return { key, name:e.n, icon:e.icon, boss:!!e.boss, elite:!!e.elite, traits:e.traits||[], moves:e.moves, drops:e.drops||[],
    hp:Math.round(e.hp*m), mhp:Math.round(e.hp*m), mp:0, mmp:0,
    atk:Math.round(e.atk*m), mag:Math.round(e.mag*m), def:Math.round(e.def*m), spd:Math.round(e.spd*(1+(lv-1)*.02)),
    xp:Math.round(e.xp*x), gold:Math.round(e.gold*x), onlyBy:e.onlyBy, offMult:e.offMult, phases:e.phases ? e.phases.map(p => Object.assign({}, p)) : null };
}

/* ---- items (materials/consumables now; gear slots reserved for the Equipment system) ---- */
const ITEMS = {
  coin_pouch:{n:'Coin Pouch',icon:'👛',type:'material',rarity:'common'},   rope_coil:{n:'Rope Coil',icon:'🪢',type:'material',rarity:'common'},
  contraband:{n:'Contraband Crate',icon:'📦',type:'material',rarity:'uncommon'}, bandit_sash:{n:'Bandit Sash',icon:'🎗️',type:'material',rarity:'common'},
  arrow_bundle:{n:'Arrow Bundle',icon:'🏹',type:'material',rarity:'common'},  assassin_mask:{n:'Assassin\'s Mask',icon:'🎭',type:'material',rarity:'rare'},
  venom_vial:{n:'Venom Vial',icon:'🧪',type:'material',rarity:'uncommon'},     demon_ash:{n:'Demon Ash',icon:'🌫️',type:'material',rarity:'common'},
  shade_essence:{n:'Shade Essence',icon:'💠',type:'material',rarity:'rare'},   herbal_tonic:{n:'Herbal Tonic',icon:'🍵',type:'consumable',rarity:'common'},
  chiefs_cleaver:{n:'Chief\'s Cleaver',icon:'🪓',type:'gear',slot:'weapon',rarity:'rare'}, venomed_cloak:{n:'Venomed Cloak',icon:'🧥',type:'gear',slot:'armor',rarity:'rare'},
  warden_sigil:{n:'Warden\'s Sigil',icon:'🔯',type:'gear',slot:'accessory',rarity:'epic'},
  forest_herb:{n:'Faepool Herb',icon:'🌿',type:'material',rarity:'common'}, xima_shard:{n:'Xima Shard',icon:'🔻',type:'material',rarity:'rare'},
  toad_gland:{n:'Toad Gland',icon:'🧫',type:'material',rarity:'common'}, sea_pearl:{n:'Sea Pearl',icon:'🦪',type:'material',rarity:'uncommon'},
  river_fish:{n:'River Fish',icon:'🐟',type:'material',rarity:'common'}, drake_scale:{n:'Drake Scale',icon:'🐉',type:'material',rarity:'uncommon'},
  dark_essence:{n:'Dark Essence',icon:'🌑',type:'material',rarity:'uncommon'}, dragon_crystal:{n:'Dragon Crystal',icon:'💎',type:'material',rarity:'rare'}, royal_sigil:{n:'Royal Sigil',icon:'🔱',type:'material',rarity:'rare'}, shadow_steel:{n:'Shadow Steel',icon:'⛓️',type:'material',rarity:'epic'},
  seal_fragment:{n:'Dragonvale Seal Fragment',icon:'🔰',type:'material',rarity:'epic'}, relic_dust:{n:'Relic Dust',icon:'✨',type:'material',rarity:'uncommon'}, pearl_fragment:{n:'Black Pearl Fragment',icon:'🔮',type:'material',rarity:'epic'},
  greyson_dagger:{n:'Greyson\'s Dagger',icon:'🗡️',type:'gear',slot:'weapon',rarity:'epic'}, greyson_flail:{n:'Greyson\'s Flail',icon:'⛓️',type:'gear',slot:'weapon',rarity:'epic'},
  ridge_cloak:{n:'Ridge Cloak',icon:'🧥',type:'gear',slot:'armor',rarity:'rare'}, bandit_lords_blade:{n:'Bandit Lord\'s Blade',icon:'🗡️',type:'gear',slot:'weapon',rarity:'rare'},
  minion_sigil:{n:'Minion\'s Sigil',icon:'🔻',type:'gear',slot:'accessory',rarity:'uncommon'}, mouse_charm:{n:'Mouse\'s Lucky Charm',icon:'🐭',type:'gear',slot:'accessory',rarity:'uncommon'},
  cultist_robe:{n:'Crimson Cultist Robe',icon:'🧥',type:'gear',slot:'armor',rarity:'rare'}, wardens_lantern:{n:'Warden\'s Lantern',icon:'🏮',type:'gear',slot:'accessory',rarity:'epic'},
  ghost_gift:{n:'Moon-Blossom Gift Set',icon:'🍵',type:'quest',rarity:'rare'},
  divorce_scroll:{n:'Divorce Scroll (King Chadstone)',icon:'📜',type:'quest',rarity:'epic'},
  forbidden_page:{n:'The Forbidden Page',icon:'📄',type:'quest',rarity:'epic'}, yvette_portrait:{n:'Portrait of Yvette Sue Valen',icon:'🖼️',type:'quest',rarity:'epic'}, pact_record:{n:'The Tribute-Valen Pact Record',icon:'📜',type:'quest',rarity:'epic'},
  sealed_box:{n:'Sealed Box (for the Dragonvale King)',icon:'📦',type:'quest',rarity:'epic'},
  mahan_crown:{n:'Mahan\'s Mire Crown',icon:'👑',type:'gear',slot:'accessory',rarity:'rare'},
};
/* ---- LOOT TABLES for major battles ----
   guaranteed: always drop.  rolls: independent chance rolls.  firstClear: only on the first win.
   qty: [min,max]. Bosses use these; normal enemies use their own `drops`. */
const LOOT = {
  boss_shadow_roc:{guaranteed:[{id:'dark_essence',qty:[2,3]},{id:'dragon_crystal',qty:[1,1]}],rolls:[{id:'royal_sigil',chance:.35},{id:'shadow_steel',chance:.1}],firstClear:[{id:'royal_sigil',qty:[1,1]}]},
  boss_shadow_roc_p2:{guaranteed:[{id:'dark_essence',qty:[2,2]}],rolls:[{id:'dragon_crystal',chance:.4}],firstClear:[{id:'dragon_crystal',qty:[1,1]}]},
  boss_shadow_ambition:{guaranteed:[{id:'dark_essence',qty:[3,4]},{id:'dragon_crystal',qty:[1,2]}],rolls:[{id:'royal_sigil',chance:.5},{id:'shadow_steel',chance:.25},{id:'shadow_mail',chance:.12}],firstClear:[{id:'shadow_steel',qty:[1,1]}]},
  boss_forgotten_prince:{guaranteed:[{id:'dark_essence',qty:[4,5]},{id:'dragon_crystal',qty:[2,3]},{id:'royal_sigil',qty:[1,2]}],rolls:[{id:'shadow_steel',chance:.5},{id:'shadow_mail',chance:.25},{id:'forgotten_crown',chance:.15}],firstClear:[{id:'forgotten_crown',qty:[1,1]}]},
  boss_bandit_chief:{guaranteed:[{id:'bandit_sash',qty:[2,3]}],rolls:[{id:'chiefs_cleaver',chance:.2},{id:'herbal_tonic',chance:.6,qty:[1,2]}],firstClear:[{id:'coin_pouch',qty:[2,2]}]},
  boss_masked_leader:{guaranteed:[{id:'assassin_mask',qty:[1,1]}],rolls:[{id:'venomed_cloak',chance:.2},{id:'venom_vial',chance:.6,qty:[1,3]}],firstClear:[{id:'herbal_tonic',qty:[3,3]}]},
  boss_demon_warden:{guaranteed:[{id:'demon_ash',qty:[3,5]}],rolls:[{id:'warden_sigil',chance:.15},{id:'shade_essence',chance:.5,qty:[1,2]}],firstClear:[{id:'shade_essence',qty:[1,1]}]},
  boss_booyeong:{guaranteed:[{id:'coin_pouch',qty:[2,3]}],rolls:[{id:'ridge_cloak',chance:.35},{id:'bandit_lords_blade',chance:.2},{id:'herbal_tonic',chance:.6,qty:[1,2]}],firstClear:[{id:'bandit_lords_blade',qty:[1,1]}]},
  boss_offering_warden:{guaranteed:[{id:'xima_shard',qty:[2,3]},{id:'relic_dust',qty:[1,2]}],rolls:[{id:'wardens_lantern',chance:.4},{id:'cultist_robe',chance:.4},{id:'herbal_tonic',chance:.6,qty:[2,3]}],firstClear:[{id:'moon_tonic',qty:[2,2]}]},
  boss_frog_mahan:{guaranteed:[{id:'toad_gland',qty:[3,5]}],rolls:[{id:'mahan_crown',chance:.2},{id:'herbal_tonic',chance:.6,qty:[1,2]}],firstClear:[{id:'xima_shard',qty:[1,1]}]},
  boss_pearl_guardian:{guaranteed:[{id:'relic_dust',qty:[3,5]}],rolls:[{id:'drake_scale',chance:.6,qty:[1,3]}],firstClear:[{id:'pearl_fragment',qty:[1,1]}]},
};
const rint = ([a,b]) => a + Math.floor(Math.random()*(b-a+1));
function rollLoot(table, first){
  const out = []; if(!table) return out;
  (table.guaranteed||[]).forEach(d => out.push({id:d.id, qty:rint(d.qty||[1,1])}));
  (table.rolls||[]).forEach(d => { if(Math.random() < d.chance) out.push({id:d.id, qty:rint(d.qty||[1,1])}); });
  if(first) (table.firstClear||[]).forEach(d => out.push({id:d.id, qty:rint(d.qty||[1,1])}));
  return out;
}
function addItems(list){ list.forEach(d => G.inv[d.id] = (G.inv[d.id]||0) + d.qty); }
