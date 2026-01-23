// SCROLL STABILIZER - Advanced scroll jump prevention and smooth scrolling
console.log('📜 Loading Advanced Scroll Stabilizer...');

class ScrollStabilizer {
    constructor() {
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.lastScrollTop = 0;
        this.scrollDirection = 'down';
        this.scrollVelocity = 0;
        this.preventJumps = true;
        this.smoothScrollActive = false;
        this.init();
    }

    init() {
        console.log('🎯 Initializing advanced scroll stabilization...');
        
        this.setupScrollPrevention();
        this.setupSmoothScrolling();
        this.setupScrollMonitoring();
        this.setupScrollFunctions();
        this.setupKeyboardScrolling();
        
        console.log('✅ Advanced scroll stabilizer ready');
    }

    setupScrollPrevention() {
        // Advanced scroll jump detection and prevention
        let scrollBuffer = [];
        const bufferSize = 5;
        
        window.addEventListener('scroll', (e) => {
            if (this.smoothScrollActive) return;
            
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDelta = currentScrollTop - this.lastScrollTop;
            
            // Add to buffer
            scrollBuffer.push({
                position: currentScrollTop,
                delta: scrollDelta,
                timestamp: Date.now()
            });
            
            // Keep buffer size manageable
            if (scrollBuffer.length > bufferSize) {
                scrollBuffer.shift();
            }
            
            // Detect sudden jumps (more than 300px in one frame)
            if (Math.abs(scrollDelta) > 300 && this.lastScrollTop > 0) {
                console.warn('🚨 Large scroll jump detected:', scrollDelta, 'px');
                
                // Prevent the jump by scrolling back
                e.preventDefault();
                this.smoothScrollActive = true;
                
                window.scrollTo({
                    top: this.lastScrollTop,
                    behavior: 'instant'
                });
                
                setTimeout(() => {
                    this.smoothScrollActive = false;
                }, 100);
                
                return;
            }
            
            // Detect rapid position changes that indicate page reload
            if (scrollBuffer.length >= 3) {
                const recentScrolls = scrollBuffer.slice(-3);
                const hasLargeJumps = recentScrolls.some(scroll => Math.abs(scroll.delta) > 200);
                const timeSpan = recentScrolls[2].timestamp - recentScrolls[0].timestamp;
                
                if (hasLargeJumps && timeSpan < 100) {
                    console.warn('🚨 Rapid scroll changes detected - possible page reload');
                    this.stabilizeScroll();
                    return;
                }
            }
            
            // Update tracking variables
            this.scrollDirection = scrollDelta > 0 ? 'down' : 'up';
            this.scrollVelocity = Math.abs(scrollDelta);
            this.lastScrollTop = currentScrollTop;
            
            // Clear any existing timeout
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
            }, 150);
            
        }, { passive: false });
    }

    setupSmoothScrolling() {
        // Override all scroll functions with smooth alternatives
        const originalScrollTo = window.scrollTo;
        const originalScrollBy = window.scrollBy;
        
        window.scrollTo = (x, y) => {
            if (typeof x === 'object') {
                // Modern scrollTo with options
                this.smoothScrollActive = true;
                originalScrollTo.call(window, {
                    ...x,
                    behavior: x.behavior || 'smooth'
                });
                
                setTimeout(() => {
                    this.smoothScrollActive = false;
                }, 1000);
            } else {
                // Legacy scrollTo
                this.smoothScrollActive = true;
                originalScrollTo.call(window, {
                    top: y,
                    left: x,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    this.smoothScrollActive = false;
                }, 1000);
            }
        };
        
        window.scrollBy = (x, y) => {
            if (typeof x === 'object') {
                this.smoothScrollActive = true;
                originalScrollBy.call(window, {
                    ...x,
                    behavior: x.behavior || 'smooth'
                });
            } else {
                this.smoothScrollActive = true;
                originalScrollBy.call(window, {
                    top: y,
                    left: x,
                    behavior: 'smooth'
                });
            }
            
            setTimeout(() => {
                this.smoothScrollActive = false;
            }, 1000);
        };
    }

    setupScrollMonitoring() {
        // Monitor for scroll-related page reloads
        let scrollResetCount = 0;
        let lastResetTime = 0;
        
        const checkForScrollReset = () => {
            const currentTime = Date.now();
            const currentScroll = window.pageYOffset;
            
            // If scroll suddenly goes to 0 and we were scrolled down
            if (currentScroll === 0 && this.lastScrollTop > 100) {
                scrollResetCount++;
                
                if (currentTime - lastResetTime < 2000) {
                    console.warn('🚨 Multiple scroll resets detected - preventing page reload behavior');
                    this.preventScrollReset();
                }
                
                lastResetTime = currentTime;
            }
        };
        
        setInterval(checkForScrollReset, 100);
    }

    setupScrollFunctions() {
        // Enhanced scroll to mods function
        window.scrollToMods = () => {
            const section = document.getElementById('games');
            if (section && !this.isScrolling) {
                this.isScrolling = true;
                this.smoothScrollActive = true;
                
                console.log('🎯 Smooth scrolling to mods section');
                
                const offsetTop = section.offsetTop - 80; // Account for navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    this.isScrolling = false;
                    this.smoothScrollActive = false;
                    console.log('✅ Scroll to mods completed');
                }, 1500);
            }
        };
        
        // Enhanced scroll to top function
        window.scrollToTop = () => {
            if (!this.isScrolling) {
                this.isScrolling = true;
                this.smoothScrollActive = true;
                
                console.log('⬆️ Smooth scrolling to top');
                
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    this.isScrolling = false;
                    this.smoothScrollActive = false;
                }, 1000);
            }
        };
        
        // Enhanced anchor link handling
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link && link.getAttribute('href') !== '#') {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target && !this.isScrolling) {
                    this.isScrolling = true;
                    this.smoothScrollActive = true;
                    
                    console.log('🔗 Smooth scrolling to anchor:', targetId);
                    
                    const offsetTop = target.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        this.isScrolling = false;
                        this.smoothScrollActive = false;
                    }, 1500);
                }
            }
        }, true);
    }

    setupKeyboardScrolling() {
        // Handle keyboard scrolling smoothly
        document.addEventListener('keydown', (e) => {
            if (this.smoothScrollActive) {
                e.preventDefault();
                return;
            }
            
            const scrollAmount = 100;
            let shouldScroll = false;
            let scrollTop = 0;
            
            switch (e.key) {
                case 'ArrowUp':
                    scrollTop = Math.max(0, window.pageYOffset - scrollAmount);
                    shouldScroll = true;
                    break;
                case 'ArrowDown':
                    scrollTop = window.pageYOffset + scrollAmount;
                    shouldScroll = true;
                    break;
                case 'PageUp':
                    scrollTop = Math.max(0, window.pageYOffset - window.innerHeight * 0.8);
                    shouldScroll = true;
                    break;
                case 'PageDown':
                    scrollTop = window.pageYOffset + window.innerHeight * 0.8;
                    shouldScroll = true;
                    break;
                case 'Home':
                    if (e.ctrlKey) {
                        scrollTop = 0;
                        shouldScroll = true;
                    }
                    break;
                case 'End':
                    if (e.ctrlKey) {
                        scrollTop = document.documentElement.scrollHeight;
                        shouldScroll = true;
                    }
                    break;
            }
            
            if (shouldScroll) {
                e.preventDefault();
                this.smoothScrollActive = true;
                
                window.scrollTo({
                    top: scrollTop,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    this.smoothScrollActive = false;
                }, 800);
            }
        });
    }

    stabilizeScroll() {
        console.log('🔧 Stabilizing scroll position...');
        
        // Stop all current scrolling
        this.smoothScrollActive = true;
        
        // Get current position
        const currentPosition = window.pageYOffset;
        
        // Force position to stay stable
        window.scrollTo({
            top: currentPosition,
            behavior: 'instant'
        });
        
        // Re-enable scrolling after a short delay
        setTimeout(() => {
            this.smoothScrollActive = false;
            console.log('✅ Scroll stabilized at position:', currentPosition);
        }, 200);
    }

    preventScrollReset() {
        console.log('🛡️ Preventing scroll reset...');
        
        // If we have a valid last position, restore it
        if (this.lastScrollTop > 0) {
            this.smoothScrollActive = true;
            
            window.scrollTo({
                top: this.lastScrollTop,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                this.smoothScrollActive = false;
            }, 1000);
        }
    }

    // Emergency scroll fix
    emergencyScrollFix() {
        console.log('🚨 Emergency scroll fix activated');
        
        // Stop all scrolling
        this.smoothScrollActive = true;
        
        // Clear all scroll-related timeouts
        clearTimeout(this.scrollTimeout);
        
        // Reset to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Reset all tracking variables
        this.lastScrollTop = 0;
        this.scrollDirection = 'down';
        this.scrollVelocity = 0;
        this.isScrolling = false;
        
        setTimeout(() => {
            this.smoothScrollActive = false;
            console.log('✅ Emergency scroll fix completed');
        }, 1500);
        
        // Show notification
        this.showNotification('Scroll position reset successfully', 'success');
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
window.emergencyScrollFix = function() {
    if (window.scrollStabilizer) {
        window.scrollStabilizer.emergencyScrollFix();
    }
};

window.stabilizeScroll = function() {
    if (window.scrollStabilizer) {
        window.scrollStabilizer.stabilizeScroll();
    }
};

// Initialize scroll stabilizer
window.scrollStabilizer = new ScrollStabilizer();

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
    
    html {
        scroll-behavior: smooth !important;
    }
`;
document.head.appendChild(style);

console.log('✅ Advanced Scroll Stabilizer loaded successfully!');