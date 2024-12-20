import React, { useState } from 'react';
import "../styles/SignUp.css";
import Signupsocialsign from './Signupsocialsign';
import Signupinput from './Signupinput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { showError, showSuccess } from './Utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setDob(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !phone || !dob || !password || !confirmPassword) {
      showError('Please fill in all fields.');
      return;
    }
  
    if (password !== confirmPassword) {
      showError('Passwords do not match.');
      return;
    }
  
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      showError('Invalid email address.');
      return;
    }
  
    if (!/^\d{10}$/.test(phone)) {
      showError('Phone number must be 10 digits.');
      return;
    }
  
    try {
      const formattedDob = moment(dob).format('YYYY-MM-DD');
      const signupResponse = await axios.post('http://192.168.179.205:3002/auth/signup', {
        name,
        email,
        phone,
        password,
        dob: formattedDob,
      });
  
      if (!signupResponse.data.success) {
        throw new Error(signupResponse.data.message || 'Signup failed.');
      }
  
      // Combine OTP sending in one step for better UX
      const otpResponse = await axios.post('http://192.168.179.205:3002/auth/send', { phone },{ headers: { 'Content-Type': 'application/json' } });
      if (!otpResponse.data.success) {
        throw new Error(otpResponse.data.message || 'Failed to send OTP.');
      }
  
      showSuccess('Account created successfully! OTP sent to your phone.');
      localStorage.setItem('phone', phone);
      localStorage.setItem('email', email);
  
      navigate('/otpregister', { state: { phone } });
    } catch (error) {
      console.error('Signup Error:', error.message);
      showError(error.message || 'Server error.');
    }
  };
  

  return (
    <div className="Signup-form">
      <h2 className="form-title">Create Account</h2>
      <div className="social-login">
        <Signupsocialsign />
      </div>
      <p className="separator">
        <span>or</span>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <Signupinput
            type="text"
            name="name"
            placeholder="Full Name"
            logo="person"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="input-wrapper">
          <Signupinput
            type="email"
            name="email"
            placeholder="Email Address"
            logo="mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="input-wrapper">
          <Signupinput
            type="tel"
            name="phone"
            placeholder="Phone Number"
            logo="call"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div className="date-picker">
          <label htmlFor="dob" className="date-picker-label">Date of Birth</label>
          <DatePicker
            id="dob"
            selected={dob}
            onChange={handleDateChange}
            placeholderText="Date of Birth"
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            className="date-input"
          />
        </div>
        <div className="input-wrapper">
          <Signupinput
            type="password"
            name="password"
            placeholder="Password"
            logo="lock"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="input-wrapper">
          <Signupinput
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            logo="lock"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <ToastContainer />
      <p className="signin-text">
        Already have an account? <a href="/signin">Signin Now</a>
      </p>
    </div>
  );
}
