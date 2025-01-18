import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SoilAnalysisForm from '../components/SoilAnalysisForm';
import Card from '../components/Card';

const CardDashboard = () => {
  const [history, setHistory] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();  // Hook for navigation

  // Handle the form submission
  const handleFormSubmit = (formData) => {
    setHistory((prevHistory) => [...prevHistory, formData]);
    setIsFormVisible(false); // Close the form after submission
  };

  // Toggle the visibility of the form
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleCardClick = (index) => {
    console.log("Navigating with data:", history[index]); // Log the data being passed
    navigate(`/analysis/${index}`, { state: { formData: history[index] } });
  };
  return (
    <div>
      <h1>Soil Analysis Dashboard</h1>

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
        <SoilAnalysisForm onSubmit={handleFormSubmit} closeForm={toggleFormVisibility} />
      )}
    </div>
  );
};

export default CardDashboard;
