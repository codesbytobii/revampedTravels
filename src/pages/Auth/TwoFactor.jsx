import { Link } from 'react-router-dom';
import loginImage from '../../assets/img/login.svg';
import loginIcon from '../../assets/img/logo-icon.png';
import { Col, Container, Row } from 'react-bootstrap';

function TwoFactor() {

    return (
        <section className="py-5">
            <Container>

                <Row className="justify-content-center align-items-center m-auto">
                    <Col xl={11} lg={12} xs={12}>
                        <div className="bg-mode card shadow-sm rounded-3 overflow-hidden">
							<Row className="g-0">
								
								<Col lg={6} className="d-flex align-items-center order-2 order-lg-1">
									<div className="p-3 p-lg-5">
										<img src={loginImage} className="img-fluid" alt="" />
									</div>
									
									<div className="vr opacity-1 d-none d-lg-block"></div>
								</Col>

								
								<Col lg={6} className="order-1">
									<div className="p-4 p-sm-7">
										
										<Link to="/">
											<img className="img-fluid mb-4" src={loginIcon} width="70" alt="logo" />
										</Link>
										
										<h1 className="mb-2 fs-2">Two-Factor Authentication</h1>
										<p className="mb-0">We have to send a code to pay@payments.com.</p>

										
										<form className="mt-4 text-start">
											<div className="form py-4">
												<div className="form-group">
													<div className="row">
														<div className="col-12">
															<p className="fw-medium text-md">Enter the code we have sent you:</p>
														</div>
													</div>
													<Row className="g-4">
														<div className="col">
															<input type="text" className="form-control border br-dashed" />
														</div>
														<div className="col">
															<input type="text" className="form-control border br-dashed" />
														</div>
														<div className="col">
															<input type="text" className="form-control border br-dashed" />
														</div>
														<div className="col">
															<input type="text" className="form-control border br-dashed" />
														</div>
													</Row>
												</div>

												<div className="modal-flex-item d-flex align-items-center justify-content-between mb-3">
													<div className="modal-flex-first">
														<span className="text-md">Don't Get a Code?</span>
													</div>
													<div className="modal-flex-last">
														<Link to="#" className="text-primary fw-medium text-decoration-underline">Click
															to Resend</Link>
													</div>
												</div>

												<div className="form-group">
													<button type="submit" className="btn btn-primary full-width font--bold btn-lg">Submit &
														Verify</button>
												</div>
											</div>

											
											<div className="text-primary-hover text-center"> © {new Date().getFullYear()}  Ffsd Travels. Develop By <Link to="https://shreethemes.in/" target='blank' className='text-muted'>Shreethemes</Link>. </div>
										</form>
										
									</div>
								</Col>
							</Row>
						</div>
                    </Col>
                </Row>

            </Container>
        </section>
    );
}

export default TwoFactor;

