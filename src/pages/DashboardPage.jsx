import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const navigate = useNavigate();

  const fetchSensorData = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.warn('No token found');
      navigate('/login'); // redirect if no token
      return;
    }

    try {
      const response = await axios.get('https://backend-sensor.onrender.com/api/sensor-data/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        const latest = data[data.length - 1];
        setTemperature(latest.temperature);
        setHumidity(latest.humidity);
      } else {
        console.warn('Empty sensor data array');
      }

    } catch (error) {
      console.error('Error fetching sensor data:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
  fetchSensorData(); // initial fetch

  const interval = setInterval(() => {
    fetchSensorData();
  }, 5000); // fetch every 5 seconds

  return () => clearInterval(interval); // cleanup on unmount
}, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="sensor-info">
          <div className="sensor-item">
            <h3>🌡️Temperature</h3>
            <p>{temperature !== null ? `${temperature}°C` : 'Loading...'}</p>
          </div>
          <div className="sensor-item">
            <h3>💧Humidity</h3>
            <p>{humidity !== null ? `${humidity}%` : 'Loading...'}</p>
          </div>
        </div>

        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      {/* Styles moved to the bottom */}
      <style>{`
        .dashboard-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to right, #ece9e6, #ffffff);
          font-family: 'Roboto', sans-serif;
          padding:700px;
        }

        .dashboard-card {
          background-color: white;
          padding: 7rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: 80%;
          max-width: 700px;
          margin-top:-1400px;
          margin-left:-150px
        }

        .dashboard-title {
          font-size: 2rem;
          color: #1877f2;
          margin-bottom: 2rem;
          font-weight: 600;
          margin-top: -80px;
        }

        .sensor-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .sensor-item {
          background-color: #f9f9f9;
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .sensor-item h3 {
          color: #1877f2;
          margin-bottom: 0.5rem;
        }

        .sensor-item p {
          font-size: 1.2rem;
          color: #333;
        }

        .logout-button {
          padding: 0.75rem 2rem;
          background-color:#333);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .logout-button:hover {
          background-color:#1877f2;
        }

      `}</style>
    </div>
  );
};

export default DashboardPage;
