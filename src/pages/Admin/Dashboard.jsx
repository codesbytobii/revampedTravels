import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AdminPageShell from '../../components/Admin/AdminPageShell';
import { getToken } from '../../utils/auth';

/* 🔧 Real API base */
const BASE_URL = 'https://test-travels.maypaspace.com/api';

/* =========================================================
   Date range helpers
   ========================================================= */
const startOfDay = (d) => {
	const x = new Date(d);
	x.setHours(0, 0, 0, 0);
	return x;
};

const endOfDay = (d) => {
	const x = new Date(d);
	x.setHours(23, 59, 59, 999);
	return x;
};

const RANGE_PRESETS = [
	{ key: 'today',   label: 'Today' },
	{ key: 'week',    label: 'This week' },
	{ key: 'month',   label: 'This month' },
	{ key: 'quarter', label: 'This quarter' },
	{ key: 'year',    label: 'This year' },
	{ key: 'all',     label: 'All time' },
	{ key: 'custom',  label: 'Custom' },
];

/* Return { from, to } Date objects for a preset, or null for 'all' */
const getRange = (preset, customFrom, customTo) => {
	const now = new Date();

	if (preset === 'all') return null;

	if (preset === 'custom') {
		if (!customFrom || !customTo) return null;
		return { from: startOfDay(customFrom), to: endOfDay(customTo) };
	}

	if (preset === 'today') {
		return { from: startOfDay(now), to: endOfDay(now) };
	}

	if (preset === 'week') {
		// Monday → today
		const d = new Date(now);
		const day = d.getDay() || 7; // Sunday=7
		d.setDate(d.getDate() - (day - 1));
		return { from: startOfDay(d), to: endOfDay(now) };
	}

	if (preset === 'month') {
		return {
			from: startOfDay(new Date(now.getFullYear(), now.getMonth(), 1)),
			to: endOfDay(now),
		};
	}

	if (preset === 'quarter') {
		const q = Math.floor(now.getMonth() / 3);
		return {
			from: startOfDay(new Date(now.getFullYear(), q * 3, 1)),
			to: endOfDay(now),
		};
	}

	if (preset === 'year') {
		return {
			from: startOfDay(new Date(now.getFullYear(), 0, 1)),
			to: endOfDay(now),
		};
	}

	return null;
};

const inRange = (iso, range) => {
	if (!iso) return false;
	if (!range) return true; // 'all'
	const t = new Date(iso).getTime();
	return t >= range.from.getTime() && t <= range.to.getTime();
};

const rangeLabel = (range) => {
	if (!range) return 'All time';
	const fmt = (d) => d.toLocaleDateString('en-GB', {
		day: '2-digit', month: 'short', year: 'numeric',
	});
	return `${fmt(range.from)} – ${fmt(range.to)}`;
};

/* =========================================================
   Formatting helpers
   ========================================================= */
const formatNaira = (n) => {
	const num = Number(n);
	if (!Number.isFinite(num)) return '₦0';
	try {
		return new Intl.NumberFormat('en-NG', {
			style: 'currency', currency: 'NGN', maximumFractionDigits: 0,
		}).format(num);
	} catch {
		return `₦${Math.round(num).toLocaleString()}`;
	}
};

const formatCompact = (n) => {
	const num = Number(n) || 0;
	if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
	if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
	return String(num);
};

const relativeTime = (iso) => {
	if (!iso) return '';
	const diff = Date.now() - new Date(iso).getTime();
	const m = Math.floor(diff / 60000);
	if (m < 1) return 'just now';
	if (m < 60) return `${m} min ago`;
	const h = Math.floor(m / 60);
	if (h < 24) return `${h} hr ago`;
	const d = Math.floor(h / 24);
	return `${d} day${d > 1 ? 's' : ''} ago`;
};

/* =========================================================
   Fetch helpers
   ========================================================= */
const authHeaders = () => {
	const token = getToken();
	return {
		Authorization: token ? `Bearer ${token}` : undefined,
		Accept: 'application/json',
	};
};

const safeGet = async (url, config = {}) => {
	try {
		const res = await fetch(url, {
			...config,
			headers: { ...authHeaders(), ...(config.headers || {}) },
		});
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
};

const asList = (payload) =>
	Array.isArray(payload) ? payload :
	Array.isArray(payload?.data?.data) ? payload.data.data :
	Array.isArray(payload?.data) ? payload.data :
	Array.isArray(payload?.reviews?.data) ? payload.reviews.data :
	Array.isArray(payload?.users?.data) ? payload.users.data :
	[];

/* =========================================================
   Page
   ========================================================= */
const Dashboard = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const [bookings, setBookings] = useState([]);
	const [leads, setLeads] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [users, setUsers] = useState([]);
	const [categories, setCategories] = useState([]);
	const [adverts, setAdverts] = useState([]);
	const [markups, setMarkups] = useState([]);

	// Global date filter
	const [preset, setPreset] = useState('month');
	const [customFrom, setCustomFrom] = useState('');
	const [customTo, setCustomTo] = useState('');

	const range = useMemo(
		() => getRange(preset, customFrom, customTo),
		[preset, customFrom, customTo]
	);

	// Quick search
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [departure, setDeparture] = useState('');

	/* ---------- Fetch on mount ---------- */
	useEffect(() => {
		let cancelled = false;

		const run = async () => {
			setLoading(true);
			setError('');

			try {
				const [
					bookingsRes, leadsRes, reviewsRes,
					usersRes, categoriesRes, advertsRes, markupsRes,
				] = await Promise.all([
					safeGet(`${BASE_URL}/get/flights/booked`),
					safeGet(`${BASE_URL}/admin/enquiries/all?page=1`),
					safeGet(`${BASE_URL}/reviews/all`),
					safeGet(`${BASE_URL}/users/all?page=1`),
					safeGet(`${BASE_URL}/admin/blog/categories`),
					safeGet(`${BASE_URL}/admin/get/advertisements`),
					safeGet(`${BASE_URL}/markup/home`),
				]);

				if (cancelled) return;

				setBookings(asList(bookingsRes));
				setLeads(asList(leadsRes));
				setReviews(asList(reviewsRes));
				setUsers(asList(usersRes));
				setCategories(asList(categoriesRes));
				setAdverts(asList(advertsRes));
				setMarkups(asList(markupsRes));
			} catch {
				if (!cancelled) setError('Could not load dashboard data.');
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		run();
		return () => { cancelled = true; };
	}, []);

	/* ---------- Revenue helper ---------- */
	const revenueOf = (b) =>
		Number(
			b?.price?.ffsd_total ??
			b?.price?.grandTotal ??
			b?.price?.total ??
			b?.amount ??
			b?.total_price ??
			0
		);

	/* ---------- Filtered datasets (per current range) ---------- */
	const filteredBookings = useMemo(
		() => bookings.filter(b => inRange(b.created_at || b.updated_at, range)),
		[bookings, range]
	);

	const filteredLeads = useMemo(
		() => leads.filter(l => inRange(l.created_at, range)),
		[leads, range]
	);

	const filteredReviews = useMemo(
		() => reviews.filter(r => inRange(r.created_at, range)),
		[reviews, range]
	);

	/* ---------- KPIs ---------- */
	const totalRevenue = useMemo(
		() => filteredBookings.reduce((sum, b) => sum + revenueOf(b), 0),
		[filteredBookings]
	);

	const pendingTickets = useMemo(
		() => filteredBookings.filter(b => {
			const s = String(b.ticket_status || '').toLowerCase();
			return s !== 'done' && s !== 'ticketed';
		}).length,
		[filteredBookings]
	);

	const pendingReviews = useMemo(
		() => filteredReviews.filter(r => String(r.status || '').toLowerCase() === 'pending').length,
		[filteredReviews]
	);

	const avgRating = useMemo(() => {
		if (!filteredReviews.length) return 0;
		const total = filteredReviews.reduce((sum, r) => sum + Number(r.rating || 0), 0);
		return total / filteredReviews.length;
	}, [filteredReviews]);

	/* Previous-period comparison for the two main KPIs (Bookings + Revenue) */
	const previousRange = useMemo(() => {
		if (!range) return null;
		const spanMs = range.to.getTime() - range.from.getTime();
		return {
			from: new Date(range.from.getTime() - spanMs - 1),
			to: new Date(range.from.getTime() - 1),
		};
	}, [range]);

	const previousBookings = useMemo(() => {
		if (!previousRange) return [];
		return bookings.filter(b => inRange(b.created_at || b.updated_at, previousRange));
	}, [bookings, previousRange]);

	const previousRevenue = useMemo(
		() => previousBookings.reduce((sum, b) => sum + revenueOf(b), 0),
		[previousBookings]
	);

	const pctChange = (current, previous) => {
		if (previous === 0) return current === 0 ? 0 : 100;
		return ((current - previous) / previous) * 100;
	};

	const bookingsDelta = pctChange(filteredBookings.length, previousBookings.length);
	const revenueDelta = pctChange(totalRevenue, previousRevenue);

	/* ---------- Recent bookings (top 5 in range) ---------- */
	const recentBookings = useMemo(() => {
		return [...filteredBookings]
			.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
			.slice(0, 5);
	}, [filteredBookings]);

	/* ---------- Top routes (in range) ---------- */
	const topRoutes = useMemo(() => {
		const counts = new Map();

		filteredBookings.forEach(b => {
			const route =
				b?.route ||
				(b?.itineraries?.[0]?.segments?.[0]?.departure?.iataCode
					&& b?.itineraries?.[0]?.segments?.[0]?.arrival?.iataCode
					? `${b.itineraries[0].segments[0].departure.iataCode} → ${b.itineraries[0].segments[0].arrival.iataCode}`
					: null) ||
				(b?.origin && b?.destination ? `${b.origin} → ${b.destination}` : null) ||
				'—';
			counts.set(route, (counts.get(route) || 0) + 1);
		});

		const arr = [...counts.entries()]
			.map(([route, count]) => ({ route, count }))
			.sort((a, b) => b.count - a.count)
			.slice(0, 5);

		const max = arr[0]?.count || 1;
		return arr.map(r => ({ ...r, share: Math.round((r.count / max) * 100) }));
	}, [filteredBookings]);

	/* ---------- Activity (in range) ---------- */
	const activity = useMemo(() => {
		const events = [];

		recentBookings.forEach(b => {
			events.push({
				id: `bk-${b.id}`,
				icon: 'bi-ticket-perforated',
				tone: 'primary',
				text: `Booking ${b.reference || `#${b.id}`} created`,
				when: b.created_at || b.updated_at,
			});
		});

		filteredLeads.slice(0, 3).forEach(l => {
			events.push({
				id: `lead-${l.id}`,
				icon: 'bi-person-lines-fill',
				tone: 'success',
				text: `New enquiry from ${l.user_first_name || l.user_name || 'customer'}`,
				when: l.created_at,
			});
		});

		filteredReviews.slice(0, 3).forEach(r => {
			events.push({
				id: `rev-${r.id}`,
				icon: 'bi-chat-square-quote',
				tone: r.status === 'approved' ? 'success'
					: r.status === 'rejected' ? 'danger' : 'warning',
				text: `Review by ${r.user_name || 'customer'} (${r.rating || '?'}★)`,
				when: r.created_at,
			});
		});

		return events
			.filter(e => e.when)
			.sort((a, b) => new Date(b.when) - new Date(a.when))
			.slice(0, 6);
	}, [recentBookings, filteredLeads, filteredReviews]);

	/* ---------- Payments summary (in range) ---------- */
	const payments = useMemo(() => {
		const pendingAmount = filteredBookings
			.filter(b => {
				const s = String(b.ticket_status || '').toLowerCase();
				return s !== 'done' && s !== 'ticketed';
			})
			.reduce((sum, b) => sum + revenueOf(b), 0);

		return {
			collected: totalRevenue,
			pending: pendingAmount,
			refunded: 0, // no source yet
			net: totalRevenue,
		};
	}, [filteredBookings, totalRevenue]);

	/* ---------- All-time totals for context ---------- */
	const allTimeRevenue = useMemo(
		() => bookings.reduce((sum, b) => sum + revenueOf(b), 0),
		[bookings]
	);

	/* ---------- Quick search ---------- */
	const handleSearch = (e) => {
		e.preventDefault();
		if (!from || !to || !departure) return;

		navigate('/admin/flights', {
			state: {
				search: {
					tripType: 'oneway',
					cabin: 'Economy',
					travelers: { adults: 1, children: 0, infants: 0 },
					searches: [{
						origin: from.toUpperCase().slice(0, 3),
						destination: to.toUpperCase().slice(0, 3),
						date: departure,
					}],
				},
			},
		});
	};

	/* ---------- KPI data ---------- */
	const kpis = [
		{
			id: 'bookings',
			label: 'Bookings',
			value: filteredBookings.length,
			delta: bookingsDelta,
			deltaLabel: 'vs previous period',
			icon: 'bi-ticket-perforated',
			tone: 'red',
		},
		{
			id: 'revenue',
			label: 'Revenue',
			value: formatCompact(totalRevenue),
			delta: revenueDelta,
			deltaLabel: 'vs previous period',
			icon: 'bi-currency-exchange',
			tone: 'gold',
		},
		{
			id: 'pending',
			label: 'Pending tickets',
			value: pendingTickets,
			delta: null,
			deltaLabel: `${pendingReviews} pending reviews`,
			icon: 'bi-hourglass-split',
			tone: 'ink',
		},
		{
			id: 'rating',
			label: 'Average rating',
			value: avgRating ? avgRating.toFixed(1) : '—',
			delta: null,
			deltaLabel: `${filteredReviews.length} review${filteredReviews.length !== 1 ? 's' : ''}`,
			icon: 'bi-star',
			tone: 'muted',
		},
	];

	/* ---------- Render ---------- */
	return (
		<AdminPageShell
			eyebrow={new Date().toLocaleDateString('en-GB', {
				weekday: 'long', day: 'numeric', month: 'long',
			})}
			title="Welcome back"
			subtitle="Here's what's happening across your bookings."
			actions={
				<>
					{/* <Link to="/admin/flights" className="dash-btn dash-btn--ghost">
						<i className="bi bi-search me-2"></i>Search flights
					</Link> */}
					<Link to="/admin/flight-data" className="dash-btn dash-btn--solid">
						<i className="bi bi-ticket-perforated me-2"></i>Flight data
					</Link>
				</>
			}
		>
			{/* ---------- Date range filter bar ---------- */}
			<div className="dash-range">
				<div className="dash-range-left">
					<i className="bi bi-calendar3 dash-range-icon" aria-hidden="true"></i>
					<span className="dash-range-label">
						{rangeLabel(range)}
					</span>
				</div>

				<div className="dash-range-presets" role="tablist" aria-label="Date range">
					{RANGE_PRESETS.map(p => (
						<button
							key={p.key}
							type="button"
							role="tab"
							aria-selected={preset === p.key}
							className={`dash-range-btn ${preset === p.key ? 'is-active' : ''}`}
							onClick={() => setPreset(p.key)}
						>
							{p.label}
						</button>
					))}
				</div>

				{preset === 'custom' && (
					<div className="dash-range-custom">
						<input
							type="date"
							className="dash-range-input"
							value={customFrom}
							onChange={e => setCustomFrom(e.target.value)}
							max={customTo || undefined}
						/>
						<span className="dash-range-sep">→</span>
						<input
							type="date"
							className="dash-range-input"
							value={customTo}
							onChange={e => setCustomTo(e.target.value)}
							min={customFrom || undefined}
						/>
					</div>
				)}
			</div>

			{error && <div className="alert alert-danger mb-3">{error}</div>}

			{/* ---------- KPI grid ---------- */}
			<div className="dash-kpis">
				{kpis.map(k => {
					const showDelta = k.delta != null;
					const positive = k.delta >= 0;
					return (
						<div key={k.id} className={`dash-kpi dash-kpi--${k.tone}`}>
							<div className="dash-kpi-top">
								<span className="dash-kpi-label">{k.label}</span>
								<span className="dash-kpi-icon">
									<i className={`bi ${k.icon}`}></i>
								</span>
							</div>
							<div className="dash-kpi-value">
								{loading ? '—' : k.value}
							</div>
							<div className={`dash-kpi-delta ${showDelta ? (positive ? 'is-up' : 'is-down') : ''}`}>
								{showDelta ? (
									<>
										<i className={`bi ${positive ? 'bi-arrow-up-right' : 'bi-arrow-down-right'}`}></i>
										{Math.abs(k.delta).toFixed(1)}%
										<span className="dash-kpi-delta-label">{k.deltaLabel}</span>
									</>
								) : (
									<>
										<i className="bi bi-dot"></i>
										<span className="dash-kpi-delta-label">{k.deltaLabel}</span>
									</>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{/* ---------- Quick search strip ---------- */}
			<div className="admin-card dash-search-card">
				<div className="admin-card-head">
					<h3 className="admin-card-title">Quick flight search</h3>
					<Link to="/admin/flights" className="dash-link">
						Full search <i className="bi bi-arrow-right ms-1"></i>
					</Link>
				</div>

				<Form onSubmit={handleSearch} className="dash-search-form">
					<div className="dash-search-field">
						<label className="dash-label">From</label>
						<input
							type="text"
							className="dash-input"
							placeholder="LOS"
							value={from}
							onChange={e => setFrom(e.target.value)}
						/>
					</div>

					<button
						type="button"
						className="dash-swap"
						aria-label="Swap"
						onClick={() => { const t = from; setFrom(to); setTo(t); }}
					>
						<i className="bi bi-arrow-left-right"></i>
					</button>

					<div className="dash-search-field">
						<label className="dash-label">To</label>
						<input
							type="text"
							className="dash-input"
							placeholder="LHR"
							value={to}
							onChange={e => setTo(e.target.value)}
						/>
					</div>

					<div className="dash-search-field">
						<label className="dash-label">Departure</label>
						<input
							type="date"
							className="dash-input"
							value={departure}
							onChange={e => setDeparture(e.target.value)}
						/>
					</div>

					<button type="submit" className="dash-search-btn">
						<i className="bi bi-search me-2"></i>Search
					</button>
				</Form>
			</div>

			{/* ---------- Recent bookings + Top routes ---------- */}
			<Row className="g-4">
				<Col xl={8} lg={12}>
					<div className="admin-card h-100">
						<div className="admin-card-head">
							<h3 className="admin-card-title">Recent bookings</h3>
							<Link to="/admin/flight-data" className="dash-link">
								View all <i className="bi bi-arrow-right ms-1"></i>
							</Link>
						</div>

						{loading ? (
							<div className="admin-table-loading py-4">
								<div className="spinner-border spinner-border-sm text-danger" role="status" />
							</div>
						) : recentBookings.length === 0 ? (
							<p className="text-muted text-center py-4 mb-0">
								No bookings in this period.
							</p>
						) : (
							<div className="dash-table-wrap">
								<table className="dash-table">
									<thead>
										<tr>
											<th>Reference</th>
											<th>Passenger</th>
											<th>Amount</th>
											<th>Status</th>
											<th>When</th>
										</tr>
									</thead>
									<tbody>
										{recentBookings.map(b => (
											<tr key={b.id}>
												<td className="dash-table-id">{b.reference || `#${b.id}`}</td>
												<td>
													{b.passenger_name ||
														[b.user_first_name, b.user_last_name].filter(Boolean).join(' ') ||
														'—'}
												</td>
												<td className="dash-table-amount">
													{formatNaira(revenueOf(b))}
												</td>
												<td>
													<span className={`dash-status ${
														String(b.ticket_status || '').toLowerCase() === 'done'
															? 'dash-status--paid'
															: 'dash-status--pending'
													}`}>
														{b.ticket_status || 'pending'}
													</span>
												</td>
												<td className="dash-table-when">
													{relativeTime(b.created_at || b.updated_at)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</Col>

				<Col xl={4} lg={12}>
					<div className="admin-card h-100">
						<div className="admin-card-head">
							<h3 className="admin-card-title">Top routes</h3>
							<span className="dash-muted">
								{filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''}
							</span>
						</div>

						{loading ? (
							<div className="admin-table-loading py-4">
								<div className="spinner-border spinner-border-sm text-danger" role="status" />
							</div>
						) : topRoutes.length === 0 ? (
							<p className="text-muted text-center py-4 mb-0">No route data.</p>
						) : (
							<ul className="dash-routes">
								{topRoutes.map(r => (
									<li key={r.route} className="dash-route">
										<div className="dash-route-head">
											<span className="dash-route-name">{r.route}</span>
											<span className="dash-route-count">{r.count}</span>
										</div>
										<div className="dash-route-bar">
											<div className="dash-route-fill" style={{ width: `${r.share}%` }} />
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				</Col>
			</Row>

			{/* ---------- Activity + Payments ---------- */}
			<Row className="g-4 mt-1">
				<Col xl={7} lg={12}>
					<div className="admin-card h-100">
						<div className="admin-card-head">
							<h3 className="admin-card-title">Activity</h3>
							<span className="dash-muted">Live</span>
						</div>

						{loading ? (
							<div className="admin-table-loading py-4">
								<div className="spinner-border spinner-border-sm text-danger" role="status" />
							</div>
						) : activity.length === 0 ? (
							<p className="text-muted text-center py-4 mb-0">
								No activity in this period.
							</p>
						) : (
							<ul className="dash-activity">
								{activity.map(a => (
									<li key={a.id} className="dash-activity-item">
										<span className={`dash-activity-icon dash-activity-icon--${a.tone}`}>
											<i className={`bi ${a.icon}`}></i>
										</span>
										<span className="dash-activity-text">{a.text}</span>
										<span className="dash-activity-when">
											{relativeTime(a.when)}
										</span>
									</li>
								))}
							</ul>
						)}
					</div>
				</Col>

				<Col xl={5} lg={12}>
					<div className="admin-card h-100">
						<div className="admin-card-head">
							<h3 className="admin-card-title">Payments</h3>
							<Link to="/admin/flight-data" className="dash-link">
								Ledger <i className="bi bi-arrow-right ms-1"></i>
							</Link>
						</div>

						<div className="dash-payments">
							<div className="dash-pay-row">
								<span className="dash-pay-label">Collected</span>
								<span className="dash-pay-amount dash-pay-amount--in">
									{formatNaira(payments.collected)}
								</span>
							</div>
							<div className="dash-pay-row">
								<span className="dash-pay-label">Pending clearance</span>
								<span className="dash-pay-amount">
									{formatNaira(payments.pending)}
								</span>
							</div>
							<div className="dash-pay-row">
								<span className="dash-pay-label">Refunded</span>
								<span className="dash-pay-amount dash-pay-amount--out">
									-{formatNaira(payments.refunded)}
								</span>
							</div>
							<hr />
							<div className="dash-pay-row dash-pay-row--total">
								<span className="dash-pay-label">Net in period</span>
								<span className="dash-pay-amount">
									{formatNaira(payments.net)}
								</span>
							</div>
						</div>

						<div className="dash-overview mt-4 pt-3 border-top">
							<div className="dash-overview-row">
								<span className="dash-overview-label">All-time revenue</span>
								<span className="dash-overview-value">
									{formatNaira(allTimeRevenue)}
								</span>
							</div>
							<div className="dash-overview-row">
								<span className="dash-overview-label">Users</span>
								<span className="dash-overview-value">{users.length}</span>
							</div>
							<div className="dash-overview-row">
								<span className="dash-overview-label">Advert categories</span>
								<span className="dash-overview-value">{categories.length}</span>
							</div>
							<div className="dash-overview-row">
								<span className="dash-overview-label">Active adverts</span>
								<span className="dash-overview-value">{adverts.length}</span>
							</div>
							<div className="dash-overview-row">
								<span className="dash-overview-label">Markup rules</span>
								<span className="dash-overview-value">{markups.length}</span>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</AdminPageShell>
	);
};

export default Dashboard;