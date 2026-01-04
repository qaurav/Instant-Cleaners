import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "About Us", id: "aboutus" },
  { label: "Locations", id: "locations" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

const Navbar = ({ services = [], locations = [], setActiveId, activeId: parentActiveId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const topBarHeight = isMobile ? 180 : 60;
  const navbarHeight = 70;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeIdState, setActiveIdState] = useState("home");
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const [anchorElServices, setAnchorElServices] = useState(null);
  const [anchorElLocations, setAnchorElLocations] = useState(null);

  const [openServicesDrawer, setOpenServicesDrawer] = useState(false);
  const [openLocationsDrawer, setOpenLocationsDrawer] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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
      setScrolled(window.scrollY > 10);
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

  const drawerOffset = topBarVisible ? topBarHeight + navbarHeight : navbarHeight;

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
    <Box sx={{ width: 280 }} role="presentation">
      <List sx={{ pt: 3 }}>
        {navItems.map(({ label, id }) => (
          <React.Fragment key={id}>
            {id === "services" ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => setOpenServicesDrawer(!openServicesDrawer)}
                    sx={{
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(37, 150, 190, 0.08)',
                      },
                    }}
                  >
                    <ListItemText 
                      primary="Services" 
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: '1.05rem',
                      }}
                    />
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
                          sx={{ 
                            pl: 5,
                            py: 1.2,
                            '&:hover': {
                              backgroundColor: 'rgba(37, 150, 190, 0.05)',
                            },
                          }}
                          onClick={() => handleServiceClick(service)}
                        >
                          <ListItemText 
                            primary={service.name}
                            primaryTypographyProps={{
                              fontSize: '0.95rem',
                            }}
                          />
                        </ListItemButton>
                      ))
                    )}
                  </List>
                </Collapse>
              </>
            ) : id === "locations" ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => setOpenLocationsDrawer(!openLocationsDrawer)}
                    sx={{
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(37, 150, 190, 0.08)',
                      },
                    }}
                  >
                    <ListItemText 
                      primary="Locations"
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: '1.05rem',
                      }}
                    />
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
                          sx={{ 
                            pl: 5,
                            py: 1.2,
                            '&:hover': {
                              backgroundColor: 'rgba(37, 150, 190, 0.05)',
                            },
                          }}
                          onClick={() => handleLocationClick(location)}
                        >
                          <ListItemText 
                            primary={location.name}
                            primaryTypographyProps={{
                              fontSize: '0.95rem',
                            }}
                          />
                        </ListItemButton>
                      ))
                    )}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => handleNavClick(id)}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'rgba(37, 150, 190, 0.08)',
                    },
                  }}
                >
                  <ListItemText 
                    primary={label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: '1.05rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </React.Fragment>
        ))}
        
        <ListItem disablePadding sx={{ mt: 3, px: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleNavClick("contact")}
            sx={{
              backgroundColor: "#FFD700",
              color: "#1a1a1a",
              fontWeight: 700,
              py: 1.5,
              textTransform: "uppercase",
              fontSize: '0.95rem',
              letterSpacing: 0.5,
              boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)',
              '&:hover': {
                backgroundColor: "#FFC107",
                boxShadow: '0 6px 16px rgba(255, 215, 0, 0.4)',
              },
            }}
          >
            Request a Quote
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: topBarVisible ? topBarHeight : 0,
          height: navbarHeight,
          zIndex: 1400,
          transition: 'all 0.3s ease-in-out',
          backgroundColor: scrolled ? 'rgba(37, 150, 190, 0.98)' : 'rgb(37, 150, 190)',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <Toolbar
          sx={{
            minHeight: `${navbarHeight}px !important`,
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
          }}
        >
          {isMobile || isTablet ? (
            <>
              <IconButton
                color="inherit"
                edge="start"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                size="large"
                sx={{ 
                  mr: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "#fff",
                  fontSize: { xs: '0.95rem', sm: '1.1rem' },
                  letterSpacing: 0.5,
                }}
              >
                {formatActiveIdText(activeIdState)}
              </Typography>
            </>
          ) : (
            <>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {navItems.map(({ label, id }) => {
                  if (id === "services") {
                    return (
                      <Box key={id}>
                        <Button
                          color="inherit"
                          endIcon={<ExpandMoreIcon />}
                          sx={{
                            textTransform: "none",
                            fontWeight: activeIdState.startsWith("Services") ? 700 : 500,
                            fontSize: '1rem',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              bottom: 8,
                              left: 16,
                              right: 16,
                              height: 3,
                              backgroundColor: '#FFD700',
                              transform: activeIdState.startsWith("Services") ? 'scaleX(1)' : 'scaleX(0)',
                              transition: 'transform 0.3s ease',
                            },
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.1)',
                            },
                            '&:hover::after': {
                              transform: 'scaleX(1)',
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
                          PaperProps={{
                            sx: {
                              mt: 1,
                              borderRadius: 2,
                              minWidth: 220,
                              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            }
                          }}
                          MenuListProps={{ 
                            sx: { 
                              backgroundColor: "rgb(37, 150, 190)", 
                              color: "#fff",
                              py: 1,
                            } 
                          }}
                        >
                          {services.length === 0 ? (
                            <MenuItem disabled sx={{ color: "#fff", py: 1.5 }}>
                              No services available
                            </MenuItem>
                          ) : (
                            services.map((service, idx) => (
                              <MenuItem
                                key={idx}
                                onClick={() => handleServiceClick(service)}
                                sx={{ 
                                  color: "#fff",
                                  py: 1.5,
                                  px: 3,
                                  fontSize: '0.95rem',
                                  '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                  },
                                }}
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
                      <Box key={id}>
                        <Button
                          color="inherit"
                          endIcon={<ExpandMoreIcon />}
                          sx={{
                            textTransform: "none",
                            fontWeight: activeIdState.startsWith("Locations") ? 700 : 500,
                            fontSize: '1rem',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              bottom: 8,
                              left: 16,
                              right: 16,
                              height: 3,
                              backgroundColor: '#FFD700',
                              transform: activeIdState.startsWith("Locations") ? 'scaleX(1)' : 'scaleX(0)',
                              transition: 'transform 0.3s ease',
                            },
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.1)',
                            },
                            '&:hover::after': {
                              transform: 'scaleX(1)',
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
                          PaperProps={{
                            sx: {
                              mt: 1,
                              borderRadius: 2,
                              minWidth: 220,
                              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            }
                          }}
                          MenuListProps={{ 
                            sx: { 
                              backgroundColor: "rgb(37, 150, 190)", 
                              color: "#fff",
                              py: 1,
                            } 
                          }}
                        >
                          {locations.length === 0 ? (
                            <MenuItem disabled sx={{ color: "#fff", py: 1.5 }}>
                              No locations available
                            </MenuItem>
                          ) : (
                            locations.map((location, idx) => (
                              <MenuItem
                                key={idx}
                                onClick={() => handleLocationClick(location)}
                                sx={{ 
                                  color: "#fff",
                                  py: 1.5,
                                  px: 3,
                                  fontSize: '0.95rem',
                                  '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                  },
                                }}
                              >
                                {location.name}
                              </MenuItem>
                            ))
                          )}
                        </Menu>
                      </Box>
                    );
                  }
                  const isActive = activeIdState === id || 
                                  (id === "aboutus" && activeIdState === "About Us");
                  return (
                    <Button
                      key={id}
                      color="inherit"
                      sx={{
                        textTransform: "none",
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '1rem',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 8,
                          left: 16,
                          right: 16,
                          height: 3,
                          backgroundColor: '#FFD700',
                          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                          transition: 'transform 0.3s ease',
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                        },
                        '&:hover::after': {
                          transform: 'scaleX(1)',
                        },
                      }}
                      onClick={() => handleNavClick(id)}
                    >
                      {label}
                    </Button>
                  );
                })}
              </Box>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FFD700",
                  color: "#1a1a1a",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: '0.95rem',
                  px: 4,
                  py: 1.2,
                  borderRadius: 2,
                  letterSpacing: 0.5,
                  boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)',
                  "&:hover": {
                    backgroundColor: "#FFC107",
                    boxShadow: '0 6px 16px rgba(255, 215, 0, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
                onClick={() => handleNavClick("contact")}
              >
                Request a Quote
              </Button>
            </>
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
            borderTopRightRadius: 16,
            boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;