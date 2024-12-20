import React, { useState } from 'react';
import "../styles/Login.css";
import SocialLogin from '../components/SocialLogin';
import InputField from './InputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { showError, showSuccess } from './Utils';

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!email.trim() || !password.trim()) {
      showError('Please fill in all fields.');
      return;
    }

    try {
      // Send a POST request to the login endpoint
      const response = await axios.post(
        "http://192.168.165.205:3002/auth/signin",
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Login response:', response.data);

      if (response.data.success) {
        const { name, jwtToken, phone, dob, profilepic } = response.data.data || response.data;

        // Fix profile picture URL if necessary
        let profilePicUrl = profilepic;

        // Save data to localStorage
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);
        localStorage.setItem('dob', dob);
        localStorage.setItem('profilepic', profilePicUrl);

        console.log('Saved user data:', { name, phone, dob, profilePicUrl });

        // Update authentication state
        setIsAuthenticated(true);

        showSuccess('Login successful!');

        // Navigate to user page
        navigate('/userpage');
      } else {
        showError(response.data.message || 'Invalid credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      showError(
        error.response?.data?.message || 'An error occurred while logging in. Please try again.'
      );
    }
  };

  return (
    <div className="login">
      <h2 className="form-title">Log in with</h2>
      <SocialLogin />
      <p className="separator"><span>or</span></p>
      <form onSubmit={handleSubmit} className="login-form">
        <InputField
          type="email"
          placeholder="Email or Phone"
          logo="person"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <InputField
          type="password"
          placeholder="Password"
          logo="lock"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <a href="/#" className="forgot-pass">Forgot Password?</a>
        <button type="submit" className="login-btn">Log In</button>
      </form>
      <ToastContainer />
      <p className="signup-text">
        Don't have an account? <a href="/signup">Signup Now</a>
      </p>
    </div>
  );
}
