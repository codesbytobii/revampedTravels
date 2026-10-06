import React from "react";
import Carousel from "../../../components/Carousel/Carousel";

// Import destination images
import tr1 from "../../../assets/img/destination/tr-1.jpg";
import tr2 from "../../../assets/img/destination/tr-2.jpg";
import tr3 from "../../../assets/img/destination/tr-3.jpg";
import tr4 from "../../../assets/img/destination/tr-4.jpg";
import tr5 from "../../../assets/img/destination/tr-5.jpg";
import { Link } from "react-router-dom";

// JSON Data Structure
const flightsData = [
  {
    id: 1,
    origin: "New York",
    destination: "Los Angeles",
    image: tr1,
    tripType: "Round-trip",
    duration: "3 days",
    price: "US$492",
    link: "/flight-search"
  },
  {
    id: 2,
    origin: "San Diego",
    destination: "San Jose",
    image: tr2,
    tripType: "Round-trip",
    duration: "3 days",
    price: "US$492",
    link: "/flight-search"
  },
  {
    id: 3,
    origin: "Dallas",
    destination: "Philadelphia",
    image: tr3,
    tripType: "Round-trip",
    duration: "3 days",
    price: "US$492",
    link: "/flight-search"
  },
  {
    id: 4,
    origin: "Nashville",
    destination: "Denver",
    image: tr4,
    tripType: "Round-trip",
    duration: "3 days",
    price: "US$492",
    link: "/flight-search"
  },
  {
    id: 5,
    origin: "Chicago",
    destination: "San Francisco",
    image: tr5,
    tripType: "Round-trip",
    duration: "3 days",
    price: "US$492",
    link: "/flight-search"
  },
  {
    id: 6,
    origin: "New York",
    destination: "Los Angeles",
    image: tr1,
    tripType: "Round-trip",
    duration: "3 days",
    price: "US$492",
    link: "/flight-search"
  },
];

// SVG Arrow Icon Component
const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.4 7H4C3.4 7 3 7.4 3 8C3 8.6 3.4 9 4 9H17.4V7ZM6.60001 15H20C20.6 15 21 15.4 21 16C21 16.6 20.6 17 20 17H6.60001V15Z"
      fill="currentColor"
    />
    <path
      opacity="0.3"
      d="M17.4 3V13L21.7 8.70001C22.1 8.30001 22.1 7.69999 21.7 7.29999L17.4 3ZM6.6 11V21L2.3 16.7C1.9 16.3 1.9 15.7 2.3 15.3L6.6 11Z"
      fill="currentColor"
    />
  </svg>
);

const SimilarFlights = () => {
  const handleFlightClick = (flight) => {
    console.log(`Selected flight: ${flight.origin} to ${flight.destination}`);
    // Add your navigation logic here
  };

  const handleMoreClick = () => {
    console.log("View more flights");
    // Add your navigation logic here
  };

  return (
    <section className="gray-simple py-5">
      <div className="container">
        {/* Header Section */}
        <div className="row align-items-center justify-content-between mb-3">
          <div className="col-8">
            <div className="upside-heading">
              <h5 className="fw-bold fs-6 m-0">Similar Destination</h5>
            </div>
          </div>
          <div className="col-4">
            <div className="text-end grpx-btn">
              <button
                className="btn btn-light-primary btn-md fw-medium"
                onClick={handleMoreClick}
              >
                More<i className="fa-solid fa-arrow-trend-up ms-2"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Flights Carousel */}
        <div className="row justify-content-center">
          <div className="col-xl-12 col-lg-12 col-md-12 p-0">
            <Carousel
              items={flightsData}
              itemsPerSlide={3}
              tabletItemsPerSlide={2}
              mobileItemsPerSlide={1}
              renderSlide={(slideFlights, slideIndex, { isDragging }) => (
                <div
                  className="row justify-content-center g-3"
                  style={{ width: "100%", margin: 0, flex: "0 0 100%" }}
                >
                  {slideFlights.map((flight) => (
                    <div
                      className="col-xl-4 col-lg-4 col-md-6 col-sm-12"
                      key={flight.id}
                      style={{ pointerEvents: isDragging ? "none" : "auto", width: "430px" }}
                    >
                      <div className="pop-touritem">
                        <Link to="#" className="card rounded-3 m-0">
                          <div className="flight-thumb-wrapper p-2 pb-0">
                            <div className="popFlights-item-overHidden rounded-3">
                              <img
                                src={flight.image}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="touritem-middle position-relative p-3">
                            <div className="touritem-flexxer">
                              <div className="tourist-wooks position-relative mb-3">
                                <ul className="activities-flex">
                                  <li>
                                    <div className="actv-wrap">
                                      <div className="actv-wrap-ico">
                                        <i className="fa-solid fa-jet-fighter" />
                                      </div>
                                      <div className="actv-wrap-caps">3 Flights</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="actv-wrap">
                                      <div className="actv-wrap-ico">
                                        <i className="fa-solid fa-building-wheat" />
                                      </div>
                                      <div className="actv-wrap-caps">2 Hotels</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="actv-wrap">
                                      <div className="actv-wrap-ico">
                                        <i className="fa-solid fa-person-walking-luggage" />
                                      </div>
                                      <div className="actv-wrap-caps">0 Activity</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="actv-wrap">
                                      <div className="actv-wrap-ico">
                                        <i className="fa-solid fa-bus" />
                                      </div>
                                      <div className="actv-wrap-caps">2 Transfers</div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className="explot">
                                <h4 className="city fs-title m-0 fw-bold">
                                  <span>Amazing Goa Trip Package with Flights</span>
                                </h4>
                                <div className="rates">
                                  <div className="rat-reviews">
                                    <strong>
                                      <i className="fa-solid fa-star text-warning me-1" />
                                      4.6
                                    </strong>
                                    <span>(142 Reviews)</span>
                                  </div>
                                </div>
                              </div>
                              <div className="touritem-amenties my-4">
                                <ul className="activities-flex">
                                  <li>
                                    <div className="actv-wrap">
                                      <div className="actv-wrap-caps text-dark fw-bold fs-6">
                                        <span className="text-dhani me-1">2N</span>Amman
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="actv-wrap">
                                      <div className="actv-wrap-caps text-dark fw-bold fs-6">
                                        <span className="text-dhani me-1">1N</span>Petra
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="actv-wrap">
                                      <div className="actv-wrap-caps text-dark fw-bold fs-6">
                                        <span className="text-dhani me-1">2N</span>Dhaka
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="booking-wrapes d-flex align-items-start justify-content-start flex-column">
                              <h5 className="fs-5 low-price m-0">
                                $<span className="price text-primary">492</span>
                              </h5>
                              <div className="text-muted-2 text-sm">For 2 Person</div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </div>

    </section>
  );
};

export default SimilarFlights;