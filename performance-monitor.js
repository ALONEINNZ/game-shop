// PERFORMANCE MONITOR
// Real-time performance tracking and optimization

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            memory: 0,
            features: {
                cursor: { active: false, impact: 0 },
                shaders: { active: false, impact: 0 },
                interactions: { active: false, impact: 0 },
                ai: { active: false, impact: 0 }
            }
        };
        
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.isMonitoring = false;
        
        this.init();
    }

    init() {
        this.createMonitorUI();
        this.startMonitoring();
        this.setupOptimizations();
        
        console.log('📊 Performance Monitor Loaded!');
    }

    createMonitorUI() {
        const monitor = document.createElement('div');
        monitor.id = 'performance-monitor';
        monitor.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            font-size: 0.8rem;
            z-index: 99999;
            min-width: 200px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(91, 140, 255, 0.3);
        `;

        monitor.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <strong>⚡ Performance</strong>
                <button id="perfToggle" style="background: none; border: none; color: white; cursor: pointer; font-size: 1rem;">📊</button>
            </div>
            <div id="perfStats">
                <div>FPS: <span id="fpsValue">--</span></div>
                <div>Memory: <span id="memoryValue">--</span> MB</div>
                <div>Features: <span id="featureCount">0</span>/7 active</div>
                <div style="margin-top: 0.5rem; font-size: 0.7rem; color: #aaa;">
                    <div>🎯 Cursor: <span id="cursorStatus">OFF</span></div>
                    <div>🌈 Shaders: <span id="shaderStatus">OFF</span></div>
                    <div>✨ Interactions: <span id="interactionStatus">ON</span></div>
                    <div>🤖 AI: <span id="aiStatus">ON</span></div>
                </div>
            </div>
        `;

        document.body.appendChild(monitor);

        // Toggle button
        document.getElementById('perfToggle').addEventListener('click', () => {
            this.toggleMonitor();
        });

        // Keyboard shortcut (Ctrl+P)
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'p' && e.ctrlKey) {
                e.preventDefault();
                this.toggleMonitor();
            }
        });
    }

    toggleMonitor() {
        const monitor = document.getElementById('performance-monitor');
        const isVisible = monitor.style.opacity === '1';
        
        if (isVisible) {
            monitor.style.opacity = '0';
            monitor.style.visibility = 'hidden';
            this.isMonitoring = false;
        } else {
            monitor.style.opacity = '1';
            monitor.style.visibility = 'visible';
            this.isMonitoring = true;
            this.startMonitoring();
        }
    }

    startMonitoring() {
        if (!this.isMonitoring) return;

        const updateMetrics = () => {
            if (!this.isMonitoring) return;

            // Calculate FPS
            this.frameCount++;
            const currentTime = performance.now();
            const deltaTime = currentTime - this.lastTime;
            
            if (deltaTime >= 1000) {
                this.metrics.fps = Math.round((this.frameCount * 1000) / deltaTime);
                this.frameCount = 0;
                this.lastTime = currentTime;
            }

            // Get memory usage
            if (performance.memory) {
                this.metrics.memory = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            }

            // Check feature status
            this.updateFeatureStatus();
            
            // Update UI
            this.updateMonitorUI();
            
            requestAnimationFrame(updateMetrics);
        };

        updateMetrics();
    }

    updateFeatureStatus() {
        // Check cursor effects
        const cursorCanvas = document.getElementById('cursor-canvas');
        this.metrics.features.cursor.active = cursorCanvas && cursorCanvas.style.display !== 'none';

        // Check shader effects
        const shaderCanvas = document.getElementById('shader-canvas');
        this.metrics.features.shaders.active = shaderCanvas && shaderCanvas.style.display !== 'none';

        // Interactions are always on
        this.metrics.features.interactions.active = true;

        // AI is always on
        this.metrics.features.ai.active = true;
    }

    updateMonitorUI() {
        const fpsValue = document.getElementById('fpsValue');
        const memoryValue = document.getElementById('memoryValue');
        const featureCount = document.getElementById('featureCount');
        const cursorStatus = document.getElementById('cursorStatus');
        const shaderStatus = document.getElementById('shaderStatus');
        const interactionStatus = document.getElementById('interactionStatus');
        const aiStatus = document.getElementById('aiStatus');

        if (fpsValue) {
            fpsValue.textContent = this.metrics.fps;
            fpsValue.style.color = this.getFPSColor(this.metrics.fps);
        }

        if (memoryValue) {
            memoryValue.textContent = this.metrics.memory;
            memoryValue.style.color = this.getMemoryColor(this.metrics.memory);
        }

        if (featureCount) {
            const activeCount = Object.values(this.metrics.features).filter(f => f.active).length;
            featureCount.textContent = activeCount;
        }

        if (cursorStatus) {
            cursorStatus.textContent = this.metrics.features.cursor.active ? 'ON' : 'OFF';
            cursorStatus.style.color = this.metrics.features.cursor.active ? '#22C55E' : '#EF4444';
        }

        if (shaderStatus) {
            shaderStatus.textContent = this.metrics.features.shaders.active ? 'ON' : 'OFF';
            shaderStatus.style.color = this.metrics.features.shaders.active ? '#22C55E' : '#EF4444';
        }

        if (interactionStatus) {
            interactionStatus.textContent = 'ON';
            interactionStatus.style.color = '#22C55E';
        }

        if (aiStatus) {
            aiStatus.textContent = 'ON';
            aiStatus.style.color = '#22C55E';
        }
    }

    getFPSColor(fps) {
        if (fps >= 55) return '#22C55E'; // Green
        if (fps >= 30) return '#FACC15'; // Yellow
        return '#EF4444'; // Red
    }

    getMemoryColor(memory) {
        if (memory < 50) return '#22C55E'; // Green
        if (memory < 100) return '#FACC15'; // Yellow
        return '#EF4444'; // Red
    }

    setupOptimizations() {
        // Auto-optimize based on performance
        setInterval(() => {
            if (this.metrics.fps < 30 && this.metrics.fps > 0) {
                this.suggestOptimizations();
            }
        }, 5000);

        // Memory cleanup
        setInterval(() => {
            if (this.metrics.memory > 150) {
                this.performMemoryCleanup();
            }
        }, 10000);
    }

    suggestOptimizations() {
        if (window.notificationSystem) {
            const suggestions = [];
            
            if (this.metrics.features.shaders.active) {
                suggestions.push('Disable shader effects (Ctrl+S)');
            }
            
            if (this.metrics.features.cursor.active) {
                suggestions.push('Disable cursor effects (Ctrl+C)');
            }

            if (suggestions.length > 0) {
                window.notificationSystem.warning(
                    '⚡ Performance Optimization',
                    `Low FPS detected (${this.metrics.fps}). Consider: ${suggestions.join(', ')}`,
                    {
                        duration: 8000,
                        actions: [
                            {
                                text: 'Auto-Optimize',
                                action: () => this.autoOptimize()
                            }
                        ]
                    }
                );
            }
        }
    }

    autoOptimize() {
        let optimized = false;

        // Disable heavy features if performance is poor
        if (this.metrics.fps < 25) {
            // Disable shaders first
            if (this.metrics.features.shaders.active) {
                const shaderCanvas = document.getElementById('shader-canvas');
                if (shaderCanvas) {
                    shaderCanvas.style.display = 'none';
                    optimized = true;
                }
            }

            // Then disable cursor effects if still poor
            if (this.metrics.fps < 20 && this.metrics.features.cursor.active) {
                const cursorCanvas = document.getElementById('cursor-canvas');
                if (cursorCanvas) {
                    cursorCanvas.style.display = 'none';
                    optimized = true;
                }
            }
        }

        if (optimized && window.notificationSystem) {
            window.notificationSystem.success(
                '✅ Auto-Optimized',
                'Performance features have been adjusted for better FPS'
            );
        }
    }

    performMemoryCleanup() {
        // Clear old particles and effects
        if (window.interactiveCursor) {
            // Limit particle count
            if (window.interactiveCursor.particles && window.interactiveCursor.particles.length > 50) {
                window.interactiveCursor.particles = window.interactiveCursor.particles.slice(-25);
            }
            
            // Clear old trail
            if (window.interactiveCursor.trail && window.interactiveCursor.trail.length > 10) {
                window.interactiveCursor.trail = window.interactiveCursor.trail.slice(-5);
            }
        }

        // Clear old notifications
        if (window.notificationSystem && window.notificationSystem.notifications.length > 3) {
            const oldNotifications = window.notificationSystem.notifications.slice(0, -3);
            oldNotifications.forEach(notification => {
                window.notificationSystem.dismiss(notification.id);
            });
        }

        // Clear AI history if too large
        if (window.aiRecommendations && window.aiRecommendations.userProfile.viewHistory.length > 50) {
            window.aiRecommendations.userProfile.viewHistory = 
                window.aiRecommendations.userProfile.viewHistory.slice(-25);
            window.aiRecommendations.saveUserProfile();
        }

        console.log('🧹 Memory cleanup performed');
    }

    // Public API
    getMetrics() {
        return { ...this.metrics };
    }

    enableFeature(feature) {
        if (this.metrics.features[feature]) {
            this.metrics.features[feature].active = true;
        }
    }

    disableFeature(feature) {
        if (this.metrics.features[feature]) {
            this.metrics.features[feature].active = false;
        }
    }
}

// Initialize Performance Monitor
let performanceMonitor;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            performanceMonitor = new PerformanceMonitor();
        }, 1000);
    });
} else {
    setTimeout(() => {
        performanceMonitor = new PerformanceMonitor();
    }, 1000);
}

// Make it globally accessible
window.performanceMonitor = performanceMonitor;