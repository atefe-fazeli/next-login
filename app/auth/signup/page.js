"use client";

import React, { useState } from 'react';
import axios from 'axios';

function signup() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', formData);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form role="form" method="post" onSubmit={handleSubmit}>
        <div className="inputBox">
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} autoComplete="off" required />
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} autoComplete="off" required />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input type="text" name="username" value={formData.username} onChange={handleChange} autoComplete="off" required />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="off" required />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="off" required />
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign Up" />
      </form>
    </div>
  );
}

export default signup;
