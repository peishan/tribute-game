# CURRENT MAP LOCKS (the author's full-version draft, checked against the built game)
Solid routes are built; dotted ones are provisional, future or locked. Checked against `ROUTES` and the Dragonvale map nodes: **no errors found** (one typo, "SUNken", in the draft). These 16 locks are the working canon; geography and territory tags are separate.
1. Silent Flame chain: Dragonvale Capital, 5 days north, Silent Mountains, Silent Village, Old Beacon Road, Silent Furnace, Silent Flame. Not under Tribute.
2. The northern Dragonvale routes are separate, not a chain: Frostveil (4 days), Silent Mountains (5 days), Dragonvale Northern Frontier (about 3 days).
3. Western Supply Road: capital, 3 days, Frontier Depot; branches: Contract House (2 days) and Moving Village (3 days via the Western Pass). Siblings.
4. Eastern branch: capital, Old Mountain Road, Border Watch Fort; from the fort the Ancient Ruins (a climb) and the Exile Road to the Abyssal Frontier.
5. Cavern of Fireflies: a direct 1-day boat trip from the capital, not attached to the northern branch.
6. Harbour: capital, 1 day, Dragonvale Harbour, 4 days by sea, Western Waters.
7. Northern Road: capital, 2 days; Hidden Path (1 day) to Northwatch Station; Northern Gate (2 days beyond) to the Northern Valley. Siblings.
8. Lingering Vale: south-west of the capital (Sky's childhood home and Roc's cover; the hunt is sealed behind the ch999 placeholder).
9. Moonveil Temple / Forgotten Temple: 1 day east of the capital.
10. Dragon Sanctuary and Pearl Chamber: capital sites (the Pearl Chamber boss, level 18 / 860 HP, is rebuilt for XXXII).
11. Bone River: 5 days east of Dragonvale, **provisional** (the chapters are built there; reposition without changing the travel event if a later chapter names the region).
12. Forbidden Sea Route: Dragonvale, 3 days by ship, Sunken Kingdom (no built Tribute route).
13. Tribute and Dragonvale: 6 days by road, 4 days by sea.
14. Altan sea travel: Altan to Tribute about 5 days by sea (lands at the Altan Border Garrison); Altan Capital to Dragonvale 6 days by sea.
15. Tribute Harbour: 6 days by sea to the Western Waters; no built route from the Western Waters to the Valen Borderlands.
16. Territory tags and geography are separate: reaching a place from Dragonvale does not make Roc's "Dragonvale ground" guest rule apply (only Elise's Northern Frontier was retagged to Dragonvale).
Also fixed: Tribute's Northern Frontier (Black Forest, Thorns, Mourning Valley, Crownless Marches, 2 days from the Tribute capital) is separate from Dragonvale's Northern Frontier. Close satellites 1 day from the capital: Court, Academy, Veyne Estate, Dee Household, Royal Archives, Gate Tavern, Coastal Village, Valen Research Hall. The Valen chain (Valen Borderlands 4 days by road, Forgotten Battlefield, Forgotten Sanctuary = Sanctuary of Forgotten Light, Forgotten Road 3 days, Celestial Ruins, Land Beyond the Seal) is unchanged. Planned, not built: the Ember Sands and the Veilspire Graveyard in the southern Cursed Lands, and the routes to Impossible Entry and Dima's and Xima's regions.

## The road home is closed (author)
From the party's first arrival in Dragonvale until the end of arc 2, The Dragonvale Court (chapter 86), travel to Tribute's own places (the Imperial Capital and its satellites) is blocked; the Travel panel shows "The road home is closed until the story brings the party back to Tribute". Places that merely carry the Tribute region tag but unlock later (Frostveil, Silent Village, Bone River...) are not affected. Every chapter between 45 and 88 is set in Dragonvale or beyond, so no story spot is stranded. After chapter 86 Tribute is open for good (the party is about to head home; chapter 89 is the homecoming story).

## The "chapter 999" placeholders (cleaned up)
"Reach chapter 999" was a placeholder lock for content whose story had not been written. Filled from the drawn story: **Who Stirred the Seals** (ch864: the guidance intelligence, from 863-866), **Beneath the Ruins** (ch861: a leaking restoration channel, from 851/859/861), **Yvette's Trail** and **The Files Tied to Sky's Past** (ch907: from 904-907; the pendant line was dropped because no page answers it). **The Vale** hunt opens at ch86. Everything else at 999 was a dead early draft with no story (the old Dragon Sanctuary spot replaced by the Pearl Chamber, the Vigil Shrine, eight Faepool places, the River Crossing, Dima's Sanctuary, the Xima Realm, the early Faepool missions and lore): these are now **hidden** from the Here list, the Travel routes and the region list (`neverWritten`), not deleted.

## Clean-up after the main campaign
Deleted the dead chapter-999 drafts (13 early Faepool missions, 8 lore entries, the Vigil Shrine and the old Dragon Sanctuary spot; the map pin now points at the Pearl Chamber). The never-written places stay hidden. Added: the "MAIN QUEST COMPLETE" splash after chapter 900, the Ally Network tab (Network, from chapter 949), and `tools/smoke.js` (run `node tools/smoke.js`: every script parses, no chapter gaps, missions point at real spots and bosses, every tab renders at seven story points, the party lock, the road-home lock, a crossover fight and the sequel fight). The sequel's save data lives in `G.horizon` (`G.hz` belongs to the older horizons system).
