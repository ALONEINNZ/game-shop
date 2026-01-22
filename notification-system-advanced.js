// ADVANCED NOTIFICATION SYSTEM
// Real-time notifications with categories, priorities, and smart delivery

class AdvancedNotificationSystem {
    constructor() {
        this.notifications = [];
        this.settings = {
            enabled: true,
            sound: true,
            desktop: true,
            email: false,
            categories: {
                downloads: true,
                updates: true,
                social: true,
                system: true,
                security: true
            },
            quietHours: {
                enabled: false,
                start: '22:00',
                end: '08:00'
            }
        };
        this.queue = [];
        this.isProcessing = false;
        
        this.init();
    }

    init() {
        this.loadSettings();
        this.createNotificationUI();
        this.setupEventHandlers();
        this.requestPermissions();
        this.startNotificationProcessor();
        
        console.log('🔔 Advanced Notification System Initialized');
    }

    loadSettings() {
        const saved = localStorage.getItem('exuscraft_notification_settings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
        
        const savedNotifications = localStorage.getItem('exuscraft_notifications');
        if (savedNotifications) {
            this.notifications = JSON.parse(savedNotifications);
        }
    }

    createNotificationUI() {
        // Create notification bell icon
        const bellIcon = document.createElement('button');
        bellIcon.id = 'notificationBell';
        bellIcon.style.cssText = `
            position: fixed;
            top: 20px;
            right: 150px;
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        bellIcon.innerHTML = '🔔';
        bellIcon.title = 'Notifications';
        
        // Add notification badge
        const badge = document.createElement('div');
        badge.id = 'notificationBadge';
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
        bellIcon.appendChild(badge);
        
        document.body.appendChild(bellIcon);
        
        // Create notification panel
        this.createNotificationPanel();
        
        bellIcon.addEventListener('click', () => {
            this.toggleNotificationPanel();
        });
    }
    createNotificationPanel() {
        const panel = document.createElement('div');
        panel.id = 'notificationPanel';
        panel.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            width: 400px;
            max-height: 600px;
            background: rgba(10, 14, 20, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(91, 140, 255, 0.3);
            border-radius: 20px;
            z-index: 1001;
            display: none;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            transform: translateY(-20px) scale(0.95);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
                <h3 style="margin: 0; color: white; font-size: 1.2rem; font-weight: 600;">Notifications</h3>
                <div style="display: flex; gap: 0.5rem;">
                    <button id="markAllRead" style="
                        background: none;
                        border: 1px solid rgba(91, 140, 255, 0.3);
                        color: #5B8CFF;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 0.8rem;
                    ">Mark All Read</button>
                    <button id="notificationSettings" style="
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 1rem;
                        cursor: pointer;
                        padding: 0.5rem;
                    " title="Settings">⚙️</button>
                </div>
            </div>
            
            <!-- Filter Tabs -->
            <div style="
                display: flex;
                padding: 1rem 1.5rem 0 1.5rem;
                gap: 0.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            ">
                <button class="notification-filter active" data-filter="all" style="
                    background: rgba(91, 140, 255, 0.2);
                    border: 1px solid rgba(91, 140, 255, 0.5);
                    color: #5B8CFF;
                    padding: 0.5rem 1rem;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 0.8rem;
                ">All</button>
                <button class="notification-filter" data-filter="unread" style="
                    background: none;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: rgba(255, 255, 255, 0.7);
                    padding: 0.5rem 1rem;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 0.8rem;
                ">Unread</button>
                <button class="notification-filter" data-filter="important" style="
                    background: none;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: rgba(255, 255, 255, 0.7);
                    padding: 0.5rem 1rem;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 0.8rem;
                ">Important</button>
            </div>
            
            <!-- Notifications List -->
            <div id="notificationsList" style="
                flex: 1;
                overflow-y: auto;
                padding: 1rem 0;
                max-height: 400px;
            ">
                ${this.generateNotificationsHTML()}
            </div>
        `;
        
        document.body.appendChild(panel);
        this.setupNotificationHandlers();
    }

    generateNotificationsHTML() {
        if (this.notifications.length === 0) {
            return `
                <div style="text-align: center; padding: 3rem 2rem; color: rgba(255, 255, 255, 0.6);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🔔</div>
                    <h4 style="margin: 0 0 0.5rem 0; color: rgba(255, 255, 255, 0.8);">No notifications</h4>
                    <p style="margin: 0; font-size: 0.9rem;">You're all caught up!</p>
                </div>
            `;
        }
        
        return this.notifications
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 20)
            .map(notification => this.generateNotificationHTML(notification))
            .join('');
    }

    generateNotificationHTML(notification) {
        const timeAgo = this.getTimeAgo(notification.timestamp);
        const categoryIcons = {
            downloads: '📥',
            updates: '🔄',
            social: '👥',
            system: '⚙️',
            security: '🔒'
        };
        
        return `
            <div class="notification-item ${notification.read ? 'read' : 'unread'}" 
                 data-id="${notification.id}" 
                 data-category="${notification.category}"
                 style="
                padding: 1rem 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                cursor: pointer;
                transition: all 0.3s ease;
                ${!notification.read ? 'background: rgba(91, 140, 255, 0.05);' : ''}
            " onmouseover="this.style.background='rgba(91, 140, 255, 0.1)'" 
               onmouseout="this.style.background='${!notification.read ? 'rgba(91, 140, 255, 0.05)' : 'transparent'}'">
                
                <div style="display: flex; gap: 1rem; align-items: flex-start;">
                    <div style="
                        font-size: 1.5rem;
                        flex-shrink: 0;
                        opacity: ${notification.read ? '0.6' : '1'};
                    ">${categoryIcons[notification.category] || '📢'}</div>
                    
                    <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <h4 style="
                                margin: 0;
                                color: ${notification.read ? 'rgba(255, 255, 255, 0.7)' : 'white'};
                                font-size: 0.9rem;
                                font-weight: 600;
                                flex: 1;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            ">${notification.title}</h4>
                            ${notification.priority === 'high' ? `
                                <span style="
                                    background: #EF4444;
                                    color: white;
                                    padding: 0.1rem 0.4rem;
                                    border-radius: 8px;
                                    font-size: 0.6rem;
                                    font-weight: 600;
                                ">HIGH</span>
                            ` : ''}
                            ${!notification.read ? `
                                <div style="
                                    width: 8px;
                                    height: 8px;
                                    background: #5B8CFF;
                                    border-radius: 50%;
                                "></div>
                            ` : ''}
                        </div>
                        
                        <p style="
                            margin: 0 0 0.75rem 0;
                            color: ${notification.read ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)'};
                            font-size: 0.85rem;
                            line-height: 1.4;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                        ">${notification.message}</p>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="
                                color: rgba(255, 255, 255, 0.5);
                                font-size: 0.7rem;
                            ">${timeAgo}</span>
                            
                            ${notification.actionUrl ? `
                                <button class="notification-action" data-url="${notification.actionUrl}" style="
                                    background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                                    border: none;
                                    color: white;
                                    padding: 0.3rem 0.8rem;
                                    border-radius: 6px;
                                    cursor: pointer;
                                    font-size: 0.7rem;
                                    font-weight: 600;
                                ">${notification.actionText || 'View'}</button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupNotificationHandlers() {
        // Mark all read
        document.getElementById('markAllRead').addEventListener('click', () => {
            this.markAllAsRead();
        });
        
        // Settings
        document.getElementById('notificationSettings').addEventListener('click', () => {
            this.showNotificationSettings();
        });
        
        // Filter tabs
        document.querySelectorAll('.notification-filter').forEach(filter => {
            filter.addEventListener('click', () => {
                const filterType = filter.dataset.filter;
                this.filterNotifications(filterType);
                
                // Update active tab
                document.querySelectorAll('.notification-filter').forEach(f => {
                    f.style.background = 'none';
                    f.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    f.style.color = 'rgba(255, 255, 255, 0.7)';
                });
                filter.style.background = 'rgba(91, 140, 255, 0.2)';
                filter.style.borderColor = 'rgba(91, 140, 255, 0.5)';
                filter.style.color = '#5B8CFF';
            });
        });
        
        // Notification click handlers
        document.addEventListener('click', (e) => {
            const notificationItem = e.target.closest('.notification-item');
            if (notificationItem) {
                const notificationId = notificationItem.dataset.id;
                this.markAsRead(notificationId);
            }
            
            const actionBtn = e.target.closest('.notification-action');
            if (actionBtn) {
                e.stopPropagation();
                const url = actionBtn.dataset.url;
                if (url) {
                    window.open(url, '_blank');
                }
            }
        });
    }

    setupEventHandlers() {
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('notificationPanel');
            const bell = document.getElementById('notificationBell');
            
            if (panel && panel.style.display === 'flex' && 
                !panel.contains(e.target) && !bell.contains(e.target)) {
                this.toggleNotificationPanel();
            }
        });
    }

    toggleNotificationPanel() {
        const panel = document.getElementById('notificationPanel');
        const isVisible = panel.style.display === 'flex';
        
        if (isVisible) {
            panel.style.transform = 'translateY(-20px) scale(0.95)';
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        } else {
            panel.style.display = 'flex';
            setTimeout(() => {
                panel.style.transform = 'translateY(0) scale(1)';
                panel.style.opacity = '1';
            }, 10);
        }
    }

    requestPermissions() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.showNotification({
                        title: 'Notifications Enabled',
                        message: 'You\'ll now receive desktop notifications for important updates!',
                        category: 'system',
                        priority: 'normal'
                    });
                }
            });
        }
    }

    startNotificationProcessor() {
        // Process notification queue every second
        setInterval(() => {
            this.processNotificationQueue();
        }, 1000);
        
        // Generate sample notifications for demo
        setTimeout(() => {
            this.generateSampleNotifications();
        }, 5000);
    }

    processNotificationQueue() {
        if (this.isProcessing || this.queue.length === 0) return;
        
        this.isProcessing = true;
        const notification = this.queue.shift();
        
        // Check if notifications are enabled
        if (!this.settings.enabled) {
            this.isProcessing = false;
            return;
        }
        
        // Check category settings
        if (!this.settings.categories[notification.category]) {
            this.isProcessing = false;
            return;
        }
        
        // Check quiet hours
        if (this.isQuietHours()) {
            // Re-queue for later unless it's high priority
            if (notification.priority !== 'high') {
                this.queue.push(notification);
                this.isProcessing = false;
                return;
            }
        }
        
        this.displayNotification(notification);
        this.isProcessing = false;
    }

    displayNotification(notification) {
        // Add to notifications list
        notification.id = 'notif_' + Date.now();
        notification.timestamp = Date.now();
        notification.read = false;
        
        this.notifications.unshift(notification);
        
        // Limit to 100 notifications
        if (this.notifications.length > 100) {
            this.notifications = this.notifications.slice(0, 100);
        }
        
        // Update UI
        this.updateNotificationBadge();
        this.updateNotificationsList();
        
        // Show desktop notification
        if (this.settings.desktop && Notification.permission === 'granted') {
            new Notification(notification.title, {
                body: notification.message,
                icon: '/favicon.svg',
                tag: notification.id
            });
        }
        
        // Play sound
        if (this.settings.sound) {
            this.playNotificationSound();
        }
        
        // Show toast notification
        this.showToastNotification(notification);
        
        // Save to localStorage
        this.saveNotifications();
    }

    showToastNotification(notification) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            width: 350px;
            background: rgba(10, 14, 20, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(91, 140, 255, 0.3);
            border-radius: 15px;
            padding: 1.5rem;
            z-index: 2000;
            transform: translateX(400px);
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        
        const categoryIcons = {
            downloads: '📥',
            updates: '🔄',
            social: '👥',
            system: '⚙️',
            security: '🔒'
        };
        
        toast.innerHTML = `
            <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <div style="font-size: 1.5rem; flex-shrink: 0;">
                    ${categoryIcons[notification.category] || '📢'}
                </div>
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 0.5rem 0; color: white; font-size: 1rem; font-weight: 600;">
                        ${notification.title}
                    </h4>
                    <p style="margin: 0; color: rgba(255, 255, 255, 0.8); font-size: 0.9rem; line-height: 1.4;">
                        ${notification.message}
                    </p>
                    ${notification.actionUrl ? `
                        <button onclick="window.open('${notification.actionUrl}', '_blank'); this.closest('div').remove();" style="
                            background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                            border: none;
                            color: white;
                            padding: 0.5rem 1rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 0.8rem;
                            font-weight: 600;
                            margin-top: 1rem;
                        ">${notification.actionText || 'View'}</button>
                    ` : ''}
                </div>
                <button onclick="this.closest('div').remove()" style="
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1.2rem;
                    cursor: pointer;
                    flex-shrink: 0;
                ">×</button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 500);
        }, 5000);
    }

    updateNotificationBadge() {
        const badge = document.getElementById('notificationBadge');
        const unreadCount = this.notifications.filter(n => !n.read).length;
        
        if (unreadCount > 0) {
            badge.style.display = 'flex';
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount.toString();
        } else {
            badge.style.display = 'none';
        }
    }

    updateNotificationsList() {
        const list = document.getElementById('notificationsList');
        if (list) {
            list.innerHTML = this.generateNotificationsHTML();
        }
    }

    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification && !notification.read) {
            notification.read = true;
            this.updateNotificationBadge();
            this.updateNotificationsList();
            this.saveNotifications();
        }
    }

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.updateNotificationBadge();
        this.updateNotificationsList();
        this.saveNotifications();
    }

    filterNotifications(filterType) {
        const items = document.querySelectorAll('.notification-item');
        
        items.forEach(item => {
            let show = true;
            
            switch (filterType) {
                case 'unread':
                    show = item.classList.contains('unread');
                    break;
                case 'important':
                    const notification = this.notifications.find(n => n.id === item.dataset.id);
                    show = notification && notification.priority === 'high';
                    break;
                case 'all':
                default:
                    show = true;
                    break;
            }
            
            item.style.display = show ? 'block' : 'none';
        });
    }

    showNotificationSettings() {
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
                border: 1px solid rgba(91, 140, 255, 0.3);
                border-radius: 20px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <h3 style="margin: 0 0 2rem 0; color: white; font-size: 1.5rem;">Notification Settings</h3>
                
                <!-- General Settings -->
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: white; margin: 0 0 1rem 0;">General</h4>
                    
                    <label style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; cursor: pointer;">
                        <input type="checkbox" ${this.settings.enabled ? 'checked' : ''} id="enableNotifications">
                        <span style="color: rgba(255, 255, 255, 0.8);">Enable notifications</span>
                    </label>
                    
                    <label style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; cursor: pointer;">
                        <input type="checkbox" ${this.settings.sound ? 'checked' : ''} id="enableSound">
                        <span style="color: rgba(255, 255, 255, 0.8);">Sound notifications</span>
                    </label>
                    
                    <label style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; cursor: pointer;">
                        <input type="checkbox" ${this.settings.desktop ? 'checked' : ''} id="enableDesktop">
                        <span style="color: rgba(255, 255, 255, 0.8);">Desktop notifications</span>
                    </label>
                </div>
                
                <!-- Categories -->
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: white; margin: 0 0 1rem 0;">Categories</h4>
                    
                    ${Object.entries(this.settings.categories).map(([category, enabled]) => `
                        <label style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; cursor: pointer;">
                            <input type="checkbox" ${enabled ? 'checked' : ''} class="category-setting" data-category="${category}">
                            <span style="color: rgba(255, 255, 255, 0.8); text-transform: capitalize;">${category}</span>
                        </label>
                    `).join('')}
                </div>
                
                <!-- Quiet Hours -->
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: white; margin: 0 0 1rem 0;">Quiet Hours</h4>
                    
                    <label style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; cursor: pointer;">
                        <input type="checkbox" ${this.settings.quietHours.enabled ? 'checked' : ''} id="enableQuietHours">
                        <span style="color: rgba(255, 255, 255, 0.8);">Enable quiet hours</span>
                    </label>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <label style="display: block; color: rgba(255, 255, 255, 0.7); margin-bottom: 0.5rem; font-size: 0.9rem;">Start time</label>
                            <input type="time" value="${this.settings.quietHours.start}" id="quietStart" style="
                                background: rgba(255, 255, 255, 0.1);
                                border: 1px solid rgba(255, 255, 255, 0.2);
                                color: white;
                                padding: 0.5rem;
                                border-radius: 8px;
                                width: 100%;
                            ">
                        </div>
                        <div>
                            <label style="display: block; color: rgba(255, 255, 255, 0.7); margin-bottom: 0.5rem; font-size: 0.9rem;">End time</label>
                            <input type="time" value="${this.settings.quietHours.end}" id="quietEnd" style="
                                background: rgba(255, 255, 255, 0.1);
                                border: 1px solid rgba(255, 255, 255, 0.2);
                                color: white;
                                padding: 0.5rem;
                                border-radius: 8px;
                                width: 100%;
                            ">
                        </div>
                    </div>
                </div>
                
                <!-- Actions -->
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button onclick="this.closest('div').parentElement.remove()" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                    ">Cancel</button>
                    <button id="saveNotificationSettings" style="
                        background: linear-gradient(135deg, #5B8CFF, #C15CFF);
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
        modal.querySelector('#saveNotificationSettings').addEventListener('click', () => {
            this.settings.enabled = modal.querySelector('#enableNotifications').checked;
            this.settings.sound = modal.querySelector('#enableSound').checked;
            this.settings.desktop = modal.querySelector('#enableDesktop').checked;
            this.settings.quietHours.enabled = modal.querySelector('#enableQuietHours').checked;
            this.settings.quietHours.start = modal.querySelector('#quietStart').value;
            this.settings.quietHours.end = modal.querySelector('#quietEnd').value;
            
            // Update category settings
            modal.querySelectorAll('.category-setting').forEach(checkbox => {
                const category = checkbox.dataset.category;
                this.settings.categories[category] = checkbox.checked;
            });
            
            this.saveSettings();
            modal.remove();
            
            this.showNotification({
                title: 'Settings Saved',
                message: 'Your notification preferences have been updated.',
                category: 'system',
                priority: 'normal'
            });
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    isQuietHours() {
        if (!this.settings.quietHours.enabled) return false;
        
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        const [startHour, startMin] = this.settings.quietHours.start.split(':').map(Number);
        const [endHour, endMin] = this.settings.quietHours.end.split(':').map(Number);
        
        const startTime = startHour * 60 + startMin;
        const endTime = endHour * 60 + endMin;
        
        if (startTime <= endTime) {
            return currentTime >= startTime && currentTime <= endTime;
        } else {
            return currentTime >= startTime || currentTime <= endTime;
        }
    }

    playNotificationSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }

    generateSampleNotifications() {
        const sampleNotifications = [
            {
                title: 'New Mod Available',
                message: 'Ultra Graphics Pack v2.0 has been released with improved ray tracing!',
                category: 'updates',
                priority: 'normal',
                actionUrl: '#',
                actionText: 'Download Now'
            },
            {
                title: 'Download Complete',
                message: 'Survival Overhaul mod has been successfully downloaded.',
                category: 'downloads',
                priority: 'normal'
            },
            {
                title: 'Security Alert',
                message: 'New login detected from unknown device. Please verify if this was you.',
                category: 'security',
                priority: 'high',
                actionUrl: '#',
                actionText: 'Review Login'
            }
        ];
        
        sampleNotifications.forEach((notification, index) => {
            setTimeout(() => {
                this.showNotification(notification);
            }, (index + 1) * 3000);
        });
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

    saveNotifications() {
        localStorage.setItem('exuscraft_notifications', JSON.stringify(this.notifications));
    }

    saveSettings() {
        localStorage.setItem('exuscraft_notification_settings', JSON.stringify(this.settings));
    }

    // Public API methods
    showNotification(notification) {
        this.queue.push({
            title: notification.title,
            message: notification.message,
            category: notification.category || 'system',
            priority: notification.priority || 'normal',
            actionUrl: notification.actionUrl,
            actionText: notification.actionText
        });
    }

    clearAllNotifications() {
        this.notifications = [];
        this.updateNotificationBadge();
        this.updateNotificationsList();
        this.saveNotifications();
    }

    getNotifications() {
        return this.notifications;
    }

    getSettings() {
        return this.settings;
    }
}

// Initialize Advanced Notification System
let advancedNotificationSystem;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        advancedNotificationSystem = new AdvancedNotificationSystem();
    });
} else {
    advancedNotificationSystem = new AdvancedNotificationSystem();
}

window.advancedNotificationSystem = advancedNotificationSystem;