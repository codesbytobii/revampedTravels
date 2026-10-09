import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { POPULAR_ROUTES } from '../utils/popularRoutes';

/* ---------- Imagery ---------- */
import abuja      from '../../../assets/img/attr/attr-5.jpg';
import lagos      from '../../../assets/img/attr/attr-8.jpg';
import phc        from '../../../assets/img/attr/attr-6.jpg';
import accra      from '../../../assets/img/attr/attr-7.jpg';
import doha       from '../../../assets/img/attr/attr-9.jpg';
import casablanca from '../../../assets/img/attr/attr-10.jpg';
import nairobi    from '../../../assets/img/tours/tour-10.jpg';
import london     from '../../../assets/img/tours/tour-11.jpg';
import paris      from '../../../assets/img/attr/attr-6.jpg';
import dubai      from '../../../assets/img/attr/attr-9.jpg';
import dc         from '../../../assets/img/attr/attr-7.jpg';

const CITY_IMAGE = {
	ABV: abuja, LOS: lagos, PHC: phc, ACC: accra, DOH: doha,
	CMN: casablanca, NBO: nairobi, LHR: london, CDG: paris,
	DXB: dubai, IAD: dc,
};
const imageFor = (route) => CITY_IMAGE[route.to] || lagos;

const REGION_TABS = [
	{ key: 'all',       label: 'All' },
	{ key: 'Domestic',  label: 'Nigeria' },
	{ key: 'Regional',  label: 'Africa & Middle East' },
	{ key: 'Long haul', label: 'Long haul' },
];

const PAGE_SIZE = 6;
const AUTOPLAY_MS = 6000;
const MOBILE_QUERY = '(max-width: 767.98px)';

/* ---------- Helpers ---------- */
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

const Code = ({ code }) => <span className="rt-code">{code}</span>;

/* ---------- Card ---------- */
function RouteCard({ route, onClick, index }) {
	return (
		<button
			type="button"
			onClick={() => onClick(route)}
			className="rt-card"
			style={{ '--i': index }}
		>
			<div className="rt-card-media">
				<img src={imageFor(route)} alt="" loading="lazy" draggable={false} />
				<div className="rt-card-region">{route.region}</div>
				{route.tag && <div className="rt-card-tag">{route.tag}</div>}
			</div>

			<div className="rt-card-content">
				<div className="rt-card-cities">
					<span className="rt-city">
						<Code code={route.from} />
						<span className="rt-city-name">{route.fromCity}</span>
					</span>

					<span className="rt-route-line" aria-hidden="true">
						<span className="rt-route-dash" />
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20M14 6l6 6-6 6"/></svg>
					</span>

					<span className="rt-city rt-city--right">
						<span className="rt-city-name">{route.toCity}</span>
						<Code code={route.to} />
					</span>
				</div>

				<div className="rt-card-meta">
					<span className="rt-meta-item">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
						{route.duration}
					</span>
					<span className="rt-meta-sep" />
					<span className="rt-meta-item">Depart today</span>
				</div>

				<div className="rt-card-foot">
					<span className="rt-cta">
						View fares
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
					</span>
				</div>
			</div>
		</button>
	);
}

/* ---------- Section ---------- */
function Offers() {
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const trackRef = useRef(null);

	const [region, setRegion] = useState('all');
	const [page, setPage] = useState(0);
	const [slide, setSlide] = useState(0);
	const [paused, setPaused] = useState(false);
	const [inView, setInView] = useState(true);

	const filtered = useMemo(
		() => (region === 'all' ? POPULAR_ROUTES : POPULAR_ROUTES.filter(r => r.region === region)),
		[region]
	);
	const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

	const items = isMobile
		? filtered
		: filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

	const changeRegion = (key) => { setRegion(key); setPage(0); setSlide(0); };

	const handleClick = useCallback((route) => {
		const now = new Date();
		const yyyy = now.getFullYear();
		const mm = String(now.getMonth() + 1).padStart(2, '0');
		const dd = String(now.getDate()).padStart(2, '0');

		navigate('/flights', {
			state: {
				search: {
					tripType: 'oneway',
					cabin: 'Economy',
					travelers: { adults: 1, children: 0, infants: 0 },
					searches: [{
						origin: route.from,
						destination: route.to,
						date: `${yyyy}-${mm}-${dd}`,
					}],
				},
			},
		});
	}, [navigate]);

	const goTo = useCallback((i) => {
		const el = trackRef.current;
		if (!el || !el.children[i]) return;
		const child = el.children[i];
		const offset = child.getBoundingClientRect().left - el.getBoundingClientRect().left;
		el.scrollTo({
			left: el.scrollLeft + offset - (el.clientWidth - child.offsetWidth) / 2,
			behavior: 'smooth',
		});
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

	useEffect(() => {
		const el = trackRef.current;
		if (el) el.scrollTo({ left: 0 });
		setSlide(0);
	}, [region, isMobile]);

	useEffect(() => {
		const el = trackRef.current;
		if (!el || typeof IntersectionObserver === 'undefined') return undefined;
		const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
		io.observe(el);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		if (!isMobile || paused || !inView || filtered.length <= 1) return undefined;
		const id = setTimeout(() => goTo(slide >= filtered.length - 1 ? 0 : slide + 1), AUTOPLAY_MS);
		return () => clearTimeout(id);
	}, [isMobile, paused, inView, slide, filtered.length, goTo]);

	const dotCount = isMobile ? filtered.length : pageCount;
	const dotActive = isMobile ? slide : page;
	const onDot = (i) => (isMobile ? goTo(i) : setPage(i));

	return (
		<section className="rt-section">
			<Container>
				{/* ---------- Header ---------- */}
				<div className="rt-head">
					<div className="rt-head-left">
						<span className="rt-eyebrow">
							<span className="rt-eyebrow-line" />
							Popular routes
						</span>
						<h2 className="rt-headline">
							Where travelers are flying<br />
							<span className="rt-headline-accent">this season.</span>
						</h2>
					</div>

					<div className="rt-head-right">
						<nav className="rt-regions" role="tablist">
							{REGION_TABS.map(t => (
								<button
									key={t.key}
									type="button"
									role="tab"
									aria-selected={region === t.key}
									className={`rt-region ${region === t.key ? 'is-active' : ''}`}
									onClick={() => changeRegion(t.key)}
								>
									{t.label}
								</button>
							))}
						</nav>

						<div className="rt-nav">
							<button
								type="button"
								className="rt-nav-btn"
								aria-label="Previous"
								disabled={page === 0}
								onClick={() => setPage(p => Math.max(0, p - 1))}
							>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
							</button>
							<button
								type="button"
								className="rt-nav-btn"
								aria-label="Next"
								disabled={page >= pageCount - 1}
								onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))}
							>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
							</button>
						</div>
					</div>
				</div>

				{/* ---------- Grid ---------- */}
				<Row
					ref={trackRef}
					onScroll={onScroll}
					onTouchStart={() => setPaused(true)}
					onTouchEnd={() => setPaused(false)}
					onTouchCancel={() => setPaused(false)}
					onMouseEnter={() => setPaused(true)}
					onMouseLeave={() => setPaused(false)}
					className="rt-grid g-3"
				>
					{items.map((r, i) => (
						<Col key={r.id} xl={4} lg={4} md={6} sm={12} xs={12}>
							<RouteCard route={r} onClick={handleClick} index={i} />
						</Col>
					))}
				</Row>

				{/* ---------- Footer ---------- */}
				<div className="rt-foot">
					{dotCount > 1 && (
						<div className="rt-dots" role="group" aria-label="Pages">
							{Array.from({ length: dotCount }).map((_, i) => (
								<button
									key={i}
									type="button"
									aria-label={`Go to ${isMobile ? 'route' : 'page'} ${i + 1}`}
									aria-current={i === dotActive}
									className={`rt-dot ${i === dotActive ? 'is-active' : ''}`}
									onClick={() => onDot(i)}
								/>
							))}
						</div>
					)}

					<Link to="/flights" className="rt-viewall">
						Explore all routes
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
					</Link>
				</div>
			</Container>
		</section>
	);
}

export default Offers;