// 3D Scroll Animation for ExusCraft
// Creates a rotating cube that responds to scroll

let scene, camera, renderer, cube;
let scrollProgress = 0;

function init3DScroll() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.log('Three.js not loaded, skipping 3D animation');
        return;
    }

    const container = document.getElementById('hero-3d-container');
    if (!container) {
        console.log('3D container not found');
        return;
    }

    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create a Minecraft-style cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    
    // Create materials for each face (Minecraft block style)
    const materials = [
        new THREE.MeshStandardMaterial({ color: 0x5B8CFF, metalness: 0.3, roughness: 0.7 }), // Right
        new THREE.MeshStandardMaterial({ color: 0x7C5CFF, metalness: 0.3, roughness: 0.7 }), // Left
        new THREE.MeshStandardMaterial({ color: 0xC15CFF, metalness: 0.3, roughness: 0.7 }), // Top
        new THREE.MeshStandardMaterial({ color: 0x4A6FCC, metalness: 0.3, roughness: 0.7 }), // Bottom
        new THREE.MeshStandardMaterial({ color: 0x8B6FFF, metalness: 0.3, roughness: 0.7 }), // Front
        new THREE.MeshStandardMaterial({ color: 0x6B4FDD, metalness: 0.3, roughness: 0.7 })  // Back
    ];
    
    cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add point light for extra glow
    const pointLight = new THREE.PointLight(0x5B8CFF, 1, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Start animation loop
    animate();

    // Listen to scroll
    window.addEventListener('scroll', onScroll, false);
}

function onWindowResize() {
    const container = document.getElementById('hero-3d-container');
    if (!container) return;

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function onScroll() {
    // Calculate scroll progress (0 to 1)
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const heroHeight = heroSection.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollProgress = Math.min(scrollTop / heroHeight, 1);
}

function animate() {
    requestAnimationFrame(animate);

    if (cube) {
        // Rotate based on scroll progress
        cube.rotation.x = scrollProgress * Math.PI * 2;
        cube.rotation.y = scrollProgress * Math.PI * 2;
        
        // Add subtle continuous rotation
        cube.rotation.z += 0.001;

        // Scale based on scroll (zoom effect)
        const scale = 1 + scrollProgress * 0.5;
        cube.scale.set(scale, scale, scale);

        // Move camera based on scroll
        camera.position.z = 5 - scrollProgress * 2;
    }

    renderer.render(scene, camera);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DScroll);
} else {
    init3DScroll();
}
