import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal as BsModal } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import AdminPageShell from '../../components/Admin/AdminPageShell';

/* 🔧 Change this to your real API base */
const BASE_URL = 'https://test-travels.maypaspace.com/api';

/* ---------------- Constants for the form ---------------- */
const COUNTRIES = [
	{ code: 'NG', name: 'Nigeria' },
	{ code: 'GH', name: 'Ghana' },
	{ code: 'KE', name: 'Kenya' },
	{ code: 'ZA', name: 'South Africa' },
	{ code: 'EG', name: 'Egypt' },
	{ code: 'GB', name: 'United Kingdom' },
	{ code: 'US', name: 'United States' },
	{ code: 'AE', name: 'United Arab Emirates' },
];

const USER_TYPES = [
	{ value: 'admin',        label: 'Admin' },
	{ value: 'organization', label: 'Organization' },
	{ value: 'agent',        label: 'Agent' },
];

const PAYMENT_TYPES = [
	{ value: 'prepaid',  label: 'Prepaid' },
	{ value: 'postpaid', label: 'Postpaid' },
	{ value: 'wallet',   label: 'Wallet' },
];

const EMPTY_FORM = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	companyName: '',
	companyCountry: 'NG',
	user_type: 'organization',
	paymentType: 'prepaid',
	password: '',
};

/* ---------------- Helpers ---------------- */
const formatDate = (dateString) => {
	if (!dateString) return '—';
	const d = new Date(dateString);
	return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const STATUS_PILL = (type) => {
	switch ((type || '').toLowerCase()) {
		case 'admin':        return 'dash-status dash-status--paid';
		case 'organization': return 'dash-status dash-status--pending';
		case 'agent':        return 'dash-status dash-status--refunded';
		default:             return 'dash-status';
	}
};

/* ================= INLINE FORM ================= */
const UserForm = ({ user, onSubmit, onCancel }) => {
	const [form, setForm] = useState(EMPTY_FORM);
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState('');

	useEffect(() => {
		if (user) {
			setForm({
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				email: user.email || '',
				phone: user.phone || '',
				companyName: user.companyName || '',
				companyCountry: user.companyCountry || 'NG',
				user_type: user.user_type || 'organization',
				paymentType: user.paymentType || 'prepaid',
				password: '',
			});
		} else {
			setForm(EMPTY_FORM);
		}
		setErrors({});
		setServerError('');
	}, [user]);

	const set = (field, value) => {
		setForm(f => ({ ...f, [field]: value }));
		if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
		if (serverError) setServerError('');
	};

	const validate = () => {
		const e = {};
		if (!form.firstName.trim()) e.firstName = 'Required';
		if (!form.lastName.trim())  e.lastName  = 'Required';
		if (!form.email.trim())     e.email     = 'Required';
		else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
		if (!form.phone.trim())     e.phone     = 'Required';
		if (!form.user_type)        e.user_type = 'Required';
		if (form.user_type === 'organization' && !form.companyName.trim()) {
			e.companyName = 'Required for organization users';
		}
		if (!user && !form.password) e.password = 'Required';
		else if (!user && form.password.length < 6) e.password = 'At least 6 characters';
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
			// ⚠️ Wire your real API here:
			// const url = user ? `${BASE_URL}/users/${user.id}` : `${BASE_URL}/users/create`;
			// const method = user ? 'PUT' : 'POST';
			// const token = localStorage.getItem('authToken');
			// await axios({ url, method, data: form, headers: { Authorization: `Bearer ${token}` } });

			// Simulated success
			await new Promise(r => setTimeout(r, 700));

			const next = {
				...(user || {}),
				id: user?.id ?? Date.now(),
				firstName: form.firstName,
				lastName: form.lastName,
				email: form.email,
				phone: form.phone,
				companyName: form.companyName,
				companyCountry: form.companyCountry,
				user_type: form.user_type,
				paymentType: form.paymentType,
				created_at: user?.created_at ?? new Date().toISOString(),
				updated_at: new Date().toISOString(),
			};

			onSubmit?.(next);
		} catch (err) {
			console.error(err);
			setServerError(err?.message || 'Something went wrong. Please try again.');
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
				<Col md={6}>
					<label className="admin-label">First name</label>
					<input
						type="text"
						className={`admin-input ${errors.firstName ? 'is-invalid' : ''}`}
						value={form.firstName}
						onChange={e => set('firstName', e.target.value)}
						placeholder="John"
					/>
					{errors.firstName && <div className="invalid-feedback d-block">{errors.firstName}</div>}
				</Col>

				<Col md={6}>
					<label className="admin-label">Last name</label>
					<input
						type="text"
						className={`admin-input ${errors.lastName ? 'is-invalid' : ''}`}
						value={form.lastName}
						onChange={e => set('lastName', e.target.value)}
						placeholder="Doe"
					/>
					{errors.lastName && <div className="invalid-feedback d-block">{errors.lastName}</div>}
				</Col>

				<Col md={6}>
					<label className="admin-label">Email</label>
					<input
						type="email"
						className={`admin-input ${errors.email ? 'is-invalid' : ''}`}
						value={form.email}
						onChange={e => set('email', e.target.value)}
						placeholder="you@example.com"
					/>
					{errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
				</Col>

				<Col md={6}>
					<label className="admin-label">Phone</label>
					<input
						type="tel"
						className={`admin-input ${errors.phone ? 'is-invalid' : ''}`}
						value={form.phone}
						onChange={e => set('phone', e.target.value)}
						placeholder="+234 800 000 0000"
					/>
					{errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
				</Col>

				<Col md={6}>
					<label className="admin-label">User type</label>
					<select
						className={`admin-input ${errors.user_type ? 'is-invalid' : ''}`}
						value={form.user_type}
						onChange={e => set('user_type', e.target.value)}
					>
						{USER_TYPES.map(t => (
							<option key={t.value} value={t.value}>{t.label}</option>
						))}
					</select>
				</Col>

				<Col md={6}>
					<label className="admin-label">Payment type</label>
					<select
						className="admin-input"
						value={form.paymentType}
						onChange={e => set('paymentType', e.target.value)}
					>
						{PAYMENT_TYPES.map(t => (
							<option key={t.value} value={t.value}>{t.label}</option>
						))}
					</select>
				</Col>

				{form.user_type === 'organization' && (
					<>
						<Col md={6}>
							<label className="admin-label">Company name</label>
							<input
								type="text"
								className={`admin-input ${errors.companyName ? 'is-invalid' : ''}`}
								value={form.companyName}
								onChange={e => set('companyName', e.target.value)}
								placeholder="Acme Travels Ltd"
							/>
							{errors.companyName && <div className="invalid-feedback d-block">{errors.companyName}</div>}
						</Col>

						<Col md={6}>
							<label className="admin-label">Company country</label>
							<select
								className="admin-input"
								value={form.companyCountry}
								onChange={e => set('companyCountry', e.target.value)}
							>
								{COUNTRIES.map(c => (
									<option key={c.code} value={c.code}>{c.name}</option>
								))}
							</select>
						</Col>
					</>
				)}

				{!user && (
					<Col md={6}>
						<label className="admin-label">Temporary password</label>
						<input
							type="password"
							className={`admin-input ${errors.password ? 'is-invalid' : ''}`}
							value={form.password}
							onChange={e => set('password', e.target.value)}
							placeholder="At least 6 characters"
						/>
						{errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
					</Col>
				)}
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
							{user ? 'Update user' : 'Create user'}
						</>
					)}
				</button>
			</div>
		</form>
	);
};

/* ================= USERS PAGE ================= */
const Users = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	// Modal state — form lives only inside here
	const [modalOpen, setModalOpen] = useState(false);
	const [editingUser, setEditingUser] = useState(null);

	const [search, setSearch] = useState('');

	/* ---------- Fetch ---------- */
	useEffect(() => {
		let cancelled = false;

		const fetchUsers = async () => {
			setLoading(true);
			setError('');
			try {
				const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
				const res = await axios.get(`${BASE_URL}/users/all?page=${page}`, {
					headers: {
						Authorization: token ? `Bearer ${token}` : undefined,
						Accept: 'application/json',
					},
				});

				const payload = res?.data?.users ?? res?.data;
				const list = payload?.data ?? payload ?? [];
				const current = payload?.current_page ?? page;
				const last = payload?.last_page ?? 1;

				if (!cancelled) {
					setUsers(
						list.map(u => ({
							...u,
							name: `${u.lastName ?? ''} ${u.firstName ?? ''}`.trim() || u.email,
						}))
					);
					setLastPage(last);
					if (current !== page) setPage(current);
				}
			} catch (err) {
				if (!cancelled) {
					const msg = err?.response?.data?.message || 'Could not load users. Please try again.';
					setError(msg);
					setUsers([]);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		fetchUsers();
		return () => { cancelled = true; };
	}, [page]);

	/* ---------- Derived ---------- */
	const filteredUsers = users.filter(u => {
		if (!search.trim()) return true;
		const q = search.toLowerCase();
		return (
			u.name?.toLowerCase().includes(q) ||
			u.email?.toLowerCase().includes(q) ||
			u.phone?.toLowerCase().includes(q)
		);
	});

	/* ---------- Modal handlers ---------- */
	const openCreate = () => {
		setEditingUser(null);
		setModalOpen(true);
	};

	const openEdit = (user) => {
		setEditingUser(user);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setEditingUser(null);
	};

	const handleSubmit = (next) => {
		setUsers(prev => {
			const exists = prev.some(u => u.id === next.id);
			if (exists) {
				return prev.map(u => (u.id === next.id ? { ...u, ...next } : u));
			}
			return [next, ...prev];
		});
		closeModal();
	};

	return (
		<AdminPageShell
			eyebrow="Accounts"
			title="Users"
			subtitle="Manage registered customers, organizations, and staff."
			actions={
				<button type="button" className="dash-btn dash-btn--solid" onClick={openCreate}>
					<i className="bi bi-person-plus me-2"></i>Create user
				</button>
			}
		>
			{/* -------- List card -------- */}
			<div className="admin-card">
				<div className="admin-card-head">
					<h3 className="admin-card-title">All users</h3>

					<div className="admin-card-tools">
						<input
							type="search"
							className="admin-inline-search"
							placeholder="Search name, email, phone…"
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
						<span className="dash-muted">{filteredUsers.length} shown</span>
					</div>
				</div>

				{error && <div className="alert alert-danger mb-3">{error}</div>}

				{loading ? (
					<div className="admin-table-loading">
						<div className="spinner-border text-danger" role="status" />
						<p className="mt-3 mb-0 text-muted">Loading users…</p>
					</div>
				) : filteredUsers.length === 0 ? (
					<div className="admin-empty">
						<div className="admin-empty-icon">
							<i className="bi bi-people"></i>
						</div>
						<h3 className="admin-empty-title">No users found</h3>
						<p className="admin-empty-sub">
							{search ? 'Try a different search term.' : 'Create your first user to get started.'}
						</p>
					</div>
				) : (
					<>
						<div className="dash-table-wrap">
							<table className="dash-table">
								<thead>
									<tr>
										<th>Name</th>
										<th>User type</th>
										<th>Phone</th>
										<th>Email</th>
										<th>Created</th>
										<th>Updated</th>
										<th style={{ width: 60 }}></th>
									</tr>
								</thead>
								<tbody>
									{filteredUsers.map(u => (
										<tr key={u.id}>
											<td className="dash-table-route">{u.name}</td>
											<td>
												<span className={STATUS_PILL(u.user_type)}>
													{u.user_type || '—'}
												</span>
											</td>
											<td>{u.phone || '—'}</td>
											<td>{u.email || '—'}</td>
											<td className="dash-table-when">{formatDate(u.created_at)}</td>
											<td className="dash-table-when">{formatDate(u.updated_at)}</td>
											<td>
												<button
													type="button"
													className="admin-icon-btn"
													onClick={() => openEdit(u)}
													aria-label={`Edit ${u.name}`}
												>
													<i className="bi bi-pencil-square"></i>
												</button>
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

			{/* -------- Modal (contains the inline form) -------- */}
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
							{editingUser ? 'Edit user' : 'Create user'}
						</h5>
						<p className="admin-modal-sub">
							{editingUser
								? 'Update the details below and save.'
								: 'Add an admin, organization, or agent account.'}
						</p>
					</div>
				</BsModal.Header>

				<BsModal.Body>
					<UserForm
						user={editingUser}
						onSubmit={handleSubmit}
						onCancel={closeModal}
					/>
				</BsModal.Body>
			</BsModal>
		</AdminPageShell>
	);
};

export default Users;