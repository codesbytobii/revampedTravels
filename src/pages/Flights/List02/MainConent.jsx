import React from "react";
import { Col, Container, Row } from "react-bootstrap";

//import images
import air1 from "../../../assets/img/air-1.png";
import air2 from "../../../assets/img/air-2.png";
import air3 from "../../../assets/img/air-3.png";
import air4 from "../../../assets/img/air-4.png";
import air5 from "../../../assets/img/air-5.png";
import { Link } from "react-router-dom";

const MainConent = () => {
    const [activeFare, setActiveFare] = React.useState(0);

    const handleFareClick = (index) => {
        setActiveFare(index);
    };

    const fareData = [
        { date: 'Sat, 21 Jun', price: 269 },
        { date: 'Sun, 22 Jun', price: 266 },
        { date: 'Mon, 23 Jun', price: 187 },
        { date: 'Tue, 24 Jun', price: 187 },
        { date: 'Wed, 25 Jun', price: 219 },
        { date: 'Thu, 26 Jun', price: 233 },
        { date: 'Fri, 27 Jun', price: 187 }
    ];
    return (
        <section className="gray-simple">
            <Container>
                <Row className="justify-content-between gy-4 gx-xl-4 gx-lg-3 gx-md-3 gx-4">

                    <Col xl={3} lg={4} md={12}>
                        <div className="filter-searchBar bg-white rounded-3">
                            <div className="filter-searchBar-head border-bottom">
                                <div className="searchBar-headerBody d-flex align-items-start justify-content-between px-3 py-3">
                                    <div className="searchBar-headerfirst">
                                        <h6 className="fw-bold fs-5 m-0">Filters</h6>
                                        <p className="text-md text-muted m-0">Showing 180 Flights</p>
                                    </div>
                                    <div className="searchBar-headerlast text-end">
                                        <Link to="#" className="text-md fw-medium text-primary active">Clear All</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="filter-searchBar-body">
                                <div className="searchBar-single px-3 py-3 border-bottom">
                                    <div className="searchBar-single-title d-flex mb-3">
                                        <h6 className="sidebar-subTitle fs-6 fw-medium m-0">Departure</h6>
                                    </div>
                                    <div className="searchBar-single-wrap mb-4">
                                        <ul className="row align-items-center justify-content-between p-0 gx-3 gy-2">
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="before6am" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width"
                                                    htmlFor="before6am">Before 6AM</label>
                                            </li>
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="6am12pm" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width" htmlFor="6am12pm">6AM -
                                                    12PM</label>
                                            </li>
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="12pm6pm" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width" htmlFor="12pm6pm">12PM -
                                                    6PM</label>
                                            </li>
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="after6pm" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width" htmlFor="after6pm">After
                                                    6PM</label>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="searchBar-single-title d-flex mb-3">
                                        <h6 className="sidebar-subTitle fs-6 fw-medium m-0">Return</h6>
                                    </div>
                                    <div className="searchBar-single-wrap">
                                        <ul className="row align-items-center justify-content-between p-0 gx-3 gy-2">
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="before6am1" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width"
                                                    htmlFor="before6am1">Before 6AM</label>
                                            </li>
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="6am12pm1" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width" htmlFor="6am12pm1">6AM -
                                                    12PM</label>
                                            </li>
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="12pm6pm1" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width" htmlFor="12pm6pm1">12PM
                                                    - 6PM</label>
                                            </li>
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="after6pm1" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width"
                                                    htmlFor="after6pm1">After 6PM</label>
                                            </li>
                                        </ul>
                                    </div>

                                </div>


                                <div className="searchBar-single px-3 py-3 border-bottom">
                                    <div className="searchBar-single-title d-flex mb-3">
                                        <h6 className="sidebar-subTitle fs-6 fw-medium m-0">Onward Stops</h6>
                                    </div>
                                    <div className="searchBar-single-wrap">
                                        <ul className="row align-items-center justify-content-between p-0 gx-3 gy-2">
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="direct" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width"
                                                    htmlFor="direct">Direct</label>
                                            </li>
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="1stop" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width" htmlFor="1stop">1
                                                    Stop</label>
                                            </li>
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="2stop" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width" htmlFor="2stop">2+
                                                    Stop</label>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="searchBar-single-title d-flex mb-3">
                                        <h6 className="sidebar-subTitle fs-6 fw-medium m-0">Return Stops</h6>
                                    </div>
                                    <div className="searchBar-single-wrap">
                                        <ul className="row align-items-center justify-content-between p-0 gx-3 gy-2">
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="direct1" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width"
                                                    htmlFor="direct1">Direct</label>
                                            </li>
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="1stop1" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width" htmlFor="1stop1">1
                                                    Stop</label>
                                            </li>
                                            <li className="col-6">
                                                <input type="checkbox" className="btn-check" id="2stop1" />
                                                <label className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width" htmlFor="2stop1">2+
                                                    Stop</label>
                                            </li>
                                        </ul>
                                    </div>

                                </div>


                                <div className="searchBar-single px-3 py-3 border-bottom">
                                    <div className="searchBar-single-title d-flex mb-3">
                                        <h6 className="sidebar-subTitle fs-6 fw-medium m-0">Pricing Range in US$</h6>
                                    </div>
                                    <div className="searchBar-single-wrap">
                                        <input type="text" className="js-range-slider" name="my_range" value="" data-skin="round"
                                            data-type="double" data-min="0" data-max="1000" data-grid="false" />
                                    </div>
                                </div>


                                <div className="searchBar-single px-3 py-3 border-bottom">
                                    <div className="searchBar-single-title d-flex mb-3">
                                        <h6 className="sidebar-subTitle fs-6 fw-medium m-0">Facilities</h6>
                                    </div>
                                    <div className="searchBar-single-wrap">
                                        <ul className="row align-items-center justify-content-between p-0 gx-3 gy-2">
                                            <li className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="baggage" />
                                                    <label className="form-check-label" htmlFor="baggage">Baggage</label>
                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="inflightmeal" />
                                                    <label className="form-check-label" htmlFor="inflightmeal">In-flight Meal</label>
                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="inflightenter" />
                                                    <label className="form-check-label" htmlFor="inflightenter">In-flight Entertainment</label>
                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="flswifi" />
                                                    <label className="form-check-label" htmlFor="flswifi">WiFi</label>
                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="flusbport" />
                                                    <label className="form-check-label" htmlFor="flusbport">Power/USB Port</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </div>


                                <div className="searchBar-single px-3 py-3 border-bottom">
                                    <div className="searchBar-single-title d-flex align-items-center justify-content-between mb-3">
                                        <h6 className="sidebar-subTitle fs-6 fw-medium m-0">Preferred Airlines</h6>
                                        <Link to="#" className="text-md fw-medium text-muted active">Reset</Link>
                                    </div>
                                    <div className="searchBar-single-wrap">
                                        <ul className="row align-items-center justify-content-between p-0 gx-3 gy-2">
                                            <li className="col-12">
                                                <div className="form-check lg">
                                                    <div className="frm-slicing d-flex align-items-center">
                                                        <div className="frm-slicing-first">
                                                            <input className="form-check-input" type="checkbox" id="baggage8" />
                                                            <label className="form-check-label" htmlFor="baggage8"></label>
                                                        </div>
                                                        <div
                                                            className="frm-slicing-end d-flex align-items-center justify-content-between full-width ps-1">
                                                            <div className="frms-flex d-flex align-items-center">
                                                                <div className="frm-slicing-img"><img src={air1} className="img-fluid" width="25"
                                                                    alt="" /></div>
                                                                <div className="frm-slicing-title ps-2"><span className="text-muted-2">Air India</span></div>
                                                            </div>
                                                            <div className="text-end"><span className="text-md text-muted-2 opacity-75">$390.00</span></div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="form-check lg">
                                                    <div className="frm-slicing d-flex align-items-center">
                                                        <div className="frm-slicing-first">
                                                            <input className="form-check-input" type="checkbox" id="baggage1" />
                                                            <label className="form-check-label" htmlFor="baggage1"></label>
                                                        </div>
                                                        <div
                                                            className="frm-slicing-end d-flex align-items-center justify-content-between full-width ps-1">
                                                            <div className="frms-flex d-flex align-items-center">
                                                                <div className="frm-slicing-img"><img src={air2} className="img-fluid" width="25"
                                                                    alt="" /></div>
                                                                <div className="frm-slicing-title ps-2"><span className="text-muted-2">Jal Airlines</span></div>
                                                            </div>
                                                            <div className="text-end"><span className="text-md text-muted-2 opacity-75">$310.00</span></div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="form-check lg">
                                                    <div className="frm-slicing d-flex align-items-center">
                                                        <div className="frm-slicing-first">
                                                            <input className="form-check-input" type="checkbox" id="baggage2" />
                                                            <label className="form-check-label" htmlFor="baggage2"></label>
                                                        </div>
                                                        <div
                                                            className="frm-slicing-end d-flex align-items-center justify-content-between full-width ps-1">
                                                            <div className="frms-flex d-flex align-items-center">
                                                                <div className="frm-slicing-img"><img src={air3} className="img-fluid" width="25"
                                                                    alt="" /></div>
                                                                <div className="frm-slicing-title ps-2"><span className="text-muted-2">Indigo</span></div>
                                                            </div>
                                                            <div className="text-end"><span className="text-md text-muted-2 opacity-75">$390.00</span></div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="form-check lg">
                                                    <div className="frm-slicing d-flex align-items-center">
                                                        <div className="frm-slicing-first">
                                                            <input className="form-check-input" type="checkbox" id="baggage3" />
                                                            <label className="form-check-label" htmlFor="baggage3"></label>
                                                        </div>
                                                        <div
                                                            className="frm-slicing-end d-flex align-items-center justify-content-between full-width ps-1">
                                                            <div className="frms-flex d-flex align-items-center">
                                                                <div className="frm-slicing-img"><img src={air4} className="img-fluid" width="25"
                                                                    alt="" /></div>
                                                                <div className="frm-slicing-title ps-2"><span className="text-muted-2">Air Asia</span></div>
                                                            </div>
                                                            <div className="text-end"><span className="text-md text-muted-2 opacity-75">$410.00</span></div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="form-check lg">
                                                    <div className="frm-slicing d-flex align-items-center">
                                                        <div className="frm-slicing-first">
                                                            <input className="form-check-input" type="checkbox" id="baggage4" />
                                                            <label className="form-check-label" htmlFor="baggage4"></label>
                                                        </div>
                                                        <div
                                                            className="frm-slicing-end d-flex align-items-center justify-content-between full-width ps-1">
                                                            <div className="frms-flex d-flex align-items-center">
                                                                <div className="frm-slicing-img"><img src={air5} className="img-fluid" width="25"
                                                                    alt="" /></div>
                                                                <div className="frm-slicing-title ps-2"><span className="text-muted-2">Vistara</span></div>
                                                            </div>
                                                            <div className="text-end"><span className="text-md text-muted-2 opacity-75">$370.00</span></div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </Col>

                    <div className="col-xl-9 col-lg-8 col-md-12">

                        <div className="row align-items-center justify-content-between">
                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <h5 className="fw-bold fs-6 mb-lg-0 mb-3">Showing 280 Search Results</h5>
                            </div>
                            <div className="col-xl-8 col-lg-8 col-md-12">
                                <div className="d-flex align-items-center justify-content-start justify-content-lg-end flex-wrap">
                                    <div className="flsx-first me-2">
                                        <div className="bg-white rounded py-2 px-3">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" id="mapoption" />
                                                <label className="form-check-label ms-1" htmlFor="mapoption">Map</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flsx-first mt-sm-0 mt-2">
                                        <ul className="nav nav-pills nav-fill p-1 small lights blukker bg-primary rounded-2 shadow-sm"
                                            id="filtersblocks" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active rounded-1" id="trending" data-bs-toggle="tab" type="button"
                                                    role="tab" aria-selected="true">Our Trending</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link rounded-1" id="mostpopular" data-bs-toggle="tab" type="button"
                                                    role="tab" aria-selected="false">Most Popular</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link rounded-1" id="lowprice" data-bs-toggle="tab" type="button" role="tab"
                                                    aria-selected="false">Lowest Price</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-center g-4 mt-2">

                            <div className="col-xl-12 col-md-12">

                                <div className="fare-calendar" id="fareCalendar">
                                    {fareData.map((fare, index) => (
                                        <div className={`fare-day ${activeFare === index ? 'active' : ''}`} onClick={() => handleFareClick(index)} key={index}>
                                            <div className="fare-date">{fare.date}</div>
                                            <div className="fare-price ">£{fare.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg12 col-md-12">
                                <div className="flights-accordion">
                                    <div className="flights-list-item bg-white rounded-3 p-3">
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
                                                                        <img className="img-fluid" src={air1} width="45" alt="image" />
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
                                                                        <img className="img-fluid" src={air2} width="45" alt="image" />
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

                                            <div className="col-md-auto">
                                                <div className="d-flex items-center h-100">
                                                    <div className="d-lg-block d-none border br-dashed me-4"></div>
                                                    <div>
                                                        <div className="d-flex align-items-center justify-content-md-end mb-3">
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Free WiFi"><i
                                                                    className="fa-solid fa-wifi"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Food Available"><i
                                                                    className="fa-solid fa-utensils"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="One Cup Tea"><i
                                                                    className="fa-solid fa-mug-saucer"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Pet Allow"><i className="fa-solid fa-dog"></i></span>
                                                        </div>
                                                        <div className="text-start text-md-end">
                                                            <span className="label bg-light-danger text-danger me-1">15% Off</span>
                                                            <div className="text-dark fs-3 fw-bold lh-base">US$934</div>
                                                            <div className="text-muted text-sm mb-2">Refundable</div>
                                                        </div>

                                                        <div className="flight-button-wrap">
                                                            <button className="btn btn-primary btn-md fw-medium full-width" data-bs-toggle="modal"
                                                                data-bs-target="#bookflight">
                                                                Select Flight<i className="fa-solid fa-arrow-trend-up ms-2"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg12 col-md-12">
                                <div className="flights-accordion">
                                    <div className="flights-list-item bg-white rounded-3 p-3">
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
                                                                        <img className="img-fluid" src={air2} width="45" alt="image" />
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
                                                                        <img className="img-fluid" src={air3} width="45" alt="image" />
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

                                            <div className="col-md-auto">
                                                <div className="d-flex items-center h-100">
                                                    <div className="d-lg-block d-none border br-dashed me-4"></div>
                                                    <div>
                                                        <div className="d-flex align-items-center justify-content-md-end mb-3">
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Free WiFi"><i
                                                                    className="fa-solid fa-wifi"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Food Available"><i
                                                                    className="fa-solid fa-utensils"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="One Cup Tea"><i
                                                                    className="fa-solid fa-mug-saucer"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Pet Allow"><i className="fa-solid fa-dog"></i></span>
                                                        </div>
                                                        <div className="text-start text-md-end">
                                                            <span className="label bg-light-danger text-danger me-1">15% Off</span>
                                                            <div className="text-dark fs-3 fw-bold lh-base">US$934</div>
                                                            <div className="text-muted text-sm mb-2">Refundable</div>
                                                        </div>

                                                        <div className="flight-button-wrap">
                                                            <button className="btn btn-primary btn-md fw-medium full-width" data-bs-toggle="modal"
                                                                data-bs-target="#bookflight">
                                                                Select Flight<i className="fa-solid fa-arrow-trend-up ms-2"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg12 col-md-12">
                                <div className="d-md-flex bg-danger rounded-2 align-items-center justify-content-between px-3 py-3">
                                    <div className="d-md-flex align-items-center justify-content-start">
                                        <div className="flx-icon-first mb-md-0 mb-3">
                                            <div className="square--60 circle bg-white"><i className="fa-solid fa-gift fs-3 text-danger"></i></div>
                                        </div>
                                        <div className="flx-caps-first ps-2">
                                            <h6 className="fs-5 fw-medium text-light mb-0">Start Exploring The World</h6>
                                            <p className="text-light mb-0">Book FlightsEffortless and Earn $50+ for each booking with Booking.com
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flx-last text-md-end mt-md-0 mt-4"><button type="button" className="btn btn-dark fw-medium full-width px-xl-4">Get Started</button></div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg12 col-md-12">
                                <div className="flights-accordion">
                                    <div className="flights-list-item bg-white rounded-3 p-3">
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

                                            <div className="col-md-auto">
                                                <div className="d-flex items-center h-100">
                                                    <div className="d-lg-block d-none border br-dashed me-4"></div>
                                                    <div>
                                                        <div className="d-flex align-items-center justify-content-md-end mb-3">
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Free WiFi"><i
                                                                    className="fa-solid fa-wifi"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Food Available"><i
                                                                    className="fa-solid fa-utensils"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="One Cup Tea"><i
                                                                    className="fa-solid fa-mug-saucer"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Pet Allow"><i className="fa-solid fa-dog"></i></span>
                                                        </div>
                                                        <div className="text-start text-md-end">
                                                            <span className="label bg-light-danger text-danger me-1">15% Off</span>
                                                            <div className="text-dark fs-3 fw-bold lh-base">US$934</div>
                                                            <div className="text-muted text-sm mb-2">Refundable</div>
                                                        </div>

                                                        <div className="flight-button-wrap">
                                                            <button className="btn btn-primary btn-md fw-medium full-width" data-bs-toggle="modal"
                                                                data-bs-target="#bookflight">
                                                                Select Flight<i className="fa-solid fa-arrow-trend-up ms-2"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg12 col-md-12">
                                <div className="flights-accordion">
                                    <div className="flights-list-item bg-white rounded-3 p-3">
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
                                                                        <img className="img-fluid" src={air2} width="45" alt="image" />
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
                                                                        <img className="img-fluid" src={air4} width="45" alt="image" />
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

                                            <div className="col-md-auto">
                                                <div className="d-flex items-center h-100">
                                                    <div className="d-lg-block d-none border br-dashed me-4"></div>
                                                    <div>
                                                        <div className="d-flex align-items-center justify-content-md-end mb-3">
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Free WiFi"><i
                                                                    className="fa-solid fa-wifi"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Food Available"><i
                                                                    className="fa-solid fa-utensils"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="One Cup Tea"><i
                                                                    className="fa-solid fa-mug-saucer"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Pet Allow"><i className="fa-solid fa-dog"></i></span>
                                                        </div>
                                                        <div className="text-start text-md-end">
                                                            <span className="label bg-light-danger text-danger me-1">15% Off</span>
                                                            <div className="text-dark fs-3 fw-bold lh-base">US$934</div>
                                                            <div className="text-muted text-sm mb-2">Refundable</div>
                                                        </div>

                                                        <div className="flight-button-wrap">
                                                            <button className="btn btn-primary btn-md fw-medium full-width" data-bs-toggle="modal"
                                                                data-bs-target="#bookflight">
                                                                Select Flight<i className="fa-solid fa-arrow-trend-up ms-2"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg12 col-md-12">
                                <div className="flights-accordion">
                                    <div className="flights-list-item bg-white rounded-3 p-3">
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
                                                                        <img className="img-fluid" src={air3} width="45" alt="image" />
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

                                            <div className="col-md-auto">
                                                <div className="d-flex items-center h-100">
                                                    <div className="d-lg-block d-none border br-dashed me-4"></div>
                                                    <div>
                                                        <div className="d-flex align-items-center justify-content-md-end mb-3">
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Free WiFi"><i
                                                                    className="fa-solid fa-wifi"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Food Available"><i
                                                                    className="fa-solid fa-utensils"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="One Cup Tea"><i
                                                                    className="fa-solid fa-mug-saucer"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Pet Allow"><i className="fa-solid fa-dog"></i></span>
                                                        </div>
                                                        <div className="text-start text-md-end">
                                                            <span className="label bg-light-danger text-danger me-1">15% Off</span>
                                                            <div className="text-dark fs-3 fw-bold lh-base">US$934</div>
                                                            <div className="text-muted text-sm mb-2">Refundable</div>
                                                        </div>

                                                        <div className="flight-button-wrap">
                                                            <button className="btn btn-primary btn-md fw-medium full-width" data-bs-toggle="modal"
                                                                data-bs-target="#bookflight">
                                                                Select Flight<i className="fa-solid fa-arrow-trend-up ms-2"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg12 col-md-12">
                                <div className="flights-accordion">
                                    <div className="flights-list-item bg-white rounded-3 p-3">
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
                                                                        <img className="img-fluid" src={air1} width="45" alt="image" />
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
                                                                        <img className="img-fluid" src={air3} width="45" alt="image" />
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

                                            <div className="col-md-auto">
                                                <div className="d-flex items-center h-100">
                                                    <div className="d-lg-block d-none border br-dashed me-4"></div>
                                                    <div>
                                                        <div className="d-flex align-items-center justify-content-md-end mb-3">
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Free WiFi"><i
                                                                    className="fa-solid fa-wifi"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Food Available"><i
                                                                    className="fa-solid fa-utensils"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="One Cup Tea"><i
                                                                    className="fa-solid fa-mug-saucer"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Pet Allow"><i className="fa-solid fa-dog"></i></span>
                                                        </div>
                                                        <div className="text-start text-md-end">
                                                            <span className="label bg-light-danger text-danger me-1">15% Off</span>
                                                            <div className="text-dark fs-3 fw-bold lh-base">US$934</div>
                                                            <div className="text-muted text-sm mb-2">Refundable</div>
                                                        </div>

                                                        <div className="flight-button-wrap">
                                                            <button className="btn btn-primary btn-md fw-medium full-width" data-bs-toggle="modal"
                                                                data-bs-target="#bookflight">
                                                                Select Flight<i className="fa-solid fa-arrow-trend-up ms-2"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg12 col-md-12">
                                <div className="flights-accordion">
                                    <div className="flights-list-item bg-white rounded-3 p-3">
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
                                                                        <img className="img-fluid" src={air2} width="45" alt="image" />
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

                                            <div className="col-md-auto">
                                                <div className="d-flex items-center h-100">
                                                    <div className="d-lg-block d-none border br-dashed me-4"></div>
                                                    <div>
                                                        <div className="d-flex align-items-center justify-content-md-end mb-3">
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Free WiFi"><i
                                                                    className="fa-solid fa-wifi"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Food Available"><i
                                                                    className="fa-solid fa-utensils"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border me-2" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="One Cup Tea"><i
                                                                    className="fa-solid fa-mug-saucer"></i></span>
                                                            <span className="square--20 rounded text-xs text-muted border" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" data-bs-title="Pet Allow"><i className="fa-solid fa-dog"></i></span>
                                                        </div>
                                                        <div className="text-start text-md-end">
                                                            <span className="label bg-light-danger text-danger me-1">15% Off</span>
                                                            <div className="text-dark fs-3 fw-bold lh-base">US$934</div>
                                                            <div className="text-muted text-sm mb-2">Refundable</div>
                                                        </div>

                                                        <div className="flight-button-wrap">
                                                            <button className="btn btn-primary btn-md fw-medium full-width" data-bs-toggle="modal"
                                                                data-bs-target="#bookflight">
                                                                Select Flight<i className="fa-solid fa-arrow-trend-up ms-2"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-12">
                                <div className="pags py-2 px-5">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination m-0 p-0">
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true"><i className="fa-solid fa-arrow-left-long"></i></span>
                                                </a>
                                            </li>
                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" href="#">4</a></li>
                                            <li className="page-item"><a className="page-link" href="#">5</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true"><i className="fa-solid fa-arrow-right-long"></i></span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>

                        </div>
                    </div>

                </Row>
            </Container>
        </section>
    )
}

export default MainConent;