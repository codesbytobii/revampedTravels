import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	formatPrice,
	stopsLabel,
	confirmPrice,
	extractBookingRequirements,
	savePayToken,
} from '../../Landing2/utils/flights';

const AirlineLogo = ({ code, name }) => (
	<img
		className="img-fluid"
		width="45"
		alt={name || code}
		src={`https://images.kiwi.com/airlines/64/${code}.png`}
		onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
	/>
);

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

/* ---------- Itinerary row (collapsed view) ---------- */
const ItineraryRow = ({ it, withTopMargin }) => (
	<div className={`row ${withTopMargin ? 'mt-4' : ''}`}>
		<div className="col-xl-12 col-lg-12 col-md-12">
			<div className="d-flex align-items-center mb-2">
				<span className={`label ${it.label === 'Return' ? 'bg-light-success text-success' : 'bg-light-primary text-primary'} me-2`}>
					{it.label}
				</span>
				<span className="text-muted text-sm">{it.date}</span>
			</div>
		</div>
		<div className="col-xl-12 col-lg-12 col-md-12">
			<div className="row gx-lg-5 gx-3 gy-4 align-items-center">
				<div className="col-sm-auto">
					<div className="d-flex align-items-center justify-content-start">
						<div className="d-start fl-pic">
							<AirlineLogo code={it.carrierCode} name={it.carrierName} />
						</div>
						<div className="d-end fl-title ps-2">
							<div className="text-dark fw-medium">{it.carrierName}</div>
							{it.cabin && <div className="text-sm text-muted">{it.cabin}</div>}
						</div>
					</div>
				</div>

				<div className="col">
					<div className="row gx-3 align-items-center">
						<div className="col-auto">
							<div className="text-dark fw-bold">{it.depTime}</div>
							<div className="text-muted text-sm fw-medium">{it.from}</div>
						</div>
						<div className="col text-center">
							<div className={`flightLine ${it.label === 'Return' ? 'return' : 'departure'}`}>
								<div></div>
								<div></div>
							</div>
							<div className="text-muted text-sm fw-medium mt-3">{stopsLabel(it.stops)}</div>
						</div>
						<div className="col-auto">
							<div className="text-dark fw-bold">{it.arrTime}</div>
							<div className="text-muted text-sm fw-medium">{it.to}</div>
						</div>
					</div>
				</div>

				<div className="col-md-auto">
					<div className="text-dark fw-medium">{it.duration}</div>
					<div className="text-muted text-sm fw-medium">{stopsLabel(it.stops)}</div>
				</div>
			</div>
		</div>
	</div>
);

/* ---------- Expanded details for one itinerary ---------- */
const ItineraryDetails = ({ itinerary, raw, fareDetails }) => {
	const segments = raw?.segments || [];

	return (
		<div className="itin-details">
			<div className="itin-details-head">
				<div>
					<div className="text-dark fw-semibold">
						{itinerary.from} <i className="bi bi-arrow-right mx-2 text-muted"></i> {itinerary.to}
					</div>
					<div className="text-muted small">
						{itinerary.date} · {itinerary.duration} · {stopsLabel(itinerary.stops)}
					</div>
				</div>
				<div className="text-end">
					<div className="text-muted small">{itinerary.carrierName}</div>
					{itinerary.cabin && <span className="itin-cabin-pill">{itinerary.cabin}</span>}
				</div>
			</div>

			<div className="itin-timeline">
				{segments.map((seg, i) => {
					const nextSeg = segments[i + 1];
					const fare = fareDetails?.find(f => f.segmentId === seg.id);
					const checkedBags = fare?.includedCheckedBags?.quantity
						?? fare?.includedCheckedBags?.weight
						?? null;
					const cabinBags = fare?.includedCabinBags?.quantity
						?? fare?.includedCabinBags?.weight
						?? null;

					const hasLayover = !!nextSeg;
					const layoverMs = hasLayover
						? new Date(nextSeg.departure.at) - new Date(seg.arrival.at)
						: 0;
					const layoverH = Math.floor(layoverMs / 3600000);
					const layoverM = Math.floor((layoverMs % 3600000) / 60000);

					return (
						<React.Fragment key={seg.id || i}>
							<div className="itin-segment">
								<div className="itin-segment-rail">
									<span className="itin-dot"></span>
									<span className="itin-line"></span>
									<span className="itin-dot itin-dot-end"></span>
								</div>

								<div className="itin-segment-body">
									<div className="itin-segment-row">
										<div className="itin-time">
											<div className="itin-time-value">{formatTime(seg.departure?.at)}</div>
											<div className="itin-time-code">{seg.departure?.iataCode}</div>
											<div className="itin-time-day">{formatDay(seg.departure?.at)}</div>
										</div>

										<div className="itin-middle">
											<div className="itin-duration">{formatDuration(seg.duration)}</div>
											<div className="itin-airline">
												<AirlineLogo code={seg.carrierCode} name={seg.airlineName} />
												<div className="ms-2">
													<div className="text-dark small fw-medium">
														{seg.airlineName || seg.carrierCode} · {seg.carrierCode}{seg.number}
													</div>
													<div className="text-muted small">
														Aircraft: {seg.aircraft?.code || '—'}
													</div>
												</div>
											</div>
										</div>

										<div className="itin-time text-end">
											<div className="itin-time-value">{formatTime(seg.arrival?.at)}</div>
											<div className="itin-time-code">{seg.arrival?.iataCode}</div>
											<div className="itin-time-day">{formatDay(seg.arrival?.at)}</div>
										</div>
									</div>

									{(checkedBags || cabinBags) && (
										<div className="itin-bags">
											{checkedBags != null && (
												<span className="itin-bag">
													<i className="bi bi-briefcase"></i>
													{typeof checkedBags === 'number' ? `${checkedBags} checked` : checkedBags}
												</span>
											)}
											{cabinBags != null && (
												<span className="itin-bag">
													<i className="bi bi-handbag"></i>
													{typeof cabinBags === 'number' ? `${cabinBags} cabin` : cabinBags}
												</span>
											)}
											{fare?.brandedFareLabel && (
												<span className="itin-fare">{fare.brandedFareLabel}</span>
											)}
										</div>
									)}
								</div>
							</div>

							{hasLayover && (
								<div className="itin-layover">
									<i className="bi bi-clock-history me-2"></i>
									<span>
										Layover in <strong>{seg.arrival?.iataCode}</strong> — {layoverH}h {layoverM}m
									</span>
								</div>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

/* ---------- One leg accordion ---------- */
const LegAccordion = ({ itinerary, raw, fareDetails, defaultOpen }) => {
	const [open, setOpen] = useState(!!defaultOpen);
	return (
		<div className={`leg-accordion ${open ? 'is-open' : ''}`}>
			<button
				type="button"
				className="leg-accordion-head"
				onClick={() => setOpen(o => !o)}
				aria-expanded={open}
			>
				<div className="d-flex align-items-center gap-3">
					<span className={`label ${itinerary.label === 'Return' ? 'bg-light-success text-success' : 'bg-light-primary text-primary'}`}>
						{itinerary.label}
					</span>
					<span className="text-dark fw-medium">
						{itinerary.from} → {itinerary.to}
					</span>
					<span className="text-muted small">
						{itinerary.depTime} · {itinerary.duration} · {stopsLabel(itinerary.stops)}
					</span>
				</div>
				<i className={`bi bi-chevron-down leg-chevron ${open ? 'is-open' : ''}`}></i>
			</button>

			<div className={`leg-accordion-body ${open ? 'is-open' : ''}`}>
				<ItineraryDetails itinerary={itinerary} raw={raw} fareDetails={fareDetails} />
			</div>
		</div>
	);
};

/* ---------- FlightCard ---------- */
const FlightCard = ({ offer, onSelect, travelers }) => {
	const [expanded, setExpanded] = useState(false);
	const [confirming, setConfirming] = useState(false);
	const [confirmError, setConfirmError] = useState('');
	const navigate = useNavigate();

	const fareDetails = offer.raw?.travelerPricings?.[0]?.fareDetailsBySegment || [];
	const rawItineraries = offer.raw?.itineraries || [];

	const handleSelect = () => {
		setExpanded(true);
		onSelect?.(offer);
	};

	const handleBook = async () => {
		setConfirmError('');
		setConfirming(true);

		try {
			const payload = await confirmPrice(offer.raw);
			const { bookingRequirements, accessToken } = extractBookingRequirements(payload);

			if (accessToken) savePayToken(accessToken);
			localStorage.setItem('bookingRequirements', JSON.stringify(bookingRequirements || {}));
			localStorage.setItem('travelerRequirements', JSON.stringify(bookingRequirements?.travelerRequirements || []));
			localStorage.setItem('selectedFlight', JSON.stringify(offer.raw));

			const requiredKeys = ['emailAddressRequired', 'mobilePhoneNumberRequired'];
			const bookingKeys = bookingRequirements ? Object.keys(bookingRequirements) : [];
			const hasOnlyRequiredKeys =
				bookingKeys.length === requiredKeys.length &&
				requiredKeys.every(k => bookingKeys.includes(k));

			setConfirming(false);

			navigate(`/flights/book/${offer.id}`, {
				state: {
					offer,
					travelers,
					bookingRequirements,
					hasOnlyRequiredKeys,
				},
			});
		} catch (err) {
			console.error(err);
			setConfirmError(err.message || "Couldn't confirm the price. Please try again.");
			setConfirming(false);
		}
	};

	return (
		<div className="col-xl-12 col-lg-12 col-md-12">
			<div className={`flights-accordion ${expanded ? 'is-expanded' : ''}`}>
				<div className="flights-list-item bg-white rounded-3 p-3">
					<div className="row gy-4 align-items-start justify-content-between">
						<div className="col">
							{offer.itineraries.map((it, i) => (
								<ItineraryRow key={i} it={it} withTopMargin={i > 0} />
							))}

							{expanded && (
								<div className="flight-expanded mt-4">
									{offer.itineraries.map((it, i) => (
										<LegAccordion
											key={i}
											itinerary={it}
											raw={rawItineraries[i]}
											fareDetails={fareDetails}
											defaultOpen={i === 0}
										/>
									))}
								</div>
							)}
						</div>

						<div className="col-md-auto">
							<div className="d-flex items-start h-100">
								<div className="d-lg-block d-none border br-dashed me-4"></div>
								<div>
									<div className="text-start text-md-end">
										<div className="text-dark fs-3 fw-bold lh-base">
											{formatPrice(offer.price, offer.currency)}
										</div>
										{offer.seatsLeft > 0 && offer.seatsLeft <= 9 && (
											<div className="text-danger text-sm mb-2">{offer.seatsLeft} seats left</div>
										)}
									</div>

									{confirmError && (
										<div className="text-danger small mb-2">{confirmError}</div>
									)}

									<div className="flight-button-wrap">
										{!expanded ? (
											<button
												type="button"
												className="btn btn-primary btn-md fw-medium full-width"
												onClick={handleSelect}
											>
												Select Flight
												<i className="fa-solid fa-arrow-trend-up ms-2"></i>
											</button>
										) : (
											<>
												<button
													type="button"
													className="btn btn-primary btn-md fw-medium full-width"
													onClick={handleBook}
													disabled={confirming}
												>
													{confirming ? (
														<>
															<span className="spinner-border spinner-border-sm me-2" role="status" />
															Confirming…
														</>
													) : (
														<>
															Book Flight
															<i className="bi bi-arrow-right ms-2"></i>
														</>
													)}
												</button>
												<button
													type="button"
													className="btn btn-link btn-sm w-100 mt-2 text-muted"
													onClick={() => setExpanded(false)}
													disabled={confirming}
												>
													Hide details
												</button>
											</>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FlightCard;