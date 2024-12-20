import React from 'react'
import '../styles/Otpregister.css';

export default function Otpregister() {
  return (
    <div className='otpregister'>
        <h2 className='form-title'>Verify Your Account</h2>
        <p className='separator'><span>Enter the OTP sent to your Mobile Number</span></p>
        <div className='otp-inputs'>
          <input type = "text"  className='otp-input' inputMode='numeric' maxLength = '1' />
          <input type = "text"  className='otp-input' inputMode='numeric' maxLength = '1' />
          <input type = "text"  className='otp-input' inputMode='numeric' maxLength = '1' />
          <input type = "text"  className='otp-input' inputMode='numeric' maxLength = '1' />
          <input type = "text"  className='otp-input' inputMode='numeric' maxLength = '1' />
          <input type = "text"  className='otp-input' inputMode='numeric' maxLength = '1' />
        </div>
        <button className='otp-btn'>Verify</button>
        <p className='resend'><span>Didn't recieved OTP? <a href='/'>Resend</a></span></p>
        <p className='separator-details'><span>Entered wrong details? <a href='/'>Correct it</a></span></p>
    </div>
  )
}
