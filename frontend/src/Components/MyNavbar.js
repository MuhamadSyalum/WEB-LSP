import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import "./MyNavbar.css";

const MyNavbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-logo-container">
          <img src="/assets/images/logo.png" alt="Logo" className="navbar-logo" />
          <span className="navbar-title">My Website</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">Beranda</Nav.Link>
            <Nav.Link href="#sertifikasi" className="nav-link-custom">Sertifikasi</Nav.Link>
            <Nav.Link href="#tutorial" className="nav-link-custom">Tutorial</Nav.Link>
            <Nav.Link href="#tentang" className="nav-link-custom">Tentang</Nav.Link>
            <Nav.Link href="#galeri" className="nav-link-custom">Galeri</Nav.Link>
            <Nav.Link href="#dataasesor" className="nav-link-custom">Data Asesor</Nav.Link>
            <Nav.Link href="#kontak" className="nav-link-custom">Kontak</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link onClick={handleLoginClick} className="login-button">
              <FaSignInAlt className="login-icon" /> Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;