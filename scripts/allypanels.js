/* =====================================================================
   TRIBUTE — STORY RELATIONSHIPS AND ALLY PANELS (Arcs XX-XXII)
   Story-only relationship routes (no "spend time": these people are not in the travelling party), tracked in Bonds beside Levi and Sally and
   Jade and Devon. Stages come only from story flags. Rheon and Mirelle, Aster and Fen, Elise and Tarin, Roc and Delilah.
   Case-tab panels for the non-fighting allies who had none: Mirelle (Information Ally), Elise (Border Ally) and Tarin (Border Trail).
   ===================================================================== */
Object.assign(REL_ROUTES, {
  rheon_mirelle:{ label:'Rheon & Mirelle', icon:'🦅', members:['rheon','mirelle'], story:true,
    open:() => !!G.flags.rheon_mirelle_possibility, begun:'',
    note:'No confession and no title: the story has only said where it is heading.',
    stages:[
      {n:'Acquaintances'},
      {n:'A possibility', flag:'rheon_mirelle_possibility'},
      {n:'Not forgotten, not yet love', flag:'rheon_remembers_mirelle'},
      {n:'Banter and a promise', flag:'rheon_mirelle_banter'},
      {n:'Seen for the work behind the name', flag:'rheon_sees_mirelle'},
      {n:'His interest is no longer one-sided', flag:'rheon_stays_a_day'},
      {n:'The direction is clear', flag:'rheon_mirelle_direction'},
    ] },
  aster_fen:{ label:'Aster & Fen', icon:'📜', members:['aster','fen'], story:true,
    open:() => !!G.flags.arc15_complete, begun:'',
    note:'A scholar and a prince, honest with each other and with his wife.',
    stages:[
      {n:'The candidate who was not chosen'},
      {n:'Working side by side', flag:'fen_finds_altered_records'},
      {n:'He likes the scholar', flag:'aster_likes_fen'},
      {n:'Not an illusion', flag:'aster_rejects_vision'},
      {n:'Honest with Elise', flag:'honest_before_agreeing'},
      {n:'A political marriage, a free heart', flag:'crown_and_border_wed'},
      {n:'Beside him in practice', flag:'aster_rules_in_practice'},
      {n:'Behind her king', flag:'aster_crowned_king'},
    ] },
  elise_tarin:{ label:'Elise & Tarin', icon:'❄️', members:['elise','tarin'], story:true,
    open:() => !!G.flags.elise_tarin_ash, begun:'',
    note:'Nothing is decided: how this ends belongs to later chapters.',
    stages:[
      {n:'A name she never forgot'},
      {n:'He may be alive', flag:'tarin_may_be_alive'},
      {n:'Found, and restrained', flag:'tarin_ash_found'},
      {n:'Honest before the wedding', flag:'honest_before_agreeing'},
      {n:'The marriage may eventually end', flag:'frontier_already_holding'},
      {n:'Meetings at night', flag:'elise_night_meeting_seen'},
      {n:'Letters and a disguise', flag:'aster_helps_elise_out'},
      {n:'The question of the public life', flag:'elise_asks_if_she_chooses_this'},
    ] },
  roc_delilah:{ label:'Roc & Delilah', icon:'🏯', members:['roc','delilah'], story:true,
    open:() => !!G.flags.delilah_wife, begun:'',
    note:'Husband and wife, and partners in work.',
    stages:[
      {n:'Wife, not a princess'},
      {n:'Married', flag:'roc_delilah_wed'},
      {n:'Expecting twins', flag:'delilah_twins_confirmed'},
      {n:'Roc admits what love is not', flag:'roc_admits_love_is_not_enough'},
      {n:'Seen for who stayed', flag:'roc_sees_delilah'},
      {n:'It took you long enough', flag:'delilah_it_took_you_long_enough'},
    ] },
});
// story-only routes (relroute.js skips the member check and the lock): the renderer's "spend time" button becomes a plain line
(function(){
  const _rr = rRelRoutes;
  rRelRoutes = function(){
    let h = _rr();
    // the base renderer prints a "spend time" button for every open route; story-only routes get a plain line instead
    Object.keys(REL_ROUTES).filter(k => REL_ROUTES[k].story).forEach(k => {
      h = h.replace(new RegExp('(<b>'+REL_ROUTES[k].icon+' '+REL_ROUTES[k].label+'</b>[\\s\\S]*?)<div class="row" style="margin-top:6px"><button disabled title="Story only"[^>]*>[^<]*</button></div>'), '$1<div class="sm">Story only: this route moves with the chapters.</div>');
    });
    return h;
  };
})();

const mirelleOpen = () => !!(G && G.flags && G.flags.veyne_network_unlocked);
const eliseOpen = () => !!(G && G.flags && G.flags.elise_valen_rejoins);
const tarinOpen = () => !!(G && G.flags && G.flags.tarin_ash_found);
const portraitChip = (src, alt) => `<img src="${src}" alt="${alt}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;vertical-align:middle;border:2px solid var(--gold)">`;
function mirellePanel(){
  if(!mirelleOpen()) return '';
  return `<h4>${portraitChip('assets/npc/mirelle.webp','Mirelle Veyne')} Mirelle Veyne: Information Ally</h4><div class="sm">An intelligence broker whose Veyne Network has no master ledger: independent cells and regional contacts that know only what they need. She does not fight.</div><div class="sm"><b>Veyne Network</b> (Exploration bar, once per place, before a search): reveal a hidden route (the search costs no day), identify a suspicious lead (one extra clue) or guard against a false clue (no ambush). With Sally's Rumour Network armed too, the two cross-check each other: no ambush and bonus XP.</div>`;
}
function elisePanel(){
  if(!eliseOpen()) return '';
  const on = !!G.flags.border_rebuilding_begins;
  const queen = !!G.flags.aster_crowned_king;
  return `<h4>${portraitChip('assets/party/elise.webp','Lady Elise Valen')} ${queen ? 'Queen Elise of Dragonvale (for now)' : 'Lady Elise Valen: Border Ally'}</h4><div class="sm">${queen ? 'Queen by Aster\'s crown, wife by treaty and ally of the frontier. Her marriage has done what it was made for, and she has begun to ask whether she chooses it.' : G.flags.crown_and_border_wed ? 'Aster\'s wife by treaty and ally of the frontier.' : 'Lady of the northern frontier and a trusted ally.'} She does not fight.</div><div class="sm">${on ? '<b>Active:</b>' : '<b>From the rebuilding of the border:</b>'} <b>Border Accord</b> (+15% gold at the frontier), <b>Frontier Network</b> (one extra clue a day), <b>Logistics Command</b> (fares 15% lower).</div>`;
}
function tarinPanel(){
  if(!tarinOpen()) return '';
  return `<h4>${portraitChip('assets/party/tarin.webp','Tarin Ash')} Tarin Ash: Border Contact</h4><div class="sm">Elise's childhood companion, found alive and living as Ash. He does not fight.</div><div class="sm"><b>Border Trail:</b> in the frontier, ambushes are rarer (22% instead of 40%) and minor encounters can be bypassed.</div>`;
}
(function(){ const _rc = rCase; rCase = function(){ return _rc() + mirellePanel() + elisePanel() + tarinPanel(); }; })();

// from the coronation (ch576) Aster is King of Dragonvale: his title changes wherever the game shows it live (the chapter texts keep the title of their day)
const asterKing = () => !!(G && G.flags && G.flags.aster_crowned_king);
(function(){
  const c = CHARACTERS.aster; if(!c) return;
  c.cls = 'Crown Prince'; Object.defineProperty(c, 'cls', {get(){ return asterKing() ? 'King of Dragonvale' : 'Crown Prince'; }, configurable:true});
  if(typeof asterPanel==='function'){ const _ap = asterPanel; asterPanel = function(){ let h = _ap(); return asterKing() ? h.replace('Aster: Crown Prince, Dragonvale Ally','Aster: King of Dragonvale').replace(/Aster: Crown Prince[^<]*Ally/,'Aster: King of Dragonvale') : h; }; }
})();
