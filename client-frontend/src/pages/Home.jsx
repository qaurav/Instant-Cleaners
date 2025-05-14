import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import BookingForm from "../components/BookingForm";
import ContactForm from "../components/ContactForm";
import LocationCard from "../components/LocationCard";
import ServiceCard from "../components/ServiceCard";
import AboutUs from "../components/AboutUs";
import Testimonials from "../components/Testimonials";

const sectionStyle = {
  maxWidth: 1200,
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
      const section = document.getElementId(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
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
      console.log("Window width:", window.innerWidth, "isMobile:", window.innerWidth <= 600);
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      {/* Locations Section */}
      <section id="locations" style={{ padding: "40px 20px" }}>
        <div style={sectionStyle}>
          <h2>Our Locations</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {locations.map((loc) => (
              <LocationCard
                key={loc._id}
                location={loc}
                onClick={(id) => navigate(`/locations/${id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="aboutus">
        <AboutUs />
      </section>

      {/* Services Section */}
      <section
        id="services"
        style={{ padding: "40px 20px", background: "#f9f9f9" }}
      >
        <div style={sectionStyle}>
          <h2>Our Services</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {services.map((svc) => (
              <ServiceCard
                key={svc._id}
                service={svc}
                onClick={(id) => navigate(`/services/${id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: "40px 20px" }}>
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row", // Changed "column-reverse" to "column" for mobile
              justifyContent: "space-between",
              alignItems: "stretch",
              flexWrap: "nowrap",
              gap: "20px",
            }}
          >
            {/* Left Side: Contact Form */}
            <div
              style={{
                flex: "1 1 50%",
                minWidth: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                padding: "20px",
                overflowY: "auto",
              }}
            >
              <ContactForm />
            </div>

            {/* Right Side: Sydney Map View (Google Maps Embed) */}
            <div
              style={{
                flex: "1 1 50%",
                minWidth: "300px",
                padding: "20px",
                position: "relative",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.993683414541!2d151.2069903152093!3d-33.86881998065764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae401e8b983f%3A0x5017d681632c800!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sus!4v1631234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sydney Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;