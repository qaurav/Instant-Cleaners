import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Box
      id="aboutus"
      sx={{
        padding: "60px 20px",
        backgroundColor: "#f0f4f8",
        maxWidth: 900,
        mx: "auto",
      }}
    >
      <Grid container spacing={4} direction="column" alignItems="center">
        {/* Text on top */}
        <Grid item xs={12}>
          <Typography variant="h3" component="h2" gutterBottom align="center">
            About Us
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", color: "#555", textAlign: "center" }}
          >
            Welcome to our Service Booking platform! We are dedicated to providing top-notch services across multiple locations. Our mission is to connect you with the best professionals and make your booking experience seamless and hassle-free.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", color: "#555", textAlign: "center" }}
          >
            Whether you need home repairs, cleaning, or any other service, we have you covered. Our team is committed to quality, reliability, and customer satisfaction.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", color: "#555", textAlign: "center" }}
          >
            We believe in transparency, trust, and excellence. Thank you for choosing us as your service partner!
          </Typography>
          <Box textAlign="center" mt={3}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate("/aboutus")}
            >
              Learn More
            </Button>
          </Box>
        </Grid>

        {/* Image below */}
        <Grid item xs={12}>
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
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
