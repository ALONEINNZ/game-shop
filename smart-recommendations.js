// SMART MOD RECOMMENDATION ENGINE
// AI-powered recommendations based on user behavior, preferences, and mod compatibility

class SmartRecommendationEngine {
    constructor() {
        this.userProfile = {
            favoriteGames: [],
            downloadHistory: [],
            preferences: {
                graphics: 0.5,
                gameplay: 0.5,
                difficulty: 0.5,
                realism: 0.5
            },
            playtime: {},
            ratings: {}
        };
        this.modDatabase = [];
        this.recommendations = [];
        this.isLearning = true;
        
        this.init();
    }

    init() {
        this.loadUserProfile();
        this.loadModDatabase();
        this.startBehaviorTracking();
        this.generateRecommendations();
        this.createRecommendationUI();
        
        console.log('🤖 Smart Recommendation Engine Activated');
    }

    loadUserProfile() {
        // Load from localStorage or create new profile
        const saved = localStorage.getItem('exuscraft_user_profile');
        if (saved) {
            this.userProfile = { ...this.userProfile, ...JSON.parse(saved) };
        }
        
        // Initialize with some sample data if new user
        if (this.userProfile.favoriteGames.length === 0) {
            this.userProfile.favoriteGames = ['Minecraft', 'Skyrim'];
            this.userProfile.preferences = {
                graphics: Math.random(),
                gameplay: Math.random(),
                difficulty: Math.random(),
                realism: Math.random()
            };
        }
    }

    loadModDatabase() {
        // Enhanced mod database with compatibility and feature tags
        this.modDatabase = [
            {
                id: 'ultra-graphics-pack',
                name: 'Ultra Graphics Enhancement Pack',
                game: 'Cyberpunk 2077',
                category: 'Graphics',
                tags: ['4K', 'Ray Tracing', 'HDR', 'Performance'],
                compatibility: ['RTX 3060+', 'DLSS'],
                features: {
                    graphics: 0.95,
                    gameplay: 0.1,
                    difficulty: 0.0,
                    realism: 0.9
                },
                downloads: 250000,
                rating: 4.9,
                size: '12.5 GB',
                requirements: ['High-end GPU', '16GB RAM'],
                description: 'Transform Cyberpunk 2077 with stunning 8K textures and advanced lighting'
            },
            {
                id: 'survival-overhaul',
                name: 'Hardcore Survival Overhaul',
                game: 'Skyrim',
                category: 'Gameplay',
                tags: ['Survival', 'Hardcore', 'Immersion', 'Realism'],
                compatibility: ['All versions', 'SKSE'],
                features: {
                    graphics: 0.2,
                    gameplay: 0.95,
                    difficulty: 0.9,
                    realism: 0.85
                },
                downloads: 180000,
                rating: 4.7,
                size: '450 MB',
                requirements: ['SKSE64', 'SkyUI'],
                description: 'Complete survival mechanics with hunger, thirst, temperature, and disease'
            },
            {
                id: 'minecraft-shaders-ultimate',
                name: 'Ultimate Shader Pack',
                game: 'Minecraft',
                category: 'Graphics',
                tags: ['Shaders', 'Lighting', 'Water', 'Shadows'],
                compatibility: ['OptiFine', 'Iris'],
                features: {
                    graphics: 0.9,
                    gameplay: 0.1,
                    difficulty: 0.0,
                    realism: 0.7
                },
                downloads: 500000,
                rating: 4.8,
                size: '200 MB',
                requirements: ['OptiFine or Iris', 'GTX 1060+'],
                description: 'Breathtaking lighting and water effects for Minecraft'
            },
            {
                id: 'gta-realistic-physics',
                name: 'Realistic Physics Mod',
                game: 'GTA V',
                category: 'Gameplay',
                tags: ['Physics', 'Realism', 'Vehicles', 'Crashes'],
                compatibility: ['Script Hook V'],
                features: {
                    graphics: 0.3,
                    gameplay: 0.8,
                    difficulty: 0.4,
                    realism: 0.95
                },
                downloads: 320000,
                rating: 4.6,
                size: '85 MB',
                requirements: ['Script Hook V', 'OpenIV'],
                description: 'Realistic vehicle physics and crash mechanics'
            },
            {
                id: 'witcher-combat-enhanced',
                name: 'Enhanced Combat System',
                game: 'The Witcher 3',
                category: 'Gameplay',
                tags: ['Combat', 'Difficulty', 'Skills', 'Balance'],
                compatibility: ['All DLCs'],
                features: {
                    graphics: 0.1,
                    gameplay: 0.9,
                    difficulty: 0.7,
                    realism: 0.6
                },
                downloads: 275000,
                rating: 4.8,
                size: '120 MB',
                requirements: ['All DLCs recommended'],
                description: 'Overhauled combat with new mechanics and difficulty scaling'
            }
        ];
    }

    startBehaviorTracking() {
        // Track user interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.game-card')) {
                const gameCard = e.target.closest('.game-card');
                const gameName = gameCard.querySelector('h3')?.textContent;
                if (gameName) {
                    this.trackInteraction('view', gameName);
                }
            }
            
            if (e.target.closest('.download-btn')) {
                const modCard = e.target.closest('.game-card');
                const modName = modCard?.querySelector('h3')?.textContent;
                if (modName) {
                    this.trackInteraction('download', modName);
                }
            }
        });

        // Track search behavior
        const searchInputs = document.querySelectorAll('#gameSearch, #navSearch');
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                if (e.target.value.length > 2) {
                    this.trackInteraction('search', e.target.value);
                }
            });
        });

        // Track time spent on page
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - startTime;
            this.trackInteraction('time', timeSpent);
        });
    }

    trackInteraction(type, data) {
        const timestamp = Date.now();
        
        switch (type) {
            case 'view':
                if (!this.userProfile.favoriteGames.includes(data)) {
                    // Add to favorites if viewed multiple times
                    const viewCount = this.userProfile.playtime[data] || 0;
                    this.userProfile.playtime[data] = viewCount + 1;
                    
                    if (viewCount > 3 && !this.userProfile.favoriteGames.includes(data)) {
                        this.userProfile.favoriteGames.push(data);
                        this.showNotification(`Added ${data} to your favorite games!`);
                    }
                }
                break;
                
            case 'download':
                this.userProfile.downloadHistory.push({
                    mod: data,
                    timestamp: timestamp
                });
                this.updatePreferences(data);
                break;
                
            case 'search':
                // Analyze search terms to understand preferences
                this.analyzeSearchTerms(data);
                break;
                
            case 'time':
                // Track engagement time
                this.userProfile.totalTime = (this.userProfile.totalTime || 0) + data;
                break;
        }
        
        this.saveUserProfile();
        this.generateRecommendations();
    }

    updatePreferences(modName) {
        const mod = this.modDatabase.find(m => m.name === modName);
        if (mod) {
            // Update user preferences based on downloaded mod features
            Object.keys(mod.features).forEach(feature => {
                const currentPref = this.userProfile.preferences[feature];
                const modFeature = mod.features[feature];
                // Weighted average with slight bias toward new preference
                this.userProfile.preferences[feature] = (currentPref * 0.8) + (modFeature * 0.2);
            });
        }
    }

    analyzeSearchTerms(searchTerm) {
        const terms = searchTerm.toLowerCase().split(' ');
        
        // Graphics-related terms
        const graphicsTerms = ['graphics', 'visual', 'texture', 'shader', '4k', 'hd', 'ray tracing'];
        if (terms.some(term => graphicsTerms.includes(term))) {
            this.userProfile.preferences.graphics += 0.05;
        }
        
        // Gameplay-related terms
        const gameplayTerms = ['gameplay', 'mechanic', 'combat', 'skill', 'quest', 'story'];
        if (terms.some(term => gameplayTerms.includes(term))) {
            this.userProfile.preferences.gameplay += 0.05;
        }
        
        // Difficulty-related terms
        const difficultyTerms = ['hard', 'difficult', 'challenge', 'hardcore', 'survival'];
        if (terms.some(term => difficultyTerms.includes(term))) {
            this.userProfile.preferences.difficulty += 0.05;
        }
        
        // Realism-related terms
        const realismTerms = ['realistic', 'immersive', 'simulation', 'physics', 'authentic'];
        if (terms.some(term => realismTerms.includes(term))) {
            this.userProfile.preferences.realism += 0.05;
        }
        
        // Normalize preferences to stay within 0-1 range
        Object.keys(this.userProfile.preferences).forEach(key => {
            this.userProfile.preferences[key] = Math.min(1, this.userProfile.preferences[key]);
        });
    }

    generateRecommendations() {
        const recommendations = [];
        
        this.modDatabase.forEach(mod => {
            let score = 0;
            
            // Game preference score (40% weight)
            if (this.userProfile.favoriteGames.includes(mod.game)) {
                score += 0.4;
            }
            
            // Feature preference score (30% weight)
            let featureScore = 0;
            Object.keys(mod.features).forEach(feature => {
                const userPref = this.userProfile.preferences[feature];
                const modFeature = mod.features[feature];
                featureScore += userPref * modFeature;
            });
            score += (featureScore / Object.keys(mod.features).length) * 0.3;
            
            // Popularity score (20% weight)
            const maxDownloads = Math.max(...this.modDatabase.map(m => m.downloads));
            score += (mod.downloads / maxDownloads) * 0.2;
            
            // Rating score (10% weight)
            score += (mod.rating / 5) * 0.1;
            
            // Penalty for already downloaded mods
            if (this.userProfile.downloadHistory.some(d => d.mod === mod.name)) {
                score *= 0.3;
            }
            
            recommendations.push({
                ...mod,
                recommendationScore: score,
                reason: this.generateRecommendationReason(mod, score)
            });
        });
        
        // Sort by score and take top recommendations
        this.recommendations = recommendations
            .sort((a, b) => b.recommendationScore - a.recommendationScore)
            .slice(0, 6);
        
        this.updateRecommendationUI();
    }

    generateRecommendationReason(mod, score) {
        const reasons = [];
        
        if (this.userProfile.favoriteGames.includes(mod.game)) {
            reasons.push(`You love ${mod.game}`);
        }
        
        const topPreference = Object.keys(this.userProfile.preferences)
            .reduce((a, b) => this.userProfile.preferences[a] > this.userProfile.preferences[b] ? a : b);
        
        if (mod.features[topPreference] > 0.7) {
            reasons.push(`Great ${topPreference} enhancement`);
        }
        
        if (mod.rating > 4.5) {
            reasons.push('Highly rated by community');
        }
        
        if (mod.downloads > 200000) {
            reasons.push('Popular choice');
        }
        
        return reasons.length > 0 ? reasons.join(' • ') : 'Recommended for you';
    }

    createRecommendationUI() {
        // Create floating recommendation panel
        const panel = document.createElement('div');
        panel.id = 'smart-recommendations-panel';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            right: -400px;
            transform: translateY(-50%);
            width: 380px;
            max-height: 80vh;
            background: linear-gradient(135deg, rgba(10, 14, 20, 0.95), rgba(20, 25, 35, 0.95));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(91, 140, 255, 0.3);
            border-radius: 20px;
            padding: 1.5rem;
            z-index: 1000;
            transition: right 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            overflow-y: auto;
        `;
        
        panel.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background: #5B8CFF;
                        box-shadow: 0 0 10px #5B8CFF;
                        animation: pulse 2s ease-in-out infinite;
                    "></div>
                    <h3 style="margin: 0; color: #5B8CFF; font-size: 1.1rem; font-weight: 600;">Smart Picks</h3>
                </div>
                <button id="close-recommendations" style="
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: 4px;
                    transition: color 0.3s ease;
                " onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">×</button>
            </div>
            <div id="recommendations-list">
                <div style="text-align: center; color: rgba(255, 255, 255, 0.6); padding: 2rem;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🤖</div>
                    <p>Learning your preferences...</p>
                </div>
            </div>
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <p style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.5); margin: 0; text-align: center;">
                    Powered by AI • Updates as you browse
                </p>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Add toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'recommendations-toggle';
        toggleBtn.style.cssText = `
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
            z-index: 1001;
            box-shadow: 0 8px 25px rgba(91, 140, 255, 0.4);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        toggleBtn.innerHTML = '🤖';
        toggleBtn.title = 'Smart Recommendations';
        
        document.body.appendChild(toggleBtn);
        
        // Event listeners
        toggleBtn.addEventListener('click', () => {
            const isOpen = panel.style.right === '20px';
            panel.style.right = isOpen ? '-400px' : '20px';
            toggleBtn.style.right = isOpen ? '20px' : '420px';
        });
        
        document.getElementById('close-recommendations').addEventListener('click', () => {
            panel.style.right = '-400px';
            toggleBtn.style.right = '20px';
        });
        
        // Auto-show after 5 seconds
        setTimeout(() => {
            if (this.recommendations.length > 0) {
                panel.style.right = '20px';
                toggleBtn.style.right = '420px';
                
                // Auto-hide after 10 seconds
                setTimeout(() => {
                    panel.style.right = '-400px';
                    toggleBtn.style.right = '20px';
                }, 10000);
            }
        }, 5000);
    }

    updateRecommendationUI() {
        const list = document.getElementById('recommendations-list');
        if (!list) return;
        
        if (this.recommendations.length === 0) {
            list.innerHTML = `
                <div style="text-align: center; color: rgba(255, 255, 255, 0.6); padding: 2rem;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🔍</div>
                    <p>Browse more mods to get personalized recommendations!</p>
                </div>
            `;
            return;
        }
        
        list.innerHTML = this.recommendations.map(mod => `
            <div style="
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 1rem;
                margin-bottom: 1rem;
                transition: all 0.3s ease;
                cursor: pointer;
            " onmouseover="this.style.background='rgba(91, 140, 255, 0.1)'; this.style.borderColor='rgba(91, 140, 255, 0.3)'" 
               onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'; this.style.borderColor='rgba(255, 255, 255, 0.1)'"
               onclick="openModDetails('${mod.id}')">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                    <h4 style="margin: 0; color: white; font-size: 0.9rem; font-weight: 600; line-height: 1.3;">${mod.name}</h4>
                    <div style="
                        background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                        color: white;
                        padding: 0.2rem 0.5rem;
                        border-radius: 12px;
                        font-size: 0.7rem;
                        font-weight: 600;
                        white-space: nowrap;
                    ">${Math.round(mod.recommendationScore * 100)}% Match</div>
                </div>
                <p style="margin: 0 0 0.5rem 0; color: #5B8CFF; font-size: 0.8rem; font-weight: 500;">${mod.game}</p>
                <p style="margin: 0 0 0.75rem 0; color: rgba(255, 255, 255, 0.7); font-size: 0.8rem; line-height: 1.4;">${mod.description}</p>
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.7rem;">
                    <span style="color: rgba(255, 255, 255, 0.5);">${mod.reason}</span>
                    <div style="display: flex; align-items: center; gap: 0.5rem; color: rgba(255, 255, 255, 0.6);">
                        <span>⭐ ${mod.rating}</span>
                        <span>📥 ${(mod.downloads / 1000).toFixed(0)}K</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #5B8CFF, #C15CFF);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(91, 140, 255, 0.4);
            z-index: 1002;
            transform: translateX(400px);
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 300px;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="font-size: 1.2rem;">🤖</div>
                <span style="font-size: 0.9rem; font-weight: 500;">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 4000);
    }

    saveUserProfile() {
        localStorage.setItem('exuscraft_user_profile', JSON.stringify(this.userProfile));
    }

    // Public API methods
    addToFavorites(game) {
        if (!this.userProfile.favoriteGames.includes(game)) {
            this.userProfile.favoriteGames.push(game);
            this.saveUserProfile();
            this.generateRecommendations();
        }
    }

    rateMod(modName, rating) {
        this.userProfile.ratings[modName] = rating;
        this.saveUserProfile();
        this.generateRecommendations();
    }

    getRecommendations() {
        return this.recommendations;
    }

    getUserProfile() {
        return this.userProfile;
    }
}

// Initialize Smart Recommendation Engine
let smartRecommendationEngine;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        smartRecommendationEngine = new SmartRecommendationEngine();
    });
} else {
    smartRecommendationEngine = new SmartRecommendationEngine();
}

window.smartRecommendationEngine = smartRecommendationEngine;