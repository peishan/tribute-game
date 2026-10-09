/* Tribute service worker: app shell is cached for offline play; images and other assets are cached as you play. */
const VERSION = 'tribute-v63';
const SHELL = ['./', './index.html', './styles.css', './manifest.webmanifest',
  './scripts/chapters.js','./scripts/characters.js','./scripts/skilltree.js','./scripts/core.js','./scripts/enemies.js','./scripts/battle.js','./scripts/autobattle.js',
  './scripts/journal.js','./scripts/world.js','./scripts/world-ui.js','./scripts/maps.js','./scripts/voyage.js','./scripts/family.js','./scripts/raid.js','./scripts/network.js','./scripts/evils.js','./scripts/relations.js','./scripts/regard.js','./scripts/whispers.js','./scripts/chronicle.js','./scripts/salary.js','./scripts/apprentice.js','./scripts/banter.js','./scripts/corruption.js','./scripts/explore.js','./scripts/arcs.js','./scripts/base.js','./scripts/skirmish.js','./scripts/items.js','./scripts/gear.js','./scripts/loot.js','./scripts/gates.js','./scripts/standing.js','./scripts/overheard.js','./scripts/deeds.js','./scripts/estates.js','./scripts/archive.js','./scripts/passages.js','./scripts/codex.js','./scripts/growth.js','./scripts/echoes.js','./scripts/vows.js','./scripts/outfits.js','./scripts/rewards.js','./scripts/tracker.js',
  './scripts/savedata.js','./scripts/storypopup.js','./scripts/ui.js','./assets/splash.webp','./assets/icons/icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if(req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isCode = /\.(js|css|html|webmanifest)$/.test(req.url) || req.mode === 'navigate';
  if(isCode){   // network first so updates arrive, cache as the offline fallback
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); return r; }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
  } else {      // images: cache first
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(n => { const c = n.clone(); caches.open(VERSION).then(x => x.put(req, c)); return n; })));
  }
});
