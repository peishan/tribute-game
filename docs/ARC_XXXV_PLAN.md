# ARC XXXV: WHAT COMES AFTER (chapters 876-931 built  from pages; cover arc35.webp registered; no brief)
Chapter 876 onward carry the "Arc XXXV: What Comes After" banner. Pages only; none of the final choice mechanics are built (docs/ENDGAME_PLAN.md still holds the plan for 893-900 and `main_quest_complete`).

- **876 The Road Beyond Purification:** the purified routes link as one network; the southeastern route is a direct connection to Dima and Xima.
- **877 Fifteen Empty Places:** the Fifteen are no longer Evils; their positions remain as stabilising anchors.
- **878-879 What Xima Was Protecting / What Dima Failed to See:** Xima corrupted the anchors partly to hold back a larger collapse; Dima restored too much too quickly. Restoration is about sequence, balance and timing.
- **880-885:** the final route; Dima and Xima appear as preserved consciousnesses; their original roles (Dima preserves, Xima contains); each was given a selected truth; "the missing hand" is the guidance intelligence; Jade refuses to call either sister hero or monster and both accept responsibility.
- **886-889:** the Guidance Intelligence steps forward openly; reunited worlds can compare notes (its weakness); it offers Jade the "safe road", then the false binary (seal everything / open everything); Jade refuses and claims a third path: a connected world with boundaries, shared rules and mutual safeguard.
- **890-892:** there is no Sixteenth Evil: the adversary is a corrupted system intelligence that can only be dismantled, reformatted or replaced; the party disconnects it (isolate the core, sever decision access, restore the independent network); the network wakes without a master.

## Notes
- Sky is not drawn in 876-892 (Sky's personal crisis was said to wait in 875); he is not listed in those chapters.
- The pages never show where the party stands from 880 on; the places are provisional (the sealed records).
- Chapters 876-892 read "cover to come". Chapter 893+ not yet sent.

## Chapters 893-914 (built from pages)
- **893 A Choice Shared:** the new shared decision process (assess, discuss, choose). **894 The Last False Direction:** the Guidance Intelligence loses control for good; its records are kept as an accountable archive. **895 Dima / 896 Xima:** each releases her hold (Dima revokes her access; Xima dissolves the Fifteen positions). **897 Sisters Rise:** the sisters are remembered in full.
- **898 The Last Trial:** the old system's final spasm. Built as a fight (`scripts/lastspasm.js`, boss spot `last_spasm_898` at the sealed records, three phases using each party member's role from the page: Sally disables defences, Jade disables the control arrays and breaks the core, Levi marks weak points, Devon draws the attacks, Sky cleanses and steadies).
- **899 The Chooser:** Jade faces Preserve / Dismantle / Reshape. **900 What Comes After:** the Fifteen are gone, Xima's curse destroyed, the network stable, the Black Pearl stays with Devon as custodian, Jade returns to the Imperial Guard: "The main objective of Tribute is complete." It sets `main_quest_complete`. **The pages never show which of the three paths Jade chose, so none is recorded and no choice screen was built.**
- **Epilogue, Lives After the Fifteen (901-914):** Jade's quiet assignments; Jade and Devon at home, childless with no reason given; Yvette Sue Valen returns to Lingering Vale; Yale and "Su Yan"; why she left Sky with Yale; Yale's western name Shane Yale (杨生安, Yang Sheng'an); Yvette meets Jenika and Star; Star at three, raised by three healers; Sky's life; Liora and Roc and Delilah's twins (912-914 are flashbacks to the twins' early days, which the story skipped).
- 903 arrived in two versions; the cleaner second one is built.

## Notes
- Not built: the "MAIN QUEST COMPLETE" banner and any postgame hook beyond the flag.
- 893-900 sit at the sealed records or Dragonvale; 901-914 at the capital, Lingering Vale or Dragonvale (the pages do not name the places).

## Chapters 915-931 (epilogue pages)
- **915-916** Fen and Aster's son is born and acknowledged heir; Fen as queen, scholar and mother. **918** Elise and Tarin's frontier life with their daughter Seren. **919-921** (Rheon & Mirelle) the Altan heir is born, the marriage/inheritance reforms take effect, the Mirror restoration gave Mirelle motherhood. **922-924** (Sally & Levi) back to the Guard, Lenny as godfather, the Stanson children. **925-927** Adrian and Eve's two daughters; Adrian as scholar, father and councillor. **928-929** Damien's wedding invitation and wedding. **930** Hugh and Sera, still not saying it. **931** "Years Later": the party each in their way, then a rift tears across the sky and a ship and people from another world arrive. **No more is shown; nothing past the hook was invented.**
- **917 One Is Enough** (Aster and Fen decide one son is enough) arrived later and is built. 913 arrived twice (identical); only one is built.
- **926** is a second "Two Daughters" page that combines 925 and 927 on one page; it is built as its own chapter.
- Elise's daughter is named Seren on the page (903 said only "Elise has a son on the frontier": the page now shows a daughter; both are kept as drawn and flagged here). 903 also said Aster and Fen had a son, which 915 now shows being born.

## Campaign end and the Crossover
The author's direction: the main campaign ends with the rift chapter (931), and **from the rift chapter onwards the Crossover unlocks, which ends the main campaign.** The Crossover itself has not been specified or built; 931 is the last chapter. Frontier Elise and Frontier Tarin portraits (see docs/PORTRAIT_PROMPTS.md) show from chapter 918.

## Frontier Work (from chapter 918)
Per the author: the Frontier Elise and Tarin versions unlock the frontier quests and bounties: tasks to settle quarrels and to kill beasts and monsters that disrupt the peace of frontier residents. Built as `scripts/frontierwork.js`: a Frontier Work Board at the Northern Frontier (both frontier places), four quarrels (settled by hearing both out, going by the law or letting the elders decide; Jade in the active party helps) and five beast/monster bounties (real fights). Everything is repeatable and reposts after 5 days; first-pass numbers. Elise and Tarin do not appear as board characters yet.

## Party lock (author)
Each member of the canon party is locked into the active party **for good** from the chapter where they join or rejoin, whether or not the chapter draws them: **Jade** always; **Devon** from the wedding (ch57); **Sky** from his recovery (ch61); **Levi** from his return (ch87); **Sally** from the chapter where she rejoins the party (ch436). **Seraphina** is a **guest** from the chapter where she rejoins (ch312): she fights beside the party but never takes a seat and cannot be seated. The game re-adds any locked member who is missing (on load, chapter change and location change) and drops other heroes if the seats overflow. Implemented in `core.js` (`canonFive`, `guestOnly`, `unbenchable`, `syncAway`, `GUEST_RULES.seraphina`).

## Elise and Tarin: deactivated, then frontier quest givers (author)
- **Tarin** is deactivated once they have run away together (ch621, flag `elise_leaves_dragonvale`); **Elise** once she fakes her death (ch628, flag `elise_valen_dies`). Their ally panels and perks (Border Accord, Frontier Network, Logistics Command, Border Trail) switch off. (Elise stays in her "away" panel for 621-627.)
- From the epilogue chapter that shows their fate (**918**) they return as **frontier quest givers and allies**: Elise posts the quarrels and Tarin the bounties on the Frontier Work Board, their old perks come back, and they **stay on the frontier and can never be partied** (they never fight). Portraits: the Frontier versions.
- Also fixed: 75 chapter banners had a garbled "Arc for(let i=18;i<=610;i++)IV" type string; now "Arc XXIV".
