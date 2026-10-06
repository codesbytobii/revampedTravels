import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './assets/scss/style.scss';
import "./assets/css/bootstrap-icons.css";
import "./assets/css/fontawesome.css";
import "assets/css/flatpickr.min.css";

// Lazy load all page components for code splitting
const LandingPage = lazy(() => import('./pages/Landing2/Landing2'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const TwoFactor = lazy(() => import('./pages/Auth/TwoFactor'));
const FlightList01 = lazy(() => import('./pages/Flights/List01'));
const FlightList02 = lazy(() => import('./pages/Flights/List02'));
const FlightDetails = lazy(() => import('./pages/Flights/Details'));
const ClassicBlog = lazy(() => import('./pages/Blog/ClassicBlog'));
const GridBlog = lazy(() => import('./pages/Blog/GridBlog'));
const BlogDetail = lazy(() => import('./pages/Blog/BlogDetail'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Faq = lazy(() => import('./pages/Faq'));
const NotFound = lazy(() => import('./pages/404'));
const Pricing = lazy(() => import('./pages/Pricing'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Contactv1 = lazy(() => import('./pages/Contact/Contactv1'));
const Contactv2 = lazy(() => import('./pages/Contact/Contactv2'));
const JoinUs = lazy(() => import('./pages/JoinUs'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const BookingPage2 = lazy(() => import('./pages/BookingPage2'));
const BookingPage3 = lazy(() => import('./pages/Bookingpage03'));
// const BookingpageSuccess = lazy(() => import('./pages/BookingpageSuccess'));
// const Destinationdetails = lazy(() => import('./pages/Destination/Details'));
const MyProfile = lazy(() => import('./pages/Profile'));
const MyBooking = lazy(() => import('./pages/Profile/MyBooking'));
const Travelers = lazy(() => import('./pages/Profile/Travelers'));
const PaymentDetail = lazy(() => import('./pages/Profile/PaymentDetail'));
const MyWishlists = lazy(() => import('./pages/Profile/MyWishlists'));
const Settings = lazy(() => import('./pages/Profile/Settings'));
const DeleteAccount = lazy(() => import('./pages/Profile/DeleteAccount'));
import FlightBooking from './pages/Flights/FlightBooking';

// inside your <Routes>


// Loading fallback component
const LoadingFallback = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);
function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
      {/* Landing Page with Layout (Header & Footer) */}
      <Route path="/" element={<LandingPage />} />

      <Route path="/flights" element={<FlightList01 />} />
      <Route path="/flight-list-02" element={<FlightList02 />} />
      <Route path="/flight-detail" element={<FlightDetails />} />

      <Route path="/flights/book/:id" element={<FlightBooking />} />

      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/my-booking" element={<MyBooking />} />
      <Route path="/travelers" element={<Travelers />} />
      <Route path="/payment-detail" element={<PaymentDetail />} />
      <Route path="/my-wishlists" element={<MyWishlists />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/delete-account" element={<DeleteAccount />} />

      {/* <Route path="/compare-listing" element={<CompareListing />} /> */}
      <Route path="/join-us" element={<JoinUs />} />
      <Route path="/booking-page" element={<BookingPage />} />
      <Route path="/bookingpage-02" element={<BookingPage2 />} />
      <Route path="/bookingpage-03" element={<BookingPage3 />} />

      <Route path="/classic-blog" element={<ClassicBlog />} />
      <Route path="/blog" element={<GridBlog />} />
      <Route path="/blog-detail" element={<BlogDetail />} />
      
      {/* Auth Pages without Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/two-factor-auth" element={<TwoFactor />} />

      <Route path="/about-us" element={<AboutUs />} />
      {/* <Route path="/career-page" element={<CareerPage />} /> */}
      {/* <Route path="/help-center" element={<HelpCenter />} /> */}
      <Route path="/faq" element={<Faq />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/contact-us" element={<Contactv1 />} />
      <Route path="/contact-v2" element={<Contactv2 />} />


      </Routes>
    </Suspense>
  );
}

export default App;
