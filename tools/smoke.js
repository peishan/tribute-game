/* Smoke test: loads the real game in a headless browser and checks the things that have broken before.
   Run from the repo root:  node tools/smoke.js   (needs Playwright; exit code 1 on any failure).
   It never touches a real save: it works on a fresh state in a throwaway browser profile. */
const fs = require('fs'), path = require('path');
const fails = [], ok = (name, cond, extra) => { if(!cond) fails.push(name + (extra ? ': ' + extra : '')); };
// 1. every script parses
fs.readdirSync('scripts').filter(f => f.endsWith('.js')).forEach(f => { try{ new Function(fs.readFileSync('scripts/'+f, 'utf8')); }catch(e){ fails.push('syntax '+f+': '+e.message); } });
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(), p = await b.newPage({viewport:{width:420, height:900}}), errs = [];
  p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file://' + path.resolve('index.html')); await p.waitForTimeout(1500);
  const r = await p.evaluate(() => {
    const o = {}; enter(true); G = newState();
    // chapters: every number has a design entry; horizons-built chapters have their spots and a mission
    const top = Math.max(...Object.keys(CHAPTER_DESIGN).map(Number)); o.top = top;
    o.gaps = []; for(let n = 1; n <= top; n++) if(!CHAPTER_DESIGN[n]) o.gaps.push(n);
    o.noSpots = []; for(let n = 855; n <= top; n++){ if(![...'abcd'].every(c => spotById('hz'+n+c))) o.noSpots.push(n); if(!MISSIONS.find(m => m.id === 'm_s'+n)) o.noSpots.push('m'+n); }
    o.flags = Object.keys(CH_FLAGS).length; o.noLabel = Object.keys(CH_FLAGS).filter(n => +n >= 851).flatMap(n => CH_FLAGS[n]).filter(f => !FLAG_LABEL[f]).slice(0, 5);
    o.badSpot = MISSIONS.flatMap(m => (m.obj && m.obj.steps || []).filter(s => s.spot && !spotById(s.spot)).map(s => m.id+':'+s.spot)).slice(0, 5);
    o.badBoss = MISSIONS.flatMap(m => (m.obj && m.obj.steps || []).filter(s => s.boss && !ENEMIES[s.boss]).map(s => m.id+':'+s.boss)).slice(0, 5);
    const fightable = new Set(Object.values(LOCATIONS).flatMap(l => l.spots).filter(s => s.boss).map(s => s.boss).concat(CHAPTERS.flatMap(c => (c.battle || []).map(f => f.key))));
    o.noFight = MISSIONS.flatMap(m => (m.obj.steps || [m.obj]).map(s => s.boss || (s.type === 'boss' && s.key)).filter(k => k && !fightable.has(k)).map(k => m.id+':'+k));
    // no mission step waits on a spot that opens more than 15 chapters after the mission itself
    const sp = {}; Object.values(LOCATIONS).forEach(l => l.spots.forEach(x => { sp[x.id] = x; }));
    o.lateStep = MISSIONS.flatMap(m => (m.obj.steps || []).filter(s => s.spot && sp[s.spot] && (sp[s.spot].ch || 0) > (m.needCh || 0) + 15).map(s => m.id+':'+s.spot));
    o.hzq = [...Array(42).keys()].filter(n => !spotById('hzq'+n)).concat(['hzq_leviathan','hzq_storm_fronts','hzq_skiff_crew','bp_records'].filter(id => !spotById(id)));
    G = newState(); devSetChapter(500); o.tip = boardTip().includes('Notice Board') && boardTip().includes('Masked Contracts'); G = newState(); devSetChapter(40); o.tipEarly = boardTip().includes('Masked Contracts');
    G = newState(); devSetChapter(500); o.boards = rBoardsTab(); 
    o.arcs = ARCS.length; o.arcDup = ARCS.map(a => a.n).filter((n, i, l) => l.indexOf(n) !== i);
    // every tab renders at several story points
    o.tabErr = [];
    [0, 30, 88, 300, 640, 900, 990].forEach(ch => { G = newState(); try{ devSetChapter(ch); }catch(e){ o.tabErr.push('set'+ch+':'+e.message); }
      TABS.forEach(([k]) => { try{ tab = k; openCh = null; render(); }catch(e){ o.tabErr.push(ch+'/'+k+':'+e.message); } }); });
    // party lock
    G = newState(); G.party = ['jade','devon','sky','levi','sally','seraphina']; G.ch = 500; G.active = ['jade']; syncAway(); o.lock = G.active.slice().sort().join();
    ['devon','sally','jade'].forEach(i => toggleActive(i)); o.lock2 = G.active.length;
    // road home
    G = newState(); G.ch = 60; G.visited = {dragon_vale:true}; G.loc = 'dragon_vale'; G.gold = 1e6; o.barred = travelOptions().filter(x => x.barred).map(x => x.to).join();
    G.ch = 86; o.barredAfter = travelOptions().filter(x => x.barred).length;
    // a Tribute boss fight and the sequel fight, auto-played
    G = newState(); for(const k in G.units) G.units[k].lv = 1500; G.party = ['jade','devon','sky','levi','sally']; G.active = G.party.slice(); G.ch = 975; G.loc = 'dragon_vale'; origin = 'here';
    doBoss('cross_fight_966'); o.canon = B.allies.map(a => a.id).sort().join(); let n = 0; while(B && !B.over && n < 400){ autoStep(); n++; } o.boss = B && B.over;
    // auto-battle: blocked against a new boss, allowed once it has been beaten; the skirmish chain keeps the first fight manual
    o.autoHigh = (doBoss('cross_fight_974'), autoBlocked()); B = null; for(const k in G.units) G.units[k].lv = 150;
    o.autoNew = (doBoss('cross_fight_974'), autoBlocked()); B = null; G.flags.boss_boss_shipment_key_figure = true; o.autoKnown = (doBoss('cross_fight_974'), autoBlocked()); B = null;
    skirmChain = true; skirmRun = 0; startSkirmish(); o.chain1 = !!B.auto; B = null; startSkirmish(); o.chain2 = !!B.auto; B = null; skirmChain = false; skirmRun = 0;
    G = newState(); for(const k in G.units) G.units[k].lv = 1500; G.ch = 990; o.hzOpen = hzOpen(); o.hzCh = HZ_CHAPTERS.length;
    hzBattle('leviathan'); o.crew = HB.crew.length; let twin = false; n = 0; while(HB && !HB.over && n < 1500){ hzAutoStep(); n++; if(HB.crew.some(u => HZ_TWINS.includes(u.id) && u.dead)) twin = true; }
    o.hz = HB.over; o.twinDown = twin; o.soel = HB.crew.find(u => u.id === 'soel').dead; HB = null;
    // every place a chapter starts at can be reached by road or sea from the capital
    const adj = {}; ROUTES.forEach(r => { (adj[r.a] = adj[r.a] || []).push(r.b); (adj[r.b] = adj[r.b] || []).push(r.a); });
    const seen = new Set(['capital']), q = ['capital']; while(q.length){ const x = q.pop(); (adj[x] || []).forEach(y => { if(!seen.has(y)){ seen.add(y); q.push(y); } }); }
    o.unreach = [...new Set(Object.keys(CH_LOC).filter(n => !seen.has(CH_LOC[n])).map(n => CH_LOC[n]))];
    o.noLoc = [...new Set(Object.values(CH_LOC).filter(l => !LOCATIONS[l]))];
    o.neverShown = Object.values(LOCATIONS).flatMap(l => l.spots).filter(s => s.clues && s.clues.includes('...') && !(s.ch >= 999)).map(s => s.id);
    return o;
  });
  // images on disk for every chapter page and arc cover
  const j = fs.readFileSync('scripts/journal.js', 'utf8');
  for(let n = 0; n <= 41; n++) ok('horizon page '+n, fs.existsSync('assets/horizon/c'+String(n).padStart(3, '0')+'.webp'));
  ok('browser errors', !errs.length, errs.slice(0, 3).join(' | '));
  ok('chapter gaps', !r.gaps.length, r.gaps.join());
  ok('chapters with missing spots or missions (855+)', !r.noSpots.length, r.noSpots.slice(0, 8).join());
  ok('flags without a label (chapters 851+)', !r.noLabel.length, r.noLabel.join());
  ok('mission steps pointing at missing spots', !r.badSpot.length, r.badSpot.join());
  ok('mission steps pointing at missing bosses', !r.badBoss.length, r.badBoss.join());
  ok('every boss a mission asks for can be fought', !r.noFight.length, r.noFight.join());
  ok('no mission step waits on a much later spot', !r.lateStep.length, r.lateStep.join());
  ok('Horizon chapter spots (0-41), boss spots and Pearl case exist', !r.hzq.length, r.hzq.join());
  ok('Boards tab lists the Masked Contracts', /Masked Contracts/.test(r.boards) && /Accept/.test(r.boards), '')
  ok('board tip lists the boards the party can reach', r.tip === true && r.tipEarly === false, r.tip+' '+r.tipEarly);
  ok('duplicate arcs', !r.arcDup.length, r.arcDup.join());
  ok('tabs render at every story point', !r.tabErr.length, r.tabErr.slice(0, 4).join(' | '));
  ok('canon five locked in', r.lock === 'devon,jade,levi,sally,sky' && r.lock2 === 5, r.lock+' / '+r.lock2);
  ok('road home closed during arc 2', r.barred.includes('capital') && r.barredAfter === 0, r.barred+' / '+r.barredAfter);
  ok('crossover fight is canon-five only and winnable', r.canon === 'devon,jade,levi,sally,sky' && r.boss === 'win', r.canon+' '+r.boss);
  ok('auto-battle: new boss blocked below Lv 200, allowed at Lv 200+ or once beaten', r.autoNew === true && r.autoKnown === false && r.autoHigh === false, r.autoNew+' '+r.autoKnown+' '+r.autoHigh);
  ok('skirmish chain: first fight manual, next on auto', r.chain1 === false && r.chain2 === true, r.chain1+' '+r.chain2);
  ok('Horizon opens with 42 chapters', r.hzOpen && r.hzCh === 42);
  ok('sequel fight: 13 crew, won, twins and Soel never fall', r.crew === 13 && r.hz === 'win' && !r.twinDown && !r.soel, JSON.stringify([r.crew, r.hz, r.twinDown, r.soel]));
  ok('every chapter location is reachable from the capital', !r.unreach.length && !r.noLoc.length, r.unreach.concat(r.noLoc).join());
  ok('no open spot with placeholder clues', !r.neverShown.length, r.neverShown.join());
  await b.close();
  if(fails.length){ console.log('SMOKE FAILED ('+fails.length+'):\n - '+fails.join('\n - ')); process.exit(1); }
  console.log('SMOKE OK: '+r.top+' chapters, '+r.arcs+' arcs, '+r.flags+' chapter flags, all tabs render, fights run.');
})();
