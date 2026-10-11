import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

const NAV_ITEMS = [
	{ to: '/admin/dashboard',     icon: 'bi-grid-1x2',          label: 'Dashboard' },
	{ to: '/admin/flights',       icon: 'bi-airplane-engines',  label: 'Flight Search' },
	{ to: '/admin/users',         icon: 'bi-person-plus',       label: 'Users' },
	{ to: '/admin/permissions',   icon: 'bi-shield-lock',       label: 'Permissions' },
	{ to: '/admin/flight-data',   icon: 'bi-file-earmark-text', label: 'Flight Data' },
	{ to: '/admin/markup',        icon: 'bi-currency-exchange', label: 'Markup' },
	{ to: '/admin/testimonial',   icon: 'bi-chat-square-quote', label: 'Testimonial' },
	{ to: '/admin/category',      icon: 'bi-grid-3x3-gap',      label: 'Category' },
	{ to: '/admin/advert',        icon: 'bi-megaphone',         label: 'Advert' },
	{ to: '/admin/leads',         icon: 'bi-megaphone-fill',    label: 'Leads' },
	{ to: '/admin/blog-category', icon: 'bi-journal-text',      label: 'BlogCategory' },
	{ to: '/admin/blog',          icon: 'bi-journal-richtext',  label: 'Blog' },
	{ to: '/admin/profile',       icon: 'bi-person-circle',     label: 'Profile' },
];

const AdminSidebar = ({ open = false, onClose }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate('/');
	};

	const handleLinkClick = () => {
		// Let the caller close the drawer (no-op on desktop)
		if (typeof onClose === 'function') onClose();
	};

	return (
		<aside className={`admin-sidebar ${open ? 'is-open' : ''}`}>
			{/* Mobile header with close button */}
			<div className="admin-sidebar-head">
				<Link to="/admin/dashboard" className="admin-brand-link" onClick={handleLinkClick}>
					<span className="admin-brand-mark">FFS</span>
					<span className="admin-brand-text">Travels</span>
				</Link>

				<button
					type="button"
					className="admin-sidebar-close"
					onClick={onClose}
					aria-label="Close menu"
				>
					<i className="bi bi-x-lg"></i>
				</button>
			</div>

			<nav className="admin-nav">
				{NAV_ITEMS.map(item => {
					const active =
						location.pathname === item.to ||
						location.pathname.startsWith(item.to + '/');
					return (
						<Link
							key={item.to}
							to={item.to}
							className={`admin-nav-item ${active ? 'is-active' : ''}`}
							onClick={handleLinkClick}
						>
							<i className={`bi ${item.icon}`}></i>
							<span>{item.label}</span>
						</Link>
					);
				})}
			</nav>

			<div className="admin-nav admin-nav--bottom">
				<button type="button" className="admin-nav-item" onClick={handleLogout}>
					<i className="bi bi-box-arrow-right"></i>
					<span>Logout</span>
				</button>
			</div>

			<div className="admin-sidebar-foot">
				<span className="admin-sidebar-foot-line" />
				<span className="admin-sidebar-foot-text">
					FFSD Travels · {new Date().getFullYear()}
				</span>
			</div>
		</aside>
	);
};

export default AdminSidebar;