// src/utils/auth.js

const BASE_URL = 'https://test.ffsdtravels.com/api';

/* ---------- Token ---------- */
export const getToken = () =>
	localStorage.getItem('authToken') ||
	localStorage.getItem('userToken') ||
	localStorage.getItem('accessToken') ||
	sessionStorage.getItem('authToken') ||
	sessionStorage.getItem('userToken') ||
	sessionStorage.getItem('accessToken') ||
	null;

export const setToken = (token) => {
	if (!token) return;
	localStorage.setItem('authToken', token);
};

export const clearToken = () => {
	['authToken', 'userToken', 'accessToken', 'token', 'api_token', 'authUser'].forEach(k => {
		localStorage.removeItem(k);
		sessionStorage.removeItem(k);
	});
};

/* ---------- Logout ----------
   Calls the backend logout endpoint, clears local state, and
   resolves regardless of whether the API call succeeded — the
   important thing is the user is signed out locally.
*/
export const logout = async () => {
	const token = getToken();

	try {
		if (token) {
			await fetch(`${BASE_URL}/logout`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
		}
	} catch (err) {
		// Endpoint may be down — still log the user out locally
		console.warn('Logout API failed:', err);
	} finally {
		clearToken();
	}
};