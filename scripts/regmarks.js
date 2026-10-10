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
   t:'A name from the Register appears in three kingdoms (Tribute, Dragonvale and the Sunken Kingdom) in Year 412, 7th Moon. The dates are identical and the places are not.',
   rules:[['crosskingdom', () => regInv('three_accounts') || !!G.flags.impossible_entry], ['impossible', () => regInv('no_copy_error')], ['unresolved', () => !!G.flags.impossible_entry]]},
];
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
    + open.map(x => { const ms = regMarksOf(x.id, x.rules); return `<div class="ev"><div><b>${x.icon} ${x.n}</b><div class="sm">${x.t}</div>${ms.length ? `<div class="sm"><b>Record:</b> ${ms.map(regChip).join('')}</div>` : ''}</div></div>`; }).join('') + `</div>`;
}
const regMarkCount = () => EVILS.reduce((a, e) => a + evilMarks(e).length, 0) + REG_EXTRA.reduce((a, x) => a + (x.open() ? regMarksOf(x.id, x.rules).length : 0), 0);
deed('regmark1', 'hunt', 'The Register is not always right', '✂️', 'A mark was set on a Register entry: the record itself is in doubt.', () => regMarksOpen() && regMarkCount() >= 1);
deed('regmark_imp', 'hunt', 'Impossible, and recorded', '♾️', 'An entry was marked Impossible.', () => regMarksOpen() && regMarksOf('impossible', REG_EXTRA[0].rules).includes('impossible'));
