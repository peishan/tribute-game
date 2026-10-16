# ARC XIV (title and cover pending) — the Dee household and the western frontier (chapters 337-348 so far)

Pages 337-348 are built (first pass). The arc title, cover, brief and chapters from 349 have not been sent. Ch337's last panels set the arc: Dragonvale asks the Imperial Guard to investigate irregular military provisioning on its western frontier, naming the Dee household.

## Chapters
337 A Message from Dragonvale · 338 The General's Daughter (Delilah already reviewing the accounts) · 339 Numbers Before Swords (purchased vs delivered) · 340 The Dee Household (Damien introduced) · 341 What Merit Can Buy (Damien's merit for Delilah's legal standing) · 342 The Missing Convoys (Delilah a story guest) · 343 Ink and Grain (forged signatures, impossible numbers) · 344 The Woman Jade Remembered (Delilah acknowledges) · 345 No Excuses (her first real apology; Jade does not yet forgive) · 346 The Contract House (front contracts) · 347 A Scar from the War (Damien and the Qilang Tribes) · 348 The Woman Who Found Him (the tribal woman). Chapters 351+ ("The Trail Beyond the Garrisons", where the search for the tribal woman begins) have not been sent; 349-350 are not known.

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
