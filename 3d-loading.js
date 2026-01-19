// 3D Loading Screen with Three.js
// Creates an immersive cyberpunk loading experience

class Loading3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.loadingCube = null;
        this.particles = [];
        this.init();
    }

    init() {
        if (typeof THREE === 'undefined') {
            console.log('Three.js not loaded for loading screen');
            return;
        }

        const loadingDiv = document.getElementById('loading');
        if (!loadingDiv) return;

        // Create scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x000510, 0.01);

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 10;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Add canvas to loading div
        const canvas = this.renderer.domElement;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        loadingDiv.appendChild(canvas);

        // Create loading cube
        this.createLoadingCube();

        // Create particle ring
        this.createParticleRing();

        // Add lighting
        this.setupLighting();

        // Start animation
        this.animate();

        console.log('🎮 3D Loading Screen Initialized!');
    }

    createLoadingCube() {
        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const materials = [
            new THREE.MeshStandardMaterial({ 
                color: 0x5B8CFF, 
                metalness: 0.8, 
                roughness: 0.2,
                emissive: 0x5B8CFF,
                emissiveIntensity: 0.3
            }),
            new THREE.MeshStandardMaterial({ 
                color: 0x7C5CFF, 
                metalness: 0.8, 
                roughness: 0.2,
                emissive: 0x7C5CFF,
                emissiveIntensity: 0.3
            }),
            new THREE.MeshStandardMaterial({ 
                color: 0xC15CFF, 
                metalness: 0.8, 
                roughness: 0.2,
                emissive: 0xC15CFF,
                emissiveIntensity: 0.3
            }),
            new THREE.MeshStandardMaterial({ 
                color: 0x06B6D4, 
                metalness: 0.8, 
                roughness: 0.2,
                emissive: 0x06B6D4,
                emissiveIntensity: 0.3
            }),
            new THREE.MeshStandardMaterial({ 
                color: 0x5B8CFF, 
                metalness: 0.8, 
                roughness: 0.2,
                emissive: 0x5B8CFF,
                emissiveIntensity: 0.3
            }),
            new THREE.MeshStandardMaterial({ 
                color: 0x7C5CFF, 
                metalness: 0.8, 
                roughness: 0.2,
                emissive: 0x7C5CFF,
                emissiveIntensity: 0.3
            })
        ];

        this.loadingCube = new THREE.Mesh(geometry, materials);
        this.scene.add(this.loadingCube);
    }

    createParticleRing() {
        const particleCount = 50; // Reduced from 100
        const radius = 6;

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const geometry = new THREE.SphereGeometry(0.08, 6, 6); // Smaller, less detail
            const material = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x5B8CFF : 0xC15CFF,
                transparent: true,
                opacity: 0.7
            });

            const particle = new THREE.Mesh(geometry, material);
            particle.position.x = Math.cos(angle) * radius;
            particle.position.y = Math.sin(angle) * radius;
            particle.position.z = 0;

            particle.userData.angle = angle;
            particle.userData.radius = radius;
            particle.userData.speed = 0.015 + Math.random() * 0.015; // Slower

            this.particles.push(particle);
            this.scene.add(particle);
        }
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Point lights
        const colors = [0x5B8CFF, 0x7C5CFF, 0xC15CFF, 0x06B6D4];
        const positions = [
            [5, 5, 5],
            [-5, 5, 5],
            [5, -5, 5],
            [-5, -5, 5]
        ];

        positions.forEach((pos, i) => {
            const light = new THREE.PointLight(colors[i], 1, 50);
            light.position.set(...pos);
            this.scene.add(light);
        });
    }

    animate() {
        if (!this.renderer || !this.scene || !this.camera) return;

        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Rotate loading cube
        if (this.loadingCube) {
            this.loadingCube.rotation.x += 0.02;
            this.loadingCube.rotation.y += 0.02;
            this.loadingCube.rotation.z += 0.01;

            // Pulse effect
            const scale = 1 + Math.sin(time * 2) * 0.1;
            this.loadingCube.scale.set(scale, scale, scale);
        }

        // Animate particle ring
        this.particles.forEach((particle, i) => {
            particle.userData.angle += particle.userData.speed;
            particle.position.x = Math.cos(particle.userData.angle) * particle.userData.radius;
            particle.position.y = Math.sin(particle.userData.angle) * particle.userData.radius;
            particle.position.z = Math.sin(time + i * 0.1) * 2;

            // Pulse opacity
            particle.material.opacity = 0.5 + Math.sin(time * 3 + i * 0.2) * 0.3;
        });

        // Camera movement
        this.camera.position.x = Math.sin(time * 0.5) * 2;
        this.camera.position.y = Math.cos(time * 0.3) * 2;
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
        }
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.loadingCube = null;
        this.particles = [];
    }
}

// Initialize loading screen
let loading3D = null;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loading3D = new Loading3D();
    });
} else {
    loading3D = new Loading3D();
}

// Clean up when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        if (loading3D) {
            loading3D.destroy();
        }
    }, 500);
});

console.log('🎮 3D Loading Screen Script Loaded!');
