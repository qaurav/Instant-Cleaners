import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LocationPage from "./pages/LocationPage";
import ServicePage from "./pages/ServicePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Ensure this import is correct
import TopBar from "./components/TopBar";
import AboutUsPage from "./pages/AboutUsPage";
import { GlobalStyles } from "@mui/material";
import api from "./api";

function App() {
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesRes, locationsRes] = await Promise.all([
          api.get("/services"),
          api.get("/locations"),
        ]);
        // console.log("Fetched services in App.js:", servicesRes.data);
        // console.log("Fetched locations in App.js:", locationsRes.data);
        setServices(servicesRes.data || []);
        setLocations(locationsRes.data || []);
      } catch (error) {
        // console.error("Error fetching data:", error);
        setServices([]);
        setLocations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading services...</div>;
  }

  return (
    <>
      <GlobalStyles styles={{ body: { overflowX: "hidden" } }} />
      <Router>
        <TopBar />
        <Navbar services={services} locations={locations} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations/:slug" element={<LocationPage locations={locations} />} />
          <Route path="/services/:slug" element={<ServicePage services={services} />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
        </Routes>
        <Footer services={services} locations={locations} /> {/* Pass props to Footer */}
      </Router>
    </>
  );
}

export default App;