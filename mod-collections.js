// ADVANCED MOD COLLECTION SYSTEM
// Create, manage, and share curated mod collections with themes and compatibility

class ModCollectionSystem {
    constructor() {
        this.collections = {};
        this.userCollections = [];
        this.featuredCollections = [];
        this.collectionTemplates = [];
        this.currentUser = null;
        this.sharingEnabled = true;
        
        this.init();
    }

    init() {
        this.loadCollectionData();
        this.loadUserData();
        this.createCollectionUI();
        this.setupEventHandlers();
        this.loadFeaturedCollections();
        
        console.log('📚 Mod Collection System Initialized');
    }

    loadCollectionData() {
        // Load existing collections
        const savedCollections = localStorage.getItem('exuscraft_collections');
        if (savedCollections) {
            this.collections = JSON.parse(savedCollections);
        }
        
        // Load user's personal collections
        const userCollections = localStorage.getItem('exuscraft_user_collections');
        if (userCollections) {
            this.userCollections = JSON.parse(userCollections);
        }
        
        // Sample featured collections
        this.featuredCollections = [
            {
                id: 'ultimate-graphics-pack',
                title: 'Ultimate Graphics Enhancement',
                description: 'Transform your games with the most stunning visual mods available',
                author: 'GraphicsMaster',
                authorAvatar: this.generateAvatar('GraphicsMaster'),
                thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                tags: ['Graphics', 'Visual', '4K', 'Ray Tracing'],
                games: ['Cyberpunk 2077', 'Skyrim', 'GTA V'],
                modCount: 12,
                downloads: 45000,
                rating: 4.8,
                featured: true,
                verified: true,
                mods: [
                    {
                        id: 'ultra-graphics-cyberpunk',
                        name: 'Ultra Graphics Enhancement Pack',
                        game: 'Cyberpunk 2077',
                        required: true,
                        loadOrder: 1
                    },
                    {
                        id: 'skyrim-visual-overhaul',
                        name: 'Skyrim Visual Overhaul',
                        game: 'Skyrim',
                        required: true,
                        loadOrder: 2
                    }
                ],
                installInstructions: 'Install mods in the specified order. Ensure you have the required hardware specifications.',
                compatibility: {
                    minRAM: '16GB',
                    minGPU: 'RTX 3060',
                    conflicts: ['ENB Series', 'ReShade']
                },
                createdAt: Date.now() - 86400000 * 30,
                updatedAt: Date.now() - 86400000 * 5
            },
            {
                id: 'survival-immersion-pack',
                title: 'Complete Survival Experience',
                description: 'Hardcore survival mods that transform gameplay into a realistic challenge',
                author: 'SurvivalExpert',
                authorAvatar: this.generateAvatar('SurvivalExpert'),
                thumbnail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
                tags: ['Survival', 'Hardcore', 'Immersion', 'Realism'],
                games: ['Skyrim', 'Fallout 4'],
                modCount: 8,
                downloads: 32000,
                rating: 4.6,
                featured: true,
                verified: true,
                mods: [
                    {
                        id: 'survival-overhaul-skyrim',
                        name: 'Hardcore Survival Overhaul',
                        game: 'Skyrim',
                        required: true,
                        loadOrder: 1
                    }
                ],
                installInstructions: 'Install SKSE64 first, then install mods in order. Configure settings in MCM.',
                compatibility: {
                    minRAM: '8GB',
                    minGPU: 'GTX 1060',
                    conflicts: []
                },
                createdAt: Date.now() - 86400000 * 45,
                updatedAt: Date.now() - 86400000 * 10
            },
            {
                id: 'performance-optimization',
                title: 'Performance Optimization Suite',
                description: 'Boost your game performance while maintaining visual quality',
                author: 'PerformanceGuru',
                authorAvatar: this.generateAvatar('PerformanceGuru'),
                thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
                tags: ['Performance', 'Optimization', 'FPS', 'Stability'],
                games: ['Minecraft', 'Skyrim', 'GTA V', 'Cyberpunk 2077'],
                modCount: 15,
                downloads: 78000,
                rating: 4.9,
                featured: true,
                verified: true,
                mods: [],
                installInstructions: 'Follow the step-by-step guide for optimal performance gains.',
                compatibility: {
                    minRAM: '4GB',
                    minGPU: 'GTX 750',
                    conflicts: []
                },
                createdAt: Date.now() - 86400000 * 60,
                updatedAt: Date.now() - 86400000 * 2
            }
        ];
    }

    loadUserData() {
        const userData = localStorage.getItem('exuscraft_user_data');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        } else {
            this.currentUser = {
                id: 'guest_' + Date.now(),
                username: 'Guest User',
                avatar: this.generateAvatar('Guest'),
                isGuest: true
            };
        }
    }

    generateAvatar(username) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
        const color = colors[username.length % colors.length];
        const initial = username.charAt(0).toUpperCase();
        
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='${encodeURIComponent(color)}' width='40' height='40' rx='20'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='18' font-family='Arial'%3E${initial}%3C/text%3E%3C/svg%3E`;
    }

    createCollectionUI() {
        // Add collections button to navigation
        this.addCollectionsButton();
        
        // Create collections floating panel
        this.createCollectionsPanel();
        
        // Add collection creation button to mod cards
        this.addCollectionButtons();
    }

    addCollectionsButton() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;
        
        // Check if collections link already exists
        if (navMenu.querySelector('.collections-link')) return;
        
        const collectionsLink = document.createElement('a');
        collectionsLink.className = 'nav-link collections-link';
        collectionsLink.href = '#';
        collectionsLink.innerHTML = '<i class="fas fa-layer-group"></i> Collections';
        collectionsLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showCollectionsPanel();
        });
        
        // Insert before upload link
        const uploadLink = navMenu.querySelector('.upload-link');
        if (uploadLink) {
            navMenu.insertBefore(collectionsLink, uploadLink);
        } else {
            navMenu.appendChild(collectionsLink);
        }
    }

    createCollectionsPanel() {
        const panel = document.createElement('div');
        panel.id = 'collectionsPanel';
        panel.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            z-index: 2000;
            display: none;
            overflow-y: auto;
        `;
        
        panel.innerHTML = `
            <div style="max-width: 1400px; margin: 0 auto; padding: 2rem;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
                    <div>
                        <h1 style="color: white; margin: 0 0 0.5rem 0; font-size: 2.5rem; font-weight: 800;">
                            Mod Collections
                        </h1>
                        <p style="color: rgba(255, 255, 255, 0.7); margin: 0; font-size: 1.1rem;">
                            Curated mod packs for the ultimate gaming experience
                        </p>
                    </div>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <button id="createCollectionBtn" style="
                            background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                            border: none;
                            color: white;
                            padding: 0.75rem 1.5rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 0.9rem;
                            font-weight: 600;
                        ">
                            <i class="fas fa-plus"></i> Create Collection
                        </button>
                        <button id="closeCollectionsPanel" style="
                            background: none;
                            border: none;
                            color: rgba(255, 255, 255, 0.6);
                            font-size: 2rem;
                            cursor: pointer;
                        ">×</button>
                    </div>
                </div>
                
                <!-- Tabs -->
                <div style="display: flex; gap: 2rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <button class="collection-tab active" data-tab="featured" style="
                        background: none;
                        border: none;
                        color: white;
                        padding: 1rem 0;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        border-bottom: 2px solid #5B8CFF;
                    ">Featured Collections</button>
                    <button class="collection-tab" data-tab="my-collections" style="
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.6);
                        padding: 1rem 0;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        border-bottom: 2px solid transparent;
                    ">My Collections</button>
                    <button class="collection-tab" data-tab="browse" style="
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.6);
                        padding: 1rem 0;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        border-bottom: 2px solid transparent;
                    ">Browse All</button>
                </div>
                
                <!-- Content -->
                <div id="collectionsContent">
                    ${this.generateFeaturedCollectionsHTML()}
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.setupCollectionPanelHandlers();
    }

    generateFeaturedCollectionsHTML() {
        return `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 2rem;">
                ${this.featuredCollections.map(collection => this.generateCollectionCardHTML(collection)).join('')}
            </div>
        `;
    }

    generateCollectionCardHTML(collection) {
        const timeAgo = this.getTimeAgo(collection.updatedAt);
        
        return `
            <div class="collection-card" data-collection-id="${collection.id}" style="
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                overflow: hidden;
                transition: all 0.3s ease;
                cursor: pointer;
            " onmouseover="this.style.background='rgba(91, 140, 255, 0.1)'; this.style.borderColor='rgba(91, 140, 255, 0.3)'"
               onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'; this.style.borderColor='rgba(255, 255, 255, 0.1)'"
               onclick="modCollectionSystem.viewCollection('${collection.id}')">
                
                <!-- Thumbnail -->
                <div style="
                    height: 200px;
                    background: url('${collection.thumbnail}') center/cover;
                    position: relative;
                ">
                    <div style="
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                        display: flex;
                        gap: 0.5rem;
                    ">
                        ${collection.featured ? `
                            <span style="
                                background: linear-gradient(135deg, #FFD700, #FFA500);
                                color: white;
                                padding: 0.25rem 0.75rem;
                                border-radius: 12px;
                                font-size: 0.7rem;
                                font-weight: 600;
                            ">⭐ Featured</span>
                        ` : ''}
                        ${collection.verified ? `
                            <span style="
                                background: linear-gradient(135deg, #22C55E, #16A34A);
                                color: white;
                                padding: 0.25rem 0.75rem;
                                border-radius: 12px;
                                font-size: 0.7rem;
                                font-weight: 600;
                            ">✓ Verified</span>
                        ` : ''}
                    </div>
                    
                    <div style="
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
                        padding: 1rem;
                    ">
                        <div style="color: white; font-size: 0.9rem; font-weight: 600;">
                            ${collection.modCount} mods • ${collection.games.join(', ')}
                        </div>
                    </div>
                </div>
                
                <!-- Content -->
                <div style="padding: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <h3 style="margin: 0; color: white; font-size: 1.3rem; font-weight: 700; line-height: 1.3;">
                            ${collection.title}
                        </h3>
                        <div style="display: flex; align-items: center; gap: 0.25rem; color: #FFD700;">
                            <i class="fas fa-star" style="font-size: 0.8rem;"></i>
                            <span style="font-size: 0.9rem; font-weight: 600;">${collection.rating}</span>
                        </div>
                    </div>
                    
                    <p style="margin: 0 0 1rem 0; color: rgba(255, 255, 255, 0.8); font-size: 0.95rem; line-height: 1.5;">
                        ${collection.description}
                    </p>
                    
                    <!-- Tags -->
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                        ${collection.tags.slice(0, 4).map(tag => `
                            <span style="
                                background: rgba(91, 140, 255, 0.2);
                                color: #5B8CFF;
                                padding: 0.2rem 0.6rem;
                                border-radius: 12px;
                                font-size: 0.7rem;
                                font-weight: 500;
                            ">${tag}</span>
                        `).join('')}
                    </div>
                    
                    <!-- Author and Stats -->
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <img src="${collection.authorAvatar}" alt="${collection.author}" style="
                                width: 24px;
                                height: 24px;
                                border-radius: 50%;
                            ">
                            <span style="color: rgba(255, 255, 255, 0.7); font-size: 0.85rem;">
                                by ${collection.author}
                            </span>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 1rem; color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">
                            <span>📥 ${(collection.downloads / 1000).toFixed(0)}K</span>
                            <span>🕒 ${timeAgo}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupCollectionPanelHandlers() {
        // Close panel
        document.getElementById('closeCollectionsPanel').addEventListener('click', () => {
            document.getElementById('collectionsPanel').style.display = 'none';
        });
        
        // Create collection button
        document.getElementById('createCollectionBtn').addEventListener('click', () => {
            this.showCreateCollectionModal();
        });
        
        // Tab switching
        document.querySelectorAll('.collection-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchCollectionTab(tabName);
                
                // Update active tab
                document.querySelectorAll('.collection-tab').forEach(t => {
                    t.style.color = 'rgba(255, 255, 255, 0.6)';
                    t.style.borderBottomColor = 'transparent';
                });
                tab.style.color = 'white';
                tab.style.borderBottomColor = '#5B8CFF';
            });
        });
        
        // Close on outside click
        document.getElementById('collectionsPanel').addEventListener('click', (e) => {
            if (e.target.id === 'collectionsPanel') {
                document.getElementById('collectionsPanel').style.display = 'none';
            }
        });
    }

    showCollectionsPanel() {
        document.getElementById('collectionsPanel').style.display = 'block';
    }

    switchCollectionTab(tabName) {
        const content = document.getElementById('collectionsContent');
        
        switch (tabName) {
            case 'featured':
                content.innerHTML = this.generateFeaturedCollectionsHTML();
                break;
            case 'my-collections':
                content.innerHTML = this.generateMyCollectionsHTML();
                break;
            case 'browse':
                content.innerHTML = this.generateBrowseCollectionsHTML();
                break;
        }
    }

    generateMyCollectionsHTML() {
        if (this.userCollections.length === 0) {
            return `
                <div style="text-align: center; padding: 4rem; color: rgba(255, 255, 255, 0.6);">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📚</div>
                    <h3 style="margin: 0 0 1rem 0; color: rgba(255, 255, 255, 0.8);">No collections yet</h3>
                    <p style="margin: 0 0 2rem 0;">Create your first collection to organize your favorite mods!</p>
                    <button onclick="modCollectionSystem.showCreateCollectionModal()" style="
                        background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                        border: none;
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 0.9rem;
                        font-weight: 600;
                    ">Create Your First Collection</button>
                </div>
            `;
        }
        
        return `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 2rem;">
                ${this.userCollections.map(collection => this.generateCollectionCardHTML(collection)).join('')}
            </div>
        `;
    }

    generateBrowseCollectionsHTML() {
        const allCollections = [...this.featuredCollections, ...this.userCollections];
        
        return `
            <div style="margin-bottom: 2rem;">
                <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                    <select id="collectionSort" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.5rem;
                        border-radius: 6px;
                    ">
                        <option value="popular">Most Popular</option>
                        <option value="newest">Newest</option>
                        <option value="rating">Highest Rated</option>
                        <option value="mods">Most Mods</option>
                    </select>
                    
                    <select id="collectionGameFilter" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.5rem;
                        border-radius: 6px;
                    ">
                        <option value="">All Games</option>
                        <option value="Minecraft">Minecraft</option>
                        <option value="Skyrim">Skyrim</option>
                        <option value="Cyberpunk 2077">Cyberpunk 2077</option>
                        <option value="GTA V">GTA V</option>
                    </select>
                    
                    <input type="text" id="collectionSearch" placeholder="Search collections..." style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.5rem;
                        border-radius: 6px;
                        flex: 1;
                        min-width: 200px;
                    ">
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 2rem;">
                ${allCollections.map(collection => this.generateCollectionCardHTML(collection)).join('')}
            </div>
        `;
    }

    showCreateCollectionModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 2001;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, rgba(10, 14, 20, 0.95), rgba(20, 25, 35, 0.95));
                border: 1px solid rgba(91, 140, 255, 0.3);
                border-radius: 20px;
                padding: 2rem;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h3 style="margin: 0; color: white; font-size: 1.5rem; font-weight: 700;">Create New Collection</h3>
                    <button id="closeCreateModal" style="
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 1.5rem;
                        cursor: pointer;
                    ">×</button>
                </div>
                
                <form id="createCollectionForm">
                    <!-- Basic Info -->
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; color: white; margin-bottom: 0.75rem; font-weight: 600;">
                            Collection Name *
                        </label>
                        <input type="text" id="collectionName" required style="
                            width: 100%;
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            color: white;
                            padding: 0.75rem;
                            border-radius: 8px;
                            font-size: 1rem;
                        " placeholder="Enter collection name...">
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; color: white; margin-bottom: 0.75rem; font-weight: 600;">
                            Description *
                        </label>
                        <textarea id="collectionDescription" required style="
                            width: 100%;
                            height: 100px;
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            color: white;
                            padding: 0.75rem;
                            border-radius: 8px;
                            font-size: 1rem;
                            resize: vertical;
                        " placeholder="Describe your collection..."></textarea>
                    </div>
                    
                    <!-- Games -->
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; color: white; margin-bottom: 0.75rem; font-weight: 600;">
                            Target Games
                        </label>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.5rem;">
                            ${['Minecraft', 'Skyrim', 'Cyberpunk 2077', 'GTA V', 'The Witcher 3', 'Fallout 4'].map(game => `
                                <label style="display: flex; align-items: center; cursor: pointer;">
                                    <input type="checkbox" value="${game}" class="game-checkbox" style="margin-right: 0.5rem;">
                                    <span style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem;">${game}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Tags -->
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; color: white; margin-bottom: 0.75rem; font-weight: 600;">
                            Tags
                        </label>
                        <input type="text" id="collectionTags" style="
                            width: 100%;
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            color: white;
                            padding: 0.75rem;
                            border-radius: 8px;
                            font-size: 1rem;
                        " placeholder="Enter tags separated by commas...">
                    </div>
                    
                    <!-- Privacy -->
                    <div style="margin-bottom: 2rem;">
                        <label style="display: block; color: white; margin-bottom: 0.75rem; font-weight: 600;">
                            Privacy Settings
                        </label>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <label style="display: flex; align-items: center; cursor: pointer;">
                                <input type="radio" name="privacy" value="public" checked style="margin-right: 0.5rem;">
                                <span style="color: rgba(255, 255, 255, 0.8);">Public - Anyone can view and download</span>
                            </label>
                            <label style="display: flex; align-items: center; cursor: pointer;">
                                <input type="radio" name="privacy" value="unlisted" style="margin-right: 0.5rem;">
                                <span style="color: rgba(255, 255, 255, 0.8);">Unlisted - Only people with the link can view</span>
                            </label>
                            <label style="display: flex; align-items: center; cursor: pointer;">
                                <input type="radio" name="privacy" value="private" style="margin-right: 0.5rem;">
                                <span style="color: rgba(255, 255, 255, 0.8);">Private - Only you can view</span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Submit -->
                    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                        <button type="button" onclick="this.closest('.create-collection-modal').remove()" style="
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            color: white;
                            padding: 0.75rem 1.5rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 0.9rem;
                        ">Cancel</button>
                        
                        <button type="submit" style="
                            background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                            border: none;
                            color: white;
                            padding: 0.75rem 1.5rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 0.9rem;
                            font-weight: 600;
                        ">Create Collection</button>
                    </div>
                </form>
            </div>
        `;
        
        modal.className = 'create-collection-modal';
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('div').style.transform = 'scale(1)';
        }, 10);
        
        this.setupCreateCollectionHandlers(modal);
    }

    setupCreateCollectionHandlers(modal) {
        // Close modal
        modal.querySelector('#closeCreateModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Form submission
        modal.querySelector('#createCollectionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createCollection(modal);
        });
    }

    createCollection(modal) {
        const formData = new FormData(modal.querySelector('#createCollectionForm'));
        const selectedGames = Array.from(modal.querySelectorAll('.game-checkbox:checked')).map(cb => cb.value);
        const tags = modal.querySelector('#collectionTags').value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        
        const collection = {
            id: 'collection_' + Date.now(),
            title: formData.get('collectionName') || modal.querySelector('#collectionName').value,
            description: formData.get('collectionDescription') || modal.querySelector('#collectionDescription').value,
            author: this.currentUser.username,
            authorAvatar: this.currentUser.avatar,
            thumbnail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
            tags: tags,
            games: selectedGames,
            modCount: 0,
            downloads: 0,
            rating: 0,
            featured: false,
            verified: false,
            mods: [],
            installInstructions: '',
            compatibility: {
                minRAM: '4GB',
                minGPU: 'GTX 1060',
                conflicts: []
            },
            privacy: formData.get('privacy') || 'public',
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        
        // Add to user collections
        this.userCollections.unshift(collection);
        localStorage.setItem('exuscraft_user_collections', JSON.stringify(this.userCollections));
        
        // Close modal
        modal.remove();
        
        // Show success message
        this.showNotification('Collection created successfully!', 'success');
        
        // Switch to my collections tab
        this.switchCollectionTab('my-collections');
        document.querySelectorAll('.collection-tab').forEach(t => {
            t.style.color = 'rgba(255, 255, 255, 0.6)';
            t.style.borderBottomColor = 'transparent';
        });
        const myCollectionsTab = document.querySelector('[data-tab="my-collections"]');
        if (myCollectionsTab) {
            myCollectionsTab.style.color = 'white';
            myCollectionsTab.style.borderBottomColor = '#5B8CFF';
        }
    }

    viewCollection(collectionId) {
        const collection = this.featuredCollections.find(c => c.id === collectionId) || 
                          this.userCollections.find(c => c.id === collectionId);
        
        if (!collection) return;
        
        // Create detailed view modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            z-index: 2002;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, rgba(10, 14, 20, 0.95), rgba(20, 25, 35, 0.95));
                border: 1px solid rgba(91, 140, 255, 0.3);
                border-radius: 20px;
                padding: 0;
                max-width: 900px;
                width: 90%;
                max-height: 90vh;
                overflow: hidden;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            ">
                <!-- Header -->
                <div style="
                    background: url('${collection.thumbnail}') center/cover;
                    height: 250px;
                    position: relative;
                ">
                    <div style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8));
                    "></div>
                    
                    <button id="closeCollectionView" style="
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                        background: rgba(0, 0, 0, 0.5);
                        border: none;
                        color: white;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 1.2rem;
                    ">×</button>
                    
                    <div style="
                        position: absolute;
                        bottom: 2rem;
                        left: 2rem;
                        right: 2rem;
                    ">
                        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                            ${collection.featured ? `
                                <span style="
                                    background: linear-gradient(135deg, #FFD700, #FFA500);
                                    color: white;
                                    padding: 0.25rem 0.75rem;
                                    border-radius: 12px;
                                    font-size: 0.8rem;
                                    font-weight: 600;
                                ">⭐ Featured</span>
                            ` : ''}
                            ${collection.verified ? `
                                <span style="
                                    background: linear-gradient(135deg, #22C55E, #16A34A);
                                    color: white;
                                    padding: 0.25rem 0.75rem;
                                    border-radius: 12px;
                                    font-size: 0.8rem;
                                    font-weight: 600;
                                ">✓ Verified</span>
                            ` : ''}
                        </div>
                        
                        <h2 style="margin: 0 0 0.5rem 0; color: white; font-size: 2rem; font-weight: 800;">
                            ${collection.title}
                        </h2>
                        
                        <div style="display: flex; align-items: center; gap: 1rem; color: rgba(255, 255, 255, 0.8);">
                            <span>${collection.modCount} mods</span>
                            <span>•</span>
                            <span>⭐ ${collection.rating}</span>
                            <span>•</span>
                            <span>📥 ${(collection.downloads / 1000).toFixed(0)}K downloads</span>
                        </div>
                    </div>
                </div>
                
                <!-- Content -->
                <div style="padding: 2rem; max-height: 400px; overflow-y: auto;">
                    <!-- Description -->
                    <div style="margin-bottom: 2rem;">
                        <p style="margin: 0; color: rgba(255, 255, 255, 0.8); font-size: 1.1rem; line-height: 1.6;">
                            ${collection.description}
                        </p>
                    </div>
                    
                    <!-- Author -->
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; padding: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 12px;">
                        <img src="${collection.authorAvatar}" alt="${collection.author}" style="
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                        ">
                        <div>
                            <div style="color: white; font-weight: 600;">Created by ${collection.author}</div>
                            <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">
                                Updated ${this.getTimeAgo(collection.updatedAt)}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Tags -->
                    <div style="margin-bottom: 2rem;">
                        <h4 style="color: white; margin: 0 0 1rem 0;">Tags</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${collection.tags.map(tag => `
                                <span style="
                                    background: rgba(91, 140, 255, 0.2);
                                    color: #5B8CFF;
                                    padding: 0.3rem 0.75rem;
                                    border-radius: 12px;
                                    font-size: 0.8rem;
                                    font-weight: 500;
                                ">${tag}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Games -->
                    <div style="margin-bottom: 2rem;">
                        <h4 style="color: white; margin: 0 0 1rem 0;">Compatible Games</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
                            ${collection.games.map(game => `
                                <span style="
                                    background: rgba(193, 92, 255, 0.2);
                                    color: #C15CFF;
                                    padding: 0.5rem 1rem;
                                    border-radius: 12px;
                                    font-size: 0.9rem;
                                    font-weight: 500;
                                ">${game}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- System Requirements -->
                    <div style="margin-bottom: 2rem;">
                        <h4 style="color: white; margin: 0 0 1rem 0;">System Requirements</h4>
                        <div style="
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 12px;
                            padding: 1rem;
                        ">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                                <div>
                                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem; margin-bottom: 0.25rem;">Minimum RAM</div>
                                    <div style="color: white; font-weight: 600;">${collection.compatibility.minRAM}</div>
                                </div>
                                <div>
                                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem; margin-bottom: 0.25rem;">Minimum GPU</div>
                                    <div style="color: white; font-weight: 600;">${collection.compatibility.minGPU}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Actions -->
                <div style="
                    padding: 1.5rem 2rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    gap: 1rem;
                    justify-content: flex-end;
                ">
                    <button style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 0.9rem;
                    ">
                        <i class="fas fa-share"></i> Share
                    </button>
                    
                    <button style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 0.9rem;
                    ">
                        <i class="fas fa-heart"></i> Favorite
                    </button>
                    
                    <button style="
                        background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                        border: none;
                        color: white;
                        padding: 0.75rem 2rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 0.9rem;
                        font-weight: 600;
                    ">
                        <i class="fas fa-download"></i> Download Collection
                    </button>
                </div>
            </div>
        `;
        
        modal.className = 'collection-view-modal';
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('div').style.transform = 'scale(1)';
        }, 10);
        
        // Close handlers
        modal.querySelector('#closeCollectionView').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    addCollectionButtons() {
        // Add "Add to Collection" buttons to mod cards
        document.addEventListener('click', (e) => {
            if (e.target.closest('.game-card')) {
                setTimeout(() => {
                    this.addCollectionButtonToCard(e.target.closest('.game-card'));
                }, 100);
            }
        });
    }

    addCollectionButtonToCard(card) {
        // Check if button already exists
        if (card.querySelector('.add-to-collection-btn')) return;
        
        const actionsContainer = card.querySelector('.game-actions') || card.querySelector('.card-actions');
        if (!actionsContainer) return;
        
        const collectionBtn = document.createElement('button');
        collectionBtn.className = 'add-to-collection-btn';
        collectionBtn.innerHTML = '<i class="fas fa-plus"></i>';
        collectionBtn.title = 'Add to Collection';
        collectionBtn.style.cssText = `
            background: rgba(91, 140, 255, 0.2);
            border: 1px solid rgba(91, 140, 255, 0.3);
            color: #5B8CFF;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        `;
        
        collectionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modName = card.querySelector('h3')?.textContent;
            if (modName) {
                this.showAddToCollectionModal(modName);
            }
        });
        
        actionsContainer.appendChild(collectionBtn);
    }

    showAddToCollectionModal(modName) {
        if (this.userCollections.length === 0) {
            this.showNotification('Create a collection first to add mods!', 'info');
            this.showCreateCollectionModal();
            return;
        }
        
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 2001;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, rgba(10, 14, 20, 0.95), rgba(20, 25, 35, 0.95));
                border: 1px solid rgba(91, 140, 255, 0.3);
                border-radius: 20px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                max-height: 70vh;
                overflow-y: auto;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h3 style="margin: 0; color: white; font-size: 1.3rem;">Add "${modName}" to Collection</h3>
                    <button id="closeAddToCollectionModal" style="
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 1.5rem;
                        cursor: pointer;
                    ">×</button>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: white; margin: 0 0 1rem 0;">Select Collections:</h4>
                    <div style="max-height: 300px; overflow-y: auto;">
                        ${this.userCollections.map(collection => `
                            <label style="
                                display: flex;
                                align-items: center;
                                padding: 1rem;
                                margin-bottom: 0.75rem;
                                background: rgba(255, 255, 255, 0.05);
                                border: 1px solid rgba(255, 255, 255, 0.1);
                                border-radius: 12px;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            " onmouseover="this.style.background='rgba(91, 140, 255, 0.1)'; this.style.borderColor='rgba(91, 140, 255, 0.3)'"
                               onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'; this.style.borderColor='rgba(255, 255, 255, 0.1)'">
                                <input type="checkbox" value="${collection.id}" style="margin-right: 1rem;">
                                <div style="flex: 1;">
                                    <div style="color: white; font-weight: 600; margin-bottom: 0.25rem;">${collection.title}</div>
                                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">${collection.modCount} mods • ${collection.games.join(', ')}</div>
                                </div>
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button onclick="this.closest('.add-to-collection-modal').remove()" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 0.9rem;
                    ">Cancel</button>
                    
                    <button id="addToSelectedCollections" style="
                        background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                        border: none;
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 0.9rem;
                        font-weight: 600;
                    ">Add to Collections</button>
                </div>
            </div>
        `;
        
        modal.className = 'add-to-collection-modal';
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('div').style.transform = 'scale(1)';
        }, 10);
        
        // Setup handlers
        modal.querySelector('#closeAddToCollectionModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#addToSelectedCollections').addEventListener('click', () => {
            const selectedCollections = Array.from(modal.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
            this.addModToCollections(modName, selectedCollections);
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    addModToCollections(modName, collectionIds) {
        let addedCount = 0;
        
        collectionIds.forEach(collectionId => {
            const collection = this.userCollections.find(c => c.id === collectionId);
            if (collection) {
                // Check if mod already exists
                if (!collection.mods.some(mod => mod.name === modName)) {
                    collection.mods.push({
                        id: 'mod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                        name: modName,
                        game: 'Unknown', // Would be determined from context
                        required: true,
                        loadOrder: collection.mods.length + 1
                    });
                    collection.modCount = collection.mods.length;
                    collection.updatedAt = Date.now();
                    addedCount++;
                }
            }
        });
        
        if (addedCount > 0) {
            localStorage.setItem('exuscraft_user_collections', JSON.stringify(this.userCollections));
            this.showNotification(`Added "${modName}" to ${addedCount} collection${addedCount > 1 ? 's' : ''}!`, 'success');
        } else {
            this.showNotification('Mod already exists in selected collections.', 'info');
        }
    }

    setupEventHandlers() {
        // Global event handlers for collection system
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open collection modals
                document.querySelectorAll('.collection-view-modal, .create-collection-modal, .add-to-collection-modal').forEach(modal => {
                    modal.remove();
                });
            }
        });
    }

    getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        
        if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
        if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return 'Just now';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: '#22C55E',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#5B8CFF'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 2003;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Public API methods
    getUserCollections() {
        return this.userCollections;
    }

    getFeaturedCollections() {
        return this.featuredCollections;
    }

    createNewCollection(collectionData) {
        const collection = {
            id: 'collection_' + Date.now(),
            ...collectionData,
            author: this.currentUser.username,
            authorAvatar: this.currentUser.avatar,
            modCount: 0,
            downloads: 0,
            rating: 0,
            featured: false,
            verified: false,
            mods: [],
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        
        this.userCollections.unshift(collection);
        localStorage.setItem('exuscraft_user_collections', JSON.stringify(this.userCollections));
        
        return collection;
    }
}

// Initialize Mod Collection System
let modCollectionSystem;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        modCollectionSystem = new ModCollectionSystem();
    });
} else {
    modCollectionSystem = new ModCollectionSystem();
}

window.modCollectionSystem = modCollectionSystem;