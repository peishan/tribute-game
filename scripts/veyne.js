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
  {cat:'Locations', n:'The northern territories', t:'Where she was last said to have travelled. Not yet investigated.', spot:null},
  {cat:'Contradictions', n:'Six days from incident to filing', t:'Such petitions usually take weeks or months.', spot:'petition_haste'},
  {cat:'Contradictions', n:'Two key witnesses are unavailable', t:'Sir Marcel Braithe (overseas) and Lady Orienne Vale (not seen in Dragonvale).', spot:'missing_witnesses'},
  {cat:'Contradictions', n:'A distant relative gains control quickly', t:'Lord Cassian Veyne, of the western provinces, with little recent involvement.', spot:'cassians_control'},
  {cat:'Contradictions', n:'A body "recovered" without evidence', t:'No detailed account, no physical evidence reports.', spot:'body_unproven'},
  {cat:'Conclusions', n:'Someone is trying to have Mirelle declared dead', t:'Convenient, and too convenient.', spot:'last_reliably_seen'},
  {cat:'Conclusions', n:'Mirelle\'s death has not been established', t:'The petition is set aside pending a full investigation.', spot:'body_unproven'},
];
const caseOpen = () => !!G && G.ch >= 266;
const caseFound = it => !!it.spot && !!G.flags['inv_'+it.spot];
const DELILAH_STAGES = [['Student','Studying military law and administration (from chapter 268).',268],['Apprentice','Assists with document investigations (a later chapter).',999],['Administrator','Supply and travel bonuses (a later chapter).',999]];
function rCase(){
  const cats = ['Witnesses','Documents','Locations','Contradictions','Conclusions'];
  const have = CASE_ITEMS.filter(caseFound).length;
  let h = `<div class="panel"><b>🗂️ THE VANISHING OF LADY VEYNE</b><div class="sm">${have} / ${CASE_ITEMS.length} entries on the board. Witnesses lead to documents, documents to places, and the contradictions between them to conclusions.</div></div>`;
  h += cats.map(c => `<h4>${({Witnesses:'🗣️',Documents:'📜',Locations:'📍',Contradictions:'⚡',Conclusions:'⚖️'})[c]} ${c}</h4>` + CASE_ITEMS.filter(i => i.cat===c).map(i => caseFound(i) ? `<div class="li">✅ <b>${i.n}</b><div class="sm">${i.t}</div></div>` : `<div class="li">❔ ???</div>`).join('')).join('');
  if(G.ch >= 268){
    const st = G.flags.delilah_reconciliation_1 ? 'Reconciliation: Stage I' : 'Student';
    h += `<h4>📚 Delilah's Administrative Studies</h4><div class="li"><b>${st}</b><div class="sm">${DELILAH_STAGES[0][1]} Her studies continue; she is a student, not yet an adviser.${G.flags.delilah_reconciliation_1?' Jade has accepted her apology; trust will take time.':''}</div></div>`;
  }
  return h;
}
