import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function SoilAnalysisForm() {
  // State to store form data and location error
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    cropName: "",
    soilType: "",
    cropAge: "",
  });
  const [locationError, setLocationError] = useState("");

  // State to store the current position (for the map center)
  const [position, setPosition] = useState([51.505, -0.09]); // Default location (London)

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle geolocation and update the map with the current position
  const handleAutoCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Update position state with the new coordinates
          setPosition([latitude, longitude]);

          // Update the form fields with the current latitude and longitude
          setFormData((prevData) => ({
            ...prevData,
            latitude,
            longitude,
          }));

          setLocationError(""); // Reset any previous error messages
        },
        (error) => {
          // Handle geolocation errors
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError(
              "Location access was denied. Please enable location access to use this feature."
            );
          } else {
            setLocationError("Error getting location. Please try again.");
          }
          console.error("Error getting location:", error);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with values:", formData);
  };

  // Custom hook to reset map center when position changes
  function ResetCenter() {
    const map = useMap();
    map.setView(position, map.getZoom()); // Re-center map
    return null;
  }

  // Handle map click event to update the marker and coordinates
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

  return (
    <div className="form-container">
      <h2 className="form-title">Soil Analysis Form</h2>
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

        {/* Button to get current location */}
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

        <button type="submit" className="submit-btn">
          Analyze
        </button>
      </form>

      {/* Display error message if location permissions are denied */}
      {locationError && <p className="error-message">{locationError}</p>}

      {/* Display the map with current location */}
      <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>Your current location</Popup>
        </Marker>

        {/* Custom component to re-center the map */}
        <ResetCenter />
        {/* Custom component to handle map click event */}
        <MapClickHandler />
      </MapContainer>
    </div>
  );
}

export default SoilAnalysisForm;
