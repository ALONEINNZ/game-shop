// MACHINE LEARNING ENGINE - Advanced ML-powered features for personalization and automation
console.log('🧠 Loading Machine Learning Engine...');

class MachineLearningEngine {
    constructor() {
        this.models = new Map();
        this.userProfiles = new Map();
        this.recommendations = new Map();
        this.predictions = new Map();
        this.trainingData = new Map();
        this.mlFeatures = new Map();
        this.init();
    }

    init() {
        this.initializeMLModels();
        this.createMLInterface();
        this.setupPersonalization();
        this.loadTrainingData();
        this.startMLProcessing();
        console.log('✅ Machine Learning Engine initialized');
    }

    initializeMLModels() {
        // Initialize various ML models
        this.models.set('recommendation', {
            name: 'Mod Recommendation Engine',
            type: 'collaborative_filtering',
            accuracy: 0.89,
            status: 'trained',
            lastUpdated: new Date(),
            features: ['user_preferences', 'download_history', 'ratings', 'game_compatibility']
        });

        this.models.set('content_analysis', {
            name: 'Content Analysis Model',
            type: 'natural_language_processing',
            accuracy: 0.92,
            status: 'training',
            lastUpdated: new Date(),
            features: ['description_text', 'tags', 'reviews', 'metadata']
        });

        this.models.set('quality_prediction', {
            name: 'Mod Quality Predictor',
            type: 'regression',
            accuracy: 0.85,
            status: 'trained',
            lastUpdated: new Date(),
            features: ['file_size', 'complexity', 'creator_reputation', 'testing_metrics']
        });

        this.models.set('user_behavior', {
            name: 'User Behavior Analyzer',
            type: 'clustering',
            accuracy: 0.78,
            status: 'trained',
            lastUpdated: new Date(),
            features: ['session_duration', 'click_patterns', 'search_queries', 'preferences']
        });

        this.models.set('fraud_detection', {
            name: 'Fraud Detection System',
            type: 'anomaly_detection',
            accuracy: 0.95,
            status: 'active',
            lastUpdated: new Date(),
            features: ['payment_patterns', 'account_behavior', 'ip_analysis', 'device_fingerprint']
        });
    }

    createMLInterface() {
        // Add ML section to main page
        this.addMLSection();
        
        // Create ML dashboard
        this.createMLDashboard();
        
        // Create personalization panel
        this.createPersonalizationPanel();
        
        // Add ML navigation
        this.addMLNav();
    }

    addMLSection() {
        const vrArSection = document.getElementById('vr-ar');
        if (vrArSection) {
            const mlSection = document.createElement('section');
            mlSection.className = 'section ml-section';
            mlSection.id = 'machine-learning';
            mlSection.innerHTML = `
                <div class="container">
                    <div class="section-header fade-in">
                        <h2 class="section-title">
                            <i class="fas fa-brain"></i> AI-Powered Intelligence
                        </h2>
                        <p class="section-subtitle">Advanced machine learning algorithms that learn from your preferences and behavior</p>
                    </div>
                    
                    <div class="ml-features-grid">
                        <div class="ml-feature-card recommendation-card">
                            <div class="ml-icon">
                                <i class="fas fa-magic"></i>
                            </div>
                            <h3>Smart Recommendations</h3>
                            <p>AI learns your preferences to suggest perfect mods</p>
                            <div class="ml-accuracy">
                                <span class="accuracy-label">Accuracy:</span>
                                <span class="accuracy-value">89%</span>
                            </div>
                            <button onclick="showRecommendations()" class="btn btn-primary">
                                Get Recommendations
                            </button>
                        </div>
                        
                        <div class="ml-feature-card analysis-card">
                            <div class="ml-icon">
                                <i class="fas fa-search-plus"></i>
                            </div>
                            <h3>Content Analysis</h3>
                            <p>Natural language processing for better mod discovery</p>
                            <div class="ml-accuracy">
                                <span class="accuracy-label">Accuracy:</span>
                                <span class="accuracy-value">92%</span>
                            </div>
                            <button onclick="analyzeContent()" class="btn btn-primary">
                                Analyze Mods
                            </button>
                        </div>
                        
                        <div class="ml-feature-card prediction-card">
                            <div class="ml-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h3>Quality Prediction</h3>
                            <p>Predict mod quality before you download</p>
                            <div class="ml-accuracy">
                                <span class="accuracy-label">Accuracy:</span>
                                <span class="accuracy-value">85%</span>
                            </div>
                            <button onclick="predictQuality()" class="btn btn-primary">
                                Check Quality
                            </button>
                        </div>
                        
                        <div class="ml-feature-card behavior-card">
                            <div class="ml-icon">
                                <i class="fas fa-user-cog"></i>
                            </div>
                            <h3>Behavior Analysis</h3>
                            <p>Understand your gaming patterns and preferences</p>
                            <div class="ml-accuracy">
                                <span class="accuracy-label">Accuracy:</span>
                                <span class="accuracy-value">78%</span>
                            </div>
                            <button onclick="analyzeBehavior()" class="btn btn-primary">
                                View Insights
                            </button>
                        </div>
                        
                        <div class="ml-feature-card security-card">
                            <div class="ml-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h3>Fraud Detection</h3>
                            <p>Advanced security using anomaly detection</p>
                            <div class="ml-accuracy">
                                <span class="accuracy-label">Accuracy:</span>
                                <span class="accuracy-value">95%</span>
                            </div>
                            <button onclick="checkSecurity()" class="btn btn-primary">
                                Security Status
                            </button>
                        </div>
                        
                        <div class="ml-feature-card personalization-card">
                            <div class="ml-icon">
                                <i class="fas fa-user-circle"></i>
                            </div>
                            <h3>Personalization</h3>
                            <p>Customize your experience with AI insights</p>
                            <div class="ml-accuracy">
                                <span class="accuracy-label">Learning:</span>
                                <span class="accuracy-value">Active</span>
                            </div>
                            <button onclick="openPersonalization()" class="btn btn-primary">
                                Personalize
                            </button>
                        </div>
                    </div>
                    
                    <div class="ml-insights">
                        <h3>AI Insights & Analytics</h3>
                        <div class="insights-grid">
                            <div class="insight-card">
                                <div class="insight-icon">
                                    <i class="fas fa-trending-up"></i>
                                </div>
                                <div class="insight-content">
                                    <h4>Trending Predictions</h4>
                                    <p>AI predicts "Cyberpunk Graphics Overhaul" will be the next trending mod</p>
                                    <div class="insight-confidence">Confidence: 87%</div>
                                </div>
                            </div>
                            
                            <div class="insight-card">
                                <div class="insight-icon">
                                    <i class="fas fa-users"></i>
                                </div>
                                <div class="insight-content">
                                    <h4>User Clustering</h4>
                                    <p>You belong to the "Graphics Enthusiast" user group</p>
                                    <div class="insight-confidence">Match: 92%</div>
                                </div>
                            </div>
                            
                            <div class="insight-card">
                                <div class="insight-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="insight-content">
                                    <h4>Optimal Timing</h4>
                                    <p>Best time to release your mod: Friday 3-5 PM</p>
                                    <div class="insight-confidence">Success Rate: +34%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ml-stats">
                        <div class="ml-stat">
                            <div class="stat-value" id="mlProcessedMods">45,892</div>
                            <div class="stat-label">Mods Analyzed</div>
                        </div>
                        <div class="ml-stat">
                            <div class="stat-value" id="mlRecommendations">1.2M</div>
                            <div class="stat-label">Recommendations Made</div>
                        </div>
                        <div class="ml-stat">
                            <div class="stat-value" id="mlAccuracy">89.3%</div>
                            <div class="stat-label">Average Accuracy</div>
                        </div>
                        <div class="ml-stat">
                            <div class="stat-value" id="mlModelsActive">5</div>
                            <div class="stat-label">Active Models</div>
                        </div>
                    </div>
                </div>
            `;
            
            vrArSection.parentNode.insertBefore(mlSection, vrArSection.nextSibling);
        }
    }

    createMLDashboard() {
        const dashboard = document.createElement('div');
        dashboard.id = 'mlDashboard';
        dashboard.className = 'ml-dashboard modal';
        dashboard.innerHTML = `
            <div class="modal-content ml-modal-content">
                <span class="close" onclick="closeMLDashboard()">&times;</span>
                <div class="ml-dashboard-content">
                    <div class="ml-dashboard-header">
                        <h2><i class="fas fa-brain"></i> Machine Learning Dashboard</h2>
                        <div class="ml-dashboard-actions">
                            <button onclick="trainModels()" class="btn btn-primary">
                                <i class="fas fa-play"></i> Train Models
                            </button>
                            <button onclick="exportMLData()" class="btn btn-outline">
                                <i class="fas fa-download"></i> Export Data
                            </button>
                        </div>
                    </div>
                    
                    <div class="ml-models-overview">
                        <h3>Model Performance</h3>
                        <div class="models-grid" id="modelsGrid">
                            <!-- Models will be loaded here -->
                        </div>
                    </div>
                    
                    <div class="ml-training-status">
                        <h3>Training Status</h3>
                        <div class="training-progress">
                            <div class="training-item">
                                <div class="training-info">
                                    <span class="training-model">Content Analysis Model</span>
                                    <span class="training-status">Training...</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 67%"></div>
                                </div>
                                <span class="progress-text">67%</span>
                            </div>
                            
                            <div class="training-item">
                                <div class="training-info">
                                    <span class="training-model">Recommendation Engine</span>
                                    <span class="training-status">Completed</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 100%"></div>
                                </div>
                                <span class="progress-text">100%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ml-data-insights">
                        <h3>Data Insights</h3>
                        <div class="insights-charts">
                            <div class="chart-container">
                                <h4>Model Accuracy Over Time</h4>
                                <canvas id="accuracyChart" width="400" height="200"></canvas>
                            </div>
                            <div class="chart-container">
                                <h4>Prediction Confidence Distribution</h4>
                                <canvas id="confidenceChart" width="400" height="200"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(dashboard);
    }

    createPersonalizationPanel() {
        const panel = document.createElement('div');
        panel.id = 'personalizationPanel';
        panel.className = 'personalization-panel';
        panel.innerHTML = `
            <div class="personalization-content">
                <div class="personalization-header">
                    <h3><i class="fas fa-user-circle"></i> AI Personalization</h3>
                    <button onclick="togglePersonalizationPanel()" class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="personalization-tabs">
                    <button class="personalization-tab active" onclick="showPersonalizationTab('preferences')">
                        <i class="fas fa-heart"></i> Preferences
                    </button>
                    <button class="personalization-tab" onclick="showPersonalizationTab('behavior')">
                        <i class="fas fa-chart-bar"></i> Behavior
                    </button>
                    <button class="personalization-tab" onclick="showPersonalizationTab('recommendations')">
                        <i class="fas fa-magic"></i> Recommendations
                    </button>
                </div>
                
                <div class="personalization-content-area">
                    <div id="preferencesPersonalizationTab" class="personalization-tab-content active">
                        <div class="preference-section">
                            <h4>Gaming Preferences</h4>
                            <div class="preference-grid">
                                <div class="preference-item">
                                    <label>Favorite Games</label>
                                    <div class="game-preferences">
                                        <div class="game-pref" data-game="cyberpunk">
                                            <span>Cyberpunk 2077</span>
                                            <div class="preference-level" data-level="5"></div>
                                        </div>
                                        <div class="game-pref" data-game="skyrim">
                                            <span>Skyrim</span>
                                            <div class="preference-level" data-level="4"></div>
                                        </div>
                                        <div class="game-pref" data-game="gta">
                                            <span>GTA V</span>
                                            <div class="preference-level" data-level="3"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="preference-item">
                                    <label>Mod Categories</label>
                                    <div class="category-preferences">
                                        <div class="category-pref" data-category="graphics">
                                            <span>Graphics</span>
                                            <div class="preference-level" data-level="5"></div>
                                        </div>
                                        <div class="category-pref" data-category="gameplay">
                                            <span>Gameplay</span>
                                            <div class="preference-level" data-level="4"></div>
                                        </div>
                                        <div class="category-pref" data-category="audio">
                                            <span>Audio</span>
                                            <div class="preference-level" data-level="2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="ai-learning-section">
                            <h4>AI Learning Settings</h4>
                            <div class="learning-controls">
                                <div class="learning-toggle">
                                    <label>
                                        <input type="checkbox" id="enableLearning" checked>
                                        Enable AI Learning from my behavior
                                    </label>
                                </div>
                                <div class="learning-toggle">
                                    <label>
                                        <input type="checkbox" id="enableRecommendations" checked>
                                        Show personalized recommendations
                                    </label>
                                </div>
                                <div class="learning-toggle">
                                    <label>
                                        <input type="checkbox" id="enablePredictions">
                                        Enable quality predictions
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="behaviorPersonalizationTab" class="personalization-tab-content">
                        <div class="behavior-analysis">
                            <h4>Your Gaming Behavior</h4>
                            <div class="behavior-insights">
                                <div class="behavior-insight">
                                    <div class="insight-metric">
                                        <span class="metric-value">2.5 hrs</span>
                                        <span class="metric-label">Avg. Session Time</span>
                                    </div>
                                    <div class="insight-description">
                                        You spend quality time exploring mods
                                    </div>
                                </div>
                                
                                <div class="behavior-insight">
                                    <div class="insight-metric">
                                        <span class="metric-value">Graphics</span>
                                        <span class="metric-label">Top Interest</span>
                                    </div>
                                    <div class="insight-description">
                                        You prefer visual enhancement mods
                                    </div>
                                </div>
                                
                                <div class="behavior-insight">
                                    <div class="insight-metric">
                                        <span class="metric-value">Evening</span>
                                        <span class="metric-label">Peak Activity</span>
                                    </div>
                                    <div class="insight-description">
                                        Most active between 7-10 PM
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="user-cluster">
                            <h4>User Profile</h4>
                            <div class="cluster-info">
                                <div class="cluster-badge graphics-enthusiast">
                                    Graphics Enthusiast
                                </div>
                                <p>Based on your behavior, you belong to the "Graphics Enthusiast" cluster. Users in this group typically:</p>
                                <ul>
                                    <li>Download high-quality visual mods</li>
                                    <li>Prefer 4K textures and enhanced lighting</li>
                                    <li>Value performance optimization</li>
                                    <li>Share screenshots and visual content</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div id="recommendationsPersonalizationTab" class="personalization-tab-content">
                        <div class="smart-recommendations">
                            <h4>AI-Powered Recommendations</h4>
                            <div class="recommendation-list" id="personalizedRecommendations">
                                <!-- Recommendations will be loaded here -->
                            </div>
                        </div>
                        
                        <div class="recommendation-settings">
                            <h4>Recommendation Settings</h4>
                            <div class="rec-setting">
                                <label>Recommendation Frequency</label>
                                <select id="recFrequency">
                                    <option value="daily">Daily</option>
                                    <option value="weekly" selected>Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <div class="rec-setting">
                                <label>Diversity Level</label>
                                <input type="range" id="recDiversity" min="0" max="100" value="70">
                                <span>70% (Balanced)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
    }

    addMLNav() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const mlNav = document.createElement('div');
            mlNav.className = 'nav-dropdown';
            mlNav.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" onclick="toggleMLDropdown()">
                    AI/ML <i class="fas fa-chevron-down"></i>
                </a>
                <div class="dropdown-menu" id="mlDropdown">
                    <a href="#machine-learning" onclick="scrollToML()"><i class="fas fa-brain"></i> ML Hub</a>
                    <a href="#" onclick="showRecommendations()"><i class="fas fa-magic"></i> Smart Recommendations</a>
                    <a href="#" onclick="openPersonalization()"><i class="fas fa-user-circle"></i> Personalization</a>
                    <a href="#" onclick="showMLDashboard()"><i class="fas fa-chart-line"></i> ML Dashboard</a>
                    <a href="#" onclick="analyzeContent()"><i class="fas fa-search-plus"></i> Content Analysis</a>
                    <a href="#" onclick="predictQuality()"><i class="fas fa-chart-bar"></i> Quality Prediction</a>
                </div>
            `;
            navMenu.insertBefore(mlNav, navMenu.children[8]);
        }
    }

    setupPersonalization() {
        // Initialize user profiling
        this.userProfile = {
            preferences: {
                games: new Map([
                    ['cyberpunk', 5],
                    ['skyrim', 4],
                    ['gta', 3],
                    ['minecraft', 2]
                ]),
                categories: new Map([
                    ['graphics', 5],
                    ['gameplay', 4],
                    ['audio', 2],
                    ['ui', 3]
                ]),
                complexity: 'advanced',
                priceRange: [0, 50]
            },
            behavior: {
                sessionDuration: 150, // minutes
                peakHours: [19, 22], // 7-10 PM
                downloadFrequency: 'weekly',
                searchPatterns: ['graphics', 'overhaul', '4k', 'enhanced']
            },
            cluster: 'graphics_enthusiast'
        };

        this.userProfiles.set('current_user', this.userProfile);
    }

    loadTrainingData() {
        // Simulate loading training data
        this.trainingData.set('user_interactions', {
            downloads: 15420,
            ratings: 8930,
            searches: 45670,
            views: 125000
        });

        this.trainingData.set('mod_features', {
            descriptions: 12500,
            tags: 8900,
            categories: 450,
            ratings: 67800
        });

        this.trainingData.set('behavioral_patterns', {
            sessions: 89000,
            clickstreams: 234000,
            preferences: 45600,
            feedback: 23400
        });
    }

    startMLProcessing() {
        // Start continuous ML processing
        this.processRecommendations();
        this.analyzeUserBehavior();
        this.updateModels();
        
        // Set up periodic updates
        setInterval(() => {
            this.processRecommendations();
        }, 300000); // Every 5 minutes

        setInterval(() => {
            this.analyzeUserBehavior();
        }, 600000); // Every 10 minutes

        setInterval(() => {
            this.updateModels();
        }, 3600000); // Every hour
    }

    processRecommendations() {
        // Generate personalized recommendations
        const recommendations = [
            {
                id: 1,
                modName: 'Ultra Graphics Enhancement',
                game: 'Cyberpunk 2077',
                confidence: 0.92,
                reason: 'Based on your graphics preferences',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop'
            },
            {
                id: 2,
                modName: 'Skyrim Visual Overhaul',
                game: 'Skyrim',
                confidence: 0.87,
                reason: 'Similar users also liked this',
                image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&h=200&fit=crop'
            },
            {
                id: 3,
                modName: 'Performance Optimizer Pack',
                game: 'Multiple',
                confidence: 0.81,
                reason: 'Matches your system specs',
                image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop'
            }
        ];

        recommendations.forEach(rec => {
            this.recommendations.set(rec.id, rec);
        });

        this.renderRecommendations();
    }

    analyzeUserBehavior() {
        // Analyze current user behavior
        const behaviorMetrics = {
            sessionTime: Math.random() * 180 + 60, // 60-240 minutes
            clickRate: Math.random() * 0.1 + 0.05, // 5-15%
            conversionRate: Math.random() * 0.05 + 0.02, // 2-7%
            engagementScore: Math.random() * 0.4 + 0.6 // 60-100%
        };

        console.log('📊 Behavior Analysis:', behaviorMetrics);
    }

    updateModels() {
        // Simulate model updates
        this.models.forEach((model, key) => {
            if (model.status === 'training') {
                // Simulate training progress
                const progress = Math.random() * 0.1 + 0.05;
                model.accuracy = Math.min(0.99, model.accuracy + progress);
                
                if (model.accuracy > 0.95) {
                    model.status = 'trained';
                }
            }
        });

        this.renderModelsGrid();
    }

    renderRecommendations() {
        const recommendationsList = document.getElementById('personalizedRecommendations');
        if (!recommendationsList) return;

        const recommendationsHTML = Array.from(this.recommendations.values()).map(rec => `
            <div class="recommendation-item">
                <div class="rec-image">
                    <img src="${rec.image}" alt="${rec.modName}">
                </div>
                <div class="rec-info">
                    <h5 class="rec-name">${rec.modName}</h5>
                    <div class="rec-game">${rec.game}</div>
                    <div class="rec-reason">${rec.reason}</div>
                    <div class="rec-confidence">
                        <span class="confidence-label">Confidence:</span>
                        <span class="confidence-value">${Math.round(rec.confidence * 100)}%</span>
                    </div>
                </div>
                <div class="rec-actions">
                    <button onclick="viewRecommendedMod(${rec.id})" class="btn btn-primary btn-sm">
                        View Mod
                    </button>
                </div>
            </div>
        `).join('');

        recommendationsList.innerHTML = recommendationsHTML;
    }

    renderModelsGrid() {
        const modelsGrid = document.getElementById('modelsGrid');
        if (!modelsGrid) return;

        const modelsHTML = Array.from(this.models.values()).map(model => `
            <div class="model-card ${model.status}">
                <div class="model-header">
                    <h4 class="model-name">${model.name}</h4>
                    <div class="model-status ${model.status}">${model.status}</div>
                </div>
                <div class="model-metrics">
                    <div class="model-metric">
                        <span class="metric-label">Type:</span>
                        <span class="metric-value">${model.type.replace('_', ' ')}</span>
                    </div>
                    <div class="model-metric">
                        <span class="metric-label">Accuracy:</span>
                        <span class="metric-value">${Math.round(model.accuracy * 100)}%</span>
                    </div>
                    <div class="model-metric">
                        <span class="metric-label">Features:</span>
                        <span class="metric-value">${model.features.length}</span>
                    </div>
                </div>
                <div class="model-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${model.accuracy * 100}%"></div>
                    </div>
                </div>
            </div>
        `).join('');

        modelsGrid.innerHTML = modelsHTML;
    }

    addMLStyles() {
        const styles = `
            <style>
            .ml-section {
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(6, 182, 212, 0.05));
                border-top: 1px solid rgba(16, 185, 129, 0.2);
            }
            
            .ml-features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-bottom: 3rem;
            }
            
            .ml-feature-card {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 2rem;
                text-align: center;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .ml-feature-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #10b981, #06b6d4);
            }
            
            .ml-feature-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 25px 50px rgba(16, 185, 129, 0.3);
            }
            
            .ml-icon {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(135deg, #10b981, #06b6d4);
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                font-size: 2rem;
                color: white;
            }
            
            .recommendation-card .ml-icon {
                background: linear-gradient(135deg, #8B5CF6, #A855F7);
            }
            
            .analysis-card .ml-icon {
                background: linear-gradient(135deg, #3B82F6, #1D4ED8);
            }
            
            .prediction-card .ml-icon {
                background: linear-gradient(135deg, #F59E0B, #D97706);
            }
            
            .behavior-card .ml-icon {
                background: linear-gradient(135deg, #EF4444, #DC2626);
            }
            
            .security-card .ml-icon {
                background: linear-gradient(135deg, #10B981, #059669);
            }
            
            .personalization-card .ml-icon {
                background: linear-gradient(135deg, #EC4899, #BE185D);
            }
            
            .ml-accuracy {
                margin: 1rem 0;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 0.5rem;
            }
            
            .accuracy-label {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .accuracy-value {
                color: #10b981;
                font-weight: 700;
                font-size: 1.1rem;
            }
            
            .ml-insights {
                margin-bottom: 3rem;
            }
            
            .ml-insights h3 {
                font-size: 2rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 2rem;
                text-align: center;
            }
            
            .insights-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
            }
            
            .insight-card {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 1.5rem;
                display: flex;
                align-items: flex-start;
                gap: 1rem;
            }
            
            .insight-icon {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #10b981, #06b6d4);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                color: white;
                flex-shrink: 0;
            }
            
            .insight-content h4 {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 0.5rem 0;
            }
            
            .insight-content p {
                color: var(--text-secondary);
                margin-bottom: 0.5rem;
                line-height: 1.5;
            }
            
            .insight-confidence {
                color: #10b981;
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .ml-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
                padding: 2rem;
                background: var(--bg-secondary);
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
            }
            
            .ml-stat {
                text-align: center;
            }
            
            .ml-stat .stat-value {
                font-size: 2.5rem;
                font-weight: 700;
                color: #10b981;
                margin-bottom: 0.5rem;
                display: block;
            }
            
            .ml-stat .stat-label {
                color: var(--text-secondary);
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .ml-modal-content {
                max-width: 1400px;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .ml-dashboard-content {
                padding: 2rem;
            }
            
            .ml-dashboard-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .models-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .model-card {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 1.5rem;
                transition: all 0.3s ease;
            }
            
            .model-card.trained {
                border-color: #10b981;
            }
            
            .model-card.training {
                border-color: #f59e0b;
            }
            
            .model-card.active {
                border-color: #3b82f6;
            }
            
            .model-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 1rem;
            }
            
            .model-name {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0;
            }
            
            .model-status {
                padding: 0.25rem 0.75rem;
                border-radius: var(--radius-full);
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
            }
            
            .model-status.trained {
                background: rgba(16, 185, 129, 0.2);
                color: #10b981;
            }
            
            .model-status.training {
                background: rgba(245, 158, 11, 0.2);
                color: #f59e0b;
            }
            
            .model-status.active {
                background: rgba(59, 130, 246, 0.2);
                color: #3b82f6;
            }
            
            .model-metrics {
                margin-bottom: 1rem;
            }
            
            .model-metric {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
            }
            
            .metric-label {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .metric-value {
                color: var(--text-primary);
                font-weight: 500;
                text-transform: capitalize;
            }
            
            .model-progress {
                margin-top: 1rem;
            }
            
            .progress-bar {
                height: 8px;
                background: var(--bg-tertiary);
                border-radius: var(--radius-full);
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #10b981, #06b6d4);
                transition: width 0.3s ease;
            }
            
            .personalization-panel {
                position: fixed;
                top: 0;
                right: -500px;
                width: 500px;
                height: 100vh;
                background: var(--bg-primary);
                border-left: 1px solid var(--border-color);
                z-index: 10006;
                transition: right 0.3s ease;
                overflow-y: auto;
            }
            
            .personalization-panel.active {
                right: 0;
            }
            
            .personalization-content {
                padding: 1.5rem;
            }
            
            .personalization-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .personalization-tabs {
                display: flex;
                margin-bottom: 2rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .personalization-tab {
                flex: 1;
                padding: 1rem;
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.3s ease;
                border-bottom: 2px solid transparent;
                font-size: 0.9rem;
            }
            
            .personalization-tab.active {
                color: var(--accent-primary);
                border-bottom-color: var(--accent-primary);
            }
            
            .personalization-tab-content {
                display: none;
            }
            
            .personalization-tab-content.active {
                display: block;
            }
            
            .preference-section,
            .ai-learning-section {
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .preference-section h4,
            .ai-learning-section h4 {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 1rem 0;
            }
            
            .game-preferences,
            .category-preferences {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .game-pref,
            .category-pref {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem;
                background: var(--bg-secondary);
                border-radius: var(--radius-md);
            }
            
            .preference-level {
                display: flex;
                gap: 0.25rem;
            }
            
            .preference-level::before {
                content: '';
                width: 60px;
                height: 8px;
                background: var(--bg-tertiary);
                border-radius: var(--radius-full);
                position: relative;
            }
            
            .preference-level[data-level="5"]::before {
                background: linear-gradient(90deg, #10b981 100%, var(--bg-tertiary) 100%);
            }
            
            .preference-level[data-level="4"]::before {
                background: linear-gradient(90deg, #10b981 80%, var(--bg-tertiary) 80%);
            }
            
            .preference-level[data-level="3"]::before {
                background: linear-gradient(90deg, #f59e0b 60%, var(--bg-tertiary) 60%);
            }
            
            .preference-level[data-level="2"]::before {
                background: linear-gradient(90deg, #ef4444 40%, var(--bg-tertiary) 40%);
            }
            
            .learning-controls {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .learning-toggle label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-primary);
                cursor: pointer;
            }
            
            .behavior-analysis {
                margin-bottom: 2rem;
            }
            
            .behavior-insights {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .behavior-insight {
                background: var(--bg-secondary);
                border-radius: var(--radius-md);
                padding: 1rem;
            }
            
            .insight-metric {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            
            .metric-value {
                font-size: 1.2rem;
                font-weight: 700;
                color: #10b981;
            }
            
            .metric-label {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .insight-description {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .cluster-badge {
                display: inline-block;
                padding: 0.5rem 1rem;
                background: linear-gradient(135deg, #10b981, #06b6d4);
                color: white;
                border-radius: var(--radius-full);
                font-weight: 600;
                margin-bottom: 1rem;
            }
            
            .recommendation-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .recommendation-item {
                display: flex;
                gap: 1rem;
                background: var(--bg-secondary);
                border-radius: var(--radius-md);
                padding: 1rem;
                align-items: center;
            }
            
            .rec-image {
                width: 60px;
                height: 40px;
                border-radius: var(--radius-sm);
                overflow: hidden;
                flex-shrink: 0;
            }
            
            .rec-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .rec-info {
                flex: 1;
            }
            
            .rec-name {
                font-size: 1rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 0.25rem 0;
            }
            
            .rec-game {
                color: var(--accent-primary);
                font-size: 0.8rem;
                margin-bottom: 0.25rem;
            }
            
            .rec-reason {
                color: var(--text-secondary);
                font-size: 0.8rem;
                margin-bottom: 0.25rem;
            }
            
            .rec-confidence {
                font-size: 0.8rem;
            }
            
            .confidence-label {
                color: var(--text-secondary);
            }
            
            .confidence-value {
                color: #10b981;
                font-weight: 600;
            }
            
            @media (max-width: 768px) {
                .ml-features-grid {
                    grid-template-columns: 1fr;
                }
                
                .ml-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .insights-grid {
                    grid-template-columns: 1fr;
                }
                
                .models-grid {
                    grid-template-columns: 1fr;
                }
                
                .personalization-panel {
                    width: 100%;
                    right: -100%;
                }
                
                .personalization-tabs {
                    flex-direction: column;
                }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Global functions for ML features
window.toggleMLDropdown = function() {
    const dropdown = document.getElementById('mlDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
};

window.scrollToML = function() {
    const section = document.getElementById('machine-learning');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

window.showRecommendations = function() {
    console.log('🎯 Showing AI recommendations...');
    openPersonalization();
    showPersonalizationTab('recommendations');
};

window.analyzeContent = function() {
    console.log('🔍 Analyzing content with AI...');
    // Implementation for content analysis
};

window.predictQuality = function() {
    console.log('📊 Predicting mod quality...');
    // Implementation for quality prediction
};

window.analyzeBehavior = function() {
    console.log('👤 Analyzing user behavior...');
    openPersonalization();
    showPersonalizationTab('behavior');
};

window.checkSecurity = function() {
    console.log('🛡️ Checking security status...');
    // Implementation for security check
};

window.openPersonalization = function() {
    const panel = document.getElementById('personalizationPanel');
    if (panel) {
        panel.classList.add('active');
    }
};

window.togglePersonalizationPanel = function() {
    const panel = document.getElementById('personalizationPanel');
    if (panel) {
        panel.classList.toggle('active');
    }
};

window.showPersonalizationTab = function(tabName) {
    // Hide all tabs
    document.querySelectorAll('.personalization-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.personalization-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + 'PersonalizationTab');
    const selectedButton = document.querySelector(`[onclick="showPersonalizationTab('${tabName}')"]`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedButton) selectedButton.classList.add('active');
};

window.showMLDashboard = function() {
    const dashboard = document.getElementById('mlDashboard');
    if (dashboard) {
        dashboard.style.display = 'flex';
    }
};

window.closeMLDashboard = function() {
    const dashboard = document.getElementById('mlDashboard');
    if (dashboard) {
        dashboard.style.display = 'none';
    }
};

window.trainModels = function() {
    console.log('🏋️ Training ML models...');
    // Implementation for model training
};

window.exportMLData = function() {
    console.log('📤 Exporting ML data...');
    // Implementation for data export
};

window.viewRecommendedMod = function(recId) {
    console.log('👁️ Viewing recommended mod:', recId);
    // Implementation for viewing recommended mod
};

// Initialize Machine Learning Engine
document.addEventListener('DOMContentLoaded', () => {
    window.mlEngine = new MachineLearningEngine();
    
    // Add styles after DOM is loaded
    setTimeout(() => {
        window.mlEngine.addMLStyles();
    }, 100);
});

console.log('✅ Machine Learning Engine loaded successfully!');