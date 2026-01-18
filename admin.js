// Admin Panel JavaScript
const API_BASE = 'http://localhost:3007/api';
let currentUser = null;
let allMods = [];

// Check authentication on load
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        // Verify user is admin
        const response = await fetch(`${API_BASE}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) {
            throw new Error('Not authenticated');
        }
        
        const data = await response.json();
        currentUser = data.user;
        
        if (currentUser.role !== 'admin') {
            alert('Access denied. Admin privileges required.');
            window.location.href = 'index.html';
            return;
        }
        
        // Load admin data
        await loadAdminData();
    } catch (error) {
        console.error('Auth error:', error);
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    }
});

async function loadAdminData() {
    try {
        const token = localStorage.getItem('token');
        
        // Load all mods
        const modsResponse = await fetch(`${API_BASE}/mods/admin/all`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!modsResponse.ok) throw new Error('Failed to load mods');
        
        allMods = await modsResponse.json();
        
        // Update stats
        updateStats();
        
        // Render tables
        renderTables();
    } catch (error) {
        console.error('Error loading admin data:', error);
        alert('Error loading admin data: ' + error.message);
    }
}

function updateStats() {
    const totalMods = allMods.length;
    const pendingMods = allMods.filter(m => !m.approved).length;
    const approvedMods = allMods.filter(m => m.approved).length;
    
    document.getElementById('totalMods').textContent = totalMods;
    document.getElementById('pendingMods').textContent = pendingMods;
    document.getElementById('approvedMods').textContent = approvedMods;
}

function renderTables() {
    const pending = allMods.filter(m => !m.approved);
    const approved = allMods.filter(m => m.approved);
    
    document.getElementById('pendingModsTable').innerHTML = pending.map(mod => createModRow(mod, true)).join('');
    document.getElementById('approvedModsTable').innerHTML = approved.map(mod => createModRow(mod, false)).join('');
    document.getElementById('allModsTable').innerHTML = allMods.map(mod => createModRow(mod, true)).join('');
}

function createModRow(mod, showApprove) {
    const statusClass = mod.approved ? 'status-approved' : 'status-pending';
    const statusText = mod.approved ? 'Approved' : 'Pending';
    const authorName = mod.authorId?.username || mod.author || 'Unknown';
    
    return `
        <tr>
            <td><img src="${mod.images?.[0] || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'40\'%3E%3Crect fill=\'%23ddd\' width=\'60\' height=\'40\'/%3E%3C/svg%3E'}" alt="${mod.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'60\\' height=\\'40\\'%3E%3Crect fill=\\'%23ddd\\' width=\\'60\\' height=\\'40\\'/%3E%3C/svg%3E'"></td>
            <td><strong>${mod.title}</strong></td>
            <td>${authorName}</td>
            <td>${mod.gameTitle}</td>
            <td>${mod.isFree ? 'FREE' : '$' + mod.price.toFixed(2)}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td class="action-btns">
                ${showApprove && !mod.approved ? `
                    <button class="btn-approve" onclick="approveMod('${mod._id}')" title="Approve"><i class="fas fa-check"></i></button>
                ` : ''}
                <button class="btn-edit" onclick="editMod('${mod._id}')" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="btn-delete" onclick="deleteMod('${mod._id}')" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `;
}

async function approveMod(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/mods/${id}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error('Failed to approve mod');
        
        const data = await response.json();
        alert(`"${data.mod.title}" has been approved!`);
        
        // Reload data
        await loadAdminData();
    } catch (error) {
        console.error('Error approving mod:', error);
        alert('Error approving mod: ' + error.message);
    }
}

async function deleteMod(id) {
    if (!confirm('Are you sure you want to delete this mod? This action cannot be undone.')) {
        return;
    }
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/mods/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Failed to delete mod');
        
        alert('Mod deleted successfully!');
        
        // Reload data
        await loadAdminData();
    } catch (error) {
        console.error('Error deleting mod:', error);
        alert('Error deleting mod: ' + error.message);
    }
}

function editMod(id) {
    const mod = allMods.find(m => m._id === id);
    if (!mod) return;
    
    document.getElementById('editModId').value = mod._id;
    document.getElementById('editTitle').value = mod.title;
    document.getElementById('editPrice').value = mod.price || 0;
    document.getElementById('editCategory').value = mod.category || 'Gameplay';
    document.getElementById('editFeatured').checked = mod.featured || false;
    document.getElementById('editModModal').style.display = 'flex';
}

function closeEditModal() {
    document.getElementById('editModModal').style.display = 'none';
}

async function saveModEdit(e) {
    e.preventDefault();
    
    const id = document.getElementById('editModId').value;
    const price = parseFloat(document.getElementById('editPrice').value) || 0;
    const featured = document.getElementById('editFeatured').checked;
    
    try {
        const token = localStorage.getItem('token');
        
        // Update price
        const priceResponse = await fetch(`${API_BASE}/mods/${id}/price`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price })
        });
        
        if (!priceResponse.ok) throw new Error('Failed to update price');
        
        // Update featured status
        const featuredResponse = await fetch(`${API_BASE}/mods/${id}/feature`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ featured })
        });
        
        if (!featuredResponse.ok) throw new Error('Failed to update featured status');
        
        alert('Mod updated successfully!');
        closeEditModal();
        
        // Reload data
        await loadAdminData();
    } catch (error) {
        console.error('Error updating mod:', error);
        alert('Error updating mod: ' + error.message);
    }
}

function showAdminTab(tab) {
    // Remove active class from all tabs and sections
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Show corresponding section
    document.getElementById(tab + 'Section').classList.add('active');
}

function adminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    }
}
