# ARC XIX — A SEASON TO BREATHE (chapters 462 onward; cover not yet received)

Built: 462 The Morning Before (three pages: Levi's residence, Jade's residence, the terrace and breakfast; Sky wonders why helping Jenika matters, Sera: "neither am I"), 463 The Wedding of Roc and Delilah, 464 Another Red Envelope.
**Roc and Delilah's wedding celebration (in game):** completing 463 starts a **three-day** celebration (they are not royals like Adrian and Evelyne, whose theme runs 14 days): the same firecracker / party popper / red packet / door gift drops, a banner on the Missions tab, and a splash (`assets/events/roc_wedding.webp`, the author's full-page couple illustration) with the caption. `ROC_WEDDING_DAYS` in arc9.js sets the length.
**Notes:** 462 hints at Sky and Jenika (a thread to follow); 464 has a few garbled printed lines (kept as drawn); 463's page text calls them "Roc and Delilah, not a prince and princess".
**Bug found and fixed:** chapters 447-461 were missing from the journal's chapter list (the loop bound had not moved past 446); fixed together with this batch (bound now 464).
When the Arc XIX cover arrives, add `{n:19, title:'A Season to Breathe', img:'assets/arcs/arc19.webp', after:461}` to ARCS (and 'XIX' to ARC_ROMAN).

## Author's relationship notes for Arc XIX (canon; development notes, not in-game text)
- **Ch462 page 3 (Sky and Sera):** both have unresolved love. **Sky** has confessed to Jenika; she has not accepted him as a couple, but they stay close as healers who spent time together in Dragonvale. He worries about Jenika's curse. **Sera** is the one with the issue: Hugh does not know her feelings, and Jade's matchmaking failed.
- **Sally and Levi:** no strings, but the relationship grows quickly; they already love each other and do not want to rush. They will eventually marry, when they realise they cannot do without each other.
- **Jade and Devon:** the actual couple, with no romantic chapters of their own so far; this arc is intended to give them the couple moments they need.
- Next: the Arc XIX cover and the following chapters (after the author's break).

## Chapters 465-480 (received and built; 475 and the Arc XIX cover not yet sent)
465 No Court Robes Tomorrow, 466 The Sea at Dragonvale, 467 The Healer Who Stayed Behind, 468 Half of Valen, 469 A Princess Going Home, 470 The Wife Who Brought Her Books, 471 The Wife Who Refuses to Rest, 472 Wifely Duties, 473 Apparently Still No Strings, 474 A Letter from Altan, 476 The Pattern Beneath the Curse, 477 Not Because You Love Me, 478 A Small Disturbance, 479 The Lanterns Beneath the Water (the Lanterns questline begins), 480 What the Sea Remembers. **Missing: 475.** New places: the Fishing Village (coastal, from 465) and the Valen Research Hall (from 476).
- 472 came with a large cream block below the artwork: cropped to the artwork (948x1507). The other pages had at most a few pixels of border.
- Threads: Sky and Jenika (467-468, 476-477: the curse is a spiritual separation pattern; Sky's Valen resonance, his mother being from Valen); Sera and Hugh (469, 474: she goes to Altan, he misses her, "a diplomatic matter"); Roc and Delilah (470-471: pregnant and studying); Jade and Devon (472: their couple chapter); Sally and Levi (473: still no strings).
- Mismatches (kept as drawn): 474's two teasing companions by Hugh are unlabelled (a topknotted man in green and a woman in pale green: probably Adrian and Evelyne); 479's "Questline Update" box is a dev note (its five steps are the chapter's spots); 472 has Devon addressed "my lord" in a joking role reversal; 476's page skips 475; 478 has Hugh's message ending the holiday; Sera is in Altan for 469-474, so she is not in the party's coastal chapters.

## Cover and chapter 475 (received and built)
The Arc XIX cover ("A Season to Breathe", `assets/arcs/arc19.webp`) plays after ch461, when Arc XVIII closes. 475 A Quiet Afternoon (the missing chapter between 474 and 476) is built: Sally, Levi, Sky, Jade and Devon each rest and prepare, and Roc urges Delilah to nap. Chapters 462-480 are now complete.
**Author's note:** 473 is canon as drawn (Sally and Levi, still no strings).
**Cleanup:** Sera had been wrongly listed as an investigation role on chapters where she is not present (413, 415 and 417-432, 72 spots); removed. She stays on 412 and 414 and in the Arc XVI chapters where she is drawn. Chapters where she appears: 462, 463, 464, 466, 469 and 474 (Altan, away from the coastal chapters).

## Chapters 482-490 (Arc XIX finale) and 492 (received and built)
482 The First Attempt, 483 Not Alone, 484 Two Heartbeats?, 485 Double Trouble (Delilah is carrying twins), 486 The Missing Variable ("complete union" is the uninterpreted phrase in the Valen records), 487 Closer Than Before, 488 A Princess Comes Back (Sera returns; Hugh "purely diplomatic"), 489 The Things We Return To (cropped: white margin on the right and bottom), 490 When the Road Calls Again (**finale of Arc XIX**). **Missing: 481 and 491.**
**Arc XX starts at 491** (the author): 492 I'm Coming With You (Aster joins the journey through Westreach, the Riverlands and the northern trade routes) is built and labelled Arc XX (title and cover to come). 491 and the Arc XX cover are not yet sent.
**Open question for the author (gameplay):** the 490 page says "Sera rejoins the party" and "Sally remains available as a recurring travelling ally". The game currently has the canon five as Jade, Devon, Levi, Sky and Sally from ch436 with Sera benched (and the fixed Levi–Sally +5% crit synergy). Not changed until the author confirms: should Sera take Sally's slot from 490 (Sally recurring)?
Mismatches (kept as drawn): 483 has the typo "choose not to to"; 488's Evelyne is named only in the text; 492's first speaker in green and gold is unlabelled (Aster in later panels) and Jade is drawn in pink.

## Chapter 493 (Arc XX) and party slots
493 Crown Prince, Temporary Party Member is built (Aster joins as a temporary guest unit; Jade is responsible for his field training). **Art error flagged by the author: Sally's hair is drawn purple on this page** (it is dark brown elsewhere); the page is left as drawn. Not built: Aster as a fighting guest (he only has the court-ally panel, no combat kit): awaiting the author's design.
**Party slots:** five active seats (`slotCap`) from ch102; Jade and Devon are fixed, the other three may be benched. Sera is optional (benched from ch436 but can take any free seat; tested). Companions and story guests fight in addition to the five.
