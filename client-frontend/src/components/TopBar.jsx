import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const TopBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const height = isMobile ? 180 : 60;

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY <= 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: visible ? 0 : -height,
        left: 0,
        right: 0,
        height,
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "space-between",
        px: isMobile ? 2 : 5,
        py: isMobile ? 2 : 0,
        zIndex: 1500,
        boxSizing: "border-box",
        borderBottom: "3px solid #2596BE",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        userSelect: "none",
        transition: "top 0.3s ease-in-out",
      }}
    >
      {/* Logo */}
      <Box 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          mb: isMobile ? 1.5 : 0,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <img
          src="/instantcleanerslogo.jpg"
          alt="Instant Carpet Cleaning Services"
          style={{ 
            height: isMobile ? 40 : 50, 
            cursor: "pointer",
            borderRadius: "8px",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </Box>

      {/* Info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "flex-end",
          gap: isMobile ? 1.5 : 4,
          width: isMobile ? "100%" : "auto",
        }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 1,
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "translateX(3px)",
            },
          }}
        >
          <AccessTimeIcon 
            fontSize={isMobile ? "small" : "medium"} 
            sx={{ 
              color: "#2596BE",
              filter: "drop-shadow(0 2px 4px rgba(37, 150, 190, 0.2))",
            }} 
          />
          <Typography 
            component="span" 
            sx={{ 
              fontWeight: 600, 
              fontSize: isMobile ? "0.85rem" : "0.95rem",
              color: "#1a1a1a",
            }}
          >
            24/7 Available
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 1,
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "translateX(3px)",
            },
          }}
        >
          <EmailIcon 
            fontSize={isMobile ? "small" : "medium"} 
            sx={{ 
              color: "#2596BE",
              filter: "drop-shadow(0 2px 4px rgba(37, 150, 190, 0.2))",
            }} 
          />
          <Typography
            component="a"
            href="mailto:info@instantcarpetcleaningservices.com.au"
            sx={{
              color: "#1a1a1a",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: isMobile ? "0.85rem" : "0.95rem",
              cursor: "pointer",
              transition: "color 0.3s ease",
              "&:hover": { 
                color: "#2596BE",
              },
            }}
          >
            info@instantcarpetcleaningservices.com.au
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 1,
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "translateX(3px)",
            },
          }}
        >
          <PhoneIcon 
            fontSize={isMobile ? "small" : "medium"} 
            sx={{ 
              color: "#2596BE",
              filter: "drop-shadow(0 2px 4px rgba(37, 150, 190, 0.2))",
            }} 
          />
          <Typography
            component="a"
            href="tel:++614209539791"
            sx={{
              color: "#1a1a1a",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: isMobile ? "0.85rem" : "0.95rem",
              cursor: "pointer",
              transition: "color 0.3s ease",
              "&:hover": { 
                color: "#2596BE",
              },
            }}
          >
            +61420953979
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TopBar;