import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            localStorage.setItem('authToken', data.token);
            navigate('/games');
        } else {
            const errorData = await response.json();
            setError(errorData.message || 'Login failed');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Login</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        
    },
    formContainer: {
        width: '300px',
        padding: '20px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontSize: '14px',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        marginTop: '15px',
        color: '#d9534f',
    },
};

export default Login;
