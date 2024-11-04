import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilePreviewCell = ({ filename, fieldName }) => {
  if (!filename) return <td>No file uploaded</td>;

  const getFileUrl = () => {
    const baseUrl = 'http://localhost:5000/api/auth/files';
    const subDirectory = {
      profile_picture: 'foto_profile',
      ktp: 'ktp',
      diploma: 'diploma',
      additional_documents: 'additional_documents'
    }[fieldName];
    
    return `${baseUrl}/${subDirectory}/${filename}`;
  };

  const isImage = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png'].includes(ext);
  };

  return (
    <td>
      {isImage(filename) ? (
        <div className="file-preview">
          <img 
            src={getFileUrl()} 
            alt={`${fieldName} preview`}
            style={{ maxWidth: '100px', maxHeight: '100px', cursor: 'pointer' }}
            onClick={() => window.open(getFileUrl(), '_blank')}
          />
        </div>
      ) : (
        <a 
          href={getFileUrl()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-sm btn-primary"
        >
          View File
        </a>
      )}
    </td>
  );
};

const ManageAsesi = () => {
  const [asesiList, setAsesiList] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    date_of_birth: '',
    place_of_birth: '',
    address: '',
    education: '',
    occupation: '',
    religion: '',
    gender: '',
    profile_picture: null,
    ktp: null,
    diploma: null,
    additional_documents: null,
    level: 3
  });
  const [filePreviews, setFilePreviews] = useState({
    profile_picture: null,
    ktp: null,
    diploma: null,
    additional_documents: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [error, setError] = useState('');

  // Configure axios defaults
  axios.defaults.headers.common['user-level'] = '1'; // Admin level
  
  useEffect(() => {
    fetchAsesi();
  }, [pagination.page]);

  const fetchAsesi = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/users/asesi`, {
        params: {
          page: pagination.page,
          limit: pagination.limit
        }
      });
      
      if (response.data.success) {
        setAsesiList(response.data.data);
        setPagination(prev => ({
          ...prev,
          total: response.data.pagination.total,
          totalPages: response.data.pagination.totalPages
        }));
      } else {
        setError('Failed to fetch asesi data');
      }
    } catch (error) {
      console.error('Error fetching asesi:', error);
      setError('Error fetching asesi data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const formDataToSubmit = new FormData();
    
    // Append non-file data
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && !['profile_picture', 'ktp', 'diploma', 'additional_documents'].includes(key)) {
        formDataToSubmit.append(key, value);
      }
    });

    // Append files only if they exist
    const fileFields = ['profile_picture', 'ktp', 'diploma', 'additional_documents'];
    fileFields.forEach(field => {
      if (formData[field] instanceof File) {
        formDataToSubmit.append(field, formData[field]);
      }
    });

    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:5000/api/auth/users/${editId}`, formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if ( response.data.success) {
          fetchAsesi();
          resetForm();
        } else {
          setError(response.data.message);
        }
      } else {
        const response = await axios.post('http://localhost:5000/api/auth/register', formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.data.success) {
          fetchAsesi();
          resetForm();
        } else {
          setError(response.data.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleEdit = (asesi) => {
    setFormData({
      email: asesi.email,
      password: '', // Password field is empty when editing
      username: asesi.username,
      date_of_birth: asesi.date_of_birth,
      place_of_birth: asesi.place_of_birth,
      address: asesi.address,
      education: asesi.education,
      occupation: asesi.occupation,
      religion: asesi.religion,
      gender: asesi.gender,
      profile_picture: null,
      ktp: null,
      diploma: null,
      additional_documents: null,
      level: 3
    });
    setIsEditing(true);
    setEditId(asesi.id);
    setError('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this asesi?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
        if (response.data.success) {
          fetchAsesi();
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error('Error deleting asesi:', error);
        setError(error.response ?.data?.message || 'Error deleting asesi');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      username: '',
      date_of_birth: '',
      place_of_birth: '',
      address: '',
      education: '',
      occupation: '',
      religion: '',
      gender: '',
      profile_picture: null,
      ktp: null,
      diploma: null,
      additional_documents: null,
      level: 3
    });
    setIsEditing(false);
    setEditId(null);
    setError('');
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      // Update form data
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));

      // Create preview for images
      if (field === 'profile_picture' || field === 'ktp') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreviews(prev => ({
            ...prev,
            [field]: reader.result
          }));
        };
        reader.readAsDataURL(file);
      } else {
        // For PDF files, just store the name
        setFilePreviews(prev => ({
          ...prev,
          [field]: file.name
        }));
      }
    }
  };

  const validateFile = (file, type) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (file.size > maxSize) {
      setError(`File size should not exceed 5MB`);
      return false;
    }

    if (type === 'image') {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setError(`Only JPG, JPEG, and PNG files are allowed for images`);
        return false;
      }
    } else if (type === 'document') {
      if (file.type !== 'application/pdf') {
        setError(`Only PDF files are allowed for documents`);
        return false;
      }
    }

    return true;
  };

  return (
    <div className="container mt-4">
      <h2>Manage Asesi</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
 required={!isEditing}
          />
          {isEditing && (
            <small className="text-muted">Leave blank to keep current password</small>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            value={formData.date_of_birth}
            onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Place of Birth:</label>
          <input
            type="text"
            className="form-control"
            value={formData.place_of_birth}
            onChange={(e) => setFormData({...formData, place_of_birth: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input
            type="text"
            className="form-control"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Pendidikan Terakhir:</label>
          <select
            type="text"
            className="form-control"
            value={formData.education}
            onChange={(e) => setFormData({...formData, education: e.target.value})}
            >
              <option value="">Pilih Pendidikan</option>
              <option value="S3">S3</option>
              <option value="S2">S2</option>
              <option value="S1">S1</option>
              <option value="SMK/SMA">SMK/SMA</option>
              <option value="SMP">SMP</option>
              <option value="SD">SD</option>
            </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Pekerjaan:</label>
          <input
          type='text'
            className="form-control"
            value={formData.occupation}
            onChange={(e) => setFormData({...formData, occupation: e.target.value})}
           />
            
            
        </div>
        <div className="mb-3">
          <label className="form-label">Pendidikan Terakhir:</label>
          <select
            className="form-control"
            value={formData.religion}
            onChange={(e) => setFormData({...formData, religion: e.target.value})}
            >
              <option value="">Agama</option>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
              <option value="Hindu">Hindu</option>
              <option value="Buddha">Buddha</option>
              <option value="Lainnya">Lainnya</option>
            </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Gender:</label>
          <select
            className="form-control"
            value={formData.gender}
            onChange={(e) => setFormData({...formData, gender: e.target.value})}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Lainnya</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Profile Picture (JPG, JPEG, PNG):</label>
          <input
            type="file"
            className="form-control"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && validateFile(file, 'image')) {
                handleFileChange(e, 'profile_picture');
              } else {
                e.target.value = '';
              }
            }}
          />
          {filePreviews.profile_picture && (
            <img
              src={filePreviews.profile_picture}
              alt="Profile Preview"
              className="mt-2"
              style={{ maxWidth: '200px' }}
            />
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">KTP (JPG, JPEG, PNG):</label>
          <input
            type="file"
            className="form-control"
            accept=".jpg,.jpeg,.png"
            onChange ={(e) => {
              const file = e.target.files[0];
              if (file && validateFile(file, 'image')) {
                handleFileChange(e, 'ktp');
              } else {
                e.target.value = '';
              }
            }}
          />
          {filePreviews.ktp && (
            <img
              src={filePreviews.ktp}
              alt="KTP Preview"
              className="mt-2"
              style={{ maxWidth: '200px' }}
            />
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Diploma (PDF):</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && validateFile(file, 'document')) {
                handleFileChange(e, 'diploma');
              } else {
                e.target.value = '';
              }
            }}
          />
          {filePreviews.diploma && (
            <p className="mt-2">Selected File: {filePreviews.diploma}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Additional Documents (PDF):</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && validateFile(file, 'document')) {
                handleFileChange(e, 'additional_documents');
              } else {
                e.target.value = '';
              }
            }}
          />
          {filePreviews.additional_documents && (
            <p className="mt-2">Selected File: {filePreviews.additional_documents}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update' : 'Add'} Asesi
        </button>
        {isEditing && (
          <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Date of Birth</th>
            <th> Place of Birth</th>
            <th>Address</th>
            <th>Education</th>
            <th>Occupation</th>
            <th>Religion</th>
            <th>Gender</th>
            <th>Foto</th>
            <th>KTP</th>
            <th>Ijazah</th>
            <th>Dokumen Lainnya</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {asesiList.map((asesi) => (
            <tr key={asesi.id}>
              <td>{asesi.id}</td>
              <td>{asesi.email}</td>
              <td>{asesi.username}</td>
              <td>{new Date(asesi.date_of_birth).toLocaleDateString()}</td>
              <td>{asesi.place_of_birth}</td>
              <td>{asesi.address}</td>
              <td>{asesi.education}</td>
              <td>{asesi.occupation}</td>
              <td>{asesi.religion}</td>
              <td>{asesi.gender}</td>
              <FilePreviewCell filename={asesi.profile_picture} fieldName="profile_picture" />
              <FilePreviewCell filename={asesi.ktp} fieldName="ktp" />
              <FilePreviewCell filename={asesi.diploma} fieldName="diploma" />
              <FilePreviewCell filename={asesi.additional_documents} fieldName="additional_documents" />
              <td>{new Date(asesi.created_at).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(asesi)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(asesi.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {[...Array(pagination.totalPages)].map((_, index) => (
            <li 
              key={index} 
              className={`page-item ${pagination.page === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setPagination(prev => ({ ...prev , page: index + 1 }))}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ManageAsesi;