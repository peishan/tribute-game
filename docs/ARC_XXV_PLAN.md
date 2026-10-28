# ARC XXV: THE FLAME WITHOUT A VOICE (planned title; subject to change until the chapters are final)
Source: the author's roadmap (docs/ROADMAP_XXIII_TO_ENDGAME.md): the Silent Flame, Sally and Levi's relationship resolution and marriage, 9 / 15 on resolution. Arc XXIV ends at 635; 636 begins Arc XXV (its closing card says "Arc XXV").

## Built so far: 636, 638-653
**Missing:** **637** (not received), the chapters after 653 (the Flame's resolution and the aftermath: the pages end on the boss), and the Arc XXV cover. The Silent Flame is registered as an active Evil from 638 (the Ninth Shadow, as ch646 says); its `resolveCh` is not set because the resolving chapter has not been received, so the tracker still reads 8 / 15.
- 636 Back on the Road: the five leave Dragonvale; Fen is publicly queen; Sky resumes travelling, unaware of Jenika's pregnancy.
- 638 No Cry for Help, 639 Sally Without Music: a mountain village where no sound can be made (a worker falls unheard, a child wanders toward danger, a fire spreads silently); Sky finds the villagers' throats unharmed and something suppressing vibration; Jade suspects one of the Fifteen.
- 640 The Old Beacon Road, 641 Things That Move Quietly, 642 Hand Signals (Levi teaches Silent Command), 643 Rhythm Without Sound (Sally feels vibration through her instrument: the foundation of her counter-technique).
- 644 The Bell That Never Rings, 645 Someone Fed the Fire, 646 The Ninth Shadow, 649 The First Voice Taken, 650 What Restoration Would Cost (Jade decides the Flame must end: even its original function required living offerings, so there is no harmless state to restore it to).
- 647 Levi's Trail, 648 You Understood Me: Levi and Sally; silence does not stop them communicating (the start of the relationship resolution; the marriage is not on these pages).
- 651 Enter the Silent Furnace, 652 The Flame That Makes No Sound (both without dialogue), 653 Boss: The Silent Flame (the four-phase design page).

## Places (assumed: the pages name only the Silent Furnace)
The Silent Village (638-639), the Old Beacon Road (640-650) and the Silent Furnace (651-653), with routes from Dragonvale (5 days north) and onward (2 and 1 days). The pages do not say where in the world the village lies; Dragonvale is only a placeholder for the route.

## Mechanics built (scripts/silentflame.js, first-pass numbers)
- **Silent Command** (page 642): in a silence zone (the Old Beacon Road, the Silent Furnace, and the Flame fight) spoken support skills that target allies are silenced. After ch642 the SIGNAL action offers Hold (the party braces), Spread Out (less area heat) and Take Position (agreed commands work again for 4 turns). Companions and guests are unaffected ("companion instincts").
- **The Flame fight** (page 653): Phase 1 Stolen Voices (Silent Command); Phase 2 Heat Without Warning (invisible heat each round; Levi alive halves it, Levi's Mark Safe Path turns the next one aside); Phase 3 The Rhythm Beneath (Sally's Feel the Rhythm: ATK and MAG +20% for 3 rounds and orders heard; without it the Flame is harder to hurt); Phase 4 The Beacon Core (the Flame takes 30% damage and feeds on the core until Jade breaks it; Devon can do it at half strength).
- New enemy: the Silent Wolf (the silent creatures of 641).

## What the pages settled or raised
- **The Silent Flame is the Ninth Shadow** (646), which fits the roadmap (9 / 15 on resolution).
- **649 was sent twice.** Built: the second version (correct hair flowers on Jade and Sally, the line "not a fire to consume", and Sally's "It won't be easy. But it might not be impossible either."). The first, with a different Jade in the "considers restoration" panels, was not used.
- **650:** the reply "No. Not in its current form. And not in its original form either." is unattributed on the page (the speaker is in dark green and black, so Levi or Devon); the game does not name a speaker.
- **635 was redrawn with the card "Fifteen Evils: 7 / 15".** The 608 and 610 pages, the Evil plan and the tracker say 8 resolved (7 remaining), and the Arc XXIII cover also says 7 / 15. Left as drawn on the page; the game's number is not changed. Please confirm which is meant.
- **633 was redrawn**: its caption no longer gives a length for Dragonvale pregnancies ("typically last longer than ordinary human pregnancies"), so the in-game text drops the "10 to 12 months" figure too.
- **639:** Sky is drawn with short wavy blue hair on this page only (long everywhere else).
- **649-653:** Sally wears an off-shoulder purple gown with a choker and Devon a dark hooded coat; the rest of the arc keeps their earlier looks. No new gear is added for them yet.
- **636:** the two teasing lines are read as Levi to Sally ("You lasted surprisingly long in court.") and Sally's reply ("Do not ruin my reputation.").
- The roadmap's XXV also covers Sally and Levi's marriage and the Silent Flame's resolution: those chapters are not here yet.

## End-of-arc splash (received)
The author sent the Arc XXV end splash: Levi and Sally in red wedding robes under a double-happiness window (Sally veiled and laughing, Levi in green ribbons), saved as `assets/arcs/arc25_end.webp`. It is **not registered yet**: `ARC_END_SPLASH` in scripts/arcs.js needs the chapter that ends the arc (the wedding chapter, not yet received), then an entry like the Arc XVII one (`{key:'25end', after:N, img:'assets/arcs/arc25_end.webp', title:..., text:...}`). The Arc XXV cover comes next and will be registered as Arc 25 with `after:635`.
