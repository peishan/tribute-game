# ARC XII — NEW HORIZONS (chapters 287–311) — working brief

Saved as sent (author, with the GPT planning notes). BUILT (chapters 287-311, cover, scripts/horizons.js). The brief below is as originally sent; the build notes and mismatches are at the end. Damien's romance is saved for Delilah's later arc: not used here.

**Theme:** The world becomes larger when the records stop agreeing.
**Focus:** Jade. Secondary: Devon, Sky, Levi. **Mystery thread:** surviving fragments of the altered international Register. **Family thread:** first substantial clues about Elara Valor and the Valor bloodline. **Exploration payoff:** new maritime routes and an unknown western destination appear on the world map. **Tone:** exploratory, investigative, adventurous, increasingly mystical.
Begins immediately after ch286. Once Tribute, Dragonvale and the Sunken Kingdom restored their histories, foreign ports sent contradictory records: names that should not exist; ships from places absent from modern maps; an old insignia Jade recognises from her mother's belongings.

## Acts and chapters
**I. The Ships That Should Not Exist (287–291)**
- 287 New Horizons: a harbourmaster reports an old merchant ship with documents whose seals predate the modern alliance records; its log claims a western port absent from current charts.
- 288 A Name Beyond the Map: one place-name repeats but was struck from later copies; Adrian confirms the handwriting resembles the altered Register records of Arc VIII.
- 289 The Captain Who Remembered: the elderly captain's family has sailed the route for generations; his charts' landmarks match Forgotten Alliance fragments.
- 290 The Western Seal: a symbol resembling an ornament once carried by Elara Valor: the first firm sign Jade's maternal family connects to the western routes.
- 291 Beyond Tribute Waters: the mystery cannot be solved from an archive; sea journey prepared; **Western Sea Route unlocked**.

**II. The Old Trade Sea (292–296)**
- 292 The Route Between Records: the old captain's chart; ancient navigation markers along open sea.
- 293 Lanterns on the Water: floating lanterns and ritual markers of an unfamiliar culture, strangely familiar prayers.
- 294 Sky's Mother's Name: a variation of Valen beside an older family mark: Yvette Sue Valen enters the mystery, her disappearance unexplained.
- 295 The Port With Two Histories: a frontier harbour whose local history contradicts Tribute's and Dragonvale's records.
- 296 What the Merchants Kept: private merchant ledgers; the alliance reached farther west than known.

**III. The Western Regions (297–301)**
- 297 The Road of Foreign Stars: caravans, celestial shrines, patterned fabrics, unfamiliar rites; Jade recognises pieces of Elara's heritage.
- 298 The Prayer Jade Knows: at a roadside shrine Jade completes a prayer her mother sang.
- 299 The Valor Mark: an elder identifies Jade's symbol as an old mystic lineage known beyond Tribute under a name tied to Valor.
- 300 Children of the Open Sky: certain Valor descendants were born sensitive to dreams, spirits and celestial signs; Jade's visions may predate the Dima awakening by generations.
- 301 The Sisters Who Separated: branches scattered through kingdoms; a structural clue to how Elara Valor and Yvette Sue Valen can be related, differently named.

**IV. The Register Beneath the Register (302–306)**
- 302 Another Impossible Entry: a western archive record that should have been destroyed; the same unknown hand.
- 303 Dima's Name: a foreign record links the Valor lineage to Dima's traditions.
- 304 Xima's Shadow: a branch that rejected the older teachings and pursued coercive magic (the later Xima tradition).
- 305 One Blood, Two Paths: Dima and Xima emerged from related mystical ancestry; the Valor line kept fragments.
- 306 What Was Erased: the Register alterations also severed knowledge of travelling bloodlines, mystic houses and cross-border obligations.

**V. Jade's Next Door (307–311)**
- 307 The Vision That Looks Back: a vision whose figure is aware of Jade and responds.
- 308 Valor's Sight: her psychic gift and Dima-linked magic are two expressions of one older lineage.
- 309 The Door Not Yet Opened: a sealed western sanctuary recognises her blood but refuses entry (saved for the later Valor arc).
- 310 A Map With More World: the recovered western routes are added to the maps; several destinations unnamed or inaccessible.
- 311 Toward the Horizon: the party sails home with questions; Jade carries Elara's symbol; final tease: far away someone learns a daughter of the Valor line has begun searching.

## Reveals and non-reveals
**Reveals:** Elara's mysticism is a real surviving lineage; the Valen and Valor branches share deeper ancestry; Dima and Xima come from related mystical roots; Jade's psychic visions and later magic are connected; the altered Register concealed more than political alliances.
**Does not yet reveal:** Yvette's exact location; the complete Dima/Xima genealogy; the full history of the Valor clan; Jade's final magical form; who waits beyond the western sanctuary; why Yvette disappeared.

## Gameplay (as proposed)
Western Sea Route (ch291); Ship Investigation (cargo, seals, charts, crew testimony); Ancient Navigation Markers (hidden route nodes); Merchant Ledger Compare (official Register entries against private family records); Cultural Recognition Events (Jade acts on Valor-associated symbols); Sky Family Clues (a new journal category for Yvette/Valen evidence); Valor Resonance (a hidden progression tracking Jade's response to mystic sites); New Vision Type (interactive visions); Western Regions Map Layer (erased routes appear without unlocking all destinations); Sealed Sanctuary (visible, inaccessible after Arc XII). New Jade action **Interpret Resonance**: distinguishing memory, prophecy, illusion and ancestral imprint (the first step toward Valor's Sight).

## Characters
Jade drives the investigation. Devon: politics and foreign authorities, without taking over her family story. Sky: important because the Valen clues concern both cousins. Levi: merchant-port sections (languages, manifests, false identities, route reconstruction). Sera stays available but this is not another Sera arc. Adrian assists remotely or early (Register analysis) and need not join every expedition. Party: Rheon remains recruitable (see Arc XI roster).

## Ending state (ch311)
The Forgotten Alliance case reaches beyond three kingdoms; the player knows of older routes and cultures; Jade's mother's lineage belongs to that wider world; Sky has a new avenue toward Yvette; the next Valor storyline points **westward**.

## Cover direction (author/GPT)
Jade at the foreground of a harbour holding an old chart / Valor emblem, Devon beside her, Sky and Levi behind, ships toward a brilliant western horizon, faded Register documents and constellations over the sea; no visible Dima/Xima figures (no spoiler).


## Build notes (first pass)
**Chapters 287-311** are all in (pages as `assets/comics/chN.webp`, the cover as `assets/arcs/arc12.webp`, shown after ch286). Each chapter has four chained investigation spots, one mission (`m_s287`...`m_s311`) and lore entries. Everything lives in `scripts/horizons.js` (places, routes, enemies, spots, missions, lore, the tab, deeds, maps).
- **Places:** Dragonvale Harbour (287) ; Western Sea Route opens at 291 (The Old Trade Sea) ; The Frontier Port (295) ; The Road of Foreign Stars (297) ; The Western Archive (302) ; The Sealed Sanctuary (309, visible but its door stays shut).
- **Gameplay built:** Western Sea Route (291), Ship Investigation (287-290 spots), Ancient Navigation Markers (Archive > Western Routes), Sky Family Clues (from 294), the Valor Lineage list, Merchant Ledger Compare (from 296, 4 comparisons), Valor Resonance (hidden: shown only as a word Dormant/Faint/Stirring/Clear/Attuned, counting 8 mystic-site clues), Interpret Resonance (4 impressions: lantern prayers = ancestral imprint, roadside prayer = memory, the vision that looks back = fits none of the four, sealed door = ancestral imprint), Western Regions map layer, Sealed Sanctuary. New enemies: Reef Raider, Beacon Wraith, Caravan Raider, Archive Sentinel (no new boss: the arc is investigative).
- **Maris Aurel** is an adviser from 287 (counts for investigation roles) but not a party member. **Elara Valor** is mention-only: lore entry, one memory panel in ch290, no portrait.

## Mismatches and open questions (flagged, not invented)
1. **Maris "joins the party" (ch287 card)** but she is not on the Arc XII cover or named again. Built as an adviser, not a recruit.
2. **Two erased names:** ch288 struck-out "Asterwyn" (item 19) vs ch290 "Valorian Reach" (a name not on charts) alongside a struck-out line. Built as two names; say if they are one place.
3. **Port names:** ch294's record is for port **Calvaris**; ch295's frontier port is never named; ch310's maps have no names for it. Kept unnamed.
4. **Speaker attribution** in 287-311 was inferred from hair colour (silver-white = Rheon, dark = Devon, red-brown = Levi, blue = Sky, teal = Maris); most lines are written without naming the speaker.
5. **Cover place names** ("Western Route", "Azure Trench", "Silvertide Passage", "Elysian Reach") appear nowhere in the chapters; not used in game.
6. **Interpret Resonance:** "Illusion" and "Prophecy" have no canon example yet; they are options but never the right answer. The ch307 vision is treated as "none of the four".
7. **Maps:** "Western Routes" and "The Wider World" are provisional crops of the ch310 panels (low resolution); replace with generated maps when ready.
8. **Elara's earlier lore** called Jade's mother only "Valor"; she is Elara Valor (Valor is the family name). The new lore entry names her.
9. **ch307 figure** (long dark-blue hair, golden crown) looks like the Elara memory in ch290 but the page never says who she is: left unnamed.
10. **ch311 hooded stranger** and the Valor-line news: unnamed; nothing implied about who.
