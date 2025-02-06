import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';  // Import axios for API calls

const LoginPage = () => {
  const [emailOrMobile, setEmailOrMobile] = useState(''); // Can accept email or mobile
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const location = useLocation();

  // Get the previous location the user was trying to visit
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async () => {
    setError('');
    setLoading(true);
  
    if (!emailOrMobile || !password) {
      setError('Please enter both email/mobile and password');
      setLoading(false);
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(emailOrMobile.trim());
    const isMobile = !isEmail && emailOrMobile.length >= 10 && !isNaN(emailOrMobile.trim());
  
    if (!isEmail && !isMobile) {
      setError('Please enter a valid email or mobile number');
      setLoading(false);
      return;
    }
  
    const loginData = {
      email: isEmail ? emailOrMobile : null,
      mobile: isMobile ? emailOrMobile : null,
      password,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/farmers/login', loginData);
  
      if (response.data.token) {
        // Store the token and user ID in localStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.userId);  // Store userId
        
  
        // Navigate the user to the previous page or home
        navigate(from, { replace: true });
      } else if (response.data.message === "Farmer not found") {
        setError('This email/mobile does not exist. Please check your credentials.');
      } else if (response.data.message === "Invalid credentials") {
        setError('The password you entered is incorrect. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  
  

  // Navigate to the sign-up page
  const handleSignIn = () => {
    navigate('/registration');
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>

      {/* Show error message if there's any */}
      {error && <div style={styles.error}>{error}</div>}

      <div>
        <input 
          type="text" // Allow input for both email and mobile
          placeholder="Email or Mobile"
          value={emailOrMobile}
          onChange={(e) => setEmailOrMobile(e.target.value)}
          style={styles.input}
          required
        />
      </div>
      <div>
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
      </div>
      
      {/* Show loading indicator when login is in progress */}
      {loading ? (
        <div style={styles.loading}>Logging in...</div>
      ) : (
        <div style={styles.buttonContainer}>
          <button onClick={handleLogin} style={styles.button}>
            {loading ? "Logging In..." : "Login"}
          </button>
          <button onClick={handleSignIn} style={styles.button}>Sign In</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4CAF50',
    color: 'white',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    fontSize: '14px',
  },
  loading: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#4CAF50',
  },
};

export default LoginPage;
