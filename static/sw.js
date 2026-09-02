self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    // Allows the app to load its network assets smoothly
    event.respondWith(fetch(event.request));
});