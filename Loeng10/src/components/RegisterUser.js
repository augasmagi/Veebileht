import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import config from '../config';

const RegisterUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const response = await axios.post(`${config.API_URL}/users`, formData);
      setMessage({
        message: `${response.data.message}, redirecting to login page ...`,
        variant: 'success',
      });
      setTimeout(() => {
        setMessage(null);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage({
        message: error.response.data.message,
        variant: 'danger',
      });
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="display-4">Register user</h1>
      {message && <Alert variant={message.variant}>{message.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName" className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formLastName" className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterUser;
