import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LocationOn, ArrowForward } from '@mui/icons-material';

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

const LocationCard = ({ location, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: '100%',
        maxWidth: 400,
        height: 420,
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? 'translateY(-12px)' : 'translateY(0)',
        '&:hover': {
          boxShadow: "0 20px 50px rgba(37,150,190,0.25)",
        },
      }}
      onClick={() => onClick(location._id)}
    >
      {/* Image Container */}
      <Box
        sx={{
          position: "relative",
          height: 240,
          overflow: "hidden",
          backgroundImage: `url(${location.image || "https://via.placeholder.com/400x240"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.4s ease",
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
            transition: "background 0.3s ease",
          }}
        />

        {/* Location Icon Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            backgroundColor: "rgba(255,255,255,0.95)",
            color: "#2596BE",
            width: 48,
            height: 48,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
            transform: isHovered ? 'scale(1.1) rotate(360deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          <LocationOn sx={{ fontSize: 24 }} />
        </Box>
      </Box>

      {/* Content Container */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#ffffff",
          padding: 3.5,
          height: 180,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Title & Description */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: -0.3,
              mb: 1.5,
              color: "#1a1a1a",
              fontSize: "1.5rem",
              lineHeight: 1.3,
            }}
          >
            {location.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#6c757d",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {stripHtml(location.description)}
          </Typography>
        </Box>

        {/* Learn More Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#2596BE",
            fontWeight: 700,
            fontSize: "0.95rem",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            transition: "all 0.3s ease",
            transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
          }}
        >
          <span>View Location</span>
          <ArrowForward 
            sx={{ 
              fontSize: 18,
              transition: "transform 0.3s ease",
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            }} 
          />
        </Box>
      </Box>

      {/* Accent Line */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(90deg, #2596BE 0%, #1A7A9E 100%)",
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: "transform 0.4s ease",
        }}
      />
    </Card>
  );
};

export default LocationCard;