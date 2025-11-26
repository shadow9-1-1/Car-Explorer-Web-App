export const API = {
    // data files
    dataPath: '../data/cars.json',

    
    async fetchCars() {
        try {
            const response = await fetch(this.dataPath);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const cars = await response.json();
            return cars;
        } catch (error) {
            console.error('Error fetching cars:', error);
            throw error;
        }
    },

    
    async getCarById(id) {
        try {
            const cars = await this.fetchCars();
            return cars.find(car => car.id === parseInt(id)) || null;
        } catch (error) {
            console.error('Error getting car by ID:', error);
            return null;
        }
    },

    
    //Filter cars
     
    filterCars(cars, filters = {}) {
        let filtered = [...cars];

        // Search
        if (filters.search && filters.search.trim() !== '') {
            const searchTerm = filters.search.toLowerCase().trim();
            filtered = filtered.filter(car => 
                car.name.toLowerCase().includes(searchTerm) ||
                car.brand.toLowerCase().includes(searchTerm) ||
                car.category.toLowerCase().includes(searchTerm)
            );
        }

        // Filter by category
        if (filters.category && filters.category !== 'all') {
            filtered = filtered.filter(car => car.category === filters.category);
        }

        // Filter by price range
        if (filters.minPrice !== undefined && filters.minPrice !== null) {
            filtered = filtered.filter(car => car.price >= filters.minPrice);
        }
        if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
            filtered = filtered.filter(car => car.price <= filters.maxPrice);
        }

        // Filter by horsepower
        if (filters.minHorsepower !== undefined && filters.minHorsepower !== null) {
            filtered = filtered.filter(car => car.horsepower >= filters.minHorsepower);
        }
        if (filters.maxHorsepower !== undefined && filters.maxHorsepower !== null) {
            filtered = filtered.filter(car => car.horsepower <= filters.maxHorsepower);
        }

        return filtered;
    },

    
    // Sort cars
    
    sortCars(cars, sortBy = 'name', order = 'asc') {
        const sorted = [...cars];

        sorted.sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'price':
                    comparison = a.price - b.price;
                    break;
                case 'horsepower':
                    comparison = a.horsepower - b.horsepower;
                    break;
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'year':
                    comparison = a.year - b.year;
                    break;
                default:
                    comparison = 0;
            }

            return order === 'desc' ? -comparison : comparison;
        });

        return sorted;
    },

    
    // unique categor
    getCategories(cars) {
        const categories = [...new Set(cars.map(car => car.category))];
        return categories.sort();
    },

    
    getPriceStats(cars) {
        if (!cars.length) return { min: 0, max: 0, avg: 0 };

        const prices = cars.map(car => car.price);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices),
            avg: Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length)
        };
    },

    
    getHorsepowerStats(cars) {
        if (!cars.length) return { min: 0, max: 0, avg: 0 };

        const horsepowers = cars.map(car => car.horsepower);
        return {
            min: Math.min(...horsepowers),
            max: Math.max(...horsepowers),
            avg: Math.round(horsepowers.reduce((sum, hp) => sum + hp, 0) / horsepowers.length)
        };
    }
};
