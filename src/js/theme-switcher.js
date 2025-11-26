// Theme Switcher - Sport/Eco Mode Toggle
export const ThemeSwitcher = {
    THEMES: {
        SPORT: 'sport',
        ECO: 'eco'
    },

    STORAGE_KEY: 'carExplorerTheme',
    currentTheme: null,

    elements: {
        html: null,
        toggle: null
    },

    // Initialize theme system
    init() {
        this.elements.html = document.documentElement;
        this.elements.toggle = document.getElementById('themeToggle');
        this.loadTheme();
        this.setupEventListeners();
        console.log('🎨 Theme Switcher initialized:', this.currentTheme);
    },

    // Load saved theme from localStorage
    loadTheme() {
        try {
            const savedTheme = localStorage.getItem(this.STORAGE_KEY);
            this.currentTheme = savedTheme || this.THEMES.SPORT;
            this.applyTheme(this.currentTheme);
        } catch (error) {
            console.error('Error loading theme:', error);
            this.currentTheme = this.THEMES.SPORT;
            this.applyTheme(this.currentTheme);
        }
    },

    // Apply theme to document
    applyTheme(theme) {
        this.elements.html.classList.remove(
            `theme-${this.THEMES.SPORT}`,
            `theme-${this.THEMES.ECO}`
        );
        this.elements.html.classList.add(`theme-${theme}`);
        this.currentTheme = theme;

        try {
            localStorage.setItem(this.STORAGE_KEY, theme);
        } catch (error) {
            console.error('Error saving theme:', error);
        }

        this.dispatchThemeChangeEvent(theme);
        this.updateToggleAccessibility();
    },

    // Toggle between Sport and Eco
    toggleTheme() {
        const newTheme = this.currentTheme === this.THEMES.SPORT 
            ? this.THEMES.ECO 
            : this.THEMES.SPORT;
        this.applyTheme(newTheme);
        this.animateThemeChange();
    },

    // Set specific theme
    setTheme(theme) {
        if (theme === this.THEMES.SPORT || theme === this.THEMES.ECO) {
            this.applyTheme(theme);
        } else {
            console.warn(`Invalid theme: ${theme}`);
        }
    },

    // Get current theme
    getTheme() {
        return this.currentTheme;
    },

    isSportTheme() {
        return this.currentTheme === this.THEMES.SPORT;
    },

    isEcoTheme() {
        return this.currentTheme === this.THEMES.ECO;
    },

    // Event listeners setup
    setupEventListeners() {
        if (this.elements.toggle) {
            this.elements.toggle.addEventListener('click', () => {
                this.toggleTheme();
            });

            // Keyboard support
            this.elements.toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }

        // Auto-detect system theme preference
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            darkModeQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem(this.STORAGE_KEY)) {
                    const theme = e.matches ? this.THEMES.SPORT : this.THEMES.ECO;
                    this.applyTheme(theme);
                }
            });
        }
    },

    // Smooth transition animation
    animateThemeChange() {
        this.elements.html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            this.elements.html.style.transition = '';
        }, 300);
    },

    // Dispatch custom event
    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChange', {
            detail: {
                theme: theme,
                isSport: theme === this.THEMES.SPORT,
                isEco: theme === this.THEMES.ECO
            }
        });
        window.dispatchEvent(event);
    },

    // Update accessibility labels
    updateToggleAccessibility() {
        if (this.elements.toggle) {
            const label = this.currentTheme === this.THEMES.SPORT 
                ? 'Switch to Eco mode' 
                : 'Switch to Sport mode';
            this.elements.toggle.setAttribute('aria-label', label);
        }
    },

    // Get theme color palette
    getThemeColors() {
        const colors = {
            sport: {
                primary: '#d5001c',
                secondary: '#000000',
                accent: '#ff0000',
                background: '#0a0a0a',
                text: '#ffffff'
            },
            eco: {
                primary: '#00b74a',
                secondary: '#ffffff',
                accent: '#00d454',
                background: '#fafafa',
                text: '#1a1a1a'
            }
        };
        return colors[this.currentTheme];
    },

    // Reset to default theme
    resetTheme() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.applyTheme(this.THEMES.SPORT);
        console.log('🔄 Theme reset to default (Sport)');
    }
};

// Auto-initialize when DOM ready
if (typeof window !== 'undefined' && document.readyState !== 'loading') {
    if (document.getElementById('themeToggle')) {
        ThemeSwitcher.init();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            ThemeSwitcher.init();
        });
    }
}

// Listen for theme changes
if (typeof window !== 'undefined') {
    window.addEventListener('themeChange', (e) => {
        console.log(`✨ Theme changed to: ${e.detail.theme}`);
    });
}
