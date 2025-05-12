import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import AdminCRUD from "../components/AdminCRUD";
import BookingCRUD from "../components/BookingCRUD";
import ServiceCRUD from "../components/ServiceCRUD";
import LocationCRUD from "../components/LocationCRUD";

const Dashboard = () => {
  const location = useLocation();

  // Initialize selectedModel based on current path segment
  const [selectedModel, setSelectedModel] = useState(() => {
    // Extract first segment after /dashboard/
    const pathSegment = location.pathname.split("/")[2]; // index 0 is '', 1 is 'dashboard', 2 is model
    return pathSegment || "admin"; // default to admin if no segment
  });

  // Update selectedModel whenever location changes
  useEffect(() => {
    const pathSegment = location.pathname.split("/")[2];
    if (pathSegment && pathSegment !== selectedModel) {
      setSelectedModel(pathSegment);
    }
  }, [location.pathname, selectedModel]);

  return (
    <DashboardLayout selectedModel={selectedModel} setSelectedModel={setSelectedModel}>
      <Routes>
        <Route path="/" element={<Navigate to="admin" replace />} />
        <Route path="admin" element={<AdminCRUD />} />
        <Route path="booking" element={<BookingCRUD />} />
        <Route path="services" element={<ServiceCRUD />} />
        <Route path="locations" element={<LocationCRUD />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
