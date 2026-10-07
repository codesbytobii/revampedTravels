// src/utils/flights.js
const OFFER_API = 'https://travels.ffsdgroup.com/api/flight/search/offer';
const PRICE_API = 'https://travels.ffsdgroup.com/api/flight/price/confirm';

const CONFIRM_TOKEN_KEY = 'confirmPriceToken';
const PAY_TOKEN_KEY     = 'payToken';

/* ---------- Tokens ---------- */
export const saveConfirmToken = (token) => {
	if (token) localStorage.setItem(CONFIRM_TOKEN_KEY, token);
};
export const getConfirmToken = () => localStorage.getItem(CONFIRM_TOKEN_KEY);
export const clearConfirmToken = () => localStorage.removeItem(CONFIRM_TOKEN_KEY);

export const savePayToken = (token) => {
	if (token) localStorage.setItem(PAY_TOKEN_KEY, token);
};
export const getPayToken = () => localStorage.getItem(PAY_TOKEN_KEY);

/* ---------- Cabin map ---------- */
export const CABIN_MAP = {
	'Economy':         'ECONOMY',
	'Premium Economy': 'PREMIUM_ECONOMY',
	'Business':        'BUSINESS',
	'First Class':     'FIRST',
};

/* ---------- Date ---------- */
export const fmtDate = (d) => {
	if (!d) return undefined;
	const dt = new Date(d);
	const m = String(dt.getMonth() + 1).padStart(2, '0');
	const day = String(dt.getDate()).padStart(2, '0');
	return `${dt.getFullYear()}-${m}-${day}`;
};

/* =========================================================
   SINGLE-LEG (return / one-way) -> GET
   ========================================================= */
export const buildOfferParams = ({ origin, destination, date, returnDate, travelers, cabin }) => {
	const p = new URLSearchParams({
		originLocationCode: origin,
		destinationLocationCode: destination,
		departureDate: date,
		adults: String(travelers.adults),
		max: '20',
		currencyCode: 'NGN',
		travelClass: CABIN_MAP[cabin] || 'ECONOMY',
	});
	if (returnDate) p.set('returnDate', returnDate);
	if (travelers.children > 0) p.set('children', String(travelers.children));
	if (travelers.infants > 0) p.set('infants', String(travelers.infants));
	return p;
};

export const fetchOffers = async (params, signal) => {
	const res = await fetch(`${OFFER_API}?${params.toString()}`, { signal });
	if (!res.ok) throw new Error(`Request failed: ${res.status}`);
	const data = await res.json();

	if (data?.accessToken) saveConfirmToken(data.accessToken);

	return data;
};

/* =========================================================
   MULTI-CITY -> POST
   ========================================================= */
const toTravelerArray = (travelers) => {
	const out = [];
	let id = 1;
	for (let i = 0; i < (travelers.adults || 0); i++) {
		out.push({ id: String(id++), travelerType: 'ADULT', fareOptions: ['STANDARD'] });
	}
	for (let i = 0; i < (travelers.children || 0); i++) {
		out.push({ id: String(id++), travelerType: 'CHILD', fareOptions: ['STANDARD'] });
	}
	for (let i = 0; i < (travelers.infants || 0); i++) {
		out.push({ id: String(id++), travelerType: 'INFANT', fareOptions: ['STANDARD'] });
	}
	return out;
};

export const buildMultiCityBody = ({ legs, travelers, cabin }) => ({
	currencyCode: 'NGN',
	extra_bag: true,
	originDestinations: legs.map((leg, i) => ({
		id: String(i + 1),
		originLocationCode: leg.origin,
		destinationLocationCode: leg.destination,
		departureDateTimeRange: { date: leg.date, time: leg.time || '10:00:00' },
	})),
	travelers: toTravelerArray(travelers),
	sources: ['GDS'],
	searchCriteria: {
		maxFlightOffers: 250,
		pricingOptions: { fareType: ['PUBLISHED'] },
		flightFilters: {
			cabinRestrictions: legs.map((_, i) => ({
				cabin: CABIN_MAP[cabin] || 'ECONOMY',
				coverage: 'MOST_SEGMENTS',
				originDestinationIds: [String(i + 1)],
			})),
		},
	},
	additionalInformation: { chargeableCheckedBags: true },
});

export const fetchMultiCityOffers = async (body, signal) => {
	const res = await fetch(OFFER_API, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		signal,
	});
	if (!res.ok) throw new Error(`Request failed: ${res.status}`);
	const data = await res.json();

	if (data?.accessToken) saveConfirmToken(data.accessToken);

	return data;
};

/* =========================================================
   PRICE CONFIRM
   ========================================================= */
export const confirmPrice = async (rawOffer) => {
	const token = getConfirmToken();
	if (!token) {
		throw new Error('Missing authorization token. Please search again.');
	}

	const payload = {
		data: {
			type: 'flight-offers-pricing',
			flightOffers: [rawOffer],
		},
	};

	const res = await fetch(PRICE_API, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(payload),
	});

	const text = await res.text();
	let data;
	try { data = JSON.parse(text); } catch { data = null; }

	if (!res.ok) {
		console.error('Price confirm failed:', res.status, text);
		const msg = data?.message || `Price confirmation failed (${res.status})`;
		throw new Error(msg);
	}

	return data;
};

export const extractBookingRequirements = (confirmResponse) => {
	const inner = confirmResponse?.data || {};
	return {
		bookingRequirements: inner.bookingRequirements || null,
		accessToken: inner.accessToken || null,
	};
};

/* ---------- Display helpers ---------- */
const titleCase = (s = '') =>
	s.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

export const formatDuration = (iso) => {
	const m = /PT(?:(\d+)H)?(?:(\d+)M)?/.exec(iso || '');
	if (!m) return '';
	return [m[1] && `${m[1]}H`, m[2] && `${m[2]}M`].filter(Boolean).join(' ');
};

export const formatTime = (at) => (at ? at.slice(11, 16) : '');

export const formatDay = (at) => {
	if (!at) return '';
	return new Date(`${at.slice(0, 10)}T00:00:00`).toLocaleDateString('en-GB', {
		day: '2-digit', month: 'short', year: 'numeric',
	});
};

export const formatPrice = (amount, currency = 'NGN') => {
	try {
		return new Intl.NumberFormat('en-NG', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
	} catch {
		return `${currency} ${Math.round(amount).toLocaleString()}`;
	}
};

export const stopsLabel = (n) => (n === 0 ? 'Direct' : `${n} Stop${n > 1 ? 's' : ''}`);

export const normalizeOffers = (payload) => {
	const list = Array.isArray(payload) ? payload : (payload?.data || payload?.offers || []);
	const flatList =
		Array.isArray(list) ? list :
		Array.isArray(payload?.data?.flightOffers) ? payload.data.flightOffers :
		list;

	const carriers = payload?.dictionaries?.carriers || {};

	return flatList.map((o, idx) => {
		const fares = o.travelerPricings?.[0]?.fareDetailsBySegment || [];

		const itineraries = (o.itineraries || []).map((it, i, all) => {
			const segs = it.segments || [];
			const first = segs[0] || {};
			const last  = segs[segs.length - 1] || {};
			const cabinRaw = (fares.find(f => f.segmentId === first.id) || fares[0] || {}).cabin;

			const internalStops = segs.reduce((n, s) => n + (s.numberOfStops || 0), 0);
			const stops = Math.max(segs.length - 1 + internalStops, 0);

			const isReturn = all.length === 2 && i === 1;
			const label = isReturn
				? 'Return'
				: (all.length > 2 ? `Flight ${i + 1}` : 'Departure');

			return {
				label,
				date: formatDay(first.departure?.at),
				from: first.departure?.iataCode,
				to: last.arrival?.iataCode,
				depTime: formatTime(first.departure?.at),
				arrTime: formatTime(last.arrival?.at),
				duration: formatDuration(it.duration),
				stops,
				carrierCode: first.carrierCode,
				carrierName: titleCase(carriers[first.carrierCode] || first.carrierCode),
				cabin: cabinRaw ? titleCase(cabinRaw) : '',
			};
		});

		return {
			id: String(o.id ?? idx),
			price: Number(o.price?.grandTotal ?? o.price?.total ?? 0),
			ffsdTotal: Number(o.price?.ffsd_total ?? o.price?.grandTotal ?? o.price?.total ?? 0),
			currency: o.price?.currency || 'NGN',
			seatsLeft: Number(o.numberOfBookableSeats ?? 0),
			itineraries,
			raw: o,
		};
	});
};