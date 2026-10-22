/* =====================================================================
   TRIBUTE — ARC XX GUEST ROSTER (the author's designs): Aster = command, Elise = frontier control and logistics, Fen = analysis and debuffs,
   Tarin = scout and skirmisher. Temporary, player-controlled guests who fight beside the five (see aster.js for Aster).
   Presence: Elise from ch496 (flag elise_valen_rejoins), Fen from ch498 (fen_finds_altered_records), Tarin only once the story sets the flag tarin_joins (he has not
   joined yet). Each leaves when the story sets <id>_guest_ends. Portraits: Fen uses Yulan Fen's NPC portrait; Elise and Tarin are placeholders until portraits arrive.
   Border Accord (Aster's boss combo, ch510): needs Aster, Elise, Fen and Tarin together. All numbers first-pass.
   SWITCHED OFF (author's later brief): Elise, Fen and Tarin are NOT combat companions: Elise becomes a Dragonvale border ally and quest giver, Fen a research ally and Tarin a
   regional scout/contact (non-combat). The kits below stay as data; call enableArc20CombatGuests() to bring them back.
   ===================================================================== */
CHARACTERS.elise = {
  n:'Elise Valen', icon:'🦌', cls:'Frontier Commander', role:'Defensive support / battlefield control / logistics (Arc XX guest)', combat:'Frontier control and logistics', guestOnly:true,
  identity:'A practical border leader of the Valen frontier line, once Aster\'s chosen Crown Princess finalist: not flashy, the person who keeps the party standing when the field gets messy.',
  style:['Defence','Logistics','Frontier knowledge'], strength:'Keeping everyone on their feet',
  weapon:'Saber and a short bow', signature:'Frontier Stand', sigDesc:'The party\'s DEF rises, the enemy\'s ATK falls and the party resists being driven back or frightened.',
  base:{hp:112,mp:34,atk:12,mag:7,def:13,spd:10}, grow:{hp:9.6,mp:2.4,atk:1.2,mag:.6,def:1.4,spd:.9},
  skills:[
   {id:'frontier_cut',n:'Frontier Cut',icon:'🗡️',mp:0,kind:'phys',tgt:'foe',pow:1.05,req:{lvl:1},desc:'A plain saber cut.'},
   {id:'secure_the_line',n:'Secure the Line',icon:'🛡️',mp:7,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'def',m:1.2,d:2}],req:{lvl:1},desc:'Party DEF up for 2 turns.'},
   {id:'supply_discipline',n:'Supply Discipline',icon:'🎒',mp:6,kind:'support',tgt:'allies',fx:[{k:'mp',v:.1}],req:{lvl:2},desc:'Everything is rationed and in its place: a little MP back for the party.'},
   {id:'hold_the_crossing',n:'Hold the Crossing',icon:'🌉',mp:8,kind:'support',tgt:'foes',fx:[{k:'buff',stat:'spd',m:.8,d:2},{k:'buff',stat:'atk',m:.85,d:2}],req:{lvl:3},desc:'The foes are slowed and weakened at the choke point: SPD and ATK down.'},
   {id:'border_command',n:'Border Command',icon:'🚩',mp:7,kind:'support',tgt:'ally',fx:[{k:'buff',stat:'def',m:1.2,d:3},{k:'counter',d:3}],req:{lvl:4},desc:'One ally gains DEF and a chance to counterattack.'},
   {id:'winter_stores',n:'Winter Stores',icon:'🏔️',mp:9,kind:'support',tgt:'allies',fx:[{k:'regen',v:.05,d:3}],req:{lvl:5},desc:'Rations and blankets from the stores: a little regeneration for 3 turns.'},
   {id:'no_one_left_behind',n:'No One Left Behind',icon:'🤝',mp:11,kind:'support',tgt:'ally',fx:[{k:'noFall',d:3}],once:true,req:{lvl:6},desc:'Once per battle: one ally cannot fall below 1 HP for 3 turns.'},
   {id:'frontier_stand',n:'Frontier Stand',icon:'🏯',mp:13,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'def',m:1.25,d:3},{k:'foeAtkDown',m:.8,d:3},{k:'resolve',d:3}],req:{lvl:8},sig:true,desc:'SIGNATURE. Party DEF up, enemy ATK down, and resistance to being displaced or frightened.'},
  ], evo:{tiers:[]}, bond:null };
CHARACTERS.fen = {
  n:'Lady Yulan Fen', icon:'📜', cls:'Scholar Strategist', role:'Enemy analysis / debuffs / precision support (Arc XX guest)', combat:'Analysis and tactical debuffs', guestOnly:true,
  identity:'The Scholar\'s Daughter: she wins by understanding the fight before everyone else does. Not a healer or a damage dealer: her satisfaction comes from making the enemy easier for everyone else to dismantle.',
  style:['Analysis','Law and records','Debuffs'], strength:'Understanding the enemy',
  weapon:'Folding fan, brush talismans and a light dagger', signature:'Perfect Argument', sigDesc:'Several debuffs on one target, and the party hits it harder.',
  base:{hp:78,mp:48,atk:6,mag:12,def:7,spd:12}, grow:{hp:6.6,mp:3.4,atk:.6,mag:1.4,def:.8,spd:1.1},
  skills:[
   {id:'measured_strike',n:'Measured Strike',icon:'🪭',mp:0,kind:'magic',tgt:'foe',pow:.9,req:{lvl:1},desc:'A light, exact strike with the fan.'},
   {id:'cross_reference',n:'Cross-Reference',icon:'🔎',mp:5,kind:'support',tgt:'foe',fx:[{k:'analyze'},{k:'buff',stat:'def',m:.85,d:3}],req:{lvl:1},desc:'She checks the foe against the record: its weakness is revealed and its DEF falls.'},
   {id:'legal_precedent',n:'Legal Precedent',icon:'⚖️',mp:6,kind:'support',tgt:'foe',fx:[{k:'dispel'}],req:{lvl:2},desc:'Removes the beneficial effects from one enemy.'},
   {id:'contradiction_found',n:'Contradiction Found',icon:'❗',mp:7,kind:'support',tgt:'foe',fx:[{k:'buff',stat:'atk',m:.8,d:2},{k:'buff',stat:'mag',m:.8,d:2}],req:{lvl:3},desc:'The enemy\'s own logic undoes it: ATK and MAG fall for 2 turns.'},
   {id:'margin_note',n:'Margin Note',icon:'🖋️',mp:6,kind:'support',tgt:'ally',fx:[{k:'crit',d:3}],req:{lvl:4},desc:'A note in the margin: one ally sees the opening (crits).'},
   {id:'case_closed',n:'Case Closed',icon:'📕',mp:8,kind:'magic',tgt:'foe',pow:1.3,vsDebuffed:1.6,req:{lvl:5},desc:'Heavy bonus damage against an enemy already weakened or marked.'},
   {id:'fen_open_secrets',n:'Open Secrets',icon:'📜',mp:9,kind:'support',tgt:'foes',fx:[{k:'revealAll'}],req:{lvl:6},desc:'Every enemy\'s statuses and hidden traits are laid bare.'},
   {id:'perfect_argument',n:'Perfect Argument',icon:'🏛️',mp:14,kind:'support',tgt:'foe',fx:[{k:'buff',stat:'atk',m:.8,d:3},{k:'buff',stat:'def',m:.8,d:3},{k:'buff',stat:'spd',m:.85,d:3},{k:'mark',v:.3,d:3}],req:{lvl:8},sig:true,desc:'SIGNATURE. Several debuffs land on one target and the party hits it harder.'},
  ], evo:{tiers:[]}, bond:null };
CHARACTERS.tarin = {
  n:'Tarin Ash', icon:'🏹', cls:'Frontier Scout', role:'Speed / tracking / single-target pressure (Arc XX guest, when he joins)', combat:'Scout and skirmisher', guestOnly:true,
  identity:'Elise\'s childhood companion from the frontier, who left on a mission beyond the northern pass and never returned: a survivor, a guide and a mobile skirmisher, more field-hardened than Aster and less powerful than Levi. He has not joined yet.',
  style:['Tracking','Evasion','Throwing knives'], strength:'Speed and positioning',
  weapon:'Short spear or frontier blade, throwing knives', signature:'Border Ghost', sigDesc:'A flurry of rapid strikes, then the party is harder to hit.',
  base:{hp:92,mp:28,atk:13,mag:5,def:9,spd:16}, grow:{hp:8,mp:2,atk:1.6,mag:.4,def:1,spd:1.6},
  skills:[
   {id:'trail_strike',n:'Trail Strike',icon:'🗡️',mp:0,kind:'phys',tgt:'foe',pow:1.05,req:{lvl:1},desc:'A fast, light strike.'},
   {id:'quickstep',n:'Quickstep',icon:'👣',mp:5,kind:'support',tgt:'self',fx:[{k:'buff',stat:'spd',m:1.3,d:3},{k:'buff',stat:'eva',m:1.3,d:3}],req:{lvl:1},desc:'SPD and evasion up.'},
   {id:'mark_the_path',n:'Mark the Path',icon:'📍',mp:6,kind:'support',tgt:'foe',fx:[{k:'mark',v:.2,d:3}],req:{lvl:2},desc:'Marks an enemy: ranged and physical attacks deal more to it.'},
   {id:'flanking_cut',n:'Flanking Cut',icon:'⚔️',mp:7,kind:'phys',tgt:'foe',pow:1.5,vsDebuffed:1.4,req:{lvl:3},desc:'Extra damage if the target is already weakened or marked.'},
   {id:'scouts_warning',n:'Scout\'s Warning',icon:'📣',mp:6,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'eva',m:1.3,d:1}],req:{lvl:4},desc:'A call from the trail: party evasion up for 1 turn.'},
   {id:'dust_and_thorn',n:'Dust and Thorn',icon:'🌵',mp:7,kind:'support',tgt:'foe',fx:[{k:'slow',d:2},{k:'buff',stat:'atk',m:.9,d:2}],req:{lvl:5},desc:'Dust in the eyes and thorns underfoot: the foe is slowed and aims worse.'},
   {id:'survivors_instinct',n:'Survivor\'s Instinct',icon:'🩹',mp:8,kind:'heal',tgt:'self',pow:1.4,fx:[{k:'buff',stat:'def',m:1.3,d:3,self:true}],lowHp:true,req:{lvl:6},desc:'Only below 40% HP: he heals himself and his guard firms.'},
   {id:'border_ghost',n:'Border Ghost',icon:'👻',mp:13,kind:'phys',tgt:'foe',pow:.8,hits:3,fx:[{k:'buff',stat:'eva',m:1.3,d:1,allies:true}],req:{lvl:8},sig:true,desc:'SIGNATURE. Three rapid strikes, then the party is harder to hit for a turn.'},
  ], evo:{tiers:[]}, bond:null };
ROSTER.push('elise','fen','tarin'); XP_CLASS.elise = 'fighter'; XP_CLASS.fen = 'scholar'; XP_CLASS.tarin = 'ranger';
let ARC20_COMBAT_GUESTS = false;
GUEST_RULES.elise = {flag:'elise_valen_rejoins', fromCh:496, sync:true, when:() => ARC20_COMBAT_GUESTS && !G.flags.elise_guest_ends, note:'Lady Elise Valen, the frontier commander, fights beside the party while she travels with the Crimson Guard.'};
GUEST_RULES.fen = {flag:'fen_finds_altered_records', fromCh:498, sync:true, when:() => ARC20_COMBAT_GUESTS && !G.flags.fen_guest_ends, note:'Lady Yulan Fen fights beside the party as its scholar strategist while the frontier investigation lasts.'};
GUEST_RULES.tarin = {flag:'tarin_joins', sync:true, when:() => ARC20_COMBAT_GUESTS && !G.flags.tarin_guest_ends, note:'Tarin Ash, the frontier scout, fights beside the party once he joins.'};
const guestIn = id => !!(typeof B!=='undefined' && B && B.allies && B.allies.some(a => a.id===id && !a.dead));
const arc20Here = id => !!G && typeof presentGuests==='function' && presentGuests().includes(id) && !isDisabled(id);
const outdoorHere = () => { const l = LOCATIONS[G.loc]; return !!l && (l.kind==='field' || l.kind==='wild' || G.loc==='border_frontier' || G.loc==='tribute_wilderness'); };
/* ---- passives ---- */
// Regional Experience (Elise): a little less damage in frontier and outdoor fights (applied in hurt via arc20Reduce)
const arc20Reduce = t => (t.ally && guestIn('elise') && outdoorHere()) ? .95 : 1;
// Researcher's Eye (Fen): the first enemy is partly revealed when the fight opens; Prepared Notes: her debuffs last a turn longer (battle.js applyFx via arc20Notes)
const arc20Notes = (src, fx) => (src && src.id==='fen' && fx && fx.d && ['buff','slow','bind','charm','silence','burn','mark'].includes(fx.k)) ? Object.assign({}, fx, {d:fx.d+1}) : fx;
(function(){
  const _sb = startBattle;
  startBattle = function(spec){
    _sb(spec);
    if(typeof B==='undefined' || !B || !B.foes) return;
    if(guestIn('fen')){ const f = alive(B.foes)[0]; if(f){ f.known = true; blog('📜 Fen\'s eye catches the first foe: '+f.name+' is partly revealed.','good'); } }
  };
  // Logistics Mind (Elise): consumables used in battle are a little stronger
  const _bu = battleUseItem;
  battleUseItem = function(u, k, t){
    const hp0 = t ? t.hp : 0, mp0 = t ? t.mp : 0, ok = _bu(u, k, t);
    if(ok && guestIn('elise') && t){
      const gh = Math.round((t.hp - hp0) * .2), gm = Math.round((t.mp - mp0) * .2);
      if(gh > 0){ t.hp = Math.min(t.mhp, t.hp + gh); blog('  🎒 Elise\'s stores make it go further: +'+gh+' HP.','good'); }
      if(gm > 0){ t.mp = Math.min(t.mmp, t.mp + gm); }
    }
    return ok;
  };
})();
/* ---- exploration passives: Tarin's Pathfinder (fewer ambushes) and Old Trails (a minor encounter in a border zone may be skipped) ---- */
const tarinEdge = () => arc20Here('tarin');
const tarinSkips = () => arc20Here('tarin') && (G.loc==='border_frontier' || (LOCATIONS[G.loc] && LOCATIONS[G.loc].region==='tribute' && outdoorHere())) && Math.random() < .3;
/* ---- Border Accord: Aster's boss combo, needs all four guests ---- */
function enableArc20CombatGuests(){
  ARC20_COMBAT_GUESTS = true;
  if(!CHARACTERS.aster.skills.some(s => s.id==='border_accord')) CHARACTERS.aster.skills.push({id:'border_accord',n:'Border Accord',icon:'🪢',mp:20,kind:'support',tgt:'self',fx:[{k:'accord'}],once:true,needAllies:['aster','elise','fen','tarin'],req:{ch:510},desc:'The four guests act as one: the enemy is fully revealed and its ATK, DEF and SPD fall, the party\'s DEF and SPD rise, and Tarin strikes for free. Needs Aster, Elise, Fen and Tarin together.'});
}
