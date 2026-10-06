import React from 'react';
import { Card, Button, ProgressBar, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileCard = ({ name = 'Adam K. Divliars', location = 'California, USA', avatar = '/assets/img/team-1.jpg' }) => {
  return (
    <Card className="rounded-2 me-xl-5 mb-4">
      <div className="card-top bg-primary position-relative">
        <div className="position-absolute end-0 top-0 mt-4 me-3"><Link to="/login" className="square--40 circle bg-light-dark text-light"><i className="fa-solid fa-right-from-bracket" /></Link></div>
        <div className="py-5 px-3 text-center">
          <div className="crd-thumbimg">
            <div className="p-2 d-flex align-items-center justify-content-center brd">
              <Image src={avatar} roundedCircle width={120} alt="avatar" />
            </div>
          </div>
          <div className="crd-capser text-center mt-3">
            <h5 className="mb-0 text-light fw-semibold">{name}</h5>
            <span className="text-light opacity-75 fw-medium text-md"><i className="fa-solid fa-location-dot me-2" />{location}</span>
          </div>
        </div>
      </div>

      <Card.Body className="card-middle px-4 py-4">
        <div className="crdapproval-groups">
          <div className="crdapproval-single d-flex align-items-center justify-content-start mb-3">
            <div className="square--50 circle bg-light-primary text-primary"><i className="fa-solid fa-envelope-circle-check fs-5" /></div>
            <div className="crdapproval-caps ps-2">
              <p className="fw-semibold text-dark lh-2 mb-0">Verify Your Email</p>
              <p className="text-md text-muted lh-1 mb-0">20% Left — <Link to="#verifyemail" className="text-dark">Verify</Link></p>
            </div>
          </div>

          <div className="crdapproval-single d-flex align-items-center justify-content-start mb-3">
            <div className="square--50 circle bg-light-primary text-primary"><i className="fa-solid fa-phone-volume fs-5" /></div>
            <div className="crdapproval-caps ps-2">
              <p className="fw-semibold text-dark lh-2 mb-0">Verify Your Mobile</p>
              <p className="text-md text-muted lh-1 mb-0">20% Left — <Link to="#verifyphone" className="text-dark">Verify</Link></p>
            </div>
          </div>

          <div className="crdapproval-single d-flex align-items-center justify-content-start">
            <div className="square--50 circle bg-light-primary text-primary"><i className="fa-solid fa-file-invoice fs-5" /></div>
            <div className="crdapproval-caps ps-2">
              <p className="fw-semibold text-dark lh-2 mb-0">Incomplete Basic Info</p>
              <p className="text-md text-muted lh-1 mb-0">20% Left — <Link to="#complete" className="text-dark">Complete</Link></p>
            </div>
          </div>
        </div>
      </Card.Body>

      <Card.Body className="card-middle mt-2 mb-4 px-4">
        <div className="revs-wraps mb-3">
          <div className="d-flex align-items-center justify-content-between mb-1">
            <span className="text-dark fw-semibold text-md">Complete Your Profile</span>
            <span className="text-dark fw-semibold text-md">75%</span>
          </div>
          <ProgressBar now={75} variant="success" style={{ height: 7 }} />
        </div>
        <div className="crd-upgrades mt-3">
          <Button variant="light" className="btn-light-primary fw-medium w-100 rounded-2"><i className="fa-solid fa-sun me-2" /> Upgrade Pro</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
