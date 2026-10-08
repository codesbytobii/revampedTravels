import React, { useEffect, useMemo, useState } from 'react';
import { Col, Container, Row, Modal as BsModal } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import Header from '../../pages/Flights/List01/Header';
import {
	formatPrice,
	stopsLabel,
	initiatePayment,
	verifyPayment,
	bookFlight,
	buildBookingPayload,
} from '../Landing2/utils/flights';

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

/* ---------- Traveler composition ---------- */
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

const travelerTypeFor = (t) =>
	t === 'ADULT' ? 'ADULT' : t === 'CHILD' ? 'CHILD' : 'HELD_INFANT';

/* ---------- Deep-set helper ---------- */
const setDeepValue = (obj, path, value) => {
	const keys = path.split(/\.|\[(\d+)\]/).filter(Boolean);
	const next = { ...obj };
	let cur = next;
	keys.forEach((k, i) => {
		if (i === keys.length - 1) {
			cur[k] = value;
		} else {
			const isArray = !isNaN(Number(keys[i + 1]));
			cur[k] = cur[k] ? (Array.isArray(cur[k]) ? [...cur[k]] : { ...cur[k] }) : (isArray ? [] : {});
			cur = cur[k];
		}
	});
	return next;
};

/* ---------- Status modal ---------- */
const StatusModal = ({ show, onClose, variant = 'info', title, message, children, actionLabel, onAction, busy }) => {
	const iconClass =
		variant === 'success' ? 'bi-check-circle-fill text-success' :
		variant === 'error' ? 'bi-x-circle-fill text-danger' :
		variant === 'warning' ? 'bi-exclamation-triangle-fill text-warning' :
		'bi-info-circle-fill text-primary';

	return (
		<BsModal show={show} onHide={busy ? undefined : onClose} centered backdrop={busy ? 'static' : true} keyboard={!busy}>
			<BsModal.Body className="text-center p-4">
				<i className={`bi ${iconClass}`} style={{ fontSize: 56 }}></i>
				<h5 className="fw-bold mt-3 mb-2">{title}</h5>
				{message && <p className="text-muted mb-0">{message}</p>}
				{children && <div className="mt-3">{children}</div>}

				<div className="d-flex gap-2 justify-content-center mt-4">
					{actionLabel && onAction && (
						<button
							type="button"
							className="btn btn-primary fw-medium px-4"
							onClick={onAction}
							disabled={busy}
						>
							{actionLabel}
						</button>
					)}
					{!busy && (
						<button
							type="button"
							className={`btn fw-medium px-4 ${actionLabel ? 'btn-outline-secondary' : 'btn-primary'}`}
							onClick={onClose}
						>
							{actionLabel ? 'Close' : 'OK'}
						</button>
					)}
				</div>
			</BsModal.Body>
		</BsModal>
	);
};

/* ---------- Passenger factory ---------- */
const emptyPassenger = (type = 'ADULT', id = '1') => ({
	id,
	travelerType: travelerTypeFor(type),
	dateOfBirth: '',
	name: { firstName: '', lastName: '' },
	gender: '',
	contact: {
		emailAddress: '',
		phones: [
			{
				deviceType: 'MOBILE',
				countryCallingCode: '234',
				number: '',
			},
		],
	},
	documents: [
		{
			documentType: 'PASSPORT',
			birthPlace: 'Nil',
			issuanceLocation: 'Nil',
			issuanceDate: '2015-03-04',
			number: '00000',
			expiryDate: '2030-03-04',
			issuanceCountry: 'NG',
			validityCountry: 'NG',
			nationality: 'NG',
			holder: true,
		},
	],
});

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
										<div className="text-muted small">{seg.carrierCode} {seg.number}</div>
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
const PassengerForm = ({ index, value, onChange, errors, adultsCount }) => {
	const set = (field, v) => onChange(index, field, v);
	const isInfant = value.travelerType === 'HELD_INFANT';

	return (
		<div className="booking-card bg-white rounded-3 p-4 mb-4">
			<div className="d-flex align-items-center justify-content-between mb-3">
				<h5 className="fw-bold mb-0">Passenger {index + 1}</h5>
				<span className={`badge ${typeBadgeClass(
					value.travelerType === 'HELD_INFANT' ? 'INFANT' :
					value.travelerType === 'CHILD' ? 'CHILD' : 'ADULT'
				)}`}>
					{typeLabel(
						value.travelerType === 'HELD_INFANT' ? 'INFANT' :
						value.travelerType === 'CHILD' ? 'CHILD' : 'ADULT'
					)}
				</span>
			</div>

			<Row className="g-3">
				<Col md={5}>
					<label className="form-label small text-muted">First name</label>
					<input
						className={`form-control ${errors?.firstName ? 'is-invalid' : ''}`}
						placeholder="John"
						value={value.name.firstName}
						onChange={e => set('name.firstName', e.target.value)}
					/>
					{errors?.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
				</Col>
				<Col md={5}>
					<label className="form-label small text-muted">Last name</label>
					<input
						className={`form-control ${errors?.lastName ? 'is-invalid' : ''}`}
						placeholder="Doe"
						value={value.name.lastName}
						onChange={e => set('name.lastName', e.target.value)}
					/>
					{errors?.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
				</Col>

				<Col md={4}>
					<label className="form-label small text-muted">Date of birth</label>
					<input
						type="date"
						className={`form-control ${errors?.dob ? 'is-invalid' : ''}`}
						value={value.dateOfBirth}
						onChange={e => set('dateOfBirth', e.target.value)}
					/>
					{errors?.dob && <div className="invalid-feedback">{errors.dob}</div>}
				</Col>
				<Col md={2}>
					<label className="form-label small text-muted">Gender</label>
					<select
						className={`form-select ${errors?.gender ? 'is-invalid' : ''}`}
						value={value.gender}
						onChange={e => set('gender', e.target.value)}
					>
						<option value="">Select</option>
						<option value="MALE">Male</option>
						<option value="FEMALE">Female</option>
					</select>
					{errors?.gender && <div className="invalid-feedback">{errors.gender}</div>}
				</Col>
				<Col md={3}>
					<label className="form-label small text-muted">Nationality</label>
					<input
						className="form-control"
						placeholder="NG"
						maxLength={2}
						value={value.documents[0].nationality}
						onChange={e => set('documents[0].nationality', e.target.value.toUpperCase())}
					/>
				</Col>
				<Col md={3}>
					<label className="form-label small text-muted">Passport no.</label>
					<input
						className={`form-control ${errors?.passportNumber ? 'is-invalid' : ''}`}
						placeholder="A0123456"
						value={value.documents[0].number}
						onChange={e => set('documents[0].number', e.target.value.toUpperCase())}
					/>
					{errors?.passportNumber && <div className="invalid-feedback">{errors.passportNumber}</div>}
				</Col>

				<Col md={4}>
					<label className="form-label small text-muted">Passport expiry</label>
					<input
						type="date"
						className={`form-control ${errors?.passportExpiry ? 'is-invalid' : ''}`}
						value={value.documents[0].expiryDate}
						onChange={e => set('documents[0].expiryDate', e.target.value)}
					/>
					{errors?.passportExpiry && <div className="invalid-feedback">{errors.passportExpiry}</div>}
				</Col>

				<Col md={4}>
					<label className="form-label small text-muted">Email</label>
					<input
						type="email"
						className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
						placeholder="you@example.com"
						value={value.contact.emailAddress}
						onChange={e => set('contact.emailAddress', e.target.value)}
					/>
					{errors?.email && <div className="invalid-feedback">{errors.email}</div>}
				</Col>
				<Col md={4}>
					<label className="form-label small text-muted">Phone</label>
					<input
						className={`form-control ${errors?.phone ? 'is-invalid' : ''}`}
						placeholder="8012345678"
						value={value.contact.phones[0].number}
						onChange={e => set('contact.phones[0].number', e.target.value)}
					/>
					{errors?.phone && <div className="invalid-feedback">{errors.phone}</div>}
				</Col>

				{isInfant && adultsCount > 0 && (
					<Col md={6}>
						<label className="form-label small text-muted">Travels with (adult)</label>
						<select
							className="form-select"
							value={value.associatedAdultIndex ?? 0}
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

/* ================= PAGE ================= */
const FlightBooking = () => {
	const { state } = useLocation();
	const navigate = useNavigate();

	const offerFromState = state?.offer;
	const travelers = state?.travelers;

	// Fallback to localStorage
	const offer = useMemo(() => {
		if (offerFromState) return offerFromState;
		try {
			const raw = localStorage.getItem('selectedFlight');
			return raw ? { raw: JSON.parse(raw), ...JSON.parse(raw) } : null;
		} catch { return null; }
	}, [offerFromState]);

	useEffect(() => {
		if (!offer) navigate('/flights', { replace: true });
	}, [offer, navigate]);

	// Passenger slots
	const slots = useMemo(
		() => buildTravelerSlots(travelers, { includeInfants: false }),
		[travelers]
	);
	const adultsCount = useMemo(() => slots.filter(s => s.type === 'ADULT').length, [slots]);

	const [passengers, setPassengers] = useState(() =>
		slots.map((s, i) => emptyPassenger(s.type, String(i + 1)))
	);
	const [errors, setErrors] = useState(slots.map(() => ({})));
	const [submitting, setSubmitting] = useState(false);

	// Modal state
	const [modal, setModal] = useState({
		show: false,
		variant: 'info',
		title: '',
		message: '',
		actionLabel: null,
		onAction: null,
		busy: false,
	});
	const closeModal = () => setModal(m => ({ ...m, show: false, actionLabel: null, onAction: null, busy: false }));
	const openModal = (config) => setModal({ ...config, show: true });

	// Reset passengers when traveler mix changes
	useEffect(() => {
		setPassengers(slots.map((s, i) => emptyPassenger(s.type, String(i + 1))));
		setErrors(slots.map(() => ({})));
	}, [slots]);

	// Currency formatter
	const fmt = (amount) => formatPrice(Number(amount || 0), offer?.currency || 'NGN');

	// Price per traveler
	const travelerBreakdown = useMemo(() => {
		const raw = offer?.raw || {};
		const pricing = raw.travelerPricings || [];

		const sumByType = (type) =>
			pricing
				.filter(p => p.travelerType === type)
				.reduce((n, p) => n + parseFloat(p.price?.total_charge || p.price?.total || 0), 0);

		const adults = sumByType('ADULT');
		const children = sumByType('CHILD');
		const infants = sumByType('HELD_INFANT');
		const total = adults + children + infants;

		return { adults, children, infants, total };
	}, [offer]);

	const updatePassenger = (index, path, value) => {
		setPassengers(list =>
			list.map((p, i) => (i === index ? setDeepValue(p, path, value) : p))
		);
	};

	if (!offer) return null;

	/* ---------- Validation ---------- */
	const validate = () => {
		const errs = passengers.map(p => {
			const e = {};
			if (!p.name.firstName.trim()) e.firstName = 'Required';
			if (!p.name.lastName.trim()) e.lastName = 'Required';
			if (!p.dateOfBirth) e.dob = 'Required';
			if (!p.gender) e.gender = 'Required';
			if (!p.contact.emailAddress.trim()) e.email = 'Required';
			else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.contact.emailAddress)) e.email = 'Invalid email';
			if (!p.contact.phones[0].number.trim()) e.phone = 'Required';
			if (!p.documents[0].number.trim()) e.passportNumber = 'Required';
			if (!p.documents[0].expiryDate) e.passportExpiry = 'Required';
			return e;
		});
		setErrors(errs);
		return errs.every(e => Object.keys(e).length === 0);
	};

	/* ---------- Submit flow ---------- */
	const handleSubmit = async (e) => {
		e?.preventDefault?.();
		if (submitting) return;

		if (!validate()) {
			const firstErr = document.querySelector('.is-invalid');
			if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
			openModal({
				variant: 'warning',
				title: 'Missing information',
				message: 'Please fill in all required fields highlighted in the form.',
				actionLabel: null,
			});
			return;
		}

		setSubmitting(true);
		localStorage.setItem('passengerInfo', JSON.stringify(passengers));

		try {
			// 1) Initiate payment
			const payment = await initiatePayment({
				email: passengers[0].contact.emailAddress,
				amount: travelerBreakdown.total,
				flightOrderId: offer.raw?.id || offer.id,
			});

			const accessCode = payment.access_code;
			const reference = payment.reference;
			const amount = payment.payment?.amount ?? travelerBreakdown.total;

			if (!accessCode) throw new Error('No Paystack access code received.');

			// 2) Open Paystack
			const popup = new window.PaystackPop();

			popup.resumeTransaction(accessCode, {
				onSuccess: async () => {
					// Show processing modal
					openModal({
						variant: 'info',
						title: 'Processing your booking…',
						message: 'Verifying payment and confirming your flight. Please don\u2019t close this window.',
						busy: true,
					});

					try {
						// 3) Verify payment
						const verification = await verifyPayment({ reference, amount });
						if (!verification?.success) {
							setSubmitting(false);
							openModal({
								variant: 'error',
								title: 'Payment verification failed',
								message: 'We could not verify your payment. Please contact support with your reference.',
							});
							return;
						}

						// 4) Book the flight
						const payload = buildBookingPayload({
							flightDetails: offer.raw,
							travelers: passengers,
						});
						await bookFlight(payload);

						// 5) Success modal
						openModal({
							variant: 'success',
							title: 'Booking confirmed!',
							message: `Your flight has been booked. A copy of your e-ticket will be sent to your email shortly. Reference: ${reference}`,
							actionLabel: 'Go to home',
							onAction: () => {
								closeModal();
								navigate('/');
							},
						});
					} catch (err) {
						console.error('Post-payment error:', err);
						openModal({
							variant: 'error',
							title: 'Booking failed',
							message: err.message || 'Your payment was received but the flight could not be booked. Please contact support.',
						});
					} finally {
						setSubmitting(false);
					}
				},
				onCancel: () => {
					setSubmitting(false);
					openModal({
						variant: 'warning',
						title: 'Payment cancelled',
						message: 'You cancelled the payment. Your booking was not completed.',
					});
				},
				onError: (err) => {
					setSubmitting(false);
					console.error('Paystack error:', err);
					openModal({
						variant: 'error',
						title: 'Payment failed',
						message: err?.message || 'Something went wrong during payment. Please try again.',
					});
				},
			});
		} catch (err) {
			console.error('Payment initiation failed:', err);
			setSubmitting(false);
			openModal({
				variant: 'error',
				title: 'Could not start payment',
				message: err.message || 'Please try again in a moment.',
			});
		}
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
							</div>

							{/* Passenger forms */}
							<form onSubmit={handleSubmit}>
								{passengers.map((p, i) => (
									<PassengerForm
										key={i}
										index={i}
										value={p}
										onChange={updatePassenger}
										errors={errors[i]}
										adultsCount={adultsCount}
									/>
								))}

								{/* Mobile pay button */}
								<button
									type="submit"
									className="btn btn-primary w-100 fw-medium d-lg-none mb-4"
									disabled={submitting}
								>
									{submitting ? (
										<>
											<span className="spinner-border spinner-border-sm me-2" role="status" />
											Processing…
										</>
									) : (
										<>
											Pay &amp; Book
											<i className="bi bi-arrow-right ms-2"></i>
										</>
									)}
								</button>
							</form>
						</Col>

						<Col xl={4} lg={5}>
							<div className="booking-card bg-white rounded-3 p-4 sticky-summary">
								<h5 className="fw-bold mb-4">Payment details</h5>

								{travelerBreakdown.adults > 0 && (
									<div className="d-flex justify-content-between mb-2">
										<span className="text-muted">Adults ({travelers?.adults || 0})</span>
										<span className="fw-medium">{fmt(travelerBreakdown.adults)}</span>
									</div>
								)}
								{travelerBreakdown.children > 0 && (
									<div className="d-flex justify-content-between mb-2">
										<span className="text-muted">Children ({travelers?.children || 0})</span>
										<span className="fw-medium">{fmt(travelerBreakdown.children)}</span>
									</div>
								)}
								{travelerBreakdown.infants > 0 && (
									<div className="d-flex justify-content-between mb-2">
										<span className="text-muted">Infants ({travelers?.infants || 0})</span>
										<span className="fw-medium">{fmt(travelerBreakdown.infants)}</span>
									</div>
								)}

								<hr />
								<div className="d-flex justify-content-between mb-4">
									<span className="fw-bold fs-5">Total</span>
									<span className="fw-bold fs-5 text-primary">
										{fmt(travelerBreakdown.total || offer.price)}
									</span>
								</div>

								<button
									type="button"
									className="btn btn-primary w-100 fw-medium d-none d-lg-inline-flex"
									onClick={handleSubmit}
									disabled={submitting}
								>
									{submitting ? (
										<>
											<span className="spinner-border spinner-border-sm me-2" role="status" />
											Processing…
										</>
									) : (
										<>
											Pay &amp; Book
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

			{/* ---------- Status modal ---------- */}
			<StatusModal
				show={modal.show}
				onClose={closeModal}
				variant={modal.variant}
				title={modal.title}
				message={modal.message}
				actionLabel={modal.actionLabel}
				onAction={modal.onAction}
				busy={modal.busy}
			/>
		</Layout>
	);
};

export default FlightBooking;