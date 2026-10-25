# ARC XIV — THE HOUSE OF DEE (chapters 337-361; all built)

All 25 pages (337-361) and the cover (`assets/arcs/arc14.webp`, shown after ch336) are built (first pass). The cover reads "Arc XIV — The House of Dee". The title "The House of Dee" is the brief's; the cover may differ. Ch337's last panels set the arc: Dragonvale asks the Imperial Guard to investigate irregular military provisioning on its western frontier, naming the Dee household.

## Chapters
337 A Message from Dragonvale · 338 The General's Daughter (Delilah already reviewing the accounts) · 339 Numbers Before Swords (purchased vs delivered) · 340 The Dee Household (Damien introduced) · 341 What Merit Can Buy (Damien's merit for Delilah's legal standing) · 342 The Missing Convoys (Delilah a story guest) · 343 Ink and Grain (forged signatures, impossible numbers) · 344 The Woman Jade Remembered (Delilah acknowledges) · 345 No Excuses (her first real apology; Jade does not yet forgive) · 346 The Contract House (front contracts) · 347 A Scar from the War (Damien and the Qilang Tribes) · 348 The Woman Who Found Him (the tribal woman). Chapters 349-361 have not been sent (349 A Debt Unpaid, 350 That Is Not How Marriage Works, 351 The Trail Beyond the Garrisons, ...).

## Roster (author decision, built)
- **Delilah** and **Damien Dee** are **story guests** (`STORY_ALONG` rows in `scripts/core.js`, with a `guests` list for characters who are not in the party list): Damien from ch340, Delilah from ch342. They fight beside the five as controllable extras. The Arc XIII row (Sky and Rheon) now ends at ch337 (`until:337`).
- **Damien's plan (author):** Arc XIV start = guest NPC; mid-arc = temporarily joinable once his personal quest opens (around **ch351**); after the arc = optional recruit / reserve party member, available whenever the player is in Dragonvale or on future military/frontier quests; **never a permanent core member** (he does not displace Jade, Devon, Sky, Levi, Sera/Rheon); his later romance does not require him to follow Jade everywhere. **Not built yet:** the ch351 joinable state and the after-arc reserve rule wait for the pages.
- **Damien's kit (author's design, first pass):** Commander's Guard (intercept; signature), Disciplined Strike, Hold the Line (party defence), Field Command (crit window and speed, standing in for "accuracy/coordination"), Frontier Formation (barrier and guard, standing in for the ambush bonus). Delilah (a non-fighter): Contract Analysis (signature), Noble Poise, Fan Flourish.
- Portraits: Damien is the author's portrait, Delilah from her existing NPC image.

## Build
Places: **The Dee Household** (ch340), **The Western Frontier** (ch342) and **The Contract House** (ch346), listed on the Dragonvale North map (list mode; no markers). One new enemy, Convoy Diverter. `scripts/horizons.js` holds the spots, missions and lore (`hz337a`...). The Case tab shows Delilah at "Reconciliation: Stage II" once she has apologised (ch345).

## Mismatches and open questions
1. **ch338:** "Roe" in Delilah's line is Roc (not corrected in the page text; the game text uses Roc). Two panels draw Delilah visibly pregnant; no text says so, so the game does not.
2. **ch340 / ch346:** a few lines are garbled by the art (ch345 "I myactions", ch346 "I nly ont ngherr"); ch344 prints "biaes". Worked from the legible text.
3. **Damien's title** ("young general") are from the pages; no cast sheet exists.
4. **ch343:** the "original vs forged" signature belongs to "the general" (unnamed here: Delilah's father?). Left unnamed.
5. **The tribal woman (348)** is unnamed and has no portrait; nothing is implied about her fate. The Damien and tribal-woman thread is parked and not resolved.
6. **The Contract House's supplier** (goateed man) and the "lesser noble house" behind the front contracts are unnamed.
7. **Rheon's guest end point** is still unknown; Sera/Rheon are not in the chapters 338-348.

## Author's working brief (saved as sent)
**Theme:** Honor is not inherited; it is what you choose to do with what you have. **Focus:** Delilah Dee; secondary Damien Dee; supporting Jade, Devon, Roc. **Tone:** military intrigue, family reconciliation, frontier travel, mature romance, some comedy. Not another Roc redemption arc: Delilah proves she is no longer the jealous, status-conscious young woman Jade knew. Romance: Damien and the tribal woman. Political payoff: Delilah gains independent standing. Relationship payoff: Delilah becomes Roc's **wife, not a princess**. The tribal woman is **non-royal and non-noble** (the author has not generated her chapter yet: "let's see later").

| Act | Chapters | Titles |
|---|---|---|
| I A House Under Pressure | 337-341 | A Message from Dragonvale; The General's Daughter; Numbers Before Swords; The Dee Household; What Merit Can Buy |
| II Delilah's War | 342-346 | The Missing Convoys; Ink and Grain; The Woman Jade Remembered; No Excuses; The Contract House |
| III Damien's Debt | 347-351 | A Scar from the War; The Woman Who Found Him; **A Debt Unpaid** (he has wanted to find her for years; he intends to marry her to repay her kindness); **That Is Not How Marriage Works** (Delilah is first to object: gratitude, obligation and marriage should not be confused); **The Trail Beyond the Garrisons** (the supply investigation and Damien's memories point to the same frontier region; the party travels there with Damien) |
| IV The Tribal Frontier | 352-356 | The Moving Village (her people move seasonally); She Remembers Him (amused the half-dead soldier became a celebrated commander); I Did Not Save You for This (she rejects the repayment logic); Then Let Me Know You (gratitude is not love; he asks to stay long enough to know her; she agrees); The Frontier Agreement (Delilah negotiates a temporary supply and protection agreement that respects their autonomy) |
| V The Cost of a Supply Line | 357-359 | The Names Behind the Ledger (profit and influence, not a supernatural plot); The Defence of Northwatch (Delilah reroutes provisions and coordinates troops); What Delilah Dee Earned (the court records her standing as her own service; Damien opens the door, Delilah earns the right to remain) |
| VI Not a Consort | 360-361 | We Do Not Have to Remain What We Were (Jade and Delilah's second private conversation: mutual respect, not instant friendship); **His Wife** (Roc asks Delilah to be his wife; no princess title; Damien watches his younger sister marry first) |

**Final status:** Lady Delilah Dee, Military Legal & Logistics Adviser, Wife of Roc Chadstone (not Princess Delilah, no Princess Consort, no succession status unless deliberately changed later). **Damien:** not married in XIV; the arc ends with courtship begun. His lesson: gratitude can begin a relationship but cannot substitute for one. Also: decorated, humble, liked by soldiers, quietly protective of Delilah, believes in repaying kindness (too literally at first).
**Delilah's progression:** remembered as Roc's jealous consort, to recognised in her own right; studies privately, to uses expertise publicly; dependent on family/consort status, to independent standing; consort to wife.
**Younger-sister scoreboard (joke; family / younger sister / older brother / married first):** Gold: Jade, Adrian, **Jade**; Greyson: Evelyne, Hugh, **Evelyne**; Dee: Delilah, Damien, **Delilah**; Altan: Sera, Rheon, pending.
**Ending hook:** at Delilah and Roc's family gathering Aster observes how the royal family has changed; an official brings Crown Princess candidate records; Aster looks at Devon, who knows what is coming. Opens **Arc XV: Aster / Crown Princess Selection + Xuanji Genealogy** (and the Roc/Devon twin records).

**Gameplay (as proposed):**
- *Supply Ledger* (temporary investigation interface): compare ordered, purchased, dispatched and received quantity, official signatures, route and delivery date. Jade spots contradictory testimony; Delilah spots impossible logistics.
- *Convoy missions:* Escort Provisions, Recover Missing Shipment, Audit the Garrison, Emergency Reallocation (timed defence), with Delilah as tactical adviser.
- *Delilah's Guest Adviser abilities:* Provisioning Order (a small supply/healing bonus at encounter start), Read the Contract (reveals hidden quest/investigation information), Reallocate Supplies (cheaper mission resources), Officer's Network (military contacts or alternate quest solutions), Deployment Plan (temporary initiative/speed in defensive encounters). She stays a guest, not a permanent fighter.
- *Damien guest gameplay* (frontier section): Commander's Guard, Disciplined Strike, Hold the Line, Field Command. Reliable, disciplined, unshowy.
- *Hidden Jade + Delilah flags* (no visible meter): Delilah Owns the Past, Works Beside Jade, Protects the Frontier, Earns Her Standing, Jade Sees the Change; with all of them the second conversation (ch360) unlocks the reconciliation.
- *Legal change at ch361:* Roc relationship Consort to Wife; no princess title.

## Build status against the brief (chapters 337-348)
- **Built:** chapters 337-348 (pages, clues, missions, lore, flags); Delilah and Damien as controllable story guests with first-pass skill sets; the Dee Household, Western Frontier and Contract House; the Case tab's Delilah stage reads "Stage II (an apology given)" after ch345.
- **Built but different from the proposal:** Delilah's guest abilities are the first-pass fighter-support skills (Contract Analysis, Noble Poise, Fan Flourish); the proposed Guest Adviser set (Provisioning Order, Read the Contract, Reallocate Supplies, Officer's Network, Deployment Plan) is **not** built.
- **Not built:** the Supply Ledger interface; convoy missions; the hidden five-flag Jade/Delilah progression and the ch360 unlock; the Delilah legal change and the "Lady Delilah Dee, Military Legal & Logistics Adviser" status; Damien's joinable state from ch351 and the after-arc reserve rule; the tribal woman (no chapter yet; unnamed); the Aster hook.
- Note for 349-361 when they arrive: the chapter after 348 is **349 A Debt Unpaid**, not 351; the guest end points are still to be decided (suggest Damien becomes joinable at ch351 and both guests end with the arc).

## Update: chapters 349-358 built
- **Chapters 349-358:** pages, four chained spots each (`hz349a`...`hz358d`), 10 missions, lore, flags, a new place **The Moving Village** (from ch352, on the western pass from the Western Frontier; listed on the Dragonvale North map).
- **Damien (author's plan, built):** guest from ch340; **joinable at ch351** (`JOIN_CH.damien = 351`): he joins as a **reserve**, is not auto-seated and displaces no one; the player can seat him. He is not a core member. After the arc he stays in the party list as an optional companion. The story-companion row for him ends at 351.
- **Delilah:** guest from ch342; her row runs to ch361 (`until:362`, adjust when the author sets the end). **Provisioning Order** is built: while she is with the party each fight starts with a 5% heal for everyone. Her other adviser abilities (Read the Contract, Reallocate Supplies, Officer's Network, Deployment Plan) are covered by her investigation role (XP on clue spots) and are otherwise **not built**.
- **Supply Ledger** (Archive tab, from ch339): the purchased and delivered quantities from ch339 (grain 10,000 and 6,200 and so on, with the percentage missing) and nine findings that unlock with the clues (paid in full, garrison shortages, forged signatures (Jade), impossible quantities (Delilah), three names one seal, stone-and-scrap crates, and Han Lirong, Wei Shun, Zhou Ren). Not built: the ordered/dispatched/route/date comparison (the pages give purchased/delivered only), the convoy missions and the Emergency Reallocation timed mission.
- **The Frontier Agreement (ch356)** is recorded as lore and an achievement; the temporary agreement has no gameplay effect yet.

## More mismatches and open questions (349-358)
1. **ch350 attribution:** the speech bubbles put "You saved my life" and "I will not marry you out of obligation" in a stream that reads as if Delilah were addressing Damien as the one proposing (or the tribal woman); the page does not say. Built as Delilah stating the principle; the garbled lines are kept short.
2. **ch355 vs ch356-358:** ch355 ends with Damien staying in the moving village, yet he is with the party in 357 and 358 (the village stays the party's base). Left as drawn.
3. **ch358's Northwatch** is a frontier fortress under attack; Arc XI's "Northwatch Station" (the hidden station beneath the pines) is a different place. The game uses the Western Frontier for it; confirm they are not the same.
4. **The tribal woman** is unnamed in 353-358 (the author has not decided: "we'll see later") and appears in 358 helping with the forest route; no portrait.
5. **Named conspirators (357):** Han Lirong (Regional Governor), Wei Shun (Contractor), Zhou Ren (Merchant) have portrait cards on the page but no game portraits. "The guilds in the capital" and "the Imperial Advisor" are mentioned but not named.
6. **Art glitches:** ch357's Devon lines ("we wemove against it nqrd...") and ch358's caption are garbled; the legible text was used.

## Update: finale (359-361) and cover built
- **359 What Delilah Dee Earned** (flag `delilah_standing`), **360 We Do Not Have to Remain What We Were** (`jade_delilah_reconciled`), **361 His Wife** (`arc14_complete`, `delilah_wife`, `damien_courtship`); all with four chained spots, missions, lore.
- **Hidden Jade + Delilah progression (built, no meter):** Delilah Owns the Past (clue chain 345 done), Works Beside Jade (343), Protects the Frontier (Northwatch held, 358), Earns Her Standing (ch359), Jade Sees the Change (346). With all five, the second conversation (the ch360 spots) opens; otherwise it shows "Jade has not yet seen enough of the change in Delilah".
- **Delilah's legal change (built):** after ch361 her name reads **Lady Delilah Dee** and her class **Military Legal & Logistics Adviser**; the Case tab shows "Lady Delilah Dee: Military Legal & Logistics Adviser, Wife of Roc Chadstone". No princess, princess-consort or succession status anywhere. Her guest row ends after ch361.
- **Damien:** courtship flag at 361; he stays an optional reserve companion (no marriage in Arc XIV).
- **Cover:** the Arc XIV cover shows Damien (Young Dragonvale General), Jade (Imperial Guard), Devon (Devoted Prince), Delilah (Dragonvale Noblewoman) and the Qilang Tribal Woman (The One Who Saved Him); its map scroll reads Dragonvale, Dee Territory, Imperial Capital, Eastern Frontier, Qilang Mountains (the chapters say "western frontier").
- **Not in the pages:** the Aster / Crown Princess epilogue hook the brief planned for the end of the arc (Aster and the candidate records, Devon's look); ch361 ends with Damien's courtship and Delilah's wedding. It will have to come from a later page or arc opener (Arc XV).
- **Still not built:** the ordered/dispatched/route/date Supply Ledger comparison, the convoy missions and Emergency Reallocation, Delilah's other adviser abilities (Read the Contract, Reallocate Supplies, Officer's Network, Deployment Plan), and a gameplay effect for the Frontier Agreement.

## More mismatches (359-361 and cover)
1. **Cover:** "Eastern Frontier" on its map scroll against the chapters' western frontier; Damien is a "Young Dragonvale General" (not "commander"); Devon's title "Devoted Prince".
2. **ch359/361 speakers:** many lines are unattributed; the congratulations in 361 ("I'm glad you're happy. You've earned this.") are **Jade's** (author's correction, page replaced). The teasing ("Look, little brother. You are late.") is still unnamed.
3. **ch361:** a caption prints a laughing emoji; Roc appears with a moustache and a tied-up bun, unlike earlier chapters' look.
4. **The younger-sister scoreboard** (Delilah married first) is in the brief, not on the pages.

## Delilah's adviser abilities (built, Arc XXII prep)
`scripts/delilah.js`. While she travels with the party (STORY_ALONG rows: ch342-361 and the Arc XXII logistics investigation ch558-562, `until:563`): **Provisioning Order** (earlier: 5% recovery at the start of every fight), **Read the Contract** (Exploration bar, once a day: shows the fine print of the next search, which is clues left, reward and ambush risk, gives bonus XP, and a finished investigation pays 40% more gold), **Reallocate Supplies** (passive: inn rests 25% cheaper, fares 10% cheaper through the shared fare perk and its 40% cap), **Officer's Network** (Exploration bar, once a day: the next search or journey cannot be ambushed) and **Deployment Plan** (every fight starts with +15% speed for three turns). Still not built from the Arc XIV list: the Supply Ledger ordered/dispatched comparison, convoy missions and Emergency Reallocation, and a gameplay effect for the Frontier Agreement.

## Convoy desk and the Frontier Agreement (built)
`scripts/convoys.js`. From ch361 (flag `delilah_wife`) **Lady Delilah's Convoy Desk** is a spot at the Noble Court, Dee Manor, the Western Frontier and the Northern Frontier. Standing jobs on a 3-day cooldown (counted from the end of the job): **Escort Provisions** (2 days, a fight), **Recover a Missing Shipment** (1 day, a fight, plus tonics) and **Audit the Garrison** (2 days, no fight: 60% to find a lie, 85% with Delilah in the party). **Emergency Reallocation** is the urgent job: posted on certain days (decided by the day, so reloading cannot re-roll it), open for 3 days; the player chooses where the last supplies go (arrows: +15% attack and magic; medicine: +25% health and regeneration; grain: +15% defence and a barrier) and defends the outpost. If the window passes nothing is lost. Pay is a share of the latest investigation's reward (40%, 45%, 35%, 80%), +25% with Delilah in the party and +20% with the Frontier Agreement. **The Frontier Agreement (flag `frontier_agreement`, ch356)** now also makes beds at the Moving Village and the Western Frontier 40% cheaper. Two deeds (the first train, ten jobs). First-pass numbers.
Still not built from the Arc XIV list: the Supply Ledger ordered/dispatched/route/date comparison (the pages only give purchased/delivered).
