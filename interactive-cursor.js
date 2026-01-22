// INTERACTIVE CURSOR EFFECTS
// Particles follow cursor with trail effects

class InteractiveCursor {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.trail = [];
        this.canvas = null;
        this.ctx = null;
        this.isActive = true;
        
        this.init();
    }

    init() {
        this.createCanvas();
        this.setupEventListeners();
        this.animate();
        
        console.log('✨ Interactive Cursor Effects Loaded!');
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'cursor-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Add to trail
            this.trail.push({
                x: e.clientX,
                y: e.clientY,
                life: 1,
                size: Math.random() * 3 + 2
            });
            
            // Limit trail length
            if (this.trail.length > 20) {
                this.trail.shift();
            }
            
            // Create particles on movement
            if (Math.random() < 0.3) {
                this.createParticle(e.clientX, e.clientY);
            }
        });

        // Click effects
        document.addEventListener('click', (e) => {
            this.createClickEffect(e.clientX, e.clientY);
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.resize();
        });

        // Toggle on/off with 'C' key
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'c' && e.ctrlKey) {
                this.toggle();
                e.preventDefault();
            }
        });
    }

    createParticle(x, y) {
        const colors = ['#5B8CFF', '#7C5CFF', '#C15CFF', '#FACC15'];
        
        this.particles.push({
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            decay: Math.random() * 0.02 + 0.01,
            size: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            glow: Math.random() * 10 + 5
        });
    }

    createClickEffect(x, y) {
        // Create burst of particles
        for (let i = 0; i < 15; i++) {
            const angle = (Math.PI * 2 * i) / 15;
            const speed = Math.random() * 5 + 3;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.02,
                size: Math.random() * 6 + 3,
                color: '#FACC15',
                glow: 15,
                burst: true
            });
        }
    }

    animate() {
        if (!this.isActive) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw trail
        this.drawTrail();

        // Update and draw particles
        this.updateParticles();

        // Draw cursor glow
        this.drawCursorGlow();

        requestAnimationFrame(() => this.animate());
    }

    drawTrail() {
        if (this.trail.length < 2) return;

        this.ctx.strokeStyle = 'rgba(91, 140, 255, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();

        for (let i = 0; i < this.trail.length; i++) {
            const point = this.trail[i];
            point.life -= 0.05;

            if (point.life <= 0) {
                this.trail.splice(i, 1);
                i--;
                continue;
            }

            const alpha = point.life * 0.3;
            this.ctx.globalAlpha = alpha;

            if (i === 0) {
                this.ctx.moveTo(point.x, point.y);
            } else {
                this.ctx.lineTo(point.x, point.y);
            }
        }

        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Apply gravity for burst particles
            if (particle.burst) {
                particle.vy += 0.1;
            }

            // Fade out
            particle.life -= particle.decay;

            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            // Draw particle
            this.drawParticle(particle);
        }
    }

    drawParticle(particle) {
        const alpha = particle.life;
        const size = particle.size * particle.life;

        // Glow effect
        this.ctx.shadowColor = particle.color;
        this.ctx.shadowBlur = particle.glow;

        // Draw particle
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        this.ctx.fill();

        // Reset shadow
        this.ctx.shadowBlur = 0;
        this.ctx.globalAlpha = 1;
    }

    drawCursorGlow() {
        if (this.mouse.x === 0 && this.mouse.y === 0) return;

        // Outer glow
        const gradient = this.ctx.createRadialGradient(
            this.mouse.x, this.mouse.y, 0,
            this.mouse.x, this.mouse.y, 30
        );
        gradient.addColorStop(0, 'rgba(91, 140, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(91, 140, 255, 0)');

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 30, 0, Math.PI * 2);
        this.ctx.fill();

        // Inner dot
        this.ctx.fillStyle = 'rgba(193, 92, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 2, 0, Math.PI * 2);
        this.ctx.fill();
    }

    toggle() {
        this.isActive = !this.isActive;
        this.canvas.style.display = this.isActive ? 'block' : 'none';
        
        // Show notification
        const notification = document.createElement('div');
        notification.textContent = `Cursor Effects: ${this.isActive ? 'ON' : 'OFF'}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 14px;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new InteractiveCursor();
    });
} else {
    new InteractiveCursor();
}