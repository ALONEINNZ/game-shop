// Downloads Page JavaScript

// Download queue stored in localStorage
let downloads = JSON.parse(localStorage.getItem('exuscraft_downloads') || '[]');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    renderDownloads();
    updateStats();
    
    // Simulate progress for active downloads
    setInterval(updateActiveDownloads, 500);
});

function renderDownloads() {
    const container = document.getElementById('downloadsContainer');
    const emptyState = document.getElementById('downloadsEmpty');
    
    if (downloads.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    }
    
    container.style.display = 'block';
    emptyState.style.display = 'none';
    
    container.innerHTML = downloads.map((dl, index) => `
        <div class="download-item ${dl.status}" data-index="${index}">
            <div class="download-item-image">
                <img src="${dl.image || 'https://via.placeholder.com/80x80/1a1a2e/5B8CFF?text=MOD'}" alt="${dl.name}">
            </div>
            <div class="download-item-info">
                <h4 class="download-item-name">${dl.name}</h4>
                <p class="download-item-game">${dl.game || 'Unknown Game'}</p>
                <div class="download-item-meta">
                    <span><i class="fas fa-file"></i> ${formatSize(dl.size)}</span>
                    <span><i class="fas fa-user"></i> ${dl.author || 'Unknown'}</span>
                </div>
            </div>
            <div class="download-item-progress">
                ${dl.status === 'downloading' ? `
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${dl.progress}%"></div>
                    </div>
                    <div class="progress-details">
                        <span class="progress-percent">${dl.progress}%</span>
                        <span class="progress-speed">${dl.speed || '0'} MB/s</span>
                        <span class="progress-eta">${dl.eta || 'Calculating...'}</span>
                    </div>
                ` : dl.status === 'completed' ? `
                    <div class="download-complete">
                        <i class="fas fa-check-circle"></i>
                        <span>Downloaded</span>
                    </div>
                ` : dl.status === 'paused' ? `
                    <div class="download-paused">
                        <i class="fas fa-pause-circle"></i>
                        <span>Paused - ${dl.progress}%</span>
                    </div>
                ` : `
                    <div class="download-queued">
                        <i class="fas fa-clock"></i>
                        <span>Queued</span>
                    </div>
                `}
            </div>
            <div class="download-item-actions">
                ${dl.status === 'downloading' ? `
                    <button class="btn-icon" onclick="pauseDownload(${index})" title="Pause">
                        <i class="fas fa-pause"></i>
                    </button>
                ` : dl.status === 'paused' ? `
                    <button class="btn-icon" onclick="resumeDownload(${index})" title="Resume">
                        <i class="fas fa-play"></i>
                    </button>
                ` : dl.status === 'completed' ? `
                    <button class="btn-icon success" onclick="openFile(${index})" title="Open">
                        <i class="fas fa-folder-open"></i>
                    </button>
                ` : `
                    <button class="btn-icon" onclick="startDownload(${index})" title="Start">
                        <i class="fas fa-play"></i>
                    </button>
                `}
                <button class="btn-icon danger" onclick="removeDownload(${index})" title="Remove">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const active = downloads.filter(d => d.status === 'downloading').length;
    const completed = downloads.filter(d => d.status === 'completed').length;
    const totalSize = downloads.reduce((sum, d) => sum + (d.size || 0), 0);
    
    document.getElementById('activeDownloads').textContent = active;
    document.getElementById('completedDownloads').textContent = completed;
    document.getElementById('totalSize').textContent = formatSize(totalSize);
}

function updateActiveDownloads() {
    let updated = false;
    
    downloads.forEach((dl, index) => {
        if (dl.status === 'downloading') {
            dl.progress = Math.min(100, dl.progress + Math.random() * 3);
            dl.speed = (Math.random() * 5 + 2).toFixed(1);
            
            const remaining = ((100 - dl.progress) / 100) * dl.size;
            const eta = remaining / (parseFloat(dl.speed) * 1024 * 1024);
            dl.eta = formatTime(eta);
            
            if (dl.progress >= 100) {
                dl.status = 'completed';
                dl.progress = 100;
                triggerRealDownload(dl);
            }
            updated = true;
        }
    });
    
    if (updated) {
        saveDownloads();
        renderDownloads();
        updateStats();
    }
}

function addToDownloads(mod) {
    const existing = downloads.find(d => d.id === mod.id);
    if (existing) {
        showNotification('Already in downloads', 'warning');
        return;
    }
    
    downloads.unshift({
        id: mod.id || Date.now(),
        name: mod.name || mod.title,
        game: mod.game,
        author: mod.author,
        image: mod.image,
        size: mod.fileSize || Math.floor(Math.random() * 500 + 50) * 1024 * 1024,
        status: 'downloading',
        progress: 0,
        speed: '0',
        eta: 'Starting...',
        addedAt: new Date().toISOString()
    });
    
    saveDownloads();
    showNotification(`${mod.name || mod.title} added to downloads`, 'success');
}

function startDownload(index) {
    downloads[index].status = 'downloading';
    downloads[index].progress = downloads[index].progress || 0;
    saveDownloads();
    renderDownloads();
}

function pauseDownload(index) {
    downloads[index].status = 'paused';
    saveDownloads();
    renderDownloads();
}

function resumeDownload(index) {
    downloads[index].status = 'downloading';
    saveDownloads();
    renderDownloads();
}

function removeDownload(index) {
    downloads.splice(index, 1);
    saveDownloads();
    renderDownloads();
    updateStats();
}

function clearCompletedDownloads() {
    downloads = downloads.filter(d => d.status !== 'completed');
    saveDownloads();
    renderDownloads();
    updateStats();
    showNotification('Completed downloads cleared', 'success');
}

function openFile(index) {
    const dl = downloads[index];
    showNotification(`Opening ${dl.name}...`, 'info');
}

function triggerRealDownload(dl) {
    // Create actual file download
    const content = `ExusCraft Mod: ${dl.name}\nGame: ${dl.game}\nAuthor: ${dl.author}\n\nThank you for downloading from ExusCraft!`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dl.name.replace(/[^a-z0-9]/gi, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`${dl.name} downloaded!`, 'success');
}

function saveDownloads() {
    localStorage.setItem('exuscraft_downloads', JSON.stringify(downloads));
}

function formatSize(bytes) {
    if (!bytes) return '0 MB';
    const mb = bytes / (1024 * 1024);
    if (mb >= 1024) return (mb / 1024).toFixed(1) + ' GB';
    return mb.toFixed(1) + ' MB';
}

function formatTime(seconds) {
    if (!seconds || seconds < 0) return '0s';
    if (seconds < 60) return Math.round(seconds) + 's';
    if (seconds < 3600) return Math.round(seconds / 60) + 'm';
    return Math.round(seconds / 3600) + 'h';
}

function showNotification(message, type = 'info') {
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        console.log(`[${type}] ${message}`);
    }
}

// Expose addToDownloads globally for app.js
window.addToDownloads = addToDownloads;
