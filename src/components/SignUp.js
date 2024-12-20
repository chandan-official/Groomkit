import React, { useState } from 'react';
import "../styles/SignUp.css";
import Signupsocialsign from './Signupsocialsign';
import Signupinput from './Signupinput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form inputs
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/signup', {
        name,
        email,
        phone,
        password,
      }
    );
    if (response.data.success) {
        setSuccess('Account created successfully!');
        console.log('Response:', response.data);
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }
       else {
        setError(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="Signup-form">
      <h2 className="form-title">Create Account</h2>
      <Signupsocialsign />
      <p className="separator">
        <span>or</span>
      </p>
      <form onSubmit={handleSubmit} className="signup-form">
        <Signupinput
          type="text"
          placeholder="Full Name"
          logo="person"
          onChange={(e) => setName(e.target.value)}
        />
        <Signupinput
          type="email"
          placeholder="Email Address"
          logo="mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Signupinput
          type="tel"
          placeholder="Phone Number"
          logo="call"
          onChange={(e) => setPhone(e.target.value)}
        />
        <Signupinput
          type="password"
          placeholder="Password"
          logo="lock"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Signupinput
          type="password"
          placeholder="Confirm Password"
          logo="lock"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}
      <p className="signin-text">
        Already have an account? <a href="/signin">Signin Now</a>
      </p>
    </div>
  );
}
