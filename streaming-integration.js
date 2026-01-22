// STREAMING INTEGRATION SYSTEM - Live streaming and content creation tools
console.log('📺 Loading Streaming Integration System...');

class StreamingIntegrationSystem {
    constructor() {
        this.streamers = new Map();
        this.liveStreams = new Map();
        this.recordings = [];
        this.streamingPlatforms = ['twitch', 'youtube', 'discord'];
        this.init();
    }

    init() {
        this.createStreamingInterface();
        this.loadLiveStreams();
        this.setupStreamingFeatures();
        this.initializeStreamingAPI();
        console.log('✅ Streaming Integration System initialized');
    }

    createStreamingInterface() {
        // Add streaming section to main page
        this.addStreamingSection();
        
        // Create streaming overlay
        this.createStreamingOverlay();
        
        // Add streaming controls to nav
        this.addStreamingNav();
    }

    addStreamingSection() {
        const gamesSection = document.getElementById('games');
        if (gamesSection) {
            const streamingSection = document.createElement('section');
            streamingSection.className = 'section streaming-section';
            streamingSection.id = 'streaming';
            streamingSection.innerHTML = `
                <div class="container">
                    <div class="section-header fade-in">
                        <h2 class="section-title">
                            <i class="fas fa-video"></i> Live Streams & Content
                        </h2>
                        <p class="section-subtitle">Watch creators showcase mods live and share your own gameplay</p>
                    </div>
                    
                    <div class="streaming-controls">
                        <div class="streaming-tabs">
                            <button class="streaming-tab active" onclick="showStreamingTab('live')">
                                <i class="fas fa-circle" style="color: #ef4444;"></i> Live Now
                            </button>
                            <button class="streaming-tab" onclick="showStreamingTab('recordings')">
                                <i class="fas fa-play"></i> Recordings
                            </button>
                            <button class="streaming-tab" onclick="showStreamingTab('creators')">
                                <i class="fas fa-star"></i> Top Creators
                            </button>
                        </div>
                        
                        <div class="streaming-actions">
                            <button onclick="startStreaming()" class="btn btn-primary">
                                <i class="fas fa-broadcast-tower"></i> Go Live
                            </button>
                            <button onclick="showStreamingSettings()" class="btn btn-outline">
                                <i class="fas fa-cog"></i> Settings
                            </button>
                        </div>
                    </div>
                    
                    <div class="streaming-content">
                        <div id="liveTab" class="streaming-tab-content active">
                            <div id="liveStreams" class="streams-grid">
                                <!-- Live streams will be loaded here -->
                            </div>
                        </div>
                        
                        <div id="recordingsTab" class="streaming-tab-content">
                            <div class="recordings-filters">
                                <select onchange="filterRecordings(this.value)">
                                    <option value="all">All Games</option>
                                    <option value="minecraft">Minecraft</option>
                                    <option value="cyberpunk">Cyberpunk 2077</option>
                                    <option value="skyrim">Skyrim</option>
                                    <option value="gta">GTA V</option>
                                </select>
                                <select onchange="sortRecordings(this.value)">
                                    <option value="recent">Most Recent</option>
                                    <option value="popular">Most Popular</option>
                                    <option value="duration">Longest</option>
                                </select>
                            </div>
                            <div id="recordingsList" class="recordings-grid">
                                <!-- Recordings will be loaded here -->
                            </div>
                        </div>
                        
                        <div id="creatorsTab" class="streaming-tab-content">
                            <div id="topCreators" class="creators-grid">
                                <!-- Top creators will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            gamesSection.parentNode.insertBefore(streamingSection, gamesSection);
        }
    }

    createStreamingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'streamingOverlay';
        overlay.className = 'streaming-overlay';
        overlay.innerHTML = `
            <div class="streaming-overlay-content">
                <div class="streaming-overlay-header">
                    <h3><i class="fas fa-broadcast-tower"></i> Streaming Controls</h3>
                    <button onclick="toggleStreamingOverlay()" class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="streaming-status">
                    <div class="status-indicator offline" id="streamStatus">
                        <span class="status-dot"></span>
                        <span class="status-text">Offline</span>
                    </div>
                    <div class="stream-stats" id="streamStats" style="display: none;">
                        <div class="stat">
                            <span class="stat-label">Viewers</span>
                            <span class="stat-value" id="viewerCount">0</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Duration</span>
                            <span class="stat-value" id="streamDuration">00:00</span>
                        </div>
                    </div>
                </div>
                
                <div class="streaming-controls-panel">
                    <div class="control-group">
                        <label>Platform</label>
                        <select id="streamPlatform">
                            <option value="twitch">Twitch</option>
                            <option value="youtube">YouTube Live</option>
                            <option value="discord">Discord</option>
                        </select>
                    </div>
                    
                    <div class="control-group">
                        <label>Stream Title</label>
                        <input type="text" id="streamTitle" placeholder="Enter stream title...">
                    </div>
                    
                    <div class="control-group">
                        <label>Game/Category</label>
                        <select id="streamGame">
                            <option value="minecraft">Minecraft</option>
                            <option value="cyberpunk">Cyberpunk 2077</option>
                            <option value="skyrim">Skyrim</option>
                            <option value="gta">GTA V</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="streaming-actions">
                        <button id="startStreamBtn" onclick="toggleStream()" class="btn btn-primary">
                            <i class="fas fa-play"></i> Start Stream
                        </button>
                        <button onclick="recordScreen()" class="btn btn-outline">
                            <i class="fas fa-record-vinyl"></i> Record
                        </button>
                    </div>
                </div>
                
                <div class="streaming-features">
                    <div class="feature-toggle">
                        <input type="checkbox" id="enableChat" checked>
                        <label for="enableChat">Enable Chat</label>
                    </div>
                    <div class="feature-toggle">
                        <input type="checkbox" id="enableDonations">
                        <label for="enableDonations">Enable Donations</label>
                    </div>
                    <div class="feature-toggle">
                        <input type="checkbox" id="enableOverlay" checked>
                        <label for="enableOverlay">Show Overlay</label>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }

    addStreamingNav() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const streamingNav = document.createElement('a');
            streamingNav.className = 'nav-link streaming-nav';
            streamingNav.href = '#streaming';
            streamingNav.innerHTML = `
                <i class="fas fa-video"></i> 
                <span>Streaming</span>
                <span class="live-indicator" id="navLiveIndicator" style="display: none;">LIVE</span>
            `;
            streamingNav.onclick = (e) => {
                e.preventDefault();
                document.getElementById('streaming').scrollIntoView({ behavior: 'smooth' });
            };
            
            navMenu.insertBefore(streamingNav, navMenu.children[3]);
        }
    }

    loadLiveStreams() {
        const sampleStreams = [
            {
                id: 1,
                streamer: 'ModMaster2024',
                title: 'Building Epic Cyberpunk Mods Live!',
                game: 'Cyberpunk 2077',
                viewers: 1247,
                thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face',
                duration: '2h 15m',
                tags: ['Modding', 'Tutorial', 'Live Coding']
            },
            {
                id: 2,
                streamer: 'SkyrimLegend',
                title: 'Testing New Graphics Overhaul - 8K Textures!',
                game: 'Skyrim',
                viewers: 892,
                thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=225&fit=crop',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
                duration: '1h 42m',
                tags: ['Graphics', 'Showcase', 'Q&A']
            },
            {
                id: 3,
                streamer: 'GTAModder',
                title: 'Vehicle Pack Showcase + Installation Guide',
                game: 'GTA V',
                viewers: 634,
                thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=225&fit=crop',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
                duration: '45m',
                tags: ['Vehicles', 'Installation', 'Tips']
            }
        ];

        sampleStreams.forEach(stream => {
            this.liveStreams.set(stream.id, stream);
        });

        this.renderLiveStreams();
        this.loadRecordings();
        this.loadTopCreators();
    }

    loadRecordings() {
        const sampleRecordings = [
            {
                id: 1,
                title: 'Complete Mod Installation Tutorial',
                creator: 'ModMaster2024',
                game: 'Cyberpunk 2077',
                duration: '25:30',
                views: 15420,
                thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop',
                uploadDate: '2 days ago'
            },
            {
                id: 2,
                title: 'Skyrim Graphics Comparison - Before & After',
                creator: 'SkyrimLegend',
                game: 'Skyrim',
                duration: '18:45',
                views: 8930,
                thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=225&fit=crop',
                uploadDate: '1 week ago'
            },
            {
                id: 3,
                title: 'Top 10 Must-Have GTA V Mods',
                creator: 'GTAModder',
                game: 'GTA V',
                duration: '32:15',
                views: 23450,
                thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=225&fit=crop',
                uploadDate: '3 days ago'
            }
        ];

        this.recordings = sampleRecordings;
        this.renderRecordings();
    }

    loadTopCreators() {
        const topCreators = [
            {
                id: 1,
                username: 'ModMaster2024',
                followers: 15420,
                totalViews: 2340000,
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
                specialties: ['Cyberpunk 2077', 'Tutorials', 'Live Coding'],
                isLive: true,
                verified: true
            },
            {
                id: 2,
                username: 'SkyrimLegend',
                followers: 12890,
                totalViews: 1890000,
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
                specialties: ['Skyrim', 'Graphics', 'Reviews'],
                isLive: false,
                verified: true
            },
            {
                id: 3,
                username: 'GTAModder',
                followers: 9650,
                totalViews: 1450000,
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                specialties: ['GTA V', 'Vehicles', 'Showcases'],
                isLive: false,
                verified: false
            }
        ];

        this.renderTopCreators(topCreators);
    }

    renderLiveStreams() {
        const liveStreams = document.getElementById('liveStreams');
        if (!liveStreams) return;

        const streamsHTML = Array.from(this.liveStreams.values()).map(stream => `
            <div class="stream-card" onclick="watchStream(${stream.id})">
                <div class="stream-thumbnail">
                    <img src="${stream.thumbnail}" alt="${stream.title}">
                    <div class="live-badge">
                        <i class="fas fa-circle"></i> LIVE
                    </div>
                    <div class="viewer-count">
                        <i class="fas fa-eye"></i> ${stream.viewers.toLocaleString()}
                    </div>
                    <div class="stream-duration">${stream.duration}</div>
                </div>
                <div class="stream-info">
                    <div class="stream-header">
                        <img src="${stream.avatar}" alt="${stream.streamer}" class="streamer-avatar">
                        <div class="stream-details">
                            <h4 class="stream-title">${stream.title}</h4>
                            <div class="stream-meta">
                                <span class="streamer-name">${stream.streamer}</span>
                                <span class="stream-game">${stream.game}</span>
                            </div>
                        </div>
                    </div>
                    <div class="stream-tags">
                        ${stream.tags.map(tag => `<span class="stream-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        liveStreams.innerHTML = streamsHTML;
    }

    renderRecordings() {
        const recordingsList = document.getElementById('recordingsList');
        if (!recordingsList) return;

        const recordingsHTML = this.recordings.map(recording => `
            <div class="recording-card" onclick="watchRecording(${recording.id})">
                <div class="recording-thumbnail">
                    <img src="${recording.thumbnail}" alt="${recording.title}">
                    <div class="recording-duration">${recording.duration}</div>
                    <div class="play-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="recording-info">
                    <h4 class="recording-title">${recording.title}</h4>
                    <div class="recording-meta">
                        <span class="creator-name">${recording.creator}</span>
                        <span class="recording-game">${recording.game}</span>
                    </div>
                    <div class="recording-stats">
                        <span><i class="fas fa-eye"></i> ${recording.views.toLocaleString()}</span>
                        <span><i class="fas fa-clock"></i> ${recording.uploadDate}</span>
                    </div>
                </div>
            </div>
        `).join('');

        recordingsList.innerHTML = recordingsHTML;
    }

    renderTopCreators(creators) {
        const topCreators = document.getElementById('topCreators');
        if (!topCreators) return;

        const creatorsHTML = creators.map(creator => `
            <div class="creator-card" onclick="viewCreatorProfile(${creator.id})">
                <div class="creator-header">
                    <div class="creator-avatar">
                        <img src="${creator.avatar}" alt="${creator.username}">
                        ${creator.isLive ? '<div class="live-indicator-small">LIVE</div>' : ''}
                        ${creator.verified ? '<div class="verified-badge"><i class="fas fa-check"></i></div>' : ''}
                    </div>
                    <div class="creator-info">
                        <h4 class="creator-name">${creator.username}</h4>
                        <div class="creator-stats">
                            <span><i class="fas fa-users"></i> ${creator.followers.toLocaleString()}</span>
                            <span><i class="fas fa-eye"></i> ${creator.totalViews.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                <div class="creator-specialties">
                    ${creator.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                </div>
                <div class="creator-actions">
                    <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); followCreator(${creator.id})">
                        <i class="fas fa-plus"></i> Follow
                    </button>
                    ${creator.isLive ? 
                        '<button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); watchCreator(' + creator.id + ')">Watch Live</button>' :
                        '<button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); notifyWhenLive(' + creator.id + ')">Notify</button>'
                    }
                </div>
            </div>
        `).join('');

        topCreators.innerHTML = creatorsHTML;
    }

    setupStreamingFeatures() {
        this.addStreamingStyles();
        this.initializeStreamingControls();
    }

    initializeStreamingAPI() {
        // Simulate streaming API initialization
        console.log('🔌 Initializing streaming APIs...');
        
        // Mock API connections
        this.apiConnections = {
            twitch: { connected: true, status: 'ready' },
            youtube: { connected: true, status: 'ready' },
            discord: { connected: false, status: 'disconnected' }
        };
    }

    initializeStreamingControls() {
        // Set up streaming control event listeners
        document.addEventListener('keydown', (e) => {
            // Hotkeys for streaming
            if (e.ctrlKey && e.shiftKey) {
                switch(e.key) {
                    case 'S':
                        e.preventDefault();
                        this.toggleStream();
                        break;
                    case 'R':
                        e.preventDefault();
                        this.recordScreen();
                        break;
                    case 'O':
                        e.preventDefault();
                        this.toggleStreamingOverlay();
                        break;
                }
            }
        });
    }

    addStreamingStyles() {
        const styles = `
            <style>
            .streaming-section {
                background: linear-gradient(135deg, rgba(91, 140, 255, 0.05), rgba(193, 92, 255, 0.05));
                border-top: 1px solid rgba(91, 140, 255, 0.2);
            }
            
            .streaming-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding: 1.5rem;
                background: var(--bg-secondary);
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
            }
            
            .streaming-tabs {
                display: flex;
                gap: 1rem;
            }
            
            .streaming-tab {
                padding: 0.75rem 1.5rem;
                background: none;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .streaming-tab.active {
                background: var(--accent-primary);
                color: white;
                border-color: var(--accent-primary);
            }
            
            .streaming-actions {
                display: flex;
                gap: 1rem;
            }
            
            .streaming-tab-content {
                display: none;
            }
            
            .streaming-tab-content.active {
                display: block;
            }
            
            .streams-grid, .recordings-grid, .creators-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 2rem;
            }
            
            .stream-card, .recording-card {
                background: var(--bg-secondary);
                border-radius: var(--radius-lg);
                overflow: hidden;
                transition: all 0.3s ease;
                cursor: pointer;
                border: 1px solid var(--border-color);
            }
            
            .stream-card:hover, .recording-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            
            .stream-thumbnail, .recording-thumbnail {
                position: relative;
                aspect-ratio: 16/9;
                overflow: hidden;
            }
            
            .stream-thumbnail img, .recording-thumbnail img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }
            
            .stream-card:hover .stream-thumbnail img,
            .recording-card:hover .recording-thumbnail img {
                transform: scale(1.05);
            }
            
            .live-badge {
                position: absolute;
                top: 10px;
                left: 10px;
                background: #ef4444;
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: var(--radius-full);
                font-size: 0.875rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
            
            .viewer-count {
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: var(--radius-full);
                font-size: 0.875rem;
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
            
            .stream-duration, .recording-duration {
                position: absolute;
                bottom: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius-sm);
                font-size: 0.875rem;
                font-weight: 600;
            }
            
            .play-overlay {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 60px;
                height: 60px;
                background: rgba(91, 140, 255, 0.9);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: white;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .recording-card:hover .play-overlay {
                opacity: 1;
            }
            
            .stream-info, .recording-info {
                padding: 1.5rem;
            }
            
            .stream-header {
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .streamer-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
            }
            
            .stream-title, .recording-title {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 0.5rem 0;
                line-height: 1.4;
            }
            
            .stream-meta, .recording-meta {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            
            .streamer-name, .creator-name {
                color: var(--accent-primary);
                font-weight: 500;
            }
            
            .stream-game, .recording-game {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .stream-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-top: 1rem;
            }
            
            .stream-tag, .specialty-tag {
                background: rgba(91, 140, 255, 0.2);
                color: var(--accent-primary);
                padding: 0.25rem 0.75rem;
                border-radius: var(--radius-full);
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .recording-stats {
                display: flex;
                gap: 1rem;
                margin-top: 0.5rem;
                font-size: 0.9rem;
                color: var(--text-secondary);
            }
            
            .creator-card {
                background: var(--bg-secondary);
                border-radius: var(--radius-lg);
                padding: 1.5rem;
                border: 1px solid var(--border-color);
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .creator-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            }
            
            .creator-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .creator-avatar {
                position: relative;
            }
            
            .creator-avatar img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                object-fit: cover;
            }
            
            .live-indicator-small {
                position: absolute;
                bottom: -2px;
                right: -2px;
                background: #ef4444;
                color: white;
                padding: 0.125rem 0.5rem;
                border-radius: var(--radius-full);
                font-size: 0.7rem;
                font-weight: 600;
            }
            
            .verified-badge {
                position: absolute;
                top: -2px;
                right: -2px;
                background: var(--accent-primary);
                color: white;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.7rem;
            }
            
            .creator-name {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 0.5rem 0;
            }
            
            .creator-stats {
                display: flex;
                gap: 1rem;
                font-size: 0.9rem;
                color: var(--text-secondary);
            }
            
            .creator-specialties {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .creator-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .streaming-overlay {
                position: fixed;
                top: 0;
                right: -400px;
                width: 400px;
                height: 100vh;
                background: var(--bg-primary);
                border-left: 1px solid var(--border-color);
                z-index: 10001;
                transition: right 0.3s ease;
                overflow-y: auto;
            }
            
            .streaming-overlay.active {
                right: 0;
            }
            
            .streaming-overlay-content {
                padding: 1.5rem;
            }
            
            .streaming-overlay-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .streaming-status {
                margin-bottom: 2rem;
            }
            
            .status-indicator {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 1rem;
                border-radius: var(--radius-md);
                margin-bottom: 1rem;
            }
            
            .status-indicator.offline {
                background: rgba(107, 114, 128, 0.2);
                color: #6b7280;
            }
            
            .status-indicator.live {
                background: rgba(239, 68, 68, 0.2);
                color: #ef4444;
            }
            
            .status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: currentColor;
            }
            
            .stream-stats {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            
            .stat {
                text-align: center;
                padding: 1rem;
                background: var(--bg-secondary);
                border-radius: var(--radius-md);
            }
            
            .stat-label {
                display: block;
                font-size: 0.875rem;
                color: var(--text-secondary);
                margin-bottom: 0.25rem;
            }
            
            .stat-value {
                display: block;
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--text-primary);
            }
            
            .streaming-controls-panel {
                margin-bottom: 2rem;
            }
            
            .control-group {
                margin-bottom: 1rem;
            }
            
            .control-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: var(--text-primary);
            }
            
            .control-group input,
            .control-group select {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                background: var(--bg-secondary);
                color: var(--text-primary);
            }
            
            .streaming-features {
                border-top: 1px solid var(--border-color);
                padding-top: 1rem;
            }
            
            .feature-toggle {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.75rem;
            }
            
            .feature-toggle input[type="checkbox"] {
                width: auto;
            }
            
            .nav-link.streaming-nav {
                position: relative;
            }
            
            .live-indicator {
                position: absolute;
                top: -5px;
                right: -10px;
                background: #ef4444;
                color: white;
                padding: 0.125rem 0.5rem;
                border-radius: var(--radius-full);
                font-size: 0.7rem;
                font-weight: 600;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            .recordings-filters {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .recordings-filters select {
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                background: var(--bg-secondary);
                color: var(--text-primary);
            }
            
            @media (max-width: 768px) {
                .streaming-controls {
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .streaming-tabs {
                    width: 100%;
                    justify-content: center;
                }
                
                .streams-grid, .recordings-grid, .creators-grid {
                    grid-template-columns: 1fr;
                }
                
                .streaming-overlay {
                    width: 100%;
                    right: -100%;
                }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Global functions for streaming features
window.showStreamingTab = function(tabName) {
    // Hide all tabs
    document.querySelectorAll('.streaming-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.streaming-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + 'Tab');
    const selectedButton = document.querySelector(`[onclick="showStreamingTab('${tabName}')"]`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedButton) selectedButton.classList.add('active');
};

window.startStreaming = function() {
    toggleStreamingOverlay();
};

window.toggleStreamingOverlay = function() {
    const overlay = document.getElementById('streamingOverlay');
    if (overlay) {
        overlay.classList.toggle('active');
    }
};

window.toggleStream = function() {
    const statusIndicator = document.getElementById('streamStatus');
    const startBtn = document.getElementById('startStreamBtn');
    const streamStats = document.getElementById('streamStats');
    const navIndicator = document.getElementById('navLiveIndicator');
    
    if (statusIndicator.classList.contains('offline')) {
        // Start streaming
        statusIndicator.classList.remove('offline');
        statusIndicator.classList.add('live');
        statusIndicator.querySelector('.status-text').textContent = 'Live';
        startBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Stream';
        streamStats.style.display = 'grid';
        navIndicator.style.display = 'block';
        
        // Start viewer count simulation
        let viewers = 0;
        const viewerInterval = setInterval(() => {
            viewers += Math.floor(Math.random() * 5) + 1;
            document.getElementById('viewerCount').textContent = viewers;
        }, 5000);
        
        // Start duration timer
        let duration = 0;
        const durationInterval = setInterval(() => {
            duration++;
            const hours = Math.floor(duration / 3600);
            const minutes = Math.floor((duration % 3600) / 60);
            const seconds = duration % 60;
            document.getElementById('streamDuration').textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
        
        window.streamIntervals = { viewerInterval, durationInterval };
    } else {
        // Stop streaming
        statusIndicator.classList.remove('live');
        statusIndicator.classList.add('offline');
        statusIndicator.querySelector('.status-text').textContent = 'Offline';
        startBtn.innerHTML = '<i class="fas fa-play"></i> Start Stream';
        streamStats.style.display = 'none';
        navIndicator.style.display = 'none';
        
        // Clear intervals
        if (window.streamIntervals) {
            clearInterval(window.streamIntervals.viewerInterval);
            clearInterval(window.streamIntervals.durationInterval);
        }
    }
};

window.recordScreen = function() {
    console.log('🎥 Starting screen recording...');
    // Implementation for screen recording
};

window.watchStream = function(streamId) {
    console.log('📺 Watching stream:', streamId);
    // Implementation for watching streams
};

window.watchRecording = function(recordingId) {
    console.log('▶️ Playing recording:', recordingId);
    // Implementation for playing recordings
};

window.viewCreatorProfile = function(creatorId) {
    console.log('👤 Viewing creator profile:', creatorId);
    // Implementation for creator profiles
};

window.followCreator = function(creatorId) {
    console.log('➕ Following creator:', creatorId);
    // Implementation for following creators
};

// Initialize Streaming Integration System
document.addEventListener('DOMContentLoaded', () => {
    window.streamingIntegration = new StreamingIntegrationSystem();
});

console.log('✅ Streaming Integration System loaded successfully!');