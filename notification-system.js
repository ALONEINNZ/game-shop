// REAL-TIME NOTIFICATIONS SYSTEM
// Toast notifications, push notifications, and live updates

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 5;
        this.defaultDuration = 5000;
        this.container = null;
        this.sounds = {};
        this.isEnabled = true;
        
        this.init();
    }

    init() {
        this.createContainer();
        this.loadSounds();
        this.setupEventListeners();
        this.requestNotificationPermission();
        this.startLiveUpdates();
        
        console.log('🔔 Notification System Loaded!');
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 400px;
            pointer-events: none;
        `;
        
        document.body.appendChild(this.container);
        this.addNotificationStyles();
    }

    addNotificationStyles() {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                background: rgba(18, 24, 38, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 12px;
                padding: 1rem 1.5rem;
                color: white;
                font-size: 0.9rem;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                border-left: 4px solid #5B8CFF;
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: auto;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            
            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .notification.success {
                border-left-color: #22C55E;
                background: rgba(34, 197, 94, 0.1);
            }
            
            .notification.warning {
                border-left-color: #FACC15;
                background: rgba(250, 204, 21, 0.1);
            }
            
            .notification.error {
                border-left-color: #EF4444;
                background: rgba(239, 68, 68, 0.1);
            }
            
            .notification.info {
                border-left-color: #3B82F6;
                background: rgba(59, 130, 246, 0.1);
            }
            
            .notification-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.5rem;
            }
            
            .notification-title {
                font-weight: 600;
                font-size: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.6);
                cursor: pointer;
                font-size: 1.2rem;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }
            
            .notification-body {
                color: rgba(255, 255, 255, 0.9);
                line-height: 1.4;
            }
            
            .notification-actions {
                margin-top: 1rem;
                display: flex;
                gap: 0.5rem;
            }
            
            .notification-btn {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 6px;
                font-size: 0.8rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .notification-btn.primary {
                background: #5B8CFF;
                color: white;
            }
            
            .notification-btn.primary:hover {
                background: #4F7AE8;
            }
            
            .notification-btn.secondary {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }
            
            .notification-btn.secondary:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .notification-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, #5B8CFF, #C15CFF);
                transition: width linear;
            }
            
            @keyframes notificationSlide {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes notificationPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
            
            .notification.pulse {
                animation: notificationPulse 0.5s ease-in-out;
            }
            
            @media (max-width: 768px) {
                #notification-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
                
                .notification {
                    font-size: 0.85rem;
                    padding: 0.875rem 1rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    loadSounds() {
        // Create audio objects for different notification types
        this.sounds = {
            success: this.createAudioFromFrequency(800, 0.1, 'sine'),
            error: this.createAudioFromFrequency(300, 0.2, 'square'),
            warning: this.createAudioFromFrequency(600, 0.15, 'triangle'),
            info: this.createAudioFromFrequency(500, 0.1, 'sine')
        };
    }

    createAudioFromFrequency(frequency, duration, type = 'sine') {
        // Create simple notification sounds using Web Audio API
        return () => {
            if (!this.isEnabled) return;
            
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
                oscillator.type = type;
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            } catch (e) {
                console.warn('Audio notification failed:', e);
            }
        };
    }

    setupEventListeners() {
        // Listen for custom notification events
        document.addEventListener('exuscraft:notify', (e) => {
            this.show(e.detail);
        });

        // Listen for system events
        window.addEventListener('online', () => {
            this.show({
                title: 'Connection Restored',
                message: 'You are back online!',
                type: 'success',
                icon: '🌐'
            });
        });

        window.addEventListener('offline', () => {
            this.show({
                title: 'Connection Lost',
                message: 'You are currently offline',
                type: 'warning',
                icon: '📡',
                persistent: true
            });
        });
    }

    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.show({
                        title: 'Notifications Enabled',
                        message: 'You will receive updates about new mods and features',
                        type: 'success',
                        icon: '🔔'
                    });
                }
            });
        }
    }

    startLiveUpdates() {
        // Simulate live updates (in real app, this would be WebSocket/SSE)
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every 30 seconds
                this.simulateLiveUpdate();
            }
        }, 30000);

        // Show welcome notification after delay
        setTimeout(() => {
            this.show({
                title: 'Welcome to ExusCraft!',
                message: 'Discover amazing mods and join our community',
                type: 'info',
                icon: '🎮',
                actions: [
                    {
                        text: 'Browse Mods',
                        action: () => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })
                    }
                ]
            });
        }, 3000);
    }

    simulateLiveUpdate() {
        const updates = [
            {
                title: 'New Mod Available!',
                message: 'Ultra Graphics Pack V3 just released',
                type: 'info',
                icon: '🆕',
                actions: [
                    {
                        text: 'View Mod',
                        action: () => console.log('Navigate to new mod')
                    }
                ]
            },
            {
                title: 'Creator Update',
                message: 'ModMaster123 uploaded 3 new mods',
                type: 'info',
                icon: '👨‍💻'
            },
            {
                title: 'Community Milestone',
                message: '1 million downloads reached!',
                type: 'success',
                icon: '🎉'
            },
            {
                title: 'Weekly Sale',
                message: '50% off premium mods this week',
                type: 'warning',
                icon: '💰'
            }
        ];

        const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
        this.show(randomUpdate);
    }

    show(options) {
        const notification = this.createNotification(options);
        this.addNotification(notification);
        
        // Play sound
        if (this.sounds[options.type]) {
            this.sounds[options.type]();
        }
        
        // Show browser notification if permission granted
        this.showBrowserNotification(options);
        
        return notification.id;
    }

    createNotification(options) {
        const id = 'notification-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        const {
            title = 'Notification',
            message = '',
            type = 'info',
            icon = '',
            duration = this.defaultDuration,
            persistent = false,
            actions = []
        } = options;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.id = id;

        const iconHtml = icon ? `<span style="font-size: 1.2rem; margin-right: 0.5rem;">${icon}</span>` : '';
        
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">
                    ${iconHtml}${title}
                </div>
                <button class="notification-close" onclick="notificationSystem.dismiss('${id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            ${message ? `<div class="notification-body">${message}</div>` : ''}
            ${actions.length > 0 ? `
                <div class="notification-actions">
                    ${actions.map((action, index) => `
                        <button class="notification-btn ${index === 0 ? 'primary' : 'secondary'}" 
                                onclick="notificationSystem.handleAction('${id}', ${index})">
                            ${action.text}
                        </button>
                    `).join('')}
                </div>
            ` : ''}
            ${!persistent ? `<div class="notification-progress" style="width: 100%;"></div>` : ''}
        `;

        // Store actions for later use
        notification._actions = actions;
        notification._persistent = persistent;
        notification._duration = duration;

        // Click to dismiss
        notification.addEventListener('click', (e) => {
            if (!e.target.closest('.notification-btn') && !e.target.closest('.notification-close')) {
                this.dismiss(id);
            }
        });

        return notification;
    }

    addNotification(notification) {
        // Remove oldest notification if at max capacity
        if (this.notifications.length >= this.maxNotifications) {
            const oldest = this.notifications.shift();
            this.removeNotification(oldest.id);
        }

        // Add to container
        this.container.appendChild(notification);
        this.notifications.push(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Auto-dismiss if not persistent
        if (!notification._persistent) {
            this.startProgressBar(notification);
            setTimeout(() => {
                this.dismiss(notification.id);
            }, notification._duration);
        }
    }

    startProgressBar(notification) {
        const progressBar = notification.querySelector('.notification-progress');
        if (progressBar) {
            progressBar.style.transition = `width ${notification._duration}ms linear`;
            setTimeout(() => {
                progressBar.style.width = '0%';
            }, 10);
        }
    }

    dismiss(id) {
        const notification = document.getElementById(id);
        if (notification) {
            notification.classList.remove('show');
            setTimeout(() => {
                this.removeNotification(id);
            }, 300);
        }
    }

    removeNotification(id) {
        const notification = document.getElementById(id);
        if (notification) {
            notification.remove();
            this.notifications = this.notifications.filter(n => n.id !== id);
        }
    }

    handleAction(notificationId, actionIndex) {
        const notification = document.getElementById(notificationId);
        if (notification && notification._actions && notification._actions[actionIndex]) {
            const action = notification._actions[actionIndex];
            if (typeof action.action === 'function') {
                action.action();
            }
            
            // Dismiss notification after action
            this.dismiss(notificationId);
        }
    }

    showBrowserNotification(options) {
        if ('Notification' in window && Notification.permission === 'granted') {
            const browserNotification = new Notification(options.title, {
                body: options.message,
                icon: '/favicon.svg',
                badge: '/favicon.svg',
                tag: 'exuscraft-notification'
            });

            browserNotification.onclick = () => {
                window.focus();
                browserNotification.close();
            };

            // Auto-close after 5 seconds
            setTimeout(() => {
                browserNotification.close();
            }, 5000);
        }
    }

    // Public API methods
    success(title, message, options = {}) {
        return this.show({ ...options, title, message, type: 'success', icon: '✅' });
    }

    error(title, message, options = {}) {
        return this.show({ ...options, title, message, type: 'error', icon: '❌' });
    }

    warning(title, message, options = {}) {
        return this.show({ ...options, title, message, type: 'warning', icon: '⚠️' });
    }

    info(title, message, options = {}) {
        return this.show({ ...options, title, message, type: 'info', icon: 'ℹ️' });
    }

    custom(options) {
        return this.show(options);
    }

    clear() {
        this.notifications.forEach(notification => {
            this.dismiss(notification.id);
        });
    }

    toggle() {
        this.isEnabled = !this.isEnabled;
        
        this.show({
            title: 'Notifications',
            message: `Notifications ${this.isEnabled ? 'enabled' : 'disabled'}`,
            type: this.isEnabled ? 'success' : 'warning',
            icon: this.isEnabled ? '🔔' : '🔕'
        });
    }

    // Utility method to trigger notifications from other scripts
    static notify(options) {
        document.dispatchEvent(new CustomEvent('exuscraft:notify', { detail: options }));
    }
}

// Initialize Notification System
let notificationSystem;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        notificationSystem = new NotificationSystem();
    });
} else {
    notificationSystem = new NotificationSystem();
}

// Make it globally accessible
window.notificationSystem = notificationSystem;
window.NotificationSystem = NotificationSystem;