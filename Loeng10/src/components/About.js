// About.js
import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import authorImage from '../images/Author.jpg'; // Asenda oma pildiga

const About = () => {
  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={4}>
          <Image src={authorImage} roundedCircle fluid />
        </Col>
        <Col md={8}>
          <Card className="p-3">
            <Card.Body>
              <Card.Title>About This Blog</Card.Title>
              <Card.Text>
                Welcome to our blog! This is a place where we share our thoughts, experiences, and knowledge on various topics. Our aim is to provide valuable content to our readers and foster a community of like-minded individuals.
              </Card.Text>
              <Card.Title>About the Author</Card.Title>
              <Card.Text>
                Hi, I'm John Doe, the author of this blog. I have a passion for writing and sharing insights on topics like technology, lifestyle, and personal development. When I'm not writing, I enjoy reading, traveling, and exploring new ideas.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
