import React, { useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";
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
  const [activeId, setActiveId] = useState("home");

  const sectionRefs = useRef({
    home: null,
    services: null,
    aboutus: null,
    locations: null,
    testimonials: null,
    contact: null,
  });

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setActiveId(location.state.scrollTo);
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

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const offsetAdjustment = 64 + (window.innerWidth <= 600 ? 180 : 60);
      const scrollPosition = window.scrollY + offsetAdjustment + window.innerHeight * 0.3;

      let newActiveId = activeId;

      Object.entries(sectionRefs.current).forEach(([id, ref]) => {
        if (ref) {
          const sectionTop = ref.offsetTop;
          const sectionBottom = sectionTop + ref.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            newActiveId = id;
          }
        }
      });

      if (newActiveId !== activeId) {
        setActiveId(newActiveId);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, activeId]);

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
      <Navbar services={services} locations={locations} setActiveId={setActiveId} activeId={activeId} />
      <section
        id="home"
        ref={(el) => (sectionRefs.current.home = el)}
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
        <div
          style={{
            flex: "1 1 50%",
            minHeight: "68vh",
            minWidth: "300px",
            backgroundImage: `url(/welcomeimageinstantcleaners.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay for text readability
              zIndex: 1,
            }}
          />
          <div style={{ position: "relative", zIndex: 2 }}>
            <h1 style={{ fontSize: "2.5rem" }}>CARPET & UPHOLSTERY CLEANING SYDNEY</h1>
            <p style={{ fontSize: "1.2rem", maxWidth: "500px" }}>
              At <b>Instant Carpet Cleaning Services</b>, we are passionate about delivering <b>exceptional cleaning services</b> that transform spaces into <b>pristine, safe, and healthy spaces</b>. Our expert team operates all over <b>Sydney</b> providing upholstery cleaning solutions for <b>Residential, Commercial, and Specialized facilities</b>.
              Book now and experience the difference!
            </p>
          </div>
        </div>
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

      <section
        id="services"
        ref={(el) => (sectionRefs.current.services = el)}
        style={{ backgroundColor: "#f0f4f8" }}
      >
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

      <section
        id="aboutus"
        ref={(el) => (sectionRefs.current.aboutus = el)}
        style={{ backgroundColor: "#f0f4f8" }}
      >
        <AboutUs />
      </section>

      <section
        id="locations"
        ref={(el) => (sectionRefs.current.locations = el)}
        style={{ backgroundColor: "#f0f4f8" }}
      >
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

      <section
        id="testimonials"
        ref={(el) => (sectionRefs.current.testimonials = el)}
        style={{
          borderBottom: "2px solid #ccc",
          paddingBottom: "20px",
        }}
      >
        <Testimonials />
      </section>

      <section
        id="contact"
        ref={(el) => (sectionRefs.current.contact = el)}
        style={{ padding: "40px 20px" }}
      >
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: "stretch",
              flexWrap: "wrap",
              gap: "20px",
              width: "100%",
            }}
          >
            <div
              style={{
                flex: "1 1 400px",
                maxWidth: isMobile ? "100%" : "48%",
                padding: "20px",
                overflowY: "auto",
              }}
            >
              <ContactForm />
            </div>
            <div
              style={{
                flex: "1 1 400px",
                maxWidth: isMobile ? "100%" : "48%",
                padding: "20px",
                overflowY: "auto",
              }}
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
      </section>
    </div>
  );
}

export default Home;