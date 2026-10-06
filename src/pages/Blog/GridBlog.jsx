import React from "react";
import { getImgUrl } from "../Landing2/utils/asset";
import { Card, Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import NewsletterCTA from "../Landing2/components/NewsletterCTA";

//import images
import blog1 from "../../assets/img/blog-1.jpg";
import blog2 from "../../assets/img/blog-2.jpg";
import blog3 from "../../assets/img/blog-3.jpg";
import { Link } from "react-router-dom";

const GridBlog = () => {
    return (
        <>
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
                    <div className="container">

                        <div className="row justify-content-center g-4">

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                <div className="blogGrid-wrap d-flex flex-column h-100">
                                    <div className="blogGrid-pics">
                                        <Link to="#" className="d-block"><img src={blog1} className="img-fluid rounded" alt="Blog image" /></Link>
                                    </div>
                                    <div className="blogGrid-caps pt-3">
                                        <div className="d-flex align-items-center mb-1"><span
                                            className="label text-success bg-light-success">Destination</span></div>
                                        <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris in
                                            Comfirtable And Best Price</Link></h4>
                                        <p className="mb-3">Think of a news blog that's filled with content hourly on the Besides, random text risks
                                            to be unintendedly humorous or offensive day of going live.</p>
                                        <a className="text-primary fw-medium" href="#">Read More<i className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                <div className="blogGrid-wrap d-flex flex-column h-100">
                                    <div className="blogGrid-pics">
                                        <Link to="#" className="d-block"><img src={blog2} className="img-fluid rounded" alt="Blog image" /></Link>
                                    </div>
                                    <div className="blogGrid-caps pt-3">
                                        <div className="d-flex align-items-center mb-1"><span
                                            className="label text-success bg-light-success">Journey</span></div>
                                        <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris in
                                            Comfirtable And Best Price</Link></h4>
                                        <p className="mb-3">Think of a news blog that's filled with content hourly on the Besides, random text risks
                                            to be unintendedly humorous or offensive day of going live.</p>
                                        <a className="text-primary fw-medium" href="#">Read More<i className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                <div className="blogGrid-wrap d-flex flex-column h-100">
                                    <div className="blogGrid-pics">
                                        <Link to="#" className="d-block"><img src={blog3} className="img-fluid rounded" alt="Blog image" /></Link>
                                    </div>
                                    <div className="blogGrid-caps pt-3">
                                        <div className="d-flex align-items-center mb-1"><span
                                            className="label text-success bg-light-success">Business</span></div>
                                        <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris in
                                            Comfirtable And Best Price</Link></h4>
                                        <p className="mb-3">Think of a news blog that's filled with content hourly on the Besides, random text risks
                                            to be unintendedly humorous or offensive day of going live.</p>
                                        <a className="text-primary fw-medium" href="#">Read More<i className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                <div className="blogGrid-wrap d-flex flex-column h-100">
                                    <div className="blogGrid-pics">
                                        <Link to="#" className="d-block"><img src={blog1} className="img-fluid rounded" alt="Blog image" /></Link>
                                    </div>
                                    <div className="blogGrid-caps pt-3">
                                        <div className="d-flex align-items-center mb-1"><span
                                            className="label text-success bg-light-success">Destination</span></div>
                                        <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris in
                                            Comfirtable And Best Price</Link></h4>
                                        <p className="mb-3">Think of a news blog that's filled with content hourly on the Besides, random text risks
                                            to be unintendedly humorous or offensive day of going live.</p>
                                        <a className="text-primary fw-medium" href="#">Read More<i className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                <div className="blogGrid-wrap d-flex flex-column h-100">
                                    <div className="blogGrid-pics">
                                        <Link to="#" className="d-block"><img src={blog2} className="img-fluid rounded" alt="Blog image" /></Link>
                                    </div>
                                    <div className="blogGrid-caps pt-3">
                                        <div className="d-flex align-items-center mb-1"><span
                                            className="label text-success bg-light-success">Journey</span></div>
                                        <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris in
                                            Comfirtable And Best Price</Link></h4>
                                        <p className="mb-3">Think of a news blog that's filled with content hourly on the Besides, random text risks
                                            to be unintendedly humorous or offensive day of going live.</p>
                                        <a className="text-primary fw-medium" href="#">Read More<i className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                <div className="blogGrid-wrap d-flex flex-column h-100">
                                    <div className="blogGrid-pics">
                                        <Link to="#" className="d-block"><img src={blog3} className="img-fluid rounded" alt="Blog image" /></Link>
                                    </div>
                                    <div className="blogGrid-caps pt-3">
                                        <div className="d-flex align-items-center mb-1"><span
                                            className="label text-success bg-light-success">Business</span></div>
                                        <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris in
                                            Comfirtable And Best Price</Link></h4>
                                        <p className="mb-3">Think of a news blog that's filled with content hourly on the Besides, random text risks
                                            to be unintendedly humorous or offensive day of going live.</p>
                                        <a className="text-primary fw-medium" href="#">Read More<i className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                <div className="blogGrid-wrap d-flex flex-column h-100">
                                    <div className="blogGrid-pics">
                                        <Link to="#" className="d-block"><img src={blog1} className="img-fluid rounded" alt="Blog image" /></Link>
                                    </div>
                                    <div className="blogGrid-caps pt-3">
                                        <div className="d-flex align-items-center mb-1"><span
                                            className="label text-success bg-light-success">Destination</span></div>
                                        <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris in
                                            Comfirtable And Best Price</Link></h4>
                                        <p className="mb-3">Think of a news blog that's filled with content hourly on the Besides, random text risks
                                            to be unintendedly humorous or offensive day of going live.</p>
                                        <a className="text-primary fw-medium" href="#">Read More<i className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                <div className="blogGrid-wrap d-flex flex-column h-100">
                                    <div className="blogGrid-pics">
                                        <Link to="#" className="d-block"><img src={blog2} className="img-fluid rounded" alt="Blog image" /></Link>
                                    </div>
                                    <div className="blogGrid-caps pt-3">
                                        <div className="d-flex align-items-center mb-1"><span
                                            className="label text-success bg-light-success">Journey</span></div>
                                        <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris in
                                            Comfirtable And Best Price</Link></h4>
                                        <p className="mb-3">Think of a news blog that's filled with content hourly on the Besides, random text risks
                                            to be unintendedly humorous or offensive day of going live.</p>
                                        <a className="text-primary fw-medium" href="#">Read More<i className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                <div className="blogGrid-wrap d-flex flex-column h-100">
                                    <div className="blogGrid-pics">
                                        <Link to="#" className="d-block"><img src={blog3} className="img-fluid rounded" alt="Blog image" /></Link>
                                    </div>
                                    <div className="blogGrid-caps pt-3">
                                        <div className="d-flex align-items-center mb-1"><span
                                            className="label text-success bg-light-success">Business</span></div>
                                        <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris in
                                            Comfirtable And Best Price</Link></h4>
                                        <p className="mb-3">Think of a news blog that's filled with content hourly on the Besides, random text risks
                                            to be unintendedly humorous or offensive day of going live.</p>
                                        <a className="text-primary fw-medium" href="#">Read More<i className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="row align-items-center">
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="d-flex align-items-center justify-content-center mt-5 mx-auto text-center">
                                    <button type="button" className="btn btn-dark rounded-pill px-5 fw-medium">Load More</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <NewsletterCTA />
            </Layout>
        </>
    )
}

export default GridBlog;