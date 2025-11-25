/**
 * UI Module - Handles rendering and DOM manipulation
 * Car Explorer Web App
 */

export const UI = {
    /**
     * Create car card HTML
     * @param {Object} car - Car object
     * @returns {string} HTML string
     */
    createCarCard(car) {
        const isFavorite = this.isFavorite(car.id);
        const heartIcon = isFavorite ? '❤️' : '🤍';
        
        return `
            <div class="car-card" data-car-id="${car.id}">
                <div class="relative overflow-hidden">
                    <img src="${car.image}" 
                         alt="${car.name}" 
                         class="car-card__image"
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1283&auto=format&fit=crop'">
                    
                    <!-- Category Badge -->
                    <div class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm
                                theme-sport:bg-sport-primary/90 theme-sport:text-white
                                theme-eco:bg-eco-primary/90 theme-eco:text-white">
                        ${this.getCategoryIcon(car.category)} ${car.category}
                    </div>

                    <!-- Favorite Button -->
                    <button class="favorite-btn absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110
                                   theme-sport:bg-black/60 theme-sport:hover:bg-sport-primary
                                   theme-eco:bg-white/60 theme-eco:hover:bg-eco-primary"
                            data-car-id="${car.id}"
                            aria-label="Add to favorites">
                        <span class="text-xl">${heartIcon}</span>
                    </button>
                </div>

                <div class="car-card__content">
                    <div class="car-card__meta">
                        ${car.brand} • ${car.year}
                    </div>
                    <h3 class="car-card__title">
                        ${car.name}
                    </h3>
                    
                    <!-- Specs -->
                    <div class="flex items-center gap-4 mt-3 text-xs transition-colors
                                theme-sport:text-gray-400
                                theme-eco:text-gray-600">
                        <span>⚡ ${car.horsepower} HP</span>
                        <span>🚀 ${car.acceleration}s</span>
                        <span>⏱️ ${car.topSpeed} mph</span>
                    </div>

                    <div class="car-card__price">
                        $${this.formatPrice(car.price)}
                    </div>

                    <div class="car-card__cta">
                        <a href="details.html?id=${car.id}" 
                           class="button-action button-action--primary button-action--sm w-full">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Create skeleton loading card
     * @returns {string} HTML string
     */
    createSkeletonCard() {
        return `
            <div class="car-card animate-pulse">
                <div class="aspect-car rounded-lg transition-colors
                            theme-sport:bg-sport-hover
                            theme-eco:bg-gray-200"></div>
                <div class="p-6 space-y-3">
                    <div class="h-4 rounded transition-colors
                                theme-sport:bg-sport-hover
                                theme-eco:bg-gray-200 w-1/3"></div>
                    <div class="h-6 rounded transition-colors
                                theme-sport:bg-sport-hover
                                theme-eco:bg-gray-200 w-3/4"></div>
                    <div class="h-4 rounded transition-colors
                                theme-sport:bg-sport-hover
                                theme-eco:bg-gray-200 w-full"></div>
                    <div class="h-8 rounded transition-colors
                                theme-sport:bg-sport-hover
                                theme-eco:bg-gray-200 w-1/2"></div>
                </div>
            </div>
        `;
    },

    /**
     * Render loading skeletons
     * @param {HTMLElement} container - Container element
     * @param {number} count - Number of skeletons
     */
    renderSkeletons(container, count = 6) {
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            container.innerHTML += this.createSkeletonCard();
        }
    },

    /**
     * Render car cards to container
     * @param {Array} cars - Array of car objects
     * @param {HTMLElement} container - Container element
     */
    renderCars(cars, container) {
        if (!cars || cars.length === 0) {
            container.innerHTML = this.createEmptyState();
            return;
        }

        container.innerHTML = cars.map(car => this.createCarCard(car)).join('');
        this.attachFavoriteListeners();
    },

    /**
     * Create empty state HTML
     * @returns {string} HTML string
     */
    createEmptyState() {
        return `
            <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <div class="text-6xl mb-4">🚗</div>
                <h3 class="text-2xl font-semibold mb-2 transition-colors
                           theme-sport:text-white
                           theme-eco:text-gray-900">
                    No Cars Found
                </h3>
                <p class="transition-colors
                          theme-sport:text-gray-400
                          theme-eco:text-gray-600">
                    Try adjusting your filters or search criteria
                </p>
            </div>
        `;
    },

    /**
     * Update results count
     * @param {number} count - Number of results
     * @param {number} total - Total number of cars
     */
    updateResultsCount(count, total) {
        const countElement = document.getElementById('resultsCount');
        if (countElement) {
            countElement.textContent = `Showing ${count} of ${total} vehicles`;
        }
    },

    /**
     * Format price with commas
     * @param {number} price - Price value
     * @returns {string} Formatted price
     */
    formatPrice(price) {
        return price.toLocaleString('en-US');
    },

    /**
     * Get category icon
     * @param {string} category - Category name
     * @returns {string} Emoji icon
     */
    getCategoryIcon(category) {
        const icons = {
            sports: '🏎️',
            suv: '🚙',
            luxury: '💎',
            electric: '⚡',
            hybrid: '🔋'
        };
        return icons[category] || '🚗';
    },

    /**
     * Show loading state
     * @param {boolean} isLoading - Loading state
     */
    setLoading(isLoading) {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.toggle('hidden', !isLoading);
        }
    },

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        const container = document.getElementById('carsContainer');
        if (container) {
            container.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <div class="text-6xl mb-4">⚠️</div>
                    <h3 class="text-2xl font-semibold mb-2 transition-colors
                               theme-sport:text-white
                               theme-eco:text-gray-900">
                        Oops! Something went wrong
                    </h3>
                    <p class="transition-colors
                              theme-sport:text-gray-400
                              theme-eco:text-gray-600">
                        ${message}
                    </p>
                    <button onclick="location.reload()" 
                            class="button-action button-action--primary button-action--md mt-6">
                        Reload Page
                    </button>
                </div>
            `;
        }
    },

    /**
     * Check if car is in favorites
     * @param {number} carId - Car ID
     * @returns {boolean} True if favorite
     */
    isFavorite(carId) {
        const favorites = JSON.parse(localStorage.getItem('carExplorerFavorites') || '[]');
        return favorites.includes(carId);
    },

    /**
     * Toggle favorite status
     * @param {number} carId - Car ID
     * @returns {boolean} New favorite status
     */
    toggleFavorite(carId) {
        let favorites = JSON.parse(localStorage.getItem('carExplorerFavorites') || '[]');
        const index = favorites.indexOf(carId);

        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(carId);
        }

        localStorage.setItem('carExplorerFavorites', JSON.stringify(favorites));
        return favorites.includes(carId);
    },

    /**
     * Attach favorite button listeners
     */
    attachFavoriteListeners() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        
        favoriteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const carId = parseInt(button.dataset.carId);
                const isFavorite = this.toggleFavorite(carId);
                
                // Update button icon
                const icon = button.querySelector('span');
                icon.textContent = isFavorite ? '❤️' : '🤍';
                
                // Add animation
                button.classList.add('scale-125');
                setTimeout(() => button.classList.remove('scale-125'), 200);
            });
        });
    },

    /**
     * Populate category dropdown
     * @param {Array} categories - Array of categories
     * @param {HTMLElement} select - Select element
     */
    populateCategories(categories, select) {
        select.innerHTML = '<option value="all">All Categories</option>';
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = `${this.getCategoryIcon(category)} ${category.charAt(0).toUpperCase() + category.slice(1)}`;
            select.appendChild(option);
        });
    },

    /**
     * Update price range display
     * @param {HTMLElement} input - Range input element
     * @param {HTMLElement} display - Display element
     */
    updateRangeDisplay(input, display) {
        const value = parseInt(input.value);
        display.textContent = `$${this.formatPrice(value)}`;
    },

    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function} Debounced function
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};
