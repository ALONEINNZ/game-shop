// MICRO-INTERACTIONS & ADVANCED ANIMATIONS
// Button morphing, loading animations, hover effects

class MicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupButtonMorphing();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
        this.setupScrollAnimations();
        this.setupGestureControls();
        this.ensureClickability();
        
        console.log('✨ Micro-Interactions Loaded!');
    }

    ensureClickability() {
        // Ensure all interactive elements remain clickable
        const clickableElements = document.querySelectorAll('.game-card, .mod-card, .btn, a[href], button, [onclick]');
        
        clickableElements.forEach(element => {
            // Ensure proper z-index and pointer events
            const computedStyle = window.getComputedStyle(element);
            if (computedStyle.position === 'static') {
                element.style.position = 'relative';
            }
            element.style.zIndex = Math.max(parseInt(element.style.zIndex) || 0, 10);
            element.style.pointerEvents = 'auto';
        });

        // Don't re-run automatically to prevent infinite loops
    }

    setupButtonMorphing() {
        // Add morphing effects to all buttons - but no click animations
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Remove click ripple effect - it's causing issues
            // Just add magnetic effect
            button.addEventListener('mousemove', (e) => {
                this.magneticEffect(e, button);
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }

    createRipple(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;

        // Add ripple animation
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                .btn {
                    position: relative;
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }

        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    magneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.1;
        const moveY = y * 0.1;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
    }

    setupHoverEffects() {
        // Game cards hover effects
        const gameCards = document.querySelectorAll('.game-card, .mod-card');
        
        gameCards.forEach(card => {
            // Ensure the card remains clickable
            card.style.position = 'relative';
            card.style.zIndex = '10';
            
            card.addEventListener('mouseenter', () => {
                this.cardHoverEnter(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.cardHoverLeave(card);
            });
            
            card.addEventListener('mousemove', (e) => {
                this.cardMouseMove(e, card);
            });
        });
    }

    cardHoverEnter(card) {
        // Add glow effect
        card.style.boxShadow = '0 20px 40px rgba(91, 140, 255, 0.3), 0 0 0 1px rgba(91, 140, 255, 0.2)';
        card.style.transform = 'translateY(-10px) scale(1.02)';
        
        // Animate image
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.1)';
            img.style.filter = 'brightness(1.1) saturate(1.2)';
        }
    }

    cardHoverLeave(card) {
        card.style.boxShadow = '';
        card.style.transform = '';
        
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = '';
            img.style.filter = '';
        }
    }

    cardMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-10px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    setupLoadingAnimations() {
        // Enhanced loading animations
        const style = document.createElement('style');
        style.textContent = `
            .loading-dots {
                display: inline-flex;
                gap: 4px;
            }
            
            .loading-dots span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #5B8CFF;
                animation: loading-bounce 1.4s ease-in-out infinite both;
            }
            
            .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
            .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
            .loading-dots span:nth-child(3) { animation-delay: 0s; }
            
            @keyframes loading-bounce {
                0%, 80%, 100% {
                    transform: scale(0.8);
                    opacity: 0.5;
                }
                40% {
                    transform: scale(1.2);
                    opacity: 1;
                }
            }
            
            .pulse-glow {
                animation: pulse-glow 2s ease-in-out infinite alternate;
            }
            
            @keyframes pulse-glow {
                from {
                    box-shadow: 0 0 20px rgba(91, 140, 255, 0.4);
                }
                to {
                    box-shadow: 0 0 40px rgba(193, 92, 255, 0.6);
                }
            }
            
            .float-animation {
                animation: float 3s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements
        const animateElements = document.querySelectorAll('.section-header, .game-card, .trust-item');
        animateElements.forEach(el => {
            el.classList.add('animate-element');
            observer.observe(el);
        });

        // Add animation styles
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            .animate-element {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .animate-element.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .game-card.animate-element {
                transition-delay: calc(var(--index, 0) * 0.1s);
            }
            
            /* Ensure clickability - Simple version */
            .game-card, .mod-card, .btn, button, a[href], [onclick] {
                position: relative !important;
                z-index: 100 !important;
                pointer-events: auto !important;
                cursor: pointer !important;
            }
            
            /* Simple click protection */
            .game-card:active, .mod-card:active, .btn:active, button:active {
                transform: scale(0.98) !important;
            }
        `;
        document.head.appendChild(animationStyle);

        // Add index to game cards for staggered animation
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach((card, index) => {
            card.style.setProperty('--index', index);
        });
    }

    setupGestureControls() {
        // Touch gesture controls for mobile
        let touchStartX = 0;
        let touchStartY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // Swipe detection
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.handleSwipeRight();
                } else {
                    this.handleSwipeLeft();
                }
            }
        });
    }

    handleSwipeRight() {
        // Navigate to previous section or show notification
        this.showSwipeNotification('Swipe Right Detected! 👉');
    }

    handleSwipeLeft() {
        // Navigate to next section or show notification
        this.showSwipeNotification('Swipe Left Detected! 👈');
    }

    showSwipeNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            z-index: 10000;
            font-size: 16px;
            animation: slideUp 0.3s ease-out;
        `;

        // Add slide animation
        if (!document.querySelector('#swipe-styles')) {
            const style = document.createElement('style');
            style.id = 'swipe-styles';
            style.textContent = `
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    }

    // Add floating elements
    addFloatingElements() {
        const floatingElements = [
            { emoji: '⭐', delay: 0 },
            { emoji: '🎮', delay: 1 },
            { emoji: '🚀', delay: 2 },
            { emoji: '✨', delay: 3 }
        ];

        floatingElements.forEach((element, index) => {
            const floating = document.createElement('div');
            floating.textContent = element.emoji;
            floating.style.cssText = `
                position: fixed;
                font-size: 2rem;
                pointer-events: none;
                z-index: 1;
                opacity: 0.3;
                animation: float 4s ease-in-out infinite;
                animation-delay: ${element.delay}s;
                top: ${20 + index * 20}%;
                right: ${10 + Math.random() * 10}%;
            `;
            
            document.body.appendChild(floating);
        });
    }
}

// Initialize micro-interactions
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const microInteractions = new MicroInteractions();
        // Add floating elements after a delay
        setTimeout(() => microInteractions.addFloatingElements(), 3000);
    });
} else {
    const microInteractions = new MicroInteractions();
    setTimeout(() => microInteractions.addFloatingElements(), 3000);
}