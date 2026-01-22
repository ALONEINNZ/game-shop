// LOADING FIX
// Ensures page loads properly and removes loading screen

(function() {
    'use strict';
    
    // Force remove loading screen after maximum 5 seconds
    setTimeout(function() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
            console.log('🔧 Loading screen force removed');
        }
    }, 5000);
    
    // Also try to remove it when DOM is ready
    function removeLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
            console.log('✅ Loading screen removed normally');
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeLoading);
    } else {
        removeLoading();
    }
    
    // Remove loading on window load as backup
    window.addEventListener('load', removeLoading);
    
})();