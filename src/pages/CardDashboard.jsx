import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SoilAnalysisForm from '../components/SoilAnalysisForm';
import Card from '../components/Card';

const CardDashboard = () => {
  const [history, setHistory] = useState([]);  // State to store fetched data
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isBackdropVisible, setIsBackdropVisible] = useState(false); // Backdrop visibility state
  const navigate = useNavigate();  // Hook for navigation

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken'); // Assume token is stored here
        const response = await fetch('/api/soil-analyses', {
          headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching soil analyses:', error);
      }
    };
  
    fetchData();
  }, []);
  // Handle the form submission
  const handleFormSubmit = (formData) => {
    setHistory((prevHistory) => [...prevHistory, formData]);
    setIsFormVisible(false); // Close the form after submission
    setIsBackdropVisible(false); // Hide backdrop when form is closed
  };

  // Toggle the visibility of the form
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setIsBackdropVisible(!isBackdropVisible); // Toggle backdrop visibility
  };

  const handleCardClick = (index) => {
    console.log("Navigating with data:", history[index]);
    navigate(`/dashboard/analysis/:index`, {
      state: { formData: history[index] } // Pass formData to the AnalysisResults component
    });
  };

  return (
    <div>
      <h1>Soil Analysis Dashboard</h1>

      {/* Backdrop for blur effect */}
      {isBackdropVisible && <div className="backdrop" onClick={toggleFormVisibility}></div>}

      {/* Render submitted cards first */}
      <div className="card-container">
        {history.map((data, index) => (
          <div key={index} onClick={() => handleCardClick(index)}>
            <Card formData={data} />
          </div>
        ))}

        {/* Default Add Card should be at the last */}
        <div className="card add-card card-container" onClick={toggleFormVisibility}>
          <div className="add-symbol">+</div>
          <p>Add New Entry</p>
        </div>
      </div>

      {/* Show Soil Analysis Form when isFormVisible is true */}
      {isFormVisible && (
        <div className="form-modal show">
          <SoilAnalysisForm onSubmit={handleFormSubmit} closeForm={toggleFormVisibility} />
        </div>
      )}
    </div>
  );
};

export default CardDashboard;
