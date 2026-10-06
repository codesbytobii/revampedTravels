import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getImgUrl } from "../Landing2/utils/asset";

const Hero = () => (
  <section className="ab-hero bg-cover position-relative" style={{ background: `url(${getImgUrl('bg-title.jpg')}) no-repeat center / cover` }} data-overlay="5">
    <Container>
      <Row className="align-items-center justify-content-center">
        <Col xl={7} lg={9} md={12}>
          <div className="text-center">
            <div className="ab-crumb">
              <Link to="/">Home</Link><i className="fa-solid fa-chevron-right" style={{ fontSize: '.6rem' }}></i><span>About Us</span>
            </div>
            <h1 className="xl-heading text-light">We turn <span>trips</span> into stories</h1>
            <p className="text-light">Thoughtfully planned journeys, honest prices and people who genuinely care about where you go next.</p>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Hero;