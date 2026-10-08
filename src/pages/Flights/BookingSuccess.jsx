import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const BookingSuccess = () => {
	const { state } = useLocation();
	const reference = state?.reference;

	return (
		<Layout>
			<div className="container py-5 text-center">
				<i className="bi bi-check-circle-fill text-success" style={{ fontSize: 64 }}></i>
				<h2 className="fw-bold mt-3">Booking confirmed!</h2>
				<p className="text-muted">
					Your e-ticket will be sent to your email shortly.
				</p>
				{reference && (
					<p className="small text-muted">Reference: <strong>{reference}</strong></p>
				)}
				<Link to="/" className="btn btn-primary mt-3">Back to home</Link>
			</div>
		</Layout>
	);
};

export default BookingSuccess;