import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-logo">
          <h2>LSP AP-I</h2>
          <p>administrasi Perkantoran indonesia</p>
        </div>

        {/* Navigation Links */}
        <nav className="footer-nav">
          <a href="#beranda">Beranda</a>
          <a href="#tentang">Tentang</a>
          <a href="#galeri">Galeri</a>
        </nav>

        {/* Social Media Icons */}
        <div className="footer-social">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
        </div>

        {/* Contact Information */}
        <div className="footer-contact">
          <p>Alamat</p>
          <p>Jl. Talaga Bodas No.31 Kota Bandung</p>
        </div>
      </div>
      <p className="footer-end"> &copy; 2024 LSP AP-I</p>
    </footer>
  );
};

export default Footer;
