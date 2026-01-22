// ADVANCED SHADER EFFECTS
// Chromatic aberration, bloom, and distortion effects

class ShaderEffects {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.composer = null;
        this.effects = {};
        this.isActive = true;
        
        if (typeof THREE !== 'undefined') {
            this.init();
        }
    }

    init() {
        this.setupScene();
        this.createShaderMaterial();
        this.setupPostProcessing();
        this.createInteractiveElements();
        this.animate();
        
        console.log('🌈 Advanced Shader Effects Loaded!');
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const canvas = this.renderer.domElement;
        canvas.id = 'shader-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.7;
            mix-blend-mode: screen;
        `;

        document.body.insertBefore(canvas, document.body.firstChild);
    }

    createShaderMaterial() {
        // Vertex shader
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        // Fragment shader with multiple effects
        const fragmentShader = `
            uniform float time;
            uniform vec2 mouse;
            uniform vec2 resolution;
            varying vec2 vUv;

            // Noise function
            float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            // Chromatic aberration
            vec3 chromaticAberration(vec2 uv, float amount) {
                vec2 offset = amount * (uv - 0.5);
                float r = sin(time * 0.5 + uv.x * 10.0) * 0.5 + 0.5;
                float g = sin(time * 0.7 + uv.y * 10.0) * 0.5 + 0.5;
                float b = sin(time * 0.9 + (uv.x + uv.y) * 5.0) * 0.5 + 0.5;
                
                return vec3(r, g, b) * (1.0 - length(offset));
            }

            // Distortion effect
            vec2 distort(vec2 uv, float strength) {
                vec2 center = vec2(0.5);
                vec2 offset = uv - center;
                float dist = length(offset);
                
                float distortion = sin(dist * 20.0 - time * 3.0) * strength;
                return uv + normalize(offset) * distortion;
            }

            // Glow effect
            float glow(vec2 uv, vec2 pos, float radius, float intensity) {
                float dist = distance(uv, pos);
                return intensity / (1.0 + dist * dist / (radius * radius));
            }

            void main() {
                vec2 uv = vUv;
                
                // Mouse influence
                vec2 mouseNorm = mouse / resolution;
                float mouseInfluence = 1.0 - distance(uv, mouseNorm);
                
                // Apply distortion
                uv = distort(uv, 0.01 * mouseInfluence);
                
                // Chromatic aberration
                vec3 color = chromaticAberration(uv, 0.02 * mouseInfluence);
                
                // Add glows at corners
                color += vec3(0.2, 0.4, 1.0) * glow(uv, vec2(0.1, 0.1), 0.3, 0.5);
                color += vec3(1.0, 0.2, 0.8) * glow(uv, vec2(0.9, 0.9), 0.3, 0.5);
                color += vec3(0.8, 1.0, 0.2) * glow(uv, vec2(0.1, 0.9), 0.3, 0.3);
                color += vec3(0.2, 0.8, 1.0) * glow(uv, vec2(0.9, 0.1), 0.3, 0.3);
                
                // Mouse glow
                color += vec3(0.5, 0.7, 1.0) * glow(uv, mouseNorm, 0.2, 1.0) * mouseInfluence;
                
                // Fade edges
                float vignette = 1.0 - length(uv - 0.5) * 1.5;
                color *= vignette;
                
                // Pulse effect
                color *= 0.8 + 0.2 * sin(time * 2.0);
                
                gl_FragColor = vec4(color, 0.3);
            }
        `;

        // Create shader material
        this.shaderMaterial = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                time: { value: 0 },
                mouse: { value: new THREE.Vector2(0.5, 0.5) },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        // Create plane geometry
        const geometry = new THREE.PlaneGeometry(2, 2);
        this.shaderMesh = new THREE.Mesh(geometry, this.shaderMaterial);
        this.scene.add(this.shaderMesh);
    }

    setupPostProcessing() {
        // This would require additional Three.js post-processing libraries
        // For now, we'll use the shader material approach
    }

    createInteractiveElements() {
        // Mouse tracking
        document.addEventListener('mousemove', (e) => {
            if (this.shaderMaterial) {
                this.shaderMaterial.uniforms.mouse.value.set(
                    e.clientX / window.innerWidth,
                    1.0 - e.clientY / window.innerHeight
                );
            }
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            
            if (this.shaderMaterial) {
                this.shaderMaterial.uniforms.resolution.value.set(
                    window.innerWidth, 
                    window.innerHeight
                );
            }
        });

        // Toggle with 'S' key
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 's' && e.ctrlKey) {
                this.toggle();
                e.preventDefault();
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (!this.isActive) return;

        // Update time uniform
        if (this.shaderMaterial) {
            this.shaderMaterial.uniforms.time.value = Date.now() * 0.001;
        }

        this.renderer.render(this.scene, this.camera);
    }

    toggle() {
        this.isActive = !this.isActive;
        const canvas = document.getElementById('shader-canvas');
        if (canvas) {
            canvas.style.display = this.isActive ? 'block' : 'none';
        }

        // Show notification
        const notification = document.createElement('div');
        notification.textContent = `Shader Effects: ${this.isActive ? 'ON' : 'OFF'}`;
        notification.style.cssText = `
            position: fixed;
            top: 60px;
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

// Initialize after Three.js loads
setTimeout(() => {
    if (typeof THREE !== 'undefined') {
        new ShaderEffects();
    }
}, 2000);