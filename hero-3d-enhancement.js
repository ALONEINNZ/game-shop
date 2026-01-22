// HERO 3D ENHANCEMENT
// Enhances the hero section for the PC Tower 3D animation

(function() {
    'use strict';
    
    console.log('🎮 Hero 3D Enhancement Loading...');
    
    // Enhance hero section for 3D animation
    function enhanceHeroSection() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Make hero taller for scroll animation
        hero.style.minHeight = '200vh';
        hero.style.position = 'relative';
        hero.style.overflow = 'hidden';
        
        // Adjust hero content positioning
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.position = 'relative';
            heroContent.style.zIndex = '10';
            heroContent.style.maxWidth = '45%';
            heroContent.style.marginLeft = '0';
            heroContent.style.paddingRight = '2rem';
        }
        
        // Add 3D animation description
        const heroSubtitle = hero.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.innerHTML = `
                Join thousands of creators and players. Find the perfect mods to transform your favorite games, 
                or share your own creations with the world.
                <br><br>
                <span style="color: #5B8CFF; font-weight: 600; font-size: 0.9rem;">
                    ⬇️ Scroll down to explore the anatomy of a gaming PC
                </span>
            `;
        }
        
        // Add scroll indicator enhancement
        const scrollIndicator = hero.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.innerHTML = `
                <span>Explore the PC</span>
                <i class="fas fa-chevron-down"></i>
                <div style="font-size: 0.8rem; margin-top: 0.5rem; opacity: 0.7;">
                    Interactive 3D Animation
                </div>
            `;
            scrollIndicator.style.right = '2rem';
            scrollIndicator.style.left = 'auto';
        }
    }
    
    // Add 3D animation info panel
    function addAnimationInfo() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const infoPanel = document.createElement('div');
        infoPanel.id = '3d-animation-info';
        infoPanel.style.cssText = `
            position: absolute;
            bottom: 2rem;
            right: 2rem;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(91, 140, 255, 0.3);
            border-radius: 15px;
            padding: 1.5rem;
            color: white;
            font-size: 0.9rem;
            max-width: 300px;
            z-index: 15;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
        `;
        
        infoPanel.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                <div style="
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #5B8CFF;
                    box-shadow: 0 0 10px #5B8CFF;
                    animation: pulse 2s ease-in-out infinite;
                "></div>
                <h4 style="margin: 0; color: #5B8CFF; font-size: 1rem;">3D PC Explorer</h4>
            </div>
            <p style="margin: 0 0 1rem 0; line-height: 1.4; color: rgba(255,255,255,0.8);">
                Scroll to see a gaming PC explode into its components. Each part represents 
                the power behind your modded gaming experience.
            </p>
            <div style="display: flex; gap: 1rem; font-size: 0.8rem; color: rgba(255,255,255,0.6);">
                <span>🔄 Rotation</span>
                <span>💥 Explosion</span>
                <span>🏷️ Labels</span>
            </div>
        `;
        
        hero.appendChild(infoPanel);
        
        // Show info panel after delay
        setTimeout(() => {
            infoPanel.style.opacity = '1';
            infoPanel.style.transform = 'translateY(0)';
        }, 2000);
        
        // Hide info panel when scrolling starts
        let hasScrolled = false;
        window.addEventListener('scroll', () => {
            if (!hasScrolled && window.scrollY > 50) {
                hasScrolled = true;
                infoPanel.style.opacity = '0';
                infoPanel.style.transform = 'translateY(20px)';
            }
        });
    }
    
    // Add performance indicator
    function addPerformanceIndicator() {
        const indicator = document.createElement('div');
        indicator.id = '3d-performance-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 80px;
            left: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            z-index: 1001;
            opacity: 0;
            transition: opacity 0.3s ease;
            border: 1px solid rgba(91, 140, 255, 0.3);
        `;
        
        indicator.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div id="3d-status-dot" style="
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #22C55E;
                    animation: pulse 2s ease-in-out infinite;
                "></div>
                <span id="3d-status-text">3D Animation Active</span>
            </div>
        `;
        
        document.body.appendChild(indicator);
        
        // Show indicator when 3D is active
        setTimeout(() => {
            if (window.pcTower3D) {
                indicator.style.opacity = '1';
                
                // Hide after 5 seconds
                setTimeout(() => {
                    indicator.style.opacity = '0';
                }, 5000);
            }
        }, 3000);
    }
    
    // Add scroll progress indicator
    function addScrollProgress() {
        const progress = document.createElement('div');
        progress.id = '3d-scroll-progress';
        progress.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #5B8CFF, #C15CFF);
            z-index: 1002;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progress);
        
        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const heroHeight = document.querySelector('.hero')?.offsetHeight || window.innerHeight;
            const scrolled = window.scrollY;
            const progressPercent = Math.min((scrolled / heroHeight) * 100, 100);
            progress.style.width = progressPercent + '%';
        });
    }
    
    // Run enhancements
    function runEnhancements() {
        enhanceHeroSection();
        addAnimationInfo();
        addPerformanceIndicator();
        addScrollProgress();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runEnhancements);
    } else {
        runEnhancements();
    }
    
    console.log('✅ Hero 3D Enhancement Applied');
})();