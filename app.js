// Service Worker Registration with Error Handling
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration.scope);
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New service worker installed, page will refresh...');
            // Optionally show update notification to user
            setTimeout(() => window.location.reload(), 1000);
          }
        });
      });
      
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  } else {
    console.warn('Service Workers are not supported in this browser');
  }
}

// Enhanced Connectivity Detection without PHP dependency
async function checkConnectivity() {
  const container = document.getElementById('container');
  const connectedMessage = '<span class="green">✓ Online and connected.</span>';
  const disconnectedMessage = '<span class="red">✗ No internet connection.</span>';
  const limitedMessage = '<span class="orange">⚠ Limited connectivity detected.</span>';
  const checkingMessage = '<span class="checking">Checking connectivity...</span>';
  
  // Show checking state
  container.innerHTML = checkingMessage;
  
  // First check browser's online status
  if (!navigator.onLine) {
    container.innerHTML = disconnectedMessage;
    return;
  }
  
  try {
    // Method 1: Test with a reliable external service
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    // Use multiple fallback endpoints for reliability
    const testEndpoints = [
      'https://www.google.com/favicon.ico',
      'https://httpbin.org/status/200',
      'https://api.github.com',
      '/favicon-32.png' // Local fallback
    ];
    
    let isConnected = false;
    
    for (const endpoint of testEndpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'HEAD', // Faster than GET
          mode: 'no-cors', // Avoid CORS issues
          cache: 'no-cache',
          signal: controller.signal
        });
        
        // For no-cors requests, we just check if the fetch succeeded
        isConnected = true;
        break;
      } catch (error) {
        console.log(`Failed to reach ${endpoint}:`, error.message);
        continue;
      }
    }
    
    clearTimeout(timeoutId);
    
    if (isConnected) {
      container.innerHTML = connectedMessage;
      console.log('Connectivity check: Online');
    } else {
      // Browser thinks we're online but can't reach any endpoints
      container.innerHTML = limitedMessage;
      console.log('Connectivity check: Limited connectivity');
    }
    
  } catch (error) {
    container.innerHTML = disconnectedMessage;
    
    if (error.name === 'AbortError') {
      console.warn('Connectivity check timed out');
    } else {
      console.error('Connectivity check failed:', error.message);
    }
  }
}

// Alternative Method: Network Information API (when available)
function getNetworkInfo() {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
      return {
        effectiveType: connection.effectiveType, // '4g', '3g', etc.
        downlink: connection.downlink, // Mbps
        rtt: connection.rtt, // Round trip time in ms
        saveData: connection.saveData // Data saver mode
      };
    }
  }
  return null;
}

// Enhanced connectivity with network quality info
function displayNetworkStatus() {
  const container = document.getElementById('container');
  const networkInfo = getNetworkInfo();
  
  if (!navigator.onLine) {
    container.innerHTML = '<span class="red">✗ Offline</span>';
    return;
  }
  
  let statusHTML = '<span class="green">✓ Online</span>';
  
  if (networkInfo) {
    const { effectiveType, downlink, rtt, saveData } = networkInfo;
    statusHTML += ` <small>(${effectiveType}`;
    
    if (downlink) {
      statusHTML += `, ${downlink} Mbps`;
    }
    
    if (rtt) {
      statusHTML += `, ${rtt}ms`;
    }
    
    if (saveData) {
      statusHTML += `, Data Saver`;
    }
    
    statusHTML += ')</small>';
  }
  
  container.innerHTML = statusHTML;
}

// Network Status Monitoring with enhanced detection
function setupNetworkMonitoring() {
  function updateOnlineStatus() {
    if (navigator.onLine) {
      // When coming online, do a full connectivity check
      checkConnectivity();
    } else {
      // When going offline, show offline status immediately
      const container = document.getElementById('container');
      container.innerHTML = '<span class="red">✗ Device is offline.</span>';
    }
  }
  
  // Listen for online/offline events
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // Listen for network changes (if supported)
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      connection.addEventListener('change', () => {
        console.log('Network conditions changed');
        // Slight delay to let the network stabilize
        setTimeout(checkConnectivity, 1000);
      });
    }
  }
  
  // Periodic connectivity checks (every 30 seconds when online)
  setInterval(() => {
    if (navigator.onLine && document.visibilityState === 'visible') {
      checkConnectivity();
    }
  }, 30000);
  
  // Check connectivity when page becomes visible
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && navigator.onLine) {
      checkConnectivity();
    }
  });
}

// Initialize App
function initializeApp() {
  registerServiceWorker();
  setupNetworkMonitoring();
  checkConnectivity();
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Legacy support for onload attribute (if needed)
window.runFetch = checkConnectivity;
