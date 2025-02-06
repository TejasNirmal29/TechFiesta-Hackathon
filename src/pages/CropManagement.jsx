import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import SoilAnalysisForm from '../components/SoilAnalysisForm'; // Form to submit data
import Card from '../components/Card'; // Display individual entries as cards

const CropManagement = () => {
  const [cards, setCards] = useState([]); // State to store fetched data for cards
  const [isFormVisible, setIsFormVisible] = useState(false); // To show/hide the form
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Hook for navigation

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken'); // Get token for auth
        const response = await axios.get('http://localhost:5000/api/farmers/analyses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCards(response.data); // Set fetched data to state
      } catch (error) {
        console.error('Error fetching soil analyses:', error);
        setError('Failed to fetch soil analyses. Please try again later.');
      } finally {
        setLoading(false); // Stop loading once the request finishes
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle form submission to add a new soil analysis
  const handleFormSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('userToken'); // Get token for auth
      const response = await axios.post('http://localhost:5000/api/farmers/analyses', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Prepend the new card to the beginning of the list
      setCards((prevCards) => [response.data, ...prevCards]); // Add new card to top

      setIsFormVisible(false); // Close the form after submission
    } catch (error) {
      console.error('Error submitting form data:', error);
      setError('Failed to submit soil analysis. Please try again later.');
    }
  };

  // Toggle form visibility (open/close the form)
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible); // Toggle form visibility
  };

  // Render loading or error states
  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div className="dashboard-container">
      <h1>Soil Analysis Dashboard</h1>

      {/* Backdrop for blur effect, visible when form is open */}
      {isFormVisible && <div className="backdrop show" onClick={toggleFormVisibility}></div>}

      {/* Render submitted cards */}
      <div className="card-container">
        {/* If error occurred, display error message */}
        {error && <div className="error-message">{error}</div>}

        {/* Render submitted analysis cards */}
        {cards.map((data, index) => (
          <div key={index} onClick={() => navigate(`/dashboard/analysis/${index}`, { state: { formData: data } })}>
            <Card formData={data} />
          </div>
        ))}

        {/* Default Add New Entry card */}
        <div className="card add-card card-container" onClick={toggleFormVisibility}>
          <div className="add-symbol">+</div>
          <p>Add New Entry</p>
        </div>
      </div>

      {/* Show Soil Analysis Form when isFormVisible is true */}
      {isFormVisible && (
        <div className="form-modal show">
          <SoilAnalysisForm closeForm={toggleFormVisibility} onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
};

export default CropManagement;
