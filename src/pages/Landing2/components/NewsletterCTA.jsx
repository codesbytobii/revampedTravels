import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function NewsletterCTA() {
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState('idle'); // idle | error | done

	const submit = (e) => {
		e.preventDefault();
		if (!/^\S+@\S+\.\S+$/.test(email)) return setStatus('error');
		// TODO: send `email` to your newsletter endpoint here
		setStatus('done');
		setEmail('');
	};

	return (
		<div className="nl-cta py-5">
			<Container>
				<Row className="align-items-center justify-content-between g-4">
					<Col xl={5} lg={5} md={6}>
						<h4 className="text-light fw-bold lh-base m-0">Join our Newsletter To Keep Up To Date With Us!</h4>
						<p className="text-light mb-0 mt-2" style={{ opacity: .85 }}>Deals and destination ideas, once a week. No spam.</p>
					</Col>

					<Col xl={5} lg={6} md={6}>
						<Form onSubmit={submit} noValidate>
							<div className="nl-box">
								<Form.Control
									type="email"
									aria-label="Email address"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle'); }}
									isInvalid={status === 'error'}
								/>
								<Button type="submit" variant="dark" className="fw-medium px-4">
									Subscribe<i className="fa-solid fa-arrow-trend-up ms-2"></i>
								</Button>
							</div>
							<p className="nl-note" role="status">
								{status === 'error' && 'Please enter a valid email address.'}
								{status === 'done' && "You're in! Check your inbox soon."}
							</p>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default NewsletterCTA;