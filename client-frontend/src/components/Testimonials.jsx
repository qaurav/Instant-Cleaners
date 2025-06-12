import React from "react";
import Slider from "react-slick";
import { Box, Typography, Avatar, Paper, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrow components for slick slider
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: 10,
        transform: "translateY(-50%)",
        zIndex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        color: "white",
        "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
      }}
    >
      <ArrowBackIos />
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
        right: 10,
        transform: "translateY(-50%)",
        zIndex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        color: "white",
        "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
      }}
    >
      <ArrowForwardIos />
    </IconButton>
  );
};

const testimonialsData = [
  {
    id: 1,
    name: "Alice Johnson",
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
    text:
      "Had a nasty stain and needed urgent help—these guys showed up the same day and made it disappear! Fast, friendly, and effective!",
  },
  {
    id: 2,
    name: "Michael Smith",
    image:
      "https://randomuser.me/api/portraits/men/45.jpg",
    text:
      "This service was amazing! The team was professional and punctual. Highly recommend to anyone looking for quality service.",
  },
  {
    id: 3,
    name: "Sophia Lee",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
    text:
      "Great experience from start to finish. The booking process was smooth and the service exceeded my expectations.",
  },
  {
    id: 4,
    name: "Eminem Smith",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRueVtgQ5lunR_tZFsd8Eu6nkzFeJuWnrCXmoBHr21NvF_mJLzlMu_eecJKrpXpWlzMRFQ&usqp=CAU",
    text:
      "Called in the morning, and they were here by the afternoon! Incredible same-day service and top-quality cleaning. Super impressed!",
  },
  {
    id: 5,
    name: "Will Lee",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRueVtgQ5lunR_tZFsd8Eu6nkzFeJuWnrCXmoBHr21NvF_mJLzlMu_eecJKrpXpWlzMRFQ&usqp=CAU",
    text:
      "Fantastic service! Our carpets look brand new, and the whole house smells fresh. The team was professional, quick, and friendly. Highly recommend!",
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 2 testimonials at once on desktop
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
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
        padding: "20px 20px",
        backgroundColor: "#fff",
        width: "100vw",          // full viewport width
        maxWidth: "100%",        // no max width limit
        margin: 0,               // remove horizontal auto margins
        boxSizing: "border-box", // include padding in width calculation
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        What Our Clients Say
      </Typography>
      <Slider {...settings}>
        {testimonialsData.map(({ id, name, image, text }) => (
          <Box key={id} sx={{ px: 2 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                src={image}
                alt={name}
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {text}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Testimonials;
