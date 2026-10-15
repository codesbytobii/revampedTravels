import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Modal as BsModal, Row, Col } from 'react-bootstrap';
import AdminPageShell from '../../components/Admin/AdminPageShell';
import { getToken } from '../../utils/auth';

/* 🔧 Real API base */
const BASE_URL = 'https://test-travels.maypaspace.com/api';

/* ---------------- Helpers ---------------- */
const formatDate = (dateString) => {
	if (!dateString) return '—';
	return new Date(dateString).toLocaleDateString('en-GB', {
		day: '2-digit', month: 'short', year: 'numeric',
	});
};

const statusPill = (status) => {
	switch ((status || '').toLowerCase()) {
		case 'approved': return 'dash-status dash-status--paid';
		case 'pending':  return 'dash-status dash-status--pending';
		case 'rejected': return 'dash-status dash-status--refunded';
		default:         return 'dash-status';
	}
};

const Stars = ({ value, size = 16 }) => {
	const v = Math.floor(Number(value) || 0);
	return (
		<span className="tm-stars" aria-label={`${v} out of 5 stars`}>
			{Array.from({ length: 5 }).map((_, i) => (
				<i
					key={i}
					className={`bi ${i < v ? 'bi-star-fill' : 'bi-star'}`}
					style={{ fontSize: size }}
				></i>
			))}
		</span>
	);
};

/* ================= INLINE FORM ================= */
const EMPTY_FORM = {
	user_name: '',
	rating: '',
	comment: '',
	status: 'pending',
};

const ReviewForm = ({ initial, onSubmit, onCancel }) => {
	const [form, setForm] = useState(EMPTY_FORM);
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState('');
	const isEdit = !!initial?.id;

	useEffect(() => {
		if (initial) {
			setForm({
				user_name: initial.user_name || '',
				rating: String(initial.rating ?? ''),
				comment: initial.comment || '',
				status: initial.status || 'pending',
			});
		} else {
			setForm(EMPTY_FORM);
		}
		setErrors({});
		setServerError('');
	}, [initial]);

	const set = (field, value) => {
		setForm(f => ({ ...f, [field]: value }));
		if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
		if (serverError) setServerError('');
	};

	const validate = () => {
		const e = {};
		if (!form.user_name.trim()) e.user_name = 'Required';
		if (!form.rating) e.rating = 'Required';
		else if (Number(form.rating) < 1 || Number(form.rating) > 5) e.rating = 'Between 1 and 5';
		if (!form.comment.trim()) e.comment = 'Required';
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

			const fd = new FormData();
			fd.append('user_name', form.user_name.trim());
			fd.append('rating', form.rating);
			fd.append('comment', form.comment.trim());
			fd.append('status', form.status);
			if (isEdit) fd.append('review_id', initial.id);

			const url = isEdit
				? `${BASE_URL}/admin/review/update/${initial.id}`
				: `${BASE_URL}/admin/create/review`;

			const res = await axios.post(url, fd, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
					Accept: '*/*',
				},
			});

			onSubmit(res?.data?.data ?? res?.data ?? null);
		} catch (err) {
			const serverErrs = err?.response?.data?.errors;
			const firstErr =
				(serverErrs && (
					serverErrs.comment ||
					serverErrs.user_name ||
					serverErrs.rating ||
					serverErrs.status
				)) ||
				err?.response?.data?.message ||
				err?.message ||
				'Failed to save review.';
			setServerError(Array.isArray(firstErr) ? firstErr[0] : firstErr);
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
				<Col md={7}>
					<label className="admin-label">User name</label>
					<input
						type="text"
						className={`admin-input ${errors.user_name ? 'is-invalid' : ''}`}
						value={form.user_name}
						onChange={e => set('user_name', e.target.value)}
						placeholder="e.g. Adaeze O."
						autoFocus
					/>
					{errors.user_name && <div className="invalid-feedback d-block">{errors.user_name}</div>}
				</Col>

				<Col md={5}>
					<label className="admin-label">Rating</label>
					<select
						className={`admin-input ${errors.rating ? 'is-invalid' : ''}`}
						value={form.rating}
						onChange={e => set('rating', e.target.value)}
					>
						<option value="">Select rating</option>
						{[1, 2, 3, 4, 5].map(n => (
							<option key={n} value={n}>
								{n} star{n > 1 ? 's' : ''}
							</option>
						))}
					</select>
					{errors.rating && <div className="invalid-feedback d-block">{errors.rating}</div>}
				</Col>

				<Col md={5}>
					<label className="admin-label">Status</label>
					<select
						className="admin-input"
						value={form.status}
						onChange={e => set('status', e.target.value)}
					>
						<option value="pending">Pending</option>
						<option value="approved">Approved</option>
						<option value="rejected">Rejected</option>
					</select>
				</Col>

				<Col md={12}>
					<label className="admin-label">Comment</label>
					<textarea
						className={`admin-input ${errors.comment ? 'is-invalid' : ''}`}
						rows={5}
						value={form.comment}
						onChange={e => set('comment', e.target.value)}
						placeholder="What did the customer say?"
					/>
					{errors.comment && <div className="invalid-feedback d-block">{errors.comment}</div>}
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
							{isEdit ? 'Update review' : 'Create review'}
						</>
					)}
				</button>
			</div>
		</form>
	);
};

/* ================= PAGE ================= */
const ITEMS_PER_PAGE = 10;

const Testimonial = () => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const [statusFilter, setStatusFilter] = useState('all');
	const [search, setSearch] = useState('');

	const [modalOpen, setModalOpen] = useState(false);
	const [editingReview, setEditingReview] = useState(null);

	const [deleteId, setDeleteId] = useState(null);
	const [deleting, setDeleting] = useState(false);

	/* ---------- Fetch ---------- */
	useEffect(() => {
		let cancelled = false;

		const fetchReviews = async () => {
			setLoading(true);
			setError('');
			try {
				const token = getToken();
				if (!token) throw new Error('Not authenticated.');

				const res = await axios.get(`${BASE_URL}/admin/reviews/all`, {
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
					},
					params: { page },
				});

				const list = res?.data?.data ?? [];
				const meta = res?.data?.meta ?? {};

				if (!cancelled) {
					setReviews(Array.isArray(list) ? list : []);
					setLastPage(meta.last_page || 1);
				}
			} catch (err) {
				if (!cancelled) {
					setError(err?.response?.data?.message || 'Failed to fetch reviews.');
					setReviews([]);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		fetchReviews();
		return () => { cancelled = true; };
	}, [page]);

	/* ---------- Derived ---------- */
	const filtered = useMemo(() => {
		let list = reviews;

		if (statusFilter !== 'all') {
			list = list.filter(r => (r.status || '').toLowerCase() === statusFilter);
		}

		if (search.trim()) {
			const q = search.toLowerCase();
			list = list.filter(r =>
				String(r.user_name || '').toLowerCase().includes(q) ||
				String(r.comment || '').toLowerCase().includes(q)
			);
		}

		return list;
	}, [reviews, statusFilter, search]);

	/* ---------- Handlers ---------- */
	const openCreate = () => {
		setEditingReview(null);
		setModalOpen(true);
	};

	const openEdit = (review) => {
		setEditingReview(review);
		setModalOpen(true);
	};

	const closeModal = () => {
		if (modalOpen) {
			setModalOpen(false);
			setEditingReview(null);
		}
	};

	const handleSaved = async (created) => {
		setModalOpen(false);

		// Optimistic update
		if (created && created.id) {
			setReviews(prev => {
				const exists = prev.some(r => r.id === created.id);
				if (exists) {
					return prev.map(r => (r.id === created.id ? created : r));
				}
				return [created, ...prev];
			});
		} else {
			// Refetch if the API didn't return the object
			try {
				const token = getToken();
				const res = await axios.get(`${BASE_URL}/admin/reviews/all`, {
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
					},
					params: { page },
				});
				const list = res?.data?.data ?? [];
				setReviews(Array.isArray(list) ? list : []);
				setLastPage(res?.data?.meta?.last_page || 1);
			} catch { /* noop */ }
		}
		setEditingReview(null);
	};

	const confirmDelete = async () => {
		if (!deleteId) return;
		setDeleting(true);
		try {
			const token = getToken();
			await axios.post(
				`${BASE_URL}/admin/delete/review/${deleteId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
					},
				}
			);
			setReviews(prev => prev.filter(r => r.id !== deleteId));
			setDeleteId(null);
		} catch (err) {
			console.error(err);
		} finally {
			setDeleting(false);
		}
	};

	const deletingName = useMemo(() => {
		if (deleteId == null) return '';
		const r = reviews.find(x => x.id === deleteId);
		return r?.user_name || '';
	}, [deleteId, reviews]);

	/* ---------- Summary stats ---------- */
	const totals = useMemo(() => {
		const approved = reviews.filter(r => r.status === 'approved').length;
		const pending  = reviews.filter(r => r.status === 'pending').length;
		const rejected = reviews.filter(r => r.status === 'rejected').length;
		const avg = reviews.length
			? reviews.reduce((n, r) => n + Number(r.rating || 0), 0) / reviews.length
			: 0;
		return { approved, pending, rejected, avg };
	}, [reviews]);

	/* ---------- Render ---------- */
	return (
		<AdminPageShell
			eyebrow="Content"
			title="Testimonials"
			subtitle="Customer reviews shown on your public site."
			actions={
				<button type="button" className="dash-btn dash-btn--solid" onClick={openCreate}>
					<i className="bi bi-plus-lg me-2"></i>Create review
				</button>
			}
		>
			{/* ---------- Summary strip ---------- */}
			<div className="dash-kpis">
				<div className="dash-kpi dash-kpi--red">
					<div className="dash-kpi-top">
						<span className="dash-kpi-label">Approved</span>
						<span className="dash-kpi-icon"><i className="bi bi-patch-check"></i></span>
					</div>
					<div className="dash-kpi-value">{totals.approved}</div>
				</div>
				<div className="dash-kpi dash-kpi--gold">
					<div className="dash-kpi-top">
						<span className="dash-kpi-label">Pending</span>
						<span className="dash-kpi-icon"><i className="bi bi-hourglass-split"></i></span>
					</div>
					<div className="dash-kpi-value">{totals.pending}</div>
				</div>
				<div className="dash-kpi dash-kpi--muted">
					<div className="dash-kpi-top">
						<span className="dash-kpi-label">Rejected</span>
						<span className="dash-kpi-icon"><i className="bi bi-x-octagon"></i></span>
					</div>
					<div className="dash-kpi-value">{totals.rejected}</div>
				</div>
				<div className="dash-kpi dash-kpi--ink">
					<div className="dash-kpi-top">
						<span className="dash-kpi-label">Average rating</span>
						<span className="dash-kpi-icon"><i className="bi bi-star"></i></span>
					</div>
					<div className="dash-kpi-value">
						{totals.avg ? totals.avg.toFixed(1) : '—'}
					</div>
				</div>
			</div>

			{/* ---------- Table card ---------- */}
			<div className="admin-card">
				<div className="admin-card-head">
					<h3 className="admin-card-title">All reviews</h3>

					<div className="admin-card-tools">
						<select
							className="admin-mini-select"
							value={statusFilter}
							onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
						>
							<option value="all">All statuses</option>
							<option value="pending">Pending</option>
							<option value="approved">Approved</option>
							<option value="rejected">Rejected</option>
						</select>

						<input
							type="search"
							className="admin-inline-search"
							placeholder="Search name or comment…"
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
						<p className="mt-3 mb-0 text-muted">Loading reviews…</p>
					</div>
				) : filtered.length === 0 ? (
					<div className="admin-empty">
						<div className="admin-empty-icon">
							<i className="bi bi-chat-square-quote"></i>
						</div>
						<h3 className="admin-empty-title">No reviews found</h3>
						<p className="admin-empty-sub">
							{search || statusFilter !== 'all'
								? 'Try changing the filter or search term.'
								: 'Create your first testimonial to get started.'}
						</p>
					</div>
				) : (
					<>
						<div className="dash-table-wrap">
							<table className="dash-table tm-table">
								<thead>
									<tr>
										<th style={{ minWidth: 160 }}>User</th>
										<th style={{ minWidth: 140 }}>Rating</th>
										<th>Comment</th>
										<th style={{ width: 120 }}>Status</th>
										<th style={{ width: 130 }}>Date</th>
										<th style={{ width: 110 }}></th>
									</tr>
								</thead>
								<tbody>
									{filtered.map(r => (
										<tr key={r.id}>
											<td className="dash-table-route">{r.user_name || '—'}</td>
											<td>
												<div className="tm-rating">
													<Stars value={r.rating} />
													<span className="tm-rating-num">
														{Number(r.rating || 0).toFixed(1)}
													</span>
												</div>
											</td>
											<td className="tm-comment" title={r.comment}>
												{r.comment}
											</td>
											<td>
												<span className={statusPill(r.status)}>
													{r.status || 'pending'}
												</span>
											</td>
											<td className="dash-table-when">{formatDate(r.created_at)}</td>
											<td>
												<div className="markup-actions">
													<button
														type="button"
														className="admin-icon-btn"
														title="Edit review"
														onClick={() => openEdit(r)}
													>
														<i className="bi bi-pencil-square"></i>
													</button>
													<button
														type="button"
														className="admin-icon-btn admin-icon-btn--danger"
														title="Delete review"
														onClick={() => setDeleteId(r.id)}
													>
														<i className="bi bi-trash"></i>
													</button>
												</div>
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

			{/* ---------- Create / Edit modal ---------- */}
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
						<h5 className="admin-modal-title">
							{editingReview ? 'Edit review' : 'Create review'}
						</h5>
						<p className="admin-modal-sub">
							{editingReview
								? 'Update the testimonial and save.'
								: 'Add a customer testimonial manually.'}
						</p>
					</div>
				</BsModal.Header>
				<BsModal.Body>
					<ReviewForm
						initial={editingReview}
						onSubmit={handleSaved}
						onCancel={closeModal}
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
						<h5 className="admin-modal-title">Delete review</h5>
						<p className="admin-modal-sub">This cannot be undone.</p>
					</div>
				</BsModal.Header>
				<BsModal.Body>
					<p className="fd-confirm-lead mb-0">
						Are you sure you want to delete{' '}
						<strong>{deletingName || 'this review'}</strong>?
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

export default Testimonial;