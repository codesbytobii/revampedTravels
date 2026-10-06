import { Link } from 'react-router-dom';
import loginImage from '../../assets/img/login.svg';
import loginIcon from '../../assets/img/logo-icon.png';
import { Col, Container, Row } from 'react-bootstrap';

function Login() {

  return (
    <section className="py-5">
      <Container>

        <Row className="justify-content-center align-items-center m-auto">
          <Col xl={10} lg={11} xs={12}>
            <div className="bg-mode card shadow-sm rounded-3 overflow-hidden">
              <Row className="g-0">
                <Col lg={6} className="d-flex align-items-center order-2 order-lg-1">
                  <div className="p-3 p-lg-5">
                    <img src={loginImage} className="img-fluid" alt="" />
                  </div>
                  <div className="vr opacity-1 d-none d-lg-block"></div>
                </Col>


                <Col lg={6} className="order-1">
                  <div className="p-3 p-sm-4 p-md-5">

                    <Link to="/">
                      <img className="img-fluid mb-4" src={loginIcon} width="50" alt="logo" />
                    </Link>

                    <h1 className="mb-2 fs-2">Welcome Back Adam!</h1>
                    <p className="mb-0">Are you new here?<Link to="/register" className="fw-medium text-primary"> Create an
                      account</Link></p>


                    <form className="mt-4 text-start">
                      <div className="form py-4">
                        <div className="form-floating mb-4">
                          <input type="email" className="form-control" placeholder="name@example.com" required="" />
                          <label>User Name</label>
                        </div>
                        <div className="form-floating mb-4">
                          <input type="password" className="form-control" id="password-field" name="password" placeholder="Password" required="" />
                          <label>Password</label>
                          <span
                            className="toggle-password position-absolute top-50 end-0 translate-middle-y me-3 fa-regular fa-eye"></span>
                        </div>

                        <div className="form-group">
                          <button type="submit" className="btn btn-primary full-width font--bold btn-lg">Log In</button>
                        </div>

                        <div className="modal-flex-item d-flex align-items-center justify-content-between mb-3">
                          <div className="modal-flex-first">
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="checkbox" id="savepassword" value="option1" />
                              <label className="form-check-label" htmlFor="savepassword">Save Password</label>
                            </div>
                          </div>
                          <div className="modal-flex-last">
                            <Link to="#" className="text-primary fw-medium">Forget Password?</Link>
                          </div>
                        </div>
                      </div>


                      <div className="prixer px-3">
                        <div className="devider-wraps position-relative">
                          <div className="devider-text text-muted-2 text-md">Sign In with Socials</div>
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

export default Login;

