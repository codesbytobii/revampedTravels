import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignInModal = ({ show, handleClose, handleSwitchToRegister }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        savePassword: false
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            alert('Sign In Successful!');
            handleClose();
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="md" className="auth-modal">
            <Modal.Header closeButton>
                <Modal.Title>
                    <h4 className="modal-title fs-6">Sign In / Register</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-login-form py-4 px-md-3 px-0">
                    <Form onSubmit={handleSubmit}>
                        <div className="form-floating mb-4">
                            <input 
                                type="email"
                                name="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <label>User Name</label>
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="form-floating mb-4">
                            <input 
                                type="password"
                                name="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label>Password</label>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        <Button variant="primary" type="submit" className="w-100 fw-bold btn-lg mb-3">
                            Log In
                        </Button>

                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Save Password"
                                name="savePassword"
                                checked={formData.savePassword}
                                onChange={handleChange}
                                id="savePassword"
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
                        <li className="col"><Link to="#" className="square--60 border br-dashed rounded-2 full-width"><i
                            className="fa-brands fa-facebook color--facebook fs-2"></i></Link></li>
                        <li className="col"><Link to="#" className="square--60 border br-dashed rounded-2"><i
                            className="fa-brands fa-whatsapp color--whatsapp fs-2"></i></Link></li>
                        <li className="col"><Link to="#" className="square--60 border br-dashed rounded-2"><i
                            className="fa-brands fa-linkedin color--linkedin fs-2"></i></Link></li>
                        <li className="col"><Link to="#" className="square--60 border br-dashed rounded-2"><i
                            className="fa-brands fa-dribbble color--dribbble fs-2"></i></Link></li>
                        <li className="col"><Link to="#" className="square--60 border br-dashed rounded-2"><i
                            className="fa-brands fa-twitter color--twitter fs-2"></i></Link></li>
                    </ul>
                </div>
            </Modal.Body>
            <div className="modal-footer align-items-center justify-content-center">
                <p>Don't have an account yet?<Link to="/register" className="text-primary fw-medium ms-1">Sign Up</Link></p>
            </div>
        </Modal>
    );
};

export default SignInModal;
