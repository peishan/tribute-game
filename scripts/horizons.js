/* =====================================================================
   ARC XII: NEW HORIZONS (chapters 287-311; docs/ARC_XII_PLAN.md)
   - Places: Dragonvale Harbour (ch287); the Western Sea Route opens at ch291 (Western Waters: the Old Trade Sea); the Frontier Port (ch295); the Road of Foreign Stars (ch297);
     the Western Archive (ch302); the Sealed Sanctuary (ch309: visible, closed to Jade for now).
   - Maris Aurel (from ch287) is an adviser on tide, chart and seal clues: she counts for investigation roles but is not a party member and has no portrait slot.
   - Archive tab "Western Routes": Ancient Navigation Markers, Sky Family Clues, the Valor Lineage, Merchant Ledger Compare (from ch296), Interpret Resonance (from ch293) and Valor Resonance
     (hidden; shown only as a word). Read-only except for the two small actions. State: G.hz = {led:{}, interp:{}}; Valor Resonance counts the mystic-site clues done (RES_SPOTS).
   - Maps: "Western Routes" (from ch289) and "The Wider World" (from ch310) use panels cropped from the author's chapter 310 page; they are provisional until proper maps are generated.
   First-pass wording; the story conclusions are fixed. Nothing here is reachable before chapter 287.
   ===================================================================== */
REGIONS.western = {n:'Western Waters', icon:'⚓'};
REGIONS.dragon_harbour = REGIONS.dragon;
Object.assign(LOCATIONS, {
  dragon_harbour:{ n:'Dragonvale Harbour', region:'dragon', kind:'town', icon:'⚓', unlock:{ch:287},
    desc:'The quays below the waterfall city, where the old merchant ship docked and the western voyage is prepared.',
    spots:[ {id:'harbour_inn', kind:'tavern', n:'Harbour Tavern', icon:'🍺', desc:'Rest, share a meal and listen to the sailors.'} ]},
  old_trade_sea:{ n:'The Old Trade Sea', region:'western', kind:'field', icon:'🌊', unlock:{ch:291},
    desc:'Open water west of Tribute\'s charted waters, marked only by stone islets, broken beacons and lanterns on the tide.',
    spots:[ {id:'sea_hunt', kind:'hunt', n:'The Open Water', icon:'🗡️', desc:'Reef raiders and drifting wraiths among the old markers.', pool:['reef_raider','beacon_wraith','storm_wisp'], lo:86} ]},
  frontier_port:{ n:'The Frontier Port', region:'western', kind:'town', icon:'🏘️', unlock:{ch:295},
    desc:'An old harbour that has traded for centuries and is on no modern chart. Its mural and banner carry the star and the waves.',
    spots:[ {id:'port_inn', kind:'tavern', n:'The Two Histories Inn', icon:'🍺', desc:'Rest, share a meal and listen to the old sailors.'} ]},
  western_road:{ n:'The Road of Foreign Stars', region:'western', kind:'field', icon:'🐪', unlock:{ch:297},
    desc:'A caravan road of celestial shrines, patterned fabrics and unfamiliar rites.',
    spots:[ {id:'road_hunt_west', kind:'hunt', n:'The Caravan Road', icon:'🗡️', desc:'Raiders and beasts along the old trade road.', pool:['caravan_raider','road_bandit','shade_beast'], lo:86} ]},
  western_archive:{ n:'The Western Archive', region:'western', kind:'town', icon:'🏛️', unlock:{ch:302},
    desc:'A hidden western archive that kept the records the Register lost.',
    spots:[ {id:'archive_stacks', kind:'hunt', n:'The Hidden Stacks', icon:'🗡️', desc:'Sentinels and restless spirits among the shelves.', pool:['archive_sentinel','relic_spirit'], lo:87},
            {id:'archive_hostel', kind:'tavern', n:'Scholars\' Hostel', icon:'🍵', desc:'Rest and share a meal with the party.'} ]},
  sealed_sanctuary:{ n:'The Sealed Sanctuary', region:'western', kind:'field', icon:'🏰', unlock:{ch:309},
    desc:'A sanctuary of spires and blue banners above the western cliffs. It recognises Jade\'s blood, and its door stays shut.',
    spots:[ {id:'sealed_door', kind:'place', n:'The Sealed Door', icon:'🚪', desc:'A great door with a star seal.', note:'The door answers Jade\'s presence with light and stays sealed. It will not open yet.'} ]},
});
['dragon_harbour','old_trade_sea','frontier_port','western_road','western_archive','sealed_sanctuary'].forEach(k => { if(!LOC_ORDER.includes(k)) LOC_ORDER.push(k); });
ROUTES.push(
  {a:'dragon_vale', b:'dragon_harbour', mode:'carriage', n:'Harbour Road', days:1, fare:0, risk:.05, pool:['road_bandit']},
  {a:'dragon_harbour', b:'old_trade_sea', mode:'ship', n:'The Western Sea Route', days:4, fare:120, risk:.4, pool:['reef_raider','beacon_wraith','storm_wisp']},
  {a:'old_trade_sea', b:'frontier_port', mode:'ship', n:'To the Frontier Port', days:3, fare:90, risk:.4, pool:['reef_raider','storm_wisp']},
  {a:'frontier_port', b:'western_road', mode:'carriage', n:'The Road of Foreign Stars', days:3, fare:40, risk:.4, pool:['caravan_raider','road_bandit']},
  {a:'western_road', b:'western_archive', mode:'carriage', n:'To the Western Archive', days:2, fare:30, risk:.35, pool:['caravan_raider','archive_sentinel']},
  {a:'frontier_port', b:'western_archive', mode:'carriage', n:'The Harbour Lane', days:2, fare:20, risk:.25, pool:['caravan_raider']},
  {a:'western_archive', b:'sealed_sanctuary', mode:'carriage', n:'The Pilgrim\'s Way', days:3, fare:40, risk:.3, pool:['caravan_raider','archive_sentinel']},
);
Object.assign(ENEMIES, {
  reef_raider:{n:'Reef Raider',icon:'🏴‍☠️',area:'sea',hp:165,atk:20,mag:4,def:11,spd:12,xp:92,gold:66,traits:[],moves:[{n:'Boarding Axe',pow:1.2},{n:'Grapple',pow:.9,fx:[{k:'slow',d:1}]}],drops:[{id:'frontier_hide',chance:.25}],desc:'A scavenger who works the old markers and takes what drifts.'},
  beacon_wraith:{n:'Beacon Wraith',icon:'🕯️',area:'sea',hp:140,atk:8,mag:22,def:8,spd:13,xp:96,gold:62,traits:['magic'],moves:[{n:'Cold Flame',pow:1.3,spell:true},{n:'False Light',pow:.8,fx:[{k:'slow',d:1}]}],drops:[{id:'spirit_thread',chance:.22}],desc:'A flicker among the broken beacons that leads ships astray.'},
  caravan_raider:{n:'Caravan Raider',icon:'🗡️',area:'altan',hp:175,atk:21,mag:3,def:12,spd:12,xp:98,gold:70,traits:[],moves:[{n:'Raider\'s Cut',pow:1.2},{n:'Dust and Steel',pow:.9,fx:[{k:'slow',d:1}]}],drops:[{id:'frontier_hide',chance:.25}],desc:'A raider who preys on the lone caravans of the old trade road.'},
  archive_sentinel:{n:'Archive Sentinel',icon:'🗿',area:'dragon',hp:195,atk:18,mag:12,def:17,spd:9,xp:100,gold:72,traits:['magic'],moves:[{n:'Stone Fist',pow:1.3},{n:'Seal of Silence',pow:.8,fx:[{k:'buff',stat:'def',m:1.2,d:2,self:true}]}],drops:[{id:'seal_dust',chance:.22}],desc:'A warden set to keep the western stacks shut to strangers.'},
});
AREA_LOOT.old_trade_sea = [{id:'spirit_thread',chance:.20,needCh:291},{id:'seal_dust',chance:.12,needCh:291}];
AREA_LOOT.western_road = [{id:'frontier_hide',chance:.30,needCh:297},{id:'seal_dust',chance:.18,needCh:297}];
AREA_LOOT.western_archive = [{id:'forgotten_glass',chance:.15,needCh:302},{id:'seal_dust',chance:.20,needCh:302}];
LOCATIONS.dragon_harbour.spots.push(
  {id:'hz287a', kind:'investigate', n:'The Harbourmaster\'s Report', icon:'⚓', ch:287, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'A ship nobody can place.',
   clues:['The harbourmaster: "This ship arrived this morning, carrying cargo and documents from a western port we do not recognise. Its seals and records predate the modern alliance archives by several centuries."', 'They called themselves merchants, but their route is unlike any on record. The ship claims to have sailed from a western port beyond our known charts.'], rw:{xp:193100, gold:40920}},
  {id:'hz287b', kind:'investigate', n:'The Old Seals', icon:'🔏', ch:287, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Older than any kingdom\'s.',
   clues:['Jade: "These seals are much older than the current alliance records. The symbols and script style do not match any kingdom in the modern era."', 'Maris: "These seals are genuine. The craftsmanship and ink composition match maritime records from several centuries ago. This is definitely not a modern forgery."'], rw:{xp:193400, gold:40980}, needFlag:'inv_hz287a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz287c', kind:'investigate', n:'The Route Log', icon:'📖', ch:287, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'A port on no chart.',
   clues:['Maris: "The route log lists a western port that does not appear on any current charts. The navigational notes mention islands and currents that are not in our records."', 'According to the notes the ship sailed west for months, following ocean currents nobody knows. The destination is named, but no such port exists on any map in the alliance or its neighbouring kingdoms.'], rw:{xp:193700, gold:41040}, needFlag:'inv_hz287b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz287d', kind:'investigate', n:'The Tide Charts', icon:'🌊', ch:287, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Too detailed to be made up.',
   clues:['Maris: "The tide charts here are incredibly detailed. They record seasonal winds, currents and star positions that match real patterns, even if the locations are unfamiliar. Someone went to great effort to record these voyages."', 'Rheon: "If these records are genuine, there could be lands and sea routes beyond our current knowledge." The party agrees to catalogue everything, compare it with the alliance archives and prepare the ship.'], rw:{xp:194000, gold:41100}, needFlag:'inv_hz287c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz288a', kind:'investigate', n:'The Original Ship Log', icon:'📜', ch:288, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'The early copy.',
   clues:['The original ship log lists the ports in order: Evermist, Stormreach, Calvaris, Dathmere, Serenthis, Thalassa, Asterwyn, Westreach. Asterwyn is listed as a western port beyond the known charts.', 'Jade: "These older logs are far more detailed than the alliance records. The same western place-name appears repeatedly in the original copies."'], rw:{xp:194300, gold:41160}},
  {id:'hz288b', kind:'investigate', n:'The Altered Copies', icon:'🖋️', ch:288, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Struck out every time.',
   clues:['Maris: "It appears in voyage notes, cargo manifests and harbour requests. But in the later copies the name has been crossed out every time. This was not an accidental omission. Someone deliberately erased it."', 'In the later copy the route continues but line 19 is a blacked-out bar. The ink and handwriting match other altered records.'], rw:{xp:194600, gold:41220}, needFlag:'inv_hz288a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz288c', kind:'investigate', n:'Adrian\'s Message', icon:'✉️', ch:288, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'The same hand.',
   clues:['Adrian: "I have compared copies of the merchant ship\'s route logs with the altered Register records from Arc VIII. The handwriting style, ink composition and manner of striking out place-names are the same. They are systematically erasing this western place and its routes from official records."', 'Jade: "So Asterwyn is real. And someone wants it to cease to exist in every record."'], rw:{xp:194900, gold:41280}, needFlag:'inv_hz288b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz288d', kind:'investigate', n:'Why Erase a Name?', icon:'❓', ch:288, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Fear, or secrecy.',
   clues:['The harbourmaster: "There are many ports in the west lost to war, storms or changing seas. But to erase the name from every copy? That means someone still fears what is there."', 'The party agrees to compile every document and seal, compare them with the alliance archives and other maritime records, and follow the lead of Asterwyn.'], rw:{xp:195200, gold:41340}, needFlag:'inv_hz288c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz289a', kind:'investigate', n:'The Captain\'s Account', icon:'🧓', ch:289, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Four generations at sea.',
   clues:['The captain: "My family has sailed this route for generations. My father, and his father before him. The destination exists. I have seen it with my own eyes. Modern maps do not show this place at all."', 'Jade: "The same place-name appears repeatedly in your records. But in later copies, it has been struck out. Do you know why?" The captain: "I do not know who erased it. But it was not my family."'], rw:{xp:195500, gold:41400}},
  {id:'hz289b', kind:'investigate', n:'Landmarks That Match', icon:'🗺️', ch:289, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Islands and stone.',
   clues:['The charts\' landmarks match the underwater ridges and island patterns mentioned in the old Sunken Kingdom records: the sea may change, but these formations would still exist.', 'The cluster of islands on the captain\'s chart matches the outline from the broken stone tablet, and the heading is the same as the tide notes found in the restricted archive.'], rw:{xp:195800, gold:41460}, needFlag:'inv_hz289a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz289c', kind:'investigate', n:'The Old Name', icon:'🔤', ch:289, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Safer unwritten.',
   clues:['The captain: "We still use the old name within our family. But we do not write it in public records anymore. It is safer that way."', 'Jade: "So the place exists, but it has been erased from official history. And yet the sea still remembers. That means we can still find it, if we follow the right markers."'], rw:{xp:196100, gold:41520}, needFlag:'inv_hz289b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz289d', kind:'investigate', n:'The Tide Markers', icon:'🧭', ch:289, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'A way to follow.',
   clues:['Maris: "Your charts also include these tide markers. They correspond to a navigational pattern used in older Sunken Kingdom passage records. These could guide us, even if the place does not appear on modern maps."', 'The captain: "Your family has kept this knowledge for generations. We are grateful you shared it with us. We will follow this route and see what the sea still remembers."'], rw:{xp:196400, gold:41580}, needFlag:'inv_hz289c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz290a', kind:'investigate', n:'A Seal on Every Page', icon:'🔏', ch:290, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Again and again.',
   clues:['Jade: "I have seen this before... This symbol, it looks like an ornament once carried by Elara Valor." Maris: "It appears in different forms, but the core design is always the same: a star and waves, with flowing wings."', 'Maris: "This seal does not belong to any current alliance, kingdom or merchant house that we can identify. Its style is much older, and the craftsmanship matches rare western records from several centuries ago."'], rw:{xp:196700, gold:41640}},
  {id:'hz290b', kind:'investigate', n:'The Erased Entry', icon:'📜', ch:290, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Two names.',
   clues:['The route log lists several western ports, but one place-name has been deliberately erased: the ink and handwriting match the other records. Another, "Valorian Reach", is not on any current navigation chart, but fits the pattern of the tampered routes.', 'Maris: "Whoever tampered with these records did not want this destination to be found."'], rw:{xp:197000, gold:41700}, needFlag:'inv_hz290a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz290c', kind:'investigate', n:'Adrian\'s Second Message', icon:'✉️', ch:290, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'A genuine mark.',
   clues:['Adrian: "The seal you found matches fragments I saw in the earlier archives. It also resembles symbols on the altered western records from Arc VIII. The craftsmanship is consistent with pre-alliance western sources, not modern forgeries."', 'Adrian: "This may be a genuine mark tied to an old house or lineage. I recommend comparing it with any personal items related to the Valor family. This may be the first real tie between your family and the missing western routes."'], rw:{xp:197300, gold:41760}, needFlag:'inv_hz290b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz290d', kind:'investigate', n:'A Mother\'s Ornament', icon:'🧿', ch:290, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'A memory of Elara.',
   clues:['Jade: "My mother Elara used to wear an ornament with this exact design: a star, waves and flowing wings. I was a child then, but I remember it clearly. It was not just a piece of jewellery. It must have been a symbol connected to the western sea."', 'Jade: "This is the first firm indication that the Valor bloodline may be connected to the missing western routes, and to whatever truth was erased from history."'], rw:{xp:197600, gold:41820}, needFlag:'inv_hz290c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz291a', kind:'investigate', n:'The Next Step', icon:'🧭', ch:291, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'To see it for themselves.',
   clues:['Jade: "Every record leads to the same direction. The missing place exists. And if it truly is connected to my mother\'s family, then I need to see it with my own eyes."', 'Rheon: "It will be more dangerous than our previous journeys. But we now have enough information to prepare properly. We should not underestimate what was erased from the maps."'], rw:{xp:197900, gold:41880}},
  {id:'hz291b', kind:'investigate', n:'Caution at Sea', icon:'⚠️', ch:291, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Uncharted waters.',
   clues:['Devon: "Uncharted waters mean unknown risks. We move carefully, watch for signs, and document everything. If there are others still using this route, we may not be the first to arrive."', 'The captain: "I can guide you as far as my family\'s records go. Beyond that, we will have to rely on the sea, and what you discover along the way."'], rw:{xp:198200, gold:41940}, needFlag:'inv_hz291a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz291c', kind:'investigate', n:'Charts and Supplies', icon:'📦', ch:291, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'A longer voyage.',
   clues:['Maris: "I have compared the tide charts with the Sunken Kingdom records. The currents, star positions and island formations match. We should be able to follow the route, but there may be shifting tides and areas that are difficult to navigate."', 'Levi: "We\'ll need additional supplies for a longer voyage: repair equipment, spare sails and extra rations. I will also recheck the ship before we leave."'], rw:{xp:198500, gold:42000}, needFlag:'inv_hz291b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz291d', kind:'investigate', n:'Setting Sail', icon:'⛵', ch:291, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'The Western Sea Route.',
   clues:['Maris: "There may be others who are interested in this route as well. We should expect competition, or worse: someone who wants these records to remain buried." Jade: "It is a risk I am willing to take."', 'Jade: "No matter what we find, this journey will bring us closer to the truth. We cannot change the past, but we can uncover it. And perhaps understand why it was hidden." The ship leaves Tribute\'s charted waters.'], rw:{xp:198800, gold:42060}, needFlag:'inv_hz291c', lockMsg:'🔒 Finish the previous clue first'},
);
LOCATIONS.old_trade_sea.spots.push(
  {id:'hz292a', kind:'investigate', n:'The Chain of Islets', icon:'🪨', ch:292, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Exactly as drawn.',
   clues:['The captain\'s chart: "According to the captain\'s chart, our next marker should be a chain of stone islets." There is nothing here on modern maps. Jade: "But there they are. The sea remembers. These islets match the descriptions in the old charts."', 'Maris: "The positions align with the Sunken Kingdom tide records. These markers were used to guide ships through shifting currents and hidden reefs. Someone removed them from modern charts, but the markers still exist."'], rw:{xp:199100, gold:42120}},
  {id:'hz292b', kind:'investigate', n:'The Split Rock', icon:'🪨', ch:292, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'A marker placed for a reason.',
   clues:['Rheon: "I can see the next marker ahead. A split rock formation, just as shown in the chart. The alignment is too precise to be a coincidence."', 'The old chart marks several stopping points before the next passage; each marker corresponds to a specific tide pattern and star position. The route is more complex than a straight path.'], rw:{xp:199400, gold:42180}, needFlag:'inv_hz292a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz292c', kind:'investigate', n:'Beneath the Water', icon:'🔱', ch:292, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Faint structures.',
   clues:['Levi: "There are faint structures beneath the water. They look like the remains of old beacons. They match the location in the chart exactly."', 'Maris: "Some of the old navigation towers are broken, but their foundations remain. These were placed with advanced knowledge of tides and sea routes. This is not a simple trade route. It was an important passage."'], rw:{xp:199700, gold:42240}, needFlag:'inv_hz292b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz292d', kind:'investigate', n:'The Deeper Passage', icon:'🧭', ch:292, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Further west.',
   clues:['Maris: "The tide notes mention a deeper passage after the next marker. It may lead to the location we are searching for. We should continue to the next point and verify it ourselves."', 'Jade: "We have followed the records this far. The next part of the route cannot be understood from an archive alone. We must continue and see what the sea will reveal."'], rw:{xp:200000, gold:42300}, needFlag:'inv_hz292c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz293a', kind:'investigate', n:'Lanterns Ahead', icon:'🏮', ch:293, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'A path across the water.',
   clues:['The captain: "There are more lanterns ahead. I have never seen anything like this on any modern chart." The lanterns seem to stretch for a great distance, as if marking a route.', 'Maris: "These are not ordinary lanterns. They look like ritual markers."'], rw:{xp:200300, gold:42360}},
  {id:'hz293b', kind:'investigate', n:'Offerings and Prayers', icon:'🐚', ch:293, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Shells and cloth.',
   clues:['Each lantern is tethered with shells, carved symbols and strips of cloth. Maris: "The craftsmanship is remarkably old. These motifs match a western maritime culture, but more ancient than the records we have."', 'Maris: "The symbols speak of tides, safe passage, returning souls and protection across the open sea." Devon: "We should remain cautious. This could be a ritual site, not just a navigation aid."'], rw:{xp:200600, gold:42420}, needFlag:'inv_hz293a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz293c', kind:'investigate', n:'The Same Star', icon:'⭐', ch:293, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'Again and again.',
   clues:['Maris: "The prayers are sincere. This place must still be sacred to someone." Rheon: "The same star and wave motifs appear again and again. They speak of guiding lost ships, of watching over travellers, and of those who depart but may one day return."', 'Jade: "These symbols feel familiar. I have never seen them before, and yet some part of me feels I have. It reminds me of stories my mother once told: fragments I thought I had forgotten."'], rw:{xp:200900, gold:42480}, needFlag:'inv_hz293b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz293d', kind:'investigate', n:'An Echo of Home', icon:'🌙', ch:293, need:2, ambush:[], lo:86, roles:['maris', 'levi', 'jade'],
   desc:'A home never seen.',
   clues:['Jade: "So many prayers... for safe passage, for those who are lost, and for those who return."', 'Jade: "I do not know this place. And yet these prayers stir something in me. Like an echo from a home I have never seen, but have always carried within me." The lanterns continue into the dark, lighting a path across waters forgotten by the world, but not by those who still remember.'], rw:{xp:201200, gold:42540}, needFlag:'inv_hz293c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz294a', kind:'investigate', n:'The Surviving Records', icon:'📚', ch:294, need:2, ambush:[], lo:86, roles:['sky', 'jade'],
   desc:'Not all were destroyed.',
   clues:['Jade: "These are the remaining merchant records from the western route, the ones that weren\'t destroyed. Let\'s go through every surviving document carefully."', 'Sky: "...Valen? There\'s a name here: a variation of Valen." Another note: "Look at this mark too. It\'s an older version of the Valen family seal."'], rw:{xp:201500, gold:42600}},
  {id:'hz294b', kind:'investigate', n:'Valen, 1183 A.R.', icon:'🔏', ch:294, need:2, ambush:[], lo:86, roles:['sky', 'jade'],
   desc:'Spices and dye.',
   clues:['The record reads: Valen. Cargo: spices, dye. Route: Western Sea. Port: Calvaris. Year: 1183 A.R. Maris: "The script style and ink composition are much older than the modern copies. This is a genuine record, likely from several centuries ago."', 'Maris: "The name is written as Valen instead of the modern form, but it refers to the same family."'], rw:{xp:201800, gold:42660}, needFlag:'inv_hz294a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz294c', kind:'investigate', n:'Yvette Sue Valen', icon:'🪞', ch:294, need:2, ambush:[], lo:86, roles:['sky', 'jade'],
   desc:'A mother on the route.',
   clues:['Jade: "Sky... this would be your mother\'s family, Yvette Sue Valen, right? This record places the Valen name on the western route. It means your mother and her family were connected to these maritime trade routes."', 'Sky: "So my mother\'s name was really here... Yvette Sue Valen was part of this. She wasn\'t just a name in our family history. Her name is in these merchant records."'], rw:{xp:202100, gold:42720}, needFlag:'inv_hz294b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz294d', kind:'investigate', n:'A Name Erased', icon:'❓', ch:294, need:2, ambush:[], lo:86, roles:['sky', 'jade'],
   desc:'Blurred, or replaced.',
   clues:['The harbourmaster: "Look at the later copies. The name is missing, blurred, or replaced with different text. It looks deliberate, as if someone tried to erase the Valen name from the records."', 'Sky: "But we still don\'t know what happened to her. This tells us she was connected to the western route, but her disappearance is still a mystery." Jade: "Your mother is part of a larger story, Sky. We\'re getting closer to the truth, even if we don\'t have all the answers yet."'], rw:{xp:202400, gold:42780}, needFlag:'inv_hz294c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz311a', kind:'investigate', n:'Sailing Home', icon:'⛵', ch:311, need:2, ambush:[], lo:86, roles:['devon', 'rheon', 'levi'],
   desc:'More questions than answers.',
   clues:['Jade: "As we sail home, I can\'t stop thinking about everything we learned... and everything we still don\'t know. The world is so much larger than I imagined."', 'Jade: "I keep Elara\'s symbol with me now. It feels like a reminder: not just of what was lost, but of what might still be possible."'], rw:{xp:221900, gold:46680}},
  {id:'hz311b', kind:'investigate', n:'Pieces, Not the Picture', icon:'🧩', ch:311, need:2, ambush:[], lo:86, roles:['devon', 'rheon', 'levi'],
   desc:'Closer than before.',
   clues:['Rheon: "We\'ve found pieces of the past, but not the whole picture. There are still places we can\'t reach, records we can\'t read, and meanings we can\'t fully grasp." Levi: "But we\'re closer than we were. There\'s still so much to explore."', 'Devon: "Knowledge like this doesn\'t disappear overnight. Someone, somewhere, must still remember more than we do. Our journey isn\'t over. It\'s just the beginning of a much longer road."'], rw:{xp:222200, gold:46740}, needFlag:'inv_hz311a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz311c', kind:'investigate', n:'Prepare', icon:'🛡️', ch:311, need:2, ambush:[], lo:86, roles:['devon', 'rheon', 'levi'],
   desc:'Not careless.',
   clues:['The captain: "We can\'t be careless. There are people who don\'t want this knowledge to surface. We need to prepare, train and build our connections before we go further."', 'Jade: "I look to the western horizon and wonder what lies beyond it. There are still so many mysteries, but I no longer feel lost. I know that one day we will return, when the time is right."'], rw:{xp:222500, gold:46800}, needFlag:'inv_hz311b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz311d', kind:'investigate', n:'Far Away', icon:'📜', ch:311, need:2, ambush:[], lo:86, roles:['devon', 'rheon', 'levi'],
   desc:'News travels quietly.',
   clues:['Far away, in a place beyond the western seas, news travels quietly. Someone learns that a daughter of the Valor line has begun searching. The news does not surprise them. It only confirms what they have been expecting.', 'The hooded figure: "The game is moving again. And the next time they meet... the world may no longer be the same."'], rw:{xp:222800, gold:46860}, needFlag:'inv_hz311c', lockMsg:'🔒 Finish the previous clue first'},
);
LOCATIONS.frontier_port.spots.push(
  {id:'hz295a', kind:'investigate', n:'A Port Not on the Charts', icon:'⚓', ch:295, need:2, ambush:[], lo:86, roles:['levi', 'devon', 'maris'],
   desc:'Older charts and a blank modern map.',
   clues:['Maris: "This place is definitely on older charts. But modern maps leave it blank. The layout matches the coastal markers from the Forgotten Alliance materials. Yet according to Tribute\'s current records, this harbour was never an official port."', 'Rheon: "Their local history mentions trade with western isles and seasonal fleets. But Tribute\'s archive lists this region as uninhabited waters during the same period."'], rw:{xp:202700, gold:42840}},
  {id:'hz295b', kind:'investigate', n:'What the Locals Say', icon:'🧓', ch:295, need:2, ambush:[], lo:86, roles:['levi', 'devon', 'maris'],
   desc:'Centuries of sailing.',
   clues:['The old sailor: "Of course this is a port. It has been a port for centuries. My father and his father sailed from here. What kind of official record says we do not exist?"', 'Devon: "The city records here include tax ledgers, ship manifests and harbour regulations. They are detailed enough to be genuine. Someone deliberately removed this port from the official routes."'], rw:{xp:203000, gold:42900}, needFlag:'inv_hz295a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz295c', kind:'investigate', n:'The Mural and the Banner', icon:'🏴', ch:295, need:2, ambush:[], lo:86, roles:['levi', 'devon', 'maris'],
   desc:'The same symbol.',
   clues:['Jade: "This mural shows ships sailing further west. The same symbol appears on Elara Valor\'s ornament, and in the documents we found." Even the harbour banner uses a similar design, a crescent and a star.', 'Jade: "But this emblem does not appear in modern Tribute or Dragonvale records."'], rw:{xp:203300, gold:42960}, needFlag:'inv_hz295b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz295d', kind:'investigate', n:'Two Histories', icon:'📚', ch:295, need:2, ambush:[], lo:86, roles:['levi', 'devon', 'maris'],
   desc:'Collect what remains.',
   clues:['Jade: "So this port was real. People lived here, traded here... And yet history erased it. Why would someone hide an entire harbour?"', 'Maris: "We will stay here and collect as many local records as we can. We need to understand why this place was removed from the charts... and who wanted it forgotten."'], rw:{xp:203600, gold:43020}, needFlag:'inv_hz295c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz296a', kind:'investigate', n:'Private Ledgers', icon:'📒', ch:296, need:2, ambush:[], lo:86, roles:['levi', 'devon', 'maris'],
   desc:'Kept by the merchant families.',
   clues:['The captain: "These are private ledgers kept by the merchant families. They continued to record what they saw, even after the official records were changed." Jade: "The dates and routes match the fragments we found earlier. The forgotten alliance did not end at the islands shown in modern maps."', 'The ledgers show routes continuing much farther west. Rheon: "These merchant families kept trading, sharing ports and exchanging markers well beyond what Tribute recognises today."'], rw:{xp:203900, gold:43080}},
  {id:'hz296b', kind:'investigate', n:'Names, Agreements, Symbols', icon:'🔤', ch:296, need:2, ambush:[], lo:86, roles:['levi', 'devon', 'maris'],
   desc:'A wider network.',
   clues:['The ledgers include family names, port agreements and shared symbols: Valen, Sue, Trader\'s Union, Westward Route, Shared Port, Stone Marker, Seasonal Fleet. The same mark appears in different forms, highlighting a wider collection of allied ports.', 'Rheon: "This explains why the same symbols appear in different places. The alliance was a network, not a single route or region." Devon: "So the forgotten alliance was still active much longer than anyone admitted."'], rw:{xp:204200, gold:43140}, needFlag:'inv_hz296a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz296c', kind:'investigate', n:'Why They Hid Them', icon:'🗝️', ch:296, need:2, ambush:[], lo:86, roles:['levi', 'devon', 'maris'],
   desc:'Trust.',
   clues:['The captain: "We kept these copies hidden because we did not know who to trust. Many families feared that the routes would be erased from history if the wrong people found them."', 'Jade: "These merchants kept more than trade records. They preserved a history that others tried to erase."'], rw:{xp:204500, gold:43200}, needFlag:'inv_hz296b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz296d', kind:'investigate', n:'Ports Not on Any Map', icon:'🗺️', ch:296, need:2, ambush:[], lo:86, roles:['levi', 'devon', 'maris'],
   desc:'Details too specific.',
   clues:['The ledgers also describe western ports, their customs and navigation markers. Some of these places never appear on modern maps, but the details are too specific to be made up.', 'Maris: "This means the alliance connected more kingdoms, more islands and more people than we realised. These records help us understand why certain symbols, prayers and trade markers still exist today."'], rw:{xp:204800, gold:43260}, needFlag:'inv_hz296c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz307a', kind:'investigate', n:'A Different Vision', icon:'🌙', ch:307, need:2, ambush:[], lo:86, roles:['jade', 'sky', 'rheon'],
   desc:'It looks back.',
   clues:['Jade: "At first, it feels like a normal vision... but then I realise this is different. The figure in the vision looks towards me. This isn\'t just a memory or a fragment of the past. She sees me... and she responds."', 'Jade: "Her eyes are aware. She knows I am here."'], rw:{xp:217100, gold:45720}},
  {id:'hz307b', kind:'investigate', n:'A Conversation Without Words', icon:'💬', ch:307, need:2, ambush:[], lo:86, roles:['jade', 'sky', 'rheon'],
   desc:'Both ways.',
   clues:['Jade: "She reaches out, as if trying to show me something... and I can feel her emotions: worry, urgency, and familiarity. It feels like a conversation without words: thoughts, images and feelings flowing both ways."', 'Jade: "I\'ve never had a vision like this before. It\'s no longer one-sided. Someone is looking back."'], rw:{xp:217400, gold:45780}, needFlag:'inv_hz307a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz307c', kind:'investigate', n:'After the Vision', icon:'📖', ch:307, need:2, ambush:[], lo:86, roles:['jade', 'sky', 'rheon'],
   desc:'New elements.',
   clues:['Jade: "When the vision ends, I wake with a sharp headache and a lingering sense of her presence. It feels too real to be just a dream. The details match certain older records... but there are new elements that I have never seen before. It seems she was trying to show me something important."', 'Devon: "This means your visions are not just passive flashes of the past. Someone, or something, is trying to reach you on purpose."'], rw:{xp:217700, gold:45840}, needFlag:'inv_hz307b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz307d', kind:'investigate', n:'Careful, Closer', icon:'⚠️', ch:307, need:2, ambush:[], lo:86, roles:['jade', 'sky', 'rheon'],
   desc:'Rare and dangerous.',
   clues:['Rheon: "If she can respond now, there may be more we can learn through your visions. But we should also be careful. This could mean we are getting closer to something that has been hidden for a long time."', 'The captain: "Someone reaching out through a vision is rare and dangerous. It suggests the truth is trying to surface... but there will also be those who do not want it to be revealed." Jade\'s new vision confirms that she is not only seeing the past. She is being contacted, and guided, for a reason.'], rw:{xp:218000, gold:45900}, needFlag:'inv_hz307c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz310a', kind:'investigate', n:'Adding the Routes', icon:'🗺️', ch:310, need:2, ambush:[], lo:86, roles:['devon', 'rheon', 'levi'],
   desc:'Recovered from the western records.',
   clues:['Jade: "These are the routes we recovered from the western records. They connect to ports, sanctuaries and kingdoms we didn\'t know. Some are clear, but many are still unnamed."', 'Rheon: "This changes a lot of things. There are sanctuaries and mystic houses we never knew existed. But look: some routes are still incomplete. And some places are marked as inaccessible."'], rw:{xp:220700, gold:46440}},
  {id:'hz310b', kind:'investigate', n:'Not Easy to Reach', icon:'🚧', ch:310, need:2, ambush:[], lo:86, roles:['devon', 'rheon', 'levi'],
   desc:'Permission, guards, sealed.',
   clues:['The elder: "The western routes suggest there are more kingdoms, trading networks and protected sanctuaries. But they are not easy to reach. Some require permission, some are closely guarded, and others may still be closed to us. We need more information before we can plan further."', 'On the old parchments: Possible Sanctuary? (bloodline link). Unnamed Kingdom (records incomplete). Route uncertain (dangerous waters?). Region sealed (for now).'], rw:{xp:221000, gold:46500}, needFlag:'inv_hz310a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz310c', kind:'investigate', n:'Unnamed Places', icon:'❓', ch:310, need:2, ambush:[], lo:86, roles:['devon', 'rheon', 'levi'],
   desc:'Important later.',
   clues:['Devon: "These unnamed places could be important later. Some might be linked to the Valor lineage, Dima\'s teachings, or even the missing records in the Register. It makes sense that access is limited. We should focus on the routes we can use first, and gather more clues about the rest."', 'Levi: "Even with the unknowns, this gives us more options. More people to meet, more places to go, and more chances to learn about the past. It feels like the start of a larger journey."'], rw:{xp:221300, gold:46560}, needFlag:'inv_hz310b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz310d', kind:'investigate', n:'A Larger World', icon:'🌍', ch:310, need:2, ambush:[], lo:86, roles:['devon', 'rheon', 'levi'],
   desc:'Only the beginning.',
   clues:['Jade: "It\'s strange... but also exciting. For so long, Tribute felt like the centre of our world. Now I can see how much more there is beyond this island. There are still many places we can explore in the future."', 'For now, they will keep these maps safe and continue preparing. The map now shows a much larger world than Jade once imagined. And this is only the beginning.'], rw:{xp:221600, gold:46620}, needFlag:'inv_hz310c', lockMsg:'🔒 Finish the previous clue first'},
);
LOCATIONS.western_road.spots.push(
  {id:'hz297a', kind:'investigate', n:'A Different Road', icon:'🐪', ch:297, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Familiar, somehow.',
   clues:['Jade: "The architecture and patterns here feel different... but somehow still familiar." A caravan passes. Maris: "These caravans come from the Western Regions. They trade in spices, dyes, star charts and rare goods not found on Tribute."', 'The captain: "This road has been used for generations. Caravans from many kingdoms pass through, some recorded, many not."'], rw:{xp:205100, gold:43320}},
  {id:'hz297b', kind:'investigate', n:'Fabrics and Colours', icon:'🧵', ch:297, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Elara\'s patterns.',
   clues:['Levi: "Look at these fabrics. The patterns and colours are unlike anything in Tribute. These designs match some of the items we found in Elara\'s documents."', 'Jade: "These motifs... I have seen similar patterns before. They are the same as the ones Elara used to wear."'], rw:{xp:205400, gold:43380}, needFlag:'inv_hz297a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz297c', kind:'investigate', n:'Shrines of the Stars', icon:'🔭', ch:297, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Rites for the sky.',
   clues:['Rheon: "The celestial symbols here are also different. But the star motifs are similar to the ones on Elara\'s ornament." Star charts, celestial shrines and sky-related rites are common here; the people revere the stars and the paths between worlds.', 'Devon: "Jade, your connection to this place is not just through records. It seems to be part of your family\'s history."'], rw:{xp:205700, gold:43440}, needFlag:'inv_hz297b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz297d', kind:'investigate', n:'Record Everything', icon:'📝', ch:297, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Following the trace.',
   clues:['Maris: "These are local rites to honour the stars. The rituals are unfamiliar, but they share elements with the traditions mentioned in Elara\'s notes. We should record everything we see. These cultural details, trade routes and celestial symbols may help us understand Elara\'s true origins."', 'Jade: "The more we see, the more pieces start to fit together. My mother\'s heritage reaches further than anyone realised."'], rw:{xp:206000, gold:43500}, needFlag:'inv_hz297c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz298a', kind:'investigate', n:'A Familiar Shrine', icon:'⛩️', ch:298, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Something about this place.',
   clues:['Jade: "Something about this place feels familiar. I don\'t know why, but it feels like I have been here before." The symbols are different, but some elements look similar to Elara\'s ornament.', 'Jade: "As soon as I see this shrine, the words just come to me... I don\'t remember learning this consciously. But it feels right."'], rw:{xp:206300, gold:43560}},
  {id:'hz298b', kind:'investigate', n:'The Prayer', icon:'🙏', ch:298, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Words from childhood.',
   clues:['Jade: "By the stars that guide the wandering home... by the roads that remember our names... keep those we love beyond the horizon..." She stops, realising she already knows the next part.', 'Jade: "These are words from my childhood. My mother\'s voice..." Her mother used to say a prayer like this when she was a child: always at night, looking at the stars. "I never paid enough attention to remember it properly."'], rw:{xp:206600, gold:43620}, needFlag:'inv_hz298a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz298c', kind:'investigate', n:'Where Did You Learn It?', icon:'❓', ch:298, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Fragments that stay.',
   clues:['Devon: "You said the words without hesitation. Are you sure you never learned it properly?" Jade: "I don\'t know. It just came to me when I saw this shrine."', 'Rheon: "This is more than a coincidence. Your mother\'s heritage is connected to this culture. These prayers, these symbols, they are part of your family history." The captain: "People carry more than memories. Fragments like this can stay with you even when the rest is lost."'], rw:{xp:206900, gold:43680}, needFlag:'inv_hz298b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz298d', kind:'investigate', n:'A Piece of Who I Am', icon:'🌠', ch:298, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'More waiting to be found.',
   clues:['Jade: "So this prayer... it\'s a piece of who I am. And of my mother\'s world. There are still parts of my heritage waiting to be found."', 'Jade: "The more we travel, the more I feel like there are pieces of my past scattered along these roads. Maybe this is why I can recognise some things. Because a part of me still remembers, even if I don\'t."'], rw:{xp:207200, gold:43740}, needFlag:'inv_hz298c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz299a', kind:'investigate', n:'A Symbol Passed Down', icon:'🏅', ch:299, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Seen in many years.',
   clues:['The elder: "That mark... I have not seen it in many years. It is not a common symbol in this region, but it is known." Jade: "It was passed down in my family... but I was never told much about it."', 'The elder: "This is the Valor mark. It belongs to an old mystic lineage, known across many regions beyond Tribute. They were scholars, seers and guardians: people who walked between worlds and carried knowledge across kingdoms."'], rw:{xp:207500, gold:43800}},
  {id:'hz299b', kind:'investigate', n:'Under Different Names', icon:'📜', ch:299, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Known in many lands.',
   clues:['Jade: "Valor... I have heard this name before, in stories and prayers. But I never knew it was linked to my family. So this mark is part of a lineage, not just a personal ornament?"', 'The old maps show the compass emblem in different forms. The elder: "The Valor lineage was known in many lands, with different titles, different languages. But the symbol remains similar: guidance, protection, and the connection between people and the stars."'], rw:{xp:207800, gold:43860}, needFlag:'inv_hz299a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz299c', kind:'investigate', n:'A Responsibility', icon:'🌟', ch:299, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'A bridge.',
   clues:['The elder: "The name Valor is still respected in some places, though much of their history has been lost or deliberately hidden. The fact that you carry this mark means your family is part of that lineage, whether you were told or not."', 'The elder: "It is a responsibility, but also a bridge to people and knowledge that may still exist today."'], rw:{xp:208100, gold:43920}, needFlag:'inv_hz299b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz299d', kind:'investigate', n:'Others of the Lineage', icon:'🧭', ch:299, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Who might remember.',
   clues:['Levi: "Does this mean there might still be other people from the same lineage?" The elder: "People who kept their own records... and who might know more about what happened."', 'Rheon: "This also explains why Jade\'s mark matches some of the trade and alliance records we found. The network must have been much wider than anyone realised." Jade: "I want to learn more. Not just for myself, but for everyone who was part of this lineage."'], rw:{xp:208400, gold:43980}, needFlag:'inv_hz299c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz300a', kind:'investigate', n:'The Open Sky', icon:'🌌', ch:300, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'A people who watched the stars.',
   clues:['The elder: "Among the Valor, there were always a few born with a deeper sensitivity. Children who could feel what others could not. They saw dreams more clearly, heard the voices of spirits, and understood signs in the sky."', 'Jade: "So people like me have existed long before Dima? My visions are not something new, born only from Dima?"'], rw:{xp:208700, gold:44040}},
  {id:'hz300b', kind:'investigate', n:'Bridge-Walkers', icon:'🌉', ch:300, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Between worlds.',
   clues:['The elder: "Our records describe them as bridge-walkers: people who could sense the boundary between worlds more easily than others. They were companions to seers, mediators, and sometimes keepers of dangerous knowledge."', 'The same symbols appear here: the star, the stag and the three flowing lines. They represent the three: dreams, spirits and the signs of the sky.'], rw:{xp:209000, gold:44100}, needFlag:'inv_hz300a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz300c', kind:'investigate', n:'A Responsibility', icon:'⚖️', ch:300, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Not power for its own sake.',
   clues:['The Valor people believed these gifts were a responsibility, not just personal power: to protect the balance between worlds and the people who live in them.', 'Rheon: "This explains why your visions feel different from ordinary divination. They are part of a much older lineage, with its own traditions and knowledge."'], rw:{xp:209300, gold:44160}, needFlag:'inv_hz300b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz300d', kind:'investigate', n:'Older Than Tribute', icon:'✨', ch:300, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'An inheritance.',
   clues:['Devon: "It also means others like you may still exist in other regions, under different names. And those who fear this sensitivity may have tried to erase the records many times." Levi: "Does this mean your connection to Dima is part of a longer history? Maybe Dima is just one part of a much older story, not the beginning of it."', 'Jade: "So my dreams... my visions... they come from something older than I am. Older than Tribute. I am part of a lineage that has watched the same stars for generations."'], rw:{xp:209600, gold:44220}, needFlag:'inv_hz300c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz301a', kind:'investigate', n:'Branches Across Kingdoms', icon:'🌳', ch:301, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'The lineage did not remain in one place.',
   clues:['The elder: "The lineage did not remain in one place. Over generations, it divided into branches and spread across many kingdoms. These were like sister branches, connected by blood and tradition, but living under different names, different kingdoms, and sometimes different customs."', 'Jade: "So Elara Valor and Yvette Sue Valen could be from different branches... but still part of the same lineage? That would explain why some symbols, stories and prayers feel familiar."'], rw:{xp:209900, gold:44280}},
  {id:'hz301b', kind:'investigate', n:'The Known Branches', icon:'🗺️', ch:301, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Linked to different kingdoms.',
   clues:['The records show several known branches (Valor, Valen and others), each linked to different kingdoms. They kept contact through trade, shared shrines and the same celestial markers, even when they were far apart.', 'Some branches travelled west with the caravans, establishing families in frontier cities. Others settled in island kingdoms, marrying into local noble houses. Others remained in central kingdoms, where they became scholars, seers or royal advisors. All of them still honoured the same stars and shared certain rites.'], rw:{xp:210200, gold:44340}, needFlag:'inv_hz301a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz301c', kind:'investigate', n:'Different Names', icon:'🔤', ch:301, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'Recorded differently.',
   clues:['Rheon: "The different names are likely due to the kingdoms they settled in, and the families they married into. Over time the same lineage would be recorded differently in each place." Devon: "That means Elara Valor and Yvette Sue Valen could be related... even if their records were kept separately or under different names."', 'Levi: "It also explains why some records were altered. If the branches were spread across many kingdoms, it would be easier for parts of the history to be hidden or rewritten."'], rw:{xp:210500, gold:44400}, needFlag:'inv_hz301b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz301d', kind:'investigate', n:'Not One Place, One Story', icon:'🌍', ch:301, need:2, ambush:[], lo:86, roles:['jade', 'rheon', 'devon'],
   desc:'A lineage across kingdoms.',
   clues:['Jade: "So I\'m not just connected to one place or one story. My visions, the symbols, the prayers... they are part of a much older lineage that spans many kingdoms. This gives me a clearer understanding of who Elara and Yvette Sue might be, and why my dreams feel like they have always existed."', 'The scattered branches explain how Elara Valor and Yvette Sue Valen could belong to related but differently named family lines. It also hints that the true history of the lineage is far older, wider and more interconnected than the current records reveal.'], rw:{xp:210800, gold:44460}, needFlag:'inv_hz301c', lockMsg:'🔒 Finish the previous clue first'},
);
LOCATIONS.western_archive.spots.push(
  {id:'hz302a', kind:'investigate', n:'The Record That Should Not Exist', icon:'🏛️', ch:302, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Destroyed years ago.',
   clues:['Jade: "This archive should not have this record. According to the international Register, these files were altered years ago. They were supposed to be destroyed. But here it is, still kept in a western archive."', 'The record matches the details found in the earlier records.'], rw:{xp:211100, gold:44520}},
  {id:'hz302b', kind:'investigate', n:'The Valen Entry', icon:'📖', ch:302, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Trade, route, rites.',
   clues:['The entry includes the Valen name, the same trade alliance and references to eastern territories. These details have been removed from all official and linked archives.', 'The entry reads: Valen. Trade Alliance. Western Route. Celestial Goods. Envoys. Shared Rites.'], rw:{xp:211400, gold:44580}, needFlag:'inv_hz302a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz302c', kind:'investigate', n:'The Same Hand', icon:'🖋️', ch:302, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Distinctive strokes.',
   clues:['Jade: "Look at this handwriting. It\'s the same unknown hand we saw in the previous records: the same style, the same distinctive strokes." Devon: "This suggests the same person was involved."', 'Rheon: "They altered the official Register, but kept certain records in secret archives like this one. They must have had a reason to preserve them."'], rw:{xp:211700, gold:44640}, needFlag:'inv_hz302b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz302d', kind:'investigate', n:'Someone Watching', icon:'👁️', ch:302, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Preserved on purpose.',
   clues:['The record also mentions additional routes farther west than Tribute and Dragonvale currently recognise. It lists envoys, cargo and shared ceremonies with multiple kingdoms: details that should not exist in any surviving official copy.', 'Jade: "The same hand... again. It feels like someone has been watching over these records from the shadows. They didn\'t just hide the truth. They made sure some of it would still be found."'], rw:{xp:212000, gold:44700}, needFlag:'inv_hz302c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz303a', kind:'investigate', n:'Dima\'s Name Here', icon:'📜', ch:303, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'In foreign archives.',
   clues:['Jade: "Dima\'s name is actually here... Not just in our family records, but in foreign archives as well. I didn\'t expect to see this."', 'The record is headed "Dima: The Star-Witch". It mentions Dima as a teacher, a guide and a guardian, not a lone hermit. She is connected to the Valor lineage and their early traditions.'], rw:{xp:212300, gold:44760}},
  {id:'hz303b', kind:'investigate', n:'Teacher and Guardian', icon:'🌙', ch:303, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Shared knowledge.',
   clues:['Rheon: "So Dima was known beyond Tribute. This means her influence reached many kingdoms. She wasn\'t just a figure from our island\'s hidden history."', 'The record describes how Dima shared knowledge of dreams, spirits and the stars with the early Valor people, helping to establish their protective rites and guides.'], rw:{xp:212600, gold:44820}, needFlag:'inv_hz303a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz303c', kind:'investigate', n:'One of Many Mentors', icon:'🌟', ch:303, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'A wider network.',
   clues:['Dima is described as one of the foundational mentors who worked with the early Valor ancestors, passing down methods to interpret dreams, read the stars and protect the balance between worlds. Her name is recorded alongside other respected seers and scholars from different kingdoms.', 'The record lists several regions where her teachings spread: some of the same kingdoms that later held branches of the Valor lineage.'], rw:{xp:212900, gold:44880}, needFlag:'inv_hz303b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz303d', kind:'investigate', n:'Not Isolated', icon:'🔮', ch:303, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'A tradition older than Jade.',
   clues:['The elder: "This confirms that Dima was a real historical figure, recognised by multiple kingdoms. She was not an isolated witch like the old stories suggested. Her teachings shaped more than just our family: they influenced an entire lineage."', 'Jade: "So my visions... they didn\'t start with me. They are part of a much older tradition. Dima\'s knowledge has been passed down for generations through the Valor lineage." Devon: "What we thought was a hidden or forgotten story is actually part of a much larger history."'], rw:{xp:213200, gold:44940}, needFlag:'inv_hz303c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz304a', kind:'investigate', n:'The Divergent Branch', icon:'📕', ch:304, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'A different path.',
   clues:['The elder: "This section records a branch that turned away from the older teachings. Their path was very different." Jade: "The wording here... it sounds familiar. They rejected the teachings of Dima... and focused on control, dominance and extracting power from others."', 'The document describes a branch that gradually abandoned the original balance, choosing instead to pursue coercive magic, manipulation and the binding of spirits. The language is very similar to later records about Xima and her followers.'], rw:{xp:213500, gold:45000}},
  {id:'hz304b', kind:'investigate', n:'Power Taken, Not Shared', icon:'🩸', ch:304, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Fear and suffering.',
   clues:['The elder: "They believed power should be taken, not shared. They practised rituals to bind spirits, control others, and draw strength through fear and suffering. Over time, they became increasingly isolated from the main lineage."', 'Several terms used in this record, such as shadow binding, blood oaths and the red sigil, match descriptions found in later accounts of the Xima tradition. It strongly suggests that Xima\'s followers were descended from this branch.'], rw:{xp:213800, gold:45060}, needFlag:'inv_hz304a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz304c', kind:'investigate', n:'Not One Person', icon:'🌑', ch:304, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'A tradition before her.',
   clues:['Devon: "So Xima wasn\'t just a single person... She continued a tradition that started long before her." Rheon: "They must have used a different name in the early days. But the methods, the symbols and the ideology are the same."', 'The document describes how this branch developed coercive rites, used blood contracts, and sought to control both spirits and people across multiple regions. It mentions that their influence spread through secret networks, eventually forming cells in different kingdoms.'], rw:{xp:214100, gold:45120}, needFlag:'inv_hz304b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz304d', kind:'investigate', n:'A Lineage That Split', icon:'✂️', ch:304, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Why the records changed.',
   clues:['Levi: "And it explains why the records were altered afterwards. Someone wanted to erase this connection... to separate Xima from the wider lineage."', 'Jade: "This shows how easily a lineage can split. The same blood, the same knowledge, but used in completely different ways. It makes me wonder what else has been hidden from the records." The truth of the lineage is more complex than the simplified version in the official Register.'], rw:{xp:214400, gold:45180}, needFlag:'inv_hz304c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz305a', kind:'investigate', n:'The Common Ancestry', icon:'🌳', ch:305, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Two paths, one root.',
   clues:['Jade: "So Dima and Xima are not completely unrelated... They come from the same older ancestry. They chose different paths with the same foundational knowledge."', 'The records suggest that Dima and Xima emerged from related mystical ancestry: two paths that diverged over time, shaped by different beliefs, choices and interpretations of the same original teachings.'], rw:{xp:214700, gold:45240}},
  {id:'hz305b', kind:'investigate', n:'Protection or Control', icon:'⚖️', ch:305, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Same foundation.',
   clues:['Devon: "The same roots... but completely different beliefs and methods. They started from the same foundation, but one path turned towards protection and the other towards control. It explains why some of the symbols and rituals are so similar."', 'Dima: guidance, protection, balance, shared knowledge. Xima: control, coercion, domination, binding of spirits. The two paths share the same ancestral roots, but their interpretations, methods and goals became increasingly different over generations.'], rw:{xp:215000, gold:45300}, needFlag:'inv_hz305a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz305c', kind:'investigate', n:'What the Valor Kept', icon:'🔏', ch:305, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Fragments of the older tradition.',
   clues:['The elder: "The Valor lineage preserved fragments of the older tradition. They kept the parts that focused on balance, guidance and protection. That is why their rituals, signs and star teachings still resemble the Dima tradition."', 'Rheon: "This also explains why some of the Valor records were targeted and altered. Those fragments would prove that Xima did not appear in isolation. Someone wanted to erase the connection between the two paths."'], rw:{xp:215300, gold:45360}, needFlag:'inv_hz305b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz305d', kind:'investigate', n:'Many Branches in Between', icon:'🌍', ch:305, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'The truth is more complex.',
   clues:['Jade: "So my visions... the symbols... they make sense now. They come from an older lineage that existed long before Tribute. Dima was not just an isolated ancient witch. Her teachings live on through the Valor people and others who kept parts of the tradition."', 'Understanding the shared ancestry gives Jade a new perspective: Dima and Xima are not separate origins, but two paths shaped by choice, belief and time. One blood, two paths, and many branches in between.'], rw:{xp:215600, gold:45420}, needFlag:'inv_hz305c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz306a', kind:'investigate', n:'Whole Lineages', icon:'📚', ch:306, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Not just names.',
   clues:['Jade: "They didn\'t just hide alliances... They removed whole bloodlines from the official Register. It\'s like these people never existed." Devon: "Entire sections were deliberately erased. Not just individual names."', 'The Altered Register: Valor Lineage (travelling branch), Celestial Houses (western regions), Cross-Border Oaths and Obligations, Allied Mystic Houses and Guides, Travelling Bloodlines (recorded routes). In the current Register each is blacked out.'], rw:{xp:215900, gold:45480}},
  {id:'hz306b', kind:'investigate', n:'Obligations Erased', icon:'⚖️', ch:306, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Rights and claims.',
   clues:['Devon: "The Register used to record obligations between kingdoms, including protection for travelling families and mystic houses. Removing these records would make it easier to ignore those obligations."', 'The elder: "These records once recognised travelling bloodlines: people who moved between kingdoms but were still protected under old agreements. Without the records, they can be treated as outsiders with no rights or claims. It also hides the network of mystic houses that supported them."'], rw:{xp:216200, gold:45540}, needFlag:'inv_hz306a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz306c', kind:'investigate', n:'Obscured Routes', icon:'🗺️', ch:306, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Families gone from the records.',
   clues:['Levi: "Look, even the trade routes linked to these bloodlines have been partially obscured. Some places are still listed, but the families who maintained the routes are gone from the records."', 'Rheon: "This explains why some kingdoms now deny responsibility for travellers. If the Register no longer shows the old agreements, they can claim those obligations never existed."'], rw:{xp:216500, gold:45600}, needFlag:'inv_hz306b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz306d', kind:'investigate', n:'A Rewritten History', icon:'✒️', ch:306, need:2, ambush:[], lo:86, roles:['devon', 'maris', 'jade'],
   desc:'Control.',
   clues:['By erasing these records, the current powers could rewrite history, weaken old protections and make it easier to control people, trade and access to knowledge.', 'What was erased from the Register did more than hide political allies. It severed the memory of an entire network of people who once connected kingdoms, cultures and traditions across borders. Recovering these lost records could restore forgotten obligations, reveal hidden routes and bring long-buried histories back to light. It confirms that the truth about the Valor lineage, Dima and Xima has been deliberately fragmented for generations.'], rw:{xp:216800, gold:45660}, needFlag:'inv_hz306c', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz308a', kind:'investigate', n:'One Lineage', icon:'🌳', ch:308, need:2, ambush:[], lo:86, roles:['jade', 'sky', 'rheon'],
   desc:'Not two things.',
   clues:['Jade: "So my visions and Dima\'s magic are connected... They are not two separate things. They both come from the same lineage?" Rheon: "The records show that the Valor people understood both the mystic and the celestial. Their sight, rituals and magic were meant to work together. What survived in you is a fragment of the original knowledge."', 'The Valor Lineage (the original source) branches into Ancestral Teachings (stars, dreams, guidance), Dima\'s Tradition (protection, healing, balance) and Xima\'s Tradition (control, coercion, binding).'], rw:{xp:218300, gold:45960}},
  {id:'hz308b', kind:'investigate', n:'Two Expressions, One Origin', icon:'☯️', ch:308, need:2, ambush:[], lo:86, roles:['jade', 'sky', 'rheon'],
   desc:'Sight and magic.',
   clues:['The elder: "The Valor lineage had a gift for seeing beyond the visible world. Their descendants could dream, receive signs, and sense spiritual currents. At the same time, they also practised the kind of magic now associated with Dima."', 'Two Expressions, One Origin: Psychic Sight (dreams, visions, celestial signs, spiritual awareness) and Dima-Linked Magic (protection, healing, balance, magic resistance).'], rw:{xp:218600, gold:46020}, needFlag:'inv_hz308a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz308c', kind:'investigate', n:'Why It Felt Different', icon:'🔮', ch:308, need:2, ambush:[], lo:86, roles:['jade', 'sky', 'rheon'],
   desc:'An inherited sight.',
   clues:['Devon: "That explains why your visions always felt different from ordinary prophetic dreams. They are not random flashes. They are part of an inherited sight. And your ability to resist certain magic also comes from the same source."', 'Jade: "So what I experience is not an accident... It means the Valor people were more than just a group of mystics. They left behind a lineage that combined sight, knowledge, and protective magic."'], rw:{xp:218900, gold:46080}, needFlag:'inv_hz308b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz308d', kind:'investigate', n:'A Threat to Be Erased', icon:'🛡️', ch:308, need:2, ambush:[], lo:86, roles:['jade', 'sky', 'rheon'],
   desc:'Guardians.',
   clues:['The surviving texts describe the Valor lineage as guardians who used both their sight and their magic to guide, protect and maintain balance across kingdoms and between worlds. What remains in Jade is a rare continuation of that heritage.', 'Levi: "It also explains why so many people wanted to control or erase the Valor lineage. A lineage with both vision and this kind of magic would be seen as a threat. Which is why the records were altered so thoroughly." Jade begins to see that her path is part of a much larger legacy.'], rw:{xp:219200, gold:46140}, needFlag:'inv_hz308c', lockMsg:'🔒 Finish the previous clue first'},
);
LOCATIONS.sealed_sanctuary.spots.push(
  {id:'hz309a', kind:'investigate', n:'The Sanctuary', icon:'🏰', ch:309, need:2, ambush:[], lo:86, roles:['jade', 'sky', 'rheon'],
   desc:'Hidden from most of the world.',
   clues:['The party reaches a sealed sanctuary in the western lands, a place tied to the Valor lineage, hidden from most of the world. Jade: "It feels different from the other places I\'ve seen. It\'s like it\'s acknowledging me... But at the same time, it won\'t open."', 'Rheon: "The sanctuary recognises your blood, Jade. The symbols are reacting to you. But the door remains sealed on purpose."'], rw:{xp:219500, gold:46200}},
  {id:'hz309b', kind:'investigate', n:'The Door Responds', icon:'🚪', ch:309, need:2, ambush:[], lo:86, roles:['jade', 'sky', 'rheon'],
   desc:'Stars, moon and roots.',
   clues:['The sanctuary responds to Jade\'s presence, confirming her connection to the Valor bloodline. Ancient symbols of stars, the moon and roots activate, but a protective seal remains in place.', 'The elder: "This is not a place for ordinary visitors. It safeguards knowledge and power from the older Valor lineage. Refusing your entry does not mean rejection. It means you are not yet ready to inherit what lies within."'], rw:{xp:219800, gold:46260}, needFlag:'inv_hz309a', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz309c', kind:'investigate', n:'Not Yet', icon:'⏳', ch:309, need:2, ambush:[], lo:86, roles:['jade', 'sky', 'rheon'],
   desc:'The risks of opening too soon.',
   clues:['Devon: "It senses your potential... and the risks of opening too soon. Whatever is inside must be important enough to keep sealed even from you for now."', 'The records suggest that the sanctuary preserves key parts of the Valor Bloodline: wisdom, lineage records and teachings that could change the understanding of both Dima and Xima\'s origins. For now, the door stays closed.'], rw:{xp:220100, gold:46320}, needFlag:'inv_hz309b', lockMsg:'🔒 Finish the previous clue first'},
  {id:'hz309d', kind:'investigate', n:'We Will Return', icon:'🌟', ch:309, need:2, ambush:[], lo:86, roles:['jade', 'sky', 'rheon'],
   desc:'A long-term goal.',
   clues:['Jade: "So the knowledge is still there... It hasn\'t been destroyed. I just need to become stronger, and learn more, before I can return." Levi: "This means the full story of the Valor bloodline is larger than we thought. There\'s still much we don\'t know, and more for us to uncover later." The party: "We\'ll come back when the time is right."', 'This experience confirms that Jade is part of that ancient lineage, and gives the party a new long-term goal to work towards.'], rw:{xp:220400, gold:46380}, needFlag:'inv_hz309c', lockMsg:'🔒 Finish the previous clue first'},
);

MISSIONS.push(
  {id:'m_s287', needCh:287, title:'The Ship That Should Not Exist', obj:{type:'steps', steps:[
     {label:'The Harbourmaster\'s Report', spot:'hz287a'},
     {label:'The Old Seals', spot:'hz287b'},
     {label:'The Route Log', spot:'hz287c'},
     {label:'The Tide Charts', spot:'hz287d'}]}, rw:{xp:665000, gold:139400, rep:1502},
   subj:'The Ship That Should Not Exist', body:'The western records are waiting. — Greyson'},
  {id:'m_s288', needCh:288, title:'A Name Beyond the Map', obj:{type:'steps', steps:[
     {label:'The Original Ship Log', spot:'hz288a'},
     {label:'The Altered Copies', spot:'hz288b'},
     {label:'Adrian\'s Message', spot:'hz288c'},
     {label:'Why Erase a Name?', spot:'hz288d'}]}, rw:{xp:667500, gold:140000, rep:1505},
   subj:'A Name Beyond the Map', body:'The western records are waiting. — Greyson'},
  {id:'m_s289', needCh:289, title:'The Captain Who Remembered', obj:{type:'steps', steps:[
     {label:'The Captain\'s Account', spot:'hz289a'},
     {label:'Landmarks That Match', spot:'hz289b'},
     {label:'The Old Name', spot:'hz289c'},
     {label:'The Tide Markers', spot:'hz289d'}]}, rw:{xp:670000, gold:140600, rep:1508},
   subj:'The Captain Who Remembered', body:'The western records are waiting. — Greyson'},
  {id:'m_s290', needCh:290, title:'The Western Seal', obj:{type:'steps', steps:[
     {label:'A Seal on Every Page', spot:'hz290a'},
     {label:'The Erased Entry', spot:'hz290b'},
     {label:'Adrian\'s Second Message', spot:'hz290c'},
     {label:'A Mother\'s Ornament', spot:'hz290d'}]}, rw:{xp:672500, gold:141200, rep:1511},
   subj:'The Western Seal', body:'The western records are waiting. — Greyson'},
  {id:'m_s291', needCh:291, title:'Beyond Tribute Waters', obj:{type:'steps', steps:[
     {label:'The Next Step', spot:'hz291a'},
     {label:'Caution at Sea', spot:'hz291b'},
     {label:'Charts and Supplies', spot:'hz291c'},
     {label:'Setting Sail', spot:'hz291d'}]}, rw:{xp:675000, gold:141800, rep:1514},
   subj:'Beyond Tribute Waters', body:'The western records are waiting. — Greyson'},
  {id:'m_s292', needCh:292, title:'The Route Between Records', obj:{type:'steps', steps:[
     {label:'The Chain of Islets', spot:'hz292a'},
     {label:'The Split Rock', spot:'hz292b'},
     {label:'Beneath the Water', spot:'hz292c'},
     {label:'The Deeper Passage', spot:'hz292d'}]}, rw:{xp:677500, gold:142400, rep:1517},
   subj:'The Route Between Records', body:'The western records are waiting. — Greyson'},
  {id:'m_s293', needCh:293, title:'Lanterns on the Water', obj:{type:'steps', steps:[
     {label:'Lanterns Ahead', spot:'hz293a'},
     {label:'Offerings and Prayers', spot:'hz293b'},
     {label:'The Same Star', spot:'hz293c'},
     {label:'An Echo of Home', spot:'hz293d'}]}, rw:{xp:680000, gold:143000, rep:1520},
   subj:'Lanterns on the Water', body:'The western records are waiting. — Greyson'},
  {id:'m_s294', needCh:294, title:'Sky\'s Mother\'s Name', obj:{type:'steps', steps:[
     {label:'The Surviving Records', spot:'hz294a'},
     {label:'Valen, 1183 A.R.', spot:'hz294b'},
     {label:'Yvette Sue Valen', spot:'hz294c'},
     {label:'A Name Erased', spot:'hz294d'}]}, rw:{xp:682500, gold:143600, rep:1523},
   subj:'Sky\'s Mother\'s Name', body:'The western records are waiting. — Greyson'},
  {id:'m_s295', needCh:295, title:'The Port With Two Histories', obj:{type:'steps', steps:[
     {label:'A Port Not on the Charts', spot:'hz295a'},
     {label:'What the Locals Say', spot:'hz295b'},
     {label:'The Mural and the Banner', spot:'hz295c'},
     {label:'Two Histories', spot:'hz295d'}]}, rw:{xp:685000, gold:144200, rep:1526},
   subj:'The Port With Two Histories', body:'The western records are waiting. — Greyson'},
  {id:'m_s296', needCh:296, title:'What the Merchants Kept', obj:{type:'steps', steps:[
     {label:'Private Ledgers', spot:'hz296a'},
     {label:'Names, Agreements, Symbols', spot:'hz296b'},
     {label:'Why They Hid Them', spot:'hz296c'},
     {label:'Ports Not on Any Map', spot:'hz296d'}]}, rw:{xp:687500, gold:144800, rep:1529},
   subj:'What the Merchants Kept', body:'The western records are waiting. — Greyson'},
  {id:'m_s297', needCh:297, title:'The Road of Foreign Stars', obj:{type:'steps', steps:[
     {label:'A Different Road', spot:'hz297a'},
     {label:'Fabrics and Colours', spot:'hz297b'},
     {label:'Shrines of the Stars', spot:'hz297c'},
     {label:'Record Everything', spot:'hz297d'}]}, rw:{xp:690000, gold:145400, rep:1532},
   subj:'The Road of Foreign Stars', body:'The western records are waiting. — Greyson'},
  {id:'m_s298', needCh:298, title:'The Prayer Jade Knows', obj:{type:'steps', steps:[
     {label:'A Familiar Shrine', spot:'hz298a'},
     {label:'The Prayer', spot:'hz298b'},
     {label:'Where Did You Learn It?', spot:'hz298c'},
     {label:'A Piece of Who I Am', spot:'hz298d'}]}, rw:{xp:692500, gold:146000, rep:1535},
   subj:'The Prayer Jade Knows', body:'The western records are waiting. — Greyson'},
  {id:'m_s299', needCh:299, title:'The Valor Mark', obj:{type:'steps', steps:[
     {label:'A Symbol Passed Down', spot:'hz299a'},
     {label:'Under Different Names', spot:'hz299b'},
     {label:'A Responsibility', spot:'hz299c'},
     {label:'Others of the Lineage', spot:'hz299d'}]}, rw:{xp:695000, gold:146600, rep:1538},
   subj:'The Valor Mark', body:'The western records are waiting. — Greyson'},
  {id:'m_s300', needCh:300, title:'Children of the Open Sky', obj:{type:'steps', steps:[
     {label:'The Open Sky', spot:'hz300a'},
     {label:'Bridge-Walkers', spot:'hz300b'},
     {label:'A Responsibility', spot:'hz300c'},
     {label:'Older Than Tribute', spot:'hz300d'}]}, rw:{xp:697500, gold:147200, rep:1541},
   subj:'Children of the Open Sky', body:'The western records are waiting. — Greyson'},
  {id:'m_s301', needCh:301, title:'The Sisters Who Separated', obj:{type:'steps', steps:[
     {label:'Branches Across Kingdoms', spot:'hz301a'},
     {label:'The Known Branches', spot:'hz301b'},
     {label:'Different Names', spot:'hz301c'},
     {label:'Not One Place, One Story', spot:'hz301d'}]}, rw:{xp:700000, gold:147800, rep:1544},
   subj:'The Sisters Who Separated', body:'The western records are waiting. — Greyson'},
  {id:'m_s302', needCh:302, title:'Another Impossible Entry', obj:{type:'steps', steps:[
     {label:'The Record That Should Not Exist', spot:'hz302a'},
     {label:'The Valen Entry', spot:'hz302b'},
     {label:'The Same Hand', spot:'hz302c'},
     {label:'Someone Watching', spot:'hz302d'}]}, rw:{xp:702500, gold:148400, rep:1547},
   subj:'Another Impossible Entry', body:'The western records are waiting. — Greyson'},
  {id:'m_s303', needCh:303, title:'Dima\'s Name', obj:{type:'steps', steps:[
     {label:'Dima\'s Name Here', spot:'hz303a'},
     {label:'Teacher and Guardian', spot:'hz303b'},
     {label:'One of Many Mentors', spot:'hz303c'},
     {label:'Not Isolated', spot:'hz303d'}]}, rw:{xp:705000, gold:149000, rep:1550},
   subj:'Dima\'s Name', body:'The western records are waiting. — Greyson'},
  {id:'m_s304', needCh:304, title:'Xima\'s Shadow', obj:{type:'steps', steps:[
     {label:'The Divergent Branch', spot:'hz304a'},
     {label:'Power Taken, Not Shared', spot:'hz304b'},
     {label:'Not One Person', spot:'hz304c'},
     {label:'A Lineage That Split', spot:'hz304d'}]}, rw:{xp:707500, gold:149600, rep:1553},
   subj:'Xima\'s Shadow', body:'The western records are waiting. — Greyson'},
  {id:'m_s305', needCh:305, title:'One Blood, Two Paths', obj:{type:'steps', steps:[
     {label:'The Common Ancestry', spot:'hz305a'},
     {label:'Protection or Control', spot:'hz305b'},
     {label:'What the Valor Kept', spot:'hz305c'},
     {label:'Many Branches in Between', spot:'hz305d'}]}, rw:{xp:710000, gold:150200, rep:1556},
   subj:'One Blood, Two Paths', body:'The western records are waiting. — Greyson'},
  {id:'m_s306', needCh:306, title:'What Was Erased', obj:{type:'steps', steps:[
     {label:'Whole Lineages', spot:'hz306a'},
     {label:'Obligations Erased', spot:'hz306b'},
     {label:'Obscured Routes', spot:'hz306c'},
     {label:'A Rewritten History', spot:'hz306d'}]}, rw:{xp:712500, gold:150800, rep:1559},
   subj:'What Was Erased', body:'The western records are waiting. — Greyson'},
  {id:'m_s307', needCh:307, title:'The Vision That Looks Back', obj:{type:'steps', steps:[
     {label:'A Different Vision', spot:'hz307a'},
     {label:'A Conversation Without Words', spot:'hz307b'},
     {label:'After the Vision', spot:'hz307c'},
     {label:'Careful, Closer', spot:'hz307d'}]}, rw:{xp:715000, gold:151400, rep:1562},
   subj:'The Vision That Looks Back', body:'The western records are waiting. — Greyson'},
  {id:'m_s308', needCh:308, title:'Valor\'s Sight', obj:{type:'steps', steps:[
     {label:'One Lineage', spot:'hz308a'},
     {label:'Two Expressions, One Origin', spot:'hz308b'},
     {label:'Why It Felt Different', spot:'hz308c'},
     {label:'A Threat to Be Erased', spot:'hz308d'}]}, rw:{xp:717500, gold:152000, rep:1565},
   subj:'Valor\'s Sight', body:'The western records are waiting. — Greyson'},
  {id:'m_s309', needCh:309, title:'The Door Not Yet Opened', obj:{type:'steps', steps:[
     {label:'The Sanctuary', spot:'hz309a'},
     {label:'The Door Responds', spot:'hz309b'},
     {label:'Not Yet', spot:'hz309c'},
     {label:'We Will Return', spot:'hz309d'}]}, rw:{xp:720000, gold:152600, rep:1568},
   subj:'The Door Not Yet Opened', body:'The western records are waiting. — Greyson'},
  {id:'m_s310', needCh:310, title:'A Map With More World', obj:{type:'steps', steps:[
     {label:'Adding the Routes', spot:'hz310a'},
     {label:'Not Easy to Reach', spot:'hz310b'},
     {label:'Unnamed Places', spot:'hz310c'},
     {label:'A Larger World', spot:'hz310d'}]}, rw:{xp:722500, gold:153200, rep:1571},
   subj:'A Map With More World', body:'The western records are waiting. — Greyson'},
  {id:'m_s311', needCh:311, title:'Toward the Horizon', obj:{type:'steps', steps:[
     {label:'Sailing Home', spot:'hz311a'},
     {label:'Pieces, Not the Picture', spot:'hz311b'},
     {label:'Prepare', spot:'hz311c'},
     {label:'Far Away', spot:'hz311d'}]}, rw:{xp:725000, gold:153800, rep:1574},
   subj:'Toward the Horizon', body:'The western records are waiting. — Greyson'}
);
LORE.push(
  {ch:287, n:'The Old Merchant Ship', t:'A merchant ship docked at Dragonvale with seals older than the modern alliance records, carrying ancient charts and tide records. Its log names a western port that is on no current chart.'},
  {ch:288, n:'Asterwyn', t:'A western port named in the original merchant logs: item 19 on the route. In every later copy the name has been struck out by the same hand that altered the Register. Its fate is unknown.'},
  {ch:289, n:'The Old Captain', t:'An elderly captain whose family has sailed the western route for generations. He keeps the old place-name within the family but no longer writes it in public records.'},
  {ch:290, n:'The Western Seal', t:'A seal of a star and waves with flowing wings, found on cargo lists, route logs and private letters. Its craftsmanship is older than the modern alliance. It matches an ornament Elara Valor once wore.'},
  {ch:290, n:'Elara Valor', t:'Jade\'s mother. She does not appear in the story directly: she is remembered by Jade (the ornament, her songs, her prayers) and named in the Valor records.'},
  {ch:290, n:'Valorian Reach', t:'A western place-name in the old route logs. It is on no current navigation chart, and it fits the pattern of the tampered routes.'},
  {ch:291, n:'The Western Sea Route', t:'An old maritime route west of Tribute\'s charted waters, preserved in the captain\'s family charts and the western tide markers. It is the party\'s way to the western regions.'},
  {ch:292, n:'Ancient Navigation Markers', t:'Stone islets, split rocks and the foundations of broken beacon towers still stand along the old western route. Each marks a tide pattern and a star position. They were left off modern charts.'},
  {ch:293, n:'The Lantern Route', t:'Floating lanterns tethered with shells, carved symbols and cloth strips mark the old western route: offerings for safe passage, for the lost and for those who return. Their motifs are a star and waves.'},
  {ch:294, n:'Yvette Sue Valen', t:'Sky\'s mother. A merchant record from Calvaris, year 1183 A.R., places the Valen name on the western route; later copies have it blurred or replaced. What happened to her is not known.'},
  {ch:294, n:'The Valen Family Seal', t:'An older version of the Valen family seal, a star within a laurel, appears in a western merchant record of the year 1183 A.R.'},
  {ch:295, n:'The Frontier Port', t:'An old western frontier harbour that has traded for centuries but is absent from modern charts and listed as uninhabited waters in Tribute\'s archive. Its mural and banner carry the star-and-wave emblem.'},
  {ch:296, n:'The Private Ledgers', t:'Merchant families kept private ledgers after the official records were altered. They list family names, port agreements and shared symbols, and show routes continuing far to the west of the modern maps.'},
  {ch:297, n:'The Road of Foreign Stars', t:'A western trade road of caravans and celestial shrines, influenced by Western Regions culture. Its fabrics and star motifs match items in Elara\'s documents.'},
  {ch:298, n:'The Prayer Jade Knows', t:'A prayer Jade\'s mother sang at night under the stars: "By the stars that guide the wandering home, by the roads that remember our names, keep those we love beyond the horizon." Jade completed it unprompted at a western shrine.'},
  {ch:299, n:'The Valor Mark', t:'A compass-star mark of an old mystic lineage known across many regions beyond Tribute: scholars, seers and guardians who walked between worlds and carried knowledge across kingdoms. Jade\'s family carries it.'},
  {ch:299, n:'The Valor Lineage', t:'Known in many lands under different titles and languages, the Valor people formed alliances with many kingdoms, including those in the Western Regions, long before modern borders were drawn.'},
  {ch:300, n:'Children of the Open Sky', t:'What the Valor people were called. Certain descendants were born unusually sensitive to dreams, spirits and celestial signs: bridge-walkers who could sense the boundary between worlds, honoured as seers and mediators and as keepers of dangerous knowledge.'},
  {ch:301, n:'The Branches of the Valor Lineage', t:'The lineage divided across kingdoms over generations: the Valor branch (Elara) and the Valen branch (Yvette Sue) are among the known branches, living under different names, houses and customs but honouring the same stars.'},
  {ch:302, n:'The Western Archive', t:'A hidden western archive that kept records which should have been destroyed when the Register was altered. One entry names Valen, the trade alliance, western routes and shared rites, in the same unknown hand.'},
  {ch:303, n:'Dima, the Star-Witch', t:'A foreign record names Dima as a teacher, guide and guardian, one of the foundational mentors of the early Valor people. She shared knowledge of dreams, spirits and the stars and helped establish their protective rites. She was recognised by multiple kingdoms.'},
  {ch:304, n:'The Divergent Branch', t:'A branch of the lineage that turned away from the older teachings and pursued coercive magic, binding of spirits and blood oaths. Its language and symbols (shadow binding, the red sigil) match later records of the Xima tradition.'},
  {ch:305, n:'The Common Ancestry', t:'Dima and Xima emerged from related mystical ancestry: two paths from the same older teachings, one toward protection, one toward control. The Valor lineage preserved fragments of the older tradition.'},
  {ch:306, n:'The Altered Register', t:'The Register once recorded travelling bloodlines, mystic houses and cross-border oaths and obligations, including protection for travelling families. Those entries were blacked out, so the obligations can be denied.'},
  {ch:307, n:'The Vision That Looks Back', t:'A new kind of vision: the figure within it is aware of Jade and responds. It feels like a conversation without words. Jade is no longer only seeing the past; she is being contacted.'},
  {ch:308, n:'Valor\'s Sight', t:'Jade\'s psychic gift and Dima-linked magic are two surviving expressions of one older lineage. The Valor people used both sight and magic as guardians, to guide, protect and keep balance across kingdoms and between worlds.'},
  {ch:309, n:'The Sealed Sanctuary', t:'A sanctuary in the western lands, tied to the Valor lineage and hidden from most of the world. It recognised Jade\'s blood but stayed sealed: she is not yet ready to inherit what lies within. It is said to keep Valor wisdom, lineage records and teachings about the origins of Dima and Xima.'},
  {ch:310, n:'The Wider World', t:'The recovered western routes were added to the party\'s maps: Northern Realms, Eastern Kingdoms, Western Lands, Central Isles and Southern Seas. Many places remain unnamed, incomplete or inaccessible.'},
  {ch:311, n:'A Daughter of the Valor Line', t:'Far beyond the western seas someone has learned that a daughter of the Valor line has begun searching. The news only confirms what they were expecting. Nothing more is known.'},
  {ch:311, n:'Arc XII: New Horizons', t:'Foreign ports sent records that disagreed with Tribute\'s and Dragonvale\'s. Jade followed the old western route, learned that her mother\'s lineage belongs to a much wider world, and that the altered Register erased far more than political alliances.'}
);

/* ---- state and the "Western Routes" tab ---- */
const westOpen = () => !!G && G.ch >= 287;
const hzS = () => { if(!G.hz) G.hz = {led:{}, interp:{}}; if(!G.hz.led) G.hz.led = {}; if(!G.hz.interp) G.hz.interp = {}; return G.hz; };
const hzDone = sid => !!G.flags['inv_'+sid];
const RES_SPOTS = ['hz293d', 'hz297d', 'hz298d', 'hz299d', 'hz300d', 'hz307d', 'hz308d', 'hz309d'];
const valorRes = () => RES_SPOTS.filter(hzDone).length;
const RES_LEVELS = [[0,'Dormant'],[1,'Faint'],[3,'Stirring'],[5,'Clear'],[7,'Attuned']];
const resLevel = () => { let l = RES_LEVELS[0][1]; RES_LEVELS.forEach(r => { if(valorRes() >= r[0]) l = r[1]; }); return l; };
const NAV_NODES = [
  ['Chain of stone islets','hz292a','The first marker, exactly where the captain\'s chart put it.'],
  ['The split rock','hz292b','A marker for a specific tide pattern and star position.'],
  ['Beacon foundations','hz292c','Broken navigation towers beneath the water.'],
  ['The lantern line','hz293b','Offerings and prayers tethered with shells and cloth.'],
  ['The frontier port banner','hz295c','A crescent and a star over a port the charts do not name.'],
  ['The shrine of the stars','hz297c','Celestial rites along the Road of Foreign Stars.'],
  ['The sealed door','hz309b','Stars, moon and roots that answer Jade and stay shut.'],
];
const SKY_CLUES = [
  ['Valen, 1183 A.R.','hz294b','A merchant record from Calvaris: spices and dye on the Western Sea, beside an older Valen seal.'],
  ['Yvette Sue Valen','hz294c','Sky\'s mother is named on the western route.'],
  ['A name erased','hz294d','Later copies blur or replace the Valen name. Her disappearance is not explained.'],
  ['The Valen branch','hz301b','The Valen branch is one of the known branches of the Valor lineage.'],
  ['An entry that survived','hz302b','A western archive kept: Valen, Trade Alliance, Western Route, Celestial Goods, Envoys, Shared Rites.'],
];
const LINEAGE = [
  ['The western seal','hz290d','A star, waves and flowing wings: Elara Valor\'s ornament.'],
  ['The Valor mark','hz299a','An old mystic lineage of scholars, seers and guardians.'],
  ['Children of the Open Sky','hz300a','Descendants born sensitive to dreams, spirits and celestial signs.'],
  ['The branches','hz301a','Branches across kingdoms under different names.'],
  ['Dima, the Star-Witch','hz303a','A teacher, guide and guardian of the early Valor people.'],
  ['The Divergent Branch','hz304a','A branch that turned toward coercion and binding.'],
  ['The common ancestry','hz305a','Dima and Xima: one older root, two paths.'],
  ['What was erased','hz306a','Travelling bloodlines, mystic houses and cross-border oaths.'],
  ['Valor\'s Sight','hz308a','Sight and Dima-linked magic: two expressions of one lineage.'],
];
const LEDGERS = [
  {id:'valen', spot:'hz296a', t:'Valen, western route (Calvaris, 1183 A.R.)', reg:'Official Register: the name is blurred in later copies and there is no western route.'},
  {id:'union', spot:'hz296b', t:'Trader\'s Union and the Shared Port agreements', reg:'Official Register: no such agreements are recorded.'},
  {id:'westward', spot:'hz296b', t:'The Westward Route and the Stone Markers', reg:'Official Register: the region is listed as uninhabited waters.'},
  {id:'fleet', spot:'hz296d', t:'The Seasonal Fleet and its ports', reg:'Official Register: the ports are absent from modern maps.'},
];
const INTERP_OPTS = ['Memory','Prophecy','Illusion','Ancestral imprint'];
const INTERP = [
  {id:'lanterns', spot:'hz293d', t:'The lantern prayers', q:'Jade has never seen these symbols, yet they stir "an echo from a home I have never seen, but have always carried within me".', ans:3,
   ok:'Jade names it: not a memory of hers, and not a vision. An ancestral imprint, carried in the blood.', hint:'She has no such memory of her own, and nothing here is foretold.'},
  {id:'prayer', spot:'hz298b', t:'The roadside prayer', q:'The words came at once, in her mother\'s voice, though she never consciously learned them.', ans:0,
   ok:'Jade names it: a memory. It was always hers, only unremembered.', hint:'The words are in her mother\'s voice and belong to her own childhood.'},
  {id:'vision', spot:'hz307b', t:'The vision that looks back', q:'The figure is aware of her and answers. It is not a memory, a warning or a trick.', ans:-1,
   ok:'Jade cannot put it under any of the four. It answered her. She notes it as something new.', hint:''},
  {id:'door', spot:'hz309a', t:'The sealed door', q:'The sanctuary lights at her presence and keeps its door shut.', ans:3,
   ok:'Jade names it: an ancestral imprint. The place knows her blood and is waiting.', hint:'It is not her past and not a prediction: the place reacts to what she is.'},
];
function hzCompare(id){
  const L = LEDGERS.find(x => x.id===id), S = hzS(); if(!L || S.led[id] || !hzDone(L.spot)) return [];
  S.led[id] = true; const msgs = ['📒 Compared: '+L.t+'. '+L.reg]; gainXp(180 + avgPartyLv()*9, G.party).forEach(m => msgs.push(m));
  if(LEDGERS.every(x => S.led[x.id]) && !G.flags.ledgers_compared){ G.flags.ledgers_compared = true; chronicle('Every merchant ledger was compared against the Register: they disagree on every line.', '📒'); msgs.push('✦ The ledgers disagree with the Register on every line.'); }
  save(); return msgs;
}
function hzInterpret(id, opt){
  const it = INTERP.find(x => x.id===id), S = hzS(); if(!it || S.interp[id] || !hzDone(it.spot)) return [];
  if(it.ans >= 0 && opt !== it.ans) return ['🔮 Jade turns it over, but it does not fit: '+it.hint];
  S.interp[id] = true; G.flags.interpret_resonance_1 = true;
  const msgs = ['🔮 '+it.ok]; gainXp(260 + avgPartyLv()*18, G.party).forEach(m => msgs.push(m));
  if(INTERP.every(x => S.interp[x.id])) chronicle('Jade has read every impression the old sites left her.', '🔮');
  save(); return msgs;
}
const hzRow = (done, n, t) => done ? `<div class="li">✅ <b>${n}</b><div class="sm">${t}</div></div>` : `<div class="li">❔ ???</div>`;
function rWest(){
  const S = hzS();
  let h = `<div class="panel"><b>⚓ THE WESTERN ROUTES</b><div class="sm">What the old route has shown so far. Read-only, except the two small actions below.</div></div>`;
  if(G.ch >= 293) h += `<h4>🌌 Valor Resonance</h4><div class="li"><b>${resLevel()}</b><div class="sm">How strongly the old sites answer Jade. It deepens in places tied to her mother\'s lineage.</div></div>`;
  h += `<h4>🧭 Ancient Navigation Markers (${NAV_NODES.filter(x => hzDone(x[1])).length} / ${NAV_NODES.length})</h4>` + NAV_NODES.map(x => hzRow(hzDone(x[1]), x[0], x[2])).join('');
  if(G.ch >= 294) h += `<h4>🪞 Sky Family Clues (${SKY_CLUES.filter(x => hzDone(x[1])).length} / ${SKY_CLUES.length})</h4>` + SKY_CLUES.map(x => hzRow(hzDone(x[1]), x[0], x[2])).join('');
  if(G.ch >= 290) h += `<h4>🌟 The Valor Lineage (${LINEAGE.filter(x => hzDone(x[1])).length} / ${LINEAGE.length})</h4>` + LINEAGE.map(x => hzRow(hzDone(x[1]), x[0], x[2])).join('');
  if(G.ch >= 296){
    h += `<h4>📒 Merchant Ledger Compare</h4><div class="sm">Set each private ledger beside the official Register.</div>`;
    h += LEDGERS.map(L => !hzDone(L.spot) ? `<div class="li">❔ ???</div>` : S.led[L.id] ? `<div class="li">✅ <b>${L.t}</b><div class="sm">${L.reg}</div></div>` : `<div class="li"><b>${L.t}</b><div class="row"><button onclick="act(hzCompare,'${L.id}')">Compare with the Register</button></div></div>`).join('');
  }
  if(G.ch >= 293){
    h += `<h4>🔮 Interpret Resonance</h4><div class="sm">Jade tells apart a memory, a prophecy, an illusion and an ancestral imprint.</div>`;
    h += INTERP.map(it => !hzDone(it.spot) ? `<div class="li">❔ ???</div>` : S.interp[it.id] ? `<div class="li">✅ <b>${it.t}</b><div class="sm">${it.ok}</div></div>` : `<div class="li"><b>${it.t}</b><div class="sm">${it.q}</div><div class="row" style="flex-wrap:wrap">${INTERP_OPTS.map((o,i) => `<button onclick="act(hzInterpret,'${it.id}',${i})">${o}</button>`).join('')}</div></div>`).join('');
  }
  return h;
}
deed('western_route', 'story', 'Beyond the charts', '⚓', 'The party took the Western Sea Route.', () => !!G.flags.western_sea_route);
deed('hz_markers', 'world', 'The sea remembers', '🪨', 'Every ancient navigation marker was found.', () => NAV_NODES.every(x => hzDone(x[1])));
deed('hz_ledgers', 'story', 'Kept in private', '📒', 'Every merchant ledger was compared against the Register.', () => !!G.flags.ledgers_compared);
deed('hz_interpret', 'craft', 'A clear reading', '🔮', 'Jade read every impression the old sites left her.', () => INTERP.every(x => hzS().interp[x.id]));
deed('hz_attuned', 'story', 'Answering the sky', '🌌', 'Valor Resonance reached Attuned.', () => valorRes() >= 7);
deed('arc12', 'story', 'New Horizons', '🌅', 'Arc XII, New Horizons, is complete.', () => !!G.flags.arc12_complete);

/* ---- maps: provisional pictures cropped from the author's chapter 310 page ---- */
WORLD_MAPS.push({id:'western', n:'The Western Routes', img:'assets/maps/western_routes.webp', open:() => G.ch >= 289, schem:true,   // cropped from ch310 ("Western Routes (Recovered)"); schematic node positions are placeholders
  locs:['old_trade_sea','frontier_port','western_road','western_archive','sealed_sanctuary'],
  nodes:[{k:'Dragonvale Harbour',x:14,y:80,loc:'dragon_harbour',ref:true},{k:'The Old Trade Sea',x:32,y:60,loc:'old_trade_sea'},{k:'The Frontier Port',x:50,y:44,loc:'frontier_port'},{k:'The Road of Foreign Stars',x:68,y:34,loc:'western_road'},{k:'The Western Archive',x:62,y:68,loc:'western_archive'},{k:'The Sealed Sanctuary',x:86,y:18,loc:'sealed_sanctuary'}]});
WORLD_MAPS.push({id:'wider', n:'The Wider World', img:'assets/maps/wider_world.webp', open:() => G.ch >= 310, schem:true,   // cropped from ch310 ("The Wider World"); only Tribute and Dragonvale are marked
  locs:[],
  nodes:[{k:'Tribute',x:72,y:48,loc:'capital',ref:true},{k:'Dragonvale',x:58,y:30,loc:'dragon_vale',ref:true}]});
