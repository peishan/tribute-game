# CRIMSON HORIZON: THE ADVENTURES OF SAN AND JADE (the sequel; planning, nothing story-side built yet)
Author's direction: after the crossover (Tribute ends at the crossover's chapter 990) comes the sequel, **Crimson Horizon: The Adventures of San and Jade**: Jade and San combine forces. Inter-world exploration; **no Fifteen Evils counter** (Dima and Xima's story is over). A true crossover for both worlds: **each world builds its own equivalent in its own game, from shared chapters (the same pages) to save resources.** The sequel's chapter numbers **restart at 1**. Dima and Xima keep no fixed look (one golden/yellow, one dark).

## Built so far (infrastructure only)
- **Upload bot** (`.github/workflows/pages.yml`, same approach as Crimson Moon): drop PNG/JPG pages into `assets/horizon/` named `c001.png` (chapter 1), `c001_2.png` (its second page), `arc01.png` (a sequel arc cover); the next push to main converts them to WebP (quality 82), removes the PNG, commits the result and deploys. Tall images over WebP's 16,383 px limit are sliced into pages. Files that do not match those names (including everything in Tribute's `assets/comics/`) are never touched. Tested here with sample files; it has not yet run in GitHub Actions.
- Nothing else: no sequel chapter list, journal or screens exist yet.

## Assumptions (change any of these)
1. The sequel lives **inside this repo** as its own section (own chapter list, own numbering from 1), not a separate repo. If it should be its own repo, the bot above moves there and the plain `ch001.png` names can be used.
2. Shared chapters use the **same sequel chapter number in both repos**, so a page maps to the same file name on both sides.
3. Tribute shows the story from Jade's side (the Canon Five); San's inner side stays in the Crimson Tide repo.

## Needed from the author before building
- The sequel's first chapter pages and any brief (arc structure, cover).
- Whether the Tribute canon five stay Jade, Devon, Sky, Levi and Sally in the sequel, and who joins San's side.
- What marks the end of the Tribute chapters (the "chapters end" marker before the sequel).

## Sequel roster (author): a dual party
**Tribute side, the Canon Five:** Jade, Devon, Sky, Levi, Sally (the existing party lock still applies: they cannot be removed). **Jade is pregnant** with an "insanely long" pregnancy: Dragonvale pregnancies take 12 months at most, but she conceived after the Veyren Fountain restoration, so the Veyren and Dragonvale timelines stack ("to be fair": super long).
**Crimson Tide side:** San and Joel; Joy; Aisyah and Mezstorm; **Sairen (story-required)**; **the twins, Vaeren and Joelle (story-required)**; **Soel the familiar: unfieldable and unkillable.**
**Enemies:** the bosses and monsters are expected to be super high level.

### How this maps onto what Tribute already has (proposal, nothing built)
- **Dual party:** two rosters in one party screen, the Canon Five and the Crimson Tide group, each with its own lock list. "Story-required" characters (Sairen, the twins) use the same lock as the canon party: always in their party, cannot be benched.
- **Soel:** a passive companion that is never a fighter and cannot be hurt (like the Ghost Healer, a hidden passive companion): shown, can act in scenes, takes no seat and takes no damage.
- **Levels:** guests and the second party take the host party's level at join (see the level discussion); enemy levels scale from the fielded party average plus a sequel offset, so "crazy high level" bosses stay a fair fight for an aggressive player.

### Open questions
1. **Jade's pregnancy in play:** she can never be removed from the party. Does she still fight at full strength while pregnant (a status/flavour only), or does the pregnancy change what she can do in battle (a cap, fewer skills, protected position)? Nothing is assumed.
2. **How many can fight at once?** Both parties together (up to 10 + guests), or one active party of five drawn from the two rosters?
3. **The twins' age** in the sequel (children, or grown?), which decides whether they fight at all.
4. **Soel** also appears in the Crimson Tide repo as a familiar: confirm he never needs stats in Tribute.

## Pregnancies are a running joke (author)
Jade will not be the only one pregnant: **San's joke (the Fountain / Cold Spring recommendation) "gets too far" and Jade's friends end up pregnant as well.** It is comic relief. Already on the pages: Jade (979) and Sally (983 per the roadmap); who else is not specified, and none is assumed.
**Proposal:** treat pregnancy as a story and comedy state only, with **no combat penalty**, so the locked canon party (Sally included) and Jade stay fieldable. Open question 1 above (Jade's pregnancy in battle) then covers everyone: if the author wants any battle effect, it applies to all of them the same way.

## Decisions (author): the twins and the pregnancies (answers open questions 1 and 3)
- **The twins (Vaeren and Joelle)** are **toddlers at the start of DCT arc 42 / the crossover**, but **already magic practitioners** and bigger than their real age. They are story-required fighters (casters); how a toddler's role reads on the page is a writing choice for the shared chapters.
- **Jade's pregnancy: no restrictions at all until the month she goes into labour.** It lasts about **3 years**, so for nearly all of the sequel she fights normally. The labour month is the only gap (the game already has a "disabled" state for a story absence: she stays in the party but cannot fight for that month, then returns). Same rule as San in DCT, who was pregnant for years (arc 22 up to arc 35).
- **Friends who are pregnant are mostly not partiable** (they stay as non-party allies and story characters), **except Sally**, whose pregnancy runs about **2.5 years** and who stays in the party (she is part of the locked canon five). Which friends are pregnant is not yet named; none is assumed.
- Open still: how many fight at once (both parties or one team of five) and Soel's stats (none needed).

## Jade's pregnancy and abilities (author)
- **Jade's pregnancy might give her new abilities.** Nothing is built or assumed: wait for the comic chapters, the author decides when they are drawn.
- **Style difference to keep in mind:** San is a mage who does not use physical force in her fights; Jade fights physically (she jumps and leaps for her **Lunar Lash**). So Jade fighting with no restrictions through the pregnancy is a deliberate contrast with San's casting-only style, and the pages (not the game) decide how that reads.

## Jade in the sequel: equipment and skills during the pregnancy (author, undecided)
Possible directions the author floated (not decided; wait for the comic chapters): **special equipment**, and/or **certain abilities reduced or not used as the pregnancy becomes more apparent**. Jade already has a ranged option in Tribute: **Levi's crossbow (chapter 30, "Crossbow Shot", a free ranged attack, flag `crossbow`)**, so a ranged style for her does not conflict with Levi's role as the archer. Nothing is built.
