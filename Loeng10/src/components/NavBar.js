import React, { useEffect, useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { AuthContext } from './AuthContext';
import authorImage from '../images/Author.jpg';

function NavBar() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
  }, [user]);
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ marginBottom: '10px' }}>
      <Container>
        <Navbar.Brand as={Link} to='/'>Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/posts'>Posts</Nav.Link>
            {
              user && <Nav.Link as={Link} to='/posts/add'>Add Post</Nav.Link>
            }
            {
              user?.role === 'admin' &&  <Nav.Link as={Link} to='/users'>Users</Nav.Link>
            }
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {user ? (
              <NavDropdown 
                title={<Image src={authorImage} roundedCircle width="40" height="40" />}
                id="collapsible-nav-dropdown"
                alignRight
              >
                <NavDropdown.Item>{user.email}</NavDropdown.Item>
                <NavDropdown.Item>Role: {user.role}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to={`/users/${user.id}`}>Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <Logout />
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
