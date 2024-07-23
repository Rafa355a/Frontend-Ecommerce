import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/usuarios/profile', {
        headers: {
          Authorization: token,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', `Bearer ${token}`);
    fetchUserProfile(`Bearer ${token}`);
  };

  const loginWithGoogle = async (token) => {
    const response = await axios.post('http://localhost:8080/api/auth/google', { token });
    const { jwt } = response.data;
    localStorage.setItem('token', `Bearer ${jwt}`);
    fetchUserProfile(`Bearer ${jwt}`);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
