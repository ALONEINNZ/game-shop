// ANTI-DISAPPEAR EMERGENCY FIX
// Prevents any element from disappearing when clicked

(function() {
    'use strict';
    
    // Override common methods that might hide elements
    const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
    CSSStyleDeclaration.prototype.setProperty = function(property, value, priority) {
        const element = this.parentRule ? null : this.parentElement || this.ownerNode?.host;
        
        // Prevent hiding of clickable elements
        if (element && element.matches && element.matches('.game-card, .mod-card, .btn, button, a[href], [onclick]')) {
            if (property === 'display' && (value === 'none' || value === 'hidden')) {
                console.warn('🚫 Prevented hiding of clickable element:', element);
                return originalSetProperty.call(this, property, 'block', 'important');
            }
            if (property === 'visibility' && value === 'hidden') {
                console.warn('🚫 Prevented hiding of clickable element:', element);
                return originalSetProperty.call(this, property, 'visible', 'important');
            }
            if (property === 'opacity' && parseFloat(value) < 0.1) {
                console.warn('🚫 Prevented opacity hiding of clickable element:', element);
                return originalSetProperty.call(this, property, '1', 'important');
            }
        }
        
        return originalSetProperty.call(this, property, value, priority);
    };
    
    // Monitor for style changes that might hide elements
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const element = mutation.target;
                if (element.matches && element.matches('.game-card, .mod-card, .btn, button, a[href], [onclick]')) {
                    const style = element.style;
                    
                    // Force visibility
                    if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) < 0.1) {
                        console.warn('🔧 Restoring visibility to:', element);
                        element.style.setProperty('display', 'block', 'important');
                        element.style.setProperty('visibility', 'visible', 'important');
                        element.style.setProperty('opacity', '1', 'important');
                    }
                }
            }
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style'],
        subtree: true
    });
    
    // Emergency restore function
    function emergencyRestore() {
        const elements = document.querySelectorAll('.game-card, .mod-card, .btn, button, a[href], [onclick]');
        elements.forEach(element => {
            const computed = window.getComputedStyle(element);
            if (computed.display === 'none' || computed.visibility === 'hidden' || parseFloat(computed.opacity) < 0.1) {
                console.warn('🚨 Emergency restore for:', element);
                element.style.setProperty('display', 'block', 'important');
                element.style.setProperty('visibility', 'visible', 'important');
                element.style.setProperty('opacity', '1', 'important');
                element.style.setProperty('position', 'relative', 'important');
                element.style.setProperty('z-index', '100', 'important');
            }
        });
    }
    
    // Run emergency restore periodically
    setInterval(emergencyRestore, 1000);
    
    // Run on click events
    document.addEventListener('click', function(e) {
        setTimeout(emergencyRestore, 50);
    }, true);
    
    // Run on any animation/transition end
    document.addEventListener('animationend', emergencyRestore);
    document.addEventListener('transitionend', emergencyRestore);
    
    console.log('🛡️ Anti-Disappear Protection Active');
    
    // Make available globally
    window.emergencyRestore = emergencyRestore;
})();