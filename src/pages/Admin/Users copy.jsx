import React from 'react';
import AdminPageShell from '../../components/Admin/AdminPageShell';
import AdminEmptyState from '../../components/Admin/AdminEmptyState';

const Users = () => (
	<AdminPageShell
		eyebrow="Accounts"
		title="Users"
		subtitle="Manage registered customers and staff accounts."
		actions={
			<button type="button" className="dash-btn dash-btn--solid">
				<i className="bi bi-person-plus me-2"></i>Add user
			</button>
		}
	>
		<AdminEmptyState
			icon="bi-people"
			title="No users to display yet"
			message="Once users register or you add staff accounts, they'll appear here with their roles and activity."
		/>
	</AdminPageShell>
);

export default Users;