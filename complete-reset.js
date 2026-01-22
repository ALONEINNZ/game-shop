// COMPLETE RESET - RESTORE BASIC FUNCTIONALITY
// This will disable all problematic features and restore core functionality

(function() {
    'use strict';
    
    console.log('🚨 COMPLETE RESET STARTING...');
    
    // 1. IMMEDIATE SCROLL FIX
    function fixScrollNow() {
        document.body.style.setProperty('overflow', 'auto', 'important');
        document.documentElement.style.setProperty('overflow', 'auto', 'important');
        document.body.style.setProperty('height', 'auto', 'important');
        document.documentElement.style.setProperty('height', 'auto', 'important');
        
        // Remove any scroll-blocking elements
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            if (canvas.id === 'cursor-canvas' || canvas.id === 'shader-canvas') {
                canvas.remove();
            }
        });
    }
    
    // 2. DISABLE ALL ANIMATIONS AND EFFECTS
    const resetCSS = document.createElement('style');
    resetCSS.id = 'complete-reset';
    resetCSS.textContent = `
        /* COMPLETE RESET - DISABLE ALL PROBLEMATIC FEATURES */
        
        /* RESTORE SCROLL */
        html, body {
            overflow: auto !important;
            height: auto !important;
            scroll-behavior: smooth !important;
            position: relative !important;
        }
        
        /* DISABLE ALL ANIMATIONS */
        *, *::before, *::after {
            animation: none !important;
            transition: none !important;
            transform: none !important;
        }
        
        /* RESTORE CLICKABILITY */
        .game-card, .mod-card, .btn, button, a, [onclick] {
            pointer-events: auto !important;
            cursor: pointer !important;
            position: relative !important;
            z-index: 100 !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
        
        /* SIMPLE HOVER EFFECTS ONLY */
        .btn:hover, button:hover {
            opacity: 0.8 !important;
            transition: opacity 0.2s ease !important;
        }
        
        .game-card:hover, .mod-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
            transition: box-shadow 0.2s ease !important;
        }
        
        /* REMOVE ALL PROBLEMATIC OVERLAYS */
        #cursor-canvas, #shader-canvas {
            display: none !important;
        }
        
        /* ENSURE NAVIGATION WORKS */
        .navbar {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 1000 !important;
            background: #121826 !important;
        }
        
        /* ENSURE CONTENT IS SCROLLABLE */
        .hero, .section, main {
            position: relative !important;
            z-index: 10 !important;
        }
        
        /* FIX CART MODAL */
        .modal {
            position: fixed !important;
            z-index: 10000 !important;
        }
    `;
    document.head.appendChild(resetCSS);
    
    // 3. RUN FIXES IMMEDIATELY
    fixScrollNow();
    
    // 4. DISABLE PROBLEMATIC SCRIPTS
    window.InteractiveCursor = null;
    window.ShaderEffects = null;
    window.MicroInteractions = null;
    
    // 5. FIX CART FUNCTIONALITY
    setTimeout(() => {
        if (window.removeFromCart) {
            const originalRemove = window.removeFromCart;
            window.removeFromCart = function(modId) {
                console.log('🛒 Removing item:', modId);
                
                // Store modal state
                const cartModal = document.getElementById('cartModal');
                const wasOpen = cartModal && cartModal.style.display === 'flex';
                
                // Remove item
                originalRemove(modId);
                
                // Keep modal open
                if (wasOpen && cartModal) {
                    setTimeout(() => {
                        cartModal.style.display = 'flex';
                        console.log('🛒 Cart modal kept open');
                    }, 50);
                }
            };
        }
    }, 1000);
    
    // 6. FORCE REMOVE LOADING SCREEN
    function removeLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
            console.log('✅ Loading screen removed');
        }
    }
    
    removeLoading();
    setTimeout(removeLoading, 500);
    setTimeout(removeLoading, 1000);
    
    // 7. TEST SCROLL FUNCTIONALITY
    setTimeout(() => {
        const canScroll = document.body.scrollHeight > window.innerHeight;
        console.log('📏 Page height:', document.body.scrollHeight);
        console.log('📏 Window height:', window.innerHeight);
        console.log('📜 Can scroll:', canScroll);
        
        if (canScroll) {
            // Test scroll
            window.scrollTo({ top: 100, behavior: 'smooth' });
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1000);
        }
    }, 2000);
    
    // 8. ENSURE ALL BUTTONS WORK
    setTimeout(() => {
        const buttons = document.querySelectorAll('button, .btn, a[href], [onclick]');
        buttons.forEach(btn => {
            btn.style.pointerEvents = 'auto';
            btn.style.cursor = 'pointer';
            btn.style.zIndex = '100';
        });
        
        console.log('✅ All buttons restored:', buttons.length);
    }, 1500);
    
    console.log('🎯 COMPLETE RESET FINISHED - Basic functionality restored');
    
})();