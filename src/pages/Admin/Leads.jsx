import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
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

const fullName = (lead) => {
	const f = lead.user_first_name || '';
	const l = lead.user_last_name || '';
	const name = `${f} ${l}`.trim();
	return name || '—';
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

/* ---------- Fetch every page ---------- */
const fetchAllLeads = async () => {
	const token = getToken();
	if (!token) throw new Error('Not authenticated.');

	const headers = {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
	};

	const first = await axios.get(`${BASE_URL}/admin/enquiries/all?page=1`, { headers });
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

	const rest = await Promise.all(
		Array.from({ length: totalPages - 1 }, (_, i) =>
			axios
				.get(`${BASE_URL}/admin/enquiries/all?page=${i + 2}`, { headers })
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
const Leads = () => {
	const [leads, setLeads] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [search, setSearch] = useState('');
	const [exporting, setExporting] = useState(false);

	/* ---------- Fetch ---------- */
	useEffect(() => {
		let cancelled = false;

		const run = async () => {
			setLoading(true);
			setError('');
			try {
				const token = getToken();
				if (!token) throw new Error('Not authenticated.');

				const res = await axios.get(`${BASE_URL}/admin/enquiries/all?page=${page}`, {
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

				const totalPages =
					res?.data?.last_page ??
					res?.data?.meta?.last_page ??
					payload?.last_page ??
					1;

				if (!cancelled) {
					setLeads(list);
					setLastPage(totalPages);
				}
			} catch (err) {
				if (!cancelled) {
					setError(err?.response?.data?.message || 'Failed to fetch leads.');
					setLeads([]);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		run();
		return () => { cancelled = true; };
	}, [page]);

	/* ---------- Derived ---------- */
	const filtered = useMemo(() => {
		if (!search.trim()) return leads;
		const q = search.toLowerCase();
		return leads.filter(l => {
			const fields = [
				l.title,
				l.excerpt,
				l.advert_destination,
				l.user_first_name,
				l.user_last_name,
				l.user_email,
				l.user_phone,
			];
			return fields.some(v => String(v || '').toLowerCase().includes(q));
		});
	}, [leads, search]);

	/* ---------- Export (all pages) ---------- */
	const handleExport = async () => {
		if (exporting) return;
		setExporting(true);

		try {
			const all = await fetchAllLeads();

			const rows = search.trim()
				? all.filter(l => {
					const q = search.toLowerCase();
					return [
						l.title,
						l.excerpt,
						l.advert_destination,
						l.user_first_name,
						l.user_last_name,
						l.user_email,
						l.user_phone,
					].some(v => String(v || '').toLowerCase().includes(q));
				})
				: all;

			if (rows.length === 0) return;

			const columns = [
				{ label: 'ID',          get: r => r.id },
				{ label: 'Title',       get: r => r.title },
				{ label: 'Excerpt',     get: r => r.excerpt },
				{ label: 'Destination', get: r => r.advert_destination },
				{ label: 'First name',  get: r => r.user_first_name },
				{ label: 'Last name',   get: r => r.user_last_name },
				{ label: 'Email',       get: r => r.user_email },
				{ label: 'Phone',       get: r => r.user_phone },
				{ label: 'Travel date', get: r => r.user_travel_date },
				{ label: 'Return date', get: r => r.user_return_date },
			];

			const csv = toCSV(rows, columns);
			const stamp = new Date().toISOString().slice(0, 10);
			downloadCSV(`leads-${stamp}.csv`, csv);
		} catch (err) {
			console.error('Export failed:', err);
		} finally {
			setExporting(false);
		}
	};

	/* ---------- Pagination ---------- */
	const goPrev = () => setPage(p => Math.max(1, p - 1));
	const goNext = () => setPage(p => Math.min(lastPage, p + 1));

	/* ---------- Render ---------- */
	return (
		<AdminPageShell
			eyebrow="Sales"
			title="Leads"
			subtitle="Enquiries and follow-ups from potential customers."
			actions={
				<button
					type="button"
					className="dash-btn dash-btn--ghost"
					onClick={handleExport}
					disabled={loading || exporting || leads.length === 0}
				>
					{exporting ? (
						<>
							<span className="spinner-border spinner-border-sm me-2" role="status" />
							Exporting…
						</>
					) : (
						<>
							<i className="bi bi-download me-2"></i>Export
						</>
					)}
				</button>
			}
		>
			<div className="admin-card">
				<div className="admin-card-head">
					<h3 className="admin-card-title">Advert leads</h3>

					<div className="admin-card-tools">
						<input
							type="search"
							className="admin-inline-search"
							placeholder="Search name, email, phone…"
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
						<span className="dash-muted">{filtered.length} shown</span>
					</div>
				</div>

				{error && <div className="alert alert-danger mb-3">{error}</div>}

				{loading ? (
					<div className="admin-table-loading">
						<div className="spinner-border text-danger" role="status" />
						<p className="mt-3 mb-0 text-muted">Loading leads…</p>
					</div>
				) : filtered.length === 0 ? (
					<div className="admin-empty">
						<div className="admin-empty-icon">
							<i className="bi bi-person-lines-fill"></i>
						</div>
						<h3 className="admin-empty-title">No leads captured yet</h3>
						<p className="admin-empty-sub">
							{search
								? 'Try a different search term.'
								: 'Contact form submissions and enquiries will land here.'}
						</p>
					</div>
				) : (
					<>
						<div className="dash-table-wrap">
							<table className="dash-table leads-table">
								<thead>
									<tr>
										<th style={{ minWidth: 160 }}>Title</th>
										<th style={{ minWidth: 180 }}>Excerpt</th>
										<th style={{ minWidth: 130 }}>Destination</th>
										<th style={{ minWidth: 130 }}>Name</th>
										<th style={{ minWidth: 180 }}>Email</th>
										<th style={{ minWidth: 130 }}>Phone</th>
										<th style={{ minWidth: 130 }}>Travel date</th>
										<th style={{ minWidth: 130 }}>Return date</th>
									</tr>
								</thead>
								<tbody>
									{filtered.map(lead => (
										<tr key={lead.id}>
											<td className="dash-table-route" title={lead.title}>
												{lead.title || '—'}
											</td>
											<td className="lead-excerpt" title={lead.excerpt}>
												{lead.excerpt || '—'}
											</td>
											<td>
												{lead.advert_destination ? (
													<span className="dash-status dash-status--refunded">
														{lead.advert_destination}
													</span>
												) : '—'}
											</td>
											<td>{fullName(lead)}</td>
											<td>
												{lead.user_email ? (
													<a href={`mailto:${lead.user_email}`} className="lead-link">
														{lead.user_email}
													</a>
												) : '—'}
											</td>
											<td>
												{lead.user_phone ? (
													<a href={`tel:${lead.user_phone}`} className="lead-link">
														{lead.user_phone}
													</a>
												) : '—'}
											</td>
											<td className="dash-table-when">
												{formatDate(lead.user_travel_date)}
											</td>
											<td className="dash-table-when">
												{formatDate(lead.user_return_date)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{lastPage > 1 && (
							<div className="admin-pagination">
								<button
									type="button"
									className="admin-pagination-btn"
									disabled={page <= 1}
									onClick={goPrev}
								>
									<i className="bi bi-chevron-left"></i> Prev
								</button>

								<span className="admin-pagination-info">
									Page <strong>{page}</strong> of <strong>{lastPage}</strong>
								</span>

								<button
									type="button"
									className="admin-pagination-btn"
									disabled={page >= lastPage}
									onClick={goNext}
								>
									Next <i className="bi bi-chevron-right"></i>
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</AdminPageShell>
	);
};

export default Leads;