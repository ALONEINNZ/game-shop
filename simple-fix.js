// SIMPLE LIGHTWEIGHT FIX
// Fixes clickability without performance issues

(function() {
    'use strict';
    
    // Simple CSS fix
    const style = document.createElement('style');
    style.textContent = `
        /* Simple clickability fixes */
        .game-card, .mod-card, .btn, button, a[href], [onclick] {
            position: relative !important;
            z-index: 100 !important;
            pointer-events: auto !important;
            cursor: pointer !important;
        }
        
        /* Cursor and shader effects behind content */
        #cursor-canvas, #shader-canvas {
            z-index: 1 !important;
            pointer-events: none !important;
        }
        
        /* Ensure buttons stay visible */
        .showcase-cta, .btn-primary, .btn-outline {
            visibility: visible !important;
            opacity: 1 !important;
            display: inline-block !important;
        }
    `;
    document.head.appendChild(style);
    
    // Simple function to ensure clickability
    function ensureClickable() {
        const elements = document.querySelectorAll('.game-card, .mod-card, .btn, button, [onclick]');
        elements.forEach(el => {
            if (el.style.display === 'none' || el.style.visibility === 'hidden') {
                el.style.display = 'block';
                el.style.visibility = 'visible';
                el.style.opacity = '1';
            }
        });
    }
    
    // Run once on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureClickable);
    } else {
        ensureClickable();
    }
    
    // Run once more after 2 seconds
    setTimeout(ensureClickable, 2000);
    
    console.log('✅ Simple fix applied');
})();