import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from './Components/MyNavbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import AdminPage from './Pages/AdminPage'; // Tambahkan halaman Admin
import AsesorPage from './Pages/AsesorPage'; // Tambahkan halaman Asesor
import AsesiPage from './Pages/AsesiPage'; // Tambahkan halaman Asesi

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />   {/* Rute untuk Admin */}
        <Route path="/asesor" element={<AsesorPage />} /> {/* Rute untuk Asesor */}
        <Route path="/asesi" element={<AsesiPage />} />   {/* Rute untuk Asesi */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
