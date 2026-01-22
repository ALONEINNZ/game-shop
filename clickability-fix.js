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
                element.style.setProperty('position', 'relative', 'important');
            }
            
            // Set high z-index to ensure it's above effects
            const currentZIndex = parseInt(element.style.zIndex) || parseInt(computedStyle.zIndex) || 0;
            element.style.setProperty('z-index', Math.max(currentZIndex, 100).toString(), 'important');
            
            // Ensure pointer events are enabled
            element.style.setProperty('pointer-events', 'auto', 'important');
            
            // Ensure visibility and display are maintained
            element.style.setProperty('visibility', 'visible', 'important');
            element.style.setProperty('display', element.style.display || 'block', 'important');
            element.style.setProperty('opacity', '1', 'important');
            
            // Add cursor pointer for better UX
            if (!element.style.cursor) {
                element.style.setProperty('cursor', 'pointer', 'important');
            }
            
            // Prevent any transform that might hide the element
            const currentTransform = element.style.transform;
            if (currentTransform && (currentTransform.includes('scale(0)') || currentTransform.includes('translateX(-100%)'))) {
                element.style.setProperty('transform', 'none', 'important');
            }
        });
    });
    
    console.log('🔧 Clickability ensured for all interactive elements with !important');
}

// Run immediately
ensureClickability();

// Add comprehensive CSS fixes
const style = document.createElement('style');
style.id = 'clickability-fix-styles';
style.textContent = `
    /* CRITICAL CLICKABILITY FIXES - PREVENT DISAPPEARING */
    .game-card, .mod-card, .btn, button, a[href], [onclick] {
        position: relative !important;
        z-index: 100 !important;
        pointer-events: auto !important;
        visibility: visible !important;
        opacity: 1 !important;
        display: block !important;
    }
    
    .game-card *, .mod-card *, .btn *, button *, a[href] *, [onclick] * {
        pointer-events: auto !important;
        visibility: visible !important;
    }
    
    /* Prevent transforms that hide elements */
    .game-card:not(:hover), .mod-card:not(:hover) {
        transform: none !important;
    }
    
    /* Ensure game cards stay visible */
    .games-showcase .game-card {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
    }
    
    /* Prevent any animation from hiding clickable elements */
    .game-card.animate-element, .mod-card.animate-element {
        opacity: 1 !important;
        transform: translateY(0) !important;
        visibility: visible !important;
    }
    
    /* Override any hiding animations */
    @keyframes preventHide {
        0%, 100% {
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
        }
    }
    
    .game-card, .mod-card {
        animation: preventHide 0.1s ease-in-out !important;
    }
    
    /* Ensure buttons inside cards remain visible */
    .game-actions, .card-actions, .game-info {
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
    }
    
    .game-actions button, .card-actions button {
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        display: inline-block !important;
    }
`;
document.head.appendChild(style);

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

// Add click protection
document.addEventListener('click', function(e) {
    const clickedElement = e.target.closest('.game-card, .mod-card, .btn, button, a[href], [onclick]');
    if (clickedElement) {
        // Ensure element stays visible after click
        setTimeout(() => {
            clickedElement.style.setProperty('visibility', 'visible', 'important');
            clickedElement.style.setProperty('opacity', '1', 'important');
            clickedElement.style.setProperty('display', clickedElement.style.display || 'block', 'important');
        }, 10);
    }
});

// Export for manual use
window.ensureClickability = ensureClickability;