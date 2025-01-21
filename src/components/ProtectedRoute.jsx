import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken');  // Check if user is authenticated
  const location = useLocation();

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;  // If authenticated, render the protected content
};

export default ProtectedRoute;
