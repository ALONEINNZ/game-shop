// Enhanced 3D Experience for ExusCraft
// Full Three.js integration across the entire website

let scene, camera, renderer;
let particles, particleSystem;
let backgroundMesh;
let mouse = { x: 0, y: 0 };
let spotlight;
let floatingObjects = [];

function initEnhanced3D() {
    if (typeof THREE === 'undefined') {
        console.log('Three.js not loaded');
        return;
    }

    // Create main scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e14, 0.002);

    // Setup camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 50;

    // Setup renderer
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add to page
    const canvas = renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);

    // Create particle system
    createParticles();

    // Create animated background mesh
    createBackgroundMesh();

    // Create floating 3D objects
    createFloatingObjects();

    // Add lighting
    setupLighting();

    // Mouse tracking
    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('scroll', onScroll, false);

    // Start animation
    animate();

    console.log('🎮 Enhanced 3D experience initialized!');
}

function createParticles() {
    const particleCount = 300; // Reduced from 1000 for better performance
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
        new THREE.Color(0x5B8CFF),
        new THREE.Color(0x7C5CFF),
        new THREE.Color(0xC15CFF),
        new THREE.Color(0x06B6D4)
    ];

    for (let i = 0; i < particleCount * 3; i += 3) {
        // Position
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = (Math.random() - 0.5) * 200;
        positions[i + 2] = (Math.random() - 0.5) * 200;

        // Color
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.8, // Slightly larger to compensate for fewer particles
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
}

function createBackgroundMesh() {
    const geometry = new THREE.PlaneGeometry(200, 200, 50, 50);
    const material = new THREE.MeshStandardMaterial({
        color: 0x1a1f2e,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide
    });

    backgroundMesh = new THREE.Mesh(geometry, material);
    backgroundMesh.rotation.x = -Math.PI / 4;
    backgroundMesh.position.z = -50;
    scene.add(backgroundMesh);
}

function createFloatingObjects() {
    // Create various gaming-themed 3D objects
    const shapes = [
        { geometry: new THREE.OctahedronGeometry(2), color: 0x5B8CFF },
        { geometry: new THREE.TetrahedronGeometry(2), color: 0x7C5CFF },
        { geometry: new THREE.IcosahedronGeometry(2), color: 0xC15CFF },
        { geometry: new THREE.TorusGeometry(1.5, 0.5, 16, 100), color: 0x06B6D4 }
    ];

    for (let i = 0; i < 8; i++) { // Reduced from 15 to 8
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const material = new THREE.MeshStandardMaterial({
            color: shape.color,
            metalness: 0.7,
            roughness: 0.3,
            transparent: true,
            opacity: 0.5 // Reduced opacity
        });

        const mesh = new THREE.Mesh(shape.geometry, material);
        
        // Random position
        mesh.position.x = (Math.random() - 0.5) * 100;
        mesh.position.y = (Math.random() - 0.5) * 100;
        mesh.position.z = (Math.random() - 0.5) * 100;

        // Random rotation speed
        mesh.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
        };

        floatingObjects.push(mesh);
        scene.add(mesh);
    }
}

function setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Spotlight that follows mouse
    spotlight = new THREE.SpotLight(0x5B8CFF, 1);
    spotlight.position.set(0, 0, 50);
    spotlight.angle = Math.PI / 6;
    spotlight.penumbra = 0.5;
    spotlight.decay = 2;
    spotlight.distance = 200;
    scene.add(spotlight);

    // Point lights for extra glow
    const pointLight1 = new THREE.PointLight(0x7C5CFF, 0.5, 100);
    pointLight1.position.set(-30, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xC15CFF, 0.5, 100);
    pointLight2.position.set(30, -20, 20);
    scene.add(pointLight2);
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onScroll() {
    const scrollY = window.pageYOffset;
    camera.position.y = scrollY * 0.01;
}

// Smooth scroll interpolation
let targetScrollY = 0;
let currentScrollY = 0;

function onScroll() {
    targetScrollY = window.pageYOffset;
}

function updateSmoothScroll() {
    // Smooth interpolation for buttery feel
    currentScrollY += (targetScrollY - currentScrollY) * 0.1;
    camera.position.y = currentScrollY * 0.01;
}

function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    // Update smooth scroll
    updateSmoothScroll();

    // Rotate particle system (slower for smoothness)
    if (particleSystem) {
        particleSystem.rotation.y += 0.0003;
        particleSystem.rotation.x += 0.0001;
    }

    // Animate background mesh
    if (backgroundMesh) {
        const positions = backgroundMesh.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            positions[i + 2] = Math.sin(x * 0.1 + time) * 2 + Math.cos(y * 0.1 + time) * 2;
        }
        backgroundMesh.geometry.attributes.position.needsUpdate = true;
        backgroundMesh.rotation.z += 0.0003;
    }

    // Animate floating objects (slower)
    floatingObjects.forEach(obj => {
        obj.rotation.x += obj.userData.rotationSpeed.x;
        obj.rotation.y += obj.userData.rotationSpeed.y;
        obj.rotation.z += obj.userData.rotationSpeed.z;

        // Floating motion
        obj.position.y += Math.sin(time + obj.position.x) * 0.005;
    });

    // Update spotlight to follow mouse (smooth interpolation)
    if (spotlight) {
        spotlight.position.x += (mouse.x * 50 - spotlight.position.x) * 0.05;
        spotlight.position.y += (mouse.y * 50 - spotlight.position.y) * 0.05;
    }

    // Camera sway based on mouse (smooth interpolation)
    camera.position.x += (mouse.x * 5 - camera.position.x) * 0.03;
    camera.position.y += (-mouse.y * 5 + currentScrollY * 0.01 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Initialize when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhanced3D);
} else {
    initEnhanced3D();
}

// Export for use in other scripts
window.enhanced3D = {
    scene,
    camera,
    renderer,
    addObject: (obj) => scene.add(obj),
    removeObject: (obj) => scene.remove(obj)
};
