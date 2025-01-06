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
import moment from 'moment'; // Import moment

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

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showError('Invalid email address.');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      showError('Phone number must be 10 digits.');
      return;
    }

    try {
      // Use moment to format DOB into 'YYYY-MM-DD' format before sending it to the backend
      const formattedDob = moment(dob).format('YYYY-MM-DD'); // Format to 'YYYY-MM-DD'

      const res = await axios.post('http://192.168.139.205:3002/auth/signup', {
        name,
        email,
        phone,
        password,
        dob: formattedDob,
      });

      if (res.data.success) {
        showSuccess('Account created successfully!');
        localStorage.setItem('phone', phone); // Save phone number to localStorage
        localStorage.setItem('email', email); // Optional: save email if needed

        setTimeout(() => {
          // Redirect to OTP registration page
          navigate('/otpregister', { state: { phone } });
        }, 2000);
        
      } else {
        showError(res.data.message || 'Signup failed.');
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Server error.');
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
