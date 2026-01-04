import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BACKGROUND_IMG =
  "https://i.pinimg.com/736x/ee/b6/46/eeb6463a561f8b097d53af4cec176a24.jpg";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "85vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${BACKGROUND_IMG}) center/cover no-repeat`,
        py: { xs: 10, md: 12 },
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,150,190,0.15) 0%, transparent 70%)",
          top: -100,
          left: -150,
          zIndex: 1,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: { xs: 250, md: 400 },
          height: { xs: 250, md: 400 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,215,0,0.12) 0%, transparent 70%)",
          bottom: -80,
          right: -120,
          zIndex: 1,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Main Content */}
      <Container maxWidth="md">
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "#fff",
            p: { xs: 4, md: 7 },
            borderRadius: 4,
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            animation: "fadeInUp 0.8s ease-out",
            "@keyframes fadeInUp": {
              "0%": { 
                opacity: 0, 
                transform: "translateY(30px)" 
              },
              "100%": { 
                opacity: 1, 
                transform: "translateY(0)" 
              },
            },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 4,
              letterSpacing: -0.5,
              textShadow: "0 4px 12px rgba(0,0,0,0.5)",
              fontSize: { xs: "2.25rem", md: "3rem" },
            }}
          >
            About Us
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              paragraph
              sx={{
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: "#e0f2f7",
                lineHeight: 1.8,
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                fontWeight: 400,
              }}
            >
              Instant carpet cleaning services started out as "Experts Carpet Cleaning" in June, 2010 before changing its name to Instant Carpet Cleaning Services in 2019.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              paragraph
              sx={{
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: "#e0f2f7",
                lineHeight: 1.8,
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                fontWeight: 400,
              }}
            >
              Over the past 15 years, we have quickly grown from a husband-and-wife team, working just a few hours a week, to a large team made up of passionate and highly trained detail cleaners – not just ordinary, hasty spray-and-wipers!
            </Typography>
          </Box>

          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h6"
              paragraph
              sx={{
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: "#e0f2f7",
                lineHeight: 1.8,
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                fontWeight: 400,
              }}
            >
              Instant Carpet Cleaning Services' high standard quickly became the norm, with new clients constantly asking us where we had been hiding ourselves all these years, as our cleaning standards were so much higher than what they had experienced in the past.
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/aboutus")}
            sx={{
              px: 6,
              py: 2,
              fontWeight: 700,
              textTransform: "uppercase",
              boxShadow: "0 8px 24px rgba(37, 150, 190, 0.4)",
              borderRadius: 2,
              backgroundColor: "#2596BE",
              fontSize: "1.05rem",
              letterSpacing: 0.5,
              "&:hover": {
                backgroundColor: "#1A7A9E",
                boxShadow: "0 12px 32px rgba(37, 150, 190, 0.5)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Learn More About Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;