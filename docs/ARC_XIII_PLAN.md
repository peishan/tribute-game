# ARC XIII — BLOOD OF THE WESTERN STARS (chapters 312-336; all built)

*The first cover read "The Sanctuary of Open Sky"; the regenerated cover (now in the game) reads "Blood of the Western Stars", the planning title.*

All 25 pages (312-336) and the cover (`assets/arcs/arc13.webp`, shown after ch311) are built (first pass).

## What the chapters cover
312 The Door That Remembered Her (the sanctuary answers Jade) · 313 Return to the Western Road · 314 The Name Valor (a wandering bloodline of seers, mediators, guardians) · 315 Two Sisters, Two Names (Elara kept the Valor name; Yvette took Valen by marriage into allied house) · 316 The Sanctuary of Open Sky (it opens) · 317 Her Mother's Prayer · 318 The Woman Before Mother (Elara before marrying Unique Gold) · 319 The Daughter Who Chose the Court (Elara stayed in Tribute by choice) · 320 The Half-Sister Who Wandered (Yvette's travels) · 321 Sky's Inheritance (a gentler, healing branch) · 322 Before the Witches (the bloodline predates Dima and Xima).

## Roster (author decision, built)
**Arc XIII focuses on Jade and Sky.** The game now has **story companions** (`STORY_ALONG` in `scripts/core.js`, the same idea as Crimson Tide's "bring along regardless of party size"): the characters a story arc needs are brought along whatever the party size. They fight beside the five as controllable extras (like guests); if one is in the active five they simply take that seat. Add one row per arc.
- From ch312 the row is **Sky** (the arc's focus, so he is never left behind even if benched) and **Rheon** (a guest). The Party screen shows a line saying who is brought along.
- **Sera** rejoins as an ordinary party member at ch312 (flag `sera_rejoined` ends her "away" status; she is seated if a slot is free).
- Rheon is taken out of the active five at ch312 so he does not use a slot; the player can still seat him.
- The chapter where Rheon's guest status ends is not known: add `until` to the row when it is.
- Maris Aurel (recruited at ch311) is not visible in any Arc XIII page.

## Build
`scripts/horizons.js` holds the spots, missions and lore (spot ids `hz312a`...). Places: 312-313 Tribute (Imperial Capital), 314 Frontier Port, 315 Western Archive, 316-322 the Sanctuary of Open Sky (the Sealed Sanctuary is renamed and opens from ch316, with a platform and a hall to visit). New: a ship route Tribute to the Old Trade Sea (ch313's map starts at "Tribute (Harbour)"). The Archive "Western Routes" tab lists the new lineage and Sky clues; Valor Resonance gains an "Answered" level.

## Mismatches and open questions
1. **Cover:** the regenerated cover labels Sera "Altan Princess" and its chart lists Azure Trench, Silverdale Passage and Elysian Reach, which appear in no chapter (not used).
2. **ch321 page** shows "Chapter 322" on its title card (author: should be 321). It is saved and numbered 321; regenerate the title if wanted.
3. **ch320 title** says "Half-Sister", but 315 says full sisters; and a speaker in 320 says "our mother" (the silver-haired speaker is not Jade or Sky). Kept as written in the page text; the game does not use "half".
4. **ch322 vs ch303/305:** 322 says Dima and Xima were later generations, not founders; 303 called Dima one of the foundational mentors of the early Valor ancestors. Both are in the lore; worth a wording pass.
5. **ch309 vs ch312:** the sanctuary was "not yet ready" for Jade; ch312 says it has answered and ch316 opens it. Built as written.
6. **Unnamed speakers:** the old woman mystic (314-322) and the veiled white-haired woman (321) are unnamed. In 312 the figures are not labelled; most lines are written without a name.
7. **Cast in the pages:** Maris (teal) is absent; a white-haired woman with a braided tiara (read as Sera) and a blond man (312) appear.

## Author's working brief (saved as sent)
**Theme:** Inheritance gives you a beginning, not an ending. **Focus:** Jade Gold, secondary Sky Yale. **Tone:** mystical, familial, exploratory, increasingly dangerous. **Key point:** Jade is not "Dima's chosen descendant": the Valor bloodline is older than both Dima and Xima, who were two expressions of something much older, and Jade is neither of them. Message: the bloodline carries capacity; character determines direction. Not used yet: Damien (parked in Delilah's later arc), Aster's Crown Princess material (a later Dragonvale return).

| Act | Chapters | Titles |
|---|---|---|
| I The Sanctuary Opens | 312-316 | The Door That Remembered Her; Return to the Western Road; The Name Valor; Two Sisters, Two Names; The Sanctuary of Open Sky |
| II What Elara Knew | 317-321 | Her Mother's Prayer; The Woman Before Mother; The Daughter Who Chose the Court; The Half-Sister Who Wandered; Sky's Inheritance |
| III Before Dima and Xima | 322-326 | Before the Witches; The First Division (guide and protect vs compel and reshape); Dima's Path; Xima's Path; Not Good Blood and Evil Blood (the split was ideological, not biological) |
| IV Valor's Sight | 327-331 | The Four Kinds of Vision; A Memory Is Not a Prophecy; The Lie That Feels True; The Future That Can Change; Ancestral Sight (unlocks the advanced Valor's Sight) |
| V Xima's Remnant | 332-336 | The Voice in the Bloodline; The False Ancestor (a remnant made of fear, worship and corrupted memory, not Xima); What Inheritance Becomes; Jade Gold (she chooses herself, not Dima over Xima); The Stars Are Still There (a last Yvette clue: she may have survived far longer than assumed) |

**Power progression:** Vision Flicker largely superseded; Valor's Sight becomes controlled and analytical; Spirit Sense more precise; Dima-linked magic understood as one expression of an older lineage; **Ancestral Sight** (new investigation power: Memory / Prophecy / Illusion / Spiritual Residue); the capstone stays locked for later.
**Gameplay:** *Interpret Vision* (outputs MEMORY, PROPHECY, ILLUSION, RESONANCE) from ch327; Valor Resonance becomes an unlock tree (I sense ancestral sites, II identify mystic symbols, III read spiritual residue, IV distinguish memory from prophecy, V Ancestral Sight); Sky's role: intuitive diagnosis, healing resonance, reading bodily/spiritual imbalance; Elara as a person (not omniscient: she knew pieces, suspected more, and gave Jade enough grounding to survive an awakening); the Yvette / Su Yan thread advances without resolving (she travelled farther west, knew the scattered branches, was investigating something, may have left on purpose; she does not appear yet).
**Rewards:** Western Sanctuary (permanent location); Valor Archive (new journal section); Elara history 317-320; Yvette trail from 320; Sky bloodline clue 321; Dima/Xima ancestral truth 322-326; Interpret Vision 327; Ancestral Sight 331; Xima Remnant boss 332-335; Advanced Valor Resonance 336.
**After Arc XIII:** Arc XIV returns to Dragonvale (Delilah/Dee or Aster first); Levi/Sally is another option.

## Build status against the brief (all chapters in)
- **Chapters 312-336:** pages, four chained clue spots each (`hz312a`...`hz336d`), 25 missions, lore, flags. Everything lives in `scripts/horizons.js` and the Sanctuary of Open Sky is the Sealed Sanctuary renamed from ch316.
- **Western Sanctuary** is a permanent location (with a platform and a hall to visit); the Archive tab "Western Routes" becomes the **Valor Archive** from ch316 (new journal section): Elara history 317-319, Yvette trail from 320 and her last clue at 336, Sky's maternal line (321), the Dima/Xima truth 322-326.
- **Interpret Vision** (from ch327, the renamed Interpret Resonance): four readings Memory / Prophecy / Illusion / Ancestral resonance; seven vision items so far (lanterns, prayer, the vision that looks back, the sealed door, the trial memory, the illusion, the branching futures, the voice that sounds like Xima).
- **Valor Resonance unlock tree** (from ch316): I sense ancestral sites, II identify mystic symbols, III read spiritual residue, IV distinguish memory from prophecy (chapters 328 and 330), V **Ancestral Sight** (ch331). After ch336 the tab also shows **Advanced Valor Resonance**.
- **Ancestral Sight (ch331)** = the page's "Advanced Valor's Sight": from then on each vision can be read automatically with "Read it with Ancestral Sight".
- **Xima Remnant boss** ("The False Ancestor"): a revisit fight in the sanctuary from ch335 (the chapter itself sets the boss flag, as with the Arc XI bosses).
- **Sky's role** is in the clues (the maternal line, healing and intuition); no separate Sky mechanic was added.
- **Not built:** Jade's "Vision Flicker superseded / Spirit Sense precision" as stat changes (no stats exist for them); the capstone form stays locked as the brief says.

## More mismatches and open questions (323-336)
1. **ch328 was sent twice:** the first copy (Devon with black hair) is used; the second draws Devon with dark-blue hair like Sky.
2. **ch335's last caption** has rendering glitches ("noes", garbled "herself"): regenerate if wanted.
3. **ch327** says ancestral resonance appears "especially in places connected to the **Gold** lineage"; the arc elsewhere says Valor. Kept as written.
4. **ch324** says Dima inherited one branch; ch303 called her a foundational mentor of the early Valor, and ch322 says she was a later generation. All three are in the lore.
5. **Speakers and cast:** who the pale-haired figure in blue-patterned clothes is (read as Sera), the red-haired man in green (Levi) and the dark-haired man (Devon) are inferred; Rheon is not clearly labelled in these pages.
6. **ch336's final clue** (a locket with a portrait and an old letter) is read as Yvette's; the page does not say who wrote the letter.
