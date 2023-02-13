import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const authToken = sessionStorage.getItem('auth_token') || null;

  if (!authToken) {
    // not logged in so redirect to login page with the return url\
    return <Navigate to="/login" />;
  }
  // authorized so return child components
  return children;
};

export default PrivateRoute;
