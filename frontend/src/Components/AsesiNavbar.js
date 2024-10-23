// asesiNavbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AsesiNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/asesi">asesi Panel</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/asesi">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/asesi/users">Manage Users</Nav.Link>
          <Nav.Link as={Link} to="/asesi/settings">Settings</Nav.Link>
          <Nav.Link as={Link} to="/">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AsesiNavbar;
