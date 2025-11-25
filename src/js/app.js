/**
 * Main Application Script
 * Car Explorer Web App - SW 302 Assignment 2
 * 
 * This file connects all modules and provides global functionality
 * across all pages of the application.
 */

// Import all modules
import { API } from './api.js';
import { UI } from './ui.js';
import { Storage } from './storage.js';
import { Compare } from './compare.js';

/**
 * App namespace - Main application controller
 */
export const App = {
    // Current page
    currentPage: null,

    // App state
    state: {
        theme: 'sport',
        cars: [],
        favorites: [],
        comparison: [],
        isLoading: false
    },

    /**
     * Initialize the application
     */
    async init() {
        try {
            // Detect current page
            this.detectCurrentPage();

            // Initialize theme
            this.initTheme();

            // Initialize mobile menu
            this.initMobileMenu();

            // Load initial data if needed
            if (this.needsCarData()) {
                await this.loadCarData();
            }

            // Initialize page-specific functionality
            this.initPageFeatures();

            console.log('✅ Car Explorer App initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing app:', error);
        }
    },

    /**
     * Detect current page from URL
     */
    detectCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        this.currentPage = page;
        console.log(`📄 Current page: ${page}`);
    },

    /**
     * Check if current page needs car data
     */
    needsCarData() {
        return ['browse', 'details', 'favorites', 'compare'].includes(this.currentPage);
    },

    /**
     * Load car data from API
     */
    async loadCarData() {
        try {
            this.state.isLoading = true;
            this.state.cars = await API.fetchCars();
            this.state.favorites = Storage.getFavorites();
            this.state.comparison = Storage.getComparison();
            this.state.isLoading = false;
            console.log(`✅ Loaded ${this.state.cars.length} cars`);
        } catch (error) {
            console.error('❌ Error loading car data:', error);
            this.state.isLoading = false;
            throw error;
        }
    },

    /**
     * Initialize theme system
     */
    initTheme() {
        // Get theme from storage
        this.state.theme = Storage.getTheme();
        
        // Apply theme to HTML element
        this.applyTheme(this.state.theme);

        // Set up theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        console.log(`🎨 Theme initialized: ${this.state.theme}`);
    },

    /**
     * Apply theme to document
     */
    applyTheme(theme) {
        const html = document.documentElement;
        html.classList.remove('theme-sport', 'theme-eco');
        html.classList.add(`theme-${theme}`);
        this.state.theme = theme;
        Storage.setTheme(theme);
    },

    /**
     * Toggle between sport and eco themes
     */
    toggleTheme() {
        const newTheme = this.state.theme === 'sport' ? 'eco' : 'sport';
        this.applyTheme(newTheme);
        console.log(`🔄 Theme switched to: ${newTheme}`);
    },

    /**
     * Initialize mobile menu
     */
    initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            // Toggle menu on button click
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('hidden');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                }
            });

            // Close menu when clicking a link
            const menuLinks = mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    },

    /**
     * Initialize page-specific features
     */
    initPageFeatures() {
        switch (this.currentPage) {
            case 'index':
                this.initHomePage();
                break;
            case 'browse':
                this.initBrowsePage();
                break;
            case 'details':
                this.initDetailsPage();
                break;
            case 'favorites':
                this.initFavoritesPage();
                break;
            case 'compare':
                this.initComparePage();
                break;
        }
    },

    /**
     * Initialize home page features
     */
    initHomePage() {
        console.log('🏠 Home page features initialized');
        // Add smooth scroll for anchor links
        this.initSmoothScroll();
    },

    /**
     * Initialize browse page features
     */
    initBrowsePage() {
        console.log('🔍 Browse page features initialized');
        // Features are handled by browse.html module script
    },

    /**
     * Initialize details page features
     */
    initDetailsPage() {
        console.log('📋 Details page features initialized');
        // Features are handled by details.html module script
    },

    /**
     * Initialize favorites page features
     */
    initFavoritesPage() {
        console.log('❤️ Favorites page features initialized');
        // Update favorites count in state
        this.state.favorites = Storage.getFavorites();
    },

    /**
     * Initialize compare page features
     */
    initComparePage() {
        console.log('⚖️ Compare page features initialized');
        // Update comparison list in state
        this.state.comparison = Storage.getComparison();
    },

    /**
     * Initialize smooth scroll for anchor links
     */
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            });
        });
    },

    /**
     * Add car to favorites
     */
    addToFavorites(carId) {
        const success = Storage.addFavorite(carId);
        if (success) {
            this.state.favorites = Storage.getFavorites();
            console.log(`✅ Added car ${carId} to favorites`);
            return true;
        }
        return false;
    },

    /**
     * Remove car from favorites
     */
    removeFromFavorites(carId) {
        const success = Storage.removeFavorite(carId);
        if (success) {
            this.state.favorites = Storage.getFavorites();
            console.log(`✅ Removed car ${carId} from favorites`);
            return true;
        }
        return false;
    },

    /**
     * Toggle favorite status
     */
    toggleFavorite(carId) {
        const isFavorite = Storage.toggleFavorite(carId);
        this.state.favorites = Storage.getFavorites();
        return isFavorite;
    },

    /**
     * Add car to comparison
     */
    addToComparison(carId) {
        const success = Storage.addToComparison(carId);
        if (success) {
            this.state.comparison = Storage.getComparison();
            console.log(`✅ Added car ${carId} to comparison`);
            return true;
        }
        return false;
    },

    /**
     * Remove car from comparison
     */
    removeFromComparison(carId) {
        const success = Storage.removeFromComparison(carId);
        if (success) {
            this.state.comparison = Storage.getComparison();
            console.log(`✅ Removed car ${carId} from comparison`);
            return true;
        }
        return false;
    },

    /**
     * Get car by ID
     */
    async getCarById(id) {
        if (this.state.cars.length === 0) {
            await this.loadCarData();
        }
        return this.state.cars.find(car => car.id === parseInt(id)) || null;
    },

    /**
     * Get favorite cars
     */
    async getFavoriteCars() {
        if (this.state.cars.length === 0) {
            await this.loadCarData();
        }
        return this.state.cars.filter(car => this.state.favorites.includes(car.id));
    },

    /**
     * Get comparison cars
     */
    async getComparisonCars() {
        if (this.state.cars.length === 0) {
            await this.loadCarData();
        }
        return this.state.cars.filter(car => this.state.comparison.includes(car.id));
    },

    /**
     * Navigate to page
     */
    navigateTo(page, params = {}) {
        let url = `${page}.html`;
        
        // Add query parameters
        const queryString = Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        
        if (queryString) {
            url += `?${queryString}`;
        }
        
        window.location.href = url;
    },

    /**
     * Show loading indicator
     */
    showLoading() {
        this.state.isLoading = true;
        // Can be extended to show a global loader
    },

    /**
     * Hide loading indicator
     */
    hideLoading() {
        this.state.isLoading = false;
        // Can be extended to hide a global loader
    },

    /**
     * Handle errors globally
     */
    handleError(error, context = '') {
        console.error(`❌ Error ${context}:`, error);
        // Can be extended to show user-friendly error messages
    },

    /**
     * Get app statistics
     */
    getStats() {
        return {
            totalCars: this.state.cars.length,
            favoritesCount: this.state.favorites.length,
            comparisonCount: this.state.comparison.length,
            currentTheme: this.state.theme,
            currentPage: this.currentPage
        };
    }
};

// Auto-initialize when DOM is ready (if not imported as module)
if (typeof window !== 'undefined') {
    // Export to window for non-module usage
    window.CarExplorerApp = App;
    
    console.log('🚗 Car Explorer App loaded');
    console.log('📦 Modules available: API, UI, Storage, Compare, App');
}

// Export all modules for convenient importing
export { API, UI, Storage, Compare };
