import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-red">
            <a className="navbar-brand" href="#"> Tic-tac-toe</a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/Register">Register</Link>
                </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Login">Login</Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/games">Games</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
