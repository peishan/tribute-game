/* =====================================================================
   TRIBUTE — SKIRMISH (random battle mode)
   Fight random monsters from any area you have unlocked. Enemy level follows the party (average level + the difficulty offset);
   the group is drawn from the monster pool of every unlocked area (hunting grounds, road encounters, elites; no bosses).
   Difficulty: Normal (+0), Hard (+4, rewards x1.5), Brutal (+8, rewards x2.2, with an elite). A win streak adds +5% rewards (max +50%).
   No day cost and no HP/MP restore: manage your party between fights. State: G.skirm = {streak, best, wins}
   ===================================================================== */
const SKIRM_DIFF = {
  normal:{n:'Normal', off:0, mult:1, elite:false},
  hard:{n:'Hard', off:4, mult:1.5, elite:false},
  brutal:{n:'Brutal', off:8, mult:2.2, elite:true},
};
let skirmDiff = 'normal', skirmScope = 'all';
/* CHAIN (author): with "Keep fighting" on, the first skirmish is played by hand; after a win the next one starts by itself and runs on auto-battle.
   It stops on a defeat, when you press Stop, or when the party is too hurt to go on (someone down, or the party below 35% HP on average). */
let skirmChain = false, skirmRun = 0, skirmTimer = null;
function skirmPartyOk(){
  const ids = G.active.filter(id => !isDisabled(id)); if(!ids.length) return false;
  const pct = ids.map(id => curHp(id) / Math.max(1, statsOf(id).hp));
  return !pct.some(x => x <= 0) && pct.reduce((a, x) => a + x, 0) / pct.length >= .35;
}
function skirmStopChain(msg){ skirmChain = false; skirmRun = 0; clearTimeout(skirmTimer); if(msg) flash([msg]); }
function skirmTick(){   // called after every render
  clearTimeout(skirmTimer);
  if(!skirmChain || !B || !B.spec.skirmish) return;
  if(B.over === 'lose' || B.over === 'fled'){ skirmChain = false; skirmRun = 0; return; }
  if(B.over !== 'win') return;
  skirmTimer = setTimeout(() => {
    if(!skirmChain || !B || B.over !== 'win' || !B.spec.skirmish) return;
    battleDone();
    if(!skirmPartyOk()){ skirmStopChain('🎲 The chain stops: the party is too hurt to go on. Rest, then start again.'); tab = 'skirmish'; render(); return; }
    origin = 'skirmish'; if(startSkirmish() === 'battle') tab = 'battle'; else skirmStopChain();
    render();
  }, 1400);
}
function skirmState(){ if(!G.skirm) G.skirm = {streak:0, best:0, wins:0}; return G.skirm; }
function skirmPool(scope){
  const keys = new Set();
  const add = l => { l.spots.forEach(s => { (s.pool||[]).forEach(x => keys.add(x)); if(s.elite) keys.add(s.elite); }); };
  if(scope==='here') add(LOCATIONS[G.loc]); else LOC_ORDER.filter(locOpen).forEach(k => add(LOCATIONS[k]));
  if(scope!=='here') ROUTES.filter(r => locOpen(r.a) && locOpen(r.b)).forEach(r => r.pool.forEach(x => keys.add(x)));
  return Array.from(keys).filter(k => ENEMIES[k] && !ENEMIES[k].boss);
}
const skirmStreakBonus = () => Math.min(.5, skirmState().streak*.05);
function startSkirmish(){
  const D = SKIRM_DIFF[skirmDiff], pool = skirmPool(skirmScope);
  if(!pool.length) return ['No monsters are known here yet.'];
  const lv = Math.max(1, avgPartyLv() + D.off), regular = pool.filter(k => !ENEMIES[k].elite), elites = pool.filter(k => ENEMIES[k].elite);
  const n = 2 + Math.floor(Math.random()*3);   // 2-4
  const foes = [];
  if(D.elite && elites.length) foes.push({key:AR(elites), lv:lv+1});
  while(foes.length < n) foes.push({key:AR(regular.length ? regular : pool), lv});
  const mult = D.mult*(1 + skirmStreakBonus());
  const chained = skirmChain && skirmRun >= 1;
  startBattle({foes, rewards:true, skirmish:true, onWin:() => {
    const s = skirmState(); s.streak++; s.wins++; s.best = Math.max(s.best, s.streak);
    const xp = Math.round((40 + lv*6)*foes.length*(mult-1)*.5), gold = Math.round((15 + lv*3)*foes.length*(mult-1)*.5);
    const msgs = ['🎲 Skirmish won (streak '+s.streak+').'];
    if(xp>0 || gold>0){ gainXp(xp, G.active.concat(G.party.filter(isCompanion))).forEach(m => msgs.push(m)); G.gold += gold; msgs.push('Skirmish bonus: +'+xp+' XP, +'+gold+'g (×'+mult.toFixed(2)+')'); }
    return msgs;
  }});
  skirmRun++;
  if(chained && B && typeof autoUnlocked==='function' && autoUnlocked()) B.auto = true;   // the first fight of a chain is manual; the rest run on auto-battle
  return 'battle';
}
function skirmLost(){ if(G.skirm) G.skirm.streak = 0; }
function rSkirmish(){
  const s = skirmState(), pool = skirmPool(skirmScope), D = SKIRM_DIFF[skirmDiff], lv = Math.max(1, avgPartyLv() + D.off);
  const diffBtns = Object.keys(SKIRM_DIFF).map(k => `<button class="${skirmDiff===k?'pri':''}" onclick="skirmDiff='${k}';render()">${SKIRM_DIFF[k].n}</button>`).join('');
  const scopeBtns = [['all','All unlocked areas'],['here','This area only']].map(([k,l]) => `<button class="${skirmScope===k?'pri':''}" onclick="skirmScope='${k}';render()">${l}</button>`).join('');
  return `<h2>Skirmish</h2><div class="sm">Random battles with monsters from the areas you have unlocked. Enemy level follows the party. No time passes and nothing is restored: look after your party between fights.</div>${flashHtml()}
    <div class="panel"><div class="sm">Difficulty</div><div class="row" style="margin:4px 0">${diffBtns}</div><div class="sm">Area</div><div class="row" style="margin:4px 0">${scopeBtns}</div>
    <div class="sm">Enemy level ~${lv} · ${pool.length} kinds of monster${D.elite?' · with an elite':''} · rewards ×${D.mult}${skirmStreakBonus()?' + streak '+Math.round(skirmStreakBonus()*100)+'%':''}</div>
    <label class="sm" style="display:block;margin:6px 0"><input type="checkbox" ${skirmChain?'checked':''} onchange="skirmChain=this.checked;skirmRun=0;render()"> 🔁 Keep fighting: after a win, start the next skirmish automatically. The first battle is yours to play; the rest run on auto-battle. Stops on a defeat, when the party is badly hurt, or when you press Stop.</label>
    <button class="pri" ${pool.length?'':'disabled'} onclick="origin='skirmish';skirmRun=0;if(startSkirmish()==='battle'){tab='battle'}render()">⚔️ Start a skirmish</button></div>
    <div class="sm">Streak ${s.streak} · best ${s.best} · skirmishes won ${s.wins}</div>
    <h4>Monsters you might meet</h4><div class="sm">${pool.map(k => ENEMIES[k].icon+' '+ENEMIES[k].n).join(' · ')}</div>`;
}
