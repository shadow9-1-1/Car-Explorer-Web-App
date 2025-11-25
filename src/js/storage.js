/**
 * Storage Module - Handles localStorage operations
 * Car Explorer Web App
 */

export const Storage = {
    // Storage keys
    KEYS: {
        FAVORITES: 'carExplorerFavorites',
        THEME: 'carExplorerTheme',
        COMPARISON: 'carExplorerComparison'
    },

    /**
     * Get all favorite car IDs
     * @returns {Array<number>} Array of car IDs
     */
    getFavorites() {
        try {
            const favorites = localStorage.getItem(this.KEYS.FAVORITES);
            return favorites ? JSON.parse(favorites) : [];
        } catch (error) {
            console.error('Error getting favorites:', error);
            return [];
        }
    },

    /**
     * Add car to favorites
     * @param {number} carId - Car ID to add
     * @returns {boolean} Success status
     */
    addFavorite(carId) {
        try {
            const favorites = this.getFavorites();
            
            if (!favorites.includes(carId)) {
                favorites.push(carId);
                localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favorites));
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error adding favorite:', error);
            return false;
        }
    },

    /**
     * Remove car from favorites
     * @param {number} carId - Car ID to remove
     * @returns {boolean} Success status
     */
    removeFavorite(carId) {
        try {
            let favorites = this.getFavorites();
            const index = favorites.indexOf(carId);
            
            if (index > -1) {
                favorites.splice(index, 1);
                localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favorites));
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error removing favorite:', error);
            return false;
        }
    },

    /**
     * Check if car is in favorites
     * @param {number} carId - Car ID to check
     * @returns {boolean} True if favorite
     */
    isFavorite(carId) {
        const favorites = this.getFavorites();
        return favorites.includes(carId);
    },

    /**
     * Toggle favorite status
     * @param {number} carId - Car ID to toggle
     * @returns {boolean} New favorite status
     */
    toggleFavorite(carId) {
        if (this.isFavorite(carId)) {
            this.removeFavorite(carId);
            return false;
        } else {
            this.addFavorite(carId);
            return true;
        }
    },

    /**
     * Clear all favorites
     * @returns {boolean} Success status
     */
    clearFavorites() {
        try {
            localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify([]));
            return true;
        } catch (error) {
            console.error('Error clearing favorites:', error);
            return false;
        }
    },

    /**
     * Get favorite count
     * @returns {number} Number of favorites
     */
    getFavoriteCount() {
        return this.getFavorites().length;
    },

    /**
     * Get comparison list
     * @returns {Array<number>} Array of car IDs for comparison
     */
    getComparison() {
        try {
            const comparison = localStorage.getItem(this.KEYS.COMPARISON);
            return comparison ? JSON.parse(comparison) : [];
        } catch (error) {
            console.error('Error getting comparison list:', error);
            return [];
        }
    },

    /**
     * Add car to comparison
     * @param {number} carId - Car ID to add
     * @param {number} maxItems - Maximum items allowed (default: 3)
     * @returns {boolean} Success status
     */
    addToComparison(carId, maxItems = 3) {
        try {
            const comparison = this.getComparison();
            
            if (comparison.length >= maxItems) {
                return false; // Max items reached
            }
            
            if (!comparison.includes(carId)) {
                comparison.push(carId);
                localStorage.setItem(this.KEYS.COMPARISON, JSON.stringify(comparison));
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error adding to comparison:', error);
            return false;
        }
    },

    /**
     * Remove car from comparison
     * @param {number} carId - Car ID to remove
     * @returns {boolean} Success status
     */
    removeFromComparison(carId) {
        try {
            let comparison = this.getComparison();
            const index = comparison.indexOf(carId);
            
            if (index > -1) {
                comparison.splice(index, 1);
                localStorage.setItem(this.KEYS.COMPARISON, JSON.stringify(comparison));
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error removing from comparison:', error);
            return false;
        }
    },

    /**
     * Clear comparison list
     * @returns {boolean} Success status
     */
    clearComparison() {
        try {
            localStorage.setItem(this.KEYS.COMPARISON, JSON.stringify([]));
            return true;
        } catch (error) {
            console.error('Error clearing comparison:', error);
            return false;
        }
    },

    /**
     * Toggle comparison status
     * @param {number} carId - Car ID to toggle
     * @param {number} maxItems - Maximum items allowed
     * @returns {boolean|null} New status or null if max reached
     */
    toggleComparison(carId, maxItems = 3) {
        const comparison = this.getComparison();
        
        if (comparison.includes(carId)) {
            this.removeFromComparison(carId);
            return false;
        } else {
            const success = this.addToComparison(carId, maxItems);
            return success ? true : null; // null = max items reached
        }
    },

    /**
     * Get saved theme
     * @returns {string} Theme name (sport or eco)
     */
    getTheme() {
        return localStorage.getItem(this.KEYS.THEME) || 'sport';
    },

    /**
     * Set theme
     * @param {string} theme - Theme name
     * @returns {boolean} Success status
     */
    setTheme(theme) {
        try {
            localStorage.setItem(this.KEYS.THEME, theme);
            return true;
        } catch (error) {
            console.error('Error setting theme:', error);
            return false;
        }
    },

    /**
     * Export favorites as JSON
     * @returns {string} JSON string of favorites
     */
    exportFavorites() {
        const favorites = this.getFavorites();
        return JSON.stringify(favorites, null, 2);
    },

    /**
     * Import favorites from JSON
     * @param {string} jsonString - JSON string of car IDs
     * @returns {boolean} Success status
     */
    importFavorites(jsonString) {
        try {
            const favorites = JSON.parse(jsonString);
            
            if (Array.isArray(favorites)) {
                localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favorites));
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error importing favorites:', error);
            return false;
        }
    }
};
