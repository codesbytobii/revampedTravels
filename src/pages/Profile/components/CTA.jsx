import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const CTA = () => {
  return (
    <div className="py-5 bg-primary mt-4">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-4 col-lg-4 col-md-6">
            <h4 className="text-light fw-bold lh-base m-0">Join our Newsletter To Keep Up To Date With Us!</h4>
          </div>
          <div className="col-xl-5 col-lg-5 col-md-6">
            <form>
              <div className="row align-items-center justify-content-between bg-white rounded-3 p-2 gx-0">
                <div className="col-xl-9 col-lg-8 col-md-8">
                  <div className="form-group m-0">
                    <input type="text" className="form-control bold ps-1 border-0" placeholder="Enter Your Mail!" />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-4">
                  <div className="form-group m-0">
                    <button type="button" className="btn btn-dark fw-medium full-width">Submit<i className="fa-solid fa-arrow-trend-up ms-2" /></button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
