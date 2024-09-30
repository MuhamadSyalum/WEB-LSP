import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">LSP AP-I</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Beranda</Nav.Link> 
            <Nav.Link href="#tentang">Tentang</Nav.Link>
            <Nav.Link href="#galeri">Galeri</Nav.Link>
            <Nav.Link href="#sertifikasi">Sertifikasi</Nav.Link>
            <Nav.Link href="#kontak">Kontak</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Button variant="primary" as={Link} to="/login" className="ms-2">
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
