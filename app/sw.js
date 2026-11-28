// KōAN Consumer App — Service Worker PWA v3 (Design Lock v1.1)
const CACHE_NAME = 'koan-app-v1-1-design-lock';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first siempre sin retener HTML viejo para garantizar despliegues en caliente inmediatos
  event.respondWith(
    fetch(event.request, { cache: 'no-cache' })
      .then((res) => {
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
