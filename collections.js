// Collections page functionality
let currentPage = 1;
let isLoading = false;
let hasMoreCollections = true;
let currentUser = null;

// Initialize collections page
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedCollections();
    loadCollections();
    
    // Check authentication
    checkAuthStatus();
    
    // Initialize theme
    initTheme();
    
    // Initialize Google Sign-In
    setTimeout(initGoogleSignIn, 500);
});

// Theme functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Dropdown functionality
function toggleGameDropdown() {
    const dropdown = document.getElementById('gameDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-dropdown')) {
        const gameDropdown = document.getElementById('gameDropdown');
        if (gameDropdown) gameDropdown.classList.remove('show');
    }
    if (!e.target.closest('.user-profile-dropdown')) {
        const userDropdown = document.getElementById('userDropdown');
        if (userDropdown) userDropdown.classList.remove('show');
    }
});

// Authentication functions
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

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

// Initialize Google Sign-In
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
        // Send credential to backend to get a proper JWT token
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ credential: response.credential })
        });
        
        const data = await res.json();
        console.log('Google auth response:', data);
        
        if (!res.ok) {
            throw new Error(data.message || 'Authentication failed');
        }
        
        // Store the JWT token and user info
        console.log('Storing token:', data.token);
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
        console.error('Error processing Google response:', error);
        showMessage('Login failed. Please try again.', 'error');
    }
}

function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : type === 'error' ? '#ff6b6b' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

function showOrders() {
    showMessage('Orders feature coming soon!', 'info');
}

function showSettings() {
    showMessage('Settings feature coming soon!', 'info');
}

function updateUserNavigation() {
    const navAuth = document.getElementById('navAuth');
    const navUser = document.getElementById('navUser');
    
    if (currentUser) {
        if (navAuth) navAuth.style.display = 'none';
        if (navUser) navUser.style.display = 'flex';
        
        const usernameEl = document.getElementById('username');
        const avatarEl = document.getElementById('userAvatar');
        
        if (usernameEl) usernameEl.textContent = currentUser.name;
        if (avatarEl && currentUser.picture) avatarEl.src = currentUser.picture;
    } else {
        if (navUser) navUser.style.display = 'none';
        if (navAuth) navAuth.style.display = 'flex';
    }
}

// Load featured collections
async function loadFeaturedCollections() {
    try {
        const response = await fetch('/api/collections/featured');
        const collections = await response.json();
        
        const container = document.getElementById('featuredCollections');
        container.innerHTML = collections.map(collection => createCollectionCard(collection, true)).join('');
    } catch (error) {
        console.error('Error loading featured collections:', error);
    }
}

// Load collections with filters
async function loadCollections(reset = false) {
    if (isLoading) return;
    
    if (reset) {
        currentPage = 1;
        hasMoreCollections = true;
        document.getElementById('collectionsGrid').innerHTML = '';
    }
    
    if (!hasMoreCollections) return;
    
    isLoading = true;
    
    try {
        const searchTerm = document.getElementById('collectionSearch')?.value || '';
        const game = document.getElementById('gameFilter')?.value || '';
        const category = document.getElementById('categoryFilter')?.value || '';
        const sort = document.getElementById('sortFilter')?.value || 'newest';
        
        const params = new URLSearchParams({
            page: currentPage,
            limit: 12,
            sort
        });
        
        if (searchTerm) params.append('search', searchTerm);
        if (game) params.append('game', game);
        if (category) params.append('category', category);
        
        const response = await fetch(`/api/collections?${params}`);
        const data = await response.json();
        
        const container = document.getElementById('collectionsGrid');
        
        if (reset) {
            container.innerHTML = '';
        }
        
        if (data.collections && data.collections.length > 0) {
            const collectionsHTML = data.collections.map(collection => createCollectionCard(collection)).join('');
            container.innerHTML += collectionsHTML;
            
            currentPage++;
            hasMoreCollections = currentPage <= data.pagination.pages;
            
            // Show/hide load more button
            const loadMoreBtn = document.getElementById('loadMoreCollections');
            if (loadMoreBtn) {
                loadMoreBtn.style.display = hasMoreCollections ? 'block' : 'none';
            }
        } else if (reset) {
            container.innerHTML = '<div class="no-results">No collections found matching your criteria.</div>';
        }
        
    } catch (error) {
        console.error('Error loading collections:', error);
        if (reset) {
            document.getElementById('collectionsGrid').innerHTML = '<div class="error-message">Failed to load collections. Please try again.</div>';
        }
    } finally {
        isLoading = false;
    }
}

// Create collection card HTML
function createCollectionCard(collection, isFeatured = false) {
    const modCount = collection.mods ? collection.mods.length : 0;
    const previewMods = collection.mods ? collection.mods.slice(0, 3) : [];
    
    return `
        <div class="collection-card ${isFeatured ? 'featured' : ''}" onclick="viewCollection('${collection._id}')">
            <div class="collection-header">
                <img src="${collection.coverImage || '/images/default-collection.jpg'}" alt="${collection.name}" class="collection-cover">
                <div class="collection-overlay">
                    <div class="collection-stats">
                        <span><i class="fas fa-download"></i> ${collection.downloads || 0}</span>
                        <span><i class="fas fa-heart"></i> ${collection.likeCount || 0}</span>
                        <span><i class="fas fa-star"></i> ${(collection.rating?.average || 0).toFixed(1)}</span>
                    </div>
                </div>
            </div>
            
            <div class="collection-content">
                <h3 class="collection-title">${collection.name}</h3>
                <p class="collection-description">${collection.description || 'No description available'}</p>
                
                <div class="collection-meta">
                    <span class="collection-game">${collection.gameTitle}</span>
                    <span class="collection-category">${collection.category}</span>
                </div>
                
                <div class="collection-mods-preview">
                    <span class="mod-count">${modCount} mods</span>
                    <div class="mod-previews">
                        ${previewMods.map(mod => `
                            <img src="${mod.modId?.images?.[0] || '/images/default-mod.jpg'}" 
                                 alt="${mod.modId?.title || 'Mod'}" 
                                 class="mod-preview-img">
                        `).join('')}
                        ${modCount > 3 ? `<span class="more-mods">+${modCount - 3}</span>` : ''}
                    </div>
                </div>
                
                <div class="collection-footer">
                    <div class="collection-author">
                        <i class="fas fa-user"></i>
                        <span>by ${collection.creatorName}</span>
                    </div>
                    <div class="collection-date">
                        ${new Date(collection.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// View collection details
async function viewCollection(collectionId) {
    try {
        const response = await fetch(`/api/collections/${collectionId}`);
        const collection = await response.json();
        
        if (!response.ok) {
            throw new Error(collection.error || 'Failed to load collection');
        }
        
        showCollectionModal(collection);
    } catch (error) {
        console.error('Error loading collection:', error);
        alert('Failed to load collection details');
    }
}

// Show collection modal
function showCollectionModal(collection) {
    const modal = document.getElementById('collectionModal');
    const details = document.getElementById('collectionDetails');
    
    const modsList = collection.mods.map(mod => `
        <div class="collection-mod-item" onclick="viewMod('${mod.modId._id}')">
            <img src="${mod.modId.images[0]}" alt="${mod.modId.title}" class="mod-thumbnail">
            <div class="mod-info">
                <h4>${mod.modId.title}</h4>
                <p>${mod.modId.shortDescription}</p>
                <div class="mod-meta">
                    <span class="mod-category">${mod.modId.category}</span>
                    <span class="mod-price">${mod.modId.isFree ? 'Free' : '$' + mod.modId.price}</span>
                </div>
                ${mod.note ? `<p class="mod-note"><i class="fas fa-sticky-note"></i> ${mod.note}</p>` : ''}
            </div>
        </div>
    `).join('');
    
    details.innerHTML = `
        <div class="collection-detail-header">
            <img src="${collection.coverImage || '/images/default-collection.jpg'}" alt="${collection.name}" class="collection-detail-cover">
            <div class="collection-detail-info">
                <h2>${collection.name}</h2>
                <p class="collection-detail-description">${collection.description || 'No description available'}</p>
                
                <div class="collection-detail-meta">
                    <div class="meta-item">
                        <i class="fas fa-gamepad"></i>
                        <span>${collection.gameTitle}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-tag"></i>
                        <span>${collection.category}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-user"></i>
                        <span>by ${collection.creatorName}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${new Date(collection.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                
                <div class="collection-detail-stats">
                    <div class="stat-item">
                        <i class="fas fa-download"></i>
                        <span>${collection.downloads || 0} downloads</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-heart"></i>
                        <span>${collection.likeCount || 0} likes</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-star"></i>
                        <span>${(collection.rating?.average || 0).toFixed(1)} rating</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-puzzle-piece"></i>
                        <span>${collection.mods.length} mods</span>
                    </div>
                </div>
                
                <div class="collection-actions">
                    <button onclick="downloadCollection('${collection._id}')" class="btn btn-primary">
                        <i class="fas fa-download"></i> Download Collection
                    </button>
                    <button onclick="likeCollection('${collection._id}')" class="btn btn-outline" id="likeBtn-${collection._id}">
                        <i class="fas fa-heart"></i> Like
                    </button>
                </div>
            </div>
        </div>
        
        <div class="collection-mods">
            <h3>Mods in this Collection (${collection.mods.length})</h3>
            <div class="collection-mods-list">
                ${modsList}
            </div>
        </div>
        
        ${collection.installOrder && collection.installOrder.length > 0 ? `
            <div class="collection-install-guide">
                <h3>Installation Order</h3>
                <div class="install-steps">
                    ${collection.installOrder.map((step, index) => `
                        <div class="install-step">
                            <div class="step-number">${index + 1}</div>
                            <div class="step-content">
                                <h4>${step.modId.title}</h4>
                                ${step.instructions ? `<p>${step.instructions}</p>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;
    
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Close collection modal
function closeCollectionModal() {
    const modal = document.getElementById('collectionModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

// Show create collection modal
function showCreateCollection() {
    if (!isAuthenticated()) {
        showLogin();
        return;
    }
    
    const modal = document.getElementById('createCollectionModal');
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Close create collection modal
function closeCreateCollectionModal() {
    const modal = document.getElementById('createCollectionModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('createCollectionForm').reset();
        }, 300);
    }
}

// Create new collection
async function createCollection(event) {
    event.preventDefault();
    
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    
    const formData = {
        name: document.getElementById('collectionName').value,
        description: document.getElementById('collectionDescription').value,
        gameTitle: document.getElementById('collectionGame').value,
        category: document.getElementById('collectionCategory').value,
        tags: document.getElementById('collectionTags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
        isPublic: document.getElementById('collectionPublic').checked
    };
    
    try {
        const response = await fetch('/api/collections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert('Collection created successfully!');
            closeCreateCollectionModal();
            loadCollections(true); // Reload collections
        } else {
            throw new Error(result.error || 'Failed to create collection');
        }
    } catch (error) {
        console.error('Error creating collection:', error);
        alert('Failed to create collection: ' + error.message);
    }
}

// Filter functions
function searchCollections() {
    loadCollections(true);
}

function filterCollections() {
    loadCollections(true);
}

function loadMoreCollections() {
    loadCollections(false);
}

// Like collection
async function likeCollection(collectionId) {
    if (!isAuthenticated()) {
        alert('Please log in to like collections');
        return;
    }
    
    try {
        const response = await fetch(`/api/collections/${collectionId}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const result = await response.json();
        
        if (response.ok) {
            const btn = document.getElementById(`likeBtn-${collectionId}`);
            if (btn) {
                btn.innerHTML = result.liked ? 
                    '<i class="fas fa-heart"></i> Liked' : 
                    '<i class="fas fa-heart"></i> Like';
                btn.classList.toggle('liked', result.liked);
            }
        }
    } catch (error) {
        console.error('Error liking collection:', error);
    }
}

// Download collection
async function downloadCollection(collectionId) {
    try {
        const response = await fetch(`/api/collections/${collectionId}`);
        const collection = await response.json();
        
        if (response.ok) {
            // Increment download count
            await fetch(`/api/collections/${collectionId}/download`, {
                method: 'POST'
            });
            
            // Show download instructions
            alert(`Collection "${collection.name}" download started!\n\nThis collection contains ${collection.mods.length} mods. Please download each mod individually from the collection page.`);
        }
    } catch (error) {
        console.error('Error downloading collection:', error);
        alert('Failed to download collection');
    }
}

// Utility functions
function isAuthenticated() {
    return localStorage.getItem('user') !== null;
}

function checkAuthStatus() {
    const userData = localStorage.getItem('user');
    const navAuth = document.getElementById('navAuth');
    const navUser = document.getElementById('navUser');
    
    if (userData) {
        try {
            currentUser = JSON.parse(userData);
            if (navAuth) navAuth.style.display = 'none';
            if (navUser) navUser.style.display = 'flex';
            
            const usernameEl = document.getElementById('username');
            const avatarEl = document.getElementById('userAvatar');
            
            if (usernameEl) usernameEl.textContent = currentUser.name || 'User';
            if (avatarEl && currentUser.picture) avatarEl.src = currentUser.picture;
        } catch (e) {
            console.error('Error parsing user data:', e);
            localStorage.removeItem('user');
        }
    } else {
        if (navAuth) navAuth.style.display = 'flex';
        if (navUser) navUser.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    currentUser = null;
    window.location.href = 'index.html';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const collectionModal = document.getElementById('collectionModal');
    const createModal = document.getElementById('createCollectionModal');
    const authModal = document.getElementById('authModal');
    
    if (event.target === collectionModal) {
        closeCollectionModal();
    }
    if (event.target === createModal) {
        closeCreateCollectionModal();
    }
    if (event.target === authModal) {
        closeAuthModal();
    }
}