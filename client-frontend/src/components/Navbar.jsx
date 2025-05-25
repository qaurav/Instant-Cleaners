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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Safe slug creator for consistency with Footer
const createSlug = (text) => {
  if (typeof text !== "string") {
    text = String(text || "");
  }
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};

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

const Navbar = ({ services = [], locations = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const topBarHeight = isMobile ? 180 : 60;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [anchorElServices, setAnchorElServices] = useState(null);
  const [anchorElLocations, setAnchorElLocations] = useState(null);
  const [openServices, setOpenServices] = useState(false);
  const [openLocations, setOpenLocations] = useState(false);

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      setActiveId(location.state.scrollTo);
    } else if (location.pathname === "/") {
      setActiveId("home");
    } else {
      setActiveId(null);
    }
  }, [location]);

  const handleNavClick = (id) => {
    setAnchorElServices(null);
    setAnchorElLocations(null);
    setOpenServices(false);
    setOpenLocations(false);

    if (location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      setActiveId(id);
    } else {
      navigate("/", { state: { scrollTo: id }, replace: true });
      setActiveId(id);
    }
    setDrawerOpen(false);
  };

  const handleButtonClick = (id) => {
    handleNavClick(id);
  };

  const handleToggleDropdown = (id, event) => {
    event.stopPropagation();
    if (id === "locations") {
      setAnchorElLocations(anchorElLocations ? null : event.currentTarget);
      setOpenLocations(!openLocations);
      setAnchorElServices(null);
      setOpenServices(false);
    } else if (id === "services") {
      setAnchorElServices(anchorElServices ? null : event.currentTarget);
      setOpenServices(!openServices);
      setAnchorElLocations(null);
      setOpenLocations(false);
    }
  };

  const handleServiceClick = (service) => {
    const name = service.name || service.title || "Unnamed Service";
    const slug = createSlug(name);
    navigate(`/services/${slug}`);
    setAnchorElServices(null);
    setOpenServices(false);
    setDrawerOpen(false);
  };

  const handleLocationClick = (location) => {
    const name = location.name || location.title || "Unnamed Location";
    const slug = createSlug(name);
    navigate(`/locations/${slug}`);
    setAnchorElLocations(null);
    setOpenLocations(false);
    setDrawerOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        width: { xs: "100vw", sm: 300 },
        maxWidth: "100vw",
        backgroundColor: "#fff",
        height: "100%",
        paddingTop: 0,
      }}
      role="presentation"
    >
      <List>
        {navItems.map(({ label, id }) => (
          <React.Fragment key={id}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (id === "services" || id === "locations") {
                    if (id === "services") {
                      setOpenServices(!openServices);
                      setOpenLocations(false);
                    } else if (id === "locations") {
                      setOpenLocations(!openLocations);
                      setOpenServices(false);
                    }
                  } else {
                    handleNavClick(id);
                  }
                }}
                sx={{
                  ...fontStyles,
                  ...(activeId === id ? activeStyle : {}),
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemText primary={label} />
                {(id === "services" || id === "locations") && (
                  id === "services" ? (openServices ? <ExpandLessIcon /> : <ExpandMoreIcon />) : (openLocations ? <ExpandLessIcon /> : <ExpandMoreIcon />)
                )}
              </ListItemButton>
            </ListItem>
            {id === "services" && (
              <Collapse in={openServices} timeout={300} easing="ease-in-out" unmountOnExit>
                <List component="div" disablePadding>
                  {services.length === 0 ? (
                    <ListItem disablePadding sx={{ pl: 4 }}>
                      <ListItemText primary="No services available" />
                    </ListItem>
                  ) : (
                    services.map((service, idx) => {
                      const name = service.name || service.title || "Unnamed Service";
                      return (
                        <ListItem key={idx} disablePadding sx={{ pl: 4 }}>
                          <ListItemButton onClick={() => handleServiceClick(service)}>
                            <ListItemText primary={name} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })
                  )}
                </List>
              </Collapse>
            )}
            {id === "locations" && (
              <Collapse in={openLocations} timeout={300} easing="ease-in-out" unmountOnExit>
                <List component="div" disablePadding>
                  {locations.length === 0 ? (
                    <ListItem disablePadding sx={{ pl: 4 }}>
                      <ListItemText primary="No locations available" />
                    </ListItem>
                  ) : (
                    locations.map((location, idx) => {
                      const name = location.name || location.title || "Unnamed Location";
                      return (
                        <ListItem key={idx} disablePadding sx={{ pl: 4 }}>
                          <ListItemButton onClick={() => handleLocationClick(location)}>
                            <ListItemText primary={name} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })
                  )}
                </List>
              </Collapse>
            )}
          </React.Fragment>
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
                <Box
                  key={id}
                  sx={{ position: "relative", display: "flex", alignItems: "center" }}
                >
                  <Button
                    onClick={() => {
                      handleButtonClick(id);
                    }}
                    sx={{
                      ...fontStyles,
                      color: "#fff",
                      ...(activeId === id ? activeStyle : { borderBottom: "none" }),
                      paddingRight: id === "locations" || id === "services" ? 0 : undefined,
                    }}
                  >
                    {label}
                  </Button>
                  {(id === "locations" || id === "services") && (
                    <IconButton
                      onClick={(event) => handleToggleDropdown(id, event)}
                      sx={{
                        color: "#fff",
                        padding: "6px",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                      }}
                    >
                      {id === "locations" && openLocations ? <ExpandLessIcon /> : id === "locations" ? <ExpandMoreIcon /> : id === "services" && openServices ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  )}
                  {id === "services" && (
                    <Menu
                      anchorEl={anchorElServices}
                      open={openServices && Boolean(anchorElServices)}
                      onClose={() => {
                        setAnchorElServices(null);
                        setOpenServices(false);
                      }}
                      TransitionProps={{ timeout: 200 }}
                      MenuListProps={{
                        sx: { backgroundColor: "rgb(37, 150, 190)", color: "#fff" },
                      }}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          "& .MuiMenu-list": { padding: 0 },
                        },
                      }}
                      disableAutoFocus
                      disableScrollLock
                    >
                      {services.length === 0 ? (
                        <MenuItem sx={{ color: "#fff", padding: "8px 16px" }}>
                          No services available
                        </MenuItem>
                      ) : (
                        services.map((service, idx) => {
                          const name = service.name || service.title || "Unnamed Service";
                          return (
                            <MenuItem
                              key={idx}
                              onClick={() => handleServiceClick(service)}
                              sx={{ color: "#fff", "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }, padding: "8px 16px" }}
                            >
                              {name}
                            </MenuItem>
                          );
                        })
                      )}
                    </Menu>
                  )}
                  {id === "locations" && (
                    <Menu
                      anchorEl={anchorElLocations}
                      open={openLocations && Boolean(anchorElLocations)}
                      onClose={() => {
                        setAnchorElLocations(null);
                        setOpenLocations(false);
                      }}
                      TransitionProps={{ timeout: 200 }}
                      MenuListProps={{
                        sx: { backgroundColor: "rgb(37, 150, 190)", color: "#fff" },
                      }}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          "& .MuiMenu-list": { padding: 0 },
                        },
                      }}
                      disableAutoFocus
                      disableScrollLock
                    >
                      {locations.length === 0 ? (
                        <MenuItem sx={{ color: "#fff", padding: "8px 16px" }}>
                          No locations available
                        </MenuItem>
                      ) : (
                        locations.map((location, idx) => {
                          const name = location.name || location.title || "Unnamed Location";
                          return (
                            <MenuItem
                              key={idx}
                              onClick={() => handleLocationClick(location)}
                              sx={{ color: "#fff", "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }, padding: "8px 16px" }}
                            >
                              {name}
                            </MenuItem>
                          );
                        })
                      )}
                    </Menu>
                  )}
                </Box>
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
                onClick={() => handleButtonClick("contact")}
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

      <Box sx={{ height: topBarHeight + 64 }} />

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          zIndex: 1500,
          "& .MuiDrawer-paper": {
            top: `${topBarHeight}px`,
            height: `calc(100% - ${topBarHeight}px)`,
            paddingTop: 0,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
