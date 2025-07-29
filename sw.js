const cacheName = "pwa-kit-v1.2";
const staticCacheName = `${cacheName}-static`;
const dynamicCacheName = `${cacheName}-dynamic`;

const staticAssets = [
  "/",
  "/index.html",
  "/app.js",
  "/sw.js",
  "/styles.css",
  "/connectivity.js",
  "/manifest.webmanifest",
  "/offline.html",
  "/img/icons-192.png",
  "/img/icons-512.png",
  "/favicon-32.png",
  "/apple-touch-icon.png"
];

// Install Event - Cache Static Assets
self.addEventListener("install", event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(staticAssets);
      })
      .then(() => {
        console.log('Service Worker: Skip waiting');
        return self.skipWaiting(); // Force activate immediately
      })
      .catch(error => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate Event - Clean Up Old Caches
self.addEventListener("activate", event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            // Delete old caches that don't match current version
            if (cache !== staticCacheName && cache !== dynamicCacheName) {
              console.log('Service Worker: Deleting old cache', cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Claiming clients');
        return self.clients.claim(); // Take control immediately
      })
      .catch(error => {
        console.error('Service Worker: Activation failed', error);
      })
  );
});

// Fetch Event - Implement Cache Strategy
self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different types of requests
  if (staticAssets.some(asset => url.pathname === asset || url.pathname.endsWith(asset))) {
    // Cache First Strategy for Static Assets
    event.respondWith(cacheFirstStrategy(request, staticCacheName));
  } else if (url.pathname.includes('api') || url.pathname.endsWith('.json')) {
    // Network First Strategy for API calls and dynamic content
    event.respondWith(networkFirstStrategy(request, dynamicCacheName));
  } else {
    // Stale While Revalidate for Other Assets
    event.respondWith(staleWhileRevalidateStrategy(request, dynamicCacheName));
  }
});

// Cache First Strategy - Good for static assets
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
    
  } catch (error) {
    console.error('Cache First Strategy failed:', error);
    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network First Strategy - Good for dynamic content
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
    
  } catch (error) {
    console.log('Network failed, trying cache:', error.message);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Offline - Network request failed', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Stale While Revalidate Strategy - Good for frequently updated content
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(error => {
    console.log('Background fetch failed:', error.message);
    return cachedResponse; // Fallback to cached version
  });
  
  // Return cached version immediately, update in background
  return cachedResponse || fetchPromise;
}
