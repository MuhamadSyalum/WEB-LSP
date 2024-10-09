// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'; 
import Header from './Components/Header';
import MyNavbar from './Components/MyNavbar';
import Login from './Pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />  {/* Route untuk halaman Home */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
