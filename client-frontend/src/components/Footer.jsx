import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const createSlug = (text) => {
  if (typeof text !== "string") {
    text = String(text || "");
  }
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};

const Footer = ({ services = [], locations = [] }) => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        pt: 5,
        pb: 2,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          {/* Company Info Section - SMALLER */}
          <Grid item xs={12} sm={6} md={2.5}>
            <Box sx={{ mb: 1.5 }}>
              <img
                src="/instantcleanerslogo.jpg"
                alt="Instant Carpet Cleaning Services"
                style={{
                  height: 50,
                  cursor: "pointer",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "#b0b0b0",
                lineHeight: 1.6,
                mb: 2,
                fontSize: "0.875rem",
              }}
            >
              Our credibility is built on providing the best service.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                size="small"
                sx={{
                  color: "#ffffff",
                  backgroundColor: "#2596BE",
                  width: 34,
                  height: 34,
                  "&:hover": {
                    backgroundColor: "#FFD700",
                    color: "#1a1a1a",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <FacebookIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                size="small"
                sx={{
                  color: "#ffffff",
                  backgroundColor: "#2596BE",
                  width: 34,
                  height: 34,
                  "&:hover": {
                    backgroundColor: "#FFD700",
                    color: "#1a1a1a",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <InstagramIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Grid>

          {/* Services Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                fontSize: "0.95rem",
                color: "#FFD700",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Our Services
            </Typography>
            <Box
              component="ul"
              sx={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              {services.length === 0 ? (
                <Typography
                  variant="body2"
                  sx={{ color: "#b0b0b0", fontSize: "0.875rem" }}
                >
                  No services available
                </Typography>
              ) : (
                services.slice(0, 6).map((service, index) => {
                  const name =
                    service.name || service.title || "Unnamed Service";
                  const slug = createSlug(name);
                  return (
                    <Box component="li" key={index} sx={{ mb: 0.75 }}>
                      <Link
                        to={`/services/${slug}`}
                        style={{
                          color: "#b0b0b0",
                          textDecoration: "none",
                          fontSize: "0.875rem",
                          transition: "all 0.3s ease",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#FFD700";
                          e.target.style.paddingLeft = "6px";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "#b0b0b0";
                          e.target.style.paddingLeft = "0";
                        }}
                      >
                        <ArrowForwardIcon sx={{ fontSize: 13, opacity: 0.7 }} />
                        {name}
                      </Link>
                    </Box>
                  );
                })
              )}
            </Box>
          </Grid>

          {/* Locations Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                fontSize: "0.95rem",
                color: "#FFD700",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Our Locations
            </Typography>
            <Box
              component="ul"
              sx={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              {locations.length === 0 ? (
                <Typography
                  variant="body2"
                  sx={{ color: "#b0b0b0", fontSize: "0.875rem" }}
                >
                  No locations available
                </Typography>
              ) : (
                locations.slice(0, 6).map((location, index) => {
                  const name =
                    location.name || location.title || "Unnamed Location";
                  const slug = createSlug(name);
                  return (
                    <Box component="li" key={index} sx={{ mb: 0.75 }}>
                      <Link
                        to={`/locations/${slug}`}
                        style={{
                          color: "#b0b0b0",
                          textDecoration: "none",
                          fontSize: "0.875rem",
                          transition: "all 0.3s ease",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#FFD700";
                          e.target.style.paddingLeft = "6px";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "#b0b0b0";
                          e.target.style.paddingLeft = "0";
                        }}
                      >
                        <ArrowForwardIcon sx={{ fontSize: 13, opacity: 0.7 }} />
                        {name}
                      </Link>
                    </Box>
                  );
                })
              )}
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={3.5}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                fontSize: "0.95rem",
                color: "#FFD700",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Contact Us
            </Typography>

            <Box
              sx={{
                mb: 1.2,
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
              }}
            >
              <LocationOnIcon
                sx={{ color: "#2596BE", fontSize: 17, mt: 0.2, flexShrink: 0 }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#b0b0b0", lineHeight: 1.5, fontSize: "0.875rem" }}
              >
                2 Chifley Square, Sydney NSW 2000
              </Typography>
            </Box>

            <Box
              sx={{ mb: 1.2, display: "flex", alignItems: "center", gap: 1 }}
            >
              <EmailIcon
                sx={{ color: "#2596BE", fontSize: 17, flexShrink: 0 }}
              />
              <Typography
                component="a"
                href="mailto:info@instantcarpetcleaningservices.com.au"
                variant="body2"
                sx={{
                  color: "#b0b0b0",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.3s ease",
                  wordBreak: "break-word",
                  "&:hover": { color: "#FFD700" },
                }}
              >
                info@instantcarpetcleaningservices.com.au
              </Typography>
            </Box>

            <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon
                sx={{ color: "#2596BE", fontSize: 17, flexShrink: 0 }}
              />
              <Typography
                component="a"
                href="tel:++61420953979"
                variant="body2"
                sx={{
                  color: "#b0b0b0",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.3s ease",
                  "&:hover": { color: "#FFD700" },
                }}
              >
                +61 420 953 979
              </Typography>
            </Box>

            <Box
              component="button"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              sx={{
                width: "100%",
                padding: "9px 18px",
                backgroundColor: "#FFD700",
                color: "#1a1a1a",
                border: "none",
                borderRadius: 2,
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                transition: "all 0.3s ease",
                boxShadow: "0 3px 10px rgba(255, 215, 0, 0.25)",
                "&:hover": {
                  backgroundColor: "#FFC107",
                  transform: "translateY(-2px)",
                  boxShadow: "0 5px 14px rgba(255, 215, 0, 0.35)",
                },
              }}
            >
              Book Now
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2.5 }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            pt: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#b0b0b0", fontSize: "0.8rem" }}
          >
            © {new Date().getFullYear()} Instant Carpet Cleaning Services. All
            rights reserved.
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              component={Link}
              to="/privacy"
              variant="body2"
              sx={{
                color: "#b0b0b0",
                textDecoration: "none",
                fontSize: "0.8rem",
                transition: "color 0.3s ease",
                "&:hover": { color: "#FFD700" },
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              component={Link}
              to="/terms"
              variant="body2"
              sx={{
                color: "#b0b0b0",
                textDecoration: "none",
                fontSize: "0.8rem",
                transition: "color 0.3s ease",
                "&:hover": { color: "#FFD700" },
              }}
            >
              Terms of Service
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
