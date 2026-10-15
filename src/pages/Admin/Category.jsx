import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal as BsModal, Row, Col } from 'react-bootstrap';
import AdminPageShell from '../../components/Admin/AdminPageShell';
import { getToken } from '../../utils/auth';

/* 🔧 Real API base + media prefix */
const BASE_URL  = 'https://test-travels.maypaspace.com/api';
const MEDIA_URL = 'https://test-travels.maypaspace.com/storage';

/* ---------------- Helpers ---------------- */
const formatDate = (dateString) => {
	if (!dateString) return '—';
	return new Date(dateString).toLocaleDateString('en-GB', {
		day: '2-digit', month: 'short', year: 'numeric',
	});
};

/* ================= INLINE FORM ================= */
const EMPTY = { title: '', excerpt: '', content: '' };

const CategoryForm = ({ initial, onSubmit, onCancel }) => {
	const [form, setForm] = useState(EMPTY);
	const [iconFiles, setIconFiles] = useState([]);          // new File[]
	const [existingIcon, setExistingIcon] = useState(null);  // URL of current image
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState('');
	const isEdit = !!initial?.id;

	useEffect(() => {
		if (initial) {
			setForm({
				title: initial.title || '',
				excerpt: initial.excerpt || '',
				content: initial.content || '',
			});
			const firstIcon =
				Array.isArray(initial.icon) ? initial.icon[0] :
				typeof initial.icon === 'string' ? initial.icon :
				null;
			setExistingIcon(firstIcon ? `${MEDIA_URL}/${firstIcon}` : null);
		} else {
			setForm(EMPTY);
			setExistingIcon(null);
		}
		setIconFiles([]);
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
		if (!form.title.trim()) e.title = 'Required';
		if (!form.excerpt.trim()) e.excerpt = 'Required';
		if (!form.content.trim()) e.content = 'Required';
		return e;
	};

	const handleFiles = (e) => {
		if (e.target.files?.length) {
			setIconFiles(Array.from(e.target.files));
			setExistingIcon(null);
		}
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
			fd.append('title', form.title.trim());
			fd.append('excerpt', form.excerpt.trim());
			fd.append('content', form.content.trim());

			if (iconFiles.length > 0) {
				iconFiles.forEach((file, i) => fd.append(`icons[${i}]`, file));
			} else if (existingIcon) {
				fd.append('existing_icon', existingIcon);
			}

			if (isEdit) fd.append('category_id', initial.id);

			const url = isEdit
				? `${BASE_URL}/admin/update/category/advert/${initial.id}`
				: `${BASE_URL}/admin/create/category/advert`;

			const res = await axios.post(url, fd, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
					Accept: '*/*',
				},
			});

			onSubmit(res?.data?.data ?? res?.data ?? null);
		} catch (err) {
			const s = err?.response?.data?.errors;
			const first =
				(s && (s.title || s.excerpt || s.content || Object.values(s).flat()[0])) ||
				err?.response?.data?.message ||
				err?.message ||
				'Failed to save category.';
			setServerError(Array.isArray(first) ? first[0] : first);
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
					<label className="admin-label">Title</label>
					<input
						type="text"
						className={`admin-input ${errors.title ? 'is-invalid' : ''}`}
						value={form.title}
						onChange={e => set('title', e.target.value)}
						placeholder="e.g. Domestic flights"
						autoFocus
					/>
					{errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
				</Col>

				<Col md={12}>
					<label className="admin-label">Icon</label>

					{existingIcon && iconFiles.length === 0 && (
						<div className="category-form-icon mb-2">
							<img src={existingIcon} alt="Current" />
							<span className="category-form-icon-hint">
								Current icon — upload a new one to replace it.
							</span>
						</div>
					)}

					{iconFiles.length > 0 && (
						<div className="category-form-icon mb-2">
							<img src={URL.createObjectURL(iconFiles[0])} alt="New" />
							<span className="category-form-icon-hint">
								{iconFiles.length} new file{iconFiles.length > 1 ? 's' : ''} selected.
							</span>
						</div>
					)}

					<input
						type="file"
						accept="image/*"
						className="admin-input"
						onChange={handleFiles}
						multiple
					/>
				</Col>

				<Col md={12}>
					<label className="admin-label">Excerpt</label>
					<input
						type="text"
						className={`admin-input ${errors.excerpt ? 'is-invalid' : ''}`}
						value={form.excerpt}
						onChange={e => set('excerpt', e.target.value)}
						placeholder="Short summary"
					/>
					{errors.excerpt && <div className="invalid-feedback d-block">{errors.excerpt}</div>}
				</Col>

				<Col md={12}>
					<label className="admin-label">Content</label>
					<textarea
						className={`admin-input ${errors.content ? 'is-invalid' : ''}`}
						rows={5}
						value={form.content}
						onChange={e => set('content', e.target.value)}
						placeholder="Long description of this category"
					/>
					{errors.content && <div className="invalid-feedback d-block">{errors.content}</div>}
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
							{isEdit ? 'Update category' : 'Create category'}
						</>
					)}
				</button>
			</div>
		</form>
	);
};

/* ================= PAGE ================= */
const Category = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [search, setSearch] = useState('');

	const [modalOpen, setModalOpen] = useState(false);
	const [editingCategory, setEditingCategory] = useState(null);

	const [deleteId, setDeleteId] = useState(null);
	const [deleting, setDeleting] = useState(false);

	/* ---------- Fetch ---------- */
	useEffect(() => {
		let cancelled = false;

		const fetchCategories = async () => {
			setLoading(true);
			setError('');
			try {
				const token = getToken();
				if (!token) throw new Error('Not authenticated.');

				const res = await axios.get(
					`${BASE_URL}/admin/get/category/advert?page=${page}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							Accept: 'application/json',
						},
					}
				);

				// Response shape: { data: { data: [...], last_page } } or nested variants
				const payload = res?.data?.data ?? res?.data ?? {};
				const list = Array.isArray(payload?.data) ? payload.data :
					Array.isArray(payload) ? payload : [];
				const totalPages =
					payload?.last_page ??
					res?.data?.last_page ??
					1;

				if (!cancelled) {
					setCategories(list);
					setLastPage(totalPages);
				}
			} catch (err) {
				if (!cancelled) {
					setError(err?.response?.data?.message || 'Failed to fetch categories.');
					setCategories([]);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		fetchCategories();
		return () => { cancelled = true; };
	}, [page]);

	/* ---------- Derived ---------- */
	const filtered = categories.filter(c => {
		if (!search.trim()) return true;
		const q = search.toLowerCase();
		return (
			String(c.title || '').toLowerCase().includes(q) ||
			String(c.excerpt || '').toLowerCase().includes(q)
		);
	});

	/* ---------- Handlers ---------- */
	const openCreate = () => {
		setEditingCategory(null);
		setModalOpen(true);
	};

	const openEdit = (cat) => {
		setEditingCategory(cat);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setEditingCategory(null);
	};

	const handleSaved = () => {
		setModalOpen(false);
		setEditingCategory(null);

		// Refetch so we see the server's image URLs and IDs
		(async () => {
			try {
				const token = getToken();
				const res = await axios.get(
					`${BASE_URL}/admin/get/category/advert?page=${page}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							Accept: 'application/json',
						},
					}
				);
				const payload = res?.data?.data ?? res?.data ?? {};
				const list = Array.isArray(payload?.data) ? payload.data :
					Array.isArray(payload) ? payload : [];
				setCategories(list);
				setLastPage(payload?.last_page ?? res?.data?.last_page ?? 1);
			} catch { /* noop */ }
		})();
	};

	const confirmDelete = async () => {
		if (!deleteId) return;
		setDeleting(true);
		try {
			const token = getToken();
			if (!token) throw new Error('Not authenticated.');

			const res = await axios.post(
				`${BASE_URL}/admin/delete/category/advert`,
				{ category_id: deleteId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
					},
				}
			);

			if (res?.data?.success) {
				setCategories(prev => prev.filter(c => c.id !== deleteId));
				setDeleteId(null);
			}
		} catch (err) {
			console.error(err);
		} finally {
			setDeleting(false);
		}
	};

	const deletingName = (() => {
		if (deleteId == null) return '';
		const c = categories.find(x => x.id === deleteId);
		return c?.title || '';
	})();

	/* ---------- Pagination ---------- */
	const goPrev = () => setPage(p => Math.max(1, p - 1));
	const goNext = () => setPage(p => Math.min(lastPage, p + 1));

	/* ---------- Render ---------- */
	return (
		<AdminPageShell
			eyebrow="Structure"
			title="Categories"
			subtitle="Organise offers, articles, and content into groups."
			actions={
				<button type="button" className="dash-btn dash-btn--solid" onClick={openCreate}>
					<i className="bi bi-plus-lg me-2"></i>New category
				</button>
			}
		>
			<div className="admin-card">
				<div className="admin-card-head">
					<h3 className="admin-card-title">All categories</h3>

					<div className="admin-card-tools">
						<input
							type="search"
							className="admin-inline-search"
							placeholder="Search title or excerpt…"
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
						<p className="mt-3 mb-0 text-muted">Loading categories…</p>
					</div>
				) : filtered.length === 0 ? (
					<div className="admin-empty">
						<div className="admin-empty-icon">
							<i className="bi bi-grid-3x3-gap"></i>
						</div>
						<h3 className="admin-empty-title">No categories yet</h3>
						<p className="admin-empty-sub">
							{search
								? 'Try a different search term.'
								: "Create categories like 'Domestic flights', 'Long haul', or 'Africa' to group content."}
						</p>
					</div>
				) : (
					<>
						<div className="dash-table-wrap">
							<table className="dash-table category-table">
								<thead>
									<tr>
										<th style={{ width: 60 }}>ID</th>
										<th style={{ width: 80 }}>Icon</th>
										<th style={{ minWidth: 180 }}>Title</th>
										<th style={{ minWidth: 220 }}>Excerpt</th>
										<th style={{ width: 130 }}>Created</th>
										<th style={{ width: 110 }}></th>
									</tr>
								</thead>
								<tbody>
									{filtered.map(c => {
										const iconPath =
											Array.isArray(c.icon) ? c.icon[0] : c.icon;
										return (
											<tr key={c.id}>
												<td className="dash-table-id">{c.id}</td>
												<td>
													{iconPath ? (
														<img
															src={`${MEDIA_URL}/${iconPath}`}
															alt={c.title}
															className="category-thumb"
															onError={e => { e.currentTarget.style.visibility = 'hidden'; }}
														/>
													) : (
														<span className="text-muted small">—</span>
													)}
												</td>
												<td className="dash-table-route">{c.title}</td>
												<td className="cat-excerpt" title={c.excerpt}>
													{c.excerpt || '—'}
												</td>
												<td className="dash-table-when">{formatDate(c.created_at)}</td>
												<td>
													<div className="markup-actions">
														<button
															type="button"
															className="admin-icon-btn"
															title="Edit category"
															onClick={() => openEdit(c)}
														>
															<i className="bi bi-pencil-square"></i>
														</button>
														<button
															type="button"
															className="admin-icon-btn admin-icon-btn--danger"
															title="Delete category"
															onClick={() => setDeleteId(c.id)}
														>
															<i className="bi bi-trash"></i>
														</button>
													</div>
												</td>
											</tr>
										);
									})}
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
							{editingCategory ? 'Edit category' : 'New category'}
						</h5>
						<p className="admin-modal-sub">
							{editingCategory
								? 'Update the details below and save.'
								: 'Give the category a title, an icon, and a short description.'}
						</p>
					</div>
				</BsModal.Header>
				<BsModal.Body>
					<CategoryForm
						initial={editingCategory}
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
						<h5 className="admin-modal-title">Delete category</h5>
						<p className="admin-modal-sub">This cannot be undone.</p>
					</div>
				</BsModal.Header>
				<BsModal.Body>
					<p className="fd-confirm-lead mb-0">
						Are you sure you want to delete{' '}
						<strong>{deletingName || 'this category'}</strong>?
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

export default Category;