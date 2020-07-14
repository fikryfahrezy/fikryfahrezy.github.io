self.importScripts('data/games.js');

// Files to cache
const cacheName = 'learnPWA-mdn-js13kPWA-v1';
const appShellFiles = [
  '/learn-pwa/',
  '/learn-pwa/index.html',
  '/learn-pwa/app.js',
  '/learn-pwa/style.css',
  '/learn-pwa/fonts/graduate.eot',
  '/learn-pwa/fonts/graduate.ttf',
  '/learn-pwa/fonts/graduate.woff',
  '/learn-pwa/favicon.ico',
  '/learn-pwa/img/js13kgames.png',
  '/learn-pwa/img/bg.png',
  '/learn-pwa/icons/icon-32.png',
  '/learn-pwa/icons/icon-64.png',
  '/learn-pwa/icons/icon-96.png',
  '/learn-pwa/icons/icon-128.png',
  '/learn-pwa/icons/icon-168.png',
  '/learn-pwa/icons/icon-192.png',
  '/learn-pwa/icons/icon-256.png',
  '/learn-pwa/icons/icon-512.png',
];
const gamesImaged = [];
for (let i = 0; i < games.length; i++) {
  gamesImages.push('data/img/' + games[i].slug + '.jpg');
}
const contentToCache = appShellFiles.concat(gamesImages);

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      return (
        r ||
        fetch(e.request).then((response) =>
          caches.open(cacheName).then((cache) => {
            console.log(
              `[Service Worker] Caching new resource: ${e.request.url}`
            );
            cache.put(e.request, response.clone());
            return response;
          })
        )
      );
    })
  );
});
