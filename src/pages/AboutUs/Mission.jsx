import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import side3 from "../../assets/img/side-3.png";

const points = [
  { t: "Curated, not crowded", d: "Every route, stay and experience is vetted by people who have actually been there." },
  { t: "Transparent pricing", d: "What you see at checkout is what you pay. No surprise fees, ever." },
  { t: "Real humans, 24/7", d: "A support team that picks up when plans change at 2 a.m." },
];

const Mission = () => (
  <section className="ab-mission">
    <Container>
      <Row className="align-items-center justify-content-between g-4 gy-5 gx-md-5">
        <Col xl={6} lg={6} md={6}>
          <span className="ab-eyebrow">Who we are</span>
          <h2 className="lh-base fs-1 fw-bold mb-3">Who We're & Our Mission</h2>
          <p className="ab-lead text-muted-2">
            We started GeoTrip with a simple belief: booking travel should feel as exciting as the trip itself.
            Today we help thousands of travellers find flights, stays and experiences that fit their budget and their story.
          </p>
          <ul className="ab-points">
            {points.map((p) => (
              <li key={p.t}>
                <span className="ab-tick"><i className="fa-solid fa-check"></i></span>
                <div><strong>{p.t}</strong><span className="d">{p.d}</span></div>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn-primary fw-medium px-4">Talk to our team<i className="fa-solid fa-arrow-right ms-2"></i></Link>
        </Col>

        <Col xl={5} lg={6} md={6}>
          <div className="ab-media">
            <img src={side3} alt="Travellers enjoying their trip" />
            <div className="ab-badge">
              <span className="ico"><i className="fa-solid fa-earth-africa"></i></span>
              <div><b>22+</b><small>Countries covered</small></div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Mission;