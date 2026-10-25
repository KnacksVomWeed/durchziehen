// Service Worker: speichert alle Dateien, damit die App offline läuft.
// Bei jedem Update die Nummer in VERSION erhöhen (z. B. v2), sonst bleibt die alte Version im Speicher.
const VERSION='durchzieher-v1';
const FILES=['./','index.html','manifest.json','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
