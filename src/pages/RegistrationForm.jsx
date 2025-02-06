import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
  const validatePassword = (password) => password.length >= 6;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error message when the user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.mobile ||
      !formData.email ||
      !formData.password
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateMobile(formData.mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters long.');
      return;
    }
  

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/api/farmers/register', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        setSuccessMessage('Registration successful!');
        setFormData({
          name: '',
          mobile: '',
          email: '',
          password: '',
        });

        // Redirect to login page after successful registration
        navigate('/login'); // Using useNavigate to redirect to the login page
      }
    } catch (err) {
      // Handling specific error messages
      if (err.response?.data?.error) {
        const errorMessage = err.response.data.error;

        // If the error message is related to email or mobile being already registered
        if (errorMessage.includes('Email is already registered')) {
          setError('This email is already registered.');
        } else if (errorMessage.includes('Mobile number is already registered')) {
          setError('This mobile number is already registered.');
        } else {
          setError(errorMessage || 'Registration failed. Please try again.');
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Farmer Registration</h1>
      {error && <div style={styles.error}>{error}</div>}
      {successMessage && <div style={styles.success}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            style={styles.input}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            style={styles.input}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            style={styles.input}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            style={styles.input}
            required
            autoComplete="new-password" // Ensures Google Password Manager prompts for saving
          />
        </div>
        <div style={styles.buttonContainer}>
          <button
            type="submit"
            style={styles.button}
            disabled={isLoading || !formData.name || !formData.email || !formData.password}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
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
  },
  success: {
    color: 'green',
    marginBottom: '10px',
  },
};

export default RegistrationForm;
