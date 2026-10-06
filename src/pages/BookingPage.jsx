import Layout from '../components/Layout/Layout';

import hotel1 from "assets/img/hotel/hotel-1.jpg";
import air4 from "assets/img/air-4.png";
import air1 from "assets/img/air-1.png";
import { Link } from 'react-router-dom';
import NewsletterCTA from './Landing2/components/NewsletterCTA';

function BookingPage() {
    return (
        <Layout footerMode="dark" navbarMode="dark">
            <section className="pt-4 gray-simple position-relative">
                <div className="container">

                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div id="stepper" className="bs-stepper stepper-outline mb-5">
                                <div className="bs-stepper-header">
                                    
                                    <div className="step active" data-target="#step-1">
                                        <div className="text-center">
                                            <button type="button" className="step-trigger mb-0" id="steppertrigger1">
                                                <span className="bs-stepper-circle">1</span>
                                            </button>
                                            <h6 className="bs-stepper-label d-none d-md-block">Tour Review</h6>
                                        </div>
                                    </div>
                                    <div className="line"></div>

                                    
                                    <div className="step" data-target="#step-2">
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
                            <div className="row align-items-start">
                                <div className="col-xl-8 col-lg-8 col-md-12">
                                    <div className="card p-3 mb-xl-0 mb-lg-0 mb-3">

                                        
                                        <div className="card-box list-layout-block border br-dashed rounded-3 p-2">
                                            <div className="row">

                                                <div className="col-xl-4 col-lg-3 col-md">
                                                    <div className="cardImage__caps rounded-2 overflow-hidden h-100">
                                                        <img className="img-fluid h-100 object-fit" src={hotel1} alt="image" />
                                                    </div>
                                                </div>

                                                <div className="col-xl col-lg col-md">
                                                    <div className="listLayout_midCaps mt-md-0 mt-3 mb-md-0 mb-3">
                                                        <div className="d-flex align-items-center justify-content-start">
                                                            <div className="d-inline-block">
                                                                <i className="fa fa-star text-warning text-xs"></i>
                                                                <i className="fa fa-star text-warning text-xs"></i>
                                                                <i className="fa fa-star text-warning text-xs"></i>
                                                                <i className="fa fa-star text-warning text-xs"></i>
                                                                <i className="fa fa-star text-warning text-xs"></i>
                                                            </div>
                                                        </div>
                                                        <h4 className="fs-5 fw-bold mb-1">Hotel Chancellor@Orchard</h4>
                                                        <ul className="row g-2 p-0">
                                                            <li className="col-auto">
                                                                <p className="text-muted-2 text-md">Waterloo and Southwark</p>
                                                            </li>
                                                            <li className="col-auto">
                                                                <p className="text-muted-2 text-md fw-bold">.</p>
                                                            </li>
                                                            <li className="col-auto">
                                                                <p className="text-muted-2 text-md">9.8 km from Delhi Airport</p>
                                                            </li>
                                                        </ul>
                                                        <div className="d-flex align-items-center mb-3">
                                                            <div className="col-auto">
                                                                <div className="square--40 rounded-2 bg-primary text-light fw-semibold">4.8</div>
                                                            </div>
                                                            <div className="col-auto text-start ps-2">
                                                                <div className="text-md text-dark fw-medium">Exceptional</div>
                                                                <div className="text-md text-muted-2">3,014 reviews</div>
                                                            </div>
                                                        </div>
                                                        <div className="position-relative mt-3">
                                                            <div className="d-flex flex-wrap align-items-center">
                                                                <div className="d-inline-flex align-items-center border br-dashed rounded-2 p-2 me-2 mb-2">
                                                                    <div className="export-icon text-muted-2"><i className="fa-solid fa-bed"></i></div>
                                                                    <div className="export ps-2">
                                                                        <span className="mb-0 text-muted-2 fw-semibold me-1">03</span><span
                                                                            className="mb-0 text-muted-2 text-md">Beds</span>
                                                                    </div>
                                                                </div>
                                                                <div className="d-inline-flex align-items-center border br-dashed rounded-2 p-2 me-2 mb-2">
                                                                    <div className="export-icon text-muted-2"><i className="fa-solid fa-bath"></i></div>
                                                                    <div className="export ps-2">
                                                                        <span className="mb-0 text-muted-2 fw-semibold me-1">02</span><span
                                                                            className="mb-0 text-muted-2 text-md">Baths</span>
                                                                    </div>
                                                                </div>
                                                                <div className="d-inline-flex align-items-center border br-dashed rounded-2 p-2 me-2 mb-2">
                                                                    <div className="export-icon text-muted-2"><i
                                                                        className="fa-solid fa-house-flood-water-circle-arrow-right"></i></div>
                                                                    <div className="export ps-2">
                                                                        <span className="mb-0 text-muted-2 fw-semibold me-1">5</span><span
                                                                            className="mb-0 text-muted-2 text-md">Floor</span>
                                                                    </div>
                                                                </div>
                                                                <div className="d-inline-flex align-items-center border br-dashed rounded-2 p-2 me-2 mb-2">
                                                                    <div className="export-icon text-muted-2"><i className="fa-solid fa-user-group"></i></div>
                                                                    <div className="export ps-2 text-muted-2">
                                                                        <span className="mb-0 text-muted-2 fw-semibold me-1">04</span><span
                                                                            className="mb-0 text-muted-2 text-md">Guests</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        <div className="flight-boxyhc mt-4">
                                            <h4 className="fs-5">Flight Detail</h4>
                                            <div className="flights-accordion">
                                                <div className="flights-list-item bg-white border rounded-3 p-2">
                                                    <div className="row gy-4 align-items-center justify-content-between">

                                                        <div className="col">
                                                            <div className="row">
                                                                <div className="col-xl-12 col-lg-12 col-md-12">
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <span className="label bg-light-primary text-primary me-2">Departure</span>
                                                                        <span className="text-muted text-sm">26 Jun 2023</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-12 col-lg-12 col-md-12">
                                                                    <div className="row gx-lg-5 gx-3 gy-4 align-items-center">

                                                                        <div className="col-sm-auto">
                                                                            <div className="d-flex align-items-center justify-content-start">
                                                                                <div className="d-start fl-pic">
                                                                                    <img className="img-fluid" src={air4} width="45" alt="image" />
                                                                                </div>
                                                                                <div className="d-end fl-title ps-2">
                                                                                    <div className="text-dark fw-medium">Qutar Airways</div>
                                                                                    <div className="text-sm text-muted">First Class</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col">
                                                                            <div className="row gx-3 align-items-center">
                                                                                <div className="col-auto">
                                                                                    <div className="text-dark fw-bold">07:40</div>
                                                                                    <div className="text-muted text-sm fw-medium">DOH</div>
                                                                                </div>

                                                                                <div className="col text-center">
                                                                                    <div className="flightLine departure">
                                                                                        <div></div>
                                                                                        <div></div>
                                                                                    </div>
                                                                                    <div className="text-muted text-sm fw-medium mt-3">Direct</div>
                                                                                </div>

                                                                                <div className="col-auto">
                                                                                    <div className="text-dark fw-bold">12:20</div>
                                                                                    <div className="text-muted text-sm fw-medium">DEL</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-auto">
                                                                            <div className="text-dark fw-medium">4H 40M</div>
                                                                            <div className="text-muted text-sm fw-medium">2 Stop</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-4">
                                                                <div className="col-xl-12 col-lg-12 col-md-12">
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <span className="label bg-light-success text-success me-2">Return</span>
                                                                        <span className="text-muted text-sm">26 Jun 2023</span>
                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-12 col-lg-12 col-md-12">
                                                                    <div className="row gx-lg-5 gx-3 gy-4 align-items-center">
                                                                        <div className="col-sm-auto">
                                                                            <div className="d-flex align-items-center justify-content-start">
                                                                                <div className="d-start fl-pic">
                                                                                    <img className="img-fluid" src={air1} width="45" alt="image" />
                                                                                </div>
                                                                                <div className="d-end fl-title ps-2">
                                                                                    <div className="text-dark fw-medium">Qutar Airways</div>
                                                                                    <div className="text-sm text-muted">Business</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col">
                                                                            <div className="row gx-3 align-items-center">
                                                                                <div className="col-auto">
                                                                                    <div className="text-dark fw-bold">14:10</div>
                                                                                    <div className="text-muted text-sm fw-medium">DEL</div>
                                                                                </div>

                                                                                <div className="col text-center">
                                                                                    <div className="flightLine return">
                                                                                        <div></div>
                                                                                        <div></div>
                                                                                    </div>
                                                                                    <div className="text-muted text-sm fw-medium mt-3">Direct</div>
                                                                                </div>

                                                                                <div className="col-auto">
                                                                                    <div className="text-dark fw-bold">19:30</div>
                                                                                    <div className="text-muted text-sm fw-medium">DOH</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-auto">
                                                                            <div className="text-dark fw-medium">5H 30M</div>
                                                                            <div className="text-muted text-sm fw-medium">2 Stop</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        <div className="flight-boxyhc mt-4">
                                            <h4 className="fs-5">Good To Know</h4>
                                            <div className="effloration-wrap">
                                                <p>All Prices are in Indian Rupees and are subject to change without prior notice. In the case FIT
                                                    flight inclusive package, the full amount of the flight will be payable at the time of booking.
                                                </p>
                                                <ul className="row align-items-center g-1 mb-0 p-0">
                                                    <li className="col-12"><span className="text-success text-md"><i
                                                        className="fa-solid fa-circle-dot me-2"></i>Free Cancellation till 10 Aug 2023</span></li>
                                                    <li className="col-12"><span className="text-muted-2 text-md"><i
                                                        className="fa-solid fa-circle-dot me-2"></i>10 days: 100%</span></li>
                                                    <li className="col-12"><span className="text-muted-2 text-md"><i
                                                        className="fa-solid fa-circle-dot me-2"></i>10 to 15 days: 75% + Non Refundable
                                                        Component</span></li>
                                                    <li className="col-12"><span className="text-muted-2 text-md"><i
                                                        className="fa-solid fa-circle-dot me-2"></i>15 to 30 days: 30% + Non Refundable
                                                        Component</span></li>
                                                    <li className="col-12"><span className="text-success text-md"><i
                                                        className="fa-solid fa-circle-dot me-2"></i>10Hotel / Air: 100% in case of non-refundable
                                                        ticket / Hotel Room</span></li>
                                                    <li className="col-12"><span className="text-muted-2 text-md"><i
                                                        className="fa-solid fa-circle-dot me-2"></i>10Cruise / Visa: On Actuals</span></li>
                                                </ul>
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
                                <Link to="/bookingpage-02" className="btn btn-md btn-primary fw-semibold">Next<i
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

export default BookingPage;

