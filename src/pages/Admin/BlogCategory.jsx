import React, { useEffect, useState } from 'react';
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

/* ================= INLINE FORM ================= */
const EMPTY = { name: '', description: '' };

const CategoryForm = ({ initial, onSubmit, onCancel }) => {
	const [form, setForm] = useState(EMPTY);
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState('');
	const isEdit = !!initial?.id;

	useEffect(() => {
		if (initial) {
			setForm({
				name: initial.name || '',
				description: initial.description || '',
			});
		} else {
			setForm(EMPTY);
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
		if (!form.name.trim()) e.name = 'Required';
		if (!form.description.trim()) e.description = 'Required';
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
			fd.append('name', form.name.trim());
			fd.append('description', form.description.trim());

			const url = isEdit
				? `${BASE_URL}/admin/blog/update/categories/${initial.id}`
				: `${BASE_URL}/admin/create/blog/categories`;

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
				(serverErrs &&
					(serverErrs.name ||
						serverErrs.description ||
						Object.values(serverErrs).flat()[0])) ||
				err?.response?.data?.message ||
				err?.message ||
				'Failed to save category.';
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
				<Col md={12}>
					<label className="admin-label">Name</label>
					<input
						type="text"
						className={`admin-input ${errors.name ? 'is-invalid' : ''}`}
						value={form.name}
						onChange={e => set('name', e.target.value)}
						placeholder="e.g. Travel tips"
						autoFocus
					/>
					{errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
				</Col>

				<Col md={12}>
					<label className="admin-label">Description</label>
					<textarea
						className={`admin-input ${errors.description ? 'is-invalid' : ''}`}
						rows={4}
						value={form.description}
						onChange={e => set('description', e.target.value)}
						placeholder="Short description of this category"
					/>
					{errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
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
const BlogCategory = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
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

				const res = await axios.get(`${BASE_URL}/admin/blog/categories`, {
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
					},
				});

				// Support: { data: [...] } or bare array
				const list =
					Array.isArray(res?.data) ? res.data :
					Array.isArray(res?.data?.data) ? res.data.data :
					[];

				if (!cancelled) setCategories(list);
			} catch (err) {
				if (!cancelled) {
					setError(err?.response?.data?.message || 'Failed to fetch blog categories.');
					setCategories([]);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		fetchCategories();
		return () => { cancelled = true; };
	}, []);

	/* ---------- Derived ---------- */
	const filtered = categories.filter(c => {
		if (!search.trim()) return true;
		const q = search.toLowerCase();
		return (
			String(c.name || '').toLowerCase().includes(q) ||
			String(c.description || '').toLowerCase().includes(q)
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

	const handleSaved = (saved) => {
		setModalOpen(false);

		if (saved && saved.id) {
			setCategories(prev => {
				const exists = prev.some(c => c.id === saved.id);
				if (exists) return prev.map(c => (c.id === saved.id ? saved : c));
				return [saved, ...prev];
			});
		} else {
			// refetch if the API didn't return the object
			(async () => {
				try {
					const token = getToken();
					const res = await axios.get(`${BASE_URL}/admin/blog/categories`, {
						headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
					});
					const list = Array.isArray(res?.data) ? res.data : (res?.data?.data ?? []);
					setCategories(list);
				} catch { /* noop */ }
			})();
		}

		setEditingCategory(null);
	};

	const confirmDelete = async () => {
		if (!deleteId) return;
		setDeleting(true);
		try {
			const token = getToken();
			if (!token) throw new Error('Not authenticated.');

			const fd = new FormData();
			await axios.post(
				`${BASE_URL}/admin/blog/delete/categories/${deleteId}`,
				fd,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
					},
				}
			);

			setCategories(prev => prev.filter(c => c.id !== deleteId));
			setDeleteId(null);
		} catch (err) {
			console.error(err);
		} finally {
			setDeleting(false);
		}
	};

	const deletingName = (() => {
		if (deleteId == null) return '';
		const c = categories.find(x => x.id === deleteId);
		return c?.name || '';
	})();

	/* ---------- Render ---------- */
	return (
		<AdminPageShell
			eyebrow="Content"
			title="Blog categories"
			subtitle="Group blog posts into topics for easier browsing."
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
							placeholder="Search name or description…"
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
							<i className="bi bi-journal-text"></i>
						</div>
						<h3 className="admin-empty-title">No blog categories yet</h3>
						<p className="admin-empty-sub">
							{search
								? 'Try a different search term.'
								: "Add categories like 'Travel tips', 'Guides', or 'News' to organise posts."}
						</p>
					</div>
				) : (
					<div className="dash-table-wrap">
						<table className="dash-table">
							<thead>
								<tr>
									<th style={{ width: 80 }}>ID</th>
									<th style={{ minWidth: 180 }}>Name</th>
									<th>Description</th>
									<th style={{ width: 130 }}>Created</th>
									<th style={{ width: 110 }}></th>
								</tr>
							</thead>
							<tbody>
								{filtered.map(c => (
									<tr key={c.id}>
										<td className="dash-table-id">{c.id}</td>
										<td className="dash-table-route">{c.name || '—'}</td>
										<td className="bc-desc" title={c.description}>{c.description || '—'}</td>
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
								))}
							</tbody>
						</table>
					</div>
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
							{editingCategory ? 'Edit blog category' : 'New blog category'}
						</h5>
						<p className="admin-modal-sub">
							{editingCategory
								? 'Update the details below and save.'
								: 'Give the category a name and a short description.'}
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
						Posts assigned to it will keep their content but lose this tag.
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

export default BlogCategory;