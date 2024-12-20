import React, { useState } from 'react';
import "../styles/SignUp.css";

export default function Signupinput({ type, placeholder, logo, onChange }) {
  const [shownPassword, setShownPassword] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={type === 'password' && shownPassword ? 'text' : type} // Toggle password visibility
        placeholder={placeholder}
        className="input-field"
        onChange={onChange} // Pass onChange to the actual input field
        required // The required field for form validation
      />
      <i className="material-symbols-outlined">{logo}</i>

      {type === 'password' && (
        <i
          onClick={() => setShownPassword(prevState => !prevState)} // Toggle password visibility
          className="material-symbols-outlined eye-icon"
        >
          {shownPassword ? 'visibility' : 'visibility_off'}
        </i>
      )}
    </div>
  );
}
