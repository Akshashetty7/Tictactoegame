import Navbar from './components/Navbar';
import '../src/css/bootstrap.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import About from '../src/components/About';
import NotFound from '../src/components/NotFound';
import DashBoard from '../src/components/Dashboard';
import React, { useState, useEffect } from 'react';
import Login from "../src/components/Login";



function App() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        debugger
        const token = localStorage.getItem('authToken');
        if (token) {
            debugger
            setUserLoggedIn(true);
        }
    }, []);


    return (
        <Router>
            <div>
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<DashBoard />} />
                        <Route
                            path="/about"
                            element={<About />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;