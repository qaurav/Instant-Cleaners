import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

const LogoLoader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Animation */}
      <Box
        sx={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,150,190,0.1) 0%, transparent 70%)",
          animation: "pulse 2s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": {
              transform: "scale(1)",
              opacity: 0.5,
            },
            "50%": {
              transform: "scale(1.1)",
              opacity: 0.3,
            },
          },
        }}
      />

      {/* Logo Container */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: { xs: 250, sm: 350, md: 400 },
          height: { xs: 250, sm: 350, md: 400 },
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(37, 150, 190, 0.3)",
          animation: "reveal 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          "@keyframes reveal": {
            "0%": {
              transform: "scale(0) rotate(-180deg)",
              opacity: 0,
            },
            "60%": {
              transform: "scale(1.1) rotate(10deg)",
              opacity: 1,
            },
            "100%": {
              transform: "scale(1) rotate(0deg)",
              opacity: 1,
            },
          },
        }}
      >
        <img
          src="/instantcleanerslogo.jpg"
          alt="Instant Carpet Cleaning Logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => console.error("Image failed to load:", e.target.src)}
        />
      </Box>

      {/* Loading Dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          display: "flex",
          gap: 1.5,
        }}
      >
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#2596BE",
              animation: "bounce 1.4s ease-in-out infinite",
              animationDelay: `${index * 0.2}s`,
              "@keyframes bounce": {
                "0%, 80%, 100%": {
                  transform: "scale(0)",
                  opacity: 0.5,
                },
                "40%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LogoLoader;