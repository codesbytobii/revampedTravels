import Layout from '../components/Layout/Layout';

import hotel1 from "assets/img/hotel/hotel-1.jpg";
import air4 from "assets/img/air-4.png";
import air1 from "assets/img/air-1.png";
import { Link } from 'react-router-dom';
import NewsletterCTA from './Landing2/components/NewsletterCTA';

function BookingPage3() {
    return (
        <Layout footerMode="dark" navbarMode="dark">
            <section className="pt-4 gray-simple position-relative">
                <div className="container">

                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div id="stepper" className="bs-stepper stepper-outline mb-5">
                                <div className="bs-stepper-header">
                                    <div className="step completed" data-target="#step-1">
                                        <div className="text-center">
                                            <button type="button" className="step-trigger mb-0" id="steppertrigger1">
                                                <span className="bs-stepper-circle"><i className="fa-solid fa-check"></i></span>
                                            </button>
                                            <h6 className="bs-stepper-label d-none d-md-block">Tour Review</h6>
                                        </div>
                                    </div>
                                    <div className="line"></div>

                                    <div className="step completed" data-target="#step-2">
                                        <div className="text-center">
                                            <button type="button" className="step-trigger mb-0" id="steppertrigger2">
                                                <span className="bs-stepper-circle">2</span>
                                            </button>
                                            <h6 className="bs-stepper-label d-none d-md-block">Traveler Info</h6>
                                        </div>
                                    </div>
                                    <div className="line"></div>

                                    <div className="step active" data-target="#step-3">
                                        <div className="text-center">
                                            <button type="button" className="step-trigger mb-0" id="steppertrigger3">
                                                <span className="bs-stepper-circle">3</span>
                                            </button>
                                            <h6 className="bs-stepper-label d-none d-md-block">Make Payment</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-start">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="div-title d-flex align-items-center mb-3">
                                <h4>Billing Details</h4>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-xl-8 col-lg-8 col-md-12">

                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h4>Basic Detail</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Billing Name</label>
                                                        <input type="text" className="form-control" placeholder="First Name" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Email</label>
                                                        <input type="text" className="form-control" placeholder="Last Name" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Phone</label>
                                                        <input type="text" className="form-control" placeholder="Phone Number" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Address 01</label>
                                                        <input type="text" className="form-control" placeholder="Passport Number" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Address 02</label>
                                                        <input type="text" className="form-control" placeholder="Passport Number" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Country</label>
                                                        <input type="text" className="form-control" placeholder="Passport Number" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">City\State</label>
                                                        <input type="text" className="form-control" placeholder="Passport Number" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Postal Code</label>
                                                        <input type="text" className="form-control" placeholder="Passport Number" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-12 col-lg-12 col-md-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Special notes</label>
                                                        <textarea className="form-control ht-200"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-12">
                                    <div className="side-block card rounded-2 p-3">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <h5 className="fw-semibold fs-6 mb-0">Payment Summary</h5>
                                            <div className="d-flex align-items-start"><Link to="#" className="text-md fw-semibold text-primary">Manage
                                                Cards</Link></div>
                                        </div>
                                        <div className="mid-block mb-2">
                                            <div className="paymntCardsoption-groups">
                                                <div className="single-paymntCardsoption d-block position-relative mb-2">
                                                    <div className="paymnt-line active d-flex align-items-center justify-content-start">
                                                        <div className="position-relative text-center">
                                                            <div className="form-check lg mb-0">
                                                                <input className="form-check-input" type="radio" name="payment" id="visa" checked />
                                                                <label className="form-check-label" for="visa"></label>
                                                            </div>
                                                        </div>
                                                        <div className="paymnt-line-caps d-flex align-items-center justify-content-start">
                                                            <div className="paymnt-caps-icons d-inline-flex">
                                                                <i className="fa-brands fa-cc-visa text-seegreen fs-1"></i>
                                                            </div>
                                                            <div className="paymnt-caps-details ps-2">
                                                                <span
                                                                    className="text-uppercase d-block fw-semibold text-md text-dark lh-2 mb-0">Visa****7542</span>
                                                                <span className="text-sm text-muted lh-2">Expired on 10/25</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="single-paymntCardsoption d-block position-relative mb-2">
                                                    <div className="paymnt-line d-flex align-items-center justify-content-start">
                                                        <div className="position-relative text-center">
                                                            <div className="form-check lg mb-0">
                                                                <input className="form-check-input" type="radio" name="payment" id="master" />
                                                                <label className="form-check-label" for="master"></label>
                                                            </div>
                                                        </div>
                                                        <div className="paymnt-line-caps d-flex align-items-center justify-content-start">
                                                            <div className="paymnt-caps-icons d-inline-flex">
                                                                <i className="fa-brands fa-cc-mastercard text-danger fs-1"></i>
                                                            </div>
                                                            <div className="paymnt-caps-details ps-2">
                                                                <span
                                                                    className="text-uppercase d-block fw-semibold text-md text-dark lh-2 mb-0">Master****8956</span>
                                                                <span className="text-sm text-muted lh-2">Expired on 10/24</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="single-paymntCardsoption d-block position-relative mb-2">
                                                    <div className="paymnt-line d-flex align-items-center justify-content-start">
                                                        <div className="position-relative text-center">
                                                            <div className="form-check lg mb-0">
                                                                <input className="form-check-input" type="radio" name="payment" id="amazone" />
                                                                <label className="form-check-label" for="amazone"></label>
                                                            </div>
                                                        </div>
                                                        <div className="paymnt-line-caps d-flex align-items-center justify-content-start">
                                                            <div className="paymnt-caps-icons d-inline-flex">
                                                                <i className="fa-brands fa-cc-amazon-pay text-warning fs-1"></i>
                                                            </div>
                                                            <div className="paymnt-caps-details ps-2">
                                                                <span className="text-uppercase d-block fw-semibold text-md text-dark lh-2 mb-0">Amazone
                                                                    Pay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="single-paymntCardsoption d-block position-relative mb-2">
                                                    <div className="paymnt-line d-flex align-items-center justify-content-start">
                                                        <div className="position-relative text-center">
                                                            <div className="form-check lg mb-0">
                                                                <input className="form-check-input" type="radio" name="payment" id="paypal" />
                                                                <label className="form-check-label" for="paypal"></label>
                                                            </div>
                                                        </div>
                                                        <div className="paymnt-line-caps d-flex align-items-center justify-content-start">
                                                            <div className="paymnt-caps-icons d-inline-flex">
                                                                <i className="fa-brands fa-cc-paypal text-info fs-1"></i>
                                                            </div>
                                                            <div className="paymnt-caps-details ps-2">
                                                                <span className="text-uppercase d-block fw-semibold text-md text-dark lh-2 mb-0">PayPal</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="summary-block d-block mb-3">
                                            <h5 className="fw-semibold fs-6">Summary</h5>
                                            <ul className="list-group list-group-borderless">
                                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-1">
                                                    <span className="fw-medium text-sm text-muted mb-0">Payment:</span>
                                                    <span className="fw-semibold text-md">$772.40</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-1">
                                                    <span className="fw-medium text-sm text-muted mb-0">Payment Methode fee</span>
                                                    <span className="fw-semibold text-md">$0</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-1">
                                                    <span className="fw-medium text-sm text-muted mb-0">Total Price</span>
                                                    <span className="fw-semibold text-success text-md">$772.40</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bott-block mb-3">
                                            <div
                                                className="d-flex align-items-center justify-content-center py-2 px-3 rounded-2 bg-light-success mb-2">
                                                <div className="d-inline-flex text-success fs-2"><i className="fa-solid fa-shield-heart"></i></div>
                                                <div className="d-inline-flex flex-column ps-2">
                                                    <span className="d-block text-md text-dark fw-semibold lh-2">100% Cashback guarantee</span>
                                                    <span className="d-block text-sm text-muted-2 lh-2">We protect your money</span>
                                                </div>
                                            </div>
                                            <button className="btn fw-medium btn-primary full-width" type="button">Pay Now $772.40</button>
                                        </div>
                                        <div className="autopay-block-block">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="fluy-autpay">
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="autopay" />
                                                        <label className="form-check-label ms-1" for="autopay">Auto Pay</label>
                                                    </div>
                                                </div>
                                                <div className="fluy-bkr"><Link to="#" className="fw-semibold text-md text-dark">Add New Card</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="text-center d-flex align-items-center justify-content-center mt-4">
                                <Link to="/bookingpage-02" className="btn btn-md btn-dark fw-semibold mx-2"><i
                                    className="fa-solid fa-arrow-left me-2"></i>Previous</Link>
                                <Link to="/bookingpage-success" className="btn btn-md btn-primary fw-semibold mx-2">Submit & Confirm<i
                                    className="fa-solid fa-arrow-right ms-2"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <NewsletterCTA />
        </Layout>
    );
}

export default BookingPage3;

