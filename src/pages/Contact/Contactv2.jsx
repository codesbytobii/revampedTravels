import { Col, Container, Row } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import NewsletterCTA from '../Landing2/components/NewsletterCTA';
import { getImgUrl } from '../Landing2/utils/asset';
import { Link } from 'react-router-dom';


function Contactv2() {
    return (
        <Layout footerMode="dark">
            <section className="bg-cover position-relative" style={{ background: `url(${getImgUrl('bg-title.jpg')}) no-repeat` }} data-overlay="5">
                <Container>
                    <Row className="align-items-center justify-content-center">
                        <Col xl={7} lg={9} md={12}>

                            <div className="fpc-capstion text-center my-4">
                                <div className="fpc-captions">
                                    <h1 className="xl-heading text-light">Get-in Touch</h1>
                                    <p className="text-light">Cicero famously orated against his political opponent Lucius Sergius Catilina.
                                        Occasionally the first Oration against Catiline is taken for type specimens</p>
                                </div>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>

                    <Row className="row justify-content-between g-4 mb-5">
                        <Col xl={4} lg={4} md={6}>
                            <div className="card p-4 rounded-4 border br-dashed text-center h-100">
                                <div className="crds-icons d-inline-flex mx-auto mb-3 text-primary fs-2"><i className="fa-solid fa-briefcase"></i>
                                </div>
                                <div className="crds-desc">
                                    <h5>Drop a Mail</h5>
                                    <p className="fs-6 text-md lh-2 mb-0">pay@payments.com<br />pay@payments.com</p>
                                </div>
                            </div>
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <div className="card p-4 rounded-4 border br-dashed text-center h-100">
                                <div className="crds-icons d-inline-flex mx-auto mb-3 text-primary fs-2"><i className="fa-solid fa-headset"></i>
                                </div>
                                <div className="crds-desc">
                                    <h5>Call Us</h5>
                                    <p className="fs-6 text-md lh-2 mb-0">(0522) 2563568<br />+91 256 6548 457</p>
                                </div>
                            </div>
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <div className="card p-4 rounded-4 border br-dashed text-center h-100">
                                <div className="crds-icons d-inline-flex mx-auto mb-3 text-primary fs-2"><i className="fa-solid fa-globe"></i>
                                </div>
                                <div className="crds-desc">
                                    <h5>Connect with Social</h5>
                                    <p className="text-md lh-2">Let's Connect with Us via social media</p>
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item"> <Link className="square--40 circle gray-simple color--facebook" to="#"><i
                                            className="fa-brands fa-facebook-f"></i></Link> </li>
                                        <li className="list-inline-item"> <Link className="square--40 circle gray-simple color--instagram" to="#"><i
                                            className="fa-brands fa-instagram"></i></Link> </li>
                                        <li className="list-inline-item"> <Link className="square--40 circle gray-simple color--twitter" to="#"><i
                                            className="fa-brands fa-twitter"></i></Link> </li>
                                        <li className="list-inline-item"> <Link className="square--40 circle gray-simple color--dribbble" to="#"><i
                                            className="fa-brands fa-dribbble"></i></Link> </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="align-items-center justify-content-between g-4">

                        <Col xl={7} lg={7} md={12}>
                            <div className="contactForm gray-simple p-4 rounded-3">
                                <form>
                                    <div className="row align-items-center">

                                        <Col xl={12} lg={12} md={12}>
                                            <div className="touch-block d-flex flex-column mb-4">
                                                <h2>Drop Us a Line</h2>
                                                <p>Get in touch via form below and we will reply as soos as we can. </p>
                                            </div>
                                        </Col>

                                        <Col xl={6} lg={6} md={6}>
                                            <div className="form-group">
                                                <label className="form-label">Your Name</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </Col>

                                        <Col xl={6} lg={6} md={6}>
                                            <div className="form-group">
                                                <label className="form-label">eMail ID</label>
                                                <input type="email" className="form-control" />
                                            </div>
                                        </Col>

                                        <Col xl={6} lg={6} md={6}>
                                            <div className="form-group">
                                                <label className="form-label">Phone No.</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </Col>

                                        <Col xl={6} lg={6} md={6}>
                                            <div className="form-group">
                                                <label className="form-label">Subject</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </Col>

                                        <Col xl={12} lg={12} md={12}>
                                            <div className="form-group">
                                                <label className="form-label">Your Query</label>
                                                <textarea className="form-control ht-120"></textarea>
                                            </div>
                                        </Col>

                                        <Col xl={12} lg={12} md={12}>
                                            <div className="form-group mb-0">
                                                <button type="button" className="btn fw-medium btn-primary">Send Message<i
                                                    className="fa-solid fa-paper-plane ms-2"></i></button>
                                            </div>
                                        </Col>

                                    </div>
                                </form>
                            </div>
                        </Col>

                        <Col xl={5} lg={5} md={12}>
                            <iframe className="full-width ht-100 grayscale rounded"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sin!4v1586000412513!5m2!1sen!2sin"
                                height="500" style={{ border: 0 }} aria-hidden="false" tabIndex="0"></iframe>
                        </Col>

                    </Row>

                </Container>
            </section>
            <NewsletterCTA />
        </Layout>
    );
}

export default Contactv2;

