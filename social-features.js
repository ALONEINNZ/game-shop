// SOCIAL FEATURES SYSTEM - Advanced social networking for gamers
console.log('🌐 Loading Social Features System...');

class SocialFeaturesSystem {
    constructor() {
        this.friends = new Map();
        this.groups = new Map();
        this.activities = [];
        this.socialFeed = [];
        this.init();
    }

    init() {
        this.createSocialInterface();
        this.loadFriends();
        this.loadGroups();
        this.setupRealTimeUpdates();
        console.log('✅ Social Features System initialized');
    }

    createSocialInterface() {
        // Add social navigation to main nav
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const socialNav = document.createElement('div');
            socialNav.className = 'nav-dropdown';
            socialNav.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" onclick="toggleSocialDropdown()">
                    Social <i class="fas fa-chevron-down"></i>
                </a>
                <div class="dropdown-menu" id="socialDropdown">
                    <a href="#" onclick="showFriends()"><i class="fas fa-users"></i> Friends</a>
                    <a href="#" onclick="showGroups()"><i class="fas fa-user-friends"></i> Groups</a>
                    <a href="#" onclick="showActivity()"><i class="fas fa-chart-line"></i> Activity</a>
                    <a href="#" onclick="showLeaderboards()"><i class="fas fa-trophy"></i> Leaderboards</a>
                    <a href="#" onclick="showEvents()"><i class="fas fa-calendar"></i> Events</a>
                </div>
            `;
            navMenu.insertBefore(socialNav, navMenu.children[2]);
        }

        // Create social sidebar
        this.createSocialSidebar();
        
        // Create social modals
        this.createSocialModals();
    }

    createSocialSidebar() {
        const sidebar = document.createElement('div');
        sidebar.id = 'socialSidebar';
        sidebar.className = 'social-sidebar';
        sidebar.innerHTML = `
            <div class="social-sidebar-header">
                <h3><i class="fas fa-users"></i> Social</h3>
                <button onclick="toggleSocialSidebar()" class="close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="social-tabs">
                <button class="social-tab active" onclick="showSocialTab('friends')">
                    <i class="fas fa-user-friends"></i> Friends
                </button>
                <button class="social-tab" onclick="showSocialTab('groups')">
                    <i class="fas fa-users"></i> Groups
                </button>
                <button class="social-tab" onclick="showSocialTab('activity')">
                    <i class="fas fa-chart-line"></i> Activity
                </button>
            </div>
            
            <div class="social-content">
                <div id="friendsTab" class="social-tab-content active">
                    <div class="friends-search">
                        <input type="text" placeholder="Search friends..." onkeyup="searchFriends(this.value)">
                        <button onclick="showAddFriend()" class="btn btn-primary btn-sm">
                            <i class="fas fa-user-plus"></i> Add Friend
                        </button>
                    </div>
                    <div id="friendsList" class="friends-list">
                        <!-- Friends will be loaded here -->
                    </div>
                </div>
                
                <div id="groupsTab" class="social-tab-content">
                    <div class="groups-header">
                        <button onclick="showCreateGroup()" class="btn btn-primary btn-sm">
                            <i class="fas fa-plus"></i> Create Group
                        </button>
                        <button onclick="showJoinGroup()" class="btn btn-outline btn-sm">
                            <i class="fas fa-search"></i> Find Groups
                        </button>
                    </div>
                    <div id="groupsList" class="groups-list">
                        <!-- Groups will be loaded here -->
                    </div>
                </div>
                
                <div id="activityTab" class="social-tab-content">
                    <div class="activity-filters">
                        <select onchange="filterActivity(this.value)">
                            <option value="all">All Activity</option>
                            <option value="downloads">Downloads</option>
                            <option value="reviews">Reviews</option>
                            <option value="uploads">Uploads</option>
                            <option value="achievements">Achievements</option>
                        </select>
                    </div>
                    <div id="activityFeed" class="activity-feed">
                        <!-- Activity feed will be loaded here -->
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(sidebar);
        this.addSocialStyles();
    }

    createSocialModals() {
        // Friend Profile Modal
        const friendModal = document.createElement('div');
        friendModal.id = 'friendProfileModal';
        friendModal.className = 'modal';
        friendModal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <span class="close" onclick="closeFriendProfile()">&times;</span>
                <div id="friendProfileContent"></div>
            </div>
        `;
        document.body.appendChild(friendModal);

        // Group Modal
        const groupModal = document.createElement('div');
        groupModal.id = 'groupModal';
        groupModal.className = 'modal';
        groupModal.innerHTML = `
            <div class="modal-content" style="max-width: 900px;">
                <span class="close" onclick="closeGroupModal()">&times;</span>
                <div id="groupModalContent"></div>
            </div>
        `;
        document.body.appendChild(groupModal);
    }

    loadFriends() {
        // Simulate loading friends data
        const sampleFriends = [
            {
                id: 1,
                username: 'ModMaster2024',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
                status: 'online',
                game: 'Cyberpunk 2077',
                lastSeen: 'now',
                mutualFriends: 12,
                modsCreated: 25,
                achievements: 48
            },
            {
                id: 2,
                username: 'SkyrimLegend',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
                status: 'away',
                game: 'Skyrim',
                lastSeen: '5 minutes ago',
                mutualFriends: 8,
                modsCreated: 42,
                achievements: 67
            },
            {
                id: 3,
                username: 'GTAModder',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                status: 'offline',
                game: 'GTA V',
                lastSeen: '2 hours ago',
                mutualFriends: 15,
                modsCreated: 18,
                achievements: 34
            }
        ];

        sampleFriends.forEach(friend => {
            this.friends.set(friend.id, friend);
        });

        this.renderFriends();
    }

    loadGroups() {
        const sampleGroups = [
            {
                id: 1,
                name: 'Cyberpunk Modders United',
                description: 'The ultimate community for Cyberpunk 2077 modding',
                members: 1247,
                avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop',
                isOwner: false,
                isMember: true,
                activity: 'Very Active'
            },
            {
                id: 2,
                name: 'Skyrim Graphics Masters',
                description: 'Pushing the boundaries of Skyrim visual mods',
                members: 892,
                avatar: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=100&h=100&fit=crop',
                isOwner: true,
                isMember: true,
                activity: 'Active'
            },
            {
                id: 3,
                name: 'Indie Game Modders',
                description: 'Modding community for indie games',
                members: 456,
                avatar: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop',
                isOwner: false,
                isMember: false,
                activity: 'Moderate'
            }
        ];

        sampleGroups.forEach(group => {
            this.groups.set(group.id, group);
        });

        this.renderGroups();
    }

    renderFriends() {
        const friendsList = document.getElementById('friendsList');
        if (!friendsList) return;

        const friendsHTML = Array.from(this.friends.values()).map(friend => `
            <div class="friend-item" onclick="showFriendProfile(${friend.id})">
                <div class="friend-avatar">
                    <img src="${friend.avatar}" alt="${friend.username}">
                    <span class="status-indicator ${friend.status}"></span>
                </div>
                <div class="friend-info">
                    <div class="friend-name">${friend.username}</div>
                    <div class="friend-status">
                        ${friend.status === 'online' ? 
                            `<i class="fas fa-gamepad"></i> Playing ${friend.game}` :
                            `<i class="fas fa-clock"></i> ${friend.lastSeen}`
                        }
                    </div>
                </div>
                <div class="friend-actions">
                    <button onclick="event.stopPropagation(); sendMessage(${friend.id})" class="btn-icon" title="Message">
                        <i class="fas fa-comment"></i>
                    </button>
                    <button onclick="event.stopPropagation(); inviteToGame(${friend.id})" class="btn-icon" title="Invite">
                        <i class="fas fa-gamepad"></i>
                    </button>
                </div>
            </div>
        `).join('');

        friendsList.innerHTML = friendsHTML;
    }

    renderGroups() {
        const groupsList = document.getElementById('groupsList');
        if (!groupsList) return;

        const groupsHTML = Array.from(this.groups.values()).map(group => `
            <div class="group-item" onclick="showGroupDetails(${group.id})">
                <div class="group-avatar">
                    <img src="${group.avatar}" alt="${group.name}">
                    ${group.isOwner ? '<span class="owner-badge"><i class="fas fa-crown"></i></span>' : ''}
                </div>
                <div class="group-info">
                    <div class="group-name">${group.name}</div>
                    <div class="group-meta">
                        <span><i class="fas fa-users"></i> ${group.members} members</span>
                        <span class="activity-${group.activity.toLowerCase().replace(' ', '-')}">${group.activity}</span>
                    </div>
                </div>
                <div class="group-actions">
                    ${group.isMember ? 
                        '<button class="btn btn-outline btn-sm">Joined</button>' :
                        '<button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); joinGroup(' + group.id + ')">Join</button>'
                    }
                </div>
            </div>
        `).join('');

        groupsList.innerHTML = groupsHTML;
    }

    setupRealTimeUpdates() {
        // Simulate real-time activity updates
        setInterval(() => {
            this.generateRandomActivity();
        }, 30000); // Every 30 seconds

        // Initial activity load
        this.loadInitialActivity();
    }

    loadInitialActivity() {
        const activities = [
            {
                id: 1,
                user: 'ModMaster2024',
                action: 'downloaded',
                target: 'Ultra Graphics Overhaul',
                time: '2 minutes ago',
                type: 'download',
                icon: 'fas fa-download'
            },
            {
                id: 2,
                user: 'SkyrimLegend',
                action: 'uploaded',
                target: 'Enhanced Weather System',
                time: '15 minutes ago',
                type: 'upload',
                icon: 'fas fa-upload'
            },
            {
                id: 3,
                user: 'GTAModder',
                action: 'reviewed',
                target: 'Vehicle Pack Deluxe',
                time: '1 hour ago',
                type: 'review',
                icon: 'fas fa-star'
            },
            {
                id: 4,
                user: 'CyberPunkFan',
                action: 'achieved',
                target: 'Master Modder Badge',
                time: '2 hours ago',
                type: 'achievement',
                icon: 'fas fa-trophy'
            }
        ];

        this.activities = activities;
        this.renderActivity();
    }

    generateRandomActivity() {
        const users = ['ModMaster2024', 'SkyrimLegend', 'GTAModder', 'CyberPunkFan', 'MinecraftPro'];
        const actions = [
            { action: 'downloaded', type: 'download', icon: 'fas fa-download' },
            { action: 'uploaded', type: 'upload', icon: 'fas fa-upload' },
            { action: 'reviewed', type: 'review', icon: 'fas fa-star' },
            { action: 'achieved', type: 'achievement', icon: 'fas fa-trophy' }
        ];
        const targets = ['Ultra Graphics Mod', 'Gameplay Overhaul', 'Vehicle Pack', 'Master Badge', 'Sound Enhancement'];

        const randomActivity = {
            id: Date.now(),
            user: users[Math.floor(Math.random() * users.length)],
            ...actions[Math.floor(Math.random() * actions.length)],
            target: targets[Math.floor(Math.random() * targets.length)],
            time: 'just now'
        };

        this.activities.unshift(randomActivity);
        if (this.activities.length > 50) {
            this.activities = this.activities.slice(0, 50);
        }

        this.renderActivity();
    }

    renderActivity() {
        const activityFeed = document.getElementById('activityFeed');
        if (!activityFeed) return;

        const activityHTML = this.activities.map(activity => `
            <div class="activity-item ${activity.type}">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-text">
                        <strong>${activity.user}</strong> ${activity.action} <em>${activity.target}</em>
                    </div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');

        activityFeed.innerHTML = activityHTML;
    }

    addSocialStyles() {
        const styles = `
            <style>
            .social-sidebar {
                position: fixed;
                top: 0;
                right: -400px;
                width: 400px;
                height: 100vh;
                background: var(--bg-primary);
                border-left: 1px solid var(--border-color);
                z-index: 10000;
                transition: right 0.3s ease;
                display: flex;
                flex-direction: column;
            }
            
            .social-sidebar.active {
                right: 0;
            }
            
            .social-sidebar-header {
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .social-tabs {
                display: flex;
                border-bottom: 1px solid var(--border-color);
            }
            
            .social-tab {
                flex: 1;
                padding: 1rem;
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .social-tab.active {
                color: var(--accent-primary);
                background: rgba(91, 140, 255, 0.1);
            }
            
            .social-content {
                flex: 1;
                overflow-y: auto;
            }
            
            .social-tab-content {
                display: none;
                padding: 1rem;
            }
            
            .social-tab-content.active {
                display: block;
            }
            
            .friends-search {
                margin-bottom: 1rem;
            }
            
            .friends-search input {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                background: var(--bg-secondary);
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }
            
            .friend-item, .group-item {
                display: flex;
                align-items: center;
                padding: 1rem;
                border-radius: var(--radius-md);
                margin-bottom: 0.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
                background: var(--bg-secondary);
            }
            
            .friend-item:hover, .group-item:hover {
                background: var(--bg-tertiary);
                transform: translateY(-2px);
            }
            
            .friend-avatar, .group-avatar {
                position: relative;
                margin-right: 1rem;
            }
            
            .friend-avatar img, .group-avatar img {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                object-fit: cover;
            }
            
            .status-indicator {
                position: absolute;
                bottom: 2px;
                right: 2px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 2px solid var(--bg-primary);
            }
            
            .status-indicator.online { background: #10b981; }
            .status-indicator.away { background: #f59e0b; }
            .status-indicator.offline { background: #6b7280; }
            
            .friend-info, .group-info {
                flex: 1;
            }
            
            .friend-name, .group-name {
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 0.25rem;
            }
            
            .friend-status, .group-meta {
                font-size: 0.875rem;
                color: var(--text-secondary);
            }
            
            .friend-actions, .group-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .btn-icon {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border: 1px solid var(--border-color);
                background: var(--bg-secondary);
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .btn-icon:hover {
                background: var(--accent-primary);
                color: white;
            }
            
            .activity-item {
                display: flex;
                align-items: flex-start;
                padding: 1rem;
                border-radius: var(--radius-md);
                margin-bottom: 0.5rem;
                background: var(--bg-secondary);
            }
            
            .activity-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                font-size: 1.1rem;
            }
            
            .activity-item.download .activity-icon { background: rgba(16, 185, 129, 0.2); color: #10b981; }
            .activity-item.upload .activity-icon { background: rgba(91, 140, 255, 0.2); color: #5b8cff; }
            .activity-item.review .activity-icon { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
            .activity-item.achievement .activity-icon { background: rgba(193, 92, 255, 0.2); color: #c15cff; }
            
            .activity-content {
                flex: 1;
            }
            
            .activity-text {
                color: var(--text-primary);
                margin-bottom: 0.25rem;
            }
            
            .activity-time {
                font-size: 0.875rem;
                color: var(--text-secondary);
            }
            
            .owner-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #f59e0b;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.75rem;
            }
            
            .groups-header {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .activity-filters {
                margin-bottom: 1rem;
            }
            
            .activity-filters select {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                background: var(--bg-secondary);
                color: var(--text-primary);
            }
            
            @media (max-width: 768px) {
                .social-sidebar {
                    width: 100%;
                    right: -100%;
                }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Global functions for social features
window.toggleSocialDropdown = function() {
    const dropdown = document.getElementById('socialDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
};

window.toggleSocialSidebar = function() {
    const sidebar = document.getElementById('socialSidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
};

window.showSocialTab = function(tabName) {
    // Hide all tabs
    document.querySelectorAll('.social-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.social-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + 'Tab');
    const selectedButton = document.querySelector(`[onclick="showSocialTab('${tabName}')"]`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedButton) selectedButton.classList.add('active');
};

window.showFriends = function() {
    toggleSocialSidebar();
    showSocialTab('friends');
};

window.showGroups = function() {
    toggleSocialSidebar();
    showSocialTab('groups');
};

window.showActivity = function() {
    toggleSocialSidebar();
    showSocialTab('activity');
};

window.searchFriends = function(query) {
    const friendItems = document.querySelectorAll('.friend-item');
    friendItems.forEach(item => {
        const name = item.querySelector('.friend-name').textContent.toLowerCase();
        if (name.includes(query.toLowerCase())) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
};

window.showFriendProfile = function(friendId) {
    console.log('👤 Showing friend profile:', friendId);
    // Implementation for friend profile modal
};

window.sendMessage = function(friendId) {
    console.log('💬 Sending message to friend:', friendId);
    // Implementation for messaging system
};

window.inviteToGame = function(friendId) {
    console.log('🎮 Inviting friend to game:', friendId);
    // Implementation for game invites
};

// Initialize Social Features System
document.addEventListener('DOMContentLoaded', () => {
    window.socialFeatures = new SocialFeaturesSystem();
});

console.log('✅ Social Features System loaded successfully!');