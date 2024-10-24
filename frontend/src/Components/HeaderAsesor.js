import React from 'react';

const HeaderAsesor = ({ toggleSidebar }) => {
  return (
    <div className="header-asesor">
      <button className="toggle-btn" onClick={toggleSidebar}>
        &#9776; {/* Ikon bar */}
      </button>
      <h1>Selamat datang Asesor</h1>
      <div className="logo">
        <img src="/path-to-logo" alt="Logo" />
      </div>
    </div>
  );
};

export default HeaderAsesor;
