// ADVANCED MOD SEARCH ENGINE
// Powerful search with filters, sorting, and intelligent suggestions

class AdvancedModSearch {
    constructor() {
        this.searchIndex = {};
        this.filters = {
            games: [],
            categories: [],
            tags: [],
            priceRange: [0, 100],
            rating: 0,
            downloadRange: [0, 1000000],
            dateRange: 'all',
            compatibility: 'all',
            fileSize: 'all'
        };
        this.sortOptions = {
            relevance: 'Relevance',
            newest: 'Newest First',
            oldest: 'Oldest First',
            popular: 'Most Popular',
            rating: 'Highest Rated',
            priceHigh: 'Price: High to Low',
            priceLow: 'Price: Low to High',
            sizeSmall: 'Size: Small to Large',
            sizeLarge: 'Size: Large to Small',
            nameAZ: 'Name: A-Z',
            nameZA: 'Name: Z-A'
        };
        this.currentSort = 'relevance';
        this.searchHistory = [];
        this.suggestions = [];
        
        this.init();
    }

    init() {
        this.buildSearchIndex();
        this.loadSearchHistory();
        this.createAdvancedSearchUI();
        this.setupSearchHandlers();
        this.setupFilterHandlers();
        
        console.log('🔍 Advanced Mod Search Engine Initialized');
    }

    buildSearchIndex() {
        // Build comprehensive search index
        this.searchIndex = {
            mods: [
                {
                    id: 'ultra-graphics-cyberpunk',
                    name: 'Ultra Graphics Enhancement Pack',
                    description: 'Transform Cyberpunk 2077 with stunning 8K textures, advanced ray tracing, and cinematic lighting effects',
                    game: 'Cyberpunk 2077',
                    category: 'Graphics',
                    tags: ['4K', '8K', 'Ray Tracing', 'HDR', 'Textures', 'Lighting', 'Performance', 'RTX'],
                    author: 'GraphicsMaster',
                    price: 0,
                    rating: 4.9,
                    downloads: 250000,
                    fileSize: '12.5 GB',
                    uploadDate: '2024-01-15',
                    compatibility: ['RTX 3060+', 'DLSS', '16GB RAM'],
                    requirements: 'High-end GPU required',
                    version: '2.1.0'
                },
                {
                    id: 'survival-overhaul-skyrim',
                    name: 'Hardcore Survival Overhaul',
                    description: 'Complete survival mechanics with hunger, thirst, temperature, disease, and realistic needs',
                    game: 'Skyrim',
                    category: 'Gameplay',
                    tags: ['Survival', 'Hardcore', 'Immersion', 'Realism', 'Needs', 'Temperature', 'Disease'],
                    author: 'SurvivalExpert',
                    price: 4.99,
                    rating: 4.7,
                    downloads: 180000,
                    fileSize: '450 MB',
                    uploadDate: '2024-02-20',
                    compatibility: ['SKSE64', 'SkyUI'],
                    requirements: 'SKSE64 and SkyUI required',
                    version: '3.2.1'
                },
                {
                    id: 'minecraft-shaders-ultimate',
                    name: 'Ultimate Shader Collection',
                    description: 'Breathtaking lighting, water effects, and atmospheric shaders for Minecraft',
                    game: 'Minecraft',
                    category: 'Graphics',
                    tags: ['Shaders', 'Lighting', 'Water', 'Shadows', 'Atmosphere', 'OptiFine', 'Iris'],
                    author: 'ShaderWizard',
                    price: 0,
                    rating: 4.8,
                    downloads: 500000,
                    fileSize: '200 MB',
                    uploadDate: '2024-03-10',
                    compatibility: ['OptiFine', 'Iris', 'Fabric'],
                    requirements: 'OptiFine or Iris required',
                    version: '1.4.2'
                },
                {
                    id: 'gta-realistic-physics',
                    name: 'Realistic Physics Overhaul',
                    description: 'Enhanced vehicle physics, crash mechanics, and realistic damage system',
                    game: 'GTA V',
                    category: 'Gameplay',
                    tags: ['Physics', 'Realism', 'Vehicles', 'Crashes', 'Damage', 'Simulation'],
                    author: 'PhysicsGuru',
                    price: 2.99,
                    rating: 4.6,
                    downloads: 320000,
                    fileSize: '85 MB',
                    uploadDate: '2024-01-28',
                    compatibility: ['Script Hook V', 'OpenIV'],
                    requirements: 'Script Hook V required',
                    version: '1.8.3'
                },
                {
                    id: 'witcher-combat-enhanced',
                    name: 'Enhanced Combat System',
                    description: 'Overhauled combat mechanics with new skills, animations, and difficulty scaling',
                    game: 'The Witcher 3',
                    category: 'Gameplay',
                    tags: ['Combat', 'Skills', 'Animations', 'Difficulty', 'Balance', 'Mechanics'],
                    author: 'CombatMaster',
                    price: 3.49,
                    rating: 4.8,
                    downloads: 275000,
                    fileSize: '120 MB',
                    uploadDate: '2024-02-05',
                    compatibility: ['All DLCs'],
                    requirements: 'Blood and Wine DLC recommended',
                    version: '2.0.1'
                },
                {
                    id: 'fallout-weather-system',
                    name: 'Dynamic Weather System',
                    description: 'Realistic weather patterns with storms, radiation weather, and seasonal changes',
                    game: 'Fallout 4',
                    category: 'Environment',
                    tags: ['Weather', 'Environment', 'Storms', 'Radiation', 'Seasons', 'Atmosphere'],
                    author: 'WeatherMod',
                    price: 1.99,
                    rating: 4.5,
                    downloads: 150000,
                    fileSize: '300 MB',
                    uploadDate: '2024-03-01',
                    compatibility: ['F4SE', 'All DLCs'],
                    requirements: 'F4SE required',
                    version: '1.6.0'
                },
                {
                    id: 'rust-building-plus',
                    name: 'Advanced Building System',
                    description: 'Expanded building options with new materials, structures, and decoration items',
                    game: 'Rust',
                    category: 'Building',
                    tags: ['Building', 'Construction', 'Materials', 'Decoration', 'Structures', 'Creative'],
                    author: 'BuildMaster',
                    price: 5.99,
                    rating: 4.4,
                    downloads: 95000,
                    fileSize: '180 MB',
                    uploadDate: '2024-02-15',
                    compatibility: ['Oxide', 'uMod'],
                    requirements: 'Server-side installation',
                    version: '2.3.0'
                },
                {
                    id: 'cs2-weapon-skins',
                    name: 'Premium Weapon Skin Pack',
                    description: 'High-quality weapon skins with unique designs and animations',
                    game: 'Counter-Strike 2',
                    category: 'Cosmetic',
                    tags: ['Skins', 'Weapons', 'Cosmetic', 'Design', 'Animations', 'Premium'],
                    author: 'SkinArtist',
                    price: 7.99,
                    rating: 4.7,
                    downloads: 220000,
                    fileSize: '500 MB',
                    uploadDate: '2024-03-05',
                    compatibility: ['Steam Workshop'],
                    requirements: 'Steam Workshop integration',
                    version: '1.2.0'
                }
            ],
            categories: ['Graphics', 'Gameplay', 'Environment', 'Building', 'Cosmetic', 'Audio', 'UI/UX', 'Utility'],
            games: ['Minecraft', 'Skyrim', 'Cyberpunk 2077', 'GTA V', 'The Witcher 3', 'Fallout 4', 'Rust', 'Counter-Strike 2'],
            tags: ['4K', '8K', 'Ray Tracing', 'HDR', 'Textures', 'Lighting', 'Performance', 'RTX', 'Survival', 'Hardcore', 'Immersion', 'Realism', 'Shaders', 'Physics', 'Combat', 'Weather', 'Building', 'Skins']
        };
    }

    loadSearchHistory() {
        const saved = localStorage.getItem('exuscraft_search_history');
        if (saved) {
            this.searchHistory = JSON.parse(saved);
        }
    }

    saveSearchHistory() {
        localStorage.setItem('exuscraft_search_history', JSON.stringify(this.searchHistory));
    }

    createAdvancedSearchUI() {
        // Enhanced search bar
        const searchContainer = document.querySelector('.search-bar') || document.querySelector('#gameSearch')?.parentElement;
        if (!searchContainer) return;
        
        // Replace existing search with advanced version
        searchContainer.innerHTML = `
            <div class="advanced-search-container" style="position: relative;">
                <div class="search-input-container" style="
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.1);
                    border: 2px solid rgba(91, 140, 255, 0.3);
                    border-radius: 25px;
                    padding: 0.75rem 1rem;
                    transition: all 0.3s ease;
                ">
                    <i class="fas fa-search" style="color: rgba(255, 255, 255, 0.6); margin-right: 0.75rem;"></i>
                    <input type="text" id="advancedSearch" placeholder="Search mods, games, authors..." style="
                        background: none;
                        border: none;
                        color: white;
                        font-size: 1rem;
                        flex: 1;
                        outline: none;
                    ">
                    <button id="searchFiltersToggle" style="
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 1rem;
                        cursor: pointer;
                        margin-left: 0.75rem;
                        padding: 0.25rem;
                        border-radius: 4px;
                        transition: all 0.3s ease;
                    " title="Advanced Filters">
                        <i class="fas fa-sliders-h"></i>
                    </button>
                </div>
                
                <!-- Search Suggestions -->
                <div id="searchSuggestions" style="
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(10, 14, 20, 0.95);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(91, 140, 255, 0.3);
                    border-radius: 15px;
                    margin-top: 0.5rem;
                    max-height: 300px;
                    overflow-y: auto;
                    z-index: 1000;
                    display: none;
                "></div>
                
                <!-- Advanced Filters Panel -->
                <div id="advancedFilters" style="
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(10, 14, 20, 0.95);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(91, 140, 255, 0.3);
                    border-radius: 15px;
                    margin-top: 0.5rem;
                    padding: 1.5rem;
                    z-index: 999;
                    display: none;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                ">
                    ${this.createFiltersHTML()}
                </div>
            </div>
        `;
        
        // Create search results overlay
        this.createSearchResultsOverlay();
    }

    createFiltersHTML() {
        return `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                <!-- Games Filter -->
                <div>
                    <h4 style="color: white; margin: 0 0 0.75rem 0; font-size: 0.9rem;">Games</h4>
                    <div class="filter-checkboxes" style="max-height: 150px; overflow-y: auto;">
                        ${this.searchIndex.games.map(game => `
                            <label style="display: flex; align-items: center; margin-bottom: 0.5rem; cursor: pointer;">
                                <input type="checkbox" value="${game}" class="game-filter" style="margin-right: 0.5rem;">
                                <span style="color: rgba(255, 255, 255, 0.8); font-size: 0.85rem;">${game}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Categories Filter -->
                <div>
                    <h4 style="color: white; margin: 0 0 0.75rem 0; font-size: 0.9rem;">Categories</h4>
                    <div class="filter-checkboxes" style="max-height: 150px; overflow-y: auto;">
                        ${this.searchIndex.categories.map(category => `
                            <label style="display: flex; align-items: center; margin-bottom: 0.5rem; cursor: pointer;">
                                <input type="checkbox" value="${category}" class="category-filter" style="margin-right: 0.5rem;">
                                <span style="color: rgba(255, 255, 255, 0.8); font-size: 0.85rem;">${category}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Price Range -->
                <div>
                    <h4 style="color: white; margin: 0 0 0.75rem 0; font-size: 0.9rem;">Price Range</h4>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                        <input type="range" id="priceMin" min="0" max="50" value="0" style="flex: 1;">
                        <span style="color: rgba(255, 255, 255, 0.8); font-size: 0.8rem; min-width: 60px;">$<span id="priceMinValue">0</span></span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="range" id="priceMax" min="0" max="50" value="50" style="flex: 1;">
                        <span style="color: rgba(255, 255, 255, 0.8); font-size: 0.8rem; min-width: 60px;">$<span id="priceMaxValue">50</span></span>
                    </div>
                </div>
                
                <!-- Rating Filter -->
                <div>
                    <h4 style="color: white; margin: 0 0 0.75rem 0; font-size: 0.9rem;">Minimum Rating</h4>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="range" id="ratingFilter" min="0" max="5" step="0.5" value="0" style="flex: 1;">
                        <span style="color: rgba(255, 255, 255, 0.8); font-size: 0.8rem; min-width: 60px;">
                            <span id="ratingValue">0</span>+ ⭐
                        </span>
                    </div>
                </div>
                
                <!-- File Size Filter -->
                <div>
                    <h4 style="color: white; margin: 0 0 0.75rem 0; font-size: 0.9rem;">File Size</h4>
                    <select id="fileSizeFilter" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.5rem;
                        border-radius: 6px;
                        width: 100%;
                    ">
                        <option value="all">Any Size</option>
                        <option value="small">Small (< 100MB)</option>
                        <option value="medium">Medium (100MB - 1GB)</option>
                        <option value="large">Large (1GB - 5GB)</option>
                        <option value="huge">Huge (> 5GB)</option>
                    </select>
                </div>
                
                <!-- Date Filter -->
                <div>
                    <h4 style="color: white; margin: 0 0 0.75rem 0; font-size: 0.9rem;">Upload Date</h4>
                    <select id="dateFilter" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.5rem;
                        border-radius: 6px;
                        width: 100%;
                    ">
                        <option value="all">Any Time</option>
                        <option value="week">Past Week</option>
                        <option value="month">Past Month</option>
                        <option value="3months">Past 3 Months</option>
                        <option value="year">Past Year</option>
                    </select>
                </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <button id="clearFilters" style="
                    background: none;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: rgba(255, 255, 255, 0.7);
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.85rem;
                ">Clear All</button>
                
                <div style="display: flex; gap: 0.75rem;">
                    <button id="applyFilters" style="
                        background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                        border: none;
                        color: white;
                        padding: 0.5rem 1.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 0.85rem;
                        font-weight: 600;
                    ">Apply Filters</button>
                </div>
            </div>
        `;
    }

    createSearchResultsOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'searchResultsOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            z-index: 1500;
            display: none;
            overflow-y: auto;
        `;
        
        overlay.innerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h2 style="color: white; margin: 0; font-size: 1.5rem;">Search Results</h2>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <select id="searchSort" style="
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            color: white;
                            padding: 0.5rem;
                            border-radius: 6px;
                        ">
                            ${Object.entries(this.sortOptions).map(([key, label]) => 
                                `<option value="${key}">${label}</option>`
                            ).join('')}
                        </select>
                        <button id="closeSearchResults" style="
                            background: none;
                            border: none;
                            color: rgba(255, 255, 255, 0.6);
                            font-size: 1.5rem;
                            cursor: pointer;
                        ">×</button>
                    </div>
                </div>
                
                <div id="searchResultsContainer" style="
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                ">
                    <!-- Results will be populated here -->
                </div>
                
                <div id="searchResultsStats" style="
                    text-align: center;
                    margin-top: 2rem;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.9rem;
                "></div>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }

    setupSearchHandlers() {
        const searchInput = document.getElementById('advancedSearch');
        const suggestionsContainer = document.getElementById('searchSuggestions');
        
        if (!searchInput) return;
        
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length === 0) {
                suggestionsContainer.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                this.generateSuggestions(query);
                this.showSuggestions();
            }, 300);
        });
        
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch(searchInput.value);
            }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.advanced-search-container')) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }

    setupFilterHandlers() {
        // Filters toggle
        const filtersToggle = document.getElementById('searchFiltersToggle');
        const filtersPanel = document.getElementById('advancedFilters');
        
        if (filtersToggle && filtersPanel) {
            filtersToggle.addEventListener('click', () => {
                const isVisible = filtersPanel.style.display === 'block';
                filtersPanel.style.display = isVisible ? 'none' : 'block';
                filtersToggle.style.color = isVisible ? 'rgba(255, 255, 255, 0.6)' : '#5B8CFF';
            });
        }
        
        // Price range handlers
        const priceMin = document.getElementById('priceMin');
        const priceMax = document.getElementById('priceMax');
        const priceMinValue = document.getElementById('priceMinValue');
        const priceMaxValue = document.getElementById('priceMaxValue');
        
        if (priceMin && priceMax) {
            priceMin.addEventListener('input', (e) => {
                priceMinValue.textContent = e.target.value;
                this.filters.priceRange[0] = parseInt(e.target.value);
            });
            
            priceMax.addEventListener('input', (e) => {
                priceMaxValue.textContent = e.target.value;
                this.filters.priceRange[1] = parseInt(e.target.value);
            });
        }
        
        // Rating handler
        const ratingFilter = document.getElementById('ratingFilter');
        const ratingValue = document.getElementById('ratingValue');
        
        if (ratingFilter) {
            ratingFilter.addEventListener('input', (e) => {
                ratingValue.textContent = e.target.value;
                this.filters.rating = parseFloat(e.target.value);
            });
        }
        
        // Apply filters button
        const applyFilters = document.getElementById('applyFilters');
        if (applyFilters) {
            applyFilters.addEventListener('click', () => {
                this.applyFilters();
                document.getElementById('advancedFilters').style.display = 'none';
                document.getElementById('searchFiltersToggle').style.color = 'rgba(255, 255, 255, 0.6)';
            });
        }
        
        // Clear filters button
        const clearFilters = document.getElementById('clearFilters');
        if (clearFilters) {
            clearFilters.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }
        
        // Close search results
        const closeResults = document.getElementById('closeSearchResults');
        if (closeResults) {
            closeResults.addEventListener('click', () => {
                document.getElementById('searchResultsOverlay').style.display = 'none';
            });
        }
        
        // Sort handler
        const searchSort = document.getElementById('searchSort');
        if (searchSort) {
            searchSort.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.updateSearchResults();
            });
        }
    }

    generateSuggestions(query) {
        const suggestions = [];
        const queryLower = query.toLowerCase();
        
        // Search in mod names
        this.searchIndex.mods.forEach(mod => {
            if (mod.name.toLowerCase().includes(queryLower)) {
                suggestions.push({
                    type: 'mod',
                    text: mod.name,
                    subtitle: mod.game,
                    icon: '🎮'
                });
            }
        });
        
        // Search in games
        this.searchIndex.games.forEach(game => {
            if (game.toLowerCase().includes(queryLower)) {
                suggestions.push({
                    type: 'game',
                    text: game,
                    subtitle: 'Game',
                    icon: '🎯'
                });
            }
        });
        
        // Search in categories
        this.searchIndex.categories.forEach(category => {
            if (category.toLowerCase().includes(queryLower)) {
                suggestions.push({
                    type: 'category',
                    text: category,
                    subtitle: 'Category',
                    icon: '📁'
                });
            }
        });
        
        // Search in tags
        this.searchIndex.tags.forEach(tag => {
            if (tag.toLowerCase().includes(queryLower)) {
                suggestions.push({
                    type: 'tag',
                    text: tag,
                    subtitle: 'Tag',
                    icon: '🏷️'
                });
            }
        });
        
        // Add search history
        this.searchHistory.forEach(historyItem => {
            if (historyItem.query.toLowerCase().includes(queryLower)) {
                suggestions.push({
                    type: 'history',
                    text: historyItem.query,
                    subtitle: 'Recent search',
                    icon: '🕒'
                });
            }
        });
        
        this.suggestions = suggestions.slice(0, 8); // Limit to 8 suggestions
    }

    showSuggestions() {
        const container = document.getElementById('searchSuggestions');
        if (!container || this.suggestions.length === 0) {
            container.style.display = 'none';
            return;
        }
        
        container.innerHTML = this.suggestions.map(suggestion => `
            <div class="search-suggestion" style="
                padding: 0.75rem 1rem;
                cursor: pointer;
                transition: background 0.2s ease;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            " onmouseover="this.style.background='rgba(91, 140, 255, 0.1)'" 
               onmouseout="this.style.background='transparent'"
               onclick="advancedModSearch.selectSuggestion('${suggestion.text}')">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span style="font-size: 1rem;">${suggestion.icon}</span>
                    <div>
                        <div style="color: white; font-size: 0.9rem; font-weight: 500;">${suggestion.text}</div>
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">${suggestion.subtitle}</div>
                    </div>
                </div>
            </div>
        `).join('');
        
        container.style.display = 'block';
    }

    selectSuggestion(text) {
        const searchInput = document.getElementById('advancedSearch');
        if (searchInput) {
            searchInput.value = text;
            this.performSearch(text);
        }
        document.getElementById('searchSuggestions').style.display = 'none';
    }

    performSearch(query) {
        if (!query.trim()) return;
        
        // Add to search history
        this.addToSearchHistory(query);
        
        // Perform the search
        const results = this.searchMods(query);
        
        // Show results
        this.displaySearchResults(results, query);
        
        console.log(`🔍 Search performed: "${query}" - ${results.length} results`);
    }

    searchMods(query) {
        const queryLower = query.toLowerCase();
        const results = [];
        
        this.searchIndex.mods.forEach(mod => {
            let score = 0;
            
            // Name match (highest priority)
            if (mod.name.toLowerCase().includes(queryLower)) {
                score += 10;
                if (mod.name.toLowerCase().startsWith(queryLower)) {
                    score += 5;
                }
            }
            
            // Description match
            if (mod.description.toLowerCase().includes(queryLower)) {
                score += 3;
            }
            
            // Game match
            if (mod.game.toLowerCase().includes(queryLower)) {
                score += 7;
            }
            
            // Category match
            if (mod.category.toLowerCase().includes(queryLower)) {
                score += 5;
            }
            
            // Tags match
            mod.tags.forEach(tag => {
                if (tag.toLowerCase().includes(queryLower)) {
                    score += 2;
                }
            });
            
            // Author match
            if (mod.author.toLowerCase().includes(queryLower)) {
                score += 4;
            }
            
            if (score > 0) {
                results.push({
                    ...mod,
                    searchScore: score
                });
            }
        });
        
        return this.sortResults(results);
    }

    applyFilters() {
        // Collect filter values
        const gameFilters = Array.from(document.querySelectorAll('.game-filter:checked')).map(cb => cb.value);
        const categoryFilters = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
        
        this.filters.games = gameFilters;
        this.filters.categories = categoryFilters;
        this.filters.fileSize = document.getElementById('fileSizeFilter').value;
        this.filters.dateRange = document.getElementById('dateFilter').value;
        
        // Re-run current search with filters
        const searchInput = document.getElementById('advancedSearch');
        if (searchInput && searchInput.value.trim()) {
            this.performSearch(searchInput.value);
        }
    }

    clearAllFilters() {
        // Reset all filter values
        this.filters = {
            games: [],
            categories: [],
            tags: [],
            priceRange: [0, 100],
            rating: 0,
            downloadRange: [0, 1000000],
            dateRange: 'all',
            compatibility: 'all',
            fileSize: 'all'
        };
        
        // Reset UI elements
        document.querySelectorAll('.game-filter, .category-filter').forEach(cb => cb.checked = false);
        document.getElementById('priceMin').value = 0;
        document.getElementById('priceMax').value = 100;
        document.getElementById('priceMinValue').textContent = '0';
        document.getElementById('priceMaxValue').textContent = '100';
        document.getElementById('ratingFilter').value = 0;
        document.getElementById('ratingValue').textContent = '0';
        document.getElementById('fileSizeFilter').value = 'all';
        document.getElementById('dateFilter').value = 'all';
    }

    sortResults(results) {
        switch (this.currentSort) {
            case 'relevance':
                return results.sort((a, b) => (b.searchScore || 0) - (a.searchScore || 0));
            case 'newest':
                return results.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
            case 'oldest':
                return results.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
            case 'popular':
                return results.sort((a, b) => b.downloads - a.downloads);
            case 'rating':
                return results.sort((a, b) => b.rating - a.rating);
            case 'priceHigh':
                return results.sort((a, b) => b.price - a.price);
            case 'priceLow':
                return results.sort((a, b) => a.price - b.price);
            case 'nameAZ':
                return results.sort((a, b) => a.name.localeCompare(b.name));
            case 'nameZA':
                return results.sort((a, b) => b.name.localeCompare(a.name));
            default:
                return results;
        }
    }

    displaySearchResults(results, query) {
        const overlay = document.getElementById('searchResultsOverlay');
        const container = document.getElementById('searchResultsContainer');
        const stats = document.getElementById('searchResultsStats');
        
        if (!overlay || !container) return;
        
        // Filter results based on active filters
        const filteredResults = this.filterResults(results);
        
        // Update stats
        stats.innerHTML = `
            Found ${filteredResults.length} results for "<strong>${query}</strong>"
            ${filteredResults.length !== results.length ? `(${results.length - filteredResults.length} filtered out)` : ''}
        `;
        
        // Generate result cards
        container.innerHTML = filteredResults.map(mod => `
            <div class="search-result-card" style="
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 1.5rem;
                transition: all 0.3s ease;
                cursor: pointer;
            " onmouseover="this.style.background='rgba(91, 140, 255, 0.1)'; this.style.borderColor='rgba(91, 140, 255, 0.3)'"
               onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'; this.style.borderColor='rgba(255, 255, 255, 0.1)'"
               onclick="openModDetails('${mod.id}')">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <h3 style="margin: 0; color: white; font-size: 1.1rem; font-weight: 600; line-height: 1.3;">
                        ${mod.name}
                    </h3>
                    <div style="
                        background: ${mod.price === 0 ? 'linear-gradient(135deg, #22C55E, #16A34A)' : 'linear-gradient(135deg, #5B8CFF, #C15CFF)'};
                        color: white;
                        padding: 0.25rem 0.75rem;
                        border-radius: 12px;
                        font-size: 0.8rem;
                        font-weight: 600;
                        white-space: nowrap;
                    ">${mod.price === 0 ? 'FREE' : '$' + mod.price}</div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="color: #5B8CFF; font-size: 0.9rem; font-weight: 500;">${mod.game}</span>
                    <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">${mod.category}</span>
                </div>
                
                <p style="margin: 0 0 1rem 0; color: rgba(255, 255, 255, 0.8); font-size: 0.9rem; line-height: 1.5;">
                    ${mod.description}
                </p>
                
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                    ${mod.tags.slice(0, 4).map(tag => `
                        <span style="
                            background: rgba(91, 140, 255, 0.2);
                            color: #5B8CFF;
                            padding: 0.2rem 0.5rem;
                            border-radius: 8px;
                            font-size: 0.7rem;
                            font-weight: 500;
                        ">${tag}</span>
                    `).join('')}
                    ${mod.tags.length > 4 ? `<span style="color: rgba(255, 255, 255, 0.5); font-size: 0.7rem;">+${mod.tags.length - 4} more</span>` : ''}
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; color: rgba(255, 255, 255, 0.6);">
                        <span>⭐ ${mod.rating}</span>
                        <span>📥 ${(mod.downloads / 1000).toFixed(0)}K</span>
                        <span>📦 ${mod.fileSize}</span>
                    </div>
                    <span style="color: rgba(255, 255, 255, 0.5);">by ${mod.author}</span>
                </div>
            </div>
        `).join('');
        
        // Show overlay
        overlay.style.display = 'block';
    }

    filterResults(results) {
        return results.filter(mod => {
            // Game filter
            if (this.filters.games.length > 0 && !this.filters.games.includes(mod.game)) {
                return false;
            }
            
            // Category filter
            if (this.filters.categories.length > 0 && !this.filters.categories.includes(mod.category)) {
                return false;
            }
            
            // Price filter
            if (mod.price < this.filters.priceRange[0] || mod.price > this.filters.priceRange[1]) {
                return false;
            }
            
            // Rating filter
            if (mod.rating < this.filters.rating) {
                return false;
            }
            
            // File size filter
            if (this.filters.fileSize !== 'all') {
                const sizeInMB = this.parseFileSize(mod.fileSize);
                switch (this.filters.fileSize) {
                    case 'small':
                        if (sizeInMB >= 100) return false;
                        break;
                    case 'medium':
                        if (sizeInMB < 100 || sizeInMB >= 1000) return false;
                        break;
                    case 'large':
                        if (sizeInMB < 1000 || sizeInMB >= 5000) return false;
                        break;
                    case 'huge':
                        if (sizeInMB < 5000) return false;
                        break;
                }
            }
            
            // Date filter
            if (this.filters.dateRange !== 'all') {
                const uploadDate = new Date(mod.uploadDate);
                const now = new Date();
                const daysDiff = (now - uploadDate) / (1000 * 60 * 60 * 24);
                
                switch (this.filters.dateRange) {
                    case 'week':
                        if (daysDiff > 7) return false;
                        break;
                    case 'month':
                        if (daysDiff > 30) return false;
                        break;
                    case '3months':
                        if (daysDiff > 90) return false;
                        break;
                    case 'year':
                        if (daysDiff > 365) return false;
                        break;
                }
            }
            
            return true;
        });
    }

    parseFileSize(sizeString) {
        const match = sizeString.match(/(\d+(?:\.\d+)?)\s*(MB|GB)/i);
        if (!match) return 0;
        
        const value = parseFloat(match[1]);
        const unit = match[2].toUpperCase();
        
        return unit === 'GB' ? value * 1000 : value;
    }

    addToSearchHistory(query) {
        // Remove if already exists
        this.searchHistory = this.searchHistory.filter(item => item.query !== query);
        
        // Add to beginning
        this.searchHistory.unshift({
            query: query,
            timestamp: Date.now()
        });
        
        // Keep only last 10 searches
        this.searchHistory = this.searchHistory.slice(0, 10);
        
        this.saveSearchHistory();
    }

    updateSearchResults() {
        const searchInput = document.getElementById('advancedSearch');
        if (searchInput && searchInput.value.trim()) {
            this.performSearch(searchInput.value);
        }
    }

    // Public API methods
    getSearchHistory() {
        return this.searchHistory;
    }

    clearSearchHistory() {
        this.searchHistory = [];
        this.saveSearchHistory();
    }

    getCurrentFilters() {
        return this.filters;
    }
}

// Initialize Advanced Mod Search
let advancedModSearch;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        advancedModSearch = new AdvancedModSearch();
    });
} else {
    advancedModSearch = new AdvancedModSearch();
}

window.advancedModSearch = advancedModSearch;