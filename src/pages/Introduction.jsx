import React, { useEffect, useRef, useState } from 'react';
import '../styles/Introduction.css';

const Introduction = () => {



  
  const [activeSlide, setActiveSlide] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const slides = [
    {
      title: "Smart Water Management for Modern Agriculture",
      subtitle: "Empowering farmers with AI-powered irrigation solutions",
      image: "./assets/background4.jpg"
    },
    {
      title: "Data-Driven Farming Solutions",
      subtitle: "Using NASA satellite data for precision agriculture",
      image: "./assets/background2.jpg"
    },
    {
      title: "Serving Farmers",
      subtitle: "Empowering farmers with proven, reliable outcomes",
      image: "./assets/background3.jpg"
    }
  ];

  const stats = [
    { icon: "🌱", number: "7", label: "Farms Optimized" },
    { icon: "👨‍🌾", number: "2+", label: "Farmers" },
    { icon: "💧", number: "20%", label: "Water Saved" },
    { icon: "📱", number: "24/7", label: "Support" }
  ];

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLearnMore = () => {
    setShowHistory(true);
    document.getElementById('farmer-history').scrollIntoView({ behavior: 'smooth' });
  };

  const handleClose = () => {
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const smartFarmingData = [
    {
      icon: "🌐", // IoT Devices Icon
      title: "IOT Devices",
      subtitle: "Switch to AquaYield agri IoT device",
      description: "Say goodbye to traditional farming methods and embrace smart farming with real-time insights and data-driven decisions. Data collected by AquaYield's Agri IOT device is used by indigenously developed machine learning algorithms to forewarn pest & disease occurrence, optimize plant irrigation, and nutrient requirements.",
      buttonText: "Explore",
      image: "./assets/iot-device.jpg",
      alt: "Agri IoT device"
    },
    {
      icon: "📡", // Sensor-Less Technology Icon
      title: "Sensor-less technology",
      subtitle: "The power of AquaYield sensor-less technology",
      description: "Even marginal farmers can now experience a significant improvement in their crop yield and quality. AquaYield hassle-free onboarding process ensures farmers receive plot-specific weather updates, customized irrigation recommendations, and predictions for pest and disease occurrences.",
      buttonText: "Explore",
      image: "./assets/sensor-less.jpg",
      alt: "AquaYield Sensor-Less Technology"
    },
    {
      icon: "🌿", // AquaYield Icon
      title: "AquaYield",
      subtitle: "AquaYield. An all-in-one agriculture solution",
      description: "With AquaYieldAquaYield, businesses, FPOs, and groups of farmers can manage their farm operations at scale. The admin dashboard provides an overall view of the devices and sensors reporting, thereby ensuring that the farms in your care are running smoothly and efficiently.",
      buttonText: "Explore",
      image: "./assets/krishi-pradhan.jpg",
      alt: "AquaYield Dashboard"
    }
  ];

  const farmingHighlights = {
    title: "Transforming Indian agricultural landscape",
    subtitle: "Harnessing millions of farm level data points",
    features: [
      {
        icon: "🌾", // or use your custom icon
        text: "Boost your crop yield with our 150+ agronomy models: multiple crops in varied geographies"
      },
      {
        icon: "📱", // or use your custom icon
        text: "Informed crop decision with IoT device – real-time crop data for accurate advisory"
      },
      {
        icon: "🚀", // or use your custom icon
        text: "Take farm management to the next level with comprehensive multi-platform service"
      },
      {
        icon: "🛰️", // or use your custom icon
        text: "Unlock the power of remote weather data and artificial intelligence"
      }
    ]
  };

  return (
    <div className="homepage-wrapper">
      {/* Hero Slider Section */}
      <section className="hero-slider">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`slide ${index === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <button className="cta-button" onClick={handleLearnMore}>Farmer History</button>
            </div>
          </div>
        ))}
        
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <span className="stat-icon">{stat.icon}</span>
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Updated Farmer History Section */}
      <section 
        id="farmer-history" 
        className={`farmer-history ${showHistory ? 'show' : ''}`}
      >
        <div className="content-section">
          
          <h2>Farmer Journey: Gangaram's Success with AquaYield Optimizer</h2>
          <img src="./assets/gangaram_wheat_field.webp" alt="Gangaram in his wheat field" />
          <p>Meet <b>Gangaram</b>, a hardworking farmer from Maharashtra. He has been cultivating <i>wheat</i> for
            years, but unpredictable rainfall and rising water costs have made farming a challenge.</p>

          <h3>Day 1: Getting Started with AquaYield Optimizer</h3>
          <div className="imgpad">
            <img src="./assets/form.png" alt="Form" />
          </div>
          <p>Gangaram entered his crop details into AquaYield Optimizer:</p>
          <div className="highlight">
            <ul>
              <li><b>Crop:</b> Wheat</li>
              <li><b>Soil Type:</b> Loamy soil</li>
              <li><b>Location:</b> Latitude,Longitude</li>
              <li><b>Growth Phase:</b> Vegetative</li>
            </ul>
          </div>

          <h4>Day 2: Smart Irrigation Advice</h4>
          <p>A few days later, Gangaram received an alert from AquaYield Optimizer. Rain was forecasted in his area in
            the next 48 hours.</p>

          <h4>Week 3: Monitoring Crop Health</h4>
          <div className="imgpad">
            <img src="./assets/ana.png" alt="Rain Forecast Analysis" className="story-image" />
          </div>
          <p>As the weeks passed, Gangaram regularly checked AquaYield Optimizer for updates.</p>

          <h4>The Impact</h4>
          <div className="impact-section">
            <h4>Why AquaYield Optimizer Worked for Gangaram:</h4>
            <ul>
              <li><strong>Real-Time Insights:</strong> Up-to-date soil moisture data and precise weather forecasts</li>
              <li><strong>Water Conservation:</strong> Tailored irrigation recommendations</li>
              <li><strong>Crop Health Monitoring:</strong> Early risk detection and prevention</li>
              <li><strong>Increased Yield:</strong> More effective water and crop management</li>
            </ul>
          </div>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
      </section>

      <section className="smart-farming-section">
        <div className="smart-farming-container">
          <div className="farming-highlights">
            <h2>{farmingHighlights.title}</h2>
            <p className="highlights-subtitle">{farmingHighlights.subtitle}</p>
            <div className="highlights-grid">
              {farmingHighlights.features.map((feature, index) => (
                <div key={index} className="highlight-card">
                  <span className="highlight-icon">{feature.icon}</span>
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="solutions-grid">
            {smartFarmingData.map((solution, index) => (
              <div key={index} className="solution-card">
                <div className="solution-icon">{solution.icon}</div>
                <div className="solution-content">
                  <h3>{solution.title}</h3>
                  <h4>{solution.subtitle}</h4>
                  <p>{solution.description}</p>
                  <button className="explore-button">
                    {solution.buttonText}
                    <span className="right-arrow">→</span>
                  </button>
                </div>
                <div className="solution-image">
                  <img src={solution.image} alt={solution.alt} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Grid */}
      <section className="features-grid">
        <h2>Our Solutions</h2>
        <div className="grid-container">
          <div className="feature-card">
            <img src="./assets/smart-irrigation.jpg" alt="Smart Irrigation" />
            <h3>Smart Irrigation</h3>
            <p>AI-powered water management system for optimal crop yield</p>
          </div>
          <div className="feature-card">
            <img src="./assets/satelite.jpg" alt="Satellite Data" />
            <h3>Satellite Monitoring</h3>
            <p>Real-time field monitoring using NASA satellite data</p>
          </div>
          <div className="feature-card">
            <img src="./assets/forecast.jpg" alt="Weather Forecasting" />
            <h3>Weather Integration</h3>
            <p>Advanced weather forecasting for precise irrigation planning</p>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Introduction;
