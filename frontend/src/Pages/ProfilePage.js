import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [success, setSuccess] = useState('');
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    tanggal_lahir: '',
    tempat_lahir: '',
    jenis_kelamin: '',
    agama: '',
    pendidikan_terakhir: '',
    pekerjaan: '',
    nomor_telp: '',
    email: '',
    alamat: '',
    ijazah: null,
    ktp: null,
    foto: null,
    dokumen_lain: null
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/profile');
      setProfile(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
  
    try {
      const response = await axios.post('/api/profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setSuccess('Profil berhasil diperbarui!');
        fetchProfile(); // Refresh profile data
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      setSuccess('Gagal memperbarui profil. Silakan coba lagi.');
    }
  };
  const handleDeleteProfile = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus profil Anda?')) {
      try {
        await axios.delete('/api/profile');
        setProfile(null);
        setFormData({
          nama: '',
          tanggal_lahir: '',
          tempat_lahir: '',
          jenis_kelamin: '',
          agama: '',
          pendidikan_terakhir: '',
          pekerjaan: '',
          nomor_telp: '',
          email: '',
          alamat: '',
          ijazah: null,
          ktp: null,
          foto: null,
          dokumen_lain: null
        });
        setSuccess('Profil berhasil dihapus.');
      } catch (error) {
        console.error('Error deleting profile:', error);
        setSuccess('Gagal menghapus profil. Silakan coba lagi.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Profil Asesi</h2>
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">Nama Lengkap</label>
          <input type="text" className="form-control" id="nama" name="nama" value={formData.nama} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tanggal_lahir" className="form-label">Tanggal Lahir</label>
          <input type="date" className="form-control" id="tanggal_lahir" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tempat_lahir" className="form-label">Tempat Lahir</label>
          <input type="text" className="form-control" id="tempat_lahir" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="jenis_kelamin" className="form-label">Jenis Kelamin</label>
          <select className="form-control" id="jenis_kelamin" name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleInputChange} required>
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="agama" className="form-label">Agama</label>
          <select className="form-control" id="agama" name="agama" value={formData.agama} onChange={handleInputChange} required>
            <option value="">Pilih Agama</option>
            <option value="Islam">Islam</option>
            <option value="Kristen">Kristen</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="pendidikan_terakhir" className="form-label">Pendidikan Terakhir</label>
          <select className="form-control" id="pendidikan_terakhir" name="pendidikan_terakhir" value={formData.pendidikan_terakhir} onChange={handleInputChange} required>
            <option value="">Pilih Pendidikan Terakhir</option>
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMA/SMK">SMA/SMK</option>
            <option value="D3">D3</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="pekerjaan" className="form-label">Pekerjaan</label>
          <input type="text" className="form-control" id="pekerjaan" name="pekerjaan" value={formData.pekerjaan} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="nomor_telp" className="form-label">Nomor Telepon</label>
          <input type="tel" className="form-control" id="nomor_telp" name="nomor_telp" value={formData.nomor_telp} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="alamat" className="form-label">Alamat</label>
          <textarea className=" form-control" id="alamat" name="alamat" value={formData.alamat} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="ijazah" className="form-label">Ijazah (PDF)</label>
          <input type="file" className="form-control" id="ijazah" name="ijazah" onChange={handleFileChange} accept=".pdf" />
          {profile && profile.ijazah_path && (
            <a href={profile.ijazah_path} target="_blank" rel="noopener noreferrer">Lihat Ijazah</a>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="ktp" className="form-label">KTP (JPG, JPEG, PNG)</label>
          <input type="file" className="form-control" id="ktp" name="ktp" onChange={handleFileChange} accept=".jpg,.jpeg,.png" />
          {profile && profile.ktp_path && (
            <a href={profile.ktp_path} target="_blank" rel="noopener noreferrer">Lihat KTP</a>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="foto" className="form-label">Pas Foto (JPG, JPEG, PNG)</label>
          <input type="file" className="form-control" id="foto" name="foto" onChange={handleFileChange} accept=".jpg,.jpeg,.png" />
          {profile && profile.foto_path && (
            <a href={profile.foto_path} target="_blank" rel="noopener noreferrer">Lihat Foto</a>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="dokumen_lain" className="form-label">Dokumen Lainnya (PDF)</label>
          <input type="file" className="form-control" id="dokumen_lain" name="dokumen_lain" onChange={handleFileChange} accept=".pdf" />
          {profile && profile.dokumen_lain_path && (
            <a href={profile.dokumen_lain_path} target="_blank" rel="noopener noreferrer">Lihat Dokumen Lain</a>
          )}
        </div>
        <button type="submit">{profile ? 'Update Profile' : 'Create Profile'}</button>
      </form>
      {profile && (
        <button onClick={handleDeleteProfile}>Delete Profile</button>
      )}
    </div>
  );
};

export default ProfilePage;