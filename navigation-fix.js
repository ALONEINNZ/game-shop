// NAVIGATION FIX - Fix cut-off navigation and layout issues
console.log('🧭 Loading Navigation Fix...');

class NavigationFix {
    constructor() {
        this.init();
    }

    init() {
        console.log('🔧 Fixing navigation layout...');
        
        // Fix immediately on load
        this.fixNavigationLayout();
        
        // Fix on window resize
        window.addEventListener('resize', () => {
            this.fixNavigationLayout();
        });
        
        // Fix after DOM is fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.fixNavigationLayout();
        });
        
        console.log('✅ Navigation fix applied');
    }

    fixNavigationLayout() {
        const navbar = document.querySelector('.navbar');
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navbar) {
            // Ensure navbar is properly positioned
            navbar.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                width: 100% !important;
                z-index: 1000 !important;
                background: rgba(10, 14, 20, 0.95) !important;
                backdrop-filter: blur(10px) !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                padding: 0 !important;
                margin: 0 !important;
                box-sizing: border-box !important;
            `;
        }

        if (navContainer) {
            // Fix container layout
            navContainer.style.cssText = `
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding: 1rem 2rem !important;
                max-width: 100% !important;
                margin: 0 auto !important;
                box-sizing: border-box !important;
                overflow: visible !important;
            `;
        }

        if (navMenu) {
            // Fix menu layout
            navMenu.style.cssText = `
                display: flex !important;
                align-items: center !important;
                gap: 1rem !important;
                flex-wrap: nowrap !important;
                overflow: visible !important;
                white-space: nowrap !important;
            `;
        }

        // Fix dropdown positioning
        this.fixDropdowns();
        
        // Fix mobile responsiveness
        this.fixMobileNavigation();
        
        // Add body padding to account for fixed navbar
        document.body.style.paddingTop = '80px';
    }

    fixDropdowns() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        
        dropdowns.forEach(dropdown => {
            dropdown.style.position = 'relative';
            
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.cssText = `
                    position: absolute !important;
                    top: 100% !important;
                    left: 0 !important;
                    right: auto !important;
                    background: rgba(30, 41, 59, 0.95) !important;
                    backdrop-filter: blur(10px) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 8px !important;
                    padding: 0.5rem 0 !important;
                    min-width: 200px !important;
                    max-width: 300px !important;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
                    z-index: 1001 !important;
                    display: none !important;
                    white-space: nowrap !important;
                `;
                
                // Ensure dropdown links are properly styled
                const links = menu.querySelectorAll('a');
                links.forEach(link => {
                    link.style.cssText = `
                        display: block !important;
                        padding: 0.75rem 1rem !important;
                        color: white !important;
                        text-decoration: none !important;
                        transition: background 0.2s !important;
                        white-space: nowrap !important;
                        overflow: hidden !important;
                        text-overflow: ellipsis !important;
                    `;
                    
                    link.addEventListener('mouseenter', () => {
                        link.style.background = 'rgba(91, 140, 255, 0.2)';
                    });
                    
                    link.addEventListener('mouseleave', () => {
                        link.style.background = 'transparent';
                    });
                });
            }
        });
    }

    fixMobileNavigation() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (mobileToggle) {
            mobileToggle.style.cssText = `
                display: none !important;
                background: none !important;
                border: none !important;
                color: white !important;
                font-size: 1.5rem !important;
                cursor: pointer !important;
                padding: 0.5rem !important;
            `;
        }

        if (mobileNav) {
            mobileNav.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                right: -100% !important;
                width: 300px !important;
                height: 100vh !important;
                background: rgba(10, 14, 20, 0.98) !important;
                backdrop-filter: blur(20px) !important;
                z-index: 1002 !important;
                transition: right 0.3s ease !important;
                overflow-y: auto !important;
                padding: 2rem !important;
                box-sizing: border-box !important;
            `;
        }

        // Show mobile toggle on small screens
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        this.handleMobileView(mediaQuery);
        mediaQuery.addListener(this.handleMobileView.bind(this));
    }

    handleMobileView(mediaQuery) {
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mediaQuery.matches) {
            // Mobile view
            if (navMenu) {
                navMenu.style.display = 'none';
            }
            if (mobileToggle) {
                mobileToggle.style.display = 'block';
            }
        } else {
            // Desktop view
            if (navMenu) {
                navMenu.style.display = 'flex';
            }
            if (mobileToggle) {
                mobileToggle.style.display = 'none';
            }
        }
    }
}

// Initialize navigation fix immediately
window.navigationFix = new NavigationFix();

console.log('✅ Navigation Fix loaded successfully!');