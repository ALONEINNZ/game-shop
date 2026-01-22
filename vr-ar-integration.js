// VR/AR INTEGRATION SYSTEM - Virtual and Augmented Reality features for immersive modding
console.log('🥽 Loading VR/AR Integration System...');

class VRARIntegrationSystem {
    constructor() {
        this.vrSupported = false;
        this.arSupported = false;
        this.vrSession = null;
        this.arSession = null;
        this.vrMods = new Map();
        this.arMods = new Map();
        this.immersiveExperiences = new Map();
        this.init();
    }

    init() {
        this.detectVRARSupport();
        this.createVRARInterface();
        this.loadVRARMods();
        this.setupImmersiveFeatures();
        this.initializeVRARAPI();
        console.log('✅ VR/AR Integration System initialized');
    }

    detectVRARSupport() {
        // Check for WebXR support
        if ('xr' in navigator) {
            navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                this.vrSupported = supported;
                console.log('🥽 VR Support:', supported);
            });
            
            navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
                this.arSupported = supported;
                console.log('📱 AR Support:', supported);
            });
        }
        
        // Fallback detection
        this.vrSupported = this.vrSupported || !!(window.DeviceOrientationEvent || window.DeviceMotionEvent);
        this.arSupported = this.arSupported || !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    createVRARInterface() {
        // Add VR/AR section to main page
        this.addVRARSection();
        
        // Create VR/AR control panel
        this.createVRARControlPanel();
        
        // Create immersive mod viewer
        this.createImmersiveViewer();
        
        // Add VR/AR navigation
        this.addVRARNav();
    }

    addVRARSection() {
        const blockchainSection = document.getElementById('blockchain');
        if (blockchainSection) {
            const vrArSection = document.createElement('section');
            vrArSection.className = 'section vr-ar-section';
            vrArSection.id = 'vr-ar';
            vrArSection.innerHTML = `
                <div class="container">
                    <div class="section-header fade-in">
                        <h2 class="section-title">
                            <i class="fas fa-vr-cardboard"></i> VR & AR Experiences
                        </h2>
                        <p class="section-subtitle">Immerse yourself in mods like never before with Virtual and Augmented Reality</p>
                    </div>
                    
                    <div class="vr-ar-features">
                        <div class="vr-ar-feature-card vr-card">
                            <div class="feature-icon">
                                <i class="fas fa-vr-cardboard"></i>
                            </div>
                            <h3>Virtual Reality</h3>
                            <p>Experience mods in fully immersive VR environments</p>
                            <div class="feature-status" id="vrStatus">
                                ${this.vrSupported ? 
                                    '<span class="status-supported"><i class="fas fa-check"></i> Supported</span>' :
                                    '<span class="status-unsupported"><i class="fas fa-times"></i> Not Supported</span>'
                                }
                            </div>
                            <button onclick="startVRExperience()" class="btn btn-primary" ${!this.vrSupported ? 'disabled' : ''}>
                                <i class="fas fa-play"></i> Enter VR
                            </button>
                        </div>
                        
                        <div class="vr-ar-feature-card ar-card">
                            <div class="feature-icon">
                                <i class="fas fa-mobile-alt"></i>
                            </div>
                            <h3>Augmented Reality</h3>
                            <p>Preview mods in your real environment with AR</p>
                            <div class="feature-status" id="arStatus">
                                ${this.arSupported ? 
                                    '<span class="status-supported"><i class="fas fa-check"></i> Supported</span>' :
                                    '<span class="status-unsupported"><i class="fas fa-times"></i> Not Supported</span>'
                                }
                            </div>
                            <button onclick="startARExperience()" class="btn btn-primary" ${!this.arSupported ? 'disabled' : ''}>
                                <i class="fas fa-camera"></i> Start AR
                            </button>
                        </div>
                        
                        <div class="vr-ar-feature-card mixed-card">
                            <div class="feature-icon">
                                <i class="fas fa-cube"></i>
                            </div>
                            <h3>3D Mod Preview</h3>
                            <p>Interactive 3D previews of mods before download</p>
                            <div class="feature-status">
                                <span class="status-supported"><i class="fas fa-check"></i> Available</span>
                            </div>
                            <button onclick="show3DPreviews()" class="btn btn-primary">
                                <i class="fas fa-eye"></i> View 3D
                            </button>
                        </div>
                        
                        <div class="vr-ar-feature-card creator-card">
                            <div class="feature-icon">
                                <i class="fas fa-hammer"></i>
                            </div>
                            <h3>VR Mod Creator</h3>
                            <p>Create and edit mods in virtual reality</p>
                            <div class="feature-status">
                                <span class="status-beta"><i class="fas fa-flask"></i> Beta</span>
                            </div>
                            <button onclick="openVRCreator()" class="btn btn-primary">
                                <i class="fas fa-tools"></i> Create in VR
                            </button>
                        </div>
                    </div>
                    
                    <div class="immersive-showcase">
                        <h3>Immersive Mod Experiences</h3>
                        <div class="immersive-grid" id="immersiveGrid">
                            <!-- Immersive experiences will be loaded here -->
                        </div>
                    </div>
                    
                    <div class="vr-ar-stats">
                        <div class="vr-ar-stat">
                            <div class="stat-value" id="vrModsCount">156</div>
                            <div class="stat-label">VR-Ready Mods</div>
                        </div>
                        <div class="vr-ar-stat">
                            <div class="stat-value" id="arModsCount">89</div>
                            <div class="stat-label">AR-Compatible Mods</div>
                        </div>
                        <div class="vr-ar-stat">
                            <div class="stat-value" id="immersiveUsers">2,847</div>
                            <div class="stat-label">VR/AR Users</div>
                        </div>
                        <div class="vr-ar-stat">
                            <div class="stat-value" id="vrSessions">12,450</div>
                            <div class="stat-label">VR Sessions</div>
                        </div>
                    </div>
                </div>
            `;
            
            blockchainSection.parentNode.insertBefore(vrArSection, blockchainSection.nextSibling);
        }
    }

    createVRARControlPanel() {
        const controlPanel = document.createElement('div');
        controlPanel.id = 'vrArControlPanel';
        controlPanel.className = 'vr-ar-control-panel';
        controlPanel.innerHTML = `
            <div class="control-panel-content">
                <div class="control-panel-header">
                    <h3><i class="fas fa-cog"></i> VR/AR Controls</h3>
                    <button onclick="toggleVRARControlPanel()" class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="control-tabs">
                    <button class="control-tab active" onclick="showControlTab('vr')">
                        <i class="fas fa-vr-cardboard"></i> VR Settings
                    </button>
                    <button class="control-tab" onclick="showControlTab('ar')">
                        <i class="fas fa-mobile-alt"></i> AR Settings
                    </button>
                    <button class="control-tab" onclick="showControlTab('3d')">
                        <i class="fas fa-cube"></i> 3D Settings
                    </button>
                </div>
                
                <div class="control-content">
                    <div id="vrControlTab" class="control-tab-content active">
                        <div class="control-section">
                            <h4>VR Headset</h4>
                            <select id="vrHeadset">
                                <option value="auto">Auto-detect</option>
                                <option value="oculus">Oculus/Meta Quest</option>
                                <option value="vive">HTC Vive</option>
                                <option value="index">Valve Index</option>
                                <option value="pico">Pico VR</option>
                                <option value="cardboard">Google Cardboard</option>
                            </select>
                        </div>
                        
                        <div class="control-section">
                            <h4>Graphics Quality</h4>
                            <select id="vrQuality">
                                <option value="low">Low (Better Performance)</option>
                                <option value="medium" selected>Medium</option>
                                <option value="high">High</option>
                                <option value="ultra">Ultra (Best Quality)</option>
                            </select>
                        </div>
                        
                        <div class="control-section">
                            <h4>Comfort Settings</h4>
                            <div class="control-group">
                                <label>
                                    <input type="checkbox" id="vrComfortMode" checked>
                                    Comfort Mode (Reduces Motion Sickness)
                                </label>
                            </div>
                            <div class="control-group">
                                <label>
                                    <input type="checkbox" id="vrTeleport" checked>
                                    Teleport Movement
                                </label>
                            </div>
                            <div class="control-group">
                                <label>
                                    <input type="checkbox" id="vrSnapTurn">
                                    Snap Turn
                                </label>
                            </div>
                        </div>
                        
                        <div class="control-section">
                            <h4>Hand Tracking</h4>
                            <div class="control-group">
                                <label>
                                    <input type="checkbox" id="vrHandTracking">
                                    Enable Hand Tracking
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div id="arControlTab" class="control-tab-content">
                        <div class="control-section">
                            <h4>AR Device</h4>
                            <select id="arDevice">
                                <option value="phone">Smartphone</option>
                                <option value="tablet">Tablet</option>
                                <option value="hololens">HoloLens</option>
                                <option value="magicleap">Magic Leap</option>
                            </select>
                        </div>
                        
                        <div class="control-section">
                            <h4>Tracking</h4>
                            <div class="control-group">
                                <label>
                                    <input type="checkbox" id="arPlaneTracking" checked>
                                    Plane Tracking
                                </label>
                            </div>
                            <div class="control-group">
                                <label>
                                    <input type="checkbox" id="arImageTracking">
                                    Image Tracking
                                </label>
                            </div>
                            <div class="control-group">
                                <label>
                                    <input type="checkbox" id="arFaceTracking">
                                    Face Tracking
                                </label>
                            </div>
                        </div>
                        
                        <div class="control-section">
                            <h4>Lighting</h4>
                            <div class="control-group">
                                <label>
                                    <input type="checkbox" id="arLightEstimation" checked>
                                    Light Estimation
                                </label>
                            </div>
                            <div class="control-group">
                                <label>
                                    <input type="checkbox" id="arShadows">
                                    Real-time Shadows
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div id="3dControlTab" class="control-tab-content">
                        <div class="control-section">
                            <h4>3D Rendering</h4>
                            <select id="3dRenderer">
                                <option value="webgl">WebGL</option>
                                <option value="webgpu">WebGPU (Experimental)</option>
                            </select>
                        </div>
                        
                        <div class="control-section">
                            <h4>Model Quality</h4>
                            <select id="3dQuality">
                                <option value="low">Low Poly</option>
                                <option value="medium" selected>Medium</option>
                                <option value="high">High Poly</option>
                                <option value="ultra">Ultra Detail</option>
                            </select>
                        </div>
                        
                        <div class="control-section">
                            <h4>Effects</h4>
                            <div class="control-group">
                                <label>
                                    <input type="checkbox" id="3dShadows" checked>
                                    Dynamic Shadows
                                </label>
                            </div>
                            <div class="control-group">
                                <label>
                                    <input type="checkbox" id="3dReflections">
                                    Reflections
                                </label>
                            </div>
                            <div class="control-group">
                                <label>
                                    <input type="checkbox" id="3dParticles">
                                    Particle Effects
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="control-actions">
                    <button onclick="saveVRARSettings()" class="btn btn-primary">
                        <i class="fas fa-save"></i> Save Settings
                    </button>
                    <button onclick="resetVRARSettings()" class="btn btn-outline">
                        <i class="fas fa-undo"></i> Reset to Default
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(controlPanel);
    }

    createImmersiveViewer() {
        const viewer = document.createElement('div');
        viewer.id = 'immersiveViewer';
        viewer.className = 'immersive-viewer modal';
        viewer.innerHTML = `
            <div class="modal-content immersive-modal-content">
                <span class="close" onclick="closeImmersiveViewer()">&times;</span>
                <div class="immersive-viewer-content">
                    <div class="viewer-header">
                        <h2><i class="fas fa-cube"></i> Immersive Mod Viewer</h2>
                        <div class="viewer-controls">
                            <button onclick="toggleVRMode()" class="btn btn-outline" id="vrModeBtn">
                                <i class="fas fa-vr-cardboard"></i> VR Mode
                            </button>
                            <button onclick="toggleARMode()" class="btn btn-outline" id="arModeBtn">
                                <i class="fas fa-mobile-alt"></i> AR Mode
                            </button>
                            <button onclick="toggle3DMode()" class="btn btn-primary" id="3dModeBtn">
                                <i class="fas fa-cube"></i> 3D Mode
                            </button>
                        </div>
                    </div>
                    
                    <div class="viewer-canvas-container">
                        <canvas id="immersiveCanvas" class="viewer-canvas"></canvas>
                        <div class="viewer-overlay" id="viewerOverlay">
                            <div class="viewer-info">
                                <h3 id="viewerModName">Select a mod to preview</h3>
                                <p id="viewerModDescription">Choose from VR-ready, AR-compatible, or 3D preview mods</p>
                            </div>
                            <div class="viewer-instructions" id="viewerInstructions">
                                <div class="instruction-item">
                                    <i class="fas fa-mouse"></i>
                                    <span>Click and drag to rotate</span>
                                </div>
                                <div class="instruction-item">
                                    <i class="fas fa-scroll"></i>
                                    <span>Scroll to zoom</span>
                                </div>
                                <div class="instruction-item">
                                    <i class="fas fa-hand-paper"></i>
                                    <span>Right-click and drag to pan</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="viewer-sidebar">
                        <div class="mod-selector">
                            <h4>Select Mod to Preview</h4>
                            <div class="mod-list" id="previewModList">
                                <!-- Mod list will be loaded here -->
                            </div>
                        </div>
                        
                        <div class="viewer-settings">
                            <h4>Viewer Settings</h4>
                            <div class="setting-group">
                                <label>Environment</label>
                                <select id="viewerEnvironment">
                                    <option value="studio">Studio</option>
                                    <option value="outdoor">Outdoor</option>
                                    <option value="indoor">Indoor</option>
                                    <option value="space">Space</option>
                                </select>
                            </div>
                            <div class="setting-group">
                                <label>Lighting</label>
                                <select id="viewerLighting">
                                    <option value="soft">Soft</option>
                                    <option value="dramatic">Dramatic</option>
                                    <option value="natural">Natural</option>
                                    <option value="neon">Neon</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(viewer);
    }

    addVRARNav() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const vrArNav = document.createElement('div');
            vrArNav.className = 'nav-dropdown';
            vrArNav.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" onclick="toggleVRARDropdown()">
                    VR/AR <i class="fas fa-chevron-down"></i>
                </a>
                <div class="dropdown-menu" id="vrArDropdown">
                    <a href="#vr-ar" onclick="scrollToVRAR()"><i class="fas fa-vr-cardboard"></i> VR/AR Hub</a>
                    <a href="#" onclick="startVRExperience()"><i class="fas fa-play"></i> Enter VR</a>
                    <a href="#" onclick="startARExperience()"><i class="fas fa-camera"></i> Start AR</a>
                    <a href="#" onclick="show3DPreviews()"><i class="fas fa-cube"></i> 3D Previews</a>
                    <a href="#" onclick="openVRCreator()"><i class="fas fa-hammer"></i> VR Creator</a>
                    <a href="#" onclick="toggleVRARControlPanel()"><i class="fas fa-cog"></i> Settings</a>
                </div>
            `;
            navMenu.insertBefore(vrArNav, navMenu.children[7]);
        }
    }

    loadVRARMods() {
        // Load VR-compatible mods
        const vrMods = [
            {
                id: 1,
                name: 'VR Skyrim Overhaul',
                description: 'Complete VR optimization for Skyrim with hand tracking',
                game: 'Skyrim VR',
                type: 'vr',
                image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=300&fit=crop',
                features: ['Hand Tracking', 'Room Scale', 'Haptic Feedback'],
                rating: 4.9,
                downloads: 15420
            },
            {
                id: 2,
                name: 'Cyberpunk VR Experience',
                description: 'Immersive VR mode for Cyberpunk 2077',
                game: 'Cyberpunk 2077',
                type: 'vr',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                features: ['Full Body Tracking', 'Neural Interface', 'Haptic Suits'],
                rating: 4.8,
                downloads: 12890
            }
        ];

        // Load AR-compatible mods
        const arMods = [
            {
                id: 3,
                name: 'Minecraft AR Builder',
                description: 'Build Minecraft structures in your real space',
                game: 'Minecraft',
                type: 'ar',
                image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop',
                features: ['Plane Detection', 'Occlusion', 'Multi-user'],
                rating: 4.7,
                downloads: 8950
            },
            {
                id: 4,
                name: 'GTA AR Vehicle Showcase',
                description: 'Preview GTA vehicles in AR before installing',
                game: 'GTA V',
                type: 'ar',
                image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
                features: ['Real Scale', 'Interactive', 'Photo Mode'],
                rating: 4.6,
                downloads: 6780
            }
        ];

        // Load immersive experiences
        const immersiveExperiences = [
            {
                id: 5,
                name: 'Virtual Mod Workshop',
                description: 'Create and edit mods in a virtual 3D workspace',
                type: 'mixed',
                image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
                features: ['3D Modeling', 'Collaborative', 'Real-time Preview'],
                rating: 4.8,
                users: 2340
            },
            {
                id: 6,
                name: 'AR Mod Installation Guide',
                description: 'Step-by-step AR guides for mod installation',
                type: 'ar',
                image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
                features: ['Interactive Tutorials', 'Error Detection', 'Voice Commands'],
                rating: 4.9,
                users: 5670
            }
        ];

        // Store mods
        [...vrMods, ...arMods].forEach(mod => {
            if (mod.type === 'vr') {
                this.vrMods.set(mod.id, mod);
            } else if (mod.type === 'ar') {
                this.arMods.set(mod.id, mod);
            }
        });

        immersiveExperiences.forEach(exp => {
            this.immersiveExperiences.set(exp.id, exp);
        });

        this.renderImmersiveExperiences();
    }

    renderImmersiveExperiences() {
        const immersiveGrid = document.getElementById('immersiveGrid');
        if (!immersiveGrid) return;

        const allExperiences = [
            ...Array.from(this.vrMods.values()),
            ...Array.from(this.arMods.values()),
            ...Array.from(this.immersiveExperiences.values())
        ];

        const experiencesHTML = allExperiences.map(exp => `
            <div class="immersive-card ${exp.type}" onclick="openImmersiveExperience(${exp.id})">
                <div class="immersive-image">
                    <img src="${exp.image}" alt="${exp.name}">
                    <div class="immersive-type ${exp.type}">
                        ${exp.type === 'vr' ? '<i class="fas fa-vr-cardboard"></i> VR' :
                          exp.type === 'ar' ? '<i class="fas fa-mobile-alt"></i> AR' :
                          '<i class="fas fa-cube"></i> 3D'}
                    </div>
                    ${exp.type === 'vr' || exp.type === 'ar' ? 
                        '<div class="immersive-badge">Immersive</div>' : ''
                    }
                </div>
                <div class="immersive-info">
                    <h4 class="immersive-name">${exp.name}</h4>
                    <p class="immersive-description">${exp.description}</p>
                    ${exp.game ? `<div class="immersive-game">${exp.game}</div>` : ''}
                    <div class="immersive-features">
                        ${exp.features.slice(0, 2).map(feature => 
                            `<span class="immersive-feature">${feature}</span>`
                        ).join('')}
                    </div>
                    <div class="immersive-stats">
                        ${exp.rating ? 
                            `<span><i class="fas fa-star"></i> ${exp.rating}</span>` : ''
                        }
                        ${exp.downloads ? 
                            `<span><i class="fas fa-download"></i> ${exp.downloads.toLocaleString()}</span>` :
                            exp.users ? 
                            `<span><i class="fas fa-users"></i> ${exp.users.toLocaleString()}</span>` : ''
                        }
                    </div>
                </div>
            </div>
        `).join('');

        immersiveGrid.innerHTML = experiencesHTML;
    }

    setupImmersiveFeatures() {
        this.addVRARStyles();
        this.initializeWebXR();
        this.setup3DRenderer();
    }

    initializeVRARAPI() {
        // Mock VR/AR API initialization
        console.log('🔌 Initializing VR/AR APIs...');
        
        this.vrAPI = {
            startSession: () => this.startVRSession(),
            endSession: () => this.endVRSession(),
            getControllers: () => this.getVRControllers()
        };
        
        this.arAPI = {
            startSession: () => this.startARSession(),
            endSession: () => this.endARSession(),
            getPlanes: () => this.getARPlanes()
        };
    }

    initializeWebXR() {
        // Initialize WebXR if available
        if ('xr' in navigator) {
            console.log('🌐 WebXR available');
            this.webXRSupported = true;
        } else {
            console.log('❌ WebXR not available, using fallback');
            this.webXRSupported = false;
        }
    }

    setup3DRenderer() {
        // Initialize 3D renderer for previews
        console.log('🎨 Setting up 3D renderer...');
        
        // This would initialize Three.js or similar 3D library
        this.renderer3D = {
            initialized: true,
            canvas: null,
            scene: null,
            camera: null,
            controls: null
        };
    }

    startVRSession() {
        console.log('🥽 Starting VR session...');
        
        if (this.webXRSupported && navigator.xr) {
            navigator.xr.requestSession('immersive-vr').then(session => {
                this.vrSession = session;
                console.log('✅ VR session started');
                this.updateVRUI(true);
            }).catch(err => {
                console.error('❌ VR session failed:', err);
                this.fallbackVRMode();
            });
        } else {
            this.fallbackVRMode();
        }
    }

    startARSession() {
        console.log('📱 Starting AR session...');
        
        if (this.webXRSupported && navigator.xr) {
            navigator.xr.requestSession('immersive-ar').then(session => {
                this.arSession = session;
                console.log('✅ AR session started');
                this.updateARUI(true);
            }).catch(err => {
                console.error('❌ AR session failed:', err);
                this.fallbackARMode();
            });
        } else {
            this.fallbackARMode();
        }
    }

    fallbackVRMode() {
        console.log('📱 Using VR fallback mode (360° view)');
        // Implement 360° fallback for mobile devices
        this.updateVRUI(true);
    }

    fallbackARMode() {
        console.log('📷 Using AR fallback mode (camera overlay)');
        // Implement camera-based AR fallback
        this.updateARUI(true);
    }

    updateVRUI(active) {
        const vrModeBtn = document.getElementById('vrModeBtn');
        if (vrModeBtn) {
            if (active) {
                vrModeBtn.innerHTML = '<i class="fas fa-stop"></i> Exit VR';
                vrModeBtn.classList.add('active');
            } else {
                vrModeBtn.innerHTML = '<i class="fas fa-vr-cardboard"></i> VR Mode';
                vrModeBtn.classList.remove('active');
            }
        }
    }

    updateARUI(active) {
        const arModeBtn = document.getElementById('arModeBtn');
        if (arModeBtn) {
            if (active) {
                arModeBtn.innerHTML = '<i class="fas fa-stop"></i> Exit AR';
                arModeBtn.classList.add('active');
            } else {
                arModeBtn.innerHTML = '<i class="fas fa-mobile-alt"></i> AR Mode';
                arModeBtn.classList.remove('active');
            }
        }
    }

    addVRARStyles() {
        const styles = `
            <style>
            .vr-ar-section {
                background: linear-gradient(135deg, rgba(138, 43, 226, 0.05), rgba(75, 0, 130, 0.05));
                border-top: 1px solid rgba(138, 43, 226, 0.2);
            }
            
            .vr-ar-features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 2rem;
                margin-bottom: 3rem;
            }
            
            .vr-ar-feature-card {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 2rem;
                text-align: center;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .vr-ar-feature-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #8A2BE2, #4B0082);
            }
            
            .vr-ar-feature-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 25px 50px rgba(138, 43, 226, 0.3);
            }
            
            .vr-ar-feature-card .feature-icon {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(135deg, #8A2BE2, #4B0082);
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                font-size: 2rem;
                color: white;
            }
            
            .vr-card .feature-icon {
                background: linear-gradient(135deg, #FF6B6B, #FF8E53);
            }
            
            .ar-card .feature-icon {
                background: linear-gradient(135deg, #4ECDC4, #44A08D);
            }
            
            .mixed-card .feature-icon {
                background: linear-gradient(135deg, #A8E6CF, #7FCDCD);
            }
            
            .creator-card .feature-icon {
                background: linear-gradient(135deg, #FFD93D, #FF6B6B);
            }
            
            .feature-status {
                margin: 1rem 0;
            }
            
            .status-supported {
                color: #10b981;
                font-weight: 600;
            }
            
            .status-unsupported {
                color: #ef4444;
                font-weight: 600;
            }
            
            .status-beta {
                color: #f59e0b;
                font-weight: 600;
            }
            
            .immersive-showcase h3 {
                font-size: 2rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 2rem;
                text-align: center;
            }
            
            .immersive-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 2rem;
                margin-bottom: 3rem;
            }
            
            .immersive-card {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                overflow: hidden;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .immersive-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            
            .immersive-card.vr {
                border-color: #FF6B6B;
            }
            
            .immersive-card.ar {
                border-color: #4ECDC4;
            }
            
            .immersive-card.mixed {
                border-color: #A8E6CF;
            }
            
            .immersive-image {
                position: relative;
                aspect-ratio: 16/9;
                overflow: hidden;
            }
            
            .immersive-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }
            
            .immersive-card:hover .immersive-image img {
                transform: scale(1.1);
            }
            
            .immersive-type {
                position: absolute;
                top: 10px;
                left: 10px;
                padding: 0.5rem 1rem;
                border-radius: var(--radius-full);
                font-size: 0.9rem;
                font-weight: 600;
                color: white;
            }
            
            .immersive-type.vr {
                background: rgba(255, 107, 107, 0.9);
            }
            
            .immersive-type.ar {
                background: rgba(78, 205, 196, 0.9);
            }
            
            .immersive-type.mixed {
                background: rgba(168, 230, 207, 0.9);
                color: #333;
            }
            
            .immersive-badge {
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(138, 43, 226, 0.9);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: var(--radius-full);
                font-size: 0.8rem;
                font-weight: 600;
            }
            
            .immersive-info {
                padding: 1.5rem;
            }
            
            .immersive-name {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 0.5rem 0;
            }
            
            .immersive-description {
                color: var(--text-secondary);
                margin-bottom: 1rem;
                line-height: 1.5;
            }
            
            .immersive-game {
                color: var(--accent-primary);
                font-weight: 500;
                margin-bottom: 1rem;
            }
            
            .immersive-features {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .immersive-feature {
                background: rgba(138, 43, 226, 0.2);
                color: #8A2BE2;
                padding: 0.25rem 0.75rem;
                border-radius: var(--radius-full);
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .immersive-stats {
                display: flex;
                gap: 1rem;
                font-size: 0.9rem;
                color: var(--text-secondary);
            }
            
            .vr-ar-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
                padding: 2rem;
                background: var(--bg-secondary);
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
            }
            
            .vr-ar-stat {
                text-align: center;
            }
            
            .vr-ar-stat .stat-value {
                font-size: 2.5rem;
                font-weight: 700;
                color: #8A2BE2;
                margin-bottom: 0.5rem;
                display: block;
            }
            
            .vr-ar-stat .stat-label {
                color: var(--text-secondary);
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .vr-ar-control-panel {
                position: fixed;
                top: 0;
                right: -500px;
                width: 500px;
                height: 100vh;
                background: var(--bg-primary);
                border-left: 1px solid var(--border-color);
                z-index: 10005;
                transition: right 0.3s ease;
                overflow-y: auto;
            }
            
            .vr-ar-control-panel.active {
                right: 0;
            }
            
            .control-panel-content {
                padding: 1.5rem;
            }
            
            .control-panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .control-tabs {
                display: flex;
                margin-bottom: 2rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .control-tab {
                flex: 1;
                padding: 1rem;
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.3s ease;
                border-bottom: 2px solid transparent;
            }
            
            .control-tab.active {
                color: var(--accent-primary);
                border-bottom-color: var(--accent-primary);
            }
            
            .control-tab-content {
                display: none;
            }
            
            .control-tab-content.active {
                display: block;
            }
            
            .control-section {
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .control-section:last-child {
                border-bottom: none;
            }
            
            .control-section h4 {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 1rem 0;
            }
            
            .control-section select {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                background: var(--bg-secondary);
                color: var(--text-primary);
            }
            
            .control-group {
                margin-bottom: 0.75rem;
            }
            
            .control-group label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-primary);
                cursor: pointer;
            }
            
            .control-group input[type="checkbox"] {
                width: auto;
            }
            
            .control-actions {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
                padding-top: 1rem;
                border-top: 1px solid var(--border-color);
            }
            
            .immersive-modal-content {
                max-width: 1400px;
                max-height: 90vh;
                overflow: hidden;
            }
            
            .immersive-viewer-content {
                display: flex;
                flex-direction: column;
                height: 80vh;
            }
            
            .viewer-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .viewer-controls {
                display: flex;
                gap: 1rem;
            }
            
            .viewer-controls .btn.active {
                background: var(--accent-primary);
                color: white;
            }
            
            .viewer-canvas-container {
                flex: 1;
                position: relative;
                background: #000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .viewer-canvas {
                width: 100%;
                height: 100%;
                max-width: 800px;
                max-height: 600px;
            }
            
            .viewer-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                text-align: center;
                padding: 2rem;
            }
            
            .viewer-info h3 {
                font-size: 2rem;
                margin-bottom: 1rem;
            }
            
            .viewer-instructions {
                margin-top: 2rem;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .instruction-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                font-size: 1.1rem;
            }
            
            .instruction-item i {
                width: 24px;
                text-align: center;
                color: var(--accent-primary);
            }
            
            .viewer-sidebar {
                width: 300px;
                background: var(--bg-secondary);
                border-left: 1px solid var(--border-color);
                padding: 1.5rem;
                overflow-y: auto;
            }
            
            .mod-selector h4,
            .viewer-settings h4 {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 1rem 0;
            }
            
            .mod-list {
                max-height: 300px;
                overflow-y: auto;
                margin-bottom: 2rem;
            }
            
            .setting-group {
                margin-bottom: 1rem;
            }
            
            .setting-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: var(--text-primary);
            }
            
            .setting-group select {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                background: var(--bg-tertiary);
                color: var(--text-primary);
            }
            
            @media (max-width: 768px) {
                .vr-ar-features {
                    grid-template-columns: 1fr;
                }
                
                .vr-ar-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .immersive-grid {
                    grid-template-columns: 1fr;
                }
                
                .vr-ar-control-panel {
                    width: 100%;
                    right: -100%;
                }
                
                .immersive-viewer-content {
                    flex-direction: column;
                }
                
                .viewer-sidebar {
                    width: 100%;
                    max-height: 200px;
                }
                
                .control-tabs {
                    flex-direction: column;
                }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Global functions for VR/AR features
window.toggleVRARDropdown = function() {
    const dropdown = document.getElementById('vrArDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
};

window.scrollToVRAR = function() {
    const section = document.getElementById('vr-ar');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

window.startVRExperience = function() {
    console.log('🥽 Starting VR experience...');
    if (window.vrArIntegration) {
        window.vrArIntegration.startVRSession();
    }
};

window.startARExperience = function() {
    console.log('📱 Starting AR experience...');
    if (window.vrArIntegration) {
        window.vrArIntegration.startARSession();
    }
};

window.show3DPreviews = function() {
    const viewer = document.getElementById('immersiveViewer');
    if (viewer) {
        viewer.style.display = 'flex';
    }
};

window.closeImmersiveViewer = function() {
    const viewer = document.getElementById('immersiveViewer');
    if (viewer) {
        viewer.style.display = 'none';
    }
};

window.openVRCreator = function() {
    console.log('🛠️ Opening VR creator...');
    // Implementation for VR creator tools
};

window.toggleVRARControlPanel = function() {
    const panel = document.getElementById('vrArControlPanel');
    if (panel) {
        panel.classList.toggle('active');
    }
};

window.showControlTab = function(tabName) {
    // Hide all tabs
    document.querySelectorAll('.control-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.control-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + 'ControlTab');
    const selectedButton = document.querySelector(`[onclick="showControlTab('${tabName}')"]`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedButton) selectedButton.classList.add('active');
};

window.toggleVRMode = function() {
    console.log('🥽 Toggling VR mode...');
    if (window.vrArIntegration) {
        if (window.vrArIntegration.vrSession) {
            window.vrArIntegration.endVRSession();
        } else {
            window.vrArIntegration.startVRSession();
        }
    }
};

window.toggleARMode = function() {
    console.log('📱 Toggling AR mode...');
    if (window.vrArIntegration) {
        if (window.vrArIntegration.arSession) {
            window.vrArIntegration.endARSession();
        } else {
            window.vrArIntegration.startARSession();
        }
    }
};

window.toggle3DMode = function() {
    console.log('🎲 Toggling 3D mode...');
    // Implementation for 3D mode toggle
};

window.openImmersiveExperience = function(expId) {
    console.log('🌟 Opening immersive experience:', expId);
    show3DPreviews();
};

window.saveVRARSettings = function() {
    console.log('💾 Saving VR/AR settings...');
    // Implementation for saving settings
};

window.resetVRARSettings = function() {
    console.log('🔄 Resetting VR/AR settings...');
    // Implementation for resetting settings
};

// Initialize VR/AR Integration System
document.addEventListener('DOMContentLoaded', () => {
    window.vrArIntegration = new VRARIntegrationSystem();
});

console.log('✅ VR/AR Integration System loaded successfully!');