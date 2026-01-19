// ULTIMATE 3D REDESIGN - ExusCraft Cyberpunk Edition
// Full Three.js integration with insane effects

let scene, camera, renderer;
let mouseTrail = [];
let energyBeams = [];
let holographicElements = [];
let neonGrid;
let portalEffect;

class Ultimate3D {
    constructor() {
        this.init();
    }

    init() {
        if (typeof THREE === 'undefined') return;

        this.setupScene();
        this.createNeonGrid();
        this.createMouseTrail();
        this.createEnergyBeams();
        this.createHolographicUI();
        this.createPortalEffects();
        this.setupEventListeners();
        this.animate();

        console.log('🚀 ULTIMATE 3D MODE ACTIVATED!');
    }

    setupScene() {
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000510, 0.001);

        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        camera.position.set(0, 50, 100);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        const canvas = renderer.domElement;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        canvas.style.pointerEvents = 'none';
        document.body.prepend(canvas);

        // Advanced lighting
        const ambientLight = new THREE.AmbientLight(0x5B8CFF, 0.3);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(50, 100, 50);
        mainLight.castShadow = true;
        scene.add(mainLight);

        // Neon accent lights
        this.createNeonLights();
    }

    createNeonLights() {
        const colors = [0x5B8CFF, 0x7C5CFF, 0xC15CFF, 0x06B6D4];
        const positions = [
            [-100, 50, 0],
            [100, 50, 0],
            [0, 50, -100],
            [0, 50, 100]
        ];

        positions.forEach((pos, i) => {
            const light = new THREE.PointLight(colors[i], 2, 200);
            light.position.set(...pos);
            scene.add(light);

            // Add light sphere
            const sphereGeometry = new THREE.SphereGeometry(2, 16, 16);
            const sphereMaterial = new THREE.MeshBasicMaterial({ 
                color: colors[i],
                transparent: true,
                opacity: 0.8
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.copy(light.position);
            scene.add(sphere);
        });
    }

    createNeonGrid() {
        // Create infinite neon grid floor
        const gridSize = 200;
        const divisions = 50;
        const gridHelper = new THREE.GridHelper(gridSize, divisions, 0x5B8CFF, 0x7C5CFF);
        gridHelper.position.y = -20;
        gridHelper.material.opacity = 0.3;
        gridHelper.material.transparent = true;
        scene.add(gridHelper);

        // Add glowing plane underneath
        const planeGeometry = new THREE.PlaneGeometry(gridSize, gridSize);
        const planeMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0e14,
            emissive: 0x5B8CFF,
            emissiveIntensity: 0.1,
            transparent: true,
            opacity: 0.5
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -20;
        plane.receiveShadow = true;
        scene.add(plane);

        neonGrid = { grid: gridHelper, plane };
    }

    createMouseTrail() {
        // Create particle trail that follows mouse
        const trailGeometry = new THREE.BufferGeometry();
        const trailMaterial = new THREE.PointsMaterial({
            color: 0x5B8CFF,
            size: 2,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const positions = new Float32Array(100 * 3);
        trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const trail = new THREE.Points(trailGeometry, trailMaterial);
        scene.add(trail);

        this.mouseTrail = { geometry: trailGeometry, points: trail, positions: [] };
    }

    createEnergyBeams() {
        // Create energy beams connecting UI elements
        for (let i = 0; i < 10; i++) { // Reduced from 20 to 10
            const points = [];
            points.push(new THREE.Vector3(
                (Math.random() - 0.5) * 200,
                Math.random() * 100,
                (Math.random() - 0.5) * 200
            ));
            points.push(new THREE.Vector3(
                (Math.random() - 0.5) * 200,
                Math.random() * 100,
                (Math.random() - 0.5) * 200
            ));

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: Math.random() > 0.5 ? 0x5B8CFF : 0xC15CFF,
                transparent: true,
                opacity: 0.2, // Reduced opacity
                blending: THREE.AdditiveBlending
            });

            const line = new THREE.Line(geometry, material);
            scene.add(line);
            energyBeams.push(line);
        }
    }

    createHolographicUI() {
        // Create floating holographic panels
        const panelCount = 6; // Reduced from 10
        
        for (let i = 0; i < panelCount; i++) {
            const geometry = new THREE.PlaneGeometry(20, 15);
            const material = new THREE.MeshStandardMaterial({
                color: 0x5B8CFF,
                emissive: 0x5B8CFF,
                emissiveIntensity: 0.3, // Reduced
                transparent: true,
                opacity: 0.15, // Reduced
                side: THREE.DoubleSide,
                wireframe: true
            });

            const panel = new THREE.Mesh(geometry, material);
            panel.position.set(
                (Math.random() - 0.5) * 150,
                Math.random() * 80 + 20,
                (Math.random() - 0.5) * 150
            );
            panel.rotation.y = Math.random() * Math.PI;
            
            panel.userData.rotationSpeed = (Math.random() - 0.5) * 0.005; // Slower
            panel.userData.floatSpeed = Math.random() * 0.01; // Slower
            panel.userData.floatOffset = Math.random() * Math.PI * 2;

            scene.add(panel);
            holographicElements.push(panel);
        }
    }

    createPortalEffects() {
        // Create portal ring effect
        const ringGeometry = new THREE.TorusGeometry(30, 2, 16, 100);
        const ringMaterial = new THREE.MeshStandardMaterial({
            color: 0xC15CFF,
            emissive: 0xC15CFF,
            emissiveIntensity: 0.8, // Reduced
            transparent: true,
            opacity: 0.5 // Reduced
        });

        portalEffect = new THREE.Mesh(ringGeometry, ringMaterial);
        portalEffect.position.set(0, 40, -50);
        portalEffect.rotation.x = Math.PI / 2;
        scene.add(portalEffect);

        // Add portal particles (reduced)
        const particleCount = 200; // Reduced from 500
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 30 + Math.random() * 10;
            particlePositions[i] = Math.cos(angle) * radius;
            particlePositions[i + 1] = (Math.random() - 0.5) * 20;
            particlePositions[i + 2] = Math.sin(angle) * radius;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0xC15CFF,
            size: 0.8,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        particles.position.copy(portalEffect.position);
        scene.add(particles);

        portalEffect.userData.particles = particles;
    }

    setupEventListeners() {
        let mouse3D = new THREE.Vector2();
        let targetMouseX = 0;
        let targetMouseY = 0;
        let currentMouseX = 0;
        let currentMouseY = 0;
        let targetScrollY = 0;
        let currentScrollY = 0;

        document.addEventListener('mousemove', (e) => {
            targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
            targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;

            // Add to mouse trail
            if (this.mouseTrail) {
                this.mouseTrail.positions.push({
                    x: targetMouseX * 100,
                    y: targetMouseY * 100,
                    z: 0,
                    life: 1
                });

                if (this.mouseTrail.positions.length > 30) { // Reduced from 50
                    this.mouseTrail.positions.shift();
                }
            }
        });

        // Smooth mouse interpolation in animate loop
        this.updateMousePosition = () => {
            currentMouseX += (targetMouseX - currentMouseX) * 0.1;
            currentMouseY += (targetMouseY - currentMouseY) * 0.1;

            // Update camera position based on smooth mouse
            camera.position.x += (currentMouseX * 20 - camera.position.x) * 0.03;
            camera.position.y += (-currentMouseY * 20 + 50 - camera.position.y) * 0.03;
            camera.lookAt(0, 0, 0);
        };

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('scroll', () => {
            targetScrollY = window.pageYOffset;
        });

        // Smooth scroll interpolation in animate loop
        this.updateScrollPosition = () => {
            currentScrollY += (targetScrollY - currentScrollY) * 0.1;
            camera.position.z = 100 - currentScrollY * 0.1;
            
            if (neonGrid) {
                neonGrid.grid.position.y = -20 - currentScrollY * 0.05;
                neonGrid.plane.position.y = -20 - currentScrollY * 0.05;
            }
        };
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Update smooth mouse and scroll
        if (this.updateMousePosition) this.updateMousePosition();
        if (this.updateScrollPosition) this.updateScrollPosition();

        // Animate neon grid (slower)
        if (neonGrid) {
            neonGrid.grid.position.z = (time * 5) % 20; // Slower
        }

        // Animate energy beams (slower)
        energyBeams.forEach((beam, i) => {
            beam.rotation.z += 0.0005; // Slower
            beam.material.opacity = 0.15 + Math.sin(time + i) * 0.05; // Reduced
        });

        // Animate holographic panels (slower)
        holographicElements.forEach(panel => {
            panel.rotation.y += panel.userData.rotationSpeed;
            panel.position.y += Math.sin(time * panel.userData.floatSpeed + panel.userData.floatOffset) * 0.05;
        });

        // Animate portal (slower)
        if (portalEffect) {
            portalEffect.rotation.z += 0.005; // Slower
            portalEffect.scale.set(
                1 + Math.sin(time * 1.5) * 0.05, // Reduced
                1 + Math.sin(time * 1.5) * 0.05,
                1
            );

            if (portalEffect.userData.particles) {
                portalEffect.userData.particles.rotation.z -= 0.01; // Slower
            }
        }

        // Update mouse trail
        if (this.mouseTrail && this.mouseTrail.positions.length > 0) {
            const positions = this.mouseTrail.geometry.attributes.position.array;
            
            this.mouseTrail.positions.forEach((pos, i) => {
                positions[i * 3] = pos.x;
                positions[i * 3 + 1] = pos.y;
                positions[i * 3 + 2] = pos.z;
                
                pos.life -= 0.03; // Faster fade
            });

            this.mouseTrail.positions = this.mouseTrail.positions.filter(p => p.life > 0);
            this.mouseTrail.geometry.attributes.position.needsUpdate = true;
        }

        renderer.render(scene, camera);
    }
}

// Initialize Ultimate 3D
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Ultimate3D();
    });
} else {
    new Ultimate3D();
}

console.log('🎮 ULTIMATE 3D SYSTEM LOADED!');
