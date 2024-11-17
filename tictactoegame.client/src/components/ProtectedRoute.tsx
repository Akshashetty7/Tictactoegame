
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated }) => {
    // If the user is authenticated, return the component; otherwise, redirect to /login
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;