const CACHE_NAME = "grocygo-v1";
const urlsToCache = [
  "index.html",
  "products.html",
  "cart.html",
  "about.html",
  "contact.html",
  "styles.css",
  "script.js",
  "manifest.json",
  "icons/1st.png",
  "icons/2nd.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});
