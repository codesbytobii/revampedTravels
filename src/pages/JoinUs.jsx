import React from "react";
import Layout from '../components/Layout/Layout';

//import images
import bgTitle from "assets/img/bg-title.jpg";
import joinus from "assets/img/joinus.png";
import Reviews from "./Landing2/components/Reviews";
import Facts from "./AboutUs/Facts";
import Memories from "./Landing2/components/Memories";
import NewsletterCTA from "./Landing2/components/NewsletterCTA";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const JoinUs = () => {
    return (
        <Layout footerMode="dark">
            <section className="position-relative">
                <div className="container">
                    <div className="row align-items-center justify-content-between">

                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="fpc-capstion">
                                <div className="fpc-captions text-center mb-4">
                                    <h1 className="xl-heading">Join with <span className="position-relative z-4">Ffsd Travels<span
                                        className="position-absolute top-50 start-50 translate-middle d-none d-md-block mt-4">
                                        <svg width="185px" height="23px" viewBox="0 0 445.5 23">
                                            <path className="fill-primary opacity-7"
                                                d="M409.9,2.6c-9.7-0.6-19.5-1-29.2-1.5c-3.2-0.2-6.4-0.2-9.7-0.3c-7-0.2-14-0.4-20.9-0.5 c-3.9-0.1-7.8-0.2-11.7-0.3c-1.1,0-2.3,0-3.4,0c-2.5,0-5.1,0-7.6,0c-11.5,0-23,0-34.5,0c-2.7,0-5.5,0.1-8.2,0.1 c-6.8,0.1-13.6,0.2-20.3,0.3c-7.7,0.1-15.3,0.1-23,0.3c-12.4,0.3-24.8,0.6-37.1,0.9c-7.2,0.2-14.3,0.3-21.5,0.6 c-12.3,0.5-24.7,1-37,1.5c-6.7,0.3-13.5,0.5-20.2,0.9C112.7,5.3,99.9,6,87.1,6.7C80.3,7.1,73.5,7.4,66.7,8 C54,9.1,41.3,10.1,28.5,11.2c-2.7,0.2-5.5,0.5-8.2,0.7c-5.5,0.5-11,1.2-16.4,1.8c-0.3,0-0.7,0.1-1,0.1c-0.7,0.2-1.2,0.5-1.7,1 C0.4,15.6,0,16.6,0,17.6c0,1,0.4,2,1.1,2.7c0.7,0.7,1.8,1.2,2.7,1.1c6.6-0.7,13.2-1.5,19.8-2.1c6.1-0.5,12.3-1,18.4-1.6 c6.7-0.6,13.4-1.1,20.1-1.7c2.7-0.2,5.4-0.5,8.1-0.7c10.4-0.6,20.9-1.1,31.3-1.7c6.5-0.4,13-0.7,19.5-1.1c2.7-0.1,5.4-0.3,8.1-0.4 c10.3-0.4,20.7-0.8,31-1.2c6.3-0.2,12.5-0.5,18.8-0.7c2.1-0.1,4.2-0.2,6.3-0.2c11.2-0.3,22.3-0.5,33.5-0.8 c6.2-0.1,12.5-0.3,18.7-0.4c2.2-0.1,4.4-0.1,6.7-0.1c11.5-0.1,23-0.2,34.6-0.4c7.2-0.1,14.4-0.1,21.6-0.1c12.2,0,24.5,0.1,36.7,0.1 c2.4,0,4.8,0.1,7.2,0.2c6.8,0.2,13.5,0.4,20.3,0.6c5.1,0.2,10.1,0.3,15.2,0.4c3.6,0.1,7.2,0.4,10.8,0.6c10.6,0.6,21.1,1.2,31.7,1.8 c2.7,0.2,5.4,0.4,8,0.6c2.9,0.2,5.8,0.4,8.6,0.7c0.4,0.1,0.9,0.2,1.3,0.3c1.1,0.2,2.2,0.2,3.2-0.4c0.9-0.5,1.6-1.5,1.9-2.5 c0.6-2.2-0.7-4.5-2.9-5.2c-1.9-0.5-3.9-0.7-5.9-0.9c-1.4-0.1-2.7-0.3-4.1-0.4c-2.6-0.3-5.2-0.4-7.9-0.6 C419.7,3.1,414.8,2.9,409.9,2.6z">
                                            </path>
                                        </svg>
                                    </span></span> & List your Hotel</h1>
                                    <p>Cicero famously orated against Lucius Sergius Catilina. Occasionally the first Oration against
                                        Catiline is taken for type specimens</p>
                                    <div className="d-flex justify-content-center my-3 mt-5"><button type="button"
                                        className="btn btn-light-primary px-5 rounded-5 fw-medium">Add Your Hotel</button></div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center flex-wrap">
                                    <div className="exlope fw-light fs-6 px-4 my-2"><i
                                        className="fa-solid fa-check-circle text-success me-2 mt-1"></i>More than 5.1 million holiday rentals
                                        already listed </div>
                                    <div className="exlope fw-light fs-6 px-4 my-2"><i
                                        className="fa-solid fa-check-circle text-success me-2 mt-1"></i>Bed one supposing breakfast day
                                        fulfilled off depending questions.</div>
                                    <div className="exlope fw-light fs-6 px-4 my-2"><i
                                        className="fa-solid fa-check-circle text-success me-2 mt-1"></i>The difference in the cost shall be
                                        borne by the client in case.</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="eportio-yhumb mt-4"><img src={bgTitle}
                                className="img-fluid rounded-4 ht-400 object-fit full-width" alt="" /></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-0">
                <div className="container">

                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-8 col-lg-9 col-md-11 col-sm-12">
                            <div className="secHeading-wrap text-center mb-5">
                                <h2>Why Ffsd Travels Fit For You?</h2>
                                <p>Cicero famously orated against his political opponent Lucius Sergius Catilina.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center g-4">

                        <Col xl={4} lg={4} md={6} sm={12}>
                            <div className="card h-100 rounded-4 border">
                                <div className="card-body p-4">
                                    <div className="square--60 circle gray text-primary fs-3 mb-3"><i
                                        className="fa-solid fa-wand-magic-sparkles"></i></div>
                                    <h4 className="fs-5">Eco Friendly Team</h4>
                                    <p className="mb-0">Think of a news blog that's filled with content hourly on the day of going live.
                                        However, reviewersLorem ipsum is mostly a part of a Latin text by the classical.</p>
                                </div>
                            </div>
                        </Col>

                        <Col xl={4} lg={4} md={6} sm={12}>
                            <div className="card h-100 rounded-4 border">
                                <div className="card-body p-4">
                                    <div className="square--60 circle gray text-primary fs-3 mb-3"><i className="fa-solid fa-gifts"></i></div>
                                    <h4 className="fs-5">Multi Offers & Coupon</h4>
                                    <p className="mb-0">Think of a news blog that's filled with content hourly on the day of going live.
                                        However, reviewersLorem ipsum is mostly a part of a Latin text by the classical.</p>
                                </div>
                            </div>
                        </Col>

                        <Col xl={4} lg={4} md={6} sm={12}>
                            <div className="card h-100 rounded-4 border">
                                <div className="card-body p-4">
                                    <div className="square--60 circle gray text-primary fs-3 mb-3"><i className="fa-solid fa-jet-fighter"></i></div>
                                    <h4 className="fs-5">International Tour Package</h4>
                                    <p className="mb-0">Think of a news blog that's filled with content hourly on the day of going live.
                                        However, reviewersLorem ipsum is mostly a part of a Latin text by the classical.</p>
                                </div>
                            </div>
                        </Col>

                        <Col xl={4} lg={4} md={6} sm={12}>
                            <div className="card h-100 rounded-4 border">
                                <div className="card-body p-4">
                                    <div className="square--60 circle gray text-primary fs-3 mb-3"><i className="fa-solid fa-droplet"></i></div>
                                    <h4 className="fs-5">Room & Amenities Facility</h4>
                                    <p className="mb-0">Think of a news blog that's filled with content hourly on the day of going live.
                                        However, reviewersLorem ipsum is mostly a part of a Latin text by the classical.</p>
                                </div>
                            </div>
                        </Col>

                        <Col xl={4} lg={4} md={6} sm={12}>
                            <div className="card h-100 rounded-4 border">
                                <div className="card-body p-4">
                                    <div className="square--60 circle gray text-primary fs-3 mb-3"><i className="fa-solid fa-snowflake"></i></div>
                                    <h4 className="fs-5">Fully Friendly Support</h4>
                                    <p className="mb-0">Think of a news blog that's filled with content hourly on the day of going live.
                                        However, reviewersLorem ipsum is mostly a part of a Latin text by the classical.</p>
                                </div>
                            </div>
                        </Col>

                        <Col xl={4} lg={4} md={6} sm={12}>
                            <div className="card h-100 rounded-4 border">
                                <div className="card-body p-4">
                                    <div className="square--60 circle gray text-primary fs-3 mb-3"><i className="fa-solid fa-sack-dollar"></i></div>
                                    <h4 className="fs-5">Bonus & Flixible</h4>
                                    <p className="mb-0">Think of a news blog that's filled with content hourly on the day of going live.
                                        However, reviewersLorem ipsum is mostly a part of a Latin text by the classical.</p>
                                </div>
                            </div>
                        </Col>

                    </div>

                </div>
            </section>
            <Reviews />
            <Facts />
            <Memories />
            <section className="pt-0">
			<div className="container">
				<div className="row align-items-center justify-content-between">

					<div className="col-xl-12 col-lg-12 col-12">
						
						<div className="card card-body bg-light-primary rounded-4 px-4 py-5">
							<div className="row g-4 justify-content-between align-items-center">
								<div className="col-xl-2 col-lg-2 col-md-3">
									<img src={joinus} className="img-fluid" alt="" />
								</div>
								
								<div className="col-xl-8 col-lg-7 col-md-6">
									<h4 className="fs-2">Intresting To Join Us?</h4>
									<p className="mb-0">The are likely to focus on the text, disregarding the layout and its elements.</p>
								</div>
						
								<div className="col-xl-2 col-lg-3 col-md-3 d-grid">
									<Link to="#" className="btn btn-lg fw-medium btn-primary mb-0">Become a Host</Link>
								</div>
							</div>
						</div>
						
					</div>

				</div>
			</div>
		</section>
        <NewsletterCTA />
        </Layout>
    )
}

export default JoinUs;