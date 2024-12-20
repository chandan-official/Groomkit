import React, { useState } from 'react'
import "../styles/Login.css";
import SocialLogin from '../components/SocialLogin';
import InputField from './InputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    
   await axios.post("http://localhost:3002/signin", {email, password,})
    .then((res) => {
      if(res.data.success){
        console.log('Response:', res.data);
        setTimeout(() => {
          navigate('/userpage');
        }, 2000);
      }
      else{
        console.log('Response:', res.data);
      }
    })
  }

  return (
    <div className='login'>
        <h2 className='form-title'>Log in with</h2>
        <SocialLogin/>
        <p className='separator'><span>or</span></p>
        <form onSubmit={handlesubmit} action='POST' className='login-form'>
          <InputField type = "email" placeholder = "Email or Phone" logo = "person" onChange={(e)=> setEmail(e.target.value)} />
          <InputField type = "password" placeholder = "Password" logo = "lock" onChange={(e)=> setPassword(e.target.value)} />
          <a href='//' className='forgot-pass'>Forgot Password?</a>
          <button className='login-btn'>Log In</button>
        </form>
        <p className='signup-text'>Don't have an account? <a href='/signup'>Signup Now</a></p>
    </div>
  )
}
