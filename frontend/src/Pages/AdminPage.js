import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Cek jika user terautentikasi dan memiliki level admin
    const user = JSON.parse(localStorage.getItem('user'));
    const level = user ? user.level : null;

    if (!level || level !== 1) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="content" style={{ flex: 1, marginLeft: '250px', padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;