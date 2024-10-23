import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAsesor: 0,
    totalAsesi: 0,
    recentActivities: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [asesorRes, asesiRes] = await Promise.all([
        axios.get('http://localhost:5000/api/auth/asesor'),
        axios.get('http://localhost:5000/api/auth/asesi')
      ]);

      setStats({
        totalAsesor: asesorRes.data.length,
        totalAsesi: asesiRes.data.length,
        recentActivities: [...asesorRes.data, ...asesiRes.data]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5)
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Asesor</h5>
              <h2 className="card-text">{stats.totalAsesor}</h2>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Asesi</h5>
              <h2 className="card-text">{stats.totalAsesi}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recent Activities</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Date Added</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentActivities.map((activity, index) => (
                      <tr key={index}>
                        <td>{activity.email}</td>
                        <td>{activity.level === 2 ? 'Asesor' : 'Asesi'}</td>
                        <td>{new Date(activity.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;