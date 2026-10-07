import React, { useMemo, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

// assets
import air1 from "../../../assets/img/air-1.png";
import air2 from "../../../assets/img/air-2.png";
import air3 from "../../../assets/img/air-3.png";
import air4 from "../../../assets/img/air-4.png";
import air5 from "../../../assets/img/air-5.png";

import FlightCard from './FlightCard';

const PAGE_SIZE = 5;

/* ----- time bucket helpers ----- */
const BUCKETS = [
	{ id: 'before6am', label: 'Before 6AM', test: (h) => h < 6 },
	{ id: '6am12pm',   label: '6AM - 12PM', test: (h) => h >= 6 && h < 12 },
	{ id: '12pm6pm',   label: '12PM - 6PM', test: (h) => h >= 12 && h < 18 },
	{ id: 'after6pm',  label: 'After 6PM',  test: (h) => h >= 18 },
];

const STOP_OPTIONS = [
	{ id: 'direct', label: 'Direct' },
	{ id: '1stop',  label: '1 Stop' },
	{ id: '2stop',  label: '2+ Stops' },
];

const FACILITY_OPTIONS = [
	{ id: 'baggage',        label: 'Baggage',                 icon: 'bi-briefcase' },
	{ id: 'inflightmeal',   label: 'In-flight Meal',          icon: 'bi-cup-hot' },
	{ id: 'inflightenter',  label: 'In-flight Entertainment', icon: 'bi-tv' },
	{ id: 'flswifi',        label: 'WiFi',                    icon: 'bi-wifi' },
	{ id: 'flusbport',      label: 'Power / USB Port',        icon: 'bi-plug' },
];

const hourOf = (timeStr) => {
	const h = parseInt((timeStr || '').slice(0, 2), 10);
	return Number.isNaN(h) ? null : h;
};

/* ----- filter matcher ----- */
const offerMatchesFilters = (offer, f) => {
	const { departureBuckets, returnBuckets, onwardStops, returnStops, priceMin, priceMax, airlines } = f;
	const dep = offer.itineraries[0];
	const ret = offer.itineraries[1];

	if (departureBuckets.length) {
		const h = hourOf(dep?.depTime);
		if (h == null) return false;
		if (!departureBuckets.some(id => BUCKETS.find(b => b.id === id)?.test(h))) return false;
	}

	if (returnBuckets.length) {
		if (!ret) return false;
		const h = hourOf(ret.depTime);
		if (h == null) return false;
		if (!returnBuckets.some(id => BUCKETS.find(b => b.id === id)?.test(h))) return false;
	}

	if (onwardStops.length) {
		const s = dep?.stops ?? 0;
		const match = onwardStops.some(k =>
			k === 'direct' ? s === 0 : k === '1stop' ? s === 1 : s >= 2
		);
		if (!match) return false;
	}

	if (returnStops.length) {
		if (!ret) return false;
		const s = ret.stops ?? 0;
		const match = returnStops.some(k =>
			k === 'direct' ? s === 0 : k === '1stop' ? s === 1 : s >= 2
		);
		if (!match) return false;
	}

	if (priceMin != null && offer.price < priceMin) return false;
	if (priceMax != null && offer.price > priceMax) return false;

	if (airlines.length) {
		const codes = offer.itineraries.map(i => i.carrierCode).filter(Boolean);
		if (!codes.some(c => airlines.includes(c))) return false;
	}

	return true;
};

/* ----- accordion section ----- */
const FilterSection = ({ id, title, subtitle, children, openSections, toggleSection, badge }) => {
	const isOpen = openSections.includes(id);
	return (
		<div className={`filter-section ${isOpen ? 'is-open' : ''}`}>
			<button
				type="button"
				className="filter-section-toggle"
				aria-expanded={isOpen}
				aria-controls={`filter-${id}`}
				onClick={() => toggleSection(id)}
			>
				<div className="d-flex flex-column align-items-start">
					<span className="filter-section-title">{title}</span>
					{subtitle && <span className="filter-section-subtitle">{subtitle}</span>}
				</div>
				<div className="d-flex align-items-center gap-2">
					{badge > 0 && <span className="filter-badge">{badge}</span>}
					<i className={`bi bi-chevron-down filter-chevron ${isOpen ? 'is-open' : ''}`}></i>
				</div>
			</button>

			<div id={`filter-${id}`} className={`filter-section-body ${isOpen ? 'is-open' : ''}`}>
				<div className="filter-section-inner">{children}</div>
			</div>
		</div>
	);
};

const MainConent = ({ groups = [], loading, error, hasSearch, onSelect, travelers }) => {
	/* ---------- filter state ---------- */
	const [departureBuckets, setDepartureBuckets] = useState([]);
	const [returnBuckets, setReturnBuckets]       = useState([]);
	const [onwardStops, setOnwardStops]           = useState([]);
	const [returnStops, setReturnStops]           = useState([]);
	const [priceMin, setPriceMin]                 = useState(null);
	const [priceMax, setPriceMax]                 = useState(null);
	const [facilities, setFacilities]             = useState([]);
	const [airlines, setAirlines]                 = useState([]);
	const [sort, setSort]                         = useState('trending');
	const [page, setPage]                         = useState(1);
	const [openSections, setOpenSections]         = useState([]);

	const toggleSection = (id) =>
		setOpenSections(list =>
			list.includes(id) ? list.filter(x => x !== id) : [...list, id]
		);

	/* ---------- data ---------- */
	const allOffers = useMemo(() => groups.flatMap(g => g.offers || []), [groups]);

	const realMin = useMemo(
		() => (allOffers.length ? Math.floor(Math.min(...allOffers.map(o => o.price)) / 1000) * 1000 : 0),
		[allOffers]
	);
	const realMax = useMemo(
		() => (allOffers.length ? Math.ceil(Math.max(...allOffers.map(o => o.price)) / 1000) * 1000 : 1000),
		[allOffers]
	);

	const hasReturnLegs = useMemo(() => allOffers.some(o => o.itineraries[1]), [allOffers]);

	const airlineRows = useMemo(() => {
		const map = new Map();
		allOffers.forEach(o => {
			o.itineraries.forEach(it => {
				if (!it.carrierCode) return;
				if (!map.has(it.carrierCode)) {
					map.set(it.carrierCode, {
						code: it.carrierCode,
						name: it.carrierName || it.carrierCode,
						price: o.price,
					});
				} else {
					const row = map.get(it.carrierCode);
					if (o.price < row.price) row.price = o.price;
				}
			});
		});
		return [...map.values()].sort((a, b) => a.price - b.price);
	}, [allOffers]);

	const fallbackLogos = [air1, air2, air3, air4, air5];
	const logoFor = (code) => `https://images.kiwi.com/airlines/64/${code}.png`;

	/* ---------- toggles ---------- */
	const toggleIn = (setter) => (id) =>
		setter(list => (list.includes(id) ? list.filter(x => x !== id) : [...list, id]));

	const toggleBucket  = toggleIn(setDepartureBuckets);
	const toggleRBucket = toggleIn(setReturnBuckets);
	const toggleOStop   = toggleIn(setOnwardStops);
	const toggleRStop   = toggleIn(setReturnStops);
	const toggleFac     = toggleIn(setFacilities);
	const toggleAirline = toggleIn(setAirlines);

	const clearAll = () => {
		setDepartureBuckets([]);
		setReturnBuckets([]);
		setOnwardStops([]);
		setReturnStops([]);
		setPriceMin(null);
		setPriceMax(null);
		setFacilities([]);
		setAirlines([]);
		setPage(1);
	};

	/* ---------- active filter chips ---------- */
	const activeChips = useMemo(() => {
		const chips = [];
		departureBuckets.forEach(id => {
			const b = BUCKETS.find(x => x.id === id);
			if (b) chips.push({ key: `dep-${id}`, label: `Dep: ${b.label}`, onRemove: () => toggleBucket(id) });
		});
		returnBuckets.forEach(id => {
			const b = BUCKETS.find(x => x.id === id);
			if (b) chips.push({ key: `ret-${id}`, label: `Ret: ${b.label}`, onRemove: () => toggleRBucket(id) });
		});
		onwardStops.forEach(id => {
			const s = STOP_OPTIONS.find(x => x.id === id);
			if (s) chips.push({ key: `ostop-${id}`, label: s.label, onRemove: () => toggleOStop(id) });
		});
		returnStops.forEach(id => {
			const s = STOP_OPTIONS.find(x => x.id === id);
			if (s) chips.push({ key: `rstop-${id}`, label: `Ret: ${s.label}`, onRemove: () => toggleRStop(id) });
		});
		if (priceMin != null || priceMax != null) {
			chips.push({
				key: 'price',
				label: `₦${(priceMin ?? realMin).toLocaleString()} – ₦${(priceMax ?? realMax).toLocaleString()}`,
				onRemove: () => { setPriceMin(null); setPriceMax(null); },
			});
		}
		facilities.forEach(id => {
			const f = FACILITY_OPTIONS.find(x => x.id === id);
			if (f) chips.push({ key: `fac-${id}`, label: f.label, onRemove: () => toggleFac(id) });
		});
		airlines.forEach(code => {
			const a = airlineRows.find(x => x.code === code);
			chips.push({ key: `air-${code}`, label: a?.name || code, onRemove: () => toggleAirline(code) });
		});
		return chips;
	}, [departureBuckets, returnBuckets, onwardStops, returnStops, priceMin, priceMax, facilities, airlines, airlineRows, realMin, realMax]);

	/* ---------- apply filters + sort ---------- */
	const filtered = useMemo(() => {
		const f = {
			departureBuckets, returnBuckets,
			onwardStops, returnStops,
			priceMin, priceMax,
			facilities, airlines,
		};
		const list = allOffers.filter(o => offerMatchesFilters(o, f));

		switch (sort) {
			case 'lowprice':    return [...list].sort((a, b) => a.price - b.price);
			case 'mostpopular': return [...list].sort((a, b) => a.seatsLeft - b.seatsLeft);
			default:            return list;
		}
	}, [allOffers, departureBuckets, returnBuckets, onwardStops, returnStops, priceMin, priceMax, facilities, airlines, sort]);

	const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const safePage  = Math.min(page, pageCount);
	const paged     = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
	const totalOffers = allOffers.length;

	const sliderMin = priceMin ?? realMin;
	const sliderMax = priceMax ?? realMax;

	return (
		<section className="gray-simple">
			<Container>
				<Row className="justify-content-between align-items-start gy-4 gx-xl-4 gx-lg-3 gx-md-3 gx-4">

					{/* ============== FILTERS SIDEBAR ============== */}
					<Col xl={3} lg={4} md={12}>
						<div className="filter-card">

							<div className="filter-card-header">
								<div>
									<h6 className="filter-card-title">Filters</h6>
									<p className="filter-card-subtitle">
										{loading
											? 'Loading…'
											: `${filtered.length} of ${totalOffers} flights`}
									</p>
								</div>
								{activeChips.length > 0 && (
									<button
										type="button"
										onClick={clearAll}
										className="filter-clear-btn"
									>
										Clear all
									</button>
								)}
							</div>

							{activeChips.length > 0 && (
								<div className="filter-chips">
									{activeChips.map(c => (
										<button
											key={c.key}
											type="button"
											className="filter-chip"
											onClick={c.onRemove}
											aria-label={`Remove filter ${c.label}`}
										>
											<span>{c.label}</span>
											<i className="bi bi-x-lg ms-1"></i>
										</button>
									))}
								</div>
							)}

							<div className="filter-card-body">

								<FilterSection
									id="departure"
									title="Departure time"
									subtitle="When you take off"
									openSections={openSections}
									toggleSection={toggleSection}
									badge={departureBuckets.length}
								>
									<div className="time-grid">
										{BUCKETS.map(b => {
											const active = departureBuckets.includes(b.id);
											return (
												<button
													type="button"
													key={b.id}
													className={`time-chip ${active ? 'is-active' : ''}`}
													onClick={() => toggleBucket(b.id)}
												>
													{b.label}
												</button>
											);
										})}
									</div>
								</FilterSection>

								{hasReturnLegs && (
									<FilterSection
										id="return"
										title="Return time"
										subtitle="When you come back"
										openSections={openSections}
										toggleSection={toggleSection}
										badge={returnBuckets.length}
									>
										<div className="time-grid">
											{BUCKETS.map(b => {
												const active = returnBuckets.includes(b.id);
												return (
													<button
														type="button"
														key={b.id}
														className={`time-chip ${active ? 'is-active' : ''}`}
														onClick={() => toggleRBucket(b.id)}
													>
														{b.label}
													</button>
												);
											})}
										</div>
									</FilterSection>
								)}

								<FilterSection
									id="stops"
									title="Stops"
									subtitle="How many layovers"
									openSections={openSections}
									toggleSection={toggleSection}
									badge={onwardStops.length}
								>
									<ul className="filter-list">
										{STOP_OPTIONS.map(s => (
											<li key={s.id}>
												<label className="filter-check">
													<input
														type="checkbox"
														checked={onwardStops.includes(s.id)}
														onChange={() => toggleOStop(s.id)}
													/>
													<span className="filter-check-box"></span>
													<span className="filter-check-label">{s.label}</span>
												</label>
											</li>
										))}
									</ul>
								</FilterSection>

								{hasReturnLegs && (
									<FilterSection
										id="returnStops"
										title="Return stops"
										subtitle="Layovers on the way back"
										openSections={openSections}
										toggleSection={toggleSection}
										badge={returnStops.length}
									>
										<ul className="filter-list">
											{STOP_OPTIONS.map(s => (
												<li key={s.id}>
													<label className="filter-check">
														<input
															type="checkbox"
															checked={returnStops.includes(s.id)}
															onChange={() => toggleRStop(s.id)}
														/>
														<span className="filter-check-box"></span>
														<span className="filter-check-label">{s.label}</span>
													</label>
												</li>
											))}
										</ul>
									</FilterSection>
								)}

								<FilterSection
									id="price"
									title="Price range"
									subtitle="NGN per traveler"
									openSections={openSections}
									toggleSection={toggleSection}
									badge={(priceMin != null || priceMax != null) ? 1 : 0}
								>
									<div className="price-inputs">
										<div className="price-field">
											<span className="price-prefix">₦</span>
											<input
												type="number"
												placeholder={realMin.toLocaleString()}
												value={priceMin ?? ''}
												min={realMin}
												max={sliderMax}
												onChange={e => {
													const v = e.target.value === '' ? null : Number(e.target.value);
													setPriceMin(v);
												}}
											/>
										</div>
										<span className="price-dash">–</span>
										<div className="price-field">
											<span className="price-prefix">₦</span>
											<input
												type="number"
												placeholder={realMax.toLocaleString()}
												value={priceMax ?? ''}
												min={sliderMin}
												max={realMax}
												onChange={e => {
													const v = e.target.value === '' ? null : Number(e.target.value);
													setPriceMax(v);
												}}
											/>
										</div>
									</div>
									<input
										type="range"
										className="price-slider"
										min={realMin}
										max={realMax}
										step={1000}
										value={sliderMax}
										onChange={e => setPriceMax(Number(e.target.value))}
									/>
									<div className="price-range-labels">
										<span>₦{realMin.toLocaleString()}</span>
										<span>₦{realMax.toLocaleString()}</span>
									</div>
								</FilterSection>

								<FilterSection
									id="facilities"
									title="Facilities"
									subtitle="Onboard amenities"
									openSections={openSections}
									toggleSection={toggleSection}
									badge={facilities.length}
								>
									<ul className="filter-list">
										{FACILITY_OPTIONS.map(f => (
											<li key={f.id}>
												<label className="filter-check">
													<input
														type="checkbox"
														checked={facilities.includes(f.id)}
														onChange={() => toggleFac(f.id)}
													/>
													<span className="filter-check-box"></span>
													<span className="filter-check-label">
														<i className={`bi ${f.icon} me-2 text-muted`}></i>
														{f.label}
													</span>
												</label>
											</li>
										))}
									</ul>
								</FilterSection>

								<FilterSection
									id="airlines"
									title="Airlines"
									subtitle={`${airlineRows.length} available`}
									openSections={openSections}
									toggleSection={toggleSection}
									badge={airlines.length}
								>
									{airlines.length > 0 && (
										<button
											type="button"
											onClick={() => setAirlines([])}
											className="filter-inline-reset"
										>
											Reset airlines
										</button>
									)}
									<ul className="airline-list">
										{airlineRows.length === 0 && !loading && (
											<li className="text-muted small">No airlines to show</li>
										)}
										{airlineRows.map((a, i) => {
											const checked = airlines.includes(a.code);
											return (
												<li key={a.code}>
													<label className={`airline-row ${checked ? 'is-checked' : ''}`}>
														<input
															type="checkbox"
															checked={checked}
															onChange={() => toggleAirline(a.code)}
														/>
														<span className="filter-check-box"></span>
														<img
															src={logoFor(a.code)}
															onError={(e) => { e.currentTarget.src = fallbackLogos[i % fallbackLogos.length]; }}
															className="airline-logo"
															alt={a.name}
														/>
														<span className="airline-name">{a.name}</span>
														<span className="airline-price">
															₦{a.price.toLocaleString()}
														</span>
													</label>
												</li>
											);
										})}
									</ul>
								</FilterSection>

							</div>
						</div>
					</Col>

					{/* ============== RESULTS ============== */}
					<div className="col-xl-9 col-lg-8 col-md-12">

						<div className="row align-items-center justify-content-between">
							<div className="col-xl-4 col-lg-4 col-md-4">
								<h5 className="fw-bold fs-6 mb-lg-0 mb-3">
									{loading ? 'Searching flights…' : `${filtered.length} flights found`}
								</h5>
							</div>
							<div className="col-xl-8 col-lg-8 col-md-12">
								<div className="d-flex align-items-center justify-content-start justify-content-lg-end flex-wrap">
									<div className="flsx-first me-2">
										<div className="bg-white rounded py-2 px-3">
											<div className="form-check form-switch">
												<input className="form-check-input" type="checkbox" role="switch" id="mapoption" />
												<label className="form-check-label ms-1" htmlFor="mapoption">Map</label>
											</div>
										</div>
									</div>
									<div className="flsx-first mt-sm-0 mt-2">
										<ul className="nav nav-pills nav-fill p-1 small lights blukker bg-primary rounded-2 shadow-sm"
											id="filtersblocks" role="tablist">
											{[
												{ id: 'trending',    label: 'Our Trending' },
												{ id: 'mostpopular', label: 'Most Popular' },
												{ id: 'lowprice',    label: 'Lowest Price' },
											].map(s => (
												<li className="nav-item" role="presentation" key={s.id}>
													<button
														type="button"
														className={`nav-link rounded-1 ${sort === s.id ? 'active' : ''}`}
														onClick={() => { setSort(s.id); setPage(1); }}
													>{s.label}</button>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div className="row align-items-center g-4 mt-2">

							<div className="col-xl-12 col-md-12">
								<div className="fare-calendar" id="fareCalendar"></div>
							</div>

							{loading && (
								<div className="col-12 text-center py-5">
									<Spinner animation="border" variant="primary" />
									<p className="text-muted mt-3 mb-0">Fetching the best fares…</p>
								</div>
							)}

							{!loading && error && (
								<div className="col-12">
									<div className="alert alert-danger mb-0">{error}</div>
								</div>
							)}

							{!loading && !error && !hasSearch && (
								<div className="col-12">
									<div className="alert alert-info mb-0">
										Start a search from the home page to see available flights.
									</div>
								</div>
							)}

							{!loading && !error && hasSearch && filtered.length === 0 && (
								<div className="col-12">
									<div className="alert alert-warning mb-0">
										No flights match your filters. Try widening the price range or clearing filters.
									</div>
								</div>
							)}

							{!loading && !error && paged.map((offer) => (
								<FlightCard
									key={offer.id}
									offer={offer}
									onSelect={onSelect}
									travelers={travelers}
								/>
							))}

							{!loading && filtered.length > PAGE_SIZE && (
								<div className="col-xl-12 col-lg-12 col-12">
									<div className="pags py-3">
										<nav aria-label="Flight results pagination">
											<ul className="pagination">
												<li className={`page-item ${safePage === 1 ? 'disabled' : ''}`}>
													<button
														type="button"
														className="page-link"
														aria-label="Previous"
														onClick={() => setPage(p => Math.max(1, p - 1))}
													>
														<i className="fa-solid fa-arrow-left-long"></i>
													</button>
												</li>

												{(() => {
													const items = [];
													const WINDOW = 1;
													const push = (n) => items.push(
														<li key={n} className={`page-item ${safePage === n ? 'active' : ''}`}>
															<button type="button" className="page-link" onClick={() => setPage(n)}>
																{n}
															</button>
														</li>
													);
													const pushEllipsis = (key) => items.push(
														<li key={key} className="page-item disabled">
															<span className="page-link border-0 bg-transparent">…</span>
														</li>
													);

													const pages = new Set([1, pageCount, safePage]);
													for (let d = 1; d <= WINDOW; d++) {
														if (safePage - d >= 1) pages.add(safePage - d);
														if (safePage + d <= pageCount) pages.add(safePage + d);
													}
													const sorted = [...pages].sort((a, b) => a - b);

													let prev = 0;
													sorted.forEach((n) => {
														if (prev && n - prev > 1) pushEllipsis(`gap-${prev}`);
														push(n);
														prev = n;
													});
													return items;
												})()}

												<li className={`page-item ${safePage === pageCount ? 'disabled' : ''}`}>
													<button
														type="button"
														className="page-link"
														aria-label="Next"
														onClick={() => setPage(p => Math.min(pageCount, p + 1))}
													>
														<i className="fa-solid fa-arrow-right-long"></i>
													</button>
												</li>
											</ul>
										</nav>
									</div>
								</div>
							)}

						</div>
					</div>

				</Row>
			</Container>
		</section>
	);
};

export default MainConent;