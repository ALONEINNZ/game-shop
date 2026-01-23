// LIGHTWEIGHT APP.JS - Simplified version to reduce conflicts and bugs
console.log('🚀 Loading Lightweight App...');

// Simple, conflict-free implementations
class LightweightApp {
    constructor() {
        this.isLoading = false;
        this.currentUser = null;
        this.mods = [];
        this.init();
    }

    init() {
        console.log('⚡ Initializing lightweight app...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.hideLoading();
        this.setupBasicNavigation();
        this.loadBasicMods();
        this.setupBasicInteractions();
        console.log('✅ Lightweight app ready');
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(() => {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }

    setupBasicNavigation() {
        // Simple dropdown toggles without conflicts
        window.toggleGameDropdown = () => this.toggleDropdown('gameDropdown');
        window.toggleSocialDropdown = () => this.toggleDropdown('socialDropdown');
        window.toggleCreatorDropdown = () => this.toggleDropdown('creatorDropdown');
        window.toggleStreamingDropdown = () => this.toggleDropdown('streamingDropdown');
        window.toggleBlockchainDropdown = () => this.toggleDropdown('blockchainDropdown');
        window.toggleVRARDropdown = () => this.toggleDropdown('vrArDropdown');
        window.toggleAIDropdown = () => this.toggleDropdown('aiDropdown');
        window.toggleMLDropdown = () => this.toggleDropdown('mlDropdown');
        
        // Simple scroll functions
        window.scrollToMods = () => this.smoothScrollTo('games');
        window.scrollToBlockchain = () => this.smoothScrollTo('blockchain');
        window.scrollToVRAR = () => this.smoothScrollTo('vr-ar');
        window.scrollToML = () => this.smoothScrollTo('machine-learning');
    }

    toggleDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            // Close all other dropdowns first
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu.id !== dropdownId) {
                    menu.classList.remove('show');
                }
            });
            
            dropdown.classList.toggle('show');
        }
    }

    smoothScrollTo(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Account for navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    loadBasicMods() {
        // Simple mod data
        this.mods = [
            {
                id: 1,
                title: 'Ultra Graphics Overhaul',
                game: 'Cyberpunk 2077',
                price: '$12.99',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                rating: 4.9,
                downloads: 45230,
                category: 'Graphics',
                description: 'Transform your Cyberpunk 2077 experience with stunning 8K textures and advanced ray tracing.'
            },
            {
                id: 2,
                title: 'Immersive Gameplay Rebalance',
                game: 'Skyrim',
                price: '$8.99',
                image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=300&fit=crop',
                rating: 4.7,
                downloads: 23450,
                category: 'Gameplay',
                description: 'A complete overhaul of Skyrim\'s combat, magic, and progression systems.'
            },
            {
                id: 3,
                title: 'Next-Gen Vehicle Pack',
                game: 'GTA V',
                price: '$15.99',
                image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
                rating: 4.6,
                downloads: 18920,
                category: 'Vehicles',
                description: 'Add 50+ meticulously detailed vehicles with custom handling and 4K textures.'
            },
            {
                id: 4,
                title: 'Minecraft Shader Pack',
                game: 'Minecraft',
                price: 'Free',
                image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop',
                rating: 4.8,
                downloads: 67890,
                category: 'Graphics',
                description: 'Beautiful shaders that transform Minecraft with realistic lighting and shadows.'
            },
            {
                id: 5,
                title: 'Enhanced Weather System',
                game: 'Fallout 4',
                price: '$6.99',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                rating: 4.5,
                downloads: 12340,
                category: 'Gameplay',
                description: 'Dynamic weather system with realistic storms and atmospheric effects.'
            },
            {
                id: 6,
                title: 'Combat Overhaul',
                game: 'The Witcher 3',
                price: '$9.99',
                image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
                rating: 4.4,
                downloads: 15670,
                category: 'Gameplay',
                description: 'Revamped combat system with new animations and mechanics.'
            }
        ];

        this.renderMods();
    }

    renderMods() {
        const containers = [
            'featuredGames',
            'newReleases', 
            'dealsGames',
            'allGames'
        ];

        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = this.generateModsHTML();
            }
        });
    }

    generateModsHTML() {
        return this.mods.map(mod => `
            <div class="game-card" onclick="openModDetails('${mod.id}')">
                <div class="game-image">
                    <img src="${mod.image}" alt="${mod.title}" loading="lazy">
                    <div class="game-overlay">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${mod.id})">
                            <i class="fas fa-shopping-cart"></i>
                            ${mod.price}
                        </button>
                    </div>
                </div>
                <div class="game-info">
                    <h3 class="game-title">${mod.title}</h3>
                    <p class="game-genre">${mod.game}</p>
                    <div class="game-rating">
                        <div class="stars">
                            ${'★'.repeat(Math.floor(mod.rating))}${'☆'.repeat(5 - Math.floor(mod.rating))}
                        </div>
                        <span class="rating-text">${mod.rating}</span>
                    </div>
                    <div class="game-stats">
                        <span><i class="fas fa-download"></i> ${mod.downloads.toLocaleString()}</span>
                        <span><i class="fas fa-tag"></i> ${mod.category}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupBasicInteractions() {
        // Simple modal functions
        window.openModDetails = (modId) => {
            const mod = this.mods.find(m => m.id == modId);
            if (mod) {
                this.showModModal(mod);
            }
        };

        window.addToCart = (modId) => {
            console.log('Adding to cart:', modId);
            this.showNotification('Added to cart!', 'success');
        };

        window.showLogin = () => this.showAuthModal('login');
        window.showRegister = () => this.showAuthModal('register');
        window.closeModal = () => this.hideAllModals();
        window.closeAuthModal = () => this.hideModal('authModal');
        
        // Simple search
        window.searchAllMods = () => {
            const searchInput = document.getElementById('gameSearch');
            if (searchInput) {
                const query = searchInput.value.toLowerCase();
                console.log('Searching for:', query);
                // Simple search implementation
            }
        };

        // Simple filter functions
        window.filterByGame = (game) => {
            console.log('Filtering by game:', game);
            this.showNotification(`Showing ${game} mods`, 'info');
        };

        window.filterAllMods = () => {
            console.log('Filtering mods');
        };

        window.sortMods = () => {
            console.log('Sorting mods');
        };
    }

    showModModal(mod) {
        const modal = document.getElementById('gameModal') || this.createGameModal();
        const content = document.getElementById('gameDetails');
        
        if (content) {
            content.innerHTML = `
                <div class="mod-details">
                    <div class="mod-header">
                        <img src="${mod.image}" alt="${mod.title}" class="mod-image">
                        <div class="mod-info">
                            <h2>${mod.title}</h2>
                            <p class="mod-game">${mod.game}</p>
                            <div class="mod-rating">
                                <span class="stars">${'★'.repeat(Math.floor(mod.rating))}</span>
                                <span>${mod.rating}/5</span>
                            </div>
                            <p class="mod-price">${mod.price}</p>
                        </div>
                    </div>
                    <div class="mod-description">
                        <h3>Description</h3>
                        <p>${mod.description}</p>
                    </div>
                    <div class="mod-stats">
                        <div class="stat">
                            <i class="fas fa-download"></i>
                            <span>${mod.downloads.toLocaleString()} downloads</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-tag"></i>
                            <span>${mod.category}</span>
                        </div>
                    </div>
                    <div class="mod-actions">
                        <button class="btn btn-primary" onclick="addToCart(${mod.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="btn btn-outline" onclick="addToWishlist(${mod.id})">
                            <i class="fas fa-heart"></i> Wishlist
                        </button>
                    </div>
                </div>
            `;
        }
        
        modal.style.display = 'flex';
    }

    createGameModal() {
        const modal = document.createElement('div');
        modal.id = 'gameModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="closeModal()">&times;</span>
                <div id="gameDetails"></div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    showAuthModal(type) {
        let modal = document.getElementById('authModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'authModal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close" onclick="closeAuthModal()">&times;</span>
                    <div id="authContent"></div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        const content = document.getElementById('authContent');
        if (content) {
            content.innerHTML = type === 'login' ? this.getLoginForm() : this.getRegisterForm();
        }
        
        modal.style.display = 'flex';
    }

    getLoginForm() {
        return `
            <div class="auth-form">
                <h2>Login to ExusCraft</h2>
                <form onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
                <p>Don't have an account? <a href="#" onclick="showRegister()">Sign up</a></p>
            </div>
        `;
    }

    getRegisterForm() {
        return `
            <div class="auth-form">
                <h2>Join ExusCraft</h2>
                <form onsubmit="handleRegister(event)">
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Create Account</button>
                </form>
                <p>Already have an account? <a href="#" onclick="showLogin()">Login</a></p>
            </div>
        `;
    }

    hideAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Simple global functions
window.handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempted');
    window.lightweightApp.showNotification('Login functionality coming soon!', 'info');
};

window.handleRegister = (e) => {
    e.preventDefault();
    console.log('Register attempted');
    window.lightweightApp.showNotification('Registration functionality coming soon!', 'info');
};

window.addToWishlist = (modId) => {
    console.log('Adding to wishlist:', modId);
    window.lightweightApp.showNotification('Added to wishlist!', 'success');
};

// Initialize lightweight app
window.lightweightApp = new LightweightApp();

console.log('✅ Lightweight App loaded successfully!');