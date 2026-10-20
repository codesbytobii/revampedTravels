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
	if (/^https?:\/\//i.test(first)) return first;
	return `${MEDIA_URL}/${first}`;
};

/* Classify an advert based on its date window */
const getStatus = (advert) => {
	const now   = Date.now();
	const start = advert.start_date ? new Date(`${advert.start_date}T00:00:00`).getTime() : null;
	const end   = advert.end_date   ? new Date(`${advert.end_date}T23:59:59`).getTime()   : null;

	if (start && now < start) return 'upcoming';
	if (end   && now > end)   return 'expired';
	return 'live';
};

const statusText = (advert, status) => {
	if (status === 'expired') {
		const end = advert.end_date
			? new Date(`${advert.end_date}T00:00:00`).toLocaleDateString('en-GB', {
					day: '2-digit', month: 'short', year: 'numeric',
				})
			: null;
		return end ? `This offer ended on ${end}.` : 'This offer has passed.';
	}
	if (status === 'upcoming') {
		const start = advert.start_date
			? new Date(`${advert.start_date}T00:00:00`).toLocaleDateString('en-GB', {
					day: '2-digit', month: 'short', year: 'numeric',
				})
			: null;
		return start
			? `This offer isn't available yet — it starts on ${start}.`
			: "This offer isn't available yet.";
	}
	return '';
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
const toCard = (advert) => {
	const status   = getStatus(advert);
	const startISO = advert.start_date ? `${advert.start_date}T00:00:00` : null;
	const endISO   = advert.end_date   ? `${advert.end_date}T00:00:00`   : null;

	return {
		id: advert.id,
		title: advert.title || 'Special offer',
		city: advert.destination || advert.title || 'Special offer',
		subtitle: advert.excerpt || '',
		img: imageOf(advert),
		category: advert.category?.title || 'Offer',
		trip: advert.category?.title || 'Special',
		duration: durationText(advert),
		// persons: 'Available now',
		price: advert.fee ? formatNaira(advert.fee) : 'Enquire',
		discount:
			status === 'expired'
				? 'Ended'
				: status === 'upcoming' && startISO
					? `Starts ${new Date(startISO).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`
					: advert.fee
						? `From ${formatNaira(advert.fee)}`
						: 'Limited offer',
		slug: advert.slug || advert.id,
		status,
		startISO,
		endISO,
		raw: advert,
	};
};

/* ---------- Section ---------- */
function Features() {
	const [adverts, setAdverts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [toast, setToast] = useState({ show: false, message: '' });

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

	/* ---------- Auto-dismiss toast ---------- */
	useEffect(() => {
		if (!toast.show) return undefined;
		const t = setTimeout(() => setToast({ show: false, message: '' }), 3500);
		return () => clearTimeout(t);
	}, [toast.show]);

	const showBlocked = (offer) => {
		const msg = statusText(offer.raw, offer.status) || 'This offer is not available.';
		setToast({ show: true, message: msg });
	};
	const closeToast = () => setToast({ show: false, message: '' });

	/* ---------- Map to card shape + sort latest first ---------- */
	const cards = useMemo(() => {
		const list = adverts.map(toCard);

		return list.sort((a, b) => {
			const aStart = a.startISO ? new Date(a.startISO).getTime() : -Infinity;
			const bStart = b.startISO ? new Date(b.startISO).getTime() : -Infinity;
			return bStart - aStart;
		});
	}, [adverts]);

	/* ---------- No duplication: use exactly what the API returns ---------- */
	const slides = cards;

	/* ---------- Only enable loop when there are enough slides ---------- */
	const shouldLoop = slides.length >= 3;
	const shouldAutoplay = !prefersReducedMotion && slides.length > 1;

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
						loop={shouldLoop}
						speed={900}
						spaceBetween={20}
						slidesPerView={1.15}
						grabCursor
						autoplay={
							shouldAutoplay
								? { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }
								: false
						}
						navigation={slides.length > 1 ? { prevEl: '.ofr-prev', nextEl: '.ofr-next' } : false}
						breakpoints={{
							576: { slidesPerView: 1.6, spaceBetween: 20 },
							768: { slidesPerView: 2, spaceBetween: 24 },
						}}
						className="ofr-swiper"
					>
						{slides.map((offer) => {
							const isBlocked = offer.status !== 'live';

							const inner = (
								<>
									<img
										src={offer.img}
										alt=""
										className="ofr-img"
										loading="lazy"
										onError={e => { e.currentTarget.src = FALLBACK_IMG; }}
									/>
									<span className="ofr-shade" aria-hidden="true" />

									{offer.status === 'expired' && (
										<span className="ofr-status ofr-status-expired">Ended</span>
									)}
									{offer.status === 'upcoming' && (
										<span className="ofr-status ofr-status-upcoming">Coming soon</span>
									)}

									<span className="ofr-badge">{offer.discount}</span>

									<div className="ofr-panel">
										<h3 className="ofr-city">{offer.city}</h3>

										{offer.subtitle && (
											<p className="ofr-subtitle">{offer.subtitle}</p>
										)}

										<ul className="ofr-meta">
											<li>{icons.trip}{offer.trip}</li>
											<li>{icons.time}{offer.duration}</li>
											{/* <li>{icons.people}{offer.persons}</li> */}
										</ul>

										<div className="ofr-foot">
											<div className="ofr-price">
												<span className="ofr-from">From</span>
												<span className="ofr-amount">{offer.price}</span>
											</div>
											{!isBlocked && (
												<span className="ofr-go" aria-hidden="true">
													<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>
												</span>
											)}
										</div>
									</div>
								</>
							);

							return (
								<SwiperSlide key={offer.id}>
									{isBlocked ? (
										<button
											type="button"
											className={`ofr-card ofr-card--${offer.status}`}
											aria-label={`${offer.city} — ${statusText(offer.raw, offer.status)}`}
											onClick={() => showBlocked(offer)}
										>
											{inner}
										</button>
									) : (
										<Link
											to={`/destination-detail/${offer.slug}`}
											className="ofr-card"
											aria-label={`${offer.city}, ${offer.discount}`}
										>
											{inner}
										</Link>
									)}
								</SwiperSlide>
							);
						})}
					</Swiper>
				)}

				{toast.show && (
					<div className="ofr-toast" role="status" aria-live="polite">
						<i className="bi bi-info-circle me-2" />
						{toast.message}
						<button
							type="button"
							className="ofr-toast-close"
							aria-label="Dismiss"
							onClick={closeToast}
						>
							<i className="bi bi-x" />
						</button>
					</div>
				)}
			</Container>
		</section>
	);
}

export default Features;