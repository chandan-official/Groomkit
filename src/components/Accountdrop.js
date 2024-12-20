import React from 'react';
import '../styles/Dropdown.css';
import { showSuccess } from '../components/Utils';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Account_drop() {
  const handleLogout = () => {
    // Clear all session-related data
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('dob');
    localStorage.removeItem('profilepic');
    showSuccess('Logged out successfully!');
  };

  return (
    <div className="drop-down-list">
      <ul className="item-list">
        {/* Profile Link */}
        <li>
          <Link to="/profile">
            Profile
          </Link>
        </li>
        {/* Logout Link */}
        <li>
          <Link to="/signin" onClick={handleLogout}>
            Log Out
          </Link>
        </li>
        {/* Settings Link */}
        <li>
          <Link to="/settings">
            Setting
          </Link>
        </li>
      </ul>
      <ToastContainer />
    </div>
  );
}
