import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './Pages/Login';
import Home from './Pages/Home';
import AdminPage from './Pages/AdminPage';
import AsesorPage from './Pages/AsesorPage';
import AsesiPage from './Pages/AsesiPage';
import ManageAsesor from './Pages/ManageAsesor';
import ManageAsesi from './Pages/ManageAsesi';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedLevels={[1]}>
              <AdminPage />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="asesor" element={<ManageAsesor />} />
            <Route path="asesi" element={<ManageAsesi />} />
          </Route>
          
          {/* Asesor Route */}
          <Route path="/asesor" element={
            <ProtectedRoute allowedLevels={[2]}>
              <AsesorPage />
            </ProtectedRoute>
          } />
          
          {/* Asesi Route */}
          <Route path="/asesi" element={
            <ProtectedRoute allowedLevels={[3]}>
              <AsesiPage />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;