import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------
 * PNR / flight details checker
 *
 * DEMO MODE: until you connect your API, only the PNR "ABC123" returns data.
 * Replace `lookupPnr` with a real call, e.g.
 *   const res = await fetch(`/api/bookings/${pnr}`);
 *   if (!res.ok) throw new Error('NOT_FOUND');
 *   return res.json();
 * and keep the response shape the same as DEMO_BOOKING below.
 * Set SHOW_DEMO_HINT to false to hide the "try ABC123" hint.
 * ------------------------------------------------------------------ */
const SHOW_DEMO_HINT = true;

const DEMO_BOOKING = {
	pnr: 'ABC123',
	status: 'On time', // 'On time' | 'Boarding' | 'Delayed' | 'Cancelled'
	airline: 'Sample Air',
	flightNumber: 'SA 204',
	date: 'Fri, 16 Oct 2026',
	duration: '6h 40m',
	from: { code: 'LOS', city: 'Lagos', time: '09:15', terminal: 'Terminal 2' },
	to: { code: 'DXB', city: 'Dubai', time: '19:55', terminal: 'Terminal 3' },
	gate: 'B14',
	cabin: 'Economy',
	baggage: '1 x 23kg',
	passengers: [
		{ name: 'Ayomide Oluwatobi', seat: '14A' },
		{ name: 'Guest Traveller', seat: '14B' },
	],
};

async function lookupPnr(pnr) {
	await new Promise((resolve) => setTimeout(resolve, 900)); // simulated network delay
	if (pnr === DEMO_BOOKING.pnr) return DEMO_BOOKING;
	throw new Error('NOT_FOUND');
}

const PNR_PATTERN = /^[A-Z0-9]{6}$/;
const cleanPnr = (value) => value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);

const STATUS_TONE = { 'On time': 'ok', Boarding: 'info', Delayed: 'warn', Cancelled: 'bad' };

function PnrCheckerModal({ show, onHide }) {
	const [pnr, setPnr] = useState('');
	const [phase, setPhase] = useState('idle'); // idle | loading | found | error
	const [booking, setBooking] = useState(null);
	const [message, setMessage] = useState('');

	const reset = () => { setPnr(''); setPhase('idle'); setBooking(null); setMessage(''); };
	const valid = PNR_PATTERN.test(pnr);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!valid) {
			setPhase('error');
			setMessage('Enter the 6-character booking reference from your ticket.');
			return;
		}
		setPhase('loading');
		setMessage('');
		try {
			const data = await lookupPnr(pnr);
			setBooking(data);
			setPhase('found');
		} catch (err) {
			setPhase('error');
			setMessage("We couldn't find a booking with that PNR. Please check it and try again.");
		}
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			onExited={reset}
			centered
			fullscreen="sm-down"
			dialogClassName="pnr-modal"
			aria-labelledby="pnr-title"
		>
			<Modal.Header closeButton className="border-0 pb-0" />

			{phase !== 'found' ? (
				<>
					<div className="pnr-hero">
						<div className="pnr-hero-icon"><i className="bi bi-airplane"></i></div>
						<h5 id="pnr-title">Check your flight</h5>
						<p>Enter your 6-character booking reference (PNR) to see your flight details.</p>
					</div>

					<form className="pnr-form" onSubmit={handleSubmit} noValidate>
						<label htmlFor="pnr-input" className="visually-hidden">Booking reference (PNR)</label>
						<input
							id="pnr-input"
							type="text"
							className={`pnr-input ${phase === 'error' ? 'is-invalid' : ''}`}
							placeholder="ABC123"
							value={pnr}
							maxLength={6}
							autoComplete="off"
							autoCapitalize="characters"
							spellCheck={false}
							autoFocus
							onChange={(e) => { setPnr(cleanPnr(e.target.value)); if (phase === 'error') setPhase('idle'); }}
						/>

						{phase === 'error' && (
							<div className="pnr-error" role="alert">
								<i className="bi bi-exclamation-circle"></i>{message}
							</div>
						)}

						<Button type="submit" className="btn-primary fw-medium w-100 mt-3 py-2" disabled={phase === 'loading'}>
							{phase === 'loading' ? (
								<><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Checking…</>
							) : (
								<><i className="bi bi-search me-2"></i>Check flight</>
							)}
						</Button>

						{SHOW_DEMO_HINT && <p className="pnr-hint">Demo: try <strong>ABC123</strong></p>}
					</form>
				</>
			) : (
				<div className="pnr-result">
					<div className="pnr-pass">
						<div className="pnr-pass-top">
							<div>
								<small>{booking.airline}</small>
								<strong>{booking.flightNumber} · PNR {booking.pnr}</strong>
							</div>
							<span className={`pnr-status is-${STATUS_TONE[booking.status] || 'info'}`}>{booking.status}</span>
						</div>

						<div className="pnr-route">
							<div className="pnr-point">
								<div className="pnr-code">{booking.from.code}</div>
								<div className="pnr-city">{booking.from.city}</div>
								<div className="pnr-time">{booking.from.time}</div>
							</div>
							<div className="pnr-line">
								<i className="bi bi-airplane-fill"></i>
								<small>{booking.duration}</small>
							</div>
							<div className="pnr-point is-end">
								<div className="pnr-code">{booking.to.code}</div>
								<div className="pnr-city">{booking.to.city}</div>
								<div className="pnr-time">{booking.to.time}</div>
							</div>
						</div>

						<div className="pnr-tear"></div>

						<div className="pnr-grid">
							<div><small>Date</small><strong>{booking.date}</strong></div>
							<div><small>Departs from</small><strong>{booking.from.terminal}</strong></div>
							<div><small>Gate</small><strong>{booking.gate}</strong></div>
							<div><small>Arrives at</small><strong>{booking.to.terminal}</strong></div>
							<div><small>Cabin</small><strong>{booking.cabin}</strong></div>
							<div><small>Baggage</small><strong>{booking.baggage}</strong></div>
						</div>

						<div className="pnr-pax">
							<div className="pnr-pax-title">Passengers</div>
							{booking.passengers.map((p) => (
								<div key={p.name} className="pnr-pax-row">
									{p.name}<span>Seat {p.seat}</span>
								</div>
							))}
						</div>
					</div>

					<div className="pnr-actions">
						<Button variant="light" className="fw-medium btn-light-primary" onClick={reset}>Check another PNR</Button>
						<Link to="#" className="btn btn-primary fw-medium" onClick={onHide}>Manage booking</Link>
					</div>
				</div>
			)}
		</Modal>
	);
}

export default PnrCheckerModal;