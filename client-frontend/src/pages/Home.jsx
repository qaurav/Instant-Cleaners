import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import BookingForm from "../components/BookingForm";
import ContactForm from "../components/ContactForm";
import LocationCard from "../components/LocationCard";
import ServiceCard from "../components/ServiceCard";
import AboutUs from "../components/AboutUs";
import Testimonials from "../components/Testimonials";
import { Box, Typography } from "@mui/material";
import { createSlug } from "../slugify";

const sectionStyle = {
  maxWidth: 1200,
  width: "100%",
  margin: "0 auto",
};

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (!isInView) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    api.get("/locations").then((res) => setLocations(res.data));
    api.get("/services").then((res) => setServices(res.data));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create slug maps for services and locations
  const serviceSlugMap = useMemo(() => {
    const map = {};
    services.forEach((svc) => {
      map[createSlug(svc.name)] = svc._id;
    });
    return map;
  }, [services]);

  const locationSlugMap = useMemo(() => {
    const map = {};
    locations.forEach((loc) => {
      map[createSlug(loc.name)] = loc._id;
    });
    return map;
  }, [locations]);

  return (
    <div>
      {/* Home Section */}
      <section
        id="home"
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: isMobile ? "column-reverse" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "stretch" : "flex-start",
          padding: "40px 20px",
          position: "relative",
          background: "#f0f0f0",
          flexWrap: "wrap",
        }}
      >
        {/* Left Side: Background with Text */}
        <div
          style={{
            flex: "1 1 50%",
            minHeight: "68vh",
            minWidth: "300px",
            backgroundColor: "#757575",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
            padding: "20px",
            position: "relative",
          }}
        >
          <h1 style={{ fontSize: "2.5rem" }}>
            Welcome to Instant Cleaners
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "500px" }}>
            We provide top-notch cleaning services to keep your space spotless.
            Book now and experience the difference!
          </p>
        </div>

        {/* Right Side: Booking Form */}
        <div
          style={{
            flex: "1 1 40%",
            minWidth: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <div style={sectionStyle}>
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ backgroundColor: "#f0f4f8" }}>
        <Box sx={{ padding: { xs: "40px 10px", sm: "60px 20px" }, maxWidth: { xs: "100%", md: 1400 }, mx: "auto" }}>
          <Typography variant="h3" component="h2" gutterBottom align="center">
            Our Services
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {services.map((svc) => {
              const slug = createSlug(svc.name);
              return (
                <ServiceCard
                  key={svc._id}
                  service={svc}
                  onClick={() => navigate(`/services/${slug}`)}
                />
              );
            })}
          </Box>
        </Box>
      </section>

      {/* About Us Section */}
      <section id="aboutus" style={{ backgroundColor: "#f0f4f8" }}>
        <AboutUs />
      </section>

      {/* Locations Section */}
      <section id="locations" style={{ backgroundColor: "#f0f4f8" }}>
        <Box sx={{ padding: { xs: "40px 10px", sm: "60px 20px" }, maxWidth: { xs: "100%", md: 1400 }, mx: "auto" }}>
          <Typography variant="h3" component="h2" gutterBottom align="center">
            Our Locations
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {locations.map((loc) => {
              const slug = createSlug(loc.name);
              return (
                <LocationCard
                  key={loc._id}
                  location={loc}
                  onClick={() => navigate(`/locations/${slug}`)}
                />
              );
            })}
          </Box>
        </Box>
      </section>
      {/* Testimonials Section */}
      <section
        id="testimonials"
        style={{
          borderBottom: "2px solid #ccc",  // Add a subtle bottom border
          paddingBottom: "20px",           // Optional: add some padding below
        }}
      >
        <Testimonials />
      </section>


      {/* Contact Section */}
      <section id="contact" style={{ padding: "40px 20px" }}>
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: "stretch",
              flexWrap: "wrap",          // allow wrapping on small screens
              gap: "20px",
              width: "100%",
            }}
          >
            {/* Left Side: Contact Form */}
            <div
              style={{
                flex: "1 1 400px",       // flex-grow:1, flex-shrink:1, flex-basis:400px
                maxWidth: isMobile ? "100%" : "48%",  // full width on mobile, half on desktop
                padding: "20px",
                overflowY: "auto",
              }}
            >
              <ContactForm />
            </div>

            {/* Right Side: Map */}
            <div
              style={{
                flex: "1 1 400px",
                maxWidth: isMobile ? "100%" : "48%",
                padding: "20px",
                overflowy: "auto",
              }
                // flex: "1 1 400px",
                // maxWidth: isMobile ? "100%" : "48%",
                // padding: "20px",
                // height: isMobile ? "300px" : "400px", // fixed height for map container
                // boxSizing: "border-box",
              }
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424141.6978944982!2d150.93197474999997!3d-33.84824395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2snp!4v1747214629578!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sydney Map"
              />
            </div>
          </div>
        </div>
      </section >
    </div >
  );
}

export default Home;
