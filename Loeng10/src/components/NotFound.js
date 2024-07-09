import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function NotFound() {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="display-4">404</h1>
          <p>Page not found</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
