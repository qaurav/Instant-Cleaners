import React, { useState } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const galleryImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1532634726-8b9fb9987b0d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=80",
];

const AboutUsPage = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={6} alignItems="center">
        {/* Left Side: Images */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {galleryImages.map((img, i) => (
              <Grid item xs={6} sm={4} key={i}>
                <Box
                  component="img"
                  src={img}
                  alt={`Gallery image ${i + 1}`}
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 3,
                    boxShadow: 3,
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Side: Text Content */}
        <Grid item xs={12} md={6}>
          <Box sx={{ px: { xs: 0, md: 4 } }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#004d40", letterSpacing: 1 }}
            >
              About Us
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: "1.2rem", color: "#555", mb: 3 }}
            >
              Welcome to our Service Booking platform! We are dedicated to providing top-notch services across multiple locations. Our mission is to connect you with the best professionals and make your booking experience seamless and hassle-free.
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: "1.2rem", color: "#555", mb: 3 }}
            >
              Whether you need home repairs, cleaning, or any other service, we have you covered. Our team is committed to quality, reliability, and customer satisfaction.
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: "1.2rem", color: "#555" }}
            >
              We believe in transparency, trust, and excellence. Thank you for choosing us as your service partner!
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={galleryImages.map((src) => ({ src }))}
        index={index}
        controller={{ closeOnBackdropClick: true }}
        onIndexChange={setIndex}
      />
    </Container>
  );
};

export default AboutUsPage;
