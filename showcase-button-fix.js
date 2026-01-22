// SHOWCASE BUTTON EMERGENCY FIX
// Specifically targets the "View Details" buttons that disappear instantly

(function() {
    'use strict';
    
    function fixShowcaseButtons() {
        // Find all showcase buttons
        const showcaseButtons = document.querySelectorAll('.showcase-cta, .btn[onclick*="openModDetails"], button[onclick*="openModDetails"]');
        
        showcaseButtons.forEach(button => {
            // Force visibility with maximum priority
            button.style.setProperty('visibility', 'visible', 'important');
            button.style.setProperty('opacity', '1', 'important');
            button.style.setProperty('display', 'inline-block', 'important');
            button.style.setProperty('position', 'relative', 'important');
            button.style.setProperty('z-index', '9999', 'important');
            button.style.setProperty('pointer-events', 'auto', 'important');
            button.style.setProperty('transform', 'none', 'important');
            button.style.setProperty('animation', 'none', 'important');
            button.style.setProperty('transition', 'all 0.2s ease', 'important');
            
            // Remove any classes that might hide it
            button.classList.remove('hidden', 'invisible', 'fade-out');
            
            // Add protective class
            button.classList.add('protected-button');
            
            console.log('🔧 Fixed showcase button:', button);
        });
        
        // Also fix the parent containers
        const showcaseSections = document.querySelectorAll('.scroll-showcase, .showcase-container');
        showcaseSections.forEach(section => {
            section.style.setProperty('visibility', 'visible', 'important');
            section.style.setProperty('opacity', '1', 'important');
            section.style.setProperty('display', 'block', 'important');
        });
    }
    
    // Add protective CSS
    const style = document.createElement('style');
    style.id = 'showcase-button-protection';
    style.textContent = `
        /* MAXIMUM PROTECTION FOR SHOWCASE BUTTONS */
        .showcase-cta, .btn[onclick*="openModDetails"], button[onclick*="openModDetails"],
        .protected-button {
            visibility: visible !important;
            opacity: 1 !important;
            display: inline-block !important;
            position: relative !important;
            z-index: 9999 !important;
            pointer-events: auto !important;
            transform: none !important;
            animation: none !important;
            transition: all 0.2s ease !important;
            background: linear-gradient(135deg, #5B8CFF, #C15CFF) !important;
            color: white !important;
            border: none !important;
            padding: 1.5rem !important;
            border-radius: 12px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
        }
        
        .protected-button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 25px rgba(91, 140, 255, 0.4) !important;
        }
        
        .protected-button:active {
            transform: translateY(0) !important;
        }
        
        /* Prevent any parent from hiding these buttons */
        .scroll-showcase, .showcase-container {
            visibility: visible !important;
            opacity: 1 !important;
            display: block !important;
        }
        
        /* Override any animation that might hide buttons */
        @keyframes forceVisible {
            0%, 100% {
                visibility: visible !important;
                opacity: 1 !important;
                display: inline-block !important;
            }
        }
        
        .protected-button {
            animation: forceVisible 0.1s infinite !important;
        }
    `;
    document.head.appendChild(style);
    
    // Run immediately
    fixShowcaseButtons();
    
    // Run on DOM changes
    const observer = new MutationObserver(fixShowcaseButtons);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
    
    // Run on any event that might affect buttons
    document.addEventListener('click', () => setTimeout(fixShowcaseButtons, 10));
    document.addEventListener('scroll', fixShowcaseButtons);
    document.addEventListener('resize', fixShowcaseButtons);
    
    // Run periodically
    setInterval(fixShowcaseButtons, 500);
    
    // Override any function that might hide buttons
    const originalOpenModDetails = window.openModDetails;
    if (originalOpenModDetails) {
        window.openModDetails = function(...args) {
            fixShowcaseButtons();
            return originalOpenModDetails.apply(this, args);
        };
    }
    
    console.log('🛡️ Showcase Button Protection Active');
    
    // Make available globally
    window.fixShowcaseButtons = fixShowcaseButtons;
})();