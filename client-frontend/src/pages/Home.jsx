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
          Affordable Carpet Cleaning Sydney | Best Steam & Upholstery Cleaning
          Services
        </title>

        <meta
          name="description"
          content="Looking for affordable carpet cleaning in Sydney? We provide the best same-day carpet steam cleaning, rug cleaning, upholstery cleaning & commercial carpet cleaning services across Sydney. Licensed, insured & eco-friendly cleaners."
        />

        <meta
          name="keywords"
          content="affordable carpet cleaning Sydney, best carpet cleaners Sydney, cheap carpet cleaning Sydney, same day carpet cleaning, carpet steam cleaning Sydney, rug cleaning Sydney, upholstery cleaning Sydney, commercial carpet cleaning Sydney, professional carpet cleaners Sydney"
        />

        <meta name="robots" content="index, follow" />

        {location.pathname === "/" && (
          <link
            rel="canonical"
            href="https://instantcarpetcleaningservices.com.au/"
          />
        )}

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Affordable & Best Carpet Cleaning Sydney"
        />
        <meta
          property="og:description"
          content="Professional same-day carpet steam cleaning, rug & upholstery cleaning services across Sydney."
        />
        <meta
          property="og:url"
          content="https://instantcarpetcleaningservices.com.au/"
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
        >
          <div className="hero-wrapper">
            <div className="hero-content-side">
              <div className="hero-image-container">
                <img
                  src="/welcomeimageinstantcleaners.jpg"
                  alt="Affordable Carpet Cleaning Sydney - Professional Steam Cleaning"
                  className="hero-image"
                />
                <div className="hero-overlay"></div>
              </div>

              <div className="hero-text-wrapper">
                <h1 className="hero-title">
                  Affordable & Best Carpet Cleaning
                  <br />
                  Services in <span className="highlight-text">Sydney</span>
                </h1>

                <p className="hero-description">
                  We are Sydney’s trusted and professional carpet cleaners
                  providing <strong>affordable carpet cleaning</strong>,
                  <strong> same day steam cleaning</strong>, rug cleaning,
                  upholstery cleaning and commercial carpet cleaning services.
                  Our expert team delivers deep stain removal, odour treatment,
                  and eco-friendly sanitisation for homes and businesses.
                </p>

                <div className="hero-buttons">
                  <button
                    className="btn-primary-hero"
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Get Free Quote →
                  </button>

                  <a href="tel:+61411331731" className="btn-secondary-hero">
                    📞 Call Now
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-form-side">
              <BookingForm />
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="seo-content-section">
          <Container maxWidth="lg">
            <Typography variant="h2" className="section-title">
              Best & Cheap Carpet Cleaning Sydney – Same Day Available
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
              If you are searching for the best carpet cleaning in Sydney at
              affordable prices, our professional cleaners are ready to help. We
              specialise in carpet steam cleaning, rug cleaning, upholstery
              cleaning, end of lease carpet cleaning, and commercial carpet
              cleaning across all Sydney suburbs. Using advanced hot water
              extraction technology, we remove deep dirt, bacteria, allergens,
              and tough stains while keeping your carpets fresh and hygienic.
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
              Our affordable carpet cleaning services are designed for both
              residential and commercial clients who want high-quality results
              without overpaying. We offer same-day carpet cleaning, emergency
              stain removal, pet odour treatment, and eco-friendly sanitisation
              to ensure your home or office stays clean, safe, and healthy.
            </Typography>
          </Container>
        </section>

        {/* Services Section */}
        <section
          id="services"
          ref={(el) => (sectionRefs.current.services = el)}
          className="services-section"
        >
          <Container maxWidth="lg">
            <Typography variant="h2" className="section-title">
              Professional Carpet & Upholstery Cleaning Services
            </Typography>

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

        {/* About Section */}
        <section
          id="aboutus"
          ref={(el) => (sectionRefs.current.aboutus = el)}
          className="aboutus-section"
        >
          <AboutUs />
        </section>

        {/* Locations */}
        <section
          id="locations"
          ref={(el) => (sectionRefs.current.locations = el)}
          className="locations-section"
        >
          <Container maxWidth="lg">
            <Typography variant="h2" className="section-title">
              Carpet Cleaning Services Across Sydney Suburbs
            </Typography>

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

        <section
          id="testimonials"
          ref={(el) => (sectionRefs.current.testimonials = el)}
          className="testimonials-section"
        >
          <Testimonials />
        </section>

        <section
          id="contact"
          ref={(el) => (sectionRefs.current.contact = el)}
          className="contact-section"
        >
          <Container maxWidth="lg">
            <Typography variant="h2" className="section-title">
              Get Affordable Carpet Cleaning Quote Today
            </Typography>

            <div className="contact-content-wrapper">
              <div className="contact-form-container">
                <ContactForm />
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}

export default Home;
