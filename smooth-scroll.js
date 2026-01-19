// Premium Smooth Scroll
// Adds buttery smooth scroll interpolation for premium feel

class SmoothScroll {
    constructor() {
        this.targetScroll = 0;
        this.currentScroll = 0;
        this.ease = 0.12; // Increased for more responsive feel
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.rafId = null;
        
        this.init();
    }

    init() {
        // Get initial scroll position
        this.currentScroll = window.pageYOffset;
        this.targetScroll = window.pageYOffset;

        // Track target scroll position
        window.addEventListener('scroll', () => {
            this.targetScroll = window.pageYOffset;
            this.isScrolling = true;
            
            // Clear previous timeout
            clearTimeout(this.scrollTimeout);
            
            // Set timeout to detect scroll stop
            this.scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
            }, 100);
        }, { passive: true });

        // Start smooth animation loop
        this.animate();

        console.log('✨ Premium Smooth Scroll initialized!');
    }

    animate() {
        this.rafId = requestAnimationFrame(() => this.animate());

        // Smooth interpolation with higher ease for more responsiveness
        const diff = this.targetScroll - this.currentScroll;
        this.currentScroll += diff * this.ease;

        // Apply smooth scroll to body
        const absDiff = Math.abs(diff);
        
        // Only dispatch if there's a noticeable difference
        if (absDiff > 0.1) {
            // Dispatch custom event for 3D systems to use
            window.dispatchEvent(new CustomEvent('smoothscroll', {
                detail: {
                    current: this.currentScroll,
                    target: this.targetScroll,
                    isScrolling: this.isScrolling,
                    progress: this.currentScroll / (document.documentElement.scrollHeight - window.innerHeight)
                }
            }));
        }
    }

    getCurrentScroll() {
        return this.currentScroll;
    }

    getTargetScroll() {
        return this.targetScroll;
    }

    isCurrentlyScrolling() {
        return this.isScrolling;
    }
}

// Initialize smooth scroll
const smoothScroll = new SmoothScroll();

// Export for use in other scripts
window.smoothScroll = smoothScroll;

console.log('✨ Smooth Scroll Script Loaded!');
