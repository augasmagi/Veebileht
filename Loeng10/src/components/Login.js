import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import config from '../config';

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const { contextLogin } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${config.API_URL}/login`, login);
      // setUser(jwtDecode(response.data.token));
      // const user = jwtDecode(response.data.token);
      // localStorage.setItem('user', JSON.stringify(user));
      // localStorage.setItem('token', response.data.token);
      contextLogin(response.data.token);
      setMessage({
        message: 'Login successful! Redirecting to home page ...',
        variant: 'success',
      });
      setTimeout(() => {
        setMessage(null);
        navigate('/');
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessage({
        message: error.response.data.message,
        variant: 'danger',
      });
      setLogin({ ...login, password: '' });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <Row>
        <Col>
          <Card style={{ width: '20rem', padding: '20px' }}>
            <Card.Body>
              <Card.Title className="text-center display-6">Logi sisse</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    placeholder="Sisesta email" 
                    value={login.email}
                    onChange={handleChange}
                    required 
                  />
                </Form.Group>
                
                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>Parool</Form.Label>
                  <Form.Control 
                    type="password"
                    name="password"
                    placeholder="Sisesta parool" 
                    value={login.password}
                    onChange={handleChange}
                    required 
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 w-100">
                  Logi sisse
                </Button>
              </Form>
              
              {message && <Alert variant={message.variant} className="mt-3">{message.message}</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
