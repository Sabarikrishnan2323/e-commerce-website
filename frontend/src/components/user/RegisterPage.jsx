// RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('register/', formData);
      setSuccess('Registration successful!');
      setFormData({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
        city: '',
        country: ''
      });
    } catch (error) {
      setError('Error during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Create an Account</h2>
        <p className="login-subtitle">Sign up to get started</p>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <label className="form-label">Username</label>
          <input className="form-control" type="text" name="username" value={formData.username} onChange={handleChange} required />

          <label className="form-label">Email</label>
          <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label className="form-label">Password</label>
          <input className="form-control" type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label className="form-label">First Name</label>
          <input className="form-control" type="text" name="first_name" value={formData.first_name} onChange={handleChange} />

          <label className="form-label">Last Name</label>
          <input className="form-control" type="text" name="last_name" value={formData.last_name} onChange={handleChange} />

          <label className="form-label">Phone</label>
          <input className="form-control" type="text" name="phone" value={formData.phone} onChange={handleChange} />

          <label className="form-label">City</label>
          <input className="form-control" type="text" name="city" value={formData.city} onChange={handleChange} />

          <label className="form-label">Country</label>
          <input className="form-control" type="text" name="country" value={formData.country} onChange={handleChange} />

          <label className="form-label">Address</label>
          <textarea className="form-control" name="address" value={formData.address} onChange={handleChange}></textarea>

          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
