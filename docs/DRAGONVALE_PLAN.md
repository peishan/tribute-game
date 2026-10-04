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

## Open questions
- Is "Ripley" the Handmaiden, or a separate stand-in for Levi? (the notes name both)
