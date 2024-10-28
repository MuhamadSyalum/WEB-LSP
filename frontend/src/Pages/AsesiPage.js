// AsesiPage.js
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AsesiPage.css'; 

const AsesiPage = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    // For example:
    // localStorage.removeItem('token');
    // localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">Logo</div>
        <div className="welcome-message">Selamat datang, (nama asesi)</div>
        <div className="search">
          <input type="text" placeholder=" " id="search-input" />
          <label htmlFor="search-input">Search...</label>
        </div>
      </nav>

      <div className="sidebar">
        <ul>
          <li>
            <i className="fa fa-home"></i>
            <Link to="/asesi/dashboard">Dashboard</Link>
          </li>
          <li> 
            <i className="fa fa-user"></i>
            <Link to="/asesi/profile">Profile</Link>
          </li>
          <li>
            <i className="fa fa-book"></i>
            <Link to="/asesi/panduan">Panduan Asesmen</Link>
          </li>
          <li>
            <i className="fa fa-file"></i>
            <Link to="/asesi/dokumen">Kelengkapan Dokumen</Link>
          </li>
          <li onClick={toggleDropdown}>
            <i className="fa fa-tasks"></i>
            <a href="#asesmen">Asesmen</a>
            <ul style={{ display: isDropdownOpen ? 'block' : 'none' }}>
              <li><Link to="/asesi/asesmen/essay">Soal Essay</Link></li>
              <li><Link to="/asesi/asesmen/pilihan">Soal Pilihan Ganda</Link></li>
              <li><Link to="/asesi/asesmen/demo">Soal Demonstrasi</Link></li>
              <li><Link to="/asesi/asesmen/wawancara">Wawancara</Link></li>
            </ul>
          </li>
          <li>
            <i className="fa fa-sign-out"></i>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AsesiPage;