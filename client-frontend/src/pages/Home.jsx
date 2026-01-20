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
import { Box, Typography, Container } from "@mui/material";
import { createSlug } from "../slugify";
import { Helmet } from "react-helmet";
import "./Home.css";

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
      const scrollPosition =
        window.scrollY + offsetAdjustment + window.innerHeight * 0.3;

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
        <title>
          Instant Carpet Cleaning Services - Sydney's Trusted Carpet &
          Upholstery Cleaners
        </title>
        <meta
          name="description"
          content="Instant Carpet Cleaning Services offers expert carpet and upholstery cleaning across Sydney. Residential, commercial & specialized cleaning with eco-friendly solutions. Book now!"
        />
        <meta name="robots" content="index, follow" />
        {/* <link
          rel="canonical"
          href="https://instantcarpetcleaningservices.com.au/"
        /> */}
        {location.pathname === "/" && (
          <link
            rel="canonical"
            href="https://instantcarpetcleaningservices.com.au/"
          />
        )}
        {/* Open Graph */}
        <meta
          property="og:title"
          content="Instant Carpet Cleaning Services - Sydney's Trusted Cleaners"
        />
        <meta
          property="og:description"
          content="Expert carpet and upholstery cleaning across Sydney. Residential, commercial & specialized cleaning with eco-friendly solutions."
        />
        <meta
          property="og:url"
          content="https://instantcarpetcleaningservices.com.au/"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://instantcarpetcleaningservices.com.au/welcomeimageinstantcleaners.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Instant Carpet Cleaning Services - Sydney"
        />
        <meta
          name="twitter:description"
          content="Expert carpet and upholstery cleaning across Sydney."
        />
        <meta
          name="twitter:image"
          content="https://instantcarpetcleaningservices.com.au/welcomeimageinstantcleaners.jpg"
        />
      </Helmet>

      <Navbar
        services={services}
        locations={locations}
        setActiveId={setActiveId}
        activeId={activeId}
      />

      <main className="home-main">
        <section
          id="home"
          ref={(el) => (sectionRefs.current.home = el)}
          className="hero-section"
          aria-label="Home section with introduction and booking form"
        >
          <div className="hero-wrapper">
            <div className="hero-content-side">
              <div className="hero-image-container">
                <img
                  src="/welcomeimageinstantcleaners.jpg"
                  alt="Professional carpet cleaning"
                  className="hero-image"
                />
                <div className="hero-overlay"></div>
              </div>

              <div className="hero-text-wrapper">
                <div className="hero-badge">
                  <span className="badge-star">⭐</span>
                  <span>15+ Years Excellence</span>
                </div>

                <h1 className="hero-title">
                  CARPET & UPHOLSTERY
                  <br />
                  CLEANING <span className="highlight-text">SYDNEY</span>
                </h1>

                <p className="hero-description">
                  At <strong>Instant Carpet Cleaning Services</strong>, we
                  deliver exceptional cleaning that transforms your space into a{" "}
                  <strong>pristine, safe, and healthy environment</strong>. Our
                  expert team serves all of <strong>Sydney</strong> with
                  solutions for{" "}
                  <strong>
                    Residential, Commercial, and Specialized facilities
                  </strong>
                  .
                </p>

                <div className="hero-features">
                  <div className="feature-item">
                    <div className="feature-check">✓</div>
                    <span>Eco-Friendly Products</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-check">✓</div>
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-check">✓</div>
                    <span>Same-Day Available</span>
                  </div>
                </div>

                <div className="hero-buttons">
                  <button
                    className="btn-primary-hero"
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Get Free Quote
                    <span className="btn-arrow">→</span>
                  </button>
                  <a href="tel:+61411331731" className="btn-secondary-hero">
                    <span className="phone-icon">📞</span>
                    Call: (411) 331 731
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-form-side">
              <BookingForm />
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section
          id="services"
          ref={(el) => (sectionRefs.current.services = el)}
          className="services-section"
          aria-labelledby="services-heading"
        >
          <Container maxWidth="lg">
            <div className="section-header">
              <Typography
                variant="h2"
                component="h2"
                id="services-heading"
                className="section-title"
              >
                Our Services
              </Typography>
              <Typography variant="body1" className="section-subtitle">
                Professional cleaning solutions for every need
              </Typography>
            </div>
            <div className="services-grid">
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
            </div>
          </Container>
        </section>
        {/* About Us Section */}
        <section
          id="aboutus"
          ref={(el) => (sectionRefs.current.aboutus = el)}
          className="aboutus-section"
          aria-label="About us section"
        >
          <AboutUs />
        </section>
        {/* Locations Section */}
        <section
          id="locations"
          ref={(el) => (sectionRefs.current.locations = el)}
          className="locations-section"
          aria-labelledby="locations-heading"
        >
          <Container maxWidth="lg">
            <div className="section-header">
              <Typography
                variant="h2"
                component="h2"
                id="locations-heading"
                className="section-title"
              >
                Our Locations
              </Typography>
              <Typography variant="body1" className="section-subtitle">
                Serving all Sydney suburbs with excellence
              </Typography>
            </div>
            <div className="locations-grid">
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
            </div>
          </Container>
        </section>
        {/* Testimonials Section */}
        <section
          id="testimonials"
          ref={(el) => (sectionRefs.current.testimonials = el)}
          className="testimonials-section"
          aria-label="Testimonials section"
        >
          <Testimonials />
        </section>
        {/* Contact Section */}
        <section
          id="contact"
          ref={(el) => (sectionRefs.current.contact = el)}
          className="contact-section"
          aria-labelledby="contact-heading"
        >
          <Container maxWidth="lg">
            <div className="section-header">
              <Typography
                variant="h2"
                component="h2"
                id="contact-heading"
                className="section-title"
              >
                Contact Us
              </Typography>
              <Typography variant="body1" className="section-subtitle">
                Get in touch with our friendly team
              </Typography>
            </div>
            <div className="contact-content-wrapper">
              <div className="contact-form-container">
                <ContactForm />
              </div>
              <div className="contact-map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424141.6978944982!2d150.93197474999997!3d-33.84824395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2snp!4v1749959002538!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map showing Sydney, Australia"
                />
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}

export default Home;
