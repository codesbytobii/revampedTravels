import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Modal as BsModal } from 'react-bootstrap';
import AdminPageShell from '../../components/Admin/AdminPageShell';
import { getToken } from '../../utils/auth';

/* 🔧 Real API base */
const BASE_URL = 'https://test-travels.maypaspace.com/api';

/* ---------------- Helpers ---------------- */
const formatDate = (dateString) => {
	if (!dateString) return '—';
	try {
		return new Date(dateString).toLocaleDateString('en-GB', {
			day: '2-digit', month: 'short', year: 'numeric',
		});
	} catch {
		return dateString;
	}
};

const pnrOf = (flight) =>
	flight?.associated_records?.[0]?.pnr ??
	flight?.associated_records?.pnr ??
	flight?.pnr ??
	'';

const STATUS_PILL = (status) => {
	const s = (status || '').toLowerCase();
	if (s === 'done' || s === 'ticketed') return 'dash-status dash-status--paid';
	if (s === 'pending')                 return 'dash-status dash-status--pending';
	return 'dash-status dash-status--refunded';
};

/* ---------- CSV helpers ---------- */
const toCSV = (rows, columns) => {
	const escape = (val) => {
		if (val == null) return '';
		const s = String(val);
		if (/[",\n\r]/.test(s) || /^\s|\s$/.test(s)) {
			return `"${s.replace(/"/g, '""')}"`;
		}
		return s;
	};

	const header = columns.map(c => escape(c.label)).join(',');
	const body = rows
		.map(row => columns.map(c => escape(c.get(row))).join(','))
		.join('\n');

	return `${header}\n${body}`;
};

const downloadCSV = (filename, csv) => {
	const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};

/* ---------- Fetch every page of flights ---------- */
const fetchAllFlights = async () => {
	const token = getToken();
	if (!token) throw new Error('Not authenticated.');

	const headers = {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
	};

	// First page: also gives us the paginator metadata (if the API paginates)
	const first = await axios.get(`${BASE_URL}/get/flights/booked`, { headers });
	const firstPayload = first?.data?.data ?? first?.data ?? [];
	const firstList = Array.isArray(firstPayload)
		? firstPayload
		: Array.isArray(firstPayload?.data)
			? firstPayload.data
			: [];

	const totalPages =
		first?.data?.last_page ??
		first?.data?.meta?.last_page ??
		firstPayload?.last_page ??
		1;

	if (totalPages <= 1) return firstList;

	// Fetch remaining pages in parallel — silently skip any page that fails
	const rest = await Promise.all(
		Array.from({ length: totalPages - 1 }, (_, i) =>
			axios
				.get(`${BASE_URL}/get/flights/booked?page=${i + 2}`, { headers })
				.then(res => {
					const p = res?.data?.data ?? res?.data ?? [];
					return Array.isArray(p) ? p : Array.isArray(p?.data) ? p.data : [];
				})
				.catch(() => [])
		)
	);

	return [...firstList, ...rest.flat()];
};

/* ================= PAGE ================= */
const FlightData = () => {
	const [flights, setFlights] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [search, setSearch] = useState('');

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedFlight, setSelectedFlight] = useState(null);
	const [confirming, setConfirming] = useState(false);
	const [modalError, setModalError] = useState('');

	const [exporting, setExporting] = useState(false);

	/* ---------- Fetch ---------- */
	useEffect(() => {
		let cancelled = false;

		const fetchFlights = async () => {
			setLoading(true);
			setError('');
			try {
				const token = getToken();
				if (!token) throw new Error('Not authenticated.');

				const res = await axios.get(`${BASE_URL}/get/flights/booked`, {
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
					},
				});

				const payload = res?.data?.data ?? res?.data ?? [];
				const list =
					Array.isArray(payload) ? payload :
					Array.isArray(payload?.data) ? payload.data :
					[];

				if (!cancelled) setFlights(list);
			} catch (err) {
				if (!cancelled) {
					setError(err?.response?.data?.message || 'Failed to fetch flights.');
					setFlights([]);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		fetchFlights();
		return () => { cancelled = true; };
	}, []);

	/* ---------- Derived ---------- */
	const filtered = useMemo(() => {
		if (!search.trim()) return flights;
		const q = search.toLowerCase();
		return flights.filter(f => {
			const pnr = pnrOf(f);
			return (
				String(f.reference || '').toLowerCase().includes(q) ||
				String(f.flightNumber || '').toLowerCase().includes(q) ||
				String(f.airline || '').toLowerCase().includes(q) ||
				String(pnr).toLowerCase().includes(q)
			);
		});
	}, [flights, search]);

	/* ---------- Ticket modal ---------- */
	const openTicketModal = (flight) => {
		setSelectedFlight(flight);
		setModalError('');
		setModalOpen(true);
	};

	const closeTicketModal = () => {
		if (confirming) return;
		setModalOpen(false);
		setSelectedFlight(null);
		setModalError('');
	};

	const confirmIssueTicket = async () => {
		if (!selectedFlight) return;

		const token = getToken();
		if (!token) {
			setModalError('You are not logged in.');
			return;
		}

		setConfirming(true);
		setModalError('');

		try {
			await axios.post(
				`${BASE_URL}/flight/ticket`,
				{ reference: selectedFlight.reference },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
					},
				}
			);

			// Optimistically update the row
			setFlights(prev =>
				prev.map(f =>
					f.id === selectedFlight.id ? { ...f, ticket_status: 'done' } : f
				)
			);

			setConfirming(false);
			setModalOpen(false);
			setSelectedFlight(null);
		} catch (err) {
			setConfirming(false);
			setModalError(err?.response?.data?.message || 'Failed to issue ticket.');
		}
	};

	/* ---------- Export CSV (all pages) ---------- */
	const handleExport = async () => {
		if (exporting) return;
		setExporting(true);

		try {
			const all = await fetchAllFlights();

			// If a search is active, apply the same filter to the full dataset
			const rows = search.trim()
				? all.filter(f => {
					const q = search.toLowerCase();
					const pnr = pnrOf(f);
					return (
						String(f.reference || '').toLowerCase().includes(q) ||
						String(f.flightNumber || '').toLowerCase().includes(q) ||
						String(f.airline || '').toLowerCase().includes(q) ||
						String(pnr).toLowerCase().includes(q)
					);
				})
				: all;

			if (rows.length === 0) return;

			const columns = [
				{ label: 'ID',          get: r => r.id },
				{ label: 'Reference',   get: r => r.reference },
				{ label: 'PNR',         get: r => pnrOf(r) },
				{ label: 'Airline',     get: r => r.airline },
				{ label: 'Flight no.',  get: r => r.flightNumber },
				{ label: 'Departure',   get: r => r.departureTime || r.departure },
				{ label: 'Arrival',     get: r => r.arrivalTime || r.arrival },
				{ label: 'Status',      get: r => r.ticket_status },
				{ label: 'Created',     get: r => r.created_at },
			];

			const csv = toCSV(rows, columns);
			const stamp = new Date().toISOString().slice(0, 10);
			downloadCSV(`flights-${stamp}.csv`, csv);
		} catch (err) {
			console.error('Export failed:', err);
		} finally {
			setExporting(false);
		}
	};

	/* ---------- Render ---------- */
	return (
		<AdminPageShell
			eyebrow="Records"
			title="Flight data"
			subtitle="Booked flights that still need ticketing."
			actions={
				<button
					type="button"
					className="dash-btn dash-btn--ghost"
					onClick={handleExport}
					disabled={loading || exporting || flights.length === 0}
				>
					{exporting ? (
						<>
							<span className="spinner-border spinner-border-sm me-2" role="status" />
							Exporting…
						</>
					) : (
						<>
							<i className="bi bi-download me-2"></i>Export CSV
						</>
					)}
				</button>
			}
		>
			<div className="admin-card">
				<div className="admin-card-head">
					<h3 className="admin-card-title">Booked flights</h3>

					<div className="admin-card-tools">
						<input
							type="search"
							className="admin-inline-search"
							placeholder="Search reference, PNR, airline…"
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
						<span className="dash-muted">{filtered.length} flights</span>
					</div>
				</div>

				{error && <div className="alert alert-danger mb-3">{error}</div>}

				{loading ? (
					<div className="admin-table-loading">
						<div className="spinner-border text-danger" role="status" />
						<p className="mt-3 mb-0 text-muted">Loading flights…</p>
					</div>
				) : filtered.length === 0 ? (
					<div className="admin-empty">
						<div className="admin-empty-icon">
							<i className="bi bi-airplane"></i>
						</div>
						<h3 className="admin-empty-title">No booked flights</h3>
						<p className="admin-empty-sub">
							{search
								? 'Try a different search term.'
								: 'Bookings with pending ticketing will show up here.'}
						</p>
					</div>
				) : (
					<div className="dash-table-wrap">
						<table className="dash-table">
							<thead>
								<tr>
									<th style={{ width: 140 }}>Reference</th>
									<th style={{ width: 120 }}>PNR</th>
									<th>Airline</th>
									<th style={{ width: 120 }}>Flight no.</th>
									<th style={{ width: 120 }}>Status</th>
									<th style={{ width: 180 }}></th>
								</tr>
							</thead>
							<tbody>
								{filtered.map(f => {
									const pnr = pnrOf(f) || '—';
									const isDone =
										String(f.ticket_status || '').toLowerCase() === 'done' ||
										String(f.ticket_status || '').toLowerCase() === 'ticketed';

									return (
										<tr key={f.id}>
											<td className="dash-table-id">{f.reference}</td>
											<td>{pnr}</td>
											<td className="dash-table-route">{f.airline || '—'}</td>
											<td>{f.flightNumber || '—'}</td>
											<td>
												<span className={STATUS_PILL(f.ticket_status)}>
													{f.ticket_status || 'pending'}
												</span>
											</td>
											<td>
												{isDone ? (
													<span className="fd-done">
														<i className="bi bi-check-circle-fill me-1"></i>Ticketed
													</span>
												) : (
													<button
														type="button"
														className="dash-btn dash-btn--solid fd-issue-btn"
														onClick={() => openTicketModal(f)}
													>
														<i className="bi bi-ticket-perforated me-2"></i>
														Issue ticket
													</button>
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>

			{/* ---------- Issue ticket modal ---------- */}
			<BsModal
				show={modalOpen}
				onHide={closeTicketModal}
				centered
				className="admin-modal"
				backdrop={confirming ? 'static' : true}
				keyboard={!confirming}
			>
				<BsModal.Header closeButton={!confirming}>
					<div>
						<h5 className="admin-modal-title">Issue ticket</h5>
						<p className="admin-modal-sub">
							This will ticket the booking and cannot be undone.
						</p>
					</div>
				</BsModal.Header>

				<BsModal.Body>
					{modalError && (
						<div className="alert alert-danger py-2 px-3 small mb-3">{modalError}</div>
					)}

					<div className="fd-confirm">
						<p className="fd-confirm-lead">
							Are you sure you want to issue a ticket for{' '}
							<strong>flight {selectedFlight?.reference}</strong>?
						</p>

						{selectedFlight && (
							<div className="fd-confirm-summary">
								<div className="fd-confirm-row">
									<span className="fd-confirm-label">Reference</span>
									<span className="fd-confirm-value">{selectedFlight.reference}</span>
								</div>
								<div className="fd-confirm-row">
									<span className="fd-confirm-label">PNR</span>
									<span className="fd-confirm-value">{pnrOf(selectedFlight) || '—'}</span>
								</div>
								<div className="fd-confirm-row">
									<span className="fd-confirm-label">Airline</span>
									<span className="fd-confirm-value">{selectedFlight.airline || '—'}</span>
								</div>
								<div className="fd-confirm-row">
									<span className="fd-confirm-label">Flight no.</span>
									<span className="fd-confirm-value">{selectedFlight.flightNumber || '—'}</span>
								</div>
							</div>
						)}

						<div className="admin-form-actions">
							<button
								type="button"
								className="dash-btn dash-btn--ghost"
								onClick={closeTicketModal}
								disabled={confirming}
							>
								Cancel
							</button>
							<button
								type="button"
								className="dash-btn dash-btn--solid"
								onClick={confirmIssueTicket}
								disabled={confirming}
							>
								{confirming ? (
									<>
										<span className="spinner-border spinner-border-sm me-2" role="status" />
										Confirming…
									</>
								) : (
									<>
										<i className="bi bi-check2 me-2"></i>
										Confirm
									</>
								)}
							</button>
						</div>
					</div>
				</BsModal.Body>
			</BsModal>
		</AdminPageShell>
	);
};

export default FlightData;