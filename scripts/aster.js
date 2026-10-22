/* =====================================================================
   TRIBUTE — ASTER CHADSTONE, ARC XX GUEST BUILD (the author's design)
   Crown Prince / Tactical Commander: a temporary tactical-support guest who fights beside the five (does not replace Jade, Devon, Sky, Levi or Sally).
   Support first, swordplay second; he never out-damages Jade, Devon or Levi. Skills unlock by chapter (`req:{ch:N}`); 505 and 510 are not yet sent.
   Passives: Crown Prince's Presence (the party shrugs off some control effects while he is present), Field Student (he gains a small bonus after
   he sees an ally use a specialty) and Royal Responsibility (an ally under 25% HP sharpens him). Field ability: Royal Authority / Earned Authority (explore.js, world.js).
   He leaves when the story sets the flag aster_guest_ends. All numbers first-pass.
   ===================================================================== */
CHARACTERS.aster = {
  n:'Aster Chadstone', icon:'👑', cls:'Crown Prince', role:'Tactical Commander (Arc XX temporary guest)', combat:'Party buffs, formation control, protection, light sword damage', guestOnly:true,
  identity:'Devon\'s younger brother and Dragonvale\'s Crown Prince, learning in the field how to command people he has to earn. Early in Arc XX he gives orders because he is Crown Prince; by the end he understands who should act, when and why.',
  style:['Command','Formation','Ceremonial jian'], strength:'Leading others',
  weapon:'Ceremonial jian, adapted for the field', signature:'Border Formation', sigDesc:'The party\'s defence and speed rise and the marked enemy\'s attack falls.',
  base:{hp:104,mp:38,atk:11,mag:7,def:12,spd:11}, grow:{hp:9.4,mp:2.8,atk:1.25,mag:.7,def:1.3,spd:1},
  skills:[
   {id:'royal_jian',n:'Royal Jian',icon:'🗡️',mp:0,kind:'phys',tgt:'foe',pow:1.05,req:{lvl:1},desc:'A basic sword attack with the ceremonial jian.'},
   {id:'royal_command',n:'Royal Command',icon:'📣',mp:7,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'atk',m:1.18,d:2},{k:'buff',stat:'def',m:1.18,d:2}],req:{lvl:1},desc:'A trained leader\'s order: the party\'s ATK and DEF rise for 2 turns.'},
   {id:'hold_formation',n:'Hold Formation',icon:'🛡️',mp:6,kind:'support',tgt:'allies',fx:[{k:'ward',v:.3,d:1}],req:{lvl:1},desc:'The party closes ranks: damage taken is reduced for 1 turn.'},
   {id:'calculated_advance',n:'Calculated Advance',icon:'⏩',mp:5,kind:'support',tgt:'ally',fx:[{k:'buff',stat:'spd',m:1.35,d:2},{k:'advance'}],req:{ch:494},desc:'Timing matters as much as authority: one ally gains SPD and acts next.'},
   {id:'field_judgment',n:'Field Judgment',icon:'🎯',mp:6,kind:'support',tgt:'foe',fx:[{k:'mark',v:.25,d:2}],req:{ch:495},desc:'He picks the real priority: the party deals more damage to the marked enemy for 2 turns.'},
   {id:'princes_rally',n:'Prince\'s Rally',icon:'🏳️',mp:9,kind:'heal',tgt:'allies',pow:.45,fx:[{k:'cleanse'}],req:{ch:497},desc:'Leadership, not healing magic: a little HP for everyone, and fear, charm and bewilderment are lifted.'},
   {id:'stand_with_me',n:'Stand With Me',icon:'🤝',mp:10,kind:'support',tgt:'self',fx:[{k:'cover',d:2},{k:'buff',stat:'def',m:1.3,d:3,self:true}],req:{ch:503},desc:'He takes the next blow meant for an ally, and is steadier afterwards.'},
   {id:'crowns_resolve',n:'Crown\'s Resolve',icon:'👑',mp:12,kind:'support',tgt:'allies',fx:[{k:'resolve',d:3}],req:{ch:505},desc:'The party resists illusion, fear, regret and charm for 3 turns.'},
   {id:'border_formation',n:'Border Formation',icon:'🏯',mp:14,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'def',m:1.25,d:3},{k:'buff',stat:'spd',m:1.2,d:3},{k:'foeAtkDown',m:.8,d:3}],req:{ch:510},sig:true,desc:'SIGNATURE. The party\'s DEF and SPD rise and the marked enemy\'s ATK falls.'},
   {id:'prince_decides',n:'The Prince Decides',icon:'⚜️',mp:16,kind:'support',tgt:'ally',fx:[{k:'extraTurn'}],once:true,req:{ch:510},desc:'Once per battle: one chosen ally acts again at half MP cost. He knows who should act, and when.'},
  ], evo:{tiers:[]}, bond:null };
ROSTER.push('aster'); XP_CLASS.aster = 'fighter';
GUEST_RULES.aster = {flag:'aster_temporary_guest', fromCh:493, sync:true, when:() => !G.flags.aster_guest_ends, note:'Prince Aster travels with the Crimson Guard as a temporary guest: he fights beside the five and does not take a seat.'};
const asterHere = () => !!G && typeof presentGuests==='function' && presentGuests().includes('aster') && !isDisabled('aster');
/* ---- battle hooks ---- */
function asterInBattle(){ return !!(typeof B!=='undefined' && B && B.allies && B.allies.some(a => a.id==='aster' && !a.dead)); }
(function(){
  const _res = resolve;
  resolve = function(u, s, t){
    _res(u, s, t);
    if(!u.ally || u.id==='aster' || !asterInBattle() || !B || B.over) return;
    const a = B.allies.find(x => x.id==='aster'), fx = s.fx || [], has = k => fx.some(f => f.k===k || (k==='defbuff' && f.k==='buff' && f.stat==='def'));
    let line = '';
    if(u.id==='jade' && s.kind==='support'){ a.bf.push({stat:'def', m:1.15, d:4}); line = 'DEF up'; }
    else if(u.id==='levi'){ a.bf.push({stat:'spd', m:1.12, d:4}); line = 'SPD up'; }
    else if(u.id==='sally' && (s.tgt==='foe' || s.tgt==='foes') && (s.kind==='support' || has('charm') || has('slow'))){ a.st.crit = {d:3}; line = 'sharper aim'; }
    else if(u.id==='sky' && (s.kind==='heal' || s.kind==='support')){ a.st.resolve = {d:3}; line = 'steadier against effects'; }
    else if(u.id==='devon' && (has('shield') || has('cover') || has('defbuff'))){ a.bf.push({stat:'atk', m:1.1, d:4}); a.bf.push({stat:'def', m:1.1, d:4}); line = 'ATK and DEF up'; }
    if(line) blog('  🌟 Aster studies '+u.name+'\'s '+s.n+': '+line+'.','good');
  };
})();
/* Royal Responsibility: at the start of his turn, an ally below 25% HP sharpens him */
function asterResponsibility(u){
  if(!B.allies.some(a => !a.dead && a !== u && a.hp/a.mhp < .25)) return;
  u.bf.push({stat:'def', m:1.15, d:2}); const m = Math.min(u.mmp-u.mp, 4); if(m>0) u.mp += m;
  blog('  '+u.name+' sees a friend in danger: his focus sharpens (DEF up, +'+m+' MP).','good');
}
/* ---- Royal Authority (field ability; Earned Authority once he has earned it) ---- */
const earnedAuthority = () => !!G.flags.aster_earned_authority || (G.ch >= 510 && regardOf(G.loc) >= 80);   // Welcome Guest or better where he has personally helped
const AUTH_TRUST_COST = 6;
function canAuthority(){ return asterHere() && G.ch >= 493; }
function authorityLeft(){ const e = expl(); return !(e.authLoc && e.authLoc[G.loc]); }
function armAuthority(){
  const e = expl(); if(!canAuthority()) return [];
  if(!authorityLeft()) return ['Aster has already invoked the Crown here.'];
  e.authLoc = e.authLoc || {}; e.authLoc[G.loc] = true; e.armed.authority = true;
  return ['⚜️ Aster formally requests access in his own name. (Royal Authority is ready for your next search here.)'];
}
function takeAuthority(){ const e = expl(); const v = !!e.armed.authority; e.armed.authority = false; return v; }
function authorityResult(){   // called when it is used on a clue: returns the log lines
  if(earnedAuthority()) return ['⚜️ Earned Authority: the people here open their doors to Aster freely, with no cost to their trust.'];
  const m = regardAdd(G.loc, -AUTH_TRUST_COST);
  return ['⚜️ Royal Authority opens the records, stores and officials at once, but cooperation that was commanded is not cooperation that was earned: Local Trust here falls.'+(m?' '+m:'')];
}
