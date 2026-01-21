// EMERGENCY SCROLL FIX
// Fixes any scrolling issues immediately

(function() {
    console.log('🚨 Emergency Scroll Fix Loading...');
    
    // Force enable scrolling
    function forceEnableScroll() {
        // Fix body and html
        document.documentElement.style.overflow = 'auto';
        document.documentElement.style.overflowY = 'auto';
        document.documentElement.style.height = 'auto';
        document.documentElement.style.minHeight = '100vh';
        
        document.body.style.overflow = 'auto';
        document.body.style.overflowY = 'auto';
        document.body.style.height = 'auto';
        document.body.style.minHeight = '100vh';
        document.body.style.position = 'relative';
        
        // Fix any blocking elements
        const canvas = document.getElementById('three-canvas');
        if (canvas) {
            canvas.style.pointerEvents = 'none';
            canvas.style.touchAction = 'none';
            canvas.style.zIndex = '1';
        }
        
        // Ensure main content is above canvas
        const sections = document.querySelectorAll('.hero, .section, .container, .parallax-section');
        sections.forEach(section => {
            section.style.position = 'relative';
            section.style.zIndex = '10';
            section.style.pointerEvents = 'auto';
        });
        
        // Enable touch scrolling on mobile
        if (window.innerWidth <= 768) {
            document.body.style.webkitOverflowScrolling = 'touch';
            document.body.style.touchAction = 'pan-y';
        }
        
        console.log('✅ Scroll fix applied!');
    }
    
    // Apply fix immediately
    forceEnableScroll();
    
    // Apply fix when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceEnableScroll);
    }
    
    // Apply fix after a delay (in case other scripts interfere)
    setTimeout(forceEnableScroll, 1000);
    setTimeout(forceEnableScroll, 3000);
    
    // Monitor for scroll issues and fix them
    let scrollCheckInterval = setInterval(() => {
        const canScroll = document.body.scrollHeight > window.innerHeight;
        const isScrollBlocked = document.documentElement.style.overflow === 'hidden' || 
                               document.body.style.overflow === 'hidden';
        
        if (canScroll && isScrollBlocked) {
            console.log('🚨 Scroll blocked detected, fixing...');
            forceEnableScroll();
        }
    }, 2000);
    
    // Stop monitoring after 30 seconds
    setTimeout(() => {
        clearInterval(scrollCheckInterval);
        console.log('✅ Scroll monitoring stopped');
    }, 30000);
    
    // Add emergency scroll button
    function addEmergencyButton() {
        const button = document.createElement('button');
        button.innerHTML = '🔄 Fix Scroll';
        button.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 99999;
            background: #EF4444;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
        `;
        
        button.onclick = () => {
            forceEnableScroll();
            // Scroll to top to test
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Then scroll down a bit to test
            setTimeout(() => {
                window.scrollTo({ top: 200, behavior: 'smooth' });
            }, 1000);
            
            button.innerHTML = '✅ Fixed!';
            setTimeout(() => {
                button.remove();
            }, 3000);
        };
        
        document.body.appendChild(button);
        
        // Auto-remove after 10 seconds if not used
        setTimeout(() => {
            if (button.parentNode) {
                button.remove();
            }
        }, 10000);
    }
    
    // Add emergency button after 2 seconds
    setTimeout(addEmergencyButton, 2000);
    
})();

console.log('🚨 Emergency Scroll Fix Loaded!');