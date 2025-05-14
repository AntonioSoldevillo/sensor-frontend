import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://backend-sensor.onrender.com/auth/token/login/', {
        username,
        password,
      });

      const token = response.data.auth_token;
      localStorage.setItem('access_token', token);
      setToken(token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">Login</h2>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p className="login-footer">
            Don't have an account?{' '}
            <a href="/register">Register</a>
          </p>
        </div>
      </div>

      {/* Styles moved to bottom */}
      <style>{`
        .login-wrapper {
          display: flex;
          justify-content: center;
          min-height: 70vh;
          background: linear-gradient(to right, #ece9e6, #ffffff);
          font-family: Arial, sans-serif;
          margin-top:-550px;
          padding: 600px;
        }

        .login-card {
          background-color: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .login-title {
          font-size: 1.8rem;
          color: #1877f2;
          margin-bottom: 1.5rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .login-input {
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
        }

        .login-button {
          padding: 0.75rem;
          background-color: #1877f2;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .login-button:hover {
          background-color: #145db2;
        }

        .login-footer {
          margin-top: 1rem;
          font-size: 0.9rem;
        }

        .login-footer a {
          color: #1877f2;
          text-decoration: none;
          font-weight: bold;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }

        .error-message {
          color: red;
          font-size: 0.85rem;
        }
      `}</style>
    </>
  );
};

export default LoginPage;
