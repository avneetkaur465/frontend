import React, {useState} from 'react';
 // useState (hook) where u store value and u can change the values inside components.

import {useNavigate} from 'react-router-dom';
//usenavigate hook that lets u move to another page.
import './Login.css';
 // to make our css codes work in this file.
function Login() {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState('');
    const navigate = useNavigate();

    /*setEmail to upadate email value and usestate to store the value.
     for loading useState is false bcz when user clcik on login button it will be  true.
    and then the login button will be disaled to prevent double click or multiple submissions.
setError to update error messages*/
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        // handlelogin fucntion to handle login process, when user submit the form.
        
         

        // Basic validation
        if (!email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            // API call to backend
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                
                console.log('Login successful:', data);
                
                
                
                // Navigate to home page
                navigate('/home');
            } else {
                // Login failed
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Unable to connect to server');
        }
  // catch blocl to catch network or server errors.


        setLoading(false);
        // set loading to false when login process is complete or failed.
    };

    const goToSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>LogIn</h2>
                <form onSubmit={handleLogin}>
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
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={loading}
                    >
                        login
                    </button>

                    <button 
                        type="button" 
                        className="signup-button" 
                        onClick={goToSignup}
                    >
                        SignUp
                    </button>
                </form>     
            </div>
        </div>
    );              
}

export default Login;