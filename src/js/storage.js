// localStorage Management Module
export const Storage = {
    // localStorage keys
    KEYS: {
        FAVORITES: 'carExplorerFavorites',
        THEME: 'carExplorerTheme',
        COMPARISON: 'carExplorerComparison'
    },

    // Favorites Management
    getFavorites() {
        try {
            const favorites = localStorage.getItem(this.KEYS.FAVORITES);
            return favorites ? JSON.parse(favorites) : [];
        } catch (error) {
            console.error('Error getting favorites:', error);
            return [];
        }
    },

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

    isFavorite(carId) {
        return this.getFavorites().includes(carId);
    },

    toggleFavorite(carId) {
        if (this.isFavorite(carId)) {
            this.removeFavorite(carId);
            return false;
        } else {
            this.addFavorite(carId);
            return true;
        }
    },

    clearFavorites() {
        try {
            localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify([]));
            return true;
        } catch (error) {
            console.error('Error clearing favorites:', error);
            return false;
        }
    },

    getFavoriteCount() {
        return this.getFavorites().length;
    },

    // Comparison Management
    getComparison() {
        try {
            const comparison = localStorage.getItem(this.KEYS.COMPARISON);
            return comparison ? JSON.parse(comparison) : [];
        } catch (error) {
            console.error('Error getting comparison list:', error);
            return [];
        }
    },

    addToComparison(carId, maxItems = 3) {
        try {
            const comparison = this.getComparison();
            if (comparison.length >= maxItems) return false; // Max limit reached
            
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

    clearComparison() {
        try {
            localStorage.setItem(this.KEYS.COMPARISON, JSON.stringify([]));
            return true;
        } catch (error) {
            console.error('Error clearing comparison:', error);
            return false;
        }
    },

    toggleComparison(carId, maxItems = 3) {
        const comparison = this.getComparison();
        if (comparison.includes(carId)) {
            this.removeFromComparison(carId);
            return false;
        } else {
            const success = this.addToComparison(carId, maxItems);
            return success ? true : null; // null = max reached
        }
    },

    // Theme Management
    getTheme() {
        return localStorage.getItem(this.KEYS.THEME) || 'sport';
    },

    setTheme(theme) {
        try {
            localStorage.setItem(this.KEYS.THEME, theme);
            return true;
        } catch (error) {
            console.error('Error setting theme:', error);
            return false;
        }
    },

    // Import/Export
    exportFavorites() {
        const favorites = this.getFavorites();
        return JSON.stringify(favorites, null, 2);
    },

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
