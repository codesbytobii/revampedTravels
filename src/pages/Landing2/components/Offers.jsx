import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import attr5 from '../../../assets/img/attr/attr-5.jpg';
import attr6 from '../../../assets/img/attr/attr-6.jpg';
import attr7 from '../../../assets/img/attr/attr-7.jpg';
import attr8 from '../../../assets/img/attr/attr-8.jpg';
import attr9 from '../../../assets/img/attr/attr-9.jpg';
import attr10 from '../../../assets/img/attr/attr-10.jpg';
import tour10 from '../../../assets/img/tours/tour-10.jpg';
import tour11 from '../../../assets/img/tours/tour-11.jpg';

/* ---------- Sample data (swap for your API) ---------- */
const OFFERS = [
	{ id: 1, type: 'flight', from: 'Abuja', to: 'Doha', airline: 'Egyptair', duration: '12d', price: 2541152, img: attr7, tag: 'Fresh deals' },
	{ id: 2, type: 'flight', from: 'Abuja', to: 'Lagos', airline: 'Aero', duration: '1d', price: 94143, img: attr5, tag: 'Best value' },
	{ id: 3, type: 'flight', from: 'Lagos', to: 'Washington', airline: 'Qatar Airways', duration: '20d', price: 2112446, img: attr6, tag: 'Fresh deals' },
	{ id: 4, type: 'flight', from: 'Lagos', to: 'Abuja', airline: 'Aero', duration: '1d', price: 94881, img: attr8, tag: 'Popular' },
	{ id: 5, type: 'hotel', name: 'Harbour View Suites', city: 'Lagos', stars: 5, price: 185000, img: attr9, tag: 'Top rated' },
	{ id: 6, type: 'hotel', name: 'Capital Grand Hotel', city: 'Abuja', stars: 4, price: 132000, img: attr10, tag: 'Fresh deals' },
	{ id: 7, type: 'flight', from: 'Lagos', to: 'London', airline: 'British Airways', duration: '14d', price: 1386500, img: tour10, tag: 'Popular' },
	{ id: 8, type: 'hotel', name: 'Palm Crest Resort', city: 'Dubai', stars: 5, price: 310000, img: tour11, tag: 'Top rated' },
];

const TABS = [
	{ key: 'all', label: 'All Offers' },
	{ key: 'flight', label: 'Flights' },
	{ key: 'hotel', label: 'Hotels' },
];

const PAGE_SIZE = 4;          // desktop / tablet: cards per page
const AUTOPLAY_MS = 4500;     // mobile slider: time between slides
const MOBILE_QUERY = '(max-width: 767.98px)';

const formatNaira = (n) =>
	new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);

/* true while the viewport is phone-sized (keeps in sync when rotating / resizing) */
function useIsMobile() {
	const [mobile, setMobile] = useState(
		() => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
	);
	useEffect(() => {
		const mq = window.matchMedia(MOBILE_QUERY);
		const onChange = (e) => setMobile(e.matches);
		setMobile(mq.matches);
		if (mq.addEventListener) mq.addEventListener('change', onChange);
		else mq.addListener(onChange);
		return () => {
			if (mq.removeEventListener) mq.removeEventListener('change', onChange);
			else mq.removeListener(onChange);
		};
	}, []);
	return mobile;
}

/* Small, scoped extras that Bootstrap utilities can't do (hover, image fill, tab underline) */

/* ---------- Card ---------- */
function OfferCard({ offer }) {
	const isFlight = offer.type === 'flight';
	return (
		<Link to="#" className="offer-card card h-100 rounded-3 border m-0 flex-row overflow-hidden text-decoration-none">
			<div className="offer-thumb">
				<img src={offer.img} alt="" loading="lazy" draggable={false} />
			</div>

			<div className="p-3 p-md-4 d-flex flex-column flex-grow-1">
				<div className="d-flex align-items-center justify-content-between">
					<span className="text-uppercase fw-bold text-muted" style={{ fontSize: '.72rem', letterSpacing: '.08em' }}>
						{isFlight ? 'Flights' : 'Hotels'}
					</span>
					<span className="text-uppercase text-muted" style={{ fontSize: '.68rem', letterSpacing: '.06em' }}>
						{offer.tag}
					</span>
				</div>

				<h4 className="fs-5 fw-bold text-dark mt-2 mb-0">
					{isFlight ? (
						<>{offer.from} <i className="bi bi-arrow-right text-primary mx-1"></i> {offer.to}</>
					) : (
						offer.name
					)}
				</h4>
				<div className="offer-bar mt-2 mb-3"></div>

				<p className="text-muted m-0">
					{isFlight
						? <>{offer.airline} · {offer.duration} · from <span className="fw-bold text-dark">{formatNaira(offer.price)}</span></>
						: <>{offer.city} · {offer.stars}-star · from <span className="fw-bold text-dark">{formatNaira(offer.price)}</span> / night</>}
				</p>

				<div className="mt-auto pt-3 text-end">
					<span className="offer-cta text-primary fw-bold text-uppercase" style={{ fontSize: '.82rem', letterSpacing: '.05em' }}>
						Book now <i className="bi bi-arrow-right ms-1 d-inline-block"></i>
					</span>
				</div>
			</div>
		</Link>
	);
}

/* ---------- Section ---------- */
function Offers() {
	const isMobile = useIsMobile();
	const trackRef = useRef(null);

	const [tab, setTab] = useState('all');
	const [page, setPage] = useState(0);   // desktop paging
	const [slide, setSlide] = useState(0); // mobile slider position
	const [paused, setPaused] = useState(false);
	const [inView, setInView] = useState(true);

	const filtered = useMemo(
		() => (tab === 'all' ? OFFERS : OFFERS.filter(o => o.type === tab)),
		[tab]
	);
	const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

	// mobile shows every offer in the slider; larger screens keep the paged grid
	const items = isMobile
		? filtered
		: filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

	const changeTab = (key) => { setTab(key); setPage(0); setSlide(0); };

	/* ----- mobile slider helpers ----- */
	const goTo = useCallback((i) => {
		const el = trackRef.current;
		if (!el || !el.children[i]) return;
		const child = el.children[i];
		const offset = child.getBoundingClientRect().left - el.getBoundingClientRect().left;
		el.scrollTo({ left: el.scrollLeft + offset - (el.clientWidth - child.offsetWidth) / 2, behavior: 'smooth' });
	}, []);

	const onScroll = useCallback(() => {
		const el = trackRef.current;
		if (!el || !isMobile || !el.firstElementChild) return;
		const step = el.firstElementChild.offsetWidth;
		const max = el.scrollWidth - el.clientWidth;
		const last = filtered.length - 1;
		const i = el.scrollLeft >= max - 2 ? last : Math.round(el.scrollLeft / step);
		setSlide(Math.min(last, Math.max(0, i)));
	}, [isMobile, filtered.length]);

	// start from the first card whenever the tab (or layout) changes
	useEffect(() => {
		const el = trackRef.current;
		if (el) el.scrollTo({ left: 0 });
		setSlide(0);
	}, [tab, isMobile]);

	// only autoplay while the slider is on screen
	useEffect(() => {
		const el = trackRef.current;
		if (!el || typeof IntersectionObserver === 'undefined') return undefined;
		const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
		io.observe(el);
		return () => io.disconnect();
	}, []);

	// autoplay: advances every few seconds and loops; a fresh timer starts after every slide change
	useEffect(() => {
		if (!isMobile || paused || !inView || filtered.length <= 1) return undefined;
		const id = setTimeout(() => goTo(slide >= filtered.length - 1 ? 0 : slide + 1), AUTOPLAY_MS);
		return () => clearTimeout(id);
	}, [isMobile, paused, inView, slide, filtered.length, goTo]);

	/* dots: one per slide on mobile, one per page elsewhere */
	const dotCount = isMobile ? filtered.length : pageCount;
	const dotActive = isMobile ? slide : page;
	const onDot = (i) => (isMobile ? goTo(i) : setPage(i));

	return (
		<section className="offers-section">
			<Container>
				<Row className="mb-4">
					<Col xs={12}>
						<div className="offers-head">
							<h2 className="offers-title m-0">Offers</h2>

							<div className="offers-tabs" role="tablist" aria-label="Offer categories">
								{TABS.map(t => (
									<button
										key={t.key}
										type="button"
										role="tab"
										aria-selected={tab === t.key}
										className={`offers-tab ${tab === t.key ? 'is-active' : ''}`}
										onClick={() => changeTab(t.key)}
									>
										{t.label}
									</button>
								))}
							</div>

							<div className="offers-controls">
								<Link to="#" className="fw-bold text-uppercase text-primary text-decoration-none me-2" style={{ fontSize: '.85rem' }}>
									View all
								</Link>
								{/* arrows are for the paged grid; mobile uses swipe + dots */}
								<div className="d-none d-md-flex align-items-center gap-2">
									<button
										type="button"
										className="offers-arrow"
										aria-label="Previous offers"
										disabled={page === 0}
										onClick={() => setPage(p => Math.max(0, p - 1))}
									>
										<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
									</button>
									<button
										type="button"
										className="offers-arrow"
										aria-label="Next offers"
										disabled={page >= pageCount - 1}
										onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))}
									>
										<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
									</button>
								</div>
							</div>
						</div>
					</Col>
				</Row>

				<Row
					ref={trackRef}
					onScroll={onScroll}
					onTouchStart={() => setPaused(true)}
					onTouchEnd={() => setPaused(false)}
					onTouchCancel={() => setPaused(false)}
					onMouseEnter={() => setPaused(true)}
					onMouseLeave={() => setPaused(false)}
					className="offers-row justify-content-center gy-4 gx-xl-3 gx-lg-4 gx-4"
				>
					{items.map(o => (
						<Col key={o.id} xl={6} lg={6} md={12} sm={12}>
							<OfferCard offer={o} />
						</Col>
					))}
				</Row>

				{dotCount > 1 && (
					<Row className="align-items-center justify-content-center">
						<Col xl={12} lg={12} md={12}>
							<div className="d-flex justify-content-center gap-2 mt-3 mt-md-4" role="group" aria-label="Offer slides">
								{Array.from({ length: dotCount }).map((_, i) => (
									<button
										key={i}
										type="button"
										aria-label={`Go to ${isMobile ? 'offer' : 'page'} ${i + 1}`}
										aria-current={i === dotActive}
										className={`offers-dot ${i === dotActive ? 'is-active' : ''}`}
										onClick={() => onDot(i)}
									/>
								))}
							</div>
						</Col>
					</Row>
				)}
			</Container>
		</section>
	);
}

export default Offers;