// EMERGENCY FIX - DISABLE ALL PROBLEMATIC FEATURES
// This will restore basic functionality

(function() {
    'use strict';
    
    console.log('🚨 Emergency Fix Loading...');
    
    // 1. DISABLE ALL HEAVY FEATURES IMMEDIATELY
    
    // Disable cursor effects
    const cursorCanvas = document.getElementById('cursor-canvas');
    if (cursorCanvas) {
        cursorCanvas.remove();
    }
    
    // Disable shader effects
    const shaderCanvas = document.getElementById('shader-canvas');
    if (shaderCanvas) {
        shaderCanvas.remove();
    }
    
    // 2. RESTORE SCROLL FUNCTIONALITY
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // Remove any scroll blocking
    const style = document.createElement('style');
    style.textContent = `
        /* EMERGENCY SCROLL FIX */
        html, body {
            overflow: auto !important;
            height: auto !important;
            scroll-behavior: smooth !important;
        }
        
        /* DISABLE ALL PROBLEMATIC ANIMATIONS */
        *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0.1s !important;
        }
        
        /* RESTORE CLICKABILITY */
        .game-card, .mod-card, .btn, button, a {
            pointer-events: auto !important;
            position: relative !important;
            z-index: 10 !important;
            cursor: pointer !important;
        }
        
        /* REMOVE ALL TRANSFORMS */
        .game-card, .mod-card, .btn, button {
            transform: none !important;
        }
        
        /* SIMPLE HOVER EFFECTS ONLY */
        .btn:hover, button:hover {
            opacity: 0.9 !important;
        }
        
        .game-card:hover, .mod-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
        }
    `;
    document.head.appendChild(style);
    
    // 3. FIX CART REMOVAL
    setTimeout(() => {
        if (window.removeFromCart) {
            const originalRemove = window.removeFromCart;
            window.removeFromCart = function(modId) {
                const cartModal = document.getElementById('cartModal');
                const wasOpen = cartModal && cartModal.style.display === 'flex';
                
                originalRemove(modId);
                
                if (wasOpen) {
                    setTimeout(() => {
                        cartModal.style.display = 'flex';
                    }, 100);
                }
            };
        }
    }, 1000);
    
    // 4. FORCE REMOVE LOADING SCREEN
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
        }
    }, 500);
    
    // 5. DISABLE ALL OBSERVERS AND INTERVALS
    // Override problematic functions
    const originalSetInterval = window.setInterval;
    window.setInterval = function(fn, delay) {
        // Only allow essential intervals
        if (delay > 5000) {
            return originalSetInterval(fn, delay);
        }
        return null;
    };
    
    // 6. RESTORE BASIC FUNCTIONALITY
    setTimeout(() => {
        // Ensure all buttons work
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach(btn => {
            btn.style.pointerEvents = 'auto';
            btn.style.cursor = 'pointer';
        });
        
        // Ensure all links work
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.cursor = 'pointer';
        });
        
        console.log('✅ Emergency Fix Applied - Basic functionality restored');
    }, 1000);
    
})();