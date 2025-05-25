import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LocationPage from "./pages/LocationPage";
import ServicePage from "./pages/ServicePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import AboutUsPage from "./pages/AboutUsPage";
import { GlobalStyles } from "@mui/material";
import api from "./api";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  // Responsive spacer heights
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const topBarHeight = isMobile ? 180 : 60; // match your TopBar heights
  const navbarHeight = 64; // match your Navbar height
  const spacerHeight = topBarHeight + navbarHeight;

  useEffect(() => {
    // Delay showing the loader by 200ms to avoid flashing
    const loaderTimeout = setTimeout(() => setShowLoader(true), 200);

    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesRes, locationsRes] = await Promise.all([
          api.get("/services"),
          api.get("/locations"),
        ]);
        setServices(servicesRes.data || []);
        setLocations(locationsRes.data || []);
      } catch (error) {
        setServices([]);
        setLocations([]);
      } finally {
        setLoading(false);
        clearTimeout(loaderTimeout);
      }
    };

    fetchData();

    // Cleanup timeout on unmount
    return () => clearTimeout(loaderTimeout);
  }, []);

  // Only show loading message if loading takes longer than 200ms
  if (loading && showLoader) {
    return <div>Loading services...</div>;
  }

  // Render app immediately, even if loading
  return (
    <>
      <GlobalStyles styles={{ body: { overflowX: "hidden" } }} />
      <Router>
        <TopBar />
        <Navbar services={services} locations={locations} loading={loading} />
        
        {/* Spacer div to prevent content being hidden behind fixed bars */}
        <div style={{ height: spacerHeight }} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations/:slug" element={<LocationPage locations={locations} />} />
          <Route path="/services/:slug" element={<ServicePage services={services} />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
        </Routes>
        <Footer services={services} locations={locations} loading={loading} />
      </Router>
    </>
  );
}

export default App;
