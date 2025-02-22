import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar } from './components/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import Routes and Route components
import Introduction from './pages/Introduction.jsx';
import Footer from './components/Footer.jsx';
import CropManagement from './pages/CropManagement.jsx';
import AnalysisResults from './pages/AnalysisResults.jsx';
import Information from './pages/Information.jsx';
import References from './pages/References.jsx'; 
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage .jsx'
import RegistrationForm from './pages/RegistrationForm';


// Optional: You can create a 404 page
import NotFound from './pages/NotFound.jsx';  // Create a NotFound component for 404
import Dashboard from './components/Dashboard.jsx';

function App() {
  return (
    <BrowserRouter> {/* Wrap everything in BrowserRouter for routing */}
      <Navbar />  {/* Display the Navbar */}
        
      <Routes> 
       <Route path="/" element={<Introduction />} />  
        {/* <Route path="/dashboard" element={<ProtectedRoute> 
              <CardDashboard />
            </ProtectedRoute>} />  */}


            <Route path="/Cropmanagement" element={
              <CropManagement />
            } /> 



        <Route path="/dashboard/analysis/:index" element={<AnalysisResults />} />
        <Route path="/information" element={<Information />} />
        <Route path="/references" element={<References />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationForm />} /> 
       
        <Route path="/dashboard" element={ <Dashboard/>} /> 
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />  {/* 404 Page */}
      </Routes>
        
      <Footer />  {/* Display the Footer */}
    </BrowserRouter>
  );
}

export default App;
