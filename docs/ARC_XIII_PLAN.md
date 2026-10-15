# ARC XIII (title pending) — the return to the Western Sanctuary (chapters 312-322 so far)

Pages 312-322 are built (first pass); the arc title, cover and the remaining chapters have not been sent. Ch312's last panel says "Next Objective: Arc XIII".

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
1. **Title and cover for Arc XIII** are missing; chapter type says "title pending".
2. **ch321 page** shows "Chapter 322" on its title card (author: should be 321). It is saved and numbered 321; regenerate the title if wanted.
3. **ch320 title** says "Half-Sister", but 315 says full sisters; and a speaker in 320 says "our mother" (the silver-haired speaker is not Jade or Sky). Kept as written in the page text; the game does not use "half".
4. **ch322 vs ch303/305:** 322 says Dima and Xima were later generations, not founders; 303 called Dima one of the foundational mentors of the early Valor ancestors. Both are in the lore; worth a wording pass.
5. **ch309 vs ch312:** the sanctuary was "not yet ready" for Jade; ch312 says it has answered and ch316 opens it. Built as written.
6. **Unnamed speakers:** the old woman mystic (314-322) and the veiled white-haired woman (321) are unnamed. In 312 the figures are not labelled; most lines are written without a name.
7. **Cast in the pages:** Maris (teal) is absent; a white-haired woman with a braided tiara (read as Sera) and a blond man (312) appear.
