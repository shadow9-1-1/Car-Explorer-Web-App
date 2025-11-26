// Comparison Logic Module
export const Compare = {
    
    // Main comparison data builder
    getComparisonData(cars) {
        if (!cars || cars.length === 0) return null;

        return {
            cars: cars,
            specs: this.extractSpecs(cars),
            highlights: this.getHighlights(cars)
        };
    },

    // Organize specs into categories
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

    // Find best values for each spec
    getHighlights(cars) {
        const highlights = {};

        // Higher is better
        const maxHp = Math.max(...cars.map(car => car.horsepower));
        highlights.horsepower = cars.filter(car => car.horsepower === maxHp).map(car => car.id);

        // Lower is better (faster)
        const minAccel = Math.min(...cars.map(car => car.acceleration));
        highlights.acceleration = cars.filter(car => car.acceleration === minAccel).map(car => car.id);

        // Higher is better
        const maxSpeed = Math.max(...cars.map(car => car.topSpeed));
        highlights.topSpeed = cars.filter(car => car.topSpeed === maxSpeed).map(car => car.id);

        // Lower is better (value)
        const minPrice = Math.min(...cars.map(car => car.price));
        highlights.price = cars.filter(car => car.price === minPrice).map(car => car.id);

        return highlights;
    },

    // Format values for display
    formatValue(value, format) {
        if (value === null || value === undefined) return 'N/A';

        switch (format) {
            case 'currency': return `$${value.toLocaleString('en-US')}`;
            case 'hp': return `${value} HP`;
            case 'seconds': return `${value}s`;
            case 'mph': return `${value} mph`;
            default: return String(value);
        }
    },

    // Check if value is winner
    isHighlighted(highlights, key, carId) {
        return highlights[key] && highlights[key].includes(carId);
    },

    // Find winner for specific spec
    getWinner(cars, key, compare) {
        const values = cars.map(car => car[key]);
        const bestValue = compare === 'higher' ? Math.max(...values) : Math.min(...values);
        return cars.filter(car => car[key] === bestValue).map(car => car.id);
    },

    // Calculate overall performance winner
    getOverallWinner(cars) {
        const scores = cars.map(car => ({
            id: car.id,
            name: car.name,
            score: 0,
            wins: []
        }));

        // Performance metrics
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

        scores.sort((a, b) => b.score - a.score);

        return {
            winner: scores[0],
            all: scores
        };
    },

    // Generate summary text
    getComparisonSummary(cars) {
        if (cars.length < 2) return 'Add more cars to compare';

        const winner = this.getOverallWinner(cars);
        const priceRange = {
            min: Math.min(...cars.map(car => car.price)),
            max: Math.max(...cars.map(car => car.price))
        };

        return `Comparing ${cars.length} vehicles. ${winner.winner.name} leads with ${winner.winner.wins.length} performance advantage${winner.winner.wins.length !== 1 ? 's' : ''}. Price range: $${priceRange.min.toLocaleString()} - $${priceRange.max.toLocaleString()}.`;
    },

    // Category icons
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
