import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import DashboardMenu from './components/DashboardMenu';

import team1 from "assets/img/team-1.jpg";
import team3 from "assets/img/team-3.jpg";
import team6 from "assets/img/team-6.jpg";
import card from "assets/img/card.png";
import NewsletterCTA from '../Landing2/components/NewsletterCTA';
import { Link } from 'react-router-dom';

const PaymentDetail = () => {

    return (
        <Layout>
            <div className="dashboard-menus border-top d-none d-lg-block">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <DashboardMenu />
                        </div>
                    </div>
                </div>
            </div>

            <section className="pt-5 gray-simple position-relative">
                <div className="container">

                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
                            <button className="btn btn-dark fw-medium full-width d-block d-lg-none" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasDashboard" aria-controls="offcanvasDashboard"><i
                                    className="fa-solid fa-gauge me-2"></i>Dashboard
                                Navigation</button>
                            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
                                id="offcanvasDashboard" aria-labelledby="offcanvasScrollingLabel">
                                <div className="offcanvas-header gray-simple">
                                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Navigation</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body p-0">
                                    <ul className="user-Dashboard-longmenu">
                                        <li><Link to="/my-profile"><i className="fa-regular fa-id-card me-2"></i>My Profile</Link></li>
                                        <li><Link to="/my-booking"><i className="fa-solid fa-ticket me-2"></i>My Booking</Link>
                                        </li>
                                        <li><Link to="/travelers"><i className="fa-solid fa-user-group me-2"></i>Travelers</Link></li>
                                        <li className="active"><Link to="/payment-detail"><i className="fa-solid fa-wallet me-2"></i>Payment
                                            Details</Link></li>
                                        <li><Link to="/my-wishlists"><i className="fa-solid fa-shield-heart me-2"></i>My Wishlist</Link></li>
                                        <li><Link to="/settings"><i className="fa-solid fa-sliders me-2"></i>Settings</Link></li>
                                        <li><Link to="/delete-account"><i className="fa-solid fa-trash-can me-2"></i>Delete Profile</Link></li>
                                        <li><Link to="/login"><i className="fa-solid fa-power-off me-2"></i>Sign Out</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-start justify-content-between gx-xl-4">

                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="card rounded-2 me-xl-5 mb-4">
                                <div className="card-top bg-primary position-relative">
                                    <div className="position-absolute end-0 top-0 mt-4 me-3"><Link to="login"
                                        className="square--40 circle bg-light-dark text-light"><i
                                            className="fa-solid fa-right-from-bracket"></i></Link></div>
                                    <div className="py-5 px-3">
                                        <div className="crd-thumbimg text-center">
                                            <div className="p-2 d-flex align-items-center justify-content-center brd"><img src={team1}
                                                className="img-fluid circle" width="120" alt="" /></div>
                                        </div>
                                        <div className="crd-capser text-center">
                                            <h5 className="mb-0 text-light fw-semibold">Adam K. Divliars</h5>
                                            <span className="text-light opacity-75 fw-medium text-md"><i
                                                className="fa-solid fa-location-dot me-2"></i>California, USA</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-middle px-4 py-5">
                                    <div className="crdapproval-groups">

                                        <div className="crdapproval-single d-flex align-items-center justify-content-start mb-4">
                                            <div className="crdapproval-item">
                                                <div className="square--50 circle bg-light-primary text-primary"><i
                                                    className="fa-solid fa-envelope-circle-check fs-5"></i></div>
                                            </div>
                                            <div className="crdapproval-caps ps-2">
                                                <div className="d-flippo">
                                                    <p className="fw-semibold text-dark lh-2 mb-0">Verified Your Email</p>
                                                    <span className="text-success" data-bs-toggle="tooltip" data-bs-title="Your Email is Verified"><i className="bi bi-patch-check-fill"></i></span>
                                                </div>
                                                <div className="d-flippo">
                                                    <p className="text-md text-muted lh-1 mb-0">20% Done</p>
                                                    <p className="mb-0"><Link to="#" className="text-dark">Update</Link></p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="crdapproval-single d-flex align-items-center justify-content-start mb-4">
                                            <div className="crdapproval-item">
                                                <div className="square--50 circle bg-light-primary text-primary"><i
                                                    className="fa-solid fa-phone-volume fs-5"></i></div>
                                            </div>
                                            <div className="crdapproval-caps ps-2">
                                                <div className="d-flippo">
                                                    <p className="fw-semibold text-dark lh-2 mb-0">Verify Your Mobile</p>
                                                    <span className="text-success" data-bs-toggle="tooltip" data-bs-title="Your Mobile No. is Verified"><i className="bi bi-patch-check-fill"></i></span>
                                                </div>
                                                <div className="d-flippo">
                                                    <p className="text-md text-muted lh-1 mb-0">20% Done</p>
                                                    <p className="mb-0"><Link to="#" className="text-dark">Update</Link></p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="crdapproval-single d-flex align-items-center justify-content-start">
                                            <div className="crdapproval-item">
                                                <div className="square--50 circle bg-light-primary text-primary"><i
                                                    className="fa-solid fa-file-invoice fs-5"></i></div>
                                            </div>
                                            <div className="crdapproval-caps ps-2">
                                                <div className="d-flippo">
                                                    <p className="fw-semibold text-dark lh-2 mb-0">Incomplete Basic Info</p>
                                                    <span className="text-muted" data-bs-toggle="tooltip" data-bs-title="Profile is Incomplete"><i className="bi bi-patch-check-fill"></i></span>
                                                </div>
                                                <div className="d-flippo">
                                                    <p className="text-md text-muted lh-1 mb-0">20% Left</p>
                                                    <p className="mb-0"><Link to="#" className="text-dark">Complete</Link></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="card-middle mt-5 mb-4 px-4">
                                    <div className="revs-wraps mb-3">
                                        <div className="revs-wraps-flex d-flex align-items-center justify-content-between mb-1">
                                            <span className="text-dark fw-semibold text-md">Complete Your Profile</span>
                                            <span className="text-dark fw-semibold text-md">75%</span>
                                        </div>
                                        <div className="progress " role="progressbar" aria-label="Example" aria-valuenow="87" aria-valuemin="0"
                                            aria-valuemax="100" style={{height: "7px"}}>
                                            <div className="progress-bar bg-success" style={{width: "87%"}}></div>
                                        </div>
                                    </div>
                                    <div className="crd-upgrades">
                                        <button className="btn btn-light-primary fw-medium full-width rounded-2" type="button"><i
                                            className="fa-solid fa-sun me-2"></i>Upgrade Pro</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-8 col-lg-8 col-md-12">


                            <div className="card mb-4">
                                <div className="card-header">
                                    <h4><i className="fa-solid fa-wallet me-2"></i>Payment Details</h4>
                                </div>
                                <div className="card-body gap-4">

                                    <h4 className="fs-5 fw-semibold">Saved Card (02)</h4>

                                    <div className="row justify-content-start g-3">
                                        <div className="col-xl-5 col-lg-6 col-md-6">
                                            <div className="card h-100">
                                                <div className="bg-dark p-4 rounded-3">
                                                    <div className="d-flex justify-content-between align-items-start">
                                                        <img className="img-fluid" src={team1} width="55" alt="" />

                                                        <div className="dropdown">
                                                            <a className="text-white" href="#" id="creditcardDropdown" role="button"
                                                                data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">

                                                                <svg width="24" height="24" fill="none">
                                                                    <circle fill="currentColor" cx="12.5" cy="3.5" r="2.5"></circle>
                                                                    <circle fill="currentColor" opacity="0.5" cx="12.5" cy="11.5" r="2.5"></circle>
                                                                    <circle fill="currentColor" opacity="0.3" cx="12.5" cy="19.5" r="2.5"></circle>
                                                                </svg>
                                                            </a>
                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="creditcardDropdown">
                                                                <li><a className="dropdown-item" href="#"><i
                                                                    className="bi bi-credit-card-2-front-fill me-2 fw-icon"></i>Edit card</a></li>
                                                                <li><a className="dropdown-item" href="#"><i
                                                                    className="bi bi-calculator me-2 fw-icon"></i>Currency converter</a></li>
                                                            </ul>
                                                        </div>

                                                    </div>
                                                    <h4 className="text-white fs-6 mt-4">**** **** **** 1569</h4>
                                                    <div className="d-flex justify-content-between text-white mt-4">
                                                        <div className="d-flex flex-column">
                                                            <span className="text-md">Issued To</span>
                                                            <span className="text-sm fw-medium text-uppercase">Daniel Duekoza</span>
                                                        </div>
                                                        <div className="d-flex text-end flex-column">
                                                            <span className="text-md">Valid Thru</span>
                                                            <span>12/2027</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-5 col-lg-6 col-md-6">
                                            <div className="card h-100">
                                                <div className="bg-seegreen p-4 rounded-3">
                                                    <div className="d-flex justify-content-between align-items-start">
                                                        <img className="img-fluid" src={card} width="55" alt="" />

                                                        <div className="dropdown">
                                                            <a className="text-white" href="#" id="creditcardDropdown1" role="button"
                                                                data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">

                                                                <svg width="24" height="24" fill="none">
                                                                    <circle fill="currentColor" cx="12.5" cy="3.5" r="2.5"></circle>
                                                                    <circle fill="currentColor" opacity="0.5" cx="12.5" cy="11.5" r="2.5"></circle>
                                                                    <circle fill="currentColor" opacity="0.3" cx="12.5" cy="19.5" r="2.5"></circle>
                                                                </svg>
                                                            </a>
                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="creditcardDropdown1">
                                                                <li><a className="dropdown-item" href="#"><i
                                                                    className="bi bi-credit-card-2-front-fill me-2 fw-icon"></i>Edit card</a></li>
                                                                <li><a className="dropdown-item" href="#"><i
                                                                    className="bi bi-calculator me-2 fw-icon"></i>Currency converter</a></li>
                                                            </ul>
                                                        </div>

                                                    </div>
                                                    <h4 className="text-white fs-6 mt-4">**** **** **** 1563</h4>
                                                    <div className="d-flex justify-content-between text-white mt-4">
                                                        <div className="d-flex flex-column">
                                                            <span className="text-md">Issued To</span>
                                                            <span className="text-sm fw-medium text-uppercase">Daniel Duekoza</span>
                                                        </div>
                                                        <div className="d-flex text-end flex-column">
                                                            <span className="text-md">Valid Thru</span>
                                                            <span>12/2027</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-2 col-lg-6 col-md-6">
                                            <div
                                                className="card d-flex align-items-center justify-content-center border br-dashed border-2 py-3 h-100">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <Link to="#" className="square--60 circle bg-light-primary text-primary fs-2" data-bs-toggle="modal"
                                                        data-bs-target="#addcard"><i className="fa-solid fa-circle-plus"></i></Link>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="card mb-4">
                                <div className="card-header">
                                    <h4><i className="fa-solid fa-file-invoice-dollar me-2"></i>Billing History</h4>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Transaction ID</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Amout</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>01</th>
                                                <td>BK32154</td>
                                                <td>10 Sep 2023</td>
                                                <td><span className="badge bg-light-success text-success fw-medium text-uppercase">Paid</span></td>
                                                <td><span className="text-md fw-medium text-dark">$240</span></td>
                                            </tr>
                                            <tr>
                                                <th>02</th>
                                                <td>BK32155</td>
                                                <td>08 Aug 2023</td>
                                                <td><span className="badge bg-light-warning text-warning fw-medium text-uppercase">UnPaid</span></td>
                                                <td><span className="text-md fw-medium text-dark">$240</span></td>
                                            </tr>
                                            <tr>
                                                <th>03</th>
                                                <td>BK32156</td>
                                                <td>10 Aug 2023</td>
                                                <td><span className="badge bg-light-info text-info fw-medium text-uppercase">Hold</span></td>
                                                <td><span className="text-md fw-medium text-dark">$240</span></td>
                                            </tr>
                                            <tr>
                                                <th>04</th>
                                                <td>BK32157</td>
                                                <td>22 Jul 2023</td>
                                                <td><span className="badge bg-light-seegreen text-seegreen fw-medium text-uppercase">completed</span>
                                                </td>
                                                <td><span className="text-md fw-medium text-dark">$240</span></td>
                                            </tr>
                                            <tr>
                                                <th>05</th>
                                                <td>BK32158</td>
                                                <td>16 Jun 2023</td>
                                                <td><span className="badge bg-light-danger text-danger fw-medium text-uppercase">cancel</span></td>
                                                <td><span className="text-md fw-medium text-dark">$240</span></td>
                                            </tr>
                                            <tr>
                                                <th>06</th>
                                                <td>BK32159</td>
                                                <td>20 May 2023</td>
                                                <td><span className="badge bg-light-info text-info fw-medium text-uppercase">hold</span></td>
                                                <td><span className="text-md fw-medium text-dark">$240</span></td>
                                            </tr>
                                            <tr>
                                                <th>07</th>
                                                <td>BK32160</td>
                                                <td>18 Apr 2023</td>
                                                <td><span className="badge bg-light-seegreen text-seegreen fw-medium text-uppercase">completed</span>
                                                </td>
                                                <td><span className="text-md fw-medium text-dark">$240</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
             <NewsletterCTA />
        </Layout>
    );
};

export default PaymentDetail;
