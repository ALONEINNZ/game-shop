// UI FIXES
// Fixes cart removal, navigation alignment, and removes click animations

(function() {
    'use strict';
    
    // 1. Fix cart removal - prevent modal from closing
    const originalRemoveFromCart = window.removeFromCart;
    if (originalRemoveFromCart) {
        window.removeFromCart = function(modId) {
            // Store current modal state
            const cartModal = document.getElementById('cartModal');
            const isCartOpen = cartModal && cartModal.style.display === 'flex';
            
            // Call original function
            originalRemoveFromCart(modId);
            
            // Keep cart open if it was open
            if (isCartOpen && cartModal) {
                cartModal.style.display = 'flex';
            }
            
            console.log('🛒 Item removed from cart - modal kept open');
        };
    }
    
    // 2. Remove all click animations
    const style = document.createElement('style');
    style.id = 'ui-fixes';
    style.textContent = `
        /* Remove click animations */
        .btn, button, .game-card, .mod-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        
        .btn:active, button:active {
            transform: none !important;
        }
        
        .game-card:active, .mod-card:active {
            transform: none !important;
        }
        
        /* Fix navigation alignment */
        .nav-container {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            height: 60px !important;
            padding: 0 2rem !important;
        }
        
        .nav-brand, .nav-menu, .nav-auth {
            display: flex !important;
            align-items: center !important;
            height: 100% !important;
        }
        
        .nav-menu {
            gap: 1.5rem !important;
        }
        
        .nav-link {
            display: flex !important;
            align-items: center !important;
            height: 40px !important;
            padding: 0 1rem !important;
            position: relative !important;
        }
        
        /* Fix underline positioning */
        .nav-link.active::after {
            content: '' !important;
            position: absolute !important;
            bottom: -8px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: calc(100% - 1rem) !important;
            height: 2px !important;
            background: linear-gradient(90deg, #5B8CFF, #C15CFF) !important;
            border-radius: 1px !important;
        }
        
        /* Fix search bar alignment */
        .nav-search {
            display: flex !important;
            align-items: center !important;
            height: 40px !important;
            position: relative !important;
        }
        
        .nav-search input {
            height: 40px !important;
            padding: 0 1rem 0 2.5rem !important;
            border-radius: 20px !important;
        }
        
        .nav-search i {
            position: absolute !important;
            left: 0.75rem !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            z-index: 2 !important;
        }
        
        /* Fix theme toggle alignment */
        .theme-toggle, .performance-toggle {
            width: 40px !important;
            height: 40px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            border-radius: 50% !important;
        }
        
        /* Fix dropdown alignment */
        .nav-dropdown {
            display: flex !important;
            align-items: center !important;
            height: 40px !important;
        }
        
        .dropdown-toggle {
            display: flex !important;
            align-items: center !important;
            height: 100% !important;
            gap: 0.5rem !important;
        }
        
        /* Fix mobile menu toggle */
        .mobile-menu-toggle {
            width: 40px !important;
            height: 40px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        
        /* Fix user avatar alignment */
        .user-avatar-btn {
            width: 40px !important;
            height: 40px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            border-radius: 50% !important;
        }
        
        .user-avatar-btn img {
            width: 32px !important;
            height: 32px !important;
            border-radius: 50% !important;
        }
        
        /* Ensure all nav elements are properly aligned */
        .navbar * {
            box-sizing: border-box !important;
        }
        
        /* Fix logo alignment */
        .logo {
            display: flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
            height: 40px !important;
        }
        
        .logo svg {
            width: 32px !important;
            height: 32px !important;
        }
        
        .logo-text {
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            line-height: 1 !important;
        }
    `;
    document.head.appendChild(style);
    
    // 3. Fix cart modal behavior
    function fixCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            // Prevent modal from closing when clicking inside cart content
            const cartContent = cartModal.querySelector('.cart-content, .modal-content');
            if (cartContent) {
                cartContent.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            }
            
            // Only close when clicking the backdrop or close button
            cartModal.addEventListener('click', function(e) {
                if (e.target === cartModal || e.target.classList.contains('modal-close')) {
                    cartModal.style.display = 'none';
                }
            });
        }
    }
    
    // 4. Fix navigation active states
    function fixNavActiveStates() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            // Remove active class from all links first
            link.classList.remove('active');
            
            // Add active class based on current page
            const href = link.getAttribute('href');
            if (href && (window.location.pathname.includes(href) || 
                        (href === '#games' && window.location.pathname === '/'))) {
                link.classList.add('active');
            }
        });
    }
    
    // Run fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            fixCartModal();
            fixNavActiveStates();
        });
    } else {
        fixCartModal();
        fixNavActiveStates();
    }
    
    // Re-run fixes when navigation changes
    window.addEventListener('hashchange', fixNavActiveStates);
    
    console.log('🔧 UI Fixes Applied: Cart, Navigation, Animations');
})();