import { useState } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const LOGIN_URL = 'https://travels.ffsdgroup.com/api/admin/login';

const SignInModal = ({ show, handleClose, handleSwitchToRegister }) => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		savePassword: false,
	});

	const [errors, setErrors] = useState({});
	const [serverError, setServerError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
		// Clear field error as user types
		if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
		if (serverError) setServerError('');
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.email.trim()) newErrors.email = 'Email is required';
		else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
		if (!formData.password) newErrors.password = 'Password is required';
		else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setServerError('');

		const newErrors = validateForm();
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setLoading(true);
		try {
			const res = await fetch(LOGIN_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					email: formData.email.trim(),
					password: formData.password,
				}),
			});

			const text = await res.text();
			let data;
			try { data = JSON.parse(text); } catch { data = null; }

			if (!res.ok) {
				// Try to surface a server-provided message first
				const msg =
					data?.message ||
					data?.error ||
					data?.errors?.[0]?.message ||
					(data?.errors && typeof data.errors === 'object'
						? Object.values(data.errors).flat().join(' ')
						: null) ||
					(res.status === 401 ? 'Invalid email or password.' :
					 res.status === 422 ? 'Please check your credentials and try again.' :
					 res.status >= 500 ? 'Our server is busy. Please try again in a moment.' :
					 `Sign in failed (${res.status}).`);
				setServerError(msg);
				setLoading(false);
				return;
			}

			// Success — decide where to put the token
			const token =
				data?.accessToken ||
				data?.access_token ||
				data?.token ||
				data?.data?.accessToken ||
				data?.data?.token;

			if (token) {
				if (formData.savePassword) {
					localStorage.setItem('authToken', token);
				} else {
					sessionStorage.setItem('authToken', token);
				}
			}

			// Optional: store user info if present
			const user = data?.user || data?.data?.user || data?.admin || data?.data?.admin;
			if (user) {
				const where = formData.savePassword ? localStorage : sessionStorage;
				where.setItem('authUser', JSON.stringify(user));
			}

			// Reset form and close
			setFormData({ email: '', password: '', savePassword: false });
			setErrors({});
			setLoading(false);
			handleClose?.();

			// Optional redirect — remove if you stay on the page
			// navigate('/');
		} catch (err) {
			console.error('Sign in error:', err);
			setServerError('Network error. Please check your connection and try again.');
			setLoading(false);
		}
	};

	return (
		<Modal
			show={show}
			onHide={loading ? undefined : handleClose}
			centered
			size="md"
			className="auth-modal"
			backdrop={loading ? 'static' : true}
			keyboard={!loading}
		>
			<Modal.Header closeButton={!loading}>
				<Modal.Title>
					<h4 className="modal-title fs-6">Sign In / Register</h4>
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div className="modal-login-form py-4 px-md-3 px-0">
					{serverError && (
						<Alert variant="danger" className="py-2 px-3 small mb-3" dismissible onClose={() => setServerError('')}>
							<i className="bi bi-exclamation-circle me-2"></i>
							{serverError}
						</Alert>
					)}

					<Form onSubmit={handleSubmit} noValidate>
						<div className="form-floating mb-4">
							<input
								type="email"
								name="email"
								autoComplete="email"
								className={`form-control ${errors.email ? 'is-invalid' : ''}`}
								placeholder="name@example.com"
								value={formData.email}
								onChange={handleChange}
								disabled={loading}
							/>
							<label>Email</label>
							{errors.email && <div className="invalid-feedback">{errors.email}</div>}
						</div>

						<div className="form-floating mb-4">
							<input
								type="password"
								name="password"
								autoComplete="current-password"
								className={`form-control ${errors.password ? 'is-invalid' : ''}`}
								placeholder="Password"
								value={formData.password}
								onChange={handleChange}
								disabled={loading}
							/>
							<label>Password</label>
							{errors.password && <div className="invalid-feedback">{errors.password}</div>}
						</div>

						<Button
							variant="primary"
							type="submit"
							className="w-100 fw-bold btn-lg mb-3"
							disabled={loading}
						>
							{loading ? (
								<>
									<Spinner animation="border" size="sm" className="me-2" />
									Signing in…
								</>
							) : (
								'Log In'
							)}
						</Button>

						<div className="d-flex align-items-center justify-content-between mb-3">
							<Form.Check
								type="checkbox"
								label="Save Password"
								name="savePassword"
								checked={formData.savePassword}
								onChange={handleChange}
								id="savePassword"
								disabled={loading}
							/>
							<Link to="/forgot-password" className="text-primary fw-medium text-decoration-none">
								Forgot Password?
							</Link>
						</div>
					</Form>
				</div>

				<div className="prixer px-3">
					<div className="devider-wraps position-relative">
						<div className="devider-text text-muted-2 text-md">Sign In with More Methods</div>
					</div>
				</div>

				<div className="social-login py-4 px-2">
					<ul className="row align-items-center justify-content-between g-3 p-0 m-0">
						<li className="col">
							<Link to="#" className="square--60 border br-dashed rounded-2 full-width">
								<i className="fa-brands fa-facebook color--facebook fs-2"></i>
							</Link>
						</li>
						<li className="col">
							<Link to="#" className="square--60 border br-dashed rounded-2">
								<i className="fa-brands fa-whatsapp color--whatsapp fs-2"></i>
							</Link>
						</li>
						<li className="col">
							<Link to="#" className="square--60 border br-dashed rounded-2">
								<i className="fa-brands fa-linkedin color--linkedin fs-2"></i>
							</Link>
						</li>
						<li className="col">
							<Link to="#" className="square--60 border br-dashed rounded-2">
								<i className="fa-brands fa-dribbble color--dribbble fs-2"></i>
							</Link>
						</li>
						<li className="col">
							<Link to="#" className="square--60 border br-dashed rounded-2">
								<i className="fa-brands fa-twitter color--twitter fs-2"></i>
							</Link>
						</li>
					</ul>
				</div>
			</Modal.Body>

			<div className="modal-footer align-items-center justify-content-center">
				<p className="mb-0">
					Don't have an account yet?
					<Link
						to="/register"
						className="text-primary fw-medium ms-1"
						onClick={(e) => {
							if (handleSwitchToRegister) {
								e.preventDefault();
								handleSwitchToRegister();
							}
						}}
					>
						Sign Up
					</Link>
				</p>
			</div>
		</Modal>
	);
};

export default SignInModal;