import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Modal as BsModal } from 'react-bootstrap';
import AdminPageShell from '../../components/Admin/AdminPageShell';
import { getToken } from '../../utils/auth';

/* 🔧 Real API base */
const BASE_URL = 'https://test-travels.maypaspace.com/api';

/* ---------------- Helpers ---------------- */
const formatPercent = (n) => {
	if (n == null || Number.isNaN(Number(n))) return '—';
	const v = Number(n);
	return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(2)}%`;
};

/* ================= CREATE FORM ================= */
const EMPTY = { fee_name: '', fee_percentage: '' };

const MarkupForm = ({ onSubmit, onCancel }) => {
	const [form, setForm] = useState(EMPTY);
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState('');

	const set = (field, value) => {
		setForm(f => ({ ...f, [field]: value }));
		if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
		if (serverError) setServerError('');
	};

	const validate = () => {
		const e = {};
		if (!form.fee_name.trim()) e.fee_name = 'Required';
		if (form.fee_percentage === '' || form.fee_percentage == null) {
			e.fee_percentage = 'Required';
		} else if (Number(form.fee_percentage) < 0) {
			e.fee_percentage = 'Must be 0 or more';
		} else if (Number(form.fee_percentage) > 100) {
			e.fee_percentage = 'Must be 100 or less';
		}
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
			const token = getToken();
			if (!token) throw new Error('Not authenticated.');

			const res = await axios.post(
				`${BASE_URL}/markup/create`,
				{
					fee_name: form.fee_name.trim(),
					fee_percentage: Number(form.fee_percentage),
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
					},
				}
			);

			const created = res?.data?.data ?? res?.data ?? null;
			onSubmit(created);
		} catch (err) {
			setServerError(
				err?.response?.data?.message ||
				err?.message ||
				'Failed to create markup.'
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} noValidate>
			{serverError && (
				<div className="alert alert-danger py-2 px-3 small mb-3">{serverError}</div>
			)}

			<div className="admin-form-grid">
				<div className="admin-form-field">
					<label className="admin-label">Fee name</label>
					<input
						type="text"
						className={`admin-input ${errors.fee_name ? 'is-invalid' : ''}`}
						value={form.fee_name}
						onChange={e => set('fee_name', e.target.value)}
						placeholder="e.g. Service fee"
						autoFocus
					/>
					{errors.fee_name && <div className="invalid-feedback d-block">{errors.fee_name}</div>}
					<p className="admin-field-hint">
						A short label shown on pricing summaries.
					</p>
				</div>

				<div className="admin-form-field">
					<label className="admin-label">Fee percentage</label>
					<div className="admin-input-suffix">
						<input
							type="number"
							step="0.01"
							min="0"
							max="100"
							className={`admin-input ${errors.fee_percentage ? 'is-invalid' : ''}`}
							value={form.fee_percentage}
							onChange={e => set('fee_percentage', e.target.value)}
							placeholder="7"
						/>
						<span className="admin-suffix">%</span>
					</div>
					{errors.fee_percentage && <div className="invalid-feedback d-block">{errors.fee_percentage}</div>}
					<p className="admin-field-hint">
						Applied to the base fare when this fee is active.
					</p>
				</div>
			</div>

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
							Creating…
						</>
					) : (
						<>
							<i className="bi bi-check2 me-2"></i>
							Create markup
						</>
					)}
				</button>
			</div>
		</form>
	);
};

/* ================= PAGE ================= */
const Markup = () => {
	const [markups, setMarkups] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// Inline edit state
	const [editingId, setEditingId] = useState(null);
	const [editedPercent, setEditedPercent] = useState('');
	const [savingId, setSavingId] = useState(null);

	// Delete confirm
	const [deleteId, setDeleteId] = useState(null);
	const [deleting, setDeleting] = useState(false);

	// Create modal
	const [createOpen, setCreateOpen] = useState(false);

	/* ---------- Fetch ---------- */
	useEffect(() => {
		let cancelled = false;

		const fetchMarkups = async () => {
			setLoading(true);
			setError('');
			try {
				const token = getToken();
				const res = await axios.get(`${BASE_URL}/markup/home`, {
					headers: {
						Authorization: token ? `Bearer ${token}` : undefined,
						Accept: 'application/json',
					},
				});

				const list = res?.data?.data ?? res?.data ?? [];
				if (!cancelled) setMarkups(Array.isArray(list) ? list : []);
			} catch (err) {
				if (!cancelled) {
					setError(err?.response?.data?.message || 'Failed to fetch markups.');
					setMarkups([]);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		fetchMarkups();
		return () => { cancelled = true; };
	}, []);

	/* ---------- Inline edit ---------- */
	const startEdit = (m) => {
		setEditingId(m.id);
		setEditedPercent(String(m.fee_percentage ?? ''));
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditedPercent('');
	};

	const saveEdit = async (m) => {
		const value = Number(editedPercent);
		if (Number.isNaN(value) || value < 0 || value > 100) return;

		setSavingId(m.id);
		try {
			const token = getToken();
			if (!token) throw new Error('Not authenticated.');

			await axios.post(
				`${BASE_URL}/markup/update/${m.id}`,
				{ fee_percentage: value },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
					},
				}
			);

			setMarkups(prev =>
				prev.map(x => (x.id === m.id ? { ...x, fee_percentage: value } : x))
			);
			cancelEdit();
		} catch (err) {
			// keep the row in edit state so the user can retry
			console.error(err);
		} finally {
			setSavingId(null);
		}
	};

	/* ---------- Delete ---------- */
	const confirmDelete = async () => {
		if (!deleteId) return;
		setDeleting(true);
		try {
			const token = getToken();
			if (!token) throw new Error('Not authenticated.');

			await axios.delete(`${BASE_URL}/markup/delete/${deleteId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
			});

			setMarkups(prev => prev.filter(x => x.id !== deleteId));
			setDeleteId(null);
		} catch (err) {
			console.error(err);
		} finally {
			setDeleting(false);
		}
	};

	/* ---------- Create ---------- */
	const handleCreated = (created) => {
		setCreateOpen(false);
		if (created) {
			setMarkups(prev => [...prev, created]);
		} else {
			// API didn't return the object; refetch
			(async () => {
				try {
					const token = getToken();
					const res = await axios.get(`${BASE_URL}/markup/home`, {
						headers: {
							Authorization: token ? `Bearer ${token}` : undefined,
							Accept: 'application/json',
						},
					});
					const list = res?.data?.data ?? res?.data ?? [];
					setMarkups(Array.isArray(list) ? list : []);
				} catch { /* noop */ }
			})();
		}
	};

	/* ---------- Derived ---------- */
	const totalCount = markups.length;
	const avgPercent = useMemo(() => {
		if (!markups.length) return 0;
		const sum = markups.reduce((n, m) => n + Number(m.fee_percentage || 0), 0);
		return sum / markups.length;
	}, [markups]);

	const deletingName = useMemo(() => {
		if (deleteId == null) return '';
		const m = markups.find(x => x.id === deleteId);
		return m?.fee_name || '';
	}, [deleteId, markups]);

	/* ---------- Render ---------- */
	return (
		<AdminPageShell
			eyebrow="Pricing"
			title="Markup"
			subtitle="Manage the fees added on top of airline fares."
			actions={
				<button
					type="button"
					className="dash-btn dash-btn--solid"
					onClick={() => setCreateOpen(true)}
				>
					<i className="bi bi-plus-lg me-2"></i>Create markup
				</button>
			}
		>
			{/* ---------- Summary strip ---------- */}
			<div className="dash-kpis" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', marginBottom: 20 }}>
				<div className="dash-kpi dash-kpi--red">
					<div className="dash-kpi-top">
						<span className="dash-kpi-label">Total markups</span>
						<span className="dash-kpi-icon">
							<i className="bi bi-currency-exchange"></i>
						</span>
					</div>
					<div className="dash-kpi-value">{totalCount}</div>
					<div className="dash-kpi-delta">
						<i className="bi bi-database"></i>
						<span className="dash-kpi-delta-label">active fee rules</span>
					</div>
				</div>

				<div className="dash-kpi dash-kpi--ink">
					<div className="dash-kpi-top">
						<span className="dash-kpi-label">Average fee</span>
						<span className="dash-kpi-icon">
							<i className="bi bi-percent"></i>
						</span>
					</div>
					<div className="dash-kpi-value">{formatPercent(avgPercent)}</div>
					<div className="dash-kpi-delta">
						<i className="bi bi-graph-up"></i>
						<span className="dash-kpi-delta-label">across all markups</span>
					</div>
				</div>
			</div>

			{/* ---------- Table ---------- */}
			<div className="admin-card">
				<div className="admin-card-head">
					<h3 className="admin-card-title">All markups</h3>
					<span className="dash-muted">{markups.length} total</span>
				</div>

				{error && <div className="alert alert-danger mb-3">{error}</div>}

				{loading ? (
					<div className="admin-table-loading">
						<div className="spinner-border text-danger" role="status" />
						<p className="mt-3 mb-0 text-muted">Loading markups…</p>
					</div>
				) : markups.length === 0 ? (
					<div className="admin-empty">
						<div className="admin-empty-icon">
							<i className="bi bi-currency-exchange"></i>
						</div>
						<h3 className="admin-empty-title">No markups yet</h3>
						<p className="admin-empty-sub">
							Create your first fee rule to add a markup to every fare.
						</p>
						<button
							type="button"
							className="dash-btn dash-btn--solid mt-3"
							onClick={() => setCreateOpen(true)}
						>
							<i className="bi bi-plus-lg me-2"></i>Create markup
						</button>
					</div>
				) : (
					<div className="dash-table-wrap">
						<table className="dash-table">
							<thead>
								<tr>
									<th style={{ width: 80 }}>ID</th>
									<th>Fee name</th>
									<th style={{ width: 180 }}>Fee percentage</th>
									<th style={{ width: 220 }}></th>
								</tr>
							</thead>
							<tbody>
								{markups.map(m => {
									const isEditing = editingId === m.id;
									const isSaving = savingId === m.id;
									return (
										<tr key={m.id}>
											<td className="dash-table-id">{m.id}</td>
											<td className="dash-table-route">{m.fee_name}</td>
											<td>
												{isEditing ? (
													<div className="admin-input-suffix" style={{ maxWidth: 140 }}>
														<input
															type="number"
															min="0"
															max="100"
															step="0.01"
															className="admin-input"
															value={editedPercent}
															onChange={e => setEditedPercent(e.target.value)}
															onKeyDown={e => {
																if (e.key === 'Enter') saveEdit(m);
																if (e.key === 'Escape') cancelEdit();
															}}
															autoFocus
														/>
														<span className="admin-suffix">%</span>
													</div>
												) : (
													<span className="markup-percent">
														{formatPercent(m.fee_percentage)}
													</span>
												)}
											</td>
											<td>
												{isEditing ? (
													<div className="markup-actions">
														<button
															type="button"
															className="dash-btn dash-btn--solid markup-btn"
															onClick={() => saveEdit(m)}
															disabled={isSaving}
														>
															{isSaving ? (
																<>
																	<span className="spinner-border spinner-border-sm me-2" role="status" />
																	Saving
																</>
															) : (
																<>
																	<i className="bi bi-check2 me-1"></i>Save
																</>
															)}
														</button>
														<button
															type="button"
															className="dash-btn dash-btn--ghost markup-btn"
															onClick={cancelEdit}
															disabled={isSaving}
														>
															Cancel
														</button>
													</div>
												) : (
													<div className="markup-actions">
														<button
															type="button"
															className="admin-icon-btn"
															title="Edit fee"
															onClick={() => startEdit(m)}
														>
															<i className="bi bi-pencil-square"></i>
														</button>
														<button
															type="button"
															className="admin-icon-btn admin-icon-btn--danger"
															title="Delete markup"
															onClick={() => setDeleteId(m.id)}
														>
															<i className="bi bi-trash"></i>
														</button>
													</div>
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

			{/* ---------- Create modal ---------- */}
			<BsModal
				show={createOpen}
				onHide={() => setCreateOpen(false)}
				centered
				size="lg"
				className="admin-modal"
				backdrop="static"
			>
				<BsModal.Header closeButton>
					<div>
						<h5 className="admin-modal-title">Create markup</h5>
						<p className="admin-modal-sub">
							Add a fee name and percentage. It will apply to new searches.
						</p>
					</div>
				</BsModal.Header>
				<BsModal.Body>
					<MarkupForm
						onSubmit={handleCreated}
						onCancel={() => setCreateOpen(false)}
					/>
				</BsModal.Body>
			</BsModal>

			{/* ---------- Delete confirm ---------- */}
			<BsModal
				show={deleteId != null}
				onHide={deleting ? undefined : () => setDeleteId(null)}
				centered
				className="admin-modal"
				backdrop={deleting ? 'static' : true}
				keyboard={!deleting}
			>
				<BsModal.Header closeButton={!deleting}>
					<div>
						<h5 className="admin-modal-title">Delete markup</h5>
						<p className="admin-modal-sub">
							This cannot be undone.
						</p>
					</div>
				</BsModal.Header>
				<BsModal.Body>
					<p className="fd-confirm-lead mb-0">
						Are you sure you want to delete{' '}
						<strong>{deletingName || 'this markup'}</strong>? Any bookings that
						already used this fee are unaffected, but new searches will no longer
						include it.
					</p>

					<div className="admin-form-actions">
						<button
							type="button"
							className="dash-btn dash-btn--ghost"
							onClick={() => setDeleteId(null)}
							disabled={deleting}
						>
							Cancel
						</button>
						<button
							type="button"
							className="dash-btn dash-btn--solid"
							onClick={confirmDelete}
							disabled={deleting}
						>
							{deleting ? (
								<>
									<span className="spinner-border spinner-border-sm me-2" role="status" />
									Deleting…
								</>
							) : (
								<>
									<i className="bi bi-trash me-2"></i>
									Delete
								</>
							)}
						</button>
					</div>
				</BsModal.Body>
			</BsModal>
		</AdminPageShell>
	);
};

export default Markup;