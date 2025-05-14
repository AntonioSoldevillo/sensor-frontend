import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    try {
      await axios.post('https://backend-sensor.onrender.com/auth/users/', {
        username,
        email,
        password,
        re_password: rePassword,
      });

      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Create an Account</h1>

        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={rePassword}
            required
            onChange={(e) => setRePassword(e.target.value)}
            className="register-input"
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="register-button">Register</button>
        </form>

        <p className="login-footer">
          Already have an account?{' '}
          <a href="/login" className="login-link">Login</a>
        </p>
      </div>

      {/* Styles moved to the bottom */}
      <style>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to right, #ece9e6, #ffffff);
          font-family: 'Roboto', sans-serif;
          padding:600px;
        }

        .register-card {
          background-color: white;
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
          margin-top:-1300px;
        }

        .register-title {
          font-size: 2rem;
          color: #1877f2;
          margin-bottom: 2rem;
          font-weight: 600;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .register-input {
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
        }

        .register-button {
          padding: 0.75rem 1.5rem;
          background-color: #1877f2;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .register-button:hover {
          background-color: #145db2;
        }

        .login-footer {
          margin-top: 1rem;
          font-size: 0.9rem;
        }

        .login-link {
          color: #1877f2;
          text-decoration: none;
          font-weight: bold;
        }

        .login-link:hover {
          text-decoration: underline;
        }

        .error-message {
          color: red;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
