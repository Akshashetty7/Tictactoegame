import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
        } else {
            navigate('/about'); // Redirect to About if authenticated
        }
    }, [isAuthenticated, navigate]);

    return null; // Or loading spinner if needed
};

export default ProtectedRoute;
