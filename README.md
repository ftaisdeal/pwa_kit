# Progressive Web App Kit

A complete starter kit for building Progressive Web Apps (PWAs) that achieves perfect Google Lighthouse PWA scores. This package provides all the essential files and configurations needed to create a production-ready PWA.

## 🚀 Features

- ✅ **Perfect Lighthouse PWA Score** - Optimized for Google Lighthouse audits
- 🔄 **Service Worker** - Offline functionality with intelligent caching
- 📱 **Web App Manifest** - Native app-like experience
- 🌐 **Connectivity Detection** - Real-time network status monitoring
- 🎨 **Responsive Design** - Works on all device sizes
- 🔒 **CORS Ready** - Proper headers for cross-origin requests

## 📋 Requirements

For optimal functionality, this PWA kit requires:

1. **SSL/HTTPS** - Required for service worker registration
2. **Modern Browser** - Support for Service Workers, Fetch API, and Web App Manifest
3. **Web Server** - Any static file server (Apache, Nginx, Node.js, etc.)

## 🏗️ Project Structure

```
PWA_kit/
├── index.html              # Main application entry point
├── app.js                  # Application logic and service worker registration
├── sw.js                   # Service worker for caching and offline functionality
├── styles.css              # Application styles
├── manifest.webmanifest    # PWA manifest configuration
├── fetch.php               # Connectivity test endpoint
├── favicon-32.png          # 32x32 favicon
├── apple-touch-icon.png    # Apple touch icon (192x192)
└── img/
    ├── icons-192.png       # PWA icon (192x192)
    └── icons-512.png       # PWA icon (512x512)
```

## 🛠️ Core Components

### Service Worker (`sw.js`)
The service worker handles:
- **Caching Strategy**: Implements cache-first strategy for static assets
- **Offline Support**: Serves cached content when network is unavailable
- **Cache Management**: Automatically cleans up old cache versions

**Customization:**
- Modify `staticAssets` array to change which files are cached
- Update `cacheName` to force cache refresh (increment version)

```javascript
const cacheName = "v1.1";
const staticAssets = [
  "/",
  "index.html",
  "app.js",
  "sw.js",
  "styles.css",
  "manifest.webmanifest",
  "img/icons-192.png",
  "img/icons-512.png"
];
```

### Web App Manifest (`manifest.webmanifest`)
Configures the PWA's native app-like behavior:

| Property | Description | Current Value |
|----------|-------------|---------------|
| `short_name` | App name on home screen | "PWA package" |
| `name` | Full application name | "Progressive Web App package" |
| `start_url` | Initial URL when app launches | "/index.html" |
| `display` | Display mode | "standalone" |
| `theme_color` | Status bar color | "#444444" |
| `background_color` | Splash screen background | "#8b8" |

### Connectivity Monitor (`app.js` + `fetch.php`)
- Tests network connectivity by fetching `fetch.php`
- Displays real-time connection status
- PHP endpoint returns CORS headers to prevent access control issues

## 🚦 Getting Started

1. **Clone or download** this repository
2. **Deploy to a PHP-enabled server** with SSL/HTTPS
3. **Customize the manifest** with your app details:
   ```json
   {
     "short_name": "Your App",
     "name": "Your Progressive Web App",
     "theme_color": "#your-color"
   }
   ```
4. **Update the icons** in the `img/` directory with your app icons
5. **Modify cached assets** in `sw.js` if you add/remove files
6. **Test with Lighthouse** to ensure perfect PWA score

## 🎨 Customization

### Styling
Edit `styles.css` to customize the appearance. Current styling includes:
- Clean, minimal design
- Responsive layout (max-width: 600px)
- Color-coded connectivity status (green/red)

### Adding New Pages/Assets
1. Add new files to your project
2. Update the `staticAssets` array in `sw.js`
3. Increment the `cacheName` version

### Icons and Branding
Replace the following files with your own branded assets:
- `img/icons-192.png` (192x192px)
- `img/icons-512.png` (512x512px)
- `apple-touch-icon.png` (192x192px)
- `favicon-32.png` (32x32px)

## 🔧 Development

### Testing Locally
For local development with HTTPS (required for service workers):
```bash
# Using PHP built-in server with stunnel or similar SSL proxy
php -S localhost:8000
```

### Cache Management
To clear the cache during development:
1. Open browser DevTools
2. Go to Application > Storage
3. Click "Clear site data"

Or programmatically by updating the `cacheName` in `sw.js`.

## 📱 Browser Support

This PWA kit supports all modern browsers that implement:
- Service Workers
- Web App Manifest
- Cache API
- Fetch API

Includes fallbacks for browsers without service worker support.

## 📄 License

This project is licensed under the MIT License. This means you can:

- ✅ **Use** — Use the software for any purpose, including commercial projects
- ✅ **Modify** — Change, adapt, and build upon the code
- ✅ **Distribute** — Share the original or modified versions
- ✅ **Private Use** — Use in private/proprietary projects
- ✅ **Commercial Use** — Use in commercial applications and projects

**Requirements:**
- 📝 **Attribution** — Include the original copyright notice and license text
- 🔗 **License Inclusion** — Include the MIT license in any distribution

The MIT License provides maximum freedom while requiring attribution. You can use this PWA kit in your commercial projects, but you cannot sell the kit itself as a standalone product without attribution.

See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

---