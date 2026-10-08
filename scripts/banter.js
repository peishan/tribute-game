/* =====================================================================
   TRIBUTE — IDLE BANTER AND COMIC RELIEF
   Short exchanges between whoever is travelling with Jade. Gated by who is present (all `who` must be in the party and able to
   talk), by chapter (no spoilers) and by `ctx` (when it may appear): any | travel | rest | battle.
   They appear: at the start of some real battles (battle log), on arrival after travel, with every shared meal and inn night,
   and on demand: "Listen to the party" at a tavern or camp.
   To add one: a row { who:[ids], ch:min chapter, ctx:[...], lines:[[speakerId,'text'],...] }.
   ===================================================================== */
const BANTER = [
  // Jade and Devon
  {who:['jade','devon'], ch:57, ctx:['any','rest'], lines:[['jade','You always plan everything.'],['devon','Because you always rush into danger.']]},
  {who:['jade','devon'], ch:57, ctx:['any','travel'], lines:[['devon','You are going ahead again.'],['jade','And you are following.'],['devon','Someone has to keep you alive.']]},
  {who:['jade','devon'], ch:57, ctx:['battle'], lines:[['devon','Stay where I can see you.'],['jade','That depends on where you stand.']]},
  {who:['jade','devon'], ch:57, ctx:['rest','any'], lines:[['jade','You are reading again.'],['devon','It is not reading. It is preparing.'],['jade','It is reading.']]},
  {who:['jade','devon'], ch:104, ctx:['travel','any'], lines:[['jade','No fur this time?'],['devon','I prefer surviving ambushes.']]},
  // Levi and Sky
  {who:['levi','sky'], ch:87, ctx:['rest','any'], lines:[['levi','Real food. A real bed. I died for this.'],['sky','You did not die.'],['levi','Spiritually.']]},
  {who:['levi','sky'], ch:87, ctx:['travel','any'], lines:[['sky','Is it going to rain?'],['levi','I have been dead once. I am done predicting things.']]},
  {who:['levi','sky'], ch:87, ctx:['battle'], lines:[['levi','I will take the left.'],['sky','There is nothing on the left.'],['levi','Then I take it very well.']]},
  {who:['levi','sky'], ch:87, ctx:['rest'], lines:[['sky','You are stealing my herbs.'],['levi','Borrowing. With intent.']]},
  // Seraphina
  {who:['seraphina','jade'], ch:87, ctx:['any','rest'], lines:[['seraphina','Your palace etiquette is terrible.'],['jade','I was a guard.'],['seraphina','It shows. Beautifully.']]},
  {who:['seraphina','devon'], ch:87, ctx:['battle','any'], lines:[['seraphina','In Altan we call that a warm-up.'],['devon','In Tribute we call that a catastrophe.']]},
  {who:['seraphina','levi'], ch:87, ctx:['travel','any'], lines:[['seraphina','Do you always arrive after the fight?'],['levi','I arrive when it is dramatic.']]},
  {who:['seraphina','sky'], ch:87, ctx:['rest','any'], lines:[['seraphina','Freedom is lighter than I expected.'],['sky','Your saddlebags say otherwise.'],['seraphina','Those are not mine. They are Levi\'s.']]},
  {who:['seraphina','jade'], ch:87, ctx:['rest'], lines:[['seraphina','I have never slept on a floor.'],['jade','You will be astonished how well you sleep.']]},
  // Ghost Healer
  {who:['ghost_healer','levi'], ch:88, ctx:['any','rest'], lines:[['levi','Will you tell me your name now?'],['ghost_healer','I accept tea.'],['levi','Tea is not a name.'],['ghost_healer','No. It is a better answer.']]},
  {who:['ghost_healer','sky'], ch:88, ctx:['any','rest'], lines:[['sky','Why do you always leave before dawn?'],['ghost_healer','Because patients are most grateful when they cannot find me.']]},
  {who:['ghost_healer','jade'], ch:88, ctx:['travel','any'], lines:[['jade','How long will you travel with us?'],['ghost_healer','Until the road is bored of me.']]},
  {who:['ghost_healer','seraphina'], ch:88, ctx:['any'], lines:[['seraphina','You are very quiet.'],['ghost_healer','You are very loud.'],['seraphina','Good. Someone should be.']]},
  // Tribute family and comic touches
  {who:['jade','sky'], ch:94, ctx:['rest','any'], lines:[['jade','Sky, you are staring at the herbs.'],['sky','They are staring back.']]},
  {who:['jade','levi'], ch:87, ctx:['any','travel'], lines:[['levi','Admit it, you missed me.'],['jade','Only your arrows.'],['levi','That is a very sharp way to say yes.']]},
  {who:['devon','levi'], ch:87, ctx:['travel','any'], lines:[['devon','You are walking in the wrong direction.'],['levi','I am taking the scenic route.'],['devon','It is a cliff.']]},
  // earlier journeys (Chad and Sky travel years)
  {who:['jade','chad','sky'], ch:5, ctx:['any','travel'], lines:[['sky','Chad, you are scowling at the horse.'],['chad','The horse started it.']]},
  {who:['jade','chad'], ch:6, ctx:['any','rest'], lines:[['chad','I am not sulking.'],['jade','You have not spoken for an hour.'],['chad','That is called focus.']]},
  {who:['chad','sky'], ch:5, ctx:['rest','any'], lines:[['sky','You eat like you are being chased.'],['chad','I was raised by people who were.']]},
  {who:['levi','chad'], ch:31, ctx:['any','battle'], lines:[['chad','Your arrows are late.'],['levi','Your sword is loud.']]},
  {who:['sally','jade'], ch:29, ctx:['any','rest'], lines:[['sally','I have been called many things. Punctual was never one.'],['jade','You are early.'],['sally','I know. It was a dreadful shock.']]},
  {who:['ripley','jade'], ch:52, ctx:['any','rest'], lines:[['ripley','Your hair ornaments are on backwards, Lady Jade.'],['jade','They were on backwards in Dragonvale too.'],['ripley','Yes. I was being polite.']]},
];
const BATTLE_QUIPS = ['"This is going to be embarrassing for them."','"Nobody panic. I panic in private."','"If I fall, tell them I was heroic."','"Wait. Which one is the boss?"'];
const bname = id => id==='ghost_healer' ? 'The Ghost Healer' : (CHARACTERS[id] ? CHARACTERS[id].n.split(' ')[0] : id);
function banterPresent(){
  const ids = (G.active||[]).concat(G.party.filter(id => isCompanion(id)), typeof presentGuests==='function' ? presentGuests() : []);
  return ids.filter(id => !(typeof isDisabled==='function' && isDisabled(id)));
}
function pickBanter(ctx){
  if(!G.banter) G.banter = {recent:[]};
  const here = banterPresent();
  const ok = BANTER.map((b,i) => ({b,i})).filter(({b}) => G.ch >= b.ch && b.ctx.includes(ctx) && b.who.every(id => here.includes(id) || (id==='jade')));
  if(!ok.length) return null;
  const fresh = ok.filter(({i}) => !G.banter.recent.includes(i));
  const pick = AR(fresh.length ? fresh : ok);
  G.banter.recent.push(pick.i); if(G.banter.recent.length > 12) G.banter.recent.shift();
  return pick.b.lines.map(([id,t]) => '💬 '+bname(id)+': "'+t+'"');
}
function banterLines(ctx, chance){ if(chance!==undefined && Math.random() > chance) return []; return pickBanter(ctx) || []; }
function chatParty(){
  if(G.bondDay.chat === G.day) return ['The party has talked itself out for today.'];
  G.bondDay.chat = G.day;
  const a = pickBanter('rest') || pickBanter('any'), b = pickBanter('any');
  const out = ['🗣️ You sit and listen to the party.'].concat(a||['The party is quiet. Even that is a kind of company.']);
  if(b && b!==a) out.push.apply(out, b);
  if(typeof overheardLines==='function'){ overheardLines(.55).forEach(l => out.push(l)); momentLines(.5).forEach(l => out.push(l)); }
  return out.concat(advanceDay(0));
}
