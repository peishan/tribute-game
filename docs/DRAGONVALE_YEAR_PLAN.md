# Dragonvale year plan (dev notes — NOT shown in game)

Premise: Jade and Devon spend about a year in Dragonvale. Publicly they are Princess Jade and Prince Devon; secretly they protect ordinary people in disguise (working aliases: Crimson Phoenix / Silent Dragon, tone TBD). Devon chooses this because he grew up away from court and understands ordinary people.

## Greyson missions (3-4 over the year, not constant summons)
1. After Marriage — "The Dragonvale Investigation" (bracelet call; the running joke that he may be psychic). Built: m_empress (53), m_erased (62).
2. Demon / spirit disturbances — border creatures, villages losing contact, ruins waking. Devon: royal magic / lore. Jade: combat / leadership.
3. Black Pearl / Dima lore — temples, forgotten shrines, Black Pearl records. Reveal Dima, Xima, Gold Child gradually.
4. Before returning to Tribute — "one matter only you can resolve" (Roc's exile, demons, succession).

## Masked contracts (vigilante side quests) — board "Masked Contracts" in Dragonvale from ch62
- The Corrupt Magistrate (built: q_vig_magistrate). Devon: "Justice without proof becomes revenge."
- The Missing Children (built: q_vig_children). A noble trafficking people, not demons; personal for Jade.
- The Healing Pavilion Crisis (todo): unknown village illness, Jenika joins, Sky helps.
- The Old Warrior (todo): recognises Devon's sword style — "You fight like the late empress's guard." Hint of Devon's past.
Couple development is through teamwork, not romance scenes ("You always plan everything." / "Because you always rush into danger.").

## Year shape
- Months 1-3: marriage adjustment, Levi investigation, royal politics, Roc's problems
- Months 4-6: vigilante quests, demon disturbances, Jenika/Sky, Altan arrival
- Months 7-9: Roc's marriage and decline, dark magic investigation
- Months 10-12: Roc's exile, Devon succession talk, final Dragonvale mission, return to Tribute

Jade returns as Princess of Tribute and of Dragonvale, wife of a respected prince, and a hero among civilians.

## Roc (Chad) arc and Seraphina (author's structure)
- Ch 62-70: Roc gains dark-magic powers. Built: `chad_dark_arts` at ch63 (Dark Flame, Shadow Surge), `chad_dark_deep` at ch67 (Void Brand). Placement within 63-69 is provisional.
- Ch 70-72: dark-magic backlash permanently alters his stats (flags chad_backlash_1/2/3 at 70/71/72; multipliers in `BACKLASH`, core.js): HP and DEF down, MAG up, then SPD down, then ATK up. Numbers are drafts.
- Ch 73: Roc leaves the party permanently (CH_LEAVE). Seraphina Altan joins the same chapter as the primary physical DPS (replaces the Foreign Princess placeholder). Her kit (Altan Blademaster, sabre) is a DRAFT until the comic shows her; INTRO_CH 66 is a guess for her arrival.
- Ch 62: Roc's exhaustion is the after-effect of Dima removing his bond with Jade (ch59). It is not poison and not backlash; backlash only starts at ch70.
