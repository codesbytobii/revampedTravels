// import React, { useMemo } from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import Layout from '../../components/Layout/Layout';
// import Header from '../../pages/Flights/List01/Header';
// import { formatPrice, stopsLabel } from '../Landing2/utils/flights';

// const formatTime = (at) => (at ? at.slice(11, 16) : '');
// const formatDay = (at) => {
// 	if (!at) return '';
// 	return new Date(`${at.slice(0, 10)}T00:00:00`).toLocaleDateString('en-GB', {
// 		day: '2-digit', month: 'short', year: 'numeric',
// 	});
// };
// const formatDuration = (iso) => {
// 	const m = /PT(?:(\d+)H)?(?:(\d+)M)?/.exec(iso || '');
// 	if (!m) return '';
// 	return [m[1] && `${m[1]}h`, m[2] && `${m[2]}m`].filter(Boolean).join(' ');
// };

// const FlightBooking = () => {
// 	const { state } = useLocation();
// 	const navigate = useNavigate();

// 	const offer = state?.offer;

// 	if (!offer) {
// 		return (
// 			<Layout>
// 				<div className="container py-5 text-center">
// 					<h4>No flight selected</h4>
// 					<p className="text-muted">Please select a flight from the results page.</p>
// 					<Link to="/flights" className="btn btn-primary">Back to flights</Link>
// 				</div>
// 			</Layout>
// 		);
// 	}

// 	const fareDetails = offer.raw?.travelerPricings?.[0]?.fareDetailsBySegment || [];
// 	const rawItineraries = offer.raw?.itineraries || [];

// 	const totals = useMemo(() => {
// 		const base = offer.price;
// 		const taxes = Math.round(base * 0.07);
// 		return { base, taxes, total: base + taxes };
// 	}, [offer.price]);

// 	return (
// 		<Layout>
// 			<Header />
// 			<section className="gray-simple py-5">
// 				<Container>
// 					<Row className="g-4">
// 						<Col xl={8} lg={7}>
// 							<div className="booking-card bg-white rounded-3 p-4 mb-4">
// 								<h5 className="fw-bold mb-4">Itinerary review</h5>

// 								{offer.itineraries.map((it, i) => {
// 									const raw = rawItineraries[i];
// 									return (
// 										<div key={i} className="mb-4 pb-4 border-bottom">
// 											<div className="d-flex align-items-center mb-3">
// 												<span className={`label ${it.label === 'Return' ? 'bg-light-success text-success' : 'bg-light-primary text-primary'} me-2`}>
// 													{it.label}
// 												</span>
// 												<span className="text-muted small">{it.date}</span>
// 											</div>

// 											{(raw?.segments || []).map((seg, si) => (
// 												<div key={seg.id || si} className="booking-segment">
// 													<div className="d-flex align-items-center justify-content-between">
// 														<div>
// 															<div className="text-dark fw-bold">
// 																{formatTime(seg.departure?.at)} · {seg.departure?.iataCode}
// 															</div>
// 															<div className="text-muted small">
// 																{formatDay(seg.departure?.at)}
// 															</div>
// 														</div>
// 														<div className="text-center flex-grow-1 px-3">
// 															<div className="text-muted small">
// 																{formatDuration(seg.duration)}
// 															</div>
// 															<div className="booking-line my-1">
// 																<span></span>
// 															</div>
// 															<div className="text-muted small">
// 																{seg.carrierCode} {seg.number}
// 															</div>
// 														</div>
// 														<div className="text-end">
// 															<div className="text-dark fw-bold">
// 																{formatTime(seg.arrival?.at)} · {seg.arrival?.iataCode}
// 															</div>
// 															<div className="text-muted small">
// 																{formatDay(seg.arrival?.at)}
// 															</div>
// 														</div>
// 													</div>
// 												</div>
// 											))}

// 											<div className="text-muted small mt-2">
// 												{it.carrierName} · {it.cabin} · {stopsLabel(it.stops)} · {it.duration}
// 											</div>
// 										</div>
// 									);
// 								})}
// 							</div>

// 							<div className="booking-card bg-white rounded-3 p-4">
// 								<h5 className="fw-bold mb-4">Passenger details</h5>
// 								<Row className="g-3">
// 									<Col md={6}>
// 										<label className="form-label small text-muted">First name</label>
// 										<input className="form-control" placeholder="John" />
// 									</Col>
// 									<Col md={6}>
// 										<label className="form-label small text-muted">Last name</label>
// 										<input className="form-control" placeholder="Doe" />
// 									</Col>
// 									<Col md={6}>
// 										<label className="form-label small text-muted">Email</label>
// 										<input type="email" className="form-control" placeholder="john@example.com" />
// 									</Col>
// 									<Col md={6}>
// 										<label className="form-label small text-muted">Phone</label>
// 										<input className="form-control" placeholder="+234..." />
// 									</Col>
// 								</Row>
// 								<p className="text-muted small mt-3 mb-0">
// 									Full booking form (passport, DOB, payment) coming next.
// 								</p>
// 							</div>
// 						</Col>

// 						<Col xl={4} lg={5}>
// 							<div className="booking-card bg-white rounded-3 p-4 sticky-summary">
// 								<h5 className="fw-bold mb-4">Fare summary</h5>

// 								<div className="d-flex justify-content-between mb-2">
// 									<span className="text-muted">Base fare</span>
// 									<span className="fw-medium">{formatPrice(totals.base, offer.currency)}</span>
// 								</div>
// 								<div className="d-flex justify-content-between mb-2">
// 									<span className="text-muted">Taxes &amp; fees</span>
// 									<span className="fw-medium">{formatPrice(totals.taxes, offer.currency)}</span>
// 								</div>
// 								<hr />
// 								<div className="d-flex justify-content-between mb-4">
// 									<span className="fw-bold fs-5">Total</span>
// 									<span className="fw-bold fs-5 text-primary">
// 										{formatPrice(totals.total, offer.currency)}
// 									</span>
// 								</div>

// 								<button
// 									type="button"
// 									className="btn btn-primary w-100 fw-medium"
// 									onClick={() => alert('Payment step next')}
// 								>
// 									Continue to payment
// 									<i className="bi bi-arrow-right ms-2"></i>
// 								</button>

// 								<button
// 									type="button"
// 									className="btn btn-link w-100 mt-2 text-muted"
// 									onClick={() => navigate(-1)}
// 								>
// 									Back to results
// 								</button>
// 							</div>
// 						</Col>
// 					</Row>
// 				</Container>
// 			</section>
// 		</Layout>
// 	);
// };

// export default FlightBooking;



import React, { useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Header from '../../pages/Flights/List01/Header';
import { formatPrice, stopsLabel } from '../Landing2/utils/flights';

const formatTime = (at) => (at ? at.slice(11, 16) : '');
const formatDay = (at) => {
	if (!at) return '';
	return new Date(`${at.slice(0, 10)}T00:00:00`).toLocaleDateString('en-GB', {
		day: '2-digit', month: 'short', year: 'numeric',
	});
};
const formatDuration = (iso) => {
	const m = /PT(?:(\d+)H)?(?:(\d+)M)?/.exec(iso || '');
	if (!m) return '';
	return [m[1] && `${m[1]}h`, m[2] && `${m[2]}m`].filter(Boolean).join(' ');
};

/* ---------- Shared itinerary review block ---------- */
const ItineraryReview = ({ offer }) => {
	const rawItineraries = offer.raw?.itineraries || [];

	return (
		<div className="booking-card bg-white rounded-3 p-4 mb-4">
			<h5 className="fw-bold mb-4">Itinerary review</h5>

			{offer.itineraries.map((it, i) => {
				const raw = rawItineraries[i];
				return (
					<div key={i} className={`mb-4 ${i < offer.itineraries.length - 1 ? 'pb-4 border-bottom' : ''}`}>
						<div className="d-flex align-items-center mb-3">
							<span className={`label ${it.label === 'Return' ? 'bg-light-success text-success' : 'bg-light-primary text-primary'} me-2`}>
								{it.label}
							</span>
							<span className="text-muted small">{it.date}</span>
						</div>

						{(raw?.segments || []).map((seg, si) => (
							<div key={seg.id || si} className="booking-segment">
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<div className="text-dark fw-bold">
											{formatTime(seg.departure?.at)} · {seg.departure?.iataCode}
										</div>
										<div className="text-muted small">{formatDay(seg.departure?.at)}</div>
									</div>
									<div className="text-center flex-grow-1 px-3">
										<div className="text-muted small">{formatDuration(seg.duration)}</div>
										<div className="booking-line my-1"><span></span></div>
										<div className="text-muted small">
											{seg.carrierCode} {seg.number}
										</div>
									</div>
									<div className="text-end">
										<div className="text-dark fw-bold">
											{formatTime(seg.arrival?.at)} · {seg.arrival?.iataCode}
										</div>
										<div className="text-muted small">{formatDay(seg.arrival?.at)}</div>
									</div>
								</div>
							</div>
						))}

						<div className="text-muted small mt-2">
							{it.carrierName} · {it.cabin} · {stopsLabel(it.stops)} · {it.duration}
						</div>
					</div>
				);
			})}
		</div>
	);
};

/* ---------- Passenger form ---------- */
const emptyPassenger = () => ({
	title: 'Mr',
	firstName: '',
	lastName: '',
	dob: '',
	gender: 'Male',
	nationality: 'NG',
	passportNumber: '',
	passportExpiry: '',
});

const PassengerForm = ({ index, value, onChange, errors }) => {
	const set = (field, v) => onChange(index, { ...value, [field]: v });

	return (
		<div className="booking-card bg-white rounded-3 p-4 mb-4">
			<div className="d-flex align-items-center justify-content-between mb-3">
				<h5 className="fw-bold mb-0">Passenger {index + 1}</h5>
				<span className="badge bg-light text-dark">Adult</span>
			</div>

			<Row className="g-3">
				<Col md={2}>
					<label className="form-label small text-muted">Title</label>
					<select className="form-select" value={value.title} onChange={e => set('title', e.target.value)}>
						<option>Mr</option>
						<option>Mrs</option>
						<option>Ms</option>
						<option>Dr</option>
					</select>
				</Col>
				<Col md={5}>
					<label className="form-label small text-muted">First name</label>
					<input
						className={`form-control ${errors?.firstName ? 'is-invalid' : ''}`}
						placeholder="John"
						value={value.firstName}
						onChange={e => set('firstName', e.target.value)}
					/>
					{errors?.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
				</Col>
				<Col md={5}>
					<label className="form-label small text-muted">Last name</label>
					<input
						className={`form-control ${errors?.lastName ? 'is-invalid' : ''}`}
						placeholder="Doe"
						value={value.lastName}
						onChange={e => set('lastName', e.target.value)}
					/>
					{errors?.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
				</Col>

				<Col md={4}>
					<label className="form-label small text-muted">Date of birth</label>
					<input
						type="date"
						className={`form-control ${errors?.dob ? 'is-invalid' : ''}`}
						value={value.dob}
						onChange={e => set('dob', e.target.value)}
					/>
					{errors?.dob && <div className="invalid-feedback">{errors.dob}</div>}
				</Col>
				<Col md={2}>
					<label className="form-label small text-muted">Gender</label>
					<select className="form-select" value={value.gender} onChange={e => set('gender', e.target.value)}>
						<option>Male</option>
						<option>Female</option>
					</select>
				</Col>
				<Col md={3}>
					<label className="form-label small text-muted">Nationality</label>
					<input
						className="form-control"
						placeholder="NG"
						maxLength={2}
						value={value.nationality}
						onChange={e => set('nationality', e.target.value.toUpperCase())}
					/>
				</Col>
				<Col md={3}>
					<label className="form-label small text-muted">Passport no.</label>
					<input
						className={`form-control ${errors?.passportNumber ? 'is-invalid' : ''}`}
						placeholder="A0123456"
						value={value.passportNumber}
						onChange={e => set('passportNumber', e.target.value.toUpperCase())}
					/>
					{errors?.passportNumber && <div className="invalid-feedback">{errors.passportNumber}</div>}
				</Col>

				<Col md={4}>
					<label className="form-label small text-muted">Passport expiry</label>
					<input
						type="date"
						className={`form-control ${errors?.passportExpiry ? 'is-invalid' : ''}`}
						value={value.passportExpiry}
						onChange={e => set('passportExpiry', e.target.value)}
					/>
					{errors?.passportExpiry && <div className="invalid-feedback">{errors.passportExpiry}</div>}
				</Col>
			</Row>
		</div>
	);
};

/* ---------- Contact form ---------- */
const ContactForm = ({ value, onChange, errors }) => {
	const set = (field, v) => onChange({ ...value, [field]: v });
	return (
		<div className="booking-card bg-white rounded-3 p-4 mb-4">
			<h5 className="fw-bold mb-3">Contact details</h5>
			<Row className="g-3">
				<Col md={6}>
					<label className="form-label small text-muted">Email</label>
					<input
						type="email"
						className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
						placeholder="you@example.com"
						value={value.email}
						onChange={e => set('email', e.target.value)}
					/>
					{errors?.email && <div className="invalid-feedback">{errors.email}</div>}
				</Col>
				<Col md={6}>
					<label className="form-label small text-muted">Phone</label>
					<input
						className={`form-control ${errors?.phone ? 'is-invalid' : ''}`}
						placeholder="+234..."
						value={value.phone}
						onChange={e => set('phone', e.target.value)}
					/>
					{errors?.phone && <div className="invalid-feedback">{errors.phone}</div>}
				</Col>
			</Row>
		</div>
	);
};

/* ================= PAGE ================= */
const FlightBooking = () => {
	const { state } = useLocation();
	const navigate = useNavigate();

	const offer = state?.offer;
	const previousOffer = state?.previousOffer;
	const priceChanged = state?.priceChanged;

	// Redirect if no offer
	useEffect(() => {
		if (!offer) navigate('/flights', { replace: true });
	}, [offer, navigate]);

	const [passengers, setPassengers] = useState([emptyPassenger()]);
	const [contact, setContact] = useState({ email: '', phone: '' });
	const [errors, setErrors] = useState({ passengers: [{}], contact: {} });
	const [submitting, setSubmitting] = useState(false);

	const updatePassenger = (index, value) =>
		setPassengers(list => list.map((p, i) => (i === index ? value : p)));

	const totals = useMemo(() => {
		if (!offer) return { base: 0, taxes: 0, total: 0, extraBag: 0 };
		const base = offer.price;
		const extraBag = offer.extraBagAmount || 0;
		const total = offer.ffsdTotal || base + extraBag;
		return { base, extraBag, total, taxes: Math.max(0, total - base - extraBag) };
	}, [offer]);

	if (!offer) return null;

	const validate = () => {
		const pErr = passengers.map(p => {
			const e = {};
			if (!p.firstName.trim()) e.firstName = 'Required';
			if (!p.lastName.trim()) e.lastName = 'Required';
			if (!p.dob) e.dob = 'Required';
			if (!p.passportNumber.trim()) e.passportNumber = 'Required';
			if (!p.passportExpiry) e.passportExpiry = 'Required';
			return e;
		});
		const cErr = {};
		if (!contact.email.trim()) cErr.email = 'Required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) cErr.email = 'Invalid email';
		if (!contact.phone.trim()) cErr.phone = 'Required';

		setErrors({ passengers: pErr, contact: cErr });
		return pErr.every(e => Object.keys(e).length === 0) && Object.keys(cErr).length === 0;
	};

	const handleContinue = () => {
		if (!validate()) {
			// Scroll to first error
			const firstError = document.querySelector('.is-invalid');
			if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
			return;
		}
		setSubmitting(true);
		// TODO: post to booking / payment endpoint
		setTimeout(() => {
			setSubmitting(false);
			alert('Passenger details valid — next step is payment.');
		}, 600);
	};

	return (
		<Layout>
			<Header />
			<section className="gray-simple py-5">
				<Container>
					{priceChanged && (
						<div className="alert alert-warning d-flex align-items-center mb-4">
							<i className="bi bi-exclamation-triangle-fill me-2"></i>
							<div>
								<strong>Price updated.</strong> The fare changed from{' '}
								{formatPrice(previousOffer?.price, previousOffer?.currency)} to{' '}
								{formatPrice(offer.price, offer.currency)}. Your new total is reflected below.
							</div>
						</div>
					)}

					<Row className="g-4">
						<Col xl={8} lg={7}>
							<ItineraryReview offer={offer} />

							{passengers.map((p, i) => (
								<PassengerForm
									key={i}
									index={i}
									value={p}
									onChange={updatePassenger}
									errors={errors.passengers[i]}
								/>
							))}

							<ContactForm
								value={contact}
								onChange={setContact}
								errors={errors.contact}
							/>
						</Col>

						<Col xl={4} lg={5}>
							<div className="booking-card bg-white rounded-3 p-4 sticky-summary">
								<h5 className="fw-bold mb-4">Fare summary</h5>

								<div className="d-flex justify-content-between mb-2">
									<span className="text-muted">Base fare</span>
									<span className="fw-medium">{formatPrice(totals.base, offer.currency)}</span>
								</div>

								{totals.extraBag > 0 && (
									<div className="d-flex justify-content-between mb-2">
										<span className="text-muted">Extra checked bags</span>
										<span className="fw-medium">{formatPrice(totals.extraBag, offer.currency)}</span>
									</div>
								)}

								{totals.taxes > 0 && (
									<div className="d-flex justify-content-between mb-2">
										<span className="text-muted">Taxes &amp; fees</span>
										<span className="fw-medium">{formatPrice(totals.taxes, offer.currency)}</span>
									</div>
								)}

								<hr />
								<div className="d-flex justify-content-between mb-4">
									<span className="fw-bold fs-5">Total</span>
									<span className="fw-bold fs-5 text-primary">
										{formatPrice(totals.total, offer.currency)}
									</span>
								</div>

								{offer.fareRules?.length > 0 && (
									<div className="small text-muted mb-3">
										{offer.fareRules.map((r, i) => (
											<div key={i}>
												{r.category}
												{r.maxPenaltyAmount
													? ` — up to ${formatPrice(Number(r.maxPenaltyAmount), offer.currency)}`
													: ''}
											</div>
										))}
									</div>
								)}

								<button
									type="button"
									className="btn btn-primary w-100 fw-medium"
									onClick={handleContinue}
									disabled={submitting}
								>
									{submitting ? (
										<>
											<span className="spinner-border spinner-border-sm me-2" role="status" />
											Processing…
										</>
									) : (
										<>
											Continue to payment
											<i className="bi bi-arrow-right ms-2"></i>
										</>
									)}
								</button>

								<Link to="/flights" className="btn btn-link w-100 mt-2 text-muted">
									Back to results
								</Link>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</Layout>
	);
};

export default FlightBooking;