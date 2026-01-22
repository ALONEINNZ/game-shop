// ADVANCED USER PROFILE SYSTEM
// Comprehensive user profiles with achievements, social features, and customization

class AdvancedUserProfile {
    constructor() {
        this.currentUser = null;
        this.userProfiles = {};
        this.achievements = {};
        this.socialFeatures = {
            following: [],
            followers: [],
            friends: [],
            activity: []
        };
        this.customization = {
            theme: 'dark',
            avatar: null,
            banner: null,
            badges: [],
            showcase: []
        };
        
        this.init();
    }

    init() {
        this.loadUserData();
        this.loadAchievements();
        this.createProfileUI();
        this.setupEventHandlers();
        this.loadSocialFeatures();
        
        console.log('👤 Advanced User Profile System Initialized');
    }

    loadUserData() {
        const userData = localStorage.getItem('exuscraft_user_data');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
        
        const profileData = localStorage.getItem('exuscraft_user_profiles');
        if (profileData) {
            this.userProfiles = JSON.parse(profileData);
        }
    }

    loadAchievements() {
        // Load or generate achievement system
        const savedAchievements = localStorage.getItem('exuscraft_achievements');
        if (savedAchievements) {
            this.achievements = JSON.parse(savedAchievements);
        } else {
            this.generateAchievementSystem();
        }
    }

    generateAchievementSystem() {
        this.achievements = {
            categories: {
                'downloads': {
                    name: 'Downloads',
                    icon: '📥',
                    achievements: [
                        { id: 'first_download', name: 'First Steps', description: 'Download your first mod', requirement: 1, unlocked: false, icon: '🎯' },
                        { id: 'mod_collector', name: 'Mod Collector', description: 'Download 10 mods', requirement: 10, unlocked: false, icon: '📦' },
                        { id: 'mod_hoarder', name: 'Mod Hoarder', description: 'Download 50 mods', requirement: 50, unlocked: false, icon: '🏆' },
                        { id: 'download_master', name: 'Download Master', description: 'Download 100 mods', requirement: 100, unlocked: false, icon: '👑' }
                    ]
                },
                'social': {
                    name: 'Social',
                    icon: '👥',
                    achievements: [
                        { id: 'first_review', name: 'Critic', description: 'Write your first review', requirement: 1, unlocked: false, icon: '✍️' },
                        { id: 'helpful_reviewer', name: 'Helpful Reviewer', description: 'Get 10 helpful votes', requirement: 10, unlocked: false, icon: '👍' },
                        { id: 'community_leader', name: 'Community Leader', description: 'Get 100 followers', requirement: 100, unlocked: false, icon: '🌟' },
                        { id: 'influencer', name: 'Influencer', description: 'Get 1000 followers', requirement: 1000, unlocked: false, icon: '💫' }
                    ]
                },
                'creator': {
                    name: 'Creator',
                    icon: '🛠️',
                    achievements: [
                        { id: 'first_upload', name: 'Creator', description: 'Upload your first mod', requirement: 1, unlocked: false, icon: '🎨' },
                        { id: 'popular_creator', name: 'Popular Creator', description: 'Get 1000 downloads', requirement: 1000, unlocked: false, icon: '🔥' },
                        { id: 'mod_master', name: 'Mod Master', description: 'Upload 10 mods', requirement: 10, unlocked: false, icon: '🏅' },
                        { id: 'legendary_creator', name: 'Legendary Creator', description: 'Get 100K downloads', requirement: 100000, unlocked: false, icon: '👑' }
                    ]
                },
                'special': {
                    name: 'Special',
                    icon: '⭐',
                    achievements: [
                        { id: 'early_adopter', name: 'Early Adopter', description: 'Join ExusCraft in beta', requirement: 1, unlocked: true, icon: '🚀' },
                        { id: 'beta_tester', name: 'Beta Tester', description: 'Test new features', requirement: 1, unlocked: false, icon: '🧪' },
                        { id: 'bug_hunter', name: 'Bug Hunter', description: 'Report 5 bugs', requirement: 5, unlocked: false, icon: '🐛' },
                        { id: 'community_champion', name: 'Community Champion', description: 'Help 50 users', requirement: 50, unlocked: false, icon: '🏆' }
                    ]
                }
            },
            userProgress: {
                downloads: 0,
                uploads: 0,
                reviews: 0,
                helpfulVotes: 0,
                followers: 0,
                bugsReported: 0,
                usersHelped: 0
            }
        };
    }

    createProfileUI() {
        // Add profile enhancement to existing profile page
        this.enhanceExistingProfile();
        
        // Create floating profile button
        this.createProfileButton();
    }

    createProfileButton() {
        const profileBtn = document.createElement('button');
        profileBtn.id = 'advancedProfileBtn';
        profileBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 220px;
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
            display: ${this.currentUser ? 'block' : 'none'};
        `;
        profileBtn.innerHTML = '👤';
        profileBtn.title = 'Advanced Profile';
        
        profileBtn.addEventListener('click', () => {
            this.showAdvancedProfile();
        });
        
        document.body.appendChild(profileBtn);
    }

    enhanceExistingProfile() {
        // This will enhance the existing profile.html page when it's loaded
        if (window.location.pathname.includes('profile.html')) {
            setTimeout(() => {
                this.injectProfileEnhancements();
            }, 1000);
        }
    }

    showAdvancedProfile() {
        if (!this.currentUser) {
            alert('Please login to view your profile');
            return;
        }
        
        const modal = document.createElement('div');
        modal.id = 'advancedProfileModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            z-index: 2000;
            display: flex;
            overflow-y: auto;
        `;
        
        modal.innerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; padding: 2rem; width: 100%;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
                    <h1 style="color: white; margin: 0; font-size: 2.5rem; font-weight: 800;">
                        User Profile
                    </h1>
                    <button id="closeAdvancedProfile" style="
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 2rem;
                        cursor: pointer;
                    ">×</button>
                </div>
                
                <!-- Profile Header -->
                <div style="
                    background: linear-gradient(135deg, rgba(91, 140, 255, 0.2), rgba(193, 92, 255, 0.2));
                    border: 1px solid rgba(91, 140, 255, 0.3);
                    border-radius: 20px;
                    padding: 3rem;
                    margin-bottom: 3rem;
                    position: relative;
                    overflow: hidden;
                ">
                    <!-- Background Pattern -->
                    <div style="
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 200px;
                        height: 200px;
                        background: radial-gradient(circle, rgba(91, 140, 255, 0.1) 0%, transparent 70%);
                        border-radius: 50%;
                    "></div>
                    
                    <div style="position: relative; z-index: 1;">
                        <div style="display: flex; gap: 2rem; align-items: center; margin-bottom: 2rem;">
                            <div style="position: relative;">
                                <img src="${this.currentUser.avatar || this.generateAvatar(this.currentUser.username)}" 
                                     alt="Profile" style="
                                    width: 120px;
                                    height: 120px;
                                    border-radius: 50%;
                                    border: 4px solid rgba(255, 255, 255, 0.2);
                                ">
                                <button onclick="advancedUserProfile.changeAvatar()" style="
                                    position: absolute;
                                    bottom: 0;
                                    right: 0;
                                    width: 36px;
                                    height: 36px;
                                    background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                                    border: none;
                                    border-radius: 50%;
                                    color: white;
                                    cursor: pointer;
                                    font-size: 0.9rem;
                                ">📷</button>
                            </div>
                            
                            <div style="flex: 1;">
                                <h2 style="margin: 0 0 0.5rem 0; color: white; font-size: 2rem; font-weight: 700;">
                                    ${this.currentUser.username}
                                    ${this.currentUser.verified ? '<span style="color: #22C55E; margin-left: 0.5rem;">✓</span>' : ''}
                                </h2>
                                <p style="margin: 0 0 1rem 0; color: rgba(255, 255, 255, 0.7); font-size: 1.1rem;">
                                    ${this.currentUser.email}
                                </p>
                                <div style="display: flex; gap: 1rem;">
                                    <span style="color: rgba(255, 255, 255, 0.8);">
                                        📅 Joined ${new Date(this.currentUser.joinDate || Date.now()).toLocaleDateString()}
                                    </span>
                                    <span style="color: rgba(255, 255, 255, 0.8);">
                                        🏆 Level ${this.calculateUserLevel()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick Stats -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem;">
                            ${this.generateQuickStatsHTML()}
                        </div>
                    </div>
                </div>
                
                <!-- Main Content -->
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem;">
                    <!-- Left Column -->
                    <div>
                        <!-- Achievements -->
                        <section style="
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 20px;
                            padding: 2rem;
                            margin-bottom: 2rem;
                        ">
                            <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.5rem;">🏆 Achievements</h3>
                            ${this.generateAchievementsHTML()}
                        </section>
                        
                        <!-- Activity Feed -->
                        <section style="
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 20px;
                            padding: 2rem;
                        ">
                            <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.5rem;">📈 Recent Activity</h3>
                            ${this.generateActivityFeedHTML()}
                        </section>
                    </div>
                    
                    <!-- Right Column -->
                    <div>
                        <!-- Profile Customization -->
                        <section style="
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 20px;
                            padding: 2rem;
                            margin-bottom: 2rem;
                        ">
                            <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.3rem;">🎨 Customization</h3>
                            ${this.generateCustomizationHTML()}
                        </section>
                        
                        <!-- Social Stats -->
                        <section style="
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 20px;
                            padding: 2rem;
                        ">
                            <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.3rem;">👥 Social</h3>
                            ${this.generateSocialStatsHTML()}
                        </section>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.setupProfileHandlers();
    }

    generateQuickStatsHTML() {
        const stats = [
            { label: 'Downloads', value: this.achievements.userProgress.downloads, icon: '📥' },
            { label: 'Uploads', value: this.achievements.userProgress.uploads, icon: '📤' },
            { label: 'Reviews', value: this.achievements.userProgress.reviews, icon: '⭐' },
            { label: 'Followers', value: this.achievements.userProgress.followers, icon: '👥' }
        ];
        
        return stats.map(stat => `
            <div style="text-align: center;">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${stat.icon}</div>
                <div style="color: white; font-size: 1.5rem; font-weight: 700;">${stat.value}</div>
                <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">${stat.label}</div>
            </div>
        `).join('');
    }

    generateAchievementsHTML() {
        let html = '';
        
        Object.entries(this.achievements.categories).forEach(([categoryId, category]) => {
            html += `
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: white; margin: 0 0 1rem 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                        ${category.icon} ${category.name}
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
                        ${category.achievements.map(achievement => `
                            <div style="
                                background: ${achievement.unlocked ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
                                border: 1px solid ${achievement.unlocked ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
                                border-radius: 12px;
                                padding: 1rem;
                                text-align: center;
                                ${achievement.unlocked ? '' : 'opacity: 0.6;'}
                            ">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${achievement.icon}</div>
                                <h5 style="margin: 0 0 0.25rem 0; color: white; font-size: 0.9rem; font-weight: 600;">
                                    ${achievement.name}
                                </h5>
                                <p style="margin: 0; color: rgba(255, 255, 255, 0.7); font-size: 0.8rem; line-height: 1.3;">
                                    ${achievement.description}
                                </p>
                                ${achievement.unlocked ? `
                                    <div style="
                                        background: #22C55E;
                                        color: white;
                                        padding: 0.25rem 0.75rem;
                                        border-radius: 12px;
                                        font-size: 0.7rem;
                                        font-weight: 600;
                                        margin-top: 0.5rem;
                                        display: inline-block;
                                    ">UNLOCKED</div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        return html;
    }

    generateActivityFeedHTML() {
        const activities = [
            { type: 'download', text: 'Downloaded Ultra Graphics Pack', time: '2 hours ago', icon: '📥' },
            { type: 'review', text: 'Reviewed Survival Overhaul', time: '1 day ago', icon: '⭐' },
            { type: 'achievement', text: 'Unlocked "Mod Collector" achievement', time: '2 days ago', icon: '🏆' },
            { type: 'follow', text: 'Started following GraphicsMaster', time: '3 days ago', icon: '👥' },
            { type: 'upload', text: 'Uploaded Texture Enhancement Mod', time: '1 week ago', icon: '📤' }
        ];
        
        return activities.map(activity => `
            <div style="
                display: flex;
                gap: 1rem;
                padding: 1rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            ">
                <div style="
                    width: 40px;
                    height: 40px;
                    background: rgba(91, 140, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    flex-shrink: 0;
                ">${activity.icon}</div>
                <div style="flex: 1;">
                    <p style="margin: 0 0 0.25rem 0; color: white; font-size: 0.9rem;">
                        ${activity.text}
                    </p>
                    <span style="color: rgba(255, 255, 255, 0.5); font-size: 0.8rem;">
                        ${activity.time}
                    </span>
                </div>
            </div>
        `).join('');
    }

    generateCustomizationHTML() {
        return `
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: white; margin: 0 0 0.75rem 0; font-size: 1rem;">Profile Theme</h5>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
                    <button onclick="advancedUserProfile.changeTheme('dark')" style="
                        background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
                        border: 2px solid ${this.customization.theme === 'dark' ? '#5B8CFF' : 'rgba(255, 255, 255, 0.2)'};
                        border-radius: 8px;
                        padding: 0.75rem;
                        cursor: pointer;
                        color: white;
                        font-size: 0.8rem;
                    ">Dark</button>
                    <button onclick="advancedUserProfile.changeTheme('blue')" style="
                        background: linear-gradient(135deg, #1e3a8a, #3b82f6);
                        border: 2px solid ${this.customization.theme === 'blue' ? '#5B8CFF' : 'rgba(255, 255, 255, 0.2)'};
                        border-radius: 8px;
                        padding: 0.75rem;
                        cursor: pointer;
                        color: white;
                        font-size: 0.8rem;
                    ">Blue</button>
                    <button onclick="advancedUserProfile.changeTheme('purple')" style="
                        background: linear-gradient(135deg, #581c87, #a855f7);
                        border: 2px solid ${this.customization.theme === 'purple' ? '#5B8CFF' : 'rgba(255, 255, 255, 0.2)'};
                        border-radius: 8px;
                        padding: 0.75rem;
                        cursor: pointer;
                        color: white;
                        font-size: 0.8rem;
                    ">Purple</button>
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: white; margin: 0 0 0.75rem 0; font-size: 1rem;">Profile Badges</h5>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <div style="
                        background: rgba(255, 215, 0, 0.2);
                        border: 1px solid rgba(255, 215, 0, 0.3);
                        color: #FFD700;
                        padding: 0.25rem 0.75rem;
                        border-radius: 12px;
                        font-size: 0.8rem;
                        font-weight: 600;
                    ">⭐ Early Adopter</div>
                    <div style="
                        background: rgba(34, 197, 94, 0.2);
                        border: 1px solid rgba(34, 197, 94, 0.3);
                        color: #22C55E;
                        padding: 0.25rem 0.75rem;
                        border-radius: 12px;
                        font-size: 0.8rem;
                        font-weight: 600;
                    ">✓ Verified</div>
                </div>
            </div>
            
            <button onclick="advancedUserProfile.showCustomizationModal()" style="
                background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                border: none;
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                width: 100%;
            ">More Options</button>
        `;
    }

    generateSocialStatsHTML() {
        return `
            <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                    <span style="color: rgba(255, 255, 255, 0.7);">Following</span>
                    <span style="color: white; font-weight: 600;">${this.socialFeatures.following.length}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                    <span style="color: rgba(255, 255, 255, 0.7);">Followers</span>
                    <span style="color: white; font-weight: 600;">${this.socialFeatures.followers.length}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span style="color: rgba(255, 255, 255, 0.7);">Friends</span>
                    <span style="color: white; font-weight: 600;">${this.socialFeatures.friends.length}</span>
                </div>
            </div>
            
            <button onclick="advancedUserProfile.showSocialModal()" style="
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                width: 100%;
                margin-bottom: 1rem;
            ">Manage Social</button>
            
            <button onclick="advancedUserProfile.findFriends()" style="
                background: linear-gradient(135deg, #10B981, #059669);
                border: none;
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                width: 100%;
            ">Find Friends</button>
        `;
    }

    setupProfileHandlers() {
        // Close profile
        document.getElementById('closeAdvancedProfile').addEventListener('click', () => {
            document.getElementById('advancedProfileModal').remove();
        });
        
        // Close on outside click
        document.getElementById('advancedProfileModal').addEventListener('click', (e) => {
            if (e.target.id === 'advancedProfileModal') {
                document.getElementById('advancedProfileModal').remove();
            }
        });
    }

    setupEventHandlers() {
        // Track user actions for achievements
        this.trackUserActions();
    }

    loadSocialFeatures() {
        const savedSocial = localStorage.getItem('exuscraft_social_features');
        if (savedSocial) {
            this.socialFeatures = JSON.parse(savedSocial);
        }
    }

    trackUserActions() {
        // Track downloads
        document.addEventListener('click', (e) => {
            if (e.target.closest('.download-btn') || e.target.textContent.includes('Download')) {
                this.incrementProgress('downloads');
            }
            
            if (e.target.closest('.upload-btn') || e.target.textContent.includes('Upload')) {
                this.incrementProgress('uploads');
            }
        });
    }

    incrementProgress(type) {
        this.achievements.userProgress[type]++;
        this.checkAchievements(type);
        this.saveProgress();
    }

    checkAchievements(type) {
        Object.values(this.achievements.categories).forEach(category => {
            category.achievements.forEach(achievement => {
                if (!achievement.unlocked && achievement.id.includes(type)) {
                    const progress = this.achievements.userProgress[type];
                    if (progress >= achievement.requirement) {
                        this.unlockAchievement(achievement);
                    }
                }
            });
        });
    }

    unlockAchievement(achievement) {
        achievement.unlocked = true;
        this.showAchievementNotification(achievement);
        this.saveProgress();
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            width: 350px;
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.9), rgba(255, 193, 7, 0.9));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 215, 0, 0.5);
            border-radius: 15px;
            padding: 1.5rem;
            z-index: 2001;
            transform: translateX(400px);
            transition: transform 0.5s ease;
            box-shadow: 0 20px 60px rgba(255, 215, 0, 0.3);
        `;
        
        notification.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🏆</div>
                <h3 style="margin: 0 0 0.5rem 0; color: #1a1a1a; font-size: 1.2rem; font-weight: 700;">
                    Achievement Unlocked!
                </h3>
                <h4 style="margin: 0 0 0.5rem 0; color: #1a1a1a; font-size: 1rem; font-weight: 600;">
                    ${achievement.icon} ${achievement.name}
                </h4>
                <p style="margin: 0; color: rgba(26, 26, 26, 0.8); font-size: 0.9rem;">
                    ${achievement.description}
                </p>
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
        }, 5000);
    }

    calculateUserLevel() {
        const totalProgress = Object.values(this.achievements.userProgress).reduce((sum, val) => sum + val, 0);
        return Math.floor(totalProgress / 10) + 1;
    }

    changeAvatar() {
        alert('Avatar change feature - Coming soon! Will support custom uploads and avatar gallery.');
    }

    changeTheme(theme) {
        this.customization.theme = theme;
        this.saveCustomization();
        
        // Update UI to reflect theme change
        const modal = document.getElementById('advancedProfileModal');
        if (modal) {
            // Refresh the customization section
            const customSection = modal.querySelector('section:nth-child(1)');
            if (customSection) {
                customSection.innerHTML = `
                    <h3 style="color: white; margin: 0 0 1.5rem 0; font-size: 1.3rem;">🎨 Customization</h3>
                    ${this.generateCustomizationHTML()}
                `;
            }
        }
    }

    showCustomizationModal() {
        alert('Advanced customization modal - Coming soon! Will include banner uploads, color schemes, and layout options.');
    }

    showSocialModal() {
        alert('Social management modal - Coming soon! Will include friend requests, follower management, and privacy settings.');
    }

    findFriends() {
        alert('Find friends feature - Coming soon! Will suggest users based on similar interests and mod preferences.');
    }

    generateAvatar(username) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        const color = colors[username.length % colors.length];
        const initial = username.charAt(0).toUpperCase();
        
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect fill='${encodeURIComponent(color)}' width='120' height='120' rx='60'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='48' font-family='Arial'%3E${initial}%3C/text%3E%3C/svg%3E`;
    }

    saveProgress() {
        localStorage.setItem('exuscraft_achievements', JSON.stringify(this.achievements));
    }

    saveCustomization() {
        localStorage.setItem('exuscraft_customization', JSON.stringify(this.customization));
    }

    saveSocialFeatures() {
        localStorage.setItem('exuscraft_social_features', JSON.stringify(this.socialFeatures));
    }

    // Public API methods
    getAchievements() {
        return this.achievements;
    }

    getUserLevel() {
        return this.calculateUserLevel();
    }

    addFollower(userId) {
        if (!this.socialFeatures.followers.includes(userId)) {
            this.socialFeatures.followers.push(userId);
            this.incrementProgress('followers');
            this.saveSocialFeatures();
        }
    }

    followUser(userId) {
        if (!this.socialFeatures.following.includes(userId)) {
            this.socialFeatures.following.push(userId);
            this.saveSocialFeatures();
        }
    }

    addFriend(userId) {
        if (!this.socialFeatures.friends.includes(userId)) {
            this.socialFeatures.friends.push(userId);
            this.saveSocialFeatures();
        }
    }
}

// Initialize Advanced User Profile System
let advancedUserProfile;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        advancedUserProfile = new AdvancedUserProfile();
    });
} else {
    advancedUserProfile = new AdvancedUserProfile();
}

window.advancedUserProfile = advancedUserProfile;