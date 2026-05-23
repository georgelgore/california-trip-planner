// TODO: rename CACHE to something unique for this trip, e.g. 'japan-2027-v1'
const CACHE = 'trip-name-v1';
const PRECACHE = [
  './', './index.html', './data.js', './manifest.json', './sw.js', './icon-192.svg',
  '../../shared/app.css', '../../shared/app.js',
];

// ── Install: prime the cache so the app works offline after first visit ─────
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
  self.skipWaiting();
});

// ── Activate: nuke any older caches owned by this trip ─────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── Fetch strategy ─────────────────────────────────────────────────────────
//   HTML pages    → network-first  (content updates without a cache bump)
//   everything else → cache-first  (icons, manifest, sw.js — rarely change)
//   Both fall back to cache if the network is unreachable.
//
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Only handle same-origin requests; let cross-origin pass through.
  if (url.origin !== location.origin) return;

  const isHTML =
    req.mode === 'navigate' ||
    req.destination === 'document' ||
    url.pathname.endsWith('/') ||
    url.pathname.endsWith('.html');

  if (isHTML) {
    e.respondWith(networkFirst(req));
  } else {
    e.respondWith(cacheFirst(req));
  }
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    // Mirror a successful response into the cache for offline use.
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    // Offline → cached copy if we have one, else the cached app shell.
    const cached = await cache.match(req);
    if (cached) return cached;
    const shell = await cache.match('./index.html');
    if (shell) return shell;
    throw err;
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    if (cached) return cached;
    throw err;
  }
}
