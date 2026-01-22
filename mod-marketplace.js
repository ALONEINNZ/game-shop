// MOD MARKETPLACE & CREATOR TOOLS
// Advanced marketplace with creator dashboard, analytics, and monetization

class ModMarketplace {
    constructor() {
        this.marketplace = {
            featured: [],
            trending: [],
            newReleases: [],
            categories: {},
            creators: {}
        };
        this.creatorTools = {
            analytics: {},
            earnings: {},
            uploads: {},
            reviews: {}
        };
        this.currentUser = null;
        this.isCreator = false;
        
        this.init();
    }

    init() {
        this.loadUserData();
        this.loadMarketplaceData();
        this.createMarketplaceUI();
        this.setupEventHandlers();
        this.loadCreatorTools();
        
        console.log('🛒 Mod Marketplace & Creator Tools Initialized');
    }

    loadUserData() {
        const userData = localStorage.getItem('exuscraft_user_data');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.isCreator = this.currentUser.role === 'creator' || this.currentUser.isCreator === true;
        }
    }

    loadMarketplaceData() {
        // Load marketplace data or generate sample data
        const savedData = localStorage.getItem('exuscraft_marketplace');
        if (savedData) {
            this.marketplace = JSON.parse(savedData);
        } else {
            this.generateSampleMarketplaceData();
        }
    }

    generateSampleMarketplaceData() {
        this.marketplace = {
            featured: [
                {
                    id: 'ultra-graphics-pro',
                    title: 'Ultra Graphics Pro',
                    creator: 'GraphicsMaster',
                    price: 9.99,
                    originalPrice: 14.99,
                    discount: 33,
                    rating: 4.9,
                    downloads: 250000,
                    category: 'Graphics',
                    game: 'Cyberpunk 2077',
                    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                    tags: ['4K', 'Ray Tracing', 'HDR'],
                    featured: true,
                    trending: true
                },
                {
                    id: 'survival-ultimate',
                    title: 'Ultimate Survival Pack',
                    creator: 'SurvivalExpert',
                    price: 4.99,
                    rating: 4.7,
                    downloads: 180000,
                    category: 'Gameplay',
                    game: 'Skyrim',
                    thumbnail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
                    tags: ['Survival', 'Hardcore', 'Immersion'],
                    featured: true
                }
            ],
            
            categories: {
                'Graphics': { count: 450, icon: '🎨' },
                'Gameplay': { count: 320, icon: '🎮' },
                'Audio': { count: 180, icon: '🔊' },
                'UI/UX': { count: 240, icon: '📱' },
                'Maps': { count: 160, icon: '🗺️' },
                'Characters': { count: 200, icon: '👤' },
                'Weapons': { count: 150, icon: '⚔️' },
                'Vehicles': { count: 120, icon: '🚗' }
            },
            
            creators: {
                'GraphicsMaster': {
                    name: 'GraphicsMaster',
                    avatar: this.generateAvatar('GraphicsMaster'),
                    verified: true,
                    totalMods: 12,
                    totalDownloads: 1200000,
                    totalEarnings: 45000,
                    rating: 4.8,
                    joinDate: '2022-03-15'
                },
                'SurvivalExpert': {
                    name: 'SurvivalExpert',
                    avatar: this.generateAvatar('SurvivalExpert'),
                    verified: true,
                    totalMods: 8,
                    totalDownloads: 800000,
                    totalEarnings: 28000,
                    rating: 4.6,
                    joinDate: '2022-07-20'
                }
            }
        };
    }

    generateAvatar(username) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        const color = colors[username.length % colors.length];
        const initial = username.charAt(0).toUpperCase();
        
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='${encodeURIComponent(color)}' width='40' height='40' rx='20'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='18' font-family='Arial'%3E${initial}%3C/text%3E%3C/svg%3E`;
    }

    createMarketplaceUI() {
        // Add marketplace button to navigation
        this.addMarketplaceButton();
        
        // Create marketplace panel
        this.createMarketplacePanel();
        
        // Add creator dashboard if user is creator
        if (this.isCreator) {
            this.createCreatorDashboard();
        }
    }

    addMarketplaceButton() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu || navMenu.querySelector('.marketplace-link')) return;
        
        const marketplaceLink = document.createElement('a');
        marketplaceLink.className = 'nav-link marketplace-link';
        marketplaceLink.href = '#';
        marketplaceLink.innerHTML = '<i class="fas fa-store"></i> Marketplace';
        marketplaceLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showMarketplacePanel();
        });
        
        // Insert after collections link
        const collectionsLink = navMenu.querySelector('a[href="collections.html"]');
        if (collectionsLink) {
            collectionsLink.parentNode.insertBefore(marketplaceLink, collectionsLink.nextSibling);
        } else {
            navMenu.appendChild(marketplaceLink);
        }
    }

    createMarketplacePanel() {
        const panel = document.createElement('div');
        panel.id = 'marketplacePanel';
        panel.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            z-index: 2000;
            display: none;
            overflow-y: auto;
        `;
        
        panel.innerHTML = `
            <div style="max-width: 1600px; margin: 0 auto; padding: 2rem;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
                    <div>
                        <h1 style="color: white; margin: 0 0 0.5rem 0; font-size: 2.5rem; font-weight: 800;">
                            Mod Marketplace
                        </h1>
                        <p style="color: rgba(255, 255, 255, 0.7); margin: 0; font-size: 1.1rem;">
                            Discover premium mods and support creators
                        </p>
                    </div>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        ${this.isCreator ? `
                            <button id="creatorDashboardBtn" style="
                                background: linear-gradient(135deg, #10B981, #059669);
                                border: none;
                                color: white;
                                padding: 0.75rem 1.5rem;
                                border-radius: 8px;
                                cursor: pointer;
                                font-weight: 600;
                            ">
                                <i class="fas fa-chart-line"></i> Creator Dashboard
                            </button>
                        ` : `
                            <button id="becomeCreatorBtn" style="
                                background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                                border: none;
                                color: white;
                                padding: 0.75rem 1.5rem;
                                border-radius: 8px;
                                cursor: pointer;
                                font-weight: 600;
                            ">
                                <i class="fas fa-star"></i> Become a Creator
                            </button>
                        `}
                        <button id="closeMarketplacePanel" style="
                            background: none;
                            border: none;
                            color: rgba(255, 255, 255, 0.6);
                            font-size: 2rem;
                            cursor: pointer;
                        ">×</button>
                    </div>
                </div>
                
                <!-- Featured Section -->
                <section style="margin-bottom: 4rem;">
                    <h2 style="color: white; margin: 0 0 2rem 0; font-size: 1.8rem; font-weight: 700;">
                        🌟 Featured Mods
                    </h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2rem;">
                        ${this.marketplace.featured.map(mod => this.generateModCardHTML(mod, true)).join('')}
                    </div>
                </section>
                
                <!-- Categories -->
                <section style="margin-bottom: 4rem;">
                    <h2 style="color: white; margin: 0 0 2rem 0; font-size: 1.8rem; font-weight: 700;">
                        📂 Browse Categories
                    </h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem;">
                        ${Object.entries(this.marketplace.categories).map(([category, data]) => `
                            <div class="category-card" onclick="modMarketplace.browseCategory('${category}')" style="
                                background: rgba(255, 255, 255, 0.05);
                                border: 1px solid rgba(255, 255, 255, 0.1);
                                border-radius: 15px;
                                padding: 2rem;
                                text-align: center;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            " onmouseover="this.style.background='rgba(91, 140, 255, 0.1)'; this.style.borderColor='rgba(91, 140, 255, 0.3)'"
                               onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'; this.style.borderColor='rgba(255, 255, 255, 0.1)'">
                                <div style="font-size: 3rem; margin-bottom: 1rem;">${data.icon}</div>
                                <h3 style="color: white; margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: 600;">${category}</h3>
                                <p style="color: rgba(255, 255, 255, 0.6); margin: 0; font-size: 0.9rem;">${data.count} mods</p>
                            </div>
                        `).join('')}
                    </div>
                </section>
                
                <!-- Top Creators -->
                <section style="margin-bottom: 4rem;">
                    <h2 style="color: white; margin: 0 0 2rem 0; font-size: 1.8rem; font-weight: 700;">
                        👑 Top Creators
                    </h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
                        ${Object.values(this.marketplace.creators).map(creator => this.generateCreatorCardHTML(creator)).join('')}
                    </div>
                </section>
                
                <!-- Marketplace Stats -->
                <section>
                    <h2 style="color: white; margin: 0 0 2rem 0; font-size: 1.8rem; font-weight: 700;">
                        📊 Marketplace Stats
                    </h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
                        ${this.generateMarketplaceStatsHTML()}
                    </div>
                </section>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.setupMarketplaceHandlers();
    }
    generateModCardHTML(mod, featured = false) {
        return `
            <div class="mod-card-marketplace" onclick="modMarketplace.viewMod('${mod.id}')" style="
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                overflow: hidden;
                cursor: pointer;
                transition: all 0.3s ease;
                ${featured ? 'border: 1px solid rgba(255, 215, 0, 0.3);' : ''}
            " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 20px 40px rgba(0, 0, 0, 0.3)'"
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                
                <!-- Thumbnail -->
                <div style="
                    height: 200px;
                    background: url('${mod.thumbnail}') center/cover;
                    position: relative;
                ">
                    ${mod.discount ? `
                        <div style="
                            position: absolute;
                            top: 1rem;
                            left: 1rem;
                            background: #EF4444;
                            color: white;
                            padding: 0.5rem 1rem;
                            border-radius: 12px;
                            font-weight: 600;
                            font-size: 0.8rem;
                        ">-${mod.discount}%</div>
                    ` : ''}
                    
                    ${mod.featured ? `
                        <div style="
                            position: absolute;
                            top: 1rem;
                            right: 1rem;
                            background: linear-gradient(135deg, #FFD700, #FFA500);
                            color: white;
                            padding: 0.5rem 1rem;
                            border-radius: 12px;
                            font-weight: 600;
                            font-size: 0.8rem;
                        ">⭐ Featured</div>
                    ` : ''}
                    
                    <div style="
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
                        padding: 1rem;
                    ">
                        <div style="color: #5B8CFF; font-size: 0.9rem; font-weight: 600;">${mod.game}</div>
                    </div>
                </div>
                
                <!-- Content -->
                <div style="padding: 1.5rem;">
                    <h3 style="margin: 0 0 0.5rem 0; color: white; font-size: 1.2rem; font-weight: 700;">
                        ${mod.title}
                    </h3>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <img src="${this.marketplace.creators[mod.creator]?.avatar || this.generateAvatar(mod.creator)}" 
                             alt="${mod.creator}" style="width: 20px; height: 20px; border-radius: 50%;">
                        <span style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">by ${mod.creator}</span>
                        ${this.marketplace.creators[mod.creator]?.verified ? `
                            <span style="color: #22C55E; font-size: 0.8rem;">✓</span>
                        ` : ''}
                    </div>
                    
                    <!-- Tags -->
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                        ${mod.tags.slice(0, 3).map(tag => `
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
                    
                    <!-- Stats -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: #FFD700;">⭐</span>
                            <span style="color: white; font-weight: 600;">${mod.rating}</span>
                        </div>
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">
                            ${this.formatNumber(mod.downloads)} downloads
                        </div>
                    </div>
                    
                    <!-- Price -->
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            ${mod.originalPrice && mod.originalPrice > mod.price ? `
                                <span style="
                                    color: rgba(255, 255, 255, 0.5);
                                    text-decoration: line-through;
                                    font-size: 0.9rem;
                                    margin-right: 0.5rem;
                                ">$${mod.originalPrice}</span>
                            ` : ''}
                            <span style="
                                color: white;
                                font-size: 1.3rem;
                                font-weight: 700;
                            ">${mod.price === 0 ? 'Free' : '$' + mod.price}</span>
                        </div>
                        
                        <button onclick="event.stopPropagation(); modMarketplace.purchaseMod('${mod.id}')" style="
                            background: linear-gradient(135deg, #10B981, #059669);
                            border: none;
                            color: white;
                            padding: 0.75rem 1.5rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 600;
                            font-size: 0.9rem;
                        ">
                            ${mod.price === 0 ? 'Download' : 'Buy Now'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateCreatorCardHTML(creator) {
        return `
            <div class="creator-card" onclick="modMarketplace.viewCreator('${creator.name}')" style="
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 2rem;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(91, 140, 255, 0.1)'; this.style.borderColor='rgba(91, 140, 255, 0.3)'"
               onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'; this.style.borderColor='rgba(255, 255, 255, 0.1)'">
                
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                    <img src="${creator.avatar}" alt="${creator.name}" style="
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        border: 2px solid rgba(91, 140, 255, 0.3);
                    ">
                    <div>
                        <h3 style="margin: 0 0 0.25rem 0; color: white; font-size: 1.2rem; font-weight: 700;">
                            ${creator.name}
                            ${creator.verified ? `
                                <span style="color: #22C55E; margin-left: 0.5rem;">✓</span>
                            ` : ''}
                        </h3>
                        <p style="margin: 0; color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">
                            Joined ${new Date(creator.joinDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1rem;">
                    <div style="text-align: center;">
                        <div style="color: white; font-size: 1.5rem; font-weight: 700;">${creator.totalMods}</div>
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">Mods</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="color: white; font-size: 1.5rem; font-weight: 700;">${this.formatNumber(creator.totalDownloads)}</div>
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">Downloads</div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="color: #FFD700;">⭐</span>
                        <span style="color: white; font-weight: 600;">${creator.rating}</span>
                    </div>
                    <div style="color: #10B981; font-weight: 600;">
                        $${this.formatNumber(creator.totalEarnings)} earned
                    </div>
                </div>
            </div>
        `;
    }

    generateMarketplaceStatsHTML() {
        const stats = [
            { label: 'Total Mods', value: '2,450', icon: '📦', color: '#5B8CFF' },
            { label: 'Active Creators', value: '340', icon: '👨‍💻', color: '#10B981' },
            { label: 'Total Downloads', value: '15.2M', icon: '📥', color: '#F59E0B' },
            { label: 'Revenue Shared', value: '$1.2M', icon: '💰', color: '#EF4444' }
        ];
        
        return stats.map(stat => `
            <div style="
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 2rem;
                text-align: center;
            ">
                <div style="font-size: 2.5rem; margin-bottom: 1rem;">${stat.icon}</div>
                <div style="color: ${stat.color}; font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">
                    ${stat.value}
                </div>
                <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">
                    ${stat.label}
                </div>
            </div>
        `).join('');
    }

    createCreatorDashboard() {
        // Creator dashboard will be created when needed
        this.creatorDashboardExists = false;
    }

    showCreatorDashboard() {
        if (!this.isCreator) {
            alert('Creator access required');
            return;
        }
        
        const dashboard = document.createElement('div');
        dashboard.id = 'creatorDashboard';
        dashboard.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            z-index: 2001;
            display: flex;
            overflow-y: auto;
        `;
        
        dashboard.innerHTML = `
            <div style="max-width: 1600px; margin: 0 auto; padding: 2rem; width: 100%;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
                    <div>
                        <h1 style="color: white; margin: 0 0 0.5rem 0; font-size: 2.5rem; font-weight: 800;">
                            Creator Dashboard
                        </h1>
                        <p style="color: rgba(255, 255, 255, 0.7); margin: 0; font-size: 1.1rem;">
                            Manage your mods and track performance
                        </p>
                    </div>
                    <button id="closeCreatorDashboard" style="
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 2rem;
                        cursor: pointer;
                    ">×</button>
                </div>
                
                <!-- Quick Stats -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                    ${this.generateCreatorStatsHTML()}
                </div>
                
                <!-- Main Content -->
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem;">
                    <!-- Left Column -->
                    <div>
                        <!-- Upload New Mod -->
                        <section style="
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 20px;
                            padding: 2rem;
                            margin-bottom: 2rem;
                        ">
                            <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.3rem;">Upload New Mod</h3>
                            <button onclick="modMarketplace.showUploadModal()" style="
                                background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                                border: none;
                                color: white;
                                padding: 1rem 2rem;
                                border-radius: 12px;
                                cursor: pointer;
                                font-size: 1rem;
                                font-weight: 600;
                                width: 100%;
                            ">
                                <i class="fas fa-plus"></i> Upload New Mod
                            </button>
                        </section>
                        
                        <!-- My Mods -->
                        <section style="
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 20px;
                            padding: 2rem;
                        ">
                            <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.3rem;">My Mods</h3>
                            <div id="creatorModsList">
                                ${this.generateCreatorModsHTML()}
                            </div>
                        </section>
                    </div>
                    
                    <!-- Right Column -->
                    <div>
                        <!-- Earnings -->
                        <section style="
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 20px;
                            padding: 2rem;
                            margin-bottom: 2rem;
                        ">
                            <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.3rem;">Earnings</h3>
                            ${this.generateEarningsHTML()}
                        </section>
                        
                        <!-- Recent Reviews -->
                        <section style="
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 20px;
                            padding: 2rem;
                        ">
                            <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.3rem;">Recent Reviews</h3>
                            ${this.generateRecentReviewsHTML()}
                        </section>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(dashboard);
        
        // Setup handlers
        document.getElementById('closeCreatorDashboard').addEventListener('click', () => {
            dashboard.remove();
        });
        
        dashboard.addEventListener('click', (e) => {
            if (e.target === dashboard) {
                dashboard.remove();
            }
        });
    }

    generateCreatorStatsHTML() {
        const stats = [
            { label: 'Total Mods', value: '12', icon: '📦', color: '#5B8CFF' },
            { label: 'Total Downloads', value: '1.2M', icon: '📥', color: '#10B981' },
            { label: 'Monthly Earnings', value: '$3,450', icon: '💰', color: '#F59E0B' },
            { label: 'Avg Rating', value: '4.8', icon: '⭐', color: '#EF4444' }
        ];
        
        return stats.map(stat => `
            <div style="
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 1.5rem;
                text-align: center;
            ">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${stat.icon}</div>
                <div style="color: ${stat.color}; font-size: 1.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                    ${stat.value}
                </div>
                <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.8rem;">
                    ${stat.label}
                </div>
            </div>
        `).join('');
    }

    generateCreatorModsHTML() {
        const myMods = [
            { name: 'Ultra Graphics Pro', downloads: 250000, rating: 4.9, earnings: 2499, status: 'published' },
            { name: 'Lighting Overhaul', downloads: 180000, rating: 4.7, earnings: 1800, status: 'published' },
            { name: 'Texture Pack HD', downloads: 95000, rating: 4.6, earnings: 950, status: 'review' }
        ];
        
        return myMods.map(mod => `
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            ">
                <div>
                    <h4 style="margin: 0 0 0.25rem 0; color: white; font-size: 1rem;">${mod.name}</h4>
                    <div style="display: flex; gap: 1rem; font-size: 0.8rem; color: rgba(255, 255, 255, 0.6);">
                        <span>📥 ${this.formatNumber(mod.downloads)}</span>
                        <span>⭐ ${mod.rating}</span>
                        <span>💰 $${this.formatNumber(mod.earnings)}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <span style="
                        background: ${mod.status === 'published' ? '#10B981' : '#F59E0B'};
                        color: white;
                        padding: 0.25rem 0.75rem;
                        border-radius: 12px;
                        font-size: 0.7rem;
                        font-weight: 600;
                        text-transform: uppercase;
                    ">${mod.status}</span>
                    <button style="
                        background: none;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: rgba(255, 255, 255, 0.7);
                        padding: 0.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 0.8rem;
                    ">Edit</button>
                </div>
            </div>
        `).join('');
    }

    generateEarningsHTML() {
        return `
            <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: rgba(255, 255, 255, 0.7);">This Month</span>
                    <span style="color: #10B981; font-weight: 600;">$3,450</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: rgba(255, 255, 255, 0.7);">Last Month</span>
                    <span style="color: white; font-weight: 600;">$2,890</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span style="color: rgba(255, 255, 255, 0.7);">Total Earned</span>
                    <span style="color: white; font-weight: 600;">$45,230</span>
                </div>
            </div>
            
            <button style="
                background: linear-gradient(135deg, #10B981, #059669);
                border: none;
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                width: 100%;
            ">Request Payout</button>
        `;
    }

    generateRecentReviewsHTML() {
        const reviews = [
            { user: 'GamePlayer123', rating: 5, comment: 'Amazing graphics mod! Totally transformed my game.' },
            { user: 'ModLover', rating: 4, comment: 'Great work, but could use better performance optimization.' },
            { user: 'TechGuru', rating: 5, comment: 'Professional quality mod. Highly recommended!' }
        ];
        
        return reviews.map(review => `
            <div style="
                padding: 1rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            ">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: white; font-weight: 600; font-size: 0.9rem;">${review.user}</span>
                    <div style="color: #FFD700;">
                        ${'⭐'.repeat(review.rating)}
                    </div>
                </div>
                <p style="margin: 0; color: rgba(255, 255, 255, 0.8); font-size: 0.8rem; line-height: 1.4;">
                    "${review.comment}"
                </p>
            </div>
        `).join('');
    }

    setupMarketplaceHandlers() {
        // Close panel
        document.getElementById('closeMarketplacePanel').addEventListener('click', () => {
            document.getElementById('marketplacePanel').style.display = 'none';
        });
        
        // Creator dashboard
        const creatorBtn = document.getElementById('creatorDashboardBtn');
        if (creatorBtn) {
            creatorBtn.addEventListener('click', () => {
                this.showCreatorDashboard();
            });
        }
        
        // Become creator
        const becomeCreatorBtn = document.getElementById('becomeCreatorBtn');
        if (becomeCreatorBtn) {
            becomeCreatorBtn.addEventListener('click', () => {
                this.showBecomeCreatorModal();
            });
        }
        
        // Close on outside click
        document.getElementById('marketplacePanel').addEventListener('click', (e) => {
            if (e.target.id === 'marketplacePanel') {
                document.getElementById('marketplacePanel').style.display = 'none';
            }
        });
    }

    setupEventHandlers() {
        // Additional event handlers can be added here
    }

    loadCreatorTools() {
        if (this.isCreator) {
            // Load creator-specific tools and data
            this.loadCreatorAnalytics();
        }
    }

    loadCreatorAnalytics() {
        // Load creator analytics data
        const savedAnalytics = localStorage.getItem('exuscraft_creator_analytics');
        if (savedAnalytics) {
            this.creatorTools.analytics = JSON.parse(savedAnalytics);
        }
    }

    showMarketplacePanel() {
        document.getElementById('marketplacePanel').style.display = 'block';
    }

    browseCategory(category) {
        alert(`Browsing ${category} category - Feature coming soon!`);
    }

    viewMod(modId) {
        alert(`Viewing mod ${modId} - Feature coming soon!`);
    }

    viewCreator(creatorName) {
        alert(`Viewing creator ${creatorName} - Feature coming soon!`);
    }

    purchaseMod(modId) {
        const mod = this.marketplace.featured.find(m => m.id === modId);
        if (mod) {
            if (mod.price === 0) {
                alert(`Downloading ${mod.title} for free!`);
            } else {
                alert(`Purchasing ${mod.title} for $${mod.price} - Payment system coming soon!`);
            }
        }
    }

    showBecomeCreatorModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 2002;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        modal.innerHTML = `
            <div style="
                background: rgba(10, 14, 20, 0.95);
                border: 1px solid rgba(91, 140, 255, 0.3);
                border-radius: 20px;
                padding: 3rem;
                max-width: 600px;
                width: 90%;
                text-align: center;
            ">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🌟</div>
                <h2 style="color: white; margin: 0 0 1rem 0; font-size: 2rem;">Become a Creator</h2>
                <p style="color: rgba(255, 255, 255, 0.8); margin: 0 0 2rem 0; line-height: 1.6;">
                    Join our creator program and start earning from your mods! Get access to advanced analytics, 
                    creator tools, and a 70% revenue share on all sales.
                </p>
                
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0;">
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">💰</div>
                        <div style="color: white; font-weight: 600;">70% Revenue</div>
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">Share</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">📊</div>
                        <div style="color: white; font-weight: 600;">Analytics</div>
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">Dashboard</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🛠️</div>
                        <div style="color: white; font-weight: 600;">Creator</div>
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">Tools</div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button onclick="this.closest('div').parentElement.remove()" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 1rem 2rem;
                        border-radius: 12px;
                        cursor: pointer;
                        font-size: 1rem;
                    ">Maybe Later</button>
                    <button onclick="modMarketplace.applyForCreator(); this.closest('div').parentElement.remove();" style="
                        background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                        border: none;
                        color: white;
                        padding: 1rem 2rem;
                        border-radius: 12px;
                        cursor: pointer;
                        font-size: 1rem;
                        font-weight: 600;
                    ">Apply Now</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    showUploadModal() {
        alert('Upload modal - Feature coming soon! This will include drag & drop, metadata forms, and preview generation.');
    }

    applyForCreator() {
        // Simulate creator application
        setTimeout(() => {
            alert('Creator application submitted! You will receive an email within 24 hours.');
        }, 1000);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Public API methods
    getMarketplaceData() {
        return this.marketplace;
    }

    getCreatorTools() {
        return this.creatorTools;
    }

    saveMarketplaceData() {
        localStorage.setItem('exuscraft_marketplace', JSON.stringify(this.marketplace));
    }
}

// Initialize Mod Marketplace
let modMarketplace;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        modMarketplace = new ModMarketplace();
    });
} else {
    modMarketplace = new ModMarketplace();
}

window.modMarketplace = modMarketplace;