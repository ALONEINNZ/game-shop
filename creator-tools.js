// CREATOR TOOLS SYSTEM - Advanced tools for mod creators and content creators
console.log('🛠️ Loading Creator Tools System...');

class CreatorToolsSystem {
    constructor() {
        this.projects = new Map();
        this.templates = new Map();
        this.analytics = new Map();
        this.collaborations = new Map();
        this.init();
    }

    init() {
        this.createCreatorInterface();
        this.loadCreatorData();
        this.setupCreatorFeatures();
        this.initializeCreatorAPI();
        console.log('✅ Creator Tools System initialized');
    }

    createCreatorInterface() {
        // Add creator tools to navigation
        this.addCreatorNav();
        
        // Create creator dashboard
        this.createCreatorDashboard();
        
        // Create project management interface
        this.createProjectManager();
        
        // Create collaboration tools
        this.createCollaborationTools();
    }

    addCreatorNav() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const creatorNav = document.createElement('div');
            creatorNav.className = 'nav-dropdown';
            creatorNav.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" onclick="toggleCreatorDropdown()">
                    Creator <i class="fas fa-chevron-down"></i>
                </a>
                <div class="dropdown-menu" id="creatorDropdown">
                    <a href="#" onclick="showCreatorDashboard()"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                    <a href="#" onclick="showProjectManager()"><i class="fas fa-project-diagram"></i> Projects</a>
                    <a href="#" onclick="showModBuilder()"><i class="fas fa-hammer"></i> Mod Builder</a>
                    <a href="#" onclick="showAssetLibrary()"><i class="fas fa-images"></i> Asset Library</a>
                    <a href="#" onclick="showCollaborations()"><i class="fas fa-users-cog"></i> Collaborations</a>
                    <a href="#" onclick="showCreatorAnalytics()"><i class="fas fa-chart-bar"></i> Analytics</a>
                    <a href="#" onclick="showCreatorSettings()"><i class="fas fa-cog"></i> Settings</a>
                </div>
            `;
            navMenu.insertBefore(creatorNav, navMenu.children[4]);
        }
    }

    createCreatorDashboard() {
        const dashboard = document.createElement('div');
        dashboard.id = 'creatorDashboard';
        dashboard.className = 'creator-dashboard modal';
        dashboard.innerHTML = `
            <div class="modal-content creator-modal-content">
                <span class="close" onclick="closeCreatorDashboard()">&times;</span>
                <div class="creator-dashboard-content">
                    <div class="dashboard-header">
                        <h2><i class="fas fa-tachometer-alt"></i> Creator Dashboard</h2>
                        <div class="dashboard-actions">
                            <button onclick="createNewProject()" class="btn btn-primary">
                                <i class="fas fa-plus"></i> New Project
                            </button>
                            <button onclick="showQuickActions()" class="btn btn-outline">
                                <i class="fas fa-bolt"></i> Quick Actions
                            </button>
                        </div>
                    </div>
                    
                    <div class="dashboard-stats">
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-download"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value" id="totalDownloads">125,430</div>
                                <div class="stat-label">Total Downloads</div>
                                <div class="stat-change positive">+12.5% this month</div>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value" id="totalEarnings">$2,847</div>
                                <div class="stat-label">Total Earnings</div>
                                <div class="stat-change positive">+8.3% this month</div>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value" id="avgRating">4.8</div>
                                <div class="stat-label">Average Rating</div>
                                <div class="stat-change positive">+0.2 this month</div>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value" id="followers">3,247</div>
                                <div class="stat-label">Followers</div>
                                <div class="stat-change positive">+156 this month</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-content">
                        <div class="dashboard-left">
                            <div class="recent-projects">
                                <h3>Recent Projects</h3>
                                <div id="recentProjectsList" class="projects-list">
                                    <!-- Recent projects will be loaded here -->
                                </div>
                            </div>
                            
                            <div class="quick-actions">
                                <h3>Quick Actions</h3>
                                <div class="action-grid">
                                    <button onclick="uploadNewMod()" class="action-btn">
                                        <i class="fas fa-upload"></i>
                                        <span>Upload Mod</span>
                                    </button>
                                    <button onclick="createFromTemplate()" class="action-btn">
                                        <i class="fas fa-copy"></i>
                                        <span>Use Template</span>
                                    </button>
                                    <button onclick="startCollaboration()" class="action-btn">
                                        <i class="fas fa-handshake"></i>
                                        <span>Collaborate</span>
                                    </button>
                                    <button onclick="exportProject()" class="action-btn">
                                        <i class="fas fa-file-export"></i>
                                        <span>Export</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="dashboard-right">
                            <div class="analytics-preview">
                                <h3>Analytics Overview</h3>
                                <div class="chart-container">
                                    <canvas id="downloadsChart" width="400" height="200"></canvas>
                                </div>
                            </div>
                            
                            <div class="notifications-panel">
                                <h3>Notifications</h3>
                                <div id="creatorNotifications" class="notifications-list">
                                    <!-- Notifications will be loaded here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(dashboard);
    }

    createProjectManager() {
        const projectManager = document.createElement('div');
        projectManager.id = 'projectManager';
        projectManager.className = 'project-manager modal';
        projectManager.innerHTML = `
            <div class="modal-content project-modal-content">
                <span class="close" onclick="closeProjectManager()">&times;</span>
                <div class="project-manager-content">
                    <div class="project-header">
                        <h2><i class="fas fa-project-diagram"></i> Project Manager</h2>
                        <div class="project-actions">
                            <button onclick="createNewProject()" class="btn btn-primary">
                                <i class="fas fa-plus"></i> New Project
                            </button>
                            <button onclick="importProject()" class="btn btn-outline">
                                <i class="fas fa-file-import"></i> Import
                            </button>
                        </div>
                    </div>
                    
                    <div class="project-filters">
                        <div class="filter-group">
                            <select onchange="filterProjects(this.value)">
                                <option value="all">All Projects</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <select onchange="sortProjects(this.value)">
                                <option value="recent">Most Recent</option>
                                <option value="name">Name A-Z</option>
                                <option value="downloads">Most Downloads</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>
                        <div class="search-group">
                            <input type="text" placeholder="Search projects..." onkeyup="searchProjects(this.value)">
                        </div>
                    </div>
                    
                    <div class="projects-grid" id="projectsGrid">
                        <!-- Projects will be loaded here -->
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(projectManager);
    }

    createCollaborationTools() {
        const collabTools = document.createElement('div');
        collabTools.id = 'collaborationTools';
        collabTools.className = 'collaboration-tools modal';
        collabTools.innerHTML = `
            <div class="modal-content collab-modal-content">
                <span class="close" onclick="closeCollaborationTools()">&times;</span>
                <div class="collaboration-content">
                    <div class="collab-header">
                        <h2><i class="fas fa-users-cog"></i> Collaboration Hub</h2>
                        <div class="collab-actions">
                            <button onclick="startNewCollaboration()" class="btn btn-primary">
                                <i class="fas fa-plus"></i> New Collaboration
                            </button>
                            <button onclick="findCollaborators()" class="btn btn-outline">
                                <i class="fas fa-search"></i> Find Collaborators
                            </button>
                        </div>
                    </div>
                    
                    <div class="collab-tabs">
                        <button class="collab-tab active" onclick="showCollabTab('active')">
                            Active Collaborations
                        </button>
                        <button class="collab-tab" onclick="showCollabTab('invites')">
                            Invitations
                        </button>
                        <button class="collab-tab" onclick="showCollabTab('history')">
                            History
                        </button>
                    </div>
                    
                    <div class="collab-content">
                        <div id="activeCollabTab" class="collab-tab-content active">
                            <div id="activeCollaborations" class="collaborations-list">
                                <!-- Active collaborations will be loaded here -->
                            </div>
                        </div>
                        
                        <div id="invitesCollabTab" class="collab-tab-content">
                            <div id="collaborationInvites" class="invites-list">
                                <!-- Collaboration invites will be loaded here -->
                            </div>
                        </div>
                        
                        <div id="historyCollabTab" class="collab-tab-content">
                            <div id="collaborationHistory" class="history-list">
                                <!-- Collaboration history will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(collabTools);
    }

    loadCreatorData() {
        // Load sample projects
        const sampleProjects = [
            {
                id: 1,
                name: 'Ultra Graphics Overhaul V2',
                game: 'Cyberpunk 2077',
                status: 'active',
                progress: 85,
                downloads: 45230,
                rating: 4.9,
                lastModified: '2 hours ago',
                collaborators: ['SkyrimLegend', 'GTAModder'],
                thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop'
            },
            {
                id: 2,
                name: 'Enhanced Weather System',
                game: 'Skyrim',
                status: 'completed',
                progress: 100,
                downloads: 23450,
                rating: 4.7,
                lastModified: '1 day ago',
                collaborators: [],
                thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&h=200&fit=crop'
            },
            {
                id: 3,
                name: 'Vehicle Pack Deluxe',
                game: 'GTA V',
                status: 'draft',
                progress: 60,
                downloads: 0,
                rating: 0,
                lastModified: '3 days ago',
                collaborators: ['VehicleExpert'],
                thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=200&fit=crop'
            }
        ];

        sampleProjects.forEach(project => {
            this.projects.set(project.id, project);
        });

        // Load sample collaborations
        const sampleCollaborations = [
            {
                id: 1,
                projectName: 'Minecraft Shader Pack',
                collaborators: ['ShaderMaster', 'MinecraftPro'],
                role: 'Lead Developer',
                status: 'active',
                progress: 70,
                lastActivity: '1 hour ago'
            },
            {
                id: 2,
                projectName: 'Fallout 4 Weapon Mod',
                collaborators: ['WeaponSmith'],
                role: 'Texture Artist',
                status: 'review',
                progress: 90,
                lastActivity: '2 days ago'
            }
        ];

        sampleCollaborations.forEach(collab => {
            this.collaborations.set(collab.id, collab);
        });

        this.renderProjects();
        this.renderCollaborations();
        this.loadCreatorNotifications();
    }

    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        const recentProjectsList = document.getElementById('recentProjectsList');
        
        if (!projectsGrid) return;

        const projectsHTML = Array.from(this.projects.values()).map(project => `
            <div class="project-card" onclick="openProject(${project.id})">
                <div class="project-thumbnail">
                    <img src="${project.thumbnail}" alt="${project.name}">
                    <div class="project-status ${project.status}">${project.status}</div>
                </div>
                <div class="project-info">
                    <h4 class="project-name">${project.name}</h4>
                    <div class="project-meta">
                        <span class="project-game">${project.game}</span>
                        <span class="project-modified">${project.lastModified}</span>
                    </div>
                    <div class="project-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${project.progress}%"></div>
                        </div>
                        <span class="progress-text">${project.progress}%</span>
                    </div>
                    <div class="project-stats">
                        <span><i class="fas fa-download"></i> ${project.downloads.toLocaleString()}</span>
                        <span><i class="fas fa-star"></i> ${project.rating || 'N/A'}</span>
                        ${project.collaborators.length > 0 ? 
                            `<span><i class="fas fa-users"></i> ${project.collaborators.length}</span>` : ''
                        }
                    </div>
                </div>
                <div class="project-actions">
                    <button onclick="event.stopPropagation(); editProject(${project.id})" class="btn-icon" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="event.stopPropagation(); shareProject(${project.id})" class="btn-icon" title="Share">
                        <i class="fas fa-share"></i>
                    </button>
                    <button onclick="event.stopPropagation(); duplicateProject(${project.id})" class="btn-icon" title="Duplicate">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
        `).join('');

        projectsGrid.innerHTML = projectsHTML;

        // Render recent projects in dashboard
        if (recentProjectsList) {
            const recentHTML = Array.from(this.projects.values()).slice(0, 3).map(project => `
                <div class="recent-project-item" onclick="openProject(${project.id})">
                    <img src="${project.thumbnail}" alt="${project.name}" class="recent-project-thumb">
                    <div class="recent-project-info">
                        <div class="recent-project-name">${project.name}</div>
                        <div class="recent-project-meta">${project.game} • ${project.lastModified}</div>
                    </div>
                    <div class="recent-project-progress">${project.progress}%</div>
                </div>
            `).join('');
            
            recentProjectsList.innerHTML = recentHTML;
        }
    }

    renderCollaborations() {
        const activeCollaborations = document.getElementById('activeCollaborations');
        if (!activeCollaborations) return;

        const collabHTML = Array.from(this.collaborations.values()).map(collab => `
            <div class="collaboration-item">
                <div class="collab-info">
                    <h4 class="collab-project">${collab.projectName}</h4>
                    <div class="collab-meta">
                        <span class="collab-role">${collab.role}</span>
                        <span class="collab-status ${collab.status}">${collab.status}</span>
                    </div>
                    <div class="collab-collaborators">
                        <i class="fas fa-users"></i>
                        ${collab.collaborators.join(', ')}
                    </div>
                </div>
                <div class="collab-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${collab.progress}%"></div>
                    </div>
                    <span class="progress-text">${collab.progress}%</span>
                </div>
                <div class="collab-actions">
                    <button onclick="openCollaboration(${collab.id})" class="btn btn-primary btn-sm">
                        Open
                    </button>
                    <button onclick="leaveCollaboration(${collab.id})" class="btn btn-outline btn-sm">
                        Leave
                    </button>
                </div>
            </div>
        `).join('');

        activeCollaborations.innerHTML = collabHTML;
    }

    loadCreatorNotifications() {
        const notifications = [
            {
                id: 1,
                type: 'download',
                message: 'Your mod "Ultra Graphics Overhaul" reached 50K downloads!',
                time: '2 hours ago',
                icon: 'fas fa-download'
            },
            {
                id: 2,
                type: 'collaboration',
                message: 'ShaderMaster invited you to collaborate on "Minecraft Shader Pack"',
                time: '1 day ago',
                icon: 'fas fa-handshake'
            },
            {
                id: 3,
                type: 'review',
                message: 'New 5-star review on "Enhanced Weather System"',
                time: '2 days ago',
                icon: 'fas fa-star'
            }
        ];

        const notificationsList = document.getElementById('creatorNotifications');
        if (notificationsList) {
            const notificationsHTML = notifications.map(notif => `
                <div class="notification-item ${notif.type}">
                    <div class="notification-icon">
                        <i class="${notif.icon}"></i>
                    </div>
                    <div class="notification-content">
                        <div class="notification-message">${notif.message}</div>
                        <div class="notification-time">${notif.time}</div>
                    </div>
                </div>
            `).join('');
            
            notificationsList.innerHTML = notificationsHTML;
        }
    }

    setupCreatorFeatures() {
        this.addCreatorStyles();
        this.initializeCreatorCharts();
    }

    initializeCreatorAPI() {
        // Mock API for creator tools
        console.log('🔌 Initializing Creator API...');
        
        this.api = {
            projects: {
                create: (projectData) => console.log('Creating project:', projectData),
                update: (id, data) => console.log('Updating project:', id, data),
                delete: (id) => console.log('Deleting project:', id)
            },
            collaborations: {
                invite: (userId, projectId) => console.log('Inviting to collaboration:', userId, projectId),
                accept: (collabId) => console.log('Accepting collaboration:', collabId),
                leave: (collabId) => console.log('Leaving collaboration:', collabId)
            },
            analytics: {
                getDownloads: (projectId) => console.log('Getting downloads for:', projectId),
                getRevenue: (projectId) => console.log('Getting revenue for:', projectId)
            }
        };
    }

    initializeCreatorCharts() {
        // Simple chart simulation (would use Chart.js in real implementation)
        setTimeout(() => {
            const canvas = document.getElementById('downloadsChart');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                
                // Simple line chart simulation
                ctx.strokeStyle = '#5B8CFF';
                ctx.lineWidth = 3;
                ctx.beginPath();
                
                const points = [
                    [50, 150], [100, 120], [150, 100], [200, 80], 
                    [250, 60], [300, 40], [350, 30]
                ];
                
                ctx.moveTo(points[0][0], points[0][1]);
                points.forEach(point => {
                    ctx.lineTo(point[0], point[1]);
                });
                
                ctx.stroke();
                
                // Add title
                ctx.fillStyle = '#ffffff';
                ctx.font = '14px Arial';
                ctx.fillText('Downloads Over Time', 10, 20);
            }
        }, 1000);
    }

    addCreatorStyles() {
        const styles = `
            <style>
            .creator-modal-content, .project-modal-content, .collab-modal-content {
                max-width: 1200px;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .creator-dashboard-content {
                padding: 2rem;
            }
            
            .dashboard-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .dashboard-actions {
                display: flex;
                gap: 1rem;
            }
            
            .dashboard-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-bottom: 3rem;
            }
            
            .stat-card {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 1.5rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                transition: all 0.3s ease;
            }
            
            .stat-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            }
            
            .stat-icon {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: white;
            }
            
            .stat-info {
                flex: 1;
            }
            
            .stat-value {
                font-size: 2rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 0.25rem;
            }
            
            .stat-label {
                color: var(--text-secondary);
                font-size: 0.9rem;
                margin-bottom: 0.5rem;
            }
            
            .stat-change {
                font-size: 0.8rem;
                font-weight: 600;
            }
            
            .stat-change.positive {
                color: #10b981;
            }
            
            .stat-change.negative {
                color: #ef4444;
            }
            
            .dashboard-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
            }
            
            .recent-projects, .quick-actions, .analytics-preview, .notifications-panel {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 1.5rem;
                margin-bottom: 1.5rem;
            }
            
            .recent-projects h3, .quick-actions h3, .analytics-preview h3, .notifications-panel h3 {
                margin: 0 0 1rem 0;
                color: var(--text-primary);
                font-size: 1.2rem;
            }
            
            .recent-project-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                border-radius: var(--radius-md);
                margin-bottom: 0.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .recent-project-item:hover {
                background: var(--bg-tertiary);
            }
            
            .recent-project-thumb {
                width: 50px;
                height: 30px;
                border-radius: var(--radius-sm);
                object-fit: cover;
            }
            
            .recent-project-info {
                flex: 1;
            }
            
            .recent-project-name {
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 0.25rem;
            }
            
            .recent-project-meta {
                font-size: 0.8rem;
                color: var(--text-secondary);
            }
            
            .recent-project-progress {
                font-weight: 600;
                color: var(--accent-primary);
            }
            
            .action-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }
            
            .action-btn {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                padding: 1.5rem;
                background: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-primary);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .action-btn:hover {
                background: var(--accent-primary);
                color: white;
                transform: translateY(-2px);
            }
            
            .action-btn i {
                font-size: 1.5rem;
            }
            
            .chart-container {
                height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-item {
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                padding: 1rem;
                border-radius: var(--radius-md);
                margin-bottom: 0.5rem;
                background: var(--bg-tertiary);
            }
            
            .notification-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.1rem;
            }
            
            .notification-item.download .notification-icon {
                background: rgba(16, 185, 129, 0.2);
                color: #10b981;
            }
            
            .notification-item.collaboration .notification-icon {
                background: rgba(91, 140, 255, 0.2);
                color: #5b8cff;
            }
            
            .notification-item.review .notification-icon {
                background: rgba(245, 158, 11, 0.2);
                color: #f59e0b;
            }
            
            .notification-message {
                color: var(--text-primary);
                margin-bottom: 0.25rem;
            }
            
            .notification-time {
                font-size: 0.8rem;
                color: var(--text-secondary);
            }
            
            .project-manager-content {
                padding: 2rem;
            }
            
            .project-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .project-filters {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
                align-items: center;
            }
            
            .filter-group select, .search-group input {
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                background: var(--bg-secondary);
                color: var(--text-primary);
            }
            
            .search-group input {
                width: 300px;
            }
            
            .projects-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 2rem;
            }
            
            .project-card {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                overflow: hidden;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .project-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            
            .project-thumbnail {
                position: relative;
                aspect-ratio: 16/9;
                overflow: hidden;
            }
            
            .project-thumbnail img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .project-status {
                position: absolute;
                top: 10px;
                left: 10px;
                padding: 0.25rem 0.75rem;
                border-radius: var(--radius-full);
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
            }
            
            .project-status.active {
                background: rgba(16, 185, 129, 0.2);
                color: #10b981;
            }
            
            .project-status.completed {
                background: rgba(91, 140, 255, 0.2);
                color: #5b8cff;
            }
            
            .project-status.draft {
                background: rgba(245, 158, 11, 0.2);
                color: #f59e0b;
            }
            
            .project-info {
                padding: 1.5rem;
            }
            
            .project-name {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 0.5rem 0;
            }
            
            .project-meta {
                display: flex;
                justify-content: space-between;
                margin-bottom: 1rem;
                font-size: 0.9rem;
                color: var(--text-secondary);
            }
            
            .project-progress {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .progress-bar {
                flex: 1;
                height: 8px;
                background: var(--bg-tertiary);
                border-radius: var(--radius-full);
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
                transition: width 0.3s ease;
            }
            
            .progress-text {
                font-size: 0.9rem;
                font-weight: 600;
                color: var(--text-primary);
            }
            
            .project-stats {
                display: flex;
                gap: 1rem;
                font-size: 0.9rem;
                color: var(--text-secondary);
                margin-bottom: 1rem;
            }
            
            .project-actions {
                display: flex;
                gap: 0.5rem;
                justify-content: flex-end;
            }
            
            .btn-icon {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border: 1px solid var(--border-color);
                background: var(--bg-tertiary);
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
            
            .collaboration-content {
                padding: 2rem;
            }
            
            .collab-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .collab-tabs {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .collab-tab {
                padding: 1rem 1.5rem;
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.3s ease;
                border-bottom: 2px solid transparent;
            }
            
            .collab-tab.active {
                color: var(--accent-primary);
                border-bottom-color: var(--accent-primary);
            }
            
            .collab-tab-content {
                display: none;
            }
            
            .collab-tab-content.active {
                display: block;
            }
            
            .collaboration-item {
                display: flex;
                align-items: center;
                gap: 2rem;
                padding: 1.5rem;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                margin-bottom: 1rem;
            }
            
            .collab-info {
                flex: 1;
            }
            
            .collab-project {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 0.5rem 0;
            }
            
            .collab-meta {
                display: flex;
                gap: 1rem;
                margin-bottom: 0.5rem;
            }
            
            .collab-role {
                color: var(--accent-primary);
                font-weight: 500;
            }
            
            .collab-status {
                padding: 0.25rem 0.75rem;
                border-radius: var(--radius-full);
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
            }
            
            .collab-status.active {
                background: rgba(16, 185, 129, 0.2);
                color: #10b981;
            }
            
            .collab-status.review {
                background: rgba(245, 158, 11, 0.2);
                color: #f59e0b;
            }
            
            .collab-collaborators {
                font-size: 0.9rem;
                color: var(--text-secondary);
            }
            
            .collab-progress {
                display: flex;
                align-items: center;
                gap: 1rem;
                min-width: 150px;
            }
            
            .collab-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            @media (max-width: 768px) {
                .dashboard-content {
                    grid-template-columns: 1fr;
                }
                
                .dashboard-stats {
                    grid-template-columns: 1fr;
                }
                
                .projects-grid {
                    grid-template-columns: 1fr;
                }
                
                .project-filters {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .search-group input {
                    width: 100%;
                }
                
                .collaboration-item {
                    flex-direction: column;
                    align-items: stretch;
                    gap: 1rem;
                }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Global functions for creator tools
window.toggleCreatorDropdown = function() {
    const dropdown = document.getElementById('creatorDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
};

window.showCreatorDashboard = function() {
    const dashboard = document.getElementById('creatorDashboard');
    if (dashboard) {
        dashboard.style.display = 'flex';
    }
};

window.closeCreatorDashboard = function() {
    const dashboard = document.getElementById('creatorDashboard');
    if (dashboard) {
        dashboard.style.display = 'none';
    }
};

window.showProjectManager = function() {
    const manager = document.getElementById('projectManager');
    if (manager) {
        manager.style.display = 'flex';
    }
};

window.closeProjectManager = function() {
    const manager = document.getElementById('projectManager');
    if (manager) {
        manager.style.display = 'none';
    }
};

window.showCollaborations = function() {
    const tools = document.getElementById('collaborationTools');
    if (tools) {
        tools.style.display = 'flex';
    }
};

window.closeCollaborationTools = function() {
    const tools = document.getElementById('collaborationTools');
    if (tools) {
        tools.style.display = 'none';
    }
};

window.showCollabTab = function(tabName) {
    // Hide all tabs
    document.querySelectorAll('.collab-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.collab-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + 'CollabTab');
    const selectedButton = document.querySelector(`[onclick="showCollabTab('${tabName}')"]`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedButton) selectedButton.classList.add('active');
};

window.createNewProject = function() {
    console.log('🆕 Creating new project...');
    // Implementation for creating new project
};

window.openProject = function(projectId) {
    console.log('📂 Opening project:', projectId);
    // Implementation for opening project
};

window.editProject = function(projectId) {
    console.log('✏️ Editing project:', projectId);
    // Implementation for editing project
};

// Initialize Creator Tools System
document.addEventListener('DOMContentLoaded', () => {
    window.creatorTools = new CreatorToolsSystem();
});

console.log('✅ Creator Tools System loaded successfully!');