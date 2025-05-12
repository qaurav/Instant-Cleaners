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

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
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

  return (
    <div>
      {/* Home Section */}
      <section
        id="home"
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
          background: "#f0f0f0",
        }}
      >
        <div style={sectionStyle}>
          <BookingForm />
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
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

export default Home;
