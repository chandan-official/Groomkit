import React from 'react';
import '../styles/Dropdown.css';

export default function Dropdown() {
  return (
    <div className='drop-down-list'>
        <ul className='item-list'>
            <li><a href='/signin'>Login</a></li>
            <li><a href='/signup'>Signup</a></li>
            <li><a href='/#/'>Setting</a></li>
        </ul>
    </div>
  )
}
