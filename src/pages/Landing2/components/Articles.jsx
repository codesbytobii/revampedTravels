import { useRef, useState, useCallback, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../../utils/blogs';

const AUTOPLAY_MS = 4500;

/* Fallback image used when the API doesn't return a featured_image */
const FALLBACK_IMG =
	'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=70';

function Articles() {
	const trackRef = useRef(null);
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const [active, setActive] = useState(0);
	const [paused, setPaused] = useState(false);
	const [inView, setInView] = useState(true);
	const [layoutKey, setLayoutKey] = useState(0);

	/* ---------- Fetch ---------- */
	useEffect(() => {
		let cancelled = false;

		const run = async () => {
			setLoading(true);
			setError('');
			try {
				const { list } = await fetchBlogs({ page: 1 });
				if (!cancelled) setArticles(list.slice(0, 3));
			} catch (err) {
				console.error(err);
				if (!cancelled) {
					setError('Could not load articles.');
					setArticles([]);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		run();
		return () => { cancelled = true; };
	}, []);

	/* ---------- Carousel ---------- */
	const onScroll = useCallback(() => {
		const el = trackRef.current;
		if (!el || !el.firstElementChild) return;
		const step = el.firstElementChild.offsetWidth;
		const max = el.scrollWidth - el.clientWidth;
		const i = el.scrollLeft >= max - 2 ? articles.length - 1 : Math.round(el.scrollLeft / step);
		setActive(Math.min(articles.length - 1, Math.max(0, i)));
	}, [articles.length]);

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
		if (paused || !inView || articles.length === 0) return undefined;
		const id = setTimeout(() => {
			const el = trackRef.current;
			if (!el || el.scrollWidth <= el.clientWidth + 2) return;
			goTo(active >= articles.length - 1 ? 0 : active + 1);
		}, AUTOPLAY_MS);
		return () => clearTimeout(id);
	}, [paused, inView, active, layoutKey, goTo, articles.length]);

	/* ---------- Render ---------- */
	return (
		<section className="pt-5 articles-section">
			<Container>
				<Row className="align-items-center justify-content-center">
					<Col xl={8} lg={9} md={11} sm={12}>
						<div className="secHeading-wrap text-center mb-5">
							<h2>Trending &amp; Popular Articles</h2>
							<p>Travel guides, money-saving tips and destination ideas to help you plan your next trip.</p>
						</div>
					</Col>
				</Row>

				{loading ? (
					<div className="text-center py-5">
						<div className="spinner-border text-primary" role="status" />
						<p className="text-muted mt-3 mb-0">Loading articles…</p>
					</div>
				) : articles.length === 0 ? (
					<div className="text-center py-5">
						<i
							className="fa-regular fa-newspaper text-muted"
							style={{ fontSize: '2rem', opacity: .5 }}
						></i>
						<p className="text-muted mt-3 mb-0">{error || 'No articles yet.'}</p>
					</div>
				) : (
					<>
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
								<Col key={a.id} xl={4} lg={4} md={4} sm={12}>
									<Card className="article-card blogGrid-wrap border rounded-3 h-100 overflow-hidden">
										<div className="blogGrid-pics">
											<Link
												to={`/blog/${a.slug}`}
												className="article-media"
												aria-label={a.title}
											>
												{/* {a.tags[0] && <span className="article-tag">{a.tags[0]}</span>} */}
												<img
													src={a.image}
													alt={a.title}
													loading="lazy"
													onError={e => { e.currentTarget.src = FALLBACK_IMG; }}
												/>
											</Link>
										</div>

										<Card.Body className="blogGrid-caps p-4 d-flex flex-column">
											<div className="article-meta d-flex align-items-center mb-2">
												<span>
													<i className="fa-regular fa-calendar me-2"></i>
													{a.date}
												</span>
												<span className="dot"></span>
												<span className="article-readtime">
													<i className="fa-regular fa-clock me-2"></i>
													{a.readTime}
												</span>
											</div>

											<h4 className="article-title fw-bold fs-6 lh-base">
												<Link to={`/blog/${a.slug}`} className="text-dark text-decoration-none">
													{a.title}
												</Link>
											</h4>
											<p className="article-excerpt text-muted m-0">{a.excerpt}</p>
										</Card.Body>

										<Card.Footer className="bg-white border-top px-4 py-3 d-flex align-items-center justify-content-end">
											<Link
												to={`/blog/${a.slug}`}
												className="article-more text-primary fw-medium text-decoration-none"
											>
												Read More
												<i className="fa-solid fa-arrow-trend-up ms-2"></i>
											</Link>
										</Card.Footer>
									</Card>
								</Col>
							))}
						</Row>

						{/* mobile slider dots */}
						<div
							className="d-flex d-md-none justify-content-center gap-2 mt-2"
							role="group"
							aria-label="Article slides"
						>
							{articles.map((a, i) => (
								<button
									key={a.id}
									type="button"
									aria-label={`Go to article ${i + 1}`}
									aria-current={i === active}
									className={`articles-dot ${i === active ? 'is-active' : ''}`}
									onClick={() => goTo(i)}
								/>
							))}
						</div>
					</>
				)}

				<Row className="align-items-center justify-content-center">
					<Col xl={12} lg={12} md={12}>
						<div className="text-center position-relative mt-5">
							<Link to="/blog" className="btn btn-light-primary fw-medium px-5">
								View All Articles
								<i className="fa-solid fa-arrow-trend-up ms-2"></i>
							</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

export default Articles;