import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Tabs, Tab, Button, Form } from 'react-bootstrap';
import { getImgUrl } from '../utils/asset';
import Flatpickr from 'react-flatpickr';
import { useNavigate } from 'react-router-dom';
import { fmtDate } from '../utils/flights';
// import 'flatpickr/dist/themes/material_blue.css';

const AIRPORT_API = 'https://travels.ffsdgroup.com/api/flight/search/city';
const FLIGHT_LIST_PATH = '/flights'; // <- match the route of FlightList01 in your router

const CLASS_OPTIONS = [
	{ value: 'Economy', desc: 'Standard seats at the best price', icon: 'bi-airplane' },
	{ value: 'Premium Economy', desc: 'Extra legroom and comfort', icon: 'bi-star' },
	{ value: 'Business', desc: 'Wider seats and priority service', icon: 'bi-briefcase' },
	{ value: 'First Class', desc: 'Top-tier space and service', icon: 'bi-gem' },
];

const DEFAULT_TRAVELERS = { rooms: 1, adults: 1, children: 0, infants: 0 };

const plural = (n, one, many) => `${n} ${n === 1 ? one : (many || one + 's')}`;

/* ---------- Icons ---------- */
const PinIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" className="fill-primary" xmlns="http://www.w3.org/2000/svg">
		<path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" />
		<path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" />
	</svg>
);

const CalendarIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" className="fill-primary" xmlns="http://www.w3.org/2000/svg">
		<path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" />
		<path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" />
		<path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" />
	</svg>
);

const UserIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" className="fill-primary" xmlns="http://www.w3.org/2000/svg">
		<path opacity="0.3" d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z" />
		<path d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z" />
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

// Text shown in the input after an airport is chosen
const airportLabel = (a) => `${a.city} (${a.iata})`;

/**
 * Cabin class picker:
 * - pill trigger with icon + animated chevron
 * - each option shows an icon, a short description and a check on the selected one
 * - full keyboard support (Arrow keys, Home/End, Enter/Space, Escape)
 */
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
		<div className="position-relative" ref={ref} onKeyDown={handleKeyDown}>
			<button
				type="button"
				className={`class-pill ${open ? 'is-open' : ''}`}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-label={`Cabin class: ${selected.value}`}
				aria-activedescendant={open ? `class-opt-${active}` : undefined}
				onClick={() => (open ? setOpen(false) : openMenu())}
			>
				<i className={`bi ${selected.icon} text-primary`}></i>
				<span>{selected.value}</span>
				<i className="bi bi-chevron-down chev"></i>
			</button>

			{open && (
				<div className="class-menu" role="listbox" aria-label="Cabin class">
					{CLASS_OPTIONS.map((opt, i) => {
						const isSelected = opt.value === value;
						return (
							<button
								key={opt.value}
								id={`class-opt-${i}`}
								type="button"
								role="option"
								aria-selected={isSelected}
								tabIndex={-1}
								className={`class-option ${i === active ? 'is-active' : ''} ${isSelected ? 'is-selected' : ''}`}
								onMouseEnter={() => setActive(i)}
								onClick={() => choose(opt)}
							>
								<span className="class-icon"><i className={`bi ${opt.icon}`}></i></span>
								<span>
									<div className="class-title">{opt.value}</div>
									<div className="class-desc">{opt.desc}</div>
								</span>
								{isSelected && <i className="bi bi-check2 fs-5 class-check"></i>}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}

function Counter({ label, sub, value, min, max, onChange }) {
	return (
		<div className="d-flex justify-content-between align-items-center py-2">
			<div>
				<div className="fw-medium">{label}</div>
				{sub && <small className="text-muted">{sub}</small>}
			</div>
			<div className="d-flex align-items-center gap-2">
				<Button type="button" variant="outline-primary" size="sm" aria-label={`Decrease ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}>−</Button>
				<span className="text-center" style={{ width: 24 }}>{value}</span>
				<Button type="button" variant="outline-primary" size="sm" aria-label={`Increase ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}>+</Button>
			</div>
		</div>
	);
}

function TravelerPicker({ value, onChange, withRooms = false }) {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);
	useOutsideClick(ref, () => setOpen(false));

	const set = (key, v) => {
		const next = { ...value, [key]: v };
		if (next.infants > next.adults) next.infants = next.adults; // 1 infant per adult
		onChange(next);
	};

	const label = [
		withRooms && plural(value.rooms, 'Room'),
		plural(value.adults, 'Adult'),
		value.children > 0 && plural(value.children, 'Child', 'Children'),
		!withRooms && value.infants > 0 && plural(value.infants, 'Infant'),
	].filter(Boolean).join(', ');

	return (
		<div
			className="position-relative"
			ref={ref}
			onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
		>
			<input
				type="text"
				readOnly
				value={label}
				aria-haspopup="dialog"
				aria-expanded={open}
				style={{ cursor: 'pointer' }}
				className="form-control fw-medium fs-md"
				onClick={() => setOpen(o => !o)}
			/>
			{open && (
				<div
					className="traveler-panel bg-white border shadow p-3 position-absolute"
					style={{ zIndex: 30, minWidth: 260, top: 'calc(100% + 8px)', right: 0 }}
				>
					{withRooms && <Counter label="Rooms" value={value.rooms} min={1} max={5} onChange={v => set('rooms', v)} />}
					<Counter label="Adults" sub="12+ years" value={value.adults} min={1} max={9} onChange={v => set('adults', v)} />
					<Counter label="Children" sub="2–11 years" value={value.children} min={0} max={6} onChange={v => set('children', v)} />
					{!withRooms && (
						<Counter label="Infants" sub="Under 2" value={value.infants} min={0} max={value.adults} onChange={v => set('infants', v)} />
					)}
					<Button type="button" className="w-100 mt-2" onClick={() => setOpen(false)}>Done</Button>
				</div>
			)}
		</div>
	);
}

/**
 * Airport autocomplete backed by the FFSD API:
 * GET /api/flight/search/city?subType=AIRPORT&keyword=<text>
 * - debounced (300ms), min 2 characters
 * - cancels stale requests with AbortController
 * - onChange(text) keeps the visible input in sync
 * - onSelect(airport | null) hands the full airport object (incl. iata) to the parent;
 *   it is called with null whenever the user edits the text after selecting
 */
function DestinationInput({ placeholder, value, onChange, onSelect }) {
	const [open, setOpen] = useState(false);
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const skipNextSearch = useRef(false);

	const keyword = useDebounce(value.trim(), 300);

	useEffect(() => {
		// Don't re-search right after the user picks a suggestion
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
		onSelect?.(null); // text changed, so any previously selected airport is stale
		setOpen(true);
	};

	const trimmed = value.trim();
	const showPanel = open && trimmed.length >= 2;
	const settled = keyword === trimmed; // debounce has caught up with what's typed

	return (
		<div className="input-box autocomplete-container">
			<input
				type="text"
				className="form-control fw-medium fs-md flightInput"
				placeholder={placeholder}
				value={value}
				autoComplete="off"
				onChange={handleInput}
				onFocus={() => setOpen(true)}
				onBlur={() => setTimeout(() => setOpen(false), 150)}
			/>
			{showPanel && (
				<div className="suggestions shadow-sm">
					{(loading || !settled) && (
						<div className="suggestion-item text-muted">Searching airports…</div>
					)}
					{!loading && settled && error && (
						<div className="suggestion-item text-danger">Couldn't load airports. Please try again.</div>
					)}
					{!loading && settled && !error && results.length === 0 && (
						<div className="suggestion-item text-muted">No airports found</div>
					)}
					{!loading && settled && !error && results.map((a) => (
						<div
							key={a.iata}
							className="suggestion-item"
							onMouseDown={() => pick(a)}
						>
							<div className="place-name">
								<i className="bi bi-geo-alt"></i> {a.name} <strong>({a.iata})</strong>
							</div>
							<div className="duration text-truncate">{a.city}, {a.country}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

const SearchButton = ({ onClick, loading = false }) => (
	<Button
		type="button"
		className="btn-primary full-width fw-medium w-100 h-100"
		onClick={onClick}
		disabled={loading}
	>
		{loading
			? <>Searching…</>
			: <><i className="fa-solid fa-magnifying-glass me-2"></i>Search</>}
	</Button>
);

/* ---------- Hero ---------- */
function Hero() {
	const [activeTab, setActiveTab] = useState('flights');
	const [tripType, setTripType] = useState('oneway');

	// Hotels
	const [query, setQuery] = useState('');
	const [hotelTravelers, setHotelTravelers] = useState(DEFAULT_TRAVELERS);

	// Flights (text = what the input shows, airport = selected API result with the iata code)
	const [leavingFrom, setLeavingFrom] = useState('');
	const [fromAirport, setFromAirport] = useState(null);
	const [goingToFlight, setGoingToFlight] = useState('');
	const [toAirport, setToAirport] = useState(null);
	const [flightDates, setFlightDates] = useState([]);
	const [flightClass, setFlightClass] = useState('Economy');
	const [flightTravelers, setFlightTravelers] = useState(DEFAULT_TRAVELERS);

	const navigate = useNavigate();
	const [searchError, setSearchError] = useState('');

	const swapAirports = () => {
		setLeavingFrom(goingToFlight);
		setGoingToFlight(leavingFrom);
		setFromAirport(toAirport);
		setToAirport(fromAirport);
	};

	// Multi-city legs
	const emptyLeg = () => ({ from: '', to: '', fromAirport: null, toAirport: null, date: null });
	const [legs, setLegs] = useState([emptyLeg(), emptyLeg()]);
	const updateLeg = (i, patch) => setLegs(ls => ls.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
	const addLeg = () => setLegs(ls => (ls.length < 5 ? [...ls, emptyLeg()] : ls));
	const removeLeg = (i) => setLegs(ls => (ls.length > 2 ? ls.filter((_, idx) => idx !== i) : ls));

	// Activity
	const [goingToActivity, setGoingToActivity] = useState('');
	const [activityTravelers, setActivityTravelers] = useState(DEFAULT_TRAVELERS);

	// Car Rental
	const [pickupFrom, setPickupFrom] = useState('');
	const [dropTo, setDropTo] = useState('');

	// Validate the form, then open the results page with the search
	const handleFlightSearch = () => {
		setSearchError('');

		let searches;
		if (tripType === 'multicity') {
			searches = legs.map(l => ({
				origin: l.fromAirport?.iata,
				destination: l.toAirport?.iata,
				date: fmtDate(l.date),
			}));
		} else {
			const [dep, ret] = flightDates;
			searches = [{
				origin: fromAirport?.iata,
				destination: toAirport?.iata,
				date: fmtDate(dep),
				returnDate: tripType === 'return' ? fmtDate(ret) : undefined,
			}];
		}

		if (searches.some(s => !s.origin || !s.destination || !s.date)) {
			setSearchError('Please choose an airport from the suggestions for each field, and select a date.');
			return;
		}
		if (tripType === 'return' && !searches[0].returnDate) {
			setSearchError('Please select a return date.');
			return;
		}

		navigate(FLIGHT_LIST_PATH, {
			state: { search: { tripType, cabin: flightClass, travelers: flightTravelers, searches } },
		});
	};

	return (
		<div className="image-cover hero-header bg-white" style={{ background: `url(${getImgUrl('banner-02.jpg')}) no-repeat` }} data-overlay="6">
			<Container>
				{/* Search Form */}
				<Row className="justify-content-center align-items-center">
					<Col xl={9} lg={10} md={12} sm={12}>
						<div className="position-relative text-center mb-5">
							<h1>Explore The World <span className="position-relative z-4 text-primary">Around<span
								className="position-absolute top-50 start-50 translate-middle d-none d-md-block mt-4">
								<svg width="185px" height="23px" viewBox="0 0 445.5 23">
									<path className="fill-primary opacity-7"
										d="M409.9,2.6c-9.7-0.6-19.5-1-29.2-1.5c-3.2-0.2-6.4-0.2-9.7-0.3c-7-0.2-14-0.4-20.9-0.5 c-3.9-0.1-7.8-0.2-11.7-0.3c-1.1,0-2.3,0-3.4,0c-2.5,0-5.1,0-7.6,0c-11.5,0-23,0-34.5,0c-2.7,0-5.5,0.1-8.2,0.1 c-6.8,0.1-13.6,0.2-20.3,0.3c-7.7,0.1-15.3,0.1-23,0.3c-12.4,0.3-24.8,0.6-37.1,0.9c-7.2,0.2-14.3,0.3-21.5,0.6 c-12.3,0.5-24.7,1-37,1.5c-6.7,0.3-13.5,0.5-20.2,0.9C112.7,5.3,99.9,6,87.1,6.7C80.3,7.1,73.5,7.4,66.7,8 C54,9.1,41.3,10.1,28.5,11.2c-2.7,0.2-5.5,0.5-8.2,0.7c-5.5,0.5-11,1.2-16.4,1.8c-0.3,0-0.7,0.1-1,0.1c-0.7,0.2-1.2,0.5-1.7,1 C0.4,15.6,0,16.6,0,17.6c0,1,0.4,2,1.1,2.7c0.7,0.7,1.8,1.2,2.7,1.1c6.6-0.7,13.2-1.5,19.8-2.1c6.1-0.5,12.3-1,18.4-1.6 c6.7-0.6,13.4-1.1,20.1-1.7c2.7-0.2,5.4-0.5,8.1-0.7c10.4-0.6,20.9-1.1,31.3-1.7c6.5-0.4,13-0.7,19.5-1.1c2.7-0.1,5.4-0.3,8.1-0.4 c10.3-0.4,20.7-0.8,31-1.2c6.3-0.2,12.5-0.5,18.8-0.7c2.1-0.1,4.2-0.2,6.3-0.2c11.2-0.3,22.3-0.5,33.5-0.8 c6.2-0.1,12.5-0.3,18.7-0.4c2.2-0.1,4.4-0.1,6.7-0.1c11.5-0.1,23-0.2,34.6-0.4c7.2-0.1,14.4-0.1,21.6-0.1c12.2,0,24.5,0.1,36.7,0.1 c2.4,0,4.8,0.1,7.2,0.2c6.8,0.2,13.5,0.4,20.3,0.6c5.1,0.2,10.1,0.3,15.2,0.4c3.6,0.1,7.2,0.4,10.8,0.6c10.6,0.6,21.1,1.2,31.7,1.8 c2.7,0.2,5.4,0.4,8,0.6c2.9,0.2,5.8,0.4,8.6,0.7c0.4,0.1,0.9,0.2,1.3,0.3c1.1,0.2,2.2,0.2,3.2-0.4c0.9-0.5,1.6-1.5,1.9-2.5 c0.6-2.2-0.7-4.5-2.9-5.2c-1.9-0.5-3.9-0.7-5.9-0.9c-1.4-0.1-2.7-0.3-4.1-0.4c-2.6-0.3-5.2-0.4-7.9-0.6 C419.7,3.1,414.8,2.9,409.9,2.6z">
									</path>
								</svg>
							</span></span> You</h1>
							<p className="fs-5 fw-light">Take a little break from the work stress of everyday. Discover plan trip and
								explore beautiful destinations.</p>
						</div>
					</Col>
					<Col xl={12} lg={12} md={12} sm={12}>
						<Tabs
							activeKey={activeTab}
							onSelect={(k) => setActiveTab(k)}
							className="tab-wraps mb-4 nav-tabs transparent medium justify-content-center border-0"
							id="tour-pills-tab"
						>

							{/* ---------------- FLIGHTS ---------------- */}
							<Tab eventKey="flights" /* title={<><i className="bi bi-airplane me-2"></i>Flights</>} */>
								<div className="search-wrap bg-white rounded-3 p-3">
									<div className="search-upper d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
										<div>
											{[['oneway', 'One Way'], ['return', 'Return'], ['multicity', 'Multi-city']].map(([id, label]) => (
												<Form.Check
													inline
													key={id}
													type="radio"
													name="trip"
													id={id}
													label={label}
													checked={tripType === id}
													onChange={() => setTripType(id)}
												/>
											))}
										</div>
										<ClassDropdown value={flightClass} onChange={setFlightClass} />
									</div>

									{tripType !== 'multicity' ? (
										<Row className="gx-lg-2 g-3">
											<Col xl={3} lg={3} md={6} className="position-relative">
												<div className="inputIicon">
													<div className="myIcon"><PinIcon /></div>
													<DestinationInput
														placeholder="Leaving From"
														value={leavingFrom}
														onChange={setLeavingFrom}
														onSelect={setFromAirport} />
												</div>
												<div className="btn-flip-icon mt-md-0">
													<Button
														variant="link"
														className="p-0 m-0 text-primary"
														aria-label="Swap origin and destination"
														onClick={swapAirports}
													>
														<i className="fa-solid fa-right-left"></i>
													</Button>
												</div>
											</Col>
											<Col xl={3} lg={3} md={6}>
												<div className="inputIicon">
													<div className="myIcon ms-md-2 ms-sm-2"><PinIcon /></div>
													<DestinationInput
														placeholder="Going To"
														value={goingToFlight}
														onChange={setGoingToFlight}
														onSelect={setToAirport} />
												</div>
											</Col>
											<Col xl={2} lg={2} md={6}>
												<div className="inputIicon">
													<div className="myIcon"><CalendarIcon /></div>
													<div className="input-box">
														<Flatpickr
															key={tripType}
															className="form-control fw-medium fs-md"
															id="flight-date"
															placeholder="Choose Date"
															onChange={(dates) => setFlightDates(dates)}
															options={{
																mode: tripType === 'return' ? 'range' : 'single',
																minDate: 'today',
																dateFormat: 'Y-m-d'
															}} />
													</div>
												</div>
											</Col>
											<Col xl={2} lg={2} md={6}>
												<div className="inputIicon">
													<div className="myIcon"><UserIcon /></div>
													<div className="input-box">
														<TravelerPicker value={flightTravelers} onChange={setFlightTravelers} />
													</div>
												</div>
											</Col>
											<Col xl={2} lg={2} md={12}>
												<SearchButton onClick={handleFlightSearch} />
											</Col>
										</Row>
									) : (
										<>
											{legs.map((leg, i) => (
												<Row key={i} className="gx-lg-2 g-3 mb-3 align-items-center">
													<Col xl={1} lg={1} className="d-none d-lg-block fw-medium text-muted">Flight {i + 1}</Col>
													<Col xl={4} lg={4} md={6}>
														<div className="inputIicon">
															<div className="myIcon"><PinIcon /></div>
															<DestinationInput
																placeholder="Leaving From"
																value={leg.from}
																onChange={v => updateLeg(i, { from: v })}
																onSelect={a => updateLeg(i, { fromAirport: a })} />
														</div>
													</Col>
													<Col xl={4} lg={4} md={6}>
														<div className="inputIicon">
															<div className="myIcon"><PinIcon /></div>
															<DestinationInput
																placeholder="Going To"
																value={leg.to}
																onChange={v => updateLeg(i, { to: v })}
																onSelect={a => updateLeg(i, { toAirport: a })} />
														</div>
													</Col>
													<Col xl={2} lg={2} md={10} sm={10}>
														<div className="inputIicon">
															<div className="myIcon"><CalendarIcon /></div>
															<div className="input-box">
																<Flatpickr
																	className="form-control fw-medium fs-md"
																	placeholder="Choose Date"
																	value={leg.date}
																	onChange={([d]) => updateLeg(i, { date: d })}
																	options={{
																		minDate: i > 0 && legs[i - 1].date ? legs[i - 1].date : 'today',
																		dateFormat: 'Y-m-d'
																	}} />
															</div>
														</div>
													</Col>
													<Col xl={1} lg={1} md={2} sm={2}>
														{legs.length > 2 && (
															<Button type="button" variant="link" className="text-danger p-0" aria-label={`Remove flight ${i + 1}`} onClick={() => removeLeg(i)}>
																<i className="bi bi-x-circle"></i>
															</Button>
														)}
													</Col>
												</Row>
											))}
											<Row className="gx-lg-2 g-3 align-items-center">
												<Col xl={4} lg={4} md={12}>
													{legs.length < 5 && (
														<Button type="button" variant="outline-primary" onClick={addLeg}>
															<i className="bi bi-plus-lg me-2"></i>Add another flight
														</Button>
													)}
												</Col>
												<Col xl={4} lg={4} md={6}>
													<div className="inputIicon">
														<div className="myIcon"><UserIcon /></div>
														<div className="input-box">
															<TravelerPicker value={flightTravelers} onChange={setFlightTravelers} />
														</div>
													</div>
												</Col>
												<Col xl={4} lg={4} md={6}>
													<SearchButton onClick={handleFlightSearch} />
												</Col>
											</Row>
										</>
									)}

									{searchError && <div className="text-danger mt-2 small">{searchError}</div>}
								</div>
							</Tab>

							{/* ---------------- HOTELS ---------------- */}
							{/* NOTE: if you re-enable the tabs below, DestinationInput now searches airports.
							    Hotels / activities / car rental need their own location input. */}
							{/* <Tab eventKey="hotels" title={<><i className="bi bi-buildings me-2"></i>Hotels</>}>
								<div className="search-wrap bg-white rounded-3 p-3">
									<Row className="gx-lg-2 g-3">
										<Col xl={7} lg={7} md={12}>
											<Row className="gy-3 gx-lg-2 gx-3">
												<Col xl={6} lg={6} md={6} sm={6} className="position-relative">
													<div className="form-group mb-0">
														<div className="inputIicon">
															<div className="myIcon"><PinIcon /></div>
															<DestinationInput placeholder="Going To" value={query} onChange={setQuery} />
														</div>
													</div>
												</Col>
												<Col xl={6} lg={6} md={6} sm={6} className="position-relative">
													<div className="form-group mb-0">
														<div className="inputIicon">
															<div className="myIcon"><CalendarIcon /></div>
															<div className="input-box">
																<Flatpickr
																	className="form-control fw-medium fs-md" id="checkinout" type="text" placeholder="Choose Date"
																	options={{ mode: "range", minDate: "today", dateFormat: "Y-m-d" }} />
															</div>
														</div>
													</div>
												</Col>
											</Row>
										</Col>
										<Col xl={3} lg={3} md={12}>
											<div className="form-group mb-0">
												<div className="inputIicon">
													<div className="myIcon"><UserIcon /></div>
													<div className="input-box">
														<TravelerPicker withRooms value={hotelTravelers} onChange={setHotelTravelers} />
													</div>
												</div>
											</div>
										</Col>
										<Col xl={2} lg={2} md={12}>
											<div className="form-group mb-0 h-100"><SearchButton /></div>
										</Col>
									</Row>
								</div>
							</Tab> */}


							{/* ---------------- ACTIVITY ---------------- */}
							{/* <Tab eventKey="tours" title={<><i className="bi bi-globe2 me-2"></i>Activity</>}>
								<div className="search-wrap bg-white rounded-3 p-3">
									<Row className="gx-lg-2 g-3">
										<Col xl={7} lg={7} md={12}>
											<Row className="gy-3 gx-lg-2 gx-3">
												<Col xl={6} lg={6} md={6} sm={6} className="position-relative">
													<div className="form-group mb-0">
														<div className="inputIicon">
															<div className="myIcon"><PinIcon /></div>
															<DestinationInput placeholder="Going To" value={goingToActivity} onChange={setGoingToActivity} />
														</div>
													</div>
												</Col>
												<Col xl={6} lg={6} md={6} sm={6} className="position-relative">
													<div className="form-group mb-0">
														<div className="inputIicon">
															<div className="myIcon"><CalendarIcon /></div>
															<div className="input-box">
																<Flatpickr
																	className="form-control fw-medium fs-md" id="activity-date" type="text" placeholder="Choose Date"
																	options={{ mode: "range", minDate: "today", dateFormat: "Y-m-d" }} />
															</div>
														</div>
													</div>
												</Col>
											</Row>
										</Col>
										<Col xl={3} lg={3} md={12}>
											<div className="form-group mb-0">
												<div className="inputIicon">
													<div className="myIcon"><UserIcon /></div>
													<div className="input-box">
														<TravelerPicker value={activityTravelers} onChange={setActivityTravelers} />
													</div>
												</div>
											</div>
										</Col>
										<Col xl={2} lg={2} md={12}>
											<div className="form-group mb-0 h-100"><SearchButton /></div>
										</Col>
									</Row>
								</div>
							</Tab> */}

							{/* ---------------- CAR RENTAL ---------------- */}
							{/* <Tab eventKey="cabs" title={<><i className="bi bi-car-front me-2"></i>Car Rental</>}>
								<div className="search-wrap bg-white rounded-3 p-3">
									<Row className="gx-lg-2 g-3">
										<Col xl={7} lg={7} md={12}>
											<Row className="gy-3 gx-lg-2 gx-3">
												<Col xl={6} lg={6} md={6} sm={6} className="position-relative">
													<div className="form-group mb-0">
														<div className="inputIicon">
															<div className="myIcon"><PinIcon /></div>
															<DestinationInput placeholder="Pickup From" value={pickupFrom} onChange={setPickupFrom} />
														</div>
													</div>
												</Col>
												<Col xl={6} lg={6} md={6} sm={6} className="position-relative">
													<div className="form-group mb-0">
														<div className="inputIicon">
															<div className="myIcon"><PinIcon /></div>
															<DestinationInput placeholder="Drop To" value={dropTo} onChange={setDropTo} />
														</div>
													</div>
												</Col>
											</Row>
										</Col>
										<Col xl={3} lg={3} md={12}>
											<div className="form-group mb-0">
												<div className="inputIicon">
													<div className="myIcon"><CalendarIcon /></div>
													<div className="input-box">
														<Flatpickr
															className="form-control fw-medium fs-md" id="car-date" type="text" placeholder="Choose Date"
															options={{ mode: "range", minDate: "today", dateFormat: "Y-m-d" }} />
													</div>
												</div>
											</div>
										</Col>
										<Col xl={2} lg={2} md={12}>
											<div className="form-group mb-0 h-100"><SearchButton /></div>
										</Col>
									</Row>
								</div>
							</Tab> */}
						</Tabs>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Hero;