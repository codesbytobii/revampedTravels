import { Link } from 'react-router-dom';

//import images
import payment from 'assets/img/payment.png';
import mytrip from 'assets/img/amadeus.png';
import tripadv from 'assets/img/airpeace.webp';
import goibibo from 'assets/img/goibibo.png';
import logo from '../../assets/img/ffsdTravelLogo.png';
import logoLight from '../../assets/img/ffsdTravelLogoWhite.png';

/* Replace these with FFSD Travels' real handles when you have them */
const SOCIALS = [
	{ label: 'Facebook',  href: 'https://facebook.com/ffsdtravels',   icon: 'fa-brands fa-facebook' },
	{ label: 'Instagram', href: 'https://instagram.com/ffsdtravels',  icon: 'fa-brands fa-instagram' },
	{ label: 'X',         href: 'https://x.com/ffsdtravels',          icon: 'fa-brands fa-x-twitter' },
	{ label: 'LinkedIn',  href: 'https://linkedin.com/company/ffsdtravels', icon: 'fa-brands fa-linkedin' },
	{ label: 'WhatsApp',  href: 'https://wa.me/2348070866594',        icon: 'fa-brands fa-whatsapp' },
];

/* Real destinations inside the app */
const NAV_LINKS = [
	{ to: '/',           label: 'Home' },
	{ to: '/about-us',   label: 'About Us' },
	{ to: '/flights',    label: 'Flights' },
	{ to: '/blog',      label: 'Blogs' },
	{ to: '/contact-us', label: 'Contact Us' },
];

/* Swap these anchors for real docs once you have them */
const RESOURCE_LINKS = [
	// { to: '/about-us',     label: 'About FFSD Travels' },
	{ to: '/blog',        label: 'Travel Guides' },
	{ to: '/flights',      label: 'Flight Deals' },
	{ to: '/contact-us',   label: 'Visa Assistance' },
	{ to: '/contact-us',   label: 'Study Abroad Support' },
	{ to: '/contact-us',   label: 'Help & Support' },
];

/* Legal pages — create them later; these links are ready */
const COMPANY_LINKS = [
	{ to: '/about-us',       label: 'About Us' },
	{ to: '/contact-us',     label: 'Contact Us' },
	{ to: '/terms',          label: 'Terms of Service' },
	{ to: '/privacy',        label: 'Privacy Policy' },
	{ to: '/refund-policy',  label: 'Refund Policy' },
];

function Footer({ footerMode }) {
	return (
		<footer className={`footer footer-compact ${footerMode === 'light' ? 'skin-dark-footer' : 'skin-light-footer'}`}>
			<div className="footer-main">
				<div className="container">
					<div className="row">

						{/* Brand */}
						<div className="col-lg-3 col-md-4 footer-brand">
							<div className="footer-widget">
								<div className="d-flex align-items-center align-items-md-start flex-column mb-3">
									<div className="d-inline-block">
										<img
											src={footerMode === 'light' ? logoLight : logo}
											className="img-fluid"
											width="160"
											alt="FFSD Travels"
										/>
									</div>
								</div>

								<div className="footer-add pe-xl-3">
									<p>
										Your trusted travel partner for flights, visa assistance, holiday
										packages and study-abroad support.
									</p>
								</div>

								<div className="foot-socials">
									<ul>
										{SOCIALS.map(s => (
											<li key={s.label}>
												<a
													href={s.href}
													target="_blank"
													rel="noopener noreferrer"
													aria-label={s.label}
												>
													<i className={s.icon}></i>
												</a>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>

						{/* Navigation */}
						<div className="col-lg-2 col-md-4 d-none d-md-block">
							<div className="footer-widget">
								<h4 className="widget-title">Quick Links</h4>
								<ul className="footer-menu">
									{NAV_LINKS.map(l => (
										<li key={l.label}>
											<Link to={l.to}>{l.label}</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Resources */}
						<div className="col-lg-2 col-md-4 d-none d-md-block">
							<div className="footer-widget">
								<h4 className="widget-title">Our Services</h4>
								<ul className="footer-menu">
									{RESOURCE_LINKS.map(l => (
										<li key={l.label}>
											<Link to={l.to}>{l.label}</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Company / legal */}
						<div className="col-lg-2 col-md-6 d-none d-md-block">
							<div className="footer-widget">
								<h4 className="widget-title">The Company</h4>
								<ul className="footer-menu">
									{COMPANY_LINKS.map(l => (
										<li key={l.label}>
											<Link to={l.to}>{l.label}</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Payments + partners */}
						<div className="col-lg-3 col-md-6 d-none d-md-block">
							<div className="footer-widget">
								<h4 className="widget-title">Airlines we ticket for</h4>
								<div className="pmt-wrap">
									<img src={payment} className="img-fluid" alt="Accepted payment methods" />
								</div>

								<div className="our-prtwrap mt-4">
									<div className="prtn-title">
										<p className="widget-title">Our Partners</p>
									</div>
									<div className="prtn-thumbs d-flex align-items-center justify-content-start">
										<div className="pmt-wrap pe-4">
											<img src={mytrip} className="img-fluid" alt="MakeMyTrip" />
										</div>
										<div className="pmt-wrap pe-4">
											<img src={tripadv} className="img-fluid" alt="TripAdvisor" />
										</div>
										<div className="pmt-wrap pe-4">
											<img src={goibibo} className="img-fluid" alt="Goibibo" />
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="footer-bottom border-top">
				<div className="container">
					<div className="row align-items-center justify-content-between">

						<div className="col-xl-6 col-lg-6 col-md-6 text-center text-md-start">
							<p className="mb-0">
								© {new Date().getFullYear()} FFSD Travels. All rights reserved.
							</p>
						</div>

						<div className="col-xl-6 col-lg-6 col-md-6">
							<ul className="p-0 d-flex flex-wrap justify-content-center justify-content-md-end text-center text-md-end m-0 mt-2 mt-md-0">
								<li className="mx-2 mx-md-0 ms-md-3"><Link to="/terms">Terms of Service</Link></li>
								<li className="mx-2 mx-md-0 ms-md-3"><Link to="/privacy">Privacy Policy</Link></li>
								<li className="mx-2 mx-md-0 ms-md-3"><Link to="/refund-policy">Refund Policy</Link></li>
							</ul>
						</div>

					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;