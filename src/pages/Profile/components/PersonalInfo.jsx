import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const PersonalInfo = () => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h4><i className="fa-solid fa-file-invoice me-2" /> Personal Information</h4>
      </div>
      <div className="card-body">
        <Form>
          <Row className="g-3">
            <Col md={12} className="mb-3 d-flex align-items-center">
              <label htmlFor="uploadfile-1" className="me-3" title="Replace this pic">
                <span className="avatar avatar-xl">
                  <img id="uploadfile-1-preview" className="avatar-img rounded-circle border border-white border-3 shadow" src="/assets/img/team-1.jpg" alt="" style={{ width: 80 }} />
                </span>
              </label>
              <Form.Label className="btn btn-sm btn-light-primary px-4 mb-0" htmlFor="uploadfile-1">Change</Form.Label>
              <Form.Control id="uploadfile-1" type="file" className="d-none" />
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control defaultValue="Adam K" />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control defaultValue="Divliars" />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Email ID</Form.Label>
                <Form.Control type="email" defaultValue="adamkruck@gmail.com" />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Mobile</Form.Label>
                <Form.Control defaultValue="9856542563" />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" defaultValue="2000-02-04" />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Control defaultValue="Male" />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>About Info</Form.Label>
                <Form.Control as="textarea" rows={4} defaultValue={"Lorem ipsum dolor sit amet, nec virtute nusquam ex."} />
              </Form.Group>
            </Col>

            <Col md={12} className="text-end mt-2">
              <Button variant="primary">Save Changes</Button>
            </Col>

          </Row>
        </Form>
      </div>
    </div>
  );
};

export default PersonalInfo;
