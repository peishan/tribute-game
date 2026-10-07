/* =====================================================================
   TRIBUTE — LIORA'S LETTERS (family messengers after the party leaves Dragonvale)
   Liora (left in Dragonvale's care) grows quickly because of Dragonvale's energy. While the party is away she stays in touch
   through letters and messengers, never as a way to "call" her parents. Two stages, by in-game days since the party left:
     young (age ~3-6): short, rare letters from Liora (drawings), Jenika's notes, Devon's brief lines, occasional royal visits
     older (age ~7-12): more frequent letters, Jenika reporting her growth, training visits from Jade and Devon
   A letter can carry a small gift. Messengers reach the party in settlements (or anywhere, with the bracelet only for Greyson).
   Later (not built): when Liora joins the party she carries a small pouch from her childhood: Jade's first training note,
   Devon's letters, Jenika's herb journal. A reminder, not an artifact: "I was raised by people who believed in me."
   The Black Pearl is reserved for her destiny moment, so no pearl-calling here.
   State: G.fam = {since, sent, next, queue}
   ===================================================================== */
const FAM_INTERVAL = {young:16, older:9};   // in-game days between letters
const FAM_OLDER_AFTER = 150;                // days after leaving Dragonvale when Liora is about 7+
const FAMILY_LETTERS = [
  {st:'young', from:'Liora', subj:'A drawing for you', body:'Dear Mama and Papa. I drew you a flower. Jenika says it is a very good flower. When are you coming home? I am being brave. — Liora (the seamstress helped with the words)', gift:{items:[{id:'herbal_tonic',qty:1}]}},
  {st:'young', from:'Jenika Moon', subj:'Liora is well', body:'Liora ate all her herbs today and asked me to tell you she did not cry. She counts the days on the pavilion wall. The Dragonvale boards have new contracts if you pass this way. — Jenika'},
  {st:'young', from:'Devon', subj:'A short note', body:'Aster has taken to the crown better than he expected. Liora is safe. The palace is quiet. Dragonvale will have quests waiting whenever you wish to return. — Devon'},
  {st:'young', from:'Liora', subj:'I learned a stitch', body:'Mama, I stitched a flower like yours. It is crooked but Jenika says crooked is how you know it is mine. I miss you. Papa too. — Liora', gift:{gold:60}},
  {st:'young', from:'Jenika Moon', subj:'She grows quickly', body:'Dragonvale\'s energy flows differently, and she is already tall for her years. She asks about both of you every night. Come when you can. — Jenika', gift:{items:[{id:'spirit_potion',qty:1}]}},
  {st:'young', from:'Aster Chadstone', subj:'The palace is quiet', body:'Your Highnesses, the borders are calm and the court asks for you. Liora sits beside me during lessons and corrects my embroidery. There are contracts on the board should you return. — Aster'},
  {st:'older', from:'Liora', subj:'I can read your letters now', body:'Dear Mama and Papa. I can read all your letters by myself now, and I keep them in a box. Jenika is teaching me the names of every herb in the garden. Will you teach me the whip? — Liora', gift:{items:[{id:'purify_elixir',qty:1}]}},
  {st:'older', from:'Jenika Moon', subj:'Her first remedy', body:'Liora brewed her first calming tonic without help. It was not perfect, but it worked. She is quick, and she does not like to be told something is too hard. — Jenika', gift:{items:[{id:'moon_tonic',qty:1}]}},
  {st:'older', from:'Devon', subj:'A visit, if we can', body:'Jade and I may be able to visit for a few days to train Liora. She wants to learn how the whip is held. We will not let her skip her lessons. Contracts are waiting at the palace board. — Devon', gift:{gold:150}},
  {st:'older', from:'Liora', subj:'Training day', body:'Papa corrected my stance and Jenika laughed. I fell down twice. I wrote it in my notebook so I will remember. I am getting strong. — Liora', gift:{gold:100}},
  {st:'older', from:'Jenika Moon', subj:'Growth report', body:'Her energy is steady and she asks good questions. She knows the old stories about the pearl, but I have told her to wait until you are home to speak of it. — Jenika', gift:{items:[{id:'dragon_remedy',qty:1}]}},
];
const FAM_GENERIC = [
  {from:'Liora', subj:'Counting days', body:'I counted the days again on the wall. It is a long wall. Be safe. — Liora', gift:{gold:40}},
  {from:'Jenika Moon', subj:'All is well', body:'Nothing to report but good news. Liora ate her vegetables and the garden is in bloom. — Jenika', gift:{items:[{id:'herbal_tonic',qty:1}]}},
  {from:'Devon', subj:'The board is full', body:'The Dragonvale boards are busy again. If you return, there is work, and a daughter who will pretend she was not waiting. — Devon'},
];
function famStage(){ return (G.fam && G.day - G.fam.since >= FAM_OLDER_AFTER) ? 'older' : 'young'; }
/* Lio the messenger (from ch118): short letters from the restored west, once in a while, to the party in any settlement. */
const LIO_LETTERS = [
  {subj:'From the western road', body:'Lady Jade. The healer routes are busier than they have ever been. Mira has not slept. The archive doors are open every day now and the villagers queue to read their own families\' names. — Lio'},
  {subj:'A gift from the west', body:'Tribute remembers us only when it needs something, I used to say. Now we remember you when we do not need anything at all. Take this from the village. — Lio', gift:{items:[{id:'moon_tonic',qty:2}]}},
  {subj:'News from Mira', body:'Mira found another page behind the false panel. She says it is only a recipe for a tonic. She cried anyway. — Lio', gift:{gold:200}},
];
function lioTick(){
  if(!G.flags.valen_restored) return [];
  if(!G.lio) G.lio = {next:G.day+12, i:0};
  const msgs = [];
  if(G.day >= G.lio.next && isSettlement(G.loc)){
    const L = LIO_LETTERS[G.lio.i % LIO_LETTERS.length]; G.lio.i++; G.lio.next = G.day + 20;
    G.letters.unshift({id:'F_lio_'+G.day, fam:true, from:'Lio', subj:L.subj, body:L.body, gift:L.gift||null, day:G.day, read:false});
    msgs.push('✉️ A messenger arrives from the west: "'+L.subj+'"'); toast(msgs[0]);
  }
  return msgs;
}
function famTick(){
  lioTick();
  if(!G.flags.liora_apart) return [];
  if(!G.fam) G.fam = {since:G.day, sent:[], next:G.day + 6, queue:0};
  while(G.day >= G.fam.next){ G.fam.queue++; G.fam.next += FAM_INTERVAL[famStage()]; }
  return famDeliver();
}
function famDeliver(){
  const msgs = [];
  if(!G.fam || !G.fam.queue || !isSettlement(G.loc)) return msgs;   // messengers find you in settlements
  while(G.fam.queue > 0){
    G.fam.queue--;
    const st = famStage();
    let L = FAMILY_LETTERS.find(l => l.st===st && !G.fam.sent.includes(FAMILY_LETTERS.indexOf(l)));
    if(L) G.fam.sent.push(FAMILY_LETTERS.indexOf(L)); else L = AR(FAM_GENERIC);
    G.letters.unshift({id:'F_'+G.day+'_'+Math.random().toString(36).slice(2,6), fam:true, from:L.from, subj:L.subj, body:L.body, gift:L.gift||null, day:G.day, read:false});
    msgs.push('✉️ A messenger arrives from Dragonvale: "'+L.subj+'"');
  }
  msgs.forEach(m => toast(m));
  return msgs;
}
function claimFamGift(id){
  const L = G.letters.find(l => l.id===id); if(!L || !L.gift || L.claimed) return [];
  L.claimed = true; return grantReward(L.gift, '🎁 Enclosed with the letter');
}
