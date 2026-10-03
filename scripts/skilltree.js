/* =====================================================================
   TRIBUTE — SKILL TREES + BOND UNLOCKS
   Each hero has 3 branches x 4 nodes. Node n needs node n-1 of the same branch.
   Skill points: 1 per level above 1, +3 per evolution tier taken. Node costs 1/2/3/4 (10 per branch, 30 per hero).
   Node = { id, n, icon, desc, skill:{...} }  (adds a battle skill)   or   { ..., passive:{ mult:{stat:x}, critB, evaB } }
   Bond unlocks (Bond 1,2,4,5; Bond 3 is the existing pair skill in characters.js):
     1 passive · 2 skill · 4 passive · 5 pair ULTIMATE (needs Jade standing). Jade's "bond" = average bond of her recruited companions.
   ALL numbers / names beyond the design doc are PROVISIONAL.
   ===================================================================== */
const NODE_COST = [1,2,3,4];
// Optional per-hero tree unlock chapter; empty = open as soon as the hero is in the party.
const TREE_CH = {};
const treeOpen = id => G.ch >= (TREE_CH[id]===undefined ? -1 : TREE_CH[id]);
const sk  = (id,n,icon,mp,kind,tgt,pow,extra,desc) => Object.assign({id,n,icon,mp,kind,tgt,pow,desc}, extra||{});
const nd  = (id,n,icon,skill) => ({id,n,icon,skill,desc:skill.desc});
const pct = m => Object.keys(m).map(k => '+'+Math.round((m[k]-1)*100)+'% '+k.toUpperCase()).join(', ');
const passiveText = p => [pct(p.mult||{}), p.critB?'+'+Math.round(p.critB*100)+'% crit chance':'', p.evaB?'+'+Math.round(p.evaB*100)+'% evasion':''].filter(Boolean).join(', ');
const ps  = (id,n,icon,passive) => ({id,n,icon,passive,desc:passiveText(passive)});

const SKILLTREE = {
 jade:[
  {id:'guardian',n:'Guardian',icon:'🛡️',desc:'Defence and protection.',nodes:[
    ps('j_g1','Steadfast','🛡️',{mult:{def:1.08,hp:1.05}}),
    nd('j_g2','Aegis Counter','🔰',sk('aegis_counter','Aegis Counter','🔰',7,'support','self',0,{fx:[{k:'buff',stat:'def',m:1.4,d:3},{k:'shield',v:.15,d:3}]},'A guarded stance that raises DEF and adds a barrier.')),
    ps('j_g3','Imperial Resolve','🏯',{mult:{hp:1.1,def:1.06}}),
    nd('j_g4','Imperial Bulwark','🏰',sk('imperial_bulwark','Imperial Bulwark','🏰',14,'support','allies',0,{fx:[{k:'shield',v:.2,d:3}]},'A barrier over the whole party.'))]},
  {id:'blade',n:'Blade',icon:'🌙',desc:'Sword mastery.',nodes:[
    ps('j_b1','Sharpened Edge','🗡️',{mult:{atk:1.08}}),
    nd('j_b2','Twin Moon Cut','🌗',sk('twin_moon','Twin Moon Cut','🌗',9,'phys','foes',1.2,{},'Two crescents sweep every enemy.')),
    ps('j_b3','Swordsense','⚡',{mult:{spd:1.05},critB:.06}),
    nd('j_b4','Eclipse Crescent','🌑',sk('eclipse_crescent','Eclipse Crescent','🌑',14,'phys','foe',3.0,{crit:true},'A devastating, guaranteed critical cut.'))]},
  {id:'destiny',n:'Destiny',icon:'👁️',desc:'Prophecy and golden blood.',nodes:[
    ps('j_d1','Inner Sight','👁️',{mult:{mag:1.08,mp:1.08}}),
    nd('j_d2','Prophetic Warning','📜',sk('prophetic_warning','Prophetic Warning','📜',8,'support','allies',0,{fx:[{k:'buff',stat:'eva',m:1.3,d:3}]},'Foresight raises the party\'s evasion.')),
    ps('j_d3','Dima\'s Echo','🌅',{mult:{mp:1.1},evaB:.05}),
    nd('j_d4','Fate Rewritten','✨',sk('fate_rewritten','Fate Rewritten','✨',14,'heal','allies',.6,{fx:[{k:'cleanse'},{k:'regen',v:.06,d:3}]},'Cleanses the party and gives regeneration.'))]},
 ],
 chad:[
  {id:'burst',n:'Burst',icon:'💥',desc:'Raw damage.',nodes:[
    ps('c_b1','Heavy Hands','💪',{mult:{atk:1.08}}),
    nd('c_b2','Rending Blow','🩸',sk('rending_blow','Rending Blow','🩸',7,'phys','foe',2.3,{fx:[{k:'buff',stat:'def',m:.8,d:3}]},'A heavy cut that breaks guard (DEF down).')),
    ps('c_b3','Killer Instinct','🎯',{mult:{atk:1.04},critB:.08}),
    nd('c_b4','Hundred Strikes','⚔️',sk('hundred_strikes','Hundred Strikes','⚔️',15,'phys','foe',3.2,{},'A flurry ending in a massive blow.'))]},
  {id:'swift',n:'Swiftness',icon:'💨',desc:'Speed and evasion.',nodes:[
    ps('c_s1','Light Feet','👟',{mult:{spd:1.08}}),
    nd('c_s2','Afterimage','👤',sk('afterimage','Afterimage','👤',6,'support','self',0,{fx:[{k:'buff',stat:'eva',m:1.5,d:3},{k:'buff',stat:'spd',m:1.2,d:3}]},'Leaves an afterimage: EVA and SPD up.')),
    ps('c_s3','Wind Step','🌬️',{mult:{spd:1.08},evaB:.04}),
    nd('c_s4','Lightning Rush','⚡',sk('lightning_rush','Lightning Rush','⚡',12,'phys','foes',1.5,{},'A blinding rush through all enemies.'))]},
  {id:'dragonblood',n:'Dragon Blood',icon:'🐉',desc:'Endurance and fury.',nodes:[
    ps('c_d1','Tough Hide','🛡️',{mult:{hp:1.08}}),
    nd('c_d2','Roaring Guard','🦁',sk('roaring_guard','Roaring Guard','🦁',6,'support','self',0,{fx:[{k:'buff',stat:'def',m:1.5,d:3},{k:'buff',stat:'atk',m:1.2,d:3}]},'A war cry: DEF and ATK up.')),
    ps('c_d3','Ancestral Vigour','❤️',{mult:{hp:1.1,atk:1.05}}),
    nd('c_d4','Dragon Fury','🔥',sk('dragon_fury','Dragon Fury','🔥',14,'support','self',0,{fx:[{k:'buff',stat:'atk',m:1.6,d:3},{k:'crit',d:2}]},'Berserk power: ATK greatly up and crits.'))]},
 ],
 sky:[
  {id:'healing',n:'Healing',icon:'💚',desc:'Restoration.',nodes:[
    ps('s_h1','Gentle Qi','🌱',{mult:{mag:1.08}}),
    nd('s_h2','Gentle Rain','🌧️',sk('gentle_rain','Gentle Rain','🌧️',9,'heal','allies',.8,{},'A soft rain heals the party.')),
    ps('s_h3','Deep Reserves','💧',{mult:{mp:1.1,mag:1.06}}),
    nd('s_h4','Bountiful Spring','🌸',sk('bountiful_spring','Bountiful Spring','🌸',18,'heal','allies',1.4,{fx:[{k:'cleanse'}]},'A great healing that also purifies.'))]},
  {id:'barrier',n:'Barrier',icon:'🔰',desc:'Wards and defence.',nodes:[
    ps('s_b1','Inner Guard','🛡️',{mult:{def:1.08}}),
    nd('s_b2','Jade Ward','🪬',sk('jade_ward','Jade Ward','🪬',12,'support','allies',0,{fx:[{k:'shield',v:.18,d:3}]},'Wards the whole party with energy barriers.')),
    ps('s_b3','Mountain Body','⛰️',{mult:{hp:1.08,def:1.06}}),
    nd('s_b4','Mountain Seal','🏔️',sk('mountain_seal','Mountain Seal','🏔️',20,'support','allies',0,{fx:[{k:'shield',v:.3,d:4},{k:'buff',stat:'def',m:1.25,d:3}]},'A heavy barrier and DEF up for all.'))]},
  {id:'palm',n:'Inner Palm',icon:'🖐️',desc:'Martial arts.',nodes:[
    ps('s_p1','Iron Wrists','✊',{mult:{atk:1.1}}),
    nd('s_p2','Iron Palm','🖐️',sk('iron_palm','Iron Palm','🖐️',5,'phys','foe',2.0,{},'A palm strike with concentrated qi.')),
    ps('s_p3','Cloud Step','☁️',{mult:{spd:1.08}}),
    nd('s_p4','Qi Burst','💫',sk('qi_burst','Qi Burst','💫',14,'magic','foes',1.5,{fx:[{k:'slow',d:2}]},'Internal energy erupts, slowing all enemies.'))]},
 ],
 sally:[
  {id:'illusion',n:'Illusion',icon:'🪞',desc:'Mirage magic.',nodes:[
    ps('y_i1','Veiled Mind','🪞',{mult:{mag:1.08}}),
    nd('y_i2','Mirror Image','👥',sk('mirror_image','Mirror Image','👥',8,'support','self',0,{fx:[{k:'buff',stat:'eva',m:1.8,d:2}]},'Mirror copies make Sally very hard to hit.')),
    ps('y_i3','Dream Weave','💭',{mult:{mp:1.08},evaB:.04}),
    nd('y_i4','Hall of Mirrors','🏛️',sk('hall_of_mirrors','Hall of Mirrors','🏛️',18,'magic','foes',.8,{fx:[{k:'charm',d:1,all:true}]},'A maze of reflections bewilders every foe.'))]},
  {id:'dance',n:'Dance',icon:'💃',desc:'Agile strikes.',nodes:[
    ps('y_d1','Quick Steps','👣',{mult:{spd:1.08}}),
    nd('y_d2','Petal Flurry','🌹',sk('petal_flurry','Petal Flurry','🌹',8,'phys','foes',1.1,{},'Razor petals fly in a spinning dance.')),
    ps('y_d3','Dancer\'s Poise','🎀',{mult:{spd:1.06},critB:.06}),
    nd('y_d4','Thousand Petals','🌸',sk('thousand_petals','Thousand Petals','🌸',16,'phys','foes',1.7,{fx:[{k:'slow',d:2}]},'A storm of petals that slows all enemies.'))]},
  {id:'charm',n:'Charm',icon:'💋',desc:'Control through charm.',nodes:[
    ps('y_c1','Silver Tongue','🗣️',{mult:{mag:1.06,hp:1.06}}),
    nd('y_c2','Honeyed Words','🍯',sk('honeyed_words','Honeyed Words','🍯',8,'support','foe',0,{fx:[{k:'charm',d:3}]},'A long enchantment: the target loses its turns.')),
    ps('y_c3','Captivating','✨',{evaB:.05,mult:{mag:1.05}}),
    nd('y_c4','Heartstrike','💘',sk('heartstrike','Heartstrike','💘',12,'magic','foe',1.4,{fx:[{k:'charm',d:2},{k:'silence',d:2}]},'A beautiful, devastating blow. Charms and silences.'))]},
 ],
 levi:[
  {id:'elemental',n:'Elemental',icon:'🔥',desc:'Magical ammunition.',nodes:[
    ps('l_e1','Charged Quiver','🎒',{mult:{mag:1.08}}),
    nd('l_e2','Twin Bolt','🔥',sk('twin_bolt','Twin Bolt','🔥',8,'phys','foe',1.0,{fx:[{k:'burn',d:3},{k:'slow',d:3}]},'A flame and frost bolt in one shot.')),
    ps('l_e3','Spell Ammunition','🧿',{mult:{atk:1.06,mp:1.08}}),
    nd('l_e4','Tempest Bolt','⛈️',sk('tempest_bolt','Tempest Bolt','⛈️',14,'phys','chain',1.8,{elem:'lightning'},'A storm of lightning arcs between foes.'))]},
  {id:'marksman',n:'Marksman',icon:'🎯',desc:'Pure precision.',nodes:[
    ps('l_m1','Steady Aim','🎯',{mult:{atk:1.08}}),
    nd('l_m2','Piercing Shot','📍',sk('piercing_shot','Piercing Shot','📍',7,'phys','foe',2.2,{},'A shot that finds the gap in any armour.')),
    ps('l_m3','Eagle Eye','🦅',{mult:{atk:1.04},critB:.08}),
    nd('l_m4','Headshot','💀',sk('headshot','Headshot','💀',14,'phys','foe',3.4,{crit:true},'A guaranteed critical shot.'))]},
  {id:'tactician',n:'Tactician',icon:'🧭',desc:'Control the field.',nodes:[
    ps('l_t1','Light Step','👟',{mult:{spd:1.08}}),
    nd('l_t2','Suppressing Fire','🌧️',sk('suppressing_fire','Suppressing Fire','🌧️',10,'phys','foes',.8,{fx:[{k:'slow',d:2}]},'Pins every enemy down.')),
    ps('l_t3','Field Training','🛡️',{mult:{hp:1.08,def:1.06}}),
    nd('l_t4','Rain of Bolts','☔',sk('rain_of_bolts','Rain of Bolts','☔',16,'phys','foes',1.5,{},'A volley on the whole battlefield.'))]},
 ],
 devon:[
  {id:'dragonmagic',n:'Dragon Magic',icon:'🔥',desc:'Royal dragon spells.',nodes:[
    ps('d_m1','Draconic Focus','🔥',{mult:{mag:1.08}}),
    nd('d_m2','Dragon Lance','🐉',sk('dragon_lance','Dragon Lance','🐉',9,'magic','foe',2.4,{elem:'fire',fx:[{k:'burn',d:3}]},'A spear of dragonfire.')),
    ps('d_m3','Pearl Reservoir','🔮',{mult:{mp:1.1,mag:1.05}}),
    nd('d_m4','Dragon Tempest','🌪️',sk('dragon_tempest','Dragon Tempest','🌪️',18,'magic','foes',1.9,{},'A storm of dragon magic.'))]},
  {id:'scholarblade',n:'Scholar Blade',icon:'📖',desc:'Sword and spell.',nodes:[
    ps('d_s1','Trained Arm','⚔️',{mult:{atk:1.08}}),
    nd('d_s2','Runic Slash','📜',sk('runic_slash','Runic Slash','📜',6,'phys','foe',1.9,{fx:[{k:'analyze'}]},'A rune-etched strike that also analyses the foe.')),
    ps('d_s3','Scholar\'s Poise','🎓',{mult:{def:1.06,hp:1.06}}),
    nd('d_s4','Spellblade Flourish','✴️',sk('spellblade_flourish','Spellblade Flourish','✴️',12,'magic','foe',2.8,{},'Sword and spell as one cut.'))]},
  {id:'pearl',n:'Pearl Knowledge',icon:'🔮',desc:'Dragon Pearl lore.',nodes:[
    ps('d_p1','Ancient Memory','🧠',{mult:{mp:1.1}}),
    nd('d_p2','Pearl Light','💡',sk('pearl_light','Pearl Light','💡',8,'heal','ally',.9,{fx:[{k:'cleanse'}]},'Pearl light heals and cleanses an ally.')),
    ps('d_p3','Dragon Ward','🛡️',{mult:{mag:1.06,def:1.06}}),
    nd('d_p4','Pearl Bulwark','🌐',sk('pearl_bulwark','Pearl Bulwark','🌐',16,'support','allies',0,{fx:[{k:'buff',stat:'def',m:1.3,d:3},{k:'buff',stat:'mag',m:1.3,d:3}]},'The Pearl shields and empowers the party.'))]},
 ],
};

// Bond unlocks. lvl 1/4 = passive, lvl 2 = skill, lvl 5 = pair ultimate. (Bond 3 = existing pair skill, characters.js)
const BONDTREE = {
 jade:[
  {lvl:1, passive:{mult:{hp:1.04}}, n:'Leader\'s Resolve', icon:'🌙', desc:'Her companions steady her.'},
  {lvl:2, skill:sk('rally','Rally','📣',8,'support','allies',0,{fx:[{k:'buff',stat:'atk',m:1.15,d:3}]},'Jade rallies the party: ATK up.'), n:'Rally', icon:'📣'},
  {lvl:4, passive:{mult:{atk:1.05,mag:1.05,def:1.05}}, n:'Bonds of Trust', icon:'🤝', desc:'Trusted companions bring out her best.'},
  {lvl:5, skill:sk('bonds_of_destiny','Bonds of Destiny','🌅',24,'support','allies',0,{fx:[{k:'buff',stat:'atk',m:1.3,d:3},{k:'buff',stat:'mag',m:1.3,d:3},{k:'buff',stat:'def',m:1.3,d:3},{k:'regen',v:.06,d:3}]},'ULTIMATE. Every bond answers: the whole party surges.'), n:'Bonds of Destiny', icon:'🌅'},
 ],
 chad:[
  {lvl:1, passive:{mult:{atk:1.05}}, n:'Fighting Spirit', icon:'🔥', desc:'Fighting beside Jade sharpens him.'},
  {lvl:2, skill:sk('shoulder_to_shoulder','Shoulder to Shoulder','🛡️',6,'support','ally',0,{fx:[{k:'buff',stat:'def',m:1.3,d:3}]},'Chad covers an ally: DEF up.'), n:'Shoulder to Shoulder', icon:'🛡️'},
  {lvl:4, passive:{mult:{atk:1.06,spd:1.06}}, n:'Rival & Ally', icon:'⚔️', desc:'Their rivalry becomes rhythm.'},
  {lvl:5, skill:sk('dragon_duet','Dragon Duet','🐉',22,'phys','foe',3.1,{pair:true},'ULTIMATE. Chad and Jade, one sword, one dragon.'), n:'Dragon Duet', icon:'🐉'},
 ],
 sky:[
  {lvl:1, passive:{mult:{mp:1.06,mag:1.04}}, n:'Calm Presence', icon:'🌿', desc:'Jade\'s steadiness helps Sky\'s qi flow.'},
  {lvl:2, skill:sk('calming_breath','Calming Breath','🍃',7,'heal','ally',1.2,{fx:[{k:'regen',v:.08,d:3}]},'Heals an ally and soothes with regeneration.'), n:'Calming Breath', icon:'🍃'},
  {lvl:4, passive:{mult:{hp:1.08,def:1.06}}, n:'Shared Qi', icon:'💞', desc:'Their energy flows as one.'},
  {lvl:5, skill:sk('heaven_earth_flow','Heaven & Earth Flow','☯️',24,'heal','allies',1.4,{pair:true,fx:[{k:'buff',stat:'atk',m:1.2,d:3},{k:'buff',stat:'mag',m:1.2,d:3},{k:'cleanse'}]},'ULTIMATE. Sky and Jade\'s energy heals, cleanses and empowers all.'), n:'Heaven & Earth Flow', icon:'☯️'},
 ],
 sally:[
  {lvl:1, passive:{evaB:.04}, n:'Quick Wit', icon:'🌹', desc:'Jade covers her blind spots.'},
  {lvl:2, skill:sk('shared_secret','Shared Secret','🤫',7,'support','ally',0,{fx:[{k:'buff',stat:'eva',m:1.5,d:3},{k:'buff',stat:'spd',m:1.2,d:3}]},'Sally veils an ally: EVA and SPD up.'), n:'Shared Secret', icon:'🤫'},
  {lvl:4, passive:{mult:{mag:1.06,spd:1.06}}, n:'Trusting Partner', icon:'🎭', desc:'Deception turns to teamwork.'},
  {lvl:5, skill:sk('mirage_waltz','Mirage Waltz','💃',22,'magic','foes',2.4,{pair:true,fx:[{k:'charm',d:1,all:true},{k:'slow',d:2}]},'ULTIMATE. Illusion and blade dance as one.'), n:'Mirage Waltz', icon:'💃'},
 ],
 levi:[
  {lvl:1, passive:{mult:{atk:1.05}}, n:'Steady Hand', icon:'🏹', desc:'Jade\'s trust steadies his aim.'},
  {lvl:2, skill:sk('covering_fire','Covering Fire','🏹',8,'phys','foe',1.2,{fx:[{k:'slow',d:2}]},'A shot that pins the foe.'), n:'Covering Fire', icon:'🏹'},
  {lvl:4, passive:{mult:{atk:1.05,spd:1.05},critB:.05}, n:'Eyes on Her Back', icon:'🎯', desc:'He always knows where Jade is.'},
  {lvl:5, skill:sk('golden_volley','Golden Volley','🌟',22,'phys','chain',2.2,{pair:true,elem:'lightning'},'ULTIMATE. Levi\'s bolts carry the golden blood.'), n:'Golden Volley', icon:'🌟'},
 ],
 devon:[
  {lvl:1, passive:{mult:{mag:1.05}}, n:'Scholar\'s Interest', icon:'📖', desc:'Jade\'s bloodline fascinates him.'},
  {lvl:2, skill:sk('scholars_insight','Scholar\'s Insight','🔍',6,'support','foe',0,{fx:[{k:'analyze'},{k:'buff',stat:'def',m:.75,d:3}]},'A deep read of the enemy: weakness exposed (DEF down).'), n:'Scholar\'s Insight', icon:'🔍'},
  {lvl:4, passive:{mult:{mag:1.06,mp:1.08}}, n:'Pearl Resonance', icon:'🔮', desc:'Golden blood and the Pearl resonate.'},
  {lvl:5, skill:sk('pearl_and_blood','Pearl & Blood','🌅',26,'magic','foes',3.0,{pair:true},'ULTIMATE. Dragon Pearl and golden blood, fully united.'), n:'Pearl & Blood', icon:'🌅'},
 ],
};
