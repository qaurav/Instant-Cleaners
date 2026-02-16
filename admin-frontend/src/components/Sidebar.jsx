// src/components/Sidebar.jsx
import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Drawer,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectedModel, setSelectedModel }) => {
  const navigate = useNavigate();

  const models = [
    { label: "Admin", path: "admin" },
    { label: "Booking", path: "booking" },
    { label: "Services", path: "services" },
    { label: "Locations", path: "locations" },
    { label: "Mail", path: "mail" }, // <-- NEW
  ];

  const handleClick = (path) => {
    setSelectedModel(path);
    navigate(`/dashboard/${path}`);
  };

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <Toolbar />
      <List>
        {models.map(({ label, path }) => (
          <ListItemButton
            key={path}
            selected={selectedModel === path}
            onClick={() => handleClick(path)}
          >
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
