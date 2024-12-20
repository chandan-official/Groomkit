import {React, useState} from 'react';
import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';
import { useRef } from 'react';
import "../styles/Main.css";
import Accountdrop from '../components/Accountdrop';


export default function Usernav(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navRef = useRef();

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    
    <header>
      <h3>{props.title}</h3>
      <nav ref={navRef}>
        <a href='/userpage'>Home</a>
        <a href='/#'>Services</a>
        <a href='/#'>About Us</a>
        <a href='/#'>Contact Us</a>
        <button onClick={toggleDropdown} className='profile-btn'><FaUser/></button>
        {showDropdown && <Accountdrop/>} {/* Show the Dropdown conditionally */}
      </nav>
      
    </header>
  );
}

// Define prop types outside the component function
Usernav.propTypes = {
  title: PropTypes.string.isRequired
};
