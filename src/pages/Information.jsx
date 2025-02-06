import React from 'react';
import '../styles/Introduction.css'

import '../styles/information.css'; // Assuming specific styles for the information page

const Information = () => {
    const infoData = [
        {
            title: "Smap satellite",
            description: "The Soil Moisture Active Passive (SMAP) Satellite is a mission by NASA designed to measure soil moisture levels across the globe. AquaYield utilizes this data to assess the moisture content in the soil at any given time, allowing for accurate irrigation scheduling. By incorporating SMAP data, farmers get real-time insights into soil conditions, helping them make informed decisions about when and how much to irrigate, reducing water wastage and improving crop health.",
            image: "../assets/satelite.jpg",
            alt: "Smap satellite",
            icon: "🛰️"
        },
        {
            title: "Meteomatics API",
            description: "The Meteomatics API provides AquaYield with highly accurate, localized weather forecasts, including precipitation predictions. This 7-day forecast is crucial for helping farmers decide whether irrigation is needed or if upcoming rainfall will suffice. By integrating this data, AquaYield can offer precise irrigation recommendations, optimizing water usage and ensuring that crops are neither over- nor under-irrigated.",
            image: "../assets/forecast.jpg",
            alt: "Weather forecast",
            icon: "🌦️"
        },
        {
            title: "Generative AI for Disease Prediction",
            description: "AquaYield uses Generative AI to predict potential crop diseases based on data like the crop growth phase, soil moisture levels, and weather conditions. This proactive approach helps farmers take early action, improving overall crop health and reducing the risk of large-scale damage. The AI model continuously learns from historical data to enhance accuracy, allowing farmers to implement disease prevention strategies effectively.",
            image: "../assets/ai.jpg",
            alt: "AI for disease prediction",
            icon: "🤖"
        },
        {
            title: "Soil Moisture Prediction Algorithm",
            description: "AquaYield's platform calculates future soil moisture levels using crop-specific data, such as moisture-holding capacity and irrigation requirements, combined with real-time data from NASA SMAP and weather forecasts from Meteomatics. This predictive algorithm helps in optimizing irrigation schedules, ensuring crops receive the right amount of water without wastage.",
            image: "../assets/soil.jpg",
            alt: "Soil moisture prediction",
            icon: "🌱"
        },
        {
            title: "AI-Powered Fertilizer Recommendations",
            description: "The platform provides crop-specific fertilizer recommendations based on real-time data and the crop's growth phase. By leveraging AI, AquaYield Optimizer ensures that farmers apply the right amount of fertilizer at the right time, reducing excess usage and increasing soil fertility. This leads to healthier crops and cost savings for farmers.",
            image: "../assets/app.jpg",
            alt: "AI-powered fertilizer recommendations",
            icon: "🧪"
        }
    ];

    return (
        <main className="main_container">
            {infoData.map((info, index) => (
                <div key={index} className="info_container">
                    <div className="info_slide">
                        {index % 2 === 0 ? (
                            <>
                                <div className="img">
                                    <img src={info.image} alt={info.alt} />
                                </div>
                                <div className="info">
                                    <h1>{info.title} {info.icon}</h1>
                                    <p>{info.description}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="info">
                                    <h1>{info.title} {info.icon}</h1>
                                    <p>{info.description}</p>
                                </div>
                                <div className="img">
                                    <img src={info.image} alt={info.alt} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </main>
    );
};

export default Information;
