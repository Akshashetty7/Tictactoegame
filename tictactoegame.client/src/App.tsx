import Navbar from './components/Navbar';
import '../src/css/bootstrap.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Game from '../src/components/Game';
import NotFound from '../src/components/NotFound';
import DashBoard from '../src/components/Dashboard';
import React, { useState, useEffect } from 'react';
import Login from "../src/components/Login";
import Register from "../src/components/Register";

function App() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setUserLoggedIn(true);
        }
    }, []);


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
                            element={<Game/>}
                        />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;