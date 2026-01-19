// 3D Card Hover Effects - ENHANCED
// Makes mod cards lift and tilt in 3D space with extreme effects

function init3DCardEffects() {
    const cards = document.querySelectorAll('.game-card, .mod-card, .game-card-filter');
    
    console.log('🎴 Initializing 3D effects on', cards.length, 'cards');
    
    cards.forEach(card => {
        // Force 3D rendering
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.position = 'relative';
        card.style.willChange = 'transform'; // Add will-change for smoother transforms

        // Add inner elements for depth
        const cardInner = document.createElement('div');
        cardInner.className = 'card-3d-inner';
        cardInner.style.transformStyle = 'preserve-3d';
        cardInner.style.position = 'relative';
        cardInner.style.width = '100%';
        cardInner.style.height = '100%';
        
        // Move all children into inner div
        while (card.firstChild) {
            cardInner.appendChild(card.firstChild);
        }
        card.appendChild(cardInner);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (increased for more dramatic effect)
            const rotateX = ((y - centerY) / centerY) * 20; // Increased to 20 degrees
            const rotateY = ((centerX - x) / centerX) * 20; // Increased to 20 degrees

            // Apply 3D transform with more dramatic effect
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(40px)
                scale3d(1.1, 1.1, 1.1)
            `;

            // Add dynamic glow effect
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            
            card.style.setProperty('--glow-x', `${glowX}%`);
            card.style.setProperty('--glow-y', `${glowY}%`);
            
            // Add shine effect
            const shine = card.querySelector('.card-shine') || createShine(card);
            shine.style.background = `
                radial-gradient(
                    circle at ${glowX}% ${glowY}%,
                    rgba(255, 255, 255, 0.4) 0%,
                    rgba(91, 140, 255, 0.3) 20%,
                    transparent 60%
                )
            `;
            shine.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                translateZ(0px)
                scale3d(1, 1, 1)
            `;
            
            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.opacity = '0';
            }
        });

        // Add initial shine layer
        createShine(card);
    });

    console.log('✅ 3D card effects initialized!');
}

function createShine(card) {
    let shine = card.querySelector('.card-shine');
    if (!shine) {
        shine = document.createElement('div');
        shine.className = 'card-shine';
        shine.style.position = 'absolute';
        shine.style.top = '0';
        shine.style.left = '0';
        shine.style.width = '100%';
        shine.style.height = '100%';
        shine.style.pointerEvents = 'none';
        shine.style.borderRadius = 'inherit';
        shine.style.zIndex = '10';
        shine.style.transition = 'opacity 0.3s ease, background 0.1s ease';
        shine.style.opacity = '0';
        card.appendChild(shine);
    }
    return shine;
}

// Re-initialize when new cards are added
const observer = new MutationObserver((mutations) => {
    let shouldReinit = false;
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && (
                node.classList?.contains('game-card') ||
                node.classList?.contains('mod-card') ||
                node.classList?.contains('game-card-filter') ||
                node.querySelector?.('.game-card, .mod-card, .game-card-filter')
            )) {
                shouldReinit = true;
            }
        });
    });
    if (shouldReinit) {
        setTimeout(init3DCardEffects, 100);
    }
});

// Start observing
if (document.body) {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Initial setup with multiple attempts
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init3DCardEffects();
        setTimeout(init3DCardEffects, 500);
        setTimeout(init3DCardEffects, 1000);
        setTimeout(init3DCardEffects, 2000);
        setTimeout(init3DCardEffects, 3000);
    });
} else {
    init3DCardEffects();
    setTimeout(init3DCardEffects, 500);
    setTimeout(init3DCardEffects, 1000);
    setTimeout(init3DCardEffects, 2000);
    setTimeout(init3DCardEffects, 3000);
}

console.log('🎮 3D Card Effects Script Loaded!');
