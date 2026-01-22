// REAL-TIME COMMUNITY CHAT SYSTEM
// Advanced chat with channels, private messages, moderation, and real-time updates

class CommunityChat {
    constructor() {
        this.channels = {};
        this.activeChannel = 'general';
        this.currentUser = null;
        this.messages = {};
        this.privateMessages = {};
        this.onlineUsers = {};
        this.moderators = ['admin', 'moderator'];
        this.bannedUsers = [];
        this.chatSettings = {
            soundEnabled: true,
            notificationsEnabled: true,
            showTimestamps: true,
            autoScroll: true,
            fontSize: 'medium'
        };
        
        this.init();
    }

    init() {
        this.loadChatData();
        this.loadUserData();
        this.createChatUI();
        this.setupEventHandlers();
        this.startRealTimeUpdates();
        this.loadDefaultChannels();
        
        console.log('💬 Community Chat System Initialized');
    }

    loadChatData() {
        // Load existing messages
        const savedMessages = localStorage.getItem('exuscraft_chat_messages');
        if (savedMessages) {
            this.messages = JSON.parse(savedMessages);
        }
        
        // Load private messages
        const savedPrivateMessages = localStorage.getItem('exuscraft_private_messages');
        if (savedPrivateMessages) {
            this.privateMessages = JSON.parse(savedPrivateMessages);
        }
        
        // Load chat settings
        const savedSettings = localStorage.getItem('exuscraft_chat_settings');
        if (savedSettings) {
            this.chatSettings = { ...this.chatSettings, ...JSON.parse(savedSettings) };
        }
    }

    loadUserData() {
        const userData = localStorage.getItem('exuscraft_user_data');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        } else {
            this.currentUser = {
                id: 'guest_' + Date.now(),
                username: 'Guest' + Math.floor(Math.random() * 1000),
                avatar: this.generateAvatar('Guest'),
                isGuest: true,
                role: 'user'
            };
        }
        
        // Add user to online users
        this.onlineUsers[this.currentUser.id] = {
            ...this.currentUser,
            lastSeen: Date.now(),
            status: 'online'
        };
    }

    generateAvatar(username) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
        const color = colors[username.length % colors.length];
        const initial = username.charAt(0).toUpperCase();
        
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect fill='${encodeURIComponent(color)}' width='32' height='32' rx='16'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3E${initial}%3C/text%3E%3C/svg%3E`;
    }

    loadDefaultChannels() {
        this.channels = {
            'general': {
                id: 'general',
                name: 'General',
                description: 'General discussion about mods and games',
                icon: '💬',
                memberCount: 1247,
                isPublic: true,
                category: 'General'
            },
            'mod-showcase': {
                id: 'mod-showcase',
                name: 'Mod Showcase',
                description: 'Share and discover amazing mods',
                icon: '🎮',
                memberCount: 892,
                isPublic: true,
                category: 'Mods'
            },
            'help-support': {
                id: 'help-support',
                name: 'Help & Support',
                description: 'Get help with mods and technical issues',
                icon: '🆘',
                memberCount: 634,
                isPublic: true,
                category: 'Support'
            },
            'creators-lounge': {
                id: 'creators-lounge',
                name: 'Creators Lounge',
                description: 'For mod creators to collaborate and share tips',
                icon: '🛠️',
                memberCount: 156,
                isPublic: true,
                category: 'Creators'
            },
            'off-topic': {
                id: 'off-topic',
                name: 'Off Topic',
                description: 'Casual conversations about anything',
                icon: '🎭',
                memberCount: 723,
                isPublic: true,
                category: 'General'
            }
        };
        
        // Initialize messages for channels if they don't exist
        Object.keys(this.channels).forEach(channelId => {
            if (!this.messages[channelId]) {
                this.messages[channelId] = this.generateSampleMessages(channelId);
            }
        });
    }

    generateSampleMessages(channelId) {
        const sampleMessages = {
            'general': [
                {
                    id: 'msg_001',
                    userId: 'user_123',
                    username: 'ModMaster2024',
                    avatar: this.generateAvatar('ModMaster2024'),
                    content: 'Just released a new graphics overhaul for Cyberpunk 2077! Check it out in the showcase channel 🎮',
                    timestamp: Date.now() - 3600000,
                    reactions: { '🔥': 12, '👍': 8, '😍': 5 },
                    replies: []
                },
                {
                    id: 'msg_002',
                    userId: 'user_456',
                    username: 'GameEnthusiast',
                    avatar: this.generateAvatar('GameEnthusiast'),
                    content: 'Has anyone tried the new Skyrim survival mod? Looks amazing!',
                    timestamp: Date.now() - 1800000,
                    reactions: { '👍': 3, '🤔': 2 },
                    replies: [
                        {
                            id: 'reply_001',
                            userId: 'user_789',
                            username: 'SkyrimVet',
                            content: 'Yes! It\'s incredible. Really changes the whole experience.',
                            timestamp: Date.now() - 1500000
                        }
                    ]
                }
            ],
            'mod-showcase': [
                {
                    id: 'msg_003',
                    userId: 'user_789',
                    username: 'CreativeBuilder',
                    avatar: this.generateAvatar('CreativeBuilder'),
                    content: '🎨 New texture pack for Minecraft! 4K resolution with PBR materials. Download link in bio!',
                    timestamp: Date.now() - 7200000,
                    reactions: { '🔥': 25, '😍': 18, '👏': 12 },
                    replies: []
                }
            ]
        };
        
        return sampleMessages[channelId] || [];
    }

    createChatUI() {
        // Create floating chat button
        const chatButton = document.createElement('button');
        chatButton.id = 'chatToggleBtn';
        chatButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 80px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #5B8CFF, #C15CFF);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 8px 25px rgba(91, 140, 255, 0.4);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        chatButton.innerHTML = '💬';
        chatButton.title = 'Community Chat';
        
        // Add notification badge
        const badge = document.createElement('div');
        badge.id = 'chatNotificationBadge';
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
        chatButton.appendChild(badge);
        
        document.body.appendChild(chatButton);
        
        // Create chat panel
        this.createChatPanel();
        
        // Setup button handler
        chatButton.addEventListener('click', () => {
            this.toggleChatPanel();
        });
    }

    createChatPanel() {
        const panel = document.createElement('div');
        panel.id = 'communityChat';
        panel.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 400px;
            height: 600px;
            background: rgba(10, 14, 20, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(91, 140, 255, 0.3);
            border-radius: 20px;
            z-index: 1001;
            display: none;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            transform: translateY(100px) scale(0.9);
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        panel.innerHTML = `
            <!-- Chat Header -->
            <div style="
                padding: 1rem 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
            ">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background: #22C55E;
                        animation: pulse 2s ease-in-out infinite;
                    "></div>
                    <h3 style="margin: 0; color: white; font-size: 1.1rem; font-weight: 600;">Community Chat</h3>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button id="chatSettingsBtn" style="
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 1rem;
                        cursor: pointer;
                        padding: 0.25rem;
                        border-radius: 4px;
                    " title="Settings">⚙️</button>
                    <button id="closeChatBtn" style="
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 1.2rem;
                        cursor: pointer;
                        padding: 0.25rem;
                        border-radius: 4px;
                    ">×</button>
                </div>
            </div>
            
            <!-- Channel Tabs -->
            <div style="
                display: flex;
                overflow-x: auto;
                padding: 0.75rem 1rem 0 1rem;
                gap: 0.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            " id="channelTabs">
                ${Object.values(this.channels).map(channel => `
                    <button class="channel-tab ${channel.id === this.activeChannel ? 'active' : ''}" 
                            data-channel="${channel.id}" style="
                        background: ${channel.id === this.activeChannel ? 'rgba(91, 140, 255, 0.2)' : 'none'};
                        border: 1px solid ${channel.id === this.activeChannel ? 'rgba(91, 140, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
                        color: ${channel.id === this.activeChannel ? '#5B8CFF' : 'rgba(255, 255, 255, 0.7)'};
                        padding: 0.5rem 0.75rem;
                        border-radius: 12px;
                        cursor: pointer;
                        font-size: 0.8rem;
                        white-space: nowrap;
                        transition: all 0.3s ease;
                    ">
                        ${channel.icon} ${channel.name}
                    </button>
                `).join('')}
            </div>
            
            <!-- Online Users -->
            <div style="
                padding: 0.75rem 1rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 0.8rem;
                color: rgba(255, 255, 255, 0.6);
            ">
                <span id="onlineCount">${Object.keys(this.onlineUsers).length}</span> online in 
                <span id="currentChannelName">${this.channels[this.activeChannel].name}</span>
            </div>
            
            <!-- Messages Container -->
            <div id="messagesContainer" style="
                flex: 1;
                overflow-y: auto;
                padding: 1rem;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            ">
                ${this.generateMessagesHTML(this.activeChannel)}
            </div>
            
            <!-- Message Input -->
            <div style="
                padding: 1rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            ">
                <div style="
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 12px;
                    padding: 0.75rem;
                    gap: 0.75rem;
                ">
                    <input type="text" id="messageInput" placeholder="Type a message..." style="
                        background: none;
                        border: none;
                        color: white;
                        flex: 1;
                        outline: none;
                        font-size: 0.9rem;
                    ">
                    <button id="emojiBtn" style="
                        background: none;
                        border: none;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 1rem;
                        cursor: pointer;
                    ">😊</button>
                    <button id="sendMessageBtn" style="
                        background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                        border: none;
                        color: white;
                        padding: 0.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 0.9rem;
                    ">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.setupChatHandlers();
    }

    generateMessagesHTML(channelId) {
        const messages = this.messages[channelId] || [];
        
        if (messages.length === 0) {
            return `
                <div style="text-align: center; color: rgba(255, 255, 255, 0.5); padding: 2rem;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">${this.channels[channelId].icon}</div>
                    <p>Welcome to ${this.channels[channelId].name}!</p>
                    <p style="font-size: 0.8rem;">${this.channels[channelId].description}</p>
                </div>
            `;
        }
        
        return messages.map(message => this.generateMessageHTML(message)).join('');
    }

    generateMessageHTML(message) {
        const timeAgo = this.getTimeAgo(message.timestamp);
        const isOwnMessage = message.userId === this.currentUser.id;
        
        return `
            <div class="chat-message" data-message-id="${message.id}" style="
                display: flex;
                gap: 0.75rem;
                ${isOwnMessage ? 'flex-direction: row-reverse;' : ''}
            ">
                <img src="${message.avatar}" alt="${message.username}" style="
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    flex-shrink: 0;
                ">
                
                <div style="flex: 1; ${isOwnMessage ? 'text-align: right;' : ''}">
                    <div style="
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        margin-bottom: 0.25rem;
                        ${isOwnMessage ? 'justify-content: flex-end;' : ''}
                    ">
                        <span style="
                            color: white;
                            font-weight: 600;
                            font-size: 0.85rem;
                        ">${message.username}</span>
                        <span style="
                            color: rgba(255, 255, 255, 0.5);
                            font-size: 0.7rem;
                        ">${timeAgo}</span>
                    </div>
                    
                    <div style="
                        background: ${isOwnMessage ? 'linear-gradient(135deg, #5B8CFF, #C15CFF)' : 'rgba(255, 255, 255, 0.1)'};
                        padding: 0.75rem;
                        border-radius: 12px;
                        color: white;
                        font-size: 0.9rem;
                        line-height: 1.4;
                        max-width: 80%;
                        ${isOwnMessage ? 'margin-left: auto;' : ''}
                    ">
                        ${this.formatMessageContent(message.content)}
                    </div>
                    
                    <!-- Reactions -->
                    ${message.reactions && Object.keys(message.reactions).length > 0 ? `
                        <div style="
                            display: flex;
                            gap: 0.25rem;
                            margin-top: 0.5rem;
                            ${isOwnMessage ? 'justify-content: flex-end;' : ''}
                        ">
                            ${Object.entries(message.reactions).map(([emoji, count]) => `
                                <button class="reaction-btn" data-emoji="${emoji}" style="
                                    background: rgba(91, 140, 255, 0.2);
                                    border: 1px solid rgba(91, 140, 255, 0.3);
                                    border-radius: 12px;
                                    padding: 0.2rem 0.5rem;
                                    font-size: 0.7rem;
                                    color: white;
                                    cursor: pointer;
                                ">${emoji} ${count}</button>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <!-- Replies -->
                    ${message.replies && message.replies.length > 0 ? `
                        <div style="
                            margin-top: 0.75rem;
                            padding-left: 1rem;
                            border-left: 2px solid rgba(91, 140, 255, 0.3);
                        ">
                            ${message.replies.map(reply => `
                                <div style="
                                    background: rgba(91, 140, 255, 0.1);
                                    padding: 0.5rem;
                                    border-radius: 8px;
                                    margin-bottom: 0.5rem;
                                ">
                                    <div style="
                                        display: flex;
                                        align-items: center;
                                        gap: 0.5rem;
                                        margin-bottom: 0.25rem;
                                    ">
                                        <span style="color: #5B8CFF; font-weight: 600; font-size: 0.8rem;">
                                            ${reply.username}
                                        </span>
                                        <span style="color: rgba(255, 255, 255, 0.5); font-size: 0.7rem;">
                                            ${this.getTimeAgo(reply.timestamp)}
                                        </span>
                                    </div>
                                    <div style="color: rgba(255, 255, 255, 0.9); font-size: 0.8rem;">
                                        ${reply.content}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    formatMessageContent(content) {
        // Format URLs
        content = content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #5B8CFF; text-decoration: underline;">$1</a>');
        
        // Format mentions
        content = content.replace(/@(\w+)/g, '<span style="color: #5B8CFF; font-weight: 600;">@$1</span>');
        
        // Format emojis (basic)
        content = content.replace(/:\)/g, '😊');
        content = content.replace(/:\(/g, '😢');
        content = content.replace(/:D/g, '😃');
        content = content.replace(/<3/g, '❤️');
        
        return content;
    }

    setupChatHandlers() {
        // Close chat
        document.getElementById('closeChatBtn').addEventListener('click', () => {
            this.toggleChatPanel();
        });
        
        // Channel switching
        document.querySelectorAll('.channel-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const channelId = tab.dataset.channel;
                this.switchChannel(channelId);
            });
        });
        
        // Send message
        const sendBtn = document.getElementById('sendMessageBtn');
        const messageInput = document.getElementById('messageInput');
        
        sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Emoji button
        document.getElementById('emojiBtn').addEventListener('click', () => {
            this.showEmojiPicker();
        });
        
        // Settings button
        document.getElementById('chatSettingsBtn').addEventListener('click', () => {
            this.showChatSettings();
        });
        
        // Reaction buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('reaction-btn')) {
                const emoji = e.target.dataset.emoji;
                const messageId = e.target.closest('.chat-message').dataset.messageId;
                this.toggleReaction(messageId, emoji);
            }
        });
    }

    toggleChatPanel() {
        const panel = document.getElementById('communityChat');
        const isVisible = panel.style.display === 'flex';
        
        if (isVisible) {
            panel.style.transform = 'translateY(100px) scale(0.9)';
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
            
            // Auto-scroll to bottom
            setTimeout(() => {
                this.scrollToBottom();
            }, 100);
        }
    }

    switchChannel(channelId) {
        this.activeChannel = channelId;
        
        // Update active tab
        document.querySelectorAll('.channel-tab').forEach(tab => {
            const isActive = tab.dataset.channel === channelId;
            tab.style.background = isActive ? 'rgba(91, 140, 255, 0.2)' : 'none';
            tab.style.borderColor = isActive ? 'rgba(91, 140, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)';
            tab.style.color = isActive ? '#5B8CFF' : 'rgba(255, 255, 255, 0.7)';
        });
        
        // Update messages
        const messagesContainer = document.getElementById('messagesContainer');
        messagesContainer.innerHTML = this.generateMessagesHTML(channelId);
        
        // Update channel name
        document.getElementById('currentChannelName').textContent = this.channels[channelId].name;
        
        // Scroll to bottom
        setTimeout(() => {
            this.scrollToBottom();
        }, 100);
    }

    sendMessage() {
        const input = document.getElementById('messageInput');
        const content = input.value.trim();
        
        if (!content) return;
        
        const message = {
            id: 'msg_' + Date.now(),
            userId: this.currentUser.id,
            username: this.currentUser.username,
            avatar: this.currentUser.avatar,
            content: content,
            timestamp: Date.now(),
            reactions: {},
            replies: []
        };
        
        // Add message to channel
        if (!this.messages[this.activeChannel]) {
            this.messages[this.activeChannel] = [];
        }
        this.messages[this.activeChannel].push(message);
        
        // Clear input
        input.value = '';
        
        // Update UI
        this.updateMessagesDisplay();
        
        // Save messages
        this.saveChatData();
        
        // Play sound
        if (this.chatSettings.soundEnabled) {
            this.playMessageSound();
        }
        
        // Scroll to bottom
        setTimeout(() => {
            this.scrollToBottom();
        }, 100);
    }

    updateMessagesDisplay() {
        const messagesContainer = document.getElementById('messagesContainer');
        messagesContainer.innerHTML = this.generateMessagesHTML(this.activeChannel);
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer && this.chatSettings.autoScroll) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    showEmojiPicker() {
        const emojis = ['😊', '😂', '❤️', '👍', '👎', '🔥', '💯', '🎉', '😍', '🤔', '😢', '😡', '👏', '🙌', '💪'];
        
        const picker = document.createElement('div');
        picker.style.cssText = `
            position: absolute;
            bottom: 60px;
            right: 20px;
            background: rgba(10, 14, 20, 0.95);
            border: 1px solid rgba(91, 140, 255, 0.3);
            border-radius: 12px;
            padding: 1rem;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 0.5rem;
            z-index: 1002;
        `;
        
        emojis.forEach(emoji => {
            const btn = document.createElement('button');
            btn.textContent = emoji;
            btn.style.cssText = `
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 6px;
                transition: background 0.2s ease;
            `;
            btn.addEventListener('click', () => {
                const input = document.getElementById('messageInput');
                input.value += emoji;
                input.focus();
                picker.remove();
            });
            btn.addEventListener('mouseover', () => {
                btn.style.background = 'rgba(91, 140, 255, 0.2)';
            });
            btn.addEventListener('mouseout', () => {
                btn.style.background = 'none';
            });
            picker.appendChild(btn);
        });
        
        document.body.appendChild(picker);
        
        // Remove on outside click
        setTimeout(() => {
            document.addEventListener('click', function removePickerHandler(e) {
                if (!picker.contains(e.target) && e.target.id !== 'emojiBtn') {
                    picker.remove();
                    document.removeEventListener('click', removePickerHandler);
                }
            });
        }, 100);
    }

    showChatSettings() {
        const modal = document.createElement('div');
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
                border: 1px solid rgba(91, 140, 255, 0.3);
                border-radius: 20px;
                padding: 2rem;
                max-width: 400px;
                width: 90%;
            ">
                <h3 style="margin: 0 0 1.5rem 0; color: white;">Chat Settings</h3>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
                        <input type="checkbox" ${this.chatSettings.soundEnabled ? 'checked' : ''} id="soundEnabled">
                        <span style="color: rgba(255, 255, 255, 0.8);">Sound notifications</span>
                    </label>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
                        <input type="checkbox" ${this.chatSettings.notificationsEnabled ? 'checked' : ''} id="notificationsEnabled">
                        <span style="color: rgba(255, 255, 255, 0.8);">Desktop notifications</span>
                    </label>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
                        <input type="checkbox" ${this.chatSettings.showTimestamps ? 'checked' : ''} id="showTimestamps">
                        <span style="color: rgba(255, 255, 255, 0.8);">Show timestamps</span>
                    </label>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
                        <input type="checkbox" ${this.chatSettings.autoScroll ? 'checked' : ''} id="autoScroll">
                        <span style="color: rgba(255, 255, 255, 0.8);">Auto-scroll to new messages</span>
                    </label>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <label style="display: block; color: rgba(255, 255, 255, 0.8); margin-bottom: 0.5rem;">Font size</label>
                    <select id="fontSize" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 0.5rem;
                        border-radius: 6px;
                        width: 100%;
                    ">
                        <option value="small" ${this.chatSettings.fontSize === 'small' ? 'selected' : ''}>Small</option>
                        <option value="medium" ${this.chatSettings.fontSize === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="large" ${this.chatSettings.fontSize === 'large' ? 'selected' : ''}>Large</option>
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
                    <button id="saveSettings" style="
                        background: linear-gradient(135deg, #5B8CFF, #C15CFF);
                        border: none;
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Save</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Save settings handler
        modal.querySelector('#saveSettings').addEventListener('click', () => {
            this.chatSettings.soundEnabled = modal.querySelector('#soundEnabled').checked;
            this.chatSettings.notificationsEnabled = modal.querySelector('#notificationsEnabled').checked;
            this.chatSettings.showTimestamps = modal.querySelector('#showTimestamps').checked;
            this.chatSettings.autoScroll = modal.querySelector('#autoScroll').checked;
            this.chatSettings.fontSize = modal.querySelector('#fontSize').value;
            
            this.saveChatData();
            modal.remove();
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    toggleReaction(messageId, emoji) {
        const channelMessages = this.messages[this.activeChannel];
        const message = channelMessages.find(m => m.id === messageId);
        
        if (message) {
            if (!message.reactions) {
                message.reactions = {};
            }
            
            if (message.reactions[emoji]) {
                message.reactions[emoji]++;
            } else {
                message.reactions[emoji] = 1;
            }
            
            this.updateMessagesDisplay();
            this.saveChatData();
        }
    }

    playMessageSound() {
        // Create a simple beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    startRealTimeUpdates() {
        // Simulate real-time updates
        setInterval(() => {
            this.updateOnlineUsers();
            this.checkForNewMessages();
        }, 30000); // Every 30 seconds
    }

    updateOnlineUsers() {
        // Simulate users coming online/offline
        const userCount = Math.floor(Math.random() * 50) + Object.keys(this.onlineUsers).length;
        document.getElementById('onlineCount').textContent = userCount;
    }

    checkForNewMessages() {
        // Simulate receiving new messages occasionally
        if (Math.random() < 0.3) { // 30% chance
            this.simulateIncomingMessage();
        }
    }

    simulateIncomingMessage() {
        const randomUsers = [
            { username: 'ModExplorer', avatar: this.generateAvatar('ModExplorer') },
            { username: 'GameDev2024', avatar: this.generateAvatar('GameDev2024') },
            { username: 'PixelArtist', avatar: this.generateAvatar('PixelArtist') }
        ];
        
        const randomMessages = [
            'Just found an amazing new shader pack! 🔥',
            'Anyone know how to fix texture loading issues?',
            'Working on a new quest mod for Skyrim 🗡️',
            'The new update looks incredible!',
            'Thanks for all the help with my mod project! 🙏'
        ];
        
        const user = randomUsers[Math.floor(Math.random() * randomUsers.length)];
        const content = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        
        const message = {
            id: 'msg_' + Date.now(),
            userId: 'sim_' + Date.now(),
            username: user.username,
            avatar: user.avatar,
            content: content,
            timestamp: Date.now(),
            reactions: {},
            replies: []
        };
        
        // Add to random channel
        const channels = Object.keys(this.channels);
        const randomChannel = channels[Math.floor(Math.random() * channels.length)];
        
        if (!this.messages[randomChannel]) {
            this.messages[randomChannel] = [];
        }
        this.messages[randomChannel].push(message);
        
        // Update UI if viewing this channel
        if (randomChannel === this.activeChannel) {
            this.updateMessagesDisplay();
            setTimeout(() => {
                this.scrollToBottom();
            }, 100);
        }
        
        // Show notification
        this.showNotification(user.username, content, randomChannel);
        
        // Save messages
        this.saveChatData();
    }

    showNotification(username, content, channel) {
        if (!this.chatSettings.notificationsEnabled) return;
        
        // Update notification badge
        const badge = document.getElementById('chatNotificationBadge');
        if (badge && channel !== this.activeChannel) {
            badge.style.display = 'flex';
            badge.textContent = '1';
            
            // Hide after 5 seconds
            setTimeout(() => {
                badge.style.display = 'none';
            }, 5000);
        }
        
        // Desktop notification
        if (Notification.permission === 'granted') {
            new Notification(`${username} in ${this.channels[channel].name}`, {
                body: content,
                icon: '/favicon.svg'
            });
        }
    }

    getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'now';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        return `${days}d`;
    }

    saveChatData() {
        localStorage.setItem('exuscraft_chat_messages', JSON.stringify(this.messages));
        localStorage.setItem('exuscraft_private_messages', JSON.stringify(this.privateMessages));
        localStorage.setItem('exuscraft_chat_settings', JSON.stringify(this.chatSettings));
    }

    // Public API methods
    sendMessageToChannel(channelId, content) {
        const oldChannel = this.activeChannel;
        this.activeChannel = channelId;
        
        const input = document.getElementById('messageInput');
        input.value = content;
        this.sendMessage();
        
        this.activeChannel = oldChannel;
    }

    joinChannel(channelId) {
        if (this.channels[channelId]) {
            this.switchChannel(channelId);
            this.toggleChatPanel();
        }
    }

    getChannels() {
        return this.channels;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize Community Chat
let communityChat;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
        
        communityChat = new CommunityChat();
    });
} else {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    
    communityChat = new CommunityChat();
}

window.communityChat = communityChat;