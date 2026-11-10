/* CRIMSON HORIZON (the sequel): chapter list shared with the Crimson Tide repo (same numbers, same pages in assets/horizon/cNNN.webp). Titles and one-line summaries from that repo's outline. */
const HZ_ARCS = [{"n": 1, "t": "A New Voyage", "from": 0, "to": 10}, {"n": 2, "t": "Storm Shelf", "from": 11, "to": 18}, {"n": 3, "t": "Beneath the Storm Shelf", "from": 19, "to": 32}, {"n": 4, "t": "The Mist Straits", "from": 33, "to": 41}];
const HZ_CHAPTERS = [
{
"n": 0,
"arc": 1,
"t": "A New Voyage",
"s": "San and Jade set sail aboard the Crimson Tide with the unified crew."
},
{
"n": 1,
"arc": 1,
"t": "The First Storm",
"s": "A violent storm tests the newly unified crew. They adapt their battle positions so Jade and Sally can fight from protected range."
},
{
"n": 2,
"arc": 1,
"t": "The Storm's True Form",
"s": "San, Jade, and Sally help defeat the Stormborn Leviathan. After the storm clears, a strange violet residue remains."
},
{
"n": 3,
"arc": 1,
"t": "What the Storm Left Behind",
"s": "During repairs, Jade spots the residue pulsing on the hull. The crew of a damaged fishing boat recognizes the glow from their harbor mouth and asks for help getting home."
},
{
"n": 4,
"arc": 1,
"t": "The Harbor Beyond the Charts",
"s": "The fishers guide the Crimson Tide through the reef just before a surge. The harbor pilot explains that the channel lights go dark before each surge, and two boats are still out."
},
{
"n": 5,
"arc": 1,
"t": "Between Watches",
"s": "While Aisyah rearranges the watches, a crowded breakfast aboard gives Vaeren, Joelle, and Soel a comic moment. The harbor lights go dark a full watch early."
},
{
"n": 6,
"arc": 1,
"t": "Under the Channel",
"s": "Levi scouts the reef at low tide while Jade directs and Sally covers him from a protected position. He finds an old gate jammed halfway open, sending out a surge each time it shifts."
},
{
"n": 7,
"arc": 1,
"t": "The Narrow Window",
"s": "In Fair Tide, Renn, Erynn, and Mimi link the harbor's pulses to the leviathan encounter while Adrian and Fen search for records of the gate. Devon and the harbor pilot work out when the stranded boats can cross."
},
{
"n": 8,
"arc": 1,
"t": "Hold the Passage",
"s": "San steadies the current, Jade coordinates the crossing, and Sally gets a towline to the stranded boats. The first makes it through, but the second loses steerage as the gate starts to close."
},
{
"n": 9,
"arc": 1,
"t": "One Crew at the Helm",
"s": "Joel brings the Crimson Tide into the channel to tow the last boat clear while Sky tends to the rescued fishers. The reef team secures the gate open, stopping the surges."
},
{
"n": 10,
"arc": 1,
"t": "The Next Bearing",
"s": "The harbor pilots share an old chart showing other gates. San and Jade choose which route to follow next, giving the game its next expedition. Ends with the crew choosing the North Gate (direct route toward the leviathan activity), keeping the East Gate as fallback."
},
{
"n": 11,
"arc": 2,
"t": "The Favorable Tide",
"s": "Aisyah finishes loading supplies while Devon marks the East Gate fallback on the chart. The Crimson Tide departs for the North Gate on the promised tide."
},
{
"n": 12,
"arc": 2,
"t": "Across the Storm Shelf",
"s": "Mezstorm spots two storm fronts moving against the wind along the same line. Joel steers through the gap between them, and Levi sights an old tower on the far side."
},
{
"n": 13,
"arc": 2,
"t": "The Watchtower Below",
"s": "Levi and Sairen explore the abandoned tower while Jade directs the survey from the ship. They find a chamber that records sea activity, with a fresh mark matching the pulse from the leviathan encounter."
},
{
"n": 14,
"arc": 2,
"t": "The Second Signal",
"s": "Fair Tide compares the tower record with the harbor readings. Erynn and Mimi identify a second signal that reached the tower before the leviathan surfaced, and Adrian and Fen find a matching offshore site on an old chart."
},
{
"n": 15,
"arc": 2,
"t": "The Shelf Wakes",
"s": "The tower rings as the signal returns. The storm fronts close across the northern passage, and Sally spots an eastern route marker flashing between the waves."
},
{
"n": 16,
"arc": 2,
"t": "East by Lantern",
"s": "Devon plots the fallback while Sally calls out the markers from cover. Joel takes the ship through the East Gate as Mezstorm holds the wind steady long enough for them to clear it."
},
{
"n": 17,
"arc": 2,
"t": "What the Tower Heard",
"s": "At a sheltered anchorage, San and Jade compare the record with the old chart. The tower was tracking a signal from beneath the Storm Shelf, and the latest reading gives them a bearing."
},
{
"n": 18,
"arc": 2,
"t": "The Sounding Line",
"s": "The crew marks a safe approach from the East Gate and prepares to lower a sounding line at the source. The line goes slack far too soon, setting up the game's first descent beneath the shelf."
},
{
"n": 19,
"arc": 3,
"t": "Where the Line Went Slack",
"s": "Joel hauls up the sounding line and finds its weight scraped flat on one side. Levi sends a lantern down and catches a glimpse of a stone ledge beneath the shelf. [BUILT]"
},
{
"n": 20,
"arc": 3,
"t": "The Dive Watch",
"s": "Aisyah sets the watch rotation and Sky readies the infirmary. Levi and Sairen take the first dive while Jade tracks their progress from the ship. [BUILT]"
},
{
"n": 21,
"arc": 3,
"t": "The Door Underwater",
"s": "Levi and Sairen follow the ledge into an air-filled chamber. The tower's symbol is carved over a door, and the floor trembles in time with the signal."
},
{
"n": 22,
"arc": 3,
"t": "Tea at Fair Tide",
"s": "Sera drops in on Fen with tea and finds the research table covered in charts. Fen notices that the mark the crew sent back appears on the old chart at both the Storm Shelf and the West Gate."
},
{
"n": 23,
"arc": 3,
"t": "A Warning for Ships",
"s": "Erynn translates the chamber inscription. The station once warned ships away from dangerous currents, but someone has recently altered it to send a much stronger pulse."
},
{
"n": 24,
"arc": 3,
"t": "Three Bells",
"s": "A pulse rattles the ship, and Vaeren and Joelle join in as Soel wakes the off-watch crew. Joel establishes a three-bell recall so the dive team can hear the warning through the stone."
},
{
"n": 25,
"arc": 3,
"t": "The Night Log",
"s": "Sally compares the tower's timestamps with Joel's battle log. The altered pulse reached the leviathan's waters just before it surfaced, and the station is building toward another transmission."
},
{
"n": 26,
"arc": 3,
"t": "The Channel That Takes It",
"s": "Devon and Renn trace the next pulse's path along the outer current. It will reach the East Gate, where ships are already using the same fallback route the crew took."
},
{
"n": 27,
"arc": 3,
"t": "Clear the East Gate",
"s": "Sally signals passing ships away while Joel holds the Crimson Tide at the mouth of the channel. Below, Levi and Sairen hear the recall bells just as they find the station's service passage."
},
{
"n": 28,
"arc": 3,
"t": "The Fresh Cut",
"s": "Sairen finds a newly fitted coupling that turns the warning signal into a repeating pulse. Jade spots a maintenance bypass on the chamber sketch and guides the divers to it from aboard ship."
},
{
"n": 29,
"arc": 3,
"t": "Between Two Pulses",
"s": "San and Mezstorm steady the water at the dive entrance while Levi and Sairen switch the station to its bypass and remove the coupling. The next warning comes through as a single, quiet bell."
},
{
"n": 30,
"arc": 3,
"t": "Back on Deck",
"s": "Sky checks the divers as the East Gate reopens to traffic. Aisyah finally gets everyone around the same table, and the twins insist Soel deserves a place on the watch roster."
},
{
"n": 31,
"arc": 3,
"t": "The Mark Beneath the Salt",
"s": "Adrian and Fen compare the recovered coupling with the charts. Beneath the salt is a West Gate service mark and a fresh inventory number, giving the crew a way to trace who handled it."
},
{
"n": 32,
"arc": 3,
"t": "Into the Mist Straits",
"s": "San and Jade chart a course for the West Gate to trace the coupling. Ends at the edge of the mist, where the first route lantern is lit and the second is missing."
},
{
"n": 33,
"arc": 4,
"t": "The Missing Lantern",
"s": "Sally spots a light flashing where the second route marker should be. Joel stops the Crimson Tide when Levi sees that the light is moving against the current."
},
{
"n": 34,
"arc": 4,
"t": "The Pilot's Bell",
"s": "A local pilot guides the ship into a sheltered quay by ringing a bell from shore. She tells San that the second lantern vanished three nights ago and two ships have gone aground since."
},
{
"n": 35,
"arc": 4,
"t": "The West Gate Yard",
"s": "Jade and Aisyah visit the maintenance yard to ask about SV-7729. The foreman recognizes it as part of a shipment that was signed out for routine beacon repairs."
},
{
"n": 36,
"arc": 4,
"t": "Signed and Transferred",
"s": "From Fair Tide, Adrian and Fen send a copy of the transfer record. Sally compares it with the yard's dispatch book and finds three more couplings collected under the same work order."
},
{
"n": 37,
"arc": 4,
"t": "A Place at the Table",
"s": "Sky treats a sailor from one of the wrecks over supper aboard the Crimson Tide. When the twins ask how he knew where to sail, he taps out the rhythm of the light he followed."
},
{
"n": 38,
"arc": 4,
"t": "The Wrong Rhythm",
"s": "Renn checks the sailor's account against the old pilot codes from Fair Tide. The moving light copied the official signal closely enough to fool anyone approaching in fog."
},
{
"n": 39,
"arc": 4,
"t": "Low Water",
"s": "Levi and Sairen follow fresh bootprints across a shoal exposed at low tide. They find the missing lantern mounted on a small skiff, with a West Gate coupling fitted beneath it."
},
{
"n": 40,
"arc": 4,
"t": "Lights for Sale",
"s": "Sally watches the skiff's crew sell cargo stripped from the grounded ships. One of them leaves to set the lantern again just as the evening convoy approaches."
},
{
"n": 41,
"arc": 4,
"t": "The Evening Convoy",
"s": "The pilot says the convoy is already beyond sight of shore. San sends Joel and Mezstorm to intercept it while Jade coordinates a shore team to restore the real marker."
}
];
