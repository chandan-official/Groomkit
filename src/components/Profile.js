import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import Usernav from './Usernav';
import cameraIcon from '../components/2956744.png'; // Ensure this file exists
import { showError, showSuccess } from './Utils';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';

export default function Profile() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch user details from localStorage
    setLoggedInUser(localStorage.getItem('loggedInUser'));
    setEmail(localStorage.getItem('email'));
    setPhone(localStorage.getItem('phone'));

    // Fetch and set profile picture from localStorage
    const savedProfilePic = localStorage.getItem('profilepic');
    if (savedProfilePic) {
      setProfilePic(savedProfilePic);
    }

    // Fetch and set DOB from localStorage
    const savedDob = localStorage.getItem('dob');
    if (savedDob) {
      setDob(savedDob);
    }
  }, []);

  const formattedDob = dob
    ? moment(dob).format('DD-MM-YYYY') // Format the DOB correctly
    : '';

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setProfilePic(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleSave = async () => {
    if (!file) {
      showError('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file); // Append the file to FormData
    formData.append('email', email); // Add the email to FormData

    try {
      const response = await axios.post('http://192.168.139.205:3002/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for file upload
        },
      });

      if (response.status === 200) {
        showSuccess('Profile picture saved successfully!');
        const uploadedProfilePic = response.data.profilepic; // Ensure the field is correctly referenced
        if (uploadedProfilePic) {
          setProfilePic(uploadedProfilePic); // Update the profile pic state with the new URL
          localStorage.setItem('profilepic', uploadedProfilePic); // Save the URL to localStorage
        } else {
          showError('Failed to get profile picture URL');
        }
      }
    } catch (error) {
      // Improved error handling
      if (error.response) {
        showError(error.response.data.message || 'Error uploading profile picture.');
      } else {
        showError('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="profile-set">
      <Usernav title="GroomKit" />
      <div className="profile-page">
        <div className="profile-pic">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="profile-image" />
          ) : (
            <div className="placeholder-pic">No Image Available</div>
          )}
          <label className="camera-icon">
            <img src={cameraIcon} alt="Upload" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
          </label>
        </div>
        <div className="heading">
          <h1>Profile</h1>
        </div>
        <div className="details">
          <p>Name: {loggedInUser}</p>
          <p>Email: {email}</p>
          <p>Phone: +91 {phone}</p>
          <p>Date of Birth: {formattedDob}</p>
        </div>
        <div className="action">
          <button className="reaction" onClick={() => showError('Edit functionality not implemented.')}>
            Edit
          </button>
          <button className="reaction" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
