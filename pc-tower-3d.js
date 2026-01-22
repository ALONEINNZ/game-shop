// EXUSCRAFT 3D PC TOWER ANIMATION
// Scroll-driven exploded view animation with component labels

class PCTower3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.pcTower = null;
        this.components = {};
        this.scrollProgress = 0;
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        if (!window.THREE || !window.gsap) {
            console.warn('Three.js or GSAP not loaded, retrying...');
            setTimeout(() => this.init(), 1000);
            return;
        }

        this.setupScene();
        this.createPCTower();
        this.setupScrollAnimation();
        this.setupLighting();
        this.animate();
        
        this.isInitialized = true;
        console.log('🖥️ PC Tower 3D Animation Loaded!');
    }

    setupScene() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = null; // Transparent background

        // Create camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 8);

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Add to hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const canvas = this.renderer.domElement;
            canvas.id = 'pc-tower-canvas';
            canvas.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            `;
            heroSection.appendChild(canvas);
        }

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    createPCTower() {
        this.pcTower = new THREE.Group();
        this.pcTower.position.set(2, 0, 0); // Offset to right side

        // Create components
        this.createCase();
        this.createMotherboard();
        this.createGPU();
        this.createRAM();
        this.createStorage();
        this.createCooling();
        this.createPowerSupply();
        this.createModLayer();

        this.scene.add(this.pcTower);
    }

    createCase() {
        // Main case (outer shell)
        const caseGeometry = new THREE.BoxGeometry(2, 3, 1.5);
        const caseMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2a2a2a,
            transparent: true,
            opacity: 0.8
        });
        
        const caseMain = new THREE.Mesh(caseGeometry, caseMaterial);
        
        // Side panels (removable)
        const panelGeometry = new THREE.BoxGeometry(0.05, 3, 1.5);
        const panelMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x404040,
            transparent: true,
            opacity: 0.9
        });
        
        const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        leftPanel.position.set(-1, 0, 0);
        
        const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        rightPanel.position.set(1, 0, 0);

        // Front panel
        const frontPanelGeometry = new THREE.BoxGeometry(2, 3, 0.05);
        const frontPanel = new THREE.Mesh(frontPanelGeometry, panelMaterial);
        frontPanel.position.set(0, 0, 0.75);

        this.components.case = {
            main: caseMain,
            leftPanel: leftPanel,
            rightPanel: rightPanel,
            frontPanel: frontPanel,
            originalPositions: {
                leftPanel: leftPanel.position.clone(),
                rightPanel: rightPanel.position.clone(),
                frontPanel: frontPanel.position.clone()
            }
        };

        this.pcTower.add(caseMain);
        this.pcTower.add(leftPanel);
        this.pcTower.add(rightPanel);
        this.pcTower.add(frontPanel);
    }

    createMotherboard() {
        const mbGeometry = new THREE.BoxGeometry(1.5, 0.1, 1.2);
        const mbMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0a4d0a,
            emissive: 0x002200
        });
        
        const motherboard = new THREE.Mesh(mbGeometry, mbMaterial);
        motherboard.position.set(0, -0.5, 0);

        // CPU (glowing square)
        const cpuGeometry = new THREE.BoxGeometry(0.3, 0.15, 0.3);
        const cpuMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x4a90e2,
            emissive: 0x1a3a5a
        });
        
        const cpu = new THREE.Mesh(cpuGeometry, cpuMaterial);
        cpu.position.set(0, 0.1, 0);
        motherboard.add(cpu);

        this.components.motherboard = {
            main: motherboard,
            cpu: cpu,
            originalPosition: motherboard.position.clone()
        };

        this.pcTower.add(motherboard);
    }

    createGPU() {
        const gpuGeometry = new THREE.BoxGeometry(1.8, 0.3, 0.8);
        const gpuMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            emissive: 0x4a90e2
        });
        
        const gpu = new THREE.Mesh(gpuGeometry, gpuMaterial);
        gpu.position.set(0, 0, 0);

        // GPU fans (glowing circles)
        const fanGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 8);
        const fanMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x666666,
            emissive: 0x0066ff
        });
        
        const fan1 = new THREE.Mesh(fanGeometry, fanMaterial);
        fan1.position.set(-0.4, 0, 0.4);
        fan1.rotation.x = Math.PI / 2;
        
        const fan2 = new THREE.Mesh(fanGeometry, fanMaterial);
        fan2.position.set(0.4, 0, 0.4);
        fan2.rotation.x = Math.PI / 2;

        gpu.add(fan1);
        gpu.add(fan2);

        this.components.gpu = {
            main: gpu,
            fans: [fan1, fan2],
            originalPosition: gpu.position.clone()
        };

        this.pcTower.add(gpu);
    }

    createRAM() {
        const ramSticks = [];
        const ramGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.05);
        const ramMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2d5a2d,
            emissive: 0x0a2d0a
        });

        for (let i = 0; i < 4; i++) {
            const ram = new THREE.Mesh(ramGeometry, ramMaterial);
            ram.position.set(-0.6 + i * 0.15, 0.5, -0.3);
            ramSticks.push(ram);
            this.pcTower.add(ram);
        }

        this.components.ram = {
            sticks: ramSticks,
            originalPositions: ramSticks.map(stick => stick.position.clone())
        };
    }

    createStorage() {
        // SSD
        const ssdGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.4);
        const ssdMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a1a,
            emissive: 0x0a0a2d
        });
        
        const ssd = new THREE.Mesh(ssdGeometry, ssdMaterial);
        ssd.position.set(0.5, -1, 0.3);

        // HDD
        const hddGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.8);
        const hddMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2a2a2a,
            emissive: 0x1a1a0a
        });
        
        const hdd = new THREE.Mesh(hddGeometry, hddMaterial);
        hdd.position.set(-0.5, -1, 0.3);

        this.components.storage = {
            ssd: ssd,
            hdd: hdd,
            originalPositions: {
                ssd: ssd.position.clone(),
                hdd: hdd.position.clone()
            }
        };

        this.pcTower.add(ssd);
        this.pcTower.add(hdd);
    }

    createCooling() {
        // CPU Cooler
        const coolerGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 12);
        const coolerMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x666666,
            emissive: 0x001a4d
        });
        
        const cooler = new THREE.Mesh(coolerGeometry, coolerMaterial);
        cooler.position.set(0, -0.2, 0);

        // Case fans
        const fanGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 8);
        const fanMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            emissive: 0x4d1a00
        });
        
        const frontFan = new THREE.Mesh(fanGeometry, fanMaterial);
        frontFan.position.set(-0.8, 0.5, 0.7);
        frontFan.rotation.z = Math.PI / 2;
        
        const rearFan = new THREE.Mesh(fanGeometry, fanMaterial);
        rearFan.position.set(0.8, 0.5, -0.7);
        rearFan.rotation.z = Math.PI / 2;

        this.components.cooling = {
            cooler: cooler,
            frontFan: frontFan,
            rearFan: rearFan,
            originalPositions: {
                cooler: cooler.position.clone(),
                frontFan: frontFan.position.clone(),
                rearFan: rearFan.position.clone()
            }
        };

        this.pcTower.add(cooler);
        this.pcTower.add(frontFan);
        this.pcTower.add(rearFan);
    }

    createPowerSupply() {
        const psuGeometry = new THREE.BoxGeometry(1, 0.6, 0.8);
        const psuMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a1a,
            emissive: 0x4d4d00
        });
        
        const psu = new THREE.Mesh(psuGeometry, psuMaterial);
        psu.position.set(0, -1.2, -0.3);

        this.components.psu = {
            main: psu,
            originalPosition: psu.position.clone()
        };

        this.pcTower.add(psu);
    }

    createModLayer() {
        // Abstract glowing layer representing mods
        const modGeometry = new THREE.TorusGeometry(1.5, 0.1, 8, 16);
        const modMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x5B8CFF,
            emissive: 0x5B8CFF,
            transparent: true,
            opacity: 0.6
        });
        
        const modLayer1 = new THREE.Mesh(modGeometry, modMaterial);
        modLayer1.position.set(0, 0, 0);
        modLayer1.rotation.x = Math.PI / 2;

        const modLayer2 = new THREE.Mesh(modGeometry, modMaterial);
        modLayer2.position.set(0, 0, 0);
        modLayer2.rotation.z = Math.PI / 3;

        const modLayer3 = new THREE.Mesh(modGeometry, modMaterial);
        modLayer3.position.set(0, 0, 0);
        modLayer3.rotation.y = Math.PI / 4;

        this.components.modLayers = {
            layer1: modLayer1,
            layer2: modLayer2,
            layer3: modLayer3,
            originalPositions: {
                layer1: modLayer1.position.clone(),
                layer2: modLayer2.position.clone(),
                layer3: modLayer3.position.clone()
            }
        };

        // Initially hidden
        modLayer1.visible = false;
        modLayer2.visible = false;
        modLayer3.visible = false;

        this.pcTower.add(modLayer1);
        this.pcTower.add(modLayer2);
        this.pcTower.add(modLayer3);
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Accent lights for components
        const blueLight = new THREE.PointLight(0x5B8CFF, 0.8, 10);
        blueLight.position.set(2, 0, 2);
        this.scene.add(blueLight);

        const purpleLight = new THREE.PointLight(0xC15CFF, 0.6, 8);
        purpleLight.position.set(-2, 2, 0);
        this.scene.add(purpleLight);
    }

    setupScrollAnimation() {
        if (!window.gsap || !window.ScrollTrigger) {
            console.warn('GSAP ScrollTrigger not available');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Main scroll trigger for the entire animation
        ScrollTrigger.create({
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
                this.scrollProgress = self.progress;
                this.updateAnimation();
            }
        });
    }

    updateAnimation() {
        if (!this.pcTower) return;

        const progress = this.scrollProgress;

        // Phase 1: Rotation (0-0.2)
        if (progress <= 0.2) {
            const rotationProgress = progress / 0.2;
            this.pcTower.rotation.y = rotationProgress * Math.PI * 2;
        }

        // Phase 2: Panel removal (0.2-0.4)
        else if (progress <= 0.4) {
            const panelProgress = (progress - 0.2) / 0.2;
            
            if (this.components.case) {
                this.components.case.leftPanel.position.x = 
                    this.components.case.originalPositions.leftPanel.x - panelProgress * 2;
                this.components.case.rightPanel.position.x = 
                    this.components.case.originalPositions.rightPanel.x + panelProgress * 2;
                this.components.case.frontPanel.position.z = 
                    this.components.case.originalPositions.frontPanel.z + panelProgress * 2;
            }
        }

        // Phase 3: Component explosion (0.4-0.8)
        else if (progress <= 0.8) {
            const explosionProgress = (progress - 0.4) / 0.4;
            
            // GPU slides out
            if (this.components.gpu) {
                this.components.gpu.main.position.z = explosionProgress * 2;
            }

            // RAM spreads out
            if (this.components.ram) {
                this.components.ram.sticks.forEach((stick, i) => {
                    stick.position.x = this.components.ram.originalPositions[i].x + 
                                     (i - 1.5) * explosionProgress * 0.5;
                    stick.position.y = this.components.ram.originalPositions[i].y + 
                                     explosionProgress * 0.5;
                });
            }

            // Storage separates
            if (this.components.storage) {
                this.components.storage.ssd.position.x = 
                    this.components.storage.originalPositions.ssd.x + explosionProgress * 1.5;
                this.components.storage.hdd.position.x = 
                    this.components.storage.originalPositions.hdd.x - explosionProgress * 1.5;
            }

            // Cooling system moves
            if (this.components.cooling) {
                this.components.cooling.cooler.position.y = 
                    this.components.cooling.originalPositions.cooler.y + explosionProgress * 1;
                this.components.cooling.frontFan.position.z = 
                    this.components.cooling.originalPositions.frontFan.z + explosionProgress * 1.5;
                this.components.cooling.rearFan.position.z = 
                    this.components.cooling.originalPositions.rearFan.z - explosionProgress * 1.5;
            }

            // PSU drops down
            if (this.components.psu) {
                this.components.psu.main.position.y = 
                    this.components.psu.originalPosition.y - explosionProgress * 1;
            }

            // Show mod layers
            if (this.components.modLayers && explosionProgress > 0.5) {
                const modProgress = (explosionProgress - 0.5) / 0.5;
                this.components.modLayers.layer1.visible = true;
                this.components.modLayers.layer2.visible = true;
                this.components.modLayers.layer3.visible = true;
                
                this.components.modLayers.layer1.material.opacity = modProgress * 0.6;
                this.components.modLayers.layer2.material.opacity = modProgress * 0.4;
                this.components.modLayers.layer3.material.opacity = modProgress * 0.5;
            }
        }

        // Phase 4: Reassembly (0.8-1.0)
        else {
            const reassemblyProgress = (progress - 0.8) / 0.2;
            const reverseProgress = 1 - reassemblyProgress;
            
            // Move everything back to original positions
            this.resetToOriginalPositions(reverseProgress);
        }

        // Continuous fan rotation
        if (this.components.gpu && this.components.gpu.fans) {
            this.components.gpu.fans.forEach(fan => {
                fan.rotation.z += 0.1;
            });
        }

        if (this.components.cooling) {
            if (this.components.cooling.frontFan) {
                this.components.cooling.frontFan.rotation.x += 0.15;
            }
            if (this.components.cooling.rearFan) {
                this.components.cooling.rearFan.rotation.x += 0.12;
            }
        }

        // Rotate mod layers
        if (this.components.modLayers) {
            this.components.modLayers.layer1.rotation.z += 0.01;
            this.components.modLayers.layer2.rotation.x += 0.008;
            this.components.modLayers.layer3.rotation.y += 0.012;
        }
    }

    resetToOriginalPositions(factor) {
        // Reset all components to original positions with factor
        if (this.components.case) {
            this.components.case.leftPanel.position.x = 
                this.components.case.originalPositions.leftPanel.x - (1 - factor) * 2;
            this.components.case.rightPanel.position.x = 
                this.components.case.originalPositions.rightPanel.x + (1 - factor) * 2;
            this.components.case.frontPanel.position.z = 
                this.components.case.originalPositions.frontPanel.z + (1 - factor) * 2;
        }

        if (this.components.gpu) {
            this.components.gpu.main.position.z = (1 - factor) * 2;
        }

        if (this.components.ram) {
            this.components.ram.sticks.forEach((stick, i) => {
                stick.position.x = this.components.ram.originalPositions[i].x + 
                                 (i - 1.5) * (1 - factor) * 0.5;
                stick.position.y = this.components.ram.originalPositions[i].y + 
                                 (1 - factor) * 0.5;
            });
        }

        // Continue for other components...
        if (this.components.modLayers) {
            this.components.modLayers.layer1.material.opacity = (1 - factor) * 0.6;
            this.components.modLayers.layer2.material.opacity = (1 - factor) * 0.4;
            this.components.modLayers.layer3.material.opacity = (1 - factor) * 0.5;
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
            const canvas = document.getElementById('pc-tower-canvas');
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
        }
    }
}

// Initialize when ready
let pcTower3D;
function initPCTower3D() {
    if (window.THREE && window.gsap && window.ScrollTrigger) {
        pcTower3D = new PCTower3D();
    } else {
        setTimeout(initPCTower3D, 1000);
    }
}

// Start initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPCTower3D);
} else {
    initPCTower3D();
}

// Make globally available
window.pcTower3D = pcTower3D;