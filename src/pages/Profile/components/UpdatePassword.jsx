import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const UpdatePassword = () => {
  return (
    <Card>
      <Card.Header>
        <h4><i className="fa-solid fa-lock me-2" /> Update Password</h4>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <Form.Control type="password" placeholder="*********" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="*********" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="*********" />
          </Form.Group>
          <div className="text-end">
            <Button variant="primary">Change Password</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UpdatePassword;
