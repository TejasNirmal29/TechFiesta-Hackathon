// CardDashboard.jsx
import React, { useState } from "react";
import CustomCard from "../components/Card"; // Assuming you have the CustomCard component
import SoilAnalysisForm from "./SoilAnalysisForm"; // Import the form component
import { Container, Row, Col, Button } from "reactstrap";

function CardDashboard() {
  const [submittedDataList, setSubmittedDataList] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false); // Track form visibility

  const handleAddCard = (formData) => {
    setSubmittedDataList((prevData) => [...prevData, formData]);
  };

  const handleOpenForm = () => {
    setFormVisible(true); // Show the form when the button is clicked
  };

  const handleCloseForm = () => {
    setFormVisible(false); // Close the form when canceled or submitted
  };

  return (
    <Container className="mt-5">
      <h2>Soil Analysis Dashboard</h2>

      {/* Button to open the form */}
      <Button color="success" onClick={handleOpenForm}>
        Add New Card
      </Button>

      {/* Display form when isFormVisible is true */}
      {isFormVisible && (
        <SoilAnalysisForm onSubmit={handleAddCard} onClose={handleCloseForm} />
      )}

      <Row className="mt-4">
        {submittedDataList.length === 0 ? (
          <Col>No data submitted yet!</Col>
        ) : (
          submittedDataList.map((data, index) => (
            <Col sm="4" key={index}>
              <CustomCard data={data} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default CardDashboard;
