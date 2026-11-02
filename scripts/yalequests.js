/* =====================================================================
   TRIBUTE — MASTER YALE'S LESSONS (a six-quest chain at Lingering Vale; docs/MASTER_YALE_PLAN.md)
   Yale is a stationary ally and quest giver; each lesson is a short chain of investigate spots (Sky leads) at Lingering Vale, each chain gated by the one before:
     1 Rare Roots (medicinal plants)       2 The Sick Grove (a diseased treant)     3 The Patient Nobody Could Name (a case ordinary healers cannot diagnose)
     4 The Lost Treatise (lost healer texts)   5 The Apprentices (teaching)         6 Heat Under the Vale (a restoration-network anomaly; after the Weeping Stone, ch759)
   Letters arrive from Yale. After the father reveal (ch753) his lines change subtly: he is still Sky's master first. The last lesson gives Yale's Seal (a Sky accessory). First-pass numbers and wording.
   ===================================================================== */
GEAR.yale_seal = {n:'Master Yale\'s Seal', icon:'🪬', slot:'accessory', rarity:'epic', bonus:{mag:6, hp:30, mp:18}, for:['sky']};
ITEMS.yale_seal = {n:GEAR.yale_seal.n, icon:GEAR.yale_seal.icon, type:'gear', slot:'accessory', rarity:'epic'};

(function(){
  const yk = () => !!(G && G.flags && G.flags.blood_ritual_reveals_father_and_son);
  let gi = 5000;
  const spot = (id, n, icon, desc, clues, prev, ch) => ({id, kind:'investigate', n, icon, ch, need:2, ambush:[], lo:100, roles:['sky','jade'], desc, clues,
    rw:{xp:193100+300*gi, gold:40920+60*(gi++)}, needFlag:'inv_'+prev, lockMsg:'🔒 Finish the previous lesson first'});
  const first = (id, n, icon, desc, clues, ch, prev) => Object.assign(spot(id, n, icon, desc, clues, prev||'x', ch), prev ? {} : {needFlag:'sky_reunites_with_yale', lockMsg:'🔒 Sky must reach the Vale first'});
  const rw = (n, extra) => Object.assign({xp:1500000+n*60000, gold:340000+n*12000, rep:2500+n*12}, extra||{});
  LOCATIONS.lingering_vale.spots.push(
    // 1 Rare Roots
    first('yqA1','The Shaded Slope','🌿','Where Yale used to bring the apprentices.',['Yale: "They grow best on the shaded side. Early spring." He walks the slope without looking at the ground: he knows every root.','Sky finds two of the three in the first hour. Yale does not say which one he missed.'], 742),
    spot('yqA2','The Season Is Wrong','🍂','Herbs under stress.',['The roots are coming up out of season: pale, thin, early. Yale holds one to the light. "This is not the weather."','Sky: "The currents." Yale: "Write that down. Then check it again."'],'yqA1',742),
    spot('yqA3','Sorting the Roots','🧺','A basket and a lesson.',['Yale makes Sky sort the harvest twice: once by what they are, once by what each could do to a patient who has the wrong diagnosis.','"A healer who knows only what a root does will kill someone with it," Yale says. "Know what it does to the wrong body."'],'yqA2',742),
    // 2 The Sick Grove
    spot('yqB1','The Wilted Grove','🌳','A grove has gone grey.',['A grove above the village has gone grey from the roots up. The villagers say the great tree among them has begun to weep.','Yale walks round it twice. "Not blight. Look at the ring of it." The grey follows the line of a buried current.'],'yqA3',744),
    spot('yqB2','What the Treant Remembers','🌲','A tree that is also something else.',['The grove\'s oldest tree is a treant, half asleep and in pain. It answers Sky in dreams that are not Sky\'s own.','"The old records called this the vale\'s great tree," Yale says quietly. "I did not want to tell you this was the same sickness."'],'yqB1',744),
    spot('yqB3','Root and Stone','🪨','The cause is in the ground.',['Under the grove an old channel has been leaking restorative energy straight into the roots. Too much of a good thing.','Sky closes it with a healer\'s patience: a little at a time, so the tree can learn to drink again.'],'yqB2',744),
    // 3 The Patient Nobody Could Name
    spot('yqC1','A Woman Who Cannot Sleep','🛏️','Healers have failed.',['A woman has not slept properly in months. Three healers have called it grief, nerves and a stomach complaint. She does not believe any of them.','Yale: "I have seen this once." He does not say where.'],'yqB3',753),
    spot('yqC2','The Wrong Questions','📓','Sky asks differently.',['Sky stops asking what hurts and asks what changed. The answer is nothing in her life: everything in the water she drinks.','"Diagnose before treating," Yale says, not for the first time. He is quiet for a moment afterwards.'],'yqC1',753),
    spot('yqC3','A Rare Sensitivity','💧','Not a disease.',['She is one of the people who feel the vale\'s currents too strongly. The records call it a rare sensitivity. It is not an illness, and it cannot be cured, only lived with.','Sky teaches her to close the door on the noise. She cries and is not afraid.'],'yqC2',753),
    // 4 The Lost Treatise
    spot('yqD1','The Missing Shelf','📚','A healer\'s text has lost its middle.',['A treatise on slow poisons has lost its middle chapters. The apprentices have been dosing from the margins for years.','Yale does not scold anyone. He is more frightening than a scold.'],'yqC3',748),
    spot('yqD2','Reading the Margins','🔎','The notes are older than the text.',['The margin notes were not written by the author but by a long line of readers, each correcting the last. Sky reads them in order.','"This is what a tradition is," Yale says. "A list of people who were willing to be corrected."'],'yqD1',748),
    spot('yqD3','Copied Whole','🖋️','A clean copy.',['Sky and Yale rebuild the missing chapters from the corrections, and copy the whole text clean. Three apprentices copy it again by hand.','The first page of the new copy carries no name. Yale refuses to sign it.'],'yqD2',748),
    // 5 The Apprentices
    spot('yqE1','The Apprentice Who Hid','🫣','A mistake in the stores.',['A young apprentice measured a poultice wrongly and a patient is worse. She is hiding in the stores rather than tell Master Yale.','Sky sits down beside her and tells her the worst mistake he ever made. It takes some time.'],'yqD3',753),
    spot('yqE2','Teaching Again','🎓','Sky teaches.',['Sky takes the apprentices through the first lesson himself: measure, diagnose, again. He catches himself saying "Again" and hears Yale in it.','The apprentices laugh. Sky does not mind.'],'yqE1',753),
    spot('yqE3','Yale Steps Back','🚪','He lets Sky lead.',['Yale sits at the back of the room and does not interrupt once. When it is over he says only: "You teach better than I did."','If he knows what that means to Sky, he does not say it. If he does not, the lesson still stands.'],'yqE2',753),
    // 6 Heat Under the Vale
    spot('yqF1','The Garden That Blooms Out of Season','🌸','Something under the Vale is warm.',['A healing garden has begun to bloom out of season. The apprentices are delighted. Yale is not.','Sky puts his hand to the soil: it is warm, steadily, from below.'],'yqE3',759),
    spot('yqF2','Reading the Current','🌐','Restored channels, leaking heat.',['The restored channels beneath the Vale are healing the land and also leaking heat into it. The network is working: it is working a little too well.','Yale: "A healer does not stop a wound closing because it closes quickly." He is smiling, slightly.'],'yqF1',759),
    spot('yqF3','Leave It Be','🕊️','The restraint a healer needs.',['Sky and Yale tune three of the channels and leave the rest. The garden settles into its ordinary blooming.','Yale gives Sky his seal: not as a reward, he says, but because it is Sky\'s hand that reads the Vale now.'],'yqF2',759),
  );
  const steps = (...a) => ({type:'steps', steps:a.map(x => ({label:x[0], spot:x[1]}))});
  MISSIONS.push(
    {id:'yq_roots', needCh:742, title:'Master Yale: Rare Roots', obj:steps(['The Shaded Slope','yqA1'],['The Season Is Wrong','yqA2'],['Sorting the Roots','yqA3']), rw:rw(1,{items:[{id:'forest_herb',qty:6}]}), subj:'Come up to the slope', body:'The roots will not wait for the weather. Bring a basket and your own judgement. — Master Yale'},
    {id:'yq_grove', needCh:744, after:'yq_roots', title:'Master Yale: The Sick Grove', obj:{type:'steps', steps:[{label:'The Wilted Grove', spot:'yqB1'},{label:'What the Treant Remembers', spot:'yqB2'},{label:'Root and Stone', spot:'yqB3'},{label:'Drive off what feeds on the grove', kill:'shade_wraith', need:4}]}, rw:rw(2,{items:[{id:'spirit_thread',qty:2}]}), subj:'A grove above the village', body:'The grove has gone grey. You will want to see it before you eat. — Master Yale'},
    {id:'yq_patient', needCh:753, after:'yq_grove', title:'Master Yale: The Patient Nobody Could Name', obj:steps(['A Woman Who Cannot Sleep','yqC1'],['The Wrong Questions','yqC2'],['A Rare Sensitivity','yqC3']), rw:rw(3,{items:[{id:'clear_mind_tea',qty:2}]}), subj:'A patient for you', body:'Three healers have failed her. I would like you to be the fourth, and to ask different questions. — Master Yale'},
    {id:'yq_treatise', needCh:748, after:'yq_patient', title:'Master Yale: The Lost Treatise', obj:steps(['The Missing Shelf','yqD1'],['Reading the Margins','yqD2'],['Copied Whole','yqD3']), rw:rw(4,{items:[{id:'vale_tonic',qty:2}]}), subj:'The shelf with the gap', body:'A text of ours has lost its middle. I have been meaning to fix it for twenty years. — Master Yale'},
    {id:'yq_apprentices', needCh:753, after:'yq_treatise', title:'Master Yale: The Apprentices', obj:steps(['The Apprentice Who Hid','yqE1'],['Teaching Again','yqE2'],['Yale Steps Back','yqE3']), rw:rw(5,{items:[{id:'vale_panacea',qty:1}]}), subj:'The young ones', body:'One of them is hiding in the stores. She will not hide from you. — Master Yale'},
    {id:'yq_heat', needCh:759, after:'yq_apprentices', title:'Master Yale: Heat Under the Vale', obj:steps(['The Garden That Blooms Out of Season','yqF1'],['Reading the Current','yqF2'],['Leave It Be','yqF3']), rw:rw(6,{items:[{id:'yale_seal',qty:1}], flag:'yale_lessons_complete'}), subj:'The garden', body:'The garden has opened early. I would like your hand on it, not mine. — Master Yale'},
  );
  const _rc = rClinic;
  rClinic = function(){
    const base = _rc(); if(!base) return base;
    const ids = ['yq_roots','yq_grove','yq_patient','yq_treatise','yq_apprentices','yq_heat'], done = ids.filter(i => mState(i)==='done').length;
    const line = done===6 ? `Master Yale's lessons: all six are complete.${yk() ? ' He signs nothing, but he hangs the seal on Sky\'s belt himself.' : ''}` : `Master Yale's lessons: ${done} / 6 complete. Letters arrive as the Vale needs you.`;
    return base + `<div class="panel"><b>📓 Lessons</b><div class="sm">${line}</div></div>`;
  };
})();
