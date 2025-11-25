/**
 * Compare Module - Handles car comparison logic
 * Car Explorer Web App
 */

export const Compare = {
    /**
     * Get comparison data for multiple cars
     * @param {Array} cars - Array of car objects to compare
     * @returns {Object} Comparison data structure
     */
    getComparisonData(cars) {
        if (!cars || cars.length === 0) {
            return null;
        }

        return {
            cars: cars,
            specs: this.extractSpecs(cars),
            highlights: this.getHighlights(cars)
        };
    },

    /**
     * Extract all specs from cars
     * @param {Array} cars - Array of car objects
     * @returns {Object} Organized spec categories
     */
    extractSpecs(cars) {
        return {
            general: [
                { label: 'Brand', key: 'brand' },
                { label: 'Model Year', key: 'year' },
                { label: 'Category', key: 'category' },
                { label: 'Price', key: 'price', format: 'currency' }
            ],
            performance: [
                { label: 'Horsepower', key: 'horsepower', format: 'hp', compare: 'higher' },
                { label: '0-60 MPH', key: 'acceleration', format: 'seconds', compare: 'lower' },
                { label: 'Top Speed', key: 'topSpeed', format: 'mph', compare: 'higher' }
            ],
            technical: [
                { label: 'Fuel Type', key: 'fuelType' },
                { label: 'Transmission', key: 'transmission' }
            ]
        };
    },

    /**
     * Get highlights (best values) for each spec
     * @param {Array} cars - Array of car objects
     * @returns {Object} Highlights by spec key
     */
    getHighlights(cars) {
        const highlights = {};

        // Horsepower - highest is best
        const maxHp = Math.max(...cars.map(car => car.horsepower));
        highlights.horsepower = cars.filter(car => car.horsepower === maxHp).map(car => car.id);

        // Acceleration - lowest is best (faster)
        const minAccel = Math.min(...cars.map(car => car.acceleration));
        highlights.acceleration = cars.filter(car => car.acceleration === minAccel).map(car => car.id);

        // Top Speed - highest is best
        const maxSpeed = Math.max(...cars.map(car => car.topSpeed));
        highlights.topSpeed = cars.filter(car => car.topSpeed === maxSpeed).map(car => car.id);

        // Price - lowest is best (value)
        const minPrice = Math.min(...cars.map(car => car.price));
        highlights.price = cars.filter(car => car.price === minPrice).map(car => car.id);

        return highlights;
    },

    /**
     * Format spec value based on type
     * @param {*} value - Value to format
     * @param {string} format - Format type
     * @returns {string} Formatted value
     */
    formatValue(value, format) {
        if (value === null || value === undefined) {
            return 'N/A';
        }

        switch (format) {
            case 'currency':
                return `$${value.toLocaleString('en-US')}`;
            case 'hp':
                return `${value} HP`;
            case 'seconds':
                return `${value}s`;
            case 'mph':
                return `${value} mph`;
            default:
                return String(value);
        }
    },

    /**
     * Check if a spec value is highlighted for a car
     * @param {Object} highlights - Highlights object
     * @param {string} key - Spec key
     * @param {number} carId - Car ID
     * @returns {boolean} True if highlighted
     */
    isHighlighted(highlights, key, carId) {
        return highlights[key] && highlights[key].includes(carId);
    },

    /**
     * Get winner for a specific spec
     * @param {Array} cars - Array of car objects
     * @param {string} key - Spec key
     * @param {string} compare - Comparison type ('higher' or 'lower')
     * @returns {Array} Array of winning car IDs
     */
    getWinner(cars, key, compare) {
        const values = cars.map(car => car[key]);
        const bestValue = compare === 'higher' 
            ? Math.max(...values) 
            : Math.min(...values);
        
        return cars.filter(car => car[key] === bestValue).map(car => car.id);
    },

    /**
     * Calculate overall winner based on multiple criteria
     * @param {Array} cars - Array of car objects
     * @returns {Object} Winner analysis
     */
    getOverallWinner(cars) {
        const scores = cars.map(car => ({
            id: car.id,
            name: car.name,
            score: 0,
            wins: []
        }));

        // Performance score (horsepower, acceleration, top speed)
        const maxHp = Math.max(...cars.map(car => car.horsepower));
        const minAccel = Math.min(...cars.map(car => car.acceleration));
        const maxSpeed = Math.max(...cars.map(car => car.topSpeed));

        cars.forEach((car, index) => {
            if (car.horsepower === maxHp) {
                scores[index].score++;
                scores[index].wins.push('Horsepower');
            }
            if (car.acceleration === minAccel) {
                scores[index].score++;
                scores[index].wins.push('Acceleration');
            }
            if (car.topSpeed === maxSpeed) {
                scores[index].score++;
                scores[index].wins.push('Top Speed');
            }
        });

        // Sort by score
        scores.sort((a, b) => b.score - a.score);

        return {
            winner: scores[0],
            all: scores
        };
    },

    /**
     * Generate comparison summary text
     * @param {Array} cars - Array of car objects
     * @returns {string} Summary text
     */
    getComparisonSummary(cars) {
        if (cars.length < 2) {
            return 'Add more cars to compare';
        }

        const winner = this.getOverallWinner(cars);
        const priceRange = {
            min: Math.min(...cars.map(car => car.price)),
            max: Math.max(...cars.map(car => car.price))
        };

        return `Comparing ${cars.length} vehicles. ${winner.winner.name} leads with ${winner.winner.wins.length} performance advantage${winner.winner.wins.length !== 1 ? 's' : ''}. Price range: $${priceRange.min.toLocaleString()} - $${priceRange.max.toLocaleString()}.`;
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
    }
};
