import React, {useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Basic validation
        if (!name || !email || !password || !phone) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            // API call to backend
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Signup successful
                console.log('Signup successful:', data);
                setSuccess('Account created successfully! Redirecting to login...');
                
                // Clear form
                setName('');
                setEmail('');
                setPhone('');
                setPassword('');
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                // Signup failed
                setError(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError('Unable to connect to server');
        }

        setLoading(false);
    };

    const goToLogin = () => {
        navigate('/');
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone:</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password (min 6 characters)"
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <button 
                        type="submit" 
                        className="signup-button"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                    
                    <div className="login-link" onClick={goToLogin}>
                        Already have an account? Login here
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;