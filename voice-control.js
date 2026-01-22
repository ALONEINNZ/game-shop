// VOICE SEARCH & COMMANDS SYSTEM
// Speech recognition for hands-free navigation

class VoiceControl {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.isSupported = false;
        this.commands = {};
        this.lastCommand = '';
        this.confidence = 0;
        
        this.init();
    }

    init() {
        this.checkSupport();
        this.setupRecognition();
        this.registerCommands();
        this.createVoiceUI();
        
        console.log('🎤 Voice Control System Loaded!');
    }

    checkSupport() {
        this.isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
        
        if (!this.isSupported) {
            console.warn('Speech recognition not supported in this browser');
            return;
        }
    }

    setupRecognition() {
        if (!this.isSupported) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
        this.recognition.maxAlternatives = 3;

        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateVoiceUI();
            this.showVoiceNotification('Listening...', 'info');
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateVoiceUI();
        };

        this.recognition.onresult = (event) => {
            const result = event.results[0];
            const transcript = result[0].transcript.toLowerCase().trim();
            this.confidence = result[0].confidence;
            
            console.log(`🎤 Voice command: "${transcript}" (${Math.round(this.confidence * 100)}% confidence)`);
            
            this.processCommand(transcript);
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.showVoiceNotification(`Error: ${event.error}`, 'error');
            this.isListening = false;
            this.updateVoiceUI();
        };
    }

    registerCommands() {
        this.commands = {
            // Navigation commands
            'go home': () => this.scrollToSection('hero'),
            'go to top': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
            'scroll down': () => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' }),
            'scroll up': () => window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' }),
            
            // Search commands
            'search for': (query) => this.performSearch(query),
            'find': (query) => this.performSearch(query),
            'look for': (query) => this.performSearch(query),
            
            // Filter commands
            'show minecraft mods': () => this.filterByGame('Minecraft'),
            'show skyrim mods': () => this.filterByGame('Skyrim'),
            'show cyberpunk mods': () => this.filterByGame('Cyberpunk 2077'),
            'show gta mods': () => this.filterByGame('GTA V'),
            'show free mods': () => this.filterByPrice('free'),
            'show paid mods': () => this.filterByPrice('paid'),
            
            // Theme commands
            'dark mode': () => this.setTheme('dark'),
            'light mode': () => this.setTheme('light'),
            'cyberpunk theme': () => this.setTheme('cyberpunk'),
            'neon theme': () => this.setTheme('neon'),
            
            // Performance commands
            'high performance': () => this.setPerformance('high'),
            'low performance': () => this.setPerformance('low'),
            'turn off effects': () => this.setPerformance('off'),
            
            // UI commands
            'open menu': () => this.toggleMobileMenu(),
            'close menu': () => this.closeMobileMenu(),
            'show recommendations': () => this.scrollToSection('ai-recommendations'),
            'show games': () => this.scrollToSection('games'),
            
            // Fun commands
            'surprise me': () => this.surpriseMe(),
            'random mod': () => this.showRandomMod(),
            'easter egg': () => this.triggerEasterEgg(),
            
            // Help commands
            'help': () => this.showHelp(),
            'what can you do': () => this.showHelp(),
            'voice commands': () => this.showHelp()
        };
    }

    processCommand(transcript) {
        this.lastCommand = transcript;
        let commandExecuted = false;

        // Direct command matching
        if (this.commands[transcript]) {
            this.commands[transcript]();
            commandExecuted = true;
        } else {
            // Partial matching for search commands
            for (const [command, handler] of Object.entries(this.commands)) {
                if (transcript.startsWith(command)) {
                    const query = transcript.replace(command, '').trim();
                    if (query) {
                        handler(query);
                        commandExecuted = true;
                        break;
                    }
                }
            }
        }

        if (commandExecuted) {
            this.showVoiceNotification(`✓ Executed: "${transcript}"`, 'success');
        } else {
            this.showVoiceNotification(`❓ Unknown command: "${transcript}"`, 'warning');
            this.suggestSimilarCommands(transcript);
        }
    }

    suggestSimilarCommands(transcript) {
        const suggestions = [];
        const words = transcript.split(' ');
        
        // Find similar commands
        Object.keys(this.commands).forEach(command => {
            const commandWords = command.split(' ');
            const similarity = this.calculateSimilarity(words, commandWords);
            
            if (similarity > 0.3) {
                suggestions.push({ command, similarity });
            }
        });

        if (suggestions.length > 0) {
            suggestions.sort((a, b) => b.similarity - a.similarity);
            const topSuggestion = suggestions[0].command;
            
            setTimeout(() => {
                this.showVoiceNotification(`💡 Did you mean: "${topSuggestion}"?`, 'info');
            }, 2000);
        }
    }

    calculateSimilarity(words1, words2) {
        const set1 = new Set(words1);
        const set2 = new Set(words2);
        const intersection = new Set([...set1].filter(x => set2.has(x)));
        const union = new Set([...set1, ...set2]);
        
        return intersection.size / union.size;
    }

    // Command implementations
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    performSearch(query) {
        const searchInput = document.getElementById('gameSearch') || document.getElementById('navSearch');
        if (searchInput) {
            searchInput.value = query;
            searchInput.dispatchEvent(new Event('input'));
            
            // Trigger search
            if (window.searchMods) {
                window.searchMods(query);
            }
        }
    }

    filterByGame(game) {
        const gameFilter = document.getElementById('gameFilter');
        if (gameFilter) {
            gameFilter.value = game;
            gameFilter.dispatchEvent(new Event('change'));
        }
    }

    filterByPrice(priceType) {
        // Implement price filtering logic
        const allCards = document.querySelectorAll('.game-card');
        allCards.forEach(card => {
            const priceElement = card.querySelector('.game-price');
            if (priceElement) {
                const price = priceElement.textContent.toLowerCase();
                const isFree = price.includes('free') || price.includes('$0');
                
                if (priceType === 'free' && !isFree) {
                    card.style.display = 'none';
                } else if (priceType === 'paid' && isFree) {
                    card.style.display = 'none';
                } else {
                    card.style.display = 'block';
                }
            }
        });
    }

    setTheme(theme) {
        if (window.darkModeSystem) {
            window.darkModeSystem.applyTheme(theme);
        }
    }

    setPerformance(level) {
        if (window.toggle3DPerformance) {
            // Cycle to desired performance level
            const modes = ['auto', 'high', 'low', 'off'];
            const targetIndex = modes.indexOf(level);
            
            if (targetIndex !== -1) {
                window.currentPerformanceMode = modes[targetIndex];
                window.apply3DPerformanceMode(level);
            }
        }
    }

    toggleMobileMenu() {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) {
            mobileNav.classList.add('show');
        }
    }

    closeMobileMenu() {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) {
            mobileNav.classList.remove('show');
        }
    }

    surpriseMe() {
        // Random action for fun
        const actions = [
            () => this.setTheme('cyberpunk'),
            () => this.scrollToSection('ai-recommendations'),
            () => this.performSearch('graphics'),
            () => this.triggerEasterEgg()
        ];
        
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        randomAction();
    }

    showRandomMod() {
        const modCards = document.querySelectorAll('.game-card');
        if (modCards.length > 0) {
            const randomCard = modCards[Math.floor(Math.random() * modCards.length)];
            randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            randomCard.style.animation = 'pulse 1s ease-in-out';
        }
    }

    triggerEasterEgg() {
        // Fun easter egg
        const messages = [
            '🎮 ExusCraft is awesome!',
            '🚀 Voice control activated!',
            '✨ You found the easter egg!',
            '🤖 AI is watching you...',
            '🎯 Nice voice command!'
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showVoiceNotification(randomMessage, 'success');
        
        // Add some visual flair
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }

    showHelp() {
        const helpCommands = [
            'Navigation: "go home", "scroll down", "go to top"',
            'Search: "search for [query]", "find [query]"',
            'Filters: "show minecraft mods", "show free mods"',
            'Themes: "dark mode", "cyberpunk theme"',
            'Performance: "high performance", "turn off effects"',
            'Fun: "surprise me", "random mod", "easter egg"'
        ];
        
        const helpText = helpCommands.join('\n');
        this.showVoiceNotification('Voice Commands:\n' + helpText, 'info', 8000);
    }

    createVoiceUI() {
        // Create voice control button
        const voiceButton = document.createElement('button');
        voiceButton.id = 'voice-control-btn';
        voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, #FF6B6B, #FF8E53);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 1.4rem;
            box-shadow: 0 8px 32px rgba(255, 107, 107, 0.4);
            transition: all 0.3s ease;
            z-index: 99998;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        voiceButton.addEventListener('click', () => {
            this.toggleListening();
        });

        voiceButton.addEventListener('mouseenter', () => {
            voiceButton.style.transform = 'translateY(-2px) scale(1.05)';
            voiceButton.style.boxShadow = '0 12px 40px rgba(255, 107, 107, 0.6)';
        });

        voiceButton.addEventListener('mouseleave', () => {
            voiceButton.style.transform = '';
            voiceButton.style.boxShadow = '0 8px 32px rgba(255, 107, 107, 0.4)';
        });

        document.body.appendChild(voiceButton);

        // Add keyboard shortcut (Space bar to toggle)
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && e.ctrlKey) {
                e.preventDefault();
                this.toggleListening();
            }
        });

        // Add voice command styles
        this.addVoiceStyles();
    }

    addVoiceStyles() {
        const style = document.createElement('style');
        style.id = 'voice-styles';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                50% { filter: hue-rotate(180deg); }
                100% { filter: hue-rotate(360deg); }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .voice-listening {
                animation: voicePulse 1s ease-in-out infinite !important;
                background: linear-gradient(135deg, #22C55E, #16A34A) !important;
            }
            
            @keyframes voicePulse {
                0%, 100% { 
                    transform: scale(1);
                    box-shadow: 0 8px 32px rgba(34, 197, 94, 0.4);
                }
                50% { 
                    transform: scale(1.1);
                    box-shadow: 0 12px 40px rgba(34, 197, 94, 0.8);
                }
            }
            
            .voice-notification {
                position: fixed;
                bottom: 90px;
                left: 20px;
                max-width: 300px;
                padding: 1rem 1.5rem;
                border-radius: 15px;
                color: white;
                font-size: 0.9rem;
                font-weight: 600;
                z-index: 10000;
                animation: slideUp 0.3s ease-out;
                white-space: pre-line;
            }
            
            .voice-notification.info {
                background: rgba(59, 130, 246, 0.9);
                border: 1px solid rgba(59, 130, 246, 0.3);
            }
            
            .voice-notification.success {
                background: rgba(34, 197, 94, 0.9);
                border: 1px solid rgba(34, 197, 94, 0.3);
            }
            
            .voice-notification.warning {
                background: rgba(245, 158, 11, 0.9);
                border: 1px solid rgba(245, 158, 11, 0.3);
            }
            
            .voice-notification.error {
                background: rgba(239, 68, 68, 0.9);
                border: 1px solid rgba(239, 68, 68, 0.3);
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    toggleListening() {
        if (!this.isSupported) {
            this.showVoiceNotification('Voice control not supported in this browser', 'error');
            return;
        }

        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    }

    updateVoiceUI() {
        const button = document.getElementById('voice-control-btn');
        if (button) {
            if (this.isListening) {
                button.classList.add('voice-listening');
                button.innerHTML = '<i class="fas fa-stop"></i>';
            } else {
                button.classList.remove('voice-listening');
                button.innerHTML = '<i class="fas fa-microphone"></i>';
            }
        }
    }

    showVoiceNotification(message, type = 'info', duration = 3000) {
        // Remove existing notification
        const existing = document.querySelector('.voice-notification');
        if (existing) {
            existing.remove();
        }

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `voice-notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Auto-remove after duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);
    }

    // Public methods
    addCustomCommand(command, handler) {
        this.commands[command.toLowerCase()] = handler;
    }

    getLastCommand() {
        return this.lastCommand;
    }

    getConfidence() {
        return this.confidence;
    }
}

// Initialize Voice Control
let voiceControl;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        voiceControl = new VoiceControl();
    });
} else {
    voiceControl = new VoiceControl();
}

// Make it globally accessible
window.voiceControl = voiceControl;