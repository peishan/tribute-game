# CRIMSON HORIZON: THE ADVENTURES OF SAN AND JADE (the sequel; planning, nothing story-side built yet)
Author's direction: after the crossover (Tribute ends at the crossover's chapter 990) comes the sequel, **Crimson Horizon: The Adventures of San and Jade**: Jade and San combine forces. Inter-world exploration; **no Fifteen Evils counter** (Dima and Xima's story is over). A true crossover for both worlds: **each world builds its own equivalent in its own game, from shared chapters (the same pages) to save resources.** The sequel's chapter numbers **restart at 1**. Dima and Xima keep no fixed look (one golden/yellow, one dark).

## Built so far (infrastructure only)
- **Upload bot** (`.github/workflows/pages.yml`, same approach as Crimson Moon): drop PNG/JPG files into the right folder and the next push to main converts each to WebP (quality 82), deletes the original, commits the result and deploys. Any file name works (the name is kept, only the extension changes):
  - `assets/comics/` Tribute pages (`ch991.png`, `ch991b.png`); `assets/arcs/` Tribute covers (`arc40.png`)
  - `assets/horizon/` the sequel's pages and covers (`c005.png`, `c005_2.png`, `arc02.png`); `assets/horizon/portraits/` sequel portraits
  - `assets/party/` and `assets/npc/` character portraits. Portrait folders shrink anything larger than 512x512.
  Tall images over WebP's 16,383 px limit are sliced into `name.webp`, `name_2.webp`... Icons and every other folder are never touched. Tested locally with sample files; not yet run in GitHub Actions (first real upload will show).
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

## The end of Tribute (author): built
After chapter 990 completes, a **"Tribute complete"** end-of-run splash plays (using the Crimson Horizon cover art, `assets/horizon/arc01.webp`): "Tribute: Curse of the Hidden Isle is complete. The story continues in Crimson Horizon: The Adventures of San and Jade." It sets the flag `tribute_complete` (listed with the story flags). `main_quest_complete` (ch900) stays as the main-campaign marker; the splash can be reopened like the other end-of-arc splashes. The sequel itself is not built.

## Received (author): sequel portraits, rosters and the first chapters
Saved in `assets/horizon/` (already WebP): **portraits** `portraits/{san,joel,jade,devon,sky,levi,sally}.webp` (512x512, new Crimson Horizon looks: compass-star outfits); **roster sheets** `roster.webp` (labelled, 13 active members) and `roster_alt.webp` (unlabelled version); **research team sheet** `research_team.webp` (Renn, Erynn, Mimi, Adrian, Fen with ages and roles); **pages** `c000.webp` (Prologue, "A New Voyage": "Crimson Horizon begins here"), `c001`-`c004` (arc "A New Voyage").
- **Unified crew, 13 active:** San (Captain/Sorcerer), Joel (First Mate/Paladin), Jade Gold (Imperial Guard/Expedition Leader), Devon Chadstone (Prince of Dragonvale/Strategist), Sky Yale (Physician/Healer), Levi Stanson (Ranger/Explorer), Sally Sun (Information Specialist/Agent), Aisyah (Quartermaster/Shadow Walker), Mezstorm (Storm Mage), Sairen (Former Nameless Agent/Specialist), **Vaeren** and **Joelle** (protected children, emerging mages; one sheet misspells "Vairen"), **Soel** (guardian / blessing cat). Notes: "Jade and Sally fight from protected range due to pregnancy" (a ranged role, not a restriction on fielding); the twins remain protected while training.
- **c001 The First Storm:** the Veyren pregnancy key notes (years, not months; expectant members stay active with role adjustments); **Sera, Fen and Evelyne are expecting, Mirelle likely, Jenika is not (for now).** San carried Vaeren and Joelle for years. **c002 The Storm's True Form:** a colossal sea-born leviathan; San long-range sorcerer, **Jade tactical ranged with the "Crimson Repeater"**, Sally precision support with the **"Veilstring Bow"**. **c003 What the Storm Left Behind:** violet pulses under the waterline; Joel; a fishing boat asks for help getting home. **c004 The Channel Through the Reef:** lantern signals, two boats still out, "go dark before every surge".
- Not built (no sequel screens yet): the ranged equipment for Jade and Sally, the 13-member roster, the pregnancy notes. Open questions unchanged: sequel inside this repo? how many fight at once (the roster shows 13 active + 3 protected)?

## Decision (author): the sequel's difficulty and the 13-member crew
Sequel monsters and bosses are **much harder** and are meant to **call on all 13 crew members**, not a team of five (this answers "how many fight at once": the whole crew).
**A count to settle:** the roster sheet's "13 active members" lists San, Joel, Jade, Devon, Sky, Levi, Sally, Aisyah, Mezstorm and Sairen (10) **plus Vaeren, Joelle and Soel**. But the same sheet marks the twins "protected while training" and Soel as unfieldable and unkillable. So either the fighting crew is **10 adults + the twins as casters (12) with Soel as a passive blessing**, or only the 10 adults fight and "13" counts everyone aboard. Not assumed: tell me which.
**Proposal (not built):** a wider battle line than Tribute's 5 seats (up to 12 fighters), enemies scaled from the whole crew's average level with a large sequel multiplier and many more HP/phases, and boss mechanics that need several roles at once (like the Tribute boss modules: a role-based action per character). Soel as a passive party-wide blessing that cannot be hurt.

## How the Crimson Tide repo does its battle screen (read from `daybreak-crimson-tide`, `scripts/core-engine.js` `renderCombat`; the author's structure for the sequel)
- **One enemy, the whole crew:** a single enemy panel (art, name, HP bar, status icons such as burn / exposed / marked) above an **auto-fill party grid** (`.combat-party-grid`, 3 columns on phones) showing **every active crew member as a card** (portrait, name, role, level, HP bar, MP bar, shield icon). The crew is `getActiveParty()` = everyone unlocked; no seat limit, no benching.
- **Turn order and actions:** the party acts in order each round (fallen members are skipped); one shared action row: **Attack, Spell, Skill, Defend, Item, Flee**, with spell/skill/item pop-up menus and a **🤖 Auto** toggle (700 ms per auto action). Defeat only when the whole crew is down; a fallen member can be revived mid-fight (Eliz's Resurrect).
- **Special cases already coded there:** **Eliz and Soel are unkillable** (damage lands but cannot take them below 1 HP); **Vaeren and Joelle are protected**: they act, cast and deal damage every turn but are removed from the enemy's target pool entirely while "young and growing" (conditional, ends when their power level reaches a threshold). Soel is a fielded member (support role, 50 HP).
- **Levels:** one captain level (`level()`), with characters' levels derived from it (`characterLevel`, `levelStatMult`), which fits the "both parties on exact power levels" idea.
- **Difference from Tribute:** Tribute's battle has several enemies, a 5-seat party, per-character levels and role-specific boss modules. Matching the sequel screen means a grid of up to 13 cards, one boss-sized enemy at a time, and the DCT rules above (Soel unkillable and fielded; the twins untargetable).
**Resolves the count:** the "13 active members" are 10 adults + Vaeren and Joelle (fielded, protected from hits) + Soel (fielded, unkillable). So all 13 take part in battle.

## Soel in the sequel (author)
Soel is a **blessing cat**: he gives **HP and MP recovery**, and in the sequel he can also give **party blessings and boosts**. **He does not do direct combat** (unlike the early Crimson Tide chapters), so he never attacks or takes a damage-dealing turn; he supports only. Still unkillable. This replaces my earlier note that he is "a fielded support with attack": he is a **support-only party card**.
**Proposal (not built):** one blessing action per round, chosen from a small kit: a party heal/MP-restore pulse, and timed party boosts (ATK/DEF/SPD/crit/resist). Strength scales with the crew's level so it stays useful against the much harder sequel bosses. The kit's exact boosts and numbers are for the author to decide.
