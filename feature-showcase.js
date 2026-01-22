// FEATURE SHOWCASE & DEMO SYSTEM
// Interactive demo to show off all the new advanced features

class FeatureShowcase {
    constructor() {
        this.currentDemo = null;
        this.demoQueue = [];
        this.isRunning = false;
        
        this.init();
    }

    init() {
        this.createShowcaseUI();
        this.setupDemoSequences();
        this.addKeyboardShortcuts();
        
        console.log('🎭 Feature Showcase System Loaded!');
    }

    createShowcaseUI() {
        // Create floating showcase panel
        const showcase = document.createElement('div');
        showcase.id = 'feature-showcase';
        showcase.style.cssText = `
            position: fixed;
            top: 50%;
            right: -350px;
            transform: translateY(-50%);
            width: 320px;
            background: rgba(18, 24, 38, 0.95);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(91, 140, 255, 0.3);
            border-radius: 20px;
            padding: 1.5rem;
            z-index: 99999;
            transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        `;

        showcase.innerHTML = `
            <div class="showcase-header" style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="margin: 0 0 0.5rem 0; color: #E6EAF2; font-size: 1.3rem;">
                    ✨ Feature Demo
                </h3>
                <p style="margin: 0; color: #9AA4BF; font-size: 0.9rem;">
                    Interactive showcase of new features
                </p>
            </div>

            <div class="demo-controls" style="margin-bottom: 1.5rem;">
                <button id="startDemo" class="demo-btn primary" style="width: 100%; margin-bottom: 0.5rem;">
                    🎬 Start Full Demo
                </button>
                <button id="stopDemo" class="demo-btn secondary" style="width: 100%;" disabled>
                    ⏹️ Stop Demo
                </button>
            </div>

            <div class="feature-list">
                <h4 style="margin: 0 0 1rem 0; color: #E6EAF2; font-size: 1rem;">Individual Features:</h4>
                
                <button class="feature-btn" data-feature="cursor">
                    🎯 Interactive Cursor
                    <small>Particle trails & click effects</small>
                </button>
                
                <button class="feature-btn" data-feature="shaders">
                    🌈 Shader Effects
                    <small>WebGL distortion & chromatic aberration</small>
                </button>
                
                <button class="feature-btn" data-feature="interactions">
                    ✨ Micro-Interactions
                    <small>Button morphing & 3D card tilts</small>
                </button>
                
                <button class="feature-btn" data-feature="themes">
                    🌙 Advanced Themes
                    <small>4 beautiful color schemes</small>
                </button>
                
                <button class="feature-btn" data-feature="ai">
                    🤖 AI Recommendations
                    <small>Smart mod suggestions</small>
                </button>
                
                <button class="feature-btn" data-feature="voice">
                    🎤 Voice Control
                    <small>Speech recognition commands</small>
                </button>
                
                <button class="feature-btn" data-feature="notifications">
                    🔔 Notifications
                    <small>Real-time toast messages</small>
                </button>
            </div>

            <div class="showcase-footer" style="margin-top: 1.5rem; text-align: center;">
                <small style="color: #9AA4BF;">Press F1 to toggle this panel</small>
            </div>
        `;

        document.body.appendChild(showcase);
        this.addShowcaseStyles();
        this.setupShowcaseEvents();

        // Create toggle button
        this.createToggleButton();
    }

    addShowcaseStyles() {
        const style = document.createElement('style');
        style.id = 'showcase-styles';
        style.textContent = `
            .demo-btn {
                padding: 0.75rem 1rem;
                border: none;
                border-radius: 10px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 0.9rem;
            }
            
            .demo-btn.primary {
                background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                color: white;
            }
            
            .demo-btn.primary:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(91, 140, 255, 0.4);
            }
            
            .demo-btn.secondary {
                background: rgba(255, 255, 255, 0.1);
                color: #E6EAF2;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .demo-btn.secondary:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .demo-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .feature-btn {
                width: 100%;
                padding: 1rem;
                margin-bottom: 0.75rem;
                background: rgba(91, 140, 255, 0.1);
                border: 1px solid rgba(91, 140, 255, 0.2);
                border-radius: 12px;
                color: #E6EAF2;
                cursor: pointer;
                transition: all 0.2s ease;
                text-align: left;
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            
            .feature-btn:hover {
                background: rgba(91, 140, 255, 0.2);
                border-color: rgba(91, 140, 255, 0.4);
                transform: translateX(5px);
            }
            
            .feature-btn small {
                color: #9AA4BF;
                font-size: 0.8rem;
                font-weight: 400;
            }
            
            .showcase-toggle {
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                z-index: 99998;
                transition: all 0.3s ease;
                box-shadow: 0 8px 25px rgba(91, 140, 255, 0.4);
            }
            
            .showcase-toggle:hover {
                transform: translateY(-50%) scale(1.1);
                box-shadow: 0 12px 35px rgba(91, 140, 255, 0.6);
            }
            
            .showcase-toggle.active {
                right: 370px;
                background: linear-gradient(135deg, #22C55E, #16A34A);
            }
            
            @keyframes demoHighlight {
                0%, 100% { 
                    box-shadow: 0 0 0 0 rgba(91, 140, 255, 0.7);
                }
                50% { 
                    box-shadow: 0 0 0 10px rgba(91, 140, 255, 0);
                }
            }
            
            .demo-highlight {
                animation: demoHighlight 1.5s ease-in-out infinite;
                position: relative;
                z-index: 1000;
            }
        `;
        document.head.appendChild(style);
    }

    createToggleButton() {
        const toggle = document.createElement('button');
        toggle.className = 'showcase-toggle';
        toggle.innerHTML = '🎭';
        toggle.title = 'Toggle Feature Showcase (F1)';
        
        toggle.addEventListener('click', () => {
            this.toggleShowcase();
        });
        
        document.body.appendChild(toggle);
    }

    setupShowcaseEvents() {
        // Start/Stop demo buttons
        document.getElementById('startDemo').addEventListener('click', () => {
            this.startFullDemo();
        });
        
        document.getElementById('stopDemo').addEventListener('click', () => {
            this.stopDemo();
        });
        
        // Individual feature buttons
        document.querySelectorAll('.feature-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const feature = btn.dataset.feature;
                this.demonstrateFeature(feature);
            });
        });
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // F1 to toggle showcase
            if (e.key === 'F1') {
                e.preventDefault();
                this.toggleShowcase();
            }
            
            // F2 to start demo
            if (e.key === 'F2') {
                e.preventDefault();
                this.startFullDemo();
            }
            
            // Escape to stop demo
            if (e.key === 'Escape' && this.isRunning) {
                this.stopDemo();
            }
        });
    }

    toggleShowcase() {
        const showcase = document.getElementById('feature-showcase');
        const toggle = document.querySelector('.showcase-toggle');
        
        const isVisible = showcase.style.right === '20px';
        
        if (isVisible) {
            showcase.style.right = '-350px';
            toggle.classList.remove('active');
        } else {
            showcase.style.right = '20px';
            toggle.classList.add('active');
        }
    }

    setupDemoSequences() {
        this.demoQueue = [
            {
                name: 'Welcome',
                duration: 3000,
                action: () => {
                    if (window.notificationSystem) {
                        window.notificationSystem.success(
                            '🎬 Feature Demo Started!',
                            'Watch as we showcase all the amazing new features',
                            { duration: 3000 }
                        );
                    }
                }
            },
            {
                name: 'Interactive Cursor',
                duration: 5000,
                action: () => {
                    this.demonstrateCursor();
                }
            },
            {
                name: 'Shader Effects',
                duration: 4000,
                action: () => {
                    this.demonstrateShaders();
                }
            },
            {
                name: 'Micro-Interactions',
                duration: 6000,
                action: () => {
                    this.demonstrateInteractions();
                }
            },
            {
                name: 'Theme System',
                duration: 8000,
                action: () => {
                    this.demonstrateThemes();
                }
            },
            {
                name: 'AI Recommendations',
                duration: 4000,
                action: () => {
                    this.demonstrateAI();
                }
            },
            {
                name: 'Voice Control',
                duration: 5000,
                action: () => {
                    this.demonstrateVoice();
                }
            },
            {
                name: 'Notifications',
                duration: 4000,
                action: () => {
                    this.demonstrateNotifications();
                }
            },
            {
                name: 'Demo Complete',
                duration: 3000,
                action: () => {
                    if (window.notificationSystem) {
                        window.notificationSystem.success(
                            '🎉 Demo Complete!',
                            'All features have been showcased. Try them yourself!',
                            { 
                                duration: 5000,
                                actions: [
                                    {
                                        text: 'Explore More',
                                        action: () => this.toggleShowcase()
                                    }
                                ]
                            }
                        );
                    }
                    this.isRunning = false;
                    this.updateDemoButtons();
                }
            }
        ];
    }

    startFullDemo() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.currentDemo = 0;
        this.updateDemoButtons();
        
        this.runNextDemo();
    }

    runNextDemo() {
        if (!this.isRunning || this.currentDemo >= this.demoQueue.length) {
            this.stopDemo();
            return;
        }
        
        const demo = this.demoQueue[this.currentDemo];
        
        // Show current demo name
        if (window.notificationSystem) {
            window.notificationSystem.info(
                `🎭 Demo: ${demo.name}`,
                `Step ${this.currentDemo + 1} of ${this.demoQueue.length}`,
                { duration: 2000 }
            );
        }
        
        // Run demo action
        demo.action();
        
        // Schedule next demo
        setTimeout(() => {
            this.currentDemo++;
            this.runNextDemo();
        }, demo.duration);
    }

    stopDemo() {
        this.isRunning = false;
        this.currentDemo = null;
        this.updateDemoButtons();
        
        // Clear any highlights
        document.querySelectorAll('.demo-highlight').forEach(el => {
            el.classList.remove('demo-highlight');
        });
        
        if (window.notificationSystem) {
            window.notificationSystem.warning(
                '⏹️ Demo Stopped',
                'Feature demonstration has been stopped'
            );
        }
    }

    updateDemoButtons() {
        const startBtn = document.getElementById('startDemo');
        const stopBtn = document.getElementById('stopDemo');
        
        if (startBtn && stopBtn) {
            startBtn.disabled = this.isRunning;
            stopBtn.disabled = !this.isRunning;
        }
    }

    demonstrateFeature(feature) {
        switch (feature) {
            case 'cursor':
                this.demonstrateCursor();
                break;
            case 'shaders':
                this.demonstrateShaders();
                break;
            case 'interactions':
                this.demonstrateInteractions();
                break;
            case 'themes':
                this.demonstrateThemes();
                break;
            case 'ai':
                this.demonstrateAI();
                break;
            case 'voice':
                this.demonstrateVoice();
                break;
            case 'notifications':
                this.demonstrateNotifications();
                break;
        }
    }

    demonstrateCursor() {
        if (window.notificationSystem) {
            window.notificationSystem.info(
                '🎯 Interactive Cursor Demo',
                'Move your mouse around to see particle trails. Click anywhere for burst effects!',
                { duration: 4000 }
            );
        }
        
        // Simulate mouse movements and clicks
        this.simulateMouseMovement();
    }

    demonstrateShaders() {
        if (window.notificationSystem) {
            window.notificationSystem.info(
                '🌈 Shader Effects Demo',
                'Watch the background for chromatic aberration and distortion effects',
                { duration: 3000 }
            );
        }
        
        // Ensure shader effects are enabled
        const shaderCanvas = document.getElementById('shader-canvas');
        if (shaderCanvas) {
            shaderCanvas.style.opacity = '1';
        }
    }

    demonstrateInteractions() {
        if (window.notificationSystem) {
            window.notificationSystem.info(
                '✨ Micro-Interactions Demo',
                'Hover over buttons and cards to see magnetic effects and 3D tilting',
                { duration: 4000 }
            );
        }
        
        // Highlight interactive elements
        const buttons = document.querySelectorAll('.btn');
        const cards = document.querySelectorAll('.game-card');
        
        [...buttons, ...cards].slice(0, 3).forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('demo-highlight');
                setTimeout(() => el.classList.remove('demo-highlight'), 2000);
            }, index * 500);
        });
    }

    demonstrateThemes() {
        if (window.notificationSystem) {
            window.notificationSystem.info(
                '🌙 Theme System Demo',
                'Cycling through all 4 available themes',
                { duration: 6000 }
            );
        }
        
        // Cycle through themes
        const themes = ['dark', 'light', 'cyberpunk', 'neon'];
        let currentIndex = 0;
        
        const cycleTheme = () => {
            if (window.darkModeSystem) {
                window.darkModeSystem.applyTheme(themes[currentIndex]);
                currentIndex = (currentIndex + 1) % themes.length;
                
                if (currentIndex < themes.length) {
                    setTimeout(cycleTheme, 1500);
                }
            }
        };
        
        cycleTheme();
    }

    demonstrateAI() {
        if (window.notificationSystem) {
            window.notificationSystem.info(
                '🤖 AI Recommendations Demo',
                'Scroll down to see personalized mod recommendations based on your behavior',
                { duration: 3000 }
            );
        }
        
        // Scroll to AI recommendations section
        const aiSection = document.getElementById('ai-recommendations');
        if (aiSection) {
            setTimeout(() => {
                aiSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                aiSection.classList.add('demo-highlight');
                setTimeout(() => aiSection.classList.remove('demo-highlight'), 3000);
            }, 1000);
        }
    }

    demonstrateVoice() {
        if (window.notificationSystem) {
            window.notificationSystem.info(
                '🎤 Voice Control Demo',
                'Click the microphone button (bottom-left) or press Ctrl+Space to try voice commands like "go home" or "search for graphics"',
                { duration: 4000 }
            );
        }
        
        // Highlight voice button
        const voiceBtn = document.getElementById('voice-control-btn');
        if (voiceBtn) {
            voiceBtn.classList.add('demo-highlight');
            setTimeout(() => voiceBtn.classList.remove('demo-highlight'), 3000);
        }
    }

    demonstrateNotifications() {
        if (window.notificationSystem) {
            // Show different types of notifications
            setTimeout(() => {
                window.notificationSystem.success('Success!', 'This is a success notification');
            }, 500);
            
            setTimeout(() => {
                window.notificationSystem.warning('Warning!', 'This is a warning notification');
            }, 1000);
            
            setTimeout(() => {
                window.notificationSystem.error('Error!', 'This is an error notification');
            }, 1500);
            
            setTimeout(() => {
                window.notificationSystem.info('Info!', 'This is an info notification with actions', {
                    actions: [
                        { text: 'Action 1', action: () => console.log('Action 1 clicked') },
                        { text: 'Action 2', action: () => console.log('Action 2 clicked') }
                    ]
                });
            }, 2000);
        }
    }

    simulateMouseMovement() {
        // Create fake mouse events to show cursor effects
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        
        const moveCount = 20;
        let currentMove = 0;
        
        const simulateMove = () => {
            if (currentMove >= moveCount) return;
            
            x += (Math.random() - 0.5) * 100;
            y += (Math.random() - 0.5) * 100;
            
            // Keep within bounds
            x = Math.max(50, Math.min(window.innerWidth - 50, x));
            y = Math.max(50, Math.min(window.innerHeight - 50, y));
            
            // Dispatch mouse move event
            const moveEvent = new MouseEvent('mousemove', {
                clientX: x,
                clientY: y,
                bubbles: true
            });
            document.dispatchEvent(moveEvent);
            
            // Occasionally click
            if (currentMove % 5 === 0) {
                const clickEvent = new MouseEvent('click', {
                    clientX: x,
                    clientY: y,
                    bubbles: true
                });
                document.dispatchEvent(clickEvent);
            }
            
            currentMove++;
            setTimeout(simulateMove, 200);
        };
        
        simulateMove();
    }
}

// Initialize Feature Showcase
let featureShowcase;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait a bit for other systems to load
        setTimeout(() => {
            featureShowcase = new FeatureShowcase();
        }, 2000);
    });
} else {
    setTimeout(() => {
        featureShowcase = new FeatureShowcase();
    }, 2000);
}

// Make it globally accessible
window.featureShowcase = featureShowcase;