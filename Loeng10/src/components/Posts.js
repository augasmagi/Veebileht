import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import Post from './Post';
import { AuthContext } from './AuthContext';
import config from '../config';
import PaginationComponent from './PaginationComponent';

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { contextLogout } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts(currentPage);
  }, []);

  const fetchPosts = async (pageNumber) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.API_URL}/posts?page=${pageNumber}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data.posts);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      if (error.response.status === 401) {
        contextLogout();
        navigate('/login');
      }
      console.log(error);
    }
  };

  const onPageChange = (pageNumber) => {
    fetchPosts(pageNumber);
    setCurrentPage(pageNumber);
  
  };

  return (
    <Container>
      <Row>
        <h1 className="display-4">Posts</h1>
        <p>Kokku on {posts.length} postitust</p>
      </Row>
      <Row>
        {posts.map((post) => (
          <Post 
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.content}
            author={`${post.firstName} ${post.lastName}`}
            created_at={post.created_at}
          />
        ))}
      </Row>
      <Row>
        <PaginationComponent 
        currentPage={currentPage}
        totalPages={totalPages} 
        onPageChange={onPageChange}
        />
      </Row>
    </Container>
  );
};



export default Posts;
