/* =====================================================================
   TRIBUTE — DEEDS (Crimson Tide's achievements, reframed)
   Pure recognition: no rewards, so nothing here can unbalance the game. Each deed is {id, cat, n, icon, t (what it says once earned), ok()}, and ok()
   only reads state the game already keeps (chapters, bonds, Evils, regard, homes, bosses, counters). Unearned deeds show as ??? so nothing is
   spoiled. They are checked after every screen render; a long-played save earns everything it already qualifies for at once, with a single message.
   State: G.deeds = { id: day }.   Wording is first-pass: edit freely. Add a deed = add a row (or a chapter number to DEED_CHAPTERS).
   ===================================================================== */
const DEED_CATS = [['story','📖 Story'],['bonds','💞 Bonds'],['hunt','🕯️ The Fifteen'],['world','🗺️ World'],['home','🏡 Home'],['craft','⚒️ Deeds of work']];
const countFlags = pre => Object.keys(G.flags).filter(k => k.indexOf(pre)===0 && G.flags[k]).length;
const missionsDone = () => Object.keys(G.missions||{}).filter(k => G.missions[k].st==='done').length;
const DEED_CHAPTERS = [4,13,21,30,41,44,50,57,59,61,73,77,87,88,90,94,99,103,108,114,117,118,123,125,131,138,152,155,156,161,165,166,167,172,175,177,178];
const ARC_ENDS = [[1,'The Hidden Isle',42],[2,'The Dragonvale Court',86],[3,'The Truth Beneath Tribute',103],[4,'The Forgotten Valen Legacy',121],[5,'The Broken Seals',146],[6,'The Fifteen Evils',166]];
const DEEDS = [];
const deed = (id, cat, n, icon, t, ok) => DEEDS.push({id, cat, n, icon, t, ok});
DEED_CHAPTERS.forEach(n => { if(!CHAPTERS[n] || !CHAPTERS[n].title) return; const d = CHAPTER_DESIGN[n] || {};
  deed('ch'+n, 'story', CHAPTERS[n].title, '📖', 'Chapter '+n+(d.reward?': '+d.reward+'.':'.'), () => G.ch >= n); });
ARC_ENDS.forEach(([k, title, end]) => deed('arc'+k, 'story', 'Arc '+['','I','II','III','IV','V','VI'][k]+' complete: '+title, '🏅', 'You saw the arc through to its end.', () => G.ch >= end));
// companions and recruits
[['chad','Roc joins the road'],['sky','Sky joins the road'],['sally','Sally joins the road'],['levi','Levi joins the road'],['devon','Devon joins the road'],['seraphina','Seraphina joins the road'],['ghost_healer','The Ghost Healer travels with you']].forEach(([id, n]) => deed('join_'+id, 'bonds', n, '🤝', CHARACTERS[id].n+' is part of the story now.', () => isRecruited(id) || (G.left && G.left[id])));
// bonds
RELATIONS.forEach(r => [[3,'Close'],[5,'The deepest bond']].forEach(([tier, w]) => deed('rel_'+r.id+tier, 'bonds', r.n+': '+REL_LADDER[r.ladder][tier], '💞', 'Your bond with '+r.n+' reached '+REL_LADDER[r.ladder][tier]+'.', () => relOpen(r) && relTier(r.id) >= tier)));
Object.keys(BOND_TRACKS).forEach(k => [[2,''],[4,'']].forEach(([tier]) => deed('trk_'+k+tier, 'bonds', BOND_TRACKS[k].label+': '+BOND_TRACKS[k].names[tier], BOND_TRACKS[k].icon, 'A bond between companions grew to '+BOND_TRACKS[k].names[tier]+'.', () => trackOpen(k) && trackTier(k) >= tier)));
deed('hang5', 'bonds', 'Time well spent', '🍵', 'Five shared moments with companions.', () => (G.moments||[]).length >= 5);
deed('hang25', 'bonds', 'A full scrapbook', '📔', 'Twenty-five shared moments.', () => (G.moments||[]).length >= 25);
deed('strain1', 'bonds', 'Understood', '💔', 'A disagreement was understood and repaired.', () => Object.keys(G.strain||{}).some(k => G.strain[k].state==='repaired'));
// the fifteen
deed('ev1', 'hunt', 'The first of the Fifteen', '🕯️', 'One Evil resolved.', () => evilsResolved() >= 1);
deed('ev3', 'hunt', 'Three Evils, three truths', '🕯️', 'Three Evils resolved.', () => evilsResolved() >= 3);
deed('ev8', 'hunt', 'More than half', '🕯️', 'Eight Evils resolved.', () => evilsResolved() >= 8);
deed('ev15', 'hunt', 'Fifteen names, fifteen answers', '🏆', 'Every Evil resolved.', () => evilsResolved() >= 15);
EVILS.filter(e => !e.hidden).forEach(e => deed('evil_'+e.id, 'hunt', e.n, '🕯️', e.n+' was resolved.', () => EVIL_RESOLVED.includes(evilState(e))));
deed('learn1', 'hunt', 'Asked before deciding', '👂', 'Heard the party out before deciding an Evil\'s fate.', () => Object.keys(G.flags).some(k => k.indexOf('learned_')===0 && G.flags[k]));
deed('rev1', 'hunt', 'A name is not the truth', '📜', 'The register had to be corrected.', () => EVILS.some(evilRevised));
// world
deed('visit5', 'world', 'Travelled a little', '🛞', 'Five places visited.', () => Object.keys(G.visited).length >= 5);
deed('visit15', 'world', 'Well travelled', '🗺️', 'Fifteen places visited.', () => Object.keys(G.visited).length >= 15);
deed('visit25', 'world', 'The map fills in', '🗺️', 'Twenty-five places visited.', () => Object.keys(G.visited).length >= 25);
deed('inv10', 'world', 'Curious', '🔎', 'Ten investigations completed.', () => countFlags('inv_') >= 10);
deed('inv40', 'world', 'Nothing left unasked', '🔎', 'Forty investigations completed.', () => countFlags('inv_') >= 40);
deed('mis10', 'world', 'The king\'s errands', '📜', 'Ten missions completed.', () => missionsDone() >= 10);
deed('mis40', 'world', 'The king\'s trusted hand', '📜', 'Forty missions completed.', () => missionsDone() >= 40);
deed('boss5', 'world', 'Five great foes', '⚔️', 'Five bosses defeated.', () => countFlags('boss_') >= 5);
deed('boss15', 'world', 'Fifteen great foes', '⚔️', 'Fifteen bosses defeated.', () => countFlags('boss_') >= 15);
deed('best20', 'world', 'A naturalist', '📕', 'Twenty kinds of creature met.', () => Object.keys(G.bestiary).length >= 20);
deed('best35', 'world', 'The bestiary fills', '📕', 'Thirty-five kinds of creature met.', () => Object.keys(G.bestiary).length >= 35);
[25,50,75,100].forEach(l => deed('lv'+l, 'world', 'Average level '+l, '⭐', 'The party reached an average level of '+l+'.', () => gateLv() >= l));
deed('regard1', 'world', 'A friend of the hearth', '🏮', 'A place came to regard you as a friend.', () => Object.keys(G.regard||{}).some(k => regardTier(k) >= 3));
deed('regard3', 'world', 'Honoured', '🏮', 'A place gave you its highest regard.', () => Object.keys(G.regard||{}).some(k => regardTier(k) >= 4));
deed('whisper1', 'world', 'An ear to the ground', '👂', 'Heard a whisper.', () => typeof whisperState==='function' && Object.keys(whisperState().heard).length >= 1);
deed('whisper8', 'world', 'The ledger fills', '👂', 'Eight whispers recorded.', () => typeof whisperState==='function' && Object.keys(whisperState().heard).length >= 8);
deed('lead1', 'world', 'The rumour was true', '🔎', 'A whispered lead proved right.', () => typeof WHISPERS!=='undefined' && WHISPERS.some(w => w.kind==='lead' && whisperState().heard[w.id] && G.flags['inv_'+w.spot]));
deed('gate1', 'world', 'Ready for what comes', '⚖️', 'Reached the level a gated chapter asked for.', () => G.ch > 13 && DEED_CHAPTERS.length > 0 && Object.keys(CHAPTERS).some(n => chapterGate(+n) && +n <= G.ch));
deed('stip1', 'world', 'On the king\'s payroll', '💰', 'Collected Greyson\'s stipend.', () => typeof salaryOpen==='function' && salaryOpen() && salaryState().claimed >= 1);
deed('stip12', 'world', 'A steady wage', '💰', 'Twelve weeks of stipend collected.', () => typeof salaryOpen==='function' && salaryOpen() && salaryState().claimed >= 12);
deed('chron50', 'world', 'The Chronicle grows', '📜', 'Fifty entries in the Chronicle.', () => (G.chron||[]).length >= 50);
// home
deed('home1', 'home', 'A place of our own', '🏡', 'A home began to fill with small things.', () => Object.keys(G.homeMem||{}).length >= 1);
deed('home6', 'home', 'Lived in', '🏡', 'Six memories gathered in your homes.', () => Object.keys(G.homeMem||{}).length >= 6);
deed('home12', 'home', 'Every corner has a story', '🏡', 'Every home memory gathered.', () => HOME_MEMORIES.every(m => G.homeMem && G.homeMem[m.id]));
deed('over5', 'home', 'Overheard', '💬', 'Five conversations overheard.', () => typeof overheardCount==='function' && overheardCount() >= 5);
deed('over15', 'home', 'Company', '💬', 'Fifteen conversations overheard.', () => typeof overheardCount==='function' && overheardCount() >= 15);
deed('mom8', 'home', 'Small moments', '☕', 'Eight quiet moments noticed.', () => typeof momentsSeen==='function' && momentsSeen() >= 8);
// work
deed('craft1', 'craft', 'Made by hand', '⚒️', 'Crafted a piece of gear.', () => (G.crafted||0) >= 1);
deed('craft8', 'craft', 'A good workshop', '⚒️', 'Crafted eight pieces.', () => (G.crafted||0) >= 8);
deed('gold1k', 'craft', 'A little saved', '💰', 'Held 1,000 gold.', () => G.gold >= 1000);
deed('gold20k', 'craft', 'A treasury of one\'s own', '💰', 'Held 20,000 gold.', () => G.gold >= 20000);
const deedState = () => { if(!G.deeds) G.deeds = {}; return G.deeds; };
function checkDeeds(){
  if(!G || !G.flags) return;
  if(typeof renownSync==='function') renownSync();
  if(typeof archiveSync==='function') archiveSync();
  if(typeof houseGuestSync==='function') houseGuestSync();
  if(typeof outfitsCatchUp==='function') outfitsCatchUp();
  const reg = deedState(), fresh = [];
  DEEDS.forEach(d => { if(!reg[d.id]){ let ok = false; try{ ok = !!d.ok(); }catch(e){} if(ok){ reg[d.id] = G.day; fresh.push(d); } } });
  if(!fresh.length) return;
  if(fresh.length > 3){ toast('🏆 '+fresh.length+' deeds recognised from your journey so far'); chronicle(fresh.length+' deeds recognised from the journey so far.', '🏆'); }
  else fresh.forEach(d => { toast('🏆 Deed: '+d.n); chronicle('Deed earned: '+d.n+'.', '🏆'); });
  save();
}
let deedCat = 'all';
function rDeeds(){
  const reg = deedState(), got = DEEDS.filter(d => reg[d.id]).length;
  const cats = [['all','All']].concat(DEED_CATS).map(([k,l]) => `<button class="${deedCat===k?'pri':''}" onclick="deedCat='${k}';render()">${l}</button>`).join('');
  const list = DEEDS.filter(d => deedCat==='all' || d.cat===deedCat);
  return `<h2>Deeds</h2><div class="sm"><b>${got} / ${DEEDS.length}</b> recognised. Deeds carry no reward: they are simply the world remembering what you did.</div><div class="row" style="margin:6px 0;flex-wrap:wrap">${cats}</div>`+list.map(d => reg[d.id] ? `<div class="ev"><div><b>${d.icon} ${d.n}</b><div class="sm">${d.t}</div><div class="sm" style="opacity:.6">Day ${reg[d.id]}</div></div></div>` : `<div class="ev locked"><div><b>❔ ???</b><div class="sm" style="opacity:.6">${(DEED_CATS.find(c => c[0]===d.cat)||[,''])[1]} · not yet</div></div></div>`).join('');
}
