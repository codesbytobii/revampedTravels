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

/* ---------- Traveler composition helper ---------- */
const buildTravelerSlots = (travelers, { includeInfants = false } = {}) => {
	if (!travelers) return [{ type: 'ADULT' }];

	const slots = [];
	for (let i = 0; i < (travelers.adults || 0); i++) slots.push({ type: 'ADULT' });
	for (let i = 0; i < (travelers.children || 0); i++) slots.push({ type: 'CHILD' });
	if (includeInfants) {
		for (let i = 0; i < (travelers.infants || 0); i++) slots.push({ type: 'INFANT' });
	}
	return slots.length ? slots : [{ type: 'ADULT' }];
};

const typeLabel = (t) =>
	t === 'ADULT' ? 'Adult' : t === 'CHILD' ? 'Child (2–11)' : 'Infant (under 2)';

const typeBadgeClass = (t) =>
	t === 'ADULT' ? 'bg-light text-dark' :
	t === 'CHILD' ? 'bg-light-warning text-warning' :
	'bg-light-info text-info';

/* ---------- Itinerary review ---------- */
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

/* ---------- Passenger factory ---------- */
const emptyPassenger = (type = 'ADULT') => ({
	type,
	title: type === 'CHILD' || type === 'INFANT' ? 'Mstr' : 'Mr',
	firstName: '',
	lastName: '',
	dob: '',
	gender: 'Male',
	nationality: 'NG',
	passportNumber: '',
	passportExpiry: '',
	associatedAdultIndex: 0,
});

/* ---------- Passenger form ---------- */
const PassengerForm = ({ index, value, onChange, errors, adultsCount }) => {
	const set = (field, v) => onChange(index, { ...value, [field]: v });
	const isInfant = value.type === 'INFANT';

	return (
		<div className="booking-card bg-white rounded-3 p-4 mb-4">
			<div className="d-flex align-items-center justify-content-between mb-3">
				<h5 className="fw-bold mb-0">Passenger {index + 1}</h5>
				<span className={`badge ${typeBadgeClass(value.type)}`}>
					{typeLabel(value.type)}
				</span>
			</div>

			<Row className="g-3">
				<Col md={2}>
					<label className="form-label small text-muted">Title</label>
					<select className="form-select" value={value.title} onChange={e => set('title', e.target.value)}>
						<option>Mr</option>
						<option>Mrs</option>
						<option>Ms</option>
						<option>Mstr</option>
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

				{isInfant && adultsCount > 0 && (
					<Col md={6}>
						<label className="form-label small text-muted">Travels with (adult)</label>
						<select
							className="form-select"
							value={value.associatedAdultIndex}
							onChange={e => set('associatedAdultIndex', Number(e.target.value))}
						>
							{Array.from({ length: adultsCount }).map((_, i) => (
								<option key={i} value={i}>Adult {i + 1}</option>
							))}
						</select>
					</Col>
				)}
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
	const travelers = state?.travelers;

	useEffect(() => {
		if (!offer) navigate('/flights', { replace: true });
	}, [offer, navigate]);

	const slots = useMemo(
		() => buildTravelerSlots(travelers, { includeInfants: false }),
		[travelers]
	);

	const adultsCount = useMemo(() => slots.filter(s => s.type === 'ADULT').length, [slots]);

	const [passengers, setPassengers] = useState(() => slots.map(s => emptyPassenger(s.type)));
	const [contact, setContact] = useState({ email: '', phone: '' });
	const [errors, setErrors] = useState({
		passengers: slots.map(() => ({})),
		contact: {},
	});
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		setPassengers(slots.map(s => emptyPassenger(s.type)));
		setErrors({ passengers: slots.map(() => ({})), contact: {} });
	}, [slots]);

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
			const firstError = document.querySelector('.is-invalid');
			if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
			return;
		}
		setSubmitting(true);

		const payload = {
			contact,
			passengers: passengers.map(p => ({
				type: p.type,
				title: p.title,
				firstName: p.firstName,
				lastName: p.lastName,
				dateOfBirth: p.dob,
				gender: p.gender.toUpperCase(),
				nationality: p.nationality,
				passport: {
					number: p.passportNumber,
					expiry: p.passportExpiry,
				},
				...(p.type === 'INFANT'
					? { associatedAdultIndex: p.associatedAdultIndex }
					: {}),
			})),
		};

		console.log('Booking payload →', payload);

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
					<Row className="g-4">
						<Col xl={8} lg={7}>
							<ItineraryReview offer={offer} />

							{/* Traveler summary */}
							<div className="booking-card bg-white rounded-3 p-4 mb-4">
								<h5 className="fw-bold mb-3">Travelers</h5>
								<div className="d-flex flex-wrap gap-3">
									{travelers ? (
										<>
											<span className="badge bg-light text-dark">
												{travelers.adults} Adult{travelers.adults !== 1 ? 's' : ''}
											</span>
											{travelers.children > 0 && (
												<span className="badge bg-light-warning text-warning">
													{travelers.children} Child{travelers.children !== 1 ? 'ren' : ''}
												</span>
											)}
											{travelers.infants > 0 && (
												<span className="badge bg-light-info text-info">
													{travelers.infants} Infant{travelers.infants !== 1 ? 's' : ''}
												</span>
											)}
										</>
									) : (
										<span className="text-muted small">Traveler details unavailable</span>
									)}
								</div>
								{travelers?.infants > 0 && (
									<div className="text-muted small mt-2">
										Infants travel on an adult's lap and don't require a separate ticket form.
										Please indicate which adult each infant is traveling with below.
									</div>
								)}
							</div>

							{passengers.map((p, i) => (
								<PassengerForm
									key={i}
									index={i}
									value={p}
									onChange={updatePassenger}
									errors={errors.passengers[i]}
									adultsCount={adultsCount}
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