import { Link } from 'react-router-dom';

//import images
import payment from 'assets/img/payment.png';
import mytrip from 'assets/img/mytrip.png';
import tripadv from 'assets/img/tripadv.png';
import goibibo from 'assets/img/goibibo.png';
import logo from '../../assets/img/ffsdTravelLogo.png';
import logoLight from '../../assets/img/ffsdTravelLogoWhite.png';

/* Scoped styles: desktop is unchanged; mobile gets a compact, centred footer */

function Footer({ footerMode }) {
  return (
    <footer className={`footer footer-compact ${footerMode === "dark" ? "skin-dark-footer" : "skin-light-footer"}`}>
      <div className="footer-main">
        <div className="container">
          <div className="row">

            {/* Brand: the only block shown on mobile (logo, short writeup, socials) */}
            <div className="col-lg-3 col-md-4 footer-brand">
              <div className="footer-widget">
                <div className="d-flex align-items-center align-items-md-start flex-column mb-3">
                  <div className="d-inline-block"><img src={footerMode === "dark" ? logoLight : logo} className="img-fluid" width="160"
                    alt="Footer Logo" />
                  </div>
                </div>
                <div className="footer-add pe-xl-3">
                  <p>We make your dream more beautiful & enjoyful with lots of happiness.</p>
                </div>
                <div className="foot-socials">
                  <ul>
                    <li><Link to="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></Link></li>
                    <li><Link to="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></Link></li>
                    <li><Link to="#" aria-label="Google Plus"><i className="fa-brands fa-google-plus"></i></Link></li>
                    <li><Link to="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></Link></li>
                    <li><Link to="#" aria-label="Dribbble"><i className="fa-brands fa-dribbble"></i></Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Everything below is hidden on mobile (d-none d-md-block) */}
            <div className="col-lg-2 col-md-4 d-none d-md-block">
              <div className="footer-widget">
                <h4 className="widget-title">The Navigation</h4>
                <ul className="footer-menu">
                  <li><Link to="#">Talent Marketplace</Link></li>
                  <li><Link to="#">Payroll Services</Link></li>
                  <li><Link to="#">Direct Contracts</Link></li>
                  <li><Link to="#">Hire Worldwide</Link></li>
                  <li><Link to="#">Hire in the USA</Link></li>
                  <li><Link to="#">How to Hire</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 d-none d-md-block">
              <div className="footer-widget">
                <h4 className="widget-title">Our Resources</h4>
                <ul className="footer-menu">
                  <li><Link to="#">Free Business tools</Link></li>
                  <li><Link to="#">Affiliate Program</Link></li>
                  <li><Link to="#">Success Stories</Link></li>
                  <li><Link to="#">Upwork Reviews</Link></li>
                  <li><Link to="#">Resources</Link></li>
                  <li><Link to="#">Help & Support</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 d-none d-md-block">
              <div className="footer-widget">
                <h4 className="widget-title">The Company</h4>
                <ul className="footer-menu">
                  <li><Link to="#">About Us</Link></li>
                  <li><Link to="#">Leadership</Link></li>
                  <li><Link to="#">Contact Us</Link></li>
                  <li><Link to="#">Investor Relations</Link></li>
                  <li><Link to="#">Trust, Safety & Security</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-none d-md-block">
              <div className="footer-widget">
                <h4 className="widget-title">Payment Methods</h4>
                <div className="pmt-wrap">
                  <img src={payment} className="img-fluid" alt="Accepted payment methods" />
                </div>
                <div className="our-prtwrap mt-4">
                  <div className="prtn-title">
                    <p className="widget-title">Our Partners</p>
                  </div>
                  <div className="prtn-thumbs d-flex align-items-center justify-content-start">
                    <div className="pmt-wrap pe-4">
                      <img src={mytrip} className="img-fluid" alt="" />
                    </div>
                    <div className="pmt-wrap pe-4">
                      <img src={tripadv} className="img-fluid" alt="" />
                    </div>
                    <div className="pmt-wrap pe-4">
                      <img src={goibibo} className="img-fluid" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom border-top">
        <div className="container">
          <div className="row align-items-center justify-content-between">

            <div className="col-xl-6 col-lg-6 col-md-6 text-center text-md-start">
              <p className="mb-0">© {new Date().getFullYear()}  GeoTrip. Develop By <Link to="https://shreethemes.in/" target='blank' className='text-muted'>Shreethemes</Link></p>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6">
              <ul className="p-0 d-flex flex-wrap justify-content-center justify-content-md-end text-center text-md-end m-0 mt-2 mt-md-0">
                <li className="mx-2 mx-md-0 ms-md-3"><Link to="#">Terms of services</Link></li>
                <li className="mx-2 mx-md-0 ms-md-3"><Link to="#">Privacy Policies</Link></li>
                <li className="mx-2 mx-md-0 ms-md-3"><Link to="#">Cookies</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;