// src/utils/blogs.js
const API_URL = 'https://test-travels.maypaspace.com/api';
const MEDIA_URL = 'https://test-travels.maypaspace.com/storage';

/* ---------- Fetch helpers ---------- */
export const fetchBlogs = async ({ page = 1 } = {}) => {
	const res = await fetch(`${API_URL}/user/blogs/get?page=${page}`, {
		headers: { Accept: 'application/json' },
	});
	if (!res.ok) throw new Error(`Request failed: ${res.status}`);

	const json = await res.json();

	// Support: { data: { data: [...] } } (Laravel paginator), { data: [...] }, or bare array
	const list =
		Array.isArray(json) ? json :
		Array.isArray(json?.data?.data) ? json.data.data :
		Array.isArray(json?.data) ? json.data :
		[];

	const meta = {
		currentPage: json?.data?.current_page ?? 1,
		lastPage: json?.data?.last_page ?? 1,
		total: json?.data?.total ?? list.length,
	};

	return { list: list.map(normalizeBlog), meta };
};

/* ---------- Normalizer ---------- */
export const normalizeBlog = (raw) => ({
	id: raw.id,
	title: raw.title || 'Untitled',
	slug: raw.slug || String(raw.id),
	excerpt: raw.excerpt || stripHtml(raw.post_content || '').slice(0, 180),
	content: raw.post_content || '',
	image: raw.featured_image ? `${MEDIA_URL}/${raw.featured_image}` : null,
	tags: (raw.tags || '')
		.split(/[,#]/)
		.map(t => t.trim())
		.filter(Boolean),
	date: raw.created_at
		? new Date(raw.created_at).toLocaleDateString('en-GB', {
			day: '2-digit', month: 'short', year: 'numeric',
		})
		: '',
	dateISO: raw.created_at || '',
	readTime: estimateReadTime(raw.post_content || ''),
});

/* ---------- Utilities ---------- */
const stripHtml = (html) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const estimateReadTime = (html) => {
	const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
	const mins = Math.max(1, Math.round(words / 200));
	return `${mins} min read`;
};

/* ---------- Fetch one by slug ---------- */
export const fetchBlogBySlug = async (slug) => {
	// If your API has a single-post endpoint, add it here.
	// Fallback: fetch the list and find the matching slug.
	const { list } = await fetchBlogs({ page: 1 });
	return list.find(b => b.slug === slug) || null;
};