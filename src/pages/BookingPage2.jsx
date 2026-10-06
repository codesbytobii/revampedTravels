import Layout from '../components/Layout/Layout';

import hotel1 from "assets/img/hotel/hotel-1.jpg";
import air4 from "assets/img/air-4.png";
import air1 from "assets/img/air-1.png";
import { Link } from 'react-router-dom';
import NewsletterCTA from './Landing2/components/NewsletterCTA';

function BookingPage2() {
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

                                    <div className="step active" data-target="#step-2">
                                        <div className="text-center">
                                            <button type="button" className="step-trigger mb-0" id="steppertrigger2">
                                                <span className="bs-stepper-circle">2</span>
                                            </button>
                                            <h6 className="bs-stepper-label d-none d-md-block">Traveler Info</h6>
                                        </div>
                                    </div>
                                    <div className="line"></div>


                                    <div className="step" data-target="#step-3">
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
                                <h4>Guests Detail</h4>
                            </div>
                            <div className="row align-items-start">
                                <div className="col-xl-8 col-lg-8 col-md-12">
                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h4>Guest 01</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">First Name</label>
                                                        <input type="text" className="form-control" placeholder="First Name" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Last Name</label>
                                                        <input type="text" className="form-control" placeholder="Last Name" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Date of Birth</label>
                                                        <input type="date" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Passport Number</label>
                                                        <input type="text" className="form-control" placeholder="Passport Number" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h4>Guest 02</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">First Name</label>
                                                        <input type="text" className="form-control" placeholder="First Name" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Last Name</label>
                                                        <input type="text" className="form-control" placeholder="Last Name" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Date of Birth</label>
                                                        <input type="date" className="form-control fw-semibold text-muted" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Passport Number</label>
                                                        <input type="text" className="form-control" placeholder="Passport Number" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h4>Guest 03</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">First Name</label>
                                                        <input type="text" className="form-control" placeholder="First Name" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Last Name</label>
                                                        <input type="text" className="form-control" placeholder="Last Name" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Date of Birth</label>
                                                        <input type="date" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Passport Number</label>
                                                        <input type="text" className="form-control" placeholder="Passport Number" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-12">
                                    <div className="side-block card rounded-2 p-3">
                                        <h5 className="fw-semibold fs-6">Reservation Summary</h5>
                                        <div className="mid-block rounded-2 border br-dashed p-2 mb-3">
                                            <div className="row align-items-center justify-content-between g-2 mb-4">
                                                <div className="col-6">
                                                    <div className="gray rounded-2 p-2">
                                                        <span className="d-block text-muted-3 text-sm fw-medium text-uppercase mb-2">Check-In</span>
                                                        <p className="text-dark fw-semibold lh-base text-md mb-0">27 Aug 2023</p>
                                                        <span className="text-dark text-md">From 14:40</span>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="gray rounded-2 p-2">
                                                        <span className="d-block text-muted-3 text-sm fw-medium text-uppercase mb-2">Check-Out</span>
                                                        <p className="text-dark fw-semibold lh-base text-md mb-0">31 Aug 2023</p>
                                                        <span className="text-dark text-md">By 11:50</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row align-items-center justify-content-between mb-4">
                                                <div className="col-12">
                                                    <p className="text-muted-2 text-sm text-uppercase fw-medium mb-1">Total Length of Stay:</p>
                                                    <div className="d-flex align-items-center">
                                                        <div className="square--30 circle text-seegreen bg-light-seegreen"><i
                                                            className="fa-regular fa-calendar"></i></div><span className="text-dark fw-semibold ms-2">3 Days \
                                                                2 Night</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row align-items-center justify-content-between">
                                                <div className="col-12">
                                                    <p className="text-muted-2 text-sm text-uppercase fw-medium mb-1">You Selected</p>
                                                    <div className="d-flex align-items-center flex-column">
                                                        <p className="mb-0">King Bed Appolo Resort with 3 Rooms. <Link to="#"
                                                            className="fw-medum text-primary">Change your Selection</Link></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bott-block d-block mb-3">
                                            <h5 className="fw-semibold fs-6">Your Price Summary</h5>
                                            <ul className="list-group list-group-borderless">
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span className="fw-medium mb-0">Rooms & Offers</span>
                                                    <span className="fw-semibold">$750.52</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span className="fw-medium mb-0">Total Discount<span
                                                        className="badge rounded-1 text-bg-danger smaller mb-0 ms-2">10% off</span></span>
                                                    <span className="fw-semibold">-$7.50</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span className="fw-medium mb-0">8% Taxes % Fees</span>
                                                    <span className="fw-semibold">$10.10</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span className="fw-medium text-success mb-0">Total Price</span>
                                                    <span className="fw-semibold text-success">$772.40</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bott-block">
                                            <button className="btn fw-medium btn-primary full-width" type="button">Request To Book</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="text-center d-flex align-items-center justify-content-center mt-4">
                                <Link to="/booking-page" className="btn btn-md btn-dark fw-semibold mx-2"><i
                                    className="fa-solid fa-arrow-left me-2"></i>Previous</Link>
                                <Link to="/bookingpage-03" className="btn btn-md btn-primary fw-semibold mx-2">Make Your Payment<i
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

export default BookingPage2;

