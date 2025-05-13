import React from "react";
import { Box, Typography, Container } from "@mui/material";

const AboutUsPage = () => {
  return (
    <Container maxWidth="md" sx={{ padding: "60px 20px" }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        About Us
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: "1.2rem", color: "#555", textAlign: "center" }}
      >
        Welcome to our Service Booking platform! We are dedicated to providing top-notch services across multiple locations. Our mission is to connect you with the best professionals and make your booking experience seamless and hassle-free.
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: "1.2rem", color: "#555", textAlign: "center" }}
      >
        Whether you need home repairs, cleaning, or any other service, we have you covered. Our team is committed to quality, reliability, and customer satisfaction.
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: "1.2rem", color: "#555", textAlign: "center" }}
      >
        We believe in transparency, trust, and excellence. Thank you for choosing us as your service partner!
      </Typography>
      {/* You can add more detailed content here */}
    </Container>
  );
};

export default AboutUsPage;
