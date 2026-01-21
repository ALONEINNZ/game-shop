// ULTRA LIGHTWEIGHT 3D - For laggy devices
// Minimal Three.js with maximum performance

class Lightweight3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.frameCount = 0;
        
        if (typeof THREE !== 'undefined') {
            this.init();
        }
    }

    init() {
        this.setupScene();
        this.createMinimalParticles();
        this.setupEventListeners();
        this.animate();
        
        console.log('🚀 Lightweight 3D Mode Active');
    }

    setupScene() {
        // Minimal scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x0B0F14, 0.002);

        // Simple camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
        this.camera.position.z = 50;

        // Basic renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: false,
            powerPreference: 'low-power'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(1); // Force low pixel ratio
        
        const canvas = this.renderer.domElement;
        canvas.id = 'three-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.3'; // Very subtle
        
        document.body.insertBefore(canvas, document.body.firstChild);

        // Minimal lighting
        const ambientLight = new THREE.AmbientLight(0x5B8CFF, 0.5);
        this.scene.add(ambientLight);
    }

    createMinimalParticles() {
        // Only 20 particles maximum
        const particleCount = 20;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 80;
            positions[i3 + 1] = (Math.random() - 0.5) * 80;
            positions[i3 + 2] = (Math.random() - 0.5) * 80;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 2,
            color: 0x5B8CFF,
            transparent: true,
            opacity: 0.6
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    setupEventListeners() {
        // Throttled mouse movement
        let mouseTimeout;
        document.addEventListener('mousemove', (e) => {
            if (mouseTimeout) return;
            mouseTimeout = setTimeout(() => {
                this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
                mouseTimeout = null;
            }, 50); // Throttle to 20fps
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        // Skip frames for better performance
        this.frameCount++;
        if (this.frameCount % 2 === 0) { // Run at 30fps instead of 60fps
            requestAnimationFrame(() => this.animate());
            return;
        }

        requestAnimationFrame(() => this.animate());

        // Minimal animations
        if (this.particles) {
            this.particles.rotation.y += 0.001;
        }

        // Very subtle camera movement
        this.camera.position.x += (this.mouseX * 2 - this.camera.position.x) * 0.01;
        this.camera.position.y += (-this.mouseY * 2 - this.camera.position.y) * 0.01;

        this.renderer.render(this.scene, this.camera);
    }
}

// Auto-detect if we need lightweight mode
function shouldUseLightweight() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    const isSlowConnection = navigator.connection && navigator.connection.effectiveType && 
                           (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');
    
    return isMobile || isSlowDevice || isSlowConnection;
}

// Initialize based on device capability
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (shouldUseLightweight()) {
            new Lightweight3D();
        }
    });
} else {
    if (shouldUseLightweight()) {
        new Lightweight3D();
    }
}