// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the previous location the user was trying to visit
  const from = location.state?.from?.pathname || '/';  // Default to home if no previous location
  
  const handleLogin = async () => {
    // Example login logic (replace with your actual authentication logic)
    const isAuthenticated = username === 'tejas' && password === '123'; // Replace with your API call
    if (isAuthenticated) {
      // On successful login, store the authentication token (or other authentication state)
      localStorage.setItem('authToken', 'your_token_here');  // Store token in localStorage
      navigate(from, { replace: true }); // Redirect to the previous page or home
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSignIn = () => {
    alert('Sign In button clicked!');
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <div>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={styles.input} 
        />
      </div>
      <div>
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={styles.input} 
        />
      </div>
      <div style={styles.buttonContainer}>
        {/* Login button */}
        <button onClick={handleLogin} style={styles.button}>Login</button>
        
        {/* Sign In button placed next to the Login button */}
        <button onClick={handleSignIn} style={styles.button}>Sign In</button>
      </div>
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
    display: 'flex', // Flexbox to place buttons next to each other
    gap: '10px', // Space between buttons
    justifyContent: 'center', // Center the buttons horizontally
    marginTop: '10px', // Margin between inputs and buttons
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
  }
};

export default LoginPage;
