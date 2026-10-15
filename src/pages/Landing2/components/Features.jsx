import { useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

/* 🔧 Real API base + media prefix */
const API_URL   = 'https://test-travels.maypaspace.com/api';
const MEDIA_URL = 'https://test-travels.maypaspace.com/storage';

const FALLBACK_IMG =
	'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=70';

const prefersReducedMotion =
	typeof window !== 'undefined' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Icons ---------- */
const Icon = ({ d }) => (
	<svg
		width="14"
		height="14"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		{d}
	</svg>
);

const icons = {
	trip: <Icon d={<><path d="M17 3l4 4-4 4" /><path d="M3 11V9a2 2 0 0 1 2-2h16" /><path d="M7 21l-4-4 4-4" /><path d="M21 13v2a2 2 0 0 1-2 2H3" /></>} />,
	time: <Icon d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />,
	people: <Icon d={<><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 5.2a3 3 0 0 1 0 5.6" /><path d="M21 20c0-2.6-1.6-4.8-4-5.6" /></>} />,
};

/* ---------- Helpers ---------- */
const formatNaira = (n) => {
	const num = Number(n);
	if (!Number.isFinite(num) || num <= 0) return '';
	try {
		return new Intl.NumberFormat('en-NG', {
			style: 'currency',
			currency: 'NGN',
			maximumFractionDigits: 0,
		}).format(num);
	} catch {
		return `₦${Math.round(num).toLocaleString()}`;
	}
};

/* featured_images arrives as a JSON string like: "[\"featured_images/xxx.png\"]" */
const parseImages = (value) => {
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

const imageOf = (advert) => {
	const first = parseImages(advert.featured_images)[0];
	if (!first) return FALLBACK_IMG;
	// Guard against a full URL already being stored
	if (/^https?:\/\//i.test(first)) return first;
	return `${MEDIA_URL}/${first}`;
};

/* Only show adverts whose date window includes today */
const isActive = (advert) => {
	const now = Date.now();
	const start = advert.start_date ? new Date(advert.start_date).getTime() : null;
	const end   = advert.end_date   ? new Date(advert.end_date).getTime()   : null;
	if (start && now < start) return false;
	if (end   && now > end)   return false;
	return true;
};

/* Short, human-readable duration from the advert's date range */
const durationText = (advert) => {
	const start = advert.start_date ? new Date(advert.start_date) : null;
	const end   = advert.end_date   ? new Date(advert.end_date)   : null;
	if (start && end) {
		const days = Math.max(1, Math.round((end - start) / 86400000));
		return `${days}-day package`;
	}
	return 'Flexible dates';
};

/* Map an API advert → the shape the card UI expects */
const toCard = (advert) => ({
	id: advert.id,
	title: advert.title || 'Special offer',
	city: advert.destination || advert.title || 'Special offer',
	subtitle: advert.excerpt || '',
	img: imageOf(advert),
	category: advert.category?.title || 'Offer',
	trip: advert.category?.title || 'Special',
	duration: durationText(advert),
	persons: 'Available now',
	price: advert.fee ? formatNaira(advert.fee) : 'Enquire',
	discount: advert.fee ? `From ${formatNaira(advert.fee)}` : 'Limited offer',
	slug: advert.slug || advert.id,
	raw: advert,
});

/* ---------- Section ---------- */
function Features() {
	const [adverts, setAdverts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	/* ---------- Fetch adverts ---------- */
	useEffect(() => {
		let cancelled = false;

		const run = async () => {
			setLoading(true);
			setError('');
			try {
				const res = await fetch(`${API_URL}/get/advertisements?page=1`, {
					headers: { Accept: 'application/json' },
				});
				if (!res.ok) throw new Error(`Request failed: ${res.status}`);

				const json = await res.json();

				// Response shapes:
				//   { current_page, data: [...], last_page }   ← what your API returns
				//   { data: { current_page, data: [...] } }
				//   bare array
				const list =
					Array.isArray(json) ? json :
					Array.isArray(json?.data) ? json.data :
					Array.isArray(json?.data?.data) ? json.data.data :
					[];

				if (!cancelled) setAdverts(list);
			} catch (err) {
				console.error('Adverts fetch failed:', err);
				if (!cancelled) {
					setError('Could not load offers.');
					setAdverts([]);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		run();
		return () => { cancelled = true; };
	}, []);

	/* ---------- Map to card shape + filter to active ---------- */
	const cards = useMemo(
		() => adverts.filter(isActive).map(toCard),
		[adverts]
	);

	/* ---------- Loop safety: duplicate if fewer than 6 ---------- */
	const slides = useMemo(() => {
		if (cards.length === 0) return [];
		if (cards.length >= 6) return cards;
		return [...cards, ...cards].map((c, i) => ({ ...c, key: `${c.id}-${i}` }));
	}, [cards]);

	/* ---------- Render ---------- */
	return (
		<section className="ofr-section">
			<Container>
				<div className="ofr-head">
					<div>
						<h2 className="ofr-title">Offers worth packing for</h2>
						<p className="ofr-sub">
							Hand-picked trips with limited-time savings. Book early, prices move quickly.
						</p>
					</div>

					<div className="ofr-nav" role="group" aria-label="Offer slider controls">
						<button type="button" className="ofr-prev" aria-label="Previous offers">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
						</button>
						<button type="button" className="ofr-next" aria-label="Next offers">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
						</button>
					</div>
				</div>

				{loading ? (
					<div className="ofr-state">
						<div className="spinner-border text-primary" role="status" />
						<p className="text-muted mt-3 mb-0">Loading offers…</p>
					</div>
				) : slides.length === 0 ? (
					<div className="ofr-state">
						<i className="bi bi-megaphone ofr-state-icon"></i>
						<p className="text-muted mb-0">{error || 'No offers available right now.'}</p>
					</div>
				) : (
					<Swiper
						modules={[Autoplay, Navigation, A11y]}
						loop
						speed={900}
						spaceBetween={20}
						slidesPerView={1.15}
						grabCursor
						autoplay={
							prefersReducedMotion
								? false
								: { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }
						}
						navigation={{ prevEl: '.ofr-prev', nextEl: '.ofr-next' }}
						breakpoints={{
							576: { slidesPerView: 1.6, spaceBetween: 20 },
							768: { slidesPerView: 2, spaceBetween: 24 },
						}}
						className="ofr-swiper"
					>
						{slides.map((offer) => (
							<SwiperSlide key={offer.key || offer.id}>
								<Link
									to={`/destination-detail/${offer.slug}`}
									className="ofr-card"
									aria-label={`${offer.city}, ${offer.discount}`}
								>
									<img
										src={offer.img}
										alt=""
										className="ofr-img"
										loading="lazy"
										onError={e => { e.currentTarget.src = FALLBACK_IMG; }}
									/>
									<span className="ofr-shade" aria-hidden="true" />

									<span className="ofr-badge">{offer.discount}</span>

									<div className="ofr-panel">
										<h3 className="ofr-city">{offer.city}</h3>

										{offer.subtitle && (
											<p className="ofr-subtitle">{offer.subtitle}</p>
										)}

										<ul className="ofr-meta">
											<li>{icons.trip}{offer.trip}</li>
											<li>{icons.time}{offer.duration}</li>
											<li>{icons.people}{offer.persons}</li>
										</ul>

										<div className="ofr-foot">
											<div className="ofr-price">
												<span className="ofr-from">From</span>
												<span className="ofr-amount">{offer.price}</span>
											</div>
											<span className="ofr-go" aria-hidden="true">
												<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>
											</span>
										</div>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</Container>
		</section>
	);
}

export default Features;