// Main App Controller - connects all modules
import { API } from './api.js';
import { UI } from './ui.js';
import { Storage } from './storage.js';
import { Compare } from './compare.js';

export const App = {
    currentPage: null,

    // Global app state
    state: {
        theme: 'sport',
        cars: [],
        favorites: [],
        comparison: [],
        isLoading: false
    },

    // Initialize app on page load
    async init() {
        try {
            this.detectCurrentPage();
            this.initTheme();
            this.initMobileMenu();
            
            if (this.needsCarData()) {
                await this.loadCarData();
            }
            
            this.initPageFeatures();
            console.log('✅ Car Explorer App initialized');
        } catch (error) {
            console.error('❌ Error initializing app:', error);
        }
    },

    // Detect which page is currently loaded
    detectCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        this.currentPage = page;
    },

    // Check if page needs car data
    needsCarData() {
        return ['browse', 'details', 'favorites', 'compare'].includes(this.currentPage);
    },

    // Load car data from JSON
    async loadCarData() {
        try {
            this.state.isLoading = true;
            this.state.cars = await API.fetchCars();
            this.state.favorites = Storage.getFavorites();
            this.state.comparison = Storage.getComparison();
            this.state.isLoading = false;
        } catch (error) {
            console.error('❌ Error loading car data:', error);
            this.state.isLoading = false;
            throw error;
        }
    },

    // Theme System
    initTheme() {
        this.state.theme = Storage.getTheme();
        this.applyTheme(this.state.theme);

        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    },

    applyTheme(theme) {
        const html = document.documentElement;
        html.classList.remove('theme-sport', 'theme-eco');
        html.classList.add(`theme-${theme}`);
        this.state.theme = theme;
        Storage.setTheme(theme);
    },

    toggleTheme() {
        const newTheme = this.state.theme === 'sport' ? 'eco' : 'sport';
        this.applyTheme(newTheme);
    },

    // Mobile menu toggle
    initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            // Toggle on click
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('hidden');
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                }
            });

            // Close on link click
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    },

    // Page-specific features
    initPageFeatures() {
        switch (this.currentPage) {
            case 'index': this.initSmoothScroll(); break;
            case 'favorites': this.state.favorites = Storage.getFavorites(); break;
            case 'compare': this.state.comparison = Storage.getComparison(); break;
        }
    },

    // Smooth scroll for anchor links
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    },

    // Favorites Management
    addToFavorites(carId) {
        const success = Storage.addFavorite(carId);
        if (success) this.state.favorites = Storage.getFavorites();
        return success;
    },

    removeFromFavorites(carId) {
        const success = Storage.removeFavorite(carId);
        if (success) this.state.favorites = Storage.getFavorites();
        return success;
    },

    toggleFavorite(carId) {
        const isFavorite = Storage.toggleFavorite(carId);
        this.state.favorites = Storage.getFavorites();
        return isFavorite;
    },

    // Comparison Management
    addToComparison(carId) {
        const success = Storage.addToComparison(carId);
        if (success) this.state.comparison = Storage.getComparison();
        return success;
    },

    removeFromComparison(carId) {
        const success = Storage.removeFromComparison(carId);
        if (success) this.state.comparison = Storage.getComparison();
        return success;
    },

    // Data Getters
    async getCarById(id) {
        if (this.state.cars.length === 0) await this.loadCarData();
        return this.state.cars.find(car => car.id === parseInt(id)) || null;
    },

    async getFavoriteCars() {
        if (this.state.cars.length === 0) await this.loadCarData();
        return this.state.cars.filter(car => this.state.favorites.includes(car.id));
    },

    async getComparisonCars() {
        if (this.state.cars.length === 0) await this.loadCarData();
        return this.state.cars.filter(car => this.state.comparison.includes(car.id));
    },

    // Navigation helper
    navigateTo(page, params = {}) {
        let url = `${page}.html`;
        const queryString = Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        if (queryString) url += `?${queryString}`;
        window.location.href = url;
    },

    // Loading state
    showLoading() {
        this.state.isLoading = true;
    },

    hideLoading() {
        this.state.isLoading = false;
    },

    // Error handler
    handleError(error, context = '') {
        console.error(`❌ Error ${context}:`, error);
    },

    // Get app statistics
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

if (typeof window !== 'undefined') {
    window.CarExplorerApp = App;
}

export { API, UI, Storage, Compare };
