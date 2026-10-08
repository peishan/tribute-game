/* =====================================================================
   TRIBUTE — OVERHEARD and MOMENTS (Crimson Tide's crew conversations and hobbies, for a travelling party)
   The quiet life of the party, with no reward: short scripted exchanges (OVERHEARD) and one-line comic or tender beats (MOMENTS).
   A line is eligible only when everyone in it is with the party right now (Jade always is) and the story has reached its chapter. They surface
   when you "Listen to the party" (a conversation, about half the time), and as a moment when the party rests at a home, inn or camp.
   Nothing repeats until everything eligible has been heard. Journal > Overheard keeps a collection. Deeds count them.
   State: G.overheard = { id: n }, G.moments_seen = { id: n }.   All lines are first-pass drafts in the characters' voices: rewrite freely.
   ===================================================================== */
const OVERHEARD = [
  {id:'o_mud', who:['devon'], ch:57, lines:[['jade','You could have said the road was a swamp.'],['devon','I said it was a shortcut. Both statements are accurate.'],['jade','You are enjoying this.'],['devon','Immensely.']]},
  {id:'o_maps', who:['devon'], ch:90, lines:[['devon','You have marked the same river twice.'],['jade','One is the river. One is where you said the river should be.'],['devon','Then the river is wrong.']]},
  {id:'o_staff', who:['levi','sky'], ch:88, lines:[['sky','Levi, did you take my staff?'],['levi','I borrowed it.'],['sky','For what?'],['levi','A high branch. It worked.'],['sky','It is a healing staff.'],['levi','It healed my reach.']]},
  {id:'o_bow', who:['devon','seraphina'], ch:87, lines:[['seraphina','You bow too little for a prince.'],['devon','I am saving it for when it matters.'],['seraphina','It always matters. That is the whole point of etiquette.']]},
  {id:'o_tea', who:['levi','seraphina'], ch:87, lines:[['seraphina','You do not like tea.'],['levi','I like what it does to the evening.'],['seraphina','That is the first kind thing you have said about it.'],['levi','Do not tell anyone.']]},
  {id:'o_herbs', who:['sky','ghost_healer'], ch:88, lines:[['sky','Is this one yarrow?'],['ghost_healer','*a slow shake of the head*'],['sky','Moonroot, then.'],['ghost_healer','*a nod, and the faintest warmth*'],['sky','Thank you. I will not ask again. (I will ask again.)']]},
  {id:'o_memory', who:['sky'], ch:94, lines:[['sky','Sometimes I almost remember something.'],['jade','What does it feel like?'],['sky','A word on the tip of the tongue. Warm, and then gone.'],['jade','Then we wait for it. Politely.']]},
  {id:'o_watch', who:['levi','devon'], ch:87, lines:[['devon','Your watch ended an hour ago.'],['levi','Yours began an hour ago.'],['devon','Then why are we both awake?'],['levi','The fire is good.']]},
  {id:'o_house', who:['seraphina'], ch:92, lines:[['seraphina','Where I come from, a house is a promise.'],['jade','And the Gold Manor?'],['seraphina','A very large promise with excellent chairs.']]},
  {id:'o_dinner', who:['levi','sky','devon'], ch:102, lines:[['levi','Who is cooking?'],['sky','Not Jade.'],['jade','I resent that.'],['devon','You set the last pot on fire.'],['jade','That was an experiment.']]},
  {id:'o_coat', who:['devon','sky'], ch:94, lines:[['devon','You carry my coat like a flag.'],['sky','It is cold.'],['devon','Keep it. Family does not return coats.']]},
  {id:'o_rin_levi', who:['levi','rin'], ch:149, lines:[['rin','You step too heavily.'],['levi','I step exactly as heavily as I mean to.'],['rin','The forest disagrees.']]},
  {id:'o_rin_palace', who:['rin'], ch:149, lines:[['rin','Do all palaces smell of candle wax?'],['jade','Only the ones with good candles.'],['rin','I will take mud and pine, thank you.']]},
  {id:'o_cael_devon', who:['cael','devon'], ch:123, lines:[['cael','You hold your sword like a promise.'],['devon','And you hold your silence like a seal.'],['cael','It is a family habit.']]},
  {id:'o_eira_sky', who:['eira','sky'], ch:129, lines:[['eira','You hum when you heal.'],['sky','Do I?'],['eira','The old records mention a hum. I will say no more until I am sure.'],['sky','That is the most alarming thing anyone has said all week.']]},
  {id:'o_eira_cael', who:['eira','cael'], ch:129, lines:[['eira','You have not corrected my translation.'],['cael','It is correct.'],['eira','Then why do you look disappointed?'],['cael','I was hoping to argue.']]},
];
const MOMENTS = [
  {id:'m_levi_arrow', who:['levi'], ch:30, t:'Levi was found sharpening an arrow he has already sharpened four times today.'},
  {id:'m_sky_jars', who:['sky'], ch:61, t:'Sky has labelled every herb jar in the camp. Some of the labels disagree with each other.'},
  {id:'m_devon_book', who:['devon'], ch:54, t:'Devon read by the fire until the page stopped making sense, then kept reading.'},
  {id:'m_jade_bell', who:[], ch:29, t:'Jade slept through the morning bell and woke up annoyed that it let her.'},
  {id:'m_sera_cart', who:['seraphina'], ch:87, t:'Seraphina rearranged the supply cart by a logic nobody else follows. It is, annoyingly, faster.'},
  {id:'m_ghost_herbs', who:['ghost_healer'], ch:88, t:'A bundle of dried herbs appeared by Sky\'s bedroll. Nobody saw who left it.'},
  {id:'m_road_argument', who:['levi','devon'], ch:75, t:'Levi and Devon argued for an hour about which road was shorter. Neither had checked the map.'},
  {id:'m_sky_hum', who:['sky'], ch:94, t:'Sky was humming while he mended a strap. He stopped when he noticed, and then started again.'},
  {id:'m_rin_tree', who:['rin'], ch:149, t:'Rin was up a tree at dawn, listening. She says the forest told her about our boots.'},
  {id:'m_cael_stone', who:['cael'], ch:123, t:'Cael stood a long while before an old carving, then straightened the stone beneath it.'},
  {id:'m_eira_margin', who:['eira'], ch:129, t:'Eira filled three margins with notes and apologised to the book.'},
  {id:'m_circle_stools', who:['sky','levi'], ch:102, t:'Someone has added another stool to the fire. Nobody will admit to it.'},
];
const hereIds = () => (typeof banterPresent==='function' ? banterPresent() : G.active).concat(G.party.filter(id => id==='ghost_healer'));
const eligibleFor = (list, key) => list.filter(o => G.ch >= o.ch && o.who.every(id => hereIds().includes(id)));
function overheardState(){ if(!G.overheard) G.overheard = {}; return G.overheard; }
function momentState(){ if(!G.moments_seen) G.moments_seen = {}; return G.moments_seen; }
const overheardCount = () => Object.keys(overheardState()).length;
const momentsSeen = () => Object.keys(momentState()).length;
function pickFresh(list, seen){
  const ok = eligibleFor(list), fresh = ok.filter(o => !seen[o.id]);
  return fresh.length ? AR(fresh) : (ok.length ? AR(ok) : null);
}
function overheardLines(chance){   // one conversation as chat lines, or []
  if(chance !== undefined && Math.random() > chance) return [];
  const o = pickFresh(OVERHEARD, overheardState()); if(!o) return [];
  overheardState()[o.id] = (overheardState()[o.id]||0) + 1;
  return ['👂 You overhear:'].concat(o.lines.map(([id,t]) => '💬 '+bname(id)+': "'+t+'"'));
}
function momentLines(chance){
  if(chance !== undefined && Math.random() > chance) return [];
  const m = pickFresh(MOMENTS, momentState()); if(!m) return [];
  momentState()[m.id] = (momentState()[m.id]||0) + 1;
  return ['☕ '+m.t];
}
function rOverheard(){
  const os = overheardState(), ms = momentState();
  const heard = OVERHEARD.filter(o => os[o.id]), seen = MOMENTS.filter(m => ms[m.id]);
  return `<h2>Overheard</h2><div class="sm">The party's quiet life: conversations you caught and small moments you noticed. Listen to the party at a home, an inn or a camp to hear more. <b>${heard.length} / ${OVERHEARD.length}</b> conversations · <b>${seen.length} / ${MOMENTS.length}</b> moments.</div>
    <h4>Conversations</h4>${heard.map(o => `<div class="ev"><div>${o.lines.map(([id,t]) => `<div class="sm"><b>${bname(id)}</b>: ${t}</div>`).join('')}</div></div>`).join('') || '<div class="sm">None yet.</div>'}
    <h4>Moments</h4>${seen.map(m => `<div class="ev"><div class="sm">☕ ${m.t}</div></div>`).join('') || '<div class="sm">None yet.</div>'}`;
}
