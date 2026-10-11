import React, { useState } from 'react';
import AdminPageShell from '../../components/Admin/AdminPageShell';

const Profile = () => {
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	});

	const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

	return (
		<AdminPageShell
			eyebrow="Account"
			title="Profile"
			subtitle="Your personal information and preferences."
		>
			<div className="admin-card">
				<div className="admin-card-head">
					<h3 className="admin-card-title">Personal details</h3>
				</div>

				<div className="admin-form-grid">
					<div className="admin-form-field">
						<label className="admin-label">First name</label>
						<input
							type="text"
							className="admin-input"
							value={form.firstName}
							onChange={e => set('firstName', e.target.value)}
							placeholder="John"
						/>
					</div>

					<div className="admin-form-field">
						<label className="admin-label">Last name</label>
						<input
							type="text"
							className="admin-input"
							value={form.lastName}
							onChange={e => set('lastName', e.target.value)}
							placeholder="Doe"
						/>
					</div>

					<div className="admin-form-field">
						<label className="admin-label">Email</label>
						<input
							type="email"
							className="admin-input"
							value={form.email}
							onChange={e => set('email', e.target.value)}
							placeholder="you@example.com"
						/>
					</div>

					<div className="admin-form-field">
						<label className="admin-label">Phone</label>
						<input
							type="tel"
							className="admin-input"
							value={form.phone}
							onChange={e => set('phone', e.target.value)}
							placeholder="+234..."
						/>
					</div>
				</div>

				<div className="admin-form-actions">
					<button type="button" className="dash-btn dash-btn--ghost">Cancel</button>
					<button type="button" className="dash-btn dash-btn--solid">
						<i className="bi bi-check2 me-2"></i>Save changes
					</button>
				</div>
			</div>

			<div className="admin-card mt-4">
				<div className="admin-card-head">
					<h3 className="admin-card-title">Security</h3>
				</div>

				<div className="admin-form-actions admin-form-actions--start">
					<button type="button" className="dash-btn dash-btn--ghost">
						<i className="bi bi-key me-2"></i>Change password
					</button>
					<button type="button" className="dash-btn dash-btn--ghost">
						<i className="bi bi-shield-check me-2"></i>Enable 2FA
					</button>
				</div>
			</div>
		</AdminPageShell>
	);
};

export default Profile;