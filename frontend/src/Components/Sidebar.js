import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  const toggleUsers = () => {
    console.log('Toggle Users clicked'); // Tambahkan log ini
    setIsUsersOpen(prevState => !prevState);
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul className="main-menu">
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <div 
            className={`menu-item ${isUsersOpen ? 'active' : ''}`} 
            onClick={toggleUsers}
            style={{ cursor: 'pointer' }}
          >
            Manage Users {isUsersOpen ? '▼' : '▶'}
          </div>
          <ul className={`submenu ${isUsersOpen ? 'open' : ''}`}>
            <li className="submenu-item"><Link to="/admin/Asesor">Manage Asesor</Link></li>
            <li className="submenu-item"><Link to="/admin/Asesi">Manage Asesi</Link></li>
          </ul>
        </li>
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
        <li>
          <Link to="/admin/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;