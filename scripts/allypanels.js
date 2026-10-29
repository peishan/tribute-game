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
      {n:'Asked her intentions', flag:'aunt_asks_mirelle_intentions'},
      {n:'Weighed and not found wanting', flag:'aunt_weighs_mirelles_qualifications'},
      {n:'Accepted at Altan court', flag:'aunt_accepts_mirelle'},
      {n:'With child', flag:'mirelle_is_with_child'},
      {n:'A secret for now', flag:'pregnancy_kept_private_for_now'},
      {n:'The court asks about her', flag:'court_questions_mirelle'},
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
      {n:'Standing in for the queen', flag:'fen_agrees_to_stand_in'},
      {n:'Wed in secret', flag:'aster_fen_secretly_wed'},
      {n:'Scholar by day, wife in secret', flag:'fen_returns_as_scholar'},
      {n:'Queen of Dragonvale', flag:'fen_announced_queen'},
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
      {n:'A quiet settlement within reach', flag:'elise_shown_the_settlement'},
      {n:'The life she wants', flag:'elise_wants_her_own_life'},
      {n:'Gone from the palace', flag:'elise_leaves_dragonvale'},
      {n:'Somewhere else', flag:'elise_lives_elsewhere'},
    ] },
  sky_jenika:{ label:'Sky & Jenika', icon:'🌙', members:['sky','jenika'], story:true,
    open:() => !!G.flags.pavilion_never_sleeps, begun:'',
    note:'A one-time cure, and a bond they chose without a wedding.',
    stages:[
      {n:'The Pavilion never sleeps', flag:'pavilion_never_sleeps'},
      {n:'The healer who cannot heal herself', flag:'healer_cannot_heal_herself'},
      {n:'The Valen records', flag:'half_valen_records_read'},
      {n:'Sky chooses', flag:'sky_chooses_to_cure_jenika'},
      {n:'The curse breaks', flag:'jenika_curse_broken'},
      {n:'Stop checking whether I am alive', flag:'morning_after_the_cure'},
      {n:'No wedding required', flag:'no_wedding_required'},
      {n:'A secret she keeps', flag:'jenika_notices_pregnancy'},
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
  const queen = !!G.flags.aster_crowned_king, gone = !!G.flags.elise_leaves_dragonvale, dead = !!G.flags.elise_valen_dies;   // Arc XXIV: she leaves with Tarin (621); the kingdom is told she has died (628)
  const title = dead ? 'Elise: Alive, and Officially Dead' : gone ? 'Elise: Away from the Palace' : queen ? 'Queen Elise of Dragonvale (for now)' : 'Lady Elise Valen: Border Ally';
  const lead = dead ? 'Dragonvale mourns Queen Elise. She is alive, far away with Tarin, and her pregnancy continues. Only a small circle knows.' : gone ? 'She has left Dragonvale with Tarin. The court believes the queen is ill and resting.' : null;
  return `<h4>${portraitChip('assets/party/elise.webp','Lady Elise Valen')} ${title}</h4><div class="sm">${lead ? lead : queen ? 'Queen by Aster\'s crown, wife by treaty and ally of the frontier. Her marriage has done what it was made for, and she has begun to ask whether she chooses it.' : G.flags.crown_and_border_wed ? 'Aster\'s wife by treaty and ally of the frontier.' : 'Lady of the northern frontier and a trusted ally.'} She does not fight.</div><div class="sm">${on ? '<b>Active:</b>' : '<b>From the rebuilding of the border:</b>'} <b>Border Accord</b> (+15% gold at the frontier), <b>Frontier Network</b> (one extra clue a day), <b>Logistics Command</b> (fares 15% lower).</div>`;
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

// from the announcement (ch635) Fen is Queen of Dragonvale: her panel says so (the chapters before keep her as the royal scholar)
(function(){
  if(typeof yulanPanel!=='function') return;
  const _yp = yulanPanel;
  yulanPanel = function(){
    let h = _yp();
    if(!(G && G.flags && G.flags.fen_announced_queen)) return h;
    return h.replace('Lady Yulan Fen: Dragonvale Ally','Queen Yulan Fen of Dragonvale').replace('<div class="sm">'+YULAN_FATE+'</div>','<div class="sm">Royal scholar, secret accomplice, Aster\'s wife, and now his queen. She still keeps the archives.</div>');
  };
})();

// Object.assign copies a getter's value, so the Elise and Tarin note is made live here
Object.defineProperty(REL_ROUTES.elise_tarin, 'note', {get(){ return G && G.flags && G.flags.elise_lives_elsewhere ? 'She has left the palace with him and is officially dead; the rest belongs to the chapters ahead.' : 'Nothing is decided: how this ends belongs to later chapters.'; }, configurable:true, enumerable:true});
