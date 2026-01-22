// AI-POWERED RECOMMENDATIONS SYSTEM
// Smart mod discovery based on user behavior and preferences

class AIRecommendations {
    constructor() {
        this.userProfile = {
            preferences: {},
            viewHistory: [],
            downloadHistory: [],
            searchHistory: [],
            gamePreferences: {},
            categoryPreferences: {},
            timeSpent: {}
        };
        this.recommendations = [];
        this.isLearning = true;
        
        this.init();
    }

    init() {
        this.loadUserProfile();
        this.setupTracking();
        this.createRecommendationUI();
        this.generateRecommendations();
        
        console.log('🤖 AI Recommendations System Loaded!');
    }

    loadUserProfile() {
        const saved = localStorage.getItem('exuscraft-ai-profile');
        if (saved) {
            this.userProfile = { ...this.userProfile, ...JSON.parse(saved) };
        }
    }

    saveUserProfile() {
        localStorage.setItem('exuscraft-ai-profile', JSON.stringify(this.userProfile));
    }

    setupTracking() {
        // Track mod views
        this.trackModViews();
        
        // Track search behavior
        this.trackSearches();
        
        // Track time spent on different sections
        this.trackTimeSpent();
        
        // Track downloads/purchases
        this.trackDownloads();
    }

    trackModViews() {
        // Track when users view mod details
        document.addEventListener('click', (e) => {
            const modCard = e.target.closest('.game-card, .mod-card');
            if (modCard) {
                const modData = this.extractModData(modCard);
                this.recordView(modData);
            }
        });
    }

    trackSearches() {
        // Track search queries
        const searchInputs = document.querySelectorAll('#gameSearch, #navSearch');
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length > 2) {
                    this.recordSearch(query);
                }
            });
        });
    }

    trackTimeSpent() {
        let startTime = Date.now();
        let currentSection = 'home';
        
        // Track section changes
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const endTime = Date.now();
                    const timeSpent = endTime - startTime;
                    
                    this.recordTimeSpent(currentSection, timeSpent);
                    
                    currentSection = entry.target.id || 'unknown';
                    startTime = endTime;
                }
            });
        }, { threshold: 0.5 });

        // Observe main sections
        const sections = document.querySelectorAll('.section, .hero');
        sections.forEach(section => observer.observe(section));
    }

    trackDownloads() {
        // Track download/purchase events
        document.addEventListener('click', (e) => {
            if (e.target.matches('.download-btn, .purchase-btn, .btn-primary')) {
                const modCard = e.target.closest('.game-card, .mod-card');
                if (modCard) {
                    const modData = this.extractModData(modCard);
                    this.recordDownload(modData);
                }
            }
        });
    }

    extractModData(element) {
        return {
            title: element.querySelector('.game-title, h3, h4')?.textContent || 'Unknown',
            game: element.querySelector('.game-category, .mod-game')?.textContent || 'Unknown',
            category: element.querySelector('.game-category')?.textContent || 'Unknown',
            price: element.querySelector('.game-price')?.textContent || 'Free',
            timestamp: Date.now()
        };
    }

    recordView(modData) {
        this.userProfile.viewHistory.push(modData);
        this.updatePreferences(modData, 'view');
        this.saveUserProfile();
        
        // Limit history size
        if (this.userProfile.viewHistory.length > 100) {
            this.userProfile.viewHistory.shift();
        }
    }

    recordSearch(query) {
        this.userProfile.searchHistory.push({
            query: query.toLowerCase(),
            timestamp: Date.now()
        });
        
        // Extract keywords and update preferences
        const keywords = query.toLowerCase().split(' ');
        keywords.forEach(keyword => {
            if (keyword.length > 2) {
                this.userProfile.preferences[keyword] = (this.userProfile.preferences[keyword] || 0) + 1;
            }
        });
        
        this.saveUserProfile();
    }

    recordTimeSpent(section, timeMs) {
        this.userProfile.timeSpent[section] = (this.userProfile.timeSpent[section] || 0) + timeMs;
        this.saveUserProfile();
    }

    recordDownload(modData) {
        this.userProfile.downloadHistory.push(modData);
        this.updatePreferences(modData, 'download');
        this.saveUserProfile();
    }

    updatePreferences(modData, action) {
        const weight = action === 'download' ? 5 : action === 'view' ? 1 : 0.5;
        
        // Update game preferences
        this.userProfile.gamePreferences[modData.game] = 
            (this.userProfile.gamePreferences[modData.game] || 0) + weight;
        
        // Update category preferences
        this.userProfile.categoryPreferences[modData.category] = 
            (this.userProfile.categoryPreferences[modData.category] || 0) + weight;
    }

    generateRecommendations() {
        this.recommendations = [];
        
        // Get all available mods (simulate with sample data)
        const availableMods = this.getAvailableMods();
        
        // Score each mod based on user preferences
        const scoredMods = availableMods.map(mod => ({
            ...mod,
            score: this.calculateRecommendationScore(mod)
        }));
        
        // Sort by score and take top recommendations
        this.recommendations = scoredMods
            .sort((a, b) => b.score - a.score)
            .slice(0, 6);
        
        // Update UI
        this.updateRecommendationUI();
    }

    calculateRecommendationScore(mod) {
        let score = 0;
        
        // Base popularity score
        score += mod.downloads * 0.001;
        score += mod.rating * 20;
        
        // User preference matching
        const gamePreference = this.userProfile.gamePreferences[mod.game] || 0;
        const categoryPreference = this.userProfile.categoryPreferences[mod.category] || 0;
        
        score += gamePreference * 10;
        score += categoryPreference * 5;
        
        // Keyword matching from search history
        const modKeywords = (mod.title + ' ' + mod.description).toLowerCase();
        Object.keys(this.userProfile.preferences).forEach(keyword => {
            if (modKeywords.includes(keyword)) {
                score += this.userProfile.preferences[keyword] * 2;
            }
        });
        
        // Diversity bonus (avoid recommending too similar mods)
        const similarMods = this.userProfile.viewHistory.filter(viewed => 
            viewed.game === mod.game && viewed.category === mod.category
        ).length;
        score -= similarMods * 5;
        
        // Recency bonus for new mods
        const daysSinceRelease = (Date.now() - mod.releaseDate) / (1000 * 60 * 60 * 24);
        if (daysSinceRelease < 7) {
            score += 20;
        }
        
        return Math.max(0, score);
    }

    getAvailableMods() {
        // Simulate mod database (in real app, this would be an API call)
        return [
            {
                id: 'ultra-graphics-2',
                title: 'Ultra Graphics Pack V2',
                game: 'Cyberpunk 2077',
                category: 'Graphics',
                description: 'Enhanced textures and lighting',
                downloads: 50000,
                rating: 4.8,
                price: 'Free',
                releaseDate: Date.now() - (1000 * 60 * 60 * 24 * 2), // 2 days ago
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop'
            },
            {
                id: 'weapon-overhaul',
                title: 'Realistic Weapons Overhaul',
                game: 'Skyrim',
                category: 'Gameplay',
                description: 'Completely rebalanced weapon system',
                downloads: 75000,
                rating: 4.9,
                price: '$4.99',
                releaseDate: Date.now() - (1000 * 60 * 60 * 24 * 5),
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            },
            {
                id: 'ui-redesign',
                title: 'Modern UI Redesign',
                game: 'Minecraft',
                category: 'UI/UX',
                description: 'Clean, modern interface overhaul',
                downloads: 30000,
                rating: 4.7,
                price: 'Free',
                releaseDate: Date.now() - (1000 * 60 * 60 * 24 * 10),
                image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
            },
            {
                id: 'sound-enhancement',
                title: 'Immersive Audio Pack',
                game: 'GTA V',
                category: 'Audio',
                description: '3D spatial audio enhancement',
                downloads: 25000,
                rating: 4.6,
                price: '$2.99',
                releaseDate: Date.now() - (1000 * 60 * 60 * 24 * 1), // 1 day ago
                image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
            },
            {
                id: 'character-pack',
                title: 'Expanded Character Creator',
                game: 'Fallout 4',
                category: 'Characters',
                description: 'More customization options',
                downloads: 40000,
                rating: 4.5,
                price: 'Free',
                releaseDate: Date.now() - (1000 * 60 * 60 * 24 * 7),
                image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop'
            },
            {
                id: 'vehicle-physics',
                title: 'Realistic Vehicle Physics',
                game: 'GTA V',
                category: 'Gameplay',
                description: 'Enhanced driving mechanics',
                downloads: 60000,
                rating: 4.8,
                price: '$3.99',
                releaseDate: Date.now() - (1000 * 60 * 60 * 24 * 3),
                image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop'
            }
        ];
    }

    createRecommendationUI() {
        // Create AI recommendations section
        const recommendationSection = document.createElement('section');
        recommendationSection.className = 'section';
        recommendationSection.id = 'ai-recommendations';
        recommendationSection.innerHTML = `
            <div class="container">
                <div class="section-header fade-in">
                    <h2 class="section-title">
                        🤖 AI Recommendations
                        <span style="font-size: 0.6em; color: #5B8CFF; font-weight: 400;">Powered by Machine Learning</span>
                    </h2>
                    <p class="section-subtitle">Personalized mod suggestions based on your preferences and behavior</p>
                </div>
                <div class="ai-stats" style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 3rem; flex-wrap: wrap;">
                    <div class="ai-stat" style="text-align: center; padding: 1rem; background: rgba(91, 140, 255, 0.1); border-radius: 12px; border: 1px solid rgba(91, 140, 255, 0.2);">
                        <div style="font-size: 1.5rem; font-weight: 700; color: #5B8CFF;" id="viewCount">0</div>
                        <div style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.6);">Mods Viewed</div>
                    </div>
                    <div class="ai-stat" style="text-align: center; padding: 1rem; background: rgba(193, 92, 255, 0.1); border-radius: 12px; border: 1px solid rgba(193, 92, 255, 0.2);">
                        <div style="font-size: 1.5rem; font-weight: 700; color: #C15CFF;" id="searchCount">0</div>
                        <div style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.6);">Searches Made</div>
                    </div>
                    <div class="ai-stat" style="text-align: center; padding: 1rem; background: rgba(250, 204, 21, 0.1); border-radius: 12px; border: 1px solid rgba(250, 204, 21, 0.2);">
                        <div style="font-size: 1.5rem; font-weight: 700; color: #FACC15;" id="accuracyScore">95%</div>
                        <div style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.6);">Accuracy</div>
                    </div>
                </div>
                <div class="games-showcase" id="aiRecommendations">
                    <div class="loading-placeholder" style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
                        <div class="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <p style="margin-top: 1rem; color: #5B8CFF;">AI is analyzing your preferences...</p>
                    </div>
                </div>
            </div>
        `;

        // Insert after featured mods section
        const featuredSection = document.getElementById('featured-games');
        if (featuredSection) {
            featuredSection.parentNode.insertBefore(recommendationSection, featuredSection.nextSibling);
        }

        // Update stats
        this.updateStats();
    }

    updateStats() {
        const viewCount = document.getElementById('viewCount');
        const searchCount = document.getElementById('searchCount');
        
        if (viewCount) {
            viewCount.textContent = this.userProfile.viewHistory.length;
        }
        
        if (searchCount) {
            searchCount.textContent = this.userProfile.searchHistory.length;
        }
    }

    updateRecommendationUI() {
        const container = document.getElementById('aiRecommendations');
        if (!container) return;

        if (this.recommendations.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
                    <i class="fas fa-robot" style="font-size: 4rem; color: #5B8CFF; margin-bottom: 1rem;"></i>
                    <h3>Learning Your Preferences</h3>
                    <p style="color: rgba(255, 255, 255, 0.6);">Browse some mods to get personalized recommendations!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.recommendations.map((mod, index) => `
            <div class="game-card ai-recommended" data-mod-id="${mod.id}" style="animation-delay: ${index * 0.1}s;">
                <div class="ai-badge" style="position: absolute; top: 1rem; left: 1rem; background: linear-gradient(135deg, #5B8CFF, #C15CFF); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; z-index: 10;">
                    🤖 ${Math.round(mod.score)}% Match
                </div>
                <div class="game-image">
                    <img src="${mod.image}" alt="${mod.title}" loading="lazy">
                </div>
                <div class="game-info">
                    <h3 class="game-title">${mod.title}</h3>
                    <p class="game-description">${mod.description}</p>
                    <div class="game-meta">
                        <span class="game-category">${mod.category}</span>
                        <span class="game-price">${mod.price}</span>
                    </div>
                    <div class="game-stats" style="display: flex; justify-content: space-between; margin-top: 1rem; font-size: 0.9rem; color: rgba(255, 255, 255, 0.6);">
                        <span><i class="fas fa-download"></i> ${this.formatNumber(mod.downloads)}</span>
                        <span><i class="fas fa-star"></i> ${mod.rating}</span>
                        <span><i class="fas fa-gamepad"></i> ${mod.game}</span>
                    </div>
                    <div class="game-actions" style="margin-top: 1rem;">
                        <button class="btn btn-primary" onclick="aiRecommendations.trackRecommendationClick('${mod.id}')">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add AI recommendation styles
        this.addAIStyles();
    }

    addAIStyles() {
        if (document.getElementById('ai-styles')) return;

        const style = document.createElement('style');
        style.id = 'ai-styles';
        style.textContent = `
            .ai-recommended {
                position: relative;
                overflow: hidden;
            }
            
            .ai-recommended::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, rgba(91, 140, 255, 0.1), rgba(193, 92, 255, 0.1));
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 1;
            }
            
            .ai-recommended:hover::before {
                opacity: 1;
            }
            
            .ai-badge {
                animation: aiGlow 2s ease-in-out infinite alternate;
            }
            
            @keyframes aiGlow {
                from { box-shadow: 0 0 10px rgba(91, 140, 255, 0.5); }
                to { box-shadow: 0 0 20px rgba(193, 92, 255, 0.8); }
            }
            
            .loading-dots {
                display: inline-flex;
                gap: 4px;
            }
            
            .loading-dots span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #5B8CFF;
                animation: loading-bounce 1.4s ease-in-out infinite both;
            }
            
            .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
            .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
            .loading-dots span:nth-child(3) { animation-delay: 0s; }
            
            @keyframes loading-bounce {
                0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                40% { transform: scale(1.2); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    trackRecommendationClick(modId) {
        // Track when user clicks on a recommendation
        const mod = this.recommendations.find(m => m.id === modId);
        if (mod) {
            console.log(`🤖 AI Recommendation clicked: ${mod.title} (${mod.score}% match)`);
            
            // Record as high-value interaction
            this.recordView({
                ...mod,
                source: 'ai-recommendation',
                score: mod.score
            });
            
            // Regenerate recommendations based on this feedback
            setTimeout(() => {
                this.generateRecommendations();
            }, 1000);
        }
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    // Public method to manually trigger recommendation update
    updateRecommendations() {
        this.generateRecommendations();
    }

    // Get user insights for debugging
    getUserInsights() {
        return {
            topGames: Object.entries(this.userProfile.gamePreferences)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3),
            topCategories: Object.entries(this.userProfile.categoryPreferences)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3),
            totalViews: this.userProfile.viewHistory.length,
            totalSearches: this.userProfile.searchHistory.length,
            recommendations: this.recommendations.length
        };
    }
}

// Initialize AI Recommendations
let aiRecommendations;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        aiRecommendations = new AIRecommendations();
    });
} else {
    aiRecommendations = new AIRecommendations();
}

// Make it globally accessible
window.aiRecommendations = aiRecommendations;