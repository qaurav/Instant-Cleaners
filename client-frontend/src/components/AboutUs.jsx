import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BACKGROUND_IMG =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "80vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: `linear-gradient(rgba(0,77,64,0.7), rgba(0,77,64,0.7)), url(${BACKGROUND_IMG}) center/cover no-repeat`,
        py: { xs: 8, md: 0 },
        px: { xs: 2, md: 6 },
      }}
    >
      {/* Decorative Overlay Circles */}
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          top: 50,
          left: -120,
          zIndex: 1,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          bottom: 40,
          right: -100,
          zIndex: 1,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: 750,
          width: "100%",
          textAlign: "center",
          color: "#fff",
          p: { xs: 3, md: 6 },
          borderRadius: 4,
          boxShadow: 6,
          background: "rgba(0,0,0,0.30)",
          animation: "fadeInUp 1.2s cubic-bezier(.39,.575,.565,1) both",
          "@keyframes fadeInUp": {
            "0%": { opacity: 0, transform: "translateY(40px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 3,
            letterSpacing: 1,
            textShadow: "0 2px 12px rgba(0,0,0,0.7)",
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="h6"
          paragraph
          sx={{
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            color: "#e0f7fa",
            mb: 2,
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          Welcome to our Service Booking platform! We are dedicated to providing top-notch services across multiple locations. Our mission is to connect you with the best professionals and make your booking experience seamless and hassle-free.
        </Typography>
        <Typography
          variant="h6"
          paragraph
          sx={{
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            color: "#e0f7fa",
            mb: 2,
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          Whether you need home repairs, cleaning, or any other service, we have you covered. Our team is committed to quality, reliability, and customer satisfaction.
        </Typography>
        <Typography
          variant="h6"
          paragraph
          sx={{
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            color: "#e0f7fa",
            mb: 4,
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          We believe in transparency, trust, and excellence. Thank you for choosing us as your service partner!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/aboutus")}
          sx={{
            px: 5,
            py: 1.8,
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: 4,
            borderRadius: 3,
            backgroundColor: "#009688",
            fontSize: "1.1rem",
            "&:hover": {
              backgroundColor: "#00796b",
              boxShadow: 6,
            },
          }}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUs;
