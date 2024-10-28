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
import ProfilePage from './Pages/ProfilePage'; // Ubah ini dari ProfileForm ke ProfilePage
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Placeholder components
const PanduanAsesmen = () => <h1>Panduan Asesmen</h1>;
const KelengkapanDokumen = () => <h1>Kelengkapan Dokumen</h1>;
const SoalEssay = () => <h1>Soal Essay</h1>;
const SoalPilihanGanda = () => <h1>Soal Pilihan Ganda</h1>;
const SoalDemonstrasi = () => <h1>Soal Demonstrasi</h1>;
const Wawancara = () => <h1>Wawancara</h1>;

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
          
          {/* Asesi Routes */}
          <Route path="/asesi" element={
            <ProtectedRoute allowedLevels={[3]}>
              <AsesiPage />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<ProfilePage />} /> {/* Ubah ini ke ProfilePage */}
            <Route path="panduan" element={<PanduanAsesmen />} />
            <Route path="dokumen" element={<KelengkapanDokumen />} />
            <Route path="asesmen" element={<Navigate to="asesmen/essay" />} />
            <Route path="asesmen/essay" element={<SoalEssay />} />
            <Route path="asesmen/pilihan" element={<SoalPilihanGanda />} />
            <Route path="asesmen/demo" element={<SoalDemonstrasi />} />
            <Route path="asesmen/wawancara" element={<Wawancara />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;