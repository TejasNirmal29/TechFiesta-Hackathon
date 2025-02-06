import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios"; // Import axios
import '../styles/SoilAnalysisForm.css';

function SoilAnalysisForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    cropName: "",
    soilType: "",
    cropAge: "",
    userId: "", // Adding userId to form data
  });
  const [locationError, setLocationError] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [formVisible, setFormVisible] = useState(true); // State to track form visibility

  const [position, setPosition] = useState([51.505, -0.09]);

  // ResetCenter: Custom hook to reset map center when position changes
  function ResetCenter() {
    const map = useMap();
    map.setView(position, map.getZoom()); // Re-center map
    return null;
  }

  // MapClickHandler: Handles map click event to update marker position
  function MapClickHandler() {
    const map = useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng; // Get latitude and longitude of the click
        setPosition([lat, lng]); // Update position state with new coordinates
        setFormData((prevData) => ({
          ...prevData,
          latitude: lat,
          longitude: lng,
        }));
      },
    });
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateCoordinates = (lat, lng) => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum)) {
      return "Invalid coordinates. Please provide valid latitude and longitude.";
    }

    if (latNum < -90 || latNum > 90) {
      return "Latitude must be between -90 and 90.";
    }

    if (lngNum < -180 || lngNum > 180) {
      return "Longitude must be between -180 and 180.";
    }

    return null;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const validationError = validateCoordinates(formData.latitude, formData.longitude);
  
    if (validationError) {
      setLocationError(validationError);
      return;
    }
  
    const userId = localStorage.getItem("userId"); // Fetch userId from localStorage
    if (!userId) {
      setLocationError("User not found. Please log in.");
      return;
    }
  
    // Adding userId to formData
    const formDataWithUserId = { ...formData, userId };
  
    try {
      const response = await axios.post("http://localhost:5000/api/farmers/create", formDataWithUserId);
  
      if (response.status === 200 || response.data.success) {
        console.log("Data submitted successfully:", response.data);
  
        // Set success state
        setIsFormSubmitted(true);
        setLocationError(""); // Clear error message on success
  
        // Hide the form after successful submission
        setFormVisible(false);
  
        // Reset form data
        setFormData({
          cropName: '',
          soilType: '',
          latitude: '',
          longitude: '',
          cropAge: '',
          userId: '', // Reset the userId as well
        });
      } else {
        // Log full response details to understand why it failed
        console.error("Unexpected response:", response);
        setLocationError("There was an issue with the submission.");
      }
    } catch (error) {
      // Log the full error details for better debugging
      console.error("Error during form submission:", error);
      
      if (error.response) {
        console.error("Error response:", error.response);
        setLocationError(`Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong.'}`);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        setLocationError("Error: No response from server.");
      } else {
        console.error("Error setting up request:", error.message);
        setLocationError(`Error: ${error.message}`);
      }
    }
  };
  

  const handleAutoCoordinates = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;

          // Display a message if accuracy is low
          if (accuracy > 50) {
            setLocationError("Accuracy is low, using available coordinates...");
          } else {
            setLocationError("");
          }

          setPosition([latitude, longitude]);
          setFormData({
            ...formData,
            latitude,
            longitude,
          });

          setLoadingLocation(false);
        },
        (error) => {
          setLocationError("Error getting location. Please try again.");
          setLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Soil Analysis Form</h2>

      {/* Conditionally render form based on formVisible */}
      {formVisible ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="crop_name">Crop Name:</label>
            <select
              id="crop_name"
              name="cropName"
              value={formData.cropName}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Crop Name</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Maize">Maize</option>
              <option value="Soybean">Soybean</option>
              <option value="Cotton">Cotton</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Tomato">Tomato</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="soil_type">Soil Type:</label>
            <select
              id="soil_type"
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Soil Type</option>
              <option value="Loamy">Loamy</option>
              <option value="Clayey">Clayey</option>
              <option value="Sandy Loam">Sandy Loam</option>
              <option value="Silty Loam">Silty Loam</option>
              <option value="Loamy Sand">Loamy Sand</option>
              <option value="Clayey Loam">Clayey Loam</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="latitude">Latitude:</label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="longitude">Longitude:</label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
            />
          </div>

          <button type="button" onClick={handleAutoCoordinates} className="auto-coordinates-btn">
            Get Current Coordinates
          </button>

          <div className="form-group">
            <label htmlFor="crop_age">Crop Age (in days):</label>
            <input
              type="number"
              id="crop_age"
              name="cropAge"
              min="1"
              max="365"
              value={formData.cropAge}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Analyze</button>
        </form>
      ) : (
        <p className="success-message">Form submitted successfully!</p> // Success message after form submission
      )}

      {locationError && <p className="error-message">{locationError}</p>}

      <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>Your current location</Popup>
        </Marker>
        <ResetCenter />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
}

export default SoilAnalysisForm;
