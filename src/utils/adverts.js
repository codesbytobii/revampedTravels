// src/utils/adverts.js
const API_URL   = 'https://test-travels.maypaspace.com/api';
const MEDIA_URL = 'https://test-travels.maypaspace.com/storage';

/* Shared FFSD WhatsApp number — international format (no +, no spaces, no leading 0) */
export const FFSD_WHATSAPP = '2348070866594';

/* ---------- Response shape helpers ---------- */
const extractList = (json) => {
	if (Array.isArray(json)) return json;
	if (Array.isArray(json?.data)) return json.data;
	if (Array.isArray(json?.data?.data)) return json.data.data;
	return [];
};

export const parseImages = (value) => {
	if (!value) return [];
	if (Array.isArray(value)) return value;
	if (typeof value !== 'string') return [];
	try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
};

export const imageUrl = (path) => {
	if (!path) return null;
	if (/^https?:\/\//i.test(path)) return path;
	return `${MEDIA_URL}/${String(path).replace(/^\/+/, '')}`;
};

export const featuredImage = (advert) => {
	const first = parseImages(advert?.featured_images)[0];
	return imageUrl(first);
};

export const categoryIcon = (advert) => {
	const icon = parseImages(advert?.category?.icon)[0];
	return imageUrl(icon);
};

export const stripHtml = (html) =>
	(html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

/* ---------- WhatsApp ---------- */
/* Build a wa.me link.
   Accepts local (0807…) or international (234807…, +234807…) input.
   - strips +, spaces, dashes
   - converts 0XXXXXXXXXX (11 digits) → 234XXXXXXXXXX
*/
export const buildWhatsAppLink = (number, message = '') => {
	let clean = String(number || '').replace(/[^\d]/g, '').trim();
	if (!clean) return null;

	if (clean.startsWith('0') && clean.length === 11) {
		clean = `234${clean.slice(1)}`;
	}

	const text = message ? `?text=${encodeURIComponent(message)}` : '';
	return `https://wa.me/${clean}${text}`;
};

/* Always use the shared FFSD number for now.
   If you later add per-advert WhatsApp numbers, change body to:
     advert?.whatsapp || advert?.phone || FFSD_WHATSAPP
*/
export const advertWhatsApp = () => FFSD_WHATSAPP;

/* ---------- Fetch a single advert by slug ---------- */
export const fetchAdvertBySlug = async (slug) => {
	if (!slug) throw new Error('Missing slug.');

	// Try dedicated endpoints first (in case backend supports them)
	const candidates = [
		`${API_URL}/get/advertisements/${encodeURIComponent(slug)}`,
		`${API_URL}/get/advertisement/${encodeURIComponent(slug)}`,
	];

	for (const url of candidates) {
		try {
			const res = await fetch(url, { headers: { Accept: 'application/json' } });
			if (!res.ok) continue;

			const json = await res.json();
			const item = json?.data?.id ? json.data : json?.id ? json : null;
			if (item && (item.slug === slug || !item.slug)) return item;
		} catch {
			/* try next */
		}
	}

	// Fallback: paginate the list until we find the slug
	let page = 1;
	let lastPage = 1;
	do {
		const res = await fetch(`${API_URL}/get/advertisements?page=${page}`, {
			headers: { Accept: 'application/json' },
		});
		if (!res.ok) throw new Error(`Request failed: ${res.status}`);

		const json = await res.json();
		const list = extractList(json);

		const hit = list.find(
			(a) => String(a.slug) === String(slug) || String(a.id) === String(slug)
		);
		if (hit) return hit;

		lastPage = json?.last_page ?? json?.data?.last_page ?? page;
		page += 1;
	} while (page <= lastPage);

	throw new Error('Offer not found.');
};