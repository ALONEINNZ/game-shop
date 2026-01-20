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
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = this.isMobile ? '0.4' : '0.8';
        
        document.body.insertBefore(canvas, document.body.firstChild);
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x5B8CFF, 0.4);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(50, 50, 50);
        this.scene.add(directionalLight);

        // Neon accent lights
        const colors = [0x5B8CFF, 0x7C5CFF, 0xC15CFF];
        const positions = [
            [-50, 30, -30],
            [50, 30, -30],
            [0, 30, 30]
        ];

        positions.forEach((pos, i) => {
            const light = new THREE.PointLight(colors[i], this.isLowPerf ? 1 : 2, 100);
            light.position.set(...pos);
            this.scene.add(light);
        });
    }

    createParticleField() {
        const particleCount = this.isLowPerf ? 500 : 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const color1 = new THREE.Color(0x5B8CFF);
        const color2 = new THREE.Color(0xC15CFF);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Position
            positions[i3] = (Math.random() - 0.5) * 200;
            positions[i3 + 1] = (Math.random() - 0.5) * 200;
            positions[i3 + 2] = (Math.random() - 0.5) * 200;

            // Color gradient
            const mixRatio = Math.random();
            const color = color1.clone().lerp(color2, mixRatio);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Size
            sizes[i] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: this.isLowPerf ? 1 : 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particleField = new THREE.Points(geometry, material);
        this.scene.add(this.particleField);
    }

    createHologramRings() {
        const ringCount = this.isLowPerf ? 2 : 4;
        
        for (let i = 0; i < ringCount; i++) {
            const geometry = new THREE.TorusGeometry(
                15 + i * 8,
                0.3,
                8,
                32
            );
            
            const material = new THREE.MeshStandardMaterial({
                color: i % 2 === 0 ? 0x5B8CFF : 0xC15CFF,
                emissive: i % 2 === 0 ? 0x5B8CFF : 0xC15CFF,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.4,
                wireframe: true
            });

            const ring = new THREE.Mesh(geometry, material);
            ring.position.set(0, -20 + i * 5, -50);
            ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
            
            ring.userData = {
                rotationSpeed: 0.001 + Math.random() * 0.002,
                floatSpeed: 0.5 + Math.random() * 0.5,
                floatOffset: Math.random() * Math.PI * 2
            };

            this.scene.add(ring);
            this.hologramRings.push(ring);
        }
    }

    createEnergyField() {
        // Create grid plane
        const gridSize = 100;
        const divisions = this.isLowPerf ? 20 : 40;
        
        const gridHelper = new THREE.GridHelper(
            gridSize,
            divisions,
            0x5B8CFF,
            0x7C5CFF
        );
        gridHelper.position.y = -30;
        gridHelper.material.opacity = 0.3;
        gridHelper.material.transparent = true;
        
        this.energyField = gridHelper;
        this.scene.add(gridHelper);
    }

    createFloatingCubes() {
        if (this.isLowPerf) return; // Skip on low-performance devices

        const cubeCount = 8;
        
        for (let i = 0; i < cubeCount; i++) {
            const size = Math.random() * 3 + 2;
            const geometry = new THREE.BoxGeometry(size, size, size);
            const material = new THREE.MeshStandardMaterial({
                color: Math.random() > 0.5 ? 0x5B8CFF : 0xC15CFF,
                emissive: Math.random() > 0.5 ? 0x5B8CFF : 0xC15CFF,
                emissiveIntensity: 0.3,
                transparent: true,
                opacity: 0.6,
                wireframe: true
            });

            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(
                (Math.random() - 0.5) * 100,
                Math.random() * 50,
                (Math.random() - 0.5) * 100
            );
            
            cube.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            cube.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                },
                floatSpeed: Math.random() * 0.5 + 0.5,
                floatOffset: Math.random() * Math.PI * 2,
                floatAmplitude: Math.random() * 5 + 2
            };

            this.scene.add(cube);
            this.particles.push(cube);
        }
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

        // Smooth mouse follow
        this.mouseX += (this.targetX - this.mouseX) * 0.05;
        this.mouseY += (this.targetY - this.mouseY) * 0.05;

        // Update camera
        this.camera.position.x += (this.mouseX * 10 - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.mouseY * 10 + 20 - this.camera.position.y) * 0.05;
        this.camera.lookAt(0, 0, 0);

        // Animate particle field
        if (this.particleField) {
            this.particleField.rotation.y += 0.0005;
            const positions = this.particleField.geometry.attributes.position.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(time + positions[i]) * 0.01;
            }
            
            this.particleField.geometry.attributes.position.needsUpdate = true;
        }

        // Animate hologram rings
        this.hologramRings.forEach((ring, index) => {
            ring.rotation.z += ring.userData.rotationSpeed;
            ring.position.y = -20 + index * 5 + Math.sin(time * ring.userData.floatSpeed + ring.userData.floatOffset) * 2;
            ring.material.opacity = 0.3 + Math.sin(time * 2 + index) * 0.1;
        });

        // Animate energy field
        if (this.energyField) {
            this.energyField.position.z = (time * 2) % 10;
        }

        // Animate floating cubes
        this.particles.forEach(cube => {
            cube.rotation.x += cube.userData.rotationSpeed.x;
            cube.rotation.y += cube.userData.rotationSpeed.y;
            cube.rotation.z += cube.userData.rotationSpeed.z;
            
            cube.position.y += Math.sin(time * cube.userData.floatSpeed + cube.userData.floatOffset) * 0.02;
        });

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
