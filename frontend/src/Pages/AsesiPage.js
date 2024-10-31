import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AsesiPage.css';

const AsesiPage = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
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
            <Link to="dashboard">Dashboard</Link>
          </li>
          <li>
            <i className="fa fa-user"></i>
            <Link to="profile">Profile</Link>
          </li>
          <li>
            <i className="fa fa-book"></i>
            <Link to="panduan">Panduan Asesmen</Link>
          </li>
          <li>
            <i className="fa fa-file"></i>
            <Link to="dokumen">Kelengkapan Dokumen</Link>
          </li>
          <li onClick={toggleDropdown}>
            <i className="fa fa-tasks"></i>
            <a href="#asesmen">Asesmen</a>
            <ul style={{ display: isDropdownOpen ? 'block' : 'none' }}>
              <li><Link to="asesmen/essay">Soal Essay</Link></li>
              <li><Link to="asesmen/pilihan">Soal Pilihan Ganda</Link></li>
              <li><Link to="asesmen/demo">Soal Demonstrasi</Link></li>
              <li><Link to="asesmen/wawancara">Wawancara</Link></li>
            </ul>
          </li>
          <li>
            <i className="fa fa-sign-out"></i>
            <Link to="/logout">Logout</Link>
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