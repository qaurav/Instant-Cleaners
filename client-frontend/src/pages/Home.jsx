import React, { useEffect, useState, useRef } from "react";
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
import { Helmet } from "react-helmet";

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

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
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = debounce(() => {
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
    }, 100);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, activeId]);

  return (
    <>
      <Helmet>
        <title>Instant Carpet Cleaning Services - Sydney's Trusted Carpet & Upholstery Cleaners</title>
        <meta
          name="description"
          content="Instant Carpet Cleaning Services offers expert carpet and upholstery cleaning across Sydney. Residential, commercial & specialized cleaning with eco-friendly solutions. Book now!"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navbar
        services={services}
        locations={locations}
        setActiveId={setActiveId}
        activeId={activeId}
      />

      <main>
        <section
          id="home"
          ref={(el) => (sectionRefs.current.home = el ? (sectionRefs.current.home = el) : null)}
          style={{
            minHeight: "70vh",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "stretch",
            padding: "40px 20px",
            position: "relative",
            background: "#f0f0f0",
            flexWrap: "nowrap",
          }}
          aria-label="Home section with introduction and booking form"
        >
          <div
            style={{
              flex: "1 1 60%",
              minHeight: "70vh", // Match section height for full banner height
              minWidth: "0",
              backgroundImage: `url(/welcomeimageinstantcleaners.jpg)`,
              backgroundSize: "cover", // Fill container fully
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              padding: 0, // Remove padding for full image coverage
            }}
            role="img"
            aria-label="Carpet and upholstery cleaning Sydney"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                zIndex: 1,
              }}
              aria-hidden="true"
            />
            <div style={{ position: "relative", zIndex: 2, color: "#fff", padding: "10px" }}>
              <h1
                style={{
                  fontSize: isMobile ? "2rem" : "2.5rem", // Smaller font size
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                  marginBottom: "12px",
                  letterSpacing: "1px",
                }}
              >
                CARPET & UPHOLSTERY CLEANING SYDNEY
              </h1>
              <p
                style={{
                  fontSize: isMobile ? "1rem" : "1.2rem",
                  maxWidth: "90vw",
                  lineHeight: "1.5",
                  textShadow: "2px 2px 6px rgba(0, 0, 0, 0.8)",
                  padding: "6px",
                  margin: 0,
                }}
              >
                At <b>Instant Carpet Cleaning Services</b>, we are passionate about delivering{" "}
                <b>exceptional cleaning services</b> that transform spaces into{" "}
                <b>pristine, safe, and healthy spaces</b>. Our expert team operates all over{" "}
                <b>Sydney</b> providing upholstery cleaning solutions for{" "}
                <b>Residential, Commercial, and Specialized facilities</b>. Book now and experience the difference!
              </p>
            </div>
          </div>
          <div
            style={{
              flex: "1 1 50%",
              minHeight: "68vh",
              minWidth: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              overflowY: "auto",
            }}
          >
            <div style={{ ...sectionStyle, height: "100%", display: "flex", alignItems: "center" }}>
              <BookingForm />
            </div>
          </div>
        </section>

        <section id="services" ref={(el) => (sectionRefs.current.services = el)} aria-labelledby="services-heading">
          <Box sx={{ padding: { xs: "40px 10px", sm: "60px 20px" }, maxWidth: { xs: "100%", md: 1400 }, mx: "auto" }}>
            <Typography variant="h3" component="h2" id="services-heading" gutterBottom align="center">
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

        <section id="aboutus" ref={(el) => (sectionRefs.current.aboutus = el)} style={{ backgroundColor: "#f0f4f8" }} aria-label="About us section">
          <AboutUs />
        </section>

        <section id="locations" ref={(el) => (sectionRefs.current.locations = el)} style={{ backgroundColor: "#f0f4f8" }} aria-labelledby="locations-heading">
          <Box sx={{ padding: { xs: "40px 10px", sm: "60px 20px" }, maxWidth: { xs: "100%", md: 1400 }, mx: "auto" }}>
            <Typography variant="h3" component="h2" id="locations-heading" gutterBottom align="center">
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

        <section id="testimonials" ref={(el) => (sectionRefs.current.testimonials = el)} style={{ borderBottom: "2px solid #ccc", paddingBottom: "20px" }} aria-label="Testimonials section">
          <Testimonials />
        </section>

        <section id="contact" ref={(el) => (sectionRefs.current.contact = el ? (sectionRefs.current.contact = el) : null)} style={{ padding: "40px 20px" }} aria-labelledby="contact-heading">
          <Box sx={sectionStyle}>
            <Typography variant="h3" component="h2" id="contact-heading" gutterBottom>
              Contact Us
            </Typography>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424141.6978944982!2d150.93197474999997!3d-33.84824395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2snp!4v1749959002538!5m2!1sen!2snp"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map showing Sydney, Australia"
                />
              </div>
            </div>
          </Box>
        </section>
      </main>
    </>
  );
}

export default Home;
