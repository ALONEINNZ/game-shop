// FINAL FIX - Navigation alignment and View Details button
(function() {
    'use strict';
    
    console.log('🔧 Final Fix Loading...');
    
    // 1. Fix navigation alignment
    const navCSS = document.createElement('style');
    navCSS.id = 'nav-alignment-fix';
    navCSS.textContent = `
        /* NAVIGATION ALIGNMENT FIX */
        .navbar {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 1000 !important;
            background: #121826 !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
            height: 70px !important;
            display: flex !important;
            align-items: center !important;
        }
        
        .nav-container {
            width: 100% !important;
            max-width: 1400px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            height: 100% !important;
        }
        
        .nav-brand {
            display: flex !important;
            align-items: center !important;
            height: 100% !important;
        }
        
        .logo {
            display: flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
            text-decoration: none !important;
            color: white !important;
        }
        
        .logo svg {
            width: 32px !important;
            height: 32px !important;
        }
        
        .logo-text {
            font-size: 1.25rem !important;
            font-weight: 700 !important;
        }
        
        .nav-search {
            display: flex !important;
            align-items: center !important;
            position: relative !important;
            min-width: 300px !important;
        }
        
        .nav-search input {
            width: 100% !important;
            height: 40px !important;
            padding: 0 1rem 0 2.5rem !important;
            background: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 20px !important;
            color: white !important;
            font-size: 0.9rem !important;
        }
        
        .nav-search i {
            position: absolute !important;
            left: 0.75rem !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            color: rgba(255, 255, 255, 0.5) !important;
            z-index: 2 !important;
        }
        
        .nav-menu {
            display: flex !important;
            align-items: center !important;
            gap: 1.5rem !important;
            height: 100% !important;
        }
        
        .nav-link {
            display: flex !important;
            align-items: center !important;
            height: 40px !important;
            padding: 0 1rem !important;
            color: rgba(255, 255, 255, 0.8) !important;
            text-decoration: none !important;
            border-radius: 8px !important;
            transition: all 0.2s ease !important;
            position: relative !important;
        }
        
        .nav-link:hover {
            color: white !important;
            background: rgba(91, 140, 255, 0.1) !important;
        }
        
        .nav-link.active {
            color: #5B8CFF !important;
        }
        
        .nav-link.active::after {
            content: '' !important;
            position: absolute !important;
            bottom: -5px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 80% !important;
            height: 2px !important;
            background: #5B8CFF !important;
            border-radius: 1px !important;
        }
        
        .nav-auth {
            display: flex !important;
            align-items: center !important;
            gap: 1rem !important;
            height: 100% !important;
        }
        
        .theme-toggle, .performance-toggle {
            width: 40px !important;
            height: 40px !important;
            border-radius: 50% !important;
            background: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            color: rgba(255, 255, 255, 0.8) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
        }
        
        .theme-toggle:hover, .performance-toggle:hover {
            background: rgba(91, 140, 255, 0.2) !important;
            color: white !important;
        }
        
        /* Fix body padding for fixed navbar */
        body {
            padding-top: 70px !important;
        }
        
        /* Fix dropdown alignment */
        .nav-dropdown {
            position: relative !important;
            display: flex !important;
            align-items: center !important;
            height: 100% !important;
        }
        
        .dropdown-toggle {
            display: flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
            height: 40px !important;
            padding: 0 1rem !important;
        }
        
        .dropdown-menu {
            position: absolute !important;
            top: calc(100% + 10px) !important;
            left: 0 !important;
            min-width: 200px !important;
            background: #1a2332 !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 12px !important;
            padding: 0.5rem !important;
            opacity: 0 !important;
            visibility: hidden !important;
            transform: translateY(-10px) !important;
            transition: all 0.2s ease !important;
            z-index: 1001 !important;
        }
        
        .nav-dropdown:hover .dropdown-menu {
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(navCSS);
    
    // 2. Fix View Details button functionality
    function fixViewDetailsButtons() {
        // Find all view details buttons
        const viewDetailsButtons = document.querySelectorAll('.showcase-cta, .btn[onclick*="openModDetails"], button[onclick*="openModDetails"]');
        
        viewDetailsButtons.forEach(button => {
            // Ensure button is visible and clickable
            button.style.display = 'inline-block';
            button.style.visibility = 'visible';
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
            button.style.cursor = 'pointer';
            button.style.zIndex = '1000';
            
            // Fix the onclick if it's broken
            const onclickAttr = button.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes('openModDetails')) {
                // Extract the mod ID from onclick
                const match = onclickAttr.match(/openModDetails\(['"]([^'"]+)['"]\)/);
                if (match) {
                    const modId = match[1];
                    
                    // Remove old onclick and add new event listener
                    button.removeAttribute('onclick');
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        console.log('🔍 Opening mod details for:', modId);
                        
                        // Call the function directly
                        if (window.openModDetails) {
                            window.openModDetails(modId);
                        } else {
                            console.error('openModDetails function not found');
                        }
                    });
                }
            }
        });
        
        console.log('🔧 Fixed', viewDetailsButtons.length, 'view details buttons');
    }
    
    // 3. Ensure openModDetails function exists
    function ensureModDetailsFunction() {
        if (!window.openModDetails) {
            window.openModDetails = function(modId) {
                console.log('📦 Opening mod details for:', modId);
                
                // Find the mod data
                const mod = window.realMods ? window.realMods.find(m => m._id === modId) : null;
                
                if (!mod) {
                    console.error('Mod not found:', modId);
                    return;
                }
                
                // Create or show modal
                let modal = document.getElementById('modDetailsModal');
                if (!modal) {
                    modal = document.createElement('div');
                    modal.id = 'modDetailsModal';
                    modal.className = 'modal';
                    modal.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.8);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10000;
                    `;
                    
                    modal.innerHTML = `
                        <div class="modal-content" style="
                            background: #1a2332;
                            border-radius: 20px;
                            padding: 2rem;
                            max-width: 800px;
                            width: 90%;
                            max-height: 90%;
                            overflow-y: auto;
                            position: relative;
                        ">
                            <button class="modal-close" onclick="document.getElementById('modDetailsModal').style.display='none'" style="
                                position: absolute;
                                top: 1rem;
                                right: 1rem;
                                background: none;
                                border: none;
                                color: white;
                                font-size: 1.5rem;
                                cursor: pointer;
                            ">&times;</button>
                            <div id="modDetailsContent"></div>
                        </div>
                    `;
                    
                    document.body.appendChild(modal);
                }
                
                // Update content
                const content = document.getElementById('modDetailsContent');
                if (content) {
                    content.innerHTML = `
                        <h2 style="color: white; margin-bottom: 1rem;">${mod.title}</h2>
                        <img src="${mod.images[0]}" alt="${mod.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p style="color: rgba(255,255,255,0.8); margin-bottom: 1rem;">${mod.description}</p>
                        <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                            <span style="color: #5B8CFF;">Game: ${mod.gameTitle}</span>
                            <span style="color: #5B8CFF;">Category: ${mod.category}</span>
                            <span style="color: #5B8CFF;">Rating: ${mod.rating}/5</span>
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <button onclick="addModToCart('${mod._id}')" style="
                                background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                                color: white;
                                border: none;
                                padding: 1rem 2rem;
                                border-radius: 10px;
                                cursor: pointer;
                                font-weight: 600;
                            ">Add to Cart - ${mod.isFree ? 'Free' : '$' + mod.price}</button>
                            <button onclick="downloadMod('${mod._id}')" style="
                                background: rgba(255,255,255,0.1);
                                color: white;
                                border: 1px solid rgba(255,255,255,0.2);
                                padding: 1rem 2rem;
                                border-radius: 10px;
                                cursor: pointer;
                            ">Download</button>
                        </div>
                    `;
                }
                
                modal.style.display = 'flex';
            };
        }
    }
    
    // Run fixes when DOM is ready
    function runFixes() {
        fixViewDetailsButtons();
        ensureModDetailsFunction();
        
        // Set active nav link
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPath || (href === '/' && currentPath === '/')) {
                link.classList.add('active');
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runFixes);
    } else {
        runFixes();
    }
    
    // Re-run fixes after a delay to catch dynamically loaded content
    setTimeout(runFixes, 2000);
    
    console.log('✅ Final Fix Applied - Navigation and View Details fixed');
})();