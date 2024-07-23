import React from 'react';
import RegisterForm from '../components/RegisterForm';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <h1 className="register-title">Register</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
