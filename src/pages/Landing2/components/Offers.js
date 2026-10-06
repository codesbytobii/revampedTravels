// Single source of truth for the offers slider (Features) AND the detail page (Destinationdetals).
// The slug is what appears in the URL: /destination-detail/los-angeles
// NOTE: all text below (descriptions, hotels, flights, itineraries) is sample content - replace with your real data.

import city1 from 'assets/img/city/ct-1.png';
import city5 from 'assets/img/city/ct-5.png';
import city6 from 'assets/img/city/ct-6.png';
import tr2 from 'assets/img/destination/tr-2.jpg';
import tr3 from 'assets/img/destination/tr-3.jpg';
import tr4 from 'assets/img/destination/tr-4.jpg';
import tr5 from 'assets/img/destination/tr-5.jpg';
import team1 from 'assets/img/team-1.jpg';
import team3 from 'assets/img/team-3.jpg';

// Shared by every destination unless an offer overrides it
const shared = {
	inclusions: [
		'Meal Plan', 'Breakfast', 'Station/Airport Pick and Drop', 'Inter-city Transfers',
		'Sightseeing', 'Entrance Fees', 'Hotel accommodation', 'Road taxes', 'Parking fees', 'Airfare',
	],
	exclusions: [
		'Lunch', 'Dinner', 'Personal Expenses', 'Visa', 'Guide charges',
		'Government Service Tax', 'City Taxes', 'Extra Stay', 'Overseas Medi-Claim Insurance',
	],
	dayActivities: [
		{ icon: 'fa-solid fa-mug-saucer', label: 'Sightseeing' },
		{ icon: 'fa-solid fa-spa', label: 'Breakfast' },
		{ icon: 'fa-solid fa-bed', label: 'Stay Included' },
	],
	ratings: [
		{ label: 'Dishes', score: 8.7 },
		{ label: 'Swimming', score: 9.2 },
		{ label: 'Rooms', score: 8.8 },
		{ label: 'Location', score: 8.9 },
		{ label: 'Services', score: 9.2 },
		{ label: 'Cleanliness', score: 8.6 },
	],
	reviews: [
		{ name: 'Adam Bluecart', country: 'Canada', date: '10 July 2026', avatar: team1, text: 'Everything was smooth from pick-up to check-in. The itinerary was well paced and the guides were friendly and knowledgeable.' },
		{ name: 'Kemi Adeyemi', country: 'Nigeria', date: '2 June 2026', avatar: null, text: 'Great value for the price. Hotel was clean, transfers were on time, and the sightseeing days were the highlight of the trip.' },
		{ name: 'Daniel Ross', country: 'United Kingdom', date: '18 May 2026', avatar: team3, text: 'Would book again. Support answered quickly when we needed to adjust a pick-up time.' },
	],
	coupons: [
		{ code: 'EUROPESUMMER', amount: 12000, applied: true },
		{ code: 'EUROPEWINTER', amount: 12500, applied: false },
		{ code: 'EUROPESUPER', amount: 12800, applied: false },
	],
};

const rawOffers = [
	{
		id: 1,
		slug: 'los-angeles',
		city: 'Los Angeles',
		title: 'Los Angeles Highlights Getaway',
		discount: '20% off',
		img: city6,
		trip: 'Round-trip',
		duration: '3D/4N',
		persons: '3 Person',
		price: '$849 - $999',
		priceFrom: 849,
		originalPrice: 1061,
		departure: '12 Dec 2026',
		stays: ['2N Hollywood', '2N Santa Monica'],
		reviewScore: 92,
		reviewCount: 786,
		description:
			'Soak up the California sun on this Los Angeles getaway. Walk the Hollywood Walk of Fame, catch the sunset from Santa Monica Pier and enjoy the best of the city with hotel stays, transfers and sightseeing all taken care of.',
		highlights: [
			'Hollywood Walk of Fame and Griffith Observatory views',
			'Sunset at Santa Monica Pier',
			'Guided Beverly Hills and Rodeo Drive tour',
			'Venice Beach boardwalk afternoon',
			'Airport transfers included',
		],
		itinerary: [
			{ title: 'Los Angeles: Arrival and Hollywood Evening', tags: ['Arrival', 'Leisure Day'], text: 'Arrive at LAX, meet your representative and transfer to your Hollywood hotel. After check-in, take an evening stroll along the Walk of Fame.' },
			{ title: 'Los Angeles: City Sightseeing Tour', tags: ['City Tour', 'Transfers'], text: 'Full-day guided tour covering Beverly Hills, Rodeo Drive and Griffith Observatory, with time for photos and lunch on your own.' },
			{ title: 'Santa Monica: Beach Day and Departure', tags: ['Beach', 'Departure'], text: 'Spend the morning at Venice Beach and Santa Monica Pier before your transfer to the airport.' },
		],
		flight: { airline: 'Delta Air Lines', cabin: 'Economy', departTime: '22:10', from: 'LOS', arriveTime: '09:30', to: 'LAX', duration: '19H 20M', stops: '1 Stop' },
		hotel: { name: 'The Hollywood Grand Hotel', stars: 4, area: 'Hollywood', distance: '12 km from LAX', amenities: ['Parking', 'WiFi', 'Eating', 'Cooling', 'Pool'], room: 'Standard Twin Double Room' },
		activity: { title: 'Hollywood and Beverly Hills Tour', tag: 'Los Angeles', area: 'Hollywood', distance: '6 km from hotel', places: ['Walk of Fame', 'Griffith Observatory', 'Rodeo Drive'], duration: '7 hrs', placesCovered: 4 },
	},
	{
		id: 2,
		slug: 'united-kingdom',
		city: 'United Kingdom',
		title: 'London and Beyond Classic Break',
		discount: '15% off',
		img: city5,
		trip: 'Round-trip',
		duration: '3D/4N',
		persons: '2 Person',
		price: '$399 - $599',
		priceFrom: 399,
		originalPrice: 469,
		departure: '20 Nov 2026',
		stays: ['2N London', '2N Windsor'],
		reviewScore: 90,
		reviewCount: 512,
		description:
			'A relaxed introduction to the United Kingdom. See the landmarks of London, step inside Windsor Castle and enjoy comfortable stays with transfers and sightseeing included.',
		highlights: [
			'Tower of London and Tower Bridge visit',
			'Buckingham Palace and Westminster walk',
			'Day trip to Windsor Castle',
			'Thames evening cruise',
			'Airport transfers included',
		],
		itinerary: [
			{ title: 'London: Arrival and Westminster Walk', tags: ['Arrival', 'Leisure Day'], text: 'Land at Heathrow, transfer to your hotel and join a short evening walk past Westminster and Big Ben.' },
			{ title: 'London: Landmarks Sightseeing Tour', tags: ['City Tour', 'Transfers'], text: 'Visit the Tower of London, cross Tower Bridge and enjoy a Thames cruise at sunset.' },
			{ title: 'Windsor: Castle Visit and Departure', tags: ['Day Trip', 'Departure'], text: 'Tour Windsor Castle in the morning, then transfer back for your flight home.' },
		],
		flight: { airline: 'British Airways', cabin: 'Economy', departTime: '08:15', from: 'LOS', arriveTime: '14:25', to: 'LHR', duration: '6H 10M', stops: 'Direct' },
		hotel: { name: 'The Kensington Court Hotel', stars: 4, area: 'Kensington', distance: '24 km from Heathrow', amenities: ['WiFi', 'Eating', 'Cooling', 'Gym'], room: 'Standard King Room' },
		activity: { title: 'Royal London Walking Tour', tag: 'London', area: 'Westminster', distance: '3 km from hotel', places: ['Tower Bridge', 'Buckingham Palace', 'Big Ben'], duration: '5 hrs', placesCovered: 5 },
	},
	{
		id: 3,
		slug: 'france',
		city: 'France',
		title: 'Paris Romance and Culture Escape',
		discount: '30% off',
		img: city1,
		trip: 'Round-trip',
		duration: '3D/4N',
		persons: '3 Person',
		price: '$569 - $799',
		priceFrom: 569,
		originalPrice: 813,
		departure: '5 Dec 2026',
		stays: ['2N Paris', '2N Versailles'],
		reviewScore: 94,
		reviewCount: 934,
		description:
			'Discover Paris at an easy pace. Visit the Eiffel Tower, wander through the Louvre and spend a day at the Palace of Versailles, with hotel, transfers and guided sightseeing included.',
		highlights: [
			'Eiffel Tower summit visit',
			'Skip-the-line Louvre Museum entry',
			'Day trip to the Palace of Versailles',
			'Seine river evening cruise',
			'Airport transfers included',
		],
		itinerary: [
			{ title: 'Paris: Arrival and Eiffel Tower Evening', tags: ['Arrival', 'Leisure Day'], text: 'Arrive at Charles de Gaulle, transfer to your hotel and head to the Eiffel Tower for an evening view of the city.' },
			{ title: 'Paris: Louvre and Seine Cruise', tags: ['City Tour', 'Cruise'], text: 'Guided Louvre visit in the morning followed by free time in Le Marais and an evening cruise on the Seine.' },
			{ title: 'Versailles: Palace Visit and Departure', tags: ['Day Trip', 'Departure'], text: 'Explore the Palace of Versailles and its gardens before transferring to the airport.' },
		],
		flight: { airline: 'Air France', cabin: 'Economy', departTime: '09:05', from: 'LOS', arriveTime: '15:00', to: 'CDG', duration: '5H 55M', stops: 'Direct' },
		hotel: { name: 'Hotel Lumiere Paris', stars: 4, area: 'Le Marais', distance: '28 km from CDG Airport', amenities: ['WiFi', 'Eating', 'Cooling', 'Pet'], room: 'Superior Double Room' },
		activity: { title: 'Louvre and Seine Day Tour', tag: 'Paris', area: 'Louvre', distance: '2 km from hotel', places: ['Louvre Museum', 'Seine Cruise', 'Notre-Dame'], duration: '6 hrs', placesCovered: 4 },
	},
];

export const offers = rawOffers.map((o) => ({
	...shared,
	...o,
	// main photo is the card the user clicked, the rest come from the destination gallery
	gallery: [o.img, tr2, tr3, tr4, tr5],
}));

export const getOfferBySlug = (slug) => offers.find((o) => o.slug === slug);