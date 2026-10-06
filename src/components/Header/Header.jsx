import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import logo from '../../assets/img/ffsdTravelLogo.png';
import logoLight from '../../assets/img/ffsdTravelLogoWhite.png';
import { Link, useLocation } from 'react-router-dom';
import PnrCheckerModal from './PnrCheckerModal';
import SignInModal from './SignInModal';
import RegisterModal from './RegisterModal';

/* Links shown in the full-screen mobile menu (same pages as the desktop menu) */
const MOBILE_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Flights', to: '/flights' },
  { label: 'Blogs', to: '/blog' },
  { label: 'Contact Us', to: '/contact-us' },
];

function Header({ navbarMode }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showPnr, setShowPnr] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobileViewOpen, setIsMobileViewOpen] = useState(false);
  const [headerSpace, setHeaderSpace] = useState(0); // keeps the page from jumping when the header becomes fixed on mobile
  const headerRef = useRef(null);
  const closeRef = useRef(null);
  const mmRef = useRef(null);
  const wasScrolled = useRef(false);
  const { pathname } = useLocation();

  const menuData = {
    home: [
      { label: 'Home version 01', link: '/' },
      { label: 'Home version 02', link: '/home-2' },
      { label: 'Home version 03', link: '/home-3' },
      { label: 'Home version 04', link: '/home-4' },
      { label: 'Home version 05', link: '/home-5' },
      { label: 'Home version 06', link: '/slider-home' }
    ],
    listing: {
      hotel: [
        { label: 'Hotel list 01', link: '/hotel-list-01' },
        { label: 'Hotel list 02', link: '/hotel-list-02' },
        { label: 'Hotel list 03', link: '/hotel-list-03' },
        { label: 'Hotel Detail 01', link: '/hotel-detail' },
        { label: 'Hotel Detail 02', link: '/hotel-detail-2' }
      ],
      flight: [
        { label: 'Flight List 01', link: '/flight-list-01' },
        { label: 'Flight List 02', link: '/flight-list-02' },
        { label: 'Flight Detail', link: '/Flight-detail' }
      ],
      rental: [
        { label: 'Rental List 01', link: '/property-list-01' },
        { label: 'Rental List 02', link: '/property-list-02' },
        { label: 'Rental List 03', link: '/property-list-03' },
        { label: 'Rental Detail', link: '/rental-detail' }
      ],
      car: [
        { label: 'Car List 01', link: '/car-list-01' },
        { label: 'Car List 02', link: '/car-list-02' },
        { label: 'Car List 03', link: '/car-list-03' },
        { label: 'Car Detail', link: '/car-detail' }
      ],
      destination: [
        { label: 'Destination List 01', link: '/destination-01' },
        { label: 'Destination List 02', link: '/destination-02' },
        { label: 'Destination List 03', link: '/destination-03' },
        { label: 'Destination Detail', link: '/destination-detail' }
      ],
      other: [
        { label: 'Join with GeoTrip', link: '/join-us' },
        { label: 'Add Listing', link: '/add-listing' },
        { label: 'Compare Listing', link: '/compare-listing' },
        { label: 'Booking Page', link: '/booking-page' },
        { label: 'User Dashboard', link: '/my-profile' }
      ]
    },
    pages: {
      blog: [
        { label: 'Classic Blog', link: '/classic-blog' },
        { label: 'Blog Grid Style', link: '/blog' },
        { label: 'Single Blog', link: '/blog-detail' }
      ],
      authentication: [
        { label: 'Sign In', link: '/login' },
        { label: 'Sign Up', link: '/register' },
        { label: 'Forgot Password', link: '/forgot-password' },
        { label: 'Two factor authentication', link: '/two-factor-auth' }
      ],
      contact: [
        { label: 'Contact V.01', link: '/contact-v1' },
        { label: 'Contact V0.2', link: '/contact-v2' }
      ],
      other: [
        { label: 'About Us', link: '/about-us' },
        { label: 'Career Page', link: '/career-page' },
        { label: 'Help Center', link: '/help-center' },
        { label: "FAQ's", link: '/faq' },
        { label: 'Error Page', link: '/404' },
        { label: 'Pricing', link: '/pricing' },
        { label: 'Privacy Policy', link: '/privacy-policy' }
      ]
    },
    menu: [
      {
        label: 'Home Stays',
        description: 'Beautiful Place for stays',
        icon: 'fa-solid fa-spa',
        color: 'text-success',
        link: '/home-stay'
      },
      {
        label: 'Home Hotel',
        description: 'Beautiful Place for stays',
        icon: 'fa-solid fa-hotel',
        color: 'text-warning',
        link: '/home-hotel'
      },
      {
        label: 'Home Flight',
        description: 'Beautiful Place for stays',
        icon: 'fa-solid fa-plane',
        color: 'text-primary',
        link: '/home-flight'
      },
      {
        label: 'Home Rental',
        description: 'Beautiful Place for stays',
        icon: 'fa-solid fa-eye',
        color: 'text-purple',
        link: '/home-rental'
      },
      {
        label: 'Home Cabs',
        description: 'Beautiful Place for stays',
        icon: 'fa-brands fa-dropbox',
        color: 'text-seagreen',
        link: '/home-car'
      },
      {
        label: 'Home Destination',
        description: 'Beautiful Place for stays',
        icon: 'fa-solid fa-person-walking-luggage',
        color: 'text-info',
        link: '/home-stay'
      }
    ]
  };

  const handleMouseEnter = (menuKey) => {
    setActiveMenu(menuKey);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      // just before the header switches to fixed, note whether it was in the page flow
      if (scrolled && !wasScrolled.current && headerRef.current) {
        const pos = window.getComputedStyle(headerRef.current).position;
        setHeaderSpace(['static', 'relative', 'sticky'].includes(pos) ? headerRef.current.offsetHeight : 0);
      }
      wasScrolled.current = scrolled;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 996) {
        setIsPortrait(true);
      } else {
        setIsPortrait(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // close the full-screen menu when leaving the mobile layout or changing page
  useEffect(() => { if (!isPortrait) setIsMobileViewOpen(false); }, [isPortrait]);
  useEffect(() => { setIsMobileViewOpen(false); }, [pathname]);

  // while open: lock page scroll, close on Escape, focus the close button
  useEffect(() => {
    if (!isMobileViewOpen) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setIsMobileViewOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', syncMenuToNavbar);
    if (closeRef.current) closeRef.current.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', syncMenuToNavbar);
    };
  }, [isMobileViewOpen]);

  // copy the navbar's logo / toggler position and size into the menu (CSS variables), so the menu's top row
  // sits exactly where the navbar's logo and toggler are, and the reveal grows out of the toggler
  const syncMenuToNavbar = () => {
    const mm = mmRef.current;
    const head = headerRef.current && headerRef.current.querySelector('.nav-header');
    if (!mm || !head) return;
    const hr = head.getBoundingClientRect();
    const tg = head.querySelector('.nav-toggle');
    const lg = head.querySelector('.nav-brand img');
    mm.style.setProperty('--mm-offset', `${Math.max(0, hr.top)}px`);
    mm.style.setProperty('--mm-top', `${hr.height}px`);
    if (lg) mm.style.setProperty('--mm-logo-h', `${lg.getBoundingClientRect().height}px`);
    if (tg) {
      const tr = tg.getBoundingClientRect();
      mm.style.setProperty('--mm-close', `${Math.max(40, Math.min(tr.width, tr.height))}px`);
      mm.style.setProperty('--mm-ox', `${tr.left + tr.width / 2}px`);
      mm.style.setProperty('--mm-oy', `${tr.top + tr.height / 2}px`);
    }
  };

  const toggleMobileMenu = () => {
    if (!isMobileViewOpen) syncMenuToNavbar();
    setIsMobileViewOpen(!isMobileViewOpen);
  };
  const closeMenu = () => setIsMobileViewOpen(false);

  // actions inside the mobile menu: close it first, then open the matching modal
  const openPnr = () => { closeMenu(); setShowPnr(true); };
  const openSignIn = () => { closeMenu(); setShowSignIn(true); };
  const openRegister = () => { closeMenu(); setShowRegister(true); };

  const isActiveLink = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <>
    {/* placeholder so content doesn't jump up when the mobile header becomes fixed */}
    {isPortrait && isScrolled && headerSpace > 0 && <div aria-hidden="true" style={{ height: headerSpace }}></div>}
    <div
      ref={headerRef}
      className={`header ${navbarMode === "dark" ? "header-dark" : "header-light"} ${isPortrait ? "header-mobile" : ""} ${isScrolled ? "header-fixed" : ""
        }`}
    >
      <div className="container">
        <nav
          id="navigation"
          className={`navigation ${isPortrait ? "navigation-portrait" : "navigation-landscape"}`}
        >

          {/* mobile navbar: logo + menu toggler only */}
          <div className="nav-header">
            <Link to="/" className="nav-brand"><img src={navbarMode === "dark" ? logoLight : logo} className="logo" alt="" /></Link>
            <div
              className="nav-toggle"
              role="button"
              tabIndex={0}
              aria-label="Open menu"
              aria-expanded={isMobileViewOpen}
              onClick={toggleMobileMenu}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMobileMenu(); } }}
            ></div>
          </div>

          {/* desktop menu (hidden on mobile, where the full-screen menu is used) */}
          <div className="nav-menus-wrapper">
            <ul className="nav-menu">

              {/* Home Menu */}
              <li
                className={activeMenu === 'home' ? 'nvmenu-submnuopen' : ''}
                onMouseEnter={() => handleMouseEnter('home')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/">Home<span className="submenu-indicator"></span>
                </Link>
              </li>

              <li
                className={activeMenu === 'about-us' ? 'nvmenu-submnuopen' : ''}
                onMouseEnter={() => handleMouseEnter('about-us')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/about-us">About Us<span className="submenu-indicator"></span>
                </Link>
              </li>
              
              <li
                className={activeMenu === 'flights' ? 'nvmenu-submnuopen' : ''}
                onMouseEnter={() => handleMouseEnter('flights')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/flights">Flights<span className="submenu-indicator"></span>
                </Link>
              </li>

              <li
                className={activeMenu === 'blog' ? 'nvmenu-submnuopen' : ''}
                onMouseEnter={() => handleMouseEnter('blog')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/blog">Blogs<span className="submenu-indicator"></span>
                </Link>
              </li>

              <li
                className={activeMenu === 'contact-us' ? 'nvmenu-submnuopen' : ''}
                onMouseEnter={() => handleMouseEnter('contact-us')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/contact-us">Contact Us<span className="submenu-indicator"></span>
                </Link>
              </li>

              {/* Listing Menu */}
              {/* <li
                className={activeMenu?.startsWith('listing') ? 'nvmenu-submnuopen' : ''}
                onMouseEnter={() => handleMouseEnter('listing')}
                onMouseLeave={() => handleMouseLeave()}
              >
                <Link to="#">Listing<span className="submenu-indicator"></span>
                  <span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span>
                </Link>
                <ul
                  className="nav-dropdown nav-submenu"
                  style={{ display: activeMenu?.startsWith('listing') ? 'block' : 'none' }}
                >
                  <li
                    className={activeMenu === 'listing-hotel' ? 'nvmenu-submnuopen' : ''}
                    onMouseEnter={(e) => { e.stopPropagation(); handleMouseEnter('listing-hotel'); }}
                    onMouseLeave={(e) => { e.stopPropagation(); handleMouseEnter('listing'); }}
                  >
                    <Link to="#">Hotel<span className="submenu-indicator"></span>
                      <span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span>
                    </Link>
                    <ul
                      className="nav-dropdown nav-submenu"
                      style={{ display: activeMenu === 'listing-hotel' ? 'block' : 'none' }}
                    >
                      {menuData.listing.hotel.map((item, index) => (
                        <li key={index}><Link to={item.link}>{item.label}</Link></li>
                      ))}
                    </ul>
                  </li>
                  <li
                    className={activeMenu === 'listing-flight' ? 'nvmenu-submnuopen' : ''}
                    onMouseEnter={(e) => { e.stopPropagation(); handleMouseEnter('listing-flight'); }}
                    onMouseLeave={(e) => { e.stopPropagation(); handleMouseEnter('listing'); }}
                  >
                    <a>Flight<span className="submenu-indicator"></span>
                      <span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span>
                    </a>
                    <ul
                      className="nav-dropdown nav-submenu"
                      style={{ display: activeMenu === 'listing-flight' ? 'block' : 'none' }}
                    >
                      {menuData.listing.flight.map((item, index) => (
                        <li key={index}><Link to={item.link}>{item.label}</Link></li>
                      ))}
                    </ul>
                  </li>
                  <li
                    className={activeMenu === 'listing-rental' ? 'nvmenu-submnuopen' : ''}
                    onMouseEnter={(e) => { e.stopPropagation(); handleMouseEnter('listing-rental'); }}
                    onMouseLeave={(e) => { e.stopPropagation(); handleMouseEnter('listing'); }}
                  >
                    <a>Rental<span className="submenu-indicator"></span>
                      <span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span>
                    </a>
                    <ul
                      className="nav-dropdown nav-submenu"
                      style={{ display: activeMenu === 'listing-rental' ? 'block' : 'none' }}
                    >
                      {menuData.listing.rental.map((item, index) => (
                        <li key={index}><Link to={item.link}>{item.label}</Link></li>
                      ))}
                    </ul>
                  </li>
                  <li
                    className={activeMenu === 'listing-car' ? 'nvmenu-submnuopen' : ''}
                    onMouseEnter={(e) => { e.stopPropagation(); handleMouseEnter('listing-car'); }}
                    onMouseLeave={(e) => { e.stopPropagation(); handleMouseEnter('listing'); }}
                  >
                    <a>Car<span className="submenu-indicator"></span>
                      <span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span>
                    </a>
                    <ul
                      className="nav-dropdown nav-submenu"
                      style={{ display: activeMenu === 'listing-car' ? 'block' : 'none' }}
                    >
                      {menuData.listing.car.map((item, index) => (
                        <li key={index}><Link to={item.link}>{item.label}</Link></li>
                      ))}
                    </ul>
                  </li>
                  <li
                    className={activeMenu === 'listing-destination' ? 'nvmenu-submnuopen' : ''}
                    onMouseEnter={(e) => { e.stopPropagation(); handleMouseEnter('listing-destination'); }}
                    onMouseLeave={(e) => { e.stopPropagation(); handleMouseEnter('listing'); }}
                  >
                    <a>Destination<span className="submenu-indicator"></span>
                      <span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span>
                    </a>
                    <ul
                      className="nav-dropdown nav-submenu"
                      style={{ display: activeMenu === 'listing-destination' ? 'block' : 'none' }}
                    >
                      {menuData.listing.destination.map((item, index) => (
                        <li key={index}><Link to={item.link}>{item.label}</Link></li>
                      ))}
                    </ul>
                  </li>
                  {menuData.listing.other.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </li> */}

              {/* Pages Menu */}
              {/* <li
                className={activeMenu?.startsWith('pages') ? 'nvmenu-submnuopen' : ''}
                onMouseEnter={() => handleMouseEnter('pages')}
                onMouseLeave={handleMouseLeave}
              >
                <a>Pages<span className="submenu-indicator"></span>
                  <span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span>
                </a>
                <ul
                  className="nav-dropdown nav-submenu"
                  style={{ display: activeMenu?.startsWith('pages') ? 'block' : 'none' }}
                >
                  <li
                    className={activeMenu === 'pages-blog' ? 'nvmenu-submnuopen' : ''}
                    onMouseEnter={(e) => { e.stopPropagation(); handleMouseEnter('pages-blog'); }}
                    onMouseLeave={(e) => { e.stopPropagation(); handleMouseEnter('pages'); }}
                  >
                    <a>Blog<span className="submenu-indicator"></span>
                      <span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span>
                    </a>
                    <ul
                      className="nav-dropdown nav-submenu"
                      style={{ display: activeMenu === 'pages-blog' ? 'block' : 'none' }}
                    >
                      {menuData.pages.blog.map((item, index) => (
                        <li key={index}><Link to={item.link}>{item.label}</Link></li>
                      ))}
                    </ul>
                  </li>
                  <li
                    className={activeMenu === 'pages-auth' ? 'nvmenu-submnuopen' : ''}
                    onMouseEnter={(e) => { e.stopPropagation(); handleMouseEnter('pages-auth'); }}
                    onMouseLeave={(e) => { e.stopPropagation(); handleMouseEnter('pages'); }}
                  >
                    <a>Authentication<span className="submenu-indicator"></span>
                      <span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span>
                    </a>
                    <ul
                      className="nav-dropdown nav-submenu"
                      style={{ display: activeMenu === 'pages-auth' ? 'block' : 'none' }}
                    >
                      {menuData.pages.authentication.map((item, index) => (
                        <li key={index}><Link to={item.link}>{item.label}</Link></li>
                      ))}
                    </ul>
                  </li>
                  {menuData.pages.other.map((item, index) => (
                    <li key={`pages-other-${index}`}>
                      <Link to={item.link}>{item.label}</Link>
                    </li>
                  ))}
                  <li
                    className={activeMenu === 'pages-contact' ? 'nvmenu-submnuopen' : ''}
                    onMouseEnter={(e) => { e.stopPropagation(); handleMouseEnter('pages-contact'); }}
                    onMouseLeave={(e) => { e.stopPropagation(); handleMouseEnter('pages'); }}
                  >
                    <Link to="#">Contact Us<span className="submenu-indicator"></span>
                      <span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span>
                    </Link>
                    <ul
                      className="nav-dropdown nav-submenu"
                      style={{ display: activeMenu === 'pages-contact' ? 'block' : 'none' }}
                    >
                      {menuData.pages.contact.map((item, index) => (
                        <li key={index}><Link to={item.link}>{item.label}</Link></li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </li> */}

              {/* Menu */}
              {/* <li
                className={activeMenu === 'menu' ? 'nvmenu-submnuopen' : ''}
                onMouseEnter={() => handleMouseEnter('menu')}
                onMouseLeave={handleMouseLeave}
              >
                <a>Menu<span className="submenu-indicator"></span>
                  <span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span>
                </a>
                <ul
                  className="nav-dropdown nav-submenu xxl-menu"
                  style={{ display: activeMenu === 'menu' ? 'block' : 'none' }}
                >
                  {menuData.menu.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>
                        <div className="mega-advance-menu">
                          <div className={`mega-first square--50 rounded-2 gray-simple ${item.color} fs-4`}>
                            <i className={item.icon}></i>
                          </div>
                          <div className="mega-last ps-2">
                            <h6 className="lh-base fs-6 font--bold m-0">{item.label}</h6>
                            <p className="text-sm-muted m-0">{item.description}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li> */}

              

            </ul>

            <ul className="nav-menu nav-menu-social align-to-right">
              <li className="me-2">
                <Link to="#" className="pnr-btn" onClick={(e) => { e.preventDefault(); setShowPnr(true); }}>
                  <span className="pnr-btn-icon"><i className="bi bi-ticket-perforated-fill"></i></span>
                  <span>Check PNR</span>
                </Link>
              </li>
              <li className={`list-buttons ${navbarMode === "dark" ? "light" : ""}`}>
                <Link to="#" onClick={() => setShowSignIn(true)}>
                  <i className="fa-regular fa-circle-user fs-6 me-2"></i>Sign In / Register
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Full-screen mobile menu (portal, so the theme's nav CSS can't interfere) */}
      {isPortrait && createPortal(
        <div
          ref={mmRef}
          className={`mm ${isMobileViewOpen ? 'is-open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          aria-hidden={!isMobileViewOpen}
        >
          <div className="mm-inner container">
            <div className="mm-top">
              <Link to="/" className="mm-logo" onClick={closeMenu}><img src={logo} alt="Home" /></Link>
              <button type="button" ref={closeRef} className="mm-close" aria-label="Close menu" onClick={closeMenu}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <nav className="mm-nav" aria-label="Main">
              {MOBILE_LINKS.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`mm-link ${isActiveLink(item.to) ? 'is-active' : ''}`}
                  style={{ '--i': i }}
                  onClick={closeMenu}
                >
                  <span className="mm-num">0{i + 1}</span>
                  <span className="mm-label">{item.label}</span>
                  <i className="bi bi-arrow-up-right mm-arrow"></i>
                </Link>
              ))}
            </nav>

            <div className="mm-actions" style={{ '--i': MOBILE_LINKS.length }}>
              <button type="button" className="mm-pnr" onClick={openPnr}>
                <span className="mm-pnr-icon"><i className="bi bi-ticket-perforated-fill"></i></span>
                <span className="mm-pnr-text">
                  <strong>Check your flight</strong>
                  <small>Enter your PNR to see booking details</small>
                </span>
                <i className="bi bi-chevron-right"></i>
              </button>

              <div className="mm-auth">
                <button type="button" className="mm-btn mm-btn-primary" onClick={openSignIn}>
                  <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
                </button>
                <button type="button" className="mm-btn mm-btn-ghost" onClick={openRegister}>
                  Create account
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <PnrCheckerModal show={showPnr} onHide={() => setShowPnr(false)} />
      <SignInModal
        show={showSignIn}
        handleClose={() => setShowSignIn(false)}
        handleSwitchToRegister={() => {
          setShowSignIn(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal
        show={showRegister}
        handleClose={() => setShowRegister(false)}
        handleSwitchToSignIn={() => {
          setShowRegister(false);
          setShowSignIn(true);
        }}
      />
    </div>
    </>
  );
}

export default Header;