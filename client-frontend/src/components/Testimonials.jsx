import React from "react";
import Slider from "react-slick";
import { Box, Typography, Avatar, Paper, IconButton, Container } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Star } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: { xs: -5, md: -20 },
        transform: "translateY(-50%)",
        zIndex: 2,
        backgroundColor: "rgba(37, 150, 190, 0.9)",
        color: "white",
        width: { xs: 40, md: 50 },
        height: { xs: 40, md: 50 },
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        "&:hover": { 
          backgroundColor: "rgba(26, 122, 158, 1)",
          transform: "translateY(-50%) scale(1.1)",
        },
        transition: "all 0.3s ease",
      }}
    >
      <ArrowBackIos sx={{ fontSize: { xs: 16, md: 20 }, ml: 1 }} />
    </IconButton>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: { xs: -5, md: -20 },
        transform: "translateY(-50%)",
        zIndex: 2,
        backgroundColor: "rgba(37, 150, 190, 0.9)",
        color: "white",
        width: { xs: 40, md: 50 },
        height: { xs: 40, md: 50 },
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        "&:hover": { 
          backgroundColor: "rgba(26, 122, 158, 1)",
          transform: "translateY(-50%) scale(1.1)",
        },
        transition: "all 0.3s ease",
      }}
    >
      <ArrowForwardIos sx={{ fontSize: { xs: 16, md: 20 } }} />
    </IconButton>
  );
};

const testimonialsData = [
  {
    id: 1,
    name: "Alice Johnson",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Had a nasty stain and needed urgent help—these guys showed up the same day and made it disappear! Fast, friendly, and effective!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Smith",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "This service was amazing! The team was professional and punctual. Highly recommend to anyone looking for quality service.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophia Lee",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Great experience from start to finish. The booking process was smooth and the service exceeded my expectations.",
    rating: 5,
  },
  {
    id: 4,
    name: "Eminem Smith",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRueVtgQ5lunR_tZFsd8Eu6nkzFeJuWnrCXmoBHr21NvF_mJLzlMu_eecJKrpXpWlzMRFQ&usqp=CAU",
    text: "Called in the morning, and they were here by the afternoon! Incredible same-day service and top-quality cleaning. Super impressed!",
    rating: 5,
  },
  {
    id: 5,
    name: "Will Lee",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRueVtgQ5lunR_tZFsd8Eu6nkzFeJuWnrCXmoBHr21NvF_mJLzlMu_eecJKrpXpWlzMRFQ&usqp=CAU",
    text: "Fantastic service! Our carpets look brand new, and the whole house smells fresh. The team was professional, quick, and friendly. Highly recommend!",
    rating: 5,
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#f8f9fa",
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="h2" 
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.75rem" },
              color: "#1a1a1a",
              mb: 2,
              letterSpacing: -0.5,
            }}
          >
            What Our Clients Say
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "#6c757d",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Don't just take our word for it – hear from our satisfied customers
          </Typography>
        </Box>

        <Box sx={{ position: "relative", px: { xs: 2, md: 5 } }}>
          <Slider {...settings}>
            {testimonialsData.map(({ id, name, image, text, rating }) => (
              <Box key={id} sx={{ px: { xs: 1, md: 2 } }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: "100%",
                    minHeight: { xs: 280, md: 320 },
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    borderRadius: 3,
                    border: "1px solid #e0e0e0",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                      borderColor: "#2596BE",
                    },
                  }}
                >
                  {/* Star Rating */}
                  <Box sx={{ display: "flex", gap: 0.5, mb: 2.5 }}>
                    {[...Array(rating)].map((_, i) => (
                      <Star
                        key={i}
                        sx={{
                          fontSize: 22,
                          color: "#FFD700",
                        }}
                      />
                    ))}
                  </Box>

                  {/* Testimonial Text */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#4a4a4a",
                      fontSize: { xs: "0.95rem", md: "1.05rem" },
                      lineHeight: 1.7,
                      mb: 3,
                      fontStyle: "italic",
                      flex: 1,
                    }}
                  >
                    "{text}"
                  </Typography>

                  {/* Author Info */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      pt: 2,
                      borderTop: "1px solid #f0f0f0",
                    }}
                  >
                    <Avatar
                      src={image}
                      alt={name}
                      sx={{
                        width: { xs: 50, md: 60 },
                        height: { xs: 50, md: 60 },
                        border: "3px solid #2596BE",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: "#1a1a1a",
                          fontSize: { xs: "0.95rem", md: "1.05rem" },
                        }}
                      >
                        {name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6c757d",
                          fontSize: { xs: "0.85rem", md: "0.9rem" },
                        }}
                      >
                        Verified Customer
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Slider>
        </Box>

        {/* Trust Badge */}
        <Box
          sx={{
            mt: 6,
            textAlign: "center",
            p: 3,
            backgroundColor: "rgba(37, 150, 190, 0.05)",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#2596BE",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            Join 5,000+ Happy Customers
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#6c757d",
              mt: 1,
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            Experience the Instant Carpet Cleaning difference today
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;