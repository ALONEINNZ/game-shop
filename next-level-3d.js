// NEXT-LEVEL 3D EFFECTS - ExusCraft Advanced
// Interactive particles, shaders, VR/AR support, dynamic backgrounds

class NextLevel3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.composer = null;
        
        // Interactive systems
        this.interactiveParticles = null;
        this.mouseTrail = [];
        this.cursorInfluence = { x: 0, y: 0, z: 0 };
        
        // Shader effects
        this.shaderMaterials = [];
        this.postProcessing = null;
        
        // Dynamic backgrounds
        this.currentGame = 'default';
        this.backgroundSystems = {};
        
        // VR/AR support
        this.vrSupported = false;
        this.arSupported = false;
        
        // Performance
        this.isHighPerformance = this.detectHighPerformance();
        this.frameCount = 0;
        
        if (typeof THREE !== 'undefined') {
            this.init();
        }
    }

    detectHighPerformance() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) return false;
        
        const cores = navigator.hardwareConcurrency || 2;
        const memory = navigator.deviceMemory || 2;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        return !isMobile && cores >= 4 && memory >= 4;
    }

    async init() {
        await this.setupScene();
        await this.createInteractiveParticles();
        await this.setupShaderEffects();
        await this.createDynamicBackgrounds();
        await this.setupVRSupport();
        this.setupEventListeners();
        this.animate();
        
        console.log('🚀 Next-Level 3D System Activated!');
    }

    async setupScene() {
        // Advanced scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x0B0F14, 0.0008);

        // High-performance camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        this.camera.position.set(0, 50, 100);

        // Advanced renderer with post-processing support
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: this.isHighPerformance,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = this.isHighPerformance;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        const canvas = this.renderer.domElement;
        canvas.id = 'next-level-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = this.isHighPerformance ? '0.9' : '0.6';
        
        document.body.insertBefore(canvas, document.body.firstChild);

        // Advanced lighting
        this.setupAdvancedLighting();
        
        // P