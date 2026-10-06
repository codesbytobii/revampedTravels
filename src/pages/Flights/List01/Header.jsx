import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';
import { useNavigate } from 'react-router-dom';

const AIRPORT_API = 'https://travels.ffsdgroup.com/api/flight/search/city';
const FLIGHT_LIST_PATH = '/flights';

const CLASS_OPTIONS = [
	{ value: 'Economy',         desc: 'Standard seats at the best price', icon: 'bi-airplane' },
	{ value: 'Premium Economy', desc: 'Extra legroom and comfort',        icon: 'bi-star' },
	{ value: 'Business',        desc: 'Wider seats and priority service', icon: 'bi-briefcase' },
	{ value: 'First Class',     desc: 'Top-tier space and service',       icon: 'bi-gem' },
];

const DEFAULT_TRAVELERS = { rooms: 1, adults: 1, children: 0, infants: 0 };

const plural = (n, one, many) => `${n} ${n === 1 ? one : (many || one + 's')}`;

/* ---------- Icons ---------- */
const PinIcon = () => (
	<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path fill="#d33" opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" />
		<path fill="#d33" d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" />
	</svg>
);

const CalendarIcon = () => (
	<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path fill="#d33" opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" />
		<path fill="#d33" d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" />
	</svg>
);

const UserIcon = () => (
	<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path fill="#d33" opacity="0.3" d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z" />
		<path fill="#d33" d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z" />
	</svg>
);

/* ---------- Helpers ---------- */
function useOutsideClick(ref, handler) {
	useEffect(() => {
		const listener = (e) => {
			if (ref.current && !ref.current.contains(e.target)) handler();
		};
		document.addEventListener('mousedown', listener);
		return () => document.removeEventListener('mousedown', listener);
	}, [ref, handler]);
}

function useDebounce(value, delay = 300) {
	const [debounced, setDebounced] = useState(value);
	useEffect(() => {
		const t = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(t);
	}, [value, delay]);
	return debounced;
}

const airportLabel = (a) => `${a.city} (${a.iata})`;

/* ---------- Class dropdown ---------- */
function ClassDropdown({ value, onChange }) {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(0);
	const ref = useRef(null);
	useOutsideClick(ref, () => setOpen(false));

	const selectedIndex = CLASS_OPTIONS.findIndex(o => o.value === value);
	const selected = CLASS_OPTIONS[selectedIndex] || CLASS_OPTIONS[0];

	const openMenu = () => { setActive(selectedIndex < 0 ? 0 : selectedIndex); setOpen(true); };
	const choose = (opt) => { onChange(opt.value); setOpen(false); };

	const handleKeyDown = (e) => {
		if (!open) {
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); openMenu(); }
			return;
		}
		const last = CLASS_OPTIONS.length - 1;
		switch (e.key) {
			case 'ArrowDown': e.preventDefault(); setActive(a => (a >= last ? 0 : a + 1)); break;
			case 'ArrowUp': e.preventDefault(); setActive(a => (a <= 0 ? last : a - 1)); break;
			case 'Home': e.preventDefault(); setActive(0); break;
			case 'End': e.preventDefault(); setActive(last); break;
			case 'Enter':
			case ' ': e.preventDefault(); choose(CLASS_OPTIONS[active]); break;
			case 'Escape': e.preventDefault(); setOpen(false); break;
			case 'Tab': setOpen(false); break;
			default: break;
		}
	};

	return (
		<div className="position-relative hdr2-class" ref={ref} onKeyDown={handleKeyDown}>
			<button
				type="button"
				className={`hdr2-class-pill ${open ? 'is-open' : ''}`}
				aria-haspopup="listbox"
				aria-expanded={open}
				onClick={() => (open ? setOpen(false) : openMenu())}
			>
				<i className={`bi ${selected.icon}`}></i>
				<span>{selected.value}</span>
				<i className="bi bi-chevron-down hdr2-chev"></i>
			</button>

			{open && (
				<div className="hdr2-class-menu" role="listbox">
					{CLASS_OPTIONS.map((opt, i) => {
						const isSelected = opt.value === value;
						return (
							<button
								key={opt.value}
								type="button"
								role="option"
								aria-selected={isSelected}
								className={`hdr2-class-option ${i === active ? 'is-active' : ''} ${isSelected ? 'is-selected' : ''}`}
								onMouseEnter={() => setActive(i)}
								onClick={() => choose(opt)}
							>
								<span className="hdr2-class-icon"><i className={`bi ${opt.icon}`}></i></span>
								<span className="hdr2-class-text">
									<div className="hdr2-class-title">{opt.value}</div>
									<div className="hdr2-class-desc">{opt.desc}</div>
								</span>
								{isSelected && <i className="bi bi-check2 hdr2-class-check"></i>}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}

/* ---------- Traveler picker ---------- */
function Counter({ label, sub, value, min, max, onChange }) {
	return (
		<div className="d-flex justify-content-between align-items-center py-2">
			<div>
				<div className="fw-medium small">{label}</div>
				{sub && <small className="text-muted">{sub}</small>}
			</div>
			<div className="d-flex align-items-center gap-2">
				<button
					type="button"
					className="hdr2-counter-btn"
					disabled={value <= min}
					onClick={() => onChange(value - 1)}
				>−</button>
				<span className="text-center small fw-semibold" style={{ width: 20 }}>{value}</span>
				<button
					type="button"
					className="hdr2-counter-btn"
					disabled={value >= max}
					onClick={() => onChange(value + 1)}
				>+</button>
			</div>
		</div>
	);
}

function TravelerPicker({ value, onChange }) {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);
	useOutsideClick(ref, () => setOpen(false));

	const set = (key, v) => {
		const next = { ...value, [key]: v };
		if (next.infants > next.adults) next.infants = next.adults;
		onChange(next);
	};

	const label = [
		plural(value.adults, 'Adult'),
		value.children > 0 && plural(value.children, 'Child', 'Children'),
		value.infants > 0 && plural(value.infants, 'Infant'),
	].filter(Boolean).join(', ');

	return (
		<div className="position-relative h-100" ref={ref} onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}>
			<button type="button" className="hdr2-field" onClick={() => setOpen(o => !o)}>
				<span className="hdr2-field-icon"><UserIcon /></span>
				<span className="hdr2-field-content">
					<span className="hdr2-field-label">Travelers</span>
					<span className="hdr2-field-value">{label}</span>
				</span>
			</button>

			{open && (
				<div className="hdr2-panel">
					<Counter label="Adults" sub="12+ years" value={value.adults} min={1} max={9} onChange={v => set('adults', v)} />
					<Counter label="Children" sub="2–11 years" value={value.children} min={0} max={6} onChange={v => set('children', v)} />
					<Counter label="Infants" sub="Under 2" value={value.infants} min={0} max={value.adults} onChange={v => set('infants', v)} />
					<button type="button" className="hdr2-done-btn" onClick={() => setOpen(false)}>Done</button>
				</div>
			)}
		</div>
	);
}

/* ---------- Airport autocomplete ---------- */
function DestinationInput({ label, placeholder, value, onChange, onSelect }) {
	const [open, setOpen] = useState(false);
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const skipNextSearch = useRef(false);

	const keyword = useDebounce(value.trim(), 300);

	useEffect(() => {
		if (skipNextSearch.current) { skipNextSearch.current = false; return; }

		if (keyword.length < 2) {
			setResults([]);
			setError(false);
			setLoading(false);
			return;
		}

		const controller = new AbortController();
		setLoading(true);
		setError(false);

		const params = new URLSearchParams({ subType: 'AIRPORT', keyword });
		fetch(`${AIRPORT_API}?${params.toString()}`, { signal: controller.signal })
			.then(res => {
				if (!res.ok) throw new Error(`Request failed: ${res.status}`);
				return res.json();
			})
			.then(data => {
				setResults(Array.isArray(data) ? data.slice(0, 8) : []);
				setLoading(false);
			})
			.catch(err => {
				if (err.name === 'AbortError') return;
				setResults([]);
				setError(true);
				setLoading(false);
			});

		return () => controller.abort();
	}, [keyword]);

	const pick = (airport) => {
		skipNextSearch.current = true;
		onChange(airportLabel(airport));
		onSelect?.(airport);
		setOpen(false);
	};

	const handleInput = (e) => {
		onChange(e.target.value);
		onSelect?.(null);
		setOpen(true);
	};

	const trimmed = value.trim();
	const showPanel = open && trimmed.length >= 2;
	const settled = keyword === trimmed;

	return (
		<div className="position-relative h-100">
			<div className="hdr2-field">
				<span className="hdr2-field-icon"><PinIcon /></span>
				<div className="hdr2-field-content">
					<span className="hdr2-field-label">{label}</span>
					<input
						type="text"
						className="hdr2-field-input"
						placeholder={placeholder}
						value={value}
						autoComplete="off"
						onChange={handleInput}
						onFocus={() => setOpen(true)}
						onBlur={() => setTimeout(() => setOpen(false), 150)}
					/>
				</div>
			</div>

			{showPanel && (
				<div className="hdr2-suggestions">
					{(loading || !settled) && <div className="hdr2-suggestion-item text-muted">Searching airports…</div>}
					{!loading && settled && error && (
						<div className="hdr2-suggestion-item text-danger">Couldn't load airports. Try again.</div>
					)}
					{!loading && settled && !error && results.length === 0 && (
						<div className="hdr2-suggestion-item text-muted">No airports found</div>
					)}
					{!loading && settled && !error && results.map((a) => (
						<div key={a.iata} className="hdr2-suggestion-item" onMouseDown={() => pick(a)}>
							<div className="hdr2-place-name">
								<i className="bi bi-geo-alt me-1"></i>
								{a.name} <strong>({a.iata})</strong>
							</div>
							<div className="hdr2-duration text-truncate">{a.city}, {a.country}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

/* ==================== HEADER ==================== */
const Header = ({ search, onSearch }) => {
	const navigate = useNavigate();

	const initialLeg = search?.searches?.[0] || {};

	const [tripType, setTripType] = useState(search?.tripType || 'return');
	const [cabin, setCabin] = useState(search?.cabin || 'Economy');
	const [travelers, setTravelers] = useState(search?.travelers || DEFAULT_TRAVELERS);

	// Single-leg state
	const [leavingFrom, setLeavingFrom] = useState(initialLeg.origin || '');
	const [goingTo, setGoingTo] = useState(initialLeg.destination || '');
	const [fromAirport, setFromAirport] = useState(
		initialLeg.origin ? { iata: initialLeg.origin, city: initialLeg.origin, country: '' } : null
	);
	const [toAirport, setToAirport] = useState(
		initialLeg.destination ? { iata: initialLeg.destination, city: initialLeg.destination, country: '' } : null
	);
	const [flightDates, setFlightDates] = useState(() => {
		const out = [];
		if (initialLeg.date) out.push(new Date(`${initialLeg.date}T00:00:00`));
		if (initialLeg.returnDate) out.push(new Date(`${initialLeg.returnDate}T00:00:00`));
		return out;
	});

	// Multi-city state
	const emptyLeg = () => ({ from: '', to: '', fromAirport: null, toAirport: null, date: null });
	const [legs, setLegs] = useState(() => {
		if (search?.tripType === 'multicity' && search?.legs?.length) {
			return search.legs.map(l => ({
				from: l.origin || '',
				to: l.destination || '',
				fromAirport: l.origin ? { iata: l.origin, city: l.origin, country: '' } : null,
				toAirport: l.destination ? { iata: l.destination, city: l.destination, country: '' } : null,
				date: l.date ? new Date(`${l.date}T00:00:00`) : null,
			}));
		}
		return [emptyLeg(), emptyLeg()];
	});

	const updateLeg = (i, patch) =>
		setLegs(ls => ls.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
	const addLeg = () => setLegs(ls => (ls.length < 5 ? [...ls, emptyLeg()] : ls));
	const removeLeg = (i) => setLegs(ls => (ls.length > 2 ? ls.filter((_, idx) => idx !== i) : ls));

	const [error, setError] = useState('');

	const swapAirports = () => {
		setLeavingFrom(goingTo);
		setGoingTo(leavingFrom);
		setFromAirport(toAirport);
		setToAirport(fromAirport);
	};

	const fmtDate = (d) => {
		if (!d) return undefined;
		const dt = new Date(d);
		const m = String(dt.getMonth() + 1).padStart(2, '0');
		const day = String(dt.getDate()).padStart(2, '0');
		return `${dt.getFullYear()}-${m}-${day}`;
	};

	const handleSearch = () => {
		setError('');

		/* ---- Multi-city ---- */
		if (tripType === 'multicity') {
			const cleanLegs = [];
			for (let i = 0; i < legs.length; i++) {
				const l = legs[i];
				if (!l.fromAirport?.iata || !l.toAirport?.iata) {
					setError(`Flight ${i + 1}: please choose both airports from the suggestions.`);
					return;
				}
				if (!l.date) {
					setError(`Flight ${i + 1}: please select a date.`);
					return;
				}
				cleanLegs.push({
					origin: l.fromAirport.iata,
					destination: l.toAirport.iata,
					date: fmtDate(l.date),
				});
			}
			const nextSearch = { tripType: 'multicity', cabin, travelers, legs: cleanLegs };
			if (onSearch) onSearch(nextSearch);
			else navigate(FLIGHT_LIST_PATH, { state: { search: nextSearch }, replace: true });
			return;
		}

		/* ---- Return / One-way ---- */
		const [dep, ret] = flightDates;
		if (!fromAirport?.iata || !toAirport?.iata) {
			setError('Please choose both airports from the suggestions.');
			return;
		}
		if (!dep) {
			setError('Please select a departure date.');
			return;
		}
		if (tripType === 'return' && !ret) {
			setError('Please select a return date.');
			return;
		}
		const searches = [{
			origin: fromAirport.iata,
			destination: toAirport.iata,
			date: fmtDate(dep),
			returnDate: tripType === 'return' ? fmtDate(ret) : undefined,
		}];
		const nextSearch = { tripType, cabin, travelers, searches };
		if (onSearch) onSearch(nextSearch);
		else navigate(FLIGHT_LIST_PATH, { state: { search: nextSearch }, replace: true });
	};

	return (
		<div className="hdr2-bar">
			<Container>
				<div className="hdr2-shell">

					{/* Top row: trip type + class */}
					<div className="hdr2-top">
						<div className="hdr2-tabs">
							{[
								['return',    'Return',     'bi-arrow-left-right'],
								['oneway',    'One way',    'bi-arrow-right'],
								['multicity', 'Multi-city', 'bi-signpost-split'],
							].map(([id, label, icon]) => (
								<button
									key={id}
									type="button"
									className={`hdr2-tab ${tripType === id ? 'is-active' : ''}`}
									onClick={() => setTripType(id)}
								>
									<i className={`bi ${icon}`}></i>
									<span>{label}</span>
								</button>
							))}
						</div>

						<div className="hdr2-top-right">
							<ClassDropdown value={cabin} onChange={setCabin} />
						</div>
					</div>

					{tripType === 'multicity' ? (
						<>
							{/* Multi-city legs */}
							<div className="hdr2-legs">
								{legs.map((leg, i) => (
									<div key={i} className="hdr2-leg">
										<div className="hdr2-leg-num">Flight {i + 1}</div>

										<div className="hdr2-leg-fields">
											<div className="hdr2-cell hdr2-cell--airport">
												<DestinationInput
													label="From"
													placeholder="City or airport"
													value={leg.from}
													onChange={v => updateLeg(i, { from: v })}
													onSelect={a => updateLeg(i, { fromAirport: a })}
												/>
											</div>

											<div className="hdr2-cell hdr2-cell--airport">
												<DestinationInput
													label="To"
													placeholder="City or airport"
													value={leg.to}
													onChange={v => updateLeg(i, { to: v })}
													onSelect={a => updateLeg(i, { toAirport: a })}
												/>
											</div>

											<div className="hdr2-cell hdr2-cell--date">
												<div className="hdr2-field">
													<span className="hdr2-field-icon"><CalendarIcon /></span>
													<div className="hdr2-field-content">
														<span className="hdr2-field-label">Date</span>
														<Flatpickr
															className="hdr2-field-input"
															placeholder="Pick a date"
															value={leg.date ? [leg.date] : []}
															onChange={([d]) => updateLeg(i, { date: d })}
															options={{
																minDate: i > 0 && legs[i - 1].date ? legs[i - 1].date : 'today',
																dateFormat: 'd M Y',
															}}
														/>
													</div>
												</div>
											</div>

											{legs.length > 2 && (
												<button
													type="button"
													className="hdr2-leg-remove"
													aria-label={`Remove flight ${i + 1}`}
													onClick={() => removeLeg(i)}
												>
													<i className="bi bi-x-lg"></i>
												</button>
											)}
										</div>
									</div>
								))}
							</div>

							<div className="hdr2-bottom-row">
								<button
									type="button"
									className="hdr2-add-leg"
									onClick={addLeg}
									disabled={legs.length >= 5}
								>
									<i className="bi bi-plus-lg me-2"></i>Add another flight
								</button>

								<div className="hdr2-bottom-right">
									<div className="hdr2-cell hdr2-cell--travelers-inline">
										<TravelerPicker value={travelers} onChange={setTravelers} />
									</div>
									<button
										type="button"
										className="hdr2-search-btn"
										onClick={handleSearch}
									>
										<i className="fa-solid fa-magnifying-glass"></i>
										<span>Search</span>
									</button>
								</div>
							</div>
						</>
					) : (
						<div className="hdr2-fields">
							<div className="hdr2-cell hdr2-cell--airport">
								<DestinationInput
									label="From"
									placeholder="City or airport"
										value={leavingFrom}
									onChange={setLeavingFrom}
									onSelect={setFromAirport}
								/>
								<button
									type="button"
									className="hdr2-swap"
									aria-label="Swap airports"
									onClick={swapAirports}
								>
									<i className="fa-solid fa-right-left"></i>
								</button>
							</div>

							<div className="hdr2-cell hdr2-cell--airport">
								<DestinationInput
									label="To"
									placeholder="City or airport"
									value={goingTo}
									onChange={setGoingTo}
									onSelect={setToAirport}
								/>
							</div>

							<div className="hdr2-cell hdr2-cell--date">
								<div className="hdr2-field">
									<span className="hdr2-field-icon"><CalendarIcon /></span>
									<div className="hdr2-field-content">
										<span className="hdr2-field-label">Dates</span>
										<Flatpickr
											className="hdr2-field-input"
											placeholder={tripType === 'return' ? 'Depart – Return' : 'Depart'}
											value={flightDates}
											onChange={(dates) => setFlightDates(dates)}
											options={{
												mode: tripType === 'return' ? 'range' : 'single',
												minDate: 'today',
												dateFormat: 'd M Y',
											}}
										/>
									</div>
								</div>
							</div>

							<div className="hdr2-cell hdr2-cell--travelers">
								<TravelerPicker value={travelers} onChange={setTravelers} />
							</div>

							<div className="hdr2-cell hdr2-cell--btn">
								<button
									type="button"
									className="hdr2-search-btn"
									onClick={handleSearch}
								>
									<i className="fa-solid fa-magnifying-glass"></i>
									<span>Search</span>
								</button>
							</div>
						</div>
					)}

					{error && (
						<div className="hdr2-error">
							<i className="bi bi-exclamation-circle me-2"></i>{error}
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};

export default Header;