import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Gunakan hook useAuth dari file terpisah

const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth(); // Gunakan auth dan setAuth dari context

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    console.log('Data yang dikirim:', { email, password });
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
  
      console.log('Full response:', response);

      if (response.data.success) {
        console.log('Login successful:', response.data);
        
        // Update auth state menggunakan setAuth
        setAuth({
          isAuthenticated: true,
          user: response.data.user,
          token: response.data.token,
        });

        // Simpan token dan user di localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
  
        // Arahkan berdasarkan level pengguna
        switch (response.data.user.level) {
          case 1:
            navigate('/admin/dashboard');
            break;
          case 2:
            navigate('/asesor');
            break;
          case 3:
            navigate('/asesi/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        console.log('Login failed:', response.data);
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error);
      setError(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;