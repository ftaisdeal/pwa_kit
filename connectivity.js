/**
 * Advanced Connectivity Detection Module
 * Modern replacement for PHP-based connectivity testing
 */

class ConnectivityDetector {
  constructor() {
    this.isOnline = navigator.onLine;
    this.networkInfo = this.getNetworkInfo();
    this.lastCheck = null;
    this.checkInterval = null;
    this.callbacks = {
      online: [],
      offline: [],
      change: []
    };
    
    this.init();
  }
  
  init() {
    // Set up event listeners
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
    
    // Network Information API listener
    if (this.networkInfo?.connection) {
      this.networkInfo.connection.addEventListener('change', () => {
        this.handleNetworkChange();
      });
    }
    
    // Visibility change listener
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.isOnline) {
        this.checkConnectivity();
      }
    });
    
    // Start periodic checks
    this.startPeriodicChecks();
  }
  
  getNetworkInfo() {
    if ('connection' in navigator) {
      const connection = navigator.connection || 
                        navigator.mozConnection || 
                        navigator.webkitConnection;
      return { connection };
    }
    return null;
  }
  
  async checkConnectivity() {
    const testEndpoints = [
      // Fast, reliable endpoints
      { url: 'https://www.gstatic.com/generate_204', timeout: 3000 },
      { url: 'https://httpbin.org/status/200', timeout: 5000 },
      { url: 'https://api.github.com', timeout: 5000 },
      // Fallback to local resources
      { url: '/favicon-32.png', timeout: 2000 },
      { url: '/', timeout: 2000 }
    ];
    
    if (!navigator.onLine) {
      this.updateStatus(false, 'offline');
      return false;
    }
    
    // Test multiple endpoints
    for (const endpoint of testEndpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), endpoint.timeout);
        
        const response = await fetch(endpoint.url, {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // If we reach here, we have connectivity
        this.updateStatus(true, 'online');
        return true;
        
      } catch (error) {
        console.log(`Connectivity test failed for ${endpoint.url}:`, error.message);
        continue;
      }
    }
    
    // All endpoints failed
    this.updateStatus(false, 'limited');
    return false;
  }
  
  updateStatus(isOnline, type = 'unknown') {
    const wasOnline = this.isOnline;
    this.isOnline = isOnline;
    this.lastCheck = new Date();
    
    // Trigger callbacks
    if (isOnline && !wasOnline) {
      this.callbacks.online.forEach(callback => callback(type));
    } else if (!isOnline && wasOnline) {
      this.callbacks.offline.forEach(callback => callback(type));
    }
    
    this.callbacks.change.forEach(callback => callback(isOnline, type));
  }
  
  handleOnline() {
    console.log('Browser online event detected');
    // Verify actual connectivity
    setTimeout(() => this.checkConnectivity(), 1000);
  }
  
  handleOffline() {
    console.log('Browser offline event detected');
    this.updateStatus(false, 'offline');
  }
  
  handleNetworkChange() {
    console.log('Network conditions changed');
    if (this.networkInfo?.connection) {
      const conn = this.networkInfo.connection;
      console.log(`Network: ${conn.effectiveType}, ${conn.downlink}Mbps, ${conn.rtt}ms RTT`);
    }
    // Delay check to let network stabilize
    setTimeout(() => this.checkConnectivity(), 2000);
  }
  
  startPeriodicChecks(interval = 30000) {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    
    this.checkInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.checkConnectivity();
      }
    }, interval);
  }
  
  stopPeriodicChecks() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }
  
  // Public API
  on(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event].push(callback);
    }
  }
  
  off(event, callback) {
    if (this.callbacks[event]) {
      const index = this.callbacks[event].indexOf(callback);
      if (index > -1) {
        this.callbacks[event].splice(index, 1);
      }
    }
  }
  
  getStatus() {
    return {
      isOnline: this.isOnline,
      lastCheck: this.lastCheck,
      networkInfo: this.getNetworkDetails()
    };
  }
  
  getNetworkDetails() {
    if (this.networkInfo?.connection) {
      const conn = this.networkInfo.connection;
      return {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData
      };
    }
    return null;
  }
  
  async forceCheck() {
    return await this.checkConnectivity();
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ConnectivityDetector;
} else if (typeof window !== 'undefined') {
  window.ConnectivityDetector = ConnectivityDetector;
}
