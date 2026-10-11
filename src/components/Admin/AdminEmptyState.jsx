import React from 'react';

const AdminEmptyState = ({ icon = 'bi-inbox', title, message, action }) => (
	<div className="admin-card admin-empty">
		<div className="admin-empty-icon">
			<i className={`bi ${icon}`}></i>
		</div>
		<h3 className="admin-empty-title">{title}</h3>
		{message && <p className="admin-empty-sub">{message}</p>}
		{action}
	</div>
);

export default AdminEmptyState;