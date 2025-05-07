import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LocationPage from "./pages/LocationPage";
import ServicePage from "./pages/ServicePage";
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations/:id" element={<LocationPage />} />
        <Route path="/services/:id" element={<ServicePage />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
