// Interactive 3D Showcase Effects
// Adds extreme Three.js interactivity to showcase sections

class Showcase3D {
    constructor() {
        this.scenes = [];
        this.init();
    }

    init() {
        if (typeof THREE === 'undefined') {
            console.log('Three.js not loaded for showcases');
            return;
        }

        this.createShowcase3DBackgrounds();
        this.addInteractiveCards();
        this.addParticleEffects();
        this.addHoverEffects();

        console.log('🎬 Showcase 3D Effects initialized!');
    }

    createShowcase3DBackgrounds() {
        const showcases = document.querySelectorAll('.scroll-showcase');
        
        showcases.forEach((showcase, index) => {
            // Create 3D canvas for each showcase
            const canvas = document.createElement('canvas');
            canvas.className = 'showcase-3d-bg';
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '1';
            canvas.style.pointerEvents = 'none';
            
            showcase.style.position = 'relative';
            showcase.insertBefore(canvas, showcase.firstChild);

            // Create Three.js scene
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
            camera.position.z = 50;

            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Add floating particles
            const particleCount = 100;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            const color1 = new THREE.Color(0x5B8CFF);
            const color2 = new THREE.Color(0xC15CFF);

            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 100;
                positions[i + 1] = (Math.random() - 0.5) * 100;
                positions[i + 2] = (Math.random() - 0.5) * 50;

                const color = i % 2 === 0 ? color1 : color2;
                colors[i] = color.r;
                colors[i + 1] = color.g;
                colors[i + 2] = color.b;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 1.5,
                vertexColors: true,
                transparent: true,
                opacity: 0.6,
                blending: THREE.AdditiveBlending
            });

            const particles = new THREE.Points(geometry, material);
            scene.add(particles);

            // Don't add the ring - removed per user request

            // Store scene data
            this.scenes.push({
                scene,
                camera,
                renderer,
                particles,
                canvas,
                showcase
            });

            // Animate
            this.animateScene(this.scenes.length - 1);

            // Handle resize
            window.addEventListener('resize', () => {
                camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
            });
        });
    }

    animateScene(index) {
        const sceneData = this.scenes[index];
        if (!sceneData) return;

        const animate = () => {
            requestAnimationFrame(animate);

            const time = Date.now() * 0.001;

            // Rotate particles
            sceneData.particles.rotation.y += 0.001;
            sceneData.particles.rotation.x += 0.0005;

            // Check if showcase is visible
            const rect = sceneData.showcase.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                sceneData.renderer.render(sceneData.scene, sceneData.camera);
            }
        };

        animate();
    }

    addInteractiveCards() {
        const cards = document.querySelectorAll('.showcase-3d-card');
        
        cards.forEach(card => {
            let autoRotation = 0;

            // Auto-rotate
            setInterval(() => {
                if (!card.matches(':hover')) {
                    autoRotation += 0.5;
                    card.style.transform = `
                        perspective(1500px)
                        rotateY(${autoRotation}deg)
                        translateZ(20px)
                    `;
                }
            }, 50);

            // Interactive rotation on hover
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * 25;
                const rotateY = ((x - centerX) / centerX) * 25;
                
                card.style.transform = `
                    perspective(1500px)
                    rotateX(${-rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(50px)
                    scale(1.1)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `
                    perspective(1500px)
                    rotateY(${autoRotation}deg)
                    translateZ(20px)
                `;
            });
        });
    }

    addParticleEffects() {
        const showcases = document.querySelectorAll('.scroll-showcase');
        
        showcases.forEach(showcase => {
            // Add floating particles on mouse move
            showcase.addEventListener('mousemove', (e) => {
                if (Math.random() > 0.95) {
                    this.createMouseParticle(e.clientX, e.clientY, showcase);
                }
            });
        });
    }

    createMouseParticle(x, y, container) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = Math.random() > 0.5 ? '#5B8CFF' : '#C15CFF';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '100';
        particle.style.boxShadow = `0 0 10px ${Math.random() > 0.5 ? '#5B8CFF' : '#C15CFF'}`;
        
        document.body.appendChild(particle);

        // Animate
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const duration = 1000 + Math.random() * 1000;

        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => particle.remove();
    }

    addHoverEffects() {
        // Add glow effect to stats on hover
        const stats = document.querySelectorAll('.mod-stats .stat');
        
        stats.forEach(stat => {
            stat.addEventListener('mouseenter', () => {
                stat.style.transform = 'translateY(-5px) scale(1.05)';
                stat.style.background = 'rgba(91, 140, 255, 0.2)';
                stat.style.boxShadow = '0 10px 30px rgba(91, 140, 255, 0.3)';
            });

            stat.addEventListener('mouseleave', () => {
                stat.style.transform = 'translateY(0) scale(1)';
                stat.style.background = 'transparent';
                stat.style.boxShadow = 'none';
            });
        });

        // Add feature list hover effects
        const features = document.querySelectorAll('.mod-features li');
        
        features.forEach((feature, index) => {
            feature.style.transition = 'all 0.3s ease';
            
            feature.addEventListener('mouseenter', () => {
                feature.style.transform = 'translateX(10px)';
                feature.style.color = '#5B8CFF';
                
                // Create particle burst
                const rect = feature.getBoundingClientRect();
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        this.createMouseParticle(rect.left, rect.top + rect.height / 2, feature);
                    }, i * 50);
                }
            });

            feature.addEventListener('mouseleave', () => {
                feature.style.transform = 'translateX(0)';
                feature.style.color = 'rgba(255, 255, 255, 0.9)';
            });
        });
    }
}

// Initialize when DOM is ready
console.log('🎬 Showcase 3D Script Loading...');

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🎬 DOM loaded, waiting 1 second...');
        setTimeout(() => {
            console.log('🎬 Creating Showcase3D...');
            new Showcase3D();
        }, 1000);
    });
} else {
    console.log('🎬 DOM already loaded, waiting 1 second...');
    setTimeout(() => {
        console.log('🎬 Creating Showcase3D...');
        new Showcase3D();
    }, 1000);
}

console.log('🎬 Showcase 3D Script Loaded!');
