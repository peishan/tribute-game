# Story scan for bonds, strain and belonging (chapters 0-155)

Method: searched every chapter's summary and events for disagreement words, Devon-return words, and each ally's appearances.

## Finding 1: there is no canon disagreement with a current ally yet
Every conflict in chapters 44-155 is with someone who is not an ally (Roc and Delilah, the magistrate, Varyn, the Evils' villagers). Chapter 82 (Devon recommends his brother Aster for the crown) and ch87 (Seraphina asks to travel) are agreements, not rifts. So no strain issue is active: strain waits for a story moment from the author.
Candidate strain moments (author's call; none is canon):
1. (DROPPED by the author: the Devon-return idea was a suggestion that would clash with his already-made choice to follow Jade.) Devon is BOTH the prince and Jade's companion: they simply have to allocate his time, and travelling makes him a better prince. Not a strain. If wanted later, model it as allocation (Dragonvale matters he must attend to between journeys), never as a choice between them.
2. Greyson and the Hollow King (Arc VI roadmap ch161 Judgment): the crown wants an Evil that killed innocents destroyed; Jade contains him. Strain with Greyson that is repaired by ch166 when he accepts "Resolve, not destroy".
3. Adrian and the Fifteen Register (ch163): the register's origin is unknown, which embarrasses the keeper. A gentler strain with Adrian (and Orin).
4. Seraphina and Greyson (author's note: future love interest) and the Altan return: a quiet strain about belonging and duty, much later.

## Finding 2: story beats that deepen bonds (now applied, first-pass, never negative)
CH_REL in relations.js:
- King Chadstone (starts 50 at ch50): ch50 +5 (presents the sealed box respectfully), ch52 +5 (Jade declares her choice), ch57 +10 (blesses the union), ch81 +5 (praises her duty), ch82 +5 (Devon's choice for the crown), ch86 +15 ("you leave as someone Dragonvale will never forget").
- King Greyson (starts 100): ch99 +20 (sworn sister, Princess of Tribute), ch101 +5, ch121 +5, ch147 +5.
- Adrian Gold (starts 60 at ch90): ch96 +8 (the brother who remembers), ch98 +5 (the missing ledgers), ch147 +5.
CH_TRACK: Jade & Devon: ch57 +30 (wedding), 82 +15, 103 +30 (The Choice He Made), 138 +10, 151 +10. Seraphina & the Circle: ch87 +20 (asks to travel, divorce scroll), 89 +10, 104 +15 (west), 147 +15, 149 +10. Sky & the Ghost Healer: ch88 +20. The Travelling Circle: ch102 +30 (the party is fixed).
Saves that already passed those chapters get them once, quietly (relCatchUp).

## Seraphina's belonging beats, from the chapters she is actually in
Appears in: 66-73 (as Roc's wife, in Dragonvale), 87 (joins with the Divorce Scroll), 88-89 (the road and return to Tribute), 98, 104 (leaves for the west), 147-149 (the Fifteen). She is a silent member through Arc V (per the author). Her track measures belonging; her Altan return should be much later.

## Still needed from the author
- Which of the four candidate strains is real, and the text of the disagreement (title, what each side wants, the repair steps), and who should weigh in.
- Who else should become an ally with a standing (Unique Gold, Elara Valor, the Dragonvale court, Altan) and start values.
- Whether the numbers above feel right.

## Standing and judgments (built from the author's design notes)
Not one universal score: each person or faction is judged on what matters to them (standing.js, Bonds tab > Standing and judgments). Axis kinds: trust, respect, confidence, reputation, each with six words. Standing is separate from the warmth of a bond (Greyson as a brother, Adrian as family).
Subjects: Rin (trust in the royal party, starts Wary), Sky (trust in how Jade treats the ambiguous), Levi (respect for her field judgment), Devon (confidence in her risks, never his affection), Seraphina (voice: how far her counsel is taken), Varyn (respect: a Gold heir who questions the lies?, starts Doubtful), Adrian (professional respect as a future Imperial Advisor), Greyson (royal confidence in her judgment), and factions: frontier villages (confidence), spiritual communities (reputation), the Crown's officers (faith in her firmness).
A chapter's beat can move several at once, conditionally (it reads what you actually did: listened and investigated first, asked the party), later (lands when the evidence is in), or temporarily (fades after a few chapters). Each shows as a Judgment (chapter complete message, Chronicle, Recent judgments).
Built now (chapters that exist): Varyn grows by questioning history (ch136, 140, 144, 145); Devon -1 for a few chapters after the seal standoff (ch138, he stays beside her); Greyson/Adrian/Seraphina/Officers at ch147; Rin +2 if you heard her out (inv_rin_lore) or -1 if not (ch150); the Widow (ch152): frontier +2 if you confirmed what it was before destroying it (+1 otherwise), Rin -1 for three chapters; the Hart (ch154): Sky +1, Rin +1. Asking someone's view in "Ask the party" raises their standing by 1 (they feel heard).
Placed from the Arc VI roadmap, fire when those chapters complete: ch156 A Different Victory (Rin +2, Sky +1, spiritual +2, frontier -1 for a while, Greyson +1 once evidence confirms it at ch162, Seraphina +1 if she was asked); ch157 frontier +2; ch161 Judgment (Varyn +2, Sky +1, officers -1 for a while, Levi -1 and Devon -1 briefly: field practicality and present victims); ch162 (Levi +2: caution proved, Devon +1); ch163 (Adrian -1 briefly); ch164 (Adrian +2); ch166 (Varyn +3, Greyson +3, Adrian +1, officers +2: mandate changes from destroy to resolve).
Not built: Rin's drop if "Devon asserts rank" at the first meeting (there is no mechanic for it yet; it would need a first-meeting decision); a player decision prompt at chapter ends (judgments currently read what you did, they do not ask).


Author decisions: key decisions (the Hart's fate etc.) stay story-determined, not player choices. Devon is the prince and the companion at once (see above).
