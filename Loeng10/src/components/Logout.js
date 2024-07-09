import React, { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Logout = () => {
  const { contextLogout } = useContext(AuthContext);

  const navigate = useNavigate();
  const logout = () => {
    contextLogout();
    navigate('/login');
  };

  return (
    <NavDropdown.Item as={Link} onClick={logout} >Logout</NavDropdown.Item>
  );
};

export default Logout;
