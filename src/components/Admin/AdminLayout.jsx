import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import RequireAuth from '../Auth/RequireAuth';
import AdminSidebar from './AdminSidebar';
import { logout } from '../../utils/auth';

const NAV_FOR_TITLE = {
	'/admin/dashboard':     'Dashboard',
	// '/admin/flights':       'Flight Search',
	'/admin/users':         'Users',
	// '/admin/permissions':   'Permissions',
	'/admin/flight-data':   'Flight Data',
	'/admin/markup':        'Markup',
	'/admin/testimonial':   'Testimonial',
	'/admin/category':      'Category',
	'/admin/advert':        'Advert',
	'/admin/leads':         'Leads',
	'/admin/blog-category': 'Blog Category',
	'/admin/blog':          'Blog',
	// '/admin/profile':       'Profile',
};

const pageTitleFor = (pathname) => {
	if (NAV_FOR_TITLE[pathname]) return NAV_FOR_TITLE[pathname];
	const keys = Object.keys(NAV_FOR_TITLE).sort((a, b) => b.length - a.length);
	const hit = keys.find(k => pathname.startsWith(k));
	return hit ? NAV_FOR_TITLE[hit] : 'Admin';
};

const readUser = () => {
	try {
		const raw =
			localStorage.getItem('authUser') ||
			sessionStorage.getItem('authUser');
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
};

const AdminLayout = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [search, setSearch] = useState('');
	const [profileOpen, setProfileOpen] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const inputRef = useRef(null);
	const profileRef = useRef(null);

	const user = readUser();
	const displayName =
		user?.name ||
		[user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
		user?.email?.split('@')[0] ||
		'Admin';
	const role = user?.user_type || user?.role || 'Administrator';
	const initials = displayName
		.split(' ')
		.map(w => w[0])
		.filter(Boolean)
		.slice(0, 2)
		.join('')
		.toUpperCase();

	/* Close the mobile sidebar whenever the route changes */
	useEffect(() => {
		setSidebarOpen(false);
	}, [location.pathname]);

	/* ⌘K / Ctrl+K focuses search */
	useEffect(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				inputRef.current?.focus();
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	/* Close profile dropdown on outside click */
	useEffect(() => {
		const onDoc = (e) => {
			if (profileRef.current && !profileRef.current.contains(e.target)) {
				setProfileOpen(false);
			}
		};
		document.addEventListener('mousedown', onDoc);
		return () => document.removeEventListener('mousedown', onDoc);
	}, []);

	/* Lock scroll while the mobile sidebar is open */
	useEffect(() => {
		if (sidebarOpen) {
			document.body.classList.add('admin-sidebar-open');
		} else {
			document.body.classList.remove('admin-sidebar-open');
		}
		return () => document.body.classList.remove('admin-sidebar-open');
	}, [sidebarOpen]);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		const q = search.trim();
		if (!q) return;
		console.log('[admin search]', q);
		setSearch('');
	};

	const handleLogout = async () => {
		setProfileOpen(false);
		await logout();
		navigate('/');
	};

	return (
		<RequireAuth>
			<div className={`admin-shell ${sidebarOpen ? 'sidebar-is-open' : ''}`}>
				{/* Backdrop — click to close on mobile */}
				<div
					className={`admin-backdrop ${sidebarOpen ? 'is-visible' : ''}`}
					onClick={() => setSidebarOpen(false)}
					aria-hidden="true"
				/>

				<AdminSidebar
					open={sidebarOpen}
					onClose={() => setSidebarOpen(false)}
				/>

				<main className="admin-main">
					<header className="admin-topbar">
						{/* Hamburger — only visible on small screens */}
						<button
							type="button"
							className="admin-menu-btn"
							aria-label="Open menu"
							aria-expanded={sidebarOpen}
							onClick={() => setSidebarOpen(o => !o)}
						>
							<i className={`bi ${sidebarOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
						</button>

						<form className="admin-search" onSubmit={handleSearchSubmit} role="search">
							<i className="bi bi-search admin-search-icon" aria-hidden="true"></i>
							<input
								ref={inputRef}
								type="search"
								className="admin-search-input"
								placeholder={`Search ${pageTitleFor(location.pathname).toLowerCase()}…`}
								aria-label="Search admin"
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
							{search ? (
								<button
									type="button"
									className="admin-search-clear"
									aria-label="Clear search"
									onClick={() => setSearch('')}
								>
									<i className="bi bi-x-lg"></i>
								</button>
							) : (
								<span className="admin-search-kbd" aria-hidden="true">⌘K</span>
							)}
						</form>

						<div className="admin-topbar-right">
							<button
								type="button"
								className="admin-icon-action"
								aria-label="Notifications"
							>
								<i className="bi bi-bell"></i>
								<span className="admin-icon-action-dot" aria-hidden="true" />
							</button>

							<span className="admin-topbar-divider-v" aria-hidden="true" />

							<div className="admin-user" ref={profileRef}>
								<button
									type="button"
									className={`admin-user-btn ${profileOpen ? 'is-open' : ''}`}
									onClick={() => setProfileOpen(o => !o)}
									aria-haspopup="menu"
									aria-expanded={profileOpen}
								>
									<span className="admin-user-avatar">
										{initials || <i className="bi bi-person-fill"></i>}
									</span>
									<span className="admin-user-info">
										<span className="admin-user-name">{displayName}</span>
										<span className="admin-user-role">{role}</span>
									</span>
									<i className={`bi bi-chevron-down admin-user-chev ${profileOpen ? 'is-open' : ''}`}></i>
								</button>

								{profileOpen && (
									<div className="admin-user-menu" role="menu">
										<button
											type="button"
											role="menuitem"
											className="admin-user-menu-item"
											onClick={() => { setProfileOpen(false); navigate('/admin/profile'); }}
										>
											<i className="bi bi-person"></i>
											Profile
										</button>
										<button
											type="button"
											role="menuitem"
											className="admin-user-menu-item"
											onClick={() => { setProfileOpen(false); navigate('/admin/permissions'); }}
										>
											<i className="bi bi-shield-lock"></i>
											Permissions
										</button>
										<span className="admin-user-menu-sep" />
										<button
											type="button"
											role="menuitem"
											className="admin-user-menu-item admin-user-menu-item--danger"
											onClick={handleLogout}
										>
											<i className="bi bi-box-arrow-right"></i>
											Sign out
										</button>
									</div>
								)}
							</div>
						</div>
					</header>

					<div className="admin-content">
						<Outlet />
					</div>
				</main>
			</div>
		</RequireAuth>
	);
};

export default AdminLayout;