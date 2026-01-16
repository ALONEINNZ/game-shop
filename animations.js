// ============================================
// EXUSCRAFT - ENHANCED ANIMATIONS WITH GSAP
// ============================================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// INITIAL PAGE LOAD ANIMATIONS
// ============================================
window.addEventListener('load', () => {
    // Hide loading screen with delay to show intro
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 2000); // Show for 2 seconds
    }

    // Animate navbar items after loading
    setTimeout(() => {
        gsap.from('.nav-link', {
            y: -20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }, 2200);

    // Animate hero content
    setTimeout(() => {
        gsap.from('.hero-badge', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });

        gsap.from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            delay: 0.2
        });

        gsap.from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.4
        });

        gsap.from('.hero-cta .btn', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            delay: 0.6
        });

        gsap.from('.hero-stat', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.8
        });
    }, 2200);
});

// ============================================
// SCROLL-TRIGGERED ANIMATIONS - DISABLED TO FIX VISIBILITY
// ============================================

// Animate section titles - DISABLED
/*
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
        },
        y: 50,
        opacity: 0
    });
});
*/

// Animate game cards on scroll - DISABLED
/*
setTimeout(() => {
    gsap.utils.toArray('.game-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 1
            },
            y: 50,
            opacity: 0
        });
    });
}, 1000);
*/

// Animate trust bar items - DISABLED
/*
gsap.from('.trust-item', {
    scrollTrigger: {
        trigger: '.trust-bar',
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1
    },
    y: 30,
    opacity: 0,
    stagger: 0.1
});
*/

// Animate game filter cards - DISABLED
/*
gsap.from('.game-card-filter', {
    scrollTrigger: {
        trigger: '.game-grid',
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1
    },
    y: 50,
    opacity: 0,
    stagger: 0.1
});
*/

// ============================================
// PARALLAX EFFECTS
// ============================================

// Parallax for hero particles
gsap.to('.particle', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: -200,
    stagger: 0.05
});

// Parallax for glow effects
gsap.to('.glow-effect', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: -100,
    scale: 1.2
});

// ============================================
// HOVER ANIMATIONS FOR CARDS
// ============================================
// Wait for cards to load before adding hover animations
setTimeout(() => {
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            const img = this.querySelector('.game-image img');
            if (img) {
                gsap.to(img, {
                    scale: 1.1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            const img = this.querySelector('.game-image img');
            if (img) {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });
}, 1000);

// ============================================
// FLOATING ANIMATION FOR BUTTONS
// ============================================
gsap.to('.btn-animated', {
    y: -5,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.2
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================
function animateCounter(element, target) {
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        textContent: target,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
        onUpdate: function() {
            const value = Math.ceil(this.targets()[0].textContent);
            element.textContent = value.toLocaleString() + (target >= 1000 ? '+' : '');
        }
    });
}

// Animate hero stats
window.addEventListener('load', () => {
    setTimeout(() => {
        const totalMods = document.getElementById('totalMods');
        const totalDownloads = document.getElementById('totalDownloads');
        const totalCreators = document.getElementById('totalCreators');
        
        if (totalMods) animateCounter(totalMods, 1200);
        if (totalDownloads) animateCounter(totalDownloads, 50000);
        if (totalCreators) animateCounter(totalCreators, 500);
    }, 1500);
});

// ============================================
// SMOOTH SCROLL TO SECTIONS
// ============================================
function scrollToMods() {
    gsap.to(window, {
        duration: 1.5,
        scrollTo: '#games',
        ease: 'power3.inOut'
    });
}

// ============================================
// MODAL ANIMATIONS
// ============================================
function animateModalOpen(modal) {
    gsap.fromTo(modal, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
    );
}

function animateModalClose(modal) {
    gsap.to(modal, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
            modal.style.display = 'none';
        }
    });
}

// ============================================
// CART TOGGLE ANIMATION
// ============================================
const originalToggleCart = window.toggleCart;
window.toggleCart = function() {
    const cart = document.getElementById('cart');
    if (cart.classList.contains('active')) {
        gsap.to(cart, {
            x: 400,
            duration: 0.4,
            ease: 'power3.in',
            onComplete: () => {
                cart.classList.remove('active');
            }
        });
    } else {
        cart.classList.add('active');
        gsap.fromTo(cart,
            { x: 400 },
            { x: 0, duration: 0.4, ease: 'power3.out' }
        );
    }
};

// ============================================
// CHATBOT TOGGLE ANIMATION
// ============================================
const originalToggleChatbot = window.toggleChatbot;
window.toggleChatbot = function() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot.classList.contains('active')) {
        gsap.to(chatbot, {
            y: 600,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.in',
            onComplete: () => {
                chatbot.classList.remove('active');
            }
        });
    } else {
        chatbot.classList.add('active');
        gsap.fromTo(chatbot,
            { y: 600, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
        );
    }
};

// ============================================
// FLOATING ACTION BUTTONS ANIMATION
// ============================================
gsap.to('.cart-toggle, .chatbot-toggle, .download-manager-toggle', {
    y: -3,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.3
});

// ============================================
// SEARCH BAR FOCUS ANIMATION
// ============================================
document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('focus', function() {
        gsap.to(this, {
            scale: 1.02,
            duration: 0.2,
            ease: 'power2.out'
        });
    });

    input.addEventListener('blur', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});

// ============================================
// PARTICLE SYSTEM FOR HERO
// ============================================
function createParticles() {
    const particleField = document.querySelector('.particle-field');
    if (!particleField) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (5 + Math.random() * 10) + 's';
        particleField.appendChild(particle);
    }
}

// Initialize particles on load
window.addEventListener('load', createParticles);

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN EFFECTS - DISABLED
// ============================================
/*
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            gsap.to(entry.target, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
            fadeInObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe all fade-in elements - wait for them to load
setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach(el => {
        gsap.set(el, { opacity: 0, y: 30 });
        fadeInObserver.observe(el);
    });
}, 500);
*/

console.log('🎮 ExusCraft Enhanced Animations Loaded!');
