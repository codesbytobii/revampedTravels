import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Modal as BsModal, Row, Col } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import { Link } from 'react-router-dom';
import AdminPageShell from '../../components/Admin/AdminPageShell';
import { getToken } from '../../utils/auth';

/* 🔧 Real API base + media prefix */
const BASE_URL  = 'https://test-travels.maypaspace.com/api';
const MEDIA_URL = 'https://test-travels.maypaspace.com/storage';

const TINYMCE_KEY = 'owhix8rdfvcdc0l3oxqpy11lqmvorndyyj1jgbcdhpjijgh4';

/* ---------------- Helpers ---------------- */
const formatDate = (dateString) => {
	if (!dateString) return '—';
	return new Date(dateString).toLocaleDateString('en-GB', {
		day: '2-digit', month: 'short', year: 'numeric',
	});
};

const stripHtml = (html) => (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const slugify = (s) =>
	s.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

/* ================= INLINE FORM ================= */
const EMPTY_FORM = {
	title: '',
	slug: '',
	excerpt: '',
	content: '',
	tags: '',
	categoryId: '',
};

const BlogForm = ({ initial, categories, onSubmit, onCancel }) => {
	const [form, setForm] = useState(EMPTY_FORM);
	const [featuredImage, setFeaturedImage] = useState(null);          // new File
	const [existingImage, setExistingImage] = useState(null);          // URL to keep
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState('');
	const isEdit = !!initial?.id;

	useEffect(() => {
		if (initial) {
			setForm({
				title: initial.title || '',
				slug: initial.slug || '',
				excerpt: initial.excerpt || '',
				content: initial.post_content || initial.content || '',
				tags: initial.tags || '',
				categoryId: initial.category_id ? String(initial.category_id) : '',
			});
			setExistingImage(initial.featured_image ? `${MEDIA_URL}/${initial.featured_image}` : null);
		} else {
			setForm(EMPTY_FORM);
			setExistingImage(null);
		}
		setFeaturedImage(null);
		setErrors({});
		setServerError('');
	}, [initial]);

	const set = (field, value) => {
		setForm(f => ({ ...f, [field]: value }));
		if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
		if (serverError) setServerError('');
	};

	/* auto-generate slug from title when creating */
	const handleTitleChange = (value) => {
		set('title', value);
		if (!isEdit && !form.slug) set('slug', slugify(value));
	};

	const validate = () => {
		const e = {};
		if (!form.title.trim()) e.title = 'Required';
		if (!form.slug.trim()) e.slug = 'Required';
		if (!form.excerpt.trim()) e.excerpt = 'Required';
		if (!form.content.trim()) e.content = 'Required';
		if (!form.categoryId) e.categoryId = 'Required';
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
			fd.append('title', form.title.trim());
			fd.append('slug', form.slug.trim());
			fd.append('excerpt', form.excerpt.trim());
			fd.append('post_content', form.content);
			fd.append('tags', form.tags.trim());
			fd.append('category_id', form.categoryId);

			if (featuredImage) {
				fd.append('featured_image', featuredImage);
			} else if (existingImage) {
				fd.append('existing_images', existingImage);
			}

			const url = isEdit
				? `${BASE_URL}/admin/blogs/update/${initial.id}`
				: `${BASE_URL}/admin/create/blogs`;

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
					s.title ||
					s.excerpt ||
					s.post_content ||
					s.content ||
					s.category_id ||
					s.slug ||
					Object.values(s).flat()[0]
				)) ||
				err?.response?.data?.message ||
				err?.message ||
				'Failed to save blog.';
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
						onChange={e => handleTitleChange(e.target.value)}
						placeholder="e.g. How to plan your first international trip"
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
							<option key={c.id} value={c.id}>{c.name}</option>
						))}
					</select>
					{errors.categoryId && <div className="invalid-feedback d-block">{errors.categoryId}</div>}
				</Col>

				<Col md={8}>
					<label className="admin-label">Slug</label>
					<input
						type="text"
						className={`admin-input ${errors.slug ? 'is-invalid' : ''}`}
						value={form.slug}
						onChange={e => set('slug', e.target.value)}
						placeholder="how-to-plan-your-first-international-trip"
					/>
					{errors.slug && <div className="invalid-feedback d-block">{errors.slug}</div>}
					<p className="admin-field-hint">Used in the public URL: /blog/{form.slug || 'your-slug'}</p>
				</Col>

				<Col md={4}>
					<label className="admin-label">Tags</label>
					<input
						type="text"
						className="admin-input"
						value={form.tags}
						onChange={e => set('tags', e.target.value)}
						placeholder="Travel, Visa, Tips"
					/>
					<p className="admin-field-hint">Comma or space separated.</p>
				</Col>

				<Col md={12}>
					<label className="admin-label">Excerpt</label>
					<textarea
						className={`admin-input ${errors.excerpt ? 'is-invalid' : ''}`}
						rows={2}
						value={form.excerpt}
						onChange={e => set('excerpt', e.target.value)}
						placeholder="A short summary shown on the list page."
					/>
					{errors.excerpt && <div className="invalid-feedback d-block">{errors.excerpt}</div>}
				</Col>

				<Col md={12}>
					<label className="admin-label">Featured image</label>

					{existingImage && !featuredImage && (
						<div className="blog-form-image-preview mb-2">
							<img src={existingImage} alt="Current" />
							<span className="blog-form-image-hint">Current image — upload a new one to replace it.</span>
						</div>
					)}

					{featuredImage && (
						<div className="blog-form-image-preview mb-2">
							<img src={URL.createObjectURL(featuredImage)} alt="New" />
							<span className="blog-form-image-hint">New image selected.</span>
						</div>
					)}

					<input
						type="file"
						accept="image/*"
						className="admin-input"
						onChange={e => {
							if (e.target.files?.length) setFeaturedImage(e.target.files[0]);
						}}
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
								height: 380,
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
							{isEdit ? 'Update blog' : 'Create blog'}
						</>
					)}
				</button>
			</div>
		</form>
	);
};

/* ================= PAGE ================= */
const Blog = () => {
	const [blogs, setBlogs] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [search, setSearch] = useState('');

	const [modalOpen, setModalOpen] = useState(false);
	const [editingBlog, setEditingBlog] = useState(null);

	const [deleteId, setDeleteId] = useState(null);
	const [deleting, setDeleting] = useState(false);

	/* ---------- Fetch ---------- */
	const fetchBlogs = async () => {
		setLoading(true);
		setError('');
		try {
			const token = getToken();
			if (!token) throw new Error('Not authenticated.');

			const res = await axios.get(`${BASE_URL}/admin/blogs/get`, {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
			});

			// Support: { data: { data: [...] } } or { data: [...] }
			const list =
				Array.isArray(res?.data?.data?.data) ? res.data.data.data :
				Array.isArray(res?.data?.data) ? res.data.data :
				Array.isArray(res?.data) ? res.data :
				[];

			setBlogs(list);
		} catch (err) {
			setError(err?.response?.data?.message || 'Failed to fetch blogs.');
			setBlogs([]);
		} finally {
			setLoading(false);
		}
	};

	const fetchCategories = async () => {
		try {
			const token = getToken();
			const res = await axios.get(`${BASE_URL}/admin/blog/categories`, {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
			});
			const list =
				Array.isArray(res?.data?.data) ? res.data.data :
				Array.isArray(res?.data) ? res.data :
				[];
			setCategories(list);
		} catch (err) {
			console.error('Category fetch failed:', err);
			setCategories([]);
		}
	};

	useEffect(() => {
		fetchBlogs();
		fetchCategories();
	}, []);

	/* ---------- Derived ---------- */
	const filtered = useMemo(() => {
		if (!search.trim()) return blogs;
		const q = search.toLowerCase();
		return blogs.filter(b =>
			String(b.title || '').toLowerCase().includes(q) ||
			String(b.slug || '').toLowerCase().includes(q) ||
			String(b.tags || '').toLowerCase().includes(q)
		);
	}, [blogs, search]);

	/* ---------- Handlers ---------- */
	const openCreate = () => {
		setEditingBlog(null);
		setModalOpen(true);
	};

	const openEdit = (blog) => {
		setEditingBlog(blog);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setEditingBlog(null);
	};

	const handleSaved = (saved) => {
		setModalOpen(false);
		setEditingBlog(null);

		if (saved && saved.id) {
			setBlogs(prev => {
				const exists = prev.some(b => b.id === saved.id);
				if (exists) return prev.map(b => (b.id === saved.id ? { ...b, ...saved } : b));
				return [saved, ...prev];
			});
		} else {
			fetchBlogs();
		}
	};

	const confirmDelete = async () => {
		if (!deleteId) return;
		setDeleting(true);
		try {
			const token = getToken();
			if (!token) throw new Error('Not authenticated.');

			const fd = new FormData();
			fd.append('id', deleteId);

			await axios.post(`${BASE_URL}/admin/blogs/delete/${deleteId}`, fd, {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
			});

			setBlogs(prev => prev.filter(b => b.id !== deleteId));
			setDeleteId(null);
		} catch (err) {
			console.error(err);
		} finally {
			setDeleting(false);
		}
	};

	const deletingTitle = (() => {
		if (deleteId == null) return '';
		const b = blogs.find(x => x.id === deleteId);
		return b?.title || '';
	})();

	/* ---------- Render ---------- */
	return (
		<AdminPageShell
			eyebrow="Content"
			title="Blog"
			subtitle="Articles, guides, and updates published on your site."
			actions={
				<>
					<Link to="/admin/blog-category" className="dash-btn dash-btn--ghost">
						<i className="bi bi-tags me-2"></i>Manage categories
					</Link>
					<button type="button" className="dash-btn dash-btn--solid" onClick={openCreate}>
						<i className="bi bi-pencil me-2"></i>New post
					</button>
				</>
			}
		>
			<div className="admin-card">
				<div className="admin-card-head">
					<h3 className="admin-card-title">All posts</h3>

					<div className="admin-card-tools">
						<input
							type="search"
							className="admin-inline-search"
							placeholder="Search title, slug, tags…"
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
						<p className="mt-3 mb-0 text-muted">Loading posts…</p>
					</div>
				) : filtered.length === 0 ? (
					<div className="admin-empty">
						<div className="admin-empty-icon">
							<i className="bi bi-journal-richtext"></i>
						</div>
						<h3 className="admin-empty-title">No posts yet</h3>
						<p className="admin-empty-sub">
							{search
								? 'Try a different search term.'
								: 'Write your first article to share travel tips, route updates, or company news.'}
						</p>
					</div>
				) : (
					<div className="dash-table-wrap">
						<table className="dash-table blog-admin-table">
							<thead>
								<tr>
									<th style={{ width: 60 }}>ID</th>
									<th style={{ width: 90 }}>Image</th>
									<th style={{ minWidth: 220 }}>Title</th>
									<th style={{ minWidth: 180 }}>Excerpt</th>
									<th style={{ width: 120 }}>Category</th>
									<th style={{ width: 140 }}>Created</th>
									<th style={{ width: 110 }}></th>
								</tr>
							</thead>
							<tbody>
								{filtered.map(b => {
									const cat = categories.find(c => c.id === b.category_id);
									return (
										<tr key={b.id}>
											<td className="dash-table-id">{b.id}</td>
											<td>
												{b.featured_image ? (
													<img
														src={`${MEDIA_URL}/${b.featured_image}`}
														alt={b.title}
														className="blog-admin-thumb"
														onError={e => { e.currentTarget.style.visibility = 'hidden'; }}
													/>
												) : (
													<span className="text-muted small">—</span>
												)}
											</td>
											<td className="dash-table-route">{b.title}</td>
											<td className="bc-desc" title={b.excerpt}>
												{b.excerpt || stripHtml(b.post_content).slice(0, 100)}
											</td>
											<td>
												<span className="dash-status dash-status--refunded">
													{cat?.name || `#${b.category_id}`}
												</span>
											</td>
											<td className="dash-table-when">{formatDate(b.created_at)}</td>
											<td>
												<div className="markup-actions">
													<button
														type="button"
														className="admin-icon-btn"
														title="Edit post"
														onClick={() => openEdit(b)}
													>
														<i className="bi bi-pencil-square"></i>
													</button>
													<button
														type="button"
														className="admin-icon-btn admin-icon-btn--danger"
														title="Delete post"
														onClick={() => setDeleteId(b.id)}
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
							{editingBlog ? 'Edit blog post' : 'New blog post'}
						</h5>
						<p className="admin-modal-sub">
							{editingBlog
								? 'Update the details below and save.'
								: 'Fill in the details to publish a new post.'}
						</p>
					</div>
				</BsModal.Header>
				<BsModal.Body>
					<BlogForm
						initial={editingBlog}
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
						<h5 className="admin-modal-title">Delete post</h5>
						<p className="admin-modal-sub">This cannot be undone.</p>
					</div>
				</BsModal.Header>
				<BsModal.Body>
					<p className="fd-confirm-lead mb-0">
						Are you sure you want to delete{' '}
						<strong>{deletingTitle || 'this post'}</strong>? It will be removed from your public blog.
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

export default Blog;