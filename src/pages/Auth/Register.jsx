import { Link } from 'react-router-dom';
import loginImage from '../../assets/img/login.svg';
import loginIcon from '../../assets/img/logo-icon.png';
import { Col, Container, Row } from 'react-bootstrap';

function Register() {

  return (
    <section className="py-5">
      <Container>

        <Row className="justify-content-center align-items-center m-auto">
          <Col xl={11} lg={12} xs={12}>
            <div className="bg-mode card shadow-sm rounded-3 overflow-hidden">
              <Row className="g-0">
                <Col lg={6} className="d-flex align-items-center order-2 order-lg-1">
                  <div className="p-3 p-lg-5">
                    <img src={loginImage} className="img-fluid" alt="" />
                  </div>
                  <div className="vr opacity-1 d-none d-lg-block"></div>
                </Col>


                <Col lg={6} className="order-1">
                  <div className="p-4 p-sm-7">

                    <Link to="/">
                      <img className="img-fluid mb-4" src={loginIcon} width="50" alt="logo" />
                    </Link>

                    <h1 className="mb-2 fs-2">Create New Account</h1>
                    <p className="mb-0">Already a Member?<Link to="/login" className="fw-medium text-primary"> Signin</Link></p>


                    <form className="mt-4 text-start">
                      <div className="form py-4">
                        <div className="form-group">
                          <label className="form-label">Enter email ID</label>
                          <input type="email" className="form-control" placeholder="name@example.com" />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Enter Password</label>
                          <div className="position-relative">
                            <input type="password" className="form-control" id="password-field" name="password"
                              placeholder="Password" />
                              <span
                                className="fa-solid fa-eye toggle-password position-absolute top-50 end-0 translate-middle-y me-3"></span>
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Confirm Password</label>
                          <input type="password" className="form-control" placeholder="*********" />
                        </div>

                        <div className="form-group">
                          <button type="submit" className="btn btn-primary full-width font--bold btn-lg">Create An
                            Account</button>
                        </div>

                        <div className="modal-flex-item d-flex align-items-center justify-content-between mb-3">
                          <div className="modal-flex-first">
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="checkbox" id="savepassword" value="option1" />
                                <label className="form-check-label" htmlFor="savepassword">Keep me signed in</label>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="prixer px-3">
                        <div className="devider-wraps position-relative">
                          <div className="devider-text text-muted-2 text-md">Sign-Up with Socials</div>
                        </div>
                      </div>


                      <div className="social-login py-4 px-md-2">
                        <div className="d-flex flex-column gap-3">
                          <Link to="#" className="btn btn-md border br-dashed rounded-pill"><i className="bi bi-facebook color--facebook h-auto me-2"></i>Login with Facebook</Link>
                          <Link to="#" className="btn btn-md border br-dashed rounded-pill"><i className="bi bi-linkedin color--linkedin h-auto me-2"></i>Login with LinkedIn</Link>
                        </div>
                      </div>


                      <div className="text-primary-hover mt-3 text-center"> © {new Date().getFullYear()}  Ffsd Travels. Develop By <Link to="https://shreethemes.in/" target='blank' className='text-muted'>Shreethemes</Link>. </div>
                    </form>

                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

      </Container>
    </section>
  );
}

export default Register;

