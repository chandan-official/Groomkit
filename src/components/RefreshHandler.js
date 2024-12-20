import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Get token
    const phone = localStorage.getItem('phone'); // Get phone for OTP registration

    console.log('Token in RefreshHandler:', token); // Debugging log

    if (token) {
      // User is authenticated
      setIsAuthenticated(true);

      // Prevent navigating to auth pages if logged in
      if (['/signin', '/signup'].includes(location.pathname)) {
        navigate('/', { replace: true });
      }
    } else {
      // User is not authenticated
      console.log('No token found. Checking for otpregister access.');

      // Allow unauthenticated access to certain pages
      if (!['/signin', '/signup', '/otpregister'].includes(location.pathname)) {
        // If it's not an allowed page, clear storage and redirect
        localStorage.clear();
        setIsAuthenticated(false);
        navigate('/signin', { replace: true });
      }
    }

    // Ensure `/otpregister` works correctly
    if (location.pathname === '/otpregister' && !phone) {
      console.log('Missing phone in localStorage for otpregister. Redirecting to signup.');
      navigate('/signup', { replace: true });
    }
  }, [location, navigate, setIsAuthenticated]);

  return null; // No UI rendering
}
