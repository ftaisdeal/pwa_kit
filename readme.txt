Progressive Web App package
This package provides a complete set of files for a Progressive Web App that gets a perfect score from Google Lighthouse for a PWA.
Use these files as a basis for building your own PWA.

For the package to work perfectly for you right out of the gate it must be run:

1. Under its own domain or sub-domain
2. Using SSL
3. On a server with PHP

The app.js file loaded by index.html registers a service worker and also checks for connectivity by attempting to fetch a tiny PHP file.

The PHP file only returns an HTTP header of Access-Control-Allow-Origin: * in order to avoid access control blocking, which would invalidate the PWA.

Service Worker 
The sw.js service worker file determines which files will be cached so that the PWA can still run even when there is no connectivity. If connectivity cannot be esablished, a message will appear notifying the user.

To establish which files will be cached, modify the staticAssets constant in the sw.js file.

To flush the user's cache and replace the set of files to be cached, change the cacheName constant in sw.js.

Web Manifest 
The manifest.webmanifest file is a JSON file containing settings for your PWA:

short_name
name
scope
start_url
background_color
display
theme_color
icons