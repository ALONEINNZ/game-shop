// Jams functionality - v5.0 (MOVED TO HEAD WITH DEFER)
const API_BASE = window.location.origin;
let jams = [];
let currentFilter = 'all';

console.log('🎮 Jams.js loaded - v5.0 - MOVED TO HEAD');
console.log('✅ Script location: HEAD with defer attribute');
console.log('✅ Functions available:', {
    showCreateJamModal: typeof showCreateJamModal,
    showJoinJamModal: typeof showJoinJamModal,
    filterJams: typeof filterJams
});

// Load jams on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Jams page loaded');
    console.log('🔍 Checking window.showCreateJamModal:', typeof window.showCreateJamModal);
    loadJams();
    checkAuth();
});

function checkAuth() {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        window.currentUser = JSON.parse(user);
        console.log('✅ User authenticated:', window.currentUser.username);
    } else {
        window.currentUser = null;
        console.log('❌ User not authenticated');
    }
}

async function loadJams() {
    try {
        const response = await fetch(`${API_BASE}/api/jams`);
        if (!response.ok) throw new Error('Failed to load jams');
        
        jams = await response.json();
        displayJams();
    } catch (error) {
        console.error('Error loading jams:', error);
        showMessage('Failed to load jams', 'error');
    }
}

function displayJams() {
    const grid = document.getElementById('jamsGrid');
    if (!grid) return;
    
    let filteredJams = jams;
    if (currentFilter !== 'all') {
        filteredJams = jams.filter(jam => jam.status === currentFilter);
    }
    
    if (filteredJams.length === 0) {
        grid.innerHTML = `
            <div style="text-align: center; padding: 4rem; grid-column: 1 / -1;">
                <i class="fas fa-trophy" style="font-size: 4rem; color: #5B8CFF; margin-bottom: 1rem;"></i>
                <h3>No jams found</h3>
                <p style="color: rgba(255, 255, 255, 0.6);">Be the first to create one!</p>
                <button onclick="showCreateJamModal()" class="btn btn-primary" style="margin-top: 1rem;">
                    <i class="fas fa-plus"></i> Create Jam
                </button>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredJams.map(jam => {
        const statusColors = {
            'active': '#10B981',
            'upcoming': '#F59E0B',
            'ended': '#6B7280',
            'archived': '#4B5563'
        };
        
        const statusColor = statusColors[jam.status] || '#5B8CFF';
        const daysLeft = jam.endDate ? Math.ceil((new Date(jam.endDate) - new Date()) / (1000 * 60 * 60 * 24)) : null;
        
        return `
            <div class="game-card" onclick="viewJam('${jam.slug || jam.inviteCode}')">
                <div class="game-card-image" style="background: linear-gradient(135deg, #5B8CFF, #C15CFF); position: relative;">
                    ${jam.banner ? `<img src="${jam.banner}" alt="${jam.title}" style="width: 100%; height: 100%; object-fit: cover;">` : `
                        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <i class="fas fa-trophy" style="font-size: 4rem; color: white; opacity: 0.5;"></i>
                        </div>
                    `}
                    <div class="game-card-badge" style="background: ${statusColor};">
                        ${jam.status.toUpperCase()}
                    </div>
                </div>
                <div class="game-card-content">
                    <h3 class="game-card-title">${jam.title}</h3>
                    <p class="game-card-description">${jam.shortDescription || jam.description.substring(0, 100) + '...'}</p>
                    <div class="game-card-meta">
                        <span><i class="fas fa-users"></i> ${jam.stats.totalParticipants} participants</span>
                        <span><i class="fas fa-upload"></i> ${jam.stats.totalSubmissions} submissions</span>
                    </div>
                    ${daysLeft !== null && daysLeft > 0 ? `
                        <div style="margin-top: 1rem; padding: 0.5rem; background: rgba(91, 140, 255, 0.1); border-radius: 8px; text-align: center;">
                            <i class="fas fa-clock"></i> ${daysLeft} days left
                        </div>
                    ` : ''}
                    <div class="game-card-footer">
                        <span style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.6);">
                            by ${jam.creator.username}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterJams(status) {
    currentFilter = status;
    displayJams();
    
    // Update active button
    document.querySelectorAll('.jam-filters .btn').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
    });
    event.target.classList.remove('btn-outline');
    event.target.classList.add('btn-primary');
}

function showCreateJamModal() {
    console.log('🎮 Opening create jam modal...');
    
    if (!window.currentUser) {
        console.log('❌ User not logged in');
        alert('Please login to create a jam');
        // Try to show login modal if it exists
        if (typeof showLogin === 'function') {
            showLogin();
        } else {
            window.location.href = '/';
        }
        return;
    }
    
    console.log('✅ User logged in, showing modal');
    const modal = document.getElementById('createJamModal');
    if (modal) {
        modal.style.display = 'flex';
        console.log('✅ Modal displayed');
    } else {
        console.error('❌ Modal element not found');
    }
}
// Immediately export to window
window.showCreateJamModal = showCreateJamModal;

function closeCreateJamModal() {
    const modal = document.getElementById('createJamModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('createJamForm').reset();
    }
}
// Immediately export to window
window.closeCreateJamModal = closeCreateJamModal;

async function createJam(event) {
    event.preventDefault();
    console.log('🎮 Creating jam...');
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Log form data
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        console.log('📤 Sending request to create jam...');
        const response = await fetch(`${API_BASE}/api/jams/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        console.log('📥 Response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create jam');
        }
        
        const data = await response.json();
        console.log('✅ Jam created:', data);
        
        alert(`✅ Jam created! Invite code: ${data.jam.inviteCode}`);
        closeCreateJamModal();
        
        // Show invite link modal
        showInviteLinkModal(data.jam.inviteCode, data.inviteLink);
        
        // Reload jams
        await loadJams();
    } catch (error) {
        console.error('❌ Error creating jam:', error);
        alert(`Failed to create jam: ${error.message}`);
    }
}

function showInviteLinkModal(inviteCode, inviteLink) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px; text-align: center;">
            <h2 style="margin-bottom: 2rem;"><i class="fas fa-check-circle" style="color: #10B981;"></i> Jam Created!</h2>
            
            <div style="background: rgba(91, 140, 255, 0.1); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
                <p style="margin-bottom: 1rem; color: rgba(255, 255, 255, 0.8);">Share this invite code:</p>
                <div style="font-size: 3rem; font-weight: 700; letter-spacing: 0.5rem; color: #5B8CFF; margin-bottom: 1rem;">
                    ${inviteCode}
                </div>
                <button onclick="copyToClipboard('${inviteCode}')" class="btn btn-outline">
                    <i class="fas fa-copy"></i> Copy Code
                </button>
            </div>
            
            <div style="background: rgba(124, 92, 255, 0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 2rem;">
                <p style="margin-bottom: 1rem; color: rgba(255, 255, 255, 0.8);">Or share this link:</p>
                <input type="text" value="${inviteLink}" readonly style="width: 100%; padding: 0.75rem; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; margin-bottom: 1rem;">
                <button onclick="copyToClipboard('${inviteLink}')" class="btn btn-outline">
                    <i class="fas fa-link"></i> Copy Link
                </button>
            </div>
            
            <button onclick="this.closest('.modal').remove()" class="btn btn-primary btn-large">
                Got it!
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

function showJoinJamModal() {
    console.log('🎮 Opening join jam modal...');
    
    if (!window.currentUser) {
        console.log('❌ User not logged in');
        alert('Please login to join a jam');
        if (typeof showLogin === 'function') {
            showLogin();
        } else {
            window.location.href = '/';
        }
        return;
    }
    
    console.log('✅ User logged in, showing modal');
    const modal = document.getElementById('joinJamModal');
    if (modal) {
        modal.style.display = 'flex';
        console.log('✅ Modal displayed');
    } else {
        console.error('❌ Modal element not found');
    }
}
// Immediately export to window
window.showJoinJamModal = showJoinJamModal;

function closeJoinJamModal() {
    const modal = document.getElementById('joinJamModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('inviteCodeInput').value = '';
    }
}
// Immediately export to window
window.closeJoinJamModal = closeJoinJamModal;

async function joinJam(event) {
    event.preventDefault();
    console.log('🎮 Joining jam...');
    
    const inviteCode = document.getElementById('inviteCodeInput').value.toUpperCase().trim();
    console.log('📝 Invite code:', inviteCode);
    
    if (!inviteCode || inviteCode.length !== 8) {
        alert('Please enter a valid 8-character invite code');
        return;
    }
    
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        console.log('📤 Sending join request...');
        const response = await fetch(`${API_BASE}/api/jams/${inviteCode}/join`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('📥 Response status:', response.status);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to join jam');
        }
        
        const data = await response.json();
        console.log('✅ Joined jam:', data);
        
        alert(`✅ Successfully joined ${data.jam.title}!`);
        closeJoinJamModal();
        
        // Redirect to jam page
        window.location.href = `/jam/${data.jam.slug || data.jam.inviteCode}`;
    } catch (error) {
        console.error('❌ Error joining jam:', error);
        alert(`Failed to join jam: ${error.message}`);
    }
}

function viewJam(identifier) {
    window.location.href = `/jam/${identifier}`;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showMessage('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showMessage('Failed to copy', 'error');
    });
}

// Auto-uppercase invite code input
document.addEventListener('DOMContentLoaded', () => {
    const inviteInput = document.getElementById('inviteCodeInput');
    if (inviteInput) {
        inviteInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
    }
});


// ============================================
// MAKE FUNCTIONS GLOBALLY AVAILABLE
// ============================================
window.showCreateJamModal = showCreateJamModal;
window.closeCreateJamModal = closeCreateJamModal;
window.createJam = createJam;
window.showJoinJamModal = showJoinJamModal;
window.closeJoinJamModal = closeJoinJamModal;
window.joinJam = joinJam;
window.filterJams = filterJams;
window.viewJam = viewJam;
window.copyToClipboard = copyToClipboard;
window.showInviteLinkModal = showInviteLinkModal;
