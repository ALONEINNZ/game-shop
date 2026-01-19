// Section-Specific 3D Effects
// Adds unique 3D elements to each section of the website

class Section3D {
    constructor() {
        this.init();
    }

    init() {
        if (typeof THREE === 'undefined') {
            console.log('Three.js not loaded for section effects');
            return;
        }

        this.addFeaturedModsEffect();
        this.addGameFilterEffect();
        this.addParallaxEffect();
        this.setupIntersectionObserver();

        console.log('🎨 Section 3D effects initialized!');
    }

    addFeaturedModsEffect() {
        const section = document.getElementById('featured-games');
        if (!section) return;

        // Create floating mod icons
        const container = document.createElement('div');
        container.className = '3d-section-container';
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.overflow = 'hidden';
        container.style.zIndex = '1';

        // Add floating cubes
        for (let i = 0; i < 5; i++) {
            const cube = document.createElement('div');
            cube.className = 'floating-cube';
            cube.style.position = 'absolute';
            cube.style.width = '40px';
            cube.style.height = '40px';
            cube.style.background = `linear-gradient(135deg, rgba(91, 140, 255, 0.2), rgba(124, 92, 255, 0.2))`;
            cube.style.border = '1px solid rgba(91, 140, 255, 0.4)';
            cube.style.borderRadius = '8px';
            cube.style.backdropFilter = 'blur(10px)';
            cube.style.left = `${Math.random() * 100}%`;
            cube.style.top = `${Math.random() * 100}%`;
            cube.style.animation = `float-cube ${5 + Math.random() * 5}s ease-in-out infinite`;
            cube.style.animationDelay = `${Math.random() * 2}s`;
            cube.style.transform = `rotate(${Math.random() * 360}deg)`;
            container.appendChild(cube);
        }

        section.style.position = 'relative';
        section.insertBefore(container, section.firstChild);
    }

    addGameFilterEffect() {
        const section = document.getElementById('game-filter');
        if (!section) return;

        // Add energy lines between game cards
        const container = document.createElement('div');
        container.className = '3d-energy-lines';
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '1';

        // Create SVG for lines
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';

        // Add animated lines
        for (let i = 0; i < 8; i++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', `${Math.random() * 100}%`);
            line.setAttribute('y1', `${Math.random() * 100}%`);
            line.setAttribute('x2', `${Math.random() * 100}%`);
            line.setAttribute('y2', `${Math.random() * 100}%`);
            line.setAttribute('stroke', 'rgba(91, 140, 255, 0.3)');
            line.setAttribute('stroke-width', '2');
            line.style.animation = `pulse-line ${2 + Math.random() * 2}s ease-in-out infinite`;
            svg.appendChild(line);
        }

        container.appendChild(svg);
        section.style.position = 'relative';
        section.insertBefore(container, section.firstChild);
    }

    addParallaxEffect() {
        const parallaxSections = document.querySelectorAll('.parallax-section');
        
        parallaxSections.forEach(section => {
            // Add depth layers
            const layers = 3;
            for (let i = 0; i < layers; i++) {
                const layer = document.createElement('div');
                layer.className = `parallax-layer-${i}`;
                layer.style.position = 'absolute';
                layer.style.top = '0';
                layer.style.left = '0';
                layer.style.width = '100%';
                layer.style.height = '100%';
                layer.style.background = `radial-gradient(circle at ${50 + i * 10}% ${50 + i * 10}%, rgba(91, 140, 255, ${0.1 - i * 0.03}), transparent)`;
                layer.style.pointerEvents = 'none';
                layer.style.zIndex = `${i}`;
                section.appendChild(layer);
            }
        });
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    this.triggerSectionAnimation(entry.target);
                }
            });
        }, options);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    triggerSectionAnimation(section) {
        // Add entrance animation
        const cards = section.querySelectorAll('.game-card, .mod-card, .game-card-filter');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'card-entrance 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }, index * 50);
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float-cube {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.6;
        }
    }

    @keyframes pulse-line {
        0%, 100% {
            opacity: 0.2;
            stroke-width: 1;
        }
        50% {
            opacity: 0.6;
            stroke-width: 3;
        }
    }

    @keyframes card-entrance {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .section-visible {
        animation: section-fade-in 0.8s ease-out;
    }

    @keyframes section-fade-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Parallax layer animations */
    .parallax-layer-0,
    .parallax-layer-1,
    .parallax-layer-2 {
        animation: parallax-float 10s ease-in-out infinite;
    }

    .parallax-layer-1 {
        animation-delay: 1s;
        animation-duration: 12s;
    }

    .parallax-layer-2 {
        animation-delay: 2s;
        animation-duration: 14s;
    }

    @keyframes parallax-float {
        0%, 100% {
            transform: translateY(0) scale(1);
        }
        50% {
            transform: translateY(-20px) scale(1.05);
        }
    }

    /* 3D depth for sections */
    .section {
        transform-style: preserve-3d;
        perspective: 1000px;
    }

    /* Enhanced card depth */
    .game-card,
    .mod-card,
    .game-card-filter {
        transform-style: preserve-3d;
    }

    .game-card img,
    .mod-card img {
        transform: translateZ(20px);
    }

    .game-info,
    .mod-info {
        transform: translateZ(30px);
    }

    /* Glow effect on section entry */
    .section-visible::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(91, 140, 255, 0.3), transparent);
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: glow-pulse 3s ease-out;
        z-index: 0;
    }

    @keyframes glow-pulse {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 400px;
            height: 400px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize section effects
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Section3D();
    });
} else {
    new Section3D();
}

console.log('🎮 Section 3D Effects Script Loaded!');
