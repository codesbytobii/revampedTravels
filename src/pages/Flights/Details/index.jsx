// src/pages/DestinationDetail/DestinationDetail.jsx
import { useEffect, useState } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import Layout from '../../components/Layout/Layout'; // adjust path if needed
import {
	fetchAdvertBySlug,
	featuredImage,
	categoryIcon,
	stripHtml,
} from '../../utils/adverts';

const FALLBACK_IMG =
	'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=70';

const formatNaira = (n) => {
	const num = Number(n);
	if (!Number.isFinite(num) || num <= 0) return '';
	try {
		return new Intl.NumberFormat('en-NG', {
			style: 'currency', currency: 'NGN', maximumFractionDigits: 0,
		}).format(num);
	} catch {
		return `₦${Math.round(num).toLocaleString()}`;
	}
};

const fmtDate = (d) => {
	if (!d) return '';
	const dt = new Date(`${d}T00:00:00`);
	return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
};

const getStatus = (advert) => {
	const now   = Date.now();
	const start = advert?.start_date ? new Date(`${advert.start_date}T00:00:00`).getTime() : null;
	const end   = advert?.end_date   ? new Date(`${advert.end_date}T23:59:59`).getTime()   : null;
	if (start && now < start) return 'upcoming';
	if (end   && now > end)   return 'expired';
	return 'live';
};

const badgeForStatus = (status) => {
	if (status === 'expired')  return { text: 'Ended',       className: 'bg-secondary' };
	if (status === 'upcoming') return { text: 'Coming soon', className: 'bg-warning text-dark' };
	return { text: 'Available now', className: 'bg-success' };
};

const DestinationDetail = () => {
	const { slug } = useParams();

	const [advert, setAdvert]   = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError]     = useState('');

	useEffect(() => {
		let cancelled = false;

		const run = async () => {
			setLoading(true);
			setError('');
			try {
				const data = await fetchAdvertBySlug(slug);
				if (!cancelled) setAdvert(data);
			} catch (err) {
				console.error('Advert fetch failed:', err);
				if (!cancelled) {
					setError(err.message || 'Could not load this offer.');
					setAdvert(null);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		run();
		return () => { cancelled = true; };
	}, [slug]);

	if (loading) {
		return (
			<Layout>
				<section className="py-5">
					<Container className="text-center py-5">
						<div className="spinner-border text-primary" role="status" />
						<p className="text-muted mt-3 mb-0">Loading offer…</p>
					</Container>
				</section>
			</Layout>
		);
	}

	if (error || !advert) {
		return (
			<Layout>
				<section className="py-5">
					<Container className="text-center py-5">
						<i className="bi bi-exclamation-circle text-muted" style={{ fontSize: 48 }} />
						<h5 className="fw-bold mt-3">Offer not found</h5>
						<p className="text-muted">{error || 'This offer may have been removed.'}</p>
						<Link to="/" className="btn btn-primary mt-2">
							Back to home
						</Link>
					</Container>
				</section>
			</Layout>
		);
	}

	const status = getStatus(advert);
	const badge  = badgeForStatus(status);
	const img    = featuredImage(advert) || FALLBACK_IMG;
	const icon   = categoryIcon(advert);
	const start  = advert.start_date ? fmtDate(advert.start_date) : '';
	const end    = advert.end_date   ? fmtDate(advert.end_date)   : '';

	return (
		<Layout>
			<section className="gray-simple py-5">
				<Container>
					<nav aria-label="breadcrumb" className="mb-3">
						<ol className="breadcrumb mb-0">
							<li className="breadcrumb-item"><Link to="/">Home</Link></li>
							<li className="breadcrumb-item"><Link to="/destinations">Offers</Link></li>
							<li className="breadcrumb-item active" aria-current="page">
								{advert.title}
							</li>
						</ol>
					</nav>

					<Row className="g-4">
						<Col lg={7}>
							<div className="bg-white rounded-3 overflow-hidden shadow-sm">
								<img
									src={img}
									alt={advert.title}
									className="w-100"
									style={{ maxHeight: 420, objectFit: 'cover' }}
									onError={e => { e.currentTarget.src = FALLBACK_IMG; }}
								/>
							</div>

							<div className="bg-white rounded-3 p-4 mt-4 shadow-sm">
								<h4 className="fw-bold mb-3">About this offer</h4>
								{advert.content ? (
									<div
										className="advert-content text-muted"
										dangerouslySetInnerHTML={{ __html: advert.content }}
									/>
								) : (
									<p className="text-muted mb-0">{stripHtml(advert.excerpt) || 'No description provided.'}</p>
								)}
							</div>
						</Col>

						<Col lg={5}>
							<div className="bg-white rounded-3 p-4 shadow-sm sticky-top" style={{ top: 24 }}>
								{advert.category?.title && (
									<div className="d-flex align-items-center gap-2 mb-2">
										{icon && (
											<img
												src={icon}
												alt=""
												width={20}
												height={20}
												style={{ objectFit: 'contain' }}
											/>
										)}
										<span className="text-muted small fw-medium">
											{advert.category.title}
										</span>
									</div>
								)}

								<h3 className="fw-bold mb-2">{advert.title}</h3>

								{advert.destination && (
									<p className="text-muted mb-3">
										<i className="bi bi-geo-alt me-1" />
										{advert.destination}
									</p>
								)}

								<div className="d-flex flex-wrap gap-2 mb-3">
									<Badge className={badge.className}>{badge.text}</Badge>
									{advert.category?.excerpt && (
										<Badge bg="light" text="dark">{advert.category.excerpt}</Badge>
									)}
								</div>

								<hr />

								{(start || end) && (
									<div className="mb-3">
										<div className="text-muted small mb-1">Dates</div>
										<div className="fw-medium">
											{start}{start && end ? ' — ' : ''}{end}
										</div>
									</div>
								)}

								{advert.fee && (
									<div className="mb-4">
										<div className="text-muted small mb-1">Price from</div>
										<div className="fs-4 fw-bold text-primary">
											{formatNaira(advert.fee)}
										</div>
									</div>
								)}

								{status === 'live' ? (
									<Link to="/flight-search" className="btn btn-primary w-100 fw-medium">
										Book this offer
										<i className="fa-solid fa-arrow-trend-up ms-2" />
									</Link>
								) : (
									<button
										type="button"
										className="btn btn-secondary w-100 fw-medium"
										disabled
									>
										{status === 'expired' ? 'This offer has ended' : 'Not yet available'}
									</button>
								)}

								<Link
									to="/destinations"
									className="btn btn-link w-100 mt-2 text-muted"
								>
									Back to offers
								</Link>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</Layout>
	);
};

export default DestinationDetail;