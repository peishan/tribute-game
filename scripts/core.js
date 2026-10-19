/* =====================================================================
   TRIBUTE — CORE: state, save, progression (levels, bond, evolution)
   ===================================================================== */
const CFG = { SAVE_KEY:'tribute_rpg_v3', LEVEL_CAP:Infinity, START_LEVEL:1 };   // no level ceiling (author's decision)

// WHO JOINS WHEN (chapter number at which the hero is recruited). PROVISIONAL — correct these.
// Permanent joins. Chad and Sky both accept the mission in ch4 (Chad was hired in ch3, Sky first meets Jade in ch4). Sally 28 and Levi 30 match the comic's chapter titles. Devon open.
const EIRA_JOIN_CH = 147;   // Eira Solenne is recruited after Arc V ends (ch146): an area guest in the Broken Seals until then
const RIN_JOIN_CH = 172;   // Rin is an area guest in the north from ch149, and joins the party for good at ch172 (when she sails with the expedition)
const JOIN_CH = { damien:351, jade:0, chad:4, sky:4, sally:29, levi:30, ripley:52, devon:54, seraphina:87, ghost_healer:88, rin:RIN_JOIN_CH, eira:EIRA_JOIN_CH };   // sally: introduced ch28, recruited ch28/29 per the author (29 provisional); levi leaves temporarily later (chapter TBD); devon open   // ch4 "We are in": Chad (hired in ch3) and Sky accept the mission together
// Guest (temporary) party members. (None yet: the ch4 "Sally guest" came from the discarded story-file list. Per the comic Sally appears in ch28.)
const GUEST_CH = { seraphina:73 };   // guest (temporary Roc replacement) inside Dragonvale from ch73; joins permanently at ch87 when she asks to
// Chapter at which a hero's profile becomes visible even before they join ("Chad profile / Sky profile" unlock in ch1).
const INTRO_CH = { damien:340, eira:129, rin:149, ghost_healer:88, seraphina:65, chad:1, sky:1, sally:28, ripley:46, devon:47 };
// Bond changes shown by the comic's banners (bond points with Jade; level thresholds in BOND_LEVELS). Applied when the chapter completes.
const CH_BOND = { 98:{sky:5}, 93:{sky:10}, 94:{sky:10}, 59:{chad:-9999}, 24:{sky:20}, 25:{chad:20}, 27:{chad:-20}, 29:{sky:20}, 31:{chad:-40}, 32:{levi:20}, 33:{levi:20, chad:-20}, 34:{levi:20, chad:-10}, 38:{levi:20, sky:20}, 39:{levi:20, chad:-5}, 40:{levi:20, sky:20} };   // banners: ch31 Jade+Chad -2, ch32 Jade+Levi +1, ch33 Jade+Levi +1 / Jade+Chad -1 (Sky+Levi and Chad+Sally banners not modelled)
const profileKnown = id => isRecruited(id) || !!(G.left && G.left[id]) || (INTRO_CH[id]!==undefined && G.ch >= INTRO_CH[id]);
// Story flags set when a chapter is completed (e.g. Levi's crossbow goes to Jade in ch30).
const CH_FLAGS = { 429:['woman_who_survived'], 431:['no_strings'], 428:['royal_seal_lysenne'], 433:['sally_confirmed_princess'], 434:['levi_same_person'], 435:['sally_by_choice'], 436:['sally_rejoins'], 413:['levi_two_women'], 414:['sally_not_convinced'], 415:['carly_notices'], 416:['royal_melody'], 417:['sally_confronts_levi'], 418:['sally_told_of_princess'], 419:['sally_will_not_be_symbol'], 420:['gate_tavern_night'], 421:['morning_without_promises'], 422:['sally_realises_she_wanted_more'], 423:['princess_nurse_found'], 424:['girl_before_sally'], 425:['levi_steps_back'], 426:['levi_not_regret'], 427:['sally_admits_more'], 430:['marriage_lesson'], 432:['zhaoning_confirmed'], 412:['levi_waits_for_proof'], 399:['jade_let_hugh_decide'], 406:['lysenne_song'], 407:['levi_considers_sally'], 408:['one_more_stop'], 409:['princess_survived'], 410:['name_beside_date'], 411:['princess_may_be_found'], 402:['hugh_asks_people'], 405:['royal_seal_found'], 396:['princess_new_identity'], 397:['sera_caught'], 398:['sera_confides'], 400:['lysenne_known'], 401:['letters_from_home'], 403:['hugh_notices_sera'], 404:['hugh_seeks_sera'], 387:['hugh_revisits_mission'], 388:['levi_file_reopened'], 389:['king_joins'], 390:['expedition_departed'], 391:['road_beyond_reports'], 392:['sera_seeks_hugh'], 393:['surviving_record_found'], 394:['princess_music_clue'], 395:['adrian_rest'], 376:['marriage_register_checked'], 377:['twin_birth_ledger'], 378:['foster_rearing_system'], 379:['separation_was_political'], 380:['palace_system_faced'], 381:['roc_knows_twin'], 382:['devon_twin_acknowledged'], 383:['records_corrected'], 384:['house_xuanji_known'], 385:['aster_chooses'], 386:['arc15_complete', 'crown_princess_chosen'], 362:['candidate_dossiers'], 363:['devon_explains_aster'], 364:['aster_asks_help'], 365:['court_candidates_presented'], 366:['behind_the_dossier'], 367:['general_niece_met'], 368:['scholar_daughter_met'], 369:['border_lady_met'], 370:['candidates_want'], 371:['aster_listens'], 372:['jade_questions'], 373:['devon_advice'], 374:['not_an_interrogation'], 375:['border_lady_alone'], 359:['delilah_standing'], 360:['jade_delilah_reconciled'], 361:['arc14_complete','delilah_wife','damien_courtship'], 349:['damien_debt_declared'], 350:['delilah_objects'], 351:['trail_beyond_garrisons'], 352:['moving_village_found'], 353:['woman_found'], 354:['repayment_rejected'], 355:['damien_stays'], 356:['frontier_agreement'], 357:['ledger_names_known'], 358:['northwatch_held'], 337:['dragonvale_request'], 338:['delilah_working'], 339:['supplies_diverted'], 340:['damien_met'], 341:['damien_merit_for_delilah'], 342:['convoys_traced'], 343:['forgeries_and_numbers'], 344:['delilah_acknowledges'], 345:['delilah_apology_given'], 346:['contract_house_found'], 347:['damien_qilang_reaction'], 348:['damien_tribal_woman'], 323:['first_division'], 324:['dima_path_known'], 325:['xima_path_known'], 326:['no_pure_branch'], 327:['four_visions_known'], 328:['memory_not_prophecy'], 329:['lie_that_feels_true'], 330:['future_can_change'], 331:['ancestral_sight'], 332:['voice_in_bloodline'], 333:['false_ancestor'], 334:['inheritance_is_choice'], 335:['remnant_broken', 'boss_boss_xima_remnant'], 336:['arc13_complete'], 312:['sera_rejoined', 'sanctuary_responded'], 313:['western_return'], 314:['valor_name_meaning'], 315:['sisters_confirmed'], 316:['sanctuary_opened'], 317:['mother_prayer_found'], 318:['elara_young_seen'], 319:['elara_chose_tribute'], 320:['yvette_wandered'], 321:['sky_inheritance'], 322:['bloodline_predates_witches'], 287:['western_ship_arrived'], 288:['asterwyn_found'], 289:['captain_testimony'], 290:['western_seal_found'], 291:['western_sea_route'], 292:['markers_confirmed'], 293:['lantern_route'], 294:['valen_record_found'], 295:['frontier_port_found'], 296:['merchant_ledgers_found'], 297:['western_road_followed'], 298:['prayer_recalled'], 299:['valor_mark_identified'], 300:['children_open_sky'], 301:['valor_branches_known'], 302:['western_archive_found'], 303:['dima_foreign_record'], 304:['xima_branch_known'], 305:['common_ancestry_known'], 306:['register_erasure_known'], 307:['vision_looks_back'], 308:['valor_sight_named'], 309:['sanctuary_seen'], 310:['wider_map_added'], 311:['arc12_complete'], 273:['mirelle_study_opened'], 274:['falcon_interception'], 275:['northern_road_found'], 276:['northwatch_cleared'], 277:['fraud_transfers_known'], 278:['mirelle_alive'], 279:['crestfall_found'], 280:['mirelle_rescued','boss_boss_prison_breakout'], 281:['mirror_known'], 282:['veyne_judged','boss_boss_veyne_champion'], 283:['mirelle_advisor'], 284:['delilah_studies_2'], 285:['royal_guard_formation'], 286:['rheon_mirelle_possibility','arc11_complete'], 271:['supply_lead_found','northwatch_lead','delilah_notes'], 272:['veyne_estate_visited','veyne_staff_purged','mirelle_hidden_letter'], 263:['rheon_joined','companion_assignments','sera_stays_altan'], 264:['rin_on_frontier','eira_on_leave'], 265:['mirelle_message'], 266:['mirelle_missing'], 267:['mirelle_dossier'], 268:['delilah_student'], 269:['delilah_reconciliation_1'], 270:['mirelle_petition_suspended'], 236:['sera_homesick'], 237:['altan_letter_read'], 238:['sera_brother_known'], 239:['altan_route_open'], 240:['altan_border_reached'], 241:['prince_rheon_missing'], 242:['sera_leads_search'], 244:['sera_reads_letter_twice','jade_notices_sera'], 245:['falcon_inheritance_recognised'], 246:['falcon_three_states_known'], 247:['falcon_terrains_known'], 248:['prince_mission_deliberate'], 249:['first_abandoned_camp'], 250:['escort_survivors_found'], 251:['altan_prince_known','altan_prince_rescued'], 252:['siblings_reunited'], 253:['old_seal_weakening'], 254:['lost_regiment_known'], 255:['sera_commands'], 256:['battlefield_threat_named','greyson_concern'], 257:['sera_falcon_mastery','boss_boss_pass_threat'], 258:['sera_two_tables'], 259:['matchmaking_failure_1'], 260:['private_report_disaster','matchmaking_failure_2'], 261:['banquet_disaster','matchmaking_failure_3'], 262:['altan_open','no_more_matchmaking','conversation_without_help','sera_greyson_interest_confirmed','greyson_sera_awareness_begun','altan_brother_hook'], 227:['dragonvale_accord_found'], 228:['records_two_reasons'], 229:['adrian_evelyne_engaged'], 230:['greyson_blessing','jade_childhood_clearer'], 221:['court_gathering_called'], 222:['evelyne_revealed'], 223:['adrian_accepts_evelyne'], 224:['evelyne_returned','evelyne_official'], 225:['adrian_evelyne_open'], 226:['court_doubts_match'], 216:['old_checkpoint_found','adrian_home'], 217:['sealed_records_opened'], 218:['secondary_envoy_found','eve_knows_courts'], 219:['adrian_eve_promise'], 220:['alliance_divided_records'], 211:['old_route_seal_found'], 212:['adrian_eve_together'], 213:['diplomatic_seal_removed','rm_impossible_altered'], 214:['warehouse_ambush_survived'], 215:['letters_kept'], 231:['last_witness_found'], 232:['alliance_history_pieced'], 233:['cooperation_begun','impossible_entry_open'], 234:['evelyne_wed','eve_left'], 235:['arc9_complete','adrian_home','wider_network_hinted','adrian_official'], 198:['marroway_request'], 199:['marroway_night'], 200:['lucien_alerted'], 201:['marroway_villagers'], 202:['devon_accountability'], 203:['sally_left_lucien'], 204:['marroway_fallen'], 205:['sally_separated','sally_never_remarry'], 206:['fourth_record'], 207:['eve_ally'], 208:['pattern_across_kingdoms'], 209:['name_is_framework'], 210:['register_beyond_fifteen','arc8_complete'], 191:['sally_married'], 192:['sally_tavern_seen'], 193:['sally_handmaiden_concern'], 194:['marroway_levies'], 195:['marroway_diverted_goods'], 196:['marroway_testimony'], 197:['marroway_ledger'], 178:['rocduty_faces_past'], 180:['rocduty_respects'], 185:['rocduty_protects'], 186:['impossible_report_sent'], 187:['impossible_verified','rm_impossible_verified'], 188:['name_without_body','rm_impossible_contradictory'], 189:['neutral_archives_lead'], 190:['haiyue_port_lead','rm_impossible_altered'], 179:['crown_is_council'], 180:['false_choice_rejected','crown_trials_passed'], 181:['tide_truth_known'], 182:['black_tide_restored','drowned_crown_reclassified'], 183:['ancient_alliance_known'], 184:['pearl_authority_restored'], 185:['sunken_kingdom_remembered','register_doubted','impossible_entry','arc8_unlocked'], 167:['black_tide_reported'], 168:['adrian_eve_gray'], 169:['pearl_resonates'], 170:['sunken_records_suppressed'], 171:['aelyndra_named'], 172:['black_tide_met'], 173:['sunken_kingdom_found'], 174:['deliberate_submersion'], 175:['maris_met'], 176:['pearl_purpose'], 177:['drowned_crown_met'], 178:['roc_inheritance_known'], 156:['hart_resolved','valley_protected'], 158:['hollow_king_met','gold_lineage_hunted'], 159:['fifteen_designated'], 160:['crownless_king_known'], 161:['hollow_king_contained','sera_shift_known'], 162:['three_truths'], 163:['register_rewritten'], 164:['fourth_entry_missing'], 165:['nameless_witness_met'], 166:['mandate_resolve'], 110:['hale_met'], 111:['royal_link_known'], 114:['third_faction_known','people_behind_found','symbol_traced','faction_identified'], 115:['valen_secret','valen_prophecy_link'], 116:['archive_defended'], 117:['yvette_truth','sky_pendant_mother'], 119:['choice_prophecy'], 122:['omen_seen'], 123:['cael_met'], 124:['first_seal_found'], 125:['forgotten_light_found'], 126:['seris_met'], 127:['sanctuary_purpose'], 128:['guiding_map_found'], 129:['eira_met'], 131:['celestial_found'], 133:['seal_message_seen'], 134:['one_hand_known'], 135:['varyn_met'], 137:['seal_kinds_known'], 138:['forgotten_world_seen'], 139:['barrier_people'], 140:['oath_changed'], 141:['oath_original'], 142:['sisters_together'], 143:['returning_light'], 144:['ardyn_inheritance'], 145:['adviser_known'], 146:['truth_before_curse','arc5_complete'], 147:['fifteen_named'], 148:['first_evil_hunt'], 149:['rin_met'], 152:['widow_resolved'], 154:['hart_found'], 155:['burial_ground_known'], 118:['valen_restored'], 76:['warriors_insight','royal_sense'], 103:['jade_dragon_harmony','husband_wife_truth'], 99:['princess_of_tribute'], 100:['visions_shared'], 90:['gold_family_met'], 93:['sky_resembles_yvette'], 94:['sky_pendant_lost'], 88:['ghost_healer_met'], 86:['dragonvale_honoured'], 82:['aster_crown_prince'], 75:['dv_purify','partner_actions'], 77:['princess_guardian','royal_spirit_authority','dv_exploration'], 87:['levi_reborn','sally_stays','liora_apart','seraphina_free'], 73:['roc_exiled','liora_ward'], 63:['chad_dark_arts'], 67:['chad_dark_deep'], 70:['chad_backlash_1'], 71:['chad_backlash_2'], 72:['chad_backlash_3'], 59:['roc_severed'], 60:['jade_poisoned'], 58:['royal_attire'], 52:['sally_gossip'], 42:['jade_awakened'], 44:['bracelet'], 51:['sally_noble'], 0:['greyson_gift'], 38:['cleansing_touch'], 41:['greyson_arms'], 30:['crossbow'] };   // greyson_arms: dagger+flail unseal at the major battle, chapter 41 (per the author)
// Items handed over when a chapter completes. Greyson gives Jade a dagger and flail in the Prologue; she may not use them until the major battle (chapter TBD, flag greyson_arms).
const CH_ITEMS = { 111:[{id:'yvette_portrait',qty:1}], 90:[{id:'childhood_charm',qty:1}], 87:[{id:'divorce_scroll',qty:1},{id:'skyward_staff',qty:1},{id:'healers_robes',qty:1}], 58:[{id:'royal_attire',qty:1},{id:'phoenix_guard',qty:1}], 44:[{id:'sealed_box',qty:1}], 0:[{id:'greyson_dagger',qty:1},{id:'greyson_flail',qty:1}] };   // (the communication bracelet comes from the Greyson mission m_bracelet, see world.js)

let G = null;
const $ = id => document.getElementById(id);
const AR = a => a[Math.floor(Math.random()*a.length)];
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));

function newState(){
  const s = Object.assign({ v:3, ch:-1, flags:{}, units:{}, party:[], inv:{}, bestiary:{}, gold:50, read:{} }, worldDefaults());
  ROSTER.forEach(id => s.units[id] = { lv:CFG.START_LEVEL, xp:0, bp:0, evo:[], nodes:[] });
  s.party = ['jade']; s.active = ['jade']; s.guests = {}; s.gear = {}; s.disabled = {}; s.left = {};
  return s;
}
function save(){ try{ G.savedAt = Date.now(); localStorage.setItem(CFG.SAVE_KEY, JSON.stringify(G)); }catch(e){} }
function load(){
  try{
    const d = JSON.parse(localStorage.getItem(CFG.SAVE_KEY));
    if(!d) return false;
    G = Object.assign(newState(), d); G.guests = G.guests || {}; G.gear = G.gear || {}; G.disabled = G.disabled || {}; G.left = G.left || {}; G.active = (G.active||['jade']).filter(id=>G.party.includes(id));
    ROSTER.forEach(id => { G.units[id] = G.units[id] || { lv:1, xp:0, bp:0, evo:[] }; G.units[id].nodes = G.units[id].nodes || []; });
    return true;
  }catch(e){ return false; }
}
const U = id => G.units[id];
// Story states. DISABLED: stays in the party but cannot fight. LEAVE: leaves the party (data kept).
const CH_DISABLE = { 42:['sky'] };   // Sky is critically cursed in ch42; no recovery chapter decided yet (Dev tab can clear it)
// PROVISIONAL chapter numbers (75+ not yet planned): Levi returns "reborn" before the party goes home; Sally stays in Dragonvale when the party returns to Tribute.
const CH_EQUIP = { 87:{sky:['skyward_staff','healers_robes']} };   // gear equipped automatically when the chapter completes
const CH_RETURN = { 87:['levi'] };   // ch87 (author): Levi's rejoin / return to Tribute
const FIXED_PARTY_CH = 102;   // from the departure beyond Tribute the party is fixed: Jade, Devon, Seraphina, Levi, Sky all fight (no slots); the Ghost Healer is a hidden passive companion
const FIXED_FIVE = ['jade','devon','seraphina','levi','sky'];
const fixedParty = () => !!G && G.ch >= FIXED_PARTY_CH;
const fixedFive = () => (G && G.ch >= 436) ? ['jade','devon','levi','sky','sally'] : FIXED_FIVE;   // ch436 (author): the canon party is Jade, Devon, Levi, Sky and Sally; Sera stays on the roster, benched
const CH_STAY = { 87:['sally'] };   // leaves the party but stays reachable as a Dragonvale rumour source
const CH_ENABLE = { 61:['sky'] };   // Sky is healed after chapter 61 and returns to active duty
const CH_LEAVE = { 50:['levi'], 73:['chad'], 87:['ripley'] };   // ch87: Levi is back, so Ripley returns to being Jade's attendant (the travelling party is fixed at five: Jade, Devon, Seraphina, Levi, Sky)    // Levi leaves the party in ch50 (mutual end of the engagement)
// Sally (after the return to Tribute, CH_STAY) can only be partied while the party is in Dragonvale.
const isAway = id => (id==='sally' && !!G.flags.sally_stays && G.loc!=='dragon_vale' && G.ch < 436) || (id==='seraphina' && !!G.guests.seraphina && LOCATIONS[G.loc].region!=='dragon') || (id==='seraphina' && G.ch>=262 && !G.flags.sera_rejoined && LOCATIONS[G.loc].region!=='altan') || (id==='rin' && typeof rinAway==='function' && rinAway());   // Seraphina is a guest only inside Dragonvale until ch87
const isDisabled = id => !!(G.disabled && G.disabled[id]) || isAway(id);
function syncAway(){ G.active = G.active.filter(id => !isAway(id)); }   // call whenever the location changes
function applyStoryStates(n){
  (CH_DISABLE[n]||[]).forEach(id => { if(G.party.includes(id)) G.disabled[id] = true; });
  (CH_ENABLE[n]||[]).forEach(id => { delete G.disabled[id]; });
  (CH_RETURN[n]||[]).forEach(id => { delete G.left[id]; if(!G.party.includes(id)) G.party.push(id); });
  if(n===FIXED_PARTY_CH){ FIXED_FIVE.forEach(id => { if(!(G.left && G.left[id]) && !G.party.includes(id)) G.party.push(id); }); G.active = FIXED_FIVE.filter(id => G.party.includes(id)); }
  syncAway();
  (CH_LEAVE[n]||[]).forEach(id => { G.party = G.party.filter(x => x!==id); G.active = G.active.filter(x => x!==id); G.left[id] = true; });
}
const isRecruited = id => G.party.includes(id);

/* ---------- levels & stats ---------- */
/* Per-class XP tables: xp to next level = a + b*lv + c*lv^2. Martial damage dealers climb a little faster, support and casters a little slower.
   Level 1 -> 2 / level 30 / level 60 / level 100 (xp for that step):
     standard   63 / 1,780 / 5,680 / 14,240      swift fighters 59 / 1,640 / 5,230 / 13,100      support 69 / 1,940 / 6,160 / 15,500
     scholars   72 / 2,060 / 6,440 / 16,000 */
const XP_TABLES = {
  standard:{a:40, b:22, c:1.2},
  fighter:{a:36, b:20, c:1.1},     // Roc, Seraphina: martial burst
  ranger:{a:38, b:21, c:1.15},     // Levi, Ripley, Sally: agile
  support:{a:44, b:24, c:1.3},     // Sky, the Ghost Healer
  scholar:{a:46, b:25, c:1.35},    // Devon: defensive mage
};
const XP_CLASS = {jade:'standard', chad:'fighter', seraphina:'fighter', levi:'ranger', ripley:'ranger', sally:'ranger', sky:'support', ghost_healer:'support', devon:'scholar', rin:'ranger', cael:'support', eira:'support'};
const xpToNext = (lv, id) => { const t = XP_TABLES[XP_CLASS[id] || 'standard']; return Math.round(t.a + lv*t.b + lv*lv*t.c); };

function gearBonus(id){ return typeof gearBonusSum==='function' ? gearBonusSum(id) : {hp:0,mp:0,atk:0,mag:0,def:0,spd:0}; }   // see gear.js

function evoMult(id, stat){
  const tiers = CHARACTERS[id].evo.tiers;
  return U(id).evo.reduce((m,eid) => { const t = tiers.find(x=>x.id===eid); return m * ((t && t.mult && t.mult[stat]) || 1); }, 1);
}
// Permanent stat changes from Roc's dark-magic backlash (chapters 70-72; the author's plan). Multipliers on base stats.
const BACKLASH = { chad_backlash_1:{hp:.92, def:.92, mag:1.35}, chad_backlash_2:{spd:.9, hp:.94, mag:1.2}, chad_backlash_3:{hp:.9, def:.9, atk:1.1, mag:1.15} };
const REBORN_LEVI = {atk:1.15, mag:1.2, spd:1.1, hp:.95};   // draft: "reborn" Levi is not the same man as before
const clsOf = id => (id==='levi' && G && G.flags.levi_reborn) ? 'Noble Ranger' : (id==='chad' && G && G.ch>=170) ? 'Maritime Envoy' : (id==='chad' && G && G.flags.roc_reborn) ? 'Fallen Dragon Prince' : CHARACTERS[id].cls;
// Portrait variants: assets/party/<id>_noble.webp (Sally from ch51) and <id>_reborn.webp (Levi); a missing file falls back to the base portrait.
const PORTRAIT_VARIANTS = {adrian_wed:true, adrian_official:true, eve_gray:true, evelyne_pre:true, evelyne_wed:true};   // set to true when assets/npc/adrian_wed.webp (the red dragon robes after the royal wedding) and adrian_official.webp (the married court official) exist; eve_gray: assets/party/eve_gray.webp is Evelyne in her male disguise (before the reveal), evelyne.webp the princess she is revealed to be
/* the wedding portraits last only while the 14-day celebration runs (weddingThemeActive in arc9.js); after that everyone goes back to their default portraits */
const inWeddingWindow = () => typeof weddingThemeActive==='function' && weddingThemeActive();
const portrait = id => (id==='evelyne' ? (PORTRAIT_VARIANTS.eve_gray && !(G && G.flags && G.flags.evelyne_revealed) ? 'assets/party/eve_gray.webp' : PORTRAIT_VARIANTS.evelyne_wed && inWeddingWindow() ? 'assets/party/evelyne_wed.webp' : PORTRAIT_VARIANTS.evelyne_pre && G && G.flags && G.flags.evelyne_revealed && !G.flags.evelyne_wed ? 'assets/party/evelyne_pre.webp' : 'assets/party/evelyne.webp') : id==='adrian' ? (PORTRAIT_VARIANTS.adrian_wed && inWeddingWindow() ? 'assets/npc/adrian_wed.webp' : PORTRAIT_VARIANTS.adrian_official && G && G.flags && G.flags.adrian_official ? 'assets/npc/adrian_official.webp' : 'assets/npc/adrian.webp') : 'assets/party/'+id+((id==='sally' && G && G.flags.sally_rejoins) ? '_return' : (id==='sally' && G && G.flags.sally_noble) ? '_noble' : (id==='levi' && G && G.flags.levi_reborn) ? '_reborn' : (id==='chad' && G && G.ch>=170) ? '_envoy' : (id==='jade' && G && G.ch>=277) ? '_winter' : '')+'.webp');
function backlashMult(id, s){
  if(id==='levi' && G && G.flags.levi_reborn) return REBORN_LEVI[s]||1;
  if(id!=='chad' || !G) return 1;
  return Object.keys(BACKLASH).reduce((m,f) => m * ((G.flags[f] && BACKLASH[f][s]) || 1), 1);
}
function statsOf(id){
  const c = CHARACTERS[id], lv = U(id).lv, gb = gearBonus(id), ps = passivesOf(id), out = {};
  STATS.forEach(s => { out[s] = Math.round((c.base[s] + c.grow[s]*(lv-1)) * evoMult(id,s) * ((ps.mult[s])||1) * backlashMult(id,s) * ((id==='seraphina' && s==='atk' && G && G.flags && G.flags.sera_falcon_mastery) ? 1.1 : 1)) + (gb[s]||0); });
  return out;
}

/* ---------- skill tree: points, nodes, passives ---------- */
const nodeList = id => SKILLTREE[id].reduce((a,b) => a.concat(b.nodes.map((n,i) => Object.assign({}, n, {branch:b.id, idx:i, cost:NODE_COST[i], prev:i? b.nodes[i-1].id : null}))), []);
const nodeById = (id,nid) => nodeList(id).find(n => n.id===nid);
const spEarned = id => (U(id).lv-1) + 3*U(id).evo.length;
const spSpent  = id => U(id).nodes.reduce((a,nid) => a + (nodeById(id,nid)||{cost:0}).cost, 0);
const spFree   = id => spEarned(id) - spSpent(id);
function nodeState(id, n){
  if(U(id).nodes.includes(n.id)) return 'taken';
  if(!treeOpen(id)) return 'sealed';
  if(n.prev && !U(id).nodes.includes(n.prev)) return 'locked';
  return spFree(id) >= n.cost ? 'ready' : 'short';
}
function takeNode(id, nid){ const n = nodeById(id,nid); if(!n || nodeState(id,n)!=='ready') return false; U(id).nodes.push(nid); save(); return true; }
const respecCost = id => 50 + U(id).lv*10;
function respec(id){ if(!U(id).nodes.length || G.gold < respecCost(id)) return false; G.gold -= respecCost(id); U(id).nodes = []; save(); return true; }
// Passives granted by story flags (ch77 rewards): Jade 'Princess Guardian', Devon 'Royal Spirit Authority'
const STORY_PASSIVES = [
  {id:'jade', flag:'princess_guardian', mult:{hp:1.06, def:1.06}},
  {id:'devon', flag:'royal_spirit_authority', mult:{mag:1.08, mp:1.05}},
  {id:'jade', flag:'jade_dragon_harmony', mult:{def:1.05, mag:1.04}},
  {id:'devon', flag:'jade_dragon_harmony', mult:{def:1.05, atk:1.04}},
];
function passivesOf(id){
  const out = {mult:{}, critB:0, evaB:0};
  const add = p => { if(!p) return; Object.keys(p.mult||{}).forEach(k => out.mult[k] = (out.mult[k]||1)*p.mult[k]); out.critB += p.critB||0; out.evaB += p.evaB||0; };
  if(!G || !U(id)) return out;
  if(SKILLTREE[id]) nodeList(id).forEach(n => { if(n.passive && U(id).nodes.includes(n.id)) add(n.passive); });
  STORY_PASSIVES.forEach(sp => { if(sp.id===id && G.flags[sp.flag]) add(sp); });
  const bl = bondLevel(id);
  (BONDTREE[id]||[]).forEach(b => { if(b.passive && bl >= b.lvl) add(b.passive); });
  return out;
}

/* ---------- skills ---------- */
function reqText(r){
  if(!r) return '';
  if(r.lvl) return 'Level '+r.lvl;
  if(r.bond) return 'Bond '+r.bond+' with Jade';   // (Jade: average companion bond)
  if(r.flag) return r.flag==='jade_awakened' ? 'Story: Jade\'s partial awakening (chapter 42)' : (r.flag==='sky_train_2'||r.flag==='sky_train_3') ? 'Training: Sky\'s apprenticeship with the Ghost Healer' : r.flag==='roc_reborn' ? 'Story: purify Roc (the Fallen Prince\'s Trial)' : r.flag==='dv_purify' ? 'Story: the border unrest (chapter 75)' : r.flag==='partner_actions' ? 'Story: the border unrest (chapter 75)' : r.flag==='jade_dragon_harmony' ? 'Story: Jade and Devon become husband and wife in truth (chapter 103)' : r.flag==='levi_reborn' ? 'Story: Levi returns reborn (chapter 87)' : r.flag==='chad_dark_arts' ? 'Story: Roc begins to learn the dark arts (chapter 63)' : r.flag==='chad_dark_deep' ? 'Story: Roc\'s dark arts deepen (chapter 67)' : r.flag==='sally_noble' ? 'Story: Sally\'s noble title (chapter 51)' : r.flag==='cleansing_touch' ? 'Story: Jade\'s restoring power (chapter 38)' : r.flag==='greyson_arms' ? 'Not usable until the major battle (chapter TBD)' : 'Story: '+r.flag;
  return '';
}
function reqMet(id, r){
  if(!r) return true;
  if(r.lvl && U(id).lv < r.lvl) return false;
  if(r.bond && bondLevel(id) < r.bond) return false;
  if(r.flag && !G.flags[r.flag]) return false;
  return true;
}
function skillsOf(id){
  const c = CHARACTERS[id], out = [];
  c.skills.filter(s => !(s.hideFlag && G && G.flags && G.flags[s.hideFlag])).forEach(s => out.push(Object.assign({}, s, { ok:reqMet(id,s.req), why:reqText(s.req) })));
  if(c.bond) out.push(Object.assign({}, c.bond, { bondSkill:true, ok:reqMet(id,c.bond.req), why:reqText(c.bond.req) }));
  c.evo.tiers.forEach(t => (t.skills||[]).forEach(s => out.push(Object.assign({}, s, { evoSkill:true, ok:U(id).evo.includes(t.id), why:'Evolve: '+t.n }))));
  if(SKILLTREE[id]) nodeList(id).forEach(n => { if(n.skill) out.push(Object.assign({}, n.skill, { treeSkill:true, ok:U(id).nodes.includes(n.id), why:'Skill tree: '+n.n })); });
  (BONDTREE[id]||[]).forEach(b => { if(b.skill) out.push(Object.assign({}, b.skill, { bondSkill:true, ok:bondLevel(id)>=b.lvl, why:(id==='jade'?'Party bond ':'Bond ')+b.lvl })); });
  return out;
}

/* ---------- bond (with Jade) ---------- */
function bondLevel(id){
  if(id==='jade'){ const o = G.party.filter(x => x!=='jade' && !CHARACTERS[x].placeholder && !isCompanion(x)); return o.length ? Math.floor(o.reduce((a,x) => a + bondLevel(x), 0)/o.length) : 0; }
  const bp = U(id).bp; let l = 0;
  BOND_LEVELS.forEach((need,i) => { if(bp >= need) l = i; });
  return l;
}
function addBond(id, pts){
  if(id==='jade' || !isRecruited(id)) return null;
  if(id==='chad' && G.flags.roc_severed) return null;   // ch59: Jade severed her bond with Roc Chadwick
  const before = bondLevel(id); U(id).bp += pts;
  return bondLevel(id) > before ? CHARACTERS[id].n+' reached Bond '+bondLevel(id)+'!' : null;
}

/* ---------- XP ---------- */
function gainXp(amount, ids){
  const msgs = [];
  (ids || G.party).forEach(id => {
    const u = U(id);
    if(u.lv >= CFG.LEVEL_CAP) return;
    u.xp += amount;
    while(u.lv < CFG.LEVEL_CAP && u.xp >= xpToNext(u.lv, id)){
      u.xp -= xpToNext(u.lv, id); u.lv++;
      msgs.push(CHARACTERS[id].n+' reached Lv'+u.lv+'!');
      skillsOf(id).filter(s => !s.evoSkill && s.req && s.req.lvl === u.lv).forEach(s => msgs.push('  ✦ New skill: '+s.n));
    }
  });
  return msgs;
}

/* ---------- evolution ---------- */
function evoState(id){
  const c = CHARACTERS[id], u = U(id);
  return c.evo.tiers.map(t => {
    let st = 'locked', why = 'Level '+t.req.lvl;
    if(u.evo.includes(t.id)) st = 'taken';
    else {
      const needOk = !t.requiresAny || t.requiresAny.some(x => u.evo.includes(x));
      const lvlOk = u.lv >= t.req.lvl, flagOk = !t.req.flag || !!G.flags[t.req.flag];
      const rival = t.tier===1 && (t.group==='path'||t.group==='route') && c.evo.tiers.some(o => o.id!==t.id && o.tier===1 && o.group===t.group && u.evo.includes(o.id));
      if(rival){ st='closed'; why='Another path was chosen'; }
      else if(!needOk){ why = 'Requires: '+t.requiresAny.map(x=>c.evo.tiers.find(o=>o.id===x).n).join(' or '); }
      else if(!flagOk){ why = 'A path not yet revealed in her story'; }
      else if(!lvlOk){ why = 'Level '+t.req.lvl; }
      else { st = 'ready'; why = ''; }
    }
    return Object.assign({}, t, { st, why });
  });
}
function evolve(id, eid){
  const e = evoState(id).find(x => x.id===eid);
  if(!e || e.st!=='ready') return false;
  U(id).evo.push(eid); save(); return true;
}

/* ---------- recruiting / story ---------- */
const ACTIVE_SLOTS = 4;
const slotCap = () => fixedParty() ? 5 : ACTIVE_SLOTS;   // the travelling party has five seats; Jade and Devon are the unbenchable pair, the other three may be benched
const unbenchable = id => id==='jade' || (fixedParty() && id==='devon');
const activeCount = () => G.active.filter(id => !isDisabled(id)).length;   // a disabled hero does not take a fighting slot
/* Temporary members ("visiting guests"): fight beside the party (controllable, extra to the five) while a rule holds.
   Add a row here when a journey introduces someone: { id, flag (story flag that makes them available), regions (where they travel with you) }.
   Roc (once purified, flag roc_reborn) joins on Dragonvale ground and at the exile border; he never returns to the main party. */
const AREA_BROKEN_SEALS = ['forgotten_battlefield','forgotten_sanctuary','celestial_ruins','land_beyond_seal'];
const AREA_NORTH = ['northern_frontier','black_forest','forest_of_thorns','mourning_valley','crownless_marches'];
const GUEST_RULES = {
  chad:{fromCh:170, when:() => LOCATIONS[G.loc].region==='dragon' || ['black_tide_waters','sunken_kingdom'].includes(G.loc), note:'Roc Chadstone, Maritime Envoy of Dragonvale, fights beside the party on Dragonvale ground and at sea. He is an ally, not a member: he never takes a place in the party.'},
  // Area guests: fight beside the party (passive companions) only while the party is inside their area (locs), from chapter fromCh. Leave the area and they leave.
  cael:{fromCh:123, locs:AREA_BROKEN_SEALS, note:'Cael Ardyn, the last Seal Keeper, stays in the Broken Seals area to keep the peace, and fights beside the party while it is there.'},
  eira:{fromCh:129, untilCh:EIRA_JOIN_CH, locs:AREA_BROKEN_SEALS, note:'Eira Solenne, the scholar of the sanctuary, fights beside the party while it is in the Broken Seals area (she joins the party for good after Arc V).'},
  rin:{fromCh:149, untilCh:RIN_JOIN_CH, locs:AREA_NORTH, note:'Rin Kaede, the Spirit Ranger, fights beside the party while it is in the northern forest country.'},
};
const presentGuestsRules = () => !G ? [] : Object.keys(GUEST_RULES).filter(id => { const r = GUEST_RULES[id];
  const base = (r.flag===undefined || [].concat(r.flag).every(f => G.flags[f])) && (!r.regions || r.regions.includes(LOCATIONS[G.loc].region)) && (!r.locs || r.locs.includes(G.loc) || (r.extraLocs && r.extraLocs[G.loc] !== undefined && G.ch >= r.extraLocs[G.loc])) && (r.fromCh===undefined || G.ch>=r.fromCh) && (r.untilCh===undefined || G.ch<r.untilCh) && (!r.when || r.when());
  const ok = base || !!(r.alt && r.alt());   // alt: a second way to be present (an arc where the story has the guest travel with the party)
  return ok && !isDisabled(id); });
/* STORY COMPANIONS: characters the story arc needs are brought along whatever the party size. They fight beside the five (controllable extras, like guests); if they are in the active five they simply take their seat. Add a row per arc.
   Arc XIII (from ch312) focuses on Jade and Sky; Rheon travels as a guest. (Sera rejoins as an ordinary party member.) */
const STORY_ALONG = [ /* Rheon's guest end point (author): the end of the arc where he and Sera travel together, Arc XIII (until 337) */ {from:312, until:337, ids:['sky','rheon'], note:'Arc XIII: Sky (the arc\'s focus, with Jade) and Prince Rheon (a guest) come along whatever the party size.'},
  {from:340, until:351, ids:['damien'], guests:['damien'], note:'Damien Dee, Delilah\'s brother, is a guest on the western frontier investigation (joinable later in the arc).'},
  {from:387, until:412, ids:['devon','sky','levi','seraphina','greyson','adrian','evelyne'], guests:['greyson','adrian','evelyne'], note:'Arc XVI: the special mission group (King Hugh, Adrian, Evelyne, Sera, Levi, Sky, Devon and Jade) travels together, not limited to five.'},
  {from:342, until:362, ids:['delilah'], guests:['delilah'], note:'Delilah is a story guest: she understands the contracts better than anyone.'} ];   // Damien is a guest until ch351, when he becomes a recruit (JOIN_CH); Delilah stays a guest to the end of Arc XIV (until 362: adjust if the author sets another end)
const storyAlongIds = () => !G ? [] : STORY_ALONG.filter(a => G.ch >= a.from && (a.until === undefined || G.ch < a.until)).reduce((l, a) => l.concat(a.ids.filter(id => G.party.includes(id) || (a.guests && a.guests.includes(id)))), []).filter(id => CHARACTERS[id] && !isAway(id) && !isDisabled(id));   // a row's `guests` are brought along even when they are not in the party list
const storyAlongNote = () => !G ? '' : STORY_ALONG.filter(a => G.ch >= a.from && (a.until === undefined || G.ch < a.until)).map(a => a.note).join(' ');
const presentGuests = () => { const l = presentGuestsRules(); storyAlongIds().forEach(id => { if(!l.includes(id)) l.push(id); }); return l; };
const isGuestNow = id => presentGuests().includes(id);
const isCompanion = id => !!(CHARACTERS[id] && CHARACTERS[id].companion) || (!!G && ((id==='rin' && G.ch < RIN_JOIN_CH) || (id==='eira' && G.ch < EIRA_JOIN_CH)));   // companions travel and fight with the party without using one of the active slots
function recruit(id){ if(G.left && G.left[id]) return false; if(!G.party.includes(id)){ G.party.push(id); if(!isCompanion(id) && activeCount()<slotCap()) G.active.push(id); return true; } return false; }
function toggleActive(id){ if(unbenchable(id) || isCompanion(id) || (isAway(id) && !G.active.includes(id))) return; const i=G.active.indexOf(id); if(i>=0) G.active.splice(i,1); else if(activeCount()<slotCap()) G.active.push(id); save(); }
function recruitsAtChapter(ch){ return Object.keys(JOIN_CH).filter(id => JOIN_CH[id] === ch); }
