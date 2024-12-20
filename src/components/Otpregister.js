import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Otpregister.css';
import { ToastContainer } from 'react-toastify';
import { showError, showSuccess } from './Utils';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Otpregister() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [phone, setPhone] = useState(""); // Will be populated from the location state
  const navigate = useNavigate();
  const location = useLocation();

  // Use useEffect to get the phone number passed from SignUp page
  useEffect(() => {
    if (location.state?.phone) {
      setPhone(location.state.phone); // Set phone number received from SignUp
    } else {
      // If no phone is found, redirect to sign up page
      navigate('/signup');
    }
  }, [location.state, navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Allow only numeric values

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join(""); // Combine array into a single OTP string

    if (otpCode.length !== 6) {
      showError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const res = await axios.post('http://192.168.165.205:3002/auth/verify', { phone, otp: otpCode });
      if (res.data.success) {
        showSuccess("OTP verified successfully!");
        // Redirect to user dashboard or next step
        navigate('/userpage');
      } else {
        showError(res.data.message || "Invalid OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      showError(error.response?.data?.message || "Error verifying OTP.");
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post('http://192.168.165.205:3002/auth/send', { phone });
      if (res.data.success) {
        showSuccess("OTP resent successfully!");
      } else {
        showError(res.data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      showError(error.response?.data?.message || "Error resending OTP.");
    }
  };

  return (
    <div className="otpregister">
      <h2 className="form-title">Verify Your Account</h2>
      <p className="separator"><span>Enter the OTP sent to your Mobile Number</span></p>
      <div className="otp-inputs">
        {otp.map((data, index) => (
          <input
            type="text"
            className="otp-input"
            inputMode="numeric"
            maxLength="1"
            key={index}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()} // Auto-select input on focus
          />
        ))}
      </div>
      <button className="otp-btn" onClick={handleVerify}>Verify</button>
      <p className="resend">
        <span>Didn't receive OTP? <button onClick={handleResend} className="resend-btn">Resend</button></span>
      </p>
      <p className="separator-details">
        <span>Entered wrong details? <a href="/">Correct it</a></span>
      </p>
      <ToastContainer />
    </div>
  );
}
