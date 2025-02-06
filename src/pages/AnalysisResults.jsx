import React from 'react';
import { useLocation } from 'react-router-dom'; // To get the state passed during navigation
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/AnalysisResults.css'

// Register necessary components of Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const AnalysisResults = () => {
    const location = useLocation();
    const { formData } = location.state || {}; // Ensure we have formData from state
  
  // Log the received formData
  
    if (!formData) {
        return <div>No analysis data found</div>;
    }

    // Destructure data from formData
    const { cropName, cropAge, soilType, latitude, longitude, disease_predictions, additional_info } = formData;

    // Sample chart data (replace with actual data if necessary)
    const moistureData = [65, 59, 80, 81, 56];
    const weatherData = [22, 24, 27, 23, 20];

    const moistureChartData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        datasets: [{
            label: 'Soil Moisture (%)',
            data: moistureData,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointRadius: 0
        }]
    };

    const weatherChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
            label: 'Temperature (°C)',
            data: weatherData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }]
    };

    return (
       <div className='container'>
            <div className="result-card">
                <h2>Analysis Results</h2>

                {/* Display any error message if present */}
                {formData.error_message && <div className="error-message">{formData.error_message}</div>}

                <div className="summary-grid">
                    {/* Display data passed via formData */}
                    <div className="summary-item">
                        <h4>Crop Name</h4>
                        <p>{cropName || 'N/A'}</p>
                    </div>
                    <div className="summary-item">
                        <h4>Crop Age</h4>
                        <p>{cropAge || 'N/A'}</p>
                    </div>
                    <div className="summary-item">
                        <h4>Soil Type</h4>
                        <p>{soilType || 'N/A'}</p>
                    </div>
                    <div className="summary-item">
                        <h4>Latitude</h4>
                        <p>{latitude || 'N/A'}</p>
                    </div>
                    <div className="summary-item">
                        <h4>Longitude</h4>
                        <p>{longitude || 'N/A'}</p>
                    </div>
                </div>

                <div className="result-section">
                    <h3>Soil Moisture Analysis</h3>
                    <ul>
                       
                    </ul>
                </div>

                <div className="result-section">
                    <h3>Potential Diseases and Prevention</h3>
                    {disease_predictions && disease_predictions.length > 0 ? (
                        disease_predictions.map((prediction, index) => (
                            <div key={index} className="disease-prediction">
                                <h4>{prediction.name}</h4>
                                <p><strong>Symptoms:</strong> {prediction.symptoms}</p>
                                <p><strong>Prevention:</strong> {prediction.prevention}</p>
                            </div>
                        ))
                    ) : (
                        <p>No specific disease predictions available for the given parameters.</p>
                    )}
                </div>

                <div className="result-section">
                    <h3>Recommendations</h3>
                    <ul>
                        <li>Adjust irrigation schedule based on soil moisture levels</li>
                        <li>Monitor for early signs of predicted diseases</li>
                        <li>Consider soil amendments to improve nutrient content</li>
                        <li>Implement crop rotation to prevent soil depletion</li>
                    </ul>
                </div>

                <div className="result-section">
                    <h3>Additional Research Insights</h3>
                    <p>{additional_info || 'No additional information available'}</p>
                </div>

                <div className="charts-container">
                    <div className="chart-box">
                        <h3>Soil Moisture Trend</h3>
                        <div className="chart-container">
                            <Line data={moistureChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                    <div className="chart-box">
                        <h3>Weather Forecast</h3>
                        <div className="chart-container">
                            <Bar data={weatherChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="note">
                <p><em>Note: This information is based on AI-generated insights. Always consult with agricultural experts for specific recommendations.</em></p>
            </div>
            </div>
    );
};

export default AnalysisResults;
