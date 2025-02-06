import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import '../styles/Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
    const [currentMoisture, setCurrentMoisture] = useState(50);
    const [currentTemperature, setCurrentTemperature] = useState(25);
    const [currentHumidity, setCurrentHumidity] = useState(60);
    const [weeklyMoistureData, setWeeklyMoistureData] = useState([]);
    const [monthlyHumidityData, setMonthlyHumidityData] = useState([]);
    const [latestData, setLatestData] = useState(null);

    const moistureChartRef = useRef(null);
    const humidityChartRef = useRef(null);

    useEffect(() => {
        fetchCurrentReadings();
        fetchWeeklyMoistureData();
        fetchMonthlyHumidityData();
        fetchLatestData();
    }, []);

    const fetchCurrentReadings = async () => {
        try {
            const moistureResponse = await axios.get('http://localhost:5000/api/sensor-data/soilmoisture/current');
            const temperatureResponse = await axios.get('http://localhost:5000/api/sensor-data/temp/current');
            const humidityResponse = await axios.get('http://localhost:5000/api/sensor-data/humidity/current');

            setCurrentMoisture(moistureResponse.data.soilmoisture);
            setCurrentTemperature(temperatureResponse.data.temperature);
            setCurrentHumidity(humidityResponse.data.humidity);
        } catch (error) {
            console.error("Error fetching current readings:", error);
            // Default values are already set in state initialization
        }
    };

    const fetchWeeklyMoistureData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sensor-data/soilmoisture/day');
            setWeeklyMoistureData(response.data);
            createMoistureChart(response.data);
        } catch (error) {
            console.error("Error fetching weekly moisture data:", error);
            createMoistureChartWithDefaults();
        }
    };

    const fetchMonthlyHumidityData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sensor-data/humidity/month');
            setMonthlyHumidityData(response.data);
            createHumidityChart(response.data);
        } catch (error) {
            console.error("Error fetching monthly humidity data:", error);
            createHumidityChartWithDefaults();
        }
    };

    const fetchLatestData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sensor-data/latest');
            setLatestData(response.data);
        } catch (error) {
            console.error("Error fetching latest data:", error);
        }
    };

    const createMoistureChart = (data) => {
        const ctx = document.getElementById('moistureChart');
        if (moistureChartRef.current) {
            moistureChartRef.current.destroy();
        }
        const config = {
            type: 'line',
            data: {
                labels: data.map((item, index) => `Day ${index + 1}`),
                datasets: [{
                    label: 'Soil Moisture',
                    data: data.map(item => item.soilmoisture),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        moistureChartRef.current = new Chart(ctx, config);
    };

    const createMoistureChartWithDefaults = () => {
        const ctx = document.getElementById('moistureChart');
        if (moistureChartRef.current) {
            moistureChartRef.current.destroy();
        }
        const defaultData = [50, 55, 60, 58, 62, 65, 63]; // Default values for moisture
        const config = {
            type: 'line',
            data: {
                labels: defaultData.map((_, index) => `Day ${index + 1}`),
                datasets: [{
                    label: 'Soil Moisture (Default)',
                    data: defaultData,
                    borderColor: 'rgba(128, 128, 128, 1)', // Grey color for default data
                    backgroundColor: 'rgba(128, 128, 128, 0.2)',
                    fill: true,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        moistureChartRef.current = new Chart(ctx, config);
    };

    const createHumidityChart = (data) => {
        const ctx = document.getElementById('humidityChart');
        if (humidityChartRef.current) {
            humidityChartRef.current.destroy();
        }
        const config = {
            type: 'bar',
            data: {
                labels: data.map((item, index) => `Day ${index + 1}`),
                datasets: [{
                    label: 'Humidity',
                    data: data.map(item => item.humidity),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        humidityChartRef.current = new Chart(ctx, config);
    };

    const createHumidityChartWithDefaults = () => {
        const ctx = document.getElementById('humidityChart');
        if (humidityChartRef.current) {
            humidityChartRef.current.destroy();
        }
        const defaultData = [70, 75, 80, 78, 82, 85, 83]; // Default values for humidity
        const config = {
            type: 'bar',
            data: {
                labels: defaultData.map((_, index) => `Day ${index + 1}`),
                datasets: [{
                    label: 'Humidity (Default)',
                    data: defaultData,
                    backgroundColor: 'rgba(128, 128, 128, 0.2)', // Grey color for default data
                    borderColor: 'rgba(128, 128, 128, 1)',
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        humidityChartRef.current = new Chart(ctx, config);
    };

    return (
        <div className="dashboard-container1">
            <h1>Irrigation Management Dashboard</h1>
            <div className="current-readings">
                <h2>Current Readings</h2>
                <p>Soil Moisture: {currentMoisture}%</p>
                <p>Temperature: {currentTemperature}°C</p>
                <p>Humidity: {currentHumidity}%</p>
            </div>
            <div className="latest-data">
                <h2>Latest Data</h2>
                {latestData && (
                    <div>
                        <p>Latest Soil Moisture: {latestData.soilmoisture}%</p>
                       
                    </div>
                )}
            </div>
            <div className="charts">
                <h2>Weekly Soil Moisture</h2>
                <canvas id="moistureChart" width="400" height="200"></canvas>
            </div>
            <div className="charts">
                <h2>Monthly Humidity</h2>
                <canvas id="humidityChart" width="400" height="200"></canvas>
            </div>
        </div>
    );
};

export default Dashboard;
