import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const UpdateEmail = () => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h4><i className="fa-solid fa-envelope-circle-check me-2" /> Update Your Email</h4>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="update your new email" />
          </Form.Group>
          <div className="text-end">
            <Button variant="primary">Update Email</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UpdateEmail;
