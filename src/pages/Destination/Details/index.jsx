import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Modal, Carousel } from "react-bootstrap";
import Layout from "../../../components/Layout/Layout";
import SimilarFlights from "./SimilarFlights";
import { getOfferBySlug } from "../../../pages/Landing2/components/Offers"; // adjust to wherever offers.js lives (same file Features.jsx imports)

import airLogo from "assets/img/air-2.png";
import hotelImg from "assets/img/hotel/hotel-1.jpg";

const money = (n) => `$${n.toLocaleString("en-US")}`;

// makes a <button> wrap an image without any button chrome
const fillBtn = { width: "100%", height: "100%", padding: 0, border: 0, background: "none", display: "block", cursor: "zoom-in" };

const Destinationdetals = () => {
    const { slug } = useParams(); // e.g. "los-angeles" from /destination-detail/los-angeles
    const offer = getOfferBySlug(slug);

    // lightbox state (hooks must run before the early return below)
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [lightboxView, setLightboxView] = useState("viewer"); // "grid" = all photos, "viewer" = one big photo
    const total = offer ? offer.gallery.length : 0;
    const openLightbox = (i, view = "viewer") => { setLightboxIndex(i); setLightboxView(view); setLightboxOpen(true); };
    const closeLightbox = () => setLightboxOpen(false);

    // arrow keys + close the lightbox when switching to another destination
    useEffect(() => {
        if (!lightboxOpen || lightboxView !== "viewer" || !total) return undefined;
        const onKey = (e) => {
            if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % total);
            if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + total) % total);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [lightboxOpen, lightboxView, total]);
    useEffect(() => { setLightboxOpen(false); }, [slug]);

    // Unknown slug, e.g. /destination-detail/atlantis
    if (!offer) {
        return (
            <Layout>
                <section className="gray-simple">
                    <div className="container text-center py-5">
                        <h2 className="mb-2">Destination not found</h2>
                        <p className="mb-4">We couldn't find the offer you were looking for.</p>
                        <Link to="/" className="btn btn-primary">Back to home</Link>
                    </div>
                </section>
            </Layout>
        );
    }

    const {
        city, title, discount, duration, persons, stays, description, highlights,
        inclusions, exclusions, itinerary, dayActivities, gallery, ratings, reviews,
        reviewScore, reviewCount, flight, hotel, activity, coupons,
        priceFrom, originalPrice, departure,
    } = offer;

    return (
        <Layout>
            <section className="pt-3 gray-simple">
                <div className="container">
                    <div className="row">

                        {/* ===== Header + gallery ===== */}
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="card border-0 p-3 mb-4">
                                <div className="crd-heaader d-md-flex align-items-center justify-content-between">
                                    <div className="crd-heaader-first">
                                        <div className="d-block">
                                            <h4 className="mb-0">{title}</h4>
                                            <div className="exlops">
                                                <p className="detail ellipsis-container fw-medium">
                                                    <span className="ellipsis-item__normal">{duration}</span>
                                                    {stays.map((stay) => (
                                                        <React.Fragment key={stay}>
                                                            <span className="separate ellipsis-item__normal" />
                                                            <span className="ellipsis-item">{stay}</span>
                                                        </React.Fragment>
                                                    ))}
                                                    <span className="separate ellipsis-item__normal" />
                                                    <span className="ellipsis-item label text-success bg-light-success">
                                                        {persons}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="crd-heaader-last my-md-0 my-2">
                                        <div className="drix-first d-flex align-items-center pe-2 text-end mb-2">
                                            <a href="#" className="bg-light-info text-info rounded-1 fw-medium text-sm px-3 py-2 lh-base">
                                                <i className="fa-solid fa-bookmark me-2" />
                                                Bookmark
                                            </a>
                                            <a href="#" className="bg-light-danger text-danger rounded-1 fw-medium text-sm px-3 py-2 lh-base ms-2">
                                                <i className="fa-solid fa-share-nodes me-2" />
                                                Share
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="geotrip-gallery mb-lg-0 mb-3">
                                    <div className="left-img">
                                        <button type="button" style={fillBtn} onClick={() => openLightbox(0)} aria-label={`View ${city} photos`}>
                                                <img src={gallery[0]} alt={city} className="img-fluid" />
                                            </button>
                                    </div>
                                    <div className="right-grid position-relative">
                                        {gallery.slice(1, 5).map((src, i) => (
                                            <button type="button" key={src} style={fillBtn} onClick={() => openLightbox(i + 1)} aria-label={`View photo ${i + 2}`}>
                                                <img src={src} alt={`${city} ${i + 2}`} className="rounded-2 img-fluid" />
                                            </button>
                                        ))}
                                        <div className="position-absolute end-0 bottom-0 mb-3 me-3">
                                            <button type="button" onClick={() => openLightbox(0, "grid")} className="btn btn-md btn-whites fw-medium text-dark">
                                                <i className="fa-solid fa-caret-right me-1" />
                                                View all {gallery.length} photos
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ===== Tabs ===== */}
                        <div className="col-xl-12 col-lg-12 col-md-12 mb-5">
                            <ul className="nav nav-pills primary nav-fill gap-2 p-2 bg-light-primary rounded-2" id="pillstour-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link rounded-2 active" id="pills-overview-tab" data-bs-toggle="pill" data-bs-target="#pills-overview" type="button" role="tab" aria-controls="pills-overview" aria-selected="true">
                                        Overview
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link rounded-2" id="pills-itinerary-tab" data-bs-toggle="pill" data-bs-target="#pills-itinerary" type="button" role="tab" aria-controls="pills-itinerary" aria-selected="false">
                                        Itinerary
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link rounded-2" id="pills-hotfly-tab" data-bs-toggle="pill" data-bs-target="#pills-hotfly" type="button" role="tab" aria-controls="pills-hotfly" aria-selected="false">
                                        Hotels &amp; Transfers
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="row">

                                {/* ===== Details ===== */}
                                <div className="col-xl-9 col-lg-9 col-md-12">
                                    <div className="tab-content" id="pillstour-tabContent">

                                        {/* ---------- Overview ---------- */}
                                        <div className="tab-pane fade show active" id="pills-overview" role="tabpanel" aria-labelledby="pills-overview-tab" tabIndex={0}>
                                            <div className="overview-wrap full-width">

                                                <div className="card mb-4 border rounded-3">
                                                    <div className="card-header"><h4 className="fs-5">Overview</h4></div>
                                                    <div className="card-body"><p className="mb-0">{description}</p></div>
                                                </div>

                                                <div className="card mb-4 border rounded-3">
                                                    <div className="card-header"><h4 className="fs-5">Tour Highlights</h4></div>
                                                    <div className="card-body">
                                                        <ul className="row align-items-center p-0 g-3">
                                                            {highlights.map((h) => (
                                                                <li className="col-md-6" key={h}>
                                                                    <i className="fa-solid fa-check text-success me-2" />{h}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="card border rounded-3 mb-4">
                                                    <div className="card-header"><h4 className="fs-5">Inclusions &amp; Exclusions</h4></div>
                                                    <div className="card-body">
                                                        <div className="expott-info mb-4">
                                                            <h5>Inclusions</h5>
                                                            <ul className="row align-items-center p-0 g-3">
                                                                {inclusions.map((item) => (
                                                                    <li className="col-md-6" key={item}>
                                                                        <i className="fa-regular fa-circle-dot text-success me-2" />{item}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="expott-info">
                                                            <h5>Exclusions</h5>
                                                            <ul className="row align-items-center p-0 g-3">
                                                                {exclusions.map((item) => (
                                                                    <li className="col-md-6" key={item}>
                                                                        <i className="fa-regular fa-circle-dot text-danger me-2" />{item}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card border rounded-3">
                                                    <div className="card-header"><h4 className="fs-5 mb-0">Guests Reviews</h4></div>
                                                    <div className="card-body">
                                                        <div className="row align-items-center mb-4">
                                                            <div className="col-xl-3 col-lg-4 col-md-4">
                                                                <div className="rounded-3 bg-primary full-width">
                                                                    <div className="py-4 px-3 text-center">
                                                                        <h3 className="text-light display-2 fw-semibold mb-0">{reviewScore}</h3>
                                                                        <p className="text-light lh-base m-0">Extraordinary {reviewCount} Reviews</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-9 col-lg-8 col-md-8">
                                                                <ul className="row align-items-center p-0 mb-0 gy-3 gx-4">
                                                                    {ratings.map((r) => (
                                                                        <li className="col-xl-6 col-lg-6 col-md-6 col-sm-12" key={r.label}>
                                                                            <div className="revs-wraps">
                                                                                <div className="revs-wraps-flex d-flex align-items-center justify-content-between mb-1">
                                                                                    <span className="text-dark fw-semibold text-md">{r.label}</span>
                                                                                    <span className="text-dark fw-semibold text-md">{r.score}</span>
                                                                                </div>
                                                                                <div className="progress" role="progressbar" aria-label={r.label} aria-valuenow={r.score * 10} aria-valuemin={0} aria-valuemax={100} style={{ height: 7 }}>
                                                                                    <div className={`progress-bar ${r.score < 8.7 ? "bg-warning" : "bg-success"}`} style={{ width: `${r.score * 10}%` }} />
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <div className="gstRevws-groups">
                                                            {reviews.map((rev) => (
                                                                <div className="single-gstRevws rounded-2 border p-2 d-flex align-items-start mb-3" key={rev.name + rev.date}>
                                                                    <div className="single-gstRevws-thumb">
                                                                        {rev.avatar ? (
                                                                            <div className="rounded-2 overflow-hidden w-25 h-25">
                                                                                <img src={rev.avatar} className="img-fluid" alt="" />
                                                                            </div>
                                                                        ) : (
                                                                            <div className="rounded-2 bg-light-purple d-flex align-items-center justify-content-center overflow-hidden w-25 h-25">
                                                                                <h3 className="m-0 fs-1 fw-semibold text-purple">{rev.name.charAt(0)}</h3>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="single-gstRevws-caps ps-3">
                                                                        <div className="gstRevws-head d-flex align-items-start justify-content-between">
                                                                            <div className="dfls-headers">
                                                                                <h5 className="h6 text-dark fw-semibold mb-0">{rev.name}</h5>
                                                                                <p className="text-md mb-0">{rev.country}</p>
                                                                            </div>
                                                                            <div className="dfls-arrios">
                                                                                <span className="text-muted text-md">{rev.date}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="dfls-secription">
                                                                            <p className="mb-0">{rev.text}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="show-morerewsbox mb-3">
                                                                <div className="text-center" role="alert">
                                                                    <Link to="#" className="fw-medium text-primary">
                                                                        Load More Guest Reviews
                                                                        <i className="fa-solid fa-caret-down ms-2" />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div className="sbms-rewsbox">
                                                                <div className="alert alert-success text-center" role="alert">
                                                                    Login your account to submit reviews{" "}
                                                                    <Link to="#" className="text-dark">Login</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ---------- Itinerary ---------- */}
                                        <div className="tab-pane fade" id="pills-itinerary" role="tabpanel" aria-labelledby="pills-itinerary-tab" tabIndex={0}>
                                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                                {itinerary.map((day, i) => {
                                                    const n = i + 1;
                                                    const isFirst = i === 0;
                                                    return (
                                                        <div className="accordion-item border rounded-2" key={day.title}>
                                                            <h2 className="accordion-header">
                                                                <button
                                                                    className={`accordion-button ${isFirst ? "" : "collapsed"}`}
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target={`#flush-day${n}`}
                                                                    aria-expanded={isFirst}
                                                                    aria-controls={`flush-day${n}`}
                                                                >
                                                                    <span className="fw-bold me-2">Day 0{n}</span>{day.title}
                                                                </button>
                                                            </h2>
                                                            <div id={`flush-day${n}`} className={`accordion-collapse collapse ${isFirst ? "show" : ""}`} data-bs-parent="#accordionFlushExample">
                                                                <div className="accordion-body">
                                                                    <div className="exportial mb-3">
                                                                        {day.tags.map((t) => (
                                                                            <span className="label text-success bg-light-success me-2" key={t}>{t}</span>
                                                                        ))}
                                                                    </div>
                                                                    <div className="exportial mb-2">
                                                                        <ul className="d-flex flex-wrap align-items-center p-0">
                                                                            {dayActivities.map((a) => (
                                                                                <li className="text-md fw-medium me-4 mb-2" key={a.label}>
                                                                                    <i className={`${a.icon} text-muted me-2`} />{a.label}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                    <div className="exportial mb-3">
                                                                        <p className="mb-0">{day.text}</p>
                                                                    </div>
                                                                    {isFirst && (
                                                                        <div className="exportial">
                                                                            <div className="row align-items-center justify-content-center g-3">
                                                                                {gallery.slice(0, 4).map((src, k) => (
                                                                                    <div className="col-md-3 col-6" key={src}>
                                                                                        <div className="expoiller-thumb">
                                                                                            <img src={src} className="img-fluid rounded-2" alt={`${city} ${k + 1}`} style={{ cursor: "zoom-in" }} onClick={() => openLightbox(k)} />
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* ---------- Hotels & Transfers ---------- */}
                                        <div className="tab-pane fade" id="pills-hotfly" role="tabpanel" aria-labelledby="pills-hotfly-tab" tabIndex={0}>

                                            {/* Flight */}
                                            <div className="single-iffcort mb-4">
                                                <h6 className="d-flex align-items-center fw-semibold">
                                                    <i className="fa-regular fa-circle-check me-2" />Flight details
                                                </h6>
                                                <div className="flights-accordion border rounded-3">
                                                    <div className="flights-list-item bg-white rounded-3 p-3">
                                                        <div className="row gy-4 align-items-center justify-content-between">
                                                            <div className="col">
                                                                <div className="row">
                                                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                                                        <div className="d-flex align-items-center mb-2">
                                                                            <span className="label bg-light-primary text-primary me-2">Departure</span>
                                                                            <span className="text-muted text-sm">{departure}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                                                        <div className="row gx-lg-5 gx-3 gy-4 align-items-center">
                                                                            <div className="col-sm-auto">
                                                                                <div className="d-flex align-items-center justify-content-start">
                                                                                    <div className="d-start fl-pic">
                                                                                        <img className="img-fluid" src={airLogo} width={45} alt={flight.airline} />
                                                                                    </div>
                                                                                    <div className="d-end fl-title ps-2">
                                                                                        <div className="text-dark fw-medium">{flight.airline}</div>
                                                                                        <div className="text-sm text-muted">{flight.cabin}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col">
                                                                                <div className="row gx-3 align-items-center">
                                                                                    <div className="col-auto">
                                                                                        <div className="text-dark fw-bold">{flight.departTime}</div>
                                                                                        <div className="text-muted text-sm fw-medium">{flight.from}</div>
                                                                                    </div>
                                                                                    <div className="col text-center">
                                                                                        <div className="flightLine departure"><div /><div /></div>
                                                                                        <div className="text-muted text-sm fw-medium mt-3">{flight.stops}</div>
                                                                                    </div>
                                                                                    <div className="col-auto">
                                                                                        <div className="text-dark fw-bold">{flight.arriveTime}</div>
                                                                                        <div className="text-muted text-sm fw-medium">{flight.to}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-auto">
                                                                                <div className="text-dark fw-medium">{flight.duration}</div>
                                                                                <div className="text-muted text-sm fw-medium">{flight.stops}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Hotel */}
                                            <div className="single-iffcort mb-4">
                                                <h6 className="d-flex align-items-center fw-semibold">
                                                    <i className="fa-regular fa-circle-check me-2" />Check-In to hotel
                                                </h6>
                                                <div className="card list-layout-block border rounded-3 p-3">
                                                    <div className="row">
                                                        <div className="col-xl-4 col-lg-3 col-md">
                                                            <div className="cardImage__caps rounded-2 overflow-hidden h-100">
                                                                <img className="img-fluid h-100 object-fit" src={hotelImg} alt={hotel.name} />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl col-lg col-md">
                                                            <div className="listLayout_midCaps mt-md-0 mt-3 mb-md-0 mb-3">
                                                                <div className="d-flex align-items-center justify-content-start">
                                                                    <div className="d-inline-block">
                                                                        {Array.from({ length: hotel.stars }).map((_, s) => (
                                                                            <i key={s} className="fa fa-star text-warning text-xs" />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <h4 className="fs-5 fw-bold mb-1">{hotel.name}</h4>
                                                                <ul className="row g-2 p-0">
                                                                    <li className="col-auto"><p className="text-muted-2 text-md">{hotel.area}</p></li>
                                                                    <li className="col-auto"><p className="text-muted-2 text-md fw-bold">.</p></li>
                                                                    <li className="col-auto"><p className="text-muted-2 text-md">{hotel.distance}</p></li>
                                                                    <li className="col-auto"><p className="text-muted-2 text-md fw-bold">.</p></li>
                                                                    <li className="col-auto">
                                                                        <p className="text-muted-2 text-md"><Link to="#" className="text-primary">Show on Map</Link></p>
                                                                    </li>
                                                                </ul>
                                                                <div className="detail ellipsis-container mt-3">
                                                                    {hotel.amenities.map((a) => (
                                                                        <span className="ellipsis" key={a}>{a}</span>
                                                                    ))}
                                                                </div>
                                                                <div className="position-relative mt-3">
                                                                    <div className="fw-medium text-dark">{hotel.room}</div>
                                                                </div>
                                                                <div className="position-relative mt-4">
                                                                    <div className="d-block position-relative">
                                                                        <label className="label bg-light-success text-success">
                                                                            Free Cancellation, till 1 hour of Pick up
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Activity */}
                                            <div className="single-iffcort mb-4">
                                                <h6 className="d-flex align-items-center fw-semibold">
                                                    <i className="fa-regular fa-circle-check me-2" />Today's Activity
                                                </h6>
                                                <div className="card list-layout-block rounded-3 border p-3">
                                                    <div className="row">
                                                        <div className="col-xl-4 col-lg-3 col-md">
                                                            <div className="cardImage__caps rounded-2 overflow-hidden h-100">
                                                                <img className="img-fluid h-100 object-fit" src={gallery[2]} alt={activity.title} />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl col-lg col-md">
                                                            <div className="listLayout_midCaps mt-md-0 mt-3 mb-md-0 mb-3">
                                                                <div className="d-flex align-items-center justify-content-start mb-1">
                                                                    <span className="label bg-light-success text-success">{activity.tag}</span>
                                                                </div>
                                                                <h4 className="fs-5 fw-bold mb-1">{activity.title}</h4>
                                                                <ul className="row g-2 p-0">
                                                                    <li className="col-auto"><p className="text-muted-2 text-md">{activity.area}</p></li>
                                                                    <li className="col-auto"><p className="text-muted-2 text-md fw-bold">.</p></li>
                                                                    <li className="col-auto"><p className="text-muted-2 text-md">{activity.distance}</p></li>
                                                                </ul>
                                                                <div className="detail ellipsis-container mt-3">
                                                                    {activity.places.map((p) => (
                                                                        <span className="ellipsis" key={p}>{p}</span>
                                                                    ))}
                                                                </div>
                                                                <div className="hstack gap-3 flex-wrap mt-2">
                                                                    <p className="mb-0">Duration:<span className="h6 fw-semibold mb-0 ms-1">{activity.duration}</span></p>
                                                                    <p className="mb-0">Place Covered:<span className="h6 fw-semibold mb-0 ms-1">{activity.placesCovered}</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ===== Sidebar ===== */}
                                <div className="col-xl-3 col-lg-3 col-md-12">
                                    <div className="sides-block">
                                        <div className="card border rounded-3 mb-4">
                                            <div className="single-card px-3 py-3">
                                                <p className="text-sm mb-0 lh-0"><del>{money(originalPrice)}</del></p>
                                                <p className="font12 lh-1 mb-0">
                                                    <span className="text-dark fs-3 fw-bold"><span>{money(priceFrom)}</span></span>{" "}
                                                    per person*
                                                </p>
                                                <p className="text-sm mb-0">*Excluding applicable taxes</p>
                                                <div className="position-absolute end-0 top-0 mt-2 me-2">
                                                    <span className="text-md text-light label bg-success px-2 text-uppercase">{discount}</span>
                                                </div>
                                            </div>
                                            <div className="single-card d-flex align-items-center justify-content-between px-3 py-3 border-top border-bottom">
                                                <div className="exlop-date">
                                                    <span className="text-dark fw-medium">
                                                        <i className="fa-regular fa-calendar me-2" />{departure}
                                                    </span>
                                                </div>
                                                <div className="exlop-link">
                                                    <Link to="#" className="fw-semibold text-primary">Modify</Link>
                                                </div>
                                            </div>
                                            <div className="single-card px-3 py-3">
                                                <button className="btn btn-sm btn-primary full-width fw-medium text-uppercase mb-2" type="button">
                                                    proceed to book online
                                                </button>
                                                <button className="btn btn-sm btn-light-primary full-width fw-medium text-uppercase" type="button">
                                                    Send Inquiry
                                                </button>
                                            </div>
                                        </div>

                                        <div className="card border rounded-3">
                                            <div className="card-header"><h4>Coupons &amp; Offers</h4></div>
                                            <div className="card-body">
                                                <div className="form-group position-relative">
                                                    <input type="text" className="form-control" placeholder="Have a Coupon Code?" defaultValue="" />
                                                    <a href="#" className="position-absolute top-50 end-0 fw-semibold translate-middle text-primary disable">Apply</a>
                                                </div>
                                                <p className="couponSep"><span className="couponSepText">OR</span></p>

                                                {coupons.map((c) => (
                                                    <div className={`single-couponOffers mb-3 position-relative ${c.applied ? "active" : ""}`} key={c.code}>
                                                        <div className={`${c.applied ? "bg-light-success" : "gray-simple"} d-flex align-items-start justify-content-start py-3 px-2 rounded-3 position-relative`}>
                                                            {c.applied && (
                                                                <div className="flex-shrink-0">
                                                                    <span className="text-success fs-4"><i className="fa-solid fa-circle-check" /></span>
                                                                </div>
                                                            )}
                                                            <div className="flexio-coupon ps-2">
                                                                <div className="d-flex align-items-center justify-content-between">
                                                                    <p className="text-md text-uppercase fw-medium text-dark lh-1 mb-0">{c.code}</p>
                                                                    <a href="#" className="text-blue text-uppercase fw-medium text-md">
                                                                        {c.applied ? "Remove" : "Apply"}
                                                                    </a>
                                                                </div>
                                                                <p className="text-md lh-1 mb-3">
                                                                    Its downpouring offers grab exclusive discounts. Offer Ends Soon..Hurry!!!
                                                                </p>
                                                                <p className="couponPrice mb-0">
                                                                    <span className="fw-bold text-dark fs-5">- {money(c.amount)}</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SimilarFlights />

            <div className="py-5 bg-primary">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <h4 className="text-light fw-bold lh-base m-0">
                                Join our Newsletter To Keep Up To Date With Us!
                            </h4>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-6">
                            <div className="newsletter-forms mt-md-0 mt-4">
                                <form>
                                    <div className="row align-items-center justify-content-between bg-white rounded-3 p-2 gx-0">
                                        <div className="col-xl-9 col-lg-8 col-md-8">
                                            <div className="form-group m-0">
                                                <input type="text" className="form-control bold ps-1 border-0" placeholder="Enter Your Mail!" />
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-4 col-md-4">
                                            <div className="form-group m-0">
                                                <button type="button" className="btn btn-dark fw-medium full-width">
                                                    Submit
                                                    <i className="fa-solid fa-arrow-trend-up ms-2" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Photo gallery popup: grid of all photos + single-photo viewer ===== */}
            <Modal
                show={lightboxOpen}
                onHide={closeLightbox}
                size="xl"
                centered
                scrollable
                fullscreen="md-down"
                contentClassName="bg-dark border-0"
            >
                <Modal.Header closeButton closeVariant="white" className="border-0">
                    <Modal.Title className="fs-6 text-white d-flex align-items-center gap-3">
                        {lightboxView === "grid" ? (
                            <span>{city} &middot; All photos ({gallery.length})</span>
                        ) : (
                            <>
                                <button type="button" className="btn btn-sm btn-outline-light" onClick={() => setLightboxView("grid")}>
                                    <i className="fa-solid fa-table-cells-large me-2" />All photos
                                </button>
                                <span>{lightboxIndex + 1} / {gallery.length}</span>
                            </>
                        )}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {lightboxView === "grid" ? (
                        /* scrollable gallery of every photo */
                        <div style={{ columns: "280px 3", columnGap: 12 }}>
                            {gallery.map((src, i) => (
                                <button
                                    type="button"
                                    key={src}
                                    onClick={() => openLightbox(i, "viewer")}
                                    aria-label={`Open photo ${i + 1}`}
                                    style={{ display: "block", width: "100%", padding: 0, border: 0, background: "none", marginBottom: 12, breakInside: "avoid", cursor: "zoom-in" }}
                                >
                                    <img src={src} alt={`${city} ${i + 1}`} className="rounded-2" style={{ width: "100%", display: "block" }} />
                                </button>
                            ))}
                        </div>
                    ) : (
                        /* one big photo with prev / next */
                        <>
                            <Carousel activeIndex={lightboxIndex} onSelect={(i) => setLightboxIndex(i)} interval={null} indicators={false} keyboard>
                                {gallery.map((src, i) => (
                                    <Carousel.Item key={src}>
                                        <img
                                            src={src}
                                            alt={`${city} ${i + 1}`}
                                            className="d-block mx-auto"
                                            style={{ maxWidth: "100%", maxHeight: "68vh", objectFit: "contain" }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <div className="d-flex justify-content-center flex-wrap gap-2 mt-3">
                                {gallery.map((src, i) => (
                                    <button
                                        type="button"
                                        key={src}
                                        onClick={() => setLightboxIndex(i)}
                                        aria-label={`Go to photo ${i + 1}`}
                                        style={{
                                            width: 72, height: 54, padding: 0, border: 0, borderRadius: 6, overflow: "hidden",
                                            opacity: i === lightboxIndex ? 1 : 0.5,
                                            outline: i === lightboxIndex ? "2px solid #fff" : "none",
                                            background: "none", cursor: "pointer",
                                        }}
                                    >
                                        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </Layout>
    );
};

export default Destinationdetals;