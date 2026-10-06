import { useRef, useState, useCallback, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import blog1 from '../../../assets/img/blog-1.jpg';
import blog2 from '../../../assets/img/blog-2.jpg';
import blog3 from '../../../assets/img/blog-3.jpg';
import { Link } from 'react-router-dom';

/* ---------- Sample data (swap for your API) ---------- */
const articles = [
	{
		img: blog1, tag: 'Destination', date: 'Sep 24, 2026', readTime: '6 min read', author: 'Sarah Bennett',
		title: 'Delhi To Paris: How To Fly Comfortably And Still Get The Best Price',
		excerpt: 'From picking the right travel dates to choosing the best seat, here is how to plan a smooth long-haul trip without overspending.',
	},
	{
		img: blog2, tag: 'Journey', date: 'Sep 18, 2026', readTime: '5 min read', author: 'Daniel Okafor',
		title: 'Seven Smart Ways To Find Cheaper Flights For Your Next Adventure',
		excerpt: 'Flexible dates, fare alerts and a few booking habits can cut the cost of your ticket more than you might expect.',
	},
	{
		img: blog3, tag: 'Business', date: 'Sep 10, 2026', readTime: '4 min read', author: 'Priya Sharma',
		title: 'Business Travel Made Easy: Planning, Packing And Staying Productive',
		excerpt: 'A simple checklist for frequent travellers who want to arrive rested, organised and ready for the first meeting.',
	},
];

const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
const AUTOPLAY_MS = 4500;

/* Scoped extras that Bootstrap utilities can't do */

function Articles() {
	const trackRef = useRef(null);
	const [active, setActive] = useState(0);

	const onScroll = useCallback(() => {
		const el = trackRef.current;
		if (!el || !el.firstElementChild) return;
		const step = el.firstElementChild.offsetWidth;
		const max = el.scrollWidth - el.clientWidth;
		const i = el.scrollLeft >= max - 2 ? articles.length - 1 : Math.round(el.scrollLeft / step);
		setActive(Math.min(articles.length - 1, Math.max(0, i)));
	}, []);

	const goTo = useCallback((i) => {
		const el = trackRef.current;
		if (!el || !el.children[i]) return;
		const child = el.children[i];
		const offset = child.getBoundingClientRect().left - el.getBoundingClientRect().left;
		el.scrollTo({ left: el.scrollLeft + offset - (el.clientWidth - child.offsetWidth) / 2, behavior: 'smooth' });
	}, []);

	/* autoplay (mobile slider only): advances every few seconds, loops back to the start,
	   pauses while the visitor is touching/hovering or the section is off-screen */
	const [paused, setPaused] = useState(false);
	const [inView, setInView] = useState(true);
	const [layoutKey, setLayoutKey] = useState(0);

	useEffect(() => {
		const el = trackRef.current;
		if (!el || typeof IntersectionObserver === 'undefined') return undefined;
		const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
		io.observe(el);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		const onResize = () => setLayoutKey(k => k + 1);
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	useEffect(() => {
		if (paused || !inView) return undefined;
		const id = setTimeout(() => {
			const el = trackRef.current;
			// only slide when the row is actually scrollable (i.e. the mobile layout)
			if (!el || el.scrollWidth <= el.clientWidth + 2) return;
			goTo(active >= articles.length - 1 ? 0 : active + 1);
		}, AUTOPLAY_MS);
		return () => clearTimeout(id);
	}, [paused, inView, active, layoutKey, goTo]);

	return (
		<section className="pt-5 articles-section">
			<Container>
				<Row className="align-items-center justify-content-center">
					<Col xl={8} lg={9} md={11} sm={12}>
						<div className="secHeading-wrap text-center mb-5">
							<h2>Trending & Popular Articles</h2>
							<p>Travel guides, money-saving tips and destination ideas to help you plan your next trip.</p>
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
					className="articles-row justify-content-center g-4"
				>
					{articles.map((a) => (
						<Col key={a.title} xl={4} lg={4} md={4} sm={12}>
							<Card className="article-card blogGrid-wrap border rounded-3 h-100 overflow-hidden">
								<div className="blogGrid-pics">
									<Link to="#" className="article-media" aria-label={a.title}>
										<span className="article-tag">{a.tag}</span>
										<img src={a.img} alt="" loading="lazy" />
									</Link>
								</div>

								<Card.Body className="blogGrid-caps p-4 d-flex flex-column">
									<div className="article-meta d-flex align-items-center mb-2">
										<span><i className="fa-regular fa-calendar me-2"></i>{a.date}</span>
										<span className="dot"></span>
										<span className="article-readtime"><i className="fa-regular fa-clock me-2"></i>{a.readTime}</span>
									</div>

									<h4 className="article-title fw-bold fs-6 lh-base">
										<Link to="#" className="text-dark text-decoration-none">{a.title}</Link>
									</h4>
									<p className="article-excerpt text-muted m-0">{a.excerpt}</p>
								</Card.Body>

								<Card.Footer className="bg-white border-top px-4 py-3 d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center gap-2">
										<span className="article-avatar">{initials(a.author)}</span>
										<small className="fw-medium text-dark">{a.author}</small>
									</div>
									<Link to="#" className="article-more text-primary fw-medium text-decoration-none">
										Read More<i className="fa-solid fa-arrow-trend-up ms-2"></i>
									</Link>
								</Card.Footer>
							</Card>
						</Col>
					))}
				</Row>

				{/* slider dots: mobile only */}
				<div className="d-flex d-md-none justify-content-center gap-2 mt-2" role="group" aria-label="Article slides">
					{articles.map((a, i) => (
						<button
							key={a.title}
							type="button"
							aria-label={`Go to article ${i + 1}`}
							aria-current={i === active}
							className={`articles-dot ${i === active ? 'is-active' : ''}`}
							onClick={() => goTo(i)}
						/>
					))}
				</div>

				<Row className="align-items-center justify-content-center">
					<Col xl={12} lg={12} md={12}>
						<div className="text-center position-relative mt-5">
							<Link to="#" className="btn btn-light-primary fw-medium px-5">
								View All Articles<i className="fa-solid fa-arrow-trend-up ms-2"></i>
							</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

export default Articles;