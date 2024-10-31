import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageAsesi = () => {
  const [asesiList, setAsesiList] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    level: 3 // Level untuk Asesi
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
    
    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:5000/api/auth/users/${editId}`, formData);
        if (response.data.success) {
          fetchAsesi();
          resetForm();
        } else {
          setError(response.data.message);
        }
      } else {
        const response = await axios.post('http://localhost:5000/api/auth/register', formData);
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
        setError(error.response?.data?.message || 'Error deleting asesi');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      level: 3
    });
    setIsEditing(false);
    setEditId(null);
    setError('');
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
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {asesiList.map((asesi) => (
            <tr key={asesi.id}>
              <td>{asesi.id}</td>
              <td>{asesi.email}</td>
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
                onClick={() => setPagination(prev => ({ ...prev, page: index + 1 }))}
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