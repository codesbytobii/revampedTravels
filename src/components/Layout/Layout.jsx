import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SHOW_AFTER = 300; // px scrolled before the button appears

function Layout({ children, footerMode, navbarMode }) {

  const location = useLocation();
  const [showTop, setShowTop] = useState(false);

  // 👇 Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // 👇 Show the back-to-top button only after scrolling down
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 👇 Back to top button click
  const backToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="layout-wrapper">
      <Header navbarMode={navbarMode} />
      <main className="main-content">
        {children}
      </main>
      <Footer footerMode={footerMode} />

      <Link
        onClick={backToTop}
        id="back2Top"
        className={`top-scroll ${showTop ? 'is-visible' : ''}`}
        title="Back to top"
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        to="#"
      ><i className="fa-solid fa-sort-up"></i></Link>
    </div>
  );
}

export default Layout;