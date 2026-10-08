// src/utils/popularRoutes.js
export const POPULAR_ROUTES = [
	// --- Domestic ---
	{ id: 1,  from: 'LOS', to: 'ABV', fromCity: 'Lagos', toCity: 'Abuja',         region: 'Domestic',    tag: 'Popular',     duration: '1h 20m' },
	{ id: 2,  from: 'ABV', to: 'LOS', fromCity: 'Abuja', toCity: 'Lagos',         region: 'Domestic',    tag: 'Best value',  duration: '1h 20m' },
	{ id: 3,  from: 'LOS', to: 'PHC', fromCity: 'Lagos', toCity: 'Port Harcourt', region: 'Domestic',    tag: 'Fresh',       duration: '1h 10m' },
	{ id: 4,  from: 'ABV', to: 'PHC', fromCity: 'Abuja', toCity: 'Port Harcourt', region: 'Domestic',    tag: 'Popular',     duration: '1h 15m' },

	// --- Regional ---
	{ id: 5,  from: 'LOS', to: 'ACC', fromCity: 'Lagos', toCity: 'Accra',         region: 'Regional',    tag: 'Fresh',       duration: '1h 05m' },
	{ id: 6,  from: 'LOS', to: 'DOH', fromCity: 'Lagos', toCity: 'Doha',          region: 'Regional',    tag: 'Popular',     duration: '6h 50m' },
	{ id: 7,  from: 'LOS', to: 'CMN', fromCity: 'Lagos', toCity: 'Casablanca',    region: 'Regional',    tag: 'Top rated',   duration: '4h 45m' },
	{ id: 8,  from: 'LOS', to: 'NBO', fromCity: 'Lagos', toCity: 'Nairobi',       region: 'Regional',    tag: 'Popular',     duration: '5h 20m' },

	// --- Long haul ---
	{ id: 9,  from: 'LOS', to: 'LHR', fromCity: 'Lagos', toCity: 'London',        region: 'Long haul',   tag: 'Top rated',   duration: '6h 30m' },
	{ id: 10, from: 'LOS', to: 'CDG', fromCity: 'Lagos', toCity: 'Paris',         region: 'Long haul',   tag: 'Fresh',       duration: '6h 45m' },
	{ id: 11, from: 'LOS', to: 'DXB', fromCity: 'Lagos', toCity: 'Dubai',         region: 'Long haul',   tag: 'Popular',     duration: '7h 15m' },
	{ id: 12, from: 'LOS', to: 'IAD', fromCity: 'Lagos', toCity: 'Washington',    region: 'Long haul',   tag: 'Best value',  duration: '11h 45m' },
];