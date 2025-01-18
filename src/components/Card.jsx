// Card.jsx
import React from 'react';

const Card = ({ formData,onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h3>{formData.cropName}</h3>
      <p><strong>Soil Type:</strong> {formData.soilType}</p>
      <p><strong>Latitude:</strong> {formData.latitude}</p>
      <p><strong>Longitude:</strong> {formData.longitude}</p>
      <p><strong>Crop Age:</strong> {formData.cropAge}</p>
    </div>
  );
};

export default Card;
