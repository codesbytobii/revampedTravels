import React from "react";

//import images
import air1 from "../../../assets/img/air-1.png";   
import air4 from "../../../assets/img/air-4.png";
import { Link } from "react-router-dom";

const MainConent = () => {
    return (
        <section className="pt-3 gray-simple">
            <div className="container">
                <div className="row">


                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="#" className="text-primary">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="#" className="text-primary">Flight</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Delhi To Los Angeles</li>
                            </ol>
                        </nav>
                    </div>


                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="row">
                            <div className="col-xl-9 col-lg-8 col-md-12">
                                <div className="card border-0 mb-4">
                                    <div className="card-body">
                                        <div className="crd-block d-md-flex align-items-start justify-content-start">
                                            <div className="crd-heaader-0 flex-shrink-0 mb-3 mb-md-0">
                                                <div className="square--70 rounded-2 bg-light-primary text-primary fs-3"><i className="bi bi-airplane"></i></div>
                                            </div>
                                            <div className="crd-heaader-first ps-md-3">
                                                <div className="d-inline-flex align-items-center mb-1">
                                                    <span className="label fw-medium bg-light-success text-success">Business Class</span>
                                                </div>
                                                <div className="d-block">
                                                    <h4 className="mb-0">Delhi(DLH)<span className="text-muted-2 mx-3"><i className="fa-solid fa-arrow-right-arrow-left"></i></span>Los Angeles(LOS)</h4>
                                                    <div className="explotter-info">
                                                        <p className="detail ellipsis-container">
                                                            <span className="ellipsis-item__normal">17 Sep</span>
                                                            <span className="separate ellipsis-item__normal"></span>
                                                            <span className="ellipsis-item">2 Stop</span>
                                                            <span className="separate ellipsis-item__normal"></span>
                                                            <span className="ellipsis-item">06H 10Min</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="card border-0 mb-4">
                                    <div className="card-body">
                                        <div className="flights-accordion">
                                            <div className="flights-list-item">
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
                                                                                <div className="text-muted text-sm fw-medium">DLH</div>
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
                                                                                <div className="text-muted text-sm fw-medium">LOS</div>
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
                                                                                <div className="text-muted text-sm fw-medium">LOS</div>
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
                                                                                <div className="text-muted text-sm fw-medium">DLH</div>
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
                                </div>


                                <div className="col-xl-12 col-lg-12 col-md-12">
                                    <div className="d-flex align-items-center justify-content-start py-3 px-3 rounded-2 bg-success mb-4">
                                        <p className="text-light fw-semibold m-0"><i className="fa-solid fa-gift text-warning me-2"></i><Link to="#"
                                            className="text-white text-decoration-underline">Login</Link> or <Link to="#"
                                                className="text-white text-decoration-underline">Register</Link> to earn upto 100 coins (approx 1.72 US$)
                                            after check-out.
                                        </p>
                                    </div>
                                </div>


                                <div className="col-xl-12 col-lg-12 col-md-12">

                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <h6 className="fw-semibold mb-0">Overview</h6>
                                        </div>

                                        <div className="card-body">
                                            <p className="mb-0">However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements. Besides, random text risks to be unintendedly humorous or offensive, an unacceptable risk in corporate environments. Lorem ipsum and its many variants have been employed since the early 1960ies, and quite likely since the sixteenth century.</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-xl-12 col-lg-12 col-md-12">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <h6 className="fw-semibold mb-0">Highlights</h6>
                                        </div>

                                        <div className="card-body">
                                            <ul className="row align-items-center p-0 g-3">
                                                <li className="col-md-6">
                                                    <i className="fa-solid fa-check text-success me-2"></i>A fantastic experience at the Niagara
                                                    Falls
                                                </li>
                                                <li className="col-md-6">
                                                    <i className="fa-solid fa-check text-success me-2"></i>Wonderful experience at the Harborfront
                                                </li>
                                                <li className="col-md-6">
                                                    <i className="fa-solid fa-check text-success me-2"></i>Breathtaking views at the Night at
                                                    Niagara Falls
                                                </li>
                                                <li className="col-md-6">
                                                    <i className="fa-solid fa-check text-success me-2"></i>Splendid experiences with the City
                                                    tours.
                                                </li>
                                                <li className="col-md-6">
                                                    <i className="fa-solid fa-check text-success me-2"></i>All led out world this music while
                                                    asked.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-xl-12 col-lg-12 col-md-12">

                                    <div className="card">
                                        <div className="card-header">
                                            <h6 className="fw-semibold mb-0">Traveler Details</h6>
                                        </div>

                                        <div className="card-body">

                                            <div className="bg-success bg-opacity-10 rounded-2 p-3 mb-3">
                                                <p className="h6 text-md mb-0"><span className="badge bg-success me-2">New</span>Please enter your name as per your passport ID</p>
                                            </div>

                                            <div className="gray rounded-3 position-relative p-4 mb-3">
                                                <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                                                    <Link to="#" className="text-primary fs-5"><i className="fa-solid fa-circle-xmark"></i></Link>
                                                </div>
                                                <div className="row align-items-center row-cols-xl-5 row-cols-lg-3 row-cols-md-3 col-cols-2">
                                                    <div className="col">
                                                        <p className="text-dark fw-semibold lh-base">Name</p>
                                                        <p className="text-muted-2 lh-1">Daniel Puran</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="text-dark fw-semibold lh-base">Passport</p>
                                                        <p className="text-muted-2 lh-1">BKP1256GH</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="text-dark fw-semibold lh-base">Gender</p>
                                                        <p className="text-muted-2 lh-1">Male</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="text-dark fw-semibold lh-base">Age</p>
                                                        <p className="text-muted-2 lh-1">42+</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="text-dark fw-semibold lh-base">Nationality</p>
                                                        <p className="text-muted-2 lh-1">Indian</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="gray rounded-3 position-relative p-4 mb-4">
                                                <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                                                    <Link to="#" className="text-primary fs-5"><i className="fa-solid fa-circle-xmark"></i></Link>
                                                </div>
                                                <div className="row align-items-center row-cols-xl-5 row-cols-lg-3 row-cols-md-3 col-cols-2">
                                                    <div className="col">
                                                        <p className="text-dark fw-semibold lh-base">Name</p>
                                                        <p className="text-muted-2 lh-1">Smrithi Puran</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="text-dark fw-semibold lh-base">Passport</p>
                                                        <p className="text-muted-2 lh-1">SPK6524GY</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="text-dark fw-semibold lh-base">Gender</p>
                                                        <p className="text-muted-2 lh-1">Female</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="text-dark fw-semibold lh-base">Age</p>
                                                        <p className="text-muted-2 lh-1">38+</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="text-dark fw-semibold lh-base">Nationality</p>
                                                        <p className="text-muted-2 lh-1">Indian</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="full-width d-flex flex-column mb-4 position-relative">

                                                <div className="row align-items-stat">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 mb-2">
                                                        <h5>Add More Passengers</h5>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label">First Name</label>
                                                            <input type="text" className="form-control" placeholder="Your First Name" />
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label">Last Name</label>
                                                            <input type="text" className="form-control" placeholder="Your Last Name" />
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label">Passport Number</label>
                                                            <input type="text" className="form-control" placeholder="Passport Number Here" />
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label">Passport Expire</label>
                                                            <input type="text" className="form-control" placeholder="Passport Expire Date" />
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label">Date of birth</label>
                                                            <input className="form-control fw-bold" type="text" placeholder="Select Date.." id="basicDate" readonly="readonly" />
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label">Nationality</label>
                                                            <select className="select form-control">
                                                                <option value="lv">Las Vegas</option>
                                                                <option value="la">Los Angeles</option>
                                                                <option value="kc">Kansas City</option>
                                                                <option value="no">New Orleans</option>
                                                                <option value="kc">Jacksonville</option>
                                                                <option value="lb">Long Beach</option>
                                                                <option value="cl">Columbus</option>
                                                                <option value="cn">Canada</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label">Gender</label>
                                                            <div className="form-group">
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="radio" name="gender" id="male" value="option1" />
                                                                    <label className="form-check-label" htmlFor="male">Male</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="radio" name="gender" id="female" value="option2" />
                                                                    <label className="form-check-label" htmlFor="female">Female</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                                        <button className="btn btn-md px-5 btn-light-primary fw-medium" type="button">Add Passengers</button>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="full-width d-flex flex-column mb-2 position-relative">

                                                <div className="row align-items-stat">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 mb-2">
                                                        <h5>Personal Information</h5>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label">Email Address</label>
                                                            <input type="text" className="form-control" placeholder="Email Here" />
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label">Mobile number</label>
                                                            <input type="text" className="form-control" placeholder="Contact Number" />
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                                        <button className="btn btn-md full-width px-5 btn-primary fw-medium" type="button">Submit & Proceed for Payment</button>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className="col-xl-3 col-lg-4 col-md-12">
                                <div className="card mb-4 mt-lg-0 mt-4">
                                    <div className="card-header"><h4>Price Summary</h4></div>
                                    <div className="card-body py-2">
                                        <div className="price-summary">
                                            <ul className="list-group">
                                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 py-2 px-0">
                                                    Base Fare
                                                    <span className="fw-semibold text-dark">1470</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 py-2 px-0">
                                                    Discount
                                                    <span className="fw-semibold text-success">-$45</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 py-2 px-0">
                                                    Other Services
                                                    <span className="fw-semibold text-dark">$25</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-white border-top py-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <p className="fw-semibold text-muted-2 mb-0">Total Price</p>
                                            <p className="fw-semibold text-primary mb-0">$1430</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card border rounded-3">
                                    <div className="card-header">
                                        <h4>Coupons & Offers</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group position-relative">
                                            <input type="text" className="form-control" placeholder="Have a Coupon Code?" value="" />
                                            <Link to="#" className="position-absolute top-50 end-0 fw-semibold translate-middle text-primary disable">Apply</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default MainConent;