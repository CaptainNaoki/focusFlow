// ─── Mon Planning · Service Worker ───────────────────────────────────────────
// ⚠️ Change ce numéro à chaque déploiement pour forcer la mise à jour
const CACHE = 'planning-v3';

const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// ── Install : pré-cache tout
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll(PRECACHE).catch(() =>
        cache.addAll(['/', '/index.html', '/manifest.json'])
      )
    )
  );
  self.skipWaiting(); // Active immédiatement sans attendre
});

// ── Activate : supprime les vieux caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim()) // Prend le contrôle immédiatement
  );
});

// ── Fetch : Network-first pour HTML, Cache-first pour assets
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const isNavigation = e.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/';

  if (isNavigation) {
    // Network-first pour index.html → toujours la version fraîche si online
    e.respondWith(
      fetch(e.request)
        .then(resp => {
          if (resp && resp.status === 200) {
            caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
          }
          return resp;
        })
        .catch(() => caches.match('/index.html')) // Fallback offline
    );
  } else {
    // Cache-first pour fonts, images, etc.
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(resp => {
          if (resp && resp.status === 200) {
            caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
          }
          return resp;
        }).catch(() => {});
      })
    );
  }
});

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
