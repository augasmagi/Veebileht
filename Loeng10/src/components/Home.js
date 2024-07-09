// HomePage.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Posts from './Posts';

const HomePage = () => {
  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <Card className="p-4 text-center bg-light">
            <Card.Body>
              <Card.Title as="h1" className="display-4">Welcome to Our Blog!</Card.Title>
              <Card.Text className="lead">
                Discover the latest articles, stories, and insights from our authors.
              </Card.Text>
              <hr className="my-4" />
              <Card.Text>
                Stay tuned and enjoy reading our latest posts.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Posts />
      </Row>
    </Container>
  );
};

export default HomePage;
