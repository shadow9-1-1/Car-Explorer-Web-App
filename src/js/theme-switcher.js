/**
 * Theme Switcher Module
 * Car Explorer Web App
 * 
 * Manages theme switching between Sport and Eco modes
 * with localStorage persistence and smooth transitions
 */

export const ThemeSwitcher = {
    // Theme constants
    THEMES: {
        SPORT: 'sport',
        ECO: 'eco'
    },

    // Storage key
    STORAGE_KEY: 'carExplorerTheme',

    // Current theme
    currentTheme: null,

    // DOM elements
    elements: {
        html: null,
        toggle: null
    },

    /**
     * Initialize theme switcher
     */
    init() {
        // Get DOM elements
        this.elements.html = document.documentElement;
        this.elements.toggle = document.getElementById('themeToggle');

        // Load saved theme
        this.loadTheme();

        // Set up event listeners
        this.setupEventListeners();

        console.log('🎨 Theme Switcher initialized:', this.currentTheme);
    },

    /**
     * Load theme from localStorage
     */
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

    /**
     * Apply theme to document
     * @param {string} theme - Theme name (sport or eco)
     */
    applyTheme(theme) {
        // Remove all theme classes
        this.elements.html.classList.remove(
            `theme-${this.THEMES.SPORT}`,
            `theme-${this.THEMES.ECO}`
        );

        // Add new theme class
        this.elements.html.classList.add(`theme-${theme}`);

        // Update current theme
        this.currentTheme = theme;

        // Save to localStorage
        try {
            localStorage.setItem(this.STORAGE_KEY, theme);
        } catch (error) {
            console.error('Error saving theme:', error);
        }

        // Dispatch theme change event
        this.dispatchThemeChangeEvent(theme);

        // Update toggle button ARIA
        this.updateToggleAccessibility();
    },

    /**
     * Toggle between themes
     */
    toggleTheme() {
        const newTheme = this.currentTheme === this.THEMES.SPORT 
            ? this.THEMES.ECO 
            : this.THEMES.SPORT;
        
        this.applyTheme(newTheme);
        
        // Add animation class
        this.animateThemeChange();
        
        console.log(`🔄 Theme switched: ${this.currentTheme}`);
    },

    /**
     * Set specific theme
     * @param {string} theme - Theme name
     */
    setTheme(theme) {
        if (theme === this.THEMES.SPORT || theme === this.THEMES.ECO) {
            this.applyTheme(theme);
        } else {
            console.warn(`Invalid theme: ${theme}`);
        }
    },

    /**
     * Get current theme
     * @returns {string} Current theme name
     */
    getTheme() {
        return this.currentTheme;
    },

    /**
     * Check if current theme is Sport
     * @returns {boolean} True if Sport theme
     */
    isSportTheme() {
        return this.currentTheme === this.THEMES.SPORT;
    },

    /**
     * Check if current theme is Eco
     * @returns {boolean} True if Eco theme
     */
    isEcoTheme() {
        return this.currentTheme === this.THEMES.ECO;
    },

    /**
     * Setup event listeners
     */
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

        // Listen for system theme changes (optional)
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            darkModeQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem(this.STORAGE_KEY)) {
                    const theme = e.matches ? this.THEMES.SPORT : this.THEMES.ECO;
                    this.applyTheme(theme);
                }
            });
        }
    },

    /**
     * Animate theme change
     */
    animateThemeChange() {
        // Add transition class
        this.elements.html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Remove after animation
        setTimeout(() => {
            this.elements.html.style.transition = '';
        }, 300);
    },

    /**
     * Dispatch custom theme change event
     * @param {string} theme - New theme name
     */
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

    /**
     * Update toggle button accessibility
     */
    updateToggleAccessibility() {
        if (this.elements.toggle) {
            const label = this.currentTheme === this.THEMES.SPORT 
                ? 'Switch to Eco mode' 
                : 'Switch to Sport mode';
            
            this.elements.toggle.setAttribute('aria-label', label);
        }
    },

    /**
     * Get theme colors
     * @returns {Object} Theme color palette
     */
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

    /**
     * Reset to default theme
     */
    resetTheme() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.applyTheme(this.THEMES.SPORT);
        console.log('🔄 Theme reset to default (Sport)');
    }
};

// Auto-initialize if DOM is ready
if (typeof window !== 'undefined' && document.readyState !== 'loading') {
    // Wait for DOM to be fully loaded
    if (document.getElementById('themeToggle')) {
        ThemeSwitcher.init();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            ThemeSwitcher.init();
        });
    }
}

// Listen for theme change events (example usage)
if (typeof window !== 'undefined') {
    window.addEventListener('themeChange', (e) => {
        console.log(`✨ Theme changed to: ${e.detail.theme}`);
    });
}
