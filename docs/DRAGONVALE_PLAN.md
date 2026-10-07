# Dragonvale — future design notes (author's plan, NOT canon until chapters exist)

Spoilers. Nothing here is shown in the game yet. Dragon Vale and its sanctuary spots stay parked at ch99.

## Jenika Moon — Royal Healer NPC (not a party member)
- Role: healer / alchemist / sanctuary NPC. Not in combat. Avoids overlapping Sky.
- Facility: Healing Pavilion (Moonlight Pavilion / Royal Medical Hall — name adjustable) in the Dragonvale hub.
- Services: 1) Restore HP (full party)  2) Cure conditions (poison, burn, curse, fatigue, dark-magic corruption)  3) Craft tonics:
  Moon Healing Tonic (large HP), Purification Elixir (removes negative effects), Spirit Restoration Potion (MP), Dragon Blood Remedy (rare, Dragonvale creatures).
- Story: Sky x Jenika — shared healing knowledge, understanding of life and death, desire to protect. Sky learns "a healer also needs someone to heal them."
- Her possible death would be felt as "the person who kept the party alive is gone", because the player visits her repeatedly.
- Dragonvale hub: Palace, Training Grounds, Jenika's Healing Pavilion, Dragon Sanctuary, Royal Archive.

## Dragonvale party changes
- Chad leaves  -> Serena Vale, Royal Vanguard (frontline).
- Levi leaves temporarily -> Jade's new Handmaiden, Royal Ranger / Court Archer (ranged DPS, scout, support). She represents Jade's new status
  (honorary princess, Devon's future wife, political figure). Not an emotional replacement for Levi.
- Temporary party: Jade (hybrid), Devon (magic melee), Serena (physical), Sky (support), Sally (utility), Handmaiden (ranger).
- Levi returns: "I see you found someone to replace me." / "No one replaced you." Choice: keep Handmaiden, swap her for Levi, or expand the max party size later.
- Partner arc: Chad = first major partner; Devon = destined partner; Levi = returns transformed.

## Engine notes (what is needed to build this)
- HP/MP do NOT persist between battles right now (every fight starts at full), so "Restore HP / Cure" and tonics need persistent HP and consumable use first.
- Party cap is 4 active slots (ACTIVE_SLOTS in core.js); a 6-hero Dragonvale roster fits the existing bench/active system.
- Placeholders in the repo: "Foreign Princess" (characters.js) is probably the princess Chad gets engaged to.

## Ripley — Jade's Handmaiden (answered)
- Ripley is the future handmaiden at Dragonvale, assigned to Jade by Chad, but her loyalty is with Devon.
- She fills the ranger slot when Levi is poisoned (by Chad, out of jealousy) and Sky confirms he is dead and he is buried.

## Levi's death and return (answered)
- Sky confirms Levi dead and he is buried. Sky is young, so the call is wrong.
- Levi is actually alive: during his last mission he was bitten by a strange creature and developed a poison resistance.
- Someone passing his grave later saves and nurses him. (Who is not decided.)
- Before he "succumbs", he and Jade realise they don't love each other. Jade is destined for Devon.
- Note: ch32 already gives Levi a fake death (Ryn, Greyson's cover). This is a second "dead but alive" beat, so make the two feel different.

## Open questions
- Who finds and nurses Levi at his grave?
- What chapter does Levi die/leave, and what chapter does he return?

## What the comic now shows (ch42-51, canon)
- Ch42: Jade partially awakens; Sky is cursed (critical) -> in the party but disabled. Ch43: 49-day deadline; only the Pearl of Dragonvale can cure him.
- Ch44: Greyson gives the bracelet + sealed box; Delilah is the Dragonvale Royal Consort. Ch46: Ripley assigned to Jade; Jenika Moon and the Royal Healing Pavilion appear (Jenika is the princes' cousin).
- Ch47: Devon is Chad's twin. Ch48: Dima says Jade's destiny is with the owner of the Black Pearl (Devon); Sky is Jade's cousin; Delilah is pregnant.
- Ch50: Jade becomes Princess of Tribute and may choose an unmarried prince; Levi (pale, weak) leaves the party. Ch51: Sally ennobled (new skill Noble Grace); Jade proposes a one-year marriage in name to Devon.
- Still open: Ripley's joining chapter, the wedding chapter, Devon's recruitment, when Sky recovers, when Chad leaves (planned: when the new princess arrives).
