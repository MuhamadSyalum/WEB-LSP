import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAsesor: 0,
    totalAsesi: 0,
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Starting to fetch dashboard data...');
        setLoading(true);
        setError(null);

        // Menggunakan axios interceptor untuk logging
        axios.interceptors.request.use(request => {
          console.log('Request:', request);
          return request;
        });

        axios.interceptors.response.use(
          response => {
            console.log('Response:', response);
            return response;
          },
          error => {
            console.log('Response Error:', error);
            return Promise.reject(error);
          }
        );

        // Fetch data dengan timeout yang lebih lama
        const response = await axios.get('http://localhost:5000/api/auth/dashboard', {
          headers: {
            'user-level': '1',
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 detik timeout
        });

        console.log('Dashboard Response:', response.data);

        if (response.data.success) {
          const { stats: dashboardStats } = response.data;
          console.log('Setting dashboard stats:', dashboardStats);
          
          setStats({
            totalAsesor: dashboardStats.totalAsesor || 0,
            totalAsesi: dashboardStats.totalAsesi || 0,
            recentActivities: dashboardStats.recentActivities || []
          });
        } else {
          throw new Error(response.data.message || 'Failed to fetch data');
        }

      } catch (error) {
        console.error('Detailed error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        
        setError(
          error.response?.data?.message || 
          error.message || 
          'Failed to connect to server'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Debug render
  console.log('Current state:', { stats, loading, error });

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error Loading Dashboard</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            <button 
              className="btn btn-outline-danger"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Debug empty state
  if (!stats.totalAsesor && !stats.totalAsesi && !stats.recentActivities.length) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          <h4 className="alert-heading">No Data Available</h4>
          <p>The dashboard is not showing any data. This might be because:</p>
          <ul>
            <li>The database is empty</li>
            <li>There's an issue with the data format</li>
            <li>The connection to the server is not properly established</li>
          </ul>
          <hr />
          <p className="mb-0">
            <button 
              className="btn btn-warning"
              onClick={() => window.location.reload()}
            >
              Refresh Dashboard
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Dashboard Admin</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <h5 className="card-title">Total Asesor</h5>
              <h2 className="display-4">{stats.totalAsesor}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <h5 className="card-title">Total Asesi</h5>
              <h2 className="display-4">{stats.totalAsesi}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recent Activities</h5>
            </div>
            <div className="card-body">
              {stats.recentActivities.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentActivities.map((activity, index) => (
                        <tr key={activity.id || index}>
                          <td>{activity.email}</td>
                          <td>
                            <span className={`badge ${activity.level === 2 ? 'bg-primary' : 'bg-success'}`}>
                              {activity.level === 2 ? 'Asesor' : 'Asesi'}
                            </span>
                          </td>
                          <td>
                            {new Date(activity.created_at).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center mb-0">No recent activities</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;