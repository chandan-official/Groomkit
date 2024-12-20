import React from 'react'
import "../styles/Login.css";

export default function SocialLogin
() {
  return (
    <div className='social-login'>
          <button className='social-button'>
          <img src='google.svg' alt='google' className='social-icon'></img>
          Google
          </button>
          <button className='social-button'>
          <img src='apple.png' alt='Apple' className='social-icon'></img>
          Apple
          </button>
        </div>
  )
}
