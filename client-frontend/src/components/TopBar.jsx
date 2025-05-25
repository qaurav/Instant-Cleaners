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
        backgroundColor: "#fff",
        color: "#222",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "space-between",
        px: isMobile ? 2 : 5,
        py: isMobile ? 2 : 0,
        zIndex: 1500,
        boxSizing: "border-box",
        borderBottom: "3px solid rgb(37, 150, 190)",
        userSelect: "none",
        transition: "top 0.3s ease-in-out",
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", mb: isMobile ? 2 : 0 }}>
        <img
          src="/instantcleanerslogo.jpg"
          alt="Instant Carpet Cleaning Services"
          style={{ height: isMobile ? 40 : 50, cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </Box>

      {/* Info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "flex-start",
          gap: isMobile ? 2 : 5,
          width: isMobile ? "100%" : "auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTimeIcon fontSize={isMobile ? "small" : "large"} sx={{ color: "rgb(37, 150, 190)" }} />
          <Typography component="span" sx={{ fontWeight: 400, fontSize: isMobile ? 15 : 20 }}>
            24*7 Available
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmailIcon fontSize={isMobile ? "small" : "large"} sx={{ color: "rgb(37, 150, 190)" }} />
          <Typography
            component="a"
            href="mailto:info@instantcleaners.com"
            sx={{
              color: "#222",
              textDecoration: "none",
              fontWeight: 400,
              fontSize: isMobile ? 15 : 20,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            info@instantcleaners.com
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PhoneIcon fontSize={isMobile ? "small" : "large"} sx={{ color: "rgb(37, 150, 190)" }} />
          <Typography
            component="a"
            href="tel:+15551234567"
            sx={{
              color: "#222",
              textDecoration: "none",
              fontWeight: 400,
              fontSize: isMobile ? 15 : 20,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            +1 (555) 123-4567
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TopBar;
