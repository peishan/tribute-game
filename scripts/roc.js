/* =====================================================================
   TRIBUTE — ROC CHADSTONE, MARITIME ENVOY OF DRAGONVALE (and Liora's family)
   After his exile Roc is Prince of Dragonvale by birth, Maritime Envoy of Dragonvale and an ally of Tribute: a Reformed Prince, an official rather than a royal.
   He fights beside the party as a passive guest (no party slot) from ch170, whenever it is on Dragonvale ground or at sea (see GUEST_RULES.chad in core.js).
   He is never "recruited": the game says "Allied Envoy arrived: Roc Chadstone".
   - MARITIME INTEL: from ch170 Roc's contacts add a little to maritime contracts (harbour, smuggler, raider and serpent quests) and the Dragonvale board posts
     his own Envoy contracts (clear a sea lane, quiet a harbour).
   - HIDDEN RESPONSIBILITY (no meter shown): seven story states, set by chapters, letters and his Envoy contracts: faces_past (ch178), serves (three Envoy contracts),
     father (Liora's letters), partner (Delilah's second pregnancy), shares (Liora's lessons shared with Jenika), respects (ch180), protects (ch185).
     With five or more true, the optional scene "Things Left Unsaid" opens in Dragonvale: Roc tells Jade he once loved her without asking anything of her, Jade
     says she loved him too, and they leave it there. No romance choice, no jealousy, no points. Afterward: Past Accepted (flag roc_past_accepted), and his letters
     look forward to Delilah, the girls, Jenika and Dragonvale.
   - LIORA'S MILESTONES: letters after ch170 (she meets her parents, Delilah is expecting a second daughter, her lessons with Papa and Jenika, the baby's birth).
   State: G.flags.rocduty_*, G.flags.roc_past_accepted, G.roc = {envoy:n}.  First-pass wording and timing: edit freely.
   ===================================================================== */
const ROC_DUTY = ['faces_past','serves','father','partner','shares','respects','protects'];
const rocDutyCount = () => ROC_DUTY.filter(k => G.flags['rocduty_'+k]).length;
const ROC_SEA_QUESTS = ['q_dockhands','q_smugglers','q_raiders','q_serpent'];
const rocData = () => { if(!G.roc) G.roc = {envoy:0}; return G.roc; };
const rocAvailable = () => !!G && G.ch >= 170 && !isDisabled('chad');
function rocIntel(q, msgs){
  if(q.envoy){ const R = rocData(); R.envoy++; if(R.envoy >= 3 && !G.flags.rocduty_serves){ G.flags.rocduty_serves = true; } }
  if(!rocAvailable() || !(q.envoy || ROC_SEA_QUESTS.includes(q.id) || ['sea_raider','smuggler','dock_thug','dock_pickpocket','river_serpent'].includes(q.key)) || !q.rw) return;
  const rw = {xp:Math.round((q.rw.xp||0)*.15), gold:Math.round((q.rw.gold||0)*.15)}; if(!rw.xp && !rw.gold) return;
  grantReward(rw, '').forEach(m => msgs.push(m.replace(/^ · /,'')));
  msgs.push('🧭 Roc\'s contacts add to the pay: a tip about the sea lanes.');
}
function rocSync(){
  if(!G || !G.flags || G.ch < 170) return;
  if(!G.flags.roc_envoy_met && typeof presentGuests==='function' && presentGuests().includes('chad')){ G.flags.roc_envoy_met = true; chronicle('Allied Envoy arrived: Roc Chadstone, Maritime Envoy of Dragonvale.', '🧭'); toast('🧭 Allied Envoy arrived: Roc Chadstone'); save(); }
}
/* the letters and scenes (Liora's milestones) */
TIMED.push(
 {id:'liora_parents', ch:170, after:'ch170', gap:8, kind:'letter', icon:'💌', from:'Liora', subj:'I met Mama and Papa', flag:'liora_met_parents',
  body:"Dear Mama and Papa (the one in the palace and the one at sea; Jenika says I may call you both that),\n\nI met my other Mama and Papa today. They are back in the palace. Papa is not a prince any more, but he has a chain with a little silver ship on it, and Jenika says that means he is the Envoy. He told me it is a better job than being a prince because you are allowed to be useful.\n\nMama Delilah says I look like him when I frown. I frowned to check.\n\n— Liora",
  log:'Liora met her parents, Roc and Delilah, back in the Dragonvale palace.'},
 {id:'jenika_sister', ch:170, after:'ch170', gap:30, kind:'letter', icon:'💌', from:'Jenika Moon', subj:'Another little one', flag:'rocduty_partner',
  body:"Jade, Devon,\n\nDelilah is expecting again. The healers say another girl. She is calm about it; Roc is not. He has read three books on the subject and quarrelled with the palace cook about her tea. Delilah says he is a sweet nuisance, and that he has stopped leaving for weeks at a time without telling her. I did not say what I thought about that.\n\nLiora has appointed herself the elder sister already.\n\nJenika",
  log:'Delilah is expecting a second daughter. Roc is attentive.'},
 {id:'liora_lessons', ch:170, after:'ch170', gap:60, kind:'letter', icon:'💌', from:'Liora', subj:'Two teachers', flag:'rocduty_father',
  body:"Dear Mama and Papa,\n\nI have two teachers now. Jenika teaches me herbs and Papa teaches me sea charts and how to hold a wooden sword. They argued about who decides my day. Jenika said it should be both of them, and Papa laughed and said that was the first sensible thing anyone had said in the palace all week, and now we take turns. Papa gets mornings. Jenika gets the herb garden. I get to choose dinner.\n\nI am getting very good at charts.\n\n— Liora",
  log:'Liora is learning from both Roc and Jenika, who decided her days together.'},
 {id:'liora_shared', ch:170, after:'liora_lessons', gap:1, kind:'notice', icon:'🌿', t:'Jenika and Roc now plan Liora\'s lessons together.', flag:'rocduty_shares', log:'Roc and Jenika share Liora\'s education.'},
 {id:'roc_sister_born', ch:170, after:'jenika_sister', gap:150, kind:'notice', icon:'👶', t:'Word from Dragonvale: Delilah gave birth to a healthy girl. Liora is a big sister.', flag:'liora_sister_born',
  log:'Delilah and Roc\'s second daughter was born in Dragonvale. Liora is a big sister.'},
 {id:'roc_unsaid', ch:178, after:'liora_lessons', gap:30, kind:'scene', icon:'🌊', window:30, locs:['dragon_vale'], needs:() => rocDutyCount() >= 5 && !G.flags.roc_past_accepted, setFlag:'roc_past_accepted',
  t:'Roc has asked for a quiet word with Jade, on the harbour wall. It is not a request that keeps.',
  scene:[['chad','I have wanted to say this for a long time, and I did not know how to without asking something of you.'],['jade','Then say it. I am not going anywhere.'],['chad','What I felt for you did not vanish when we parted. For years I confused loving you with being owed a place beside you. They are not the same thing. I am sorry it took me this long to learn it.'],['jade','I did love you, Roc. I will not pretend I didn\'t.'],['chad','I know. That is all I wanted to hear, and all I will ask.'],['jade','Then it is said.'],['chad','Delilah is waiting. So is a very loud girl who thinks I am a better swordsman than I am.'],['jade','Go home, Roc.']],
  after_t:'Neither of them said another word about it. There was nothing left to ask of each other, and the quiet was not heavy. Roc walked home along the harbour wall, lighter than he had been in years.',
  missed_t:'The evening passed without them finding the time. Some things keep. Roc went on being useful, and content.', log:'Roc told Jade what he once felt, asking nothing of her. Jade told him she had loved him too. They left it there.'},
 {id:'roc_after', ch:178, after:'roc_unsaid', gap:6, kind:'letter', icon:'💌', from:'Roc Chadstone', subj:'From the harbour', needs:() => !!G.flags.roc_past_accepted,
  body:"Jade,\n\nNothing to ask, only to report. The girls are well; the little one has Delilah's patience and my temper, which I am told is unfair to her. Liora has taken over the sea charts and will not be told she holds them upside down. Jenika has given me a list of herbs I am not to confuse with tea.\n\nThe Envoy's chain is heavier than a crown, and I like it better. Dragonvale will have more ships on the water by autumn, if the guilds stop quarrelling. If you need a sword at a harbour, send word.\n\nRoc",
  log:'Roc wrote from the harbour: his family, the Envoy\'s work, nothing asked.'}
);
/* the Envoy's own contracts on the Dragonvale board */
QUEST_POOL.push(
 {id:'q_envoy_passage', envoy:true, type:'kill', key:'sea_raider', need:3, icon:'🧭', name:'Envoy\'s Passage', desc:'Roc needs a sea lane cleared of raiders so a Dragonvale emissary can pass. (Maritime Envoy contract · Roc Chadstone)', rw:{xp:600, gold:260, rep:14}, needLoc:'dragon_vale', needCh:170},
 {id:'q_envoy_quiet', envoy:true, type:'kill', key:'smuggler', need:4, icon:'🧭', name:'A Quiet Harbour', desc:'Roc has traced a smuggling ring at a neutral port. Break it before it becomes a diplomatic incident. (Maritime Envoy contract · Roc Chadstone)', rw:{xp:620, gold:280, rep:14}, needLoc:'dragon_vale', needCh:170}
);
/* the family panel (Missions -> Ways) */
function rRocFamily(){
  if(G.ch < 170) return '';
  const M = [['liora_met_parents','Liora met her parents, Roc and Delilah'],['rocduty_partner','Delilah is expecting a second daughter'],['rocduty_father','Liora learns from Roc and from Jenika'],['liora_sister_born','Liora is a big sister: Delilah\'s second daughter was born']].filter(m => G.flags[m[0]]);
  return `<div class="panel"><b>🧭 ROC CHADSTONE</b><div class="sm">Prince of Dragonvale by birth · Maritime Envoy of Dragonvale · Ally of Tribute. He fights beside the party on Dragonvale ground and at sea, without taking a place in the party. Envoy contracts completed: ${rocData().envoy}.${G.flags.roc_past_accepted ? ' He has made his peace with the past.' : ''}</div>${M.length ? '<div class="sm" style="margin-top:4px"><b>Liora\'s family</b></div>'+M.map(m => `<div class="sm">👪 ${m[1]}</div>`).join('') : ''}</div>`;
}
deed('roc_envoy', 'bonds', 'Allied Envoy', '🧭', 'Roc Chadstone fought beside you as Dragonvale\'s Maritime Envoy.', () => !!G.flags.roc_envoy_met);
deed('roc_contracts', 'world', 'The Envoy\'s errands', '⚓', 'Three Envoy contracts completed for Roc.', () => rocData().envoy >= 3);
deed('roc_unsaid', 'bonds', 'Things left unsaid', '🌊', 'You heard what Roc had wanted to say.', () => !!(G.timed && G.timed.roc_unsaid && G.timed.roc_unsaid.state==='done'));
