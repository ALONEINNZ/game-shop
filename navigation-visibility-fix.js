// NAVIGATION VISIBILITY FIX - Ensure all navigation content is visible and not cut off
console.log('👁️ Loading Navigation Visibility Fix...');

class NavigationVisibilityFix {
    constructor() {
        this.init();
    }

    init() {
        console.log('🔍 Fixing navigation visibility issues...');
        
        // Apply fixes immediately
        this.fixNavigationVisibility();
        
        // Apply fixes after DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.fixNavigationVisibility());
        }
        
        // Apply fixes on window resize
        window.addEventListener('resize', () => this.fixNavigationVisibility());
        
        // Apply fixes periodically to catch any dynamic changes
        setInterval(() => this.fixNavigationVisibility(), 2000);
        
        console.log('✅ Navigation visibility fix applied');
    }

    fixNavigationVisibility() {
        this.fixNavbarLayout();
        this.fixDropdownVisibility();
        this.fixMobileNavigation();
        this.fixContentVisibility();
        this.fixResponsiveBreakpoints();
    }

    fixNavbarLayout() {
        const navbar = document.querySelector('.navbar');
        const navContainer = document.querySelector('.nav-container');
        
        if (navbar) {
            // Ensure navbar is fully visible and properly positioned
            navbar.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                width: 100vw !important;
                z-index: 1000 !important;
                background: rgba(10, 14, 20, 0.95) !important;
                backdrop-filter: blur(10px) !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                padding: 0 !important;
                margin: 0 !important;
                box-sizing: border-box !important;
                overflow: visible !important;
                min-height: 70px !important;
                max-height: none !important;
            `;
        }

        if (navContainer) {
            // Ensure container doesn't cut off content
            navContainer.style.cssText = `
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding: 1rem 2rem !important;
                max-width: 100% !important;
                margin: 0 auto !important;
                box-sizing: border-box !important;
                overflow: visible !important;
                flex-wrap: nowrap !important;
                min-height: 70px !important;
            `;
        }

        // Fix navigation menu layout
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.cssText = `
                display: flex !important;
                align-items: center !important;
                gap: 1rem !important;
                flex-wrap: nowrap !important;
                overflow: visible !important;
                white-space: nowrap !important;
                flex-shrink: 0 !important;
            `;
        }

        // Fix navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.style.cssText = `
                display: flex !important;
                align-items: center !important;
                gap: 0.5rem !important;
                padding: 0.75rem 1rem !important;
                color: rgba(255, 255, 255, 0.9) !important;
                text-decoration: none !important;
                border-radius: 8px !important;
                transition: all 0.3s ease !important;
                white-space: nowrap !important;
                font-size: 0.9rem !important;
                font-weight: 500 !important;
                overflow: visible !important;
            `;
        });
    }

    fixDropdownVisibility() {
        // Fix all dropdown menus
        document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
            dropdown.style.cssText = `
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
                overflow: visible !important;
                margin-top: 0.5rem !important;
            `;

            // Ensure dropdown is positioned correctly
            const parent = dropdown.closest('.nav-dropdown');
            if (parent) {
                parent.style.position = 'relative';
                parent.style.overflow = 'visible';
            }
        });

        // Fix dropdown links
        document.querySelectorAll('.dropdown-menu a').forEach(link => {
            link.style.cssText = `
                display: block !important;
                padding: 0.75rem 1rem !important;
                color: white !important;
                text-decoration: none !important;
                transition: background 0.2s !important;
                white-space: nowrap !important;
                overflow: visible !important;
                font-size: 0.9rem !important;
            `;
        });

        // Show dropdown on hover for better visibility
        document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                dropdown.addEventListener('mouseenter', () => {
                    menu.classList.add('show');
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    setTimeout(() => {
                        if (!dropdown.matches(':hover')) {
                            menu.classList.remove('show');
                        }
                    }, 100);
                });
            }
        });
    }

    fixMobileNavigation() {
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
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

        // Handle mobile breakpoint
        this.handleMobileBreakpoint();
    }

    fixContentVisibility() {
        // Ensure all main content is visible
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.cssText = `
                padding: 4rem 0 !important;
                width: 100% !important;
                overflow-x: hidden !important;
                overflow-y: visible !important;
                opacity: 1 !important;
                visibility: visible !important;
            `;
        });

        // Fix section headers
        document.querySelectorAll('.section-header').forEach(header => {
            header.style.cssText = `
                margin-bottom: 3rem !important;
                text-align: center !important;
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
            `;
        });

        // Fix section titles
        document.querySelectorAll('.section-title').forEach(title => {
            title.style.cssText = `
                font-size: 2.5rem !important;
                font-weight: 700 !important;
                margin-bottom: 1rem !important;
                color: white !important;
                opacity: 1 !important;
                visibility: visible !important;
            `;
        });

        // Fix section subtitles
        document.querySelectorAll('.section-subtitle').forEach(subtitle => {
            subtitle.style.cssText = `
                font-size: 1.1rem !important;
                opacity: 0.8 !important;
                max-width: 600px !important;
                margin: 0 auto !important;
                color: rgba(255, 255, 255, 0.8) !important;
                visibility: visible !important;
            `;
        });

        // Ensure body has proper padding for fixed navbar
        document.body.style.paddingTop = '80px';
    }

    fixResponsiveBreakpoints() {
        const width = window.innerWidth;
        
        if (width <= 768) {
            this.applyMobileStyles();
        } else if (width <= 1200) {
            this.applyTabletStyles();
        } else {
            this.applyDesktopStyles();
        }
    }

    applyMobileStyles() {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        const navAuth = document.querySelector('.nav-auth');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navSearch = document.querySelector('.nav-search');

        if (navContainer) {
            navContainer.style.padding = '1rem';
        }

        if (navMenu) {
            navMenu.style.display = 'none';
        }

        if (navAuth) {
            navAuth.style.display = 'none';
        }

        if (navSearch) {
            navSearch.style.display = 'none';
        }

        if (mobileToggle) {
            mobileToggle.style.display = 'block';
        }

        // Adjust mobile nav width
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav) {
            mobileNav.style.width = '100%';
        }
    }

    applyTabletStyles() {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        const navAuth = document.querySelector('.nav-auth');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navSearch = document.querySelector('.nav-search');

        if (navContainer) {
            navContainer.style.padding = '1rem 1.5rem';
        }

        if (navMenu) {
            navMenu.style.display = 'flex';
            navMenu.style.gap = '0.5rem';
        }

        if (navAuth) {
            navAuth.style.display = 'flex';
        }

        if (navSearch) {
            navSearch.style.display = 'flex';
            navSearch.style.maxWidth = '250px';
        }

        if (mobileToggle) {
            mobileToggle.style.display = 'none';
        }

        // Adjust nav links for tablet
        document.querySelectorAll('.nav-link').forEach(link => {
            link.style.padding = '0.5rem 0.75rem';
            link.style.fontSize = '0.85rem';
        });
    }

    applyDesktopStyles() {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        const navAuth = document.querySelector('.nav-auth');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navSearch = document.querySelector('.nav-search');

        if (navContainer) {
            navContainer.style.padding = '1rem 2rem';
        }

        if (navMenu) {
            navMenu.style.display = 'flex';
            navMenu.style.gap = '1rem';
        }

        if (navAuth) {
            navAuth.style.display = 'flex';
        }

        if (navSearch) {
            navSearch.style.display = 'flex';
            navSearch.style.maxWidth = '400px';
        }

        if (mobileToggle) {
            mobileToggle.style.display = 'none';
        }

        // Reset nav links for desktop
        document.querySelectorAll('.nav-link').forEach(link => {
            link.style.padding = '0.75rem 1rem';
            link.style.fontSize = '0.9rem';
        });
    }

    handleMobileBreakpoint() {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        const handleBreakpoint = (e) => {
            if (e.matches) {
                this.applyMobileStyles();
            } else {
                this.applyDesktopStyles();
            }
        };

        handleBreakpoint(mediaQuery);
        mediaQuery.addEventListener('change', handleBreakpoint);
    }

    // Force visibility of all elements
    forceVisibility() {
        console.log('🔍 Forcing visibility of all navigation elements...');
        
        // Make everything visible
        document.querySelectorAll('.navbar, .nav-container, .nav-menu, .nav-link, .dropdown-menu').forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.display = el.style.display || 'flex';
        });

        // Show success message
        this.showNotification('Navigation visibility forced - all elements should now be visible', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999;
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-weight: 600;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
}

// Global function to force visibility
window.forceNavigationVisibility = function() {
    if (window.navigationVisibilityFix) {
        window.navigationVisibilityFix.forceVisibility();
    }
};

// Initialize navigation visibility fix
window.navigationVisibilityFix = new NavigationVisibilityFix();

// Add CSS for slide animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log('✅ Navigation Visibility Fix loaded successfully!');