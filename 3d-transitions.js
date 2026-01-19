// 3D Transitions for Modals and Page Navigation
// Creates smooth 3D transition effects

class Transitions3D {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceModals();
        this.enhanceButtons();
        this.addPageTransitions();
        this.addScrollEffects();

        console.log('🎬 3D Transitions initialized!');
    }

    enhanceModals() {
        // Enhance all modals with 3D entrance
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            // Store original display method
            const originalDisplay = modal.style.display;
            
            // Override modal opening
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'style') {
                        const display = window.getComputedStyle(modal).display;
                        if (display !== 'none' && display !== originalDisplay) {
                            this.playModalEntrance(modal);
                        }
                    }
                });
            });

            observer.observe(modal, { attributes: true });
        });
    }

    playModalEntrance(modal) {
        const content = modal.querySelector('.modal-content');
        if (!content) return;

        // Reset transform
        content.style.transform = 'perspective(1000px) rotateX(-15deg) translateY(50px) scale(0.9)';
        content.style.opacity = '0';

        // Animate in
        setTimeout(() => {
            content.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            content.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0) scale(1)';
            content.style.opacity = '1';
        }, 10);
    }

    enhanceButtons() {
        // Add 3D press effect to all buttons
        const buttons = document.querySelectorAll('button, .btn');
        
        buttons.forEach(button => {
            button.addEventListener('mousedown', (e) => {
                this.createRipple3D(e, button);
            });
        });
    }

    createRipple3D(event, element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-3d';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent)';
        ripple.style.transform = 'scale(0) translateZ(50px)';
        ripple.style.animation = 'ripple-3d-animation 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '1000';

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addPageTransitions() {
        // Add smooth page transitions
        const links = document.querySelectorAll('a[href^="#"], a[href$=".html"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only handle internal links
                if (href && href.includes('.html') && !href.startsWith('http')) {
                    e.preventDefault();
                    this.transitionToPage(href);
                }
            });
        });
    }

    transitionToPage(url) {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'linear-gradient(135deg, #000510 0%, #1a1f2e 100%)';
        overlay.style.zIndex = '99999';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.4s ease';

        // Add loading animation
        const loader = document.createElement('div');
        loader.innerHTML = '<div class="loading-spinner" style="border-color: #5B8CFF transparent #C15CFF transparent;"></div>';
        overlay.appendChild(loader);

        document.body.appendChild(overlay);

        // Fade in
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);

        // Navigate after animation
        setTimeout(() => {
            window.location.href = url;
        }, 400);
    }

    addScrollEffects() {
        // Add parallax 3D effect on scroll
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateScrollEffects() {
        const scrollY = window.pageYOffset;
        
        // Parallax effect on sections
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const translateY = (progress - 0.5) * 50;
                
                // Apply subtle 3D transform
                section.style.transform = `translateY(${translateY * 0.2}px) perspective(1000px) rotateX(${progress * 2 - 1}deg)`;
            }
        });

        // Parallax on cards
        const cards = document.querySelectorAll('.game-card, .mod-card');
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const progress = (window.innerHeight - rect.top) / window.innerHeight;
                const translateY = (1 - progress) * 30;
                
                // Only apply if not hovering
                if (!card.matches(':hover')) {
                    card.style.transform = `translateY(${translateY}px)`;
                }
            }
        });
    }
}

// Add CSS for transitions
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-3d-animation {
        0% {
            transform: scale(0) translateZ(50px);
            opacity: 1;
        }
        100% {
            transform: scale(4) translateZ(0px);
            opacity: 0;
        }
    }

    /* Modal 3D entrance */
    .modal {
        perspective: 1000px;
    }

    .modal-content {
        transform-style: preserve-3d;
    }

    /* Button 3D press effect */
    button:active,
    .btn:active {
        transform: perspective(1000px) translateZ(-5px) scale(0.98) !important;
    }

    /* Card 3D depth on scroll */
    .game-card,
    .mod-card {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Section 3D parallax */
    .section {
        transition: transform 0.1s linear;
    }

    /* Page transition overlay */
    .page-transition-overlay {
        backdrop-filter: blur(10px);
    }

    /* Enhanced hover states with 3D */
    .btn:hover {
        transform: perspective(1000px) translateZ(10px) translateY(-2px) !important;
        box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(91, 140, 255, 0.4);
    }

    /* 3D card stack effect */
    .game-card:hover,
    .mod-card:hover {
        transform: perspective(1000px) translateZ(30px) rotateX(5deg) !important;
        box-shadow: 
            0 30px 80px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(91, 140, 255, 0.3);
    }

    /* 3D nav links */
    .nav-link:hover {
        transform: perspective(1000px) translateZ(5px) !important;
    }

    /* 3D dropdown */
    .dropdown-menu,
    .user-dropdown {
        transform-style: preserve-3d;
    }

    .dropdown-menu.show,
    .user-dropdown.show {
        animation: dropdown-3d-entrance 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes dropdown-3d-entrance {
        0% {
            opacity: 0;
            transform: perspective(1000px) rotateX(-15deg) translateY(-20px);
        }
        100% {
            opacity: 1;
            transform: perspective(1000px) rotateX(0deg) translateY(0);
        }
    }

    /* 3D cart slide */
    .cart,
    .chatbot {
        transform-style: preserve-3d;
    }

    .cart.active,
    .chatbot.active {
        animation: panel-3d-slide 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes panel-3d-slide {
        0% {
            opacity: 0;
            transform: perspective(1000px) rotateY(30deg) translateX(100px);
        }
        100% {
            opacity: 1;
            transform: perspective(1000px) rotateY(0deg) translateX(0);
        }
    }

    /* 3D game filter cards */
    .game-card-filter {
        transform-style: preserve-3d;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .game-card-filter:hover {
        transform: perspective(1000px) rotateY(10deg) translateZ(20px) !important;
    }

    /* 3D trust items */
    .trust-item {
        transform-style: preserve-3d;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .trust-item:hover {
        transform: perspective(1000px) translateZ(15px) scale(1.1) !important;
    }

    /* 3D footer links */
    .footer-column a {
        transform-style: preserve-3d;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .footer-column a:hover {
        transform: perspective(1000px) translateZ(10px) translateX(5px) !important;
    }

    /* Reduce motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);

// Initialize transitions
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Transitions3D();
    });
} else {
    new Transitions3D();
}

console.log('🎬 3D Transitions Script Loaded!');
