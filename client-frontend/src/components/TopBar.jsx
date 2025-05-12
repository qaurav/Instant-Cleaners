import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const TopBar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 30, // adjust height as needed
        backgroundColor: "#1976d2",
        color: "white",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 16px",
        fontSize: 14,
        gap: 3,
        zIndex: 1400, // higher than navbar
        userSelect: "none",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <EmailIcon fontSize="small" />
        <Typography component="span">info@instantcleaners.com</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <PhoneIcon fontSize="small" />
        <Typography component="span">+1 (555) 123-4567</Typography>
      </Box>
    </Box>
  );
};

export default TopBar;
