/* =====================================================================
   TRIBUTE — CHAPTER DESIGN ENTRIES (game skeleton), from CANON story data (v6)
   Fields: title, loc, chars (playable), sum, events, purpose (gameplay purpose), unlocks.
   Only chapters converted from the actual story text appear here (Prologue-5 so far).
   CANON_TITLES lists the titles of the rest of the current story file (6-14);
   their summaries are NOT written yet. Chapters 15+ have no canon text yet.
   Mechanical parts live elsewhere: world.js (locations/routes/CH_LOC/missions),
   core.js (JOIN_CH, GUEST_CH), journal.js (battles).
   ===================================================================== */
const CHAPTER_DESIGN = {
 0:{ title:'Tribute', loc:'🏯 Imperial Palace',
  chars:['jade'],
  sum:'King Greyson decides that Tribute can no longer wait while danger grows around the island. He summons Jade Gold, an Imperial Guard whose abilities and unknown destiny may become the key to protecting the island. Jade begins her journey as the chosen protector of Tribute, unaware that her fate is connected to ancient forces beyond her understanding.',
  events:[],
  purpose:['Opening cinematic','Introduce Tribute','Unlock Jade','Establish Xima\'s threat'],
  unlocks:['Jade Gold','Main Quest','World Lore Codex']},
 1:{ title:'Strangers on the Isle', loc:'🏝 Tribute Island',
  chars:['chad','sky'],
  sum:'Chadwick and Sky Yale live ordinary lives away from their former identities. Looking for a change, Chad discovers a mysterious mercenary recruitment scroll. The two answer the request and arrive at Tribute, unaware that their decision will place them at the centre of the island\'s fate.',
  events:['Chad discovers the mercenary request','Sky chooses to follow him','They arrive on Tribute','Their new journey begins'],
  purpose:['Introduce first companions','Introduce recruitment system'],
  unlocks:['Chad introduction','Sky introduction']},
 2:{ title:'The Mercenary Trial', loc:'⚔ Imperial Training Grounds',
  chars:['jade','chad','sky'],
  sum:'Jade meets Chad and Sky after they answer the recruitment request. She immediately notices something unusual about Chad: he appears confident and arrogant, but there is a hidden familiarity she cannot explain. Before accepting them, Jade tests their abilities.',
  events:['Jade evaluates Chad','Chad reveals his martial ability','Sky reacts strangely upon seeing Jade','The party begins forming'],
  purpose:['Tutorial battle','Introduce combat mechanics'],
  unlocks:['Party system','Combat tutorial']},
 3:{ title:'Swords and Palpitations', loc:'⚔ Training Grounds',
  chars:['jade','chad','sky'],
  sum:'Jade and Chad\'s rivalry grows during their sparring match. Chad\'s martial skill surprises Jade, and the battle ends with Jade falling into his arms after overextending herself. The relationship begins with irritation and competition, but a strange connection starts forming. Sky also reveals a quiet admiration for Jade, creating the first emotional dynamic in the party.',
  events:['Jade and Chad\'s first major duel','Chad demonstrates superior martial experience','Party contracts are signed'],
  purpose:['Establish party chemistry','Introduce relationship system'],
  unlocks:['Chad permanent recruitment','Sky permanent recruitment']},
 4:{ title:'The Village and the Courtesan', loc:'🏘 First Village',
  chars:['jade','chad','sky','sally'],
  sum:'The party reaches their first village during their mission. There, Sally encounters Chad and notices the kindness beneath his arrogant personality. Unlike the others, Sally sees a different side of him and decides to join the journey. Her arrival introduces a new personality and changes the party dynamic.',
  events:['Party reaches village','Sally is introduced','Sally joins the journey temporarily'],
  purpose:['Introduce Sally','Expand party interactions'],
  unlocks:['Sally guest character']},
 5:{ title:'The Ransom Trap', loc:'⛰ Cliff Area',
  chars:['jade','chad','sky'],
  sum:'The journey takes a dangerous turn when Sky is kidnapped. A ransom demand leads Jade and Chad into a trap set by Booyeong. Jade must enter enemy territory to rescue Sky. The mission becomes a personal battle rather than a simple assignment.',
  events:['Sky is captured','Booyeong demands ransom','Jade confronts the enemy','Rescue mission begins'],
  purpose:['First major story battle','Introduce rescue missions','Raise stakes'],
  unlocks:['Boss encounter system','Story combat event']},
};
const CANON_TITLES = { 6:'The Cave', 7:'Back for Blood', 8:'The Betrothed', 9:'The Potion Plot', 10:'The Demon Siege', 11:'The Portal', 12:'Poisoned', 13:'The Palace of Princes', 14:'The Boat Trip' };
