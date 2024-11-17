import Navbar from './components/Navbar';
import '../src/css/bootstrap.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Game from '../src/components/Game';
import NotFound from '../src/components/NotFound';
import DashBoard from '../src/components/Dashboard';
import React, { useState, useEffect } from 'react';
import Login from "../src/components/Login";
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState<boolean>(true); // Loading state for authentication check


    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
        }
        setLoading(false); // After checking authentication, set loading to false
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Or show a spinner while checking auth status
    }
    return (
        <Router>
            <div>
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<DashBoard />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/games"
                            element={
                                <ProtectedRoute
                                    element={<Game />}
                                    isAuthenticated={userLoggedIn ?? false}
                                />
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;