import React, { useState } from 'react';
import "../styles/Login.css";

export default function InputField({ type, placeholder, logo, onChange }) {
  const [shownPassword, setShownPassword] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={type === 'password' && shownPassword ? 'text' : type}
        placeholder={placeholder}
        className="input-field"
        onChange={onChange}
        required
      />
      <i className="material-symbols-outlined">{logo}</i>
      {type === 'password' && (
        <i
          onClick={() => setShownPassword((prevState) => !prevState)}
          className="material-symbols-outlined eye-icon" 
          onChange={onChange}
        >
          {shownPassword ? 'visibility' : 'visibility_off'}
        </i>
      )}
    </div>
  );
}
