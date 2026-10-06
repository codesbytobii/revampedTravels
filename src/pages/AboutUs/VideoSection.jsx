import { Container, Row, Col, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { getImgUrl } from '../Landing2/utils/asset';

function VideoSection() {
	const [show, setShow] = useState(false);

	return (
		<section className="ab-video bg-cover" style={{ background: `url(${getImgUrl('bg-title.jpg')}) no-repeat center / cover` }} data-overlay="5">
			<Container>
				<Row className="align-items-center justify-content-center">
					<Col xl={8} lg={9} md={12}>
						<div className="text-center">
							<button type="button" onClick={() => setShow(true)} className="ab-play" aria-label="Play our story video">
								<i className="fa-solid fa-play"></i>
							</button>
							<h3 className="text-light fw-bold mt-4 mb-2">See how we travel</h3>
							<p className="text-light mb-0" style={{ opacity: .85 }}>A two-minute look at the people and places behind GeoTrip.</p>
						</div>
					</Col>
				</Row>
			</Container>

			<Modal show={show} onHide={() => setShow(false)} size="lg" centered>
				<Modal.Body className="p-0">
					<div className="ratio ratio-16x9">
						{show && (
							<iframe
								src="https://www.youtube.com/embed/A8EI6JaFbv4?autoplay=1"
								title="GeoTrip story"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							/>
						)}
					</div>
				</Modal.Body>
			</Modal>
		</section>
	);
}

export default VideoSection;