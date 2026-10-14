/* =====================================================================
   ARC XI: THE VANISHING OF LADY VEYNE (chapters 263-286; docs/ARC_XI_PLAN.md). This file holds chapters 263-270 so far.
   - Places: the Dragonvale Noble Court (opens after ch265) and the Dragonvale Academy (opens after ch267), both in Dragonvale, reached from Dragonvale; Altan and Dragonvale route.
   - Companion states: Rin is temporarily unavailable from ch264 (flag rin_returned ends it). Sera stays in Altan (altan.js). Eira stays in the party.
   - The Mirelle case board (Network > Case, from ch266): Witnesses, Documents, Locations, Contradictions, Conclusions. Read-only: built from the investigation spots already done.
   - Delilah's Administrative Studies (Case tab): Student from ch268; Reconciliation Stage I from ch269.
   First-pass wording; the story conclusions are fixed.
   ===================================================================== */
REGIONS.dragon_court = REGIONS.dragon;
Object.assign(LOCATIONS, {
  dragon_court:{ n:'Dragonvale Noble Court', region:'dragon', kind:'town', icon:'🏛️', unlock:{ch:265},
    desc:'Where the noble houses of Dragonvale meet. The Mirelle investigation is run from here.',
    spots:[
      {id:'court_lounge', kind:'tavern', n:'Court Lounge', icon:'🍵', desc:'Rest, share a meal and listen to the party.'},
      {id:'legal_records', kind:'place', n:'Legal Records Office', icon:'🗄️', desc:'Petitions, wills and the records of the noble houses.', note:'Petitions and the records of the noble houses are kept here; more cases appear as the Mirelle investigation advances.'},
    ]},
  dragon_academy:{ n:'Dragonvale Academy', region:'dragon', kind:'town', icon:'🏫', unlock:{ch:267},
    desc:'The academy and its archives: law, administration and the records of the realm. Delilah studies here.',
    spots:[
      {id:'academy_cafe', kind:'tavern', n:'Academy Refectory', icon:'🍲', desc:'Rest and share a meal with the party.'},
    ]},
});
Object.keys(LOCATIONS).filter(k => ['dragon_court','dragon_academy'].includes(k) && !LOC_ORDER.includes(k)).forEach(k => LOC_ORDER.push(k));
ROUTES.push(
  {a:'dragon_vale', b:'dragon_court', mode:'carriage', n:'Noble Court Road', days:1, fare:0, risk:.1, pool:['road_bandit']},
  {a:'dragon_vale', b:'dragon_academy', mode:'carriage', n:'Academy Road', days:1, fare:0, risk:.1, pool:['road_bandit']},
  {a:'dragon_court', b:'dragon_academy', mode:'carriage', n:'Between Court and Academy', days:1, fare:0, risk:.1, pool:['road_bandit']},
  {a:'capital', b:'altan_capital', mode:'ship', n:'The Altan Passage', days:5, fare:100, risk:.35, pool:['sea_raider','storm_wisp']},
  {a:'altan_capital', b:'dragon_vale', mode:'ship', n:'Altan to Dragonvale', days:6, fare:110, risk:.4, pool:['sea_raider','storm_wisp']},
);
LOCATIONS.altan_capital.spots.push(
  {id:'stay_in_altan', kind:'investigate', n:'Sera Stays in Altan', icon:'🏠', ch:263, need:2, ambush:[], lo:82,
   desc:'A while longer.',
   clues:['Sera: "I think I should remain in Altan a while longer. I missed home more than I realised... and there is still much to do here." Jade: "That makes sense. Altan needs you, and perhaps you need Altan too."'], rw:{xp:170000, gold:36000}},
  {id:'rheon_goes_instead', kind:'investigate', n:'Then I Will Go in Your Place', icon:'👑', ch:263, need:2, ambush:[], lo:82, needFlag:'inv_stay_in_altan', lockMsg:'🔒 Finish the previous clue first',
   desc:'Crown Prince, yes. King, no.',
   clues:['Rheon: "Then I will go in your place." Sera: "You will what? Rheon, you are the Crown Prince!" Rheon: "Crown Prince, yes. King, no. I am still allowed to move."', 'Devon: "This is not a small matter." Rheon: "Which is exactly why Altan should be represented. I\'ll travel as its envoy."'], rw:{xp:170300, gold:36060}},
  {id:'envoy_permission', kind:'investigate', n:'Permission to Travel', icon:'📜', ch:263, need:2, ambush:[], lo:82, needFlag:'inv_rheon_goes_instead', lockMsg:'🔒 Finish the previous clue first',
   desc:'Succession unresolved.',
   clues:['After some debate, Rheon is granted permission to travel as Altan\'s representative. His succession duties remain unresolved, but for now, the road is open.', 'Sera: "Fine... but do not vanish without sending word." Rheon: "No promises about being boring. But I will write."'], rw:{xp:170600, gold:36120}},
  {id:'companion_update', kind:'investigate', n:'Companion Update', icon:'👥', ch:263, need:2, ambush:[], lo:82, needFlag:'inv_envoy_permission', lockMsg:'🔒 Finish the previous clue first',
   desc:'Rheon in, Sera to Reserve.',
   clues:['COMPANION UPDATE: Rheon recruited. Sera moved to Reserve. Companion Assignment System Unlocked. Regional Hub Companion Stay enabled. Prepare for Dragonvale.', 'Sera: "Travel safely. I\'ll be watching over Altan... and cheering for you from here." Rheon: "Until then, little sister." Devon: "Next stop... Dragonvale."'], rw:{xp:170900, gold:36180}},
  {id:'first_journey', kind:'investigate', n:'A Different Kind of Journey', icon:'🐎', ch:264, need:2, ambush:[], lo:82,
   desc:'Far fewer formalities.',
   clues:['Rheon: "So this is travelling with you? Far fewer formalities than I expected... and rather more exciting." Jade: "That\'s our usual pace. The road is never as calm as the palace, Prince."', 'Levi: "Stay close. Trouble often arrives before we do." Sky: "That\'s what makes it interesting."'], rw:{xp:171200, gold:36240}},
  {id:'trouble_on_road', kind:'investigate', n:'Trouble on the Road', icon:'⚔️', ch:264, need:2, ambush:[], lo:82, needFlag:'inv_first_journey', lockMsg:'🔒 Finish the previous clue first',
   desc:'Cover the flank.',
   clues:['Not long into the journey, the party encounters unexpected trouble on the road. Rheon: "Bandits? So soon?! Understood! I\'ll cover the flank!"', 'Jade: "Positions! Keep the civilians behind us!" Sky: "I\'ll take care of the wounded. Rheon, you\'re doing well."'], rw:{xp:171500, gold:36300}},
  {id:'first_assignment', kind:'investigate', n:'His First Assignment', icon:'📋', ch:264, need:2, ambush:[], lo:82, needFlag:'inv_trouble_on_road', lockMsg:'🔒 Finish the previous clue first',
   desc:'Coordinate supplies.',
   clues:['Jade: "For your first assignment, help coordinate supplies at the next waypoint. It may seem simple, but it\'s an important part of the journey."', 'Rheon: "I understand. I\'ll do my best. I want to learn how to be truly useful to the party."'], rw:{xp:171800, gold:36360}},
  {id:'rin_eira_leave', kind:'investigate', n:'Rin and Eira Step Away', icon:'🧭', ch:264, need:2, ambush:[], lo:82, needFlag:'inv_first_assignment', lockMsg:'🔒 Finish the previous clue first',
   desc:'Only temporary.',
   clues:['Rin receives word of unusual movements along the frontier. As a ranger she chooses to investigate separately: "It\'s only temporary. I\'ll report back once I have news."', 'Eira also requests temporary leave for her own affairs: "This isn\'t a goodbye. I\'ll rejoin you once they\'re resolved."'], rw:{xp:172100, gold:36420}}
);
LOCATIONS.dragon_vale.spots.push(
  {id:'sealed_message', kind:'investigate', n:'A Sealed Message', icon:'✉️', ch:265, need:2, ambush:[], lo:82,
   desc:'A gathering of the noble houses.',
   clues:['As the party travels, a courier catches up with them carrying a sealed message from Dragonvale. Devon: "A gathering of the noble houses... And Mirelle Veyne is listed among those expected."'], rw:{xp:172400, gold:36480}},
  {id:'mirelle_unseen', kind:'investigate', n:'Someone You Trust', icon:'👤', ch:265, need:2, ambush:[], lo:82, needFlag:'inv_sealed_message', lockMsg:'🔒 Finish the previous clue first',
   desc:'Never absent without reason.',
   clues:['Jade: "Someone you trust?" Devon: "Someone attentive, capable, and never absent without reason. If she has vanished from public view, I would rather not dismiss it as coincidence."'], rw:{xp:172700, gold:36540}},
  {id:'rheon_tutorial', kind:'investigate', n:'Field Training', icon:'🛡️', ch:265, need:2, ambush:[], lo:82, needFlag:'inv_mirelle_unseen', lockMsg:'🔒 Finish the previous clue first',
   desc:'Far less ceremonial.',
   clues:['Rheon: "Field training is far less ceremonial than palace drills." Jade: "And far more useful. You\'re learning quickly."', 'Rheon: "I still have much to learn, but I\'m grateful for the chance to gain real experience."'], rw:{xp:173000, gold:36600}},
  {id:'campfire_devon', kind:'investigate', n:'At the Campfire', icon:'🔥', ch:265, need:2, ambush:[], lo:82, needFlag:'inv_rheon_tutorial', lockMsg:'🔒 Finish the previous clue first',
   desc:'Her absence is unusual.',
   clues:['Devon: "When we reach Dragonvale, I want to look into this message myself. Lady Mirelle Veyne\'s name should not be appearing like this without explanation."', 'Jade: "Do you think something has happened to her?" Devon: "I can\'t say yet. But Mirelle has always been remarkably attentive to court affairs. Her absence from public view is unusual."'], rw:{xp:173300, gold:36660}}
);
LOCATIONS.dragon_court.spots.push(
  {id:'empty_seat', kind:'investigate', n:'The Empty Seat', icon:'🪑', ch:266, need:2, ambush:[], lo:82,
   desc:'Lady Mirelle Veyne.',
   clues:['During the gathering, Devon notices that Lady Mirelle Veyne\'s usual seat is empty. Devon: "Lady Mirelle\'s seat is empty... Has she not yet arrived?"'], rw:{xp:173600, gold:36720}},
  {id:'household_claim', kind:'investigate', n:'The Household\'s Claim', icon:'🗣️', ch:266, need:2, ambush:[], lo:82, needFlag:'inv_empty_seat', lockMsg:'🔒 Finish the previous clue first',
   desc:'Died while travelling.',
   clues:['A lord: "Lady Mirelle Veyne disappeared several weeks ago. She has not been seen since her journey to the northern territories. Her household claims she died while travelling, but no body has been recovered."'], rw:{xp:173900, gold:36780}},
  {id:'petition_filed', kind:'investigate', n:'The Petition Is Already Filed', icon:'📜', ch:266, need:2, ambush:[], lo:82, needFlag:'inv_household_claim', lockMsg:'🔒 Finish the previous clue first',
   desc:'To recognise her death.',
   clues:['House Veyne has submitted a formal petition to have Lady Mirelle declared deceased, so that succession matters may proceed.', 'Devon: "...No body, no confirmation, yet a petition already? This is convenient. Too convenient. I don\'t believe it."'], rw:{xp:174200, gold:36840}},
  {id:'veyne_dossier', kind:'investigate', n:'The House Veyne Dossier', icon:'🗂️', ch:266, need:2, ambush:[], lo:82, needFlag:'inv_petition_filed', lockMsg:'🔒 Finish the previous clue first',
   desc:'Family, travel, politics.',
   clues:['Jade: "Mirelle was an experienced noblewoman. She rarely travelled without proper arrangements and a full escort. For her to vanish on a northern journey without a trace... It doesn\'t make sense."', 'House Veyne Dossier: family background; current household members; recent activities; travel records; political ties; petition for declaration of death.'], rw:{xp:174500, gold:36900}},
  {id:'last_reliably_seen', kind:'investigate', n:'Who Benefits', icon:'❓', ch:266, need:2, ambush:[], lo:82, needFlag:'inv_veyne_dossier', lockMsg:'🔒 Finish the previous clue first',
   desc:'Learn when she was last seen.',
   clues:['Devon: "Exactly. Someone is trying to have Mirelle declared dead. We need to learn when she was last reliably seen, who travelled with her, and who benefits from her absence."'], rw:{xp:174800, gold:36960}},
  {id:'devon_on_mirelle', kind:'investigate', n:'Devon on Mirelle', icon:'💬', ch:267, need:2, ambush:[], lo:82,
   desc:'Never afraid to correct him.',
   clues:['Devon: "Lady Mirelle was there for me during some of the most difficult periods of my life. She was never afraid to correct me, even when it stung."', '"She taught me that a prince\'s responsibility is not merely to protect his family\'s interests... but to understand the people who will be affected by our decisions."'], rw:{xp:175100, gold:37020}},
  {id:'mirelles_lessons', kind:'investigate', n:'Mirelle\'s Lessons', icon:'📖', ch:267, need:2, ambush:[], lo:82, needFlag:'inv_devon_on_mirelle', lockMsg:'🔒 Finish the previous clue first',
   desc:'Power is easy.',
   clues:['Mirelle: "Power is easy. Understanding people is harder. But it is the harder path that makes a worthy ruler. Question what you are told. Listen to those who are not heard."', 'Mirelle: "There will be times when you are wrong. Do not be afraid of those who correct you. They are a gift."'], rw:{xp:175400, gold:37080}},
  {id:'jade_resolves', kind:'investigate', n:'We Will Find Her', icon:'🤝', ch:267, need:2, ambush:[], lo:82, needFlag:'inv_mirelles_lessons', lockMsg:'🔒 Finish the previous clue first',
   desc:'She deserves to be found.',
   clues:['Jade: "She sounded remarkable. No wonder you respected her so deeply. I want to find her."', 'Devon: "Losing someone like her is a great loss to Dragonvale." Jade: "Then we will find her. Let\'s speak with those who served in her household."'], rw:{xp:175700, gold:37140}},
  {id:'former_attendants', kind:'investigate', n:'Former Attendants', icon:'🧑‍🤝‍🧑', ch:267, need:2, ambush:[], lo:82, needFlag:'inv_jade_resolves', lockMsg:'🔒 Finish the previous clue first',
   desc:'Three accounts.',
   clues:['An official: "Lady Mirelle\'s former attendants may still be in the city. Some of them have since taken service in other houses, but they might be willing to talk."', '"If we can gather three accounts, we may be able to piece together what happened before her disappearance."'], rw:{xp:176000, gold:37200}},
  {id:'petition_haste', kind:'investigate', n:'Six Days', icon:'⏱️', ch:270, need:2, ambush:[], lo:82,
   desc:'Unusually quickly.',
   clues:['Jade: "This petition was prepared unusually quickly. Only six days between the incident and the filing? Major noble petitions of this nature usually take weeks, if not months, to prepare."', 'Jade: "This haste suggests someone wanted to move things forward before questions could be asked."'], rw:{xp:178700, gold:37740}},
  {id:'missing_witnesses', kind:'investigate', n:'The Missing Witnesses', icon:'👥', ch:270, need:2, ambush:[], lo:82, needFlag:'inv_petition_haste', lockMsg:'🔒 Finish the previous clue first',
   desc:'Two are unavailable.',
   clues:['Devon: "I have also checked the listed witnesses. Two of them are currently unavailable: one is travelling overseas, and the other has not been seen in Dragonvale for months."', 'Sir Marcel Braithe: unavailable (currently overseas). Lady Orienne Vale: unavailable (not seen in Dragonvale). Master Lyle Corwen and Sister Amelia: statements filed.'], rw:{xp:179000, gold:37800}},
  {id:'cassians_control', kind:'investigate', n:'Lord Cassian', icon:'🏰', ch:270, need:2, ambush:[], lo:82, needFlag:'inv_missing_witnesses', lockMsg:'🔒 Finish the previous clue first',
   desc:'A distant relative.',
   clues:['A clerk: "If Lady Mirelle\'s death is recognized, temporary control of House Veyne\'s properties would pass to her distant relative, Lord Cassian Veyne, until a direct heir is confirmed."', 'Devon: "Lord Cassian lives in the western provinces and has had little involvement with the household in recent years. It is unusual that he would be granted control so quickly."'], rw:{xp:179300, gold:37860}},
  {id:'body_unproven', kind:'investigate', n:'No Body, No Evidence', icon:'📋', ch:270, need:2, ambush:[], lo:82, needFlag:'inv_cassians_control', lockMsg:'🔒 Finish the previous clue first',
   desc:'Incomplete evidence.',
   clues:['Jade: "The petition claims that Lady Mirelle\'s body was recovered and identified, but the supporting evidence is incomplete. The official record contains no detailed account of the recovery, and there are no physical evidence reports attached."', 'Devon: "We cannot accept this petition at face value. I will request that the proceedings be suspended pending a full investigation."'], rw:{xp:179600, gold:37920}}
);
LOCATIONS.dragon_academy.spots.push(
  {id:'academy_library', kind:'investigate', n:'The Academy Library', icon:'🏛️', ch:268, need:2, ambush:[], lo:82,
   desc:'An unexpected student.',
   clues:['While following leads in Dragonvale, Jade visits the academy archives and finds an unexpected student among the shelves: Delilah Dee, Roc\'s consort, has begun formal study in military law and administration.', 'Jade: "Delilah...? I didn\'t expect to find you here."'], rw:{xp:176300, gold:37260}},
  {id:'delilah_reasons', kind:'investigate', n:'Why She Studies', icon:'📚', ch:268, need:2, ambush:[], lo:82, needFlag:'inv_academy_library', lockMsg:'🔒 Finish the previous clue first',
   desc:'Duty, not only privilege.',
   clues:['Delilah: "I know. In the past, I cared too much for appearances and too little for what title truly means. If I am to stand beside a noble household, and raise children within it, I should understand duty, not only privilege."', '"And administration. Contracts, records, supply law, provincial obligations... the work behind authority."'], rw:{xp:176600, gold:37320}},
  {id:'only_a_student', kind:'investigate', n:'Only a Student', icon:'🎓', ch:268, need:2, ambush:[], lo:82, needFlag:'inv_delilah_reasons', lockMsg:'🔒 Finish the previous clue first',
   desc:'That is enough.',
   clues:['Delilah: "You don\'t have to praise me. I only want to become someone more worthy than I was before. I\'m only a student for now. That is enough."', 'Jade does not laugh. For the first time in a long while, she sees Delilah not as a rival, but as a woman trying to change.'], rw:{xp:176900, gold:37380}},
  {id:'roc_notices', kind:'investigate', n:'Roc Notices', icon:'🧔', ch:268, need:2, ambush:[], lo:82, needFlag:'inv_only_a_student', lockMsg:'🔒 Finish the previous clue first',
   desc:'Not a passing interest.',
   clues:['Roc: "She has been like this every day. Once she begins reading, she forgets the hour. I thought it was a passing interest. It wasn\'t."', 'Jade and Roc continue their search for Lady Mirelle Veyne\'s whereabouts. Objective: speak with Delilah and visit the administrative archives.'], rw:{xp:177200, gold:37440}},
  {id:'words_overdue', kind:'investigate', n:'Words Long Overdue', icon:'🌸', ch:269, need:2, ambush:[], lo:82,
   desc:'In private.',
   clues:['After recent events, Lady Delilah asks to speak with Jade in private. With a full heart and many unspoken words, Delilah hesitates before approaching: "There is something I should have said long ago."'], rw:{xp:177500, gold:37500}},
  {id:'the_apology', kind:'investigate', n:'The Apology', icon:'🙇', ch:269, need:2, ambush:[], lo:82, needFlag:'inv_words_overdue', lockMsg:'🔒 Finish the previous clue first',
   desc:'No excuses.',
   clues:['Delilah: "I was jealous, petty, and cruel to you. I treated you unfairly. I will not excuse it. I only wanted to apologise. I am not asking for anything in return."'], rw:{xp:177800, gold:37560}},
  {id:'jades_answer', kind:'investigate', n:'Jade\'s Answer', icon:'🤝', ch:269, need:2, ambush:[], lo:82, needFlag:'inv_the_apology', lockMsg:'🔒 Finish the previous clue first',
   desc:'It will take time.',
   clues:['Jade: "Thank you for saying it honestly. I accept your apology, but trust is not restored in a single moment. If it is to be rebuilt, it will take time." Delilah: "I understand. That is more kindness than I deserve."'], rw:{xp:178100, gold:37620}},
  {id:'begins_quietly', kind:'investigate', n:'It Begins Quietly', icon:'🌙', ch:269, need:2, ambush:[], lo:82, needFlag:'inv_jades_answer', lockMsg:'🔒 Finish the previous clue first',
   desc:'Stage I.',
   clues:['Jade: "We have both grown through many trials. I hope we can continue to walk forward with openness and respect." Delilah: "I would like that very much."', 'Their reconciliation does not arrive dramatically. It begins quietly: different paths, a clearer understanding, and a more honest future ahead.'], rw:{xp:178400, gold:37680}}
);
MISSIONS.push(
  {id:'m_s263', needCh:263, title:'The Prince Who Wouldn\'t Stay Put', obj:{type:'steps', steps:[
     {label:'Sera Stays in Altan', spot:'stay_in_altan'},
     {label:'Then I Will Go in Your Place', spot:'rheon_goes_instead'},
     {label:'Permission to Travel', spot:'envoy_permission'},
     {label:'Companion Update', spot:'companion_update'}]}, rw:{xp:610000, gold:128000, rep:1420},
   subj:'The Prince Who Wouldn\'t Stay Put', body:'Take care on the road. — Greyson'},
  {id:'m_s264', needCh:264, title:'A Falcon Beyond Altan', obj:{type:'steps', steps:[
     {label:'A Different Kind of Journey', spot:'first_journey'},
     {label:'Trouble on the Road', spot:'trouble_on_road'},
     {label:'His First Assignment', spot:'first_assignment'},
     {label:'Rin and Eira Step Away', spot:'rin_eira_leave'}]}, rw:{xp:612500, gold:128600, rep:1423},
   subj:'A Falcon Beyond Altan', body:'Take care on the road. — Greyson'},
  {id:'m_s265', needCh:265, title:'The Road to Dragonvale', obj:{type:'steps', steps:[
     {label:'A Sealed Message', spot:'sealed_message'},
     {label:'Someone You Trust', spot:'mirelle_unseen'},
     {label:'Field Training', spot:'rheon_tutorial'},
     {label:'At the Campfire', spot:'campfire_devon'}]}, rw:{xp:615000, gold:129200, rep:1426},
   subj:'The Road to Dragonvale', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s266', needCh:266, title:'An Empty Chair', obj:{type:'steps', steps:[
     {label:'The Empty Seat', spot:'empty_seat'},
     {label:'The Household\'s Claim', spot:'household_claim'},
     {label:'The Petition Is Already Filed', spot:'petition_filed'},
     {label:'The House Veyne Dossier', spot:'veyne_dossier'},
     {label:'Who Benefits', spot:'last_reliably_seen'}]}, rw:{xp:617500, gold:129800, rep:1429},
   subj:'An Empty Chair', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s267', needCh:267, title:'The Lady Who Advised Princes', obj:{type:'steps', steps:[
     {label:'Devon on Mirelle', spot:'devon_on_mirelle'},
     {label:'Mirelle\'s Lessons', spot:'mirelles_lessons'},
     {label:'We Will Find Her', spot:'jade_resolves'},
     {label:'Former Attendants', spot:'former_attendants'}]}, rw:{xp:620000, gold:130400, rep:1432},
   subj:'The Lady Who Advised Princes', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s268', needCh:268, title:'The Woman in the Library', obj:{type:'steps', steps:[
     {label:'The Academy Library', spot:'academy_library'},
     {label:'Why She Studies', spot:'delilah_reasons'},
     {label:'Only a Student', spot:'only_a_student'},
     {label:'Roc Notices', spot:'roc_notices'}]}, rw:{xp:622500, gold:131000, rep:1435},
   subj:'The Woman in the Library', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s269', needCh:269, title:'Words Long Overdue', obj:{type:'steps', steps:[
     {label:'Words Long Overdue', spot:'words_overdue'},
     {label:'The Apology', spot:'the_apology'},
     {label:'Jade\'s Answer', spot:'jades_answer'},
     {label:'It Begins Quietly', spot:'begins_quietly'}]}, rw:{xp:625000, gold:131600, rep:1438},
   subj:'Words Long Overdue', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s270', needCh:270, title:'The Petition of Death', obj:{type:'steps', steps:[
     {label:'Six Days', spot:'petition_haste'},
     {label:'The Missing Witnesses', spot:'missing_witnesses'},
     {label:'Lord Cassian', spot:'cassians_control'},
     {label:'No Body, No Evidence', spot:'body_unproven'}]}, rw:{xp:627500, gold:132200, rep:1441},
   subj:'The Petition of Death', body:'Dragonvale needs this answered. — Greyson'}
);

/* ---- Companion states (the Companion Assignment system, first form): Rin is on the northern frontier from ch264 until the story sets rin_returned. ---- */
const rinAway = () => !!G && G.ch >= 264 && !(G.flags && G.flags.rin_returned);
/* ---- The Mirelle case board ---- */
const CASE_ITEMS = [
  {cat:'Witnesses', n:'The household\'s claim: she died travelling north', t:'No body has been recovered.', spot:'household_claim'},
  {cat:'Witnesses', n:'Former household attendants', t:'Three accounts are needed to piece together her last days.', spot:'former_attendants'},
  {cat:'Documents', n:'The House Veyne dossier', t:'Family, household, travel records, political ties.', spot:'veyne_dossier'},
  {cat:'Documents', n:'Petition for Recognition of Death', t:'Incident on the 10th Day, 3rd Month; filed on the 16th Day.', spot:'petition_haste'},
  {cat:'Documents', n:'Witness list of the petition', t:'Four witnesses: two unavailable, two statements filed.', spot:'missing_witnesses'},
  {cat:'Documents', n:'Military supply authorisations', t:'Deliveries to House Veyne\'s northern estate continued after the reported death.', spot:'supply_authorisations'},
  {cat:'Documents', n:'Redirection records', t:'Grain, medicine, equipment, weapons and tools sent to Northwatch Station, authorised by the Provincial Military Office.', spot:'redirection_records'},
  {cat:'Documents', n:'Mirelle\'s hidden letter', t:'Tensions in the estate and someone planning to remove certain people.', spot:'hidden_letter'},
  {cat:'Witnesses', n:'The frightened servants', t:'Some insist she died; others refuse to speak.', spot:'frightened_servants'},
  {cat:'Locations', n:'Northwatch Station (abandoned)', t:'Supplies were redirected here; abandoned for years.', spot:'northwatch_station'},
  {cat:'Locations', n:'The Veyne Estate', t:'Orderly outside, hollow within. Mirelle\'s private study.', spot:'private_study'},
  {cat:'Contradictions', n:'Deliveries after the reported death', t:'Authorisations run from the 3rd to the 6th Month; the death was reported on the 10th Day of the 3rd Month, before the first delivery.', spot:'supply_authorisations'},
  {cat:'Contradictions', n:'Loyal staff dismissed within a month', t:'Steward, head of security, accountant and two senior servants, by order of the current household authority.', spot:'dismissed_officials'},
  {cat:'Documents', n:'Land grant letters', t:'Incomplete correspondence about northern military land grants; the final letter is missing.', spot:'land_grant_letters'},
  {cat:'Documents', n:'The torn ledger page', t:'A page removed from Mirelle\'s personal ledger, recently.', spot:'torn_ledger_page'},
  {cat:'Locations', n:'The Northern Road', t:'Four names, erased from the latest maps; still in use.', spot:'four_names'},
  {cat:'Documents', n:'Station land grants and shipping logs', t:'Land grants matching the Veyne territories, funded through House Veyne\'s private accounts.', spot:'veyne_land_grants'},
  {cat:'Locations', n:'Northwatch Station', t:'Hidden beneath the pines: still in use.', spot:'station_overview'},
  {cat:'Documents', n:'Transfer of Military Properties', t:'Pine Ridge Estate, Northreach Hollow, Eastern Farmlands and Stoneveil Forest Permit.', spot:'altered_ownership'},
  {cat:'Documents', n:'Mirelle\'s audit request', t:'To the Royal Oversight Office, shortly before she vanished.', spot:'audit_request'},
  {cat:'Witnesses', n:'The witness whose signature was forged', t:'He never saw her die.', spot:'listed_witness'},
  {cat:'Contradictions', n:'A forged signature on the death report', t:'Compare the forged A. Mardon with the verified one.', spot:'forged_signature'},
  {cat:'Documents', n:'Northern convoy records', t:'A guarded convoy left three days after the false report, for Crestfall Hold.', spot:'convoy_records'},
  {cat:'Locations', n:'Crestfall Hold', t:'The concealed detention site at the base of the northern cliffs.', spot:'detention_site'},
  {cat:'Contradictions', n:'Medicine for a prisoner', t:'Herbal salves and bandages for prolonged confinement.', spot:'medicinal_supplies'},
  {cat:'Witnesses', n:'Mirelle\'s own account', t:'She refused to approve the fraudulent transfers.', spot:'she_refused'},
  {cat:'Documents', n:'The Mirror of Returning Years records', t:'Relic activation records and the officials\' network.', spot:'relic_discovered'},
  {cat:'Conclusions', n:'The conspiracy is larger than one house', t:'Multiple officials, commanders and estates.', spot:'a_larger_conspiracy'},
  {cat:'Conclusions', n:'Mirelle is alive', t:'The death report was a fabrication.', spot:'transported_north'},
  {cat:'Conclusions', n:'The Veyne conspiracy is judged', t:'By Dragonvale\'s laws, not by vengeance.', spot:'judgment_rendered'},
  {cat:'Conclusions', n:'Someone is isolating Mirelle\'s household', t:'More lies behind her disappearance than the household admits.', spot:'hidden_letter'},
  {cat:'Contradictions', n:'Six days from incident to filing', t:'Such petitions usually take weeks or months.', spot:'petition_haste'},
  {cat:'Contradictions', n:'Two key witnesses are unavailable', t:'Sir Marcel Braithe (overseas) and Lady Orienne Vale (not seen in Dragonvale).', spot:'missing_witnesses'},
  {cat:'Contradictions', n:'A distant relative gains control quickly', t:'Lord Cassian Veyne, of the western provinces, with little recent involvement.', spot:'cassians_control'},
  {cat:'Contradictions', n:'A body "recovered" without evidence', t:'No detailed account, no physical evidence reports.', spot:'body_unproven'},
  {cat:'Conclusions', n:'Someone is trying to have Mirelle declared dead', t:'Convenient, and too convenient.', spot:'last_reliably_seen'},
  {cat:'Conclusions', n:'Mirelle\'s death has not been established', t:'The petition is set aside pending a full investigation.', spot:'body_unproven'},
];
/* Delilah (a student, not an adviser): from ch271 her study notes add a little XP on each Veyne case clue. */
const delilahBonus = spotId => { const sp = spotById(spotId); return (G.flags && G.flags.delilah_notes && sp && sp.delilahCase) ? 60 + avgPartyLv()*3 : 0; };
const caseOpen = () => !!G && G.ch >= 266;
const caseFound = it => !!it.spot && !!G.flags['inv_'+it.spot];
const DELILAH_STAGES = [['Student','Studying military law and administration (from chapter 268).',268],['Apprentice','Assists with document investigations (a later chapter).',999],['Administrator','Supply and travel bonuses (a later chapter).',999]];
function rCase(){
  const cats = ['Witnesses','Documents','Locations','Contradictions','Conclusions'];
  const have = CASE_ITEMS.filter(caseFound).length;
  let h = `<div class="panel"><b>🗂️ THE VANISHING OF LADY VEYNE</b><div class="sm">${have} / ${CASE_ITEMS.length} entries on the board. Witnesses lead to documents, documents to places, and the contradictions between them to conclusions.</div></div>`;
  h += cats.map(c => `<h4>${({Witnesses:'🗣️',Documents:'📜',Locations:'📍',Contradictions:'⚡',Conclusions:'⚖️'})[c]} ${c}</h4>` + CASE_ITEMS.filter(i => i.cat===c).map(i => caseFound(i) ? `<div class="li">✅ <b>${i.n}</b><div class="sm">${i.t}</div></div>` : `<div class="li">❔ ???</div>`).join('')).join('');
  if(G.ch >= 268){
    const st = G.flags.delilah_studies_2 ? 'Studies: Stage II (Administrative Training), with Mirelle\'s mentorship' : G.flags.delilah_reconciliation_1 ? 'Reconciliation: Stage I' : 'Student';
    h += `<h4>📚 Delilah's Administrative Studies</h4><div class="li"><b>${st}</b><div class="sm">${DELILAH_STAGES[0][1]} Her studies continue; she is a student, not yet an adviser.${G.flags.delilah_reconciliation_1?' Jade has accepted her apology; trust will take time.':''}</div></div>`;
  }
  if(mirAdvOpen()){
    h += `<h4><img src="assets/npc/mirelle.webp" alt="Lady Mirelle Veyne" style="width:40px;height:40px;border-radius:50%;object-fit:cover;vertical-align:middle;border:2px solid var(--gold)"> Lady Mirelle Veyne</h4><div class="sm">An advisor, not a recruit. One piece of counsel every 3 days (${mirAdv().n} given).</div><button ${mirAdvReady()?'':'disabled'} onclick="act(mirelleCounsel)">Ask for her counsel</button>`;
  }
  if(delTrainOpen()){
    h += `<h4><img src="assets/npc/delilah.webp" alt="Delilah" style="width:40px;height:40px;border-radius:50%;object-fit:cover;vertical-align:middle;border:2px solid var(--gold)"> Administrative training</h4><div class="sm">Once every 4 days: a lesson at House Veyne (${delTrain().n} done). Delilah is a student, not yet an adviser.</div><button ${delTrainReady()?'':'disabled'} onclick="act(delilahTrain)">Join Delilah\'s lesson</button>`;
  }
  return h;
}

/* ---- Chapters 271-272: Delilah's lead (the Academy archives) and the Veyne Estate (opens after ch271) ---- */
Object.assign(LOCATIONS, {
  veyne_estate:{ n:'Veyne Estate', region:'dragon', kind:'town', icon:'🏛️', unlock:{ch:271},
    desc:'House Veyne\'s town estate in Dragonvale: orderly, hollow and afraid. Lady Mirelle\'s private study is here.',
    spots:[
      {id:'estate_hall', kind:'tavern', n:'The Estate Guest Hall', icon:'🍵', desc:'Rest and share a meal with the party.'},
    ]},
});
if(!LOC_ORDER.includes('veyne_estate')) LOC_ORDER.push('veyne_estate');
ROUTES.push(
  {a:'dragon_vale', b:'veyne_estate', mode:'carriage', n:'The Veyne Road', days:1, fare:0, risk:.1, pool:['road_bandit']},
  {a:'dragon_court', b:'veyne_estate', mode:'carriage', n:'Court to the Veyne Estate', days:1, fare:0, risk:.1, pool:['road_bandit']},
);
LOCATIONS.dragon_academy.spots.push(
  {id:'supply_authorisations', kind:'investigate', n:'The Supply Authorisations', icon:'📑', ch:271, need:2, ambush:[], lo:82,
   desc:'Deliveries after her death.',
   clues:['Delilah: "These are supply authorisations for House Veyne\'s northern estate... There are deliveries recorded even after Lady Mirelle was supposedly dead."', 'Delilah: "Lady Mirelle\'s death was reported in the 10th Day of the 3rd Month. But these authorisations are from the 3rd, 4th, 5th and 6th Months... That does not match."'], rw:{xp:173000, gold:36700}},
  {id:'delilahs_find', kind:'investigate', n:'Delilah\'s Find', icon:'🎓', ch:271, need:2, ambush:[], lo:82, needFlag:'inv_supply_authorisations', lockMsg:'🔒 Finish the previous clue first',
   desc:'Good catch.',
   clues:['Delilah: "I may have found something strange in the supply records. House Veyne\'s northern estate continued receiving deliveries even after Lady Mirelle was reported dead."', 'Jade: "You noticed this? Good catch, Delilah. This could be important."'], rw:{xp:173300, gold:36760}},
  {id:'redirection_records', kind:'investigate', n:'The Redirection Records', icon:'🔁', ch:271, need:2, ambush:[], lo:82, needFlag:'inv_delilahs_find', lockMsg:'🔒 Finish the previous clue first',
   desc:'Not sent to the estate.',
   clues:['Jade: "The supplies themselves are real. These authorisations were properly approved. But look here... some of the later deliveries were not sent directly to the estate."', 'Redirection Record: grain, medicine and equipment (28th Day, 4th Month), weapons and tools (14th Day, 5th Month): from House Veyne (Northern Estate) to Northwatch Station (Abandoned). Authorised by: the Provincial Military Office.'], rw:{xp:173600, gold:36820}},
  {id:'northwatch_station', kind:'investigate', n:'Northwatch Station', icon:'🏚️', ch:271, need:2, ambush:[], lo:82, needFlag:'inv_redirection_records', lockMsg:'🔒 Finish the previous clue first',
   desc:'Abandoned for years.',
   clues:['Jade: "Several deliveries were redirected. They were sent instead to Northwatch Station... but this station has been abandoned for years. Why would supplies be redirected to an abandoned military station?"', 'Jade: "Someone was still using this route after Lady Mirelle\'s death. We need to find out who was receiving these supplies, and what they were used for."'], rw:{xp:173900, gold:36880}}
);
LOCATIONS.veyne_estate.spots.push(
  {id:'estate_visit', kind:'investigate', n:'The Estate Without Its Lady', icon:'🏛️', ch:272, need:2, ambush:[], lo:82, delilahCase:true,
   desc:'The warmth is gone.',
   clues:['Jade\'s party visits House Veyne in Dragonvale. The estate is still functioning, but in the absence of Lady Mirelle, a tense and uneasy atmosphere lingers over the household.', 'Without its lady, the household feels hollow, and fear hangs in the air.'], rw:{xp:174200, gold:36940}},
  {id:'frightened_servants', kind:'investigate', n:'The Frightened Servants', icon:'😰', ch:272, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_estate_visit', lockMsg:'🔒 Finish the previous clue first',
   desc:'Don\'t reopen old wounds.',
   clues:['A maid: "Lady Mirelle... she is dead. There is no need to search further. She will not be returning. It was a terrible tragedy. We have all moved on. Please, my lady, don\'t reopen old wounds."', '"I\'m sorry... I cannot talk about Lady Mirelle. Please don\'t ask me any more questions... It\'s better if you speak to someone else... Please..."'], rw:{xp:174500, gold:37000}},
  {id:'dismissed_officials', kind:'investigate', n:'The Dismissed Officials', icon:'📋', ch:272, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_frightened_servants', lockMsg:'🔒 Finish the previous clue first',
   desc:'Within the last month.',
   clues:['Devon: "Several of the long-serving household officials have been dismissed. The steward, the head of security, and two senior attendants... all removed within the last month. That is a significant change. Someone is purging loyal staff."', 'Rennard Vale (Head Steward, 18 years), Celia Marst (Senior Attendant, 12), Borin Keld (Head of Security, 16), Lysa Quen (Estate Accountant, 14), Tomas Heller (Senior Servant, 11): all dismissed by order of the current household authority.'], rw:{xp:174800, gold:37060}},
  {id:'private_study', kind:'investigate', n:'Mirelle\'s Private Study', icon:'📚', ch:272, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_dismissed_officials', lockMsg:'🔒 Finish the previous clue first',
   desc:'Her belongings remain.',
   clues:['The party gains access to Lady Mirelle\'s private study. Her personal belongings remain, offering a glimpse into her life... and perhaps the truth.', 'Jade: "There are many personal notes, ledgers, and letters here. She was still managing estate affairs right up until the end." Devon: "Look carefully. There may be something they missed."'], rw:{xp:175100, gold:37120}},
  {id:'hidden_letter', kind:'investigate', n:'The Hidden Letter', icon:'✉️', ch:272, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_private_study', lockMsg:'🔒 Finish the previous clue first',
   desc:'Behind the panel.',
   clues:['Jade: "There\'s a hidden compartment behind this panel... A document... this looks important. This is a private letter... It describes tensions within the estate, and mentions someone planning to remove certain people... This could be the key to what happened to Lady Mirelle."', 'Devon: "So she suspected something... and someone was trying to isolate her. This confirms there is more to her disappearance than we were told."'], rw:{xp:175400, gold:37180}}
);
MISSIONS.push(
  {id:'m_s271', needCh:271, title:'A Student\'s Observation', obj:{type:'steps', steps:[
     {label:'The Supply Authorisations', spot:'supply_authorisations'},
     {label:'Delilah\'s Find', spot:'delilahs_find'},
     {label:'The Redirection Records', spot:'redirection_records'},
     {label:'Northwatch Station', spot:'northwatch_station'}]}, rw:{xp:625000, gold:129500, rep:1440},
   subj:'A Student\'s Observation', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s272', needCh:272, title:'The Estate Without Its Lady', obj:{type:'steps', steps:[
     {label:'The Estate Without Its Lady', spot:'estate_visit'},
     {label:'The Frightened Servants', spot:'frightened_servants'},
     {label:'The Dismissed Officials', spot:'dismissed_officials'},
     {label:'Mirelle\'s Private Study', spot:'private_study'},
     {label:'The Hidden Letter', spot:'hidden_letter'}]}, rw:{xp:627500, gold:130100, rep:1443},
   subj:'The Estate Without Its Lady', body:'Dragonvale needs this answered. — Greyson'}
);

/* ---- Chapters 273-286: the northern country, the station, the detention site, the trial and the closing chapters ---- */
Object.assign(LOCATIONS, {
  northern_road:{ n:'The Northern Road', region:'dragon', kind:'field', icon:'🛤️', unlock:{ch:274},
    desc:'The old military road into the pines north of Dragonvale, renamed four times and erased from the maps.',
    spots:[ {id:'northern_hunt', kind:'hunt', n:'The Restricted Road', icon:'🗡️', desc:'Armed men and beasts along the old road.', pool:['northern_mercenary','road_bandit','forest_wolf'], lo:82} ]},
  northwatch_station:{ n:'Northwatch Station', region:'dragon', kind:'field', icon:'🏚️', unlock:{ch:276},
    desc:'The hidden station beneath the pines: smoke, guards and sealed crates.',
    spots:[ {id:'station_hunt', kind:'hunt', n:'The Station Yard', icon:'🗡️', desc:'Masked guards and mercenaries.', pool:['northern_mercenary','masked_assassin'], lo:84},
            {id:'station_captain', kind:'boss', n:'The Northern Station Captain', icon:'🛡️', desc:'The mercenary leader who defends the station and its records at any cost.', boss:'boss_station_captain', add:['northern_mercenary'], lo:84, ch:276, needFlag:'inv_captains_post', lockMsg:'🔒 Reach the captain\'s post first'} ]},
  northern_valley:{ n:'Crestfall Hold', region:'dragon', kind:'field', icon:'🏰', unlock:{ch:279},
    desc:'A remote northern valley and the concealed fortress at the base of the cliffs where the conspirators held their captives.',
    spots:[ {id:'valley_hunt', kind:'hunt', n:'The Valley Watch', icon:'🗡️', desc:'Guards and watchmen in the snow.', pool:['northern_mercenary','detention_guard'], lo:85},
            {id:'prison_breakout', kind:'boss', n:'Break Out with Mirelle', icon:'🛡️', desc:'The guards move to stop the escape. Hold the line.', boss:'boss_prison_breakout', add:['detention_guard','detention_guard'], lo:85, ch:280, needFlag:'inv_escape', lockMsg:'🔒 Find Mirelle first'} ]},
});
['northern_road','northwatch_station','northern_valley'].forEach(k => { if(!LOC_ORDER.includes(k)) LOC_ORDER.push(k); });
ROUTES.push(
  {a:'dragon_vale', b:'northern_road', mode:'carriage', n:'The Northern Mountain Road', days:2, fare:30, risk:.4, pool:['northern_mercenary','road_bandit','forest_wolf']},
  {a:'northern_road', b:'northwatch_station', mode:'carriage', n:'The Hidden Path', days:1, fare:0, risk:.45, pool:['northern_mercenary','masked_assassin']},
  {a:'northern_road', b:'northern_valley', mode:'carriage', n:'Beyond the Northern Gate', days:2, fare:0, risk:.45, pool:['northern_mercenary','detention_guard']},
  {a:'dragon_court', b:'dragon_vale', mode:'carriage', n:'Court Road', days:1, fare:0, risk:.05, pool:['road_bandit']},
);
Object.assign(ENEMIES, {
  northern_mercenary:{n:'Northern Mercenary',icon:'🗡️',area:'dragon',hp:150,atk:18,mag:4,def:11,spd:11,xp:80,gold:60,traits:[],moves:[{n:'Hired Blade',pow:1.2},{n:'Shield Bash',pow:.9,fx:[{k:'slow',d:1}]}],drops:[{id:'frontier_hide',chance:.25}],desc:'A hired sword guarding the conspirators\' stations.'},
  detention_guard:{n:'Detention Guard',icon:'🛡️',area:'dragon',hp:170,atk:17,mag:3,def:14,spd:9,xp:84,gold:62,traits:[],moves:[{n:'Halberd Thrust',pow:1.3},{n:'Hold the Door',pow:.8,fx:[{k:'buff',stat:'def',m:1.2,d:2,self:true}]}],drops:[{id:'seal_dust',chance:.2}],desc:'A guard of the hidden northern fortress.'},
  boss_station_captain:{n:'Northern Station Captain',icon:'🛡️',area:'dragon',boss:true,hp:2900,atk:31,mag:8,def:19,spd:11,xp:1250,gold:900,traits:[],moves:[{n:'Mercenary Cleave',pow:1.4},{n:'Hired Guard',pow:1.0,fx:[{k:'buff',stat:'def',m:1.25,d:2,self:true}]},{n:'Rally the Station',pow:1.1,all:true}],phases:[{at:.5,msg:'The captain refuses to yield: these records belong to powerful people',atk:1.15}],desc:'A mercenary leader who defends the station and its contents at any cost.'},
  boss_prison_breakout:{n:'The Fortress Garrison',icon:'🏰',area:'dragon',boss:true,hp:2400,atk:27,mag:6,def:18,spd:10,xp:1100,gold:800,traits:[],moves:[{n:'Garrison Charge',pow:1.3},{n:'Raise the Alarm',pow:.9,fx:[{k:'slow',d:1}]},{n:'Bars and Chains',pow:1.1,all:true}],desc:'The garrison of the hidden fortress moves to stop the escape.'},
  boss_veyne_champion:{n:'The Veyne Conspirator\'s Champion',icon:'⚔️',area:'dragon',boss:true,hp:3600,atk:35,mag:20,def:21,spd:14,xp:1500,gold:1100,traits:[],moves:[{n:'Champion\'s Cut',pow:1.5},{n:'Relic-Charged Strike',pow:1.4,spell:true},{n:'Final Stand',pow:1.2,all:true}],phases:[{at:.5,msg:'The champion makes a final stand, empowered by the relic\'s unstable light',atk:1.2}],desc:'The conspirators\' champion, fighting one last time. He is captured alive.'},
});
LOOT.boss_station_captain = {guaranteed:[{id:'seal_dust',qty:[2,3]},{id:'frontier_hide',qty:[2,3]}],rolls:[{id:'royal_sigil',chance:.4}],firstClear:[{id:'celestial_shard',qty:[1,1]}]};
LOOT.boss_prison_breakout = {guaranteed:[{id:'seal_dust',qty:[2,3]},{id:'spirit_thread',qty:[1,2]}],rolls:[{id:'royal_sigil',chance:.35}],firstClear:[{id:'celestial_shard',qty:[1,1]}]};
LOOT.boss_veyne_champion = {guaranteed:[{id:'seal_dust',qty:[2,3]},{id:'forgotten_glass',qty:[1,2]}],rolls:[{id:'royal_sigil',chance:.5}],firstClear:[{id:'celestial_shard',qty:[1,2]}]};
LOCATIONS.veyne_estate.spots.push(
  {id:'sealed_study', kind:'investigate', n:'The Sealed Study', icon:'🚪', ch:273, need:1, ambush:[], lo:82, delilahCase:true,
   desc:'A replaced lock.',
   clues:['Jade: "The lock has been replaced. This was done after Lady Mirelle disappeared." A new lock, different from the estate\'s original, looks recently installed: the room was deliberately sealed.'], rw:{xp:176000, gold:37500}},
  {id:'lock_opened', kind:'investigate', n:'Opening the Lock', icon:'🗝️', ch:273, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_sealed_study', lockMsg:'🔒 Finish the previous clue first',
   desc:'It won\'t take long.',
   clues:['Levi: "I can open it. Give me a moment. This type of lock is common." Click. "There. It\'s open."', 'Mirelle\'s study is in order, but there are signs of hurried tampering: books moved, some documents missing.'], rw:{xp:176300, gold:37560}},
  {id:'land_grant_letters', kind:'investigate', n:'Incomplete Correspondence', icon:'✉️', ch:273, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_lock_opened', lockMsg:'🔒 Finish the previous clue first',
   desc:'Ending abruptly.',
   clues:['Jade: "These letters are incomplete correspondence about northern military land grants." Devon: "Lady Mirelle was involved in discussions about northern territories... but these letters end abruptly."', 'Jade: "These mention land allocations, military support, and noble families in the north. But the final letter is missing. Someone removed it."'], rw:{xp:176600, gold:37620}},
  {id:'torn_ledger_page', kind:'investigate', n:'The Missing Ledger Page', icon:'📖', ch:273, need:1, ambush:[], lo:82, delilahCase:true, needFlag:'inv_land_grant_letters', lockMsg:'🔒 Finish the previous clue first',
   desc:'Clean edges.',
   clues:['Devon: "Look at her personal ledger. A page has been deliberately removed." An entire page has been torn out: the edges are clean, not worn with age. It was removed recently.'], rw:{xp:176900, gold:37680}},
  {id:'household_astonished', kind:'investigate', n:'The Household Astonished', icon:'🏠', ch:283, need:2, ambush:[], lo:82, delilahCase:true,
   desc:'Is it truly you?',
   clues:['Mirelle returns to her estate. Her household is astonished to discover that their elderly mistress now appears to be a young woman. Some servants struggle to recognise her; others identify her immediately through her familiar mannerisms and commanding personality.', 'Mirelle: "Yes, it is I. While my appearance may have changed, I am still Lady Mirelle Veyne. And I trust House Veyne still runs as it should?"'], rw:{xp:188300, gold:39960}},
  {id:'devons_fear', kind:'investigate', n:'Devon\'s Fear', icon:'💬', ch:283, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_household_astonished', lockMsg:'🔒 Finish the previous clue first',
   desc:'You have learned well.',
   clues:['Devon: "I was truly frightened that I had lost you. Your advice has always been invaluable to me." Mirelle: "You are no longer the inexperienced prince I once advised, Devon. You have learned well."', 'Jade: "Some things never change. Lady Mirelle\'s presence still commands everyone, regardless of her appearance."'], rw:{xp:188600, gold:40020}},
  {id:'appearance_judges', kind:'investigate', n:'A Society That Judges', icon:'🪞', ch:283, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_devons_fear', lockMsg:'🔒 Finish the previous clue first',
   desc:'Underestimated.',
   clues:['Mirelle: "Although my noble standing has been restored, this transformation presents unexpected difficulties. For the first time in decades, strangers may underestimate me because I look young. I must navigate a society that judges people by their appearance."', 'Mirelle: "House Veyne has survived far worse than this. My responsibilities have not changed." Jade: "It seems this experience has done little to diminish your formidable personality." Mirelle: "How could it? Age was never the source of it."'], rw:{xp:188900, gold:40080}},
  {id:'veyne_restored', kind:'investigate', n:'House Veyne Restored', icon:'🏛️', ch:283, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_appearance_judges', lockMsg:'🔒 Finish the previous clue first',
   desc:'Reorganised and secured.',
   clues:['With Lady Mirelle\'s return, House Veyne begins to recover. The estate is reorganised, its people reassured, and its future secured.', 'Mirelle: "There is still much to learn about the relic and its effects. But for now, let us focus on rebuilding what was nearly lost." She joins as a recurring advisory NPC.'], rw:{xp:189200, gold:40140}},
  {id:'delilah_returns', kind:'investigate', n:'Delilah Returns', icon:'🎓', ch:284, need:2, ambush:[], lo:82, delilahCase:true,
   desc:'No longer for appearances.',
   clues:['After Mirelle\'s return, Delilah visits House Veyne to continue her studies. Delilah: "I used to care too much about rank... and far too much about what others thought of me. I see now how foolish that was."', 'Mirelle: "A common affliction among the nobility. Fortunately, it can be treated with work. Develop competence first. Recognition is unreliable company."'], rw:{xp:189500, gold:40200}},
  {id:'supply_records_lesson', kind:'investigate', n:'The Supply Records', icon:'📑', ch:284, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_delilah_returns', lockMsg:'🔒 Finish the previous clue first',
   desc:'Quantities, routes, costs.',
   clues:['Mirelle: "Here are last season\'s supply records. Compare them to the delivery notes. Look for discrepancies. Pay attention to quantities, transport routes and storage costs."', 'Delilah: "So this shipment was recorded twice... I\'ll mark the error and note the correct amount. And this supplier charged extra due to a longer route. I\'ll add a remark for future negotiations."'], rw:{xp:189800, gold:40260}},
  {id:'first_milestone', kind:'investigate', n:'The First Formal Milestone', icon:'🏅', ch:284, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_supply_records_lesson', lockMsg:'🔒 Finish the previous clue first',
   desc:'Well done.',
   clues:['Mirelle: "Good. You are already thinking like an administrator rather than a mere decorative noble. That is real progress."', '"Today marks your first formal milestone, Delilah. You have reviewed records, corrected errors, and drafted supply recommendations. Well done."'], rw:{xp:190100, gold:40320}},
  {id:'competence_not_admiration', kind:'investigate', n:'Capable, Not Admired', icon:'📖', ch:284, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_first_milestone', lockMsg:'🔒 Finish the previous clue first',
   desc:'The heart of a noblewoman.',
   clues:['Delilah: "I no longer seek admiration. I want to be capable." Mirelle: "That is the heart of a true noblewoman. Birth may open doors, but it is competence that allows you to walk through them and keep them open."', 'Delilah takes another step forward: not just as Roc\'s consort, but as a capable noblewoman in her own right.'], rw:{xp:190400, gold:40380}},
  {id:'rheons_reflection', kind:'investigate', n:'Rheon\'s Reflection', icon:'🦅', ch:285, need:2, ambush:[], lo:82, delilahCase:true,
   desc:'Unexpectedly fulfilling.',
   clues:['Rheon: "I never expected travelling outside Altan to be so... fulfilling. Jade\'s party is different. I see the world in a way I never did before."', 'Devon: "It is good to gain new perspectives. But you cannot forget your responsibilities, Rheon." Rheon: "Does serving Altan always mean becoming king? There are many ways to serve. A ruler is only one of them, is it not?"'], rw:{xp:190700, gold:40440}},
  {id:'rheon_in_the_garden', kind:'investigate', n:'A Rare Visit', icon:'🌸', ch:285, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_rheons_reflection', lockMsg:'🔒 Finish the previous clue first',
   desc:'A proper estate.',
   clues:['Later, Rheon visits House Veyne and finds Mirelle in the gardens. Mirelle: "Ah, Prince Rheon. A rare visit. Have you come to observe how a proper estate is managed?"', 'Rheon: "I heard you command your household more effectively than most military officers command their soldiers." Mirelle: "Flattery from a prince already? Careful, or I might assign you some actual work."'], rw:{xp:191000, gold:40500}},
  {id:'mirelles_counsel', kind:'investigate', n:'Mirelle\'s Counsel', icon:'📖', ch:285, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_rheon_in_the_garden', lockMsg:'🔒 Finish the previous clue first',
   desc:'A true path.',
   clues:['Rheon: "Sometimes I wonder if I am running away from my responsibilities because this life feels more free." Mirelle: "Freedom is valuable. But do not confuse a temporary escape with a true path. Do not make impulsive decisions simply because another life appears more appealing."', 'Mirelle: "You have a good heart, Prince Rheon. You see people, not just their titles. Whatever path you choose, make sure it is a decision you can stand by, even if it is unpopular with others."'], rw:{xp:191300, gold:40560}},
  {id:'renewed_clarity', kind:'investigate', n:'Renewed Clarity', icon:'🌆', ch:285, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_mirelles_counsel', lockMsg:'🔒 Finish the previous clue first',
   desc:'Many forms.',
   clues:['Rheon leaves House Veyne with renewed clarity. He has not decided on his future, but he now understands that serving Altan can take many forms.', 'Later, Mirelle finds herself thinking about their conversation long after he has gone: "It has been a long time since I enjoyed a young man\'s company so much. Why is his conversation still on my mind?"'], rw:{xp:191600, gold:40620}}
);
LOCATIONS.northern_road.spots.push(
  {id:'no_siege', kind:'investigate', n:'Evidence, Not a Siege', icon:'⚖️', ch:274, need:2, ambush:[], lo:82, delilahCase:true,
   desc:'Restraint.',
   clues:['Rheon: "We should surround this pass and seal the other routes. No one gets through." Jade: "We need evidence, not a siege, Rheon. If we move too openly, the suspects will be warned and destroy the evidence."', 'Devon: "Rheon, this is an investigation, not a battlefield. If they sense a military operation, they will disappear... and so will the truth we\'re looking for."'], rw:{xp:177200, gold:37740}},
  {id:'restricted_road', kind:'investigate', n:'The Restricted Road', icon:'🛑', ch:274, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_no_siege', lockMsg:'🔒 Finish the previous clue first',
   desc:'State your business.',
   clues:['As the party continues north, they encounter a group of armed men along the mountain road. "Halt! This road is restricted. State your business and turn back."', 'Rheon: "I\'ll handle this. Keep them from calling for backup. We can stop them without making it a bloodbath."'], rw:{xp:177500, gold:37800}},
  {id:'quiet_interception', kind:'investigate', n:'The Quiet Interception', icon:'🦅', ch:274, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_restricted_road', lockMsg:'🔒 Finish the previous clue first',
   desc:'No unnecessary casualties.',
   clues:['Rheon uses his military instincts to intercept the group efficiently, neutralizing the threat while Jade and Devon maintain control of the situation.', 'Devon: "Secure the area, but keep it quiet. No unnecessary casualties." Jade: "Check their supplies. Look for shipping records or messages."'], rw:{xp:177800, gold:37860}},
  {id:'regular_shipments', kind:'investigate', n:'Regular Shipments', icon:'📦', ch:274, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_quiet_interception', lockMsg:'🔒 Finish the previous clue first',
   desc:'Cautious, but not enough.',
   clues:['After the encounter, the party examines the men\'s cargo and notes signs of a larger operation: records suggesting regular shipments through this route.', 'Rheon: "I was too quick to think like a commander on a battlefield. An investigation requires restraint, observation, and patience... not just force."'], rw:{xp:178100, gold:37920}},
  {id:'four_names', kind:'investigate', n:'Four Names, One Road', icon:'🗺️', ch:275, need:2, ambush:[], lo:82, delilahCase:true,
   desc:'Hiding its true purpose.',
   clues:['The records: North Ridge Road (Former Military Route), Year 982; Pinewatch Road, Year 1007; Stonepine Route, Year 1023; Northern Supply Road (Restricted), Year 1041.', 'Jade: "Four different names for the same road. And on the latest official maps, this section doesn\'t appear at all." Devon: "It suggests someone wanted to hide its true purpose."'], rw:{xp:178400, gold:37980}},
  {id:'fresh_tracks', kind:'investigate', n:'Fresh Tracks', icon:'👣', ch:275, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_four_names', lockMsg:'🔒 Finish the previous clue first',
   desc:'Within the last few days.',
   clues:['Levi: "There are fresh wagon tracks here. Recent ones. The ruts are still sharp, and the soil hasn\'t settled. Someone passed this way within the last few days."', 'Levi: "Look at these cut branches. And drag marks to the side... They moved supplies off the main road."'], rw:{xp:178700, gold:38040}},
  {id:'road_still_used', kind:'investigate', n:'Still in Use', icon:'🛤️', ch:275, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_fresh_tracks', lockMsg:'🔒 Finish the previous clue first',
   desc:'Just not officially.',
   clues:['Jade: "So the road is still in use. Just not officially. Someone doesn\'t want it found." Devon: "Which means the abandoned station may not be abandoned after all. We should assume it\'s still active."', 'Rheon: "This is a good lesson in field investigation. Roads can be hidden, but people always leave signs if you know what to look for."'], rw:{xp:179000, gold:38100}},
  {id:'hidden_path', kind:'investigate', n:'The Hidden Path', icon:'🌲', ch:275, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_road_still_used', lockMsg:'🔒 Finish the previous clue first',
   desc:'Deliberately hidden.',
   clues:['Levi spots a hidden path branching off the main road, partially concealed by fallen trees and thick undergrowth. Levi: "This path was deliberately hidden. It leads toward the station. Someone still uses it."', 'Following the hidden path, the party catches sight of a large outpost nestled beneath the pines: smoke from chimneys, guards on the walls, supplies in the yard.'], rw:{xp:179300, gold:38160}}
);
LOCATIONS.northwatch_station.spots.push(
  {id:'station_overview', kind:'investigate', n:'The Hidden Station', icon:'🏚️', ch:276, need:2, ambush:[], lo:82, delilahCase:true,
   desc:'Well hidden, still in use.',
   clues:['Jade: "So this is the station. No wonder it was well hidden. It\'s still in use. There are recent tracks, and these crates aren\'t old. Someone has been moving supplies here regularly."', 'Devon: "Look at these marks. This isn\'t a small operation. Food, weapons... and documents. This station is part of a larger network."'], rw:{xp:179600, gold:38220}},
  {id:'sealed_crates', kind:'investigate', n:'Ledgers and Sealed Crates', icon:'📦', ch:276, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_station_overview', lockMsg:'🔒 Finish the previous clue first',
   desc:'Hiding something.',
   clues:['Devon: "These ledgers and sealed crates... Someone is hiding something here."', 'Masked guards surround them: "You\'ve gone far enough. This station is under our protection. Hand over your weapons and leave, or you\'ll regret it." Devon: "We\'re not leaving. Stand down." Rheon: "Then we\'ll make you."'], rw:{xp:179900, gold:38280}},
  {id:'captains_post', kind:'investigate', n:'The Captain\'s Post', icon:'⚔️', ch:276, need:1, ambush:[], lo:82, delilahCase:true, needFlag:'inv_sealed_crates', lockMsg:'🔒 Finish the previous clue first',
   desc:'At any cost.',
   clues:['The Northern Station Captain, a mercenary leader who defends the station and its contents at any cost: "You shouldn\'t have come here. These supplies and records belong to powerful people. You will not take them!"'], rw:{xp:180200, gold:38340}},
  {id:'veyne_land_grants', kind:'investigate', n:'The Land Grants', icon:'📜', ch:276, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_captains_post', lockMsg:'🔒 Finish the previous clue first',
   desc:'Veyne\'s private accounts.',
   clues:['Jade: "These documents... They\'re land grants. They match the disputed Veyne territories. This proves the supplies here were funded through House Veyne\'s private accounts."', 'The recovered records include shipping logs, supply lists, and land grant documents tied to House Veyne, confirming a coordinated effort to expand their influence in the north.'], rw:{xp:180500, gold:38400}},
  {id:'altered_ownership', kind:'investigate', n:'Altered Ownership', icon:'📜', ch:277, need:2, ambush:[], lo:82, delilahCase:true,
   desc:'Distant relatives.',
   clues:['Jade: "These are the northern military land grants... but the ownership records were altered. Multiple properties were transferred to distant relatives within a short period of time. Mirelle discovered this and requested an independent audit."', 'Transfer of Military Properties: Pine Ridge Estate (Forestry and Farmland); Northreach Hollow (Supply Depot); Eastern Farmlands (Military Provisions Land); Stoneveil Forest Permit (Timber and Mineral Rights).'], rw:{xp:180800, gold:38460}},
  {id:'audit_request', kind:'investigate', n:'The Independent Audit Request', icon:'📨', ch:277, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_altered_ownership', lockMsg:'🔒 Finish the previous clue first',
   desc:'To the Royal Oversight Office.',
   clues:['Independent Audit Request. To: Royal Oversight Office. From: Mirelle Veyne. "I hereby request an independent audit regarding the recent transfer of northern military properties, as there are inconsistencies in the inheritance claims and supporting records."', 'Jade: "Her notes end here. Shortly after this request, she disappeared. This was not an accident."'], rw:{xp:181100, gold:38520}},
  {id:'noble_beneficiaries', kind:'investigate', n:'The Beneficiaries', icon:'👥', ch:277, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_audit_request', lockMsg:'🔒 Finish the previous clue first',
   desc:'Not commoners.',
   clues:['Devon: "The beneficiaries are not commoners. These names connect to families within Dragonvale\'s nobility." Rheon: "The same families appear across multiple transfers. This was planned and coordinated."', 'Rheon: "If they were willing to silence her, there are likely others involved."'], rw:{xp:181400, gold:38580}},
  {id:'a_larger_conspiracy', kind:'investigate', n:'A Larger Conspiracy', icon:'🕸️', ch:277, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_noble_beneficiaries', lockMsg:'🔒 Finish the previous clue first',
   desc:'Follow the money.',
   clues:['Jade: "For now, we update our suspect dossiers and return to Dragonvale with these records. This is no longer just about a missing person. It is a larger conspiracy."', 'Jade: "We need to find out who gains the most from these transfers. Follow the property trail, the money, and the nobility connected to them."'], rw:{xp:181700, gold:38640}}
);
LOCATIONS.dragon_court.spots.push(
  {id:'listed_witness', kind:'investigate', n:'The Listed Witness', icon:'🧑‍⚖️', ch:278, need:1, ambush:[], lo:82, delilahCase:true,
   desc:'He never saw her die.',
   clues:['Jade: "You were listed as a witness to Mirelle\'s death, correct? You saw it yourself and signed this?" The witness: "I... I wasn\'t in Dragonvale when the death occurred! I was in Eastreach on other business. I never saw her die."'], rw:{xp:182000, gold:38700}},
  {id:'forged_signature', kind:'investigate', n:'The Forged Signature', icon:'✍️', ch:278, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_listed_witness', lockMsg:'🔒 Finish the previous clue first',
   desc:'Not his handwriting.',
   clues:['Jade: "Then how did your name and signature end up on this report? This handwriting doesn\'t match your other signed records."', 'The Death Report (Submitted to Court) carries a forged signature, A. Mardon; the Trade Permit (Eastreach) carries the verified one.'], rw:{xp:182300, gold:38760}},
  {id:'transported_north', kind:'investigate', n:'Transported North', icon:'🚚', ch:278, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_forged_signature', lockMsg:'🔒 Finish the previous clue first',
   desc:'Under heavy guard.',
   clues:['The witness: "They gave me a document to sign, said it was standard procedure. Mirelle was not killed at Eastreach. She was transported north under heavy guard. I was told to keep quiet and say that I had witnessed her death at Eastreach instead."', 'Devon: "So the death report was a fabrication... Mirelle is still alive."'], rw:{xp:182600, gold:38820}},
  {id:'convoy_records', kind:'investigate', n:'The Convoy Records', icon:'📋', ch:278, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_transported_north', lockMsg:'🔒 Finish the previous clue first',
   desc:'Crestfall Hold.',
   clues:['Northern Convoy Records: From Dragonvale (Royal Escort) to Crestfall Hold (North). Escort: North Guard (12). Passengers: 1 (High-Security). Notes: Sealed Orders (Do Not Disclose). It departed three days after the false report.', 'Jade: "This confirms it. Mirelle was taken north, not killed. We move to Crestfall Hold and bring her back."'], rw:{xp:182900, gold:38880}},
  {id:'relic_discovered', kind:'investigate', n:'The Ancient Relic', icon:'🪞', ch:281, need:2, ambush:[], lo:82, delilahCase:true,
   desc:'The Mirror of Returning Years.',
   clues:['Mirelle: "They discovered an ancient relic beneath one of the disputed military properties. The Mirror of Returning Years. They believed it could restore youth."', 'The conspirators attempted to activate it, hoping to find a way to reverse aging.'], rw:{xp:185600, gold:39420}},
  {id:'mirelles_transformation', kind:'investigate', n:'The Transformation', icon:'✨', ch:281, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_relic_discovered', lockMsg:'🔒 Finish the previous clue first',
   desc:'Her twenties.',
   clues:['Mirelle: "I was exposed to its power against my will. The result... as you can see. My appearance has reverted to my twenties. My memories, knowledge and personality remain the same."', 'Mirelle: "Wisdom does not disappear simply because the face is younger." Jade: "Do you know if the transformation is permanent?" Mirelle: "I do not know. The relic\'s power is unstable."'], rw:{xp:185900, gold:39480}},
  {id:'network_of_officials', kind:'investigate', n:'The Network', icon:'🕸️', ch:281, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_mirelles_transformation', lockMsg:'🔒 Finish the previous clue first',
   desc:'Not a single house.',
   clues:['Several officials have been using outdated military privileges to acquire land and resources illegally. They wanted the relic, not just for power, but to reverse their own aging.', '"This is not the work of a single noble house. There are multiple names in these records. High-ranking officials, military commanders, and their related estates."'], rw:{xp:186200, gold:39540}},
  {id:'burn_everything', kind:'investigate', n:'Burn Everything', icon:'🔥', ch:281, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_network_of_officials', lockMsg:'🔒 Finish the previous clue first',
   desc:'Before it\'s destroyed.',
   clues:['One of the conspirators attempts to destroy the remaining records: "Burn everything! No one must be able to trace this back to us!" The party pursues him before he can destroy the documents.', 'They recover the documents, including the records related to the Mirror of Returning Years. "At least the truth is no longer buried in silence."'], rw:{xp:186500, gold:39600}},
  {id:'mirelle_testifies', kind:'investigate', n:'Mirelle Testifies', icon:'⚖️', ch:282, need:2, ambush:[], lo:82, delilahCase:true,
   desc:'She looks far too young.',
   clues:['Lady Mirelle Veyne appears to testify, her youthful appearance astonishing the assembled nobles: "That cannot be Lady Mirelle... She looks far too young! Is this some impostor?"', 'Mirelle: "I am indeed Mirelle Veyne, though my appearance has changed. My identity, memory, and knowledge remain the same."'], rw:{xp:186800, gold:39660}},
  {id:'proof_of_identity', kind:'investigate', n:'Proof of Identity', icon:'🪪', ch:282, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_mirelle_testifies', lockMsg:'🔒 Finish the previous clue first',
   desc:'Prove it.',
   clues:['A grey-haired noble: "Prove it. Many could claim the title of Lady Veyne." Devon: "I will confirm Lady Mirelle\'s identity. We have her household records, personal correspondence, and testimony from long-serving retainers."', 'Mirelle: "There are also matters only the true Mirelle Veyne would know: the location of a private garden, the contents of a letter I wrote to my late mother, and the name of a childhood guardian who is no longer alive. I will answer any question."'], rw:{xp:187100, gold:39720}},
  {id:'the_evidence', kind:'investigate', n:'The Evidence Presented', icon:'📜', ch:282, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_proof_of_identity', lockMsg:'🔒 Finish the previous clue first',
   desc:'Not vengeance, law.',
   clues:['Jade presents the evidence linking the conspirators to fraudulent land transfers, Mirelle\'s abduction, and the unlawful use of the Mirror of Returning Years: financial records, witness testimony, and the recovered relic itself.', 'Devon: "Enough. Let the law handle this. We do not seek personal vengeance. These crimes will be judged by Dragonvale\'s authorities, in accordance with the realm\'s laws."'], rw:{xp:187400, gold:39780}},
  {id:'champion_stand', kind:'investigate', n:'The Champion\'s Stand', icon:'⚔️', ch:282, need:1, ambush:[], lo:82, delilahCase:true, needFlag:'inv_the_evidence', lockMsg:'🔒 Finish the previous clue first',
   desc:'Captured alive.',
   clues:['The conspirators\' champion attempts a final stand, but is defeated by the party and captured alive.'], rw:{xp:187700, gold:39840}},
  {id:'judgment_rendered', kind:'investigate', n:'Judgment', icon:'🔨', ch:282, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_champion_stand', lockMsg:'🔒 Finish the previous clue first',
   desc:'Name and lands restored.',
   clues:['The mastermind and his accomplices are formally arrested and placed in royal custody to await trial. The Mirror of Returning Years is placed under royal protection for further investigation.', 'Mirelle: "Today, my name, my lands, and my standing have been restored." Jade: "This case is complete, but the mystery of the Mirror of Returning Years is not fully solved."'], rw:{xp:188000, gold:39900}}
);
LOCATIONS.northern_valley.spots.push(
  {id:'remote_valley', kind:'investigate', n:'The Remote Valley', icon:'🏔️', ch:279, need:1, ambush:[], lo:82, delilahCase:true,
   desc:'Out of sight.',
   clues:['Jade: "The valley is more remote than we expected. The route was clearly chosen to keep this place out of sight. There are guards, watchtowers, and supply movements. This isn\'t a temporary camp."'], rw:{xp:183200, gold:38940}},
  {id:'ridge_approach', kind:'investigate', n:'Approach from the Ridge', icon:'🧭', ch:279, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_remote_valley', lockMsg:'🔒 Finish the previous clue first',
   desc:'Rheon takes point.',
   clues:['Rheon: "We should approach from the ridge to the north. The direct route is heavily watched. We\'ll use the tree line and the ravine to keep out of sight. I\'ll take point and coordinate our movements."', 'Devon: "Rheon\'s knowledge of the terrain is invaluable. Let\'s move carefully. If Mirelle is here, we can\'t risk alerting them yet."'], rw:{xp:183500, gold:39000}},
  {id:'medicinal_supplies', kind:'investigate', n:'The Medicinal Supplies', icon:'🩹', ch:279, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_ridge_approach', lockMsg:'🔒 Finish the previous clue first',
   desc:'A prisoner.',
   clues:['Sky: "These bandages are recent. High-quality medicinal supplies. There are herbal salves, pain medication, and clean bandages. These are for long-term use."', 'Sky: "The type of herbs match the treatment for injuries and prolonged confinement. They are trying to maintain her condition. She hasn\'t been abandoned. She\'s a prisoner."'], rw:{xp:183800, gold:39060}},
  {id:'detention_site', kind:'investigate', n:'The Detention Site', icon:'🏰', ch:279, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_medicinal_supplies', lockMsg:'🔒 Finish the previous clue first',
   desc:'At the base of the cliffs.',
   clues:['Levi: "There are recent footprints leading beyond this path. Multiple people, and someone being escorted. This trail leads toward the cliff base."', 'Following the signs, the party reaches a concealed detention site at the base of the northern cliffs. Mirelle is somewhere inside.'], rw:{xp:184100, gold:39120}},
  {id:'fight_the_guards', kind:'investigate', n:'Through the Guards', icon:'⚔️', ch:280, need:1, ambush:[], lo:82, delilahCase:true,
   desc:'The inner compound.',
   clues:['The party fights through the guards and forces their way into the inner compound of the hidden fortress, used to hold those who threatened the land scheme.'], rw:{xp:184400, gold:39180}},
  {id:'mirelle_found', kind:'investigate', n:'Mirelle Found', icon:'👩', ch:280, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_fight_the_guards', lockMsg:'🔒 Finish the previous clue first',
   desc:'Alive, weakened.',
   clues:['At last, they find Mirelle in a secure inner chamber, still alive, but weakened from captivity. Devon: "...Mirelle?! You... you look the same as before. You\'re young again...!"', 'Mirelle: "Your Highness. I had hoped you would eventually notice my absence." Devon: "You might have sent a letter." Mirelle: "I shall remember that suggestion the next time I am abducted."'], rw:{xp:184700, gold:39240}},
  {id:'she_refused', kind:'investigate', n:'She Refused', icon:'🛡️', ch:280, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_mirelle_found', lockMsg:'🔒 Finish the previous clue first',
   desc:'Rather than betray the truth.',
   clues:['Mirelle: "I refused to approve the fraudulent land transfers. So they kept me alive to obtain the information they still needed: records, correspondence, and my knowledge of the property holdings."', 'Mirelle: "I would rather endure this prison than betray my family, the people of Dragonvale, or the truth." Devon: "...You truly refused to yield." Mirelle: "Survival is also a kind of resistance, Your Highness."'], rw:{xp:185000, gold:39300}},
  {id:'escape', kind:'investigate', n:'The Escape', icon:'🏃', ch:280, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_she_refused', lockMsg:'🔒 Finish the previous clue first',
   desc:'Keep Mirelle behind us.',
   clues:['Their departure is discovered, and the guards move to stop them. Devon: "Keep Mirelle behind us!" Jade: "We\'ll get you out of here. Stay close!"', 'Mirelle: "Thank you. I am in your debt. There is still much to uncover, but for now... I am simply glad to be free."'], rw:{xp:185300, gold:39360}}
);
LOCATIONS.dragon_vale.spots.push(
  {id:'veyne_returns_to_duty', kind:'investigate', n:'Back to Its Duties', icon:'🏛️', ch:286, need:2, ambush:[], lo:82, delilahCase:true,
   desc:'Much still to do.',
   clues:['With Mirelle rescued and the conspiracy exposed, Jade prepares to resume her wider investigations. Mirelle returns to managing House Veyne while scholars continue studying the mysterious Mirror of Returning Years.', 'Mirelle: "House Veyne returns to its duties. And there is still much to do."'], rw:{xp:191900, gold:40680}},
  {id:'delilah_competence', kind:'investigate', n:'Competence Over Reputation', icon:'🎓', ch:286, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_veyne_returns_to_duty', lockMsg:'🔒 Finish the previous clue first',
   desc:'Determined.',
   clues:['Mirelle: "Your analysis is well-structured, Delilah. Competence will take you further than reputation ever will." Delilah: "Yes, Lady Mirelle. I still have much to learn, but I am determined."', 'Roc recognises that Delilah is developing abilities and ambitions independent of her position as his consort: "She has become so capable..."'], rw:{xp:192200, gold:40740}},
  {id:'rheons_farewell', kind:'investigate', n:'A Book Worthy of Her Standards', icon:'📚', ch:286, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_delilah_competence', lockMsg:'🔒 Finish the previous clue first',
   desc:'Travel safely.',
   clues:['Rheon: "Your conversations have been one of the highlights of my time in Dragonvale." Mirelle: "Bring me something interesting from your travels. A good book would be preferable to another ceremonial gift."', 'Rheon: "Then it shall be a book worthy of your high standards." Mirelle: "Travel safely, Prince Rheon. No promises."'], rw:{xp:192500, gold:40800}},
  {id:'unexpected_possibility', kind:'investigate', n:'An Unexpected Possibility', icon:'💭', ch:286, need:2, ambush:[], lo:82, delilahCase:true, needFlag:'inv_rheons_farewell', lockMsg:'🔒 Finish the previous clue first',
   desc:'Perhaps a chance.',
   clues:['Rheon departs with Jade\'s party, completely unaware that Mirelle has begun looking forward to seeing him again. Later Mirelle: "His humour, sincerity, and willingness to treat me as an equal have made me reconsider something I dismissed long ago."', 'Mirelle: "What a troublesome young man. Perhaps... I should give him a chance." The road beyond Dragonvale leads to new mysteries, new places... and perhaps, unexpected possibilities.'], rw:{xp:192800, gold:40860}}
);
MISSIONS.push(
  {id:'m_s273', needCh:273, title:'The Locked Study', obj:{type:'steps', steps:[
     {label:'The Sealed Study', spot:'sealed_study'},
     {label:'Opening the Lock', spot:'lock_opened'},
     {label:'Incomplete Correspondence', spot:'land_grant_letters'},
     {label:'The Missing Ledger Page', spot:'torn_ledger_page'}]}, rw:{xp:630000, gold:131000, rep:1460},
   subj:'The Locked Study', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s274', needCh:274, title:'The Prince and the Ranger', obj:{type:'steps', steps:[
     {label:'Evidence, Not a Siege', spot:'no_siege'},
     {label:'The Restricted Road', spot:'restricted_road'},
     {label:'The Quiet Interception', spot:'quiet_interception'},
     {label:'Regular Shipments', spot:'regular_shipments'}]}, rw:{xp:632500, gold:131600, rep:1463},
   subj:'The Prince and the Ranger', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s275', needCh:275, title:'The Road That Changed Names', obj:{type:'steps', steps:[
     {label:'Four Names, One Road', spot:'four_names'},
     {label:'Fresh Tracks', spot:'fresh_tracks'},
     {label:'Still in Use', spot:'road_still_used'},
     {label:'The Hidden Path', spot:'hidden_path'}]}, rw:{xp:635000, gold:132200, rep:1466},
   subj:'The Road That Changed Names', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s276', needCh:276, title:'The Station Beneath the Pines', obj:{type:'steps', steps:[
     {label:'The Hidden Station', spot:'station_overview'},
     {label:'Ledgers and Sealed Crates', spot:'sealed_crates'},
     {label:'The Captain\'s Post', spot:'captains_post'},
     {label:'The Land Grants', spot:'veyne_land_grants'},
     {label:'Defeat the Northern Station Captain', boss:'boss_station_captain'}]}, rw:{xp:637500, gold:132800, rep:1469},
   subj:'The Station Beneath the Pines', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s277', needCh:277, title:'The Name Beneath the Seal', obj:{type:'steps', steps:[
     {label:'Altered Ownership', spot:'altered_ownership'},
     {label:'The Independent Audit Request', spot:'audit_request'},
     {label:'The Beneficiaries', spot:'noble_beneficiaries'},
     {label:'A Larger Conspiracy', spot:'a_larger_conspiracy'}]}, rw:{xp:640000, gold:133400, rep:1472},
   subj:'The Name Beneath the Seal', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s278', needCh:278, title:'A Witness Who Should Be Dead', obj:{type:'steps', steps:[
     {label:'The Listed Witness', spot:'listed_witness'},
     {label:'The Forged Signature', spot:'forged_signature'},
     {label:'Transported North', spot:'transported_north'},
     {label:'The Convoy Records', spot:'convoy_records'}]}, rw:{xp:642500, gold:134000, rep:1475},
   subj:'A Witness Who Should Be Dead', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s279', needCh:279, title:'Beyond the Northern Gate', obj:{type:'steps', steps:[
     {label:'The Remote Valley', spot:'remote_valley'},
     {label:'Approach from the Ridge', spot:'ridge_approach'},
     {label:'The Medicinal Supplies', spot:'medicinal_supplies'},
     {label:'The Detention Site', spot:'detention_site'}]}, rw:{xp:645000, gold:134600, rep:1478},
   subj:'Beyond the Northern Gate', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s280', needCh:280, title:'The Lady Who Refused to Die', obj:{type:'steps', steps:[
     {label:'Through the Guards', spot:'fight_the_guards'},
     {label:'Mirelle Found', spot:'mirelle_found'},
     {label:'She Refused', spot:'she_refused'},
     {label:'The Escape', spot:'escape'},
     {label:'Escort Mirelle to safety', boss:'boss_prison_breakout'}]}, rw:{xp:647500, gold:135200, rep:1481},
   subj:'The Lady Who Refused to Die', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s281', needCh:281, title:'The Price of Silence', obj:{type:'steps', steps:[
     {label:'The Ancient Relic', spot:'relic_discovered'},
     {label:'The Transformation', spot:'mirelles_transformation'},
     {label:'The Network', spot:'network_of_officials'},
     {label:'Burn Everything', spot:'burn_everything'}]}, rw:{xp:650000, gold:135800, rep:1484},
   subj:'The Price of Silence', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s282', needCh:282, title:'Judgment at Dragonvale', obj:{type:'steps', steps:[
     {label:'Mirelle Testifies', spot:'mirelle_testifies'},
     {label:'Proof of Identity', spot:'proof_of_identity'},
     {label:'The Evidence Presented', spot:'the_evidence'},
     {label:'The Champion\'s Stand', spot:'champion_stand'},
     {label:'Judgment', spot:'judgment_rendered'},
     {label:'Defeat the Veyne Conspirator\'s Champion', boss:'boss_veyne_champion'}]}, rw:{xp:652500, gold:136400, rep:1487},
   subj:'Judgment at Dragonvale', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s283', needCh:283, title:'The Lady Returns', obj:{type:'steps', steps:[
     {label:'The Household Astonished', spot:'household_astonished'},
     {label:'Devon\'s Fear', spot:'devons_fear'},
     {label:'A Society That Judges', spot:'appearance_judges'},
     {label:'House Veyne Restored', spot:'veyne_restored'}]}, rw:{xp:655000, gold:137000, rep:1490},
   subj:'The Lady Returns', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s284', needCh:284, title:'A Different Kind of Noblewoman', obj:{type:'steps', steps:[
     {label:'Delilah Returns', spot:'delilah_returns'},
     {label:'The Supply Records', spot:'supply_records_lesson'},
     {label:'The First Formal Milestone', spot:'first_milestone'},
     {label:'Capable, Not Admired', spot:'competence_not_admiration'}]}, rw:{xp:657500, gold:137600, rep:1493},
   subj:'A Different Kind of Noblewoman', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s285', needCh:285, title:'Princes Without Thrones', obj:{type:'steps', steps:[
     {label:'Rheon\'s Reflection', spot:'rheons_reflection'},
     {label:'A Rare Visit', spot:'rheon_in_the_garden'},
     {label:'Mirelle\'s Counsel', spot:'mirelles_counsel'},
     {label:'Renewed Clarity', spot:'renewed_clarity'}]}, rw:{xp:660000, gold:138200, rep:1496},
   subj:'Princes Without Thrones', body:'Dragonvale needs this answered. — Greyson'},
  {id:'m_s286', needCh:286, title:'The Road Beyond Dragonvale', obj:{type:'steps', steps:[
     {label:'Back to Its Duties', spot:'veyne_returns_to_duty'},
     {label:'Competence Over Reputation', spot:'delilah_competence'},
     {label:'A Book Worthy of Her Standards', spot:'rheons_farewell'},
     {label:'An Unexpected Possibility', spot:'unexpected_possibility'}]}, rw:{xp:662500, gold:138800, rep:1499},
   subj:'The Road Beyond Dragonvale', body:'Dragonvale needs this answered. — Greyson'}
);

/* ---- Rheon's Arc XI abilities (author: Falcon Interception from ch274, Royal Guard Formation from ch285; White Warfire is future) ---- */
CHARACTERS.rheon.skills.push(
  {id:'falcon_interception',n:'Falcon Interception',icon:'🦅',mp:9,kind:'support',tgt:'self',fx:[{k:'cover',d:2},{k:'buff',stat:'atk',m:1.15,d:2,self:true}],req:{flag:'falcon_interception'},desc:'The Falcon cuts in: he takes the next blow meant for a vulnerable ally and hits harder for two turns (learned on the northern road, chapter 274).'},
  {id:'royal_guard_formation',n:'Royal Guard Formation',icon:'🏯',mp:13,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'def',m:1.25,d:3},{k:'shield',v:.1,d:3}],req:{flag:'royal_guard_formation'},desc:'A drilled formation: the party\'s defence rises and each takes a small barrier (learned in chapter 285).'});
/* ---- Mirelle, recurring advisory NPC (from ch283): one piece of counsel every 3 in-game days: XP, a little court reputation, and a hint. State G.mirAdv = {last, n}. First-pass wording. ---- */
const MIRELLE_COUNSEL = [
  'Mirelle: "A prince listens first and speaks second. A guard does it in the other order, and regrets it."',
  'Mirelle: "A ledger tells you what happened. The gaps tell you why."',
  'Mirelle: "Never accept a petition that arrived faster than the truth could have."',
  'Mirelle: "Titles open doors, but competence keeps you in the room."',
  'Mirelle: "When someone is eager to close a matter, ask who is hurt by leaving it open."',
];
const mirAdv = () => { if(!G.mirAdv) G.mirAdv = {last:-99, n:0}; return G.mirAdv; };
const mirAdvOpen = () => !!G && !!G.flags && !!G.flags.mirelle_advisor;
const mirAdvReady = () => G.day - mirAdv().last >= 3;
function mirelleCounsel(){
  if(!mirAdvOpen() || !mirAdvReady()) return [];
  const M = mirAdv(); M.last = G.day; const line = MIRELLE_COUNSEL[M.n % MIRELLE_COUNSEL.length]; M.n++;
  const msgs = ['🏛️ '+line]; gainXp(70 + avgPartyLv()*6, G.party).forEach(m => msgs.push(m));
  if(typeof repAdd==='function') repAdd('court', 1).forEach(m => msgs.push(m));
  save(); return msgs.concat(advanceDay(1));
}
/* ---- Delilah's Administrative Training (Stage II from ch284, Mirelle Mentorship): once every 4 days, a lesson at House Veyne that pays a little gold (a supply recommendation) and XP. She is a student, not an adviser. State G.delTrain = {last, n}. ---- */
const delTrain = () => { if(!G.delTrain) G.delTrain = {last:-99, n:0}; return G.delTrain; };
const delTrainOpen = () => !!G && !!G.flags && !!G.flags.delilah_studies_2;
const delTrainReady = () => G.day - delTrain().last >= 4;
function delilahTrain(){
  if(!delTrainOpen() || !delTrainReady()) return [];
  const D = delTrain(); D.last = G.day; D.n++;
  const g = 60 + D.n*10; G.gold += g;
  const msgs = ['📚 Delilah drafts a supply recommendation under Mirelle\'s guidance: +'+g+' gold saved.']; gainXp(50 + avgPartyLv()*5, G.party).forEach(m => msgs.push(m));
  if(D.n === 5) chronicle('Delilah has completed five lessons in administrative training under Lady Mirelle.', '📚');
  save(); return msgs.concat(advanceDay(1));
}
deed('delilah_lessons', 'bonds', 'The diligent student', '📚', 'Delilah completed five administrative lessons.', () => (G.delTrain && G.delTrain.n >= 5));
deed('veyne_case', 'story', 'The Veyne Conspiracy', '⚖️', 'The Veyne conspiracy was judged lawfully.', () => !!G.flags.veyne_judged);
LORE.push(
  {ch:273, n:'The Locked Study', t:'Lady Mirelle\'s study was sealed with a new lock after her disappearance; a page of her ledger was torn out.'},
  {ch:274, n:'Falcon Interception', t:'Rheon\'s first lesson in investigation: restraint over force. He learns to intercept without a bloodbath.'},
  {ch:275, n:'The Road That Changed Names', t:'North Ridge Road (982), Pinewatch Road (1007), Stonepine Route (1023), Northern Supply Road, restricted (1041): one road, erased from the latest maps.'},
  {ch:276, n:'Northwatch Station', t:'A hidden station beneath the pines used to store supplies and move goods beyond official oversight, guarded by mercenaries.'},
  {ch:277, n:'The Fraudulent Transfers', t:'Military properties moved to distant relatives through altered inheritance claims. Mirelle asked the Royal Oversight Office for an independent audit and vanished.'},
  {ch:279, n:'Crestfall Hold', t:'A concealed fortress at the base of the northern cliffs in a remote valley, used to hold those who threatened the land scheme.'},
  {ch:281, n:'The Mirror of Returning Years', t:'An unstable ancient relic found beneath a disputed military property. The conspirators hoped it could reverse aging; Mirelle was exposed to it and reverted to her twenties, with her memories and personality intact.'},
  {ch:282, n:'The Veyne Conspiracy', t:'Judged by Dragonvale\'s authorities. The Mirror of Returning Years is under royal protection.'},
  {ch:283, n:'Lady Mirelle Veyne', t:'Restored to her name, lands and standing. She looks young, and advises those who seek her counsel.'},
  {ch:286, n:'Arc XI: The Vanishing of Lady Veyne', t:'Mirelle rescued, the conspiracy exposed, Delilah studying, Rheon still travelling with Jade\'s party. Next: Arc XII, New Horizons.'}
);

/* Revised Arc XI briefs (author): the Mirror of Returning Years sits in the Ancient Relics journal (archive records 'mirror' and 'mirelle_change'); Mirelle's transformation is an unresolved supernatural phenomenon, not reversed; the Mirror does not resolve any entry of the Fifteen Register (the Register count is untouched). */
LORE.push({ch:286, n:'An Unresolved Phenomenon', t:'Mirelle remains physically young. The effects of the Mirror of Returning Years are not understood, its origins and long-term effects are unknown, and Jade wonders whether it is tied to the ancient magical practices she has met before. The Register is unchanged by it.'});
