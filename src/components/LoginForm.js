import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../services/axiosConfig';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(email, password);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const res = await axios.post('/api/auth/google', { token: response.credential });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleGoogleFailure = (response) => {
    console.error('Google login failed:', response);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
    </div>
  );
};

export default LoginForm;
