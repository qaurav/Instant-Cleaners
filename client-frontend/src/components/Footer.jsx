import React from "react";
import { Link } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const createSlug = (text) => {
  if (typeof text !== "string") {
    text = String(text || "");
  }
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};

const Footer = ({ services = [], locations = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const containerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-around",
    padding: "40px 20px",
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    gap: "20px",
  };

  const sectionStyle = {
    maxWidth: isMobile ? "100%" : "300px",
  };

  const linkStyle = {
    color: "#333",
    textDecoration: "none",
    transition: "color 0.3s",
  };

  const linkHoverStyle = {
    color: "#1e90ff",
  };

  return (
    <footer style={containerStyle}>
      {/* Logo and Description Section */}
      <div style={sectionStyle}>
        <Box sx={{ display: "flex", alignItems: "center", mb: isMobile ? 2 : 0 }}>
          <img
            src="/instantcleanerslogo.jpg"
            alt="Instant Carpet Cleaning Services"
            style={{ height: isMobile ? 40 : 50, cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </Box>
        <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
          Our credibility is made on providing the best in support service, and we only realise
          that our trustworthiness is only as good as the last client we serve.
        </p>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <span style={{ fontSize: "20px", color: "#1e90ff" }}>📘</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <span style={{ fontSize: "20px", color: "#1e90ff" }}>📷</span>
          </a>
        </div>
      </div>

      {/* Services Section */}
      <div style={sectionStyle}>
        <h3 style={{ fontSize: "18px", marginBottom: "15px", textTransform: "uppercase" }}>
          Our Services
        </h3>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "14px", lineHeight: "1.8" }}>
          {services.length === 0 ? (
            <li>No services available</li>
          ) : (
            services.slice(0, 6).map((service, index) => {
              const name = service.name || service.title || "Unnamed Service";
              const slug = createSlug(name);
              return (
                <li key={index}>
                  <Link
                    to={`/services/${slug}`}
                    style={linkStyle}
                    onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
                    onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
                  >
                    {name}
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* Locations Section */}
      <div style={sectionStyle}>
        <h3 style={{ fontSize: "18px", marginBottom: "15px", textTransform: "uppercase" }}>
          Our Locations
        </h3>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "14px", lineHeight: "1.8" }}>
          {locations.length === 0 ? (
            <li>No locations available</li>
          ) : (
            locations.slice(0, 6).map((location, index) => {
              const name = location.name || location.title || "Unnamed Location";
              const slug = createSlug(name);
              return (
                <li key={index}>
                  <Link
                    to={`/locations/${slug}`}
                    style={linkStyle}
                    onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
                    onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
                  >
                    {name}
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* Contact Section */}
      <div style={sectionStyle}>
        <h3 style={{ fontSize: "18px", marginBottom: "15px", textTransform: "uppercase" }}>
          Contact Us
        </h3>
        <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
          2 Chifley Square, Sydney NSW 2000
          <br />
          E:{" "}
          <a
            href="mailto:info@instantcarpetcleaningservices.com.au"
            style={{ color: "#1e90ff", textDecoration: "none" }}
          >

            info@instantcarpetcleaningservices.com.au
          </a>
          <br />
          P:{" "}
          <a href="tel:+61411331731" style={{ color: "#1e90ff", textDecoration: "none" }}>
            +61411331731
          </a>
        </p>
        <button
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#1e90ff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            textTransform: "uppercase",
          }}
          onClick={() => window.alert("Booking functionality coming soon!")}
        >
          Book Now
        </button>
      </div>
    </footer>
  );
};

export default Footer;
