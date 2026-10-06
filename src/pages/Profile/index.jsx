import React from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import DashboardMenu from './components/DashboardMenu';
import Layout from '../../components/Layout/Layout';

import team1 from '../../assets/img/team-1.jpg';
import { Link } from 'react-router-dom';

const MyProfile = () => {
    return (
        <Layout>
            <div className="dashboard-menus border-top d-none d-lg-block">
                <Container>
                    <Row>
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <DashboardMenu />
                        </div>
                    </Row>
                </Container>
            </div>
            {/* ============================ End user Dashboard Menu ============================ */}

            {/* ============================ Booking Page ================================== */}
            <section className="pt-5 gray-simple position-relative">
                <Container>

                    <Row className="align-items-center justify-content-center">
                        <Col xl={12} lg={12} md={12} className="mb-4">
                            <button className="btn btn-dark fw-medium full-width d-block d-lg-none" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasDashboard" aria-controls="offcanvasDashboard"><i
                                    className="fa-solid fa-gauge me-2"></i>Dashboard
                                Navigation</button>
                            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1}
                                id="offcanvasDashboard" aria-labelledby="offcanvasScrollingLabel">
                                <div className="offcanvas-header gray-simple">
                                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Navigation</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body p-0">
                                    <DashboardMenu long />
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="align-items-start justify-content-between gx-xl-4">
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="card rounded-2 me-xl-5 mb-4">
                                <div className="card-top bg-primary position-relative">
                                    <div className="position-absolute end-0 top-0 mt-4 me-3"><Link to="/login"
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
                                                    <p className="fw-semibold text-dark lh-2 mb-0">Verify Your Email</p>
                                                    <span className="text-muted" data-bs-toggle="tooltip" data-bs-title="Email is Not Verified"><i className="bi bi-patch-check-fill"></i></span>
                                                </div>
                                                <div className="d-flippo">
                                                    <p className="text-md text-muted lh-1 mb-0">20% Left</p>
                                                    <p className="mb-0"><Link to="#verifyemail" data-bs-toggle="modal" data-bs-target="#verifyemail" className="text-dark">Verify</Link></p>
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
                                                    <span className="text-muted" data-bs-toggle="tooltip" data-bs-title="Mobile No. is Not Verified"><i className="bi bi-patch-check-fill"></i></span>
                                                </div>
                                                <div className="d-flippo">
                                                    <p className="text-md text-muted lh-1 mb-0">20% Left</p>
                                                    <p className="mb-0"><Link to="#verifyphone" data-bs-toggle="modal" data-bs-target="#verifyphone" className="text-dark">Verify</Link></p>
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
                                            aria-valuemax="100" style={{ height: '7px' }}>
                                            <div className="progress-bar bg-success" style={{ width: '87%' }} />
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

                            {/* Personal Information */}
                            <div className="card mb-4">
                                <div className="card-header">
                                    <h4><i className="fa-solid fa-file-invoice me-2"></i>Personal Information</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row align-items-center justify-content-start">

                                        <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
                                            <div className="d-flex align-items-center">
                                                <label className="position-relative me-4" htmlFor="uploadfile-1" title="Replace this pic">
                                                    {/* Avatar place holder */}
                                                    <span className="avatar avatar-xl">
                                                        <img id="uploadfile-1-preview"
                                                            className="avatar-img rounded-circle border border-white border-3 shadow" src={team1}
                                                            alt="" />
                                                    </span>
                                                </label>
                                                {/* Upload button */}
                                                <label className="btn btn-sm btn-light-primary px-4 fw-medium mb-0" htmlFor="uploadfile-1">Change</label>
                                                <input id="uploadfile-1" className="form-control d-none" type="file" />
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">First Name</label>
                                                <input type="text" className="form-control" defaultValue="Adam K" />
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Last Name</label>
                                                <input type="text" className="form-control" defaultValue="Divliars" />
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Email ID</label>
                                                <input type="text" className="form-control" defaultValue="adamkruck@gmail.com" />
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Mobile</label>
                                                <input type="text" className="form-control" defaultValue="9856542563" />
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Date of Birth</label>
                                                <input type="date" className="form-control" defaultValue="2000-02-04" />
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Gender</label>
                                                <input type="text" className="form-control" defaultValue="Male" />
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">About Info</label>
                                                <textarea
                                                    className="form-control ht-120" defaultValue={"Lorem ipsum dolor sit amet, nec virtute nusquam ex. Ex sed diceret constituam inciderint, accusamus imperdiet has te. Id qui liber nemore semper, modus appareat philosophia ut eam. Assum tibique singulis at mel."} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="card mb-4">
                                <div className="card-header">
                                    <h4><i className="fa-solid fa-envelope-circle-check me-2"></i>Update Your Email</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row align-items-center justify-content-start">

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Email Address</label>
                                                <input type="email" className="form-control" placeholder="update your new email" />
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="text-end">
                                                <Link to="#" className="btn btn-md btn-primary mb-0">Update Email</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h4><i className="fa-solid fa-lock me-2"></i>Update Password</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row align-items-center justify-content-start">

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Old Password</label>
                                                <input type="password" className="form-control" placeholder="*********" />
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">New Password</label>
                                                <input type="password" className="form-control" placeholder="*********" />
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Confirm Password</label>
                                                <input type="password" className="form-control" placeholder="*********" />
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="text-end">
                                                <Link to="#" className="btn btn-md btn-primary mb-0">Change Password</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </Row>
                </Container>
            </section>
            {/* ============================ Booking Page End ================================== */}


            {/* ============================ Call To Action Start ================================== */}
            <div className="py-5 bg-primary">
                <div className="container">
                    <div className="row align-items-center justify-content-between">

                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <h4 className="text-light fw-bold lh-base m-0">Join our Newsletter To Keep Up To Date With Us!</h4>
                        </div>

                        <div className="col-xl-5 col-lg-5 col-md-6">
                            <div className="newsletter-forms mt-md-0 mt-4">
                                <form>
                                    <div className="row align-items-center justify-content-between bg-white rounded-3 p-2 gx-0">

                                        <div className="col-xl-9 col-lg-8 col-md-8">
                                            <div className="form-group m-0">
                                                <input type="text" className="form-control bold ps-1 border-0" placeholder="Enter Your Mail!" />
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-4 col-md-4">
                                            <div className="form-group m-0">
                                                <button type="button" className="btn btn-dark fw-medium full-width">Submit<i
                                                    className="fa-solid fa-arrow-trend-up ms-2"></i></button>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MyProfile;