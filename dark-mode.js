// ADVANCED DARK MODE SYSTEM
// System preference detection, smooth transitions, custom themes

class DarkModeSystem {
    constructor() {
        this.currentTheme = 'dark'; // Default to dark
        this.systemPreference = this.getSystemPreference();
        this.customThemes = {
            dark: {
                name: 'Dark',
                colors: {
                    primary: '#0B0F14',
                    secondary: '#121826',
                    accent: '#5B8CFF',
                    text: '#E6EAF2',
                    textSecondary: '#9AA4BF'
                }
            },
            light: {
                name: 'Light',
                colors: {
                    primary: '#FFFFFF',
                    secondary: '#F8FAFC',
                    accent: '#5B8CFF',
                    text: '#1E293B',
                    textSecondary: '#64748B'
                }
            },
            cyberpunk: {
                name: 'Cyberpunk',
                colors: {
                    primary: '#000510',
                    secondary: '#0A0A23',
                    accent: '#FF00FF',
                    text: '#00FFFF',
                    textSecondary: '#FF6B6B'
                }
            },
            neon: {
                name: 'Neon',
                colors: {
                    primary: '#0D1117',
                    secondary: '#161B22',
                    accent: '#39FF14',
                    text: '#F0F6FC',
                    textSecondary: '#7D8590'
                }
            }
        };
        
        this.init();
    }

    init() {
        this.loadSavedTheme();
        this.setupThemeToggle();
        this.setupSystemPreferenceListener();
        this.createThemeSelector();
        this.applyTheme(this.currentTheme);
        
        console.log('🌙 Advanced Dark Mode System Loaded!');
    }

    getSystemPreference() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    loadSavedTheme() {
        const saved = localStorage.getItem('exuscraft-theme');
        if (saved && this.customThemes[saved]) {
            this.currentTheme = saved;
        } else {
            this.currentTheme = this.systemPreference;
        }
    }

    setupThemeToggle() {
        // Update existing theme toggle button
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.cycleTheme();
            });
        }
    }

    setupSystemPreferenceListener() {
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.systemPreference = e.matches ? 'dark' : 'light';
            
            // Auto-switch if user hasn't manually set a theme
            const hasManualTheme = localStorage.getItem('exuscraft-theme-manual');
            if (!hasManualTheme) {
                this.applyTheme(this.systemPreference);
            }
        });
    }

    createThemeSelector() {
        // Create floating theme selector
        const selector = document.createElement('div');
        selector.id = 'theme-selector';
        selector.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(18, 24, 38, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(91, 140, 255, 0.2);
            border-radius: 15px;
            padding: 1rem;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            min-width: 200px;
        `;

        const title = document.createElement('h4');
        title.textContent = 'Choose Theme';
        title.style.cssText = `
            margin: 0 0 1rem 0;
            color: #E6EAF2;
            font-size: 1rem;
            text-align: center;
        `;
        selector.appendChild(title);

        // Create theme buttons
        Object.keys(this.customThemes).forEach(themeKey => {
            const theme = this.customThemes[themeKey];
            const button = document.createElement('button');
            button.textContent = theme.name;
            button.style.cssText = `
                width: 100%;
                padding: 0.75rem;
                margin-bottom: 0.5rem;
                background: ${theme.colors.secondary};
                color: ${theme.colors.text};
                border: 2px solid ${theme.colors.accent};
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                font-weight: 600;
            `;

            button.addEventListener('click', () => {
                this.applyTheme(themeKey);
                this.hideThemeSelector();
                localStorage.setItem('exuscraft-theme-manual', 'true');
            });

            button.addEventListener('mouseenter', () => {
                button.style.background = theme.colors.accent;
                button.style.color = theme.colors.primary;
                button.style.transform = 'scale(1.05)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.background = theme.colors.secondary;
                button.style.color = theme.colors.text;
                button.style.transform = 'scale(1)';
            });

            selector.appendChild(button);
        });

        document.body.appendChild(selector);

        // Toggle selector with 'T' key
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 't' && e.ctrlKey) {
                this.toggleThemeSelector();
                e.preventDefault();
            }
        });

        // Hide when clicking outside
        document.addEventListener('click', (e) => {
            if (!selector.contains(e.target) && !e.target.closest('.theme-toggle')) {
                this.hideThemeSelector();
            }
        });
    }

    toggleThemeSelector() {
        const selector = document.getElementById('theme-selector');
        const isVisible = selector.style.opacity === '1';
        
        if (isVisible) {
            this.hideThemeSelector();
        } else {
            this.showThemeSelector();
        }
    }

    showThemeSelector() {
        const selector = document.getElementById('theme-selector');
        selector.style.opacity = '1';
        selector.style.visibility = 'visible';
        selector.style.transform = 'translateY(0)';
    }

    hideThemeSelector() {
        const selector = document.getElementById('theme-selector');
        selector.style.opacity = '0';
        selector.style.visibility = 'hidden';
        selector.style.transform = 'translateY(-10px)';
    }

    cycleTheme() {
        const themes = Object.keys(this.customThemes);
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        
        this.applyTheme(nextTheme);
        localStorage.setItem('exuscraft-theme-manual', 'true');
    }

    applyTheme(themeName) {
        if (!this.customThemes[themeName]) return;
        
        this.currentTheme = themeName;
        const theme = this.customThemes[themeName];
        
        // Save theme preference
        localStorage.setItem('exuscraft-theme', themeName);
        
        // Apply CSS custom properties
        const root = document.documentElement;
        root.style.setProperty('--bg-primary', theme.colors.primary);
        root.style.setProperty('--bg-secondary', theme.colors.secondary);
        root.style.setProperty('--accent-primary', theme.colors.accent);
        root.style.setProperty('--text-primary', theme.colors.text);
        root.style.setProperty('--text-secondary', theme.colors.textSecondary);
        
        // Update body class
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${themeName}`);
        
        // Update theme toggle icon
        this.updateThemeIcon(themeName);
        
        // Show notification
        this.showThemeNotification(theme.name);
        
        // Animate transition
        this.animateThemeTransition();
    }

    updateThemeIcon(themeName) {
        const themeIcon = document.getElementById('themeIcon');
        if (!themeIcon) return;
        
        const icons = {
            dark: 'fas fa-moon',
            light: 'fas fa-sun',
            cyberpunk: 'fas fa-robot',
            neon: 'fas fa-bolt'
        };
        
        themeIcon.className = icons[themeName] || 'fas fa-palette';
    }

    showThemeNotification(themeName) {
        const notification = document.createElement('div');
        notification.textContent = `Theme: ${themeName}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            z-index: 10001;
            font-size: 14px;
            font-weight: 600;
            animation: slideDown 0.3s ease-out;
        `;

        // Add animation
        if (!document.querySelector('#theme-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'theme-notification-styles';
            style.textContent = `
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    }

    animateThemeTransition() {
        // Add smooth transition overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(91, 140, 255, 0.1), transparent);
            z-index: 9998;
            opacity: 0;
            pointer-events: none;
            animation: themeTransition 0.5s ease-out;
        `;

        // Add transition animation
        if (!document.querySelector('#theme-transition-styles')) {
            const style = document.createElement('style');
            style.id = 'theme-transition-styles';
            style.textContent = `
                @keyframes themeTransition {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 500);
    }

    // Add theme-specific styles
    addThemeStyles() {
        const style = document.createElement('style');
        style.id = 'theme-styles';
        style.textContent = `
            /* Theme-specific overrides */
            .theme-light {
                --shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.1);
                --shadow-medium: 0 10px 30px rgba(0, 0, 0, 0.15);
            }
            
            .theme-cyberpunk {
                --gradient-primary: linear-gradient(135deg, #FF00FF 0%, #00FFFF 100%);
            }
            
            .theme-neon {
                --gradient-primary: linear-gradient(135deg, #39FF14 0%, #00FFFF 100%);
            }
            
            /* Smooth transitions for all theme changes */
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize dark mode system
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const darkMode = new DarkModeSystem();
        darkMode.addThemeStyles();
    });
} else {
    const darkMode = new DarkModeSystem();
    darkMode.addThemeStyles();
}