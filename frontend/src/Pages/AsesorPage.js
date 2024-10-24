import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AsesorPage.css';
import axios from 'axios';

const AsesorPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [profiles, setProfiles] = useState ([]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('/api/profiles');
      if (response.data.success) {
        setProfiles(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching profiles', error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="asesor-page">
      <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar">
          <ul>
            <li>Dashboard</li>
            <li>Data Asesi</li>
            <li>Dokumen</li>
            <li>
              Asesmen
              <ul className={`dropdown ${isSidebarOpen ? 'open' : ''}`}>
                <li>PG</li>
                <li>Essay</li>
                <li>TPD</li>
                <li>Wawancara</li>
              </ul>
            </li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
      <div className={`content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="header-asesor">
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? 'X' : '☰'}
          </button>
          <h1>Selamat Datang Asesor</h1>
          <div className="logo">
            <img src="path_to_logo" alt="Logo" />
          </div>
        </div>
        <div className="container mt-5">
          <h1>Profiles</h1>
          <ul>
            {profiles.map((profile, index) => (
              <li key={index}>
                <h2>{profile.name}</h2>
                <p>Email: {profile.email}</p>
                <p>Phone Number: {profile.phoneNumber}</p>
                <p>Address: {profile.address}</p>
                <p>KTP Number: {profile.ktpNumber}</p>
                <p>Gender: {profile.gender}</p>
                <p>Birth Date: {profile.birthDate}</p>
                <p>Place of Birth: {profile.placeOfBirth}</p>
                <p>Religion: {profile.religion}</p>
                <p>Occupation: {profile.occupation}</p>
                <p>Education: {profile.education}</p>
                <p>Foto KTP: {profile.foto_ktp}</p>
                <p>Pas Foto: {profile.pas_foto}</p>
                <p>Ijazah: {profile.ijazah}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AsesorPage;