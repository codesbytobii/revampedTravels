import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterModal = ({ show, handleClose, handleSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
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
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      alert('Registration Successful!');
      handleClose();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="auth-modal">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          <h5 className="mb-0">Create Your Account</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Min 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              isInvalid={!!errors.agreeTerms}
              id="agreeTerms"
              label={
                <span>
                  I agree to the{' '}
                  <Link to="/privacy-policy" className="text-primary text-decoration-none">
                    Terms & Conditions
                  </Link>
                </span>
              }
            />
            <Form.Control.Feedback type="invalid" style={{ display: errors.agreeTerms ? 'block' : 'none' }}>
              {errors.agreeTerms}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 fw-bold btn-lg mb-3">
            Create Account
          </Button>
        </Form>

        <div className="text-center mb-3">
          <div className="position-relative">
            <div className="devider-line"></div>
            <span className="devider-text bg-white px-2">Sign Up with More Methods</span>
          </div>
        </div>

        <div className="social-login mb-4">
          <div className="row g-3">
            <div className="col">
              <button className="btn border w-100 py-2 rounded-2" title="Facebook">
                <i className="fa-brands fa-facebook fa-lg"></i>
              </button>
            </div>
            <div className="col">
              <button className="btn border w-100 py-2 rounded-2" title="WhatsApp">
                <i className="fa-brands fa-whatsapp fa-lg"></i>
              </button>
            </div>
            <div className="col">
              <button className="btn border w-100 py-2 rounded-2" title="LinkedIn">
                <i className="fa-brands fa-linkedin fa-lg"></i>
              </button>
            </div>
            <div className="col">
              <button className="btn border w-100 py-2 rounded-2" title="Twitter">
                <i className="fa-brands fa-twitter fa-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center border-top">
        <p className="mb-0">
          Already have an account?{' '}
          <button
            className="btn btn-link text-primary fw-medium p-0 ms-1"
            onClick={handleSwitchToSignIn}
            style={{ textDecoration: 'none' }}
          >
            Sign In
          </button>
        </p>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
