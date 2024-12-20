import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Landing from './Landing';
import Store from './Store';
import Usernav from './Usernav';

export default function Userpage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    console.log('Token in Userpage:', token); // Debugging log

    // Redirect to login if no token exists
    if (!token) {
      navigate('/signin', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const handleBackButton = () => {
      // Prevent clearing localStorage if user is authenticated
      const token = localStorage.getItem('jwtToken');
      if (token) {
        // Prevent clearing if the token exists
        console.log('Back button pressed, but user is authenticated.');
        return;
      }

      // Clear local storage and redirect to login only if no token exists
      
    };

    // Push a new state to prevent immediate back navigation
    window.history.pushState(null, '', window.location.href);

    // Handle back button navigation
    const onPopState = () => {
      handleBackButton();
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState); // Cleanup on component unmount
    };
  }, [navigate]);

  return (
    <div>
      <Usernav title="GroomKit" />
      <Landing />
      <Store />
    </div>
  );
}
