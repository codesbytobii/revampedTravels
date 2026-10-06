import { Link } from 'react-router-dom';
import loginImage from '../../assets/img/login.svg';
import loginIcon from '../../assets/img/logo-icon.png';
import { Col, Container, Row } from 'react-bootstrap';

function ForgotPassword() {

    return (
        <section className="py-5">
            <Container>

                <Row className="justify-content-center align-items-center m-auto">
                    <Col xl={11} lg={12} xs={12}>
                        <div className="bg-mode card shadow-sm rounded-3 overflow-hidden">
                            <div className="row g-0">

                                <div className="col-lg-6 d-flex align-items-center order-2 order-lg-1">
                                    <div className="p-3 p-lg-5">
                                        <img src={loginImage} className="img-fluid" alt="" />
                                    </div>

                                    <div className="vr opacity-1 d-none d-lg-block"></div>
                                </div>


                                <div className="col-lg-6 order-1">
                                    <div className="p-4 p-sm-7">

                                        <Link to="/">
                                            <img className="img-fluid mb-4" src={loginIcon} width="70" alt="logo" />
                                        </Link>

                                        <h1 className="mb-2 fs-2">Forgot Password?</h1>
                                        <p className="mb-0">Enter the email address associated with an account.</p>


                                        <form className="mt-4 text-start">
                                            <div className="form py-4">
                                                <div className="form-group">
                                                    <label className="form-label">Enter your email ID</label>
                                                    <input type="email" className="form-control" placeholder="name@example.com" />
                                                </div>

                                                <div className="form-group text-center">
                                                    <p className="mb-0">Back to <Link to="/login" className="fw-medium text-primary">Sign in</Link></p>
                                                </div>

                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-primary full-width font--bold btn-lg">Reset
                                                        Password</button>
                                                </div>
                                            </div>


                                            <div className="prixer px-3">
                                                <div className="devider-wraps position-relative">
                                                    <div className="devider-text text-muted-2 text-md">Sign-Up with Socials</div>
                                                </div>
                                            </div>


                                            <div className="text-primary-hover mt-3 text-center"> © {new Date().getFullYear()}  Ffsd Travels. Develop By <Link to="https://shreethemes.in/" target='blank' className='text-muted'>Shreethemes</Link>. </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </section>
    );
}

export default ForgotPassword;

