// cache name
const CACHE_NAME = 'version_1';
// holds the pages urla
const urlsToCache = ['index.html', 'offline.html'];
// this refers to the serviceworker itself
const self = this;

// events for:

// Install serviceWorker
self.addEventListener('install', (event) => {
    // open the cache
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});

// Listen fot requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // match all the requests
        caches.match(event.request)
            .then(() => {
                // for all the requests matched above we fetch them again
                return fetch(event.request)
                    // if it cannot fetch the data there is no internet connection and we return the offline page
                    .catch(() => caches.match("offline.html"))
            })
    )
});

// Activate the serviceWorker
self.addEventListener('activate', (event) => {
    // remove all the previous caches and just keep the new one
    const cacheWhitelist = [];

    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheNames) => {
                // if the cache whitelist does not include the cache name then we'll delete the specific cache name'
                if(!cacheWhitelist.includes(cacheNames)) {
                    return caches.delete(cacheName)
                }
            })
        ))
    )
});