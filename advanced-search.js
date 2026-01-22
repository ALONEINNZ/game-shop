// ADVANCED SEARCH & DISCOVERY SYSTEM
// Enhanced search with filters, suggestions, and AI-powered recommendations

class AdvancedSearch {
    constructor() {
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        this.searchSuggestions = [];
        this.filters = {
            game: '',
            category: '',
            price: { min: 0, max: 1000 },
            rating: 0,
            compatibility: '',
            tags: [],
            author: '',
            dateRange: { start: null, end: null },
            fileSize: { min: 0, max: 10000 }, // MB
            downloads: { min: 0, max: 1000000 }
        };
        this.sortOptions = {
            relevance: 'Relevance',
            newest: 'Newest First',
            oldest: 'Oldest First',
            popular: 'Most Popular',
            rating: 'Highest Rated',
            priceAsc: 'Price: Low to High',
            priceDesc: 'Price: High to Low',
            downloads: 'Most Downloaded',
            fileSize: 'File Size',
            alphabetical: 'A-Z'
        };
        this.currentSort = 'relevance';
        this.searchResults = [];
        this.isSearching = false;
        
        this.init();
    }

    init() {
        this.createAdvancedSearchUI();
        this.setupEventListeners();
        this.loadSearchSuggestions();
        this.setupAutoComplete();
        console.log('🔍 Advanced Search System Loaded!');
    }

    createAdvancedSearchUI() {
        // Enhanced search bar with advanced features
        const searchContainer = document.querySelector('.nav-search') || document.querySelector('.search-bar');
        if (!searchContainer) return;

        // Add advanced search toggle
        const advancedToggle = document.createElement('button');
        advancedToggle.className = 'advanced-search-toggle';
        advancedToggle.innerHTML = '<i class="fas fa-sliders-h"></i>';
        advancedToggle.title = 'Advanced Search';
        advancedToggle.onclick = () => this.toggleAdvancedSearch();
        
        searchContainer.appendChild(advancedToggle);

        // Create advanced search panel
        this.createAdvancedSearchPanel();
        
        // Add search suggestions dropdown
        this.createSuggestionsDropdown();
        
        // Add search history
        this.createSearchHistory();
    }

    createAdvancedSearchPanel() {
        const panel = document.createElement('div');
        panel.id = 'advanced-search-panel';
        panel.className = 'advanced-search-panel';
        panel.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 1200px;
            background: rgba(10, 14, 20, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(91, 140, 255, 0.3);
            border-radius: 20px;
            padding: 2rem;
            z-index: 1000;
            display: none;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;

        panel.innerHTML = `
            <div class="advanced-search-header">
                <h3 style="color: #5B8CFF; margin: 0 0 1.5rem 0; font-size: 1.5rem;">
                    <i class="fas fa-search"></i> Advanced Search
                </h3>
                <button class="close-advanced-search" onclick="advancedSearch.toggleAdvancedSearch()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="advanced-search-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <!-- Game Filter -->
                <div class="filter-group">
                    <label>Game</label>
                    <select id="advanced-game-filter" onchange="advancedSearch.updateFilter('game', this.value)">
                        <option value="">All Games</option>
                        <option value="Minecraft">Minecraft</option>
                        <option value="Cyberpunk 2077">Cyberpunk 2077</option>
                        <option value="Skyrim">Skyrim</option>
                        <option value="GTA V">GTA V</option>
                        <option value="Rust">Rust</option>
                        <option value="The Witcher 3">The Witcher 3</option>
                        <option value="Fallout 4">Fallout 4</option>
                        <option value="Counter-Strike 2">Counter-Strike 2</option>
                    </select>
                </div>

                <!-- Category Filter -->
                <div class="filter-group">
                    <label>Category</label>
                    <select id="advanced-category-filter" onchange="advancedSearch.updateFilter('category', this.value)">
                        <option value="">All Categories</option>
                        <option value="Graphics">Graphics & Shaders</option>
                        <option value="Gameplay">Gameplay Overhauls</option>
                        <option value="UI/UX">Interface & HUD</option>
                        <option value="Audio">Audio & Music</option>
                        <option value="Maps">Maps & Worlds</option>
                        <option value="Characters">Characters & NPCs</option>
                        <option value="Weapons">Weapons & Combat</option>
                        <option value="Vehicles">Vehicles & Transport</option>
                        <option value="Total Conversion">Total Conversions</option>
                        <option value="Utility">Tools & Utilities</option>
                    </select>
                </div>

                <!-- Price Range -->
                <div class="filter-group">
                    <label>Price Range</label>
                    <div class="price-range">
                        <input type="range" id="price-min" min="0" max="100" value="0" oninput="advancedSearch.updatePriceRange()">
                        <input type="range" id="price-max" min="0" max="100" value="100" oninput="advancedSearch.updatePriceRange()">
                        <div class="price-display">
                            <span id="price-min-display">$0</span> - <span id="price-max-display">$100+</span>
                        </div>
                    </div>
                </div>

                <!-- Rating Filter -->
                <div class="filter-group">
                    <label>Minimum Rating</label>
                    <div class="rating-filter">
                        <div class="star-rating" onclick="advancedSearch.setRatingFilter(event)">
                            <i class="fas fa-star" data-rating="1"></i>
                            <i class="fas fa-star" data-rating="2"></i>
                            <i class="fas fa-star" data-rating="3"></i>
                            <i class="fas fa-star" data-rating="4"></i>
                            <i class="fas fa-star" data-rating="5"></i>
                        </div>
                        <span id="rating-display">Any Rating</span>
                    </div>
                </div>

                <!-- Compatibility -->
                <div class="filter-group">
                    <label>Compatibility</label>
                    <select id="compatibility-filter" onchange="advancedSearch.updateFilter('compatibility', this.value)">
                        <option value="">Any Version</option>
                        <option value="latest">Latest Version</option>
                        <option value="legacy">Legacy Support</option>
                        <option value="beta">Beta Compatible</option>
                        <option value="modded">Requires Other Mods</option>
                    </select>
                </div>

                <!-- File Size -->
                <div class="filter-group">
                    <label>File Size</label>
                    <select id="filesize-filter" onchange="advancedSearch.updateFilter('fileSize', this.value)">
                        <option value="">Any Size</option>
                        <option value="small">Small (< 10 MB)</option>
                        <option value="medium">Medium (10-100 MB)</option>
                        <option value="large">Large (100MB - 1GB)</option>
                        <option value="huge">Huge (> 1GB)</option>
                    </select>
                </div>
            </div>

            <!-- Tags Input -->
            <div class="filter-group" style="margin-top: 2rem;">
                <label>Tags</label>
                <div class="tags-input">
                    <input type="text" id="tags-input" placeholder="Enter tags (e.g., realistic, fantasy, multiplayer)" onkeypress="advancedSearch.handleTagInput(event)">
                    <div class="active-tags" id="active-tags"></div>
                </div>
            </div>

            <!-- Sort Options -->
            <div class="sort-section" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(91, 140, 255, 0.2);">
                <label>Sort Results By</label>
                <div class="sort-options" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem;">
                    <button class="sort-btn active" data-sort="relevance" onclick="advancedSearch.setSort('relevance')">
                        <i class="fas fa-magic"></i> Relevance
                    </button>
                    <button class="sort-btn" data-sort="newest" onclick="advancedSearch.setSort('newest')">
                        <i class="fas fa-clock"></i> Newest
                    </button>
                    <button class="sort-btn" data-sort="popular" onclick="advancedSearch.setSort('popular')">
                        <i class="fas fa-fire"></i> Popular
                    </button>
                    <button class="sort-btn" data-sort="rating" onclick="advancedSearch.setSort('rating')">
                        <i class="fas fa-star"></i> Top Rated
                    </button>
                    <button class="sort-btn" data-sort="downloads" onclick="advancedSearch.setSort('downloads')">
                        <i class="fas fa-download"></i> Most Downloaded
                    </button>
                    <button class="sort-btn" data-sort="priceAsc" onclick="advancedSearch.setSort('priceAsc')">
                        <i class="fas fa-dollar-sign"></i> Price ↑
                    </button>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="search-actions" style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="advancedSearch.performAdvancedSearch()">
                    <i class="fas fa-search"></i> Search with Filters
                </button>
                <button class="btn btn-outline" onclick="advancedSearch.clearAllFilters()">
                    <i class="fas fa-eraser"></i> Clear All Filters
                </button>
                <button class="btn btn-outline" onclick="advancedSearch.saveSearchPreset()">
                    <i class="fas fa-save"></i> Save Preset
                </button>
            </div>
        `;

        document.body.appendChild(panel);
        this.addAdvancedSearchStyles();
    }

    addAdvancedSearchStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .advanced-search-toggle {
                background: rgba(91, 140, 255, 0.1);
                border: 1px solid rgba(91, 140, 255, 0.3);
                color: #5B8CFF;
                padding: 0.5rem;
                border-radius: 8px;
                cursor: pointer;
                margin-left: 0.5rem;
                transition: all 0.3s ease;
            }
            
            .advanced-search-toggle:hover {
                background: rgba(91, 140, 255, 0.2);
                transform: scale(1.05);
            }
            
            .advanced-search-panel .filter-group {
                background: rgba(91, 140, 255, 0.05);
                padding: 1.5rem;
                border-radius: 12px;
                border: 1px solid rgba(91, 140, 255, 0.1);
            }
            
            .advanced-search-panel label {
                display: block;
                color: #5B8CFF;
                font-weight: 600;
                margin-bottom: 0.75rem;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .advanced-search-panel select,
            .advanced-search-panel input[type="text"] {
                width: 100%;
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(91, 140, 255, 0.3);
                color: white;
                padding: 0.75rem;
                border-radius: 8px;
                font-size: 0.9rem;
            }
            
            .advanced-search-panel select:focus,
            .advanced-search-panel input:focus {
                outline: none;
                border-color: #5B8CFF;
                box-shadow: 0 0 0 2px rgba(91, 140, 255, 0.2);
            }
            
            .price-range {
                position: relative;
            }
            
            .price-range input[type="range"] {
                width: 100%;
                margin: 0.5rem 0;
                -webkit-appearance: none;
                background: rgba(91, 140, 255, 0.2);
                height: 6px;
                border-radius: 3px;
            }
            
            .price-range input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 18px;
                height: 18px;
                background: #5B8CFF;
                border-radius: 50%;
                cursor: pointer;
            }
            
            .price-display {
                text-align: center;
                color: white;
                font-weight: 600;
                margin-top: 0.5rem;
            }
            
            .star-rating {
                display: flex;
                gap: 0.25rem;
                margin-bottom: 0.5rem;
            }
            
            .star-rating i {
                color: #666;
                cursor: pointer;
                font-size: 1.2rem;
                transition: color 0.2s ease;
            }
            
            .star-rating i:hover,
            .star-rating i.active {
                color: #FFD700;
            }
            
            .tags-input {
                position: relative;
            }
            
            .active-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-top: 0.75rem;
            }
            
            .tag-item {
                background: rgba(91, 140, 255, 0.2);
                color: #5B8CFF;
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .tag-item .remove-tag {
                cursor: pointer;
                opacity: 0.7;
            }
            
            .tag-item .remove-tag:hover {
                opacity: 1;
            }
            
            .sort-options {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
            }
            
            .sort-btn {
                background: rgba(91, 140, 255, 0.1);
                border: 1px solid rgba(91, 140, 255, 0.3);
                color: white;
                padding: 0.75rem 1rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                justify-content: center;
                font-size: 0.9rem;
            }
            
            .sort-btn:hover {
                background: rgba(91, 140, 255, 0.2);
                transform: translateY(-2px);
            }
            
            .sort-btn.active {
                background: rgba(91, 140, 255, 0.3);
                border-color: #5B8CFF;
                color: #5B8CFF;
            }
            
            .close-advanced-search {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                color: #666;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .close-advanced-search:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }
            
            .advanced-search-header {
                position: relative;
                margin-bottom: 2rem;
            }
        `;
        document.head.appendChild(style);
    }

    createSuggestionsDropdown() {
        const dropdown = document.createElement('div');
        dropdown.id = 'search-suggestions';
        dropdown.className = 'search-suggestions';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 14, 20, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(91, 140, 255, 0.3);
            border-top: none;
            border-radius: 0 0 12px 12px;
            max-height: 300px;
            overflow-y: auto;
            z-index: 1001;
            display: none;
        `;

        const searchContainer = document.querySelector('.nav-search') || document.querySelector('.search-bar');
        if (searchContainer) {
            searchContainer.style.position = 'relative';
            searchContainer.appendChild(dropdown);
        }
    }

    createSearchHistory() {
        // Add search history to suggestions
        this.updateSuggestions();
    }

    setupEventListeners() {
        // Enhanced search input with real-time suggestions
        const searchInputs = document.querySelectorAll('#navSearch, #gameSearch');
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => this.handleSearchInput(e));
            input.addEventListener('focus', () => this.showSuggestions());
            input.addEventListener('blur', () => setTimeout(() => this.hideSuggestions(), 200));
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.focusSearch();
            }
            if (e.key === 'Escape') {
                this.hideAdvancedSearch();
            }
        });
    }

    toggleAdvancedSearch() {
        const panel = document.getElementById('advanced-search-panel');
        if (panel.style.display === 'none' || !panel.style.display) {
            panel.style.display = 'block';
            setTimeout(() => {
                panel.style.opacity = '1';
                panel.style.transform = 'translateX(-50%) translateY(0)';
            }, 10);
        } else {
            panel.style.opacity = '0';
            panel.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        }
    }

    hideAdvancedSearch() {
        const panel = document.getElementById('advanced-search-panel');
        if (panel && panel.style.display !== 'none') {
            this.toggleAdvancedSearch();
        }
    }

    updateFilter(filterType, value) {
        this.filters[filterType] = value;
        this.updateFilterDisplay();
    }

    updatePriceRange() {
        const minSlider = document.getElementById('price-min');
        const maxSlider = document.getElementById('price-max');
        const minDisplay = document.getElementById('price-min-display');
        const maxDisplay = document.getElementById('price-max-display');

        let min = parseInt(minSlider.value);
        let max = parseInt(maxSlider.value);

        if (min > max) {
            [min, max] = [max, min];
            minSlider.value = min;
            maxSlider.value = max;
        }

        this.filters.price = { min, max };
        minDisplay.textContent = min === 0 ? 'Free' : `$${min}`;
        maxDisplay.textContent = max === 100 ? '$100+' : `$${max}`;
    }

    setRatingFilter(event) {
        const stars = document.querySelectorAll('.star-rating i');
        const clickedStar = event.target;
        const rating = parseInt(clickedStar.dataset.rating);

        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });

        this.filters.rating = rating;
        document.getElementById('rating-display').textContent = `${rating}+ Stars`;
    }

    handleTagInput(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const input = event.target;
            const tag = input.value.trim();
            
            if (tag && !this.filters.tags.includes(tag)) {
                this.filters.tags.push(tag);
                this.updateTagsDisplay();
                input.value = '';
            }
        }
    }

    updateTagsDisplay() {
        const container = document.getElementById('active-tags');
        container.innerHTML = this.filters.tags.map(tag => `
            <div class="tag-item">
                ${tag}
                <span class="remove-tag" onclick="advancedSearch.removeTag('${tag}')">
                    <i class="fas fa-times"></i>
                </span>
            </div>
        `).join('');
    }

    removeTag(tag) {
        this.filters.tags = this.filters.tags.filter(t => t !== tag);
        this.updateTagsDisplay();
    }

    setSort(sortType) {
        this.currentSort = sortType;
        
        // Update UI
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-sort="${sortType}"]`).classList.add('active');
    }

    handleSearchInput(event) {
        const query = event.target.value;
        
        if (query.length > 2) {
            this.generateSuggestions(query);
            this.showSuggestions();
        } else {
            this.hideSuggestions();
        }
    }

    generateSuggestions(query) {
        // Simulate AI-powered suggestions
        const suggestions = [
            `${query} graphics mod`,
            `${query} gameplay overhaul`,
            `${query} texture pack`,
            `${query} realistic`,
            `${query} enhanced`,
            ...this.searchHistory.filter(h => h.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
        ];

        this.updateSuggestionsDisplay(suggestions.slice(0, 8));
    }

    updateSuggestionsDisplay(suggestions) {
        const dropdown = document.getElementById('search-suggestions');
        dropdown.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" onclick="advancedSearch.selectSuggestion('${suggestion}')">
                <i class="fas fa-search"></i>
                <span>${suggestion}</span>
            </div>
        `).join('');

        // Add suggestion styles
        if (!document.getElementById('suggestion-styles')) {
            const style = document.createElement('style');
            style.id = 'suggestion-styles';
            style.textContent = `
                .suggestion-item {
                    padding: 0.75rem 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: rgba(255, 255, 255, 0.8);
                    transition: all 0.2s ease;
                }
                
                .suggestion-item:hover {
                    background: rgba(91, 140, 255, 0.1);
                    color: white;
                }
                
                .suggestion-item i {
                    color: #5B8CFF;
                    opacity: 0.6;
                }
            `;
            document.head.appendChild(style);
        }
    }

    selectSuggestion(suggestion) {
        const searchInputs = document.querySelectorAll('#navSearch, #gameSearch');
        searchInputs.forEach(input => {
            input.value = suggestion;
        });
        
        this.hideSuggestions();
        this.performSearch(suggestion);
    }

    showSuggestions() {
        const dropdown = document.getElementById('search-suggestions');
        if (dropdown) {
            dropdown.style.display = 'block';
        }
    }

    hideSuggestions() {
        const dropdown = document.getElementById('search-suggestions');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }

    focusSearch() {
        const searchInput = document.querySelector('#navSearch') || document.querySelector('#gameSearch');
        if (searchInput) {
            searchInput.focus();
        }
    }

    performAdvancedSearch() {
        const query = document.querySelector('#navSearch')?.value || '';
        
        // Add to search history
        if (query && !this.searchHistory.includes(query)) {
            this.searchHistory.unshift(query);
            this.searchHistory = this.searchHistory.slice(0, 10); // Keep last 10
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        }

        // Perform search with filters
        this.performSearch(query, this.filters);
        this.hideAdvancedSearch();
    }

    performSearch(query, filters = {}) {
        this.isSearching = true;
        this.showSearchLoader();

        // Simulate advanced search with AI recommendations
        setTimeout(() => {
            this.searchResults = this.mockAdvancedSearch(query, filters);
            this.displaySearchResults();
            this.hideSearchLoader();
            this.isSearching = false;
        }, 1500);
    }

    mockAdvancedSearch(query, filters) {
        // Simulate advanced search results with filtering
        const allMods = window.allMods || [];
        let results = allMods.filter(mod => {
            let matches = true;

            // Text search
            if (query) {
                const searchText = `${mod.title} ${mod.description} ${mod.game} ${mod.category}`.toLowerCase();
                matches = matches && searchText.includes(query.toLowerCase());
            }

            // Game filter
            if (filters.game) {
                matches = matches && mod.game === filters.game;
            }

            // Category filter
            if (filters.category) {
                matches = matches && mod.category === filters.category;
            }

            // Price filter
            if (filters.price) {
                const price = parseFloat(mod.price) || 0;
                matches = matches && price >= filters.price.min && price <= filters.price.max;
            }

            // Rating filter
            if (filters.rating) {
                matches = matches && mod.rating >= filters.rating;
            }

            // Tags filter
            if (filters.tags && filters.tags.length > 0) {
                const modTags = mod.tags || [];
                matches = matches && filters.tags.some(tag => 
                    modTags.some(modTag => modTag.toLowerCase().includes(tag.toLowerCase()))
                );
            }

            return matches;
        });

        // Sort results
        results = this.sortResults(results, this.currentSort);

        return results;
    }

    sortResults(results, sortType) {
        switch (sortType) {
            case 'newest':
                return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'oldest':
                return results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            case 'popular':
                return results.sort((a, b) => b.downloads - a.downloads);
            case 'rating':
                return results.sort((a, b) => b.rating - a.rating);
            case 'priceAsc':
                return results.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
            case 'priceDesc':
                return results.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
            case 'downloads':
                return results.sort((a, b) => b.downloads - a.downloads);
            case 'alphabetical':
                return results.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return results; // relevance (default order)
        }
    }

    displaySearchResults() {
        const resultsContainer = document.getElementById('allGames');
        if (!resultsContainer) return;

        if (this.searchResults.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results" style="text-align: center; padding: 4rem 2rem; color: rgba(255,255,255,0.6);">
                    <i class="fas fa-search" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <h3>No results found</h3>
                    <p>Try adjusting your search filters or search terms</p>
                    <button class="btn btn-outline" onclick="advancedSearch.clearAllFilters()">
                        Clear All Filters
                    </button>
                </div>
            `;
            return;
        }

        // Display results with enhanced cards
        resultsContainer.innerHTML = this.searchResults.map(mod => this.createEnhancedModCard(mod)).join('');
    }

    createEnhancedModCard(mod) {
        return `
            <div class="game-card enhanced-card" data-game="${mod.game}" data-category="${mod.category}">
                <div class="card-image">
                    <img src="${mod.image}" alt="${mod.title}" loading="lazy">
                    <div class="card-overlay">
                        <div class="card-badges">
                            ${mod.featured ? '<span class="badge featured">Featured</span>' : ''}
                            ${mod.price === 'Free' ? '<span class="badge free">Free</span>' : ''}
                            ${mod.rating >= 4.5 ? '<span class="badge top-rated">Top Rated</span>' : ''}
                        </div>
                        <div class="card-actions">
                            <button class="action-btn" onclick="toggleWishlist('${mod.id}')" title="Add to Wishlist">
                                <i class="fas fa-heart"></i>
                            </button>
                            <button class="action-btn" onclick="quickPreview('${mod.id}')" title="Quick Preview">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn" onclick="shareMod('${mod.id}')" title="Share">
                                <i class="fas fa-share"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="card-title">${mod.title}</h3>
                        <span class="card-game">${mod.game}</span>
                    </div>
                    <p class="card-description">${mod.description}</p>
                    <div class="card-stats">
                        <div class="stat">
                            <i class="fas fa-star"></i>
                            <span>${mod.rating}</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-download"></i>
                            <span>${this.formatNumber(mod.downloads)}</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-calendar"></i>
                            <span>${this.formatDate(mod.createdAt)}</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="card-price">
                            ${mod.price === 'Free' ? 
                                '<span class="price free">Free</span>' : 
                                `<span class="price">$${mod.price}</span>`
                            }
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="openModDetails('${mod.id}')">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
        return `${Math.ceil(diffDays / 365)} years ago`;
    }

    showSearchLoader() {
        const resultsContainer = document.getElementById('allGames');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="search-loader" style="text-align: center; padding: 4rem 2rem;">
                    <div class="loader-spinner" style="width: 60px; height: 60px; border: 4px solid rgba(91,140,255,0.2); border-top: 4px solid #5B8CFF; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 2rem;"></div>
                    <h3 style="color: #5B8CFF; margin-bottom: 1rem;">Searching with AI...</h3>
                    <p style="color: rgba(255,255,255,0.6);">Finding the perfect mods for you</p>
                </div>
            `;
        }
    }

    hideSearchLoader() {
        // Loader will be replaced by results
    }

    clearAllFilters() {
        this.filters = {
            game: '',
            category: '',
            price: { min: 0, max: 100 },
            rating: 0,
            compatibility: '',
            tags: [],
            author: '',
            dateRange: { start: null, end: null },
            fileSize: { min: 0, max: 10000 },
            downloads: { min: 0, max: 1000000 }
        };

        // Reset UI
        document.getElementById('advanced-game-filter').value = '';
        document.getElementById('advanced-category-filter').value = '';
        document.getElementById('price-min').value = 0;
        document.getElementById('price-max').value = 100;
        document.getElementById('compatibility-filter').value = '';
        document.getElementById('filesize-filter').value = '';
        document.getElementById('tags-input').value = '';
        
        this.updatePriceRange();
        this.updateTagsDisplay();
        
        // Reset rating
        document.querySelectorAll('.star-rating i').forEach(star => {
            star.classList.remove('active');
        });
        document.getElementById('rating-display').textContent = 'Any Rating';
        
        // Reset sort
        this.setSort('relevance');
    }

    saveSearchPreset() {
        const presetName = prompt('Enter a name for this search preset:');
        if (presetName) {
            const presets = JSON.parse(localStorage.getItem('searchPresets') || '{}');
            presets[presetName] = {
                filters: { ...this.filters },
                sort: this.currentSort,
                createdAt: new Date().toISOString()
            };
            localStorage.setItem('searchPresets', JSON.stringify(presets));
            
            // Show success message
            this.showNotification('Search preset saved successfully!', 'success');
        }
    }

    loadSearchSuggestions() {
        // Load popular search terms and suggestions
        this.searchSuggestions = [
            'realistic graphics',
            'gameplay overhaul',
            'texture pack',
            'character mods',
            'weapon mods',
            'map expansion',
            'UI improvement',
            'performance boost',
            'multiplayer',
            'total conversion'
        ];
    }

    setupAutoComplete() {
        // Enhanced autocomplete with fuzzy matching
        const searchInputs = document.querySelectorAll('#navSearch, #gameSearch');
        searchInputs.forEach(input => {
            input.setAttribute('autocomplete', 'off');
            input.setAttribute('spellcheck', 'false');
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 2rem;
            background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(91, 140, 255, 0.9)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize Advanced Search
let advancedSearch;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        advancedSearch = new AdvancedSearch();
    });
} else {
    advancedSearch = new AdvancedSearch();
}

// Add animation keyframes
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(animationStyle);

// Make globally available
window.advancedSearch = advancedSearch;