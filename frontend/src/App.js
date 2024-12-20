import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Beritas from "./Pages/Beritas";
import Products from "./Pages/Products";
import Asesors from './Pages/Asesors';
import AddUser from "./Pages/AddUser";
import EditUser from "./Pages/EditUser";
import AddBerita from "./Pages/AddBerita";
import EditBerita from "./Pages/EditBerita";
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct';
import AddAsesor from './Pages/AddAsesor';
import EditAsesor from './Pages/EditAsesor';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/beritas" element={<Beritas />} />
          <Route path="/beritas/add" element={<AddBerita />} />
          <Route path="/beritas/edit/:id" element={<EditBerita />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/asesors" element={<Asesors />} />
          <Route path="/asesors/add" element={<AddAsesor />} />
          <Route path="/asesors/edit/:id" element={<EditAsesor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;