import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Locations", id: "locations" },
  { label: "About Us", id: "aboutus" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];

const fontStyles = {
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  fontSize: 16,
  fontWeight: 500,
  textTransform: "none",
};

const activeStyle = {
  color: "#FFD700",
  borderBottom: "2px solid #FFD700",
  fontWeight: 700,
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const topBarHeight = isMobile ? 180 : 60; // Match this to your TopBar height
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      setActiveId(location.state.scrollTo);
    } else if (location.pathname === "/") {
      setActiveId("home");
    } else {
      setActiveId(null);
    }
  }, [location]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  const handleNavClick = (id) => {
    if (location.pathname === "/") {
      scrollToSection(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
      setActiveId(id);
    }
    setDrawerOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        width: { xs: "100vw", sm: 300 },
        maxWidth: "100vw",
        backgroundColor: "#fff",
        height: "100%", // Ensure the drawer background covers the full height
        paddingTop: 0, // Remove paddingTop to eliminate extra space
      }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <List>
        {navItems.map(({ label, id }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton
              onClick={() => handleNavClick(id)}
              sx={{
                ...fontStyles,
                ...(activeId === id ? activeStyle : {}),
              }}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavClick("contact")}
            sx={{
              ...fontStyles,
              ...(activeId === "contact" ? activeStyle : {}),
            }}
          >
            <ListItemText primary="REQUEST A QUOTE" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        sx={{
          top: topBarHeight,
          backgroundColor: "rgb(37, 150, 190)",
          boxShadow: "none",
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ minHeight: 64, display: "flex", justifyContent: "space-between" }}>
          {!isMobile ? (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navItems.map(({ label, id }) => (
                <Button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  sx={{
                    ...fontStyles,
                    color: "#fff",
                    ...(activeId === id ? activeStyle : { borderBottom: "none" }),
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          ) : (
            <Box />
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!isMobile && (
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: 16,
                  px: 3,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderColor: "#fff",
                  },
                }}
                onClick={() => handleNavClick("contact")}
                endIcon={<span style={{ fontSize: 16, transform: "translateX(2px)" }}>→</span>}
              >
                REQUEST A QUOTE
              </Button>
            )}

            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setDrawerOpen(true)}
                aria-label="menu"
                size="large"
                sx={{ color: "#fff" }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer for TopBar + Navbar */}
      <Box sx={{ height: topBarHeight + 64 }} />

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          zIndex: 1500, // Ensure the Drawer is above the Navbar but below the TopBar
          "& .MuiDrawer-paper": {
            top: `${topBarHeight}px`, // Start the drawer below the TopBar
            height: `calc(100% - ${topBarHeight}px)`, // Adjust height to exclude TopBar
            paddingTop: 0, // Ensure no additional padding at the top
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;