import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5091/api/Login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            setSuccess(true);
            localStorage.setItem('authToken', data.token);
            navigate('/games');
        } else {
            /*const errorData = await response.json();*/
            setError('Login failed');
            navigate('/register');
        }
    };

    return (

        <div className="register-container">
            <h2>Login</h2>
            {success ? (
                <p className="success-message">Login successful! Redirecting to Gaming page ...</p>
            ) : (
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                            <input
                             type="email"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="register-button">Login</button>
                </form>
            )}
        </div>
    );
};

export default Login;
