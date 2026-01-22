// CLICKABILITY FIX
// Ensures all interactive elements remain clickable despite new effects

function ensureClickability() {
    // Find all clickable elements
    const clickableSelectors = [
        '.game-card',
        '.mod-card', 
        '.btn',
        'button',
        'a[href]',
        '[onclick]',
        '.game-actions button',
        '.card-actions button',
        '.view-details-btn',
        '.download-btn',
        '.purchase-btn'
    ];
    
    clickableSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // Ensure proper positioning and z-index
            const computedStyle = window.getComputedStyle(element);
            if (computedStyle.position === 'static') {
                element.style.position = 'relative';
            }
            
            // Set high z-index to ensure it's above effects
            const currentZIndex = parseInt(element.style.zIndex) || parseInt(computedStyle.zIndex) || 0;
            element.style.zIndex = Math.max(currentZIndex, 100);
            
            // Ensure pointer events are enabled
            element.style.pointerEvents = 'auto';
            
            // Add cursor pointer for better UX
            if (!element.style.cursor) {
                element.style.cursor = 'pointer';
            }
        });
    });
    
    console.log('🔧 Clickability ensured for all interactive elements');
}

// Run immediately
ensureClickability();

// Run after DOM changes
const observer = new MutationObserver(() => {
    ensureClickability();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Run periodically as backup
setInterval(ensureClickability, 3000);

// Export for manual use
window.ensureClickability = ensureClickability;