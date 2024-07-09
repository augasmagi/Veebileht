// PostPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Modal, Form, Alert } from 'react-bootstrap';
import Comments from './Comments';
import config from '../config';
import formatDate from '../utils/formatDate';

const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editPost, setEditPost] = useState({ title: '', body: '' });
  const [message, setMessage] = useState(null);

  const fetchPost = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.API_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(response.data.post);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost(id);
  }, [id, showEditModal]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPost((prevEditPost) => ({
      ...prevEditPost,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${config.API_URL}/posts/${id}`, editPost, {
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
        setShowEditModal(false);
        navigate(`/posts/${id}`);
      }, 2000);
    } catch (error) {
      console.log(error);
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
      await axios.delete(`${config.API_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({
        message: 'Post deleted successfully',
        variant: 'success',
      });
      setTimeout(() => {
        setMessage(null);
        setShowDeleteModal(false);
        navigate('/posts');
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessage({
        message: error.response.data.message,
        variant: 'danger',
      });
      setTimeout(() => {
        setMessage(null);
        setShowDeleteModal(false);
      }, 2000);
    }
  };

  const openEditModal = () => {
    setEditPost({ title: post.title, body: post.body });
    setShowEditModal(true);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <Container className="my-5">
        <h2>Fetching data ...</h2>
      </Container>
    );
  }

  if (!post && !loading) {
    return (
      <Container className="my-5">
        <h2>Post not found</h2>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="mb-4">
        <h1 className="display-4">{post.title}</h1>
        <div className="text-muted mb-2">{`Author: ${post.firstName} ${post.lastName}`}</div>
        <div className="text-muted mb-4">{`Created: ${formatDate(post.created_at)}`}</div>
        <p className="lead">{post.body}</p>
        <div className="mt-3">
          <Button variant="primary" onClick={openEditModal}>Edit</Button>
          <Button variant="danger" onClick={openDeleteModal} className="ms-2">Delete</Button>
        </div>
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && <Alert variant={message.variant}>{message.message}</Alert>}
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={editPost.title}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formBody">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter body"
                name="body"
                value={editPost.body}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Button disabled={message} variant="primary" type="submit" className='mt-2'>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && <Alert variant={message.variant}>{message.message}</Alert>}
          {!message && 'Are you sure you want to delete this post?'}
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
      <Comments postId={id} />
    </Container>
  );
};

export default PostPage;
