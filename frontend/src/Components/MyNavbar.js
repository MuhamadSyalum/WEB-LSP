// MyNavbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">LSP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Beranda</Nav.Link>
            <Nav.Link as={Link} to="/tentang">Tentang</Nav.Link>
            <Nav.Link as={Link} to="/galeri">Galeri</Nav.Link>
            <Nav.Link as={Link} to="/sertifikasi">Sertifikasi</Nav.Link>
            <Nav.Link as={Link} to="/kontak">Kontak</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
