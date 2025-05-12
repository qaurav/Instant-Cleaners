import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


const DashboardLayout = ({ children, selectedModel, setSelectedModel }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <Box sx={{ p: 3, overflowY: "auto", flexGrow: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
