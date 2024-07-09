// AddPost.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';

const AddPost = () => {
  const [post, setPost] = useState({ title: '', body: '' });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post.title || !post.body) {
      setMessage({
        message: 'Both title and body are required',
        variant: 'danger',
      });
      setTimeout(() => {
        setMessage(null);
      }, 2000);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${config.API_URL}/posts`, post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const id = response.data.id;
      setMessage({
        message: `Post added successfully with id ${id}`,
        variant: 'success',
      });
      setTimeout(() => {
        setMessage(null);
        setPost({ title: '', body: '' });
      }, 2000);
    } catch (err) {
      setMessage({
        message: err.response.data.message,
        variant: 'danger',
      });
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  return (
    <Container>
      <Row>
        <h1 className="display-4">Add post</h1>
          {message && <Alert variant={message.variant}>{message.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={post.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBody">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter body"
                name="body"
                value={post.body}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-3'>
              Add Post
            </Button>
          </Form>
      </Row>
    </Container>
  );
};

export default AddPost;
