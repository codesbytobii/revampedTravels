import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Modal as BsModal, Row, Col } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import AdminPageShell from '../../components/Admin/AdminPageShell';
import { getToken } from '../../utils/auth';

/* 🔧 Real API base + media prefix */
const BASE_URL  = 'https://test-travels.maypaspace.com/api';
const MEDIA_URL = 'https://test-travels.maypaspace.com/storage';

const TINYMCE_KEY = 'owhix8rdfvcdc0l3oxqpy11lqmvorndyyj1jgbcdhpjijgh4';

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

const formatCurrency = (n, currency = 'NGN') => {
	const num = Number(n);
	if (!Number.isFinite(num)) return n || '—';
	try {
		return new Intl.NumberFormat('en-NG', {
			style: 'currency', currency, maximumFractionDigits: 0,
		}).format(num);
	} catch {
		return `${currency} ${num.toLocaleString()}`;
	}
};

/* ================= INLINE FORM ================= */
const EMPTY_FORM = {
	title: '',
	excerpt: '',
	content: '',
	destination: '',
	fee: '',
	startDate: '',
	endDate: '',
	categoryId: '',
};

const AdvertForm = ({ initial, categories, onSubmit, onCancel }) => {
	const [form, setForm] = useState(EMPTY_FORM);
	const [featuredImages, setFeaturedImages] = useState([]);       // new Files
	const [existingImage, setExistingImage] = useState(null);       // current URL
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState('');
	const isEdit = !!initial?.id;

	useEffect(() => {
		if (initial) {
			setForm({
				title: initial.title || '',
				excerpt: initial.excerpt || '',
				content: initial.content || initial.post_content || '',
				destination: initial.destination || '',
				fee: initial.fee != null ? String(initial.fee) : '',
				startDate: initial.start_date ? initial.start_date.slice(0, 10) : '',
				endDate: initial.end_date ? initial.end_date.slice(0, 10) : '',
				categoryId: initial.category_id ? String(initial.category_id) : '',
			});
			const firstImage =
				Array.isArray(initial.featured_images) ? initial.featured_images[0] :
				typeof initial.featured_images === 'string' ? initial.featured_images :
				null;
			setExistingImage(firstImage ? `${MEDIA_URL}/${firstImage}` : null);
		} else {
			setForm(EMPTY_FORM);
			setExistingImage(null);
		}
		setFeaturedImages([]);
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
		if (!form.destination.trim()) e.destination = 'Required';
		if (!form.fee) e.fee = 'Required';
		if (!form.startDate) e.startDate = 'Required';
		if (!form.endDate) e.endDate = 'Required';
		else if (form.startDate && form.endDate && form.endDate < form.startDate) {
			e.endDate = 'Must be after start date';
		}
		if (!form.categoryId) e.categoryId = 'Required';
		return e;
	};

	const handleFiles = (e) => {
		if (e.target.files?.length) {
			setFeaturedImages(Array.from(e.target.files));
			setExistingImage(null);
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
			fd.append('content', form.content);
			fd.append('destination', form.destination.trim());
			fd.append('fee', form.fee);
			fd.append('start_date', form.startDate);
			fd.append('end_date', form.endDate);
			fd.append('category_id', form.categoryId);

			if (featuredImages.length > 0) {
				featuredImages.forEach((file, i) =>
					fd.append(`featured_images[${i}]`, file)
				);
			} else if (existingImage) {
				fd.append('existing_images', existingImage);
			}

			if (isEdit) fd.append('advert_id', initial.id);

			const url = isEdit
				? `${BASE_URL}/admin/update/advertisement`
				: `${BASE_URL}/admin/create/advertisement`;

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
				(s && (
					s.content ||
					s.title ||
					s.excerpt ||
					s.destination ||
					s.fee ||
					s.start_date ||
					s.end_date ||
					s.category_id ||
					Object.values(s).flat()[0]
				)) ||
				err?.response?.data?.message ||
				err?.message ||
				'Failed to save advertisement.';
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
				<Col md={8}>
					<label className="admin-label">Title</label>
					<input
						type="text"
						className={`admin-input ${errors.title ? 'is-invalid' : ''}`}
						value={form.title}
						onChange={e => set('title', e.target.value)}
						placeholder="e.g. Summer flight sale"
						autoFocus
					/>
					{errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
				</Col>

				<Col md={4}>
					<label className="admin-label">Category</label>
					<select
						className={`admin-input ${errors.categoryId ? 'is-invalid' : ''}`}
						value={form.categoryId}
						onChange={e => set('categoryId', e.target.value)}
					>
						<option value="">Select category</option>
						{categories.map(c => (
							<option key={c.id} value={c.id}>{c.title || c.name}</option>
						))}
					</select>
					{errors.categoryId && <div className="invalid-feedback d-block">{errors.categoryId}</div>}
				</Col>

				<Col md={12}>
					<label className="admin-label">Excerpt</label>
					<input
						type="text"
						className={`admin-input ${errors.excerpt ? 'is-invalid' : ''}`}
						value={form.excerpt}
						onChange={e => set('excerpt', e.target.value)}
						placeholder="Short summary shown on cards"
					/>
					{errors.excerpt && <div className="invalid-feedback d-block">{errors.excerpt}</div>}
				</Col>

				<Col md={4}>
					<label className="admin-label">Destination</label>
					<input
						type="text"
						className={`admin-input ${errors.destination ? 'is-invalid' : ''}`}
						value={form.destination}
						onChange={e => set('destination', e.target.value)}
						placeholder="e.g. Dubai"
					/>
					{errors.destination && <div className="invalid-feedback d-block">{errors.destination}</div>}
				</Col>

				<Col md={4}>
					<label className="admin-label">Fee (₦)</label>
					<input
						type="number"
						min="0"
						step="1000"
						className={`admin-input ${errors.fee ? 'is-invalid' : ''}`}
						value={form.fee}
						onChange={e => set('fee', e.target.value)}
						placeholder="0"
					/>
					{errors.fee && <div className="invalid-feedback d-block">{errors.fee}</div>}
				</Col>

				<Col md={2}>
					<label className="admin-label">Start date</label>
					<input
						type="date"
						className={`admin-input ${errors.startDate ? 'is-invalid' : ''}`}
						value={form.startDate}
						onChange={e => set('startDate', e.target.value)}
					/>
					{errors.startDate && <div className="invalid-feedback d-block">{errors.startDate}</div>}
				</Col>

				<Col md={2}>
					<label className="admin-label">End date</label>
					<input
						type="date"
						className={`admin-input ${errors.endDate ? 'is-invalid' : ''}`}
						value={form.endDate}
						onChange={e => set('endDate', e.target.value)}
					/>
					{errors.endDate && <div className="invalid-feedback d-block">{errors.endDate}</div>}
				</Col>

				<Col md={12}>
					<label className="admin-label">Featured images</label>

					{existingImage && featuredImages.length === 0 && (
						<div className="advert-form-image mb-2">
							<img src={existingImage} alt="Current" />
							<span className="advert-form-image-hint">
								Current image — upload new ones to replace.
							</span>
						</div>
					)}

					{featuredImages.length > 0 && (
						<div className="advert-form-image-row mb-2">
							{featuredImages.map((f, i) => (
								<div key={i} className="advert-form-image">
									<img src={URL.createObjectURL(f)} alt={`New ${i + 1}`} />
								</div>
							))}
							<span className="advert-form-image-hint">
								{featuredImages.length} new file{featuredImages.length > 1 ? 's' : ''} selected.
							</span>
						</div>
					)}

					<input
						type="file"
						accept="image/*"
						multiple
						className="admin-input"
						onChange={handleFiles}
					/>
				</Col>

				<Col md={12}>
					<label className="admin-label">Content</label>
					{errors.content && <div className="invalid-feedback d-block mb-1">{errors.content}</div>}
					<div className="blog-editor-wrap">
						<Editor
							apiKey={TINYMCE_KEY}
							value={form.content}
							onEditorChange={(html) => set('content', html)}
							init={{
								license_key: 'gpl',
								height: 340,
								forced_root_block: 'div',
								menubar: true,
								plugins: [
									'advlist', 'autolink', 'lists', 'link', 'image',
									'charmap', 'preview', 'anchor', 'code',
								],
								toolbar:
									'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | code',
							}}
						/>
					</div>
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
							{isEdit ? 'Update advert' : 'Create advert'}
						</>
					)}
				</button>
			</div>
		</form>
	);
};

/* ================= PAGE ================= */
const Advert = () => {
	const [adverts, setAdverts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [search, setSearch] = useState('');

	const [modalOpen, setModalOpen] = useState(false);
	const [editingAdvert, setEditingAdvert] = useState(null);

	const [deleteId, setDeleteId] = useState(null);
	const [deleting, setDeleting] = useState(false);

	/* ---------- Fetch ---------- */
	const fetchAdverts = async () => {
		setLoading(true);
		setError('');
		try {
			const token = getToken();
			if (!token) throw new Error('Not authenticated.');

			const res = await axios.get(`${BASE_URL}/admin/get/advertisements`, {
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

			setAdverts(list);
		} catch (err) {
			setError(err?.response?.data?.message || 'Failed to fetch advertisements.');
			setAdverts([]);
		} finally {
			setLoading(false);
		}
	};

	const fetchCategories = async () => {
		try {
			const token = getToken();
			const res = await axios.get(`${BASE_URL}/admin/get/category/advert`, {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
			});
			const payload = res?.data?.data ?? res?.data ?? {};
			const list = Array.isArray(payload?.data) ? payload.data :
				Array.isArray(payload) ? payload : [];
			setCategories(list);
		} catch (err) {
			console.error('Category fetch failed:', err);
			setCategories([]);
		}
	};

	useEffect(() => {
		fetchAdverts();
		fetchCategories();
	}, []);

	/* ---------- Derived ---------- */
	const catMap = useMemo(() => {
		const m = new Map();
		categories.forEach(c => m.set(c.id, c.title || c.name || `#${c.id}`));
		return m;
	}, [categories]);

	const filtered = useMemo(() => {
		if (!search.trim()) return adverts;
		const q = search.toLowerCase();
		return adverts.filter(a =>
			String(a.title || '').toLowerCase().includes(q) ||
			String(a.destination || '').toLowerCase().includes(q)
		);
	}, [adverts, search]);

	/* ---------- Handlers ---------- */
	const openCreate = () => {
		setEditingAdvert(null);
		setModalOpen(true);
	};

	const openEdit = (advert) => {
		setEditingAdvert(advert);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setEditingAdvert(null);
	};

	const handleSaved = () => {
		setModalOpen(false);
		setEditingAdvert(null);
		fetchAdverts();
	};

	const confirmDelete = async () => {
		if (!deleteId) return;
		setDeleting(true);
		try {
			const token = getToken();
			if (!token) throw new Error('Not authenticated.');

			const fd = new FormData();
			fd.append('advert_id', deleteId);

			await axios.post(`${BASE_URL}/admin/delete/advertisement`, fd, {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
			});

			setAdverts(prev => prev.filter(a => a.id !== deleteId));
			setDeleteId(null);
		} catch (err) {
			console.error(err);
		} finally {
			setDeleting(false);
		}
	};

	const deletingTitle = (() => {
		if (deleteId == null) return '';
		const a = adverts.find(x => x.id === deleteId);
		return a?.title || '';
	})();

	/* ---------- Render ---------- */
	return (
		<AdminPageShell
			eyebrow="Marketing"
			title="Adverts"
			subtitle="Banners, popups, and sponsored content across the site."
			actions={
				<button type="button" className="dash-btn dash-btn--solid" onClick={openCreate}>
					<i className="bi bi-plus-lg me-2"></i>New advert
				</button>
			}
		>
			<div className="admin-card">
				<div className="admin-card-head">
					<h3 className="admin-card-title">All adverts</h3>

					<div className="admin-card-tools">
						<input
							type="search"
							className="admin-inline-search"
							placeholder="Search title or destination…"
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
						<p className="mt-3 mb-0 text-muted">Loading adverts…</p>
					</div>
				) : filtered.length === 0 ? (
					<div className="admin-empty">
						<div className="admin-empty-icon">
							<i className="bi bi-megaphone"></i>
						</div>
						<h3 className="admin-empty-title">No adverts running</h3>
						<p className="admin-empty-sub">
							{search
								? 'Try a different search term.'
								: 'Create your first banner or campaign to promote routes and offers.'}
						</p>
					</div>
				) : (
					<div className="dash-table-wrap">
						<table className="dash-table advert-table">
							<thead>
								<tr>
									<th style={{ minWidth: 200 }}>Title</th>
									<th style={{ minWidth: 140 }}>Destination</th>
									<th style={{ width: 130 }}>Fee</th>
									<th style={{ width: 130 }}>Start date</th>
									<th style={{ width: 130 }}>End date</th>
									<th style={{ width: 140 }}>Category</th>
									<th style={{ width: 110 }}></th>
								</tr>
							</thead>
							<tbody>
								{filtered.map(a => (
									<tr key={a.id}>
										<td className="dash-table-route">{a.title}</td>
										<td>{a.destination || '—'}</td>
										<td className="dash-table-amount">{formatCurrency(a.fee)}</td>
										<td className="dash-table-when">{formatDate(a.start_date)}</td>
										<td className="dash-table-when">{formatDate(a.end_date)}</td>
										<td>
											<span className="dash-status dash-status--refunded">
												{catMap.get(a.category_id) || `#${a.category_id}`}
											</span>
										</td>
										<td>
											<div className="markup-actions">
												<button
													type="button"
													className="admin-icon-btn"
													title="Edit advert"
													onClick={() => openEdit(a)}
												>
													<i className="bi bi-pencil-square"></i>
												</button>
												<button
													type="button"
													className="admin-icon-btn admin-icon-btn--danger"
													title="Delete advert"
													onClick={() => setDeleteId(a.id)}
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
				size="xl"
				className="admin-modal"
				backdrop="static"
				enforceFocus={false}
			>
				<BsModal.Header closeButton>
					<div>
						<h5 className="admin-modal-title">
							{editingAdvert ? 'Edit advert' : 'New advert'}
						</h5>
						<p className="admin-modal-sub">
							{editingAdvert
								? 'Update the details below and save.'
								: 'Fill in the details to publish a new advert.'}
						</p>
					</div>
				</BsModal.Header>
				<BsModal.Body>
					<AdvertForm
						initial={editingAdvert}
						categories={categories}
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
						<h5 className="admin-modal-title">Delete advert</h5>
						<p className="admin-modal-sub">This cannot be undone.</p>
					</div>
				</BsModal.Header>
				<BsModal.Body>
					<p className="fd-confirm-lead mb-0">
						Are you sure you want to delete{' '}
						<strong>{deletingTitle || 'this advert'}</strong>?
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

export default Advert;