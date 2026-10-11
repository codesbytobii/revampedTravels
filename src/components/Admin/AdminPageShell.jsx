import React from 'react';

const AdminPageShell = ({ eyebrow, title, subtitle, actions, children }) => (
	<>
		<div className="admin-page-intro">
			<div>
				{eyebrow && <span className="admin-eyebrow">{eyebrow}</span>}
				<h2 className="admin-heading">{title}</h2>
				{subtitle && <p className="admin-sub">{subtitle}</p>}
			</div>

			{actions && <div className="dash-intro-actions">{actions}</div>}
		</div>

		{children}
	</>
);

export default AdminPageShell;