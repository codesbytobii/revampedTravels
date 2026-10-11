import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
	const location = useLocation();
	const token =
		localStorage.getItem('authToken') ||
		sessionStorage.getItem('authToken');

	if (!token) {
		return <Navigate to="/" replace state={{ from: location }} />;
	}

	return <>{children}</>;
};

export default RequireAuth;