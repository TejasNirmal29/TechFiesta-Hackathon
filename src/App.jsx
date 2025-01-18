import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import { Navbar } from './components/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import Routes and Route components
import './styles/Navbar.css'
import './styles/Introduction.css'
import Introduction from './pages/Introduction.jsx'
import Footer from './components/Footer.jsx'
import SoilAnalysisForm from './components/SoilAnalysisForm.jsx';
import './styles/SoilAnalysisForm.css';
import './styles/Card.css'
import CardDashboard from './pages/CardDashboard.jsx'
import AnalysisResults from './pages/AnalysisResults.jsx';




function App() {
 

  return (
    <BrowserRouter> {/* Wrap everything in BrowserRouter for routing */}
      <div className="app-container">
        <Navbar />  {/* Display the Navbar */}
        
        <Routes> 
          <Route path="/" element={<Introduction />} />  {/* Home route */}
          <Route path="/dashbord" element={<CardDashboard/>} /> 
          <Route path="/analysis/:index" element={<AnalysisResults />} />

        </Routes>
        
        <Footer />  {/* Display the Footer */}
      </div>
    </BrowserRouter>
  )
}

export default App
