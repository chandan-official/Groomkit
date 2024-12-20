import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Get the token from localStorage
 
    console.log('Token in RefreshHandler:', token); // Debugging log

    // Check if the user is authenticated
    if (token) {
      setIsAuthenticated(true);

      // Prevent navigating to signin/signup if already logged in
      if (location.pathname === '/signin' || location.pathname === '/signup') {
        navigate('/', { replace: true }); // Redirect to homepage instead of signin/signup
      }
    } else {
      // User is not authenticated
      console.log('No token found, clearing localStorage and redirecting to login.');
      localStorage.clear();
      setIsAuthenticated(false);

      // Redirect to signin if trying to access protected pages (but not /otpregister)
      if (
        location.pathname !== '/signin' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/' &&
        location.pathname !== '/otpregister'
      ) {
        navigate('/signin', { replace: true });
      }
    }

    // /otpregister can be accessed by anyone, regardless of authentication
    if (location.pathname === '/otpregister') {
      // Allow access to OTP register page without any conditions
      return;
    }

  }, [location, navigate, setIsAuthenticated]);

  return null; // This component doesn't render anything
}
