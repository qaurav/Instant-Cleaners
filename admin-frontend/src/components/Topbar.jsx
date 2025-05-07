import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          CMS Admin Dashboard
        </Typography>
        <Box>
          <Typography variant="body1" component="span" sx={{ mr: 3 }}>
            📞 +1 234 567 890
          </Typography>
          <Typography variant="body1" component="span" sx={{ mr: 3 }}>
            📧 admin@example.com
          </Typography>
          <Button onClick={handleLogout} color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
