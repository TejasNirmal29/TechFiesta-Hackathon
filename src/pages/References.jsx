import React from 'react';
import '../styles/References.css'


const References = () => {
  return (
   <>
      <main className='referencepage'>
        <h1>References</h1>
        <div className="reference-container">
          <div className="reference-card">
            <h2>Crop Data</h2>
            <p>Google Drive Folder: Crop Soil Irrigation Data</p>
            <a href="https://drive.google.com/drive/folders/1BkhYlFRN2aHc_BD9Fr03DLepj3AA6V1l" target="_blank" rel="noopener noreferrer">Access Data</a>
          </div>
          <div className="reference-card">
            <h2>Soil Moisture Study</h2>
            <p>Impact of Soil Moisture on Crop Yields in Major Rainfed Growing Regions of Peninsular India</p>
            <a href="https://www.researchgate.net/publication/353087392_Impact_of_Soil_Moisture_on_Crop_Yields_in_Major_Rainfed_Growing_Regions_of_Peninsular_India" target="_blank" rel="noopener noreferrer">Read Study</a>
          </div>
          <div className="reference-card">
            <h2>Yield Study</h2>
            <p>Impact of Soil Moisture Data Characteristics on the Sensitivity to Crop Yields Under Drought and Excess Moisture Conditions</p>
            <a href="https://www.mdpi.com/2072-4292/11/4/372" target="_blank" rel="noopener noreferrer">View Article</a>
          </div>
        </div>
      </main>
    </>
  );
};

export default References;
