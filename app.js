// Global variables
let currentUser = null;
let mods = [];
let cart = [];
let currentTheme = 'dark';

// IMMEDIATE: Hide loading screen as soon as script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideLoadingScreen);
} else {
    hideLoadingScreen();
}

function hideLoadingScreen() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.opacity = '0';
        setTimeout(() => {
            loadingElement.style.display = 'none';
        }, 300);
    }
}

// Fallback: Hide loading screen after 1 second no matter what
setTimeout(() => {
    const loadingElement = document.getElementById('loading');
    if (loadingElement && loadingElement.style.display !== 'none') {
        console.warn('Loading screen timeout - forcing hide');
        loadingElement.style.opacity = '0';
        setTimeout(() => {
            loadingElement.style.display = 'none';
        }, 300);
    }
}, 1000);

// Real mod data with proper images and functionality
const realMods = [
    {
        _id: 'sodium',
        title: 'Sodium',
        description: 'Sodium is a free and open-source rendering optimization mod for Minecraft which greatly improves frame rates and stuttering while fixing many graphical issues. Compatible with Fabric and provides massive performance improvements.',
        shortDescription: 'Powerful rendering optimization mod for Minecraft',
        price: 0,
        isFree: true,
        category: 'Performance',
        gameTitle: 'Minecraft',
        author: 'CaffeineMC',
        images: ['https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?w=400&h=250&fit=crop&auto=format'],
        version: '0.5.8',
        rating: 4.9,
        downloads: 45000000,
        featured: true,
        status: 'finalised',
        tags: ['performance', 'optimization', 'fps', 'rendering'],
        requirements: 'Minecraft 1.20+, Fabric Loader',
        specs: 'Minimum: 4GB RAM, Recommended: 8GB RAM',
        downloadUrl: 'https://cdn.modrinth.com/data/AANobbMI/versions/IZskON6d/sodium-fabric-0.5.8%2Bmc1.20.4.jar',
        fileName: 'sodium-fabric-0.5.8+mc1.20.4.jar'
    },
    {
        _id: 'iris',
        title: 'Iris Shaders',
        description: 'Iris is a modern shader mod for Minecraft intended to be compatible with existing OptiFine shader packs. It works seamlessly with Sodium for incredible performance while maintaining stunning visual effects.',
        shortDescription: 'Modern shader mod compatible with Sodium',
        price: 0,
        isFree: true,
        category: 'Graphics',
        gameTitle: 'Minecraft',
        author: 'IrisShaders',
        images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=250&fit=crop&auto=format'],
        version: '1.6.17',
        rating: 4.8,
        downloads: 32000000,
        featured: true,
        status: 'finalised',
        tags: ['shaders', 'graphics', 'visual', 'optifine'],
        requirements: 'Minecraft 1.20+, Fabric Loader, Sodium (recommended)',
        specs: 'Minimum: 6GB RAM, GTX 1060 or equivalent',
        downloadUrl: 'https://cdn.modrinth.com/data/YL57xq9U/versions/Xpn6plO6/iris-mc1.20.4-1.6.17.jar',
        fileName: 'iris-mc1.20.4-1.6.17.jar'
    },
    {
        _id: 'create',
        title: 'Create Mod',
        description: 'Create is a mod offering a variety of tools and blocks for building, decoration, and aesthetic automation. The mod provides players with a comprehensive system for creating complex contraptions and beautiful builds.',
        shortDescription: 'Building, decoration and automation mod',
        price: 0,
        isFree: true,
        category: 'Gameplay',
        gameTitle: 'Minecraft',
        author: 'simibubi',
        images: ['https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop&auto=format'],
        version: '0.5.1f',
        rating: 4.9,
        downloads: 28000000,
        featured: true,
        status: 'finalised',
        tags: ['automation', 'building', 'tech', 'machinery'],
        requirements: 'Minecraft 1.20+, Forge or Fabric',
        specs: 'Minimum: 4GB RAM, Recommended: 6GB RAM',
        downloadUrl: 'https://cdn.modrinth.com/data/LNytGWDc/versions/nFhjBFkV/create-fabric-0.5.1-f-build.1417%2Bmc1.20.1.jar',
        fileName: 'create-fabric-0.5.1f+mc1.20.1.jar'
    },
    {
        _id: 'lithium',
        title: 'Lithium',
        description: 'Lithium is a general-purpose optimization mod for Minecraft which works to improve game physics, mob AI, block ticking, and more without changing vanilla gameplay mechanics.',
        shortDescription: 'General-purpose server optimization mod',
        price: 0,
        isFree: true,
        category: 'Performance',
        gameTitle: 'Minecraft',
        author: 'CaffeineMC',
        images: ['https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=250&fit=crop&auto=format'],
        version: '0.12.1',
        rating: 4.8,
        downloads: 22000000,
        featured: false,
        status: 'finalised',
        tags: ['performance', 'server', 'optimization'],
        requirements: 'Minecraft 1.20+, Fabric Loader',
        specs: 'Works on any system, server-side optimization',
        downloadUrl: 'https://cdn.modrinth.com/data/gvQqBUqZ/versions/m6sVgAi6/lithium-fabric-mc1.20.4-0.12.1.jar',
        fileName: 'lithium-fabric-mc1.20.4-0.12.1.jar'
    },
    {
        _id: 'jei',
        title: 'Just Enough Items (JEI)',
        description: 'JEI is an item and recipe viewing mod for Minecraft, built from the ground up for stability and performance. View recipes, uses, and more with this essential utility mod.',
        shortDescription: 'Item and recipe viewing mod',
        price: 0,
        isFree: true,
        category: 'UI/UX',
        gameTitle: 'Minecraft',
        author: 'mezz',
        images: ['https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=250&fit=crop&auto=format'],
        version: '15.2.0',
        rating: 4.9,
        downloads: 180000000,
        featured: false,
        status: 'finalised',
        tags: ['utility', 'recipes', 'items', 'gui'],
        requirements: 'Minecraft 1.20+, Forge',
        specs: 'Minimum: 2GB RAM',
        downloadUrl: 'https://cdn.modrinth.com/data/u6dRKJwZ/versions/umyGl7zF/jei-1.20.4-forge-17.3.0.49.jar',
        fileName: 'jei-1.20.4-forge-17.3.0.49.jar'
    },
    {
        _id: 'cs2plugin',
        title: 'CS2 Style Competitive Plugin',
        description: 'Transform your Counter-Strike 2 server into a competitive esports experience! Features 5v5 matchmaking, bomb plant/defuse mechanics, buy menus, economy system, ranking, tournaments, weapon skins, achievements and more.',
        shortDescription: 'Complete CS2-style competitive gameplay system',
        price: 24.99,
        isFree: false,
        category: 'Gameplay',
        gameTitle: 'Counter-Strike 2',
        author: 'ExusCraft',
        images: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop&auto=format'],
        version: '2.1.0',
        rating: 4.9,
        downloads: 45230,
        featured: true,
        status: 'in-progress',
        tags: ['competitive', 'cs2', 'matchmaking', '5v5', 'esports'],
        requirements: 'Counter-Strike 2 Dedicated Server, SourceMod',
        specs: 'Dedicated server with 4GB RAM minimum',
        downloadUrl: null,
        fileName: 'cs2-competitive-plugin-v2.1.0.zip'
    },
    {
        _id: 'skyui',
        title: 'SkyUI',
        description: 'SkyUI is an elegant, PC-friendly interface mod with many advanced features. Includes improved inventory management, magic menu overhaul, and essential modding framework.',
        shortDescription: 'Essential PC-friendly interface overhaul',
        price: 0,
        isFree: true,
        category: 'UI/UX',
        gameTitle: 'Skyrim',
        author: 'SkyUI Team',
        images: ['https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=250&fit=crop&auto=format'],
        version: '5.2',
        rating: 4.9,
        downloads: 85000000,
        featured: true,
        status: 'finalised',
        tags: ['ui', 'interface', 'inventory', 'essential'],
        requirements: 'Skyrim Special Edition, SKSE64',
        specs: 'Any system capable of running Skyrim',
        downloadUrl: 'https://github.com/schlangster/skyui/releases/download/v5.2SE/SkyUI_5_2_SE.7z',
        fileName: 'SkyUI_5_2_SE.7z'
    },
    {
        _id: 'enb',
        title: 'ENB Series',
        description: 'ENB Series is a comprehensive graphics modification that enhances Skyrim with advanced lighting, shadows, and post-processing effects for stunning visual improvements.',
        shortDescription: 'Advanced graphics enhancement suite',
        price: 12.99,
        isFree: false,
        category: 'Graphics',
        gameTitle: 'Skyrim',
        author: 'Boris Vorontsov',
        images: ['https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=250&fit=crop&auto=format'],
        version: '0.487',
        rating: 4.7,
        downloads: 15000000,
        featured: false,
        status: 'finalised',
        tags: ['graphics', 'lighting', 'shaders', 'visual'],
        requirements: 'Skyrim Special Edition, DirectX 11',
        specs: 'GTX 1060 or better, 8GB RAM minimum',
        downloadUrl: null,
        fileName: 'enb-series-0.487.zip'
    },
    {
        _id: 'fabric',
        title: 'Fabric API',
        description: 'Essential hooks for modding with Fabric. Fabric API is the library for essential hooks and interoperability mechanisms for Fabric mods.',
        shortDescription: 'Essential library for Fabric mods',
        price: 0,
        isFree: true,
        category: 'Utility',
        gameTitle: 'Minecraft',
        author: 'FabricMC',
        images: ['https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=400&h=250&fit=crop&auto=format'],
        version: '0.92.2',
        rating: 4.8,
        downloads: 120000000,
        featured: false,
        status: 'finalised',
        tags: ['api', 'library', 'fabric', 'essential'],
        requirements: 'Minecraft 1.20+, Fabric Loader',
        specs: 'Minimum: 2GB RAM',
        downloadUrl: 'https://cdn.modrinth.com/data/P7dR8mSH/versions/gQS3JbZO/fabric-api-0.92.2%2B1.20.4.jar',
        fileName: 'fabric-api-0.92.2+1.20.4.jar'
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('ExusCraft loading...');
    
    // Hide loading screen immediately to prevent stuck loading
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    try {
        // Skip intro animation - causes loading issues
        // if (typeof initIntroAnimation === 'function') {
        //     initIntroAnimation();
        // }
        
        initializeTheme();
        loadSavedData();
        
        // Load mods immediately
        mods = realMods;
        displayModsInSections(mods);
        
        if (typeof initNavbarScroll === 'function') {
            initNavbarScroll();
        }
        updateUserNavigation();
        updateCartDisplay();
        
        // Initialize hex grid after a short delay to not block rendering
        setTimeout(() => {
            if (typeof initHexGrid === 'function') {
                initHexGrid();
            }
        }, 100);
        
        console.log('ExusCraft loaded successfully!');
    } catch (error) {
        console.error('Error during initialization:', error);
        // Ensure loading screen is hidden even if there's an error
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
});

// Scroll Zoom Effect - Zooms into "Game Mods" text then transitions to mods section
function initScrollZoomEffect() {
    // Disabled - replaced by intro animation
}

// 3D Intro Animation - Simplified for performance
function initIntroAnimation() {
    const introOverlay = document.createElement('div');
    introOverlay.className = 'intro-overlay';
    introOverlay.innerHTML = `
        <div class="intro-logo">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="6" fill="url(#introG)"/>
                <path d="M8 12L16 8L24 12V20L16 24L8 20V12Z" stroke="white" stroke-width="1.5" fill="rgba(255,255,255,0.1)"/>
                <circle cx="16" cy="16" r="3" fill="white"/>
                <defs>
                    <linearGradient id="introG" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#5B8CFF"/>
                        <stop offset="50%" stop-color="#7C5CFF"/>
                        <stop offset="100%" stop-color="#FF6B9D"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
        <div class="intro-title">ExusCraft</div>
        <div class="intro-sub">Enter the Mod Universe</div>
    `;
    
    document.body.insertBefore(introOverlay, document.body.firstChild);
    document.body.style.overflow = 'hidden';
    
    // Force GPU layer
    introOverlay.style.willChange = 'opacity';
    
    // Simple timeline
    requestAnimationFrame(() => {
        introOverlay.classList.add('show');
    });
    
    setTimeout(() => introOverlay.classList.add('zoom'), 1500);
    setTimeout(() => {
        introOverlay.classList.add('exit');
        document.body.style.overflow = '';
    }, 2500);
    setTimeout(() => introOverlay.remove(), 3200);
}

// Skeleton Loaders
function showSkeletonLoaders() {
    const containers = ['featuredGames', 'newReleases', 'dealsGames', 'allGames'];
    containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            const skeletonCount = id === 'allGames' ? 8 : 4;
            container.innerHTML = Array(skeletonCount).fill('').map(() => `
                <div class="mod-card skeleton-card">
                    <div class="skeleton" style="height: 180px; border-radius: var(--radius-lg) var(--radius-lg) 0 0;"></div>
                    <div style="padding: 1.25rem;">
                        <div class="skeleton skeleton-text" style="width: 80%;"></div>
                        <div class="skeleton skeleton-text short" style="width: 60%;"></div>
                        <div class="skeleton skeleton-text" style="width: 40%; margin-top: 1rem;"></div>
                    </div>
                </div>
            `).join('');
        }
    });
}

// Theme System
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    showMessage(`Switched to ${currentTheme} mode`, 'success');
}

function updateThemeIcon() {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Data Management
function loadSavedData() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartDisplay();
        } catch (e) {
            cart = [];
        }
    }
    
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

function saveData() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// User Navigation
function updateUserNavigation() {
    const navUser = document.getElementById('navUser');
    const navAuth = document.getElementById('navAuth');
    const username = document.getElementById('username');
    const userAvatar = document.getElementById('userAvatar');
    const userAvatarLarge = document.getElementById('userAvatarLarge');
    const userEmail = document.getElementById('userEmail');
    const adminLink = document.getElementById('adminLink');
    const adminDivider = document.getElementById('adminDivider');
    
    if (currentUser) {
        if (navUser) navUser.style.display = 'flex';
        if (navAuth) navAuth.style.display = 'none';
        if (username) username.textContent = currentUser.name || currentUser.username || currentUser.email || 'User';
        if (userEmail) userEmail.textContent = currentUser.email || '';
        
        const avatarUrl = currentUser.picture || currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=5B8CFF&color=fff&size=48`;
        if (userAvatar) userAvatar.src = avatarUrl;
        if (userAvatarLarge) userAvatarLarge.src = avatarUrl;
        
        // Show admin link only for admins
        const isAdmin = currentUser.role === 'admin' || currentUser.isAdmin === true;
        if (adminLink) adminLink.style.display = isAdmin ? 'flex' : 'none';
        if (adminDivider) adminDivider.style.display = isAdmin ? 'block' : 'none';
    } else {
        if (navUser) navUser.style.display = 'none';
        if (navAuth) navAuth.style.display = 'flex';
        if (adminLink) adminLink.style.display = 'none';
        if (adminDivider) adminDivider.style.display = 'none';
    }
}

// Authentication
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
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
    
    setTimeout(() => {
        if (typeof google !== 'undefined' && google.accounts) {
            google.accounts.id.renderButton(
                document.getElementById('googleSignInDiv'),
                { theme: 'filled_blue', size: 'large', text: 'signin_with', shape: 'rectangular', width: 280 }
            );
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
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
    
    setTimeout(() => {
        if (typeof google !== 'undefined' && google.accounts) {
            google.accounts.id.renderButton(
                document.getElementById('googleSignUpDiv'),
                { theme: 'filled_blue', size: 'large', text: 'signup_with', shape: 'rectangular', width: 280 }
            );
        }
    }, 100);
}
function loginWithGoogle() { showLogin(); }

// Initialize Google Sign-In
function initGoogleSignIn() {
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
            client_id: '125508254360-rdb0cu5l4b2majds3i6pa13663uchku0.apps.googleusercontent.com',
            callback: handleGoogleCredentialResponse
        });
    }
}

setTimeout(initGoogleSignIn, 500);

async function handleGoogleCredentialResponse(response) {
    try {
        // Send credential to backend to get a proper JWT token
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ credential: response.credential })
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.message || 'Authentication failed');
        }
        
        // Store the JWT token and user info
        localStorage.setItem('token', data.token);
        
        currentUser = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name || data.user.username,
            picture: data.user.picture,
            username: data.user.username,
            role: data.user.role,
            isAdmin: data.user.role === 'admin'
        };
        
        localStorage.setItem('user', JSON.stringify(currentUser));
        updateUserNavigation();
        closeAuthModal();
        showMessage(`Welcome, ${currentUser.name}! 🎉`, 'success');
    } catch (error) {
        console.error('Error processing Google response:', error);
        showMessage('Google login failed. Please try again.', 'error');
    }
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    currentUser = null;
    updateUserNavigation();
    showMessage('Logged out successfully!', 'success');
}

function toggleUserMenu() {
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
        userDropdown.classList.toggle('show');
    }
}

// ============================================
// USER DATA STORAGE
// ============================================
let userMods = JSON.parse(localStorage.getItem('userMods') || '[]');
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
let downloads = JSON.parse(localStorage.getItem('downloads') || '[]');
let userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
let library = JSON.parse(localStorage.getItem('library') || '[]');

function saveUserData() {
    localStorage.setItem('userMods', JSON.stringify(userMods));
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('downloads', JSON.stringify(downloads));
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
    localStorage.setItem('library', JSON.stringify(library));
}

// ============================================
// PROFILE FEATURE
// ============================================
function showProfile() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    const modal = document.getElementById('profileModal') || createProfileModal();
    const content = document.getElementById('profileContent');
    
    const userModCount = userMods.length;
    const totalDownloads = userMods.reduce((sum, mod) => sum + (mod.downloads || 0), 0);
    const memberSince = currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'January 2026';
    
    content.innerHTML = `
        <div class="profile-container">
            <div class="profile-header">
                <div class="profile-avatar-large">
                    <img src="${currentUser.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=5B8CFF&color=fff&size=120`}" alt="Avatar">
                    <button class="avatar-edit-btn" onclick="changeAvatar()"><i class="fas fa-camera"></i></button>
                </div>
                <div class="profile-info">
                    <h2>${currentUser.name || currentUser.username || 'User'}</h2>
                    <p class="profile-email">${currentUser.email || ''}</p>
                    <p class="profile-member">Member since ${memberSince}</p>
                </div>
            </div>
            
            <div class="profile-stats-grid">
                <div class="profile-stat-card">
                    <i class="fas fa-puzzle-piece"></i>
                    <span class="stat-value">${userModCount}</span>
                    <span class="stat-label">Mods Created</span>
                </div>
                <div class="profile-stat-card">
                    <i class="fas fa-book"></i>
                    <span class="stat-value">${library.length}</span>
                    <span class="stat-label">In Library</span>
                </div>
                <div class="profile-stat-card">
                    <i class="fas fa-heart"></i>
                    <span class="stat-value">${favorites.length}</span>
                    <span class="stat-label">Favorites</span>
                </div>
                <div class="profile-stat-card">
                    <i class="fas fa-cloud-download-alt"></i>
                    <span class="stat-value">${downloads.length}</span>
                    <span class="stat-label">Downloads</span>
                </div>
            </div>
            
            <div class="profile-actions">
                <button onclick="showLibrary()" class="btn btn-primary"><i class="fas fa-book"></i> My Library</button>
                <button onclick="showMyMods()" class="btn btn-outline"><i class="fas fa-puzzle-piece"></i> My Mods</button>
                <button onclick="showFavorites()" class="btn btn-outline"><i class="fas fa-heart"></i> Favorites</button>
                <button onclick="showDownloads()" class="btn btn-outline"><i class="fas fa-download"></i> Downloads</button>
                <button onclick="showSettings()" class="btn btn-outline"><i class="fas fa-cog"></i> Settings</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function createProfileModal() {
    const modal = document.createElement('div');
    modal.id = 'profileModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content profile-modal">
            <span class="close" onclick="closeProfileModal()">&times;</span>
            <div id="profileContent"></div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

function changeAvatar() {
    showMessage('Avatar upload coming soon! For now, your Google profile picture is used.', 'info');
}

// ============================================
// MY MODS FEATURE
// ============================================
function showMyMods() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    const modal = document.getElementById('profileModal') || createProfileModal();
    const content = document.getElementById('profileContent');
    
    content.innerHTML = `
        <div class="my-mods-container">
            <div class="section-header-modal">
                <button onclick="showProfile()" class="back-btn"><i class="fas fa-arrow-left"></i></button>
                <h2>My Mods</h2>
                <button onclick="showUploadModal()" class="btn btn-primary btn-sm"><i class="fas fa-plus"></i> Upload New</button>
            </div>
            
            <div class="my-mods-grid" id="myModsGrid">
                ${userMods.length === 0 ? `
                    <div class="empty-state">
                        <i class="fas fa-puzzle-piece"></i>
                        <h3>No mods yet</h3>
                        <p>Start creating and sharing your mods with the community!</p>
                        <button onclick="showUploadModal()" class="btn btn-primary"><i class="fas fa-upload"></i> Upload Your First Mod</button>
                    </div>
                ` : userMods.map(mod => `
                    <div class="my-mod-card">
                        <img src="${mod.images?.[0] || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop'}" alt="${mod.title}">
                        <div class="my-mod-info">
                            <h4>${mod.title}</h4>
                            <p>${mod.gameTitle} • ${mod.category}</p>
                            <div class="my-mod-stats">
                                <span><i class="fas fa-download"></i> ${formatDownloads(mod.downloads || 0)}</span>
                                <span><i class="fas fa-star"></i> ${mod.rating || 0}</span>
                            </div>
                            <div class="my-mod-actions">
                                <button onclick="editMod('${mod._id}')" class="btn btn-outline btn-xs"><i class="fas fa-edit"></i> Edit</button>
                                <button onclick="deleteMod('${mod._id}')" class="btn btn-danger btn-xs"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function editMod(modId) {
    const mod = userMods.find(m => m._id === modId);
    if (!mod) return;
    showUploadModal(mod);
}

function deleteMod(modId) {
    if (confirm('Are you sure you want to delete this mod? This cannot be undone.')) {
        userMods = userMods.filter(m => m._id !== modId);
        saveUserData();
        showMyMods();
        showMessage('Mod deleted successfully', 'success');
    }
}

// ============================================
// FAVORITES FEATURE
// ============================================
function showFavorites() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    const modal = document.getElementById('profileModal') || createProfileModal();
    const content = document.getElementById('profileContent');
    
    const favoriteMods = mods.filter(mod => favorites.includes(mod._id));
    
    content.innerHTML = `
        <div class="favorites-container">
            <div class="section-header-modal">
                <button onclick="showProfile()" class="back-btn"><i class="fas fa-arrow-left"></i></button>
                <h2>My Favorites</h2>
            </div>
            
            <div class="favorites-grid" id="favoritesGrid">
                ${favoriteMods.length === 0 ? `
                    <div class="empty-state">
                        <i class="fas fa-heart"></i>
                        <h3>No favorites yet</h3>
                        <p>Browse mods and click the heart icon to add them to your favorites!</p>
                        <button onclick="closeProfileModal(); scrollToMods();" class="btn btn-primary"><i class="fas fa-compass"></i> Browse Mods</button>
                    </div>
                ` : favoriteMods.map(mod => `
                    <div class="favorite-card" onclick="closeProfileModal(); showModDetails('${mod._id}');">
                        <img src="${mod.images?.[0] || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop'}" alt="${mod.title}">
                        <button class="remove-fav-btn" onclick="event.stopPropagation(); toggleFavorite('${mod._id}')"><i class="fas fa-heart-broken"></i></button>
                        <div class="favorite-info">
                            <h4>${mod.title}</h4>
                            <p>${mod.gameTitle} • ${mod.category}</p>
                            <span class="favorite-price">${mod.isFree ? 'FREE' : '$' + mod.price.toFixed(2)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function toggleFavorite(modId) {
    if (!currentUser) {
        showLogin();
        showMessage('Please login to add favorites', 'info');
        return;
    }
    
    const index = favorites.indexOf(modId);
    if (index > -1) {
        favorites.splice(index, 1);
        showMessage('Removed from favorites', 'info');
    } else {
        favorites.push(modId);
        showMessage('Added to favorites! ❤️', 'success');
    }
    saveUserData();
    
    // Refresh if on favorites page
    if (document.querySelector('.favorites-container')) {
        showFavorites();
    }
}

function isFavorite(modId) {
    return favorites.includes(modId);
}

// ============================================
// LIBRARY FEATURE (Like Steam)
// ============================================
function showLibrary() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    const modal = document.getElementById('profileModal') || createProfileModal();
    const content = document.getElementById('profileContent');
    
    const libraryMods = library.map(item => {
        const mod = mods.find(m => m._id === item.modId) || item;
        return { ...mod, ...item };
    });
    
    content.innerHTML = `
        <div class="library-container">
            <div class="section-header-modal">
                <button onclick="showProfile()" class="back-btn"><i class="fas fa-arrow-left"></i></button>
                <h2><i class="fas fa-book"></i> My Library</h2>
            </div>
            
            <div class="library-grid" id="libraryGrid">
                ${libraryMods.length === 0 ? `
                    <div class="empty-state">
                        <i class="fas fa-book-open"></i>
                        <h3>Your library is empty</h3>
                        <p>Mods you add to your library will appear here. Browse and add mods to get started!</p>
                        <button onclick="closeProfileModal(); scrollToMods();" class="btn btn-primary"><i class="fas fa-compass"></i> Browse Mods</button>
                    </div>
                ` : libraryMods.map(mod => `
                    <div class="library-card">
                        <img src="${mod.images?.[0] || mod.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop'}" alt="${mod.title}">
                        <div class="library-card-content">
                            <h4>${mod.title}</h4>
                            <p class="library-game">${mod.gameTitle || mod.game} • ${mod.category}</p>
                            <p class="library-added">Added ${new Date(mod.addedAt).toLocaleDateString()}</p>
                            <div class="library-actions">
                                <button onclick="installFromLibrary('${mod.modId || mod._id}')" class="btn btn-primary btn-sm">
                                    <i class="fas fa-download"></i> Install
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function addToLibrary(modId) {
    if (!currentUser) {
        showLogin();
        showMessage('Please login to add mods to your library', 'info');
        return;
    }
    
    const mod = mods.find(m => m._id === modId);
    if (!mod) return;
    
    // Check if already in library
    if (library.some(item => item.modId === modId)) {
        showMessage('This mod is already in your library!', 'info');
        return;
    }
    
    library.push({
        modId: modId,
        title: mod.title,
        game: mod.gameTitle,
        category: mod.category,
        image: mod.images?.[0],
        version: mod.version,
        addedAt: new Date().toISOString()
    });
    
    saveUserData();
    showMessage(`"${mod.title}" added to your library! 📚`, 'success');
}

function removeFromLibrary(modId) {
    library = library.filter(item => item.modId !== modId);
    saveUserData();
    showLibrary(); // Refresh
    showMessage('Removed from library', 'info');
}

function installFromLibrary(modId) {
    const mod = mods.find(m => m._id === modId);
    if (mod) {
        addToDownloads(modId);
        showMessage(`Installing "${mod.title}"... Download started!`, 'success');
    }
}

function isInLibrary(modId) {
    return library.some(item => item.modId === modId);
}

// ============================================
// DOWNLOADS FEATURE
// ============================================
function showDownloads() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    const modal = document.getElementById('profileModal') || createProfileModal();
    const content = document.getElementById('profileContent');
    
    content.innerHTML = `
        <div class="downloads-container">
            <div class="section-header-modal">
                <button onclick="showProfile()" class="back-btn"><i class="fas fa-arrow-left"></i></button>
                <h2>My Downloads</h2>
            </div>
            
            <div class="downloads-list" id="downloadsList">
                ${downloads.length === 0 ? `
                    <div class="empty-state">
                        <i class="fas fa-download"></i>
                        <h3>No downloads yet</h3>
                        <p>Download mods to see them here for easy re-downloading!</p>
                        <button onclick="closeProfileModal(); scrollToMods();" class="btn btn-primary"><i class="fas fa-compass"></i> Browse Mods</button>
                    </div>
                ` : downloads.map(dl => {
                    const mod = mods.find(m => m._id === dl.modId) || dl;
                    return `
                        <div class="download-item">
                            <img src="${mod.images?.[0] || dl.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop'}" alt="${mod.title || dl.title}">
                            <div class="download-info">
                                <h4>${mod.title || dl.title}</h4>
                                <p>${mod.gameTitle || dl.game} • v${mod.version || dl.version || '1.0'}</p>
                                <span class="download-date">Downloaded ${new Date(dl.date).toLocaleDateString()}</span>
                            </div>
                            <div class="download-actions">
                                <button onclick="redownloadMod('${dl.modId}')" class="btn btn-primary btn-sm"><i class="fas fa-download"></i> Re-download</button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function addToDownloads(modId) {
    const mod = mods.find(m => m._id === modId);
    if (!mod) return;
    
    // Check if already in downloads
    const existing = downloads.find(d => d.modId === modId);
    if (existing) {
        existing.date = new Date().toISOString();
        existing.count = (existing.count || 1) + 1;
    } else {
        downloads.unshift({
            modId: modId,
            title: mod.title,
            game: mod.gameTitle,
            version: mod.version,
            image: mod.images?.[0],
            date: new Date().toISOString(),
            count: 1
        });
    }
    saveUserData();
}

function redownloadMod(modId) {
    const mod = mods.find(m => m._id === modId);
    if (mod) {
        closeProfileModal();
        downloadMod(modId);
    } else {
        showMessage('Mod no longer available', 'error');
    }
}

// ============================================
// SETTINGS FEATURE
// ============================================
function showSettings() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    const modal = document.getElementById('profileModal') || createProfileModal();
    const content = document.getElementById('profileContent');
    
    // Load current settings
    const settings = {
        emailNotifications: userSettings.emailNotifications !== false,
        downloadNotifications: userSettings.downloadNotifications !== false,
        showOnlineStatus: userSettings.showOnlineStatus !== false,
        autoDownload: userSettings.autoDownload || false,
        theme: currentTheme,
        language: userSettings.language || 'en'
    };
    
    content.innerHTML = `
        <div class="settings-container">
            <div class="section-header-modal">
                <button onclick="showProfile()" class="back-btn"><i class="fas fa-arrow-left"></i></button>
                <h2>Settings</h2>
            </div>
            
            <div class="settings-sections">
                <div class="settings-section">
                    <h3><i class="fas fa-user"></i> Account</h3>
                    <div class="setting-item">
                        <div class="setting-info">
                            <span class="setting-label">Email</span>
                            <span class="setting-value">${currentUser.email || 'Not set'}</span>
                        </div>
                    </div>
                    <div class="setting-item">
                        <div class="setting-info">
                            <span class="setting-label">Username</span>
                            <span class="setting-value">${currentUser.name || currentUser.username || 'Not set'}</span>
                        </div>
                        <button onclick="editUsername()" class="btn btn-outline btn-xs">Edit</button>
                    </div>
                </div>
                
                <div class="settings-section">
                    <h3><i class="fas fa-palette"></i> Appearance</h3>
                    <div class="setting-item">
                        <div class="setting-info">
                            <span class="setting-label">Theme</span>
                            <span class="setting-desc">Choose your preferred color scheme</span>
                        </div>
                        <select onchange="changeThemeSetting(this.value)" class="setting-select">
                            <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>Dark Mode</option>
                            <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>Light Mode</option>
                        </select>
                    </div>
                </div>
                
                <div class="settings-section">
                    <h3><i class="fas fa-bell"></i> Notifications</h3>
                    <div class="setting-item">
                        <div class="setting-info">
                            <span class="setting-label">Email Notifications</span>
                            <span class="setting-desc">Receive updates about your mods</span>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" ${settings.emailNotifications ? 'checked' : ''} onchange="updateSetting('emailNotifications', this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="setting-item">
                        <div class="setting-info">
                            <span class="setting-label">Download Notifications</span>
                            <span class="setting-desc">Get notified when downloads complete</span>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" ${settings.downloadNotifications ? 'checked' : ''} onchange="updateSetting('downloadNotifications', this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
                
                <div class="settings-section">
                    <h3><i class="fas fa-shield-alt"></i> Privacy</h3>
                    <div class="setting-item">
                        <div class="setting-info">
                            <span class="setting-label">Show Online Status</span>
                            <span class="setting-desc">Let others see when you're online</span>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" ${settings.showOnlineStatus ? 'checked' : ''} onchange="updateSetting('showOnlineStatus', this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
                
                <div class="settings-section danger-zone">
                    <h3><i class="fas fa-exclamation-triangle"></i> Danger Zone</h3>
                    <div class="setting-item">
                        <div class="setting-info">
                            <span class="setting-label">Clear All Data</span>
                            <span class="setting-desc">Remove all local data including favorites and downloads</span>
                        </div>
                        <button onclick="clearAllData()" class="btn btn-danger btn-sm">Clear Data</button>
                    </div>
                    <div class="setting-item">
                        <div class="setting-info">
                            <span class="setting-label">Logout</span>
                            <span class="setting-desc">Sign out of your account</span>
                        </div>
                        <button onclick="closeProfileModal(); logout();" class="btn btn-outline btn-sm">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function updateSetting(key, value) {
    userSettings[key] = value;
    saveUserData();
    showMessage('Setting updated', 'success');
}

function changeThemeSetting(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon();
    showMessage(`Theme changed to ${theme} mode`, 'success');
}

function editUsername() {
    const newName = prompt('Enter new display name:', currentUser.name || currentUser.username || '');
    if (newName && newName.trim()) {
        currentUser.name = newName.trim();
        localStorage.setItem('user', JSON.stringify(currentUser));
        updateUserNavigation();
        showSettings();
        showMessage('Username updated!', 'success');
    }
}

function clearAllData() {
    if (confirm('Are you sure? This will clear all your favorites, downloads history, and settings. This cannot be undone.')) {
        favorites = [];
        downloads = [];
        userSettings = {};
        userMods = [];
        saveUserData();
        showMessage('All data cleared', 'success');
        showSettings();
    }
}

function showOrders() {
    showDownloads();
}

// Display Mods in Sections
function displayModsInSections(modsToShow) {
    const featuredMods = modsToShow.filter(mod => mod.featured).slice(0, 4);
    displayModCards(featuredMods, 'featuredGames');
    
    const newMods = [...modsToShow].sort((a, b) => b.downloads - a.downloads).slice(0, 6);
    displayModCards(newMods, 'newReleases');
    
    const freeMods = modsToShow.filter(mod => mod.isFree).slice(0, 6);
    displayModCards(freeMods, 'dealsGames');
    
    displayModCards(modsToShow, 'allGames');
}

function displayModCards(modsToShow, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = modsToShow.map((mod) => {
        const stars = '★'.repeat(Math.floor(mod.rating || 4)) + '☆'.repeat(5 - Math.floor(mod.rating || 4));
        const priceDisplay = mod.isFree ? 'FREE' : '$' + mod.price.toFixed(2);
        
        const statusConfig = {
            'in-progress': { color: '#f59e0b', label: 'In Progress' },
            'finalised': { color: '#10b981', label: 'Finalised' },
            'bug-tested': { color: '#3b82f6', label: 'Bug Tested' },
            'beta': { color: '#8b5cf6', label: 'Beta' },
            'starting-out': { color: '#ef4444', label: 'Starting Out' }
        };
        const status = statusConfig[mod.status];
        
        return `
            <div class="mod-card" onclick="showModDetails('${mod._id}')">
                <div class="mod-card-image">
                    <img src="${mod.images[0]}" alt="${mod.title}" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop'">
                    ${mod.featured ? '<span class="featured-tag"><i class="fas fa-star"></i> Featured</span>' : ''}
                    ${mod.isFree ? '<span class="mod-badge free">FREE</span>' : ''}
                    ${status ? `<span class="mod-badge status" style="background: ${status.color}">${status.label}</span>` : ''}
                </div>
                <div class="mod-card-content">
                    <h3 class="mod-card-title">${mod.title}</h3>
                    <p class="mod-card-desc">${mod.shortDescription}</p>
                    <div class="mod-card-meta">
                        <span class="mod-card-game"><i class="fas fa-gamepad"></i> ${mod.gameTitle}</span>
                        <span class="mod-card-category">${mod.category}</span>
                    </div>
                    <div class="mod-card-stats">
                        <span class="mod-card-rating"><span class="stars">${stars}</span> ${mod.rating.toFixed(1)}</span>
                        <span class="mod-card-downloads"><i class="fas fa-download"></i> ${formatDownloads(mod.downloads)}</span>
                    </div>
                    <div class="creator-info">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(mod.author)}" alt="${mod.author}" class="creator-avatar">
                        <div>
                            <div class="creator-name">${mod.author} ${mod.featured ? '<span class="verified-badge"><i class="fas fa-check"></i> Verified</span>' : ''}</div>
                            <div class="creator-stats">${formatDownloads(mod.downloads * 3)} total downloads</div>
                        </div>
                    </div>
                    <div class="mod-card-footer">
                        <span class="mod-card-price">${priceDisplay}</span>
                    </div>
                    <div class="mod-card-actions">
                        <button onclick="event.stopPropagation(); ${mod.isFree ? `downloadMod('${mod._id}')` : `addModToCart('${mod._id}')`}" class="btn btn-primary btn-sm">
                            <i class="fas fa-${mod.isFree ? 'download' : 'cart-plus'}"></i>
                            ${mod.isFree ? 'Download' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function formatDownloads(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// Show Mod Details Modal with Animation
function showModDetails(modId) {
    const mod = mods.find(m => m._id === modId);
    if (!mod) return;
    
    const modal = document.getElementById('gameModal');
    const gameDetails = document.getElementById('gameDetails');
    if (!modal || !gameDetails) return;
    
    const stars = '★'.repeat(Math.floor(mod.rating || 4)) + '☆'.repeat(5 - Math.floor(mod.rating || 4));
    const priceDisplay = mod.isFree ? 'FREE' : '$' + mod.price.toFixed(2);
    
    const statusConfig = {
        'in-progress': { color: '#f59e0b', label: 'In Progress', icon: '🔧' },
        'finalised': { color: '#10b981', label: 'Finalised', icon: '✅' },
        'bug-tested': { color: '#3b82f6', label: 'Bug Tested', icon: '🐛' },
        'beta': { color: '#8b5cf6', label: 'Beta', icon: '🧪' },
        'starting-out': { color: '#ef4444', label: 'Starting Out', icon: '🌱' }
    };
    const status = statusConfig[mod.status];
    
    // Generate fake reviews
    const reviews = [
        { user: 'ModLover123', rating: 5, comment: 'Amazing mod! Works perfectly and great performance boost.' },
        { user: 'GamerPro', rating: 4, comment: 'Really good, had some minor issues but overall excellent.' },
        { user: 'TechUser', rating: 5, comment: 'Essential mod for anyone playing this game. Highly recommended!' }
    ];
    
    gameDetails.innerHTML = `
        <div class="mod-detail">
            <div class="mod-detail-header">
                <img src="${mod.images[0]}" alt="${mod.title}" class="mod-detail-image" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop'">
                <div class="mod-detail-info">
                    <h2>${mod.title}</h2>
                    ${status ? `<span class="status-pill" style="background: ${status.color}">${status.icon} ${status.label}</span>` : ''}
                    <div class="mod-detail-meta">
                        <span><i class="fas fa-gamepad"></i> ${mod.gameTitle}</span>
                        <span><i class="fas fa-tag"></i> ${mod.category}</span>
                        <span><i class="fas fa-code-branch"></i> v${mod.version}</span>
                    </div>
                    <div class="mod-detail-author">by <strong>${mod.author}</strong></div>
                    <div class="mod-detail-rating">
                        <span class="stars">${stars}</span>
                        <span>${mod.rating.toFixed(1)} / 5.0</span>
                        <span class="downloads"><i class="fas fa-download"></i> ${formatDownloads(mod.downloads)} downloads</span>
                    </div>
                </div>
            </div>
            
            <div class="mod-detail-section">
                <h3>Description</h3>
                <p>${mod.description}</p>
            </div>
            
            <div class="mod-detail-section">
                <h3>System Requirements</h3>
                <p><strong>Requirements:</strong> ${mod.requirements}</p>
                <p><strong>Recommended Specs:</strong> ${mod.specs}</p>
            </div>
            
            ${mod.tags && mod.tags.length > 0 ? `
            <div class="mod-detail-section">
                <h3>Tags</h3>
                <div class="tags-list">
                    ${mod.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="mod-detail-section">
                <h3>Reviews (${reviews.length})</h3>
                <div class="reviews-list">
                    ${reviews.map(review => `
                        <div class="review-item">
                            <div class="review-header">
                                <strong>${review.user}</strong>
                                <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</span>
                            </div>
                            <p class="review-comment">${review.comment}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="mod-detail-price-section">
                <span class="price-label">${mod.isFree ? 'Free Download' : 'Price'}</span>
                <span class="price-value">${priceDisplay}</span>
            </div>
            
            <div class="mod-detail-actions">
                <button onclick="toggleFavorite('${mod._id}')" class="btn ${isFavorite(mod._id) ? 'btn-danger' : 'btn-outline'} btn-large fav-btn">
                    <i class="fas fa-heart"></i> ${isFavorite(mod._id) ? 'Favorited' : 'Add to Favorites'}
                </button>
                ${mod.isFree ? `
                    <button onclick="downloadModWithAnimation('${mod._id}')" class="btn btn-primary btn-large download-btn" id="downloadBtn-${mod._id}">
                        <i class="fas fa-download"></i> Download Now
                    </button>
                    <button onclick="addToLibrary('${mod._id}')" class="btn btn-library btn-large ${isInLibrary(mod._id) ? 'in-library' : ''}">
                        <i class="fas fa-${isInLibrary(mod._id) ? 'check' : 'book'}"></i> ${isInLibrary(mod._id) ? 'In Library' : 'Add to Library'}
                    </button>
                ` : `
                    <button onclick="purchaseAndAddToLibrary('${mod._id}')" class="btn btn-primary btn-large">
                        <i class="fas fa-book"></i> Buy & Add to Library - ${priceDisplay}
                    </button>
                    <button onclick="addModToCart('${mod._id}')" class="btn btn-outline btn-large">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                `}
            </div>
        </div>
    `;
    
    // Add modal opening animation
    modal.style.display = 'block';
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        modal.style.transition = 'all 0.3s ease';
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);
}

// ============================================
// DOWNLOAD MANAGER - Panel with Progress Tracking
// ============================================
let activeDownloads = [];
let downloadManagerOpen = false;

// Helper function to close all floating panels
function closeAllPanels(except = null) {
    // Close download manager
    if (except !== 'downloads') {
        const downloadPanel = document.getElementById('downloadManagerPanel');
        if (downloadPanel) {
            downloadPanel.classList.remove('show');
            downloadManagerOpen = false;
        }
    }
    
    // Close cart
    if (except !== 'cart') {
        const cartElement = document.getElementById('cart');
        if (cartElement) {
            cartElement.classList.remove('open');
        }
    }
    
    // Close chatbot
    if (except !== 'chatbot') {
        const chatbot = document.getElementById('chatbot');
        if (chatbot) {
            chatbot.classList.remove('open');
        }
    }
}

function toggleDownloadManager() {
    const panel = document.getElementById('downloadManagerPanel');
    if (!panel) return;
    
    const willOpen = !downloadManagerOpen;
    
    if (willOpen) {
        closeAllPanels('downloads');
    }
    
    downloadManagerOpen = willOpen;
    panel.classList.toggle('show', downloadManagerOpen);
    
    if (downloadManagerOpen) {
        renderDownloadManager();
    }
}

function goToDownloads() {
    window.location.href = 'downloads.html';
}

function renderDownloadManager() {
    const content = document.getElementById('downloadManagerContent');
    if (!content) return;
    
    if (activeDownloads.length === 0) {
        content.innerHTML = `
            <div class="no-downloads">
                <i class="fas fa-cloud-download-alt"></i>
                <p>No active downloads</p>
            </div>
        `;
        return;
    }
    
    content.innerHTML = activeDownloads.map(dl => `
        <div class="download-item" id="download-${dl.id}">
            <div class="download-item-header">
                <img src="${dl.image}" alt="${dl.title}" class="download-item-icon">
                <div class="download-item-info">
                    <div class="download-item-title">${dl.title}</div>
                    <div class="download-item-game">${dl.game} • v${dl.version}</div>
                </div>
                <div class="download-item-actions">
                    ${dl.status === 'downloading' ? `
                        <button class="pause" onclick="pauseDownload('${dl.id}')" title="Pause"><i class="fas fa-pause"></i></button>
                    ` : dl.status === 'paused' ? `
                        <button onclick="resumeDownload('${dl.id}')" title="Resume"><i class="fas fa-play"></i></button>
                    ` : ''}
                    ${dl.status !== 'completed' ? `
                        <button class="cancel" onclick="cancelDownload('${dl.id}')" title="Cancel"><i class="fas fa-times"></i></button>
                    ` : `
                        <button onclick="openDownloadedFile('${dl.id}')" title="Open"><i class="fas fa-folder-open"></i></button>
                    `}
                </div>
            </div>
            <div class="download-progress-container">
                <div class="download-progress-bar">
                    <div class="download-progress-fill ${dl.status === 'completed' ? 'completed' : ''}" style="width: ${dl.progress}%"></div>
                </div>
            </div>
            <div class="download-stats">
                <span><i class="fas fa-database"></i> ${formatFileSize(dl.downloaded)} / ${formatFileSize(dl.totalSize)}</span>
                <span><i class="fas fa-tachometer-alt"></i> ${dl.speed}</span>
                <span><i class="fas fa-clock"></i> ${dl.timeRemaining}</span>
            </div>
            <div class="download-status ${dl.status}">
                <i class="fas fa-${dl.status === 'downloading' ? 'spinner fa-spin' : dl.status === 'completed' ? 'check-circle' : dl.status === 'paused' ? 'pause-circle' : 'exclamation-circle'}"></i>
                <span>${dl.status === 'downloading' ? 'Downloading...' : dl.status === 'completed' ? 'Completed' : dl.status === 'paused' ? 'Paused' : 'Error'}</span>
            </div>
        </div>
    `).join('');
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function updateDownloadCount() {
    const countEl = document.getElementById('downloadCount');
    const toggleBtn = document.getElementById('downloadManagerToggle');
    const activeCount = activeDownloads.filter(d => d.status === 'downloading').length;
    
    if (countEl) {
        countEl.textContent = activeCount;
        countEl.style.display = activeCount > 0 ? 'flex' : 'none';
    }
    if (toggleBtn) {
        toggleBtn.classList.toggle('has-active', activeCount > 0);
    }
}

async function startDownload(modId) {
    const mod = mods.find(m => m._id === modId);
    if (!mod) return;
    
    // Check if already downloading
    if (activeDownloads.some(d => d.modId === modId && d.status === 'downloading')) {
        showMessage('This mod is already downloading!', 'info');
        toggleDownloadManager();
        return;
    }
    
    // Check if user is logged in
    if (!currentUser) {
        showLogin();
        return;
    }
    
    try {
        // Call API to authorize download
        const response = await fetch(`${API_BASE}/mods/${modId}/download`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            showMessage(data.message || 'Download failed', 'error');
            return;
        }
        
        // Add to download manager UI
        const downloadId = 'dl_' + Date.now();
        const download = {
            id: downloadId,
            modId: modId,
            title: mod.title,
            game: mod.gameTitle,
            version: mod.version,
            image: mod.images?.[0] || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop',
            totalSize: parseSizeToBytes(mod.fileSize),
            downloaded: 0,
            progress: 0,
            speed: '0 MB/s',
            timeRemaining: 'Starting...',
            status: 'downloading',
            startTime: Date.now(),
            downloadUrl: data.downloadUrl
        };
        
        activeDownloads.unshift(download);
        updateDownloadCount();
        
        // Open download manager
        if (!downloadManagerOpen) {
            toggleDownloadManager();
        } else {
            renderDownloadManager();
        }
        
        showMessage(`Starting download: ${mod.title}`, 'info');
        
        // Add to library
        if (!library.includes(modId)) {
            library.push(modId);
            saveUserData();
        }
        
        // Simulate progress then trigger actual download
        simulateDownload(downloadId);
        
    } catch (error) {
        console.error('Download error:', error);
        showMessage('Failed to start download', 'error');
    }
}

// Helper to parse file size strings to bytes
function parseSizeToBytes(sizeStr) {
    if (!sizeStr) return 100000000; // Default 100MB
    const num = parseFloat(sizeStr);
    if (sizeStr.includes('GB')) return num * 1024 * 1024 * 1024;
    if (sizeStr.includes('MB')) return num * 1024 * 1024;
    if (sizeStr.includes('KB')) return num * 1024;
    return num;
}

function simulateDownload(downloadId) {
    const download = activeDownloads.find(d => d.id === downloadId);
    if (!download || download.status !== 'downloading') return;
    
    const interval = setInterval(() => {
        const dl = activeDownloads.find(d => d.id === downloadId);
        if (!dl || dl.status !== 'downloading') {
            clearInterval(interval);
            return;
        }
        
        // Random speed between 5-50 MB/s
        const speedMBps = Math.random() * 45 + 5;
        const bytesPerInterval = speedMBps * 1024 * 1024 * 0.1; // 100ms interval
        
        dl.downloaded = Math.min(dl.downloaded + bytesPerInterval, dl.totalSize);
        dl.progress = Math.round((dl.downloaded / dl.totalSize) * 100);
        dl.speed = speedMBps.toFixed(1) + ' MB/s';
        
        const remaining = dl.totalSize - dl.downloaded;
        const secondsRemaining = remaining / (speedMBps * 1024 * 1024);
        
        if (secondsRemaining < 60) {
            dl.timeRemaining = Math.ceil(secondsRemaining) + 's';
        } else if (secondsRemaining < 3600) {
            dl.timeRemaining = Math.ceil(secondsRemaining / 60) + 'm ' + Math.ceil(secondsRemaining % 60) + 's';
        } else {
            dl.timeRemaining = Math.floor(secondsRemaining / 3600) + 'h ' + Math.ceil((secondsRemaining % 3600) / 60) + 'm';
        }
        
        if (dl.progress >= 100) {
            dl.status = 'completed';
            dl.speed = '-';
            dl.timeRemaining = 'Done';
            clearInterval(interval);
            
            // Track download
            if (currentUser) {
                addToDownloads(dl.modId);
            }
            
            showMessage(`Download complete: ${dl.title}`, 'success');
            
            // Trigger actual file download
            triggerFileDownload(downloadId);
        }
        
        renderDownloadManager();
        updateDownloadCount();
    }, 100);
}

function triggerFileDownload(downloadId) {
    const dl = activeDownloads.find(d => d.id === downloadId);
    if (!dl || !dl.downloadUrl) return;
    
    // Create hidden iframe to trigger download
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = dl.downloadUrl;
    document.body.appendChild(iframe);
    
    // Remove iframe after download starts
    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 5000);
    
    showMessage(`Downloading ${dl.title}...`, 'success');
}

Author: ${mod.author}
Category: ${mod.category}
Game: ${mod.gameTitle}
Rating: ${mod.rating}/5.0
Downloads: ${formatDownloads(mod.downloads)}

Description:
${mod.description}

System Requirements:
${mod.requirements}

Recommended Specs:
${mod.specs}

Tags: ${mod.tags ? mod.tags.join(', ') : 'N/A'}

Installation Instructions:
1. Download the actual mod file from the official source
2. Extract the downloaded files
3. Copy to your game's mod directory
4. Enable the mod in your game settings
5. Restart the game and enjoy!

NOTE: This is an info file. The actual mod file was not available.
Please visit the mod's official page to download.

===========================================
Thank you for using ExusCraft!
Proudly made in New Zealand 🇳🇿
===========================================`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mod.title.replace(/[^a-z0-9]/gi, '_')}_INFO.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function pauseDownload(downloadId) {
    const dl = activeDownloads.find(d => d.id === downloadId);
    if (dl) {
        dl.status = 'paused';
        dl.speed = '-';
        dl.timeRemaining = 'Paused';
        renderDownloadManager();
        updateDownloadCount();
    }
}

function resumeDownload(downloadId) {
    const dl = activeDownloads.find(d => d.id === downloadId);
    if (dl) {
        dl.status = 'downloading';
        simulateDownload(downloadId);
        renderDownloadManager();
        updateDownloadCount();
    }
}

function cancelDownload(downloadId) {
    activeDownloads = activeDownloads.filter(d => d.id !== downloadId);
    renderDownloadManager();
    updateDownloadCount();
    showMessage('Download cancelled', 'info');
}

function clearCompletedDownloads() {
    activeDownloads = activeDownloads.filter(d => d.status !== 'completed');
    renderDownloadManager();
    updateDownloadCount();
}

function openDownloadedFile(downloadId) {
    showMessage('Opening downloads folder...', 'info');
}

function openDownloadsFolder() {
    showMessage('Downloads are saved to your browser\'s default download location', 'info');
}

// Download Mod with Animation (ALWAYS DIRECT DOWNLOAD)
function downloadModWithAnimation(modId) {
    const mod = mods.find(m => m._id === modId);
    if (!mod) {
        showMessage('Mod not found!', 'error');
        return;
    }
    
    const downloadBtn = document.getElementById(`downloadBtn-${modId}`);
    if (downloadBtn) {
        downloadBtn.innerHTML = '<i class="fas fa-check"></i> Added to Downloads';
        downloadBtn.disabled = true;
    }
    
    // Start download in download manager
    startDownload(modId);
    closeModal();
}

// Download Mod (for card buttons)
function downloadMod(modId) {
    downloadModWithAnimation(modId);
}

// Purchase Mod
function purchaseMod(modId) {
    const mod = mods.find(m => m._id === modId);
    if (!mod) {
        showMessage('Mod not found!', 'error');
        return;
    }
    
    if (!currentUser) {
        showMessage('Please login to purchase mods', 'info');
        closeModal();
        showLogin();
        return;
    }
    
    const confirmPurchase = confirm(`Purchase ${mod.title} for $${mod.price.toFixed(2)}?\n\nThis is a demo - no real payment will be processed.`);
    
    if (confirmPurchase) {
        showMessage(`Processing purchase for ${mod.title}...`, 'info');
        
        setTimeout(() => {
            showMessage(`🎉 Purchase successful! ${mod.title} is now yours!`, 'success');
            addToLibrary(modId);
            closeModal();
        }, 1500);
    }
}

// Purchase and Add to Library (Steam-like)
function purchaseAndAddToLibrary(modId) {
    const mod = mods.find(m => m._id === modId);
    if (!mod) {
        showMessage('Mod not found!', 'error');
        return;
    }
    
    if (!currentUser) {
        showMessage('Please login to purchase mods', 'info');
        closeModal();
        showLogin();
        return;
    }
    
    if (isInLibrary(modId)) {
        showMessage('This mod is already in your library!', 'info');
        return;
    }
    
    const confirmPurchase = confirm(`Purchase ${mod.title} for $${mod.price.toFixed(2)} and add to your library?\n\nThis is a demo - no real payment will be processed.`);
    
    if (confirmPurchase) {
        showMessage(`Processing purchase for ${mod.title}...`, 'info');
        
        setTimeout(() => {
            addToLibrary(modId);
            showMessage(`🎉 Purchase successful! "${mod.title}" added to your library!`, 'success');
            closeModal();
        }, 1500);
    }
}

// Add to Cart
function addModToCart(modId) {
    const mod = mods.find(m => m._id === modId);
    if (!mod) {
        showMessage('Mod not found!', 'error');
        return;
    }
    
    if (cart.find(item => item._id === modId)) {
        showMessage(`${mod.title} is already in cart!`, 'info');
        return;
    }
    
    cart.push(mod);
    updateCartDisplay();
    saveData();
    showMessage(`${mod.title} added to cart!`, 'success');
}

function removeFromCart(modId) {
    cart = cart.filter(item => item._id !== modId);
    updateCartDisplay();
    saveData();
    showMessage('Item removed from cart', 'info');
}

// Cart Display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    }
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <span>Add some amazing mods to get started!</span>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.images[0]}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/60x60'">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <button onclick="removeFromCart('${item._id}')" class="cart-item-remove">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
        }
    }
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = total.toFixed(2);
    }
}

function toggleCart() {
    const cartElement = document.getElementById('cart');
    if (cartElement) {
        const willOpen = !cartElement.classList.contains('open');
        
        if (willOpen) {
            closeAllPanels('cart');
        }
        
        cartElement.classList.toggle('open');
        if (cartElement.classList.contains('open')) {
            updateCartDisplay();
        }
    }
}

function checkout() {
    if (!currentUser) {
        showLogin();
        showMessage('Please login to checkout', 'error');
        return;
    }
    if (cart.length === 0) {
        showMessage('Your cart is empty!', 'info');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
    
    if (total === 0) {
        // Free items - just add to library
        showMessage('Processing your free items...', 'info');
        setTimeout(() => {
            cart.forEach(item => {
                if (!library.find(id => id === item._id)) {
                    library.push(item._id);
                }
                downloadMod(item._id);
            });
            saveUserData();
            cart = [];
            updateCartDisplay();
            saveData();
            toggleCart();
            showMessage('🎉 Items added to your library!', 'success');
        }, 1000);
        return;
    }
    
    // Show payment modal for paid items
    showPaymentModal(total);
}

function showPaymentModal(total) {
    let modal = document.getElementById('paymentModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'paymentModal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="modal-content payment-modal">
            <span class="close" onclick="closePaymentModal()">&times;</span>
            <div class="payment-container">
                <div class="payment-header">
                    <h2><i class="fas fa-credit-card"></i> Secure Checkout</h2>
                    <p>Complete your purchase</p>
                </div>
                
                <div class="payment-summary">
                    <h3>Order Summary</h3>
                    <div class="payment-items">
                        ${cart.filter(item => item.price > 0).map(item => `
                            <div class="payment-item">
                                <span class="item-name">${item.title}</span>
                                <span class="item-price">$${(item.price || 0).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="payment-total">
                        <span>Total</span>
                        <span class="total-amount">$${total.toFixed(2)}</span>
                    </div>
                </div>
                
                <div class="payment-form">
                    <div class="form-group">
                        <label>Card Details</label>
                        <div id="card-element" class="stripe-card-element"></div>
                        <div id="card-errors" class="card-errors"></div>
                    </div>
                    
                    <button id="payButton" class="btn btn-primary btn-full btn-large">
                        <i class="fas fa-lock"></i> Pay $\${total.toFixed(2)}
                    </button>
                    
                    <div class="payment-security">
                        <i class="fas fa-shield-alt"></i>
                        <span>Secured by Stripe</span>
                    </div>
                </div>
                
                <div class="payment-methods">
                    <i class="fab fa-cc-visa"></i>
                    <i class="fab fa-cc-mastercard"></i>
                    <i class="fab fa-cc-amex"></i>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    initStripeElements(total);
}

// Stripe Elements
let stripe, cardElement;
const STRIPE_KEY = 'pk_test_51SpyRKE0BrIXglmdbvjUNB6XJ9f3PRkuufk39Lwh7tgNpRjymzYduUP8ATi8rMeuHKMeLLwLbpfszhlAbUb2mecK00D79fwdXM';

function initStripeElements(total) {
    stripe = Stripe(STRIPE_KEY);
    const elements = stripe.elements();
    
    const style = {
        base: {
            color: '#E6EAF2',
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            '::placeholder': { color: '#6B7280' }
        },
        invalid: { color: '#EF4444' }
    };
    
    cardElement = elements.create('card', { style });
    cardElement.mount('#card-element');
    
    cardElement.on('change', (event) => {
        document.getElementById('card-errors').textContent = event.error ? event.error.message : '';
    });
    
    // Add click handler to pay button
    document.getElementById('payButton').onclick = () => processStripePayment(total);
}

async function processStripePayment(total) {
    const payButton = document.getElementById('payButton');
    payButton.disabled = true;
    payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    try {
        const token = localStorage.getItem('token');
        const cartItems = cart.map(item => ({ id: item._id, title: item.title, price: item.price }));
        
        // Create payment intent
        const response = await fetch('/api/orders/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount: total, items: cartItems })
        });
        
        if (!response.ok) throw new Error('Payment setup failed');
        
        const { clientSecret } = await response.json();
        
        // Confirm with Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: { email: currentUser?.email || '' }
            }
        });
        
        if (error) {
            document.getElementById('card-errors').textContent = error.message;
            payButton.disabled = false;
            payButton.innerHTML = `<i class="fas fa-lock"></i> Pay $${total.toFixed(2)}`;
            return;
        }
        
        if (paymentIntent.status === 'succeeded') {
            // Confirm on backend
            await fetch('/api/orders/confirm-purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ paymentIntentId: paymentIntent.id, items: cartItems, amount: total })
            });
            
            // Success
            cart.forEach(item => {
                if (!library.find(id => id === item._id)) library.push(item._id);
                downloadMod(item._id);
            });
            saveUserData();
            cart = [];
            updateCartDisplay();
            saveData();
            closePaymentModal();
            toggleCart();
            showCheckoutSuccess();
        }
    } catch (error) {
        console.error('Payment error:', error);
        document.getElementById('card-errors').textContent = 'Payment failed. Please try again.';
        payButton.disabled = false;
        payButton.innerHTML = `<i class="fas fa-lock"></i> Pay $${total.toFixed(2)}`;
    }
}

function showCheckoutSuccess() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'successModal';
    modal.innerHTML = `
        <div class="modal-content success-modal">
            <div class="success-animation"><i class="fas fa-check-circle"></i></div>
            <h2>Payment Successful!</h2>
            <p>Your mods are downloading and added to your library.</p>
            <button class="btn btn-primary btn-large" onclick="closeSuccessModal()">Continue Browsing</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    showMessage('🎉 Purchase complete!', 'success');
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) { modal.classList.remove('show'); setTimeout(() => modal.style.display = 'none', 300); }
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) { modal.classList.remove('show'); setTimeout(() => { modal.style.display = 'none'; modal.remove(); }, 300); }
}

// Search and Filter Functions (NO SIDEBAR)
function searchAllMods() {
    const searchInput = document.getElementById('gameSearch');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        displayModCards(mods, 'allGames');
        return;
    }
    
    const filtered = mods.filter(mod => 
        mod.title.toLowerCase().includes(searchTerm) ||
        mod.description.toLowerCase().includes(searchTerm) ||
        mod.gameTitle.toLowerCase().includes(searchTerm) ||
        mod.category.toLowerCase().includes(searchTerm) ||
        mod.author.toLowerCase().includes(searchTerm) ||
        (mod.tags && mod.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
    
    displayModCards(filtered, 'allGames');
    
    if (filtered.length === 0) {
        document.getElementById('allGames').innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No mods found for "${searchTerm}"</p>
                <span>Try a different search term</span>
            </div>
        `;
    }
}

function filterAllMods() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter || !categoryFilter.value) {
        displayModCards(mods, 'allGames');
        return;
    }
    
    const filtered = mods.filter(mod => mod.category === categoryFilter.value);
    displayModCards(filtered, 'allGames');
}

function filterByGame(game) {
    const filtered = mods.filter(mod => mod.gameTitle === game);
    displayModCards(filtered, 'allGames');
    
    const modsSection = document.getElementById('games');
    if (modsSection) {
        modsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    showMessage(`Showing mods for ${game}`, 'info');
}

function filterByGameAdvanced() {
    const gameFilter = document.getElementById('gameFilter');
    if (gameFilter && gameFilter.value) {
        filterByGame(gameFilter.value);
    } else {
        displayModCards(mods, 'allGames');
    }
}

function sortMods() {
    const sortFilter = document.getElementById('sortFilter');
    if (!sortFilter) return;
    
    let sorted = [...mods];
    
    switch (sortFilter.value) {
        case 'newest':
            sorted.sort((a, b) => b.downloads - a.downloads);
            break;
        case 'popular':
            sorted.sort((a, b) => b.downloads - a.downloads);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
    }
    
    displayModCards(sorted, 'allGames');
}

// Clear all filters and reset to default
function clearAllFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const gameFilter = document.getElementById('gameFilter');
    const searchInput = document.getElementById('gameSearch');
    
    if (categoryFilter) categoryFilter.value = '';
    if (sortFilter) sortFilter.value = 'featured';
    if (gameFilter) gameFilter.value = '';
    if (searchInput) searchInput.value = '';
    
    displayModCards(mods, 'allGames');
    updateFilterStyles();
    showMessage('Filters cleared', 'info');
}

// Update filter visual styles based on active selections
function updateFilterStyles() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const gameFilter = document.getElementById('gameFilter');
    const searchInput = document.getElementById('gameSearch');
    const clearBtn = document.getElementById('clearFiltersBtn');
    const activeFiltersDiv = document.getElementById('activeFilters');
    
    let hasActiveFilters = false;
    let activeFilterBadges = [];
    
    // Check category filter
    if (categoryFilter && categoryFilter.value) {
        categoryFilter.classList.add('filter-active');
        hasActiveFilters = true;
        activeFilterBadges.push(`<span class="filter-badge" onclick="document.getElementById('categoryFilter').value=''; filterAllMods(); updateFilterStyles();"><i class="fas fa-tag"></i> ${categoryFilter.value} <i class="fas fa-times"></i></span>`);
    } else if (categoryFilter) {
        categoryFilter.classList.remove('filter-active');
    }
    
    // Check sort filter (not default)
    if (sortFilter && sortFilter.value !== 'featured') {
        sortFilter.classList.add('filter-active');
        hasActiveFilters = true;
        const sortLabels = { 'newest': 'Newest', 'popular': 'Most Popular', 'rating': 'Highest Rated', 'price-low': 'Price: Low', 'price-high': 'Price: High' };
        activeFilterBadges.push(`<span class="filter-badge" onclick="document.getElementById('sortFilter').value='featured'; sortMods(); updateFilterStyles();"><i class="fas fa-sort"></i> ${sortLabels[sortFilter.value] || sortFilter.value} <i class="fas fa-times"></i></span>`);
    } else if (sortFilter) {
        sortFilter.classList.remove('filter-active');
    }
    
    // Check game filter
    if (gameFilter && gameFilter.value) {
        gameFilter.classList.add('filter-active');
        hasActiveFilters = true;
        activeFilterBadges.push(`<span class="filter-badge" onclick="document.getElementById('gameFilter').value=''; filterByGameAdvanced(); updateFilterStyles();"><i class="fas fa-gamepad"></i> ${gameFilter.value} <i class="fas fa-times"></i></span>`);
    } else if (gameFilter) {
        gameFilter.classList.remove('filter-active');
    }
    
    // Check search
    if (searchInput && searchInput.value.trim()) {
        hasActiveFilters = true;
        activeFilterBadges.push(`<span class="filter-badge" onclick="document.getElementById('gameSearch').value=''; searchAllMods(); updateFilterStyles();"><i class="fas fa-search"></i> "${searchInput.value}" <i class="fas fa-times"></i></span>`);
    }
    
    // Show/hide clear button
    if (clearBtn) {
        clearBtn.style.display = hasActiveFilters ? 'flex' : 'none';
    }
    
    // Show active filter badges
    if (activeFiltersDiv) {
        if (activeFilterBadges.length > 0) {
            activeFiltersDiv.innerHTML = activeFilterBadges.join('');
            activeFiltersDiv.style.display = 'flex';
        } else {
            activeFiltersDiv.style.display = 'none';
        }
    }
}

function loadMoreMods() {
    showMessage('All mods are already loaded!', 'info');
}

// Utility Functions
function showMessage(message, type) {
    document.querySelectorAll('.toast-message').forEach(el => el.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'toast-message';
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 100000;
        max-width: 350px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    `;
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

function closeModal() {
    const modal = document.getElementById('gameModal');
    if (modal) modal.style.display = 'none';
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.style.display = 'none';
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    ['authModal', 'profileModal', 'gameModal'].forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal && e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close user dropdown
    if (!e.target.closest('.user-profile-dropdown')) {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.classList.remove('show');
    }
    
    // Close game dropdown
    if (!e.target.closest('.nav-dropdown')) {
        const dropdown = document.getElementById('gameDropdown');
        if (dropdown) dropdown.classList.remove('show');
    }
    
    // Close floating panels when clicking outside
    const clickedOnPanel = e.target.closest('.download-manager-panel, .cart-panel, #cart, .chatbot-panel, #chatbot');
    const clickedOnToggle = e.target.closest('.download-manager-toggle, .cart-toggle, .chatbot-toggle');
    
    if (!clickedOnPanel && !clickedOnToggle) {
        // Close download manager
        const downloadPanel = document.getElementById('downloadManagerPanel');
        if (downloadPanel && downloadPanel.classList.contains('show')) {
            downloadPanel.classList.remove('show');
            downloadManagerOpen = false;
        }
        
        // Close cart
        const cartElement = document.getElementById('cart');
        if (cartElement && cartElement.classList.contains('open')) {
            cartElement.classList.remove('open');
        }
        
        // Close chatbot
        const chatbot = document.getElementById('chatbot');
        if (chatbot && chatbot.classList.contains('open')) {
            chatbot.classList.remove('open');
        }
    }
});

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in, .section-header').forEach(el => {
        observer.observe(el);
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Chatbot
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    const notification = document.getElementById('chatNotification');
    
    if (chatbot) {
        const willOpen = !chatbot.classList.contains('open');
        
        if (willOpen) {
            closeAllPanels('chatbot');
        }
        
        chatbot.classList.toggle('open');
        if (chatbot.classList.contains('open') && notification) {
            notification.style.display = 'none';
        }
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Chat history for context
let chatHistory = [];

async function sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input || !input.value.trim()) return;
    
    const message = input.value.trim();
    input.value = '';
    
    addMessageToChat(message, 'user');
    chatHistory.push({ role: 'user', content: message });
    
    // Get user name if logged in
    let userName = null;
    if (currentUser && currentUser.name) {
        userName = currentUser.name.split(' ')[0]; // First name only
    }
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        const response = await fetch('/api/chatbot/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                message,
                history: chatHistory.slice(-10),
                userName
            })
        });
        
        const data = await response.json();
        hideTypingIndicator();
        
        if (response.ok && data.response) {
            addMessageToChat(data.response, 'bot');
            chatHistory.push({ role: 'assistant', content: data.response });
        } else {
            // Fallback to local responses if API fails
            const fallbackResponse = getBotResponse(message);
            addMessageToChat(fallbackResponse, 'bot');
        }
    } catch (error) {
        console.error('Chat error:', error);
        hideTypingIndicator();
        // Fallback to local responses
        const fallbackResponse = getBotResponse(message);
        addMessageToChat(fallbackResponse, 'bot');
    }
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function askBot(question) {
    const input = document.getElementById('chatInput');
    if (input) {
        input.value = question;
        sendMessage();
    }
}

function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;
    
    // Convert markdown-style formatting to HTML
    let formattedMessage = message
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
        .replace(/• /g, '&bull; ')
        .replace(/(\d+)\. /g, '<strong>$1.</strong> ');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            ${sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>'}
        </div>
        <div class="message-content">${formattedMessage}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Fallback local responses (used if API fails)

function getBotResponse(message) {
    const lower = message.toLowerCase();
    
    // Greetings
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('sup') || lower.includes('yo')) {
        const greetings = [
            "Hey there! 👋 I'm ExusBot, your gaming & modding assistant! What can I help you with?",
            "Hello! 🎮 Ready to help you find the perfect mods! What are you looking for?",
            "Hey! 🤖 ExusBot here! Ask me anything about mods, games, or tech!",
            "Yo! What's up? 🎯 Need help with mods, installations, or just wanna chat about games?"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // How are you / what's up
    if (lower.includes('how are you') || lower.includes("how's it going") || lower.includes('whats up') || lower.includes("what's up")) {
        return "I'm running at peak performance! 🚀 Ready to help you mod your games. What do you need?";
    }
    
    // Thanks
    if (lower.includes('thank') || lower.includes('thx') || lower.includes('cheers')) {
        return "You're welcome! 😊 Happy to help. Let me know if you need anything else!";
    }
    
    // Goodbye
    if (lower.includes('bye') || lower.includes('goodbye') || lower.includes('see ya') || lower.includes('later')) {
        return "See you later! 👋 Happy modding! Come back anytime you need help!";
    }
    
    // What can you do
    if (lower.includes('what can you do') || lower.includes('help me') || lower.includes('what do you do') || lower.includes('features')) {
        return "I can help you with:\n🎮 Finding mods for your favorite games\n📥 Installation guides & troubleshooting\n💻 Programming & development questions\n🔧 Technical support & optimization\n⚙️ Game settings & performance tips\n🎯 Mod compatibility checks\n\nJust ask away!";
    }
    
    // Mod installation - General
    if (lower.includes('install') && (lower.includes('mod') || lower.includes('mods'))) {
        return "📥 **General Mod Installation:**\n\n1️⃣ Download the mod file from ExusCraft\n2️⃣ Extract the ZIP/RAR to your game's mod folder\n3️⃣ Enable mods in your game settings\n4️⃣ Restart the game\n\nWhich game do you need specific help with? (Minecraft, Skyrim, GTA V, etc.)";
    }
    
    // Minecraft specific
    if (lower.includes('minecraft')) {
        if (lower.includes('install') || lower.includes('how to')) {
            return "🧱 **Minecraft Mod Installation:**\n\n**For Forge Mods:**\n1. Install Minecraft Forge from files.minecraftforge.net\n2. Put .jar mod files in %appdata%/.minecraft/mods\n3. Launch with Forge profile\n\n**For Fabric Mods:**\n1. Install Fabric Loader\n2. Add Fabric API mod\n3. Put mods in the mods folder\n\n**For Bedrock:**\nUse .mcpack files - just double-click to install!\n\nNeed more details?";
        }
        if (lower.includes('shader') || lower.includes('shaders')) {
            return "✨ **Minecraft Shaders:**\n\nPopular options:\n• **Optifine** - Classic, great performance\n• **Iris** - Fabric-based, modern\n• **BSL Shaders** - Beautiful & balanced\n• **SEUS** - Ultra realistic\n• **Complementary** - Best all-rounder\n\nInstall Optifine/Iris first, then put shader packs in the shaderpacks folder!";
        }
        return "🧱 Minecraft is awesome for modding! We have texture packs, shaders, gameplay mods, and more. What specifically are you looking for? Shaders? New content? Performance mods?";
    }
    
    // Skyrim specific
    if (lower.includes('skyrim')) {
        if (lower.includes('install') || lower.includes('how to')) {
            return "⚔️ **Skyrim Mod Installation:**\n\n**Recommended Method:**\n1. Install **Vortex** or **Mod Organizer 2**\n2. Get **SKSE64** (Script Extender)\n3. Download mods from ExusCraft/Nexus\n4. Install via your mod manager\n5. Sort load order with LOOT\n\n**Essential Mods:**\n• USSEP (Unofficial Patch)\n• SkyUI\n• SKSE64\n\nNeed help with load order?";
        }
        if (lower.includes('crash') || lower.includes('ctd')) {
            return "🔧 **Skyrim Crash Fixes:**\n\n1. Check load order with LOOT\n2. Look for missing masters\n3. Install Crash Logger for diagnosis\n4. Verify game files on Steam\n5. Check for mod conflicts\n6. Make sure SKSE matches your game version\n\nTry disabling mods one by one to find the culprit!";
        }
        return "⚔️ Skyrim modding is legendary! We have graphics overhauls, new quests, gameplay changes, and more. Looking for anything specific?";
    }
    
    // GTA V specific
    if (lower.includes('gta') || lower.includes('grand theft auto')) {
        if (lower.includes('install') || lower.includes('how to')) {
            return "🚗 **GTA V Mod Installation:**\n\n**For Script Mods:**\n1. Install ScriptHookV\n2. Install ScriptHookVDotNet (for .NET mods)\n3. Put .asi files in GTA V folder\n\n**For Vehicle/Texture Mods:**\n1. Install OpenIV\n2. Create a mods folder\n3. Use OpenIV to replace files\n\n⚠️ **Important:** Only mod in Story Mode! Online modding = ban!";
        }
        if (lower.includes('online') || lower.includes('ban')) {
            return "⚠️ **GTA Online Warning:**\n\nNEVER use mods in GTA Online! Rockstar will ban you permanently.\n\n✅ Safe: Story Mode modding\n❌ Unsafe: Any mods in Online\n\nAlways remove mods before going online, or use a separate game installation!";
        }
        return "🚗 GTA V has amazing mods! Car packs, graphics mods, script mods, and more. Just remember - Story Mode only! What are you looking for?";
    }
    
    // Cyberpunk specific
    if (lower.includes('cyberpunk')) {
        if (lower.includes('install') || lower.includes('how to')) {
            return "🤖 **Cyberpunk 2077 Mod Installation:**\n\n1. Install **Vortex** mod manager\n2. Get **Cyber Engine Tweaks** (essential!)\n3. Install **redscript** for script mods\n4. Download mods and install via Vortex\n\n**Popular Mods:**\n• Better Vehicle Handling\n• Appearance Menu Mod\n• Better Minimap\n• Cyber Engine Tweaks\n\nMost mods go in the game's archive/pc/mod folder!";
        }
        return "🤖 Cyberpunk 2077 modding has grown huge! Graphics mods, gameplay tweaks, new features - what interests you?";
    }
    
    // Rust specific
    if (lower.includes('rust')) {
        return "🔧 **Rust Modding:**\n\nRust uses server-side mods via **Oxide/uMod**.\n\n**For Server Owners:**\n1. Install Oxide on your server\n2. Add plugins to oxide/plugins folder\n3. Configure via oxide/config\n\n**For Players:**\nClient mods are limited - most mods are server-side. Look for modded servers with the features you want!\n\nNeed server setup help?";
    }
    
    // Fallout specific
    if (lower.includes('fallout')) {
        return "☢️ **Fallout 4 Mod Installation:**\n\n1. Install **Vortex** or **Mod Organizer 2**\n2. Get **F4SE** (Script Extender)\n3. Enable modding in Fallout4.ini\n4. Download and install mods\n\n**Must-Have Mods:**\n• Unofficial Fallout 4 Patch\n• Sim Settlements 2\n• True Storms\n• Vivid Fallout\n\nSimilar to Skyrim modding if you're familiar!";
    }
    
    // Witcher specific
    if (lower.includes('witcher')) {
        return "🐺 **Witcher 3 Mod Installation:**\n\n1. Use **Vortex** or manual install\n2. Put mods in /mods folder (create if needed)\n3. Merge mods with **Script Merger** if needed\n4. Use **Mod Limit Fix** for many mods\n\n**Popular Mods:**\n• HD Reworked Project\n• All Quest Objectives on Map\n• Fast Travel from Anywhere\n• E3 Graphics Mod";
    }
    
    // Counter-Strike specific
    if (lower.includes('counter') || lower.includes('cs2') || lower.includes('csgo')) {
        return "🎯 **CS2 Customization:**\n\nCS2 is more limited than CSGO was, but you can:\n• Use custom crosshairs (in settings)\n• Workshop maps for practice\n• Config files for settings\n• HUD customization\n\n⚠️ Be careful with third-party tools - VAC bans are permanent!";
    }
    
    // Download help
    if (lower.includes('download')) {
        return "📥 **How to Download:**\n\n1. Click on any mod card to see details\n2. For **free mods**: Click 'Download Now'\n3. For **paid mods**: Click 'Purchase' and complete checkout\n4. Downloads start automatically!\n\nAll files are virus-scanned and safe. Need help with a specific download?";
    }
    
    // Price/cost questions
    if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
        return "💰 **Pricing Info:**\n\n• **Free mods** - Marked with FREE badge, no cost!\n• **Paid mods** - Support creators, usually $1-20\n• **Collections** - Bundle deals available\n\nCreators set their own prices. Free mods are often donation-supported!";
    }
    
    // Free mods
    if (lower.includes('free')) {
        return "🆓 **Free Mods:**\n\nWe have tons of free mods! Look for the 'FREE' badge on mod cards, or use the 'Free Mods' filter in the navigation.\n\nFree doesn't mean low quality - many amazing mods are free! Creators often accept donations if you want to support them.";
    }
    
    // Account/login issues
    if (lower.includes('login') || lower.includes('sign in') || lower.includes('account')) {
        return "🔐 **Account Help:**\n\n• Click 'Login' or 'Join Now' in the top right\n• Sign in with Google for quick access\n• Your purchases and collections are saved to your account\n\nHaving trouble? Try clearing your browser cache or using a different browser!";
    }
    
    // Collections
    if (lower.includes('collection')) {
        return "📦 **Collections:**\n\nCollections are curated mod packs!\n\n**To create one:**\n1. Go to Collections page\n2. Click 'Create Collection'\n3. Add mods and descriptions\n4. Share with the community!\n\n**To use one:**\nBrowse collections, find one you like, and download all mods at once!";
    }
    
    // Performance/optimization
    if (lower.includes('performance') || lower.includes('fps') || lower.includes('lag') || lower.includes('slow') || lower.includes('optimize')) {
        return "⚡ **Performance Tips:**\n\n1. **Lower graphics settings** in-game\n2. **Update GPU drivers** regularly\n3. **Close background apps** while gaming\n4. **Use performance mods** (many games have them)\n5. **Check mod conflicts** - too many mods = lag\n6. **Verify game files** if issues persist\n\nWhich game needs optimization?";
    }
    
    // Crashes
    if (lower.includes('crash') || lower.includes('not working') || lower.includes('broken') || lower.includes('error')) {
        return "🔧 **Troubleshooting Crashes:**\n\n1. **Verify game files** via Steam/launcher\n2. **Check mod compatibility** - outdated mods crash!\n3. **Review load order** (use LOOT for Bethesda games)\n4. **Update mods** to latest versions\n5. **Check for conflicts** - disable mods one by one\n6. **Read mod descriptions** for requirements\n\nWhat game is crashing?";
    }
    
    // Programming/coding help
    if (lower.includes('code') || lower.includes('programming') || lower.includes('javascript') || lower.includes('python') || lower.includes('java') || lower.includes('develop')) {
        return "💻 **Programming Help:**\n\nI can help with:\n• JavaScript/TypeScript\n• Python\n• Java/C#\n• HTML/CSS\n• Game modding scripts\n• API integration\n\nWhat are you working on? Share your code or describe the problem!";
    }
    
    // JavaScript specific
    if (lower.includes('js') || lower.includes('react') || lower.includes('node')) {
        return "💛 **JavaScript Help:**\n\nI can assist with:\n• Vanilla JS, ES6+\n• React, Vue, Angular\n• Node.js, Express\n• Async/await, Promises\n• DOM manipulation\n• API calls\n\nWhat's your question?";
    }
    
    // Mod creation
    if (lower.includes('create mod') || lower.includes('make mod') || lower.includes('mod creation') || lower.includes('modding tutorial')) {
        return "🛠️ **Creating Mods:**\n\n**Beginner-friendly games:**\n• Minecraft (Java) - MCreator or direct coding\n• Skyrim - Creation Kit\n• GTA V - OpenIV + tutorials\n\n**You'll need:**\n• Game's modding tools\n• Basic programming knowledge\n• Patience and creativity!\n\nWhich game do you want to mod?";
    }
    
    // Upload mod
    if (lower.includes('upload') || lower.includes('submit') || lower.includes('share mod')) {
        return "📤 **Upload Your Mod:**\n\n1. Create an account on ExusCraft\n2. Go to your profile\n3. Click 'Upload Mod'\n4. Fill in details, screenshots, description\n5. Upload your mod files\n6. Submit for review!\n\nMake sure to include good screenshots and a clear description!";
    }
    
    // Safety/virus concerns
    if (lower.includes('safe') || lower.includes('virus') || lower.includes('malware') || lower.includes('trust')) {
        return "🛡️ **Safety Info:**\n\nAll mods on ExusCraft are:\n• Scanned for viruses\n• Reviewed by our team\n• Community-rated\n\n**Stay safe:**\n• Only download from trusted sources\n• Check reviews and ratings\n• Use antivirus software\n• Backup your saves before modding!";
    }
    
    // Compatibility
    if (lower.includes('compatible') || lower.includes('work with') || lower.includes('conflict')) {
        return "🔄 **Mod Compatibility:**\n\n**Check for:**\n• Game version requirements\n• Other required mods (dependencies)\n• Known conflicts in mod description\n• Load order (for Bethesda games)\n\n**Tools:**\n• LOOT - Auto-sorts load order\n• xEdit - Check for conflicts\n• Mod manager conflict detection\n\nWhich mods are you trying to use together?";
    }
    
    // Backup
    if (lower.includes('backup') || lower.includes('save')) {
        return "💾 **Backup Tips:**\n\n**Always backup before modding:**\n• Save game files\n• Game configuration\n• Original game files (if modifying)\n\n**Locations:**\n• Documents/My Games/[Game]\n• %AppData%/[Game]\n• Steam/userdata/\n\nMod managers often have backup features too!";
    }
    
    // Recommendations
    if (lower.includes('recommend') || lower.includes('best mod') || lower.includes('top mod') || lower.includes('popular')) {
        return "⭐ **Top Recommendations:**\n\nCheck out our:\n• **Featured Mods** - Hand-picked quality\n• **Most Downloaded** - Community favorites\n• **Highest Rated** - Best reviewed\n• **Collections** - Curated bundles\n\nOr tell me your game and what you're looking for - graphics, gameplay, content?";
    }
    
    // Graphics mods
    if (lower.includes('graphics') || lower.includes('visual') || lower.includes('texture') || lower.includes('enb') || lower.includes('reshade')) {
        return "🎨 **Graphics Mods:**\n\n**Types:**\n• **Texture packs** - Higher res textures\n• **ENB/ReShade** - Post-processing effects\n• **Lighting mods** - Better shadows/lights\n• **Weather mods** - Atmospheric effects\n\n**Performance impact:** High-res = more VRAM needed\n\nWhich game do you want to beautify?";
    }
    
    // Joke/fun
    if (lower.includes('joke') || lower.includes('funny') || lower.includes('laugh')) {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "I tried to make a mod once... it was a total conversion of my free time into frustration! 😅",
            "What's a modder's favorite key? Ctrl+Z! 🔄",
            "Why did the mod crash? It had too many dependencies... just like me with coffee! ☕"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // Who made you
    if (lower.includes('who made you') || lower.includes('who created you') || lower.includes('who are you')) {
        return "🤖 I'm ExusBot, created by the ExusCraft team! I'm here to help you with all things gaming and modding. Built with love in New Zealand! 🇳🇿";
    }
    
    // ExusCraft info
    if (lower.includes('exuscraft') || lower.includes('about') || lower.includes('this site') || lower.includes('this website')) {
        return "🎮 **About ExusCraft:**\n\nWe're a community-driven mod marketplace!\n\n• Browse thousands of mods\n• Support mod creators\n• Create and share collections\n• Safe, verified downloads\n• Built by gamers, for gamers! 🇳🇿\n\nWhat would you like to explore?";
    }
    
    // Weather (fun)
    if (lower.includes('weather')) {
        return "I'm a gaming bot, not a weather bot! 😄 But I can tell you the weather in Skyrim is always dramatic, and Night City is perpetually smoggy! 🌆";
    }
    
    // Love/feelings
    if (lower.includes('love you') || lower.includes('marry')) {
        return "Aww, I'm flattered! 😊 But I'm just a bot - my heart is made of code! I do love helping you with mods though! 🎮";
    }
    
    // Swearing/rude (keep it friendly)
    if (lower.includes('stupid') || lower.includes('dumb') || lower.includes('suck')) {
        return "Hey, I'm trying my best here! 😅 Let me know what you actually need help with and I'll do better!";
    }
    
    // Default responses (rotate through these)
    const defaults = [
        "Hmm, I'm not sure about that one! 🤔 Try asking about mod installation, game-specific help, or troubleshooting!",
        "I didn't quite catch that! I'm best at helping with mods, games, and tech stuff. What do you need?",
        "Not sure I understand - could you rephrase? I can help with mod installation, downloads, troubleshooting, and more!",
        "That's outside my expertise! But I'm great with gaming and modding questions. What game are you playing?"
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
}

// Navigation helpers
function checkLoginAndNavigate(section) {
    const modsSection = document.getElementById('games');
    if (modsSection) {
        modsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function checkLoginAndExplore() {
    const modsSection = document.getElementById('games');
    if (modsSection) {
        modsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleGameDropdown() {
    const dropdown = document.getElementById('gameDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// New UI Functions
function scrollToMods() {
    const modsSection = document.getElementById('games');
    if (modsSection) {
        modsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleNavSearch(event) {
    if (event.key === 'Enter') {
        const query = event.target.value.trim();
        if (query) {
            // Scroll to mods section and search
            scrollToMods();
            const searchInput = document.getElementById('gameSearch');
            if (searchInput) {
                searchInput.value = query;
                searchAllMods();
            }
        }
    }
}

// ============================================
// UPLOAD MOD FEATURE
// ============================================
function showUploadModal(existingMod = null) {
    if (!currentUser) {
        showLogin();
        showMessage('Please login to upload mods', 'info');
        return;
    }
    
    const isEdit = !!existingMod;
    const modal = document.getElementById('profileModal') || createProfileModal();
    const content = document.getElementById('profileContent');
    
    content.innerHTML = `
        <div class="upload-container">
            <div class="section-header-modal">
                <button onclick="showMyMods()" class="back-btn"><i class="fas fa-arrow-left"></i></button>
                <h2>${isEdit ? 'Edit Mod' : 'Upload New Mod'}</h2>
            </div>
            
            <form id="uploadModForm" onsubmit="submitMod(event, ${isEdit ? `'${existingMod._id}'` : 'null'})">
                <div class="upload-image-section">
                    <div class="upload-preview" id="uploadPreview">
                        ${existingMod?.images?.[0] ? `<img src="${existingMod.images[0]}" alt="Preview">` : `
                            <i class="fas fa-cloud-upload-alt"></i>
                            <span>Click to upload thumbnail</span>
                        `}
                    </div>
                    <input type="file" id="modImage" accept="image/*" onchange="previewImage(this)" style="display: none;">
                    <button type="button" onclick="document.getElementById('modImage').click()" class="btn btn-outline btn-sm">
                        <i class="fas fa-image"></i> ${existingMod ? 'Change Thumbnail' : 'Add Thumbnail'}
                    </button>
                </div>
                
                <div class="form-group">
                    <label for="modTitle">Mod Title *</label>
                    <input type="text" id="modTitle" required maxlength="100" value="${existingMod?.title || ''}" placeholder="Enter mod name">
                </div>
                
                <div class="form-group">
                    <label for="modDescription">Description *</label>
                    <textarea id="modDescription" required rows="4" maxlength="1000" placeholder="Describe your mod...">${existingMod?.description || ''}</textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="modGame">Game *</label>
                        <select id="modGame" required>
                            <option value="">Select Game</option>
                            <option value="Minecraft" ${existingMod?.gameTitle === 'Minecraft' ? 'selected' : ''}>Minecraft</option>
                            <option value="Skyrim" ${existingMod?.gameTitle === 'Skyrim' ? 'selected' : ''}>Skyrim</option>
                            <option value="GTA V" ${existingMod?.gameTitle === 'GTA V' ? 'selected' : ''}>GTA V</option>
                            <option value="Cyberpunk 2077" ${existingMod?.gameTitle === 'Cyberpunk 2077' ? 'selected' : ''}>Cyberpunk 2077</option>
                            <option value="Rust" ${existingMod?.gameTitle === 'Rust' ? 'selected' : ''}>Rust</option>
                            <option value="The Witcher 3" ${existingMod?.gameTitle === 'The Witcher 3' ? 'selected' : ''}>The Witcher 3</option>
                            <option value="Fallout 4" ${existingMod?.gameTitle === 'Fallout 4' ? 'selected' : ''}>Fallout 4</option>
                            <option value="Counter-Strike 2" ${existingMod?.gameTitle === 'Counter-Strike 2' ? 'selected' : ''}>Counter-Strike 2</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="modCategory">Category *</label>
                        <select id="modCategory" required>
                            <option value="">Select Category</option>
                            <option value="Graphics" ${existingMod?.category === 'Graphics' ? 'selected' : ''}>Graphics</option>
                            <option value="Gameplay" ${existingMod?.category === 'Gameplay' ? 'selected' : ''}>Gameplay</option>
                            <option value="UI/UX" ${existingMod?.category === 'UI/UX' ? 'selected' : ''}>UI/UX</option>
                            <option value="Audio" ${existingMod?.category === 'Audio' ? 'selected' : ''}>Audio</option>
                            <option value="Performance" ${existingMod?.category === 'Performance' ? 'selected' : ''}>Performance</option>
                            <option value="Utility" ${existingMod?.category === 'Utility' ? 'selected' : ''}>Utility</option>
                            <option value="Maps" ${existingMod?.category === 'Maps' ? 'selected' : ''}>Maps</option>
                            <option value="Characters" ${existingMod?.category === 'Characters' ? 'selected' : ''}>Characters</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="modVersion">Version</label>
                        <input type="text" id="modVersion" value="${existingMod?.version || '1.0.0'}" placeholder="1.0.0">
                    </div>
                    
                    <div class="form-group">
                        <label for="modPrice">Price ($)</label>
                        <input type="number" id="modPrice" min="0" step="0.01" value="${existingMod?.price || 0}" placeholder="0 for free">
                    </div>
                </div>
                
                <!-- MOD FILE UPLOAD -->
                <div class="form-group">
                    <label><i class="fas fa-file-archive"></i> Mod File *</label>
                    <div class="file-upload-zone" id="fileUploadZone" onclick="document.getElementById('modFile').click()">
                        <input type="file" id="modFile" accept=".jar,.zip,.rar,.7z,.dll,.pak,.esp,.esm,.ba2" onchange="handleModFileSelect(this)" style="display: none;">
                        <div class="file-upload-content" id="fileUploadContent">
                            <i class="fas fa-file-upload"></i>
                            <span>Click to upload mod file</span>
                            <small>.jar, .zip, .rar, .7z, .dll, .pak, .esp, .esm, .ba2</small>
                        </div>
                    </div>
                    <div id="selectedFileInfo" class="selected-file-info" style="display: none;"></div>
                </div>
                
                <div class="form-group">
                    <label for="modTags">Tags (comma separated)</label>
                    <input type="text" id="modTags" value="${existingMod?.tags?.join(', ') || ''}" placeholder="e.g. graphics, performance, essential">
                </div>
                
                <div class="form-group">
                    <label for="modRequirements">Requirements</label>
                    <input type="text" id="modRequirements" value="${existingMod?.requirements || ''}" placeholder="e.g. Game version 1.20+, Mod loader required">
                </div>
                
                <div class="form-actions">
                    <button type="button" onclick="showMyMods()" class="btn btn-outline">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i class="fas fa-${isEdit ? 'save' : 'upload'}"></i> ${isEdit ? 'Save Changes' : 'Upload Mod'}</button>
                </div>
            </form>
        </div>
    `;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

let uploadedImageData = null;
let uploadedModFile = null;
let uploadedModFileName = null;

function previewImage(input) {
    const preview = document.getElementById('uploadPreview');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImageData = e.target.result;
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function handleModFileSelect(input) {
    const fileInfo = document.getElementById('selectedFileInfo');
    const uploadContent = document.getElementById('fileUploadContent');
    const uploadZone = document.getElementById('fileUploadZone');
    
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const maxSize = 100 * 1024 * 1024; // 100MB limit
        
        if (file.size > maxSize) {
            showMessage('File too large! Maximum size is 100MB', 'error');
            input.value = '';
            return;
        }
        
        uploadedModFileName = file.name;
        
        // Read file as base64 for storage
        const reader = new FileReader();
        reader.onload = function(e) {
            // Store just the base64 data (remove the data URL prefix)
            const base64 = e.target.result.split(',')[1];
            uploadedModFile = base64;
        };
        reader.readAsDataURL(file);
        
        // Update UI
        const fileSize = formatFileSize(file.size);
        uploadZone.classList.add('has-file');
        uploadContent.innerHTML = `
            <i class="fas fa-check-circle" style="color: #22C55E;"></i>
            <span style="color: #22C55E;">File selected!</span>
        `;
        fileInfo.innerHTML = `
            <div class="file-info-card">
                <i class="fas fa-file-archive"></i>
                <div class="file-details">
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${fileSize}</span>
                </div>
                <button type="button" onclick="removeModFile()" class="remove-file-btn"><i class="fas fa-times"></i></button>
            </div>
        `;
        fileInfo.style.display = 'block';
    }
}

function removeModFile() {
    uploadedModFile = null;
    uploadedModFileName = null;
    document.getElementById('modFile').value = '';
    document.getElementById('selectedFileInfo').style.display = 'none';
    document.getElementById('fileUploadZone').classList.remove('has-file');
    document.getElementById('fileUploadContent').innerHTML = `
        <i class="fas fa-file-upload"></i>
        <span>Click to upload mod file</span>
        <small>.jar, .zip, .rar, .7z, .dll, .pak, .esp, .esm, .ba2</small>
    `;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function submitMod(event, existingId = null) {
    event.preventDefault();
    
    const title = document.getElementById('modTitle').value.trim();
    const description = document.getElementById('modDescription').value.trim();
    const gameTitle = document.getElementById('modGame').value;
    const category = document.getElementById('modCategory').value;
    const version = document.getElementById('modVersion').value.trim() || '1.0.0';
    let price = parseFloat(document.getElementById('modPrice').value) || 0;
    
    // Price cap - get from localStorage (set in admin panel)
    const PRICE_CAP = parseFloat(localStorage.getItem('priceCap')) || 99.99;
    if (price > PRICE_CAP) {
        showMessage(`Price capped at $${PRICE_CAP.toFixed(2)}. Your price has been adjusted.`, 'info');
        price = PRICE_CAP;
    }
    
    const tags = document.getElementById('modTags').value.split(',').map(t => t.trim()).filter(t => t);
    const requirements = document.getElementById('modRequirements').value.trim();
    
    if (!title || !description || !gameTitle || !category) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    const modData = {
        _id: existingId || 'user_' + Date.now(),
        title,
        description,
        shortDescription: description.substring(0, 100) + (description.length > 100 ? '...' : ''),
        gameTitle,
        category,
        version,
        price,
        isFree: price === 0,
        tags,
        requirements,
        specs: 'Check mod description for requirements',
        author: currentUser.name || currentUser.username || 'Anonymous',
        authorId: currentUser.id,
        images: [uploadedImageData || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop'],
        rating: existingId ? (userMods.find(m => m._id === existingId)?.rating || 0) : 0,
        downloads: existingId ? (userMods.find(m => m._id === existingId)?.downloads || 0) : 0,
        status: 'starting-out',
        featured: false,
        createdAt: existingId ? (userMods.find(m => m._id === existingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        fileData: uploadedModFile || (existingId ? userMods.find(m => m._id === existingId)?.fileData : null),
        fileName: uploadedModFileName || (existingId ? userMods.find(m => m._id === existingId)?.fileName : null)
    };
    
    // Check if mod file is uploaded (required for new mods)
    if (!existingId && !modData.fileData) {
        showMessage('Please upload a mod file', 'error');
        return;
    }
    
    if (existingId) {
        const index = userMods.findIndex(m => m._id === existingId);
        if (index > -1) {
            userMods[index] = modData;
        }
        showMessage('Mod updated successfully! 🎉', 'success');
    } else {
        userMods.unshift(modData);
        // Also add to main mods array so it shows up
        mods.unshift(modData);
        showMessage('Mod uploaded successfully! 🎉', 'success');
    }
    
    saveUserData();
    uploadedImageData = null;
    uploadedModFile = null;
    uploadedModFileName = null;
    showMyMods();
    
    // Refresh the main page mods display
    displayModsInSections(mods);
}

function showMyMods() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    const modal = document.getElementById('profileModal') || createProfileModal();
    const content = document.getElementById('profileContent');
    
    content.innerHTML = `
        <div class="my-mods-container">
            <div class="section-header-modal">
                <button onclick="showProfile()" class="back-btn"><i class="fas fa-arrow-left"></i></button>
                <h2>My Mods</h2>
                <button onclick="showUploadModal()" class="btn btn-primary btn-sm"><i class="fas fa-plus"></i> Upload New</button>
            </div>
            
            <div class="my-mods-grid" id="myModsGrid">
                ${userMods.length === 0 ? `
                    <div class="empty-state">
                        <i class="fas fa-puzzle-piece"></i>
                        <h3>No mods yet</h3>
                        <p>Start creating and sharing your mods with the community!</p>
                        <button onclick="showUploadModal()" class="btn btn-primary"><i class="fas fa-upload"></i> Upload Your First Mod</button>
                    </div>
                ` : userMods.map(mod => `
                    <div class="my-mod-card">
                        <img src="${mod.images?.[0] || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop'}" alt="${mod.title}">
                        <div class="my-mod-info">
                            <h4>${mod.title}</h4>
                            <p>${mod.gameTitle} • ${mod.category}</p>
                            <div class="my-mod-stats">
                                <span><i class="fas fa-download"></i> ${formatDownloads(mod.downloads || 0)}</span>
                                <span><i class="fas fa-star"></i> ${mod.rating || 0}</span>
                            </div>
                            <div class="my-mod-actions">
                                <button onclick="editMod('${mod._id}')" class="btn btn-outline btn-xs"><i class="fas fa-edit"></i> Edit</button>
                                <button onclick="deleteMod('${mod._id}')" class="btn btn-danger btn-xs"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function showFavorites() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    const modal = document.getElementById('profileModal') || createProfileModal();
    const content = document.getElementById('profileContent');
    
    const favoriteMods = mods.filter(mod => favorites.includes(mod._id));
    
    content.innerHTML = `
        <div class="favorites-container">
            <div class="section-header-modal">
                <button onclick="showProfile()" class="back-btn"><i class="fas fa-arrow-left"></i></button>
                <h2>My Favorites</h2>
            </div>
            
            <div class="favorites-grid" id="favoritesGrid">
                ${favoriteMods.length === 0 ? `
                    <div class="empty-state">
                        <i class="fas fa-heart"></i>
                        <h3>No favorites yet</h3>
                        <p>Browse mods and click the heart icon to add them to your favorites!</p>
                        <button onclick="closeProfileModal(); scrollToMods();" class="btn btn-primary"><i class="fas fa-compass"></i> Browse Mods</button>
                    </div>
                ` : favoriteMods.map(mod => `
                    <div class="favorite-card" onclick="closeProfileModal(); showModDetails('${mod._id}');">
                        <img src="${mod.images?.[0] || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop'}" alt="${mod.title}">
                        <button class="remove-fav-btn" onclick="event.stopPropagation(); toggleFavorite('${mod._id}')"><i class="fas fa-heart-broken"></i></button>
                        <div class="favorite-info">
                            <h4>${mod.title}</h4>
                            <p>${mod.gameTitle} • ${mod.category}</p>
                            <span class="favorite-price">${mod.isFree ? 'FREE' : '$' + mod.price.toFixed(2)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }
}

// Make all functions globally available
window.toggleTheme = toggleTheme;
window.showLogin = showLogin;
window.showRegister = showRegister;
window.loginWithGoogle = loginWithGoogle;
window.logout = logout;
window.toggleUserMenu = toggleUserMenu;
window.showProfile = showProfile;
window.showLibrary = showLibrary;
window.addToLibrary = addToLibrary;
window.removeFromLibrary = removeFromLibrary;
window.installFromLibrary = installFromLibrary;
window.showOrders = showOrders;
window.showSettings = showSettings;
window.showDownloads = showDownloads;
window.showMyMods = showMyMods;
window.showFavorites = showFavorites;
window.showUploadModal = showUploadModal;
window.toggleFavorite = toggleFavorite;
window.toggleCart = toggleCart;
window.toggleChatbot = toggleChatbot;
window.closeAuthModal = closeAuthModal;
window.closeModal = closeModal;
window.closeProfileModal = closeProfileModal;
window.showModDetails = showModDetails;
window.downloadMod = downloadMod;
window.toggleDownloadManager = toggleDownloadManager;
window.pauseDownload = pauseDownload;
window.resumeDownload = resumeDownload;
window.cancelDownload = cancelDownload;
window.clearCompletedDownloads = clearCompletedDownloads;
window.openDownloadedFile = openDownloadedFile;
window.openDownloadsFolder = openDownloadsFolder;
window.purchaseMod = purchaseMod;
window.purchaseAndAddToLibrary = purchaseAndAddToLibrary;
window.addModToCart = addModToCart;
window.removeFromCart = removeFromCart;
window.checkout = checkout;
window.searchAllMods = searchAllMods;
window.filterAllMods = filterAllMods;
window.filterByGame = filterByGame;
window.filterByGameAdvanced = filterByGameAdvanced;
window.sortMods = sortMods;
window.loadMoreMods = loadMoreMods;
window.checkLoginAndNavigate = checkLoginAndNavigate;
window.checkLoginAndExplore = checkLoginAndExplore;
window.toggleGameDropdown = toggleGameDropdown;
window.handleChatKeyPress = handleChatKeyPress;
window.sendMessage = sendMessage;
window.askBot = askBot;
window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;
window.scrollToMods = scrollToMods;
window.handleNavSearch = handleNavSearch;
window.toggleMobileMenu = toggleMobileMenu;
window.editMod = editMod;
window.deleteMod = deleteMod;
window.redownloadMod = redownloadMod;
window.updateSetting = updateSetting;
window.changeThemeSetting = changeThemeSetting;
window.editUsername = editUsername;
window.clearAllData = clearAllData;
window.submitMod = submitMod;
window.previewImage = previewImage;
window.addToDownloads = addToDownloads;

console.log('ExusCraft app loaded successfully!');


// ============================================
// INTERACTIVE HEXAGON GRID - POINTY-TOP TESSELLATION
// ============================================
function initHexGrid() {
    const canvas = document.getElementById('hexGrid');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const hero = document.getElementById('hero');
    
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let animationId;
    let lastFrame = 0;
    const fps = 60;
    const frameInterval = 1000 / fps;
    
    // Pointy-top hexagon settings for perfect tessellation
    const hexSize = 30; // Radius (center to vertex)
    const influenceRadius = 140;
    const maxScale = 1.5;
    
    // Pointy-top hex math:
    // Width = sqrt(3) * size
    // Height = 2 * size
    // Horizontal spacing = width = sqrt(3) * size
    // Vertical spacing = height * 0.75 = 1.5 * size
    const hexWidth = Math.sqrt(3) * hexSize;
    const hexHeight = 2 * hexSize;
    const horizSpacing = hexWidth;
    const vertSpacing = hexHeight * 0.75;
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    // Draw pointy-top hexagon (starts at top vertex)
    function drawHexagon(x, y, size) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            // Pointy-top: start at -90 degrees (top)
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const hx = x + size * Math.cos(angle);
            const hy = y + size * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(hx, hy);
            } else {
                ctx.lineTo(hx, hy);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    function draw(timestamp) {
        if (timestamp - lastFrame < frameInterval) {
            animationId = requestAnimationFrame(draw);
            return;
        }
        lastFrame = timestamp;
        
        // Smooth mouse following
        mouseX += (targetMouseX - mouseX) * 0.25;
        mouseY += (targetMouseY - mouseY) * 0.25;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const cols = Math.ceil(canvas.width / horizSpacing) + 3;
        const rows = Math.ceil(canvas.height / vertSpacing) + 3;
        
        for (let row = -1; row < rows; row++) {
            for (let col = -1; col < cols; col++) {
                // Offset odd rows by half the horizontal spacing
                const xOffset = (row % 2 === 1) ? horizSpacing / 2 : 0;
                const x = col * horizSpacing + xOffset;
                const y = row * vertSpacing;
                
                const dx = x - mouseX;
                const dy = y - mouseY;
                const distSq = dx * dx + dy * dy;
                const influenceSq = influenceRadius * influenceRadius;
                
                if (distSq < influenceSq) {
                    const distance = Math.sqrt(distSq);
                    const intensity = 1 - distance / influenceRadius;
                    const eased = intensity * intensity; // Ease out
                    const scale = 1 + (maxScale - 1) * eased;
                    
                    const alpha = 0.03 + eased * 0.18;
                    ctx.strokeStyle = `rgba(91, 140, 255, ${alpha})`;
                    ctx.lineWidth = 0.5 + eased * 1.2;
                    drawHexagon(x, y, hexSize * scale);
                } else {
                    ctx.strokeStyle = 'rgba(91, 140, 255, 0.025)';
                    ctx.lineWidth = 0.5;
                    drawHexagon(x, y, hexSize);
                }
            }
        }
        
        animationId = requestAnimationFrame(draw);
    }
    
    function handleMouseMove(e) {
        const rect = hero.getBoundingClientRect();
        targetMouseX = e.clientX - rect.left;
        targetMouseY = e.clientY - rect.top;
    }
    
    function handleMouseLeave() {
        targetMouseX = -1000;
        targetMouseY = -1000;
    }
    
    let touchThrottle = false;
    function handleTouchMove(e) {
        if (touchThrottle) return;
        touchThrottle = true;
        setTimeout(() => touchThrottle = false, 50);
        
        if (e.touches.length > 0) {
            const rect = hero.getBoundingClientRect();
            targetMouseX = e.touches[0].clientX - rect.left;
            targetMouseY = e.touches[0].clientY - rect.top;
        }
    }
    
    function handleTouchEnd() {
        targetMouseX = -1000;
        targetMouseY = -1000;
    }
    
    resizeCanvas();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 200);
    });
    
    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    hero.addEventListener('mouseleave', handleMouseLeave);
    hero.addEventListener('touchmove', handleTouchMove, { passive: true });
    hero.addEventListener('touchend', handleTouchEnd);
    
    animationId = requestAnimationFrame(draw);
    
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationId);
    });
}
