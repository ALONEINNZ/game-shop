// EXUSCRAFT 3D EXPERIENCE
// Optimized Three.js integration with cyberpunk aesthetics

class ExusCraft3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.hologramRings = [];
        this.energyField = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.isMobile = window.innerWidth <= 768;
        this.isLowPerf = this.detectLowPerformance();
        
        if (typeof THREE !== 'undefined') {
            this.init();
        } else {
            console.warn('Three.js not loaded');
        }
    }

    detectLowPerformance() {
        // Detect if device is low performance
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        return isMobile || isSlowDevice;
    }

    init() {
        this.setupScene();
        this.createParticleField();
        this.createHologramRings();
        this.createEnergyField();
        this.createFloatingCubes();
        this.setupLighting();
        this.setupEventListeners();
        this.animate();
        
        console.log('🎮 ExusCraft 3D Experience Loaded');
    }

    setupScene() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x0B0F14, 0.0015);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = this.isMobile ? 80 : 50;
        this.camera.position.y = this.isMobile ? 10 : 20;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: !this.isLowPerf,
            powerPreference: this.isLowPerf ? 'low-power' : 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(this.isLowPerf ? 1 : Math.min(window.devicePixelRatio, 2));
        
        const canvas = this.renderer.domElement;
        canvas.id = 'three-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1';
        canvas.style.pointerEvents = 'none'; // CRITICAL: Allow scroll through canvas
        canvas.style.opacity = this.isMobile ? '0.4' : '0.8';
        canvas.style.touchAction = 'auto'; // Allow touch scrolling
        canvas.style.userSelect = 'none'; // Prevent text selection
        
        document.body.insertBefore(canvas, document.body.firstChild);
    }

    setupLighting() {
        // Minimal lighting - just ambient
        const ambientLight = new THREE.AmbientLight(0x5B8CFF, 0.3);
        this.scene.add(ambientLight);

        // One simple directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
        directionalLight.position.set(50, 50, 50);
        this.scene.add(directionalLight);
    }

    createParticleField() {
        // Ultra lightweight - only 50-200 particles max
        const particleCount = this.isLowPerf ? 50 : 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 1] = (Math.random() - 0.5) * 100;
            positions[i3 + 2] = (Math.random() - 0.5) * 100;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 1,
            color: 0x5B8CFF,
            transparent: true,
            opacity: 0.4,
            depthWrite: false
        });

        this.particleField = new THREE.Points(geometry, material);
        this.scene.add(this.particleField);
    }

    createHologramRings() {
        // Only 1-2 rings max
        const ringCount = this.isLowPerf ? 1 : 2;
        
        for (let i = 0; i < ringCount; i++) {
            const geometry = new THREE.TorusGeometry(
                15 + i * 8,
                0.2,
                4,
                16
            );
            
            const material = new THREE.MeshBasicMaterial({
                color: 0x5B8CFF,
                transparent: true,
                opacity: 0.2,
                wireframe: true
            });

            const ring = new THREE.Mesh(geometry, material);
            ring.position.set(0, -20 + i * 5, -50);
            ring.rotation.x = Math.PI / 2;
            
            ring.userData = {
                rotationSpeed: 0.001,
                floatSpeed: 0.2,
                floatOffset: i * Math.PI
            };

            this.scene.add(ring);
            this.hologramRings.push(ring);
        }
    }

    createEnergyField() {
        // Simple grid - no complex geometry
        const gridSize = 50;
        const divisions = 10;
        
        const gridHelper = new THREE.GridHelper(
            gridSize,
            divisions,
            0x5B8CFF,
            0x5B8CFF
        );
        gridHelper.position.y = -30;
        gridHelper.material.opacity = 0.1;
        gridHelper.material.transparent = true;
        
        this.energyField = gridHelper;
        this.scene.add(gridHelper);
    }

    createFloatingCubes() {
        // Disable cubes completely - too expensive
        return;
    }

    setupEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            
            // Update mobile detection
            this.isMobile = window.innerWidth <= 768;
            const canvas = document.getElementById('three-canvas');
            if (canvas) {
                canvas.style.opacity = this.isMobile ? '0.4' : '0.8';
            }
        });

        // Scroll effect
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    this.camera.position.z = (this.isMobile ? 80 : 50) + scrollY * 0.05;
                    
                    if (this.energyField) {
                        this.energyField.position.y = -30 - scrollY * 0.02;
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Smooth mouse follow (less frequent updates)
        this.mouseX += (this.targetX - this.mouseX) * 0.02; // Slower
        this.mouseY += (this.targetY - this.mouseY) * 0.02;

        // Update camera (less movement)
        this.camera.position.x += (this.mouseX * 5 - this.camera.position.x) * 0.02; // Reduced
        this.camera.position.y += (-this.mouseY * 5 + 20 - this.camera.position.y) * 0.02;
        this.camera.lookAt(0, 0, 0);

        // Animate particle field (minimal)
        if (this.particleField) {
            this.particleField.rotation.y += 0.0002; // Much slower
        }

        // Animate hologram rings (minimal)
        this.hologramRings.forEach(ring => {
            ring.rotation.z += ring.userData.rotationSpeed;
        });

        // Animate energy field (minimal)
        if (this.energyField) {
            this.energyField.position.z = (time * 0.5) % 5; // Much slower
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ExusCraft3D();
    });
} else {
    new ExusCraft3D();
}
