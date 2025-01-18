
import React, { useEffect } from 'react';


const Introduction = () => {
  
  const handleSeeMoreClick = () => {
    const contentSection = document.querySelector('.content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const movingNote = document.querySelector('.moving-note p');
    if (movingNote) {
      movingNote.style.animationDelay = '0s';
    }
  }, []);

  return (
    <div className="container">
      <div className="moving-note">
        <marquee>
          <span style={{ color: "#ff6347" }}>⚠️ Development Notice:</span> This Website Is Under Development.
          Please Use Provided Sample Data for Testing.
          <a href="/sample-data">📊 View Sample Data</a>
        </marquee>
      </div>

      <main className="homepage">
        <div className="content-container">
          <h1>Introducing the Aqua Yield Optimizer</h1>
          <p className="intro-paragraph">Navigating Water Challenges for Farmers</p>
          <p className="intro-paragraph">
            Welcome to the Aqua Yield Optimiser—an innovative platform designed to empower farmers in their battle
            against water-related adversities. Whether it's the capricious whims of weather, lurking pests, or the
            ever-present specter of droughts and floods, we've got your back!
          </p>
        </div>
        <div className="see-more-container">
          <button onClick={handleSeeMoreClick} className="see-more-btn">
            See More
          </button>
        </div>
      </main>

      <div className="content-section">
        <h2>Farmer Journey: Gangaram's Success with AquaYield Optimizer</h2>
        <img src="./assets/gangaram_wheat_field.webp" alt="Gangaram in his wheat field" />
        <p>Meet <b>Gangaram</b>, a hardworking farmer from Maharashtra. He has been cultivating <i>wheat</i> for
          years, but unpredictable rainfall and rising water costs have made farming a challenge. Like many
          farmers, Gangaram often found it difficult to decide when and how much to irrigate his fields. Sometimes
          he would over-water his crops, wasting precious resources, and other times he would under-water them,
          affecting the yield. But things changed when Gangaram discovered <b>AquaYield Optimizer</b>, a tool that
          uses cutting-edge NASA satellite data and weather forecasting to guide him through his farming journey.
        </p>

        <h3>Day 1: Getting Started with AquaYield Optimizer</h3>
        <div className="imgpad">
          <img src="./assets/form.png" alt="Form" />
        </div>
        <p>Gangaram entered his crop details into AquaYield Optimizer:</p>
        <div className="highlight">
          <ul>
            <li><b>Crop:</b> Wheat</li>
            <li><b>Soil Type:</b> Loamy soil</li>
            <li><b>Location:</b>Latitude,Longitude</li>
            <li><b>Growth Phase:</b> Vegetative</li>
          </ul>
        </div>

        <h4>Day 2: Smart Irrigation Advice</h4>
        <p>A few days later, Gangaram received an alert from AquaYield Optimizer. Rain was forecasted in his area in
          the next 48 hours. Instead of irrigating his field as usual, the platform suggested waiting for the
          rain. Gangaram was relieved, knowing that this advice would save him water and money.</p>
        <p>Sure enough, it rained two days later, just as predicted. AquaYield Optimizer reassessed the soil
          moisture after the rain and sent Gangaram a new irrigation plan, reducing water usage without
          compromising the health of his wheat crop.</p>

        <h4>Week 3: Monitoring Crop Health</h4>
        <p>As the weeks passed, Gangaram regularly checked AquaYield Optimizer for updates. One day, he received a
          notification warning him of potential disease risks based on weather patterns and satellite
          observations. The platform suggested preventive measures and recommended steps to protect his wheat from
          fungal infections, which are common in the monsoon season.</p>
        <div className="imgpad">
          <img src="./assets/ana.png" alt="Rain Forecast Analysis" className="story-image" />
        </div>
        <p>Gangaram acted quickly, applying the suggested treatments. His wheat remained healthy, and he didn’t lose
          any crops to disease, something that had happened to him many times before.</p>

        <h4>Harvest Time: A Bountiful Yield</h4>
        <p>Months later, it was time for the wheat harvest. Thanks to AquaYield Optimizer, Gangaram had managed his
          irrigation perfectly—neither wasting water nor leaving his crops thirsty. His wheat crop was healthy,
          and he saw a noticeable increase in his yield compared to previous years.</p>
        <p>Not only had he saved water, but Gangaram also spent less on costly pesticides and fertilizers because
          the platform helped him use the right amount at the right time.</p>

        <h4>The Impact</h4>
        <p>Gangaram couldn't stop talking about AquaYield Optimizer to his fellow farmers. For him, it wasn’t just
          about saving water; it was about <strong>empowerment</strong>—the power to make data-driven decisions
          and take control of his farm’s future. AquaYield Optimizer had transformed the way he farmed, improving
          his yield, reducing his costs, and giving him peace of mind.</p>

        <h4>Why AquaYield Optimizer Worked for Gangaram:</h4>
        <ul>
          <li><strong>Real-Time Insights:</strong> Gangaram received up-to-date soil moisture data and precise
            weather forecasts, allowing him to make informed decisions.</li>
          <li><strong>Water Conservation:</strong> He saved water by following tailored irrigation recommendations
            that considered both current soil conditions and upcoming rainfall.</li>
          <li><strong>Crop Health Monitoring:</strong> AquaYield Optimizer detected potential risks and offered
            preventive solutions before any damage could occur.</li>
          <li><strong>Increased Yield:</strong> By managing water and crop health more effectively, Gangaram was
            able to produce a more abundant harvest.</li>
        </ul>

        <p>Gangaram’s success story is just one example of how AquaYield Optimizer is revolutionizing agriculture by
          helping farmers make smarter, data-driven decisions. Just like Gangaram, farmers all over the world can
          use this platform to improve their yields, conserve water, and protect their crops—ensuring a brighter
          future for agriculture.</p>
      </div>

      <div className="content-section">
        <h2>How It Works</h2>
        <img src="./assets/Flowchart.png" alt="Flow Diagram" />
        <div className="steps">
          <ul>
            <li>Data collection from NASA SMAP satellite and Meteomatics NASA API</li>
            <li>Processing to calculate soil moisture, irrigation needs, and weather impacts</li>
            <li>Tailored irrigation recommendations based on real-time conditions</li>
            <li>Crop health monitoring using AI and disease prediction</li>
            <li>Empowering farmers with decision power</li>
          </ul>
        </div>
      </div>

      <div className="article">
        <section className="technologies">
          <h3>Technologies Used</h3>
          <ul>
            <li>NASA SMAP Satellite Data for soil moisture analysis.</li>
            <li>Meteomatics NASA API for weather forecasting and precipitation data.</li>
            <li>Machine Learning and AI algorithms for disease detection and crop health monitoring.</li>
            <li>Python for data processing, integration, and calculations.</li>
            <li>Web Technologies for creating a user-friendly interface.</li>
          </ul>
        </section>

        <section className="how-it-was-built">
          <h3>How It Was Built</h3>
          <ul>
            <li><strong>Data Gathering:</strong> Data was gathered from NASA SMAP and Meteomatics NASA API.</li>
            <li><strong>Backend Processing:</strong> Using Python, algorithms were developed to process the soil
              moisture, precipitation, and farmer-provided data.</li>
            <li><strong>AI Integration:</strong> AI models were integrated for predictive disease monitoring.</li>
            <li><strong>Frontend Development:</strong> A simple, intuitive interface was built using web
              technologies to make the tool accessible for farmers.</li>
          </ul>
        </section>
        <div className="container">


          <section className="calculations">
            <h3>How the Calculations Are Done</h3>
            <p>Here’s how AquaYield Optimizer calculates the necessary moisture and irrigation based on NASA SMAP
              and weather data:</p>

            <h4>1. Soil Moisture Calculation</h4>
            <p>The platform uses real-time soil moisture data from NASA's SMAP satellite, which reflects the current
              water content in the soil. The system assumes an infiltration rate of 50% to account for
              precipitation. The formula used is:</p>
            <div className="formula">
              <code>Updated Soil Moisture = Current Soil Moisture + (Precipitation × 0.50)</code>
            </div>
            <p>The platform checks if the soil moisture exceeds or falls below the threshold for optimal crop growth
              and adjusts irrigation recommendations accordingly.</p>

            <h4>2. Irrigation Need Calculation</h4>
            <p>To determine how much irrigation is required to maintain optimal soil moisture, AquaYield Optimizer
              uses the following formula:</p>
            <div className="formula">
              <code>Irrigation Required = Optimal Moisture Level - Current Soil Moisture - Expected Precipitation</code>
            </div>
            <p>If the expected precipitation is sufficient to meet the crop’s moisture requirements, irrigation is
              not recommended, and the system advises waiting for rainfall.</p>

            <h4>3. Precipitation Impact</h4>
            <p>The platform factors in forecasted rainfall over the next 2-3 days to adjust irrigation
              recommendations. If rain is expected, it reduces the irrigation amount accordingly to conserve
              water.</p>
          </section>
        </div>

        <section className="advantages">
          <h3>Advantages</h3>
          <ul>
            <li><strong>Efficient Water Use:</strong> Prevents over-irrigation and water waste, helping farmers save
              water and cut costs.</li>
            <li><strong>Sustainable Farming Practices:</strong> Promotes sustainable farming by optimizing water
              resources and reducing the risk of crop failure due to drought or poor water management.</li>
            <li><strong>Real-Time Insights:</strong> Provides farmers with timely, data-driven insights to make
              informed decisions.</li>
            <li><strong>Scalable Solution:</strong> The platform can be applied to farms of any size and various
              crops, making it adaptable to different agricultural needs.</li>
          </ul>
        </section>

        <section className="use-cases">
          <h3>Use Cases</h3>
          <ul>
            <li><strong>Farmers:</strong> The primary users, who will benefit from optimized water management,
              increased yield, and improved crop health.</li>
            <li><strong>Agronomists:</strong> Can use the platform to advise farmers based on the data-driven
              insights provided.</li>
            <li><strong>Water Management Authorities:</strong> Can use the platform to manage water distribution
              more effectively at regional levels.</li>
            <li><strong>Climate Researchers:</strong> The collected data can also be used to monitor and study the
              effects of climate change on agriculture.</li>
          </ul>
        </section>

        <section className="future-aspects">
          <h3>Future Aspects</h3>
          <ul>
            <li><strong>Expanded Data Sources:</strong> In the future, we aim to integrate additional satellite and
              weather data sources to improve the accuracy and granularity of our predictions.</li>
            <li><strong>Advanced AI Algorithms:</strong> Further development of AI-driven crop health monitoring and
              disease detection to provide more accurate and predictive insights.</li>
            <li><strong>Global Reach:</strong> The platform can be expanded to work globally, providing valuable
              data to farmers in different regions.</li>
            <li><strong>Automated Irrigation Systems:</strong> Integration with automated irrigation systems for
              fully autonomous water management based on our platform’s recommendations.</li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default Introduction;
