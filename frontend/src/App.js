import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './Pages/Login';
import Home from './Pages/Home';
import AdminPage from './Pages/AdminPage';
import AsesorPage from './Pages/AsesorPage';
import AsesiPage from './Pages/AsesiPage';
import ManageAsesor from './Pages/ManageAsesor';
import ManageAsesi from './Pages/ManageAsesi';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedLevels={[1]}>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/Asesor" 
            element={
              <ProtectedRoute allowedLevels={[1]}>
                <ManageAsesor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/Asesi" 
            element={
              <ProtectedRoute allowedLevels={[1]}>
                <ManageAsesi />
              </ProtectedRoute>
            } 
          />
          
          {/* Asesor Route */}
          <Route 
            path="/asesor" 
            element={
              <ProtectedRoute allowedLevels={[2]}>
                <AsesorPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Asesi Route */}
          <Route 
            path="/asesi" 
            element={
              <ProtectedRoute allowedLevels={[3]}>
                <AsesiPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
