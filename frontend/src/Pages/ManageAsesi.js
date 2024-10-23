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

  useEffect(() => {
    fetchAsesi();
  }, []);

  const fetchAsesi = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/asesi');
      setAsesiList(response.data);
    } catch (error) {
      console.error('Error fetching asesi:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/auth/users/${editId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/auth/register', formData);
      }
      fetchAsesi();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (asesi) => {
    setFormData({
      email: asesi.email,
      password: '',
      level: 3
    });
    setIsEditing(true);
    setEditId(asesi.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this asesi?')) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
        fetchAsesi();
      } catch (error) {
        console.error('Error deleting asesi:', error);
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
  };

  return (
    <div className="container mt-4">
      <h2>Manage Asesi</h2>
      
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {asesiList.map((asesi) => (
            <tr key={asesi.id}>
              <td>{asesi.id}</td>
              <td>{asesi.email}</td>
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
    </div>
  );
};

export default ManageAsesi;