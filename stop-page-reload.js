// STOP PAGE RELOAD - Prevent all page reloading and refreshing issues
console.log('🛑 Loading Page Reload Prevention...');

class StopPageReload {
    constructor() {
        this.isInitialized = false;
        this.preventReload = true;
        this.init();
    }

    init() {
        console.log('🚨 Preventing page reloads...');
        
        // Apply fixes immediately
        this.preventAllReloads();
        this.overrideLocationMethods();
        this.preventFormSubmissions();
        this.preventLinkNavigation();
        this.preventHashChanges();
        this.preventHistoryChanges();
        this.preventWindowReload();
        
        this.isInitialized = true;
        console.log('✅ Page reload prevention active');
    }

    preventAllReloads() {
        // Override window.location methods
        const originalReload = window.location.reload;
        window.location.reload = function() {
            console.warn('🛑 Page reload prevented!');
            return false;
        };

        // Override location.href changes
        let currentHref = window.location.href;
        Object.defineProperty(window.location, 'href', {
            get: function() {
                return currentHref;
            },
            set: function(value) {
                console.warn('🛑 Location change prevented:', value);
                return false;
            }
        });

        // Prevent window.open redirects
        const originalOpen = window.open;
        window.open = function(url, target, features) {
            if (target === '_self' || !target) {
                console.warn('🛑 Window redirect prevented:', url);
                return null;
            }
            return originalOpen.call(window, url, target, features);
        };
    }

    overrideLocationMethods() {
        // Prevent location.assign
        window.location.assign = function(url) {
            console.warn('🛑 Location.assign prevented:', url);
            return false;
        };

        // Prevent location.replace
        window.location.replace = function(url) {
            console.warn('🛑 Location.replace prevented:', url);
            return false;
        };

        // Prevent document.location changes
        Object.defineProperty(document, 'location', {
            get: function() {
                return window.location;
            },
            set: function(value) {
                console.warn('🛑 Document.location change prevented:', value);
                return false;
            }
        });
    }

    preventFormSubmissions() {
        // Prevent form submissions that cause page reload
        document.addEventListener('submit', (e) => {
            console.warn('🛑 Form submission prevented');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }, true);

        // Override form.submit method
        const originalSubmit = HTMLFormElement.prototype.submit;
        HTMLFormElement.prototype.submit = function() {
            console.warn('🛑 Form.submit() prevented');
            return false;
        };
    }

    preventLinkNavigation() {
        // Prevent link navigation that causes page reload
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link) {
                const href = link.getAttribute('href');
                
                // Allow hash links and external links
                if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                    console.warn('🛑 Link navigation prevented:', href);
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }
                
                // Handle hash links properly
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                    return false;
                }
            }
        }, true);
    }

    preventHashChanges() {
        // Prevent hash changes that cause issues
        window.addEventListener('hashchange', (e) => {
            console.log('📍 Hash change detected, handling smoothly');
            e.preventDefault();
            
            const hash = window.location.hash;
            if (hash) {
                const target = document.querySelector(hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    preventHistoryChanges() {
        // Override history methods
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function(state, title, url) {
            console.log('📝 History.pushState intercepted:', url);
            // Only allow if it's the same page
            if (url && url !== window.location.pathname && url !== window.location.href) {
                console.warn('🛑 History.pushState prevented:', url);
                return;
            }
            return originalPushState.call(history, state, title, url);
        };

        history.replaceState = function(state, title, url) {
            console.log('📝 History.replaceState intercepted:', url);
            // Only allow if it's the same page
            if (url && url !== window.location.pathname && url !== window.location.href) {
                console.warn('🛑 History.replaceState prevented:', url);
                return;
            }
            return originalReplaceState.call(history, state, title, url);
        };

        // Prevent popstate issues
        window.addEventListener('popstate', (e) => {
            console.log('⬅️ Popstate event intercepted');
            e.preventDefault();
        });
    }

    preventWindowReload() {
        // Prevent any window reload attempts
        window.addEventListener('beforeunload', (e) => {
            if (this.preventReload) {
                console.warn('🛑 Page unload prevented');
                e.preventDefault();
                e.returnValue = '';
                return '';
            }
        });

        // Prevent refresh key combinations
        document.addEventListener('keydown', (e) => {
            // Prevent F5
            if (e.key === 'F5') {
                console.warn('🛑 F5 refresh prevented');
                e.preventDefault();
                return false;
            }
            
            // Prevent Ctrl+R
            if (e.ctrlKey && e.key === 'r') {
                console.warn('🛑 Ctrl+R refresh prevented');
                e.preventDefault();
                return false;
            }
            
            // Prevent Ctrl+F5
            if (e.ctrlKey && e.key === 'F5') {
                console.warn('🛑 Ctrl+F5 refresh prevented');
                e.preventDefault();
                return false;
            }
        });
    }

    // Emergency disable function
    disableReloadPrevention() {
        console.log('🔓 Disabling reload prevention');
        this.preventReload = false;
        
        // Show notification
        this.showNotification('Page reload prevention disabled', 'warning');
    }

    // Emergency enable function
    enableReloadPrevention() {
        console.log('🔒 Enabling reload prevention');
        this.preventReload = true;
        
        // Show notification
        this.showNotification('Page reload prevention enabled', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999999;
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-weight: 600;
            animation: slideDown 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global functions
window.disableReloadPrevention = function() {
    if (window.stopPageReload) {
        window.stopPageReload.disableReloadPrevention();
    }
};

window.enableReloadPrevention = function() {
    if (window.stopPageReload) {
        window.stopPageReload.enableReloadPrevention();
    }
};

// Initialize immediately - before any other scripts
window.stopPageReload = new StopPageReload();

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log('✅ Stop Page Reload system loaded successfully!');