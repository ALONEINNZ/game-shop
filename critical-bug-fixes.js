// CRITICAL BUG FIXES - Enhanced version working with stop-page-reload system
console.log('🔧 Loading Enhanced Critical Bug Fixes...');

class EnhancedCriticalBugFixes {
    constructor() {
        this.isFixing = false;
        this.scrollPosition = 0;
        this.preventScrollJump = false;
        this.eventListeners = new Map();
        this.init();
    }

    init() {
        console.log('🚨 Applying enhanced critical bug fixes...');
        
        // Wait for stop-page-reload to be ready
        if (window.stopPageReload && window.stopPageReload.isInitialized) {
            this.applyFixes();
        } else {
            // Wait a bit for stop-page-reload to initialize
            setTimeout(() => this.applyFixes(), 100);
        }
    }

    applyFixes() {
        // Fix scroll jumping immediately
        this.fixScrollJumping();
        
        // Fix event conflicts
        this.fixEventConflicts();
        
        // Fix navigation issues
        this.fixNavigationIssues();
        
        // Fix modal conflicts
        this.fixModalConflicts();
        
        // Fix performance issues
        this.fixPerformanceIssues();
        
        // Fix console spam
        this.fixConsoleSpam();
        
        console.log('✅ Enhanced critical bug fixes applied');
    }

    fixScrollJumping() {
        console.log('📜 Fixing scroll jumping with enhanced prevention...');
        
        let isScrolling = false;
        let scrollTimeout;
        let lastScrollTop = 0;
        
        // Enhanced scroll to mods function
        window.scrollToMods = function() {
            const section = document.getElementById('games');
            if (section && !isScrolling) {
                isScrolling = true;
                console.log('🎯 Smooth scrolling to mods section');
                
                const offsetTop = section.offsetTop - 80; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    isScrolling = false;
                    console.log('✅ Scroll completed');
                }, 1500);
            }
        };
        
        // Prevent scroll position jumping
        window.addEventListener('scroll', (e) => {
            if (isScrolling) return;
            
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Detect sudden jumps
            if (Math.abs(currentScrollTop - lastScrollTop) > 500 && lastScrollTop > 0) {
                console.warn('🚨 Scroll jump detected, preventing...');
                window.scrollTo({
                    top: lastScrollTop,
                    behavior: 'instant'
                });
                return;
            }
            
            lastScrollTop = currentScrollTop;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.scrollPosition = currentScrollTop;
            }, 10);
        }, { passive: true });
        
        // Enhanced anchor link handling
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link && link.getAttribute('href') !== '#') {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    isScrolling = true;
                    console.log('🔗 Smooth scrolling to:', targetId);
                    
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        isScrolling = false;
                    }, 1500);
                }
            }
        }, true);
    }

    fixEventConflicts() {
        console.log('⚡ Fixing event conflicts with enhanced detection...');
        
        // Track event listeners to prevent duplicates
        const eventRegistry = new Map();
        
        // Override addEventListener with duplicate prevention
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            const key = `${this.constructor.name}-${type}-${listener.toString().substring(0, 100)}`;
            
            if (!eventRegistry.has(key)) {
                eventRegistry.set(key, true);
                originalAddEventListener.call(this, type, listener, options);
                console.log('📝 Registered event:', type);
            } else {
                console.warn('🚫 Duplicate event prevented:', type);
            }
        };
        
        // Enhanced click event handling
        let clickTimeout;
        document.addEventListener('click', (e) => {
            // Prevent rapid clicks
            if (clickTimeout) {
                console.warn('🚫 Rapid click prevented');
                e.preventDefault();
                e.stopImmediatePropagation();
                return;
            }
            
            clickTimeout = setTimeout(() => {
                clickTimeout = null;
            }, 300);
            
            // Mark as handled
            if (e.target.hasAttribute('data-click-handled')) {
                e.stopImmediatePropagation();
                return;
            }
            e.target.setAttribute('data-click-handled', 'true');
            
            setTimeout(() => {
                e.target.removeAttribute('data-click-handled');
            }, 500);
        }, true);
    }

    fixNavigationIssues() {
        console.log('🧭 Fixing navigation with enhanced stability...');
        
        // Enhanced dropdown handling
        let activeDropdown = null;
        
        window.toggleGameDropdown = () => this.toggleDropdownSafe('gameDropdown');
        window.toggleSocialDropdown = () => this.toggleDropdownSafe('socialDropdown');
        window.toggleCreatorDropdown = () => this.toggleDropdownSafe('creatorDropdown');
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                document.querySelectorAll('.dropdown-menu.show').forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
                activeDropdown = null;
            }
        });
        
        // Enhanced mobile menu
        let mobileMenuOpen = false;
        window.toggleMobileMenu = () => {
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav) {
                mobileMenuOpen = !mobileMenuOpen;
                console.log('📱 Mobile menu:', mobileMenuOpen ? 'opening' : 'closing');
                
                if (mobileMenuOpen) {
                    mobileNav.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        };
    }

    toggleDropdownSafe(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            // Close other dropdowns first
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu.id !== dropdownId) {
                    menu.classList.remove('show');
                }
            });
            
            dropdown.classList.toggle('show');
            console.log('📋 Dropdown toggled:', dropdownId);
        }
    }

    fixModalConflicts() {
        console.log('🪟 Fixing modal conflicts with enhanced management...');
        
        let activeModals = [];
        let modalZIndex = 10000;
        
        // Enhanced modal functions
        window.showModal = (modalId) => {
            const modal = document.getElementById(modalId);
            if (modal && !activeModals.includes(modalId)) {
                activeModals.push(modalId);
                modal.style.display = 'flex';
                modal.style.zIndex = modalZIndex++;
                document.body.style.overflow = 'hidden';
                console.log('🪟 Modal opened:', modalId);
            }
        };
        
        window.hideModal = (modalId) => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                activeModals = activeModals.filter(id => id !== modalId);
                
                if (activeModals.length === 0) {
                    document.body.style.overflow = '';
                }
                console.log('🚪 Modal closed:', modalId);
            }
        };
        
        // Enhanced backdrop click handling
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                const modalId = e.target.id;
                if (modalId) {
                    this.hideModal(modalId);
                }
            }
        });
        
        // Enhanced escape key handling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && activeModals.length > 0) {
                const lastModal = activeModals[activeModals.length - 1];
                this.hideModal(lastModal);
            }
        });
    }

    fixPerformanceIssues() {
        console.log('⚡ Fixing performance with enhanced optimization...');
        
        // Enhanced scroll throttling
        let scrollTimer;
        let isScrollThrottled = false;
        
        const originalScrollHandler = window.onscroll;
        window.onscroll = function(e) {
            if (isScrollThrottled) return;
            
            isScrollThrottled = true;
            requestAnimationFrame(() => {
                if (originalScrollHandler) {
                    originalScrollHandler.call(window, e);
                }
                isScrollThrottled = false;
            });
        };
        
        // Enhanced resize throttling
        let resizeTimer;
        window.addEventListener('resize', (e) => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                console.log('📐 Window resized, adjusting layout');
                this.adjustLayoutForResize();
            }, 250);
        });
        
        // Enhanced animation frame handling
        const runningAnimations = new Set();
        
        window.requestAnimationFrame = (function(originalRAF) {
            return function(callback) {
                const wrappedCallback = function(timestamp) {
                    try {
                        callback(timestamp);
                    } catch (error) {
                        console.warn('🎬 Animation error caught:', error.message);
                    }
                };
                return originalRAF.call(window, wrappedCallback);
            };
        })(window.requestAnimationFrame);
        
        // Auto-disable heavy effects on slower devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            this.enablePerformanceMode();
        }
    }

    fixConsoleSpam() {
        console.log('🔇 Reducing console spam...');
        
        // Track console messages to prevent spam
        const messageCount = new Map();
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;
        
        console.log = function(...args) {
            const message = args.join(' ');
            const count = messageCount.get(message) || 0;
            
            if (count < 3) { // Only show same message 3 times
                messageCount.set(message, count + 1);
                originalLog.apply(console, args);
            }
        };
        
        // Don't spam "ExusCraft successfully loaded" messages
        const originalConsoleLog = console.log;
        console.log = function(...args) {
            const message = args.join(' ');
            if (message.includes('ExusCraft successfully loaded') || 
                message.includes('successfully loaded')) {
                // Only show once
                if (!window.hasShownLoadMessage) {
                    window.hasShownLoadMessage = true;
                    originalConsoleLog.apply(console, args);
                }
            } else {
                originalConsoleLog.apply(console, args);
            }
        };
    }

    adjustLayoutForResize() {
        // Adjust navigation layout
        const navbar = document.querySelector('.navbar');
        const navContainer = document.querySelector('.nav-container');
        
        if (navbar && navContainer) {
            const width = window.innerWidth;
            
            if (width < 768) {
                // Mobile adjustments
                navContainer.style.padding = '1rem';
            } else if (width < 1200) {
                // Tablet adjustments
                navContainer.style.padding = '1rem 1.5rem';
            } else {
                // Desktop adjustments
                navContainer.style.padding = '1rem 2rem';
            }
        }
    }

    enablePerformanceMode() {
        console.log('🚀 Enabling performance mode for slower device');
        
        // Disable heavy animations
        document.querySelectorAll('.hero-particles, .hex-container, .particle-field').forEach(el => {
            el.style.display = 'none';
        });
        
        // Reduce animation duration
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
        
        // Show performance notification
        this.showNotification('Performance mode enabled for better experience', 'info');
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
        }, 4000);
    }

    // Emergency reset function
    emergencyReset() {
        console.log('🚨 Enhanced emergency reset activated');
        
        // Stop all animations
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
        
        // Clear all timeouts and intervals
        const highestTimeoutId = setTimeout(() => {}, 0);
        for (let i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }
        
        const highestIntervalId = setInterval(() => {}, 0);
        for (let i = 0; i < highestIntervalId; i++) {
            clearInterval(i);
        }
        
        // Reset scroll position smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Close all modals
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        
        // Reset body overflow
        document.body.style.overflow = '';
        
        // Show success message
        this.showNotification('Emergency reset completed successfully!', 'success');
        
        console.log('✅ Enhanced emergency reset complete');
    }
}

// Global emergency functions
window.emergencyReset = function() {
    if (window.enhancedCriticalBugFixes) {
        window.enhancedCriticalBugFixes.emergencyReset();
    }
};

window.fixScrolling = function() {
    console.log('🔧 Manual scroll fix');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Initialize enhanced fixes
window.enhancedCriticalBugFixes = new EnhancedCriticalBugFixes();

console.log('✅ Enhanced Critical Bug Fixes loaded successfully!');