import React from 'react'
import '../styles/Dropdown.css'

export default function Account_drop() {
  return (
    <div className='drop-down-list'>
        <ul className='item-list'>
            <li><a href='/#/'>Profile</a></li>
            <li><a href='/signin'>Log Out</a></li>
            <li><a href='/#/'>Setting</a></li>
        </ul>
    </div>
  )
}
