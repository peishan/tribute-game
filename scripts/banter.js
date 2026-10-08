/* =====================================================================
   TRIBUTE — IDLE BANTER AND COMIC RELIEF
   Short exchanges between whoever is travelling with Jade. Gated by who is present (all `who` must be in the party and able to
   talk), by chapter (no spoilers) and by `ctx` (when it may appear): any | travel | rest | battle.
   They appear: at the start of some real battles (battle log), on arrival after travel, with every shared meal and inn night,
   and on demand: "Listen to the party" at a tavern or camp.
   To add one: a row { who:[ids], ch:min chapter, ctx:[...], if:optional condition, lines:[[speakerId,'text'],...] }.
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

  // Arc IV-V: the road to the broken seals (ch122+); guests only speak while they are with the party in their area
  {who:['jade','devon'], ch:122, ctx:['any','travel'], lines:[['devon','You have not asked me to read the map once.'],['jade','You would only tell me the long way.'],['devon','The long way is usually the one that arrives.']]},
  {who:['jade','devon'], ch:122, ctx:['rest','any'], lines:[['jade','You are writing again.'],['devon','Someone should record this properly.'],['jade','Write that I was right.'],['devon','I will write that you were lucky.']]},
  {who:['jade','devon'], ch:122, ctx:['battle'], lines:[['jade','Left.'],['devon','I was already going left.'],['jade','Then we agree. Mark the day.']]},
  {who:['levi','sky'], ch:122, ctx:['travel','any'], lines:[['sky','You have been quiet since the ruins.'],['levi','I am listening to the stones.'],['sky','Do they say anything?'],['levi','Mostly that I should have brought a thicker coat.']]},
  {who:['levi','devon'], ch:122, ctx:['rest','any'], lines:[['levi','You read the oath twice.'],['devon','Three times.'],['levi','And?'],['devon','It reads better the fourth.']]},
  {who:['sky','devon'], ch:122, ctx:['any','rest'], lines:[['devon','Does the light feel different here?'],['sky','Louder. Like it wants to be asked.'],['devon','Then ask politely.']]},
  {who:['sky','jade'], ch:122, ctx:['travel','any'], lines:[['jade','How are you feeling?'],['sky','Like a lantern someone keeps carrying into new rooms.'],['jade','Is that bad?'],['sky','No. It is just busy.']]},
  {who:['seraphina','jade'], ch:122, ctx:['rest','any'], lines:[['seraphina','You never ask me to talk.'],['jade','You would not.'],['seraphina','No. But it is nice to be left the option.']]},
  {who:['seraphina','levi'], ch:122, ctx:['battle','any'], lines:[['levi','You are very calm.'],['seraphina','I am saving it.'],['levi','For what?'],['seraphina','Later.']]},
  {who:['seraphina','devon'], ch:122, ctx:['travel','any'], lines:[['devon','You walk like someone counting exits.'],['seraphina','Habit. You walk like someone counting guards.'],['devon','Also habit.']]},
  {who:['ghost_healer','sky'], ch:122, ctx:['rest','any'], lines:[['sky','Will you teach me the tea?'],['ghost_healer','It is not the tea. It is the waiting.'],['sky','That sounds harder.']]},
  {who:['ghost_healer','devon'], ch:122, ctx:['any'], lines:[['devon','Your remedies work faster than the court physicians\'.'],['ghost_healer','The court physicians are paid to be slow.']]},
  {who:['jade','levi'], ch:122, ctx:['any','travel'], lines:[['levi','Admit it, the scenic route was good.'],['jade','It was a cliff, Levi.'],['levi','A very scenic cliff.']]},
  {who:['jade','sky','levi'], ch:122, ctx:['rest','any'], lines:[['levi','Who has the last biscuit?'],['sky','Nobody.'],['jade','Levi.'],['levi','It was a team decision.']]},
  // Cael Ardyn (guest, broken-seal areas)
  {who:['cael','jade'], ch:123, ctx:['any','travel'], lines:[['cael','The seals were never meant to be forgotten.'],['jade','They were, though.'],['cael','Yes. That is what troubles me.']]},
  {who:['cael','sky'], ch:123, ctx:['rest','any'], lines:[['sky','Do you ever stop keeping watch?'],['cael','I have forgotten how.'],['sky','Then I will watch for a while.']]},
  {who:['cael','devon'], ch:123, ctx:['any','rest'], lines:[['devon','Is it true your order kept records of everything?'],['cael','Everything that mattered. Which turns out to be different from everything that was safe.']]},
  {who:['cael','levi'], ch:123, ctx:['travel','any'], lines:[['levi','You cannot be a keeper and enjoy a good road.'],['cael','I can. I simply do it quietly.']]},
  {who:['cael','seraphina'], ch:123, ctx:['any'], lines:[['cael','You say very little.'],['seraphina','You say very much.'],['cael','Between us, we make one conversation.']]},
  // Eira Solenne (guest, guide)
  {who:['eira','jade'], ch:129, ctx:['any','travel'], lines:[['eira','The path bends here. Please stay on the left.'],['jade','Is the right bad?'],['eira','The right is not wrong. It is only longer than you would like.']]},
  {who:['eira','levi'], ch:129, ctx:['travel','any'], lines:[['levi','I could have found this way.'],['eira','You could have found a way.'],['levi','That is fair.']]},
  {who:['eira','sky'], ch:129, ctx:['rest','any'], lines:[['eira','Does the light follow you everywhere?'],['sky','Mostly. It is polite about it.']]},
  {who:['eira','devon'], ch:129, ctx:['any','rest'], lines:[['devon','You mark the way without a map.'],['eira','I have been walking it since before I could read one.']]},
  {who:['cael','eira'], ch:129, ctx:['any'], lines:[['eira','You are frowning at the wall.'],['cael','It is frowning at me first.']]},
  // Arc VI: the Fifteen
  {who:['jade','devon'], ch:147, ctx:['rest','any'], if:() => !!G.flags.fifteen_named, lines:[['devon','Fifteen names.'],['jade','Fifteen answers. We just do not have them yet.'],['devon','I find that comforting. Oddly.']]},
  {who:['jade','sky'], ch:147, ctx:['any','travel'], if:() => !!G.flags.fifteen_named, lines:[['sky','Do you think they all want to be found?'],['jade','I think one of them did.'],['sky','That is a good start.']]},
  {who:['levi','sky'], ch:147, ctx:['travel','any'], lines:[['levi','I have marked three trails and none of them agree.'],['sky','Maybe none of them are lying.'],['levi','That would be a first.']]},
  {who:['seraphina','jade'], ch:147, ctx:['rest','any'], lines:[['seraphina','Strange. I do not feel like a spectator.'],['jade','You are not.'],['seraphina','Then I will stop standing like one.']]},
  {who:['rin','jade'], ch:149, ctx:['any','travel'], lines:[['rin','The forest remembers who walks softly.'],['jade','And who does not?'],['rin','It remembers those too.']]},
  {who:['rin','levi'], ch:149, ctx:['travel','any'], lines:[['levi','Two trackers, one trail.'],['rin','One tracker. One enthusiast.'],['levi','I will take enthusiast.']]},
  {who:['rin','sky'], ch:149, ctx:['rest','any'], lines:[['rin','Do you hear them?'],['sky','The leaves? A little.'],['rin','That is enough to begin with.']]},
  {who:['rin','devon'], ch:149, ctx:['any'], lines:[['devon','Is there a rule to a spirit path?'],['rin','There are several. None are written down.'],['devon','Naturally.']]},
  {who:['rin','seraphina'], ch:149, ctx:['any','rest'], lines:[['rin','You step like a hunter.'],['seraphina','And you stand like a tree.'],['rin','Thank you.']]},
  {who:['jade','levi'], ch:152, ctx:['any','rest'], if:() => !!G.flags.widow_resolved, lines:[['levi','The forest looked different on the way out.'],['jade','It is allowed to.'],['levi','I know. I just hoped it would wave.']]},
  {who:['jade','sky'], ch:152, ctx:['rest','any'], if:() => !!G.flags.widow_resolved, lines:[['sky','I keep thinking about the guardian she used to be.'],['jade','So do I.'],['sky','Good. Then it was not wasted.']]},
  {who:['devon','levi'], ch:156, ctx:['any','travel'], if:() => !!G.flags.hart_found, lines:[['levi','The Hart stood perfectly still.'],['devon','It was waiting for us to understand.'],['levi','That is more patience than I have ever had.']]},
  {who:['jade','devon'], ch:153, ctx:['battle'], lines:[['devon','Do not strike unless it strikes.'],['jade','And if it does?'],['devon','Then I will say I told you so afterwards.']]},
  {who:['jade','sky','levi'], ch:147, ctx:['any','travel'], if:() => evilsResolved() >= 1, lines:[['levi','One down. Fourteen to go.'],['sky','It is not a race.'],['levi','Everything is a race if you are losing.']]},
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
  const ok = BANTER.map((b,i) => ({b,i})).filter(({b}) => G.ch >= b.ch && b.ctx.includes(ctx) && (!b.if || b.if()) && b.who.every(id => here.includes(id) || (id==='jade')));
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
