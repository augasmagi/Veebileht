import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import config from '../config';

const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });
  const [message, setMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchUser = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      setFormData({...response.data.user, password: ''});
      setLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        navigate('/users');
      }
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    setMessage(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${config.API_URL}/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({
        message: response.data.message,
        variant: 'success',
      });
      setFormData((prevData) => ({
        ...prevData,
        password: '',
      }));
      setTimeout(() => {
        setMessage(null);
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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${config.API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({
        message: response.data.message,
        variant: 'success',
      });
      setTimeout(() => {
        setMessage(null);
        setShowDeleteModal(false);
        navigate('/users');
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

  if (loading) {
    return (
      <Container className="my-5">
        <h2>Loading user...</h2>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="display-4">User detail</h1>
      {message && <Alert variant={message.variant}>{message.message}</Alert>}
      {user && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName" className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLastName" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="forPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formRole" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
          <Button disabled={message} variant="primary" type="submit">
            Update
          </Button>
          <Button disabled={message} variant="danger" onClick={() => setShowDeleteModal(true)} className="ms-2">
            Delete
          </Button>
        </Form>
      )}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={message} variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button disabled={message} variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default User;
