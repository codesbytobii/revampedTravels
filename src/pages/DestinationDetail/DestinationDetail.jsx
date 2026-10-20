// src/pages/DestinationDetail/DestinationDetail.jsx
import { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Badge, Modal } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';

import Layout from '../../components/Layout/Layout'; // adjust path if needed
import {
	fetchAdvertBySlug,
	parseImages,
	imageUrl,
	stripHtml,
	advertWhatsApp,
	buildWhatsAppLink,
} from '../../utils/adverts';

const FALLBACK_IMG =
	'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=70';

/* ---------- helpers ---------- */
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
	if (Number.isNaN(dt.getTime())) return '';
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

const STATUS_META = {
	live:     { label: 'Available now',  className: 'bg-success' },
	upcoming: { label: 'Coming soon',    className: 'bg-warning text-dark' },
	expired:  { label: 'Offer ended',    className: 'bg-secondary' },
};

/* Only allow these tags; strip scripts, event handlers, etc. */
const SANITIZE_ALLOWED_TAGS = new Set([
	'P', 'BR', 'DIV', 'SPAN', 'STRONG', 'B', 'EM', 'I', 'U', 'UL', 'OL', 'LI',
	'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE', 'A',
]);

const sanitizeHtml = (html) => {
	if (!html) return '';
	const doc = new DOMParser().parseFromString(html, 'text/html');
	doc.body.querySelectorAll('*').forEach((el) => {
		if (!SANITIZE_ALLOWED_TAGS.has(el.tagName)) {
			const frag = doc.createDocumentFragment();
			while (el.firstChild) frag.appendChild(el.firstChild);
			el.replaceWith(frag);
			return;
		}
		[...el.attributes].forEach((attr) => {
			const name = attr.name.toLowerCase();
			const isSafeHref = name === 'href' && /^(https?:|mailto:|tel:)/i.test(attr.value);
			if (isSafeHref) return;
			el.removeAttribute(attr.name);
		});
		if (el.tagName === 'A') {
			el.setAttribute('target', '_blank');
			el.setAttribute('rel', 'noopener noreferrer');
		}
	});
	return doc.body.innerHTML;
};

/* ---------- subcomponents ---------- */
const Skeleton = () => (
	<section className="gray-simple py-5">
		<Container>
			<Row className="g-4">
				<Col lg={7}>
					<div className="bg-white rounded-3 shadow-sm overflow-hidden">
						<div className="placeholder-glow">
							<div className="placeholder w-100" style={{ height: 380 }} />
						</div>
					</div>
					<div className="bg-white rounded-3 p-4 mt-4 shadow-sm placeholder-glow">
						<span className="placeholder col-4 mb-3 d-block" />
						<span className="placeholder col-12 mb-2 d-block" />
						<span className="placeholder col-11 mb-2 d-block" />
						<span className="placeholder col-9 d-block" />
					</div>
				</Col>
				<Col lg={5}>
					<div className="bg-white rounded-3 p-4 shadow-sm placeholder-glow">
						<span className="placeholder col-6 mb-3 d-block" />
						<span className="placeholder col-10 mb-3 d-block" />
						<span className="placeholder col-8 mb-3 d-block" />
						<span className="placeholder col-12 d-block" style={{ height: 44 }} />
					</div>
				</Col>
			</Row>
		</Container>
	</section>
);

const ErrorState = ({ message }) => (
	<section className="gray-simple py-5">
		<Container className="text-center py-5">
			<div
				className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light mb-3"
				style={{ width: 72, height: 72 }}
			>
				<i className="bi bi-exclamation-circle text-muted" style={{ fontSize: 32 }} />
			</div>
			<h5 className="fw-bold">Offer not found</h5>
			<p className="text-muted mb-3">{message || 'This offer may have been removed.'}</p>
			<Link to="/destinations" className="btn btn-primary">
				Browse other offers
			</Link>
		</Container>
	</section>
);

const Gallery = ({ images, alt, onOpen }) => {
	const [activeIdx, setActiveIdx] = useState(0);
	const list = images.length ? images : [FALLBACK_IMG];
	const current = list[Math.min(activeIdx, list.length - 1)];

	return (
		<div className="bg-white rounded-3 shadow-sm overflow-hidden">
			<button
				type="button"
				className="position-relative border-0 p-0 w-100"
				style={{ aspectRatio: '16 / 10', background: '#f1f3f5', cursor: 'zoom-in' }}
				onClick={() => onOpen(current)}
				aria-label="Open photo"
			>
				<img
					src={current}
					alt={alt}
					className="w-100 h-100"
					style={{ objectFit: 'cover' }}
					onError={e => { e.currentTarget.src = FALLBACK_IMG; }}
				/>
			</button>

			{list.length > 1 && (
				<div className="d-flex gap-2 p-2 overflow-auto" role="listbox" aria-label="Offer photos">
					{list.map((src, i) => (
						<button
							key={src + i}
							type="button"
							role="option"
							aria-selected={i === activeIdx}
							aria-label={`Photo ${i + 1}`}
							onClick={() => setActiveIdx(i)}
							className="btn p-0 border-0 rounded-2 overflow-hidden flex-shrink-0"
							style={{
								width: 72,
								height: 56,
								outline: i === activeIdx ? '2px solid var(--bs-primary)' : 'none',
								outlineOffset: 2,
							}}
						>
							<img
								src={src}
								alt=""
								className="w-100 h-100"
								style={{ objectFit: 'cover' }}
								onError={e => { e.currentTarget.src = FALLBACK_IMG; }}
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

const ShareButton = ({ title }) => {
	const [copied, setCopied] = useState(false);

	const handleShare = async () => {
		const url = window.location.href;
		if (navigator.share) {
			try {
				await navigator.share({ title, url });
				return;
			} catch {
				/* fall through to copy */
			}
		}
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 1800);
		} catch {
			/* ignore */
		}
	};

	return (
		<button
			type="button"
			className="btn btn-outline-secondary btn-sm fw-medium"
			onClick={handleShare}
			aria-live="polite"
		>
			<i className={`bi ${copied ? 'bi-check2' : 'bi-share'} me-1`} />
			{copied ? 'Copied' : 'Share'}
		</button>
	);
};

/* ---------- main component ---------- */
const DestinationDetail = () => {
	const { slug } = useParams();
	const navigate = useNavigate();

	const [advert, setAdvert]   = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError]     = useState('');
	const [imgModal, setImgModal] = useState({ show: false, src: '' });

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

	/* Build gallery from featured_images (parse the JSON string) */
	const gallery = useMemo(() => {
		if (!advert) return [];
		return parseImages(advert.featured_images)
			.map(imageUrl)
			.filter(Boolean);
	}, [advert]);

	const status = advert ? getStatus(advert) : 'live';
	const statusMeta = STATUS_META[status];

	const start = advert?.start_date ? fmtDate(advert.start_date) : '';
	const end   = advert?.end_date   ? fmtDate(advert.end_date)   : '';

	const categoryIcon = useMemo(() => {
		if (!advert?.category?.icon) return null;
		return imageUrl(parseImages(advert.category.icon)[0]);
	}, [advert]);

	/* WhatsApp booking link with prefilled message */
	const whatsappLink = useMemo(() => {
		if (!advert) return null;

		const number = advertWhatsApp(advert);
		const message =
			`Hello FFSD Travels, I'd like to book the offer "${advert.title}"` +
			(advert.destination ? ` (${advert.destination})` : '') +
			(advert.start_date ? ` — starting ${fmtDate(advert.start_date)}` : '') +
			'.' +
			(advert.fee ? ` Listed price: ${formatNaira(advert.fee)}.` : '') +
			`\n\nReference: ${window.location.href}`;

		return buildWhatsAppLink(number, message);
	}, [advert]);

	useEffect(() => {
		if (advert?.title) document.title = `${advert.title} | FFSD Travels`;
		return () => { document.title = 'FFSD Travels'; };
	}, [advert]);

	if (loading) {
		return <Layout><Skeleton /></Layout>;
	}

	if (error || !advert) {
		return <Layout><ErrorState message={error} /></Layout>;
	}

	const html = sanitizeHtml(advert.content);

	return (
		<Layout>
			<section className="gray-simple py-4 py-lg-5">
				<Container>
					{/* Breadcrumb + back */}
					<div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb mb-0 small">
								<li className="breadcrumb-item"><Link to="/">Home</Link></li>
								<li className="breadcrumb-item"><Link to="/destinations">Offers</Link></li>
								<li className="breadcrumb-item active" aria-current="page">
									{advert.title}
								</li>
							</ol>
						</nav>
						<button
							type="button"
							className="btn btn-link btn-sm text-muted text-decoration-none p-0"
							onClick={() => navigate(-1)}
						>
							<i className="bi bi-arrow-left me-1" /> Back
						</button>
					</div>

					<Row className="g-4">
						{/* LEFT column */}
						<Col lg={7}>
							<Gallery
								images={gallery}
								alt={advert.title}
								onOpen={(src) => setImgModal({ show: true, src })}
							/>

							{/* Overview card */}
							<div className="bg-white rounded-3 p-4 mt-4 shadow-sm">
								<div className="d-flex align-items-center justify-content-between mb-3">
									<h4 className="fw-bold mb-0">About this offer</h4>
									<ShareButton title={advert.title} />
								</div>

								{html ? (
									<div
										className="advert-content text-secondary"
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={{ __html: html }}
									/>
								) : (
									<p className="text-muted mb-0">
										{stripHtml(advert.excerpt) || 'No description provided.'}
									</p>
								)}
							</div>

							{/* Fast facts */}
							{(start || end || advert.destination) && (
								<div className="bg-white rounded-3 p-4 mt-4 shadow-sm">
									<h5 className="fw-bold mb-3">Trip at a glance</h5>
									<Row className="g-3">
										{advert.destination && (
											<Col sm={6}>
												<div className="d-flex gap-3">
													<div
														className="rounded-3 bg-light d-flex align-items-center justify-content-center flex-shrink-0"
														style={{ width: 44, height: 44 }}
													>
														<i className="bi bi-geo-alt text-primary" />
													</div>
													<div>
														<div className="text-muted small">Destination</div>
														<div className="fw-medium">{advert.destination}</div>
													</div>
												</div>
											</Col>
										)}
										{start && (
											<Col sm={6}>
												<div className="d-flex gap-3">
													<div
														className="rounded-3 bg-light d-flex align-items-center justify-content-center flex-shrink-0"
														style={{ width: 44, height: 44 }}
													>
														<i className="bi bi-calendar-event text-primary" />
													</div>
													<div>
														<div className="text-muted small">Starts</div>
														<div className="fw-medium">{start}</div>
													</div>
												</div>
											</Col>
										)}
										{end && (
											<Col sm={6}>
												<div className="d-flex gap-3">
													<div
														className="rounded-3 bg-light d-flex align-items-center justify-content-center flex-shrink-0"
														style={{ width: 44, height: 44 }}
													>
														<i className="bi bi-calendar-check text-primary" />
													</div>
													<div>
														<div className="text-muted small">Ends</div>
														<div className="fw-medium">{end}</div>
													</div>
												</div>
											</Col>
										)}
										{advert.category?.title && (
											<Col sm={6}>
												<div className="d-flex gap-3">
													<div
														className="rounded-3 bg-light d-flex align-items-center justify-content-center flex-shrink-0"
														style={{ width: 44, height: 44 }}
													>
														{categoryIcon ? (
															<img
																src={categoryIcon}
																alt=""
																style={{ width: 22, height: 22, objectFit: 'contain' }}
															/>
														) : (
															<i className="bi bi-tag text-primary" />
														)}
													</div>
													<div>
														<div className="text-muted small">Category</div>
														<div className="fw-medium">{advert.category.title}</div>
													</div>
												</div>
											</Col>
										)}
									</Row>
								</div>
							)}
						</Col>

						{/* RIGHT column — sticky summary */}
						<Col lg={5}>
							<div className="bg-white rounded-3 p-4 shadow-sm position-sticky" style={{ top: 24 }}>
								<div className="d-flex flex-wrap align-items-center gap-2 mb-2">
									<Badge className={statusMeta.className}>{statusMeta.label}</Badge>
									{advert.category?.title && (
										<Badge bg="light" text="dark" className="border">
											{advert.category.title}
										</Badge>
									)}
								</div>

								<h3 className="fw-bold mb-2 lh-sm">{advert.title}</h3>

								{advert.destination && (
									<p className="text-muted mb-3">
										<i className="bi bi-geo-alt me-1" />
										{advert.destination}
									</p>
								)}

								{advert.excerpt && (
									<p className="text-secondary mb-3">{advert.excerpt}</p>
								)}

								<hr />

								{(start || end) && (
									<div className="d-flex align-items-center justify-content-between mb-2 small">
										<span className="text-muted">Dates</span>
										<span className="fw-medium text-end">
											{start}{start && end ? ' — ' : ''}{end}
										</span>
									</div>
								)}

								{advert.fee && (
									<>
										<div className="d-flex align-items-baseline justify-content-between mt-3">
											<span className="text-muted small">From</span>
											<span className="fs-3 fw-bold text-primary">
												{formatNaira(advert.fee)}
											</span>
										</div>
										<p className="text-muted small mb-0">
											Final price may vary based on availability.
										</p>
									</>
								)}

								<div className="d-grid gap-2 mt-4">
									{status === 'live' && whatsappLink ? (
										<a
											href={whatsappLink}
											target="_blank"
											rel="noopener noreferrer"
											className="btn btn-success fw-medium py-2 d-inline-flex align-items-center justify-content-center"
											aria-label={`Book ${advert.title} on WhatsApp`}
										>
											<i className="bi bi-whatsapp me-2" />
											Book this offer on WhatsApp
										</a>
									) : (
										<button
											type="button"
											className="btn btn-secondary fw-medium py-2"
											disabled
										>
											{status === 'expired'
												? 'This offer has ended'
												: status === 'upcoming'
													? `Available from ${start || 'soon'}`
													: 'Contact unavailable'}
										</button>
									)}

									<Link
										to="/destinations"
										className="btn btn-outline-secondary fw-medium"
									>
										Browse more offers
									</Link>
								</div>

								<div className="text-muted small mt-3 d-flex align-items-center gap-2">
									<i className="bi bi-shield-check" />
									<span>Secure booking · Verified partner</span>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Lightbox */}
			<Modal
				show={imgModal.show}
				onHide={() => setImgModal({ show: false, src: '' })}
				centered
				size="xl"
				contentClassName="bg-transparent border-0"
			>
				<Modal.Body className="p-0 position-relative">
					<img
						src={imgModal.src}
						alt=""
						className="w-100 rounded-3"
						style={{ maxHeight: '85vh', objectFit: 'contain' }}
					/>
					<button
						type="button"
						className="btn btn-light btn-sm position-absolute top-0 end-0 m-3 rounded-circle"
						onClick={() => setImgModal({ show: false, src: '' })}
						aria-label="Close"
					>
						<i className="bi bi-x-lg" />
					</button>
				</Modal.Body>
			</Modal>
		</Layout>
	);
};

export default DestinationDetail;