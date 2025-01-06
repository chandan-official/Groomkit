import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Get the token from localStorage

    console.log('Token in RefreshHandler:', token); // Debugging log

    if (token) {
      setIsAuthenticated(true);

      // Prevent navigating to signin/signup if already logged in
      if (location.pathname === '/signin' || location.pathname === '/signup') {
        navigate('/', { replace: true }); // Redirect to homepage
      }
    } else {
      // Avoid clearing the token immediately
      console.log('No token found. Redirecting to login only for protected pages.');

      setIsAuthenticated(false);

      // Redirect to signin only for protected routes
      if (
        location.pathname !== '/signin' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/otpregister'
      ) {
        navigate('/signin', { replace: true });
      }
    }

    // Ensure /otpregister is accessible to everyone
    if (location.pathname === '/otpregister') {
      return;
    }
  }, [location, navigate, setIsAuthenticated]);

  return null; // This component doesn't render anything
}
