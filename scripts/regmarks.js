/* =====================================================================
   TRIBUTE — REGISTER MARKS (Arc VIII's first mechanic: the Register is not always right)
   A FINDING (evils.js) says what an entry IS once investigated (Corrupted, Preservation Construct...). A MARK says what is true of the RECORD ITSELF: whether the
   Register can be trusted on this entry. An entry can carry several marks at once, and marks never close a case or change the Resolved count.
     Verified               confirmed on the ground by an investigation
     Contradictory          two sources disagree about it
     Impossible             the records agree with each other and still cannot be true
     Deliberately Altered   somebody changed or removed it on purpose
     Identity Unresolved    the name is known but not who or what bears it
     Cross-Kingdom Match    the same name or entity turns up in more than one kingdom
   Marks come from evidence the party has already found (rules below) or from a chapter that sets the flag rm_<entry>_<mark> (so later chapters can add marks
   without new code: put 'rm_impossible_contradictory' in that chapter's CH_FLAGS). "Beyond the Fifteen": entries that do not fit the Fifteen at all, from the
   Impossible Entry (end of Arc VII). Marks appear from the epilogue of ch185 onward. First-pass wording and rules: edit freely.
   ===================================================================== */
const REG_MARKS = {
  verified:{icon:'✔️', n:'Verified', d:'Confirmed on the ground by an investigation.'},
  contradictory:{icon:'↔️', n:'Contradictory', d:'Two sources disagree about it.'},
  impossible:{icon:'♾️', n:'Impossible', d:'The records agree with each other and still cannot be true.'},
  altered:{icon:'✂️', n:'Deliberately Altered', d:'Somebody changed or removed it on purpose.'},
  unresolved:{icon:'❔', n:'Identity Unresolved', d:'The name is known, but not who or what bears it.'},
  crosskingdom:{icon:'🌐', n:'Cross-Kingdom Match', d:'The same name or entity appears in more than one kingdom.'},
};
const REG_MARK_KEYS = Object.keys(REG_MARKS);
const regInv = s => !!(G.flags && G.flags['inv_'+s]);
const resolvedNow = id => { const e = EVILS.find(x => x.id===id); return !!e && EVIL_RESOLVED.includes(evilState(e)); };
/* rules per entry: [mark, test]. An entry also has a mark if a chapter set rm_<entry>_<mark>. */
const REG_MARK_RULES = {
  thorned_widow:[['verified', () => resolvedNow('thorned_widow')]],
  mourning_hart:[['verified', () => resolvedNow('mourning_hart')]],
  hollow_king:[['verified', () => resolvedNow('hollow_king')], ['altered', () => regInv('sealed_kingdom')]],
  black_tide:[['altered', () => !!G.flags.fourth_entry_missing], ['verified', () => resolvedNow('black_tide')]],
  drowned_crown:[['contradictory', () => regInv('crown_origin')], ['altered', () => !!G.flags.sunken_records_suppressed], ['verified', () => resolvedNow('drowned_crown')]],
};
/* entries beyond the Fifteen */
const REG_EXTRA = [
  {id:'impossible', n:'The Impossible Entry', icon:'🗂️', open:() => !!G.flags.impossible_entry || G.ch >= 186,
   t:() => 'A name from the Register appears in three kingdoms (Tribute, Dragonvale and the Sunken Kingdom) on the same date, '+recordDate()+'. The dates are identical and the places are not.', extra:() => rCompare(),
   rules:[['crosskingdom', () => regInv('three_accounts') || !!G.flags.impossible_entry], ['impossible', () => regInv('no_copy_error')], ['unresolved', () => !!G.flags.impossible_entry]]},
];
/* the date the three records share: ch185 and ch186 write it Year 412, 7th Moon; ch187-190 write it Year 712, 3rd Month, 14th Day (author to confirm which is canon) */
const recordDate = () => (G.flags && G.flags.impossible_verified) || G.ch >= 187 ? 'Year 712, 3rd Month, 14th Day' : 'Year 412, 7th Moon';
/* ---- Cross-Kingdom Record Compare: the three records side by side. What each shows is revealed by the evidence found; contradictions are highlighted once the supporting evidence is in. */
const COMPARE_CARDS = [
  {k:'Tribute', as:'A visitor who arrived without escorts', port:'Haiyue Port (Sea-Moon Port): a trade hub and neutral city'},
  {k:'Dragonvale', as:'A natural phenomenon witnessed near the northern border', port:'Moonreach (Moon Bridge): a strategic trading post; restricted cargo, closed ledgers'},
  {k:'Sunken Kingdom', as:'A figure associated with a ritual at the coastal ruins', port:'Yueluo (Moon Anchorage): a sacred port, the meeting place of three tides'},
];
function rCompare(){
  const F = G.flags, showAs = !!F.name_without_body, showPort = !!F.haiyue_port_lead, genuine = !!F.impossible_verified;
  const card = c => `<div style="flex:1 1 140px;min-width:140px;border:1px solid rgba(128,128,128,.5);border-radius:8px;padding:6px"><b>${c.k}</b><div class="sm">📅 ${recordDate()}</div>
    <div class="sm" style="${showAs?'border-left:3px solid #d9a441;padding-left:5px':''}">${showAs ? '🧾 '+c.as : '🧾 ???'}</div>
    <div class="sm" style="${showPort&&true?'border-left:3px solid #9a6bd6;padding-left:5px':''}">${showPort ? '⚓ '+c.port : '⚓ ???'}</div></div>`;
  const verdicts = [['✔ The dates are identical in all three records.', true], ['✔ The records are genuine: translations, calendars and writing styles agree, and there is no sign of copying.', genuine], ['⚠ The three accounts disagree about what the name is.', showAs], ['⚠ The same port is recorded three ways, and later copies altered or omitted its destinations.', showPort]].filter(x => x[1]);
  return `<div class="sm" style="margin-top:6px"><b>Cross-Kingdom Record Compare</b></div><div style="display:flex;flex-wrap:wrap;gap:6px;margin:6px 0">${COMPARE_CARDS.map(card).join('')}</div>${verdicts.map(v => `<div class="sm">${v[0]}</div>`).join('')}`;
}
const regMarksOpen = () => !!G && !!G.flags && (!!G.flags.impossible_entry || G.ch >= 186);
function regMarksOf(id, rules){
  const out = [];
  (rules||[]).forEach(([m, test]) => { let t = false; try{ t = test(); }catch(e){} if(t && !out.includes(m)) out.push(m); });
  REG_MARK_KEYS.forEach(m => { if(G.flags['rm_'+id+'_'+m] && !out.includes(m)) out.push(m); });
  return REG_MARK_KEYS.filter(m => out.includes(m));
}
const evilMarks = e => regMarksOpen() ? regMarksOf(e.id, REG_MARK_RULES[e.id]) : [];
const regChip = m => `<span class="sm" title="${REG_MARKS[m].d}" style="margin-right:6px">${REG_MARKS[m].icon} ${REG_MARKS[m].n}</span>`;
function evilMarksLine(e){
  const ms = evilMarks(e); return ms.length ? `<div class="sm"><b>Record:</b> ${ms.map(regChip).join('')}</div>` : '';
}
function regMarksLegend(){
  return regMarksOpen() ? `<div class="sm" style="margin-top:4px"><b>Record marks:</b> ${REG_MARK_KEYS.map(m => REG_MARKS[m].icon+' '+REG_MARKS[m].n).join(' · ')}. A mark is about the Register's record, not the entity: an entry can carry several, and none of them changes the Resolved count.</div>` : '';
}
function rRegisterBeyond(){
  if(!regMarksOpen()) return '';
  const open = REG_EXTRA.filter(x => { try{ return x.open(); }catch(e){ return false; } }); if(!open.length) return '';
  return `<div class="panel"><b>BEYOND THE FIFTEEN</b><div class="sm">Entries that do not fit the old categories. They are not counted among the Fifteen.</div>`
    + open.map(x => { const ms = regMarksOf(x.id, x.rules); return `<div class="ev"><div><b>${x.icon} ${x.n}</b><div class="sm">${typeof x.t==='function' ? x.t() : x.t}</div>${x.extra ? x.extra() : ''}${ms.length ? `<div class="sm"><b>Record:</b> ${ms.map(regChip).join('')}</div>` : ''}</div></div>`; }).join('') + `</div>`;
}
const regMarkCount = () => EVILS.reduce((a, e) => a + evilMarks(e).length, 0) + REG_EXTRA.reduce((a, x) => a + (x.open() ? regMarksOf(x.id, x.rules).length : 0), 0);
deed('regmark1', 'hunt', 'The Register is not always right', '✂️', 'A mark was set on a Register entry: the record itself is in doubt.', () => regMarksOpen() && regMarkCount() >= 1);
deed('regmark_imp', 'hunt', 'Impossible, and recorded', '♾️', 'An entry was marked Impossible.', () => regMarksOpen() && regMarksOf('impossible', REG_EXTRA[0].rules).includes('impossible'));
