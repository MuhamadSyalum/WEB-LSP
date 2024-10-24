import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import './ProfileForm.css';

// ... rest of the code

const ProfileForm = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState({
    nama: '',
    email: '',
    noKTP: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    alamat: '',
    noTelepon: '',
    pendidikanTerakhir: '',
    pekerjaan: '',
    namaPerusahaan: '',
  });
  const [ktpFile, setKtpFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.isAuthenticated && auth.user && auth.user.id) {
        try {
          const response = await axios.get(`/api/profile_asesi/${auth.user.id}`, {
            headers: { Authorization: `Bearer ${auth.token}` }
          });
          if (response.data) {
            setProfile(response.data);
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
          setError('Gagal mengambil data profil. Silakan coba lagi nanti.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setKtpFile(file);
    } else {
      setError('File KTP harus berformat PDF');
      e.target.value = null; // Reset input file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      Object.keys(profile).forEach(key => {
        formData.append(key, profile[key]);
      });
      if (ktpFile) {
        formData.append('ktp', ktpFile);
      }
  
      console.log('API_URL:', API_URL); // Log API_URL
      console.log('Full URL:', `${API_URL}/profile_asesi`); // Log full URL
      console.log('Form Data:', Object.fromEntries(formData)); // Log form data
  
      const response = await axios.post(`${API_URL}/profile_asesi`, formData, {
        headers: { 
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Response:', response.data);
      setSuccess('Profil berhasil disimpan');
    } catch (error) {
      console.error('Error:', error);
      setError('Gagal menyimpan profil. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Memuat...</div>;
  }

  if (!auth.isAuthenticated) {
    return <div className="error">Silakan login terlebih dahulu</div>;
  }

  return (
    <div className="profile-form-container">
      <h2>Profil Asesi</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="nama">Nama Lengkap</label>
            <input type="text" className="form-control" id="nama" name="nama" value={profile.nama} onChange={handleChange} required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" name="email" value={profile.email} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="noKTP">Nomor KTP</label>
            <input type="text" className="form-control" id="noKTP" name="noKTP" value={profile.noKTP} onChange={handleChange} required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="tempatLahir">Tempat Lahir</label>
            <input type="text" className="form-control" id="tempatLahir" name="tempatLahir" value={profile.tempatLahir} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="tanggalLahir">Tanggal Lahir</label>
            <input type="date" className="form-control" id="tanggalLahir" name="tanggalLahir" value={profile.tanggalLahir} onChange={handleChange} required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="jenisKelamin">Jenis Kelamin</label>
            <select className="form-control" id="jenisKelamin" name="jenisKelamin" value={profile.jenisKelamin} onChange={handleChange} required>
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="alamat">Alamat</label>
          <textarea className="form-control" id="alamat" name="alamat" rows="3" value={profile.alamat} onChange={handleChange} required></textarea>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="noTelepon">Nomor Telepon</label>
            <input type="tel" className="form-control" id="noTelepon" name="noTelepon" value={profile.noTelepon} onChange={handleChange} required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="pendidikanTerakhir">Pendidikan Terakhir</label>
            <input type="text" className="form-control" id="pendidikanTerakhir" name="pendidikanTerakhir" value={profile.pendidikanTerakhir} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="pekerjaan">Pekerjaan</label>
            <input type="text" className="form-control" id="pekerjaan " name="pekerjaan" value={profile.pekerjaan} onChange={handleChange} required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="namaPerusahaan">Nama Perusahaan</label>
            <input type="text" className="form-control" id="namaPerusahaan" name="namaPerusahaan" value={profile.namaPerusahaan} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="ktp">Upload KTP (PDF)</label>
          <input 
            type="file" 
            className="form-control-file" 
            id="ktp" 
            name="ktp" 
            onChange={handleFileChange}
            accept=".pdf"
          />
        </div>
        <button type="submit" className="btn btn-primary">Simpan Profil</button>
      </form>
    </div>
  );
};

export default ProfileForm;