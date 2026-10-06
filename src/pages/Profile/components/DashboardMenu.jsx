import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { to: '/my-profile', label: 'My Profile', icon: 'fa-regular fa-id-card' },
    { to: '/my-booking', label: 'My Booking', icon: 'fa-solid fa-ticket' },
    { to: '/travelers', label: 'Travelers', icon: 'fa-solid fa-user-group' },
    { to: '/payment-detail', label: 'Payment Details', icon: 'fa-solid fa-wallet' },
    { to: '/my-wishlists', label: 'My Wishlist', icon: 'fa-solid fa-shield-heart' },
    { to: '/settings', label: 'Settings', icon: 'fa-solid fa-sliders' },
    { to: '/delete-account', label: 'Delete Profile', icon: 'fa-solid fa-trash-can' },
    { to: '/login', label: 'Sign Out', icon: 'fa-solid fa-power-off' },
];

const DashboardMenu = ({ long = false }) => {
    const location = useLocation();
    const className = long ? 'user-Dashboard-longmenu' : 'user-Dashboard-menu';
    
    return (
        <ul className={className}>
            {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                
                return (
                    <li key={item.icon} className={isActive ? 'active' : ''}>
                        <Link to={item.to}>
                            <i className={`${item.icon} me-2`}></i>
                            {item.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default DashboardMenu;