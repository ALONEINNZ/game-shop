// REAL-TIME MOD UPDATES SYSTEM
// Automatic update checking, version management, and seamless updates

class ModUpdatesSystem {
    constructor() {
        this.installedMods = {};
        this.availableUpdates = {};
        this.updateQueue = [];
        this.autoUpdateEnabled = true;
        this.updateSettings = {
            checkInterval: 3600000, // 1 hour
            autoDownload: false,
            notifyUpdates: true,
            backupBeforeUpdate: true
        };
        this.updateHistory = [];
        
        this.init();
    }

    init() {
        this.loadInstalledMods();
        this.loadUpdateSettings();
        this.createUpdateUI();
        this.startUpdateChecker();
        this.setupEventHandlers();
        
        console.log('🔄 Mod Updates System Initialized');
    }

    loadInstalledMods() {
        const saved = localStorage.getItem('exuscraft_installed_mods');
        if (saved) {
            this.installedMods = JSON.parse(saved);
        } else {
            // Sample installed mods
            this.installedMods = {
                'ultra-graphics': {
                    id: 'ultra-graphics',
                    name: 'Ultra Graphics Pack',
                    version: '2.0.1',
                    installedDate: Date.now() - 86400000 * 7,
                    autoUpdate: true,
                    game: 'Cyberpunk 2077'
                },
                'survival-mod': {
                    id: 'survival-mod',
                    name: 'Survival Overhaul',
                    version: '1.5.2',
                    installedDate: Date.now() - 86400000 * 14,
                    autoUpdate: false,
                    game: 'Skyrim'
                }
            };
        }
    }

    loadUpdateSettings() {
        const saved = localStorage.getItem('exuscraft_update_settings');
        if (saved) {
            this.updateSettings = { ...this.updateSettings, ...JSON.parse(saved) };
        }
    }

    createUpdateUI() {
        // Create floating update button
        const updateBtn = document.createElement('button');
        updateBtn.id = 'modUpdatesBtn';
        updateBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #F59E0B, #D97706);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
            transition: all 0.3s ease;
        `;
        updateBtn.innerHTML = '🔄';
        updateBtn.title = 'Mod Updates';
        
        // Add update badge
        const badge = document.createElement('div');
        badge.id = 'updateBadge';
        badge.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            width: 20px;
            height: 20px;
            background: #EF4444;
            border-radius: 50%;
            color: white;
            font-size: 0.7rem;
            font-weight: 600;
            display: none;
            align-items: center;
            justify-content: center;
            animation: pulse 2s ease-in-out infinite;
        `;
        updateBtn.appendChild(badge);
        
        document.body.appendChild(updateBtn);
        
        updateBtn.addEventListener('click', () => {
            this.showUpdatesPanel();
        });
        
        this.createUpdatesPanel();
    }
    createUpdatesPanel() {
        const panel = document.createElement('div');
        panel.id = 'updatesPanel';
        panel.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 20px;
            width: 400px;
            max-height: 600px;
            background: rgba(10, 14, 20, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(245, 158, 11, 0.3);
            border-radius: 20px;
            z-index: 1001;
            display: none;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            transform: translateY(20px) scale(0.95);
            opacity: 0;
            transition: all 0.3s ease;
        `;
        
        panel.innerHTML = `
            <!-- Header -->
            <div style="
                padding: 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
            ">
                <h3 style="margin: 0; color: white; font-size: 1.2rem; font-weight: 600;">Mod Updates</h3>
                <div style="display: flex; gap: 0.5rem;">
                    <button id="checkUpdatesBtn" style="
                        background: linear-gradient(135deg, #F59E0B, #D97706);
                        border: none;
                        color: white;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 0.8rem;
                        font-weight: 600;
                    ">Check Now</button>
                    <button id="updateSettingsBtn" style="
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 1rem;
                        cursor: pointer;
                        padding: 0.5rem;
                    " title="Settings">⚙️</button>
                </div>
            </div>
            
            <!-- Update Status -->
            <div id="updateStatus" style="
                padding: 1rem 1.5rem;
                background: rgba(34, 197, 94, 0.1);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                color: #22C55E;
                font-size: 0.9rem;
                display: none;
            ">
                <i class="fas fa-check-circle"></i> All mods are up to date
            </div>
            
            <!-- Available Updates -->
            <div id="availableUpdates" style="
                flex: 1;
                overflow-y: auto;
                padding: 1rem 0;
                max-height: 400px;
            ">
                ${this.generateUpdatesHTML()}
            </div>
            
            <!-- Update All Button -->
            <div id="updateAllContainer" style="
                padding: 1rem 1.5rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                display: none;
            ">
                <button id="updateAllBtn" style="
                    background: linear-gradient(135deg, #10B981, #059669);
                    border: none;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    width: 100%;
                ">Update All Mods</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.setupUpdateHandlers();
    }

    generateUpdatesHTML() {
        const updates = Object.values(this.availableUpdates);
        
        if (updates.length === 0) {
            return `
                <div style="text-align: center; padding: 3rem 2rem; color: rgba(255, 255, 255, 0.6);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                    <h4 style="margin: 0 0 0.5rem 0; color: rgba(255, 255, 255, 0.8);">All up to date!</h4>
                    <p style="margin: 0; font-size: 0.9rem;">Your mods are running the latest versions.</p>
                </div>
            `;
        }
        
        return updates.map(update => this.generateUpdateItemHTML(update)).join('');
    }

    generateUpdateItemHTML(update) {
        return `
            <div class="update-item" data-mod-id="${update.id}" style="
                padding: 1rem 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                transition: background 0.3s ease;
            " onmouseover="this.style.background='rgba(245, 158, 11, 0.1)'"
               onmouseout="this.style.background='transparent'">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 0.25rem 0; color: white; font-size: 1rem; font-weight: 600;">
                            ${update.name}
                        </h4>
                        <p style="margin: 0 0 0.5rem 0; color: rgba(255, 255, 255, 0.7); font-size: 0.8rem;">
                            ${update.game}
                        </p>
                        <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.8rem;">
                            <span style="color: rgba(255, 255, 255, 0.6);">
                                Current: v${update.currentVersion}
                            </span>
                            <span style="color: #F59E0B; font-weight: 600;">
                                → v${update.newVersion}
                            </span>
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-end;">
                        <span style="
                            background: ${update.priority === 'critical' ? '#EF4444' : update.priority === 'important' ? '#F59E0B' : '#10B981'};
                            color: white;
                            padding: 0.2rem 0.6rem;
                            border-radius: 12px;
                            font-size: 0.7rem;
                            font-weight: 600;
                            text-transform: uppercase;
                        ">${update.priority}</span>
                        
                        <button onclick="modUpdatesSystem.updateMod('${update.id}')" style="
                            background: linear-gradient(135deg, #10B981, #059669);
                            border: none;
                            color: white;
                            padding: 0.5rem 1rem;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 0.8rem;
                            font-weight: 600;
                        ">Update</button>
                    </div>
                </div>
                
                <!-- Changelog -->
                ${update.changelog ? `
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 8px;
                        padding: 0.75rem;
                        margin-bottom: 0.75rem;
                    ">
                        <h5 style="margin: 0 0 0.5rem 0; color: white; font-size: 0.8rem; font-weight: 600;">
                            What's New:
                        </h5>
                        <ul style="margin: 0; padding-left: 1rem; color: rgba(255, 255, 255, 0.8); font-size: 0.8rem; line-height: 1.4;">
                            ${update.changelog.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <!-- Update Info -->
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.7rem; color: rgba(255, 255, 255, 0.5);">
                    <span>Size: ${update.size}</span>
                    <span>Released: ${this.getTimeAgo(update.releaseDate)}</span>
                </div>
            </div>
        `;
    }

    setupUpdateHandlers() {
        // Check updates button
        document.getElementById('checkUpdatesBtn').addEventListener('click', () => {
            this.checkForUpdates(true);
        });
        
        // Settings button
        document.getElementById('updateSettingsBtn').addEventListener('click', () => {
            this.showUpdateSettings();
        });
        
        // Update all button
        document.getElementById('updateAllBtn').addEventListener('click', () => {
            this.updateAllMods();
        });
    }

    setupEventHandlers() {
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('updatesPanel');
            const btn = document.getElementById('modUpdatesBtn');
            
            if (panel && panel.style.display === 'flex' && 
                !panel.contains(e.target) && !btn.contains(e.target)) {
                this.hideUpdatesPanel();
            }
        });
    }

    startUpdateChecker() {
        // Initial check
        setTimeout(() => {
            this.checkForUpdates();
        }, 5000);
        
        // Periodic checks
        setInterval(() => {
            this.checkForUpdates();
        }, this.updateSettings.checkInterval);
    }

    checkForUpdates(manual = false) {
        if (manual) {
            this.showCheckingStatus();
        }
        
        // Simulate checking for updates
        setTimeout(() => {
            this.simulateAvailableUpdates();
            this.updateUI();
            
            if (manual) {
                this.hideCheckingStatus();
                this.showNotification('Update check complete!');
            }
        }, manual ? 2000 : 100);
    }

    simulateAvailableUpdates() {
        // Simulate some available updates
        this.availableUpdates = {};
        
        // Random chance for updates
        Object.values(this.installedMods).forEach(mod => {
            if (Math.random() < 0.3) { // 30% chance of update
                this.availableUpdates[mod.id] = {
                    id: mod.id,
                    name: mod.name,
                    game: mod.game,
                    currentVersion: mod.version,
                    newVersion: this.generateNewVersion(mod.version),
                    priority: this.getRandomPriority(),
                    size: this.getRandomSize(),
                    releaseDate: Date.now() - Math.random() * 86400000 * 7,
                    changelog: this.generateChangelog()
                };
            }
        });
    }

    generateNewVersion(currentVersion) {
        const parts = currentVersion.split('.');
        const patch = parseInt(parts[2]) + Math.floor(Math.random() * 3) + 1;
        return `${parts[0]}.${parts[1]}.${patch}`;
    }

    getRandomPriority() {
        const priorities = ['minor', 'important', 'critical'];
        return priorities[Math.floor(Math.random() * priorities.length)];
    }

    getRandomSize() {
        const sizes = ['2.5 MB', '15.3 MB', '45.7 MB', '128.9 MB', '256.2 MB'];
        return sizes[Math.floor(Math.random() * sizes.length)];
    }

    generateChangelog() {
        const changes = [
            'Fixed compatibility issues with latest game version',
            'Improved performance and reduced memory usage',
            'Added new customization options',
            'Fixed critical bug causing crashes',
            'Enhanced graphics quality and effects',
            'Updated for better mod compatibility',
            'Added user-requested features',
            'Security improvements and bug fixes'
        ];
        
        const numChanges = Math.floor(Math.random() * 4) + 1;
        return Array.from({ length: numChanges }, () => 
            changes[Math.floor(Math.random() * changes.length)]
        );
    }

    updateUI() {
        const updateCount = Object.keys(this.availableUpdates).length;
        const badge = document.getElementById('updateBadge');
        const panel = document.getElementById('updatesPanel');
        
        // Update badge
        if (updateCount > 0) {
            badge.style.display = 'flex';
            badge.textContent = updateCount > 99 ? '99+' : updateCount.toString();
        } else {
            badge.style.display = 'none';
        }
        
        // Update panel content
        if (panel) {
            const updatesContainer = document.getElementById('availableUpdates');
            const updateAllContainer = document.getElementById('updateAllContainer');
            const statusContainer = document.getElementById('updateStatus');
            
            updatesContainer.innerHTML = this.generateUpdatesHTML();
            
            if (updateCount > 0) {
                updateAllContainer.style.display = 'block';
                statusContainer.style.display = 'none';
            } else {
                updateAllContainer.style.display = 'none';
                statusContainer.style.display = 'block';
            }
        }
        
        // Send notifications
        if (updateCount > 0 && this.updateSettings.notifyUpdates) {
            this.sendUpdateNotification(updateCount);
        }
    }

    showUpdatesPanel() {
        const panel = document.getElementById('updatesPanel');
        panel.style.display = 'flex';
        setTimeout(() => {
            panel.style.transform = 'translateY(0) scale(1)';
            panel.style.opacity = '1';
        }, 10);
    }

    hideUpdatesPanel() {
        const panel = document.getElementById('updatesPanel');
        panel.style.transform = 'translateY(20px) scale(0.95)';
        panel.style.opacity = '0';
        setTimeout(() => {
            panel.style.display = 'none';
        }, 300);
    }

    updateMod(modId) {
        const update = this.availableUpdates[modId];
        if (!update) return;
        
        this.showUpdateProgress(update);
        
        // Simulate update process
        setTimeout(() => {
            this.completeUpdate(modId);
        }, 3000);
    }

    showUpdateProgress(update) {
        const modal = document.createElement('div');
        modal.id = 'updateProgressModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        modal.innerHTML = `
            <div style="
                background: rgba(10, 14, 20, 0.95);
                border: 1px solid rgba(245, 158, 11, 0.3);
                border-radius: 20px;
                padding: 3rem;
                max-width: 400px;
                width: 90%;
                text-align: center;
            ">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔄</div>
                <h3 style="color: white; margin: 0 0 1rem 0;">Updating ${update.name}</h3>
                <p style="color: rgba(255, 255, 255, 0.7); margin: 0 0 2rem 0;">
                    Downloading v${update.newVersion}...
                </p>
                
                <!-- Progress Bar -->
                <div style="
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    height: 8px;
                    margin-bottom: 1rem;
                    overflow: hidden;
                ">
                    <div id="updateProgressBar" style="
                        background: linear-gradient(90deg, #F59E0B, #D97706);
                        height: 100%;
                        width: 0%;
                        transition: width 0.3s ease;
                        border-radius: 10px;
                    "></div>
                </div>
                
                <div id="updateProgressText" style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">
                    0% complete
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress > 100) progress = 100;
            
            const progressBar = document.getElementById('updateProgressBar');
            const progressText = document.getElementById('updateProgressText');
            
            if (progressBar && progressText) {
                progressBar.style.width = progress + '%';
                progressText.textContent = Math.floor(progress) + '% complete';
            }
            
            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, 200);
    }

    completeUpdate(modId) {
        const update = this.availableUpdates[modId];
        
        // Update installed mod version
        if (this.installedMods[modId]) {
            this.installedMods[modId].version = update.newVersion;
            this.installedMods[modId].lastUpdated = Date.now();
        }
        
        // Remove from available updates
        delete this.availableUpdates[modId];
        
        // Add to update history
        this.updateHistory.unshift({
            modId: modId,
            modName: update.name,
            fromVersion: update.currentVersion,
            toVersion: update.newVersion,
            updateDate: Date.now()
        });
        
        // Save data
        this.saveData();
        
        // Update UI
        this.updateUI();
        
        // Close progress modal
        const modal = document.getElementById('updateProgressModal');
        if (modal) {
            modal.remove();
        }
        
        // Show success notification
        this.showNotification(`${update.name} updated to v${update.newVersion}!`);
    }

    updateAllMods() {
        const updates = Object.values(this.availableUpdates);
        if (updates.length === 0) return;
        
        // Show confirmation
        if (confirm(`Update all ${updates.length} mods?`)) {
            updates.forEach((update, index) => {
                setTimeout(() => {
                    this.updateMod(update.id);
                }, index * 1000);
            });
        }
    }

    showUpdateSettings() {
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
        `;
        
        modal.innerHTML = `
            <div style="
                background: rgba(10, 14, 20, 0.95);
                border: 1px solid rgba(245, 158, 11, 0.3);
                border-radius: 20px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
            ">
                <h3 style="margin: 0 0 2rem 0; color: white; font-size: 1.5rem;">Update Settings</h3>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
                        <input type="checkbox" ${this.updateSettings.autoDownload ? 'checked' : ''} id="autoDownload">
                        <span style="color: rgba(255, 255, 255, 0.8);">Auto-download updates</span>
                    </label>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
                        <input type="checkbox" ${this.updateSettings.notifyUpdates ? 'checked' : ''} id="notifyUpdates">
                        <span style="color: rgba(255, 255, 255, 0.8);">Notify about updates</span>
                    </label>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
                        <input type="checkbox" ${this.updateSettings.backupBeforeUpdate ? 'checked' : ''} id="backupBeforeUpdate">
                        <span style="color: rgba(255, 255, 255, 0.8);">Backup before updating</span>
                    </label>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <label style="display: block; color: rgba(255, 255, 255, 0.8); margin-bottom: 0.5rem;">
                        Check for updates every:
                    </label>
                    <select id="checkInterval" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.5rem;
                        border-radius: 8px;
                        width: 100%;
                    ">
                        <option value="1800000" ${this.updateSettings.checkInterval === 1800000 ? 'selected' : ''}>30 minutes</option>
                        <option value="3600000" ${this.updateSettings.checkInterval === 3600000 ? 'selected' : ''}>1 hour</option>
                        <option value="21600000" ${this.updateSettings.checkInterval === 21600000 ? 'selected' : ''}>6 hours</option>
                        <option value="86400000" ${this.updateSettings.checkInterval === 86400000 ? 'selected' : ''}>24 hours</option>
                    </select>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button onclick="this.closest('div').parentElement.remove()" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                    ">Cancel</button>
                    <button id="saveUpdateSettings" style="
                        background: linear-gradient(135deg, #F59E0B, #D97706);
                        border: none;
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Save Settings</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Save settings handler
        modal.querySelector('#saveUpdateSettings').addEventListener('click', () => {
            this.updateSettings.autoDownload = modal.querySelector('#autoDownload').checked;
            this.updateSettings.notifyUpdates = modal.querySelector('#notifyUpdates').checked;
            this.updateSettings.backupBeforeUpdate = modal.querySelector('#backupBeforeUpdate').checked;
            this.updateSettings.checkInterval = parseInt(modal.querySelector('#checkInterval').value);
            
            this.saveData();
            modal.remove();
            this.showNotification('Update settings saved!');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    showCheckingStatus() {
        const btn = document.getElementById('checkUpdatesBtn');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
            btn.disabled = true;
        }
    }

    hideCheckingStatus() {
        const btn = document.getElementById('checkUpdatesBtn');
        if (btn) {
            btn.innerHTML = 'Check Now';
            btn.disabled = false;
        }
    }

    sendUpdateNotification(count) {
        if (window.advancedNotificationSystem) {
            window.advancedNotificationSystem.showNotification({
                title: 'Mod Updates Available',
                message: `${count} mod${count > 1 ? 's have' : ' has'} updates available`,
                category: 'updates',
                priority: 'normal',
                actionUrl: '#',
                actionText: 'View Updates'
            });
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #F59E0B, #D97706);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
            z-index: 2002;
            transform: translateX(400px);
            transition: transform 0.5s ease;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
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
            }, 500);
        }, 3000);
    }

    getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }

    saveData() {
        localStorage.setItem('exuscraft_installed_mods', JSON.stringify(this.installedMods));
        localStorage.setItem('exuscraft_update_settings', JSON.stringify(this.updateSettings));
        localStorage.setItem('exuscraft_update_history', JSON.stringify(this.updateHistory));
    }

    // Public API methods
    addInstalledMod(modData) {
        this.installedMods[modData.id] = {
            id: modData.id,
            name: modData.name,
            version: modData.version,
            installedDate: Date.now(),
            autoUpdate: true,
            game: modData.game
        };
        this.saveData();
    }

    removeInstalledMod(modId) {
        delete this.installedMods[modId];
        delete this.availableUpdates[modId];
        this.saveData();
        this.updateUI();
    }

    getInstalledMods() {
        return this.installedMods;
    }

    getUpdateHistory() {
        return this.updateHistory;
    }
}

// Initialize Mod Updates System
let modUpdatesSystem;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        modUpdatesSystem = new ModUpdatesSystem();
    });
} else {
    modUpdatesSystem = new ModUpdatesSystem();
}

window.modUpdatesSystem = modUpdatesSystem;