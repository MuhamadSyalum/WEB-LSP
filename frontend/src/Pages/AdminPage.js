import React, { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';
import ManageAsesor from './ManageAsesor';
import ManageAsesi from './ManageAsesi';

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Cek jika user terautentikasi dan memiliki level admin
    const user = JSON.parse(localStorage.getItem('user')); // Ambil user dari localStorage
    const level = user ? user.level : null; // Ambil level dari user

    if (!level || level !== 1) { // Pastikan level adalah angka dan bukan string
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="content" style={{ flex: 1, marginLeft: '250px', padding: '20px' }}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="Asesor" element={<ManageAsesor />} />
          <Route path="Asesi" element={<ManageAsesi />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
