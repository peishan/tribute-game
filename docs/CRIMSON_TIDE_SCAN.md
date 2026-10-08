# Crimson Tide scan: what can carry over to Tribute

Source: peishan/daybreak-crimson-tide (read only; nothing copied). Scan 1: Bonds / Relationships.
Files read: scripts/arc9-and-systems.js (bond tracks), scripts/arc16-and-bonding.js (disagreement and repair), scripts/hang-out-*.js (activities and Shared Moments), scripts/settlement-memories.js, scripts/character-bios.js.

## How Crimson Tide does bonds
- A bond is a TRACK, not a per-character number: san_joel (a pair), san_crew (a headcount: any 3+ crew fielded), san_trio (three named members), and one per companion (Aisyah, Mez, Eliz, Senedra, Joy). Each track has its own ladder of 5 named tiers (e.g. "Strangers Still" -> "Getting to Know Them" -> "Trusted Hands" -> "Found Family" -> "This Is Home") and thresholds 0/50/150/300/600.
- One action per bond per day, 15 points each. Progress always accrues; the BONUS is a synergy that only applies while the bonded members are actually in the fielded party. Bonuses are small (2-8%) and flow through one aggregator (getReputationBonus) so no new combat hooks are needed. Individual companion tracks carry NO combat bonus on purpose: story-driven, not stat grinding.
- Hang Out: a menu of flavoured activities (Coffee, Walk the Harbour, Night Market, Stay In...) that all feed the same daily cap and the same points, plus a Shared Moments log (a memory collection, not a second score) that records which activities actually happened.
- Disagreement and Repair (San and Joel): a state machine Connected -> Tension -> Understanding -> Repaired. Disagreement NEVER subtracts points: bonding measures how well people understand each other, not how often they agree. The player picks a response (push, listen, walk away), can ask each crew member for their perspective, builds "understanding points", then takes repair steps; a repaired disagreement leaves a permanent "Learned" flag that later dialogue can check. Perspectives per character are stored as data so extending to other pairs is data entry.
- Settlement Memories: story events permanently add small descriptive details to the home port, each tied to real game state, revealed once, and logged in a Chronicle.
- Character bios: image sheets unlocked when ALL depicted characters have joined (generic, not hard-coded arc numbers).

## Tribute today (for comparison)
Companion bonds: bond points with Jade only, 6 levels, bond skills in BONDTREE, daily "spend time" actions in some places. New Bonds tab: allies and family with standing 0-200, six tiers, four gestures a day, favours that are global (fares, gold/XP/renown), no negative moves except CH_REL.

## What I would bring over (ranked)
1. Pair and group bond tracks with fielded-synergy (HIGH value, low risk). Add tracks that are about the group, not only Jade: Jade and Devon, Levi and Rin (the two rangers), Sky and the Ghost Healer, and a group "Travelling Circle" track by headcount. Bonus only while fielded. This fits the benching rule (Jade and Devon always fielded, the other three optional): benching someone has a real cost, and it gives Seraphina, who is "silent until Altan", a quiet role.
2. A "Found Family" ladder for Seraphina (HIGH, matches your note): a Sera and The Circle track with tiers like Strangers Still -> ... -> This Is Home, filled by hang-outs and shared moments. Her Altan return then has emotional weight because the game measured her belonging.
3. Hang Out menu plus Shared Moments log (HIGH): per ally/companion flavoured activities feeding the same daily cap; a memory log that accumulates. Our Bonds tab already has four generic gestures; replace/extend with place-aware activities (Gold Manor, Devon's Palace, field camps). The log is a natural place for shared memories without writing 100 scenes.
4. Disagreement and Repair (HIGH for Arc VI): it is almost exactly the Arc VI mechanic. Before Jade decides how to resolve an Evil, the player can ask each companion for their perspective (Devon: understand first; Levi: people are being hurt; Sky: it may be a victim; Rin: spirits; Sera: how other kingdoms see it), build understanding, and the choice feeds the resolution. No numeric penalty for disagreement; a "Learned" flag after a repaired disagreement. This also fits Devon and Jade, Devon and the Dragonvale return choice, and Greyson/Chadstone strain.
5. "Disagreement never subtracts" principle for allies (MEDIUM): replace negative CH_REL moves with a Strain state (Connected/Strained/Repaired) so strain is a story state, not a lost number.
6. Settlement Memories for our homes (MEDIUM): Gold Manor and Devon's Palace gain permanent small details as story and bonds progress (reuse the bases). Logged in a Chronicle.
7. Generic unlock rule for character sheets: unlock a combined sheet when all depicted characters have joined (LOW; our Cast gate is by chapter).

## Cautions seen in their code
- Bonuses are deliberately small and mostly conditional. Our new ally favours stack globally; keep them small and consider making some synergy-conditional.
- They hit bugs from wrapping window functions across files (a render wrapper that never ran). We use plain functions in one module, so we avoid it, but any extension should extend data tables, not wrap.

## Other Crimson Tide systems seen, not yet scanned (candidate next scans)
fair-tide-chronicle, settlement-memories, fair-tide-crew-conversations, fair-tide-mood, fair-tide-hobbies, fair-tide-port-visitors, character-birthdays and real-calendar-events (festivals, birthdays), local-port-standing (standing per place, maybe like our towns), rival-disposition, rumor-market-effects (Sally's rumours), ship-personality, tide-network (Imperial Network), raid-mode (we have Guardian Raid), pirate-cove, interworld-expeditions, world-catalogue, achievements, bestiary, crafting, quest-tracker-widget (we have a quest log).

## Built from scan 1 (items 1-4, one pass)
- Companion tracks (relations.js, BOND_TRACKS): Jade & Devon (crit while both fielded), Sky & the Ghost Healer (XP while Sky is fielded), Levi & Rin (crit while Levi is fielded and Rin travels with the party: flag rin_travelling, not set yet since her joining is undecided), The Travelling Circle (XP and gold while 4+ of the five are fielded; opens at the fixed party), Seraphina & the Circle (story-driven, no bonus on purpose, tiers Strangers Still -> This Is Home). Five tiers each (0/50/150/300/600), +15 per Hang Out, once per day per track. Progress always accrues; only the bonus needs the members fielded. Bonuses small (2-8%).
- Hang Out (Bonds tab): 3-5 flavoured activities per track, some only at a home (Devon's Palace or Gold Manor); a Shared Moments log counts what you have done together.
- Ask the party (evils.js, Fifteen Evils tab): before Jade resolves an Evil, ask each companion's view (Sky, Levi, Devon, Seraphina, Rin). Hearing a view adds a little bond; with enough views the Evil is flagged learned_<id> so the resolving chapter can check it. Nobody loses anything for disagreeing. Only the Mourning Hart has views written (from ch154); add an entry to EVIL_COUNSEL per Evil.
- Not built: strain as a state for allies (item 5), settlement memories (item 6), shared-sheet unlock rule (item 7).
