import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import DashboardMenu from './components/DashboardMenu';

//import images
import hotel from 'assets/img/hotel/hotel-1.jpg';
import team1 from 'assets/img/team-1.jpg';
import NewsletterCTA from '../Landing2/components/NewsletterCTA';
import { Link } from 'react-router-dom';

const MyWishlists = () => {

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
                                        <li><Link to="/payment-detail"><i className="fa-solid fa-wallet me-2"></i>Payment Details</Link></li>
                                        <li className="active"><Link to="/my-wishlists"><i className="fa-solid fa-shield-heart me-2"></i>My
                                            Wishlist</Link></li>
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
                                    <div className="position-absolute end-0 top-0 mt-4 me-3"><Link to="login.html"
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

                            <div className="card">
                                <div className="card-header">
                                    <h4><i className="fa-solid fa-shield-heart me-2"></i>My Wishlist</h4>
                                </div>
                                <div className="card-body">

                                    <div className="card list-layout-block border rounded-3 p-3 mb-4">
                                        <div className="row">

                                            <div className="col-xl-4 col-lg-3 col-md">
                                                <div className="cardImage__caps rounded-2 overflow-hidden h-100">
                                                    <img className="img-fluid h-100 object-fit" src={hotel} alt="image" />
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
                                                        <li className="col-auto">
                                                            <p className="text-muted-2 text-md fw-bold">.</p>
                                                        </li>
                                                        <li className="col-auto">
                                                            <p className="text-muted-2 text-md"><Link to="#" className="text-primary">Show on Map</Link></p>
                                                        </li>
                                                    </ul>
                                                    <div className="detail ellipsis-container mt-3">
                                                        <span className="ellipsis">Parking</span>
                                                        <span className="ellipsis">WiFi</span>
                                                        <span className="ellipsis">Eating</span>
                                                        <span className="ellipsis">Cooling</span>
                                                        <span className="ellipsis">Pet</span>
                                                    </div>
                                                    <div className="position-relative mt-3">
                                                        <div className="fw-medium text-dark">Standard Twin Double Room</div>
                                                        <div className="text-md text-muted">Last booed 25min ago</div>
                                                    </div>
                                                    <div className="position-relative mt-4">
                                                        <div className="d-block position-relative"><span className="label bg-light-success text-success">Free
                                                            Cancellation, till 1 hour of Pick up</span></div>
                                                        <div className="text-md">
                                                            <p className="m-0">Room type: Standard King Room <a className="text-primary">Change Room</a></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="card list-layout-block border rounded-3 p-3 mb-4">
                                        <div className="row">

                                            <div className="col-xl-4 col-lg-3 col-md">
                                                <div className="cardImage__caps rounded-2 overflow-hidden h-100">
                                                    <img className="img-fluid h-100 object-fit" src={hotel} alt="image" />
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
                                                        <li className="col-auto">
                                                            <p className="text-muted-2 text-md fw-bold">.</p>
                                                        </li>
                                                        <li className="col-auto">
                                                            <p className="text-muted-2 text-md"><Link to="#" className="text-primary">Show on Map</Link></p>
                                                        </li>
                                                    </ul>
                                                    <div className="detail ellipsis-container mt-3">
                                                        <span className="ellipsis">Parking</span>
                                                        <span className="ellipsis">WiFi</span>
                                                        <span className="ellipsis">Eating</span>
                                                        <span className="ellipsis">Cooling</span>
                                                        <span className="ellipsis">Pet</span>
                                                    </div>
                                                    <div className="position-relative mt-3">
                                                        <div className="fw-medium text-dark">Standard Twin Double Room</div>
                                                        <div className="text-md text-muted">Last booed 25min ago</div>
                                                    </div>
                                                    <div className="position-relative mt-4">
                                                        <div className="d-block position-relative"><span className="label bg-light-success text-success">Free
                                                            Cancellation, till 1 hour of Pick up</span></div>
                                                        <div className="text-md">
                                                            <p className="m-0">Room type: Standard King Room <a className="text-primary">Change Room</a></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="card list-layout-block border rounded-3 p-3 mb-4">
                                        <div className="row">

                                            <div className="col-xl-4 col-lg-3 col-md">
                                                <div className="cardImage__caps rounded-2 overflow-hidden h-100">
                                                    <img className="img-fluid h-100 object-fit" src={hotel} alt="image" />
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
                                                        <li className="col-auto">
                                                            <p className="text-muted-2 text-md fw-bold">.</p>
                                                        </li>
                                                        <li className="col-auto">
                                                            <p className="text-muted-2 text-md"><Link to="#" className="text-primary">Show on Map</Link></p>
                                                        </li>
                                                    </ul>
                                                    <div className="detail ellipsis-container mt-3">
                                                        <span className="ellipsis">Parking</span>
                                                        <span className="ellipsis">WiFi</span>
                                                        <span className="ellipsis">Eating</span>
                                                        <span className="ellipsis">Cooling</span>
                                                        <span className="ellipsis">Pet</span>
                                                    </div>
                                                    <div className="position-relative mt-3">
                                                        <div className="fw-medium text-dark">Standard Twin Double Room</div>
                                                        <div className="text-md text-muted">Last booed 25min ago</div>
                                                    </div>
                                                    <div className="position-relative mt-4">
                                                        <div className="d-block position-relative"><span className="label bg-light-success text-success">Free
                                                            Cancellation, till 1 hour of Pick up</span></div>
                                                        <div className="text-md">
                                                            <p className="m-0">Room type: Standard King Room <a className="text-primary">Change Room</a></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="card list-layout-block border rounded-3 p-3">
                                        <div className="row">

                                            <div className="col-xl-4 col-lg-3 col-md">
                                                <div className="cardImage__caps rounded-2 overflow-hidden h-100">
                                                    <img className="img-fluid h-100 object-fit" src={hotel} alt="image" />
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
                                                        <li className="col-auto">
                                                            <p className="text-muted-2 text-md fw-bold">.</p>
                                                        </li>
                                                        <li className="col-auto">
                                                            <p className="text-muted-2 text-md"><Link to="#" className="text-primary">Show on Map</Link></p>
                                                        </li>
                                                    </ul>
                                                    <div className="detail ellipsis-container mt-3">
                                                        <span className="ellipsis">Parking</span>
                                                        <span className="ellipsis">WiFi</span>
                                                        <span className="ellipsis">Eating</span>
                                                        <span className="ellipsis">Cooling</span>
                                                        <span className="ellipsis">Pet</span>
                                                    </div>
                                                    <div className="position-relative mt-3">
                                                        <div className="fw-medium text-dark">Standard Twin Double Room</div>
                                                        <div className="text-md text-muted">Last booed 25min ago</div>
                                                    </div>
                                                    <div className="position-relative mt-4">
                                                        <div className="d-block position-relative"><span className="label bg-light-success text-success">Free
                                                            Cancellation, till 1 hour of Pick up</span></div>
                                                        <div className="text-md">
                                                            <p className="m-0">Room type: Standard King Room <a className="text-primary">Change Room</a></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

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

export default MyWishlists;
