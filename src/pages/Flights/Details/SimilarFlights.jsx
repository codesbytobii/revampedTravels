import React from "react";
import Carousel from "../../../components/Carousel/Carousel";

// Import destination images
import tr1 from "../../../assets/img/destination/tr-1.jpg";
import tr2 from "../../../assets/img/destination/tr-2.jpg";
import tr3 from "../../../assets/img/destination/tr-3.jpg";
import tr4 from "../../../assets/img/destination/tr-4.jpg";
import tr5 from "../../../assets/img/destination/tr-5.jpg";

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
    <section className="py-5">
      <div className="container">
        {/* Header Section */}
        <div className="row align-items-center justify-content-between mb-3">
          <div className="col-8">
            <div className="upside-heading">
              <h5 className="fw-bold fs-6 m-0">Similar Flights</h5>
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
                      style={{ pointerEvents: isDragging ? "none" : "auto", width:"430px" }}
                    >
                      <div className="pop-touritem mb-4">
                        <div
                          className="card rounded-3 border m-0"
                          onClick={() => handleFlightClick(flight)}
                          style={{ cursor: 'pointer' }}
                        >
                          {/* Flight Image */}
                          <div className="flight-thumb-wrapper">
                            <div className="popFlights-item-overHidden">
                              <img
                                src={flight.image}
                                className="img-fluid"
                                alt={`${flight.origin} to ${flight.destination}`}
                              />
                            </div>
                          </div>

                          {/* Flight Details */}
                          <div className="touritem-middle position-relative p-3">
                            <div className="touritem-flexxer">
                              {/* Origin and Destination */}
                              <h4 className="city fs-6 m-0 fw-bold">
                                <span>{flight.origin}</span>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx px-1">
                                  <ArrowIcon />
                                </span>
                                <span>{flight.destination}</span>
                              </h4>

                              {/* Trip Details */}
                              <p className="detail ellipsis-container">
                                <span className="ellipsis-item__normal">{flight.tripType}</span>
                                <span className="separate ellipsis-item__normal"></span>
                                <span className="ellipsis-item">{flight.duration}</span>
                              </p>
                            </div>

                            {/* Price */}
                            <div className="flight-foots">
                              <h5 className="fs-5 low-price m-0">
                                <span className="tag-span">From</span>{' '}
                                <span className="price">{flight.price}</span>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .pop-touritem .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .pop-touritem .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .svg-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  );
};

export default SimilarFlights;