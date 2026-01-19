// 3D Cursor Effects
// Creates a custom 3D cursor with trail and glow

class Cursor3D {
    constructor() {
        this.cursor = null;
        this.cursorGlow = null;
        this.trail = [];
        this.maxTrailLength = 20;
        this.init();
    }

    init() {
        this.createCursor();
        this.createTrail();
        this.setupEventListeners();

        console.log('🖱️ 3D Cursor initialized!');
    }

    createCursor() {
        // Main cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-3d';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #5B8CFF;
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            transform: translate(-50%, -50%);
            transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
            mix-blend-mode: difference;
        `;
        document.body.appendChild(this.cursor);

        // Cursor glow
        this.cursorGlow = document.createElement('div');
        this.cursorGlow.className = 'cursor-glow';
        this.cursorGlow.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            background: radial-gradient(circle, rgba(91, 140, 255, 0.4), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99998;
            transform: translate(-50%, -50%);
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
            filter: blur(10px);
        `;
        document.body.appendChild(this.cursorGlow);
    }

    createTrail() {
        for (let i = 0; i < 10; i++) { // Reduced from 20 to 10
            const trailDot = document.createElement('div');
            trailDot.className = 'cursor-trail';
            trailDot.style.cssText = `
                position: fixed;
                width: ${8 - i * 0.5}px;
                height: ${8 - i * 0.5}px;
                background: rgba(91, 140, 255, ${0.5 - i * 0.04});
                border-radius: 50%;
                pointer-events: none;
                z-index: 99997;
                transform: translate(-50%, -50%);
                transition: all 0.08s cubic-bezier(0.4, 0, 0.2, 1);
            `;
            document.body.appendChild(trailDot);
            this.trail.push({
                element: trailDot,
                x: 0,
                y: 0
            });
        }
    }

    setupEventListeners() {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update main cursor
            this.cursor.style.left = mouseX + 'px';
            this.cursor.style.top = mouseY + 'px';
            this.cursorGlow.style.left = mouseX + 'px';
            this.cursorGlow.style.top = mouseY + 'px';

            // Update trail
            this.updateTrail(mouseX, mouseY);
        });

        // Cursor effects on interactive elements
        const interactiveElements = 'a, button, .btn, input, textarea, select, .game-card, .mod-card, .game-card-filter';
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(interactiveElements)) {
                this.cursor.style.width = '40px';
                this.cursor.style.height = '40px';
                this.cursor.style.borderColor = '#C15CFF';
                this.cursor.style.backgroundColor = 'rgba(193, 92, 255, 0.1)';
                this.cursorGlow.style.width = '80px';
                this.cursorGlow.style.height = '80px';
                this.cursorGlow.style.background = 'radial-gradient(circle, rgba(193, 92, 255, 0.6), transparent)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches(interactiveElements)) {
                this.cursor.style.width = '20px';
                this.cursor.style.height = '20px';
                this.cursor.style.borderColor = '#5B8CFF';
                this.cursor.style.backgroundColor = 'transparent';
                this.cursorGlow.style.width = '40px';
                this.cursorGlow.style.height = '40px';
                this.cursorGlow.style.background = 'radial-gradient(circle, rgba(91, 140, 255, 0.4), transparent)';
            }
        });

        // Click effect
        document.addEventListener('mousedown', () => {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
            this.cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        document.addEventListener('mouseup', () => {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            this.cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Hide default cursor
        document.body.style.cursor = 'none';
        document.querySelectorAll('a, button, .btn, input, textarea, select').forEach(el => {
            el.style.cursor = 'none';
        });
    }

    updateTrail(x, y) {
        // Shift trail positions
        for (let i = this.trail.length - 1; i > 0; i--) {
            this.trail[i].x = this.trail[i - 1].x;
            this.trail[i].y = this.trail[i - 1].y;
        }

        // Update first trail dot
        this.trail[0].x = x;
        this.trail[0].y = y;

        // Apply positions to elements
        this.trail.forEach((dot, index) => {
            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    /* Hide default cursor on all elements */
    *, *::before, *::after {
        cursor: none !important;
    }

    /* Cursor animations */
    .cursor-3d {
        animation: cursor-pulse 2s ease-in-out infinite;
    }

    @keyframes cursor-pulse {
        0%, 100% {
            box-shadow: 0 0 10px rgba(91, 140, 255, 0.5);
        }
        50% {
            box-shadow: 0 0 20px rgba(91, 140, 255, 0.8);
        }
    }

    /* Cursor glow animation */
    .cursor-glow {
        animation: glow-pulse 2s ease-in-out infinite;
    }

    @keyframes glow-pulse {
        0%, 100% {
            opacity: 0.6;
        }
        50% {
            opacity: 1;
        }
    }

    /* Trail fade animation */
    .cursor-trail {
        animation: trail-fade 0.5s ease-out forwards;
    }

    @keyframes trail-fade {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
    }

    /* Disable custom cursor on mobile */
    @media (max-width: 768px) {
        .cursor-3d,
        .cursor-glow,
        .cursor-trail {
            display: none !important;
        }

        *, *::before, *::after {
            cursor: auto !important;
        }
    }

    /* Disable custom cursor for touch devices */
    @media (hover: none) {
        .cursor-3d,
        .cursor-glow,
        .cursor-trail {
            display: none !important;
        }

        *, *::before, *::after {
            cursor: auto !important;
        }
    }
`;
document.head.appendChild(style);

// Initialize cursor (only on desktop)
if (window.innerWidth > 768 && !('ontouchstart' in window)) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new Cursor3D();
        });
    } else {
        new Cursor3D();
    }
}

console.log('🖱️ 3D Cursor Script Loaded!');
