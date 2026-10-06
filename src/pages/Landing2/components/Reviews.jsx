import { useState, useRef, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import team1 from '../../../assets/img/team-1.jpg';
import team2 from '../../../assets/img/team-2.jpg';
import team3 from '../../../assets/img/team-3.jpg';
import team4 from '../../../assets/img/team-4.jpg';
import team5 from '../../../assets/img/team-5.jpg';
import { getImgUrl } from '../utils/asset';

/* ---------- Sample data (swap for your API) ---------- */
const reviews = [
	{
		name: 'Aman Diwakar', country: 'United States', img: team1, rating: 5,
		title: 'Booking took minutes, not hours',
		text: 'I found a flight and hotel in one sitting and the prices matched exactly at checkout. Support answered my change request the same afternoon.',
		trip: 'Flight + Hotel', date: 'Sep 2026',
	},
	{
		name: 'Kunal M. Thakur', country: 'United States', img: team2, rating: 5,
		title: 'Clear prices, no surprises',
		text: 'What I liked most was that everything was upfront. No hidden fees showed up at the last step, which is rare with travel sites.',
		trip: 'Flight', date: 'Aug 2026',
	},
	{
		name: 'Divya Talwar', country: 'United States', img: team3, rating: 4,
		title: 'Great for planning a family trip',
		text: 'Comparing hotels side by side made it easy to pick one that suited the kids. The itinerary tools saved me a lot of back and forth.',
		trip: 'Hotel', date: 'Aug 2026',
	},
	{
		name: 'Karan Maheshwari', country: 'United States', img: team4, rating: 5,
		title: 'Smooth from search to boarding',
		text: 'Search, payment and confirmation all worked without a hitch, and the booking details landed in my inbox straight away.',
		trip: 'Flight', date: 'Jul 2026',
	},
	{
		name: 'Ritika Mathur', country: 'United States', img: team5, rating: 4,
		title: 'Helpful team when plans changed',
		text: 'My dates shifted at the last minute and the team handled the rebooking patiently. I would happily book here again.',
		trip: 'Flight + Hotel', date: 'Jul 2026',
	},
];

const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
const AUTOPLAY_MS = 5000;

/* Scoped extras that Bootstrap utilities can't do */

function Stars({ rating }) {
	return (
		<div className="d-flex align-items-center" role="img" aria-label={`${rating} out of 5 stars`}>
			{[1, 2, 3, 4, 5].map(i => (
				<span key={i} className={`me-1 text-xs ${i <= rating ? 'text-warning' : 'text-muted-2'}`}>
					<i className={`fa-${i <= rating ? 'solid' : 'regular'} fa-star`}></i>
				</span>
			))}
		</div>
	);
}

function ReviewCard({ r }) {
	return (
		<Card className="review-card border rounded-3 h-100">
			<Card.Body className="p-4 d-flex flex-column">
				<div className="position-absolute top-0 end-0 mt-3 me-3">
					<span className="square--40 circle text-primary bg-light-primary">
						<i className="fa-solid fa-quote-right"></i>
					</span>
				</div>

				<div className="d-flex align-items-center flex-thumbes">
					<div className="revws-pic">
						<img src={r.img} className="review-avatar" alt={r.name} loading="lazy" draggable={false} />
					</div>
					<div className="revws-caps ps-3">
						<h6 className="fw-bold fs-6 m-0">{r.name}</h6>
						<p className="text-muted-2 text-md m-0">
							<i className="fa-solid fa-location-dot me-1 text-xs"></i>{r.country}
						</p>
						<Stars rating={r.rating} />
					</div>
				</div>

				<div className="revws-desc mt-4">
					<h6 className="fw-bold m-0 mb-2">“{r.title}”</h6>
					<p className="review-text m-0 text-md text-muted">{r.text}</p>
				</div>

				<div className="mt-auto pt-4">
					<hr className="m-0 mb-3 opacity-10" />
					<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
						<span className="review-chip">
							<i className="fa-solid fa-plane-departure"></i>{r.trip}
						</span>
						<div className="d-flex align-items-center gap-2">
							<span className="review-verified">
								<i className="fa-solid fa-circle-check"></i>Verified
							</span>
							<small className="text-muted">{r.date}</small>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
}

function Reviews() {
	const trackRef = useRef(null);
	const dragRef = useRef({ x: 0, left: 0 });
	const [index, setIndex] = useState(0);
	const [pages, setPages] = useState(1);
	const [paused, setPaused] = useState(false); // hover / keyboard focus
	const [userPaused, setUserPaused] = useState(false); // pause button

	/* width of one slide + the gap between slides */
	const getStep = useCallback(() => {
		const el = trackRef.current;
		if (!el || !el.firstElementChild) return 1;
		const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
		return el.firstElementChild.offsetWidth + gap;
	}, []);

	/* recompute current page + page count from the scroll position */
	const update = useCallback(() => {
		const el = trackRef.current;
		if (!el) return;
		const step = getStep();
		const max = el.scrollWidth - el.clientWidth;
		const total = Math.max(1, Math.round(max / step) + 1);
		const current = el.scrollLeft >= max - 2 ? total - 1 : Math.round(el.scrollLeft / step);
		setPages(total);
		setIndex(Math.min(total - 1, Math.max(0, current)));
	}, [getStep]);

	const goTo = useCallback((i) => {
		const el = trackRef.current;
		if (!el) return;
		const max = el.scrollWidth - el.clientWidth;
		el.scrollTo({ left: Math.min(i * getStep(), max), behavior: 'smooth' });
	}, [getStep]);

	useEffect(() => {
		update();
		const raf = requestAnimationFrame(update);
		window.addEventListener('resize', update);
		// re-measure whenever the track changes size (fonts/images/layout finishing late)
		let ro;
		if (typeof ResizeObserver !== 'undefined' && trackRef.current) {
			ro = new ResizeObserver(update);
			ro.observe(trackRef.current);
		}
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', update);
			if (ro) ro.disconnect();
		};
	}, [update]);

	/* autoplay: a fresh timer after every slide change (so manual navigation
	   restarts the countdown); loops back to the start after the last slide.
	   Pauses on hover, keyboard focus, or via the pause button. */
	useEffect(() => {
		if (paused || userPaused || pages <= 1) return undefined;
		const id = setTimeout(() => goTo(index >= pages - 1 ? 0 : index + 1), AUTOPLAY_MS);
		return () => clearTimeout(id);
	}, [paused, userPaused, pages, index, goTo]);

	/* mouse drag (touch uses native scrolling) */
	const onMouseDown = (e) => {
		const el = trackRef.current;
		if (!el || e.button !== 0) return;
		dragRef.current = { x: e.pageX, left: el.scrollLeft };
		el.classList.add('is-dragging');
		const move = (ev) => { el.scrollLeft = dragRef.current.left - (ev.pageX - dragRef.current.x); };
		const up = () => {
			window.removeEventListener('mousemove', move);
			window.removeEventListener('mouseup', up);
			el.classList.remove('is-dragging');
			goTo(Math.round(el.scrollLeft / getStep()));
		};
		window.addEventListener('mousemove', move);
		window.addEventListener('mouseup', up);
	};

	const onKeyDown = (e) => {
		if (e.key === 'ArrowRight') { e.preventDefault(); goTo(Math.min(pages - 1, index + 1)); }
		if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(Math.max(0, index - 1)); }
	};

	return (
		<section className="gray-simple bg-cover reviews-section" style={{ background: `url(${getImgUrl('reviewbg.png')}) no-repeat` }}>
			<Container>
				<Row className="align-items-center justify-content-center">
					<Col xl={8} lg={9} md={11} sm={12}>
						<div className="secHeading-wrap text-center mb-5">
							<h2>Loving Reviews By Our Customers</h2>
							<p>Real stories from travellers who planned, booked and flew with us.</p>
							<div className="review-summary mt-2">
								<span className="fs-2 fw-bold lh-1">{average.toFixed(1)}</span>
								<div className="text-start">
									<Stars rating={Math.round(average)} />
									<small className="text-muted">Based on {reviews.length} verified reviews</small>
								</div>
							</div>
						</div>
					</Col>
				</Row>

				<Row className="justify-content-center">
					<Col xl={12} lg={12} md={12} sm={12}>
						<div
							role="region"
							aria-roledescription="carousel"
							aria-label="Customer reviews"
							onMouseEnter={() => setPaused(true)}
							onMouseLeave={() => setPaused(false)}
							onFocus={(e) => { if (e.target.matches(':focus-visible')) setPaused(true); }}
							onBlur={() => setPaused(false)}
						>
							<div
								ref={trackRef}
								className="reviews-track"
								tabIndex={0}
								onScroll={update}
								onMouseDown={onMouseDown}
								onKeyDown={onKeyDown}
							>
								{reviews.map((r) => (
									<div key={r.name} className="reviews-slide">
										<ReviewCard r={r} />
									</div>
								))}
							</div>

							<div className="position-relative d-flex align-items-center justify-content-center gap-3 mt-5">
								<button
									type="button"
									className="reviews-arrow"
									aria-label="Previous reviews"
									disabled={index === 0}
									onClick={() => goTo(Math.max(0, index - 1))}
								>
									<i className="fa-solid fa-chevron-left"></i>
								</button>

								<div className="d-flex align-items-center gap-2">
									{Array.from({ length: pages }).map((_, i) => (
										<button
											key={i}
											type="button"
											aria-label={`Go to slide ${i + 1}`}
											aria-current={i === index}
											className={`reviews-dot ${i === index ? 'is-active' : ''}`}
											onClick={() => goTo(i)}
										/>
									))}
								</div>

								<button
									type="button"
									className="reviews-arrow"
									aria-label="Next reviews"
									disabled={index >= pages - 1}
									onClick={() => goTo(Math.min(pages - 1, index + 1))}
								>
									<i className="fa-solid fa-chevron-right"></i>
								</button>

								<button
									type="button"
									className="reviews-arrow position-absolute end-0"
									aria-label={userPaused ? 'Play auto slide' : 'Pause auto slide'}
									aria-pressed={userPaused}
									onClick={() => setUserPaused(p => !p)}
								>
									<i className={`fa-solid ${userPaused ? 'fa-play' : 'fa-pause'}`}></i>
								</button>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

export default Reviews;