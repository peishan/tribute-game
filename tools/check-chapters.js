/* Chapter list check: every chapter with a CHAPTER_DESIGN entry must be inside the journal's chapter range, have its page image(s) on disk,
   and the service worker must precache the scripts. Run from the repo root:  node tools/check-chapters.js   (exit code 1 on any problem). */
const fs = require('fs'), vm = require('vm');
const read = p => fs.readFileSync(p, 'utf8');
const problems = [];
const ctx = {}; vm.createContext(ctx);
vm.runInContext(read('scripts/chapters.js').replace(/\bconst CHAPTER_DESIGN\b/, 'var CHAPTER_DESIGN'), ctx);
const keys = Object.keys(ctx.CHAPTER_DESIGN || {}).map(Number).sort((a, b) => a - b);
if(!keys.length) problems.push('CHAPTER_DESIGN not found or empty');
const j = read('scripts/journal.js');
const artMax = +(/for\(let i=18;i<=(\d+);i\+\+\) ART\[i\]/.exec(j) || [])[1];
const listMax = +(/for\(let i=0;i<=(\d+);i\+\+\)\{/.exec(j) || [])[1];
const top = keys[keys.length - 1];
if(!(artMax >= top)) problems.push('journal ART range ends at ' + artMax + ' but the last designed chapter is ' + top);
if(!(listMax >= top)) problems.push('journal chapter list ends at ' + listMax + ' but the last designed chapter is ' + top);
const multi = {};   // ART[n]=['chN','chNb',...] overrides
for(const m of j.matchAll(/ART\[(\d+)\]=\[([^\]]*)\]/g)) multi[m[1]] = m[2].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
keys.filter(n => n >= 18).forEach(n => { (multi[n] || ['ch' + n]).forEach(f => { if(!fs.existsSync('assets/comics/' + f + '.webp')) problems.push('chapter ' + n + ': missing image assets/comics/' + f + '.webp'); }); });
// gaps in the designed range from the first Arc XII chapter on (a gap is shown as "(?)" in the journal)
const set = new Set(keys), gaps = []; for(let n = 287; n <= top; n++) if(!set.has(n)) gaps.push(n);
if(gaps.length) console.log('note: chapters with no design entry between 287 and ' + top + ': ' + gaps.join(', '));
const sw = read('sw.js'); fs.readdirSync('scripts').filter(f => f.endsWith('.js')).forEach(f => { if(!sw.includes('./scripts/' + f)) problems.push('sw.js does not precache scripts/' + f); });
if(problems.length){ console.log('FAILED:\n - ' + problems.join('\n - ')); process.exit(1); }
console.log('chapter check OK: ' + keys.length + ' designed chapters up to ' + top + ', journal range and page images fine.');
