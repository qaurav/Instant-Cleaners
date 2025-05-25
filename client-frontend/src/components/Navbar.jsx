// Navbar.jsx
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Locations", id: "locations" },
  { label: "About Us", id: "aboutus" },
  { label: "Services", id: "services" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

const Navbar = ({ services = [], locations = [], setActiveId, activeId: parentActiveId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const topBarHeight = isMobile ? 180 : 60;
  const navbarHeight = 64;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeIdState, setActiveIdState] = useState("home");
  const [topBarVisible, setTopBarVisible] = useState(true);

  // Dropdown anchors for desktop menus
  const [anchorElServices, setAnchorElServices] = useState(null);
  const [anchorElLocations, setAnchorElLocations] = useState(null);

  // Drawer dropdown open states for mobile
  const [openServicesDrawer, setOpenServicesDrawer] = useState(false);
  const [openLocationsDrawer, setOpenLocationsDrawer] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const idToLabel = navItems.reduce((acc, item) => {
    acc[item.id] = item.label;
    return acc;
  }, {});

  // Sync local activeIdState with parentActiveId for home page
  useEffect(() => {
    if (location.pathname === "/" && parentActiveId && parentActiveId !== activeIdState) {
      setActiveIdState(parentActiveId);
    }
  }, [parentActiveId, location.pathname]);

  // Handle dynamic navbar text based on route
  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/locations/")) {
      const slug = path.replace("/locations/", "");
      const locationItem = locations.find((loc) => createSlug(loc.name) === slug);
      const locationName = locationItem ? locationItem.name : slug;
      setActiveIdState(`Locations > ${locationName}`);
    } else if (path.startsWith("/services/")) {
      const slug = path.replace("/services/", "");
      const serviceItem = services.find((svc) => createSlug(svc.name) === slug);
      const serviceName = serviceItem ? serviceItem.name : slug;
      setActiveIdState(`Services > ${serviceName}`);
    } else if (path === "/about") {
      setActiveIdState("About Us");
    } else if (path === "/") {
      setActiveIdState(parentActiveId || "home");
    } else {
      setActiveIdState("home");
    }
  }, [location.pathname, locations, services, parentActiveId]);

  useEffect(() => {
    const handleScroll = () => {
      setTopBarVisible(window.scrollY <= 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const createSlug = (text) => {
    if (typeof text !== "string") {
      text = String(text || "");
    }
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  };

  const handleNavClick = (id) => {
    setDrawerOpen(false);
    setAnchorElServices(null);
    setAnchorElLocations(null);
    setOpenServicesDrawer(false);
    setOpenLocationsDrawer(false);

    if (location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: id }, replace: true });
    }

    setActiveIdState(id);
    if (setActiveId) {
      setActiveId(id);
    }
  };

  const handleServiceClick = (service) => {
    const name = service.name || service.title || "Unnamed Service";
    const slug = createSlug(name);
    navigate(`/services/${slug}`);
    setAnchorElServices(null);
    setDrawerOpen(false);
    setOpenServicesDrawer(false);
  };

  const handleLocationClick = (location) => {
    const name = location.name || location.title || "Unnamed Location";
    const slug = createSlug(name);
    navigate(`/locations/${slug}`);
    setAnchorElLocations(null);
    setDrawerOpen(false);
    setOpenLocationsDrawer(false);
  };

  const handleOpenServicesMenu = (event) => {
    setAnchorElServices(event.currentTarget);
    setAnchorElLocations(null);
  };

  const handleOpenLocationsMenu = (event) => {
    setAnchorElLocations(event.currentTarget);
    setAnchorElServices(null);
  };

  const handleCloseMenus = () => {
    setAnchorElServices(null);
    setAnchorElLocations(null);
  };

  const drawerOffset = topBarVisible ? topBarHeight + navbarHeight : navbarHeight;

  // Format the activeIdState text for display
  const formatActiveIdText = (text) => {
    if (text.startsWith("Locations >")) {
      const parts = text.split(" > ");
      return (
        <>
          {parts[0]} {"> "}
          <span style={{ fontSize: "0.8rem" }}>{parts[1]}</span>
        </>
      );
    } else if (text.startsWith("Services >")) {
      const parts = text.split(" > ");
      return (
        <>
          {parts[0]} {"> "}
          <span style={{ fontSize: "0.8rem" }}>{parts[1]}</span>
        </>
      );
    }
    return text;
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {navItems.map(({ label, id }) => (
          <React.Fragment key={id}>
            {id === "services" ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setOpenServicesDrawer(!openServicesDrawer)}>
                    <ListItemText primary="Services" />
                    {openServicesDrawer ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openServicesDrawer} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {services.length === 0 ? (
                      <ListItemButton sx={{ pl: 4 }} disabled>
                        <ListItemText primary="No services available" />
                      </ListItemButton>
                    ) : (
                      services.map((service, idx) => (
                        <ListItemButton
                          key={idx}
                          sx={{ pl: 4 }}
                          onClick={() => handleServiceClick(service)}
                        >
                          <ListItemText primary={service.name} />
                        </ListItemButton>
                      ))
                    )}
                  </List>
                </Collapse>
              </>
            ) : id === "locations" ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setOpenLocationsDrawer(!openLocationsDrawer)}>
                    <ListItemText primary="Locations" />
                    {openLocationsDrawer ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openLocationsDrawer} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {locations.length === 0 ? (
                      <ListItemButton sx={{ pl: 4 }} disabled>
                        <ListItemText primary="No locations available" />
                      </ListItemButton>
                    ) : (
                      locations.map((location, idx) => (
                        <ListItemButton
                          key={idx}
                          sx={{ pl: 4 }}
                          onClick={() => handleLocationClick(location)}
                        >
                          <ListItemText primary={location.name} />
                        </ListItemButton>
                      ))
                    )}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNavClick(id)}>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            )}
          </React.Fragment>
        ))}
        {/* Redesigned Request a Quote button with border and background */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavClick("contact")}
            sx={{
              backgroundColor: "#FFD700", // Yellow background
              border: "2px solid #FFD700", // Matching border
              borderRadius: 4, // Rounded corners
              padding: "8px 16px", // Adjusted padding
              "&:hover": {
                backgroundColor: "#FFC107", // Slightly darker yellow on hover
                borderColor: "#FFC107",
              },
            }}
          >
            <ListItemText
              primary="Request a Quote"
              sx={{ color: "#333", fontWeight: 600, textTransform: "uppercase" }} // Dark text for contrast
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          top: topBarVisible ? topBarHeight : 0,
          height: navbarHeight,
          zIndex: 1400,
          transition: "top 0.3s ease-in-out",
          px: isMobile ? 1 : 3,
        }}
      >
        <Toolbar
          sx={{
            minHeight: navbarHeight,
            display: "flex",
            justifyContent: "space-between",
            px: isMobile ? 0 : 2,
          }}
        >
          {(isMobile || isTablet) ? (
            <>
              <IconButton
                color="inherit"
                edge="start"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                size="large"
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "#fff",
                  fontSize: "1rem",
                }}
              >
                {formatActiveIdText(activeIdState)}
              </Typography>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              {navItems.map(({ label, id }) => {
                if (id === "services") {
                  return (
                    <Box key={id} sx={{ position: "relative" }}>
                      <Button
                        color="inherit"
                        endIcon={<ExpandMoreIcon />}
                        sx={{
                          textTransform: "none",
                          borderBottom: activeIdState.startsWith("Services") ? "2px solid #FFD700" : "none",
                          fontWeight: activeIdState.startsWith("Services") ? 700 : 500,
                          fontSize: 16,
                          "&:hover": {
                            borderBottom: "2px solid #FFD700",
                            backgroundColor: "transparent",
                          },
                        }}
                        onClick={(e) => setAnchorElServices(e.currentTarget)}
                      >
                        {label}
                      </Button>
                      <Menu
                        anchorEl={anchorElServices}
                        open={Boolean(anchorElServices)}
                        onClose={() => setAnchorElServices(null)}
                        MenuListProps={{ sx: { backgroundColor: "rgb(37, 150, 190)", color: "#fff" } }}
                        PaperProps={{ sx: { mt: 1 } }}
                      >
                        {services.length === 0 ? (
                          <MenuItem disabled sx={{ color: "#fff" }}>
                            No services available
                          </MenuItem>
                        ) : (
                          services.map((service, idx) => (
                            <MenuItem
                              key={idx}
                              onClick={() => handleServiceClick(service)}
                              sx={{ color: "#fff" }}
                            >
                              {service.name}
                            </MenuItem>
                          ))
                        )}
                      </Menu>
                    </Box>
                  );
                }
                if (id === "locations") {
                  return (
                    <Box key={id} sx={{ position: "relative" }}>
                      <Button
                        color="inherit"
                        endIcon={<ExpandMoreIcon />}
                        sx={{
                          textTransform: "none",
                          borderBottom: activeIdState.startsWith("Locations") ? "2px solid #FFD700" : "none",
                          fontWeight: activeIdState.startsWith("Locations") ? 700 : 500,
                          fontSize: 16,
                          "&:hover": {
                            borderBottom: "2px solid #FFD700",
                            backgroundColor: "transparent",
                          },
                        }}
                        onClick={(e) => setAnchorElLocations(e.currentTarget)}
                      >
                        {label}
                      </Button>
                      <Menu
                        anchorEl={anchorElLocations}
                        open={Boolean(anchorElLocations)}
                        onClose={() => setAnchorElLocations(null)}
                        MenuListProps={{ sx: { backgroundColor: "rgb(37, 150, 190)", color: "#fff" } }}
                        PaperProps={{ sx: { mt: 1 } }}
                      >
                        {locations.length === 0 ? (
                          <MenuItem disabled sx={{ color: "fff" }}>
                            No locations available
                          </MenuItem>
                        ) : (
                          locations.map((location, idx) => (
                            <MenuItem
                              key={idx}
                              onClick={() => handleLocationClick(location)}
                              sx={{ color: "#fff" }}
                            >
                              {location.name}
                            </MenuItem>
                          ))
                        )}
                      </Menu>
                    </Box>
                  );
                }
                return (
                  <Button
                    key={id}
                    color="inherit"
                    sx={{
                      textTransform: "none",
                      borderBottom: activeIdState === id || activeIdState === "About Us" ? "2px solid #FFD700" : "none",
                      fontWeight: activeIdState === id || activeIdState === "About Us" ? 700 : 500,
                      fontSize: 16,
                      "&:hover": {
                        borderBottom: "2px solid #FFD700",
                        backgroundColor: "transparent",
                      },
                    }}
                    onClick={() => handleNavClick(id)}
                  >
                    {label}
                  </Button>
                );
              })}
            </Box>
          )}

          {!isMobile && !isTablet && (
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
            >
              REQUEST A QUOTE
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          zIndex: 1600,
          "& .MuiDrawer-paper": {
            zIndex: 1600,
            top: drawerOffset,
            height: `calc(100% - ${drawerOffset}px)`,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;