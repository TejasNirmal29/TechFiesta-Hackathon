import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";  // For navigation

function CustomCard({ formData }) {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Navigate back to the dashboard
  };

  // Add conditional rendering to prevent errors if formData is undefined
  if (!formData) {
    return <p>Loading...</p>; // Show a loading message if formData is not yet available
  }

  return (
    <Card className="mt-4">
      <CardBody>
        <CardTitle tag="h5">Soil Analysis Results</CardTitle>
        <CardText><strong>Crop Name:</strong> {formData.cropName}</CardText>
        <CardText><strong>Soil Type:</strong> {formData.soilType}</CardText>
        <CardText><strong>Latitude:</strong> {formData.latitude}</CardText>
        <CardText><strong>Longitude:</strong> {formData.longitude}</CardText>
        <CardText><strong>Crop Age:</strong> {formData.cropAge} days</CardText>
        <Button color="primary" onClick={handleBackToDashboard}>
          Back to Dashboard
        </Button>
      </CardBody>
    </Card>
  );
}

export default CustomCard;
