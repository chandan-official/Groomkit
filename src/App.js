import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Otpregister from './components/Otpregister';
import Dropdown from './components/Dropdown';
import Homepage from './components/Homepage';
import Service from './components/Service';
import Store from './components/Store';
import Accountdrop from './components/Accountdrop';
import Userpage from './components/Userpage';
import Profile from './components/Profile';
import RefreshHandler from './components/RefreshHandler';
import Inputpic from './components/Inputpic';
import NotFound from './components/NotFound';

// PrivateRoute Component
const PrivateRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

// PublicRoute Component
const PublicRoute = ({ isAuthenticated, children }) => {
  if (isAuthenticated) {
    return <Navigate to="/userpage" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication state on component mount
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsAuthenticated(!!token);
  }, []);

  // Monitor changes to localStorage to sync authentication state
  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem('jwtToken');
      setIsAuthenticated(!!token);
    };

    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  return (
    <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <div className="container my-3">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<Homepage />}
          />
          <Route
            path="/signup"
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <Login setIsAuthenticated={setIsAuthenticated} />
              </PublicRoute>
            }
          />
          <Route path="/otpregister" element={<Otpregister />} />
          <Route path="/service" element={<Service />} />
          <Route path="/store" element={<Store />} />
          <Route path="/dropdown" element={<Dropdown />} />
          <Route path="/accountdrop" element={<Accountdrop />} />

          {/* Protected Routes */}
          <Route
            path="/userpage"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Userpage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/inputpic"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Inputpic />
              </PrivateRoute>
            }
          />

          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
