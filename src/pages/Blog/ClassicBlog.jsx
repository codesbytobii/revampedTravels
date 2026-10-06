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

const ClassicBlog = () => {
    return (
        <>
            <Layout>
                <section className="bg-cover position-relative" style={{ background: `url(${getImgUrl('bg-title.jpg')}) no-repeat` }} data-overlay="5">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <Col xl={7} lg={9} md={12}>

                                <div className="fpc-capstion text-center my-4">
                                    <div className="fpc-captions">
                                        <h1 className="xl-heading text-light">Trending News</h1>
                                        <p className="text-light">Cicero famously orated against his political opponent Lucius Sergius Catilina.
                                            Occasionally the first Oration against Catiline is taken for type specimens</p>
                                    </div>
                                </div>

                            </Col>
                        </div>
                    </div>
                </section>
                <section className="gray-simple">
                    <Container>

                        <Row className="justify-content-center g-4">

                            <Col xl="6" lg="6" md="12">
                                <Card className="rounded-3 p-2">
                                    <Row>
                                        <div className="col-xl-5 col-lg-5 col-md-5">
                                            <Link to="#" className="d-block h-100"><img src={blog1} className="img-fluid h-100 object-fit rounded"
                                                alt="Blog image" /></Link>
                                        </div>
                                        <div className="col-xl-7 col-lg-7 col-md-7">
                                            <div className="position-relative pt-md-0 pt-3">
                                                <div className="d-flex align-items-center mb-1"><span
                                                    className="label text-success bg-light-success">Destination</span></div>
                                                <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris
                                                    in Comfirtable And Best Price</Link></h4>
                                                <p className="mb-3">Think of a news blog that's filled unintendedly humorous or offensive day of going
                                                    live.</p>
                                                <a className="text-primary fw-medium" href="#">Read More<i
                                                    className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                            </div>
                                        </div>
                                    </Row>
                                </Card>
                            </Col>

                            <Col xl="6" lg="6" md="12">
                                <div className="card rounded-3 p-2">
                                    <div className="row">
                                        <div className="col-xl-5 col-lg-5 col-md-5">
                                            <Link to="#" className="d-block h-100"><img src={blog2} className="img-fluid h-100 object-fit rounded"
                                                alt="Blog image" /></Link>
                                        </div>
                                        <div className="col-xl-7 col-lg-7 col-md-7">
                                            <div className="position-relative pt-md-0 pt-3">
                                                <div className="d-flex align-items-center mb-1"><span
                                                    className="label text-success bg-light-success">Destination</span></div>
                                                <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris
                                                    in Comfirtable And Best Price</Link></h4>
                                                <p className="mb-3">Think of a news blog that's filled unintendedly humorous or offensive day of going
                                                    live.</p>
                                                <a className="text-primary fw-medium" href="#">Read More<i
                                                    className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col xl="6" lg="6" md="12">
                                <div className="card rounded-3 p-2">
                                    <div className="row">
                                        <div className="col-xl-5 col-lg-5 col-md-5">
                                            <Link to="#" className="d-block h-100"><img src={blog3} className="img-fluid h-100 object-fit rounded"
                                                alt="Blog image" /></Link>
                                        </div>
                                        <div className="col-xl-7 col-lg-7 col-md-7">
                                            <div className="position-relative pt-md-0 pt-3">
                                                <div className="d-flex align-items-center mb-1"><span
                                                    className="label text-success bg-light-success">Destination</span></div>
                                                <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris
                                                    in Comfirtable And Best Price</Link></h4>
                                                <p className="mb-3">Think of a news blog that's filled unintendedly humorous or offensive day of going
                                                    live.</p>
                                                <a className="text-primary fw-medium" href="#">Read More<i
                                                    className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col xl="6" lg="6" md="12">
                                <div className="card rounded-3 p-2">
                                    <div className="row">
                                        <div className="col-xl-5 col-lg-5 col-md-5">
                                            <Link to="#" className="d-block h-100"><img src={blog1} className="img-fluid h-100 object-fit rounded"
                                                alt="Blog image" /></Link>
                                        </div>
                                        <div className="col-xl-7 col-lg-7 col-md-7">
                                            <div className="position-relative pt-md-0 pt-3">
                                                <div className="d-flex align-items-center mb-1"><span
                                                    className="label text-success bg-light-success">Destination</span></div>
                                                <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris
                                                    in Comfirtable And Best Price</Link></h4>
                                                <p className="mb-3">Think of a news blog that's filled unintendedly humorous or offensive day of going
                                                    live.</p>
                                                <a className="text-primary fw-medium" href="#">Read More<i
                                                    className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col xl="6" lg="6" md="12">
                                <div className="card rounded-3 p-2">
                                    <div className="row">
                                        <div className="col-xl-5 col-lg-5 col-md-5">
                                            <Link to="#" className="d-block h-100"><img src={blog2} className="img-fluid h-100 object-fit rounded"
                                                alt="Blog image" /></Link>
                                        </div>
                                        <div className="col-xl-7 col-lg-7 col-md-7">
                                            <div className="position-relative pt-md-0 pt-3">
                                                <div className="d-flex align-items-center mb-1"><span
                                                    className="label text-success bg-light-success">Destination</span></div>
                                                <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris
                                                    in Comfirtable And Best Price</Link></h4>
                                                <p className="mb-3">Think of a news blog that's filled unintendedly humorous or offensive day of going
                                                    live.</p>
                                                <a className="text-primary fw-medium" href="#">Read More<i
                                                    className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col xl="6" lg="6" md="12">
                                <div className="card rounded-3 p-2">
                                    <div className="row">
                                        <div className="col-xl-5 col-lg-5 col-md-5">
                                            <Link to="#" className="d-block h-100"><img src={blog3} className="img-fluid h-100 object-fit rounded"
                                                alt="Blog image" /></Link>
                                        </div>
                                        <div className="col-xl-7 col-lg-7 col-md-7">
                                            <div className="position-relative pt-md-0 pt-3">
                                                <div className="d-flex align-items-center mb-1"><span
                                                    className="label text-success bg-light-success">Destination</span></div>
                                                <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris
                                                    in Comfirtable And Best Price</Link></h4>
                                                <p className="mb-3">Think of a news blog that's filled unintendedly humorous or offensive day of going
                                                    live.</p>
                                                <a className="text-primary fw-medium" href="#">Read More<i
                                                    className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col xl="6" lg="6" md="12">
                                <div className="card rounded-3 p-2">
                                    <div className="row">
                                        <div className="col-xl-5 col-lg-5 col-md-5">
                                            <Link to="#" className="d-block h-100"><img src={blog1} className="img-fluid h-100 object-fit rounded"
                                                alt="Blog image" /></Link>
                                        </div>
                                        <div className="col-xl-7 col-lg-7 col-md-7">
                                            <div className="position-relative pt-md-0 pt-3">
                                                <div className="d-flex align-items-center mb-1"><span
                                                    className="label text-success bg-light-success">Destination</span></div>
                                                <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris
                                                    in Comfirtable And Best Price</Link></h4>
                                                <p className="mb-3">Think of a news blog that's filled unintendedly humorous or offensive day of going
                                                    live.</p>
                                                <a className="text-primary fw-medium" href="#">Read More<i
                                                    className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col xl="6" lg="6" md="12">
                                <div className="card rounded-3 p-2">
                                    <div className="row">
                                        <div className="col-xl-5 col-lg-5 col-md-5">
                                            <Link to="#" className="d-block h-100"><img src={blog2} className="img-fluid h-100 object-fit rounded"
                                                alt="Blog image" /></Link>
                                        </div>
                                        <div className="col-xl-7 col-lg-7 col-md-7">
                                            <div className="position-relative pt-md-0 pt-3">
                                                <div className="d-flex align-items-center mb-1"><span
                                                    className="label text-success bg-light-success">Destination</span></div>
                                                <h4 className="fw-bold fs-6 lh-base"><Link to="#" className="text-dark">Make Your Next Journey Delhi To Paris
                                                    in Comfirtable And Best Price</Link></h4>
                                                <p className="mb-3">Think of a news blog that's filled unintendedly humorous or offensive day of going
                                                    live.</p>
                                                <a className="text-primary fw-medium" href="#">Read More<i
                                                    className="fa-solid fa-arrow-trend-up ms-2"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                        </Row>

                        <Row className="align-items-center">
                            <Col xl="12" lg="12" md="12">
                                <div className="d-flex align-items-center justify-content-center mt-5 mx-auto text-center">
                                    <button type="button" className="btn btn-dark rounded-pill px-5 fw-medium">Load More</button>
                                </div>
                            </Col>
                        </Row>

                    </Container>
                </section>
                <NewsletterCTA />
            </Layout>
        </>
    )
}

export default ClassicBlog;