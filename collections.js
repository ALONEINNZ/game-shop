// Collections page functionality
let currentPage = 1;
let isLoading = false;
let hasMoreCollections = true;
let currentUser = null;
let allCollections = [];

// Sample collections data
const sampleCollections = [
    {
        _id: 'col1',
        name: 'Ultimate Minecraft Performance Pack',
        description: 'A carefully curated collection of performance mods to maximize your FPS while maintaining visual quality. Includes Sodium, Lithium, and more!',
        gameTitle: 'Minecraft',
        category: 'Performance',
        creatorName: 'CaffeineMC',
        creatorAvatar: 'https://ui-avatars.com/api/?name=CaffeineMC&background=5B8CFF&color=fff',
        downloads: 125000,
        likeCount: 8500,
        rating: { average: 4.9, count: 2100 },
        isFeatured: true,
        isPublic: true,
        mods: [
            { title: 'Sodium', image: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?w=100&h=100&fit=crop' },
            { title: 'Lithium', image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=100&h=100&fit=crop' },
            { title: 'Phosphor', image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=100&h=100&fit=crop' }
        ],
        tags: ['performance', 'fps', 'optimization'],
        createdAt: '2026-01-10'
    },
    {
        _id: 'col2',
        name: 'Skyrim Visual Overhaul 2026',
        description: 'Transform Skyrim into a breathtaking visual masterpiece with this collection of graphics mods, ENB presets, and texture packs.',
        gameTitle: 'Skyrim',
        category: 'Graphics Enhancement',
        creatorName: 'SkyrimModder',
        creatorAvatar: 'https://ui-avatars.com/api/?name=SkyrimModder&background=7C5CFF&color=fff',
        downloads: 89000,
        likeCount: 6200,
        rating: { average: 4.8, count: 1800 },
        isFeatured: true,
        isPublic: true,
        mods: [
            { title: 'ENB Series', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=100&h=100&fit=crop' },
            { title: 'SkyUI', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=100&h=100&fit=crop' }
        ],
        tags: ['graphics', 'visual', 'enb'],
        createdAt: '2026-01-08'
    },
    {
        _id: 'col3',
        name: 'Minecraft Shader Collection',
        description: 'The best shader packs for Minecraft, from realistic to stylized. Compatible with Iris and OptiFine.',
        gameTitle: 'Minecraft',
        category: 'Graphics Enhancement',
        creatorName: 'IrisShaders',
        creatorAvatar: 'https://ui-avatars.com/api/?name=IrisShaders&background=C15CFF&color=fff',
        downloads: 156000,
        likeCount: 9800,
        rating: { average: 4.9, count: 3200 },
        isFeatured: true,
        isPublic: true,
        mods: [
            { title: 'Iris Shaders', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=100&h=100&fit=crop' },
            { title: 'Complementary', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop' }
        ],
        tags: ['shaders', 'graphics'],
        createdAt: '2026-01-05'
    },
    {
        _id: 'col4',
        name: 'GTA V Realism Pack',
        description: 'Make Los Santos feel more alive with realistic graphics, physics, and gameplay enhancements.',
        gameTitle: 'GTA V',
        category: 'Gameplay Overhaul',
        creatorName: 'GTAModder',
        creatorAvatar: 'https://ui-avatars.com/api/?name=GTAModder&background=5B8CFF&color=fff',
        downloads: 67000,
        likeCount: 4500,
        rating: { average: 4.7, count: 1200 },
        isFeatured: false,
        isPublic: true,
        mods: [
            { title: 'NaturalVision', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop' }
        ],
        tags: ['realism', 'graphics'],
        createdAt: '2026-01-03'
    },
    {
        _id: 'col5',
        name: 'Minecraft Quality of Life',
        description: 'Essential mods that make Minecraft more enjoyable without changing core gameplay.',
        gameTitle: 'Minecraft',
        category: 'Quality of Life',
        creatorName: 'ModPacker',
        creatorAvatar: 'https://ui-avatars.com/api/?name=ModPacker&background=7C5CFF&color=fff',
        downloads: 98000,
        likeCount: 7100,
        rating: { average: 4.8, count: 2400 },
        isFeatured: true,
        isPublic: true,
        mods: [
            { title: 'JEI', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=100&h=100&fit=crop' },
            { title: 'Inventory Tweaks', image: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?w=100&h=100&fit=crop' }
        ],
        tags: ['qol', 'utility'],
        createdAt: '2026-01-01'
    },
    {
        _id: 'col6',
        name: 'Cyberpunk Enhancement Suite',
        description: 'Bug fixes, performance improvements, and quality of life mods for Night City.',
        gameTitle: 'Cyberpunk 2077',
        category: 'Bug Fixes',
        creatorName: 'NightCityMods',
        creatorAvatar: 'https://ui-avatars.com/api/?name=NightCityMods&background=C15CFF&color=fff',
        downloads: 45000,
        likeCount: 3200,
        rating: { average: 4.6, count: 890 },
        isFeatured: false,
        isPublic: true,
        mods: [
            { title: 'Cyber Engine Tweaks', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop' }
        ],
        tags: ['bugfix', 'performance'],
        createdAt: '2025-12-28'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const loading = document.getElementById('loading');
    if (loading) setTimeout(() => loading.style.display = 'none', 500);
    
    allCollections = [...sampleCollections];
    loadFeaturedCollections();
    loadCollections(true);
    checkAuthStatus();
    initTheme();
    setTimeout(initGoogleSignIn, 500);
});

// Theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Dropdowns
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('.user-profile-dropdown')) {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.classList.remove('show');
    }
});


// Auth functions
function showLogin() {
    document.getElementById('authContent').innerHTML = `
        <div class="auth-form">
            <div class="auth-header">
                <h2>Welcome Back</h2>
                <p>Sign in to your ExusCraft account</p>
            </div>
            <div id="googleSignInDiv" style="display: flex; justify-content: center; margin: 1.5rem 0;"></div>
            <div class="auth-footer">
                Don't have an account? <a href="#" onclick="showRegister()">Join ExusCraft</a>
            </div>
        </div>
    `;
    const modal = document.getElementById('authModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    setTimeout(() => {
        if (typeof google !== 'undefined' && google.accounts) {
            google.accounts.id.renderButton(document.getElementById('googleSignInDiv'),
                { theme: 'filled_blue', size: 'large', text: 'signin_with', shape: 'rectangular', width: 280 });
        }
    }, 100);
}

function showRegister() {
    document.getElementById('authContent').innerHTML = `
        <div class="auth-form">
            <div class="auth-header">
                <h2>Join ExusCraft</h2>
                <p>Create your account and start exploring</p>
            </div>
            <div id="googleSignUpDiv" style="display: flex; justify-content: center; margin: 1.5rem 0;"></div>
            <div class="auth-footer">
                Already have an account? <a href="#" onclick="showLogin()">Sign In</a>
            </div>
        </div>
    `;
    const modal = document.getElementById('authModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    setTimeout(() => {
        if (typeof google !== 'undefined' && google.accounts) {
            google.accounts.id.renderButton(document.getElementById('googleSignUpDiv'),
                { theme: 'filled_blue', size: 'large', text: 'signup_with', shape: 'rectangular', width: 280 });
        }
    }, 100);
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

function initGoogleSignIn() {
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
            client_id: '125508254360-rdb0cu5l4b2majds3i6pa13663uchku0.apps.googleusercontent.com',
            callback: handleGoogleCredentialResponse
        });
    }
}

async function handleGoogleCredentialResponse(response) {
    try {
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Authentication failed');
        
        localStorage.setItem('token', data.token);
        currentUser = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name || data.user.username,
            picture: data.user.picture,
            username: data.user.username
        };
        localStorage.setItem('user', JSON.stringify(currentUser));
        updateUserNavigation();
        closeAuthModal();
        showMessage(`Welcome, ${currentUser.name}! 🎉`, 'success');
    } catch (error) {
        console.error('Error:', error);
        showMessage('Login failed. Please try again.', 'error');
    }
}

function checkAuthStatus() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            updateUserNavigation();
        } catch (e) {
            localStorage.removeItem('user');
        }
    }
}

function updateUserNavigation() {
    const navAuth = document.getElementById('navAuth');
    const navUser = document.getElementById('navUser');
    
    if (currentUser) {
        if (navAuth) navAuth.style.display = 'none';
        if (navUser) navUser.style.display = 'flex';
        
        const usernameEl = document.getElementById('username');
        const avatarEl = document.getElementById('userAvatar');
        const avatarLargeEl = document.getElementById('userAvatarLarge');
        const emailEl = document.getElementById('userEmail');
        
        if (usernameEl) usernameEl.textContent = currentUser.name || 'User';
        if (emailEl) emailEl.textContent = currentUser.email || '';
        
        const avatarUrl = currentUser.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=5B8CFF&color=fff&size=48`;
        if (avatarEl) avatarEl.src = avatarUrl;
        if (avatarLargeEl) avatarLargeEl.src = avatarUrl;
    } else {
        if (navUser) navUser.style.display = 'none';
        if (navAuth) navAuth.style.display = 'flex';
    }
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    currentUser = null;
    updateUserNavigation();
    showMessage('Logged out successfully!', 'success');
}

function showMessage(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `message-toast ${type} show`;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Redirect functions
function showProfile() { window.location.href = 'index.html#profile'; }
function showMyMods() { window.location.href = 'index.html#mymods'; }
function showFavorites() { window.location.href = 'index.html#favorites'; }
function showDownloads() { window.location.href = 'index.html#downloads'; }
function showSettings() { window.location.href = 'index.html#settings'; }
function showOrders() { showDownloads(); }
function showUploadModal() {
    if (!currentUser) { showLogin(); return; }
    window.location.href = 'index.html#upload';
}

// Load Featured Collections
function loadFeaturedCollections() {
    const container = document.getElementById('featuredCollections');
    if (!container) return;
    
    const featured = allCollections.filter(c => c.isFeatured);
    
    container.innerHTML = featured.map((collection, index) => `
        <div class="collection-featured-card fade-in" style="animation-delay: ${index * 0.1}s" onclick="viewCollection('${collection._id}')">
            <div class="collection-featured-header">
                <span class="featured-badge"><i class="fas fa-star"></i> Featured</span>
                <span class="collection-game-badge">${collection.gameTitle}</span>
            </div>
            <div class="collection-featured-content">
                <h3>${collection.name}</h3>
                <p>${collection.description.substring(0, 120)}...</p>
                <div class="collection-creator">
                    <img src="${collection.creatorAvatar}" alt="${collection.creatorName}">
                    <span>by ${collection.creatorName}</span>
                </div>
            </div>
            <div class="collection-featured-footer">
                <div class="collection-stats">
                    <span><i class="fas fa-download"></i> ${formatNumber(collection.downloads)}</span>
                    <span><i class="fas fa-heart"></i> ${formatNumber(collection.likeCount)}</span>
                    <span><i class="fas fa-star"></i> ${collection.rating.average}</span>
                </div>
                <div class="collection-mods-preview">
                    ${collection.mods.slice(0, 3).map(mod => `
                        <img src="${mod.image}" alt="${mod.title}" title="${mod.title}">
                    `).join('')}
                    ${collection.mods.length > 3 ? `<span class="more-mods">+${collection.mods.length - 3}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Load All Collections
function loadCollections(reset = false) {
    if (reset) {
        currentPage = 1;
        hasMoreCollections = true;
    }
    
    if (isLoading || !hasMoreCollections) return;
    isLoading = true;
    
    const container = document.getElementById('collectionsGrid');
    if (!container) return;
    
    if (reset) container.innerHTML = '';
    
    const filtered = getFilteredCollections();
    const perPage = 6;
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const pageCollections = filtered.slice(start, end);
    
    if (pageCollections.length === 0 && reset) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                <i class="fas fa-folder-open" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <h3>No collections found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        isLoading = false;
        return;
    }
    
    pageCollections.forEach((collection, index) => {
        container.innerHTML += createCollectionCard(collection, index);
    });
    
    hasMoreCollections = end < filtered.length;
    const loadMoreBtn = document.getElementById('loadMoreCollections');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = hasMoreCollections ? 'inline-flex' : 'none';
    }
    
    currentPage++;
    isLoading = false;
}

function loadMoreCollections() {
    loadCollections(false);
}

// Get Filtered Collections
function getFilteredCollections() {
    let filtered = [...allCollections];
    
    const searchTerm = document.getElementById('collectionSearch')?.value.toLowerCase() || '';
    const gameFilter = document.getElementById('gameFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const sortFilter = document.getElementById('sortFilter')?.value || 'newest';
    
    if (searchTerm) {
        filtered = filtered.filter(c => 
            c.name.toLowerCase().includes(searchTerm) ||
            c.description.toLowerCase().includes(searchTerm) ||
            c.tags.some(t => t.toLowerCase().includes(searchTerm))
        );
    }
    
    if (gameFilter) {
        filtered = filtered.filter(c => c.gameTitle === gameFilter);
    }
    
    if (categoryFilter) {
        filtered = filtered.filter(c => c.category === categoryFilter);
    }
    
    // Sort
    switch (sortFilter) {
        case 'featured':
            filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.downloads - a.downloads);
            break;
        case 'popular':
            filtered.sort((a, b) => b.likeCount - a.likeCount);
            break;
        case 'downloads':
            filtered.sort((a, b) => b.downloads - a.downloads);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating.average - a.rating.average);
            break;
        case 'newest':
        default:
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    return filtered;
}

// Create Collection Card
function createCollectionCard(collection, index) {
    const featuredBadge = collection.isFeatured ? '<span class="featured-tag"><i class="fas fa-star"></i> Featured</span>' : '';
    return `
        <div class="game-card collection-card fade-in" style="animation-delay: ${index * 0.05}s" onclick="viewCollection('${collection._id}')">
            <div class="game-card-image collection-card-image">
                <div class="collection-mods-grid">
                    ${collection.mods.slice(0, 4).map(mod => `
                        <img src="${mod.image}" alt="${mod.title}">
                    `).join('')}
                </div>
                <div class="game-card-overlay">
                    ${featuredBadge}
                    <span class="game-badge">${collection.gameTitle}</span>
                </div>
            </div>
            <div class="game-card-content">
                <h3 class="game-card-title">${collection.name}</h3>
                <p class="game-card-description">${collection.description.substring(0, 80)}...</p>
                <div class="collection-creator-mini">
                    <img src="${collection.creatorAvatar}" alt="${collection.creatorName}">
                    <span>by ${collection.creatorName}</span>
                </div>
                <div class="game-card-stats">
                    <span><i class="fas fa-download"></i> ${formatNumber(collection.downloads)}</span>
                    <span><i class="fas fa-heart"></i> ${formatNumber(collection.likeCount)}</span>
                    <span><i class="fas fa-star"></i> ${collection.rating.average}</span>
                    <span><i class="fas fa-puzzle-piece"></i> ${collection.mods.length}</span>
                </div>
            </div>
        </div>
    `;
}

// View Collection Details
function viewCollection(collectionId) {
    const collection = allCollections.find(c => c._id === collectionId);
    if (!collection) return;
    
    const modal = document.getElementById('collectionModal');
    const details = document.getElementById('collectionDetails');
    
    details.innerHTML = `
        <div class="collection-detail">
            <div class="collection-detail-header">
                <div class="collection-detail-info">
                    <span class="collection-game-tag">${collection.gameTitle}</span>
                    <h2>${collection.name}</h2>
                    <p class="collection-detail-desc">${collection.description}</p>
                    <div class="collection-detail-creator">
                        <img src="${collection.creatorAvatar}" alt="${collection.creatorName}">
                        <div>
                            <span class="creator-name">${collection.creatorName}</span>
                            <span class="creator-date">Created ${new Date(collection.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                <div class="collection-detail-stats">
                    <div class="stat-box">
                        <i class="fas fa-download"></i>
                        <span class="stat-number">${formatNumber(collection.downloads)}</span>
                        <span class="stat-label">Downloads</span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-heart"></i>
                        <span class="stat-number">${formatNumber(collection.likeCount)}</span>
                        <span class="stat-label">Likes</span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-star"></i>
                        <span class="stat-number">${collection.rating.average}</span>
                        <span class="stat-label">${collection.rating.count} ratings</span>
                    </div>
                </div>
            </div>
            
            <div class="collection-detail-actions">
                <button onclick="downloadCollection('${collection._id}')" class="btn btn-primary btn-large">
                    <i class="fas fa-download"></i> Download All Mods
                </button>
                <button onclick="likeCollection('${collection._id}')" class="btn btn-outline btn-large">
                    <i class="fas fa-heart"></i> Like Collection
                </button>
            </div>
            
            <div class="collection-tags">
                ${collection.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
            
            <div class="collection-mods-section">
                <h3><i class="fas fa-puzzle-piece"></i> Mods in this Collection (${collection.mods.length})</h3>
                <div class="collection-mods-list">
                    ${collection.mods.map(mod => `
                        <div class="collection-mod-item">
                            <img src="${mod.image}" alt="${mod.title}">
                            <div class="mod-item-info">
                                <h4>${mod.title}</h4>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeCollectionModal() {
    const modal = document.getElementById('collectionModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

// Download Collection
function downloadCollection(collectionId) {
    const collection = allCollections.find(c => c._id === collectionId);
    if (!collection) return;
    
    showMessage(`Downloading ${collection.mods.length} mods from "${collection.name}"...`, 'success');
    
    // Simulate download progress
    setTimeout(() => {
        showMessage(`Collection "${collection.name}" downloaded successfully! 🎉`, 'success');
    }, 2000);
}

// Like Collection
function likeCollection(collectionId) {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    const collection = allCollections.find(c => c._id === collectionId);
    if (collection) {
        collection.likeCount++;
        showMessage('Collection liked! ❤️', 'success');
        viewCollection(collectionId); // Refresh modal
    }
}

// Search Collections
function searchCollections() {
    loadCollections(true);
}

function handleNavSearch(event) {
    if (event.key === 'Enter') {
        const searchInput = document.getElementById('collectionSearch');
        if (searchInput) {
            searchInput.value = event.target.value;
            searchCollections();
        }
    }
}

// Filter Collections
function filterCollections() {
    loadCollections(true);
}

// Create Collection Modal
function showCreateCollection() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    const modal = document.getElementById('createCollectionModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

function closeCreateCollectionModal() {
    const modal = document.getElementById('createCollectionModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

// Create Collection
function createCollection(event) {
    event.preventDefault();
    
    const name = document.getElementById('collectionName').value;
    const description = document.getElementById('collectionDescription').value;
    const game = document.getElementById('collectionGame').value;
    const category = document.getElementById('collectionCategory').value;
    const tags = document.getElementById('collectionTags').value.split(',').map(t => t.trim()).filter(t => t);
    const isPublic = document.getElementById('collectionPublic').checked;
    
    const newCollection = {
        _id: 'col_' + Date.now(),
        name,
        description,
        gameTitle: game,
        category,
        creatorName: currentUser.name || currentUser.username,
        creatorAvatar: currentUser.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=5B8CFF&color=fff`,
        downloads: 0,
        likeCount: 0,
        rating: { average: 0, count: 0 },
        isFeatured: false,
        isPublic,
        mods: [],
        tags,
        createdAt: new Date().toISOString()
    };
    
    allCollections.unshift(newCollection);
    closeCreateCollectionModal();
    loadCollections(true);
    showMessage(`Collection "${name}" created successfully! 🎉`, 'success');
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}
