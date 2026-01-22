// REAL-TIME MOD COMPATIBILITY CHECKER
// Checks mod compatibility, conflicts, and system requirements in real-time

class CompatibilityChecker {
    constructor() {
        this.userSystem = {
            os: this.detectOS(),
            gpu: null,
            ram: navigator.deviceMemory ? navigator.deviceMemory + 'GB' : 'Unknown',
            cpu: navigator.hardwareConcurrency ? navigator.hardwareConcurrency + ' cores' : 'Unknown'
        };
        this.installedMods = [];
        this.compatibilityDatabase = {};
        this.conflictRules = [];
        
        this.init();
    }

    init() {
        this.loadCompatibilityDatabase();
        this.loadConflictRules();
        this.detectSystemSpecs();
        this.loadInstalledMods();
        this.createCompatibilityUI();
        this.startRealTimeChecking();
        
        console.log('🔧 Compatibility Checker Initialized');
    }

    detectOS() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes('Windows')) return 'Windows';
        if (userAgent.includes('Mac')) return 'macOS';
        if (userAgent.includes('Linux')) return 'Linux';
        return 'Unknown';
    }

    async detectSystemSpecs() {
        try {
            // Try to get GPU info using WebGL
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    this.userSystem.gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                }
            }
            
            // Estimate performance level
            this.userSystem.performanceLevel = this.estimatePerformanceLevel();
            
        } catch (error) {
            console.log('Could not detect full system specs');
        }
        
        this.updateSystemDisplay();
    }

    estimatePerformanceLevel() {
        let score = 0;
        
        // RAM scoring
        const ram = parseInt(this.userSystem.ram);
        if (ram >= 32) score += 30;
        else if (ram >= 16) score += 25;
        else if (ram >= 8) score += 15;
        else score += 5;
        
        // CPU scoring
        const cores = parseInt(this.userSystem.cpu);
        if (cores >= 12) score += 25;
        else if (cores >= 8) score += 20;
        else if (cores >= 6) score += 15;
        else if (cores >= 4) score += 10;
        else score += 5;
        
        // GPU scoring (basic detection)
        const gpu = this.userSystem.gpu?.toLowerCase() || '';
        if (gpu.includes('rtx 40') || gpu.includes('rx 7')) score += 45;
        else if (gpu.includes('rtx 30') || gpu.includes('rx 6')) score += 35;
        else if (gpu.includes('rtx 20') || gpu.includes('rx 5')) score += 25;
        else if (gpu.includes('gtx 16') || gpu.includes('rx 4')) score += 15;
        else score += 10;
        
        if (score >= 80) return 'High-End';
        if (score >= 60) return 'Mid-Range';
        if (score >= 40) return 'Budget';
        return 'Low-End';
    }

    loadCompatibilityDatabase() {
        this.compatibilityDatabase = {
            'Minecraft': {
                requirements: {
                    minimum: { ram: '4GB', gpu: 'Integrated', storage: '4GB' },
                    recommended: { ram: '8GB', gpu: 'GTX 1060', storage: '8GB' },
                    modded: { ram: '16GB', gpu: 'RTX 3060', storage: '20GB' }
                },
                modLoaders: ['Forge', 'Fabric', 'Quilt', 'OptiFine'],
                versions: ['1.20.4', '1.19.4', '1.18.2', '1.16.5', '1.12.2']
            },
            'Skyrim': {
                requirements: {
                    minimum: { ram: '4GB', gpu: 'GTX 470', storage: '12GB' },
                    recommended: { ram: '8GB', gpu: 'GTX 780', storage: '12GB' },
                    modded: { ram: '16GB', gpu: 'RTX 3070', storage: '100GB' }
                },
                modLoaders: ['SKSE64', 'MO2', 'Vortex'],
                versions: ['Special Edition', 'Anniversary Edition', 'VR']
            },
            'Cyberpunk 2077': {
                requirements: {
                    minimum: { ram: '8GB', gpu: 'GTX 780', storage: '70GB' },
                    recommended: { ram: '12GB', gpu: 'GTX 1060', storage: '70GB' },
                    modded: { ram: '32GB', gpu: 'RTX 4080', storage: '150GB' }
                },
                modLoaders: ['REDmod', 'Cyber Engine Tweaks'],
                versions: ['2.1', '2.0', '1.63']
            },
            'GTA V': {
                requirements: {
                    minimum: { ram: '4GB', gpu: 'GTX 660', storage: '110GB' },
                    recommended: { ram: '8GB', gpu: 'GTX 660', storage: '110GB' },
                    modded: { ram: '16GB', gpu: 'RTX 3060', storage: '200GB' }
                },
                modLoaders: ['Script Hook V', 'OpenIV', 'RAGE Plugin Hook'],
                versions: ['Latest', 'Steam', 'Epic Games']
            }
        };
    }

    loadConflictRules() {
        this.conflictRules = [
            {
                type: 'mutual_exclusive',
                mods: ['ENB Series', 'ReShade'],
                reason: 'Both modify graphics pipeline - choose one'
            },
            {
                type: 'load_order',
                game: 'Skyrim',
                before: 'SKSE64',
                after: 'SkyUI',
                reason: 'SkyUI requires SKSE64 to be loaded first'
            },
            {
                type: 'version_conflict',
                mod: 'OptiFine',
                incompatible_versions: ['1.20.5', '1.20.6'],
                reason: 'OptiFine not yet compatible with these versions'
            },
            {
                type: 'performance_warning',
                mods: ['Ultra Graphics Pack', '4K Texture Pack', 'Ray Tracing Mod'],
                threshold: 'Mid-Range',
                reason: 'These mods together may cause performance issues'
            }
        ];
    }

    loadInstalledMods() {
        // Load from localStorage or mod manager integration
        const saved = localStorage.getItem('exuscraft_installed_mods');
        if (saved) {
            this.installedMods = JSON.parse(saved);
        }
    }

    createCompatibilityUI() {
        // Create system info panel
        const systemPanel = document.createElement('div');
        systemPanel.id = 'system-info-panel';
        systemPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 300px;
            background: rgba(10, 14, 20, 0.9);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(91, 140, 255, 0.3);
            border-radius: 15px;
            padding: 1rem;
            z-index: 999;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        systemPanel.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background: #22C55E;
                        animation: pulse 2s ease-in-out infinite;
                    "></div>
                    <h4 style="margin: 0; color: white; font-size: 0.9rem;">System Info</h4>
                </div>
                <button id="toggle-system-panel" style="
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    font-size: 0.8rem;
                ">−</button>
            </div>
            <div id="system-specs">
                <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.8); line-height: 1.5;">
                    <div>🖥️ OS: <span id="os-info">${this.userSystem.os}</span></div>
                    <div>🎮 GPU: <span id="gpu-info">Detecting...</span></div>
                    <div>💾 RAM: <span id="ram-info">${this.userSystem.ram}</span></div>
                    <div>⚡ Level: <span id="perf-info">Analyzing...</span></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(systemPanel);
        
        // Show panel after delay
        setTimeout(() => {
            systemPanel.style.transform = 'translateY(0)';
            systemPanel.style.opacity = '1';
        }, 2000);
        
        // Toggle functionality
        document.getElementById('toggle-system-panel').addEventListener('click', (e) => {
            const specs = document.getElementById('system-specs');
            const button = e.target;
            const isHidden = specs.style.display === 'none';
            
            specs.style.display = isHidden ? 'block' : 'none';
            button.textContent = isHidden ? '−' : '+';
        });
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            systemPanel.style.transform = 'translateY(100px)';
            systemPanel.style.opacity = '0';
        }, 12000);
    }

    updateSystemDisplay() {
        const gpuInfo = document.getElementById('gpu-info');
        const perfInfo = document.getElementById('perf-info');
        
        if (gpuInfo) {
            gpuInfo.textContent = this.userSystem.gpu || 'Unknown';
        }
        
        if (perfInfo) {
            perfInfo.textContent = this.userSystem.performanceLevel;
            
            // Color code performance level
            const colors = {
                'High-End': '#22C55E',
                'Mid-Range': '#F59E0B',
                'Budget': '#EF4444',
                'Low-End': '#DC2626'
            };
            perfInfo.style.color = colors[this.userSystem.performanceLevel] || '#fff';
        }
    }

    startRealTimeChecking() {
        // Check compatibility when viewing mod details
        document.addEventListener('click', (e) => {
            if (e.target.closest('.view-details-btn') || e.target.closest('.game-card')) {
                const modCard = e.target.closest('.game-card');
                if (modCard) {
                    const modName = modCard.querySelector('h3')?.textContent;
                    const gameName = modCard.querySelector('.game-name')?.textContent;
                    
                    if (modName && gameName) {
                        setTimeout(() => {
                            this.checkModCompatibility(modName, gameName);
                        }, 500);
                    }
                }
            }
        });
        
        // Check when adding to cart
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                const modCard = e.target.closest('.game-card');
                if (modCard) {
                    const modName = modCard.querySelector('h3')?.textContent;
                    const gameName = modCard.querySelector('.game-name')?.textContent;
                    
                    if (modName && gameName) {
                        this.checkModCompatibility(modName, gameName, true);
                    }
                }
            }
        });
    }

    checkModCompatibility(modName, gameName, showWarnings = false) {
        const gameReqs = this.compatibilityDatabase[gameName];
        if (!gameReqs) return;
        
        const compatibility = {
            systemCompatible: this.checkSystemRequirements(gameReqs),
            conflicts: this.checkConflicts(modName, gameName),
            warnings: this.checkWarnings(modName, gameName),
            recommendations: this.getRecommendations(modName, gameName)
        };
        
        if (showWarnings || compatibility.conflicts.length > 0 || compatibility.warnings.length > 0) {
            this.showCompatibilityDialog(modName, gameName, compatibility);
        } else {
            this.showCompatibilityIndicator(modName, compatibility);
        }
        
        return compatibility;
    }

    checkSystemRequirements(gameReqs) {
        const userRam = parseInt(this.userSystem.ram) || 4;
        const moddedReqs = gameReqs.requirements.modded;
        const requiredRam = parseInt(moddedReqs.ram) || 8;
        
        const ramOk = userRam >= requiredRam;
        const perfOk = ['High-End', 'Mid-Range'].includes(this.userSystem.performanceLevel);
        
        return {
            ram: { required: moddedReqs.ram, current: this.userSystem.ram, ok: ramOk },
            performance: { level: this.userSystem.performanceLevel, ok: perfOk },
            overall: ramOk && perfOk
        };
    }

    checkConflicts(modName, gameName) {
        const conflicts = [];
        
        this.conflictRules.forEach(rule => {
            if (rule.type === 'mutual_exclusive' && rule.mods.includes(modName)) {
                const conflictingMods = this.installedMods.filter(installed => 
                    rule.mods.includes(installed.name) && installed.name !== modName
                );
                
                if (conflictingMods.length > 0) {
                    conflicts.push({
                        type: 'conflict',
                        message: rule.reason,
                        conflictingMods: conflictingMods
                    });
                }
            }
            
            if (rule.type === 'version_conflict' && rule.mod === modName) {
                conflicts.push({
                    type: 'version',
                    message: rule.reason,
                    incompatibleVersions: rule.incompatible_versions
                });
            }
        });
        
        return conflicts;
    }

    checkWarnings(modName, gameName) {
        const warnings = [];
        
        this.conflictRules.forEach(rule => {
            if (rule.type === 'performance_warning' && rule.mods.includes(modName)) {
                const installedHeavyMods = this.installedMods.filter(installed => 
                    rule.mods.includes(installed.name)
                );
                
                if (installedHeavyMods.length >= 2 && 
                    !['High-End'].includes(this.userSystem.performanceLevel)) {
                    warnings.push({
                        type: 'performance',
                        message: rule.reason,
                        threshold: rule.threshold,
                        currentLevel: this.userSystem.performanceLevel
                    });
                }
            }
        });
        
        return warnings;
    }

    getRecommendations(modName, gameName) {
        const recommendations = [];
        const gameReqs = this.compatibilityDatabase[gameName];
        
        if (gameReqs) {
            // Recommend mod loaders
            if (gameReqs.modLoaders.length > 0) {
                recommendations.push({
                    type: 'mod_loader',
                    message: `Recommended mod loaders: ${gameReqs.modLoaders.join(', ')}`,
                    items: gameReqs.modLoaders
                });
            }
            
            // Recommend system upgrades
            const sysReqs = this.checkSystemRequirements(gameReqs);
            if (!sysReqs.ram.ok) {
                recommendations.push({
                    type: 'hardware',
                    message: `Consider upgrading RAM to ${sysReqs.ram.required} for optimal performance`,
                    upgrade: 'RAM'
                });
            }
        }
        
        return recommendations;
    }

    showCompatibilityDialog(modName, gameName, compatibility) {
        const dialog = document.createElement('div');
        dialog.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, rgba(10, 14, 20, 0.95), rgba(20, 25, 35, 0.95));
            border: 1px solid rgba(91, 140, 255, 0.3);
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;
        
        let statusColor = '#22C55E';
        let statusIcon = '✅';
        let statusText = 'Compatible';
        
        if (compatibility.conflicts.length > 0) {
            statusColor = '#EF4444';
            statusIcon = '❌';
            statusText = 'Conflicts Detected';
        } else if (compatibility.warnings.length > 0) {
            statusColor = '#F59E0B';
            statusIcon = '⚠️';
            statusText = 'Warnings';
        } else if (!compatibility.systemCompatible.overall) {
            statusColor = '#F59E0B';
            statusIcon = '⚠️';
            statusText = 'System Requirements';
        }
        
        content.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
                <h3 style="margin: 0; color: white; font-size: 1.3rem;">Compatibility Check</h3>
                <button id="close-compatibility-dialog" style="
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1.5rem;
                    cursor: pointer;
                ">×</button>
            </div>
            
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">${statusIcon}</div>
                <h4 style="margin: 0; color: ${statusColor}; font-size: 1.1rem;">${statusText}</h4>
                <p style="margin: 0.5rem 0 0 0; color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">
                    ${modName} for ${gameName}
                </p>
            </div>
            
            ${compatibility.conflicts.length > 0 ? `
                <div style="margin-bottom: 1.5rem;">
                    <h5 style="color: #EF4444; margin: 0 0 0.75rem 0; font-size: 1rem;">⚠️ Conflicts</h5>
                    ${compatibility.conflicts.map(conflict => `
                        <div style="
                            background: rgba(239, 68, 68, 0.1);
                            border: 1px solid rgba(239, 68, 68, 0.3);
                            border-radius: 8px;
                            padding: 0.75rem;
                            margin-bottom: 0.5rem;
                        ">
                            <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">
                                ${conflict.message}
                            </p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${compatibility.warnings.length > 0 ? `
                <div style="margin-bottom: 1.5rem;">
                    <h5 style="color: #F59E0B; margin: 0 0 0.75rem 0; font-size: 1rem;">⚠️ Warnings</h5>
                    ${compatibility.warnings.map(warning => `
                        <div style="
                            background: rgba(245, 158, 11, 0.1);
                            border: 1px solid rgba(245, 158, 11, 0.3);
                            border-radius: 8px;
                            padding: 0.75rem;
                            margin-bottom: 0.5rem;
                        ">
                            <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">
                                ${warning.message}
                            </p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: white; margin: 0 0 0.75rem 0; font-size: 1rem;">💻 System Requirements</h5>
                <div style="
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    padding: 0.75rem;
                ">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="color: rgba(255, 255, 255, 0.7);">RAM:</span>
                        <span style="color: ${compatibility.systemCompatible.ram.ok ? '#22C55E' : '#EF4444'};">
                            ${compatibility.systemCompatible.ram.current} / ${compatibility.systemCompatible.ram.required}
                        </span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: rgba(255, 255, 255, 0.7);">Performance:</span>
                        <span style="color: ${compatibility.systemCompatible.performance.ok ? '#22C55E' : '#F59E0B'};">
                            ${compatibility.systemCompatible.performance.level}
                        </span>
                    </div>
                </div>
            </div>
            
            ${compatibility.recommendations.length > 0 ? `
                <div style="margin-bottom: 1.5rem;">
                    <h5 style="color: #5B8CFF; margin: 0 0 0.75rem 0; font-size: 1rem;">💡 Recommendations</h5>
                    ${compatibility.recommendations.map(rec => `
                        <div style="
                            background: rgba(91, 140, 255, 0.1);
                            border: 1px solid rgba(91, 140, 255, 0.3);
                            border-radius: 8px;
                            padding: 0.75rem;
                            margin-bottom: 0.5rem;
                        ">
                            <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">
                                ${rec.message}
                            </p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button onclick="this.closest('.compatibility-dialog').remove()" style="
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.9rem;
                ">Close</button>
                ${compatibility.conflicts.length === 0 ? `
                    <button onclick="this.closest('.compatibility-dialog').remove(); addToCart('${modName}')" style="
                        background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                        border: none;
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 0.9rem;
                        font-weight: 600;
                    ">Continue</button>
                ` : ''}
            </div>
        `;
        
        dialog.appendChild(content);
        dialog.className = 'compatibility-dialog';
        document.body.appendChild(dialog);
        
        // Animate in
        setTimeout(() => {
            dialog.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 10);
        
        // Close handlers
        document.getElementById('close-compatibility-dialog').addEventListener('click', () => {
            dialog.remove();
        });
        
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.remove();
            }
        });
    }

    showCompatibilityIndicator(modName, compatibility) {
        // Show small indicator for compatible mods
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #22C55E, #16A34A);
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 1500;
            transform: translateX(300px);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        `;
        
        indicator.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span>✅</span>
                <span>${modName} is compatible!</span>
            </div>
        `;
        
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            indicator.style.transform = 'translateX(300px)';
            setTimeout(() => {
                document.body.removeChild(indicator);
            }, 300);
        }, 3000);
    }

    // Public API methods
    addInstalledMod(modName, gameName, version = 'latest') {
        const mod = {
            name: modName,
            game: gameName,
            version: version,
            installedDate: Date.now()
        };
        
        this.installedMods.push(mod);
        localStorage.setItem('exuscraft_installed_mods', JSON.stringify(this.installedMods));
        
        console.log(`Added ${modName} to installed mods`);
    }

    removeInstalledMod(modName) {
        this.installedMods = this.installedMods.filter(mod => mod.name !== modName);
        localStorage.setItem('exuscraft_installed_mods', JSON.stringify(this.installedMods));
        
        console.log(`Removed ${modName} from installed mods`);
    }

    getInstalledMods() {
        return this.installedMods;
    }

    getSystemInfo() {
        return this.userSystem;
    }
}

// Initialize Compatibility Checker
let compatibilityChecker;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        compatibilityChecker = new CompatibilityChecker();
    });
} else {
    compatibilityChecker = new CompatibilityChecker();
}

window.compatibilityChecker = compatibilityChecker;