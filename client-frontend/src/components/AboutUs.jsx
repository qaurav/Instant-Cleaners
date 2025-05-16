import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Box
      id="aboutus"
      sx={{
        padding: { xs: "40px 20px", md: "80px 40px" },
        background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
        maxWidth: 1000,
        mx: "auto",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Grid container spacing={6} alignItems="center">
        {/* Text Content */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#00796b" }}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.15rem", color: "#555", mb: 2 }}
          >
            Welcome to our Service Booking platform! We are dedicated to providing top-notch services across multiple locations. Our mission is to connect you with the best professionals and make your booking experience seamless and hassle-free.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.15rem", color: "#555", mb: 2 }}
          >
            Whether you need home repairs, cleaning, or any other service, we have you covered. Our team is committed to quality, reliability, and customer satisfaction.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.15rem", color: "#555", mb: 3 }}
          >
            We believe in transparency, trust, and excellence. Thank you for choosing us as your service partner!
          </Typography>
          <Box textAlign="center" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/aboutus")}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: 2,
                "&:hover": {
                  backgroundColor: "#004d40",
                  boxShadow: 4,
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Grid>

        {/* Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="About Us"
            sx={{
              width: "100%",
              borderRadius: 3,
              boxShadow: 6,
              objectFit: "cover",
              maxHeight: 400,
              mx: "auto",
              display: "block",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
