/* =====================================================================
   TRIBUTE — ECHOES (optional harder rematches of cleared bosses, from Crimson Tide's guardian rematches)
   A boss you have already defeated can be met again as an "echo": the same foes three levels above the party. The echo gives the boss's normal
   drops (not the first-clear ones), plus two rolls of the area's materials and a purse of gold, so late-game gold and materials have a use.
   Never offered for the Fifteen Evils, Varyn or anything sealed: their fates are decided by the story. State: G.echo = {bossKey: clears}.
   Numbers are first-pass.
   ===================================================================== */
const ECHO_LEVELS = 3;
const ECHO_EXCLUDE = ['boss_thorned_widow','boss_mourning_hart','boss_hollow_king','boss_varyn'];
const echoOk = sp => !!sp && !!sp.boss && !sp.seal && !ECHO_EXCLUDE.includes(sp.boss) && !!G.flags['boss_'+sp.boss];
function echoes(){ if(!G.echo) G.echo = {}; return G.echo; }
function doEcho(spotId){
  const sp = spotById(spotId); if(!echoOk(sp)) return [];
  const lv = lvFor(sp) + ECHO_LEVELS, foes = [{key:sp.boss, lv}].concat((sp.add||[]).map(k => ({key:k, lv:Math.max(1, lv-1)})));
  startBattle({foes, rewards:true, firstClear:false, echo:true, onWin:() => {
    const n = echoes()[sp.boss] = (echoes()[sp.boss]||0) + 1, gold = 20 + lv*5, msgs = [];
    G.gold += gold; msgs.push('🔁 The echo fades. +'+gold+'g');
    for(let i=0;i<2;i++) if(typeof areaLoot==='function') areaLoot().forEach(d => { addItems([d]); msgs.push('Found '+ITEMS[d.id].icon+' '+ITEMS[d.id].n+' ×'+d.qty); });
    if(n === 1) chronicle('Met the echo of '+ENEMIES[sp.boss].n+' and prevailed.', '🔁');
    return msgs; }});
}
const echoCount = () => Object.keys(echoes()).length;
deed('echo1', 'craft', 'An echo answered', '🔁', 'Defeated the echo of a boss you had already beaten.', () => echoCount() >= 1);
deed('echo5', 'craft', 'Five echoes', '🔁', 'Defeated five different echoes.', () => echoCount() >= 5);
