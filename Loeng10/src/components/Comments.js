// Comments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Form, Button, Alert } from 'react-bootstrap';
import config from '../config';
import formatDate from '../utils/formatDate';

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', body: '' });
  const [message, setMessage] = useState(null);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.API_URL}/posts/${props.postId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [props.postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.name || !newComment.email || !newComment.body) {
      setMessage({
        message: 'All fields are required',
        variant: 'danger',
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${config.API_URL}/comments`, { ...newComment, postId: props.postId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({
        message: 'Comment added successfully',
        variant: 'success',
      });
      setNewComment({ name: '', email: '', body: '' });
      fetchComments();
    } catch (error) {
      setMessage({
        message: error.response.data.message,
        variant: 'danger',
      });
    }
  };

  return (
    <Card className="my-5">
      <Card.Body>
        <Card.Title>Comments</Card.Title>
        <ListGroup variant="flush">
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <h5>{comment.name}</h5>
              <small className="text-muted">{formatDate(comment.created_at)}</small>
              <p>{comment.body}</p>
              <small className="text-muted">{comment.email}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h5 className="mt-4">Add a Comment</h5>
        { message && <Alert variant={message.variant}>{message.message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={newComment.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={newComment.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBody">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your comment"
              name="body"
              value={newComment.body}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className='mt-2'>
            Add Comment
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Comments;
