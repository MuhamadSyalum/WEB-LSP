import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './MyNavbar.css';
import { Link } from 'react-router-dom';


const MyNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            className="navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Beranda</Nav.Link>
            <Nav.Link href="#tentang">Tentang</Nav.Link>
            <Nav.Link href="#galeri">Galeri</Nav.Link>
            <Nav.Link href="#sertifikasi">Sertifikasi</Nav.Link>
            <Nav.Link href="#kontak">Kontak</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login" className="login-button">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
