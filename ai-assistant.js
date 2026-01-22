// AI ASSISTANT SYSTEM - Advanced AI-powered assistance for modding and gaming
console.log('🤖 Loading AI Assistant System...');

class AIAssistantSystem {
    constructor() {
        this.conversations = new Map();
        this.aiPersonalities = new Map();
        this.knowledgeBase = new Map();
        this.activeAssistants = new Map();
        this.init();
    }

    init() {
        this.setupAIPersonalities();
        this.createAIInterface();
        this.loadKnowledgeBase();
        this.initializeAIFeatures();
        console.log('✅ AI Assistant System initialized');
    }

    setupAIPersonalities() {
        const personalities = [
            {
                id: 'modding-expert',
                name: 'ModBot Pro',
                description: 'Expert in mod development, installation, and troubleshooting',
                avatar: '🔧',
                specialties: ['Mod Development', 'Installation Guides', 'Troubleshooting', 'Best Practices'],
                personality: 'Professional and detailed, focuses on technical accuracy'
            },
            {
                id: 'creative-assistant',
                name: 'CreativeAI',
                description: 'Helps with creative aspects of modding and game design',
                avatar: '🎨',
                specialties: ['Creative Design', 'Art Direction', 'Storytelling', 'Asset Creation'],
                personality: 'Inspiring and imaginative, encourages creative thinking'
            },
            {
                id: 'performance-optimizer',
                name: 'OptimizeBot',
                description: 'Specializes in performance optimization and system requirements',
                avatar: '⚡',
                specialties: ['Performance Tuning', 'System Optimization', 'Hardware Advice', 'Benchmarking'],
                personality: 'Analytical and precise, focuses on efficiency and performance'
            },
            {
                id: 'community-helper',
                name: 'CommunityAI',
                description: 'Assists with community management and social features',
                avatar: '👥',
                specialties: ['Community Building', 'Social Features', 'Event Planning', 'User Engagement'],
                personality: 'Friendly and social, emphasizes community building'
            },
            {
                id: 'code-mentor',
                name: 'CodeMentor',
                description: 'Programming and scripting assistance for advanced modding',
                avatar: '💻',
                specialties: ['Programming', 'Scripting', 'Code Review', 'Architecture'],
                personality: 'Patient and educational, breaks down complex concepts'
            }
        ];

        personalities.forEach(personality => {
            this.aiPersonalities.set(personality.id, personality);
        });
    }

    createAIInterface() {
        // Enhanced AI chat interface
        this.enhanceExistingChatbot();
        
        // Create AI assistant selector
        this.createAssistantSelector();
        
        // Create specialized AI panels
        this.createSpecializedPanels();
        
        // Add AI features to navigation
        this.addAINavigation();
    }

    enhanceExistingChatbot() {
        const chatbot = document.getElementById('chatbot');
        if (chatbot) {
            // Add AI personality selector to existing chatbot
            const chatHeader = chatbot.querySelector('.chatbot-header');
            if (chatHeader) {
                const aiSelector = document.createElement('div');
                aiSelector.className = 'ai-personality-selector';
                aiSelector.innerHTML = `
                    <select id="aiPersonalitySelect" onchange="switchAIPersonality(this.value)">
                        <option value="general">ExusBot General</option>
                        <option value="modding-expert">ModBot Pro 🔧</option>
                        <option value="creative-assistant">CreativeAI 🎨</option>
                        <option value="performance-optimizer">OptimizeBot ⚡</option>
                        <option value="community-helper">CommunityAI 👥</option>
                        <option value="code-mentor">CodeMentor 💻</option>
                    </select>
                `;
                chatHeader.appendChild(aiSelector);
            }

            // Add AI features panel
            const chatInput = chatbot.querySelector('.chatbot-input');
            if (chatInput) {
                const aiFeatures = document.createElement('div');
                aiFeatures.className = 'ai-features-panel';
                aiFeatures.innerHTML = `
                    <div class="ai-quick-actions">
                        <button onclick="aiAnalyzeMod()" class="ai-action-btn" title="Analyze Mod">
                            <i class="fas fa-search"></i>
                        </button>
                        <button onclick="aiGenerateCode()" class="ai-action-btn" title="Generate Code">
                            <i class="fas fa-code"></i>
                        </button>
                        <button onclick="aiOptimizePerformance()" class="ai-action-btn" title="Optimize Performance">
                            <i class="fas fa-tachometer-alt"></i>
                        </button>
                        <button onclick="aiCreateTutorial()" class="ai-action-btn" title="Create Tutorial">
                            <i class="fas fa-graduation-cap"></i>
                        </button>
                        <button onclick="aiDesignAssets()" class="ai-action-btn" title="Design Assets">
                            <i class="fas fa-palette"></i>
                        </button>
                    </div>
                `;
                chatInput.parentNode.insertBefore(aiFeatures, chatInput);
            }
        }
    }

    createAssistantSelector() {
        const selector = document.createElement('div');
        selector.id = 'aiAssistantSelector';
        selector.className = 'ai-assistant-selector';
        selector.innerHTML = `
            <div class="ai-selector-content">
                <div class="ai-selector-header">
                    <h3><i class="fas fa-robot"></i> Choose Your AI Assistant</h3>
                    <button onclick="closeAISelector()" class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="ai-personalities-grid">
                    ${Array.from(this.aiPersonalities.values()).map(personality => `
                        <div class="ai-personality-card" onclick="selectAIPersonality('${personality.id}')">
                            <div class="ai-avatar">${personality.avatar}</div>
                            <div class="ai-info">
                                <h4 class="ai-name">${personality.name}</h4>
                                <p class="ai-description">${personality.description}</p>
                                <div class="ai-specialties">
                                    ${personality.specialties.map(specialty => 
                                        `<span class="ai-specialty">${specialty}</span>`
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(selector);
    }

    createSpecializedPanels() {
        // Code Generation Panel
        const codePanel = document.createElement('div');
        codePanel.id = 'aiCodePanel';
        codePanel.className = 'ai-specialized-panel';
        codePanel.innerHTML = `
            <div class="ai-panel-content">
                <div class="ai-panel-header">
                    <h3><i class="fas fa-code"></i> AI Code Generator</h3>
                    <button onclick="closeAICodePanel()" class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="code-generator-form">
                    <div class="form-group">
                        <label>Programming Language</label>
                        <select id="codeLanguage">
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="csharp">C#</option>
                            <option value="cpp">C++</option>
                            <option value="lua">Lua</option>
                            <option value="json">JSON</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Code Type</label>
                        <select id="codeType">
                            <option value="function">Function</option>
                            <option value="class">Class</option>
                            <option value="script">Script</option>
                            <option value="config">Configuration</option>
                            <option value="shader">Shader</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="codeDescription" placeholder="Describe what you want the code to do..." rows="4"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Game/Engine</label>
                        <select id="targetEngine">
                            <option value="unity">Unity</option>
                            <option value="unreal">Unreal Engine</option>
                            <option value="minecraft">Minecraft</option>
                            <option value="skyrim">Skyrim</option>
                            <option value="gta">GTA V</option>
                            <option value="generic">Generic</option>
                        </select>
                    </div>
                    
                    <button onclick="generateCode()" class="btn btn-primary">
                        <i class="fas fa-magic"></i> Generate Code
                    </button>
                </div>
                
                <div class="code-output" id="codeOutput" style="display: none;">
                    <div class="code-output-header">
                        <h4>Generated Code</h4>
                        <div class="code-actions">
                            <button onclick="copyCode()" class="btn btn-outline btn-sm">
                                <i class="fas fa-copy"></i> Copy
                            </button>
                            <button onclick="downloadCode()" class="btn btn-outline btn-sm">
                                <i class="fas fa-download"></i> Download
                            </button>
                        </div>
                    </div>
                    <pre><code id="generatedCode"></code></pre>
                </div>
            </div>
        `;
        
        document.body.appendChild(codePanel);

        // Performance Analysis Panel
        const perfPanel = document.createElement('div');
        perfPanel.id = 'aiPerfPanel';
        perfPanel.className = 'ai-specialized-panel';
        perfPanel.innerHTML = `
            <div class="ai-panel-content">
                <div class="ai-panel-header">
                    <h3><i class="fas fa-tachometer-alt"></i> AI Performance Analyzer</h3>
                    <button onclick="closeAIPerfPanel()" class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="perf-analyzer-form">
                    <div class="form-group">
                        <label>System Specifications</label>
                        <div class="system-specs">
                            <input type="text" id="cpuSpec" placeholder="CPU (e.g., Intel i7-10700K)">
                            <input type="text" id="gpuSpec" placeholder="GPU (e.g., RTX 3070)">
                            <input type="text" id="ramSpec" placeholder="RAM (e.g., 16GB DDR4)">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Target Game</label>
                        <select id="perfTargetGame">
                            <option value="cyberpunk">Cyberpunk 2077</option>
                            <option value="skyrim">Skyrim</option>
                            <option value="gta">GTA V</option>
                            <option value="minecraft">Minecraft</option>
                            <option value="fallout">Fallout 4</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Current Performance Issues</label>
                        <textarea id="perfIssues" placeholder="Describe any performance problems you're experiencing..." rows="3"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Installed Mods</label>
                        <textarea id="installedMods" placeholder="List your installed mods (optional)..." rows="3"></textarea>
                    </div>
                    
                    <button onclick="analyzePerformance()" class="btn btn-primary">
                        <i class="fas fa-search"></i> Analyze Performance
                    </button>
                </div>
                
                <div class="perf-results" id="perfResults" style="display: none;">
                    <div class="perf-score">
                        <div class="score-circle">
                            <span id="perfScoreValue">85</span>
                            <small>Performance Score</small>
                        </div>
                    </div>
                    
                    <div class="perf-recommendations" id="perfRecommendations">
                        <!-- Recommendations will be loaded here -->
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(perfPanel);
    }

    addAINavigation() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const aiNav = document.createElement('div');
            aiNav.className = 'nav-dropdown';
            aiNav.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" onclick="toggleAIDropdown()">
                    AI Tools <i class="fas fa-chevron-down"></i>
                </a>
                <div class="dropdown-menu" id="aiDropdown">
                    <a href="#" onclick="showAISelector()"><i class="fas fa-robot"></i> Choose Assistant</a>
                    <a href="#" onclick="showAICodePanel()"><i class="fas fa-code"></i> Code Generator</a>
                    <a href="#" onclick="showAIPerfPanel()"><i class="fas fa-tachometer-alt"></i> Performance Analyzer</a>
                    <a href="#" onclick="aiAnalyzeMod()"><i class="fas fa-search"></i> Mod Analyzer</a>
                    <a href="#" onclick="aiCreateTutorial()"><i class="fas fa-graduation-cap"></i> Tutorial Creator</a>
                    <a href="#" onclick="aiDesignAssets()"><i class="fas fa-palette"></i> Asset Designer</a>
                </div>
            `;
            navMenu.insertBefore(aiNav, navMenu.children[5]);
        }
    }

    loadKnowledgeBase() {
        // Simulate loading AI knowledge base
        const knowledgeAreas = [
            {
                category: 'modding',
                topics: [
                    'Mod installation procedures',
                    'Common modding tools and frameworks',
                    'Compatibility checking methods',
                    'Performance optimization techniques',
                    'Asset creation workflows'
                ]
            },
            {
                category: 'programming',
                topics: [
                    'Game scripting languages',
                    'Shader programming',
                    'Plugin development',
                    'API integration',
                    'Code optimization patterns'
                ]
            },
            {
                category: 'troubleshooting',
                topics: [
                    'Common error messages and solutions',
                    'System compatibility issues',
                    'Performance bottlenecks',
                    'Mod conflicts resolution',
                    'Installation problems'
                ]
            }
        ];

        knowledgeAreas.forEach(area => {
            this.knowledgeBase.set(area.category, area.topics);
        });
    }

    initializeAIFeatures() {
        this.addAIStyles();
        this.setupAIEventListeners();
        this.initializeAIResponses();
    }

    setupAIEventListeners() {
        // Enhanced chat input with AI suggestions
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('input', (e) => {
                this.showAISuggestions(e.target.value);
            });
        }
    }

    initializeAIResponses() {
        // Enhanced AI response system
        this.aiResponses = {
            'modding-expert': {
                greeting: "Hello! I'm ModBot Pro, your modding expert. I can help you with mod development, installation guides, troubleshooting, and best practices. What modding challenge can I assist you with today?",
                capabilities: [
                    "Analyze mod compatibility",
                    "Generate installation guides",
                    "Debug mod conflicts",
                    "Optimize mod performance",
                    "Create mod documentation"
                ]
            },
            'creative-assistant': {
                greeting: "Hi there! I'm CreativeAI, your creative companion. I specialize in the artistic side of modding - from concept design to asset creation. Let's bring your creative vision to life!",
                capabilities: [
                    "Generate creative concepts",
                    "Design asset workflows",
                    "Create color palettes",
                    "Suggest artistic styles",
                    "Plan visual narratives"
                ]
            },
            'performance-optimizer': {
                greeting: "Greetings! I'm OptimizeBot, your performance specialist. I focus on making your games and mods run as smoothly as possible. Ready to boost your performance?",
                capabilities: [
                    "Analyze system performance",
                    "Recommend hardware upgrades",
                    "Optimize game settings",
                    "Identify bottlenecks",
                    "Create performance profiles"
                ]
            },
            'community-helper': {
                greeting: "Hey! I'm CommunityAI, here to help you build and engage with the modding community. Let's make connections and grow together!",
                capabilities: [
                    "Plan community events",
                    "Manage social features",
                    "Create engagement strategies",
                    "Moderate discussions",
                    "Build user networks"
                ]
            },
            'code-mentor': {
                greeting: "Welcome! I'm CodeMentor, your programming guide. Whether you're a beginner or expert, I'm here to help you write better code for your mods.",
                capabilities: [
                    "Generate code snippets",
                    "Review and optimize code",
                    "Explain programming concepts",
                    "Debug code issues",
                    "Suggest best practices"
                ]
            }
        };
    }

    showAISuggestions(input) {
        if (input.length < 3) return;

        // Simple AI suggestion system
        const suggestions = [
            "How do I install mods for Cyberpunk 2077?",
            "Generate a shader for water effects",
            "Optimize performance for Skyrim with 100+ mods",
            "Create a tutorial for mod installation",
            "Design assets for a medieval theme"
        ];

        const filteredSuggestions = suggestions.filter(s => 
            s.toLowerCase().includes(input.toLowerCase())
        );

        if (filteredSuggestions.length > 0) {
            this.displaySuggestions(filteredSuggestions);
        }
    }

    displaySuggestions(suggestions) {
        let suggestionsPanel = document.getElementById('aiSuggestions');
        
        if (!suggestionsPanel) {
            suggestionsPanel = document.createElement('div');
            suggestionsPanel.id = 'aiSuggestions';
            suggestionsPanel.className = 'ai-suggestions-panel';
            
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.parentNode.appendChild(suggestionsPanel);
            }
        }

        suggestionsPanel.innerHTML = suggestions.map(suggestion => `
            <div class="ai-suggestion" onclick="selectAISuggestion('${suggestion}')">
                <i class="fas fa-lightbulb"></i>
                <span>${suggestion}</span>
            </div>
        `).join('');

        suggestionsPanel.style.display = 'block';
    }

    addAIStyles() {
        const styles = `
            <style>
            .ai-personality-selector {
                margin-left: 1rem;
            }
            
            .ai-personality-selector select {
                padding: 0.5rem;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-sm);
                background: var(--bg-secondary);
                color: var(--text-primary);
                font-size: 0.9rem;
            }
            
            .ai-features-panel {
                padding: 1rem;
                border-top: 1px solid var(--border-color);
            }
            
            .ai-quick-actions {
                display: flex;
                gap: 0.5rem;
                justify-content: center;
            }
            
            .ai-action-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 1px solid var(--border-color);
                background: var(--bg-secondary);
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .ai-action-btn:hover {
                background: var(--accent-primary);
                color: white;
                transform: scale(1.1);
            }
            
            .ai-assistant-selector {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10002;
                display: none;
                align-items: center;
                justify-content: center;
            }
            
            .ai-selector-content {
                background: var(--bg-primary);
                border-radius: var(--radius-lg);
                padding: 2rem;
                max-width: 1000px;
                max-height: 80vh;
                overflow-y: auto;
                border: 1px solid var(--border-color);
            }
            
            .ai-selector-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .ai-personalities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
            }
            
            .ai-personality-card {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 1.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .ai-personality-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
                border-color: var(--accent-primary);
            }
            
            .ai-avatar {
                font-size: 3rem;
                text-align: center;
                margin-bottom: 1rem;
            }
            
            .ai-name {
                font-size: 1.3rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 0.5rem 0;
                text-align: center;
            }
            
            .ai-description {
                color: var(--text-secondary);
                text-align: center;
                margin-bottom: 1rem;
                line-height: 1.5;
            }
            
            .ai-specialties {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                justify-content: center;
            }
            
            .ai-specialty {
                background: rgba(91, 140, 255, 0.2);
                color: var(--accent-primary);
                padding: 0.25rem 0.75rem;
                border-radius: var(--radius-full);
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .ai-specialized-panel {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10003;
                display: none;
                align-items: center;
                justify-content: center;
            }
            
            .ai-panel-content {
                background: var(--bg-primary);
                border-radius: var(--radius-lg);
                padding: 2rem;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                border: 1px solid var(--border-color);
                width: 90%;
            }
            
            .ai-panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .code-generator-form, .perf-analyzer-form {
                margin-bottom: 2rem;
            }
            
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: var(--text-primary);
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                background: var(--bg-secondary);
                color: var(--text-primary);
                font-family: inherit;
            }
            
            .system-specs {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 0.5rem;
            }
            
            .code-output {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 1.5rem;
                margin-top: 2rem;
            }
            
            .code-output-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .code-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .code-output pre {
                background: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                padding: 1rem;
                overflow-x: auto;
                margin: 0;
            }
            
            .code-output code {
                color: var(--text-primary);
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                line-height: 1.5;
            }
            
            .perf-results {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 1.5rem;
                margin-top: 2rem;
            }
            
            .perf-score {
                text-align: center;
                margin-bottom: 2rem;
            }
            
            .score-circle {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
                color: white;
                font-weight: 700;
            }
            
            .score-circle span {
                font-size: 2.5rem;
                line-height: 1;
            }
            
            .score-circle small {
                font-size: 0.8rem;
                opacity: 0.9;
            }
            
            .perf-recommendations {
                background: var(--bg-tertiary);
                border-radius: var(--radius-md);
                padding: 1.5rem;
            }
            
            .ai-suggestions-panel {
                position: absolute;
                bottom: 100%;
                left: 0;
                right: 0;
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                max-height: 200px;
                overflow-y: auto;
                display: none;
                z-index: 1000;
            }
            
            .ai-suggestion {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem;
                cursor: pointer;
                transition: background 0.3s ease;
                border-bottom: 1px solid var(--border-color);
            }
            
            .ai-suggestion:hover {
                background: var(--bg-secondary);
            }
            
            .ai-suggestion:last-child {
                border-bottom: none;
            }
            
            .ai-suggestion i {
                color: var(--accent-primary);
                font-size: 0.9rem;
            }
            
            @media (max-width: 768px) {
                .ai-selector-content,
                .ai-panel-content {
                    width: 95%;
                    padding: 1rem;
                }
                
                .ai-personalities-grid {
                    grid-template-columns: 1fr;
                }
                
                .system-specs {
                    grid-template-columns: 1fr;
                }
                
                .ai-quick-actions {
                    flex-wrap: wrap;
                }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Global functions for AI assistant
window.toggleAIDropdown = function() {
    const dropdown = document.getElementById('aiDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
};

window.showAISelector = function() {
    const selector = document.getElementById('aiAssistantSelector');
    if (selector) {
        selector.style.display = 'flex';
    }
};

window.closeAISelector = function() {
    const selector = document.getElementById('aiAssistantSelector');
    if (selector) {
        selector.style.display = 'none';
    }
};

window.selectAIPersonality = function(personalityId) {
    console.log('🤖 Selecting AI personality:', personalityId);
    
    // Update chatbot personality
    const personalitySelect = document.getElementById('aiPersonalitySelect');
    if (personalitySelect) {
        personalitySelect.value = personalityId;
    }
    
    // Update chatbot greeting
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages && window.aiAssistant) {
        const personality = window.aiAssistant.aiResponses[personalityId];
        if (personality) {
            const greeting = document.createElement('div');
            greeting.className = 'message bot-message';
            greeting.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${personality.greeting}</p>
                    <div class="ai-capabilities">
                        <strong>I can help you with:</strong>
                        <ul>
                            ${personality.capabilities.map(cap => `<li>${cap}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            chatMessages.appendChild(greeting);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    closeAISelector();
};

window.switchAIPersonality = function(personalityId) {
    selectAIPersonality(personalityId);
};

window.showAICodePanel = function() {
    const panel = document.getElementById('aiCodePanel');
    if (panel) {
        panel.style.display = 'flex';
    }
};

window.closeAICodePanel = function() {
    const panel = document.getElementById('aiCodePanel');
    if (panel) {
        panel.style.display = 'none';
    }
};

window.showAIPerfPanel = function() {
    const panel = document.getElementById('aiPerfPanel');
    if (panel) {
        panel.style.display = 'flex';
    }
};

window.closeAIPerfPanel = function() {
    const panel = document.getElementById('aiPerfPanel');
    if (panel) {
        panel.style.display = 'none';
    }
};

window.generateCode = function() {
    const language = document.getElementById('codeLanguage').value;
    const type = document.getElementById('codeType').value;
    const description = document.getElementById('codeDescription').value;
    const engine = document.getElementById('targetEngine').value;
    
    console.log('🔧 Generating code:', { language, type, description, engine });
    
    // Simulate code generation
    const sampleCode = {
        javascript: `// Generated ${type} for ${engine}
function ${type}Example() {
    // ${description}
    console.log('Generated code for: ${description}');
    
    return {
        initialize: function() {
            console.log('Initializing ${type}...');
        },
        execute: function() {
            console.log('Executing ${type} logic...');
        }
    };
}`,
        python: `# Generated ${type} for ${engine}
class ${type.charAt(0).toUpperCase() + type.slice(1)}Example:
    def __init__(self):
        """${description}"""
        self.initialized = False
    
    def initialize(self):
        """Initialize the ${type}"""
        self.initialized = True
        print(f"Initializing ${type}...")
    
    def execute(self):
        """Execute ${type} logic"""
        if self.initialized:
            print(f"Executing ${type} logic...")
        else:
            print("Please initialize first!")`
    };
    
    const generatedCode = sampleCode[language] || sampleCode.javascript;
    
    document.getElementById('generatedCode').textContent = generatedCode;
    document.getElementById('codeOutput').style.display = 'block';
};

window.analyzePerformance = function() {
    const cpu = document.getElementById('cpuSpec').value;
    const gpu = document.getElementById('gpuSpec').value;
    const ram = document.getElementById('ramSpec').value;
    const game = document.getElementById('perfTargetGame').value;
    const issues = document.getElementById('perfIssues').value;
    
    console.log('⚡ Analyzing performance:', { cpu, gpu, ram, game, issues });
    
    // Simulate performance analysis
    const score = Math.floor(Math.random() * 30) + 70; // 70-100
    document.getElementById('perfScoreValue').textContent = score;
    
    const recommendations = [
        "Reduce texture quality to High instead of Ultra",
        "Disable unnecessary background processes",
        "Update graphics drivers to latest version",
        "Consider upgrading RAM to 32GB for better performance",
        "Enable DLSS/FSR if available",
        "Limit mod count to reduce memory usage"
    ];
    
    const recommendationsHTML = `
        <h4>Performance Recommendations</h4>
        <ul>
            ${recommendations.slice(0, 4).map(rec => `<li>${rec}</li>`).join('')}
        </ul>
        <div class="perf-tips">
            <h5>Additional Tips:</h5>
            <p>Based on your system specs, you should be able to run ${game} at high settings with moderate modding.</p>
        </div>
    `;
    
    document.getElementById('perfRecommendations').innerHTML = recommendationsHTML;
    document.getElementById('perfResults').style.display = 'block';
};

window.aiAnalyzeMod = function() {
    console.log('🔍 AI analyzing mod...');
    // Implementation for mod analysis
};

window.aiGenerateCode = function() {
    showAICodePanel();
};

window.aiOptimizePerformance = function() {
    showAIPerfPanel();
};

window.aiCreateTutorial = function() {
    console.log('📚 AI creating tutorial...');
    // Implementation for tutorial creation
};

window.aiDesignAssets = function() {
    console.log('🎨 AI designing assets...');
    // Implementation for asset design
};

window.selectAISuggestion = function(suggestion) {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = suggestion;
        chatInput.focus();
    }
    
    const suggestionsPanel = document.getElementById('aiSuggestions');
    if (suggestionsPanel) {
        suggestionsPanel.style.display = 'none';
    }
};

window.copyCode = function() {
    const code = document.getElementById('generatedCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        console.log('📋 Code copied to clipboard');
    });
};

window.downloadCode = function() {
    const code = document.getElementById('generatedCode').textContent;
    const language = document.getElementById('codeLanguage').value;
    const extensions = {
        javascript: 'js',
        python: 'py',
        csharp: 'cs',
        cpp: 'cpp',
        lua: 'lua',
        json: 'json'
    };
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-code.${extensions[language] || 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
};

// Initialize AI Assistant System
document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new AIAssistantSystem();
});

console.log('✅ AI Assistant System loaded successfully!');