import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal as BsModal, Row, Col } from 'react-bootstrap';
import AdminPageShell from '../../components/Admin/AdminPageShell';

/* 🔧 Change this to your real API base */
const BASE_URL = 'https://test-travels.maypaspace.com/api';

/* ---------------- Helpers ---------------- */
const formatDate = (dateString) => {
	if (!dateString) return '—';
	const d = new Date(dateString);
	return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getToken = () =>
	localStorage.getItem('authToken') ||
	localStorage.getItem('userToken') ||
	localStorage.getItem('accessToken') ||
	sessionStorage.getItem('authToken') ||
	sessionStorage.getItem('userToken');

/* ================= INLINE FORM ================= */
const EMPTY_FORM = { name: '', guard_name: 'web' };

const PermissionForm = ({ onSubmit, onCancel }) => {
	const [form, setForm] = useState(EMPTY_FORM);
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState('');

	useEffect(() => {
		setForm(EMPTY_FORM);
		setErrors({});
		setServerError('');
	}, []);

	const set = (field, value) => {
		setForm(f => ({ ...f, [field]: value }));
		if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
		if (serverError) setServerError('');
	};

	const validate = () => {
		const e = {};
		if (!form.name.trim()) e.name = 'Required';
		return e;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setServerError('');

		const errs = validate();
		if (Object.keys(errs).length) {
			setErrors(errs);
			return;
		}

		setSubmitting(true);

		try {
			// ⚠️ Wire your real API:
			// const token = getToken();
			// const res = await axios.post(`${BASE_URL}/permissions/create`, form, {
			//   headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
			// });
			// onSubmit(res.data.permission ?? res.data);

			// Simulated success
			await new Promise(r => setTimeout(r, 600));
			onSubmit({
				id: Date.now(),
				name: form.name,
				guard_name: form.guard_name,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			});
		} catch (err) {
			console.error(err);
			setServerError(err?.response?.data?.message || 'Something went wrong. Please try again.');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} noValidate>
			{serverError && (
				<div className="alert alert-danger py-2 px-3 small mb-3">{serverError}</div>
			)}

			<Row className="g-3">
				<Col md={12}>
					<label className="admin-label">Permission name</label>
					<input
						type="text"
						className={`admin-input ${errors.name ? 'is-invalid' : ''}`}
						value={form.name}
						onChange={e => set('name', e.target.value)}
						placeholder="e.g. view-flight-data"
					/>
					{errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
					<p className="admin-field-hint">
						Use lowercase with dots or dashes. Example: <code>create-booking</code>.
					</p>
				</Col>

				<Col md={6}>
					<label className="admin-label">Guard name</label>
					<select
						className="admin-input"
						value={form.guard_name}
						onChange={e => set('guard_name', e.target.value)}
					>
						<option value="web">web</option>
						<option value="api">api</option>
					</select>
				</Col>
			</Row>

			<div className="admin-form-actions">
				<button
					type="button"
					className="dash-btn dash-btn--ghost"
					onClick={onCancel}
					disabled={submitting}
				>
					Cancel
				</button>
				<button type="submit" className="dash-btn dash-btn--solid" disabled={submitting}>
					{submitting ? (
						<>
							<span className="spinner-border spinner-border-sm me-2" role="status" />
							Saving…
						</>
					) : (
						<>
							<i className="bi bi-check2 me-2"></i>
							Create permission
						</>
					)}
				</button>
			</div>
		</form>
	);
};

/* ================= PAGE ================= */
const ManagePermissions = () => {
	const [permissions, setPermissions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [search, setSearch] = useState('');

	const [modalOpen, setModalOpen] = useState(false);

	/* ---------- Fetch ---------- */
	useEffect(() => {
		let cancelled = false;

		const fetchPermissions = async () => {
			setLoading(true);
			setError('');
			try {
				const token = getToken();
				const res = await axios.get(`${BASE_URL}/permissions/all?page=${page}`, {
					headers: {
						Authorization: token ? `Bearer ${token}` : undefined,
						Accept: 'application/json',
					},
				});

				// Response shape: { data: [...], current_page, last_page }
				const payload = res?.data ?? {};
				const list = payload?.data ?? payload ?? [];
				const current = payload?.current_page ?? page;
				const last = payload?.last_page ?? 1;

				if (!cancelled) {
					setPermissions(
						list.map(p => ({
							...p,
							created_at: formatDate(p.created_at),
							updated_at: formatDate(p.updated_at),
						}))
					);
					setLastPage(last);
					if (current !== page) setPage(current);
				}
			} catch (err) {
				if (!cancelled) {
					const msg = err?.response?.data?.message || 'Could not load permissions. Please try again.';
					setError(msg);
					setPermissions([]);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		fetchPermissions();
		return () => { cancelled = true; };
	}, [page]);

	/* ---------- Derived ---------- */
	const filtered = permissions.filter(p => {
		if (!search.trim()) return true;
		const q = search.toLowerCase();
		return (
			String(p.name || '').toLowerCase().includes(q) ||
			String(p.guard_name || '').toLowerCase().includes(q)
		);
	});

	/* ---------- Handlers ---------- */
	const openCreate = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	const handleCreate = (next) => {
		setPermissions(prev => [{
			...next,
			created_at: formatDate(next.created_at),
			updated_at: formatDate(next.updated_at),
		}, ...prev]);
		closeModal();
	};

	return (
		<AdminPageShell
			eyebrow="Access"
			title="Permissions"
			subtitle="Define what actions are available to different roles."
			actions={
				<button type="button" className="dash-btn dash-btn--solid" onClick={openCreate}>
					<i className="bi bi-shield-plus me-2"></i>Create permission
				</button>
			}
		>
			<div className="admin-card">
				<div className="admin-card-head">
					<h3 className="admin-card-title">All permissions</h3>

					<div className="admin-card-tools">
						<input
							type="search"
							className="admin-inline-search"
							placeholder="Search permission or guard…"
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
						<p className="mt-3 mb-0 text-muted">Loading permissions…</p>
					</div>
				) : filtered.length === 0 ? (
					<div className="admin-empty">
						<div className="admin-empty-icon">
							<i className="bi bi-shield-lock"></i>
						</div>
						<h3 className="admin-empty-title">No permissions yet</h3>
						<p className="admin-empty-sub">
							{search ? 'Try a different search term.' : 'Create your first permission to get started.'}
						</p>
					</div>
				) : (
					<>
						<div className="dash-table-wrap">
							<table className="dash-table">
								<thead>
									<tr>
										<th style={{ width: 80 }}>ID</th>
										<th>Name</th>
										<th>Guard</th>
										<th>Created</th>
										<th>Updated</th>
									</tr>
								</thead>
								<tbody>
									{filtered.map(p => (
										<tr key={p.id}>
											<td className="dash-table-id">{p.id}</td>
											<td className="dash-table-route">{p.name}</td>
											<td>
												<span className="dash-status dash-status--refunded">
													{p.guard_name || 'web'}
												</span>
											</td>
											<td className="dash-table-when">{p.created_at}</td>
											<td className="dash-table-when">{p.updated_at}</td>
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
									onClick={() => setPage(p => Math.max(1, p - 1))}
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
									onClick={() => setPage(p => Math.min(lastPage, p + 1))}
								>
									Next <i className="bi bi-chevron-right"></i>
								</button>
							</div>
						)}
					</>
				)}
			</div>

			{/* -------- Modal -------- */}
			<BsModal
				show={modalOpen}
				onHide={closeModal}
				centered
				size="lg"
				className="admin-modal"
				backdrop="static"
			>
				<BsModal.Header closeButton>
					<div>
						<h5 className="admin-modal-title">Create permission</h5>
						<p className="admin-modal-sub">Add a new action that roles can be granted.</p>
					</div>
				</BsModal.Header>

				<BsModal.Body>
					<PermissionForm onSubmit={handleCreate} onCancel={closeModal} />
				</BsModal.Body>
			</BsModal>
		</AdminPageShell>
	);
};

export default ManagePermissions;