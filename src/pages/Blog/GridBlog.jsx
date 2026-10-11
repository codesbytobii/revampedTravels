import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import NewsletterCTA from '../Landing2/components/NewsletterCTA';
import { getImgUrl } from '../Landing2/utils/asset';
import { fetchBlogs } from '../../utils/blogs';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=70';

const GridBlog = () => {
	const [blogs, setBlogs] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState('');

	/* ---------- Initial fetch + subsequent loads ---------- */
	useEffect(() => {
		let cancelled = false;

		const run = async () => {
			if (page === 1) setLoading(true);
			else setLoadingMore(true);
			setError('');

			try {
				const { list, meta } = await fetchBlogs({ page });
				if (!cancelled) {
					setBlogs(prev => (page === 1 ? list : [...prev, ...list]));
					setLastPage(meta.lastPage || 1);
				}
			} catch (err) {
				console.error(err);
				if (!cancelled) setError('Could not load articles.');
			} finally {
				if (!cancelled) {
					setLoading(false);
					setLoadingMore(false);
				}
			}
		};

		run();
		return () => { cancelled = true; };
	}, [page]);

	const handleLoadMore = () => {
		if (page < lastPage) setPage(p => p + 1);
	};

	return (
		<Layout footerMode="dark">
			<section
				className="bg-cover position-relative"
				style={{ background: `url(${getImgUrl('bg-title.jpg')}) no-repeat` }}
				data-overlay="5"
			>
				<Container>
					<Row className="align-items-center justify-content-center">
						<Col xl={7} lg={9} md={12}>
							<div className="fpc-capstion text-center my-4">
								<div className="fpc-captions">
									<h1 className="xl-heading text-light">Get-in Touch</h1>
									<p className="text-light">
										Stories, guides and updates from our travels desk.
									</p>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			<section>
				<div className="container">
					{loading ? (
						<div className="text-center py-5">
							<div className="spinner-border text-primary" role="status" />
							<p className="text-muted mt-3 mb-0">Loading articles…</p>
						</div>
					) : blogs.length === 0 ? (
						<div className="text-center py-5">
							<i
								className="fa-regular fa-newspaper text-muted"
								style={{ fontSize: '2rem', opacity: .5 }}
							></i>
							<p className="text-muted mt-3 mb-0">{error || 'No articles yet.'}</p>
						</div>
					) : (
						<>
							<div className="row justify-content-center g-4">
								{blogs.map(b => (
									<div key={b.id} className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
										<div className="blogGrid-wrap d-flex flex-column h-100">
											<div className="blogGrid-pics">
												<Link to={`/blog/${b.slug}`} className="d-block">
													<img
														src={b.image || FALLBACK_IMG}
														className="img-fluid rounded"
														alt={b.title}
														loading="lazy"
														onError={e => { e.currentTarget.src = FALLBACK_IMG; }}
													/>
												</Link>
											</div>
											<div className="blogGrid-caps pt-3">
												{b.tags[0] && (
													<div className="d-flex align-items-center mb-1">
														<span className="label text-success bg-light-success">{b.tags[0]}</span>
													</div>
												)}
												<h4 className="fw-bold fs-6 lh-base">
													<Link to={`/blog/${b.slug}`} className="text-dark">{b.title}</Link>
												</h4>
												<p className="mb-3">{b.excerpt}</p>
												<Link to={`/blog/${b.slug}`} className="text-primary fw-medium">
													Read More<i className="fa-solid fa-arrow-trend-up ms-2"></i>
												</Link>
											</div>
										</div>
									</div>
								))}
							</div>

							{page < lastPage && (
								<div className="row align-items-center">
									<div className="col-xl-12 col-lg-12 col-md-12">
										<div className="d-flex align-items-center justify-content-center mt-5 mx-auto text-center">
											<button
												type="button"
												className="btn btn-dark rounded-pill px-5 fw-medium"
												onClick={handleLoadMore}
												disabled={loadingMore}
											>
												{loadingMore ? (
													<>
														<span className="spinner-border spinner-border-sm me-2" role="status" />
														Loading…
													</>
												) : (
													'Load More'
												)}
											</button>
										</div>
									</div>
								</div>
							)}
						</>
					)}
				</div>
			</section>

			<NewsletterCTA />
		</Layout>
	);
};

export default GridBlog;